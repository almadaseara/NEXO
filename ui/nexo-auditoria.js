/* NEXO — Administração / Auditoria por amostragem.
   As questões publicadas automaticamente não passam por conferência humana uma a uma. Para o erro não
   depender de um aluno reportar, esta tela traz toda semana uma amostra das publicadas que ninguém
   conferiu, começando pelas de maior risco (gabarito vindo de espelho e classificação com confiança baixa).
   Leitura: nexo_admin_auditoria_amostra (docs/sql/2026-11-12-simulado-ranking-e-auditoria.sql).
   Gravação: só pela função já existente nexo_admin_revisar_questao — "Está certa" usa a ação 'editar'
   (marca quem conferiu e quando, sem mudar nada), "Reter" usa 'reter' e a troca de módulo usa 'editar'
   com o módulo novo. O gabarito nunca é alterado aqui. */
(function(){
'use strict';

function $(s, r){ return (r || document).querySelector(s); }
function $$(s, r){ return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
function escH(s){ return String(s == null ? '' : s).replace(/[&<>"']/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }
function cur(){ try{ return current; }catch(e){ return null; } }
function setCur(v){ try{ current = v; }catch(e){} }
function setHead(t){ var h = document.getElementById('head'); if(h) h.textContent = t; }
function sb(){ try{ return nexoSupabase; }catch(e){ return null; } }
function mods(){ try{ return modules; }catch(e){ return []; } }
function ehAdmin(){ try{ return !!(nexoProfile && nexoProfile.active && nexoProfile.can_admin && nexoMode === 'admin'); }catch(e){ return false; } }
function limpa(s){ return String(s || '').replace(/\s*-{3}\s*PAGE\s*\d+\s*-{3}[\s\S]*$/, '').replace(/[ \t]+/g, ' ').trim(); }
function multilinha(s){ return escH(limpa(s)).replace(/\n/g, '<br>'); }
function link(u){ return /^https:\/\/[^\s"'<>]+$/.test(u || '') ? u : ''; }
function modulo(id){ return mods().find(function(x){ return x.id === id; }) || null; }

var ICONE = '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/><path d="m8.5 11 1.8 1.8L13.5 9.5"/></svg>';
var TAMANHO = 20;
var dados = null, carregando = false, erro = '', ocupado = {}, trocando = {};

document.head.insertAdjacentHTML('beforeend', '<style id="nx-aud-style">'
  + '.nx-aud-resumo{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px;margin-top:16px}'
  + '.nx-aud-resumo div{background:var(--nx-surface);border:1px solid var(--nx-line);border-radius:12px;padding:12px 14px}'
  + '.nx-aud-resumo small{display:block;color:var(--nx-ink-2);font-size:12px}.nx-aud-resumo b{font-size:22px;color:var(--nx-ink)}'
  + '.nx-aud-lista{display:grid;gap:12px;margin-top:16px}'
  + '.nx-aud-item{background:var(--nx-surface);border:1px solid var(--nx-line);border-radius:12px;padding:14px 16px;display:grid;gap:10px}'
  + '.nx-aud-meta{display:flex;gap:6px;flex-wrap:wrap;font-size:11.5px;color:var(--nx-muted)}.nx-aud-meta span{background:var(--nx-surface-2);border-radius:99px;padding:2px 8px}'
  + '.nx-aud-meta .risco{background:rgba(201,154,74,.16);color:var(--nx-warn,#b7791f);font-weight:700}'
  + '.nx-aud-texto{color:var(--nx-ink);font-size:13.5px;line-height:1.55;margin:0;overflow-wrap:anywhere}'
  + '.nx-aud-ctx{font-size:12.5px;color:var(--nx-ink-2)}.nx-aud-ctx summary{cursor:pointer;font-weight:700}.nx-aud-ctx p{margin:8px 0 0;line-height:1.55;overflow-wrap:anywhere}'
  + '.nx-aud-ops{list-style:none;margin:0;padding:0;display:grid;gap:5px}'
  + '.nx-aud-ops li{display:flex;gap:9px;font-size:13px;line-height:1.5;padding:6px 9px;border-radius:8px;border:1px solid transparent;overflow-wrap:anywhere}'
  + '.nx-aud-ops li b{flex:none}.nx-aud-ops li.gab{background:var(--nx-accent-soft);border-color:var(--nx-accent)}'
  + '.nx-aud-ops li.gab::after{content:"gabarito";margin-left:auto;flex:none;font-size:10.5px;font-weight:800;color:var(--nx-accent);align-self:center}'
  + '.nx-aud-img{max-width:100%;border-radius:8px;border:1px solid var(--nx-line)}'
  + '.nx-aud-mod{font-size:12.5px;color:var(--nx-ink-2)}.nx-aud-mod b{color:var(--nx-ink)}.nx-aud-mod a{color:var(--nx-accent)}'
  + '.nx-aud-acoes{display:flex;gap:8px;flex-wrap:wrap;align-items:center}'
  + '.nx-aud-acoes select{flex:1;min-width:200px;max-width:460px;border:1px solid var(--nx-line);background:var(--nx-surface-2);color:var(--nx-ink);border-radius:9px;padding:8px 10px;font:inherit;font-size:13px}'
  + '.nx-aud-vazio{padding:28px 10px;text-align:center;color:var(--nx-muted)}.nx-aud-erro{color:var(--nx-bad,#d03b3b);margin-top:12px}'
  + '</style>');

/* ---------- dados ---------- */
async function carregar(){
  var c = sb(); if(!c) return;
  carregando = true; erro = ''; desenhar();
  try{
    var r = await c.rpc('nexo_admin_auditoria_amostra', { p_limite:TAMANHO });
    if(r.error) throw r.error;
    dados = r.data || { resumo:{}, amostra:[] };
    if(!Array.isArray(dados.amostra)) dados.amostra = [];
  }catch(e){
    erro = /function .*does not exist|Could not find the function/i.test(String(e && e.message))
      ? 'O banco ainda não tem a função da auditoria. Rode docs/sql/2026-11-12-simulado-ranking-e-auditoria.sql no Supabase.'
      : 'Não foi possível carregar a amostra: ' + (e && e.message || e);
  }
  carregando = false; trocando = {}; desenhar();
}
async function gravar(id, acao, extra){
  if(ocupado[id]) return;
  ocupado[id] = true; desenhar();
  try{
    var args = { p_id:id, p_acao:acao };
    if(extra && extra.modulo) args.p_module_id = extra.modulo;
    if(extra && extra.nota) args.p_nota = extra.nota;
    var r = await sb().rpc('nexo_admin_revisar_questao', args);
    if(r.error) throw r.error;
    var era = dados.amostra.find(function(q){ return q.id === id; });
    dados.amostra = dados.amostra.filter(function(q){ return q.id !== id; });
    var s = dados.resumo || {};
    if(acao === 'reter') s.publicadas = Math.max(0, (+s.publicadas || 0) - 1);
    else { s.conferidas = (+s.conferidas || 0) + 1; s.conferidas_semana = (+s.conferidas_semana || 0) + 1; }
    if(era && era.answer_source_type === 'mirror') s.pendentes_espelho = Math.max(0, (+s.pendentes_espelho || 0) - 1);
    if(era && +era.conf < 0.8) s.pendentes_confianca_baixa = Math.max(0, (+s.pendentes_confianca_baixa || 0) - 1);
    try{ if(typeof announce === 'function') announce(acao === 'reter' ? 'Questão retida: saiu do site dos alunos.' : 'Questão conferida.'); }catch(e){}
  }catch(e){ window.alert('Não foi possível salvar: ' + (e && e.message || e)); }
  delete ocupado[id]; delete trocando[id]; desenhar();
}

/* ---------- tela ---------- */
function seletorModulo(q){
  var grupos = {};
  mods().forEach(function(m){ var d = m.discipline || 'Direito Constitucional'; (grupos[d] = grupos[d] || []).push(m); });
  return '<select data-aud-novo="' + escH(q.id) + '" aria-label="Novo módulo"><option value="">Escolha o módulo certo…</option>'
    + Object.keys(grupos).sort().map(function(d){
        return '<optgroup label="' + escH(d) + '">' + grupos[d].map(function(m){
          return '<option value="' + escH(m.id) + '"' + (m.id === q.module_id ? ' disabled' : '') + '>' + escH(m.title) + '</option>';
        }).join('') + '</optgroup>';
      }).join('') + '</select>'
    + '<button type="button" class="nx-btn small primary" data-aud-salvar="' + escH(q.id) + '">Salvar módulo e conferir</button>'
    + '<button type="button" class="nx-btn small ghost" data-aud-cancelar="' + escH(q.id) + '">Cancelar</button>';
}
function item(q){
  var m = modulo(q.module_id), ops = Array.isArray(q.options) ? q.options : [], gab = String(q.answer || '').toUpperCase();
  /* certo/errado: as letras são C e E (como no gabarito oficial), não A e B */
  var letras = q.question_type === 'true_false' ? 'CE' : 'ABCDE';
  var meta = [q.board, q.year, q.institution, q.role_name].filter(Boolean).map(function(x){ return '<span>' + escH(x) + '</span>'; }).join('');
  var riscos = '';
  if(q.answer_source_type === 'mirror') riscos += '<span class="risco">Gabarito de espelho' + (q.answer_source_name ? ' (' + escH(q.answer_source_name) + ')' : '') + '</span>';
  if(+q.conf < 0.9) riscos += '<span class="risco">Confiança da classificação: ' + Math.round(+q.conf * 100) + '%</span>';
  var imgs = (Array.isArray(q.media_urls) ? q.media_urls : []).map(link).filter(Boolean)
    .map(function(u){ return '<img class="nx-aud-img" loading="lazy" alt="Figura da questão" src="' + escH(u) + '">'; }).join('');
  var fontes = [[q.exam_source_url, 'Abrir a prova'], [q.answer_source_url, 'Abrir o gabarito']]
    .filter(function(f){ return link(f[0]); })
    .map(function(f){ return '<a href="' + escH(f[0]) + '" target="_blank" rel="noopener noreferrer">' + f[1] + '</a>'; }).join(' · ');
  var acoes = trocando[q.id] ? seletorModulo(q)
    : '<button type="button" class="nx-btn small primary" data-aud-ok="' + escH(q.id) + '"' + (ocupado[q.id] ? ' disabled' : '') + '>Está certa</button>'
      + '<button type="button" class="nx-btn small ghost" data-aud-trocar="' + escH(q.id) + '"' + (ocupado[q.id] ? ' disabled' : '') + '>Módulo errado</button>'
      + '<button type="button" class="nx-btn small perigo" data-aud-reter="' + escH(q.id) + '"' + (ocupado[q.id] ? ' disabled' : '') + '>Reter questão</button>';
  return '<article class="nx-aud-item"><div class="nx-aud-meta">' + meta + riscos + '</div>'
    + (q.contexto ? '<details class="nx-aud-ctx"><summary>Texto-base</summary><p>' + multilinha(q.contexto) + '</p></details>' : '')
    + '<p class="nx-aud-texto">' + multilinha(q.statement) + '</p>' + imgs
    + '<ul class="nx-aud-ops">' + ops.map(function(o, i){ var l = letras[i] || '?'; return '<li class="' + (l === gab ? 'gab' : '') + '"><b>' + l + '</b><span>' + escH(limpa(o)) + '</span></li>'; }).join('') + '</ul>'
    + (gab && (letras.indexOf(gab) < 0 || letras.indexOf(gab) >= ops.length) ? '<p class="nx-aud-erro">O gabarito gravado (' + escH(gab) + ') não corresponde a nenhuma alternativa.</p>' : '')
    + '<div class="nx-aud-mod">Módulo no site: <b>' + escH(m ? m.title : (q.module_id || 'sem módulo')) + '</b>' + (m && m.discipline ? ' · ' + escH(m.discipline) : (q.discipline ? ' · ' + escH(q.discipline) : '')) + (fontes ? '<br>' + fontes : '') + '</div>'
    + '<div class="nx-aud-acoes">' + acoes + '</div></article>';
}
function desenhar(){
  if(cur() !== 'auditoria') return;
  var v = document.getElementById('view'); if(!v) return;
  var s = (dados && dados.resumo) || {}, lista = (dados && dados.amostra) || [];
  var pub = +s.publicadas || 0, conf = +s.conferidas || 0;
  var resumo = dados ? '<div class="nx-aud-resumo">'
    + '<div><small>Publicadas</small><b>' + pub + '</b></div>'
    + '<div><small>Conferidas por administrador</small><b>' + conf + (pub ? ' <small style="display:inline">(' + (conf / pub * 100).toFixed(conf / pub < 0.1 ? 1 : 0).replace('.', ',') + '%)</small>' : '') + '</b></div>'
    + '<div><small>Conferidas nesta semana</small><b>' + (+s.conferidas_semana || 0) + '</b></div>'
    + '<div><small>Sem conferir, gabarito de espelho</small><b>' + (+s.pendentes_espelho || 0) + '</b></div>'
    + '<div><small>Sem conferir, confiança baixa</small><b>' + (+s.pendentes_confianca_baixa || 0) + '</b></div></div>' : '';
  v.innerHTML = '<div class="nx-head"><div><h1>Auditoria por amostragem</h1><p>Amostra semanal das questões publicadas que ainda não foram conferidas, começando pelas de maior risco. Compare o gabarito com a fonte e confirme o módulo. A amostra muda toda segunda-feira.</p></div>'
    + '<button type="button" class="nx-btn small ghost" data-aud-atualizar>' + (lista.length ? 'Atualizar' : 'Trazer mais questões') + '</button></div>'
    + resumo
    + (erro ? '<p class="nx-aud-erro">' + escH(erro) + '</p>' : '')
    + '<div class="nx-aud-lista">' + (carregando && !lista.length ? '<div class="nx-aud-vazio">Carregando…</div>'
        : lista.map(item).join('') || (erro ? '' : '<div class="nx-aud-vazio">' + (dados ? 'Amostra concluída. Toque em "Trazer mais questões" para continuar.' : '') + '</div>')) + '</div>';
}
document.addEventListener('click', function(e){
  var b = e.target.closest && e.target.closest('[data-aud-ok],[data-aud-reter],[data-aud-trocar],[data-aud-salvar],[data-aud-cancelar],[data-aud-atualizar]'); if(!b) return;
  var d = b.dataset;
  if(d.audOk) gravar(d.audOk, 'editar');
  else if(d.audReter){
    var nota = window.prompt('Reter esta questão? Ela sai do site dos alunos até ser revisada.\n\nEscreva o motivo (gabarito errado, enunciado truncado, figura faltando…):', '');
    if(nota == null) return;
    gravar(d.audReter, 'reter', { nota:'Auditoria por amostragem: ' + (nota.trim() || 'retida sem motivo informado') });
  }
  else if(d.audTrocar){ trocando[d.audTrocar] = true; desenhar(); }
  else if(d.audCancelar){ delete trocando[d.audCancelar]; desenhar(); }
  else if(d.audSalvar){
    var sel = $('[data-aud-novo="' + d.audSalvar + '"]'), novo = sel && sel.value;
    if(!novo){ window.alert('Escolha o módulo certo antes de salvar.'); return; }
    gravar(d.audSalvar, 'editar', { modulo:novo });
  }
  else carregar();
});

window.nexoAuditoria = function(){
  if(!ehAdmin()) return;
  try{ if(typeof closeMobileNav === 'function') closeMobileNav(); }catch(e){}
  setCur('auditoria'); setHead('Administração / Auditoria por amostragem');
  try{ renderNav(); }catch(e){}
  try{ if(typeof syncAccess === 'function') syncAccess(); }catch(e){}
  desenhar(); carregar();
  var v = document.getElementById('view'); if(v) v.scrollTop = 0;
};

/* ---------- menu: "Auditoria" depois dos outros itens de administração ---------- */
var renderNavOriginal = window.renderNav;
window.renderNav = function(){
  var r; try{ if(typeof renderNavOriginal === 'function') r = renderNavOriginal.apply(this, arguments); }catch(e){}
  var nav = document.getElementById('nav'); if(!nav) return r;
  $$('.nx-aud-nav', nav).forEach(function(x){ x.remove(); });
  if(!ehAdmin()) return r;
  var marcas = $$('.admin-nav-marker', nav), ultimo = marcas[marcas.length - 1];
  var html = '<button type="button" class="primary-nav admin-nav-marker nx-aud-nav' + (cur() === 'auditoria' ? ' active' : '') + '" onclick="nexoAuditoria()">' + ICONE + ' Auditoria</button>';
  if(ultimo) ultimo.insertAdjacentHTML('afterend', html); else nav.insertAdjacentHTML('beforeend', html);
  return r;
};
})();
