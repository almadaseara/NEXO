# Vade Mecum do NEXO

Seção separada no menu lateral ("Vade Mecum"). Código em `ui/nexo-vade.js` e `ui/nexo-vade.css`; leis em `data/vade/<id>.js`.

## O que o aluno vê
- Lista de leis → lei em texto compilado (caput, parágrafos, incisos, alíneas), com busca por artigo (`17-B`, `art 12`) ou palavra, índice por capítulo/seção e tamanho de letra.
- **Modo leitura**: só o texto da lei (esconde botões, notas de alteração "Redação dada…/Vide ADI" e dispositivos revogados).
- **Ocultar revogados**: botão que esconde dispositivos, artigos inteiros e títulos de seção revogados (o modo leitura também os esconde). Preferência salva no aparelho.
- **Julgados, Cards e Questões**: ficam fechados. Cada artigo tem botões com contagem; só abrem ao clicar (e cada julgado/card abre de novo ao clicar).
- **Grifos e notas**: só aparecem (e só podem ser criados) com o botão "Grifos e notas" ligado. Selecionar um trecho abre cores + anotação; há também nota por artigo. Ficam no aparelho (`localStorage`: `nexo_vade_marcas_v1`, `nexo_vade_notas_v1`).

## Como acrescentar uma lei
1. No Planalto, abra a versão **compilada** da lei e salve como PDF (o servidor do Claude não acessa o Planalto).
2. `python3 tools/vade-extrair.py lei.pdf l8112 "Lei 8.112/1990 — Servidores públicos federais" "Lei 8.112/1990" https://www.planalto.gov.br/ccivil_03/leis/l8112cons.htm`
3. Inclua `{ id:'l8112', nome:'…', sub:'…', v:'AAAAMMDD' }` na lista `LEIS` de `ui/nexo-vade.js`.
4. `node tools/validar-vade.js l8112 texto-bruto.txt` (confere estrutura e fidelidade) e `python3 tools/testar-vade.py`.

O `prefixo` (ex.: `Lei 8.429/1992`) liga os temas ao vade mecum: itens de `lei` cujo grupo começa com o prefixo e cujo `rot` começa com `Art. N` levam seus cards (`c`), julgados (`j`) e questões (`lei`) para o artigo N. Nada de conteúdo novo precisa ser escrito para a ligação.

## Regras
- O texto da lei não é reescrito: só separado em partes. Notas de alteração ficam à parte (`n`) e aparecem em cinza.
- Revise o resultado do extrator (ementa, títulos de capítulo, artigos com letra como `17-B`).
