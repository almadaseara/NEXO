/* NEXO — botão "Reportar erro" em cada questão.
   O aluno logado escolhe o motivo, escreve (opcional) e envia; o aviso vai para a
   tabela question_reports no Supabase (RLS: cada um grava/vê os próprios; admin vê todos).
   Não altera nenhuma questão nem gabarito. */
(function(){
'use strict';
var MOTIVOS = [
  ['sem_enunciado', 'Enunciado faltando ou cortado'],
  ['alternativas', 'Alternativas erradas ou incompletas'],
  ['gabarito', 'Gabarito parece errado'],
  ['comentario', 'Comentário com erro'],
  ['outro', 'Outro problema']
];
function sb(){ try{ return typeof nexoSupabase !== 'undefined' ? nexoSupabase : null; }catch(e){ return null; } }
function mods(){ try{ return typeof modules !== 'undefined' ? modules : []; }catch(e){ return []; } }
function txt(s){ return String(s || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim(); }
function esc(s){ return String(s).replace(/[&<>"]/g, function(c){ return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' }[c]; }); }

/* card_official_<modulo>_<i> ou card_<modulo>_<i> → { modulo, questão } */
function questaoDoCard(card){
  var id = (card.id || '').replace(/^card_/, ''), oficial = /^official_/.test(id);
  id = id.replace(/^official_/, '');
  var k = id.lastIndexOf('_'); if(k < 0) return {};
  var mid = id.slice(0, k), i = +id.slice(k + 1);
  var m = mods().find(function(x){ return x.id === mid; }); if(!m) return { mid:mid };
  var lista = oficial ? (m.official_questions || []) : (m.questions || []);
  return { mid:mid, m:m, q:lista[i] };
}

function porBotao(raiz){
  (raiz.querySelectorAll ? raiz : document).querySelectorAll('.card.q:not([data-nxrep])').forEach(function(card){
    card.setAttribute('data-nxrep', '');
    var linha = card.querySelector('.answer'); if(!linha) return;
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'nx-rep-btn'; b.textContent = 'Reportar erro';
    b.setAttribute('aria-expanded', 'false');
    linha.parentNode.insertBefore(b, linha);
  });
}

function abrir(btn){
  var card = btn.closest('.card.q'); if(!card) return;
  var aberto = card.querySelector('.nx-rep');
  if(aberto){ aberto.remove(); btn.setAttribute('aria-expanded', 'false'); return; }
  var f = document.createElement('form'); f.className = 'nx-rep';
  f.innerHTML = '<fieldset><legend>O que está errado nesta questão?</legend>'
    + MOTIVOS.map(function(m, i){ return '<label><input type="radio" name="nxrep" value="' + m[0] + '"' + (i === 0 ? ' required' : '') + '> ' + m[1] + '</label>'; }).join('')
    + '</fieldset><label class="nx-rep-msg">Detalhes (opcional)<textarea maxlength="1000" rows="3" placeholder="Ex.: a alternativa C está repetida, o gabarito oficial é D..."></textarea></label>'
    + '<div class="nx-rep-acoes"><button type="submit">Enviar aviso</button><button type="button" class="nx-rep-cancelar">Cancelar</button></div>'
    + '<p class="nx-rep-status" role="status" aria-live="polite"></p>';
  btn.insertAdjacentElement('afterend', f);
  btn.setAttribute('aria-expanded', 'true');
  f.querySelector('input').focus();
}

async function enviar(f){
  var card = f.closest('.card.q'), st = f.querySelector('.nx-rep-status'), bt = f.querySelector('button[type=submit]');
  var motivo = (f.querySelector('input[name=nxrep]:checked') || {}).value;
  if(!motivo){ st.textContent = 'Escolha um motivo.'; return; }
  var cli = sb();
  var sess = null; try{ sess = cli && (await cli.auth.getSession()).data.session; }catch(e){}
  if(!sess){ st.textContent = 'Entre na sua conta para enviar o aviso.'; return; }
  var info = questaoDoCard(card), q = info.q || {};
  var meta = txt((card.querySelector('.small') || {}).innerHTML);
  var linha = {
    question_ref: (meta || card.id).slice(0, 300),
    bank_id: q.bancoId || null,
    module_id: (info.mid || '').slice(0, 120) || null,
    motivo: motivo,
    mensagem: f.querySelector('textarea').value.trim().slice(0, 1000) || null,
    trecho: txt(q.text || (card.querySelector('p') || {}).innerHTML).slice(0, 400) || null,
    pagina: (location.pathname + location.hash).slice(0, 300)
  };
  bt.disabled = true; st.textContent = 'Enviando...';
  try{
    var r = await cli.from('question_reports').insert(linha);
    if(r.error) throw r.error;
    f.innerHTML = '<p class="nx-rep-ok">Aviso enviado. Obrigado! A questão será revisada.</p>';
    var b = card.querySelector('.nx-rep-btn'); if(b){ b.textContent = 'Erro reportado'; b.disabled = true; b.setAttribute('aria-expanded', 'false'); }
  }catch(e){
    bt.disabled = false;
    st.textContent = 'Não foi possível enviar agora. Tente de novo em instantes.';
  }
}

document.addEventListener('click', function(e){
  var b = e.target.closest && e.target.closest('.nx-rep-btn');
  if(b){ e.preventDefault(); abrir(b); return; }
  var c = e.target.closest && e.target.closest('.nx-rep-cancelar');
  if(c){ var card = c.closest('.card.q'), bb = card && card.querySelector('.nx-rep-btn'); c.closest('.nx-rep').remove(); if(bb){ bb.setAttribute('aria-expanded', 'false'); bb.focus(); } }
});
document.addEventListener('submit', function(e){
  if(e.target.classList && e.target.classList.contains('nx-rep')){ e.preventDefault(); enviar(e.target); }
});
porBotao(document);
new MutationObserver(function(ls){
  for(var i = 0; i < ls.length; i++) if(ls[i].addedNodes.length){ porBotao(document); return; }
}).observe(document.documentElement, { childList:true, subtree:true });
window.nexoReportar = { questaoDoCard:questaoDoCard };
})();
