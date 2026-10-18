#!/usr/bin/env node
/**
 * Auditoria de integridade do acervo NEXO (sem conexão com Supabase).
 * Verifica referências de imagens e classificação manual de questões,
 * sem alterar gabaritos, robô, questões ou conteúdo.
 */
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const read = rel => fs.readFileSync(path.join(root, rel), 'utf8');
const html = read('index.html');
const ids = new Set([...html.matchAll(/["']?id["']?\s*:\s*["']([a-z0-9_]+)["']/g)].map(m => m[1]));
const mapas = JSON.parse(read('data/mapas-ilustrados.json')).mapas;
const classificacoes = JSON.parse(read('data/banco-classificacao.json')).questoes;
const problemas = [];
const alerta = msg => { problemas.push(msg); console.error('ERRO: ' + msg); };
let imagens = 0;
const referidas = new Set();
for (const [modulo, lista] of Object.entries(mapas)) {
  if (!ids.has(modulo)) alerta('Mapa associado a módulo inexistente: ' + modulo);
  if (!Array.isArray(lista)) { alerta('Lista de mapas inválida: ' + modulo); continue; }
  for (const [indice, item] of lista.entries()) {
    imagens++;
    if (!item || typeof item.arquivo !== 'string' || typeof item.titulo !== 'string' || !item.titulo.trim()) {
      alerta('Imagem sem arquivo/título: ' + modulo + '[' + indice + ']'); continue;
    }
    const rel = item.arquivo.split('?')[0];
    if (!/^assets\/mapas\/[a-z0-9_-]+\.webp$/.test(rel)) {
      alerta('Caminho de mapa inválido: ' + rel); continue;
    }
    if (!fs.existsSync(path.join(root, rel))) alerta('Arquivo inexistente: ' + rel);
    if (referidas.has(rel)) alerta('Imagem repetida no catálogo: ' + rel);
    referidas.add(rel);
  }
}
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
for (const [id, modulo] of Object.entries(classificacoes)) {
  if (!uuid.test(id)) alerta('Identificador de questão inválido: ' + id);
  if (typeof modulo !== 'string' || !ids.has(modulo)) alerta('Classificação aponta para módulo inexistente: ' + id + ' → ' + modulo);
}
console.log('NEXO — auditoria de acervo');
console.log('Módulos com mapas: ' + Object.keys(mapas).length);
console.log('Imagens catalogadas: ' + imagens);
console.log('Questões classificadas manualmente: ' + Object.keys(classificacoes).length);
console.log('Módulos conhecidos: ' + ids.size);
if (problemas.length) { console.error('FALHA: ' + problemas.length + ' inconsistência(s).'); process.exitCode = 1; }
else console.log('OK: mapas e classificação íntegros.');
