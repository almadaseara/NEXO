-- Aplicado no Supabase (dkpgsvssyszrwmkutcyt) em 14/10/2026 — migração "nexo_estudo_e_marcacoes".
-- Tabelas só do aluno: cronograma/trilha/progresso e marcações de texto. Não tocam no banco de questões.
create table if not exists public.study_plans (
  user_id uuid primary key references auth.users(id) on delete cascade,
  plan jsonb not null default '{}'::jsonb,
  progress jsonb not null default '{}'::jsonb,
  weeks jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
create table if not exists public.study_highlights (
  user_id uuid not null references auth.users(id) on delete cascade,
  module_id text not null,
  tab text not null,
  marks jsonb not null default '[]'::jsonb,
  settings jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  primary key (user_id, module_id, tab)
);
alter table public.study_plans enable row level security;
alter table public.study_highlights enable row level security;
create policy "aluno lê o próprio plano" on public.study_plans for select to authenticated using ((select auth.uid()) = user_id);
create policy "aluno cria o próprio plano" on public.study_plans for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "aluno altera o próprio plano" on public.study_plans for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "aluno apaga o próprio plano" on public.study_plans for delete to authenticated using ((select auth.uid()) = user_id);
create policy "aluno lê as próprias marcações" on public.study_highlights for select to authenticated using ((select auth.uid()) = user_id);
create policy "aluno cria as próprias marcações" on public.study_highlights for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "aluno altera as próprias marcações" on public.study_highlights for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "aluno apaga as próprias marcações" on public.study_highlights for delete to authenticated using ((select auth.uid()) = user_id);
grant select, insert, update, delete on public.study_plans, public.study_highlights to authenticated;
revoke all on public.study_plans, public.study_highlights from anon;
