// Seletores visuais usados na biblioteca: cores (predefinidas, personalizada, histórico),
// ícones de pasta e o diálogo "Nova pasta".
import { h, icon, modal } from './ui.js';

// ---------- Cores ----------
export const PALETTE_ROWS = [
  ['#a32a29', '#a14a1d', '#966308', '#14661f', '#3358b0', '#7347a3', '#9b3470', '#5b5b5b', '#1a1a1a'],
  ['#ff5c63', '#ff9d4d', '#fdc518', '#5fdc62', '#86c0ff', '#d1a6ff', '#ff8ec7', '#bdbbb3', '#ffffff'],
  ['#ffb0b0', '#ffd2a3', '#ffe680', '#a9f08f', '#cfe5ff', '#e6d6ff', '#ffcce6', '#e4e2dc'],
];
const HISTORY_KEY = 'acervo.colorHistory';
const RAINBOW = 'conic-gradient(red, yellow, lime, cyan, blue, magenta, red)';

export function colorHistory() {
  try { return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]').filter((c) => /^#[0-9a-f]{6}$/i.test(c)); } catch { return []; }
}
export function pushColorHistory(c) {
  if (!/^#[0-9a-f]{6}$/i.test(c || '')) return;
  try {
    const list = [c.toLowerCase(), ...colorHistory().filter((x) => x.toLowerCase() !== c.toLowerCase())].slice(0, 18);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(list));
  } catch { /* sem armazenamento: o histórico só não é lembrado */ }
}

export function hexToRgb(hex) {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex || '');
  if (!m) return { r: 0, g: 0, b: 0 };
  const n = parseInt(m[1], 16);
  return { r: n >> 16, g: (n >> 8) & 255, b: n & 255 };
}
export function rgbToHex({ r, g, b }) {
  return '#' + [r, g, b].map((v) => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, '0')).join('');
}
export function hsvToRgb(hh, s, v) {
  const f = (n) => { const k = (n + hh / 60) % 6; return v - v * s * Math.max(0, Math.min(k, 4 - k, 1)); };
  return { r: f(5) * 255, g: f(3) * 255, b: f(1) * 255 };
}
export function rgbToHsv({ r, g, b }) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
  let hh = 0;
  if (d) {
    if (max === r) hh = ((g - b) / d) % 6; else if (max === g) hh = (b - r) / d + 2; else hh = (r - g) / d + 4;
    hh *= 60; if (hh < 0) hh += 360;
  }
  return { h: hh, s: max ? d / max : 0, v: max };
}
// Escurece (amt<0) ou clareia (amt>0) uma cor misturando com preto/branco.
export function shade(hex, amt) {
  const { r, g, b } = hexToRgb(hex);
  const t = amt < 0 ? 0 : 255, p = Math.abs(amt);
  return rgbToHex({ r: r + (t - r) * p, g: g + (t - g) * p, b: b + (t - b) * p });
}

// Grade de cores predefinidas (3 linhas) + botão arco-íris que abre o seletor completo.
export function paletteGrid({ value, onPick, onCustom }) {
  const grid = h('div', { class: 'pal-grid' });
  PALETTE_ROWS.forEach((row, ri) => {
    row.forEach((c) => {
      const b = h('button', { type: 'button', class: 'pal-dot' + (c.toLowerCase() === (value || '').toLowerCase() ? ' active' : ''),
        style: { '--c': c }, 'aria-label': 'Cor ' + c, title: c });
      b.addEventListener('click', () => onPick(c));
      grid.append(b);
    });
    if (ri === PALETTE_ROWS.length - 1) {
      const b = h('button', { type: 'button', class: 'pal-dot rainbow', style: { '--c': 'transparent', background: RAINBOW }, 'aria-label': 'Mais cores', title: 'Mais cores' });
      b.addEventListener('click', () => onCustom?.());
      grid.append(b);
    }
  });
  return grid;
}

// Seletor completo: Predefinições / Personalizar / Histórico.
export function colorPanel({ value, onChange, onDone, onBack, tab = 'presets' }) {
  const root = h('div', { class: 'cp' });
  let cur = /^#[0-9a-f]{6}$/i.test(value || '') ? value.toLowerCase() : '#45bfdb';
  let hsv = rgbToHsv(hexToRgb(cur));
  let active = tab;

  const setColor = (hex, fromPicker = false) => {
    cur = hex.toLowerCase();
    if (!fromPicker) hsv = rgbToHsv(hexToRgb(cur));
    onChange?.(cur);
  };

  const head = h('div', { class: 'cp-head' });
  if (onBack) head.append(h('button', { type: 'button', class: 'icon-btn small', 'aria-label': 'Voltar', onclick: onBack }, icon('<path d="M15 5l-7 7 7 7"/>')));
  head.append(h('span', { style: { flex: 1 } }));
  if (window.EyeDropper) {
    head.append(h('button', { type: 'button', class: 'icon-btn small', title: 'Conta-gotas', 'aria-label': 'Conta-gotas', onclick: async () => {
      try { const r = await new window.EyeDropper().open(); setColor(r.sRGBHex); pushColorHistory(cur); draw(); } catch { /* cancelado */ }
    } }, icon('<path d="M20 4a2.5 2.5 0 0 0-3.5 0L14 6.5l-1-1-1.5 1.5 1 1L5 15v4h4l7.5-7.5 1 1L19 11l-1-1L20.5 7.5a2.5 2.5 0 0 0 0-3.5z"/>')));
  }
  const tabs = h('div', { class: 'cp-tabs', role: 'tablist' });
  const body = h('div', { class: 'cp-body' });
  root.append(head, tabs, body);

  const draw = () => {
    tabs.replaceChildren(...[['presets', 'Predefinições'], ['custom', 'Personalizar'], ['history', 'Histórico']].map(([k, label]) => {
      const b = h('button', { type: 'button', role: 'tab', class: active === k ? 'active' : '', 'aria-selected': String(active === k) }, label);
      b.addEventListener('click', () => { active = k; draw(); });
      return b;
    }));
    body.replaceChildren();
    if (active === 'presets') {
      body.append(paletteGrid({ value: cur, onPick: (c) => { setColor(c); pushColorHistory(c); onDone?.(c); draw(); }, onCustom: () => { active = 'custom'; draw(); } }));
    } else if (active === 'history') {
      const list = colorHistory();
      if (!list.length) { body.append(h('p', { class: 'cp-empty' }, 'As últimas cores usadas serão mostradas aqui')); return; }
      const grid = h('div', { class: 'pal-grid' });
      for (const c of list) {
        const b = h('button', { type: 'button', class: 'pal-dot', style: { '--c': c }, 'aria-label': 'Cor ' + c });
        b.addEventListener('click', () => { setColor(c); onDone?.(c); draw(); });
        grid.append(b);
      }
      body.append(grid);
    } else {
      body.append(customView());
    }
  };

  const customView = () => {
    const wrap = h('div', { class: 'cp-custom' });
    const sv = h('canvas', { class: 'cp-sv', width: 280, height: 150, 'aria-label': 'Saturação e brilho' });
    const knob = h('span', { class: 'cp-knob' });
    const svWrap = h('div', { class: 'cp-sv-wrap' }, sv, knob);
    const hue = h('input', { type: 'range', min: '0', max: '360', step: '1', class: 'cp-hue', 'aria-label': 'Matiz', value: String(Math.round(hsv.h)) });
    const hex = h('input', { class: 'input cp-hex', value: cur.toUpperCase(), maxlength: '7', 'aria-label': 'Código da cor', spellcheck: 'false' });
    const swatch = h('span', { class: 'cp-swatch', style: { background: cur } });
    const confirm = h('button', { type: 'button', class: 'btn' }, 'Confirmar');

    const paintSV = () => {
      const ctx = sv.getContext('2d');
      const w = sv.width, ht = sv.height;
      ctx.fillStyle = rgbToHex(hsvToRgb(hsv.h, 1, 1));
      ctx.fillRect(0, 0, w, ht);
      let g = ctx.createLinearGradient(0, 0, w, 0);
      g.addColorStop(0, '#fff'); g.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = g; ctx.fillRect(0, 0, w, ht);
      g = ctx.createLinearGradient(0, 0, 0, ht);
      g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, '#000');
      ctx.fillStyle = g; ctx.fillRect(0, 0, w, ht);
      knob.style.left = hsv.s * 100 + '%';
      knob.style.top = (1 - hsv.v) * 100 + '%';
    };
    const sync = () => {
      cur = rgbToHex(hsvToRgb(hsv.h, hsv.s, hsv.v));
      hex.value = cur.toUpperCase();
      swatch.style.background = cur;
      paintSV();
      onChange?.(cur);
    };
    const pickAt = (e) => {
      const r = sv.getBoundingClientRect();
      hsv.s = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width));
      hsv.v = 1 - Math.max(0, Math.min(1, (e.clientY - r.top) / r.height));
      sync();
    };
    let dragging = false;
    sv.addEventListener('pointerdown', (e) => { dragging = true; sv.setPointerCapture(e.pointerId); pickAt(e); });
    sv.addEventListener('pointermove', (e) => { if (dragging) pickAt(e); });
    sv.addEventListener('pointerup', () => { dragging = false; });
    hue.addEventListener('input', () => { hsv.h = Number(hue.value); sync(); });
    hex.addEventListener('input', () => {
      const v = hex.value.startsWith('#') ? hex.value : '#' + hex.value;
      if (/^#[0-9a-f]{6}$/i.test(v)) { hsv = rgbToHsv(hexToRgb(v)); hue.value = String(Math.round(hsv.h)); cur = v.toLowerCase(); swatch.style.background = cur; paintSV(); onChange?.(cur); }
    });
    confirm.addEventListener('click', () => { pushColorHistory(cur); onDone?.(cur); });
    wrap.append(svWrap, hue, h('div', { class: 'cp-row' }, swatch, hex, confirm));
    paintSV();
    return wrap;
  };

  draw();
  return root;
}

// ---------- Ícones de pasta ----------
export const FOLDER_ICONS = [
  ['apple', 'Maçã', '<path d="M12 7c-2-2-6-1-6 4 0 4 2 9 4 9 1 0 1.5-.6 2-.6s1 .6 2 .6c2 0 4-5 4-9 0-5-4-6-6-4z"/><path d="M12 7c0-2 1-3 3-3"/>'],
  ['atom', 'Ciências', '<circle cx="12" cy="12" r="1.4"/><ellipse cx="12" cy="12" rx="9" ry="3.6"/><ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(120 12 12)"/>'],
  ['book', 'Livro', '<path d="M12 6c-2-1.5-5-2-8-2v14c3 0 6 .5 8 2 2-1.5 5-2 8-2V4c-3 0-6 .5-8 2zM12 6v14"/>'],
  ['briefcase', 'Trabalho', '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M3 13h18"/>'],
  ['percent', 'Porcentagem', '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M8 16l8-8"/><circle cx="9" cy="9" r="1"/><circle cx="15" cy="15" r="1"/>'],
  ['chart', 'Gráfico', '<path d="M5 20V11M12 20V4M19 20v-7"/>'],
  ['code', 'Código', '<path d="M9 7l-5 5 5 5M15 7l5 5-5 5M13.5 5l-3 14"/>'],
  ['gear', 'Ajustes', '<circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/>'],
  ['bank', 'Instituição', '<path d="M3 9l9-5 9 5zM5 9v8M9 9v8M15 9v8M19 9v8M3 20h18M4 17h16"/>'],
  ['money', 'Dinheiro', '<rect x="3" y="7" width="18" height="10" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6.5 10v4M17.5 10v4"/>'],
  ['flask', 'Química', '<path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-9V3M7.5 15h9"/>'],
  ['graduation', 'Estudos', '<path d="M2 9l10-5 10 5-10 5zM6 11.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-4.5M22 9v6"/>'],
  ['scales', 'Direito', '<path d="M12 4v16M7 20h10M5 7h14M5 7l-3 7a3.5 3.5 0 0 0 6 0zM19 7l-3 7a3.5 3.5 0 0 0 6 0z"/>'],
  ['music', 'Música', '<path d="M9 18V6l10-2v12"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="16.5" cy="16" r="2.5"/>'],
  ['moon', 'Noite', '<path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z"/><path d="M17 4v3M15.5 5.5h3"/>'],
  ['doc', 'Documento', '<path d="M7 3h7l5 5v13H7zM14 3v5h5M10 13h6M10 17h6"/>'],
  ['palette', 'Arte', '<path d="M12 3a9 9 0 1 0 0 18c1 0 1.5-.8 1.5-1.5 0-1.2-1-1.5-1-2.5s.8-1.5 2-1.5H17a4 4 0 0 0 4-4c0-4.7-4-8.5-9-8.5z"/><circle cx="7.5" cy="11" r="1"/><circle cx="10" cy="7" r="1"/><circle cx="15" cy="7" r="1"/>'],
  ['smile', 'Sorriso', '<circle cx="12" cy="12" r="9"/><path d="M8.5 14c1 1.5 2.2 2 3.5 2s2.5-.5 3.5-2M9 9.5v.5M15 9.5v.5"/>'],
  ['compass', 'Geometria', '<circle cx="12" cy="5" r="1.5"/><path d="M12 6.5L6 20M12 6.5L18 20M8 15h8"/>'],
  ['globe', 'Mundo', '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>'],
];
const ICON_BY_ID = new Map(FOLDER_ICONS.map(([id, , p]) => [id, p]));
const NO_ICON = '<path d="M5 19L19 5" stroke="#e5484d"/>';

// Pasta do Acervo: aba atrás mais escura, frente com degradê suave e ícone branco.
export function folderGlyph(color = '#45bfdb', iconId = '', emoji = '') {
  const back = shade(color, -0.28), frontTop = shade(color, 0.12), frontBottom = shade(color, -0.04);
  const gid = 'fg' + Math.random().toString(36).slice(2, 8);
  const glyph = ICON_BY_ID.get(iconId);
  const mark = emoji
    ? `<text x="50" y="56" text-anchor="middle" font-size="26" dominant-baseline="middle">${emoji.replace(/[<&]/g, '')}</text>`
    : glyph ? `<g transform="translate(37 40) scale(1.08)" fill="none" stroke="#fff" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" opacity=".95">${glyph}</g>` : '';
  const wrap = document.createElement('span');
  wrap.innerHTML = `<svg viewBox="0 0 100 80" class="folder-glyph" aria-hidden="true"><defs><linearGradient id="${gid}" x1="0" y1="0" x2="0" y2="1">`
    + `<stop offset="0" stop-color="${frontTop}"/><stop offset="1" stop-color="${frontBottom}"/></linearGradient></defs>`
    + `<path d="M6 12a7 7 0 0 1 7-7h20.5a7 7 0 0 1 5.2 2.3L43 12h44a7 7 0 0 1 7 7v47a7 7 0 0 1-7 7H13a7 7 0 0 1-7-7z" fill="${back}"/>`
    + `<rect x="6" y="24" width="88" height="49" rx="8" fill="url(#${gid})"/>${mark}</svg>`;
  return wrap.firstChild;
}

// ---------- Diálogo "Nova pasta" / "Personalizar pasta" ----------
export function folderDialog({ title = 'Nova pasta', name = '', color = '#45bfdb', iconId = '', emoji = '', ok = 'OK' } = {}) {
  return modal((box, close) => {
    const st = { color, iconId, emoji, tab: 'color', custom: false };
    box.classList.add('folder-modal');
    const preview = h('div', { class: 'fd-preview' });
    const input = h('input', { class: 'input fd-name', placeholder: 'Sem título', value: name, maxlength: '80', 'aria-label': 'Nome da pasta' });
    const tabs = h('div', { class: 'cp-tabs fd-tabs', role: 'tablist' });
    const body = h('div', { class: 'fd-body' });
    const submit = () => close({ name: input.value.trim() || 'Sem título', color: st.color, icon: st.iconId || undefined, emoji: st.emoji || undefined });
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') submit(); });

    const draw = () => {
      preview.replaceChildren(folderGlyph(st.color, st.iconId, st.emoji));
      tabs.replaceChildren(...[['color', 'Cor'], ['icon', 'Ícone']].map(([k, label]) => {
        const b = h('button', { type: 'button', role: 'tab', class: st.tab === k ? 'active' : '', 'aria-selected': String(st.tab === k) }, label);
        b.addEventListener('click', () => { st.tab = k; st.custom = false; draw(); });
        return b;
      }));
      body.replaceChildren();
      if (st.tab === 'color') {
        if (st.custom) {
          body.append(colorPanel({ value: st.color, tab: 'custom', onBack: () => { st.custom = false; draw(); },
            onChange: (c) => { st.color = c; preview.replaceChildren(folderGlyph(st.color, st.iconId, st.emoji)); },
            onDone: (c) => { st.color = c; st.custom = false; draw(); } }));
        } else {
          body.append(paletteGrid({ value: st.color, onPick: (c) => { st.color = c; pushColorHistory(c); draw(); }, onCustom: () => { st.custom = true; draw(); } }));
        }
      } else {
        const grid = h('div', { class: 'fd-icons' });
        for (const [id, label, path] of FOLDER_ICONS) {
          const b = h('button', { type: 'button', class: 'fd-icon' + (st.iconId === id && !st.emoji ? ' active' : ''), title: label, 'aria-label': label }, icon(path));
          b.addEventListener('click', () => { st.iconId = id; st.emoji = ''; draw(); });
          grid.append(b);
        }
        const none = h('button', { type: 'button', class: 'fd-icon' + (!st.iconId && !st.emoji ? ' active' : ''), title: 'Sem ícone', 'aria-label': 'Sem ícone' }, icon(NO_ICON));
        none.addEventListener('click', () => { st.iconId = ''; st.emoji = ''; draw(); });
        grid.append(none);
        body.append(grid);
      }
    };
    draw();
    box.append(h('h2', {}, title), preview, input, tabs, body,
      h('div', { class: 'actions' },
        h('button', { class: 'btn ghost', type: 'button', onclick: () => close(undefined) }, 'Cancelar'),
        h('button', { class: 'btn primary', type: 'button', onclick: submit }, ok)));
  });
}
