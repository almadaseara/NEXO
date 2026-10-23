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
var BKP=KEY+'_bkp';
/* cópia de segurança das matrículas: se a principal sumir (limpeza do navegador, saída da conta), volta daqui */
function restaurar(){try{var v=localStorage.getItem(KEY);if(!v&&localStorage.getItem(BKP))localStorage.setItem(KEY,localStorage.getItem(BKP));else if(v&&v!==localStorage.getItem(BKP))localStorage.setItem(BKP,v);}catch(e){}}
function get(){
 restaurar();
 var s;try{s=JSON.parse(localStorage.getItem(KEY)||'{}');}catch(e){s={};}
 var seen={}, items=(Array.isArray(s.items)?s.items:[]).filter(function(x){
  var c=CATALOG.find(function(y){return y.id===x.id;});
  if(!c||seen[x.id]||!c.cargos.some(function(y){return y[0]===x.cargo;}))return false;
  seen[x.id]=true;return true;
 }).slice(0,LIMIT);
 return {items:items,principal:items.some(function(x){return x.id===s.principal;})?s.principal:(items[0]||{}).id||null};
}
function save(s){var j=JSON.stringify(s);localStorage.setItem(KEY,j);try{localStorage.setItem(BKP,j);}catch(e){}document.dispatchEvent(new CustomEvent('nexo:concursos-alterados',{detail:s}));}
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

function resumoComuns(items){
 var known=items.map(function(x){return {item:x,discs:disciplinas(x)};}).filter(function(x){return !!x.discs;});
 var missing=items.filter(function(x){return !disciplinas(x);});
 if(items.length<2)return '<p class="nx-con-muted">Adicione outro concurso para comparar disciplinas.</p>';
 if(known.length<2)return '<p class="nx-con-muted">Ainda não há pelo menos dois programas cadastrados para comparação. '+missing.length+' concurso(s) aguardam conferência do edital.</p>';
 var comum=known[0].discs.filter(function(id){return known.every(function(x){return x.discs.includes(id);});});
 var out='<p class="nx-con-muted">Comparação atualizada para '+known.length+' concurso(s) com programas disponíveis.</p>';
 if(missing.length)out+='<p class="nx-con-muted">'+missing.length+' concurso(s) não incluído(s) no cálculo por falta de programa cadastrado. O resultado é parcial.</p>';
 out+=comum.length?'<div class="nx-con-subjects">'+comum.map(function(id){return '<span>'+esc(nomeDisc(id,known.map(function(x){return x.item;})))+'</span>';}).join('')+'</div>':'<p>Nenhuma disciplina em comum entre os programas disponíveis.</p>';
 return out;
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
 html+=resumoComuns(s.items);
 html+='</section><p class="nx-con-muted">As seleções são salvas neste navegador. Esta função não altera o cronograma existente, questões, resultados ou dados no Supabase.</p>';
 root.innerHTML=html;
 var add=root.querySelector('#nx-con-add'),job=root.querySelector('#nx-con-job');
 function fill(){if(!add||!job)return;var c=CATALOG.find(function(x){return x.id===add.value;});job.innerHTML=c.cargos.map(function(z){return '<option value="'+esc(z[0])+'">'+esc(z[1])+'</option>';}).join('');}
 if(add){add.addEventListener('change',fill);fill();}
}

/* Painel por concurso: indicadores derivados somente de programas cadastrados.
   Não presume acertos nem percentual de edital sem dados confiáveis. */
var painelAtivo=true;
function renderPainel(){
 var root=document.getElementById('nx-concursos-root');if(!root)return;
 var s=get(),p=s.items.find(function(x){return x.id===s.principal;})||s.items[0],available=p&&disciplinas(p);
 var c=p&&CATALOG.find(function(x){return x.id===p.id;});
 var other=s.items.filter(function(x){return !p||x.id!==p.id;});
 var h='<section class="nx-con-header nx-con-dashboard-head"><span class="nx-con-kicker">MINHA PREPARAÇÃO</span><h2>Painel por concurso</h2><p>Seus concursos em um único lugar, com foco no cargo principal.</p></section>';
 if(!p){h+='<section class="nx-con-card"><h3>Configure sua preparação</h3><p>Escolha pelo menos um concurso e seu cargo para iniciar.</p><button data-action="config">Selecionar concursos</button></section>';root.innerHTML=h;return;}
 h+='<section class="nx-con-card nx-con-main"><div class="nx-con-line"><div><span class="nx-con-kicker">CONCURSO PRINCIPAL</span><h3>'+esc(c.nome)+'</h3><p>'+esc((c.cargos.find(function(x){return x[0]===p.cargo;})||[])[1]||p.cargo)+'</p></div><span>Principal</span></div>';
 h+='<div class="nx-con-metrics"><div><strong>'+s.items.length+' / 3</strong><small>Concursos ativos</small></div><div><strong>'+(available?available.length:'—')+'</strong><small>Disciplinas cadastradas</small></div><div><strong>—</strong><small>Domínio do edital*</small></div></div>';
 h+='<p class="nx-con-muted">*O domínio do edital será exibido quando o progresso estiver vinculado aos tópicos deste cargo. Não estimamos porcentagens.</p>';
 h+='<div class="nx-con-actions"><button data-action="config">Gerenciar concursos</button><button data-action="edital" data-id="'+esc(p.id)+'">Ver edital verticalizado</button><button data-action="trilha">Abrir cronograma existente</button></div></section>';
 h+='<section class="nx-con-card"><h3>Disciplinas do concurso principal</h3>';
 if(available){h+='<div class="nx-con-subjects">'+available.map(function(id){return '<span>'+esc(nomeDisc(id,[p]))+'</span>';}).join('')+'</div><p class="nx-con-muted">Lista do programa cadastrado; não indica conclusão ou cobertura dos materiais.</p>';}
 else h+='<p class="nx-con-muted">Conteúdo programático ainda não cadastrado para este concurso e cargo. Os indicadores ficam indisponíveis até a conferência do edital.</p>';
 h+='</section>';
 if(other.length){h+='<section class="nx-con-card"><h3>Concursos secundários</h3><div class="nx-con-list">'+other.map(function(x){var t=CATALOG.find(function(z){return z.id===x.id;}),d=disciplinas(x),job=t.cargos.find(function(z){return z[0]===x.cargo;});return '<div class="nx-con-secondary"><b>'+esc(t.nome)+'</b><small>'+esc(job?job[1]:x.cargo)+'</small><small>'+(d?d.length+' disciplinas cadastradas':'Programa pendente')+'</small></div>';}).join('')+'</div></section>';}
 h+='<section class="nx-con-card"><h3>Estudo em comum</h3>'+resumoComuns(s.items)+'</section>';
 root.innerHTML=h;
}
function showPane(dashboard){
 painelAtivo=dashboard;
 var v=document.getElementById('view');if(!v)return;
 var head=document.getElementById('head');if(head)head.textContent=dashboard?'Painel por concurso':'Meus Concursos';
 v.innerHTML='<div id="nx-concursos-root" class="nx-concursos"></div>';
 if(dashboard)renderPainel();else render();
}


/* Edital verticalizado — progresso de checklist isolado e por cargo. */
var EKEY='nexo_edital_checklist_lab_v1', editalEscolhido=null;
function checklist(){try{var x=JSON.parse(localStorage.getItem(EKEY)||'{}');return x&&typeof x==='object'&&!Array.isArray(x)?x:{};}catch(e){return {};}}
function chaveTopico(item,disc,top){return [item.id,item.cargo,disc,top].join(':');}
function abrirEdital(id){
 var selected=get().items, item=selected.find(function(x){return x.id===id;})||selected[0];
 if(!item){showPane(true);return;}
 editalEscolhido=item.id;
 var v=document.getElementById('view'),head=document.getElementById('head');if(head)head.textContent='Edital verticalizado';
 v.innerHTML='<div id="nx-concursos-root" class="nx-concursos"></div>';
 renderEdital();
}
function renderEdital(){
 var root=document.getElementById('nx-concursos-root');if(!root)return;
 var items=get().items,item=items.find(function(x){return x.id===editalEscolhido;})||items[0];
 if(!item){showPane(true);return;}
 var c=CATALOG.find(function(x){return x.id===item.id;}),ed=edital(item.id),ds=disciplinas(item),checks=checklist();
 var html='<section class="nx-con-header"><span class="nx-con-kicker">ORGANIZAÇÃO DA PREPARAÇÃO</span><h2>Edital verticalizado</h2><p>Acompanhe os tópicos do programa cadastrado por cargo. As marcações são um checklist manual e não equivalem à conclusão dos estudos no NEXO.</p><div class="nx-con-actions"><button data-action="dashboard">Voltar ao painel</button></div></section>';
 html+='<div class="nx-con-card"><label>Concurso e cargo <select id="nx-ed-select">'+items.map(function(x){var z=CATALOG.find(function(y){return y.id===x.id;}),j=z.cargos.find(function(y){return y[0]===x.cargo;});return '<option value="'+esc(x.id)+'"'+(x.id===item.id?' selected':'')+'>'+esc(z.nome)+' · '+esc(j?j[1]:x.cargo)+'</option>';}).join('')+'</select></label></div>';
 if(!ed||!ds){root.innerHTML=html+'<section class="nx-con-card"><h3>Programa ainda indisponível</h3><p>O edital deste cargo precisa ser cadastrado e conferido antes de apresentar uma lista de assuntos.</p></section>';return;}
 var tops=[];ds.forEach(function(id){var d=ed.disciplinas[id];if(d)(d.topicos||[]).forEach(function(t){tops.push(chaveTopico(item,id,t[0]));});});
 var done=tops.filter(function(k){return checks[k]===true;}).length;
 html+='<section class="nx-con-card"><h3>'+esc(c.nome)+'</h3><p class="nx-con-muted">'+esc(ed.edital||ed.nome||'Programa cadastrado')+' · '+esc(ed.conferido||'Conferência não informada')+'</p><div class="nx-ed-stats"><strong>'+done+' de '+tops.length+' tópicos marcados</strong><span>'+(tops.length?Math.round(done/tops.length*100):0)+'% do checklist</span></div><div class="nx-ed-track"><div style="width:'+(tops.length?done/tops.length*100:0)+'%"></div></div><p class="nx-con-muted">Percentual de marcação manual, não de domínio ou aprovação.</p></section>';
 ds.forEach(function(id){
  var d=ed.disciplinas[id];if(!d)return;
  var count=d.topicos.filter(function(t){return checks[chaveTopico(item,id,t[0])]===true;}).length;
  html+='<details class="nx-ed-group"><summary><span><b>'+esc(d.nome)+'</b><small>'+count+' de '+d.topicos.length+' tópicos marcados</small></span><span>Ver tópicos</span></summary><div class="nx-ed-topics">';
  d.topicos.forEach(function(t){
   var key=chaveTopico(item,id,t[0]),done=checks[key]===true;
   html+='<label class="nx-ed-topic"><input type="checkbox" data-ed-check="'+esc(key)+'"'+(done?' checked':'')+'><span>'+esc(t[1])+'</span></label>';
  });
  html+='</div></details>';
 });
 root.innerHTML=html;
}
window.nexoEditalVerticalizado=abrirEdital;
document.addEventListener('change',function(e){
 if(e.target.id==='nx-ed-select'){editalEscolhido=e.target.value;renderEdital();return;}
 var key=e.target.getAttribute('data-ed-check');if(!key)return;
 var checks=checklist();if(e.target.checked)checks[key]=true;else delete checks[key];
 try{localStorage.setItem(EKEY,JSON.stringify(checks));}catch(err){}
 var open=Array.from(document.querySelectorAll('.nx-ed-group')).map(function(x){return x.open;});
 renderEdital();
 document.querySelectorAll('.nx-ed-group').forEach(function(x,i){x.open=!!open[i];});
});

function open(){
 var v=document.getElementById('view');if(!v)return;
 if(typeof window.closeMobileNav==='function')window.closeMobileNav();
 var head=document.getElementById('head');if(head)head.textContent='Meus Concursos';
 showPane(true);
 if(typeof window.current!=='undefined')window.current=null;
}
window.nexoMeusConcursos=open;
window.nexoGerenciarConcursos=function(){showPane(false);};
window.nexoConcursosSelecionados=function(){return get();};
/* emblemas oficiais: imagem local em assets/brasoes/<id>.png (quando existir) e depois o endereço oficial; sem imagem, o escudo */
var BRASAO_LOCAL=[];
var BRASAO_REMOTO={pcba:'https://upload.wikimedia.org/wikipedia/commons/4/4d/Ins%C3%ADgnia_da_Pol%C3%ADcia_Civil_da_Bahia.jpg',pf:'https://www.gov.br/pf/pt-br/principios-fundamentais/simbolos-da-policia-federal-2/emblema.png/@@images/image',pcpe:'https://upload.wikimedia.org/wikipedia/commons/7/79/Polcivpernambuco.png',prf:'https://upload.wikimedia.org/wikipedia/commons/f/f1/Prf_brasao_novo.jpg',pmpe:'https://upload.wikimedia.org/wikipedia/commons/a/ac/Bras%C3%A3o_PMPE.PNG'};
var BRASAO_ALT={pcba:'https://www.ba.gov.br/policiacivil/sites/site-pcba/files/2024-08/Conheca_a_PCBA_BrasaoHistorico_PCBA_0.jpg'};
/* emblemas em JPG/PNG com fundo branco: o fundo ligado às bordas vira transparente, para todos ficarem no mesmo padrão */
window.nexoBrasaoLimpa=function(i){
 if(i.getAttribute('data-ok'))return;i.setAttribute('data-ok','1');
 try{
  var m=Math.max(i.naturalWidth,i.naturalHeight);if(!m)return;
  var sc=Math.min(1,320/m),w=Math.round(i.naturalWidth*sc),h=Math.round(i.naturalHeight*sc),c=document.createElement('canvas');c.width=w;c.height=h;
  var x=c.getContext('2d',{willReadFrequently:true});x.drawImage(i,0,0,w,h);
  var d=x.getImageData(0,0,w,h),D=d.data,r=D[0],g=D[1],b=D[2];
  if(D[3]<250)return;
  var seen=new Uint8Array(w*h),st=[],a,k;
  for(a=0;a<w;a++)st.push(a,0,a,h-1);for(a=0;a<h;a++)st.push(0,a,w-1,a);
  while(st.length){var py=st.pop(),px=st.pop();if(px<0||py<0||px>=w||py>=h)continue;var p=py*w+px;if(seen[p])continue;seen[p]=1;k=p*4;
   if(Math.abs(D[k]-r)+Math.abs(D[k+1]-g)+Math.abs(D[k+2]-b)>=60)continue;
   D[k+3]=0;st.push(px+1,py,px-1,py,px,py+1,px,py-1)}
  x.putImageData(d,0,0);i.src=c.toDataURL('image/png');
 }catch(e){}
};
window.nexoBrasaoErro=function(i){
 if(i.getAttribute('crossorigin')){i.removeAttribute('crossorigin');i.src=i.src;return}
 var a=i.getAttribute('data-alt');if(a){i.setAttribute('data-alt','');i.setAttribute('crossorigin','anonymous');i.src=a}else i.remove()};
window.nexoBrasaoImg=function(id){var u=['assets/brasoes/'+id+'.png'];if(BRASAO_REMOTO[id])u.push(BRASAO_REMOTO[id]);
 /* primeira opção: arquivo local; se não existir, o endereço oficial; por último o alternativo */
 var alt=u.length>2?u[2]:(BRASAO_ALT[id]||'');
 return '<img src="'+esc(u[0])+'" data-alt="'+esc(u[1]||'')+'" data-alt2="'+esc(alt)+'" alt="" loading="lazy" crossorigin="anonymous" referrerpolicy="no-referrer" onload="nexoBrasaoLimpa(this)" onerror="nexoBrasaoErro(this)">';};
restaurar();document.addEventListener('nexo:conta',restaurar);
window.nexoConcursosCatalogo=CATALOG;window.nexoConcursosSalvar=save;
document.addEventListener('click',function(e){
 var b=e.target.closest('#nx-concursos-root button[data-action]');if(!b)return;
 var s=get(),id=b.dataset.id,act=b.dataset.action;
 if(act==='config'){showPane(false);return;}
 if(act==='dashboard'){showPane(true);return;}
 if(act==='edital'){if(typeof window.nexoCronograma==='function')window.nexoCronograma('edital');return;}
 if(act==='trilha'){if(typeof window.nexoCronograma==='function')window.nexoCronograma();return;}
 if(act==='add'){
  var c=document.getElementById('nx-con-add'),job=document.getElementById('nx-con-job');
  if(!c||!job||s.items.length>=LIMIT||s.items.some(function(x){return x.id===c.value;}))return;
  s.items.push({id:c.value,cargo:job.value});if(!s.principal)s.principal=c.value;
 }else if(act==='remove'){var rp=window.prompt('Para desmatricular, digite confirma:');if(!rp||rp.trim().toLowerCase()!=='confirma')return;s.items=s.items.filter(function(x){return x.id!==id;});if(s.principal===id)s.principal=(s.items[0]||{}).id||null;
 }else if(act==='principal'){if(s.items.some(function(x){return x.id===id;}))s.principal=id;}
 else return;
 save(s);if(painelAtivo)renderPainel();else render();
});
document.addEventListener('change',function(e){
 var t=e.target;if(!t.matches('#nx-concursos-root select[data-action="cargo"]'))return;
 var s=get(),x=s.items.find(function(y){return y.id===t.dataset.id;});
 if(x){x.cargo=t.value;save(s);render();}
});
function init(){
 var nav=document.getElementById('nav');if(!nav||document.getElementById('nx-con-nav'))return;
 var btn=document.createElement('button');btn.id='nx-con-nav';btn.type='button';btn.innerHTML='<span class="nx-con-nav-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="8" height="8" rx="2"></rect><rect x="13" y="3" width="8" height="5" rx="2"></rect><rect x="13" y="10" width="8" height="11" rx="2"></rect><rect x="3" y="13" width="8" height="8" rx="2"></rect></svg></span><span class="nx-con-nav-label">Painel por concurso</span>';
 btn.className='nx-con-nav';btn.addEventListener('click',open);nav.parentNode.insertBefore(btn,nav);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();