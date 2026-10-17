// Biblioteca: cadernos, pastas, favoritos, busca global.
import { db, uid, getNotebookPages, deleteNotebook, exportBackup, importBackup } from './db.js';
import { h, icon, ICONS, modal, confirmDialog, promptDialog, progressDialog, showMenu, toast, download, pickFile, safeFilename, relativeDate, normalize, snippet } from './ui.js';
import { importPdf, newPage, exportNotebookPdf, outlineForPages } from './pdftools.js';
import { renderPageFlat, drawTemplate, loadPdf, TEMPLATES, PAGE_SIZES, PAPER_COLORS, SPACINGS } from './render.js';
import { renderStudyView, studyDueCount } from './study.js';
import { aiSettingsDialog } from './ai.js';
import { saveAsset } from './db.js';
import { postToNexo } from './nexo.js';

export const COVER_COLORS = ['#244b48', '#24766b', '#437b99', '#7a4f9a', '#b8860b', '#a23b55', '#34495e', '#5a6b3a', '#d07a8f', '#4a90a4'];
const PATTERNS = { plain: 'Lisa', lines: 'Linhas', dots: 'Pontos', diag: 'Listras', page: '1ª página' };

const state = { nav: 'all', sort: 'updated', query: '', notebooks: [], folders: [] };
let onOpen = () => {};
const thumbCache = new Map(); // notebookId -> {key, url}

const $ = (id) => document.getElementById(id);

export function initLibrary(opts) {
  onOpen = opts.onOpen;
  document.querySelectorAll('[data-nav]').forEach((b) => b.addEventListener('click', () => setNav(b.dataset.nav)));
  $('btn-new-notebook').addEventListener('click', (e) => showMenu(e.currentTarget, [
    { label: 'Caderno', icon: 'page', onClick: () => newNotebookDialog() },
    { label: 'Quadro branco infinito', icon: '<rect x="3" y="4" width="18" height="14" rx="2"/><path d="M8 21h8M7 13l3-3 3 3 4-4"/>', onClick: () => newBoard() },
    { label: 'Pasta', icon: 'folder', onClick: () => newFolder(currentFolderId()) },
    { label: 'Importar PDF…', icon: 'pdf', onClick: () => importPdfNotebook() },
  ], { align: 'right' }));
  $('btn-lib-more').addEventListener('click', (e) => showMenu(e.currentTarget, [
    { label: 'Assistente de IA', icon: '<path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8z"/>', onClick: () => aiSettingsDialog() },
    { label: 'Nova pasta', icon: 'folder', onClick: () => newFolder(currentFolderId()) },
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
  $('sort').addEventListener('change', (e) => { state.sort = e.target.value; renderContent(); });
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
  render();
}

export async function refreshLibrary() {
  state.notebooks = await db.all('notebooks');
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
    { label: 'Cor', icon: 'palette', onClick: async () => {
      const color = await colorDialog('Cor da pasta', f.color);
      if (color) { f.color = color; await db.put('folders', f); refreshLibrary(); }
    } },
    { label: 'Ícone (emoji)', icon: 'star', onClick: async () => {
      const e = await emojiDialog(f.emoji);
      if (e !== undefined) { f.emoji = e || undefined; await db.put('folders', f); refreshLibrary(); }
    } },
    { label: 'Nova subpasta', icon: 'folder', onClick: () => newFolder(f.id) },
    'sep',
    { label: 'Excluir pasta', icon: 'trash', danger: true, onClick: async () => {
      const ok = await confirmDialog('Excluir pasta?', `Os cadernos e subpastas de “${f.name}” não serão apagados: eles sobem um nível.`, { ok: 'Excluir pasta' });
      if (!ok) return;
      for (const n of state.notebooks.filter((x) => x.folderId === f.id)) { n.folderId = f.parentId || null; await db.put('notebooks', n); }
      for (const sub of state.folders.filter((x) => x.parentId === f.id)) { sub.parentId = f.parentId || null; await db.put('folders', sub); }
      await db.delete('folders', f.id);
      refreshLibrary();
    } },
  ]);
}

function colorDialog(title, current) {
  return modal((box, close) => {
    let sel = current || COVER_COLORS[0];
    const row = h('div', { class: 'choice-row' });
    const draw = () => {
      row.replaceChildren(...COVER_COLORS.map((c) => {
        const b = h('button', { class: 'cover-choice' + (c === sel ? ' active' : ''), style: { '--c': c, width: '38px', height: '38px', borderRadius: '10px' }, 'aria-label': c });
        b.addEventListener('click', () => { sel = c; draw(); });
        return b;
      }));
    };
    draw();
    box.append(h('h2', {}, title), row, h('div', { class: 'actions', style: { marginTop: '20px' } },
      h('button', { class: 'btn ghost', onclick: () => close() }, 'Cancelar'),
      h('button', { class: 'btn primary', onclick: () => close(sel) }, 'Salvar')));
  });
}

const FOLDER_EMOJIS = ['📚', '📐', '🧪', '🧬', '💻', '🌍', '📖', '🎨', '🎵', '⚖️', '🏛️', '🧮', '🩺', '📊', '✍️', '🗂️', '💼', '⭐', '🎯', '🧠'];
function emojiDialog(current) {
  return modal((box, close) => {
    const grid = h('div', { class: 'emoji-grid' });
    for (const e of FOLDER_EMOJIS) {
      const b = h('button', { class: 'emoji-choice' + (e === current ? ' active' : '') }, e);
      b.addEventListener('click', () => close(e));
      grid.append(b);
    }
    box.append(h('h2', {}, 'Ícone da pasta'), grid, h('div', { class: 'actions' },
      h('button', { class: 'btn ghost', onclick: () => close('') }, 'Sem ícone'),
      h('button', { class: 'btn', onclick: () => close() }, 'Cancelar')));
  });
}

async function newFolder(parentId = null) {
  const name = await promptDialog(parentId ? 'Nova subpasta' : 'Nova pasta', { label: 'Nome da pasta', value: '', ok: 'Criar' });
  if (!name) return;
  const f = { id: uid(), name, parentId, color: COVER_COLORS[state.folders.length % COVER_COLORS.length], createdAt: Date.now() };
  await db.put('folders', f);
  state.nav = 'folder:' + f.id;
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

function coverFields(cfg) {
  const colorRow = h('div', { class: 'choice-row' });
  const patRow = h('div', { class: 'seg' });
  const draw = () => {
    colorRow.replaceChildren(...COVER_COLORS.map((c) => {
      const b = h('button', { class: 'cover-choice' + (cfg.color === c ? ' active' : ''), style: { '--c': c }, type: 'button', 'aria-label': 'Cor ' + c });
      b.addEventListener('click', () => { cfg.color = c; draw(); });
      return b;
    }));
    patRow.replaceChildren(...Object.entries(PATTERNS).map(([k, label]) => {
      const b = h('button', { class: cfg.pattern === k ? 'active' : '', type: 'button' }, label);
      b.addEventListener('click', () => { cfg.pattern = k; draw(); });
      return b;
    }));
  };
  draw();
  return h('div', {},
    h('div', { class: 'field' }, h('label', {}, 'Cor da capa'), colorRow),
    h('div', { class: 'field' }, h('label', {}, 'Estilo da capa'), patRow));
}

async function newNotebookDialog() {
  const cfg = {
    title: '', color: COVER_COLORS[Math.floor(Math.random() * COVER_COLORS.length)], pattern: 'plain',
    template: 'lined', paper: 'white', size: 'a4',
  };
  const result = await modal((box, close) => {
    const title = h('input', { class: 'input', placeholder: 'Ex.: Cálculo I', value: '' });
    const submit = () => { cfg.title = title.value.trim() || 'Sem título'; close(true); };
    title.addEventListener('keydown', (e) => { if (e.key === 'Enter') submit(); });
    box.append(
      h('h2', {}, 'Novo caderno'),
      h('div', { class: 'field' }, h('label', {}, 'Título'), title),
      coverFields(cfg),
      pageSetupFields(cfg),
      h('div', { class: 'actions' },
        h('button', { class: 'btn ghost', onclick: () => close(false) }, 'Cancelar'),
        h('button', { class: 'btn primary', onclick: submit }, 'Criar caderno')),
    );
  });
  if (!result) return;
  const nb = makeNotebook(cfg.title, { color: cfg.color, pattern: cfg.pattern }, { template: cfg.template, paper: cfg.paper, size: cfg.size, spacing: cfg.spacing });
  const page = newPage(nb.id);
  await applyPageSetup(page, cfg);
  nb.pageIds = [page.id];
  await db.put('pages', page);
  await db.put('notebooks', nb);
  onOpen(nb.id);
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
function sorted(list) {
  const s = [...list];
  if (state.sort === 'title') s.sort((a, b) => a.title.localeCompare(b.title, 'pt-BR', { numeric: true }));
  else if (state.sort === 'created') s.sort((a, b) => b.createdAt - a.createdAt);
  else s.sort((a, b) => b.updatedAt - a.updatedAt);
  return s;
}

async function renderContent() {
  const content = $('lib-content');
  if (state.query) return renderSearch(content);
  let list = state.notebooks, title = 'Todos os cadernos';
  if (state.nav === 'favorites') { list = list.filter((n) => n.favorite); title = 'Favoritos'; }
  else if (state.nav === 'bookmarks') { $('lib-title').textContent = 'Páginas marcadas'; return renderBookmarks(content); }
  else if (state.nav === 'study') { $('lib-title').textContent = 'Estudar'; return renderStudyView(content, () => refreshLibrary()); }
  let subfolders = [];
  if (state.nav.startsWith('folder:')) {
    const f = state.folders.find((x) => 'folder:' + x.id === state.nav);
    list = list.filter((n) => n.folderId === f?.id);
    title = (f?.emoji ? f.emoji + ' ' : '') + (f?.name || 'Pasta');
    subfolders = state.folders.filter((x) => x.parentId === f?.id);
  }
  $('lib-title').textContent = title;
  content.replaceChildren();
  if (!list.length && !subfolders.length) {
    content.append(emptyState(state.nav));
    return;
  }
  if (subfolders.length) {
    const row = h('div', { class: 'folder-tiles' });
    for (const sf of subfolders) {
      const n = state.notebooks.filter((x) => x.folderId === sf.id).length;
      const tile = h('button', { class: 'folder-tile' }, h('span', { class: 'ft-icon', style: { background: sf.color || COVER_COLORS[0] } }, sf.emoji || '📁'),
        h('span', {}, h('b', {}, sf.name), h('small', {}, n + (n === 1 ? ' caderno' : ' cadernos'))));
      tile.addEventListener('click', () => setNav('folder:' + sf.id));
      row.append(tile);
    }
    content.append(row);
  }
  const grid = h('div', { class: 'grid' });
  for (const nb of sorted(list)) grid.append(card(nb));
  content.append(grid);
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

function card(nb) {
  const cover = h('div', { class: 'cover pattern-' + (nb.cover?.pattern || 'plain'), style: { '--c': nb.cover?.color || COVER_COLORS[0] } });
  if (nb.kind === 'board') {
    cover.classList.add('board-cover');
    cover.append(h('div', { class: 'cover-label' }, nb.title), h('span', { class: 'pdf-badge' }, 'QUADRO'));
  } else if (nb.cover?.pattern === 'page') {
    cover.append(h('span', { class: 'pdf-badge' }, `${nb.pageIds.length} pág.`));
    loadThumb(nb).then((url) => { if (url) cover.prepend(h('img', { class: 'thumb', src: url, alt: '' })); });
  } else {
    cover.append(h('div', { class: 'cover-label' }, nb.title));
  }
  const star = h('button', { class: 'icon-btn small star' + (nb.favorite ? ' on' : ''), title: nb.favorite ? 'Remover dos favoritos' : 'Favoritar', 'aria-label': 'Favorito' }, icon(ICONS.star));
  star.addEventListener('click', async (e) => {
    e.stopPropagation();
    nb.favorite = !nb.favorite;
    await db.put('notebooks', nb);
    refreshLibrary();
  });
  const more = h('button', { class: 'icon-btn small', 'aria-label': 'Opções' }, icon('<circle cx="5" cy="12" r="1.3"/><circle cx="12" cy="12" r="1.3"/><circle cx="19" cy="12" r="1.3"/>'));
  more.addEventListener('click', (e) => { e.stopPropagation(); notebookMenu(nb, more); });
  const el = h('div', { class: 'card', draggable: 'true', tabindex: '0' }, cover,
    h('div', { class: 'card-meta' },
      h('div', { class: 't' }, h('div', { class: 'name', title: nb.title }, nb.title), h('div', { class: 'sub' }, relativeDate(nb.updatedAt))),
      star, more));
  el.addEventListener('click', () => onOpen(nb.id));
  el.addEventListener('keydown', (e) => { if (e.key === 'Enter') onOpen(nb.id); });
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
    { label: 'Renomear', icon: 'edit', onClick: async () => {
      const t = await promptDialog('Renomear caderno', { value: nb.title });
      if (t) { nb.title = t; nb.updatedAt = Date.now(); await db.put('notebooks', nb); refreshLibrary(); }
    } },
    { label: 'Capa', icon: 'palette', onClick: () => editCover(nb) },
    { label: 'Mover para pasta', icon: 'folder', onClick: () => moveDialog(nb) },
    { label: nb.favorite ? 'Remover dos favoritos' : 'Favoritar', icon: 'star', onClick: async () => { nb.favorite = !nb.favorite; await db.put('notebooks', nb); refreshLibrary(); } },
    { label: 'Duplicar', icon: 'copy', onClick: () => duplicateNotebook(nb) },
    { label: 'Exportar PDF', icon: 'pdf', onClick: () => exportPdfFlow(nb) },
    'sep',
    { label: 'Excluir', icon: 'trash', danger: true, onClick: async () => {
      const ok = await confirmDialog('Excluir caderno?', `“${nb.title}” e todas as suas páginas serão apagados deste aparelho. Isso não pode ser desfeito.`, { ok: 'Excluir', danger: true });
      if (ok) { await deleteNotebook(nb); toast('Caderno excluído'); refreshLibrary(); }
    } },
  ], { align: 'right' });
}

async function editCover(nb) {
  const cfg = { color: nb.cover?.color || COVER_COLORS[0], pattern: nb.cover?.pattern || 'plain' };
  const ok = await modal((box, close) => {
    box.append(h('h2', {}, 'Capa do caderno'), coverFields(cfg), h('div', { class: 'actions' },
      h('button', { class: 'btn ghost', onclick: () => close(false) }, 'Cancelar'),
      h('button', { class: 'btn primary', onclick: () => close(true) }, 'Salvar')));
  });
  if (!ok) return;
  nb.cover = { color: cfg.color, pattern: cfg.pattern };
  await db.put('notebooks', nb);
  refreshLibrary();
}

async function moveDialog(nb) {
  const target = await modal((box, close) => {
    const list = h('div', { class: 'nav' });
    const opt = (id, name, color) => {
      const b = h('button', { class: 'nav-item' + ((nb.folderId || null) === id ? ' active' : '') },
        h('span', { class: 'folder-dot', style: { background: color || 'var(--ink-3)' } }), name);
      b.addEventListener('click', () => close({ id }));
      return b;
    };
    list.append(opt(null, 'Sem pasta'));
    for (const f of state.folders) list.append(opt(f.id, f.name, f.color));
    box.append(h('h2', {}, 'Mover para…'), list, h('div', { class: 'actions' },
      h('button', { class: 'btn', onclick: async () => {
        const name = await promptDialog('Nova pasta', { label: 'Nome da pasta', ok: 'Criar' });
        if (!name) return;
        const f = { id: uid(), name, color: COVER_COLORS[state.folders.length % COVER_COLORS.length], createdAt: Date.now() };
        await db.put('folders', f);
        close({ id: f.id });
      } }, 'Nova pasta'),
      h('button', { class: 'btn ghost', onclick: () => close() }, 'Cancelar')));
  });
  if (!target) return;
  nb.folderId = target.id;
  await db.put('notebooks', nb);
  refreshLibrary();
}

async function duplicateNotebook(nb) {
  const pages = await getNotebookPages(nb);
  const copy = { ...structuredClone(nb), id: uid(), title: nb.title + ' (cópia)', createdAt: Date.now(), updatedAt: Date.now(), favorite: false };
  const newPages = pages.map((p) => ({ ...structuredClone(p), id: uid(), notebookId: copy.id }));
  copy.pageIds = newPages.map((p) => p.id);
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
    if (!nb) continue;
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
  const pages = (await db.all('pages')).filter((p) => p.bookmarked);
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
