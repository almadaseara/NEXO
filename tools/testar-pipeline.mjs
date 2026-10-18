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

console.log('OK: pipeline oficial v2 — pareamento Cebraspe, esquema, gabarito e plano de gravação.');
