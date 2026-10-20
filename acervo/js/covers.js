// Catálogo de capas de caderno (desenhadas em CSS/SVG, sem imagens externas).
import { h } from './ui.js';

const svgUrl = (w, hh, body) =>
  `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${hh}' viewBox='0 0 ${w} ${hh}'>${body}</svg>`)}")`;
const tile = (w, hh, body, bg, size = 1) => `${svgUrl(w, hh, body)} 0 0/${w * size}px ${hh * size}px, ${bg}`;
const top = (color, pct, rest) => `linear-gradient(${color} 0 ${pct}%, transparent ${pct}%), ${rest}`;

export const COVER_COLORS_CLASSIC = ['#244b48', '#24766b', '#437b99', '#7a4f9a', '#b8860b', '#a23b55', '#34495e', '#5a6b3a', '#d07a8f', '#4a90a4'];

// bg = fundo CSS; spine = cor da lombada (opcional); light = capa clara (texto escuro)
export const COVERS = [
  { group: 'Básicas', id: 'none', label: 'Sem capa', none: true },
  { group: 'Básicas', id: 'nexo-verde', label: 'Verde NEXO', bg: '#244b48', spine: '#173331' },
  { group: 'Básicas', id: 'grafite', label: 'Grafite', bg: '#3a3f4a', spine: '#23262d' },
  { group: 'Básicas', id: 'areia', label: 'Areia', bg: '#d4c7a8', spine: '#b3a47c', light: true },
  { group: 'Básicas', id: 'oceano', label: 'Oceano', bg: '#2f6f8f', spine: '#1f4d66' },
  { group: 'Básicas', id: 'vinho', label: 'Vinho', bg: '#7a2c3d', spine: '#531d2a' },
  { group: 'Básicas', id: 'papel', label: 'Papel', bg: '#fbfaf6', spine: '#e2dfd5', light: true },

  { group: 'Estudo', id: 'gabarito', label: 'Gabarito', bg: tile(36, 28, `<circle cx='9' cy='7' r='4.2' fill='none' stroke='#6b7b8c' stroke-width='1.2'/><circle cx='20' cy='7' r='4.2' fill='#2a3f55'/><circle cx='31' cy='7' r='4.2' fill='none' stroke='#6b7b8c' stroke-width='1.2'/><circle cx='9' cy='21' r='4.2' fill='#2a3f55'/><circle cx='20' cy='21' r='4.2' fill='none' stroke='#6b7b8c' stroke-width='1.2'/><circle cx='31' cy='21' r='4.2' fill='none' stroke='#6b7b8c' stroke-width='1.2'/>`, '#f4f1e8'), spine: '#c9c4b4', light: true },
  { group: 'Estudo', id: 'paragrafo', label: 'Parágrafo', bg: tile(44, 44, `<text x='22' y='30' text-anchor='middle' font-family='Georgia,serif' font-size='26' fill='#3f7f73' opacity='.55'>§</text>`, '#1d3d3a'), spine: '#122826' },
  { group: 'Estudo', id: 'balanca', label: 'Balança', bg: tile(54, 54, `<g fill='none' stroke='#9fb7d4' stroke-width='1.6' stroke-linecap='round' opacity='.6'><path d='M27 12v28M20 40h14M14 17h26M14 17l-5 11a5 5 0 0 0 10 0zM40 17l-5 11a5 5 0 0 0 10 0z'/></g>`, '#1c2b44'), spine: '#111b2c' },
  { group: 'Estudo', id: 'escudo', label: 'Escudo', bg: tile(48, 54, `<path d='M24 8l13 5v10c0 9-6 15-13 18C17 38 11 32 11 23V13z' fill='none' stroke='#c9a24a' stroke-width='1.6' opacity='.65'/><path d='M18 24l4 4 8-9' fill='none' stroke='#c9a24a' stroke-width='1.8' opacity='.65'/>`, '#2a2f3a'), spine: '#181b22' },
  { group: 'Estudo', id: 'lupa', label: 'Lupa', bg: tile(50, 50, `<g fill='none' stroke='#b6865a' stroke-width='2' stroke-linecap='round' opacity='.7'><circle cx='22' cy='22' r='9'/><path d='M29 29l9 9'/></g>`, '#f3ead8'), spine: '#d6c6a4', light: true },
  { group: 'Estudo', id: 'revisado', label: 'Revisado', bg: tile(40, 40, `<path d='M8 21l7 7 15-17' fill='none' stroke='#2f8f6f' stroke-width='3' stroke-linecap='round' stroke-linejoin='round' opacity='.55'/>`, '#e3f2ea'), spine: '#a9d2bd', light: true },
  { group: 'Estudo', id: 'curvas', label: 'Curvas de nível', bg: `repeating-radial-gradient(circle at 70% 35%, transparent 0 14px, rgba(255,255,255,.22) 14px 15.5px), repeating-radial-gradient(circle at 20% 85%, transparent 0 18px, rgba(255,255,255,.14) 18px 19.5px), #1f6b6a`, spine: '#134646' },
  { group: 'Estudo', id: 'colmeia', label: 'Colmeia', bg: tile(42, 36, `<path d='M14 2l14 0 7 12-7 12H14L7 14z' fill='none' stroke='#e8c46a' stroke-width='1.4' opacity='.55'/>`, '#3b2f4f'), spine: '#241c33' },

  { group: 'Degradês', id: 'amanhecer', label: 'Amanhecer', bg: 'linear-gradient(160deg, #ffb36b, #e8607a 70%, #8a3f7a)', spine: '#6e2f60' },
  { group: 'Degradês', id: 'mare', label: 'Maré', bg: 'linear-gradient(160deg, #54c4b0, #2b7fa8 55%, #1a2f5c)', spine: '#13224a' },
  { group: 'Degradês', id: 'aurora', label: 'Aurora', bg: 'linear-gradient(160deg, #8de08a, #3aa58a 45%, #5a3f9a)', spine: '#3c2a70' },
  { group: 'Degradês', id: 'crepusculo', label: 'Crepúsculo', bg: 'linear-gradient(160deg, #6c63d9, #a2479c 60%, #e0607e)', spine: '#6a2d66' },
  { group: 'Degradês', id: 'nevoa', label: 'Névoa', bg: 'linear-gradient(160deg, #eef2f6, #bfcddd 70%, #9aaec6)', spine: '#8497b0', light: true },

  { group: 'Faixas', id: 'faixa-grafite', label: 'Faixa grafite', bg: top('#f6f6f4', 36, 'linear-gradient(#585d68, #3a3f4a)'), spine: '#e4e4e0', light: true },
  { group: 'Faixas', id: 'faixa-vinho', label: 'Faixa vinho', bg: top('#f6f6f4', 36, 'linear-gradient(#9c4357, #5c2233)'), spine: '#e4e4e0', light: true },
  { group: 'Faixas', id: 'faixa-azul', label: 'Faixa azul', bg: top('#f6f6f4', 36, 'linear-gradient(#4f86b8, #25466b)'), spine: '#e4e4e0', light: true },
  { group: 'Faixas', id: 'faixa-verde', label: 'Faixa verde', bg: top('#f6f6f4', 36, 'linear-gradient(#4d9a82, #215043)'), spine: '#e4e4e0', light: true },

  ...COVER_COLORS_CLASSIC.map((c, i) => ({ group: 'Cores', id: 'cor-' + i, label: 'Cor ' + (i + 1), bg: c, spine: shadeDark(c) })),
];

function shadeDark(hex) {
  const n = parseInt(hex.slice(1), 16);
  const f = (v) => Math.round(v * 0.72).toString(16).padStart(2, '0');
  return '#' + f(n >> 16) + f((n >> 8) & 255) + f(n & 255);
}

export const COVER_GROUPS = [...new Set(COVERS.map((c) => c.group))];
const BY_ID = new Map(COVERS.map((c) => [c.id, c]));
export const DEFAULT_COVER_ID = 'nexo-verde';
// Ids de capas de uma versão anterior do catálogo apontam para as equivalentes atuais.
const LEGACY = { simples: 'areia', 'simples-amarelo': 'areia', 'simples-integral': 'grafite', 'simples-preto': 'grafite', 'simples-azul': 'oceano',
  'preto-integral': 'grafite', 'preto-simples': 'grafite', 'azul-bebe': 'oceano', liso: 'papel', 'bege-liso': 'areia', 'cinza-escuro-liso': 'grafite',
  'verde-liso': 'nexo-verde', 'cinza-liso': 'nevoa' };
export function coverPreset(id) { return BY_ID.get(id) || BY_ID.get(LEGACY[id]); }

// Capa salva no caderno: { id, color, pattern }. Cadernos antigos só têm color/pattern.
export function coverFromPreset(p) {
  return { id: p.id, color: p.none ? '#ffffff' : (p.spine || '#34495e'), pattern: p.none ? 'page' : 'plain' };
}

// Aplica o visual de uma capa a um elemento .cover. Devolve true quando é uma capa do catálogo.
export function applyCover(el, cover) {
  const p = cover?.id && coverPreset(cover.id);
  if (!p || p.none) return false;
  el.classList.add('preset');
  el.style.background = p.bg;
  el.style.setProperty('--spine', p.spine || 'rgba(0,0,0,.18)');
  el.classList.toggle('light-cover', !!p.light);
  return true;
}

// Miniatura de capa para a galeria.
export function coverThumb(p, { active = false, onPick } = {}) {
  const cover = h('div', { class: 'cover cover-mini' + (p.none ? ' cover-none' : '') });
  if (!p.none) applyCover(cover, { id: p.id });
  const b = h('button', { type: 'button', class: 'gal-item' + (active ? ' active' : ''), title: p.label, 'aria-label': p.label, 'aria-pressed': String(active) },
    cover, h('span', { class: 'gal-label' }, p.label));
  if (onPick) b.addEventListener('click', () => onPick(p));
  return b;
}
