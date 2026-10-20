// Armazenamento local (IndexedDB). Tudo fica no aparelho.
// Um banco por conta do NEXO (auditoria N-02): quem entra depois de outra pessoa no mesmo navegador
// não vê os cadernos dela. O banco antigo, sem conta, passa uma única vez para o dono dos dados do aparelho.
const LEGADO = 'nexo-acervo';
function contaId() {
  try {
    const p = window.parent !== window && window.parent.nexoAcervoPerfil && window.parent.nexoAcervoPerfil();
    if (p && p.id) return p.id;
  } catch { /* fora do NEXO */ }
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && /^sb-[a-z0-9]+-auth-token$/.test(k)) { const s = JSON.parse(localStorage.getItem(k)); if (s?.user?.id) return s.user.id; }
    }
  } catch { /* sem sessão */ }
  return null;
}
const CONTA = contaId();
const DB_NAME = CONTA ? LEGADO + ':' + CONTA : LEGADO;
const DB_VERSION = 3;
// v2: baralhos e cartões de estudo, figurinhas (elementos salvos) e modelos personalizados.
// v3: sincronização — 'outbox' (alterações locais ainda não enviadas, gravadas na mesma transação
// do dado) e 'syncmeta' (revisão do servidor de cada registro e o cursor de recebimento).
const STORES = ['folders', 'notebooks', 'pages', 'assets', 'decks', 'cards', 'elements', 'templates'];
const SYNC_STORES = ['outbox', 'syncmeta'];

let dbPromise = null;

function criarStores(db) {
  for (const name of STORES) {
    if (!db.objectStoreNames.contains(name)) {
      const store = db.createObjectStore(name, { keyPath: 'id' });
      if (name === 'pages') store.createIndex('notebookId', 'notebookId');
      if (name === 'notebooks') store.createIndex('folderId', 'folderId');
      if (name === 'cards') store.createIndex('deckId', 'deckId');
    }
  }
  for (const name of SYNC_STORES) if (!db.objectStoreNames.contains(name)) db.createObjectStore(name, { keyPath: 'key' });
}

// Copia o banco antigo (sem conta) para o banco desta conta, se ela é a dona dos dados do aparelho.
async function migrarLegado(db) {
  const FLAG = 'acervo_legado_migrado';
  if (!CONTA || localStorage.getItem(FLAG)) return;
  const dono = localStorage.getItem('nexo_dono');
  if (dono && dono !== CONTA) return; // os cadernos antigos são de outra pessoa
  if (indexedDB.databases) {
    const nomes = (await indexedDB.databases()).map((d) => d.name);
    if (!nomes.includes(LEGADO)) { localStorage.setItem(FLAG, CONTA); return; }
  }
  const antigo = await new Promise((resolve) => {
    const req = indexedDB.open(LEGADO, DB_VERSION);
    req.onupgradeneeded = () => criarStores(req.result);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => resolve(null);
  });
  if (!antigo) return;
  const dados = {};
  for (const s of STORES) {
    dados[s] = await new Promise((resolve) => {
      const r = antigo.transaction(s).objectStore(s).getAll();
      r.onsuccess = () => resolve(r.result || []);
      r.onerror = () => resolve([]);
    });
  }
  antigo.close();
  const total = STORES.reduce((n, s) => n + dados[s].length, 0);
  if (total) {
    await new Promise((resolve, reject) => {
      const tx = db.transaction(STORES, 'readwrite');
      for (const s of STORES) for (const v of dados[s]) tx.objectStore(s).put(v);
      tx.oncomplete = resolve;
      tx.onerror = () => reject(tx.error);
    });
  }
  localStorage.setItem(FLAG, CONTA);
  indexedDB.deleteDatabase(LEGADO); // já copiado: não fica disponível para outra conta
}

function open() {
  if (dbPromise) return dbPromise;
  dbPromise = new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => criarStores(req.result);
    req.onsuccess = async () => {
      // Outra aba abriu uma versão mais nova: fecha esta conexão.
      req.result.onversionchange = () => req.result.close();
      try { await migrarLegado(req.result); } catch { /* migração falhou: o banco antigo continua intacto */ }
      resolve(req.result);
    };
    req.onerror = () => reject(req.error);
  });
  return dbPromise;
}

function wrap(req) {
  return new Promise((resolve, reject) => {
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function tx(store, mode = 'readonly') {
  const db = await open();
  return db.transaction(store, mode).objectStore(store);
}

// ---------- Fila de sincronização ----------
// Toda gravação local registra, na MESMA transação, uma entrada em 'outbox'. Se a gravação falhar,
// a entrada também não existe; se der certo, a alteração com certeza será enviada depois.
let outboxSeq = 0;
function seq() { return Date.now() * 1000 + (outboxSeq++ % 1000); }
function queue(t, store, id, deleted) {
  t.objectStore('outbox').put({ key: store + ':' + id, store, id, deleted: !!deleted, seq: seq() });
}
function changed() {
  try { window.dispatchEvent(new CustomEvent('acervo:changed')); } catch { /* fora do navegador */ }
}
function run(stores, fn) {
  return open().then((database) => new Promise((resolve, reject) => {
    const t = database.transaction([...stores, 'outbox'], 'readwrite');
    let result;
    t.oncomplete = () => { changed(); resolve(result); };
    t.onerror = () => reject(t.error);
    t.onabort = () => reject(t.error || new Error('Gravação cancelada'));
    try { result = fn(t); } catch (err) { try { t.abort(); } catch { /* já encerrada */ } reject(err); }
  }));
}

export const db = {
  async get(store, id) {
    return wrap((await tx(store)).get(id));
  },
  async all(store) {
    return wrap((await tx(store)).getAll());
  },
  async byIndex(store, index, value) {
    return wrap((await tx(store)).index(index).getAll(value));
  },
  put(store, value) {
    return run([store], (t) => { t.objectStore(store).put(value); queue(t, store, value.id); return value.id; });
  },
  putMany(store, values) {
    return run([store], (t) => { const s = t.objectStore(store); for (const v of values) { s.put(v); queue(t, store, v.id); } });
  },
  delete(store, id) {
    return run([store], (t) => { t.objectStore(store).delete(id); queue(t, store, id, true); });
  },
  clear(store) {
    return run([store], (t) => {
      const s = t.objectStore(store);
      const r = s.getAllKeys();
      r.onsuccess = () => { for (const id of r.result) queue(t, store, id, true); s.clear(); };
    });
  },
};

// Usado pelo motor de sincronização (sync.js).
export const syncDb = {
  STORES,
  async outbox(limit = 200) {
    const database = await open();
    return new Promise((resolve, reject) => {
      const out = [];
      const r = database.transaction('outbox').objectStore('outbox').openCursor();
      r.onsuccess = () => { const c = r.result; if (!c || out.length >= limit) return resolve(out); out.push(c.value); c.continue(); };
      r.onerror = () => reject(r.error);
    });
  },
  async outboxCount() { return wrap((await tx('outbox')).count()); },
  async pendingKeys() { return new Set(await wrap((await tx('outbox')).getAllKeys())); },
  // Tira da fila só as entradas que não mudaram desde o envio (mesmo seq) e grava as revisões.
  async ack(entries, revisions) {
    const database = await open();
    return new Promise((resolve, reject) => {
      const t = database.transaction(['outbox', 'syncmeta'], 'readwrite');
      const ob = t.objectStore('outbox'), meta = t.objectStore('syncmeta');
      for (const e of entries) {
        const r = ob.get(e.key);
        r.onsuccess = () => { if (r.result && r.result.seq === e.seq) ob.delete(e.key); };
        if (revisions.has(e.key)) meta.put({ key: e.key, rev: revisions.get(e.key) });
      }
      t.oncomplete = () => resolve();
      t.onerror = () => reject(t.error);
    });
  },
  async revisions(keys) {
    const s = await tx('syncmeta');
    const out = new Map();
    await Promise.all(keys.map((k) => wrap(s.get(k)).then((v) => out.set(k, v ? v.rev : 0))));
    return out;
  },
  async getMeta(key, fallback = null) { const v = await wrap((await tx('syncmeta')).get('@' + key)); return v ? v.value : fallback; },
  async setMeta(key, value) { return wrap((await tx('syncmeta', 'readwrite')).put({ key: '@' + key, value })); },
  // Aplica registros que vieram do servidor sem colocá-los na fila de envio.
  async applyRemote(rows) {
    const database = await open();
    return new Promise((resolve, reject) => {
      const t = database.transaction([...STORES, 'syncmeta'], 'readwrite');
      for (const r of rows) {
        const s = t.objectStore(r.store);
        if (r.deleted) s.delete(r.id); else if (r.value) s.put(r.value);
        t.objectStore('syncmeta').put({ key: r.store + ':' + r.id, rev: r.revision });
      }
      t.oncomplete = () => { try { window.dispatchEvent(new CustomEvent('acervo:remote')); } catch { /* */ } resolve(); };
      t.onerror = () => reject(t.error);
    });
  },
  // Primeira sincronização deste aparelho: tudo o que já existe entra na fila uma vez.
  async queueEverything() {
    const database = await open();
    return new Promise((resolve, reject) => {
      const t = database.transaction([...STORES, 'outbox'], 'readwrite');
      for (const s of STORES) {
        const r = t.objectStore(s).getAllKeys();
        r.onsuccess = () => { for (const id of r.result) queue(t, s, id); };
      }
      t.oncomplete = () => resolve();
      t.onerror = () => reject(t.error);
    });
  },
  // Coloca arquivos baixados do servidor no aparelho (sem gerar envio).
  async putAssetLocal(a) { return wrap((await tx('assets', 'readwrite')).put(a)); },
  async setRevision(key, rev) { return wrap((await tx('syncmeta', 'readwrite')).put({ key, rev })); },
  async dropOutbox(key) { return wrap((await tx('outbox', 'readwrite')).delete(key)); },
};

// Arquivo que ainda não chegou neste aparelho: sync.js registra quem sabe buscá-lo no servidor.
let remoteAssetLoader = null;
export function setRemoteAssetLoader(fn) { remoteAssetLoader = fn; }

export function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 9);
}

// ---------- Operações de alto nível ----------

export async function saveAsset(blob) {
  const id = uid();
  await db.put('assets', { id, blob, type: blob.type });
  return id;
}

export async function getAssetBlob(id) {
  const a = await db.get('assets', id);
  if (a) return a.blob;
  if (remoteAssetLoader) { try { return await remoteAssetLoader(id); } catch { return null; } }
  return null;
}

export async function getNotebookPages(notebook) {
  const pages = await db.byIndex('pages', 'notebookId', notebook.id);
  const map = new Map(pages.map((p) => [p.id, p]));
  return notebook.pageIds.map((id) => map.get(id)).filter(Boolean);
}

// Todos os arquivos ainda referenciados por algum dado.
async function usedAssets() {
  const used = new Set();
  for (const p of await db.all('pages')) {
    if (p.pdf) used.add(p.pdf.assetId);
    if (p.bgAsset) used.add(p.bgAsset);
    for (const img of p.images || []) used.add(img.assetId);
  }
  for (const n of await db.all('notebooks')) for (const r of n.recordings || []) used.add(r.assetId);
  for (const t of await db.all('templates')) used.add(t.assetId);
  for (const e of await db.all('elements')) for (const img of e.items?.images || []) used.add(img.assetId);
  for (const c of await db.all('cards')) for (const side of [c.front, c.back]) if (side?.assetId) used.add(side.assetId);
  return used;
}

export async function deleteNotebook(notebook) {
  const pages = await db.byIndex('pages', 'notebookId', notebook.id);
  const assetIds = new Set();
  for (const p of pages) {
    if (p.pdf) assetIds.add(p.pdf.assetId);
    if (p.bgAsset) assetIds.add(p.bgAsset);
    for (const img of p.images || []) assetIds.add(img.assetId);
    await db.delete('pages', p.id);
  }
  for (const r of notebook.recordings || []) assetIds.add(r.assetId);
  await db.delete('notebooks', notebook.id);
  await collectGarbage(assetIds);
}

// Remove assets que não são mais usados por nenhuma página.
export async function collectGarbage(candidates) {
  if (!candidates || !candidates.size) return;
  const used = await usedAssets();
  for (const id of candidates) if (!used.has(id)) await db.delete('assets', id);
}

// ---------- Backup ----------

function blobToDataURL(blob) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result);
    r.onerror = () => reject(r.error);
    r.readAsDataURL(blob);
  });
}

export async function exportBackup() {
  const data = { app: 'acervo-digital-pessoal', version: 1, exportedAt: new Date().toISOString() };
  for (const s of STORES) if (s !== 'assets') data[s] = await db.all(s);
  const assets = await db.all('assets');
  data.assets = [];
  for (const a of assets) data.assets.push({ id: a.id, type: a.type, data: await blobToDataURL(a.blob) });
  return new Blob([JSON.stringify(data)], { type: 'application/json' });
}

// Só aceita arquivos embutidos no próprio backup (data:...;base64,...): nunca busca endereço externo.
function dataURLToBlob(url) {
  const m = /^data:([^;,]*)(;base64)?,(.*)$/s.exec(typeof url === 'string' ? url : '');
  if (!m || !m[2]) throw new Error('O backup tem um arquivo em formato inválido.');
  const bin = atob(m[3]);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return new Blob([bytes], { type: m[1] || 'application/octet-stream' });
}

// Restauração tudo-ou-nada: primeiro lê e valida o arquivo inteiro (nada é apagado se algo
// estiver errado); depois apaga (se for substituir) e grava todas as tabelas numa transação
// única. Se a gravação falhar (ex.: espaço do navegador cheio), o IndexedDB desfaz tudo e o
// acervo continua como estava.
export async function importBackup(file, { replace = false } = {}) {
  let data;
  try { data = JSON.parse(await file.text()); } catch { throw new Error('O arquivo de backup está corrompido ou não é JSON.'); }
  // Aceita também backups feitos no app original (antes da integração ao NEXO).
  if (!data || (data.app !== 'acervo-digital-pessoal' && data.app !== 'nanquim')) throw new Error('Este arquivo não é um backup do Acervo Digital Pessoal.');
  const rows = {};
  for (const s of STORES) {
    if (s === 'assets' || data[s] == null) continue;
    if (!Array.isArray(data[s]) || data[s].some((v) => !v || typeof v !== 'object' || v.id == null)) {
      throw new Error('O backup está incompleto ou corrompido (' + s + ').');
    }
    rows[s] = data[s];
  }
  if (data.assets != null && !Array.isArray(data.assets)) throw new Error('O backup está incompleto ou corrompido (arquivos).');
  rows.assets = (data.assets || []).map((a) => {
    if (!a || a.id == null) throw new Error('O backup está incompleto ou corrompido (arquivos).');
    const blob = dataURLToBlob(a.data);
    return { id: a.id, type: a.type || blob.type, blob };
  });

  const database = await open();
  await new Promise((resolve, reject) => {
    const t = database.transaction([...STORES, 'outbox'], 'readwrite');
    t.oncomplete = () => { changed(); resolve(); };
    t.onerror = () => reject(t.error || new Error('Não foi possível gravar o backup.'));
    t.onabort = () => reject(t.error || new Error('Não foi possível gravar o backup (espaço do navegador cheio?). Nada foi alterado.'));
    try {
      for (const s of STORES) {
        const store = t.objectStore(s);
        if (replace) {
          const k = store.getAllKeys();
          k.onsuccess = () => { const novos = new Set((rows[s] || []).map((v) => v.id)); for (const id of k.result) if (!novos.has(id)) queue(t, s, id, true); };
          store.clear();
        }
        for (const v of rows[s] || []) { store.put(v); queue(t, s, v.id); }
      }
    } catch (err) {
      try { t.abort(); } catch { /* já encerrada */ }
      reject(new Error('O backup tem um registro que não pode ser gravado. Nada foi alterado.'));
    }
  });
}
