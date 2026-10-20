-- Acervo Digital Pessoal: sincronização entre aparelhos (aplicada em 19/10/2026).
-- Tabela e bucket NOVOS; nada existente é alterado. Cliente: acervo/js/sync.js.
create sequence if not exists public.acervo_revision_seq;

create table if not exists public.acervo_records (
  user_id uuid not null references auth.users(id) on delete cascade,
  store text not null check (store in ('folders','notebooks','pages','assets','decks','cards','elements','templates')),
  id text not null check (char_length(id) between 1 and 100),
  data jsonb,
  deleted boolean not null default false,
  revision bigint not null,
  device_id text,
  updated_at timestamptz not null default now(),
  primary key (user_id, store, id)
);
create index if not exists acervo_records_user_revision on public.acervo_records (user_id, revision);

alter table public.acervo_records enable row level security;
create policy "aluno lê o próprio acervo" on public.acervo_records for select to authenticated using ((select auth.uid()) = user_id);
revoke insert, update, delete on public.acervo_records from anon, authenticated;
revoke all on public.acervo_records from anon;
revoke all on sequence public.acervo_revision_seq from anon, authenticated;

-- Única porta de escrita: fixa o dono (auth.uid()), exige perfil ativo, atribui a revisão e
-- devolve 'conflict' quando o servidor tem versão mais nova de OUTRO aparelho (base < revisão).
create or replace function public.acervo_push(p_device text, p_rows jsonb)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_uid uuid := auth.uid();
  v_row jsonb;
  v_cur public.acervo_records%rowtype;
  v_rev bigint;
  v_out jsonb := '[]'::jsonb;
  v_store text; v_id text; v_base bigint; v_del boolean;
begin
  if v_uid is null then raise exception 'login necessário'; end if;
  if not exists (select 1 from public.profiles p where p.id = v_uid and p.active is true) then
    raise exception 'conta não liberada';
  end if;
  if jsonb_typeof(p_rows) <> 'array' or jsonb_array_length(p_rows) > 200 then raise exception 'lote inválido'; end if;
  for v_row in select * from jsonb_array_elements(p_rows) loop
    v_store := v_row->>'store'; v_id := v_row->>'id';
    v_base := coalesce((v_row->>'base')::bigint, 0);
    v_del := coalesce((v_row->>'deleted')::boolean, false);
    if v_store is null or v_id is null then raise exception 'registro sem identificação'; end if;
    if not v_del and pg_column_size(v_row->'data') > 8000000 then raise exception 'registro grande demais: %', v_id; end if;
    select * into v_cur from public.acervo_records r where r.user_id = v_uid and r.store = v_store and r.id = v_id for update;
    if found and v_cur.revision > v_base and v_cur.device_id is distinct from p_device then
      v_out := v_out || jsonb_build_object('store', v_store, 'id', v_id, 'status', 'conflict',
        'revision', v_cur.revision, 'deleted', v_cur.deleted, 'data', v_cur.data);
      continue;
    end if;
    v_rev := nextval('public.acervo_revision_seq');
    insert into public.acervo_records as r (user_id, store, id, data, deleted, revision, device_id, updated_at)
    values (v_uid, v_store, v_id, case when v_del then null else v_row->'data' end, v_del, v_rev, p_device, now())
    on conflict (user_id, store, id) do update
      set data = excluded.data, deleted = excluded.deleted, revision = excluded.revision,
          device_id = excluded.device_id, updated_at = excluded.updated_at;
    v_out := v_out || jsonb_build_object('store', v_store, 'id', v_id, 'status', 'ok', 'revision', v_rev);
  end loop;
  return v_out;
end;
$$;
revoke all on function public.acervo_push(text, jsonb) from public, anon;
grant execute on function public.acervo_push(text, jsonb) to authenticated;

-- Arquivos (PDFs, imagens, áudios): pasta privada <uid>/<id do arquivo>, até 50 MB cada.
insert into storage.buckets (id, name, public, file_size_limit)
values ('acervo', 'acervo', false, 52428800)
on conflict (id) do nothing;
create policy "aluno lê os próprios arquivos do acervo" on storage.objects for select to authenticated
  using (bucket_id = 'acervo' and (storage.foldername(name))[1] = (select auth.uid())::text);
create policy "aluno envia os próprios arquivos do acervo" on storage.objects for insert to authenticated
  with check (bucket_id = 'acervo' and (storage.foldername(name))[1] = (select auth.uid())::text);
create policy "aluno substitui os próprios arquivos do acervo" on storage.objects for update to authenticated
  using (bucket_id = 'acervo' and (storage.foldername(name))[1] = (select auth.uid())::text);
create policy "aluno apaga os próprios arquivos do acervo" on storage.objects for delete to authenticated
  using (bucket_id = 'acervo' and (storage.foldername(name))[1] = (select auth.uid())::text);
