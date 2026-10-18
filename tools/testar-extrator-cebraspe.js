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
assert.match(src,/if\(q\.needs_context_review\)\s*\{\s*heldForAi\+\+;\s*continue;/,'Retenção obrigatória antes da gravação');
assert.match(src,/ai_status:"queued"/,'Item retido encaminha a fonte para a extração por IA');
assert.match(src,/if\(existingSet\.has\(q\.question_number\)\)\{keptExisting\+\+;continue;\}/,'Reprocessar não pode sobrescrever registro existente');
assert.doesNotMatch(src,/\b2018\s*&&|<2018|>2026/,'Janela de anos não pode ser fixa no código');

// Múltipla escolha com 4 alternativas (AOCP, Consulplan) e gabarito fora das letras.
const mcBegin=src.indexOf('function parseMultipleChoice(');
const mcEnd=src.indexOf('function parseTrueFalse(',mcBegin);
const mcJs=src.slice(mcBegin,mcEnd)
  .replace('text:string,answers:Map<number,string>','text,answers')
  .replace('const rows:any[]=[];','const rows=[];');
const parseMC=vm.runInNewContext(mcJs+'\nparseMultipleChoice');
const mcText='21 Assinale a alternativa correta acerca do inquérito policial conforme o Código de Processo Penal brasileiro vigente. (A) É peça obrigatória. (B) É dispensável. (C) É sigiloso sempre. (D) É contraditório. 22 Considerando a Lei de Execução Penal, assinale a alternativa que apresenta o direito correto do preso. (A) Visita íntima ilimitada. (B) Trabalho remunerado. (C) Saída livre. (D) Voto obrigatório. (E) Porte de arma.';
const mc=parseMC(mcText,new Map([[21,'B'],[22,'B']]));
assert.equal(mc.length,2,'Deve aceitar 4 e 5 alternativas');
assert.equal(mc[0].options.length,4);
assert.equal(mc[1].options.length,5);
assert.equal(parseMC(mcText,new Map([[21,'E'],[22,'B']])).length,1,'Gabarito E em questão de 4 alternativas é descartado');
// Regressão com enunciados reais da PF 2025 (bloco III), incluindo item 109 curto.
const realAnswers=new Map([[105,'E'],[106,'C'],[107,'E'],[108,'C'],[109,'E'],[110,'C'],[111,'ANULADA']]);
const realText=[
'105 Pelo regime de competência, as receitas de vendas devem ser contabilizadas somente no momento do recebimento do dinheiro, independentemente da entrega do produto ou serviço.',
'106 O valor pago antecipadamente pelo aluguel de uma sala comercial para uso por período de seis meses deve ser registrado pela empresa locatária como um direito no ativo, na conta despesas antecipadas, e deverá ser apropriado mensalmente como despesa, à medida que o direito de uso da sala for sendo consumido.',
'conta saldo (R$) bancos 95.000 materiais de consumo 4.000 máquinas 9.000 contas a pagar 5.700 capital 100.000 receita de serviços 7.000 despesas com taxas 1.500 despesa com pró-labore 2.000 despesa antecipada 1.200',
'Com base nos dados precedentes, relativos ao conjunto completo de saldos contábeis extraídos do balancete de uma empresa em 31/12 de determinado ano, julgue os itens que se seguem.',
'107 O patrimônio líquido total da entidade, considerado o resultado do exercício, é de R$ 100.000.',
'108 O passivo circulante resulta no valor de R$ 5.700.',
'109 O ativo soma R$ 109.200.',
'110 O lucro apurado no exercício é de R$ 3.500. Julgue os itens a seguir, no que se refere a balancete de verificação contábil, balanço patrimonial e demonstração de resultado do exercício.',
'111 O balancete de verificação permite que se identifiquem lançamentos que, embora estejam com débito e crédito equilibrados, tenham sido registrados equivocadamente em contas indevidas.'
].join(' ');
const parsed=parse(realText,realAnswers);
assert.deepEqual(Array.from(parsed.map(q=>q.question_number)),[105,106,107,108,109,110,111],'Deve preservar o item curto 109');
const item=n=>parsed.find(q=>q.question_number===n);
assert.ok(item(106).statement.endsWith('consumido.'),'106 não deve absorver tabela');
assert.equal(item(106).needs_context_review,true,'106 precisa de revisão pela separação da tabela');
assert.equal(item(109).statement,'O ativo soma R$ 109.200.','Item curto preservado integralmente');
for(const n of [107,108,109,110]) assert.equal(item(n).needs_context_review,true,'Bloco com tabela retido: '+n);
assert.equal(item(111).needs_context_review,false,'Bloco novo não deve herdar tabela anterior');
assert.ok(!item(110).statement.includes('Julgue os itens a seguir'),'110 não deve absorver novo comando');
console.log('OK: caso real PF 2025, itens 105–111, tabela e comando, validado em regressão.');
