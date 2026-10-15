# Guia dos temas aprofundados do NEXO Revisão

Este guia explica como criar, revisar e publicar os temas aprofundados do NEXO, para qualquer pessoa ou assistente de IA (Claude, ChatGPT, Codex) que continue o projeto. Leia inteiro antes de mexer.

Situação em 14/10/2026: **68 módulos completos** — Direito Penal (28), Medicina Legal (10), Direito Constitucional (18) e Direito Administrativo (12).

---

## 1. Como o site funciona

- O site é estático (GitHub Pages): `https://almadaseara.github.io/NEXO/`.
- `index.html` define a lista `modules` (cada módulo tem `id`, `title`, `discipline`, `summary`, `law_items`, `juris`, `questions`, `official_questions`…). Essa versão "simples" continua existindo como reserva.
- Os temas aprofundados ficam em **`data/temas/*.js`**. Cada arquivo registra um ou mais módulos em `window.NEXO_TEMAS[idDoModulo]`.
- **`temas/temas-ricos.js`** lê `NEXO_TEMAS` e substitui as abas **Resumo, Lei seca, Jurisprudência, Flashcards e Questões do caderno** dos módulos que têm tema aprofundado. As abas de questões oficiais e o resto do site não mudam.
- Se `questoes` do tema estiver vazio e o módulo tiver questões próprias em `index.html`, a aba Questões mostra as questões antigas (nada se perde).
- Supabase (`dkpgsvssyszrwmkutcyt`) guarda o banco de questões (`question_bank`) e os usuários. **Os temas não dependem do Supabase.**
- `robot/` e `data/robot-*.json` são do robô de questões, que faz commits automáticos ("robot: update question discovery state"). **Não mexa nesses arquivos.**

### Arquivos de tema por disciplina

| Disciplina | Arquivos |
|---|---|
| Penal | `crimes-contra-o-patrimonio.js`, `penal-geral.js`, `penal-pessoa-a.js` a `-d.js`, `penal-sexual.js`, `penal-fe-publica.js`, `penal-adm-func.js`, `penal-adm-particular.js`, `penal-adm-justica.js`, `penal-incolumidade.js`, `penal-punibilidade.js` |
| Medicina Legal | `ml-a.js` (introdução, perícias, documentos, identificação), `ml-b.js` (traumatologia, tanatologia, lesões), `ml-c.js` (sexologia, asfixiologia, psicopatologia) |
| Constitucional | `const-a.js` a `const-e.js` |
| Administrativo | `adm-a.js` a `adm-c.js` |

### Interface (ui/)

- `ui/nexo-ui.js` cuida da barra lateral em árvore, da barra retrátil, do tema escuro, do cronômetro, do **Fichário** (flashcards com caixas de revisão) e da página **Desempenho**. Os dados de estudo ficam no navegador (`localStorage`: `nexo_eventos`, `nexo_fichario`, `nexo_cronometro`).
- **Ao criar um módulo novo, inclua o `id` dele na constante `ARVORE` de `ui/nexo-ui.js`**, no grupo certo (disciplina > parte > grupo). Se não incluir, ele aparece no fim da disciplina (ou no grupo de `parent_subject`, se houver). Rótulos curtos ficam em `ROTULOS`.
- `ui/nexo-questoes.js` liga as questões do banco aos módulos, refaz a página **Praticar questões** (filtros por disciplina, assunto, banca, ano, cargo, modalidade e origem), põe a **tesoura** (eliminar alternativa) em todas as questões e mostra a faixa "Suas disciplinas" no painel.
- **Questões do banco nos temas:** o `module_id` gravado pelo robô tem muitos erros, então o site usa `data/banco-classificacao.json` (id da questão → id do módulo), revisado à mão. Só as questões listadas ali, publicadas e validadas, aparecem na aba "Questões oficiais", e só para quem entrou na conta (regra de acesso do Supabase). O site **só lê** o banco: não grava nada nem muda gabarito. Para incluir mais questões, confira o enunciado e acrescente o id no arquivo.
- **Cronograma e trilha** (`ui/nexo-trilha.js`, programa em `data/trilha/pcba.js`): o aluno escolhe cargo (Investigador ou Escrivão da PC-BA), dias, tempo e disciplinas; a trilha da semana segue a ordem de aprendizagem de cada disciplina, divide o tempo 40/60 (gerais/específicos, como na prova), põe revisões espaçadas (7, 15 e 30 dias) e leva ao módulo certo. **Ao criar um módulo que cobre um tópico do edital, inclua o `id` dele na lista de módulos do tópico em `data/trilha/pcba.js`.** A prioridade dos tópicos sem módulo é estimativa da NEXO e a interface avisa isso.
- **Marca-texto** (`ui/nexo-marcador.js`): marcar em 5 cores, sublinhar, tachar, anotar, desfazer, "Marcar pontos importantes" (usa os destaques do próprio material) e a página "Meus grifos". Cada marcação é guardada pelo trecho de texto, então não quebra se o conteúdo for filtrado.
- **Dados do aluno** (`ui/nexo-estudo.js`): ficam no navegador e, com a conta conectada, nas tabelas `study_plans` e `study_highlights` do Supabase (cada aluno só acessa as próprias linhas; SQL em `docs/sql/`).
- `ui/nexo-ui.css` tem os estilos dessas partes. `ui/nexo-escuro.css` é **gerado**: depois de mudar cores no `index.html` ou em `temas/temas-ricos.js`, rode `python3 tools/gerar-tema-escuro.py`.

---

## 2. Regras de conteúdo (obrigatórias)

1. **Nada inventado.** Nenhuma lei, súmula, tese, número de processo, data ou questão de prova pode ser criada de memória e apresentada como real.
2. **Conferir na fonte oficial** antes de escrever: Planalto (leis, CF, emendas), portal do STF (súmulas, repercussão geral), STJ (súmulas, informativos). Toda jurisprudência precisa de `fonte` (link).
3. **Incerteza vira "atenção".** Se só achou em material de estudo, notícia ou blog, ou se o julgamento não terminou (acórdão não publicado), use `status:"atencao"` (ou `"pendente"`) e escreva "conforme o material de estudo / confira" no campo `explica`.
4. **Lei seca pode ser citada literalmente**; o resto do texto deve ser escrito com palavras próprias. **Não copiar prosa dos PDFs** de cursos.
5. Quando o PDF do curso contradiz a lei, **vale a lei** — e vale registrar a correção (ex.: datas históricas trocadas, rol incompleto do art. 149 do CPP).
6. **Não alterar gabaritos** nem o status de publicação das questões do banco. `questoes:[]` fica vazio, a menos que se liguem questões reais já existentes no banco (com banca, ano, cargo e gabarito oficial).
7. Público-alvo: **PC-BA (AOCP, prova 06/12/2026, edital de 29/07/2026)** e **PC-PE (Cebraspe, prova 07/03/2027)**. Leis posteriores ao edital da PC-BA devem ser sinalizadas como tal.
8. Datas: o campo `atualizado` registra quando o conteúdo foi conferido (formato `DD/MM/AAAA`).

---

## 3. Formato de um tema

Cada arquivo é uma função que se executa sozinha:

```js
/* Disciplina (parte): assuntos. Conferido em DD/MM/AAAA. Fontes: ... */
(function(){
var T = window.NEXO_TEMAS = window.NEXO_TEMAS || {};
var AT = "14/10/2026";
var STFJ = "https://jurisprudencia.stf.jus.br/pages/search";

T.id_do_modulo = {            // o id precisa existir em index.html
  meta:{ tema:"Título", atualizado:AT, foco:"Uma frase com o que o tema cobre.",
         aviso:"(opcional) alerta exibido no topo" },
  secoes:[ /* ... */ ],
  lei:[ /* ... */ ],
  juris:[ /* ... */ ],
  cards:[ /* ... */ ],
  questoes:[]
};
})();
```

### `secoes` (aba Resumo, em camadas)

```js
{ id:"custodia", titulo:"Cadeia de custódia (arts. 158-A a 158-F)", curto:"Custódia",
  rapido:["3 a 5 frases de revisão rápida, com <b>negrito</b> no essencial."],
  teoria:[ { h:"Subtítulo", p:["Parágrafo 1.", "Parágrafo 2."] } ],
  quadro:{ titulo:"Tabela comparativa", head:["Col 1","Col 2"], rows:[["a","b"]] },   // opcional
  pegadinhas:["Armadilhas típicas de prova."] }                                        // opcional
```

### `lei` (aba Lei seca, com grifos)

```js
{ art:"CPP, arts. 158 e 167", nome:"Nome do grupo", sec:"corpo", itens:[
  { id:"cpp158", rot:"Art. 158",
    t:"Texto literal com <b class='g1'>núcleo</b>, <b class='g2'>penas e números</b> e <b class='g3'>exceções e condições</b>.",
    nota:"(opcional) origem da redação, observações", novo:true /* opcional: alteração recente */,
    c:["pe1"], j:["stj-hc653515"], q:[] } ] }
```

Cores dos grifos: **g1** = núcleo do dispositivo; **g2** = penas, prazos, quóruns e números; **g3** = exceções, ressalvas e condições.

### `juris` (aba Jurisprudência)

```js
{ id:"stf-t280", trib:"STF", tipo:"Repercussão geral", num:"RE 603.616 (Tema 280)", sec:"privacidade",
  status:"vigente",            // vigente | atencao | divergencia | pendente
  data:"05/11/2015",
  titulo:"Frase curta",
  texto:"Tese ou enunciado literal.",
  explica:"Como cai em prova; ressalvas.", lei:["cf5xi"], fonte:"https://..." }
```

### `cards` (flashcards)

```js
{ id:"pe1", tipo:"caso", sec:"corpo", f:"Frente (pergunta/situação).", v:"Verso (resposta com <b>destaque</b>).", lei:["cpp158"], j:["stj-..."] }
```

Tipos: `caso` (situação concreta), `numero` (prazos, penas, quóruns), `distincao` (A × B), `lacuna` (completar o dispositivo), `ce` (certo ou errado, estilo Cebraspe), `juris`. **Evite cards genéricos** ("o que é X?"): prefira caso concreto e distinção.

### `questoes` (opcional — só questões reais do banco)

```js
{ id:"q-ef07", banca:"FGV", ano:2025, cargo:"...", sec:"roubo", gab:"E", fonteGab:"oficial",
  enun:"...", ops:["Certo","Errado"], com:"Comentário.", lei:[], j:[] }
```

### Regras de ligação (o validador confere)

- Todo `sec` aponta para um `id` existente em `secoes`.
- Todo id em `c`, `j`, `q`, `lei` aponta para um item que existe **no mesmo módulo**.
- Ids são únicos dentro do módulo (pode repetir entre módulos diferentes).

---

## 4. Passo a passo para criar ou atualizar um tema

1. `git pull --rebase origin main` (o robô faz commits frequentes).
2. Conferir o `id` do módulo em `index.html` e ler o tema existente, se houver.
3. Pesquisar as fontes oficiais (Planalto/STF/STJ) e, se houver, o PDF do curso enviado pela usuária.
4. Escrever o arquivo em `data/temas/` seguindo o formato acima.
5. Se for arquivo novo, incluir a tag **antes** de `temas/temas-ricos.js` no `index.html`:
   `<script src="data/temas/NOVO.js"></script>`
6. Validar: `node tools/validar-temas.js` → precisa terminar com **OK**.
7. Testar no navegador simulado: `python3 tools/testar-site.py id1,id2` (requer `pip install playwright` e `python3 -m playwright install chromium`) → precisa terminar com **OK**.
8. Commit com mensagem descritiva e `git push origin HEAD:main` (ou abrir pull request para revisão).

---

## 5. Pontos marcados como "atenção" para reconferir

- PEC 18/2025 (Segurança Pública): aprovada na Câmara em 04/03/2026, pendente no Senado — não é texto vigente.
- LC 219/2025 (Ficha Limpa): vetos e ações no STF.
- Foro por prerrogativa após saída do cargo (STF, 2025): conferir redação final da tese.
- Marco temporal indígena (Lei 14.701/2023 × Tema 1.031).
- ADIs 7.156 e 7.236 (reforma da improbidade), julgamento concluído em 01/07/2026 — acórdão pendente.
- Resolução CNJ 487/2023 (política antimanicomial) — ações no STF.
- STF Tema 905 (coleta de DNA de condenados) — pendente; Lei 15.295/2025 mudou a LEP.
- Valores da Lei 14.133 mudam todo ano por decreto (2026: Decreto 12.807/2025).

## 6. Próximos passos sugeridos

- Direito Penal — faltam, pelo edital SAEB 02/2026 (Investigador PC-BA): concurso de crimes (arts. 69 a 71); penas (espécies, regimes, restritivas de direitos, sursis, livramento condicional); crimes contra a paz pública (arts. 286 a 288-A); crimes contra o Estado Democrático de Direito (arts. 359-I a 359-T). Para Delegado, também: propriedade imaterial, organização do trabalho, sentimento religioso e respeito aos mortos, família, multa, medidas de segurança, efeitos da condenação.
- Processo Penal e Legislação Penal Extravagante (prioridade 1 para Investigador PC-BA e Delegado PCPE).
- Legislação Geral da Bahia (Lei 6.677/94, Lei 14.634/23, Lei 12.209/11, Lei 11.370/09) e Igualdade Racial e de Gênero (todos os cargos da PC-BA).
- Classificar mais questões do banco em `data/banco-classificacao.json` (hoje 145 das 298 publicadas; as demais são de outras matérias, repetidas ou com texto colado de várias provas).
- Revisar cada tema quando sair lei nova ou tese nova relevante.
