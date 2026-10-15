/* NEXO — app instalável (PWA): registra o service worker e oferece "Instalar o app" no Painel.
   Android/Chrome/Edge: usa o pedido de instalação do navegador.
   iPhone/iPad (Safari): mostra o passo a passo (Compartilhar → Adicionar à Tela de Início). */
(function(){
'use strict';
if('serviceWorker' in navigator && location.protocol === 'https:'){
  window.addEventListener('load', function(){ navigator.serviceWorker.register('sw.js').catch(function(){}); });
}
var KEY = 'nexo_app_aviso', pedido = null;
function instalado(){ return (window.matchMedia && matchMedia('(display-mode: standalone)').matches) || navigator.standalone === true; }
function ios(){ return /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1); }
function dispensado(){ try{ return !!localStorage.getItem(KEY); }catch(e){ return false; } }
window.addEventListener('beforeinstallprompt', function(e){ e.preventDefault(); pedido = e; desenhar(); });
window.addEventListener('appinstalled', function(){ try{ localStorage.setItem(KEY, 'instalado'); }catch(e){} var b = document.getElementById('nx-app'); if(b) b.remove(); });

var SHARE = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="vertical-align:-3px"><path d="M12 3v12M8 7l4-4 4 4M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7"/></svg>';
function desenhar(){
  if(instalado() || dispensado()) return;
  var grid = document.querySelector('.stats-grid'); if(!grid || document.getElementById('nx-app')) return;
  if(!pedido && !ios()) return;
  var corpo = pedido
    ? '<p>Abra o NEXO direto da tela inicial, em tela cheia. O que você já abriu continua disponível mesmo sem internet.</p><div class="nx-app-acoes"><button type="button" class="nx-btn primary small" data-app="instalar">Instalar o app</button><button type="button" class="nx-btn ghost small" data-app="fechar">Agora não</button></div>'
    : '<p>No Safari, toque em <b>Compartilhar</b> ' + SHARE + ' e depois em <b>Adicionar à Tela de Início</b>. O NEXO abre em tela cheia, como um app.</p><div class="nx-app-acoes"><button type="button" class="nx-btn ghost small" data-app="fechar">Entendi</button></div>';
  grid.insertAdjacentHTML('beforebegin', '<section id="nx-app" class="nx-app" aria-label="Instalar o NEXO"><img src="icons/icon-192.png" alt="" width="44" height="44"><div><b>Instale o NEXO no celular</b>' + corpo + '</div></section>');
}
document.addEventListener('click', function(e){
  var b = e.target.closest && e.target.closest('[data-app]'); if(!b) return;
  if(b.dataset.app === 'instalar' && pedido){ pedido.prompt(); pedido.userChoice.finally(function(){ pedido = null; var x = document.getElementById('nx-app'); if(x) x.remove(); }); return; }
  try{ localStorage.setItem(KEY, String(Date.now())); }catch(err){}
  var x = document.getElementById('nx-app'); if(x) x.remove();
});
var homeOriginal = window.home;
if(typeof homeOriginal === 'function'){
  window.home = function(){ var r = homeOriginal.apply(this, arguments); try{ desenhar(); }catch(e){} return r; };
}
if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function(){ setTimeout(desenhar, 300); }); else setTimeout(desenhar, 300);
})();
