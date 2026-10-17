// Figurinhas: emojis, carimbos, washi tapes e elementos salvos pelo usuário.
import { db, uid } from './db.js';
import { h, toast, promptDialog } from './ui.js';

const EMOJIS = ['⭐', '✅', '❌', '❗', '❓', '💡', '📌', '🔥', '📝', '📚', '🎯', '⏰', '❤️', '👍', '🚀', '⚠️', '🧠', '✏️', '📅', '🏆'];
const STAMPS = [
  ['IMPORTANTE', '#c62f2f'], ['REVISAR', '#b57b36'], ['VAI CAIR NA PROVA', '#7a3fb0'],
  ['FEITO', '#1f8a4c'], ['DÚVIDA', '#2457c5'], ['FÓRMULA', '#b8860b'],
];
const WASHI = [
  ['#f4a6a6', 'stripes'], ['#9ad0c2', 'dots'], ['#f7d679', 'grid'], ['#b9a7e8', 'stripes'], ['#9cc7f0', 'dots'], ['#f2b880', 'zigzag'],
];

function canvasBlob(c) {
  return new Promise((res) => c.toBlob(res, 'image/png'));
}

async function emojiBlob(e) {
  const c = document.createElement('canvas');
  c.width = c.height = 160;
  const g = c.getContext('2d');
  g.font = '128px "Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", sans-serif';
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.fillText(e, 80, 88);
  return { blob: await canvasBlob(c), w: 48, h: 48 };
}

async function stampBlob(text, color) {
  const c = document.createElement('canvas');
  const g = c.getContext('2d');
  const font = '800 44px "Segoe UI", system-ui, sans-serif';
  g.font = font;
  const w = Math.ceil(g.measureText(text).width) + 60;
  c.width = w; c.height = 90;
  g.font = font;
  g.strokeStyle = color; g.fillStyle = color; g.lineWidth = 6;
  g.translate(w / 2, 45); g.rotate(-0.04); g.translate(-w / 2, -45);
  g.beginPath(); g.roundRect(6, 8, w - 12, 74, 14); g.stroke();
  g.textAlign = 'center'; g.textBaseline = 'middle';
  g.globalAlpha = 0.92;
  g.fillText(text, w / 2, 47);
  return { blob: await canvasBlob(c), w: w / 3.2, h: 90 / 3.2 };
}

async function washiBlob(color, pattern) {
  const c = document.createElement('canvas');
  c.width = 480; c.height = 64;
  const g = c.getContext('2d');
  // bordas serrilhadas nas pontas
  g.beginPath();
  g.moveTo(0, 0);
  for (let y = 0; y <= 64; y += 8) g.lineTo(y % 16 ? 6 : 0, y);
  g.lineTo(480, 64);
  for (let y = 64; y >= 0; y -= 8) g.lineTo(480 - (y % 16 ? 6 : 0), y);
  g.closePath();
  g.globalAlpha = 0.82;
  g.fillStyle = color;
  g.fill();
  g.clip();
  g.globalAlpha = 0.35;
  g.fillStyle = '#fff'; g.strokeStyle = '#fff'; g.lineWidth = 6;
  if (pattern === 'stripes') for (let x = -64; x < 480; x += 24) { g.beginPath(); g.moveTo(x, 64); g.lineTo(x + 64, 0); g.stroke(); }
  if (pattern === 'dots') for (let x = 12; x < 480; x += 24) for (let y = 12; y < 64; y += 20) { g.beginPath(); g.arc(x + (y % 40 ? 12 : 0), y, 4, 0, 7); g.fill(); }
  if (pattern === 'grid') { g.lineWidth = 2; for (let x = 0; x < 480; x += 16) { g.beginPath(); g.moveTo(x, 0); g.lineTo(x, 64); g.stroke(); } for (let y = 0; y < 64; y += 16) { g.beginPath(); g.moveTo(0, y); g.lineTo(480, y); g.stroke(); } }
  if (pattern === 'zigzag') { g.lineWidth = 4; g.beginPath(); for (let x = 0; x <= 480; x += 16) g.lineTo(x, x % 32 ? 22 : 42); g.stroke(); }
  return { blob: await canvasBlob(c), w: 180, h: 24 };
}

// Abre o painel. handlers: onImage({blob, w, h}), onElement(element)
export async function openStickerPanel(anchor, handlers) {
  document.querySelector('.sticker-panel')?.remove();
  const panel = h('div', { class: 'menu sticker-panel' });
  const tabs = h('div', { class: 'seg' });
  const body = h('div', { class: 'sticker-body' });
  let tab = 'emoji';
  const close = () => { panel.remove(); document.removeEventListener('pointerdown', off, true); };
  const off = (e) => { if (!panel.contains(e.target) && e.target !== anchor && !anchor.contains(e.target)) close(); };

  const tile = (content, onPick, title) => {
    const b = h('button', { class: 'sticker-tile', title: title || '' }, content);
    b.addEventListener('click', async () => { await onPick(); close(); });
    return b;
  };

  const draw = async () => {
    tabs.replaceChildren(...[['emoji', 'Emojis'], ['stamps', 'Carimbos'], ['washi', 'Washi tape'], ['mine', 'Minhas']].map(([k, label]) => {
      const b = h('button', { class: tab === k ? 'active' : '' }, label);
      b.addEventListener('click', () => { tab = k; draw(); });
      return b;
    }));
    body.replaceChildren();
    if (tab === 'emoji') {
      for (const e of EMOJIS) body.append(tile(h('span', { class: 'emoji' }, e), async () => handlers.onImage(await emojiBlob(e))));
    } else if (tab === 'stamps') {
      for (const [t, c] of STAMPS) body.append(tile(h('span', { class: 'stamp', style: { color: c, borderColor: c } }, t), async () => handlers.onImage(await stampBlob(t, c)), t));
    } else if (tab === 'washi') {
      for (const [c, p] of WASHI) {
        const prev = h('img', { alt: '', class: 'washi-prev' });
        washiBlob(c, p).then((r) => { prev.src = URL.createObjectURL(r.blob); });
        body.append(tile(prev, async () => handlers.onImage(await washiBlob(c, p))));
      }
    } else {
      const els = (await db.all('elements')).sort((a, b) => b.createdAt - a.createdAt);
      if (!els.length) body.append(h('p', { class: 'muted small', style: { padding: '8px' } }, 'Selecione algo com o laço e toque em “Figurinha” para guardar aqui e reutilizar.'));
      for (const el of els) {
        const t = tile(h('img', { alt: el.name, src: el.thumb, class: 'mine-prev' }), async () => handlers.onElement(el), el.name);
        t.addEventListener('contextmenu', async (ev) => {
          ev.preventDefault();
          if (confirm(`Excluir a figurinha “${el.name}”?`)) { await db.delete('elements', el.id); draw(); }
        });
        body.append(t);
      }
    }
  };
  panel.append(tabs, body);
  document.body.append(panel);
  const r = anchor.getBoundingClientRect();
  panel.style.left = Math.max(8, Math.min(r.left - 120, innerWidth - 340)) + 'px';
  panel.style.top = r.bottom + 8 + 'px';
  setTimeout(() => document.addEventListener('pointerdown', off, true));
  await draw();
}

// Guarda a seleção como figurinha reutilizável. items já normalizados (origem 0,0).
export async function saveElement(items, thumbCanvas) {
  const name = await promptDialog('Salvar figurinha', { label: 'Nome', value: 'Figurinha', ok: 'Salvar' });
  if (!name) return;
  await db.put('elements', { id: uid(), name, items, thumb: thumbCanvas.toDataURL('image/png'), createdAt: Date.now() });
  toast('Figurinha salva em Figurinhas → Minhas');
}

