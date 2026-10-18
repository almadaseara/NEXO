-- Histórico de questões e revisão por conta (sincroniza entre aparelhos).
-- Tabelas só do aluno: respostas por questão (a última de cada uma) e o registro de eventos
-- (questões, fichas e tempo) usado no desempenho, no caderno de erros e na revisão de hoje.
-- Não tocam no banco de questões nem nos gabaritos.
create table if not exists public.study_answers (
  user_id uuid not null references auth.users(id) on delete cascade,
  skey text not null,
  ok boolean not null,
  letra text not null default '',
  answered_at timestamptz not null,
  resolvida_em timestamptz,
  primary key (user_id, skey)
);
create table if not exists public.study_events (
  user_id uuid not null references auth.users(id) on delete cascade,
  ev_id text not null,
  t bigint not null,
  k text not null,
  m text,
  ok boolean,
  g smallint,
  ms integer,
  primary key (user_id, ev_id)
);
create index if not exists study_events_user_t on public.study_events (user_id, t desc);
alter table public.study_answers enable row level security;
alter table public.study_events enable row level security;
create policy "aluno lê as próprias respostas" on public.study_answers for select to authenticated using ((select auth.uid()) = user_id);
create policy "aluno cria as próprias respostas" on public.study_answers for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "aluno altera as próprias respostas" on public.study_answers for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "aluno apaga as próprias respostas" on public.study_answers for delete to authenticated using ((select auth.uid()) = user_id);
create policy "aluno lê os próprios eventos" on public.study_events for select to authenticated using ((select auth.uid()) = user_id);
create policy "aluno cria os próprios eventos" on public.study_events for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "aluno altera os próprios eventos" on public.study_events for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "aluno apaga os próprios eventos" on public.study_events for delete to authenticated using ((select auth.uid()) = user_id);
grant select, insert, update, delete on public.study_answers, public.study_events to authenticated;
revoke all on public.study_answers, public.study_events from anon;
