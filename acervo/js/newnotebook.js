// Diálogo "Novo caderno": título + capa + papel à esquerda, galerias à direita.
import { db } from './db.js';
import { h, icon, modal, confirmDialog } from './ui.js';
import { drawTemplate, PAGE_SIZES, PAPER_COLORS } from './render.js';
import { COVERS, COVER_GROUPS, coverThumb, coverPreset, coverFromPreset, applyCover, DEFAULT_COVER_ID } from './covers.js';

// Papéis em grupos. `spacing` ajusta o espaço entre as linhas.
export const PAPER_GALLERY = [
  { group: 'Básicos', items: [
    { id: 'blank', label: 'Branco', template: 'blank' },
    { id: 'dotted', label: 'Pontilhado', template: 'dotted' },
    { id: 'lined-narrow', label: 'Pautado estreito', template: 'lined', spacing: 0.75 },
    { id: 'lined-wide', label: 'Pautado largo', template: 'lined', spacing: 1.4 },
    { id: 'grid', label: 'Quadriculado', template: 'grid' },
  ] },
  { group: 'Para escrever e revisar', items: [
    { id: 'lined', label: 'Pautado com margem', template: 'lined', spacing: 1 },
    { id: 'cornell', label: 'Cornell', template: 'cornell' },
  ] },
  { group: 'Planejamento', items: [
    { id: 'checklist', label: 'Tarefas', template: 'checklist' },
    { id: 'planner', label: 'Planificador semanal', template: 'planner' },
    { id: 'monthly', label: 'Planificador mensal', template: 'monthly' },
    { id: 'yearly', label: 'Planificador anual', template: 'yearly' },
  ] },
  { group: 'Música', items: [
    { id: 'music', label: 'Partitura', template: 'music' },
    { id: 'tab', label: 'Tablatura de guitarra', template: 'tab' },
    { id: 'music-wide', label: 'Papel de música', template: 'music', spacing: 1.4 },
  ] },
];

const PAPER_FILTERS = [['white', 'Papel branco'], ['cream', 'Papel amarelo'], ['sepia', 'Papel sépia'], ['slate', 'Papel escuro']];
const LAND = { a4: 'a4-land', letter: 'letter-land' };
const PORT = { 'a4-land': 'a4', 'letter-land': 'letter' };

export function paperPreview(template, paper, size, spacing = 1, w = 96) {
  const s = PAGE_SIZES[size] || PAGE_SIZES.a4;
  const c = document.createElement('canvas');
  const scale = w / s.w;
  c.width = w * 2; c.height = Math.round(s.h * scale * 2);
  c.style.aspectRatio = `${s.w} / ${s.h}`;
  const ctx = c.getContext('2d');
  ctx.setTransform(scale * 2, 0, 0, scale * 2, 0, 0);
  drawTemplate(ctx, { width: s.w, height: s.h, template, paper, spacing });
  return c;
}

function paperKey(cfg) { return cfg.custom ? 'custom:' + cfg.custom : cfg.template + ':' + (cfg.spacing || 1); }

// cfg: { title, coverId, template, spacing, paper, size, custom }
// opts: { mode: 'full' | 'cover', heading, ok, importTemplate }
export function notebookSetupDialog(cfg, opts = {}) {
  const mode = opts.mode || 'full';
  cfg.coverId ||= DEFAULT_COVER_ID;
  cfg.spacing ??= 1;
  return modal((box, close) => {
    box.classList.add('nb-modal');
    if (mode === 'cover') box.classList.add('cover-only');
    let view = 'cover';
    let customs = [];
    const side = h('div', { class: 'nb-side' });
    const gallery = h('div', { class: 'nb-gallery' });
    const bar = h('div', { class: 'nb-bar' });
    const title = h('input', { class: 'input', placeholder: 'Caderno sem título', value: cfg.title || '', 'aria-label': 'Título do caderno' });
    title.addEventListener('input', () => { cfg.title = title.value; });
    const submit = () => { cfg.title = title.value.trim(); close(true); };
    title.addEventListener('keydown', (e) => { if (e.key === 'Enter') submit(); });

    if (mode === 'full') db.all('templates').then((l) => { customs = l.sort((a, b) => b.createdAt - a.createdAt); if (view === 'paper') drawGallery(); });

    const coverPreview = () => {
      const p = coverPreset(cfg.coverId);
      const el = h('div', { class: 'cover cover-big' + (p?.none ? ' cover-none' : '') });
      if (p && !p.none) { applyCover(el, { id: p.id }); el.append(h('div', { class: 'cover-label' }, cfg.title || 'Caderno sem título')); }
      else el.append(h('span', { class: 'cover-none-label' }, 'Sem capa'));
      return el;
    };
    const drawSide = () => {
      const coverBtn = h('button', { type: 'button', class: 'nb-pick' + (view === 'cover' ? ' active' : ''), 'aria-label': 'Escolher capa' },
        coverPreview(), h('span', {}, coverPreset(cfg.coverId)?.label || 'Capa'));
      coverBtn.addEventListener('click', () => { view = 'cover'; refresh(); });
      const hasCover = cfg.coverId !== 'none';
      const toggle = h('label', { class: 'nb-toggle' }, h('input', { type: 'checkbox', checked: hasCover, 'aria-label': 'Usar capa' }), h('span', {}, 'Com capa'));
      toggle.querySelector('input').addEventListener('change', (e) => {
        if (e.target.checked) cfg.coverId = cfg._prevCover && cfg._prevCover !== 'none' ? cfg._prevCover : DEFAULT_COVER_ID;
        else { cfg._prevCover = cfg.coverId; cfg.coverId = 'none'; }
        refresh();
      });
      const kids = [h('div', { class: 'nb-field' }, h('label', {}, 'Título'), title), h('div', { class: 'nb-field' }, h('label', {}, 'Capa'), coverBtn, toggle)];
      if (mode === 'full') {
        const label = cfg.custom ? (customs.find((t) => t.id === cfg.custom)?.name || 'Modelo') : (PAPER_GALLERY.flatMap((g) => g.items).find((i) => i.template === cfg.template && (i.spacing || 1) === (cfg.spacing || 1))?.label || 'Papel');
        const pBtn = h('button', { type: 'button', class: 'nb-pick' + (view === 'paper' ? ' active' : ''), 'aria-label': 'Escolher papel' },
          cfg.custom && customs.find((t) => t.id === cfg.custom)
            ? h('img', { class: 'paper-prev', src: customs.find((t) => t.id === cfg.custom).thumb, alt: '' })
            : paperPreview(cfg.template, cfg.paper, cfg.size, cfg.spacing, 120), h('span', {}, label));
        pBtn.addEventListener('click', () => { view = 'paper'; refresh(); });
        kids.push(h('div', { class: 'nb-field' }, h('label', {}, 'Papel'), pBtn));
      }
      side.replaceChildren(...kids);
    };

    const drawBar = () => {
      bar.replaceChildren();
      if (view !== 'paper') return;
      const sel = h('select', { class: 'input nb-select', 'aria-label': 'Cor do papel' },
        ...PAPER_FILTERS.map(([k, label]) => h('option', { value: k, selected: cfg.paper === k }, label)));
      sel.addEventListener('change', () => { cfg.paper = sel.value; refresh(); });
      const size = h('select', { class: 'input nb-select', 'aria-label': 'Tamanho da página' },
        ...Object.entries(PAGE_SIZES).map(([k, s]) => h('option', { value: k, selected: cfg.size === k }, s.label)));
      size.addEventListener('change', () => { cfg.size = size.value; refresh(); });
      const land = !!PORT[cfg.size];
      const orient = h('div', { class: 'seg nb-orient', role: 'group', 'aria-label': 'Orientação' },
        h('button', { type: 'button', class: !land ? 'active' : '', title: 'Retrato', 'aria-label': 'Retrato', onclick: () => { if (PORT[cfg.size]) { cfg.size = PORT[cfg.size]; refresh(); } } },
          icon('<rect x="7" y="3" width="10" height="18" rx="2"/>')),
        h('button', { type: 'button', class: land ? 'active' : '', title: 'Paisagem', 'aria-label': 'Paisagem', onclick: () => { if (LAND[cfg.size]) { cfg.size = LAND[cfg.size]; refresh(); } } },
          icon('<rect x="3" y="7" width="18" height="10" rx="2"/>')));
      bar.append(sel, size, orient);
    };

    const section = (name, ...items) => h('section', { class: 'gal-section' }, h('h3', {}, name), h('div', { class: 'gal-grid' }, ...items));

    const drawGallery = () => {
      if (view === 'cover') {
        gallery.replaceChildren(...COVER_GROUPS.map((g) => section(g, ...COVERS.filter((c) => c.group === g)
          .map((p) => coverThumb(p, { active: cfg.coverId === p.id, onPick: (x) => { cfg.coverId = x.id; refresh(); } })))));
        return;
      }
      const cur = paperKey(cfg);
      const secs = PAPER_GALLERY.map((g) => section(g.group, ...g.items.map((it) => {
        const active = !cfg.custom && cur === it.template + ':' + (it.spacing || 1);
        const dots = h('span', { class: 'paper-dots' }, ...[['cream', 'Amarelo'], ['white', 'Branco'], ['slate', 'Escuro']].map(([k, name]) =>
          h('span', { class: 'paper-dot' + (cfg.paper === k ? ' on' : ''), role: 'button', title: name, 'aria-label': 'Papel ' + name.toLowerCase(), 'data-paper': k, style: { background: PAPER_COLORS[k].bg } })));
        const b = h('button', { type: 'button', class: 'gal-item paper' + (active ? ' active' : ''), title: it.label, 'aria-pressed': String(active) },
          paperPreview(it.template, cfg.paper, cfg.size, it.spacing || 1), h('span', { class: 'gal-label' }, it.label), dots);
        b.addEventListener('click', (e) => {
          const dot = e.target.closest?.('.paper-dot');
          if (dot) cfg.paper = dot.dataset.paper;
          cfg.template = it.template; cfg.spacing = it.spacing || 1; cfg.custom = null; refresh();
        });
        return b;
      })));
      const mine = customs.map((t) => {
        const active = cfg.custom === t.id;
        const b = h('button', { type: 'button', class: 'gal-item paper' + (active ? ' active' : ''), title: t.name + ' (botão direito para excluir)', 'aria-pressed': String(active) },
          h('img', { class: 'paper-prev', src: t.thumb, alt: '' }), h('span', { class: 'gal-label' }, t.name));
        b.addEventListener('click', () => { cfg.custom = t.id; refresh(); });
        b.addEventListener('contextmenu', async (e) => {
          e.preventDefault();
          if (await confirmDialog('Excluir modelo?', 'O modelo sai da lista. Páginas que já o usam não mudam.', { ok: 'Excluir' })) {
            await db.delete('templates', t.id);
            customs = customs.filter((x) => x !== t);
            if (cfg.custom === t.id) cfg.custom = null;
            refresh();
          }
        });
        return b;
      });
      if (opts.importTemplate) {
        const add = h('button', { type: 'button', class: 'gal-item paper add' }, h('span', { class: 'gal-plus' }, '+'), h('span', { class: 'gal-label' }, 'Importar imagem ou PDF'));
        add.addEventListener('click', async () => { const t = await opts.importTemplate(); if (t) { customs.unshift(t); cfg.custom = t.id; refresh(); } });
        mine.push(add);
      }
      secs.push(section('Meus modelos', ...mine));
      gallery.replaceChildren(...secs);
    };

    const refresh = () => {
      const top = gallery.scrollTop;
      drawSide(); drawBar(); drawGallery();
      gallery.scrollTop = top;
    };
    refresh();

    box.append(
      h('div', { class: 'nb-head' }, h('h2', {}, opts.heading || 'Novo caderno')),
      h('div', { class: 'nb-body' }, side, h('div', { class: 'nb-main' }, bar, gallery)),
      h('div', { class: 'nb-foot' },
        h('button', { class: 'btn ghost', type: 'button', onclick: () => close(false) }, 'Cancelar'),
        h('button', { class: 'btn primary', type: 'button', onclick: submit }, opts.ok || 'Criar caderno')));
  });
}

export { coverFromPreset, DEFAULT_COVER_ID };
