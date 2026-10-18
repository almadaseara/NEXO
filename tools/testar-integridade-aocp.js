#!/usr/bin/env node
'use strict';
const fs = require('node:fs'), vm = require('node:vm'), assert = require('node:assert/strict');
const src = fs.readFileSync('supabase/functions/aocp-import/index.ts','utf8');
const begin = src.indexOf('function auditarImportacao(');
const end = src.indexOf('async function hashStatement(',begin);
assert(begin>=0&&end>begin,'Validador de integridade AOCP ausente');
const body=src.slice(begin,end)
  .replace('texto: string, respostas: Map<number,string>, questoes: any[]','texto, respostas, questoes')
  .replace('const problemas: string[] = [];','const problemas = [];')
  .replace('const semAlternativas = questoes.filter(q =>','const semAlternativas = questoes.filter(q =>')
  .replace('(v:string)=>','(v)=>');
const run=vm.runInNewContext(body+'\nauditarImportacao');
const respostas=new Map([[1,'A'],[2,'B'],[3,'ANULADA']]);
const opts=['um','dois','tres','quatro','cinco'];
const good=[{question_number:1,options:opts},{question_number:2,options:opts},{question_number:3,options:opts}];
assert.equal(run('Questões simples sem apoio visual.',respostas,good).apta,true);
const missing=run('Prova normal.',respostas,[good[0],good[2]]);
assert.equal(missing.apta,false);
assert.equal(missing.ausentes.join(','),'2');
assert.equal(run('Considere a tabela a seguir.',respostas,good).apta,false);
assert.equal(run('Observe o gráfico abaixo.',respostas,good).suspeita_visual,true);
assert.equal(run('Questão sem figura.',respostas,[good[0],good[0],good[2]]).apta,false);
assert.equal(run('Questões normais.',respostas,[{question_number:1,options:['A']},good[1],good[2]]).apta,false);
assert.match(src,/if\(!integridade\.apta\)\s*\{/,'Gravação precisa ser retida após auditoria');
assert(src.indexOf('if(!integridade.apta)') < src.indexOf('for (const q of qs)'), 'Regra de integridade precisa executar antes do loop de gravação');
console.log('OK: AOCP bloqueia ausência, duplicação, alternativas incompletas e contexto visual antes de gravar.');
