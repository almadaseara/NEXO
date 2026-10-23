/* NEXO Lab — Barra de ferramentas da questão (Conteúdo de apoio, Tutor NEXO, Comentários, Cadernos, Estatísticas).
   Depois que o aluno responde, abaixo da questão aparecem, do próprio acervo do NEXO (módulo/assunto da questão):
   lei seca (law_items), resumo (highlights/summary), jurisprudência (juris), pegadinhas e as outras questões do
   mesmo assunto. Antes de responder, o painel fica bloqueado. Nada é inventado: sem conteúdo cadastrado, o bloco
   informa que não há. Não grava nada; só lê o acervo e o estado de respostas já existentes. */
(function(){
'use strict';
function $(s,r){return (r||document).querySelector(s)}
function $$(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))}
function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function txt(s){return String(s==null?'':s).replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim()}
function mods(){try{return modules}catch(e){return[]}}
function estado(){try{return JSON.parse(localStorage.getItem('nexo_practice_answers')||'{}')}catch(e){return{}}}
function acharModulo(key){
  var k=String(key).replace(/^(official|q)_/,''),i=k.lastIndexOf('_');if(i<0)return null;
  var id=k.slice(0,i),n=+k.slice(i+1),m=mods().find(function(x){return x.id===id});
  return m?{m:m,i:n,off:/^official_/.test(key)}:null;
}
var IC={
 l:'<path d="M4 4h7a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H4zM20 4h-6M20 4v14h-6"/>',
 r:'<path d="M6 3h9l4 4v14H6zM9 12h7M9 16h7"/>',
 j:'<path d="M14 4l6 6-3 3-6-6zM4 20l8-8M11 7L7 11"/>',
 a:'<path d="M12 3 2 20h20zM12 10v4M12 17h.01"/>',
 q:'<path d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01"/>',
 k:'<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>'};
function ico(k){return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+IC[k]+'</svg>'}

function bloqueio(){return '<div class="qx-lock"><i>'+ico('k')+'</i><span><b>Contexto do assunto bloqueado</b> Responda a questão para ver lei seca, resumo, jurisprudência e questões relacionadas.</span></div>'}

function blocoMateriais(m){
  var h='',leis=m.law_items||[];
  h+='<div class="qx-blk"><h3><i class="qx-ic l">'+ico('l')+'</i>Lei seca</h3>'+(leis.length?leis.slice(0,6).map(function(x,n){
    return '<details class="qx-det"'+(n===0?' open':'')+'><summary><b>'+esc(x[0])+'</b><span>'+esc(txt(x[1]).slice(0,90))+'</span></summary><div class="qx-lei">'+(x[2]||esc(x[1]))+'</div></details>'}).join('')+(leis.length>6?'<p class="qx-ind">+ '+(leis.length-6)+' dispositivos no livro do assunto.</p>':''):'<p class="qx-ind">Nenhum dispositivo de lei cadastrado para este assunto.</p>')+'</div>';
  var hl=m.highlights||[];
  h+='<div class="qx-blk"><h3><i class="qx-ic r">'+ico('r')+'</i>Resumo do assunto</h3><div class="qx-box"><b class="qx-warn">'+esc(m.title)+'</b>'+(hl.length?'<ul>'+hl.slice(0,5).map(function(x){return '<li>'+x+'</li>'}).join('')+'</ul>':'<p class="qx-ind">Sem pontos de destaque cadastrados.</p>')+'</div><button type="button" class="qx-more" data-qx="resumo" data-mod="'+esc(m.id)+'">› Abrir resumo completo</button></div>';
  var ju=m.juris||[];
  h+='<div class="qx-blk"><h3><i class="qx-ic j">'+ico('j')+'</i>Jurisprudência relacionada</h3>'+(ju.length?ju.slice(0,3).map(function(x){var t=Array.isArray(x)?x[0]:'',d=Array.isArray(x)?x[1]:x;return '<div class="qx-box qx-ju"><b>'+esc(t)+'</b><p>'+d+'</p></div>'}).join('')+(ju.length>3?'<details class="qx-det"><summary><b>Ver mais '+(ju.length-3)+' julgados e súmulas</b></summary>'+ju.slice(3).map(function(x){var t=Array.isArray(x)?x[0]:'',d=Array.isArray(x)?x[1]:x;return '<div class="qx-box qx-ju"><b>'+esc(t)+'</b><p>'+d+'</p></div>'}).join('')+'</details>':''):'<div class="qx-box"><b>Nenhum precedente cadastrado</b><p class="qx-ind">O NEXO só exibe julgados e súmulas do acervo conferido.</p></div>')+'</div>';
  var pg=m.pegadinhas||[];
  if(pg.length)h+='<div class="qx-blk"><h3><i class="qx-ic a">'+ico('a')+'</i>Pegadinhas de prova</h3><div class="qx-box"><ul>'+pg.slice(0,5).map(function(x){return '<li>'+(Array.isArray(x)?x.join(' — '):x)+'</li>'}).join('')+'</ul></div></div>';
  return h}

function blocoRelacionadas(info,key){
  var m=info.m,st=estado(),itens=[];
  (m.official_questions||[]).forEach(function(q,i){itens.push({k:'official_'+m.id+'_'+i,q:q})});
  (m.questions||[]).forEach(function(q,i){itens.push({k:'q_'+m.id+'_'+i,q:q})});
  itens=itens.filter(function(x){return x.k!==key});
  var h='<details class="qx-det qx-rel"><summary><i class="qx-ic q">'+ico('q')+'</i><b>Questões relacionadas ('+itens.length+')</b><span>mesmo assunto: '+esc(m.title)+'</span></summary><div class="qx-relb">';
  if(!itens.length)return h+'<p class="qx-ind">Nenhuma outra questão deste assunto no banco.</p></div></details>';
  h+=itens.slice(0,6).map(function(x,n){var r=st[x.k],t=txt(x.q.text);return '<button type="button" class="qx-sq" data-qx="rel" data-mod="'+esc(m.id)+'" data-key="'+esc(x.k)+'"><i>'+(n+1)+'</i><b>'+esc(t.length>96?t.slice(0,94).replace(/\s+\S*$/,'')+'…':t)+'<span>'+esc(x.q.source||'Caderno')+'</span></b><em class="'+(r?(r.ok?'ok':'no'):'')+'">'+(r?(r.ok?'acertou':'errou'):'não resolvida')+'</em></button>'}).join('');
  h+='<button type="button" class="qx-more" data-qx="rel" data-mod="'+esc(m.id)+'">› Praticar as '+itens.length+' do assunto</button></div></details>';
  return h}


var KC='nexo_cadernos_rev_lab_v1',KN='nexo_questao_notas_lab_v1',KL='nexo_hist_questoes_lab_v1';
function ler(k,d){try{var v=JSON.parse(localStorage.getItem(k));return v==null?d:v}catch(e){return d}}
function gravar(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
var AB={
 apoio:['Conteúdo de apoio','<path d="m12 3 9 5-9 5-9-5zM3 13l9 5 9-5M3 17.5l9 5 9-5"/>',true],
 tutor:['Tutor NEXO','<path d="M12 3l9 5-9 5-9-5 9-5zM6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5"/>',true],
 coment:['Comentários','<path d="M21 12a8 8 0 0 1-11.5 7.2L4 20l1-4.5A8 8 0 1 1 21 12zM9 10h6M9 14h4"/>',false],
 cad:['Cadernos','<path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3zM5 17a3 3 0 0 1 3-3h11"/>',false],
 est:['Estatísticas','<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',false]};
function barra(){return '<div class="qx-barra" role="tablist">'+Object.keys(AB).map(function(k){return '<button type="button" role="tab" aria-selected="false" data-qx="aba" data-a="'+k+'"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+AB[k][1]+'</svg><span>'+AB[k][0]+'</span></button>'}).join('')+'</div><div class="qx-painel" hidden></div>'}

/* ---------- Tutor NEXO: comentário elaborado ---------- */
var TUTOR={
 'official_art5_parte1_0':{ref:true,
  resumo:'A alternativa correta é a <b>B</b>: ela reproduz o princípio da legalidade do art. 5º, II da Constituição. Todas as outras trocam o sentido de um direito fundamental por uma versão errada, que é o jeito clássico de a banca montar a pegadinha.',
  fund:[['CF, art. 5º, II','"ninguém será obrigado a fazer ou deixar de fazer alguma coisa senão em virtude de lei" — princípio da legalidade para o particular.']],
  alts:[
   ['A','err','Igualdade de homens e mulheres está no art. 5º, I, mas o trecho final é falso. O art. 7º, XXX proíbe diferença de salários, de exercício de funções e de critério de admissão por motivo de sexo, idade, cor ou estado civil. Não existe "diferença salarial admitida por sexo".'],
   ['B','ok','Reproduz o art. 5º, II. Para o particular vale a regra "pode fazer tudo o que a lei não proíbe". Para a Administração Pública a lógica é a inversa (só o que a lei permite, art. 37, caput). É nessa troca que a banca costuma tentar derrubar o candidato.'],
   ['C','err','O art. 5º, IV garante a livre manifestação do pensamento, mas <b>veda o anonimato</b>. Atenção: a denúncia anônima não vira anonimato proibido; ela pode servir para iniciar diligências preliminares, mas não sustenta sozinha uma medida grave.'],
   ['D','err','O art. 5º, VI assegura a liberdade de consciência e de crença e a proteção dos locais de culto. O Brasil é um Estado <b>laico</b>: o art. 19, I veda à União, aos Estados, ao DF e aos Municípios estabelecer cultos religiosos ou igrejas, subvencioná-los ou manter com eles relações de dependência ou aliança (ressalvada a colaboração de interesse público, na forma da lei). "Estado confessional" é o oposto.'],
   ['E','err','Primeira parte correta (art. 5º, VI), segunda parte invertida. O art. 5º, VII <b>assegura</b>, nos termos da lei, a prestação de assistência religiosa nas entidades civis e militares de internação coletiva (hospitais, presídios, quartéis). A alternativa diz "vedada", o contrário do texto.']],
  peg:'A banca costuma copiar o início certo de um direito e trocar o final por uma palavra de sentido oposto ("vedada" no lugar de "assegurada", "permitido" no lugar de "vedado"). Leia a frase inteira antes de marcar.',
  dica:'Para cada alternativa, localize o inciso do art. 5º e compare palavra por palavra. Se um trecho nega o que a Constituição assegura (ou assegura o que ela veda), a alternativa está errada.',
  fontes:['CF, art. 5º, I, II, IV, VI e VII','CF, art. 7º, XXX','CF, art. 19, I','CF, art. 37, caput']}
};
function blocoTutor(info,key,done){
  var q=(info.off?info.m.official_questions:info.m.questions)[info.i];if(!q)return '<p class="qx-ind">Questão não encontrada.</p>';
  if(!done)return '<p class="qx-ind">Responda a questão para liberar o comentário do Tutor NEXO.</p>';
  var t=TUTOR[key],letras='ABCDE',gab=q.answer,h='<div class="qx-tut">';
  if(t){
    h+='<div class="qx-tag">Comentário de referência — revisão pendente</div>';
    h+='<h4>Resposta: alternativa '+esc(gab)+'</h4><p>'+t.resumo+'</p>';
    h+='<h4>Fundamento legal</h4>'+t.fund.map(function(f){return '<div class="qx-box"><b>'+esc(f[0])+'</b><p>'+f[1]+'</p></div>'}).join('');
    h+='<h4>Análise das alternativas</h4>'+t.alts.map(function(a,n){return '<div class="qx-alt '+a[1]+'"><span class="qx-lt">'+a[0]+'</span><div><b>'+(a[1]==='ok'?'Correta':'Errada')+'</b> — '+esc(txt(q.options[n]||'')).slice(0,140)+(txt(q.options[n]||'').length>140?'…':'')+'<p>'+a[2]+'</p></div></div>'}).join('');
    h+='<h4>Pegadinha da banca</h4><p>'+t.peg+'</p><h4>Como não errar</h4><p>'+t.dica+'</p><h4>Fontes</h4><ul>'+t.fontes.map(function(f){return '<li>'+esc(f)+'</li>'}).join('')+'</ul>';
  }else{
    h+='<div class="qx-tag gen">Resumo automático do acervo — análise detalhada em preparação</div>';
    h+='<h4>Resposta: alternativa '+esc(gab||'?')+'</h4>';
    h+=q.comment?'<p>'+q.comment+'</p>':'<p class="qx-ind">Esta questão ainda não tem comentário cadastrado.</p>';
    var peg=(info.m.pegadinhas||[]).slice(0,3);
    if(peg.length)h+='<h4>Pegadinhas do assunto</h4><ul>'+peg.map(function(x){return '<li>'+x+'</li>'}).join('')+'</ul>';
    var leis=(info.m.law_items||[]).slice(0,4);
    if(leis.length)h+='<h4>Dispositivos relacionados</h4><ul>'+leis.map(function(x){return '<li>'+esc(x[0])+'</li>'}).join('')+'</ul>';
    h+='<p class="qx-ind">A análise alternativa por alternativa só é exibida quando o comentário for elaborado e conferido na fonte. Nada é inventado.</p>';
  }
  return h+'</div>'}

/* ---------- Comentários (anotações pessoais) ---------- */
function blocoComent(key){var n=ler(KN,{})[key]||'';
  return '<div class="qx-head"><b>Seus comentários</b><span>* Salvo automaticamente</span></div><p class="qx-ind" style="margin:0 0 8px">Anotações pessoais sobre esta questão. Só você vê, neste aparelho.</p><textarea class="qx-nota" data-qx="nota" data-key="'+esc(key)+'" rows="5" placeholder="Escreva o que quer lembrar sobre esta questão…" aria-label="Seus comentários">'+esc(n)+'</textarea>'}

/* ---------- Cadernos de revisão ---------- */
function blocoCad(key){var cs=ler(KC,[]);
  var h='<div class="qx-head"><b>Cadernos de revisão</b><span>* Salvo automaticamente</span></div><p class="qx-ind" style="margin:0 0 10px">Crie quantos cadernos quiser para organizar questões que quer rever. Marque os cadernos em que esta questão deve entrar.</p>';
  h+=cs.length?cs.map(function(c){var no=c.q.indexOf(key)>=0;return '<div class="qx-cad" data-id="'+esc(c.id)+'"><label><input type="checkbox" data-qx="cadmarca" data-id="'+esc(c.id)+'" data-key="'+esc(key)+'"'+(no?' checked':'')+'><span class="qx-cn">'+esc(c.nome)+'</span><em>'+c.q.length+' '+(c.q.length===1?'questão':'questões')+'</em></label><span class="qx-cacts"><button type="button" data-qx="cadrev" data-id="'+esc(c.id)+'" title="Revisar caderno">Revisar</button><button type="button" data-qx="cadedit" data-id="'+esc(c.id)+'" aria-label="Renomear"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 20h4l11-11-4-4L4 16zM13 7l4 4"/></svg></button><button type="button" data-qx="cadexc" data-id="'+esc(c.id)+'" aria-label="Excluir"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/></svg></button></span></div>'}).join(''):'<p class="qx-ind">Você ainda não criou nenhum caderno.</p>';
  h+='<div class="qx-novo"><button type="button" class="qx-criar" data-qx="cadnovo">＋ Criar caderno</button></div>';
  return h}

/* ---------- Estatísticas ---------- */
function blocoEst(key){
  var log=(ler(KL,{})[key]||[]).slice(),st=estado()[key];
  if(!log.length&&st&&st.at)log=[{t:st.at,r:st.r||'',ok:!!st.ok}];
  log.sort(function(a,b){return b.t-a.t});
  function dt(t){try{return new Date(t).toLocaleString('pt-BR',{day:'2-digit',month:'2-digit',year:'numeric',hour:'2-digit',minute:'2-digit'})}catch(e){return ''}}
  return '<div class="qx-2col"><div><div class="qx-head"><b>Percentual por alternativa</b></div><p class="qx-ind" style="margin:0 0 8px">Porcentagem de marcação de outros alunos nesta questão.</p><div class="qx-box"><b>Indisponível</b><p class="qx-ind">O NEXO ainda não coleta as marcações de outros alunos, então não há porcentagem real para mostrar.</p></div></div>'
   +'<div><div class="qx-head"><b>Histórico de resolução</b></div><p class="qx-ind" style="margin:0 0 8px">Seu histórico de resolução desta questão.</p>'
   +(log.length?'<table class="qx-tab"><thead><tr><th>Data</th><th>Resposta</th><th>Status</th></tr></thead><tbody>'+log.slice(0,10).map(function(l){return '<tr><td>'+esc(dt(l.t))+'</td><td>'+esc(l.r||'—')+'</td><td class="'+(l.ok?'ok':'no')+'">'+(l.ok?'Acertou':'Errou')+'</td></tr>'}).join('')+'</tbody></table>':'<div class="qx-box"><p class="qx-ind" style="margin:0">Você ainda não respondeu esta questão.</p></div>')+'</div></div>'}

/* ---------- montagem ---------- */
function conteudo(a,card){
  var key=card.id.slice(5),info=acharModulo(key),done=card.dataset.done==='1';
  if(a==='coment')return blocoComent(key);
  if(a==='cad')return blocoCad(key);
  if(a==='est')return blocoEst(key);
  if(!info)return '<p class="qx-ind">Sem conteúdo cadastrado para esta questão.</p>';
  if(!done)return '<div class="qx-lock0"><i>'+ico('k')+'</i><span><b>Conteúdo bloqueado</b> Responda a questão para liberar o '+(a==='tutor'?'comentário do Tutor NEXO':'conteúdo de apoio: lei seca, resumo, jurisprudência e questões relacionadas')+'.</span></div>';
  if(a==='tutor')return blocoTutor(info,key,done);
  return blocoMateriais(info.m)+blocoRelacionadas(info,key)}
function abrirAba(card,a){
  var ctx=card.querySelector(':scope > .qx-ctx');if(!ctx)return;var pn=ctx.querySelector('.qx-painel');
  var btn=ctx.querySelector('[data-a="'+a+'"]'),aberta=btn&&btn.getAttribute('aria-selected')==='true';
  $$('.qx-barra button',ctx).forEach(function(b){b.setAttribute('aria-selected',b===btn&&!aberta?'true':'false')});
  if(aberta){pn.hidden=true;pn.innerHTML='';ctx.dataset.a='';return}
  ctx.dataset.a=a;pn.innerHTML='<div class="qx-corpo">'+conteudo(a,card)+'</div><div class="qx-fechar"><button type="button" data-qx="fechar">FECHAR <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div>';pn.hidden=false}
function atualizar(){
  $$('.card.q[id^="card_"]').forEach(function(c){
    var key=c.id.slice(5);if(!acharModulo(key))return;
    $$('.qx-ctx button,.qx-ctx input,.qx-ctx textarea',c).forEach(function(el){if(el.disabled)el.disabled=false});
    var ex=c.querySelector(':scope > .qx-ctx');
    if(!ex){var d=document.createElement('div');d.innerHTML='<div class="qx-ctx">'+barra()+'</div>';c.appendChild(d.firstChild);return}
    var a=ex.dataset.a;if(a&&AB[a]&&AB[a][2]){var pn=ex.querySelector('.qx-painel'),corpo=pn&&pn.querySelector('.qx-corpo'),done=c.dataset.done==='1',tinha=ex.dataset.done==='1';
      if(done!==tinha&&corpo){corpo.innerHTML=conteudo(a,c)}}
    ex.dataset.done=c.dataset.done==='1'?'1':'0'})}

function modal(html){var m=document.getElementById('qx-modal');if(!m){m=document.createElement('div');m.id='qx-modal';m.className='qx-modal';m.innerHTML='<div class="qx-mc"><button type="button" class="qx-mx" data-qx="mfechar" aria-label="Fechar">✕</button><div id="qx-mb"></div></div>';document.body.appendChild(m)}document.getElementById('qx-mb').innerHTML=html;m.classList.add('on')}
function fecharModal(){var m=document.getElementById('qx-modal');if(m)m.classList.remove('on')}
function revisarCad(id){var c=ler(KC,[]).find(function(x){return x.id===id});if(!c)return;var st=estado();
  var itens=c.q.map(function(k){var i=acharModulo(k);if(!i)return null;var q=(i.off?i.m.official_questions:i.m.questions)[i.i];return q?{k:k,q:q,m:i.m}:null}).filter(Boolean);
  modal('<h2>'+esc(c.nome)+'</h2><p class="qx-ind">'+itens.length+' '+(itens.length===1?'questão':'questões')+' neste caderno de revisão.</p>'+(itens.length?itens.map(function(x,n){var r=st[x.k],t=txt(x.q.text);return '<button type="button" class="qx-sq" data-qx="cadabrir" data-mod="'+esc(x.m.id)+'" data-key="'+esc(x.k)+'"><i>'+(n+1)+'</i><b>'+esc(t.length>110?t.slice(0,108).replace(/\s+\S*$/,'')+'…':t)+'<span>'+esc(x.m.title)+' · '+esc(x.q.source||'Caderno')+'</span></b><em class="'+(r?(r.ok?'ok':'no'):'')+'">'+(r?(r.ok?'acertou':'errou'):'não resolvida')+'</em></button>'}).join(''):'<p class="qx-ind">Este caderno ainda não tem questões. Abra uma questão, vá em Cadernos e marque este caderno.</p>'))}

document.addEventListener('click',function(e){var t=e.target.closest&&e.target.closest('[data-qx]');if(!t)return;var k=t.dataset.qx,card=t.closest('.card.q');
  if(k==='aba'){abrirAba(card,t.dataset.a)}
  else if(k==='fechar'){var ctx=t.closest('.qx-ctx'),pn=ctx.querySelector('.qx-painel');pn.hidden=true;pn.innerHTML='';ctx.dataset.a='';$$('.qx-barra button',ctx).forEach(function(b){b.setAttribute('aria-selected','false')})}
  else if(k==='resumo'){var id=t.dataset.mod;if(window.nexoLivro&&window.nexoLivro.abrir)window.nexoLivro.abrir(id,'resumo');else if(typeof openModule==='function')openModule(id)}
  else if(k==='rel'||k==='cadabrir'){fecharModal();var mid=t.dataset.mod,alvo=t.dataset.key;if(typeof window.nexoPraticar==='function'){window.nexoPraticar({mod:mid});if(alvo)setTimeout(function(){var c=document.getElementById('card_'+alvo);if(c&&c.scrollIntoView)try{c.scrollIntoView({block:'start'})}catch(x){}},350)}}
  else if(k==='mfechar')fecharModal();
  else if(k==='cadmarca'){var cs=ler(KC,[]),c=cs.find(function(x){return x.id===t.dataset.id});if(c){var ix=c.q.indexOf(t.dataset.key);if(t.checked&&ix<0)c.q.push(t.dataset.key);if(!t.checked&&ix>=0)c.q.splice(ix,1);gravar(KC,cs);var em=t.parentNode.querySelector('em');if(em)em.textContent=c.q.length+' '+(c.q.length===1?'questão':'questões')}}
  else if(k==='cadrev')revisarCad(t.dataset.id);
  else if(k==='cadnovo'){var box=t.parentNode;box.innerHTML='<input type="text" class="qx-in" maxlength="60" placeholder="Nome do caderno" aria-label="Nome do caderno"><button type="button" class="qx-ok" data-qx="cadsalvar">Criar</button><button type="button" class="qx-no" data-qx="cadcancel">Cancelar</button>';var i=box.querySelector('input');if(i)i.focus()}
  else if(k==='cadcancel'||k==='cadsalvar'){var corpo=t.closest('.qx-corpo'),cd=t.closest('.card.q');if(k==='cadsalvar'){var inp=t.parentNode.querySelector('input'),nome=(inp.value||'').trim().slice(0,60);if(nome){var cs2=ler(KC,[]);cs2.push({id:'c'+Date.now().toString(36),nome:nome,q:[]});gravar(KC,cs2)}}corpo.innerHTML=blocoCad(cd.id.slice(5))}
  else if(k==='cadedit'){var row=t.closest('.qx-cad'),cn=row.querySelector('.qx-cn');var cc=ler(KC,[]).find(function(x){return x.id===t.dataset.id});if(!cc)return;row.querySelector('label').outerHTML='<span class="qx-ed"><input type="text" class="qx-in" maxlength="60" value="'+esc(cc.nome)+'" aria-label="Novo nome"></span>';var ii=row.querySelector('.qx-in');ii.focus();ii.select();t.dataset.qx='cadedsalvar'}
  else if(k==='cadedsalvar'){var r2=t.closest('.qx-cad'),nm=(r2.querySelector('.qx-in').value||'').trim().slice(0,60),cs3=ler(KC,[]),c3=cs3.find(function(x){return x.id===t.dataset.id});if(c3&&nm){c3.nome=nm;gravar(KC,cs3)}t.closest('.qx-corpo').innerHTML=blocoCad(t.closest('.card.q').id.slice(5))}
  else if(k==='cadexc'){if(t.dataset.sure!=='1'){t.dataset.sure='1';t.classList.add('sure');t.innerHTML='Excluir?';setTimeout(function(){if(t.isConnected&&t.dataset.sure==='1'){t.dataset.sure='';t.classList.remove('sure');t.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/></svg>'}},3500);return}
    var cs4=ler(KC,[]).filter(function(x){return x.id!==t.dataset.id});gravar(KC,cs4);t.closest('.qx-corpo').innerHTML=blocoCad(t.closest('.card.q').id.slice(5))}
});
document.addEventListener('input',function(e){var t=e.target;if(t&&t.dataset&&t.dataset.qx==='nota'){var n=ler(KN,{});if(t.value.trim())n[t.dataset.key]=t.value;else delete n[t.dataset.key];gravar(KN,n)}});
document.addEventListener('keydown',function(e){if(e.key==='Escape')fecharModal();var t=e.target;if(e.key==='Enter'&&t&&t.classList&&t.classList.contains('qx-in')){var b=t.parentNode.querySelector('[data-qx="cadsalvar"],[data-qx="cadedsalvar"]')||t.closest('.qx-cad')&&t.closest('.qx-cad').querySelector('[data-qx="cadedsalvar"]');if(b)b.click()}});

/* histórico próprio de resoluções (só leitura do que o aluno já faz; grava no navegador) */
var sp=window.savePracticeAnswer;
if(typeof sp==='function'&&!sp.__qx){var novoSp=function(key,ok,letra){try{var l=ler(KL,{});(l[key]=l[key]||[]).push({t:Date.now(),ok:!!ok,r:letra||''});if(l[key].length>30)l[key]=l[key].slice(-30);gravar(KL,l)}catch(e){}return sp.apply(this,arguments)};novoSp.__qx=1;window.savePracticeAnswer=novoSp;try{savePracticeAnswer=novoSp}catch(e){}}

var tmr=null,obs=new MutationObserver(function(){if(tmr)return;tmr=setTimeout(function(){tmr=null;try{atualizar()}catch(e){}},60)});
function iniciar(){var v=document.getElementById('view');if(!v)return;obs.observe(v,{childList:true,subtree:true,attributes:true,attributeFilter:['data-done']});atualizar()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',iniciar);else iniciar();
window.nexoQuestoesContexto={atualizar:atualizar,cadernos:function(){return ler(KC,[])}};
})();
