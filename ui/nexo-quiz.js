/* NEXO · Quiz entre amigos.
   O administrador envia o PDF (ou cola o texto) de uma prova; a função quiz-extract lê as questões.
   Ele confere o gabarito e abre uma sala com código. Os amigos entram com o código, logados no NEXO,
   e respondem no celular. O placar e a pergunta atual chegam ao vivo pelo Supabase (tabelas quiz_*).
   Não altera questões do banco, gabaritos publicados nem o pipeline da nexo-ai.
   Gabarito das perguntas do quiz fica legível para quem está logado (ver docs/sql/2026-11-03-quiz.sql). */
(function(){
'use strict';
var ALT = 'ABCDE', CHARS = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789', TEMPOS = [15, 20, 30, 45];
var st = { tela:'inicio', uid:null, sala:null, perguntas:[], jog:[], canal:null, rascunho:null, tempo:20, msg:'', lendo:'', ocupado:false, autoRevelada:-1 };

function esc(s){ return String(s == null ? '' : s).replace(/[&<>"']/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }
function view(){ return document.getElementById('view'); }
function sb(){ try{ return typeof nexoSupabase !== 'undefined' ? nexoSupabase : null; }catch(e){ return null; } }
function agora(){ return Date.now(); }
function codigoAleatorio(){ var s = ''; for(var i = 0; i < 5; i++) s += CHARS.charAt(Math.floor(Math.random() * CHARS.length)); return s; }
async function eu(){
  if(st.uid) return st.uid;
  try { var r = await sb().auth.getUser(); st.uid = r && r.data && r.data.user ? r.data.user.id : null; } catch(e){ st.uid = null; }
  return st.uid;
}
function restanteMs(){
  if(!st.sala || st.sala.fase !== 'pergunta' || !st.sala.inicio) return 0;
  return Math.max(0, st.sala.tempo_s * 1000 - (agora() - Date.parse(st.sala.inicio)));
}
function minhaLinha(){ return st.jog.find(function(j){ return j.uid === st.uid; }) || null; }
function ehAnfitriao(){ return !!(st.sala && st.uid && st.sala.anfitriao === st.uid); }
function pergunta(i){ return st.perguntas.find(function(p){ return p.ordem === i; }) || null; }

/* ---------- Supabase ---------- */
function sairCanal(){ if(st.canal){ try{ sb().removeChannel(st.canal); }catch(e){} st.canal = null; } }
async function carregarSala(codigo){
  var r = await sb().from('quiz_salas').select('*').eq('codigo', codigo).maybeSingle();
  if(r.error) throw r.error;
  st.sala = r.data;
  return r.data;
}
async function carregarJogadores(){
  if(!st.sala) return;
  var r = await sb().from('quiz_jogadores').select('*').eq('codigo', st.sala.codigo).order('pontos', { ascending:false });
  if(!r.error) st.jog = r.data || [];
}
async function carregarPerguntas(){
  var r = await sb().from('quiz_perguntas').select('*').eq('codigo', st.sala.codigo).order('ordem');
  if(!r.error) st.perguntas = r.data || [];
}
function assinar(){
  sairCanal();
  var c = st.sala.codigo;
  st.canal = sb().channel('quiz-' + c)
    .on('postgres_changes', { event:'*', schema:'public', table:'quiz_salas', filter:'codigo=eq.' + c }, function(p){
      if(p.new && p.new.codigo){ st.sala = p.new; }
      desenhar();
    })
    .on('postgres_changes', { event:'*', schema:'public', table:'quiz_jogadores', filter:'codigo=eq.' + c }, async function(){
      await carregarJogadores(); desenhar();
    })
    .subscribe();
}

/* ---------- ações do anfitrião ---------- */
async function criarSala(){
  st.ocupado = true; st.msg = '';
  try {
    var uid = await eu();
    if(!uid) throw new Error('entre na sua conta do NEXO');
    var codigo = null;
    for(var t = 0; t < 6 && !codigo; t++){
      var c = codigoAleatorio();
      var ex = await sb().from('quiz_salas').select('codigo').eq('codigo', c).maybeSingle();
      if(!ex.data) codigo = c;
    }
    if(!codigo) throw new Error('não consegui gerar um código livre; tente de novo');
    var ins = await sb().from('quiz_salas').insert({ codigo:codigo, anfitriao:uid, fase:'lobby', pergunta_atual:0, tempo_s:st.tempo, total:st.rascunho.length });
    if(ins.error) throw ins.error;
    var linhas = st.rascunho.map(function(q, i){ return { codigo:codigo, ordem:i, pergunta:q.pergunta, alternativas:q.alternativas, gabarito:q.gabarito, disciplina:q.disciplina }; });
    var pq = await sb().from('quiz_perguntas').insert(linhas);
    if(pq.error) throw pq.error;
    st.rascunho = null;
    await carregarSala(codigo);
    await carregarPerguntas();
    await carregarJogadores();
    assinar();
    st.tela = 'lobby';
  } catch(e){ st.msg = 'Não consegui criar a sala: ' + (e.message || e); }
  finally { st.ocupado = false; desenhar(); }
}
async function iniciar(){
  await sb().from('quiz_salas').update({ fase:'pergunta', pergunta_atual:0, inicio:new Date().toISOString() }).eq('codigo', st.sala.codigo);
}
async function revelar(){
  if(!st.sala || st.sala.fase !== 'pergunta') return;
  await sb().from('quiz_salas').update({ fase:'revelada' }).eq('codigo', st.sala.codigo);
}
async function proxima(){
  var n = st.sala.pergunta_atual + 1;
  if(n >= st.sala.total){ await sb().from('quiz_salas').update({ fase:'encerrada' }).eq('codigo', st.sala.codigo); return; }
  await sb().from('quiz_salas').update({ fase:'pergunta', pergunta_atual:n, inicio:new Date().toISOString() }).eq('codigo', st.sala.codigo);
}

/* ---------- jogador ---------- */
async function entrar(codigo, nome){
  st.msg = '';
  var uid = await eu();
  if(!uid){ st.msg = 'Entre na sua conta do NEXO para jogar.'; return desenhar(); }
  var s = await carregarSala(codigo);
  if(!s){ st.msg = 'Sala não encontrada. Confira o código.'; return desenhar(); }
  var ins = await sb().from('quiz_jogadores').upsert({ codigo:codigo, uid:uid, nome:nome }, { onConflict:'codigo,uid', ignoreDuplicates:true });
  if(ins.error){ st.msg = 'Não entrou: ' + ins.error.message; return desenhar(); }
  await carregarPerguntas();
  await carregarJogadores();
  assinar();
  st.tela = 'sala';
  desenhar();
}
async function responder(i){
  if(st.ocupado || !st.sala || st.sala.fase !== 'pergunta') return;
  var me = minhaLinha(), idx = st.sala.pergunta_atual;
  if(!me || (me.respostas && me.respostas[idx])) return;
  var decorrido = agora() - Date.parse(st.sala.inicio);
  if(decorrido > st.sala.tempo_s * 1000 + 500){ st.msg = 'Tempo esgotado para esta pergunta.'; return desenhar(); }
  var q = pergunta(idx), ok = !!q && i === q.gabarito;
  var pts = ok ? Math.max(500, Math.round(1000 * (1 - decorrido / (2 * st.sala.tempo_s * 1000)))) : 0;
  var resp = Object.assign({}, me.respostas || {});
  resp[idx] = { c:i, t:decorrido, pts:pts };
  st.ocupado = true;
  var up = await sb().from('quiz_jogadores').update({ pontos:(me.pontos || 0) + pts, respostas:resp }).eq('codigo', st.sala.codigo).eq('uid', st.uid);
  st.ocupado = false;
  if(up.error) st.msg = 'Resposta não gravada: ' + up.error.message;
  await carregarJogadores();
  desenhar();
}

/* ---------- leitura da prova (PDF ou texto colado) ---------- */
async function lerPdf(arquivo){
  if(!window.pdfjsLib) throw new Error('leitor de PDF não carregou; cole o texto da prova');
  window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
  var pdf = await window.pdfjsLib.getDocument({ data:new Uint8Array(await arquivo.arrayBuffer()), disableWorker:true }).promise;
  var out = '';
  for(var p = 1; p <= pdf.numPages; p++){
    var pg = await pdf.getPage(p);
    var tc = await pg.getTextContent();
    out += tc.items.map(function(it){ return it.str; }).join(' ') + '\n\n';
  }
  return out;
}
function partes(texto, tam){
  var lista = [], cur = '';
  texto.split('\n').forEach(function(l){ if(cur.length + l.length > tam && cur){ lista.push(cur); cur = ''; } cur += l + '\n'; });
  if(cur.trim()) lista.push(cur);
  return lista;
}
async function lerQuestoes(texto){
  var trechos = partes(texto, 9000), achadas = [];
  for(var i = 0; i < trechos.length; i++){
    st.lendo = 'Lendo parte ' + (i + 1) + ' de ' + trechos.length + '…'; desenhar();
    var r = await sb().functions.invoke('quiz-extract', { body:{ text:trechos[i] } });
    if(r.error) throw new Error(r.error.message || 'falha na leitura');
    var lista = r.data && Array.isArray(r.data.questions) ? r.data.questions : [];
    achadas = achadas.concat(lista);
  }
  st.lendo = '';
  return achadas.filter(function(q){ return q && q.pergunta && Array.isArray(q.alternativas) && q.alternativas.length >= 2; })
    .map(function(q){
      return { pergunta:String(q.pergunta), alternativas:q.alternativas.slice(0, 5).map(String),
        gabarito: ALT.indexOf(String(q.gabarito || '').toUpperCase()), disciplina:String(q.disciplina || '') };
    });
}


/* Leitura sem IA: questões e gabarito colados em texto (formato do PDF copiado). */
function lerColado(texto){
  var linhas = String(texto || '').replace(/\r/g, '').split('\n').map(function(l){ return l.trim(); });
  var iG = -1;
  for(var k = 0; k < linhas.length; k++){ if(/^gabarito\b/i.test(linhas[k])){ iG = k; break; } }
  var corpo = iG >= 0 ? linhas.slice(0, iG) : linhas;
  var gab = {}, g, rg = /(\d{1,3})\.\s*([A-E])\b/g;
  if(iG >= 0){ var tg = linhas.slice(iG + 1).join(' '); while((g = rg.exec(tg))){ gab[+g[1]] = g[2]; } }
  var qs = [], atual = null, esperado = 1;
  corpo.forEach(function(l){
    if(!l || /^100 Questões/i.test(l) || /^Questões sem comentário/i.test(l)) return;
    var mQ = l.match(new RegExp('^' + esperado + '\\.\\s*(.*)$'));
    if(mQ){
      atual = { n: esperado, enun: [], alts: [] }; qs.push(atual); esperado++;
      var resto = mQ[1].replace(/^\(CEBRASPE[^)]*\)\s*/, '').trim();
      if(resto) atual.enun.push(resto);
      return;
    }
    if(!atual) return;
    var mA = l.match(/^([A-E])\)\s*(.*)$/);
    if(mA && mA[1] === ALT.charAt(atual.alts.length)){ atual.alts.push(mA[2]); return; }
    if(atual.alts.length) atual.alts[atual.alts.length - 1] += ' ' + l;
    else atual.enun.push(l);
  });
  return qs.map(function(q){
    var pergunta = q.enun.join(' ').replace(/\s+/g, ' ').trim();
    var alts = q.alts.length ? q.alts.map(function(a){ return a.replace(/\s+/g, ' ').trim(); }) : ['Certo', 'Errado'];
    var l = gab[q.n] || '', gi;
    if(q.alts.length) gi = ALT.indexOf(l);
    else gi = l === 'C' ? 0 : (l === 'E' ? 1 : -1);
    return { pergunta: pergunta, alternativas: alts, gabarito: gi, disciplina: '' };
  }).filter(function(q){ return q.pergunta; });
}

/* ---------- telas ---------- */
function telaInicio(){
  return '' +
  '<section class="qz-hero"><span class="qz-tag">Estudo em grupo</span><h1>Quiz entre amigos</h1>' +
  '<p>Envie uma prova, abra uma sala com código e os amigos respondem no celular, cada um no seu ritmo, com placar ao vivo.</p></section>' +
  '<div class="qz-grid">' +
    '<section class="qz-card"><h2>Criar sala</h2><p class="qz-muted">Você envia o PDF da prova. O NEXO lê as questões e você confere o gabarito antes de abrir a sala.</p>' +
      '<button class="qz-btn" data-q="criar">Criar sala com PDF</button></section>' +
    '<section class="qz-card"><h2>Entrar em sala</h2><p class="qz-muted">Digite o código que o anfitrião passou.</p>' +
      '<label class="qz-f">Código<input id="qz-cod" maxlength="5" autocapitalize="characters" placeholder="ABCDE" value="' + esc(st.codigoPre || '') + '"></label>' +
      '<label class="qz-f">Apelido<input id="qz-nome" maxlength="20" placeholder="Como os amigos vão te ver"></label>' +
      '<button class="qz-btn" data-q="entrar">Entrar</button></section>' +
  '</div>' + msgHtml();
}
function telaRascunho(){
  if(!st.rascunho){
    return '<section class="qz-card qz-wide"><h2>Enviar a prova</h2>' +
      '<label class="qz-f">Arquivo PDF<input id="qz-pdf" type="file" accept="application/pdf"></label>' +
      '<label class="qz-f">Ou cole o texto da prova<textarea id="qz-texto" rows="7" placeholder="Cole aqui o texto das questões"></textarea></label>' +
      '<div class="qz-row"><button class="qz-btn" data-q="ler" ' + (st.lendo ? 'disabled' : '') + '>Ler questões</button>' +
      '<span class="qz-muted">' + esc(st.lendo) + '</span></div>' +
      '<label class="qz-f">Ou cole as questões e o gabarito (sem IA)<textarea id="qz-colado" rows="7" placeholder="1. (CEBRASPE ...) texto da questão&#10;A) alternativa&#10;...&#10;Gabarito&#10;1. C  2. E"></textarea></label>' +
      '<div class="qz-row"><button class="qz-btn ghost" data-q="colar">Usar texto colado (sem IA)</button></div>' +
      '<button class="qz-btn ghost" data-q="voltar">Voltar</button></section>' + msgHtml();
  }
  var falta = st.rascunho.filter(function(q){ return q.gabarito < 0; }).length;
  return '<section class="qz-card qz-wide"><h2>Conferir ' + st.rascunho.length + ' questões</h2>' +
    '<p class="qz-muted">Defina o gabarito de cada questão. ' + (falta ? 'Faltam ' + falta + '.' : 'Tudo pronto.') + '</p>' +
    '<label class="qz-f">Tempo por pergunta<select id="qz-tempo">' + TEMPOS.map(function(s){ return '<option value="' + s + '"' + (s === st.tempo ? ' selected' : '') + '>' + s + ' segundos</option>'; }).join('') + '</select></label>' +
    '<div class="qz-lista">' + st.rascunho.map(function(q, i){
      return '<article class="qz-q"><header><b>' + (i + 1) + '.</b> <span class="qz-muted">' + esc(q.disciplina) + '</span></header>' +
        '<p>' + esc(q.pergunta) + '</p>' +
        '<ol class="qz-alts">' + q.alternativas.map(function(a, j){ return '<li><b>' + ALT.charAt(j) + ')</b> ' + esc(a) + '</li>'; }).join('') + '</ol>' +
        '<div class="qz-row"><label class="qz-f">Gabarito<select data-gab="' + i + '"><option value="-1">Definir</option>' +
        q.alternativas.map(function(a, j){ return '<option value="' + j + '"' + (q.gabarito === j ? ' selected' : '') + '>' + ALT.charAt(j) + '</option>'; }).join('') +
        '</select></label><button class="qz-btn ghost" data-del="' + i + '">Remover</button></div></article>';
    }).join('') + '</div>' +
    '<div class="qz-row"><button class="qz-btn" data-q="criarSala" ' + (falta || st.ocupado ? 'disabled' : '') + '>Criar sala</button>' +
    '<button class="qz-btn ghost" data-q="voltar">Voltar</button></div>' + msgHtml() + '</section>';
}
function telaLobby(){
  return '<section class="qz-card qz-wide qz-centro"><h2>Sala aberta</h2>' +
    '<p class="qz-muted">Mande este código para os amigos. Eles entram pela aba Quiz, em "Entrar em sala".</p>' +
    '<div class="qz-codigo">' + esc(st.sala.codigo) + '</div>' +
    '<p class="qz-muted">Ou mande o link (os amigos entram com o código já preenchido):</p>' +
    '<div class="qz-row"><input id="qz-link" readonly value="' + esc(linkConvite(st.sala.codigo)) + '" style="flex:1;min-width:0"></div>' +
    '<div class="qz-row"><button class="qz-btn ghost" data-q="copiar">Copiar código</button>' +
    '<button class="qz-btn ghost" data-q="copiarLink">Copiar link</button></div></section>' +
    '<section class="qz-card qz-wide"><h2>Jogadores (' + st.jog.length + ')</h2>' +
    '<ol class="qz-rank">' + (st.jog.map(function(j){ return '<li>' + esc(j.nome) + '</li>'; }).join('') || '<li class="qz-muted">Esperando alguém entrar…</li>') + '</ol>' +
    '<button class="qz-btn" data-q="iniciar" ' + (st.jog.length ? '' : 'disabled') + '>Começar</button></section>' + msgHtml();
}
function telaPergunta(){
  var s = st.sala, q = pergunta(s.pergunta_atual), host = ehAnfitriao(), revelada = s.fase === 'revelada';
  if(!q) return '<section class="qz-card qz-wide"><p class="qz-muted">Carregando pergunta…</p></section>';
  var me = minhaLinha(), mine = me && me.respostas ? me.respostas[s.pergunta_atual] : null;
  var respondidas = st.jog.filter(function(j){ return j.respostas && j.respostas[s.pergunta_atual]; }).length;
  var restante = restanteMs(), tempoAcabou = !revelada && restante <= 0;
  var alts = q.alternativas.map(function(a, j){
    var cls = ['qz-alt'];
    if(mine && mine.c === j) cls.push('sel');
    if(revelada && j === q.gabarito) cls.push('certa');
    if(revelada && mine && mine.c === j && j !== q.gabarito) cls.push('errada');
    var dis = host || !!mine || revelada || tempoAcabou;
    return '<button class="' + cls.join(' ') + '" data-ans="' + j + '" ' + (dis ? 'disabled' : '') + '><b>' + ALT.charAt(j) + ')</b> ' + esc(a) + '</button>';
  }).join('');
  var rodape = '';
  if(host){
    rodape = revelada
      ? '<button class="qz-btn" data-q="proxima">' + (s.pergunta_atual + 1 >= s.total ? 'Ver resultado' : 'Próxima pergunta') + '</button>'
      : '<button class="qz-btn ghost" data-q="revelar">Revelar agora</button>';
  }
  var feedback = '';
  if(revelada){
    feedback = mine ? (mine.pts > 0 ? '<p class="qz-ok">Acertou: +' + mine.pts + ' pontos</p>' : '<p class="qz-muted">Não foi dessa vez.</p>') : '<p class="qz-muted">Você não respondeu.</p>';
  } else if(mine){
    feedback = '<p class="qz-muted">Resposta enviada. Aguardando o tempo.</p>';
  } else if(tempoAcabou){
    feedback = '<p class="qz-muted">Tempo esgotado.</p>';
  }
  return '<section class="qz-card qz-wide">' +
    '<header class="qz-topo"><span class="qz-muted">Pergunta ' + (s.pergunta_atual + 1) + ' de ' + s.total + ' · ' + esc(q.disciplina) + '</span>' +
    '<span class="qz-timer" id="qz-timer">' + (revelada ? 'Revelada' : Math.ceil(restante / 1000) + 's') + '</span></header>' +
    '<div class="qz-barra"><i id="qz-bar" style="width:' + Math.round(100 * restante / (s.tempo_s * 1000)) + '%"></i></div>' +
    '<h2 class="qz-enun">' + esc(q.pergunta) + '</h2>' +
    '<div class="qz-alts-btn">' + alts + '</div>' + feedback +
    (host ? '<p class="qz-muted">' + respondidas + ' de ' + st.jog.length + ' responderam.</p>' : '') +
    '<div class="qz-row">' + rodape + '</div>' + msgHtml() + '</section>' +
    '<section class="qz-card qz-wide"><h2>Placar</h2>' + rankHtml() + '</section>';
}
function rankHtml(){
  var lista = st.jog.slice().sort(function(a, b){ return (b.pontos || 0) - (a.pontos || 0); });
  return '<ol class="qz-rank">' + (lista.map(function(j){ return '<li class="' + (j.uid === st.uid ? 'me' : '') + '">' + esc(j.nome) + ' — ' + (j.pontos || 0) + ' pts</li>'; }).join('') || '<li class="qz-muted">Ninguém ainda.</li>') + '</ol>';
}
function telaFim(){
  return '<section class="qz-card qz-wide"><h1>Resultado final</h1>' + rankHtml() +
    '<div class="qz-row"><button class="qz-btn" data-q="sair">Voltar ao início</button></div></section>';
}
function telaEsperando(){
  return '<section class="qz-card qz-wide"><h2>Você entrou</h2><p class="qz-muted">Sala ' + esc(st.sala.codigo) + '. Esperando o anfitrião começar…</p>' + rankHtml() + '</section>';
}
function telaSala(){
  if(st.sala.fase === 'lobby') return ehAnfitriao() ? telaLobby() : telaEsperando();
  if(st.sala.fase === 'encerrada') return telaFim();
  return telaPergunta();
}
function msgHtml(){ return st.msg ? '<p class="qz-erro">' + esc(st.msg) + '</p>' : ''; }

function desenhar(){
  var v = view(); if(!v) return;
  var conteudo;
  if(st.tela === 'inicio') conteudo = telaInicio();
  else if(st.tela === 'rascunho') conteudo = telaRascunho();
  else if((st.tela === 'lobby' || st.tela === 'sala') && st.sala) conteudo = telaSala();
  else conteudo = telaInicio();
  v.innerHTML = '<div class="qz">' + conteudo + '</div>';
  ligar(v);
}
function ligar(v){
  v.querySelectorAll('[data-q]').forEach(function(b){ b.onclick = acao; });
  v.querySelectorAll('[data-ans]').forEach(function(b){ b.onclick = function(){ responder(+b.dataset.ans); }; });
  v.querySelectorAll('[data-gab]').forEach(function(s){ s.onchange = function(){ st.rascunho[+s.dataset.gab].gabarito = +s.value; desenhar(); }; });
  v.querySelectorAll('[data-del]').forEach(function(b){ b.onclick = function(){ st.rascunho.splice(+b.dataset.del, 1); desenhar(); }; });
  var t = document.getElementById('qz-tempo'); if(t) t.onchange = function(){ st.tempo = +t.value; };
}
async function acao(ev){
  var a = ev.currentTarget.dataset.q;
  st.msg = '';
  if(a === 'criar'){ st.tela = 'rascunho'; st.rascunho = null; return desenhar(); }
  if(a === 'voltar'){ st.tela = st.sala ? 'lobby' : 'inicio'; st.rascunho = null; return desenhar(); }
  if(a === 'colar'){
    var qc = lerColado((document.getElementById('qz-colado') || {}).value || '');
    if(!qc.length){ st.msg = 'Não encontrei questões no texto colado.'; return desenhar(); }
    st.rascunho = qc; return desenhar();
  }
  if(a === 'ler'){
    try{
      var f = document.getElementById('qz-pdf'), txt = (document.getElementById('qz-texto').value || '').trim();
      if(f && f.files && f.files[0]) txt = await lerPdf(f.files[0]);
      if(!txt){ st.msg = 'Envie um PDF ou cole o texto.'; return desenhar(); }
      var qs = await lerQuestoes(txt);
      if(!qs.length){ st.msg = 'Não encontrei questões nesse texto.'; st.lendo = ''; return desenhar(); }
      st.rascunho = qs;
    } catch(e){ st.lendo = ''; st.msg = 'Não consegui ler: ' + (e.message || e); }
    return desenhar();
  }
  if(a === 'criarSala') return criarSala();
  if(a === 'copiar'){ try{ await navigator.clipboard.writeText(st.sala.codigo); st.msg = 'Código copiado.'; }catch(e){ st.msg = 'Selecione e copie o código.'; } return desenhar(); }
  if(a === 'copiarLink'){ try{ await navigator.clipboard.writeText(linkConvite(st.sala.codigo)); st.msg = 'Link copiado.'; }catch(e){ st.msg = 'Selecione e copie o link.'; } return desenhar(); }
  if(a === 'iniciar') return iniciar();
  if(a === 'revelar') return revelar();
  if(a === 'proxima') return proxima();
  if(a === 'entrar'){
    var cod = (document.getElementById('qz-cod').value || '').trim().toUpperCase(), nome = (document.getElementById('qz-nome').value || '').trim();
    if(cod.length !== 5){ st.msg = 'O código tem 5 letras.'; return desenhar(); }
    if(!nome){ st.msg = 'Escolha um apelido.'; return desenhar(); }
    return entrar(cod, nome);
  }
  if(a === 'sair'){ sairCanal(); st.sala = null; st.perguntas = []; st.jog = []; st.tela = 'inicio'; return desenhar(); }
}

/* Anfitrião: revela sozinho quando o tempo acaba (uma vez por pergunta). */
setInterval(function(){
  var t = document.getElementById('qz-timer');
  if(st.sala && st.sala.fase === 'pergunta' && t){
    var r = restanteMs();
    t.textContent = Math.ceil(r / 1000) + 's';
    var bar = document.getElementById('qz-bar'); if(bar) bar.style.width = Math.round(100 * r / (st.sala.tempo_s * 1000)) + '%';
    if(r <= 0 && ehAnfitriao() && st.autoRevelada !== st.sala.pergunta_atual){ st.autoRevelada = st.sala.pergunta_atual; revelar(); }
  }
}, 250);

function linkConvite(codigo){
  return 'https://almadaseara.github.io/NEXO/?quiz=' + encodeURIComponent(codigo);
}
function codigoDaUrl(){
  try{ var c = new URLSearchParams(location.search).get('quiz'); return c ? c.toUpperCase().replace(/[^A-Z2-9]/g,'').slice(0,5) : ''; }catch(e){ return ''; }
}
window.nexoQuiz = function(){
  if(typeof fecharMenuMovel === 'function') fecharMenuMovel();
  if(typeof setCur === 'function') setCur('quiz');
  if(typeof renderNav === 'function') try{ renderNav(); }catch(e){}
  if(typeof setHead === 'function') setHead('Quiz entre amigos');
  var cu = codigoDaUrl();
  if(cu && st.tela === 'inicio'){ st.codigoPre = cu; }
  desenhar();
};
if(codigoDaUrl()){ setTimeout(function(){ try{ window.nexoQuiz(); }catch(e){} }, 1500); }
})();
