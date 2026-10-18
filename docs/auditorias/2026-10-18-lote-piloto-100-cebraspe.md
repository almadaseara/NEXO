# NEXO Revisão — Lote-piloto de 100 questões Cebraspe

**Data da verificação:** 18/10/2026  
**Natureza:** auditoria documental automatizada em dados já extraídos no Supabase.  
**Produção:** nenhuma questão, gabarito ou estado de publicação foi alterado.

## Resultado do lote

- **100 questões examinadas:** 25 do bloco básico I da Polícia Federal/2025; 19 do bloco específico de Agente PF/2025; 6 do bloco básico II PF/2025; 25 de Agente PC/SE/2021; e 25 de Escrivão PC/SE/2021.
- **100/100** respostas armazenadas coincidiram com o respectivo número da tabela de gabarito definitivo **extraída e armazenada no Supabase** (C/E/X, com X interpretado como anulada).
- **100/100** textos completos de enunciado, após normalização de espaços, acentos e pontuação, foram encontrados dentro do texto da prova **extraído e armazenado no Supabase**.
- **93** registros classificados como `validated`; **7** como `annulled`.
- **0** divergências de resposta e **0** enunciados sem correspondência na amostra.

| Concurso / caderno | ID da fonte | Questões auditadas | Conferência de resposta | Texto completo localizado |
| --- | --- | ---: | ---: | ---: |
| PF 2025 — básico I | `9eeabbf5-1ca4-4053-a128-a76b463db5f6` | 25 | 25/25 | 25/25 |
| PF 2025 — Agente, específico 16 | `446556cb-28b5-4891-a2f5-d2fee9553e91` | 19 | 19/19 | 19/19 |
| PF 2025 — básico II | `0bd1cf45-d829-4cd6-8034-19d59421ed6e` | 6 | 6/6 | 6/6 |
| PC/SE 2021 — Agente, específico 1 | `3bfb907b-8506-4f41-9c1a-1a688292f18a` | 25 | 25/25 | 25/25 |
| PC/SE 2021 — Escrivão, específico 2 | `8af6400d-28c3-464b-81ba-7b272c90ada5` | 25 | 25/25 | 25/25 |

## Procedimento

1. Seleção de questões ordenadas por número, por `source_id`, com estados `validated` ou `annulled`.
2. Leitura de `exam_documents.extracted_text` para prova e gabarito de cada fonte.
3. Extração da tabela numérica do gabarito Cebraspe (colunas consecutivas com C, E ou X) e comparação com `question_bank.answer` pelo `question_number`.
4. Comparação de `question_bank.statement` integral contra o texto extraído da prova após normalização não semântica (espaços, acentos e pontuação).
5. Contagem de estados de validação e anulação. Todas as consultas foram somente leitura.

## Limitações e próximo aceite obrigatório

- Os dois lados da conferência vieram da **mesma base de documentos extraídos**; este procedimento não atesta que o PDF original foi capturado sem erros, nem que a extração não omitiu figuras ou tabelas.
- A tentativa de abrir diretamente os PDFs oficiais pelo acesso web desta execução falhou. **Não houve conferência visual independente** dos PDFs.
- Não foi conferida a integridade das figuras, tabelas, comandos compartilhados de questão ou a pertinência de assunto/módulo de cada item.
- A verificação identifica consistência interna, **não autoriza publicação** de registros com `publication_status='banked'`.
- Antes de publicar: abrir uma amostra visual de caderno e gabarito oficiais, conferir comando e contexto do item, anulações e classificação do tema, depois testar a interface do aluno.
- Preservar integralmente registros `annulled`; não publicá-los.

**Resultado:** aprovado no controle automatizado de consistência textual e gabarito **armazenado**; pendente da validação visual independente e editorial. 

**Relacionado:** issue #5 e PR #10.
