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
return '<span class="nx-lab-pair" style="--badge:'+color+'"><span class="nx-lab-initial">'+sig+'</span><span class="nx-lab-symbol">'+icon(ico)+'</span></span>'}
window.nexoSubjectBadge=badgeFor;
function taskLabel(t){var names={penal:'Direito Penal',constitucional:'Direito Constitucional',administrativo:'Direito Administrativo',medicina_legal:'Medicina Legal',portugues:'Língua Portuguesa',rlm:'Raciocínio Lógico',informatica:'Informática'};return names[t.disc]||t.disc||'Estudo'}
function safeDate(d){var today=new Date();today.setHours(23,59,59,999);return d<=today}
window.nexoDisciplineSvg=icon;window.nexoDisciplineIcon=disciplineIcon;
var official={pcba:'https://www.ba.gov.br/policiacivil/sites/site-pcba/files/2024-08/Conheca_a_PCBA_BrasaoHistorico_PCBA_0.jpg',pf:'https://www.gov.br/pf/pt-br/principios-fundamentais/simbolos-da-policia-federal-2/emblema.png/@@images/image'};
function show(){
 var view=document.getElementById('view');if(!view)return;
 var x=get(),it=x.items.find(function(z){return z.id===x.principal})||x.items[0],s=plan(),match=!!(it&&s&&s.plan&&s.plan.edital===it.id&&s.plan.cargo===it.cargo),dt=new Date();dt.setDate(dt.getDate()+offset*7);
 var marks=saved(),days=Array.from({length:7},function(_,i){var d=new Date(dt);d.setDate(dt.getDate()-((dt.getDay()+6)%7)+i);return d;});
 var names={pcba:'Polícia Civil da Bahia',pcpe:'Polícia Civil de Pernambuco',pf:'Polícia Federal',prf:'Polícia Rodoviária Federal',pmpe:'Polícia Militar de Pernambuco'};
 var tasks=match?dayTasks(s,selectedDay):[],completed=tasks.filter(function(t){return !!t.feito}).length;
 var h='<div class="nx-home-lab"><header><h1>Olá, Estudante!</h1><p>Seu planejamento de estudos em um só lugar.</p></header>';
 h+='<section class="nx-lab-days"><button data-lab="prev" aria-label="Semana anterior">‹</button>'+days.map(function(d){var key=dateKey(d),record=marks[key],done=record===true|| (match&&dayTasks(s,d).some(function(t){return !!t.feito}));return '<button data-lab="day" data-date="'+key+'" class="'+(key===dateKey(selectedDay)?'selected ':'')+(done?'done':'')+'"><small>'+['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'][d.getDay()]+'</small><b>'+d.getDate()+'</b><span>●</span></button>'}).join('')+'<button data-lab="next" aria-label="Semana seguinte">›</button></section>';
 h+='<div class="nx-lab-mark nx-lab-mark-inline"><button data-lab="mark" '+(!safeDate(selectedDay)?'disabled':'')+'>'+ (marks[dateKey(selectedDay)]?'✓ Dia estudado':'✓ Marcar dia estudado')+'</button></div><div class="nx-lab-cols"><section class="nx-lab-panel"><div class="nx-lab-heading"><h2>Trilha do dia</h2><small>'+completed+' de '+tasks.length+' atividades</small></div>';
 if(!it)h+='<p>Selecione um concurso em Meus concursos para começar.</p>';
 else if(!match)h+='<div class="nx-lab-empty">O cronograma para este cargo ainda não está configurado. A trilha existente foi preservada.<button data-lab="trail">Configurar trilha</button></div>';
 else h+=tasks.length?tasks.map(function(t,i){var d=taskLabel(t);return '<button class="nx-lab-task" data-lab="trail"><span class="nx-lab-num">'+(i+1)+'</span>'+badgeFor(d)+'<span class="nx-lab-taskinfo"><b>'+e(d)+'</b><small>'+e(t.nome||'Atividade de estudo')+'</small><small>'+e(t.tipo||'Estudo')+' · '+(t.min||0)+' min'+(t.parte?' · Parte '+t.parte+' de '+(t.partes||1):'')+'</small></span><em>'+(t.feito?'✓ Concluída':'Abrir trilha →')+'</em></button>'}).join(''):'<p>Nenhuma tarefa programada para este dia.</p>';
 h+='</section><section class="nx-lab-panel"><div class="nx-lab-heading"><h2>Meus concursos</h2><button data-lab="manage">Gerenciar</button></div>';
 h+=x.items.length?x.items.map(function(z){return '<button class="nx-lab-contest '+(it&&it.id===z.id?'active':'')+'" data-lab="contest" data-id="'+e(z.id)+'"><span class="nx-lab-shield">'+(official[z.id]?'<img src="'+official[z.id]+'" alt="Emblema institucional" loading="lazy">':icon('file'))+'</span><span><b>'+e(names[z.id]||z.id)+'</b><small>'+e(z.cargo)+'</small></span>'+(it&&it.id===z.id?'<strong>✓</strong>':'<span>›</span>')+'</button>'}).join(''):'<p>Nenhum concurso selecionado.</p>';
 h+='<p class="nx-lab-note">PC-BA e PF: emblemas dos portais institucionais; demais instituições com ícones provisórios.</p></section></div>';
 var hist;try{hist=window.nexoEstudo&&window.nexoEstudo.historico&&window.nexoEstudo.historico()}catch(x){}
 h+='<div class="nx-lab-metrics"><div><small>Questões resolvidas</small><strong>—</strong><p>Conectando ao histórico de questões</p></div><div><small>Taxa de acerto</small><strong>—</strong><p>Sem estatística confirmada nesta tela</p></div></div>';
 h+='<h2 class="nx-lab-quick-title">Acesso rápido</h2><div class="nx-lab-quick">'+[['Praticar questões','questions'],['Fazer simulado','simulados'],['Revisar','review'],['Livros digitais','books']].map(function(a){return '<button data-lab="'+a[1]+'"><span class="nx-lab-quickicon">'+icon(({questions:'check',simulados:'play',review:'refresh',books:'book'})[a[1]])+'</span>'+a[0]+' <span>↗</span></button>'}).join('')+'</div>';
 h+='</div>';
 view.innerHTML=h;document.getElementById('head').textContent='Painel de estudos';
}
window.nexoPainelLab=show;
document.addEventListener('click',function(ev){
 var b=ev.target.closest('[data-lab]');if(!b)return;
 var a=b.dataset.lab;
 if(a==='day'){selectedDay=new Date(b.dataset.date+'T12:00:00');offset=0;show()}
 else if(a==='prev'||a==='next'){offset+=a==='next'?1:-1;show()}
 else if(a==='mark'){if(!safeDate(selectedDay))return;var x=saved(),k=dateKey(selectedDay);x[k]=!x[k];localStorage.setItem('nexo_dias_estudados_lab_v1',JSON.stringify(x));show()}
 else if(a==='contest'){var x=get();x.principal=b.dataset.id;localStorage.setItem('nexo_meus_concursos_v1',JSON.stringify(x));document.dispatchEvent(new CustomEvent('nexo:concursos-alterados',{detail:x}));show()}
 else if(a==='manage'&&window.nexoGerenciarConcursos)window.nexoGerenciarConcursos();
 else if(a==='trail'&&window.nexoCronograma)window.nexoCronograma('semana');
 else if(a==='questions'&&window.nexoPraticarQuestoes)window.nexoPraticarQuestoes();
 else if(a==='review'&&window.nexoRevisar)window.nexoRevisar();
 else if(a==='books'&&window.nexoLivros)window.nexoLivros();
 else if(a==='simulados'&&window.nexoSimulados)window.nexoSimulados();
});
var oldHome=window.home;
window.home=function(){if(typeof closeMobileNav==='function')closeMobileNav();show()};
})();
