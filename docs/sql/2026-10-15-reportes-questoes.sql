-- Avisos de erro em questões enviados pelos alunos (botão "Reportar erro").
create table if not exists public.question_reports (
  id bigint generated always as identity primary key,
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  question_ref text not null check (char_length(question_ref) <= 300),
  bank_id uuid,
  module_id text check (char_length(module_id) <= 120),
  motivo text not null check (motivo in ('sem_enunciado','alternativas','gabarito','comentario','outro')),
  mensagem text check (char_length(mensagem) <= 1000),
  trecho text check (char_length(trecho) <= 400),
  pagina text check (char_length(pagina) <= 300),
  status text not null default 'novo' check (status in ('novo','visto','resolvido')),
  created_at timestamptz not null default now()
);
create index if not exists question_reports_user_idx on public.question_reports(user_id);
create index if not exists question_reports_status_idx on public.question_reports(status, created_at desc);
alter table public.question_reports enable row level security;

drop policy if exists "aluno envia o próprio aviso" on public.question_reports;
create policy "aluno envia o próprio aviso" on public.question_reports
  for insert to authenticated with check (user_id = (select auth.uid()) and status = 'novo');
drop policy if exists "aluno vê os próprios avisos; admin vê todos" on public.question_reports;
create policy "aluno vê os próprios avisos; admin vê todos" on public.question_reports
  for select to authenticated using (user_id = (select auth.uid()) or (select public.is_nexo_admin()));
drop policy if exists "admin atualiza status" on public.question_reports;
create policy "admin atualiza status" on public.question_reports
  for update to authenticated using ((select public.is_nexo_admin())) with check ((select public.is_nexo_admin()));

revoke all on public.question_reports from anon;
grant select, insert on public.question_reports to authenticated;
grant update (status) on public.question_reports to authenticated;
