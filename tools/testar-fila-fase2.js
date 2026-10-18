#!/usr/bin/env node
'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const html=fs.readFileSync('admin.html','utf8');
const inline=html.match(/<script>\s*([\s\S]*?)<\/script>/);
assert(inline,'Script de administração não encontrado');
new vm.Script(inline[1],{filename:'admin.html'});
assert(html.includes('id="excecoes"'),'Fila de exceções não encontrada');
assert(html.includes('carregarExcecoes();'),'Fila não é carregada');
assert(html.includes("eq('publication_status','published')"),'Auditoria deve ser limitada às questões publicadas');
assert(!/\.update\(/.test(inline[1].slice(inline[1].indexOf('async function carregarExcecoes'),inline[1].indexOf('const MOTIVO'))),'Fila de exceções não deve editar dados');
console.log('OK: painel administrativo da Fase 2 sintaticamente válido e somente leitura.');
