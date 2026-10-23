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
function show(){
 var view=document.getElementById('view');if(!view)return;
 var x=get(),it=x.items.find(function(z){return z.id===x.principal})||x.items[0],s=plan(),match=!!(it&&s&&s.plan&&s.plan.edital===it.id&&s.plan.cargo===it.cargo),dt=new Date();dt.setDate(dt.getDate()+offset*7);
 var marks=saved(),days=Array.from({length:7},function(_,i){var d=new Date(dt);d.setDate(dt.getDate()-((dt.getDay()+6)%7)+i);return d;});
 var names={pcba:'Polícia Civil da Bahia',pcpe:'Polícia Civil de Pernambuco',pf:'Polícia Federal',prf:'Polícia Rodoviária Federal',pmpe:'Polícia Militar de Pernambuco'};
 var tasks=match?dayTasks(s,selectedDay):[],completed=tasks.filter(function(t){return !!t.feito}).length;
 var h='<div class="nx-home-lab"><header><h1>Olá, Estudante!</h1><p>Seu planejamento de estudos em um só lugar.</p></header>';
 h+='<section class="nx-lab-days"><button data-lab="prev" aria-label="Semana anterior">‹</button>'+days.map(function(d){var key=dateKey(d),record=marks[key],done=record===true|| (match&&dayTasks(s,d).some(function(t){return !!t.feito}));return '<button data-lab="day" data-date="'+key+'" class="'+(key===dateKey(selectedDay)?'selected ':'')+(done?'done':'')+'"><small>'+['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'][d.getDay()]+'</small><b>'+d.getDate()+'</b><span>●</span></button>'}).join('')+'<button data-lab="next" aria-label="Semana seguinte">›</button></section>';
 h+='<div class="nx-lab-cols"><section class="nx-lab-panel"><div class="nx-lab-heading"><h2>Trilha do dia</h2><small>'+completed+' de '+tasks.length+' atividades</small></div>';
 if(!it)h+='<p>Selecione um concurso em Meus concursos para começar.</p>';
 else if(!match)h+='<div class="nx-lab-empty">O cronograma para este cargo ainda não está configurado. A trilha existente foi preservada.<button data-lab="trail">Configurar trilha</button></div>';
 else h+=tasks.length?tasks.map(function(t,i){return '<button class="nx-lab-task" data-lab="trail"><span class="nx-lab-num">'+(i+1)+'</span><span><b>'+e(t.nome||t.disc||t.tipo||'Atividade')+'</b><small>'+e(t.tipo||'Estudo')+' · '+(t.min||0)+' min</small></span><em>'+(t.feito?'Concluída':'Abrir trilha')+'</em></button>'}).join(''):'<p>Nenhuma tarefa programada para este dia.</p>';
 h+='</section><section class="nx-lab-panel"><div class="nx-lab-heading"><h2>Meus concursos</h2><button data-lab="manage">Gerenciar</button></div>';
 h+=x.items.length?x.items.map(function(z){return '<button class="nx-lab-contest '+(it&&it.id===z.id?'active':'')+'" data-lab="contest" data-id="'+e(z.id)+'"><span class="nx-lab-shield">◇</span><span><b>'+e(names[z.id]||z.id)+'</b><small>'+e(z.cargo)+'</small></span>'+(it&&it.id===z.id?'<strong>✓</strong>':'<span>›</span>')+'</button>'}).join(''):'<p>Nenhum concurso selecionado.</p>';
 h+='<p class="nx-lab-note">O emblema será exibido quando houver uma imagem oficial verificada.</p></section></div>';
 var hist;try{hist=window.nexoEstudo&&window.nexoEstudo.historico&&window.nexoEstudo.historico()}catch(x){}
 h+='<div class="nx-lab-metrics"><div><small>Questões resolvidas</small><strong>—</strong><p>Conectando ao histórico de questões</p></div><div><small>Taxa de acerto</small><strong>—</strong><p>Sem estatística confirmada nesta tela</p></div></div>';
 h+='<h2 class="nx-lab-quick-title">Acesso rápido</h2><div class="nx-lab-quick">'+[['Praticar questões','questions'],['Fazer simulado','simulados'],['Revisar','review'],['Livros digitais','books']].map(function(a){return '<button data-lab="'+a[1]+'">'+a[0]+' <span>↗</span></button>'}).join('')+'</div>';
 h+='<div class="nx-lab-mark"><button data-lab="mark">'+(marks[dateKey(selectedDay)]?'Desmarcar dia estudado':'Marcar dia estudado')+'</button><small>Marcação manual não conclui tarefas nem altera o edital.</small></div></div>';
 view.innerHTML=h;document.getElementById('head').textContent='Painel de estudos';
}
window.nexoPainelLab=show;
document.addEventListener('click',function(ev){
 var b=ev.target.closest('[data-lab]');if(!b)return;
 var a=b.dataset.lab;
 if(a==='day'){selectedDay=new Date(b.dataset.date+'T12:00:00');offset=0;show()}
 else if(a==='prev'||a==='next'){offset+=a==='next'?1:-1;show()}
 else if(a==='mark'){var x=saved(),k=dateKey(selectedDay);x[k]=!x[k];localStorage.setItem('nexo_dias_estudados_lab_v1',JSON.stringify(x));show()}
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
