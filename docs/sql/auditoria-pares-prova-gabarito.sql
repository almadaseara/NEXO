-- NEXO Revisão — auditoria SOMENTE LEITURA de pares prova/gabarito
-- Rodar no SQL Editor do Supabase vinculado ao projeto NEXO.
-- Não altera questões, gabaritos, fontes, RLS ou estados de publicação.

-- 1. Painel geral dos pares
WITH pares AS (
  SELECT id,board,status,exam_pdf_url,answer_key_pdf_url
  FROM public.exam_sources
  WHERE exam_pdf_url IS NOT NULL AND answer_key_pdf_url IS NOT NULL
), base AS (
  SELECT p.*, 
    (SELECT count(*) FROM public.question_bank q WHERE q.source_id=p.id) AS questoes,
    (SELECT count(*) FROM public.question_bank q WHERE q.source_id=p.id AND q.status='validated' AND q.publication_status='published') AS publicadas_validadas,
    (SELECT count(*) FROM public.question_bank q WHERE q.source_id=p.id AND q.status='annulled') AS anuladas,
    (SELECT count(*) FROM public.exam_documents d WHERE d.source_id=p.id AND d.extraction_status='done') AS documentos_extraidos
  FROM pares p
)
SELECT board,status,count(*) AS fontes,
  sum(questoes) AS questoes,
  sum(publicadas_validadas) AS publicadas_validadas,
  sum(anuladas) AS anuladas,
  sum(documentos_extraidos) AS documentos_extraidos
FROM base GROUP BY board,status ORDER BY fontes DESC;

-- 2. Anomalias objetivas; zero é esperado em cada contador
WITH qs AS (
  SELECT q.* FROM public.question_bank q
  JOIN public.exam_sources s ON s.id=q.source_id
  WHERE s.exam_pdf_url IS NOT NULL AND s.answer_key_pdf_url IS NOT NULL
)
SELECT
  count(*) FILTER (WHERE status='annulled' AND publication_status='published') AS anuladas_publicadas,
  count(*) FILTER (WHERE publication_status='published' AND status<>'validated') AS publicadas_nao_validadas,
  count(*) FILTER (WHERE answer IS NULL OR btrim(answer)='') AS gabarito_vazio,
  count(*) FILTER (WHERE question_number IS NULL) AS numero_ausente,
  count(*) FILTER (WHERE statement IS NULL OR char_length(btrim(statement))<30) AS enunciado_curto,
  count(*) FILTER (WHERE board='CEBRASPE' AND answer NOT IN ('C','E') AND status<>'annulled') AS cebraspe_formato_incorreto,
  count(*) FILTER (WHERE board IN ('FGV','IBFC','AOCP') AND answer NOT IN ('A','B','C','D','E') AND status<>'annulled') AS multipla_escolha_formato_incorreto
FROM qs;

-- 3. Pares potencialmente compartilhados entre diferentes cargos/tipos.
-- Repetição não prova erro; revisar se o caderno é realmente idêntico.
SELECT exam_pdf_url, answer_key_pdf_url,
       count(*) AS referencias,
       array_agg(distinct coalesce(role_name,'(sem cargo)')) AS cargos,
       array_agg(distinct coalesce(booklet_type,'(sem tipo)')) AS tipos
FROM public.exam_sources
WHERE exam_pdf_url IS NOT NULL AND answer_key_pdf_url IS NOT NULL
GROUP BY exam_pdf_url,answer_key_pdf_url
HAVING count(*)>1 ORDER BY referencias DESC;

-- 4. Próxima fila de revisão editorial; nenhuma linha é atualizada.
SELECT s.id,s.board,s.year,s.role_name,s.booklet_type,s.status,
       (SELECT count(*) FROM public.question_bank q WHERE q.source_id=s.id) AS questoes,
       (SELECT count(*) FROM public.question_bank q WHERE q.source_id=s.id AND q.status='validated' AND q.publication_status='published') AS publicadas,
       (SELECT count(*) FROM public.exam_documents d WHERE d.source_id=s.id AND d.extraction_status='done') AS pdfs_extraidos,
       s.exam_pdf_url,s.answer_key_pdf_url
FROM public.exam_sources s
WHERE s.exam_pdf_url IS NOT NULL AND s.answer_key_pdf_url IS NOT NULL
ORDER BY
  CASE WHEN s.status<>'validated' THEN 0 ELSE 1 END,
  CASE WHEN s.board='AOCP' THEN 0 WHEN s.board='CEBRASPE' THEN 1 ELSE 2 END,
  s.year DESC,s.role_name;
