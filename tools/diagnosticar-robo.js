#!/usr/bin/env node
/* Diagnóstico somente leitura do coletor de documentos no GitHub.
 * IMPORTANTE: este arquivo descreve o pipeline de descoberta do GitHub,
 * NÃO o banco Supabase (que pode conter pares e questões já validadas).
 */
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const status = JSON.parse(fs.readFileSync(path.join(__dirname,'..','data','robot-status.json'),'utf8'));
const warnings = [];
const errors = [];
const numeric = ['runs','candidates_total','provas','gabaritos','pdfs_unclassified','pairs_pending_validation','errors_last_run'];
for (const k of numeric) {
  if (!Number.isInteger(status[k]) || status[k] < 0) errors.push('Valor inválido: ' + k);
}
if (!status.updated_at || Number.isNaN(Date.parse(status.updated_at))) errors.push('updated_at inválido');
if (status.candidates_total !== status.provas + status.gabaritos + status.pdfs_unclassified) errors.push('A soma dos tipos de documento diverge do total de candidatos');
if (status.enabled && status.candidates_total > 0 && status.gabaritos === 0) warnings.push('Descoberta ativa, mas sem gabaritos identificados: revisar classificação de PDFs e fontes');
if (status.pairs_pending_validation > 0) warnings.push('Existem pares aguardando validação manual');
if (status.errors_last_run > 0) warnings.push('A última execução registrou erro(s)');
const result = {
  pipeline: 'github_document_discovery',
  atualizado_em: status.updated_at,
  habilitado: status.enabled,
  execucoes: status.runs,
  candidatos: status.candidates_total,
  provas: status.provas,
  gabaritos: status.gabaritos,
  documentos_nao_classificados: status.pdfs_unclassified,
  pares_pendentes: status.pairs_pending_validation,
  erros_ultima_execucao: status.errors_last_run,
  por_banca: status.by_board || {},
  por_ano: status.by_year || {},
  alertas: warnings,
  falhas_integridade: errors
};
if (process.argv.includes('--json')) console.log(JSON.stringify(result,null,2));
else {
  console.log('NEXO — diagnóstico do robô de descoberta (GitHub)');
  console.log('Atualizado: ' + result.atualizado_em + ' | execuções: ' + result.execucoes);
  console.log('Candidatos: ' + result.candidatos + ' | provas: ' + result.provas + ' | gabaritos: ' + result.gabaritos + ' | não classificados: ' + result.documentos_nao_classificados);
  for (const m of warnings) console.warn('ATENÇÃO: ' + m);
  for (const m of errors) console.error('ERRO: ' + m);
  console.log('Os números do Supabase não estão incluídos neste relatório.');
}
if (errors.length) process.exitCode = 1;
