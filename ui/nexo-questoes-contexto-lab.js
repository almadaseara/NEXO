/* NEXO Lab — Painel de contexto nas Questões.
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
  var h='<div class="qx-blk"><h3><i class="qx-ic q">'+ico('q')+'</i>Questões relacionadas</h3><p class="qx-ind">Mesmo assunto: '+esc(m.title)+'.</p>';
  if(!itens.length)return h+'<p class="qx-ind">Nenhuma outra questão deste assunto no banco.</p></div>';
  h+=itens.slice(0,6).map(function(x,n){var r=st[x.k],t=txt(x.q.text);return '<button type="button" class="qx-sq" data-qx="rel" data-mod="'+esc(m.id)+'" data-key="'+esc(x.k)+'"><i>'+(n+1)+'</i><b>'+esc(t.length>96?t.slice(0,94).replace(/\s+\S*$/,'')+'…':t)+'<span>'+esc(x.q.source||'Caderno')+'</span></b><em class="'+(r?(r.ok?'ok':'no'):'')+'">'+(r?(r.ok?'acertou':'errou'):'não resolvida')+'</em></button>'}).join('');
  h+='<button type="button" class="qx-more" data-qx="rel" data-mod="'+esc(m.id)+'">› Praticar as '+itens.length+' do assunto</button></div>';
  return h}

function painel(info,key){
  var tot=(info.m.official_questions||[]).length+(info.m.questions||[]).length-1;
  return '<div class="qx-ctx"><div class="qx-tabs" role="tablist"><button type="button" class="on" data-qx="tab" data-t="mat">Materiais do NEXO</button><button type="button" data-qx="tab" data-t="rel">Questões relacionadas'+(tot>0?' ('+tot+')':'')+'</button></div><div class="qx-pane on" data-p="mat">'+blocoMateriais(info.m)+'</div><div class="qx-pane" data-p="rel">'+blocoRelacionadas(info,key)+'</div></div>'}

function atualizar(){
  $$('.card.q[id^="card_"]').forEach(function(c){
    var key=c.id.slice(5),feito=c.dataset.done==='1',ex=c.querySelector(':scope > .qx-ctx, :scope > .qx-lock');
    if(feito){if(ex&&ex.classList.contains('qx-ctx'))return;var info=acharModulo(key);if(!info){if(ex)ex.remove();return}
      var d=document.createElement('div');d.innerHTML=painel(info,key);if(ex)ex.remove();c.appendChild(d.firstChild)}
    else{if(ex&&ex.classList.contains('qx-lock'))return;if(ex)ex.remove();if(!acharModulo(key))return;var d2=document.createElement('div');d2.innerHTML=bloqueio();c.appendChild(d2.firstChild)}
  })}

document.addEventListener('click',function(e){var t=e.target.closest&&e.target.closest('[data-qx]');if(!t)return;var k=t.dataset.qx;
  if(k==='tab'){var ctx=t.closest('.qx-ctx');$$('.qx-tabs button',ctx).forEach(function(b){b.classList.toggle('on',b===t)});$$('.qx-pane',ctx).forEach(function(p){p.classList.toggle('on',p.dataset.p===t.dataset.t)})}
  else if(k==='resumo'){var id=t.dataset.mod;if(window.nexoLivro&&window.nexoLivro.abrir)window.nexoLivro.abrir(id,'resumo');else if(typeof openModule==='function')openModule(id)}
  else if(k==='rel'){var mid=t.dataset.mod,alvo=t.dataset.key;if(typeof window.nexoPraticar==='function'){window.nexoPraticar({mod:mid});if(alvo)setTimeout(function(){var c=document.getElementById('card_'+alvo);if(c&&c.scrollIntoView)try{c.scrollIntoView({block:'start'})}catch(x){}},350)}}
});
var tmr=null,obs=new MutationObserver(function(){if(tmr)return;tmr=setTimeout(function(){tmr=null;try{atualizar()}catch(e){}},60)});
function iniciar(){var v=document.getElementById('view');if(!v)return;obs.observe(v,{childList:true,subtree:true,attributes:true,attributeFilter:['data-done']});atualizar()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',iniciar);else iniciar();
window.nexoQuestoesContexto={atualizar:atualizar};
})();
