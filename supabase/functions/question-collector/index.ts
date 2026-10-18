
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const db = createClient(SUPABASE_URL, SERVICE_KEY);

const UA = "Mozilla/5.0 (compatible; NEXO-QuestionCollector/1.1; +https://almadaseara.github.io/NEXO/)";

function cleanMeta(v:string|null|undefined){
  if(!v) return null;
  const x=v.split(/Verificação de segurança|Complete a verificação/i)[0].replace(/\s+/g," ").trim();
  return x || null;
}
function normalizeStatement(s:string){
  return s.toLowerCase().replace(/\s+/g," ").trim();
}
async function hashStatement(s:string){
  const bytes=new TextEncoder().encode(normalizeStatement(s));
  const digest=await crypto.subtle.digest("SHA-256",bytes);
  return [...new Uint8Array(digest)].map(b=>b.toString(16).padStart(2,"0")).join("");
}
function policeScopeUrl(u:string){
  return /(polic|policial|delegad|perito|papiloscop|escriv|investigador|penitenc|prisional|prf|guarda-municipal|soldado|oficial-pm|agente-de-policia|agente-policia)/i.test(u);
}

function abs(base:string, href:string){
  try { return new URL(href, base).toString(); } catch { return ""; }
}
function stripHtml(s:string){
  return s.replace(/<script[\s\S]*?<\/script>/gi," ")
    .replace(/<style[\s\S]*?<\/style>/gi," ")
    .replace(/<[^>]+>/g," ")
    .replace(/&nbsp;/g," ").replace(/&amp;/g,"&")
    .replace(/&quot;/g,'"').replace(/&#39;/g,"'")
    .replace(/\s+/g," ").trim();
}
function field(html:string,label:string){
  const re = new RegExp(label+"\\s*:?\\s*<\\/?[^>]*>*\\s*([^<\\n]{2,120})","i");
  const m=html.match(re); return m ? stripHtml(m[1]) : null;
}
function yearFrom(s:string){ const m=s.match(/\b(20\d{2})\b/); return m?Number(m[1]):null; }
function boardFrom(s:string){
  const u=s.toUpperCase();
  if(u.includes("AOCP")) return "AOCP";
  if(u.includes("CEBRASPE")||u.includes("CESPE")) return "CEBRASPE";
  if(u.includes("FGV")) return "FGV";
  if(u.includes("FCC")) return "FCC";
  if(u.includes("VUNESP")) return "VUNESP";
  return null;
}
async function getText(url:string){
  const r=await fetch(url,{headers:{"user-agent":UA,"accept-language":"pt-BR,pt;q=0.9"}});
  if(!r.ok) throw new Error("HTTP "+r.status+" em "+url);
  const text=await r.text();
  if(/Verificação de segurança|Complete a verificação abaixo|checking your browser/i.test(text)){
    throw new Error("SOURCE_BLOCKED_CHALLENGE");
  }
  return text;
}
async function extractPdfText(url:string){
  const r=await fetch(url,{headers:{"user-agent":UA}});
  if(!r.ok) throw new Error("PDF HTTP "+r.status);
  const data=new Uint8Array(await r.arrayBuffer());
  const pdfjs = await import("npm:pdfjs-dist@4.10.38/legacy/build/pdf.mjs");
  const doc=await pdfjs.getDocument({data,disableWorker:true}).promise;
  let text="";
  for(let p=1;p<=Math.min(doc.numPages,220);p++){
    const page=await doc.getPage(p);
    const tc=await page.getTextContent();
    text += "\n--- PAGE "+p+" ---\n"+tc.items.map((x:any)=>x.str).join(" ");
  }
  return {text,pageCount:doc.numPages};
}
function parseCebraspeAnswerTable(text:string){
  const out=new Map<number,string>();
  const tokens=text.replace(/\r/g," ").split(/\s+/).filter(Boolean);
  let i=0;
  while(i<tokens.length){
    if(!/^\d{1,3}$/.test(tokens[i])){i++;continue;}
    const nums:number[]=[];
    let j=i;
    while(j<tokens.length&&/^\d{1,3}$/.test(tokens[j])&&nums.length<60){
      nums.push(Number(tokens[j]));j++;
    }
    const ans:string[]=[];
    let k=j;
    while(k<tokens.length&&/^(C|E|X)$/i.test(tokens[k])&&ans.length<60){
      ans.push(tokens[k].toUpperCase());k++;
    }
    if(nums.length>=5&&ans.length>=5){
      const n=Math.min(nums.length,ans.length);
      for(let z=0;z<n;z++){
        const q=nums[z];
        if(q>=1&&q<=250) out.set(q,ans[z]==="X"?"ANULADA":ans[z]);
      }
      i=k;
    }else i++;
  }
  return out;
}
function normalizeForMatch(s:string){
  return String(s||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"")
    .toLowerCase().replace(/[^a-z0-9]+/g," ").replace(/\s+/g," ").trim();
}
function tokenOverlap(a:string,b:string){
  const A=new Set(normalizeForMatch(a).split(" ").filter(x=>x.length>2));
  const B=new Set(normalizeForMatch(b).split(" ").filter(x=>x.length>2));
  if(!A.size||!B.size) return 0;
  let hit=0; for(const x of A) if(B.has(x)) hit++;
  return hit/Math.max(1,Math.min(A.size,B.size));
}
function parseFgvAnswerTable(text:string,label:string,booklet:string){
  const out=new Map<number,string>();
  const pages=text.split(/--- PAGE \d+ ---/g).filter(Boolean);
  let bestPage="";
  let bestScore=-1;
  for(const page of pages){
    let score=tokenOverlap(label,page);
    const np=normalizeForMatch(page), nb=normalizeForMatch(booklet||"Tipo 1");
    if(nb&&np.includes(nb)) score+=1;
    if(/GABARITO\s+OFICIAL\s+DEFINITIVO/i.test(page)||/GABARITO DEFINITIVO/i.test(page)) score+=0.25;
    if(score>bestScore){bestScore=score;bestPage=page;}
  }
  if(!bestPage||bestScore<0.35) return out;

  const typeNum=(String(booklet||"Tipo 1").match(/[1-4]/)||["1"])[0];
  const startRe=new RegExp("(?:Prova\\s+)?Tipo\\s*"+typeNum,"i");
  const sm=startRe.exec(bestPage);
  let scoped=bestPage;
  if(sm){
    const start=(sm.index||0)+sm[0].length;
    const nextNum=Number(typeNum)+1;
    let end=bestPage.length;
    if(nextNum<=4){
      const nextRe=new RegExp("(?:Prova\\s+)?Tipo\\s*"+nextNum,"i");
      const nm=nextRe.exec(bestPage.slice(start));
      if(nm) end=start+(nm.index||0);
    }
    scoped=bestPage.slice(start,end);
  }

  // Formato FGV recente: número e resposta intercalados (1 E 2 B 3 ...).
  for(const m of scoped.matchAll(/(?:^|\s)(\d{1,3})\s+(A|B|C|D|E|\*)(?=\s|$)/gi)){
    const q=Number(m[1]);
    const a=m[2].toUpperCase();
    if(q>=1&&q<=250) out.set(q,a==="*"?"ANULADA":a);
  }
  if(out.size>=5) return out;

  // Formato FGV antigo: linha de números seguida por linha de respostas.
  const tokens=scoped.replace(/\r/g," ").split(/\s+/).filter(Boolean);
  let i=0;
  while(i<tokens.length){
    if(!/^\d{1,3}$/.test(tokens[i])){i++;continue;}
    const nums:number[]=[];
    let j=i;
    while(j<tokens.length&&/^\d{1,3}$/.test(tokens[j])&&nums.length<50){
      nums.push(Number(tokens[j]));j++;
    }
    const ans:string[]=[];
    let k=j;
    while(k<tokens.length&&/^(A|B|C|D|E|\*)$/i.test(tokens[k])&&ans.length<50){
      ans.push(tokens[k].toUpperCase());k++;
    }
    if(nums.length>=5&&ans.length>=5){
      const n=Math.min(nums.length,ans.length);
      for(let z=0;z<n;z++){
        const q=nums[z];
        if(q>=1&&q<=250) out.set(q,ans[z]==="*"?"ANULADA":ans[z]);
      }
      i=k;
    }else i++;
  }
  return out;
}
function parseIbfcAnswerTable(text:string){
  const out=new Map<number,string>();
  const tokens=text.replace(/\r/g," ").split(/\s+/).filter(Boolean);
  let i=0;
  while(i<tokens.length){
    if(!/^\d{1,3}$/.test(tokens[i])){i++;continue;}
    const nums:number[]=[];
    let j=i;
    while(j<tokens.length&&/^\d{1,3}$/.test(tokens[j])&&nums.length<10){
      nums.push(Number(tokens[j]));j++;
    }
    const ans:string[]=[];
    let k=j;
    while(k<tokens.length&&/^(A|B|C|D|E|\*)$/i.test(tokens[k])&&ans.length<10){
      ans.push(tokens[k].toUpperCase());k++;
    }
    if(nums.length>=3&&ans.length>=3){
      const n=Math.min(nums.length,ans.length);
      for(let z=0;z<n;z++){
        const q=nums[z];
        if(q>=1&&q<=250) out.set(q,ans[z]==="*"?"ANULADA":ans[z]);
      }
      i=k;
    }else i++;
  }
  return out;
}
function parseIbfcMultipleChoice(text:string,answers:Map<number,string>){
  const clean=text.replace(/\r/g,"\n");
  const nums=[...answers.keys()].sort((a,b)=>a-b);
  const rows:any[]=[];
  for(const n of nums){
    const next=nums.find(x=>x>n)||n+1;
    const re=new RegExp("(?:^|\\n|\\s)"+n+"\\)\\s+([\\s\\S]{25,7000}?)(?=(?:\\n|\\s)"+next+"\\)\\s+|$)","i");
    const m=clean.match(re); if(!m) continue;
    const block=m[1].replace(/\s+/g," ").trim();
    const optMatches=[...block.matchAll(/(?:^|\s)([a-dA-D])\)\s*([\s\S]*?)(?=(?:\s[a-dA-D]\)\s)|$)/g)];
    if(optMatches.length!==4) continue;
    const opts=optMatches.map(x=>x[2].trim());
    const firstOpt=block.search(/(?:^|\s)[aA]\)\s/);
    const statement=(firstOpt>0?block.slice(0,firstOpt):block).trim();
    if(statement.length<25) continue;
    rows.push({question_number:n,statement,options:opts,answer:answers.get(n),question_type:"multiple_choice"});
  }
  return rows;
}
function parseAnswers(text:string){
  const out=new Map<number,string>();
  const normalized=text.replace(/\r/g,"\n");
  const patterns=[
    /(?:^|\s)(\d{1,3})\s*[-.:)]?\s*(A|B|C|D|E)(?=\s|$)/gim,
    /(?:^|\s)(\d{1,3})\s*[-.:)]?\s*(CERTO|ERRADO|C|E|ANULADA)(?=\s|$)/gim
  ];
  for(const re of patterns){
    for(const m of normalized.matchAll(re)){
      const n=Number(m[1]); let a=m[2].toUpperCase();
      if(a==="CERTO") a="C"; if(a==="ERRADO") a="E"; if(a==="ANULADA") a="ANULADA";
      if(n>=1&&n<=250) out.set(n,a);
    }
    if(out.size>=10) break;
  }
  return out;
}
function parseMultipleChoice(text:string,answers:Map<number,string>){
  const clean=text.replace(/\r/g,"\n");
  const nums=[...answers.keys()].sort((a,b)=>a-b);
  const rows:any[]=[];
  for(const n of nums){
    const next=nums.find(x=>x>n) || n+1;
    const re=new RegExp("(?:^|\\n|\\s)"+n+"\\s*[.)-]?\\s+([\\s\\S]{40,5000}?)(?=(?:\\n|\\s)"+next+"\\s*[.)-]?\\s+|$)","i");
    const m=clean.match(re); if(!m) continue;
    const block=m[1].replace(/\s+/g," ").trim();
    const opts=[...block.matchAll(/(?:^|\s)\(?([A-E])\s*[).:-]\s*([\s\S]*?)(?=(?:\s\(?[A-E]\s*[).:-])|$)/g)].map(x=>x[2].trim());
    if(opts.length!==5) continue;
    const firstOpt=block.search(/(?:^|\s)\(?A\s*[).:-]/);
    const statement=(firstOpt>0?block.slice(0,firstOpt):block).trim();
    if(statement.length<40) continue;
    rows.push({question_number:n,statement,options:opts,answer:answers.get(n),question_type:"multiple_choice"});
  }
  return rows;
}
function parseTrueFalse(text:string,answers:Map<number,string>){
  const clean=text.replace(/\r/g,"\n");
  const nums=[...answers.keys()].filter(n=>["C","E","ANULADA"].includes(answers.get(n)||"")).sort((a,b)=>a-b);
  const rows:any[]=[];
  for(let i=0;i<nums.length;i++){
    const n=nums[i], next=nums[i+1];
    const end=next? "(?=(?:\\n|\\s)"+next+"\\s*[.)-]?\\s+)" : "$";
    const re=new RegExp("(?:^|\\n|\\s)"+n+"\\s*[.)-]?\\s+([\\s\\S]{18,2200}?)"+end,"i");
    const m=clean.match(re); if(!m) continue;
    const raw=m[1].replace(/\s+/g," ").trim();
    // O PDF pode colocar a instrução do BLOCO SEGUINTE depois do item atual.
    // Não incorporá-la silenciosamente ao enunciado.
    const nextCommand=/(?:Julgue os itens (?:a seguir|seguintes|subsequentes)|Acerca dos temas seguintes, julgue)/i.exec(raw);
    let statement=(nextCommand&&nextCommand.index>25?raw.slice(0,nextCommand.index):raw).trim();
    // Saldos e instrução entre itens são contexto do próximo bloco, não parte do item anterior.
    const tableStart=/(?:conta\s+saldo\s*\(?R\$\)?|Com base nos dados precedentes)/i.exec(statement);
    if(tableStart&&tableStart.index>25) statement=statement.slice(0,tableStart.index).trim();
    if(statement.length<18) continue;
    // O extrator de texto NÃO carrega tabelas/figuras. O trecho prévio ou o
    // próprio enunciado pode indicar dependência de contexto compartilhado.
    // Atribuição conservadora: encaminhar para revisão, jamais publicar sozinho.
    const start=m.index||0;
    const earlier=clean.slice(Math.max(0,start-1800),start).replace(/\s+/g," ");
    const lastShared=earlier.toLowerCase().lastIndexOf("com base nos dados precedentes");
    const lastNext=earlier.toLowerCase().lastIndexOf("julgue os itens a seguir");
    const sharedContext=lastShared>=0&&lastShared>lastNext;
    const nearbyTable=/(?:tabela|quadro|figura|gr[aá]fico)/i.test(earlier.slice(-350));
    const needsContext=/(?:tabela|quadro|figura|gr[aá]fico|balancete|dados a seguir|informa[cç][oõ]es a seguir)/i.test(
      statement);
    rows.push({question_number:n,statement,options:["Certo","Errado"],answer:answers.get(n),question_type:"true_false",
      needs_context_review:needsContext||sharedContext||nearbyTable||Boolean(nextCommand&&nextCommand.index>25)||Boolean(tableStart)});
  }
  return rows;
}
function pdfLinks(html:string,base:string){
  const links=[...html.matchAll(/href=["']([^"']+)["']/gi)].map(m=>abs(base,m[1])).filter(Boolean);
  const pdfs=[...new Set(links.filter(x=>/\.pdf(?:$|\?)/i.test(x)||/download.*pdf/i.test(x)))];
  let answer=pdfs.find(x=>/gabarito|resposta|resultado/i.test(x))||null;
  let exam=pdfs.find(x=>x!==answer&&!/gabarito|resposta|resultado/i.test(x))||null;
  return {exam,answer,pdfs};
}
async function upsertSource(url:string,career:string|null){
  const {data:existing}=await db.from("exam_sources").select("*").eq("source_page_url",url).maybeSingle();
  if(existing) return {data:existing,isNew:false,skippedKnown:true};

  const urlYear=yearFrom(url);
  if(urlYear!==null&&(urlYear<2018||urlYear>2026)) return {data:null,isNew:false,skippedOutOfRange:true};

  const html=await getText(url);
  const plain=stripHtml(html);
  const links=pdfLinks(html,url);
  const organizer=cleanMeta((plain.match(/Organizadora:\s*([^|]{2,120})/i)||[])[1]?.trim()||null);
  const board=cleanMeta(boardFrom(plain)||organizer);
  const year=yearFrom(plain)||urlYear;
  const cargo=cleanMeta((plain.match(/Cargo:\s*([^|]{2,120})/i)||[])[1]?.trim()||null);
  const inst=cleanMeta((plain.match(/(?:Órgão|Orgao):\s*([^|]{2,120})/i)||[])[1]?.trim()||null);
  const examName=cleanMeta((plain.match(/Prova\s+(.{3,140}?)(?:Cargo:|Ano:|Órgão:|Organizadora:)/i)||[])[1]?.trim()||cargo||null);
  const hasSimulator=/simGabaritos\s*=/.test(html);
  let nextStatus=((links.exam&&links.answer)||hasSimulator)?"queued":"discovered";
  if(year!==null&&(year<2018||year>2026)) nextStatus="out_of_range";

  const payload:any={
    source_page_url:url,career:career||null,board:board||null,year:year||null,
    institution:inst||null,role_name:cargo||null,exam_name:examName||null,
    exam_pdf_url:links.exam||null,answer_key_pdf_url:links.answer||null,
    status:nextStatus,updated_at:new Date().toISOString(),
    raw_metadata:{pdfs:links.pdfs,has_simulator:hasSimulator}
  };
  const {data,error}=await db.from("exam_sources").upsert(payload,{onConflict:"source_page_url"}).select().single();
  if(error) throw error; return {data,isNew:true,skippedKnown:false};
}
async function discoverFromSeed(seed:any){
  const html=await getText(seed.url);
  let pagesScanned=1;
  const direct=[...html.matchAll(/href=["']([^"']*\/provas\/download\/[^"']+)["']/gi)]
    .map(m=>abs(seed.url,m[1])).filter(Boolean).filter(policeScopeUrl);
  const policeCategory=/polic|delegad|perito|criminal|penitenc|prisional|seguran[cç]a|guarda|investigador|escriv|papiloscop/i;
  const categoryLinks=[...html.matchAll(/href=["']([^"']*\/provas\/[^"'?#]+(?:\/\d+)?[^"']*)["']/gi)]
    .map(m=>abs(seed.url,m[1]))
    .filter(u=>u&&!u.includes("/provas/download/")&&policeCategory.test(u))
    .slice(0,12);
  const extra:string[]=[];
  for(let i=0;i<categoryLinks.length;i+=4){
    const batch=categoryLinks.slice(i,i+4);
    const pages=await Promise.allSettled(batch.map(u=>getText(u)));
    pages.forEach((res,idx)=>{
      if(res.status!=="fulfilled") return;
      pagesScanned++;
      const base=batch[idx];
      for(const m of res.value.matchAll(/href=["']([^"']*\/provas\/download\/[^"']+)["']/gi)){
        const u=abs(base,m[1]); if(u&&policeScopeUrl(u)) extra.push(u);
      }
    });
    if(extra.length>=80) break;
  }
  const unique=[...new Set([...direct,...extra])]
    .filter(u=>{
      const y=yearFrom(u);
      return y===null||(y>=2018&&y<=2026);
    })
    .slice(0,100);
  let newSources=0;
  for(let i=0;i<unique.length;i+=8){
    const batch=unique.slice(i,i+8);
    const results=await Promise.allSettled(batch.map(url=>upsertSource(url,seed.career)));
    for(const r of results){
      if(r.status==="fulfilled" && (r.value as any)?.isNew) newSources++;
    }
  }
  await db.from("collector_seed_urls").update({
    last_scanned_at:new Date().toISOString(),
    scan_count:(seed.scan_count||0)+1
  }).eq("id",seed.id);
  return {new_sources:newSources,pages_scanned:pagesScanned,candidate_urls:unique.length};
}

function decodeEntities(s:string){
  return stripHtml(s.replace(/<br\s*\/?>/gi," ").replace(/<\/p>/gi," "));
}
function parsePciSimulator(html:string,baseUrl:string){
  const g=html.match(/var\s+simGabaritos\s*=\s*(\[[\s\S]*?\]);/i);
  if(!g) return [];
  let answers:string[]=[];
  try{ answers=JSON.parse(g[1]); }catch{ return []; }
  let comments:any={};
  const cm=html.match(/var\s+simComentariosIA\s*=\s*(\{[\s\S]*?\});\s*var\s+simTotal/i);
  if(cm){ try{ comments=JSON.parse(cm[1].replace(/\\\//g,"/")); }catch{} }
  const starts=[...html.matchAll(/<div\s+class=["']sim-questao\s+card\s+mb-3["'][^>]*data-index=["'](\d+)["'][^>]*data-sid=["']([^"']+)["'][^>]*>/gi)];
  const rows:any[]=[];
  for(let j=0;j<starts.length;j++){
    const idx=Number(starts[j][1]);
    const start=(starts[j].index||0)+starts[j][0].length;
    const nextStart=j+1<starts.length?(starts[j+1].index||html.length):html.length;
    const finalPos=html.indexOf('<div id="sim-final"',start);
    const end=finalPos>0&&finalPos<nextStart?finalPos:nextStart;
    const block=html.slice(start,end);
    const sm=block.match(/<p\s+class=["'][^"']*sim-enunciado[^"']*["'][^>]*>([\s\S]*?)<\/p>/i);
    if(!sm) continue;
    const statement=decodeEntities(sm[1]).trim();
    const opts=[...block.matchAll(/<button[^>]*class=["'][^"']*btn-sim-alt[^"']*["'][^>]*data-letra=["']([A-E])["'][^>]*>[\s\S]*?<span[^>]*>[A-E]<\/span>([\s\S]*?)<\/button>/gi)]
      .sort((a,b)=>a[1].localeCompare(b[1]))
      .map(m=>decodeEntities(m[2]).trim());
    const nm=block.match(/Q(\d+)\s+da\s+prova/i);
    const question_number=nm?Number(nm[1]):idx+1;
    const answer=(answers[idx]||"").toUpperCase();
    if(statement.length<20) continue;
    if(opts.length===5 && ["A","B","C","D","E","ANULADA"].includes(answer)){
      const media_urls=[...block.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)].map(m=>abs(baseUrl,m[1])).filter(Boolean);
      rows.push({question_number,statement,options:opts,answer,question_type:"multiple_choice",media_urls,comment:comments[String(idx)]||comments[String(idx+1)]||null,external_id:starts[j][2]});
      continue;
    }
    if(opts.length!==5 && ["C","E","ANULADA"].includes(answer)){
      const media_urls=[...block.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)].map(m=>abs(baseUrl,m[1])).filter(Boolean);
      rows.push({question_number,statement,options:["Certo","Errado"],answer,question_type:"true_false",media_urls,comment:comments[String(idx)]||comments[String(idx+1)]||null,external_id:starts[j][2]});
    }
  }
  return rows;
}

async function processSource(src:any){
  if(src.year===null||src.year===undefined||src.year<2018||src.year>2026){
    await db.from("exam_sources").update({
      status:src.year===null||src.year===undefined?"deferred":"out_of_range",
      next_attempt_at:src.year===null||src.year===undefined?new Date(Date.now()+24*60*60*1000).toISOString():null,
      last_error:"Fonte fora da janela obrigatória 2018-2026 ou sem ano identificável.",
      updated_at:new Date().toISOString()
    }).eq("id",src.id);
    return {extracted:0,validated:0,rejected:0,inserted:0};
  }
  const now=new Date().toISOString();
  await db.from("exam_sources").update({
    status:"processing",attempt_count:(src.attempt_count||0)+1,last_attempt_at:now,updated_at:now
  }).eq("id",src.id);
  try{
    const sourceHtml=await getText(src.source_page_url);
    const simQs=parsePciSimulator(sourceHtml,src.source_page_url);
    const {data:existingRows}=await db.from("question_bank").select("question_number").eq("source_id",src.id);
    const existingSet=new Set((existingRows||[]).map((x:any)=>x.question_number));
    if(simQs.length){
      let inserted=0,validated=0,annulled=0,duplicates=0;
      for(const q of simQs){
        const h=await hashStatement(q.statement);
        const {data:dup}=await db.from("question_bank").select("id").eq("statement_hash",h).limit(1);
        if((dup||[]).length && !existingSet.has(q.question_number)){duplicates++;continue;}
        const isAnnulled=q.answer==="ANULADA";
        const row={source_id:src.id,question_number:q.question_number,statement:q.statement,statement_hash:h,options:q.options,answer:q.answer,question_type:q.question_type,media_urls:q.media_urls||[],board:src.board,year:src.year,institution:src.institution,role_name:src.role_name,status:isAnnulled?"annulled":"validated",validation_method:"mirror_answer_key_pci",validation_source_type:"mirror",mirror_source_url:src.source_page_url,mirror_source_domain:"pciconcursos.com.br",mirror_source_name:"PCI Concursos",classification_status:isAnnulled?"review_needed":"pending",publication_status:isAnnulled?"withheld":"banked",captured_at:new Date().toISOString(),updated_at:new Date().toISOString()};
        const {error}=await db.from("question_bank").upsert(row,{onConflict:"source_id,question_number"});
        if(!error){
          if(isAnnulled) annulled++; else validated++;
          if(!existingSet.has(q.question_number)){if(!isAnnulled) inserted++;existingSet.add(q.question_number);}
        }
      }
      await db.from("exam_sources").update({status:validated>0?"validated":"extracted",last_error:null,next_attempt_at:null,updated_at:new Date().toISOString(),raw_metadata:{...(src.raw_metadata||{}),simulator_questions:simQs.length,duplicates_skipped:duplicates,annulled_questions:annulled}}).eq("id",src.id);
      return {extracted:simQs.length,validated,rejected:0,inserted,annulled,duplicates};
    }
    if(!src.exam_pdf_url||!src.answer_key_pdf_url){
      await db.from("exam_sources").update({status:"deferred",next_attempt_at:new Date(Date.now()+12*60*60*1000).toISOString(),last_error:"Sem simulador estruturado e sem links diretos de prova/gabarito.",updated_at:new Date().toISOString()}).eq("id",src.id);
      return {extracted:0,validated:0,rejected:0,inserted:0};
    }
    const [exam,answer]=await Promise.all([extractPdfText(src.exam_pdf_url),extractPdfText(src.answer_key_pdf_url)]);
    await db.from("exam_documents").upsert([
      {source_id:src.id,document_type:"exam",url:src.exam_pdf_url,extracted_text:exam.text,extraction_status:"done",page_count:exam.pageCount,updated_at:new Date().toISOString()},
      {source_id:src.id,document_type:"answer_key",url:src.answer_key_pdf_url,extracted_text:answer.text,extraction_status:"done",page_count:answer.pageCount,updated_at:new Date().toISOString()}
    ],{onConflict:"source_id,document_type,url"});
    const bookletTypes=[...new Set([...answer.text.matchAll(/(?:tipo|caderno)\s*([1-4])/gi)].map(m=>m[1]))];
    const fgvScoped=src.board==="FGV"&&src.raw_metadata?.fgv_answer_label&&src.booklet_type;
    if(bookletTypes.length>1&&!fgvScoped){
      await db.from("exam_sources").update({
        status:"deferred",
        next_attempt_at:new Date(Date.now()+7*24*60*60*1000).toISOString(),
        last_error:"Gabarito com múltiplos cadernos/tipos detectado; exige associação segura por caderno antes da validação.",
        updated_at:new Date().toISOString(),
        raw_metadata:{...(src.raw_metadata||{}),detected_booklet_types:bookletTypes}
      }).eq("id",src.id);
      return {extracted:0,validated:0,rejected:0,inserted:0,annulled:0};
    }
    const answers=src.board==="CEBRASPE"
      ?parseCebraspeAnswerTable(answer.text)
      :(src.board==="IBFC"
        ?parseIbfcAnswerTable(answer.text)
        :(fgvScoped
          ?parseFgvAnswerTable(answer.text,String(src.raw_metadata?.fgv_answer_label||src.exam_name||src.role_name||""),String(src.raw_metadata?.fgv_booklet_type||"Tipo 1"))
          :parseAnswers(answer.text)));
    let qs = src.board==="CEBRASPE"
      ?parseTrueFalse(exam.text,answers)
      :(src.board==="IBFC"?parseIbfcMultipleChoice(exam.text,answers):parseMultipleChoice(exam.text,answers));
    if(qs.length<5 && src.board!=="CEBRASPE" && src.board!=="IBFC") qs=parseTrueFalse(exam.text,answers);
    let validated=0,rejected=0,inserted=0,annulled=0;
    for(const q of qs){
      const answerValue=q.answer;
      let status="validated";
      if(answerValue==="ANULADA"){status="annulled";annulled++;}
      if(!answerValue){status="rejected";rejected++}
      else if(answerValue!=="ANULADA") validated++;
      // Falha fechada: não sobrepor registro nem validar item com contexto visual
      // incompleto. Sua recuperação requer documento/contexto associado e revisão.
      if(q.needs_context_review){
        rejected++;
        continue;
      }
      const h=await hashStatement(q.statement);
      const {data:dup}=await db.from("question_bank").select("id").eq("statement_hash",h).limit(1);
      if((dup||[]).length && !existingSet.has(q.question_number)) continue;
      const examSourceType=src.raw_metadata?.exam_source_type||"official";
      const examSourceName=src.raw_metadata?.exam_source_name||src.provider||"Fonte oficial";
      const answerSourceType=src.raw_metadata?.answer_source_type||"official";
      const answerSourceName=src.raw_metadata?.answer_source_name||src.provider||"Fonte oficial";
      const row={...q,statement_hash:h,source_id:src.id,board:src.board,year:src.year,institution:src.institution,role_name:src.role_name,status,
        validation_method:answerSourceType==="official"?"official_answer_key_pdf":"mirror_answer_key",
        validation_source_type:answerSourceType==="official"?"official":"mirror",
        exam_source_type:examSourceType,exam_source_name:examSourceName,exam_source_url:src.exam_pdf_url,
        answer_source_type:answerSourceType,answer_source_name:answerSourceName,answer_source_url:src.answer_key_pdf_url,
        classification_status:status==="annulled"?"review_needed":"pending",publication_status:status==="annulled"?"withheld":"banked",
        captured_at:new Date().toISOString(),updated_at:new Date().toISOString()};
      const {error}=await db.from("question_bank").upsert(row,{onConflict:"source_id,question_number"});
      if(!error&&!existingSet.has(q.question_number)){
        if(status!=="annulled") inserted++;
        existingSet.add(q.question_number);
      }
    }
    await db.from("exam_sources").update({status:validated>0?"validated":"extracted",last_error:null,next_attempt_at:null,updated_at:new Date().toISOString()}).eq("id",src.id);
    return {extracted:qs.length,validated,rejected,inserted,annulled};
  }catch(e){
    const attempts=(src.attempt_count||0)+1;
    const blocked=String(e).includes("SOURCE_BLOCKED_CHALLENGE");
    const hours=Math.min(blocked?336:168, Math.max(2, Math.pow(2,Math.min(attempts,7))));
    await db.from("exam_sources").update({
      status:"deferred",
      next_attempt_at:new Date(Date.now()+hours*60*60*1000).toISOString(),
      last_error:blocked?"Bloqueio/desafio de segurança detectado na fonte.":String(e),
      updated_at:new Date().toISOString()
    }).eq("id",src.id);
    return {extracted:0,validated:0,rejected:0,inserted:0,annulled:0,error:String(e)};
  }
}

Deno.serve(async (req)=>{
  if(req.method!=="POST") return new Response("POST only",{status:405});
  const token=req.headers.get("x-nexo-cron")||"";
  const body=await req.json().catch(()=>({}));
  const trigger=String(body?.trigger||"");
  const officialMode=trigger==="official-chain"||trigger==="source-resolver-handoff";
  const {data:authorized,error:authErr}=await db.rpc("validate_collector_token",{p_token:token});
  if(authErr||authorized!==true) return Response.json({status:"unauthorized"},{status:401});
  const {data:isBusy,error:busyErr}=await db.rpc("collector_is_busy");
  if(busyErr) return Response.json({status:"error",error:busyErr.message},{status:500});
  if(isBusy) return Response.json({status:"busy"});
  const {data:run,error:runErr}=await db.from("collector_runs").insert({status:"running"}).select().single();
  if(runErr) return Response.json({error:runErr.message},{status:500});
  let stats={discovered_count:0,new_sources_discovered:0,pages_scanned:0,extracted_count:0,validated_count:0,rejected_count:0,inserted_count:0,deferred_count:0,annulled_count:0};
  const errors:string[]=[];
  try{
    let candidates:any[]=[];
    if(officialMode){
      const {data,error}=await db.from("exam_sources").select("*")
        .like("provider","%OFICIAL%")
        .eq("status","queued")
        .gte("year",2018).lte("year",2026)
        .order("last_attempt_at",{ascending:true,nullsFirst:true})
        .limit(2);
      if(error) throw error;
      candidates=data||[];
    }else{
      const {data,error}=await db.from("exam_sources").select("*")
        .in("status",["queued","discovered","error","deferred"])
        .gte("year",2018).lte("year",2026)
        .or("next_attempt_at.is.null,next_attempt_at.lte."+new Date().toISOString())
        .order("last_attempt_at",{ascending:true,nullsFirst:true})
        .limit(120);
      if(error) throw error;
      candidates=data||[];
    }
    const now=Date.now();
    const priority=(s:any)=>{
      const st:any={queued:0,discovered:1,error:2,deferred:3};
      const official=String(s.provider||"").includes("OFICIAL")?-1000:0;
      return official+(st[s.status]??5)*100+(s.attempt_count||0);
    };
    const maxSources=officialMode?2:30;
    const sources=(candidates||[]).filter((s:any)=>!s.next_attempt_at||new Date(s.next_attempt_at).getTime()<=now).sort((a:any,b:any)=>priority(a)-priority(b)).slice(0,maxSources);
    const batchSize=officialMode?2:6;
    for(let i=0;i<sources.length;i+=batchSize){
      const batch=sources.slice(i,i+batchSize);
      const results=await Promise.allSettled(batch.map((src:any)=>processSource(src)));
      results.forEach((res,idx)=>{
        const src=batch[idx];
        if(res.status==="fulfilled"){
          const s:any=res.value;
          stats.extracted_count+=s.extracted||0;stats.validated_count+=s.validated||0;stats.rejected_count+=s.rejected||0;stats.inserted_count+=s.inserted||0;stats.annulled_count+=s.annulled||0;if(s.error) stats.deferred_count++;
          if(s.error) errors.push(src.source_page_url+": "+s.error);
        }else errors.push(src.source_page_url+": "+String(res.reason));
      });
    }
    if(!officialMode){
      const {data:seeds}=await db.from("collector_seed_urls").select("*").eq("enabled",true).order("last_scanned_at",{ascending:true,nullsFirst:true}).order("priority",{ascending:true}).limit(2);
      const seedResults=await Promise.allSettled((seeds||[]).map((seed:any)=>discoverFromSeed(seed)));
      seedResults.forEach((res,idx)=>{
        if(res.status==="fulfilled"){
          const v:any=res.value||{};
          stats.new_sources_discovered+=v.new_sources||0;
          stats.discovered_count+=v.new_sources||0;
          stats.pages_scanned+=v.pages_scanned||0;
        }else errors.push("seed "+(seeds||[])[idx]?.url+": "+String(res.reason));
      });
    }
    stats.pages_scanned+=sources.length;
    const status=errors.length?"partial":(stats.extracted_count===0&&stats.inserted_count===0?"idle":"success");
    await db.from("collector_runs").update({...stats,status,finished_at:new Date().toISOString(),details:{errors,processed_sources:sources.length,new_unique_questions:stats.inserted_count,eligible_sources:sources.length,pipeline:officialMode?"official_extraction_validation":"extraction_validation",year_window:"2018-2026",official_mode:officialMode}}).eq("id",run.id);

    let next_official_request_id:any=null;
    if(officialMode){
      const {count}=await db.from("exam_sources").select("id",{count:"exact",head:true}).like("provider","%OFICIAL%").eq("status","queued");
      if((count||0)>0){
        const {data:nextId,error:nextErr}=await db.rpc("enqueue_official_question_collector");
        if(!nextErr) next_official_request_id=nextId;
        else errors.push("official_chain: "+nextErr.message);
      }
    }

    return Response.json({run_id:run.id,status,...stats,processed_sources:sources.length,year_window:"2018-2026",official_mode:officialMode,next_official_request_id,errors});
  }catch(e){
    await db.from("collector_runs").update({...stats,status:"error",finished_at:new Date().toISOString(),error:String(e)}).eq("id",run.id);
    return Response.json({run_id:run.id,status:"error",...stats,error:String(e)},{status:500});
  }
});
