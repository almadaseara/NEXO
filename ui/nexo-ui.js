/* NEXO — camada de interface.
   - Navegação em árvore (disciplina > parte > grupo > assunto) para todas as disciplinas
   - Barra lateral retrátil (abre ao passar o mouse; CSS em ui/nexo-ui.css)
   - Tema claro/escuro
   - Cronômetro/temporizador no topo, que pode ser solto e arrastado
   - Registro local de desempenho (questões, flashcards, tempo de estudo)
   - Fichário: flashcards com repetição espaçada (caixas de revisão)
   - Painel de desempenho com gráficos
   Os dados ficam no navegador (localStorage). Nada aqui altera questões, gabaritos ou o Supabase. */
(function(){
'use strict';

/* ======================= utilidades ======================= */
var LS = {
  get: function(k, d){ try{ var v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); }catch(e){ return d; } },
  set: function(k, v){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){} }
};
function $(s, r){ return (r || document).querySelector(s); }
function $$(s, r){ return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
function escH(s){ return String(s == null ? '' : s).replace(/[&<>"']/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }
function mods(){ try{ return modules; }catch(e){ return []; } }
function cur(){ try{ return current; }catch(e){ return null; } }
function setCur(v){ try{ current = v; }catch(e){} }
function temas(){ return window.NEXO_TEMAS || {}; }
function disciplinaDe(m){ return (m && m.discipline) || 'Direito Constitucional'; }
function moduloPorId(id){ return mods().find(function(m){ return m.id === id; }); }
function semAcento(s){ return String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase(); }
function fecharMenuMovel(){ try{ if(typeof closeMobileNav === 'function') closeMobileNav(); }catch(e){} }
function setHead(t){ var h = document.getElementById('head'); if(h) h.textContent = t; }
function view(){ return document.getElementById('view'); }
var DIA = 864e5;
function inicioDoDia(t){ var d = new Date(t); d.setHours(0,0,0,0); return d.getTime(); }

var I = {
  sun:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
  moon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z"/></svg>',
  play:'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.4-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z"/></svg>',
  pause:'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1.2"/><rect x="14" y="5" width="4" height="14" rx="1.2"/></svg>',
  reset:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12a8 8 0 1 0 2.4-5.7"/><path d="M4 4v4h4"/></svg>',
  float:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="3"/><rect x="11" y="11" width="7" height="6" rx="1.5"/></svg>',
  dock:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="3"/><rect x="6" y="6" width="12" height="4" rx="1.2"/></svg>',
  grip:'<svg viewBox="0 0 12 16" fill="currentColor" aria-hidden="true"><circle cx="3" cy="3" r="1.4"/><circle cx="9" cy="3" r="1.4"/><circle cx="3" cy="8" r="1.4"/><circle cx="9" cy="8" r="1.4"/><circle cx="3" cy="13" r="1.4"/><circle cx="9" cy="13" r="1.4"/></svg>',
  chart:'<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 20V10m6 10V4m6 16v-7m4 7H3"/></svg>',
  x:'<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>',
  wave:'<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M4 12c2-3 4-3 6 0s4 3 6 0 3-2 4-1"/></svg>',
  ok:'<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7"/></svg>'
};

/* ======================= tema ======================= */
var TEMA_KEY = 'nexo_theme';
function temaAtual(){ return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'; }
function temaPreferido(){
  var t = LS.get(TEMA_KEY, null);
  if(t === 'dark' || t === 'light') return t;
  return (window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
}
function aplicarTema(t){
  document.documentElement.setAttribute('data-theme', t);
  var b = document.getElementById('nx-theme');
  if(b){
    b.setAttribute('aria-pressed', String(t === 'dark'));
    b.setAttribute('aria-label', t === 'dark' ? 'Usar tema claro' : 'Usar tema escuro');
    b.title = t === 'dark' ? 'Tema claro' : 'Tema escuro';
    b.innerHTML = t === 'dark' ? I.sun : I.moon;
  }
}
window.nexoSetTheme = function(t){ LS.set(TEMA_KEY, t); aplicarTema(t); };
aplicarTema(temaPreferido());

/* ======================= registro de desempenho ======================= */
var EV_KEY = 'nexo_eventos';
function eventos(){ var a = LS.get(EV_KEY, []); return Array.isArray(a) ? a : []; }
function registrar(e){
  e.t = e.t || Date.now();
  var a = eventos(); a.push(e);
  if(a.length > 20000) a = a.slice(-20000);
  LS.set(EV_KEY, a);
  atualizarPill();
}
window.nexoRegistrar = registrar;

(function importarRespostasAntigas(){
  if(LS.get('nexo_eventos_import', false)) return;
  var s = LS.get('nexo_practice_answers', {}), a = eventos();
  Object.keys(s || {}).forEach(function(k){
    var v = s[k]; if(!v || !v.done) return;
    a.push({ k:'q', m:k.replace(/^official_/, '').replace(/_\d+$/, ''), ok:!!v.ok, t:v.at || Date.now(), imp:1 });
  });
  a.sort(function(x, y){ return x.t - y.t; });
  LS.set(EV_KEY, a); LS.set('nexo_eventos_import', true);
})();

function envolverCorrecao(nome, chave, lista){
  var orig = window[nome]; if(typeof orig !== 'function') return;
  window[nome] = function(prefix, i){
    var key = chave(prefix, i), card = document.getElementById('card_' + key);
    var antes = card && card.dataset.done === '1';
    var sel = document.querySelector('input[name="' + key + '"]:checked');
    var r = orig.apply(this, arguments);
    try{
      if(card && !antes && card.dataset.done === '1' && sel){
        var m = moduloPorId(prefix), q = m && m[lista] && m[lista][i];
        if(q) registrar({ k:'q', m:prefix, ok:sel.value === q.answer });
      }
    }catch(e){}
    return r;
  };
}
envolverCorrecao('checkQuestion', function(p, i){ return p + '_' + i; }, 'questions');
envolverCorrecao('checkOfficialQuestion', function(p, i){ return 'official_' + p + '_' + i; }, 'official_questions');
/* nota dada nos flashcards dentro do módulo */
document.addEventListener('click', function(e){
  var t = e.target.closest && e.target.closest('[data-trg]');
  if(t) registrar({ k:'f', m:cur(), g:+t.dataset.trg });
}, true);

function atualizarPill(){
  var p = document.getElementById('score'); if(!p) return;
  var hoje = inicioDoDia(Date.now()), q = eventos().filter(function(e){ return e.k === 'q' && e.t >= hoje; });
  var ok = q.filter(function(e){ return e.ok; }).length;
  p.textContent = q.length ? ok + ' de ' + q.length + ' hoje' : '0 acertos hoje';
  p.title = 'Ver desempenho';
}

/* ======================= árvore de assuntos ======================= */
var DISCIPLINAS = [
  { nome:'Direito Constitucional', sigla:'DC', cor:'var(--nx-d1)', tinta:'#9cc8ff', id:'const-folder' },
  { nome:'Direito Administrativo', sigla:'DA', cor:'var(--nx-d2)', tinta:'#ffbb98', id:'adm-folder' },
  { nome:'Medicina Legal', sigla:'ML', cor:'var(--nx-d3)', tinta:'#c9c1ff', id:'med-folder' },
  { nome:'Direito Penal', sigla:'DP', cor:'var(--nx-d4)', tinta:'#86e6c2', id:'penal-folder' }
];
/* nó = id do módulo (texto) ou [rótulo, [filhos]] */
var ARVORE = {
  'Direito Constitucional': [
    ['Teoria e princípios', ['principios_fundamentais', 'teoria_direitos']],
    ['Direitos e garantias fundamentais', ['art5_parte1', 'art5_parte2', 'direitos_sociais', 'nacionalidade', 'direitos_politicos', 'partidos']],
    ['Organização do Estado', ['organizacao_estado', 'adm_publica']],
    ['Organização dos Poderes', ['legislativo', 'processo_legislativo', 'executivo', 'judiciario', 'funcoes_essenciais']],
    ['Defesa do Estado e das instituições democráticas', ['defesa_estado']],
    ['Tributação, orçamento e ordem econômica e social', ['sistema_tributario_orcamento', 'ordem_economica_social']]
  ],
  'Direito Administrativo': [
    ['Regime jurídico e poderes', ['adm_regime_principios', 'adm_poderes']],
    ['Organização administrativa', ['adm_organizacao', 'adm_estatais_fundacoes']],
    ['Atos e controle', ['adm_atos', 'adm_controle']],
    ['Agentes, responsabilidade e improbidade', ['adm_agentes', 'adm_responsabilidade_estado', 'adm_improbidade']],
    ['Licitações e contratos', ['adm_licitacao_principios', 'adm_contratacao_direta', 'adm_contratos']]
  ],
  'Medicina Legal': [
    ['Fundamentos e perícia', ['ml_introducao', 'ml_pericias', 'ml_documentos']],
    ['Antropologia forense', ['ml_identificacao']],
    ['Traumatologia forense', ['ml_traumatologia', 'ml_lesoes_corporais', 'ml_asfixiologia']],
    ['Tanatologia forense', ['ml_tanatologia']],
    ['Sexologia forense', ['ml_sexologia']],
    ['Psicopatologia forense', ['ml_psicopatologia']]
  ],
  'Direito Penal': [
    ['Parte Geral', [
      ['Fundamentos e aplicação da lei penal', ['penal_principios', 'penal_aplicacao']],
      ['Teoria do crime', ['penal_fato_tipico', 'penal_dolo_culpa', 'penal_ilicitude', 'penal_erros', 'penal_concurso']],
      ['Pena e punibilidade', ['penal_dosimetria', 'penal_punibilidade']]
    ]],
    ['Parte Especial', [
      ['Crimes contra a pessoa', ['penal_pessoa', 'penal_pessoa_01', 'penal_pessoa_02', 'penal_pessoa_03', 'penal_pessoa_04', 'penal_pessoa_05', 'penal_pessoa_06', 'penal_pessoa_07', 'penal_pessoa_08', 'penal_pessoa_09', 'penal_pessoa_10']],
      ['Crimes contra o patrimônio', ['penal_patrimonio']],
      ['Crimes contra a dignidade sexual', ['penal_sexual']],
      ['Crimes contra a incolumidade pública', ['penal_incolumidade']],
      ['Crimes contra a fé pública', ['penal_fe_publica']],
      ['Crimes contra a Administração Pública', ['penal_adm_func', 'penal_adm_particular', 'penal_adm_justica', 'penal_adm_financas']]
    ]]
  ]
};
/* rótulos curtos dentro do grupo (o título completo continua no módulo) */
var ROTULOS = {
  principios_fundamentais:'Princípios fundamentais e teoria da Constituição', teoria_direitos:'Teoria geral dos direitos fundamentais',
  art5_parte1:'Art. 5º, incisos I a XXXI', art5_parte2:'Art. 5º, incisos XXXII a LXXIX', direitos_politicos:'Cidadania e direitos políticos',
  organizacao_estado:'Organização político-administrativa', sistema_tributario_orcamento:'Sistema tributário e orçamento', ordem_economica_social:'Ordem econômica e social',
  adm_regime_principios:'Regime jurídico-administrativo e princípios', adm_estatais_fundacoes:'Fundações, empresas públicas e sociedades de economia mista',
  adm_licitacao_principios:'Princípios, modalidades e procedimento', adm_contratacao_direta:'Contratação direta', adm_improbidade:'Improbidade administrativa',
  ml_introducao:'Conceito, importância e divisões', ml_identificacao:'Identidade e identificação humana', ml_traumatologia:'Lesões e instrumentos',
  ml_tanatologia:'Morte e fenômenos cadavéricos', ml_sexologia:'Aspectos médico-legais dos crimes sexuais', ml_psicopatologia:'Modificadores e avaliação pericial',
  penal_principios:'Princípios e fundamentos', penal_aplicacao:'Aplicação da lei penal e infração penal', penal_fato_tipico:'Fato típico', penal_dolo_culpa:'Dolo e culpa',
  penal_ilicitude:'Ilicitude e culpabilidade', penal_erros:'Erro de tipo e erro de proibição', penal_concurso:'Concurso de pessoas',
  penal_dosimetria:'Aplicação e dosimetria da pena', penal_punibilidade:'Extinção da punibilidade e prescrição', penal_pessoa:'Visão geral',
  penal_patrimonio:'Crimes contra o patrimônio', penal_sexual:'Crimes contra a dignidade sexual', penal_incolumidade:'Crimes contra a incolumidade pública', penal_fe_publica:'Crimes contra a fé pública',
  penal_adm_func:'Praticados por funcionário público', penal_adm_particular:'Praticados por particular', penal_adm_justica:'Contra a administração da Justiça', penal_adm_financas:'Disposições complementares'
};
function rotulo(id){ var m = moduloPorId(id); return ROTULOS[id] || (m ? m.title : id); }
function discInfo(nome){ return DISCIPLINAS.find(function(d){ return d.nome === nome; }) || { nome:nome, sigla:nome.split(' ').filter(function(w){ return w.length > 2; }).map(function(w){ return w[0]; }).join('').slice(0, 2).toUpperCase(), cor:'#2f7968', tinta:'#9fe0cf', id:'disc-' + semAcento(nome).replace(/\W+/g, '-') }; }
function listaDisciplinas(){
  var nomes = DISCIPLINAS.map(function(d){ return d.nome; });
  mods().forEach(function(m){ var d = disciplinaDe(m); if(nomes.indexOf(d) < 0) nomes.push(d); });
  return nomes;
}
/* árvore completa da disciplina, incluindo módulos novos que ainda não estão na configuração */
function arvoreDe(nome){
  var base = (ARVORE[nome] || []).slice(), usados = {};
  (function marca(n){ n.forEach(function(x){ if(typeof x === 'string') usados[x] = 1; else marca(x[1]); }); })(base);
  var extras = mods().filter(function(m){ return disciplinaDe(m) === nome && !usados[m.id]; });
  var grupos = {};
  extras.forEach(function(m){ var g = m.parent_subject || ''; (grupos[g] = grupos[g] || []).push(m.id); });
  Object.keys(grupos).forEach(function(g){ if(g) base.push([g, grupos[g]]); else grupos[g].forEach(function(id){ base.push(id); }); });
  return base;
}
function folhas(no){ var r = []; (function f(n){ if(typeof n === 'string') r.push(n); else n[1].forEach(f); })(no); return r; }
function chaveGrupo(disc, caminho){ return semAcento(disc + '/' + caminho).replace(/[^a-z0-9/]+/g, '-'); }
var abertos = LS.get('nexo_nav_grupos', {});
function marcarBusca(texto, q){
  if(!q) return escH(texto);
  var i = semAcento(texto).indexOf(q);
  if(i < 0) return escH(texto);
  return escH(texto.slice(0, i)) + '<mark>' + escH(texto.slice(i, i + q.length)) + '</mark>' + escH(texto.slice(i + q.length));
}
function arvoreHTML(){
  var q = semAcento((document.getElementById('search') || {}).value || '').trim();
  var atual = cur(), h = '';
  listaDisciplinas().forEach(function(nome){
    var d = discInfo(nome), raiz = arvoreDe(nome);
    var visivel = function(id){
      var m = moduloPorId(id); if(!m) return false;
      if(!q) return true;
      return [rotulo(id), m.title, m.focus || '', nome].some(function(t){ return semAcento(t).indexOf(q) >= 0; });
    };
    var total = 0;
    function no(n, nivel, caminho){
      if(typeof n === 'string'){
        if(!visivel(n)) return '';
        total++;
        return '<button type="button" class="nx-leaf' + (atual === n ? ' active' : '') + '" onclick="openModule(\'' + n + '\')"' + (atual === n ? ' aria-current="page"' : '') + ' title="' + escH(moduloPorId(n).title) + '"><span class="nx-dot"></span><span>' + marcarBusca(rotulo(n), q) + '</span></button>';
      }
      var filhos = n[1], vis = folhas(n).filter(visivel);
      if(!vis.length) return '';
      if(filhos.length === 1 && typeof filhos[0] === 'string') return no(filhos[0], nivel, caminho);
      var key = chaveGrupo(nome, caminho + '/' + n[0]);
      var aberto = !!q || vis.indexOf(atual) >= 0 || !!abertos[key];
      var inner = filhos.map(function(f){ return no(f, nivel + 1, caminho + '/' + n[0]); }).join('');
      return '<details class="nx-group nx-l' + nivel + '" data-key="' + key + '"' + (aberto ? ' open' : '') + '><summary><span class="nx-caret"></span><span class="nx-glabel">' + marcarBusca(n[0], q) + '</span><span class="nx-gcount">' + vis.length + '</span></summary><div class="nx-branch">' + inner + '</div></details>';
    }
    var corpo = raiz.map(function(n){ return no(n, 1, ''); }).join('');
    if(q && !total) return;
    h += '<div class="folder-wrap nx-disc" id="' + d.id + '" style="--disc:' + d.cor + ';--disc-ink:' + d.tinta + '">'
      + '<button type="button" class="folder-btn" onclick="toggleFolder(\'' + d.id + '\')" aria-expanded="false" title="' + escH(nome) + '">'
      + '<span><span class="nx-mono" aria-hidden="true">' + d.sigla + '</span><span class="nx-disc-name">' + escH(nome) + '</span></span>'
      + '<span class="nx-count">' + total + '</span><span class="arrow">›</span></button>'
      + '<div class="folder-list nx-tree">' + (corpo || '<p class="nav-empty">Nenhum assunto encontrado.</p>') + '</div></div>';
  });
  if(q && !h) h = '<p class="nav-empty" style="padding:10px 12px">Nenhum assunto encontrado para essa busca.</p>';
  return h;
}

var renderNavOriginal = window.renderNav;
window.renderNav = function(){
  var nav = document.getElementById('nav');
  var pastasAbertas = nav ? $$('.folder-wrap.open', nav).map(function(x){ return x.id; }) : [];
  try{ if(typeof renderNavOriginal === 'function') renderNavOriginal.apply(this, arguments); }catch(e){}
  nav = document.getElementById('nav'); if(!nav) return;
  $$('.folder-wrap', nav).forEach(function(x){ x.remove(); });
  $$('.nx-nav-extra', nav).forEach(function(x){ x.remove(); });
  nav.insertAdjacentHTML('beforeend', arvoreHTML());
  var m = moduloPorId(cur()), q = ((document.getElementById('search') || {}).value || '').trim();
  $$('.folder-wrap', nav).forEach(function(f){
    var tem = m && discInfo(disciplinaDe(m)).id === f.id;
    if(q || tem || pastasAbertas.indexOf(f.id) >= 0){ f.classList.add('open'); var b = f.querySelector('.folder-btn'); if(b) b.setAttribute('aria-expanded', 'true'); }
  });
  /* entrada "Desempenho" logo depois de "Flashcards" */
  var fc = $$('.primary-nav', nav).find(function(b){ return /showFlashcards/.test(b.getAttribute('onclick') || ''); });
  var botao = '<button type="button" class="primary-nav nx-nav-extra' + (cur() === 'desempenho' ? ' active' : '') + '" onclick="nexoDesempenho()">' + I.chart + ' Desempenho</button>';
  if(fc){
    fc.classList.toggle('active', cur() === 'flashcards');
    fc.insertAdjacentHTML('afterend', botao);
  }
  var lista = nav.querySelector('.nx-tree .nx-leaf.active');
  if(lista && lista.scrollIntoView && !q) try{ lista.scrollIntoView({ block:'nearest' }); }catch(e){}
};
document.addEventListener('toggle', function(e){
  var d = e.target;
  if(!d || !d.classList || !d.classList.contains('nx-group')) return;
  if(((document.getElementById('search') || {}).value || '').trim()) return;
  abertos[d.dataset.key] = d.open ? 1 : 0;
  if(!d.open) delete abertos[d.dataset.key];
  LS.set('nexo_nav_grupos', abertos);
}, true);

/* barra de acesso rápido: botão de desempenho */
function prepararBarraAcesso(){
  var bar = document.querySelector('.access-bar'); if(!bar || bar.querySelector('[data-area="perf"]')) return;
  var ref = bar.querySelector('[data-area="maps"]') || bar.querySelector('.access-caption');
  var html = '<button type="button" data-area="perf" onclick="nexoDesempenho()">' + I.chart + '<span>Desempenho</span></button>';
  if(ref) ref.insertAdjacentHTML('beforebegin', html); else bar.insertAdjacentHTML('beforeend', html);
}
var syncOriginal = window.syncAccess;
window.syncAccess = function(){
  try{ if(typeof syncOriginal === 'function') syncOriginal.apply(this, arguments); }catch(e){}
  var c = cur();
  if(c === 'desempenho' || c === 'flashcards'){
    $$('.access-bar [data-area]').forEach(function(b){ b.classList.remove('selected'); b.removeAttribute('aria-current'); });
    if(c === 'desempenho'){ var p = document.querySelector('.access-bar [data-area="perf"]'); if(p){ p.classList.add('selected'); p.setAttribute('aria-current', 'page'); } }
  }
};

/* ======================= cronômetro ======================= */
var TK = 'nexo_cronometro';
var T = LS.get(TK, null) || { modo:'up', dur:25*60000, rodando:false, inicio:0, acum:0, solto:false, x:null, y:null };
var tickId = null, avisado = false;
function salvarT(){ LS.set(TK, T); }
function decorrido(){ return T.acum + (T.rodando ? Date.now() - T.inicio : 0); }
function fmt(ms){
  ms = Math.max(0, ms); var s = Math.floor(ms / 1000);
  var h = Math.floor(s / 3600), m = Math.floor(s % 3600 / 60), ss = s % 60;
  return String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0') + ':' + String(ss).padStart(2, '0');
}
function registrarTempo(ms){ if(ms >= 5000) registrar({ k:'t', ms:Math.round(ms) }); }
function bip(){
  try{
    var C = window.AudioContext || window.webkitAudioContext; if(!C) return;
    var ctx = new C(), t0 = ctx.currentTime;
    [0, .32, .64].forEach(function(dt){
      var o = ctx.createOscillator(), g = ctx.createGain();
      o.frequency.value = 880; o.connect(g); g.connect(ctx.destination);
      g.gain.setValueAtTime(.0001, t0 + dt); g.gain.exponentialRampToValueAtTime(.25, t0 + dt + .02); g.gain.exponentialRampToValueAtTime(.0001, t0 + dt + .25);
      o.start(t0 + dt); o.stop(t0 + dt + .27);
    });
  }catch(e){}
}
function avisar(msg){
  var el = document.getElementById('workspace-message');
  if(el){ el.textContent = msg; el.classList.add('visible', 'show'); setTimeout(function(){ el.classList.remove('visible', 'show'); }, 4000); }
}
function desenharTimer(){
  var el = document.getElementById('nx-timer'); if(!el) return;
  var d = decorrido(), fim = T.modo !== 'up' && d >= T.dur;
  if(T.modo !== 'up' && fim && T.rodando){
    registrarTempo(T.dur - T.acum); T.acum = T.dur; T.rodando = false; salvarT();
    if(!avisado){ avisado = true; bip(); avisar('Tempo encerrado. Faça uma pausa curta antes do próximo bloco.'); }
  }
  var mostra = T.modo === 'up' ? d : T.dur - d;
  $('.nx-time', el).textContent = fmt(T.modo === 'up' ? mostra : Math.ceil(mostra / 1000) * 1000);
  el.classList.toggle('running', T.rodando);
  el.classList.toggle('done', T.modo !== 'up' && decorrido() >= T.dur);
  var pb = $('.nx-play', el);
  pb.innerHTML = T.rodando ? I.pause : I.play;
  pb.setAttribute('aria-label', T.rodando ? 'Pausar' : 'Iniciar');
  pb.title = T.rodando ? 'Pausar' : 'Iniciar';
  $('.nx-mode', el).value = T.modo === 'up' ? 'up' : String(Math.round(T.dur / 60000));
  if(T.rodando && !tickId) tickId = setInterval(desenharTimer, 250);
  if(!T.rodando && tickId){ clearInterval(tickId); tickId = null; }
}
function alternarTimer(){
  if(T.rodando){ var seg = Date.now() - T.inicio; T.acum += seg; T.rodando = false; registrarTempo(seg); }
  else{
    if(T.modo !== 'up' && T.acum >= T.dur) T.acum = 0;
    T.inicio = Date.now(); T.rodando = true; avisado = false;
  }
  salvarT(); desenharTimer();
}
function zerarTimer(){
  if(T.rodando) registrarTempo(Date.now() - T.inicio);
  T.rodando = false; T.acum = 0; avisado = false; salvarT(); desenharTimer();
}
function mudarModo(v){
  if(T.rodando) registrarTempo(Date.now() - T.inicio);
  T.rodando = false; T.acum = 0; avisado = false;
  if(v === 'up') T.modo = 'up'; else { T.modo = 'down'; T.dur = (+v || 25) * 60000; }
  salvarT(); desenharTimer();
}
function posicionarSolto(el){
  var w = el.offsetWidth || 300, h = el.offsetHeight || 50;
  var x = T.x == null ? window.innerWidth - w - 24 : T.x, y = T.y == null ? 86 : T.y;
  x = Math.min(Math.max(8, x), window.innerWidth - w - 8); y = Math.min(Math.max(8, y), window.innerHeight - h - 8);
  el.style.left = x + 'px'; el.style.top = y + 'px'; T.x = x; T.y = y;
}
function soltar(sim){
  var el = document.getElementById('nx-timer'), slot = document.getElementById('nx-timer-slot'); if(!el || !slot) return;
  T.solto = !!sim; salvarT();
  var fb = $('.nx-float', el);
  if(T.solto){
    document.body.appendChild(el); el.classList.add('floating'); posicionarSolto(el);
    fb.innerHTML = I.dock; fb.setAttribute('aria-label', 'Fixar no topo'); fb.title = 'Fixar no topo';
  }else{
    el.classList.remove('floating'); el.style.left = el.style.top = '';
    slot.parentNode.insertBefore(el, slot);
    fb.innerHTML = I.float; fb.setAttribute('aria-label', 'Soltar e mover o cronômetro'); fb.title = 'Soltar e mover';
  }
}
function arrastavel(el){
  var grip = $('.nx-grip', el), ox = 0, oy = 0, ativo = false;
  grip.addEventListener('pointerdown', function(e){
    if(!el.classList.contains('floating')) return;
    ativo = true; el.classList.add('dragging'); grip.setPointerCapture(e.pointerId);
    var r = el.getBoundingClientRect(); ox = e.clientX - r.left; oy = e.clientY - r.top; e.preventDefault();
  });
  grip.addEventListener('pointermove', function(e){
    if(!ativo) return; T.x = e.clientX - ox; T.y = e.clientY - oy; posicionarSolto(el);
  });
  function fim(){ if(!ativo) return; ativo = false; el.classList.remove('dragging'); salvarT(); }
  grip.addEventListener('pointerup', fim); grip.addEventListener('pointercancel', fim);
  grip.addEventListener('keydown', function(e){
    var p = { ArrowLeft:[-20, 0], ArrowRight:[20, 0], ArrowUp:[0, -20], ArrowDown:[0, 20] }[e.key];
    if(!p || !el.classList.contains('floating')) return;
    e.preventDefault(); T.x += p[0]; T.y += p[1]; posicionarSolto(el); salvarT();
  });
  window.addEventListener('resize', function(){ if(el.classList.contains('floating')) posicionarSolto(el); });
}
function montarFerramentas(){
  var header = document.querySelector('main > header'); if(!header || document.getElementById('nx-tools')) return;
  var ref = header.querySelector('.pills') || header.querySelector('.auth-actions');
  var html = '<div class="nx-tools" id="nx-tools">'
    + '<div class="nx-timer" id="nx-timer" role="group" aria-label="Cronômetro de estudo">'
    + '<span class="nx-grip" tabindex="0" role="button" aria-label="Arrastar cronômetro (use as setas)" title="Arrastar">' + I.grip + '</span>'
    + '<select class="nx-mode" aria-label="Modo do cronômetro"><option value="up">Cronômetro</option><option value="25">Timer 25 min</option><option value="50">Timer 50 min</option><option value="90">Timer 90 min</option></select>'
    + '<span class="nx-time" aria-live="off">00:00:00</span>'
    + '<button type="button" class="nx-tb nx-play"></button>'
    + '<button type="button" class="nx-tb nx-reset" aria-label="Zerar" title="Zerar">' + I.reset + '</button>'
    + '<button type="button" class="nx-tb nx-float"></button>'
    + '</div><span id="nx-timer-slot" class="nx-dock-slot"></span>'
    + '<button type="button" class="nx-iconbtn" id="nx-theme"></button></div>';
  if(ref) ref.insertAdjacentHTML('beforebegin', html); else header.insertAdjacentHTML('beforeend', html);
  var el = document.getElementById('nx-timer');
  $('.nx-play', el).addEventListener('click', alternarTimer);
  $('.nx-reset', el).addEventListener('click', zerarTimer);
  $('.nx-float', el).addEventListener('click', function(){ soltar(!T.solto); });
  $('.nx-mode', el).addEventListener('change', function(e){ mudarModo(e.target.value); });
  document.getElementById('nx-theme').addEventListener('click', function(){ window.nexoSetTheme(temaAtual() === 'dark' ? 'light' : 'dark'); });
  arrastavel(el); aplicarTema(temaAtual()); soltar(T.solto); desenharTimer();
  window.addEventListener('beforeunload', function(){
    if(T.rodando){ var seg = Date.now() - T.inicio; registrarTempo(seg); T.acum += seg; T.inicio = Date.now(); salvarT(); }
  });
  var pill = document.getElementById('score');
  if(pill){ pill.style.cursor = 'pointer'; pill.setAttribute('role', 'button'); pill.tabIndex = 0;
    pill.addEventListener('click', function(){ window.nexoDesempenho(); });
    pill.addEventListener('keydown', function(e){ if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); window.nexoDesempenho(); } }); }
}

/* ======================= fichário (flashcards) ======================= */
var FK = 'nexo_fichario', INTERVALOS = [0, 1, 3, 7, 15, 30];
var TIPOS = { caso:'Caso prático', numero:'Números e prazos', distincao:'Distinção', lacuna:'Complete a lei', ce:'Certo ou errado', juris:'Jurisprudência' };
var RAIA = ['Novas', '1 dia', '3 dias', '7 dias', '15 dias', '30 dias'];
var cacheFichas = null;
function fichas(){
  if(cacheFichas) return cacheFichas;
  var lista = [], legado = [];
  try{ legado = nexoFlashcards || []; }catch(e){}
  listaDisciplinas().forEach(function(nome){
    folhas(['', arvoreDe(nome)]).forEach(function(id){
      var m = moduloPorId(id); if(!m) return;
      var T2 = temas()[id];
      if(T2 && T2.cards && T2.cards.length){
        var secs = {}; (T2.secoes || []).forEach(function(s){ secs[s.id] = s.titulo; });
        T2.cards.forEach(function(c){ lista.push({ id:id + ':' + c.id, m:id, d:nome, f:c.f, v:c.v, tipo:TIPOS[c.tipo] || 'Revisão', sec:secs[c.sec] || '' }); });
      }else{
        legado.filter(function(c){ return c.topic === m.title; }).forEach(function(c){
          lista.push({ id:'leg:' + c.id, m:id, d:nome, f:escH(c.question), v:escH(c.answer) + (c.mnemonic ? '<br><span style="color:var(--nx-muted);font-size:.85em">Macete: ' + escH(c.mnemonic) + '</span>' : ''), tipo:'Revisão', sec:'' });
        });
      }
    });
  });
  minhasFichas().forEach(function(c){
    var m = moduloPorId(c.m);
    lista.push({ id:'u:' + c.id, m:c.m, d:m ? disciplinaDe(m) : 'Minhas fichas', f:escH(c.f).replace(/\n/g, '<br>'), v:escH(c.v).replace(/\n/g, '<br>'), tipo:'Minha ficha', sec:'', u:true });
  });
  cacheFichas = lista; return lista;
}
/* ---------- fichas criadas pelo aluno (guardadas no plano de estudos: sincronizam com a conta) ---------- */
function planoEstudo(){ try{ return window.nexoEstudo ? window.nexoEstudo.plano() : null; }catch(e){ return null; } }
function minhasFichas(){ var s = planoEstudo(); return (s && s.progress && s.progress.minhas) || LS.get('nexo_minhas_fichas', []); }
function gravarMinhas(lista){
  var s = planoEstudo();
  if(s && window.nexoEstudo){ s.progress = s.progress || {}; s.progress.minhas = lista; window.nexoEstudo.salvarPlano(s); }
  else LS.set('nexo_minhas_fichas', lista);
  cacheFichas = null;
}
window.nexoFichas = {
  listar:minhasFichas,
  criar:function(m, f, v){
    f = String(f || '').trim().slice(0, 600); v = String(v || '').trim().slice(0, 1200); if(!f || !v) return null;
    var c = { id:Date.now().toString(36) + Math.random().toString(36).slice(2, 6), m:m || '', f:f, v:v, criado:Date.now() };
    var l = minhasFichas().slice(); l.push(c); gravarMinhas(l); return c;
  },
  remover:function(id){ gravarMinhas(minhasFichas().filter(function(c){ return c.id !== id; })); var st = estado(); delete st['u:' + id]; LS.set(FK, st); }
};
document.addEventListener('nexo:estudo', function(e){ if(e.detail === 'sincronizado'){ cacheFichas = null; if(cur() === 'flashcards' && !S) window.showFlashcards(); } });
function estado(){ return LS.get(FK, {}); }
function caixa(st, id){ var r = st[id]; return r ? r.b : 0; }
function fimDeHoje(){ return inicioDoDia(Date.now()) + DIA; }
function resumoFichas(ids){
  var st = estado(), lim = fimDeHoje(), r = { total:0, novas:0, hoje:0, firmes:0, medias:0, caixas:[0, 0, 0, 0, 0, 0] };
  fichas().forEach(function(c){
    if(ids && !ids[c.m]) return;
    r.total++; var x = st[c.id];
    if(!x){ r.novas++; r.caixas[0]++; return; }
    r.caixas[Math.min(5, x.b)]++;
    if(x.due <= lim) r.hoje++;
    if(x.b >= 3) r.firmes++; else r.medias++;
  });
  return r;
}
function conjunto(lista){ var o = {}; lista.forEach(function(id){ o[id] = 1; }); return o; }
var S = null; /* sessão em andamento */
var FX_NOVAS = 'nexo_fichario_novas';

window.showFlashcards = function(){
  fecharMenuMovel(); setCur('flashcards'); S = null;
  try{ renderNav(); }catch(e){}
  setHead('Flashcards / Fichário');
  var r = resumoFichas(null), novasPorSessao = LS.get(FX_NOVAS, 20);
  var max = Math.max.apply(null, r.caixas.concat([1]));
  var slots = r.caixas.map(function(n, i){
    var alt = n ? Math.max(6, Math.round(n / max * 100)) : 0;
    return '<div class="fx-slot s' + i + '"><span class="fx-n">' + n + '</span><div class="fx-stack" style="height:' + alt + 'px" title="' + n + ' fichas"></div><span class="fx-l">' + RAIA[i] + '</span></div>';
  }).join('');
  var decks = listaDisciplinas().map(function(nome){
    var d = discInfo(nome), ids = folhas(['', arvoreDe(nome)]), rs = resumoFichas(conjunto(ids));
    if(!rs.total) return '';
    var linhas = '';
    (function percorre(n, nivel, caminho){
      n.forEach(function(x){
        if(typeof x === 'string'){
          var rr = resumoFichas(conjunto([x])); if(!rr.total) return;
          linhas += '<div class="fx-row lf' + (nivel === 1 ? ' l1' : '') + '"><span>' + escH(rotulo(x)) + '</span><span class="fx-c">' + rr.hoje + ' hoje · ' + rr.novas + ' novas · ' + rr.total + '</span><button type="button" class="nx-btn small" data-fx-scope="m:' + x + '">Revisar</button></div>';
        }else{
          var fl = folhas(x), rr2 = resumoFichas(conjunto(fl)); if(!rr2.total) return;
          if(x[1].length === 1 && typeof x[1][0] === 'string'){ percorre(x[1], nivel, caminho); return; }
          linhas += '<div class="fx-row g' + Math.min(2, nivel) + '"><span>' + escH(x[0]) + '</span><span class="fx-c">' + rr2.hoje + ' hoje · ' + rr2.total + '</span><button type="button" class="nx-btn small" data-fx-scope="g:' + escH(nome) + '|' + escH(caminho + '/' + x[0]) + '">Revisar grupo</button></div>';
          percorre(x[1], nivel + 1, caminho + '/' + x[0]);
        }
      });
    })(arvoreDe(nome), 1, '');
    var pf = rs.total ? Math.round(rs.firmes / rs.total * 100) : 0, pm = rs.total ? Math.round(rs.medias / rs.total * 100) : 0;
    return '<details class="fx-deck" style="--disc:' + d.cor + '"><summary><span class="nx-mono">' + d.sigla + '</span>'
      + '<span><span class="fx-name">' + escH(nome) + '</span><span class="fx-sub" style="display:block">' + rs.total + ' fichas · ' + rs.novas + ' ainda não vistas</span>'
      + '<span class="fx-meter" title="' + pf + '% firmes (7 dias ou mais), ' + pm + '% em revisão"><i class="m-firm" style="width:' + pf + '%"></i><i class="m-mid" style="width:' + pm + '%"></i></span></span>'
      + '<span class="fx-due">' + rs.hoje + '<small>para hoje</small></span>'
      + '<button type="button" class="nx-btn small" data-fx-scope="d:' + escH(nome) + '">Revisar</button></summary>'
      + '<div class="fx-inner">' + linhas + '</div></details>';
  }).join('');
  var total = fichas().length;
  view().innerHTML = '<div class="nx-page">'
    + '<div class="nx-head"><div><h1>Fichário</h1><p>' + total + ' fichas tiradas dos resumos, da lei seca e da jurisprudência de cada assunto. Cada ficha que você acerta vai para uma caixa de revisão mais espaçada; a que você erra volta para o começo.</p></div></div>'
    + '<div class="fx-top"><section class="fx-today" aria-label="Revisão de hoje"><div class="fx-big">' + r.hoje + '<small>' + (r.hoje === 1 ? 'ficha para revisar hoje' : 'fichas para revisar hoje') + '</small></div>'
    + '<div class="fx-meta"><span><b>' + r.novas + '</b> nunca vistas</span><span><b>' + (r.total - r.novas) + '</b> já estudadas</span></div>'
    + '<div class="fx-actions"><button type="button" class="nx-btn primary" data-fx-scope="all">' + (r.hoje ? 'Começar a revisão do dia' : 'Estudar fichas novas') + '</button>'
    + '<label class="nx-sub" style="font-size:12px;color:var(--nx-muted)">Novas por sessão <select id="fx-novas">' + [10, 20, 30, 50].map(function(n){ return '<option' + (n === novasPorSessao ? ' selected' : '') + '>' + n + '</option>'; }).join('') + '</select></label></div></section>'
    + '<section class="fx-box" aria-label="Caixas de revisão"><h2>Caixas de revisão</h2><p class="nx-sub">Onde cada ficha está agora. Quanto mais à direita, mais tempo ela fica guardada até a próxima revisão.</p><div class="fx-slots">' + slots + '</div></section></div>'
    + secaoMinhas()
    + '<div class="fx-decks">' + decks + '</div></div>';
  var sel = document.getElementById('fx-novas');
  if(sel) sel.addEventListener('change', function(){ LS.set(FX_NOVAS, +sel.value); });
  view().scrollTop = 0;
};
function secaoMinhas(){
  var l = minhasFichas(), u = {}; fichas().forEach(function(c){ if(c.u) u[c.id] = c; });
  var st = estado(), lim = fimDeHoje(), hoje = 0; Object.keys(u).forEach(function(id){ var x = st[id]; if(!x || x.due <= lim) hoje++; });
  var opts = '<option value="">Sem assunto</option>' + listaDisciplinas().map(function(nome){ return '<optgroup label="' + escH(nome) + '">' + folhas(['', arvoreDe(nome)]).map(function(id){ return '<option value="' + id + '">' + escH(rotulo(id)) + '</option>'; }).join('') + '</optgroup>'; }).join('');
  return '<section class="nx-panel fx-minhas" aria-label="Minhas fichas"><div class="fx-minhas-h"><div><h2>Minhas fichas</h2><p class="nx-sub">Crie fichas com suas palavras. Também dá para criar a partir de um trecho do livro: selecione o texto e toque em <b>+ Ficha</b>.</p></div>'
    + (l.length ? '<button type="button" class="nx-btn primary small" data-fx-scope="u">Revisar minhas fichas (' + hoje + ')</button>' : '') + '</div>'
    + '<details class="fx-nova"' + (l.length ? '' : ' open') + '><summary>Criar ficha</summary><form id="fx-nova-form" class="fx-nova-form">'
    + '<label>Frente (pergunta)<textarea name="f" rows="2" maxlength="600" required placeholder="Ex.: Qual a redução de pena no erro de proibição evitável?"></textarea></label>'
    + '<label>Verso (resposta)<textarea name="v" rows="3" maxlength="1200" required placeholder="Ex.: De 1/6 a 1/3 (CP, art. 21)."></textarea></label>'
    + '<label>Assunto<select name="m">' + opts + '</select></label>'
    + '<div><button type="submit" class="nx-btn primary small">Salvar ficha</button> <span class="fx-nova-msg" role="status" aria-live="polite"></span></div></form></details>'
    + (l.length ? '<ul class="fx-lista">' + l.slice().reverse().map(function(c){ return '<li><div><b>' + escH(c.f) + '</b><span>' + escH(c.v) + '</span>' + (c.m ? '<small>' + escH(rotulo(c.m)) + '</small>' : '') + '</div><button type="button" class="nx-btn small ghost" data-fx-apagar="' + c.id + '" aria-label="Apagar esta ficha">Apagar</button></li>'; }).join('') + '</ul>' : '')
    + '</section>';
}
document.addEventListener('submit', function(e){
  if(e.target.id !== 'fx-nova-form') return; e.preventDefault();
  var f = e.target, c = window.nexoFichas.criar(f.m.value, f.f.value, f.v.value);
  if(c){ window.showFlashcards(); var msg = document.querySelector('.fx-nova-msg'); if(msg) msg.textContent = 'Ficha salva. Ela entra na revisão de hoje.'; var d = document.querySelector('.fx-nova'); if(d) d.open = true; }
});
document.addEventListener('click', function(e){
  var b = e.target.closest && e.target.closest('[data-fx-apagar]'); if(!b) return;
  if(b.dataset.confirma){ window.nexoFichas.remover(b.dataset.fxApagar); window.showFlashcards(); return; }
  b.dataset.confirma = '1'; b.textContent = 'Confirmar'; b.classList.add('perigo');
});
function idsDoEscopo(esc){
  if(esc === 'all') return { rot:'Todas as disciplinas', ids:null };
  if(esc === 'u') return { rot:'Minhas fichas', ids:null, u:true };
  var tipo = esc.slice(0, 1), val = esc.slice(2);
  if(tipo === 'm') return { rot:rotulo(val), sub:disciplinaDe(moduloPorId(val)), ids:conjunto([val]) };
  if(tipo === 'd') return { rot:val, ids:conjunto(folhas(['', arvoreDe(val)])) };
  if(tipo === 'g'){
    var p = val.split('|'), nome = p[0], caminho = p[1].split('/').filter(Boolean), n = ['', arvoreDe(nome)];
    caminho.forEach(function(nomeG){ var f = n[1].find(function(x){ return typeof x !== 'string' && x[0] === nomeG; }); if(f) n = f; });
    return { rot:caminho[caminho.length - 1], sub:nome, ids:conjunto(folhas(n)) };
  }
  return { rot:'Fichas', ids:null };
}
function iniciarSessao(esc, livre){
  var e = idsDoEscopo(esc), st = estado(), agora = Date.now(), lim = fimDeHoje();
  var doEscopo = fichas().filter(function(c){ return (!e.ids || e.ids[c.m]) && (!e.u || c.u); });
  var vencidas = doEscopo.filter(function(c){ var x = st[c.id]; return x && x.due <= lim; }).sort(function(a, b){ return st[a.id].due - st[b.id].due; });
  var novas = doEscopo.filter(function(c){ return !st[c.id]; }).slice(0, LS.get(FX_NOVAS, 20));
  var fila = vencidas.concat(novas);
  if(livre) fila = doEscopo.slice().sort(function(a, b){ return caixa(st, a.id) - caixa(st, b.id); }).slice(0, 30);
  S = { esc:esc, rot:e.rot, sub:e.sub || '', fila:fila.map(function(c){ return c.id; }), i:0, virada:false, res:[0, 0, 0], refeitas:{}, livre:!!livre };
  setCur('flashcards');
  desenharSessao();
}
function fichaPorId(id){ return fichas().find(function(c){ return c.id === id; }); }
function proxima(b, g){
  if(g === 0) return 'volta ainda nesta sessão';
  var dias = g === 1 ? Math.max(.5, INTERVALOS[Math.max(1, b)] / 2) : INTERVALOS[Math.min(5, b + 1)];
  if(dias < 1) return 'volta em 12 horas';
  return 'volta em ' + dias + (dias === 1 ? ' dia' : ' dias');
}
function desenharSessao(){
  if(!S) return;
  var v = view();
  if(S.i >= S.fila.length){
    var feitas = S.res[0] + S.res[1] + S.res[2];
    v.innerHTML = '<div class="nx-page fx-session"><div class="nx-panel fx-end">'
      + (feitas ? '<h2>Sessão concluída</h2><p class="nx-sub" style="margin:0">' + escH(S.rot) + '</p>'
        + '<div class="fx-res"><div style="color:var(--nx-good)">' + S.res[2] + '<small>acertei</small></div><div style="color:var(--nx-warn)">' + S.res[1] + '<small>hesitei</small></div><div style="color:var(--nx-bad)">' + S.res[0] + '<small>errei</small></div></div>'
        : '<h2>Nada para revisar agora</h2><p class="nx-sub">As fichas deste baralho só voltam na data marcada. Você pode estudar livremente mesmo assim.</p>')
      + '<div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">'
      + (feitas ? '' : '<button type="button" class="nx-btn primary" data-fx-livre="' + escH(S.esc) + '">Estudar mesmo assim</button>')
      + '<button type="button" class="nx-btn' + (feitas ? ' primary' : '') + '" onclick="showFlashcards()">Voltar ao fichário</button>'
      + '<button type="button" class="nx-btn" onclick="nexoDesempenho()">Ver desempenho</button></div></div></div>';
    return;
  }
  var c = fichaPorId(S.fila[S.i]); if(!c){ S.i++; return desenharSessao(); }
  var st = estado(), b = caixa(st, c.id), d = discInfo(c.d);
  var pct = Math.round(S.i / S.fila.length * 100), m = moduloPorId(c.m);
  var tab = '<div class="fx-tab"><span><b>' + escH(rotulo(c.m)) + '</b>' + (c.sec ? '<br>' + escH(c.sec) : '') + '</span><span class="fx-tipo">' + escH(c.tipo) + '</span></div>';
  v.innerHTML = '<div class="nx-page fx-session" style="--disc:' + d.cor + '">'
    + '<div class="fx-sbar"><div class="fx-scope">' + escH(S.rot) + '<small>' + (S.sub ? escH(S.sub) + ' · ' : '') + 'ficha ' + (S.i + 1) + ' de ' + S.fila.length + (b ? ' · caixa de ' + RAIA[Math.min(5, b)] : ' · ficha nova') + '</small></div>'
    + '<button type="button" class="nx-btn small" onclick="showFlashcards()">Encerrar</button></div>'
    + '<div class="fx-progress" role="progressbar" aria-valuemin="0" aria-valuemax="' + S.fila.length + '" aria-valuenow="' + S.i + '" aria-label="Progresso da sessão"><i style="width:' + pct + '%"></i></div>'
    + '<div class="fx-card-wrap"><div class="fx-card' + (S.virada ? ' flipped' : '') + '" id="fx-card" role="button" tabindex="0" aria-label="' + (S.virada ? 'Resposta. Clique para ver a pergunta' : 'Pergunta. Clique para ver a resposta') + '">'
    + '<div class="fx-face fx-front" aria-hidden="' + S.virada + '">' + tab + '<div class="fx-text">' + c.f + '</div><div class="fx-hint">Pense na resposta e vire a ficha · <span class="nx-kbd">Espaço</span></div></div>'
    + '<div class="fx-face fx-back" aria-hidden="' + !S.virada + '">' + tab + '<div class="fx-text">' + c.v + '</div><div class="fx-hint">Como foi? <span class="nx-kbd">1</span> errei · <span class="nx-kbd">2</span> hesitei · <span class="nx-kbd">3</span> acertei</div></div>'
    + '</div></div>'
    + (S.virada ? '' : '<button type="button" class="nx-btn primary fx-flipbtn" id="fx-virar">Ver resposta</button>')
    + '<div class="fx-grades"' + (S.virada ? '' : ' hidden') + '>'
    + '<button type="button" class="fx-grade g0" data-fx-g="0"><b>' + I.x + 'Errei</b><small>' + proxima(b, 0) + '</small></button>'
    + '<button type="button" class="fx-grade g1" data-fx-g="1"><b>' + I.wave + 'Hesitei</b><small>' + proxima(b, 1) + '</small></button>'
    + '<button type="button" class="fx-grade g2" data-fx-g="2"><b>' + I.ok + 'Acertei</b><small>' + proxima(b, 2) + '</small></button></div>'
    + '<div class="fx-links"><span>' + escH(m ? m.title : '') + '</span><button type="button" onclick="openModule(\'' + c.m + '\')">Abrir o assunto</button></div></div>';
  var card = document.getElementById('fx-card');
  if(card && !S.virada && document.activeElement === document.body) try{ card.focus({ preventScroll:true }); }catch(e){}
}
function virar(){
  if(!S || S.i >= S.fila.length) return;
  S.virada = !S.virada;
  var card = document.getElementById('fx-card'); if(!card){ desenharSessao(); return; }
  card.classList.toggle('flipped', S.virada);
  card.setAttribute('aria-label', S.virada ? 'Resposta. Clique para ver a pergunta' : 'Pergunta. Clique para ver a resposta');
  $('.fx-front', card).setAttribute('aria-hidden', String(S.virada));
  $('.fx-back', card).setAttribute('aria-hidden', String(!S.virada));
  var gr = document.querySelector('.fx-grades'), vb = document.getElementById('fx-virar');
  if(gr) gr.hidden = !S.virada;
  if(vb) vb.hidden = S.virada;
  if(S.virada){ var g = document.querySelector('.fx-grade.g2'); if(g) try{ g.focus({ preventScroll:true }); }catch(e){} }
}
function avaliar(g){
  if(!S || !S.virada) return;
  var id = S.fila[S.i], c = fichaPorId(id), st = estado(), x = st[id] || { b:0, n:0 }, agora = Date.now();
  if(g === 0){ x.b = 1; x.due = agora; if(!S.refeitas[id]){ S.refeitas[id] = 1; S.fila.push(id); } }
  else if(g === 1){ x.b = Math.max(1, x.b); x.due = agora + Math.max(.5, INTERVALOS[x.b] / 2) * DIA; }
  else { x.b = Math.min(5, x.b + 1); x.due = agora + INTERVALOS[x.b] * DIA; }
  x.n = (x.n || 0) + 1; x.ult = agora; st[id] = x; LS.set(FK, st);
  S.res[g]++; registrar({ k:'f', m:c ? c.m : null, g:g });
  S.i++; S.virada = false; desenharSessao();
}
document.addEventListener('click', function(e){
  var t = e.target.closest ? e.target.closest('[data-fx-scope],[data-fx-g],[data-fx-livre],#fx-virar,#fx-card') : null;
  if(!t) return;
  if(t.dataset.fxScope){ e.preventDefault(); e.stopPropagation(); iniciarSessao(t.dataset.fxScope, false); return; }
  if(t.dataset.fxLivre){ iniciarSessao(t.dataset.fxLivre, true); return; }
  if(t.dataset.fxG != null){ avaliar(+t.dataset.fxG); return; }
  if(t.id === 'fx-virar' || t.id === 'fx-card'){ if(e.target.closest('a,button:not(#fx-virar)')) return; virar(); }
});
document.addEventListener('keydown', function(e){
  if(!S || cur() !== 'flashcards' || !document.getElementById('fx-card')) return;
  if(/INPUT|SELECT|TEXTAREA/.test((e.target.tagName || ''))) return;
  if(e.key === ' ' || e.key === 'Enter'){ if(e.target.closest && e.target.closest('button:not(#fx-virar)')) return; e.preventDefault(); virar(); }
  else if(S.virada && (e.key === '1' || e.key === '2' || e.key === '3')){ e.preventDefault(); avaliar(+e.key - 1); }
  else if(e.key === 'Escape'){ window.showFlashcards(); }
});

/* ======================= desempenho ======================= */
var PERIODOS = [['hoje', 'Hoje'], ['7', '7 dias'], ['30', '30 dias'], ['90', '90 dias'], ['tudo', 'Tudo']];
var periodo = LS.get('nexo_dz_periodo', '30');
function desdeDe(p){
  var hoje = inicioDoDia(Date.now());
  if(p === 'hoje') return hoje;
  if(p === 'tudo') return 0;
  return hoje - (+p - 1) * DIA;
}
function fmtTempo(ms){
  var min = Math.round(ms / 60000);
  if(min < 60) return min + ' min';
  var h = Math.floor(min / 60), r = min % 60;
  return h + ' h' + (r ? ' ' + r + ' min' : '');
}
function sequencia(ev){
  var dias = {}; ev.forEach(function(e){ dias[inicioDoDia(e.t)] = 1; });
  var d = inicioDoDia(Date.now()), n = 0;
  if(!dias[d]) d -= DIA;
  while(dias[d]){ n++; d -= DIA; }
  return n;
}
function caixasDia(desde, ev){
  var hoje = inicioDoDia(Date.now()), ini = desde || (ev.length ? inicioDoDia(ev[0].t) : hoje);
  var nDias = Math.round((hoje - ini) / DIA) + 1;
  if(nDias < 7){ ini = hoje - 6 * DIA; nDias = 7; }
  var passo = nDias > 120 ? 30 : nDias > 45 ? 7 : 1;
  var bins = [];
  for(var t = ini; t <= hoje; t += passo * DIA) bins.push({ ini:t, fim:t + passo * DIA, ok:0, err:0, ms:0, f:0 });
  return { bins:bins, passo:passo };
}
function nomeBin(b, passo){
  var d = new Date(b.ini);
  var dm = String(d.getDate()).padStart(2, '0') + '/' + String(d.getMonth() + 1).padStart(2, '0');
  if(passo === 1) return dm;
  if(passo === 7) return 'semana de ' + dm;
  return ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'][d.getMonth()] + '/' + String(d.getFullYear()).slice(2);
}
function rotuloEixo(b, passo){
  var d = new Date(b.ini);
  if(passo === 30) return ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'][d.getMonth()];
  return String(d.getDate()).padStart(2, '0') + '/' + String(d.getMonth() + 1).padStart(2, '0');
}
function niceMax(v){ if(v <= 4) return 4; var p = Math.pow(10, Math.floor(Math.log10(v))), n = v / p; return (n <= 2 ? 2 : n <= 5 ? 5 : 10) * p; }
/* gráfico de barras (empilhadas ou simples) em SVG, com dica ao passar o mouse.
   Desenhado depois de entrar na página, na largura real do painel, para o texto não encolher. */
var GRAFICOS = {};
function graficoBarras(id, bins, passo, series, fmtVal, tip){
  GRAFICOS[id] = { bins:bins, passo:passo, series:series, fmtVal:fmtVal, tip:tip };
  return '<div class="dz-chart" id="' + id + '"></div>';
}
function desenharGrafico(id){
  var box = document.getElementById(id), cfg = GRAFICOS[id]; if(!box || !cfg) return;
  if(cfg.q) return desenharQuestoes(box, cfg);
  if(cfg.rosca){ if(box.offsetParent !== null) desenharRosca(box, cfg); return; }
  var bins = cfg.bins, passo = cfg.passo, series = cfg.series;
  var W = Math.max(280, Math.round(box.clientWidth || 600)), H = W < 420 ? 190 : 230, L = 34, R = 6, Tp = 10, B = 26, pw = W - L - R, ph = H - Tp - B;
  var tot = bins.map(function(b){ return series.reduce(function(s, se){ return s + se.val(b); }, 0); });
  var max = niceMax(Math.max.apply(null, tot.concat([0])) || 1);
  var bw = pw / bins.length, barW = Math.max(3, Math.min(30, bw * .62));
  var g = '';
  [0, .5, 1].forEach(function(f){
    var y = Tp + ph - f * ph;
    g += '<line class="' + (f === 0 ? 'base' : 'grid') + '" x1="' + L + '" x2="' + (W - R) + '" y1="' + y + '" y2="' + y + '"/>';
    g += '<text class="ax" x="' + (L - 6) + '" y="' + (y + 3.5) + '" text-anchor="end">' + cfg.fmtVal(max * f) + '</text>';
  });
  var cada = Math.max(1, Math.ceil(bins.length / Math.max(2, Math.floor(pw / 58))));
  bins.forEach(function(b, i){
    var x = L + i * bw + (bw - barW) / 2, y = Tp + ph;
    series.forEach(function(se){
      var v = se.val(b); if(!v) return;
      var h = Math.max(2, v / max * ph); y -= h;
      g += '<rect x="' + x.toFixed(1) + '" y="' + y.toFixed(1) + '" width="' + barW.toFixed(1) + '" height="' + Math.max(1, h - 2).toFixed(1) + '" rx="2.5" style="fill:' + se.cor + '"/>';
    });
    var ultimo = i === bins.length - 1;
    if(ultimo || (i % cada === 0 && bins.length - 1 - i >= cada * .7))
      g += '<text class="ax" x="' + (L + i * bw + bw / 2).toFixed(1) + '" y="' + (H - 8) + '" text-anchor="middle">' + rotuloEixo(b, passo) + '</text>';
    g += '<rect data-i="' + i + '" x="' + (L + i * bw).toFixed(1) + '" y="' + Tp + '" width="' + bw.toFixed(1) + '" height="' + ph + '" fill="transparent"/>';
  });
  box.innerHTML = '<svg viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" role="img" aria-label="Gráfico de barras por período">' + g + '</svg><div class="dz-tip" role="status"></div>';
  var svg = box.querySelector('svg'), tipEl = box.querySelector('.dz-tip');
  svg.addEventListener('mousemove', function(e){
    var r = e.target.closest('rect[data-i]'); if(!r){ tipEl.classList.remove('on'); return; }
    var i = +r.dataset.i, br = box.getBoundingClientRect(), rr = r.getBoundingClientRect();
    tipEl.innerHTML = cfg.tip(bins[i], nomeBin(bins[i], passo));
    var x = rr.left - br.left + rr.width / 2; x = Math.min(Math.max(x, 70), br.width - 70);
    tipEl.style.left = x + 'px'; tipEl.style.top = (rr.top - br.top + 8) + 'px';
    tipEl.classList.add('on');
  });
  svg.addEventListener('mouseleave', function(){ tipEl.classList.remove('on'); });
}

/* ---------- gráfico de questões: 5 modelos, com troca ---------- */
var TIPOS_Q = [['barras', 'Barras'], ['linha', 'Linhas'], ['area', 'Área'], ['taxa', 'Taxa de acerto'], ['pizza', 'Pizza']];
var tipoQ = LS.get('nexo_dz_grafico', 'barras');
function graficoQuestoes(bins, passo){
  GRAFICOS['dz-q'] = { q:true, bins:bins, passo:passo };
  return '<div class="dz-switch nx-seg" role="group" aria-label="Modelo do gráfico">' + TIPOS_Q.map(function(t){
      return '<button type="button" data-dzq="' + t[0] + '" aria-pressed="' + (t[0] === tipoQ) + '">' + t[1] + '</button>';
    }).join('') + '</div><div class="dz-legend" id="dz-q-leg"></div><div class="dz-chart" id="dz-q"></div><p class="dz-cap" id="dz-q-cap"></p>';
}
window.nexoGraficoQ = function(t){
  tipoQ = t; LS.set('nexo_dz_grafico', t);
  $$('[data-dzq]').forEach(function(b){ b.setAttribute('aria-pressed', String(b.dataset.dzq === t)); });
  desenharGrafico('dz-q');
};
document.addEventListener('click', function(e){ var b = e.target.closest && e.target.closest('[data-dzq]'); if(b) window.nexoGraficoQ(b.dataset.dzq); });
function legendaQ(tipo){
  if(tipo === 'pizza') return '';
  if(tipo === 'taxa') return '<span><i style="background:var(--nx-accent)"></i>Taxa de acerto</span><span><i class="dz-dash"></i>Nota mínima da PC-BA (70%)</span>';
  return '<span><i style="background:' + QC().ok[0] + '"></i>Acertei</span><span><i style="background:' + QC().err[0] + '"></i>Errei</span>';
}
/* cores do gráfico de questões (azul = acertei, vermelho = errei), como na referência */
function QC(){ return temaAtual() === 'dark' ? { ok:['#4a9df0', '#2f7fd6'], err:['#f0506a', '#c93a52'] } : { ok:['#2f84e0', '#1f6cc4'], err:['#e0435c', '#bd2f47'] }; }
/* curva suave que não passa do valor real (interpolação monotônica de Fritsch–Carlson) */
function curva(pts){
  var n = pts.length; if(n < 2) return n ? 'M' + pts[0][0].toFixed(1) + ' ' + pts[0][1].toFixed(1) : '';
  var dx = [], m = [], t = [];
  for(var i = 0; i < n - 1; i++){ dx[i] = pts[i + 1][0] - pts[i][0]; m[i] = (pts[i + 1][1] - pts[i][1]) / dx[i]; }
  t[0] = m[0]; t[n - 1] = m[n - 2];
  for(i = 1; i < n - 1; i++) t[i] = m[i - 1] * m[i] <= 0 ? 0 : (m[i - 1] + m[i]) / 2;
  for(i = 0; i < n - 1; i++){
    if(m[i] === 0){ t[i] = 0; t[i + 1] = 0; continue; }
    var al = t[i] / m[i], be = t[i + 1] / m[i], h = al * al + be * be;
    if(h > 9){ var k = 3 / Math.sqrt(h); t[i] = k * al * m[i]; t[i + 1] = k * be * m[i]; }
  }
  var d = 'M' + pts[0][0].toFixed(1) + ' ' + pts[0][1].toFixed(1);
  for(i = 0; i < n - 1; i++){
    var c = dx[i] / 3;
    d += ' C' + (pts[i][0] + c).toFixed(1) + ' ' + (pts[i][1] + t[i] * c).toFixed(1) + ' ' + (pts[i + 1][0] - c).toFixed(1) + ' ' + (pts[i + 1][1] - t[i + 1] * c).toFixed(1) + ' ' + pts[i + 1][0].toFixed(1) + ' ' + pts[i + 1][1].toFixed(1);
  }
  return d;
}
function eixoX(bins, passo, L, bw, H, pw){
  var g = '', cada = Math.max(1, Math.ceil(bins.length / Math.max(2, Math.floor(pw / 58))));
  bins.forEach(function(b, i){
    if(i === bins.length - 1 || (i % cada === 0 && bins.length - 1 - i >= cada * .7))
      g += '<text class="ax" x="' + (L + i * bw + bw / 2).toFixed(1) + '" y="' + (H - 8) + '" text-anchor="middle">' + rotuloEixo(b, passo) + '</text>';
  });
  return g;
}
function grade(L, R, W, Tp, ph, max, fmt){
  var g = '';
  [0, .5, 1].forEach(function(f){
    var y = Tp + ph - f * ph;
    g += '<line class="' + (f === 0 ? 'base' : 'grid') + '" x1="' + L + '" x2="' + (W - R) + '" y1="' + y + '" y2="' + y + '"/>';
    g += '<text class="ax" x="' + (L - 6) + '" y="' + (y + 3.5) + '" text-anchor="end">' + fmt(max * f) + '</text>';
  });
  return g;
}
function dicaQ(b, nome){ var t = b.ok + b.err; return '<b>' + nome + '</b><br>' + b.ok + ' acertos · ' + b.err + ' erros' + (t ? '<br>' + Math.round(b.ok / t * 100) + '% de acerto' : '<br>sem questões'); }
function ligarDica(box, alvo, texto){
  var svg = box.querySelector('svg'), tipEl = box.querySelector('.dz-tip'), xh = box.querySelector('.xh');
  svg.addEventListener('mousemove', function(e){
    var r = e.target.closest(alvo); if(!r){ tipEl.classList.remove('on'); if(xh) xh.style.opacity = 0; return; }
    var br = box.getBoundingClientRect(), rr = r.getBoundingClientRect();
    tipEl.innerHTML = texto(r);
    var x = (r.dataset.tx ? +r.dataset.tx * br.width / +svg.getAttribute('width') : rr.left - br.left + rr.width / 2);
    var y = (r.dataset.ty ? +r.dataset.ty * br.width / +svg.getAttribute('width') : rr.top - br.top + 8);
    tipEl.style.left = Math.min(Math.max(x, 80), br.width - 80) + 'px'; tipEl.style.top = y + 'px';
    tipEl.classList.add('on');
    if(xh && r.dataset.cx){ xh.setAttribute('x1', r.dataset.cx); xh.setAttribute('x2', r.dataset.cx); xh.style.opacity = 1; }
  });
  svg.addEventListener('mouseleave', function(){ tipEl.classList.remove('on'); if(xh) xh.style.opacity = 0; });
}
function desenharQuestoes(box, cfg){
  var bins = cfg.bins, passo = cfg.passo, tipo = tipoQ;
  var leg = document.getElementById('dz-q-leg'), cap = document.getElementById('dz-q-cap');
  if(leg) leg.innerHTML = legendaQ(tipo);
  var W = Math.max(280, Math.round(box.clientWidth || 600)), H = W < 420 ? 210 : 250, L = 36, R = 8, Tp = 12, B = 26, pw = W - L - R, ph = H - Tp - B;
  var bw = pw / bins.length, g = '', okT = 0, errT = 0;
  bins.forEach(function(b){ okT += b.ok; errT += b.err; });
  var cxs = bins.map(function(b, i){ return L + i * bw + bw / 2; });
  var hits = function(){ return bins.map(function(b, i){ return '<rect class="hit" data-i="' + i + '" data-cx="' + cxs[i].toFixed(1) + '" x="' + (L + i * bw).toFixed(1) + '" y="' + Tp + '" width="' + bw.toFixed(1) + '" height="' + ph + '" fill="transparent"/>'; }).join(''); };
  var fim = function(svgInner, h){
    box.innerHTML = '<svg viewBox="0 0 ' + W + ' ' + (h || H) + '" width="' + W + '" height="' + (h || H) + '" role="img" aria-label="Gráfico de questões: ' + okT + ' acertos e ' + errT + ' erros no período">' + svgInner + '</svg><div class="dz-tip" role="status"></div>';
  };
  if(cap) cap.textContent = '';

  if(tipo === 'pizza'){
    /* rosca de acertos x erros, no estilo da imagem de referência: anel largo com degradê,
       percentuais sobre o anel, legenda no canto e o total no centro */
    var tot = okT + errT, H2 = W < 420 ? 250 : 300;
    var cx = W < 420 ? W / 2 : Math.min(W * .45, W - 190), cy = H2 / 2 + 4, Re = Math.min(H2 / 2 - 14, W < 420 ? W / 2 - 16 : 140), Ri = Re * .64;
    var fatias = [{ n:okT, c:QC().ok, nome:'Acertei' }, { n:errT, c:QC().err, nome:'Errei' }].filter(function(f){ return f.n; });
    var defs = '<defs>' + fatias.map(function(f, k){ return '<linearGradient id="pzg' + k + '" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="' + f.c[0] + '"/><stop offset="1" stop-color="' + f.c[1] + '"/></linearGradient>'; }).join('') + '</defs>';
    var Pp = function(ang, rad){ return (cx + rad * Math.sin(ang)).toFixed(2) + ' ' + (cy - rad * Math.cos(ang)).toFixed(2); };
    var a = 0, partes = '', rot = '';
    fatias.forEach(function(f, k){
      var ang = f.n / tot * Math.PI * 2, a2 = a + ang;
      var d = fatias.length === 1
        ? 'M' + Pp(0, Re) + ' A' + Re + ' ' + Re + ' 0 1 1 ' + Pp(Math.PI, Re) + ' A' + Re + ' ' + Re + ' 0 1 1 ' + Pp(0, Re) + ' Z M' + Pp(0, Ri) + ' A' + Ri + ' ' + Ri + ' 0 1 0 ' + Pp(Math.PI, Ri) + ' A' + Ri + ' ' + Ri + ' 0 1 0 ' + Pp(0, Ri) + ' Z'
        : 'M' + Pp(a, Re) + ' A' + Re + ' ' + Re + ' 0 ' + (ang > Math.PI ? 1 : 0) + ' 1 ' + Pp(a2, Re) + ' L' + Pp(a2, Ri) + ' A' + Ri + ' ' + Ri + ' 0 ' + (ang > Math.PI ? 1 : 0) + ' 0 ' + Pp(a, Ri) + ' Z';
      var meio = (a + a2) / 2, rm = (Re + Ri) / 2, tx = cx + rm * Math.sin(meio), ty = cy - rm * Math.cos(meio);
      partes += '<path class="pz" fill-rule="evenodd" data-k="' + k + '" data-tx="' + tx.toFixed(1) + '" data-ty="' + ty.toFixed(1) + '" d="' + d + '" style="fill:url(#pzg' + k + ')"/>';
      if(ang > .35) rot += '<text class="pz-pct" x="' + tx.toFixed(1) + '" y="' + (ty + 4).toFixed(1) + '" text-anchor="middle">' + (f.n / tot * 100).toFixed(1).replace('.', ',') + '%</text>';
      a = a2;
    });
    var centro = '<text class="pz-big" x="' + cx + '" y="' + (cy + 6) + '" text-anchor="middle">' + Math.round(okT / tot * 100) + '%</text><text class="ax" x="' + cx + '" y="' + (cy + 26) + '" text-anchor="middle">de acerto · ' + tot + ' questões</text>';
    var lg = W >= 420 ? fatias.map(function(f, k){ var y = 34 + k * 24, x = W - 120; return '<circle cx="' + x + '" cy="' + y + '" r="7" style="fill:' + f.c[0] + '"/><text class="pz-l" x="' + (x + 13) + '" y="' + (y + 4.5) + '">' + f.nome + ' <tspan class="pz-n">' + f.n + '</tspan></text>'; }).join('') : '';
    fim(defs + partes + rot + centro + lg, H2);
    ligarDica(box, '.pz', function(el){ var f = fatias[+el.dataset.k]; return '<b>' + f.nome + '</b><br>' + f.n + ' de ' + tot + ' questões (' + (f.n / tot * 100).toFixed(1).replace('.', ',') + '%)'; });
    if(cap) cap.textContent = 'Total do período: ' + okT + ' acertos e ' + errT + ' erros. ' + (okT / tot >= .7 ? 'Acima' : 'Abaixo') + ' dos 70% exigidos na PC-BA.';
    return;
  }

  if(tipo === 'taxa'){
    var pts = [], dots = '';
    bins.forEach(function(b, i){ var t = b.ok + b.err; if(t) pts.push([cxs[i], Tp + ph - (b.ok / t) * ph, i, Math.round(b.ok / t * 100)]); });
    g += grade(L, R, W, Tp, ph, 100, function(v){ return Math.round(v) + '%'; });
    var y70 = Tp + ph - .7 * ph;
    g += '<line class="ref" x1="' + L + '" x2="' + (W - R) + '" y1="' + y70 + '" y2="' + y70 + '"/><text class="ax ref-t" x="' + (W - R) + '" y="' + (y70 - 5) + '" text-anchor="end">70%</text>';
    g += '<line class="xh" x1="0" x2="0" y1="' + Tp + '" y2="' + (Tp + ph) + '"/>';
    if(pts.length > 1) g += '<path class="ln" d="M' + pts.map(function(p){ return p[0].toFixed(1) + ' ' + p[1].toFixed(1); }).join(' L') + '" style="stroke:var(--nx-accent)"/>';
    pts.forEach(function(p){ dots += '<circle cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="4" class="dt" style="fill:' + (p[3] >= 70 ? 'var(--nx-accent)' : 'var(--nx-bad)') + '"/>'; });
    fim(g + dots + eixoX(bins, passo, L, bw, H, pw) + hits());
    ligarDica(box, '.hit', function(el){ return dicaQ(bins[+el.dataset.i], nomeBin(bins[+el.dataset.i], passo)); });
    var acima = pts.filter(function(p){ return p[3] >= 70; }).length;
    if(cap) cap.textContent = pts.length ? acima + ' de ' + pts.length + ' ' + (passo === 1 ? 'dias' : 'períodos') + ' ficaram em 70% ou mais. Pontos vermelhos ficaram abaixo.' : '';
    return;
  }

  var tot2 = bins.map(function(b){ return tipo === 'barras' ? b.ok + b.err : Math.max(b.ok, b.err); });
  var max = niceMax(Math.max.apply(null, tot2.concat([0])) || 1);
  var Y = function(v){ return Tp + ph - v / max * ph; };
  g += grade(L, R, W, Tp, ph, max, function(v){ return Math.round(v); });

  if(tipo === 'barras'){
    var barW = Math.max(3, Math.min(30, bw * .62));
    bins.forEach(function(b, i){
      var x = L + i * bw + (bw - barW) / 2, y = Tp + ph;
      [[b.ok, QC().ok[0]], [b.err, QC().err[0]]].forEach(function(sv){
        if(!sv[0]) return; var h = Math.max(2, sv[0] / max * ph); y -= h;
        g += '<rect x="' + x.toFixed(1) + '" y="' + y.toFixed(1) + '" width="' + barW.toFixed(1) + '" height="' + Math.max(1, h - 2).toFixed(1) + '" rx="2.5" style="fill:' + sv[1] + '"/>';
      });
    });
  }else if(tipo === 'linha' || tipo === 'area'){
    /* duas curvas suaves sobrepostas (acertei e errei), não empilhadas, como na referência;
       em "Área" cada curva ganha um degradê que some em direção à base */
    var base = Tp + ph, cc = QC(), defs = '<defs>';
    [['ok', cc.ok[0]], ['err', cc.err[0]]].forEach(function(sv){
      defs += '<linearGradient id="qg-' + sv[0] + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + sv[1] + '" stop-opacity="' + (sv[0] === 'ok' ? .55 : .6) + '"/><stop offset="1" stop-color="' + sv[1] + '" stop-opacity="0"/></linearGradient>';
    });
    g = defs + '</defs>' + g + '<line class="xh" x1="0" x2="0" y1="' + Tp + '" y2="' + base + '"/>';
    [['ok', cc.ok[0]], ['err', cc.err[0]]].forEach(function(sv){
      var pts = bins.map(function(b, i){ return [cxs[i], Y(b[sv[0]])]; }), d = curva(pts);
      if(tipo === 'area') g += '<path d="' + d + ' L' + cxs[cxs.length - 1].toFixed(1) + ' ' + base + ' L' + cxs[0].toFixed(1) + ' ' + base + ' Z" style="fill:url(#qg-' + sv[0] + ')"/>';
      g += '<path class="ln" d="' + d + '" style="stroke:' + sv[1] + ';stroke-width:' + (tipo === 'area' ? 2 : 2.4) + '"/>';
      if(tipo === 'linha' && bins.length <= 20) pts.forEach(function(p){ g += '<circle cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="3.5" class="dt" style="fill:' + sv[1] + '"/>'; });
    });
  }
  fim(g + eixoX(bins, passo, L, bw, H, pw) + hits());
  ligarDica(box, '.hit', function(el){ return dicaQ(bins[+el.dataset.i], nomeBin(bins[+el.dataset.i], passo)); });
}

/* ---------- rosca 3D: quantidade de questões por disciplina ---------- */
var vistaDisc = LS.get('nexo_dz_disc_vista', 'tabela');
window.nexoVistaDisc = function(v){
  vistaDisc = v; LS.set('nexo_dz_disc_vista', v);
  $$('[data-dzv]').forEach(function(b){ b.setAttribute('aria-pressed', String(b.dataset.dzv === v)); });
  var t = document.getElementById('dz-vt'), r = document.getElementById('dz-vr');
  if(t) t.hidden = v !== 'tabela';
  var sub = document.getElementById('dz-dsub'); if(sub) sub.textContent = v === 'rosca' ? 'Quantas questões você fez em cada disciplina.' : 'Clique na disciplina para ver os assuntos e no assunto para abrir o módulo.';
  if(r){ r.hidden = v !== 'rosca'; if(v === 'rosca') desenharGrafico('dz-d'); }
};
document.addEventListener('click', function(e){ var b = e.target.closest && e.target.closest('[data-dzv]'); if(b) window.nexoVistaDisc(b.dataset.dzv); });
function escurecer(hex, f){
  var m = /^#?([0-9a-f]{6})$/i.exec(hex); if(!m) return hex;
  var n = parseInt(m[1], 16), r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  return 'rgb(' + Math.round(r * f) + ',' + Math.round(g * f) + ',' + Math.round(b * f) + ')';
}
function corDisc(nome){
  var escuro = temaAtual() === 'dark';
  var mapa = { 'Direito Constitucional':['#2a78d6', '#3987e5'], 'Direito Administrativo':['#eb6834', '#d95926'], 'Medicina Legal':['#6250d6', '#9085e9'], 'Direito Penal':['#1baf7a', '#199e70'] };
  var c = mapa[nome]; return c ? c[escuro ? 1 : 0] : (escuro ? '#8e8e96' : '#8a9694');
}
function desenharRosca(box, cfg){
  var dados = cfg.dados.filter(function(d){ return d.n > 0; }), tot = dados.reduce(function(s, d){ return s + d.n; }, 0);
  if(!tot){ box.innerHTML = ''; return; }
  var W = Math.max(300, Math.round(box.clientWidth || 600)), estreito = W < 520;
  var R = Math.min(estreito ? W * .36 : W * .24, 150), k = .5, r = R * .52, maxH = R * .42, minH = R * .14;
  var H = Math.round(R * k * 2 + maxH + (estreito ? 60 : 100)), cx = W / 2, cy = 40 + maxH + R * k;
  var maxN = Math.max.apply(null, dados.map(function(d){ return d.n; }));
  var P = function(a, rad, y0){ return [cx + rad * Math.cos(a), y0 + rad * k * Math.sin(a)]; };
  var f2 = function(p){ return p[0].toFixed(1) + ' ' + p[1].toFixed(1); };
  var arc = function(rad, a1, a2, y0, dir){ return 'A' + rad + ' ' + (rad * k) + ' 0 ' + (Math.abs(a2 - a1) > Math.PI ? 1 : 0) + ' ' + dir + ' ' + f2(P(a2, rad, y0)); };
  function cortes(b1, b2, lo, hi){ /* partes de [b1,b2] dentro de [lo,hi] (+2π) */
    var res = [];
    for(var t = -1; t <= 2; t++){ var a = Math.max(b1, lo + t * 2 * Math.PI), b = Math.min(b2, hi + t * 2 * Math.PI); if(b > a) res.push([a, b]); }
    return res;
  }
  var a = -Math.PI / 2, segs = [];
  dados.forEach(function(d){
    var ang = d.n / tot * Math.PI * 2, gap = dados.length > 1 ? .025 : 0;
    var h = minH + (maxH - minH) * Math.sqrt(d.n / maxN);
    segs.push({ d:d, b1:a + gap, b2:a + ang - gap, meio:a + ang / 2, h:h, cor:corDisc(d.nome) });
    a += ang;
  });
  var ordem = segs.slice().sort(function(x, y){ return Math.sin(x.meio) - Math.sin(y.meio); });
  var g = '<ellipse cx="' + cx + '" cy="' + (cy + R * k * .25) + '" rx="' + (R * 1.02) + '" ry="' + (R * k * .95) + '" class="pz-sh"/>';
  ordem.forEach(function(s, idx){
    var yT = cy - s.h, base = /^#/.test(s.cor) ? s.cor : '#8a9694', lado = escurecer(base, .72), dentro = escurecer(base, .55), corte = escurecer(base, .62);
    var partes = '';
    /* parede interna (aparece no fundo do furo) */
    cortes(s.b1, s.b2, Math.PI, 2 * Math.PI).forEach(function(c){
      partes += '<path d="M' + f2(P(c[0], r, yT)) + ' ' + arc(r, c[0], c[1], yT, 1) + ' L' + f2(P(c[1], r, cy)) + ' ' + arc(r, c[1], c[0], cy, 0) + ' Z" style="fill:' + dentro + '"/>';
    });
    /* faces do corte */
    [s.b1, s.b2].forEach(function(bb){
      partes += '<path d="M' + f2(P(bb, r, yT)) + ' L' + f2(P(bb, R, yT)) + ' L' + f2(P(bb, R, cy)) + ' L' + f2(P(bb, r, cy)) + ' Z" style="fill:' + corte + '"/>';
    });
    /* parede externa (frente) */
    cortes(s.b1, s.b2, 0, Math.PI).forEach(function(c){
      partes += '<path d="M' + f2(P(c[0], R, yT)) + ' ' + arc(R, c[0], c[1], yT, 1) + ' L' + f2(P(c[1], R, cy)) + ' ' + arc(R, c[1], c[0], cy, 0) + ' Z" style="fill:' + lado + '"/>';
    });
    /* topo */
    var pct = Math.round(s.d.n / tot * 100), ti = segs.indexOf(s);
    partes += '<path class="rs" data-k="' + ti + '" data-tx="' + P(s.meio, (R + r) / 2, yT)[0].toFixed(1) + '" data-ty="' + P(s.meio, (R + r) / 2, yT)[1].toFixed(1) + '" d="M' + f2(P(s.b1, r, yT)) + ' L' + f2(P(s.b1, R, yT)) + ' ' + arc(R, s.b1, s.b2, yT, 1) + ' L' + f2(P(s.b2, r, yT)) + ' ' + arc(r, s.b2, s.b1, yT, 0) + ' Z" style="fill:' + base + '"/>';
    g += '<g>' + partes + '</g>';
  });
  /* rótulos com linha de chamada, como num infográfico */
  var rot = '';
  if(!estreito) segs.forEach(function(s){
    var yT = cy - s.h, p0 = P(s.meio, R, yT), dirx = Math.cos(s.meio) >= 0 ? 1 : -1;
    var yL = Math.sin(s.meio) < 0 ? Math.min(p0[1] - 14, cy - maxH - 6) : Math.max(p0[1] + 14, cy + R * k + 22);
    if(estreito) yL = Math.sin(s.meio) < 0 ? p0[1] - 18 : Math.max(p0[1] + 22, cy + R * k + 26);
    var xL = estreito ? p0[0] + dirx * 14 : cx + dirx * (R + 40), xT = estreito ? xL : xL + dirx * 6;
    var pct = Math.round(s.d.n / tot * 100), anc = dirx > 0 ? 'start' : 'end';
    rot += '<path class="rs-lead" d="M' + f2(p0) + ' L' + xL.toFixed(1) + ' ' + yL.toFixed(1) + (estreito ? '' : ' L' + (xL + dirx * 4).toFixed(1) + ' ' + yL.toFixed(1)) + '" style="stroke:' + s.cor + '"/><circle cx="' + p0[0].toFixed(1) + '" cy="' + p0[1].toFixed(1) + '" r="3" style="fill:' + s.cor + '"/>';
    rot += '<text class="pz-l" x="' + xT.toFixed(1) + '" y="' + (yL - 4).toFixed(1) + '" text-anchor="' + anc + '"><tspan class="rs-n">' + s.d.n + '</tspan><tspan dx="5">' + pct + '%</tspan><tspan x="' + xT.toFixed(1) + '" dy="15">' + escH(s.d.nome) + '</tspan></text>';
  });
  var centro = '<text x="' + (estreito ? 8 : 4) + '" y="18" class="pz-l"><tspan class="rs-n">' + tot + '</tspan><tspan dx="6">questões no período</tspan></text>';
  box.innerHTML = '<svg viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" role="img" aria-label="Rosca 3D com a quantidade de questões por disciplina">' + g + centro + rot + '</svg><div class="dz-tip" role="status"></div>'
    + (estreito ? '<div class="rs-leg">' + segs.map(function(sg){ return '<span><i style="background:' + sg.cor + '"></i>' + escH(sg.d.nome) + ' <b>' + sg.d.n + '</b> <small>' + Math.round(sg.d.n / tot * 100) + '%</small></span>'; }).join('') + '</div>' : '');
  ligarDica(box, '.rs', function(el){ var s = segs[+el.dataset.k]; return '<b>' + escH(s.d.nome) + '</b><br>' + s.d.n + ' questões (' + Math.round(s.d.n / tot * 100) + '% do total)<br>' + s.d.ok + ' acertos · ' + (s.d.n - s.d.ok) + ' erros'; });
}
function desenharGraficos(){ Object.keys(GRAFICOS).forEach(desenharGrafico); }
var redimT = null;
window.addEventListener('resize', function(){ if(cur() !== 'desempenho') return; clearTimeout(redimT); redimT = setTimeout(desenharGraficos, 120); });

var dzAbertas = LS.get('nexo_dz_abertas', {});
document.addEventListener('click', function(e){
  var b = e.target.closest && (e.target.closest('[data-dztog]') || ((e.target.closest('tr.disc') || {}).querySelector || function(){ return null; }).call(e.target.closest('tr.disc'), '[data-dztog]')); if(!b) return;
  var k = b.dataset.dztog, abrir = b.getAttribute('aria-expanded') !== 'true';
  b.setAttribute('aria-expanded', String(abrir));
  $$('tr[data-dzg="' + k + '"]').forEach(function(tr){ tr.hidden = !abrir; });
  if(abrir) dzAbertas[k] = 1; else delete dzAbertas[k];
  LS.set('nexo_dz_abertas', dzAbertas);
});
window.nexoDesempenho = function(p){
  GRAFICOS = {};
  if(p) { periodo = p; LS.set('nexo_dz_periodo', p); }
  fecharMenuMovel(); setCur('desempenho');
  try{ renderNav(); }catch(e){}
  setHead('Meu desempenho');
  var todos = eventos(), desde = desdeDe(periodo);
  var ev = todos.filter(function(e){ return e.t >= desde; });
  var q = ev.filter(function(e){ return e.k === 'q'; }), f = ev.filter(function(e){ return e.k === 'f'; }), tm = ev.filter(function(e){ return e.k === 't'; });
  var ok = q.filter(function(e){ return e.ok; }).length, err = q.length - ok;
  var pct = q.length ? Math.round(ok / q.length * 100) : null;
  var fg = [0, 0, 0]; f.forEach(function(e){ if(e.g >= 0 && e.g <= 2) fg[e.g]++; });
  var ms = tm.reduce(function(s, e){ return s + (e.ms || 0); }, 0);
  var seq = sequencia(todos);

  var cx = caixasDia(desde, todos.filter(function(e){ return e.t >= desde; }));
  ev.forEach(function(e){
    var b = cx.bins.find(function(x){ return e.t >= x.ini && e.t < x.fim; }); if(!b) return;
    if(e.k === 'q'){ if(e.ok) b.ok++; else b.err++; }
    else if(e.k === 't') b.ms += e.ms || 0;
    else if(e.k === 'f') b.f++;
  });

  var seg = '<div class="nx-seg" role="group" aria-label="Período">' + PERIODOS.map(function(x){ return '<button type="button" aria-pressed="' + (x[0] === periodo) + '" onclick="nexoDesempenho(\'' + x[0] + '\')">' + x[1] + '</button>'; }).join('') + '</div>';
  var stats = '<div class="dz-stats">'
    + '<div class="dz-stat"><div class="v">' + q.length + '</div><div class="k">Questões respondidas</div><div class="d">' + ok + ' acertos · ' + err + ' erros</div></div>'
    + '<div class="dz-stat"><div class="v">' + (pct == null ? '—' : pct + '%') + '</div><div class="k">Taxa de acerto</div>' + (q.length ? '<div class="dz-rate" aria-hidden="true"><i style="width:' + pct + '%;background:var(--nx-good)"></i><i style="width:' + (100 - pct) + '%;background:var(--nx-bad)"></i></div>' : '<div class="d">Sem questões no período</div>') + '</div>'
    + '<div class="dz-stat"><div class="v">' + f.length + '</div><div class="k">Fichas revisadas</div><div class="d">' + fg[2] + ' acertei · ' + fg[1] + ' hesitei · ' + fg[0] + ' errei</div></div>'
    + '<div class="dz-stat"><div class="v">' + (ms ? fmtTempo(ms) : '0 min') + '</div><div class="k">Tempo cronometrado</div><div class="d">' + (seq ? 'Sequência de ' + seq + (seq === 1 ? ' dia' : ' dias') + ' com estudo' : 'Use o cronômetro do topo para medir') + '</div></div></div>';

  var gQ = q.length ? graficoQuestoes(cx.bins, cx.passo)
    : '<div class="nx-empty"><b>Nenhuma questão respondida neste período</b>Responda questões dentro dos módulos ou em Praticar questões e o resultado aparece aqui.<br><button type="button" class="nx-btn primary" onclick="openLibrary(\'quest\')">Praticar questões</button></div>';
  var gT = ms ? graficoBarras('dz-t', cx.bins, cx.passo, [{ cor:'var(--nx-accent)', val:function(b){ return b.ms / 60000; } }],
      function(v){ return v >= 60 ? Math.round(v / 60) + 'h' : Math.round(v) + 'm'; },
      function(b, nome){ return '<b>' + nome + '</b><br>' + (b.ms ? fmtTempo(b.ms) : 'sem registro'); })
    : '<div class="nx-empty"><b>Nenhum tempo registrado</b>Ligue o cronômetro no topo da página enquanto estuda. Cada período cronometrado entra aqui.</div>';

  /* tabela por disciplina e assunto */
  var porMod = {};
  q.forEach(function(e){ var r = porMod[e.m] = porMod[e.m] || { ok:0, err:0 }; if(e.ok) r.ok++; else r.err++; });
  var linhas = '';
  listaDisciplinas().forEach(function(nome){
    var d = discInfo(nome), ids = folhas(['', arvoreDe(nome)]).filter(function(id){ return porMod[id]; });
    if(!ids.length) return;
    var a = ids.reduce(function(s, id){ s.ok += porMod[id].ok; s.err += porMod[id].err; return s; }, { ok:0, err:0 });
    var dk = d.id, aberto = !!dzAbertas[dk];
    var linha = function(cls, nomeL, r, id){
      var t = r.ok + r.err, p = Math.round(r.ok / t * 100), nome1;
      if(cls === 'disc') nome1 = '<button type="button" class="dz-toggle" data-dztog="' + dk + '" aria-expanded="' + aberto + '" aria-controls="dzg-' + dk + '"><span class="nx-caret"></span>' + escH(nomeL) + ' <small>' + ids.length + (ids.length === 1 ? ' assunto' : ' assuntos') + '</small></button>';
      else nome1 = '<button type="button" class="lk" onclick="openModule(\'' + id + '\')">' + escH(nomeL) + '</button>';
      return '<tr class="' + cls + '"' + (cls === 'disc' ? ' style="--disc:' + d.cor + '"' : ' data-dzg="' + dk + '"' + (aberto ? '' : ' hidden')) + '><td>' + nome1 + '</td>'
        + '<td class="n">' + t + '</td><td class="n dz-hide-sm">' + r.ok + '</td><td class="n dz-hide-sm">' + r.err + '</td><td class="n"><span class="dz-pct">' + p + '%</span></td>'
        + '<td style="width:24%"><div class="dz-bar" role="img" aria-label="' + p + '% de acerto"><i style="width:' + p + '%;background:var(--nx-good)"></i><i style="width:' + (100 - p) + '%;background:var(--nx-bad)"></i></div></td></tr>';
    };
    linhas += linha('disc', nome, a);
    ids.sort(function(x, y){ return (porMod[y].ok + porMod[y].err) - (porMod[x].ok + porMod[x].err); }).forEach(function(id){ linhas += linha('mod', rotulo(id), porMod[id], id); });
  });
  var semDisc = Object.keys(porMod).filter(function(id){ return !moduloPorId(id); });
  if(semDisc.length){
    var a2 = semDisc.reduce(function(s, id){ s.ok += porMod[id].ok; s.err += porMod[id].err; return s; }, { ok:0, err:0 });
    var t2 = a2.ok + a2.err, p2 = Math.round(a2.ok / t2 * 100);
    linhas += '<tr class="disc"><td>Banco de questões (outros assuntos)</td><td class="n">' + t2 + '</td><td class="n dz-hide-sm">' + a2.ok + '</td><td class="n dz-hide-sm">' + a2.err + '</td><td class="n"><span class="dz-pct">' + p2 + '%</span></td><td><div class="dz-bar"><i style="width:' + p2 + '%;background:var(--nx-good)"></i><i style="width:' + (100 - p2) + '%;background:var(--nx-bad)"></i></div></td></tr>';
  }
  var porDisc = listaDisciplinas().map(function(nome){
    var ids = folhas(['', arvoreDe(nome)]), r = { nome:nome, n:0, ok:0 };
    ids.forEach(function(id){ if(porMod[id]){ r.n += porMod[id].ok + porMod[id].err; r.ok += porMod[id].ok; } });
    return r;
  });
  var outros = Object.keys(porMod).filter(function(id){ return !moduloPorId(id); }).reduce(function(r, id){ r.n += porMod[id].ok + porMod[id].err; r.ok += porMod[id].ok; return r; }, { nome:'Outros assuntos', n:0, ok:0 });
  if(outros.n) porDisc.push(outros);
  GRAFICOS['dz-d'] = { rosca:true, dados:porDisc };
  var tabela = linhas ? '<div class="dz-tablewrap"><table class="dz-table"><thead><tr><th>Disciplina e assunto</th><th class="n">Total</th><th class="n dz-hide-sm">Acertos</th><th class="n dz-hide-sm">Erros</th><th class="n">Acerto</th><th><span class="sr-only">Proporção</span></th></tr></thead><tbody>' + linhas + '</tbody></table></div>'
    : '<div class="nx-empty">A tabela aparece quando houver questões respondidas no período.</div>';

  var fracos = Object.keys(porMod).filter(function(id){ var r = porMod[id]; return moduloPorId(id) && r.ok + r.err >= 3; })
    .map(function(id){ var r = porMod[id]; return { id:id, t:r.ok + r.err, p:Math.round(r.ok / (r.ok + r.err) * 100) }; })
    .sort(function(a, b){ return a.p - b.p || b.t - a.t; }).slice(0, 5);
  var foco = fracos.length ? '<div class="dz-focus">' + fracos.map(function(x){
      return '<div class="dz-focus-row"><span><b>' + escH(rotulo(x.id)) + '</b><small>' + escH(disciplinaDe(moduloPorId(x.id))) + ' · ' + x.t + ' questões</small></span><span class="dz-pct">' + x.p + '%</span><button type="button" class="nx-btn small" onclick="openModule(\'' + x.id + '\')">Revisar</button></div>';
    }).join('') + '</div>'
    : '<div class="nx-empty">Com pelo menos 3 questões respondidas em um assunto, os de menor acerto aparecem aqui.</div>';

  var rf = resumoFichas(null), mx = Math.max.apply(null, rf.caixas.concat([1]));
  var fichMini = '<div style="display:grid;gap:7px">' + rf.caixas.map(function(n, i){
      return '<div style="display:grid;grid-template-columns:62px 1fr 42px;gap:8px;align-items:center;font-size:12px;color:var(--nx-ink-2)"><span>' + RAIA[i] + '</span><span style="height:8px;border-radius:4px;background:var(--nx-surface-2);overflow:hidden"><i style="display:block;height:100%;width:' + (n / mx * 100) + '%;background:var(--nx-accent);border-radius:4px"></i></span><b style="text-align:right;color:var(--nx-ink)">' + n + '</b></div>';
    }).join('') + '</div><div style="margin-top:14px;display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap"><span class="nx-sub" style="margin:0">' + rf.hoje + ' para revisar hoje</span><button type="button" class="nx-btn small" onclick="showFlashcards()">Abrir fichário</button></div>';

  view().innerHTML = '<div class="nx-page">'
    + '<div class="nx-head"><div><h1>Desempenho</h1><p>Seu histórico de questões, fichas e tempo de estudo neste navegador.</p></div>' + seg + '</div>'
    + stats
    + '<div class="dz-grid"><section class="nx-panel"><div class="dz-phead"><div><h2>Questões por ' + (cx.passo === 1 ? 'dia' : cx.passo === 7 ? 'semana' : 'mês') + '</h2><p class="nx-sub">Acertos e erros no período. Troque o modelo do gráfico ao lado.</p></div></div>' + gQ + '</section>'
    + '<section class="nx-panel"><h2>Tempo de estudo</h2><p class="nx-sub">Minutos medidos pelo cronômetro.</p>' + gT + '</section></div>'
    + '<div class="dz-grid"><section class="nx-panel"><div class="dz-phead2"><div><h2>Por disciplina e assunto</h2><p class="nx-sub" id="dz-dsub">' + (vistaDisc === 'rosca' ? 'Quantas questões você fez em cada disciplina.' : 'Clique na disciplina para ver os assuntos e no assunto para abrir o módulo.') + '</p></div>'
    + (q.length ? '<div class="nx-seg" role="group" aria-label="Forma de ver"><button type="button" data-dzv="tabela" aria-pressed="' + (vistaDisc === 'tabela') + '">Tabela</button><button type="button" data-dzv="rosca" aria-pressed="' + (vistaDisc === 'rosca') + '">Rosca 3D</button></div>' : '') + '</div>'
    + '<div id="dz-vt"' + (vistaDisc === 'tabela' || !q.length ? '' : ' hidden') + '>' + tabela + '</div>'
    + (q.length ? '<div id="dz-vr"' + (vistaDisc === 'rosca' ? '' : ' hidden') + '><div class="dz-chart" id="dz-d"></div><p class="dz-cap">Altura e tamanho de cada fatia mostram quantas questões você respondeu na disciplina. Passe o mouse para ver acertos e erros.</p></div>' : '') + '</section>'
    + '<div style="display:grid;gap:16px;align-content:start"><section class="nx-panel"><h2>Onde focar</h2><p class="nx-sub">Assuntos com menor taxa de acerto no período.</p>' + foco + '</section>'
    + '<section class="nx-panel"><h2>Fichário</h2><p class="nx-sub">Fichas em cada caixa de revisão.</p>' + fichMini + '</section></div></div>'
    + '<p class="nx-sub" style="font-size:12px;color:var(--nx-muted);margin-top:4px">Os dados ficam salvos neste navegador. Em outro aparelho, o histórico começa do zero.</p>'
    + '</div>';
  view().scrollTop = 0;
  desenharGraficos();
};

/* ======================= início ======================= */
function iniciar(){
  montarFerramentas(); prepararBarraAcesso(); atualizarPill();
  try{ renderNav(); }catch(e){}
  try{ if(typeof syncAccess === 'function') syncAccess(); }catch(e){}
}
if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar); else iniciar();
})();
