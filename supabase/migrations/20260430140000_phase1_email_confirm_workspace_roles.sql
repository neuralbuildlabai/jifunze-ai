-- Phase 1: Email confirmation before workspace bootstrap; workspace role naming (MVP model).
-- - New signups: profile row only (no tenant until first confirmed session + bootstrap_my_workspace).
-- - Migrate legacy tenant_members roles: owner/member/admin -> individual_user/team_member/team_admin.

-- ---------------------------------------------------------------------------
-- tenant_members.role: drop legacy check first, migrate data, then add new check
-- (Updating to new role labels would violate the old owner/member/admin constraint.)
-- ---------------------------------------------------------------------------
alter table public.tenant_members drop constraint if exists tenant_members_role_check;

update public.tenant_members set role = 'individual_user' where role = 'owner';
update public.tenant_members set role = 'team_member' where role = 'member';
update public.tenant_members set role = 'team_admin' where role = 'admin';

alter table public.tenant_members
  add constraint tenant_members_role_check
  check (role in ('individual_user', 'team_member', 'team_admin'));

comment on column public.tenant_members.role is
  'Workspace role: individual_user (personal workspace), team_member, team_admin. Platform super_admin uses profiles.global_access_tier.';

-- ---------------------------------------------------------------------------
-- Signup trigger: profile only — workspace is created on first confirmed login via bootstrap_my_workspace
-- ---------------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, default_tenant_id)
  values (new.id, null)
  on conflict (id) do nothing;
  return new;
end;
$$;

comment on function public.handle_new_user() is
  'Creates profiles row for new auth.users; workspace/tenant is provisioned after email confirmation via bootstrap_my_workspace.';

-- ---------------------------------------------------------------------------
-- bootstrap_my_workspace: use individual_user for personal workspace creator
-- ---------------------------------------------------------------------------
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
  values (tid, uid, 'individual_user')
  on conflict (tenant_id, user_id) do nothing;
  insert into public.profiles (id, default_tenant_id)
  values (uid, tid)
  on conflict (id) do update
    set default_tenant_id = coalesce(public.profiles.default_tenant_id, excluded.default_tenant_id);

  return tid;
end;
$$;

comment on function public.bootstrap_my_workspace(text) is
  'Ensures auth.uid() has a tenant: returns existing default_tenant_id, repairs profile from membership, or creates workspace + profile row. New workspaces use role individual_user.';

grant execute on function public.bootstrap_my_workspace(text) to authenticated;

-- ---------------------------------------------------------------------------
-- Effective access tier: workspace admin from individual_user or team_admin
-- ---------------------------------------------------------------------------
create or replace function public.my_effective_access_tier(p_tenant_id uuid default null)
returns text
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  uid uuid := auth.uid();
  g text;
  profile_tid uuid;
  tid uuid;
  r text;
begin
  if uid is null then
    return 'member';
  end if;

  select p.global_access_tier, p.default_tenant_id
  into g, profile_tid
  from public.profiles p
  where p.id = uid;

  if g = 'super_admin' then
    return 'super_admin';
  end if;
  if g = 'platform_admin' then
    return 'platform_admin';
  end if;

  tid := coalesce(p_tenant_id, profile_tid);

  if tid is not null then
    select tm.role
    into r
    from public.tenant_members tm
    where tm.user_id = uid and tm.tenant_id = tid;

    if r in ('individual_user', 'team_admin') then
      return 'workspace_admin';
    end if;
  end if;

  if g = 'pro' then
    return 'pro';
  end if;

  return 'member';
end;
$$;

comment on function public.my_effective_access_tier(uuid) is
  'Returns member|pro|workspace_admin|platform_admin|super_admin for auth.uid(); workspace admin from individual_user or team_admin.';

grant execute on function public.my_effective_access_tier(uuid) to authenticated;
