/* NEXO Lab — "Turmas": grade de concursos no lugar da tela Meus Concursos (gerenciar).
   Usa as mesmas preferências locais (nexo_meus_concursos_v1, até 3 concursos, 1 principal).
   Não altera cronograma, questões nem Supabase. Brasões: fallback em escudo com a sigla. */
(function(){
'use strict';
var busca='',aberta=null,confirmando=null,LIMITE=3;
var NOME={pcba:'Polícia Civil da Bahia',pcpe:'Polícia Civil de Pernambuco',pf:'Polícia Federal',prf:'Polícia Rodoviária Federal',pmpe:'Polícia Militar de Pernambuco'};
var SIGLA={pcba:'PC-BA',pcpe:'PC-PE',pf:'PF',prf:'PRF',pmpe:'PM-PE'};
var COR={pcba:'#3a6ea5',pcpe:'#b23b3b',pf:'#8a6d1f',prf:'#2f7d5b',pmpe:'#5b4aa8'};
var EMBLEMA={pcba:'https://www.ba.gov.br/policiacivil/sites/site-pcba/files/2024-08/Conheca_a_PCBA_BrasaoHistorico_PCBA_0.jpg',pf:'https://www.gov.br/pf/pt-br/principios-fundamentais/simbolos-da-policia-federal-2/emblema.png/@@images/image'};
function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function norm(s){return String(s||'').normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase()}
function cat(){return window.nexoConcursosCatalogo||[]}
function sel(){return window.nexoConcursosSelecionados?window.nexoConcursosSelecionados():{items:[],principal:null}}
function salvar(items,principal){
  items=items.slice(0,LIMITE);
  var s={items:items,principal:items.some(function(x){return x.id===principal})?principal:(items[0]||{}).id||null};
  window.nexoConcursosSalvar(s);
}
function escudo(id){
  var img=EMBLEMA[id]?'<img src="'+esc(EMBLEMA[id])+'" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="this.remove()">':'';
  return '<span class="tm-arte" style="--c:'+(COR[id]||'#3ec79a')+'"><svg viewBox="0 0 64 72" aria-hidden="true"><path d="M32 3 7 12v22c0 17 10 29 25 35 15-6 25-18 25-35V12z" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/></svg><b>'+esc(SIGLA[id]||id.toUpperCase())+'</b>'+img+'</span>';
}
function cartao(c,s){
  var it=s.items.find(function(x){return x.id===c.id}),on=!!it,prin=on&&s.principal===c.id,job=on&&(c.cargos.find(function(z){return z[0]===it.cargo})||[])[1];
  return '<button type="button" class="tm-card'+(on?' on':'')+(aberta===c.id?' aberta':'')+'" data-tm="abrir" data-id="'+esc(c.id)+'" aria-pressed="'+on+'">'
   +(prin?'<span class="tm-star" title="Principal">★</span>':'')+escudo(c.id)
   +'<span class="tm-nome"><b>'+esc(SIGLA[c.id]||c.id.toUpperCase())+'</b><small>'+esc(NOME[c.id]||c.nome)+'</small>'+(on?'<em>✓ '+(prin?'Principal':'Selecionado')+(job?' · '+esc(job):'')+'</em>':'')+'</span></button>';
}
function detalhe(s){
  var c=cat().find(function(x){return x.id===aberta});if(!c)return '';
  var it=s.items.find(function(x){return x.id===c.id}),on=!!it,cheio=!on&&s.items.length>=LIMITE;
  var ed=(window.NEXO_EDITAIS||{})[c.id],cargoSel=on?it.cargo:c.cargos[0][0];
  var info=ed?'Programa cadastrado e conferido ('+esc(ed.nome)+').':'Conteúdo programático ainda pendente de cadastro e conferência.';
  return '<section class="tm-det" id="tm-det" aria-live="polite"><div class="tm-det-t"><b>'+esc(c.nome)+'</b><button type="button" class="tm-x" data-tm="fechar" aria-label="Fechar">×</button></div><p class="tm-info">'+info+'</p>'
   +'<label class="tm-cargo">Cargo<select id="tm-cargo">'+c.cargos.map(function(z){return '<option value="'+esc(z[0])+'"'+(z[0]===cargoSel?' selected':'')+'>'+esc(z[1])+'</option>'}).join('')+'</select></label>'
   +(on&&confirmando===c.id?'<div class="tm-conf"><p>Para desmatricular de <b>'+esc(NOME[c.id]||c.nome)+'</b>, digite <b>confirma</b> abaixo. Seu progresso neste aparelho não é apagado.</p><input type="text" id="tm-conf-in" autocomplete="off" autocapitalize="off" placeholder="Digite confirma" aria-label="Digite confirma para desmatricular"><div class="tm-acoes"><button type="button" class="nx-btn danger small" id="tm-conf-ok" data-tm="remover" data-id="'+esc(c.id)+'" disabled>Confirmar desmatrícula</button><button type="button" class="nx-btn ghost small" data-tm="cancelar">Cancelar</button></div></div>':'')
   +'<div class="tm-acoes"'+(on&&confirmando===c.id?' hidden':'')+'>'
   +(on?'<button type="button" class="nx-btn primary small" data-tm="salvarcargo" data-id="'+esc(c.id)+'">Salvar cargo</button>'+(s.principal!==c.id?'<button type="button" class="nx-btn small" data-tm="principal" data-id="'+esc(c.id)+'">Definir como principal</button>':'')+'<button type="button" class="nx-btn ghost small" data-tm="desmatricular" data-id="'+esc(c.id)+'">Desmatricular</button>'
      :(cheio?'<p class="tm-info">Limite de três concursos atingido. Desmatricule um para matricular neste.</p>':'<button type="button" class="nx-btn primary small" data-tm="adicionar" data-id="'+esc(c.id)+'">Matricular</button>'))
   +'</div></section>';
}
function lista(){
  var s=sel(),l=cat().filter(function(c){return !busca||norm(NOME[c.id]||c.nome).indexOf(busca)>=0||norm(SIGLA[c.id]).indexOf(busca)>=0||norm(c.nome).indexOf(busca)>=0});
  var cont=document.getElementById('tm-cont');if(cont)cont.textContent=s.items.length+'/'+LIMITE+' selecionados';
  return (l.length?'<div class="tm-grade">'+l.map(function(c){return cartao(c,s)}).join('')+'</div>':'<p class="tm-vazio">Nenhuma turma encontrada.</p>')+detalhe(s);
}
function pintar(){var el=document.getElementById('tm-lista');if(el)el.innerHTML=lista()}
function mostrar(){
  var v=document.getElementById('view');if(!v)return;
  try{if(typeof closeMobileNav==='function')closeMobileNav()}catch(e){}
  var h=document.getElementById('head');if(h)h.textContent='Turmas';
  if(typeof window.current!=='undefined')try{window.current=null}catch(e){}
  var s=sel();
  v.innerHTML='<div class="nx-page tm"><div class="tm-topo"><div><h1>Turmas</h1><p>Escolha até três concursos e o cargo de cada um. O principal define sua trilha e o painel de estudos.</p></div><strong id="tm-cont" class="tm-cont">'+s.items.length+'/'+LIMITE+' selecionados</strong></div>'
   +'<label class="tm-busca"><input type="search" id="tm-busca" placeholder="Pesquisar turmas" value="'+esc(busca)+'" autocomplete="off" aria-label="Pesquisar turmas"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg></label>'
   +'<div id="tm-lista">'+lista()+'</div>'
   +'<p class="tm-nota">As seleções ficam salvas neste aparelho e não alteram seu cronograma, questões ou dados na conta. <button type="button" class="tm-link" data-tm="comparar">Ver disciplinas em comum</button></p></div>';
}
document.addEventListener('input',function(e){
  if(e.target&&e.target.id==='tm-busca'){busca=norm(e.target.value.trim());pintar()}
  if(e.target&&e.target.id==='tm-conf-in'){var ok=document.getElementById('tm-conf-ok');if(ok)ok.disabled=e.target.value.trim().toLowerCase()!=='confirma'}
});
document.addEventListener('click',function(e){
  var b=e.target.closest&&e.target.closest('[data-tm]');if(!b||!document.getElementById('tm-lista'))return;
  var a=b.dataset.tm,id=b.dataset.id,s=sel(),items=s.items.slice();
  if(a==='abrir'){confirmando=null;aberta=aberta===id?null:id;pintar();var d=document.getElementById('tm-det');if(d&&d.scrollIntoView)try{d.scrollIntoView({block:'nearest',behavior:'smooth'})}catch(x){}return}
  if(a==='fechar'){aberta=null;confirmando=null;pintar();return}
  if(a==='desmatricular'){confirmando=id;pintar();var ci=document.getElementById('tm-conf-in');if(ci)ci.focus();return}
  if(a==='cancelar'){confirmando=null;pintar();return}
  if(a==='comparar'){if(window.nexoGerenciarConcursosClassico)window.nexoGerenciarConcursosClassico();return}
  var cargo=document.getElementById('tm-cargo'),cg=cargo&&cargo.value;
  if(a==='adicionar'&&items.length<LIMITE&&!items.some(function(x){return x.id===id})){items.push({id:id,cargo:cg});salvar(items,s.principal||id);pintar();return}
  if(a==='salvarcargo'){items.forEach(function(x){if(x.id===id)x.cargo=cg});salvar(items,s.principal);pintar();return}
  if(a==='principal'){salvar(items,id);pintar();return}
  if(a==='remover'){var ci2=document.getElementById('tm-conf-in');if(confirmando!==id||!ci2||ci2.value.trim().toLowerCase()!=='confirma')return;confirmando=null;items=items.filter(function(x){return x.id!==id});salvar(items,s.principal===id?(items[0]||{}).id:s.principal);aberta=null;pintar();return}
});
window.nexoGerenciarConcursosClassico=window.nexoGerenciarConcursos;
window.nexoGerenciarConcursos=mostrar;
window.nexoTurmas=mostrar;
window.nexoTurmas.escudo=escudo;window.nexoTurmas.nome=function(id){return NOME[id]};
})();
