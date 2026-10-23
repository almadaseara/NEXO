/* NEXO Lab — painel compacto, somente preview. */
(function(){
'use strict';
var selectedDay=new Date(), offset=0;
function e(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function dateKey(d){return [d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-')}
function get(){return (window.nexoConcursosSelecionados&&window.nexoConcursosSelecionados())||{items:[],principal:null}}
function plan(){try{return window.nexoEstudo&&window.nexoEstudo.plano()}catch(x){return null}}
function dayTasks(s,d){if(!s||!s.weeks)return [];var dt=new Date(d);dt.setHours(0,0,0,0);var tm=dt.getTime();for(var k in s.weeks){var start=new Date(k+'T00:00:00').getTime();if(tm>=start&&tm<start+604800000)return (s.weeks[k].tarefas||[]).filter(function(t){return t.d===Math.round((tm-start)/86400000)})}return []}
function saved(){try{return JSON.parse(localStorage.getItem('nexo_dias_estudados_lab_v1')||'{}')}catch(x){return {}}}
function icon(name){var p={book:'<path d="M3 5h8a3 3 0 0 1 3 3v13H6a3 3 0 0 0-3 0zm11 3a3 3 0 0 1 3-3h4v16h-7"/>',scale:'<path d="M12 3v18M5 7h14M5 7l-3 6h6zm14 0l-3 6h6zM7 21h10"/>',brain:'<path d="M12 5a4 4 0 0 0-8 1v2a4 4 0 0 0-1 7 4 4 0 0 0 5 5h4V5zm0 0a4 4 0 0 1 8 1v2a4 4 0 0 1 1 7 4 4 0 0 1-5 5h-4"/>',medical:'<path d="M12 4v16M4 12h16M5 5l14 14"/>',monitor:'<rect x="3" y="4" width="18" height="14" rx="2"/><path d="M8 22h8m-4-4v4"/>',file:'<path d="M6 2h8l5 5v15H6zM14 2v5h5M9 12h7m-7 4h7"/>',check:'<path d="m4 12 5 5L20 6"/>',target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><path d="M12 3v6"/>',play:'<circle cx="12" cy="12" r="9"/><path d="m10 8 6 4-6 4z"/>',refresh:'<path d="M20 8A8 8 0 0 0 6 6L4 8m0-5v5h5M4 16a8 8 0 0 0 14 2l2-2m0 5v-5h-5"/>',list:'<path d="M8 6h13M8 12h13M8 18h13M3 6h1M3 12h1M3 18h1"/>'};return '<svg class="nx-lab-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true">'+(p[name]||p.book)+'</svg>'}
function disciplineIcon(d){var x=String(d||'').toLowerCase();return /penal|jurídic/.test(x)?'scale':/medic|legal/.test(x)?'medical':/lógic|racioc/.test(x)?'brain':/inform/.test(x)?'monitor':/portug|literat/.test(x)?'book':'file'}
function badgeFor(d){var x=String(d||'').toLowerCase(),sig='ED',color='#4c6970',ico='file';
if(/portug/.test(x)){sig='LP';color='#b12f68';ico='book'}
else if(/racioc|lógic/.test(x)){sig='RL';color='#a77a09';ico='brain'}
else if(/medic/.test(x)){sig='ML';color='#5444bb';ico='medical'}
else if(/legisla|lei/.test(x)){sig='LE';color='#6738c4';ico='scale'}
else if(/inform/.test(x)){sig='IN';color='#1368aa';ico='monitor'}
else if(/penal/.test(x)){sig='DP';color='#139b76';ico='scale'}
else if(/constitucional/.test(x)){sig='DC';color='#2779cc';ico='file'}
else if(/administrativo/.test(x)){sig='DA';color='#bb5a28';ico='file'}
return '<span class="nx-lab-pair" style="--badge:'+color+'"><span class="nx-lab-symbol">'+icon(ico)+'</span></span>'}
window.nexoSubjectBadge=badgeFor;
function taskLabel(t){var names={penal:'Direito Penal',constitucional:'Direito Constitucional',administrativo:'Direito Administrativo',medicina_legal:'Medicina Legal',portugues:'Língua Portuguesa',rlm:'Raciocínio Lógico',informatica:'Informática'};return names[t.disc]||t.disc||'Estudo'}
function safeDate(d){var today=new Date();today.setHours(23,59,59,999);return d<=today}
window.nexoDisciplineSvg=icon;window.nexoDisciplineIcon=disciplineIcon;
/* ---- Painel de estudos: layout aprovado (versão 2) ----
   Dados reais: plano e trilha (nexoTrilha.dia), histórico de questões (nexo_eventos), dias marcados.
   Sem plano, sem histórico ou sem meta, mostra o estado vazio em vez de números inventados. */
var DIA=864e5, KMETA='nexo_meta_questoes', KMARCA='nexo_dias_estudados_lab_v1';
var NOMES=['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];
var NOMES_CONC={pcba:'Polícia Civil da Bahia',pcpe:'Polícia Civil de Pernambuco',pf:'Polícia Federal',prf:'Polícia Rodoviária Federal',pmpe:'Polícia Militar de Pernambuco'};
var SIGLA_CONC={pcba:'PC-BA',pcpe:'PC-PE',pf:'PF',prf:'PRF',pmpe:'PM-PE'};
var CARGOS={investigador:'Investigador de Polícia Civil',escrivao:'Escrivão',agente:'Agente',delegado:'Delegado',papiloscopista:'Papiloscopista',policial:'Policial Rodoviário Federal',soldado:'Soldado',oficial:'Oficial'};
var CHECK='<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7"/></svg>';
var PLAY='<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z"/></svg>';
var SETA='<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 6 6 6-6 6"/></svg>';
var ESCUDO='<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6Z"/><path d="m8.5 12 2.5 2.5 4.5-5"/></svg>';
var official={pcba:'https://www.ba.gov.br/policiacivil/sites/site-pcba/files/2024-08/Conheca_a_PCBA_BrasaoHistorico_PCBA_0.jpg',pf:'https://www.gov.br/pf/pt-br/principios-fundamentais/simbolos-da-policia-federal-2/emblema.png/@@images/image'};
function ls(k,d){try{var v=localStorage.getItem(k);return v==null?d:JSON.parse(v)}catch(x){return d}}
function d0(t){var d=new Date(t);d.setHours(0,0,0,0);return d.getTime()}
function fmtMin(m){m=Math.round(m);if(m<60)return m+' min';var h=Math.floor(m/60),r=m%60;return h+'h'+(r?String(r).padStart(2,'0')+'min':'')}
function saudacao(){var h=new Date().getHours();return h<12?'Bom dia':h<18?'Boa tarde':'Boa noite'}
function eventosQ(){var a=ls('nexo_eventos',[]);return (Array.isArray(a)?a:[]).filter(function(x){return x&&x.k==='q'})}
function trilhaDia(t){try{return window.nexoTrilha&&window.nexoTrilha.dia?window.nexoTrilha.dia(t):{plano:false,tarefas:[]}}catch(x){return {plano:false,tarefas:[]}}}
function diasEstudados(){
 var r={},m=ls(KMARCA,{});Object.keys(m).forEach(function(k){if(m[k])r[k]=1});
 eventosQ().forEach(function(x){r[dateKey(new Date(x.t))]=1});
 try{var f=window.nexoTrilha.diasFeitos();for(var k in f)r[k]=1}catch(x){}
 return r;
}

function semanaHtml(){
 var sel=d0(selectedDay),hoje=d0(Date.now()),seg=sel-((new Date(sel).getDay()+6)%7)*DIA,feitos=diasEstudados(),marcas=ls(KMARCA,{}),h='';
 for(var i=0;i<7;i++){
  var t=seg+i*DIA,d=new Date(t),k=dateKey(d),ok=!!feitos[k],manual=!!marcas[k],auto=ok&&!manual,futuro=t>hoje;
  var nome=NOMES[d.getDay()]+' '+d.getDate();
  h+='<div class="pn-dia'+(t===sel?' sel':'')+(t===hoje?' hoje':'')+(ok?' ok':'')+'"><button type="button" class="pn-dia-sel" data-pn="dia" data-date="'+k+'" aria-pressed="'+(t===sel)+'" aria-label="Ver o dia '+nome+'"><small>'+NOMES[d.getDay()]+'</small><b>'+d.getDate()+'</b></button>'
   +'<button type="button" class="pn-bola'+(ok?' on':'')+'" data-pn="marcar" data-date="'+k+'" role="checkbox" aria-checked="'+ok+'" aria-label="'+(ok?'Desmarcar':'Marcar')+' '+nome+' como estudado"'
   +(futuro?' disabled title="Não é possível marcar um dia futuro"':(auto?' disabled title="Estudo registrado automaticamente (questões ou trilha)"':' title="'+(ok?'Desmarcar dia estudado':'Marcar dia estudado')+'"'))+'>'+(ok?CHECK:'')+'</button></div>';
 }
 return '<section class="pn-semana" aria-label="Semana de estudo"><div class="pn-dias">'+h+'</div></section>';
}

var CLOCK='<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>';
function selo(t){
 try{var T=window.nexoTrilha;if(T&&T.edIcon&&t.discId&&t.sigla)return '<span class="nx-lab-pair" style="--badge:'+e(t.cor)+'"><span class="nx-lab-symbol">'+T.edIcon(t.discId)+'</span></span>'}catch(x){}
 return badgeFor(t.disc)}
function trilhaHtml(it,match){
 var cab=function(sub,dir){return '<div class="pn-phead"><span class="pn-pico"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m4 6 1.5 1.5L8 5M4 12l1.5 1.5L8 11M4 18l1.5 1.5L8 17M11 6h9M11 12h9M11 18h9"/></svg></span><div><h2>Trilha do dia</h2><p>'+sub+'</p></div>'+(dir?'<span class="pn-meta">'+dir+'</span>':'')+'</div>'};
 var vazio=function(t,s,b,a){return '<section class="pn-panel pn-trilha">'+cab('Seu roteiro de estudos para o dia.')+'<div class="pn-vazio"><b>'+t+'</b><span>'+s+'</span>'+(b?'<button type="button" class="pn-btn" data-lab="trail">'+b+'</button>':'')+'</div></section>'};
 if(!it)return vazio('Escolha um concurso','Selecione um concurso em Meus concursos para ver sua trilha.','','');
 if(!match)return vazio('O cronograma deste cargo ainda não está configurado','Sua trilha atual foi preservada. Configure o plano deste cargo quando quiser.','Configurar trilha');
 var T=trilhaDia(d0(selectedDay));
 if(!T.plano||!T.semana)return vazio('Atualize o plano desta semana','Abra o cronograma e a NEXO recalcula a trilha com o que você já concluiu.','Abrir cronograma');
 var l=T.tarefas;if(!l.length)return vazio('Dia de folga no seu cronograma','Quer adiantar? Abra a trilha da semana ou pratique questões.','Abrir a trilha');
 var feitas=l.filter(function(x){return x.feito}).length,min=l.reduce(function(a,x){return a+(x.min||0)},0);
 var CAL='<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15" rx="3"/><path d="M8 3v4M16 3v4M3.5 10h17M8.5 14.5l2 2 4-4"/></svg>';
 var pend=l.length-feitas;
 var linhas=l.map(function(t){
  var acao=t.mod&&t.tipo!=='questoes'?'estudar':'praticar';
  var chips=(t.mod?'<button type="button" class="pn-chipb" data-nt="estudar" data-id="'+e(t.id)+'">Material</button>':'')+'<button type="button" class="pn-chipb" data-nt="praticar" data-id="'+e(t.id)+'">Questões</button><button type="button" class="pn-chipb" onclick="nexoRevisarHub()">Revisar</button>';
  return '<li class="pn-sessao'+(t.feito?' feito':'')+'" style="--c:'+e(t.cor)+'"><div class="pn-s-top">'+selo(t)+'<span class="pn-disc">'+e(t.disc)+'</span><span class="pn-min">'+CLOCK+fmtMin(t.min)+'</span>'
  +(t.feito?'<span class="pn-estado ok">Concluído</span>':'<button type="button" class="pn-iniciar" data-nt="'+acao+'" data-id="'+e(t.id)+'">Iniciar</button>')+'</div>'
  +'<p class="pn-s-tit"><b>'+e(t.titulo||t.tipoNome)+'</b>'+(t.sub?'<small>'+e(t.sub)+'</small>':'')+'</p>'
  +'<div class="pn-s-acoes">'+chips+'<button type="button" class="pn-chk" data-pn="feito" data-id="'+e(t.id)+'" aria-pressed="'+t.feito+'" aria-label="'+(t.feito?'Desmarcar':'Concluir')+': '+e(t.titulo||t.tipoNome)+'">'+(t.feito?CHECK:'')+'<span>'+(t.feito?'Concluído':'Concluir')+'</span></button></div></li>';
 }).join('');
 return '<section class="pn-panel pn-trilha"><div class="pn-phead"><div><h2>Trilha do dia</h2><p>Seu roteiro de estudos. Conclua os itens e mantenha a consistência.</p></div><button type="button" class="pn-cal" data-lab="trail" aria-label="Abrir a trilha">'+CAL+'</button></div>'
  +'<div class="pn-aviso"><span class="pn-aviso-i">'+CAL+'</span><span>'+(pend?'Você tem <b>'+pend+'</b> '+(pend===1?'sessão':'sessões')+' de estudo '+(pend===1?'pendente':'pendentes')+' · '+feitas+' de '+l.length+' concluídas · '+fmtMin(min):'Todas as <b>'+l.length+'</b> sessões deste dia estão concluídas. Bom trabalho!')+'</span></div><ul class="pn-sessoes">'+linhas+'</ul></section>';
}

function concursosHtml(x,it){
 var itens=x.items.map(function(z){
  var on=it&&it.id===z.id,img=official[z.id]?'<img src="'+official[z.id]+'" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="this.remove()">':'';
  return '<button type="button" class="pn-conc'+(on?' on':'')+'" data-lab="contest" data-id="'+e(z.id)+'" aria-pressed="'+on+'"><span class="pn-brasao">'+ESCUDO+img+'</span><span class="pn-conc-t"><b>'+e(NOMES_CONC[z.id]||z.id)+'</b><span class="pn-chip">'+e(SIGLA_CONC[z.id]||z.id.toUpperCase())+'</span><small>'+e(CARGOS[z.cargo]||z.cargo)+'</small></span><i class="pn-radio" aria-hidden="true"></i></button>';
 }).join('');
 return '<section class="pn-panel pn-conc-box"><div class="pn-phead"><span class="pn-pico">'+ESCUDO+'</span><div><h2>Meus concursos</h2><p>Selecione um concurso para ver sua trilha personalizada.</p></div><button type="button" class="pn-add" data-lab="manage">+ Adicionar</button></div>'+(itens||'<div class="pn-vazio"><span>Nenhum concurso selecionado.</span></div>')+'<button type="button" class="pn-btn ghost pn-todos" data-lab="manage">Ver todos os concursos '+SETA+'</button></section>';
}

function numerosHtml(){
 var h0=d0(Date.now()),q=eventosQ(),hojeQ=q.filter(function(x){return x.t>=h0}),meta=+ls(KMETA,0)||0;
 var s7=q.filter(function(x){return x.t>=h0-6*DIA}),a7=q.filter(function(x){return x.t>=h0-13*DIA&&x.t<h0-6*DIA});
 var pc=function(a){return a.length?Math.round(a.filter(function(x){return x.ok}).length/a.length*100):null};
 var p=pc(s7),pa=pc(a7),ok7=s7.filter(function(x){return x.ok}).length,delta=p!=null&&pa!=null?p-pa:null;
 var dias7='';for(var di=6;di>=0;di--){var ini=h0-di*DIA,dq=q.filter(function(x){return x.t>=ini&&x.t<ini+DIA}),dok=dq.filter(function(x){return x.ok}).length,pp=dq.length?Math.round(dok/dq.length*100):0,nm=['D','S','T','Q','Q','S','S'][new Date(ini+DIA/2).getDay()];dias7+='<span class="pn-sp'+(dq.length?'':' vz')+'" title="'+(dq.length?dok+' de '+dq.length+' ('+pp+'%)':'sem questões')+'"><i style="height:'+(dq.length?Math.max(8,pp):6)+'%"></i><em>'+nm+'</em></span>'}
 var pct=meta?Math.min(100,Math.round(hojeQ.length/meta*100)):0;
 var ico=function(n){return '<span class="pn-pico">'+({barras:'<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg>',alvo:'<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/></svg>'})[n]+'</span>'};
 return '<div class="pn-numeros"><section class="pn-panel pn-num">'+ico('barras')+'<div class="pn-num-c"><small>Questões resolvidas hoje</small><div class="pn-num-v"><b>'+hojeQ.length+'</b><span>'+(meta?'de '+meta+' previstas':'sem meta definida')+'</span></div><div class="pn-num-b">'+(meta?'<div class="pn-barra" role="img" aria-label="'+pct+'% da meta"><i style="width:'+pct+'%"></i></div><span class="pn-pct">'+pct+'%</span>':'')+'<button type="button" class="pn-link" data-pn="meta">'+(meta?'Alterar meta':'Definir meta diária')+'</button></div></div></section>'
 +'<section class="pn-panel pn-taxa"><div class="pn-taxa-t"><small>Taxa de acerto · 7 dias</small>'+(delta!=null?'<em class="pn-delta '+(delta>=0?'up':'down')+'">'+(delta>=0?'▲ +':'▼ ')+delta+'% vs. semana anterior</em>':'')+'</div>'
 +(s7.length?'<div class="pn-taxa-c"><div class="pn-anel" role="img" aria-label="'+ok7+' acertos e '+(s7.length-ok7)+' erros nos últimos 7 dias"><svg viewBox="0 0 120 120" width="132" height="132" aria-hidden="true"><defs><linearGradient id="pnG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7ae8c3"/><stop offset="1" stop-color="#2aa57f"/></linearGradient></defs><circle cx="60" cy="60" r="48" fill="none" stroke="currentColor" stroke-opacity=".12" stroke-width="11"/><circle cx="60" cy="60" r="48" fill="none" stroke="url(#pnG)" stroke-width="11" stroke-linecap="round" stroke-dasharray="'+(p*3.0159)+' 301.59" transform="rotate(-90 60 60)"/></svg><div><b>'+p+'<i>%</i></b><span>de acerto</span></div></div>'
 +'<div class="pn-taxa-d"><div class="pn-chips"><span class="ac"><i></i>'+ok7+' acertos</span><span class="er"><i></i>'+(s7.length-ok7)+' erros</span></div><div class="pn-spark" aria-label="Acerto por dia">'+dias7+'</div></div></div>':'<p class="pn-num-s">Responda questões para ver sua taxa de acerto.</p>')+'</section></div>';
}

function acessoHtml(){
 var c=function(i,t,d,a,k){return '<button type="button" class="pn-ac pn-k-'+k+'" data-lab="'+a+'"><span class="pn-pico">'+icon(i)+'</span><span><b>'+t+'</b><small>'+d+'</small></span>'+SETA+'</button>'};
 return '<section class="pn-acesso" aria-labelledby="pn-ah"><div class="pn-ah"><span class="pn-raio"><svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true"><path d="M13 2 4.5 13.5H11L10 22l8.5-11.5H12Z"/></svg></span><div><h2 id="pn-ah">Acesso rápido</h2><p>Ferramentas para turbinar seus estudos.</p></div></div><div class="pn-ac-grid">'
 +c('check','Praticar questões','Resolva questões por assunto','questions','verde')+c('play','Fazer simulado','Treine com provas completas','simulados','azul')+c('refresh','Revisar','Acesse seus resumos e flashcards','review','roxo')+c('book','Livros digitais','Estude pelos materiais do NEXO','books','ambar')+'</div></section>';
}

function show(){
 var view=document.getElementById('view');if(!view)return;
 var x=get(),it=x.items.find(function(z){return z.id===x.principal})||x.items[0],s=plan();
 var match=!!(it&&s&&s.plan&&s.plan.edital===it.id&&s.plan.cargo===it.cargo);
 view.innerHTML='<div class="pn"><div class="pn-topo"><div class="pn-eyebrow">'+saudacao().toUpperCase()+', ESTUDANTE.</div><h1>Painel de <span>estudos</span></h1><p>Acompanhe sua trilha diária e mantenha o foco na sua aprovação.</p></div>'
  +semanaHtml()+'<div class="pn-cols"><div class="pn-col">'+trilhaHtml(it,match)+numerosHtml()+'</div><div class="pn-col">'+concursosHtml(x,it)+'</div></div>'+acessoHtml()+'</div>';
 var hd=document.getElementById('head');if(hd)hd.textContent='Painel de estudos';
 view.scrollTop=0;
}
window.nexoPainelLab=show;
function chamar(nomes){for(var i=0;i<nomes.length;i++){var f=nomes[i].split('.').reduce(function(o,k){return o&&o[k]},window);if(typeof f==='function'){f();return true}}return false}
document.addEventListener('click',function(ev){
 var b=ev.target.closest('[data-lab],[data-pn]');if(!b||!document.querySelector('.pn'))return;
 var p=b.dataset.pn,a=b.dataset.lab;
 if(p==='dia'){selectedDay=new Date(b.dataset.date+'T12:00:00');show()}
 else if(p==='marcar'){var dm=new Date((b.dataset.date||'')+'T12:00:00');if(isNaN(dm)||!safeDate(dm))return;var m=ls(KMARCA,{}),k=b.dataset.date;if(m[k])delete m[k];else m[k]=true;localStorage.setItem(KMARCA,JSON.stringify(m));show()}
 else if(p==='feito'){if(window.nexoTrilha&&window.nexoTrilha.alternar)window.nexoTrilha.alternar(b.dataset.id);show()}
 else if(p==='meta'){var at=+ls(KMETA,0)||0,r=window.prompt('Quantas questões você quer resolver por dia?',at||'');if(r==null)return;var n=Math.round(+String(r).replace(',','.'));if(isFinite(n)&&n>0&&n<=1000)localStorage.setItem(KMETA,JSON.stringify(n));else if(String(r).trim()==='')localStorage.setItem(KMETA,'0');show()}
 else if(a==='contest'){var c=get();c.principal=b.dataset.id;localStorage.setItem('nexo_meus_concursos_v1',JSON.stringify(c));document.dispatchEvent(new CustomEvent('nexo:concursos-alterados',{detail:c}));show()}
 else if(a==='manage'){chamar(['nexoGerenciarConcursos'])}
 else if(a==='trail'){chamar(['nexoCronograma'])}
 else if(a==='questions'){if(typeof window.openLibrary==='function')window.openLibrary('quest');else chamar(['renderPracticeQuestionsPage'])}
 else if(a==='simulados'){chamar(['nexoSimulado'])}
 else if(a==='review'){chamar(['nexoRevisarHub'])}
 else if(a==='books'){chamar(['nexoLivros'])}
});
document.addEventListener('nexo:historico',function(){if(document.querySelector('.pn'))show()});
window.home=function(){if(typeof closeMobileNav==='function')closeMobileNav();show()};
})();
