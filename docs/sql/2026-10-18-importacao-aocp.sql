-- Importação assistida de provas do Instituto AOCP (Administração → Importar prova AOCP).
-- O site da AOCP só entrega os cadernos de questões a navegadores (proteção contra robôs), então o
-- administrador baixa o caderno pelo navegador e envia aqui; o gabarito oficial vem do link público da
-- AOCP (arquivos-site.institutoaocp.org.br) ou também é enviado. A edge function aocp-import lê os PDFs,
-- monta as questões e grava em question_bank como validadas e retidas (banked), com o gabarito oficial
-- como fonte. O coletor e o resolvedor do robô não são alterados e ignoram estas fontes (status
-- 'processing', depois 'validated', 'extracted' ou 'rejected').

-- ---------- PDFs enviados (privados, só administrador) ----------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('nexo-provas', 'nexo-provas', false, 52428800, array['application/pdf'])
on conflict (id) do update set public = false, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists nexo_provas_admin_read on storage.objects;
drop policy if exists nexo_provas_admin_insert on storage.objects;
drop policy if exists nexo_provas_admin_delete on storage.objects;
create policy nexo_provas_admin_read on storage.objects
  for select to authenticated using (bucket_id = 'nexo-provas' and (select public.is_nexo_admin()));
create policy nexo_provas_admin_insert on storage.objects
  for insert to authenticated with check (bucket_id = 'nexo-provas' and (select public.is_nexo_admin()));
create policy nexo_provas_admin_delete on storage.objects
  for delete to authenticated using (bucket_id = 'nexo-provas' and (select public.is_nexo_admin()));

-- ---------- registrar uma importação ----------
create or replace function public.nexo_admin_registrar_importacao(
  p_caderno_path text, p_gabarito text, p_ano integer, p_orgao text, p_cargo text,
  p_tipo text default null, p_concurso_url text default null)
returns uuid
language plpgsql
volatile
security definer
set search_path = public
as $$
declare
  v_id uuid;
  v_pagina text;
begin
  if not public.is_nexo_admin() then
    raise exception 'Apenas administradores podem importar provas.' using errcode = '42501';
  end if;
  if p_caderno_path is null or p_caderno_path !~ '^[A-Za-z0-9/_.-]+\.pdf$' then
    raise exception 'Caderno inválido: envie o PDF do caderno de questões.';
  end if;
  if p_gabarito is null or not (
       p_gabarito ~ '^https://arquivos-site\.institutoaocp\.org\.br/[^\s]+\.pdf$'
    or p_gabarito ~ '^storage:nexo-provas/[A-Za-z0-9/_.-]+\.pdf$') then
    raise exception 'Gabarito inválido: cole o link do PDF do gabarito no site da AOCP (arquivos-site.institutoaocp.org.br) ou envie o PDF.';
  end if;
  if p_ano is null or p_ano < 2018 or p_ano > extract(year from now())::int + 1 then
    raise exception 'Ano fora da janela do NEXO (2018 em diante).';
  end if;
  if coalesce(trim(p_cargo), '') = '' or coalesce(trim(p_orgao), '') = '' then
    raise exception 'Informe o órgão e o cargo, como aparecem no gabarito.';
  end if;
  if p_concurso_url is not null and p_concurso_url !~ '^https://(www\.|link\.)?institutoaocp\.org\.br/' then
    raise exception 'O link do concurso deve ser do site da AOCP.';
  end if;
  v_id := gen_random_uuid();
  v_pagina := coalesce(nullif(trim(p_concurso_url), ''), 'https://www.institutoaocp.org.br/');
  insert into public.exam_sources (id, source_page_url, provider, career, board, year, institution, role_name,
    exam_name, booklet_type, exam_pdf_url, answer_key_pdf_url, status, raw_metadata)
  values (v_id, v_pagina || '#nexo-importacao-' || v_id, 'AOCP OFICIAL (importação)', null, 'AOCP', p_ano,
    trim(p_orgao), trim(p_cargo), trim(p_cargo) || coalesce(' — ' || nullif(trim(p_tipo), ''), ''),
    nullif(trim(p_tipo), ''), 'storage:nexo-provas/' || p_caderno_path, p_gabarito, 'processing',
    jsonb_build_object('importado', true, 'aocp_answer_label', trim(p_cargo) || coalesce(' ' || nullif(trim(p_tipo), ''), ''),
      'concurso_url', nullif(trim(p_concurso_url), ''), 'importado_por', auth.uid(), 'importado_em', now()));
  return v_id;
end;
$$;

-- ---------- acompanhar as importações ----------
create or replace function public.nexo_admin_importacoes()
returns table (id uuid, orgao text, cargo text, tipo text, ano integer, status text, erro text,
               importado_em timestamptz, questoes integer, anuladas integer, detalhes jsonb)
language plpgsql
stable
security definer
set search_path = public
as $$
begin
  if not public.is_nexo_admin() then
    raise exception 'Apenas administradores podem ver as importações.' using errcode = '42501';
  end if;
  return query
    select s.id, s.institution, s.role_name, s.booklet_type, s.year, s.status, s.last_error,
           (s.raw_metadata->>'importado_em')::timestamptz,
           (select count(*)::int from public.question_bank q where q.source_id = s.id and q.status = 'validated'),
           (select count(*)::int from public.question_bank q where q.source_id = s.id and q.status = 'annulled'),
           s.raw_metadata->'resultado'
    from public.exam_sources s
    where s.raw_metadata->>'importado' = 'true'
    order by (s.raw_metadata->>'importado_em')::timestamptz desc nulls last
    limit 100;
end;
$$;

revoke all on function public.nexo_admin_registrar_importacao(text, text, integer, text, text, text, text) from public, anon;
revoke all on function public.nexo_admin_importacoes() from public, anon;
grant execute on function public.nexo_admin_registrar_importacao(text, text, integer, text, text, text, text) to authenticated;
grant execute on function public.nexo_admin_importacoes() to authenticated;
