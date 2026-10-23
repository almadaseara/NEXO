/* NEXO Lab — "Sessão de estudo": ao tocar em Iniciar numa tarefa do dia, reúne aula, questões, cards e resumos
   do mesmo assunto em um só lugar. Cada etapa abre a tela que já existe no NEXO; o andamento fica só neste aparelho.
   Nova implementação em teste: não altera cronograma, questões nem Supabase. */
(function(){
'use strict';
var K='nexo_sessao_lab_v1', ativa=null;
function ls(){try{var o=JSON.parse(localStorage.getItem(K)||'{}');return o&&typeof o==='object'?o:{}}catch(e){return {}}}
function sv(o){try{localStorage.setItem(K,JSON.stringify(o))}catch(e){}}
function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function fmt(m){m=+m||0;return m>=60?Math.floor(m/60)+'h'+(m%60?String(m%60).padStart(2,'0')+'min':''):m+' min'}
function mod(id){try{return (typeof modules!=='undefined'?modules:[]).find(function(m){return m.id===id})}catch(e){return null}}
var IC={
 aula:'<path d="M3 5h8a3 3 0 0 1 3 3v13H6a3 3 0 0 0-3 0zm11 3a3 3 0 0 1 3-3h4v16h-7"/>',
 quest:'<path d="m5 12 4.5 4.5L19 7"/>',
 cards:'<rect x="3" y="6" width="14" height="12" rx="2"/><path d="M7 3h12a2 2 0 0 1 2 2v10"/>',
 res:'<path d="M7 3h8l4 4v14H5V3h2zm8 0v5h5M9 12h7M9 16h7"/>'
};
function svg(k){return '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+IC[k]+'</svg>'}
function etapas(t){
  var m=t.mod&&mod(t.mod),nq=m?((m.questions||[]).length+(m.official_questions||[]).length):0,e=[];
  if(t.mod)e.push({k:'aula',t:'Aula',d:'Capítulo do livro digital: teoria e lei seca, na ordem do edital.',b:'Abrir aula'});
  e.push({k:'quest',t:'Questões',d:nq?nq+' questões deste assunto, só as que você ainda não resolveu.':'Questões da disciplina que você ainda não resolveu.',b:'Resolver questões'});
  e.push({k:'cards',t:'Cards',d:'Flashcards para fixar o assunto com repetição espaçada.',b:'Abrir cards'});
  if(t.mod)e.push({k:'res',t:'Resumos estratégicos',d:'Resumo rápido, pegadinhas e pontos mais cobrados do capítulo.',b:'Abrir resumo'});
  return e;
}
function estado(){return (ls()[ativa&&ativa.id])||{}}
function pintar(){
  var v=document.getElementById('view');if(!v||!ativa)return;
  var t=ativa,es=etapas(t),st=estado(),feitas=es.filter(function(x){return st[x.k]}).length,pct=Math.round(feitas/es.length*100);
  try{document.getElementById('head').textContent='Sessão de estudo'}catch(x){}
  v.innerHTML='<div class="nx-page sx" style="--c:'+esc(t.cor||'#3ec79a')+'"><div class="sx-topo"><button type="button" class="nx-btn small ghost" data-sx="voltar">← Painel de estudos</button></div>'
   +'<div class="sx-cab"><span class="sx-eyebrow">Sessão de estudo · '+esc(t.disc||'')+(t.min?' · '+fmt(t.min):'')+'</span><h1>'+esc(t.titulo||t.tipoNome||'Estudo')+'</h1>'+(t.sub?'<p>'+esc(t.sub)+'</p>':'')
   +'<div class="sx-prog"><div class="sx-barra"><i style="width:'+pct+'%"></i></div><span>'+feitas+' de '+es.length+' etapas</span></div></div>'
   +'<ol class="sx-lista">'+es.map(function(x,i){var ok=!!st[x.k];return '<li class="sx-et'+(ok?' ok':'')+'"><span class="sx-n">'+(ok?'✓':i+1)+'</span><span class="sx-ic">'+svg(x.k)+'</span><div class="sx-tx"><b>'+esc(x.t)+'</b><small>'+esc(x.d)+'</small></div>'
     +'<div class="sx-ac"><button type="button" class="nx-btn small primary" data-sx="abrir" data-k="'+x.k+'">'+esc(x.b)+'</button><button type="button" class="nx-btn small ghost" data-sx="feito" data-k="'+x.k+'" aria-pressed="'+ok+'">'+(ok?'Desmarcar':'Marcar como feita')+'</button></div></li>'}).join('')+'</ol>'
   +'<div class="sx-fim">'+(t.feito?'<span class="sx-ok">Tarefa já concluída no painel.</span>':'<button type="button" class="nx-btn primary" data-sx="concluir"'+(feitas<es.length?' disabled':'')+'>Concluir tarefa do dia</button>'+(feitas<es.length?'<small>Conclua ou marque todas as etapas para liberar.</small>':''))+'</div></div>';
  v.scrollTop=0;barra();
}
function barra(){
  var b=document.getElementById('sx-volta'),na=document.querySelector('.sx');
  if(ativa&&!na){if(!b){b=document.createElement('button');b.id='sx-volta';b.type='button';b.setAttribute('data-sx','retomar');document.body.appendChild(b)}b.textContent='← Voltar à sessão de estudo'}
  else if(b)b.remove();
}
function marcar(k,val){var o=ls(),s=o[ativa.id]||{};if(val)s[k]=Date.now();else delete s[k];o[ativa.id]=s;sv(o)}
function abrir(t){ativa=t;pintar()}
function sair(){var b=document.getElementById('sx-volta');if(b)b.remove();ativa=null}
document.addEventListener('click',function(e){
  var b=e.target.closest&&e.target.closest('[data-sx]');if(!b)return;
  var a=b.dataset.sx;
  if(a==='retomar'){pintar();return}
  if(!ativa)return;
  var t=ativa,k=b.dataset.k;
  if(a==='voltar'){sair();if(typeof home==='function')home();return}
  if(a==='feito'){marcar(k,!estado()[k]);pintar();return}
  if(a==='concluir'){if(window.nexoTrilha&&window.nexoTrilha.alternar&&!t.feito)window.nexoTrilha.alternar(t.id);sair();if(typeof home==='function')home();return}
  if(a==='abrir'){
    marcar(k,true);
    try{
      if(k==='aula'&&window.nexoLivro)window.nexoLivro.abrir(t.mod,'resumo');
      else if(k==='res'&&window.nexoLivro)window.nexoLivro.abrir(t.mod,'resumo');
      else if(k==='quest'&&window.nexoPraticar)window.nexoPraticar(t.mod?{mod:t.mod,status:'unsolved'}:{disc:t.disc||'',status:'unsolved'});
      else if(k==='cards'){var f=document.createElement('button');f.setAttribute('data-fx-scope',t.mod?'m:'+t.mod:'d:'+(t.disc||''));f.hidden=true;document.body.appendChild(f);f.click();f.remove()}
    }catch(x){}
    setTimeout(barra,50);
  }
});
document.addEventListener('nexo:livro-aberto',function(){setTimeout(barra,80)});
(function(){var v=document.getElementById('view');if(v&&window.MutationObserver)new MutationObserver(function(){barra()}).observe(v,{childList:true})})();
window.nexoSessao={abrir:abrir,ativa:function(){return ativa}};
})();
