// Ponto de entrada do Acervo Digital Pessoal: navegação entre biblioteca e editor,
// integração com o menu do NEXO e modo offline.
import { initLibrary, refreshLibrary, setNav } from './library.js';
import { initEditor, openEditor, closeEditor } from './editor.js';
import { toast } from './ui.js';
import { initStudy } from './study.js';
import { postToNexo, onNexo } from './nexo.js';
import { initSync, syncNow, setSyncEnabled, syncEnabled } from './sync.js';

const editorOpen = () => !document.getElementById('editor').hidden;
const titleInput = document.getElementById('ed-title');
const announceEditor = () => postToNexo({ type: 'editor', id: (location.hash.match(/^#caderno\/(.+)$/) || [])[1], title: titleInput.value || 'Caderno' });

// ---------- Navegação ----------
async function open(id, opts) {
  location.hash = 'caderno/' + id;
  if (await openEditor(id, opts)) announceEditor();
}
initLibrary({ onOpen: open });
initStudy({
  onOpenSource: async (src) => {
    if (!src?.notebookId) return;
    const nb = await (await import('./db.js')).db.get('notebooks', src.notebookId);
    const i = nb?.pageIds.indexOf(src.pageId) ?? -1;
    open(src.notebookId, { pageIndex: Math.max(0, i) });
  },
});
initEditor({
  onOpenNotebook: (id) => open(id),
  onClose: () => {
    if (location.hash) history.replaceState(null, '', location.pathname);
    refreshLibrary();
  },
});
titleInput.addEventListener('input', () => { if (editorOpen()) announceEditor(); });

// O menu do NEXO pede uma seção (Todos, Favoritos, Estudar, Páginas marcadas ou uma pasta).
onNexo('nav', async ({ nav }) => {
  if (editorOpen()) await closeEditor();
  setNav(nav || 'all');
});
// O NEXO pede para abrir um caderno direto (link #acervo/caderno/ID do NEXO).
onNexo('open', ({ id }) => { if (id) open(id); });

await refreshLibrary();
const m = location.hash.match(/^#caderno\/(.+)$/);
if (m) openEditor(m[1]).then((ok) => {
  if (ok) announceEditor();
  else history.replaceState(null, '', location.pathname);
});
postToNexo({ type: 'ready' });

// ---------- Sincronização ----------
// Mudanças vindas de outro aparelho atualizam a biblioteca (o caderno aberto espera fechar).
let remoteTimer;
window.addEventListener('acervo:remote', () => {
  clearTimeout(remoteTimer);
  remoteTimer = setTimeout(() => { if (!editorOpen()) refreshLibrary(); }, 300);
});
onNexo('sync-now', () => { if (!syncEnabled()) setSyncEnabled(true); else syncNow(); });
initSync();

// ---------- Offline ----------
// O service worker fica restrito a /acervo/: não intercepta as páginas do NEXO.
if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  navigator.serviceWorker.register('sw.js', { scope: './' }).then((reg) => {
    reg.addEventListener('updatefound', () => {
      const w = reg.installing;
      w?.addEventListener('statechange', () => {
        if (w.state === 'installed' && navigator.serviceWorker.controller) {
          toast('Nova versão do Acervo disponível', { action: 'Atualizar', onAction: () => location.reload(), duration: 0 });
        }
      });
    });
  }).catch(() => {});
}

// Pede ao navegador para não apagar os cadernos quando faltar espaço.
navigator.storage?.persist?.().catch(() => {});
