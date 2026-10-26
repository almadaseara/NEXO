-- NEXO — consenso só eleva para confiança 0,9 quando algum voto concordante é "alta".
--
-- Motivo: nexo_consenso_aplicar() elevava para 0,9 qualquer módulo com 2 votos iguais, inclusive quando
-- os dois votos eram "média". Com isso, questões que a rotina marcou como média passavam na trava de
-- publicação automática (auto_publish_min_confidence = 0,9). Ex.: 0282e95b-c7ea-408f-9569-0fb941f9278d,
-- publicada em 26/10/2026 com "[consenso 2/3] [claude_routine_v1]".
--
-- Regra nova: o módulo vencedor precisa de pelo menos um voto "alta" (voto da tabela question_ai_votes
-- com confidence = 'alta', ou a própria linha de question_bank com ai_module_confidence >= 0,9).
-- Dois votos "média" continuam sem consenso e ficam para a revisão.
--
-- Não altera publicação, gabaritos nem dados existentes. Não republica nem retém questões já publicadas:
-- essas 19 questões (5 com origem média na rotina) ficam para decisão do administrador.
--
-- Aplicar somente com aprovação do administrador (AGENTS.md: travas de publicação não mudam sem pedido dele).

create or replace function public.nexo_consenso_aplicar()
returns jsonb
language plpgsql
security definer
as $$
declare n integer := 0;
begin
  with votos as (
    select q.id, q.ai_module_id as mod,
           case when q.ai_module_confidence >= 0.9 then 'alta' else 'media' end as nivel
      from question_bank q
      where q.ai_module_id is not null and q.ai_module_id <> 'fora_do_catalogo'
    union all
    select v.question_id, v.module_id, v.confidence
      from question_ai_votes v where v.module_id <> 'fora_do_catalogo'
  ), contagem as (
    select id, mod, count(*) c, bool_or(nivel = 'alta') tem_alta
      from votos group by id, mod
  ), vencedor as (
    select id, mod from contagem where c >= 2 and tem_alta
  ), up as (
    update question_bank q set
      ai_module_id = w.mod, ai_module_confidence = 0.9,
      ai_module_reason = '[consenso 2/3] ' || coalesce(q.ai_module_reason, ''),
      updated_at = now()
    from vencedor w
    where q.id = w.id and q.module_id is null and q.publication_status in ('banked','ready')
      and q.ai_module_confidence < 0.9
      and exists (select 1 from subject_catalog c where c.module_id = w.mod and c.active)
    returning 1
  ) select count(*) into n from up;
  return jsonb_build_object('consenso_aplicado', n);
end
$$;
