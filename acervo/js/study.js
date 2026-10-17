// Estudo: baralhos de flashcards com repetição espaçada (algoritmo SM-2 simplificado).
import { db, uid } from './db.js';
import { h, icon, modal, confirmDialog, promptDialog, showMenu, toast } from './ui.js';
import { loadImage } from './render.js';

const DAY = 86400000;
let onOpenSource = () => {};

export function initStudy(opts) {
  onOpenSource = opts.onOpenSource || onOpenSource;
}

// ---------- Agendamento ----------
export const GRADES = [
  { key: 'again', label: 'Errei', hint: '1', cls: 'g-again' },
  { key: 'hard', label: 'Difícil', hint: '2', cls: 'g-hard' },
  { key: 'good', label: 'Bom', hint: '3', cls: 'g-good' },
  { key: 'easy', label: 'Fácil', hint: '4', cls: 'g-easy' },
];

export function schedule(card, grade, now = Date.now()) {
  const c = { ...card };
  c.ease ??= 2.5; c.interval ??= 0; c.reps ??= 0; c.lapses ??= 0;
  if (grade === 'again') {
    c.reps = 0; c.lapses++; c.interval = 0;
    c.ease = Math.max(1.3, c.ease - 0.2);
    c.due = now + 10 * 60000; // revê em 10 minutos
  } else {
    let iv;
    if (grade === 'hard') { iv = c.reps === 0 ? 1 : Math.max(1, Math.round(c.interval * 1.2)); c.ease = Math.max(1.3, c.ease - 0.15); }
    else if (grade === 'good') iv = c.reps === 0 ? 1 : c.reps === 1 ? 3 : Math.round(c.interval * c.ease);
    else { iv = c.reps === 0 ? 4 : Math.round(Math.max(c.interval, 1) * c.ease * 1.3); c.ease += 0.15; }
    c.interval = Math.max(1, iv);
    c.reps++;
    c.due = now + c.interval * DAY;
  }
  c.lastReview = now;
  return c;
}

function intervalLabel(card, grade) {
  const n = schedule(card, grade);
  const ms = n.due - Date.now();
  if (ms < 3600000) return `${Math.max(1, Math.round(ms / 60000))} min`;
  const d = Math.round(ms / DAY);
  if (d < 30) return `${d} d`;
  if (d < 365) return `${Math.round(d / 30)} m`;
  return `${(d / 365).toFixed(1)} a`;
}

// ---------- Dados ----------
export async function allDecks() {
  return (await db.all('decks')).sort((a, b) => a.title.localeCompare(b.title, 'pt-BR'));
}

export async function deckCards(deckId) {
  return db.byIndex('cards', 'deckId', deckId);
}

export async function dueCards(deckId) {
  const now = Date.now();
  const cards = deckId ? await deckCards(deckId) : await db.all('cards');
  return cards.filter((c) => (c.due ?? 0) <= now).sort((a, b) => (a.due ?? 0) - (b.due ?? 0));
}

export async function studyDueCount() {
  return (await dueCards()).length;
}

export async function ensureNotebookDeck(nb) {
  const decks = await db.all('decks');
  let d = decks.find((x) => x.notebookId === nb.id);
  if (!d) {
    d = { id: uid(), title: nb.title, notebookId: nb.id, color: nb.cover?.color || '#2f6f8f', createdAt: Date.now() };
    await db.put('decks', d);
  }
  return d;
}

export async function addCards(deckId, sides, source) {
  const now = Date.now();
  const cards = sides.map(({ front, back }) => ({
    id: uid(), deckId, front, back, source: source || null, due: now, interval: 0, ease: 2.5, reps: 0, lapses: 0, createdAt: now,
  }));
  await db.putMany('cards', cards);
  return cards;
}

// ---------- Exibição de um lado do cartão ----------
function sideEl(side) {
  const box = h('div', { class: 'card-side' });
  if (side?.assetId) {
    const img = h('img', { alt: '' });
    loadImage(side.assetId).then((r) => { if (r) img.src = r.url; });
    box.append(img);
  }
  if (side?.text) box.append(h('div', { class: 'card-text' }, side.text));
  if (!side?.assetId && !side?.text) box.append(h('div', { class: 'card-text muted' }, '(vazio)'));
  return box;
}

// ---------- Criar cartão ----------
// front/back: { text?, assetId? }. Quando faltar um lado, o usuário digita.
export async function createCardDialog({ front = {}, back = {}, notebook, source } = {}) {
  const decks = await allDecks();
  let deckId = null;
  if (notebook) deckId = (await ensureNotebookDeck(notebook)).id;
  else deckId = decks[0]?.id;
  if (!deckId) {
    const d = { id: uid(), title: 'Geral', color: '#7a4f9a', createdAt: Date.now() };
    await db.put('decks', d);
    deckId = d.id;
  }
  const res = await modal((box, close) => {
    const select = h('select', { class: 'select' });
    const refreshDecks = async () => {
      const list = await allDecks();
      select.replaceChildren(...list.map((d) => h('option', { value: d.id, selected: d.id === deckId ? 'selected' : null }, d.title)));
    };
    refreshDecks();
    const newDeck = h('button', { class: 'btn', type: 'button' }, 'Novo baralho');
    newDeck.addEventListener('click', async () => {
      const t = await promptDialog('Novo baralho', { label: 'Nome', ok: 'Criar' });
      if (!t) return;
      const d = { id: uid(), title: t, color: '#7a4f9a', createdAt: Date.now() };
      await db.put('decks', d);
      deckId = d.id;
      refreshDecks();
    });
    const frontText = h('textarea', { class: 'input area', rows: 2, placeholder: front.assetId ? 'Legenda (opcional)' : 'Pergunta' });
    frontText.value = front.text || '';
    const backText = h('textarea', { class: 'input area', rows: 3, placeholder: back.assetId ? 'Legenda (opcional)' : 'Resposta' });
    backText.value = back.text || '';
    const preview = (side) => (side.assetId ? sideEl({ assetId: side.assetId }) : null);
    const submit = () => {
      const f = { ...front, text: frontText.value.trim() || undefined };
      const b = { ...back, text: backText.value.trim() || undefined };
      if (!f.text && !f.assetId) { frontText.focus(); return; }
      if (!b.text && !b.assetId) { backText.focus(); return; }
      close({ front: f, back: b, deckId: select.value });
    };
    box.append(
      h('h2', {}, 'Novo flashcard'),
      h('div', { class: 'field' }, h('label', {}, 'Baralho'), h('div', { class: 'row-inline' }, select, newDeck)),
      h('div', { class: 'field' }, h('label', {}, 'Frente'), preview(front), frontText),
      h('div', { class: 'field' }, h('label', {}, 'Verso'), preview(back), backText),
      h('div', { class: 'actions' },
        h('button', { class: 'btn ghost', onclick: () => close() }, 'Cancelar'),
        h('button', { class: 'btn primary', onclick: submit }, 'Criar cartão')));
  });
  if (!res) return null;
  const [card] = await addCards(res.deckId, [{ front: res.front, back: res.back }], source);
  toast('Flashcard criado');
  return card;
}

// ---------- Sessão de revisão ----------
export async function startReview(deckId) {
  const queue = await dueCards(deckId);
  if (!queue.length) { toast('Nada para revisar agora. Volte mais tarde!'); return; }
  let done = 0, correct = 0;
  const total = queue.length;
  await modal((box, close) => {
    box.classList.add('review');
    const progress = h('div', { class: 'progress' }, h('div'));
    const counter = h('span', { class: 'muted' });
    const stage = h('div', { class: 'review-stage' });
    const controls = h('div', { class: 'review-controls' });
    box.append(h('div', { class: 'review-top' }, h('h2', {}, 'Revisão'), counter, h('button', { class: 'icon-btn', onclick: () => close() }, icon('<path d="M6 6l12 12M18 6L6 18"/>'))), progress, stage, controls);
    let card = null, revealed = false;

    const next = () => {
      card = queue.shift();
      revealed = false;
      progress.firstChild.style.width = (done / total) * 100 + '%';
      counter.textContent = `${done} de ${total}`;
      if (!card) return finish();
      stage.replaceChildren(h('div', { class: 'review-label' }, 'Pergunta'), sideEl(card.front));
      if (card.source) {
        const link = h('button', { class: 'btn ghost small-btn' }, 'Abrir no caderno');
        link.addEventListener('click', () => { close(); onOpenSource(card.source); });
        stage.append(link);
      }
      controls.replaceChildren(h('button', { class: 'btn primary wide', onclick: reveal }, 'Mostrar resposta (espaço)'));
    };
    const reveal = () => {
      if (!card || revealed) return;
      revealed = true;
      stage.append(h('hr'), h('div', { class: 'review-label' }, 'Resposta'), sideEl(card.back));
      controls.replaceChildren(...GRADES.map((g) => {
        const b = h('button', { class: 'btn grade ' + g.cls }, h('b', {}, g.label), h('small', {}, intervalLabel(card, g.key)));
        b.addEventListener('click', () => grade(g.key));
        return b;
      }));
    };
    const grade = async (g) => {
      const updated = schedule(card, g);
      await db.put('cards', updated);
      if (g === 'again') queue.push(updated); // volta para o fim da fila
      else { done++; if (g !== 'hard') correct++; }
      next();
    };
    const finish = () => {
      stage.replaceChildren(h('div', { class: 'review-done' },
        h('div', { class: 'big' }, '🎉'), h('h2', {}, 'Revisão concluída'),
        h('p', {}, `${total} cartões revisados · ${Math.round((correct / Math.max(1, total)) * 100)}% de acertos de primeira.`)));
      controls.replaceChildren(h('button', { class: 'btn primary wide', onclick: () => close() }, 'Fechar'));
      document.removeEventListener('keydown', onKey, true);
    };
    const onKey = (e) => {
      if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); e.stopPropagation(); if (!revealed) reveal(); }
      if (revealed && ['1', '2', '3', '4'].includes(e.key)) { e.preventDefault(); grade(GRADES[Number(e.key) - 1].key); }
    };
    document.addEventListener('keydown', onKey, true);
    const obs = new MutationObserver(() => { if (!box.isConnected) { document.removeEventListener('keydown', onKey, true); obs.disconnect(); } });
    setTimeout(() => obs.observe(document.getElementById('modal-root'), { childList: true }), 0);
    next();
  });
}

// ---------- Tela "Estudar" na biblioteca ----------
export async function renderStudyView(content, refresh) {
  const decks = await allDecks();
  const cards = await db.all('cards');
  const now = Date.now();
  const due = cards.filter((c) => (c.due ?? 0) <= now);
  const learned = cards.filter((c) => (c.interval ?? 0) >= 21).length;
  content.replaceChildren();
  const stats = h('div', { class: 'stats' },
    stat(due.length, 'para revisar hoje'),
    stat(cards.length, 'cartões no total'),
    stat(learned, 'bem aprendidos (21+ dias)'),
    stat(decks.length, 'baralhos'));
  const actions = h('div', { class: 'row-inline', style: { margin: '18px 0 8px' } },
    h('button', { class: 'btn primary', disabled: due.length ? null : 'disabled', onclick: async () => { await startReview(); refresh(); } }, `Estudar tudo (${due.length})`),
    h('button', { class: 'btn', onclick: async () => {
      const t = await promptDialog('Novo baralho', { label: 'Nome', ok: 'Criar' });
      if (t) { await db.put('decks', { id: uid(), title: t, color: '#7a4f9a', createdAt: Date.now() }); refresh(); }
    } }, 'Novo baralho'),
    h('button', { class: 'btn', onclick: async () => { if (await createCardDialog()) refresh(); } }, 'Novo cartão'));
  content.append(stats, actions);
  if (!decks.length) {
    content.append(h('div', { class: 'empty' }, h('div', {},
      h('h2', {}, 'Comece a estudar com flashcards'),
      h('div', {}, 'No caderno, contorne algo com o laço e toque em “Flashcard”. Ou peça à IA para gerar cartões a partir das suas anotações.'))));
    return;
  }
  const list = h('div', { class: 'results' });
  for (const d of decks) {
    const dc = cards.filter((c) => c.deckId === d.id);
    const dd = dc.filter((c) => (c.due ?? 0) <= now).length;
    const row = h('div', { class: 'result' },
      h('div', { class: 'swatch', style: { background: d.color || '#7a4f9a' } }),
      h('div', { style: { flex: 1 } }, h('div', { class: 'r-title' }, d.title), h('div', { class: 'r-snip' }, `${dc.length} cartões · ${dd} para hoje`)),
      h('button', { class: 'btn primary', disabled: dd ? null : 'disabled', onclick: async (e) => { e.stopPropagation(); await startReview(d.id); refresh(); } }, 'Estudar'));
    const more = h('button', { class: 'icon-btn small', 'aria-label': 'Opções' }, icon('<circle cx="5" cy="12" r="1.3"/><circle cx="12" cy="12" r="1.3"/><circle cx="19" cy="12" r="1.3"/>'));
    more.addEventListener('click', (e) => {
      e.stopPropagation();
      showMenu(more, [
        { label: 'Ver cartões', icon: 'page', onClick: () => deckDialog(d, refresh) },
        { label: 'Renomear', icon: 'edit', onClick: async () => { const t = await promptDialog('Renomear baralho', { value: d.title }); if (t) { d.title = t; await db.put('decks', d); refresh(); } } },
        'sep',
        { label: 'Excluir baralho', icon: 'trash', danger: true, onClick: async () => {
          if (!(await confirmDialog('Excluir baralho?', `“${d.title}” e seus ${dc.length} cartões serão apagados.`, { ok: 'Excluir' }))) return;
          for (const c of dc) await db.delete('cards', c.id);
          await db.delete('decks', d.id);
          refresh();
        } },
      ], { align: 'right' });
    });
    row.append(more);
    row.addEventListener('click', () => deckDialog(d, refresh));
    list.append(row);
  }
  content.append(list);
}

function stat(n, label) {
  return h('div', { class: 'stat' }, h('b', {}, String(n)), h('span', {}, label));
}

async function deckDialog(deck, refresh) {
  const cards = (await deckCards(deck.id)).sort((a, b) => a.createdAt - b.createdAt);
  await modal((box, close) => {
    box.classList.add('wide-modal');
    const list = h('div', { class: 'card-list' });
    const draw = () => {
      list.replaceChildren(...cards.map((c) => {
        const del = h('button', { class: 'icon-btn small', title: 'Excluir', 'aria-label': 'Excluir cartão' }, icon('<path d="M5 7h14M10 11v6M14 11v6M7 7l1 13h8l1-13M9 7V4h6v3"/>'));
        del.addEventListener('click', async () => { await db.delete('cards', c.id); cards.splice(cards.indexOf(c), 1); draw(); });
        const nextDue = (c.due ?? 0) <= Date.now() ? 'hoje' : new Date(c.due).toLocaleDateString('pt-BR');
        return h('div', { class: 'card-row' }, sideEl(c.front), sideEl(c.back),
          h('div', { class: 'card-meta-col' }, h('small', { class: 'muted' }, `Próxima: ${nextDue}`), del));
      }));
      if (!cards.length) list.append(h('p', {}, 'Este baralho ainda não tem cartões.'));
    };
    draw();
    box.append(h('h2', {}, deck.title), list, h('div', { class: 'actions' },
      h('button', { class: 'btn', onclick: async () => { close(); if (await createCardDialog()) refresh(); } }, 'Novo cartão'),
      h('button', { class: 'btn primary', onclick: () => close() }, 'Fechar')));
  });
  refresh();
}
