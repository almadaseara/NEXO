/* NEXO Lab — Simulado adaptativo.
   Monta a prova com as questões que já existem no NEXO (cadernos e banco). A composição usa só dados reais do aluno:
   histórico de acertos por assunto (nexo_eventos), erros pendentes do caderno e o que ainda nunca foi resolvido.
   A prova é entregue em blocos de 10: ao fechar cada bloco, o próximo é recalculado com o desempenho do próprio simulado,
   sem mostrar gabarito durante a prova. Resultados e histórico ficam neste aparelho; as respostas entram no desempenho
   e no caderno de erros como nos outros simulados. Não altera questões, gabaritos nem Supabase. */
(function(){
'use strict';
var KC='nexo_simulado_lab_cfg_v1', KH='nexo_simulados_lab_v1', BLK=10;
var MODOS=[
 {id:'erros',t:'Foco em erros',d:'Prioriza seus pontos fracos e os erros pendentes.',i:'alvo'},
 {id:'equilibrio',t:'Equilíbrio por disciplina',d:'Distribuição equilibrada conforme o peso do edital.',i:'balanca'},
 {id:'tempo',t:'Pressão de tempo',d:'60 s por questão. Encerra sozinho no fim do tempo.',i:'relogio'}
];
var CORES={'Direito Penal':'#22c18a','Direito Constitucional':'#3b82f6','Direito Administrativo':'#f97316','Medicina Legal':'#8b5cf6','Direito Processual Penal':'#0f8a8a'};
var EXTRA=['#ec4899','#eab308','#06b6d4','#94a3b8','#84cc16'];
var S=null, perfil=null, semente=1, tick=null;

function ls(k,d){try{var v=JSON.parse(localStorage.getItem(k));return v==null?d:v}catch(e){return d}}
function sv(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function txt(s){return String(s==null?'':s).replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim()}
function V(){return document.getElementById('view')}
function API(){return window.nexoCadernoApi||{todas:function(){return []},erradas:function(){return []}}}
function NL(){return window.nexoLivro||{livros:[]}}
function discDe(m){return (m&&m.discipline)||'Direito Constitucional'}
function corDe(d,ix){return CORES[d]||EXTRA[(ix||0)%EXTRA.length]}
function fmtT(ms){var s=Math.max(0,Math.round(ms/1000)),h=Math.floor(s/3600),m=Math.floor(s%3600/60),x=s%60;return (h?h+':'+String(m).padStart(2,'0'):String(m).padStart(2,'0'))+':'+String(x).padStart(2,'0')}
function fmtDur(min){var h=Math.floor(min/60),m=Math.round(min%60);return h?(m?h+'h'+String(m).padStart(2,'0')+'min':h+'h'):m+' min'}
function rnd(seed){var x=Math.sin(seed*9301+49297)*233280;return x-Math.floor(x)}

var IC={
 alvo:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/>',
 balanca:'<path d="M12 3v18M5 7h14M5 7l-3 6a3 3 0 0 0 6 0zm14 0-3 6a3 3 0 0 0 6 0zM7 21h10"/>',
 relogio:'<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2M9 2h6"/>',
 camadas:'<path d="m12 3 9 5-9 5-9-5zM3 13l9 5 9-5M3 17.5l9 5 9-5" />',
 engrenagem:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3h0a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5h0a1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8v0a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
 bandeira:'<path d="M5 21V4m0 0h11l-2 4 2 4H5"/>',
 seta:'<path d="m9 6 6 6-6 6"/>',
 play:'<path d="M7 4.5v15l12-7.5z" fill="currentColor"/>',
 refazer:'<path d="M20 12a8 8 0 0 1-13.7 5.6M4 12a8 8 0 0 1 13.7-5.6M18 3v4h-4M6 21v-4h4"/>',
 check:'<path d="m5 12.5 4.5 4.5L19 7.5"/>',
 raio:'<path d="m13 2-9 12h7l-1 8 9-12h-7z"/>'
};
function svg(n,w){return '<svg viewBox="0 0 24 24" width="'+(w||20)+'" height="'+(w||20)+'" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+IC[n]+'</svg>'}

/* ---------- dados do aluno ---------- */
function bancaDe(q){
  var s=String((q&&q.source)||'');
  if(/aocp/i.test(s))return 'AOCP';
  if(/cebraspe|cespe/i.test(s))return 'Cebraspe';
  if(/\bfgv\b/i.test(s))return 'FGV';
  if(/\bfcc\b/i.test(s))return 'FCC';
  if(/vunesp/i.test(s))return 'Vunesp';
  if(/idecan/i.test(s))return 'Idecan';
  if(/quadrix/i.test(s))return 'Quadrix';
  return 'Outras';
}
function historico(){
  var ev=ls('nexo_eventos',[]),st={},tot=0,ok=0;
  (Array.isArray(ev)?ev:[]).forEach(function(e){
    if(!e||e.k!=='q'||!e.m)return;
    var r=st[e.m]=st[e.m]||{n:0,err:0};r.n++;tot++;if(e.ok)ok++;else r.err++;
  });
  var pend={};API().erradas().forEach(function(x){pend[x.skey]=1});
  var resp=ls('nexo_practice_answers',{})||{},feitas={};
  Object.keys(resp).forEach(function(k){if(resp[k]&&resp[k].done)feitas[k]=1});
  return {st:st,tot:tot,ok:ok,pend:pend,nPend:Object.keys(pend).length,feitas:feitas};
}
function concursos(){
  var s=window.nexoConcursosSelecionados&&window.nexoConcursosSelecionados(),cat=window.nexoConcursosCatalogo||[];
  return ((s&&s.items)||[]).map(function(it){
    var c=cat.find(function(x){return x.id===it.id})||{},cg=(c.cargos||[]).find(function(z){return z[0]===it.cargo});
    return {id:it.id,cargo:it.cargo,nome:(window.nexoTurmas&&window.nexoTurmas.nome&&window.nexoTurmas.nome(it.id))||c.nome||it.id,cargoNome:cg?cg[1]:it.cargo,principal:s.principal===it.id};
  });
}
function escopo(cfg){
  var c=concursos().find(function(x){return x.id===cfg.concurso});
  if(!c)return null;
  var ed=(window.NEXO_EDITAIS||{})[c.id],cg=ed&&ed.cargos&&ed.cargos[c.cargo];
  if(!cg)return null;
  var ids=[].concat(cg.gerais||[],cg.especificos||[]);
  var nomes=NL().livros.filter(function(L){return ids.indexOf(L.id)>=0}).map(function(L){return L.disc});
  return nomes.length?nomes:null;
}
function prioDe(disc){
  try{var L=NL().livros.find(function(x){return x.disc===disc});var n=L&&window.nexoTrilha.prioDisciplina(L.id);return n||0}catch(e){return 0}
}
function cfgLer(){
  var cs=concursos(),pr=cs.find(function(x){return x.principal})||cs[0];
  var c=Object.assign({concurso:pr?pr.id:'',banca:'',n:20,seg:90,modo:'erros'},ls(KC,{})||{});
  if(c.concurso&&!cs.some(function(x){return x.id===c.concurso}))c.concurso=pr?pr.id:'';
  if(!c.concurso&&pr)c.concurso=pr.id;
  return c;
}

/* ---------- motor de composição ---------- */
function pool(cfg){
  var esc_=escopo(cfg);
  return API().todas().filter(function(x){
    if(cfg.banca&&bancaDe(x.q)!==cfg.banca)return false;
    if(esc_&&esc_.indexOf(discDe(x.m))<0)return false;
    return true;
  });
}
function pesoMod(st,id,extra){
  var r=st[id],n=(r?r.n:0)+(extra&&extra[id]?extra[id].n:0),er=(r?r.err:0)+(extra&&extra[id]?extra[id].err:0);
  return n?1+3*(er/n):1.5;
}
function pesoQ(x,cfg,H,extra){
  if(cfg.modo!=='erros')return H.feitas[x.skey]?0.9:1.1;
  return pesoMod(H.st,x.m.id,extra)*(H.pend[x.skey]?2.2:1)*(H.feitas[x.skey]?0.8:1.25);
}
/* reparte k vagas entre grupos pelo peso (maior resto), respeitando o limite de cada grupo */
function repartir(grupos,k){
  var res={},rest=k,ativos=grupos.filter(function(g){return g.cap>0});
  grupos.forEach(function(g){res[g.d]=0});
  while(rest>0&&ativos.length){
    var W=ativos.reduce(function(a,g){return a+g.w},0)||1,usados=0,lista=ativos.map(function(g){var q=rest*g.w/W,f=Math.min(Math.floor(q),g.cap-res[g.d]);return {g:g,f:f,r:q-Math.floor(q)}});
    lista.forEach(function(o){res[o.g.d]+=o.f;usados+=o.f});
    var sobra=rest-usados;
    lista.sort(function(a,b){return b.r-a.r});
    for(var i=0;i<lista.length&&sobra>0;i++){var o=lista[i];if(res[o.g.d]<o.g.cap){res[o.g.d]++;sobra--;usados++}}
    rest-=usados;
    ativos=ativos.filter(function(g){return res[g.d]<g.cap});
    if(!usados)break;
  }
  return res;
}
function grupos(itens,cfg,H,extra){
  var por={};
  itens.forEach(function(x){var d=discDe(x.m);(por[d]=por[d]||{d:d,w:0,cap:0,it:[]});por[d].cap++;por[d].it.push(x);por[d].w+=pesoQ(x,cfg,H,extra)});
  var l=Object.keys(por).map(function(d){return por[d]});
  l.forEach(function(g){g.w=cfg.modo==='erros'?(g.w/g.cap)*Math.sqrt(g.cap):(prioDe(g.d)||1.5)});
  return l;
}
/* previsão da prova inteira: distribuição por disciplina e assuntos mais cobrados */
function prever(cfg){
  var H=historico(),p=pool(cfg),n=Math.min(cfg.n,p.length),gs=grupos(p,cfg,H),al=repartir(gs,n);
  var disc=gs.map(function(g,i){return {d:g.d,n:al[g.d]||0,cap:g.cap,cor:corDe(g.d,i)}}).filter(function(x){return x.n>0}).sort(function(a,b){return b.n-a.n});
  var mods={};
  gs.forEach(function(g){
    var W=g.it.reduce(function(a,x){return a+pesoQ(x,cfg,H)},0)||1,q=al[g.d]||0;
    g.it.forEach(function(x){var m=mods[x.m.id]=mods[x.m.id]||{id:x.m.id,t:x.m.title,d:g.d,e:0};m.e+=q*pesoQ(x,cfg,H)/W});
  });
  var top=Object.keys(mods).map(function(k){return mods[k]}).sort(function(a,b){return b.e-a.e}).slice(0,5);
  var fracos=Object.keys(H.st).map(function(id){var r=H.st[id];return {id:id,n:r.n,err:r.err,taxa:r.err/r.n}}).filter(function(x){return x.n>=3}).sort(function(a,b){return b.taxa-a.taxa||b.n-a.n}).slice(0,3)
    .map(function(x){var m=(typeof modules!=='undefined'?modules:[]).find(function(y){return y.id===x.id});return {t:m?m.title:x.id,taxa:Math.round(x.taxa*100),n:x.n}});
  return {n:n,total:p.length,disc:disc,top:top,fracos:fracos,H:H,pool:p};
}
function sortear(itens,k,cfg,H,extra,seed){
  var gs=grupos(itens,cfg,H,extra),al=repartir(gs,k),out=[];
  gs.forEach(function(g){
    var q=al[g.d]||0;
    out=out.concat(g.it.map(function(x,i){return {x:x,k:Math.pow(Math.max(rnd(seed*131+i+g.d.length*7+x.skey.length*3+i*17),1e-6),1/pesoQ(x,cfg,H,extra))}}).sort(function(a,b){return b.k-a.k}).slice(0,q).map(function(o){return o.x}));
  });
  /* embaralha o bloco */
  return out.map(function(x,i){return {x:x,r:rnd(seed*17+i*31+x.skey.length)}}).sort(function(a,b){return a.r-b.r}).map(function(o){return o.x});
}

/* ---------- tela de configuração ---------- */
function donut(disc,n){
  var R=52,C=2*Math.PI*R,off=0,seg='';
  disc.forEach(function(x){var len=C*x.n/n;seg+='<circle cx="70" cy="70" r="'+R+'" fill="none" stroke="'+x.cor+'" stroke-width="20" stroke-dasharray="'+Math.max(0,len-2)+' '+(C-Math.max(0,len-2))+'" stroke-dashoffset="'+(-off)+'" transform="rotate(-90 70 70)"/>';off+=len});
  return '<div class="sa-donut"><svg viewBox="0 0 140 140" width="156" height="156" aria-hidden="true"><circle cx="70" cy="70" r="'+R+'" fill="none" stroke="currentColor" stroke-opacity=".1" stroke-width="20"/>'+seg+'</svg><div><b>'+n+'</b><span>questões</span></div></div>';
}
function historicoHtml(){
  var h=ls(KH,[]);if(!Array.isArray(h)||!h.length)return '<p class="sa-vazio">Seus simulados aparecem aqui, com a evolução do acerto.</p>';
  var u=h.slice(-6);
  return '<div class="sa-hist-g">'+u.map(function(x){var p=Math.round(x.ac/Math.max(1,x.n)*100);return '<span title="'+esc(new Date(x.t).toLocaleDateString('pt-BR'))+' · '+x.ac+' de '+x.n+'"><i style="height:'+Math.max(6,p)+'%"></i><em>'+p+'%</em></span>'}).join('')+'</div>'
   +'<ul class="sa-hist">'+h.slice(-3).reverse().map(function(x){return '<li><b>'+esc(new Date(x.t).toLocaleDateString('pt-BR'))+'</b><span>'+x.ac+' de '+x.n+' · '+fmtDur(x.ms/60000)+' · '+esc((MODOS.find(function(m){return m.id===x.modo})||{t:''}).t)+'</span></li>'}).join('')+'</ul>';
}
function configHtml(){
  var cfg=cfgLer(),cs=concursos(),P=perfil=prever(cfg),bancas={};
  API().todas().forEach(function(x){var b=bancaDe(x.q);bancas[b]=(bancas[b]||0)+1});
  var seg=cfg.modo==='tempo'?60:cfg.seg,ns=[10,20,30,40,60].filter(function(n){return n<=Math.max(10,P.total)});
  if(ns.indexOf(cfg.n)<0)cfg.n=ns[Math.min(1,ns.length-1)];
  var dur=fmtDur(P.n*seg/60);
  var sel=cs.find(function(x){return x.id===cfg.concurso});
  var emb=sel&&window.nexoTurmas&&window.nexoTurmas.escudo?window.nexoTurmas.escudo(sel.id):'';
  var H=P.H,taxa=H.tot?Math.round(H.ok/H.tot*100):null;
  var nenhum=!P.total;
  return '<div class="nx-page sa"><div class="sa-hero"><div><span class="sa-eyebrow">'+svg('raio',14)+' Simulado inteligente</span><h1>Simulado adaptativo</h1><p>A prova se monta com o seu histórico e se ajusta a cada bloco de '+BLK+' questões. A correção só aparece quando você entrega.</p></div></div>'
  +'<div class="sa-grid"><section class="sa-card sa-cfg"><h2>'+svg('engrenagem',20)+' Configuração do simulado</h2>'
  +'<div class="sa-f"><label for="sa-conc">Concurso selecionado</label><div class="sa-sel sa-conc"><span class="sa-emb">'+(emb||'<i></i>')+'</span><select id="sa-conc" data-sa="cfg" data-k="concurso" aria-label="Concurso selecionado">'
   +(cs.length?cs.map(function(c){return '<option value="'+esc(c.id)+'"'+(c.id===cfg.concurso?' selected':'')+'>'+esc(c.nome)+' – '+esc(c.cargoNome)+'</option>'}).join(''):'<option value="">Todas as disciplinas disponíveis</option>')+'</select></div>'
   +(sel&&!escopo(cfg)?'<small class="sa-nota">O programa deste concurso ainda não foi cadastrado: o simulado usa todas as disciplinas com questões.</small>':'')+'</div>'
  +'<div class="sa-f"><label for="sa-banca">Banca organizadora</label><div class="sa-sel"><select id="sa-banca" data-sa="cfg" data-k="banca" aria-label="Banca organizadora"><option value="">Todas as bancas ('+API().todas().length+')</option>'
   +Object.keys(bancas).sort(function(a,b){return bancas[b]-bancas[a]}).map(function(b){return '<option value="'+esc(b)+'"'+(b===cfg.banca?' selected':'')+'>'+esc(b)+' ('+bancas[b]+')</option>'}).join('')+'</select></div></div>'
  +'<div class="sa-duo"><div class="sa-f"><label for="sa-n">Quantidade de questões</label><div class="sa-sel"><span class="sa-si">'+svg('camadas',18)+'</span><select id="sa-n" data-sa="cfg" data-k="n" aria-label="Quantidade de questões">'+ns.map(function(n){return '<option value="'+n+'"'+(+cfg.n===n?' selected':'')+'>'+n+'</option>'}).join('')+'</select></div></div>'
   +'<div class="sa-f"><label for="sa-seg">Duração estimada</label><div class="sa-sel"><span class="sa-si">'+svg('relogio',18)+'</span><select id="sa-seg" data-sa="cfg" data-k="seg" aria-label="Duração estimada"'+(cfg.modo==='tempo'?' disabled':'')+'>'+[60,90,120].map(function(s){return '<option value="'+s+'"'+(seg===s?' selected':'')+'>'+fmtDur(P.n*s/60)+' · '+(s===90?'1 min 30 s':s===60?'1 min':'2 min')+' por questão</option>'}).join('')+'</select></div></div></div>'
  +'<div class="sa-f"><label>Modo do simulado</label><div class="sa-modos" role="radiogroup" aria-label="Modo do simulado">'+MODOS.map(function(m){return '<button type="button" role="radio" aria-checked="'+(cfg.modo===m.id)+'" class="sa-modo'+(cfg.modo===m.id?' on':'')+'" data-sa="modo" data-v="'+m.id+'"><span>'+svg(m.i,22)+'</span><b>'+esc(m.t)+'</b><small>'+esc(m.d)+'</small></button>'}).join('')+'</div></div>'
  +'<div class="sa-cta"><button type="button" class="sa-go" data-sa="iniciar"'+(nenhum?' disabled':'')+'>'+svg('play',16)+' Iniciar simulado adaptativo '+svg('seta',16)+'</button><button type="button" class="sa-novo" data-sa="novo">'+svg('refazer',16)+' Gerar novo perfil</button><small>Recalcula a distribuição com o seu desempenho mais recente.</small></div></section>'
  +'<section class="sa-card sa-perfil" id="sa-perfil" aria-live="polite">'
   +(nenhum?'<div class="sa-vazio"><b>Sem questões para esses filtros.</b><span>Escolha outra banca ou outro concurso.</span></div>':
    '<div class="sa-kpis"><div><small>Tempo por questão</small><b>'+(seg>=90?(seg===90?'1 min 30 s':'2 min'):'1 min')+'</b></div><div><small>Duração total</small><b>'+dur+'</b></div><div><small>Seu acerto geral</small><b>'+(taxa==null?'—':taxa+'%')+'</b></div><div><small>Erros pendentes</small><b>'+H.nPend+'</b></div></div>'
    +'<h3>Distribuição prevista</h3><div class="sa-dist">'+donut(P.disc,P.n)+'<ul>'+P.disc.map(function(x){return '<li><i style="background:'+x.cor+'"></i><span>'+esc(x.d)+'</span><b>'+Math.round(x.n/P.n*100)+'% <em>('+x.n+')</em></b></li>'}).join('')+'</ul></div>'
    +'<h3>Assuntos mais cobrados nesta prova</h3><ol class="sa-top">'+P.top.map(function(m,i){var pc=Math.round(m.e/P.n*100);return '<li><span class="sa-n">'+(i+1)+'</span><span class="sa-tt">'+esc(m.t)+'<small>'+esc(m.d)+'</small></span><span class="sa-bar"><i style="width:'+Math.min(100,pc*3)+'%"></i></span><b>'+pc+'%</b></li>'}).join('')+'</ol>'
    +(P.fracos.length?'<h3>Seus pontos mais fracos</h3><ul class="sa-fracos">'+P.fracos.map(function(f){return '<li><span>'+esc(f.t)+'</span><b>'+f.taxa+'% de erro <em>em '+f.n+' respostas</em></b></li>'}).join('')+'</ul>':'<p class="sa-nota">Ainda não há histórico suficiente. O simulado começa equilibrado e passa a se ajustar a partir do primeiro bloco.</p>')
    +'<p class="sa-nota">'+svg('raio',13)+' Ajuste adaptativo: a cada '+BLK+' questões, o próximo bloco é recalculado com os seus acertos neste simulado.</p>')
  +'</section></div>'
  +'<section class="sa-card sa-hist-card"><h2>Seus últimos simulados</h2>'+historicoHtml()+'</section></div>';
}
function mostrarConfig(){
  clearInterval(tick);
  try{if(typeof closeMobileNav==='function')closeMobileNav()}catch(e){}
  try{current='simulado'}catch(e){}
  try{renderNav()}catch(e){}
  var h=document.getElementById('head');if(h)h.textContent='Simulado';
  V().innerHTML=configHtml();V().scrollTop=0;
}

/* ---------- prova ---------- */
function iniciar(){
  var cfg=cfgLer();sv(KC,cfg);
  var H=historico(),p=pool(cfg),n=Math.min(cfg.n,p.length);if(!n)return;
  var seg=cfg.modo==='tempo'?60:cfg.seg;
  S={cfg:cfg,pool:p,n:n,seg:seg,itens:[],marc:{},flag:{},ms:{},cur:0,inicio:Date.now(),fim:0,blocos:[],H:H,t0:Date.now(),aviso:''};
  proximoBloco(true);
  desenhar();
}
function extraDoTeste(){
  var ex={};S.itens.forEach(function(x,i){var r=S.marc[i];if(!r)return;var e=ex[x.m.id]=ex[x.m.id]||{n:0,err:0};e.n++;if(r!==x.q.answer)e.err++});return ex;
}
function proximoBloco(primeiro){
  var feitos={};S.itens.forEach(function(x){feitos[x.skey]=1});
  var resto=S.pool.filter(function(x){return !feitos[x.skey]}),k=Math.min(BLK,S.n-S.itens.length,resto.length);
  if(k<=0)return false;
  var ex=primeiro?null:extraDoTeste(),blk=sortear(resto,k,S.cfg,S.H,ex,semente*7+S.itens.length+1);
  var cont={};blk.forEach(function(x){var d=discDe(x.m);cont[d]=(cont[d]||0)+1});
  S.blocos.push({ini:S.itens.length,k:blk.length,cont:cont});
  S.itens=S.itens.concat(blk);
  if(!primeiro){
    var prev=S.blocos[S.blocos.length-2].cont,mais=Object.keys(cont).sort(function(a,b){return cont[b]-cont[a]})[0];
    S.aviso='Bloco '+S.blocos.length+' ajustado ao seu desempenho: mais questões de '+mais+'.';
  }
  return true;
}
function blocoDe(i){for(var b=0;b<S.blocos.length;b++){var x=S.blocos[b];if(i>=x.ini&&i<x.ini+x.k)return b}return 0}
function nBlocos(){return Math.ceil(S.n/BLK)}
function acumula(){if(S&&S.itens[S.cur]){S.ms[S.cur]=(S.ms[S.cur]||0)+(Date.now()-S.t0)}S.t0=Date.now()}
function irPara(i){
  if(!S||S.fim)return;acumula();
  if(i>=S.itens.length){if(S.itens.length<S.n){proximoBloco(false)}else{return pedirEntrega()}}
  if(i<0||i>=S.itens.length)return;
  S.cur=i;desenhar();
}
function respondidas(){return Object.keys(S.marc).length}
function navHtml(){
  var out='';
  for(var i=0;i<S.n;i++){
    var gerada=i<S.itens.length,cls='sa-nv'+(i===S.cur?' cur':'')+(gerada&&S.marc[i]?' ok':'')+(S.flag[i]?' fl':'')+(gerada?'':' lock');
    out+='<button type="button" class="'+cls+'" data-sa="ir" data-i="'+i+'"'+(gerada?'':' disabled')+' aria-label="Questão '+(i+1)+(S.marc[i]?', respondida':'')+(S.flag[i]?', marcada para revisão':'')+'">'+(i+1)+'</button>';
  }
  return out;
}
function desenhar(){
  if(!S)return;
  var x=S.itens[S.cur],i=S.cur,b=blocoDe(i),blk=S.blocos[b],resp=respondidas(),ultimo=i===S.n-1;
  var tempoTotal=S.n*S.seg*1000,rest=tempoTotal-(Date.now()-S.inicio);
  var ops=x.q.options.map(function(o,j){var L='ABCDE'[j],on=S.marc[i]===L;return '<button type="button" class="sa-op'+(on?' on':'')+'" data-sa="resp" data-l="'+L+'" role="radio" aria-checked="'+on+'"><span class="sa-let">'+L+'</span><span class="sa-opt">'+o+'</span></button>'}).join('');
  var disc=discDe(x.m);
  V().innerHTML='<div class="nx-page sa sa-run"><div class="sa-bar-top"><div class="sa-bt-l"><b>Simulado adaptativo</b><span>Questão '+(i+1)+' de '+S.n+' · Bloco '+(b+1)+' de '+nBlocos()+'</span></div>'
   +'<div class="sa-bt-r"><span class="sa-tmp'+(S.cfg.modo==='tempo'&&rest<300000?' alerta':'')+'" id="sa-tempo" title="'+(S.cfg.modo==='tempo'?'Tempo restante':'Tempo decorrido')+'">'+svg('relogio',16)+'<span id="sa-tv">'+(S.cfg.modo==='tempo'?fmtT(rest):fmtT(Date.now()-S.inicio))+'</span></span><button type="button" class="sa-ent" data-sa="entregar">Entregar</button></div></div>'
   +'<div class="sa-prog"><i style="width:'+Math.round(resp/S.n*100)+'%"></i></div>'
   +'<div class="sa-run-g"><div class="sa-q">'+(S.aviso&&i===blk.ini?'<div class="sa-aviso">'+svg('raio',15)+' '+esc(S.aviso)+'</div>':'')
   +'<div class="sa-meta"><span class="sa-pill" style="--c:'+corDe(disc)+'">'+esc(disc)+'</span><span>'+esc(x.m.title)+'</span><span>'+esc(bancaDe(x.q))+'</span></div>'
   +'<div class="sa-enun">'+x.q.text+'</div><div class="sa-ops" role="radiogroup" aria-label="Alternativas">'+ops+'</div>'
   +'<div class="sa-acoes"><button type="button" class="sa-flag'+(S.flag[i]?' on':'')+'" data-sa="flag" aria-pressed="'+!!S.flag[i]+'">'+svg('bandeira',16)+' '+(S.flag[i]?'Marcada para revisão':'Marcar para revisão')+'</button>'
   +(S.marc[i]?'<button type="button" class="sa-limpa" data-sa="limpar">Limpar resposta</button>':'')+'</div>'
   +'<div class="sa-nav"><button type="button" class="sa-ant" data-sa="ir" data-i="'+(i-1)+'"'+(i===0?' disabled':'')+'>← Anterior</button><button type="button" class="sa-prox" data-sa="ir" data-i="'+(i+1)+'">'+(ultimo?'Revisar e entregar':(i+1>=S.itens.length?'Próximo bloco':'Próxima')+' →')+'</button></div></div>'
   +'<div class="sa-lado"><div class="sa-card sa-mapa"><h3>Mapa da prova</h3><div class="sa-nvs">'+navHtml()+'</div><div class="sa-leg"><span><i class="ok"></i>Respondida</span><span><i class="fl"></i>Revisar</span><span><i class="lock"></i>Próximo bloco</span></div>'
   +'<p class="sa-nota">'+resp+' de '+S.n+' respondidas. As questões dos próximos blocos são definidas conforme o seu desempenho.</p></div></div></div></div>';
  V().scrollTop=0;
  clearInterval(tick);
  tick=setInterval(function(){
    var el=document.getElementById('sa-tv');if(!el||!S||S.fim){clearInterval(tick);return}
    var r=S.n*S.seg*1000-(Date.now()-S.inicio);
    if(S.cfg.modo==='tempo'){el.textContent=fmtT(r);if(r<300000)el.parentNode.classList.add('alerta');if(r<=0){clearInterval(tick);entregar(true)}}
    else el.textContent=fmtT(Date.now()-S.inicio);
  },1000);
}
function modal(html){
  var m=document.getElementById('sa-modal');if(m)m.remove();
  m=document.createElement('div');m.id='sa-modal';m.className='sa-modal';m.innerHTML='<div class="sa-md" role="dialog" aria-modal="true">'+html+'</div>';document.body.appendChild(m);
}
function pedirEntrega(){
  acumula();
  var falta=S.n-respondidas(),fl=Object.keys(S.flag).filter(function(k){return S.flag[k]}).length;
  modal('<h2>Entregar o simulado?</h2><p>'+(falta?'Você deixou <b>'+falta+'</b> '+(falta===1?'questão':'questões')+' em branco'+(S.itens.length<S.n?' (incluindo as dos blocos que ainda não abriram)':'')+'.':'Você respondeu todas as questões.')+(fl?' Há <b>'+fl+'</b> marcada'+(fl>1?'s':'')+' para revisão.':'')+'</p><div class="sa-md-a"><button type="button" class="sa-go small" data-sa="confirmar">Entregar agora</button><button type="button" class="sa-novo" data-sa="fechar">Continuar a prova</button></div>');
}
function entregar(auto){
  if(!S||S.fim)return;acumula();
  var m=document.getElementById('sa-modal');if(m)m.remove();
  clearInterval(tick);S.fim=Date.now();
  var ac=0,resp=0,porD={},porM={};
  S.itens.forEach(function(x,i){
    var L=S.marc[i]||null;x.resp=L;
    var d=discDe(x.m),pd=porD[d]=porD[d]||{n:0,ac:0,er:0,br:0};pd.n++;
    var pm=porM[x.m.id]=porM[x.m.id]||{t:x.m.title,n:0,er:0,id:x.m.id};pm.n++;
    if(!L){pd.br++;return}
    resp++;var ok=L===x.q.answer;if(ok){ac++;pd.ac++}else{pd.er++;pm.er++}
    try{savePracticeAnswer(x.skey,ok,L)}catch(e){}
    try{if(window.nexoRegistrar)window.nexoRegistrar({k:'q',m:x.m.id,ok:ok})}catch(e){}
  });
  var h=ls(KH,[]);h=Array.isArray(h)?h:[];var ant=h.length?h[h.length-1]:null;
  var reg={t:S.fim,n:S.itens.length,ac:ac,resp:resp,ms:S.fim-S.inicio,modo:S.cfg.modo,auto:!!auto};
  h.push(reg);sv(KH,h.slice(-30));
  S.res={ac:ac,resp:resp,porD:porD,porM:porM,ant:ant,filtro:'todas'};
  resultado();
}
function resultado(){
  var R=S.res,n=S.itens.length,pc=Math.round(R.ac/n*100),erros=R.resp-R.ac,br=n-R.resp,ms=S.fim-S.inicio,med=Math.round(ms/n/1000);
  var C=2*Math.PI*52,dash=C*pc/100;
  var disc=Object.keys(R.porD).map(function(d,i){return {d:d,v:R.porD[d],cor:corDe(d,i)}}).sort(function(a,b){return b.v.n-a.v.n});
  var piores=Object.keys(R.porM).map(function(k){return R.porM[k]}).filter(function(m){return m.er>0}).sort(function(a,b){return b.er-a.er}).slice(0,5);
  var ant=R.ant?Math.round(R.ant.ac/Math.max(1,R.ant.n)*100):null;
  try{document.getElementById('head').textContent='Resultado do simulado'}catch(e){}
  var lista=S.itens.map(function(x,i){return {x:x,i:i}}).filter(function(o){var L=o.x.resp,ok=L===o.x.q.answer;return R.filtro==='todas'||(R.filtro==='erradas'&&L&&!ok)||(R.filtro==='branco'&&!L)||(R.filtro==='marcadas'&&S.flag[o.i])});
  V().innerHTML='<div class="nx-page sa sa-res"><div class="sa-hero"><div><span class="sa-eyebrow">'+svg('check',14)+' Simulado entregue</span><h1>Resultado do simulado</h1><p>As questões erradas já foram para o caderno de erros e entraram no seu desempenho.</p></div></div>'
  +'<div class="sa-res-top"><section class="sa-card sa-score"><div class="sa-anel"><svg viewBox="0 0 120 120" width="150" height="150" aria-hidden="true"><defs><linearGradient id="saG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7ae8c3"/><stop offset="1" stop-color="#2aa57f"/></linearGradient></defs><circle cx="60" cy="60" r="52" fill="none" stroke="currentColor" stroke-opacity=".12" stroke-width="11"/><circle cx="60" cy="60" r="52" fill="none" stroke="url(#saG)" stroke-width="11" stroke-linecap="round" stroke-dasharray="'+dash+' '+C+'" transform="rotate(-90 60 60)"/></svg><div><b>'+pc+'<i>%</i></b><span>de acerto</span></div></div>'
   +'<div class="sa-score-d"><b>'+R.ac+' de '+n+' acertos</b>'+(ant==null?'<small>Primeiro simulado registrado. Os próximos serão comparados com este.</small>':'<small class="'+(pc>=ant?'up':'down')+'">'+(pc>=ant?'▲ +':'▼ ')+(pc-ant)+' pontos em relação ao simulado anterior ('+ant+'%)</small>')+'</div></section>'
   +'<section class="sa-card sa-kp2"><div><small>Acertos</small><b class="g">'+R.ac+'</b></div><div><small>Erros</small><b class="r">'+erros+'</b></div><div><small>Em branco</small><b>'+br+'</b></div><div><small>Tempo total</small><b>'+fmtT(ms)+'</b></div><div><small>Média por questão</small><b>'+med+' s</b><em>planejado '+S.seg+' s</em></div><div><small>Modo</small><b class="s">'+esc((MODOS.find(function(m){return m.id===S.cfg.modo})||{}).t)+'</b></div></section></div>'
  +'<div class="sa-res-g"><section class="sa-card"><h2>Desempenho por disciplina</h2><ul class="sa-pd">'+disc.map(function(o){var v=o.v,p=Math.round(v.ac/v.n*100);return '<li><span class="sa-pdn"><i style="background:'+o.cor+'"></i>'+esc(o.d)+'</span><span class="sa-bar"><i style="width:'+p+'%;background:'+o.cor+'"></i></span><b>'+v.ac+'/'+v.n+' <em>'+p+'%</em></b></li>'}).join('')+'</ul></section>'
  +'<section class="sa-card"><h2>Onde reforçar</h2>'+(piores.length?'<ul class="sa-ref">'+piores.map(function(m){return '<li><span>'+esc(m.t)+'<small>'+m.er+' '+(m.er===1?'erro':'erros')+' de '+m.n+'</small></span><button type="button" class="sa-mini" data-sa="praticar" data-m="'+esc(m.id)+'">Praticar</button></li>'}).join('')+'</ul>':'<p class="sa-vazio">Nenhum erro neste simulado. Bom trabalho!</p>')+'</section></div>'
  +'<div class="sa-cta sa-cta-r"><button type="button" class="sa-go" data-sa="outro">'+svg('refazer',16)+' Novo simulado</button><button type="button" class="sa-novo" data-sa="erros">Ir ao caderno de erros</button></div>'
  +'<section class="sa-card"><div class="sa-rev-h"><h2>Revisão das questões</h2><div class="sa-fil" role="tablist">'+[['todas','Todas'],['erradas','Erradas'],['branco','Em branco'],['marcadas','Marcadas']].map(function(f){return '<button type="button" class="'+(R.filtro===f[0]?'on':'')+'" data-sa="filtro" data-v="'+f[0]+'">'+f[1]+'</button>'}).join('')+'</div></div>'
  +(lista.length?lista.map(function(o){return revCard(o.x,o.i)}).join(''):'<p class="sa-vazio">Nenhuma questão neste filtro.</p>')+'</section></div>';
  V().scrollTop=0;
}
function revCard(x,i){
  var L=x.resp,ok=L===x.q.answer,est=!L?'br':ok?'ok':'er';
  var ops=x.q.options.map(function(o,j){var l='ABCDE'[j],c=l===x.q.answer?' certo':(l===L?' errado':'');return '<div class="sa-op rv'+c+'"><span class="sa-let">'+l+'</span><span class="sa-opt">'+o+'</span></div>'}).join('');
  return '<article class="sa-rc '+est+'"><div class="sa-meta"><b>'+(i+1)+'.</b><span class="sa-pill" style="--c:'+corDe(discDe(x.m))+'">'+esc(discDe(x.m))+'</span><span>'+esc(x.m.title)+'</span><span class="sa-st">'+(!L?'Em branco · gabarito '+x.q.answer:ok?'Acertou':'Errou · você marcou '+L+' · gabarito '+x.q.answer)+'</span></div><div class="sa-enun">'+x.q.text+'</div><div class="sa-ops">'+ops+'</div>'+(x.q.comment?'<details class="sa-com"><summary>Ver comentário</summary><p>'+esc(txt(x.q.comment))+'</p></details>':'')+'</article>';
}

/* ---------- eventos ---------- */
function repintaPerfil(){var c=document.querySelector('.sa-cfg');if(!c)return;var y=V().scrollTop;V().innerHTML=configHtml();V().scrollTop=y}
document.addEventListener('change',function(e){
  var t=e.target;if(!t||!t.dataset||t.dataset.sa!=='cfg')return;
  var c=cfgLer();c[t.dataset.k]=t.dataset.k==='n'||t.dataset.k==='seg'?+t.value:t.value;sv(KC,c);repintaPerfil();
});
document.addEventListener('keydown',function(e){
  if(!S||S.fim||!document.querySelector('.sa-run')||document.getElementById('sa-modal'))return;
  if(e.target&&/input|select|textarea/i.test(e.target.tagName))return;
  var k=e.key.toUpperCase();
  if('ABCDE'.indexOf(k)>=0&&k.length===1&&S.itens[S.cur]&&'ABCDE'.indexOf(k)<S.itens[S.cur].q.options.length){S.marc[S.cur]=k;desenhar()}
  else if(e.key==='ArrowRight')irPara(S.cur+1);else if(e.key==='ArrowLeft')irPara(S.cur-1);
});
document.addEventListener('click',function(e){
  var b=e.target.closest&&e.target.closest('[data-sa]');if(!b||b.dataset.sa==='cfg')return;
  var a=b.dataset.sa;
  if(a==='modo'){var c=cfgLer();c.modo=b.dataset.v;sv(KC,c);repintaPerfil();return}
  if(a==='novo'){semente++;repintaPerfil();return}
  if(a==='iniciar'){iniciar();return}
  if(a==='fechar'){var m=document.getElementById('sa-modal');if(m)m.remove();return}
  if(a==='confirmar'){entregar(false);return}
  if(a==='outro'){S=null;mostrarConfig();return}
  if(a==='erros'){if(window.nexoCadernoErros)window.nexoCadernoErros();return}
  if(a==='praticar'){if(window.nexoPraticar)window.nexoPraticar({mod:b.dataset.m,status:'unsolved'});return}
  if(a==='filtro'){if(S&&S.res){S.res.filtro=b.dataset.v;resultado()}return}
  if(!S||S.fim)return;
  if(a==='ir'){irPara(+b.dataset.i);return}
  if(a==='resp'){S.marc[S.cur]=b.dataset.l;desenhar();return}
  if(a==='limpar'){delete S.marc[S.cur];desenhar();return}
  if(a==='flag'){S.flag[S.cur]=!S.flag[S.cur];desenhar();return}
  if(a==='entregar'){pedirEntrega();return}
});
window.nexoSimuladoClassico=window.nexoSimulado;
window.nexoSimulado=function(){if(S&&!S.fim&&S.itens.length){try{current='simulado';renderNav()}catch(e){}return desenhar()}if(S&&S.fim&&S.res){try{current='simulado'}catch(e){}return resultado()}mostrarConfig()};
window.nexoSimuladoAdaptativo={prever:function(c){return prever(Object.assign(cfgLer(),c||{}))}};
})();
