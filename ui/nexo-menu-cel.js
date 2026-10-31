/* NEXO — no celular a barra de baixo foi retirada; as entradas dela que não estão no menu lateral
   (Praticar questões, Lei seca e Desempenho) passam a aparecer no menu (☰). Só visíveis no celular (.nx-so-cel). */
(function(){
'use strict';
function atual(){ try{ return current; }catch(e){ return null; } }
var IC = {
  q:'<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12.5 4 4 10-10"/></svg>',
  l:'<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4v16M5 7h14M7 7l-3 7a3.2 3.2 0 0 0 6 0L7 7Zm10 0-3 7a3.2 3.2 0 0 0 6 0l-3-7Z"/></svg>',
  d:'<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 20V10M12 20V4M19 20v-7"/></svg>'
};
var anterior = window.renderNav;
window.renderNav = function(){
  var r; try{ if(typeof anterior === 'function') r = anterior.apply(this, arguments); }catch(e){}
  var nav = document.getElementById('nav'); if(!nav) return r;
  Array.prototype.slice.call(nav.querySelectorAll('.nx-menu-cel')).forEach(function(x){ x.remove(); });
  var c = atual();
  var itens = [
    [IC.q, 'Praticar questões', "openLibrary('quest')", c === 'library'],
    [IC.l, 'Lei seca', "openLibrary('lei')", false],
    [IC.d, 'Desempenho', 'nexoDesempenho()', c === 'desempenho']
  ];
  var html = itens.map(function(i){ return '<button type="button" class="primary-nav nx-nav-extra nx-so-cel nx-menu-cel' + (i[3] ? ' active' : '') + '" onclick="' + i[2] + '">' + i[0] + ' ' + i[1] + '</button>'; }).join('');
  var ref = nav.querySelector('.primary-nav');
  if(ref) ref.insertAdjacentHTML('beforebegin', html); else nav.insertAdjacentHTML('afterbegin', html);
  return r;
};
try{ renderNav(); }catch(e){}
})();
