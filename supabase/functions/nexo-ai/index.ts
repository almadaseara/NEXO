// NEXO — nexo-ai: segunda leitura das provas oficiais e sugestão de módulo.
// Três fontes de leitura, todas gravando pelas mesmas regras (planIngestion em lib.ts):
//   1. rotinas do Claude Code (assinatura, sem custo de API): depositam o resultado em ai_external_extractions;
//   2. Gemini, camada gratuita (segredo GEMINI_API_KEY): lê só as questões que o extrator por posição não resolveu;
//   3. API paga da Anthropic (segredo ANTHROPIC_API_KEY, opcional): Message Batches; desligada sem a chave.
// Leituras entram como "banked". Ao fim de cada "tick" o Gemini sugere o módulo e nexo_auto_publicar() publica
// o que passa nas travas (gabarito oficial conferido, sem alertas graves, módulo com confiança alta/média);
// o resto fica na revisão. Desligar: collector_control.auto_publish = false.
//
// POST {action}: "tick" (padrão) | "ingest_external" | "gemini" | "gemini_classify" | "auto_publish" | "collect" | "submit_extract" | "submit_classify" | "status" | "pdf"
// Autenticação: cabeçalho x-nexo-cron (pg_cron) ou JWT de administrador do NEXO.
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import Anthropic from "npm:@anthropic-ai/sdk@0.135.0";
import {
  MODEL, EXTRACTION_SCHEMA, EXTRACTION_SYSTEM, EXTRACTION_METHOD, buildExtractionInstructions, officialAnswersFromKey, planIngestion,
  splitRange, normalizeStatement, classifySchema, classifySystem, classifyUserText, CONFIDENCE, OUT_OF_CATALOG,
  type CatalogEntry, type ExistingRow,
} from "./lib.ts";
import { geminiClassify, geminiExtract, GeminiQuotaError, GEMINI_CLASSIFY_METHOD, GEMINI_METHOD } from "./gemini.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const db = createClient(SUPABASE_URL, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
const ANTHROPIC_API_KEY = Deno.env.get("ANTHROPIC_API_KEY") || "";
const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY") || "";
const GEMINI_MODEL = Deno.env.get("GEMINI_MODEL") || "gemini-3.8-flash";
const UA = "Mozilla/5.0 (compatible; NEXO-AI/1.1; +https://almadaseara.github.io/NEXO/)";
const BETAS = ["server-side-fallback-2026-07-01"];
const MAX_PDF_BYTES = 20 * 1024 * 1024;
const CLASSIFY_CHUNK = 25;
const GEMINI_CLASSIFY_CHUNK = 40;
const GEMINI_CLASSIFY_CALLS = 3;
const MAX_EXTRACT_ATTEMPTS = 3;
const TIME_BUDGET_MS = 120_000;
type BatchRequest = Anthropic.Beta.Messages.Batches.BatchCreateParams.Request;

const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), {
  status, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
});

async function authorized(req: Request) {
  const token = req.headers.get("x-nexo-cron") || "";
  if (token) {
    const { data, error } = await db.rpc("validate_collector_token", { p_token: token });
    if (!error && data === true) return "cron";
  }
  const authHeader = req.headers.get("authorization") || "";
  if (authHeader.toLowerCase().startsWith("bearer ")) {
    const userDb = createClient(SUPABASE_URL, Deno.env.get("SUPABASE_ANON_KEY")!, { global: { headers: { Authorization: authHeader } } });
    const { data, error } = await userDb.rpc("is_nexo_admin");
    if (!error && data === true) return "admin";
  }
  return null;
}

function toBase64(bytes: Uint8Array) {
  let bin = "";
  for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(bin);
}

async function pdfBytes(ref: string): Promise<Uint8Array> {
  if (ref.startsWith("storage:nexo-provas/")) {
    const { data, error } = await db.storage.from("nexo-provas").download(ref.slice("storage:nexo-provas/".length));
    if (error || !data) throw new Error("PDF do armazenamento indisponível: " + (error?.message || ref));
    return new Uint8Array(await data.arrayBuffer());
  }
  if (!/^https:\/\//.test(ref)) throw new Error("Endereço de PDF inválido: " + ref);
  const r = await fetch(ref, { headers: { "user-agent": UA } });
  if (!r.ok) throw new Error("PDF HTTP " + r.status + " em " + ref);
  const buf = new Uint8Array(await r.arrayBuffer());
  if (buf.length > MAX_PDF_BYTES) throw new Error(`PDF com ${(buf.length / 1048576).toFixed(1)} MB passa do limite de ${MAX_PDF_BYTES / 1048576} MB.`);
  if (!(buf[0] === 0x25 && buf[1] === 0x50 && buf[2] === 0x44 && buf[3] === 0x46)) throw new Error("Arquivo não é PDF: " + ref);
  return buf;
}

async function settings() {
  const { data } = await db.from("collector_control").select("ai_enabled,ai_extract_per_tick,ai_classify_per_tick").eq("id", 1).maybeSingle();
  return { enabled: data?.ai_enabled !== false, extractPerTick: Number(data?.ai_extract_per_tick ?? 4), classifyPerTick: Number(data?.ai_classify_per_tick ?? 300) };
}

async function sha256(s: string) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
}
const pendingOf = (src: any): number[] => Array.isArray(src?.ai_summary?.pending_numbers) ? src.ai_summary.pending_numbers
  : Array.isArray(src?.raw_metadata?.extraction?.pending_numbers) ? src.raw_metadata.extraction.pending_numbers : [];

// ---------------------------------------------------------------- gravação comum a todas as leituras
async function applyExtraction(sourceId: string, ai: any, method: string, opts: { range?: { from: number; to: number } | null; only?: number[] | null } = {}) {
  const { data: src } = await db.from("exam_sources").select("*").eq("id", sourceId).single();
  if (!src) throw new Error("fonte não encontrada");
  const only = opts.only?.length ? new Set(opts.only) : null;
  const { data: existing } = await db.from("question_bank")
    .select("id,question_number,statement,answer,context_id,figure_refs,review_flags").eq("source_id", sourceId);
  const { data: keyDoc } = await db.from("exam_documents").select("extracted_text").eq("source_id", sourceId).eq("document_type", "answer_key").maybeSingle();
  const plan = planIngestion(ai, (existing || []) as ExistingRow[], officialAnswersFromKey(src.board, keyDoc?.extracted_text), src, method, only);

  const ctxIdByKey = new Map<string, string>();
  for (const c of plan.contexts) {
    const context_key = method + ":" + (opts.range ? `${opts.range.from}-${opts.range.to}:` : "") + c.key;
    const { data, error } = await db.from("question_contexts").upsert(
      { source_id: sourceId, context_key, content: c.content, figure_refs: c.figure_refs, updated_at: new Date().toISOString() },
      { onConflict: "source_id,context_key" }).select("id").single();
    if (error) throw new Error("contexto: " + error.message);
    ctxIdByKey.set(c.key, data.id);
  }
  let inserted = 0, occurrences = 0;
  const done = new Set<number>();
  for (const ins of plan.inserts) {
    const statement = String(ins.row.statement);
    const hash = await sha256(normalizeStatement(statement));
    const { data: dup } = await db.from("question_bank").select("id").eq("statement_hash", hash).limit(1);
    if (dup?.length) {
      await db.from("question_occurrences").upsert({ question_id: dup[0].id, source_id: sourceId, question_number: ins.question_number }, { onConflict: "question_id,source_id" });
      occurrences++; done.add(ins.question_number);
      continue;
    }
    const { error } = await db.from("question_bank").insert({
      ...ins.row, source_id: sourceId, statement_hash: hash, context_id: ins.context_key ? ctxIdByKey.get(ins.context_key) ?? null : null,
      captured_at: new Date().toISOString(), updated_at: new Date().toISOString(),
    });
    if (error) throw new Error(`questão ${ins.question_number}: ${error.message}`);
    inserted++; done.add(ins.question_number);
  }
  for (const up of plan.updates) {
    const patch: Record<string, unknown> = { ...up.patch, updated_at: new Date().toISOString() };
    if (up.context_key && ctxIdByKey.has(up.context_key)) patch.context_id = ctxIdByKey.get(up.context_key);
    await db.from("question_bank").update(patch).eq("id", up.id);
    done.add(up.question_number);
  }
  // o que esta leitura não resolveu continua pendente; depois do Gemini, segue para a rotina do Claude
  const before = pendingOf(src);
  const stillPending = (only ? [...only] : before).filter((n) => !done.has(n));
  const remainingRanges = (src.ai_summary?.retry_ranges || []).filter((r: any) => !opts.range || r.from !== opts.range.from || r.to !== opts.range.to);
  const prevParts = Array.isArray(src.ai_summary?.parts) ? src.ai_summary.parts : [];
  const nextStatus = remainingRanges.length && opts.range ? "submitted"
    : stillPending.length && method === GEMINI_METHOD ? "needs_claude"
    : "done";
  await db.from("exam_sources").update({
    ai_status: nextStatus, ai_last_error: null,
    ai_summary: { ...(src.ai_summary || {}), pending_numbers: stillPending, retry_ranges: remainingRanges,
      parts: [...prevParts, { method, range: opts.range || null, only: only ? [...only] : null, ...plan.report, inserted, occurrences, caderno: ai?.caderno || null, at: new Date().toISOString() }] },
    updated_at: new Date().toISOString(),
  }).eq("id", sourceId);
  return { source_id: sourceId, method, inserted, occurrences, pending: stillPending, ...plan.report };
}

async function applyClassification(ids: string[], out: any, valid: Set<string>, method: string) {
  let n = 0;
  for (const c of out?.classificacoes || []) {
    if (!ids.includes(c.id)) continue;
    const mod = c.module_id === OUT_OF_CATALOG || !valid.has(c.module_id) ? OUT_OF_CATALOG : c.module_id;
    await db.from("question_bank").update({
      ai_module_id: mod, ai_module_confidence: CONFIDENCE[c.confianca] ?? 0.4,
      ai_module_reason: `[${method}] ` + String(c.justificativa || "") + (mod === OUT_OF_CATALOG && c.disciplina_sugerida ? ` [${c.disciplina_sugerida}]` : ""),
      ai_classified_at: new Date().toISOString(),
    }).eq("id", c.id).is("ai_module_id", null);
    n++;
  }
  return n;
}

async function loadCatalog(): Promise<CatalogEntry[]> {
  const { data, error } = await db.from("subject_catalog").select("module_id,discipline_name,subject_name,description").eq("active", true).order("module_id");
  if (error) throw error;
  return data || [];
}

// ---------------------------------------------------------------- 1. resultados das rotinas do Claude Code
async function ingestExternal(deadline: number) {
  const { data: rows } = await db.from("ai_external_extractions").select("*").eq("status", "pending").order("created_at").limit(20);
  const out: any[] = [];
  let valid: Set<string> | null = null;
  for (const row of rows || []) {
    if (Date.now() > deadline) break;
    try {
      let result: any;
      if (row.kind === "extract") {
        if (!row.source_id) throw new Error("source_id ausente");
        result = await applyExtraction(row.source_id, row.payload, row.method || "claude_routine_v1", { only: Array.isArray(row.payload?.numeros) ? row.payload.numeros : null });
      } else {
        valid = valid || new Set((await loadCatalog()).map((c) => c.module_id));
        const ids = (row.payload?.classificacoes || []).map((c: any) => String(c.id));
        result = { classified: await applyClassification(ids, row.payload, valid, row.method || "claude_routine_v1") };
      }
      await db.from("ai_external_extractions").update({ status: "done", processed_at: new Date().toISOString(), result }).eq("id", row.id);
      out.push({ id: row.id, ...result });
    } catch (e) {
      await db.from("ai_external_extractions").update({ status: "error", processed_at: new Date().toISOString(), result: { error: String(e) } }).eq("id", row.id);
      out.push({ id: row.id, error: String(e) });
    }
  }
  return out;
}

// ---------------------------------------------------------------- 2. Gemini (camada gratuita)
async function geminiTick(limit: number, deadline: number) {
  if (!GEMINI_API_KEY) return { skipped: "sem GEMINI_API_KEY" };
  const { data: sources } = await db.from("exam_sources").select("*").ilike("provider", "%OFICIAL%").eq("ai_status", "queued")
    .not("exam_pdf_url", "is", null).order("year", { ascending: false }).limit(limit);
  const out: any[] = [];
  for (const src of sources || []) {
    if (Date.now() > deadline - 100_000) break; // cada chamada pode levar até ~110 s
    const numbers = pendingOf(src);
    const full = numbers.length === 0; // sem lista: leitura completa, com o gabarito para conferência
    try {
      // gabarito que a nexo-ai sabe ler sozinha (hoje só Cebraspe); se não cobre os números pedidos, o PDF vai junto
      const { data: keyDoc } = await db.from("exam_documents").select("extracted_text").eq("source_id", src.id).eq("document_type", "answer_key").maybeSingle();
      const known = officialAnswersFromKey(src.board, keyDoc?.extracted_text);
      const needKey = full || numbers.some((n) => !known.has(n));
      const docs = [{ label: "Caderno de questões (oficial):", data: toBase64(await pdfBytes(src.exam_pdf_url)) }];
      if (needKey && src.answer_key_pdf_url) docs.push({ label: "Gabarito definitivo (oficial):", data: toBase64(await pdfBytes(src.answer_key_pdf_url)) });
      const r = await geminiExtract(GEMINI_API_KEY, GEMINI_MODEL, docs, buildExtractionInstructions(src, null, full ? null : numbers, docs.length > 1));
      const applied = await applyExtraction(src.id, r.json, GEMINI_METHOD, { only: full ? null : numbers });
      await db.from("ai_jobs").insert({ kind: "gemini", status: "ingested", ingested_at: new Date().toISOString(), usage: r.usage, summary: { model: r.model, ...applied } });
      out.push(applied);
    } catch (e) {
      if (e instanceof GeminiQuotaError) { out.push({ source_id: src.id, quota: true }); break; }
      const attempts = (src.ai_attempts || 0) + 1;
      await db.from("exam_sources").update({
        ai_status: attempts >= 2 ? "needs_claude" : "queued", ai_attempts: attempts, ai_last_error: "Gemini: " + String(e), updated_at: new Date().toISOString(),
      }).eq("id", src.id);
      out.push({ source_id: src.id, error: String(e) });
    }
  }
  return out;
}

// Sugestão de módulo pelo Gemini: até GEMINI_CLASSIFY_CALLS lotes por execução, na mesma fila da rotina do Claude.
async function geminiClassifyTick(deadline: number) {
  if (!GEMINI_API_KEY) return { skipped: "sem GEMINI_API_KEY" };
  let catalog: CatalogEntry[] | null = null;
  let classified = 0;
  for (let call = 0; call < GEMINI_CLASSIFY_CALLS && Date.now() < deadline - 40_000; call++) {
    const { data: qs, error } = await db.rpc("nexo_rotina_fila_classificacao", { p_limite: GEMINI_CLASSIFY_CHUNK, p_offset: 0 });
    if (error) throw error;
    if (!qs?.length) break;
    catalog = catalog || await loadCatalog();
    try {
      const r = await geminiClassify(GEMINI_API_KEY, GEMINI_MODEL, classifySystem(catalog), classifyUserText(qs.map((q: any) => ({
        id: q.id, statement: q.statement, options: q.options, board: q.board, year: q.year, context: q.texto_base,
      }))), classifySchema(catalog));
      classified += await applyClassification(qs.map((q: any) => q.id), r.json, new Set(catalog.map((c) => c.module_id)), GEMINI_CLASSIFY_METHOD);
    } catch (e) {
      if (e instanceof GeminiQuotaError) return { classified, quota: true };
      return { classified, error: String(e) };
    }
  }
  return { classified };
}

// ---------------------------------------------------------------- 3. API paga da Anthropic (opcional)
async function submitExtract(client: Anthropic, limit: number, sourceIds?: string[]) {
  let q = db.from("exam_sources").select("*").ilike("provider", "%OFICIAL%")
    .not("exam_pdf_url", "is", null).not("answer_key_pdf_url", "is", null).lt("ai_attempts", MAX_EXTRACT_ATTEMPTS);
  q = sourceIds?.length ? q.in("id", sourceIds) : q.in("ai_status", ["queued", "needs_claude"]);
  const { data: sources, error } = await q.order("year", { ascending: false }).limit(Math.max(0, limit));
  if (error) throw error;
  if (!sources?.length) return { submitted: 0 };

  const requests: BatchRequest[] = [];
  const items: Record<string, { source_id: string; range: { from: number; to: number } | null; only: number[] | null }> = {};
  const failed: string[] = [];
  for (const src of sources) {
    try {
      const [exam, key] = await Promise.all([pdfBytes(src.exam_pdf_url), pdfBytes(src.answer_key_pdf_url)]);
      const ranges: ({ from: number; to: number } | null)[] = src.ai_summary?.retry_ranges?.length ? src.ai_summary.retry_ranges : [null];
      const only = pendingOf(src);
      ranges.forEach((range, i) => {
        const custom_id = `ex_${String(src.id).replace(/-/g, "")}_${i}`;
        items[custom_id] = { source_id: src.id, range, only: only.length ? only : null };
        requests.push({
          custom_id,
          params: {
            model: MODEL,
            max_tokens: 120000,
            fallbacks: "default",
            output_config: { effort: "medium", format: { type: "json_schema", schema: EXTRACTION_SCHEMA } },
            system: EXTRACTION_SYSTEM,
            messages: [{
              role: "user",
              content: [
                { type: "document", title: "Caderno de questões (oficial)", source: { type: "base64", media_type: "application/pdf", data: toBase64(exam) } },
                { type: "document", title: "Gabarito definitivo (oficial)", source: { type: "base64", media_type: "application/pdf", data: toBase64(key) } },
                { type: "text", text: buildExtractionInstructions(src, range, only.length ? only : null) },
              ],
            }],
          },
        });
      });
    } catch (e) {
      failed.push(src.id);
      await db.from("exam_sources").update({
        ai_status: "error", ai_attempts: (src.ai_attempts || 0) + 1, ai_last_error: String(e), updated_at: new Date().toISOString(),
      }).eq("id", src.id);
    }
  }
  if (!requests.length) return { submitted: 0, failed };

  const batch = await client.beta.messages.batches.create({ requests, betas: BETAS });
  const { data: job, error: jobErr } = await db.from("ai_jobs").insert({ kind: "extract", batch_id: batch.id, items }).select("id").single();
  if (jobErr) throw jobErr;
  const ids = [...new Set(Object.values(items).map((x) => x.source_id))];
  for (const src of sources.filter((s) => ids.includes(s.id))) {
    await db.from("exam_sources").update({
      ai_status: "submitted", ai_job_id: job.id, ai_attempts: (src.ai_attempts || 0) + 1, ai_last_error: null, updated_at: new Date().toISOString(),
    }).eq("id", src.id);
  }
  return { submitted: requests.length, sources: ids.length, batch_id: batch.id, failed };
}

async function submitClassify(client: Anthropic, limit: number) {
  const { count: pending } = await db.from("ai_jobs").select("id", { count: "exact", head: true }).eq("kind", "classify").eq("status", "submitted");
  if ((pending || 0) > 0) return { submitted: 0, reason: "lote de classificação ainda em andamento" };
  const { data: mapped } = await db.from("question_module_map").select("question_id");
  const done = new Set((mapped || []).map((m: any) => m.question_id));
  const { data: qs, error } = await db.from("question_bank")
    .select("id,statement,options,board,year,context_id,question_contexts(content)")
    .eq("status", "validated").in("publication_status", ["banked", "ready", "published"]).is("ai_module_id", null)
    .order("year", { ascending: false }).limit(Math.max(0, limit) + done.size);
  if (error) throw error;
  const todo = (qs || []).filter((q: any) => !done.has(q.id)).slice(0, limit);
  if (!todo.length) return { submitted: 0 };
  const catalog = await loadCatalog();
  const schema = classifySchema(catalog);
  const system: Anthropic.Beta.Messages.BetaTextBlockParam[] = [{ type: "text", text: classifySystem(catalog), cache_control: { type: "ephemeral" } }];
  const requests: BatchRequest[] = [];
  const items: Record<string, string[]> = {};
  for (let i = 0; i < todo.length; i += CLASSIFY_CHUNK) {
    const chunk = todo.slice(i, i + CLASSIFY_CHUNK);
    const custom_id = `cl_${i / CLASSIFY_CHUNK}`;
    items[custom_id] = chunk.map((q: any) => q.id);
    requests.push({
      custom_id,
      params: {
        model: MODEL, max_tokens: 16000, fallbacks: "default",
        output_config: { effort: "low", format: { type: "json_schema", schema } },
        system,
        messages: [{ role: "user", content: classifyUserText(chunk.map((q: any) => ({
          id: q.id, statement: q.statement, options: q.options, board: q.board, year: q.year,
          context: q.question_contexts?.content || null,
        }))) }],
      },
    });
  }
  const batch = await client.beta.messages.batches.create({ requests, betas: BETAS });
  const { error: jobErr } = await db.from("ai_jobs").insert({ kind: "classify", batch_id: batch.id, items });
  if (jobErr) throw jobErr;
  return { submitted: requests.length, questions: todo.length, batch_id: batch.id };
}

function textOf(message: any): string {
  return (message?.content || []).filter((b: any) => b.type === "text").map((b: any) => b.text).join("");
}
function addUsage(acc: any, u: any) {
  for (const k of ["input_tokens", "output_tokens", "cache_read_input_tokens", "cache_creation_input_tokens"]) acc[k] = (acc[k] || 0) + (u?.[k] || 0);
}

async function ingestAnthropicExtraction(item: { source_id: string; range: { from: number; to: number } | null; only?: number[] | null }, message: any) {
  const sourceId = item.source_id, range = item.range;
  if (message.stop_reason === "max_tokens") {
    const { data: src } = await db.from("exam_sources").select("*").eq("id", sourceId).single();
    const { data: rows } = await db.from("question_bank").select("question_number").eq("source_id", sourceId);
    const { data: keyDoc } = await db.from("exam_documents").select("extracted_text").eq("source_id", sourceId).eq("document_type", "answer_key").maybeSingle();
    const nums = [...officialAnswersFromKey(src?.board, keyDoc?.extracted_text).keys(), ...(rows || []).map((r: any) => r.question_number)];
    const parts = splitRange(nums, range);
    await db.from("exam_sources").update({
      ai_status: parts ? "queued" : "error", ai_last_error: "Resposta da IA cortada por tamanho" + (parts ? "; refazendo em partes." : "."),
      ai_summary: { ...(src?.ai_summary || {}), retry_ranges: parts || [] }, updated_at: new Date().toISOString(),
    }).eq("id", sourceId);
    return { source_id: sourceId, retry: !!parts };
  }
  if (message.stop_reason === "refusal") throw new Error("A IA recusou a extração (" + (message.stop_details?.category || "sem categoria") + ").");
  return await applyExtraction(sourceId, JSON.parse(textOf(message)), EXTRACTION_METHOD, { range, only: item.only || null });
}

async function collect(client: Anthropic) {
  const { data: jobs } = await db.from("ai_jobs").select("*").eq("status", "submitted").not("batch_id", "is", null).order("created_at");
  const out: any[] = [];
  for (const job of jobs || []) {
    const batch = await client.beta.messages.batches.retrieve(job.batch_id, { betas: BETAS });
    if (batch.processing_status !== "ended") { out.push({ batch_id: job.batch_id, status: batch.processing_status }); continue; }
    const usage: any = {};
    const results: any[] = [];
    const valid = job.kind === "classify" ? new Set((await loadCatalog()).map((c) => c.module_id)) : new Set<string>();
    for await (const r of await client.beta.messages.batches.results(job.batch_id, { betas: BETAS })) {
      const item = job.items?.[r.custom_id];
      if (!item) continue;
      try {
        if (r.result.type !== "succeeded") {
          const why = r.result.type === "errored" ? JSON.stringify((r.result as any).error) : r.result.type;
          if (job.kind === "extract") {
            await db.from("exam_sources").update({ ai_status: "error", ai_last_error: "Lote: " + why, updated_at: new Date().toISOString() }).eq("id", item.source_id);
          }
          results.push({ custom_id: r.custom_id, error: why });
          continue;
        }
        const message = r.result.message;
        addUsage(usage, message.usage);
        if (job.kind === "extract") results.push(await ingestAnthropicExtraction(item, message));
        else {
          if (message.stop_reason === "refusal" || message.stop_reason === "max_tokens") throw new Error("classificação interrompida: " + message.stop_reason);
          results.push({ custom_id: r.custom_id, classified: await applyClassification(item, JSON.parse(textOf(message)), valid, "claude_api") });
        }
      } catch (e) {
        if (job.kind === "extract") {
          await db.from("exam_sources").update({ ai_status: "error", ai_last_error: String(e), updated_at: new Date().toISOString() }).eq("id", item.source_id);
        }
        results.push({ custom_id: r.custom_id, error: String(e) });
      }
    }
    await db.from("ai_jobs").update({
      status: "ingested", ingested_at: new Date().toISOString(), usage,
      summary: { counts: batch.request_counts, results: results.slice(0, 200) },
    }).eq("id", job.id);
    out.push({ batch_id: job.batch_id, kind: job.kind, ingested: results.length, usage });
  }
  return out;
}

// ---------------------------------------------------------------- entrada
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type", "Access-Control-Allow-Methods": "POST, OPTIONS" } });
  if (req.method !== "POST") return json({ status: "POST only" }, 405);
  const who = await authorized(req);
  if (!who) return json({ status: "unauthorized" }, 401);
  const body = await req.json().catch(() => ({}));
  const action = String(body?.action || "tick");
  const deadline = Date.now() + TIME_BUDGET_MS;
  if (action === "pdf") {
    // Entrega ao painel de revisão o caderno oficial de uma fonte cadastrada (o navegador não lê o PDF
    // direto do site da banca por causa de CORS). Só administrador e só PDFs que já estão em exam_sources.
    if (who !== "admin") return json({ status: "forbidden" }, 403);
    const { data: src } = await db.from("exam_sources").select("exam_pdf_url").eq("id", String(body?.source_id || "")).maybeSingle();
    if (!src?.exam_pdf_url) return json({ status: "not_found" }, 404);
    try {
      const bytes = await pdfBytes(src.exam_pdf_url);
      return new Response(bytes as unknown as BodyInit, { headers: { "Content-Type": "application/pdf", "Access-Control-Allow-Origin": "*", "Cache-Control": "private, max-age=3600" } });
    } catch (e) { return json({ status: "error", error: String(e) }, 502); }
  }
  if (action === "status") {
    const { data: jobs } = await db.from("ai_jobs").select("kind,status,batch_id,created_at,ingested_at,usage,error").order("created_at", { ascending: false }).limit(10);
    return json({ status: "ok", gemini: Boolean(GEMINI_API_KEY), gemini_model: GEMINI_MODEL, anthropic_api: Boolean(ANTHROPIC_API_KEY), jobs });
  }
  const cfg = await settings();
  if (!cfg.enabled && who === "cron") return json({ status: "disabled" });
  const client = ANTHROPIC_API_KEY ? new Anthropic({ apiKey: ANTHROPIC_API_KEY }) : null;
  try {
    const result: any = { status: "ok", action };
    if (action === "tick" || action === "ingest_external") result.external = await ingestExternal(deadline);
    if (client && (action === "tick" || action === "collect")) result.collected = await collect(client);
    if (action === "tick" || action === "gemini") result.gemini = await geminiTick(cfg.extractPerTick, deadline);
    if (action === "tick" || action === "gemini_classify") result.gemini_classify = await geminiClassifyTick(deadline);
    if (client && (action === "tick" || action === "submit_extract")) {
      const ids = Array.isArray(body?.source_ids) ? body.source_ids.map(String) : undefined;
      result.extract = await submitExtract(client, ids?.length ? ids.length : cfg.extractPerTick, ids);
    }
    if (client && (action === "tick" || action === "submit_classify")) result.classify = await submitClassify(client, Number(body?.limit) || cfg.classifyPerTick);
    if (action === "tick" || action === "auto_publish") {
      const { data, error } = await db.rpc("nexo_auto_publicar", {});
      result.auto_publish = error ? { error: error.message } : data;
    }
    if (!client && (action === "collect" || action === "submit_extract" || action === "submit_classify")) result.anthropic_api = "desligada (sem ANTHROPIC_API_KEY)";
    return json(result);
  } catch (e) {
    if (e instanceof Anthropic.AuthenticationError) return json({ status: "error", error: "Chave da Anthropic inválida." }, 500);
    if (e instanceof Anthropic.RateLimitError) return json({ status: "rate_limited", error: e.message }, 429);
    if (e instanceof Anthropic.APIError) return json({ status: "error", error: `Anthropic ${e.status}: ${e.message}` }, 502);
    return json({ status: "error", error: String(e) }, 500);
  }
});
