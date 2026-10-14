#!/usr/bin/env node
/* Valida os temas aprofundados de data/temas/*.js.
   Uso:  node tools/validar-temas.js            (todos os arquivos)
         node tools/validar-temas.js data/temas/ml-a.js data/temas/ml-b.js
   Sai com código 1 se encontrar qualquer problema. Não precisa instalar nada além do Node. */
const fs = require('fs'), path = require('path'), vm = require('vm');

const raiz = path.resolve(__dirname, '..');
const pasta = path.join(raiz, 'data', 'temas');
let arquivos = process.argv.slice(2);
if (!arquivos.length) arquivos = fs.readdirSync(pasta).filter(f => f.endsWith('.js')).map(f => path.join('data', 'temas', f));

const STATUS = ['vigente', 'atencao', 'divergencia', 'pendente'];
const TIPOS = ['caso', 'numero', 'distincao', 'lacuna', 'ce', 'juris'];
let problemas = 0;
const erro = (onde, msg) => { problemas++; console.log('  ✗ ' + onde + ': ' + msg); };

/* 1. Cada arquivo precisa estar no index.html, antes de temas/temas-ricos.js */
const html = fs.readFileSync(path.join(raiz, 'index.html'), 'utf8');
const posRicos = html.indexOf('<script src="temas/temas-ricos.js"></script>');
for (const a of arquivos) {
  const rel = a.replace(/\\/g, '/').replace(/^\.\//, '');
  const pos = html.indexOf('<script src="' + rel + '"></script>');
  if (pos < 0) erro(rel, 'falta a tag <script> no index.html');
  else if (posRicos >= 0 && pos > posRicos) erro(rel, 'a tag <script> precisa vir ANTES de temas/temas-ricos.js');
}

/* 2. Carrega os arquivos e confere o esquema */
const ctx = { window: {} }; ctx.window = ctx; vm.createContext(ctx);
const origem = {};
for (const a of arquivos) {
  const antes = new Set(Object.keys(ctx.NEXO_TEMAS || {}));
  try { vm.runInContext(fs.readFileSync(path.join(raiz, a), 'utf8'), ctx, { filename: a }); }
  catch (e) { erro(a, 'erro de sintaxe/execução: ' + e.message); continue; }
  for (const id of Object.keys(ctx.NEXO_TEMAS || {})) if (!antes.has(id)) {
    if (origem[id]) erro(id, 'módulo registrado em dois arquivos (' + origem[id] + ' e ' + a + ')');
    origem[id] = a;
  }
}

/* ids de módulos existentes no index.html */
const idsIndex = new Set([...html.matchAll(/["']?id["']?\s*:\s*["']([a-z0-9_]+)["']/g)].map(m => m[1]));

for (const [id, T] of Object.entries(ctx.NEXO_TEMAS || {})) {
  if (!origem[id]) continue;
  const antes = problemas;
  if (!idsIndex.has(id)) erro(id, 'não existe módulo com esse id em index.html');
  if (!T.meta || !T.meta.tema || !T.meta.atualizado) erro(id, 'meta.tema e meta.atualizado são obrigatórios');
  const S = new Set((T.secoes || []).map(s => s.id));
  if (!S.size) erro(id, 'nenhuma seção');
  (T.secoes || []).forEach(s => {
    if (!s.titulo || !s.curto) erro(id + '/' + s.id, 'seção sem titulo ou curto');
    if (!Array.isArray(s.rapido) || !s.rapido.length) erro(id + '/' + s.id, 'seção sem "rapido"');
  });
  const L = new Set(), J = new Set(), C = new Set(), Q = new Set();
  const dup = (set, x, onde) => { if (set.has(x)) erro(id, 'id repetido em ' + onde + ': ' + x); set.add(x); };
  (T.lei || []).forEach(a => { if (!S.has(a.sec)) erro(id, 'grupo de lei "' + a.art + '" aponta para seção inexistente: ' + a.sec);
    (a.itens || []).forEach(i => { dup(L, i.id, 'lei'); if (!i.t) erro(id + '/' + i.id, 'item de lei sem texto (t)'); }); });
  (T.juris || []).forEach(j => { dup(J, j.id, 'juris');
    if (!STATUS.includes(j.status)) erro(id + '/' + j.id, 'status inválido: ' + j.status + ' (use ' + STATUS.join(', ') + ')');
    if (!j.fonte) erro(id + '/' + j.id, 'julgado sem fonte (link)'); });
  (T.cards || []).forEach(c => { dup(C, c.id, 'cards'); if (!TIPOS.includes(c.tipo)) erro(id + '/' + c.id, 'tipo de card inválido: ' + c.tipo); });
  (T.questoes || []).forEach(q => dup(Q, q.id, 'questoes'));
  /* ligações */
  (T.lei || []).forEach(a => (a.itens || []).forEach(i => {
    (i.c || []).forEach(x => C.has(x) || erro(id + '/' + i.id, 'card inexistente: ' + x));
    (i.j || []).forEach(x => J.has(x) || erro(id + '/' + i.id, 'julgado inexistente: ' + x));
    (i.q || []).forEach(x => Q.has(x) || erro(id + '/' + i.id, 'questão inexistente: ' + x));
  }));
  for (const [nome, arr] of [['juris', T.juris || []], ['cards', T.cards || []], ['questoes', T.questoes || []]])
    arr.forEach(o => { if (!S.has(o.sec)) erro(id + '/' + o.id, nome + ' aponta para seção inexistente: ' + o.sec);
      (o.lei || []).forEach(x => L.has(x) || erro(id + '/' + o.id, 'item de lei inexistente: ' + x));
      (o.j || []).forEach(x => J.has(x) || erro(id + '/' + o.id, 'julgado inexistente: ' + x)); });
  console.log((problemas === antes ? '✓ ' : '  ') + id.padEnd(30) + ' seções ' + S.size + ' · lei ' + L.size + ' · juris ' + J.size + ' · cards ' + C.size + ' · questões ' + Q.size);
}
console.log(problemas ? '\nPROBLEMAS: ' + problemas : '\nOK — nenhum problema.');
process.exit(problemas ? 1 : 0);
