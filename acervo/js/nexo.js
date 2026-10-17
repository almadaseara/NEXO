// Ponte com o NEXO: o Acervo roda num iframe do index.html (mesma origem), aberto por
// ui/nexo-acervo.js. O menu, o cabeçalho e a forma de voltar são os do NEXO; aqui só
// trocamos mensagens e acompanhamos o tema.
const parentWin = window.parent !== window ? window.parent : null;
const handlers = {};

export function postToNexo(msg) {
  if (!parentWin) return;
  try { parentWin.postMessage({ source: 'acervo', ...msg }, location.origin); } catch { /* NEXO fechado */ }
}

export function onNexo(type, fn) { handlers[type] = fn; }

window.addEventListener('message', (e) => {
  if (e.origin !== location.origin || e.source !== parentWin || e.data?.source !== 'nexo') return;
  handlers[e.data.type]?.(e.data);
});

// Tema: copia data-theme e os tokens --nx-* (ui/nexo-ui.css) do NEXO, e acompanha a troca
// de tema claro/escuro feita no topo do NEXO. Fora do NEXO ficam os padrões de styles.css.
const TOKENS = ['--nx-bg', '--nx-surface', '--nx-surface-2', '--nx-line', '--nx-ink', '--nx-ink-2', '--nx-muted',
  '--nx-accent', '--nx-accent-ink', '--nx-accent-soft', '--nx-gold', '--nx-good', '--nx-bad', '--nx-warn', '--nx-shadow'];
function syncTheme() {
  try {
    const root = parentWin.document.documentElement;
    document.documentElement.dataset.theme = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const cs = parentWin.getComputedStyle(root);
    for (const t of TOKENS) {
      const v = cs.getPropertyValue(t).trim();
      if (v) document.documentElement.style.setProperty(t, v);
      else document.documentElement.style.removeProperty(t);
    }
  } catch { /* fora do NEXO */ }
}
syncTheme();
try {
  new parentWin.MutationObserver(syncTheme).observe(parentWin.document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
} catch { /* fora do NEXO */ }
