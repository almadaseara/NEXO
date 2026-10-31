/* NEXO — barra lateral em telas de toque com largura de tablet (sem "hover"):
   tocar na marca (logo) abre/fecha o trilho; tocar num item, fora ou apertar Esc fecha.
   No computador o trilho continua abrindo ao passar o mouse; no celular vale a gaveta (☰). */
(function(){
'use strict';
function toque(){ return window.matchMedia && window.matchMedia('(hover:none)').matches && window.innerWidth > 700; }
function aside(){ return document.querySelector('aside'); }
function fecha(){ var a = aside(); if(a && a.contains(document.activeElement)) document.activeElement.blur(); }
document.addEventListener('click', function(e){
  if(!toque()) return;
  var a = aside(); if(!a) return;
  var marca = e.target.closest ? e.target.closest('aside .brand') : null;
  if(marca){
    if(a.matches(':focus-within')) fecha();
    else { if(!a.hasAttribute('tabindex')) a.setAttribute('tabindex', '-1'); a.focus({ preventScroll:true }); }
    return;
  }
  if(a.contains(e.target)){
    if(e.target.closest('#nav button, #nav a')) setTimeout(fecha, 60);
  } else fecha();
});
document.addEventListener('keydown', function(e){ if(e.key === 'Escape') fecha(); });
})();
