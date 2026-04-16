-- tenants.owner_user_id is required for new workspaces; bootstrap + signup must set it.

alter table public.tenants
  add column if not exists owner_user_id uuid references auth.users (id) on delete restrict;

-- Prefer an owner member; otherwise any member.
update public.tenants t
set owner_user_id = coalesce(
  (
    select tm.user_id
    from public.tenant_members tm
    where tm.tenant_id = t.id and tm.role = 'owner'
    order by tm.user_id
    limit 1
  ),
  (
    select tm.user_id
    from public.tenant_members tm
    where tm.tenant_id = t.id
    order by tm.user_id
    limit 1
  )
)
where t.owner_user_id is null;

-- Enforce NOT NULL only when every row has an owner (safe for greenfield + typical data).
do $$
begin
  if not exists (select 1 from public.tenants where owner_user_id is null) then
    alter table public.tenants alter column owner_user_id set not null;
  end if;
end $$;

-- Signup path: create tenant with owner_user_id = new user.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  t_id uuid;
begin
  insert into public.tenants (name, owner_user_id)
  values ('My workspace', new.id)
  returning id into t_id;
  insert into public.tenant_members (tenant_id, user_id, role) values (t_id, new.id, 'owner');
  insert into public.profiles (id, default_tenant_id) values (new.id, t_id);
  return new;
end;
$$;

-- Client bootstrap path: new tenant row must include owner_user_id = auth.uid().
create or replace function public.bootstrap_my_workspace(workspace_name text)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  uid uuid := auth.uid();
  tid uuid;
  new_name text := coalesce(nullif(trim(workspace_name), ''), 'My workspace');
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

  insert into public.tenants (name, owner_user_id)
  values (new_name, uid)
  returning id into tid;
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

comment on function public.bootstrap_my_workspace(text) is
  'Ensures auth.uid() has a tenant: returns existing default_tenant_id, repairs profile from membership, or creates workspace + profile row. Sets tenants.owner_user_id on create.';

grant execute on function public.bootstrap_my_workspace(text) to authenticated;
