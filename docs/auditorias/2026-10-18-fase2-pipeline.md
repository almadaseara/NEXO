# NEXO Revisão — Execução da Fase 2: pipeline de questões

**Referência:** PDF *NEXO Revisão — Auditoria completa*, página 25.  
**Data:** 18/10/2026. **Projeto:** `dkpgsvssyszrwmkutcyt` (NEXO, independente dos demais projetos).

## Diagnóstico real de produção

- `question_bank`: **3.230** registros, **298** validados e publicados, **0** anulados publicados.
- `exam_sources`: **994** fontes, **40** com prova e gabarito associados, **164** adiadas.
- **6** fontes AOCP registradas; **nenhuma** possui no banco um PDF de prova ou gabarito associado.
- `exam_sources.raw_metadata->>'importado'='true'`: **0 importações AOCP assistidas** (0 concluídas, 0 rejeitadas). Não há evidência de um teste AOCP real de ponta a ponta.
- Triagem inicial das 298 publicações: **12** sinalizadas por referência a mídia sem `media_urls`; **19** por possível comando colado; **76** sem `answer_source_type='official'`. **São alertas heurísticos e podem se sobrepor**, não números de erros comprovados nem autorização para excluir questões.
- Exemplo comprovado: PF/2025, Agente, itens 107–110 dependem de tabela contábil; registro do 109 ainda ausente no conjunto antigo. O código Cebraspe foi corrigido e implantado na função `question-collector` versão 26, mas o acervo histórico continua sem saneamento completo.

## Implementações deste ciclo

1. **Importação AOCP — validação pré-gravação:** adicionada em `supabase/functions/aocp-import/index.ts`. Recusa importação com números de questões válidas ausentes em relação ao gabarito, duplicidades, menos de cinco alternativas e indícios textuais de tabelas/figuras cujo contexto não foi preservado. A recusa ocorre **antes** do loop de gravação, guarda motivo em `exam_sources.last_error` e nos metadados da fonte. As anuladas continuam retidas.
2. **Painel administrativo:** `admin.html` exibe fila de exceções **somente leitura**, com origem de prova/gabarito, amostra de enunciado e motivo presumido, sem mudar gabaritos nem publicação.
3. **Verificação reproduzível:** `docs/sql/auditoria-fase2-pipeline.sql` agrega fontes, integridade do acervo, suspeitas, estado de AOCP e fonte PF/2025.
4. **Regressões no CI:** `tools/testar-integridade-aocp.js` e `tools/testar-fila-fase2.js` verificam integridade e ausência de edição pela fila. Os testes são sintéticos de lógica; **não** são equivalentes a um ensaio com PDFs oficiais reais.

## Critérios de aceite (página 25)

| Critério | Situação constatada |
|---|---|
| Fluxo AOCP com caderno e gabarito compatíveis homologado | **Pendente:** zero pares AOCP e zero importações assistidas reais |
| Extrator preservando tabelas, figuras e alternativas | **Parcial:** alternativas em texto; tabelas/figuras ainda não são preservadas, importações suspeitas são retidas |
| Tipo de prova, anuladas, duplicidades e gabarito definitivo | **Parcial:** proteções e conferências documentadas; falta teste abrangente por tipo/cargo |
| Fila de exceções com motivo e tela de conferência | **Parcial:** triagem administrativa implementada; não há recorte visual verificável de cada questão/gabarito |
| Classificação, aprovação e publicação por lote com trilha auditável | **Pendente:** não foi homologado um ciclo completo com publicação após revisão humana |
| Conjunto de provas publicado com conferência humana, taxa de erro e pareamento mensuradas | **Pendente:** não declarar aceite sem execução real |

**Parecer:** progresso de implementação e fortalecimento do pipeline, mas **Fase 2 ainda não está homologada**. Não publicar fontes AOCP sem a entrega de caderno PDF legalmente obtido, gabarito definitivo do mesmo cargo/tipo, contexto integral, classificação revista e aceite humano. Não alterar o banco existente à revelia de `AGENTS.md`.

## Próximos passos necessários para aprovação completa

1. Testar a importação assistida com **um caderno AOCP real**, de cargo/tipo e gabarito definitivo correspondentes (PDFs obtidos licitamente). Medir questões extraídas, rejeitadas, anulações, contexto visual, alinhamento das alternativas e tempo.
2. Implementar armazenamento/visualização de imagens e tabelas por página e por item, com prova/gabarito em recortes verificáveis, incluindo contexto compartilhado.
3. Registrar exceções persistentes com causa, revisor, fonte e resolução e adicionar aprovação/publicação em lotes transacionais com rollback e logs.
4. Revisar as 76 publicações sem proveniência oficial indicada, as 12 sinalizações de mídia e as 19 de comando (amostras podem se sobrepor).
5. Recuperar a questão 109 e o contexto de 107–110 da PF 2025 somente após revisão e mudança dedicada aprovada do banco de questões.

*Este relatório distingue expressamente código integrado, função de produção e requisitos ainda não atendidos. Não certifica validação documental, acesso por perfis nem publicação AOCP.*
