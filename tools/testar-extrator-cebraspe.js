#!/usr/bin/env node
/* Regressão do extrator Cebraspe: apenas analisa código, sem Supabase/HTTP. */
const assert=require('node:assert/strict');
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const src=fs.readFileSync(path.join(__dirname,'../supabase/functions/question-collector/index.ts'),'utf8');
const begin=src.indexOf('function parseTrueFalse(');
const end=src.indexOf('function pdfLinks(',begin);
assert.ok(begin>=0&&end>begin,'Função parseTrueFalse não encontrada');
const js=src.slice(begin,end)
  .replace('text:string,answers:Map<number,string>','text,answers')
  .replace('const rows:any[]=[];','const rows=[];');
const parse=vm.runInNewContext(js+'\nparseTrueFalse');
const answers=new Map([[107,'E'],[108,'C'],[109,'E'],[110,'C'],[111,'ANULADA']]);
const sample=[
'--- PAGE 1 ---',
'Confira as informações na tabela a seguir: Ativo 2000 Passivo 1000.',
'107 O patrimônio líquido total da entidade, considerado o resultado do exercício, é de R$ 100.000.',
'108 O passivo circulante resulta no valor de R$ 5.700.',
'109 A conta de reservas da empresa apresentou variação patrimonial durante o exercício de referência.',
'110 O lucro apurado no exercício é de R$ 3.500. Julgue os itens a seguir, no que se refere a balancete de verificação contábil e demonstração do resultado.',
'111 O balancete de verificação permite que se identifiquem lançamentos que estejam equivocados.'
].join(' ');
const qs=parse(sample,answers);
assert.equal(qs.length,5,'Deve capturar cinco itens');
assert.deepEqual(Array.from(qs.map(q=>q.question_number)),[107,108,109,110,111]);
assert.equal(qs.find(q=>q.question_number===110).statement.includes('Julgue os itens a seguir'),false,'Não incorporar comando do bloco seguinte');
assert.equal(qs.find(q=>q.question_number===110).needs_context_review,true,'Marcar bloco de transição para revisão');
assert.equal(qs.find(q=>q.question_number===107).needs_context_review,true,'Marcar dependência da tabela compartilhada');
assert.equal(qs.find(q=>q.question_number===111).answer,'ANULADA');
assert.match(src,/if\(q\.needs_context_review\)\s*\{\s*rejected\+\+;\s*continue;/,'Retenção obrigatória antes da gravação');
console.log('OK: extrator Cebraspe separa comandos e retém contexto visual para revisão.');
