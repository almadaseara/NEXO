-- NEXO — fila da rotina de classificação em lotes (aplicada em 18/10/2026 como "rotina_fila_classificacao_paginada").
-- A fila de 200 questões passava do tamanho de resposta da ferramenta da rotina. Agora: lote de até 100 (a rotina
-- usa 50), texto-base cortado em 1.500 caracteres (basta para classificar) e sem as questões que já estão
-- depositadas em ai_external_extractions aguardando a nexo-ai.
drop function if exists public.nexo_rotina_fila_classificacao(integer);
create or replace function public.nexo_rotina_fila_classificacao(p_limite integer default 50, p_offset integer default 0)
returns table(id uuid, board text, year integer, statement text, options jsonb, texto_base text)
language sql stable security definer set search_path to 'public'
as $function$
  select q.id, q.board, q.year, q.statement, q.options, left(c.content, 1500)
  from public.question_bank q left join public.question_contexts c on c.id = q.context_id
  where q.status = 'validated' and q.ai_module_id is null
    and not exists (select 1 from public.question_module_map m where m.question_id = q.id)
    and not exists (select 1 from public.ai_external_extractions e
                    where e.kind = 'classify' and e.status = 'pending'
                      and e.payload->'classificacoes' @> jsonb_build_array(jsonb_build_object('id', q.id::text)))
  order by q.year desc nulls last, q.id
  limit greatest(1, least(p_limite, 100)) offset greatest(0, p_offset)
$function$;
revoke all on function public.nexo_rotina_fila_classificacao(integer, integer) from public, anon, authenticated;
