-- NEXO — triagem SOMENTE LEITURA de itens que dependem de contexto externo.
-- Sinalização heurística: revisar no PDF oficial antes de qualquer edição/publicação.
-- Não classifica automaticamente como erro e não altera dados.

-- 1. Suspeita de enunciado contaminado por cabeçalho do item seguinte.
SELECT q.id,q.source_id,q.board,q.year,q.question_number,
       q.status,q.publication_status,
       left(q.statement,350) AS amostra
FROM public.question_bank q
WHERE q.statement ~* '(julgue os itens a seguir|julgue os itens seguintes|julgue os itens subsequentes|com base nos dados precedentes)'
ORDER BY q.created_at DESC
LIMIT 100;

-- 2. Lista de posições não presentes entre primeiro e último item por fonte
-- (pode indicar filtragem legítima; comparar com prova/gabarito, incluindo anuladas).
WITH limites AS (
 SELECT source_id,min(question_number) min_n,max(question_number) max_n
 FROM public.question_bank WHERE question_number IS NOT NULL GROUP BY source_id
), candidatos AS (
 SELECT l.source_id,x.n
 FROM limites l CROSS JOIN LATERAL generate_series(l.min_n,l.max_n) AS x(n)
 WHERE NOT EXISTS(SELECT 1 FROM public.question_bank q
                  WHERE q.source_id=l.source_id AND q.question_number=x.n)
)
SELECT s.board,s.year,s.role_name,c.source_id,count(*) as lacunas,
       array_agg(c.n ORDER BY c.n) AS numeros
FROM candidatos c JOIN public.exam_sources s ON s.id=c.source_id
WHERE s.exam_pdf_url IS NOT NULL AND s.answer_key_pdf_url IS NOT NULL
GROUP BY s.board,s.year,s.role_name,c.source_id ORDER BY lacunas DESC
LIMIT 60;

-- 3. Amostra prioritária PF/2025: conferir tabela da página 1 (itens 107–110).
-- "media_urls vazio" isoladamente não é prova de defeito: imagens podem ser
-- representadas no texto/contexto da interface. Neste caso o PDF foi inspecionado.
SELECT question_number,id,publication_status,status,
       coalesce(jsonb_array_length(media_urls),0) AS arquivos_visuais,
       statement
FROM public.question_bank
WHERE source_id='446556cb-28b5-4891-a2f5-d2fee9553e91'
AND question_number BETWEEN 107 AND 112
ORDER BY question_number;

-- 4. Fontes com questões publicadas e nenhum recurso em media_urls: só triagem.
SELECT s.id,s.board,s.year,s.role_name,
 count(*) FILTER(WHERE q.publication_status='published') AS publicadas,
 count(*) FILTER(WHERE q.publication_status='published' AND (q.media_urls IS NULL OR q.media_urls='[]'::jsonb)) AS publicadas_sem_arquivos
FROM public.exam_sources s JOIN public.question_bank q ON q.source_id=s.id
WHERE s.exam_pdf_url IS NOT NULL
GROUP BY s.id,s.board,s.year,s.role_name
HAVING count(*) FILTER(WHERE q.publication_status='published')>0
ORDER BY publicadas_sem_arquivos DESC LIMIT 60;
