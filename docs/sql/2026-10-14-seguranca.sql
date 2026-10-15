-- Aplicado no Supabase (dkpgsvssyszrwmkutcyt) em 14/10/2026.
-- 1) Funções internas do robô/coletor: antes qualquer pessoa, mesmo sem login, podia chamá-las pela API
--    (ex.: classify_questions_against_catalog() desfazia a classificação e despublicava o banco).
--    Agora só o banco (cron e gatilhos, como postgres) e as funções do servidor (service_role) chamam.
do $$
declare f text;
begin
  foreach f in array array[
    'public.can_accept_mirror_answer(text, text)',
    'public.classify_questions_against_catalog()',
    'public.collector_is_busy()',
    'public.enqueue_official_question_collector()',
    'public.enqueue_resolution_candidate(uuid, text, text, text, numeric, jsonb)',
    'public.publish_questions_for_integrated_disciplines()',
    'public.trigger_next_collector_after_finish()',
    'public.validate_collector_token(text)',
    'public.is_trusted_mirror_url(text)'
  ] loop
    execute format('revoke execute on function %s from public, anon, authenticated', f);
    execute format('grant execute on function %s to service_role', f);
  end loop;
end $$;
-- is_nexo_admin() é usada nas regras de leitura de usuários logados: fica só para "authenticated".
revoke execute on function public.is_nexo_admin() from public, anon;
grant execute on function public.is_nexo_admin() to authenticated, service_role;

-- 2) Views do banco passam a obedecer ao RLS de quem consulta (antes mostravam o banco, com gabaritos,
--    para quem não estava logado).
alter view public.published_question_bank set (security_invoker = true);
alter view public.valid_question_bank set (security_invoker = true);
revoke select on public.published_question_bank, public.valid_question_bank from anon;
