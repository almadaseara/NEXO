// Provedores de IA alternativos ao Claude: Google Gemini (nuvem, com nível gratuito) e Ollama (no próprio PC).
// Recebem o mesmo formato de conteúdo usado com o Claude: blocos { type: 'text' } e { type: 'image', source: { data } }.

export class ProviderError extends Error {}

const GEMINI_BASE = 'https://generativelanguage.googleapis.com/v1beta';
export const OLLAMA_DEFAULT_URL = 'http://localhost:11434';

// Pede JSON pelo texto do prompt (funciona em qualquer modelo) e limpa a resposta.
function schemaInstruction(schema) {
  return '\n\nResponda SOMENTE com um JSON válido (sem texto antes ou depois, sem ```), seguindo exatamente este JSON Schema:\n' + JSON.stringify(schema);
}

export function parseJsonLoose(text) {
  const t = String(text).trim().replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/, '');
  try { return JSON.parse(t); } catch { /* tenta extrair o objeto */ }
  const a = t.indexOf('{'), b = t.lastIndexOf('}');
  if (a >= 0 && b > a) return JSON.parse(t.slice(a, b + 1));
  throw new ProviderError('A IA não devolveu um resultado no formato esperado. Tente de novo.');
}

// Lê um corpo em streaming linha a linha.
async function* readLines(res, signal) {
  const reader = res.body.getReader();
  const dec = new TextDecoder();
  let buf = '';
  while (true) {
    if (signal?.aborted) { reader.cancel(); return; }
    const { done, value } = await reader.read();
    if (done) break;
    buf += dec.decode(value, { stream: true });
    let i;
    while ((i = buf.indexOf('\n')) >= 0) {
      yield buf.slice(0, i).replace(/\r$/, '');
      buf = buf.slice(i + 1);
    }
  }
  if (buf.trim()) yield buf;
}

// ---------- Google Gemini ----------
function geminiError(status, body) {
  const msg = body?.error?.message || '';
  if (status === 400 && /api key/i.test(msg)) return new ProviderError('Chave do Gemini inválida. Confira em Assistente → Configurar.');
  if (status === 403) return new ProviderError('Sua chave do Gemini não tem acesso a este modelo.');
  if (status === 404) return Object.assign(new ProviderError('Modelo do Gemini não encontrado. Escolha outro em Assistente → Configurar.'), { code: 'model_not_found' });
  if (status === 429) return new ProviderError('Limite gratuito do Gemini atingido. Espere um pouco e tente de novo.');
  return new ProviderError(`Erro do Gemini (${status})${msg ? ': ' + msg : ''}`);
}

export async function geminiModels(apiKey) {
  const res = await fetch(`${GEMINI_BASE}/models?pageSize=200`, { headers: { 'x-goog-api-key': apiKey } });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw geminiError(res.status, body);
  return (body.models || [])
    .filter((m) => (m.supportedGenerationMethods || []).includes('generateContent') && /gemini/i.test(m.name))
    .map((m) => ({ id: m.name.replace(/^models\//, ''), label: m.displayName || m.name }))
    .filter((m) => !/embedding|aqa|tts|image-generation|live/i.test(m.id));
}

// Escolhe o melhor modelo para estudar: versão mais nova da linha "flash" (rápida e no nível gratuito),
// evitando versões experimentais e "lite" quando houver alternativa.
export function pickGeminiModel(list) {
  const version = (id) => parseFloat((id.match(/gemini-(\d+(?:\.\d+)?)/) || [])[1] || '0');
  const newest = Math.max(0, ...list.map((m) => version(m.id.toLowerCase())));
  const score = (m) => {
    const id = m.id.toLowerCase();
    // apelidos "…-latest" sem número apontam sempre para a versão mais nova
    let s = (version(id) || (id.includes('latest') ? newest + 0.5 : 0)) * 100;
    if (id.includes('flash')) s += 50;
    if (id.includes('lite')) s -= 30;
    if (/preview|exp|thinking/.test(id)) s -= 20;
    if (id.includes('latest')) s += 5;
    return s;
  };
  return [...list].sort((a, b) => score(b) - score(a))[0]?.id || null;
}

export async function askGemini({ apiKey, model, system, content, schema, maxTokens = 8192, onText, signal }) {
  const parts = content.map((b) => (b.type === 'image'
    ? { inline_data: { mime_type: b.source.media_type || 'image/png', data: b.source.data } }
    : { text: b.text }));
  const body = {
    systemInstruction: { parts: [{ text: system + (schema ? schemaInstruction(schema) : '') }] },
    contents: [{ role: 'user', parts }],
    generationConfig: { maxOutputTokens: maxTokens, ...(schema ? { responseMimeType: 'application/json' } : {}) },
  };
  let res;
  try {
    res = await fetch(`${GEMINI_BASE}/models/${encodeURIComponent(model)}:streamGenerateContent?alt=sse`, {
      method: 'POST', signal,
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
      body: JSON.stringify(body),
    });
  } catch (e) {
    if (e.name === 'AbortError') throw e;
    throw new ProviderError('Sem conexão com o Gemini. Verifique a internet.');
  }
  if (!res.ok) throw geminiError(res.status, await res.json().catch(() => ({})));
  let text = '', blocked = false;
  for await (const line of readLines(res, signal)) {
    if (!line.startsWith('data:')) continue;
    let chunk;
    try { chunk = JSON.parse(line.slice(5)); } catch { continue; }
    if (chunk.promptFeedback?.blockReason) blocked = true;
    for (const c of chunk.candidates || []) {
      for (const p of c.content?.parts || []) if (p.text && !p.thought) text += p.text;
      if (c.finishReason === 'SAFETY') blocked = true;
    }
    onText?.(text);
  }
  if (!text && blocked) throw new ProviderError('O Gemini não respondeu a este pedido por causa dos filtros de segurança.');
  return schema ? parseJsonLoose(text) : text;
}

// ---------- Ollama (roda no computador) ----------
function ollamaUnreachable(url) {
  return new ProviderError(`Não encontrei o Ollama em ${url}. Abra o Ollama no computador (ele precisa estar rodando) e tente de novo.`);
}

export async function ollamaModels(url = OLLAMA_DEFAULT_URL) {
  let res;
  try { res = await fetch(`${url.replace(/\/$/, '')}/api/tags`); } catch { throw ollamaUnreachable(url); }
  if (!res.ok) throw ollamaUnreachable(url);
  const body = await res.json();
  return (body.models || []).map((m) => ({ id: m.name, label: m.name }));
}

export async function askOllama({ url = OLLAMA_DEFAULT_URL, model, system, content, schema, onText, signal }) {
  const text = content.filter((b) => b.type === 'text').map((b) => b.text).join('\n\n');
  const images = content.filter((b) => b.type === 'image').map((b) => b.source.data);
  const body = {
    model,
    stream: true,
    messages: [
      { role: 'system', content: system + (schema ? schemaInstruction(schema) : '') },
      { role: 'user', content: text, ...(images.length ? { images } : {}) },
    ],
    ...(schema ? { format: schema } : {}),
  };
  let res;
  try {
    res = await fetch(`${url.replace(/\/$/, '')}/api/chat`, { method: 'POST', signal, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  } catch (e) {
    if (e.name === 'AbortError') throw e;
    throw ollamaUnreachable(url);
  }
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    const msg = err.error || '';
    if (res.status === 404 || /not found/i.test(msg)) throw new ProviderError(`O modelo “${model}” não está instalado no Ollama. Rode: ollama pull ${model}`);
    if (images.length && /image|vision|multimodal/i.test(msg)) throw new ProviderError('Este modelo do Ollama não entende imagens. Use um modelo com visão (ex.: llama3.2-vision ou qwen2.5vl).');
    throw new ProviderError(`Erro do Ollama: ${msg || res.status}`);
  }
  let out = '';
  for await (const line of readLines(res, signal)) {
    if (!line.trim()) continue;
    let chunk;
    try { chunk = JSON.parse(line); } catch { continue; }
    if (chunk.error) throw new ProviderError(`Erro do Ollama: ${chunk.error}`);
    if (chunk.message?.content) { out += chunk.message.content; onText?.(out); }
  }
  return schema ? parseJsonLoose(out) : out;
}
