/* NEXO — Vade Mecum (seção separada).
   - Leis em data/vade/<id>.js (texto compilado, gerado por tools/vade-extrair.py a partir do arquivo do Planalto).
   - Busca por artigo (ex.: "17-B") ou por palavra; índice por capítulo; modo leitura (só o texto da lei).
   - Julgados, flashcards e questões ficam fechados: só abrem ao clicar no botão do artigo. A ligação vem dos temas
     (window.NEXO_TEMAS): itens de "lei" cujo rótulo começa com "Art. N" da lei, com os cards (c), julgados (j) e questões (lei).
   - Grifos e anotações pessoais são feitos selecionando o texto (popup com cores e nota, estilo QConcursos); o botão mostra/oculta os grifos.
     Ficam guardados neste aparelho (localStorage). */
(function(){
'use strict';

var LEIS = [
  { id:'l8429', nome:'Lei 8.429/1992', sub:'Improbidade administrativa (com a Lei 14.230/2021)', v:'20261031' }
];
var K_PREF = 'nexo_vade_pref_v1', K_MARCAS = 'nexo_vade_marcas_v1', K_NOTAS = 'nexo_vade_notas_v1';
var CORES = [['am','Amarelo'],['vd','Verde'],['rs','Rosa'],['az','Azul']];
var CORES_X = [['rx','Lilás','#a78bfa'],['lj','Laranja','#fb923c'],['vm','Vermelho','#ef4444'],['tl','Turquesa','#14b8a6'],['ci','Cinza','#9ca3af'],['mr','Marrom','#a16207'],['lm','Limão','#d4e157'],['in','Índigo','#6366f1']];
function corStyle(c){ return /^#[0-9a-f]{6}$/i.test(c) ? ' style="background:' + c + '66"' : ''; }
function corClasse(c){ return /^#/.test(c) ? '' : ' vd-c-' + c; }
var STATUS = { vigente:'Vigente', atencao:'Atenção', divergencia:'Divergência', pendente:'Em julgamento' };
var TIPO_CARD = { caso:'Caso prático', numero:'Números e prazos', distincao:'Distinção', lacuna:'Complete a lei', ce:'Certo ou errado', juris:'Jurisprudência' };

function ls(k, d){ try{ var v = JSON.parse(localStorage.getItem(k)); return v == null ? d : v; }catch(e){ return d; } }
function sv(k, v){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){} }
function esc(s){ return String(s == null ? '' : s).replace(/[&<>"']/g, function(c){ return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]; }); }
function fold(s){ return String(s).split('').map(function(c){ return c.normalize('NFD').charAt(0); }).join('').toLowerCase(); }
function setCur(v){ try{ current = v; }catch(e){} }
function atual(){ try{ return current; }catch(e){ return null; } }
function $(s, r){ return (r || document).querySelector(s); }
function $$(s, r){ return Array.prototype.slice.call((r || document).querySelectorAll(s)); }

var pref = ls(K_PREF, {});
var S = { leiId:null, lei:null, busca:'', leitura:!!pref.leitura, grifos:pref.grifos !== false, tam:typeof pref.tam === 'number' ? pref.tam : 0, semRev:!!pref.semRev, ver:{ acoes:!pref.ver || pref.ver.acoes !== false, notas:!pref.ver || pref.ver.notas !== false, ementa:!!(pref.ver && pref.ver.ementa), rodape:!!(pref.ver && pref.ver.rodape) }, aberto:{}, indice:false, nota:{}, ferr:false, sumario:pref.sumario !== false };
var marcas = ls(K_MARCAS, {}), notas = ls(K_NOTAS, {});
function salvaPref(){ sv(K_PREF, { leitura:S.leitura, grifos:S.grifos, tam:S.tam, semRev:S.semRev, ver:S.ver, sumario:S.sumario }); }

/* ---------- carregar a lei e ligar aos temas ---------- */
function carregar(id, ok, falha){
  if(window.NEXO_VADE && window.NEXO_VADE[id]) return ok(window.NEXO_VADE[id]);
  var def = LEIS.filter(function(l){ return l.id === id; })[0];
  var s = document.createElement('script');
  s.src = 'data/vade/' + id + '.js?v=' + (def ? def.v : '1');
  s.onload = function(){ if(window.NEXO_VADE && window.NEXO_VADE[id]) ok(window.NEXO_VADE[id]); else falha(); };
  s.onerror = falha;
  document.head.appendChild(s);
}
function ligacoes(lei){
  if(lei._lig) return lei._lig;
  var lig = {};
  function ent(a){ return lig[a] || (lig[a] = { juris:[], cards:[], quest:[], vistos:{} }); }
  function poe(a, tipo, obj, chave){ var e = ent(a); if(e.vistos[tipo + chave]) return; e.vistos[tipo + chave] = 1; e[tipo].push(obj); }
  var temas = window.NEXO_TEMAS || {};
  Object.keys(temas).forEach(function(tid){
    var T = temas[tid]; if(!T || !T.lei) return;
    var ix = {}; (T.juris || []).forEach(function(j){ ix[j.id] = j; });
    var cx = {}; (T.cards || []).forEach(function(c){ cx[c.id] = c; });
    T.lei.forEach(function(g){
      if(String(g.art).indexOf(lei.prefixo) !== 0) return;
      (g.itens || []).forEach(function(it){
        var m = /^Art\.\s*(\d+)\s*º?\s*(?:-\s*([A-Z]))?/.exec(it.rot || ''); if(!m) return;
        var a = 'a' + m[1] + (m[2] || '');
        (it.c || []).forEach(function(id){ if(cx[id]) poe(a, 'cards', { T:tid, c:cx[id] }, tid + id); });
        (it.j || []).forEach(function(id){ if(ix[id]) poe(a, 'juris', { T:tid, j:ix[id] }, tid + id); });
        (T.cards || []).forEach(function(c){ if((c.lei || []).indexOf(it.id) >= 0) poe(a, 'cards', { T:tid, c:c }, tid + c.id); });
        (T.juris || []).forEach(function(j){ if((j.lei || []).indexOf(it.id) >= 0) poe(a, 'juris', { T:tid, j:j }, tid + j.id); });
        (T.questoes || []).forEach(function(q){ if((q.lei || []).indexOf(it.id) >= 0) poe(a, 'quest', { T:tid, q:q }, tid + q.id); });
      });
    });
  });
  lei._lig = lig; return lig;
}

/* ---------- texto: grifos e busca ---------- */
function marcasDe(a, i){ return ((marcas[S.leiId] || []).filter(function(m){ return m.a === a && m.i === i; })).sort(function(x, y){ return x.s - y.s; }); }
function destaca(txt, q){
  if(!q) return esc(txt);
  var f = fold(txt), out = '', pos = 0, idx;
  while((idx = f.indexOf(q, pos)) >= 0){ out += esc(txt.slice(pos, idx)) + '<mark class="vd-busca">' + esc(txt.slice(idx, idx + q.length)) + '</mark>'; pos = idx + q.length; }
  return out + esc(txt.slice(pos));
}
function textoHTML(txt, a, i, q){
  var ms = S.grifos ? marcasDe(a, i) : [];
  if(!ms.length) return destaca(txt, q);
  var out = '', pos = 0;
  ms.forEach(function(m){
    if(m.s < pos || m.e > txt.length) return;
    out += destaca(txt.slice(pos, m.s), q);
    out += '<span class="vd-m' + corClasse(m.c) + '"' + corStyle(m.c) + ' data-vd="marca" data-id="' + m.id + '">' + destaca(txt.slice(m.s, m.e), q) + (m.n ? '<sup class="vd-nm" title="Tem anotação">✎</sup>' : '') + '</span>';
    pos = m.e;
  });
  return out + destaca(txt.slice(pos), q);
}

/* ---------- desenho ---------- */
function artHTML(a, q){
  var lig = ligacoes(S.lei)[a.id] || { juris:[], cards:[], quest:[] };
  var todoRev = a.p.every(function(p){ return p.rev; });
  var h = '<article class="vd-art' + (todoRev ? ' vd-artrev' : '') + '" id="vd-' + a.id + '" data-art="' + a.id + '">';
  var numA = parseInt(a.n, 10);
  h += '<h3 class="vd-ah">Art. ' + esc(a.n) + (numA >= 10 ? '.' : '') + '</h3>';
  a.p.forEach(function(p, i){
    var rev = p.rev ? ' vd-rev' : '';
    var rot = p.k === 'cap' ? '' : (p.r ? '<b class="vd-r">' + esc(p.r) + '</b>' : '');
    var corpo = p.rev ? '<span class="vd-pt vd-revt">(Revogado)</span>' : '<span class="vd-pt" data-i="' + i + '">' + textoHTML(p.t, a.id, i, q) + '</span>';
    var vide = (p.n || []).filter(function(n){ return /^\(Vide/i.test(n); }), outras = (p.n || []).filter(function(n){ return !/^\(Vide/i.test(n); });
    var nk = 'n:' + a.id + ':' + i, nOn = S.aberto[nk];
    var info = outras.length ? '<button type="button" class="vd-i' + (nOn ? ' on' : '') + '" data-vd="nt" data-k="' + nk + '" aria-expanded="' + !!nOn + '" aria-label="Notas de alteração" title="Notas de alteração">i</button>' : '';
    var extra = (vide.length ? '<span class="vd-vide">' + vide.map(esc).join(' ') + '</span>' : '') + (nOn && outras.length ? '<span class="vd-alt">' + outras.map(esc).join(' ') + '</span>' : '');
    h += '<div class="vd-p vd-' + p.k + rev + '">' + (rot ? '<span class="vd-rl">' + rot + '</span>' : '') + '<div class="vd-pc"><p>' + corpo + info + '</p>' + extra + '</div></div>';
  });
  var bt = '';
  function botao(pane, nome, n){ if(!n) return ''; var on = S.aberto[a.id + ':' + pane]; return '<button type="button" class="vd-btn' + (on ? ' on' : '') + '" data-vd="pane" data-art="' + a.id + '" data-pane="' + pane + '" aria-expanded="' + !!on + '">' + nome + ' <b>' + n + '</b></button>'; }
  bt += botao('juris', 'Julgados', lig.juris.length) + botao('cards', 'Cards', lig.cards.length) + botao('quest', 'Questões', lig.quest.length);
  if(S.grifos) bt += '<button type="button" class="vd-btn' + (S.nota[a.id] ? ' on' : '') + '" data-vd="nota" data-art="' + a.id + '">' + (notas[S.leiId] && notas[S.leiId][a.id] ? 'Minha nota' : 'Nota') + '</button>';
  if(bt) h += '<div class="vd-acoes">' + bt + '</div>';
  if(S.grifos && (S.nota[a.id] || (notas[S.leiId] && notas[S.leiId][a.id]))){
    var nt = (notas[S.leiId] && notas[S.leiId][a.id]) || '';
    if(S.nota[a.id]) h += '<div class="vd-nota"><label>Minha nota sobre o art. ' + esc(a.n) + '</label><textarea data-vd="notatxt" data-art="' + a.id + '" rows="3" placeholder="Escreva sua anotação…">' + esc(nt) + '</textarea></div>';
    else h += '<div class="vd-nota ver" data-vd="nota" data-art="' + a.id + '"><b>Minha nota:</b> ' + esc(nt).replace(/\n/g, '<br>') + '</div>';
  }
  if(S.aberto[a.id + ':juris'] && lig.juris.length) h += '<div class="vd-pane">' + lig.juris.map(function(o){ return jHTML(o); }).join('') + '</div>';
  if(S.aberto[a.id + ':cards'] && lig.cards.length) h += '<div class="vd-pane">' + lig.cards.map(function(o){ return cHTML(o); }).join('') + '</div>';
  if(S.aberto[a.id + ':quest'] && lig.quest.length) h += '<div class="vd-pane">' + lig.quest.map(function(o){ return qHTML(o); }).join('') + '</div>';
  return h + '</article>';
}
function jHTML(o){
  var j = o.j, k = 'j:' + o.T + ':' + j.id, on = S.aberto[k];
  var h = '<div class="vd-j"><button type="button" class="vd-jh" data-vd="tog" data-k="' + k + '" aria-expanded="' + !!on + '"><span class="vd-trib">' + esc(j.trib) + '</span><span class="vd-jt">' + esc(j.titulo) + '<small>' + esc(j.tipo) + ' · ' + esc(j.num) + '</small></span><span class="vd-st vd-st-' + j.status + '">' + (STATUS[j.status] || '') + '</span></button>';
  if(on){
    h += '<div class="vd-jb"><blockquote>' + esc(j.texto) + '</blockquote>' + (j.explica ? '<p>' + esc(j.explica) + '</p>' : '') +
      '<div class="vd-fonte">' + (j.data ? esc(j.data) + ' · ' : '') + (j.fonte ? '<a href="' + esc(j.fonte) + '" target="_blank" rel="noopener noreferrer">Conferir na fonte ↗</a>' : '') + '</div></div>';
  }
  return h + '</div>';
}
function cHTML(o){
  var c = o.c, k = 'c:' + o.T + ':' + c.id, on = S.aberto[k];
  return '<button type="button" class="vd-card' + (on ? ' vira' : '') + '" data-vd="tog" data-k="' + k + '"><span class="vd-ct">' + esc(TIPO_CARD[c.tipo] || 'Card') + (on ? ' · resposta' : '') + '</span><span>' + (on ? c.v : c.f) + '</span><small>' + (on ? 'Toque para voltar' : 'Toque para ver a resposta') + '</small></button>';
}
function qHTML(o){
  var q = o.q, k = 'q:' + o.T + ':' + q.id, esc2 = S.aberto[k], ce = q.ops.length === 2;
  var h = '<div class="vd-q"><div class="vd-qh">' + esc(q.banca) + ' ' + esc(q.ano) + ' · ' + esc(q.cargo || '') + '</div><p>' + esc(q.enun) + '</p>';
  q.ops.forEach(function(op, i){
    var key = ce ? (i === 0 ? 'C' : 'E') : 'ABCDE'.charAt(i);
    var cls = esc2 ? (key === q.gab ? ' ok' : (key === esc2 ? ' no' : '')) : '';
    h += '<button type="button" class="vd-op' + cls + '" data-vd="resp" data-k="' + k + '" data-r="' + key + '"><b>' + key + '</b><span>' + esc(op) + '</span></button>';
  });
  if(esc2) h += '<div class="vd-com"><b>Gabarito: ' + esc(q.gab) + '.</b> ' + (q.com || '') + '</div>';
  return h + '</div>';
}

function filtrar(){
  var q = fold(S.busca.trim()), arts = S.lei.itens.filter(function(x){ return x.k === 'art'; });
  if(!q) return { q:'', lista:null };
  var m = /^(?:art(?:igo)?s?\.?\s*)?(\d+)\s*[º°o]?\s*-?\s*([a-z])?$/.exec(q);
  if(m){
    var n = m[1], letra = m[2] ? m[2].toUpperCase() : '';
    return { q:'', lista:arts.filter(function(a){ var mm = /^(\d+)º?(?:-([A-Z]))?$/.exec(a.n); return mm && mm[1] === n && (!letra || mm[2] === letra); }), num:true };
  }
  var ws = q.split(/\s+/).filter(Boolean);
  return { q:ws[0], todas:ws, lista:arts.filter(function(a){ var f = fold(a.p.map(function(p){ return p.t; }).join(' ')); return ws.every(function(w){ return f.indexOf(w) >= 0; }); }) };
}
function corpoHTML(){
  var f = filtrar(), h = '';
  if(f.lista){
    h += '<div class="vd-res">' + f.lista.length + (f.lista.length === 1 ? ' artigo encontrado' : ' artigos encontrados') + ' para “' + esc(S.busca.trim()) + '”. <button type="button" class="vd-link" data-vd="limpar">Limpar busca</button></div>';
    if(!f.lista.length) h += '<div class="vd-vazio">Nada encontrado. Tente o número do artigo (ex.: 17-B) ou outra palavra.</div>';
    f.lista.forEach(function(a){ h += artHTML(a, f.num ? '' : f.q); });
    return h;
  }
  S.lei.itens.forEach(function(x){
    if(x.k === 'art') h += artHTML(x, '');
    else h += '<div class="vd-nome vd-nome-' + x.k + (/revogad/i.test(x.s || '') ? ' vd-titrev' : '') + '"><b>' + esc(x.t) + '</b>' + (x.s ? '<span>' + esc(x.s) + '</span>' : '') + '</div>';
  });
  return h;
}
function indiceHTML(){
  var h = '<div class="vd-ih"><b>Sumário</b><button type="button" class="vd-ix" data-vd="indice" aria-label="Ocultar sumário" title="Ocultar sumário">✕</button></div><nav class="vd-idx" aria-label="Sumário da lei">';
  S.lei.itens.forEach(function(x){
    if(x.k === 'art') h += '<button type="button" class="vd-ia' + (x.p.every(function(p){ return p.rev; }) ? ' vd-artrev' : '') + '" data-vd="ir" data-art="' + x.id + '">' + esc(x.n) + '</button>';
    else h += '<div class="vd-ic vd-ic-' + x.k + (/revogad/i.test(x.s || '') ? ' vd-titrev' : '') + '"><b>' + esc(x.t) + '</b>' + (x.s ? ' ' + esc(x.s) : '') + '</div>';
  });
  return h + '</nav>';
}
function classes(){ return 'vd vd-t' + S.tam + (S.leitura ? ' vd-leitura' : '') + (S.semRev ? ' vd-semrev' : '') + (S.grifos ? ' vd-grifos' : '') + (S.indice ? ' vd-com-indice' : '') + (S.ver.acoes ? '' : ' vd-sem-acoes') + (S.ver.notas ? '' : ' vd-sem-notas') + (S.ver.ementa ? '' : ' vd-sem-ementa') + (S.ver.rodape ? '' : ' vd-sem-rodape'); }
function leiHTML(){
  var n = (marcas[S.leiId] || []).length;
  return '<div class="' + classes() + '" id="vd-raiz">' +
    '<div class="vd-barra">' +
      '<div class="vd-b2"><button type="button" class="vd-link" data-vd="voltar" aria-label="Voltar para a lista de leis">←</button><span class="vd-nome">' + esc(S.lei.nome) + '</span>' +
        '<input type="search" id="vd-busca" placeholder="Buscar artigo ou palavra…" value="' + esc(S.busca) + '" autocomplete="off" aria-label="Buscar na lei">' +
        '<button type="button" class="vd-t" data-vd="indice" aria-pressed="' + S.indice + '">Sumário</button>' +
        '<button type="button" class="vd-t vd-tb" data-vd="ferr" aria-pressed="' + S.ferr + '" aria-label="Ferramentas" title="Ferramentas">⚙</button></div>' +
      '<div class="vd-ferr"' + (S.ferr ? '' : ' hidden') + '>' +
        '<p class="vd-fh">Ferramentas</p>' +
        '<button type="button" class="vd-t" data-vd="leitura" aria-pressed="' + S.leitura + '">Modo leitura</button>' +
        '<button type="button" class="vd-t" data-vd="semrev" aria-pressed="' + S.semRev + '">Ocultar revogados</button>' +
        '<button type="button" class="vd-t" data-vd="grifos" aria-pressed="' + S.grifos + '">' + (S.grifos ? 'Grifos visíveis' : 'Grifos ocultos') + (n ? ' · ' + n : '') + '</button>' +
        '<span class="vd-tamb"><button type="button" class="vd-t" data-vd="tam-" aria-label="Diminuir letra">A−</button><button type="button" class="vd-t" data-vd="tam+" aria-label="Aumentar letra">A+</button></span>' +
        '<p class="vd-fh">Mostrar na tela</p>' +
        [['acoes','Botões Julgados · Cards · Questões · Nota'],['notas','Notas de alteração e “Vide”'],['ementa','Ementa da lei'],['rodape','Rodapé com a fonte']].map(function(v){ return '<label class="vd-ck"><input type="checkbox" data-vd="ver" data-k="' + v[0] + '"' + (S.ver[v[0]] ? ' checked' : '') + '> ' + v[1] + '</label>'; }).join('') +
        '<p class="vd-fd">✎ Dica: selecione qualquer trecho da lei para grifar e anotar.</p>' +
      '</div>' +
    '</div>' +
    '<div class="vd-corpo"><div class="vd-ind">' + indiceHTML() + '</div><div class="vd-col">' +
      '<header class="vd-cab"><h2>' + esc(S.lei.titulo) + '</h2><p>' + esc(S.lei.ementa) + '</p></header>' +
      '<div id="vd-lista">' + corpoHTML() + '</div>' +
      '<footer class="vd-pe">Texto compilado conferido no <a href="' + esc(S.lei.fonte) + '" target="_blank" rel="noopener noreferrer">Planalto</a> (arquivo de ' + esc(S.lei.extraido) + '). Este texto não substitui o publicado no Diário Oficial. As notas de alteração abrem no botão “i” de cada dispositivo; os “Vide ADI” ficam visíveis (escondidos no modo leitura).</footer>' +
    '</div></div></div>';
}
function listaHTML(){
  return '<div class="vd vd-lista-leis"><div class="hero"><span class="badge b-green">VADE MECUM</span><h1>Vade Mecum</h1><p class="muted">Leis em texto compilado, com busca por artigo e modo leitura. Julgados, cards e questões ficam fechados e só abrem ao clicar. Grifos e notas só aparecem quando você liga o botão.</p></div>' +
    LEIS.map(function(l){ return '<button type="button" class="vd-lei card" data-vd="abrir" data-id="' + l.id + '"><b>' + esc(l.nome) + '</b><span class="muted">' + esc(l.sub) + '</span></button>'; }).join('') + '</div>';
}

/* ---------- navegação ---------- */
function head(t){ var h = document.getElementById('head'); if(h) h.textContent = t; }
function viewEl(){ return document.getElementById('view'); }
window.nexoVade = function(id){
  try{ closeMobileNav(); }catch(e){}
  setCur('vade'); try{ renderNav(); }catch(e){}
  head('Vade Mecum');
  if(!id){ S.leiId = null; viewEl().innerHTML = listaHTML(); return; }
  viewEl().innerHTML = '<div class="vd"><p class="muted">Carregando a lei…</p></div>';
  carregar(id, function(lei){
    S.leiId = id; S.lei = lei; S.busca = ''; S.aberto = {}; S.nota = {}; S.indice = window.innerWidth >= 1100 && pref.sumario !== false;
    head('Vade Mecum — ' + lei.nome);
    viewEl().innerHTML = leiHTML();
    var c = $('#view'); if(c) c.scrollTop = 0;
  }, function(){ viewEl().innerHTML = '<div class="vd"><div class="warn">Não consegui carregar esta lei agora. Tente de novo em instantes.</div><button type="button" class="vd-link" data-vd="voltar">← Leis</button></div>'; });
};
function refaz(){ var r = $('#vd-raiz'); if(!r) return; var y = scrollPai(r); var p = r.parentNode; var tmp = document.createElement('div'); tmp.innerHTML = leiHTML(); p.replaceChild(tmp.firstChild, r); restaura(y); var b = $('#vd-busca'); if(b && S.busca && document.activeElement !== b){ /* mantém o foco fora da busca */ } }
function scrollPai(el){ var n = el; while(n && n !== document.body){ if(n.scrollHeight > n.clientHeight + 4 && /(auto|scroll)/.test(getComputedStyle(n).overflowY)) return { n:n, y:n.scrollTop }; n = n.parentNode; } return { n:window, y:window.scrollY }; }
function restaura(s){ if(!s) return; if(s.n === window) window.scrollTo(0, s.y); else s.n.scrollTop = s.y; }
function refazArt(id){
  var el = document.getElementById('vd-' + id); if(!el) return refaz();
  var a = S.lei.itens.filter(function(x){ return x.id === id; })[0]; if(!a) return;
  var f = filtrar(); var tmp = document.createElement('div'); tmp.innerHTML = artHTML(a, f.lista && !f.num ? f.q : ''); el.parentNode.replaceChild(tmp.firstChild, el);
}
function refazLista(){ var l = $('#vd-lista'); if(l) l.innerHTML = corpoHTML(); }

/* ---------- grifos ---------- */
var pop = null, selAtual = null;
function fechaPop(){ if(pop){ pop.remove(); pop = null; } selAtual = null; }
function novoId(){ return Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }
function salvaMarcas(){ sv(K_MARCAS, marcas); }
function offsetEm(raiz, no, off){
  var w = document.createTreeWalker(raiz, NodeFilter.SHOW_TEXT, null), n, tot = 0;
  while((n = w.nextNode())){
    var nota = n.parentNode && n.parentNode.closest && n.parentNode.closest('.vd-nm');
    if(n === no) return tot + (nota ? 0 : off);
    if(!nota) tot += n.nodeValue.length;
  }
  if(no.nodeType === 1){ var t = 0; for(var i = 0; i < off && i < no.childNodes.length; i++){ var c = no.childNodes[i]; if(!(c.classList && c.classList.contains('vd-nm'))) t += c.textContent.length; } return t; }
  return tot;
}
function lerSelecao(){
  var s = window.getSelection(); if(!s || s.isCollapsed || !s.rangeCount) return null;
  var r = s.getRangeAt(0), ini = r.startContainer.nodeType === 3 ? r.startContainer.parentNode : r.startContainer, fim = r.endContainer.nodeType === 3 ? r.endContainer.parentNode : r.endContainer;
  var pt = ini.closest ? ini.closest('.vd-pt') : null, pf = fim.closest ? fim.closest('.vd-pt') : null;
  if(!pt || pt !== pf || !pt.closest('#vd-lista')) return null;
  var s0 = offsetEm(pt, r.startContainer, r.startOffset), e0 = offsetEm(pt, r.endContainer, r.endOffset);
  var art = pt.closest('.vd-art').getAttribute('data-art'), i = parseInt(pt.getAttribute('data-i'), 10);
  var a = S.lei.itens.filter(function(x){ return x.id === art; })[0]; if(!a) return null;
  var txt = a.p[i].t; if(e0 > txt.length) return null;
  while(s0 < e0 && /\s/.test(txt.charAt(s0))) s0++;
  while(e0 > s0 && /\s/.test(txt.charAt(e0 - 1))) e0--;
  if(e0 - s0 < 2) return null;
  return { a:art, i:i, s:s0, e:e0, rect:r.getBoundingClientRect() };
}
function abrePop(rect, existente, sel){
  fechaPop(); selAtual = sel || null;
  pop = document.createElement('div'); pop.className = 'vd-pop'; pop.setAttribute('role', 'dialog');
  function dot(k, nome, hex){ var on = existente && existente.c === (hex || k); return '<button type="button" class="vd-cor vd-d-' + k + (on ? ' on' : '') + '" data-vd="cor" data-c="' + (hex || k) + '" aria-label="' + nome + '" title="' + nome + '"' + (hex ? ' style="background:' + hex + '"' : '') + '>' + (on ? '<svg viewBox="0 0 12 12" width="12" height="12"><path d="M2.5 6.5l2.2 2.2 4.8-5" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>' : '') + '</button>'; }
  var h = '<div class="vd-pill"><div class="vd-cores">' + CORES.map(function(c){ return dot(c[0], c[1]); }).join('') +
    '<button type="button" class="vd-cor vd-mais" data-vd="mais" aria-label="Mais cores" title="Mais cores / personalizar">+</button></div>';
  if(existente) h += '<span class="vd-sep"></span><button type="button" class="vd-ib" data-vd="nota-pop" aria-label="Anotação" title="Anotação">✎</button><button type="button" class="vd-ib vd-del" data-vd="apagar" aria-label="Remover grifo" title="Remover grifo"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V4h6v3"/></svg></button>';
  h += '</div><div class="vd-extra" hidden><div class="vd-cores">' + CORES_X.map(function(c){ return dot(c[0], c[1], c[2]); }).join('') +
    '<label class="vd-cor vd-pers" title="Cor personalizada"><input type="color" data-vd="cor-livre" value="#ff8800" aria-label="Cor personalizada"></label></div></div>';
  if(existente) h += '<div class="vd-nt" hidden><textarea class="vd-pn" rows="2" placeholder="Anotação (opcional)">' + esc(existente.n || '') + '</textarea><button type="button" class="vd-link" data-vd="salvar-nota">Salvar nota</button></div>';
  pop.innerHTML = h; pop.setAttribute('data-id', existente ? existente.id : '');
  document.body.appendChild(pop);
  var w = Math.min(260, window.innerWidth - 16), left = Math.max(8, Math.min(rect.left + rect.width / 2 - w / 2, window.innerWidth - w - 8)), top = rect.bottom + 10;
  if(top + 120 > window.innerHeight) top = rect.top - 60;
  top = Math.max(8, Math.min(top, window.innerHeight - 120));
  pop.style.width = w + 'px'; pop.style.left = left + 'px'; pop.style.top = top + 'px';
}
function criaMarca(cor, nota){
  if(!selAtual) return;
  var L = marcas[S.leiId] = marcas[S.leiId] || [];
  var a = S.lei.itens.filter(function(x){ return x.id === selAtual.a; })[0], txt = a.p[selAtual.i].t;
  marcas[S.leiId] = L.filter(function(m){ return !(m.a === selAtual.a && m.i === selAtual.i && m.s < selAtual.e && m.e > selAtual.s); });
  marcas[S.leiId].push({ id:novoId(), a:selAtual.a, i:selAtual.i, s:selAtual.s, e:selAtual.e, c:cor, n:nota || '', t:txt.slice(selAtual.s, selAtual.e) });
  salvaMarcas(); var art = selAtual.a, liga = !S.grifos; if(liga){ S.grifos = true; salvaPref(); } fechaPop(); try{ window.getSelection().removeAllRanges(); }catch(e){}
  if(liga) refaz(); else refazArt(art); atualizaContador();
}
function atualizaContador(){ var b = $('[data-vd="grifos"]'); if(b){ var n = (marcas[S.leiId] || []).length; b.textContent = (S.grifos ? 'Grifos visíveis' : 'Grifos ocultos') + (n ? ' · ' + n : ''); } }

/* ---------- eventos ---------- */
var tSel = null;
document.addEventListener('selectionchange', function(){
  if(atual() !== 'vade') return;
  clearTimeout(tSel);
  tSel = setTimeout(function(){
    if(pop && pop.contains(document.activeElement)) return;
    var sel = lerSelecao();
    if(sel){ abrePop(sel.rect, null, sel); } else if(pop && !pop.getAttribute('data-id') && !(pop.contains(document.activeElement))) fechaPop();
  }, 350);
});
/* janelinha da anotação: aparece ao passar o cursor num grifo que tem nota */
var dica = null;
function fechaDica(){ if(dica){ dica.remove(); dica = null; } }
document.addEventListener('mouseover', function(e){
  if(atual() !== 'vade') return;
  var m = e.target.closest ? e.target.closest('.vd-m') : null;
  if(!m){ if(dica && !(e.target.closest && e.target.closest('.vd-dica-nota'))) fechaDica(); return; }
  var reg = (marcas[S.leiId] || []).filter(function(x){ return x.id === m.getAttribute('data-id'); })[0];
  if(!reg || !reg.n){ fechaDica(); return; }
  if(pop) return;
  fechaDica();
  dica = document.createElement('div'); dica.className = 'vd-dica-nota'; dica.textContent = reg.n;
  document.body.appendChild(dica);
  var r = m.getBoundingClientRect(), w = dica.offsetWidth, h = dica.offsetHeight;
  var top = r.top - h - 8; if(top < 8) top = r.bottom + 8;
  dica.style.left = Math.max(8, Math.min(r.left, window.innerWidth - w - 8)) + 'px'; dica.style.top = top + 'px';
});
document.addEventListener('scroll', fechaDica, true);
document.addEventListener('mousedown', function(e){
  var b = e.target.closest && e.target.closest('.vd-pop button'); if(b) e.preventDefault();
});
document.addEventListener('change', function(e){
  var t = e.target;
  if(t && t.getAttribute && t.getAttribute('data-vd') === 'ver'){ S.ver[t.getAttribute('data-k')] = t.checked; salvaPref(); var rv = $('#vd-raiz'); if(rv) rv.className = classes(); return; }
  if(t && t.getAttribute && t.getAttribute('data-vd') === 'cor-livre' && pop){
    var cor = t.value, pid = pop.getAttribute('data-id');
    if(pid){ var m = (marcas[S.leiId] || []).filter(function(x){ return x.id === pid; })[0]; if(m){ m.c = cor; salvaMarcas(); var art = m.a; fechaPop(); refazArt(art); } } else criaMarca(cor, '');
  }
});
document.addEventListener('input', function(e){
  var t = e.target;
  if(t && t.id === 'vd-busca'){
    S.busca = t.value; refazLista();
  } else if(t && t.getAttribute && t.getAttribute('data-vd') === 'notatxt'){
    var id = t.getAttribute('data-art'); notas[S.leiId] = notas[S.leiId] || {};
    if(t.value.trim()) notas[S.leiId][id] = t.value; else delete notas[S.leiId][id];
    sv(K_NOTAS, notas);
  }
});
document.addEventListener('click', function(e){
  if(atual() !== 'vade') return;
  var b = e.target.closest ? e.target.closest('[data-vd]') : null;
  if(!b){ if(pop && !pop.contains(e.target)) fechaPop(); if(S.ferr && !(e.target.closest && e.target.closest('.vd-ferr'))){ S.ferr = false; var fq = $('.vd-ferr'); if(fq) fq.hidden = true; var fb = $('[data-vd="ferr"]'); if(fb) fb.setAttribute('aria-pressed', 'false'); } return; }
  var acao = b.getAttribute('data-vd');
  if(pop && !pop.contains(b) && acao !== 'marca') fechaPop();
  switch(acao){
    case 'abrir': window.nexoVade(b.getAttribute('data-id')); break;
    case 'voltar': window.nexoVade(); break;
    case 'leitura': S.leitura = !S.leitura; salvaPref(); var r = $('#vd-raiz'); if(r) r.className = classes(); b.setAttribute('aria-pressed', S.leitura); break;
    case 'grifos': S.grifos = !S.grifos; salvaPref(); fechaPop(); refaz(); break;
    case 'semrev': S.semRev = !S.semRev; salvaPref(); var r5 = $('#vd-raiz'); if(r5) r5.className = classes(); b.setAttribute('aria-pressed', S.semRev); break;
    case 'ferr': S.ferr = !S.ferr; var fp = $('.vd-ferr'); if(fp) fp.hidden = !S.ferr; b.setAttribute('aria-pressed', S.ferr); break;
    case 'ver': break;
    case 'indice': S.indice = !S.indice; if(window.innerWidth >= 1100){ S.sumario = S.indice; salvaPref(); } var bi = $('[data-vd="indice"].vd-t'); if(bi) bi.setAttribute('aria-pressed', S.indice); var r2 = $('#vd-raiz'); if(r2) r2.className = classes(); b.setAttribute('aria-pressed', S.indice); break;
    case 'tam+': case 'tam-': S.tam = Math.max(-2, Math.min(4, S.tam + (acao === 'tam+' ? 1 : -1))); salvaPref(); var r3 = $('#vd-raiz'); if(r3) r3.className = classes(); break;
    case 'limpar': S.busca = ''; var i = $('#vd-busca'); if(i) i.value = ''; refazLista(); break;
    case 'ir':
      var id = b.getAttribute('data-art');
      if(S.busca){ S.busca = ''; var inp = $('#vd-busca'); if(inp) inp.value = ''; refazLista(); }
      var el = document.getElementById('vd-' + id); if(el) el.scrollIntoView({ behavior:'smooth', block:'start' });
      if(window.innerWidth < 900){ S.indice = false; var r4 = $('#vd-raiz'); if(r4) r4.className = classes(); }
      break;
    case 'pane': var k = b.getAttribute('data-art') + ':' + b.getAttribute('data-pane'); S.aberto[k] = !S.aberto[k]; refazArt(b.getAttribute('data-art')); break;
    case 'nt': var kn = b.getAttribute('data-k'); S.aberto[kn] = !S.aberto[kn]; refazArt(b.closest('.vd-art').getAttribute('data-art')); break;
    case 'tog': var kk = b.getAttribute('data-k'); S.aberto[kk] = !S.aberto[kk]; refazArt(b.closest('.vd-art').getAttribute('data-art')); break;
    case 'resp': var kr = b.getAttribute('data-k'); if(!S.aberto[kr]) S.aberto[kr] = b.getAttribute('data-r'); refazArt(b.closest('.vd-art').getAttribute('data-art')); break;
    case 'nota': var an = b.getAttribute('data-art'); S.nota[an] = !S.nota[an]; refazArt(an); break;
    case 'cor':
      var pn = pop && pop.querySelector('.vd-pn'), nt = pn ? pn.value : '', cor = b.getAttribute('data-c'), pid = pop && pop.getAttribute('data-id');
      if(pid){ var m = (marcas[S.leiId] || []).filter(function(x){ return x.id === pid; })[0]; if(m){ m.c = cor; if(pn) m.n = nt; salvaMarcas(); var art = m.a; fechaPop(); refazArt(art); } }
      else criaMarca(cor, nt);
      break;
    case 'mais': var ex = pop && pop.querySelector('.vd-extra'); if(ex) ex.hidden = !ex.hidden; break;
    case 'nota-pop': var nn = pop && pop.querySelector('.vd-nt'); if(nn){ nn.hidden = !nn.hidden; var ta = nn.querySelector('textarea'); if(!nn.hidden && ta) ta.focus(); } break;
    case 'cancela': fechaPop(); try{ window.getSelection().removeAllRanges(); }catch(e){} break;
    case 'salvar-nota':
      var pid2 = pop && pop.getAttribute('data-id'), m2 = (marcas[S.leiId] || []).filter(function(x){ return x.id === pid2; })[0];
      if(m2){ m2.n = pop.querySelector('.vd-pn').value; salvaMarcas(); var art2 = m2.a; fechaPop(); refazArt(art2); }
      break;
    case 'apagar':
      var pid3 = pop && pop.getAttribute('data-id'), m3 = (marcas[S.leiId] || []).filter(function(x){ return x.id === pid3; })[0];
      if(m3){ marcas[S.leiId] = marcas[S.leiId].filter(function(x){ return x.id !== pid3; }); salvaMarcas(); var art3 = m3.a; fechaPop(); refazArt(art3); atualizaContador(); }
      break;
    case 'marca':
      var mm = (marcas[S.leiId] || []).filter(function(x){ return x.id === b.getAttribute('data-id'); })[0];
      if(mm && S.grifos){ var rc = b.getBoundingClientRect(); abrePop(rc, mm, null); e.stopPropagation(); }
      break;
  }
});

/* ---------- entrada no menu ---------- */
var ICONE = '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3Z"/><path d="M5 17a3 3 0 0 1 3-3h11M10 8h5"/></svg>';
var renderNavAnterior = window.renderNav;
window.renderNav = function(){
  var r; try{ if(typeof renderNavAnterior === 'function') r = renderNavAnterior.apply(this, arguments); }catch(e){}
  var nav = document.getElementById('nav'); if(!nav) return r;
  $$('.nx-vade-nav', nav).forEach(function(x){ x.remove(); });
  var html = '<button type="button" class="primary-nav nx-nav-extra nx-vade-nav' + (atual() === 'vade' ? ' active' : '') + '" onclick="nexoVade()">' + ICONE + ' Vade Mecum</button>';
  var ref = $$('.primary-nav', nav).filter(function(b){ return /officialBank/.test(b.getAttribute('onclick') || ''); })[0];
  if(ref) ref.insertAdjacentHTML('afterend', html);
  else { var fw = nav.querySelector('.folder-wrap'); if(fw) fw.insertAdjacentHTML('beforebegin', html); else nav.insertAdjacentHTML('beforeend', html); }
  return r;
};
try{ renderNav(); }catch(e){}
})();
