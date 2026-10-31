#!/usr/bin/env node
/* Valida data/vade/*.js: estrutura, ids únicos, artigos em ordem e (opcional) fidelidade ao texto bruto.
   Uso:  node tools/validar-vade.js
         node tools/validar-vade.js l8429 /caminho/texto-bruto.txt   (confere que toda palavra do texto bruto está na lei extraída) */
const fs = require('fs'), path = require('path'), vm = require('vm');
const pasta = path.resolve(__dirname, '..', 'data', 'vade');
const ctx = { window: {} }; ctx.window = ctx; vm.createContext(ctx);
let problemas = 0; const erro = (o, m) => { problemas++; console.log('  ✗ ' + o + ': ' + m); };
const arqs = fs.readdirSync(pasta).filter(f => f.endsWith('.js'));
for (const f of arqs) vm.runInContext(fs.readFileSync(path.join(pasta, f), 'utf8'), ctx, { filename: f });
const html = fs.readFileSync(path.resolve(__dirname, '..', 'ui', 'nexo-vade.js'), 'utf8');
for (const id of Object.keys(ctx.NEXO_VADE || {})) {
  const L = ctx.NEXO_VADE[id];
  if (!html.includes("id:'" + id + "'")) erro(id, 'não está na lista LEIS de ui/nexo-vade.js');
  for (const k of ['nome', 'prefixo', 'titulo', 'fonte', 'itens']) if (!L[k]) erro(id, 'falta ' + k);
  const ids = new Set(); let n = 0;
  for (const a of L.itens) {
    if (a.k !== 'art') { if (!a.t) erro(id, 'título sem texto'); continue; }
    n++;
    if (ids.has(a.id)) erro(id, 'artigo repetido ' + a.n); ids.add(a.id);
    if (!a.p.length || a.p[0].k !== 'cap') erro(id, 'art. ' + a.n + ' sem caput');
    a.p.forEach((p, i) => { if (!p.rev && (!p.t || p.t.replace(/[\s.;,:]/g, '').length < 3)) erro(id, 'art. ' + a.n + ' bloco ' + i + ' vazio ou só pontuação'); if (/\((Redação dada|Incluíd[oa] pela)/i.test(p.t || '')) erro(id, 'art. ' + a.n + ' nota de alteração ficou no texto'); });
  }
  console.log('✓ ' + id.padEnd(10) + n + ' artigos');
}
const [, , lid, bruto] = process.argv;
if (lid && bruto) {
  const L = ctx.NEXO_VADE[lid], norm = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ');
  const lei = norm(L.itens.filter(a => a.k === 'art').map(a => a.p.map(p => p.r + ' ' + p.t).join(' ')).join(' '));
  const set = new Set(lei.split(' '));
  const lixo = /planalto|l8429compilada|presid|casa civil|subchefia|\d+ 14/;
  const faltam = [...new Set(norm(fs.readFileSync(bruto, 'utf8').split(/\n/).filter(l => !lixo.test(norm(l))).join(' ')).split(' '))].filter(w => w && !set.has(w));
  console.log('palavras do texto bruto ausentes na extração (esperadas: preâmbulo, títulos e notas):', faltam.length, faltam.slice(0, 40).join(' '));
}
console.log(problemas ? '\nPROBLEMAS: ' + problemas : '\nOK — nenhum problema.');
process.exit(problemas ? 1 : 0);
