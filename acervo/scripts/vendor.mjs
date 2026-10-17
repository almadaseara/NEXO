// Copia as bibliotecas de node_modules para vendor/, de onde o navegador as carrega,
// e empacota o SDK oficial do Anthropic para o navegador.
import { mkdirSync, copyFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';

const root = fileURLToPath(new URL('..', import.meta.url));
const files = [
  ['pdfjs-dist/build/pdf.min.mjs', 'pdf.min.mjs'],
  ['pdfjs-dist/build/pdf.worker.min.mjs', 'pdf.worker.min.mjs'],
  ['pdf-lib/dist/pdf-lib.esm.min.js', 'pdf-lib.esm.min.js'],
  ['perfect-freehand/dist/esm/index.mjs', 'perfect-freehand.mjs'],
];
mkdirSync(root + 'vendor', { recursive: true });
for (const [from, to] of files) copyFileSync(root + 'node_modules/' + from, root + 'vendor/' + to);
await build({
  entryPoints: [root + 'scripts/anthropic-entry.mjs'],
  bundle: true, format: 'esm', platform: 'browser', minify: true,
  outfile: root + 'vendor/anthropic-sdk.mjs', logLevel: 'warning',
});
// WebLLM: biblioteca + worker (a IA que roda dentro do navegador)
for (const [entry, out] of [['webllm-entry.mjs', 'web-llm.mjs'], ['webllm-worker.mjs', 'web-llm-worker.mjs']]) {
  await build({
    entryPoints: [root + 'scripts/' + entry],
    bundle: true, format: 'esm', platform: 'browser', minify: true,
    outfile: root + 'vendor/' + out, logLevel: 'warning',
  });
}
console.log('Bibliotecas prontas em vendor/');
