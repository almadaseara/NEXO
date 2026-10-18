# Pipeline de questões oficiais (v2, 18/10/2026)

Como uma questão de prova oficial chega ao aluno do NEXO. Tudo roda no Supabase do NEXO (`dkpgsvssyszrwmkutcyt`);
o robô de descoberta que rodava no GitHub Actions foi removido (achava páginas de site espelho, LinkedIn e
avisos de cookies, nunca um gabarito).

```
API oficial da banca ──► source-resolver ──► exam_sources (prova + gabarito definitivo, "<BANCA> OFICIAL")
                                                   │
                                                   ▼
                                     question-collector (texto do PDF + regras por banca)
                                                   │  itens com tabela/figura/texto-base, tipos de caderno
                                                   │  e questões faltantes vão para a fila da IA
                                                   ▼
                                     nexo-ai (Claude lê o caderno e o gabarito em PDF; segunda leitura independente)
                                                   │
                                                   ▼
                          question_bank "banked"  +  question_contexts (texto-base)  +  sugestão de módulo
                                                   │
                                                   ▼
                       Administração → Revisar questões (confere, recorta figuras, escolhe módulo, publica)
                                                   │
                                                   ▼
                                     aluno (só status=validated e publication_status=published)
```

## Fontes

- **Somente oficiais.** As sementes do PCI Concursos foram desligadas e o QConcursos saiu do resolvedor.
  `collector_control.allow_mirror` (padrão `false`) é a única forma de religar site espelho.
- **Cebraspe:** `source-resolver` com `{"mode":"discover_cebraspe"}` (cron semanal `nexo-cebraspe-descoberta-semanal`)
  lê `apis.cebraspe.org.br`, filtra concursos policiais (`isPoliceEvent`) e pareia cada *PROVA OBJETIVA* com o
  *GABARITO DEFINITIVO* correspondente (`pairCebraspeFiles`, em `supabase/functions/source-resolver/cebraspe.ts`).
  Gabarito preliminar e prova discursiva nunca são usados.
- **FGV:** registro manual em `official_event_registry` (página oficial do concurso).
- **AOCP:** importação assistida pela tela Administração → Importar prova AOCP (`aocp-import`).
- Janela de anos: `collector_control.year_min` (padrão 2018) e `year_max` (padrão: ano atual + 1), via `nexo_year_window()`.

## Extração

1. `question-collector` (pdf.js + regras): rápido e determinístico. Nunca sobrescreve um registro existente;
   questão repetida em outra prova vira `question_occurrences`. Múltipla escolha aceita 4 ou 5 alternativas.
2. `nexo-ai` (cron `nexo-ai-20m`, Message Batches da Anthropic, modelo `claude-opus-5-5`): envia o caderno e o
   gabarito definitivo em PDF e recebe JSON estruturado (`EXTRACTION_SCHEMA` em `supabase/functions/nexo-ai/lib.ts`),
   com textos-base, tabelas transcritas e a posição das figuras. Regras de gravação (`planIngestion`):
   - o gabarito gravado é sempre o **oficial** lido de forma determinística; a leitura da IA só confere;
   - divergência entre IA e gabarito oficial, gabarito lido só pela IA ou gabarito fora das alternativas
     ⇒ `pending_validation` com `review_flags`;
   - registro já existente só recebe complementos (`review_flags`, `figure_refs`, `context_id`), nunca texto ou gabarito;
   - nada é publicado: tudo entra como `banked` (anuladas como `withheld`).
   Caderno grande que estoura o limite de resposta é refeito em duas partes (`splitRange`).
3. `nexo-ai` também sugere o módulo do NEXO (`ai_module_id`, `ai_module_confidence`, `ai_module_reason`)
   contra `subject_catalog`, que espelha a árvore `ARVORE` de `ui/nexo-ui.js`.

## Revisão e publicação

- Tela **Administração → Revisar questões** (`ui/nexo-revisar.js`): filtros *Prontas para publicar*,
  *Precisam de conferência*, *Retidas* e *Publicadas*; mostra texto-base, alternativas com o gabarito oficial,
  alertas da IA e links para a página certa do PDF oficial.
- **Recortar figura**: abre a página do caderno (via `nexo-ai` `{"action":"pdf"}`, só administrador), o
  administrador marca a área e a imagem vai para o bucket público `nexo-midia`. O aluno não vê questão que
  depende de figura ainda sem recorte.
- Toda gravação passa por `nexo_admin_revisar_questao(p_id, p_acao, ...)`: `publicar`, `reter`, `guardar`,
  `editar` (enunciado, alternativas com a mesma quantidade, imagens) e `validar` (administrador conferiu no PDF
  oficial o gabarito de um item em `pending_validation`). O gabarito não pode ser alterado por ela.
- A publicação automática por palavras-chave (cron `nexo-question-classifier-15m`, que despublicava e
  republicava a cada 15 minutos) foi desligada.

## Operação

- Segredo obrigatório nas Edge Functions: `ANTHROPIC_API_KEY`. Sem ele, `nexo-ai` responde `missing_api_key`
  e nada é enviado.
- Liga/desliga e volume: `collector_control.ai_enabled`, `ai_extract_per_tick` (provas por rodada, padrão 4) e
  `ai_classify_per_tick` (questões por rodada, padrão 300).
- Botão **Processar agora** na tela de revisão = `nexo-ai` `{"action":"tick"}` com o JWT do administrador.
- Histórico dos lotes: tabela `ai_jobs` (uso de tokens em `usage`, resultado por item em `summary`).
- Testes sem rede: `node tools/testar-extrator-cebraspe.js` e `node tools/testar-pipeline.mjs` (Node 24+).

## Limites conhecidos

- Caderno *matriz* com vários gabaritos (básicos, específicos e complementares em PDFs separados) é pareado
  só com o gabarito do próprio arquivo; os números cobertos pelos outros gabaritos ficam para a IA marcar como
  `gabarito_lido_pela_ia` e para conferência humana.
- O gabarito determinístico fora do Cebraspe vem do `question-collector`; para provas de outras bancas que ele
  não conseguiu ler, a resposta da IA sempre vai para conferência.
