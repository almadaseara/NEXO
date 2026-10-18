// NEXO — source-resolver (v14). Antes só existia no Supabase (v13); agora versionado aqui.
// Modos (POST, cabeçalho x-nexo-cron):
//   {}                          resolve a fila source_resolution_queue (Cebraspe pela API oficial; FGV pelo registro oficial)
//   {mode:"discover_cebraspe"}  varre todos os concursos policiais da API oficial do Cebraspe e cria as fontes
//                               (prova objetiva + gabarito definitivo), sem depender de site espelho.
// Mudanças da v14: sem QConcursos (site comercial, não é fonte oficial); getCebraspeDetail não chama mais a si
// mesma; pareamento prova↔gabarito genérico (cebraspe.ts); janela de anos vem de nexo_year_window.
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { isPoliceEvent, pairCebraspeFiles, slug } from "./cebraspe.ts";

const db=createClient(Deno.env.get("SUPABASE_URL")!,Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
const UA="Mozilla/5.0 (compatible; NEXO-SourceResolver/1.1; +https://almadaseara.github.io/NEXO/)";

function clean(s:any){return String(s||"").replace(/\s+/g," ").trim();}
function stateFromText(s:string){
  const t=slug(s);
  const names:any={
    "acre":"ac","alagoas":"al","amapa":"ap","amazonas":"am","bahia":"ba","ceara":"ce",
    "distrito-federal":"df","espirito-santo":"es","goias":"go","maranhao":"ma",
    "mato-grosso":"mt","mato-grosso-do-sul":"ms","minas-gerais":"mg","para":"pa",
    "paraiba":"pb","parana":"pr","pernambuco":"pe","piaui":"pi","rio-de-janeiro":"rj",
    "rio-grande-do-norte":"rn","rio-grande-do-sul":"rs","rondonia":"ro","roraima":"rr",
    "santa-catarina":"sc","sao-paulo":"sp","sergipe":"se","tocantins":"to"
  };
  for(const [k,v] of Object.entries(names)) if(t.includes(k)) return v as string;
  const m=t.match(/(?:policia-civil|pc|policia-militar|pm)-([a-z]{2})(?:-|$)/);
  return m?m[1]:null;
}
function officialSearchCandidates(src:any){
  const board=clean(src.board).toUpperCase();
  const out:{provider_key:string,url:string}[]=[];
  if(/FGV/.test(board)) out.push({provider_key:"official_board",url:"https://conhecimento.fgv.br/concursos"});
  else if(/CEBRASPE|CESPE/.test(board)) out.push({provider_key:"official_board",url:"https://www.cebraspe.org.br/concursos/"});
  else if(/VUNESP/.test(board)) out.push({provider_key:"official_board",url:"https://www.vunesp.com.br/"});
  else if(/AOCP/.test(board)) out.push({provider_key:"official_board",url:"https://www.institutoaocp.org.br/concursos"});
  return out;
}
async function auth(req:Request){
  const token=req.headers.get("x-nexo-cron")||"";
  const {data,error}=await db.rpc("validate_collector_token",{p_token:token});
  return !error&&data===true;
}
async function fetchPage(url:string){
  const r=await fetch(url,{headers:{"user-agent":UA,"accept-language":"pt-BR,pt;q=0.9"}});
  const text=await r.text();
  return {status:r.status,text};
}
function norm(s:string){
  return slug(s).replace(/\b(de|da|do|das|dos|e|para|cargo|area|policia)\b/g," ").replace(/\s+/g," ").trim();
}
function tokenSet(s:string){
  return new Set(norm(s).split(/[ -]+/).filter(x=>x.length>2));
}
function overlapScore(a:string,b:string){
  const A=tokenSet(a),B=tokenSet(b);
  if(!A.size||!B.size) return 0;
  let hit=0; for(const x of A) if(B.has(x)) hit++;
  return hit/Math.max(1,Math.min(A.size,B.size));
}
function eventHint(src:any){
  const t=slug([src.exam_name,src.institution,src.source_page_url].filter(Boolean).join(" "));
  const yy=String(src.year||"").slice(-2);
  if(t.includes("policia-federal")) return "PF_"+yy;
  const st=stateFromText(t);
  if(st&&t.includes("policia-civil")) return "PC_"+st.toUpperCase()+"_"+yy;
  if(st&&t.includes("policia-militar")) return "PM_"+st.toUpperCase()+"_"+yy;
  return null;
}
async function fetchJson(url:string){
  const r=await fetch(url,{headers:{"user-agent":UA,"accept":"application/json"}});
  if(!r.ok) throw new Error("HTTP "+r.status+" "+url);
  return await r.json();
}
let cebraspeEventsCache:any[]|null=null;
const cebraspeDetailCache=new Map<string,any>();
async function getCebraspeEvents():Promise<any[]>{
  if(cebraspeEventsCache) return cebraspeEventsCache;
  const groups=await fetchJson("https://apis.cebraspe.org.br/cebraspe/eventos/tipo/concursos/");
  const events:any[]=(groups||[]).flatMap((g:any)=>g.eventos||[]);
  cebraspeEventsCache=events;
  return events;
}
async function getCebraspeDetail(identifier:string){
  if(cebraspeDetailCache.has(identifier)) return cebraspeDetailCache.get(identifier);
  const detail=await fetchJson("https://apis.cebraspe.org.br/cebraspe/eventos/"+encodeURIComponent(identifier));
  cebraspeDetailCache.set(identifier,detail);
  return detail;
}
async function yearWindow(){
  const {data}=await db.rpc("nexo_year_window");
  const w=Array.isArray(data)?data[0]:data;
  return {min:Number(w?.year_min||2018),max:Number(w?.year_max||new Date().getUTCFullYear()+1)};
}

// Cria (se ainda não existir) a fonte oficial de um par prova↔gabarito do Cebraspe.
async function upsertCebraspePair(detail:any,identifier:string,pair:any,base:any){
  const eventPage="https://www.cebraspe.org.br/concursos/"+identifier;
  const synthetic=eventPage+"#nexo-"+pair.key;
  const {data:existingByUrl}=await db.from("exam_sources").select("id").eq("source_page_url",synthetic).maybeSingle();
  if(existingByUrl) return {id:existingByUrl.id,created:false};
  const {data:existingByPair}=await db.from("exam_sources").select("id").eq("exam_pdf_url",pair.exam).eq("answer_key_pdf_url",pair.answer).limit(1).maybeSingle();
  if(existingByPair) return {id:existingByPair.id,created:false};
  const shared=/CONHECIMENTOS (B[AÁ]SICOS|GERAIS|COMPLEMENTARES)|BLOCO|L[IÍ]NGUA/i.test(pair.label);
  const row:any={
    source_page_url:synthetic,provider:"CEBRASPE OFICIAL",career:base.career||null,board:"CEBRASPE",
    year:Number(detail.eventoAno||base.year)||null,institution:clean(detail.eventoNomeCompleto)||base.institution||null,
    role_name:shared?"Bloco comum do concurso":pair.label,
    exam_name:clean(detail.eventoNomeAbreviado||identifier)+" — "+pair.label,
    booklet_type:pair.key,exam_pdf_url:pair.exam,answer_key_pdf_url:pair.answer,
    status:"queued",last_error:null,next_attempt_at:null,updated_at:new Date().toISOString(),
    raw_metadata:{official_provider:"cebraspe",official_event:identifier,parent_source_id:base.id||null,part_key:pair.key,
      shared_block:shared,exam_description:pair.exam_desc,answer_description:pair.key_desc,discovered_by:"source-resolver v14"}
  };
  const {data,error}=await db.from("exam_sources").insert(row).select("id").single();
  if(error) throw new Error("insert exam_sources: "+error.message);
  return {id:data.id,created:true};
}

async function resolveCebraspe(item:any,src:any){
  if(!/CEBRASPE|CESPE/i.test(clean(src.board))) return null;
  const events=await getCebraspeEvents();
  const hint=eventHint(src);
  let ev=hint?events.find((e:any)=>String(e.eventoURL||"").toUpperCase()===hint.toUpperCase()):null;
  if(!ev){
    let best:any=null;
    for(const e of events){
      if(Number(e.eventoAno)!==Number(src.year)) continue;
      const score=overlapScore(clean(src.exam_name||src.institution||""),clean(e.eventoNomeAbreviado||""));
      if(!best||score>best.score) best={score,e};
    }
    if(best&&best.score>=0.5) ev=best.e;
  }
  if(!ev) return {resolved:false,reason:"cebraspe_event_not_matched"};
  const identifier=String(ev.eventoURL);
  const detail=await getCebraspeDetail(identifier);
  const pairs=pairCebraspeFiles(detail?.arquivosGabarito||[],identifier);
  const eventPage="https://www.cebraspe.org.br/concursos/"+identifier;
  await db.rpc("enqueue_resolution_candidate",{
    p_source_id:src.id,p_provider_key:"official_board",p_candidate_url:eventPage,
    p_candidate_kind:"exam_page",p_confidence:0.99,
    p_evidence:{provider:"CEBRASPE",identifier,pairs:pairs.length}
  });
  let matchedParts=0,newQueuedParts=0;
  for(const pair of pairs){
    const r=await upsertCebraspePair(detail,identifier,pair,src);
    matchedParts++; if(r.created) newQueuedParts++;
    await db.rpc("enqueue_resolution_candidate",{
      p_source_id:src.id,p_provider_key:"official_board",p_candidate_url:pair.exam,
      p_candidate_kind:"exam_pdf",p_confidence:1.0,p_evidence:{identifier,part:pair.key}
    });
    await db.rpc("enqueue_resolution_candidate",{
      p_source_id:src.id,p_provider_key:"official_board",p_candidate_url:pair.answer,
      p_candidate_kind:"answer_key_pdf",p_confidence:1.0,p_evidence:{identifier,part:pair.key}
    });
  }
  return {resolved:matchedParts>0,provider:"official_board",url:eventPage,matched_parts:matchedParts,new_queued_parts:newQueuedParts,identifier};
}

// Varredura completa da API oficial: todos os concursos policiais dentro da janela de anos.
async function discoverCebraspe(limitEvents:number){
  const win=await yearWindow();
  const events=(await getCebraspeEvents())
    .filter((e:any)=>isPoliceEvent(e))
    .filter((e:any)=>Number(e.eventoAno)>=win.min&&Number(e.eventoAno)<=win.max)
    .sort((a:any,b:any)=>Number(b.eventoAno)-Number(a.eventoAno));
  let scanned=0,pairs=0,created=0;const errors:string[]=[];const perEvent:any[]=[];
  for(const ev of events.slice(0,limitEvents)){
    const identifier=String(ev.eventoURL);
    try{
      const detail=await getCebraspeDetail(identifier);
      const ps=pairCebraspeFiles(detail?.arquivosGabarito||[],identifier);
      scanned++;pairs+=ps.length;
      let c=0;
      for(const p of ps){const r=await upsertCebraspePair(detail,identifier,p,{year:ev.eventoAno});if(r.created){c++;created++;}}
      perEvent.push({identifier,year:ev.eventoAno,pairs:ps.length,created:c});
    }catch(e){errors.push(identifier+": "+String(e));}
  }
  let collector_handoff:any=null;
  if(created>0){
    const {data:requestId,error}=await db.rpc("enqueue_official_question_collector");
    collector_handoff=error?{status:"error",error:error.message}:{status:"queued",request_id:requestId};
  }
  return {status:"success",mode:"discover_cebraspe",year_window:`${win.min}-${win.max}`,police_events:events.length,scanned,pairs,created,collector_handoff,errors,events:perEvent};
}

function stripTags(html:string){
  return html.replace(/<script[\s\S]*?<\/script>/gi," ")
    .replace(/<style[\s\S]*?<\/style>/gi," ")
    .replace(/<[^>]+>/g," ")
    .replace(/&nbsp;/gi," ").replace(/&amp;/gi,"&")
    .replace(/&#39;/g,"'").replace(/&quot;/g,'"')
    .replace(/\s+/g," ").trim();
}
function absolute(base:string,href:string){
  try{return new URL(href.replace(/&amp;/g,"&"),base).toString()}catch{return ""}
}
let fgvRegistryCache:any[]|null=null;
async function getFgvRegistry(){
  if(fgvRegistryCache) return fgvRegistryCache;
  const {data,error}=await db.from("official_event_registry").select("*").eq("active",true).eq("board","FGV");
  if(error) throw error;
  fgvRegistryCache=data||[];
  return fgvRegistryCache;
}
async function resolveFgv(item:any,src:any){
  if(!/^FGV$/i.test(clean(src.board))) return null;
  const registry=await getFgvRegistry();
  const institutionText=clean([src.institution,src.exam_name,src.source_page_url].filter(Boolean).join(" ")).toLowerCase();
  const examText=clean(src.exam_name||src.role_name||"").toLowerCase();
  const row=registry.find((r:any)=>{
    if(Number(src.year)<Number(r.year_from)||Number(src.year)>Number(r.year_to)) return false;
    try{
      const instOk=!r.institution_pattern||new RegExp(r.institution_pattern,"i").test(institutionText);
      const examOk=!r.exam_pattern||new RegExp(r.exam_pattern,"i").test(examText);
      return instOk&&examOk;
    }catch{return false}
  });
  if(!row) return {resolved:false,reason:"fgv_registry_not_matched"};

  const page=await fetchPage(row.event_url);
  if(page.status!==200) return {resolved:false,reason:"fgv_page_http_"+page.status,url:row.event_url};
  const html=page.text;
  const anchors=[...html.matchAll(/<a[^>]+href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m:any)=>({href:absolute(row.event_url,m[1]),text:stripTags(m[2]),index:m.index||0}))
    .filter((x:any)=>x.href);

  const key=anchors.find((a:any)=>/Gabarito Oficial Definitivo da Prova Objetiva/i.test(a.text)&&/\.pdf(?:$|\?)/i.test(a.href));
  if(!key) return {resolved:false,reason:"fgv_definitive_key_not_found",url:row.event_url};

  const target=clean(src.exam_name||src.role_name||"");
  const roleOf=(s:string)=>{
    const x=slug(s);
    if(x.includes("delegado")) return "delegado";
    if(x.includes("escrivao")) return "escrivao";
    if(x.includes("investigador")) return "investigador";
    if(x.includes("perito-criminal")) return "perito-criminal";
    if(x.includes("perito-legista")) return "perito-legista";
    if(x.includes("odontolegista")) return "odontolegista";
    return null;
  };
  const areaOf=(s:string)=>{
    const normalized=clean(s).replace(/[-_]+/g," ");
    const m=normalized.match(/[ÁA]rea\s*(I{1,4}|V|\d+)/i);
    return m?m[1].toUpperCase():null;
  };
  const targetRole=roleOf(target);
  const targetArea=areaOf(target);
  const examCandidates=anchors
    .filter((a:any)=>/\.pdf(?:$|\?)/i.test(a.href))
    .filter((a:any)=>!/discursiv|reda[cç][aã]o|prova[_ -]?oral|oral[_ -]?prova/i.test(decodeURIComponent(a.href)+" "+a.text))
    .filter((a:any)=>/tipo[_ -]?1|tipo%20?1/i.test(a.href)||/^Tipo\s*1$/i.test(a.text))
    .map((a:any)=>{
      const context=stripTags(html.slice(Math.max(0,a.index-900),Math.min(html.length,a.index+350)));
      const decoded=decodeURIComponent(a.href);
      const candidateText=context+" "+decoded;
      const fileName=decoded.split("/").pop()||decoded;
      let score=overlapScore(target,context)+(2*overlapScore(target,fileName));
      const candidateRole=roleOf(fileName)||roleOf(candidateText);
      const candidateArea=areaOf(fileName)||areaOf(context);
      if(targetRole&&candidateRole) score+=targetRole===candidateRole?3:-3;
      if(targetArea&&candidateArea) score+=targetArea===candidateArea?4:-4;
      return {...a,context,score,candidateRole,candidateArea};
    })
    .sort((a:any,b:any)=>b.score-a.score);

  const exam=examCandidates[0];
  if(!exam||exam.score<1.00) return {resolved:false,reason:"fgv_exam_type1_not_matched",url:row.event_url,best_score:exam?.score||0};
  if(targetRole&&exam.candidateRole&&targetRole!==exam.candidateRole)
    return {resolved:false,reason:"fgv_role_mismatch",url:row.event_url,target_role:targetRole,candidate_role:exam.candidateRole};
  if(targetArea&&exam.candidateArea!==targetArea)
    return {resolved:false,reason:"fgv_area_mismatch",url:row.event_url,target_area:targetArea,candidate_area:exam.candidateArea||null};

  const synthetic=row.event_url+"#nexo-fgv-"+slug(exam.href.split("/").pop()||target);
  const {data:existingByUrl}=await db.from("exam_sources").select("id,status").eq("source_page_url",synthetic).maybeSingle();
  const {data:existingByPair}=await db.from("exam_sources").select("id,status").eq("provider","FGV OFICIAL").eq("exam_pdf_url",exam.href).eq("answer_key_pdf_url",key.href).limit(1).maybeSingle();
  const existing=existingByUrl||existingByPair;
  let newQueued=0;
  if(!existing){
    const child:any={
      source_page_url:synthetic,provider:"FGV OFICIAL",career:src.career,board:"FGV",year:src.year,
      institution:src.institution,role_name:src.role_name||src.exam_name,
      exam_name:src.exam_name||src.role_name,booklet_type:"tipo-1",
      exam_pdf_url:exam.href,answer_key_pdf_url:key.href,status:"queued",
      last_error:null,next_attempt_at:null,updated_at:new Date().toISOString(),
      raw_metadata:{official_provider:"fgv",official_page:row.event_url,parent_source_id:src.id,
        fgv_answer_label:target,fgv_booklet_type:"Tipo 1",exam_match_score:exam.score,
        exam_context:exam.context.slice(0,600),registry_id:row.id}
    };
    const {data,error}=await db.from("exam_sources").insert(child).select("id").single();
    if(error) return {resolved:false,reason:"fgv_child_insert_failed",error:error.message};
    if(data) newQueued=1;
  }

  await db.rpc("enqueue_resolution_candidate",{
    p_source_id:src.id,p_provider_key:"official_board",p_candidate_url:row.event_url,
    p_candidate_kind:"exam_page",p_confidence:0.99,
    p_evidence:{provider:"FGV",exam_score:exam.score,booklet:"Tipo 1"}
  });
  await db.rpc("enqueue_resolution_candidate",{
    p_source_id:src.id,p_provider_key:"official_board",p_candidate_url:exam.href,
    p_candidate_kind:"exam_pdf",p_confidence:1.0,p_evidence:{provider:"FGV",booklet:"Tipo 1"}
  });
  await db.rpc("enqueue_resolution_candidate",{
    p_source_id:src.id,p_provider_key:"official_board",p_candidate_url:key.href,
    p_candidate_kind:"answer_key_pdf",p_confidence:1.0,p_evidence:{provider:"FGV",definitive:true}
  });

  return {resolved:true,provider:"official_board",url:row.event_url,new_queued_parts:newQueued,exam_pdf:exam.href,answer_key_pdf:key.href,score:exam.score};
}

async function processOne(item:any){
  const src=item.exam_sources;
  const attempts=(item.attempts||0)+1;
  const attempted:any[]=[...(item.attempted_providers||[])];
  let resolved=false;
  let resolvedProvider:string|null=null;
  let resolvedUrl:string|null=null;

  for(const resolver of [resolveCebraspe,resolveFgv]){
    if(resolved) break;
    try{
      const r:any=await resolver(item,src);
      if(r?.resolved){
        resolved=true;resolvedProvider="official_board";resolvedUrl=r.url||null;
        attempted.push({provider:"official_board",url:r.url,at:new Date().toISOString(),detail:r});
      }else if(r){
        attempted.push({provider:"official_board",at:new Date().toISOString(),detail:r});
      }
    }catch(e){
      attempted.push({provider:"official_board",at:new Date().toISOString(),error:String(e)});
    }
  }

  for(const c of officialSearchCandidates(src)){
    await db.rpc("enqueue_resolution_candidate",{
      p_source_id:src.id,p_provider_key:c.provider_key,p_candidate_url:c.url,
      p_candidate_kind:"search_page",p_confidence:0.35,
      p_evidence:{purpose:"official_fallback",board:src.board,year:src.year,exam_name:src.exam_name}
    });
  }

  const nextStatus=resolved?"resolved":(attempts>=6?"review_needed":"pending");
  const delayHours=resolved?0:Math.min(168,Math.pow(2,Math.min(attempts+2,7)));
  await db.from("source_resolution_queue").update({
    status:nextStatus,attempts,last_attempt_at:new Date().toISOString(),
    next_attempt_at:resolved?null:new Date(Date.now()+delayHours*3600000).toISOString(),
    attempted_providers:attempted,resolved_source_url:resolvedUrl,resolved_provider_key:resolvedProvider,
    updated_at:new Date().toISOString()
  }).eq("id",item.id);
  return {source_id:src.id,resolved,provider:resolvedProvider};
}

Deno.serve(async(req)=>{
  if(req.method!=="POST") return new Response("POST only",{status:405});
  if(!(await auth(req))) return Response.json({status:"unauthorized"},{status:401});
  const body=await req.json().catch(()=>({}));
  if(body?.mode==="discover_cebraspe"){
    try{ return Response.json(await discoverCebraspe(Math.max(1,Math.min(80,Number(body?.limit_events)||40)))); }
    catch(e){ return Response.json({status:"error",mode:"discover_cebraspe",error:String(e)},{status:500}); }
  }
  const boardFilter=String(body?.board_filter||"").trim().toUpperCase();
  const {data:pool,error}=await db.from("source_resolution_queue")
    .select("*,exam_sources(*)").in("status",["pending","review_needed"])
    .or("next_attempt_at.is.null,next_attempt_at.lte."+new Date().toISOString())
    .order("attempts",{ascending:true}).order("created_at",{ascending:true}).limit(500);
  if(error) return Response.json({status:"error",error:error.message},{status:500});

  const providerPriority=(item:any)=>{
    const b=clean(item?.exam_sources?.board).toUpperCase();
    if(/CEBRASPE|CESPE/.test(b)) return 0;
    if(/FGV/.test(b)) return 10;
    if(/VUNESP/.test(b)) return 20;
    if(/AOCP/.test(b)) return 30;
    return 50;
  };
  const eligiblePool=(pool||[]).filter((x:any)=>{
    if(["out_of_scope","out_of_range","validated"].includes(String(x?.exam_sources?.status||""))) return false;
    if(boardFilter&&String(x?.exam_sources?.board||"").toUpperCase()!==boardFilter) return false;
    return true;
  });
  const items=eligiblePool.sort((a:any,b:any)=>{
    const pa=providerPriority(a),pb=providerPriority(b);
    if(pa!==pb) return pa-pb;
    if((a.attempts||0)!==(b.attempts||0)) return (a.attempts||0)-(b.attempts||0);
    return String(a.created_at||"").localeCompare(String(b.created_at||""));
  }).slice(0,20);

  const results=[];
  for(const item of items) results.push(await processOne(item));
  const resolvedCount=results.filter(x=>x.resolved).length;

  let collector_handoff:any=null;
  if(resolvedCount>0){
    try{
      const {count}=await db.from("exam_sources").select("id",{count:"exact",head:true}).like("provider","% OFICIAL").eq("status","queued");
      if((count||0)>0){
        const {data:requestId,error:handoffErr}=await db.rpc("enqueue_official_question_collector");
        collector_handoff=handoffErr?{status:"error",error:handoffErr.message}:{status:"queued",request_id:requestId,official_sources:count};
      }else collector_handoff={status:"nothing_to_process"};
    }catch(e){
      collector_handoff={status:"error",error:String(e)};
    }
  }
  return Response.json({status:"success",processed:results.length,resolved:resolvedCount,collector_handoff,results});
});
