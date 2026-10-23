/* NEXO Revisão — Meus Concursos (preferências locais, sem alterar banco ou trilhas). */
(function(){
'use strict';
var KEY='nexo_meus_concursos_v1', LIMIT=3;
var CATALOG=[
 {id:'pcba',nome:'Polícia Civil da Bahia (PC-BA)',cargos:[['investigador','Investigador'],['escrivao','Escrivão']]},
 {id:'pcpe',nome:'Polícia Civil de Pernambuco (PC-PE)',cargos:[['agente','Agente'],['escrivao','Escrivão'],['delegado','Delegado']]},
 {id:'pf',nome:'Polícia Federal (PF)',cargos:[['agente','Agente'],['escrivao','Escrivão'],['delegado','Delegado'],['papiloscopista','Papiloscopista']]},
 {id:'prf',nome:'Polícia Rodoviária Federal (PRF)',cargos:[['policial','Policial Rodoviário Federal']]},
 {id:'pmpe',nome:'Polícia Militar de Pernambuco (PM-PE)',cargos:[['soldado','Soldado'],['oficial','Oficial']]}
];
function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
function get(){
 var s;try{s=JSON.parse(localStorage.getItem(KEY)||'{}');}catch(e){s={};}
 var seen={}, items=(Array.isArray(s.items)?s.items:[]).filter(function(x){
  var c=CATALOG.find(function(y){return y.id===x.id;});
  if(!c||seen[x.id]||!c.cargos.some(function(y){return y[0]===x.cargo;}))return false;
  seen[x.id]=true;return true;
 }).slice(0,LIMIT);
 return {items:items,principal:items.some(function(x){return x.id===s.principal;})?s.principal:(items[0]||{}).id||null};
}
function save(s){localStorage.setItem(KEY,JSON.stringify(s));document.dispatchEvent(new CustomEvent('nexo:concursos-alterados',{detail:s}));}
function edital(id){return (window.NEXO_EDITAIS||{})[id]||null;}
function disciplinas(item){
 var e=edital(item.id),cargo=e&&e.cargos&&e.cargos[item.cargo];
 if(!cargo)return null;
 return Array.from(new Set([].concat(cargo.gerais||[],cargo.especificos||[])));
}
function nomeDisc(id,items){
 for(var i=0;i<items.length;i++){var e=edital(items[i].id);if(e&&e.disciplinas&&e.disciplinas[id])return e.disciplinas[id].nome;}
 return id;
}
function render(){
 var root=document.getElementById('nx-concursos-root');if(!root)return;
 var s=get(), pending=s.items.filter(function(x){return !disciplinas(x);});
 var all=s.items.map(disciplinas),common=all.length&&!pending.length?all[0].filter(function(x){return all.every(function(a){return a.includes(x);});}):[];
 var avail=CATALOG.filter(function(c){return !s.items.some(function(x){return x.id===c.id;});});
 var html='<div class="nx-con-header"><h2>Meus Concursos</h2><p>Escolha até três concursos e os respectivos cargos. Defina seu foco principal.</p><strong>'+s.items.length+'/'+LIMIT+' selecionados</strong></div>';
 html+='<div class="nx-con-list">';
 s.items.forEach(function(x){
  var c=CATALOG.find(function(y){return y.id===x.id;}),d=disciplinas(x);
  html+='<section class="nx-con-card"><div class="nx-con-line"><b>'+esc(c.nome)+'</b><span>'+(s.principal===x.id?'★ Principal':'Secundário')+'</span></div>';
  html+='<label>Cargo <select data-action="cargo" data-id="'+esc(x.id)+'">'+c.cargos.map(function(z){return '<option value="'+esc(z[0])+'"'+(z[0]===x.cargo?' selected':'')+'>'+esc(z[1])+'</option>';}).join('')+'</select></label>';
  html+='<p class="nx-con-muted">'+(d?d.length+' disciplinas vinculadas ao programa cadastrado':'Conteúdo programático pendente de cadastro e conferência')+'</p>';
  html+='<div class="nx-con-actions">'+(s.principal!==x.id?'<button data-action="principal" data-id="'+esc(x.id)+'">Definir principal</button>':'')+'<button data-action="remove" data-id="'+esc(x.id)+'">Remover</button></div></section>';
 });
 html+='</div>';
 if(s.items.length<LIMIT&&avail.length){
  html+='<div class="nx-con-card"><h3>Adicionar concurso</h3><label>Concurso <select id="nx-con-add">'+avail.map(function(c){return '<option value="'+esc(c.id)+'">'+esc(c.nome)+'</option>';}).join('')+'</select></label><label>Cargo <select id="nx-con-job"></select></label><button class="nx-con-primary" data-action="add">Adicionar à preparação</button></div>';
 }else if(s.items.length===LIMIT){html+='<p class="nx-con-muted">Limite de três concursos atingido. Remova um para trocar.</p>';}
 html+='<section class="nx-con-card"><h3>Disciplinas em comum</h3>';
 if(!s.items.length)html+='<p>Selecione seus concursos para comparar as disciplinas.</p>';
 else if(pending.length)html+='<p>Comparação indisponível até que os programas oficiais de todos os cargos selecionados sejam cadastrados. Não usamos listas estimadas como se fossem editais.</p>';
 else html+=common.length?'<ul>'+common.map(function(x){return '<li>'+esc(nomeDisc(x,s.items))+'</li>';}).join('')+'</ul>':'<p>Não foram identificadas disciplinas em comum nos programas cadastrados.</p>';
 html+='</section><p class="nx-con-muted">As seleções são salvas neste navegador. Esta função não altera o cronograma existente, questões, resultados ou dados no Supabase.</p>';
 root.innerHTML=html;
 var add=root.querySelector('#nx-con-add'),job=root.querySelector('#nx-con-job');
 function fill(){if(!add||!job)return;var c=CATALOG.find(function(x){return x.id===add.value;});job.innerHTML=c.cargos.map(function(z){return '<option value="'+esc(z[0])+'">'+esc(z[1])+'</option>';}).join('');}
 if(add){add.addEventListener('change',fill);fill();}
}
function open(){
 var v=document.getElementById('view');if(!v)return;
 if(typeof window.closeMobileNav==='function')window.closeMobileNav();
 var head=document.getElementById('head');if(head)head.textContent='Meus Concursos';
 v.innerHTML='<div id="nx-concursos-root" class="nx-concursos"></div>';render();
 if(typeof window.current!=='undefined')window.current=null;
}
window.nexoMeusConcursos=open;
window.nexoConcursosSelecionados=function(){return get();};
document.addEventListener('click',function(e){
 var b=e.target.closest('#nx-concursos-root button[data-action]');if(!b)return;
 var s=get(),id=b.dataset.id,act=b.dataset.action;
 if(act==='add'){
  var c=document.getElementById('nx-con-add'),job=document.getElementById('nx-con-job');
  if(!c||!job||s.items.length>=LIMIT||s.items.some(function(x){return x.id===c.value;}))return;
  s.items.push({id:c.value,cargo:job.value});if(!s.principal)s.principal=c.value;
 }else if(act==='remove'){s.items=s.items.filter(function(x){return x.id!==id;});if(s.principal===id)s.principal=(s.items[0]||{}).id||null;
 }else if(act==='principal'){if(s.items.some(function(x){return x.id===id;}))s.principal=id;}
 else return;
 save(s);render();
});
document.addEventListener('change',function(e){
 var t=e.target;if(!t.matches('#nx-concursos-root select[data-action="cargo"]'))return;
 var s=get(),x=s.items.find(function(y){return y.id===t.dataset.id;});
 if(x){x.cargo=t.value;save(s);render();}
});
function init(){
 var nav=document.getElementById('nav');if(!nav||document.getElementById('nx-con-nav'))return;
 var btn=document.createElement('button');btn.id='nx-con-nav';btn.type='button';btn.textContent='🎯 Meus Concursos (até 3)';
 btn.className='nx-con-nav';btn.addEventListener('click',open);nav.parentNode.insertBefore(btn,nav);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();