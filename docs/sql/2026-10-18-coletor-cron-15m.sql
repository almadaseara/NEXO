-- NEXO — coletor a cada 15 min (aplicada em 18/10/2026 como "coletor_cron_15m").
-- O coletor lê uma prova oficial por execução e encadeia a próxima. Se uma execução for encerrada pelo
-- limite de CPU da Edge Function, a cadeia para; este cron a religa (execução ociosa termina em ~1 s).
do $$
declare j bigint;
begin
  select jobid into j from cron.job where jobname = 'nexo-question-collector-2h';
  if j is not null then perform cron.unschedule(j); end if;
  if exists (select 1 from cron.job where jobname = 'nexo-question-collector-15m') then perform cron.unschedule('nexo-question-collector-15m'); end if;
  perform cron.schedule('nexo-question-collector-15m', '*/15 * * * *', $cmd$
  select net.http_post(
    url := 'https://dkpgsvssyszrwmkutcyt.supabase.co/functions/v1/question-collector',
    headers := jsonb_build_object('Content-Type','application/json',
      'x-nexo-cron',(select decrypted_secret from vault.decrypted_secrets where name='nexo_collector_cron_v2' limit 1)),
    body := jsonb_build_object('trigger','cron-watchdog','requested_at',now()));
  $cmd$);
end $$;
