// Biblioteca: cadernos, pastas, favoritos, busca global.
import { syncEnabled, setSyncEnabled, syncNow } from './sync.js';
import { db, uid, getNotebookPages, deleteNotebook, exportBackup, importBackup } from './db.js';
import { h, icon, ICONS, modal, confirmDialog, promptDialog, progressDialog, showMenu, closeMenu, toast, download, pickFile, safeFilename, relativeDate, normalize, snippet } from './ui.js';
import { importPdf, newPage, exportNotebookPdf, outlineForPages } from './pdftools.js';
import { renderPageFlat, drawTemplate, loadPdf, TEMPLATES, PAGE_SIZES, PAPER_COLORS, SPACINGS } from './render.js';
import { renderStudyView, studyDueCount } from './study.js';
import { aiSettingsDialog } from './ai.js';
import { saveAsset } from './db.js';
import { postToNexo } from './nexo.js';
import { folderDialog, folderGlyph } from './pickers.js';
import { applyCover, coverFromPreset, coverPreset, DEFAULT_COVER_ID } from './covers.js';
import { notebookSetupDialog } from './newnotebook.js';

export const COVER_COLORS = ['#244b48', '#24766b', '#437b99', '#7a4f9a', '#b8860b', '#a23b55', '#34495e', '#5a6b3a', '#d07a8f', '#4a90a4'];
const FOLDER_COLOR = '#45bfdb';
const IMG_ICON = '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="10" r="1.6"/><path d="M21 16l-5-5-8 8"/>';
const FOLDER_SVG = '<path d="M2.5 7.5A2.5 2.5 0 0 1 5 5h4.2a2 2 0 0 1 1.5.7L12 7h7a2.5 2.5 0 0 1 2.5 2.5v8A2.5 2.5 0 0 1 19 20H5a2.5 2.5 0 0 1-2.5-2.5z"/>';

const VIEW_KEY = 'acervo.view';
const readPref = (k, d) => { try { return localStorage.getItem(k) || d; } catch { return d; } };
const state = { nav: 'all', sort: readPref('acervo.sort', 'updated'), dir: readPref('acervo.dir', 'desc'), view: readPref(VIEW_KEY, 'grid'), query: '', notebooks: [], folders: [], trash: [], selecting: false, selected: new Set() };
let onOpen = () => {};
const thumbCache = new Map(); // notebookId -> {key, url}

const $ = (id) => document.getElementById(id);

export function initLibrary(opts) {
  onOpen = opts.onOpen;
  document.querySelectorAll('[data-nav]').forEach((b) => b.addEventListener('click', () => setNav(b.dataset.nav)));
  const novoBtn = $('btn-new-notebook');
  let novoTimer = null;
  novoBtn.addEventListener('click', (e) => {
    // dois toques seguidos em "+ Novo" criam uma nota rápida
    if (novoTimer) { clearTimeout(novoTimer); novoTimer = null; closeMenu(); quickNote(); return; }
    const anchor = e.currentTarget;
    novoTimer = setTimeout(() => {
      novoTimer = null;
      showMenu(anchor, [
        { label: 'Caderno', icon: 'page', onClick: () => newNotebookDialog() },
        { label: 'Quadro branco', icon: '<rect x="3" y="4" width="18" height="14" rx="2"/><path d="M8 21h8M7 13l3-3 3 3 4-4"/>', onClick: () => newBoard() },
        { label: 'Importar', icon: '<path d="M12 4v11m0 0l-4-4m4 4l4-4M5 19h14"/>', onClick: () => importAny() },
        { label: 'Nota rápida', icon: 'edit', onClick: () => quickNote() },
        { label: 'Imagem', icon: IMG_ICON, onClick: () => importImageNotebook() },
        { label: 'Pasta', icon: 'folder', onClick: () => newFolder(currentFolderId()) },
        'sep',
        { tip: 'Dica: toque duas vezes em “+ Novo” para criar uma nota rápida' },
      ], { align: 'right' });
    }, 260);
  });
  $('btn-lib-more').addEventListener('click', (e) => showMenu(e.currentTarget, [
    { label: 'Assistente de IA', icon: '<path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8z"/>', onClick: () => aiSettingsDialog() },
    { label: 'Nova pasta', icon: 'folder', onClick: () => newFolder(currentFolderId()) },
    'sep',
    syncEnabled()
      ? { label: 'Sincronizar agora', icon: '<path d="M4 12a8 8 0 0 1 14-5.3L20 9M20 4v5h-5M20 12a8 8 0 0 1-14 5.3L4 15M4 20v-5h5"/>', onClick: () => syncNow() }
      : { label: 'Ligar sincronização', icon: '<path d="M4 12a8 8 0 0 1 14-5.3L20 9M20 4v5h-5M20 12a8 8 0 0 1-14 5.3L4 15M4 20v-5h5"/>', onClick: () => { setSyncEnabled(true); toast('Sincronização ligada: seus cadernos vão para a sua conta do NEXO.'); } },
    syncEnabled() ? { label: 'Desligar sincronização', icon: '<path d="M4 4l16 16M7 7a8 8 0 0 0 11 10M17.5 6.5A8 8 0 0 1 20 12"/>', onClick: async () => {
      const ok = await confirmDialog('Desligar sincronização?', 'Os cadernos continuam neste aparelho, mas as próximas alterações não vão para os outros aparelhos até você ligar de novo.', { ok: 'Desligar' });
      if (ok) { setSyncEnabled(false); toast('Sincronização desligada'); }
    } } : null,
    'sep',
    { label: 'Fazer backup', icon: '<path d="M12 4v11m0 0l-4-4m4 4l4-4M5 19h14"/>', onClick: doBackup },
    { label: 'Restaurar backup', icon: '<path d="M12 15V4m0 0L8 8m4-4l4 4M5 19h14"/>', onClick: doRestore },
  ], { align: 'right' }));
  $('btn-folder-menu').addEventListener('click', (e) => {
    const f = state.folders.find((x) => x.id === currentFolderId());
    const r = e.currentTarget.getBoundingClientRect();
    if (f) folderMenu(f, { clientX: r.left, clientY: r.bottom + 4 });
  });
  $('btn-import-pdf').addEventListener('click', importPdfNotebook);
  // Seleção de vários cadernos (mover, favoritar, lixeira em lote)
  const selBtn = h('button', { class: 'btn', id: 'btn-select', type: 'button', title: 'Selecionar vários cadernos' },
    icon('<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M8.5 12l2.5 2.5 4.5-5"/>'), h('span', {}, 'Selecionar'));
  selBtn.addEventListener('click', () => setSelecting(!state.selecting));
  $('btn-import-pdf').before(selBtn);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && state.selecting && !$('library').hidden) setSelecting(false); });
  $('btn-view').addEventListener('click', (e) => viewMenu(e.currentTarget));
  let t;
  $('search').addEventListener('input', (e) => {
    clearTimeout(t);
    t = setTimeout(() => { state.query = e.target.value.trim(); renderContent(); }, 160);
  });

  // Arrastar um PDF para a janela importa direto.
  window.addEventListener('dragover', (e) => { if (!$('library').hidden) e.preventDefault(); });
  window.addEventListener('drop', async (e) => {
    if ($('library').hidden) return;
    e.preventDefault();
    const f = [...(e.dataTransfer?.files || [])].find((x) => x.type === 'application/pdf');
    if (f) importPdfNotebook(f);
  });
}

// Chamado pelas abas internas e pelos subitens do menu do NEXO.
export function setNav(nav) {
  if (nav.startsWith('folder:') && !state.folders.some((f) => 'folder:' + f.id === nav)) nav = 'all';
  state.nav = nav;
  if (state.query) { state.query = ''; $('search').value = ''; }
  if (state.selecting) setSelecting(false, { silent: true });
  render();
}

// Lixeira: excluir manda o caderno para cá (trashedAt) sem apagar páginas nem arquivos; ele some
// das listas, da busca e das páginas marcadas, pode ser restaurado e é apagado de vez depois de
// TRASH_DAYS dias ou pelo botão "Excluir definitivamente".
const TRASH_DAYS = 30;
export async function refreshLibrary() {
  const all = await db.all('notebooks');
  const limite = Date.now() - TRASH_DAYS * 864e5;
  for (const n of all.filter((x) => x.trashedAt && x.trashedAt < limite)) await deleteNotebook(n).catch(() => {});
  state.notebooks = all.filter((x) => !x.trashedAt);
  state.trash = all.filter((x) => x.trashedAt && x.trashedAt >= limite).sort((a, b) => b.trashedAt - a.trashedAt);
  state.folders = (await db.all('folders')).sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));
  if (state.nav.startsWith('folder:') && !state.folders.some((f) => 'folder:' + f.id === state.nav)) state.nav = 'all';
  const due = await studyDueCount().catch(() => 0);
  const badge = $('study-due');
  badge.textContent = due ? String(due) : '';
  badge.hidden = !due;
  render();
}

function render() {
  renderTabs();
  renderContent();
}

// Abas internas (no estilo do NEXO) + estado para o menu lateral do NEXO, que lista as pastas.
function renderTabs() {
  document.querySelectorAll('[data-nav]').forEach((b) => {
    const on = b.dataset.nav === state.nav;
    b.classList.toggle('selected', on);
    b.setAttribute('aria-pressed', String(on));
  });
  $('btn-folder-menu').hidden = !currentFolderId();
  const n = state.notebooks.length;
  $('lib-count').textContent = n + (n === 1 ? ' caderno' : ' cadernos');
  const tree = [];
  const walk = (parentId, depth) => {
    for (const f of state.folders.filter((x) => (x.parentId || null) === parentId)) { tree.push([f, depth]); walk(f.id, depth + 1); }
  };
  walk(null, 0);
  if ($('library').hidden) return; // com um caderno aberto, quem informa o NEXO é o editor
  postToNexo({
    type: 'library', nav: state.nav, due: Number($('study-due').textContent) || 0,
    folders: tree.map(([f, depth]) => ({ id: f.id, name: f.name, emoji: f.emoji || '', color: f.color || COVER_COLORS[0], depth,
      count: state.notebooks.filter((x) => x.folderId === f.id).length })),
  });
}

function folderMenu(f, e) {
  showMenu({ x: e.clientX, y: e.clientY, getBoundingClientRect: null }, [
    { label: 'Renomear', icon: 'edit', onClick: async () => {
      const name = await promptDialog('Renomear pasta', { value: f.name });
      if (name) { f.name = name; await db.put('folders', f); refreshLibrary(); }
    } },
    { label: 'Cor e ícone…', icon: 'palette', onClick: async () => {
      const r = await folderDialog({ title: 'Personalizar pasta', name: f.name, color: f.color || FOLDER_COLOR, iconId: f.icon || '', emoji: f.emoji || '', ok: 'Salvar' });
      if (!r) return;
      f.name = r.name; f.color = r.color; f.icon = r.icon; f.emoji = r.emoji;
      await db.put('folders', f);
      refreshLibrary();
    } },
    { label: 'Nova subpasta', icon: 'folder', onClick: () => newFolder(f.id) },
    { label: 'Mover para…', icon: 'folder', onClick: () => moveDialog(f, 'folder') },
    'sep',
    { label: 'Excluir pasta', icon: 'trash', danger: true, onClick: async () => {
      const ok = await confirmDialog('Excluir pasta?', `Os cadernos e subpastas de “${f.name}” não serão apagados: eles sobem um nível.`, { ok: 'Excluir pasta' });
      if (!ok) return;
      await removeFolderKeepingItems(f);
      refreshLibrary();
    } },
  ]);
}

async function newFolder(parentId = null) {
  const r = await folderDialog({ title: parentId ? 'Nova subpasta' : 'Nova pasta', color: FOLDER_COLOR, ok: 'OK' });
  if (!r) return;
  const f = { id: uid(), name: r.name, parentId: parentId || null, color: r.color, icon: r.icon, emoji: r.emoji, createdAt: Date.now() };
  await db.put('folders', f);
  toast('Pasta criada');
  refreshLibrary();
}

function currentFolderId() {
  return state.nav.startsWith('folder:') ? state.nav.slice(7) : null;
}

// ---------- Diálogo de novo caderno / capa ----------
function templatePreview(template, paper, size, spacing = 1) {
  const s = PAGE_SIZES[size] || PAGE_SIZES.a4;
  const c = document.createElement('canvas');
  const w = 64, scale = w / s.w;
  c.width = w * 2; c.height = Math.round(s.h * scale * 2);
  c.style.height = Math.round(s.h * scale) + 'px';
  const ctx = c.getContext('2d');
  ctx.setTransform(scale * 2, 0, 0, scale * 2, 0, 0);
  drawTemplate(ctx, { width: s.w, height: s.h, template, paper, spacing });
  return c;
}

export function pageSetupFields(cfg, { showSize = true, showCustom = true } = {}) {
  const wrap = h('div');
  const tplRow = h('div', { class: 'choice-row' });
  const customRow = h('div', { class: 'choice-row' });
  const paperRow = h('div', { class: 'seg' });
  const sizeRow = h('div', { class: 'seg' });
  const spacingRow = h('div', { class: 'seg' });
  cfg.spacing ??= 1;
  let customs = [];
  const drawCustom = () => {
    if (!showCustom) return;
    customRow.replaceChildren(...customs.map((t) => {
      const prev = h('img', { alt: '', src: t.thumb, class: 'tpl-img' });
      const b = h('button', { class: 'tpl-choice' + (cfg.custom === t.id ? ' active' : ''), type: 'button', title: 'Botão direito para excluir' }, prev, t.name);
      b.addEventListener('click', () => { cfg.custom = t.id; draw(); });
      b.addEventListener('contextmenu', async (e) => {
        e.preventDefault();
        if (await confirmDialog('Excluir modelo?', 'O modelo sai da lista. Páginas que já o usam não mudam.', { ok: 'Excluir' })) {
          await db.delete('templates', t.id);
          customs = customs.filter((x) => x !== t);
          if (cfg.custom === t.id) cfg.custom = null;
          drawCustom();
        }
      });
      return b;
    }), (() => {
      const b = h('button', { class: 'tpl-choice add', type: 'button' }, h('span', { class: 'tpl-plus' }, '+'), 'Importar');
      b.addEventListener('click', async () => {
        const t = await importTemplate();
        if (t) { customs.unshift(t); cfg.custom = t.id; draw(); }
      });
      return b;
    })());
  };
  if (showCustom) db.all('templates').then((list) => { customs = list.sort((a, b) => b.createdAt - a.createdAt); drawCustom(); });
  const draw = () => {
    tplRow.replaceChildren(...Object.entries(TEMPLATES).map(([k, label]) => {
      const b = h('button', { class: 'tpl-choice' + (!cfg.custom && cfg.template === k ? ' active' : ''), type: 'button' }, templatePreview(k, cfg.paper, cfg.size, cfg.spacing), label);
      b.addEventListener('click', () => { cfg.template = k; cfg.custom = null; draw(); });
      return b;
    }));
    drawCustom();
    spacingRow.replaceChildren(...Object.entries(SPACINGS).map(([k, label]) => {
      const b = h('button', { class: Number(k) === cfg.spacing ? 'active' : '', type: 'button' }, label);
      b.addEventListener('click', () => { cfg.spacing = Number(k); draw(); });
      return b;
    }));
    paperRow.replaceChildren(...Object.entries(PAPER_COLORS).map(([k, p]) => {
      const b = h('button', { class: cfg.paper === k ? 'active' : '', type: 'button' }, p.label);
      b.addEventListener('click', () => { cfg.paper = k; draw(); });
      return b;
    }));
    sizeRow.replaceChildren(...Object.entries(PAGE_SIZES).map(([k, p]) => {
      const b = h('button', { class: cfg.size === k ? 'active' : '', type: 'button' }, p.label);
      b.addEventListener('click', () => { cfg.size = k; draw(); });
      return b;
    }));
  };
  draw();
  wrap.append(
    h('div', { class: 'field' }, h('label', {}, 'Modelo de página'), tplRow),
    showCustom ? h('div', { class: 'field' }, h('label', {}, 'Meus modelos (imagem ou PDF)'), customRow) : null,
    h('div', { class: 'row-fields' },
      h('div', { class: 'field' }, h('label', {}, 'Papel'), paperRow),
      h('div', { class: 'field' }, h('label', {}, 'Espaçamento'), spacingRow)),
    showSize ? h('div', { class: 'field' }, h('label', {}, 'Tamanho'), sizeRow) : null,
  );
  return wrap;
}

// Importa uma imagem ou a 1ª página de um PDF como modelo de página reutilizável.
async function importTemplate() {
  const file = await pickFile('file-template');
  if (!file) return null;
  const name = file.name.replace(/\.[^.]+$/, '').slice(0, 40) || 'Modelo';
  try {
    let t;
    if (file.type === 'application/pdf') {
      const assetId = await saveAsset(new Blob([await file.arrayBuffer()], { type: 'application/pdf' }));
      const doc = await loadPdf(assetId);
      const vp = (await doc.getPage(1)).getViewport({ scale: 1 });
      t = { id: uid(), name, kind: 'pdf', assetId, pageIndex: 0, width: vp.width, height: vp.height, createdAt: Date.now() };
      const page = { width: vp.width, height: vp.height, pdf: { assetId, pageIndex: 0 }, strokes: [], texts: [], images: [] };
      const c = document.createElement('canvas');
      await renderPageFlat(page, c, 64);
      t.thumb = c.toDataURL('image/jpeg', 0.8);
    } else if (file.type.startsWith('image/')) {
      const assetId = await saveAsset(file);
      const img = new Image();
      await new Promise((res, rej) => { img.onload = res; img.onerror = rej; img.src = URL.createObjectURL(file); });
      const w = 595, hh = Math.round(595 * (img.naturalHeight / img.naturalWidth));
      const c = document.createElement('canvas');
      c.width = 64; c.height = Math.round(64 * (hh / w));
      c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
      t = { id: uid(), name, kind: 'image', assetId, width: w, height: hh, thumb: c.toDataURL('image/jpeg', 0.8), createdAt: Date.now() };
    } else return null;
    await db.put('templates', t);
    toast('Modelo importado');
    return t;
  } catch (e) {
    console.error(e);
    toast('Não foi possível usar este arquivo como modelo.');
    return null;
  }
}

// Aplica as escolhas do diálogo de modelo numa página.
export async function applyPageSetup(page, cfg, { keepSize = false, keepPdf = false } = {}) {
  page.paper = cfg.paper;
  page.spacing = cfg.spacing || 1;
  if (cfg.custom) {
    const t = await db.get('templates', cfg.custom);
    if (t) {
      page.customTemplate = t.id;
      page.template = 'blank';
      if (t.kind === 'pdf') { page.pdf = { assetId: t.assetId, pageIndex: t.pageIndex || 0 }; page.bgAsset = undefined; }
      else { page.bgAsset = t.assetId; if (!keepPdf) page.pdf = null; }
      if (!keepSize) { page.width = Math.round(t.width); page.height = Math.round(t.height); }
      return;
    }
  }
  if (page.customTemplate) {
    if (page.pdf && !keepPdf) page.pdf = null;
    page.bgAsset = undefined;
    page.customTemplate = undefined;
  }
  page.template = cfg.template;
  if (!keepSize && cfg.size) { const sz = PAGE_SIZES[cfg.size]; page.width = sz.w; page.height = sz.h; }
}

async function newNotebookDialog() {
  const cfg = { title: '', coverId: DEFAULT_COVER_ID, template: 'lined', spacing: 1, paper: 'white', size: 'a4', custom: null };
  const ok = await notebookSetupDialog(cfg, { importTemplate });
  if (!ok) return;
  const nb = makeNotebook(cfg.title || 'Caderno sem título', coverFromPreset(coverPreset(cfg.coverId)), { template: cfg.template, paper: cfg.paper, size: cfg.size, spacing: cfg.spacing });
  const page = newPage(nb.id);
  await applyPageSetup(page, cfg);
  nb.pageIds = [page.id];
  await db.put('pages', page);
  await db.put('notebooks', nb);
  onOpen(nb.id);
}

// Nota rápida: caderno de uma página lisa, já aberto para escrever.
async function quickNote() {
  const d = new Date();
  const title = 'Nota rápida ' + d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }) + ' ' + d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  const cfg = { template: 'blank', spacing: 1, paper: 'white', size: 'a4', custom: null };
  const nb = makeNotebook(title, coverFromPreset(coverPreset('none')), { template: cfg.template, paper: cfg.paper, size: cfg.size, spacing: 1 });
  const page = newPage(nb.id);
  await applyPageSetup(page, cfg);
  nb.pageIds = [page.id];
  await db.put('pages', page);
  await db.put('notebooks', nb);
  onOpen(nb.id);
}

// "Importar": escolhe um PDF ou uma imagem e abre como caderno.
async function importAny() {
  const file = await pickFile('file-any');
  if (!file) return;
  if (file.type === 'application/pdf' || /\.pdf$/i.test(file.name)) importPdfNotebook(file);
  else if (file.type.startsWith('image/')) importImageNotebook(file);
  else toast('Escolha um PDF ou uma imagem.');
}

async function newBoard() {
  const title = await promptDialog('Novo quadro branco', { label: 'Título', value: 'Quadro', ok: 'Criar' });
  if (!title) return;
  const nb = makeNotebook(title, { color: '#34495e', pattern: 'board' }, { template: 'dotted', paper: 'white' });
  nb.kind = 'board';
  const page = newPage(nb.id, { width: 6000, height: 4000, template: 'dotted', paper: 'white', boardCenter: { x: 3000, y: 2000 } });
  nb.pageIds = [page.id];
  await db.put('pages', page);
  await db.put('notebooks', nb);
  onOpen(nb.id);
}

function makeNotebook(title, cover, defaults) {
  const now = Date.now();
  return { id: uid(), title, folderId: currentFolderId(), cover, defaults, favorite: false, createdAt: now, updatedAt: now, pageIds: [] };
}

async function importImageNotebook(fileArg) {
  const file = fileArg instanceof File ? fileArg : await pickFile('file-image');
  if (!file || !file.type.startsWith('image/')) return;
  try {
    const assetId = await saveAsset(file);
    const url = URL.createObjectURL(file);
    const dim = await new Promise((res) => { const im = new Image(); im.onload = () => res({ w: im.naturalWidth || 595, h: im.naturalHeight || 842 }); im.onerror = () => res(null); im.src = url; });
    URL.revokeObjectURL(url);
    if (!dim) return toast('Imagem inválida');
    const width = 595, height = Math.max(200, Math.round(width * dim.h / dim.w));
    const nb = makeNotebook(file.name.replace(/\.[^.]+$/, ''), { color: COVER_COLORS[9], pattern: 'page' }, { template: 'blank', paper: 'white', size: 'a4' });
    nb.kind = 'image';
    const page = newPage(nb.id, { width, height });
    page.images = [{ id: uid(), assetId, x: 0, y: 0, w: width, h: height }];
    nb.pageIds = [page.id];
    await db.put('pages', page);
    await db.put('notebooks', nb);
    toast('Imagem importada');
    onOpen(nb.id);
  } catch (e) {
    console.error(e);
    toast('Não foi possível importar esta imagem.');
  }
}

export async function importPdfNotebook(fileArg) {
  const file = fileArg instanceof File ? fileArg : await pickFile('file-pdf');
  if (!file) return;
  const prog = progressDialog('Importando PDF');
  try {
    const nb = makeNotebook(file.name.replace(/\.pdf$/i, ''), { color: COVER_COLORS[1], pattern: 'page' }, { template: 'blank', paper: 'white', size: 'a4' });
    const pages = await importPdf(file, nb.id, (f, t) => prog.set(f, t));
    nb.pageIds = pages.map((p) => p.id);
    nb.outline = await outlineForPages(pages).catch(() => []);
    await db.putMany('pages', pages);
    await db.put('notebooks', nb);
    prog.close();
    onOpen(nb.id);
  } catch (e) {
    console.error(e);
    prog.close();
    toast('Não foi possível abrir este PDF. Ele pode estar protegido por senha ou corrompido.', { duration: 5000 });
  }
}

// ---------- Conteúdo ----------
const SORTS = [['created', 'Data de criação'], ['updated', 'Última modificação'], ['title', 'Nome'], ['type', 'Tipo']];
const typeRank = (n) => (n.kind === 'board' ? 1 : n.kind === 'image' ? 2 : n.cover?.pattern === 'page' && n.cover?.id !== 'none' ? 3 : 0);
function sorted(list) {
  const s = [...list];
  const sign = state.dir === 'asc' ? 1 : -1;
  const byTitle = (a, b) => a.title.localeCompare(b.title, 'pt-BR', { numeric: true });
  if (state.sort === 'title') s.sort((a, b) => sign * byTitle(a, b));
  else if (state.sort === 'created') s.sort((a, b) => sign * (a.createdAt - b.createdAt));
  else if (state.sort === 'type') s.sort((a, b) => sign * (typeRank(a) - typeRank(b)) || byTitle(a, b));
  else s.sort((a, b) => sign * (a.updatedAt - b.updatedAt));
  return s;
}
function sortedFolders(list) {
  const s = [...list];
  const sign = state.dir === 'asc' ? 1 : -1;
  if (state.sort === 'created' || state.sort === 'updated') s.sort((a, b) => sign * ((a.createdAt || 0) - (b.createdAt || 0)));
  else s.sort((a, b) => (state.sort === 'title' ? sign : 1) * a.name.localeCompare(b.name, 'pt-BR', { numeric: true }));
  return s;
}

function setView(v) { state.view = v; try { localStorage.setItem(VIEW_KEY, v); } catch { /* sem armazenamento */ } renderContent(); }
function setSort(key) {
  if (state.sort === key) state.dir = state.dir === 'desc' ? 'asc' : 'desc';
  else { state.sort = key; state.dir = key === 'title' || key === 'type' ? 'asc' : 'desc'; }
  try { localStorage.setItem('acervo.sort', state.sort); localStorage.setItem('acervo.dir', state.dir); } catch { /* sem armazenamento */ }
  renderContent();
}
function viewMenu(anchor) {
  showMenu(anchor, [
    { label: state.selecting ? 'Sair da seleção' : 'Selecionar elementos', icon: '<circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.7 2.7L16 9.5"/>', onClick: () => setSelecting(!state.selecting) },
    'sep',
    { label: 'Grelha', icon: '<rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/>', checked: state.view === 'grid', onClick: () => setView('grid') },
    { label: 'Lista', icon: '<path d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01"/>', checked: state.view === 'list', onClick: () => setView('list') },
    'sep',
    ...SORTS.map(([k, label]) => ({ label: label + (state.sort === k ? (state.dir === 'desc' ? '  ↓' : '  ↑') : ''), checked: state.sort === k, onClick: () => setSort(k) })),
  ], { align: 'right' });
}

function folderOf(id) { return state.folders.find((x) => x.id === id); }
function parentKey(f) { return f.parentId && folderOf(f.parentId) ? f.parentId : null; }
function nbFolderKey(n) { return n.folderId && folderOf(n.folderId) ? n.folderId : null; }
function folderChain(id) {
  const chain = [];
  for (let f = folderOf(id), i = 0; f && i < 50; f = folderOf(f.parentId), i++) chain.unshift(f);
  return chain;
}
function descendantIds(id) {
  const out = new Set([id]);
  let grew = true;
  while (grew) { grew = false; for (const f of state.folders) if (!out.has(f.id) && out.has(f.parentId)) { out.add(f.id); grew = true; } }
  return out;
}
function itemCount(id) {
  return state.folders.filter((x) => parentKey(x) === id).length + state.notebooks.filter((x) => nbFolderKey(x) === id).length;
}

async function renderContent() {
  const content = $('lib-content');
  if (state.query) return renderSearch(content);
  let list = state.notebooks, title = 'Documentos';
  if (state.nav === 'favorites') { list = list.filter((n) => n.favorite); title = 'Favoritos'; }
  else if (state.nav === 'bookmarks') { $('lib-title').textContent = 'Páginas marcadas'; return renderBookmarks(content); }
  else if (state.nav === 'study') { $('lib-title').textContent = 'Estudar'; return renderStudyView(content, () => refreshLibrary()); }
  else if (state.nav === 'trash') { $('lib-title').textContent = 'Lixeira'; return renderTrash(content); }
  let subfolders = [];
  const explorer = state.nav === 'all' || state.nav.startsWith('folder:');
  const here = explorer ? currentFolderId() : null;
  if (state.nav === 'favorites') subfolders = state.folders.filter((x) => x.favorite);
  if (explorer) {
    list = list.filter((n) => nbFolderKey(n) === here);
    subfolders = state.folders.filter((x) => parentKey(x) === here);
    const f = here && folderOf(here);
    if (f) title = (f.emoji ? f.emoji + ' ' : '') + f.name;
  }
  $('lib-title').textContent = title;
  content.replaceChildren();
  if (explorer) content.append(breadcrumb(here));
  if (!list.length && !subfolders.length) {
    content.append(here ? folderEmpty() : emptyState(state.nav));
    return;
  }
  if (state.view === 'list') {
    const rows = h('div', { class: 'list-view', role: 'list' });
    for (const sf of sortedFolders(subfolders)) rows.append(listRow(sf, true));
    for (const nb of sorted(list)) rows.append(listRow(nb, false));
    content.append(rows);
    return;
  }
  if (subfolders.length) {
    const row = h('div', { class: 'folder-tiles' });
    for (const sf of sortedFolders(subfolders)) row.append(folderTile(sf));
    content.append(row);
  }
  const grid = h('div', { class: 'grid' });
  for (const nb of sorted(list)) grid.append(card(nb));
  content.append(grid);
}

// Visualização em lista: miniatura, nome, data, estrela e seta, como no app do celular.
function listRow(item, isFolder) {
  const when = new Date(isFolder ? (item.createdAt || Date.now()) : item.updatedAt).toLocaleDateString('pt-BR');
  const thumb = isFolder
    ? h('span', { class: 'lr-folder' }, folderGlyph(item.color || FOLDER_COLOR, item.icon, item.emoji))
    : h('span', { class: 'lr-cover' }, buildCover(item, { mini: true }));
  const star = h('button', { type: 'button', class: 'icon-btn small star' + (item.favorite ? ' on' : ''), title: item.favorite ? 'Remover dos favoritos' : 'Favoritar', 'aria-label': 'Favorito' }, icon(ICONS.star));
  star.addEventListener('click', async (e) => {
    e.stopPropagation();
    if (state.selecting) return;
    item.favorite = !item.favorite;
    await db.put(isFolder ? 'folders' : 'notebooks', item);
    refreshLibrary();
  });
  const name = isFolder ? item.name : item.title;
  const row = h('div', { class: 'list-row', role: 'listitem', tabindex: '0', draggable: 'true', 'data-id': item.id },
    thumb, h('span', { class: 'lr-text' }, h('b', { title: name }, name), h('small', {}, isFolder ? `${when} · ${itemCount(item.id)} itens` : when)), star,
    h('span', { class: 'lr-chev', 'aria-hidden': 'true' }, icon('<path d="M9 6l6 6-6 6"/>')));
  const pick = () => { state.selected.has(item.id) ? state.selected.delete(item.id) : state.selected.add(item.id); row.classList.toggle('selected', state.selected.has(item.id)); row.setAttribute('aria-selected', String(state.selected.has(item.id))); renderSelectionBar(); };
  if (state.selecting) {
    row.classList.add('selectable');
    row.classList.toggle('selected', state.selected.has(item.id));
    row.prepend(h('span', { class: 'sel-check', 'aria-hidden': 'true' }));
  }
  const go = () => (state.selecting ? pick() : isFolder ? setNav('folder:' + item.id) : onOpen(item.id));
  row.addEventListener('click', go);
  row.addEventListener('keydown', (e) => { if (e.key === 'Enter' || (state.selecting && e.key === ' ')) { e.preventDefault(); go(); } });
  row.addEventListener('contextmenu', (e) => { e.preventDefault(); (isFolder ? folderMenu : notebookMenu)(item, isFolder ? e : { getBoundingClientRect: () => ({ left: e.clientX, right: e.clientX, top: e.clientY, bottom: e.clientY }) }); });
  row.addEventListener('dragstart', (e) => e.dataTransfer.setData(isFolder ? 'text/acervo-folder' : 'text/acervo-notebook', item.id));
  if (isFolder) enableDrop(row, item.id);
  return row;
}

// Caminho no estilo do explorador de arquivos; cada trecho também aceita soltar itens.
function breadcrumb(here) {
  const bar = h('nav', { class: 'crumbs', 'aria-label': 'Caminho da pasta' });
  const part = (label, id, last) => {
    const b = h('button', { class: 'crumb' + (last ? ' current' : ''), type: 'button' }, label);
    if (!last) b.addEventListener('click', () => setNav(id ? 'folder:' + id : 'all'));
    enableDrop(b, id);
    return b;
  };
  const chain = here ? folderChain(here) : [];
  bar.append(part('Documentos', null, !chain.length));
  chain.forEach((f, i) => {
    bar.append(h('span', { class: 'crumb-sep' }, '›'));
    bar.append(part((f.emoji ? f.emoji + ' ' : '') + f.name, f.id, i === chain.length - 1));
  });
  return bar;
}

function folderEmpty() {
  const art = icon(FOLDER_SVG);
  art.setAttribute('viewBox', '0 0 24 24');
  art.classList.add('empty-art');
  return h('div', { class: 'empty' }, h('div', {}, art, h('h2', {}, 'Esta pasta está vazia'),
    h('div', {}, 'Crie subpastas, cadernos, quadros e importe PDFs ou imagens aqui dentro.'),
    h('div', { class: 'row' },
      h('button', { class: 'btn', onclick: () => newFolder(currentFolderId()) }, 'Nova pasta'),
      h('button', { class: 'btn', onclick: () => importPdfNotebook() }, 'Importar PDF'),
      h('button', { class: 'btn primary', onclick: () => newNotebookDialog() }, 'Novo caderno'))));
}

function folderTile(sf) {
  const n = itemCount(sf.id);
  const more = h('span', { class: 'ft-more', role: 'button', tabindex: '0', 'aria-label': 'Opções da pasta' },
    icon('<circle cx="5" cy="12" r="1.3"/><circle cx="12" cy="12" r="1.3"/><circle cx="19" cy="12" r="1.3"/>'));
  const tile = h('button', { class: 'folder-tile', type: 'button', draggable: 'true', title: sf.name, 'data-id': sf.id },
    h('span', { class: 'ft-icon' }, folderGlyph(sf.color || FOLDER_COLOR, sf.icon, sf.emoji)),
    h('span', { class: 'ft-text' }, h('b', {}, sf.name), h('small', {}, n + (n === 1 ? ' item' : ' itens'))),
    h('span', { class: 'ft-star' + (sf.favorite ? ' on' : ''), role: 'button', tabindex: '0', title: sf.favorite ? 'Remover dos favoritos' : 'Favoritar', 'aria-label': 'Favorito' }, icon(ICONS.star)), more);
  const pick = () => { state.selected.has(sf.id) ? state.selected.delete(sf.id) : state.selected.add(sf.id); tile.classList.toggle('selected', state.selected.has(sf.id)); tile.setAttribute('aria-pressed', String(state.selected.has(sf.id))); renderSelectionBar(); };
  if (state.selecting) {
    tile.classList.add('selectable');
    tile.classList.toggle('selected', state.selected.has(sf.id));
    tile.setAttribute('aria-pressed', String(state.selected.has(sf.id)));
    tile.prepend(h('span', { class: 'sel-check', 'aria-hidden': 'true' }));
  }
  tile.addEventListener('click', (e) => {
    if (state.selecting) { e.preventDefault(); pick(); return; }
    if (e.target.closest('.ft-star')) { e.stopPropagation(); sf.favorite = !sf.favorite; db.put('folders', sf).then(refreshLibrary); return; }
    if (e.target.closest('.ft-more')) { e.stopPropagation(); const r = more.getBoundingClientRect(); folderMenu(sf, { clientX: r.left, clientY: r.bottom + 4 }); return; }
    setNav('folder:' + sf.id);
  });
  tile.addEventListener('contextmenu', (e) => { e.preventDefault(); folderMenu(sf, e); });
  tile.addEventListener('dragstart', (e) => e.dataTransfer.setData('text/acervo-folder', sf.id));
  enableDrop(tile, sf.id);
  return tile;
}

// Soltar um caderno ou uma pasta sobre uma pasta (ou sobre um trecho do caminho) move o item.
function enableDrop(el, folderId) {
  const ok = (e) => [...(e.dataTransfer?.types || [])].some((t) => t === 'text/acervo-notebook' || t === 'text/acervo-folder');
  el.addEventListener('dragover', (e) => { if (ok(e)) { e.preventDefault(); el.classList.add('drop-on'); } });
  el.addEventListener('dragleave', () => el.classList.remove('drop-on'));
  el.addEventListener('drop', async (e) => {
    el.classList.remove('drop-on');
    if (!ok(e)) return;
    e.preventDefault();
    e.stopPropagation();
    const nbId = e.dataTransfer.getData('text/acervo-notebook');
    const fId = e.dataTransfer.getData('text/acervo-folder');
    if (nbId) {
      const nb = state.notebooks.find((x) => x.id === nbId);
      if (nb && (nb.folderId || null) !== (folderId || null)) { nb.folderId = folderId || null; await db.put('notebooks', nb); toast('Movido'); refreshLibrary(); }
    } else if (fId) {
      const f = folderOf(fId);
      if (!f || f.id === folderId || (folderId && descendantIds(f.id).has(folderId))) return toast('Não dá para mover a pasta para dentro dela mesma');
      if ((f.parentId || null) === (folderId || null)) return;
      f.parentId = folderId || null;
      await db.put('folders', f);
      toast('Movido');
      refreshLibrary();
    }
  });
}

function emptyState(nav) {
  const art = icon('<path d="M20 30h50a8 8 0 0 1 8 8v52H28a8 8 0 0 1-8-8z"/><path d="M28 90a8 8 0 0 1 0-16h50"/><path d="M36 44h30M36 54h22"/>');
  art.setAttribute('viewBox', '0 0 110 110');
  art.classList.add('empty-art');
  const msgs = {
    favorites: ['Nenhum favorito', 'Toque na estrela de um caderno para encontrá-lo aqui rapidinho.'],
    default: ['Comece seu primeiro caderno', 'Crie um caderno em branco ou importe slides e apostilas em PDF para anotar por cima.'],
  };
  const [t, d] = msgs[nav] || msgs.default;
  return h('div', { class: 'empty' }, h('div', {}, art, h('h2', {}, t), h('div', {}, d),
    nav === 'favorites' ? null : h('div', { class: 'row' },
      h('button', { class: 'btn', onclick: () => importPdfNotebook() }, 'Importar PDF'),
      h('button', { class: 'btn primary', onclick: () => newNotebookDialog() }, 'Novo caderno'))));
}

function kindIcon(nb) {
  const pdf = nb.cover?.pattern === 'page' && nb.kind !== 'image' && nb.cover?.id !== 'none';
  const svg = nb.kind === 'board' ? '<rect x="3" y="4" width="18" height="14" rx="2"/><path d="M8 21h8"/>'
    : nb.kind === 'image' ? IMG_ICON
    : pdf ? '<path d="M7 3h7l5 5v13H7zM14 3v5h5"/>'
    : '<path d="M6 3h11a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H6zM6 3v18M10 8h5"/>';
  const i = icon(svg);
  i.classList.add('kind-ico');
  return i;
}

function buildCover(nb, { mini = false } = {}) {
  const cover = h('div', { class: 'cover pattern-' + (nb.cover?.pattern || 'plain'), style: { '--c': nb.cover?.color || COVER_COLORS[0] } });
  const preset = nb.kind !== 'board' && nb.cover?.pattern !== 'page' && applyCover(cover, nb.cover);
  if (nb.cover?.id === 'none') {
    cover.classList.add('cover-none');
    loadThumb(nb).then((url) => { if (url) cover.prepend(h('img', { class: 'thumb', src: url, alt: '' })); });
  } else if (nb.kind === 'board') {
    cover.classList.add('board-cover');
    if (!mini) cover.append(h('div', { class: 'cover-label' }, nb.title), h('span', { class: 'pdf-badge' }, 'QUADRO'));
  } else if (nb.cover?.pattern === 'page' && !preset) {
    if (!mini) cover.append(h('span', { class: 'pdf-badge' }, `${nb.pageIds.length} pág.`));
    loadThumb(nb).then((url) => { if (url) cover.prepend(h('img', { class: 'thumb', src: url, alt: '' })); });
  } else if (!mini) {
    cover.append(h('div', { class: 'cover-label' }, nb.title));
  }
  return cover;
}

function card(nb) {
  const cover = buildCover(nb);
  const star = h('button', { class: 'icon-btn small star' + (nb.favorite ? ' on' : ''), title: nb.favorite ? 'Remover dos favoritos' : 'Favoritar', 'aria-label': 'Favorito' }, icon(ICONS.star));
  star.addEventListener('click', async (e) => {
    e.stopPropagation();
    if (state.selecting) return;
    nb.favorite = !nb.favorite;
    await db.put('notebooks', nb);
    refreshLibrary();
  });
  const more = h('button', { class: 'icon-btn small', 'aria-label': 'Opções' }, icon('<circle cx="5" cy="12" r="1.3"/><circle cx="12" cy="12" r="1.3"/><circle cx="19" cy="12" r="1.3"/>'));
  more.addEventListener('click', (e) => { e.stopPropagation(); notebookMenu(nb, more); });
  const el = h('div', { class: 'card', draggable: 'true', tabindex: '0', 'data-id': nb.id }, cover,
    h('div', { class: 'card-meta' },
      h('div', { class: 't' }, h('div', { class: 'name', title: nb.title }, kindIcon(nb), nb.title), h('div', { class: 'sub' }, relativeDate(nb.updatedAt))),
      star, more));
  const pick = () => { state.selected.has(nb.id) ? state.selected.delete(nb.id) : state.selected.add(nb.id); el.classList.toggle('selected', state.selected.has(nb.id)); el.setAttribute('aria-pressed', String(state.selected.has(nb.id))); renderSelectionBar(); };
  if (state.selecting) {
    el.classList.add('selectable');
    el.classList.toggle('selected', state.selected.has(nb.id));
    el.setAttribute('aria-pressed', String(state.selected.has(nb.id)));
    el.prepend(h('span', { class: 'sel-check', 'aria-hidden': 'true' }));
  }
  el.addEventListener('click', (e) => { if (state.selecting) { e.preventDefault(); pick(); } else onOpen(nb.id); });
  el.addEventListener('keydown', (e) => { if (e.key === 'Enter' || (state.selecting && e.key === ' ')) { e.preventDefault(); state.selecting ? pick() : onOpen(nb.id); } });
  el.addEventListener('contextmenu', (e) => { e.preventDefault(); notebookMenu(nb, { getBoundingClientRect: () => ({ left: e.clientX, right: e.clientX, top: e.clientY, bottom: e.clientY }) }); });
  el.addEventListener('dragstart', (e) => e.dataTransfer.setData('text/acervo-notebook', nb.id));
  return el;
}

async function loadThumb(nb) {
  const key = nb.updatedAt + ':' + nb.pageIds[0];
  const c = thumbCache.get(nb.id);
  if (c && c.key === key) return c.url;
  const page = nb.pageIds[0] && (await db.get('pages', nb.pageIds[0]));
  if (!page) return null;
  const canvas = document.createElement('canvas');
  await renderPageFlat(page, canvas, 220);
  const url = canvas.toDataURL('image/jpeg', 0.82);
  thumbCache.set(nb.id, { key, url });
  return url;
}

function notebookMenu(nb, anchor) {
  showMenu(anchor, [
    { label: 'Abrir', icon: 'page', onClick: () => onOpen(nb.id) },
    { label: 'Alterar nome', icon: 'edit', onClick: async () => {
      const t = await promptDialog('Alterar nome', { value: nb.title });
      if (t) { nb.title = t; nb.updatedAt = Date.now(); await db.put('notebooks', nb); refreshLibrary(); }
    } },
    { label: 'Duplicar', icon: 'copy', onClick: () => duplicateNotebook(nb) },
    { label: 'Exportar como PDF', icon: 'pdf', onClick: () => exportPdfFlow(nb) },
    { label: 'Mover', icon: '<path d="M10 4H5v16h5M14 8l4 4-4 4M18 12H9"/>', onClick: () => moveDialog(nb) },
    { label: nb.favorite ? 'Remover dos favoritos' : 'Favoritar', icon: 'star', onClick: async () => { nb.favorite = !nb.favorite; await db.put('notebooks', nb); refreshLibrary(); } },
    nb.kind === 'board' || nb.cover?.pattern === 'page' && nb.cover?.id !== 'none' ? null : { label: 'Capa…', icon: 'palette', onClick: () => editCover(nb) },
    { label: 'Compartilhar…', icon: '<circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0 1 12 0M17 11a3 3 0 1 0 0-6M21 20a5 5 0 0 0-4-5"/>', onClick: () => shareNotebook(nb) },
    'sep',
    { label: 'Mover para o lixo', icon: 'trash', danger: true, onClick: () => trashNotebook(nb) },
  ], { align: 'right' });
}

// Compartilha o caderno como PDF (folha de compartilhamento do aparelho; senão baixa o arquivo).
async function shareNotebook(nb) {
  const prog = progressDialog('Preparando PDF');
  try {
    const pages = await getNotebookPages(nb);
    const blob = await exportNotebookPdf(nb, pages, (f, t) => prog.set(f, t));
    prog.close();
    const file = new File([blob], safeFilename(nb.title) + '.pdf', { type: 'application/pdf' });
    if (navigator.canShare?.({ files: [file] })) {
      try { await navigator.share({ files: [file], title: nb.title }); return; } catch (e) { if (e?.name === 'AbortError') return; }
    }
    download(blob, file.name);
    toast('Este aparelho não abre o compartilhamento: o PDF foi baixado.');
  } catch (e) {
    console.error(e);
    prog.close();
    toast('Não foi possível preparar o PDF: ' + (e.message || e), { duration: 5000 });
  }
}

async function editCover(nb) {
  const cfg = { title: nb.title, coverId: nb.cover?.id || DEFAULT_COVER_ID };
  const ok = await notebookSetupDialog(cfg, { mode: 'cover', heading: 'Capa do caderno', ok: 'Salvar' });
  if (!ok) return;
  nb.cover = coverFromPreset(coverPreset(cfg.coverId));
  if (cfg.title) nb.title = cfg.title;
  nb.updatedAt = Date.now();
  await db.put('notebooks', nb);
  refreshLibrary();
}

async function moveDialog(item, kind = 'notebook') {
  const current = kind === 'folder' ? (item.parentId || null) : (item.folderId || null);
  const target = await pickFolderDialog(current, kind === 'folder' ? descendantIds(item.id) : new Set());
  if (target === undefined) return;
  if (kind === 'folder') { item.parentId = target; await db.put('folders', item); }
  else { item.folderId = target; await db.put('notebooks', item); }
  refreshLibrary();
}

// Escolher pasta de destino. Devolve o id (null = raiz) ou undefined se cancelar.
async function pickFolderDialog(current, blocked = new Set()) {
  const target = await modal((box, close) => {
    const list = h('div', { class: 'nav move-list' });
    const opt = (id, name, color, depth) => {
      const b = h('button', { class: 'nav-item' + (current === id ? ' active' : ''), style: { paddingLeft: 8 + depth * 18 + 'px' } },
        h('span', { class: 'folder-dot', style: { background: color || 'var(--ink-3)' } }), name);
      b.addEventListener('click', () => close({ id }));
      return b;
    };
    list.append(opt(null, 'Documentos (raiz)', null, 0));
    const walk = (pid, depth) => {
      for (const f of state.folders.filter((x) => parentKey(x) === pid && !blocked.has(x.id))) {
        list.append(opt(f.id, (f.emoji ? f.emoji + ' ' : '') + f.name, f.color, depth));
        walk(f.id, depth + 1);
      }
    };
    walk(null, 1);
    box.append(h('h2', {}, 'Mover para…'), list, h('div', { class: 'actions' },
      h('button', { class: 'btn', onclick: async () => {
        const name = await promptDialog('Nova pasta', { label: 'Nome da pasta', ok: 'Criar' });
        if (!name) return;
        const f = { id: uid(), name, parentId: null, color: COVER_COLORS[state.folders.length % COVER_COLORS.length], createdAt: Date.now() };
        await db.put('folders', f);
        state.folders.push(f);
        close({ id: f.id });
      } }, 'Nova pasta'),
      h('button', { class: 'btn ghost', onclick: () => close() }, 'Cancelar')));
  });
  return target ? target.id : undefined;
}

// ---------- Seleção em lote ----------
function setSelecting(on, { silent = false } = {}) {
  state.selecting = on;
  state.selected = new Set();
  const b = document.getElementById('btn-select');
  if (b) { b.classList.toggle('primary', on); b.querySelector('span').textContent = on ? 'Cancelar' : 'Selecionar'; }
  if (!silent) renderContent();
  renderSelectionBar();
}

function renderSelectionBar() {
  document.getElementById('sel-bar')?.remove();
  if (!state.selecting) return;
  const n = state.selected.size;
  const books = () => state.notebooks.filter((x) => state.selected.has(x.id));
  const dirs = () => state.folders.filter((x) => state.selected.has(x.id));
  const hasFolder = dirs().length > 0;
  const bar = h('div', { class: 'sel-bar', id: 'sel-bar', role: 'toolbar', 'aria-label': 'Ações com os itens selecionados' },
    h('button', { class: 'icon-btn small', title: 'Sair da seleção', 'aria-label': 'Sair da seleção', onclick: () => setSelecting(false) }, icon(ICONS.clear)),
    h('b', {}, n ? `${n} selecionada${n === 1 ? '' : 's'}` : 'Toque nos itens'),
    h('button', { class: 'btn small', onclick: () => {
      for (const c of document.querySelectorAll('#lib-content .selectable[data-id]')) state.selected.add(c.dataset.id);
      renderContent(); renderSelectionBar();
    } }, 'Selecionar tudo'),
    h('span', { class: 'sel-sep' }),
    h('button', { class: 'btn small', disabled: !n || hasFolder, title: hasFolder ? 'Pastas não podem ser duplicadas' : '', onclick: async () => {
      const list = books();
      for (const x of list) await duplicateNotebook(x);
      setSelecting(false); refreshLibrary();
    } }, icon('<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V4H4v12h4"/>'), 'Duplicar'),
    h('button', { class: 'btn small', disabled: !n, onclick: async () => { await moveMany(books(), dirs()); } }, 'Mover'),
    h('button', { class: 'btn small', disabled: !books().length, onclick: async () => {
      const list = books(); const fav = !list.every((x) => x.favorite);
      for (const x of list) { x.favorite = fav; } await db.putMany('notebooks', list);
      toast(fav ? 'Adicionados aos favoritos' : 'Removidos dos favoritos'); setSelecting(false); refreshLibrary();
    } }, 'Favoritar'),
    h('button', { class: 'btn small danger', disabled: !n, onclick: async () => {
      const list = books(), folders = dirs(); const now = Date.now();
      if (folders.length) {
        const ok = await confirmDialog('Apagar seleção?', `${folders.length === 1 ? 'A pasta' : 'As pastas'} será apagada, mas os cadernos e subpastas de dentro sobem um nível. Os cadernos selecionados vão para a lixeira.`, { ok: 'Apagar', danger: true });
        if (!ok) return;
        for (const f of folders) await removeFolderKeepingItems(f, new Set(folders.map((x) => x.id)));
      }
      for (const x of list) x.trashedAt = now;
      if (list.length) await db.putMany('notebooks', list);
      setSelecting(false); refreshLibrary();
      if (list.length) toast(`${list.length} caderno${list.length === 1 ? '' : 's'} na lixeira`, { action: 'Desfazer', duration: 6000, onAction: async () => {
        for (const x of list) delete x.trashedAt; await db.putMany('notebooks', list); refreshLibrary();
      } });
    } }, icon(ICONS.trash), 'Apagar'));
  document.body.append(bar);
}

// Apaga a pasta e sobe os itens de dentro para o nível acima (ignorando outras pastas apagadas junto).
async function removeFolderKeepingItems(f, alsoRemoved = new Set()) {
  let up = f.parentId || null;
  while (up && alsoRemoved.has(up)) up = folderOf(up)?.parentId || null;
  for (const n of state.notebooks.filter((x) => x.folderId === f.id)) { n.folderId = up; await db.put('notebooks', n); }
  for (const sub of state.folders.filter((x) => x.parentId === f.id && !alsoRemoved.has(x.id))) { sub.parentId = up; await db.put('folders', sub); }
  await db.delete('folders', f.id);
}

async function moveMany(list, dirs = []) {
  if (!list.length && !dirs.length) return;
  const all = [...list, ...dirs];
  const blocked = new Set();
  for (const f of dirs) { blocked.add(f.id); for (const id of descendantIds(f.id)) blocked.add(id); }
  const key = (x) => (x.folderId !== undefined ? x.folderId : x.parentId) || null;
  const same = all.every((x) => key(x) === key(all[0]));
  const target = await pickFolderDialog(same ? key(all[0]) : null, blocked);
  if (target === undefined) return;
  for (const x of list) x.folderId = target;
  for (const f of dirs) f.parentId = target;
  if (list.length) await db.putMany('notebooks', list);
  if (dirs.length) await db.putMany('folders', dirs);
  toast(`${all.length} ${all.length === 1 ? 'item movido' : 'itens movidos'}`);
  setSelecting(false);
  refreshLibrary();
}

async function trashNotebook(nb) {
  nb.trashedAt = Date.now();
  await db.put('notebooks', nb);
  refreshLibrary();
  toast(`“${nb.title}” foi para a lixeira`, { action: 'Desfazer', onAction: () => restoreNotebook(nb), duration: 6000 });
}

async function restoreNotebook(nb) {
  delete nb.trashedAt;
  // se a pasta foi apagada enquanto o caderno estava na lixeira, ele volta para a raiz
  if (nb.folderId && !state.folders.some((f) => f.id === nb.folderId)) nb.folderId = null;
  await db.put('notebooks', nb);
  toast('Caderno restaurado');
  refreshLibrary();
}

async function purgeNotebook(nb) {
  const ok = await confirmDialog('Excluir definitivamente?', `“${nb.title}” e todas as suas páginas serão apagados deste aparelho. Isso não pode ser desfeito.`, { ok: 'Excluir', danger: true });
  if (!ok) return;
  await deleteNotebook(nb);
  toast('Caderno excluído definitivamente');
  refreshLibrary();
}

function renderTrash(content) {
  content.replaceChildren();
  const list = state.trash || [];
  if (!list.length) {
    content.append(h('div', { class: 'empty' }, h('div', {}, h('h2', {}, 'A lixeira está vazia'),
      h('div', {}, `Cadernos excluídos ficam aqui por ${TRASH_DAYS} dias e podem ser restaurados.`))));
    return;
  }
  content.append(h('div', { class: 'trash-head' },
    h('p', {}, `Cadernos excluídos ficam aqui por ${TRASH_DAYS} dias e depois são apagados de vez.`),
    h('button', { class: 'btn', onclick: async () => {
      const ok = await confirmDialog('Esvaziar a lixeira?', `${list.length} ${list.length === 1 ? 'caderno será apagado' : 'cadernos serão apagados'} deste aparelho. Isso não pode ser desfeito.`, { ok: 'Esvaziar', danger: true });
      if (!ok) return;
      for (const n of list) await deleteNotebook(n);
      toast('Lixeira esvaziada');
      refreshLibrary();
    } }, 'Esvaziar lixeira')));
  const rows = h('div', { class: 'results trash-list' });
  for (const nb of list) {
    const dias = Math.max(0, TRASH_DAYS - Math.floor((Date.now() - nb.trashedAt) / 864e5));
    rows.append(h('div', { class: 'result trash-row' },
      h('div', { class: 'swatch', style: { background: nb.cover?.color || COVER_COLORS[0] } }),
      h('div', { class: 'trash-info' }, h('div', { class: 'r-title' }, nb.title),
        h('div', { class: 'r-snip' }, `${nb.pageIds.length} pág. · excluído ${relativeDate(nb.trashedAt)} · apagado de vez em ${dias} ${dias === 1 ? 'dia' : 'dias'}`)),
      h('div', { class: 'row' },
        h('button', { class: 'btn', onclick: () => restoreNotebook(nb) }, 'Restaurar'),
        h('button', { class: 'btn danger', onclick: () => purgeNotebook(nb) }, 'Excluir definitivamente'))));
  }
  content.append(rows);
}

async function duplicateNotebook(nb) {
  const pages = await getNotebookPages(nb);
  const copy = { ...structuredClone(nb), id: uid(), title: nb.title + ' (cópia)', createdAt: Date.now(), updatedAt: Date.now(), favorite: false };
  const idMap = new Map(pages.map((p) => [p.id, uid()]));
  const newPages = pages.map((p) => ({ ...structuredClone(p), id: idMap.get(p.id), notebookId: copy.id }));
  copy.pageIds = newPages.map((p) => p.id);
  // a cópia aponta para as próprias páginas: sumário e links "página deste caderno" seguem o novo ID
  copy.outline = (copy.outline || []).filter((o) => idMap.has(o.pageId)).map((o) => ({ ...o, pageId: idMap.get(o.pageId) }));
  for (const p of newPages) {
    p.links = (p.links || []).map((l) => (l.target?.type === 'page' && idMap.has(l.target.pageId)
      ? { ...l, id: uid(), target: { ...l.target, pageId: idMap.get(l.target.pageId) } } : { ...l, id: uid() }));
  }
  delete copy.trashedAt;
  copy.trashedPages = [];
  await db.putMany('pages', newPages);
  await db.put('notebooks', copy);
  toast('Caderno duplicado');
  refreshLibrary();
}

export async function exportPdfFlow(nb) {
  const prog = progressDialog('Exportando PDF');
  try {
    const pages = await getNotebookPages(nb);
    const blob = await exportNotebookPdf(nb, pages, (f, t) => prog.set(f, t));
    prog.close();
    download(blob, safeFilename(nb.title) + '.pdf');
  } catch (e) {
    console.error(e);
    prog.close();
    toast('Não foi possível exportar: ' + (e.message || e), { duration: 5000 });
  }
}

// ---------- Busca global ----------
async function renderSearch(content) {
  $('lib-title').textContent = 'Busca';
  const q = normalize(state.query);
  const nbs = state.notebooks;
  const byId = new Map(nbs.map((n) => [n.id, n]));
  const titleHits = nbs.filter((n) => normalize(n.title).includes(q));
  const pages = await db.all('pages');
  const pageHits = [];
  for (const p of pages) {
    const nb = byId.get(p.notebookId);
    if (!nb || p.trashedAt) continue;
    const texts = [p.pdfText || '', p.inkText || '', ...(p.texts || []).map((t) => t.text)];
    const hit = texts.find((t) => normalize(t).includes(q));
    if (hit) pageHits.push({ nb, page: p, index: nb.pageIds.indexOf(p.id), text: hit });
  }
  pageHits.sort((a, b) => (b.nb.updatedAt - a.nb.updatedAt) || (a.index - b.index));
  content.replaceChildren();
  if (!titleHits.length && !pageHits.length) {
    content.append(h('div', { class: 'empty' }, h('div', {}, h('h2', {}, 'Nada encontrado'),
      h('div', {}, `Nenhum caderno, PDF ou texto contém “${state.query}”.`))));
    return;
  }
  if (titleHits.length) {
    content.append(h('div', { class: 'section-title' }, `Cadernos (${titleHits.length})`));
    const grid = h('div', { class: 'grid' });
    for (const nb of sorted(titleHits)) grid.append(card(nb));
    content.append(grid);
  }
  if (pageHits.length) {
    content.append(h('div', { class: 'section-title' }, `Nas páginas (${pageHits.length})`));
    const list = h('div', { class: 'results' });
    for (const r of pageHits.slice(0, 200)) {
      const el = h('div', { class: 'result' },
        h('div', { class: 'swatch', style: { background: r.nb.cover?.color || COVER_COLORS[0] } }),
        h('div', {}, h('div', { class: 'r-title' }, `${r.nb.title} · página ${r.index + 1}`),
          h('div', { class: 'r-snip', html: snippet(r.text, state.query) })));
      el.addEventListener('click', () => onOpen(r.nb.id, { pageIndex: r.index, query: state.query }));
      list.append(el);
    }
    content.append(list);
  }
}

async function renderBookmarks(content) {
  const pages = (await db.all('pages')).filter((p) => p.bookmarked && !p.trashedAt);
  const byId = new Map(state.notebooks.map((n) => [n.id, n]));
  content.replaceChildren();
  const rows = pages.map((p) => ({ p, nb: byId.get(p.notebookId) })).filter((r) => r.nb)
    .map((r) => ({ ...r, index: r.nb.pageIds.indexOf(r.p.id) }))
    .sort((a, b) => a.nb.title.localeCompare(b.nb.title, 'pt-BR') || a.index - b.index);
  if (!rows.length) {
    content.append(h('div', { class: 'empty' }, h('div', {}, h('h2', {}, 'Nenhuma página marcada'),
      h('div', {}, 'No caderno, use o botão de marcador na barra para guardar páginas importantes.'))));
    return;
  }
  const grid = h('div', { class: 'grid' });
  for (const r of rows) {
    const canvas = h('canvas', { style: { width: '100%', display: 'block' } });
    renderPageFlat(r.p, canvas, 200);
    const el = h('div', { class: 'card' },
      h('div', { class: 'cover', style: { background: '#fff', aspectRatio: 'auto', borderRadius: '6px' } }, canvas),
      h('div', { class: 'card-meta' }, h('div', { class: 't' }, h('div', { class: 'name' }, r.nb.title), h('div', { class: 'sub' }, `Página ${r.index + 1}`))));
    el.addEventListener('click', () => onOpen(r.nb.id, { pageIndex: r.index }));
    grid.append(el);
  }
  content.append(grid);
}

// ---------- Backup ----------
async function doBackup() {
  try {
    const blob = await exportBackup();
    const d = new Date().toISOString().slice(0, 10);
    download(blob, `acervo-digital-backup-${d}.json`);
    toast('Backup salvo. Guarde este arquivo em um lugar seguro.');
  } catch (e) {
    toast('Falha no backup: ' + e.message);
  }
}

async function doRestore() {
  const file = await pickFile('file-backup');
  if (!file) return;
  const mode = await modal((box, close) => {
    box.append(h('h2', {}, 'Restaurar backup'),
      h('p', {}, 'Você pode juntar o backup com os cadernos atuais ou substituir tudo pelo conteúdo do backup.'),
      h('div', { class: 'actions' },
        h('button', { class: 'btn ghost', onclick: () => close() }, 'Cancelar'),
        h('button', { class: 'btn', onclick: () => close('replace') }, 'Substituir tudo'),
        h('button', { class: 'btn primary', onclick: () => close('merge') }, 'Juntar')));
  });
  if (!mode) return;
  try {
    await importBackup(file, { replace: mode === 'replace' });
    toast('Backup restaurado');
    refreshLibrary();
  } catch (e) {
    toast(e.message || 'Arquivo inválido', { duration: 5000 });
  }
}
