// Desenho de páginas: modelos de papel, tinta, PDFs, imagens, textos e fitas.
import { getStroke } from '../vendor/perfect-freehand.mjs';
import * as pdfjs from '../vendor/pdf.min.mjs';
import { getAssetBlob } from './db.js';

pdfjs.GlobalWorkerOptions.workerSrc = new URL('../vendor/pdf.worker.min.mjs', import.meta.url).href;
export { pdfjs };

export const PAGE_SIZES = {
  'a4': { w: 595, h: 842, label: 'A4 retrato' },
  'a4-land': { w: 842, h: 595, label: 'A4 paisagem' },
  'letter': { w: 612, h: 792, label: 'Carta' },
  'square': { w: 700, h: 700, label: 'Quadrado' },
};

export const TEMPLATES = {
  blank: 'Liso',
  lined: 'Pautado',
  grid: 'Quadriculado',
  dotted: 'Pontilhado',
  cornell: 'Cornell',
  checklist: 'Checklist',
  planner: 'Semana',
  monthly: 'Mês',
  yearly: 'Ano',
  music: 'Partitura',
};

export const PAPER_COLORS = {
  white: { bg: '#ffffff', line: '#cfd8e3', strong: '#e8a0a0', label: 'Branco' },
  cream: { bg: '#fbf6e9', line: '#dccfb0', strong: '#e2a48c', label: 'Creme' },
  sepia: { bg: '#f1e4c8', line: '#cdb88f', strong: '#c98f6e', label: 'Sépia' },
  slate: { bg: '#2a2f36', line: '#47505c', strong: '#7a5a52', label: 'Lousa' },
};

export const SPACINGS = { 0.75: 'Pequeno', 1: 'Médio', 1.4: 'Grande' };

const MONTHS = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
const WEEKDAYS = ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB', 'DOM'];

// ---------- Modelos de papel ----------
export function drawTemplate(ctx, page) {
  const { width: W, height: H } = page;
  const paper = PAPER_COLORS[page.paper] || PAPER_COLORS.white;
  ctx.fillStyle = paper.bg;
  ctx.fillRect(0, 0, W, H);
  if (page.pdf || page.bgAsset) return;
  ctx.strokeStyle = paper.line;
  ctx.fillStyle = paper.line;
  ctx.lineWidth = 0.6;
  const t = page.template || 'blank';
  const sp = page.spacing || 1;

  const hline = (y, x0 = 0, x1 = W) => { ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke(); };
  const vline = (x, y0 = 0, y1 = H) => { ctx.beginPath(); ctx.moveTo(x, y0); ctx.lineTo(x, y1); ctx.stroke(); };
  const label = (txt, x, y, size = 9, weight = 700) => {
    ctx.save(); ctx.fillStyle = paper.strong; ctx.font = `${weight} ${size}px sans-serif`; ctx.fillText(txt, x, y); ctx.restore();
  };

  if (t === 'lined') {
    for (let y = 72; y < H - 20; y += 24 * sp) hline(y);
    ctx.strokeStyle = paper.strong; ctx.lineWidth = 0.8;
    vline(62);
  } else if (t === 'grid') {
    const s = 17 * sp;
    for (let y = s; y < H; y += s) hline(y);
    for (let x = s; x < W; x += s) vline(x);
  } else if (t === 'dotted') {
    const s = 17 * sp;
    for (let y = s; y < H; y += s) for (let x = s; x < W; x += s) {
      ctx.beginPath(); ctx.arc(x, y, 0.95, 0, Math.PI * 2); ctx.fill();
    }
  } else if (t === 'cornell') {
    const top = 84, cue = Math.round(W * 0.3), bottom = H - Math.round(H * 0.18);
    for (let y = top + 24 * sp; y < bottom; y += 24 * sp) hline(y, cue, W);
    ctx.lineWidth = 1.1; ctx.strokeStyle = paper.strong;
    hline(top); vline(cue, top, bottom); hline(bottom);
    label('TEMA / DATA', 18, 24, 9, 600);
    label('PALAVRAS-CHAVE', 14, top + 16, 9, 600);
    label('ANOTAÇÕES', cue + 12, top + 16, 9, 600);
    label('RESUMO', 14, bottom + 18, 9, 600);
  } else if (t === 'checklist') {
    label('LISTA', 40, 44, 11);
    const step = 30 * sp;
    for (let y = 80; y < H - 30; y += step) {
      ctx.strokeStyle = paper.line; ctx.lineWidth = 0.6; hline(y, 72, W - 36);
      ctx.strokeStyle = paper.strong; ctx.lineWidth = 1;
      ctx.strokeRect(44, y - 16, 14, 14);
    }
  } else if (t === 'planner') {
    const days = ['SEGUNDA', 'TERÇA', 'QUARTA', 'QUINTA', 'SEXTA', 'SÁBADO', 'DOMINGO', 'NOTAS'];
    const top = 60, cols = 2, rows = 4, gw = (W - 48) / cols, gh = (H - top - 24) / rows;
    ctx.lineWidth = 0.9;
    days.forEach((d, i) => {
      const cx = 24 + (i % cols) * gw, cy = top + Math.floor(i / cols) * gh;
      ctx.strokeStyle = paper.line; ctx.strokeRect(cx + 4, cy + 4, gw - 8, gh - 8);
      label(d, cx + 14, cy + 20);
      ctx.strokeStyle = paper.line; ctx.lineWidth = 0.5;
      for (let y = cy + 44; y < cy + gh - 10; y += 22 * sp) hline(y, cx + 14, cx + gw - 14);
      ctx.lineWidth = 0.9;
    });
    label('Semana', 28, 38, 16, 600);
  } else if (t === 'monthly') {
    const d = page.date ? new Date(page.date) : new Date();
    const y0 = d.getFullYear(), m0 = d.getMonth();
    label(`${MONTHS[m0]} ${y0}`, 28, 44, 20, 600);
    const top = 70, left = 20, gw = (W - 40) / 7, gh = (H - top - 30) / 6;
    WEEKDAYS.forEach((wd, i) => label(wd, left + i * gw + 6, top + 12));
    const first = (new Date(y0, m0, 1).getDay() + 6) % 7;
    const days = new Date(y0, m0 + 1, 0).getDate();
    ctx.lineWidth = 0.7;
    for (let r = 0; r < 6; r++) for (let c = 0; c < 7; c++) {
      const x = left + c * gw, y = top + 20 + r * gh * 0.97;
      ctx.strokeStyle = paper.line; ctx.strokeRect(x, y, gw, gh * 0.97);
      const n = r * 7 + c - first + 1;
      if (n >= 1 && n <= days) { ctx.fillStyle = paper.strong; ctx.font = '600 10px sans-serif'; ctx.fillText(String(n), x + 5, y + 13); }
    }
  } else if (t === 'yearly') {
    const yr = page.date ? new Date(page.date).getFullYear() : new Date().getFullYear();
    label(String(yr), 28, 44, 22, 600);
    const cols = W > H ? 4 : 3, rows = 12 / cols;
    const top = 64, gw = (W - 40) / cols, gh = (H - top - 20) / rows;
    for (let m = 0; m < 12; m++) {
      const cx = 20 + (m % cols) * gw, cy = top + Math.floor(m / cols) * gh;
      label(MONTHS[m].toUpperCase(), cx + 8, cy + 14, 8);
      const first = (new Date(yr, m, 1).getDay() + 6) % 7, days = new Date(yr, m + 1, 0).getDate();
      const cw = (gw - 16) / 7, ch = Math.min(cw, (gh - 28) / 6);
      ctx.fillStyle = paper.line; ctx.font = `${Math.max(5, ch * 0.5)}px sans-serif`;
      for (let n = 1; n <= days; n++) {
        const idx = n - 1 + first;
        ctx.fillText(String(n), cx + 8 + (idx % 7) * cw, cy + 30 + Math.floor(idx / 7) * ch);
      }
    }
  } else if (t === 'music') {
    const gap = 7 * sp, staff = gap * 4;
    for (let y = 70; y + staff < H - 30; y += staff + 46 * sp) {
      for (let i = 0; i < 5; i++) hline(y + i * gap, 36, W - 36);
    }
  }
}

// Imagem usada como modelo de página (modelo personalizado).
export async function drawBgImage(ctx, page) {
  if (!page.bgAsset) return;
  const r = await loadImage(page.bgAsset);
  if (r) ctx.drawImage(r.img, 0, 0, page.width, page.height);
}

// ---------- Tinta ----------
export const PEN_STYLES = { fountain: 'Tinteiro', ballpoint: 'Esferográfica', brush: 'Pincel', pencil: 'Lápis' };

const outlineCache = new WeakMap();

export function strokeOptions(s) {
  if (s.tool === 'highlighter') {
    return { size: s.size, thinning: 0, smoothing: 0.5, streamline: 0.5, simulatePressure: false, last: true,
      start: { cap: false }, end: { cap: false } };
  }
  const style = s.style || 'fountain';
  if (style === 'ballpoint') return { size: s.size, thinning: 0.15, smoothing: 0.6, streamline: 0.5, simulatePressure: false, last: true };
  if (style === 'brush') {
    return { size: s.size * 1.5, thinning: 0.85, smoothing: 0.6, streamline: 0.4, simulatePressure: !!s.sim, last: true,
      easing: (t) => t * t, start: { taper: s.size * 4 }, end: { taper: s.size * 6 } };
  }
  if (style === 'pencil') return { size: s.size, thinning: 0.35, smoothing: 0.5, streamline: 0.4, simulatePressure: !!s.sim, last: true };
  return { size: s.size, thinning: 0.62, smoothing: 0.55, streamline: 0.45, simulatePressure: !!s.sim, last: true,
    easing: (t) => Math.sin((t * Math.PI) / 2) };
}

export function strokeOutline(s) {
  let o = outlineCache.get(s.points);
  if (!o) {
    o = getStroke(s.points, strokeOptions(s));
    outlineCache.set(s.points, o);
  }
  return o;
}

export function outlineToSvgPath(points) {
  const len = points.length;
  if (!len) return '';
  const f = (n) => n.toFixed(2);
  if (len < 3) return `M${f(points[0][0])},${f(points[0][1])} L${f(points[len - 1][0])},${f(points[len - 1][1])} Z`;
  // Curvas quadráticas explícitas (sem comandos T implícitos, que alguns leitores interpretam mal).
  const mid = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  let m = mid(points[0], points[1]);
  let d = `M${f(m[0])},${f(m[1])}`;
  for (let i = 1; i < len; i++) {
    const p = points[i], n = points[(i + 1) % len];
    m = mid(p, n);
    d += ` Q${f(p[0])},${f(p[1])} ${f(m[0])},${f(m[1])}`;
  }
  return d + ' Z';
}

export function strokeSvgPath(s) {
  return outlineToSvgPath(strokeOutline(s));
}

// Polígono do interior de uma forma fechada (para preenchimento).
export function fillSvgPath(s) {
  const p = s.points;
  if (p.length < 3) return '';
  return 'M' + p.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(' L') + ' Z';
}

const pathCache = new WeakMap();
function strokePath2D(s) {
  let p = pathCache.get(s.points);
  if (!p) { p = new Path2D(strokeSvgPath(s)); pathCache.set(s.points, p); }
  return p;
}

// Textura de grafite para o lápis.
const grainCache = new Map();
function pencilPattern(ctx, color) {
  let c = grainCache.get(color);
  if (!c) {
    c = document.createElement('canvas');
    c.width = c.height = 48;
    const g = c.getContext('2d');
    g.fillStyle = color;
    let seed = 7;
    const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    for (let i = 0; i < 1500; i++) {
      g.globalAlpha = 0.25 + rnd() * 0.75;
      g.fillRect(Math.floor(rnd() * 48), Math.floor(rnd() * 48), 1, 1);
    }
    grainCache.set(color, c);
  }
  const pat = ctx.createPattern(c, 'repeat');
  // A textura fica com tamanho fixo na tela, independente do zoom.
  const m = ctx.getTransform();
  if (pat.setTransform) pat.setTransform(new DOMMatrix([1 / m.a, 0, 0, 1 / m.d, 0, 0]));
  return pat;
}

export function drawStroke(ctx, s, alpha = 1) {
  ctx.save();
  if (alpha !== 1) ctx.globalAlpha = alpha;
  if (s.fill && s.points.length > 2) {
    ctx.save();
    ctx.globalAlpha *= s.fillOpacity ?? 0.3;
    ctx.fillStyle = s.fill;
    ctx.beginPath();
    s.points.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
  ctx.fillStyle = s.style === 'pencil' && s.tool !== 'highlighter' ? pencilPattern(ctx, s.color) : s.color;
  if (s.tool === 'highlighter') ctx.globalAlpha *= s.opacity ?? 0.38;
  else if (s.style === 'pencil') ctx.globalAlpha *= 0.9;
  if (s.points.length === 1) {
    const [x, y, p = 0.5] = s.points[0];
    ctx.beginPath();
    ctx.arc(x, y, (s.size * (s.tool === 'highlighter' ? 1 : 0.4 + p * 0.5)) / 2, 0, Math.PI * 2);
    ctx.fill();
  } else if (s.style === 'pencil' && s.tool !== 'highlighter') {
    // grafite: base suave + granulado por cima
    const path = strokePath2D(s);
    const grain = ctx.fillStyle;
    ctx.save();
    ctx.globalAlpha *= 0.55;
    ctx.fillStyle = s.color;
    ctx.fill(path);
    ctx.restore();
    ctx.fillStyle = grain;
    ctx.fill(path);
  } else {
    ctx.fill(strokePath2D(s));
  }
  ctx.restore();
}

// Marca-texto fica por baixo da caneta, como no papel.
// alphaOf(stroke) permite esmaecer traços (ex.: reprodução de áudio).
export function drawStrokes(ctx, strokes, skip, alphaOf) {
  for (const s of strokes) if (s.tool === 'highlighter' && !skip?.has(s.id)) drawStroke(ctx, s, alphaOf ? alphaOf(s) : 1);
  for (const s of strokes) if (s.tool !== 'highlighter' && !skip?.has(s.id)) drawStroke(ctx, s, alphaOf ? alphaOf(s) : 1);
}

// ---------- Fita adesiva (esconde respostas) ----------
export function tapeCorners(t) {
  const dx = t.x2 - t.x1, dy = t.y2 - t.y1;
  const len = Math.hypot(dx, dy) || 1;
  const nx = (-dy / len) * (t.w / 2), ny = (dx / len) * (t.w / 2);
  return [[t.x1 + nx, t.y1 + ny], [t.x2 + nx, t.y2 + ny], [t.x2 - nx, t.y2 - ny], [t.x1 - nx, t.y1 - ny]];
}

export function drawTape(ctx, t, { revealedOutline = true } = {}) {
  const c = tapeCorners(t);
  ctx.save();
  ctx.beginPath();
  c.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
  ctx.closePath();
  if (t.hidden) {
    ctx.fillStyle = t.color;
    ctx.fill();
    ctx.clip();
    // listras diagonais suaves, como fita de papel
    ctx.strokeStyle = 'rgba(255,255,255,.22)';
    ctx.lineWidth = 3;
    const minX = Math.min(...c.map((p) => p[0])), maxX = Math.max(...c.map((p) => p[0]));
    const minY = Math.min(...c.map((p) => p[1])), maxY = Math.max(...c.map((p) => p[1]));
    for (let x = minX - (maxY - minY); x < maxX; x += 9) {
      ctx.beginPath(); ctx.moveTo(x, maxY); ctx.lineTo(x + (maxY - minY), minY); ctx.stroke();
    }
  } else if (revealedOutline) {
    ctx.setLineDash([4, 3]);
    ctx.lineWidth = 1;
    ctx.strokeStyle = t.color;
    ctx.globalAlpha = 0.7;
    ctx.stroke();
  }
  ctx.restore();
}

export function pointInTape(x, y, t) {
  return pointInPolygon(x, y, tapeCorners(t));
}

// ---------- Geometria ----------
export function strokeBounds(s) {
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  for (const [x, y] of s.points) {
    if (x < x0) x0 = x; if (y < y0) y0 = y; if (x > x1) x1 = x; if (y > y1) y1 = y;
  }
  const r = s.size / 2;
  return { x: x0 - r, y: y0 - r, w: x1 - x0 + 2 * r, h: y1 - y0 + 2 * r };
}

export function pointInPolygon(x, y, poly) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i], [xj, yj] = poly[j];
    if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

export function distToSegment(px, py, ax, ay, bx, by) {
  const dx = bx - ax, dy = by - ay;
  const l2 = dx * dx + dy * dy;
  let t = l2 ? ((px - ax) * dx + (py - ay) * dy) / l2 : 0;
  t = Math.max(0, Math.min(1, t));
  const x = ax + t * dx, y = ay + t * dy;
  return Math.hypot(px - x, py - y);
}

// Caixa (sem rotação) de uma imagem girada.
export function imageBounds(im) {
  const rot = im.rot || 0;
  if (!rot) return { x: im.x, y: im.y, w: im.w, h: im.h };
  const cx = im.x + im.w / 2, cy = im.y + im.h / 2;
  const c = Math.abs(Math.cos(rot)), s = Math.abs(Math.sin(rot));
  const w = im.w * c + im.h * s, h = im.w * s + im.h * c;
  return { x: cx - w / 2, y: cy - h / 2, w, h };
}

// ---------- Imagens ----------
const imageCache = new Map(); // assetId -> Promise<{url, img}>
export function loadImage(assetId) {
  if (!imageCache.has(assetId)) {
    imageCache.set(assetId, (async () => {
      const blob = await getAssetBlob(assetId);
      if (!blob) return null;
      const url = URL.createObjectURL(blob);
      const img = new Image();
      // onload em vez de decode(): decode() pode nunca terminar quando a aba não está pintando
      await new Promise((resolve) => {
        img.onload = img.onerror = resolve;
        img.src = url;
        if (img.complete) resolve();
      });
      return { url, img };
    })());
  }
  return imageCache.get(assetId);
}

export function drawImageItem(ctx, im, img) {
  ctx.save();
  if (im.rot) {
    ctx.translate(im.x + im.w / 2, im.y + im.h / 2);
    ctx.rotate(im.rot);
    ctx.drawImage(img, -im.w / 2, -im.h / 2, im.w, im.h);
  } else ctx.drawImage(img, im.x, im.y, im.w, im.h);
  ctx.restore();
}

// ---------- PDF ----------
const pdfCache = new Map(); // assetId -> Promise<PDFDocumentProxy>
export function loadPdf(assetId) {
  if (!pdfCache.has(assetId)) {
    pdfCache.set(assetId, (async () => {
      const blob = await getAssetBlob(assetId);
      if (!blob) throw new Error('PDF não encontrado');
      const data = new Uint8Array(await blob.arrayBuffer());
      return pdfjs.getDocument({ data, isEvalSupported: false }).promise;
    })());
  }
  return pdfCache.get(assetId);
}

const renderTasks = new WeakMap();
// Desenha a página do PDF no canvas (pxPerUnit = pixels por ponto).
// offset (em pixels) permite desenhar só uma janela da página, para zoom alto.
export async function drawPdfPage(canvas, page, pxPerUnit, offset) {
  const doc = await loadPdf(page.pdf.assetId);
  const p = await doc.getPage(page.pdf.pageIndex + 1);
  const rotation = (p.rotate + (page.pdf.rotate || 0)) % 360;
  const base = p.getViewport({ scale: 1, rotation });
  const viewport = p.getViewport({ scale: (page.width / base.width) * pxPerUnit, rotation });
  const prev = renderTasks.get(canvas);
  if (prev) prev.cancel();
  const ctx = canvas.getContext('2d');
  const params = { canvasContext: ctx, viewport, background: 'rgba(0,0,0,0)' };
  if (offset) params.transform = [1, 0, 0, 1, -offset.x, -offset.y];
  const task = p.render(params);
  renderTasks.set(canvas, task);
  try {
    await task.promise;
  } catch (e) {
    if (e?.name !== 'RenderingCancelledException') throw e;
    return false;
  } finally {
    if (renderTasks.get(canvas) === task) renderTasks.delete(canvas);
  }
  return true;
}

export async function extractPdfText(doc, pageNumber) {
  try {
    const p = await doc.getPage(pageNumber);
    const tc = await p.getTextContent();
    return tc.items.map((i) => i.str).join(' ').replace(/\s+/g, ' ').trim();
  } catch {
    return '';
  }
}

// Sumário do PDF (índice) → [{title, pageIndex, level}]
export async function extractPdfOutline(doc) {
  const out = [];
  try {
    const outline = await doc.getOutline();
    const walk = async (items, level) => {
      for (const it of items || []) {
        let pageIndex = null;
        try {
          let dest = it.dest;
          if (typeof dest === 'string') dest = await doc.getDestination(dest);
          if (Array.isArray(dest) && dest[0]) pageIndex = await doc.getPageIndex(dest[0]);
        } catch { /* destino inválido */ }
        if (pageIndex != null) out.push({ title: it.title, pageIndex, level });
        if (level < 3) await walk(it.items, level + 1);
      }
    };
    await walk(outline, 0);
  } catch { /* sem sumário */ }
  return out;
}

// ---------- Texto ----------
export const TEXT_FONT = '"Segoe UI", system-ui, -apple-system, Roboto, sans-serif';
export const NOTE_COLORS = ['#fff3a8', '#ffd1dc', '#c8f2d0', '#cfe6ff', '#ffe0b8'];

export function wrapLines(measure, text, maxWidth) {
  const out = [];
  for (const para of String(text).split('\n')) {
    const words = para.split(/(\s+)/);
    let line = '';
    for (const w of words) {
      const test = line + w;
      if (measure(test) > maxWidth && line.trim()) {
        out.push(line.replace(/\s+$/, ''));
        line = w.trimStart();
        // palavra maior que a largura: quebra por caractere
        while (measure(line) > maxWidth && line.length > 1) {
          let i = line.length - 1;
          while (i > 1 && measure(line.slice(0, i)) > maxWidth) i--;
          out.push(line.slice(0, i));
          line = line.slice(i);
        }
      } else {
        line = test;
      }
    }
    out.push(line);
  }
  return out;
}

export const NOTE_PAD = 10;

export function drawTextBox(ctx, t) {
  ctx.save();
  ctx.font = `${t.bold ? '600 ' : ''}${t.size}px ${TEXT_FONT}`;
  ctx.textBaseline = 'top';
  const lines = wrapLines((s) => ctx.measureText(s).width, t.text, t.w);
  const lh = t.size * 1.3;
  if (t.bg) {
    const h = Math.max(t.h || 0, lines.length * lh);
    ctx.fillStyle = t.bg;
    ctx.shadowColor = 'rgba(0,0,0,.18)'; ctx.shadowBlur = 6; ctx.shadowOffsetY = 2;
    ctx.fillRect(t.x - NOTE_PAD, t.y - NOTE_PAD, t.w + NOTE_PAD * 2, h + NOTE_PAD * 2);
    ctx.shadowColor = 'transparent';
  }
  ctx.fillStyle = t.color || '#1f2a37';
  lines.forEach((ln, i) => ctx.fillText(ln, t.x, t.y + i * lh + (lh - t.size) / 2));
  ctx.restore();
}

// ---------- Página completa (miniaturas, capas, imagens para IA) ----------
export async function renderPageFlat(page, canvas, cssWidth, { region, scale: forcedScale } = {}) {
  const dpr = forcedScale ? 1 : Math.min(window.devicePixelRatio || 1, 2);
  const r = region || { x: 0, y: 0, w: page.width, h: page.height };
  const scale = forcedScale || cssWidth / r.w;
  canvas.width = Math.max(1, Math.round(r.w * scale * dpr));
  canvas.height = Math.max(1, Math.round(r.h * scale * dpr));
  const ctx = canvas.getContext('2d');
  const k = scale * dpr;
  ctx.setTransform(k, 0, 0, k, -r.x * k, -r.y * k);
  drawTemplate(ctx, page);
  await drawBgImage(ctx, page);
  if (page.pdf) {
    const tmp = document.createElement('canvas');
    tmp.width = canvas.width; tmp.height = canvas.height;
    try {
      if (await drawPdfPage(tmp, page, k, { x: r.x * k, y: r.y * k })) {
        ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.drawImage(tmp, 0, 0); ctx.restore();
      }
    } catch { /* PDF indisponível */ }
  }
  for (const im of page.images || []) {
    const ri = await loadImage(im.assetId);
    if (ri) drawImageItem(ctx, im, ri.img);
  }
  drawStrokes(ctx, page.strokes || []);
  for (const t of page.texts || []) drawTextBox(ctx, t);
  for (const t of page.tapes || []) drawTape(ctx, t, { revealedOutline: false });
  return canvas;
}
