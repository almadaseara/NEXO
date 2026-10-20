/* NEXO — Revisar (aluno): domínio por disciplina e assunto, com atalhos para o caderno de erros e para os flashcards.
   Não guarda dados próprios: lê o registro de tentativas (nexo_eventos) e o caderno de erros (nexo-caderno.js).
   Percentual = acertos ÷ tentativas de questões; a disciplina soma os assuntos e só então divide (não é média de médias).
   Flashcards ficam fora desse percentual. Sem respostas aparece "Sem histórico", nunca 0%.
   (Não confundir com nexo-revisar.js, que é a tela "Revisar questões" do administrador.) */
(function(){
'use strict';

var AMOSTRA_MIN = 4;   /* abaixo disso o percentual aparece com aviso de poucas respostas */

function esc(s){ return String(s == null ? '' : s).replace(/[&<>"']/g, function(c){ return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]; }); }
function mods(){ try{ return modules; }catch(e){ return []; } }
function disc(m){ return (m && m.discipline) || 'Direito Constitucional'; }
function atual(){ try{ return current; }catch(e){ return null; } }
function setCur(v){ try{ current = v; }catch(e){} }
function head(t){ var h = document.getElementById('head'); if(h) h.textContent = t; }
function view(){ return document.getElementById('view'); }
function fechar(){ document.body.classList.remove('mobile-nav-open'); }
function eventosQ(){
  try{ var a = JSON.parse(localStorage.getItem('nexo_eventos')); return (Array.isArray(a) ? a : []).filter(function(e){ return e && e.k === 'q' && e.m; }); }
  catch(e){ return []; }
}
function pct(ok, n){ return n ? Math.round(ok / n * 1000) / 10 : null; }
function fmtPct(p){ return p == null ? 'Sem histórico' : p.toLocaleString('pt-BR', { maximumFractionDigits:1 }) + '%'; }
function arg(s){ return esc(s).replace(/'/g, '&#39;'); }

/* { disciplinas: [{ nome, ok, n, pend, assuntos:[{ id, titulo, ok, n, pend }] }] } */
function calcular(){
  var porMod = {};
  eventosQ().forEach(function(e){ var r = porMod[e.m] = porMod[e.m] || { ok:0, n:0 }; r.n++; if(e.ok) r.ok++; });
  var pendMod = {};
  try{ window.nexoCadernoApi.erradas().forEach(function(x){ pendMod[x.m.id] = (pendMod[x.m.id] || 0) + 1; }); }catch(e){}
  var ds = [], idx = {};
  mods().forEach(function(m){
    var nome = disc(m), d = idx[nome];
    if(!d){ d = idx[nome] = { nome:nome, ok:0, n:0, pend:0, assuntos:[] }; ds.push(d); }
    var r = porMod[m.id] || { ok:0, n:0 };
    d.assuntos.push({ id:m.id, titulo:m.title, ok:r.ok, n:r.n, pend:pendMod[m.id] || 0 });
    d.ok += r.ok; d.n += r.n; d.pend += pendMod[m.id] || 0;
  });
  return { disciplinas:ds };
}

function selo(ok, n){
  var p = pct(ok, n);
  if(p == null) return '<span class="rva-pct rva-sem">Sem histórico</span>';
  return '<span class="rva-pct">' + fmtPct(p) + '</span>';
}
function barra(ok, n){
  var p = pct(ok, n);
  return '<span class="rva-bar" aria-hidden="true"><i style="width:' + (p == null ? 0 : p) + '%"></i></span>';
}
function detalhe(ok, n){
  return n ? ok + ' acertos em ' + n + (n === 1 ? ' resposta' : ' respostas') + (n < AMOSTRA_MIN ? ' · poucas respostas' : '') : 'nenhuma resposta ainda';
}

var CSS = '<style id="rva-aluno-style">'
  + '.rva-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:14px;margin-top:16px}'
  + '.rva-card{text-align:left;display:flex;flex-direction:column;gap:8px;background:var(--nx-surface);border:1px solid var(--nx-line);border-radius:14px;padding:16px 18px;color:var(--nx-ink);cursor:pointer;font:inherit}'
  + '.rva-card:hover,.rva-card:focus-visible{border-color:var(--nx-accent)}'
  + '.rva-card h2{margin:0;font-size:16px}'
  + '.rva-pct{font:800 26px/1 \'DM Sans\',sans-serif}.rva-pct.rva-sem{font-size:15px;font-weight:700;color:var(--nx-muted,#6b7a86)}'
  + '.rva-bar{display:block;height:6px;border-radius:99px;background:var(--nx-line);overflow:hidden}.rva-bar i{display:block;height:100%;background:var(--nx-accent)}'
  + '.rva-meta{font-size:12.5px;color:var(--nx-muted,#6b7a86);line-height:1.5}'
  + '.rva-resumo{display:flex;flex-wrap:wrap;gap:18px;align-items:center;margin:14px 0}'
  + '.rva-linha{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:8px 14px;align-items:center;padding:14px 0;border-top:1px solid var(--nx-line)}'
  + '.rva-linha h3{margin:0 0 8px;font-size:15px}'
  + '.rva-acoes{display:flex;gap:8px;flex-wrap:wrap}'
  + '.rva-linha .rva-nota{display:flex;align-items:center;gap:10px}'
  + '@media(max-width:640px){.rva-linha{grid-template-columns:1fr}}'
  + '.cad-filtros{display:flex;flex-wrap:wrap;gap:12px;align-items:flex-end;margin:12px 0}'
  + '.cad-filtros select{max-width:100%}'
  + '.cad-assunto{margin:22px 0 8px;font-size:17px}.cad-assunto small{font-weight:500;color:var(--nx-muted,#6b7a86);font-size:12.5px;margin-left:6px}'
  + '.cad-anot{display:grid;gap:8px;margin-top:8px}.cad-anot textarea{width:100%;box-sizing:border-box}'
  + '.cad-sit{font-weight:800}.cad-sit.pendente{color:var(--nx-gold,#c99a4a)}.cad-sit.resolvida{color:var(--nx-accent)}'
  + '</style>';
function css(){ if(!document.getElementById('rva-aluno-style')) document.head.insertAdjacentHTML('beforeend', CSS); }

function refazerNav(){ try{ if(typeof renderNav === 'function') renderNav(); }catch(e){} }

window.nexoRevisarHub = function(){
  css(); setCur('revisar-aluno'); fechar(); refazerNav(); head('Revisar');
  var c = calcular();
  var cards = c.disciplinas.map(function(d){
    return '<button type="button" class="rva-card" onclick="nexoRevisarDisc(\'' + arg(d.nome) + '\')">'
      + '<h2>' + esc(d.nome) + '</h2>' + selo(d.ok, d.n) + barra(d.ok, d.n)
      + '<span class="rva-meta">' + detalhe(d.ok, d.n) + '<br>' + d.assuntos.length + (d.assuntos.length === 1 ? ' assunto' : ' assuntos')
      + ' · ' + d.pend + (d.pend === 1 ? ' erro pendente' : ' erros pendentes') + '</span></button>';
  }).join('');
  view().innerHTML = '<div class="nx-page"><div class="nx-head"><div><h1>Revisar</h1>'
    + '<p>Veja seu domínio por disciplina e assunto e escolha como revisar: pelas questões que você errou ou pelos flashcards.</p></div></div>'
    + (c.disciplinas.length ? '<div class="rva-grid">' + cards + '</div>' : '<div class="nx-empty"><b>Nenhuma disciplina disponível.</b></div>')
    + '<p class="nx-sub" style="margin-top:16px">O percentual considera só questões (acertos ÷ respostas). Flashcards não entram nessa conta.</p></div>';
  view().scrollTop = 0;
};

window.nexoRevisarDisc = function(nome){
  css(); setCur('revisar-aluno'); fechar(); refazerNav(); head('Revisar · ' + nome);
  var d = calcular().disciplinas.filter(function(x){ return x.nome === nome; })[0];
  if(!d) return window.nexoRevisarHub();
  var linhas = d.assuntos.map(function(a){
    return '<div class="rva-linha"><div><h3>' + esc(a.titulo) + '</h3>'
      + '<div class="rva-nota">' + selo(a.ok, a.n) + '<span class="rva-meta">' + detalhe(a.ok, a.n) + ' · ' + a.pend + (a.pend === 1 ? ' erro pendente' : ' erros pendentes') + '</span></div>'
      + barra(a.ok, a.n) + '</div>'
      + '<div class="rva-acoes"><button type="button" class="nx-btn small" data-rva-questoes="' + esc(a.id) + '">Questões</button>'
      + '<button type="button" class="nx-btn small" data-fx-scope="m:' + esc(a.id) + '">Flashcards</button></div></div>';
  }).join('');
  view().innerHTML = '<div class="nx-page"><div class="nx-head"><div><h1>' + esc(d.nome) + '</h1><p>Desempenho geral e por assunto.</p></div>'
    + '<div><button type="button" class="nx-btn small" onclick="nexoRevisarHub()">← Todas as disciplinas</button></div></div>'
    + '<div class="nx-panel"><div class="rva-resumo">' + selo(d.ok, d.n) + '<span class="rva-meta">' + detalhe(d.ok, d.n) + '<br>' + d.pend + (d.pend === 1 ? ' erro pendente' : ' erros pendentes') + ' no caderno</span></div>' + barra(d.ok, d.n)
    + '<div class="rva-acoes" style="margin-top:14px"><button type="button" class="nx-btn primary" data-rva-questoes="">Questões (caderno de erros)</button>'
    + '<button type="button" class="nx-btn" data-fx-scope="d:' + esc(d.nome) + '">Flashcards</button></div></div>'
    + '<div class="nx-panel" style="margin-top:16px"><h2 style="margin:0 0 4px">Assuntos</h2>' + linhas + '</div></div>';
  view().dataset.rvaDisc = d.nome;
  view().scrollTop = 0;
};

document.addEventListener('click', function(ev){
  var b = ev.target.closest && ev.target.closest('[data-rva-questoes]'); if(!b) return;
  var v = view(), nome = v && v.dataset.rvaDisc; if(!nome) return;
  window.nexoCadernoErros({ disc:nome, assunto:b.getAttribute('data-rva-questoes') || '', status:'pendente', origem:true });
});

/* entradas "Revisar": na barra de acesso, logo depois de "Questões" (Praticar questões), e na lateral, junto de
   "Revisão de hoje" e "Caderno de erros" */
var navAnterior = window.renderNav;
var ICONE = '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 11a8 8 0 0 0-14.9-3.5L4 10"/><path d="M4 4v6h6"/><path d="M4 13a8 8 0 0 0 14.9 3.5L20 14"/><path d="M20 20v-6h-6"/></svg>';
function ativo(){ return atual() === 'revisar-aluno' || atual() === 'caderno'; }
function barraAcesso(){
  var bar = document.querySelector('.access-bar'); if(!bar) return;
  var b = bar.querySelector('[data-area="revisar"]');
  if(!b){
    var q = bar.querySelector('[data-area="questions"]'); if(!q) return;
    q.insertAdjacentHTML('afterend', '<button type="button" data-area="revisar" onclick="nexoRevisarHub()">' + ICONE + '<span>Revisar</span></button>');
    b = bar.querySelector('[data-area="revisar"]');
  }
  if(ativo()){
    Array.prototype.forEach.call(bar.querySelectorAll('[data-area]'), function(x){ x.classList.remove('selected'); x.removeAttribute('aria-current'); });
    b.classList.add('selected'); b.setAttribute('aria-current', 'page');
  }else if(b.classList.contains('selected')){ b.classList.remove('selected'); b.removeAttribute('aria-current'); }
}
window.renderNav = function(){
  var r;
  try{ if(typeof navAnterior === 'function') r = navAnterior.apply(this, arguments); }catch(e){}
  var nav = document.getElementById('nav'); if(!nav) return r;
  Array.prototype.slice.call(nav.querySelectorAll('.nx-rva-nav')).forEach(function(x){ x.parentNode.removeChild(x); });
  var html = '<button type="button" class="primary-nav nx-nav-extra nx-rva-nav' + (ativo() ? ' active' : '') + '" onclick="nexoRevisarHub()">' + ICONE + ' Revisar</button>';
  var ref = nav.querySelector('.nx-cad-nav') || nav.querySelector('.folder-wrap');
  if(ref) ref.insertAdjacentHTML('beforebegin', html); else nav.insertAdjacentHTML('beforeend', html);
  barraAcesso();
  return r;
};
var syncAnterior = window.syncAccess;
window.syncAccess = function(){
  try{ if(typeof syncAnterior === 'function') syncAnterior.apply(this, arguments); }catch(e){}
  barraAcesso();
};
barraAcesso();
})();
