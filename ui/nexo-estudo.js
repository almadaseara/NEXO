/* NEXO — dados de estudo do aluno: cronograma, trilha, progresso e marcações de texto.
   Guarda sempre no navegador (para funcionar sem conexão) e, com a conta conectada, sincroniza
   com o Supabase nas tabelas study_plans e study_highlights (cada aluno só vê as próprias linhas).
   Não toca no banco de questões. */
(function(){
'use strict';

var KP = 'nexo_estudo', KM = 'nexo_marcas';
function ler(k, d){ try{ var v = JSON.parse(localStorage.getItem(k)); return v == null ? d : v; }catch(e){ return d; } }
function gravar(k, v){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){} }
function agoraISO(){ return new Date().toISOString(); }
function cliente(){ try{ return typeof nexoSupabase !== 'undefined' ? nexoSupabase : null; }catch(e){ return null; } }

var usuario = null, sincronizando = false, avisos = [];
function avisar(tipo){ avisos.forEach(function(f){ try{ f(tipo); }catch(e){} }); try{ document.dispatchEvent(new CustomEvent('nexo:estudo', { detail:tipo })); }catch(e){} }

/* ---------- plano (cronograma + trilha + o que já foi estudado) ---------- */
function plano(){ var p = ler(KP, null); return p && typeof p === 'object' ? p : { plan:null, progress:{}, weeks:{}, updated_at:null }; }
var tPlano = null;
function salvarPlano(p){
  p.updated_at = agoraISO(); gravar(KP, p);
  clearTimeout(tPlano); tPlano = setTimeout(enviarPlano, 1200);
  avisar('plano');
}
async function enviarPlano(){
  var sb = cliente(); if(!sb || !usuario) return;
  var p = plano();
  try{
    await sb.from('study_plans').upsert({ user_id:usuario.id, plan:p.plan || {}, progress:p.progress || {}, weeks:p.weeks || {}, updated_at:p.updated_at || agoraISO() }, { onConflict:'user_id' });
  }catch(e){}
}

/* ---------- marcações por módulo e aba ---------- */
function todas(){ var m = ler(KM, {}); return m && typeof m === 'object' ? m : {}; }
function marcas(chave){ var m = todas()[chave]; return m || { marks:[], settings:{}, updated_at:null }; }
var pendentes = {}, tMarcas = null;
function salvarMarcas(chave, valor){
  var t = todas(); valor.updated_at = agoraISO(); t[chave] = valor; gravar(KM, t);
  pendentes[chave] = 1; clearTimeout(tMarcas); tMarcas = setTimeout(enviarMarcas, 1200);
  avisar('marcas');
}
async function enviarMarcas(){
  var sb = cliente(); if(!sb || !usuario) return;
  var t = todas(), linhas = Object.keys(pendentes).filter(function(k){ return t[k]; }).map(function(k){
    var p = k.split('|'); return { user_id:usuario.id, module_id:p[0], tab:p[1] || 'resumo', marks:t[k].marks || [], settings:t[k].settings || {}, updated_at:t[k].updated_at || agoraISO() };
  });
  if(!linhas.length) return;
  try{ var r = await sb.from('study_highlights').upsert(linhas, { onConflict:'user_id,module_id,tab' }); if(!r || !r.error) pendentes = {}; }catch(e){}
}

/* ---------- sincronização ao entrar na conta ---------- */
async function sincronizar(){
  var sb = cliente(); if(!sb || !sb.auth || sincronizando) return;
  sincronizando = true;
  try{
    var s = await sb.auth.getSession(), sess = s && s.data && s.data.session;
    usuario = sess ? sess.user : null;
    if(!usuario){ sincronizando = false; avisar('conta'); return; }
    /* plano: vale o mais recente */
    var r = await sb.from('study_plans').select('plan,progress,weeks,updated_at').eq('user_id', usuario.id).maybeSingle();
    var local = plano();
    if(r && !r.error && r.data && r.data.updated_at && (!local.updated_at || r.data.updated_at > local.updated_at)){
      gravar(KP, { plan:r.data.plan && Object.keys(r.data.plan).length ? r.data.plan : null, progress:r.data.progress || {}, weeks:r.data.weeks || {}, updated_at:r.data.updated_at });
    }else if(local.plan || (local.progress && Object.keys(local.progress).length)){ await enviarPlano(); }
    /* marcações: por módulo e aba, vale a mais recente */
    var rm = await sb.from('study_highlights').select('module_id,tab,marks,settings,updated_at').eq('user_id', usuario.id);
    if(rm && !rm.error){
      var t = todas(), vistos = {};
      (rm.data || []).forEach(function(l){
        var k = l.module_id + '|' + l.tab; vistos[k] = 1;
        if(!t[k] || !t[k].updated_at || l.updated_at > t[k].updated_at) t[k] = { marks:l.marks || [], settings:l.settings || {}, updated_at:l.updated_at };
        else if(t[k].updated_at > l.updated_at) pendentes[k] = 1;
      });
      Object.keys(t).forEach(function(k){ if(!vistos[k]) pendentes[k] = 1; });
      gravar(KM, t);
      await enviarMarcas();
    }
    avisar('sincronizado');
  }catch(e){}
  sincronizando = false;
}
function iniciar(n){
  var sb = cliente();
  if(!sb || !sb.auth){ if((n || 0) < 40) setTimeout(function(){ iniciar((n || 0) + 1); }, 400); return; }
  sincronizar();
  try{ sb.auth.onAuthStateChange(function(ev, sess){
    if(sess && (!usuario || usuario.id !== sess.user.id)) setTimeout(sincronizar, 60);
    if(!sess && usuario){ usuario = null; avisar('conta'); }
  }); }catch(e){}
}
window.addEventListener('pagehide', function(){ if(tPlano){ clearTimeout(tPlano); enviarPlano(); } if(tMarcas){ clearTimeout(tMarcas); enviarMarcas(); } });

window.nexoEstudo = {
  plano:plano, salvarPlano:salvarPlano,
  marcas:marcas, salvarMarcas:salvarMarcas, todasMarcas:todas,
  conectado:function(){ return !!usuario; },
  aoMudar:function(f){ avisos.push(f); },
  sincronizar:sincronizar
};
if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function(){ iniciar(0); }); else iniciar(0);
})();
