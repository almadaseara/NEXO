/* NEXO — Administração / Cadastros: lista as contas e libera ou bloqueia o acesso, sem abrir o
   painel do Supabase. Só aparece no modo ADM para quem tem can_admin.
   Usa as funções nexo_admin_listar_cadastros() e nexo_admin_definir_acesso(p_id, p_ativo)
   (docs/sql/2026-10-17-liberar-cadastros.sql), que conferem is_nexo_admin() no banco.
   Nenhuma chave secreta no site: as chamadas vão com a sessão do próprio administrador. */
(function(){
'use strict';

function $(s, r){ return (r || document).querySelector(s); }
function $$(s, r){ return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
function escH(s){ return String(s == null ? '' : s).replace(/[&<>"']/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }
function cur(){ try{ return current; }catch(e){ return null; } }
function setCur(v){ try{ current = v; }catch(e){} }
function setHead(t){ var h = document.getElementById('head'); if(h) h.textContent = t; }
function sb(){ try{ return nexoSupabase; }catch(e){ return null; } }
function eu(){ try{ return nexoProfile; }catch(e){ return null; } }
function ehAdmin(){ try{ return !!(nexoProfile && nexoProfile.active && nexoProfile.can_admin && nexoMode === 'admin'); }catch(e){ return false; } }

var ICONE = '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="8" r="3.5"/><path d="M3 20c.6-3.3 3-5.5 6-5.5s5.4 2.2 6 5.5"/><path d="m16 11 2 2 4-4"/></svg>';
var lista = [], filtro = 'pendentes', carregando = false, erro = '', ultimaContagem = 0, pendentes = null;

document.head.insertAdjacentHTML('beforeend', '<style id="nx-cad-style">'
  + '.nx-cad-badge{margin-left:auto;font-size:10px;font-weight:800;background:var(--nx-gold,#c99a4a);color:#1d1606;border-radius:99px;padding:1px 7px}'
  + '.nx-cad-lista{display:grid;gap:10px;margin-top:16px}'
  + '.nx-cad-item{display:flex;align-items:center;gap:14px;flex-wrap:wrap;background:var(--nx-surface);border:1px solid var(--nx-line);border-radius:12px;padding:14px 16px}'
  + '.nx-cad-quem{flex:1;min-width:200px}.nx-cad-quem b{display:block;color:var(--nx-ink);font-size:14px}.nx-cad-quem span{color:var(--nx-ink-2);font-size:12.5px;overflow-wrap:anywhere}'
  + '.nx-cad-quem small{display:block;color:var(--nx-muted);font-size:11.5px;margin-top:3px}'
  + '.nx-cad-tag{font-size:10.5px;font-weight:800;letter-spacing:.3px;border-radius:99px;padding:3px 9px;border:1px solid var(--nx-line);color:var(--nx-ink-2)}'
  + '.nx-cad-tag.ok{background:var(--nx-accent-soft);color:var(--nx-accent);border-color:transparent}.nx-cad-tag.pend{background:rgba(201,154,74,.16);color:var(--nx-warn,#b7791f);border-color:transparent}'
  + '.nx-cad-acoes{display:flex;gap:8px;flex-wrap:wrap}'
  + '.nx-cad-vazio{padding:28px 10px;text-align:center;color:var(--nx-muted)}.nx-cad-erro{color:var(--nx-bad,#d03b3b);margin-top:12px}'
  + '</style>');

/* ---------- dados ---------- */
async function carregar(){
  var c = sb(); if(!c) return;
  carregando = true; erro = ''; desenhar();
  try{
    var r = await c.rpc('nexo_admin_listar_cadastros');
    if(r.error) throw r.error;
    lista = Array.isArray(r.data) ? r.data : [];
    pendentes = lista.filter(function(p){ return !p.active; }).length;
  }catch(e){
    erro = /function .*does not exist|Could not find the function/i.test(String(e && e.message))
      ? 'O banco ainda não tem as funções de cadastros. Rode docs/sql/2026-10-17-liberar-cadastros.sql no Supabase.'
      : 'Não foi possível carregar os cadastros: ' + (e && e.message || e);
  }
  carregando = false; ultimaContagem = Date.now(); desenhar(); marcarBadge();
}
async function definir(id, ativo){
  var p = lista.find(function(x){ return x.id === id; }); if(!p) return;
  var nome = p.full_name || p.email;
  if(!window.confirm(ativo ? 'Liberar o acesso de ' + nome + ' como aluno?' : 'Bloquear o acesso de ' + nome + '? A pessoa não consegue mais entrar até ser liberada de novo.')) return;
  try{
    var r = await sb().rpc('nexo_admin_definir_acesso', { p_id:id, p_ativo:ativo });
    if(r.error) throw r.error;
    try{ if(typeof announce === 'function') announce(ativo ? nome + ' liberado(a).' : nome + ' bloqueado(a).'); }catch(e){}
  }catch(e){ window.alert('Não foi possível salvar: ' + (e && e.message || e)); }
  carregar();
}

/* ---------- tela ---------- */
function dataBR(t){ try{ return new Date(t).toLocaleDateString('pt-BR', { day:'2-digit', month:'2-digit', year:'numeric' }); }catch(e){ return ''; } }
function desenhar(){
  if(cur() !== 'cadastros') return;
  var v = document.getElementById('view'); if(!v) return;
  var mostrar = lista.filter(function(p){ return filtro === 'todos' || (filtro === 'pendentes' ? !p.active : p.active); });
  var seg = [['pendentes', 'Aguardando' + (pendentes ? ' (' + pendentes + ')' : '')], ['liberados', 'Liberados'], ['todos', 'Todos']]
    .map(function(f){ return '<button type="button" aria-pressed="' + (filtro === f[0]) + '" data-cad-filtro="' + f[0] + '">' + f[1] + '</button>'; }).join('');
  var itens = mostrar.map(function(p){
    var euMesmo = eu() && eu().id === p.id;
    var tags = (p.active ? '<span class="nx-cad-tag ok">Liberado</span>' : '<span class="nx-cad-tag pend">Aguardando</span>')
      + (p.can_admin ? ' <span class="nx-cad-tag">ADM</span>' : '');
    var acoes = p.active
      ? (euMesmo ? '' : '<button type="button" class="nx-btn small perigo" data-cad-bloquear="' + escH(p.id) + '">Bloquear</button>')
      : '<button type="button" class="nx-btn small primary" data-cad-liberar="' + escH(p.id) + '">Liberar como aluno</button>';
    return '<div class="nx-cad-item"><div class="nx-cad-quem"><b>' + escH(p.full_name || 'Sem nome') + '</b><span>' + escH(p.email) + '</span><small>Cadastro em ' + dataBR(p.created_at) + '</small></div>' + tags + '<div class="nx-cad-acoes">' + acoes + '</div></div>';
  }).join('');
  v.innerHTML = '<div class="nx-head"><div><h1>Cadastros</h1><p>Contas criadas no NEXO. Quem se cadastra fica aguardando até você liberar o acesso de aluno.</p></div>'
    + '<button type="button" class="nx-btn small ghost" data-cad-atualizar>Atualizar</button></div>'
    + '<div class="nx-seg" aria-label="Filtrar cadastros">' + seg + '</div>'
    + (erro ? '<p class="nx-cad-erro">' + escH(erro) + '</p>' : '')
    + '<div class="nx-cad-lista">' + (carregando && !lista.length ? '<div class="nx-cad-vazio">Carregando…</div>' : itens || '<div class="nx-cad-vazio">' + (filtro === 'pendentes' ? 'Nenhum cadastro aguardando liberação.' : 'Nenhum cadastro aqui.') + '</div>') + '</div>';
}
document.addEventListener('click', function(e){
  var b = e.target.closest && e.target.closest('[data-cad-filtro],[data-cad-liberar],[data-cad-bloquear],[data-cad-atualizar]'); if(!b) return;
  if(b.dataset.cadFiltro){ filtro = b.dataset.cadFiltro; desenhar(); }
  else if(b.dataset.cadLiberar) definir(b.dataset.cadLiberar, true);
  else if(b.dataset.cadBloquear) definir(b.dataset.cadBloquear, false);
  else carregar();
});

window.nexoCadastros = function(){
  if(!ehAdmin()) return;
  try{ if(typeof closeMobileNav === 'function') closeMobileNav(); }catch(e){}
  setCur('cadastros'); setHead('Administração / Cadastros');
  try{ renderNav(); }catch(e){}
  try{ if(typeof syncAccess === 'function') syncAccess(); }catch(e){}
  desenhar(); carregar();
  var v = document.getElementById('view'); if(v) v.scrollTop = 0;
};

/* ---------- menu: "Cadastros" logo depois de "Robô de Questões" ---------- */
function marcarBadge(){
  var b = $('#nav .nx-cad-nav'); if(!b) return;
  var s = b.querySelector('.nx-cad-badge');
  if(pendentes){ if(!s){ b.insertAdjacentHTML('beforeend', '<span class="nx-cad-badge"></span>'); s = b.querySelector('.nx-cad-badge'); } s.textContent = pendentes; s.setAttribute('aria-label', pendentes + ' aguardando'); }
  else if(s) s.remove();
}
var renderNavOriginal = window.renderNav;
window.renderNav = function(){
  var r; try{ if(typeof renderNavOriginal === 'function') r = renderNavOriginal.apply(this, arguments); }catch(e){}
  var nav = document.getElementById('nav'); if(!nav) return r;
  $$('.nx-cad-nav', nav).forEach(function(x){ x.remove(); });
  if(!ehAdmin()) return r;
  var robo = $('.admin-nav-marker', nav);
  var html = '<button type="button" class="primary-nav admin-nav-marker nx-cad-nav' + (cur() === 'cadastros' ? ' active' : '') + '" onclick="nexoCadastros()">' + ICONE + ' Cadastros</button>';
  if(robo) robo.insertAdjacentHTML('afterend', html); else nav.insertAdjacentHTML('beforeend', html);
  marcarBadge();
  /* contagem de pendentes para o selo do menu, no máximo uma vez por minuto */
  if(!carregando && Date.now() - ultimaContagem > 60000){ ultimaContagem = Date.now(); carregar(); }
  return r;
};
})();
