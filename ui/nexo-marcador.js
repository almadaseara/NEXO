/* NEXO — marca-texto e barra de leitura do conteúdo dos módulos.
   - Marcar (5 cores), sublinhar, tachar e anotar trechos. As marcações ficam guardadas no navegador
     e, com a conta conectada, no Supabase (ui/nexo-estudo.js). Podem ser desfeitas.
   - "Marcar pontos importantes": destaca de uma vez o que o próprio material já grifou
     (marcações do resumo, grifos da lei seca e negritos do texto). Dá para esconder um a um.
   - Cada marcação é guardada pelo trecho de texto (com um pedaço antes e depois), então continua
     no lugar mesmo quando o conteúdo é filtrado ou redesenhado.
   - "Meus grifos": página com todas as marcações, agrupadas por disciplina e módulo. */
(function(){
'use strict';

function E(){ return window.nexoEstudo; }
function escH(s){ return String(s == null ? '' : s).replace(/[&<>"']/g, function(c){ return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]; }); }
function mods(){ return typeof modules !== 'undefined' ? modules : []; }
function modulo(id){ return mods().find(function(m){ return m.id === id; }); }
function setCur(v){ try{ current = v; }catch(e){} }
function curAtual(){ try{ return current; }catch(e){ return null; } }
function LSg(k, d){ try{ var v = JSON.parse(localStorage.getItem(k)); return v == null ? d : v; }catch(e){ return d; } }
function LSs(k, v){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){} }

var CORES = [['am', 'Amarelo'], ['vd', 'Verde'], ['rs', 'Rosa'], ['az', 'Azul'], ['rx', 'Lilás']];
var TIPOS = { hl:'Marca-texto', ul:'Sublinhado', st:'Tachado' };
var ABA_NOME = { resumo:'Resumo', lei:'Lei seca', juris:'Jurisprudência', oficiais:'Questões oficiais', quest:'Questões do caderno', mapa:'Mapa mental', flashcard_topico:'Flashcards', oficial:'Fontes oficiais' };
var IC = {
  tt:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 6V4h10v2M9 4v16m-2 0h4M14 12v-1h6v1m-3-1v9m-1.5 0h3"/></svg>',
  pen:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m14.5 4.5 5 5L10 19H5v-5l9.5-9.5Z"/><path d="M4 21h16" class="nx-pen-cor"/></svg>',
  ul:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 4v7a5 5 0 0 0 10 0V4M5 20h14"/></svg>',
  st:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12h16M16.5 7.5C16 5.5 14.3 4.5 12 4.5c-2.6 0-4.5 1.3-4.5 3.4 0 1.7 1.2 2.6 3 3.1M8 16.5c.5 2 2.2 3 4.5 3 2.6 0 4.5-1.3 4.5-3.4"/></svg>',
  nota:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 4h14v11l-5 5H5z"/><path d="M14 20v-5h5M8 9h8M8 13h4"/></svg>',
  auto:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/></svg>',
  lista:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6h11M9 12h11M9 18h11"/><rect x="3.5" y="4.5" width="3" height="3" rx=".6"/><rect x="3.5" y="10.5" width="3" height="3" rx=".6"/><rect x="3.5" y="16.5" width="3" height="3" rx=".6"/></svg>',
  undo:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/></svg>',
  lixo:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 7h16M10 11v6m4-6v6M6 7l1 13h10l1-13M9 7V4h6v3"/></svg>',
  x:'<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>',
  grifo:'<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m14.5 4.5 5 5L10 19H5v-5l9.5-9.5Z"/><path d="M4 21h16"/></svg>'
};

/* ---------- estado da página aberta ---------- */
var pag = { mod:null, tab:null }, modo = null, cor = LSg('nexo_mk_cor', 'am'), tamanho = LSg('nexo_mk_tam', 0);
var desfazer = [];
function chave(){ return pag.mod ? pag.mod + '|' + (pag.tab || 'resumo') : null; }
function dados(){ var k = chave(); return k ? JSON.parse(JSON.stringify(E().marcas(k))) : null; }
function guardar(novo, rotulo){
  var k = chave(); if(!k) return;
  desfazer.push({ k:k, antes:JSON.stringify(E().marcas(k)), rotulo:rotulo });
  if(desfazer.length > 40) desfazer.shift();
  E().salvarMarcas(k, novo);
  aplicar(); atualizarBarra();
}
function caixa(){ return document.querySelector('#view .reading-content'); }

/* ---------- texto da página: mapa de nós de texto ---------- */
function ignorar(n){
  for(var p = n.parentNode; p && p !== document.body; p = p.parentNode){
    if(p.nodeType !== 1) continue;
    var tg = p.tagName; if(tg === 'SCRIPT' || tg === 'STYLE' || tg === 'BUTTON' || tg === 'SELECT' || tg === 'TEXTAREA' || tg === 'INPUT' || tg === 'svg') return true;
    if(p.hasAttribute && (p.hasAttribute('data-nx-skip') || p.classList.contains('nx-cut'))) return true;
    if(p.classList && p.classList.contains('reading-content')) return false;
  }
  return false;
}
function mapa(raiz){
  var w = document.createTreeWalker(raiz, NodeFilter.SHOW_TEXT, null), nos = [], txt = '', n;
  while((n = w.nextNode())){ if(ignorar(n)) continue; nos.push({ n:n, ini:txt.length }); txt += n.nodeValue; }
  return { nos:nos, txt:txt };
}
function ancorar(mp, mk){
  var q = mk.q; if(!q) return -1;
  var melhor = -1, nota = -1, i = mp.txt.indexOf(q);
  while(i >= 0){
    var p = mp.txt.slice(Math.max(0, i - (mk.p || '').length), i), s = mp.txt.slice(i + q.length, i + q.length + (mk.s || '').length);
    var sc = (mk.p && p === mk.p ? 2 : 0) + (mk.s && s === mk.s ? 2 : 0) + (mk.p && p.slice(-8) === mk.p.slice(-8) ? 1 : 0) + (mk.s && s.slice(0, 8) === mk.s.slice(0, 8) ? 1 : 0);
    if(sc > nota){ nota = sc; melhor = i; if(sc >= 6) break; }
    i = mp.txt.indexOf(q, i + 1);
  }
  return melhor;
}
function envolver(mp, ini, fim, fazer){
  /* parte os nós de texto no intervalo e envolve cada pedaço (sem envolver espaços entre células de tabela) */
  var alvos = [];
  mp.nos.forEach(function(o){
    var a = o.ini, b = o.ini + o.n.nodeValue.length;
    if(b <= ini || a >= fim) return;
    alvos.push({ n:o.n, de:Math.max(0, ini - a), ate:Math.min(o.n.nodeValue.length, fim - a) });
  });
  alvos.forEach(function(x){
    var n = x.n;
    if(!n.nodeValue.slice(x.de, x.ate).trim()) return;
    var pt = /^(TABLE|TBODY|THEAD|TR|UL|OL|SELECT)$/.test(n.parentNode.tagName); if(pt) return;
    if(x.ate < n.nodeValue.length) n.splitText(x.ate);
    var meio = x.de > 0 ? n.splitText(x.de) : n;
    var el = fazer(); meio.parentNode.insertBefore(el, meio); el.appendChild(meio);
  });
}
function limparDom(raiz){
  Array.prototype.forEach.call(raiz.querySelectorAll('.nx-mk'), function(el){ var p = el.parentNode; while(el.firstChild) p.insertBefore(el.firstChild, el); p.removeChild(el); });
  Array.prototype.forEach.call(raiz.querySelectorAll('.nx-auto'), function(el){ el.classList.remove('nx-auto', 'nx-auto-am', 'nx-auto-vd', 'nx-auto-rs', 'nx-auto-az'); el.removeAttribute('data-nx-autoq'); });
  Array.prototype.forEach.call(raiz.querySelectorAll('.nx-mk-nota-ic'), function(el){ el.remove(); });
  raiz.normalize();
}

/* ---------- pontos importantes: o que o próprio material já destaca ---------- */
var AUTO_SEL = [['mark', 'am'], ['b.g1', 'am'], ['b.g2', 'vd'], ['b.g3', 'rs'], ['u', 'az'], ['.summary b, .summary strong, .tr-camada b, .tr-sec b, .tr-rapido b, li > b, p > b, p > strong', 'am']];
function aplicarAuto(raiz, st){
  var ocultos = (st && st.ocultos) || [];
  AUTO_SEL.forEach(function(par){
    Array.prototype.forEach.call(raiz.querySelectorAll(par[0]), function(el){
      if(el.classList.contains('nx-auto') || el.closest('[data-nx-skip],button,.tr-lbl,h1,h2,h3,h4,.small,.muted')) return;
      var t = el.textContent.trim(); if(t.length < 3 || t.length > 400 || ocultos.indexOf(t) >= 0) return;
      el.classList.add('nx-auto', 'nx-auto-' + par[1]); el.setAttribute('data-nx-autoq', t);
    });
  });
}

/* ---------- desenhar as marcações ---------- */
function aplicar(){
  var raiz = caixa(), k = chave(); if(!raiz || !k) return;
  limparDom(raiz);
  raiz.classList.remove('nx-tam-1', 'nx-tam-2'); if(tamanho) raiz.classList.add('nx-tam-' + tamanho);
  var d = E().marcas(k);
  if(d.settings && d.settings.auto) aplicarAuto(raiz, d.settings);
  var mp = mapa(raiz), achadas = 0;
  /* do fim para o começo, para os índices continuarem valendo */
  var lista = (d.marks || []).map(function(m){ return { m:m, i:ancorar(mp, m) }; }).filter(function(x){ return x.i >= 0; }).sort(function(a, b){ return b.i - a.i; });
  lista.forEach(function(x){
    var mp2 = mapa(raiz), i = ancorar(mp2, x.m); if(i < 0) return; achadas++;
    var primeiro = true;
    envolver(mp2, i, i + x.m.q.length, function(){
      var el = document.createElement('span');
      el.className = 'nx-mk nx-mk-' + x.m.k + ' nx-c-' + (x.m.c || 'am') + (x.m.n ? ' nx-mk-temnota' : '');
      el.setAttribute('data-mk', x.m.id); el.tabIndex = -1;
      if(x.m.n) el.title = 'Nota: ' + x.m.n;
      return el;
    });
  });
  /* ícone da nota no fim do trecho */
  (d.marks || []).forEach(function(m){
    if(!m.n) return; var els = raiz.querySelectorAll('.nx-mk[data-mk="' + m.id + '"]'); if(!els.length) return;
    var ic = document.createElement('button'); ic.type = 'button'; ic.className = 'nx-mk-nota-ic'; ic.setAttribute('data-mkid', m.id); ic.setAttribute('aria-label', 'Ver nota'); ic.textContent = '✎';
    els[els.length - 1].after(ic);
  });
  pag.achadas = achadas;
}

/* ---------- barra lateral de ferramentas ---------- */
function barraHTML(){
  var d = chave() ? E().marcas(chave()) : { marks:[], settings:{} }, auto = d.settings && d.settings.auto, n = (d.marks || []).length;
  var bt = function(id, ic, rot, extra){ return '<button type="button" class="nx-tool' + (modo === id ? ' on' : '') + '" data-mkt="' + id + '" aria-pressed="' + (modo === id) + '" title="' + rot + '" aria-label="' + rot + '"' + (extra || '') + '>' + ic + '</button>'; };
  return '<div class="nx-rtools" role="toolbar" aria-label="Ferramentas de leitura" data-nx-skip>'
    + bt('tam', IC.tt, 'Tamanho do texto') + '<span class="nx-tsep"></span>'
    + bt('hl', IC.pen, 'Marca-texto', ' style="--mkc:var(--nx-mk-' + cor + ')"') + bt('ul', IC.ul, 'Sublinhar') + bt('st', IC.st, 'Tachar') + bt('nota', IC.nota, 'Anotar um trecho')
    + '<span class="nx-tsep"></span>'
    + '<button type="button" class="nx-tool' + (auto ? ' on' : '') + '" data-mkt="auto" aria-pressed="' + !!auto + '" title="Marcar pontos importantes" aria-label="Marcar pontos importantes">' + IC.auto + '</button>'
    + '<button type="button" class="nx-tool" data-mkt="lista" title="Meus grifos desta página" aria-label="Meus grifos desta página">' + IC.lista + (n ? '<i class="nx-tcount">' + n + '</i>' : '') + '</button>'
    + '<button type="button" class="nx-tool" data-mkt="undo" title="Desfazer" aria-label="Desfazer"' + (desfazer.length ? '' : ' disabled') + '>' + IC.undo + '</button>'
    + '<button type="button" class="nx-tool" data-mkt="limpar" title="Apagar marcações desta página" aria-label="Apagar marcações desta página"' + (n ? '' : ' disabled') + '>' + IC.lixo + '</button>'
    + (modo === 'hl' ? '<div class="nx-cores" role="group" aria-label="Cor do marca-texto">' + CORES.map(function(c){ return '<button type="button" class="nx-cor nx-c-' + c[0] + '" data-mkcor="' + c[0] + '" aria-pressed="' + (cor === c[0]) + '" aria-label="' + c[1] + '" title="' + c[1] + '"></button>'; }).join('') + '</div>' : '')
    + '</div>';
}
function atualizarBarra(){
  var b = document.querySelector('.nx-rbar-wrap'); if(!b) return;
  b.innerHTML = barraHTML();
  var rc = caixa(); if(rc) rc.classList.toggle('nx-modo', !!modo);
  document.body.classList.toggle('nx-modo-' + 'ativo', !!modo);
}
function montarBarra(){
  var rc = caixa(); if(!rc) return;
  var w = document.querySelector('.nx-rbar-wrap');
  if(!w){ w = document.createElement('div'); w.className = 'nx-rbar-wrap'; document.body.appendChild(w); }
  w.hidden = false; atualizarBarra();
}
function esconderBarra(){ var w = document.querySelector('.nx-rbar-wrap'); if(w) w.hidden = true; fecharPop(); fecharPainel(); }

/* ---------- criar marcação a partir da seleção ---------- */
function selecaoNaPagina(){
  var s = window.getSelection(); if(!s || s.isCollapsed || !s.rangeCount) return null;
  var r = s.getRangeAt(0), rc = caixa(); if(!rc || !rc.contains(r.commonAncestorContainer)) return null;
  var mp = mapa(rc), ini = -1, fim = -1;
  function pos(no, off){
    if(no.nodeType === 3){ var o = mp.nos.find(function(x){ return x.n === no; }); return o ? o.ini + off : -1; }
    /* seleção que termina num elemento: usa o primeiro texto depois dele */
    var alvo = no.childNodes[off] || null, w = document.createTreeWalker(rc, NodeFilter.SHOW_TEXT, null), n;
    if(!alvo) return -1;
    while((n = w.nextNode())){ if(alvo === n || alvo.contains(n) || (alvo.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_FOLLOWING)){ var o2 = mp.nos.find(function(x){ return x.n === n; }); if(o2) return o2.ini; } }
    return mp.txt.length;
  }
  ini = pos(r.startContainer, r.startOffset); fim = pos(r.endContainer, r.endOffset);
  if(ini < 0 || fim <= ini) return null;
  var q = mp.txt.slice(ini, fim);
  var a = q.length - q.replace(/^\s+/, '').length, b = q.length - q.replace(/\s+$/, '').length;
  ini += a; fim -= b; q = mp.txt.slice(ini, fim);
  if(q.length < 2 || q.length > 3000) return null;
  return { q:q, p:mp.txt.slice(Math.max(0, ini - 32), ini), s:mp.txt.slice(fim, fim + 32), rect:r.getBoundingClientRect() };
}
function criar(sel, tipo, c, nota){
  var d = dados(); if(!d) return;
  d.marks = d.marks || [];
  var m = { id:'m' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5), k:tipo, c:c || cor, q:sel.q, p:sel.p, s:sel.s, t:Date.now() };
  if(nota) m.n = nota;
  d.marks.push(m);
  guardar(d, TIPOS[tipo] || 'Marcação');
  try{ window.getSelection().removeAllRanges(); }catch(e){}
  return m;
}

/* ---------- janelinha perto da seleção ou da marcação ---------- */
function fecharPop(){ var p = document.querySelector('.nx-pop'); if(p) p.remove(); }
function abrirPop(rect, html){
  fecharPop();
  var p = document.createElement('div'); p.className = 'nx-pop'; p.setAttribute('data-nx-skip', ''); p.innerHTML = html;
  document.body.appendChild(p);
  var w = p.offsetWidth, h = p.offsetHeight, x = rect.left + rect.width / 2 - w / 2, y = rect.top - h - 10;
  if(y < 70) y = rect.bottom + 10;
  x = Math.max(8, Math.min(window.innerWidth - w - 8, x));
  p.style.left = x + 'px'; p.style.top = (y + window.scrollY) + 'px';
  var f = p.querySelector('textarea, button'); if(f && p.querySelector('textarea')) f.focus();
  return p;
}
function popSelecao(sel){
  pendente = sel;
  abrirPop(sel.rect, '<div class="nx-pop-row">' + CORES.map(function(c){ return '<button type="button" class="nx-cor nx-c-' + c[0] + '" data-mkp="hl" data-c="' + c[0] + '" aria-label="Marcar de ' + c[1].toLowerCase() + '" title="' + c[1] + '"></button>'; }).join('')
    + '<span class="nx-tsep v"></span><button type="button" class="nx-pbtn" data-mkp="ul" aria-label="Sublinhar" title="Sublinhar">' + IC.ul + '</button><button type="button" class="nx-pbtn" data-mkp="st" aria-label="Tachar" title="Tachar">' + IC.st + '</button><button type="button" class="nx-pbtn" data-mkp="nota" aria-label="Anotar" title="Anotar">' + IC.nota + '</button>'
    + (window.nexoFichas ? '<button type="button" class="nx-pbtn nx-pbtn-txt" data-mkp="ficha" title="Criar ficha de revisão com este trecho">+ Ficha</button>' : '') + '</div>');
}
function popFicha(rect, trecho){
  abrirPop(rect, '<form class="nx-pop-nota nx-pop-ficha"><label>Frente (pergunta)<textarea name="f" rows="2" maxlength="600" placeholder="Escreva a pergunta que este trecho responde"></textarea></label>'
    + '<label>Verso (resposta)<textarea name="v" rows="3" maxlength="1200">' + escH(trecho || '') + '</textarea></label>'
    + '<div class="nx-pop-row end"><button type="button" class="nx-btn small ghost" data-mkp="fechar">Cancelar</button><button type="submit" class="nx-btn small primary">Salvar ficha</button></div></form>');
}
function popNota(rect, texto, alvo){
  abrirPop(rect, '<form class="nx-pop-nota" data-alvo="' + (alvo || '') + '"><label>Sua nota<textarea rows="3" maxlength="600">' + escH(texto || '') + '</textarea></label><div class="nx-pop-row end"><button type="button" class="nx-btn small ghost" data-mkp="fechar">Cancelar</button><button type="submit" class="nx-btn small primary">Salvar nota</button></div></form>');
}
function popMarca(id, rect){
  var d = E().marcas(chave()), m = (d.marks || []).find(function(x){ return x.id === id; }); if(!m) return;
  abrirPop(rect, '<div class="nx-pop-row">' + CORES.map(function(c){ return '<button type="button" class="nx-cor nx-c-' + c[0] + '" data-mkm="cor" data-c="' + c[0] + '" data-id="' + id + '" aria-pressed="' + (m.c === c[0]) + '" aria-label="Trocar para ' + c[1].toLowerCase() + '" title="' + c[1] + '"></button>'; }).join('')
    + '<span class="nx-tsep v"></span><button type="button" class="nx-pbtn" data-mkm="nota" data-id="' + id + '" aria-label="' + (m.n ? 'Editar nota' : 'Anotar') + '" title="' + (m.n ? 'Editar nota' : 'Anotar') + '">' + IC.nota + '</button><button type="button" class="nx-pbtn perigo" data-mkm="tirar" data-id="' + id + '" aria-label="Remover marcação" title="Remover marcação">' + IC.lixo + '</button></div>'
    + (m.n ? '<p class="nx-pop-txt">' + escH(m.n) + '</p>' : ''));
}
var pendente = null;

/* ---------- painel "Meus grifos" desta página ---------- */
function fecharPainel(){ var p = document.querySelector('.nx-painel-mk'); if(p) p.remove(); }
function abrirPainel(){
  fecharPainel();
  var d = E().marcas(chave()), lista = (d.marks || []).slice().sort(function(a, b){ return a.t - b.t; }), rc = caixa();
  var p = document.createElement('div'); p.className = 'nx-painel-mk'; p.setAttribute('role', 'complementary'); p.setAttribute('data-nx-skip', ''); p.setAttribute('aria-label', 'Marcações desta página');
  p.innerHTML = '<div class="nx-pmh"><b>Meus grifos desta página</b><button type="button" class="nx-pbtn" data-mkpainel="fechar" aria-label="Fechar">' + IC.x + '</button></div>'
    + (lista.length ? '<ol>' + lista.map(function(m){
      var ok = rc && rc.querySelector('.nx-mk[data-mk="' + m.id + '"]');
      return '<li><button type="button" class="nx-pm-item nx-c-' + (m.c || 'am') + ' k-' + m.k + '" data-mkir="' + m.id + '"' + (ok ? '' : ' disabled') + '><span class="nx-pm-q">' + escH(m.q.length > 220 ? m.q.slice(0, 220) + '…' : m.q) + '</span>' + (m.n ? '<span class="nx-pm-n">' + escH(m.n) + '</span>' : '') + (ok ? '' : '<small>não aparece com o filtro atual</small>') + '</button></li>';
    }).join('') + '</ol>' : '<p class="nx-empty">Selecione um trecho do texto para marcar. Com o marca-texto ligado na barra, a marcação é feita assim que você solta o mouse.</p>')
    + '<div class="nx-pmf"><button type="button" class="nx-btn small ghost" onclick="nexoMeusGrifos()">Ver todos os meus grifos</button></div>';
  document.body.appendChild(p);
}

/* ---------- eventos ---------- */
document.addEventListener('mouseup', aoSoltar);
document.addEventListener('touchend', function(){ setTimeout(aoSoltar, 30); });
function aoSoltar(e){
  if(e && e.target && e.target.closest && e.target.closest('.nx-pop,.nx-rbar-wrap,.nx-painel-mk')) return;
  setTimeout(function(){
    var sel = selecaoNaPagina(); if(!sel) return;
    if(modo === 'hl' || modo === 'ul' || modo === 'st'){ criar(sel, modo, cor); return; }
    if(modo === 'nota'){ pendente = sel; popNota(sel.rect, '', ''); return; }
    popSelecao(sel);
  }, 10);
}
document.addEventListener('click', function(e){
  var t = e.target;
  /* barra */
  var b = t.closest && t.closest('[data-mkt]');
  if(b){
    var a = b.dataset.mkt;
    if(a === 'tam'){ tamanho = (tamanho + 1) % 3; LSs('nexo_mk_tam', tamanho); var rc = caixa(); if(rc){ rc.classList.remove('nx-tam-1', 'nx-tam-2'); if(tamanho) rc.classList.add('nx-tam-' + tamanho); } return; }
    if(a === 'hl' || a === 'ul' || a === 'st' || a === 'nota'){ modo = modo === a ? null : a; atualizarBarra(); return; }
    if(a === 'auto'){ alternarAuto(); return; }
    if(a === 'lista'){ if(document.querySelector('.nx-painel-mk')) fecharPainel(); else abrirPainel(); return; }
    if(a === 'undo'){ voltar(); return; }
    if(a === 'limpar'){
      abrirPop(b.getBoundingClientRect(), '<p class="nx-pop-txt">Apagar todas as marcações desta página? Dá para desfazer depois.</p><div class="nx-pop-row end"><button type="button" class="nx-btn small ghost" data-mkp="fechar">Cancelar</button><button type="button" class="nx-btn small perigo" data-mkp="limparsim">Apagar</button></div>');
      return;
    }
  }
  var cbt = t.closest && t.closest('[data-mkcor]');
  if(cbt){ cor = cbt.dataset.mkcor; LSs('nexo_mk_cor', cor); atualizarBarra(); return; }
  /* janelinha da seleção */
  var p = t.closest && t.closest('[data-mkp]');
  if(p){
    var ap = p.dataset.mkp;
    if(ap === 'fechar'){ fecharPop(); return; }
    if(ap === 'limparsim'){ var d0 = dados(); d0.marks = []; guardar(d0, 'Apagar marcações'); fecharPop(); return; }
    if(!pendente){ fecharPop(); return; }
    if(ap === 'nota'){ popNota(pendente.rect, '', ''); return; }
    if(ap === 'ficha'){ popFicha(pendente.rect, pendente.q); return; }
    criar(pendente, ap, p.dataset.c || cor); pendente = null; fecharPop(); return;
  }
  /* janelinha da marcação */
  var mm = t.closest && t.closest('[data-mkm]');
  if(mm){
    var d = dados(), m = (d.marks || []).find(function(x){ return x.id === mm.dataset.id; }); if(!m) return;
    if(mm.dataset.mkm === 'cor'){ m.c = mm.dataset.c; if(m.k !== 'hl') m.k = 'hl'; guardar(d, 'Trocar cor'); fecharPop(); return; }
    if(mm.dataset.mkm === 'tirar'){ d.marks = d.marks.filter(function(x){ return x.id !== m.id; }); guardar(d, 'Remover marcação'); fecharPop(); return; }
    if(mm.dataset.mkm === 'nota'){ popNota(mm.getBoundingClientRect(), m.n || '', m.id); return; }
  }
  var ic = t.closest && t.closest('.nx-mk-nota-ic');
  if(ic){ popMarca(ic.dataset.mkid, ic.getBoundingClientRect()); return; }
  var ir = t.closest && t.closest('[data-mkir]');
  if(ir){ irPara(ir.dataset.mkir); return; }
  if(t.closest && t.closest('[data-mkpainel="fechar"]')){ fecharPainel(); return; }
  if(t.closest && t.closest('[data-nx-auto]')){ var dd = dados(); if(dd && !(dd.settings && dd.settings.auto)) alternarAuto(); return; }
  /* clicar numa marcação abre as opções; clicar num destaque automático permite escondê-lo */
  var mk = t.closest && t.closest('.nx-mk');
  if(mk && !modo && window.getSelection().isCollapsed){ popMarca(mk.getAttribute('data-mk'), mk.getBoundingClientRect()); return; }
  var au = t.closest && t.closest('.nx-auto');
  if(au && !modo && window.getSelection().isCollapsed && !t.closest('a,button')){
    abrirPop(au.getBoundingClientRect(), '<div class="nx-pop-row"><span class="nx-pop-lbl">Destaque do material</span><button type="button" class="nx-btn small ghost" data-mkesc="1">Esconder este</button></div>');
    escondendo = au.getAttribute('data-nx-autoq'); return;
  }
  var esc = t.closest && t.closest('[data-mkesc]');
  if(esc && escondendo){ var de = dados(); de.settings = de.settings || {}; de.settings.ocultos = (de.settings.ocultos || []).concat([escondendo]); escondendo = null; guardar(de, 'Esconder destaque'); fecharPop(); return; }
  if(!(t.closest && t.closest('.nx-pop'))) fecharPop();
});
var escondendo = null;
document.addEventListener('submit', function(e){
  var f = e.target; if(!f.classList || !f.classList.contains('nx-pop-nota')) return;
  e.preventDefault();
  if(f.classList.contains('nx-pop-ficha')){
    var fr = f.f.value.trim(), vs = f.v.value.trim();
    if(!fr){ f.f.focus(); f.f.setAttribute('aria-invalid', 'true'); return; }
    var ok = window.nexoFichas && window.nexoFichas.criar(pag.mod, fr, vs);
    pendente = null;
    if(ok){ abrirPop(f.getBoundingClientRect(), '<p class="nx-pop-txt">Ficha salva. Ela aparece no Fichário, em "Minhas fichas".</p>'); setTimeout(fecharPop, 2200); } else fecharPop();
    return;
  }
  var txt = f.querySelector('textarea').value.trim(), alvo = f.dataset.alvo;
  if(alvo){ var d = dados(), m = (d.marks || []).find(function(x){ return x.id === alvo; }); if(m){ if(txt) m.n = txt; else delete m.n; guardar(d, 'Nota'); } }
  else if(pendente){ criar(pendente, 'hl', cor, txt); pendente = null; }
  fecharPop();
});
document.addEventListener('keydown', function(e){
  if(e.key === 'Escape'){ fecharPop(); fecharPainel(); if(modo){ modo = null; atualizarBarra(); } }
  if((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z' && caixa() && !/INPUT|TEXTAREA/.test((document.activeElement || {}).tagName || '')){ if(desfazer.length){ e.preventDefault(); voltar(); } }
});
function alternarAuto(){
  var d = dados(); if(!d) return; d.settings = d.settings || {};
  d.settings.auto = !d.settings.auto; guardar(d, d.settings.auto ? 'Marcar pontos importantes' : 'Tirar pontos importantes');
}
function voltar(){
  var u = desfazer.pop(); if(!u) return;
  E().salvarMarcas(u.k, JSON.parse(u.antes));
  if(u.k === chave()) aplicar();
  atualizarBarra(); fecharPop();
}
function irPara(id){
  var el = document.querySelector('.reading-content .nx-mk[data-mk="' + id + '"]'); if(!el) return;
  el.scrollIntoView({ block:'center', behavior:'smooth' });
  var todos = document.querySelectorAll('.reading-content .nx-mk[data-mk="' + id + '"]');
  Array.prototype.forEach.call(todos, function(x){ x.classList.add('nx-pisca'); setTimeout(function(){ x.classList.remove('nx-pisca'); }, 1600); });
}

/* ---------- ligar ao desenho dos módulos ---------- */
var rt = window.renderTab;
if(typeof rt === 'function'){
  window.renderTab = function(m, tab){
    var r = rt.apply(this, arguments);
    try{
      pag.mod = m && m.id; pag.tab = tab || 'resumo';
      fecharPop(); fecharPainel();
      aplicar(); montarBarra();
      if(irDepois){ var id = irDepois; irDepois = null; setTimeout(function(){ irPara(id); }, 60); }
    }catch(e){}
    return r;
  };
}
/* fora de um módulo, a barra some */
new MutationObserver(function(){
  if(!caixa()){ esconderBarra(); pag.mod = null; if(modo){ modo = null; } }
}).observe(document.getElementById('view') || document.body, { childList:true });
document.addEventListener('nexo:estudo', function(e){ if(e.detail === 'sincronizado' && caixa()) aplicar(); if(e.detail === 'sincronizado' && curAtual() === 'grifos') window.nexoMeusGrifos(); });

/* ---------- página "Meus grifos": o acervo de estudo ---------- */
var irDepois = null, filtroCor = '';
window.nexoMeusGrifos = function(){
  try{ if(typeof closeMobileNav === 'function') closeMobileNav(); }catch(e){}
  setCur('grifos'); try{ renderNav(); }catch(e){} try{ syncAccess(); }catch(e){}
  var h = document.getElementById('head'); if(h) h.textContent = 'Meus grifos';
  var tudo = E().todasMarcas(), grupos = {};
  Object.keys(tudo).forEach(function(k){
    var p = k.split('|'), m = modulo(p[0]); if(!m) return;
    (tudo[k].marks || []).forEach(function(x){
      if(filtroCor && (x.k !== 'hl' || x.c !== filtroCor)) return;
      var disc = m.discipline || 'Direito Constitucional';
      grupos[disc] = grupos[disc] || {}; grupos[disc][m.id] = grupos[disc][m.id] || { m:m, itens:[] };
      grupos[disc][m.id].itens.push({ x:x, tab:p[1] });
    });
  });
  var total = 0; Object.keys(grupos).forEach(function(d){ Object.keys(grupos[d]).forEach(function(id){ total += grupos[d][id].itens.length; }); });
  var corBar = '<div class="nx-seg" role="group" aria-label="Filtrar por cor"><button type="button" data-mgcor="" aria-pressed="' + (!filtroCor) + '">Todas</button>' + CORES.map(function(c){ return '<button type="button" data-mgcor="' + c[0] + '" aria-pressed="' + (filtroCor === c[0]) + '"><i class="nx-dot nx-c-' + c[0] + '"></i>' + c[1] + '</button>'; }).join('') + '</div>';
  var corpo = total ? Object.keys(grupos).sort().map(function(d){
    return '<section class="nx-panel nx-mg-disc"><h2>' + escH(d) + '</h2>' + Object.keys(grupos[d]).map(function(id){
      var g = grupos[d][id];
      return '<div class="nx-mg-mod"><h3><button type="button" class="nt-link" data-mgabrir="' + id + '" data-tab="resumo">' + escH(g.m.title) + '</button></h3><ol>' + g.itens.sort(function(a, b){ return a.x.t - b.x.t; }).map(function(it){
        return '<li><button type="button" class="nx-pm-item nx-c-' + (it.x.c || 'am') + ' k-' + it.x.k + '" data-mgabrir="' + id + '" data-tab="' + escH(it.tab) + '" data-mk="' + it.x.id + '"><span class="nx-pm-q">' + escH(it.x.q.length > 300 ? it.x.q.slice(0, 300) + '…' : it.x.q) + '</span>' + (it.x.n ? '<span class="nx-pm-n">' + escH(it.x.n) + '</span>' : '') + '<small>' + (ABA_NOME[it.tab] || it.tab) + ' · ' + new Date(it.x.t).toLocaleDateString('pt-BR') + '</small></button></li>';
      }).join('') + '</ol></div>';
    }).join('') + '</section>';
  }).join('') : '<div class="nx-empty">' + (filtroCor ? 'Nenhuma marcação nessa cor.' : 'Você ainda não marcou nada. Abra um módulo, selecione um trecho e escolha uma cor; ou use "Marcar pontos importantes" na barra ao lado do texto.') + '</div>';
  document.getElementById('view').innerHTML = '<div class="nx-page"><div class="nx-head"><div><h1>Meus grifos</h1><p>' + total + (total === 1 ? ' marcação' : ' marcações') + ' em todos os módulos' + (E().conectado() ? ', guardadas na sua conta.' : ', guardadas neste navegador. Entre na conta para levar para outros aparelhos.') + '</p></div>' + corBar + '</div>' + corpo + '</div>';
};
document.addEventListener('click', function(e){
  var c = e.target.closest && e.target.closest('[data-mgcor]'); if(c){ filtroCor = c.dataset.mgcor; window.nexoMeusGrifos(); return; }
  var a = e.target.closest && e.target.closest('[data-mgabrir]'); if(!a) return;
  var m = modulo(a.dataset.mgabrir); if(!m) return;
  irDepois = a.dataset.mk || null; window.nexoTarefaAtiva = null;
  if(typeof openModule === 'function') openModule(m.id);
  if(a.dataset.tab && a.dataset.tab !== 'resumo' && typeof window.renderTab === 'function') window.renderTab(m, a.dataset.tab);
});

/* entrada "Meus grifos" na barra lateral, depois de "Flashcards" / "Desempenho" */
var rn = window.renderNav;
if(typeof rn === 'function'){
  window.renderNav = function(){
    var r = rn.apply(this, arguments);
    try{
      var nav = document.getElementById('nav'); if(!nav || nav.querySelector('.mk-nav')) return r;
      var botoes = nav.querySelectorAll('.primary-nav.nx-nav-extra'), ref = null;
      Array.prototype.forEach.call(botoes, function(b){ if(/nexoDesempenho/.test(b.getAttribute('onclick') || '')) ref = b; });
      var html = '<button type="button" class="primary-nav nx-nav-extra mk-nav' + (curAtual() === 'grifos' ? ' active' : '') + '" onclick="nexoMeusGrifos()">' + IC.grifo + ' Meus grifos</button>';
      if(ref) ref.insertAdjacentHTML('afterend', html);
    }catch(e){}
    return r;
  };
}
window.nexoMarcador = { aplicar:aplicar, auto:alternarAuto };
})();
