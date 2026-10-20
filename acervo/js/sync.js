// Sincronização do Acervo entre aparelhos (Supabase do NEXO).
//
// Como funciona:
// - Toda gravação local entra na fila 'outbox' na mesma transação do dado (db.js).
// - Enviar: cada item da fila vai para a função acervo_push com a revisão que este aparelho
//   conhecia (base). Arquivos (PDFs, imagens, áudios) vão antes para a pasta privada
//   acervo/<id da conta>/<id do arquivo>.
// - Receber: busca no servidor tudo com revisão maior que o cursor deste aparelho.
// - Conflito (o servidor tem versão mais nova de OUTRO aparelho): nunca sobrescreve em silêncio.
//   Página editada nos dois: a versão do servidor fica no caderno e a deste aparelho vai para o
//   caderno "Conflitos de sincronização". Caderno: junta as páginas dos dois lados. Excluído de
//   um lado e editado do outro: vale a edição (nada se perde).
// - Enquanto um caderno está aberto, mudanças dele vindas de outro aparelho esperam o caderno
//   fechar (o editor guarda as páginas em memória e poderia gravar por cima).
// O cliente do Supabase é o do próprio NEXO (window.parent.nexoAcervoSupabase): um segundo
// cliente aqui disputaria a renovação do token.
import { db, syncDb, uid, setRemoteAssetLoader } from './db.js';
import { postToNexo } from './nexo.js';

const BUCKET = 'acervo';
const LS_KEY = 'acervo.sync';
const parentWin = window.parent !== window ? window.parent : null;

let running = false, again = false, timer = null, accountId = null, device = null;
let status = { state: 'idle', pending: 0, last: null, error: null, tooBig: 0 };
const listeners = new Set();

function client() { try { return parentWin?.nexoAcervoSupabase?.() || null; } catch { return null; } }
export function syncEnabled() { try { return localStorage.getItem(LS_KEY) !== 'off'; } catch { return true; } }
export function setSyncEnabled(on) {
  try { localStorage.setItem(LS_KEY, on ? 'on' : 'off'); } catch { /* sem armazenamento */ }
  if (on) syncNow(); else setStatus({ state: 'off' });
}
export function onSyncStatus(fn) { listeners.add(fn); fn(status); return () => listeners.delete(fn); }
export function syncStatus() { return status; }
function setStatus(s) {
  status = { ...status, ...s };
  for (const fn of listeners) { try { fn(status); } catch { /* ignora */ } }
  postToNexo({ type: 'sync', ...status });
}

function openNotebookId() { return (location.hash.match(/^#caderno\/(.+)$/) || [])[1] || null; }
const keyOf = (r) => r.store + ':' + r.id;

export function scheduleSync(ms = 4000) {
  clearTimeout(timer);
  timer = setTimeout(syncNow, ms);
}

export async function syncNow() {
  clearTimeout(timer);
  if (running) { again = true; return; }
  const sb = client();
  if (!syncEnabled()) return setStatus({ state: 'off' });
  if (!sb) return setStatus({ state: 'local' });
  running = true;
  try {
    const { data: { session } = {} } = await sb.auth.getSession();
    if (!session?.user?.id) { setStatus({ state: 'local' }); return; }
    accountId = session.user.id;
    if (!navigator.onLine) { setStatus({ state: 'offline', pending: await syncDb.outboxCount() }); return; }
    setStatus({ state: 'syncing', error: null });
    device = await syncDb.getMeta('device');
    if (!device) { device = 'd-' + uid() + uid(); await syncDb.setMeta('device', device); }
    if (!(await syncDb.getMeta('bootstrapped'))) {
      await syncDb.queueEverything(); // primeira vez neste aparelho: envia o que já existe
      await syncDb.setMeta('bootstrapped', true);
    }
    await applyDeferred();
    await pull(sb);
    await push(sb);
    await pull(sb);
    const tooBig = (await syncDb.getMeta('tooBig', [])).length;
    setStatus({ state: 'ok', last: Date.now(), pending: await syncDb.outboxCount(), error: null, tooBig });
  } catch (err) {
    console.warn('[Acervo] sincronização', err);
    setStatus({ state: navigator.onLine ? 'error' : 'offline', error: String(err?.message || err), pending: await syncDb.outboxCount().catch(() => 0) });
    scheduleSync(60000);
  } finally {
    running = false;
    if (again) { again = false; scheduleSync(1000); }
  }
}

// ---------- Enviar ----------
async function push(sb) {
  const skip = new Set(await syncDb.getMeta('tooBig', []));
  for (let guard = 0; guard < 200; guard++) {
    const entries = (await syncDb.outbox(100)).filter((e) => !skip.has(e.key));
    if (!entries.length) return;
    const revs = await syncDb.revisions(entries.map((e) => e.key));
    const rows = [];
    const sent = [];
    for (const e of entries) {
      let value = e.deleted ? null : await db.get(e.store, e.id);
      let deleted = e.deleted || !value;
      let data = null;
      if (e.store === 'assets') {
        const path = accountId + '/' + e.id;
        if (deleted) {
          await sb.storage.from(BUCKET).remove([path]).catch(() => {});
        } else {
          const up = await sb.storage.from(BUCKET).upload(path, value.blob, {
            upsert: true, contentType: value.type || value.blob?.type || 'application/octet-stream',
          });
          if (up.error) {
            const msg = String(up.error.message || up.error);
            if (/size|large|413/i.test(msg)) { skip.add(e.key); await syncDb.setMeta('tooBig', [...skip]); continue; }
            throw new Error('Envio de arquivo: ' + msg);
          }
          data = { id: value.id, type: value.type || value.blob?.type || '', size: value.blob?.size || 0 };
        }
      } else if (!deleted) {
        data = JSON.parse(JSON.stringify(value)); // só dados (sem Blob/funções)
      }
      rows.push({ store: e.store, id: e.id, deleted, base: revs.get(e.key) || 0, data });
      sent.push(e);
    }
    if (!rows.length) continue;
    const { data: result, error } = await sb.rpc('acervo_push', { p_device: device, p_rows: rows });
    if (error) throw new Error(error.message || 'Falha ao enviar');
    const done = new Map();
    const conflicts = [];
    for (const r of result || []) {
      if (r.status === 'ok') done.set(keyOf(r), r.revision);
      else conflicts.push(r);
    }
    await syncDb.ack(sent.filter((e) => done.has(e.key)), done);
    for (const c of conflicts) await resolveConflict(c);
  }
}

// ---------- Conflitos ----------
async function resolveConflict(c) {
  const k = keyOf(c);
  const local = await db.get(c.store, c.id);
  if (c.deleted) {
    // apagado no outro aparelho, editado aqui: vale a edição; reenviamos sobre a revisão do servidor
    if (local) { await syncDb.setRevision(k, c.revision); return; }
    await syncDb.dropOutbox(k); await syncDb.setRevision(k, c.revision); return;
  }
  if (!local) {
    // apagado aqui, editado lá: volta a versão do servidor
    await syncDb.dropOutbox(k);
    await applyRows([{ store: c.store, id: c.id, deleted: false, data: c.data, revision: c.revision }]);
    return;
  }
  if (c.store === 'notebooks') {
    // junta as páginas dos dois lados; o resto (título, capa, pasta) vem do servidor
    const ids = [...(c.data.pageIds || [])];
    for (const id of local.pageIds || []) if (!ids.includes(id) && (await db.get('pages', id))) ids.push(id);
    await syncDb.setRevision(k, c.revision);
    await db.put('notebooks', { ...c.data, pageIds: ids, updatedAt: Date.now() });
    return;
  }
  if (c.store === 'pages') {
    await saveConflictCopy(local);
    await syncDb.dropOutbox(k);
    await applyRows([{ store: c.store, id: c.id, deleted: false, data: c.data, revision: c.revision }]);
    return;
  }
  // demais registros (pastas, cartões, modelos...): vale o servidor
  await syncDb.dropOutbox(k);
  await applyRows([{ store: c.store, id: c.id, deleted: false, data: c.data, revision: c.revision }]);
}

async function saveConflictCopy(page) {
  const all = await db.all('notebooks');
  let bin = all.find((n) => n.conflictBin && !n.trashedAt);
  const now = Date.now();
  if (!bin) {
    bin = { id: uid(), title: 'Conflitos de sincronização', folderId: null, conflictBin: true,
      cover: { color: '#b45309', pattern: 'plain' }, defaults: {}, favorite: false, createdAt: now, updatedAt: now, pageIds: [] };
  }
  const copy = { ...structuredClone(page), id: uid(), notebookId: bin.id };
  const origem = all.find((n) => n.id === page.notebookId);
  copy.texts = [...(copy.texts || []), { id: uid(), x: 24, y: 8, w: 520, h: 20, size: 11, color: '#b45309',
    text: `Versão deste aparelho de “${origem?.title || 'caderno'}” (${new Date(now).toLocaleString('pt-BR')})` }];
  await db.put('pages', copy);
  bin.pageIds = [...bin.pageIds, copy.id];
  bin.updatedAt = now;
  await db.put('notebooks', bin);
}

// ---------- Receber ----------
async function pull(sb) {
  let cursor = Number(await syncDb.getMeta('cursor', 0)) || 0;
  for (let guard = 0; guard < 1000; guard++) {
    const { data, error } = await sb.from('acervo_records')
      .select('store,id,data,deleted,revision,device_id')
      .gt('revision', cursor).order('revision', { ascending: true }).limit(300);
    if (error) throw new Error(error.message || 'Falha ao receber');
    if (!data?.length) return;
    const pending = await syncDb.pendingKeys();
    const rows = [];
    for (const r of data) {
      if (pending.has(keyOf(r))) continue; // há alteração local esperando envio: o envio resolve
      if (r.device_id === device) { rows.push({ ...r, data: undefined, revOnly: true }); continue; }
      rows.push(r);
    }
    await applyRows(rows);
    cursor = data[data.length - 1].revision;
    await syncDb.setMeta('cursor', cursor);
  }
}

// Aplica registros do servidor. Os do caderno aberto esperam ele fechar.
async function applyRows(rows) {
  const open = openNotebookId();
  const now = [], later = [], downloads = [];
  for (const r of rows) {
    const touchesOpen = open && !r.revOnly && ((r.store === 'notebooks' && r.id === open) || (r.store === 'pages' && r.data?.notebookId === open));
    if (touchesOpen) { later.push(r); continue; }
    if (r.store === 'assets' && !r.deleted && !r.revOnly) {
      if (!(await db.get('assets', r.id))) downloads.push(r);
      now.push({ store: r.store, id: r.id, deleted: false, value: undefined, revision: r.revision });
      continue;
    }
    now.push({ store: r.store, id: r.id, deleted: r.deleted && !r.revOnly, value: r.revOnly ? undefined : r.data, revision: r.revision });
  }
  if (now.length) await syncDb.applyRemote(now);
  if (later.length) {
    const prev = await syncDb.getMeta('deferred', []);
    const map = new Map(prev.map((r) => [keyOf(r), r]));
    for (const r of later) map.set(keyOf(r), r);
    await syncDb.setMeta('deferred', [...map.values()]);
  }
  for (const r of downloads) await downloadAsset(r.id, r.data?.type).catch(() => { /* baixa depois, quando for usado */ });
}

async function applyDeferred() {
  const deferred = await syncDb.getMeta('deferred', []);
  if (!deferred.length || openNotebookId()) return;
  const pending = await syncDb.pendingKeys();
  await syncDb.setMeta('deferred', []);
  await applyRows(deferred.filter((r) => !pending.has(keyOf(r))));
}

async function downloadAsset(id, type) {
  const sb = client();
  if (!sb || !accountId) return null;
  const { data, error } = await sb.storage.from(BUCKET).download(accountId + '/' + id);
  if (error || !data) return null;
  const blob = type && data.type !== type ? new Blob([data], { type }) : data;
  await syncDb.putAssetLocal({ id, type: blob.type, blob });
  return blob;
}
// Arquivo que ainda não chegou neste aparelho: baixa na hora em que a página precisa dele.
setRemoteAssetLoader(async (id) => {
  if (!syncEnabled()) return null;
  if (!accountId) { try { accountId = (await client()?.auth.getSession())?.data?.session?.user?.id || null; } catch { return null; } }
  return downloadAsset(id);
});

// ---------- Gatilhos ----------
export function initSync() {
  window.addEventListener('acervo:changed', () => scheduleSync(4000));
  window.addEventListener('online', () => scheduleSync(500));
  window.addEventListener('offline', () => setStatus({ state: 'offline' }));
  document.addEventListener('visibilitychange', () => { if (!document.hidden) scheduleSync(500); });
  window.addEventListener('hashchange', () => { if (!openNotebookId()) scheduleSync(800); });
  setInterval(() => { if (!document.hidden) syncNow(); }, 90000);
  scheduleSync(300);
}
