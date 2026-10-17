// Importação e exportação de PDF.
import { PDFDocument, PDFName, PDFString, rgb, degrees, StandardFonts } from '../vendor/pdf-lib.esm.min.js';
import { saveAsset, getAssetBlob, uid } from './db.js';
import {
  loadPdf, extractPdfText, extractPdfOutline, drawTemplate, drawBgImage, drawPdfPage, strokeSvgPath, fillSvgPath,
  wrapLines, loadImage, tapeCorners, PAPER_COLORS, NOTE_PAD,
} from './render.js';

// Salva o PDF e devolve as páginas prontas para um caderno.
export async function importPdf(file, notebookId, onProgress) {
  const assetId = await saveAsset(new Blob([await file.arrayBuffer()], { type: 'application/pdf' }));
  const doc = await loadPdf(assetId);
  const pages = [];
  for (let i = 1; i <= doc.numPages; i++) {
    const p = await doc.getPage(i);
    const vp = p.getViewport({ scale: 1 });
    pages.push(newPage(notebookId, {
      width: Math.round(vp.width * 100) / 100,
      height: Math.round(vp.height * 100) / 100,
      pdf: { assetId, pageIndex: i - 1 },
      pdfText: await extractPdfText(doc, i),
    }));
    onProgress?.(i / doc.numPages, `Página ${i} de ${doc.numPages}`);
  }
  return pages;
}

// Sumário do PDF importado, apontando para as páginas do caderno.
export async function outlineForPages(pages) {
  const first = pages.find((p) => p.pdf);
  if (!first) return [];
  const doc = await loadPdf(first.pdf.assetId);
  const entries = await extractPdfOutline(doc);
  return entries.map((e) => {
    const page = pages.find((p) => p.pdf?.assetId === first.pdf.assetId && p.pdf.pageIndex === e.pageIndex);
    return page ? { id: uid(), title: e.title, pageId: page.id, level: e.level } : null;
  }).filter(Boolean);
}

export function newPage(notebookId, props = {}) {
  return {
    id: uid(),
    notebookId,
    width: 595,
    height: 842,
    template: 'blank',
    paper: 'white',
    pdf: null,
    pdfText: '',
    strokes: [],
    texts: [],
    images: [],
    tapes: [],
    links: [],
    bookmarked: false,
    ...props,
  };
}

// ---------- Exportação ----------
function hexToRgb(hex) {
  let h = String(hex || '#000').replace('#', '');
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  const n = parseInt(h.slice(0, 6), 16) || 0;
  return rgb(((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255);
}

function canvasToPngBytes(canvas) {
  return new Promise((resolve) => canvas.toBlob(async (b) => resolve(new Uint8Array(await b.arrayBuffer())), 'image/png'));
}

async function rasterBackground(page, includePdf) {
  const scale = Math.min(2.5, Math.sqrt(30e6 / (page.width * page.height)));
  const c = document.createElement('canvas');
  c.width = Math.round(page.width * scale);
  c.height = Math.round(page.height * scale);
  const ctx = c.getContext('2d');
  ctx.setTransform(scale, 0, 0, scale, 0, 0);
  drawTemplate(ctx, page);
  await drawBgImage(ctx, page);
  if (includePdf && page.pdf) {
    const tmp = document.createElement('canvas');
    tmp.width = c.width; tmp.height = c.height;
    await drawPdfPage(tmp, page, scale);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.drawImage(tmp, 0, 0);
  }
  return canvasToPngBytes(c);
}

function safeText(font, text) {
  let out = '';
  for (const ch of text) {
    try { font.encodeText(ch); out += ch; } catch { out += ch === '\t' ? '  ' : '?'; }
  }
  return out;
}

export async function exportNotebookPdf(notebook, pages, onProgress) {
  const out = await PDFDocument.create();
  out.setTitle(notebook.title);
  out.setCreator('Acervo Digital Pessoal — NEXO Revisão');
  const font = await out.embedFont(StandardFonts.Helvetica);
  const fontBold = await out.embedFont(StandardFonts.HelveticaBold);
  const srcDocs = new Map();
  const embedded = new Map();
  const placed = []; // { pdfPage, ox, top } por página, para os links

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    const W = page.width, H = page.height;
    let pdfPage;
    let ox = 0, oy = 0;

    if (page.pdf && !page.pdf.rotate) {
      let src = srcDocs.get(page.pdf.assetId);
      if (src === undefined) {
        try {
          const bytes = await (await getAssetBlob(page.pdf.assetId)).arrayBuffer();
          src = await PDFDocument.load(bytes, { ignoreEncryption: true });
        } catch { src = null; }
        srcDocs.set(page.pdf.assetId, src);
      }
      const srcPage = src?.getPage(page.pdf.pageIndex);
      if (srcPage && !(srcPage.getRotation().angle % 360)) {
        const [copied] = await out.copyPages(src, [page.pdf.pageIndex]);
        pdfPage = out.addPage(copied);
        // Coordenadas relativas ao canto da área visível (CropBox) do original.
        const crop = copied.getCropBox();
        ox = crop.x; oy = crop.y;
      }
    }

    if (!pdfPage) {
      pdfPage = out.addPage([W, H]);
      const paper = PAPER_COLORS[page.paper] || PAPER_COLORS.white;
      if (!page.pdf && !page.bgAsset && page.template === 'blank') {
        if (page.paper && page.paper !== 'white') pdfPage.drawRectangle({ x: 0, y: 0, width: W, height: H, color: hexToRgb(paper.bg) });
      } else {
        const png = await out.embedPng(await rasterBackground(page, true));
        pdfPage.drawImage(png, { x: 0, y: 0, width: W, height: H });
      }
    }

    const top = oy + H;
    placed.push({ pdfPage, ox, top });

    for (const im of page.images || []) {
      let emb = embedded.get(im.assetId);
      if (!emb) {
        const blob = await getAssetBlob(im.assetId);
        if (!blob) continue;
        if (blob.type === 'image/jpeg') emb = await out.embedJpg(new Uint8Array(await blob.arrayBuffer()));
        else if (blob.type === 'image/png') emb = await out.embedPng(new Uint8Array(await blob.arrayBuffer()));
        else {
          const r = await loadImage(im.assetId);
          const c = document.createElement('canvas');
          c.width = r.img.naturalWidth; c.height = r.img.naturalHeight;
          c.getContext('2d').drawImage(r.img, 0, 0);
          emb = await out.embedPng(await canvasToPngBytes(c));
        }
        embedded.set(im.assetId, emb);
      }
      if (im.rot) {
        // gira em torno do centro (no PDF o eixo y sobe, então o sentido inverte)
        const a = -im.rot;
        const cx = ox + im.x + im.w / 2, cy = top - (im.y + im.h / 2);
        const x = cx - (im.w / 2) * Math.cos(a) + (im.h / 2) * Math.sin(a);
        const y = cy - (im.w / 2) * Math.sin(a) - (im.h / 2) * Math.cos(a);
        pdfPage.drawImage(emb, { x, y, width: im.w, height: im.h, rotate: degrees((a * 180) / Math.PI) });
      } else pdfPage.drawImage(emb, { x: ox + im.x, y: top - im.y - im.h, width: im.w, height: im.h });
    }

    const strokes = page.strokes || [];
    const ordered = [...strokes.filter((s) => s.tool === 'highlighter'), ...strokes.filter((s) => s.tool !== 'highlighter')];
    for (const s of ordered) {
      if (s.fill && s.points.length > 2) {
        pdfPage.drawSvgPath(fillSvgPath(s), { x: ox, y: top, color: hexToRgb(s.fill), opacity: s.fillOpacity ?? 0.3, borderWidth: 0 });
      }
      const opacity = s.tool === 'highlighter' ? (s.opacity ?? 0.38) : s.style === 'pencil' ? 0.85 : 1;
      if (s.points.length === 1) {
        const [x, y, p = 0.5] = s.points[0];
        const r = (s.size * (s.tool === 'highlighter' ? 1 : 0.4 + p * 0.5)) / 2;
        pdfPage.drawCircle({ x: ox + x, y: top - y, size: r, color: hexToRgb(s.color), opacity });
        continue;
      }
      const d = strokeSvgPath(s);
      if (!d) continue;
      pdfPage.drawSvgPath(d, { x: ox, y: top, color: hexToRgb(s.color), opacity, borderWidth: 0 });
    }

    for (const t of page.texts || []) {
      const f = t.bold ? fontBold : font;
      const text = safeText(f, t.text);
      const lines = wrapLines((str) => f.widthOfTextAtSize(str, t.size), text, t.w);
      const lh = t.size * 1.3;
      if (t.bg) {
        const hgt = Math.max(t.h || 0, lines.length * lh) + NOTE_PAD * 2;
        pdfPage.drawRectangle({ x: ox + t.x - NOTE_PAD, y: top - t.y + NOTE_PAD - hgt, width: t.w + NOTE_PAD * 2, height: hgt, color: hexToRgb(t.bg) });
      }
      lines.forEach((ln, k) => {
        pdfPage.drawText(ln, {
          x: ox + t.x,
          y: top - t.y - k * lh - (lh - t.size) / 2 - t.size * 0.8,
          size: t.size, font: f, color: hexToRgb(t.color),
        });
      });
    }

    // Fitas escondidas saem cobrindo a resposta (bom para imprimir e estudar).
    for (const tp of page.tapes || []) {
      if (!tp.hidden) continue;
      const c = tapeCorners(tp);
      const d = 'M' + c.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(' L') + ' Z';
      pdfPage.drawSvgPath(d, { x: ox, y: top, color: hexToRgb(tp.color), borderWidth: 0 });
    }
    onProgress?.((i + 1) / pages.length, `Página ${i + 1} de ${pages.length}`);
  }

  // Links clicáveis no PDF: sites e páginas do próprio caderno.
  const indexById = new Map(pages.map((p, i) => [p.id, i]));
  pages.forEach((page, i) => {
    const { pdfPage, ox, top } = placed[i];
    for (const l of page.links || []) {
      const rect = [ox + l.x, top - l.y - l.h, ox + l.x + l.w, top - l.y];
      let action = null;
      if (l.target.type === 'url') action = out.context.obj({ Type: 'Action', S: 'URI', URI: PDFString.of(l.target.url) });
      else if (l.target.type === 'page' && indexById.has(l.target.pageId)) {
        const dest = placed[indexById.get(l.target.pageId)].pdfPage.ref;
        action = out.context.obj({ Type: 'Action', S: 'GoTo', D: [dest, PDFName.of('Fit')] });
      }
      if (!action) continue;
      const annot = out.context.register(out.context.obj({ Type: 'Annot', Subtype: 'Link', Rect: rect, Border: [0, 0, 0], A: action }));
      pdfPage.node.addAnnot(annot);
    }
  });

  const bytes = await out.save();
  return new Blob([bytes], { type: 'application/pdf' });
}
