/* NEXO Revisão — temas no padrão aprofundado (resumo em camadas, lei seca grifada e ligada,
   jurisprudência com situação, flashcards variados e questões do banco ligadas).
   Os dados de cada tema ficam em data/temas/<tema>.js e se registram em window.NEXO_TEMAS[moduleId].
   Este arquivo só substitui as abas Resumo, Lei seca, Jurisprudência, Flashcards e Questões do caderno
   dos módulos que têm tema aprofundado; os demais módulos continuam como antes. */
(function(){
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
  + '.tr-wrap [hidden]{display:none!important}'
  + '.tr-crumb{font-size:12.5px;color:var(--muted,#778585)}.tr-crumb b{color:var(--text,#243739);font-weight:700}'
  + '.tr-bh{display:flex;align-items:center;gap:10px;margin:22px 0 2px;padding-bottom:6px;border-bottom:3px solid var(--green,#24766b);scroll-margin-top:90px}'
  + '.tr-bh h2{margin:0;font-size:18px}.tr-bn{background:var(--green,#24766b);color:#fff;border-radius:7px;min-width:26px;height:26px;display:grid;place-items:center;font-weight:800;font-size:13px}'
  + '.tr-sum{margin:6px 0 0;padding:0;list-style:none;display:grid;gap:4px}.tr-sum ul{margin:2px 0 6px 34px;padding:0;list-style:none;display:grid;gap:1px}'
  + '.tr-sum button{background:none;border:0;color:inherit;font:inherit;text-align:left;cursor:pointer;padding:4px 0;line-height:1.4}.tr-sum ul button{font-size:13.5px;color:var(--muted,#778585)}'
  + '.tr-sumb{font-weight:700;display:flex;gap:10px;align-items:baseline}.tr-sumb b,.tr-sl{background:var(--panel2,#edf3f2);color:var(--green,#24766b);border-radius:6px;padding:0 7px;font-size:12.5px;font-weight:800}'
  + '.tr-sl{margin-right:8px;font-size:14px}'
  + '.tr-imp{border:2px solid var(--green,#24766b);background:var(--panel2,#edf3f2);border-radius:14px;padding:14px 16px;display:grid;gap:10px}.tr-imp p{margin:0;line-height:1.55}'
  + '.tr-imp-top{display:flex;flex-wrap:wrap;gap:10px;align-items:center}.tr-nv{display:inline-flex;gap:3px}.tr-nv i{width:22px;height:6px;border-radius:3px;background:var(--line,#e3e9e8)}.tr-nv i.on{background:var(--green,#24766b)}'
  + '.tr-dl{margin-top:2px}.tr-decore{margin:0;display:grid;gap:0}.tr-decore div{display:flex;justify-content:space-between;gap:14px;padding:7px 0;border-bottom:1px solid var(--line,#e3e9e8);font-size:14.5px;line-height:1.45}.tr-decore dt{margin:0}.tr-decore dd{margin:0;text-align:right;font-weight:700;color:var(--green,#24766b)}'
  + '.tr-macs{display:grid;gap:8px}.tr-mac{background:var(--panel,#fff);border-radius:10px;padding:9px 12px;display:grid;gap:2px;font-size:14px;line-height:1.5}.tr-mac b{color:var(--green,#24766b)}'
  + '.tr-modelo{margin:2px 0 0}.tr-pv p{margin:0;line-height:1.6}.tr-gab{display:inline-block;font-weight:800;font-size:12.5px;border-radius:6px;padding:1px 8px}.tr-gab-c{background:#dcfce7;color:#15803d}.tr-gab-e{background:#fee2e2;color:#b91c1c}'
  + '.tr-traps-box{background:#fff4f1;border-radius:12px;border-left:4px solid #be123c;padding:10px 14px}.tr-traps-box li{margin:7px 0}.tr-traps-box .tr-lbl{display:inline-block;margin-right:6px}'
  + '.tr-res h3{margin:8px 0 2px;font-size:14px;color:var(--green,#24766b)}.tr-res ul{margin:2px 0 6px 18px;padding:0}.tr-res li{margin:4px 0;line-height:1.5;font-size:14.5px}'
  + '.tr-ck td{vertical-align:middle}.tr-ck input[type=checkbox]{width:20px;height:20px;accent-color:var(--green,#24766b)}.tr-ck label{display:block;cursor:pointer;line-height:1.4}.tr-prog{margin:0;font-weight:700;color:var(--green,#24766b)}'
  + '.tr-flash{animation:trfl 1.6s ease}@keyframes trfl{0%,40%{box-shadow:0 0 0 3px var(--green,#24766b)}100%{box-shadow:none}}'
  + '@media (prefers-reduced-motion:reduce){.tr-flash{animation:none;outline:3px solid var(--green,#24766b)}}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  function esc(t){return String(t).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
  function strip(h){var d=document.createElement('div');d.innerHTML=h;return (d.textContent||'').replace(/\s+/g,' ').trim()}
  function gx(html){return String(html).replace(/class='g([123])'/g,"class='tr-g$1'")}

  // Índices e compatibilidade com o formato antigo dos módulos
  function initTema(m){
    if(!m || m.rich) return;
    var T = (window.NEXO_TEMAS||{})[m.id]; if(!T) return;
    T.leiIdx = {}; (T.lei||[]).forEach(function(a){a.itens.forEach(function(i){T.leiIdx[i.id]={art:a,item:i}})});
    T.jIdx = {}; (T.juris||[]).forEach(function(j){T.jIdx[j.id]=j});
    T.secName = {}; T.secoes.forEach(function(s){T.secName[s.id]=s.curto});
    T.lei=T.lei||[]; T.juris=T.juris||[]; T.cards=T.cards||[]; T.questoes=T.questoes||[];
    m.rich = T;
    if(T.meta.foco) m.focus = T.meta.foco + ' Conferido em ' + T.meta.atualizado + '.';
    m.summary = T.secoes.map(function(s){return '<b>'+s.titulo+'.</b> '+s.rapido.join(' ')});
    m.highlights = []; T.secoes.forEach(function(s){ m.highlights.push(strip(s.rapido[0])) });
    m.pegadinhas = []; T.secoes.forEach(function(s){ (s.pegadinhas||[]).forEach(function(p){ m.pegadinhas.push(p) }) });
    if(T.lei.length){ m.law_items = []; T.lei.forEach(function(a){a.itens.forEach(function(i){
      var rot = i.rot.indexOf('Art')===0 || i.rot.indexOf('Lei')===0 ? i.rot : a.art+', '+i.rot;
      m.law_items.push([rot, strip(i.t).slice(0,160)+'…', '<p>'+gx(i.t)+'</p>']);
    })}); }
    if(T.juris.length) m.juris = T.juris.map(function(j){return [j.trib+' — '+j.tipo+' '+j.num, esc(j.texto)+' <a href="'+j.fonte+'" target="_blank" rel="noopener noreferrer">Conferir na fonte ↗</a>']});
    if (typeof nexoFlashcards !== 'undefined' && T.cards.length) {
      for (var k = nexoFlashcards.length - 1; k >= 0; k--) if (nexoFlashcards[k].topic === m.title) nexoFlashcards.splice(k, 1);
      T.cards.forEach(function(c){ nexoFlashcards.push({ id:'T-'+m.id+'-'+c.id, discipline:m.discipline||'Direito Constitucional', topic:m.title, question:strip(c.f), answer:strip(c.v), mnemonic:tipoNome[c.tipo]||c.tipo }) });
    }
  }
  var tipoNome={caso:'Caso prático',numero:'Números e prazos',distincao:'Distinção',lacuna:'Complete a lei',ce:'Certo ou errado',juris:'Jurisprudência'};
  modules.forEach(initTema);

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

  /* Cores de leitura: destaca referências legais, números/frações/prazos e termos em latim.
     Só embrulha texto (não muda nenhuma letra), então os grifos do aluno continuam ancorados. */
  var RX_REF=/((?:arts?\.|Art\.)\s*\d+[º°]?(?:-[A-Z])?(?:,\s*(?:§\s*\d+[º°]?|parágrafo único|caput|[IVXL]+\b|[a-z]\)))*(?:\s*(?:e|a)\s*\d+[º°]?(?:-[A-Z])?)?(?:\s+d[oa]s?\s+(?:CP|CPP|CF|CTB|ECA|LCP|CPM|Lei de Drogas))?|Súmulas?(?:\s+Vinculantes?)?\s+(?:n[º°]\s*)?\d+(?:\s+do\s+(?:STF|STJ))?|Lei\s+(?:n[º°]\s*)?\d{1,2}\.?\d{3}(?:\/\d{2,4})?|\b(?:ADPF|ADI|RE|HC|REsp|AgRg)\s+(?:n[º°]\s*)?\d[\d.]*|§\s*\d+[º°]?)/g;
  var RX_NUM=/(\b\d+\/\d+\b(?:\s+(?:a|até)\s+\d+\/\d+\b)?|\b\d+\s+(?:a\s+\d+\s+)?(?:dias|meses|anos|horas)\b|\bum\s+(?:sexto|terço)\s+a\s+(?:um|dois)\s+terços?\b|\bmetade\b)/g;
  function colorir(html){
    if(!html) return html;
    var partes=String(html).split(/(<[^>]+>)/), dentroI=0;
    for(var k=0;k<partes.length;k++){
      var t=partes[k]; if(!t) continue;
      if(t.charAt(0)==='<'){ if(/^<i[\s>]/i.test(t)) dentroI++; else if(/^<\/i>/i.test(t)) dentroI=Math.max(0,dentroI-1); continue; }
      t=t.replace(RX_REF,'<span class="tr-ref">$1</span>');
      t=t.replace(/(<span class="tr-ref">[^<]*<\/span>)|([^<]+)/g,function(m,ref,txt){ return ref||txt.replace(RX_NUM,'<span class="tr-num">$1</span>'); });
      partes[k]=t;
    }
    return partes.join('');
  }

  /* ===== Padrão NEXO de material (modelo aprovado em 25/10/2026) =====
     Ordem da aba Resumo: caminho e sumário → explicação por tópicos → comparativo → nota de importância
     (com "Decore isto") → como cai em prova → pegadinhas da banca → resumo do material → diagnóstico final marcável.
     Campos opcionais no tema (todos têm reserva montada com o conteúdo que o próprio tema já tem):
       meta.caminho:["Direito Penal","Crimes contra a pessoa","Crimes contra a vida"]
       importancia:{ nivel:1-5, texto:"", decore:[["rótulo","<b>valor</b>"]], macetes:[["Título","texto"]] }
       comparativo:{ titulo, head:[..2 colunas..], rows:[[a,b]] }
       prova:[{ tipo:"ce"|"caso", enun, gab:"Certo"|"Errado", com }]   (questões-modelo autorais, não são de prova real)
       resumo:["frase", ...]      checklist:["o que o aluno deve saber", ...] */
  var NIVEL_PRIO = {'MUITO ALTA':5,'ALTA':4,'MÉDIA':3,'COMPLEMENTAR':1};
  var NIVEL_TXT = {5:'muito alta',4:'alta',3:'média',2:'baixa',1:'complementar'};
  var chk = {}; try { chk = JSON.parse(localStorage.getItem('nexo-checklist')||'{}') } catch(e) {}
  function saveChk(){ try{ localStorage.setItem('nexo-checklist', JSON.stringify(chk)) }catch(e){} }

  function ceDeCard(c){
    var v=String(c.v), gab=/^\s*<b>\s*Certo/i.test(v)?'Certo':/^\s*<b>\s*Errado/i.test(v)?'Errado':null;
    if(!gab) return null;
    return { tipo:'ce', enun:strip(c.f).replace(/^Certo ou errado:\s*/i,''), gab:gab, com:v.replace(/^\s*<b>[^<]*<\/b>\.?\s*/,'') };
  }
  function padrao(m,T){
    var I=T.importancia||{}, P={};
    P.caminho=(T.meta.caminho||[m.discipline,m.parent_subject]).filter(Boolean);
    P.imp={ nivel:I.nivel||NIVEL_PRIO[m.priority]||3, texto:I.texto||'', macetes:I.macetes||[],
      decore:I.decore||T.cards.filter(function(c){return c.tipo==='numero'}).slice(0,6).map(function(c){return [strip(c.f),c.v]}) };
    /* reserva: poucos números no tema → "Decore isto" usa a ideia central de cada seção */
    if(P.imp.decore.length<3){ P.imp.pontos=T.secoes.slice(0,6).map(function(s){return [s.curto,s.rapido[0]]}); }
    if(T.prova) P.prova=T.prova;
    else {
      P.prova=T.cards.map(ceDeCard).filter(Boolean).slice(0,4)
        .concat(T.cards.filter(function(c){return c.tipo==='caso'}).slice(0,2).map(function(c){return {tipo:'caso',enun:strip(c.f),com:c.v}}));
    }
    P.comparativo=T.comparativo||(function(){
      var d=T.cards.filter(function(c){return c.tipo==='distincao'}).slice(0,8);
      return d.length?{titulo:'Distinções que a banca cobra',head:['Compare','Como diferenciar'],rows:d.map(function(c){return [c.f,c.v]})}:null;
    })();
    P.resumo=T.resumo?[{t:'',itens:T.resumo}]:T.secoes.map(function(s){return {t:s.curto,itens:s.rapido}});
    P.checklist=T.checklist||(function(){
      var l=[]; T.secoes.forEach(function(s){ if(s.teoria.length>1) s.teoria.forEach(function(t){l.push(strip(t.h))}); else l.push(strip(s.titulo)); });
      return l.slice(0,14);
    })();
    P.pegadinhas=[]; T.secoes.forEach(function(s){ (s.pegadinhas||[]).forEach(function(x){P.pegadinhas.push({sec:s.curto,t:x})}) });
    (T.pegadinhas||[]).forEach(function(x){P.pegadinhas.push({sec:'Geral',t:x})});
    return P;
  }
  function bloco(n,titulo,id){ return '<div class="tr-bh" id="'+id+'"><span class="tr-bn">'+n+'</span><h2>'+titulo+'</h2></div>'; }
  function grupo(nome,html){ return '<div class="tr-grupo" data-trbloco="'+nome+'">'+html+'</div>'; }
  function barras(n){var h='';for(var i=1;i<=5;i++)h+='<i class="'+(i<=n?'on':'')+'"></i>';return '<span class="tr-nv" role="img" aria-label="Importância '+n+' de 5">'+h+'</span>'}
  function tabela(q){return '<div class="tr-tbl"><table><caption>'+q.titulo+'</caption><thead><tr>'+q.head.map(function(c){return '<th scope="col">'+c+'</th>'}).join('')+'</tr></thead><tbody>'+q.rows.map(function(r){return '<tr>'+r.map(function(c){return '<td>'+colorir(c)+'</td>'}).join('')+'</tr>'}).join('')+'</tbody></table></div>'}

  function rResumo(T){
    var m=modulo2(lastModule), P=padrao(m,T), n=1, h='', G=function(nome,html){ h+='<div class="tr-grupo" data-trbloco="'+nome+'">'+html+'</div>'; };
    if(T.meta.aviso) h+='<div class="tr-notice"><b>Atualizado em '+T.meta.atualizado+'.</b> '+esc(T.meta.aviso)+'</div>';
    h+='<nav class="tr-crumb" aria-label="Caminho do assunto">'+P.caminho.map(esc).concat(['<b>'+esc(T.meta.tema)+'</b>']).join(' <span aria-hidden="true">›</span> ')+'</nav>';
    h+='<div class="tr-legenda" aria-label="Legenda das cores"><span><b style="color:var(--rd-key)">Conceito-chave</b></span><span><span class="tr-ref">art. 1º</span>lei, súmula, julgado</span><span><span class="tr-num">1/3</span>número, fração, prazo</span><span><i style="color:var(--rd-lat)">latim</i></span></div>';
    /* 1. Sumário */
    G('sumario', bloco(n++,'O que você vai ver','tr-b-sumario')+'<ol class="tr-sum">'+T.secoes.map(function(s,i){
      return '<li><button class="tr-sumb" type="button" data-trjump="tr-s-'+s.id+'"><b>'+String.fromCharCode(65+i)+'</b>'+s.titulo+'</button>'
        +(s.teoria.length>1?'<ul>'+s.teoria.map(function(t,k){return '<li><button type="button" data-trjump="tr-t-'+s.id+'-'+k+'">'+t.h+'</button></li>'}).join('')+'</ul>':'')+'</li>';
    }).join('')+'</ol>');
    /* 2. Explicação por tópicos (cada seção é uma página no Livro digital) */
    h+=bloco(n++,'Explicação do assunto','tr-b-explicacao');
    T.secoes.forEach(function(s,i){
      h+='<section class="tr-card" id="tr-s-'+s.id+'"><h2><span class="tr-sl" aria-hidden="true">'+String.fromCharCode(65+i)+'</span>'+s.titulo+'</h2>';
      h+='<div class="tr-quick"><div class="tr-lbl">Em 30 segundos</div><ul>'+s.rapido.map(function(x){return '<li>'+colorir(x)+'</li>'}).join('')+'</ul></div>';
      h+='<div class="tr-read tr-cor tr-topicos'+(s.teoria.length>1?'':' tr-um')+'">'+s.teoria.map(function(t,k){return '<article class="tr-topico" id="tr-t-'+s.id+'-'+k+'"><h3><span class="tr-tn" aria-hidden="true">'+String.fromCharCode(65+i)+'.'+(k+1)+'</span>'+t.h+'</h3>'+t.p.map(function(p){return '<p>'+colorir(p)+'</p>'}).join('')+'</article>'}).join('')+'</div>';
      if(s.quadro) h+=tabela(s.quadro);
      h+=counts(T,s.id)+'</section>';
    });
    /* 3. Comparativo */
    if(P.comparativo) G('comparativo', bloco(n++,'Comparativo final','tr-b-comparativo')+tabela(P.comparativo));
    /* 4. Nota de importância */
    var I=P.imp, g='';
    g+=bloco(n++,'Nota de importância','tr-b-importancia');
    g+='<div class="tr-imp" role="note" aria-label="Nota de importância"><div class="tr-imp-top"><b>Importância: '+NIVEL_TXT[I.nivel]+'</b>'+barras(I.nivel)+'<span class="muted small">'+I.nivel+' de 5</span></div>';
    if(I.texto) g+='<p>'+colorir(I.texto)+'</p>';
    if(I.decore.length) g+='<div class="tr-lbl tr-dl">Decore isto</div><dl class="tr-decore">'+I.decore.map(function(r){return '<div><dt>'+colorir(r[0])+'</dt><dd>'+colorir(r[1])+'</dd></div>'}).join('')+'</dl>';
    if(I.pontos) g+='<div class="tr-lbl tr-dl">'+(I.decore.length?'Mais para fixar':'Decore isto')+'</div><div class="tr-macs">'+I.pontos.map(function(x){return '<div class="tr-mac"><b>'+x[0]+'</b><span>'+colorir(x[1])+'</span></div>'}).join('')+'</div>';
    if(I.macetes.length) g+='<div class="tr-lbl tr-dl">Macetes</div><div class="tr-macs">'+I.macetes.map(function(x){return '<div class="tr-mac"><b>'+x[0]+'</b><span>'+colorir(x[1])+'</span></div>'}).join('')+'</div>';
    G('importancia', g+'</div>');
    /* 5. Como cai em prova */
    if(P.prova.length) G('prova', bloco(n++,'Como cai em prova','tr-b-prova')
      +'<p class="muted small tr-modelo">Questões-modelo escritas pelo NEXO no estilo das bancas. Não são questões de prova real; as oficiais ficam na aba Questões.</p>'
      +P.prova.map(function(q){return '<article class="tr-card tr-pv"><div class="tr-lbl">'+(q.tipo==='ce'?'Certo ou errado':'Caso prático')+'</div><p>'+colorir(q.enun)+'</p>'+(q.gab?'<p><span class="tr-gab tr-gab-'+(q.gab==='Certo'?'c':'e')+'">'+q.gab+'</span> '+colorir(q.com)+'</p>':'<p class="tr-resp"><b>Resposta:</b> '+colorir(q.com)+'</p>')+'</article>'}).join(''));
    /* 6. Pegadinhas */
    if(P.pegadinhas.length) G('pegadinhas', bloco(n++,'Pegadinhas da banca','tr-b-pegadinhas')
      +'<div class="tr-traps tr-traps-box"><ul>'+P.pegadinhas.map(function(x){return '<li><span class="tr-lbl">'+esc(x.sec)+'</span> '+colorir(x.t)+'</li>'}).join('')+'</ul></div>');
    /* 7. Resumo */
    G('resumo', bloco(n++,'Resumo do material','tr-b-resumo')
      +'<div class="tr-card tr-res">'+P.resumo.map(function(g){return (g.t?'<h3>'+esc(g.t)+'</h3>':'')+'<ul>'+g.itens.map(function(x){return '<li>'+colorir(x)+'</li>'}).join('')+'</ul>'}).join('')+'</div>');
    /* 8. Diagnóstico final marcável */
    var feitos=chk[m.id]||[], total=P.checklist.length, ok=P.checklist.filter(function(x){return feitos.indexOf(x)>=0}).length;
    G('diagnostico', bloco(n++,'Diagnóstico final','tr-b-diagnostico')
      +'<p class="muted small">Marque cada item quando conseguir explicar sem consultar o material. Se tiver dúvida, volte ao tópico.</p>'
      +'<div class="tr-tbl tr-ck"><table><thead><tr><th scope="col" style="width:48px">Ok</th><th scope="col">O que você precisa saber ao final deste resumo</th></tr></thead><tbody>'
      +P.checklist.map(function(x,i){var id='trck-'+i;return '<tr><td><input type="checkbox" id="'+id+'" data-trck="'+esc(x)+'"'+(feitos.indexOf(x)>=0?' checked':'')+'></td><td><label for="'+id+'">'+esc(x)+'</label></td></tr>'}).join('')
      +'</tbody></table></div><p class="tr-prog" id="tr-prog" aria-live="polite">'+progTxt(ok,total)+'</p>');
    return h;
  }
  function modulo2(id){ return modules.find(function(x){return x.id===id})||{}; }
  function progTxt(n,t){return n+' de '+t+' itens marcados'+(n===t&&t?' — pronto para seguir':'')}
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
      h+='<h3 style="margin:0">'+esc(j.titulo)+'</h3><blockquote class="tr-quote">'+(j.sintese?'<b>Em síntese:</b> ':'')+esc(j.texto)+'</blockquote>'+(j.explica?'<div>'+esc(j.explica)+'</div>':'');
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
    initTema(m);
    original(m, tab);
    if(!m || !m.rich || !RICH[tab]) return;
    /* não esconder questões já existentes no módulo quando o tema ainda não tem questões ligadas */
    if(tab==='quest' && !(m.rich.questoes||[]).length && m.questions && m.questions.length) return;
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
  document.addEventListener('change', function(e){
    var t=e.target; if(!t || !t.dataset || t.dataset.trck===undefined || !lastModule) return;
    var arr=chk[lastModule]||[], x=t.dataset.trck, k=arr.indexOf(x);
    if(t.checked && k<0) arr.push(x); else if(!t.checked && k>=0) arr.splice(k,1);
    chk[lastModule]=arr; saveChk();
    var all=document.querySelectorAll('input[data-trck]'), n=0; all.forEach(function(c){ if(c.checked) n++ });
    var p=document.getElementById('tr-prog'); if(p) p.textContent=progTxt(n,all.length);
  });
  document.addEventListener('keydown', function(e){
    var t=e.target; if(t && t.dataset && t.dataset.trflip && (e.key===' '||e.key==='Enter')){ e.preventDefault(); t.click(); }
  });
})();
