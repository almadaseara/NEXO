/* NEXO — service worker do app instalável.
   Rede primeiro (o site recebe atualizações várias vezes por dia); se a rede falhar,
   usa a última cópia guardada. Assim, o que já foi aberto continua legível sem internet.
   Nunca guarda nada do Supabase (login, questões do banco, progresso). */
var CACHE = 'nexo-v1';
var BASE = ['./', './index.html', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png'];

self.addEventListener('install', function(e){
  e.waitUntil(caches.open(CACHE).then(function(c){ return c.addAll(BASE); }).catch(function(){}).then(function(){ return self.skipWaiting(); }));
});
self.addEventListener('activate', function(e){
  e.waitUntil(caches.keys().then(function(ks){ return Promise.all(ks.filter(function(k){ return k !== CACHE; }).map(function(k){ return caches.delete(k); })); }).then(function(){ return self.clients.claim(); }));
});
function guardavel(url){
  if(url.origin === self.location.origin) return !/\/(robot|data\/robot-|data\/question-candidates)/.test(url.pathname);
  return /^(cdn\.jsdelivr\.net|fonts\.googleapis\.com|fonts\.gstatic\.com)$/.test(url.hostname);
}
self.addEventListener('fetch', function(e){
  var req = e.request; if(req.method !== 'GET') return;
  var url = new URL(req.url);
  if(/supabase\.co$/.test(url.hostname) || !guardavel(url)) return;
  e.respondWith(
    fetch(req).then(function(res){
      if(res && (res.ok || res.type === 'opaque')){ var copia = res.clone(); caches.open(CACHE).then(function(c){ c.put(req, copia); }); }
      return res;
    }).catch(function(){
      return caches.match(req).then(function(r){
        if(r) return r;
        if(req.mode === 'navigate') return caches.match('./index.html');
        return caches.match(req, { ignoreSearch:true });
      });
    })
  );
});
