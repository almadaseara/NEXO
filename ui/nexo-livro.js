/* NEXO — livro digital.
   Cada disciplina vira um livro; cada módulo é um capítulo, na ordem de aprendizagem do edital
   (data/trilha/*.js). Cada capítulo tem partes: Teoria, Lei seca, Jurisprudência e Questões.
   O aluno marca as partes como lidas (ou conclui pela trilha) e vê a porcentagem do capítulo e do
   livro. O progresso fica com os dados de estudo (ui/nexo-estudo.js), no navegador e na conta. */
(function(){
'use strict';

function E(){ return window.nexoEstudo; }
function escH(s){ return String(s == null ? '' : s).replace(/[&<>"']/g, function(c){ return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]; }); }
function mods(){ return typeof modules !== 'undefined' ? modules : []; }
function modulo(id){ return mods().find(function(m){ return m.id === id; }); }
function setCur(v){ try{ current = v; }catch(e){} }
function curAtual(){ try{ return current; }catch(e){ return null; } }
function temas(){ return window.NEXO_TEMAS || {}; }

var LIVROS = [
  { id:'penal', nome:'Direito Penal', sigla:'DP', cor:'var(--nx-d4,#1baf7a)', disc:'Direito Penal' },
  { id:'constitucional', nome:'Direito Constitucional', sigla:'DC', cor:'var(--nx-d1,#2a78d6)', disc:'Direito Constitucional' },
  { id:'administrativo', nome:'Direito Administrativo', sigla:'DA', cor:'var(--nx-d2,#eb6834)', disc:'Direito Administrativo' },
  { id:'medicina_legal', nome:'Medicina Legal', sigla:'ML', cor:'var(--nx-d3,#6250d6)', disc:'Medicina Legal' },
  { id:'proc_penal', nome:'Direito Processual Penal', sigla:'PP', cor:'var(--nx-d5,#0f8a8a)', disc:'Direito Processual Penal' },
  { id:'extravagante', nome:'Legislação Extravagante', sigla:'LE', cor:'#7a3f9b', disc:'Legislação Extravagante' },
  { id:'leg_geral', nome:'Legislação Geral', sigla:'LG', cor:'#4f7a3a', disc:'Legislação Geral' }
];
function livroDoModulo(m){ var d = (m && m.discipline) || 'Direito Constitucional'; return LIVROS.find(function(l){ return l.disc === d; }); }

/* ---------- capítulos: ordem do edital (aprendizagem), depois os demais módulos da disciplina ---------- */
function editalAtual(){
  var s = E() ? E().plano() : {}, id = (s.plan && s.plan.edital) || 'pcba';
  return (window.NEXO_EDITAIS || {})[id] || (window.NEXO_EDITAIS || {}).pcba;
}
var cacheCaps = {};
function capitulos(livroId){
  if(cacheCaps[livroId]) return cacheCaps[livroId];
  var L = LIVROS.find(function(l){ return l.id === livroId; }); if(!L) return [];
  var ED = editalAtual(), ordem = [];
  var d = ED && ED.disciplinas[livroId];
  if(d) d.topicos.forEach(function(t){ t[2].forEach(function(id){ if(ordem.indexOf(id) < 0 && modulo(id)) ordem.push(id); }); });
  /* módulo "guarda-chuva" (ex.: Crimes contra a Pessoa) entra antes dos seus subtemas */
  mods().forEach(function(m){
    if((m.discipline || 'Direito Constitucional') !== L.disc || ordem.indexOf(m.id) >= 0) return;
    var filho = mods().find(function(x){ return x.parent_subject && x.parent_subject === m.title; });
    var i = filho ? ordem.indexOf(filho.id) : -1;
    if(i >= 0) ordem.splice(i, 0, m.id); else ordem.push(m.id);
  });
  return (cacheCaps[livroId] = ordem);
}

/* ---------- partes de um capítulo ----------
   Teoria: uma parte por seção do tema ("1.2 Conceito e fontes - Teoria"); depois Lei seca,
   Jurisprudência e as questões separadas por banca ("Questões de provas - Assunto - FGV"). */
function palavras(s){ return String(s || '').replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length; }
function bancaQ(q){
  if(q.board) return String(q.board).toUpperCase();
  var r = String((q.source || '') + ' ' + (q.collection || '')).toUpperCase();
  if(r.indexOf('AOCP') >= 0) return 'AOCP'; if(/CEBRASPE|CESPE/.test(r)) return 'CEBRASPE'; if(r.indexOf('FGV') >= 0) return 'FGV';
  if(r.indexOf('FCC') >= 0) return 'FCC'; if(r.indexOf('VUNESP') >= 0) return 'VUNESP';
  return 'Outras bancas';
}
function curtoTitulo(t){ return String(t || '').replace(/<[^>]+>/g, '').replace(/\s*\((?:arts?\.|CP|CF|CPP|Lei)[^)]*\)\s*$/i, '').trim(); }
var cacheP = {};
function partes(m){
  var chaveC = m.id + ':' + (m.official_questions || []).length;
  if(cacheP[chaveC]) return cacheP[chaveC];
  var T = temas()[m.id], p = [], nomeCap = curtoTitulo(m.title);
  var EST = (window.NEXO_ESTUDO || {})[m.id];
  if(EST){
    /* Estudo completo: cada seção numerada (h3) vira uma parte de teoria, na lateral do capítulo */
    var cortes = [], rx = /<h3 id="([^"]+)"[^>]*>([\s\S]*?)<\/h3>/g, mm;
    while((mm = rx.exec(EST))) cortes.push({ id:mm[1], txt:mm[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim(), at:mm.index, fim:rx.lastIndex });
    cortes.forEach(function(c, i){
      var fim = i + 1 < cortes.length ? cortes[i + 1].at : EST.length;
      var w = palavras(EST.slice(c.fim, fim));
      p.push({ key:'estudo#' + c.id, tab:'estudo', est:c.id, teoria:true, nome:c.txt + ' - Teoria', min:Math.max(3, Math.round(w / 160)) });
    });
  }
  if(T && (T.secoes || []).length){
    T.secoes.forEach(function(sc){
      var w = (sc.rapido || []).reduce(function(a, x){ return a + palavras(x); }, 0) + (sc.teoria || []).reduce(function(a, bl){ return a + (bl.p || []).reduce(function(c, x){ return c + palavras(x); }, 0); }, 0) + (sc.pegadinhas || []).reduce(function(a, x){ return a + palavras(x); }, 0) + (sc.quadro ? palavras(JSON.stringify(sc.quadro.rows)) : 0);
      p.push({ key:'resumo#' + sc.id, tab:'resumo', sec:sc.id, teoria:true, nome:curtoTitulo(sc.titulo) + ' - Teoria', min:Math.max(3, Math.round(w / 160)) });
    });
    /* padrão NEXO de material: páginas de fechamento do capítulo (não entram em "teoria lida", para não zerar quem já leu) */
    [['_fecho1','Comparativo e nota de importância',['comparativo','importancia'],4],['_fecho2','Como cai em prova e pegadinhas',['prova','pegadinhas'],4],['_fecho3','Resumo e diagnóstico final',['resumo','diagnostico'],3]].forEach(function(f){
      p.push({ key:'resumo#' + f[0], tab:'resumo', blocos:f[2], nome:f[1] + ' - ' + nomeCap, min:f[3] });
    });
  }else if(!EST){
    p.push({ key:'resumo', tab:'resumo', teoria:true, nome:nomeCap + ' - Teoria', min:Math.max(5, Math.round((m.summary || []).reduce(function(a, x){ return a + palavras(x); }, 0) / 160)) });
  }
  var nLei = T ? (T.lei || []).reduce(function(a, g){ return a + (g.itens || []).reduce(function(c, i){ return c + palavras(i.t); }, 0); }, 0) : (m.law_items || []).reduce(function(a, x){ return a + palavras(x[1]); }, 0);
  if(nLei) p.push({ key:'lei', tab:'lei', nome:'Lei seca - ' + nomeCap, min:Math.max(3, Math.round(nLei / 120)) });
  var nJ = T ? (T.juris || []).length : (m.juris || []).length;
  if(nJ) p.push({ key:'juris', tab:'juris', nome:'Jurisprudência - ' + nomeCap, min:Math.max(3, nJ * 2) });
  var porBanca = {};
  (m.official_questions || []).forEach(function(q){ var b = bancaQ(q); porBanca[b] = (porBanca[b] || 0) + 1; });
  Object.keys(porBanca).sort(function(a, b){ return porBanca[b] - porBanca[a]; }).forEach(function(b){
    p.push({ key:'oficiais@' + b, tab:'oficiais', banca:b, questoes:true, nome:'Questões de provas - ' + nomeCap + ' - ' + (b === 'CEBRASPE' ? 'Cebraspe' : b), n:porBanca[b], min:porBanca[b] * 2 });
  });
  var nq = (T && (T.questoes || []).length) || (m.questions || []).length;
  if(nq) p.push({ key:'quest', tab:'quest', questoes:true, nome:'Questões do caderno - ' + nomeCap + ' - AOCP', n:nq, min:nq * 2 });
  return (cacheP[chaveC] = p);
}
function parteDe(m, key){ return partes(m).find(function(x){ return x.key === key; }) || partes(m).find(function(x){ return x.tab === key; }); }
/* minutos de leitura do capítulo (soma das partes) */
function minutos(m){ return Math.max(5, partes(m).reduce(function(a, p){ return a + (p.min || 0); }, 0)); }
function fmtTempo(min){ var h = Math.floor(min / 60), r = min % 60; return (h ? String(h).padStart(2, '0') + 'h ' : '') + String(r).padStart(2, '0') + 'min'; }

/* ---------- leitura ---------- */
function leitura(){ var s = E().plano(); return (s.progress && s.progress.leitura) || {}; }
function lido(mod, key){ return !!leitura()[mod + '|' + key]; }
function teoriaLida(mod){ var m = modulo(mod); if(!m) return false; var l = leitura(); return partes(m).filter(function(p){ return p.teoria; }).every(function(p){ return l[mod + '|' + p.key]; }); }
function marcar(mod, key, sim, silencioso){
  var s = E().plano(); s.progress = s.progress || {}; s.progress.leitura = s.progress.leitura || {};
  var k = mod + '|' + key;
  if(sim) s.progress.leitura[k] = s.progress.leitura[k] || Date.now(); else delete s.progress.leitura[k];
  if(sim) s.progress.ultimo = { mod:mod, key:key, t:Date.now() };
  E().salvarPlano(s);
  if(!silencioso) try{ document.dispatchEvent(new CustomEvent('nexo:leitura', { detail:{ mod:mod, key:key, lido:!!sim, teoria:teoriaLida(mod) } })); }catch(e){}
}
/* concluir pela trilha: toda a teoria e a lei seca do capítulo */
function marcarCapitulo(mod, sim){
  var m = modulo(mod); if(!m) return;
  var s = E().plano(); s.progress = s.progress || {}; s.progress.leitura = s.progress.leitura || {};
  partes(m).forEach(function(p){ if(p.teoria || p.tab === 'lei'){ var k = mod + '|' + p.key; if(sim) s.progress.leitura[k] = s.progress.leitura[k] || Date.now(); else delete s.progress.leitura[k]; } });
  E().salvarPlano(s);
}
function pctModulo(id){
  var m = modulo(id); if(!m) return 0;
  var ps = partes(m), l = leitura(), n = ps.filter(function(p){ return l[id + '|' + p.key]; }).length;
  return Math.round(n / ps.length * 100);
}
function pctLivro(livroId){
  var caps = capitulos(livroId), l = leitura(), tot = 0, feito = 0;
  caps.forEach(function(id){ partes(modulo(id)).forEach(function(p){ tot++; if(l[id + '|' + p.key]) feito++; }); });
  return tot ? Math.round(feito / tot * 100) : 0;
}
function proximo(mod, key){
  var m = modulo(mod), L = livroDoModulo(m), ps = partes(m), i = ps.findIndex(function(p){ return p.key === key; });
  if(i >= 0 && i < ps.length - 1) return { mod:mod, key:ps[i + 1].key };
  var caps = capitulos(L.id), j = caps.indexOf(mod);
  if(j >= 0 && j < caps.length - 1) return { mod:caps[j + 1], key:partes(modulo(caps[j + 1]))[0].key };
  return null;
}
function continuar(livroId){
  var caps = capitulos(livroId), l = leitura();
  for(var i = 0; i < caps.length; i++){
    var ps = partes(modulo(caps[i]));
    for(var k = 0; k < ps.length; k++) if(!l[caps[i] + '|' + ps[k].key]) return { mod:caps[i], key:ps[k].key };
  }
  return caps.length ? { mod:caps[0], key:partes(modulo(caps[0]))[0].key } : null;
}
/* abre o capítulo na parte pedida: aceita a chave da parte ("resumo#sec", "oficiais@FGV") ou só a aba */
var pedida = null;
function abrir(mod, key){
  var m = modulo(mod); if(!m) return;
  try{ document.dispatchEvent(new CustomEvent('nexo:livro-aberto', { detail:{ mod:mod } })); }catch(e){}
  var p = parteDe(m, key || partes(m)[0].key) || partes(m)[0];
  pedida = { mod:mod, key:p.key };
  if(typeof openModule === 'function') openModule(mod, p.tab);
}

/* ---------- ícones ---------- */
var IC = {
  livro:'<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5"/><path d="M9 7h7M9 10.5h5"/></svg>',
  seta:'<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 6 6 6-6 6"/></svg>',
  ok:'<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7"/></svg>',
  lista:'<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" aria-hidden="true"><path d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01"/></svg>',
  x:'<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>'
};
function anel(p, cor){
  var r = 9, c = 2 * Math.PI * r, f = c * (1 - p / 100);
  return '<svg class="lv-anel" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><circle cx="12" cy="12" r="' + r + '" fill="none" stroke="var(--nx-line)" stroke-width="2.6"/>'
    + (p ? '<circle cx="12" cy="12" r="' + r + '" fill="none" stroke="' + cor + '" stroke-width="2.6" stroke-linecap="round" stroke-dasharray="' + c.toFixed(2) + '" stroke-dashoffset="' + f.toFixed(2) + '" transform="rotate(-90 12 12)"/>' : '')
    + (p >= 100 ? '<path d="m8 12.3 2.7 2.7L16 9.6" fill="none" stroke="' + cor + '" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>' : '') + '</svg>';
}

/* ---------- painel "Capítulos deste livro" ao lado do conteúdo ---------- */
var pagina = { mod:null, tab:null }, abertos = {};
/* capítulo aberto: a escolha de quem lê vale; sem escolha, abre só o capítulo atual */
function capAberto(id, atual){ return (id in abertos) ? abertos[id] : atual; }
/* sumário lateral oculto só no computador; a escolha fica salva neste navegador */
function lateralOculto(){ try{ return localStorage.getItem('nexo_livro_lateral_oculto') === '1'; }catch(e){ return false; } }
function ocultarLateral(on){
  document.body.classList.toggle('lv-oculto', !!on);
  try{ localStorage.setItem('nexo_livro_lateral_oculto', on ? '1' : '0'); }catch(e){}
}
function computador(){ return window.matchMedia && window.matchMedia('(min-width:1101px)').matches; }
function lateralHTML(m, key){
  var L = livroDoModulo(m), caps = capitulos(L.id), pl = pctLivro(L.id), tl = caps.reduce(function(a, id){ return a + minutos(modulo(id)); }, 0);
  return '<div class="lv-topo"><span class="nt-sig" style="--c:' + L.cor + ';background:' + L.cor + '">' + icoDisc(L) + '</span><div><b>' + escH(L.nome) + '</b><small>Livro digital · ' + caps.length + ' capítulos</small></div><button type="button" class="lv-fechar" data-lv="fechar" aria-label="Ocultar capítulos" title="Ocultar capítulos">' + IC.x + '</button></div>'
    + '<div class="lv-tempo"><b>' + fmtTempo(minutos(m)) + '</b><span>Tempo estimado de leitura do capítulo</span><small>Livro inteiro: ' + fmtTempo(tl) + '</small></div>'
    + '<div class="lv-prog"><div class="lv-barra"><i style="width:' + pl + '%;background:' + L.cor + '"></i></div><span>' + pl + '% concluído</span></div>'
    + '<ol class="lv-caps">' + caps.map(function(id, i){
      var c = modulo(id), ps = partes(c), pc = pctModulo(id), atual = id === m.id, open = capAberto(id, atual);
      return '<li class="lv-cap' + (atual ? ' atual' : '') + '"><div class="lv-caprow">'
        + '<button type="button" class="lv-anelbtn" data-lv="capLido" data-mod="' + id + '" aria-pressed="' + (pc >= 100) + '" aria-label="' + (pc >= 100 ? 'Desmarcar capítulo como lido' : 'Marcar capítulo como lido') + '" title="' + (pc >= 100 ? 'Desmarcar capítulo' : 'Marcar capítulo como lido') + '">' + anel(pc, L.cor) + '</button>'
        + '<button type="button" class="lv-caph" data-lv="cap" data-mod="' + id + '" aria-expanded="' + !!open + '"><span><b>' + (i + 1) + '. ' + escH(c.title) + '</b><small>' + minutos(c) + ' min de leitura' + (pc ? ' · ' + pc + '%' : '') + '</small></span>' + IC.seta + '</button>'
        + '</div>'
        + (open ? '<ol class="lv-partes">' + ps.map(function(p, k){
          var l = lido(id, p.key), aqui = atual && p.key === key;
          return '<li class="lv-prow"><button type="button" class="lv-pdot' + (l ? ' on' : '') + '" data-lv="parteLido" data-mod="' + id + '" data-key="' + escH(p.key) + '" aria-pressed="' + !!l + '" aria-label="' + (l ? 'Desmarcar como lida' : 'Marcar como lida') + '" title="' + (l ? 'Desmarcar como lida' : 'Marcar como lida') + '">' + (l ? IC.ok : '') + '</button><button type="button" class="lv-parte' + (aqui ? ' aqui' : '') + (l ? ' lida' : '') + (p.questoes ? ' q' : '') + '" data-lv="parte" data-mod="' + id + '" data-key="' + escH(p.key) + '"' + (aqui ? ' aria-current="page"' : '') + '><span>' + (i + 1) + '.' + (k + 1) + ' ' + escH(p.nome) + (p.n ? ' <small>(' + p.n + ')</small>' : '') + '</span></button></li>';
        }).join('') + '</ol>' : '') + '</li>';
    }).join('') + '</ol>';
}
function rodapeHTML(m, key){
  var L = livroDoModulo(m), prox = proximo(m.id, key), l = lido(m.id, key), p = parteDe(m, key);
  if(!p) return '';
  var ci = capitulos(L.id).indexOf(m.id) + 1, pi = partes(m).indexOf(p) + 1;
  var nomeProx = prox ? (prox.mod === m.id ? ci + '.' + (partes(m).findIndex(function(x){ return x.key === prox.key; }) + 1) + ' ' + parteDe(m, prox.key).nome : 'Capítulo ' + (capitulos(L.id).indexOf(prox.mod) + 1) + ': ' + modulo(prox.mod).title) : '';
  p = Object.assign({}, p, { nome:ci + '.' + pi + ' ' + p.nome });
  return '<div class="lv-fim" data-nx-skip><label class="lv-lido"><input type="checkbox" data-lv="lido"' + (l ? ' checked' : '') + '> Marcar "' + p.nome + '" como lido</label>'
    + (prox ? '<button type="button" class="nx-btn primary" data-lv="proximo">Concluir e carregar próximo<small>' + escH(nomeProx) + '</small></button>' : '<button type="button" class="nx-btn primary" data-lv="concluirLivro">Concluir o livro</button>') + '</div>';
}
function cabecalhoHTML(m, key){
  var L = livroDoModulo(m), caps = capitulos(L.id), i = caps.indexOf(m.id), p = parteDe(m, key), pi = partes(m).indexOf(p) + 1;
  return '<div class="lv-cab" data-nx-skip><span>Livro digital · ' + escH(L.nome) + ' · Capítulo ' + (i + 1) + ' de ' + caps.length + '</span><h2 class="lv-ptit">' + (i + 1) + '.' + pi + ' ' + escH(p ? p.nome : '') + '</h2><span class="lv-cab-pct">' + pctModulo(m.id) + '% do capítulo</span><button type="button" class="nx-btn small ghost lv-abrir" data-lv="abrirLateral">' + IC.lista + ' Capítulos</button></div>';
}
function montar(m, tab){
  var L = livroDoModulo(m); if(!L || capitulos(L.id).indexOf(m.id) < 0) { tirar(); return; }
  var rc = document.querySelector('#view .reading-content'); if(!rc) { tirar(); return; }
  /* qual parte está aberta: a pedida (se for desta aba) ou a primeira parte desta aba */
  var key = pedida && pedida.mod === m.id && parteDe(m, pedida.key) && parteDe(m, pedida.key).tab === tab ? pedida.key : null;
  if(!key && pagina.mod === m.id && pagina.key && parteDe(m, pagina.key) && parteDe(m, pagina.key).tab === tab) key = pagina.key;
  if(!key){ var pp = partes(m).find(function(x){ return x.tab === tab; }); key = pp ? pp.key : null; }
  pedida = null;
  if(!key){ tirar(); return; }
  var p = parteDe(m, key);
  pagina.mod = m.id; pagina.tab = tab; pagina.key = key;
  /* uma seção por página, como num livro */
  if(p.sec || p.blocos){
    var cards = rc.querySelectorAll('.tr-card[id^="tr-s-"]');
    Array.prototype.forEach.call(cards, function(c){ c.hidden = !p.sec || c.id !== 'tr-s-' + p.sec; });
    var barra = rc.querySelector('.tr-wrap > .tr-bar'); if(barra && cards.length) barra.hidden = true;
    Array.prototype.forEach.call(rc.querySelectorAll('[data-trbloco]'), function(b){ b.hidden = !(p.blocos && p.blocos.indexOf(b.getAttribute('data-trbloco')) >= 0); });
    var he = rc.querySelector('#tr-b-explicacao'); if(he) he.hidden = true;
  }
  if(p.est){
    /* seção do Estudo completo: a página inteira fica aberta e rola até a seção pedida */
    var alvo = p.est;
    setTimeout(function(){ var el = document.getElementById(alvo); if(el && el.scrollIntoView) try{ el.scrollIntoView({ block:'start' }); }catch(e){} }, 0);
  }
  if(p.banca){
    (m.official_questions || []).forEach(function(q, i){ var c = document.getElementById('card_official_' + m.id + '_' + i); var w = c && (c.closest('.practice-question-card') || c); if(w) w.hidden = bancaQ(q) !== p.banca; });
  }
  var lat = document.querySelector('.lv-lateral');
  if(!lat){ lat = document.createElement('div'); lat.className = 'lv-lateral'; lat.setAttribute('role', 'complementary'); lat.setAttribute('aria-label', 'Capítulos deste livro'); document.body.appendChild(lat); }
  lat.innerHTML = lateralHTML(m, key); lat.hidden = false;
  document.body.classList.add('lv-on');
  document.body.classList.toggle('lv-oculto', lateralOculto());
  rc.insertAdjacentHTML('afterbegin', cabecalhoHTML(m, key));
  rc.insertAdjacentHTML('beforeend', rodapeHTML(m, key));
  var at = lat.querySelector('.lv-parte.aqui') || lat.querySelector('.lv-cap.atual'); if(at && at.scrollIntoView) try{ at.scrollIntoView({ block:'nearest' }); }catch(e){}
  var v = document.getElementById('view'); if(v && pagina.rolar){ v.scrollTop = 0; pagina.rolar = false; }
}
function tirar(){ var lat = document.querySelector('.lv-lateral'); if(lat) lat.hidden = true; document.body.classList.remove('lv-on', 'lv-gaveta'); pagina.mod = null; }
function redesenharLateral(){
  var m = modulo(pagina.mod), lat = document.querySelector('.lv-lateral'); if(!m || !lat) return;
  lat.innerHTML = lateralHTML(m, pagina.key);
  var pc = document.querySelector('.lv-cab-pct'); if(pc) pc.textContent = pctModulo(m.id) + '% do capítulo';
  var ck = document.querySelector('[data-lv="lido"]'); if(ck) ck.checked = lido(m.id, pagina.key);
}

var rt = window.renderTab;
if(typeof rt === 'function'){
  window.renderTab = function(m, tab){
    var r = rt.apply(this, arguments);
    var aba = tab === 'questoes' ? (m && m.rich ? 'quest' : 'oficiais') : (tab || 'resumo');
    try{ montar(m, aba); }catch(e){}
    return r;
  };
}
new MutationObserver(function(){ if(!document.querySelector('#view .reading-content')) tirar(); }).observe(document.getElementById('view') || document.body, { childList:true });

document.addEventListener('click', function(e){
  var b = e.target.closest && e.target.closest('[data-lv]'); if(!b || b.tagName === 'INPUT') return;
  var a = b.dataset.lv;
  if(a === 'cap'){ var id = b.dataset.mod; abertos[id] = !capAberto(id, id === pagina.mod); redesenharLateral(); return; }
  /* bolinha do capítulo: marca ou desmarca todas as partes dele, sem abrir nem mudar de tela */
  if(a === 'capLido'){
    var idc = b.dataset.mod, mc = modulo(idc); if(!mc) return;
    var concluido = pctModulo(idc) >= 100;
    partes(mc).forEach(function(p){ marcar(idc, p.key, !concluido, true); });
    try{ document.dispatchEvent(new CustomEvent('nexo:leitura', { detail:{ mod:idc } })); }catch(e){}
    redesenharLateral(); return;
  }
  /* bolinha de uma parte: marca ou desmarca sem abrir a parte */
  if(a === 'parteLido'){
    var lp = lido(b.dataset.mod, b.dataset.key);
    marcar(b.dataset.mod, b.dataset.key, !lp, true);
    redesenharLateral(); return;
  }
  if(a === 'parte'){ document.body.classList.remove('lv-gaveta'); pagina.rolar = true; abrir(b.dataset.mod, b.dataset.key || b.dataset.tab); return; }
  if(a === 'proximo'){
    marcar(pagina.mod, pagina.key, true);
    var p = proximo(pagina.mod, pagina.key); if(p){ pagina.rolar = true; abrir(p.mod, p.key); }
    return;
  }
  if(a === 'concluirLivro'){ marcar(pagina.mod, pagina.key, true); window.nexoLivros(); return; }
  if(a === 'abrirLateral'){
    if(computador() && document.body.classList.contains('lv-oculto')){ ocultarLateral(false); return; }
    document.body.classList.toggle('lv-gaveta'); return;
  }
  if(a === 'fechar'){
    if(computador()){ ocultarLateral(true); return; }
    document.body.classList.remove('lv-gaveta'); return;
  }
  if(a === 'livro'){ var c = continuar(b.dataset.livro); if(c){ pagina.rolar = true; abrir(c.mod, c.key); } return; }
  if(a === 'sumario'){ var L = b.dataset.livro; abertosLivros[L] = !abertosLivros[L]; window.nexoLivros(); return; }
});
document.addEventListener('change', function(e){
  var el = e.target; if(!el.dataset || el.dataset.lv !== 'lido' || !pagina.mod) return;
  marcar(pagina.mod, pagina.key, el.checked); redesenharLateral();
});
document.addEventListener('nexo:estudo', function(e){ if(e.detail === 'sincronizado'){ if(pagina.mod) redesenharLateral(); if(curAtual() === 'livros') window.nexoLivros(); } });
document.addEventListener('nexo:leitura', function(){ if(pagina.mod) redesenharLateral(); });

/* ---------- página "Livros digitais" ---------- */
var abertosLivros = {};
function icoDisc(L){ try{ return window.nexoDisciplineSvg(window.nexoDisciplineIcon(L.nome)); }catch(e){ return ''; } }
var ICO_REVISAR = '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 12a8 8 0 0 1-13.7 5.6"/><path d="M4 12a8 8 0 0 1 13.7-5.6"/><path d="M18 3v4h-4"/><path d="M6 21v-4h4"/><path d="m9.5 14.5.5-2 4-4 1.5 1.5-4 4z"/></svg>';
var NOME_PRIO = { 3:'alta', 2:'média', 1:'baixa' };
function prioLivro(L){
  try{ var T = window.nexoTrilha; if(!T) return ''; var n = T.prioDisciplina(L.id); if(!n) return '';
    return '<p class="lv-prio" title="' + T.prioNome(n) + ' no edital"><i class="nt-pdot p' + n + '"></i>Prioridade ' + NOME_PRIO[n] + '</p>'; }catch(e){ return ''; }
}
window.nexoLivros = function(){
  try{ if(typeof closeMobileNav === 'function') closeMobileNav(); }catch(e){}
  setCur('livros'); try{ renderNav(); }catch(e){}
  var h = document.getElementById('head'); if(h) h.textContent = 'Livros digitais';
  var cards = LIVROS.map(function(L){
    var caps = capitulos(L.id), pl = pctLivro(L.id), c = continuar(L.id), tm = caps.reduce(function(s, id){ return s + minutos(modulo(id)); }, 0);
    var cm = c && modulo(c.mod), ci = c ? caps.indexOf(c.mod) + 1 : 0, aberto = abertosLivros[L.id];
    return '<section class="lv-livro" style="--c:' + L.cor + '"><div class="lv-capa"><span class="lv-capa-sig">' + icoDisc(L) + '</span><span class="lv-capa-tit">' + escH(L.nome) + '</span><span class="lv-capa-pct">' + pl + '%</span></div>'
      + '<div class="lv-info"><h2>' + escH(L.nome) + '</h2>' + prioLivro(L) + '<p class="nx-sub">' + caps.length + ' capítulos · cerca de ' + Math.round(tm / 60) + ' h de leitura</p>'
      + '<div class="lv-prog"><div class="lv-barra"><i style="width:' + pl + '%;background:' + L.cor + '"></i></div><span>' + pl + '% concluído</span></div>'
      + (cm ? '<p class="lv-cont">' + (pl ? 'Continue em' : 'Comece por') + ' <b>Capítulo ' + ci + ': ' + escH(cm.title) + '</b></p>' : '')
      + '<div class="nt-btns"><button type="button" class="nx-btn primary small" data-lv="livro" data-livro="' + L.id + '">' + (pl ? 'Continuar leitura' : 'Começar a ler') + '</button><button type="button" class="nx-btn ghost small" data-lv="sumario" data-livro="' + L.id + '" aria-expanded="' + !!aberto + '">' + (aberto ? 'Fechar sumário' : 'Ver sumário') + '</button></div>'
      + (aberto ? '<ol class="lv-sumario">' + caps.map(function(id, i){ var m = modulo(id), p = pctModulo(id); return '<li><button type="button" data-lv="parte" data-mod="' + id + '">' + anel(p, L.cor) + '<span>' + (i + 1) + '. ' + escH(m.title) + '</span><small>' + minutos(m) + ' min · ' + p + '%</small></button></li>'; }).join('') + '</ol>' : '')
      + '</div></section>';
  }).join('');
  document.getElementById('view').innerHTML = '<div class="nx-page"><div class="nx-head"><div><h1>Livros digitais</h1><p>Cada disciplina organizada em capítulos, na ordem de estudo do edital. Marque as partes como lidas para acompanhar o quanto já concluiu.</p></div>'
    + '<div class="lv-revisar-wrap"><button type="button" class="nx-btn primary lv-revisar" onclick="nexoRevisarHub()" title="Domínio por disciplina e assunto, caderno de erros e flashcards">' + ICO_REVISAR + 'Revisar</button></div></div><div class="lv-livros">' + cards + '</div></div>';
};

/* entrada no menu lateral, logo depois de "Cronograma e trilha" */
var rn = window.renderNav;
if(typeof rn === 'function'){
  window.renderNav = function(){
    var r = rn.apply(this, arguments);
    try{
      var nav = document.getElementById('nav'); if(!nav || nav.querySelector('.lv-nav')) return r;
      var ref = nav.querySelector('.nt-nav') || nav.querySelector('.primary-nav');
      var html = '<button type="button" class="primary-nav nx-nav-extra lv-nav' + ((curAtual() === 'livros' || curAtual() === 'revisar-aluno') ? ' active' : '') + '" onclick="nexoLivros()">' + IC.livro + ' Livros digitais</button>';
      if(ref) ref.insertAdjacentHTML('afterend', html);
      if(curAtual() === 'livros') Array.prototype.forEach.call(nav.querySelectorAll('.primary-nav.active:not(.lv-nav)'), function(x){ x.classList.remove('active'); });
    }catch(e){}
    return r;
  };
}

window.nexoLivro = { livros:LIVROS, capitulos:capitulos, partes:partes, minutos:minutos, lido:lido, marcar:marcar, marcarCapitulo:marcarCapitulo, teoriaLida:teoriaLida, parteDe:parteDe, pctModulo:pctModulo, pctLivro:pctLivro, abrir:abrir, livroDoModulo:livroDoModulo, continuar:continuar,
  limparCache:function(){ cacheCaps = {}; } };
})();
