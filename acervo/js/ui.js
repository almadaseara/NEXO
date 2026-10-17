// Componentes de interface: modais, menus, avisos.

export function h(tag, attrs = {}, ...children) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs || {})) {
    if (v == null || v === false) continue;
    if (k === 'class') el.className = v;
    else if (k === 'style' && typeof v === 'object') {
      for (const [sk, sv] of Object.entries(v)) {
        if (sk.startsWith('--')) el.style.setProperty(sk, sv);
        else el.style[sk] = sv;
      }
    }
    else if (k.startsWith('on') && typeof v === 'function') el.addEventListener(k.slice(2), v);
    else if (k === 'html') el.innerHTML = v;
    else el.setAttribute(k, v === true ? '' : v);
  }
  for (const c of children.flat()) {
    if (c == null || c === false) continue;
    el.append(c instanceof Node ? c : document.createTextNode(String(c)));
  }
  return el;
}

export function icon(path) {
  const span = document.createElement('span');
  span.innerHTML = `<svg viewBox="0 0 24 24">${path}</svg>`;
  return span.firstChild;
}

export const ICONS = {
  edit: '<path d="M4 20h4L19 9l-4-4L4 16z"/>',
  folder: '<path d="M3 7h6l2 2h10v10H3z"/>',
  trash: '<path d="M5 7h14M10 11v6M14 11v6M7 7l1 13h8l1-13M9 7V4h6v3"/>',
  copy: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V4H4v12h4"/>',
  pdf: '<path d="M7 3h7l5 5v13H7zM14 3v5h5"/>',
  star: '<path d="M12 4l2.4 5 5.6.6-4.2 3.8 1.2 5.5L12 16l-5 2.9 1.2-5.5L4 9.6 9.6 9z"/>',
  palette: '<path d="M12 3a9 9 0 1 0 0 18c1 0 1.5-.8 1.5-1.5 0-1.2-1-1.5-1-2.5s.8-1.5 2-1.5H17a4 4 0 0 0 4-4c0-4.7-4-8.5-9-8.5z"/><circle cx="7.5" cy="11" r="1"/><circle cx="10" cy="7" r="1"/><circle cx="15" cy="7" r="1"/>',
  page: '<path d="M7 3h10v18H7z"/>',
  up: '<path d="M12 19V5M6 11l6-6 6 6"/>',
  down: '<path d="M12 5v14M6 13l6 6 6-6"/>',
  template: '<path d="M5 3h14v18H5zM8 8h8M8 12h8M8 16h5"/>',
  check: '<path d="M5 12l5 5 9-10"/>',
  pen: '<path d="M4 20l1-5L16 4l4 4L9 19z"/>',
  hand: '<path d="M8 12V6a1.5 1.5 0 0 1 3 0v5V4.5a1.5 1.5 0 0 1 3 0V11V6a1.5 1.5 0 0 1 3 0v8a6 6 0 0 1-6 6h-1a6 6 0 0 1-4.6-2.2L3 14a1.5 1.5 0 0 1 2.3-1.9z"/>',
  clear: '<path d="M6 6l12 12M18 6L6 18"/>',
};

// ---------- Avisos ----------
export function toast(message, { action, onAction, duration = 3200 } = {}) {
  const root = document.getElementById('toast-root');
  const el = h('div', { class: 'toast', role: 'status' }, message);
  if (action) {
    el.append(h('button', { onclick: () => { onAction?.(); el.remove(); } }, action));
  }
  root.append(el);
  if (duration) setTimeout(() => el.remove(), duration);
  return el;
}

// ---------- Modais ----------
export function modal(build) {
  return new Promise((resolve) => {
    const root = document.getElementById('modal-root');
    const backdrop = h('div', { class: 'modal-backdrop' });
    const box = h('div', { class: 'modal', role: 'dialog', 'aria-modal': 'true' });
    backdrop.append(box);
    const close = (value) => {
      backdrop.remove();
      document.removeEventListener('keydown', onKey, true);
      resolve(value);
    };
    const onKey = (e) => {
      if (e.key === 'Escape') { e.stopPropagation(); close(undefined); }
    };
    document.addEventListener('keydown', onKey, true);
    backdrop.addEventListener('pointerdown', (e) => { if (e.target === backdrop) close(undefined); });
    build(box, close);
    root.append(backdrop);
    const first = box.querySelector('input:not([type=hidden]), textarea, select');
    if (first) setTimeout(() => { first.focus(); first.select?.(); }, 30);
  });
}

export function confirmDialog(title, message, { ok = 'Confirmar', danger = false } = {}) {
  return modal((box, close) => {
    box.append(
      h('h2', {}, title),
      h('p', {}, message),
      h('div', { class: 'actions' },
        h('button', { class: 'btn ghost', onclick: () => close(false) }, 'Cancelar'),
        h('button', { class: 'btn ' + (danger ? 'primary' : 'primary'), onclick: () => close(true) }, ok)),
    );
  }).then(Boolean);
}

export function promptDialog(title, { label = 'Nome', value = '', ok = 'Salvar' } = {}) {
  return modal((box, close) => {
    const input = h('input', { class: 'input', value });
    const submit = () => { const v = input.value.trim(); if (v) close(v); };
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') submit(); });
    box.append(
      h('h2', {}, title),
      h('div', { class: 'field' }, h('label', {}, label), input),
      h('div', { class: 'actions' },
        h('button', { class: 'btn ghost', onclick: () => close(undefined) }, 'Cancelar'),
        h('button', { class: 'btn primary', onclick: submit }, ok)),
    );
  });
}

export function progressDialog(title) {
  let setP, done;
  const p = modal((box, close) => {
    const bar = h('div');
    const label = h('p', {}, 'Preparando…');
    box.append(h('h2', {}, title), label, h('div', { class: 'progress' }, bar));
    setP = (frac, text) => { bar.style.width = Math.round(frac * 100) + '%'; if (text) label.textContent = text; };
    done = () => close(true);
  });
  return { set: (f, t) => setP(f, t), close: () => done(), promise: p };
}

// ---------- Menus ----------
let openMenu = null;
export function closeMenu() {
  if (openMenu) { openMenu.remove(); openMenu = null; }
}

// items: [{label, icon, onClick, danger, checked} | 'sep']
export function showMenu(anchor, items, { align = 'left' } = {}) {
  closeMenu();
  const menu = h('div', { class: 'menu', role: 'menu' });
  for (const it of items) {
    if (it === 'sep') { menu.append(h('hr')); continue; }
    if (!it) continue;
    const btn = h('button', { role: 'menuitem', class: it.danger ? 'danger' : '' },
      it.icon ? icon(ICONS[it.icon] || it.icon) : null, h('span', {}, it.label),
      it.checked ? h('span', { class: 'menu-check' }, '✓') : null);
    btn.addEventListener('click', (e) => { e.stopPropagation(); closeMenu(); it.onClick?.(); });
    menu.append(btn);
  }
  document.body.append(menu);
  const r = anchor.getBoundingClientRect ? anchor.getBoundingClientRect() : { left: anchor.x, right: anchor.x, bottom: anchor.y, top: anchor.y };
  const mw = menu.offsetWidth, mh = menu.offsetHeight;
  let x = align === 'right' ? r.right - mw : r.left;
  let y = r.bottom + 6;
  if (y + mh > innerHeight - 8) y = Math.max(8, r.top - mh - 6);
  x = Math.max(8, Math.min(x, innerWidth - mw - 8));
  menu.style.left = x + 'px';
  menu.style.top = y + 'px';
  openMenu = menu;
  setTimeout(() => {
    const off = (e) => { if (!menu.contains(e.target)) { closeMenu(); document.removeEventListener('pointerdown', off, true); } };
    document.addEventListener('pointerdown', off, true);
  });
  return menu;
}

// ---------- Utilidades ----------
export function download(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = h('a', { href: url, download: filename });
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

export function pickFile(inputId) {
  return new Promise((resolve) => {
    const input = document.getElementById(inputId);
    input.value = '';
    input.onchange = () => resolve(input.files[0] || null);
    input.click();
  });
}

export function safeFilename(name) {
  return (name || 'caderno').replace(/[\\/:*?"<>|]+/g, '-').trim().slice(0, 80) || 'caderno';
}

export function relativeDate(ts) {
  const d = new Date(ts);
  const diff = (Date.now() - ts) / 1000;
  if (diff < 60) return 'agora';
  if (diff < 3600) return `há ${Math.floor(diff / 60)} min`;
  if (diff < 86400) return `há ${Math.floor(diff / 3600)} h`;
  if (diff < 86400 * 7) return `há ${Math.floor(diff / 86400)} d`;
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: d.getFullYear() === new Date().getFullYear() ? undefined : 'numeric' });
}

export function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

export function normalize(s) {
  return String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}

// Trecho com o termo destacado (busca sem acento).
export function snippet(text, query, radius = 60) {
  const nt = normalize(text), nq = normalize(query);
  const i = nt.indexOf(nq);
  if (i < 0) return escapeHtml(text.slice(0, radius * 2));
  const start = Math.max(0, i - radius), end = Math.min(text.length, i + nq.length + radius);
  return (start > 0 ? '…' : '') + escapeHtml(text.slice(start, i)) + '<mark>' + escapeHtml(text.slice(i, i + nq.length)) + '</mark>' +
    escapeHtml(text.slice(i + nq.length, end)) + (end < text.length ? '…' : '');
}
