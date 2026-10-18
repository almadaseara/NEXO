/* NEXO — Administração / Revisar questões (pipeline oficial v2, docs/sql/2026-10-18-pipeline-oficial-v2.sql).
   Nenhuma questão do banco chega ao aluno sem passar por aqui: o administrador confere enunciado, texto-base,
   figuras e gabarito oficial, escolhe o módulo (a IA sugere) e publica. Tudo grava pela função
   nexo_admin_revisar_questao, que nunca altera o gabarito. Figuras e tabelas que o texto do PDF não carrega
   são recortadas aqui mesmo, da página do caderno oficial, e vão para o armazenamento público "nexo-midia". */
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
function multilinha(s){ return escH(String(s || '').trim()).replace(/\n/g, '<br>'); }
function link(u){ return /^https:\/\/[^\s"'<>]+$/.test(u || '') ? u : ''; }
function titulo(id){ var m = mods().find(function(x){ return x.id === id; }); return m ? m.title : ''; }

var ICONE = '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 11l3 3 8-8"/><path d="M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h9"/></svg>';
var FLAGS = {
  tem_figura:'Tem figura', contexto_com_figura:'Texto-base com figura', alerta_ia:'Alerta da IA',
  texto_divergente_ia:'Texto difere da 2ª leitura', gabarito_divergente_ia:'IA leu outro gabarito',
  gabarito_lido_pela_ia:'Gabarito lido pela IA', gabarito_fora_das_alternativas:'Gabarito fora das alternativas'
};
var FILTROS = [['prontas', 'Prontas para publicar'], ['atencao', 'Precisam de conferência'], ['retidas', 'Retidas'], ['publicadas', 'Publicadas']];
var POR_PAGINA = 20;
var estado = { filtro:'prontas', banca:'', pagina:0, itens:[], total:0, carregando:false, erro:'', resumo:null, contagem:null, ultima:0 };

document.head.insertAdjacentHTML('beforeend', '<style id="nx-rev-style">'
  + '.nx-rev-badge{margin-left:auto;font-size:10px;font-weight:800;background:var(--nx-gold,#c99a4a);color:#1d1606;border-radius:99px;padding:1px 7px}'
  + '.nx-rev-resumo{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px;margin:14px 0}'
  + '.nx-rev-num{background:var(--nx-surface);border:1px solid var(--nx-line);border-radius:12px;padding:10px 12px}.nx-rev-num b{display:block;font-size:20px;color:var(--nx-ink)}.nx-rev-num span{font-size:11.5px;color:var(--nx-muted)}'
  + '.nx-rev-barra{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-top:12px}.nx-rev-barra select{border:1px solid var(--nx-line);background:var(--nx-surface-2);color:var(--nx-ink);border-radius:9px;padding:7px 10px;font:inherit;font-size:13px}'
  + '.nx-rev-lista{display:grid;gap:12px;margin-top:16px}'
  + '.nx-rev-item{background:var(--nx-surface);border:1px solid var(--nx-line);border-radius:12px;padding:14px 16px;display:grid;gap:10px}'
  + '.nx-rev-meta{display:flex;gap:6px;flex-wrap:wrap;font-size:11.5px;color:var(--nx-muted)}.nx-rev-meta span{background:var(--nx-surface-2);border-radius:99px;padding:2px 8px}'
  + '.nx-rev-meta .flag{background:color-mix(in srgb,var(--nx-gold,#c99a4a) 22%,transparent);color:var(--nx-ink)}'
  + '.nx-rev-ctx{border-left:3px solid var(--nx-accent);background:var(--nx-surface-2);border-radius:8px;padding:8px 12px;font-size:13px;line-height:1.55;color:var(--nx-ink-2);max-height:220px;overflow:auto}'
  + '.nx-rev-texto{color:var(--nx-ink);font-size:13.5px;line-height:1.55;margin:0}'
  + '.nx-rev-ops{margin:0;padding-left:0;list-style:none;display:grid;gap:4px;font-size:13px}.nx-rev-ops li{padding:4px 8px;border-radius:7px}.nx-rev-ops li.ok{background:color-mix(in srgb,var(--nx-good,#1baf7a) 18%,transparent);font-weight:600}'
  + '.nx-rev-midia{display:flex;gap:8px;flex-wrap:wrap}.nx-rev-midia img{max-height:120px;border:1px solid var(--nx-line);border-radius:6px;background:#fff}'
  + '.nx-rev-sug{font-size:12px;color:var(--nx-ink-2)}.nx-rev-sug b{color:var(--nx-accent)}'
  + '.nx-rev-acoes{display:flex;gap:8px;flex-wrap:wrap;align-items:center}.nx-rev-acoes select{flex:1;min-width:220px;max-width:420px;border:1px solid var(--nx-line);background:var(--nx-surface-2);color:var(--nx-ink);border-radius:9px;padding:8px 10px;font:inherit;font-size:13px}'
  + '.nx-rev-edit{width:100%;min-height:110px;border:1px solid var(--nx-line);background:var(--nx-surface-2);color:var(--nx-ink);border-radius:9px;padding:8px 10px;font:inherit;font-size:13px}'
  + '.nx-rev-vazio{padding:28px 10px;text-align:center;color:var(--nx-muted)}.nx-rev-erro{color:var(--nx-bad,#d03b3b);margin-top:12px}'
  + '.nx-rev-pag{display:flex;gap:8px;justify-content:center;align-items:center;margin-top:14px;font-size:13px;color:var(--nx-muted)}'
  + '.nx-crop{position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.72);display:flex;flex-direction:column;padding:16px;gap:10px}'
  + '.nx-crop-top{display:flex;gap:8px;align-items:center;flex-wrap:wrap;color:#fff;font-size:13px}.nx-crop-top input{width:64px}'
  + '.nx-crop-area{flex:1;overflow:auto;background:#555;border-radius:10px;text-align:center}.nx-crop-wrap{position:relative;display:inline-block;margin:12px;cursor:crosshair;user-select:none}'
  + '.nx-crop-wrap canvas{display:block;background:#fff}.nx-crop-sel{position:absolute;border:2px solid #ffcc33;background:rgba(255,204,51,.18);pointer-events:none}'
  + '</style>');

/* ---------- dados ---------- */
function consulta(c){
  var q = c.from('question_bank').select('id,source_id,question_number,statement,options,answer,question_type,board,year,institution,role_name,status,publication_status,'
    + 'validation_method,answer_source_type,exam_source_url,answer_source_url,extraction_method,review_flags,review_notes,figure_refs,media_urls,context_id,'
    + 'ai_module_id,ai_module_confidence,ai_module_reason,module_id,question_contexts(id,content,figure_refs,media_urls)', { count:'exact' });
  if(estado.filtro === 'prontas') q = q.eq('status', 'validated').in('publication_status', ['banked', 'ready']).eq('answer_source_type', 'official');
  else if(estado.filtro === 'atencao') q = q.eq('status', 'pending_validation').neq('publication_status', 'published');
  else if(estado.filtro === 'retidas') q = q.eq('publication_status', 'withheld').neq('status', 'annulled');
  else q = q.eq('publication_status', 'published');
  if(estado.banca) q = q.eq('board', estado.banca);
  return q.order('ai_module_confidence', { ascending:false, nullsFirst:false }).order('source_id').order('question_number')
    .range(estado.pagina * POR_PAGINA, estado.pagina * POR_PAGINA + POR_PAGINA - 1);
}
async function carregar(){
  var c = sb(); if(!c) return;
  estado.carregando = true; estado.erro = ''; desenhar();
  try{
    var r = await consulta(c);
    if(r.error) throw r.error;
    estado.itens = r.data || []; estado.total = r.count || 0;
    var s = await c.rpc('nexo_admin_pipeline_resumo');
    if(!s.error) estado.resumo = s.data;
    estado.contagem = contarProntas(estado.resumo);
  }catch(e){
    estado.erro = /nexo_admin_pipeline_resumo|question_contexts|review_flags/.test(String(e && e.message))
      ? 'O banco ainda não tem o pipeline v2. Aplique docs/sql/2026-10-18-pipeline-oficial-v2.sql no Supabase.'
      : 'Não foi possível carregar: ' + (e && e.message || e);
  }
  estado.carregando = false; estado.ultima = Date.now(); desenhar(); marcarBadge();
}
function contarProntas(res){ return res && res.questoes ? Number(res.questoes['banked/validated'] || 0) + Number(res.questoes['ready/validated'] || 0) : null; }

async function revisar(id, acao, extra){
  var p = Object.assign({ p_id:id, p_acao:acao }, extra || {});
  var r = await sb().rpc('nexo_admin_revisar_questao', p);
  if(r.error) throw r.error;
  try{ if(window.nexoBanco) window.nexoBanco.carregado = false; }catch(e){}
  return r.data;
}
async function acao(btn){
  var id = btn.dataset.revId, a = btn.dataset.revAcao, item = estado.itens.find(function(x){ return x.id === id; }); if(!item) return;
  var sel = $('[data-rev-mod="' + id + '"]'), mod = sel ? sel.value : '';
  try{
    btn.disabled = true;
    if(a === 'publicar'){
      if(!mod){ window.alert('Escolha o módulo do NEXO antes de publicar (ou "Não usar no site").'); return; }
      if(mod === '-'){ await revisar(id, 'reter', { p_module_id:'-', p_nota:'Fora dos módulos do site.' }); }
      else{
        var figs = (item.figure_refs || []).length + ((item.question_contexts && item.question_contexts.figure_refs) || []).length;
        var midia = (item.media_urls || []).length + ((item.question_contexts && item.question_contexts.media_urls) || []).length;
        if(figs && !midia && !window.confirm('Esta questão tem figura ou tabela no caderno e ainda não tem recorte. Publicar mesmo assim?')) return;
        await revisar(id, 'publicar', { p_module_id:mod });
      }
    }else if(a === 'reter'){
      var nota = window.prompt('Por que reter esta questão? (fica registrado)'); if(nota === null) return;
      await revisar(id, 'reter', { p_nota:nota || 'Retida na revisão.' });
    }else if(a === 'validar'){
      if(!window.confirm('Confirme que você conferiu este gabarito no PDF oficial da banca. Ele passa a valer como validado.')) return;
      await revisar(id, 'validar', { p_nota:'Gabarito conferido no PDF oficial pelo administrador.' });
    }else if(a === 'editar'){
      var box = $('[data-rev-box="' + id + '"]');
      if(!box.querySelector('textarea')){ box.innerHTML = '<textarea class="nx-rev-edit" data-rev-txt="' + escH(id) + '">' + escH(item.statement) + '</textarea>'; btn.textContent = 'Salvar texto'; btn.disabled = false; return; }
      var t = box.querySelector('textarea').value.trim(); if(t.length < 8){ window.alert('Enunciado muito curto.'); return; }
      await revisar(id, 'editar', { p_statement:t, p_nota:'Enunciado ajustado ao caderno oficial.' });
    }else if(a === 'recortar'){ abrirRecorte(item, false); return; }
    else if(a === 'recortar-ctx'){ abrirRecorte(item, true); return; }
    else if(a === 'reextrair'){
      await sb().rpc('nexo_admin_reextrair_fonte', { p_source_id:item.source_id });
      window.alert('Prova enviada de novo para a extração por IA. O resultado chega em alguns minutos.'); return;
    }
    try{ if(typeof announce === 'function') announce('Questão atualizada.'); }catch(e){}
    carregar();
  }catch(e){ window.alert('Não foi possível concluir: ' + (e && e.message || e)); }
  finally{ btn.disabled = false; }
}
async function processarAgora(btn){
  btn.disabled = true; btn.textContent = 'Processando…';
  try{
    var r = await sb().functions.invoke('nexo-ai', { body:{ action:'tick' } });
    if(r.error) throw r.error;
    var d = r.data || {};
    if(d.status === 'missing_api_key') window.alert('Falta cadastrar a chave ANTHROPIC_API_KEY nas Edge Functions do Supabase.');
    else window.alert('Lotes recolhidos: ' + ((d.collected || []).filter(function(x){ return x.ingested != null; }).length) + '. Provas enviadas à IA: ' + ((d.extract && d.extract.sources) || 0) + '. Questões enviadas para sugestão de módulo: ' + ((d.classify && d.classify.questions) || 0) + '.');
  }catch(e){ window.alert('Não foi possível processar agora: ' + (e && e.message || e)); }
  btn.disabled = false; btn.textContent = 'Processar agora';
  carregar();
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
function paginaPdf(item){
  var f = (item.figure_refs || [])[0] || ((item.question_contexts && item.question_contexts.figure_refs) || [])[0];
  return f && f.pagina ? f.pagina : null;
}
function cartao(x){
  var ce = x.question_type === 'true_false', ops = Array.isArray(x.options) ? x.options : [];
  var resp = String(x.answer || '').toUpperCase(), ctx = x.question_contexts;
  var flags = (x.review_flags || []).map(function(f){ return '<span class="flag">' + escH(FLAGS[f] || f) + '</span>'; }).join('');
  var meta = [x.board, x.year, limpa(x.role_name), x.question_number ? 'Q' + x.question_number : '', ce ? 'Certo/Errado' : 'Múltipla escolha',
    x.extraction_method === 'claude_pdf_v1' ? 'extraída por IA' : '', x.answer_source_type === 'official' ? 'gabarito oficial' : 'gabarito de apoio']
    .filter(Boolean).map(function(t){ return '<span>' + escH(t) + '</span>'; }).join('');
  var opsHtml = ce
    ? '<ul class="nx-rev-ops"><li class="' + (resp === 'C' ? 'ok' : '') + '">Certo</li><li class="' + (resp === 'E' ? 'ok' : '') + '">Errado</li></ul>'
    : '<ul class="nx-rev-ops">' + ops.map(function(o, i){ return '<li class="' + ('ABCDE'[i] === resp ? 'ok' : '') + '">' + 'ABCDE'[i] + ') ' + escH(limpa(o)) + '</li>'; }).join('') + '</ul>';
  if(resp === 'ANULADA') opsHtml += '<div class="nx-rev-sug"><b>Anulada</b> pela banca.</div>';
  var midias = (x.media_urls || []).concat((ctx && ctx.media_urls) || []).map(link).filter(Boolean);
  var figs = (x.figure_refs || []).concat((ctx && ctx.figure_refs) || []);
  var sug = x.ai_module_id && x.ai_module_id !== 'fora_do_catalogo' ? x.ai_module_id : '';
  var atual = x.module_id && x.publication_status === 'published' ? x.module_id : '';
  var prova = link(x.exam_source_url), pg = paginaPdf(x);
  return '<div class="nx-rev-item"><div class="nx-rev-meta">' + meta + flags + '</div>'
    + (ctx ? '<div class="nx-rev-ctx">' + multilinha(ctx.content) + '</div>' : '')
    + '<div data-rev-box="' + escH(x.id) + '"><p class="nx-rev-texto">' + multilinha(limpa(x.statement)) + '</p></div>'
    + opsHtml
    + (figs.length ? '<div class="nx-rev-sug">Figuras no caderno: ' + figs.map(function(f){ return escH((f.descricao || 'figura') + ' (pág. ' + (f.pagina || '?') + ')'); }).join('; ') + '</div>' : '')
    + (midias.length ? '<div class="nx-rev-midia">' + midias.map(function(u){ return '<img src="' + escH(u) + '" alt="Recorte do caderno oficial" loading="lazy">'; }).join('') + '</div>' : '')
    + (x.ai_module_id ? '<div class="nx-rev-sug">Sugestão da IA: <b>' + escH(x.ai_module_id === 'fora_do_catalogo' ? 'fora dos módulos do site' : (titulo(x.ai_module_id) || x.ai_module_id)) + '</b>'
      + (x.ai_module_confidence ? ' · confiança ' + Math.round(x.ai_module_confidence * 100) + '%' : '') + (x.ai_module_reason ? ' — ' + escH(x.ai_module_reason) : '') + '</div>' : '')
    + (x.review_notes ? '<div class="nx-rev-sug">Nota: ' + escH(x.review_notes) + '</div>' : '')
    + '<div class="nx-rev-sug">' + (prova ? '<a href="' + escH(prova + (pg ? '#page=' + pg : '')) + '" target="_blank" rel="noopener">Abrir a prova' + (pg ? ' na pág. ' + pg : '') + ' ↗</a>' : 'Sem link da prova')
      + (link(x.answer_source_url) ? ' · <a href="' + escH(x.answer_source_url) + '" target="_blank" rel="noopener">Abrir o gabarito ↗</a>' : '') + '</div>'
    + '<div class="nx-rev-acoes"><select data-rev-mod="' + escH(x.id) + '" aria-label="Módulo do NEXO">' + opcoesModulos(atual || sug) + '</select>'
    + (x.status === 'validated' ? '<button type="button" class="nx-btn small primary" data-rev-id="' + escH(x.id) + '" data-rev-acao="publicar">' + (x.publication_status === 'published' ? 'Salvar módulo' : 'Publicar') + '</button>'
      : x.status === 'pending_validation' ? '<button type="button" class="nx-btn small primary" data-rev-id="' + escH(x.id) + '" data-rev-acao="validar">Conferi o gabarito</button>' : '')
    + '<button type="button" class="nx-btn small" data-rev-id="' + escH(x.id) + '" data-rev-acao="editar">Corrigir texto</button>'
    + (x.source_id ? '<button type="button" class="nx-btn small" data-rev-id="' + escH(x.id) + '" data-rev-acao="recortar">Recortar figura</button>' : '')
    + (ctx && x.source_id ? '<button type="button" class="nx-btn small" data-rev-id="' + escH(x.id) + '" data-rev-acao="recortar-ctx">Figura do texto-base</button>' : '')
    + (x.publication_status !== 'withheld' ? '<button type="button" class="nx-btn small ghost" data-rev-id="' + escH(x.id) + '" data-rev-acao="reter">Reter</button>' : '')
    + '<button type="button" class="nx-btn small ghost" data-rev-id="' + escH(x.id) + '" data-rev-acao="reextrair" title="Refaz a leitura desta prova pela IA">Reler prova</button>'
    + '</div></div>';
}
function blocoResumo(){
  var r = estado.resumo; if(!r) return '';
  var q = r.questoes || {}, ia = r.fontes_ia || {};
  var n = function(k){ return Number(q[k] || 0); };
  var nums = [
    [n('published/validated'), 'publicadas'],
    [n('banked/validated') + n('ready/validated'), 'validadas aguardando revisão'],
    [n('banked/pending_validation'), 'precisam de conferência'],
    [Number(r.fontes_oficiais || 0), 'provas oficiais cadastradas'],
    [Number(ia.queued || 0) + Number(ia.submitted || 0), 'provas na fila da IA'],
    [Number(r.sugestoes_ia || 0), 'com módulo sugerido pela IA']
  ];
  var ult = (r.ultimos_trabalhos || [])[0];
  return '<div class="nx-rev-resumo">' + nums.map(function(x){ return '<div class="nx-rev-num"><b>' + x[0].toLocaleString('pt-BR') + '</b><span>' + x[1] + '</span></div>'; }).join('') + '</div>'
    + (ult ? '<p class="nx-rev-sug">Último lote da IA: ' + escH(ult.kind === 'extract' ? 'extração' : 'classificação') + ' · ' + escH(ult.status === 'ingested' ? 'gravado' : ult.status) + ' · ' + escH(new Date(ult.created_at).toLocaleString('pt-BR')) + (ult.error ? ' · erro: ' + escH(ult.error) : '') + '</p>' : '');
}
function desenhar(){
  if(cur() !== 'revisar') return;
  var v = document.getElementById('view'); if(!v) return;
  var seg = FILTROS.map(function(f){ return '<button type="button" aria-pressed="' + (estado.filtro === f[0]) + '" data-rev-filtro="' + f[0] + '">' + f[1] + '</button>'; }).join('');
  var bancas = ['', 'CEBRASPE', 'FGV', 'AOCP', 'IBFC', 'VUNESP', 'FCC'];
  var paginas = Math.max(1, Math.ceil(estado.total / POR_PAGINA));
  v.innerHTML = '<div class="nx-head"><div><h1>Revisar questões</h1><p>Questões das provas oficiais extraídas pelo coletor e pela IA. Confira enunciado, texto-base, figuras e gabarito no caderno oficial, escolha o módulo e publique.</p></div>'
    + '<div class="nx-rev-acoes"><button type="button" class="nx-btn small" data-rev-processar>Processar agora</button><button type="button" class="nx-btn small ghost" data-rev-atualizar>Atualizar</button></div></div>'
    + blocoResumo()
    + '<div class="nx-seg" aria-label="Filtrar questões">' + seg + '</div>'
    + '<div class="nx-rev-barra"><label>Banca <select data-rev-banca>' + bancas.map(function(b){ return '<option value="' + b + '"' + (estado.banca === b ? ' selected' : '') + '>' + (b || 'Todas') + '</option>'; }).join('') + '</select></label>'
    + '<span class="nx-rev-sug">' + estado.total.toLocaleString('pt-BR') + ' questões neste filtro</span></div>'
    + (estado.erro ? '<p class="nx-rev-erro">' + escH(estado.erro) + '</p>' : '')
    + '<div class="nx-rev-lista">' + (estado.carregando && !estado.itens.length ? '<div class="nx-rev-vazio">Carregando…</div>' : estado.itens.map(cartao).join('') || '<div class="nx-rev-vazio">Nada neste filtro.</div>') + '</div>'
    + (estado.total > POR_PAGINA ? '<div class="nx-rev-pag"><button type="button" class="nx-btn small" data-rev-pag="-1"' + (estado.pagina ? '' : ' disabled') + '>Anterior</button>Página ' + (estado.pagina + 1) + ' de ' + paginas
      + '<button type="button" class="nx-btn small" data-rev-pag="1"' + (estado.pagina + 1 < paginas ? '' : ' disabled') + '>Próxima</button></div>' : '');
}
document.addEventListener('click', function(e){
  var b = e.target.closest && e.target.closest('[data-rev-filtro],[data-rev-acao],[data-rev-atualizar],[data-rev-processar],[data-rev-pag]'); if(!b) return;
  if(b.dataset.revFiltro){ estado.filtro = b.dataset.revFiltro; estado.pagina = 0; carregar(); }
  else if(b.dataset.revAcao) acao(b);
  else if(b.hasAttribute('data-rev-processar')) processarAgora(b);
  else if(b.dataset.revPag){ estado.pagina = Math.max(0, estado.pagina + Number(b.dataset.revPag)); carregar(); var v = document.getElementById('view'); if(v) v.scrollTop = 0; }
  else carregar();
});
document.addEventListener('change', function(e){
  if(e.target.matches && e.target.matches('[data-rev-banca]')){ estado.banca = e.target.value; estado.pagina = 0; carregar(); }
});

/* ---------- recorte de figura da página do caderno oficial ---------- */
var pdfjsPromessa = null;
function pdfjs(){
  if(!pdfjsPromessa) pdfjsPromessa = import(new URL('acervo/vendor/pdf.min.mjs', document.baseURI).href).then(function(m){
    m.GlobalWorkerOptions.workerSrc = new URL('acervo/vendor/pdf.worker.min.mjs', document.baseURI).href;
    return m;
  });
  return pdfjsPromessa;
}
async function bytesDaProva(sourceId){
  var c = sb(), s = await c.auth.getSession(), tok = s && s.data && s.data.session && s.data.session.access_token;
  var cfg = window.NEXO_AUTH || {};
  var r = await fetch(cfg.supabaseUrl + '/functions/v1/nexo-ai', { method:'POST',
    headers:{ 'Content-Type':'application/json', Authorization:'Bearer ' + tok, apikey:cfg.publishableKey },
    body:JSON.stringify({ action:'pdf', source_id:sourceId }) });
  if(!r.ok) throw new Error('não consegui abrir o caderno oficial (HTTP ' + r.status + ')');
  return new Uint8Array(await r.arrayBuffer());
}
async function abrirRecorte(item, doContexto){
  var ov = document.createElement('div'); ov.className = 'nx-crop'; ov.setAttribute('role', 'dialog'); ov.setAttribute('aria-label', 'Recortar figura do caderno');
  ov.innerHTML = '<div class="nx-crop-top"><b>Recorte da figura</b> — arraste sobre a figura ou tabela na página.'
    + '<label>Página <input type="number" min="1" value="' + (paginaPdf(item) || 1) + '" data-crop-pg></label><span data-crop-info>Carregando o caderno…</span>'
    + '<span style="margin-left:auto"></span><button type="button" class="nx-btn small primary" data-crop-ok disabled>Salvar recorte</button><button type="button" class="nx-btn small ghost" data-crop-fechar>Fechar</button></div>'
    + '<div class="nx-crop-area"><div class="nx-crop-wrap"><canvas></canvas><div class="nx-crop-sel" hidden></div></div></div>';
  document.body.appendChild(ov);
  var canvas = ov.querySelector('canvas'), selEl = ov.querySelector('.nx-crop-sel'), info = ov.querySelector('[data-crop-info]'), ok = ov.querySelector('[data-crop-ok]');
  var doc = null, sel = null, ini = null;
  function fechar(){ ov.remove(); }
  ov.querySelector('[data-crop-fechar]').onclick = fechar;
  async function render(n){
    var page = await doc.getPage(Math.max(1, Math.min(doc.numPages, n)));
    var vp = page.getViewport({ scale:2 });
    canvas.width = vp.width; canvas.height = vp.height; canvas.style.width = (vp.width / 2) + 'px';
    await page.render({ canvasContext:canvas.getContext('2d'), viewport:vp }).promise;
    sel = null; selEl.hidden = true; ok.disabled = true; info.textContent = 'Página ' + page.pageNumber + ' de ' + doc.numPages;
    var f = (item.figure_refs || []).concat((item.question_contexts && item.question_contexts.figure_refs) || []).find(function(x){ return x.pagina === page.pageNumber && Array.isArray(x.caixa) && x.caixa.length === 4; });
    if(f){ var w = canvas.width / 2, h = canvas.height / 2; mostrarSel({ x:f.caixa[0] * w, y:f.caixa[1] * h, w:(f.caixa[2] - f.caixa[0]) * w, h:(f.caixa[3] - f.caixa[1]) * h }); info.textContent += ' · caixa sugerida pela IA (ajuste se precisar)'; }
  }
  function mostrarSel(s){ sel = s; Object.assign(selEl.style, { left:s.x + 'px', top:s.y + 'px', width:s.w + 'px', height:s.h + 'px' }); selEl.hidden = false; ok.disabled = s.w < 8 || s.h < 8; }
  function ponto(ev){ var r = canvas.getBoundingClientRect(); return { x:Math.max(0, Math.min(r.width, ev.clientX - r.left)), y:Math.max(0, Math.min(r.height, ev.clientY - r.top)) }; }
  canvas.addEventListener('pointerdown', function(ev){ ini = ponto(ev); canvas.setPointerCapture(ev.pointerId); });
  canvas.addEventListener('pointermove', function(ev){ if(!ini) return; var p = ponto(ev); mostrarSel({ x:Math.min(ini.x, p.x), y:Math.min(ini.y, p.y), w:Math.abs(p.x - ini.x), h:Math.abs(p.y - ini.y) }); });
  canvas.addEventListener('pointerup', function(){ ini = null; });
  ov.querySelector('[data-crop-pg]').addEventListener('change', function(e){ if(doc) render(Number(e.target.value) || 1); });
  ok.onclick = async function(){
    if(!sel) return; ok.disabled = true; info.textContent = 'Enviando…';
    try{
      var k = 2, out = document.createElement('canvas'); out.width = Math.round(sel.w * k); out.height = Math.round(sel.h * k);
      out.getContext('2d').drawImage(canvas, sel.x * k, sel.y * k, sel.w * k, sel.h * k, 0, 0, out.width, out.height);
      var blob = await new Promise(function(res){ out.toBlob(res, 'image/png'); });
      var caminho = 'questoes/' + item.source_id + '/' + (doContexto ? 'contexto-' + item.context_id : 'q' + item.question_number) + '-' + Date.now() + '.png';
      var up = await sb().storage.from('nexo-midia').upload(caminho, blob, { contentType:'image/png', upsert:false });
      if(up.error) throw up.error;
      var url = sb().storage.from('nexo-midia').getPublicUrl(caminho).data.publicUrl;
      if(doContexto){
        var atuais = (item.question_contexts && item.question_contexts.media_urls) || [];
        var r = await sb().rpc('nexo_admin_midia_contexto', { p_context_id:item.context_id, p_media_urls:atuais.concat([url]) });
        if(r.error) throw r.error;
      }else await revisar(item.id, 'editar', { p_media_urls:(item.media_urls || []).concat([url]) });
      fechar(); carregar();
    }catch(e){ info.textContent = 'Erro: ' + (e && e.message || e); ok.disabled = false; }
  };
  try{
    var lib = await pdfjs();
    doc = await lib.getDocument({ data:await bytesDaProva(item.source_id) }).promise;
    await render(Number(ov.querySelector('[data-crop-pg]').value) || 1);
  }catch(e){ info.textContent = 'Erro: ' + (e && e.message || e); }
}

window.nexoRevisar = function(){
  if(!ehAdmin()) return;
  try{ if(typeof closeMobileNav === 'function') closeMobileNav(); }catch(e){}
  setCur('revisar'); setHead('Administração / Revisar questões');
  try{ renderNav(); }catch(e){}
  try{ if(typeof syncAccess === 'function') syncAccess(); }catch(e){}
  desenhar(); carregar();
  var v = document.getElementById('view'); if(v) v.scrollTop = 0;
};

/* ---------- menu: logo antes de "Classificar questões" ---------- */
function marcarBadge(){
  var b = $('#nav .nx-rev-nav'); if(!b) return;
  var s = b.querySelector('.nx-rev-badge'), n = estado.contagem;
  if(n){ if(!s){ b.insertAdjacentHTML('beforeend', '<span class="nx-rev-badge"></span>'); s = b.querySelector('.nx-rev-badge'); } s.textContent = n > 999 ? '999+' : n; s.setAttribute('aria-label', n + ' aguardando revisão'); }
  else if(s) s.remove();
}
var renderNavOriginal = window.renderNav;
window.renderNav = function(){
  var r; try{ if(typeof renderNavOriginal === 'function') r = renderNavOriginal.apply(this, arguments); }catch(e){}
  var nav = document.getElementById('nav'); if(!nav) return r;
  $$('.nx-rev-nav', nav).forEach(function(x){ x.remove(); });
  if(!ehAdmin()) return r;
  var html = '<button type="button" class="primary-nav admin-nav-marker nx-rev-nav' + (cur() === 'revisar' ? ' active' : '') + '" onclick="nexoRevisar()">' + ICONE + ' Revisar questões</button>';
  var ref = $('.nx-cls-nav', nav);
  if(ref) ref.insertAdjacentHTML('beforebegin', html);
  else{ var cad = $('.nx-cad-nav', nav) || $('.admin-nav-marker', nav); if(cad) cad.insertAdjacentHTML('afterend', html); else nav.insertAdjacentHTML('beforeend', html); }
  marcarBadge();
  if(!estado.carregando && Date.now() - estado.ultima > 120000){
    estado.ultima = Date.now();
    var c = sb(); if(c) c.rpc('nexo_admin_pipeline_resumo').then(function(s){ if(!s.error){ estado.resumo = s.data; estado.contagem = contarProntas(s.data); marcarBadge(); } });
  }
  return r;
};
})();
