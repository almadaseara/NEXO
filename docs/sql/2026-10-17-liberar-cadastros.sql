-- Painel ADM → Cadastros (ui/nexo-cadastros.js): o administrador lista as contas e libera ou
-- bloqueia o acesso sem abrir o Supabase.
-- A tabela profiles continua só com "cada um lê o próprio perfil"; o acesso do administrador
-- passa por estas duas funções, que conferem public.is_nexo_admin() antes de qualquer coisa.

create or replace function public.nexo_admin_listar_cadastros()
returns table (id uuid, email text, full_name text, active boolean, can_student boolean,
               can_admin boolean, created_at timestamptz, updated_at timestamptz)
language plpgsql
stable
security definer
set search_path = public
as $$
begin
  if not public.is_nexo_admin() then
    raise exception 'Apenas administradores podem ver os cadastros.' using errcode = '42501';
  end if;
  return query
    select p.id, p.email, p.full_name, p.active, p.can_student, p.can_admin, p.created_at, p.updated_at
    from public.profiles p
    order by p.active asc, p.created_at desc;
end;
$$;

-- Liberar (p_ativo = true) também garante can_student, para a conta entrar como aluno.
-- Bloquear (p_ativo = false) só desliga active; o administrador não pode bloquear a si mesmo.
create or replace function public.nexo_admin_definir_acesso(p_id uuid, p_ativo boolean)
returns void
language plpgsql
volatile
security definer
set search_path = public
as $$
begin
  if not public.is_nexo_admin() then
    raise exception 'Apenas administradores podem liberar cadastros.' using errcode = '42501';
  end if;
  if p_id = auth.uid() and not p_ativo then
    raise exception 'Você não pode bloquear a sua própria conta.' using errcode = '42501';
  end if;
  update public.profiles
     set active = p_ativo,
         can_student = case when p_ativo then true else can_student end,
         updated_at = now()
   where id = p_id;
  if not found then
    raise exception 'Cadastro não encontrado.' using errcode = 'P0002';
  end if;
end;
$$;

revoke all on function public.nexo_admin_listar_cadastros() from public, anon;
revoke all on function public.nexo_admin_definir_acesso(uuid, boolean) from public, anon;
grant execute on function public.nexo_admin_listar_cadastros() to authenticated;
grant execute on function public.nexo_admin_definir_acesso(uuid, boolean) to authenticated;
