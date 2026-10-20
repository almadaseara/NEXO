// Editor de cadernos e quadros brancos: escrita à mão, formas, borracha, laço, texto, imagens,
// fitas, laser, links, figurinhas, áudio, sumário, apresentação, zoom e busca.
import { db, uid, saveAsset, getNotebookPages, collectGarbage } from './db.js';
import { h, icon, modal, confirmDialog, promptDialog, progressDialog, showMenu, closeMenu, toast, pickFile, normalize } from './ui.js';
import {
  drawTemplate, drawBgImage, drawPdfPage, drawStroke, drawStrokes, strokeBounds, pointInPolygon, distToSegment,
  loadImage, loadPdf, renderPageFlat, PAGE_SIZES, TEXT_FONT, PEN_STYLES, NOTE_COLORS, NOTE_PAD,
  drawTape, pointInTape, imageBounds, drawImageItem, drawTextBox,
} from './render.js';
import { importPdf, newPage, outlineForPages } from './pdftools.js';
import { exportPdfFlow, pageSetupFields, applyPageSetup } from './library.js';
import { recognizeShape, isScribble, strokesHitByScribble, CLOSED_SHAPES } from './shapes.js';
import { createCardDialog } from './study.js';
import { toggleAssistant, closeAssistant, transcribeImage, explainSelection } from './ai.js';
import { openStickerPanel, saveElement } from './stickers.js';
import { isRecording, startRecording, stopRecording, recordingTime, currentRecording, createPlayer, formatTime } from './audio.js';

// ---------- Configurações das ferramentas (lembradas neste aparelho) ----------
const SIZES = {
  pen: [1.5, 3, 5, 8],
  highlighter: [10, 18, 28],
  eraser: [8, 16, 32],
  text: [12, 16, 22, 32],
  tape: [14, 22, 34],
};
const TAPE_COLORS = ['#e8a33d', '#6aa5d8', '#9c7fd1', '#e87a8f', '#5fb38a'];
const DEFAULTS = {
  tool: 'pen',
  pen: { color: '#1f2a37', size: 3, style: 'fountain', palette: ['#1f2a37', '#2457c5', '#c62f2f', '#1f8a4c', '#7a3fb0'] },
  highlighter: { color: '#ffe14d', size: 18, palette: ['#ffe14d', '#9be36b', '#ff9ecf', '#8fd3ff', '#ffb35c'] },
  eraser: { size: 16, mode: 'partial', hlOnly: false },
  text: { size: 16, color: '#1f2a37', bold: false, note: false, noteColor: NOTE_COLORS[0] },
  tape: { color: TAPE_COLORS[0], size: 22 },
  lassoMode: 'free',
  penOnly: false,
  straighten: true,
  scribbleErase: true,
};
let settings = loadSettings();
function loadSettings() {
  try {
    const s = JSON.parse(localStorage.getItem('acervo.settings') || '{}');
    const merged = structuredClone(DEFAULTS);
    for (const k of Object.keys(merged)) {
      if (s[k] === undefined) continue;
      merged[k] = typeof merged[k] === 'object' && !Array.isArray(merged[k]) ? { ...merged[k], ...s[k] } : s[k];
    }
    return merged;
  } catch { return structuredClone(DEFAULTS); }
}
function saveSettings() {
  try { localStorage.setItem('acervo.settings', JSON.stringify(settings)); } catch { /* sem armazenamento */ }
}

// ---------- Estado ----------
const $ = (id) => document.getElementById(id);
let nb = null;          // caderno aberto
let pages = [];         // páginas em ordem
const views = new Map(); // pageId -> view
let zoom = 1;
let fitZoom = 1;
let tool = 'pen';
let tempHand = false;   // espaço pressionado
let undoStack = [], redoStack = [];
const dirty = new Set();
let saveTimer = null;
let currentIndex = 0;
let action = null;      // gesto em andamento
let selection = null;   // { pageId, strokes:Set, texts:Set, images:Set, bbox }
let clipboard = null;
let editingText = null; // { view, textarea, original }
let find = { query: '', hits: [], idx: -1 };
let assetsSeen = new Set();
let observer = null;
let onCloseCb = () => {};
let onOpenNotebookCb = () => {};
const touches = new Map();
let gesture = null;
const renderQueued = new Set();
let rafId = 0;
let pendingCard = null; // frente de um flashcard esperando o verso
let player = null;      // { rec, audio, tapSeek, timer }
let presenting = null;  // { prevZoom, prevTool }
let thumbsTab = 'pages';

const MAX_PX = 14e6;
const isBoard = () => nb?.kind === 'board';

function pageById(id) { return pages.find((p) => p.id === id); }
function viewOf(page) { return views.get(page.id); }

// ---------- Inicialização ----------
export function initEditor({ onClose, onOpenNotebook }) {
  onCloseCb = onClose;
  onOpenNotebookCb = onOpenNotebook || onOpenNotebookCb;
  $('ed-back').addEventListener('click', closeEditor);
  $('ed-undo').addEventListener('click', undo);
  $('ed-redo').addEventListener('click', redo);
  $('ed-add-page').addEventListener('click', () => addPage(currentIndex + 1));
  $('ed-bookmark').addEventListener('click', toggleBookmark);
  $('ed-pages').addEventListener('click', toggleThumbs);
  $('ed-more').addEventListener('click', moreMenu);
  $('ed-search').addEventListener('click', () => openFind());
  $('ed-record').addEventListener('click', toggleRecording);
  $('ed-ai').addEventListener('click', () => toggleAssistant(aiContext()));
  $('ed-title').addEventListener('change', async (e) => {
    nb.title = e.target.value.trim() || 'Sem título';
    e.target.value = nb.title;
    await saveNotebook();
  });
  $('ed-title').addEventListener('keydown', (e) => { if (e.key === 'Enter') e.target.blur(); });
  document.querySelectorAll('#tools .tool').forEach((b) => b.addEventListener('click', () => {
    if (b.dataset.tool === 'image') return insertImageFlow();
    if (b.dataset.tool === 'stickers') return openStickers(b);
    setTool(b.dataset.tool);
  }));
  $('zoom-in').addEventListener('click', () => setZoom(zoom * 1.2));
  $('zoom-out').addEventListener('click', () => setZoom(zoom / 1.2));
  $('zoom-label').addEventListener('click', () => setZoom(fitZoom));

  const scroller = $('scroller');
  scroller.addEventListener('pointerdown', onPointerDown);
  scroller.addEventListener('pointermove', onPointerMove);
  scroller.addEventListener('pointerup', onPointerUp);
  scroller.addEventListener('pointercancel', onPointerCancel);
  scroller.addEventListener('contextmenu', (e) => { if (e.target.closest('.page')) e.preventDefault(); });
  scroller.addEventListener('scroll', onScroll, { passive: true });
  scroller.addEventListener('wheel', (e) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      setZoom(zoom * Math.exp(-e.deltaY * 0.0022), { x: e.clientX, y: e.clientY });
    }
  }, { passive: false });
  window.addEventListener('resize', () => { if (nb) { computeFit(); layout(); } });

  $('find-input').addEventListener('input', (e) => runFind(e.target.value));
  $('find-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { e.preventDefault(); stepFind(e.shiftKey ? -1 : 1); }
    if (e.key === 'Escape') closeFind();
  });
  $('find-next').addEventListener('click', () => stepFind(1));
  $('find-prev').addEventListener('click', () => stepFind(-1));
  $('find-close').addEventListener('click', closeFind);

  $('pr-prev').addEventListener('click', () => presentStep(-1));
  $('pr-next').addEventListener('click', () => presentStep(1));
  $('pr-laser').addEventListener('click', () => setTool('laser'));
  $('pr-pen').addEventListener('click', () => setTool('pen'));
  $('pr-exit').addEventListener('click', exitPresentation);
  document.addEventListener('fullscreenchange', () => { if (!document.fullscreenElement && presenting) exitPresentation(); });

  document.addEventListener('keydown', onKeyDown);
  document.addEventListener('keyup', (e) => { if (e.code === 'Space' && tempHand) { tempHand = false; updateCursor(); } });
  document.addEventListener('paste', onPaste);
  // ao fechar com alterações ainda não gravadas, tenta gravar e pede confirmação ao navegador
  window.addEventListener('beforeunload', (e) => { if (nb && dirty.size) { autoSave(); e.preventDefault(); e.returnValue = ''; } });
  document.addEventListener('visibilitychange', () => { if (document.hidden && nb) autoSave(); });
}

export async function openEditor(notebookId, { pageIndex = 0, query = '' } = {}) {
  if (nb) await closeEditor({ silent: true });
  nb = await db.get('notebooks', notebookId);
  if (!nb) { toast('Caderno não encontrado'); return false; }
  if (nb.trashedAt) { toast('Este caderno está na lixeira. Restaure-o para abrir.'); nb = null; return false; }
  pages = await getNotebookPages(nb);
  if (!pages.length) {
    const s = PAGE_SIZES[nb.defaults?.size] || PAGE_SIZES.a4;
    const p = newPage(nb.id, { width: s.w, height: s.h, template: nb.defaults?.template || 'blank', paper: nb.defaults?.paper || 'white' });
    pages = [p];
    nb.pageIds = [p.id];
    await db.put('pages', p);
    await db.put('notebooks', nb);
  }
  for (const p of pages) {
    p.strokes ||= []; p.texts ||= []; p.images ||= []; p.tapes ||= []; p.links ||= [];
    if (p.pdf) assetsSeen.add(p.pdf.assetId);
    if (p.bgAsset) assetsSeen.add(p.bgAsset);
    for (const im of p.images) assetsSeen.add(im.assetId);
  }
  nb.outline ||= [];
  nb.trashedPages ||= [];
  purgeOldTrashedPages().catch(() => {});
  nb.recordings ||= [];
  undoStack = []; redoStack = []; selection = null; pendingCard = null; find = { query: '', hits: [], idx: -1 };
  $('ed-title').value = nb.title;
  $('library').hidden = true;
  $('editor').hidden = false;
  $('editor').classList.toggle('board', isBoard());
  $('find-bar').hidden = true;
  $('ed-add-page').hidden = isBoard();
  $('ed-bookmark').hidden = isBoard();
  $('ed-pages').hidden = isBoard();
  if (isBoard()) $('thumbs').hidden = true;
  setTool(['image', 'stickers'].includes(settings.tool) ? 'pen' : settings.tool);
  zoom = 0; // força o ajuste
  computeFit();
  zoom = fitZoom;
  buildViews();
  updateUndoButtons();
  renderPlayer();
  currentIndex = Math.min(pageIndex, pages.length - 1);
  requestAnimationFrame(() => {
    if (isBoard()) centerBoard();
    else scrollToPage(currentIndex, false);
    if (query) openFind(query, currentIndex);
  });
  if (!$('thumbs').hidden) renderThumbs();
  return true;
}

export async function closeEditor({ silent = false } = {}) {
  if (!nb) return;
  commitTextEdit();
  clearSelection();
  if (presenting) exitPresentation();
  if (isRecording()) await finishRecording();
  stopPlayer();
  closeAssistant();
  await flushSave();
  const seen = assetsSeen;
  assetsSeen = new Set();
  observer?.disconnect();
  for (const v of views.values()) releaseView(v);
  views.clear();
  $('pages').replaceChildren();
  $('thumbs').replaceChildren();
  nb = null; pages = [];
  collectGarbage(seen).catch(() => {});
  if (silent) return;
  $('editor').hidden = true;
  $('library').hidden = false;
  onCloseCb();
}

// ---------- Ferramentas ----------
function setTool(t) {
  if (t !== 'lasso') clearSelection();
  commitTextEdit();
  tool = t;
  settings.tool = t;
  saveSettings();
  document.querySelectorAll('#tools .tool').forEach((b) => b.classList.toggle('active', b.dataset.tool === t));
  $('pr-laser')?.classList.toggle('active', t === 'laser');
  $('pr-pen')?.classList.toggle('active', t === 'pen');
  renderToolOptions();
  updateCursor();
}

function updateCursor() {
  const t = tempHand ? 'hand' : tool;
  const c = { pen: 'crosshair', highlighter: 'crosshair', eraser: 'cell', lasso: 'crosshair', text: 'text', hand: 'grab', tape: 'crosshair', laser: 'none' }[t] || 'default';
  $('pages').style.cursor = c;
}

function seg(options, current, onPick) {
  const el = h('div', { class: 'seg' });
  for (const [k, label] of options) {
    const b = h('button', { class: current === k ? 'active' : '' }, label);
    b.addEventListener('click', () => onPick(k));
    el.append(b);
  }
  return el;
}

function toggleChip(label, on, onToggle) {
  const b = h('button', { class: 'chip' + (on ? ' on' : '') }, label);
  b.addEventListener('click', onToggle);
  return b;
}

function renderToolOptions() {
  const box = $('tool-options');
  box.replaceChildren();
  const sizeButtons = (key, sizes, dotScale) => sizes.map((s) => {
    const d = Math.max(3, Math.min(20, s * dotScale));
    const b = h('button', { class: 'size-btn' + (settings[key].size === s ? ' active' : ''), title: 'Espessura ' + s },
      h('span', { style: { width: d + 'px', height: d + 'px' } }));
    b.addEventListener('click', () => { settings[key].size = s; saveSettings(); renderToolOptions(); });
    return b;
  });
  const colorPicker = (initial, onChange) => {
    const inp = h('input', { type: 'color', value: initial, style: { position: 'fixed', left: '0', top: '0', opacity: '0', pointerEvents: 'none' } });
    document.body.append(inp);
    inp.addEventListener('input', () => onChange(inp.value, false));
    inp.addEventListener('change', () => { inp.remove(); onChange(inp.value, true); });
    inp.addEventListener('blur', () => setTimeout(() => inp.remove(), 500));
    inp.click();
  };
  const swatches = (key) => {
    const conf = settings[key];
    const out = conf.palette.map((c, i) => {
      const b = h('button', { class: 'swatch-btn' + (conf.color === c ? ' active' : ''), style: { '--c': c }, title: 'Cor (toque de novo para trocar)' });
      b.addEventListener('click', () => {
        if (conf.color === c) {
          // segundo toque: trocar esta cor da paleta
          colorPicker(c, (v, done) => { conf.palette[i] = v; conf.color = v; saveSettings(); b.style.setProperty('--c', v); if (done) renderToolOptions(); });
          return;
        }
        conf.color = c; saveSettings(); renderToolOptions();
      });
      return b;
    });
    const custom = h('label', { class: 'swatch-btn custom', title: 'Outra cor' });
    const inp = h('input', { type: 'color', value: conf.color });
    inp.addEventListener('change', () => { conf.color = inp.value; saveSettings(); renderToolOptions(); });
    custom.append(inp);
    out.push(custom);
    return out;
  };
  const sep = () => h('span', { class: 'opt-sep' });
  const hint = (t) => h('span', { class: 'opt-hint' }, t);
  if (tool === 'pen') {
    box.append(seg(Object.entries(PEN_STYLES), settings.pen.style, (k) => { settings.pen.style = k; saveSettings(); renderToolOptions(); }),
      sep(), ...swatches('pen'), sep(), ...sizeButtons('pen', SIZES.pen, 2));
  } else if (tool === 'highlighter') box.append(...swatches('highlighter'), sep(), ...sizeButtons('highlighter', SIZES.highlighter, 0.6));
  else if (tool === 'eraser') {
    box.append(seg([['partial', 'Parcial'], ['stroke', 'Traço inteiro']], settings.eraser.mode, (k) => { settings.eraser.mode = k; saveSettings(); renderToolOptions(); }),
      sep(), ...sizeButtons('eraser', SIZES.eraser, 0.5), sep(),
      toggleChip('Só marca-texto', settings.eraser.hlOnly, () => { settings.eraser.hlOnly = !settings.eraser.hlOnly; saveSettings(); renderToolOptions(); }));
  } else if (tool === 'text') {
    const colors = settings.pen.palette.map((c) => {
      const b = h('button', { class: 'swatch-btn' + (settings.text.color === c ? ' active' : ''), style: { '--c': c } });
      b.addEventListener('click', () => { settings.text.color = c; saveSettings(); renderToolOptions(); applyTextStyleToEditor(); });
      return b;
    });
    const bold = h('button', { class: 'icon-btn small' + (settings.text.bold ? ' active' : ''), title: 'Negrito' }, h('b', {}, 'N'));
    bold.addEventListener('click', () => { settings.text.bold = !settings.text.bold; saveSettings(); renderToolOptions(); applyTextStyleToEditor(); });
    const notes = settings.text.note ? NOTE_COLORS.map((c) => {
      const b = h('button', { class: 'swatch-btn square' + (settings.text.noteColor === c ? ' active' : ''), style: { '--c': c } });
      b.addEventListener('click', () => { settings.text.noteColor = c; saveSettings(); renderToolOptions(); applyTextStyleToEditor(); });
      return b;
    }) : [];
    box.append(seg(SIZES.text.map((s) => [s, String(s)]), settings.text.size, (k) => { settings.text.size = k; saveSettings(); renderToolOptions(); applyTextStyleToEditor(); }),
      bold, sep(), ...colors, sep(),
      toggleChip('Post-it', settings.text.note, () => { settings.text.note = !settings.text.note; saveSettings(); renderToolOptions(); applyTextStyleToEditor(); }), ...notes);
  } else if (tool === 'lasso') {
    box.append(seg([['free', 'Livre'], ['rect', 'Retângulo']], settings.lassoMode, (k) => { settings.lassoMode = k; saveSettings(); renderToolOptions(); }),
      hint('Contorne para mover, girar, mudar cor, criar flashcard, link…'));
  } else if (tool === 'tape') {
    const colors = TAPE_COLORS.map((c) => {
      const b = h('button', { class: 'swatch-btn square' + (settings.tape.color === c ? ' active' : ''), style: { '--c': c } });
      b.addEventListener('click', () => { settings.tape.color = c; saveSettings(); renderToolOptions(); });
      return b;
    });
    box.append(...colors, sep(), ...sizeButtons('tape', SIZES.tape, 0.5), sep(),
      h('button', { class: 'chip', onclick: () => setAllTapes(true) }, 'Esconder todas'),
      h('button', { class: 'chip', onclick: () => setAllTapes(false) }, 'Revelar todas'),
      hint('Arraste sobre a resposta. Toque na fita para revelar.'));
  } else if (tool === 'laser') {
    box.append(hint('O laser aparece e some sozinho — ótimo para apresentar.'));
  } else if (tool === 'hand') {
    box.append(hint('Arraste para mover. Dica: segure Espaço com qualquer ferramenta.'));
  }
}

// ---------- Páginas e renderização ----------
function computeFit() {
  const sc = $('scroller');
  // desconta a barra de rolagem vertical mesmo antes de ela aparecer
  const scrollbar = sc.offsetWidth - sc.clientWidth || 16;
  const avail = Math.max(200, sc.offsetWidth - scrollbar - (innerWidth < 820 ? 40 : 64));
  const maxW = Math.max(...pages.map((p) => p.width), 595);
  const wasFit = Math.abs(zoom - fitZoom) < 1e-3;
  fitZoom = isBoard() ? 1 : Math.min(avail / maxW, 1.6);
  if (wasFit) zoom = fitZoom; // quem estava “ajustado à largura” continua ajustado
}

function buildViews() {
  const container = $('pages');
  observer?.disconnect();
  observer = new IntersectionObserver((entries) => {
    for (const en of entries) {
      const v = views.get(en.target.dataset.id);
      if (!v) continue;
      if (en.isIntersecting) { if (!v.active) { v.active = true; queueRender(v); } }
      else if (v.active) { v.active = false; releaseView(v); }
    }
  }, { root: $('scroller'), rootMargin: '1400px 600px' });

  const keep = new Set(pages.map((p) => p.id));
  for (const [id, v] of views) if (!keep.has(id)) { releaseView(v); v.el.remove(); views.delete(id); }
  pages.forEach((page, i) => {
    let v = views.get(page.id);
    if (!v) {
      v = createView(page);
      views.set(page.id, v);
    }
    v.page = page;
    v.el.dataset.index = i;
    container.append(v.el); // reordena
    observer.observe(v.el);
  });
  layout();
}

function createView(page) {
  const el = h('div', { class: 'page', 'data-id': page.id });
  const bg = h('canvas', { class: 'bg' });
  const imgLayer = h('div', { class: 'layer img-layer' });
  const hlLayer = h('div', { class: 'layer hl-layer' });
  const ink = h('canvas', { class: 'ink' });
  const textLayer = h('div', { class: 'layer text-layer' });
  const tapeC = h('canvas', { class: 'tape' });
  const linkLayer = h('div', { class: 'layer link-layer' });
  for (const c of [bg, ink, tapeC]) { c.width = 0; c.height = 0; } // nada desenhado ainda
  el.append(bg, imgLayer, hlLayer, ink, textLayer, tapeC, linkLayer);
  return { page, el, bg, ink, tapeC, imgLayer, hlLayer, textLayer, linkLayer, live: null, active: false, k: 0, win: null, bgToken: 0 };
}

// Janela da página que é desenhada nos canvases (a página toda, ou só a parte visível no zoom alto).
function computeWindow(v) {
  const page = v.page;
  const dpr = window.devicePixelRatio || 1;
  const full = { x: 0, y: 0, w: page.width, h: page.height };
  if (page.width * page.height * (zoom * dpr) ** 2 <= MAX_PX) return full;
  const sr = $('scroller').getBoundingClientRect();
  const pr = v.el.getBoundingClientRect();
  let x0 = (sr.left - pr.left) / zoom, y0 = (sr.top - pr.top) / zoom;
  let x1 = x0 + sr.width / zoom, y1 = y0 + sr.height / zoom;
  const mx = (x1 - x0) * 0.5, my = (y1 - y0) * 0.5;
  x0 = Math.max(0, x0 - mx); y0 = Math.max(0, y0 - my);
  x1 = Math.min(page.width, x1 + mx); y1 = Math.min(page.height, y1 + my);
  if (x1 <= x0 || y1 <= y0) return { x: 0, y: 0, w: 1, h: 1 };
  return { x: x0, y: y0, w: x1 - x0, h: y1 - y0 };
}

function windowScale(win) {
  const dpr = window.devicePixelRatio || 1;
  return Math.min(zoom * dpr, Math.sqrt(MAX_PX / (win.w * win.h)));
}

function placeCanvas(c, win, k) {
  c.width = Math.max(1, Math.round(win.w * k));
  c.height = Math.max(1, Math.round(win.h * k));
  c.style.left = win.x * zoom + 'px';
  c.style.top = win.y * zoom + 'px';
  c.style.width = win.w * zoom + 'px';
  c.style.height = win.h * zoom + 'px';
}

function canvasCtx(c, win, k) {
  const ctx = c.getContext('2d');
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, c.width, c.height);
  ctx.setTransform(k, 0, 0, k, -win.x * k, -win.y * k);
  return ctx;
}

function sameWin(a, b) {
  return a && b && Math.abs(a.x - b.x) < 0.5 && Math.abs(a.y - b.y) < 0.5 && Math.abs(a.w - b.w) < 0.5 && Math.abs(a.h - b.h) < 0.5;
}

function layout() {
  for (const v of views.values()) {
    v.el.style.width = v.page.width * zoom + 'px';
    v.el.style.height = v.page.height * zoom + 'px';
    if (v.active) {
      renderDom(v);
      queueRender(v);
    }
  }
  $('zoom-label').textContent = Math.round((zoom / (isBoard() ? 1 : fitZoom)) * 100) + '%';
  if (selection) drawSelectionOverlay();
}

function queueRender(v) {
  renderQueued.add(v);
  if (rafId) return;
  rafId = requestAnimationFrame(() => {
    rafId = 0;
    const list = [...renderQueued];
    renderQueued.clear();
    for (const view of list) if (view.active && views.get(view.page.id) === view) renderView(view);
  });
}

let zoomRenderTimer = 0;
function renderView(v, { force = false } = {}) {
  const win = computeWindow(v);
  const k = windowScale(win);
  renderDom(v);
  if (!force && v.k === k && sameWin(v.win, win)) return;
  if (gesture?.type === 'pinch') { // durante a pinça só estica; renderiza ao soltar
    clearTimeout(zoomRenderTimer);
    zoomRenderTimer = setTimeout(() => layout(), 120);
    return;
  }
  v.k = k;
  v.win = win;
  renderBg(v);
  renderInk(v);
  renderTapes(v);
}

async function renderBg(v) {
  const page = v.page, k = v.k, win = v.win;
  const token = ++v.bgToken;
  const c = h('canvas', { class: 'bg' });
  placeCanvas(c, win, k);
  const ctx = canvasCtx(c, win, k);
  drawTemplate(ctx, page);
  if (!v.bg.width) { v.bg.replaceWith(c); v.bg = c; } // primeira vez: mostra o papel logo
  if (page.bgAsset) await drawBgImage(ctx, page);
  if (page.pdf) {
    const off = h('canvas');
    off.width = c.width; off.height = c.height;
    try {
      const ok = await drawPdfPage(off, page, k, { x: win.x * k, y: win.y * k });
      if (!ok || token !== v.bgToken) return;
      ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.drawImage(off, 0, 0); ctx.restore();
    } catch (e) {
      console.warn('PDF', e);
    }
  }
  if (token !== v.bgToken || !v.active) return;
  if (v.bg !== c) { v.bg.replaceWith(c); v.bg = c; }
}

function strokeAlpha() {
  if (!player?.audio || player.audio.ended) return null;
  const id = player.rec.id, t = player.audio.currentTime * 1000;
  return (s) => (s.rec === id && s.t > t ? 0.16 : 1);
}

function renderInk(v, skip) {
  if (!v.win) { v.win = computeWindow(v); v.k = windowScale(v.win); }
  const c = v.ink;
  const need = Math.round(v.win.w * v.k);
  if (c.width !== need || c.style.left !== v.win.x * zoom + 'px' || c.style.width !== v.win.w * zoom + 'px') placeCanvas(c, v.win, v.k);
  const ctx = canvasCtx(c, v.win, v.k);
  drawStrokes(ctx, v.page.strokes, skip, strokeAlpha());
}

function renderTapes(v) {
  if (!v.win) return;
  const c = v.tapeC;
  if (!v.page.tapes.length) { if (c.width) { c.width = 0; c.height = 0; } return; }
  placeCanvas(c, v.win, v.k);
  const ctx = canvasCtx(c, v.win, v.k);
  for (const t of v.page.tapes) drawTape(ctx, t);
}

function renderDom(v) {
  renderImages(v);
  renderTexts(v);
  renderHighlights(v);
  renderLinks(v);
}

function renderImages(v, preview) {
  const layer = v.imgLayer;
  layer.replaceChildren();
  for (const im of v.page.images) {
    const t = preview?.has(im.id) ? preview.get(im.id) : im;
    const img = h('img', { alt: '', draggable: 'false', style: {
      left: t.x * zoom + 'px', top: t.y * zoom + 'px', width: t.w * zoom + 'px', height: t.h * zoom + 'px',
      transform: t.rot ? `rotate(${t.rot}rad)` : '' } });
    loadImage(im.assetId).then((r) => { if (r) img.src = r.url; });
    layer.append(img);
  }
}

function renderTexts(v, preview) {
  const layer = v.textLayer;
  layer.replaceChildren();
  const nq = find.query ? normalize(find.query) : '';
  for (const t0 of v.page.texts) {
    if (editingText?.original?.id === t0.id && editingText.view === v) continue;
    const t = preview?.has(t0.id) ? preview.get(t0.id) : t0;
    layer.append(h('div', {
      class: 'text-box' + (t.bg ? ' note' : '') + (nq && normalize(t.text).includes(nq) ? ' hit' : ''),
      style: {
        left: t.x * zoom + 'px', top: t.y * zoom + 'px', width: t.w * zoom + 'px',
        fontSize: t.size * zoom + 'px', color: t.color, fontWeight: t.bold ? 600 : 400, fontFamily: TEXT_FONT,
        background: t.bg || '', padding: t.bg ? NOTE_PAD * zoom + 'px' : '', margin: t.bg ? -NOTE_PAD * zoom + 'px' : '',
        minHeight: t.bg && t.h ? t.h * zoom + 'px' : '',
      },
    }, t.text));
  }
}

function renderLinks(v) {
  const layer = v.linkLayer;
  layer.replaceChildren();
  for (const l of v.page.links) {
    const label = l.target.type === 'url' ? l.target.url : l.target.type === 'page' ? 'Ir para a página' : 'Abrir caderno';
    const badge = h('button', { class: 'link-badge', title: label + ' (botão direito para remover)', 'aria-label': label },
      icon('<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>'));
    badge.addEventListener('pointerdown', (e) => e.stopPropagation());
    badge.addEventListener('click', (e) => { e.stopPropagation(); followLink(l); });
    badge.addEventListener('contextmenu', (e) => { e.preventDefault(); e.stopPropagation(); removeLink(v, l); });
    const box = h('div', { class: 'link-box', style: {
      left: l.x * zoom + 'px', top: l.y * zoom + 'px', width: l.w * zoom + 'px', height: l.h * zoom + 'px' } }, badge);
    box.addEventListener('click', () => { if (tool === 'hand' || presenting) followLink(l); });
    layer.append(box);
  }
  layer.classList.toggle('clickable', tool === 'hand' || !!presenting);
}

async function renderHighlights(v) {
  const layer = v.hlLayer;
  layer.replaceChildren();
  const q = find.query;
  if (!q || !v.page.pdf || !normalize(v.page.pdfText || '').includes(normalize(q))) return;
  const token = (v.hlToken = (v.hlToken || 0) + 1);
  try {
    const doc = await loadPdf(v.page.pdf.assetId);
    const p = await doc.getPage(v.page.pdf.pageIndex + 1);
    const vp = p.getViewport({ scale: v.page.width / p.getViewport({ scale: 1 }).width });
    const tc = await p.getTextContent();
    if (token !== v.hlToken) return;
    const nq = normalize(q);
    for (const it of tc.items) {
      const ns = normalize(it.str);
      let idx = ns.indexOf(nq);
      while (idx >= 0) {
        const [, , , , e, f] = it.transform;
        const fh = it.height || Math.hypot(it.transform[2], it.transform[3]);
        const x0 = e + (it.width * idx) / Math.max(1, ns.length);
        const x1 = x0 + (it.width * nq.length) / Math.max(1, ns.length);
        const [ax, ay, bx, by] = vp.convertToViewportRectangle([x0, f - fh * 0.2, x1, f + fh * 0.95]);
        layer.append(h('div', { style: {
          position: 'absolute', background: 'rgba(255, 196, 0, .42)', borderRadius: '2px',
          left: Math.min(ax, bx) * zoom + 'px', top: Math.min(ay, by) * zoom + 'px',
          width: Math.abs(bx - ax) * zoom + 'px', height: Math.abs(by - ay) * zoom + 'px' } }));
        idx = ns.indexOf(nq, idx + nq.length);
      }
    }
  } catch { /* sem destaque */ }
}

function releaseView(v) {
  v.bgToken++;
  for (const c of [v.bg, v.ink, v.tapeC]) { c.width = 0; c.height = 0; }
  v.k = 0;
  v.win = null;
  v.imgLayer.replaceChildren();
  v.textLayer.replaceChildren();
  v.hlLayer.replaceChildren();
  v.linkLayer.replaceChildren();
  removeLive(v);
}

function ensureLive(v) {
  if (!v.win) { v.win = computeWindow(v); v.k = windowScale(v.win); }
  if (!v.live) {
    v.live = h('canvas', { class: 'live' });
    v.live.style.zIndex = 5;
    v.el.append(v.live);
  }
  if (v.live.width !== Math.round(v.win.w * v.k) || v.live.style.left !== v.win.x * zoom + 'px') placeCanvas(v.live, v.win, v.k);
  return canvasCtx(v.live, v.win, v.k);
}
function removeLive(v) { if (v.live) { v.live.remove(); v.live = null; } }

// ---------- Rolagem, zoom, página atual ----------
let windowCheck = 0;
function onScroll() {
  const sc = $('scroller');
  const mid = sc.scrollTop + sc.clientHeight * 0.4;
  let idx = 0;
  for (let i = 0; i < pages.length; i++) {
    const v = views.get(pages[i].id);
    if (v && v.el.offsetTop <= mid) idx = i;
  }
  if (idx !== currentIndex) { currentIndex = idx; updatePageUi(); }
  if (!isBoard()) showIndicator();
  // páginas desenhadas por janela: redesenha quando a parte visível sai da janela
  cancelAnimationFrame(windowCheck);
  windowCheck = requestAnimationFrame(() => {
    for (const v of views.values()) {
      if (!v.active || !v.win || (v.win.w >= v.page.width && v.win.h >= v.page.height)) continue;
      const sr = sc.getBoundingClientRect(), pr = v.el.getBoundingClientRect();
      const vx0 = (sr.left - pr.left) / zoom, vy0 = (sr.top - pr.top) / zoom;
      const vx1 = vx0 + sr.width / zoom, vy1 = vy0 + sr.height / zoom;
      const w = v.win;
      const inside = (vx0 >= w.x - 1 || w.x <= 0) && (vy0 >= w.y - 1 || w.y <= 0) &&
        (vx1 <= w.x + w.w + 1 || w.x + w.w >= v.page.width) && (vy1 <= w.y + w.h + 1 || w.y + w.h >= v.page.height);
      if (!inside) queueRender(v);
    }
  });
}

let indicatorTimer = 0;
function showIndicator() {
  const el = $('page-indicator');
  el.textContent = `${currentIndex + 1} / ${pages.length}`;
  el.style.opacity = 1;
  clearTimeout(indicatorTimer);
  indicatorTimer = setTimeout(() => { el.style.opacity = 0; }, 1200);
  if (presenting) $('pr-count').textContent = `${currentIndex + 1} / ${pages.length}`;
}

function updatePageUi() {
  const p = pages[currentIndex];
  $('ed-bookmark').classList.toggle('active', !!p?.bookmarked);
  document.querySelectorAll('.thumb-item').forEach((t) => t.classList.toggle('current', t.dataset.id === p?.id));
  const cur = document.querySelector('.thumb-item.current');
  if (cur && !$('thumbs').hidden) cur.scrollIntoView({ block: 'nearest' });
}

function scrollToPage(i, smooth = true) {
  const p = pages[i];
  if (!p) return;
  const v = views.get(p.id);
  const sc = $('scroller');
  const top = presenting ? v.el.offsetTop - Math.max(0, (sc.clientHeight - v.el.offsetHeight) / 2) : v.el.offsetTop - 16;
  sc.scrollTo({ top, behavior: smooth ? 'smooth' : 'auto' });
  currentIndex = i;
  updatePageUi();
  showIndicator();
}

function centerBoard() {
  const sc = $('scroller');
  const v = views.get(pages[0].id);
  const page = pages[0];
  const cx = page.boardCenter?.x ?? page.width / 2, cy = page.boardCenter?.y ?? page.height / 2;
  sc.scrollLeft = v.el.offsetLeft + cx * zoom - sc.clientWidth / 2;
  sc.scrollTop = v.el.offsetTop + cy * zoom - sc.clientHeight / 2;
}

function setZoom(z, focal) {
  z = Math.max(isBoard() ? 0.1 : 0.25, Math.min(6, z));
  if (Math.abs(z - zoom) < 1e-4) return;
  const sc = $('scroller');
  const rect = sc.getBoundingClientRect();
  const f = focal || { x: rect.left + sc.clientWidth / 2, y: rect.top + sc.clientHeight / 2 };
  // ponto da página sob o foco
  const anchorView = viewAtClient(f.x, f.y) || views.get(pages[currentIndex].id);
  const ar = anchorView.el.getBoundingClientRect();
  const ux = (f.x - ar.left) / zoom, uy = (f.y - ar.top) / zoom;
  zoom = z;
  layout();
  const nr = anchorView.el.getBoundingClientRect();
  sc.scrollLeft += nr.left + ux * zoom - f.x;
  sc.scrollTop += nr.top + uy * zoom - f.y;
}

function viewAtClient(x, y) {
  for (const v of views.values()) {
    const r = v.el.getBoundingClientRect();
    if (y >= r.top - 11 && y <= r.bottom + 11) return v;
  }
  return null;
}

function toPage(v, e) {
  const r = v.el.getBoundingClientRect();
  return [(e.clientX - r.left) / zoom, (e.clientY - r.top) / zoom];
}

// ---------- Entrada (caneta, mouse, toque) ----------
function hitTape(page, x, y, onlyHidden) {
  for (let i = page.tapes.length - 1; i >= 0; i--) {
    const t = page.tapes[i];
    if ((!onlyHidden || t.hidden) && pointInTape(x, y, t)) return t;
  }
  return null;
}

function onPointerDown(e) {
  if (e.target.closest('.sel-menu, .text-editor, .link-badge')) return;
  closeMenu();
  const scroller = $('scroller');
  // Evita os eventos de mouse “de compatibilidade” depois de toque/caneta.
  if (e.pointerType !== 'mouse' && e.target.closest('.page')) e.preventDefault();

  if (e.pointerType === 'touch') {
    touches.set(e.pointerId, { x: e.clientX, y: e.clientY, t: performance.now() });
    if (touches.size === 2) {
      // segundo dedo: cancela o traço e inicia pinça/rolagem
      if (action && action.pointerType === 'touch') cancelAction();
      const [a, b] = [...touches.values()];
      gesture = {
        type: 'pinch', startDist: Math.hypot(a.x - b.x, a.y - b.y) || 1, startZoom: zoom,
        mid: { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }, start: performance.now(), moved: false,
      };
      return;
    }
    if (touches.size > 2) return;
  }

  const pageEl = e.target.closest('.page');
  const v = pageEl && views.get(pageEl.dataset.id);
  const penEraser = e.pointerType === 'pen' && (e.button === 5 || (e.buttons & 32));
  let t = penEraser ? 'eraser' : tool;
  if (tempHand || (e.pointerType === 'touch' && settings.penOnly) || e.button === 1) t = 'hand';
  if (!v && t !== 'hand') t = e.pointerType === 'touch' ? 'hand' : null;
  if (!t) { clearSelection(); return; }

  if (editingText && t !== 'hand') {
    const inside = e.target.closest('.text-editor');
    if (!inside) { commitTextEdit(); if (tool === 'text') return; }
  }

  try { scroller.setPointerCapture(e.pointerId); } catch { /* ponteiro sintético */ }

  // Tocar numa fita revela/esconde (fitas escondidas bloqueiam a escrita por baixo).
  if (v && ['pen', 'highlighter', 'hand', 'tape', 'laser', 'text'].includes(t) && e.button !== 2) {
    const [x, y] = toPage(v, e);
    const tape = hitTape(v.page, x, y, !['tape', 'hand'].includes(t));
    if (tape) {
      action = { type: 'tapTape', v, tape, pointerId: e.pointerId, pointerType: e.pointerType, x: e.clientX, y: e.clientY };
      return;
    }
  }
  // Reprodução de áudio: tocar num traço gravado pula para aquele momento.
  if (v && player?.tapSeek && t !== 'hand') {
    const [x, y] = toPage(v, e);
    const s = [...v.page.strokes].reverse().find((st) => st.rec === player.rec.id && strokeHit(st, x, y, 8));
    action = { type: 'seek', pointerId: e.pointerId, pointerType: e.pointerType };
    if (s) { player.audio.currentTime = Math.max(0, (s.t - 1500) / 1000); player.audio.play(); updatePlayerUi(); }
    return;
  }

  if (t === 'hand') {
    action = { type: 'pan', pointerId: e.pointerId, pointerType: e.pointerType, x: e.clientX, y: e.clientY,
      sl: scroller.scrollLeft, st: scroller.scrollTop, vx: 0, vy: 0, lt: performance.now() };
    $('pages').style.cursor = 'grabbing';
    return;
  }
  if (e.button === 2) return;
  const [x, y] = toPage(v, e);

  if (t === 'pen' || t === 'highlighter') {
    clearSelection();
    const conf = settings[t];
    const pressure = e.pointerType === 'pen' ? (e.pressure || 0.5) : 0.5;
    const stroke = { id: uid(), tool: t, color: conf.color, size: conf.size, points: [[x, y, pressure]], sim: e.pointerType !== 'pen' };
    if (t === 'pen' && conf.style && conf.style !== 'fountain') stroke.style = conf.style;
    if (t === 'highlighter') { stroke.opacity = 0.38; stroke.sim = false; }
    if (isRecording()) { stroke.rec = currentRecording().id; stroke.t = recordingTime(); }
    action = { type: 'draw', v, stroke, pointerId: e.pointerId, pointerType: e.pointerType, before: snapshot(v.page), anchor: [x, y] };
    scheduleStraighten();
    drawLive();
  } else if (t === 'eraser') {
    clearSelection();
    action = { type: 'erase', v, pointerId: e.pointerId, pointerType: e.pointerType, before: snapshot(v.page), last: [x, y], changed: false };
    eraseAlong(v, x, y, x, y);
    drawEraserCursor(v, x, y);
  } else if (t === 'tape') {
    clearSelection();
    action = { type: 'tape', v, pointerId: e.pointerId, pointerType: e.pointerType, start: [x, y], end: [x, y], before: snapshot(v.page) };
  } else if (t === 'laser') {
    action = { type: 'laser', v, pointerId: e.pointerId, pointerType: e.pointerType };
    laserAdd(v, x, y);
  } else if (t === 'lasso') {
    const sel = e.target.closest('.selection');
    if (sel && selection) {
      const now = performance.now();
      if (selection.lastDown && now - selection.lastDown < 320 && selection.texts.size === 1 && !selection.strokes.size && !selection.images.size) {
        const id = [...selection.texts][0];
        const sv = views.get(selection.pageId);
        clearSelection();
        startTextEdit(sv, sv.page.texts.find((tt) => tt.id === id));
        return;
      }
      selection.lastDown = now;
      const sv = views.get(selection.pageId);
      const kind = e.target.classList.contains('handle') ? 'scale' : e.target.classList.contains('rot-handle') ? 'rotate' : 'move';
      action = { type: 'transform', kind, v: sv, pointerId: e.pointerId, pointerType: e.pointerType,
        start: toPage(sv, e), before: snapshot(sv.page), dx: 0, dy: 0, s: 1, r: 0 };
      beginSelectionPreview();
      return;
    }
    clearSelection();
    action = { type: 'lasso', v, pointerId: e.pointerId, pointerType: e.pointerType, poly: [[x, y]], start: [x, y] };
  } else if (t === 'text') {
    const hit = [...v.page.texts].reverse().find((tt) => x >= tt.x && x <= tt.x + tt.w && y >= tt.y && y <= tt.y + (tt.h || tt.size * 1.3));
    // espera soltar para não brigar com o foco
    action = { type: 'text', v, pointerId: e.pointerId, pointerType: e.pointerType, x, y, hit };
  }
}

function onPointerMove(e) {
  if (e.pointerType === 'touch' && touches.has(e.pointerId)) {
    touches.set(e.pointerId, { ...touches.get(e.pointerId), x: e.clientX, y: e.clientY });
    if (gesture && touches.size >= 2) {
      const [a, b] = [...touches.values()];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      const mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
      if (Math.abs(dist - gesture.startDist) > 8 || Math.hypot(mid.x - gesture.mid.x, mid.y - gesture.mid.y) > 8) gesture.moved = true;
      const sc = $('scroller');
      sc.scrollLeft -= mid.x - gesture.mid.x;
      sc.scrollTop -= mid.y - gesture.mid.y;
      gesture.mid = mid;
      const nz = gesture.startZoom * (dist / gesture.startDist);
      if (gesture.moved) setZoom(nz, mid);
      return;
    }
  }
  if (!action || action.pointerId !== e.pointerId) {
    if (e.pointerType !== 'touch') {
      const pe = e.target.closest?.('.page');
      const v = pe && views.get(pe.dataset.id);
      if (v && tool === 'eraser') { const [x, y] = toPage(v, e); drawEraserCursor(v, x, y); }
      if (v && tool === 'laser' && e.pointerType === 'mouse') { const [x, y] = toPage(v, e); laserAdd(v, x, y, true); }
    }
    return;
  }
  const events = e.getCoalescedEvents ? e.getCoalescedEvents() : [e];
  const evs = events.length ? events : [e];
  const a = action;
  if (a.type === 'pan') {
    const sc = $('scroller');
    const now = performance.now();
    const dt = Math.max(1, now - a.lt);
    a.vx = (e.clientX - (a.px0 ?? e.clientX)) / dt; a.vy = (e.clientY - (a.py0 ?? e.clientY)) / dt;
    a.px0 = e.clientX; a.py0 = e.clientY; a.lt = now;
    sc.scrollLeft = a.sl - (e.clientX - a.x);
    sc.scrollTop = a.st - (e.clientY - a.y);
  } else if (a.type === 'draw') {
    const pts = a.stroke.points;
    for (const ev of evs) {
      const [x, y] = toPage(a.v, ev);
      const p = a.pointerType === 'pen' ? (ev.pressure || 0.5) : 0.5;
      if (a.frozen) continue;
      if (a.straight) { a.straightEnd = [x, y, p]; continue; }
      const last = pts[pts.length - 1];
      if (Math.hypot(x - last[0], y - last[1]) < 0.35 / zoom) continue;
      pts.push([x, y, p]);
      if (Math.hypot(x - a.anchor[0], y - a.anchor[1]) > 3 / zoom) { a.anchor = [x, y]; scheduleStraighten(); }
    }
    if (a.straight && a.straightEnd) makeStraight(a);
    drawLive();
  } else if (a.type === 'erase') {
    for (const ev of evs) {
      const [x, y] = toPage(a.v, ev);
      eraseAlong(a.v, a.last[0], a.last[1], x, y);
      a.last = [x, y];
    }
    drawEraserCursor(a.v, a.last[0], a.last[1]);
  } else if (a.type === 'tape') {
    a.end = toPage(a.v, e);
    const ctx = ensureLive(a.v);
    drawTape(ctx, { x1: a.start[0], y1: a.start[1], x2: a.end[0], y2: a.end[1], w: settings.tape.size, color: settings.tape.color, hidden: true });
  } else if (a.type === 'laser') {
    for (const ev of evs) { const [x, y] = toPage(a.v, ev); laserAdd(a.v, x, y); }
  } else if (a.type === 'lasso') {
    if (settings.lassoMode === 'rect') {
      const [x, y] = toPage(a.v, e), [sx, sy] = a.start;
      a.poly = [[sx, sy], [x, sy], [x, y], [sx, y]];
    } else for (const ev of evs) a.poly.push(toPage(a.v, ev));
    const ctx = ensureLive(a.v);
    ctx.save();
    ctx.lineWidth = 1.4 / zoom;
    ctx.setLineDash([5 / zoom, 4 / zoom]);
    ctx.strokeStyle = '#24766b';
    ctx.fillStyle = 'rgba(194, 86, 47, .06)';
    ctx.beginPath();
    a.poly.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
    ctx.closePath();
    ctx.fill(); ctx.stroke();
    ctx.restore();
  } else if (a.type === 'transform') {
    const [x, y] = toPage(a.v, e);
    const b = selection.bbox;
    const cx = b.x + b.w / 2, cy = b.y + b.h / 2;
    if (a.kind === 'move') { a.dx = x - a.start[0]; a.dy = y - a.start[1]; }
    else if (a.kind === 'scale') {
      const d0 = Math.hypot(a.start[0] - cx, a.start[1] - cy) || 1;
      a.s = Math.max(0.1, Math.hypot(x - cx, y - cy) / d0);
    } else {
      let r = Math.atan2(y - cy, x - cx) - Math.atan2(a.start[1] - cy, a.start[0] - cx);
      const snap = Math.round(r / (Math.PI / 12)) * (Math.PI / 12); // imã a cada 15°
      if (Math.abs(r - snap) < 0.05) r = snap;
      a.r = r;
    }
    previewSelection(a);
  }
}

function onPointerUp(e) {
  if (e.pointerType === 'touch' && touches.has(e.pointerId)) {
    touches.delete(e.pointerId);
    if (gesture) {
      if (!touches.size) {
        // toque rápido com dois dedos = desfazer
        if (!gesture.moved && performance.now() - gesture.start < 280) undo();
        gesture = null;
        layout();
      }
      return;
    }
  }
  if (!action || action.pointerId !== e.pointerId) return;
  const a = action;
  action = null;
  clearTimeout(straightenTimer);
  if (a.type === 'pan') {
    updateCursor();
    if (a.pointerType === 'touch') inertia(a.vx, a.vy);
  } else if (a.type === 'tapTape') {
    if (Math.hypot(e.clientX - a.x, e.clientY - a.y) < 8) {
      const before = snapshot(a.v.page);
      a.v.page.tapes = a.v.page.tapes.map((t) => (t === a.tape ? { ...t, hidden: !t.hidden } : t));
      commit(a.v.page, before);
      renderTapes(a.v);
    }
  } else if (a.type === 'draw') {
    finishStroke(a);
  } else if (a.type === 'erase') {
    if (a.changed) commit(a.v.page, a.before);
    removeLive(a.v);
  } else if (a.type === 'tape') {
    removeLive(a.v);
    const [x1, y1] = a.start, [x2, y2] = a.end;
    if (Math.hypot(x2 - x1, y2 - y1) > 6) {
      a.v.page.tapes = [...a.v.page.tapes, { id: uid(), x1, y1, x2, y2, w: settings.tape.size, color: settings.tape.color, hidden: true }];
      commit(a.v.page, a.before);
      renderTapes(a.v);
    }
  } else if (a.type === 'lasso') {
    removeLive(a.v);
    selectInPolygon(a.v, a.poly);
  } else if (a.type === 'transform') {
    finishSelectionTransform(a);
  } else if (a.type === 'text') {
    if (a.hit) startTextEdit(a.v, a.hit);
    else startTextEdit(a.v, null, a.x, a.y);
  }
}

function onPointerCancel(e) {
  touches.delete(e.pointerId);
  if (!touches.size) gesture = null;
  if (action && action.pointerId === e.pointerId) cancelAction();
}

function cancelAction() {
  const a = action;
  action = null;
  clearTimeout(straightenTimer);
  if (!a) return;
  if (a.v && a.type !== 'laser') removeLive(a.v);
  if (a.type === 'erase' && a.changed) { applyContent(a.v.page, a.before); }
  if (a.type === 'transform' && selection) { a.dx = 0; a.dy = 0; a.s = 1; a.r = 0; previewSelection(a); endSelectionPreview(); }
}

function inertia(vx, vy) {
  const sc = $('scroller');
  let last = performance.now();
  const step = (now) => {
    const dt = now - last; last = now;
    sc.scrollLeft -= vx * dt; sc.scrollTop -= vy * dt;
    vx *= Math.pow(0.94, dt / 16); vy *= Math.pow(0.94, dt / 16);
    if (Math.hypot(vx, vy) > 0.02 && !action) requestAnimationFrame(step);
  };
  if (Math.hypot(vx, vy) > 0.1) requestAnimationFrame(step);
}

// ---------- Traço ----------
let liveRaf = 0;
function drawLive() {
  if (liveRaf) return;
  liveRaf = requestAnimationFrame(() => {
    liveRaf = 0;
    const a = action;
    if (!a || a.type !== 'draw') return;
    const ctx = ensureLive(a.v);
    drawStroke(ctx, { ...a.stroke, points: a.stroke.points.slice() });
  });
}

function finishStroke(a) {
  const page = a.v.page;
  removeLive(a.v);
  // Rabiscar por cima apaga o que foi rabiscado.
  if (settings.scribbleErase && a.stroke.tool === 'pen' && !a.straight && !a.frozen && isScribble(a.stroke.points)) {
    const hits = strokesHitByScribble(a.stroke.points, page.strokes);
    if (hits.size) {
      page.strokes = page.strokes.filter((s) => !hits.has(s.id));
      renderInk(a.v);
      commit(page, a.before);
      toast(`${hits.size} traço${hits.size > 1 ? 's' : ''} apagado${hits.size > 1 ? 's' : ''} com o rabisco`, { action: 'Desfazer', onAction: undo });
      return;
    }
  }
  page.strokes = [...page.strokes, a.stroke];
  if (a.stroke.tool === 'pen' && !player && a.v.win) {
    const ctx = a.v.ink.getContext('2d');
    const k = a.v.k, w = a.v.win;
    ctx.setTransform(k, 0, 0, k, -w.x * k, -w.y * k);
    drawStroke(ctx, a.stroke);
  } else renderInk(a.v);
  commit(page, a.before);
}

let straightenTimer = 0;
function scheduleStraighten() {
  clearTimeout(straightenTimer);
  if (!settings.straighten) return;
  straightenTimer = setTimeout(() => {
    const a = action;
    if (!a || a.type !== 'draw' || a.straight || a.frozen || a.stroke.points.length < 6) return;
    const pts = a.stroke.points;
    const shape = recognizeShape(pts);
    if (!shape) return;
    if (shape.shape === 'line') {
      a.straight = true;
      a.straightEnd = pts[pts.length - 1];
      makeStraight(a);
    } else {
      // forma reconhecida: substitui pelo desenho perfeito
      a.frozen = true;
      a.stroke.points = shape.points;
      a.stroke.shape = shape.shape;
      a.stroke.sim = false;
    }
    drawLive();
  }, 550);
}

function makeStraight(a) {
  const pts = a.stroke.points;
  const first = pts[0], end = a.straightEnd;
  const avgP = pts.reduce((s, p) => s + p[2], 0) / pts.length;
  const n = Math.max(2, Math.ceil(Math.hypot(end[0] - first[0], end[1] - first[1]) / 6));
  const out = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    out.push([first[0] + (end[0] - first[0]) * t, first[1] + (end[1] - first[1]) * t, avgP]);
  }
  a.stroke.points = out;
  a.stroke.sim = false;
  a.stroke.shape = 'line';
}

// ---------- Laser ----------
let laserRaf = 0;
function laserAdd(v, x, y, hover = false) {
  v.laser ||= [];
  v.laser.push({ x, y, t: performance.now(), hover });
  if (!laserRaf) laserRaf = requestAnimationFrame(laserFrame);
}

function laserFrame() {
  laserRaf = 0;
  const now = performance.now();
  let alive = false;
  for (const v of views.values()) {
    if (!v.laser?.length) continue;
    v.laser = v.laser.filter((p) => now - p.t < (p.hover ? 120 : 700));
    if (!v.laser.length) { removeLive(v); continue; }
    alive = true;
    const ctx = ensureLive(v);
    ctx.save();
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    for (let i = 1; i < v.laser.length; i++) {
      const p0 = v.laser[i - 1], p1 = v.laser[i];
      if (p1.t - p0.t > 80) continue;
      const age = (now - p1.t) / 700;
      ctx.strokeStyle = `rgba(255, 40, 40, ${Math.max(0, 0.9 - age)})`;
      ctx.shadowColor = 'rgba(255, 60, 60, .9)'; ctx.shadowBlur = 10;
      ctx.lineWidth = 4 / Math.max(zoom, 0.5);
      ctx.beginPath(); ctx.moveTo(p0.x, p0.y); ctx.lineTo(p1.x, p1.y); ctx.stroke();
    }
    const last = v.laser[v.laser.length - 1];
    ctx.fillStyle = '#ff2b2b'; ctx.shadowColor = 'rgba(255,40,40,1)'; ctx.shadowBlur = 16;
    ctx.beginPath(); ctx.arc(last.x, last.y, 5 / Math.max(zoom, 0.5), 0, Math.PI * 2); ctx.fill();
    ctx.restore();
  }
  if (alive) laserRaf = requestAnimationFrame(laserFrame);
}

// ---------- Borracha ----------
const boundsCache = new WeakMap();
function cachedBounds(s) {
  let b = boundsCache.get(s.points);
  if (!b) { b = strokeBounds(s); boundsCache.set(s.points, b); }
  return b;
}

function strokeHit(s, x, y, r) {
  const p = s.points;
  if (p.length === 1) return Math.hypot(p[0][0] - x, p[0][1] - y) <= r;
  for (let i = 1; i < p.length; i++) if (distToSegment(x, y, p[i - 1][0], p[i - 1][1], p[i][0], p[i][1]) <= r) return true;
  return false;
}

function densify(points, step) {
  const out = [points[0]];
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1], b = points[i];
    const d = Math.hypot(b[0] - a[0], b[1] - a[1]);
    const n = Math.floor(d / step);
    for (let j = 1; j < n; j++) {
      const t = j / n;
      out.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]);
    }
    out.push(b);
  }
  return out;
}

function eraseAlong(v, x0, y0, x1, y1) {
  const r = settings.eraser.size / 2;
  const d = Math.hypot(x1 - x0, y1 - y0);
  const n = Math.max(1, Math.ceil(d / (r * 0.5)));
  let changed = false, tapes = false;
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const x = x0 + (x1 - x0) * t, y = y0 + (y1 - y0) * t;
    if (eraseAt(v.page, x, y, r)) changed = true;
    // a borracha também remove fitas
    const tape = v.page.tapes.find((tp) => pointInTape(x, y, tp));
    if (tape && !settings.eraser.hlOnly) { v.page.tapes = v.page.tapes.filter((tp) => tp !== tape); tapes = true; }
  }
  if (changed || tapes) action.changed = true;
  if (changed) renderInk(v);
  if (tapes) renderTapes(v);
}

function eraseAt(page, x, y, r) {
  let changed = false;
  const out = [];
  for (const s of page.strokes) {
    if (settings.eraser.hlOnly && s.tool !== 'highlighter') { out.push(s); continue; }
    const b = cachedBounds(s);
    if (x < b.x - r || x > b.x + b.w + r || y < b.y - r || y > b.y + b.h + r) { out.push(s); continue; }
    const rr = r + (s.tool === 'highlighter' ? s.size / 2 : s.size * 0.35);
    if (!strokeHit(s, x, y, rr)) { out.push(s); continue; }
    changed = true;
    if (settings.eraser.mode === 'stroke' || s.points.length === 1 || s.shape) continue; // formas saem inteiras
    const pts = densify(s.points, Math.max(0.8, r / 3));
    let run = [];
    const flush = () => { if (run.length >= 2) out.push({ ...s, id: uid(), points: run }); run = []; };
    for (const p of pts) {
      if (Math.hypot(p[0] - x, p[1] - y) <= rr) flush();
      else run.push(p);
    }
    flush();
  }
  if (changed) page.strokes = out;
  return changed;
}

function drawEraserCursor(v, x, y) {
  const ctx = ensureLive(v);
  ctx.beginPath();
  ctx.arc(x, y, settings.eraser.size / 2, 0, Math.PI * 2);
  ctx.lineWidth = 1 / zoom;
  ctx.strokeStyle = 'rgba(31,42,55,.7)';
  ctx.fillStyle = 'rgba(255,255,255,.35)';
  ctx.fill(); ctx.stroke();
  clearTimeout(v.cursorTimer);
  v.cursorTimer = setTimeout(() => { if (!action || action.v !== v) removeLive(v); }, 900);
}

function setAllTapes(hidden) {
  for (const p of pages) {
    if (!p.tapes.length || p.tapes.every((t) => t.hidden === hidden)) continue;
    const before = snapshot(p);
    p.tapes = p.tapes.map((t) => ({ ...t, hidden }));
    commit(p, before);
    const v = viewOf(p);
    if (v?.active) renderTapes(v);
  }
}

// ---------- Laço / seleção ----------
function selectInPolygon(v, poly) {
  if (poly.length < 3) return;
  const page = v.page;
  const sel = { pageId: page.id, strokes: new Set(), texts: new Set(), images: new Set() };
  for (const s of page.strokes) {
    let inside = 0;
    for (const [x, y] of s.points) if (pointInPolygon(x, y, poly)) inside++;
    if (inside / s.points.length >= 0.5) sel.strokes.add(s.id);
  }
  for (const t of page.texts) {
    if (pointInPolygon(t.x + t.w / 2, t.y + (t.h || t.size) / 2, poly)) sel.texts.add(t.id);
  }
  for (const im of page.images) {
    if (pointInPolygon(im.x + im.w / 2, im.y + im.h / 2, poly)) sel.images.add(im.id);
  }
  if (!sel.strokes.size && !sel.texts.size && !sel.images.size) return;
  selection = sel;
  updateSelectionBBox();
  drawSelectionOverlay();
}

function selectedItems(page = views.get(selection.pageId)?.page) {
  return {
    strokes: page.strokes.filter((s) => selection.strokes.has(s.id)),
    texts: page.texts.filter((t) => selection.texts.has(t.id)),
    images: page.images.filter((i) => selection.images.has(i.id)),
  };
}

function itemsBBox(items) {
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  const add = (b) => { x0 = Math.min(x0, b.x); y0 = Math.min(y0, b.y); x1 = Math.max(x1, b.x + b.w); y1 = Math.max(y1, b.y + b.h); };
  items.strokes.forEach((s) => add(cachedBounds(s)));
  items.texts.forEach((t) => add({ x: t.x - (t.bg ? NOTE_PAD : 0), y: t.y - (t.bg ? NOTE_PAD : 0), w: t.w + (t.bg ? NOTE_PAD * 2 : 0), h: (t.h || t.size * 1.3) + (t.bg ? NOTE_PAD * 2 : 0) }));
  items.images.forEach((i) => add(imageBounds(i)));
  return { x: x0, y: y0, w: Math.max(1, x1 - x0), h: Math.max(1, y1 - y0) };
}

function updateSelectionBBox() {
  selection.bbox = itemsBBox(selectedItems());
}

function clearSelection() {
  if (!selection) return;
  const v = views.get(selection.pageId);
  selection = null;
  v?.el.querySelectorAll('.selection, .sel-menu').forEach((n) => n.remove());
}

function drawSelectionOverlay(preview) {
  const v = views.get(selection.pageId);
  if (!v) return;
  v.el.querySelectorAll('.selection, .sel-menu').forEach((n) => n.remove());
  const b0 = selection.bbox;
  let b = b0, rot = 0;
  if (preview) {
    const cx = b0.x + b0.w / 2 + preview.dx, cy = b0.y + b0.h / 2 + preview.dy;
    b = { x: cx - (b0.w * preview.s) / 2, y: cy - (b0.h * preview.s) / 2, w: b0.w * preview.s, h: b0.h * preview.s };
    rot = preview.r;
  }
  const pad = 6 / zoom;
  const box = h('div', { class: 'selection', style: {
    left: (b.x - pad) * zoom + 'px', top: (b.y - pad) * zoom + 'px',
    width: (b.w + pad * 2) * zoom + 'px', height: (b.h + pad * 2) * zoom + 'px',
    transform: rot ? `rotate(${rot}rad)` : '' } }, h('div', { class: 'handle', title: 'Redimensionar' }), h('div', { class: 'rot-handle', title: 'Girar' }));
  v.el.append(box);
  if (preview) return;
  const menu = h('div', { class: 'sel-menu' });
  const btn = (label, fn) => {
    const bt = h('button', {}, label);
    bt.addEventListener('pointerdown', (e) => e.stopPropagation());
    bt.addEventListener('click', (e) => { e.stopPropagation(); fn(bt); });
    return bt;
  };
  const items = selectedItems(v.page);
  if (pendingCard) menu.append(btn('Usar como verso', () => useSelectionAsBack()));
  if (items.strokes.length || items.texts.length) menu.append(btn('Cor', (bt) => selectionColorMenu(bt)));
  if (items.strokes.some((s) => CLOSED_SHAPES.has(s.shape))) menu.append(btn('Preencher', (bt) => selectionColorMenu(bt, true)));
  menu.append(btn('Flashcard', (bt) => flashcardMenu(bt)), btn('Duplicar', duplicateSelection), btn('Excluir', deleteSelection),
    btn('Mais…', (bt) => selectionMoreMenu(bt)));
  // acima da alça de girar; se não couber, abaixo da seleção
  const top = (b.y - pad) * zoom - 42;
  menu.style.left = (b.x + b.w / 2) * zoom + 'px';
  if (top < 44) { menu.style.top = (b.y + b.h + pad) * zoom + 56 + 'px'; } else menu.style.top = top + 'px';
  v.el.append(menu);
}

function selectionMoreMenu(anchor) {
  const items = selectedItems();
  showMenu(anchor, [
    { label: 'Copiar', icon: 'copy', onClick: copySelection },
    { label: 'Recortar', icon: 'clear', onClick: () => { copySelection(); deleteSelection(); } },
    { label: 'Trazer para frente', icon: 'up', onClick: () => arrangeSelection('front') },
    { label: 'Enviar para trás', icon: 'down', onClick: () => arrangeSelection('back') },
    'sep',
    { label: 'Criar link…', icon: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>', onClick: linkDialog },
    { label: 'Salvar como figurinha', icon: '<path d="M14 3H7a4 4 0 0 0-4 4v10a4 4 0 0 0 4 4h7l7-7V7a4 4 0 0 0-4-4z"/>', onClick: saveSelectionAsSticker },
    'sep',
    items.strokes.length ? { label: 'Converter em texto (IA)', icon: '<path d="M5 6V4h14v2M12 4v16M9 20h6"/>', onClick: convertSelectionToText } : null,
    { label: 'Explicar / resolver (IA)', icon: '<path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8z"/>', onClick: async () => explainSelection(await selectionImage()) },
  ]);
}

const tp = (x, y, t) => {
  // p' = c + R(r)·s·(p − c) + d
  const px = (x - t.cx) * t.s, py = (y - t.cy) * t.s;
  const c = Math.cos(t.r), s = Math.sin(t.r);
  return [t.cx + px * c - py * s + t.dx, t.cy + px * s + py * c + t.dy];
};
function transformOf(a) {
  const b = selection.bbox;
  return { dx: a.dx, dy: a.dy, s: a.s, r: a.r || 0, cx: b.x + b.w / 2, cy: b.y + b.h / 2 };
}
function transformStroke(s, t) {
  return { ...s, size: s.size * t.s, points: s.points.map(([x, y, p]) => [...tp(x, y, t), p]) };
}
function transformText(tx, t) {
  const hh = tx.h || tx.size * 1.3;
  const [cx, cy] = tp(tx.x + tx.w / 2, tx.y + hh / 2, t);
  const w = tx.w * t.s, nh = hh * t.s;
  return { ...tx, x: cx - w / 2, y: cy - nh / 2, w, size: tx.size * t.s, h: nh };
}
function transformImage(im, t) {
  const [cx, cy] = tp(im.x + im.w / 2, im.y + im.h / 2, t);
  const w = im.w * t.s, hh = im.h * t.s;
  return { ...im, x: cx - w / 2, y: cy - hh / 2, w, h: hh, rot: (im.rot || 0) + t.r };
}

function beginSelectionPreview() {
  const v = views.get(selection.pageId);
  renderInk(v, selection.strokes);
}

function previewSelection(a) {
  const v = a.v;
  const t = transformOf(a);
  const ctx = ensureLive(v);
  ctx.save();
  ctx.translate(t.cx + t.dx, t.cy + t.dy);
  ctx.rotate(t.r);
  ctx.scale(t.s, t.s);
  ctx.translate(-t.cx, -t.cy);
  drawStrokes(ctx, v.page.strokes.filter((s) => selection.strokes.has(s.id)));
  ctx.restore();
  const tm = new Map(), im = new Map();
  for (const tx of v.page.texts) if (selection.texts.has(tx.id)) tm.set(tx.id, transformText(tx, t));
  for (const ig of v.page.images) if (selection.images.has(ig.id)) im.set(ig.id, transformImage(ig, t));
  if (tm.size) renderTexts(v, tm);
  if (im.size) renderImages(v, im);
  drawSelectionOverlay(t);
}

function endSelectionPreview() {
  const v = views.get(selection.pageId);
  removeLive(v);
  renderInk(v);
  renderDom(v);
  drawSelectionOverlay();
}

function finishSelectionTransform(a) {
  const v = a.v, page = v.page;
  const t = transformOf(a);
  const moved = Math.abs(t.dx) > 0.01 || Math.abs(t.dy) > 0.01 || Math.abs(t.s - 1) > 0.001 || Math.abs(t.r) > 0.001;
  if (moved) {
    page.strokes = page.strokes.map((s) => (selection.strokes.has(s.id) ? transformStroke(s, t) : s));
    page.texts = page.texts.map((x) => (selection.texts.has(x.id) ? transformText(x, t) : x));
    page.images = page.images.map((x) => (selection.images.has(x.id) ? transformImage(x, t) : x));
    commit(page, a.before);
    updateSelectionBBox();
    growBoard(page);
  }
  endSelectionPreview();
}

function colorPopover(anchor, colors, onPick, extra) {
  const menu = h('div', { class: 'menu', style: { display: 'flex', flexWrap: 'wrap', gap: '8px', width: '210px', padding: '10px' } });
  for (const c of colors) {
    const b = h('button', { class: 'swatch-btn', style: { '--c': c, width: '28px', height: '28px', padding: 0 } });
    b.addEventListener('click', () => { onPick(c); menu.remove(); });
    menu.append(b);
  }
  if (extra) {
    const b = h('button', { class: 'chip', style: { width: '100%' } }, extra.label);
    b.addEventListener('click', () => { extra.onClick(); menu.remove(); });
    menu.append(b);
  }
  document.body.append(menu);
  const r = anchor.getBoundingClientRect();
  menu.style.left = Math.max(8, Math.min(r.left, innerWidth - 224)) + 'px';
  menu.style.top = r.bottom + 8 + 'px';
  setTimeout(() => {
    const off = (e) => { if (!menu.contains(e.target)) { menu.remove(); document.removeEventListener('pointerdown', off, true); } };
    document.addEventListener('pointerdown', off, true);
  });
}

function selectionColorMenu(anchor, fill = false) {
  const colors = [...new Set([...settings.pen.palette, ...settings.highlighter.palette, '#ffffff'])];
  colorPopover(anchor, colors, (c) => recolorSelection(c, fill), fill ? { label: 'Sem preenchimento', onClick: () => recolorSelection(null, true) } : null);
}

function recolorSelection(color, fill) {
  const v = views.get(selection.pageId), page = v.page;
  const before = snapshot(page);
  if (fill) {
    page.strokes = page.strokes.map((s) => (selection.strokes.has(s.id) && CLOSED_SHAPES.has(s.shape) ? { ...s, fill: color || undefined } : s));
  } else {
    page.strokes = page.strokes.map((s) => (selection.strokes.has(s.id) ? { ...s, color } : s));
    page.texts = page.texts.map((t) => (selection.texts.has(t.id) ? { ...t, color } : t));
  }
  commit(page, before);
  renderInk(v); renderDom(v);
}

function arrangeSelection(where) {
  const v = views.get(selection.pageId), page = v.page;
  const before = snapshot(page);
  const order = (arr, set) => {
    const sel = arr.filter((x) => set.has(x.id)), rest = arr.filter((x) => !set.has(x.id));
    return where === 'front' ? [...rest, ...sel] : [...sel, ...rest];
  };
  page.strokes = order(page.strokes, selection.strokes);
  page.images = order(page.images, selection.images);
  page.texts = order(page.texts, selection.texts);
  commit(page, before);
  renderInk(v); renderDom(v);
}

function deleteSelection() {
  if (!selection) return;
  const v = views.get(selection.pageId), page = v.page;
  const before = snapshot(page);
  page.strokes = page.strokes.filter((s) => !selection.strokes.has(s.id));
  page.texts = page.texts.filter((t) => !selection.texts.has(t.id));
  page.images = page.images.filter((i) => !selection.images.has(i.id));
  clearSelection();
  commit(page, before);
  renderInk(v); renderDom(v);
}

function copySelection() {
  if (!selection) return;
  clipboard = structuredClone(selectedItems());
  clipboard.fromPage = selection.pageId;
  toast('Copiado');
}

function duplicateSelection() {
  if (!selection) return;
  const items = structuredClone(selectedItems());
  const v = views.get(selection.pageId);
  pasteItems(v, items, 18, 18);
}

function pasteItems(v, items, dx, dy) {
  const page = v.page;
  const before = snapshot(page);
  const t = { dx, dy, s: 1, r: 0, cx: 0, cy: 0 };
  const strokes = items.strokes.map((s) => ({ ...transformStroke(s, t), id: uid() }));
  const texts = items.texts.map((x) => ({ ...transformText(x, t), id: uid() }));
  const images = items.images.map((x) => ({ ...transformImage(x, t), id: uid() }));
  images.forEach((im) => assetsSeen.add(im.assetId));
  page.strokes = [...page.strokes, ...strokes];
  page.texts = [...page.texts, ...texts];
  page.images = [...page.images, ...images];
  commit(page, before);
  renderInk(v); renderDom(v);
  if (tool !== 'lasso') setTool('lasso');
  clearSelection();
  selection = { pageId: page.id, strokes: new Set(strokes.map((s) => s.id)), texts: new Set(texts.map((x) => x.id)), images: new Set(images.map((x) => x.id)) };
  updateSelectionBBox();
  drawSelectionOverlay();
}

// Cola itens no centro da área visível da página atual.
function pasteAtCenter(items) {
  const v = views.get(pages[currentIndex].id);
  const b = itemsBBox(items);
  const c = visibleCenter(v);
  pasteItems(v, items, c.x - (b.x + b.w / 2), c.y - (b.y + b.h / 2));
}

function visibleCenter(v) {
  const sr = $('scroller').getBoundingClientRect(), pr = v.el.getBoundingClientRect();
  const x = Math.min(Math.max(((sr.left + sr.width / 2) - pr.left) / zoom, 40), v.page.width - 40);
  const y = Math.min(Math.max(((sr.top + sr.height / 2) - pr.top) / zoom, 40), v.page.height - 40);
  return { x, y };
}

function pasteClipboard() {
  if (!clipboard) return false;
  const v = views.get(pages[currentIndex].id);
  if (clipboard.fromPage === v.page.id) pasteItems(v, structuredClone(clipboard), 18, 18);
  else pasteItems(v, structuredClone(clipboard), 0, 0);
  return true;
}

// Imagem PNG da área selecionada (para flashcards, figurinhas e IA).
async function selectionImage({ scale = 2.5, transparent = false } = {}) {
  const v = views.get(selection.pageId);
  const pad = 8;
  const b = selection.bbox;
  const region = { x: b.x - pad, y: b.y - pad, w: b.w + pad * 2, h: b.h + pad * 2 };
  const c = document.createElement('canvas');
  if (transparent) {
    const items = selectedItems(v.page);
    c.width = Math.ceil(region.w * scale); c.height = Math.ceil(region.h * scale);
    const ctx = c.getContext('2d');
    ctx.setTransform(scale, 0, 0, scale, -region.x * scale, -region.y * scale);
    for (const im of items.images) { const r = await loadImage(im.assetId); if (r) drawImageItem(ctx, im, r.img); }
    drawStrokes(ctx, items.strokes);
    for (const t of items.texts) drawTextBox(ctx, t);
    return c;
  }
  await renderPageFlat(v.page, c, 0, { region, scale });
  return new Promise((res) => c.toBlob(res, 'image/png'));
}

async function saveSelectionAsSticker() {
  const items = structuredClone(selectedItems());
  const b = itemsBBox(items);
  const t = { dx: -b.x, dy: -b.y, s: 1, r: 0, cx: 0, cy: 0 };
  const norm = {
    strokes: items.strokes.map((s) => transformStroke(s, t)),
    texts: items.texts.map((x) => transformText(x, t)),
    images: items.images.map((x) => transformImage(x, t)),
  };
  await saveElement(norm, await selectionImage({ scale: 1.5, transparent: true }));
}

// ---------- Flashcards a partir do laço ----------
function flashcardMenu(anchor) {
  showMenu(anchor, [
    { label: 'Digitar a resposta', icon: 'edit', onClick: async () => {
      const front = await selectionAsset();
      await createCardDialog({ front: { assetId: front }, notebook: nb, source: { notebookId: nb.id, pageId: selection?.pageId || pages[currentIndex].id } });
    } },
    { label: 'Selecionar o verso com o laço', icon: '<path d="M12 4c5 0 8 2.5 8 5.5S16.5 15 12 15s-8-2.5-8-5.5S7 4 12 4z"/>', onClick: async () => {
      pendingCard = { front: { assetId: await selectionAsset() }, pageId: selection.pageId };
      clearSelection();
      toast('Agora contorne a resposta com o laço e toque em “Usar como verso”.', { duration: 6000, action: 'Cancelar', onAction: () => { pendingCard = null; } });
    } },
  ]);
}

async function selectionAsset() {
  const blob = await selectionImage();
  const id = await saveAsset(blob);
  return id;
}

async function useSelectionAsBack() {
  const back = await selectionAsset();
  const card = pendingCard;
  pendingCard = null;
  clearSelection();
  await createCardDialog({ front: card.front, back: { assetId: back }, notebook: nb, source: { notebookId: nb.id, pageId: card.pageId } });
}

// ---------- IA sobre a seleção ----------
async function convertSelectionToText() {
  const v = views.get(selection.pageId), page = v.page;
  const items = selectedItems(page);
  const blob = await renderInkOnly(items.strokes);
  toast('Reconhecendo a escrita…');
  const text = await transcribeImage(blob);
  if (!text) return;
  const b = itemsBBox({ strokes: items.strokes, texts: [], images: [] });
  const lines = text.split('\n').length;
  const size = Math.max(10, Math.min(40, Math.round((b.h / Math.max(1, lines)) * 0.55)));
  const before = snapshot(page);
  const ids = new Set(items.strokes.map((s) => s.id));
  page.strokes = page.strokes.filter((s) => !ids.has(s.id));
  page.texts = [...page.texts, { id: uid(), x: b.x, y: b.y, w: Math.max(80, b.w), text, size, color: items.strokes[0]?.color || '#1f2a37', bold: false, h: lines * size * 1.3 }];
  clearSelection();
  commit(page, before);
  renderInk(v); renderDom(v);
  toast('Escrita convertida em texto', { action: 'Desfazer', onAction: undo });
}

async function renderInkOnly(strokes) {
  const b = itemsBBox({ strokes, texts: [], images: [] });
  const pad = 12, scale = 2.5;
  const c = document.createElement('canvas');
  c.width = Math.ceil((b.w + pad * 2) * scale); c.height = Math.ceil((b.h + pad * 2) * scale);
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, c.width, c.height);
  ctx.setTransform(scale, 0, 0, scale, -(b.x - pad) * scale, -(b.y - pad) * scale);
  drawStrokes(ctx, strokes.map((s) => ({ ...s, color: s.tool === 'highlighter' ? s.color : '#111' })));
  return new Promise((res) => c.toBlob(res, 'image/png'));
}

// ---------- Links ----------
async function linkDialog() {
  const v = views.get(selection.pageId);
  const b = selection.bbox;
  const notebooks = (await db.all('notebooks')).filter((n) => n.id !== nb.id && !n.trashedAt).sort((x, y) => x.title.localeCompare(y.title, 'pt-BR'));
  const target = await modal((box, close) => {
    let mode = 'page';
    const body = h('div');
    const tabs = h('div', { class: 'seg', style: { marginBottom: '14px' } });
    const draw = () => {
      tabs.replaceChildren(...[['page', 'Página deste caderno'], ['notebook', 'Outro caderno'], ['url', 'Site']].map(([k, label]) => {
        const bt = h('button', { class: mode === k ? 'active' : '' }, label);
        bt.addEventListener('click', () => { mode = k; draw(); });
        return bt;
      }));
      body.replaceChildren();
      if (mode === 'page') {
        const list = h('div', { class: 'nav link-list' });
        const outlineFor = new Map(nb.outline.map((o) => [o.pageId, o.title]));
        pages.forEach((p, i) => {
          const bt = h('button', { class: 'nav-item' }, `Página ${i + 1}`, outlineFor.has(p.id) ? h('span', { class: 'count' }, outlineFor.get(p.id)) : null);
          bt.addEventListener('click', () => close({ type: 'page', pageId: p.id }));
          list.append(bt);
        });
        body.append(list);
      } else if (mode === 'notebook') {
        const list = h('div', { class: 'nav link-list' });
        for (const n of notebooks) {
          const bt = h('button', { class: 'nav-item' }, h('span', { class: 'folder-dot', style: { background: n.cover?.color || '#2f6f8f' } }), n.title);
          bt.addEventListener('click', () => close({ type: 'notebook', notebookId: n.id }));
          list.append(bt);
        }
        if (!notebooks.length) list.append(h('p', {}, 'Você ainda não tem outros cadernos.'));
        body.append(list);
      } else {
        const inp = h('input', { class: 'input', placeholder: 'https://…', type: 'url' });
        const ok = () => {
          let u = inp.value.trim();
          if (!u) return;
          if (!/^https?:\/\//i.test(u)) u = 'https://' + u;
          try { new URL(u); close({ type: 'url', url: u }); } catch { inp.focus(); }
        };
        inp.addEventListener('keydown', (e) => { if (e.key === 'Enter') ok(); });
        body.append(h('div', { class: 'field' }, h('label', {}, 'Endereço'), inp), h('div', { class: 'actions' }, h('button', { class: 'btn primary', onclick: ok }, 'Criar link')));
        setTimeout(() => inp.focus(), 30);
      }
    };
    draw();
    box.append(h('h2', {}, 'Criar link'), tabs, body, h('div', { class: 'actions' }, h('button', { class: 'btn ghost', onclick: () => close() }, 'Cancelar')));
  });
  if (!target) return;
  const page = v.page;
  const before = snapshot(page);
  page.links = [...page.links, { id: uid(), x: b.x, y: b.y, w: b.w, h: b.h, target }];
  commit(page, before);
  clearSelection();
  renderLinks(v);
  toast('Link criado — toque no ícone 🔗 para seguir');
}

function followLink(l) {
  const t = l.target;
  if (t.type === 'url') window.open(t.url, '_blank', 'noopener,noreferrer');
  else if (t.type === 'page') {
    const i = pages.findIndex((p) => p.id === t.pageId);
    if (i >= 0) scrollToPage(i); else toast('A página do link foi excluída.');
  } else if (t.type === 'notebook') onOpenNotebookCb(t.notebookId);
}

async function removeLink(v, l) {
  if (!(await confirmDialog('Remover link?', 'O conteúdo continua na página; só o link é removido.', { ok: 'Remover' }))) return;
  const before = snapshot(v.page);
  v.page.links = v.page.links.filter((x) => x.id !== l.id);
  commit(v.page, before);
  renderLinks(v);
}

// ---------- Texto ----------
function startTextEdit(v, existing, x, y) {
  commitTextEdit();
  const t = existing || {
    id: uid(), x, y: y - settings.text.size * 0.65, w: Math.min(260, v.page.width - x - 12),
    text: '', size: settings.text.size, color: settings.text.color, bold: settings.text.bold,
    bg: settings.text.note ? settings.text.noteColor : undefined,
  };
  if (t.w < 60) { t.x = Math.max(8, v.page.width - 200); t.w = 190; }
  const ta = h('textarea', { class: 'text-editor', spellcheck: 'true' });
  styleTextEditor(ta, t);
  ta.value = t.text;
  editingText = { view: v, textarea: ta, original: existing, draft: { ...t }, before: snapshot(v.page) };
  v.el.append(ta);
  renderTexts(v);
  const grow = () => { ta.style.height = 'auto'; ta.style.height = ta.scrollHeight + 'px'; };
  ta.addEventListener('input', grow);
  ta.addEventListener('keydown', (e) => {
    e.stopPropagation();
    if (e.key === 'Escape') { e.preventDefault(); commitTextEdit(); }
  });
  ta.addEventListener('blur', () => setTimeout(() => { if (editingText?.textarea === ta) commitTextEdit(); }, 0));
  grow();
  setTimeout(() => ta.focus({ preventScroll: true }), 0);
}

function styleTextEditor(ta, t) {
  Object.assign(ta.style, {
    left: t.x * zoom + 'px', top: t.y * zoom + 'px', width: t.w * zoom + 'px',
    fontSize: t.size * zoom + 'px', color: t.color, fontWeight: t.bold ? 600 : 400, fontFamily: TEXT_FONT,
    background: t.bg || '',
  });
}

function applyTextStyleToEditor() {
  if (!editingText) return;
  const { textarea: ta, draft } = editingText;
  draft.size = settings.text.size; draft.color = settings.text.color; draft.bold = settings.text.bold;
  draft.bg = settings.text.note ? settings.text.noteColor : undefined;
  styleTextEditor(ta, draft);
  ta.style.height = 'auto'; ta.style.height = ta.scrollHeight + 'px';
  ta.focus();
}

function commitTextEdit() {
  if (!editingText) return;
  const { view: v, textarea: ta, original, draft, before } = editingText;
  editingText = null;
  const text = ta.value.replace(/\s+$/, '');
  const hgt = ta.scrollHeight / zoom;
  ta.remove();
  const page = v.page;
  if (!text) {
    if (original) { page.texts = page.texts.filter((t) => t.id !== original.id); commit(page, before); }
    renderTexts(v);
    return;
  }
  const updated = { ...draft, text, h: hgt };
  if (original) {
    if (original.text === text && original.size === updated.size && original.color === updated.color && original.bold === updated.bold && original.bg === updated.bg) { renderTexts(v); return; }
    page.texts = page.texts.map((t) => (t.id === original.id ? updated : t));
  } else page.texts = [...page.texts, updated];
  commit(page, before);
  renderTexts(v);
  growBoard(page);
}

// ---------- Imagens e figurinhas ----------
async function insertImageFlow(fileArg) {
  const file = fileArg || (await pickFile('file-image'));
  if (!file || !file.type.startsWith('image/')) return;
  await insertImageBlob(file);
}

async function insertImageBlob(blob, size) {
  const v = views.get(pages[currentIndex].id);
  const assetId = await saveAsset(blob);
  assetsSeen.add(assetId);
  const r = await loadImage(assetId);
  if (!r) return toast('Imagem inválida');
  const page = v.page;
  let w, hh;
  if (size) { w = size.w; hh = size.h; } else {
    const nw = r.img.naturalWidth || 400, nh = r.img.naturalHeight || 300;
    const scale = Math.min((page.width * 0.6) / nw, (page.height * 0.5) / nh, 1);
    w = nw * scale; hh = nh * scale;
    if (isBoard()) { w = Math.min(nw, 600); hh = nh * (w / nw); }
  }
  const c = visibleCenter(v);
  const img = { id: uid(), assetId, x: c.x - w / 2, y: c.y - hh / 2, w, h: hh };
  const before = snapshot(page);
  page.images = [...page.images, img];
  commit(page, before);
  renderImages(v);
  setTool('lasso');
  selection = { pageId: page.id, strokes: new Set(), texts: new Set(), images: new Set([img.id]) };
  updateSelectionBBox();
  drawSelectionOverlay();
}

function openStickers(anchor) {
  openStickerPanel(anchor, {
    onImage: ({ blob, w, h: hh }) => insertImageBlob(blob, { w, h: hh }),
    onElement: (el) => pasteAtCenter(structuredClone(el.items)),
  });
}

function onPaste(e) {
  if (!nb || $('editor').hidden) return;
  if (e.target.closest?.('input, textarea')) return;
  const file = [...(e.clipboardData?.files || [])].find((f) => f.type.startsWith('image/'));
  if (file) { e.preventDefault(); insertImageFlow(file); return; }
  if (pasteClipboard()) e.preventDefault();
}

// ---------- Quadro branco: cresce quando o conteúdo chega perto da borda ----------
function growBoard(page) {
  if (!isBoard()) return;
  const items = { strokes: page.strokes, texts: page.texts, images: page.images };
  if (!items.strokes.length && !items.texts.length && !items.images.length) return;
  const b = itemsBBox(items);
  let changed = false;
  if (b.x + b.w > page.width - 600) { page.width += 2000; changed = true; }
  if (b.y + b.h > page.height - 600) { page.height += 2000; changed = true; }
  if (changed) { markDirty(page); layout(); }
}

// ---------- Desfazer / refazer e salvamento ----------
function snapshot(page) {
  return { strokes: page.strokes.slice(), texts: page.texts.slice(), images: page.images.slice(), tapes: page.tapes.slice(), links: page.links.slice() };
}

function commit(page, before) {
  pushUndo({ type: 'content', pageId: page.id, before, after: snapshot(page) });
  if (before.strokes !== page.strokes && page.inkText) page.inkStale = true;
  markDirty(page);
}

function pushUndo(entry) {
  undoStack.push(entry);
  if (undoStack.length > 200) undoStack.shift();
  redoStack = [];
  updateUndoButtons();
}

function updateUndoButtons() {
  $('ed-undo').disabled = !undoStack.length;
  $('ed-redo').disabled = !redoStack.length;
}

function applyContent(page, snap) {
  page.strokes = snap.strokes.slice();
  page.texts = snap.texts.slice();
  page.images = snap.images.slice();
  page.tapes = (snap.tapes || []).slice();
  page.links = (snap.links || []).slice();
  markDirty(page);
  const v = viewOf(page);
  if (v?.active) { renderInk(v); renderDom(v); renderTapes(v); }
}

async function applyEntry(entry, dir) {
  clearSelection();
  commitTextEdit();
  if (entry.type === 'content') {
    const page = pageById(entry.pageId);
    if (page) applyContent(page, dir === 'undo' ? entry.before : entry.after);
    const i = pages.indexOf(page);
    if (i >= 0 && i !== currentIndex && !isBoard()) scrollToPage(i);
  } else if (entry.type === 'pages') {
    await applyPageOrder(dir === 'undo' ? entry.before : entry.after, entry.pool);
  } else if (entry.type === 'props') {
    const page = pageById(entry.pageId);
    if (page) { Object.assign(page, dir === 'undo' ? entry.before : entry.after); markDirty(page); const v = viewOf(page); computeFit(); layout(); if (v?.active) renderView(v, { force: true }); }
  }
}

async function undo() {
  if (action) return;
  const e = undoStack.pop();
  if (!e) return;
  redoStack.push(e);
  await applyEntry(e, 'undo');
  updateUndoButtons();
}

async function redo() {
  if (action) return;
  const e = redoStack.pop();
  if (!e) return;
  undoStack.push(e);
  await applyEntry(e, 'redo');
  updateUndoButtons();
}

// cada alteração numa página soma 1; a gravação só tira da lista as páginas que não mudaram
// enquanto eram gravadas
const editVersion = new WeakMap();

function markDirty(page) {
  dirty.add(page);
  editVersion.set(page, (editVersion.get(page) || 0) + 1);
  clearTimeout(saveTimer);
  saveTimer = setTimeout(autoSave, 600);
}

// Gravações em fila (uma de cada vez). Uma página só sai da lista de "não salvas" depois que a
// gravação termina; se falhar (espaço cheio, transação abortada), volta para a lista, o aluno vê
// um aviso que fica na tela e uma nova tentativa é feita. Nunca há falso "salvo".
let saveChain = Promise.resolve();
let saveErrorToast = null;
let saveFailed = false;
let saveRetryTimer = null;

function flushSave() {
  clearTimeout(saveTimer);
  const run = saveChain.then(doFlush);
  saveChain = run.catch(() => {});
  return run;
}

async function doFlush() {
  if (!nb || !dirty.size) return;
  const list = [...dirty];
  const versions = new Map(list.map((p) => [p, editVersion.get(p) || 0]));
  try {
    await db.putMany('pages', list.filter((p) => nb.pageIds.includes(p.id)));
    await saveNotebook();
  } catch (err) {
    // mantém as páginas como não salvas (ainda em memória) e avisa sem sumir sozinho
    saveFailed = true;
    if (!saveErrorToast?.isConnected) {
      saveErrorToast = toast('Não foi possível salvar as últimas alterações. Elas continuam abertas aqui; libere espaço e toque em Tentar de novo.', {
        action: 'Tentar de novo', onAction: () => autoSave(), duration: 0,
      });
    }
    clearTimeout(saveRetryTimer);
    saveRetryTimer = setTimeout(autoSave, 15000);
    throw err;
  }
  // só remove o que foi gravado; o que mudou durante a gravação continua na lista
  for (const p of list) if ((editVersion.get(p) || 0) === versions.get(p)) dirty.delete(p);
  if (saveFailed) { saveErrorToast?.remove(); toast('Alterações salvas.'); }
  saveFailed = false;
  saveErrorToast = null;
  clearTimeout(saveRetryTimer);
  list.forEach(refreshThumb);
}

function autoSave() {
  flushSave().catch((err) => console.warn('[Acervo] salvamento falhou', err));
}

async function saveNotebook() {
  nb.updatedAt = Date.now();
  await db.put('notebooks', nb);
}

// ---------- Operações com páginas ----------
async function pageOp(newIds, extraPages = []) {
  await flushSave();
  const pool = new Map(pages.map((p) => [p.id, p]));
  extraPages.forEach((p) => pool.set(p.id, p));
  pushUndo({ type: 'pages', before: nb.pageIds.slice(), after: newIds.slice(), pool });
  await applyPageOrder(newIds, pool);
}

async function applyPageOrder(ids, pool) {
  const current = new Set(nb.pageIds);
  const next = new Set(ids);
  // Página que sai do caderno vai para a lixeira de páginas (guarda posição e data); nada é apagado.
  nb.trashedPages ||= [];
  const oldOrder = nb.pageIds.slice();
  for (const id of current) {
    if (next.has(id)) continue;
    const p = pool.get(id) || pageById(id);
    if (!p) continue;
    p.trashedAt = Date.now();
    await db.put('pages', p);
    nb.trashedPages = [...nb.trashedPages.filter((t) => t.id !== id), { id, index: oldOrder.indexOf(id), at: p.trashedAt }];
  }
  for (const id of ids) {
    if (current.has(id)) continue;
    const p = pool.get(id);
    if (p?.trashedAt) delete p.trashedAt;
    nb.trashedPages = nb.trashedPages.filter((t) => t.id !== id);
    await db.put('pages', p);
  }
  nb.pageIds = ids.slice();
  pages = ids.map((id) => pool.get(id) || pageById(id)).filter(Boolean);
  for (const p of pages) { p.tapes ||= []; p.links ||= []; }
  await saveNotebook();
  clearSelection();
  computeFit();
  buildViews();
  currentIndex = Math.min(currentIndex, pages.length - 1);
  if (!$('thumbs').hidden) renderThumbs();
  updatePageUi();
}

function pageLike(ref) {
  const d = nb.defaults || {};
  const size = PAGE_SIZES[d.size] || PAGE_SIZES.a4;
  if (ref && !ref.pdf) return { width: ref.width, height: ref.height, template: ref.template, paper: ref.paper, spacing: ref.spacing, bgAsset: ref.bgAsset, date: ref.date };
  return { width: ref?.width || size.w, height: ref?.height || size.h, template: d.template || 'lined', paper: d.paper || 'white', spacing: d.spacing };
}

async function addPage(at, props) {
  const ref = pages[Math.max(0, Math.min(at - 1, pages.length - 1))];
  const like = props || pageLike(ref);
  // planner mensal: a página nova já vem no mês seguinte
  if (!props && like.template === 'monthly') {
    const d = like.date ? new Date(like.date) : new Date();
    like.date = new Date(d.getFullYear(), d.getMonth() + 1, 1).toISOString();
  }
  const p = newPage(nb.id, like);
  const ids = nb.pageIds.slice();
  ids.splice(at, 0, p.id);
  await pageOp(ids, [p]);
  requestAnimationFrame(() => scrollToPage(at));
  return p;
}

async function duplicatePage(i) {
  const src = pages[i];
  const copy = { ...structuredClone(src), id: uid(), bookmarked: false };
  const ids = nb.pageIds.slice();
  ids.splice(i + 1, 0, copy.id);
  await pageOp(ids, [copy]);
  requestAnimationFrame(() => scrollToPage(i + 1));
}

async function deletePage(i) {
  if (pages.length <= 1) {
    clearPage(0);
    toast('O caderno precisa de pelo menos uma página. As anotações foram limpas.');
    return;
  }
  const ids = nb.pageIds.filter((id) => id !== pages[i].id);
  await pageOp(ids);
  toast('Página enviada para a lixeira de páginas', { action: 'Desfazer', onAction: undo });
}

// ---------- Lixeira de páginas ----------
const PAGE_TRASH_DAYS = 30;
async function purgeOldTrashedPages() {
  const limite = Date.now() - PAGE_TRASH_DAYS * 864e5;
  const velhas = (nb.trashedPages || []).filter((t) => t.at < limite);
  for (const t of velhas) await purgeTrashedPage(t.id, { silent: true });
}

async function purgeTrashedPage(id, { silent = false } = {}) {
  const p = await db.get('pages', id);
  nb.trashedPages = (nb.trashedPages || []).filter((t) => t.id !== id);
  if (p && p.trashedAt && !nb.pageIds.includes(id)) {
    const assets = new Set([p.pdf?.assetId, p.bgAsset, ...(p.images || []).map((im) => im.assetId)].filter(Boolean));
    await db.delete('pages', id);
    await collectGarbage(assets);
  }
  await saveNotebook();
  if (!silent) toast('Página excluída definitivamente');
}

async function restoreTrashedPage(t) {
  const p = await db.get('pages', t.id);
  if (!p) { nb.trashedPages = nb.trashedPages.filter((x) => x.id !== t.id); await saveNotebook(); return; }
  await flushSave();
  const ids = nb.pageIds.slice();
  ids.splice(Math.min(Math.max(0, t.index), ids.length), 0, t.id);
  const pool = new Map(pages.map((x) => [x.id, x]));
  pool.set(p.id, p);
  pushUndo({ type: 'pages', before: nb.pageIds.slice(), after: ids.slice(), pool });
  await applyPageOrder(ids, pool);
  scrollToPage(ids.indexOf(t.id));
  toast('Página restaurada');
}

async function pageTrashDialog() {
  await flushSave();
  const list = (nb.trashedPages || []).slice().sort((a, b) => b.at - a.at);
  await modal((box, close) => {
    box.append(h('h2', {}, 'Lixeira de páginas'));
    if (!list.length) {
      box.append(h('p', {}, `Nenhuma página excluída. Páginas excluídas ficam aqui por ${PAGE_TRASH_DAYS} dias.`));
    } else {
      box.append(h('p', {}, `Páginas excluídas ficam aqui por ${PAGE_TRASH_DAYS} dias e depois são apagadas de vez.`));
      const grid = h('div', { class: 'page-trash-grid' });
      for (const t of list) {
        const canvas = h('canvas', { style: { width: '100%', display: 'block' } });
        db.get('pages', t.id).then((p) => { if (p) renderPageFlat(p, canvas, 150); });
        const quando = new Date(t.at).toLocaleDateString('pt-BR');
        grid.append(h('div', { class: 'page-trash-item' }, h('div', { class: 'page-trash-thumb' }, canvas),
          h('small', {}, `Era a página ${t.index + 1} · ${quando}`),
          h('div', { class: 'row' },
            h('button', { class: 'btn small', onclick: () => { close(); restoreTrashedPage(t); } }, 'Restaurar'),
            h('button', { class: 'btn small danger', onclick: async () => {
              if (!(await confirmDialog('Excluir página definitivamente?', 'Isso não pode ser desfeito.', { ok: 'Excluir', danger: true }))) return;
              close(); await purgeTrashedPage(t.id);
            } }, 'Excluir'))));
      }
      box.append(grid);
    }
    box.append(h('div', { class: 'actions' }, h('button', { class: 'btn ghost', onclick: () => close() }, 'Fechar')));
  });
}

async function movePage(i, to) {
  if (to < 0 || to >= pages.length || to === i) return;
  const ids = nb.pageIds.slice();
  const [id] = ids.splice(i, 1);
  ids.splice(to, 0, id);
  await pageOp(ids);
  requestAnimationFrame(() => scrollToPage(to));
}

function clearPage(i) {
  const p = pages[i];
  const before = snapshot(p);
  p.strokes = []; p.texts = []; p.images = []; p.tapes = []; p.links = [];
  commit(p, before);
  const v = viewOf(p);
  if (v?.active) { renderInk(v); renderDom(v); renderTapes(v); }
}

async function pageTemplateDialog(i) {
  const page = pages[i];
  const sizeKey = Object.entries(PAGE_SIZES).find(([, s]) => s.w === page.width && s.h === page.height)?.[0] || 'a4';
  const cfg = { template: page.template || 'blank', paper: page.paper || 'white', size: sizeKey, spacing: page.spacing || 1, custom: page.customTemplate || null };
  const isPdfPage = page.pdf && !page.customTemplate;
  const res = await modal((box, close) => {
    box.classList.add('wide-modal');
    box.append(h('h2', {}, isBoard() ? 'Fundo do quadro' : 'Modelo da página'),
      isPdfPage ? h('p', {}, 'Esta página vem de um PDF: só a cor do papel aparece nas margens transparentes.') : null,
      pageSetupFields(cfg, { showSize: !isPdfPage && !isBoard(), showCustom: !isPdfPage }),
      h('div', { class: 'actions' },
        h('button', { class: 'btn ghost', onclick: () => close() }, 'Cancelar'),
        isBoard() ? null : h('button', { class: 'btn', onclick: () => close('all') }, 'Aplicar a todas'),
        h('button', { class: 'btn primary', onclick: () => close('one') }, 'Aplicar')));
  });
  if (!res) return;
  const targets = res === 'all' ? pages.filter((p) => !p.pdf || p.customTemplate || p === page) : [page];
  for (const p of targets) {
    const keys = ['template', 'paper', 'spacing', 'width', 'height', 'bgAsset', 'pdf', 'customTemplate'];
    const before = Object.fromEntries(keys.map((k) => [k, p[k]]));
    const isPdf = p.pdf && !p.customTemplate;
    await applyPageSetup(p, cfg, { keepSize: isPdf || isBoard(), keepPdf: isPdf });
    const after = Object.fromEntries(keys.map((k) => [k, p[k]]));
    pushUndo({ type: 'props', pageId: p.id, before, after });
    if (p.bgAsset) assetsSeen.add(p.bgAsset);
    markDirty(p);
  }
  if (res === 'all') { nb.defaults = { ...nb.defaults, template: cfg.template, paper: cfg.paper, size: cfg.size, spacing: cfg.spacing }; saveNotebook(); }
  computeFit();
  layout();
  for (const p of targets) { const v = viewOf(p); if (v?.active) renderView(v, { force: true }); }
}

async function insertPdfPages(at) {
  const file = await pickFile('file-pdf');
  if (!file) return;
  const prog = progressDialog('Inserindo PDF');
  try {
    const newPages = await importPdf(file, nb.id, (f, t) => prog.set(f, t));
    newPages.forEach((p) => assetsSeen.add(p.pdf.assetId));
    const ids = nb.pageIds.slice();
    ids.splice(at, 0, ...newPages.map((p) => p.id));
    nb.outline = [...nb.outline, ...(await outlineForPages(newPages))];
    prog.close();
    await pageOp(ids, newPages);
    requestAnimationFrame(() => scrollToPage(at));
  } catch (e) {
    console.error(e);
    prog.close();
    toast('Não foi possível ler este PDF.');
  }
}

// Página nova com texto (usada pelo assistente para inserir resumos).
async function insertTextPage(title, text) {
  const ref = pages[currentIndex];
  const like = pageLike(ref);
  const p = await addPage(currentIndex + 1, { ...like, template: 'blank', bgAsset: undefined });
  const margin = 48;
  p.texts = [
    { id: uid(), x: margin, y: margin, w: p.width - margin * 2, text: title, size: 22, color: '#1f2a37', bold: true, h: 30 },
    { id: uid(), x: margin, y: margin + 44, w: p.width - margin * 2, text, size: 12, color: '#1f2a37', bold: false },
  ];
  markDirty(p);
  const v = viewOf(p);
  if (v?.active) renderDom(v);
  toast('Página inserida');
}

function toggleBookmark() {
  const p = pages[currentIndex];
  p.bookmarked = !p.bookmarked;
  markDirty(p);
  updatePageUi();
  refreshThumb(p);
  toast(p.bookmarked ? `Página ${currentIndex + 1} marcada` : 'Marcador removido');
}

function pageMenuItems(i) {
  return [
    { label: 'Inserir página antes', icon: 'page', onClick: () => addPage(i) },
    { label: 'Inserir página depois', icon: 'page', onClick: () => addPage(i + 1) },
    { label: 'Inserir PDF depois…', icon: 'pdf', onClick: () => insertPdfPages(i + 1) },
    { label: 'Duplicar página', icon: 'copy', onClick: () => duplicatePage(i) },
    i > 0 ? { label: 'Mover para cima', icon: 'up', onClick: () => movePage(i, i - 1) } : null,
    i < pages.length - 1 ? { label: 'Mover para baixo', icon: 'down', onClick: () => movePage(i, i + 1) } : null,
    { label: 'Modelo e papel…', icon: 'template', onClick: () => pageTemplateDialog(i) },
    { label: 'Adicionar ao sumário…', icon: '<path d="M4 6h16M4 12h10M4 18h7"/>', onClick: () => addOutlineEntry(i) },
    { label: pages[i].bookmarked ? 'Remover marcador' : 'Marcar página', icon: '<path d="M7 4h10v16l-5-4-5 4z"/>', onClick: () => { currentIndex = i; toggleBookmark(); } },
    'sep',
    { label: 'Limpar anotações', icon: 'clear', onClick: async () => {
      if (await confirmDialog('Limpar anotações?', 'Traços, textos, imagens e fitas desta página serão removidos. Você pode desfazer.', { ok: 'Limpar' })) clearPage(i);
    } },
    { label: 'Excluir página', icon: 'trash', danger: true, onClick: () => deletePage(i) },
  ];
}

function moreMenu() {
  const btn = $('ed-more');
  showMenu(btn, [
    { label: 'Exportar como PDF', icon: 'pdf', onClick: async () => { await flushSave(); exportPdfFlow(nb); } },
    isBoard() ? null : { label: 'Apresentar', icon: '<rect x="3" y="4" width="18" height="12" rx="1"/><path d="M12 16v4M8 20h8"/>', onClick: enterPresentation },
    isBoard() ? null : { label: 'Inserir PDF…', icon: 'pdf', onClick: () => insertPdfPages(currentIndex + 1) },
    { label: 'Inserir imagem…', icon: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M21 16l-5-5-8 8"/>', onClick: () => insertImageFlow() },
    nb.recordings.length ? { label: 'Gravações…', icon: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0"/>', onClick: () => openPlayer(nb.recordings[nb.recordings.length - 1]) } : null,
    'sep',
    isBoard() ? { label: 'Fundo do quadro…', icon: 'template', onClick: () => pageTemplateDialog(0) }
      : { label: `Página ${currentIndex + 1}…`, icon: 'page', onClick: () => showMenu(btn, pageMenuItems(currentIndex), { align: 'right' }) },
    isBoard() ? null : { label: `Lixeira de páginas${(nb.trashedPages || []).length ? ' (' + nb.trashedPages.length + ')' : ''}`, icon: 'trash', onClick: pageTrashDialog },
    'sep',
    { label: 'Desenhar só com a caneta', icon: 'pen', checked: settings.penOnly, onClick: () => {
      settings.penOnly = !settings.penOnly; saveSettings();
      toast(settings.penOnly ? 'Dedos agora só rolam e dão zoom; a caneta escreve.' : 'Dedos também escrevem. Use dois dedos para rolar.');
    } },
    { label: 'Formas perfeitas ao segurar', icon: '<circle cx="12" cy="12" r="8"/>', checked: settings.straighten, onClick: () => { settings.straighten = !settings.straighten; saveSettings(); } },
    { label: 'Rabiscar para apagar', icon: '<path d="M4 16l4-6 4 6 4-6 4 6"/>', checked: settings.scribbleErase, onClick: () => { settings.scribbleErase = !settings.scribbleErase; saveSettings(); } },
    { label: 'Atalhos e gestos', icon: '<circle cx="12" cy="12" r="9"/><path d="M12 16v-1m0-3a2 2 0 1 0-2-2"/>', onClick: helpDialog },
  ], { align: 'right' });
}

function helpDialog() {
  modal((box, close) => {
    const rows = [
      ['P / H / E / L / T / F / K', 'Caneta, marca-texto, borracha, laço, texto, fita, laser'],
      ['Espaço (segurar)', 'Mover a página com qualquer ferramenta'],
      ['Ctrl+Z / Ctrl+Y', 'Desfazer / refazer'],
      ['Ctrl+C / Ctrl+V / Ctrl+D', 'Copiar, colar, duplicar seleção (cole imagens também)'],
      ['Delete', 'Excluir seleção'],
      ['Ctrl + roda / pinça', 'Zoom'],
      ['Ctrl+F', 'Buscar no caderno'],
      ['Toque com 2 dedos', 'Desfazer'],
      ['Segurar no fim do traço', 'Vira linha, seta, círculo, retângulo ou triângulo'],
      ['Rabiscar por cima', 'Apaga o que foi rabiscado'],
      ['Toque na fita', 'Revela ou esconde a resposta'],
      ['Botão da caneta', 'Borracha (canetas compatíveis)'],
      ['Duplo toque na seleção', 'Editar o texto selecionado'],
      ['Alça redonda no topo da seleção', 'Girar (imã a cada 15°)'],
    ];
    box.append(h('h2', {}, 'Atalhos e gestos'),
      h('div', { style: { display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '8px 18px', marginBottom: '16px' } },
        ...rows.flatMap(([k, d]) => [h('b', {}, k), h('span', { style: { color: 'var(--ink-2)' } }, d)])),
      h('div', { class: 'actions' }, h('button', { class: 'btn primary', onclick: () => close() }, 'Entendi')));
  });
}

// ---------- Painel lateral: miniaturas e sumário ----------
let thumbObserver = null;
function toggleThumbs() {
  const t = $('thumbs');
  t.hidden = !t.hidden;
  $('ed-pages').classList.toggle('active', !t.hidden);
  if (!t.hidden) renderThumbs();
  computeFit();
  layout();
}

function renderThumbs() {
  const box = $('thumbs');
  thumbObserver?.disconnect();
  box.replaceChildren();
  const tabs = h('div', { class: 'seg thumbs-tabs' });
  for (const [k, label] of [['pages', 'Páginas'], ['outline', 'Sumário']]) {
    const b = h('button', { class: thumbsTab === k ? 'active' : '' }, label);
    b.addEventListener('click', () => { thumbsTab = k; renderThumbs(); });
    tabs.append(b);
  }
  box.append(tabs);
  if (thumbsTab === 'outline') return renderOutline(box);
  thumbObserver = new IntersectionObserver((entries) => {
    for (const en of entries) if (en.isIntersecting && !en.target.dataset.drawn) {
      en.target.dataset.drawn = '1';
      const p = pageById(en.target.dataset.id);
      if (p) renderPageFlat(p, en.target.querySelector('canvas'), 140);
    }
  }, { root: box, rootMargin: '300px' });
  pages.forEach((p, i) => {
    const c = h('canvas');
    c.style.aspectRatio = `${p.width} / ${p.height}`;
    const item = h('div', { class: 'thumb-item' + (i === currentIndex ? ' current' : ''), 'data-id': p.id, draggable: 'true' }, c,
      h('div', { class: 'num' }, p.bookmarked ? icon('<path d="M7 4h10v16l-5-4-5 4z"/>') : null, String(i + 1)));
    item.addEventListener('click', () => scrollToPage(pages.indexOf(p)));
    item.addEventListener('contextmenu', (e) => { e.preventDefault(); showMenu({ getBoundingClientRect: () => ({ left: e.clientX, right: e.clientX, top: e.clientY, bottom: e.clientY }) }, pageMenuItems(pages.indexOf(p))); });
    let press;
    item.addEventListener('pointerdown', (e) => { if (e.pointerType !== 'mouse') press = setTimeout(() => showMenu(item, pageMenuItems(pages.indexOf(p))), 550); });
    item.addEventListener('pointerup', () => clearTimeout(press));
    item.addEventListener('pointermove', () => clearTimeout(press));
    item.addEventListener('dragstart', (e) => { e.dataTransfer.setData('text/acervo-page', p.id); e.dataTransfer.effectAllowed = 'move'; });
    item.addEventListener('dragover', (e) => { e.preventDefault(); item.classList.add('drag-over'); });
    item.addEventListener('dragleave', () => item.classList.remove('drag-over'));
    item.addEventListener('drop', (e) => {
      e.preventDefault();
      item.classList.remove('drag-over');
      const id = e.dataTransfer.getData('text/acervo-page');
      const from = pages.findIndex((x) => x.id === id);
      let to = pages.indexOf(p);
      if (from < 0 || from === to) return;
      if (from < to) to -= 1;
      movePage(from, to);
    });
    box.append(item);
    thumbObserver.observe(item);
  });
  box.append(h('button', { class: 'btn', style: { justifyContent: 'center' }, onclick: () => addPage(pages.length) }, '+ Página'));
}

function renderOutline(box) {
  const list = h('div', { class: 'outline' });
  const entries = nb.outline.filter((o) => pages.some((p) => p.id === o.pageId));
  if (!entries.length) {
    list.append(h('p', { class: 'muted small' }, 'Sem sumário ainda. Adicione a página atual abaixo. PDFs com índice ganham sumário automático.'));
  }
  for (const o of entries) {
    const i = pages.findIndex((p) => p.id === o.pageId);
    const row = h('div', { class: 'outline-row', style: { paddingLeft: 6 + (o.level || 0) * 12 + 'px' } },
      h('span', { class: 'o-title' }, o.title), h('span', { class: 'o-page' }, String(i + 1)));
    row.addEventListener('click', () => scrollToPage(i));
    row.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      showMenu({ getBoundingClientRect: () => ({ left: e.clientX, right: e.clientX, top: e.clientY, bottom: e.clientY }) }, [
        { label: 'Renomear', icon: 'edit', onClick: async () => { const t = await promptDialog('Renomear item', { value: o.title }); if (t) { o.title = t; await saveNotebook(); renderThumbs(); } } },
        { label: 'Excluir do sumário', icon: 'trash', danger: true, onClick: async () => { nb.outline = nb.outline.filter((x) => x !== o); await saveNotebook(); renderThumbs(); } },
      ]);
    });
    list.append(row);
  }
  box.append(list, h('button', { class: 'btn', style: { justifyContent: 'center' }, onclick: () => addOutlineEntry(currentIndex) }, '+ Página atual'),
    entries.length ? h('p', { class: 'muted small' }, 'Botão direito em um item para renomear ou excluir.') : null);
}

async function addOutlineEntry(i) {
  const title = await promptDialog('Adicionar ao sumário', { label: 'Título', value: `Página ${i + 1}`, ok: 'Adicionar' });
  if (!title) return;
  nb.outline = [...nb.outline, { id: uid(), title, pageId: pages[i].id, level: 0 }]
    .sort((a, b) => pages.findIndex((p) => p.id === a.pageId) - pages.findIndex((p) => p.id === b.pageId));
  await saveNotebook();
  thumbsTab = 'outline';
  if ($('thumbs').hidden) toggleThumbs(); else renderThumbs();
}

const thumbTimers = new Map();
function refreshThumb(p) {
  if ($('thumbs').hidden || thumbsTab !== 'pages') return;
  clearTimeout(thumbTimers.get(p.id));
  thumbTimers.set(p.id, setTimeout(() => {
    const item = document.querySelector(`.thumb-item[data-id="${p.id}"]`);
    if (!item) return;
    renderPageFlat(p, item.querySelector('canvas'), 140);
    const num = item.querySelector('.num');
    num.replaceChildren(...[p.bookmarked ? icon('<path d="M7 4h10v16l-5-4-5 4z"/>') : null, String(pages.indexOf(p) + 1)].filter(Boolean));
  }, 300));
}

// ---------- Áudio ----------
async function toggleRecording() {
  if (isRecording()) { await finishRecording(); return; }
  try {
    await startRecording();
  } catch {
    toast('Não foi possível usar o microfone. Verifique a permissão do navegador.', { duration: 5000 });
    return;
  }
  stopPlayer();
  $('ed-record').classList.add('recording');
  const tick = () => {
    if (!isRecording()) { $('rec-time').textContent = ''; return; }
    $('rec-time').textContent = formatTime(recordingTime());
    setTimeout(tick, 500);
  };
  tick();
  toast('Gravando — o que você escrever fica sincronizado com o áudio.');
}

async function finishRecording() {
  const rec = await stopRecording();
  $('ed-record').classList.remove('recording');
  $('rec-time').textContent = '';
  if (!rec || !nb) return;
  assetsSeen.add(rec.assetId);
  const d = new Date(rec.startedAt);
  rec.title = `Gravação de ${d.toLocaleDateString('pt-BR')} ${d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;
  nb.recordings = [...nb.recordings, rec];
  await saveNotebook();
  toast('Gravação salva', { action: 'Ouvir', onAction: () => openPlayer(rec) });
  renderPlayer();
}

async function openPlayer(rec) {
  stopPlayer();
  const audio = await createPlayer(rec);
  if (!audio) { toast('Áudio não encontrado'); return; }
  player = { rec, audio, tapSeek: true, timer: 0 };
  audio.addEventListener('play', () => { loopPlayer(); updatePlayerUi(); });
  audio.addEventListener('pause', () => { updatePlayerUi(); refreshAudioInk(); });
  audio.addEventListener('ended', () => { updatePlayerUi(); refreshAudioInk(); });
  audio.addEventListener('loadedmetadata', updatePlayerUi);
  renderPlayer();
  refreshAudioInk();
}

function stopPlayer() {
  if (!player) return;
  player.audio.pause();
  URL.revokeObjectURL(player.audio.src);
  clearTimeout(player.timer);
  player = null;
  renderPlayer();
  refreshAudioInk();
}

function loopPlayer() {
  if (!player || player.audio.paused) return;
  refreshAudioInk();
  updatePlayerUi();
  player.timer = setTimeout(loopPlayer, 200);
}

function refreshAudioInk() {
  for (const v of views.values()) if (v.active && v.page.strokes.some((s) => s.rec)) renderInk(v);
}

function renderPlayer() {
  const el = $('player');
  if (!el) return;
  el.replaceChildren();
  if (!player) { el.hidden = true; return; }
  el.hidden = false;
  const select = h('select', { class: 'select small-select' }, ...nb.recordings.map((r) => h('option', { value: r.id, selected: r.id === player.rec.id ? 'selected' : null }, r.title)));
  select.addEventListener('change', () => openPlayer(nb.recordings.find((r) => r.id === select.value)));
  const play = h('button', { class: 'icon-btn', id: 'pl-play', 'aria-label': 'Tocar' });
  play.addEventListener('click', () => (player.audio.paused ? player.audio.play() : player.audio.pause()));
  const range = h('input', { type: 'range', min: 0, max: 1000, value: 0, id: 'pl-range', class: 'pl-range' });
  range.addEventListener('input', () => {
    const d = player.audio.duration || player.rec.duration / 1000;
    player.audio.currentTime = (range.value / 1000) * d;
    refreshAudioInk(); updatePlayerUi();
  });
  const time = h('span', { class: 'pl-time', id: 'pl-time' });
  const tap = toggleChip('Toque no traço', player.tapSeek, () => { player.tapSeek = !player.tapSeek; renderPlayer(); });
  tap.title = 'Tocar em algo que você escreveu pula o áudio para aquele momento';
  const del = h('button', { class: 'icon-btn small', title: 'Excluir gravação', 'aria-label': 'Excluir gravação' }, icon('<path d="M5 7h14M10 11v6M14 11v6M7 7l1 13h8l1-13M9 7V4h6v3"/>'));
  del.addEventListener('click', async () => {
    if (!(await confirmDialog('Excluir gravação?', 'O áudio será apagado. Seus traços continuam no caderno.', { ok: 'Excluir' }))) return;
    const r = player.rec;
    nb.recordings = nb.recordings.filter((x) => x.id !== r.id);
    for (const p of pages) if (p.strokes.some((s) => s.rec === r.id)) { p.strokes = p.strokes.map((s) => (s.rec === r.id ? { ...s, rec: undefined, t: undefined } : s)); markDirty(p); }
    await saveNotebook();
    stopPlayer();
  });
  const close = h('button', { class: 'icon-btn small', 'aria-label': 'Fechar' }, icon('<path d="M6 6l12 12M18 6L6 18"/>'));
  close.addEventListener('click', stopPlayer);
  el.append(play, select, range, time, tap, del, close);
  updatePlayerUi();
}

function updatePlayerUi() {
  if (!player) return;
  const a = player.audio;
  const d = Number.isFinite(a.duration) ? a.duration : player.rec.duration / 1000;
  const play = $('pl-play');
  if (play) play.replaceChildren(icon(a.paused ? '<path d="M7 5l12 7-12 7z"/>' : '<path d="M7 5h4v14H7zM13 5h4v14h-4z"/>'));
  const range = $('pl-range');
  if (range) range.value = d ? Math.round((a.currentTime / d) * 1000) : 0;
  const time = $('pl-time');
  if (time) time.textContent = `${formatTime(a.currentTime * 1000)} / ${formatTime(d * 1000)}`;
}

// ---------- Apresentação ----------
function enterPresentation() {
  presenting = { prevZoom: zoom, prevTool: tool, thumbs: !$('thumbs').hidden };
  $('thumbs').hidden = true;
  $('editor').classList.add('presenting');
  $('present-bar').hidden = false;
  document.documentElement.requestFullscreen?.().catch(() => {});
  setTool('laser');
  setTimeout(() => { fitPresentation(); }, 150);
}

function fitPresentation() {
  const sc = $('scroller');
  const page = pages[currentIndex];
  zoom = Math.min((sc.clientHeight - 24) / page.height, (sc.clientWidth - 24) / page.width);
  layout();
  scrollToPage(currentIndex, false);
}

function presentStep(d) {
  const i = Math.max(0, Math.min(pages.length - 1, currentIndex + d));
  scrollToPage(i);
}

function exitPresentation() {
  if (!presenting) return;
  const p = presenting;
  presenting = null;
  $('editor').classList.remove('presenting');
  $('present-bar').hidden = true;
  if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {});
  if (p.thumbs) $('thumbs').hidden = false;
  zoom = p.prevZoom;
  setTool(p.prevTool);
  computeFit();
  layout();
  scrollToPage(currentIndex, false);
}

// ---------- Busca no caderno ----------
function openFind(q = '', startAt) {
  $('find-bar').hidden = false;
  const inp = $('find-input');
  if (q) inp.value = q;
  inp.focus();
  inp.select();
  runFind(inp.value, startAt);
}

function closeFind() {
  $('find-bar').hidden = true;
  find = { query: '', hits: [], idx: -1 };
  for (const v of views.values()) if (v.active) { renderTexts(v); renderHighlights(v); }
}

function runFind(q, startAt) {
  find.query = q.trim();
  const nq = normalize(find.query);
  find.hits = [];
  if (nq) pages.forEach((p, i) => {
    if (normalize(p.pdfText).includes(nq) || normalize(p.inkText).includes(nq) || p.texts.some((t) => normalize(t.text).includes(nq))) find.hits.push(i);
  });
  for (const v of views.values()) if (v.active) { renderTexts(v); renderHighlights(v); }
  if (!find.hits.length) { find.idx = -1; $('find-count').textContent = nq ? '0' : ''; return; }
  const from = startAt ?? currentIndex;
  find.idx = Math.max(0, find.hits.findIndex((i) => i >= from));
  goToHit();
}

function stepFind(d) {
  if (!find.hits.length) return;
  find.idx = (find.idx + d + find.hits.length) % find.hits.length;
  goToHit();
}

function goToHit() {
  const i = find.hits[find.idx];
  $('find-count').textContent = `${find.idx + 1}/${find.hits.length}`;
  scrollToPage(i);
  const v = views.get(pages[i].id);
  v.el.classList.add('page-hit');
  setTimeout(() => v.el.classList.remove('page-hit'), 900);
}

// ---------- IA ----------
function aiContext() {
  return {
    nb: () => nb,
    pages: () => pages,
    currentIndex: () => currentIndex,
    insertTextPage,
    onPagesChanged: async (p) => { p.inkStale = false; markDirty(p); await flushSave(); },
  };
}

// ---------- Teclado ----------
function onKeyDown(e) {
  if (!nb || $('editor').hidden || document.querySelector('.modal-backdrop')) return;
  if (e.target.closest?.('input, textarea, select, [contenteditable]')) return;
  const mod = e.ctrlKey || e.metaKey;
  const k = e.key.toLowerCase();
  if (presenting) {
    if (['arrowright', 'arrowdown', 'pagedown', ' '].includes(k)) { e.preventDefault(); presentStep(1); return; }
    if (['arrowleft', 'arrowup', 'pageup'].includes(k)) { e.preventDefault(); presentStep(-1); return; }
    if (k === 'escape') { exitPresentation(); return; }
  }
  if (mod && k === 'z') { e.preventDefault(); e.shiftKey ? redo() : undo(); return; }
  if (mod && k === 'y') { e.preventDefault(); redo(); return; }
  if (mod && k === 'f') { e.preventDefault(); openFind(); return; }
  if (mod && k === 'c') { if (selection) { e.preventDefault(); copySelection(); } return; }
  if (mod && k === 'x') { if (selection) { e.preventDefault(); copySelection(); deleteSelection(); } return; }
  if (mod && k === 'd') { e.preventDefault(); duplicateSelection(); return; }
  if (mod && (k === '=' || k === '+')) { e.preventDefault(); setZoom(zoom * 1.2); return; }
  if (mod && k === '-') { e.preventDefault(); setZoom(zoom / 1.2); return; }
  if (mod && k === '0') { e.preventDefault(); setZoom(fitZoom); return; }
  if (mod) return;
  if ((k === 'delete' || k === 'backspace') && selection) { e.preventDefault(); deleteSelection(); return; }
  if (k === 'escape') { clearSelection(); closeMenu(); if (pendingCard) { pendingCard = null; toast('Flashcard cancelado'); } return; }
  if (e.code === 'Space') { e.preventDefault(); if (!tempHand) { tempHand = true; updateCursor(); } return; }
  const map = { p: 'pen', h: 'highlighter', e: 'eraser', l: 'lasso', t: 'text', f: 'tape', k: 'laser' };
  if (map[k]) { setTool(map[k]); return; }
  if (k === 'pagedown') { e.preventDefault(); scrollToPage(Math.min(pages.length - 1, currentIndex + 1)); }
  if (k === 'pageup') { e.preventDefault(); scrollToPage(Math.max(0, currentIndex - 1)); }
}

