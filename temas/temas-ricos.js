/* NEXO Revisão — temas no padrão aprofundado (resumo em camadas, lei seca grifada e ligada,
   jurisprudência com situação, flashcards variados e questões do banco ligadas).
   Os dados de cada tema ficam em data/temas/<tema>.js e se registram em window.NEXO_TEMAS[moduleId].
   Este arquivo só substitui as abas Resumo, Lei seca, Jurisprudência, Flashcards e Questões do caderno
   dos módulos que têm tema aprofundado; os demais módulos continuam como antes. */
(function(){
  var TEMAS = window.NEXO_TEMAS || {};
  if (typeof modules === 'undefined' || typeof renderTab !== 'function') return;

  var css = ''
  + '.tr-wrap{display:grid;gap:14px}'
  + '.tr-card{background:var(--panel,#fff);border:1px solid var(--line,#e3e9e8);border-radius:12px;padding:16px 18px;display:grid;gap:10px;scroll-margin-top:90px}'
  + '.tr-card h2{margin:0;font-size:19px;line-height:1.25}'
  + '.tr-card h3{margin:6px 0 2px;font-size:15px}'
  + '.tr-quick{background:var(--panel2,#edf3f2);border-radius:10px;padding:10px 14px}'
  + '.tr-quick ul,.tr-traps ul{margin:6px 0 0 18px;padding:0}'
  + '.tr-quick li,.tr-traps li{margin:4px 0;line-height:1.5}'
  + '.tr-read p{margin:0 0 10px;line-height:1.7;max-width:72ch}'
  + '.tr-traps{border-left:3px solid #be123c;padding:2px 0 2px 12px}'
  + '.tr-lbl{font-size:11.5px;letter-spacing:.07em;text-transform:uppercase;font-weight:800;color:var(--muted,#778585)}'
  + '.tr-tbl{overflow-x:auto;border:1px solid var(--line,#e3e9e8);border-radius:10px}'
  + '.tr-tbl table{border-collapse:collapse;width:100%;font-size:14px}'
  + '.tr-tbl caption{text-align:left;padding:9px 12px 3px;font-weight:700}'
  + '.tr-tbl th,.tr-tbl td{padding:7px 12px;border-top:1px solid var(--line,#e3e9e8);text-align:left;vertical-align:top}'
  + '.tr-tbl th{font-size:11.5px;text-transform:uppercase;letter-spacing:.05em;color:var(--muted,#778585);background:var(--panel2,#edf3f2)}'
  + '.tr-links{display:flex;flex-wrap:wrap;gap:6px;padding-top:6px;border-top:1px dashed var(--line,#e3e9e8)}'
  + '.tr-chip{display:inline-flex;gap:5px;align-items:center;border:1px solid var(--line,#e3e9e8);background:var(--panel2,#edf3f2);color:inherit;border-radius:8px;padding:4px 9px;font-size:12.5px;cursor:pointer;font:inherit;font-size:12.5px}'
  + '.tr-chip:hover{border-color:var(--green,#24766b)}'
  + '.tr-chip b{color:var(--green,#24766b)}'
  + '.tr-bar{display:flex;flex-wrap:wrap;gap:6px;align-items:center}'
  + '.tr-pill{border:1px solid var(--line,#e3e9e8);background:var(--panel,#fff);color:inherit;border-radius:999px;padding:5px 11px;font-size:13px;cursor:pointer;font:inherit;font-size:13px}'
  + '.tr-pill[aria-pressed="true"]{background:var(--text,#243739);color:var(--panel,#fff);border-color:var(--text,#243739)}'
  + '.tr-notice{background:#ede6fb;color:#2e1065;border-radius:10px;padding:10px 12px;font-size:14px}'
  + '.tr-g1{background:#bfeee2;color:#0b4d42;font-weight:700;border-radius:3px;padding:0 2px}'
  + '.tr-g2{color:#b45309;font-weight:800;text-decoration:underline;text-decoration-thickness:2px;text-underline-offset:3px}'
  + '.tr-g3{color:#9f1239;background:#fde4ea;font-weight:800;border-radius:3px;padding:0 2px}'
  + '.tr-plain .tr-g1,.tr-plain .tr-g2,.tr-plain .tr-g3{background:none;color:inherit;font-weight:inherit;text-decoration:none;padding:0}'
  + '.tr-rot{font-family:ui-monospace,Menlo,monospace;font-size:12.5px;background:var(--panel2,#edf3f2);border-radius:6px;padding:2px 7px}'
  + '.tr-badge{font-size:11.5px;font-weight:800;border-radius:999px;padding:2px 8px}'
  + '.tr-new{background:#ede6fb;color:#6d28d9}'
  + '.tr-st-vigente{background:#dcfce7;color:#15803d}.tr-st-atencao{background:#fef3c7;color:#a16207}'
  + '.tr-st-divergencia{background:#fee2e2;color:#b91c1c}.tr-st-pendente{background:#e2e8f0;color:#475569}'
  + '.tr-texto{line-height:1.75;font-size:15.5px}.tr-texto s{opacity:.6}'
  + '.tr-nota{font-size:12.5px;color:var(--muted,#778585);font-style:italic}'
  + '.tr-quote{margin:0;padding:10px 12px;background:var(--panel2,#edf3f2);border-radius:8px;line-height:1.6}'
  + '.tr-fc{border:1px solid var(--line,#e3e9e8);border-radius:14px;padding:20px;min-height:190px;display:grid;align-content:space-between;gap:12px;cursor:pointer;background:var(--panel,#fff)}'
  + '.tr-fc.flip{background:var(--panel2,#edf3f2)}'
  + '.tr-fc p{margin:0;font-size:17.5px;line-height:1.5}'
  + '.tr-grade{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}'
  + '.tr-gbtn{border:1px solid var(--line,#e3e9e8);border-radius:10px;padding:10px 6px;background:var(--panel,#fff);font:inherit;font-weight:700;cursor:pointer}'
  + '.tr-op{display:flex;gap:10px;text-align:left;border:1px solid var(--line,#e3e9e8);border-radius:10px;padding:9px 11px;background:var(--panel,#fff);color:inherit;cursor:pointer;font:inherit;font-size:14.5px;line-height:1.45;width:100%}'
  + '.tr-op.ok{border-color:#15803d;background:#dcfce7}.tr-op.no{border-color:#b91c1c;background:#fee2e2}'
  + '.tr-com{background:var(--panel2,#edf3f2);border-radius:10px;padding:10px 12px}'
  + '.tr-alert{background:#fef3c7;color:#422006;border-radius:8px;padding:8px 10px;font-size:13.5px}'
  + '.tr-flash{animation:trfl 1.6s ease}@keyframes trfl{0%,40%{box-shadow:0 0 0 3px var(--green,#24766b)}100%{box-shadow:none}}'
  + '@media (prefers-reduced-motion:reduce){.tr-flash{animation:none;outline:3px solid var(--green,#24766b)}}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  function esc(t){return String(t).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
  function strip(h){var d=document.createElement('div');d.innerHTML=h;return (d.textContent||'').replace(/\s+/g,' ').trim()}
  function gx(html){return String(html).replace(/class='g([123])'/g,"class='tr-g$1'")}

  // Índices e compatibilidade com o formato antigo dos módulos
  Object.keys(TEMAS).forEach(function(id){
    var T = TEMAS[id], m = modules.find(function(x){return x.id===id}); if(!m) return;
    T.leiIdx = {}; T.lei.forEach(function(a){a.itens.forEach(function(i){T.leiIdx[i.id]={art:a,item:i}})});
    T.jIdx = {}; T.juris.forEach(function(j){T.jIdx[j.id]=j});
    T.secName = {}; T.secoes.forEach(function(s){T.secName[s.id]=s.curto});
    m.rich = T;
    m.focus = T.meta.artigos + ' — furto, roubo, extorsão, dano, apropriação indébita, estelionato, receptação e disposições gerais. Conferido em ' + T.meta.atualizado + '.';
    m.summary = T.secoes.map(function(s){return '<b>'+s.titulo+'.</b> '+s.rapido.join(' ')});
    m.highlights = []; T.secoes.forEach(function(s){ m.highlights.push(strip(s.rapido[0])) });
    m.pegadinhas = []; T.secoes.forEach(function(s){ (s.pegadinhas||[]).forEach(function(p){ m.pegadinhas.push(p) }) });
    m.law_items = []; T.lei.forEach(function(a){a.itens.forEach(function(i){
      var rot = i.rot.indexOf('Art')===0 ? i.rot : a.art+', '+i.rot;
      m.law_items.push(['CP, '+rot.replace(/^Arts?\. /,'art. '), strip(i.t).slice(0,160)+'…', '<p>'+gx(i.t)+'</p>']);
    })});
    m.juris = T.juris.map(function(j){return [j.trib+' — '+j.tipo+' '+j.num, esc(j.texto)+' <a href="'+j.fonte+'" target="_blank" rel="noopener noreferrer">Conferir na fonte ↗</a>']});
    if (typeof nexoFlashcards !== 'undefined') {
      for (var k = nexoFlashcards.length - 1; k >= 0; k--) if (nexoFlashcards[k].topic === m.title) nexoFlashcards.splice(k, 1);
      T.cards.forEach(function(c){ nexoFlashcards.push({ id:'PAT-'+c.id, discipline:m.discipline, topic:m.title, question:strip(c.f), answer:strip(c.v), mnemonic:(T.tipoNome||{})[c.tipo]||c.tipo }) });
    }
  });

  var tipoNome={caso:'Caso prático',numero:'Números e prazos',distincao:'Distinção',lacuna:'Complete a lei',ce:'Certo ou errado',juris:'Jurisprudência'};
  var stNome={vigente:'Vigente',atencao:'Atenção',divergencia:'Divergência',pendente:'Em julgamento'};
  var UI = { sec:'todas', novo:false, grifos:true, js:'todos', deck:null, di:0, flip:false };
  var box = {}; try { box = JSON.parse(localStorage.getItem('nexo-fc-box')||'{}') } catch(e) {}
  function saveBox(){ try{ localStorage.setItem('nexo-fc-box', JSON.stringify(box)) }catch(e){} }

  function leiRot(T,id){var x=T.leiIdx[id];if(!x)return id;return x.item.rot.indexOf('Art')===0?x.item.rot:x.art.art.replace('Arts.','Art.')+', '+x.item.rot}
  function jShort(x){var n=x.num.split(' (')[0];if(x.tipo==='Súmula')return x.trib+' Súm. '+n;if(x.tipo.indexOf('Tema')===0)return x.trib+' Tema '+n;if(x.tipo.indexOf('Informativo')===0)return x.trib+' '+x.tipo;return x.trib+' · '+x.titulo}
  function chip(tab,target,label,extra){return '<button class="tr-chip" type="button" data-trgo="'+tab+'" data-trtarget="'+(target||'')+'"'+(extra||'')+'>'+label+'</button>'}
  function secBar(T){return '<div class="tr-bar">'+[['todas','Todos']].concat(T.secoes.map(function(s){return [s.id,s.curto]})).map(function(x){return '<button class="tr-pill" type="button" data-trsec="'+x[0]+'" aria-pressed="'+(UI.sec===x[0])+'">'+x[1]+'</button>'}).join('')+'</div>'}
  function counts(T,sec){
    var nl=0;T.lei.forEach(function(a){if(a.sec===sec)nl+=a.itens.length});
    var f=function(arr){return arr.filter(function(o){return o.sec===sec}).length};
    return '<div class="tr-links">'+(nl?chip('lei','','Lei seca <b>'+nl+'</b>',' data-trsec2="'+sec+'"'):'')+(f(T.juris)?chip('juris','','Julgados <b>'+f(T.juris)+'</b>',' data-trsec2="'+sec+'"'):'')+(f(T.cards)?chip('flashcard_topico','','Flashcards <b>'+f(T.cards)+'</b>',' data-trsec2="'+sec+'"'):'')+(f(T.questoes)?chip('quest','','Questões <b>'+f(T.questoes)+'</b>',' data-trsec2="'+sec+'"'):'')+'</div>';
  }

  function rResumo(T){
    var h='<div class="tr-notice"><b>Atualizado em '+T.meta.atualizado+'.</b> '+esc(T.meta.aviso)+'</div>';
    h+='<div class="tr-bar">'+T.secoes.map(function(s){return '<button class="tr-pill" type="button" data-trjump="tr-s-'+s.id+'">'+s.curto+'</button>'}).join('')+'</div>';
    T.secoes.forEach(function(s){
      h+='<section class="tr-card" id="tr-s-'+s.id+'"><h2>'+s.titulo+'</h2>';
      h+='<div class="tr-quick"><div class="tr-lbl">Em 30 segundos</div><ul>'+s.rapido.map(function(x){return '<li>'+x+'</li>'}).join('')+'</ul></div>';
      h+='<div class="tr-read">'+s.teoria.map(function(t){return '<h3>'+t.h+'</h3>'+t.p.map(function(p){return '<p>'+p+'</p>'}).join('')}).join('')+'</div>';
      if(s.quadro)h+='<div class="tr-tbl"><table><caption>'+s.quadro.titulo+'</caption><thead><tr>'+s.quadro.head.map(function(c){return '<th scope="col">'+c+'</th>'}).join('')+'</tr></thead><tbody>'+s.quadro.rows.map(function(r){return '<tr>'+r.map(function(c){return '<td>'+c+'</td>'}).join('')+'</tr>'}).join('')+'</tbody></table></div>';
      if(s.pegadinhas&&s.pegadinhas.length)h+='<div class="tr-traps"><div class="tr-lbl">Pegadinhas</div><ul>'+s.pegadinhas.map(function(x){return '<li>'+x+'</li>'}).join('')+'</ul></div>';
      h+=counts(T,s.id)+'</section>';
    });
    return h;
  }
  function rLei(T){
    var h='<div class="tr-bar"><span class="tr-g1">núcleo e elementares</span> <span class="tr-g2">pena, número, fração</span> <span class="tr-g3">exceção e condição</span></div>';
    h+='<div class="tr-bar"><button class="tr-pill" type="button" data-trtoggle="novo" aria-pressed="'+UI.novo+'">Só o que mudou em 2024–2026</button><button class="tr-pill" type="button" data-trtoggle="grifos" aria-pressed="'+(!UI.grifos)+'">Ler sem grifos</button></div>'+secBar(T);
    var any=false;
    T.lei.forEach(function(a){
      if(UI.sec!=='todas'&&a.sec!==UI.sec)return;
      var it=a.itens.filter(function(i){return !UI.novo||i.novo}); if(!it.length)return; any=true;
      h+='<h3 style="margin:8px 0 0">'+a.art+' <span class="muted" style="font-weight:500">'+a.nome+'</span></h3>';
      it.forEach(function(i){
        h+='<article class="tr-card'+(UI.grifos?'':' tr-plain')+'" id="tr-l-'+i.id+'"><div class="tr-bar"><span class="tr-rot">'+i.rot+'</span>'+(i.novo?'<span class="tr-badge tr-new">'+esc(i.novo)+'</span>':'')+'</div>';
        h+='<div class="tr-texto">'+gx(i.t)+'</div>'+(i.nota?'<div class="tr-nota">('+esc(i.nota)+')</div>':'');
        h+='<div class="tr-links">'+chip('resumo','tr-s-'+a.sec,'Resumo');
        (i.j||[]).forEach(function(j){h+=chip('juris','tr-j-'+j,esc(jShort(T.jIdx[j])))});
        if(i.c&&i.c.length)h+=chip('flashcard_topico','','Flashcards <b>'+i.c.length+'</b>',' data-trcards="'+i.c.join(',')+'"');
        if(i.q&&i.q.length)h+=chip('quest','tr-'+i.q[0],'Questões <b>'+i.q.length+'</b>');
        h+='</div></article>';
      });
    });
    if(!any)h+='<div class="warn">Nenhum dispositivo alterado recentemente neste assunto.</div>';
    return h+'<p class="muted small">Texto vigente do Código Penal conferido no Planalto em '+T.meta.atualizado+'. Trechos longos abreviados com (...).</p>';
  }
  function rJuris(T){
    var h='<div class="tr-bar">'+[['todos','Todas'],['vigente','Vigentes'],['atencao','Atenção'],['divergencia','Divergência'],['pendente','Em julgamento']].map(function(x){return '<button class="tr-pill" type="button" data-trjs="'+x[0]+'" aria-pressed="'+(UI.js===x[0])+'">'+x[1]+'</button>'}).join('')+'</div>'+secBar(T);
    var list=T.juris.filter(function(j){return (UI.sec==='todas'||j.sec===UI.sec)&&(UI.js==='todos'||j.status===UI.js)});
    if(!list.length)h+='<div class="warn">Nada com esse filtro.</div>';
    list.forEach(function(j){
      h+='<article class="tr-card" id="tr-j-'+j.id+'"><div class="tr-bar"><b>'+j.trib+'</b><span>'+esc(j.tipo)+' · '+esc(j.num)+'</span><span class="tr-badge tr-st-'+j.status+'">'+stNome[j.status]+'</span></div>';
      h+='<h3 style="margin:0">'+esc(j.titulo)+'</h3><blockquote class="tr-quote">'+esc(j.texto)+'</blockquote>'+(j.explica?'<div>'+esc(j.explica)+'</div>':'');
      h+='<div class="muted small">'+(j.data?esc(j.data)+' · ':'')+'<a href="'+j.fonte+'" target="_blank" rel="noopener noreferrer">Conferir na fonte ↗</a></div>';
      h+='<div class="tr-links">'+(j.lei||[]).map(function(l){return chip('lei','tr-l-'+l,esc(leiRot(T,l)))}).join('')+chip('resumo','tr-s-'+j.sec,'Resumo')+'</div></article>';
    });
    return h;
  }
  function deckFor(T){
    if(UI.deck)return UI.deck;
    var d=T.cards.filter(function(c){return UI.sec==='todas'||c.sec===UI.sec});
    d.sort(function(a,b){return (box[a.id]||0)-(box[b.id]||0)});
    UI.deck=d; UI.di=0; UI.flip=false; return d;
  }
  function rCards(T){
    var d=deckFor(T), h=secBar(T);
    if(UI.custom)h+='<div class="muted small">Mostrando os cartões ligados ao dispositivo escolhido. <button class="tr-chip" type="button" data-trall="1">Ver todos</button></div>';
    if(!d.length)return h+'<div class="warn">Nenhum cartão com esse filtro.</div>';
    var c=d[UI.di];
    h+='<div class="tr-bar" style="justify-content:space-between"><button class="tr-pill" type="button" data-trnav="-1" aria-label="Cartão anterior">‹ Anterior</button><span class="muted small">'+(UI.di+1)+' / '+d.length+' · nível '+(box[c.id]||0)+'</span><button class="tr-pill" type="button" data-trnav="1" aria-label="Próximo cartão">Próximo ›</button></div>';
    h+='<div class="tr-fc'+(UI.flip?' flip':'')+'" role="button" tabindex="0" data-trflip="1"><div class="tr-lbl" style="display:flex;justify-content:space-between"><span>'+(UI.flip?'Resposta':tipoNome[c.tipo])+'</span><span>'+T.secName[c.sec]+'</span></div><p>'+(UI.flip?c.v:c.f)+'</p><div class="muted small">'+(UI.flip?'Toque para voltar':'Toque para ver a resposta')+'</div></div>';
    if(UI.flip)h+='<div class="tr-grade"><button class="tr-gbtn" type="button" data-trg="0" style="color:#b91c1c">Errei</button><button class="tr-gbtn" type="button" data-trg="1" style="color:#a16207">Difícil</button><button class="tr-gbtn" type="button" data-trg="2" style="color:#15803d">Acertei</button></div>';
    h+='<div class="tr-links">'+(c.lei||[]).map(function(l){return chip('lei','tr-l-'+l,esc(leiRot(T,l)))}).join('')+(c.j||[]).map(function(j){return chip('juris','tr-j-'+j,esc(jShort(T.jIdx[j])))}).join('')+'</div>';
    return h+'<p class="muted small">Os cartões que você erra voltam primeiro. O progresso fica salvo neste navegador.</p>';
  }
  function rQuest(T){
    var h=secBar(T), list=T.questoes.filter(function(q){return UI.sec==='todas'||q.sec===UI.sec});
    if(!list.length)h+='<div class="warn">Ainda não há questões do banco ligadas a este assunto.</div>';
    list.forEach(function(q){
      var ce=q.ops.length===2;
      h+='<article class="tr-card" id="tr-'+q.id+'"><div class="tr-bar"><b>'+q.banca+' '+q.ano+'</b><span class="muted">'+esc(q.cargo)+'</span><span class="tr-badge '+(q.fonteGab==='oficial'?'tr-st-vigente':'tr-st-pendente')+'">gabarito '+q.fonteGab+'</span></div>';
      if(q.alerta)h+='<div class="tr-alert"><b>Atenção:</b> '+esc(q.alerta)+'</div>';
      h+='<div style="line-height:1.6">'+esc(q.enun)+'</div><div style="display:grid;gap:6px">';
      q.ops.forEach(function(o,k){var key=ce?(k===0?'C':'E'):'ABCDE'[k];h+='<button class="tr-op" type="button" data-trq="'+q.id+'" data-trk="'+key+'"><b>'+key+'</b><span>'+esc(o)+'</span></button>'});
      h+='</div><div class="tr-com" hidden id="tr-c-'+q.id+'"><b>Gabarito: '+q.gab+'.</b> '+q.com+'</div>';
      h+='<div class="tr-links">'+(q.lei||[]).map(function(l){return chip('lei','tr-l-'+l,esc(leiRot(T,l)))}).join('')+(q.j||[]).map(function(j){return chip('juris','tr-j-'+j,esc(jShort(T.jIdx[j])))}).join('')+'</div></article>';
    });
    return h;
  }

  var PAGINAS = { penal_patrimonio:'temas/crimes-contra-o-patrimonio.html' };
  var RICH = { resumo:rResumo, lei:rLei, juris:rJuris, flashcard_topico:rCards, quest:rQuest };
  var original = renderTab;
  var lastModule = null, lastTab = null;
  window.renderTab = function(m, tab){
    original(m, tab);
    if(!m || !m.rich || !RICH[tab]) return;
    if(lastModule !== m.id){ UI.sec='todas'; UI.deck=null; UI.custom=false; }
    lastModule = m.id; lastTab = tab;
    var rc = document.querySelector('#view .reading-content');
    var full = PAGINAS[m.id] ? '<div class="muted small"><a href="'+PAGINAS[m.id]+'" target="_blank" rel="noopener">Abrir o tema em tela cheia ↗</a></div>' : '';
    if(rc) rc.innerHTML = '<div class="tr-wrap">' + full + RICH[tab](m.rich) + '</div>';
  };
  try { renderTab = window.renderTab; } catch(e) {}

  function rerender(){ var m=modules.find(function(x){return x.id===lastModule}); if(m) window.renderTab(m,lastTab); }
  function focusEl(id){ var el=document.getElementById(id); if(!el) return; el.scrollIntoView({behavior:'smooth',block:'start'}); el.classList.remove('tr-flash'); void el.offsetWidth; el.classList.add('tr-flash'); }

  document.addEventListener('click', function(e){
    var t = e.target.closest('[data-trgo],[data-trsec],[data-trjump],[data-trtoggle],[data-trjs],[data-trnav],[data-trflip],[data-trg],[data-trq],[data-trall]');
    if(!t || !lastModule) return;
    var m = modules.find(function(x){return x.id===lastModule}); if(!m || !m.rich) return;
    var T = m.rich, d = t.dataset;
    if(d.trgo){
      UI.custom=false; UI.deck=null;
      if(d.trsec2) UI.sec=d.trsec2; else if(d.trtarget) UI.sec='todas';
      if(d.trgo==='lei' && d.trtarget) UI.novo=false;
      if(d.trgo==='juris' && d.trtarget) UI.js='todos';
      if(d.trcards){ UI.deck=d.trcards.split(',').map(function(id){return T.cards.find(function(c){return c.id===id})}).filter(Boolean); UI.di=0; UI.flip=false; UI.custom=true; }
      window.renderTab(m, d.trgo);
      if(d.trtarget) setTimeout(function(){focusEl(d.trtarget)},40);
      return;
    }
    if(d.trjump){ focusEl(d.trjump); return; }
    if(d.trsec){ UI.sec=d.trsec; UI.deck=null; UI.custom=false; rerender(); return; }
    if(d.trtoggle){ if(d.trtoggle==='novo')UI.novo=!UI.novo; else UI.grifos=!UI.grifos; rerender(); return; }
    if(d.trjs){ UI.js=d.trjs; rerender(); return; }
    if(d.trall){ UI.deck=null; UI.custom=false; rerender(); return; }
    if(d.trnav){ var n=UI.deck.length; UI.di=(UI.di+Number(d.trnav)+n)%n; UI.flip=false; rerender(); return; }
    if(d.trflip){ UI.flip=!UI.flip; rerender(); return; }
    if(d.trg){ var c=UI.deck[UI.di], g=+d.trg, lv=box[c.id]||0; box[c.id]=g===0?0:g===1?Math.max(1,lv):lv+2; saveBox(); UI.di=(UI.di+1)%UI.deck.length; UI.flip=false; rerender(); return; }
    if(d.trq){ var q=T.questoes.find(function(x){return x.id===d.trq});
      t.parentNode.querySelectorAll('.tr-op').forEach(function(b){ b.classList.remove('ok','no'); if(b.dataset.trk===q.gab) b.classList.add('ok'); });
      if(d.trk!==q.gab) t.classList.add('no');
      var com=document.getElementById('tr-c-'+q.id); if(com) com.hidden=false; return; }
  });
  document.addEventListener('keydown', function(e){
    var t=e.target; if(t && t.dataset && t.dataset.trflip && (e.key===' '||e.key==='Enter')){ e.preventDefault(); t.click(); }
  });
})();
