/* NEXO — cronograma de estudos e trilha semanal (PC-BA).
   O aluno escolhe o cargo, os dias, o tempo de cada dia e as disciplinas. A trilha da semana é
   montada com tarefas que cabem nesse tempo, seguindo a ordem de aprendizagem de cada disciplina
   e dando mais espaço aos assuntos de maior prioridade. Cada tarefa leva ao conteúdo do NEXO,
   quando existe, ou orienta o estudo pelo material do aluno.
   Programa: data/trilha/pcba.js. Dados do aluno: ui/nexo-estudo.js. */
(function(){
'use strict';

var ED = (window.NEXO_EDITAIS || {}).pcba; if(!ED) return;
var DIA = 864e5;
var DIAS = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
var DCURTO = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
var PRIO_MOD = { 'MUITO ALTA':3, 'ALTA':2, 'MÉDIA':2, 'COMPLEMENTAR':1 };
var PRIO_NOME = { 3:'Prioridade alta', 2:'Prioridade média', 1:'Complementar' };
/* tópicos iguais em duas disciplinas do edital contam como um só */
var IGUAIS = { 'da-lopc':'lg-11370', 'da-6677':'lg-6677', 'le-racismo':'ig-7716' };
/* nome da disciplina no NEXO (para o filtro de questões) */
var DISC_SITE = { penal:'Direito Penal', constitucional:'Direito Constitucional', administrativo:'Direito Administrativo', medicina_legal:'Medicina Legal' };

function escH(s){ return String(s == null ? '' : s).replace(/[&<>"']/g, function(c){ return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]; }); }
function mods(){ return typeof modules !== 'undefined' ? modules : []; }
function modulo(id){ return mods().find(function(m){ return m.id === id; }); }
function E(){ return window.nexoEstudo; }
function hoje0(){ var d = new Date(); d.setHours(0, 0, 0, 0); return d.getTime(); }
function iso(t){ var d = new Date(t); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
function deIso(s){ var p = String(s).split('-'); return new Date(+p[0], +p[1] - 1, +p[2]).getTime(); }
function dm(t){ var d = new Date(t); return String(d.getDate()).padStart(2, '0') + '/' + String(d.getMonth() + 1).padStart(2, '0'); }
function fmtMin(m){ m = Math.round(m); if(m < 60) return m + ' min'; var h = Math.floor(m / 60), r = m % 60; return h + 'h' + (r ? String(r).padStart(2, '0') : ''); }
function setCur(v){ try{ current = v; }catch(e){} }
function curAtual(){ try{ return current; }catch(e){ return null; } }

/* ---------- programa ---------- */
function topicos(discId){
  var d = ED.disciplinas[discId]; if(!d) return [];
  return d.topicos.map(function(t, i){
    var ms = t[2].filter(function(id){ return modulo(id); });
    var pr = ms.length ? Math.max.apply(null, ms.map(function(id){ return PRIO_MOD[modulo(id).priority] || 2; })) : t[3];
    return { id:t[0], nome:t[1], mods:ms, prio:pr, estimada:!ms.length, h:t[4], ordem:i, disc:discId };
  });
}
function topico(id){
  for(var k in ED.disciplinas){ var t = topicos(k).find(function(x){ return x.id === id; }); if(t) return t; }
  return null;
}
function chaveProg(id){ return IGUAIS[id] || id; }
function discsDoCargo(cargo){ var c = ED.cargos[cargo] || ED.cargos.investigador; return { gerais:c.gerais.slice(), especificos:c.especificos.slice() }; }

/* o que já foi estudado sai das tarefas concluídas de todas as semanas (e do "já estudei") */
function progresso(st){
  var p = {};
  Object.keys(st.weeks || {}).forEach(function(k){
    (st.weeks[k].tarefas || []).forEach(function(t){
      if(!t.feito || !t.top) return;
      var c = chaveProg(t.top), x = p[c] = p[c] || { e:0, partes:0, r:0, u:0 };
      if(t.tipo === 'estudo'){ x.partes = Math.max(x.partes, t.parte || 1); if((t.parte || 1) >= (t.partes || 1)) x.e = Math.max(x.e, t.feito); x.u = Math.max(x.u, t.feito); }
      if(t.tipo === 'revisao' || t.tipo === 'reforco'){ x.r++; x.u = Math.max(x.u, t.feito); }
    });
  });
  Object.keys((st.plan && st.plan.ja) || {}).forEach(function(id){ var c = chaveProg(id), x = p[c] = p[c] || { e:0, partes:0, r:0, u:0 }; if(!x.e){ x.e = st.plan.ja[id]; x.u = Math.max(x.u, x.e); x.ja = true; } });
  return p;
}
/* revisões espaçadas: 7, 15 e 30 dias depois da última passada pelo assunto */
var INTERVALOS = [7, 15, 30];
/* quantas revisões cada assunto recebe: alta 3, média 2, complementar 1 */
function proximaRevisao(x, prio){ if(!x || !x.e) return null; if(x.r >= Math.max(1, Math.min(3, prio || 2))) return null; return x.u + INTERVALOS[Math.min(x.r, INTERVALOS.length - 1)] * DIA; }

/* ---------- gerar a semana ---------- */
function minutosEstudo(t){ var f = t.prio >= 3 ? 1 : t.prio === 2 ? .9 : .7; return Math.max(30, Math.round(t.h * 60 * f / 5) * 5) + (t.disc === 'atualidades' ? 0 : 15); }
function partes(t){
  var total = minutosEstudo(t), n = Math.max(1, Math.ceil(total / 120)), cada = Math.round(total / n / 5) * 5;
  var r = []; for(var i = 1; i <= n; i++) r.push({ min:cada, parte:i, partes:n }); return r;
}
function fila(discId, prog){
  var ts = topicos(discId).filter(function(t){ return !(prog[chaveProg(t.id)] && prog[chaveProg(t.id)].e); });
  if(discId === 'atualidades') return ts.length ? ts : topicos(discId); /* atualidades nunca acaba */
  /* ordem de aprendizagem, mas o que é complementar fica para depois do resto (menos o primeiro tópico, que é base) */
  var base = topicos(discId)[0];
  return ts.filter(function(t){ return t.prio > 1 || (base && t.id === base.id); }).concat(ts.filter(function(t){ return t.prio <= 1 && !(base && t.id === base.id); }));
}
function gerarSemana(st, inicio, op){
  op = op || {};
  var plan = st.plan, prog = progresso(st), tarefas = [], uid = 0, manter = op.manter || [];
  var cap = [], dias = [];
  for(var d = 0; d < 7; d++){ var t = inicio + d * DIA; dias.push(t); cap.push(d < (op.desdeDia || 0) ? 0 : +(plan.minutos[new Date(t).getDay()] || 0)); }
  manter.forEach(function(t){ if(t.d >= 0 && t.d < 7) cap[t.d] = Math.max(0, cap[t.d] - t.min); });
  var total = cap.reduce(function(a, b){ return a + b; }, 0);
  var nova = function(o){ o.id = 't' + (++uid) + '-' + Math.random().toString(36).slice(2, 6); o.feito = 0; return o; };

  /* 1. tarefas não feitas da semana anterior entram primeiro */
  var antes = Object.keys(st.weeks || {}).sort().filter(function(k){ return deIso(k) < inicio; }).pop();
  var carregadas = antes ? (st.weeks[antes].tarefas || []).filter(function(t){ return !t.feito && t.tipo !== 'questoes'; }).map(function(t){ var c = JSON.parse(JSON.stringify(t)); c.pendente = 1; return nova(c); }) : [];
  var jaTem = {}; carregadas.concat(manter).forEach(function(t){ jaTem[t.top + ':' + t.tipo + ':' + (t.parte || 1)] = 1; });

  /* 2. revisões que vencem nesta semana */
  /* no máximo 30% do tempo da semana; as de maior prioridade e mais atrasadas vêm primeiro */
  var revisoes = [], cand = [];
  Object.keys(prog).forEach(function(c){
    var t = topico(c); if(!t || t.disc === 'atualidades' || plan.discs.indexOf(t.disc) < 0 || jaTem[c + ':revisao:1']) return;
    var due = proximaRevisao(prog[c], t.prio); if(!due || due > inicio + 6 * DIA) return;
    cand.push({ t:t, c:c, due:due });
  });
  cand.sort(function(a, b){ return b.t.prio - a.t.prio || a.due - b.due; });
  var tetoRev = total * .3, somaRev = 0;
  cand.forEach(function(x){
    var min = x.t.prio >= 3 ? 30 : 20; if(somaRev + min > tetoRev) return; somaRev += min;
    revisoes.push(nova({ tipo:'revisao', top:x.c, disc:x.t.disc, min:min, desde:Math.max(0, Math.floor((x.due - inicio) / DIA)) }));
  });

  /* 3. estudo novo: divide o tempo entre as disciplinas (específicos 60%, gerais 40%, como na prova) */
  var usado = carregadas.concat(revisoes).reduce(function(s, t){ return s + t.min; }, 0);
  var orc = Math.max(0, total * (prog && Object.keys(prog).length ? .8 : .88) - usado);
  var dc = discsDoCargo(plan.cargo);
  var g = dc.gerais.filter(function(x){ return plan.discs.indexOf(x) >= 0; }), e = dc.especificos.filter(function(x){ return plan.discs.indexOf(x) >= 0; });
  var peso = {};
  var pg = e.length && g.length ? .4 : 1, pe = e.length && g.length ? .6 : 1;
  var soma = function(l){ return l.reduce(function(s, x){ return s + (x === 'atualidades' ? .5 : 1); }, 0); };
  g.forEach(function(x){ peso[x] = pg * (x === 'atualidades' ? .5 : 1) / soma(g); });
  e.forEach(function(x){ peso[x] = pe / soma(e); });
  var deficit = {}, filas = {}, travadas = {};
  Object.keys(peso).forEach(function(x){
    /* quem ficou sem tempo na semana anterior ganha a vez agora (rodízio justo entre muitas disciplinas) */
    var saldo = antes && st.weeks[antes].saldo ? +(st.weeks[antes].saldo[x] || 0) : 0;
    deficit[x] = peso[x] * orc + Math.max(-150, Math.min(240, saldo));
    filas[x] = [];
    fila(x, prog).forEach(function(t){
      var feitas = (prog[chaveProg(t.id)] || {}).partes || 0;
      partes(t).forEach(function(pt){ if(pt.parte > feitas && !jaTem[t.id + ':estudo:' + pt.parte]) filas[x].push({ t:t, pt:pt }); });
    });
  });
  var estudos = [], resto = orc, gastoG = 0, gastoE = 0;
  while(resto >= 25){
    /* alterna gerais e específicos na proporção da prova; dentro do bloco, vai quem está mais "devendo" tempo */
    var livres = Object.keys(deficit).filter(function(x){ return filas[x].length && !travadas[x]; });
    var lg = livres.filter(function(x){ return g.indexOf(x) >= 0; }), le = livres.filter(function(x){ return e.indexOf(x) >= 0; });
    var blocoG = lg.length && (!le.length || gastoG / pg <= gastoE / pe);
    var cand = (blocoG ? lg : le).sort(function(a, b){ return deficit[b] - deficit[a]; })[0];
    if(!cand) break;
    var u = filas[cand][0];
    if(u.pt.min > resto + 10){ travadas[cand] = 1; continue; }
    /* as partes de um mesmo assunto ficam na mesma semana sempre que couberem */
    do{
      filas[cand].shift();
      estudos.push(nova({ tipo:'estudo', top:u.t.id, disc:cand, min:u.pt.min, parte:u.pt.parte, partes:u.pt.partes }));
      deficit[cand] -= u.pt.min; resto -= u.pt.min;
      if(g.indexOf(cand) >= 0) gastoG += u.pt.min; else gastoE += u.pt.min;
      var prox = filas[cand][0];
      u = prox && prox.t.id === u.t.id && prox.pt.min <= resto + 10 ? prox : null;
    }while(u);
  }

  /* 4. distribuir nos dias: no máximo 2 tarefas da mesma disciplina por dia, sem passar do tempo do dia */
  var livre = cap.slice(), porDia = [[], [], [], [], [], [], []];
  manter.forEach(function(t){ if(t.d >= 0 && t.d < 7) porDia[t.d].push(t); });
  function colocar(t, desde){
    for(var d = desde || 0; d < 7; d++){
      if(livre[d] >= t.min && porDia[d].filter(function(x){ return x.disc === t.disc; }).length < 2){ t.d = d; livre[d] -= t.min; porDia[d].push(t); return true; }
    }
    return false;
  }
  carregadas.forEach(function(t){ colocar(t, 0); });
  revisoes.forEach(function(t){ if(!colocar(t, t.desde)) colocar(t, 0); });
  var restantes = estudos.slice(), reforcos = [];
  for(var dd = 0; dd < 7; dd++){
    var mudou = true;
    while(mudou){
      mudou = false;
      /* a primeira tarefa ainda não colocada de cada disciplina (mantém a ordem dentro da disciplina) */
      var vistas = {}, cabe = null;
      for(var i = 0; i < restantes.length; i++){
        var t = restantes[i]; if(vistas[t.disc]) continue; vistas[t.disc] = 1;
        var jaHoje = porDia[dd].filter(function(x){ return x.disc === t.disc; }).length;
        if(livre[dd] >= t.min && jaHoje === 0){ cabe = t; break; }
        if(!cabe && livre[dd] >= t.min && jaHoje < 2 && porDia[dd].some(function(x){ return x.top === t.top; })) cabe = t; /* parte seguinte do mesmo assunto */
      }
      if(cabe){
        cabe.d = dd; livre[dd] -= cabe.min; porDia[dd].push(cabe); restantes.splice(restantes.indexOf(cabe), 1); mudou = true;
        var tp = topico(cabe.top);
        if(cabe.parte === cabe.partes && tp && tp.prio >= 2 && cabe.disc !== 'atualidades') reforcos.push(nova({ tipo:'reforco', top:cabe.top, disc:cabe.disc, min:20, desde:dd + 2 }));
      }
    }
  }
  /* revisão curta 2 a 4 dias depois do estudo, para fixar */
  reforcos.forEach(function(t){ if(t.desde <= 6) colocar(t, t.desde); });
  /* 5. sobra do dia vira bloco de questões dos assuntos já estudados */
  var estudadas = {};
  Object.keys(prog).forEach(function(c){ var t = topico(c); if(t && prog[c].e) estudadas[t.disc] = (estudadas[t.disc] || 0) + 1; });
  porDia.forEach(function(lista){ lista.forEach(function(t){ if(t.tipo === 'estudo') estudadas[t.disc] = (estudadas[t.disc] || 0) + .5; }); });
  for(var d2 = 0; d2 < 7; d2++){
    if(livre[d2] < 25) continue;
    var hojeDiscs = porDia[d2].map(function(x){ return x.disc; });
    var alvo = Object.keys(estudadas).filter(function(x){ return plan.discs.indexOf(x) >= 0 && x !== 'atualidades'; }).sort(function(a, b){ return (hojeDiscs.indexOf(b) >= 0) - (hojeDiscs.indexOf(a) >= 0) || estudadas[b] - estudadas[a]; })[0];
    if(!alvo) continue;
    var min = Math.min(livre[d2], 45); min = Math.floor(min / 5) * 5;
    var q = nova({ tipo:'questoes', disc:alvo, min:min, d:d2 }); livre[d2] -= min; porDia[d2].push(q);
  }
  porDia.forEach(function(l){ tarefas = tarefas.concat(l); });
  manter.forEach(function(t){ if(!(t.d >= 0 && t.d < 7)) tarefas.push(t); });
  /* o que não coube volta para o saldo da disciplina */
  restantes.forEach(function(t){ deficit[t.disc] = (deficit[t.disc] || 0) + t.min; });
  var saldoNovo = {}; Object.keys(deficit).forEach(function(x){ saldoNovo[x] = Math.round(deficit[x]); });
  return { ini:iso(inicio), gerada:Date.now(), tarefas:tarefas, total:total, sobrou:restantes.length, saldo:saldoNovo };
}

/* ---------- estado ---------- */
function st(){ return E().plano(); }
function semanaAtualKey(s){
  var ks = Object.keys(s.weeks || {}).sort(), h = hoje0();
  var atual = ks.filter(function(k){ var t = deIso(k); return t <= h && h < t + 7 * DIA; }).pop();
  return atual || ks.pop() || null;
}
var aba = 'semana', aberta = null, editando = false;

/* ---------- telas ---------- */
var ICON = {
  cal:'<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2.5"/><path d="M3 10h18M8 3v4m8-4v4"/><path d="m8.5 15 2 2 4-4"/></svg>',
  ok:'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7"/></svg>'
};
var TIPO = { estudo:'Estudo', revisao:'Revisão', reforco:'Revisão rápida', questoes:'Questões' };

function contagem(){ var d = Math.ceil((deIso(ED.prova) - hoje0()) / DIA); return d; }

function telaConfig(s){
  var p = s.plan || { cargo:'investigador', minutos:[0, 120, 120, 120, 120, 120, 180], discs:null };
  var dc = discsDoCargo(p.cargo), sel = p.discs || dc.gerais.concat(dc.especificos);
  var horas = [0, 30, 45, 60, 90, 120, 150, 180, 240, 300, 360, 480];
  var bloco = function(nome, lista, nota){
    return '<fieldset class="nt-disc"><legend>' + nome + ' <small>' + nota + '</small></legend>' + lista.map(function(id){
      var d = ED.disciplinas[id], comMat = topicos(id).some(function(t){ return t.mods.length; });
      return '<label class="nt-chk" style="--c:' + d.cor + '"><input type="checkbox" name="nt-disc" value="' + id + '"' + (sel.indexOf(id) >= 0 ? ' checked' : '') + '><span class="nt-sig">' + d.sigla + '</span><span>' + escH(d.nome) + (comMat ? '' : '<small>sem material no NEXO ainda</small>') + '</span></label>';
    }).join('') + '</fieldset>';
  };
  return '<form class="nt-form" id="nt-form">'
    + '<section class="nx-panel"><h2>1. Seu cargo</h2><p class="nx-sub">A trilha usa as disciplinas do edital para o cargo escolhido.</p><div class="nt-cargos">'
    + Object.keys(ED.cargos).map(function(k){ var c = ED.cargos[k]; return '<label class="nt-cargo"><input type="radio" name="nt-cargo" value="' + k + '"' + (p.cargo === k ? ' checked' : '') + '><b>' + c.nome + '</b><small>' + c.vagas + ' vagas · ' + ED.banca + '</small></label>'; }).join('') + '</div></section>'
    + '<section class="nx-panel"><h2>2. Dias e tempo de estudo</h2><p class="nx-sub">Escolha quanto tempo você consegue estudar em cada dia. Dia sem tempo fica de folga.</p><div class="nt-dias">'
    + [1, 2, 3, 4, 5, 6, 0].map(function(w){ return '<label class="nt-dia"><span>' + DIAS[w] + '</span><select name="nt-min-' + w + '">' + horas.map(function(m){ return '<option value="' + m + '"' + (+p.minutos[w] === m ? ' selected' : '') + '>' + (m ? fmtMin(m) : 'Folga') + '</option>'; }).join('') + '</select></label>'; }).join('')
    + '</div><p class="nt-total" id="nt-total"></p></section>'
    + '<section class="nx-panel"><h2>3. Disciplinas</h2><p class="nx-sub">Na prova são 40 questões de conhecimentos gerais e 60 de específicos; a trilha divide o tempo nessa proporção.</p><div id="nt-discs">'
    + bloco('Conhecimentos gerais', dc.gerais, '40 questões') + bloco('Conhecimentos específicos', dc.especificos, '60 questões') + '</div></section>'
    + '<div class="nt-acoes">' + (s.plan ? '<button type="button" class="nx-btn ghost" data-nt="cancelar">Cancelar</button>' : '') + '<button type="submit" class="nx-btn primary">' + (s.plan ? 'Salvar e refazer a semana' : 'Montar minha trilha') + '</button></div>'
    + '</form>';
}
function totalForm(){
  var f = document.getElementById('nt-form'); if(!f) return;
  var t = 0; for(var w = 0; w < 7; w++) t += +(f['nt-min-' + w].value || 0);
  var el = document.getElementById('nt-total'); if(el) el.textContent = t ? 'Total: ' + fmtMin(t) + ' por semana.' + (t < 300 ? ' Com menos de 5 horas a trilha avança devagar; o edital é longo.' : '') : 'Escolha pelo menos um dia com tempo de estudo.';
}

function cartao(t, wk){
  var d = ED.disciplinas[t.disc] || {}, tp = t.top ? topico(t.top) : null;
  var titulo = t.tipo === 'questoes' ? 'Questões de ' + d.nome : tp ? tp.nome : '';
  var sub = t.tipo === 'estudo' ? (t.partes > 1 ? 'Parte ' + t.parte + ' de ' + t.partes : (t.disc === 'atualidades' ? 'Leitura' : 'Teoria e questões'))
    : t.tipo === 'questoes' ? 'Assuntos já estudados' : 'Marcações e questões';
  var exp = aberta === t.id;
  return '<article class="nt-task' + (t.feito ? ' done' : '') + (exp ? ' open' : '') + '" style="--c:' + (d.cor || '#888') + '" data-ntid="' + t.id + '">'
    + '<button type="button" class="nt-check" data-nt="feito" data-id="' + t.id + '" aria-pressed="' + !!t.feito + '" aria-label="' + (t.feito ? 'Desmarcar' : 'Marcar como feita') + '">' + ICON.ok + '</button>'
    + '<button type="button" class="nt-body" data-nt="abrirCard" data-id="' + t.id + '" aria-expanded="' + exp + '">'
    + '<span class="nt-meta"><span class="nt-sig">' + (d.sigla || '') + '</span><span>' + TIPO[t.tipo] + '</span><span>' + fmtMin(t.min) + '</span>' + (t.pendente ? '<span class="nt-pend">da semana anterior</span>' : '') + '</span>'
    + '<b>' + escH(titulo) + '</b><small>' + sub + '</small></button>'
    + (exp ? detalhe(t, tp, d) : '') + '</article>';
}
function detalhe(t, tp, d){
  var com = tp && tp.mods.length, h = '<div class="nt-det">';
  if(tp) h += '<p class="nt-prio p' + tp.prio + '">' + PRIO_NOME[tp.prio] + (tp.estimada ? ' (estimativa NEXO; a banca não publica estatística por assunto)' : '') + '</p>';
  if(t.tipo === 'estudo'){
    h += com ? '<p>Leia o resumo e a lei seca do módulo. Use "Marcar pontos importantes" para destacar o que o material grifou e acrescente suas marcações. Depois resolva as questões do assunto.</p>'
      : t.disc === 'atualidades' ? '<p>Leia notícias de fontes confiáveis sobre o tema e anote o que pode virar questão (datas, números, nomes de leis e programas).</p>'
      : '<p>Este assunto ainda não tem material no NEXO. Estude pelo seu material (livro, PDF ou videoaula), faça um resumo curto e resolva cerca de 10 questões da AOCP sobre ele.</p>';
  }else if(t.tipo === 'questoes'){
    h += '<p>Resolva questões dos assuntos de ' + escH(d.nome) + ' que você já estudou. Anote os erros: eles indicam o que revisar.</p>';
  }else{
    h += '<p>' + (com ? 'Releia suas marcações em "Meus grifos" e o resumo do módulo' : 'Releia seu resumo') + ' e resolva questões. Se errar muito, volte à teoria.</p>';
  }
  h += '<div class="nt-btns">';
  if(com){
    if(t.tipo !== 'questoes') tp.mods.forEach(function(id, i){ var m = modulo(id); h += '<button type="button" class="nx-btn small' + (i ? ' ghost' : '') + '" data-nt="estudar" data-id="' + t.id + '" data-mod="' + id + '">' + (tp.mods.length > 1 ? escH(m.title) : 'Abrir o conteúdo') + '</button>'; });
    h += '<button type="button" class="nx-btn small ghost" data-nt="praticar" data-id="' + t.id + '">Praticar questões</button>';
  }else if(t.tipo === 'questoes' && DISC_SITE[t.disc]){
    h += '<button type="button" class="nx-btn small primary" data-nt="praticar" data-id="' + t.id + '">Praticar questões</button>';
  }
  h += '<button type="button" class="nx-btn small ghost" data-nt="feito" data-id="' + t.id + '">' + (t.feito ? 'Desmarcar' : 'Concluir tarefa') + '</button></div></div>';
  return h;
}

function telaSemana(s){
  var k = semanaAtualKey(s), w = k && s.weeks[k];
  if(!w) return '<div class="nx-empty">Ainda não há trilha. <button type="button" class="nx-btn small primary" data-nt="gerar">Gerar a semana</button></div>';
  var ini = deIso(w.ini), feitas = w.tarefas.filter(function(t){ return t.feito; }), minF = feitas.reduce(function(a, t){ return a + t.min; }, 0), minT = w.tarefas.reduce(function(a, t){ return a + t.min; }, 0);
  var pct = minT ? Math.round(minF / minT * 100) : 0, fim = ini + 6 * DIA, acabou = hoje0() > fim, h0 = hoje0();
  var idx = Object.keys(s.weeks).sort().indexOf(k) + 1;
  var cab = '<div class="nt-semhead"><div><span class="nt-kicker">Semana ' + idx + ' · ' + dm(ini) + ' a ' + dm(fim) + '</span><h2>' + feitas.length + ' de ' + w.tarefas.length + ' tarefas</h2>'
    + '<div class="nt-bar" role="progressbar" aria-valuenow="' + pct + '" aria-valuemin="0" aria-valuemax="100"><i style="width:' + pct + '%"></i></div><p class="nx-sub">' + fmtMin(minF) + ' de ' + fmtMin(minT) + ' planejados' + (w.sobrou ? ' · alguns assuntos ficaram para a próxima semana por falta de tempo' : '') + '</p></div>'
    + '<div class="nt-semacoes">' + (acabou || feitas.length === w.tarefas.length ? '<button type="button" class="nx-btn primary" data-nt="proxima">Gerar a próxima semana</button>' : '') + '<button type="button" class="nx-btn ghost small" data-nt="refazer">Refazer esta semana</button></div></div>';
  var colunas = '';
  for(var d = 0; d < 7; d++){
    var t = ini + d * DIA, lista = w.tarefas.filter(function(x){ return x.d === d; }), cap = +((s.plan.minutos || [])[new Date(t).getDay()] || 0);
    var usado = lista.reduce(function(a, x){ return a + x.min; }, 0);
    colunas += '<section class="nt-col' + (t === h0 ? ' hoje' : '') + (t < h0 ? ' passou' : '') + '"><div class="nt-colh"><b>' + DCURTO[new Date(t).getDay()] + ' ' + dm(t) + '</b><small>' + (cap ? fmtMin(usado) + ' de ' + fmtMin(cap) : 'Folga') + '</small></div>'
      + (lista.length ? lista.map(function(x){ return cartao(x, k); }).join('') : '<p class="nt-folga">' + (cap ? 'Sem tarefas' : 'Descanso') + '</p>') + '</section>';
  }
  return cab + '<div class="nt-semana">' + colunas + '</div>';
}

function telaEdital(s){
  var prog = progresso(s), dc = discsDoCargo(s.plan.cargo), lista = dc.gerais.concat(dc.especificos).filter(function(x){ return s.plan.discs.indexOf(x) >= 0; });
  return '<p class="nx-sub nt-legenda">Ordem de estudo de cada disciplina, do edital do cargo. Assuntos com módulo no NEXO abrem o conteúdo; marque "já estudei" no que você já domina para a trilha pular.</p>'
    + lista.map(function(id){
      var d = ED.disciplinas[id], ts = topicos(id), feitos = ts.filter(function(t){ return (prog[chaveProg(t.id)] || {}).e; }).length;
      return '<details class="nt-ed" style="--c:' + d.cor + '"><summary><span class="nt-sig">' + d.sigla + '</span><b>' + escH(d.nome) + '</b><span class="nt-edn">' + feitos + '/' + ts.length + '</span><span class="nt-bar sm"><i style="width:' + Math.round(feitos / ts.length * 100) + '%"></i></span></summary><ol>'
        + ts.map(function(t){
          var x = prog[chaveProg(t.id)] || {}, est = x.e ? (x.ja ? 'já estudado' : 'estudado em ' + dm(x.e) + (x.r ? ' · ' + x.r + (x.r > 1 ? ' revisões' : ' revisão') : '')) : '';
          return '<li class="' + (x.e ? 'feito' : '') + '"><span class="nt-pdot p' + t.prio + '" title="' + PRIO_NOME[t.prio] + (t.estimada ? ' (estimativa)' : '') + '"></span><span class="nt-edt">' + escH(t.nome) + (est ? '<small>' + est + '</small>' : '') + '</span>'
            + (t.mods.length ? '<button type="button" class="nt-link" data-nt="modulo" data-mod="' + t.mods[0] + '">Abrir</button>' : '<span class="nt-sem">sem material</span>')
            + '<label class="nt-ja"><input type="checkbox" data-nt="ja" data-top="' + t.id + '"' + (x.e ? ' checked' : '') + (x.e && !x.ja ? ' disabled' : '') + '> já estudei</label></li>';
        }).join('') + '</ol></details>';
    }).join('');
}

window.nexoCronograma = function(a){
  if(a) aba = a;
  try{ if(typeof closeMobileNav === 'function') closeMobileNav(); }catch(e){}
  setCur('cronograma'); try{ renderNav(); }catch(e){} try{ syncAccess(); }catch(e){}
  var h = document.getElementById('head'); if(h) h.textContent = 'Cronograma e trilha';
  var s = st(), v = document.getElementById('view'); if(!v) return;
  var faltam = contagem();
  var topo = '<div class="nx-head"><div><h1>Minha trilha</h1><p>' + (s.plan ? ED.cargos[s.plan.cargo].nome + ' · ' : '') + ED.nome + ' · ' + ED.banca + '</p></div>'
    + '<div class="nt-prova"><b>' + (faltam > 0 ? faltam : 0) + '</b><span>dias para a prova<br>' + dm(deIso(ED.prova)) + '/' + ED.prova.slice(0, 4) + '</span></div></div>';
  var conta = E().conectado() ? '' : '<p class="nt-aviso">Seu plano está salvo neste navegador. Entre na sua conta para guardar a trilha e as marcações e usar em outros aparelhos.</p>';
  if(!s.plan || editando){
    v.innerHTML = '<div class="nx-page nt">' + topo + conta + telaConfig(s) + '</div>'; totalForm(); v.scrollTop = 0; return;
  }
  var abas = '<div class="nx-seg nt-abas" role="tablist">' + [['semana', 'Semana'], ['edital', 'Edital por assunto']].map(function(x){ return '<button type="button" role="tab" aria-selected="' + (aba === x[0]) + '" aria-pressed="' + (aba === x[0]) + '" data-nt="aba" data-aba="' + x[0] + '">' + x[1] + '</button>'; }).join('') + '</div>'
    + '<button type="button" class="nx-btn ghost small" data-nt="editar">Ajustar cronograma</button>';
  v.innerHTML = '<div class="nx-page nt">' + topo + conta + '<div class="nt-toolbar">' + abas + '</div>' + (aba === 'edital' ? telaEdital(s) : telaSemana(s)) + '</div>';
};

function gerarESalvar(s, inicio){
  s.weeks = s.weeks || {};
  /* refazer: a semana que começa nesse dia é montada de novo, mas as tarefas já feitas ficam;
     dias que já passaram não recebem tarefas novas */
  var k = iso(inicio), manter = s.weeks[k] ? (s.weeks[k].tarefas || []).filter(function(t){ return t.feito; }) : [];
  Object.keys(s.weeks).forEach(function(kk){ if(deIso(kk) >= inicio) delete s.weeks[kk]; });
  if(manter.length) s.weeks[k] = { ini:k, tarefas:manter };
  var w = gerarSemana(s, inicio, { manter:manter, desdeDia:Math.max(0, Math.round((hoje0() - inicio) / DIA)) });
  s.weeks[w.ini] = w; E().salvarPlano(s); aberta = null;
}
function tarefaPorId(s, id){
  var k = semanaAtualKey(s); var t = k && (s.weeks[k].tarefas || []).find(function(x){ return x.id === id; });
  if(t) return { t:t, k:k };
  for(var kk in s.weeks){ var x = (s.weeks[kk].tarefas || []).find(function(y){ return y.id === id; }); if(x) return { t:x, k:kk }; }
  return null;
}

document.addEventListener('change', function(e){
  var el = e.target;
  if(el.closest && el.closest('#nt-form')){
    if(el.name === 'nt-cargo'){
      var s = st(), p = s.plan ? JSON.parse(JSON.stringify(s.plan)) : { minutos:[0, 120, 120, 120, 120, 120, 180] };
      var f = document.getElementById('nt-form'); p.cargo = el.value; p.discs = null;
      for(var w = 0; w < 7; w++) p.minutos[w] = +(f['nt-min-' + w].value || 0);
      var box = document.getElementById('nt-discs'), tmp = document.createElement('div');
      tmp.innerHTML = telaConfig({ plan:p }); var nd = tmp.querySelector('#nt-discs'); if(box && nd) box.innerHTML = nd.innerHTML;
    }
    totalForm(); return;
  }
  if(el.dataset && el.dataset.nt === 'ja'){
    var s2 = st(); s2.plan.ja = s2.plan.ja || {};
    if(el.checked) s2.plan.ja[el.dataset.top] = Date.now(); else delete s2.plan.ja[el.dataset.top];
    E().salvarPlano(s2); window.nexoCronograma('edital');
  }
});
document.addEventListener('submit', function(e){
  if(e.target.id !== 'nt-form') return;
  e.preventDefault();
  var f = e.target, s = st(), p = s.plan ? JSON.parse(JSON.stringify(s.plan)) : {};
  p.cargo = (f.querySelector('[name="nt-cargo"]:checked') || {}).value || 'investigador';
  p.minutos = []; for(var w = 0; w < 7; w++) p.minutos[w] = +(f['nt-min-' + w].value || 0);
  p.discs = Array.prototype.map.call(f.querySelectorAll('[name="nt-disc"]:checked'), function(x){ return x.value; });
  var msg = document.getElementById('nt-total');
  if(!p.minutos.some(function(m){ return m > 0; })){ if(msg) msg.textContent = 'Escolha pelo menos um dia com tempo de estudo.'; return; }
  if(!p.discs.length){ if(msg) msg.textContent = 'Escolha pelo menos uma disciplina.'; return; }
  p.criado = p.criado || Date.now();
  s.plan = p; editando = false;
  var k = semanaAtualKey(s), ini = k && deIso(k) <= hoje0() && hoje0() < deIso(k) + 7 * DIA ? deIso(k) : hoje0();
  gerarESalvar(s, ini); aba = 'semana'; window.nexoCronograma();
});
document.addEventListener('click', function(e){
  var b = e.target.closest && e.target.closest('[data-nt]'); if(!b || b.tagName === 'INPUT') return;
  var a = b.dataset.nt, s = st();
  if(a === 'aba'){ window.nexoCronograma(b.dataset.aba); return; }
  if(a === 'editar'){ editando = true; window.nexoCronograma(); return; }
  if(a === 'cancelar'){ editando = false; window.nexoCronograma(); return; }
  if(a === 'gerar' || a === 'refazer'){
    var k = semanaAtualKey(s); gerarESalvar(s, a === 'refazer' && k ? deIso(k) : hoje0()); window.nexoCronograma('semana'); return;
  }
  if(a === 'proxima'){
    /* a próxima semana começa hoje (ou amanhã, se a atual começou hoje) */
    var kk = semanaAtualKey(s), prox = hoje0();
    if(kk && deIso(kk) >= prox) prox = deIso(kk) + DIA;
    gerarESalvar(s, prox); window.nexoCronograma('semana'); return;
  }
  if(a === 'abrirCard'){ aberta = aberta === b.dataset.id ? null : b.dataset.id; window.nexoCronograma('semana'); return; }
  if(a === 'modulo'){ window.nexoTarefaAtiva = null; if(typeof openModule === 'function') openModule(b.dataset.mod); return; }
  var r = b.dataset.id && tarefaPorId(s, b.dataset.id); if(!r) return;
  if(a === 'feito'){
    r.t.feito = r.t.feito ? 0 : Date.now(); E().salvarPlano(s);
    if(curAtual() === 'cronograma') window.nexoCronograma('semana'); else marcarBanner();
    return;
  }
  if(a === 'estudar'){ window.nexoTarefaAtiva = { id:r.t.id, mod:b.dataset.mod }; if(typeof openModule === 'function') openModule(b.dataset.mod); return; }
  if(a === 'praticar'){
    var tp = r.t.top && topico(r.t.top);
    if(window.nexoPraticar) window.nexoPraticar(tp && tp.mods.length ? { mod:tp.mods[0], status:'unsolved' } : { disc:DISC_SITE[r.t.disc] || '', status:'unsolved' });
  }
});

/* ---------- faixa da tarefa no topo do conteúdo ---------- */
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
      if(at && rc && m){
        var x = tarefaPorId(st(), at.id), tp = x && x.t.top && topico(x.t.top);
        if(x && tp && tp.mods.indexOf(m.id) >= 0){
          var outros = tp.mods.filter(function(id){ return id !== m.id; });
          rc.insertAdjacentHTML('afterbegin', '<div class="nt-banner' + (x.t.feito ? ' done' : '') + '" data-nx-skip style="--c:' + ED.disciplinas[x.t.disc].cor + '"><div><span class="nt-kicker">Tarefa da trilha · ' + TIPO[x.t.tipo] + ' · ' + fmtMin(x.t.min) + '</span><b>' + escH(tp.nome) + '</b>'
            + (outros.length ? '<span class="nt-outros">Também faz parte: ' + outros.map(function(id){ var mm = modulo(id); return '<button type="button" class="nt-link" data-nt="estudar" data-id="' + x.t.id + '" data-mod="' + id + '">' + escH(mm.title) + '</button>'; }).join(' ') + '</span>' : '') + '</div>'
            + '<div class="nt-btns"><button type="button" class="nx-btn small ghost" data-nx-auto="1">Marcar pontos importantes</button><button type="button" class="nx-btn small primary" data-nt="feito" data-id="' + x.t.id + '">' + (x.t.feito ? 'Tarefa concluída ✓' : 'Concluir tarefa') + '</button><button type="button" class="nx-btn small ghost" onclick="nexoCronograma(\'semana\')">Voltar à trilha</button></div></div>');
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
      var ref = nav.querySelector('.primary-nav'); /* "Painel de estudos" */
      var html = '<button type="button" class="primary-nav nx-nav-extra nt-nav' + (curAtual() === 'cronograma' ? ' active' : '') + '" onclick="nexoCronograma()">' + ICON.cal + ' Cronograma e trilha</button>';
      if(ref) ref.insertAdjacentHTML('afterend', html); else nav.insertAdjacentHTML('afterbegin', html);
      if(curAtual() === 'cronograma') Array.prototype.forEach.call(nav.querySelectorAll('.primary-nav.active:not(.nt-nav)'), function(x){ x.classList.remove('active'); });
    }catch(e){}
    return r;
  };
}
document.addEventListener('nexo:estudo', function(e){ if(e.detail === 'sincronizado' && curAtual() === 'cronograma' && !editando) window.nexoCronograma(); });

/* para testes e para o painel */
window.nexoTrilha = { gerarSemana:gerarSemana, topicos:topicos, progresso:progresso, edital:ED };
})();

/* menu inferior do celular: "Trilha" logo depois de "Painel" (Lei seca continua dentro dos módulos) */
(function(){
  function preparar(){
    var bar = document.querySelector('.access-bar'); if(!bar || bar.querySelector('[data-area="trilha"]')) return;
    var painel = bar.querySelector('[data-area="home"]'), lei = bar.querySelector('[data-area="law"]');
    if(lei) lei.classList.add('access-secondary');
    var html = '<button type="button" data-area="trilha" onclick="nexoCronograma()"><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2.5"/><path d="M3 10h18M8 3v4m8-4v4"/><path d="m8.5 15 2 2 4-4"/></svg><span>Trilha</span></button>';
    if(painel) painel.insertAdjacentHTML('afterend', html); else bar.insertAdjacentHTML('afterbegin', html);
  }
  var sa = window.syncAccess;
  window.syncAccess = function(){
    var r; try{ if(typeof sa === 'function') r = sa.apply(this, arguments); }catch(e){}
    preparar();
    var c = (function(){ try{ return current; }catch(e){ return null; } })();
    if(c === 'cronograma' || c === 'grifos'){
      Array.prototype.forEach.call(document.querySelectorAll('.access-bar [data-area]'), function(b){ b.classList.remove('selected'); b.removeAttribute('aria-current'); });
      var t = document.querySelector('.access-bar [data-area="trilha"]'); if(t && c === 'cronograma'){ t.classList.add('selected'); t.setAttribute('aria-current', 'page'); }
    }
    return r;
  };
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', preparar); else preparar();
})();

/* painel inicial: as tarefas de hoje da trilha (ou o convite para montar o cronograma) */
(function(){
  var DIA = 864e5, h0 = function(){ var d = new Date(); d.setHours(0, 0, 0, 0); return d.getTime(); };
  function iso(s){ var p = String(s).split('-'); return new Date(+p[0], +p[1] - 1, +p[2]).getTime(); }
  function esc(s){ return String(s == null ? '' : s).replace(/[&<>"']/g, function(c){ return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]; }); }
  function faixa(){
    var grid = document.querySelector('.stats-grid'); if(!grid || document.querySelector('.nt-hoje')) return;
    var s = window.nexoEstudo.plano(), ED = window.NEXO_EDITAIS.pcba, T = window.nexoTrilha, el = document.createElement('section');
    el.className = 'nt-hoje';
    if(!s.plan){
      el.innerHTML = '<div><b>Monte seu cronograma da PC-BA</b><span>Escolha o cargo, os dias e o tempo de estudo. A NEXO monta a trilha da semana na ordem certa de cada disciplina.</span></div><button type="button" class="nx-btn primary" onclick="nexoCronograma()">Montar cronograma</button>';
    }else{
      var ks = Object.keys(s.weeks || {}).sort(), hoje = h0(), k = ks.filter(function(x){ return iso(x) <= hoje && hoje < iso(x) + 7 * DIA; }).pop();
      var w = k && s.weeks[k], d = w ? Math.round((hoje - iso(k)) / DIA) : -1, lista = w ? w.tarefas.filter(function(t){ return t.d === d; }) : [];
      var nomes = { estudo:'Estudo', revisao:'Revisão', reforco:'Revisão rápida', questoes:'Questões' };
      var itens = lista.map(function(t){
        var disc = ED.disciplinas[t.disc] || {}, tp = null;
        if(t.top) Object.keys(ED.disciplinas).some(function(x){ tp = T.topicos(x).find(function(y){ return y.id === t.top; }); return tp; });
        return '<li class="' + (t.feito ? 'feito' : '') + '" style="--c:' + (disc.cor || '#888') + '"><span class="nt-sig">' + (disc.sigla || '') + '</span><span>' + nomes[t.tipo] + ': ' + esc(t.tipo === 'questoes' ? disc.nome : tp ? tp.nome : '') + '</span><small>' + Math.round(t.min) + ' min</small></li>';
      }).join('');
      var feitas = lista.filter(function(t){ return t.feito; }).length;
      el.innerHTML = '<div class="nt-hoje-txt"><b>Hoje na sua trilha</b><span>' + (!w ? 'A semana terminou. Gere a próxima para continuar.' : lista.length ? feitas + ' de ' + lista.length + ' tarefas feitas' : 'Dia de folga no seu cronograma.') + '</span>' + (itens ? '<ul>' + itens + '</ul>' : '') + '</div><button type="button" class="nx-btn primary" onclick="nexoCronograma(\'semana\')">Abrir a trilha</button>';
    }
    grid.insertAdjacentElement('beforebegin', el);
  }
  var hm = window.home;
  if(typeof hm === 'function') window.home = function(){ var r = hm.apply(this, arguments); try{ faixa(); }catch(e){} return r; };
  function inicial(){ try{ if(document.querySelector('.stats-grid')) faixa(); }catch(e){} }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', inicial); else setTimeout(inicial, 0);
})();
