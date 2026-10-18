// NEXO — leitura do PDF com posição na página (question-collector v28).
// O texto "achatado" do pdf.js misturava as duas colunas e perdia tabelas e figuras. Aqui cada palavra
// mantém página, coluna e coordenadas; as linhas saem em ordem de leitura e o recuo separa item,
// continuação, texto-base e comando de bloco. Imagens embutidas saem com a caixa exata na página.
// As funções de segmentação são puras (testadas por tools/testar-pipeline.mjs).

export interface Line { page: number; col: number; y: number; x0: number; x1: number; text: string }
export interface PdfImage { page: number; col: number; y: number; name: string; box: [number, number, number, number] } // caixa em frações da página, origem no topo à esquerda
export interface Layout { pages: { w: number; h: number }[]; lines: Line[]; images: PdfImage[]; doc?: any }
export interface FigureRef { pagina: number; descricao: string; caixa: number[]; image?: string }
export interface Block { key: string; text: string; figures: FigureRef[] }
export interface Item { n: number; text: string; options: string[]; context: string | null; figures: FigureRef[]; page: number; table: boolean; garbled?: boolean }

const HEADER = 0.055, FOOTER = 0.055;

// ---------------------------------------------------------------- extração (pdf.js)
export async function extractLayout(pdfjs: any, data: Uint8Array, opts: { columns?: boolean; maxPages?: number } = {}): Promise<Layout> {
  const maxPages = opts.maxPages ?? 220;
  const doc = await pdfjs.getDocument({ data, disableWorker: true, verbosity: 0 }).promise;
  const pages: { w: number; h: number }[] = [];
  const lines: Line[] = [];
  const images: PdfImage[] = [];
  for (let p = 1; p <= Math.min(doc.numPages, maxPages); p++) {
    const page = await doc.getPage(p);
    const vp = page.getViewport({ scale: 1 });
    const W = vp.width, H = vp.height;
    pages.push({ w: W, h: H });
    const tc = await page.getTextContent();
    const items = (tc.items as any[])
      .filter((i) => typeof i.str === "string" && i.str.trim() !== "")
      .map((i) => ({ x: i.transform[4], y: i.transform[5], w: i.width, h: Math.abs(i.transform[3]) || i.height || 8, s: i.str as string }))
      .filter((i) => i.y < H * (1 - HEADER) && i.y > H * FOOTER);
    const twoCols = opts.columns !== false && isTwoColumns(items, W); // gabaritos: tabela larga, nunca dividir
    lines.push(...buildLines(items, p, W, twoCols));
    images.push(...await pageImages(pdfjs, page, p, W, H, twoCols));
  }
  lines.sort(readingOrder);
  return { pages, lines, images, doc };
}

function isTwoColumns(items: { x: number; w: number }[], W: number) {
  const mid = W / 2;
  let left = 0, right = 0, crossing = 0;
  for (const i of items) {
    if (i.x + i.w <= mid + 4) left++;
    else if (i.x >= mid - 4) right++;
    else crossing++;
  }
  return right > items.length * 0.15 && left > items.length * 0.15 && crossing < items.length * 0.08;
}

function buildLines(items: { x: number; y: number; w: number; h: number; s: string }[], page: number, W: number, twoCols: boolean): Line[] {
  const byCol: Record<number, typeof items> = { 0: [], 1: [] };
  for (const i of items) byCol[twoCols && i.x >= W / 2 - 4 ? 1 : 0].push(i);
  const out: Line[] = [];
  for (const col of [0, 1]) {
    const list = byCol[col].slice().sort((a, b) => b.y - a.y || a.x - b.x);
    let row: typeof items = [];
    const flush = () => {
      if (!row.length) return;
      row.sort((a, b) => a.x - b.x);
      let text = "", prevEnd = -1;
      const size = row.reduce((s, r) => s + r.h, 0) / row.length;
      for (const r of row) {
        if (prevEnd >= 0) {
          const gap = r.x - prevEnd;
          // vão grande dentro da linha = coluna de tabela
          text += gap > Math.max(14, size * 2.2) ? " | " : gap > size * 0.15 && !/\s$/.test(text) && !/^\s/.test(r.s) ? " " : "";
        }
        text += r.s;
        prevEnd = r.x + r.w;
      }
      out.push({ page, col, y: row[0].y, x0: row[0].x, x1: prevEnd, text: text.replace(BULLETS, "• ").replace(SYMBOL_SPACE, " ").replace(/\s+/g, " ").trim() });
      row = [];
    };
    for (const i of list) {
      if (row.length && Math.abs(row[0].y - i.y) > Math.max(2.5, row[0].h * 0.35)) flush();
      row.push(i);
    }
    flush();
  }
  return out.filter((l) => l.text && !NOISE.test(l.text));
}
// Marcadores de lista do Word/Symbol (área privada) viram "•"; "Espaço livre"/"Rascunho" é área em branco do caderno.
// Só no início da linha: no meio do texto o mesmo código pode ser símbolo lógico (→, ∨), que fica para a IA.
const BULLETS = new RegExp("^[" + [0xf0b7, 0xf0a7, 0xf06c, 0xf0fc, 0xf076].map((c) => String.fromCharCode(c)).join("") + "]\\s*");
const SYMBOL_SPACE = new RegExp(String.fromCharCode(0xf020), "g");
const NOISE = /^(espa[cç]o livre|rascunho)$/i;

// Caixa das imagens desenhadas na página (paintImageXObject e afins), seguindo a matriz de transformação.
async function pageImages(pdfjs: any, page: any, p: number, W: number, H: number, twoCols: boolean): Promise<PdfImage[]> {
  const out: PdfImage[] = [];
  let ops: any;
  try { ops = await page.getOperatorList(); } catch { return out; }
  const O = pdfjs.OPS;
  let m = [1, 0, 0, 1, 0, 0];
  const stack: number[][] = [];
  const mul = (a: number[], b: number[]) => [a[0] * b[0] + a[2] * b[1], a[1] * b[0] + a[3] * b[1], a[0] * b[2] + a[2] * b[3], a[1] * b[2] + a[3] * b[3], a[0] * b[4] + a[2] * b[5] + a[4], a[1] * b[4] + a[3] * b[5] + a[5]];
  for (let k = 0; k < ops.fnArray.length; k++) {
    const fn = ops.fnArray[k], args = ops.argsArray[k];
    if (fn === O.save) stack.push(m.slice());
    else if (fn === O.restore) m = stack.pop() || [1, 0, 0, 1, 0, 0];
    else if (fn === O.transform) m = mul(m, args);
    else if (fn === O.paintFormXObjectBegin && Array.isArray(args?.[0])) { stack.push(m.slice()); m = mul(m, args[0]); }
    else if (fn === O.paintFormXObjectEnd) m = stack.pop() || [1, 0, 0, 1, 0, 0];
    else if (fn === O.paintImageXObject || fn === O.paintInlineImageXObject || fn === O.paintImageMaskXObject) {
      const xs = [m[4], m[4] + m[0], m[4] + m[2], m[4] + m[0] + m[2]];
      const ys = [m[5], m[5] + m[1], m[5] + m[3], m[5] + m[1] + m[3]];
      const x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
      if (x1 - x0 < 24 || y1 - y0 < 24) continue;                      // ícones, marcas e fios
      if (y0 > H * (1 - HEADER) - 2 || y1 < H * FOOTER + 2) continue;  // logotipos do cabeçalho/rodapé
      if ((x1 - x0) > W * 0.9 && (y1 - y0) > H * 0.9) continue;        // página inteira (prova escaneada)
      const clamp = (v: number) => Math.max(0, Math.min(1, v));
      out.push({
        page: p, col: twoCols && (x0 + x1) / 2 >= W / 2 ? 1 : 0, y: y1,
        name: typeof args?.[0] === "string" ? args[0] : "",
        box: [clamp(x0 / W), clamp(1 - y1 / H), clamp(x1 / W), clamp(1 - y0 / H)],
      });
    }
  }
  return mergeImages(out);
}

// Figura fatiada em faixas (comum nos PDFs do Cebraspe): junta imagens encostadas na mesma coluna.
export function mergeImages(list: PdfImage[]): PdfImage[] {
  const out: PdfImage[] = [];
  for (const img of list.slice().sort((a, b) => a.page - b.page || a.col - b.col || a.box[1] - b.box[1])) {
    const prev = out[out.length - 1];
    const touch = prev && prev.page === img.page && prev.col === img.col
      && img.box[1] - prev.box[3] < 0.012
      && Math.min(prev.box[2], img.box[2]) - Math.max(prev.box[0], img.box[0]) > 0.5 * Math.min(prev.box[2] - prev.box[0], img.box[2] - img.box[0]);
    if (touch) {
      prev.box = [Math.min(prev.box[0], img.box[0]), Math.min(prev.box[1], img.box[1]), Math.max(prev.box[2], img.box[2]), Math.max(prev.box[3], img.box[3])];
      prev.name = prev.name ? prev.name + "+" + img.name : img.name;
    } else out.push({ ...img, box: [...img.box] as [number, number, number, number] });
  }
  return out;
}

export function readingOrder(a: { page: number; col: number; y: number; x0?: number }, b: { page: number; col: number; y: number; x0?: number }) {
  return a.page - b.page || a.col - b.col || b.y - a.y || (a.x0 ?? 0) - (b.x0 ?? 0);
}

// Linhas e imagens numa só sequência; a imagem vira uma "linha" marcadora na sua posição de leitura.
type Seq = (Line & { kind: "line" }) | (PdfImage & { kind: "image"; x0: number });
function sequence(layout: Layout): Seq[] {
  const seq: Seq[] = [
    ...layout.lines.map((l) => ({ ...l, kind: "line" as const })),
    ...layout.images.map((i) => ({ ...i, kind: "image" as const, x0: i.box[0] * (layout.pages[i.page - 1]?.w || 595) })),
  ];
  return seq.sort(readingOrder);
}
function figureOf(i: PdfImage): FigureRef {
  return { pagina: i.page, descricao: "figura do caderno", caixa: i.box.map((v) => Math.round(v * 1000) / 1000), image: i.name || undefined };
}
// Margem esquerda de cada coluna de cada página (o x mais frequente entre as linhas).
function margins(lines: Line[]) {
  const by = new Map<string, number[]>();
  for (const l of lines) { const k = l.page + ":" + l.col; (by.get(k) || by.set(k, []).get(k)!).push(l.x0); }
  const out = new Map<string, number>();
  for (const [k, xs] of by) out.set(k, Math.min(...xs));
  return out;
}
const isTableRow = (t: string) => (t.match(/ \| /g) || []).length >= 1;
// Fórmulas e símbolos em fontes próprias saem do pdf.js como caracteres sem sentido: mongol, ideogramas CJK,
// área de uso privado e o caractere de substituição. Faixas montadas por código para não depender da codificação do arquivo.
const range = (a: number, b: number) => String.fromCharCode(a) + "-" + String.fromCharCode(b);
export const GARBLED = new RegExp("[" + range(0x1800, 0x18ff) + range(0x3400, 0x4dbf) + range(0x4e00, 0x9fff) + range(0xe000, 0xf8ff) + range(0xfffd, 0xfffd) + "]");
// Títulos de seção do caderno ("-- CONHECIMENTOS ESPECÍFICOS --") não fazem parte do texto-base.
const SECTION = /^[-–—\s]*(CONHECIMENTOS|PROVA OBJETIVA|L[IÍ]NGUA PORTUGUESA|PARTE [IVX]+|BLOCO [IVX]+)\b[^a-z]*$/;

// ---------------------------------------------------------------- Cebraspe (certo/errado)
// Item: linha que começa com o número esperado na margem; continuação: linhas recuadas;
// texto-base/comando: linhas na margem fora de item. Figura entre itens pertence ao texto-base seguinte.
// Blocos fora de questão: texto-base, comando de bloco, capa ou título de matéria.
// - capa/instruções: tudo o que vem antes da primeira questão em página anterior à dela é descartado;
// - título de matéria ("Noções de Direito Constitucional"): linha curta, sem vírgula nem pontuação de frase;
//   encerra o texto-base anterior e não vira contexto.
const isTitleLine = (t: string) => t.length < 70 && t.split(/\s+/).length <= 10 && /^[-–—\s]*[A-ZÀ-Ú0-9]/.test(t)
  && !/[,.:;?!)]/.test(t.replace(/^[-–—\s]+|[-–—\s]+$/g, ""));
// bloco inteiro é título quando todas as suas linhas (até 3) são títulos
const looksLikeTitle = (lines: string[]) => lines.length > 0 && lines.length <= 3 && lines.every(isTitleLine);

class Blocks {
  contexts: Block[] = [];
  ctx: Block | null = null;
  open: (Block & { page: number; parts: string[] }) | null = null;
  start(page: number) {
    if (!this.open) this.open = { key: "C" + (this.contexts.length + 1), text: "", figures: [], page, parts: [] };
    return this.open;
  }
  // nova página sem nenhuma questão ainda: o que veio antes era capa (inclusive logotipos)
  private coverReset(page: number, itemsSoFar: number) { if (this.open && itemsSoFar === 0 && page !== this.open.page) this.open = null; }
  add(page: number, text: string, itemsSoFar: number) {
    this.coverReset(page, itemsSoFar);
    const b = this.start(page);
    // título de matéria logo antes do texto-base ("Língua Portuguesa") não faz parte dele; "Texto I" faz
    if (b.parts.length === 1 && !b.figures.length && isTitleLine(b.parts[0]) && !/^texto\b/i.test(b.parts[0])) { b.text = ""; b.parts = []; }
    b.text += (isTableRow(text) || !b.text ? "\n" : " ") + text;
    b.parts.push(text);
  }
  figure(page: number, f: FigureRef, itemsSoFar: number) { this.coverReset(page, itemsSoFar); this.start(page).figures.push(f); }
  close(nextPage: number, itemsSoFar: number) {
    const b = this.open; this.open = null;
    if (!b) return;
    b.text = b.text.trim();
    const header = !b.figures.length && looksLikeTitle(b.parts);
    if (header) { this.ctx = null; return; }
    if (itemsSoFar === 0 && b.page < nextPage) return; // capa
    if (!b.text && !b.figures.length) return;
    this.contexts.push({ key: b.key, text: b.text, figures: b.figures });
    this.ctx = this.contexts[this.contexts.length - 1];
  }
}
function finish(items: Item[], contexts: Block[]) {
  for (const it of items) { it.text = it.text.replace(/[ \t]+/g, " ").trim(); it.options = it.options.map((x) => x.replace(/\s+/g, " ").trim()); }
  for (const c of contexts) c.text = c.text.replace(/[ \t]+/g, " ").replace(/\n /g, "\n").trim();
  return markGarbled({ items, contexts: contexts.filter((c) => items.some((i) => i.context === c.key)) });
}

export function segmentCebraspe(layout: Layout, answers: Map<number, string>): { items: Item[]; contexts: Block[] } {
  const want = new Set(answers.keys());
  const marg = margins(layout.lines);
  const items: Item[] = [];
  const B = new Blocks();
  let cur: Item | null = null, hang = 18, last = 0, curAt = { page: 0, col: 0 };
  // recuo da continuação dos itens (texto do item em relação ao número), medido na própria prova
  const hangs = layout.lines.map((l, i, all) => {
    const m = l.text.match(/^(\d{1,3})\s+\S/); const nx = all[i + 1];
    return m && nx && nx.page === l.page && nx.col === l.col && nx.y < l.y && nx.x0 > l.x0 + 6 ? Math.round(nx.x0 - l.x0) : null;
  }).filter((v): v is number => v !== null);
  if (hangs.length) { const f: Record<number, number> = {}; hangs.forEach((v) => f[v] = (f[v] || 0) + 1); hang = Number(Object.entries(f).sort((a, b) => b[1] - a[1])[0][0]); }
  for (const s of sequence(layout)) {
    if (s.kind === "image") { B.figure(s.page, figureOf(s), items.length); cur = null; continue; }
    if (SECTION.test(s.text)) { B.close(s.page, items.length); B.ctx = null; cur = null; continue; }
    const m0 = marg.get(s.page + ":" + s.col) ?? s.x0;
    const m = s.text.match(/^(\d{1,3})\s+(\S.*)$/);
    const n = m ? Number(m[1]) : NaN;
    if (m && want.has(n) && n > last && s.x0 <= m0 + 6) {
      B.close(s.page, items.length);
      cur = { n, text: m[2], options: ["Certo", "Errado"], context: B.ctx?.key ?? null, figures: [], page: s.page, table: false };
      items.push(cur); last = n; curAt = { page: s.page, col: s.col };
      continue;
    }
    // continuação do item: exatamente o recuo de item (parágrafo de texto-base tem outro recuo);
    // recuo maior na mesma página e coluna (tabela-verdade, citação, lista) também é do item
    const sameBox = cur !== null && curAt.page === s.page && curAt.col === s.col;
    if (cur && !B.open && (Math.abs(s.x0 - m0 - hang) <= 4 || (sameBox && s.x0 > m0 + hang + 4))) {
      curAt = { page: s.page, col: s.col };
      cur.text += (cur.text.endsWith("-") ? "" : " ") + s.text;
      if (isTableRow(s.text)) cur.table = true;
      continue;
    }
    // fora de item: texto-base ou comando de bloco ("Julgue os itens...") das próximas questões
    cur = null;
    B.add(s.page, s.text, items.length);
  }
  B.close(Infinity, items.length);
  return finish(items, B.contexts);
}

// ---------------------------------------------------------------- múltipla escolha (FGV, AOCP, FCC, Vunesp...)
const QNUM = /^(?:QUEST[ÃA]O\s+)?(\d{1,3})(?:\s*[.)–-])?(?:\s+(\S.*))?$/i;
const OPT = /^\(?([A-Ea-e])\)\s*(.*)$/; // "(A)", "A)" e o "a)" minúsculo do IBFC
// Questão que não é a primeira depois do texto-base só herda o texto se fizer referência a ele.
const REFERS = /\b(texto|textos|trecho|fragmento|passagem|poema|tirinha|charge|cartaz|imagem|gr[aá]fico|tabela|quadro|figura|acima|anterior|autor|autora|narrador|enunciado|situa[cç][aã]o hipot[eé]tica|caso)\b/i;

export function segmentMultipleChoice(layout: Layout, answers: Map<number, string>): { items: Item[]; contexts: Block[] } {
  const want = new Set(answers.keys());
  const marg = margins(layout.lines);
  const items: Item[] = [];
  const B = new Blocks();
  const firstAfter = new Set<Item>();
  let cur: Item | null = null, last = 0, state: "none" | "stmt" | "opts" = "none";
  for (const s of sequence(layout)) {
    if (s.kind === "image") {
      if (cur && state === "stmt") cur.figures.push(figureOf(s)); else { B.figure(s.page, figureOf(s), items.length); cur = null; state = "none"; }
      continue;
    }
    const m0 = marg.get(s.page + ":" + s.col) ?? s.x0;
    const q = s.text.match(QNUM);
    const n = q ? Number(q[1]) : NaN;
    if (q && want.has(n) && n > last && s.x0 <= m0 + 6 && (q[2] === undefined || /^QUEST/i.test(s.text) || n === last + 1)) {
      const hadOpen = !!B.open;
      B.close(s.page, items.length);
      cur = { n, text: q[2] || "", options: [], context: B.ctx?.key ?? null, figures: [], page: s.page, table: false };
      if (hadOpen && B.ctx) firstAfter.add(cur);
      items.push(cur); last = n; state = "stmt";
      continue;
    }
    const o = s.text.match(OPT);
    if (cur && o && "ABCDE".indexOf(o[1].toUpperCase()) === cur.options.length) { cur.options.push(o[2]); state = "opts"; continue; }
    if (cur && state === "opts" && s.x0 > m0 + 6 && cur.options.length) { cur.options[cur.options.length - 1] += " " + s.text; continue; }
    if (cur && state === "stmt") {
      cur.text += (cur.text && !cur.text.endsWith("-") ? (isTableRow(s.text) ? "\n" : " ") : "") + s.text;
      if (isTableRow(s.text)) cur.table = true;
      continue;
    }
    // depois das alternativas, texto na margem é texto-base das próximas questões
    cur = null; state = "none";
    B.add(s.page, s.text, items.length);
  }
  B.close(Infinity, items.length);
  for (const it of items) if (it.context && !firstAfter.has(it) && !REFERS.test(it.text + " " + it.options.join(" "))) it.context = null;
  return finish(items, B.contexts);
}


// Item com fórmula ilegível (no enunciado, nas alternativas ou no texto-base) não pode ser gravado como texto.
export function markGarbled(r: { items: Item[]; contexts: Block[] }) {
  const bad = new Set(r.contexts.filter((c) => GARBLED.test(c.text)).map((c) => c.key));
  for (const it of r.items) it.garbled = GARBLED.test(it.text) || it.options.some((o) => GARBLED.test(o)) || (it.context !== null && bad.has(it.context));
  return r;
}

// Lixo que o extrator antigo colou nos textos: rodapé do caderno FGV, marcador de página, "Espaço livre".
export const JUNK = /\b(?:19|20)\d{2}\s+FGV\b|Tipo\s+(?:Branca|Amarela|Verde|Azul|Rosa)\s*[–-]\s*P[áa]gina\s+\d+|-{3}\s*PAGE\s*\d+\s*-{3}|\bEspa[çc]o livre\b/i;
const normCmp = (s: string) => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

// Registro antigo com lixo ou símbolos ilegíveis pode ser trocado pela leitura nova SE for a mesma questão:
// mesmo tipo, mesmo número de alternativas e o texto antigo começando pelo texto novo. Gabarito nunca muda.
export function cleanReplacement(prev: { statement: string; options: unknown; question_type?: string }, q: ReadyQuestion) {
  const prevOpts = Array.isArray(prev.options) ? prev.options.map(String) : [];
  const dirty = JUNK.test(prev.statement) || GARBLED.test(prev.statement) || prevOpts.some((o) => JUNK.test(o) || GARBLED.test(o));
  if (!dirty || q.method !== LAYOUT_METHOD) return null;
  if (prev.question_type && prev.question_type !== q.question_type) return null;
  if (prevOpts.length !== q.options.length) return null;
  const a = normCmp(prev.statement), b = normCmp(q.statement);
  if (b.length < 20 || !a.startsWith(b.slice(0, Math.min(80, b.length)))) return null;
  for (let i = 0; i < prevOpts.length; i++) {
    const pa = normCmp(prevOpts[i]), qa = normCmp(q.options[i]);
    if (qa && !pa.startsWith(qa.slice(0, Math.min(40, qa.length)))) return null;
  }
  return { statement: q.statement, options: q.options };
}

// ---------------------------------------------------------------- decisão por número de questão
export const LAYOUT_METHOD = "pdf_layout_v28";
export const LEGACY_METHOD = "pdfjs_regex_v27";
const REFERS_FIGURE = /\b(figura|gr[aá]fico|imagem|mapa|charge|tirinha|cartaz|fotografia|foto|ilustra[cç][aã]o|esquema|diagrama|fluxograma|organograma)\b/i;
const REFERS_TABLE = /\b(tabela|quadro|planilha)\b/i;

export interface ReadyQuestion {
  question_number: number; statement: string; options: string[]; answer: string | null; question_type: "true_false" | "multiple_choice";
  context: string | null; figures: FigureRef[]; flags: string[]; method: string;
}
export interface LegacyQuestion { question_number: number; statement: string; options: string[]; answer?: string | null; question_type: string; needs_context_review?: boolean }

// Grava só o que está completo; o resto vai, com o motivo, para a segunda leitura (IA) e a revisão humana.
export function planCollect(seg: { items: Item[]; contexts: Block[] }, legacy: LegacyQuestion[], answers: Map<number, string>) {
  const byN = new Map(seg.items.map((i) => [i.n, i]));
  const legacyByN = new Map(legacy.map((q) => [q.question_number, q]));
  const ctxByKey = new Map(seg.contexts.map((c) => [c.key, c]));
  const ready: ReadyQuestion[] = [];
  const pending: number[] = [];
  const reasons: Record<number, string> = {};
  const hold = (n: number, why: string) => { pending.push(n); reasons[n] = why; };
  for (const n of [...answers.keys()].sort((a, b) => a - b)) {
    const answer = answers.get(n) ?? null;
    const it = byN.get(n);
    if (it) {
      const ctx = it.context ? ctxByKey.get(it.context) : undefined;
      const all = it.text + " " + (ctx?.text || "");
      const hasFig = it.figures.length > 0 || (ctx?.figures.length || 0) > 0;
      const hasTable = it.table || (ctx ? /\|/.test(ctx.text) : false);
      const ce = it.options.length === 2 && it.options[0] === "Certo";
      if (it.garbled) { hold(n, "formula"); continue; }
      if (it.text.length < 8) { hold(n, "enunciado_vazio"); continue; }
      if (REFERS_FIGURE.test(all) && !hasFig) { hold(n, "figura_nao_localizada"); continue; }
      if (REFERS_TABLE.test(all) && !hasFig && !hasTable) { hold(n, "tabela_nao_localizada"); continue; }
      if (!ce) {
        const letters = "ABCDE".slice(0, it.options.length);
        const okOpts = it.options.length >= 4 && it.options.length <= 5 && it.options.every((o) => o.length > 0);
        if (!okOpts || (answer && answer !== "ANULADA" && letters.indexOf(answer) < 0)) { hold(n, "alternativas"); continue; }
      }
      const flags: string[] = [];
      if (it.figures.length || ctx?.figures.length) flags.push("figura_automatica");
      if (hasTable) flags.push("tabela_em_texto");
      ready.push({ question_number: n, statement: it.text, options: it.options, answer, question_type: ce ? "true_false" : "multiple_choice",
        context: it.context, figures: it.figures, flags, method: LAYOUT_METHOD });
      continue;
    }
    const lg = legacyByN.get(n);
    if (lg && !lg.needs_context_review && lg.statement.length >= 8 && !GARBLED.test(lg.statement)) {
      ready.push({ question_number: n, statement: lg.statement, options: lg.options, answer: lg.answer ?? answer,
        question_type: lg.question_type === "true_false" ? "true_false" : "multiple_choice", context: null, figures: [], flags: [], method: LEGACY_METHOD });
      continue;
    }
    hold(n, lg ? "contexto" : "nao_encontrada");
  }
  const used = new Set(ready.map((q) => q.context).filter(Boolean));
  return { ready, pending, reasons, contexts: seg.contexts.filter((c) => used.has(c.key)) };
}

// Texto corrido (compatível com o formato antigo de exam_documents.extracted_text).
export function plainText(layout: Layout) {
  let out = "", page = 0;
  for (const l of layout.lines) {
    if (l.page !== page) { page = l.page; out += "\n--- PAGE " + page + " ---\n"; }
    out += l.text + "\n";
  }
  return out;
}
