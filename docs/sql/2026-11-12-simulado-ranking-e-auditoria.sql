-- NEXO — 12/11/2026
-- 1) Ranking dos simulados (ui/nexo-simulado-lab.js): cada simulado entregue grava um resultado
--    resumido (sem as respostas) e o aluno vê a própria posição entre os colegas.
-- 2) Auditoria por amostragem (ui/nexo-auditoria.js): o administrador recebe, toda semana, uma
--    amostra das questões publicadas que ninguém conferiu, começando pelas de maior risco.
-- Nada aqui altera question_bank, gabaritos ou as travas de publicação.

-- ---------------------------------------------------------------- 1) simulados
create table if not exists public.simulado_resultados (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  concurso text,
  modo text not null,
  n smallint not null,
  respondidas smallint not null,
  acertos smallint not null,
  ms integer not null,
  created_at timestamptz not null default now(),
  constraint simulado_resultados_concurso_chk check (concurso is null or char_length(concurso) between 1 and 40),
  constraint simulado_resultados_modo_chk check (modo in ('erros', 'equilibrio', 'tempo')),
  constraint simulado_resultados_n_chk check (n between 10 and 200),
  constraint simulado_resultados_resp_chk check (respondidas between 0 and n),
  constraint simulado_resultados_acertos_chk check (acertos between 0 and respondidas),
  constraint simulado_resultados_ms_chk check (ms > 0)
);
create index if not exists simulado_resultados_user_idx on public.simulado_resultados (user_id, created_at desc);
create index if not exists simulado_resultados_data_idx on public.simulado_resultados (created_at desc);

alter table public.simulado_resultados enable row level security;

-- O aluno só lê os próprios resultados. Não há política de escrita: a gravação passa pela função
-- nexo_simulado_registrar, que usa a data do servidor e a conta de quem está logado.
drop policy if exists "aluno le os proprios simulados" on public.simulado_resultados;
create policy "aluno le os proprios simulados" on public.simulado_resultados
  for select to authenticated using ((select auth.uid()) = user_id);

-- Primeiro nome e inicial do sobrenome ("Maria S."), para o ranking não expor o nome completo.
create or replace function public.nexo_nome_curto(p_nome text)
returns text
language sql
immutable
set search_path = public
as $$
  select case
    when btrim(coalesce(p_nome, '')) = '' then 'Aluno'
    when position(' ' in btrim(p_nome)) = 0 then btrim(p_nome)
    else split_part(btrim(p_nome), ' ', 1) || ' ' || upper(left(regexp_replace(btrim(p_nome), '^.*\s', ''), 1)) || '.'
  end;
$$;

-- Ranking: vale o melhor simulado de cada aluno no período, com 20 questões ou mais.
-- Ordem: maior % de acerto; no empate, a prova maior; depois, o menor tempo.
create or replace function public.nexo_simulado_ranking(p_concurso text default null, p_dias integer default 30)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare v jsonb;
begin
  if not public.is_nexo_aluno() then
    raise exception 'Entre com uma conta liberada para ver o ranking.' using errcode = '42501';
  end if;
  with base as (
    select r.user_id, r.acertos, r.n, r.ms,
           row_number() over (partition by r.user_id order by r.acertos::numeric / r.n desc, r.n desc, r.ms asc) as k
    from public.simulado_resultados r
    join public.profiles p on p.id = r.user_id and p.active = true
    where r.n >= 20
      and r.created_at >= now() - make_interval(days => greatest(1, least(coalesce(p_dias, 30), 365)))
      and (nullif(btrim(coalesce(p_concurso, '')), '') is null or r.concurso = btrim(p_concurso))
  ), rk as (
    select b.user_id, b.acertos, b.n, b.ms,
           rank() over (order by b.acertos::numeric / b.n desc, b.n desc, b.ms asc) as pos
    from base b where b.k = 1
  )
  select jsonb_build_object(
    'participantes', (select count(*) from rk),
    'media', (select round(avg(acertos::numeric / n) * 100) from rk),
    'eu', (select jsonb_build_object('pos', pos, 'pct', round(acertos::numeric / n * 100), 'n', n, 'acertos', acertos)
           from rk where user_id = auth.uid()),
    'top', coalesce((
      select jsonb_agg(jsonb_build_object(
               'pos', t.pos, 'nome', public.nexo_nome_curto(pr.full_name),
               'pct', round(t.acertos::numeric / t.n * 100), 'n', t.n, 'acertos', t.acertos,
               'eu', t.user_id = auth.uid()) order by t.pos, t.ms)
      from (select * from rk order by pos, ms limit 10) t
      left join public.profiles pr on pr.id = t.user_id), '[]'::jsonb)
  ) into v;
  return v;
end;
$$;

-- Grava o resultado do simulado de quem está logado e devolve o ranking já atualizado.
create or replace function public.nexo_simulado_registrar(
  p_concurso text, p_modo text, p_n integer, p_respondidas integer, p_acertos integer, p_ms integer)
returns jsonb
language plpgsql
volatile
security definer
set search_path = public
as $$
declare v_conc text := nullif(btrim(coalesce(p_concurso, '')), '');
begin
  if not public.is_nexo_aluno() then
    raise exception 'Entre com uma conta liberada para registrar o simulado.' using errcode = '42501';
  end if;
  -- no máximo um registro por minuto por aluno: evita repetição por duplo clique ou reenvio
  if exists (select 1 from public.simulado_resultados
             where user_id = auth.uid() and created_at > now() - interval '1 minute') then
    return public.nexo_simulado_ranking(v_conc, 30);
  end if;
  insert into public.simulado_resultados (user_id, concurso, modo, n, respondidas, acertos, ms)
  values (auth.uid(), v_conc, p_modo, p_n, p_respondidas, p_acertos, p_ms);
  return public.nexo_simulado_ranking(v_conc, 30);
end;
$$;

revoke all on function public.nexo_simulado_ranking(text, integer) from public, anon;
revoke all on function public.nexo_simulado_registrar(text, text, integer, integer, integer, integer) from public, anon;
grant execute on function public.nexo_simulado_ranking(text, integer) to authenticated;
grant execute on function public.nexo_simulado_registrar(text, text, integer, integer, integer, integer) to authenticated;

-- ---------------------------------------------------------------- 2) auditoria por amostragem
-- Amostra das publicadas que nenhum administrador conferiu (reviewed_at vazio).
-- Risco: gabarito vindo de espelho pesa mais; depois, confiança baixa da classificação.
-- Dentro do mesmo risco a ordem é sorteada por semana, então a amostra muda toda segunda-feira
-- e continua a mesma se a tela for reaberta no meio da semana.
-- Conferir ou reter continua passando por nexo_admin_revisar_questao (ações 'editar' e 'reter').
create or replace function public.nexo_admin_auditoria_amostra(p_limite integer default 20)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare v jsonb; v_sem text := to_char(now(), 'IYYY-IW');
begin
  if not public.is_nexo_admin() then
    raise exception 'Apenas administradores fazem a auditoria.' using errcode = '42501';
  end if;
  with pub as (
    select q.*,
           coalesce(least(q.classification_confidence, q.ai_module_confidence), 0.5) as conf,
           coalesce((select m.module_id from public.question_module_map m where m.question_id = q.id), q.module_id) as modulo
    from public.question_bank q
    where q.publication_status = 'published'
  ), pend as (
    select p.*,
           (case when p.answer_source_type = 'mirror' then 2 else 0 end
            + case when p.conf < 0.8 then 2 when p.conf < 0.9 then 1 else 0 end) as risco
    from pub p where p.reviewed_at is null
  )
  select jsonb_build_object(
    'semana', v_sem,
    'resumo', jsonb_build_object(
      'publicadas', (select count(*) from pub),
      'conferidas', (select count(*) from pub where reviewed_at is not null),
      'conferidas_semana', (select count(*) from pub where reviewed_at >= date_trunc('week', now())),
      'pendentes_espelho', (select count(*) from pend where answer_source_type = 'mirror'),
      'pendentes_confianca_baixa', (select count(*) from pend where conf < 0.8)),
    'amostra', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', s.id, 'statement', s.statement, 'options', s.options, 'answer', s.answer,
        'question_type', s.question_type, 'discipline', s.discipline, 'module_id', s.modulo,
        'board', s.board, 'year', s.year, 'institution', s.institution, 'role_name', s.role_name,
        'conf', s.conf, 'risco', s.risco, 'classification_method', s.classification_method,
        'answer_source_type', s.answer_source_type, 'answer_source_name', s.answer_source_name,
        'answer_source_url', s.answer_source_url, 'exam_source_url', s.exam_source_url,
        'media_urls', s.media_urls,
        'contexto', (select c.content from public.question_contexts c where c.id = s.context_id)
      ) order by s.risco desc, s.ordem)
      from (select p.*, md5(p.id::text || v_sem) as ordem from pend p
            order by p.risco desc, md5(p.id::text || v_sem)
            limit greatest(1, least(coalesce(p_limite, 20), 50))) s), '[]'::jsonb)
  ) into v;
  return v;
end;
$$;

revoke all on function public.nexo_admin_auditoria_amostra(integer) from public, anon;
grant execute on function public.nexo_admin_auditoria_amostra(integer) to authenticated;
