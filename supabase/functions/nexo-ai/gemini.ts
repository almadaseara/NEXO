// NEXO — leitor gratuito (camada gratuita da API do Google Gemini) para as questões que o extrator
// por posição não resolveu. Chamada direta ao endpoint REST generateContent; sem SDK.
// Os limites gratuitos são por projeto e mudam sem aviso: 429 = cota esgotada, a fila espera.
import { EXTRACTION_SCHEMA, EXTRACTION_SYSTEM, toGeminiSchema } from "./lib.ts";

export const GEMINI_CLASSIFY_METHOD = "gemini_classify_v1";

export const GEMINI_METHOD = "gemini_pdf_v1";
export class GeminiQuotaError extends Error {}

const SCHEMA = toGeminiSchema(EXTRACTION_SCHEMA);

export function geminiExtract(apiKey: string, model: string, docs: { data: string; label: string }[], instructions: string) {
  const parts = [
    ...docs.flatMap((d) => [{ text: d.label }, { inline_data: { mime_type: "application/pdf", data: d.data } }]),
    { text: instructions },
  ];
  return geminiJson(apiKey, model, EXTRACTION_SYSTEM, parts, SCHEMA);
}

// Sugestão de módulo: só texto, um pedido por lote de questões.
export function geminiClassify(apiKey: string, model: string, system: string, userText: string, schema: any) {
  return geminiJson(apiKey, model, system, [{ text: userText }], toGeminiSchema(schema), 16384);
}

async function geminiJson(apiKey: string, model: string, system: string, parts: any[], schema: any, maxOutputTokens = 32768) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`;
  const body = {
    systemInstruction: { parts: [{ text: system }] },
    contents: [{ role: "user", parts }],
    generationConfig: { responseMimeType: "application/json", responseSchema: schema, temperature: 0, maxOutputTokens },
  };
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 110_000);
  let r: Response;
  try {
    r = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey }, body: JSON.stringify(body), signal: ctrl.signal });
  } finally { clearTimeout(timer); }
  const txt = await r.text();
  if (r.status === 429) throw new GeminiQuotaError("Cota gratuita do Gemini esgotada (429).");
  if (!r.ok) throw new Error(`Gemini HTTP ${r.status}: ${txt.slice(0, 300)}`);
  const j = JSON.parse(txt);
  const cand = j?.candidates?.[0];
  const finish = String(cand?.finishReason || "");
  if (j?.promptFeedback?.blockReason) throw new Error("Gemini bloqueou o pedido: " + j.promptFeedback.blockReason);
  if (finish === "MAX_TOKENS") throw new Error("Resposta do Gemini cortada por tamanho (MAX_TOKENS).");
  const text = (cand?.content?.parts || []).map((p: any) => p.text || "").join("");
  if (!text) throw new Error("Gemini não devolveu texto (" + (finish || "sem motivo") + ").");
  return { json: JSON.parse(text), usage: j?.usageMetadata || null, model: j?.modelVersion || model };
}
