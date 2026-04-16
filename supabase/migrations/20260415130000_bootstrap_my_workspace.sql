-- Idempotent workspace bootstrap for the current auth user (client calls after login / signup).

create or replace function public.bootstrap_my_workspace()
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  uid uuid := auth.uid();
  tid uuid;
begin
  if uid is null then
    raise exception 'Not authenticated';
  end if;

  select p.default_tenant_id
  into tid
  from public.profiles p
  where p.id = uid;

  if tid is not null and exists (
    select 1
    from public.tenant_members m
    where m.user_id = uid and m.tenant_id = tid
  ) then
    return tid;
  end if;

  select tm.tenant_id
  into tid
  from public.tenant_members tm
  where tm.user_id = uid
  order by tm.tenant_id
  limit 1;

  if tid is not null then
    insert into public.profiles (id, default_tenant_id)
    values (uid, tid)
    on conflict (id) do update
      set default_tenant_id = coalesce(public.profiles.default_tenant_id, excluded.default_tenant_id);
    return tid;
  end if;

  insert into public.tenants (name) values ('My workspace') returning id into tid;
  insert into public.tenant_members (tenant_id, user_id, role)
  values (tid, uid, 'owner')
  on conflict (tenant_id, user_id) do nothing;
  insert into public.profiles (id, default_tenant_id)
  values (uid, tid)
  on conflict (id) do update
    set default_tenant_id = coalesce(public.profiles.default_tenant_id, excluded.default_tenant_id);

  return tid;
end;
$$;

comment on function public.bootstrap_my_workspace() is
  'Ensures auth.uid() has a tenant: returns existing default_tenant_id, repairs profile from membership, or creates workspace + profile row.';

-- Idempotent grant (safe when role already has EXECUTE).
grant execute on function public.bootstrap_my_workspace() to authenticated;
