/* NEXO Lab — Livros digitais no modelo "PDFs interativos":
   abertos recentemente, abas Por disciplina / Por carreira / Favoritos, busca e sanfonas com progresso.
   Recentes e favoritos ficam salvos só neste aparelho. O progresso vem da leitura registrada (nexo-livro.js). */
(function(){
'use strict';
var KFAV='nexo_livros_fav_lab_v1', KREC='nexo_livros_rec_lab_v1';
var aba='disc', busca='', abertos={};
function ls(k,d){try{var v=JSON.parse(localStorage.getItem(k));return v==null?d:v}catch(e){return d}}
function sv(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function norm(s){return String(s||'').normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase()}
function NL(){return window.nexoLivro}
function mods(){return typeof modules!=='undefined'?modules:[]}
function modulo(id){return mods().find(function(m){return m.id===id})}
function favs(){var a=ls(KFAV,[]);return Array.isArray(a)?a:[]}
function recs(){var a=ls(KREC,[]);return (Array.isArray(a)?a:[]).filter(function(x){return x&&modulo(x.mod)})}
var SETA='<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 6 6 6-6 6"/></svg>';
var DOC='<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 3h8l4 4v14H5V3h2zm8 0v5h5M9 12h7M9 16h7"/></svg>';
var ESTRELA=function(on){return '<svg viewBox="0 0 24 24" width="18" height="18" fill="'+(on?'currentColor':'none')+'" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" aria-hidden="true"><path d="m12 3 2.8 5.8 6.2.9-4.5 4.4 1 6.2-5.5-3-5.5 3 1-6.2L3 9.7l6.2-.9z"/></svg>'};
function livroDe(mod){var m=modulo(mod);return m&&NL().livroDoModulo(m)}

function capLinha(id,i,mostrarLivro){
  var m=modulo(id);if(!m)return '';
  var pc=NL().pctModulo(id),fav=favs().indexOf(id)>=0,Lv=livroDe(id);
  return '<li class="pl-cap"><button type="button" class="pl-cap-main" data-pl="abrir" data-mod="'+esc(id)+'"><span class="pl-cap-ico" style="--c:'+esc(Lv?Lv.cor:'#3ec79a')+'">'+DOC+'</span><span class="pl-cap-txt"><b>'+(i!=null?(i+1)+'. ':'')+esc(m.title)+'</b><small>'+(mostrarLivro&&Lv?esc(Lv.nome)+' · ':'')+NL().minutos(m)+' min · '+pc+'% lido</small></span><span class="pl-cap-pc'+(pc>=100?' ok':'')+'">'+(pc>=100?'✓':pc+'%')+'</span></button>'
   +'<button type="button" class="pl-fav'+(fav?' on':'')+'" data-pl="fav" data-mod="'+esc(id)+'" aria-pressed="'+fav+'" aria-label="'+(fav?'Remover dos favoritos':'Favoritar')+'" title="'+(fav?'Remover dos favoritos':'Favoritar')+'">'+ESTRELA(fav)+'</button></li>';
}
function casa(id){
  if(!busca)return true;var m=modulo(id),Lv=livroDe(id);
  return norm(m&&m.title).indexOf(busca)>=0||norm(Lv&&Lv.nome).indexOf(busca)>=0;
}
function livroBloco(Lv,chave){
  var caps=NL().capitulos(Lv.id),done=caps.filter(function(id){return NL().pctModulo(id)>=100}).length,pct=NL().pctLivro(Lv.id);
  var vis=caps.map(function(id,i){return {id:id,i:i}}).filter(function(x){return casa(x.id)});
  if(busca&&!vis.length)return '';
  var open=busca?true:!!abertos[chave];
  var c=NL().continuar(Lv.id);
  return '<details class="pl-livro" data-k="'+esc(chave)+'"'+(open?' open':'')+' style="--c:'+esc(Lv.cor)+'"><summary><span class="pl-sig">'+esc(Lv.sigla)+'</span><span class="pl-liv-t"><b>'+esc(Lv.nome)+'</b><small>'+done+' de '+caps.length+' concluídos <i>'+pct+'%</i></small></span><span class="pl-chev" aria-hidden="true">⌄</span></summary>'
   +'<div class="pl-liv-corpo"><div class="pl-barra"><i style="width:'+pct+'%"></i></div>'+(c&&!busca?'<button type="button" class="nx-btn primary small pl-cont" data-pl="continuar" data-livro="'+esc(Lv.id)+'">'+(pct?'Continuar leitura':'Começar a ler')+'</button>':'')
   +'<ol class="pl-caps">'+vis.map(function(x){return capLinha(x.id,x.i,false)}).join('')+'</ol></div></details>';
}
function porDisciplina(){
  return NL().livros.map(function(Lv){return livroBloco(Lv,'d:'+Lv.id)}).join('');
}
function porCarreira(){
  var E=window.NEXO_EDITAIS||{},out='';
  Object.keys(E).forEach(function(eid){
    var ed=E[eid];Object.keys(ed.cargos||{}).forEach(function(cid){
      var cg=ed.cargos[cid],ids=[].concat(cg.gerais||[],cg.especificos||[]);
      var lv=NL().livros.filter(function(Lv){return ids.indexOf(Lv.id)>=0});
      if(!lv.length)return;
      var corpo=lv.map(function(Lv){return livroBloco(Lv,'c:'+eid+':'+cid+':'+Lv.id)}).join('');
      if(busca&&!corpo)return;
      var tot=0,ok=0;lv.forEach(function(Lv){var cs=NL().capitulos(Lv.id);tot+=cs.length;ok+=cs.filter(function(id){return NL().pctModulo(id)>=100}).length});
      var ch='car:'+eid+':'+cid,open=busca?true:!!abertos[ch];
      out+='<details class="pl-carr" data-k="'+esc(ch)+'"'+(open?' open':'')+'><summary><span class="pl-liv-t"><b>'+esc(ed.nome)+' · '+esc(cg.nome)+'</b><small>'+lv.length+' livros · '+ok+' de '+tot+' capítulos concluídos</small></span><span class="pl-chev" aria-hidden="true">⌄</span></summary><div class="pl-carr-corpo">'+corpo+'</div></details>';
    });
  });
  var sel=window.nexoConcursosSelecionados&&window.nexoConcursosSelecionados(),sem=((sel&&sel.items)||[]).filter(function(x){return !E[x.id]});
  if(!busca&&sem.length)out+='<p class="pl-nota">Programa ainda não cadastrado para: '+sem.map(function(x){return esc(x.id.toUpperCase())}).join(', ')+'. Os livros aparecem aqui quando o edital for conferido.</p>';
  return out;
}
function favoritosHtml(){
  var l=favs().filter(function(id){return modulo(id)&&casa(id)});
  if(!l.length)return '<p class="pl-vazio">'+(busca?'Nenhum favorito encontrado.':'Você ainda não tem favoritos. Toque na estrela de um capítulo para guardá-lo aqui.')+'</p>';
  return '<ol class="pl-caps pl-flat">'+l.map(function(id){return capLinha(id,null,true)}).join('')+'</ol>';
}
function recentesHtml(){
  var r=recs().slice(0,3);
  if(!r.length)return '';
  return '<section class="pl-rec" aria-label="Abertos recentemente"><h2>Abertos recentemente</h2><ul>'+r.map(function(x){var m=modulo(x.mod),Lv=livroDe(x.mod);return '<li><button type="button" data-pl="abrir" data-mod="'+esc(x.mod)+'"><span class="pl-cap-ico" style="--c:'+esc(Lv?Lv.cor:'#3ec79a')+'">'+DOC+'</span><span class="pl-cap-txt"><b>'+esc(m.title)+'</b><small>'+esc(Lv?Lv.nome:'')+'</small></span>'+SETA+'</button></li>'}).join('')+'</ul></section>';
}
function lista(){
  var h=aba==='disc'?porDisciplina():aba==='carr'?porCarreira():favoritosHtml();
  return h||'<p class="pl-vazio">Nada encontrado para "'+esc(busca)+'".</p>';
}
function pintarLista(){var el=document.getElementById('pl-lista');if(el)el.innerHTML=lista()}

function show(){
  try{if(typeof closeMobileNav==='function')closeMobileNav()}catch(e){}
  try{current='livros'}catch(e){}
  try{renderNav()}catch(e){}
  var h=document.getElementById('head');if(h)h.textContent='Livros digitais';
  var abas=[['disc','Por disciplina'],['carr','Por carreira'],['fav','Favoritos']];
  document.getElementById('view').innerHTML='<div class="nx-page pl"><div class="nx-head"><div><h1>Livros digitais</h1><p>Cada disciplina organizada em capítulos, na ordem de estudo do edital. Marque as partes como lidas para acompanhar o quanto já concluiu.</p></div>'
   +'<div class="lv-revisar-wrap"><button type="button" class="nx-btn primary lv-revisar" onclick="nexoRevisarHub()" title="Domínio por disciplina e assunto, caderno de erros e flashcards">Revisar</button></div></div>'
   +recentesHtml()
   +'<div class="pl-abas" role="tablist">'+abas.map(function(a){return '<button type="button" role="tab" aria-selected="'+(aba===a[0])+'" class="'+(aba===a[0]?'on':'')+'" data-pl="aba" data-v="'+a[0]+'">'+a[1]+(a[0]==='fav'&&favs().length?' ('+favs().length+')':'')+'</button>'}).join('')+'</div>'
   +'<label class="pl-busca"><input type="search" id="pl-busca" placeholder="Buscar capítulo ou disciplina" value="'+esc(busca)+'" autocomplete="off" aria-label="Buscar capítulo ou disciplina"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg></label>'
   +'<div id="pl-lista" class="pl-lista">'+lista()+'</div></div>';
}

document.addEventListener('nexo:livro-aberto',function(e){
  var id=e.detail&&e.detail.mod;if(!id)return;
  var r=ls(KREC,[]);r=(Array.isArray(r)?r:[]).filter(function(x){return x&&x.mod!==id});
  r.unshift({mod:id,t:Date.now()});sv(KREC,r.slice(0,10));
});
document.addEventListener('input',function(e){
  if(e.target&&e.target.id==='pl-busca'){busca=norm(e.target.value.trim());pintarLista()}
});
document.addEventListener('toggle',function(e){
  var d=e.target;if(d&&d.classList&&d.dataset&&d.dataset.k&&(d.classList.contains('pl-livro')||d.classList.contains('pl-carr'))&&!busca)abertos[d.dataset.k]=d.open;
},true);
document.addEventListener('click',function(e){
  var b=e.target.closest&&e.target.closest('[data-pl]');if(!b)return;
  var a=b.dataset.pl;
  if(a==='aba'){aba=b.dataset.v;show();return}
  if(a==='abrir'){NL().abrir(b.dataset.mod);return}
  if(a==='continuar'){var c=NL().continuar(b.dataset.livro);if(c)NL().abrir(c.mod,c.key);return}
  if(a==='fav'){
    var f=favs(),i=f.indexOf(b.dataset.mod);if(i>=0)f.splice(i,1);else f.push(b.dataset.mod);sv(KFAV,f);
    var t=document.querySelector('.pl-abas [data-v="fav"]');if(t)t.textContent='Favoritos'+(f.length?' ('+f.length+')':'');
    pintarLista();return;
  }
});
window.nexoLivrosClassico=window.nexoLivros;
window.nexoLivros=show;
})();
