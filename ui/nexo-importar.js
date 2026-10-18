/* NEXO — Administração / Importar prova AOCP (importação assistida).
   O site da AOCP só entrega os cadernos de questões a navegadores, então o robô não consegue buscá-los.
   Aqui o administrador envia o caderno baixado pelo navegador e o link oficial do gabarito; a edge
   function aocp-import monta as questões e grava em question_bank como validadas e retidas, com o
   gabarito oficial como fonte (docs/sql/2026-10-18-importacao-aocp.sql). Depois elas seguem o caminho
   normal do robô (classificação e publicação) e aparecem em Classificar questões. */
(function(){
'use strict';

function $(s, r){ return (r || document).querySelector(s); }
function $$(s, r){ return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
function escH(s){ return String(s == null ? '' : s).replace(/[&<>"']/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }
function cur(){ try{ return current; }catch(e){ return null; } }
function setCur(v){ try{ current = v; }catch(e){} }
function setHead(t){ var h = document.getElementById('head'); if(h) h.textContent = t; }
function sb(){ try{ return nexoSupabase; }catch(e){ return null; } }
function ehAdmin(){ try{ return !!(nexoProfile && nexoProfile.active && nexoProfile.can_admin && nexoMode === 'admin'); }catch(e){ return false; } }
function uid(){ return (crypto && crypto.randomUUID) ? crypto.randomUUID() : String(Date.now()) + Math.random().toString(16).slice(2); }

var ICONE = '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4v11m0-11-4 4m4-4 4 4"/><path d="M5 15v4h14v-4"/></svg>';
var lista = [], erro = '', enviando = false, mensagem = '';
var STATUS = { processing:'Processando', validated:'Questões criadas', extracted:'Sem questões novas', rejected:'Não deu certo' };

document.head.insertAdjacentHTML('beforeend', '<style id="nx-imp-style">'
  + '.nx-imp-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px 16px}.nx-imp-grid .full{grid-column:1/-1}'
  + '.nx-imp label{display:grid;gap:5px;font-size:12.5px;font-weight:700;color:var(--nx-ink-2)}'
  + '.nx-imp input{border:1px solid var(--nx-line);background:var(--nx-surface-2);color:var(--nx-ink);border-radius:9px;padding:9px 11px;font:inherit;font-size:13px;font-weight:400}'
  + '.nx-imp small{font-weight:400;color:var(--nx-muted)}'
  + '.nx-imp-passos{margin:0 0 16px;padding-left:20px;color:var(--nx-ink-2);font-size:13px;line-height:1.6}'
  + '.nx-imp-acoes{display:flex;gap:10px;align-items:center;margin-top:14px;flex-wrap:wrap}'
  + '.nx-imp-msg{font-size:13px;color:var(--nx-ink-2)}.nx-imp-msg.erro{color:var(--nx-bad,#d03b3b)}'
  + '.nx-imp-lista{display:grid;gap:8px;margin-top:12px}'
  + '.nx-imp-item{border:1px solid var(--nx-line);border-radius:11px;padding:11px 13px;background:var(--nx-surface);display:grid;gap:4px}'
  + '.nx-imp-item b{color:var(--nx-ink);font-size:13.5px}.nx-imp-item span{font-size:12px;color:var(--nx-muted)}'
  + '.nx-imp-tag{justify-self:start;font-size:10.5px;font-weight:800;border-radius:99px;padding:2px 9px;background:var(--nx-surface-2);color:var(--nx-ink-2)}'
  + '.nx-imp-tag.validated{background:var(--nx-accent-soft);color:var(--nx-accent)}.nx-imp-tag.rejected{background:rgba(208,59,59,.12);color:var(--nx-bad,#d03b3b)}'
  + '@media(max-width:700px){.nx-imp-grid{grid-template-columns:1fr}}'
  + '</style>');

/* ---------- dados ---------- */
async function carregar(){
  try{
    var r = await sb().rpc('nexo_admin_importacoes');
    if(r.error) throw r.error;
    lista = r.data || []; erro = '';
  }catch(e){
    erro = /nexo_admin_importacoes/.test(String(e && e.message)) ? 'O banco ainda não tem a importação de provas. Rode docs/sql/2026-10-18-importacao-aocp.sql no Supabase.' : 'Não foi possível carregar as importações: ' + (e && e.message || e);
  }
  desenharLista();
}
async function enviarArquivo(arquivo, nome){
  var caminho = 'aocp/' + new Date().getFullYear() + '/' + uid() + '-' + nome + '.pdf';
  var r = await sb().storage.from('nexo-provas').upload(caminho, arquivo, { contentType:'application/pdf', upsert:false });
  if(r.error) throw r.error;
  return caminho;
}
async function importar(form){
  var f = function(n){ return form.elements[n]; };
  var caderno = f('caderno').files[0], gabArq = f('gabarito_pdf').files[0], gabUrl = f('gabarito_url').value.trim();
  if(!caderno){ return aviso('Envie o PDF do caderno de questões.', true); }
  if(!gabArq && !gabUrl){ return aviso('Cole o link do gabarito oficial ou envie o PDF do gabarito.', true); }
  enviando = true; aviso('Enviando o caderno…');
  try{
    var cadPath = await enviarArquivo(caderno, 'caderno');
    var gab = gabUrl;
    if(gabArq){ aviso('Enviando o gabarito…'); gab = 'storage:nexo-provas/' + await enviarArquivo(gabArq, 'gabarito'); }
    var reg = await sb().rpc('nexo_admin_registrar_importacao', {
      p_caderno_path:cadPath, p_gabarito:gab, p_ano:Number(f('ano').value), p_orgao:f('orgao').value, p_cargo:f('cargo').value,
      p_tipo:f('tipo').value || null, p_concurso_url:f('concurso').value.trim() || null });
    if(reg.error) throw reg.error;
    aviso('Lendo o caderno e o gabarito… (pode levar até um minuto)');
    var r = await sb().functions.invoke('aocp-import', { body:{ source_id:reg.data } });
    var res = r.data || {};
    if(r.error && !res.status) throw r.error;
    if(res.status === 'ok') aviso(res.inseridas + ' questões criadas' + (res.anuladas ? ', ' + res.anuladas + ' anuladas' : '') + (res.duplicadas ? ', ' + res.duplicadas + ' já existiam' : '') + ' (de ' + res.respostas + ' no gabarito). Elas entram como retidas e seguem a classificação do robô.');
    else aviso(res.error || 'Não deu certo.', true);
    if(res.status === 'ok') form.reset();
  }catch(e){ aviso('Não foi possível importar: ' + (e && e.message || e), true); }
  enviando = false; carregar();
}
function aviso(t, ehErro){ mensagem = t; var el = $('#nx-imp-msg'); if(el){ el.textContent = t; el.className = 'nx-imp-msg' + (ehErro ? ' erro' : ''); } }

/* ---------- tela ---------- */
function desenharLista(){
  var box = $('#nx-imp-lista'); if(!box) return;
  if(erro){ box.innerHTML = '<p class="nx-imp-msg erro">' + escH(erro) + '</p>'; return; }
  box.innerHTML = lista.length ? lista.map(function(x){
    var det = x.status === 'validated' || x.status === 'extracted' ? x.questoes + ' questões' + (x.anuladas ? ' · ' + x.anuladas + ' anuladas' : '') : (x.erro || '');
    return '<div class="nx-imp-item"><span class="nx-imp-tag ' + escH(x.status) + '">' + escH(STATUS[x.status] || x.status) + '</span>'
      + '<b>' + escH(x.orgao) + ' · ' + escH(x.cargo) + (x.tipo ? ' · ' + escH(x.tipo) : '') + ' · ' + escH(x.ano) + '</b>'
      + '<span>' + escH(det) + '</span>'
      + '<span>' + (x.importado_em ? new Date(x.importado_em).toLocaleString('pt-BR') : '') + '</span></div>';
  }).join('') : '<p class="nx-imp-msg">Nenhuma importação ainda.</p>';
}
function desenhar(){
  if(cur() !== 'importar') return;
  var v = document.getElementById('view'); if(!v) return;
  var ano = new Date().getFullYear();
  v.innerHTML = '<div class="nx-head"><div><h1>Importar prova AOCP</h1><p>O site da AOCP só entrega os cadernos de questões a quem usa o navegador. Baixe o caderno lá e envie aqui; o NEXO lê o gabarito oficial e cria as questões.</p></div></div>'
    + '<section class="nx-panel nx-imp"><h2>Como fazer</h2><ol class="nx-imp-passos">'
    + '<li>No site do Instituto AOCP, abra o concurso e clique em <b>Visualizar Cadernos de Questões e Gabarito Definitivo</b>.</li>'
    + '<li>Escolha o cargo e o tipo de prova e baixe o <b>caderno</b> (PDF).</li>'
    + '<li>Nas publicações do concurso, abra o <b>Gabarito Definitivo</b> e copie o link do PDF (ou baixe e envie o arquivo).</li>'
    + '<li>Preencha o cargo <b>como está escrito no gabarito</b> e envie.</li></ol>'
    + '<form id="nx-imp-form" novalidate><div class="nx-imp-grid">'
    + '<label class="full">Link do concurso no site da AOCP <small>(opcional)</small><input name="concurso" type="url" placeholder="https://www.institutoaocp.org.br/concursos/…"></label>'
    + '<label>Órgão<input name="orgao" required placeholder="Ex.: Polícia Civil do Estado de Goiás"></label>'
    + '<label>Ano da prova<input name="ano" type="number" min="2018" max="' + (ano + 1) + '" value="' + ano + '" required></label>'
    + '<label>Cargo, como no gabarito<input name="cargo" required placeholder="Ex.: Escrivão de Polícia da 3ª Classe"></label>'
    + '<label>Tipo de prova <small>(se o gabarito separar por tipo)</small><input name="tipo" placeholder="Ex.: Tipo 1"></label>'
    + '<label class="full">Caderno de questões (PDF)<input name="caderno" type="file" accept="application/pdf" required></label>'
    + '<label>Link do gabarito oficial<input name="gabarito_url" type="url" placeholder="https://arquivos-site.institutoaocp.org.br/…pdf"></label>'
    + '<label>ou o PDF do gabarito<input name="gabarito_pdf" type="file" accept="application/pdf"></label>'
    + '</div><div class="nx-imp-acoes"><button type="submit" class="nx-btn primary">Importar prova</button><span id="nx-imp-msg" class="nx-imp-msg">' + escH(mensagem) + '</span></div></form></section>'
    + '<section class="nx-panel" style="margin-top:16px"><h2>Importações</h2><p class="nx-sub">As questões criadas entram retidas e seguem a classificação e a publicação do robô; depois aparecem em Classificar questões.</p><div id="nx-imp-lista" class="nx-imp-lista"><p class="nx-imp-msg">Carregando…</p></div></section>';
  $('#nx-imp-form').addEventListener('submit', function(e){ e.preventDefault(); if(!enviando) importar(e.target); });
  desenharLista();
}

window.nexoImportarProva = function(){
  if(!ehAdmin()) return;
  try{ if(typeof closeMobileNav === 'function') closeMobileNav(); }catch(e){}
  setCur('importar'); setHead('Administração / Importar prova AOCP');
  try{ renderNav(); }catch(e){}
  try{ if(typeof syncAccess === 'function') syncAccess(); }catch(e){}
  desenhar(); carregar();
  var v = document.getElementById('view'); if(v) v.scrollTop = 0;
};

/* ---------- menu: depois de "Classificar questões" ---------- */
var renderNavOriginal = window.renderNav;
window.renderNav = function(){
  var r; try{ if(typeof renderNavOriginal === 'function') r = renderNavOriginal.apply(this, arguments); }catch(e){}
  var nav = document.getElementById('nav'); if(!nav) return r;
  $$('.nx-imp-nav', nav).forEach(function(x){ x.remove(); });
  if(!ehAdmin()) return r;
  var ref = $('.nx-cls-nav', nav) || $('.nx-cad-nav', nav) || $('.admin-nav-marker', nav);
  var html = '<button type="button" class="primary-nav admin-nav-marker nx-imp-nav' + (cur() === 'importar' ? ' active' : '') + '" onclick="nexoImportarProva()">' + ICONE + ' Importar prova AOCP</button>';
  if(ref) ref.insertAdjacentHTML('afterend', html); else nav.insertAdjacentHTML('beforeend', html);
  return r;
};
})();
