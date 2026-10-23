/* NEXO — cronograma de estudos e trilha (plano completo até concluir as matérias).
   - O aluno escolhe o concurso (edital), o cargo, os dias, o tempo de cada dia e as disciplinas.
   - O programa de cada edital fica em data/trilha/<edital>.js (window.NEXO_EDITAIS). Para um novo
     concurso, basta criar o arquivo com os cargos e tópicos e ligar os tópicos aos módulos do NEXO.
   - A unidade de estudo é o CAPÍTULO do livro digital (cada módulo). Tópico sem módulo vira uma
     unidade "estude pelo seu material".
   - O plano é montado semana a semana até todas as unidades serem estudadas (e, se sobrar tempo,
     revisões até a prova). A cada nova semana o restante é recalculado com o que foi feito de fato.
   - Concluir a tarefa marca a teoria do capítulo como lida no livro, e ler a teoria no livro conclui
     a tarefa. Dados do aluno: ui/nexo-estudo.js. */
(function(){
'use strict';

var EDS = window.NEXO_EDITAIS || {}; if(!EDS.pcba) return;
var ED = EDS.pcba;
var DIA = 864e5;
var DIAS = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
var DCURTO = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
var PRIO_MOD = { 'MUITO ALTA':3, 'ALTA':2, 'MÉDIA':2, 'COMPLEMENTAR':1 };
var PRIO_NOME = { 3:'Prioridade alta', 2:'Prioridade média', 1:'Prioridade baixa' };
var DISC_SITE = { penal:'Direito Penal', constitucional:'Direito Constitucional', administrativo:'Direito Administrativo', medicina_legal:'Medicina Legal' };
/* tópicos iguais em duas disciplinas do edital contam como um só */
var IGUAIS = { 'top:da-lopc':'top:lg-11370', 'top:da-6677':'top:lg-6677', 'top:le-racismo':'top:ig-7716' };
function ch(id){ return IGUAIS[id] || id; }
var TIPO = { estudo:'Estudo', revisao:'Revisão', reforco:'Revisão rápida', questoes:'Questões' };

function escH(s){ return String(s == null ? '' : s).replace(/[&<>"']/g, function(c){ return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]; }); }
function mods(){ return typeof modules !== 'undefined' ? modules : []; }
function modulo(id){ return mods().find(function(m){ return m.id === id; }); }
function E(){ return window.nexoEstudo; }
function LV(){ return window.nexoLivro; }
function hoje0(){ var d = new Date(); d.setHours(0, 0, 0, 0); return d.getTime(); }
function iso(t){ var d = new Date(t); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
function deIso(s){ var p = String(s).split('-'); return new Date(+p[0], +p[1] - 1, +p[2]).getTime(); }
function dm(t){ var d = new Date(t); return String(d.getDate()).padStart(2, '0') + '/' + String(d.getMonth() + 1).padStart(2, '0'); }
function dma(t){ return dm(t) + '/' + new Date(t).getFullYear(); }
function fmtMin(m){ m = Math.round(m); if(m < 60) return m + ' min'; var h = Math.floor(m / 60), r = m % 60; return h + 'h' + (r ? String(r).padStart(2, '0') : ''); }
function setCur(v){ try{ current = v; }catch(e){} }
function curAtual(){ try{ return current; }catch(e){ return null; } }
function clone(o){ return JSON.parse(JSON.stringify(o)); }
function usar(s){ var id = s && s.plan && s.plan.edital; ED = EDS[id] || EDS.pcba; return ED; }

/* ---------- programa: tópicos e unidades (capítulos) ---------- */
function topicos(discId){
  var d = ED.disciplinas[discId]; if(!d) return [];
  return d.topicos.map(function(t, i){
    var ms = t[2].filter(function(id){ return modulo(id); });
    var pr = ms.length ? Math.max.apply(null, ms.map(function(id){ return PRIO_MOD[modulo(id).priority] || 2; })) : t[3];
    return { id:t[0], nome:t[1], mods:ms, prio:pr, estimada:!ms.length, h:t[4], ordem:i, disc:discId };
  });
}
/* prioridade da disciplina: média da prioridade dos seus tópicos (3 alta, 2 média, 1 baixa) */
function prioDisciplina(discId){
  var ts = topicos(discId); if(!ts.length) return 0;
  var m = ts.reduce(function(a, t){ return a + t.prio; }, 0) / ts.length;
  return m >= 2.5 ? 3 : m >= 1.75 ? 2 : 1;
}
function legendaPrio(){
  return '<span class="nt-leg" aria-label="Legenda de prioridade"><span><i class="nt-pdot p3"></i>Alta</span><span><i class="nt-pdot p2"></i>Média</span><span><i class="nt-pdot p1"></i>Baixa</span></span>';
}
function topico(id){ for(var k in ED.disciplinas){ var t = topicos(k).find(function(x){ return x.id === id; }); if(t) return t; } return null; }
/* palavras de estudo de um módulo (teoria + lei seca + julgados) */
function palavrasModulo(m){
  var T = (window.NEXO_TEMAS || {})[m.id], w = 0, c = function(s){ return String(s || '').replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length; };
  if(T){
    (T.secoes || []).forEach(function(s){ (s.rapido || []).forEach(function(x){ w += c(x); }); (s.teoria || []).forEach(function(b){ (b.p || []).forEach(function(x){ w += c(x); }); }); (s.pegadinhas || []).forEach(function(x){ w += c(x); }); });
    (T.lei || []).forEach(function(g){ (g.itens || []).forEach(function(i){ w += c(i.t); }); });
    (T.juris || []).forEach(function(j){ w += c(j.texto) + c(j.explica); });
  }else{ (m.summary || []).forEach(function(x){ w += c(x); }); (m.law_items || []).forEach(function(x){ w += c(x[1]); }); }
  return w;
}
/* unidades de estudo de uma disciplina, na ordem de aprendizagem */
var cacheUn = {};
function unidades(discId){
  var k = ED.id + ':' + discId; if(cacheUn[k]) return cacheUn[k];
  var vistos = {}, r = [];
  topicos(discId).forEach(function(t){
    if(t.mods.length){
      t.mods.forEach(function(id){
        if(vistos[id]) return; vistos[id] = 1;
        var m = modulo(id), pr = PRIO_MOD[m.priority] || t.prio;
        /* estudo ativo (ler, marcar, entender) ~ 90 palavras por minuto, mais 15 min de questões */
        var min = Math.max(30, Math.round(palavrasModulo(m) / 90 / 5) * 5) + (temQuestoes(id) ? 15 : 10);
        r.push({ id:'cap:' + id, mod:id, top:t.id, disc:discId, nome:m.title, prio:pr, estimada:false, min:min });
      });
    }else{
      var f = t.prio >= 3 ? 1 : t.prio === 2 ? .9 : .7;
      r.push({ id:'top:' + t.id, mod:null, top:t.id, disc:discId, nome:t.nome, prio:t.prio, estimada:true, min:Math.max(30, Math.round(t.h * 60 * f / 5) * 5) + (discId === 'atualidades' ? 0 : 15) });
    }
  });
  return (cacheUn[k] = r);
}
function unidade(id){ for(var k in ED.disciplinas){ var u = unidades(k).find(function(x){ return x.id === id; }); if(u) return u; } return null; }
function temQuestoes(mod){ var m = modulo(mod); if(!m) return false; var T = (window.NEXO_TEMAS || {})[mod]; return !!((m.official_questions || []).length || (m.questions || []).length || (T && (T.questoes || []).length)); }
function abaQuestoes(mod){ var m = modulo(mod); if(!m) return null; if((m.official_questions || []).length) return 'oficiais'; var T = (window.NEXO_TEMAS || {})[mod]; if((m.questions || []).length || (T && (T.questoes || []).length)) return 'quest'; return null; }
function numCap(mod){ var m = modulo(mod), L = LV() && LV().livroDoModulo(m); if(!L) return null; var i = LV().capitulos(L.id).indexOf(mod); return i >= 0 ? i + 1 : null; }
function discsDoCargo(cargo){ var c = ED.cargos[cargo] || ED.cargos[Object.keys(ED.cargos)[0]]; return { gerais:c.gerais.slice(), especificos:c.especificos.slice() }; }

/* ---------- progresso: tarefas feitas + "já estudei" + teoria lida no livro ---------- */
function progresso(st){
  var p = {}, reg = function(id){ return (p[id] = p[id] || { e:0, partes:0, r:0, u:0 }); };
  Object.keys(st.weeks || {}).forEach(function(k){
    (st.weeks[k].tarefas || []).forEach(function(t){
      if(!t.feito || !t.un) return;
      var x = reg(ch(t.un));
      if(t.tipo === 'estudo'){ x.partes = Math.max(x.partes, t.parte || 1); if((t.parte || 1) >= (t.partes || 1)) x.e = Math.max(x.e, t.feito); x.u = Math.max(x.u, t.feito); }
      if(t.tipo === 'revisao' || t.tipo === 'reforco'){ x.r++; x.u = Math.max(x.u, t.feito); }
    });
  });
  var ja = (st.plan && st.plan.ja) || {};
  Object.keys(ED.disciplinas).forEach(function(d){
    unidades(d).forEach(function(u){
      var t0 = ja[u.top] || ja[u.id];
      var lido = u.mod && teoriaLidaEm(st, u.mod);
      var quando = t0 || (st.__sim ? 0 : lido);
      if(quando){ var x = reg(ch(u.id)); if(!x.e){ x.e = quando; x.u = Math.max(x.u, quando); x.ja = !!t0; x.livro = !t0; } }
    });
  });
  return p;
}
/* a teoria do capítulo foi toda lida no livro? (todas as partes de teoria) */
function teoriaLidaEm(st, mod){
  var l = st.progress && st.progress.leitura, m = modulo(mod); if(!l || !m || !LV()) return 0;
  var ps = LV().partes(m).filter(function(p){ return p.teoria; }), t = 0;
  for(var i = 0; i < ps.length; i++){ var x = l[mod + '|' + ps[i].key]; if(!x) return 0; t = Math.max(t, x); }
  return t;
}
var INTERVALOS = [7, 15, 30];
function proximaRevisao(x, prio){ if(!x || !x.e) return null; if(x.r >= Math.max(1, Math.min(3, prio || 2))) return null; return x.u + INTERVALOS[Math.min(x.r, INTERVALOS.length - 1)] * DIA; }
function partesUn(u){ var n = Math.max(1, Math.ceil(u.min / 120)), cada = Math.round(u.min / n / 5) * 5, r = []; for(var i = 1; i <= n; i++) r.push({ min:cada, parte:i, partes:n }); return r; }
function fila(discId, prog){
  var us = unidades(discId).filter(function(u){ return !(prog[ch(u.id)] && prog[ch(u.id)].e); });
  if(discId === 'atualidades') return us.length ? us : unidades(discId);
  var base = unidades(discId)[0];
  return us.filter(function(u){ return u.prio > 1 || (base && u.id === base.id); }).concat(us.filter(function(u){ return u.prio <= 1 && !(base && u.id === base.id); }));
}
function restantesDoPlano(st, prog){
  return (st.plan.discs || []).filter(function(d){ return d !== 'atualidades' && ED.disciplinas[d]; }).reduce(function(s, d){ return s + unidades(d).filter(function(u){ return !(prog[ch(u.id)] && prog[ch(u.id)].e); }).length; }, 0);
}

/* ---------- uma semana ---------- */
function gerarSemana(st, inicio, op){
  op = op || {};
  var plan = st.plan, prog = progresso(st), uid = 0, manter = op.manter || [];
  var cap = [];
  for(var d = 0; d < 7; d++){ var t = inicio + d * DIA; cap.push(d < (op.desdeDia || 0) || t > deIso(ED.prova) ? 0 : +(plan.minutos[new Date(t).getDay()] || 0)); }
  manter.forEach(function(t){ if(t.d >= 0 && t.d < 7) cap[t.d] = Math.max(0, cap[t.d] - t.min); });
  var total = cap.reduce(function(a, b){ return a + b; }, 0);
  var nova = function(o){ o.id = 't' + (++uid) + '-' + Math.random().toString(36).slice(2, 7); o.feito = 0; return o; };

  /* 1. o que ficou por fazer na semana anterior entra primeiro */
  var antes = Object.keys(st.weeks || {}).sort().filter(function(k){ return deIso(k) < inicio; }).pop();
  var carregadas = antes && !op.semCarregar ? (st.weeks[antes].tarefas || []).filter(function(t){ return !t.feito && t.tipo !== 'questoes' && t.un && !(prog[t.un] && prog[t.un].e && t.tipo === 'estudo'); }).map(function(t){ var c = clone(t); c.pendente = 1; delete c.d; return nova(c); }) : [];
  var jaTem = {}; carregadas.concat(manter).forEach(function(t){ jaTem[t.un + ':' + t.tipo + ':' + (t.parte || 1)] = 1; });

  /* 2. revisões que vencem na semana (no máximo 30% do tempo; prioridade alta e mais atrasadas primeiro) */
  var cand = [];
  Object.keys(prog).forEach(function(id){
    var u = unidade(id); if(!u || u.disc === 'atualidades' || plan.discs.indexOf(u.disc) < 0 || jaTem[id + ':revisao:1']) return;
    var due = proximaRevisao(prog[id], u.prio); if(!due || due > inicio + 6 * DIA) return;
    cand.push({ u:u, due:due });
  });
  cand.sort(function(a, b){ return b.u.prio - a.u.prio || a.due - b.due; });
  var tetoRev = total * (op.soRevisao ? .7 : .3), somaRev = 0, revisoes = [];
  cand.forEach(function(x){
    var min = x.u.prio >= 3 ? 30 : 20; if(somaRev + min > tetoRev) return; somaRev += min;
    revisoes.push(nova({ tipo:'revisao', un:x.u.id, mod:x.u.mod, top:x.u.top, disc:x.u.disc, min:min, desde:Math.max(0, Math.floor((x.due - inicio) / DIA)) }));
  });

  /* 3. estudo novo: 60% específicos e 40% gerais, como na prova; rodízio pelo saldo da semana anterior */
  var usado = carregadas.concat(revisoes).reduce(function(s, t){ return s + t.min; }, 0);
  var orc = Math.max(0, total * (Object.keys(prog).length ? .8 : .88) - usado);
  var dc = discsDoCargo(plan.cargo);
  var g = dc.gerais.filter(function(x){ return plan.discs.indexOf(x) >= 0; }), e = dc.especificos.filter(function(x){ return plan.discs.indexOf(x) >= 0; });
  var pg = e.length && g.length ? .4 : 1, pe = e.length && g.length ? .6 : 1, peso = {};
  var soma = function(l){ return l.reduce(function(s, x){ return s + (x === 'atualidades' ? .5 : 1); }, 0); };
  g.forEach(function(x){ peso[x] = pg * (x === 'atualidades' ? .5 : 1) / soma(g); });
  e.forEach(function(x){ peso[x] = pe / soma(e); });
  var deficit = {}, filas = {}, travadas = {};
  Object.keys(peso).forEach(function(x){
    var saldo = antes && st.weeks[antes].saldo ? +(st.weeks[antes].saldo[x] || 0) : 0;
    deficit[x] = peso[x] * orc + Math.max(-150, Math.min(240, saldo));
    filas[x] = [];
    fila(x, prog).forEach(function(u){
      var feitas = (prog[ch(u.id)] || {}).partes || 0;
      partesUn(u).forEach(function(pt){ if(pt.parte > feitas && !jaTem[u.id + ':estudo:' + pt.parte]) filas[x].push({ u:u, pt:pt }); });
    });
  });
  /* com o conteúdo quase todo estudado, só sobra atualidades na fila: não deixa ela ocupar a semana toda */
  var naoAtual = Object.keys(filas).filter(function(x){ return x !== 'atualidades' && filas[x].length; }).length;
  if(!naoAtual) travadas.atualidades = 1;
  var estudos = [], resto = op.soRevisao ? 0 : orc, gastoG = 0, gastoE = 0;
  while(resto >= 25){
    var livres = Object.keys(deficit).filter(function(x){ return filas[x].length && !travadas[x]; });
    var lg = livres.filter(function(x){ return g.indexOf(x) >= 0; }), le = livres.filter(function(x){ return e.indexOf(x) >= 0; });
    var blocoG = lg.length && (!le.length || gastoG / pg <= gastoE / pe);
    var cd = (blocoG ? lg : le).sort(function(a, b){ return deficit[b] - deficit[a]; })[0];
    if(!cd) break;
    var it = filas[cd][0];
    if(it.pt.min > resto + 10){ travadas[cd] = 1; continue; }
    do{
      filas[cd].shift();
      estudos.push(nova({ tipo:'estudo', un:it.u.id, mod:it.u.mod, top:it.u.top, disc:cd, min:it.pt.min, parte:it.pt.parte, partes:it.pt.partes }));
      deficit[cd] -= it.pt.min; resto -= it.pt.min;
      if(g.indexOf(cd) >= 0) gastoG += it.pt.min; else gastoE += it.pt.min;
      var px = filas[cd][0];
      it = px && px.u.id === it.u.id && px.pt.min <= resto + 10 ? px : null;
    }while(it);
  }

  /* 4. distribuir nos dias, sem passar do tempo de cada dia */
  var livre = cap.slice(), porDia = [[], [], [], [], [], [], []];
  manter.forEach(function(t){ if(t.d >= 0 && t.d < 7) porDia[t.d].push(t); });
  function colocar(t, desde){
    for(var d = desde || 0; d < 7; d++){
      if(livre[d] >= t.min && porDia[d].filter(function(x){ return x.disc === t.disc; }).length < 2){ t.d = d; livre[d] -= t.min; porDia[d].push(t); return true; }
    }
    return false;
  }
  var naoCoube = [];
  carregadas.forEach(function(t){ if(!colocar(t, op.desdeDia || 0)) naoCoube.push(t); });
  revisoes.forEach(function(t){ if(!colocar(t, t.desde)) colocar(t, 0); });
  var restantes = estudos.slice(), reforcos = [];
  for(var dd = 0; dd < 7; dd++){
    var mudou = true;
    while(mudou){
      mudou = false;
      var vistas = {}, cabe = null;
      for(var i = 0; i < restantes.length; i++){
        var tt = restantes[i]; if(vistas[tt.disc]) continue; vistas[tt.disc] = 1;
        var jaHoje = porDia[dd].filter(function(x){ return x.disc === tt.disc; }).length;
        if(livre[dd] >= tt.min && jaHoje === 0){ cabe = tt; break; }
        if(!cabe && livre[dd] >= tt.min && jaHoje < 2 && porDia[dd].some(function(x){ return x.un === tt.un; })) cabe = tt;
      }
      if(cabe){
        cabe.d = dd; livre[dd] -= cabe.min; porDia[dd].push(cabe); restantes.splice(restantes.indexOf(cabe), 1); mudou = true;
        var un = unidade(cabe.un);
        if(cabe.parte === cabe.partes && un && un.prio >= 2 && cabe.disc !== 'atualidades') reforcos.push(nova({ tipo:'reforco', un:cabe.un, mod:cabe.mod, top:cabe.top, disc:cabe.disc, min:20, desde:dd + 2 }));
      }
    }
  }
  reforcos.forEach(function(t){ if(t.desde <= 6) colocar(t, t.desde); });

  /* 5. sobra do dia vira bloco de questões de um capítulo já estudado (de preferência com questões no NEXO) */
  var estudadas = [];
  Object.keys(prog).forEach(function(id){ var u = unidade(id); if(u && prog[id].e && u.disc !== 'atualidades' && plan.discs.indexOf(u.disc) >= 0) estudadas.push({ u:u, t:prog[id].e }); });
  porDia.forEach(function(l, di){ l.forEach(function(t){ if(t.tipo === 'estudo' && t.parte === t.partes){ var u = unidade(t.un); if(u && u.disc !== 'atualidades') estudadas.push({ u:u, t:inicio + di * DIA, dia:di }); } }); });
  var usadasQ = {};
  for(var d2 = 0; d2 < 7; d2++){
    if(livre[d2] < 25) continue;
    var opc = estudadas.filter(function(x){ return (x.dia == null || x.dia <= d2) && !usadasQ[x.u.id]; })
      .sort(function(a, b){ return (temQuestoes(b.u.mod) - temQuestoes(a.u.mod)) || (b.u.prio - a.u.prio) || (b.t - a.t); });
    var alvo = opc[0]; if(!alvo) continue;
    usadasQ[alvo.u.id] = 1;
    var min = Math.floor(Math.min(livre[d2], 45) / 5) * 5;
    porDia[d2].push(nova({ tipo:'questoes', un:alvo.u.id, mod:alvo.u.mod, top:alvo.u.top, disc:alvo.u.disc, min:min, d:d2 })); livre[d2] -= min;
  }
  var tarefas = [];
  porDia.forEach(function(l){ tarefas = tarefas.concat(l); });
  manter.forEach(function(t){ if(!(t.d >= 0 && t.d < 7)) tarefas.push(t); });
  restantes.concat(naoCoube).forEach(function(t){ deficit[t.disc] = (deficit[t.disc] || 0) + t.min; });
  var saldoNovo = {}; Object.keys(deficit).forEach(function(x){ saldoNovo[x] = Math.round(deficit[x]); });
  return { ini:iso(inicio), gerada:Date.now(), tarefas:tarefas, total:total, sobrou:restantes.length + naoCoube.length, saldo:saldoNovo };
}

/* ---------- o plano inteiro: semana a semana até concluir as matérias ---------- */
function gerarPlano(s, inicio){
  usar(s); s.weeks = s.weeks || {};
  var k0 = iso(inicio), manter = s.weeks[k0] ? (s.weeks[k0].tarefas || []).filter(function(t){ return t.feito; }) : [];
  Object.keys(s.weeks).forEach(function(k){ if(deIso(k) >= inicio) delete s.weeks[k]; });
  if(manter.length) s.weeks[k0] = { ini:k0, tarefas:manter };
  var sim = clone(s); sim.__sim = false;
  var prova = deIso(ED.prova), fimEstudo = null;
  for(var w = 0; w < 60; w++){
    var ini = inicio + w * 7 * DIA; if(ini > prova) break;
    var semana = gerarSemana(sim, ini, w === 0 ? { manter:manter, desdeDia:Math.max(0, Math.round((hoje0() - inicio) / DIA)) } : { semCarregar:false, soRevisao:fimEstudo != null });
    if(!semana.tarefas.length && fimEstudo != null) break;
    s.weeks[semana.ini] = semana;
    /* na simulação, supõe a semana cumprida para planejar a seguinte */
    var feita = clone(semana); feita.tarefas.forEach(function(t){ if(!t.feito) t.feito = ini + (t.d || 0) * DIA + 3600e3; });
    sim.weeks[semana.ini] = feita;
    if(fimEstudo == null && restantesDoPlano(sim, progresso(sim)) === 0) fimEstudo = ini + 6 * DIA;
    if(fimEstudo != null && ini >= prova - 7 * DIA) break;
    if(fimEstudo != null && !s.plan.revisarAteProva) break;
  }
  s.plan.fimPrevisto = fimEstudo; s.plan.replanejado = k0; s.plan.atualizado = Date.now();
  return s;
}

/* ---------- estado ---------- */
function st(){ var s = E().plano(); usar(s); return s; }
function semanaKeyDe(s, t){ return Object.keys(s.weeks || {}).sort().filter(function(k){ var x = deIso(k); return x <= t && t < x + 7 * DIA; }).pop() || null; }
function semanaAtualKey(s){ return semanaKeyDe(s, hoje0()) || Object.keys(s.weeks || {}).sort().pop() || null; }
/* uma vez por semana (ou se a semana atual ainda não existe), o resto do plano é recalculado com o que foi feito */
function replanejarSeNecessario(s){
  if(!s.plan) return false;
  var h = hoje0(), k = semanaKeyDe(s, h);
  if(k && s.plan.replanejado === k) return false;
  var ini = k ? deIso(k) : h;
  if(!k){ /* passou do fim do plano: começa uma semana nova hoje */ ini = h; }
  gerarPlano(s, ini); E().salvarPlano(s); return true;
}
var aba = 'semana', aberta = null, editando = false, vendoSemana = null;

/* ---------- telas ---------- */
var ICON = {
  lista:'<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m4 6 1.5 1.5L8 5M4 12l1.5 1.5L8 11M4 18l1.5 1.5L8 17M11 6h9M11 12h9M11 18h9"/></svg>',
  cal:'<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2.5"/><path d="M3 10h18M8 3v4m8-4v4"/><path d="m8.5 15 2 2 4-4"/></svg>',
  ok:'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7"/></svg>',
  esq:'<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 6-6 6 6 6"/></svg>',
  dir:'<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 6 6 6-6 6"/></svg>'
};
function contagem(){ return Math.ceil((deIso(ED.prova) - hoje0()) / DIA); }
function tituloTarefa(t){
  var u = t.un && unidade(t.un), n = t.mod && numCap(t.mod);
  return (n ? 'Cap. ' + n + ' · ' : '') + (u ? u.nome : '');
}
function subTarefa(t){
  var temQ = t.mod && temQuestoes(t.mod);
  if(t.tipo === 'estudo'){
    var base = t.mod ? 'Teoria e lei seca' + (temQ ? ' + questões do capítulo' : '') : (t.disc === 'atualidades' ? 'Leitura de notícias' : 'Estude pelo seu material + questões');
    return (t.partes > 1 ? 'Parte ' + t.parte + ' de ' + t.partes + ' · ' : '') + base;
  }
  if(t.tipo === 'questoes') return temQ ? 'Questões do capítulo' : 'Questões do assunto no seu material';
  return t.mod ? 'Releia seus grifos e refaça as questões' : 'Releia seu resumo e faça questões';
}

function telaConfig(s){
  var p = s.plan || { edital:'pcba', cargo:Object.keys(ED.cargos)[0], minutos:[0, 120, 120, 120, 120, 120, 180], discs:null };
  var dc = discsDoCargo(p.cargo), sel = p.discs || dc.gerais.concat(dc.especificos);
  var horas = [0, 30, 45, 60, 90, 120, 150, 180, 240, 300, 360, 480];
  var bloco = function(nome, lista, nota){
    return '<fieldset class="nt-disc"><legend>' + nome + ' <small>' + nota + '</small></legend>' + lista.map(function(id){
      var d = ED.disciplinas[id], comMat = topicos(id).some(function(t){ return t.mods.length; });
      return '<label class="nt-chk" style="--c:' + d.cor + '"><input type="checkbox" name="nt-disc" value="' + id + '"' + (sel.indexOf(id) >= 0 ? ' checked' : '') + '><span class="nt-sig">' + d.sigla + '</span><span>' + escH(d.nome) + (comMat ? '<small>livro digital no NEXO</small>' : '<small>sem material no NEXO ainda</small>') + '</span></label>';
    }).join('') + '</fieldset>';
  };
  var concursos = Object.keys(EDS).map(function(k){ var x = EDS[k]; return '<option value="' + k + '"' + (ED.id === k ? ' selected' : '') + '>' + escH(x.nome + ' · ' + x.banca) + '</option>'; }).join('');
  return '<form class="nt-form" id="nt-form">'
    + '<section class="nx-panel"><h2>1. Concurso e cargo</h2><p class="nx-sub">A trilha usa as disciplinas e os assuntos do edital do cargo escolhido. Quando um novo edital entrar na plataforma, ele aparece aqui.</p>'
    + '<label class="nt-concurso"><span>Concurso</span><select name="nt-edital">' + concursos + '</select></label>'
    + '<div class="nt-cargos">' + Object.keys(ED.cargos).map(function(k){ var c = ED.cargos[k]; return '<label class="nt-cargo"><input type="radio" name="nt-cargo" value="' + k + '"' + (p.cargo === k ? ' checked' : '') + '><b>' + c.nome + '</b><small>' + (c.vagas ? c.vagas + ' vagas · ' : '') + ED.banca + ' · prova em ' + dma(deIso(ED.prova)) + '</small></label>'; }).join('') + '</div></section>'
    + '<section class="nx-panel"><h2>2. Dias e tempo de estudo</h2><p class="nx-sub">Quanto tempo você consegue estudar em cada dia. Dia sem tempo fica de folga.</p><div class="nt-dias">'
    + [1, 2, 3, 4, 5, 6, 0].map(function(w){ return '<label class="nt-dia"><span>' + DIAS[w] + '</span><select name="nt-min-' + w + '">' + horas.map(function(m){ return '<option value="' + m + '"' + (+p.minutos[w] === m ? ' selected' : '') + '>' + (m ? fmtMin(m) : 'Folga') + '</option>'; }).join('') + '</select></label>'; }).join('')
    + '</div><p class="nt-total" id="nt-total"></p>'
    + '<label class="nt-revfinal"><input type="checkbox" name="nt-revisar"' + (p.revisarAteProva !== false ? ' checked' : '') + '> Depois de concluir o conteúdo, continuar com revisões e questões até a prova</label></section>'
    + '<section class="nx-panel"><h2>3. Disciplinas</h2><p class="nx-sub">' + (ED.provas ? 'Na prova são ' + ED.provas.gerais + ' questões de conhecimentos gerais e ' + ED.provas.especificos + ' de específicos; a trilha divide o tempo nessa proporção.' : '') + '</p><div id="nt-discs">'
    + bloco('Conhecimentos gerais', dc.gerais, ED.provas ? ED.provas.gerais + ' questões' : '') + bloco('Conhecimentos específicos', dc.especificos, ED.provas ? ED.provas.especificos + ' questões' : '') + '</div></section>'
    + '<div class="nt-acoes">' + (s.plan ? '<button type="button" class="nx-btn ghost" data-nt="cancelar">Cancelar</button>' : '') + '<button type="submit" class="nx-btn primary">' + (s.plan ? 'Salvar e recalcular o plano' : 'Montar meu plano de estudos') + '</button></div>'
    + '</form>';
}
function totalForm(){
  var f = document.getElementById('nt-form'); if(!f) return;
  var t = 0; for(var w = 0; w < 7; w++) t += +(f['nt-min-' + w].value || 0);
  var el = document.getElementById('nt-total'); if(el) el.textContent = t ? 'Total: ' + fmtMin(t) + ' por semana.' + (t < 600 ? ' Com menos de 10 horas por semana, o edital completo dificilmente termina antes da prova; o plano mostra a data prevista.' : '') : 'Escolha pelo menos um dia com tempo de estudo.';
}

function cartao(t){
  var d = ED.disciplinas[t.disc] || {}, exp = aberta === t.id;
  return '<article class="nt-task' + (t.feito ? ' done' : '') + (exp ? ' open' : '') + '" style="--c:' + (d.cor || '#888') + '" data-ntid="' + t.id + '">'
    + '<button type="button" class="nt-check" data-nt="feito" data-id="' + t.id + '" aria-pressed="' + !!t.feito + '" aria-label="' + (t.feito ? 'Desmarcar' : 'Marcar como feita') + '">' + ICON.ok + '</button>'
    + '<button type="button" class="nt-body" data-nt="abrirCard" data-id="' + t.id + '" aria-expanded="' + exp + '">'
    + '<span class="nt-meta"><span class="nt-sig">' + (d.sigla || '') + '</span><span>' + TIPO[t.tipo] + '</span><span>' + fmtMin(t.min) + '</span>' + (t.pendente ? '<span class="nt-pend">pendente</span>' : '') + '</span>'
    + '<b>' + escH(tituloTarefa(t)) + '</b><small>' + escH(subTarefa(t)) + '</small></button>'
    + (exp ? detalhe(t, d) : '') + '</article>';
}
/* aquecimento: o essencial do capítulo antes de ler (estudo) ou para revisar (revisão) */
function aquecimento(mod, antes){
  var T = (window.NEXO_TEMAS || {})[mod]; if(!T || !(T.secoes || []).length) return '';
  var ess = T.secoes.filter(function(x){ return x.rapido && x.rapido.length; }).slice(0, 8).map(function(x){ return '<li><b class="nt-aq-sec">' + x.curto + '</b> ' + x.rapido[0] + '</li>'; }).join('');
  var peg = []; T.secoes.forEach(function(x){ (x.pegadinhas || []).slice(0, 1).forEach(function(p){ peg.push(p); }); });
  peg = peg.slice(0, 4).map(function(p){ return '<li>' + p + '</li>'; }).join('');
  if(!ess && !peg) return '';
  return '<details class="nt-aquec"' + (antes ? ' open' : '') + '><summary>' + (antes ? 'Aquecimento · 2 minutos antes de ler' : 'Pontos-chave para revisar') + '</summary>'
    + (ess ? '<p class="nt-aq-lbl">' + (antes ? 'O que você vai encontrar no capítulo' : 'O essencial de cada parte') + '</p><ul>' + ess + '</ul>' : '')
    + (peg ? '<p class="nt-aq-lbl nt-aq-peg">Pegadinhas que mais caem</p><ul class="nt-aq-pegl">' + peg + '</ul>' : '') + '</details>';
}
function detalhe(t, d){
  var u = unidade(t.un), m = t.mod && modulo(t.mod), h = '<div class="nt-det">', abaQ = t.mod && abaQuestoes(t.mod);
  if(u) h += '<p class="nt-prio p' + u.prio + '">' + PRIO_NOME[u.prio] + (u.estimada ? ' (estimativa NEXO; a banca não publica estatística por assunto)' : '') + '</p>';
  if(m){
    var partes = LV() ? LV().partes(m) : [];
    if(t.tipo === 'estudo') h += '<p>Leia ' + (t.partes > 1 ? 'a parte ' + t.parte + ' do' : 'o') + ' capítulo ' + (numCap(t.mod) || '') + ' no livro digital: ' + partes.map(function(p){ return p.nome; }).join(', ') + '. Use "Marcar pontos importantes" na barra ao lado do texto e acrescente seus grifos.' + (abaQ ? ' Depois resolva as questões do capítulo.' : '') + '</p>';
    else if(t.tipo === 'questoes') h += '<p>' + (abaQ ? 'Resolva as questões do capítulo ' + (numCap(t.mod) || '') + '. Anote os erros: eles indicam o que revisar.' : 'Este capítulo ainda não tem questões no NEXO. Resolva questões do assunto no seu material.') + '</p>';
    else h += '<p>Releia seus grifos e o resumo "Em 30 segundos" de cada seção do capítulo e refaça as questões que errou.</p>';
  }else if(t.disc === 'atualidades'){
    h += '<p>Leia notícias de fontes confiáveis sobre o tema e anote o que pode virar questão (datas, números, nomes de leis e programas).</p>';
  }else{
    h += '<p>Este assunto ainda não tem livro digital no NEXO. Estude pelo seu material (livro, PDF ou videoaula), faça um resumo curto e resolva cerca de 10 questões da banca.</p><p class="nt-ed-txt">Do edital: ' + escH((topico(t.top) || {}).nome || '') + '</p>';
  }
  if(m && (t.tipo === 'estudo' || t.tipo === 'revisao' || t.tipo === 'reforco')) h += aquecimento(t.mod, t.tipo === 'estudo');
  h += '<div class="nt-btns">';
  if(m){
    if(t.tipo !== 'questoes') h += '<button type="button" class="nx-btn small primary" data-nt="estudar" data-id="' + t.id + '" data-tab="resumo">Abrir conteúdo</button>';
    if(abaQ) h += '<button type="button" class="nx-btn small' + (t.tipo === 'questoes' ? ' primary' : ' ghost') + '" data-nt="estudar" data-id="' + t.id + '" data-tab="' + abaQ + '">Questões do capítulo</button>';
    else if(DISC_SITE[t.disc]) h += '<button type="button" class="nx-btn small ghost" data-nt="praticar" data-id="' + t.id + '">Praticar questões</button>';
    if(t.tipo !== 'estudo') h += '<button type="button" class="nx-btn small ghost" onclick="nexoMeusGrifos()">Meus grifos</button>';
  }
  h += '<button type="button" class="nx-btn small ghost" data-nt="feito" data-id="' + t.id + '">' + (t.feito ? 'Desmarcar' : 'Concluir tarefa') + '</button></div></div>';
  return h;
}

function resumoPlano(s){
  var ks = Object.keys(s.weeks || {}).sort(), prog = progresso(s), falta = restantesDoPlano(s, prog);
  var tot = (s.plan.discs || []).filter(function(d){ return d !== 'atualidades' && ED.disciplinas[d]; }).reduce(function(a, d){ return a + unidades(d).length; }, 0);
  var feitos = tot - falta, pct = tot ? Math.round(feitos / tot * 100) : 0, fim = s.plan.fimPrevisto, prova = deIso(ED.prova);
  var aviso = !fim ? '<span class="nt-alerta">No ritmo atual, o conteúdo não termina antes da prova. Aumente o tempo por semana ou tire disciplinas.</span>'
    : fim > prova ? '<span class="nt-alerta">Conclusão prevista depois da prova.</span>' : '<span>Conclusão prevista do conteúdo: <b>' + dma(fim) + '</b>' + (prova - fim > 7 * DIA ? ', com ' + Math.floor((prova - fim) / 7 / DIA) + ' semanas para revisar antes da prova' : '') + '.</span>';
  return '<div class="nt-plano"><div><span class="nt-kicker">Plano completo · ' + ks.length + ' semanas</span><b>' + feitos + ' de ' + tot + ' capítulos e assuntos estudados (' + pct + '%)</b><div class="nt-bar"><i style="width:' + pct + '%"></i></div>' + aviso + '</div></div>';
}

function telaSemana(s){
  var k = vendoSemana && s.weeks[vendoSemana] ? vendoSemana : semanaAtualKey(s), w = k && s.weeks[k];
  if(!w) return '<div class="nx-empty">Ainda não há plano. <button type="button" class="nx-btn small primary" data-nt="gerar">Montar o plano</button></div>';
  var ks = Object.keys(s.weeks).sort(), idx = ks.indexOf(k), atual = semanaAtualKey(s);
  var ini = deIso(w.ini), feitas = w.tarefas.filter(function(t){ return t.feito; }), minF = feitas.reduce(function(a, t){ return a + t.min; }, 0), minT = w.tarefas.reduce(function(a, t){ return a + t.min; }, 0);
  var pct = minT ? Math.round(minF / minT * 100) : 0, fim = ini + 6 * DIA, h0 = hoje0();
  var nav = '<div class="nt-semnav"><button type="button" class="nx-btn ghost small" data-nt="sem" data-k="' + (ks[idx - 1] || '') + '"' + (idx > 0 ? '' : ' disabled') + ' aria-label="Semana anterior">' + ICON.esq + '</button>'
    + (k !== atual ? '<button type="button" class="nx-btn ghost small" data-nt="sem" data-k="' + atual + '">Semana atual</button>' : '')
    + '<button type="button" class="nx-btn ghost small" data-nt="sem" data-k="' + (ks[idx + 1] || '') + '"' + (idx < ks.length - 1 ? '' : ' disabled') + ' aria-label="Próxima semana">' + ICON.dir + '</button></div>';
  var cab = '<div class="nt-semhead"><div><span class="nt-kicker">Semana ' + (idx + 1) + ' de ' + ks.length + ' · ' + dm(ini) + ' a ' + dm(fim) + (k === atual ? ' · atual' : deIso(k) > h0 ? ' · prevista' : '') + '</span><h2>' + feitas.length + ' de ' + w.tarefas.length + ' tarefas</h2>'
    + '<div class="nt-bar" role="progressbar" aria-valuenow="' + pct + '" aria-valuemin="0" aria-valuemax="100"><i style="width:' + pct + '%"></i></div><p class="nx-sub">' + fmtMin(minF) + ' de ' + fmtMin(minT) + ' planejados</p></div>'
    + '<div class="nt-semacoes">' + nav + '<button type="button" class="nx-btn ghost small" data-nt="refazer">Recalcular a partir desta semana</button></div></div>';
  var colunas = '';
  for(var d = 0; d < 7; d++){
    var t = ini + d * DIA, lista = w.tarefas.filter(function(x){ return x.d === d; }), cap = +((s.plan.minutos || [])[new Date(t).getDay()] || 0);
    var usado = lista.reduce(function(a, x){ return a + x.min; }, 0);
    colunas += '<section class="nt-col' + (t === h0 ? ' hoje' : '') + (t < h0 ? ' passou' : '') + '"><div class="nt-colh"><b>' + DCURTO[new Date(t).getDay()] + ' ' + dm(t) + '</b><small>' + (cap ? fmtMin(usado) + ' de ' + fmtMin(cap) : 'Folga') + '</small></div>'
      + (lista.length ? lista.map(cartao).join('') : '<p class="nt-folga">' + (cap ? 'Sem tarefas' : 'Descanso') + '</p>') + '</section>';
  }
  return resumoPlano(s) + cab + '<div class="nt-semana">' + colunas + '</div>';
}

function telaPlano(s){
  var ks = Object.keys(s.weeks || {}).sort(), atual = semanaAtualKey(s);
  return resumoPlano(s) + '<ol class="nt-semanas">' + ks.map(function(k, i){
    var w = s.weeks[k], ini = deIso(k), est = w.tarefas.filter(function(t){ return t.tipo === 'estudo'; }), feitas = w.tarefas.filter(function(t){ return t.feito; }).length;
    var min = w.tarefas.reduce(function(a, t){ return a + t.min; }, 0), vistos = {};
    var chips = est.filter(function(t){ if(vistos[t.un]) return false; vistos[t.un] = 1; return true; }).map(function(t){ var d = ED.disciplinas[t.disc] || {}; return '<span class="nt-chip" style="--c:' + (d.cor || '#888') + '"><span class="nt-sig">' + (d.sigla || '') + '</span>' + escH(tituloTarefa(t)) + '</span>'; }).join('');
    var rev = w.tarefas.filter(function(t){ return t.tipo !== 'estudo'; }).length;
    return '<li class="nt-sem' + (k === atual ? ' atual' : '') + '"><button type="button" class="nt-semb" data-nt="sem" data-k="' + k + '"><span class="nt-semn">' + (i + 1) + '</span><span class="nt-semt"><b>' + dm(ini) + ' a ' + dm(ini + 6 * DIA) + (k === atual ? ' · semana atual' : '') + '</b><small>' + fmtMin(min) + ' · ' + est.length + ' estudos · ' + rev + ' revisões e questões' + (feitas ? ' · ' + feitas + ' feitas' : '') + '</small></span></button><div class="nt-chips">' + (chips || '<span class="nt-semmat">Revisões e questões</span>') + '</div></li>';
  }).join('') + '</ol>';
}


/* Seletor opcional: preserva o plano existente e a estrutura da aba. */
var editalSelecionadoLab=null;
function escolherEditalLab(s){
 var pref=window.nexoConcursosSelecionados&&window.nexoConcursosSelecionados(),items=pref&&pref.items||[];
 if(!items.length)return '';
 var ativo=editalSelecionadoLab||((s.plan||{}).edital)||pref.principal||items[0].id;
 return '<div class="nt-edtools"><label>Concurso e cargo <select id="nt-edital-lab-select">'+items.map(function(x){var ed=EDS[x.id],job=ed&&ed.cargos&&ed.cargos[x.cargo];return '<option value="'+escH(x.id)+'"'+(ativo===x.id?' selected':'')+'>'+escH(ed?ed.nome:x.id.toUpperCase())+' · '+escH(job?job.nome:x.cargo)+'</option>';}).join('')+'</select></label></div>';
}
function telaEditalLab(s){
 var pref=window.nexoConcursosSelecionados&&window.nexoConcursosSelecionados(),items=pref&&pref.items||[];
 var id=editalSelecionadoLab||((s.plan||{}).edital)||pref&&pref.principal;
 var sel=items.find(function(x){return x.id===id;});
 var selector=escolherEditalLab(s);
 if(!sel)return selector+telaEdital(s);
 var ed=EDS[sel.id],cargo=ed&&ed.cargos&&ed.cargos[sel.cargo];
 if(!cargo)return selector+'<p class="nt-aviso">O conteúdo programático deste cargo ainda não está cadastrado e conferido. Selecione um concurso com programa disponível.</p>';
 var anterior=ED;
 try{
   ED=ed;
   var mesmoPlano=!!(s.plan&&s.plan.edital===sel.id&&s.plan.cargo===sel.cargo);
   var atual=mesmoPlano?s:{plan:null,progress:{},weeks:{}};
   /* O plano de outro cargo nunca é aplicado à seleção de leitura. */
   if(!mesmoPlano)atual={plan:{cargo:sel.cargo,discs:null,ja:{}},progress:{},weeks:{},_somenteConsulta:true};
   return selector+(mesmoPlano?'':'<p class="nt-aviso">Visualização do programa deste cargo. Seu cronograma e histórico existente não foram alterados. Para registrar progresso vinculado à trilha, configure um plano para este cargo.</p>')+telaEdital(atual);
 }finally{ED=anterior;}
}

var soFalta = false;
function telaEdital(s){
  var semPlano = !s.plan, plan = s.plan || { cargo:Object.keys(ED.cargos)[0], discs:null, ja:{} };
  var prog = progresso(semPlano ? { weeks:{}, plan:plan, progress:s.progress } : s), dc = discsDoCargo(plan.cargo);
  var lista = dc.gerais.concat(dc.especificos).filter(function(x){ return !plan.discs || plan.discs.indexOf(x) >= 0; });
  var feitoTop = function(t, porTop){ var uu = porTop[t.id] || []; return !!((plan.ja && plan.ja[t.id]) || (uu.length && uu.every(function(u){ return (prog[ch(u.id)] || {}).e; }))); };
  /* resumo geral */
  var tot = 0, ok = 0, semMat = 0, grupo = { gerais:[0, 0], especificos:[0, 0] }, dados = {};
  lista.forEach(function(id){
    var us = unidades(id), porTop = {}; us.forEach(function(u){ (porTop[u.top] = porTop[u.top] || []).push(u); });
    var ts = topicos(id), f = ts.filter(function(t){ return feitoTop(t, porTop); }).length;
    dados[id] = { porTop:porTop, ts:ts, f:f };
    tot += ts.length; ok += f; semMat += ts.filter(function(t){ return !(porTop[t.id] || []).some(function(u){ return u.mod; }); }).length;
    var g = dc.gerais.indexOf(id) >= 0 ? 'gerais' : 'especificos'; grupo[g][0] += f; grupo[g][1] += ts.length;
  });
  var pc = function(a, b){ return b ? Math.round(a / b * 100) : 0; };
  var cargoNome = (ED.cargos[plan.cargo] || {}).nome || '';
  var h = '<section class="nt-edres" aria-label="Resumo do edital"><div class="nt-edres-main"><b>' + pc(ok, tot) + '%</b><span>do edital concluído<br><small>' + ok + ' de ' + tot + ' assuntos · ' + escH(cargoNome) + '</small></span></div>'
    + '<div class="nt-edres-g"><span>Conhecimentos gerais <b>' + pc(grupo.gerais[0], grupo.gerais[1]) + '%</b></span><span class="nt-bar sm"><i style="width:' + pc(grupo.gerais[0], grupo.gerais[1]) + '%"></i></span>'
    + '<span>Conhecimentos específicos <b>' + pc(grupo.especificos[0], grupo.especificos[1]) + '%</b></span><span class="nt-bar sm"><i style="width:' + pc(grupo.especificos[0], grupo.especificos[1]) + '%"></i></span></div></section>';
  if(semPlano) h += '<p class="nt-aviso">Você ainda não montou seu plano. O progresso abaixo vem dos capítulos que você já leu no livro digital. Para marcar assuntos como estudados e receber a trilha semana a semana, <button type="button" class="nx-btn primary small" data-nt="editar">monte seu plano</button>.</p>';
  h += '<div class="nt-edtools"><p class="nx-sub nt-legenda">Assuntos na ordem de estudo. Cada capítulo mostra quanto você já leu; "Questões" abre as questões daquele capítulo.' + (semMat ? ' ' + semMat + ' assuntos ainda não têm material no NEXO.' : '') + '</p>'
    + '<label class="nt-ja nt-sofalta"><input type="checkbox" data-nt="sofalta"' + (soFalta ? ' checked' : '') + '> Mostrar só o que falta</label></div>';
  return h + lista.map(function(id){
    var d = ED.disciplinas[id], x = dados[id], porTop = x.porTop;
    var itens = x.ts.filter(function(t){ return !soFalta || !feitoTop(t, porTop); });
    return '<details class="nt-ed" style="--c:' + d.cor + '"' + (soFalta && itens.length ? ' open' : '') + '><summary><span class="nt-sig">' + d.sigla + '</span><b>' + escH(d.nome) + '</b><span class="nt-edn">' + x.f + '/' + x.ts.length + ' · ' + pc(x.f, x.ts.length) + '%</span><span class="nt-bar sm"><i style="width:' + pc(x.f, x.ts.length) + '%"></i></span></summary><ol>'
      + (itens.length ? itens.map(function(t){
        var uu = porTop[t.id] || [], todos = feitoTop(t, porTop), algum = uu.some(function(u){ return (prog[ch(u.id)] || {}).e; });
        var ja = plan.ja && plan.ja[t.id];
        var caps = uu.filter(function(u){ return u.mod; }).map(function(u){
          var xx = prog[ch(u.id)] || {}, pl = LV() ? LV().pctModulo(u.mod) : 0, q = abaQuestoes(u.mod);
          return '<span class="nt-capw"><button type="button" class="nt-capl' + (xx.e ? ' feito' : '') + '" data-nt="modulo" data-mod="' + u.mod + '">' + (xx.e ? '✓ ' : '') + 'Cap. ' + (numCap(u.mod) || '') + ' · ' + escH(u.nome) + (pl && !xx.e ? ' <small>' + pl + '% lido</small>' : '') + '</button>'
            + (q ? '<button type="button" class="nt-capq" data-nt="questoes" data-mod="' + u.mod + '">Questões</button>' : '') + '</span>';
        }).join('');
        return '<li class="' + (todos ? 'feito' : '') + '"><span class="nt-pdot p' + t.prio + '" title="' + PRIO_NOME[t.prio] + (t.estimada ? ' (estimativa)' : '') + '"></span><span class="nt-edt">' + escH(t.nome) + (caps ? '<span class="nt-caps">' + caps + '</span>' : '<small class="nt-semmat">sem material no NEXO</small>') + '</span>'
          + (semPlano ? (todos ? '<span class="nt-ja">✓ lido</span>' : '<span></span>') : '<label class="nt-ja"><input type="checkbox" data-nt="ja" data-top="' + t.id + '"' + (todos || ja ? ' checked' : '') + (algum && !ja ? ' disabled' : '') + '> já estudei</label>') + '</li>';
      }).join('') : '<li class="nt-edvazio">Tudo concluído nesta disciplina.</li>') + '</ol></details>';
  }).join('');
}

window.nexoCronograma = function(a){
  if(a) aba = a;
  try{ if(typeof closeMobileNav === 'function') closeMobileNav(); }catch(e){}
  setCur('cronograma'); try{ renderNav(); }catch(e){} try{ syncAccess(); }catch(e){}
  var h = document.getElementById('head'); if(h) h.textContent = 'Cronograma e trilha';
  var s = st(), v = document.getElementById('view'); if(!v) return;
  var recalculou = !editando && replanejarSeNecessario(s); if(recalculou) s = st();
  var faltam = contagem();
  var topo = '<div class="nx-head"><div><h1>Minha trilha</h1><p>' + (s.plan ? (ED.cargos[s.plan.cargo] || {}).nome + ' · ' : '') + ED.nome + ' · ' + ED.banca + '</p></div>'
    + '<div class="nt-prova"><b>' + (faltam > 0 ? faltam : 0) + '</b><span>dias para a prova<br>' + dma(deIso(ED.prova)) + '</span></div></div>';
  var conta = E().conectado() ? '' : '<p class="nt-aviso">Seu plano está salvo neste navegador. Entre na sua conta para guardar o plano, o progresso dos livros e as marcações e usar em outros aparelhos.</p>';
  if(!s.plan && !editando && aba === 'edital'){ v.innerHTML = '<div class="nx-page nt">' + topo + '<div class="nt-tabsleg"><h2 class="nt-edtit">Edital verticalizado</h2>' + legendaPrio() + '</div>' + telaEditalLab(s) + '</div>'; v.scrollTop = 0; return; }
  if(!s.plan || editando){ v.innerHTML = '<div class="nx-page nt">' + topo + conta + telaConfig(s) + '</div>'; totalForm(); v.scrollTop = 0; return; }
  var abas = '<div class="nt-tabsleg"><div class="nx-seg nt-abas" role="tablist">' + [['semana', 'Semana'], ['plano', 'Plano completo'], ['edital', 'Edital verticalizado']].map(function(x){ return '<button type="button" role="tab" aria-selected="' + (aba === x[0]) + '" aria-pressed="' + (aba === x[0]) + '" data-nt="aba" data-aba="' + x[0] + '">' + x[1] + '</button>'; }).join('') + '</div>' + legendaPrio() + '</div>'
    + '<button type="button" class="nx-btn ghost small" data-nt="editar">Ajustar cronograma</button>';
  v.innerHTML = '<div class="nx-page nt">' + topo + conta + (recalculou ? '<p class="nt-aviso">O plano foi recalculado a partir desta semana com o que você já concluiu.</p>' : '') + '<div class="nt-toolbar">' + abas + '</div>' + (aba === 'edital' ? telaEditalLab(s) : aba === 'plano' ? telaPlano(s) : telaSemana(s)) + '</div>';
};

function tarefaPorId(s, id){ for(var k in s.weeks){ var x = (s.weeks[k].tarefas || []).find(function(y){ return y.id === id; }); if(x) return { t:x, k:k }; } return null; }
/* concluir/desmarcar a tarefa e refletir no livro */
function alternarFeito(s, t){
  t.feito = t.feito ? 0 : Date.now();
  E().salvarPlano(s);
  if(t.tipo === 'estudo' && t.mod && LV() && (t.parte || 1) >= (t.partes || 1)) LV().marcarCapitulo(t.mod, !!t.feito);
}
/* ler a teoria no livro conclui a tarefa de estudo do capítulo */
document.addEventListener('nexo:leitura', function(e){
  var dt = e.detail || {}; if(!dt.teoria || !dt.lido) return;
  var s = st(), mudou = false;
  Object.keys(s.weeks || {}).forEach(function(k){ (s.weeks[k].tarefas || []).forEach(function(t){ if(t.tipo === 'estudo' && t.mod === dt.mod && !t.feito){ t.feito = Date.now(); mudou = true; } }); });
  if(mudou){ E().salvarPlano(s); marcarBanner(); }
});

document.addEventListener('change', function(e){
  var el = e.target;
  if(el.closest && el.closest('#nt-form')){
    if(el.name === 'nt-cargo' || el.name === 'nt-edital'){
      var f = document.getElementById('nt-form'), s = st(), p = s.plan ? clone(s.plan) : {};
      if(el.name === 'nt-edital'){ p.edital = el.value; ED = EDS[el.value] || EDS.pcba; p.cargo = Object.keys(ED.cargos)[0]; }
      else p.cargo = el.value;
      p.discs = null; p.minutos = []; for(var w = 0; w < 7; w++) p.minutos[w] = +(f['nt-min-' + w].value || 0);
      var tmp = document.createElement('div'); tmp.innerHTML = telaConfig({ plan:p });
      f.innerHTML = tmp.querySelector('#nt-form').innerHTML;
    }
    totalForm(); return;
  }
  if(el.id === 'nt-edital-lab-select'){ editalSelecionadoLab=el.value;window.nexoCronograma('edital');return; }
  if(el.dataset && el.dataset.nt === 'sofalta'){ soFalta = !!el.checked; window.nexoCronograma('edital'); return; }
  if(el.dataset && el.dataset.nt === 'ja' && document.querySelector('.nt-aviso') && document.querySelector('.nt-aviso').textContent.indexOf('Visualização do programa deste cargo')>=0)return;
  if(el.dataset && el.dataset.nt === 'ja'){
    var s2 = st(); s2.plan.ja = s2.plan.ja || {};
    if(el.checked) s2.plan.ja[el.dataset.top] = Date.now(); else delete s2.plan.ja[el.dataset.top];
    var k = semanaAtualKey(s2); gerarPlano(s2, k ? deIso(k) : hoje0()); E().salvarPlano(s2); window.nexoCronograma('edital');
  }
});
document.addEventListener('submit', function(e){
  if(e.target.id !== 'nt-form') return;
  e.preventDefault();
  var f = e.target, s = st(), p = s.plan ? clone(s.plan) : {};
  p.edital = (f['nt-edital'] || {}).value || 'pcba'; ED = EDS[p.edital] || EDS.pcba;
  p.cargo = (f.querySelector('[name="nt-cargo"]:checked') || {}).value || Object.keys(ED.cargos)[0];
  p.minutos = []; for(var w = 0; w < 7; w++) p.minutos[w] = +(f['nt-min-' + w].value || 0);
  p.discs = Array.prototype.map.call(f.querySelectorAll('[name="nt-disc"]:checked'), function(x){ return x.value; });
  p.revisarAteProva = !!(f['nt-revisar'] && f['nt-revisar'].checked);
  var msg = document.getElementById('nt-total');
  if(!p.minutos.some(function(m){ return m > 0; })){ if(msg) msg.textContent = 'Escolha pelo menos um dia com tempo de estudo.'; return; }
  if(!p.discs.length){ if(msg) msg.textContent = 'Escolha pelo menos uma disciplina.'; return; }
  p.criado = p.criado || Date.now();
  var mudouEdital = s.plan && s.plan.edital && s.plan.edital !== p.edital;
  s.plan = p; editando = false;
  if(mudouEdital) s.weeks = {};
  var k = semanaKeyDe(s, hoje0());
  gerarPlano(s, k ? deIso(k) : hoje0()); E().salvarPlano(s); aba = 'semana'; vendoSemana = null; window.nexoCronograma();
});
document.addEventListener('click', function(e){
  var b = e.target.closest && e.target.closest('[data-nt]'); if(!b || b.tagName === 'INPUT') return;
  var a = b.dataset.nt, s = st();
  if(a === 'aba'){ window.nexoCronograma(b.dataset.aba); return; }
  if(a === 'editar'){ editando = true; window.nexoCronograma(); return; }
  if(a === 'cancelar'){ editando = false; window.nexoCronograma(); return; }
  if(a === 'sem'){ if(b.dataset.k){ vendoSemana = b.dataset.k; aberta = null; window.nexoCronograma('semana'); } return; }
  if(a === 'gerar' || a === 'refazer'){
    var k = vendoSemana && a === 'refazer' && deIso(vendoSemana) <= hoje0() ? vendoSemana : semanaKeyDe(s, hoje0());
    gerarPlano(s, k ? deIso(k) : hoje0()); E().salvarPlano(s); vendoSemana = null; window.nexoCronograma('semana'); return;
  }
  if(a === 'abrirCard'){ aberta = aberta === b.dataset.id ? null : b.dataset.id; window.nexoCronograma('semana'); return; }
  if(a === 'modulo'){ window.nexoTarefaAtiva = null; if(LV()) LV().abrir(b.dataset.mod, 'resumo'); return; }
  if(a === 'questoes'){ if(window.nexoPraticar) window.nexoPraticar({ mod:b.dataset.mod, status:'unsolved' }); return; }
  var r = b.dataset.id && tarefaPorId(s, b.dataset.id); if(!r) return;
  if(a === 'feito'){ alternarFeito(s, r.t); if(curAtual() === 'cronograma') window.nexoCronograma('semana'); else marcarBanner(); return; }
  if(a === 'estudar'){ window.nexoTarefaAtiva = { id:r.t.id, mod:r.t.mod }; if(LV()) LV().abrir(r.t.mod, b.dataset.tab || 'resumo'); return; }
  if(a === 'praticar'){ if(window.nexoPraticar) window.nexoPraticar(r.t.mod ? { mod:r.t.mod, status:'unsolved' } : { disc:DISC_SITE[r.t.disc] || '', status:'unsolved' }); }
});

/* ---------- faixa da tarefa no topo do capítulo ---------- */
function marcarBanner(){
  var bn = document.querySelector('.nt-banner'); if(!bn) return;
  var r = window.nexoTarefaAtiva && tarefaPorId(st(), window.nexoTarefaAtiva.id); if(!r) return;
  var bt = bn.querySelector('[data-nt="feito"]'); if(bt) bt.textContent = r.t.feito ? 'Tarefa concluída ✓' : 'Concluir tarefa';
  bn.classList.toggle('done', !!r.t.feito);
}
var rt = window.renderTab;
if(typeof rt === 'function'){
  window.renderTab = function(m, tab){
    var r = rt.apply(this, arguments);
    try{
      var at = window.nexoTarefaAtiva, rc = document.querySelector('#view .reading-content');
      if(at && rc && m && at.mod === m.id){
        var x = tarefaPorId(st(), at.id);
        if(x){
          var d = ED.disciplinas[x.t.disc] || {}, abaQ = abaQuestoes(m.id);
          rc.insertAdjacentHTML('afterbegin', '<div class="nt-banner' + (x.t.feito ? ' done' : '') + '" data-nx-skip style="--c:' + (d.cor || '#888') + '"><div><span class="nt-kicker">Tarefa da trilha · ' + TIPO[x.t.tipo] + ' · ' + fmtMin(x.t.min) + '</span><b>' + escH(tituloTarefa(x.t)) + '</b><span class="nt-outros">' + escH(subTarefa(x.t)) + '</span></div>'
            + '<div class="nt-btns">' + (tab === 'resumo' ? '<button type="button" class="nx-btn small ghost" data-nx-auto="1">Marcar pontos importantes</button>' : '') + (abaQ && tab !== abaQ ? '<button type="button" class="nx-btn small ghost" data-nt="estudar" data-id="' + x.t.id + '" data-tab="' + abaQ + '">Ir para as questões</button>' : '') + '<button type="button" class="nx-btn small primary" data-nt="feito" data-id="' + x.t.id + '">' + (x.t.feito ? 'Tarefa concluída ✓' : 'Concluir tarefa') + '</button><button type="button" class="nx-btn small ghost" onclick="nexoCronograma(\'semana\')">Voltar à trilha</button></div></div>');
        }
      }
    }catch(e){}
    return r;
  };
}

/* ---------- barra lateral: entrada "Cronograma" ---------- */
var rn = window.renderNav;
if(typeof rn === 'function'){
  window.renderNav = function(){
    var r = rn.apply(this, arguments);
    try{
      var nav = document.getElementById('nav'); if(!nav || nav.querySelector('.nt-nav')) return r;
      var ref = nav.querySelector('.primary-nav');
      var naEd = curAtual() === 'cronograma' && aba === 'edital';
      var html = '<button type="button" class="primary-nav nx-nav-extra nt-nav' + (curAtual() === 'cronograma' && !naEd ? ' active' : '') + '" onclick="nexoCronograma(\'semana\')">' + ICON.cal + ' Cronograma e trilha</button>'
        + '<button type="button" class="primary-nav nx-nav-extra nt-nav-ed' + (naEd ? ' active' : '') + '" onclick="nexoCronograma(\'edital\')">' + ICON.lista + ' Edital verticalizado</button>';
      if(ref) ref.insertAdjacentHTML('afterend', html); else nav.insertAdjacentHTML('afterbegin', html);
      if(curAtual() === 'cronograma') Array.prototype.forEach.call(nav.querySelectorAll('.primary-nav.active:not(.nt-nav)'), function(x){ x.classList.remove('active'); });
    }catch(e){}
    return r;
  };
}
document.addEventListener('nexo:estudo', function(e){ if(e.detail === 'sincronizado' && curAtual() === 'cronograma' && !editando) window.nexoCronograma(); });

/* menu inferior do celular: "Trilha" logo depois de "Painel" */
(function(){
  function preparar(){
    var bar = document.querySelector('.access-bar'); if(!bar || bar.querySelector('[data-area="trilha"]')) return;
    var painel = bar.querySelector('[data-area="home"]'), lei = bar.querySelector('[data-area="law"]');
    if(lei) lei.classList.add('access-secondary');
    var html = '<button type="button" data-area="trilha" onclick="nexoCronograma()">' + ICON.cal.replace('class="icon"', 'class="icon"') + '<span>Trilha</span></button>';
    if(painel) painel.insertAdjacentHTML('afterend', html); else bar.insertAdjacentHTML('afterbegin', html);
  }
  var sa = window.syncAccess;
  window.syncAccess = function(){
    var r; try{ if(typeof sa === 'function') r = sa.apply(this, arguments); }catch(e){}
    preparar();
    var c = curAtual();
    if(c === 'cronograma' || c === 'grifos' || c === 'livros'){
      Array.prototype.forEach.call(document.querySelectorAll('.access-bar [data-area]'), function(b){ b.classList.remove('selected'); b.removeAttribute('aria-current'); });
      var t = document.querySelector('.access-bar [data-area="trilha"]'); if(t && c === 'cronograma'){ t.classList.add('selected'); t.setAttribute('aria-current', 'page'); }
    }
    return r;
  };
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', preparar); else preparar();
})();

/* painel inicial: as tarefas de hoje */
(function(){
  function faixa(){
    var grid = document.querySelector('.stats-grid'); if(!grid || document.querySelector('.nt-hoje')) return;
    var s = st(), el = document.createElement('section');
    el.className = 'nt-hoje';
    if(!s.plan){
      el.innerHTML = '<div class="nt-hoje-txt"><b>Monte seu plano de estudos</b><span>Escolha o concurso, o cargo, os dias e o tempo de estudo. A NEXO monta a trilha capítulo a capítulo até concluir o edital.</span></div><button type="button" class="nx-btn primary" onclick="nexoCronograma()">Montar plano</button>';
    }else{
      var k = semanaKeyDe(s, hoje0()), w = k && s.weeks[k], d = w ? Math.round((hoje0() - deIso(k)) / DIA) : -1, lista = w ? w.tarefas.filter(function(t){ return t.d === d; }) : [];
      var itens = lista.map(function(t){ var dd = ED.disciplinas[t.disc] || {}; return '<li class="' + (t.feito ? 'feito' : '') + '" style="--c:' + (dd.cor || '#888') + '"><span class="nt-sig">' + (dd.sigla || '') + '</span><span>' + TIPO[t.tipo] + ': ' + escH(tituloTarefa(t)) + '</span><small>' + fmtMin(t.min) + '</small></li>'; }).join('');
      var feitas = lista.filter(function(t){ return t.feito; }).length;
      el.innerHTML = '<div class="nt-hoje-txt"><b>Hoje na sua trilha</b><span>' + (!w ? 'Abra a trilha para recalcular o plano desta semana.' : lista.length ? feitas + ' de ' + lista.length + ' tarefas feitas' : 'Dia de folga no seu cronograma.') + '</span>' + (itens ? '<ul>' + itens + '</ul>' : '') + '</div><button type="button" class="nx-btn primary" onclick="nexoCronograma(\'semana\')">Abrir a trilha</button>';
    }
    grid.insertAdjacentElement('beforebegin', el);
  }
  var hm = window.home;
  if(typeof hm === 'function') window.home = function(){ var r = hm.apply(this, arguments); try{ faixa(); }catch(e){} return r; };
  function inicial(){ try{ if(document.querySelector('.stats-grid')) faixa(); }catch(e){} }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', inicial); else setTimeout(inicial, 0);
})();

window.nexoTrilha = { prioDisciplina:prioDisciplina, legendaPrio:legendaPrio, prioNome:function(n){ return PRIO_NOME[n]; }, gerarSemana:gerarSemana, gerarPlano:gerarPlano, topicos:topicos, unidades:unidades, progresso:progresso, editais:EDS, edital:function(){ return ED; } };
})();
