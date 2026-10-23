/* NEXO Lab — Tutor NEXO (Fase 1: tutor de questões).
   Questões AUTORAIS fixas, com correção comentada alternativa por alternativa, lei seca, materiais e perguntas
   de seguimento com respostas pré-preparadas. Não há IA conectada, não há questões oficiais e nada é gravado no
   Supabase nem no caderno/desempenho do NEXO: o histórico fica em localStorage próprio (nexo_tutor_lab_v1).
   Sem fonte validada, jurisprudência aparece como "nenhum precedente verificado". */
(function(){
'use strict';
var KH='nexo_tutor_lab_v1';
var Q=[
{id:'cf-5-xi',disc:'Direito Constitucional',art:'CF/88 · art. 5º, XI',enun:'Em relação à inviolabilidade do domicílio, prevista na Constituição Federal, assinale a alternativa correta.',gab:1,
alts:[['Somente com autorização judicial, em qualquer horário.','Errada. A ordem judicial só vale durante o dia; à noite não basta. Além disso, não é a única exceção.'],['Em caso de flagrante delito, mesmo sem consentimento do morador.','Correta. O art. 5º, XI permite entrar sem consentimento em flagrante delito, desastre ou socorro, a qualquer hora.'],['Por ordem verbal de qualquer autoridade policial.','Errada. A Constituição não prevê ordem verbal de autoridade policial; só a determinação judicial, durante o dia.'],['Sempre que houver suspeita de crime, sem necessidade de justificativa.','Errada. Mera suspeita não autoriza o ingresso; é preciso situação de flagrante, com justa causa demonstrável.']],
lei:'a casa é asilo inviolável do indivíduo, ninguém nela podendo penetrar sem consentimento do morador, salvo em caso de flagrante delito ou desastre, ou para prestar socorro, ou, durante o dia, por determinação judicial;',
dest:['salvo em caso de flagrante delito'],pts:[['Regra','a casa é inviolável (protege a intimidade e a vida privada)'],['Exceções','flagrante delito, desastre, socorro ou determinação judicial (durante o dia)'],['Finalidade','proteger o indivíduo contra ingerências indevidas do Estado']],
res:['Direitos e garantias individuais · domicílio','A casa é protegida. Sem o consentimento do morador, só se entra em quatro situações: flagrante delito, desastre, prestação de socorro (a qualquer hora do dia ou da noite) e determinação judicial (somente de dia).'],
cards:[['Quais são as exceções à inviolabilidade do domicílio?','Flagrante, desastre, socorro e ordem judicial (esta só de dia).'],['A ordem judicial vale à noite?','Não. Somente durante o dia.'],['Mera suspeita autoriza entrar na casa?','Não. É preciso uma das hipóteses do art. 5º, XI.']],
R:{'Quais as exceções?':'Pela CF, art. 5º, XI, sem consentimento do morador pode-se entrar em: flagrante delito, desastre e prestação de socorro (a qualquer hora) e, por determinação judicial, somente durante o dia.','Dê um exemplo prático':'Ouvem-se gritos de agressão dentro de uma casa. A polícia pode entrar à noite para fazer cessar o crime em andamento, pois há flagrante, sem precisar de mandado.','Explique de forma simples':'Regra: a casa é protegida. Entrar sem o morador deixar só em 4 situações: flagrante, desastre, socorro ou ordem de juiz, e esta só de dia.','Como memorizar?':'Mnemônico "F-D-S-J": Flagrante, Desastre, Socorro (24h) e Judicial (só de dia).'}},
{id:'cf-5-lxi',disc:'Direito Constitucional',art:'CF/88 · art. 5º, LXI',enun:'No que se refere à prisão, de acordo com a Constituição Federal, assinale a alternativa correta.',gab:1,
alts:[['Pode ser decretada por ordem verbal do delegado de polícia.','Errada. A Constituição exige ordem escrita e fundamentada de autoridade judiciária competente; ordem verbal não basta.'],['Só ocorre em flagrante delito ou por ordem escrita e fundamentada de autoridade judiciária competente, ressalvadas transgressão militar e crime propriamente militar.','Correta. Reproduz o art. 5º, LXI, incluindo a ressalva dos casos militares.'],['Somente por ordem judicial, sem nenhuma exceção.','Errada. O flagrante delito dispensa ordem judicial, e há a ressalva dos casos militares.'],['Qualquer autoridade pública pode decretá-la, desde que por escrito.','Errada. Só a autoridade judiciária competente pode decretar a prisão por ordem escrita.']],
lei:'ninguém será preso senão em flagrante delito ou por ordem escrita e fundamentada de autoridade judiciária competente, salvo nos casos de transgressão militar ou crime propriamente militar, definidos em lei;',
dest:['em flagrante delito ou por ordem escrita e fundamentada de autoridade judiciária competente'],pts:[['Regra','só se prende em flagrante ou por ordem judicial escrita e fundamentada'],['Ressalva','transgressão militar e crime propriamente militar'],['Finalidade','garantir a liberdade e evitar prisões arbitrárias']],
res:['Direitos e garantias individuais · prisão','A prisão exige flagrante delito ou ordem escrita e fundamentada de juiz competente. Há uma ressalva para transgressão militar e crime propriamente militar, definidos em lei.'],
cards:[['Quando alguém pode ser preso, segundo o art. 5º, LXI?','Em flagrante delito ou por ordem escrita e fundamentada de autoridade judiciária competente.'],['Qual a ressalva?','Transgressão militar e crime propriamente militar, definidos em lei.'],['Ordem verbal basta para prender?','Não. A ordem deve ser escrita e fundamentada.']],
R:{'Quais as exceções?':'A regra é flagrante ou ordem escrita e fundamentada de juiz competente. A ressalva do art. 5º, LXI são a transgressão militar e o crime propriamente militar, definidos em lei.','Dê um exemplo prático':'Uma pessoa é surpreendida cometendo um furto: pode ser presa em flagrante sem mandado. Já para prender alguém que não está em flagrante, é preciso ordem escrita e fundamentada do juiz.','Explique de forma simples':'Só se prende de dois jeitos: pegando no ato (flagrante) ou com ordem do juiz por escrito e com motivos. Casos militares têm regra à parte.','Como memorizar?':'"Flagrante ou Juiz por escrito" (+ militar à parte).'}},
{id:'cp-14-ii',disc:'Direito Penal',art:'CP · art. 14, II e parágrafo único',enun:'Sobre a tentativa, de acordo com o Código Penal, assinale a alternativa correta.',gab:1,
alts:[['O crime é tentado quando o agente desiste voluntariamente de prosseguir na execução.','Errada. Desistir voluntariamente caracteriza desistência voluntária (art. 15), não tentativa.'],['Iniciada a execução, o crime não se consuma por circunstâncias alheias à vontade do agente; salvo disposição em contrário, a pena é a do crime consumado diminuída de um a dois terços.','Correta. Reproduz o art. 14, II e seu parágrafo único.'],['A tentativa é sempre punida com a mesma pena do crime consumado.','Errada. A regra é a redução de um a dois terços, salvo disposição em contrário.'],['Basta a cogitação do crime para configurar a tentativa.','Errada. A tentativa exige início da execução; a mera cogitação não é punível.']],
lei:'Art. 14 - Diz-se o crime: [...] II - tentado, quando, iniciada a execução, não se consuma por circunstâncias alheias à vontade do agente. Parágrafo único - Salvo disposição em contrário, pune-se a tentativa com a pena correspondente ao crime consumado, diminuída de um a dois terços.',
dest:['iniciada a execução, não se consuma por circunstâncias alheias à vontade do agente'],pts:[['Requisitos','execução iniciada e não consumação por causa alheia à vontade do agente'],['Pena','a do crime consumado, diminuída de 1 a 2/3, salvo disposição em contrário'],['Atenção','desistir por conta própria é desistência voluntária (art. 15)']],
res:['Direito Penal · tentativa','Tentativa = execução iniciada + não consumação por causa alheia à vontade do agente. Pena do consumado reduzida de 1 a 2/3, salvo disposição em contrário. Desistir por conta própria é outra figura (art. 15).'],
cards:[['O que é crime tentado?','Iniciada a execução, não se consuma por circunstâncias alheias à vontade do agente.'],['Qual a pena da tentativa?','A do crime consumado, diminuída de um a dois terços, salvo disposição em contrário.'],['Cogitar o crime já é tentativa?','Não. É preciso iniciar a execução.']],
R:{'Quais as exceções?':'O próprio parágrafo único do art. 14 ressalva "disposição em contrário": a lei pode prever pena diferente para a tentativa de certos crimes. Também não há tentativa na mera cogitação.','Dê um exemplo prático':'O agente dispara para matar, mas a vítima é socorrida e sobrevive: a execução começou e o resultado não ocorreu por causa alheia à vontade dele. É tentativa.','Explique de forma simples':'Começou a executar e não conseguiu terminar por causa de fora: tentativa. A pena cai de 1/3 a 2/3.','Como memorizar?':'"Começou, não terminou por causa de fora" = tentativa; pena menos 1 a 2/3.'}}
];

var CH=['Quais as exceções?','Dê um exemplo prático','Explique de forma simples','Como memorizar?'];
var cur=0,sel=null,fez={},PT='mat',origem='autoral';
function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function hist(){try{return JSON.parse(localStorage.getItem(KH)||'{}')}catch(e){return{}}}
function salva(id,ok){try{var h=hist();h[id]={ok:ok,t:Date.now()};localStorage.setItem(KH,JSON.stringify(h))}catch(e){}}
function V(){return document.getElementById('view')}
function $(s,r){return (r||document).querySelector(s)}
var IC={
 l:'<path d="M4 4h7a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H4zM20 4h-6M20 4v14h-6"/>',
 r:'<path d="M6 3h9l4 4v14H6zM9 12h7M9 16h7"/>',
 j:'<path d="M14 4l6 6-3 3-6-6zM4 20l8-8M11 7L7 11"/>',
 q:'<path d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01"/>',
 cap:'<path d="M12 3l9 5-9 5-9-5 9-5zM6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5"/>'};
function ico(k){return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+IC[k]+'</svg>'}
function destaque(q){var t=esc(q.lei);(q.dest||[]).forEach(function(d){t=t.replace(esc(d),'<mark>'+esc(d)+'</mark>')});return t}
function sims(lista){return lista.map(function(x,n){var i=Q.indexOf(x),r=hist()[x.id];return '<button type="button" class="tt-sq" data-tt="q" data-i="'+i+'"><i>'+(n+1)+'</i><b>'+esc(x.art.split(' · ')[1])+'<span>'+esc(x.disc)+'</span></b><em>autoral'+(r?(r.ok?' ✓':' ✗'):'')+'</em></button>'}).join('')}

function painel(){var q=Q[cur],h='';
 if(PT==='mat'){
  h+='<div class="tt-blk"><h3><i class="ic-l">'+ico('l')+'</i>Lei seca ('+esc(q.art)+')</h3><div class="tt-box">'+destaque(q)+'</div><button type="button" class="tt-more" data-tt="lei">› Ver artigo completo</button></div>';
  h+='<div class="tt-blk"><h3><i class="ic-r">'+ico('r')+'</i>Resumo do assunto</h3><div class="tt-box"><b class="tt-warn">'+esc(q.res[0].split(' · ').pop())+'</b><ul>'+q.pts.map(function(p){return '<li><b>'+esc(p[0])+':</b> '+esc(p[1])+'</li>'}).join('')+'</ul></div><button type="button" class="tt-more" data-tt="res">› Ver resumo completo</button></div>';
  h+='<div class="tt-blk"><h3><i class="ic-j">'+ico('j')+'</i>Jurisprudência relacionada</h3><div class="tt-box"><b>Nenhum precedente verificado</b><p class="tt-ind">O Tutor só exibirá súmulas e julgados com número, tribunal e texto conferidos na fonte oficial. Nada é inventado.</p></div></div>';
  h+='<div class="tt-blk"><h3><i class="ic-q">'+ico('q')+'</i>Questões similares</h3>'+sims(Q.filter(function(x){return x!==q}))+'</div>';
 }else if(PT==='orig'){var r=hist()[q.id];
  h='<div class="tt-blk"><h3><i class="ic-q">'+ico('q')+'</i>Origem da questão</h3><div class="tt-box"><ul class="tt-nl"><li><b>Tipo:</b> autoral (criada para o Tutor)</li><li><b>Banca/ano:</b> não se aplica</li><li><b>Disciplina:</b> '+esc(q.disc)+'</li><li><b>Fundamento:</b> '+esc(q.art)+'</li><li><b>Gabarito:</b> '+(fez[q.id]?'ABCD'[q.gab]:'revelado após responder')+'</li></ul></div><p class="tt-ind">Questões oficiais só entram com banca, ano, cargo e gabarito conferidos na fonte. Sem isso, aparecem como indisponíveis.</p></div>';
 }else{h='<div class="tt-blk"><h3><i class="ic-q">'+ico('q')+'</i>Mais questões</h3>'+sims(Q)+'</div>'}
 $('#tt-pp').innerHTML=h;
 document.querySelectorAll('#tt-ptabs button').forEach(function(b){var on=b.dataset.p===PT;b.classList.toggle('on',on);b.setAttribute('aria-selected',on)});
}
function desemp(){var h=hist(),ids=Object.keys(h),a=ids.filter(function(k){return h[k].ok}).length;
 $('#tt-perf').innerHTML=ids.length?'<b class="tt-big">'+a+' de '+ids.length+'</b> acertos<div class="tt-bars">'+Q.map(function(q){var r=h[q.id];return '<i class="'+(r?(r.ok?'ok':'no'):'')+'"></i>'}).join('')+'</div><p class="tt-ind">Salvo só neste navegador, separado do seu desempenho no NEXO.</p>':'<p class="tt-ind">Nenhuma resposta ainda. Os dados ficam só neste navegador.</p>'}
function navq(){var h=hist();$('#tt-nav').innerHTML=Q.map(function(q,i){var r=h[q.id];return '<button type="button" data-tt="q" data-i="'+i+'" class="'+(i===cur?'on ':'')+(r?(r.ok?'ok':'no'):'')+'" aria-label="Questão '+(i+1)+'">'+(i+1)+'</button>'}).join('')+'<span class="tt-pg"><button type="button" data-tt="d" data-d="-1" aria-label="Anterior">←</button><button type="button" data-tt="d" data-d="1" aria-label="Próxima">→</button></span>'}
function alts(rev,s){var q=Q[cur];$('#tt-alts').innerHTML=q.alts.map(function(a,i){var c='';if(rev)c=i===q.gab?' ok':(i===s?' no':'');else if(sel===i)c=' sel';return '<button type="button" class="tt-alt'+c+'" data-tt="alt" data-i="'+i+'"'+(rev?' disabled':'')+'><i>'+'ABCD'[i]+'</i><span>'+esc(a[0])+'</span></button>'}).join('')}
function carrega(i){cur=i;sel=null;var q=Q[i],f=fez[q.id];
 $('#tt-tags').innerHTML='<span class="tt-tag">'+esc(q.disc)+'</span><span class="tt-tag">'+esc(q.art)+'</span><span class="tt-tag au">AUTORAL · não é questão de banca</span>';
 $('#tt-enun').textContent=q.enun;$('#tt-res').innerHTML='';$('#tt-an').hidden=true;$('#tt-msgs').innerHTML='';
 $('#tt-env').style.display='';$('#tt-env').disabled=true;
 if(f){revela(f.sel===q.gab,f.sel)}else alts(false);
 navq();painel();desemp()}
function revela(ok,s){var q=Q[cur];alts(true,s);$('#tt-env').style.display='none';
 $('#tt-res').innerHTML='<div class="tt-resb '+(ok?'ok':'no')+'"><h3>'+(ok?'Você acertou!':'Você errou.')+' Gabarito: '+'ABCD'[q.gab]+'</h3><span>Fundamento: '+esc(q.art)+'.</span></div>';
 $('#tt-p-ex').innerHTML=q.alts.map(function(a,i){return '<div class="tt-it"><b><span class="tt-v '+(i===q.gab?'c':'e')+'">'+(i===q.gab?'CERTA':'ERRADA')+'</span>'+'ABCD'[i]+') '+esc(a[0])+'</b>'+esc(a[1])+'</div>'}).join('');
 $('#tt-p-ls').innerHTML='<div class="tt-lei"><small>'+esc(q.art)+'</small>'+esc(q.lei)+'</div>';
 $('#tt-p-mt').innerHTML='<button type="button" class="tt-lk" data-tt="res">Resumo · '+esc(q.res[0])+' <span>abrir →</span></button><button type="button" class="tt-lk" data-tt="cards">Cards · '+q.cards.length+' cartões <span>estudar →</span></button><button type="button" class="tt-lk" data-tt="lei">Lei seca · '+esc(q.art)+' <span>abrir →</span></button>';
 $('#tt-base').textContent='Base da explicação: texto legal integral ('+q.art+').';
 $('#tt-chips').innerHTML=CH.map(function(c){return '<button type="button" class="tt-chip" data-tt="chip">'+c+'</button>'}).join('');
 $('#tt-an').hidden=false}
function envia(){var q=Q[cur];if(sel===null||fez[q.id])return;var ok=sel===q.gab;fez[q.id]={sel:sel};salva(q.id,ok);revela(ok,sel);navq();painel();desemp()}
function conv(t){var q=Q[cur],m=$('#tt-msgs'),u=document.createElement('div');u.className='tt-m u';u.textContent=t;m.appendChild(u);var r=document.createElement('div');r.className='tt-m t';r.innerHTML=esc(q.R[t]||'Nesta fase, o Tutor só responde às perguntas sugeridas. A versão com IA responderá com base nas fontes do acervo e dirá quando a fonte não sustentar a resposta.')+'<small>Fonte: '+esc(q.art)+' · resposta pré-preparada (demonstração)</small>';m.appendChild(r);try{r.scrollIntoView({block:'nearest'})}catch(e){}}
function gaveta(html){var d=$('#tt-dr');$('#tt-drc').innerHTML=html;d.classList.add('on');var x=$('#tt-drx');if(x)x.focus()}
function fechaG(){var d=$('#tt-dr');if(d)d.classList.remove('on')}
function cardsG(){var q=Q[cur];gaveta('<h2>Cards</h2><p class="tt-ind">Toque no cartão para ver a resposta.</p>'+q.cards.map(function(c){return '<button type="button" class="tt-flip" data-tt="flip"><small>Pergunta</small>'+esc(c[0])+'<div hidden><small>Resposta</small>'+esc(c[1])+'</div></button>'}).join(''))}

function desenha(){
 V().innerHTML='<div class="nx-page tt"><div class="tt-top"><h1>Tutor NEXO</h1><p class="tt-sub">Resolva, receba a correção comentada e consulte a fonte legal. <span class="tt-lab">Protótipo: questões autorais, sem IA conectada.</span></p></div>'
 +'<div class="tt-grid"><section><div class="tt-card">'
 +'<div class="nx-seg" id="tt-orig" role="tablist"><button type="button" role="tab" aria-pressed="true" data-tt="o" data-o="autoral">Questão autoral</button><button type="button" role="tab" aria-pressed="false" data-tt="o" data-o="oficial">Questão oficial</button></div>'
 +'<div id="tt-of" class="tt-resb" hidden><h3>Indisponível</h3><span>Questões oficiais só aparecem com origem e gabarito validados. Nenhuma foi carregada nesta fase.</span></div>'
 +'<div id="tt-qa"><div class="tt-nav" id="tt-nav"></div><div class="tt-tags" id="tt-tags"></div><p class="tt-enun" id="tt-enun"></p><div id="tt-alts"></div>'
 +'<button type="button" class="tt-btn" id="tt-env" disabled data-tt="env">Enviar resposta</button><div class="tt-kb">Atalhos: <kbd>A</kbd>–<kbd>D</kbd> escolhem, <kbd>Enter</kbd> envia.</div><div id="tt-res"></div>'
 +'<div id="tt-an" hidden><div class="tt-tabs" role="tablist"><button type="button" class="on" data-tt="t" data-t="ex">Explicação</button><button type="button" data-tt="t" data-t="ls">Lei seca</button><button type="button" data-tt="t" data-t="mt">Materiais</button></div>'
 +'<div class="tt-pane on" id="tt-p-ex"></div><div class="tt-pane" id="tt-p-ls"></div><div class="tt-pane" id="tt-p-mt"></div><div class="tt-base"><i></i><span id="tt-base"></span></div>'
 +'<div class="tt-chat"><div class="tt-chips" id="tt-chips"></div><div class="tt-msgs" id="tt-msgs" aria-live="polite"></div><form id="tt-f"><input id="tt-q" placeholder="Pergunte ao Tutor sobre exceções, exemplos ou memorização…" aria-label="Pergunta ao Tutor"><button type="submit" class="tt-btn">Enviar</button></form></div></div></div></div></section>'
 +'<div class="tt-side"><div class="tt-card"><div class="tt-ptabs" id="tt-ptabs" role="tablist"><button type="button" data-tt="p" data-p="mat">Materiais do NEXO</button><button type="button" data-tt="p" data-p="orig">Questão original</button><button type="button" data-tt="p" data-p="mais">Mais questões</button></div><div id="tt-pp"></div></div>'
 +'<div class="tt-card"><h2 class="tt-h2">Seu desempenho no Tutor</h2><div id="tt-perf"></div></div></div></div>'
 +'<div class="tt-dr" id="tt-dr"><div><button type="button" class="tt-x" id="tt-drx" data-tt="x" aria-label="Fechar">✕</button><div id="tt-drc"></div></div></div></div>';
 $('#tt-f').onsubmit=function(e){e.preventDefault();var i=$('#tt-q'),v=i.value.trim();if(!v)return;conv(v);i.value=''};
 carrega(cur)}

document.addEventListener('click',function(e){var t=e.target.closest&&e.target.closest('.tt [data-tt]');if(!t||!$('.tt'))return;var k=t.dataset.tt,q=Q[cur];
 if(k==='alt'){if(fez[q.id])return;sel=+t.dataset.i;$('#tt-env').disabled=false;alts(false)}
 else if(k==='env')envia();
 else if(k==='q'){fechaG();origem='autoral';var s=$('#tt-orig [data-o="autoral"]');if(s)s.click();carrega(+t.dataset.i)}
 else if(k==='d')carrega((cur+ +t.dataset.d+Q.length)%Q.length);
 else if(k==='p'){PT=t.dataset.p;painel()}
 else if(k==='t'){document.querySelectorAll('.tt-tabs button').forEach(function(b){b.classList.toggle('on',b===t)});['ex','ls','mt'].forEach(function(x){$('#tt-p-'+x).classList.toggle('on',x===t.dataset.t)})}
 else if(k==='o'){var of=t.dataset.o==='oficial';document.querySelectorAll('#tt-orig button').forEach(function(b){var on=b===t;b.setAttribute('aria-pressed',on)});$('#tt-of').hidden=!of;$('#tt-qa').style.display=of?'none':''}
 else if(k==='chip')conv(t.textContent);
 else if(k==='lei')gaveta('<h2>'+esc(q.art)+'</h2><p class="tt-ind">Texto legal</p><div class="tt-lei">'+esc(q.lei)+'</div>');
 else if(k==='res')gaveta('<h2>Resumo</h2><p class="tt-ind">'+esc(q.res[0])+'</p><p>'+esc(q.res[1])+'</p>');
 else if(k==='cards')cardsG();
 else if(k==='flip'){var d=t.querySelector('div'),v=d.hidden;d.hidden=!v;t.classList.toggle('b',v)}
 else if(k==='x')fechaG()});
document.addEventListener('click',function(e){var d=$('#tt-dr');if(d&&e.target===d)fechaG()});
document.addEventListener('keydown',function(e){if(!$('.tt'))return;if(e.key==='Escape')fechaG();
 if(/INPUT|TEXTAREA|SELECT/.test((document.activeElement||{}).tagName||''))return;if(e.ctrlKey||e.metaKey||e.altKey)return;
 var q=Q[cur],qa=$('#tt-qa');if(!qa||qa.style.display==='none'||fez[q.id])return;var i='abcd'.indexOf((e.key||'').toLowerCase());
 if(e.key&&e.key.length===1&&i>=0){sel=i;$('#tt-env').disabled=false;alts(false)}
 else if(e.key==='Enter'&&sel!==null&&document.activeElement.tagName!=='BUTTON'){e.preventDefault();envia()}});

window.nexoTutor=function(){try{if(typeof closeMobileNav==='function')closeMobileNav()}catch(e){}
 try{current='tutor'}catch(e){}try{renderNav()}catch(e){}
 var h=document.getElementById('head');if(h)h.textContent='Tutor NEXO';
 desenha();try{window.scrollTo(0,0)}catch(e){}};

/* entrada no menu lateral, depois de "Desempenho" */
var rn=window.renderNav;
window.renderNav=function(){try{if(typeof rn==='function')rn.apply(this,arguments)}catch(e){}
 var nav=document.getElementById('nav');if(!nav)return;var old=nav.querySelector('.nx-nav-tutor');if(old)old.remove();
 var ativo=false;try{ativo=current==='tutor'}catch(e){}
 var b='<button type="button" class="primary-nav nx-nav-extra nx-nav-tutor'+(ativo?' active':'')+'" onclick="nexoTutor()"><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+IC.cap+'</svg> Tutor NEXO</button>';
 var ex=nav.querySelectorAll('.nx-nav-extra:not(.nx-nav-tutor)'),ref=ex[ex.length-1];
 if(ref)ref.insertAdjacentHTML('afterend',b);
 else{var fc=nav.querySelector('.primary-nav');if(fc)fc.insertAdjacentHTML('afterend',b)}
 if(ativo)nav.querySelectorAll('.primary-nav:not(.nx-nav-tutor)').forEach(function(x){x.classList.remove('active')})};
try{window.renderNav()}catch(e){}
})();
