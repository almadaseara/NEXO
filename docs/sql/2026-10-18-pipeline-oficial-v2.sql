-- NEXO — Pipeline oficial de questões v2 (18/10/2026)
-- Aplicada em produção como migration "pipeline_oficial_v2". Quase tudo é acréscimo; as exceções são:
--   * desliga o cron "nexo-question-classifier-15m", que a cada 15 min despublicava as questões classificadas
--     por regra, reclassificava por palavras-chave e republicava sem revisão humana;
--   * desliga as sementes do PCI Concursos (site espelho): a coleta passa a usar só fontes oficiais.
-- Nenhum gabarito é alterado. As questões hoje publicadas continuam publicadas.

-- 1. Configuração da janela de anos e das fontes ---------------------------------------------
alter table public.collector_control
  add column if not exists year_min integer not null default 2018,
  add column if not exists year_max integer,                       -- null = ano atual + 1
  add column if not exists allow_mirror boolean not null default false,
  add column if not exists ai_enabled boolean not null default true,
  add column if not exists ai_extract_per_tick integer not null default 4,
  add column if not exists ai_classify_per_tick integer not null default 300;

create or replace function public.nexo_year_window(out year_min integer, out year_max integer)
language sql stable security definer set search_path = public as $$
  select coalesce(c.year_min, 2018), coalesce(c.year_max, extract(year from now())::int + 1)
  from public.collector_control c where c.id = 1
$$;
revoke all on function public.nexo_year_window() from public, anon, authenticated;
grant execute on function public.nexo_year_window() to service_role;

-- 2. Textos-base compartilhados entre várias questões -----------------------------------------
create table if not exists public.question_contexts (
  id uuid primary key default gen_random_uuid(),
  source_id uuid not null references public.exam_sources(id) on delete cascade,
  context_key text not null,
  content text not null,
  figure_refs jsonb not null default '[]'::jsonb,
  media_urls jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (source_id, context_key)
);
alter table public.question_contexts enable row level security;

-- 3. Novas colunas do banco de questões ------------------------------------------------------
alter table public.question_bank
  add column if not exists context_id uuid references public.question_contexts(id) on delete set null,
  add column if not exists figure_refs jsonb not null default '[]'::jsonb,
  add column if not exists extraction_method text,
  add column if not exists review_flags jsonb not null default '[]'::jsonb,
  add column if not exists review_notes text,
  add column if not exists reviewed_by uuid references auth.users(id) on delete set null,
  add column if not exists reviewed_at timestamptz,
  add column if not exists ai_module_id text,
  add column if not exists ai_module_confidence numeric,
  add column if not exists ai_module_reason text,
  add column if not exists ai_classified_at timestamptz;
create index if not exists question_bank_context_idx on public.question_bank(context_id);
create index if not exists question_bank_pub_status_idx on public.question_bank(publication_status, status);

drop policy if exists question_contexts_read on public.question_contexts;
create policy question_contexts_read on public.question_contexts for select to authenticated using (
  (select public.is_nexo_admin())
  or ((select public.is_nexo_aluno()) and exists (
    select 1 from public.question_bank q
    where q.context_id = question_contexts.id and q.status = 'validated' and q.publication_status = 'published'))
);

-- 4. A mesma questão aplicada em mais de uma prova -------------------------------------------
create table if not exists public.question_occurrences (
  question_id uuid not null references public.question_bank(id) on delete cascade,
  source_id uuid not null references public.exam_sources(id) on delete cascade,
  question_number integer,
  created_at timestamptz not null default now(),
  primary key (question_id, source_id)
);
alter table public.question_occurrences enable row level security;
drop policy if exists question_occurrences_read on public.question_occurrences;
create policy question_occurrences_read on public.question_occurrences for select to authenticated using (
  (select public.is_nexo_admin())
  or ((select public.is_nexo_aluno()) and exists (
    select 1 from public.question_bank q
    where q.id = question_occurrences.question_id and q.status = 'validated' and q.publication_status = 'published'))
);

-- 5. Trabalhos de IA (Gemini gratuito, rotinas do Claude Code e, opcional, Message Batches pagos) --
create table if not exists public.ai_jobs (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('extract', 'classify', 'gemini', 'external')),
  batch_id text unique,
  status text not null default 'submitted' check (status in ('submitted', 'ingested', 'error', 'canceled')),
  items jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  ingested_at timestamptz,
  usage jsonb,
  summary jsonb,
  error text
);
alter table public.ai_jobs enable row level security;
drop policy if exists ai_jobs_admin_read on public.ai_jobs;
create policy ai_jobs_admin_read on public.ai_jobs for select to authenticated using ((select public.is_nexo_admin()));

alter table public.exam_sources
  add column if not exists ai_status text check (ai_status in ('queued', 'submitted', 'needs_claude', 'done', 'error', 'skipped')),
  add column if not exists ai_job_id uuid references public.ai_jobs(id) on delete set null,
  add column if not exists ai_attempts integer not null default 0,
  add column if not exists ai_last_error text,
  add column if not exists ai_summary jsonb;
create index if not exists exam_sources_ai_status_idx on public.exam_sources(ai_status);

-- Resultados entregues pelas rotinas do Claude Code (assinatura, sem custo de API). A rotina só insere aqui;
-- a função nexo-ai valida e grava com as mesmas regras das outras leituras (nada é publicado).
create table if not exists public.ai_external_extractions (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('extract', 'classify')),
  source_id uuid references public.exam_sources(id) on delete cascade,
  method text not null default 'claude_routine_v1',
  model text,
  payload jsonb not null,
  status text not null default 'pending' check (status in ('pending', 'done', 'error')),
  result jsonb,
  created_at timestamptz not null default now(),
  processed_at timestamptz,
  check (kind = 'classify' or source_id is not null)
);
alter table public.ai_external_extractions enable row level security;
drop policy if exists ai_external_admin_read on public.ai_external_extractions;
create policy ai_external_admin_read on public.ai_external_extractions for select to authenticated using ((select public.is_nexo_admin()));

-- O que a rotina de segunda leitura deve fazer: provas na fila, com os números exatos que faltam.
create or replace function public.nexo_rotina_fila_leitura(p_limite integer default 2)
returns table (source_id uuid, board text, year integer, exam_name text, exam_pdf_url text, answer_key_pdf_url text,
               numeros integer[], motivos jsonb, ai_status text)
language sql stable security definer set search_path = public as $$
  select s.id, s.board, s.year, s.exam_name, s.exam_pdf_url, s.answer_key_pdf_url,
    coalesce((select array_agg(x::int) from jsonb_array_elements_text(coalesce(s.ai_summary->'pending_numbers', s.raw_metadata->'extraction'->'pending_numbers')) x), '{}'),
    s.raw_metadata->'extraction'->'pending_reasons', s.ai_status
  from public.exam_sources s
  where s.provider ilike '%OFICIAL%' and s.exam_pdf_url like 'https://%'
    and (s.ai_status = 'needs_claude' or (s.ai_status = 'queued' and s.updated_at < now() - interval '2 days'))
    and not exists (select 1 from public.ai_external_extractions e where e.source_id = s.id and e.status = 'pending')
  order by (s.ai_status = 'needs_claude') desc, s.year desc nulls last
  limit greatest(1, least(p_limite, 10))
$$;
-- Questões validadas ainda sem módulo (nem revisado nem sugerido), para a rotina de classificação.
create or replace function public.nexo_rotina_fila_classificacao(p_limite integer default 200)
returns table (id uuid, board text, year integer, statement text, options jsonb, texto_base text)
language sql stable security definer set search_path = public as $$
  select q.id, q.board, q.year, q.statement, q.options, c.content
  from public.question_bank q left join public.question_contexts c on c.id = q.context_id
  where q.status = 'validated' and q.ai_module_id is null
    and not exists (select 1 from public.question_module_map m where m.question_id = q.id)
  order by q.year desc nulls last, q.id
  limit greatest(1, least(p_limite, 500))
$$;
revoke all on function public.nexo_rotina_fila_leitura(integer) from public, anon, authenticated;
revoke all on function public.nexo_rotina_fila_classificacao(integer) from public, anon, authenticated;

-- 6. Catálogo de módulos = árvore do site (ui/nexo-ui.js, ARVORE; títulos de data/temas) -------
alter table public.subject_catalog add column if not exists description text;
insert into public.subject_catalog (module_id, discipline_key, discipline_name, subject_name, description, active) values
  ('principios_fundamentais', 'constitucional', 'Direito Constitucional', 'Princípios Fundamentais & Teoria Constitucional', 'Teoria e princípios — Arts. 1º a 4º, objetivos fundamentais, fundamentos, relações internacionais e classificação constitucional.', true),
  ('teoria_direitos', 'constitucional', 'Direito Constitucional', 'Teoria Geral dos Direitos Fundamentais', 'Teoria e princípios — Base conceitual: dimensões, características, eficácia, aplicação imediata e tratados de direitos humanos.', true),
  ('art5_parte1', 'constitucional', 'Direito Constitucional', 'Direitos e Garantias Fundamentais — Parte I (Art. 5º, I a XXXI)', 'Direitos e garantias fundamentais — Igualdade, legalidade, liberdade, crença, intimidade, domicílio, sigilo, reunião, associação e propriedade.', true),
  ('art5_parte2', 'constitucional', 'Direito Constitucional', 'Direitos e Garantias Fundamentais — Parte II (Art. 5º, XXXII a LXXIX)', 'Direitos e garantias fundamentais — Garantias processuais, direito penal constitucional, extradição e remédios constitucionais.', true),
  ('direitos_sociais', 'constitucional', 'Direito Constitucional', 'Direitos Sociais', 'Direitos e garantias fundamentais — Arts. 6º a 11: direitos sociais, art. 7º, liberdade sindical, greve e representação.', true),
  ('nacionalidade', 'constitucional', 'Direito Constitucional', 'Nacionalidade', 'Direitos e garantias fundamentais — Arts. 12 e 13: brasileiros natos e naturalizados, cargos privativos e perda da nacionalidade.', true),
  ('direitos_politicos', 'constitucional', 'Direito Constitucional', 'Cidadania e Direitos Políticos', 'Direitos e garantias fundamentais — Arts. 14 a 16: soberania popular, voto, elegibilidade, inelegibilidades e anterioridade eleitoral.', true),
  ('partidos', 'constitucional', 'Direito Constitucional', 'Partidos Políticos', 'Direitos e garantias fundamentais — Art. 17: criação, autonomia, caráter nacional e limites constitucionais dos partidos.', true),
  ('organizacao_estado', 'constitucional', 'Direito Constitucional', 'Organização Político-Administrativa', 'Organização do Estado — Arts. 18 a 36: Federação, entes federados, competências, bens públicos e intervenção.', true),
  ('adm_publica', 'constitucional', 'Direito Constitucional', 'Administração Pública', 'Organização do Estado — Arts. 37 a 43: princípios, cargos e empregos, servidores, militares estaduais, previdência e responsabilidade do Estado.', true),
  ('legislativo', 'constitucional', 'Direito Constitucional', 'Poder Legislativo', 'Organização dos Poderes — Arts. 44 a 75: Congresso Nacional, Câmara, Senado, congressistas, CPIs e TCU.', true),
  ('processo_legislativo', 'constitucional', 'Direito Constitucional', 'Processo Legislativo', 'Organização dos Poderes — Arts. 59 a 69: espécies normativas, iniciativa, votação, sanção, veto e emendas constitucionais.', true),
  ('executivo', 'constitucional', 'Direito Constitucional', 'Poder Executivo', 'Organização dos Poderes — Arts. 76 a 91: Presidente, Vice, Ministros, atribuições, responsabilidade e conselhos.', true),
  ('judiciario', 'constitucional', 'Direito Constitucional', 'Poder Judiciário', 'Organização dos Poderes — Arts. 92 a 126 e art. 100: estrutura, garantias, CNJ, STF, STJ, justiças especializadas e precatórios.', true),
  ('funcoes_essenciais', 'constitucional', 'Direito Constitucional', 'Funções Essenciais à Justiça', 'Organização dos Poderes — Arts. 127 a 135: Ministério Público, Advocacia Pública, Advocacia e Defensoria Pública.', true),
  ('defesa_estado', 'constitucional', 'Direito Constitucional', 'Defesa do Estado e Instituições Democráticas', 'Defesa do Estado e das instituições democráticas — Arts. 136 a 144: estado de defesa, estado de sítio, Forças Armadas e Segurança Pública.', true),
  ('sistema_tributario_orcamento', 'constitucional', 'Direito Constitucional', 'Sistema Tributário & Orçamento', 'Tributação, orçamento e ordem econômica e social — Arts. 145 a 169: sistema tributário, finanças públicas, PPA, LDO e LOA.', true),
  ('ordem_economica_social', 'constitucional', 'Direito Constitucional', 'Ordem Econômica & Social', 'Tributação, orçamento e ordem econômica e social — Arts. 170 a 232: atividade econômica, seguridade social e ordem social.', true),
  ('adm_regime_principios', 'administrativo', 'Direito Administrativo', 'Regime Jurídico-Administrativo & Princípios', 'Regime jurídico e poderes — Supremacia e indisponibilidade do interesse público; princípios expressos e implícitos; autotutela, motivação, razoabilidade e segurança jurídica.', true),
  ('adm_poderes', 'administrativo', 'Direito Administrativo', 'Poderes Administrativos', 'Regime jurídico e poderes — Poder hierárquico, disciplinar, regulamentar/normativo, poder de polícia, vinculado e discricionário; abuso de poder.', true),
  ('adm_organizacao', 'administrativo', 'Direito Administrativo', 'Organização Administrativa', 'Organização administrativa — Centralização, descentralização, concentração, desconcentração; Administração Direta e Indireta; autarquias e órgãos públicos.', true),
  ('adm_estatais_fundacoes', 'administrativo', 'Direito Administrativo', 'Fundações, Empresas Públicas & Sociedades de Economia Mista', 'Organização administrativa — Empresas estatais, fundações públicas, regime jurídico, criação, capital, forma societária e atuação econômica.', true),
  ('adm_atos', 'administrativo', 'Direito Administrativo', 'Atos Administrativos', 'Atos e controle — Conceito, elementos, atributos, classificação, espécies, vícios, mérito, extinção, convalidação e decadência.', true),
  ('adm_controle', 'administrativo', 'Direito Administrativo', 'Controle da Administração Pública', 'Atos e controle — Controle administrativo, legislativo e judicial; controle interno e externo; autotutela e controle finalístico.', true),
  ('adm_agentes', 'administrativo', 'Direito Administrativo', 'Agentes Públicos', 'Agentes, responsabilidade e improbidade — Conceito e espécies, cargo/emprego/função, concurso, acumulação, teto, estabilidade e disposições constitucionais.', true),
  ('adm_responsabilidade_estado', 'administrativo', 'Direito Administrativo', 'Responsabilidade Civil do Estado', 'Agentes, responsabilidade e improbidade — Responsabilidade objetiva, risco administrativo, omissão estatal, excludentes, ação regressiva e agentes públicos.', true),
  ('adm_improbidade', 'administrativo', 'Direito Administrativo', 'Lei de Improbidade Administrativa', 'Agentes, responsabilidade e improbidade — Lei 8.429/1992 após Lei 14.230/2021: dolo, espécies de atos, sanções, ação, indisponibilidade e prescrição.', true),
  ('adm_licitacao_principios', 'administrativo', 'Direito Administrativo', 'Licitação — Princípios, Modalidades & Procedimento', 'Licitações e contratos — Lei 14.133/2021: princípios, objetivos, agentes, modalidades, critérios de julgamento e fases da licitação.', true),
  ('adm_contratacao_direta', 'administrativo', 'Direito Administrativo', 'Licitação — Contratação Direta', 'Licitações e contratos — Dispensa e inexigibilidade, alienações, fases, instrumentos auxiliares e disposições setoriais da Lei 14.133/2021.', true),
  ('adm_contratos', 'administrativo', 'Direito Administrativo', 'Contratos Administrativos', 'Licitações e contratos — Lei 14.133/2021: características, cláusulas exorbitantes, duração, execução, pagamentos, extinção, nulidades, riscos e controle.', true),
  ('ml_introducao', 'medicina_legal', 'Medicina Legal', 'Conceitos, Importância e Divisões', 'Fundamentos e perícia — Medicina Legal aplica conhecimentos médicos e biológicos à investigação e à Justiça.', true),
  ('ml_pericias', 'medicina_legal', 'Medicina Legal', 'Perícias e Peritos', 'Fundamentos e perícia — Exame de corpo de delito, peritos, vestígios e cadeia de custódia.', true),
  ('ml_documentos', 'medicina_legal', 'Medicina Legal', 'Documentos Médico-Legais', 'Fundamentos e perícia — Atestados, laudos, autos, pareceres e notificações.', true),
  ('ml_identificacao', 'medicina_legal', 'Medicina Legal', 'Identidade e Identificação Humana', 'Antropologia forense — Métodos de individualização e identificação pessoal.', true),
  ('ml_traumatologia', 'medicina_legal', 'Medicina Legal', 'Traumatologia Forense: Lesões e Instrumentos', 'Traumatologia forense — Mecanismos de lesões e energias vulnerantes.', true),
  ('ml_lesoes_corporais', 'medicina_legal', 'Medicina Legal', 'Lesões Corporais', 'Traumatologia forense — Classificação jurídica e avaliação médico-legal das lesões.', true),
  ('ml_asfixiologia', 'medicina_legal', 'Medicina Legal', 'Asfixiologia Forense', 'Traumatologia forense — Mecanismos de asfixia e sinais periciais.', true),
  ('ml_tanatologia', 'medicina_legal', 'Medicina Legal', 'Tanatologia: Morte e Fenômenos Cadavéricos', 'Tanatologia forense — Conceitos de morte, fenômenos cadavéricos e estimativa de intervalo pós-morte.', true),
  ('ml_sexologia', 'medicina_legal', 'Medicina Legal', 'Aspectos Médico-Legais dos Crimes Sexuais', 'Sexologia forense — Exame pericial, coleta de vestígios e limites da conclusão.', true),
  ('ml_psicopatologia', 'medicina_legal', 'Medicina Legal', 'Modificadores e Avaliação Pericial', 'Psicopatologia forense — Avaliação pericial de aspectos mentais, capacidade e responsabilidade.', true),
  ('penal_principios', 'penal', 'Direito Penal', 'Princípios e Fundamentos do Direito Penal', 'Parte Geral > Fundamentos e aplicação da lei penal — Legalidade, anterioridade, intervenção mínima, ofensividade e culpabilidade.', true),
  ('penal_aplicacao', 'penal', 'Direito Penal', 'Aplicação da Lei Penal e Infração Penal', 'Parte Geral > Fundamentos e aplicação da lei penal — Tempo e lugar do crime, territorialidade, extraterritorialidade e retroatividade benéfica.', true),
  ('penal_fato_tipico', 'penal', 'Direito Penal', 'Teoria do Delito I — Fato Típico', 'Parte Geral > Teoria do crime — Conduta, resultado, nexo causal, tipicidade e crimes omissivos.', true),
  ('penal_dolo_culpa', 'penal', 'Direito Penal', 'Teoria do Delito I — Dolo e Culpa', 'Parte Geral > Teoria do crime — Dolo direto e eventual; culpa consciente e inconsciente; preterdolo.', true),
  ('penal_ilicitude', 'penal', 'Direito Penal', 'Teoria do Delito II — Ilicitude e Culpabilidade', 'Parte Geral > Teoria do crime — Excludentes de ilicitude, imputabilidade e exigibilidade de conduta diversa.', true),
  ('penal_erros', 'penal', 'Direito Penal', 'Teoria do Delito II — Erro de Tipo e Erro de Proibição', 'Parte Geral > Teoria do crime — Erro sobre elementos do tipo, erro de proibição e consequências penais.', true),
  ('penal_concurso', 'penal', 'Direito Penal', 'Concurso de Pessoas', 'Parte Geral > Teoria do crime — Autoria, participação, concurso necessário, comunicabilidade de circunstâncias.', true),
  ('penal_dosimetria', 'penal', 'Direito Penal', 'Aplicação e Dosimetria da Pena', 'Parte Geral > Pena e punibilidade — Circunstâncias judiciais, atenuantes e agravantes, cálculo trifásico e confissão.', true),
  ('penal_punibilidade', 'penal', 'Direito Penal', 'Extinção da Punibilidade e Prescrição', 'Parte Geral > Pena e punibilidade — Causas extintivas, PPP abstrata, retroativa e intercorrente, PPE, prazos e perdão judicial (CP, arts. 107 a 120).', true),
  ('penal_pessoa', 'penal', 'Direito Penal', 'Crimes Contra a Pessoa', 'Parte Especial > Crimes contra a pessoa — Homicídio, feminicídio, lesões corporais, honra, liberdade individual.', true),
  ('penal_pessoa_01', 'penal', 'Direito Penal', 'Homicídio simples e qualificado', 'Parte Especial > Crimes contra a pessoa — Código Penal, art(s). 121', true),
  ('penal_pessoa_02', 'penal', 'Direito Penal', 'Feminicídio', 'Parte Especial > Crimes contra a pessoa — Código Penal, art(s). 121-A', true),
  ('penal_pessoa_03', 'penal', 'Direito Penal', 'Vicaricídio', 'Parte Especial > Crimes contra a pessoa — Código Penal, art(s). 121-B', true),
  ('penal_pessoa_04', 'penal', 'Direito Penal', 'Induzimento, instigação ou auxílio ao suicídio ou automutilação', 'Parte Especial > Crimes contra a pessoa — Código Penal, art(s). 122', true),
  ('penal_pessoa_05', 'penal', 'Direito Penal', 'Infanticídio', 'Parte Especial > Crimes contra a pessoa — Código Penal, art(s). 123', true),
  ('penal_pessoa_06', 'penal', 'Direito Penal', 'Aborto', 'Parte Especial > Crimes contra a pessoa — Código Penal, art(s). 124–128', true),
  ('penal_pessoa_07', 'penal', 'Direito Penal', 'Lesão corporal', 'Parte Especial > Crimes contra a pessoa — Código Penal, art(s). 129', true),
  ('penal_pessoa_08', 'penal', 'Direito Penal', 'Perigo para a vida e saúde; omissão de socorro; rixa', 'Parte Especial > Crimes contra a pessoa — Código Penal, art(s). 130–137', true),
  ('penal_pessoa_09', 'penal', 'Direito Penal', 'Crimes contra a honra', 'Parte Especial > Crimes contra a pessoa — Código Penal, art(s). 138–145', true),
  ('penal_pessoa_10', 'penal', 'Direito Penal', 'Crimes contra a liberdade individual', 'Parte Especial > Crimes contra a pessoa — Código Penal, art(s). 146–154-B', true),
  ('penal_patrimonio', 'penal', 'Direito Penal', 'Crimes Contra o Patrimônio', 'Parte Especial > Crimes contra o patrimônio — Furto, roubo, extorsão, dano, apropriação indébita, estelionato e receptação.', true),
  ('penal_sexual', 'penal', 'Direito Penal', 'Crimes Contra a Dignidade Sexual', 'Parte Especial > Crimes contra a dignidade sexual — Estupro, importunação sexual, vulnerabilidade, exploração sexual.', true),
  ('penal_incolumidade', 'penal', 'Direito Penal', 'Crimes contra a Incolumidade Pública', 'Parte Especial > Crimes contra a incolumidade pública — Perigo comum, segurança dos transportes e comunicações e saúde pública (CP, arts. 250 a 285).', true),
  ('penal_fe_publica', 'penal', 'Direito Penal', 'Crimes Contra a Fé Pública', 'Parte Especial > Crimes contra a fé pública — Falsificação de documentos, falsidade ideológica, moeda falsa e uso de documento falso.', true),
  ('penal_adm_func', 'penal', 'Direito Penal', 'Crimes Contra Administração I — Funcionário Público', 'Parte Especial > Crimes contra a Administração Pública — Peculato, concussão, corrupção passiva, prevaricação e crimes funcionais.', true),
  ('penal_adm_particular', 'penal', 'Direito Penal', 'Crimes Contra Administração II — Particular', 'Parte Especial > Crimes contra a Administração Pública — Corrupção ativa, desacato, resistência, desobediência e usurpação de função.', true),
  ('penal_adm_justica', 'penal', 'Direito Penal', 'Crimes Contra Administração III — Justiça', 'Parte Especial > Crimes contra a Administração Pública — Denunciação caluniosa, comunicação falsa, falso testemunho e favorecimento.', true),
  ('penal_adm_financas', 'penal', 'Direito Penal', 'Crimes Contra Administração IV — Disposições Complementares', 'Parte Especial > Crimes contra a Administração Pública — Revisão de delitos contra a administração e distinções de tipos especiais.', true)
on conflict (module_id) do update set discipline_key = excluded.discipline_key, discipline_name = excluded.discipline_name,
  subject_name = excluded.subject_name, description = excluded.description, active = true, updated_at = now();

-- 7. Fim da publicação automática por palavras-chave ----------------------------------------
do $$ begin
  if exists (select 1 from cron.job where jobname = 'nexo-question-classifier-15m') then
    perform cron.unschedule('nexo-question-classifier-15m');
  end if;
end $$;

-- 8. Só fontes oficiais: desliga as sementes do site espelho --------------------------------
update public.collector_seed_urls set enabled = false where url ilike '%pciconcursos.com.br%';

-- 9. Funções de administração (revisão e publicação) -----------------------------------------
create or replace function public.nexo_statement_hash(p text)
returns text language sql immutable set search_path = public, extensions as $$
  select encode(extensions.digest(convert_to(btrim(regexp_replace(lower(coalesce(p, '')), '\s+', ' ', 'g')), 'UTF8'), 'sha256'), 'hex')
$$;

create or replace function public.nexo_admin_revisar_questao(
  p_id uuid, p_acao text, p_module_id text default null, p_statement text default null,
  p_options jsonb default null, p_media_urls jsonb default null, p_nota text default null)
returns jsonb language plpgsql security definer set search_path = public as $$
declare q record; v_mod text;
begin
  if not public.is_nexo_admin() then raise exception 'Apenas administradores revisam questões.' using errcode = '42501'; end if;
  select * into q from public.question_bank where id = p_id for update;
  if q is null then raise exception 'Questão não encontrada.'; end if;
  if p_acao not in ('publicar', 'reter', 'guardar', 'editar', 'validar') then raise exception 'Ação inválida.'; end if;
  -- "validar": o administrador conferiu no PDF oficial o gabarito de um item que a IA marcou para revisão.
  if p_acao = 'validar' and q.status <> 'pending_validation' then
    raise exception 'Só itens aguardando conferência podem ser validados (situação atual: %).', q.status;
  end if;
  if p_acao = 'publicar' and q.status <> 'validated' then
    raise exception 'Só questões validadas podem ser publicadas (situação atual: %).', q.status;
  end if;
  if p_options is not null and jsonb_typeof(p_options) <> 'array' then raise exception 'Alternativas inválidas.'; end if;
  if p_options is not null and jsonb_array_length(p_options) <> coalesce(jsonb_array_length(q.options), 0) then
    raise exception 'A quantidade de alternativas não pode mudar (o gabarito é a letra oficial).';
  end if;
  if p_media_urls is not null and jsonb_typeof(p_media_urls) <> 'array' then raise exception 'Lista de imagens inválida.'; end if;
  v_mod := nullif(btrim(coalesce(p_module_id, '')), '');
  if v_mod is not null and v_mod <> '-' and not exists (select 1 from public.subject_catalog where module_id = v_mod) then
    raise exception 'Módulo desconhecido: %', v_mod;
  end if;

  update public.question_bank set
    statement = coalesce(nullif(btrim(p_statement), ''), statement),
    statement_hash = case when nullif(btrim(p_statement), '') is not null then public.nexo_statement_hash(p_statement) else statement_hash end,
    options = coalesce(p_options, options),
    media_urls = coalesce(p_media_urls, media_urls),
    review_notes = coalesce(p_nota, review_notes),
    status = case when p_acao = 'validar' then 'validated' else status end,
    validation_method = case when p_acao = 'validar' then 'official_answer_key_pdf_admin_checked' else validation_method end,
    reviewed_by = auth.uid(), reviewed_at = now(),
    module_id = case when v_mod is not null and v_mod <> '-' then v_mod else module_id end,
    classification_status = case when v_mod is not null then 'classified' else classification_status end,
    classification_method = case when v_mod is not null then 'manual_review' else classification_method end,
    publication_status = case p_acao when 'publicar' then 'published' when 'reter' then 'withheld' when 'guardar' then 'banked' else publication_status end,
    published_at = case when p_acao = 'publicar' then coalesce(published_at, now()) when p_acao in ('reter', 'guardar') then null else published_at end,
    updated_at = now()
  where id = p_id;

  if v_mod = '-' then
    delete from public.question_module_map where question_id = p_id;
  elsif v_mod is not null then
    delete from public.question_module_map where question_id = p_id;
    insert into public.question_module_map (question_id, module_id, reviewed_by, reviewed_at)
    values (p_id, v_mod, auth.uid(), now());
  end if;
  return jsonb_build_object('id', p_id, 'acao', p_acao, 'module_id', v_mod);
end $$;
revoke all on function public.nexo_admin_revisar_questao(uuid, text, text, text, jsonb, jsonb, text) from public, anon;
grant execute on function public.nexo_admin_revisar_questao(uuid, text, text, text, jsonb, jsonb, text) to authenticated;

create or replace function public.nexo_admin_midia_contexto(p_context_id uuid, p_media_urls jsonb)
returns void language plpgsql security definer set search_path = public as $$
begin
  if not public.is_nexo_admin() then raise exception 'Apenas administradores.' using errcode = '42501'; end if;
  if jsonb_typeof(p_media_urls) <> 'array' then raise exception 'Lista de imagens inválida.'; end if;
  update public.question_contexts set media_urls = p_media_urls, updated_at = now() where id = p_context_id;
end $$;
revoke all on function public.nexo_admin_midia_contexto(uuid, jsonb) from public, anon;
grant execute on function public.nexo_admin_midia_contexto(uuid, jsonb) to authenticated;

create or replace function public.nexo_admin_reextrair_fonte(p_source_id uuid)
returns void language plpgsql security definer set search_path = public as $$
begin
  if not public.is_nexo_admin() then raise exception 'Apenas administradores.' using errcode = '42501'; end if;
  update public.exam_sources set ai_status = 'queued', ai_last_error = null, updated_at = now() where id = p_source_id;
end $$;
revoke all on function public.nexo_admin_reextrair_fonte(uuid) from public, anon;
grant execute on function public.nexo_admin_reextrair_fonte(uuid) to authenticated;

create or replace function public.nexo_admin_pipeline_resumo()
returns jsonb language plpgsql stable security definer set search_path = public as $$
begin
  if not public.is_nexo_admin() then raise exception 'Apenas administradores.' using errcode = '42501'; end if;
  return jsonb_build_object(
    'questoes', (select coalesce(jsonb_object_agg(k, n), '{}'::jsonb) from (
      select publication_status || '/' || status k, count(*) n from public.question_bank group by 1) x),
    'fontes_oficiais', (select count(*) from public.exam_sources where provider ilike '%OFICIAL%'),
    'fontes_ia', (select coalesce(jsonb_object_agg(coalesce(ai_status, 'nenhum'), n), '{}'::jsonb) from (
      select ai_status, count(*) n from public.exam_sources where provider ilike '%OFICIAL%' group by 1) x),
    'sugestoes_ia', (select count(*) from public.question_bank where ai_module_id is not null and publication_status <> 'published'),
    'ultimos_trabalhos', (select coalesce(jsonb_agg(to_jsonb(j) order by j.created_at desc), '[]'::jsonb) from (
      select kind, status, created_at, summary, error from public.ai_jobs order by created_at desc limit 8) j)
  );
end $$;
revoke all on function public.nexo_admin_pipeline_resumo() from public, anon;
grant execute on function public.nexo_admin_pipeline_resumo() to authenticated;

-- 10. Imagens das questões (recortes das figuras/tabelas do caderno oficial) ------------------
insert into storage.buckets (id, name, public) values ('nexo-midia', 'nexo-midia', true)
on conflict (id) do nothing;
drop policy if exists "nexo-midia admin escreve" on storage.objects;
create policy "nexo-midia admin escreve" on storage.objects for insert to authenticated
  with check (bucket_id = 'nexo-midia' and (select public.is_nexo_admin()));
drop policy if exists "nexo-midia admin altera" on storage.objects;
create policy "nexo-midia admin altera" on storage.objects for update to authenticated
  using (bucket_id = 'nexo-midia' and (select public.is_nexo_admin()));
drop policy if exists "nexo-midia admin apaga" on storage.objects;
create policy "nexo-midia admin apaga" on storage.objects for delete to authenticated
  using (bucket_id = 'nexo-midia' and (select public.is_nexo_admin()));

-- 11. Reprocessar as fontes oficiais já lidas com o extrator por posição (gratuito) ----------------
-- Registros existentes são preservados; o coletor só acrescenta questões que faltavam, textos-base e
-- figuras, e manda para a segunda leitura (IA) apenas os números que não conseguir resolver.
update public.exam_sources set status = 'queued', next_attempt_at = null, updated_at = now(),
  raw_metadata = coalesce(raw_metadata, '{}'::jsonb) || jsonb_build_object('reprocessar_layout_v28', now())
where provider ilike '%OFICIAL%' and status in ('validated', 'extracted')
  and exam_pdf_url is not null and answer_key_pdf_url is not null;

-- 11b. Marca para o revisor o que veio de site espelho (nada é apagado nem despublicado aqui) ---------
update public.question_bank set review_flags = review_flags || '["gabarito_de_espelho"]'::jsonb
where validation_source_type = 'mirror' and not review_flags ? 'gabarito_de_espelho';
update public.question_bank q set review_flags = q.review_flags || '["caderno_de_espelho"]'::jsonb
from public.exam_sources s
where s.id = q.source_id and s.exam_pdf_url ilike '%qconcursos%' and not q.review_flags ? 'caderno_de_espelho';
-- Textos com rodapé do caderno colado (37 publicadas em 18/10) e com fórmulas ilegíveis: o reprocessamento
-- troca pelo texto limpo quando a leitura nova bate com a antiga; o que sobrar fica marcado para a revisão.
update public.question_bank set review_flags = review_flags || '["rodape_colado"]'::jsonb
where (statement || ' ' || options::text) ~* '((19|20)[0-9]{2} FGV|tipo (branca|amarela|verde|azul|rosa) *[–-] *p[áa]gina [0-9]+|--- PAGE [0-9]+ ---|espa[çc]o livre)'
  and not review_flags ? 'rodape_colado';
update public.question_bank set review_flags = review_flags || '["texto_com_simbolos"]'::jsonb
where (statement || ' ' || options::text) ~ '[᠀-᣿㐀-䶿一-鿿---�]'
  and not review_flags ? 'texto_com_simbolos';

-- 12. Agendamentos ----------------------------------------------------------------------------
do $$ begin
  if exists (select 1 from cron.job where jobname = 'nexo-ai-20m') then perform cron.unschedule('nexo-ai-20m'); end if;
  if exists (select 1 from cron.job where jobname = 'nexo-cebraspe-descoberta-semanal') then
    perform cron.unschedule('nexo-cebraspe-descoberta-semanal');
  end if;
end $$;
select cron.schedule('nexo-ai-20m', '*/20 * * * *', $cron$
  select net.http_post(
    url := 'https://dkpgsvssyszrwmkutcyt.supabase.co/functions/v1/nexo-ai',
    headers := jsonb_build_object('Content-Type', 'application/json',
      'x-nexo-cron', (select decrypted_secret from vault.decrypted_secrets where name = 'nexo_collector_cron_v2' limit 1)),
    body := jsonb_build_object('action', 'tick', 'requested_at', now()),
    timeout_milliseconds := 150000);
$cron$);
select cron.schedule('nexo-cebraspe-descoberta-semanal', '15 4 * * 1', $cron$
  select net.http_post(
    url := 'https://dkpgsvssyszrwmkutcyt.supabase.co/functions/v1/source-resolver',
    headers := jsonb_build_object('Content-Type', 'application/json',
      'x-nexo-cron', (select decrypted_secret from vault.decrypted_secrets where name = 'nexo_collector_cron_v2' limit 1)),
    body := jsonb_build_object('mode', 'discover_cebraspe', 'requested_at', now()),
    timeout_milliseconds := 150000);
$cron$);
