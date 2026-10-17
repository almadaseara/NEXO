// IA rodando dentro do navegador (WebLLM + WebGPU): grátis, sem chave e funciona offline depois do download.
// O modelo roda num worker para a tela não travar; os arquivos ficam no cache do navegador.
import { ProviderError, parseJsonLoose } from './providers.js';

export const BROWSER_MODELS = [
  { id: 'Qwen3.5-4B-q4f16_1-MLC', label: 'Qwen 3.5 4B — equilibrado (recomendado)', vram: '3,9 GB', vision: false },
  { id: 'Qwen3.5-2B-q4f16_1-MLC', label: 'Qwen 3.5 2B — leve e rápido', vram: '2,2 GB', vision: false },
  { id: 'Qwen3.5-9B-q4f16_1-MLC', label: 'Qwen 3.5 9B — melhor qualidade (PC forte)', vram: '6,4 GB', vision: false },
  { id: 'Phi-3.5-vision-instruct-q4f16_1-MLC', label: 'Phi-3.5 Vision — lê imagens e escrita à mão', vram: '4 GB', vision: true },
];
export const DEFAULT_BROWSER_MODEL = BROWSER_MODELS[0].id;

// Modelos pequenos têm pouca memória de contexto: corta o texto enviado.
// (4096 tokens no total, somando pergunta e resposta)
const MAX_INPUT_CHARS = 7000;

export function webgpuAvailable() {
  return typeof navigator !== 'undefined' && !!navigator.gpu;
}

let engine = null;        // motor carregado
let engineModel = null;   // id do modelo carregado
let loading = null;       // promessa do carregamento em andamento
let progressListener = null;

// ai.js mostra o progresso do download/carregamento por aqui.
export function onBrowserModelProgress(fn) { progressListener = fn; }

export function isBrowserModelLoaded(model) { return !!engine && engineModel === model; }

export function browserModelInfo(id) {
  return BROWSER_MODELS.find((m) => m.id === id) || { id, label: id, vision: /vision/i.test(id) };
}

async function getEngine(model) {
  if (!webgpuAvailable()) {
    throw new ProviderError('Este navegador não tem WebGPU, necessário para a IA no navegador. Use o Chrome ou o Edge atualizados, ou escolha outro provedor.');
  }
  if (engine && engineModel === model) return engine;
  if (loading) return loading;
  loading = (async () => {
    const { CreateWebWorkerMLCEngine } = await import('../vendor/web-llm.mjs');
    if (engine) { try { await engine.unload(); } catch { /* ok */ } engine = null; }
    const worker = new Worker(new URL('../vendor/web-llm-worker.mjs', import.meta.url), { type: 'module' });
    try {
      engine = await CreateWebWorkerMLCEngine(worker, model, {
        initProgressCallback: (p) => progressListener?.({ progress: p.progress ?? 0, text: p.text || '' }),
      });
    } catch (e) {
      worker.terminate();
      const msg = String(e?.message || e);
      if (/out of memory|OOM|allocate|device lost/i.test(msg)) throw new ProviderError('Sem memória de vídeo suficiente para este modelo. Escolha um modelo menor em Assistente → Configurar.');
      if (/fetch|network|Failed to load/i.test(msg)) throw new ProviderError('Não foi possível baixar o modelo. Verifique a internet e tente de novo.');
      throw new ProviderError('Não foi possível iniciar a IA no navegador: ' + msg);
    }
    engineModel = model;
    progressListener?.({ progress: 1, text: 'Pronto' });
    return engine;
  })();
  try { return await loading; } finally { loading = null; }
}

// Já baixado? (os arquivos ficam no cache do navegador)
export async function browserModelCached(model) {
  try {
    const { hasModelInCache } = await import('../vendor/web-llm.mjs');
    return hasModelInCache ? await hasModelInCache(model) : false;
  } catch { return false; }
}

export async function deleteBrowserModel(model) {
  const { deleteModelAllInfoInCache } = await import('../vendor/web-llm.mjs');
  if (engine && engineModel === model) { try { await engine.unload(); } catch { /* ok */ } engine = null; engineModel = null; }
  await deleteModelAllInfoInCache(model);
}

// Remove o "raciocínio" que alguns modelos (Qwen) escrevem antes da resposta.
function stripThinking(text) {
  return text.replace(/<think>[\s\S]*?(<\/think>|$)/g, '').trimStart();
}

export async function askBrowser({ model, system, content, schema, maxTokens = 1200, onText, signal }) {
  maxTokens = Math.min(maxTokens, 1200);
  const info = browserModelInfo(model);
  const eng = await getEngine(model);
  let text = content.filter((b) => b.type === 'text').map((b) => b.text).join('\n\n');
  if (text.length > MAX_INPUT_CHARS) {
    text = text.slice(0, MAX_INPUT_CHARS) + '\n\n[… conteúdo cortado: a IA no navegador só lê um trecho por vez. Use "Página atual" para mais precisão.]';
  }
  const images = info.vision ? content.filter((b) => b.type === 'image').slice(0, 1) : [];
  const userContent = images.length
    ? [{ type: 'text', text }, ...images.map((b) => ({ type: 'image_url', image_url: { url: `data:${b.source.media_type || 'image/jpeg'};base64,${b.source.data}` } }))]
    : text;
  const req = {
    messages: [
      { role: 'system', content: system + (schema ? '\nResponda somente com JSON válido, sem texto antes ou depois.' : '') },
      { role: 'user', content: userContent },
    ],
    stream: true,
    max_tokens: maxTokens,
    temperature: 0.4,
    extra_body: { enable_thinking: false },
  };
  if (schema) req.response_format = { type: 'json_object', schema: JSON.stringify(schema) };
  let out = '';
  const chunks = await eng.chat.completions.create(req);
  for await (const c of chunks) {
    if (signal?.aborted) { try { eng.interruptGenerate(); } catch { /* ok */ } break; }
    const d = c.choices?.[0]?.delta?.content;
    if (d) { out += d; onText?.(stripThinking(out)); }
  }
  out = stripThinking(out);
  return schema ? parseJsonLoose(out) : out;
}
