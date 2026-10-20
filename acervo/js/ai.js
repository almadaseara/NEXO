// Assistente de IA. Provedores: Claude (API da Anthropic), Google Gemini (tem nível gratuito)
// e Ollama (roda no próprio computador, grátis). As chamadas saem direto do navegador.
// O SDK da Anthropic (300 KB) só é baixado na primeira chamada ao Claude.
let Anthropic = null;
import { h, icon, modal, toast, progressDialog, escapeHtml } from './ui.js';
import { renderPageFlat } from './render.js';
import { addCards, ensureNotebookDeck, allDecks } from './study.js';
import {
  askBrowser, BROWSER_MODELS, DEFAULT_BROWSER_MODEL, webgpuAvailable, browserModelInfo, browserModelCached,
  deleteBrowserModel, isBrowserModelLoaded, onBrowserModelProgress,
} from './browserai.js';
import { askGemini, askOllama, geminiModels, ollamaModels, pickGeminiModel, ProviderError, OLLAMA_DEFAULT_URL } from './providers.js';

export const PROVIDERS = { claude: 'Claude', gemini: 'Google Gemini', ollama: 'Ollama (no PC)', browser: 'No navegador' };
export const MODELS = {
  'claude-opus-5-5': 'Claude Opus 5.5 (melhor qualidade)',
  'claude-sonnet-5-5': 'Claude Sonnet 5.5 (equilibrado)',
  'claude-haiku-5-5': 'Claude Haiku 5.5 (mais rápido e barato)',
};
const DEFAULT_MODEL = 'claude-opus-5-5';
const DEFAULT_GEMINI_MODEL = 'gemini-2.5-flash';
// Recusas de segurança são reencaminhadas automaticamente a outro modelo no servidor.
const FALLBACK_MODELS = new Set(['claude-opus-5-5', 'claude-sonnet-5-5']);

// ---------- Configuração ----------
const KEYS = {
  provider: 'acervo.ai.provider',
  claudeKey: 'acervo.ai.key', claudeModel: 'acervo.ai.model',
  geminiKey: 'acervo.ai.gemini.key', geminiModel: 'acervo.ai.gemini.model',
  ollamaUrl: 'acervo.ai.ollama.url', ollamaModel: 'acervo.ai.ollama.model',
  browserModel: 'acervo.ai.browser.model',
};
const read = (k) => { try { return localStorage.getItem(k) || ''; } catch { return ''; } };
const write = (k, v) => { try { if (v) localStorage.setItem(k, v); else localStorage.removeItem(k); } catch { /* sem armazenamento */ } };

export function aiConfig() {
  return {
    provider: read(KEYS.provider) || 'claude',
    apiKey: read(KEYS.claudeKey),
    model: read(KEYS.claudeModel) || DEFAULT_MODEL,
    geminiKey: read(KEYS.geminiKey),
    geminiModel: read(KEYS.geminiModel) || DEFAULT_GEMINI_MODEL,
    ollamaUrl: read(KEYS.ollamaUrl) || OLLAMA_DEFAULT_URL,
    ollamaModel: read(KEYS.ollamaModel),
    browserModel: read(KEYS.browserModel) || DEFAULT_BROWSER_MODEL,
  };
}

export function aiConfigured() {
  const c = aiConfig();
  if (c.provider === 'gemini') return !!c.geminiKey;
  if (c.provider === 'ollama') return !!c.ollamaModel;
  if (c.provider === 'browser') return webgpuAvailable();
  return !!c.apiKey;
}

export async function aiSettingsDialog() {
  const cfg = aiConfig();
  return modal((box, close) => {
    let provider = cfg.provider;
    const body = h('div');
    const tabs = h('div', { class: 'seg', style: { marginBottom: '14px' } });
    // campos de cada provedor (mantidos ao trocar de aba)
    const claudeKey = h('input', { class: 'input', type: 'password', placeholder: 'sk-ant-…', autocomplete: 'off', value: cfg.apiKey });
    const claudeModel = h('select', { class: 'select' }, ...Object.entries(MODELS).map(([id, label]) =>
      h('option', { value: id, selected: id === cfg.model ? 'selected' : null }, label)));
    const geminiKey = h('input', { class: 'input', type: 'password', placeholder: 'AIza…', autocomplete: 'off', value: cfg.geminiKey });
    const geminiModel = h('select', { class: 'select' }, h('option', { value: cfg.geminiModel }, cfg.geminiModel));
    const geminiStatus = h('span', { class: 'muted small' });
    const ollamaUrl = h('input', { class: 'input', value: cfg.ollamaUrl, placeholder: OLLAMA_DEFAULT_URL });
    const ollamaModel = h('select', { class: 'select' }, cfg.ollamaModel ? h('option', { value: cfg.ollamaModel }, cfg.ollamaModel) : h('option', { value: '' }, '(clique em Atualizar)'));
    const ollamaStatus = h('span', { class: 'muted small' });
    const browserModel = h('select', { class: 'select' }, ...BROWSER_MODELS.map((m) =>
      h('option', { value: m.id, selected: m.id === cfg.browserModel ? 'selected' : null }, `${m.label} · ${m.vram} de memória de vídeo`)));
    const browserStatus = h('span', { class: 'muted small' });
    const checkBrowser = async () => {
      browserStatus.textContent = (await browserModelCached(browserModel.value)) ? '✓ Já baixado neste navegador: funciona até offline.' : 'Ainda não baixado: o download acontece no primeiro uso.';
    };
    browserModel.addEventListener('change', checkBrowser);

    const fillSelect = (sel, list, current) => {
      sel.replaceChildren(...list.map((m) => h('option', { value: m.id, selected: m.id === current ? 'selected' : null }, m.label === m.id ? m.id : `${m.label} (${m.id})`)));
      if (current && !list.some((m) => m.id === current)) sel.prepend(h('option', { value: current, selected: 'selected' }, current));
    };
    const loadGemini = async () => {
      if (!geminiKey.value.trim()) { geminiStatus.textContent = 'Cole a chave para listar os modelos.'; return; }
      geminiStatus.textContent = 'Buscando modelos…';
      try {
        const list = await geminiModels(geminiKey.value.trim());
        const current = list.some((m) => m.id === geminiModel.value) ? geminiModel.value : pickGeminiModel(list);
        fillSelect(geminiModel, list, current);
        geminiLoaded = true;
        geminiStatus.textContent = `${list.length} modelos disponíveis para sua chave. Os “flash” são rápidos e entram no nível gratuito.`;
      } catch (e) { geminiStatus.textContent = e.message; }
    };
    const loadOllama = async () => {
      ollamaStatus.textContent = 'Procurando o Ollama…';
      try {
        const list = await ollamaModels(ollamaUrl.value.trim() || OLLAMA_DEFAULT_URL);
        if (!list.length) { ollamaStatus.textContent = 'O Ollama está rodando, mas não tem modelos. Instale um, por exemplo: ollama pull qwen2.5vl'; return; }
        fillSelect(ollamaModel, list, ollamaModel.value || list[0].id);
        ollamaStatus.textContent = `Ollama encontrado com ${list.length} modelo(s).`;
      } catch (e) { ollamaStatus.textContent = e.message; }
    };
    let geminiLoaded = false, keyTimer = 0;
    geminiKey.addEventListener('input', () => { clearTimeout(keyTimer); keyTimer = setTimeout(loadGemini, 600); });

    const link = (url, text) => h('a', { href: url, target: '_blank', rel: 'noopener noreferrer' }, text);
    const draw = () => {
      tabs.replaceChildren(...Object.entries(PROVIDERS).map(([k, label]) => {
        const b = h('button', { class: provider === k ? 'active' : '' }, label);
        b.addEventListener('click', () => { provider = k; draw(); });
        return b;
      }));
      body.replaceChildren();
      if (provider === 'claude') {
        body.append(
          h('p', {}, 'Melhor qualidade, pago por uso. Crie uma chave em ', link('https://console.anthropic.com', 'console.anthropic.com'), '.'),
          h('div', { class: 'field' }, h('label', {}, 'Chave da API'), claudeKey),
          h('div', { class: 'field' }, h('label', {}, 'Modelo'), claudeModel),
          h('p', { class: 'muted small' }, 'A chave fica só neste navegador e vai apenas para api.anthropic.com. O conteúdo das páginas escolhidas é enviado à Anthropic.'));
      } else if (provider === 'gemini') {
        body.append(
          h('p', {}, 'Tem nível gratuito (com limite de uso). Crie a chave grátis em ', link('https://aistudio.google.com/apikey', 'aistudio.google.com'), ' com sua conta Google.'),
          h('div', { class: 'field' }, h('label', {}, 'Chave da API'), geminiKey),
          h('div', { class: 'field' }, h('label', {}, 'Modelo'), h('div', { class: 'row-inline' }, geminiModel, h('button', { class: 'btn', type: 'button', onclick: loadGemini }, 'Atualizar')), geminiStatus),
          h('p', { class: 'muted small' }, 'Atenção: no plano gratuito o Google pode usar o que você envia para melhorar os produtos dele. Evite anotações pessoais ou sensíveis. A chave fica só neste navegador.'));
        if (cfg.geminiKey && geminiModel.options.length <= 1) loadGemini();
      } else if (provider === 'browser') {
        const gpu = webgpuAvailable();
        body.append(
          h('p', {}, 'Grátis, sem chave e sem instalar nada: a IA roda dentro do navegador, usando a placa de vídeo. Nada sai do seu computador e, depois do primeiro download, funciona até offline.'),
          ...(gpu ? [] : [h('p', { class: 'err-text' }, 'Este navegador não tem WebGPU. Use o Chrome ou o Edge atualizados.')]),
          h('div', { class: 'field' }, h('label', {}, 'Modelo'), browserModel, browserStatus),
          h('div', { class: 'row-inline', style: { marginBottom: '12px' } }, h('button', { class: 'btn', type: 'button', onclick: async () => {
            if (!(await browserModelCached(browserModel.value))) { browserStatus.textContent = 'Este modelo não está baixado.'; return; }
            await deleteBrowserModel(browserModel.value);
            toast('Modelo apagado deste navegador');
            checkBrowser();
          } }, 'Apagar modelo baixado')),
          h('p', { class: 'muted small' }, 'É bem mais simples que Claude ou Gemini: bom para resumos curtos, perguntas e flashcards. Lê um trecho por vez (use “Página atual” para mais precisão). Só o Phi-3.5 Vision enxerga escrita à mão.'));
        checkBrowser();
      } else {
        body.append(
          h('p', {}, 'Grátis e privado: a IA roda no seu computador e nada sai dele. Instale o Ollama em ', link('https://ollama.com/download', 'ollama.com'), ' e baixe um modelo que entenda imagens, por exemplo:'),
          h('pre', { class: 'code-line' }, 'ollama pull qwen2.5vl'),
          h('div', { class: 'field' }, h('label', {}, 'Endereço do Ollama'), ollamaUrl),
          h('div', { class: 'field' }, h('label', {}, 'Modelo'), h('div', { class: 'row-inline' }, ollamaModel, h('button', { class: 'btn', type: 'button', onclick: loadOllama }, 'Atualizar')), ollamaStatus),
          h('p', { class: 'muted small' }, 'É mais lento que a nuvem e a qualidade depende do modelo e do seu PC. Para ler escrita à mão, o modelo precisa ter visão.'));
        loadOllama();
      }
    };
    draw();
    box.append(h('h2', {}, 'Assistente de IA'), tabs, body, h('div', { class: 'actions' },
      h('button', { class: 'btn ghost', onclick: () => close(false) }, 'Cancelar'),
      h('button', { class: 'btn primary', onclick: async () => {
        if (provider === 'gemini' && geminiKey.value.trim() && !geminiLoaded) await loadGemini();
        write(KEYS.provider, provider);
        write(KEYS.claudeKey, claudeKey.value.trim());
        write(KEYS.claudeModel, claudeModel.value);
        write(KEYS.geminiKey, geminiKey.value.trim());
        write(KEYS.geminiModel, geminiModel.value);
        write(KEYS.ollamaUrl, ollamaUrl.value.trim() === OLLAMA_DEFAULT_URL ? '' : ollamaUrl.value.trim());
        write(KEYS.ollamaModel, ollamaModel.value);
        write(KEYS.browserModel, browserModel.value);
        if (!aiConfigured()) toast(provider === 'ollama' ? 'Escolha um modelo do Ollama para usar o assistente.' : provider === 'browser' ? 'Este navegador não suporta IA local (WebGPU).' : 'Cole a chave da API para usar o assistente.');
        else toast(`Assistente usando ${PROVIDERS[provider]}`);
        close(true);
      } }, 'Salvar')));
  });
}

// Recursos que precisam enxergar imagens (escrita à mão).
function canSeeImages() {
  const c = aiConfig();
  if (c.provider === 'browser' && !browserModelInfo(c.browserModel).vision) {
    toast('Para ler escrita à mão com a IA do navegador, escolha o modelo Phi-3.5 Vision em Assistente → Configurar.', { duration: 6000 });
    return false;
  }
  return true;
}

async function requireAI() {
  if (aiConfigured()) return true;
  return !!(await aiSettingsDialog()) && aiConfigured();
}

// ---------- Chamada à IA ----------
class AIError extends Error {}

function friendlyError(e) {
  if (e instanceof AIError || e instanceof ProviderError) return e.message;
  if (!Anthropic) return e?.message || 'Erro inesperado.';
  if (e instanceof Anthropic.AuthenticationError) return 'Chave da API inválida. Confira em Assistente → Configurar.';
  if (e instanceof Anthropic.PermissionDeniedError) return 'Sua chave não tem permissão para este modelo.';
  if (e instanceof Anthropic.RateLimitError) return 'Limite de uso atingido. Tente de novo em instantes.';
  if (e instanceof Anthropic.BadRequestError) return 'Pedido recusado pela API: ' + (e.message || '');
  if (e instanceof Anthropic.APIConnectionError) return 'Sem conexão com a API. Verifique a internet.';
  if (e instanceof Anthropic.APIError) return `Erro da API (${e.status}).`;
  if (e instanceof SyntaxError) return 'A IA não devolveu um resultado no formato esperado. Tente de novo.';
  return e?.message || String(e);
}

// content: array de blocos (texto/imagem). schema: força resposta JSON nesse formato.
async function ask({ system, content, schema, effort = 'medium', maxTokens = 16000, onText, signal }) {
  const cfg = aiConfig();
  if (cfg.provider === 'gemini') {
    const call = (model) => askGemini({ apiKey: cfg.geminiKey, model, system, content, schema, maxTokens: Math.min(maxTokens, 8192), onText, signal });
    try {
      return await call(cfg.geminiModel);
    } catch (e) {
      // O Google aposenta modelos com frequência: troca sozinho por um disponível e tenta de novo.
      if (e.code !== 'model_not_found') throw e;
      const best = pickGeminiModel(await geminiModels(cfg.geminiKey));
      if (!best || best === cfg.geminiModel) throw e;
      write(KEYS.geminiModel, best);
      toast(`Modelo do Gemini trocado para ${best}`);
      return call(best);
    }
  }
  if (cfg.provider === 'browser') {
    return withBrowserProgress(cfg.browserModel, () => askBrowser({ model: cfg.browserModel, system, content, schema, maxTokens, onText, signal }));
  }
  if (cfg.provider === 'ollama') {
    return askOllama({ url: cfg.ollamaUrl, model: cfg.ollamaModel, system, content, schema, onText, signal });
  }
  Anthropic ||= (await import('../vendor/anthropic-sdk.mjs')).default;
  const client = new Anthropic({ apiKey: cfg.apiKey, dangerouslyAllowBrowser: true });
  const params = {
    model: cfg.model,
    max_tokens: maxTokens,
    system,
    messages: [{ role: 'user', content }],
    output_config: { effort, ...(schema ? { format: { type: 'json_schema', schema } } : {}) },
  };
  if (FALLBACK_MODELS.has(cfg.model)) {
    params.betas = ['server-side-fallback-2026-07-01'];
    params.fallbacks = 'default';
  }
  const stream = client.beta.messages.stream(params, { signal });
  if (onText) stream.on('text', (delta, snapshot) => onText(snapshot));
  const msg = await stream.finalMessage();
  if (msg.stop_reason === 'refusal') throw new AIError('O modelo não pôde responder a este pedido.');
  const text = msg.content.filter((b) => b.type === 'text').map((b) => b.text).join('');
  if (msg.stop_reason === 'max_tokens' && schema) throw new AIError('A resposta ficou longa demais. Tente com menos páginas.');
  return schema ? JSON.parse(text) : text;
}

// Mostra o download/carregamento do modelo do navegador na primeira vez.
async function withBrowserProgress(model, fn) {
  if (isBrowserModelLoaded(model)) return fn();
  const cached = await browserModelCached(model);
  const prog = progressDialog(cached ? 'Carregando a IA do navegador' : 'Baixando a IA (só na primeira vez)');
  onBrowserModelProgress(({ progress, text }) => prog.set(progress, text.replace(/Fetching param cache/i, 'Baixando').replace(/Loading model from cache/i, 'Carregando do cache').slice(0, 120)));
  let closed = false;
  const close = () => { if (!closed) { closed = true; prog.close(); onBrowserModelProgress(null); } };
  try {
    const p = fn();
    // fecha o diálogo assim que o modelo estiver pronto (a resposta continua no painel)
    const t = setInterval(() => { if (isBrowserModelLoaded(model)) { clearInterval(t); close(); } }, 300);
    try { return await p; } finally { clearInterval(t); close(); }
  } catch (e) { close(); throw e; }
}

// Modelos locais são lentos com muitas imagens: manda menos páginas como imagem.
function imageBudget() {
  const c = aiConfig();
  if (c.provider === 'browser') return browserModelInfo(c.browserModel).vision ? 1 : 0;
  return c.provider === 'ollama' ? 3 : c.provider === 'gemini' ? 12 : 16;
}

// ---------- Imagens das páginas ----------
function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result).split(',')[1]);
    r.onerror = () => reject(r.error);
    r.readAsDataURL(blob);
  });
}

export async function imageBlock(blob) {
  return { type: 'image', source: { type: 'base64', media_type: blob.type || 'image/png', data: await blobToBase64(blob) } };
}

async function pageImage(page, width = 1000) {
  const c = document.createElement('canvas');
  await renderPageFlat(page, c, width);
  return new Promise((res) => c.toBlob(res, 'image/jpeg', 0.85));
}

const hasInk = (p) => (p.strokes || []).length > 0 || (p.images || []).length > 0;

// Monta o contexto: texto conhecido de cada página + imagens das páginas com escrita à mão.
async function pagesContext(pages, startNumber = 1, { maxImages = imageBudget(), onProgress } = {}) {
  const blocks = [];
  let images = 0;
  for (let i = 0; i < pages.length; i++) {
    const p = pages[i];
    const parts = [];
    if (p.pdfText) parts.push(`Texto do PDF: ${p.pdfText.slice(0, 6000)}`);
    if (p.inkText) parts.push(`Escrita à mão (transcrita): ${p.inkText}`);
    const typed = (p.texts || []).map((t) => t.text).join('\n');
    if (typed) parts.push(`Texto digitado: ${typed}`);
    blocks.push({ type: 'text', text: `--- Página ${startNumber + i} ---\n${parts.join('\n') || '(sem texto reconhecido)'}` });
    if (hasInk(p) && !p.inkText && images < maxImages) {
      blocks.push(await imageBlock(await pageImage(p)));
      images++;
    }
    onProgress?.((i + 1) / pages.length);
  }
  return blocks;
}

const STUDY_SYSTEM = 'Você é um tutor que ajuda um estudante brasileiro a estudar as próprias anotações. Responda sempre em português do Brasil, de forma clara e direta, sem preâmbulos. Baseie-se no conteúdo das páginas fornecidas; se algo não estiver nelas, diga isso.';

// ---------- Escrita à mão → texto ----------
export async function transcribeImage(blob, { math = false } = {}) {
  if (!(await requireAI()) || !canSeeImages()) return null;
  try {
    return (await ask({
      system: 'Você transcreve anotações manuscritas. Devolva somente a transcrição, sem comentários. Preserve quebras de linha. ' +
        (math ? 'Escreva equações em texto simples legível (ex.: x² + 3x = 0, √2, ∫, ≤).' : 'Se houver fórmulas, escreva-as em texto simples legível.'),
      content: [await imageBlock(blob), { type: 'text', text: 'Transcreva o que está escrito.' }],
      effort: 'low',
      maxTokens: 4000,
    })).trim();
  } catch (e) { toast(friendlyError(e), { duration: 6000 }); return null; }
}

// Reconhece a escrita de todas as páginas (para a busca encontrar o que você escreveu à mão).
export async function indexHandwriting(pages, onPageDone) {
  if (!(await requireAI()) || !canSeeImages()) return 0;
  const todo = pages.filter((p) => (p.strokes || []).length && !p.inkText);
  if (!todo.length) { toast('Todas as páginas com escrita já estão pesquisáveis.'); return 0; }
  const prog = progressDialog('Reconhecendo escrita à mão');
  let n = 0;
  try {
    for (const p of todo) {
      prog.set(n / todo.length, `Página ${n + 1} de ${todo.length}`);
      const c = document.createElement('canvas');
      await renderPageFlat({ ...p, pdf: null, pdfText: '', texts: [], images: [], bgAsset: null, template: 'blank', paper: 'white' }, c, 1000);
      const blob = await new Promise((res) => c.toBlob(res, 'image/jpeg', 0.85));
      const text = await ask({
        system: 'Você transcreve anotações manuscritas. Devolva somente o texto escrito à mão, sem comentários. Se não houver texto legível (apenas desenhos), devolva uma linha vazia.',
        content: [await imageBlock(blob), { type: 'text', text: 'Transcreva.' }],
        effort: 'low', maxTokens: 4000,
      });
      p.inkText = text.trim() || ' ';
      await onPageDone?.(p);
      n++;
    }
    prog.close();
    toast(`${n} páginas agora aparecem na busca.`);
  } catch (e) {
    prog.close();
    toast(friendlyError(e), { duration: 6000 });
  }
  return n;
}

// ---------- Painel do assistente ----------
// ctx: { nb, pages, currentIndex, insertTextPage(title, text), onPagesChanged(page) }
let panel = null;
export function toggleAssistant(ctx) {
  if (panel) { closeAssistant(); return; }
  openAssistant(ctx);
}

export function closeAssistant() {
  panel?.abort?.abort();
  panel?.el.remove();
  panel = null;
  document.getElementById('ed-ai')?.classList.remove('active');
}

export async function openAssistant(ctx) {
  closeAssistant();
  document.getElementById('ed-ai')?.classList.add('active');
  const el = h('aside', { class: 'ai-panel' });
  panel = { el, abort: null, history: [] };
  document.querySelector('.ed-body').append(el);

  const scope = { value: 'notebook' };
  const scopeSeg = h('div', { class: 'seg' });
  const drawScope = () => {
    scopeSeg.replaceChildren(...[['page', 'Página atual'], ['notebook', 'Caderno inteiro']].map(([k, label]) => {
      const b = h('button', { class: scope.value === k ? 'active' : '' }, label);
      b.addEventListener('click', () => { scope.value = k; drawScope(); });
      return b;
    }));
  };
  drawScope();
  const scopedPages = () => {
    const i = ctx.currentIndex();
    return scope.value === 'page' ? { pages: [ctx.pages()[i]], start: i + 1 } : { pages: ctx.pages(), start: 1 };
  };

  const out = h('div', { class: 'ai-out' });
  const actionBtn = (label, iconPath, fn) => {
    const b = h('button', { class: 'ai-action' }, icon(iconPath), h('span', {}, label));
    b.addEventListener('click', async () => { if (await requireAI()) fn(); });
    return b;
  };
  const input = h('textarea', { class: 'input area', rows: 2, placeholder: 'Pergunte algo sobre suas anotações…' });
  const send = h('button', { class: 'btn primary' }, 'Enviar');
  const chat = async () => {
    const q = input.value.trim();
    if (!q || !(await requireAI())) return;
    input.value = '';
    await runChat(q);
  };
  send.addEventListener('click', chat);
  input.addEventListener('keydown', (e) => { e.stopPropagation(); if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); chat(); } });

  el.append(
    h('div', { class: 'ai-head' }, h('b', {}, 'Assistente'), aiConfigured() ? h('span', { class: 'ai-provider' }, PROVIDERS[aiConfig().provider]) : null,
      h('button', { class: 'icon-btn small', title: 'Configurar', 'aria-label': 'Configurar IA', onclick: () => aiSettingsDialog() }, icon('<circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 0 0-.1-1.2l2-1.6-2-3.4-2.4 1a7 7 0 0 0-2-1.2L14 3h-4l-.5 2.6a7 7 0 0 0-2 1.2l-2.4-1-2 3.4 2 1.6A7 7 0 0 0 5 12c0 .4 0 .8.1 1.2l-2 1.6 2 3.4 2.4-1a7 7 0 0 0 2 1.2L10 21h4l.5-2.6a7 7 0 0 0 2-1.2l2.4 1 2-3.4-2-1.6c.1-.4.1-.8.1-1.2z"/>')),
      h('button', { class: 'icon-btn small', 'aria-label': 'Fechar', onclick: closeAssistant }, icon('<path d="M6 6l12 12M18 6L6 18"/>'))),
    scopeSeg,
    h('div', { class: 'ai-actions' },
      actionBtn('Resumir', '<path d="M5 6h14M5 10h14M5 14h9M5 18h6"/>', () => runSummary()),
      actionBtn('Gerar quiz', '<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6V14M12 17v.5"/>', () => runQuiz()),
      actionBtn('Gerar flashcards', '<rect x="3" y="6" width="14" height="12" rx="2"/><path d="M7 3h12a2 2 0 0 1 2 2v10"/>', () => runFlashcards()),
      actionBtn('Escrita → busca', '<path d="M4 20l1-5L16 4l4 4L9 19z"/><circle cx="18" cy="18" r="3"/>', async () => {
        await indexHandwriting(scopedPages().pages, ctx.onPagesChanged);
      })),
    out,
    h('div', { class: 'ai-input' }, input, send),
  );
  if (!aiConfigured()) {
    out.append(h('div', { class: 'ai-msg' }, h('p', {}, 'Escolha um provedor de IA para usar o assistente: Claude (pago), Google Gemini (tem nível gratuito) ou Ollama (grátis, roda no seu PC).'),
      h('button', { class: 'btn primary', onclick: () => aiSettingsDialog() }, 'Configurar')));
  }

  const bubble = (role, html = '') => {
    const b = h('div', { class: 'ai-msg ' + role, html });
    out.append(b);
    out.scrollTop = out.scrollHeight;
    return b;
  };
  const working = (b) => { b.classList.add('loading'); b.innerHTML = '<span class="dots"><i></i><i></i><i></i></span>'; };

  async function withContext(b, onProgress) {
    const { pages, start } = scopedPages();
    return pagesContext(pages, start, { onProgress });
  }

  async function runSummary() {
    const b = bubble('assistant');
    working(b);
    try {
      const blocks = await withContext(b);
      panel.abort = new AbortController();
      const text = await ask({
        system: STUDY_SYSTEM, effort: 'medium', signal: panel.abort.signal,
        content: [...blocks, { type: 'text', text: 'Faça um resumo de estudo dessas anotações: tópicos principais em títulos curtos, conceitos-chave em listas, fórmulas importantes e, no fim, 3 pontos para revisar.' }],
        onText: (snap) => { b.classList.remove('loading'); b.innerHTML = md(snap); out.scrollTop = out.scrollHeight; },
      });
      b.innerHTML = md(text);
      b.append(h('div', { class: 'ai-msg-actions' },
        h('button', { class: 'btn small-btn', onclick: () => ctx.insertTextPage('Resumo', stripMd(text)) }, 'Inserir como página'),
        h('button', { class: 'btn small-btn', onclick: () => navigator.clipboard?.writeText(text).then(() => toast('Copiado')) }, 'Copiar')));
    } catch (e) { if (e?.name !== 'AbortError') b.innerHTML = `<p class="err">${escapeHtml(friendlyError(e))}</p>`; }
  }

  async function runChat(q) {
    bubble('user', escapeHtml(q));
    const b = bubble('assistant');
    working(b);
    try {
      const blocks = await withContext(b);
      const history = panel.history.slice(-6).map((m) => `${m.role === 'user' ? 'Estudante' : 'Tutor'}: ${m.text}`).join('\n');
      panel.abort = new AbortController();
      const text = await ask({
        system: STUDY_SYSTEM, effort: 'medium', signal: panel.abort.signal,
        content: [...blocks, { type: 'text', text: (history ? `Conversa até agora:\n${history}\n\n` : '') + `Pergunta: ${q}` }],
        onText: (snap) => { b.classList.remove('loading'); b.innerHTML = md(snap); out.scrollTop = out.scrollHeight; },
      });
      b.innerHTML = md(text);
      panel.history.push({ role: 'user', text: q }, { role: 'assistant', text });
    } catch (e) { if (e?.name !== 'AbortError') b.innerHTML = `<p class="err">${escapeHtml(friendlyError(e))}</p>`; }
  }

  async function runQuiz() {
    const b = bubble('assistant');
    working(b);
    try {
      const blocks = await withContext(b);
      const data = await ask({
        system: STUDY_SYSTEM, effort: 'medium',
        schema: {
          type: 'object', additionalProperties: false, required: ['questions'],
          properties: { questions: { type: 'array', items: {
            type: 'object', additionalProperties: false, required: ['question', 'options', 'answer', 'explanation'],
            properties: {
              question: { type: 'string' },
              options: { type: 'array', items: { type: 'string' } },
              answer: { type: 'integer', description: 'índice (0 a 3) da opção correta' },
              explanation: { type: 'string' },
            } } } },
        },
        content: [...blocks, { type: 'text', text: 'Crie um quiz de 8 perguntas de múltipla escolha (4 opções cada, só uma correta) que teste a compreensão dessas anotações. Varie a dificuldade e explique cada resposta em uma ou duas frases.' }],
      });
      b.remove();
      quizDialog(data.questions || []);
    } catch (e) { b.classList.remove('loading'); b.innerHTML = `<p class="err">${escapeHtml(friendlyError(e))}</p>`; }
  }

  async function runFlashcards() {
    const b = bubble('assistant');
    working(b);
    try {
      const blocks = await withContext(b);
      const data = await ask({
        system: STUDY_SYSTEM, effort: 'medium',
        schema: {
          type: 'object', additionalProperties: false, required: ['cards'],
          properties: { cards: { type: 'array', items: {
            type: 'object', additionalProperties: false, required: ['front', 'back'],
            properties: { front: { type: 'string' }, back: { type: 'string' } } } } },
        },
        content: [...blocks, { type: 'text', text: 'Crie de 10 a 20 flashcards para memorizar o conteúdo essencial dessas anotações. Frente: pergunta curta e específica. Verso: resposta objetiva. Um conceito por cartão.' }],
      });
      b.remove();
      const added = await flashcardsReview(data.cards || [], ctx.nb());
      if (added) bubble('assistant', `<p>${added} flashcards adicionados. Revise em <b>Estudar</b>, na biblioteca.</p>`);
    } catch (e) { b.classList.remove('loading'); b.innerHTML = `<p class="err">${escapeHtml(friendlyError(e))}</p>`; }
  }
}

// ---------- Explicar / resolver uma seleção (matemática ou conceito) ----------
export async function explainSelection(blob) {
  if (!(await requireAI()) || !canSeeImages()) return;
  await modal((box, close) => {
    const out = h('div', { class: 'ai-msg assistant loading', html: '<span class="dots"><i></i><i></i><i></i></span>' });
    box.append(h('h2', {}, 'Explicação'), out, h('div', { class: 'actions' }, h('button', { class: 'btn primary', onclick: () => close() }, 'Fechar')));
    (async () => {
      try {
        const text = await ask({
          system: STUDY_SYSTEM + ' Quando houver contas ou equações, verifique se estão corretas, aponte o primeiro erro (se houver) e mostre a resolução passo a passo.',
          content: [await imageBlock(blob), { type: 'text', text: 'Explique este trecho das minhas anotações. Se for um exercício ou conta, confira e resolva passo a passo.' }],
          effort: 'high',
          onText: (snap) => { out.classList.remove('loading'); out.innerHTML = md(snap); },
        });
        out.classList.remove('loading');
        out.innerHTML = md(text);
      } catch (e) { out.classList.remove('loading'); out.innerHTML = `<p class="err">${escapeHtml(friendlyError(e))}</p>`; }
    })();
  });
}

// ---------- Quiz interativo ----------
function quizDialog(questions) {
  if (!questions.length) { toast('Não foi possível gerar perguntas.'); return; }
  let i = 0, score = 0;
  modal((box, close) => {
    box.classList.add('review');
    const body = h('div');
    box.append(h('div', { class: 'review-top' }, h('h2', {}, 'Quiz'), h('button', { class: 'icon-btn', onclick: () => close() }, icon('<path d="M6 6l12 12M18 6L6 18"/>'))), body);
    const show = () => {
      const q = questions[i];
      if (!q) {
        body.replaceChildren(h('div', { class: 'review-done' }, h('div', { class: 'big' }, score >= questions.length * 0.7 ? '🏆' : '📚'),
          h('h2', {}, `${score} de ${questions.length} certas`),
          h('p', {}, score >= questions.length * 0.7 ? 'Mandou bem! Você domina esse conteúdo.' : 'Vale revisar as anotações e tentar de novo.')),
        h('div', { class: 'actions' }, h('button', { class: 'btn primary', onclick: () => close() }, 'Fechar')));
        return;
      }
      const opts = h('div', { class: 'quiz-opts' });
      const expl = h('div');
      let answered = false;
      (q.options || []).forEach((o, k) => {
        const b = h('button', { class: 'quiz-opt' }, h('span', { class: 'quiz-letter' }, 'ABCD'[k] || '•'), h('span', {}, o));
        b.addEventListener('click', () => {
          if (answered) return;
          answered = true;
          if (k === q.answer) score++;
          [...opts.children].forEach((c, j) => { if (j === q.answer) c.classList.add('right'); else if (j === k) c.classList.add('wrong'); });
          expl.replaceChildren(h('p', { class: 'quiz-expl' }, q.explanation || ''),
            h('div', { class: 'actions' }, h('button', { class: 'btn primary', onclick: () => { i++; show(); } }, i + 1 < questions.length ? 'Próxima' : 'Ver resultado')));
        });
        opts.append(b);
      });
      body.replaceChildren(h('div', { class: 'muted' }, `Pergunta ${i + 1} de ${questions.length}`), h('h3', { class: 'quiz-q' }, q.question), opts, expl);
    };
    show();
  });
}

// ---------- Revisar flashcards gerados ----------
async function flashcardsReview(cards, nb) {
  if (!cards.length) { toast('Não foi possível gerar cartões.'); return 0; }
  const deck = await ensureNotebookDeck(nb);
  const decks = await allDecks();
  const res = await modal((box, close) => {
    box.classList.add('wide-modal');
    const select = h('select', { class: 'select' }, ...decks.map((d) => h('option', { value: d.id, selected: d.id === deck.id ? 'selected' : null }, d.title)));
    const rows = cards.map((c) => {
      const chk = h('input', { type: 'checkbox', checked: 'checked' });
      const f = h('textarea', { class: 'input area', rows: 2 }); f.value = c.front;
      const bk = h('textarea', { class: 'input area', rows: 2 }); bk.value = c.back;
      return { chk, f, bk, el: h('div', { class: 'gen-card' }, chk, f, bk) };
    });
    box.append(h('h2', {}, `${cards.length} flashcards sugeridos`),
      h('p', {}, 'Edite ou desmarque os que não quiser.'),
      h('div', { class: 'field' }, h('label', {}, 'Baralho'), select),
      h('div', { class: 'gen-list' }, ...rows.map((r) => r.el)),
      h('div', { class: 'actions' },
        h('button', { class: 'btn ghost', onclick: () => close() }, 'Cancelar'),
        h('button', { class: 'btn primary', onclick: () => close({
          deckId: select.value,
          sides: rows.filter((r) => r.chk.checked && r.f.value.trim() && r.bk.value.trim())
            .map((r) => ({ front: { text: r.f.value.trim() }, back: { text: r.bk.value.trim() } })),
        }) }, 'Adicionar')));
  });
  if (!res || !res.sides.length) return 0;
  await addCards(res.deckId, res.sides, { notebookId: nb.id });
  return res.sides.length;
}

// ---------- Markdown simples → HTML (seguro) ----------
export function md(src) {
  const lines = escapeHtml(src || '').split('\n');
  let html = '', list = null;
  const inline = (s) => s.replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/\*(.+?)\*/g, '<i>$1</i>').replace(/`(.+?)`/g, '<code>$1</code>');
  const closeList = () => { if (list) { html += `</${list}>`; list = null; } };
  for (const ln of lines) {
    let m;
    if ((m = ln.match(/^(#{1,4})\s+(.*)/))) { closeList(); const n = Math.min(4, m[1].length + 2); html += `<h${n}>${inline(m[2])}</h${n}>`; }
    else if ((m = ln.match(/^\s*[-*•]\s+(.*)/))) { if (list !== 'ul') { closeList(); html += '<ul>'; list = 'ul'; } html += `<li>${inline(m[1])}</li>`; }
    else if ((m = ln.match(/^\s*\d+[.)]\s+(.*)/))) { if (list !== 'ol') { closeList(); html += '<ol>'; list = 'ol'; } html += `<li>${inline(m[1])}</li>`; }
    else if (!ln.trim()) closeList();
    else { closeList(); html += `<p>${inline(ln)}</p>`; }
  }
  closeList();
  return html;
}

function stripMd(s) {
  return s.replace(/^#{1,6}\s+/gm, '').replace(/\*\*(.+?)\*\*/g, '$1').replace(/\*(.+?)\*/g, '$1').replace(/`(.+?)`/g, '$1').replace(/^\s*[-*]\s+/gm, '• ');
}

