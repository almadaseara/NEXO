// NEXO — importação assistida de provas do Instituto AOCP (edge function "aocp-import").
// Chamada pela tela Administração → Importar prova AOCP (ui/nexo-importar.js), só por administrador.
// Lê o caderno enviado pelo administrador (bucket nexo-provas) e o gabarito oficial (link público da AOCP
// ou PDF enviado), separa no gabarito o bloco do cargo informado, monta as questões e grava em
// question_bank como validadas e retidas (banked), com o gabarito oficial como fonte.
// Não altera o coletor nem o resolvedor; a montagem das questões é a mesma do question-collector v25.
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;
const db = createClient(SUPABASE_URL, SERVICE_KEY);
const UA = "Mozilla/5.0 (compatible; NEXO-AocpImport/1.0; +https://almadaseara.github.io/NEXO/)";
const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { ...CORS, "Content-Type": "application/json" } });

// ---------- PDFs ----------
async function bytesDe(ref: string): Promise<Uint8Array> {
  if (ref.startsWith("storage:nexo-provas/")) {
    const { data, error } = await db.storage.from("nexo-provas").download(ref.slice("storage:nexo-provas/".length));
    if (error || !data) throw new Error("Não consegui ler o PDF enviado: " + (error?.message || "arquivo ausente"));
    return new Uint8Array(await data.arrayBuffer());
  }
  if (!/^https:\/\/arquivos-site\.institutoaocp\.org\.br\/\S+\.pdf$/.test(ref)) throw new Error("Link de PDF não permitido.");
  const r = await fetch(ref, { headers: { "user-agent": UA } });
  if (!r.ok) throw new Error("PDF HTTP " + r.status + " em " + ref);
  return new Uint8Array(await r.arrayBuffer());
}
async function textoDoPdf(data: Uint8Array) {
  const pdfjs = await import("npm:pdfjs-dist@4.10.38/legacy/build/pdf.mjs");
  const doc = await pdfjs.getDocument({ data, disableWorker: true }).promise;
  let text = "";
  for (let p = 1; p <= Math.min(doc.numPages, 220); p++) {
    const page = await doc.getPage(p);
    const tc = await page.getTextContent();
    text += "\n--- PAGE " + p + " ---\n" + tc.items.map((x: any) => x.str).join(" ");
  }
  return { text, paginas: doc.numPages };
}

// ---------- gabarito da AOCP ----------
function normalizeForMatch(s: string) {
  return String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").replace(/\s+/g, " ").trim();
}
function tokenOverlap(a: string, b: string) {
  const A = new Set(normalizeForMatch(a).split(" ").filter((x) => x.length > 2));
  const B = new Set(normalizeForMatch(b).split(" ").filter((x) => x.length > 2));
  if (!A.size || !B.size) return 0;
  let hit = 0; for (const x of A) if (B.has(x)) hit++;
  return hit / Math.max(1, Math.min(A.size, B.size));
}
// Um bloco por cargo ("<CARGO> - PROVA 1", "Tipo 2"...), cada um com linhas de números seguidas de linhas
// de letras. Escolhe o bloco cujo cabeçalho mais se parece com o cargo informado; na dúvida, não usa nenhum.
function parseAocpAnswerTable(text: string, label: string) {
  const tokens = String(text).replace(/--- PAGE \d+ ---/g, " ").split(/\s+/).filter(Boolean);
  const isNum = (t: string) => /^\d{1,3}$/.test(t), isAns = (t: string) => /^(A|B|C|D|E|X|\*|ANULADA)$/i.test(t);
  const runs: { start: number; end: number; nums: number[]; ans: string[] }[] = [];
  let i = 0;
  while (i < tokens.length) {
    if (!isNum(tokens[i])) { i++; continue; }
    let j = i; const nums: number[] = [];
    while (j < tokens.length && isNum(tokens[j]) && nums.length < 60) { nums.push(Number(tokens[j])); j++; }
    let k = j; const ans: string[] = [];
    while (k < tokens.length && isAns(tokens[k]) && ans.length < 60) { ans.push(tokens[k].toUpperCase()); k++; }
    const crescente = nums.every((n, z) => z === 0 || n === nums[z - 1] + 1);
    if (nums.length >= 5 && ans.length >= nums.length && crescente) { runs.push({ start: i, end: j + nums.length, nums, ans: ans.slice(0, nums.length) }); i = j + nums.length; }
    else i++;
  }
  const secoes: { rotulo: string; respostas: Map<number, string> }[] = [];
  let fim = 0;
  for (const r of runs) {
    if (r.nums[0] === 1 || !secoes.length) secoes.push({ rotulo: tokens.slice(fim, r.start).join(" "), respostas: new Map() });
    const s = secoes[secoes.length - 1];
    r.nums.forEach((n, z) => { const a = r.ans[z]; s.respostas.set(n, a === "X" || a === "*" ? "ANULADA" : a); });
    fim = r.end;
  }
  const rotulos = secoes.map((s) => s.rotulo.slice(-90));
  if (!secoes.length) return { respostas: new Map<number, string>(), rotulos, nota: 0 };
  const notas = secoes.map((s) => ({ s, p: tokenOverlap(label, s.rotulo) })).sort((x, y) => y.p - x.p);
  const melhor = notas[0], segunda = notas[1] ? notas[1].p : -1;
  if (secoes.length > 1 && (melhor.p < 0.75 || segunda >= melhor.p)) return { respostas: new Map<number, string>(), rotulos, nota: melhor.p };
  return { respostas: melhor.s.respostas, rotulos, nota: melhor.p };
}

// ---------- questões (igual ao question-collector v25) ----------
function parseMultipleChoice(text: string, answers: Map<number, string>) {
  const clean = text.replace(/\r/g, "\n");
  const nums = [...answers.keys()].sort((a, b) => a - b);
  const rows: any[] = [];
  for (const n of nums) {
    const next = nums.find((x) => x > n) || n + 1;
    const re = new RegExp(String.raw`(?:^|\n|\s)` + n + String.raw`\s*[.)-]?\s+([\s\S]{40,5000}?)(?=(?:\n|\s)` + next + String.raw`\s*[.)-]?\s+|$)`, "i");
    const m = clean.match(re); if (!m) continue;
    const block = m[1].replace(/\s+/g, " ").trim();
    const opts = [...block.matchAll(/(?:^|\s)\(?([A-E])\s*[).:-]\s*([\s\S]*?)(?=(?:\s\(?[A-E]\s*[).:-])|$)/g)].map((x) => x[2].trim());
    if (opts.length !== 5) continue;
    const firstOpt = block.search(/(?:^|\s)\(?A\s*[).:-]/);
    const statement = (firstOpt > 0 ? block.slice(0, firstOpt) : block).trim();
    if (statement.length < 40) continue;
    rows.push({ question_number: n, statement, options: opts, answer: answers.get(n), question_type: "multiple_choice" });
  }
  return rows;
}
async function hashStatement(s: string) {
  const bytes = new TextEncoder().encode(s.toLowerCase().replace(/\s+/g, " ").trim());
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function finalizar(id: string, status: string, erro: string | null, meta: any, resultado: any) {
  await db.from("exam_sources").update({
    status, last_error: erro, updated_at: new Date().toISOString(), last_attempt_at: new Date().toISOString(),
    raw_metadata: { ...(meta || {}), resultado },
  }).eq("id", id);
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  if (req.method !== "POST") return json({ status: "error", error: "POST only" }, 405);
  // só administrador: confere com o login de quem chamou
  const auth = req.headers.get("Authorization") || "";
  const comoUsuario = createClient(SUPABASE_URL, ANON_KEY, { global: { headers: { Authorization: auth } } });
  const { data: ehAdmin, error: authErr } = await comoUsuario.rpc("is_nexo_admin");
  if (authErr || ehAdmin !== true) return json({ status: "unauthorized" }, 401);

  const body = await req.json().catch(() => ({}));
  const id = String(body?.source_id || "");
  const { data: src, error } = await db.from("exam_sources").select("*").eq("id", id).maybeSingle();
  if (error || !src || src.raw_metadata?.importado !== true) return json({ status: "error", error: "Importação não encontrada." }, 404);
  if (src.status !== "processing") return json({ status: "error", error: "Esta importação já foi processada (" + src.status + ")." }, 409);

  try {
    const [cad, gab] = await Promise.all([bytesDe(src.exam_pdf_url).then(textoDoPdf), bytesDe(src.answer_key_pdf_url).then(textoDoPdf)]);
    const label = String(src.raw_metadata?.aocp_answer_label || src.role_name || "");
    const { respostas, rotulos, nota } = parseAocpAnswerTable(gab.text, label);
    if (respostas.size < 5) {
      const msg = "Não achei no gabarito o bloco do cargo \"" + label + "\". Cargos no gabarito: " + (rotulos.join(" | ") || "nenhum bloco de respostas reconhecido") + ".";
      await finalizar(src.id, "rejected", msg, src.raw_metadata, { respostas: 0, questoes: 0, nota });
      return json({ status: "rejected", error: msg });
    }
    // a capa (página 1) tem números soltos que confundem a busca pelas questões
    const p2 = cad.text.indexOf("--- PAGE 2 ---");
    const qs = parseMultipleChoice(p2 > 0 ? cad.text.slice(p2) : cad.text, respostas);
    if (!qs.length) {
      const msg = cad.text.replace(/--- PAGE \d+ ---|\s/g, "").length < 200
        ? "O caderno não tem texto (parece escaneado). Envie o PDF original baixado do site da AOCP."
        : "Não consegui separar as questões do caderno. Confira se é o caderno do cargo e do tipo de prova informados.";
      await finalizar(src.id, "rejected", msg, src.raw_metadata, { respostas: respostas.size, questoes: 0, nota });
      return json({ status: "rejected", error: msg });
    }
    const paginaConcurso = /^https:\/\//.test(String(src.raw_metadata?.concurso_url || "")) ? src.raw_metadata.concurso_url : null;
    const gabaritoUrl = /^https:\/\//.test(src.answer_key_pdf_url) ? src.answer_key_pdf_url : null;
    let inseridas = 0, anuladas = 0, duplicadas = 0;
    for (const q of qs) {
      const h = await hashStatement(q.statement);
      const { data: dup } = await db.from("question_bank").select("id").eq("statement_hash", h).neq("source_id", src.id).limit(1);
      if ((dup || []).length) { duplicadas++; continue; }
      const anulada = q.answer === "ANULADA";
      const { error: e2 } = await db.from("question_bank").upsert({
        ...q, statement_hash: h, source_id: src.id, board: "AOCP", year: src.year, institution: src.institution, role_name: src.role_name,
        status: anulada ? "annulled" : "validated",
        validation_method: "official_answer_key_pdf", validation_source_type: "official",
        exam_source_type: "official", exam_source_name: "Instituto AOCP (caderno enviado pelo administrador)", exam_source_url: paginaConcurso,
        answer_source_type: "official", answer_source_name: "Instituto AOCP", answer_source_url: gabaritoUrl,
        classification_status: anulada ? "review_needed" : "pending", publication_status: anulada ? "withheld" : "banked",
        captured_at: new Date().toISOString(), updated_at: new Date().toISOString(),
      }, { onConflict: "source_id,question_number" });
      if (!e2) { if (anulada) anuladas++; else inseridas++; }
    }
    const resultado = { respostas: respostas.size, questoes: qs.length, inseridas, anuladas, duplicadas, paginas: cad.paginas, nota };
    await finalizar(src.id, inseridas > 0 ? "validated" : "extracted", null, src.raw_metadata, resultado);
    return json({ status: "ok", ...resultado });
  } catch (e) {
    await finalizar(src.id, "rejected", String((e as Error)?.message || e), src.raw_metadata, null);
    return json({ status: "rejected", error: String((e as Error)?.message || e) });
  }
});
