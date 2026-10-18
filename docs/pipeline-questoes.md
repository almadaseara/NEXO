# Pipeline de questões oficiais (v2, 18/10/2026)

Como uma questão de prova oficial chega ao aluno do NEXO, **sem custo de API**. Tudo roda no Supabase do NEXO
(`dkpgsvssyszrwmkutcyt`); o robô de descoberta do GitHub Actions foi removido (achava páginas de site espelho,
LinkedIn e avisos de cookies, nunca um gabarito).

```
API oficial da banca ──► source-resolver ──► exam_sources (prova + gabarito DEFINITIVO, "<BANCA> OFICIAL")
                                                   │
                                                   ▼
  1ª camada (grátis)   question-collector: leitura com posição na página (layout.ts) — colunas, textos-base,
                       tabelas em texto e figuras embutidas recortadas para o bucket nexo-midia
                                                   │  ~94% das questões nos testes; o resto, com o motivo
                                                   ▼  (fórmula, figura vetorial, tabela, não encontrada)
  2ª camada (grátis)   nexo-ai + Gemini, camada gratuita: lê só os números pendentes
                                                   │  o que sobrar → ai_status = needs_claude
                                                   ▼
  3ª camada (assinatura)  rotina diária do Claude Code (Sonnet 5.5): lê os pendentes e deposita em
                       ai_external_extractions; a nexo-ai grava com as mesmas regras
                                                   │
                                                   ▼
        question_bank "banked" + question_contexts + sugestão de módulo (rotina diária, Haiku 5.5)
                                                   │
                                                   ▼
        Administração → Revisar questões (confere, ajusta recortes, escolhe o módulo, publica)
                                                   │
                                                   ▼
                     aluno (só status = validated e publication_status = published)
```

A API paga da Anthropic continua no código (Message Batches, `claude-opus-5-5`), **desligada**: só entra se o
segredo `ANTHROPIC_API_KEY` for cadastrado.

## Fontes

- **Somente oficiais.** Sementes do PCI desligadas; QConcursos fora do resolvedor. `collector_control.allow_mirror`
  (padrão `false`) é a única forma de religar site espelho. Questões antigas de espelho ficam marcadas
  (`gabarito_de_espelho`, `caderno_de_espelho`) para a revisão.
- **Cebraspe:** `source-resolver` `{"mode":"discover_cebraspe"}` (cron semanal) lê `apis.cebraspe.org.br`, filtra
  concursos policiais e pareia *PROVA OBJETIVA* ↔ *GABARITO DEFINITIVO* (`cebraspe.ts`). Preliminar e
  discursiva nunca entram.
- **FGV:** registro em `official_event_registry`. **AOCP:** importação assistida (`aocp-import`).
- Janela de anos: `collector_control.year_min` (2018) e `year_max` (padrão: ano atual + 1).

## 1ª camada — extrator com posição (`supabase/functions/question-collector/layout.ts`)

- Linhas montadas por coluna e em ordem de leitura; cabeçalho e rodapé da página descartados.
- **Cebraspe:** item = número na margem; continuação = recuo de item medido na própria prova; tabela/citação com
  recuo maior na mesma coluna = parte do item; linhas na margem fora de item = texto-base ou comando
  ("Julgue os itens…"), ligados a todos os itens do bloco.
- **Múltipla escolha (FGV, AOCP, FCC, IBFC…):** número sozinho ou "QUESTÃO n", alternativas (A)…(E) ou a)…e) com
  continuação recuada; capa e títulos de matéria descartados; questão só herda o texto-base se for a primeira
  depois dele ou se o citar.
- **Cebraspe múltipla escolha** (gabarito A–E): título "Questão n" e alternativas "A texto" com letra solta; a
  letra A só abre as alternativas quando a linha seguinte confirma (continuação recuada, próxima letra ou questão).
- **Figuras:** imagens embutidas no PDF viram PNG (faixas empilhadas são juntadas) em `nexo-midia/auto/…`;
  imagem pequena com texto por cima (rótulo "Questão n") é descartada; PDF acima de 3 MB é lido sem figuras.
- **Execução:** uma prova por chamada, a próxima encadeada; cron `nexo-question-collector-15m` religa a cadeia.
  Prova que estoura o limite de CPU volta à fila; na 3ª vez vai inteira para a leitura por IA.
- **Vai para a 2ª camada** (`planCollect`): fórmula/símbolo ilegível, figura ou tabela citada e não localizada,
  alternativas incompletas, número não encontrado. O extrator antigo (`pdfjs_regex_v27`) cobre só números que
  a leitura por posição não achou e que não dependem de contexto.
- Registro existente nunca perde publicação, gabarito ou classificação. Ele só ganha texto-base e figuras, e o
  texto com rodapé colado ou símbolos ilegíveis é trocado pela leitura limpa **apenas** quando é a mesma
  questão (mesmo tipo, mesmas alternativas, mesmo início) — marcado `texto_corrigido_extrator`.

## 2ª e 3ª camadas — segunda leitura

- `nexo-ai` `tick` (cron a cada 20 min): grava os resultados depositados pelas rotinas, depois chama o Gemini
  (`GEMINI_API_KEY`, modelo em `GEMINI_MODEL`, padrão `gemini-3.8-flash`) só para os números pendentes. Cota
  gratuita esgotada (429) = a fila espera o dia seguinte. Duas falhas seguidas = vai para a rotina do Claude.
- Rotinas do Claude Code: instruções em `docs/rotinas/segunda-leitura.md` (Sonnet 5.5) e
  `docs/rotinas/classificacao.md` (Haiku 5.5). Elas só **inserem** em `ai_external_extractions`; filas em
  `nexo_rotina_fila_leitura()` e `nexo_rotina_fila_classificacao()`.
- Regras de gravação iguais para todas as leituras (`planIngestion` em `nexo-ai/lib.ts`): gabarito gravado é
  sempre o oficial; divergência, gabarito lido só pela IA ou fora das alternativas ⇒ `pending_validation`;
  toda leitura por IA leva o alerta `lido_por_ia`; nada é publicado.

## Revisão e publicação

- **Administração → Revisar questões** (`ui/nexo-revisar.js`): resumo do pipeline, filtros, texto-base,
  gabarito oficial destacado, alertas, link para a página do PDF, **recorte manual de figura** (para gráficos
  vetoriais), sugestão de módulo, botão "Processar agora".
- Toda gravação passa por `nexo_admin_revisar_questao`: `publicar`, `reter`, `guardar`, `editar` e `validar`
  (conferiu no PDF oficial o gabarito de um item pendente). O gabarito não pode ser alterado por ela.
- O cron que publicava por palavras-chave a cada 15 min foi desligado.
- Aluno: vê texto-base e figuras; questão com figura sem recorte não aparece; a exibição limpa rodapés antigos.

## Operação e custos

- Gratuito: Supabase e GitHub (já usados), Gemini na camada gratuita, rotinas pela assinatura do Claude
  (consomem o limite de uso do plano — teto de 2 provas/30 questões e 200 classificações por dia).
- Segredos nas Edge Functions: `GEMINI_API_KEY` (gratuita, Google AI Studio). Opcional e pago: `ANTHROPIC_API_KEY`.
- Volume: `collector_control.ai_enabled`, `ai_extract_per_tick`, `ai_classify_per_tick`.
- Testes sem rede: `node tools/testar-extrator-cebraspe.js` e `node tools/testar-pipeline.mjs` (Node 24+).

## Medição com provas reais (18/10/2026, 1ª camada)

| Prova | Gabarito | Gravadas direto | Banco antes | 2ª leitura |
|---|---:|---:|---:|---:|
| PC/SE 2021 Agente (Cebraspe) | 70 | 62 | 44 | 8 |
| PF 2025 Bloco II (Cebraspe) | 36 | 35 | 36 | 1 |
| PF 2025 Bloco I (Cebraspe) | 60 | 51 | 59* | 9 |
| PF 2018 Perito (Cebraspe) | 70 | 68 | 68 | 2 |
| PC/MG 2025 Investigador (FGV) | 70 | 68 | 62 | 2 |

\* o banco antigo tinha itens de estatística gravados com símbolos ilegíveis; o extrator novo os manda para a
segunda leitura em vez de gravá-los.

## Limites conhecidos

- Gráficos e tabelas **desenhados em vetor** não são imagens: o Gemini/Claude descrevem e dão a posição; o
  recorte é feito na tela de revisão. Provas escaneadas (página inteira como imagem) vão inteiras para a 2ª camada.
- Caderno *matriz* com vários gabaritos separados é pareado com o gabarito do próprio arquivo; os números
  cobertos por outros gabaritos seguem para a segunda leitura e conferência.
- Os limites da camada gratuita do Gemini são definidos pelo Google por projeto e podem mudar.

## Publicação automática

A cada execução da `nexo-ai` (cron de 20 min), depois da leitura: o Gemini sugere o módulo de até 120 questões
(3 lotes de 40) e `nexo_auto_publicar()` publica as que passam em todas as travas:

- gabarito oficial conferido pelo sistema (`status = validated`, `validation_source_type = official`);
- nenhum alerta grave (`gabarito_de_espelho`, `caderno_de_espelho`, `gabarito_lido_pela_ia`, `alerta_ia`, `tem_figura`, `rodape_colado`);
- resposta compatível com as alternativas e enunciado não vazio;
- módulo do catálogo com confiança alta ou média (`auto_publish_min_confidence`, padrão 0,7);
- nunca revista pelo administrador (o que ele guardou ou reteve fica como está).

Cada questão publicada assim leva o alerta `publicado_automaticamente`. Para desfazer uma, use "Reter" na revisão.
Para desligar tudo: `update collector_control set auto_publish = false where id = 1;`.
