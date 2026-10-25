/* NEXO — "Revisão visual": mapa mental gerado a partir do conteúdo de cada capítulo,
   no estilo dos mapas ilustrados de Medicina Legal (faixa de título, blocos numerados,
   quadros comparativos coloridos, pegadinha, macete e revisão rápida).
   Fonte dos dados: window.NEXO_TEMAS[id] (seções, "Em 30 segundos", quadros, pegadinhas, fichas).
   Aparece na aba "Mapa mental" acima dos mapas em imagem (que continuam funcionando). */
(function(){
'use strict';
function temas(){ return window.NEXO_TEMAS || {}; }
function txt(h){ return String(h || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim(); }
function curto(h, n){
  var t = txt(h); if(t.length <= n) return t;
  var p = t.slice(0, n), ponto = p.lastIndexOf('. ');
  if(ponto > n * .55) return p.slice(0, ponto + 1);
  return p.slice(0, p.lastIndexOf(' ')) + '…';
}
function ILU(){ return window.NEXO_ILUSTRA; }
function figura(texto, i, usados){
  var L = ILU(); if(!L) return '';
  var n = L.escolher(texto, i, usados); if(usados) usados.push(n);
  return '<span class="rv-fig">' + L.desenho(n) + '</span>';
}
function esc(s){ return String(s).replace(/[&<>"]/g, function(c){ return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' }[c]; }); }

/* ícones simples (traço), escolhidos pelo assunto do bloco */
var SVG = function(d){ return '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + d + '</svg>'; };
var IC = {
  balanca:SVG('<path d="M24 7v32M14 39h20M10 13h28M24 10a2 2 0 1 0 0-.1"/><path d="M14 13 8 26h12zM34 13l-6 13h12z"/><path d="M8 26a6 4 0 0 0 12 0M28 26a6 4 0 0 0 12 0"/>'),
  doc:SVG('<path d="M12 6h17l7 7v29H12z"/><path d="M29 6v8h7M17 21h14M17 27h14M17 33h9"/>'),
  lupa:SVG('<circle cx="21" cy="21" r="11"/><path d="m29 29 11 11"/><path d="M16 21h10"/>'),
  escudo:SVG('<path d="M24 5 9 11v10c0 10 6.5 18 15 22 8.5-4 15-12 15-22V11z"/><path d="m17 24 5 5 9-10"/>'),
  relogio:SVG('<circle cx="24" cy="25" r="16"/><path d="M24 16v10l7 4M18 5h12"/>'),
  livro:SVG('<path d="M8 9h13a4 4 0 0 1 4 4v28a3 3 0 0 0-3-3H8zM40 9H27a4 4 0 0 0-4 4v28a3 3 0 0 1 3-3h14z"/>'),
  pessoa:SVG('<circle cx="24" cy="15" r="7"/><path d="M10 41c1-8 7-13 14-13s13 5 14 13"/>'),
  alvo:SVG('<circle cx="24" cy="24" r="16"/><circle cx="24" cy="24" r="9"/><circle cx="24" cy="24" r="2.5"/>'),
  algema:SVG('<circle cx="15" cy="30" r="8"/><circle cx="33" cy="30" r="8"/><path d="M15 22v-6a4 4 0 0 1 8 0M33 22v-6a4 4 0 0 0-8 0"/>'),
  coracao:SVG('<path d="M24 40S7 30 7 18a8.5 8.5 0 0 1 17-2 8.5 8.5 0 0 1 17 2c0 12-17 22-17 22z"/><path d="M14 23h6l3-5 4 9 3-4h5"/>'),
  predio:SVG('<path d="M6 41h36M10 41V19M38 41V19M18 41V25M30 41V25M5 19 24 7l19 12z"/>'),
  lampada:SVG('<path d="M18 33h12M19 38h10M24 6a12 12 0 0 0-7 21.7V33h14v-5.3A12 12 0 0 0 24 6z"/>'),
  check:'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="11" fill="currentColor"/><path d="m7 12.5 3.2 3.2L17 9" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  alerta:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 2 21h20z" fill="currentColor"/><path d="M12 10v5M12 18v.01" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/></svg>',
  foguete:SVG('<path d="M28 8c7-2 12-1 12-1s1 5-1 12L26 32l-10-10z"/><path d="m16 22-6 1-4 6 9-1M26 32l-1 6-6 4 1-9"/><circle cx="31" cy="17" r="3"/>')
};
var REGRAS = [
  [/pena|dosimetr|regime|san[cç][aã]o|puni/i, 'balanca'], [/prescri|tempo|prazo|cronotanat|iter|tentativa|consuma/i, 'relogio'],
  [/prova|per[ií]cia|perito|exame|vest[ií]gio|cust[oó]dia|identifica/i, 'lupa'], [/documento|laudo|atestado|relat[oó]rio|parecer|declara/i, 'doc'],
  [/leg[ií]tima|defesa|excludente|ilicitude|garantia|direitos/i, 'escudo'], [/lei|princ[ií]pio|fonte|norma|conceito|constitui/i, 'livro'],
  [/agente|autor|pessoa|sujeito|servidor|funcion[aá]rio|imputab|concurso de pessoas/i, 'pessoa'], [/vida|homic[ií]dio|les[aã]o|morte|corpo|asfixia|trauma/i, 'coracao'],
  [/administra|estado|poder|[oó]rg[aã]o|ente|uni[aã]o/i, 'predio'], [/pris[aã]o|flagrante|crime|delito/i, 'algema']
];
var ROTA = ['doc', 'lupa', 'balanca', 'escudo', 'livro', 'alvo', 'relogio', 'pessoa'];
function icone(titulo, i){ for(var k = 0; k < REGRAS.length; k++) if(REGRAS[k][0].test(titulo)) return IC[REGRAS[k][1]]; return IC[ROTA[i % ROTA.length]]; }
var TONS = ['azul', 'laranja', 'verde', 'roxo'];

function blocoQuadro(q){
  /* quadro com 2 ou 3 colunas de comparação vira cartões lado a lado */
  var cols = q.head.slice(1), linhas = q.rows.slice(0, 5), usados = [];
  return '<div class="rv-comp rv-c' + cols.length + '">' + cols.map(function(c, j){
    var tudo = txt(c) + ' ' + linhas.map(function(r){ return txt(r[j + 1]); }).join(' ');
    return '<div class="rv-card rv-' + TONS[j % TONS.length] + '"><b class="rv-card-h">' + esc(txt(c)) + '</b>' + figura(tudo, j, usados) + '<ul>'
      + linhas.map(function(r){ return '<li><span>' + esc(txt(r[0])) + '</span>' + esc(curto(r[j + 1], 110)) + '</li>'; }).join('') + '</ul></div>';
  }).join('') + '</div>';
}
function blocoPontos(s){
  var it = (s.rapido || []).slice(0, 4), usados = [];
  return '<div class="rv-pontos">' + it.map(function(r, j){ return '<div class="rv-card rv-' + TONS[j % TONS.length] + '">' + figura(txt(r), j, usados) + '<p>' + r + '</p></div>'; }).join('') + '</div>';
}
function bloco(s, i){
  var usaQuadro = s.quadro && s.quadro.head && s.quadro.head.length >= 3 && s.quadro.head.length <= 4 && s.quadro.rows && s.quadro.rows.length;
  var peg = (s.pegadinhas || [])[0];
  return '<section class="rv-bloco"><div class="rv-bh"><span class="rv-num">' + (i + 1) + '</span><h3>' + esc(txt(s.titulo)) + '</h3><span class="rv-ic">' + icone(s.titulo, i) + '</span></div>'
    + (usaQuadro ? '<p class="rv-faixa">' + esc(txt(s.quadro.titulo)) + '</p>' + blocoQuadro(s.quadro) : blocoPontos(s))
    + (peg ? '<p class="rv-peg"><span class="rv-alerta">' + IC.alerta + '</span><span><b>Pegadinha:</b> ' + peg + '</span></p>' : '')
    + '</section>';
}
function macete(T){
  var ds = (T.cards || []).filter(function(c){ return c.tipo === 'distincao' || c.tipo === 'numero'; }).slice(0, 3);
  if(!ds.length) return '';
  return '<section class="rv-macete"><h3><span class="rv-lamp">' + (ILU() ? ILU().desenho('lampada') : IC.lampada) + '</span>Macete</h3><ul>'
    + ds.map(function(c){ return '<li><span class="rv-ok">' + IC.check + '</span><span><b>' + esc(curto(c.f, 90)) + '</b> ' + esc(curto(c.v, 150)) + '</span></li>'; }).join('')
    + '</ul><span class="rv-nota">Não confunda!</span></section>';
}
function revisaoRapida(T){
  var it = []; (T.secoes || []).forEach(function(s){ if(s.rapido && s.rapido[0]) it.push(s.rapido[0]); });
  it = it.slice(0, 7); if(!it.length) return '';
  return '<section class="rv-rapida"><h3><span class="rv-lamp">' + (ILU() ? ILU().desenho('foguete') : IC.foguete) + '</span>Revisão rápida</h3><ul>'
    + it.map(function(r){ return '<li><span class="rv-ok">' + IC.check + '</span><span>' + esc(curto(r, 140)) + '</span></li>'; }).join('') + '</ul></section>';
}
function disciplina(m){
  var d = (m && (m.discipline || m.disciplina)) || '';
  if(!d && m){ var id = m.id || ''; d = /^ml_/.test(id) ? 'Medicina Legal' : /^pp_/.test(id) ? 'Direito Processual Penal' : /^penal|^crime/.test(id) ? 'Direito Penal' : /^adm/.test(id) ? 'Direito Administrativo' : 'Direito Constitucional'; }
  return d;
}
function revisaoVisual(m){
  var T = temas()[m.id]; if(!T || !(T.secoes || []).length) return '';
  var d = disciplina(m).toUpperCase(), p = d.split(' '), ult = p.pop();
  var tom = /MEDICINA/.test(d) ? 'ml' : /PENAL/.test(d) ? 'dp' : /ADMINISTRATIVO/.test(d) ? 'da' : 'dc';
  return '<div class="rv rv-' + tom + '" role="region" aria-label="Revisão visual do capítulo">'
    + '<div class="rv-topo"><span class="rv-selo">' + (ILU() ? ILU().desenho({ ml:'caduceu', dp:'balanca', da:'predio', dc:'livro' }[tom]) : icone(T.meta && T.meta.tema || m.title, 0)) + '</span><div><h2>' + esc(p.join(' ')) + ' <em>' + esc(ult) + '</em> — Revisão visual</h2><p>' + esc(txt((T.meta && T.meta.tema) || m.title)) + '</p></div>' + (ILU() ? '<span class="rv-pilha">' + ILU().desenho('livros') + '</span>' : '') + '</div>'
    + '<div class="rv-grade">' + T.secoes.map(bloco).join('') + '</div>'
    + '<div class="rv-rodape">' + macete(T) + revisaoRapida(T) + '</div>'
    + '<p class="rv-fonte">Gerado a partir do capítulo do livro digital (conferido em ' + esc((T.meta && T.meta.atualizado) || '') + '). Os detalhes e a lei seca estão nas outras abas.</p></div>';
}
window.nexoRevisaoVisual = revisaoVisual;

/* aba "Mapa mental": revisão visual + mapas em imagem (se houver) */
/* mapas ilustrados gerados pela NEXO (imagens no próprio site: assets/mapas) */
var MAN = null;
fetch('data/mapas-ilustrados.json', { cache:'no-cache' }).then(function(r){ return r.json(); }).then(function(j){
  MAN = (j && j.mapas) || {};
  try{ var a = document.getElementById('mindmap-content'); if(a && typeof current !== 'undefined'){ var m = modules.find(function(x){ return x.id === current; }); if(m) a.innerHTML = window.mindmapGalleryHTML(m); } }catch(e){}
}).catch(function(){ MAN = {}; });
function galeriaNexo(m){
  var l = (MAN && MAN[m.id]) || []; if(!l.length) return '';
  return '<div class="card rv-galeria"><h3>Mapas ilustrados</h3><p class="muted">' + l.length + (l.length > 1 ? ' imagens' : ' imagem') + ' de revisão deste capítulo. Toque para ampliar.</p><div class="mindmap-gallery">'
    + l.map(function(im){ return '<figure class="mindmap-figure"><button type="button" class="mindmap-thumb" data-rvimg="' + esc(im.arquivo) + '" data-rvtit="' + esc(im.titulo) + '" aria-label="Ampliar mapa: ' + esc(im.titulo) + '"><img src="' + esc(im.arquivo) + '" alt="' + esc(im.titulo) + '" loading="lazy" width="1536" height="1024"></button><figcaption>' + esc(im.titulo) + '</figcaption></figure>'; }).join('') + '</div></div>';
}
document.addEventListener('click', function(e){
  var b = e.target.closest && e.target.closest('[data-rvimg]'); if(!b) return;
  var d = document.createElement('dialog'); d.className = 'nexo-map-dialog';
  d.innerHTML = '<button type="button" class="nexo-map-close" aria-label="Fechar imagem">×</button><img alt="">';
  d.querySelector('img').src = b.dataset.rvimg; d.querySelector('img').alt = b.dataset.rvtit;
  d.querySelector('button').onclick = function(){ d.close(); };
  d.addEventListener('close', function(){ d.remove(); });
  d.addEventListener('click', function(ev){ if(ev.target === d) d.close(); });
  document.body.appendChild(d); d.showModal();
});
var original = window.mindmapGalleryHTML;
if(typeof original === 'function'){
  window.mindmapGalleryHTML = function(m){
    var rv = ''; try{ rv = galeriaNexo(m) + revisaoVisual(m); }catch(e){}
    var temImg = false; try{ temImg = typeof mindmapCache !== 'undefined' && (mindmapCache.get(m.id) || []).length > 0; }catch(e){}
    var gal = original.apply(this, arguments);
    if(rv && !temImg){
      /* sem imagens: mostra só a revisão visual (e o envio, para quem administra) */
      var pode = false; try{ pode = typeof canManageMindmaps === 'function' && canManageMindmaps(); }catch(e){}
      return rv + (pode ? gal : '');
    }
    return rv + gal;
  };
}
/* fonte dos títulos, carregada só quando o mapa aparece */
var fonte = false;
document.addEventListener('click', function(){ if(fonte || !document.querySelector('.rv')) return; fonte = true; var l = document.createElement('link'); l.rel = 'stylesheet'; l.href = 'https://fonts.googleapis.com/css2?family=Oswald:wght@600;700&display=swap'; document.head.appendChild(l); }, true);
new MutationObserver(function(){ if(!fonte && document.querySelector('.rv')){ fonte = true; var l = document.createElement('link'); l.rel = 'stylesheet'; l.href = 'https://fonts.googleapis.com/css2?family=Oswald:wght@600;700&display=swap'; document.head.appendChild(l); } }).observe(document.documentElement, { childList:true, subtree:true });
})();
