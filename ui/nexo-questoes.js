/* NEXO Revisão — questões do banco ligadas aos temas, filtro de questões, tesoura e painel.
   - Questões: só leitura no Supabase. Carrega, para quem está logado, as questões publicadas e
     validadas que aparecem em data/banco-classificacao.json (classificação revisada à mão) e as
     coloca na aba "Questões oficiais" do módulo certo. Não grava nada no banco, não muda gabarito.
   - Filtro: refaz a página "Praticar questões" com filtros que existem de verdade nos dados.
   - Tesoura: elimina (risca) alternativas em qualquer questão do site.
   - Painel: números reais por disciplina na página inicial. */
(function(){
'use strict';

var LS = {
  get:function(k, d){ try{ var v = JSON.parse(localStorage.getItem(k)); return v == null ? d : v; }catch(e){ return d; } },
  set:function(k, v){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){} }
};
function escH(s){ return String(s == null ? '' : s).replace(/[&<>"']/g, function(c){ return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]; }); }
function mods(){ return typeof modules !== 'undefined' ? modules : []; }
function norm(s){ return String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase(); }
function semTags(s){ return String(s || '').replace(/<[^>]*>/g, ' '); }
/* tira o rodapé de página que veio colado do PDF da prova ("--- PAGE 13 --- POLÍCIA CIVIL ...") */
function limpa(s){ return String(s || '').replace(/\s*-{3}\s*PAGE\s*\d+\s*-{3}[\s\S]*$/, '').replace(/\s+/g, ' ').trim(); }
function link(u){ return /^https:\/\/[^\s"'<>]+$/.test(u || '') ? u : ''; }

var DISC = [
  ['Direito Constitucional', 'DC', 'var(--nx-d1,#2a78d6)'],
  ['Direito Administrativo', 'DA', 'var(--nx-d2,#eb6834)'],
  ['Direito Penal', 'DP', 'var(--nx-d4,#1baf7a)'],
  ['Medicina Legal', 'ML', 'var(--nx-d3,#6250d6)']
];
function discDe(m){ return (m && m.discipline) || 'Direito Constitucional'; }

/* ================= 1. questões do banco ================= */
var estadoBanco = { carregado:false, carregando:false, total:0, erro:'' };
window.nexoBanco = estadoBanco;
function cliente(){ try{ return typeof nexoSupabase !== 'undefined' ? nexoSupabase : null; }catch(e){ return null; } }

function montarQuestao(r){
  var ce = r.question_type === 'true_false';
  var ops = Array.isArray(r.options) ? r.options : [];
  var resp = String(r.answer || '').trim().toUpperCase();
  if(ce){
    if(resp !== 'C' && resp !== 'E') return null;
    ops = ['Certo', 'Errado']; resp = resp === 'C' ? 'A' : 'B';
  }else{
    ops = ops.map(function(o){ return escH(limpa(o)); });
    if(ops.length < 2 || ops.length > 5 || 'ABCDE'.indexOf(resp) < 0 || 'ABCDE'.indexOf(resp) >= ops.length) return null;
  }
  var texto = limpa(r.statement); if(texto.length < 15) return null;
  /* "instituição" às vezes veio com lixo da página de origem ("Organizadora: X Verificação de segurança ...") */
  var inst = limpa(r.institution || '').split(/Verifica[cç][aã]o de seguran[cç]a/i)[0].trim(), org = inst.match(/Organizadora:\s*(.+)$/i);
  inst = inst.replace(/\s*Organizadora:.*$/i, '').trim();
  var banca = r.board || (org ? org[1].trim().toUpperCase() : ''), ano = r.year ? String(r.year) : '', cargo = limpa(r.role_name || '');
  var prova = link(r.exam_source_url), gab = link(r.answer_source_url);
  var oficial = r.answer_source_type === 'official';
  var com = 'Questão de prova do banco NEXO' + (banca ? ' (' + escH(banca) + (ano ? ', ' + ano : '') + ')' : '') + '. '
    + (oficial ? 'Gabarito conferido no documento oficial da banca.' : 'Gabarito conferido em fonte de apoio; confira no documento oficial.')
    + (prova || gab ? '<br>' + (prova ? '<a href="' + escH(prova) + '" target="_blank" rel="noopener">Abrir a prova ↗</a>' : '') + (prova && gab ? ' · ' : '') + (gab ? '<a href="' + escH(gab) + '" target="_blank" rel="noopener">Abrir o gabarito ↗</a>' : '') : '');
  return {
    num:'Q' + (r.question_number || ''), source:[banca, ano].filter(Boolean).join(' · '),
    collection:[cargo, inst].filter(Boolean).map(escH).join(' · ') || 'Banco de provas NEXO',
    text:escH(texto), options:ops, answer:resp, comment:com,
    banco:true, ce:ce, board:banca, year:ano, role:cargo, bancoId:r.id
  };
}

async function carregarBanco(){
  if(estadoBanco.carregado || estadoBanco.carregando) return;
  var sb = cliente(); if(!sb || !sb.auth) return;
  estadoBanco.carregando = true;
  try{
    var s = await sb.auth.getSession();
    if(!s || !s.data || !s.data.session){ estadoBanco.carregando = false; return; }
    var mapa = await fetch('data/banco-classificacao.json', { cache:'no-cache' }).then(function(r){ return r.json(); });
    var ids = Object.keys(mapa.questoes || {}), linhas = [];
    for(var i = 0; i < ids.length; i += 60){
      var res = await sb.from('question_bank')
        .select('id,question_number,statement,options,answer,question_type,board,year,institution,role_name,exam_source_url,answer_source_url,answer_source_type,status,publication_status')
        .in('id', ids.slice(i, i + 60)).eq('status', 'validated').eq('publication_status', 'published');
      if(res.error) throw res.error;
      linhas = linhas.concat(res.data || []);
    }
    linhas.sort(function(a, b){ return a.id < b.id ? -1 : 1; }); /* ordem fixa: o índice guarda o que você já respondeu */
    var vistos = {}, n = 0;
    mods().forEach(function(m){ (m.official_questions || []).forEach(function(q){ vistos[norm(semTags(q.text)).slice(0, 160)] = 1; }); });
    linhas.forEach(function(r){
      var m = mods().find(function(x){ return x.id === mapa.questoes[r.id]; }); if(!m) return;
      var q = montarQuestao(r); if(!q) return;
      var chave = norm(semTags(q.text)).slice(0, 160); if(vistos[chave]) return; vistos[chave] = 1;
      m.official_questions = m.official_questions || [];
      if(m.official_questions.some(function(x){ return x.bancoId === q.bancoId; })) return;
      m.official_questions.push(q); n++;
    });
    estadoBanco.total = n; estadoBanco.carregado = true;
    atualizarTela();
  }catch(e){ estadoBanco.erro = String(e && e.message || e); }
  estadoBanco.carregando = false;
}
function atualizarTela(){
  try{
    if(document.getElementById('nxq-res')) return window.renderPracticeQuestionsPage();
    if(typeof current !== 'undefined' && current === null && document.querySelector('.stats-grid')) return window.home();
    if(typeof renderNav === 'function') renderNav();
  }catch(e){}
}
function iniciarBanco(tentativa){
  var sb = cliente();
  if(!sb || !sb.auth){ if((tentativa || 0) < 40) setTimeout(function(){ iniciarBanco((tentativa || 0) + 1); }, 400); return; }
  carregarBanco();
  try{ sb.auth.onAuthStateChange(function(ev, sess){ if(sess) setTimeout(carregarBanco, 50); }); }catch(e){}
}

/* correção: C/E mostra "Certo/Errado" e o texto deixa de chamar o banco de "caderno" */
var corrigirOficial = window.checkOfficialQuestion;
if(typeof corrigirOficial === 'function'){
  window.checkOfficialQuestion = function(prefix, i){
    var r = corrigirOficial.apply(this, arguments);
    try{
      var m = mods().find(function(x){ return x.id === prefix; }), q = m && m.official_questions && m.official_questions[i];
      var box = document.getElementById('ans_official_' + prefix + '_' + i);
      if(q && q.banco && box){
        box.innerHTML = box.innerHTML
          .replace(/Gabarito: [A-E]/, 'Gabarito: ' + (q.ce ? (q.answer === 'A' ? 'Certo' : 'Errado') : q.answer))
          .replace('Comentário do caderno:', 'Fonte:');
      }
    }catch(e){}
    return r;
  };
}

/* no cartão da questão, "Caderno:" vira "Prova:" quando ela vem do banco */
var htmlOficial = window.officialQuestionHTML;
if(typeof htmlOficial === 'function'){
  window.officialQuestionHTML = function(q){
    var h = htmlOficial.apply(this, arguments);
    return q && q.banco ? h.replace('<div class="official-source">Caderno: ', '<div class="official-source">Prova: ') : h;
  };
}

/* ================= 2. filtro de questões ================= */
var FKEY = 'nexo_filtro_q', POR_PAGINA = 20;
var filtro = LS.get(FKEY, {}), mostrar = POR_PAGINA, resultado = [];
function base(){ return { status:'all', kw:'', disc:'', mod:'', banca:'', ano:'', cargo:'', modo:'', origem:'', com:false, anul:true }; }
filtro = Object.assign(base(), filtro);

function pool(){
  var p = [];
  mods().forEach(function(m){
    (m.official_questions || []).forEach(function(q, i){ p.push({ kind:'official', m:m, q:q, i:i, key:'official_' + m.id + '_' + i }); });
    (m.questions || []).forEach(function(q, i){ p.push({ kind:'caderno', m:m, q:q, i:i, key:'q_' + m.id + '_' + i }); });
  });
  return p;
}
function bancaDe(it){
  if(it.q.board) return String(it.q.board).toUpperCase();
  var raw = String(it.q.source || it.q.collection || '').toUpperCase();
  if(raw.indexOf('AOCP') >= 0) return 'AOCP';
  if(raw.indexOf('CEBRASPE') >= 0 || raw.indexOf('CESPE') >= 0) return 'CEBRASPE';
  if(raw.indexOf('FGV') >= 0) return 'FGV';
  if(raw.indexOf('FCC') >= 0) return 'FCC';
  return '';
}
function anoDe(it){ if(it.q.year) return String(it.q.year); var y = (String(it.q.source || '') + ' ' + String(it.q.collection || '')).match(/20\d{2}/); return y ? y[0] : ''; }
function modoDe(it){ var o = it.q.options || []; return it.q.ce || (o.length === 2 && /^certo$/i.test(semTags(o[0]).trim())) ? 'ce' : 'me'; }
function origemDe(it){ return it.q.banco ? 'banco' : 'caderno'; }
function unicos(arr){ return arr.filter(function(v, i){ return v && arr.indexOf(v) === i; }).sort(function(a, b){ return String(a).localeCompare(String(b), 'pt-BR'); }); }
function opcoes(lista, rotulo, sel){ return '<option value="">' + rotulo + '</option>' + lista.map(function(v){ var val = Array.isArray(v) ? v[0] : v, txt = Array.isArray(v) ? v[1] : v; return '<option value="' + escH(val) + '"' + (String(val) === String(sel) ? ' selected' : '') + '>' + escH(txt) + '</option>'; }).join(''); }

function aplicar(){
  var st = typeof practiceAnswerState === 'function' ? practiceAnswerState() : {}, kw = norm(filtro.kw);
  resultado = pool().filter(function(it){
    var q = it.q, m = it.m, s = st[it.key] || {};
    if(filtro.disc && discDe(m) !== filtro.disc) return false;
    if(filtro.mod && m.id !== filtro.mod) return false;
    if(filtro.banca && bancaDe(it) !== filtro.banca) return false;
    if(filtro.ano && anoDe(it) !== filtro.ano) return false;
    if(filtro.cargo && (q.role || '') !== filtro.cargo) return false;
    if(filtro.modo && modoDe(it) !== filtro.modo) return false;
    if(filtro.origem && origemDe(it) !== filtro.origem) return false;
    if(filtro.com && !(q.comment && !q.banco)) return false;
    if(filtro.anul && (q.annulled || q.cancelled)) return false;
    if(filtro.status === 'solved' && !s.done) return false;
    if(filtro.status === 'unsolved' && s.done) return false;
    if(filtro.status === 'correct' && !(s.done && s.ok)) return false;
    if(filtro.status === 'wrong' && !(s.done && !s.ok)) return false;
    if(kw && norm(semTags([q.text, (q.options || []).join(' '), q.source, q.collection, m.title].join(' '))).indexOf(kw) < 0) return false;
    return true;
  });
}
function cartao(it){
  var q = it.q, m = it.m, b = bancaDe(it), a = anoDe(it);
  var meta = '<div class="practice-question-meta"><span>' + escH(discDe(m)) + '</span><span>' + escH(m.title) + '</span>' + (b ? '<span>' + escH(b) + '</span>' : '') + (a ? '<span>' + a + '</span>' : '') + '<span>' + (modoDe(it) === 'ce' ? 'Certo ou errado' : 'Múltipla escolha') + '</span><span>' + (q.banco ? 'Banco de provas' : 'Caderno de estudo') + '</span></div>';
  return '<div class="practice-question-card">' + meta + (it.kind === 'official' ? officialQuestionHTML(q, it.i, m.id) : questionHTML(q, it.i, m.id)) + '</div>';
}
function desenharResultados(){
  var el = document.getElementById('nxq-res'), ct = document.getElementById('nxq-count'); if(!el) return;
  ct.textContent = resultado.length + (resultado.length === 1 ? ' questão encontrada' : ' questões encontradas');
  if(!resultado.length){ el.innerHTML = '<div class="practice-empty"><b>Nenhuma questão com esses filtros.</b><br>Tire um dos filtros ou clique em Limpar.</div>'; return; }
  el.innerHTML = resultado.slice(0, mostrar).map(cartao).join('')
    + (resultado.length > mostrar ? '<button type="button" class="pf-btn nxq-mais" data-nxq="mais">Mostrar mais ' + Math.min(POR_PAGINA, resultado.length - mostrar) + ' de ' + (resultado.length - mostrar) + ' restantes</button>' : '');
  porTesoura(el);
}
function rodar(){ LS.set(FKEY, filtro); mostrar = POR_PAGINA; aplicar(); desenharResultados(); }

window.renderPracticeQuestionsPage = function(){
  if(typeof activeResource !== 'undefined') activeResource = 'quest';
  try{ current = 'library'; }catch(e){}
  if(typeof closeMobileNav === 'function') closeMobileNav();
  if(typeof renderNav === 'function') renderNav();
  if(typeof syncAccess === 'function') syncAccess();
  var head = document.getElementById('head'); if(head) head.textContent = 'Praticar questões';
  var p = pool();
  var porMod = {}; p.forEach(function(it){ porMod[it.m.id] = (porMod[it.m.id] || 0) + 1; });
  var assuntos = DISC.filter(function(d){ return !filtro.disc || d[0] === filtro.disc; }).map(function(d){
    var ms = mods().filter(function(m){ return discDe(m) === d[0] && porMod[m.id]; });
    if(!ms.length) return '';
    return '<optgroup label="' + escH(d[0]) + '">' + ms.map(function(m){ return '<option value="' + m.id + '"' + (filtro.mod === m.id ? ' selected' : '') + '>' + escH(m.title) + ' (' + porMod[m.id] + ')</option>'; }).join('') + '</optgroup>';
  }).join('');
  var nBanco = p.filter(function(it){ return it.q.banco; }).length;
  var aviso = nBanco ? '' : estadoBanco.carregando
    ? '<p class="nxq-aviso">Carregando as questões do banco de provas…</p>'
    : '<p class="nxq-aviso">As questões do banco de provas (Cebraspe, FGV, AOCP e outras) aparecem depois que você entra na sua conta.</p>';
  var sel = function(id, lista, rot, val){ return '<label class="nxq-f"><span>' + rot + '</span><select data-nxf="' + id + '">' + opcoes(lista, 'Todas', val) + '</select></label>'; };
  document.getElementById('view').innerHTML =
    '<div class="library-heading"><div><span class="eyebrow">BANCO DE QUESTÕES NEXO</span><h1>Praticar questões<span>.</span></h1><p>Monte seu treino por disciplina, assunto, banca, ano e cargo.</p></div><span class="library-count">' + p.length + ' questões no acervo' + (nBanco ? ' · ' + nBanco + ' de provas' : '') + '</span></div>'
    + '<section class="practice-filter-shell nxq">'
    + '<div class="practice-status-tabs" role="group" aria-label="Situação">' + [['all', 'Todas'], ['unsolved', 'Não resolvidas'], ['solved', 'Resolvidas'], ['correct', 'Acertei'], ['wrong', 'Errei']].map(function(x){ return '<button type="button" data-nxs="' + x[0] + '" class="' + (filtro.status === x[0] ? 'active' : '') + '">' + x[1] + '</button>'; }).join('') + '</div>'
    + '<div class="nxq-grid">'
    + '<label class="nxq-f nxq-kw"><span>Palavra-chave</span><input type="search" data-nxf="kw" value="' + escH(filtro.kw) + '" placeholder="Ex.: flagrante, peculato, art. 37"></label>'
    + sel('disc', DISC.map(function(d){ return d[0]; }), 'Disciplina', filtro.disc)
    + sel('banca', unicos(p.map(bancaDe)), 'Banca', filtro.banca)
    + '<label class="nxq-f nxq-wide"><span>Assunto</span><select data-nxf="mod"><option value="">Todos</option>' + assuntos + '</select></label>'
    + sel('ano', unicos(p.map(anoDe)).reverse(), 'Ano', filtro.ano)
    + sel('cargo', unicos(p.map(function(it){ return it.q.role || ''; })), 'Cargo', filtro.cargo)
    + sel('modo', [['me', 'Múltipla escolha'], ['ce', 'Certo ou errado']], 'Modalidade', filtro.modo)
    + sel('origem', [['banco', 'Banco de provas'], ['caderno', 'Cadernos de estudo']], 'Origem', filtro.origem)
    + '</div>'
    + '<div class="nxq-rodape"><div class="practice-checks"><label><input type="checkbox" data-nxf="com"' + (filtro.com ? ' checked' : '') + '> Só com comentário do caderno</label><label><input type="checkbox" data-nxf="anul"' + (filtro.anul ? ' checked' : '') + '> Excluir anuladas</label></div>'
    + '<div class="nxq-acoes"><button type="button" class="pf-btn" data-nxq="limpar">Limpar</button><button type="button" class="pf-btn soft" data-nxq="caderno">Sortear 20 questões</button></div></div>'
    + aviso + '</section>'
    + '<div class="practice-results-head"><b id="nxq-count"></b><span>A tesoura ao lado de cada alternativa risca as que você já eliminou.</span></div><div id="nxq-res"></div>';
  rodar();
  var v = document.getElementById('view'); if(v) v.scrollTop = 0;
};
/* nomes antigos continuam funcionando */
window.applyPracticeFilters = rodar;
window.clearPracticeFilters = function(){ filtro = base(); window.renderPracticeQuestionsPage(); };
window.setPracticeStatus = function(s){ filtro.status = s; window.renderPracticeQuestionsPage(); };
window.nexoPraticar = function(f){ filtro = Object.assign(base(), f || {}); LS.set(FKEY, filtro); window.renderPracticeQuestionsPage(); };

var kwT = null;
document.addEventListener('input', function(e){
  var el = e.target; if(!el.matches || !el.matches('[data-nxf="kw"]')) return;
  clearTimeout(kwT); kwT = setTimeout(function(){ filtro.kw = el.value; rodar(); }, 250);
});
document.addEventListener('change', function(e){
  var el = e.target, k = el.dataset && el.dataset.nxf; if(!k || k === 'kw') return;
  filtro[k] = el.type === 'checkbox' ? el.checked : el.value;
  if(k === 'disc'){ var m = mods().find(function(x){ return x.id === filtro.mod; }); if(m && filtro.disc && discDe(m) !== filtro.disc) filtro.mod = ''; }
  if(k === 'disc' || k === 'mod'){ LS.set(FKEY, filtro); window.renderPracticeQuestionsPage(); return; }
  rodar();
});
document.addEventListener('click', function(e){
  var b = e.target.closest && e.target.closest('[data-nxs],[data-nxq]'); if(!b) return;
  if(b.dataset.nxs){ filtro.status = b.dataset.nxs; document.querySelectorAll('[data-nxs]').forEach(function(x){ x.classList.toggle('active', x === b); }); rodar(); return; }
  var a = b.dataset.nxq;
  if(a === 'mais'){ mostrar += POR_PAGINA; desenharResultados(); }
  if(a === 'limpar') window.clearPracticeFilters();
  if(a === 'caderno'){
    aplicar();
    resultado = resultado.map(function(x){ return [Math.random(), x]; }).sort(function(x, y){ return x[0] - y[0]; }).slice(0, 20).map(function(x){ return x[1]; });
    mostrar = 20; desenharResultados();
    var ct = document.getElementById('nxq-count'); if(ct) ct.textContent = resultado.length + ' questões sorteadas com estes filtros';
  }
});

/* ================= 3. tesoura ================= */
var TESOURA = '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" aria-hidden="true"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M20 4 8.12 15.88M14.47 14.48 20 20M8.12 8.12 12 12"/></svg>';
function porTesoura(raiz){
  (raiz.querySelectorAll ? raiz : document).querySelectorAll('label.opt:not([data-nxcut]), .tr-op:not([data-nxcut])').forEach(function(op){
    op.setAttribute('data-nxcut', '');
    var t = document.createElement('span');
    t.className = 'nx-cut'; t.setAttribute('role', 'button'); t.tabIndex = 0;
    t.setAttribute('aria-pressed', 'false'); t.setAttribute('aria-label', 'Eliminar esta alternativa'); t.title = 'Eliminar alternativa';
    t.innerHTML = TESOURA;
    op.appendChild(t);
  });
}
function cortar(t){
  var op = t.closest('label.opt, .tr-op'); if(!op) return;
  var on = !op.classList.contains('nx-cortada');
  op.classList.toggle('nx-cortada', on);
  t.setAttribute('aria-pressed', String(on));
  t.setAttribute('aria-label', on ? 'Desfazer a eliminação' : 'Eliminar esta alternativa');
  var inp = op.querySelector('input'); if(on && inp && inp.checked) inp.checked = false;
}
document.addEventListener('click', function(e){
  var t = e.target.closest && e.target.closest('.nx-cut');
  if(t){ e.preventDefault(); e.stopPropagation(); cortar(t); return; }
  var op = e.target.closest && e.target.closest('label.opt.nx-cortada, .tr-op.nx-cortada');
  if(op){ e.preventDefault(); e.stopPropagation(); } /* alternativa riscada não pode ser marcada */
}, true);
document.addEventListener('keydown', function(e){
  var t = e.target.closest && e.target.closest('.nx-cut');
  if(t && (e.key === 'Enter' || e.key === ' ')){ e.preventDefault(); e.stopPropagation(); cortar(t); }
}, true);
new MutationObserver(function(ls){
  for(var i = 0; i < ls.length; i++) if(ls[i].addedNodes.length){ porTesoura(document); return; }
}).observe(document.documentElement, { childList:true, subtree:true });

/* ================= 4. painel inicial ================= */
var homeOriginal = window.home;
if(typeof homeOriginal === 'function'){
  window.home = function(){
    var r = homeOriginal.apply(this, arguments);
    try{ melhorarPainel(); }catch(e){}
    return r;
  };
}
function melhorarPainel(){
  var grid = document.querySelector('.stats-grid'); if(!grid) return;
  var ev = LS.get('nexo_eventos', []).filter(function(e){ return e && e.k === 'q'; });
  var hoje = new Date(); hoje.setHours(0, 0, 0, 0);
  var evHoje = ev.filter(function(e){ return e.t >= hoje.getTime(); }), okHoje = evHoje.filter(function(e){ return e.ok; }).length;
  var fich = LS.get('nexo_fichario', {}), agora = Date.now();
  var vencidas = Object.keys(fich).filter(function(k){ return fich[k] && fich[k].due != null && fich[k].due <= agora; }).length;

  /* 4º cartão: hoje, a partir do registro de estudo */
  var cards = grid.querySelectorAll('.stat-card'), ult = cards[cards.length - 1];
  if(ult){
    var novo = document.createElement('button'); novo.type = 'button'; novo.className = 'stat-card';
    novo.setAttribute('onclick', 'nexoDesempenho()');
    novo.innerHTML = '<span class="stat-icon rose">' + (typeof icon === 'function' ? icon('chart') : '') + '</span><span><span class="stat-label">Questões hoje</span><strong>' + (evHoje.length ? Math.round(okHoje / evHoje.length * 100) + '%' : '—') + '<small>' + (evHoje.length ? okHoje + ' de ' + evHoje.length + ' certas · ver desempenho' : 'nenhuma ainda · ver desempenho') + '</small></strong></span>' + (typeof icon === 'function' ? icon('arrow') : '');
    ult.replaceWith(novo);
  }

  /* faixa por disciplina, com números reais */
  var porDisc = {};
  DISC.forEach(function(d){ porDisc[d[0]] = { mods:0, q:0, banco:0, feitas:0, ok:0 }; });
  mods().forEach(function(m){
    var d = porDisc[discDe(m)]; if(!d) return;
    d.mods++; d.q += (m.questions || []).length + (m.official_questions || []).length;
    d.banco += (m.official_questions || []).filter(function(q){ return q.banco; }).length;
  });
  var discDoMod = {}; mods().forEach(function(m){ discDoMod[m.id] = discDe(m); });
  ev.forEach(function(e){ var d = porDisc[discDoMod[e.m]]; if(d){ d.feitas++; if(e.ok) d.ok++; } });
  var faixa = document.createElement('section');
  faixa.className = 'nx-painel-disc'; faixa.setAttribute('aria-label', 'Suas disciplinas');
  faixa.innerHTML = '<div class="nx-pd-top"><h2>Suas disciplinas</h2><span>' + (vencidas ? '<button type="button" class="text-button" onclick="showFlashcards()">' + vencidas + (vencidas === 1 ? ' ficha para revisar hoje' : ' fichas para revisar hoje') + '</button>' : 'Nenhuma ficha vencida no Fichário') + '</span></div><div class="nx-pd-grid">'
    + DISC.map(function(d){
      var x = porDisc[d[0]], pct = x.feitas ? Math.round(x.ok / x.feitas * 100) : null;
      return '<button type="button" class="nx-pd" style="--c:' + d[2] + '" onclick="nexoPraticar({disc:\'' + d[0] + '\'})">'
        + '<span class="nx-pd-sig">' + d[1] + '</span><span class="nx-pd-txt"><b>' + d[0] + '</b><small>' + x.mods + ' módulos · ' + x.q + ' questões' + (x.banco ? ' (' + x.banco + ' de provas)' : '') + '</small></span>'
        + '<span class="nx-pd-pct">' + (pct == null ? '<small>sem questões feitas</small>' : '<b>' + pct + '%</b><small>' + x.feitas + ' feitas</small>') + '</span>'
        + '<span class="nx-pd-bar"><i style="width:' + (pct || 0) + '%"></i></span></button>';
    }).join('') + '</div>';
  grid.insertAdjacentElement('afterend', faixa);

  var rod = document.querySelector('.dashboard-footer span:last-child');
  if(rod) rod.textContent = 'Constitucional, Administrativo, Penal e Medicina Legal · AOCP (PC-BA) e Cebraspe (PC-PE)';
}

function iniciar(){
  porTesoura(document);
  iniciarBanco(0);
  if(typeof current !== 'undefined' && current === null && document.querySelector('.stats-grid') && !document.querySelector('.nx-painel-disc')) try{ melhorarPainel(); }catch(e){}
}
if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar); else iniciar();
})();
