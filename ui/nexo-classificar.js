/* NEXO — Administração / Classificar questões (auditoria Q-03).
   O site só mostra questões do banco que têm módulo do NEXO revisado por um administrador. Antes isso
   ficava em data/banco-classificacao.json, editado à mão, e cada questão publicada depois ficava invisível.
   Aqui o administrador vê as publicadas sem módulo, com a sugestão do robô, e grava a escolha na tabela
   question_module_map (docs/sql/2026-10-18-auditoria-acesso.sql). Não altera question_bank nem gabaritos.
   "Não usar no site" grava "-" e tira a questão da lista de pendentes. */
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
function limpa(s){ return String(s || '').replace(/\s*-{3}\s*PAGE\s*\d+\s*-{3}[\s\S]*$/, '').replace(/\s+/g, ' ').trim(); }

var ICONE = '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 6h10M4 12h7M4 18h10"/><path d="m15 15 2 2 4-4"/></svg>';
var questoes = [], mapa = {}, filtro = 'pendentes', carregando = false, erro = '', mostrar = 30, ultimaContagem = 0, pendentes = null;

document.head.insertAdjacentHTML('beforeend', '<style id="nx-cls-style">'
  + '.nx-cls-badge{margin-left:auto;font-size:10px;font-weight:800;background:var(--nx-gold,#c99a4a);color:#1d1606;border-radius:99px;padding:1px 7px}'
  + '.nx-cls-lista{display:grid;gap:10px;margin-top:16px}'
  + '.nx-cls-item{background:var(--nx-surface);border:1px solid var(--nx-line);border-radius:12px;padding:14px 16px;display:grid;gap:10px}'
  + '.nx-cls-meta{display:flex;gap:6px;flex-wrap:wrap;font-size:11.5px;color:var(--nx-muted)}.nx-cls-meta span{background:var(--nx-surface-2);border-radius:99px;padding:2px 8px}'
  + '.nx-cls-texto{color:var(--nx-ink);font-size:13.5px;line-height:1.55;margin:0}'
  + '.nx-cls-acoes{display:flex;gap:8px;flex-wrap:wrap;align-items:center}'
  + '.nx-cls-acoes select{flex:1;min-width:220px;max-width:460px;border:1px solid var(--nx-line);background:var(--nx-surface-2);color:var(--nx-ink);border-radius:9px;padding:8px 10px;font:inherit;font-size:13px}'
  + '.nx-cls-sug{font-size:12px;color:var(--nx-ink-2)}.nx-cls-sug b{color:var(--nx-accent)}'
  + '.nx-cls-vazio{padding:28px 10px;text-align:center;color:var(--nx-muted)}.nx-cls-erro{color:var(--nx-bad,#d03b3b);margin-top:12px}'
  + '</style>');

/* ---------- dados ---------- */
async function carregar(){
  var c = sb(); if(!c) return;
  carregando = true; erro = ''; desenhar();
  try{
    var m = await c.from('question_module_map').select('question_id,module_id').limit(5000);
    if(m.error) throw m.error;
    mapa = {}; (m.data || []).forEach(function(x){ mapa[x.question_id] = x.module_id; });
    var q = await c.from('question_bank')
      .select('id,question_number,statement,board,year,role_name,module_id,answer_source_type,created_at')
      .eq('status', 'validated').eq('publication_status', 'published').order('created_at', { ascending:false }).limit(5000);
    if(q.error) throw q.error;
    questoes = q.data || [];
    pendentes = questoes.filter(function(x){ return !mapa[x.id]; }).length;
  }catch(e){
    erro = /question_module_map/.test(String(e && e.message))
      ? 'O banco ainda não tem a tabela de classificação. Rode docs/sql/2026-10-18-auditoria-acesso.sql no Supabase.'
      : 'Não foi possível carregar as questões: ' + (e && e.message || e);
  }
  carregando = false; ultimaContagem = Date.now(); desenhar(); marcarBadge();
}
async function salvar(id, modulo){
  if(!modulo) return;
  try{
    var r = await sb().from('question_module_map').upsert({ question_id:id, module_id:modulo }, { onConflict:'question_id' });
    if(r.error) throw r.error;
    mapa[id] = modulo;
    pendentes = questoes.filter(function(x){ return !mapa[x.id]; }).length;
    try{ if(window.nexoBanco){ window.nexoBanco.carregado = false; } }catch(e){}
    desenhar(); marcarBadge();
    try{ if(typeof announce === 'function') announce(modulo === '-' ? 'Questão fora do site.' : 'Questão classificada.'); }catch(e){}
  }catch(e){ window.alert('Não foi possível salvar: ' + (e && e.message || e)); }
}

/* ---------- tela ---------- */
function opcoesModulos(sel){
  var grupos = {};
  mods().forEach(function(m){ var d = m.discipline || 'Direito Constitucional'; (grupos[d] = grupos[d] || []).push(m); });
  return '<option value="">Escolher módulo…</option><option value="-"' + (sel === '-' ? ' selected' : '') + '>Não usar no site</option>'
    + Object.keys(grupos).sort().map(function(d){
      return '<optgroup label="' + escH(d) + '">' + grupos[d].slice().sort(function(a, b){ return a.title.localeCompare(b.title, 'pt-BR'); })
        .map(function(m){ return '<option value="' + escH(m.id) + '"' + (sel === m.id ? ' selected' : '') + '>' + escH(m.title) + '</option>'; }).join('') + '</optgroup>';
    }).join('');
}
function titulo(id){ var m = mods().find(function(x){ return x.id === id; }); return m ? m.title : ''; }
function desenhar(){
  if(cur() !== 'classificar') return;
  var v = document.getElementById('view'); if(!v) return;
  var lista = questoes.filter(function(x){ return filtro === 'pendentes' ? !mapa[x.id] : !!mapa[x.id]; });
  var seg = [['pendentes', 'Sem módulo' + (pendentes ? ' (' + pendentes + ')' : '')], ['classificadas', 'Classificadas']]
    .map(function(f){ return '<button type="button" aria-pressed="' + (filtro === f[0]) + '" data-cls-filtro="' + f[0] + '">' + f[1] + '</button>'; }).join('');
  var itens = lista.slice(0, mostrar).map(function(x){
    var atual = mapa[x.id] || '', sug = titulo(x.module_id);
    var texto = limpa(x.statement); if(texto.length > 420) texto = texto.slice(0, 420) + '…';
    return '<div class="nx-cls-item"><div class="nx-cls-meta">' + [x.board, x.year, limpa(x.role_name), x.question_number ? 'Q' + x.question_number : '', x.answer_source_type === 'official' ? 'gabarito oficial' : 'gabarito de apoio']
        .filter(Boolean).map(function(t){ return '<span>' + escH(t) + '</span>'; }).join('') + '</div>'
      + '<p class="nx-cls-texto">' + escH(texto) + '</p>'
      + (sug && !atual ? '<div class="nx-cls-sug">Sugestão do robô: <b>' + escH(sug) + '</b> (confira antes de salvar)</div>' : '')
      + (atual ? '<div class="nx-cls-sug">Atual: <b>' + escH(atual === '-' ? 'Não usar no site' : titulo(atual) || atual) + '</b></div>' : '')
      + '<div class="nx-cls-acoes"><select data-cls-sel="' + escH(x.id) + '" aria-label="Módulo do NEXO">' + opcoesModulos(atual || (sug ? x.module_id : '')) + '</select>'
      + '<button type="button" class="nx-btn small primary" data-cls-salvar="' + escH(x.id) + '">Salvar</button></div></div>';
  }).join('');
  v.innerHTML = '<div class="nx-head"><div><h1>Classificar questões</h1><p>Questões publicadas do banco só aparecem para os alunos depois de ligadas a um módulo do NEXO. Confira o enunciado e escolha o módulo.</p></div>'
    + '<button type="button" class="nx-btn small ghost" data-cls-atualizar>Atualizar</button></div>'
    + '<div class="nx-seg" aria-label="Filtrar questões">' + seg + '</div>'
    + (erro ? '<p class="nx-cls-erro">' + escH(erro) + '</p>' : '')
    + '<div class="nx-cls-lista">' + (carregando && !questoes.length ? '<div class="nx-cls-vazio">Carregando…</div>' : itens || '<div class="nx-cls-vazio">' + (filtro === 'pendentes' ? 'Todas as questões publicadas já têm módulo.' : 'Nenhuma questão classificada ainda.') + '</div>') + '</div>'
    + (lista.length > mostrar ? '<p style="text-align:center;margin-top:14px"><button type="button" class="nx-btn small" data-cls-mais>Mostrar mais (' + (lista.length - mostrar) + ')</button></p>' : '');
}
document.addEventListener('click', function(e){
  var b = e.target.closest && e.target.closest('[data-cls-filtro],[data-cls-salvar],[data-cls-atualizar],[data-cls-mais]'); if(!b) return;
  if(b.dataset.clsFiltro){ filtro = b.dataset.clsFiltro; mostrar = 30; desenhar(); }
  else if(b.dataset.clsSalvar){ var s = $('[data-cls-sel="' + b.dataset.clsSalvar + '"]'); salvar(b.dataset.clsSalvar, s && s.value); }
  else if(b.hasAttribute('data-cls-mais')){ mostrar += 30; desenhar(); }
  else carregar();
});

window.nexoClassificar = function(){
  if(!ehAdmin()) return;
  try{ if(typeof closeMobileNav === 'function') closeMobileNav(); }catch(e){}
  setCur('classificar'); setHead('Administração / Classificar questões');
  try{ renderNav(); }catch(e){}
  try{ if(typeof syncAccess === 'function') syncAccess(); }catch(e){}
  desenhar(); carregar();
  var v = document.getElementById('view'); if(v) v.scrollTop = 0;
};

/* ---------- menu: depois de "Cadastros" (ou de "Robô de Questões") ---------- */
function marcarBadge(){
  var b = $('#nav .nx-cls-nav'); if(!b) return;
  var s = b.querySelector('.nx-cls-badge');
  if(pendentes){ if(!s){ b.insertAdjacentHTML('beforeend', '<span class="nx-cls-badge"></span>'); s = b.querySelector('.nx-cls-badge'); } s.textContent = pendentes; s.setAttribute('aria-label', pendentes + ' sem módulo'); }
  else if(s) s.remove();
}
var renderNavOriginal = window.renderNav;
window.renderNav = function(){
  var r; try{ if(typeof renderNavOriginal === 'function') r = renderNavOriginal.apply(this, arguments); }catch(e){}
  var nav = document.getElementById('nav'); if(!nav) return r;
  $$('.nx-cls-nav', nav).forEach(function(x){ x.remove(); });
  if(!ehAdmin()) return r;
  var ref = $('.nx-cad-nav', nav) || $('.admin-nav-marker', nav);
  var html = '<button type="button" class="primary-nav admin-nav-marker nx-cls-nav' + (cur() === 'classificar' ? ' active' : '') + '" onclick="nexoClassificar()">' + ICONE + ' Classificar questões</button>';
  if(ref) ref.insertAdjacentHTML('afterend', html); else nav.insertAdjacentHTML('beforeend', html);
  marcarBadge();
  if(!carregando && Date.now() - ultimaContagem > 120000){ ultimaContagem = Date.now(); carregar(); }
  return r;
};
})();
