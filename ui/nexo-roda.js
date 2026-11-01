/* NEXO — botão flutuante com a logomarca. Ao tocar, abre uma roda com as áreas principais
   (questões, simulados, Vade Mecum…). Usa as mesmas funções de navegação da barra lateral. */
(function(){
'use strict';

var ITENS = [
  { id:'questoes',   rotulo:'Questões',       ico:'q', acao:function(){ if(typeof window.openLibrary === 'function') window.openLibrary('quest'); } },
  { id:'simulados',  rotulo:'Simulados',      ico:'c', acao:function(){ if(window.nexoSimulado) window.nexoSimulado(); } },
  { id:'vade',       rotulo:'Vade Mecum',     ico:'v', acao:function(){ if(window.nexoVade) window.nexoVade(); } },
  { id:'cronograma', rotulo:'Cronograma',     ico:'d', acao:function(){ if(window.nexoCronograma) window.nexoCronograma(); } },
  { id:'livros',     rotulo:'Livros digitais', ico:'l', acao:function(){ if(window.nexoLivros) window.nexoLivros(); } },
  { id:'desempenho', rotulo:'Desempenho',     ico:'g', acao:function(){ if(window.nexoDesempenho) window.nexoDesempenho(); } }
];

/* ícones de traço, no mesmo estilo dos demais do site */
var PATH = {
  q:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 .9-1 1.6v.6"/><path d="M12 17.2v.1"/>',
  c:'<rect x="4" y="4" width="16" height="16" rx="3"/><path d="m8 12 2.6 2.6L16 9.5"/>',
  v:'<path d="M5 4.5h8a3 3 0 0 1 3 3V20H8a3 3 0 0 0-3 0z"/><path d="M5 4.5v15.5"/>',
  d:'<rect x="4" y="5" width="16" height="15" rx="2.5"/><path d="M4 10h16M9 3v4M15 3v4"/>',
  l:'<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5"/>',
  g:'<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>'
};
var RAIO = 128;        /* distância dos ícones até o botão, em px */
var ARCO_INI = 90, ARCO_FIM = 180;   /* a roda abre para cima e para a esquerda (canto inferior direito) */

function svg(p){ return '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + p + '</svg>'; }

function montar(){
  if(document.querySelector('.nx-roda')) return;
  var raiz = document.createElement('div');
  raiz.className = 'nx-roda';
  var itens = ITENS.map(function(it, i){
    var ang = ITENS.length === 1 ? 45 : ARCO_INI + (ARCO_FIM - ARCO_INI) * i / (ITENS.length - 1);
    var rad = ang * Math.PI / 180;
    var x = Math.cos(rad) * RAIO, y = -Math.sin(rad) * RAIO;
    return '<button type="button" class="nx-roda-item" data-id="' + it.id + '" style="--x:' + x.toFixed(1) + 'px;--y:' + y.toFixed(1) + 'px" aria-label="' + it.rotulo + '" title="' + it.rotulo + '">'
      + svg(PATH[it.ico]) + '<span class="nx-roda-rotulo">' + it.rotulo + '</span></button>';
  }).join('');
  raiz.innerHTML = '<div class="nx-roda-itens" role="menu">' + itens + '</div>'
    + '<button type="button" class="nx-roda-botao" aria-expanded="false" aria-label="Abrir menu do NEXO Revisão"><span class="nx-roda-logo" aria-hidden="true"></span></button>';
  document.body.appendChild(raiz);

  var botao = raiz.querySelector('.nx-roda-botao');
  function fechar(){ raiz.classList.remove('aberta'); botao.setAttribute('aria-expanded', 'false'); }
  function abrir(){ raiz.classList.add('aberta'); botao.setAttribute('aria-expanded', 'true'); }

  botao.addEventListener('click', function(e){
    e.stopPropagation();
    raiz.classList.contains('aberta') ? fechar() : abrir();
  });
  raiz.querySelectorAll('.nx-roda-item').forEach(function(b){
    b.addEventListener('click', function(e){
      e.stopPropagation();
      var it = ITENS.find(function(x){ return x.id === b.getAttribute('data-id'); });
      fechar();
      try{ if(it) it.acao(); }catch(err){}
    });
  });
  document.addEventListener('click', function(e){ if(!raiz.contains(e.target)) fechar(); });
  document.addEventListener('keydown', function(e){ if(e.key === 'Escape') fechar(); });
}

if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', montar);
else montar();
})();
