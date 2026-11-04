// NEXO · Quiz entre amigos: lê o texto de um trecho de prova enviado pelo administrador e devolve as perguntas em JSON.
// Não grava nada no banco. Aceita só usuário administrador (is_nexo_admin). Leitor: Gemini (camada gratuita), chave GEMINI_API_KEY.
import { createClient } from "npm:@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;
const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY") || "";
const GEMINI_MODEL = Deno.env.get("GEMINI_MODEL") || "gemini-3.8-flash";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...CORS, "Content-Type": "application/json" } });

const SYSTEM = "Você extrai questões de múltipla escolha de trechos de provas de concurso. Responda só com o JSON pedido.";
const INSTRUCTIONS =
  "Extraia cada questão de múltipla escolha COMPLETA do trecho. alternativas: textos sem a letra, de 2 a 5 itens. " +
  "gabarito: a letra correta (A a E) quando o trecho trouxer o gabarito; use NULL quando não trouxer. " +
  "disciplina: a disciplina da questão (ex.: Direito Penal). Ignore questões cortadas no início ou no fim do trecho. " +
  "Se não houver questões, devolva questions vazio.";

// Schema no formato que a API do Gemini aceita (tipos em maiúsculas).
const SCHEMA = {
  type: "OBJECT",
  properties: {
    questions: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: {
          pergunta: { type: "STRING" },
          alternativas: { type: "ARRAY", items: { type: "STRING" } },
          gabarito: { type: "STRING", enum: ["A", "B", "C", "D", "E", "NULL"] },
          disciplina: { type: "STRING" },
        },
        required: ["pergunta", "alternativas", "gabarito", "disciplina"],
      },
    },
  },
  required: ["questions"],
};

async function lerComGemini(texto: string) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(GEMINI_MODEL)}:generateContent`;
  const body = {
    systemInstruction: { parts: [{ text: SYSTEM }] },
    contents: [{ role: "user", parts: [{ text: INSTRUCTIONS + "\n\nTRECHO:\n\n" + texto }] }],
    generationConfig: { responseMimeType: "application/json", responseSchema: SCHEMA, temperature: 0, maxOutputTokens: 16384 },
  };
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 110_000);
  let r: Response;
  try {
    r = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json", "x-goog-api-key": GEMINI_API_KEY }, body: JSON.stringify(body), signal: ctrl.signal });
  } finally { clearTimeout(timer); }
  const txt = await r.text();
  if (r.status === 429) return { quota: true as const };
  if (!r.ok) throw new Error(`Gemini ${r.status}: ${txt.slice(0, 300)}`);
  const parte = JSON.parse(txt)?.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
  return { quota: false as const, data: JSON.parse(parte) };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: CORS });
  if (req.method !== "POST") return json({ status: "POST only" }, 405);

  const auth = req.headers.get("authorization") || "";
  if (!auth.toLowerCase().startsWith("bearer ")) return json({ status: "unauthorized" }, 401);
  const userDb = createClient(SUPABASE_URL, ANON_KEY, { global: { headers: { Authorization: auth } } });
  const { data: ehAdmin, error: erroAdmin } = await userDb.rpc("is_nexo_admin");
  if (erroAdmin || ehAdmin !== true) return json({ status: "forbidden" }, 403);

  const body = await req.json().catch(() => ({}));
  const trecho = String(body?.text || "").slice(0, 20000);
  if (!trecho.trim()) return json({ status: "error", error: "texto vazio" }, 400);
  if (!GEMINI_API_KEY) return json({ status: "error", error: "leitor de texto indisponível (sem GEMINI_API_KEY)" }, 503);

  try {
    const r = await lerComGemini(trecho);
    if (r.quota) return json({ status: "rate_limited", error: "cota gratuita do leitor esgotada; tente de novo mais tarde" }, 429);
    const lista = Array.isArray(r.data?.questions) ? r.data.questions : [];
    return json({ status: "ok", questions: lista });
  } catch (e) {
    return json({ status: "error", error: String(e) }, 502);
  }
});
