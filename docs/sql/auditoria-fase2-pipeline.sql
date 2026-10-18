-- FASE 2 — auditoria de qualidade e fila de exceções (somente SELECT).
-- Leia: docs/auditorias/2026-10-18-fase2-pipeline.md
-- Não altera gabaritos, status, classificação, publicação ou fontes.

-- Painel geral por banca: prova/gabarito, estados e volume.
SELECT s.board, count(*) AS fontes,
 count(*) FILTER(WHERE s.exam_pdf_url IS NOT NULL AND s.answer_key_pdf_url IS NOT NULL) AS pares,
 count(*) FILTER(WHERE s.status='validated') AS fontes_validadas,
 count(*) FILTER(WHERE s.status='deferred') AS fontes_adiadas
FROM public.exam_sources s
GROUP BY s.board ORDER BY fontes DESC LIMIT 35;

-- Integridade de questões publicadas (ausência não prova integridade visual).
SELECT count(*) AS publicadas,
 count(*) FILTER(WHERE status<>'validated') AS publicadas_nao_validadas,
 count(*) FILTER(WHERE status='annulled') AS anuladas_publicadas,
 count(*) FILTER(WHERE answer IS NULL OR btrim(answer)='') AS sem_resposta,
 count(*) FILTER(WHERE source_id IS NULL) AS sem_fonte,
 count(*) FILTER(WHERE module_id IS NULL) AS sem_modulo,
 count(*) FILTER(WHERE answer_source_type IS DISTINCT FROM 'official') AS sem_proveniencia_oficial_de_gabarito,
 count(*) FILTER(WHERE statement ~* '(tabela|quadro|figura|gráfico|imagem)'
   AND (media_urls IS NULL OR media_urls='[]'::jsonb)) AS suspeita_midia,
 count(*) FILTER(WHERE statement ~* 'julgue os itens (a seguir|seguintes|subsequentes)') AS suspeita_comando
FROM public.question_bank WHERE publication_status='published';

-- Fila editorial priorizada; sinalizações heurísticas não são defeitos confirmados.
SELECT q.id,q.source_id,q.question_number,q.board,q.year,q.status,q.publication_status,
 CASE WHEN q.answer_source_type IS DISTINCT FROM 'official'
      THEN 'CONFERIR_GABARITO_OFICIAL'
      WHEN q.statement ~* '(tabela|quadro|figura|gráfico|imagem)'
       AND (q.media_urls IS NULL OR q.media_urls='[]'::jsonb)
      THEN 'CONFERIR_MIDIA'
      WHEN q.statement ~* 'julgue os itens (a seguir|seguintes|subsequentes)'
      THEN 'CONFERIR_COMANDO'
 END AS motivo,
 q.exam_source_url,q.answer_source_url,
 left(q.statement,210) AS inicio_enunciado
FROM public.question_bank q
WHERE q.publication_status='published' AND (
 q.answer_source_type IS DISTINCT FROM 'official'
 OR (q.statement ~* '(tabela|quadro|figura|gráfico|imagem)'
     AND (q.media_urls IS NULL OR q.media_urls='[]'::jsonb))
 OR q.statement ~* 'julgue os itens (a seguir|seguintes|subsequentes)'
)
ORDER BY q.board,q.year DESC,q.question_number LIMIT 300;

-- Importações AOCP assistidas realmente executadas.
SELECT count(*) AS importacoes,
 count(*) FILTER(WHERE status='validated') AS validadas,
 count(*) FILTER(WHERE status='rejected') AS rejeitadas,
 count(*) FILTER(WHERE status='processing') AS processando
FROM public.exam_sources WHERE raw_metadata->>'importado'='true';

-- Caso histórico conhecido: PF 2025 / Agente específico.
SELECT q.question_number,q.id,q.status,q.publication_status,q.media_urls,
       left(q.statement,200) AS enunciado
FROM public.question_bank q
WHERE q.source_id='446556cb-28b5-4891-a2f5-d2fee9553e91'
  AND q.question_number BETWEEN 106 AND 112
ORDER BY q.question_number;
