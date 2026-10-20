// Catálogo de capas de caderno (desenhadas em CSS/SVG, sem imagens externas).
import { h } from './ui.js';

const svgUrl = (w, hh, body) =>
  `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${hh}' viewBox='0 0 ${w} ${hh}'>${body}</svg>`)}")`;
const tile = (w, hh, body, bg, size = 1) => `${svgUrl(w, hh, body)} 0 0/${w * size}px ${hh * size}px, ${bg}`;
const top = (color, pct, rest) => `linear-gradient(${color} 0 ${pct}%, transparent ${pct}%), ${rest}`;

export const COVER_COLORS_CLASSIC = ['#244b48', '#24766b', '#437b99', '#7a4f9a', '#b8860b', '#a23b55', '#34495e', '#5a6b3a', '#d07a8f', '#4a90a4'];

// bg = fundo CSS; spine = cor da lombada (opcional); plain = sem etiqueta com o título
export const COVERS = [
  { group: 'Comum', id: 'none', label: 'Sem capa', none: true },
  { group: 'Comum', id: 'preto-integral', label: 'Preto integral simples', bg: '#383b47', spine: '#101114' },
  { group: 'Comum', id: 'preto-simples', label: 'Preto simples', bg: '#b09f86', spine: '#383b47' },
  { group: 'Comum', id: 'azul-bebe', label: 'Azul-bebé sólido', bg: '#a6c9f2', spine: '#2f86f6' },

  { group: 'Simples', id: 'simples', label: 'Simples', bg: '#b09f86', spine: '#f2f2f2' },
  { group: 'Simples', id: 'simples-amarelo', label: 'Simples amarelo', bg: '#b09f86', spine: '#fff44d' },
  { group: 'Simples', id: 'simples-integral', label: 'Preto integral', bg: '#383b47', spine: '#0d0d10' },
  { group: 'Simples', id: 'simples-preto', label: 'Preto', bg: '#b09f86', spine: '#2d3040' },
  { group: 'Simples', id: 'simples-azul', label: 'Azul simples', bg: '#b09f86', spine: '#8fb5f5' },

  { group: 'Liso', id: 'liso', label: 'Liso', bg: '#ffffff', spine: '#e6e6e6', light: true },
  { group: 'Liso', id: 'bege-liso', label: 'Bege liso', bg: '#e8d8c2', spine: '#d6c3a8', light: true },
  { group: 'Liso', id: 'cinza-escuro-liso', label: 'Cinzento-escuro liso', bg: '#64635f', spine: '#4c4b48' },
  { group: 'Liso', id: 'verde-liso', label: 'Verde liso', bg: '#a9b69f', spine: '#8e9d84' },
  { group: 'Liso', id: 'cinza-liso', label: 'Cinzento liso', bg: '#d2d2d2', spine: '#bdbdbd', light: true },

  { group: 'Padrões', id: 'pinceis', label: 'Pincéis', bg: `linear-gradient(118deg, transparent 0 16%, #e7cf70 16% 44%, transparent 44%), linear-gradient(62deg, transparent 0 52%, #94b3c6 52% 80%, transparent 80%), linear-gradient(170deg, transparent 0 70%, #f3b9c8 70% 86%, transparent 86%), #f7f1e6`, light: true },
  { group: 'Padrões', id: 'pontos', label: 'Pontos', bg: tile(60, 60, `<circle cx='14' cy='14' r='11' fill='#fff'/><circle cx='42' cy='40' r='7' fill='#fff'/><circle cx='50' cy='12' r='3' fill='#f0a04b'/><circle cx='8' cy='48' r='3' fill='#7cc4b0'/><circle cx='30' cy='26' r='2' fill='#444'/>`, '#ecebe6'), light: true },
  { group: 'Padrões', id: 'flores', label: 'Flores', bg: tile(70, 70, `<circle cx='18' cy='18' r='11' fill='#f5c542'/><circle cx='18' cy='18' r='4' fill='#e8833a'/><circle cx='50' cy='44' r='8' fill='#ee6b7e'/><circle cx='50' cy='44' r='3' fill='#fbd5a0'/><path d='M0 60q12-14 24 0M40 8q10 10 22 2' stroke='#1d6f6a' stroke-width='5' fill='none' stroke-linecap='round'/>`, '#fff'), light: true },
  { group: 'Padrões', id: 'sementes', label: 'Sementes', bg: tile(44, 44, `<ellipse cx='12' cy='14' rx='6' ry='11' fill='#eef0c8' stroke='#8aa07a' stroke-width='1.5' transform='rotate(-25 12 14)'/><ellipse cx='34' cy='34' rx='6' ry='11' fill='#eef0c8' stroke='#8aa07a' stroke-width='1.5' transform='rotate(25 34 34)'/>`, '#bfe6d4'), light: true },
  { group: 'Padrões', id: 'suave', label: 'Suave', bg: tile(34, 22, `<path d='M2 14l5-5 5 5 5-5 5 5 5-5' stroke='#d6a99b' stroke-width='1.4' fill='none'/><circle cx='17' cy='3' r='1.4' fill='#9fc3d6'/>`, '#f7f3ec'), light: true },

  { group: 'Castanho', id: 'cast-lista', label: 'Lista de verificação', bg: tile(44, 44, `<path d='M0 22H44M22 0V44' stroke='#2a2a2a' stroke-width='.8'/><circle cx='22' cy='22' r='2' fill='#2a2a2a'/>`, '#c9bda3') },
  { group: 'Castanho', id: 'cast-pontos', label: 'Pontos', bg: tile(30, 30, `<circle cx='8' cy='8' r='2' fill='#2c2c2c'/><circle cx='22' cy='20' r='2' fill='#fff'/>`, '#c9bda3') },
  { group: 'Castanho', id: 'cast-paus', label: 'Paus', bg: tile(56, 56, `<path d='M6 12l16-6M32 22l16 8M10 44l14-8M40 52l8-14' stroke='#fff' stroke-width='5' stroke-linecap='round'/>`, '#c9bda3') },
  { group: 'Castanho', id: 'cast-ondas', label: 'Ondas', bg: tile(48, 26, `<path d='M0 13q12-14 24 0t24 0' stroke='#fff' stroke-width='5' fill='none'/>`, '#c9bda3') },
  { group: 'Castanho', id: 'cast-zigue', label: 'Ziguezague', bg: tile(40, 40, `<path d='M0 40L20 6l20 34z' fill='#9d9172'/><path d='M0 0l20 34L40 0z' fill='#b3a789'/>`, '#a99d7d') },

  { group: 'Preto e branco', id: 'bw-circulo', label: 'Círculo e pontos', bg: tile(50, 50, `<circle cx='25' cy='25' r='16' fill='none' stroke='#fff' stroke-width='3' stroke-dasharray='2 3'/>`, '#0c0c0c') },
  { group: 'Preto e branco', id: 'bw-geo', label: 'Geométrico', bg: `repeating-linear-gradient(160deg, transparent 0 8px, #111 8px 9px), #f6f6f6`, light: true },
  { group: 'Preto e branco', id: 'bw-cartas', label: 'Cartas', bg: tile(26, 26, `<circle cx='6' cy='6' r='1.4' fill='#bdbdbd'/><circle cx='19' cy='19' r='1.4' fill='#bdbdbd'/>`, '#ffffff'), light: true },
  { group: 'Preto e branco', id: 'bw-ondas', label: 'Ondas de linha', bg: `repeating-linear-gradient(0deg, #222 0 1px, transparent 1px 5px) bottom/100% 45% no-repeat, #ffffff`, light: true },
  { group: 'Preto e branco', id: 'bw-ondas-preto', label: 'Ondas de linha (preto)', bg: `repeating-linear-gradient(0deg, #f0f0f0 0 1px, transparent 1px 5px) bottom/100% 45% no-repeat, #0b0b0b` },

  { group: 'Fechado', id: 'fechado-1', label: 'Fechado 1', bg: top('#f6f6f6', 38, 'linear-gradient(#6a6a70, #5b5b61)'), spine: '#e9e9e9', light: true },
  { group: 'Fechado', id: 'fechado-2', label: 'Fechado 2', bg: top('#f6f6f6', 38, 'linear-gradient(#9b5656, #4e3f4a)'), spine: '#e9e9e9', light: true },
  { group: 'Fechado', id: 'fechado-3', label: 'Fechado 3', bg: top('#f6f6f6', 38, 'linear-gradient(#6a7fc2, #3f4b66)'), spine: '#e9e9e9', light: true },
  { group: 'Fechado', id: 'fechado-4', label: 'Fechado 4', bg: top('#f6f6f6', 38, 'linear-gradient(#8a9a78, #566a52)'), spine: '#e9e9e9', light: true },
  { group: 'Fechado', id: 'fechado-5', label: 'Fechado 5', bg: top('#f6f6f6', 38, 'linear-gradient(#c4b6aa, #9a9a98)'), spine: '#e9e9e9', light: true },

  { group: 'Claro', id: 'claro-fluido', label: 'Fluido', bg: `radial-gradient(ellipse at 20% 30%, #fff 0 18%, transparent 40%), linear-gradient(135deg, #ffe2ee, #f9c8dd)`, light: true },
  { group: 'Claro', id: 'claro-goood', label: 'GOOOD', bg: `repeating-linear-gradient(8deg, transparent 0 10px, rgba(60,200,255,.65) 10px 11.5px), #13224a` },
  { group: 'Claro', id: 'claro-koi', label: 'Koi', bg: `radial-gradient(circle at 50% 100%, #fff5cf 0 14%, #f6c51a 14% 30%, #ef7a1a 30% 46%, #e0301b 46% 58%, #5598cc 58% 74%, #2f5da4 74% 88%, #ececec 88%)`, light: true },
  { group: 'Claro', id: 'claro-liquido', label: 'Líquido', bg: `radial-gradient(ellipse at 70% 80%, #ffd9c8 0 25%, transparent 55%), linear-gradient(160deg, #f9c9dd, #fbe3ea)`, light: true },
  { group: 'Claro', id: 'claro-lotus', label: 'Lótus', bg: tile(46, 46, `<rect x='4' y='4' width='18' height='18' rx='4' fill='#e05560'/><rect x='24' y='24' width='18' height='18' rx='4' fill='#37c28f'/><circle cx='33' cy='13' r='2.5' fill='#f2e46b'/>`, '#e2e4e0'), light: true },

  { group: 'Celebração', id: 'cel-flores', label: 'Flores', bg: top('#2c1a3e', 62, tile(40, 40, `<circle cx='10' cy='12' r='5' fill='#e3363b'/><circle cx='30' cy='28' r='5' fill='#e3363b'/><path d='M2 36q8-6 14 0' stroke='#b9503a' fill='none' stroke-width='2'/>`, '#d9c89c')), spine: '#f2f2f2' },
  { group: 'Celebração', id: 'cel-frutifero', label: 'Frutífero', bg: top('#2f5230', 62, tile(44, 44, `<circle cx='12' cy='14' r='8' fill='#f08a1c'/><circle cx='34' cy='32' r='8' fill='#f08a1c'/><path d='M2 40q8-8 16 0M26 8q8 6 16-2' stroke='#4c8a3a' stroke-width='3' fill='none'/>`, '#f7f0dc')), spine: '#f2f2f2' },
  { group: 'Celebração', id: 'cel-sorte', label: 'Sorte', bg: top('#8e1a1c', 62, tile(36, 36, `<rect x='9' y='4' width='18' height='26' rx='8' fill='#c7262a' stroke='#e8b8a0' stroke-width='1.5'/>`, '#a41e22')), spine: '#f2f2f2' },
  { group: 'Celebração', id: 'cel-riqueza', label: 'Riqueza', bg: top('#050505', 62, tile(44, 44, `<circle cx='12' cy='14' r='8' fill='#e3262c'/><circle cx='32' cy='30' r='8' fill='#fff'/><circle cx='12' cy='14' r='2.5' fill='#f2c94c'/>`, '#101010')), spine: '#f2f2f2' },

  ...COVER_COLORS_CLASSIC.map((c, i) => ({ group: 'Cores', id: 'cor-' + i, label: 'Cor ' + (i + 1), bg: c, spine: shadeDark(c) })),
];

function shadeDark(hex) {
  const n = parseInt(hex.slice(1), 16);
  const f = (v) => Math.round(v * 0.72).toString(16).padStart(2, '0');
  return '#' + f(n >> 16) + f((n >> 8) & 255) + f(n & 255);
}

export const COVER_GROUPS = [...new Set(COVERS.map((c) => c.group))];
const BY_ID = new Map(COVERS.map((c) => [c.id, c]));
export const DEFAULT_COVER_ID = 'simples';
export function coverPreset(id) { return BY_ID.get(id); }

// Capa salva no caderno: { id, color, pattern }. Cadernos antigos só têm color/pattern.
export function coverFromPreset(p) {
  return { id: p.id, color: p.none ? '#ffffff' : (p.spine || '#34495e'), pattern: p.none ? 'page' : 'plain' };
}

// Aplica o visual de uma capa a um elemento .cover. Devolve true quando é uma capa do catálogo.
export function applyCover(el, cover) {
  const p = cover?.id && BY_ID.get(cover.id);
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
