/* NEXO — Caderno de erros e Simulado.
   Caderno de erros: reúne as questões que o aluno errou (respostas em nexo_practice_answers).
     Mostra a questão para refazer aqui mesmo; "Marcar como resolvida" tira da lista. Se errar de novo
     depois de resolver, a questão volta para o caderno.
   Simulado: sorteia questões do banco e dos cadernos e só corrige ao entregar. Cada resposta vira
     desempenho e entra no caderno de erros, como nas demais questões.
   Tudo fica no navegador (localStorage), como o restante do desempenho. Não altera questões, gabaritos
   nem o Supabase. */
(function(){
'use strict';

var KRES = 'nexo_caderno_resolvidas', KSIM = 'nexo_simulado_config';
var filtroDisc = '', SIM = null, tickId = null;

function ler(k, d){ try{ var v = JSON.parse(localStorage.getItem(k)); return v == null ? d : v; }catch(e){ return d; } }
function gravar(k, v){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){} }
function esc(s){ return String(s == null ? '' : s).replace(/[&<>"']/g, function(c){ return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]; }); }
function mods(){ return typeof modules !== 'undefined' ? modules : []; }
function disc(m){ return (m && m.discipline) || 'Direito Constitucional'; }
function atual(){ try{ return current; }catch(e){ return null; } }
function setCur(v){ try{ current = v; }catch(e){} }
function head(t){ var h = document.getElementById('head'); if(h) h.textContent = t; }
function view(){ return document.getElementById('view'); }
function fechar(){ document.body.classList.remove('mobile-nav-open'); }
function refazerNav(){ try{ if(typeof renderNav === 'function') renderNav(); }catch(e){} }
function fmt(ms){
  var s = Math.max(0, Math.floor(ms / 1000)), h = Math.floor(s / 3600), m = Math.floor(s % 3600 / 60), ss = s % 60;
  return (h ? h + ':' + String(m).padStart(2, '0') : String(m).padStart(2, '0')) + ':' + String(ss).padStart(2, '0');
}

/* todas as questões com alternativas e gabarito; skey = chave usada em nexo_practice_answers */
function todas(){
  var out = [];
  mods().forEach(function(m){
    (m.official_questions || []).forEach(function(q, i){
      if(q && q.options && q.answer) out.push({ tipo:'official', m:m, q:q, i:i, skey:'official_' + m.id + '_' + i });
    });
    (m.questions || []).forEach(function(q, i){
      if(q && q.options && q.answer) out.push({ tipo:'caderno', m:m, q:q, i:i, skey:'q_' + m.id + '_' + i });
    });
  });
  return out;
}

/* ======================= caderno de erros ======================= */
function erradas(){
  var st = ler('nexo_practice_answers', {}) || {}, res = ler(KRES, {}) || {};
  return todas().filter(function(x){
    var s = st[x.skey];
    if(!s || !s.done || s.ok !== false) return false;
    return !res[x.skey] || (s.at || 0) > res[x.skey];   /* errou de novo depois de resolver: volta */
  });
}

window.nexoCadernoErros = function(d){
  if(typeof d === 'string') filtroDisc = d;
  setCur('caderno'); fechar(); refazerNav(); head('Caderno de erros');
  var lista = erradas(), st = ler('nexo_practice_answers', {}) || {};
  var discs = [];
  lista.forEach(function(x){ var n = disc(x.m); if(discs.indexOf(n) < 0) discs.push(n); });
  if(filtroDisc && discs.indexOf(filtroDisc) < 0) filtroDisc = '';
  var mostra = filtroDisc ? lista.filter(function(x){ return disc(x.m) === filtroDisc; }) : lista;

  var topo = '<div class="nx-page"><div class="nx-head"><div><h1>Caderno de erros</h1>'
    + '<p>Questões que você errou. Refaça aqui; quando dominar, marque como resolvida.</p></div></div>';
  if(!lista.length){
    view().innerHTML = topo + '<div class="nx-empty"><b>Nenhuma questão errada pendente.</b>'
      + 'Quando você errar uma questão no Módulos, no Questões ou no Simulado, ela aparece aqui.</div></div>';
    view().scrollTop = 0; return;
  }
  var sel = '<label class="nx-sub">Disciplina <select id="cad-disc" onchange="nexoCadernoErros(this.value)">'
    + '<option value="">Todas (' + lista.length + ')</option>'
    + discs.map(function(n){ var c = lista.filter(function(x){ return disc(x.m) === n; }).length;
        return '<option value="' + esc(n) + '"' + (n === filtroDisc ? ' selected' : '') + '>' + esc(n) + ' (' + c + ')</option>'; }).join('')
    + '</select></label>';

  var itens = mostra.map(function(x){
    var s = st[x.skey] || {};
    var meta = '<div class="practice-question-meta"><span>' + esc(disc(x.m)) + '</span><span>' + esc(x.m.title) + '</span>'
      + (x.q.source ? '<span>' + esc(x.q.source) + '</span>' : '') + '</div>';
    var ultima = s.r ? '<p class="nx-sub" style="margin:6px 0">Na última vez você marcou a alternativa ' + esc(s.r) + '.</p>' : '';
    var corpo = x.tipo === 'official' ? officialQuestionHTML(x.q, x.i, x.m.id) : questionHTML(x.q, x.i, x.m.id);
    return '<div class="cad-item" data-cad="' + esc(x.skey) + '">' + meta + ultima + corpo
      + '<div style="margin:6px 0 16px"><button type="button" class="nx-btn" onclick="nexoCadernoResolver(\'' + esc(x.skey) + '\')">Marcar como resolvida</button></div></div>';
  }).join('');

  view().innerHTML = topo + '<p class="nx-sub">' + mostra.length + (mostra.length === 1 ? ' questão' : ' questões') + ' para refazer</p>' + sel + itens + '</div>';
  view().scrollTop = 0;
};

window.nexoCadernoResolver = function(skey){
  var r = ler(KRES, {}) || {}; r[skey] = Date.now(); gravar(KRES, r);
  window.nexoCadernoErros();
};

/* ======================= simulado ======================= */
/* peso por módulo: quanto mais o aluno erra num módulo, mais chance de cair questão dele */
function pesos(){
  var porMod = {};
  (ler('nexo_eventos', []) || []).forEach(function(e){
    if(!e || e.k !== 'q') return;
    var r = porMod[e.m] = porMod[e.m] || { n:0, err:0 }; r.n++; if(!e.ok) r.err++;
  });
  return function(id){
    var r = porMod[id];
    if(!r || !r.n) return 1.5;               /* sem histórico: peso médio */
    return 1 + 3 * (r.err / r.n);
  };
}

function sortear(pool, n, priorizar){
  var peso = priorizar ? pesos() : function(){ return 1; };
  return pool.map(function(x){ return { x:x, k:Math.pow(Math.random(), 1 / peso(x.m.id)) }; })
    .sort(function(a, b){ return b.k - a.k; }).slice(0, n).map(function(o){ return o.x; });
}

window.nexoSimulado = function(){
  setCur('simulado'); fechar(); refazerNav(); head('Simulado');
  if(SIM && !SIM.fim) return desenharProva();
  var cfg = Object.assign({ disc:'', n:20, prio:true }, ler(KSIM, {}) || {});
  var discs = [];
  mods().forEach(function(m){ var d = disc(m); if(discs.indexOf(d) < 0) discs.push(d); });
  view().innerHTML = '<div class="nx-page"><div class="nx-head"><div><h1>Simulado</h1>'
    + '<p>Questões sorteadas do banco e dos cadernos. A correção só aparece quando você entregar.</p></div></div>'
    + '<form id="sim-form" class="nx-panel" onsubmit="event.preventDefault();nexoSimularIniciar()" style="display:grid;gap:14px;max-width:520px">'
    + '<label>Disciplina <select name="disc"><option value="">Todas</option>'
    + discs.map(function(d){ return '<option value="' + esc(d) + '"' + (d === cfg.disc ? ' selected' : '') + '>' + esc(d) + '</option>'; }).join('')
    + '</select></label>'
    + '<label>Quantidade de questões <select name="n">'
    + [10, 20, 30, 50].map(function(n){ return '<option value="' + n + '"' + (+cfg.n === n ? ' selected' : '') + '>' + n + '</option>'; }).join('')
    + '</select></label>'
    + '<label><input type="checkbox" name="prio"' + (cfg.prio ? ' checked' : '') + '> Dar mais peso aos assuntos em que eu mais erro</label>'
    + '<p class="nx-sub">Tempo sugerido: 1 min e 30 s por questão. O cronômetro conta o tempo, mas não encerra a prova.</p>'
    + '<p id="sim-aviso" role="status" class="nx-sub" style="color:var(--nx-bad,#c0392b);margin:0"></p>'
    + '<button type="submit" class="nx-btn primary">Começar simulado</button></form></div>';
  view().scrollTop = 0;
};

window.nexoSimularIniciar = function(){
  var f = document.getElementById('sim-form'); if(!f) return;
  var cfg = { disc:f.disc.value, n:+f.n.value, prio:f.prio.checked };
  gravar(KSIM, cfg);
  var pool = todas().filter(function(x){ return !cfg.disc || disc(x.m) === cfg.disc; });
  var aviso = document.getElementById('sim-aviso');
  if(!pool.length){ if(aviso) aviso.textContent = 'Não há questões nessa disciplina ainda.'; return; }
  SIM = { itens: sortear(pool, cfg.n, cfg.prio), inicio: Date.now(), fim: 0 };
  desenharProva();
};

function cardProva(x, n, revisao){
  var name = 'sim_' + n, marca = revisao ? (x.resp || '') : ((SIM.marc || {})[n] || '');
  var meta = '<div class="small muted"><b>' + (n + 1) + '.</b> ' + esc(disc(x.m)) + ' · ' + esc(x.m.title)
    + (x.q.source ? ' · ' + esc(x.q.source) : '') + '</div>';
  var ops = x.q.options.map(function(o, j){
    var L = 'ABCDE'[j], cls = '';
    if(revisao){
      if(L === x.q.answer) cls = ' style="border-color:#75a37a;background:#edf5ed"';
      else if(L === marca) cls = ' style="border-color:#c48585;background:#f8ecec"';
    }
    return '<label class="opt"' + cls + '><input type="radio" name="' + name + '" value="' + L + '"' + (revisao ? ' disabled' : '') + (L === marca ? ' checked' : '') + '>'
      + '<span><b>' + L + ')</b> ' + o + '</span></label>';
  }).join('');
  var rod = '';
  if(revisao){
    var txt = !x.resp ? 'Não respondida · gabarito ' + x.q.answer : (x.resp === x.q.answer ? 'Acertou' : 'Errou · sua resposta ' + x.resp + ' · gabarito ' + x.q.answer);
    rod = '<p class="small" style="margin:8px 0 0;font-weight:700">' + txt + '</p>';
  }
  return '<div class="card q sim-q">' + meta + '<p><b>' + x.q.text + '</b></p>' + ops + rod + '</div>';
}

function desenharProva(){
  var total = SIM.itens.length;
  var cards = SIM.itens.map(function(x, n){ return cardProva(x, n, false); }).join('');
  view().innerHTML = '<div class="nx-page"><div class="nx-head"><div><h1>Simulado</h1>'
    + '<p id="sim-prog">0 de ' + total + ' respondidas</p></div>'
    + '<div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap"><span id="sim-tempo" style="font-variant-numeric:tabular-nums;font-weight:700">00:00</span>'
    + '<button type="button" class="nx-btn primary" onclick="nexoSimularEntregar()">Entregar</button></div></div>'
    + '<div onchange="nexoSimularProgresso()">' + cards + '</div>'
    + '<div style="margin:18px 0 40px"><button type="button" class="nx-btn primary" onclick="nexoSimularEntregar()">Entregar simulado</button></div></div>';
  view().scrollTop = 0;
  nexoSimularProgresso();
  clearInterval(tickId);
  tickId = setInterval(function(){
    var el = document.getElementById('sim-tempo');
    if(!el || atual() !== 'simulado' || !SIM || SIM.fim){ clearInterval(tickId); return; }
    el.textContent = fmt(Date.now() - SIM.inicio);
  }, 1000);
}

/* guarda as marcações no estado do simulado, para não se perderem ao sair e voltar à tela */
window.nexoSimularProgresso = function(){
  if(!SIM) return;
  SIM.marc = SIM.marc || {};
  SIM.itens.forEach(function(x, i){
    var s = document.querySelector('input[name="sim_' + i + '"]:checked');
    if(s) SIM.marc[i] = s.value;
  });
  var el = document.getElementById('sim-prog'); if(!el) return;
  el.textContent = Object.keys(SIM.marc).length + ' de ' + SIM.itens.length + ' respondidas';
};

window.nexoSimularEntregar = function(){
  if(!SIM || SIM.fim) return;
  window.nexoSimularProgresso();
  SIM.fim = Date.now(); clearInterval(tickId);
  var acertos = 0, respondidas = 0;
  SIM.itens.forEach(function(x, n){
    var letra = (SIM.marc || {})[n] || null;
    x.resp = letra;
    if(!letra) return;
    respondidas++;
    var ok = letra === x.q.answer; if(ok) acertos++;
    try{ savePracticeAnswer(x.skey, ok, letra); }catch(e){}
    try{ if(window.nexoRegistrar) window.nexoRegistrar({ k:'q', m:x.m.id, ok:ok }); }catch(e){}
  });
  var pct = respondidas ? Math.round(acertos / respondidas * 100) : 0;
  var resumo = '<div class="nx-panel" style="margin-bottom:16px"><h2 style="margin:0 0 6px">' + acertos + ' de ' + SIM.itens.length + ' acertos</h2>'
    + '<p class="nx-sub">' + respondidas + ' respondidas · ' + pct + '% de acerto entre as respondidas · tempo ' + fmt(SIM.fim - SIM.inicio) + '</p>'
    + '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px"><button type="button" class="nx-btn primary" onclick="nexoSimulado()">Novo simulado</button>'
    + '<button type="button" class="nx-btn" onclick="nexoCadernoErros()">Ir ao caderno de erros</button></div></div>';
  view().innerHTML = '<div class="nx-page"><div class="nx-head"><div><h1>Resultado do simulado</h1>'
    + '<p>As questões erradas já foram para o caderno de erros.</p></div></div>'
    + resumo + '<div>' + SIM.itens.map(function(x, n){ return cardProva(x, n, true); }).join('') + '</div></div>';
  view().scrollTop = 0;
  refazerNav();
};

/* ======================= revisão de hoje (adaptativa) ======================= */
/* A sessão mistura: (1) questões erradas que ainda não foram resolvidas, as mais antigas primeiro;
   (2) questões de assuntos com mais erro, com peso pela taxa de erro no histórico.
   Se o aluno erra uma questão na sessão, ela volta mais tarde na mesma sessão (até 2 vezes). */
var REV = null, REV_REPETICOES = 2;
window.nexoRevisaoEstado = function(){ return REV; };

function taxasPorModulo(){
  var porMod = {};
  (ler('nexo_eventos', []) || []).forEach(function(e){
    if(!e || e.k !== 'q') return;
    var r = porMod[e.m] = porMod[e.m] || { n:0, ok:0 }; r.n++; if(e.ok) r.ok++;
  });
  return porMod;
}

function montarRevisao(n){
  var st = ler('nexo_practice_answers', {}) || {};
  var pend = erradas().sort(function(a, b){ return (st[a.skey].at || 0) - (st[b.skey].at || 0); });
  var doCaderno = pend.slice(0, Math.ceil(n / 2));
  var usados = {}; doCaderno.forEach(function(x){ usados[x.skey] = 1; });
  var tx = taxasPorModulo();
  var resto = todas().filter(function(x){ return !usados[x.skey]; }).map(function(x){
    var r = tx[x.m.id], erro = r && r.n ? 1 - r.ok / r.n : 0.5;      /* sem histórico: peso médio */
    var ja = st[x.skey] && st[x.skey].done ? 0.5 : 1;                 /* já respondida: sai menos */
    return { x:x, k:Math.pow(Math.random(), 1 / ((0.5 + erro) * ja)) };
  }).sort(function(a, b){ return b.k - a.k; }).slice(0, Math.max(0, n - doCaderno.length)).map(function(o){ return o.x; });
  return doCaderno.concat(resto);
}

/* assuntos com pior taxa de acerto (pelo menos 4 respostas) */
function assuntosFracos(){
  var tx = taxasPorModulo(), mods_ = mods(), lista = [];
  Object.keys(tx).forEach(function(id){
    var r = tx[id]; if(r.n < 4) return;
    var m = mods_.find(function(x){ return x.id === id; }); if(!m) return;
    lista.push({ titulo:m.title, disc:disc(m), taxa:Math.round(r.ok / r.n * 100), n:r.n });
  });
  return lista.sort(function(a, b){ return a.taxa - b.taxa; }).slice(0, 3);
}

window.nexoRevisao = function(){
  setCur('revisao'); fechar(); refazerNav(); head('Revisão de hoje');
  if(REV && REV.ativa) return revisaoItem();
  var pend = erradas().length, total = todas().length, fracos = assuntosFracos();
  var lista = fracos.length
    ? '<ol class="nx-sub" style="padding-left:20px;line-height:1.7">' + fracos.map(function(f){
        return '<li><b>' + esc(f.titulo) + '</b> · ' + esc(f.disc) + ' · acerto de ' + f.taxa + '% em ' + f.n + ' respostas</li>';
      }).join('') + '</ol>'
    : '<p class="nx-sub">Ainda não há respostas suficientes para apontar assuntos fracos (pelo menos 4 em um mesmo assunto).</p>';
  view().innerHTML = '<div class="nx-page"><div class="nx-head"><div><h1>Revisão de hoje</h1>'
    + '<p>Uma sessão com o que você errou e o que mais precisa de atenção.</p></div></div>'
    + '<div class="dz-stats"><div class="dz-stat"><div class="v">' + pend + '</div><div class="k">Erradas para revisar</div></div>'
    + '<div class="dz-stat"><div class="v">' + total + '</div><div class="k">Questões no NEXO</div></div></div>'
    + '<div class="nx-panel" style="margin-bottom:16px"><h2 style="margin:0 0 8px">Assuntos que pedem atenção</h2>' + lista + '</div>'
    + '<form id="rev-form" class="nx-panel" onsubmit="event.preventDefault();nexoRevisaoIniciar()" style="display:grid;gap:14px;max-width:520px">'
    + '<label>Questões nesta sessão <select id="rev-n">' + [10, 15, 20, 30].map(function(n){ return '<option value="' + n + '"' + (n === 15 ? ' selected' : '') + '>' + n + '</option>'; }).join('') + '</select></label>'
    + '<p id="rev-aviso" role="status" class="nx-sub" style="margin:0"></p>'
    + '<div style="display:flex;gap:8px;flex-wrap:wrap"><button type="submit" class="nx-btn primary">Começar revisão</button>'
    + '<button type="button" class="nx-btn" onclick="showFlashcards()">Fichário</button></div></form></div>';
  view().scrollTop = 0;
};

window.nexoRevisaoIniciar = function(){
  var sel = document.getElementById('rev-n'), n = sel ? +sel.value : 15;
  var fila = montarRevisao(n);
  if(!fila.length){ var a = document.getElementById('rev-aviso'); if(a) a.textContent = 'Não há questões disponíveis agora.'; return; }
  REV = { ativa:true, fila:fila, i:0, acertos:0, respondidas:0, repet:{}, itemInicio:0, atual:null, inicio:Date.now() };
  revisaoItem();
};

function revisaoItem(){
  var x = REV.fila[REV.i];
  REV.atual = x; REV.itemInicio = Date.now();
  var meta = '<div class="practice-question-meta"><span>' + esc(disc(x.m)) + '</span><span>' + esc(x.m.title) + '</span>'
    + (x.q.source ? '<span>' + esc(x.q.source) + '</span>' : '') + '</div>';
  var corpo = x.tipo === 'official' ? officialQuestionHTML(x.q, x.i, x.m.id) : questionHTML(x.q, x.i, x.m.id);
  var ultima = REV.i === REV.fila.length - 1 ? 'Última questão desta sessão' : 'Questão ' + (REV.i + 1) + ' de ' + REV.fila.length;
  view().innerHTML = '<div class="nx-page"><div class="nx-head"><div><h1>Revisão de hoje</h1>'
    + '<p>' + ultima + ' · acertos: ' + REV.acertos + ' de ' + REV.respondidas + '</p></div></div>'
    + meta + corpo
    + '<div style="display:flex;gap:8px;flex-wrap:wrap;margin:12px 0 40px"><button type="button" class="nx-btn primary" onclick="nexoRevisaoProxima()">Próxima</button>'
    + '<button type="button" class="nx-btn" onclick="nexoRevisaoEncerrar()">Encerrar revisão</button></div></div>';
  view().scrollTop = 0;
}

/* conta a resposta da questão atual (se foi respondida depois de exibida) e avança */
window.nexoRevisaoProxima = function(){
  if(!REV || !REV.ativa) return;
  var x = REV.atual;
  if(x){
    var s = (ler('nexo_practice_answers', {}) || {})[x.skey];
    if(s && s.done && (s.at || 0) >= REV.itemInicio){
      REV.respondidas++;
      if(s.ok) REV.acertos++;
      else {
        var c = REV.repet[x.skey] || 0;
        if(c < REV_REPETICOES){ REV.repet[x.skey] = c + 1; REV.fila.push(x); }
      }
    }
  }
  REV.i++;
  if(REV.i >= REV.fila.length) return window.nexoRevisaoEncerrar();
  revisaoItem();
};

window.nexoRevisaoEncerrar = function(){
  if(!REV || !REV.ativa) return window.nexoRevisao();
  REV.ativa = false;
  var pct = REV.respondidas ? Math.round(REV.acertos / REV.respondidas * 100) : 0;
  view().innerHTML = '<div class="nx-page"><div class="nx-head"><div><h1>Revisão concluída</h1>'
    + '<p>As erradas que você ainda não resolveu continuam no caderno de erros.</p></div></div>'
    + '<div class="nx-panel" style="margin-bottom:16px"><h2 style="margin:0 0 6px">' + REV.acertos + ' de ' + REV.respondidas + ' acertos</h2>'
    + '<p class="nx-sub">' + pct + '% de acerto nesta sessão · tempo ' + fmt(Date.now() - REV.inicio) + '</p>'
    + '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px"><button type="button" class="nx-btn primary" onclick="nexoRevisaoIniciar()">Nova revisão</button>'
    + '<button type="button" class="nx-btn" onclick="nexoCadernoErros()">Caderno de erros</button></div></div></div>';
  view().scrollTop = 0;
  refazerNav();
};

/* ======================= entradas no menu ======================= */
/* botões "Revisão de hoje", "Caderno de erros" e "Simulado", antes da lista de disciplinas */
var renderNavAnterior = window.renderNav;
var ICONES = {
  revisao: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 11a8 8 0 0 0-14.9-3.5L4 10"/><path d="M4 4v6h6"/><path d="M4 13a8 8 0 0 0 14.9 3.5L20 14"/><path d="M20 20v-6h-6"/></svg>',
  caderno: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 4h10a2 2 0 0 1 2 2v14H8a2 2 0 0 1-2-2Z"/><path d="m9.5 10.5 1.5 1.5 3-3"/></svg>',
  simulado: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 3h6v3H9zM9 11h6M9 15h4"/></svg>'
};
window.renderNav = function(){
  var r;
  try{ if(typeof renderNavAnterior === 'function') r = renderNavAnterior.apply(this, arguments); }catch(e){}
  var nav = document.getElementById('nav'); if(!nav) return r;
  quitarBotoesCaderno(nav);
  var ref = nav.querySelector('.folder-wrap');
  var html = [
    ['revisao', 'Revisão de hoje', 'nexoRevisao()'],
    ['caderno', 'Caderno de erros', 'nexoCadernoErros()'],
    ['simulado', 'Simulado', 'nexoSimulado()']
  ].map(function(it){
    return '<button type="button" class="primary-nav nx-nav-extra nx-cad-nav' + (atual() === it[0] ? ' active' : '') + '" onclick="' + it[2] + '">'
      + ICONES[it[0]] + ' ' + it[1] + '</button>';
  }).join('');
  if(ref) ref.insertAdjacentHTML('beforebegin', html); else nav.insertAdjacentHTML('beforeend', html);
  return r;
};
function quitarBotoesCaderno(nav){ Array.prototype.slice.call(nav.querySelectorAll('.nx-cad-nav')).forEach(function(x){ x.parentNode.removeChild(x); }); }
})();
