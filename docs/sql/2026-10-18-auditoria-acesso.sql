-- Correções da auditoria de 17/10/2026 (relatório "Auditoria NEXO Revisão").
-- N-01 + R-01: conta que ainda aguarda liberação (active = false) lia todo o banco de questões, as
--              tabelas do robô e os mapas mentais, porque as regras só exigiam estar logado. Agora:
--              aluno liberado lê só questões validadas e publicadas; administrador lê tudo.
-- N-03: anon e authenticated tinham INSERT/UPDATE/DELETE/TRUNCATE em quase todas as tabelas
--       (o RLS barrava as escritas, mas o TRUNCATE ignora RLS). Ficam só as permissões que as telas usam.
-- N-10: mapas mentais conferiam can_admin sem conferir active; 4 chaves estrangeiras sem índice.
-- Q-03: classificação de questões por módulo do NEXO revisada pelo administrador, numa tabela própria
--       (question_module_map), sem alterar question_bank. Começa com os 145 IDs de data/banco-classificacao.json.
-- O robô usa service_role (ignora RLS e estas permissões) e não é afetado.

-- ---------- quem é aluno liberado ----------
create or replace function public.is_nexo_aluno()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists(
    select 1 from public.profiles
    where id = auth.uid() and active = true and (can_student = true or can_admin = true)
  );
$$;
revoke all on function public.is_nexo_aluno() from public, anon;
grant execute on function public.is_nexo_aluno() to authenticated, service_role;

-- ---------- banco de questões ----------
drop policy if exists question_bank_read_active on public.question_bank;
create policy question_bank_read on public.question_bank
  for select to authenticated
  using (
    (status = 'validated' and publication_status = 'published' and (select public.is_nexo_aluno()))
    or (select public.is_nexo_admin())
  );

-- ---------- tabelas do robô e catálogos: só administrador (o robô usa service_role) ----------
do $$
declare t text;
begin
  foreach t in array array['collector_control','collector_providers','source_resolution_queue',
                           'source_resolution_candidates','discipline_catalog','subject_catalog',
                           'trusted_mirror_sources','official_event_registry'] loop
    execute format('drop policy if exists %I on public.%I', t || '_read', t);
    execute format('drop policy if exists %I on public.%I', t || '_admin_read', t);
    execute format('create policy %I on public.%I for select to authenticated using ((select public.is_nexo_admin()))', t || '_admin_read', t);
  end loop;
end $$;

-- ---------- mapas mentais ----------
drop policy if exists mindmap_read on public.mind_map_assets;
drop policy if exists mindmap_admin_insert on public.mind_map_assets;
drop policy if exists mindmap_admin_delete on public.mind_map_assets;
create policy mindmap_read on public.mind_map_assets
  for select to authenticated using ((select public.is_nexo_aluno()) or (select public.is_nexo_admin()));
create policy mindmap_admin_insert on public.mind_map_assets
  for insert to authenticated with check ((select public.is_nexo_admin()));
create policy mindmap_admin_delete on public.mind_map_assets
  for delete to authenticated using ((select public.is_nexo_admin()));

drop policy if exists nexo_mindmaps_read on storage.objects;
drop policy if exists nexo_mindmaps_upload on storage.objects;
drop policy if exists nexo_mindmaps_delete on storage.objects;
create policy nexo_mindmaps_read on storage.objects
  for select to authenticated
  using (bucket_id = 'nexo-mindmaps' and ((select public.is_nexo_aluno()) or (select public.is_nexo_admin())));
create policy nexo_mindmaps_upload on storage.objects
  for insert to authenticated
  with check (bucket_id = 'nexo-mindmaps' and (select public.is_nexo_admin()));
create policy nexo_mindmaps_delete on storage.objects
  for delete to authenticated
  using (bucket_id = 'nexo-mindmaps' and (select public.is_nexo_admin()));

-- ---------- Q-03: classificação revisada por módulo ----------
create table if not exists public.question_module_map (
  question_id uuid primary key references public.question_bank(id) on delete cascade,
  module_id text not null check (char_length(module_id) between 1 and 120),
  reviewed_by uuid default auth.uid() references auth.users(id) on delete set null,
  reviewed_at timestamptz not null default now()
);
create index if not exists question_module_map_module_idx on public.question_module_map(module_id);
create index if not exists question_module_map_reviewed_by_idx on public.question_module_map(reviewed_by);
alter table public.question_module_map enable row level security;

drop policy if exists "aluno le a classificacao" on public.question_module_map;
drop policy if exists "admin classifica" on public.question_module_map;
create policy "aluno le a classificacao" on public.question_module_map
  for select to authenticated using ((select public.is_nexo_aluno()) or (select public.is_nexo_admin()));
create policy "admin classifica" on public.question_module_map
  for all to authenticated
  using ((select public.is_nexo_admin())) with check ((select public.is_nexo_admin()));

-- ---------- N-03: só as permissões que as telas usam ----------
do $$
declare t text;
begin
  for t in select c.relname from pg_class c join pg_namespace n on n.oid = c.relnamespace
           where n.nspname = 'public' and c.relkind in ('r','v','m') loop
    execute format('revoke all on public.%I from anon', t);
    execute format('revoke insert, update, delete, truncate, references, trigger on public.%I from authenticated', t);
  end loop;
end $$;
grant select on public.profiles, public.question_bank, public.published_question_bank, public.valid_question_bank,
  public.collector_control, public.collector_providers, public.collector_runs, public.collector_seed_urls,
  public.source_resolution_queue, public.source_resolution_candidates, public.discipline_catalog,
  public.subject_catalog, public.trusted_mirror_sources, public.official_event_registry,
  public.exam_sources, public.exam_documents, public.mind_map_assets, public.question_reports,
  public.study_plans, public.study_highlights, public.question_module_map to authenticated;
grant insert, update, delete on public.study_plans, public.study_highlights to authenticated;
grant insert, update on public.question_reports to authenticated;
grant insert, delete on public.mind_map_assets to authenticated;
grant insert, update, delete on public.question_module_map to authenticated;
-- review_flashcards: tabela sem uso pelo site e sem regras; fica sem acesso para anon/authenticated.

-- ---------- N-10: índices das chaves estrangeiras ----------
create index if not exists mind_map_assets_module_id_idx on public.mind_map_assets(module_id);
create index if not exists source_resolution_candidates_provider_key_idx on public.source_resolution_candidates(provider_key);
create index if not exists source_resolution_queue_resolved_provider_key_idx on public.source_resolution_queue(resolved_provider_key);
create index if not exists subject_catalog_discipline_key_idx on public.subject_catalog(discipline_key);

-- ---------- Q-03: carga inicial (classificação manual de 14/10/2026, data/banco-classificacao.json) ----------
insert into public.question_module_map (question_id, module_id)
select v.question_id::uuid, v.module_id from (values
  ('3081f6ec-21d8-4be7-bd03-9d6fde88456a','adm_agentes'),
  ('419bf8cc-d9e0-4a3b-b414-0653015a42ae','adm_agentes'),
  ('49472ace-4eae-4017-82ed-3499b4585abb','adm_agentes'),
  ('633ed29d-4755-40df-90d4-10fabd34820c','adm_agentes'),
  ('1b1b1c26-d190-48ef-9a5b-f61f70e54ec7','adm_atos'),
  ('38428d62-4c07-4a52-829e-25b9c47b1f7b','adm_atos'),
  ('58440149-4f16-46c1-b782-9f347a71cc28','adm_atos'),
  ('622377c3-cff2-42b4-bbc2-cbf6aff4863d','adm_atos'),
  ('697c03f2-fcd8-49fe-9052-4e2097b1a9b2','adm_atos'),
  ('7ee3b205-a8c5-4a71-bb79-a9b344338a9e','adm_atos'),
  ('b8a9ad93-476c-4bf9-9acb-5d450d234b1f','adm_atos'),
  ('d6eb0e1f-36d1-4b39-8bb8-f34a09047abd','adm_atos'),
  ('ff80a8df-1287-4242-9a16-87d33e62ef58','adm_atos'),
  ('05634c9e-f874-45d3-b2be-a77427c54998','adm_contratacao_direta'),
  ('0a011df6-7190-4282-8773-235fd001fc9b','adm_contratacao_direta'),
  ('6fe37f19-4f4e-4f17-a122-b696fa9e1d9a','adm_contratacao_direta'),
  ('bebb6752-ecd3-4c03-bb17-ab86812d5f81','adm_contratacao_direta'),
  ('d69c7a7d-2edd-4be2-b8a1-632fc2b0c39d','adm_contratacao_direta'),
  ('e426e1a1-85a4-4712-bb75-37e00c239f33','adm_contratacao_direta'),
  ('eb2b008c-27aa-47df-b9b8-e44fd96a8dc2','adm_contratacao_direta'),
  ('8fa758cd-39eb-4c5a-9363-619b9b4a939e','adm_contratos'),
  ('d567075f-cfc6-4cf3-9e11-38c4183f8e70','adm_contratos'),
  ('e7abde61-eebe-46a4-ad72-5097b6515558','adm_controle'),
  ('6142eccc-a0c3-4349-927f-ca8c85083350','adm_estatais_fundacoes'),
  ('7c84fb4d-7da4-4668-8c29-447eca4ae324','adm_estatais_fundacoes'),
  ('130a2ab7-37a7-4d2b-beee-980a48e4c387','adm_improbidade'),
  ('2b0a159e-bd34-4c73-a98c-317695e2edeb','adm_improbidade'),
  ('318be1fe-5ffb-4845-bd79-4a3e9885cf92','adm_improbidade'),
  ('3457b1b7-26d5-4fd7-b4d4-5c22b879c57e','adm_improbidade'),
  ('52a80800-5cb0-4512-9ad7-0315d87f241c','adm_improbidade'),
  ('89bc4abd-a167-4546-8e99-ad428b8e55ca','adm_improbidade'),
  ('9e238a30-426e-45e6-8085-1dc481bb6f25','adm_improbidade'),
  ('a76d5360-7976-4de0-89e5-a33da2c97a5a','adm_improbidade'),
  ('abb8289e-e0a5-4834-937b-8fec6f800972','adm_improbidade'),
  ('da369dbb-816e-43d5-a6b4-8d697b1a1d7d','adm_improbidade'),
  ('09f71fc9-7890-4833-b5e0-65d538572fa0','adm_licitacao_principios'),
  ('0a5f522b-758f-4cb9-ab3d-48587f7a60c4','adm_licitacao_principios'),
  ('2d4b7753-e00f-4158-bf5d-3c835b62402c','adm_licitacao_principios'),
  ('43605754-823a-4957-b494-59061881ff9a','adm_licitacao_principios'),
  ('56cb710d-9c9a-420a-b9b9-f804726e9982','adm_licitacao_principios'),
  ('709ac128-b4b8-4d4d-a7c7-3fe30d7bcfc3','adm_licitacao_principios'),
  ('8f8f8ab9-dfa2-483e-8a39-ee6918d84d2f','adm_licitacao_principios'),
  ('924facb0-ba1a-484c-ab64-604ee8f300c2','adm_licitacao_principios'),
  ('c4c51e1b-b6fc-4542-bd26-2f00452dad89','adm_licitacao_principios'),
  ('fbfce053-9b74-41ec-a910-ecef5548420b','adm_licitacao_principios'),
  ('097a1ad6-f1a4-42c1-a2c0-4fd16c46f843','adm_organizacao'),
  ('54c89c53-0129-477d-9ea5-bb1ee9002636','adm_organizacao'),
  ('8c6dabee-ad9f-484e-9862-d31bc59039d4','adm_organizacao'),
  ('91932c31-4d29-4d98-8277-f031d6cb1387','adm_organizacao'),
  ('ee7482dd-63e5-4912-a559-02cfa014bc8c','adm_organizacao'),
  ('02bfb81c-97ba-4b75-aa6a-e516c59b202b','adm_poderes'),
  ('a602bcc2-fe31-438d-9e63-8daefa713f71','adm_poderes'),
  ('a64455bc-24ab-4487-9b00-f9d6a24c7f8e','adm_poderes'),
  ('e4e7bc7d-18c7-44fb-a8eb-80faf876908a','adm_poderes'),
  ('fe4348e3-9d59-4f71-a92d-be8ac9ae4bdb','adm_poderes'),
  ('2bacb80b-22cb-435a-9df2-bbf8a987c8b4','adm_publica'),
  ('64ae20ad-f0ce-43c2-96d6-972b2b803e61','adm_publica'),
  ('a3f1d992-e9da-452b-a8aa-a6f83b11c0b4','adm_publica'),
  ('b420b61c-45ba-4b72-bc78-8bcecec63f6d','adm_publica'),
  ('7e98687f-1ddd-4365-bd5e-075e8acb598d','adm_regime_principios'),
  ('87b5a9c9-6e9f-4cf7-949a-cdf26ed0148e','adm_regime_principios'),
  ('8d98c368-24cb-4fe2-9c97-e625482ddcd2','adm_regime_principios'),
  ('90260dff-7954-40c8-82e8-9b876be67a60','adm_regime_principios'),
  ('b83b3853-0ab8-4754-a699-5accde76ef0f','adm_regime_principios'),
  ('dd065981-7e55-4fbe-9802-4be8dd62e816','adm_regime_principios'),
  ('9444e702-691e-4a06-a012-d0406fa12e9f','adm_responsabilidade_estado'),
  ('964abcd3-7fd1-4c6d-b755-c8741d411c26','adm_responsabilidade_estado'),
  ('acfafc97-ac56-4c2b-8f0d-1f28962ce922','adm_responsabilidade_estado'),
  ('b6dc0994-8f3d-4f91-ba5b-3f90119d48ef','adm_responsabilidade_estado'),
  ('d90fd315-be6d-4e0e-af04-a66edadb6996','adm_responsabilidade_estado'),
  ('200e5bb5-4f6d-4213-b357-147ffca65e93','art5_parte1'),
  ('dcd57a02-c45a-4ced-88a1-da5c6103c69b','art5_parte1'),
  ('2e124578-fa63-44dd-987a-5e54faa496fd','art5_parte2'),
  ('8bb6d5c5-a093-46b6-b789-8ab189340857','art5_parte2'),
  ('9628dd57-a45d-40ce-bb2b-3de70cafc1eb','art5_parte2'),
  ('c59303e3-5aac-4a27-bcb7-ac67b4a96218','art5_parte2'),
  ('d38fa122-3722-41f6-9a3f-99e8aa7018bf','art5_parte2'),
  ('d8f7341e-71a8-473c-b6a8-a1833eb2e187','art5_parte2'),
  ('19e8fac5-8a60-4f22-882b-27543a822b57','defesa_estado'),
  ('2624ed49-023e-4ed0-ab33-732280097f12','defesa_estado'),
  ('41741c92-fcb1-41c3-875f-15a665a0ea1b','defesa_estado'),
  ('7cb15d22-683a-46d6-ae04-f5c17358bf4f','defesa_estado'),
  ('adb281b0-efd7-4fbf-8055-16f6dc9c7f33','defesa_estado'),
  ('b1609a01-ad56-41bb-be86-b30655935a3e','defesa_estado'),
  ('b38a593a-1cf5-4d8e-9467-9df1962ce3b5','defesa_estado'),
  ('b983cac4-8a70-4c3f-96e8-65aac2495442','defesa_estado'),
  ('d52560a2-968e-4d11-82e6-3c718e74d53f','defesa_estado'),
  ('27fce8a1-a317-4637-99ea-4602222e2e93','direitos_politicos'),
  ('fecde014-5b47-48a4-b6ed-b13c06359f32','direitos_politicos'),
  ('5b699747-0ad4-489d-951b-8a2a0a0584c6','executivo'),
  ('a84ca08d-15b4-46c3-9de5-b0e15f5ff16c','executivo'),
  ('e79bcb98-c580-4f00-8078-8c0c34f8d790','executivo'),
  ('1aa7c7d8-9e5e-458d-9053-34747f15985c','funcoes_essenciais'),
  ('68d50c07-660e-46ac-89b2-bfc7ca696dec','funcoes_essenciais'),
  ('7652b27f-e4db-4c71-9139-2b6baaeb8c96','judiciario'),
  ('d8075eda-c374-41ae-b8d3-ad68bb047932','judiciario'),
  ('835ff1e7-a3f0-491c-a689-7ba681c987f1','legislativo'),
  ('9ec98c79-5c4c-4003-ae60-0423047f7058','legislativo'),
  ('92418631-ff0e-41e4-8f51-1518fa779a21','ml_lesoes_corporais'),
  ('e2e9015d-8f62-4035-af2d-fdd2942be31d','nacionalidade'),
  ('13fde0fb-0f17-4ee7-a4ab-e69bc0a1cf58','ordem_economica_social'),
  ('29c1a69b-6b2f-4fcf-9f2a-040c3b3700d3','ordem_economica_social'),
  ('a8d923ea-ee43-40e0-8a0e-ac534c6c059b','ordem_economica_social'),
  ('b2848368-129f-4545-8cb5-3bede6f47f33','ordem_economica_social'),
  ('b5ff23a3-9fce-40c5-80ec-56f77c0b7f64','ordem_economica_social'),
  ('1bfcb5cf-eea0-45c2-9664-fbf9abc85008','organizacao_estado'),
  ('dd7caa72-35b4-4ce9-94ff-9664879db779','organizacao_estado'),
  ('e869ec4e-6b89-48ae-8593-52cb8bfaa9a8','organizacao_estado'),
  ('a72d44ab-e72c-4459-9d3e-7bdc7884085c','partidos'),
  ('38a64d20-1ccb-431e-ae57-8ce87b3c830c','penal_adm_financas'),
  ('483d543b-4154-43b9-ab39-259b4dfa0708','penal_adm_func'),
  ('7949ca09-ed2e-4869-9fb0-a1f5728a9440','penal_adm_justica'),
  ('41763a72-cde7-46a3-9634-daf6d260020c','penal_adm_particular'),
  ('ce7ec2aa-a654-46a9-b503-8babfdfe2d70','penal_adm_particular'),
  ('9cf55edb-e5e7-40e0-8cc3-1cd29c6e9109','penal_fe_publica'),
  ('0c425787-8474-409f-af5c-11b765cc01f5','penal_patrimonio'),
  ('1210047a-29c5-4e68-a574-96899ed4e486','penal_patrimonio'),
  ('3adc5246-4c91-4eb6-820f-147117d96373','penal_patrimonio'),
  ('3e08a4e7-d851-41be-81dc-5e5e73d23522','penal_patrimonio'),
  ('4f06407f-3ea5-4a0a-813d-48242508e3e8','penal_patrimonio'),
  ('983ee20a-d8e7-497f-9ff2-7a5d4ebf83a1','penal_patrimonio'),
  ('9ae5f1ce-3508-4b1f-b2e9-fb37d98fb1b5','penal_patrimonio'),
  ('a688f823-7956-4a07-86ae-f44fcf738838','penal_patrimonio'),
  ('b3cb0045-378b-403e-95a0-775bab4ebb09','penal_patrimonio'),
  ('ef07f7d2-e958-4166-ad10-8a37a9ee998a','penal_patrimonio'),
  ('84877e41-9f8d-4b17-8ccc-714ac0f8652a','penal_pessoa_07'),
  ('d8f08e04-ffda-4b31-8ea9-0383462ca96c','penal_pessoa_10'),
  ('22ae3b3f-65ed-44c9-bc5f-ddc62206bbb6','penal_principios'),
  ('0ef29ccc-0ae9-4f69-b615-5dd02ebded80','principios_fundamentais'),
  ('1b3540e6-4bec-4785-acb6-68adf599196f','principios_fundamentais'),
  ('33a696d7-204d-42d9-aee8-7ca6683ea43d','principios_fundamentais'),
  ('c3041d8f-7f72-4ace-8da5-810395c74893','principios_fundamentais'),
  ('1a959de0-8096-475a-bf70-0effd9ac2a03','processo_legislativo'),
  ('8f3b8009-4e74-43c5-8cf7-c5e5c8a7113f','processo_legislativo'),
  ('b7dd60a8-ada9-4619-9595-65d738f40f8a','processo_legislativo'),
  ('0d362559-6a08-401b-801f-fd7f58c59938','sistema_tributario_orcamento'),
  ('bb9d98dd-5ad7-4ead-a177-22fa56bb5936','sistema_tributario_orcamento'),
  ('c31f6c63-e447-4725-9aea-1cb05635a561','sistema_tributario_orcamento'),
  ('f26426e6-8c7b-40f7-881a-2a4c3dd663a8','sistema_tributario_orcamento'),
  ('3709a857-6a06-4076-b34b-d6b2ac80c674','teoria_direitos'),
  ('525d64a3-24ad-4f72-95d3-ebde0c6f9d36','teoria_direitos'),
  ('7f1718e8-c0ff-454c-9bc5-4f156d4a8889','teoria_direitos'),
  ('95569c89-1564-46ab-9d70-0b757acf46d9','teoria_direitos'),
  ('d2d9c628-b054-4196-b81d-3235eca53e2b','teoria_direitos'),
  ('de703edf-6ded-42c6-9f47-e1f853275387','teoria_direitos')
) as v(question_id, module_id)
where exists (select 1 from public.question_bank q where q.id = v.question_id::uuid)
on conflict (question_id) do nothing;
