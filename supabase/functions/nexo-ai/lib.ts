// NEXO — regras puras da extração e classificação por IA (sem rede e sem banco).
// Testadas por tools/testar-pipeline.mjs. A função nexo-ai (index.ts) só faz a entrada e saída.

export const MODEL = "claude-opus-5-5";
export const EXTRACTION_METHOD = "claude_pdf_v1";

// ---------- esquemas de saída (structured outputs: todo objeto com additionalProperties:false) ----------
const nullableString = { anyOf: [{ type: "string" }, { type: "null" }] };
const nullableInteger = { anyOf: [{ type: "integer" }, { type: "null" }] };
const FIGURE = {
  type: "object",
  additionalProperties: false,
  required: ["pagina", "descricao", "caixa"],
  properties: {
    pagina: { type: "integer", description: "Página do PDF do caderno, começando em 1." },
    descricao: { type: "string", description: "O que a figura, tabela ou imagem mostra." },
    caixa: {
      type: "array", items: { type: "number" },
      description: "[x0, y0, x1, y1] em frações da página (0 a 1), origem no canto superior esquerdo.",
    },
  },
};

export const EXTRACTION_SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["caderno", "contextos", "questoes"],
  properties: {
    caderno: {
      type: "object",
      additionalProperties: false,
      required: ["banca", "orgao", "cargo", "ano", "tipo_caderno", "observacoes"],
      properties: {
        banca: nullableString, orgao: nullableString, cargo: nullableString,
        ano: nullableInteger, tipo_caderno: nullableString, observacoes: { type: "string" },
      },
    },
    contextos: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["id", "texto", "figuras"],
        properties: {
          id: { type: "string", description: "Identificador curto, por exemplo T1, T2." },
          texto: { type: "string", description: "Texto-base, comando do bloco ou tabela, transcrito integralmente." },
          figuras: { type: "array", items: FIGURE },
        },
      },
    },
    questoes: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["numero", "tipo", "contexto_id", "enunciado", "alternativas", "figuras", "pagina", "gabarito_lido", "anulada", "alertas"],
        properties: {
          numero: { type: "integer" },
          tipo: { type: "string", enum: ["multipla_escolha", "certo_errado"] },
          contexto_id: nullableString,
          enunciado: { type: "string" },
          alternativas: {
            type: "array",
            items: {
              type: "object", additionalProperties: false, required: ["letra", "texto"],
              properties: { letra: { type: "string", enum: ["A", "B", "C", "D", "E"] }, texto: { type: "string" } },
            },
          },
          figuras: { type: "array", items: FIGURE },
          pagina: { type: "integer" },
          gabarito_lido: nullableString,
          anulada: { type: "boolean" },
          alertas: { type: "array", items: { type: "string" } },
        },
      },
    },
  },
};

export const EXTRACTION_SYSTEM = [
  "Você transcreve cadernos oficiais de provas de concursos públicos brasileiros para um banco de questões de estudo.",
  "Fidelidade absoluta ao caderno: não corrija, não resuma, não complete, não reescreva e não invente nada.",
  "Quando algo estiver ilegível ou ambíguo, transcreva o que for possível e registre a dúvida em `alertas`.",
].join(" ");

export interface SourceMeta {
  board?: string | null; institution?: string | null; role_name?: string | null; exam_name?: string | null;
  year?: number | null; booklet_type?: string | null;
}

export function buildExtractionInstructions(src: SourceMeta, range?: { from: number; to: number } | null, numbers?: number[] | null, withAnswerKey = true) {
  const lines = [
    "Anexos: 1) o caderno de questões oficial; 2) o gabarito definitivo oficial.",
    "Dados conhecidos desta prova (podem estar incompletos):",
    `- Banca: ${src.board || "?"}`,
    `- Órgão/concurso: ${src.institution || src.exam_name || "?"}`,
    `- Cargo ou parte do caderno: ${src.role_name || src.exam_name || "?"}`,
    `- Ano: ${src.year || "?"}`,
    `- Tipo de caderno: ${src.booklet_type || "não informado (leia na capa)"}`,
    "",
    "Tarefa: transcreva todas as questões objetivas do caderno, na ordem, com o número impresso.",
    range ? `Transcreva SOMENTE as questões de número ${range.from} a ${range.to}.` : "",
    numbers?.length ? `Transcreva SOMENTE as questões de número: ${numbers.join(", ")}. As demais já foram lidas; não as inclua.` : "",
    withAnswerKey ? "" : "Não há gabarito anexo: use `gabarito_lido` = null em todas (o gabarito oficial já é conhecido).",
    "",
    "Regras:",
    "1. Certo/Errado (Cebraspe): cada item numerado é uma questão do tipo certo_errado, sem alternativas.",
    "2. Texto-base, tabela ou comando de bloco (\"Julgue os itens a seguir...\", \"Com base no texto...\") usado por um",
    "   ou mais itens vai para `contextos`, transcrito integralmente, e cada questão aponta para ele em `contexto_id`.",
    "   Não repita o texto-base dentro do enunciado. Se o comando do bloco e o texto-base forem consecutivos, use um só contexto.",
    "3. Tabelas: transcreva como texto, uma linha por linha da tabela, colunas separadas por \" | \".",
    "4. Figuras, gráficos, mapas, fotos ou imagens que não dá para transcrever: registre em `figuras` (da questão ou do",
    "   contexto) com a página do PDF e a caixa aproximada; não as descreva no enunciado.",
    "5. Não coloque o número da questão no enunciado nem a letra no texto da alternativa.",
    "6. `gabarito_lido`: a resposta DESTE caderno segundo o gabarito definitivo anexo — letra de A a E, ou C/E para",
    "   certo/errado. Questão anulada: `anulada` = true e `gabarito_lido` = null. Se o gabarito tiver vários cargos ou",
    "   tipos de caderno e não der para saber com segurança qual bloco vale para este caderno, use null e explique em `alertas`.",
    "7. Ignore capa, instruções gerais, folha de respostas e provas discursivas (registre em `caderno.observacoes`).",
    "8. `pagina`: página do PDF (começando em 1) onde a questão começa.",
    "9. Fórmulas e símbolos: escreva em texto legível com Unicode, sem LaTeX (ex.: Var(X − Y) = 2; P → (Q ∨ ¬R); √n · X̄ / σ; x² + 3x).",
  ];
  return lines.filter((l, i) => l !== "" || lines[i - 1] !== "").join("\n");
}

// ---------- esquema no formato do Gemini (subconjunto OpenAPI: "nullable" em vez de anyOf com null) ----------
export function toGeminiSchema(s: any): any {
  if (!s || typeof s !== "object") return s;
  if (Array.isArray(s.anyOf)) {
    const real = s.anyOf.filter((x: any) => x?.type !== "null");
    if (real.length === 1) return { ...toGeminiSchema(real[0]), nullable: true, ...(s.description ? { description: s.description } : {}) };
  }
  const out: any = {};
  if (s.type) out.type = String(s.type).toUpperCase();
  if (s.description) out.description = s.description;
  if (s.enum) out.enum = s.enum;
  if (s.properties) {
    out.properties = Object.fromEntries(Object.entries(s.properties).map(([k, v]) => [k, toGeminiSchema(v)]));
    out.propertyOrdering = Object.keys(s.properties);
  }
  if (s.required) out.required = s.required;
  if (s.items) out.items = toGeminiSchema(s.items);
  return out;
}

// ---------- gabarito oficial lido de forma determinística (mesma regra do question-collector) ----------
export function parseCebraspeAnswerTable(text: string) {
  const out = new Map<number, string>();
  const tokens = String(text || "").replace(/\r/g, " ").split(/\s+/).filter(Boolean);
  let i = 0;
  while (i < tokens.length) {
    if (!/^\d{1,3}$/.test(tokens[i])) { i++; continue; }
    const nums: number[] = []; let j = i;
    while (j < tokens.length && /^\d{1,3}$/.test(tokens[j]) && nums.length < 60) { nums.push(Number(tokens[j])); j++; }
    const ans: string[] = []; let k = j;
    while (k < tokens.length && (/^(C|E|X)$/i.test(tokens[k]) || /^[ABD]$/.test(tokens[k])) && ans.length < 60) { ans.push(tokens[k].toUpperCase()); k++; }
    if (nums.length >= 5 && ans.length >= 5) {
      const n = Math.min(nums.length, ans.length);
      for (let z = 0; z < n; z++) { const q = nums[z]; if (q >= 1 && q <= 250) out.set(q, ans[z] === "X" ? "ANULADA" : ans[z]); }
      i = k;
    } else i++;
  }
  return out;
}

// Gabarito "seguro" só quando há um único bloco (sem vários cargos/tipos no mesmo PDF).
export function officialAnswersFromKey(board: string | null | undefined, keyText: string | null | undefined) {
  if (!keyText) return new Map<number, string>();
  if (/CEBRASPE|CESPE/i.test(String(board || ""))) return parseCebraspeAnswerTable(keyText);
  return new Map<number, string>();
}

// ---------- comparação de textos ----------
export function normalizeForMatch(s: string) {
  return String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "")
    .toLowerCase().replace(/[^a-z0-9]+/g, " ").replace(/\s+/g, " ").trim();
}
export function similarity(a: string, b: string) {
  const A = new Set(normalizeForMatch(a).split(" ").filter((x) => x.length > 2));
  const B = new Set(normalizeForMatch(b).split(" ").filter((x) => x.length > 2));
  if (!A.size || !B.size) return 0;
  let hit = 0; for (const x of A) if (B.has(x)) hit++;
  return hit / Math.max(A.size, B.size);
}
export function normalizeStatement(s: string) { return s.toLowerCase().replace(/\s+/g, " ").trim(); }

function normalizeAiAnswer(q: any): string | null {
  if (q?.anulada) return "ANULADA";
  const a = String(q?.gabarito_lido ?? "").trim().toUpperCase();
  if (!a) return null;
  if (q?.tipo === "certo_errado") {
    if (a === "C" || a.startsWith("CERT")) return "C";
    if (a === "E" || a.startsWith("ERR")) return "E";
    return null;
  }
  return /^[A-E]$/.test(a) ? a : null;
}

// ---------- plano de gravação de uma extração ----------
export interface ExistingRow { id: string; question_number: number; statement: string; answer: string | null; context_id: string | null; figure_refs: any; review_flags: any }
export interface ContextPlan { key: string; content: string; figure_refs: any[] }
export interface InsertPlan { question_number: number; context_key: string | null; row: Record<string, unknown> }
export interface UpdatePlan { id: string; question_number: number; context_key: string | null; patch: Record<string, unknown> }

// method: quem leu (claude_pdf_v1, gemini_pdf_v1, claude_routine_v1). only: números pedidos numa leitura
// direcionada; o resto da resposta é ignorado. Toda leitura por IA leva o alerta "lido_por_ia" para a revisão.
export function planIngestion(ai: any, existing: ExistingRow[], officialAnswers: Map<number, string>, src: SourceMeta & { exam_pdf_url?: string | null; answer_key_pdf_url?: string | null; provider?: string | null },
  method: string = EXTRACTION_METHOD, only?: Set<number> | null) {
  const byNumber = new Map<number, ExistingRow>(existing.map((r) => [r.question_number, r]));
  const contexts: ContextPlan[] = [];
  const ctxIds = new Set<string>();
  const ctxHasFigure = new Set<string>();
  for (const c of ai?.contextos || []) {
    const key = String(c?.id || "").trim();
    const content = String(c?.texto || "").trim();
    if (!key || !content || ctxIds.has(key)) continue;
    ctxIds.add(key);
    const figs = Array.isArray(c.figuras) ? c.figuras : [];
    if (figs.length) ctxHasFigure.add(key);
    contexts.push({ key, content, figure_refs: figs });
  }
  const inserts: InsertPlan[] = [];
  const updates: UpdatePlan[] = [];
  const report = { ai_questions: 0, inserted_validated: 0, inserted_review: 0, annulled: 0, updated_existing: 0, text_mismatch: 0, answer_mismatch: 0, missing_from_ai: [] as number[], skipped: [] as string[] };
  const seen = new Set<number>();
  const usedContexts = new Set<string>();
  for (const q of ai?.questoes || []) {
    const n = Number(q?.numero);
    const statement = String(q?.enunciado || "").trim();
    if (!Number.isInteger(n) || n < 1 || n > 250 || seen.has(n)) { report.skipped.push(`número inválido ou repetido: ${q?.numero}`); continue; }
    if (only && !only.has(n)) continue;
    seen.add(n);
    report.ai_questions++;
    const isTF = q?.tipo === "certo_errado";
    const ctxKey = q?.contexto_id && ctxIds.has(String(q.contexto_id)) ? String(q.contexto_id) : null;
    if (ctxKey) usedContexts.add(ctxKey);
    const figs = Array.isArray(q?.figuras) ? q.figuras : [];
    const flags: string[] = [];
    if (figs.length) flags.push("tem_figura");
    if (ctxKey && ctxHasFigure.has(ctxKey)) flags.push("contexto_com_figura");
    if ((q?.alertas || []).length) flags.push("alerta_ia");
    const aiAnswer = normalizeAiAnswer(q);
    const prev = byNumber.get(n);
    const official = prev?.answer ?? officialAnswers.get(n) ?? null;

    if (prev) {
      if (similarity(prev.statement, statement) < 0.8) { flags.push("texto_divergente_ia"); report.text_mismatch++; }
      if (aiAnswer && official && aiAnswer !== official) { flags.push("gabarito_divergente_ia"); report.answer_mismatch++; }
      const prevFlags: string[] = Array.isArray(prev.review_flags) ? prev.review_flags : [];
      const patch: Record<string, unknown> = { review_flags: [...new Set([...prevFlags, ...flags])] };
      if ((!Array.isArray(prev.figure_refs) || !prev.figure_refs.length) && figs.length) patch.figure_refs = figs;
      updates.push({ id: prev.id, question_number: n, context_key: prev.context_id ? null : ctxKey, patch });
      report.updated_existing++;
      continue;
    }

    if (!statement || statement.length < 8) { report.skipped.push(`questão ${n}: enunciado vazio`); continue; }
    const letters = (q?.alternativas || []).map((a: any) => String(a?.letra || "")).join("");
    let options: string[];
    if (isTF) options = ["Certo", "Errado"];
    else {
      const alts = (q?.alternativas || []).slice().sort((a: any, b: any) => String(a.letra).localeCompare(String(b.letra)));
      if (alts.length < 2 || alts.length > 5 || letters.split("").sort().join("") !== "ABCDE".slice(0, alts.length)) {
        report.skipped.push(`questão ${n}: alternativas incompletas (${letters || "nenhuma"})`); continue;
      }
      options = alts.map((a: any) => String(a.texto || "").trim());
    }
    let answer = official ?? aiAnswer;
    let status = "validated";
    if (!answer) { report.skipped.push(`questão ${n}: sem gabarito`); continue; }
    if (official) {
      if (aiAnswer && aiAnswer !== official) { status = "pending_validation"; flags.push("gabarito_divergente_ia"); report.answer_mismatch++; }
      else if (official === "ANULADA") status = "annulled";
    } else {
      status = answer === "ANULADA" ? "annulled" : "pending_validation";
      flags.push("gabarito_lido_pela_ia");
    }
    if (status !== "annulled" && !isTF && "ABCDE".slice(0, options.length).indexOf(answer) < 0) {
      status = "pending_validation"; flags.push("gabarito_fora_das_alternativas");
    }
    if (isTF && status !== "annulled" && answer !== "C" && answer !== "E") { status = "pending_validation"; flags.push("gabarito_fora_das_alternativas"); }
    if (status === "annulled") report.annulled++;
    else if (status === "validated") report.inserted_validated++;
    else report.inserted_review++;
    inserts.push({
      question_number: n,
      context_key: ctxKey,
      row: {
        question_number: n, statement, options, answer, question_type: isTF ? "true_false" : "multiple_choice",
        board: src.board ?? null, year: src.year ?? null, institution: src.institution ?? null, role_name: src.role_name ?? null,
        status,
        validation_method: official ? "official_answer_key_pdf" : "ai_read_answer_key",
        validation_source_type: "official",
        exam_source_type: "official", exam_source_name: src.provider || "Fonte oficial", exam_source_url: src.exam_pdf_url ?? null,
        answer_source_type: "official", answer_source_name: src.provider || "Fonte oficial", answer_source_url: src.answer_key_pdf_url ?? null,
        classification_status: status === "annulled" ? "review_needed" : "pending",
        publication_status: status === "annulled" ? "withheld" : "banked",
        figure_refs: figs, review_flags: [...new Set([...flags, "lido_por_ia"])], extraction_method: method,
        media_urls: [],
      },
    });
  }
  for (const n of officialAnswers.keys()) if (!seen.has(n) && !byNumber.has(n) && (!only || only.has(n))) report.missing_from_ai.push(n);
  if (only) for (const n of only) if (!seen.has(n) && !officialAnswers.has(n) && !byNumber.has(n)) report.missing_from_ai.push(n);
  report.missing_from_ai.sort((a, b) => a - b);
  return { contexts: contexts.filter((c) => usedContexts.has(c.key)), inserts, updates, report };
}

// Divide a lista de números em duas metades (para refazer um caderno grande que estourou max_tokens).
export function splitRange(numbers: number[], range?: { from: number; to: number } | null) {
  const ns = [...new Set(numbers)].filter((n) => !range || (n >= range.from && n <= range.to)).sort((a, b) => a - b);
  if (ns.length < 2) return null;
  const mid = Math.ceil(ns.length / 2);
  return [{ from: ns[0], to: ns[mid - 1] }, { from: ns[mid], to: ns[ns.length - 1] }];
}

// ---------- classificação por módulo ----------
export interface CatalogEntry { module_id: string; discipline_name: string; subject_name: string; description?: string | null }
export const OUT_OF_CATALOG = "fora_do_catalogo";

export function classifySchema(catalog: CatalogEntry[]) {
  return {
    type: "object",
    additionalProperties: false,
    required: ["classificacoes"],
    properties: {
      classificacoes: {
        type: "array",
        items: {
          type: "object",
          additionalProperties: false,
          required: ["id", "module_id", "confianca", "disciplina_sugerida", "justificativa"],
          properties: {
            id: { type: "string" },
            module_id: { type: "string", enum: [...catalog.map((c) => c.module_id), OUT_OF_CATALOG] },
            confianca: { type: "string", enum: ["alta", "media", "baixa"] },
            disciplina_sugerida: { type: "string" },
            justificativa: { type: "string" },
          },
        },
      },
    },
  };
}

export function classifySystem(catalog: CatalogEntry[]) {
  const lines = catalog.map((c) => `- ${c.module_id} — ${c.discipline_name}: ${c.subject_name}${c.description ? " (" + c.description + ")" : ""}`);
  return [
    "Você classifica questões de concursos policiais nos módulos de estudo do NEXO.",
    "Para cada questão, escolha o módulo mais específico cujo conteúdo a questão realmente cobra.",
    `Se o assunto da questão não estiver no catálogo (por exemplo Português, Informática, Raciocínio Lógico, Contabilidade, Direito Processual Penal ou legislação especial sem módulo próprio), use "${OUT_OF_CATALOG}" e informe a disciplina em disciplina_sugerida.`,
    "confianca: alta só quando o tema é inequívoco e o módulo escolhido cobre exatamente o assunto cobrado (a questão vai ao ar automaticamente nesse módulo); media quando há dois módulos plausíveis ou o módulo cobre o assunto só em parte; baixa quando a questão mistura temas, parece trazer texto de outra questão ou está incompleta.",
    "Classifique pelo conteúdo jurídico ou técnico que a resposta exige, não pelas palavras do cenário (ex.: um caso de delegado que pergunta sobre prescrição é Direito Penal, não Polícia Judiciária).",
    "justificativa: uma frase curta.",
    "",
    "Catálogo de módulos:",
    ...lines,
  ].join("\n");
}

export function classifyUserText(questions: { id: string; statement: string; options: unknown; context?: string | null; board?: string | null; year?: number | null }[]) {
  const blocks = questions.map((q) => {
    const opts = Array.isArray(q.options) && q.options.length > 2
      ? "\n" + (q.options as string[]).map((o, i) => `${"ABCDE"[i]}) ${o}`).join("\n") : "";
    const ctx = q.context ? `Texto-base: ${q.context}\n` : "";
    return `### id: ${q.id}\n${ctx}${q.statement}${opts}`;
  });
  return "Classifique cada questão abaixo (responda uma entrada por id).\n\n" + blocks.join("\n\n");
}

export const CONFIDENCE: Record<string, number> = { alta: 0.9, media: 0.7, baixa: 0.4 };
