/* NEXO Lab — Questões no celular: filtros em folha (bottom sheet), uma questão por vez com
   navegação Anterior / Ir para / Próximo, menu "⋯" (fonte, compartilhar, reportar, detalhes).
   Só age em telas de até 700px; no computador a tela original continua igual. */
(function(){
'use strict';
var orig=window.renderPracticeQuestionsPage;if(typeof orig!=='function')return;
var KFS='nexo_questoes_fonte_lab_v1';
var qi=0,qiAlvo=null,primeiro='',folhaAberta=null,entrada=false;
function mobile(){return window.matchMedia&&window.matchMedia('(max-width:700px)').matches}
function $(s,r){return (r||document).querySelector(s)}
function $$(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))}
function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function fonte(){try{var v=localStorage.getItem(KFS);if(v==null)return 1;var n=+v;return n>=0&&n<=3?n:1}catch(e){return 1}}
function setFonte(n){try{localStorage.setItem(KFS,String(n))}catch(e){}aplicarFonte()}
function aplicarFonte(){var v=document.getElementById('view');if(v){v.classList.remove('nxm-f0','nxm-f1','nxm-f2','nxm-f3');v.classList.add('nxm-f'+fonte())}}
function cards(){return $$('#nxq-res > .practice-question-card')}
function total(){var t=$('#nxq-count'),m=t&&t.textContent.match(/(\d+)/);return m?+m[1]:cards().length}
function alturaBarra(){var b=$('.access-bar');return b?b.offsetHeight:66}
function pad(n){return n<10?'0'+n:String(n)}

/* ---------- folha (bottom sheet) ---------- */
function fecharFolha(){var f=document.getElementById('nxm-folha');if(f)f.hidden=true;document.body.classList.remove('nxm-trava');folhaAberta=null}
function abrirFolha(k){var f=document.getElementById('nxm-folha');if(!f)return;$$('.nxm-sec',f).forEach(function(s){s.hidden=s.dataset.k!==k});f.hidden=false;f.classList.toggle('nxm-cheia',k==='filtros');folhaAberta=k;document.body.classList.add('nxm-trava');if(k==='mais')preencherMais()}
function contarFiltros(){
  var n=0;$$('#nxm-folha [data-nxf]').forEach(function(el){if(el.dataset.nxf==='kw')return;if(el.type==='checkbox'){if(el.dataset.nxf==='com'&&el.checked)n++;if(el.dataset.nxf==='anul'&&!el.checked)n++}else if(el.value)n++});
  var kw=$('.nxm-kw [data-nxf="kw"]');if(kw&&kw.value)n++;
  var st=$('[data-nxs].active');if(st&&st.dataset.nxs!=='all')n++;
  return n;
}
function pintarBotaoFiltros(){var b=$('#nxm-btn-filtros');if(!b)return;var n=contarFiltros();b.innerHTML='<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round" aria-hidden="true"><path d="M3 5h18l-7 8v6l-4-2v-4z"/></svg><span>Filtros</span>'+(n?'<i>'+n+'</i>':'');var ver=$('#nxm-ver');if(ver)ver.textContent='Ver '+total()+' questões'}

/* ---------- menu ⋯ ---------- */
function preencherMais(){
  var c=cards()[qi],sec=$('#nxm-folha [data-k="mais"] .nxm-lista');if(!sec)return;
  var f=fonte();
  sec.innerHTML='<div class="nxm-linha"><span>Tamanho de fonte</span><div class="nxm-fs"><button type="button" data-nxm="fs-" '+(f<=0?'disabled':'')+' aria-label="Diminuir">A−</button><button type="button" data-nxm="fs+" '+(f>=3?'disabled':'')+' aria-label="Aumentar">A+</button></div></div>'
   +'<button type="button" class="nxm-linha nxm-bt" data-nxm="compartilhar"><span>Compartilhar questão</span></button>'
   +'<button type="button" class="nxm-linha nxm-bt" data-nxm="detalhes"><span>Detalhes da questão</span></button>'
   +(c&&$('.nx-rep-btn',c)?'<button type="button" class="nxm-linha nxm-bt" data-nxm="reportar"><span>Reportar erro</span></button>':'')
   +'<div id="nxm-det" class="nxm-det" hidden></div>';
}
function textoQuestao(c){var p=$('p',c);return (p?p.textContent:'').trim()}
function detalhes(c){
  var metas=$$('.practice-question-meta span',c).map(function(s){return s.textContent}),ln=$('.small.muted',c);
  return '<ul>'+(ln?'<li>'+esc(ln.textContent.replace(/\s+/g,' ').trim())+'</li>':'')+metas.map(function(m){return '<li>'+esc(m)+'</li>'}).join('')+'</ul>';
}

/* ---------- uma questão por vez ---------- */
function focar(){
  var cs=cards(),n=cs.length;if(!document.getElementById('nxm-nav'))return;
  var pid=cs[0]?(($('.card.q',cs[0])||{}).id||''):'';
  if(qiAlvo!=null&&pid===primeiro){qi=qiAlvo}else if(pid!==primeiro){qi=0}
  qiAlvo=null;primeiro=pid;
  if(qi>=n)qi=Math.max(0,n-1);
  cs.forEach(function(c,i){c.classList.toggle('nxm-ativa',i===qi)});
  var T=total(),at=$('#nxm-pos');if(at)at.textContent=n?pad(qi+1)+' de '+T:'0 de 0';
  var ant=$('#nxm-ant'),prox=$('#nxm-prox');
  if(ant)ant.disabled=qi<=0;
  if(prox)prox.disabled=!n||(qi>=n-1&&!$('.nxq-mais'));
  pintarBotaoFiltros();
}
function irPara(i){
  var guard=0;while(cards().length<=i&&$('.nxq-mais')&&guard++<60){qiAlvo=i;$('.nxq-mais').click()}
  var n=cards().length;qi=Math.max(0,Math.min(i,n-1));qiAlvo=null;focar();rolar();
}
function rolar(){var c=cards()[qi];if(c&&c.scrollIntoView)try{c.scrollIntoView({block:'start'})}catch(e){}window.scrollTo&&0}

/* ---------- montagem ---------- */
function montar(){
  var shell=$('.practice-filter-shell.nxq'),res=document.getElementById('nxq-res'),view=document.getElementById('view');
  if(!shell||!res||!view)return;
  ['nxm-folha','nxm-nav'].forEach(function(id){var o=document.getElementById(id);if(o)o.remove()});
  aplicarFonte();
  var tabs=$('.practice-status-tabs',shell),grid=$('.nxq-grid',shell),rod=$('.nxq-rodape',shell),kw=$('.nxq-kw',grid),aviso=$('.nxq-aviso',shell);
  if(!tabs||!grid||!rod)return;
  var barra=document.createElement('div');barra.className='nxm-barra';
  var kwBox=document.createElement('div');kwBox.className='nxm-kw';if(kw)kwBox.appendChild(kw);
  var bt=document.createElement('button');bt.type='button';bt.id='nxm-btn-filtros';bt.className='nxm-btn-filtros';bt.dataset.nxm='filtros';
  barra.appendChild(kwBox);barra.appendChild(bt);shell.insertBefore(barra,grid);
  /* folha */
  var f=document.createElement('div');f.id='nxm-folha';f.hidden=true;f.className='nxm-folha';
  f.innerHTML='<div class="nxm-fundo" data-nxm="fechar"></div><div class="nxm-painel" role="dialog" aria-modal="true"><div class="nxm-alca"></div>'
   +'<section class="nxm-sec" data-k="filtros"><div class="nxm-t"><b>Filtros</b><button type="button" class="nxm-x" data-nxm="fechar" aria-label="Fechar">×</button></div><div class="nxm-corpo" id="nxm-corpo"></div><div class="nxm-rodape"><button type="button" class="nxm-limpar" data-nxm="limpar">Limpar filtros</button><button type="button" class="nxm-ver" id="nxm-ver" data-nxm="fechar">Filtrar</button></div></section>'
   +'<section class="nxm-sec" data-k="mais" hidden><div class="nxm-t"><b>Mais opções</b><button type="button" class="nxm-x" data-nxm="fechar" aria-label="Fechar">×</button></div><div class="nxm-lista"></div></section></div>';
  document.body.appendChild(f);
  var corpo=$('#nxm-corpo',f);corpo.appendChild(grid);corpo.appendChild(rod);if(aviso)corpo.appendChild(aviso);
  /* barra inferior */
  var nav=document.createElement('div');nav.id='nxm-nav';nav.className='nxm-nav';
  nav.innerHTML='<button type="button" id="nxm-ant" data-nxm="ant" aria-label="Questão anterior">‹ Anterior</button><button type="button" id="nxm-pos" class="nxm-pos" data-nxm="ir" aria-label="Ir para questão">01 de 0</button><button type="button" id="nxm-prox" data-nxm="prox" aria-label="Próxima questão">Próxima ›</button><button type="button" class="nxm-mais" data-nxm="mais" aria-label="Mais opções">⋯</button>'
   +'<div id="nxm-ir" class="nxm-ir" hidden><label>Ir para a questão <input type="number" id="nxm-ir-n" min="1" inputmode="numeric"></label><button type="button" data-nxm="ir-ok">Ir</button></div>';
  view.appendChild(nav);
  document.documentElement.style.setProperty('--nxm-b',alturaBarra()+'px');
  var ob=new MutationObserver(function(){focar()});ob.observe(res,{childList:true});
  pintarBotaoFiltros();focar();
  if(folhaAberta)abrirFolha(folhaAberta);
}

window.renderPracticeQuestionsPage=function(){
  var r=orig.apply(this,arguments);
  try{
    if(mobile()){montar();if(entrada){entrada=false;if(contarFiltros()===0)abrirFolha('filtros')}}
    else{var o=document.getElementById('nxm-folha');if(o)o.remove()}
  }catch(e){}
  return r;
};
/* ao entrar em Questões pelo menu, sem filtros aplicados, a primeira tela é a de filtros */
var abrirBiblioteca=window.openLibrary;
if(typeof abrirBiblioteca==='function')window.openLibrary=function(r){if(r==='quest')entrada=true;return abrirBiblioteca.apply(this,arguments)};

document.addEventListener('click',function(e){
  var b=e.target.closest&&e.target.closest('[data-nxm]');if(!b)return;
  var a=b.dataset.nxm;
  if(a==='filtros'){abrirFolha('filtros');pintarBotaoFiltros();return}
  if(a==='mais'){abrirFolha('mais');return}
  if(a==='fechar'){fecharFolha();if(document.getElementById('nxq-res')){qi=0;focar();rolar()}return}
  if(a==='limpar'){fecharFolha();window.clearPracticeFilters&&window.clearPracticeFilters();return}
  if(a==='ant'){if(qi>0){qi--;focar();rolar()}return}
  if(a==='prox'){var n=cards().length;if(qi<n-1){qi++;focar();rolar()}else if($('.nxq-mais')){qiAlvo=qi+1;$('.nxq-mais').click();setTimeout(rolar,60)}return}
  if(a==='ir'){var box=$('#nxm-ir');box.hidden=!box.hidden;if(!box.hidden){var inp=$('#nxm-ir-n');inp.max=total();inp.value='';inp.placeholder='1–'+total();setTimeout(function(){inp.focus()},30)}return}
  if(a==='ir-ok'){var v=parseInt($('#nxm-ir-n').value,10);if(v>=1){irPara(Math.min(v,total())-1);$('#nxm-ir').hidden=true}return}
  if(a==='fs-'){setFonte(Math.max(0,fonte()-1));preencherMais();return}
  if(a==='fs+'){setFonte(Math.min(3,fonte()+1));preencherMais();return}
  var c=cards()[qi];
  if(a==='compartilhar'&&c){
    var t=textoQuestao(c),dados={title:'Questão — NEXO Revisão',text:t.slice(0,600)+(t.length>600?'…':'')};
    if(navigator.share){navigator.share(dados).catch(function(){})}
    else if(navigator.clipboard){navigator.clipboard.writeText(dados.text).then(function(){var d=$('#nxm-det');if(d){d.hidden=false;d.textContent='Enunciado copiado.'}}).catch(function(){})}
    return;
  }
  if(a==='detalhes'&&c){var d=$('#nxm-det');d.hidden=false;d.innerHTML=detalhes(c);return}
  if(a==='reportar'&&c){var r=$('.nx-rep-btn',c);fecharFolha();if(r)r.click();return}
});
document.addEventListener('change',function(e){if(e.target&&e.target.closest&&e.target.closest('#nxm-folha'))setTimeout(pintarBotaoFiltros,0)});
document.addEventListener('input',function(e){if(e.target&&e.target.matches&&e.target.matches('.nxm-kw [data-nxf="kw"]'))setTimeout(pintarBotaoFiltros,300)});
document.addEventListener('keydown',function(e){if(e.key==='Escape')fecharFolha();if(e.key==='Enter'&&e.target&&e.target.id==='nxm-ir-n'){var v=parseInt(e.target.value,10);if(v>=1){irPara(Math.min(v,total())-1);$('#nxm-ir').hidden=true}}});
})();
