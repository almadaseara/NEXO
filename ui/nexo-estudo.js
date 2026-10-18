/* NEXO — dados de estudo do aluno: cronograma, trilha, progresso e marcações de texto.
   Guarda sempre no navegador (para funcionar sem conexão) e, com a conta conectada, sincroniza
   com o Supabase nas tabelas study_plans e study_highlights (cada aluno só vê as próprias linhas).
   Não toca no banco de questões.
   Sincronização (auditoria S-01 a S-04): o que falta enviar fica numa fila guardada no navegador
   (nexo_estudo_fila), sai dela só depois que o Supabase confirma, e é reenviado ao abrir o site, ao voltar
   a conexão e a cada minuto. Se o envio falha, aparece "Não sincronizado". Entre aparelhos, uma alteração
   local ainda não enviada nunca é descartada: marcações e progresso se juntam pelo id. */
(function(){
'use strict';

var KP = 'nexo_estudo', KM = 'nexo_marcas', KF = 'nexo_estudo_fila';

function ler(k, d){ try{ var v = JSON.parse(localStorage.getItem(k)); return v == null ? d : v; }catch(e){ return d; } }
function gravar(k, v){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){} }
function agoraISO(){ return new Date().toISOString(); }
function cliente(){ try{ return typeof nexoSupabase !== 'undefined' ? nexoSupabase : null; }catch(e){ return null; } }

var usuario = null, sincronizando = false, avisos = [], estado = 'ok';
function avisar(tipo){ avisos.forEach(function(f){ try{ f(tipo); }catch(e){} }); try{ document.dispatchEvent(new CustomEvent('nexo:estudo', { detail:tipo })); }catch(e){} }

/* ---------- fila do que falta enviar ---------- */
function fila(){ var f = ler(KF, null); return f && typeof f === 'object' ? { plano:f.plano || null, marcas:f.marcas || {} } : { plano:null, marcas:{} }; }
function gravarFila(f){ gravar(KF, f); }
function temPendencia(){ var f = fila(); return !!f.plano || Object.keys(f.marcas).length > 0 || pendenteH(); }
function marcarEstado(novo){
  if(novo === estado) return;
  estado = novo; desenharAviso(); avisar('estado');
}

/* ---------- plano (cronograma + trilha + o que já foi estudado) ---------- */
function plano(){ var p = ler(KP, null); return p && typeof p === 'object' ? p : { plan:null, progress:{}, weeks:{}, updated_at:null }; }
var tPlano = null;
function salvarPlano(p){
  p.updated_at = agoraISO(); gravar(KP, p);
  var f = fila(); f.plano = p.updated_at; gravarFila(f);
  clearTimeout(tPlano); tPlano = setTimeout(enviarPlano, 1200);
  avisar('plano');
}
async function enviarPlano(){
  tPlano = null;
  var sb = cliente(); if(!sb || !usuario) return;
  var p = plano(), enviado = p.updated_at || agoraISO();
  try{
    var r = await sb.from('study_plans').upsert({ user_id:usuario.id, plan:p.plan || {}, progress:p.progress || {}, weeks:p.weeks || {}, updated_at:enviado }, { onConflict:'user_id' });
    if(r && r.error) throw r.error;
    var f = fila(); if(f.plano === enviado || !f.plano){ f.plano = null; gravarFila(f); } /* mudou durante o envio: continua na fila */
    if(!temPendencia()) marcarEstado('ok');
  }catch(e){ marcarEstado('erro'); }
}

/* ---------- marcações por módulo e aba ---------- */
function todas(){ var m = ler(KM, {}); return m && typeof m === 'object' ? m : {}; }
function marcas(chave){ var m = todas()[chave]; return m || { marks:[], settings:{}, updated_at:null }; }
var tMarcas = null;
function salvarMarcas(chave, valor){
  var t = todas(); valor.updated_at = agoraISO(); t[chave] = valor; gravar(KM, t);
  var f = fila(); f.marcas[chave] = valor.updated_at; gravarFila(f);
  clearTimeout(tMarcas); tMarcas = setTimeout(enviarMarcas, 1200);
  avisar('marcas');
}
async function enviarMarcas(){
  tMarcas = null;
  var sb = cliente(); if(!sb || !usuario) return;
  var t = todas(), enviados = {};
  var linhas = Object.keys(fila().marcas).filter(function(k){ return t[k]; }).map(function(k){
    var p = k.split('|'); enviados[k] = t[k].updated_at || agoraISO();
    return { user_id:usuario.id, module_id:p[0], tab:p[1] || 'resumo', marks:t[k].marks || [], settings:t[k].settings || {}, updated_at:enviados[k] };
  });
  if(!linhas.length){ var f0 = fila(); f0.marcas = {}; gravarFila(f0); return; }
  try{
    var r = await sb.from('study_highlights').upsert(linhas, { onConflict:'user_id,module_id,tab' });
    if(r && r.error) throw r.error;
    /* tira da fila só o que foi enviado e não mudou durante o envio */
    var f = fila();
    Object.keys(enviados).forEach(function(k){ if(f.marcas[k] === enviados[k] || !t[k]) delete f.marcas[k]; });
    gravarFila(f);
    if(!temPendencia()) marcarEstado('ok');
  }catch(e){ marcarEstado('erro'); }
}
function enviarTudo(){ if(!usuario) return; var f = fila(); if(f.plano) enviarPlano(); if(Object.keys(f.marcas).length) enviarMarcas(); if(pendenteH()) enviarHistorico(); }

/* ---------- mesclagem entre aparelhos ---------- */
function juntarPorId(a, b){ /* listas: une pelos ids; o item local (b) vale quando os dois têm o mesmo id */
  var mapa = {}, ordem = [];
  (a || []).concat(b || []).forEach(function(x){
    var id = x && typeof x === 'object' && x.id; if(!id){ ordem.push(x); return; }
    if(!(id in mapa)) ordem.push(id);
    mapa[id] = x;
  });
  return ordem.map(function(x){ return typeof x === 'string' && x in mapa ? mapa[x] : x; });
}
function juntarProgresso(servidor, local){
  var out = Object.assign({}, servidor || {});
  Object.keys(local || {}).forEach(function(k){
    var s = out[k], l = local[k];
    if(Array.isArray(s) && Array.isArray(l)) out[k] = juntarPorId(s, l);
    else if(s && l && typeof s === 'object' && typeof l === 'object') out[k] = Object.assign({}, s, l);
    else out[k] = l;
  });
  return out;
}

/* ---------- sincronização ao entrar na conta ---------- */
async function sincronizar(){
  var sb = cliente(); if(!sb || !sb.auth || sincronizando) return;
  sincronizando = true;
  try{
    var s = await sb.auth.getSession(), sess = s && s.data && s.data.session;
    usuario = sess ? sess.user : null;
    if(!usuario){ sincronizando = false; avisar('conta'); return; }
    /* outra conta neste aparelho: separa os dados antes de ler ou enviar qualquer coisa (N-02) */
    if(window.nexoConta && window.nexoConta.trocar(usuario.id)) avisar('conta');
    var f = fila();
    /* plano */
    var r = await sb.from('study_plans').select('plan,progress,weeks,updated_at').eq('user_id', usuario.id).maybeSingle();
    if(r && r.error) throw r.error;
    var local = plano();
    if(r && r.data && r.data.updated_at && (!local.updated_at || r.data.updated_at > local.updated_at)){
      var srv = { plan:r.data.plan && Object.keys(r.data.plan).length ? r.data.plan : null, progress:r.data.progress || {}, weeks:r.data.weeks || {}, updated_at:r.data.updated_at };
      if(f.plano){ /* alteração local não enviada + versão mais nova no servidor: junta o progresso e mantém o resto local */
        srv = { plan:local.plan || srv.plan, progress:juntarProgresso(srv.progress, local.progress), weeks:Object.assign({}, srv.weeks, local.weeks), updated_at:agoraISO() };
        f.plano = srv.updated_at;
      }
      gravar(KP, srv);
    }else if(local.plan || (local.progress && Object.keys(local.progress).length)){ f.plano = f.plano || local.updated_at || agoraISO(); }
    /* marcações: por módulo e aba */
    var rm = await sb.from('study_highlights').select('module_id,tab,marks,settings,updated_at').eq('user_id', usuario.id);
    if(rm && rm.error) throw rm.error;
    var t = todas(), vistos = {};
    (rm.data || []).forEach(function(l){
      var k = l.module_id + '|' + l.tab; vistos[k] = 1;
      var srvM = { marks:l.marks || [], settings:l.settings || {}, updated_at:l.updated_at };
      if(!t[k] || !t[k].updated_at){ t[k] = srvM; return; }
      if(l.updated_at > t[k].updated_at){
        if(f.marcas[k]){ t[k] = { marks:juntarPorId(srvM.marks, t[k].marks), settings:Object.assign({}, srvM.settings, t[k].settings), updated_at:agoraISO() }; f.marcas[k] = t[k].updated_at; }
        else t[k] = srvM;
      }else if(t[k].updated_at > l.updated_at) f.marcas[k] = t[k].updated_at;
    });
    Object.keys(t).forEach(function(k){ if(!vistos[k]) f.marcas[k] = t[k].updated_at || agoraISO(); });
    gravar(KM, t); gravarFila(f);
    await baixarHistorico();
    if(f.plano) await enviarPlano();
    if(Object.keys(f.marcas).length) await enviarMarcas();
    if(pendenteH()) await enviarHistorico();
    if(!temPendencia()) marcarEstado('ok');
    avisar('sincronizado');
  }catch(e){ marcarEstado('erro'); }
  sincronizando = false;
}

/* ---------- histórico de questões e revisão (tabelas study_answers e study_events) ---------- */
var HF = 'nexo_historico_fila', tHist = null;
function filaH(){
  var f = ler(HF, null);
  return f && typeof f === 'object'
    ? { respostas:f.respostas || {}, resolvidas:f.resolvidas || {}, eventos:f.eventos || {} }
    : { respostas:{}, resolvidas:{}, eventos:{} };
}
function pendenteH(){ var f = filaH(); return Object.keys(f.respostas).length + Object.keys(f.resolvidas).length + Object.keys(f.eventos).length > 0; }
/* lê todas as linhas de uma consulta, de 1000 em 1000 (limite padrão do Supabase) */
async function paginar(fazer){
  var todas = [], n = 0;
  for(;;){
    var r = await fazer(n, n + 999);
    if(r && r.error) throw r.error;
    var d = (r && r.data) || [];
    todas = todas.concat(d); n += d.length;
    if(d.length < 1000) break;
  }
  return todas;
}
async function enviarHistorico(){
  tHist = null;
  var sb = cliente(); if(!sb || !usuario) return;
  var f = filaH(), st = ler('nexo_practice_answers', {}) || {}, res = ler('nexo_caderno_resolvidas', {}) || {};
  var chaves = Object.keys(f.respostas).concat(Object.keys(f.resolvidas)).filter(function(k, i, a){ return a.indexOf(k) === i; });
  var enviados = {};
  try{
    var comResposta = chaves.filter(function(k){ return st[k] && st[k].done; });
    for(var i = 0; i < comResposta.length; i += 500){
      var lote = comResposta.slice(i, i + 500).map(function(k){
        enviados[k] = { at:st[k].at, res:res[k] || 0 };
        return { user_id:usuario.id, skey:k, ok:!!st[k].ok, letra:st[k].r || '', answered_at:new Date(st[k].at).toISOString(), resolvida_em:res[k] ? new Date(res[k]).toISOString() : null };
      });
      var r = await sb.from('study_answers').upsert(lote, { onConflict:'user_id,skey' });
      if(r && r.error) throw r.error;
    }
    var ids = Object.keys(f.eventos), locais = {}, enviadosEv = {};
    ler('nexo_eventos', []).forEach(function(e){ if(e && e.id && f.eventos[e.id]) locais[e.id] = e; });
    var comEvento = Object.keys(locais);
    for(var j = 0; j < comEvento.length; j += 500){
      var pacote = comEvento.slice(j, j + 500);
      var linhas = pacote.map(function(id){
        var e = locais[id];
        return { user_id:usuario.id, ev_id:id, t:Math.round(e.t || 0), k:String(e.k || ''), m:e.m == null ? null : String(e.m),
          ok:e.ok == null ? null : !!e.ok, g:e.g == null ? null : +e.g, ms:e.ms == null ? null : Math.round(e.ms) };
      });
      var r2 = await sb.from('study_events').upsert(linhas, { onConflict:'user_id,ev_id' });
      if(r2 && r2.error) throw r2.error;
      pacote.forEach(function(id){ enviadosEv[id] = 1; });
    }
    /* tira da fila o que foi enviado e não mudou durante o envio; o que não tem mais resposta é descartado */
    var g = filaH(), atual = ler('nexo_practice_answers', {}) || {}, resAtual = ler('nexo_caderno_resolvidas', {}) || {};
    Object.keys(enviados).forEach(function(k){
      if(atual[k] && atual[k].at === enviados[k].at && (resAtual[k] || 0) === enviados[k].res){ delete g.respostas[k]; delete g.resolvidas[k]; }
    });
    chaves.forEach(function(k){ if(!(atual[k] && atual[k].done)) { delete g.respostas[k]; delete g.resolvidas[k]; } });
    Object.keys(enviadosEv).forEach(function(id){ delete g.eventos[id]; });
    Object.keys(g.eventos).forEach(function(id){ if(!locais[id]) delete g.eventos[id]; });
    gravar(HF, g);
    if(!temPendencia()) marcarEstado('ok');
  }catch(e){ marcarEstado('erro'); }
}
/* baixa o histórico da conta e junta com o do aparelho (o que ainda não foi enviado daqui tem prioridade) */
async function baixarHistorico(){
  var sb = cliente(); if(!sb || !usuario) return;
  var f = filaH(), st = ler('nexo_practice_answers', {}) || {}, res = ler('nexo_caderno_resolvidas', {}) || {};
  var linhas = await paginar(function(a, b){
    return sb.from('study_answers').select('skey,ok,letra,answered_at,resolvida_em').eq('user_id', usuario.id).order('skey').range(a, b);
  });
  linhas.forEach(function(l){
    var at = Date.parse(l.answered_at) || 0, loc = st[l.skey];
    if(!f.respostas[l.skey] && (!loc || !loc.done || at > (loc.at || 0))){
      st[l.skey] = { done:true, ok:!!l.ok, r:l.letra || '', at:at };
    }
    if(l.resolvida_em && !f.resolvidas[l.skey]){
      var rt = Date.parse(l.resolvida_em) || 0;
      if(rt > (res[l.skey] || 0)) res[l.skey] = rt;
    }
  });
  gravar('nexo_practice_answers', st); gravar('nexo_caderno_resolvidas', res);
  var eventos = await paginar(function(a, b){
    return sb.from('study_events').select('ev_id,t,k,m,ok,g,ms').eq('user_id', usuario.id).order('t', { ascending:false }).range(a, b);
  });
  var porId = {};
  ler('nexo_eventos', []).forEach(function(e){ if(e && e.id) porId[e.id] = e; });
  eventos.forEach(function(r){
    if(porId[r.ev_id]) return;
    var e = { id:r.ev_id, t:Number(r.t), k:r.k };
    if(r.m != null) e.m = r.m; if(r.ok != null) e.ok = r.ok; if(r.g != null) e.g = r.g; if(r.ms != null) e.ms = r.ms;
    porId[r.ev_id] = e;
  });
  var lista = Object.keys(porId).map(function(k){ return porId[k]; }).sort(function(x, y){ return x.t - y.t; });
  if(lista.length > 20000) lista = lista.slice(-20000);
  gravar('nexo_eventos', lista);
}

/* ---------- aviso "Não sincronizado" ---------- */
function desenharAviso(){
  var el = document.getElementById('nx-sync');
  if(estado !== 'erro'){ if(el) el.remove(); return; }
  if(!el){
    el = document.createElement('button');
    el.id = 'nx-sync'; el.type = 'button';
    el.setAttribute('style', 'position:fixed;right:16px;bottom:16px;z-index:90;border:1px solid var(--nx-line,#e1e8e6);background:var(--nx-surface,#fff);color:var(--nx-ink,#213638);border-radius:10px;padding:9px 12px;font:600 12.5px/1.2 "DM Sans",sans-serif;box-shadow:0 6px 20px rgba(0,0,0,.12);cursor:pointer');
    el.addEventListener('click', function(){ el.textContent = 'Sincronizando…'; sincronizar(); });
    document.body.appendChild(el);
  }
  el.textContent = 'Não sincronizado · tentar de novo';
  el.title = 'Suas alterações estão salvas neste aparelho e serão enviadas quando a conexão voltar.';
}

function iniciar(n){
  var sb = cliente();
  if(!sb || !sb.auth){ if((n || 0) < 40) setTimeout(function(){ iniciar((n || 0) + 1); }, 400); return; }
  sincronizar();
  try{ sb.auth.onAuthStateChange(function(ev, sess){
    if(sess && (!usuario || usuario.id !== sess.user.id)){
      if(window.nexoConta && window.nexoConta.trocar(sess.user.id)) avisar('conta');
      setTimeout(sincronizar, 60);
    }
    if(!sess && usuario){ usuario = null; marcarEstado('ok'); avisar('conta'); }
  }); }catch(e){}
}
window.addEventListener('online', function(){ if(usuario && temPendencia()) sincronizar(); });
setInterval(function(){ if(usuario && temPendencia() && !sincronizando) enviarTudo(); }, 60000);
/* respostas e revisões são enviadas logo depois de feitas (com uma pausa para juntar as seguidas) */
document.addEventListener('nexo:historico', function(){
  if(!usuario) return;
  clearTimeout(tHist); tHist = setTimeout(enviarHistorico, 1500);
});
/* ao sair da página a fila já está guardada; o envio aqui é uma tentativa extra */
window.addEventListener('pagehide', function(){ if(tPlano || tMarcas){ clearTimeout(tPlano); clearTimeout(tMarcas); enviarTudo(); } });

window.nexoEstudo = {
  plano:plano, salvarPlano:salvarPlano,
  marcas:marcas, salvarMarcas:salvarMarcas, todasMarcas:todas,
  conectado:function(){ return !!usuario; },
  aoMudar:function(f){ avisos.push(f); },
  sincronizar:sincronizar,
  estado:function(){ return estado; }
};
if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function(){ iniciar(0); }); else iniciar(0);
})();
