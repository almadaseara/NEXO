-- NEXO — publicação e escolha de módulo automáticas (decisão do administrador em 18/10/2026).
-- A nexo-ai chama nexo_auto_publicar() a cada execução (cron de 20 min), depois de classificar com o Gemini.
-- Só entra no site o que passa em TODAS as travas abaixo; o resto continua na tela de revisão.
-- Desligar: update collector_control set auto_publish = false where id = 1;
-- Desfazer uma questão: Revisar questões → "Reter" (o filtro "publicadas automaticamente" mostra todas).

alter table public.collector_control
  add column if not exists auto_publish boolean not null default true,
  add column if not exists auto_publish_min_confidence numeric not null default 0.9,  -- só confiança alta
  add column if not exists auto_publish_per_run integer not null default 500;

-- Alertas que impedem a publicação automática (o administrador ainda pode publicar pela revisão).
create or replace function public.nexo_auto_publicar_bloqueios()
returns text[] language sql immutable as $$
  select array['gabarito_de_espelho', 'caderno_de_espelho', 'gabarito_lido_pela_ia', 'alerta_ia', 'tem_figura', 'rodape_colado']
$$;

create or replace function public.nexo_auto_publicar(p_limite integer default null)
returns jsonb language plpgsql security definer set search_path = public as $$
declare cfg record; n integer := 0;
begin
  select auto_publish, auto_publish_min_confidence, auto_publish_per_run into cfg from public.collector_control where id = 1;
  if cfg is null or not cfg.auto_publish then return jsonb_build_object('publicadas', 0, 'motivo', 'desligada'); end if;

  with alvo as (
    select q.id, coalesce(q.module_id, q.ai_module_id) as mod
    from public.question_bank q
    where q.status = 'validated'                                  -- gabarito oficial conferido pelo sistema
      and q.validation_source_type = 'official'
      and q.publication_status in ('banked', 'ready')
      and q.reviewed_at is null                                   -- o que o administrador já mexeu fica como ele deixou
      and not (q.review_flags ?| public.nexo_auto_publicar_bloqueios())
      and length(btrim(coalesce(q.statement, ''))) >= 15
      and q.statement !~* '\mjulgue\M[^.!?]*[.:]?\s*$'          -- comando do bloco seguinte colado no fim do item
      and jsonb_typeof(q.options) = 'array'
      and (case when jsonb_array_length(q.options) = 2 then q.answer in ('C', 'E')
                when jsonb_array_length(q.options) between 4 and 5 then position(q.answer in left('ABCDE', jsonb_array_length(q.options))) > 0
                else false end)
      and (q.module_id is not null
           or (q.ai_module_confidence >= cfg.auto_publish_min_confidence
               and exists (select 1 from public.subject_catalog c where c.module_id = q.ai_module_id and c.active)))
      and not exists (select 1 from public.question_module_map m where m.question_id = q.id and m.module_id <> coalesce(q.module_id, q.ai_module_id))
    order by q.year desc nulls last, q.id
    limit greatest(1, coalesce(p_limite, cfg.auto_publish_per_run))
    for update of q skip locked
  ), pub as (
    update public.question_bank q set
      module_id = a.mod,
      classification_status = 'classified',
      classification_method = case when q.module_id is null then 'ai_auto' else q.classification_method end,
      publication_status = 'published',
      published_at = coalesce(q.published_at, now()),
      review_flags = case when q.review_flags ? 'publicado_automaticamente' then q.review_flags
                          else q.review_flags || '["publicado_automaticamente"]'::jsonb end,
      updated_at = now()
    from alvo a where q.id = a.id
    returning q.id, a.mod
  ), mapa as (
    insert into public.question_module_map (question_id, module_id, reviewed_by, reviewed_at)
    select id, mod, null, now() from pub
    on conflict do nothing
    returning 1
  )
  select count(*) into n from pub;
  return jsonb_build_object('publicadas', n);
end $$;
revoke all on function public.nexo_auto_publicar(integer) from public, anon, authenticated;
revoke all on function public.nexo_auto_publicar_bloqueios() from public, anon;
