// Service worker do Acervo Digital Pessoal: deixa os cadernos funcionando offline.
// Fica em /acervo/sw.js, então o escopo máximo é /acervo/ e ele nunca intercepta
// as páginas do NEXO (index.html, revisao.html, admin.html).
const VERSION = 'acervo-v3';
const SCOPE = new URL('./', self.location).href;
const SHELL = [
  './',
  'index.html',
  'styles.css',
  'manifest.webmanifest',
  'icons/icon.svg',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/icon-maskable.png',
  'js/app.js',
  'js/db.js',
  'js/ui.js',
  'js/render.js',
  'js/pdftools.js',
  'js/library.js',
  'js/editor.js',
  'js/shapes.js',
  'js/study.js',
  'js/ai.js',
  'js/stickers.js',
  'js/audio.js',
  'js/providers.js',
  'js/browserai.js',
  'js/nexo.js',
  'vendor/pdf.min.mjs',
  'vendor/pdf.worker.min.mjs',
  'vendor/pdf-lib.esm.min.js',
  'vendor/perfect-freehand.mjs',
  'vendor/anthropic-sdk.mjs',
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(SHELL)));
});

self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k.startsWith('acervo-') && k !== VERSION) await caches.delete(k);
    await self.clients.claim();
  })());
});

// Rede primeiro para o app (pega atualizações), cache como reserva offline.
self.addEventListener('fetch', (e) => {
  const req = e.request;
  // Só responde pelo que está dentro de /acervo/. O resto (NEXO, auth-config.js, Supabase) vai direto à rede.
  if (req.method !== 'GET' || !req.url.startsWith(SCOPE)) return;
  e.respondWith((async () => {
    const cache = await caches.open(VERSION);
    try {
      const res = await fetch(req);
      if (res.ok) cache.put(req, res.clone());
      return res;
    } catch {
      const hit = await cache.match(req, { ignoreSearch: true });
      if (hit) return hit;
      if (req.mode === 'navigate') return cache.match('index.html');
      throw new Error('offline');
    }
  })());
});
