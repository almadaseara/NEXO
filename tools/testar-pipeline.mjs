#!/usr/bin/env node
/* Regressão do pipeline oficial v2 (source-resolver/cebraspe.ts e nexo-ai/lib.ts): sem rede, sem Supabase.
   Requer Node 24+ (importa .ts diretamente). */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { pairCebraspeFiles, isPoliceEvent, examSuffix, answerSuffix } from '../supabase/functions/source-resolver/cebraspe.ts';
import {
  EXTRACTION_SCHEMA, planIngestion, parseCebraspeAnswerTable, splitRange, classifySchema, buildExtractionInstructions, OUT_OF_CATALOG,
} from '../supabase/functions/nexo-ai/lib.ts';

const here = path.dirname(fileURLToPath(import.meta.url));
const fx = JSON.parse(fs.readFileSync(path.join(here, 'fixtures/cebraspe-eventos.json'), 'utf8'));

// ---------- Cebraspe: pareamento prova objetiva ↔ gabarito definitivo ----------
const pares = (id) => pairCebraspeFiles(fx[id].arquivosGabarito, id);
const nomes = (p) => p.map((x) => x.exam.split('/').pop() + ' <-> ' + x.answer.split('/').pop());

assert.deepEqual(nomes(pares('PC_SE_21')), [
  '605_PCSE_CG1_01.PDF <-> GAB_DEFINITIVO_605_PCSE_CG1_01.PDF',
  '605_PCSE_001_01.PDF <-> GAB_DEFINITIVO_605_PCSE_001_01.PDF',
  '605_PCSE_002_01.PDF <-> GAB_DEFINITIVO_605_PCSE_002_01.PDF',
], 'PC/SE 2021: gerais + cargos 1 e 2');
assert.equal(pares('PF_21').length, 4, 'PF 2021: quatro cargos pareados pela descrição');
assert.ok(pares('PF_21')[1].answer.endsWith('GAB_DEFINITIVO_MATRIZ_577_PF_002_00.PDF'), 'PF 2021: agente com o gabarito do cargo 2');
assert.equal(pares('PF_25').length, 20, 'PF 2025: 17 específicos + 3 blocos básicos');
const depen = pares('DEPEN_20');
assert.ok(depen.some((p) => p.exam.endsWith('MATRIZ_541_DEPEN_001_00.PDF') && p.answer.endsWith('GAB_DEFINITIVO_MATRIZ_541_DEPEN_001_00.PDF')),
  'DEPEN 2020: caderno matriz pareado pelo nome do arquivo');
for (const id of Object.keys(fx)) for (const p of pares(id)) {
  assert.ok(!/PRELIMINAR/i.test(p.key_desc), `${id}: nunca usar gabarito preliminar`);
  assert.ok(!/DISCURSIV|PADR/i.test(p.exam_desc), `${id}: nunca parear prova discursiva`);
}
assert.equal(pares('PM_AL_26').length, 0, 'Concurso sem arquivos ainda: nenhum par');
assert.equal(examSuffix('PROVA DISCURSIVA - CARGO 1'), null);
assert.equal(answerSuffix('GABARITO PRELIMINAR - CARGO 1'), null);
assert.equal(examSuffix('1.ª PROVA OBJETIVA - CURSO DE FORMAÇÃO'), answerSuffix('GABARITO DEFINITIVO - 1.ª PROVA OBJETIVA - CURSO DE FORMAÇÃO'));

assert.equal(isPoliceEvent({ eventoURL: 'PC_SE_21' }), true);
assert.equal(isPoliceEvent({ eventoURL: 'CBM_AL_26' }), true);
assert.equal(isPoliceEvent({ eventoURL: 'PF_25_ADM', eventoNomeCompleto: 'POLÍCIA FEDERAL — ADMINISTRATIVO' }), false, 'Cargos administrativos fora do escopo');
assert.equal(isPoliceEvent({ eventoURL: 'TJ_SP_25', eventoNomeCompleto: 'TRIBUNAL DE JUSTIÇA' }), false);
assert.equal(isPoliceEvent({ eventoURL: 'PREF_BOA_VISTA_23_GUARDA', eventoNomeCompleto: 'PREFEITURA DE BOA VISTA - GUARDA MUNICIPAL' }), true);

// ---------- esquema de saída: todo objeto fecha additionalProperties ----------
(function fechado(s, onde) {
  if (!s || typeof s !== 'object') return;
  if (s.type === 'object') {
    assert.equal(s.additionalProperties, false, 'additionalProperties:false em ' + onde);
    assert.deepEqual([...s.required].sort(), Object.keys(s.properties).sort(), 'todos os campos obrigatórios em ' + onde);
  }
  for (const [k, v] of Object.entries(s)) if (v && typeof v === 'object') fechado(v, onde + '.' + k);
})(EXTRACTION_SCHEMA, 'raiz');
const cls = classifySchema([{ module_id: 'adm_atos', discipline_name: 'Direito Administrativo', subject_name: 'Atos' }]);
assert.deepEqual(cls.properties.classificacoes.items.properties.module_id.enum, ['adm_atos', OUT_OF_CATALOG]);
assert.match(buildExtractionInstructions({ board: 'CEBRASPE', year: 2021 }, { from: 51, to: 120 }), /SOMENTE as questões de número 51 a 120/);

// ---------- gabarito Cebraspe (tabela C/E/X) ----------
const gab = parseCebraspeAnswerTable('1 2 3 4 5 6 C E X C E C 7 8 9 10 11 E E C C X');
assert.equal(gab.get(3), 'ANULADA');
assert.equal(gab.get(11), 'ANULADA');
assert.equal(gab.size, 11);

// ---------- plano de gravação ----------
const src = { board: 'CEBRASPE', year: 2025, institution: 'PF', role_name: 'Agente', provider: 'CEBRASPE OFICIAL', exam_pdf_url: 'https://x/p.pdf', answer_key_pdf_url: 'https://x/g.pdf' };
const ai = {
  caderno: { banca: 'CEBRASPE', orgao: 'PF', cargo: 'Agente', ano: 2025, tipo_caderno: null, observacoes: '' },
  contextos: [
    { id: 'T1', texto: 'conta | saldo (R$)\nbancos | 95.000', figuras: [] },
    { id: 'T2', texto: 'Texto não usado por nenhuma questão', figuras: [] },
    { id: 'T3', texto: 'Considere o mapa a seguir.', figuras: [{ pagina: 4, descricao: 'mapa', caixa: [0.1, 0.2, 0.9, 0.6] }] },
  ],
  questoes: [
    { numero: 105, tipo: 'certo_errado', contexto_id: null, enunciado: 'Pelo regime de competência, as receitas de vendas devem ser contabilizadas somente no recebimento.', alternativas: [], figuras: [], pagina: 3, gabarito_lido: 'E', anulada: false, alertas: [] },
    { numero: 107, tipo: 'certo_errado', contexto_id: 'T1', enunciado: 'O patrimônio líquido total da entidade é de R$ 100.000.', alternativas: [], figuras: [], pagina: 3, gabarito_lido: 'E', anulada: false, alertas: [] },
    { numero: 108, tipo: 'certo_errado', contexto_id: 'T1', enunciado: 'O passivo circulante resulta no valor de R$ 5.700.', alternativas: [], figuras: [], pagina: 3, gabarito_lido: 'E', anulada: false, alertas: [] },
    { numero: 109, tipo: 'certo_errado', contexto_id: 'T3', enunciado: 'A região indicada concentra a maior apreensão.', alternativas: [], figuras: [], pagina: 4, gabarito_lido: 'C', anulada: false, alertas: [] },
    { numero: 111, tipo: 'certo_errado', contexto_id: null, enunciado: 'O balancete de verificação permite que se identifiquem lançamentos equivocados.', alternativas: [], figuras: [], pagina: 4, gabarito_lido: null, anulada: true, alertas: [] },
    { numero: 112, tipo: 'certo_errado', contexto_id: 'X9', enunciado: 'Item sem gabarito oficial conhecido no texto do PDF.', alternativas: [], figuras: [], pagina: 5, gabarito_lido: 'C', anulada: false, alertas: [] },
  ],
};
const existing = [{ id: 'q105', question_number: 105, statement: 'Pelo regime de competência, as receitas de vendas devem ser contabilizadas somente no momento do recebimento.', answer: 'E', context_id: null, figure_refs: [], review_flags: [] }];
const official = new Map([[105, 'E'], [107, 'E'], [108, 'C'], [109, 'C'], [110, 'C'], [111, 'ANULADA']]);
const plan = planIngestion(ai, existing, official, src);

assert.deepEqual(plan.contexts.map((c) => c.key), ['T1', 'T3'], 'Só contextos usados');
assert.equal(plan.updates.length, 1, 'Registro existente só recebe complementos');
assert.deepEqual(Object.keys(plan.updates[0].patch).sort(), ['review_flags'], 'Nunca altera enunciado/gabarito de registro existente');
const ins = Object.fromEntries(plan.inserts.map((i) => [i.question_number, i]));
assert.equal(ins[107].row.status, 'validated', 'IA confere com o gabarito oficial');
assert.equal(ins[107].context_key, 'T1');
assert.equal(ins[108].row.status, 'pending_validation', 'IA diverge do gabarito oficial: revisão');
assert.equal(ins[108].row.answer, 'C', 'Gabarito gravado é sempre o oficial');
assert.ok(ins[108].row.review_flags.includes('gabarito_divergente_ia'));
assert.ok(ins[109].row.review_flags.includes('contexto_com_figura'));
assert.equal(ins[111].row.status, 'annulled');
assert.equal(ins[111].row.publication_status, 'withheld');
assert.equal(ins[112].row.status, 'pending_validation', 'Sem gabarito oficial determinístico: revisão');
assert.ok(ins[112].row.review_flags.includes('gabarito_lido_pela_ia'));
assert.equal(ins[112].context_key, null, 'Contexto inexistente não é ligado');
for (const i of plan.inserts) assert.equal(i.row.publication_status === 'published', false, 'Nada é publicado automaticamente');
assert.deepEqual(plan.report.missing_from_ai, [110], 'Questão do gabarito ausente na extração é relatada');

// Múltipla escolha com 4 alternativas e gabarito fora delas.
const mc = planIngestion({ caderno: {}, contextos: [], questoes: [
  { numero: 1, tipo: 'multipla_escolha', contexto_id: null, enunciado: 'Assinale a alternativa correta sobre o inquérito policial.', alternativas: [
    { letra: 'B', texto: 'É dispensável.' }, { letra: 'A', texto: 'É obrigatório.' }, { letra: 'C', texto: 'É público.' }, { letra: 'D', texto: 'É contraditório.' }],
    figuras: [], pagina: 2, gabarito_lido: 'E', anulada: false, alertas: [] },
  { numero: 2, tipo: 'multipla_escolha', contexto_id: null, enunciado: 'Questão com alternativas faltando no texto extraído.', alternativas: [{ letra: 'A', texto: 'x' }, { letra: 'C', texto: 'y' }],
    figuras: [], pagina: 2, gabarito_lido: 'A', anulada: false, alertas: [] },
] }, [], new Map(), { board: 'AOCP' });
assert.equal(mc.inserts.length, 1);
assert.deepEqual(mc.inserts[0].row.options, ['É obrigatório.', 'É dispensável.', 'É público.', 'É contraditório.'], 'Alternativas em ordem de letra');
assert.ok(mc.inserts[0].row.review_flags.includes('gabarito_fora_das_alternativas'));
assert.equal(mc.inserts[0].row.status, 'pending_validation');
assert.ok(mc.report.skipped.some((s) => s.startsWith('questão 2')), 'Alternativas incompletas não são gravadas');

// Caderno grande: divisão em duas partes.
assert.deepEqual(splitRange([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]), [{ from: 1, to: 5 }, { from: 6, to: 10 }]);
assert.deepEqual(splitRange([51, 52, 53, 54, 55, 56], { from: 51, to: 53 }), [{ from: 51, to: 52 }, { from: 53, to: 53 }]);
assert.equal(splitRange([7]), null);

// ---------- extrator com posição na página (question-collector/layout.ts) ----------
const { segmentCebraspe, segmentMultipleChoice, planCollect, mergeImages, GARBLED } = await import('../supabase/functions/question-collector/layout.ts');
const linha = (page, col, y, x0, text) => ({ page, col, y, x0, x1: x0 + text.length * 4.5, text });
const pag = [{ w: 595, h: 842 }, { w: 595, h: 842 }, { w: 595, h: 842 }];

// Cebraspe: número na margem (28), continuação com recuo de item (46), parágrafo de texto-base com outro recuo (57).
const ce = segmentCebraspe({ pages: pag, images: [], lines: [
  linha(1, 0, 790, 160, '-- CONHECIMENTOS ESPECÍFICOS --'),
  linha(1, 0, 770, 28, 'A respeito do inquérito policial, julgue os itens seguintes.'),
  linha(1, 0, 755, 28, '59 No caso de repressão a crime de tráfico de pessoas, a autoridade'),
  linha(1, 0, 744, 46, 'policial poderá requisitar dados às empresas de telefonia.'),
  linha(1, 0, 730, 28, '60 O indiciamento é ato privativo do delegado de polícia.'),
  linha(1, 1, 780, 332, 'Um usuário recebeu a seguinte planilha, criada no Excel.'),
  linha(1, 1, 768, 303, 'Tendo como referência essa situação hipotética, julgue o item.'),
  linha(1, 1, 750, 303, '61 Basta usar o Preenchimento Relâmpago na coluna C.'),
  linha(2, 0, 780, 28, 'Considere as variáveis ' + String.fromCharCode(0x1810) + ' e Y.'),
  linha(2, 0, 765, 28, '62 Var(X) = 2.'),
] }, new Map([[59, 'C'], [60, 'E'], [61, 'E'], [62, 'C'], [63, 'C']]));
const ceN = Object.fromEntries(ce.items.map((i) => [i.n, i]));
assert.deepEqual(ce.items.map((i) => i.n), [59, 60, 61, 62]);
assert.ok(ceN[59].text.endsWith('empresas de telefonia.'), 'Continuação recuada entra no item');
assert.match(ce.contexts.find((c) => c.key === ceN[59].context).text, /^A respeito do inquérito policial/, 'Comando do bloco vira contexto (sem o título de seção)');
assert.equal(ceN[60].context, ceN[59].context, 'Itens do mesmo bloco compartilham o contexto');
assert.match(ce.contexts.find((c) => c.key === ceN[61].context).text, /^Um usuário recebeu/, 'Parágrafo com outro recuo é texto-base, não continuação do item 60');
assert.equal(ceN[62].garbled, true, 'Fórmula ilegível no texto-base marca o item');
assert.ok(GARBLED.test(String.fromCharCode(0xe000)) && !GARBLED.test('Ação — “texto” • 1º'), 'Detector de símbolos ilegíveis não pega português comum');

// Múltipla escolha: capa descartada, título de matéria não vira contexto, alternativas com continuação recuada,
// herança de texto-base só para a primeira questão ou quem cita o texto.
const mcq = segmentMultipleChoice({ pages: pag, images: [
  { page: 2, col: 0, y: 750, name: 'img_p1_1', box: [0.07, 0.10, 0.6, 0.11] },
], lines: [
  linha(1, 0, 760, 43, 'LEIA COM ATENÇÃO • Você receberá o cartão de respostas.'),
  linha(2, 0, 790, 43, 'Língua Portuguesa'),
  linha(2, 0, 775, 43, 'A cidade amanheceu cinzenta, e o investigador releu o relatório.'),
  linha(2, 0, 765, 43, '1'),
  linha(2, 0, 755, 43, 'Segundo o texto, o investigador'),
  linha(2, 0, 745, 43, '(A) dormiu.'), linha(2, 0, 735, 43, '(B) releu o relatório'), linha(2, 0, 725, 57, 'ao amanhecer.'),
  linha(2, 0, 715, 43, '(C) saiu.'), linha(2, 0, 705, 43, '(D) chorou.'),
  linha(2, 0, 695, 43, '2'),
  linha(2, 0, 685, 43, 'Assinale a frase com linguagem figurada.'),
  linha(2, 0, 675, 43, '(A) Ele é um leão.'), linha(2, 0, 665, 43, '(B) Choveu.'), linha(2, 0, 655, 43, '(C) Saí.'), linha(2, 0, 645, 43, '(D) Li.'),
  linha(3, 0, 790, 43, 'Noções de Direito Constitucional'),
  linha(3, 0, 770, 43, '3'),
  linha(3, 0, 760, 43, 'Sobre o habeas corpus, assinale a afirmativa correta.'),
  linha(3, 0, 750, 43, '(A) a) b'), linha(3, 0, 740, 43, '(B) c'), linha(3, 0, 730, 43, '(C) d'), linha(3, 0, 720, 43, '(D) e'), linha(3, 0, 710, 43, '(E) f'),
] }, new Map([[1, 'B'], [2, 'A'], [3, 'E']]));
const mcqN = Object.fromEntries(mcq.items.map((i) => [i.n, i]));
assert.deepEqual(mcq.items.map((i) => i.n), [1, 2, 3]);
assert.equal(mcq.contexts.length, 1, 'Só o texto da prova vira contexto (capa e título de matéria não)');
assert.match(mcq.contexts[0].text, /^A cidade amanheceu/);
assert.equal(mcqN[1].options[1], 'releu o relatório ao amanhecer.', 'Alternativa com continuação recuada');
assert.equal(mcqN[1].figures.length, 1, 'Figura dentro do enunciado fica na própria questão');
assert.equal(mcqN[2].context, null, 'Questão que não cita o texto não herda o texto-base');
assert.equal(mcqN[3].context, null, 'Título de matéria encerra o texto-base anterior');
assert.equal(mcqN[3].options.length, 5);

// Decisão por número: fórmula, figura citada sem imagem e questão não achada vão para a segunda leitura.
const plano = planCollect(ce, [{ question_number: 63, statement: 'Item recuperado pelo extrator antigo, sem contexto pendente.', options: ['Certo', 'Errado'], answer: 'C', question_type: 'true_false' }],
  new Map([[59, 'C'], [60, 'E'], [61, 'E'], [62, 'C'], [63, 'C'], [64, 'E']]));
assert.deepEqual(plano.ready.map((q) => q.question_number), [59, 60, 63]);
assert.equal(plano.reasons[61], 'tabela_nao_localizada', 'Planilha citada sem figura nem tabela localizada: segunda leitura');
assert.equal(plano.reasons[62], 'formula');
assert.equal(plano.reasons[64], 'nao_encontrada');
assert.equal(plano.ready.find((q) => q.question_number === 63).method, 'pdfjs_regex_v27');

// Figura fatiada em faixas encostadas vira uma só.
const fig = mergeImages([
  { page: 3, col: 1, y: 759, name: 'a', box: [0.51, 0.098, 0.953, 0.150] },
  { page: 3, col: 1, y: 715, name: 'b', box: [0.51, 0.150, 0.953, 0.202] },
  { page: 3, col: 1, y: 591, name: 'c', box: [0.51, 0.297, 0.952, 0.351] },
]);
assert.equal(fig.length, 2);
assert.equal(fig[0].name, 'a+b');
assert.deepEqual(fig[0].box, [0.51, 0.098, 0.953, 0.202]);

// ---------- segunda leitura (Gemini gratuito e rotina do Claude) ----------
const { toGeminiSchema } = await import('../supabase/functions/nexo-ai/lib.ts');
const gs = toGeminiSchema(EXTRACTION_SCHEMA);
assert.equal(gs.type, 'OBJECT');
assert.equal(gs.properties.caderno.properties.ano.type, 'INTEGER');
assert.equal(gs.properties.caderno.properties.ano.nullable, true, 'anyOf com null vira nullable');
assert.equal(JSON.stringify(gs).includes('additionalProperties'), false, 'Gemini não recebe additionalProperties');
assert.deepEqual(gs.properties.questoes.items.properties.tipo.enum, ['multipla_escolha', 'certo_errado']);

const alvo = planIngestion({ caderno: {}, contextos: [], questoes: [
  { numero: 71, tipo: 'certo_errado', contexto_id: null, enunciado: 'X e Y são independentes.', alternativas: [], figuras: [], pagina: 2, gabarito_lido: null, anulada: false, alertas: [] },
  { numero: 80, tipo: 'certo_errado', contexto_id: null, enunciado: 'Questão que não foi pedida nesta leitura.', alternativas: [], figuras: [], pagina: 2, gabarito_lido: null, anulada: false, alertas: [] },
] }, [], new Map([[71, 'E'], [72, 'C'], [80, 'C']]), src, 'gemini_pdf_v1', new Set([71, 72]));
assert.deepEqual(alvo.inserts.map((i) => i.question_number), [71], 'Leitura direcionada ignora números não pedidos');
assert.equal(alvo.inserts[0].row.extraction_method, 'gemini_pdf_v1');
assert.equal(alvo.inserts[0].row.status, 'validated', 'Sem gabarito lido pela IA, vale o oficial');
assert.ok(alvo.inserts[0].row.review_flags.includes('lido_por_ia'), 'Toda leitura por IA leva o alerta para a revisão');
assert.deepEqual(alvo.report.missing_from_ai, [72], 'Número pedido e não devolvido continua pendente');

// Texto antigo com rodapé colado é trocado pela leitura limpa só quando é a mesma questão.
const { cleanReplacement } = await import('../supabase/functions/question-collector/layout.ts');
const nova = { question_number: 30, statement: 'O servidor que pratica o ato responde por estrito cumprimento do dever legal.', options: ['Certo', 'Errado'],
  answer: 'E', question_type: 'true_false', context: null, figures: [], flags: [], method: 'pdf_layout_v28' };
const suja = { statement: nova.statement + ' POLÍCIA CIVIL DO ESTADO DO AMAZONAS - 2021 FGV Escrivão de Polícia – 4ª Classe Tipo Branca – Página 13', options: ['Certo', 'Errado'], question_type: 'true_false' };
assert.deepEqual(cleanReplacement(suja, nova), { statement: nova.statement, options: nova.options });
assert.equal(cleanReplacement({ ...suja, statement: nova.statement }, nova), null, 'Texto limpo não é tocado');
assert.equal(cleanReplacement({ ...suja, statement: 'Outra questão qualquer. Tipo Branca – Página 2' }, nova), null, 'Questão diferente não é trocada');
assert.equal(cleanReplacement({ ...suja, options: ['A', 'B', 'C', 'D'], question_type: 'multiple_choice' }, nova), null, 'Tipo/alternativas diferentes não são trocados');
assert.equal(cleanReplacement(suja, { ...nova, method: 'pdfjs_regex_v27' }), null, 'Só a leitura por posição substitui texto');

const rotinas = fs.readFileSync(path.join(here, '../docs/rotinas/segunda-leitura.md'), 'utf8');
assert.match(rotinas, /insert into public\.ai_external_extractions/, 'A rotina só deposita resultados');
assert.match(rotinas, /Proibido: alterar `question_bank`/);

console.log('OK: pipeline oficial v2 — pareamento Cebraspe, esquema, gabarito, plano de gravação, extrator por posição e segunda leitura.');
