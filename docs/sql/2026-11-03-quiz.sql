-- NEXO · Quiz entre amigos (salas, perguntas e jogadores)
-- Tabelas próprias do quiz. Não altera questões do banco, gabaritos nem tabelas existentes.
-- Gabarito das perguntas do quiz fica legível para quem está logado (ver docs/quiz.md).

create table if not exists public.quiz_salas (
  codigo text primary key check (codigo ~ '^[A-Z2-9]{5}$'),
  anfitriao uuid not null references auth.users(id) on delete cascade,
  fase text not null default 'lobby' check (fase in ('lobby','pergunta','revelada','encerrada')),
  pergunta_atual int not null default 0,
  inicio timestamptz,
  tempo_s int not null default 20 check (tempo_s between 5 and 120),
  total int not null default 0,
  criado_em timestamptz not null default now()
);

create table if not exists public.quiz_perguntas (
  codigo text not null references public.quiz_salas(codigo) on delete cascade,
  ordem int not null,
  pergunta text not null,
  alternativas jsonb not null,
  gabarito int not null check (gabarito between 0 and 4),
  disciplina text not null default '',
  primary key (codigo, ordem)
);

create table if not exists public.quiz_jogadores (
  codigo text not null references public.quiz_salas(codigo) on delete cascade,
  uid uuid not null references auth.users(id) on delete cascade,
  nome text not null check (char_length(nome) between 1 and 20),
  pontos int not null default 0,
  respostas jsonb not null default '{}'::jsonb,
  entrou_em timestamptz not null default now(),
  primary key (codigo, uid)
);

alter table public.quiz_salas enable row level security;
alter table public.quiz_perguntas enable row level security;
alter table public.quiz_jogadores enable row level security;

-- Salas: qualquer logado lê (para entrar pelo código); só o anfitrião cria e altera.
drop policy if exists quiz_salas_ler on public.quiz_salas;
create policy quiz_salas_ler on public.quiz_salas for select to authenticated using (true);
drop policy if exists quiz_salas_criar on public.quiz_salas;
create policy quiz_salas_criar on public.quiz_salas for insert to authenticated with check (anfitriao = auth.uid());
drop policy if exists quiz_salas_editar on public.quiz_salas;
create policy quiz_salas_editar on public.quiz_salas for update to authenticated using (anfitriao = auth.uid()) with check (anfitriao = auth.uid());
drop policy if exists quiz_salas_apagar on public.quiz_salas;
create policy quiz_salas_apagar on public.quiz_salas for delete to authenticated using (anfitriao = auth.uid());

-- Perguntas: lidas por quem está logado; gravadas só pelo anfitrião da sala.
drop policy if exists quiz_perguntas_ler on public.quiz_perguntas;
create policy quiz_perguntas_ler on public.quiz_perguntas for select to authenticated using (true);
drop policy if exists quiz_perguntas_gravar on public.quiz_perguntas;
create policy quiz_perguntas_gravar on public.quiz_perguntas for insert to authenticated
  with check (exists (select 1 from public.quiz_salas s where s.codigo = public.quiz_perguntas.codigo and s.anfitriao = auth.uid()));

-- Jogadores: qualquer logado lê o placar; cada um entra e atualiza só a própria linha.
drop policy if exists quiz_jogadores_ler on public.quiz_jogadores;
create policy quiz_jogadores_ler on public.quiz_jogadores for select to authenticated using (true);
drop policy if exists quiz_jogadores_entrar on public.quiz_jogadores;
create policy quiz_jogadores_entrar on public.quiz_jogadores for insert to authenticated with check (uid = auth.uid());
drop policy if exists quiz_jogadores_atualizar on public.quiz_jogadores;
create policy quiz_jogadores_atualizar on public.quiz_jogadores for update to authenticated using (uid = auth.uid()) with check (uid = auth.uid());

-- Tempo real: o app assina estas tabelas.
do $$ begin
  alter publication supabase_realtime add table public.quiz_salas;
exception when duplicate_object then null; end $$;
do $$ begin
  alter publication supabase_realtime add table public.quiz_jogadores;
exception when duplicate_object then null; end $$;
