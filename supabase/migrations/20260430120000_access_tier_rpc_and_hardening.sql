-- Backend-backed app access tiers: profiles.global_access_tier + tenant_members.role.
-- RPC: public.my_effective_access_tier(p_tenant_id) — source of truth for UI gating (enforce server-side too).

-- ---------------------------------------------------------------------------
-- profiles: optional operator-granted global tier (pro / platform / super)
-- ---------------------------------------------------------------------------
alter table public.profiles
  add column if not exists global_access_tier text;

alter table public.profiles drop constraint if exists profiles_global_access_tier_check;
alter table public.profiles
  add constraint profiles_global_access_tier_check
  check (
    global_access_tier is null
    or global_access_tier in ('pro', 'platform_admin', 'super_admin')
  );

comment on column public.profiles.global_access_tier is
  'Operator-set: pro, platform_admin, super_admin. Workspace admin comes from tenant_members.role (owner/admin).';

-- ---------------------------------------------------------------------------
-- tenant_members.role: allow explicit admin (owner remains from signup)
-- ---------------------------------------------------------------------------
alter table public.tenant_members drop constraint if exists tenant_members_role_check;
alter table public.tenant_members
  add constraint tenant_members_role_check
  check (role in ('member', 'owner', 'admin'));

-- ---------------------------------------------------------------------------
-- Prevent authenticated users from self-granting global_access_tier
-- Service role JWT or direct DB sessions (postgres / supabase_admin) may set tiers.
-- ---------------------------------------------------------------------------
create or replace function public.profiles_guard_global_access_tier()
returns trigger
language plpgsql
set search_path = public
as $$
declare
  jwt_role text := coalesce(nullif(current_setting('request.jwt.claim.role', true), ''), '');
begin
  if jwt_role = 'service_role' or current_user in ('postgres', 'supabase_admin') then
    return new;
  end if;

  if tg_op = 'INSERT' then
    new.global_access_tier := null;
  elsif tg_op = 'UPDATE' then
    if new.global_access_tier is distinct from old.global_access_tier then
      new.global_access_tier := old.global_access_tier;
    end if;
  end if;
  return new;
end;
$$;

drop trigger if exists profiles_preserve_global_access_tier on public.profiles;
drop trigger if exists profiles_guard_global_access_tier on public.profiles;
create trigger profiles_guard_global_access_tier
  before insert or update on public.profiles
  for each row execute function public.profiles_guard_global_access_tier();

-- ---------------------------------------------------------------------------
-- Effective tier for auth.uid() and optional workspace tenant
-- Precedence: super_admin > platform_admin > workspace_admin > pro > member
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

    if r in ('owner', 'admin') then
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
  'Returns member|pro|workspace_admin|platform_admin|super_admin for auth.uid(); optional tenant scopes workspace admin.';

grant execute on function public.my_effective_access_tier(uuid) to authenticated;

-- ---------------------------------------------------------------------------
-- Harden internal UAT RPC: platform / super only
-- ---------------------------------------------------------------------------
create or replace function public.uat_db_health_check()
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  all_tables_ok boolean := true;
  all_policies_ok boolean := true;
  all_grants_ok boolean := true;
  tables text[] := array[
    'learning_snapshots',
    'learning_lab_runs',
    'signal_cache',
    'opportunity_cache',
    'published_content_performance'
  ];
  required_policies jsonb := jsonb_build_array(
    jsonb_build_object('table', 'learning_snapshots', 'policy', 'learning_snapshots_tenant_isolation'),
    jsonb_build_object('table', 'signal_cache', 'policy', 'signal_cache_tenant_isolation'),
    jsonb_build_object('table', 'opportunity_cache', 'policy', 'opportunity_cache_tenant_isolation')
  );
  t text;
  pol jsonb;
  pol_ok boolean;
  tbl_ok boolean;
  sel_ok boolean;
  ins_ok boolean;
  upd_ok boolean;
  out_tables jsonb := '{}'::jsonb;
  out_policies jsonb := '[]'::jsonb;
  out_grants jsonb := '{}'::jsonb;
  eff text;
begin
  if auth.uid() is null then
    raise exception 'Not authenticated';
  end if;

  eff := public.my_effective_access_tier(null);
  if eff not in ('platform_admin', 'super_admin') then
    raise exception 'Forbidden' using errcode = '42501';
  end if;

  foreach t in array tables
  loop
    tbl_ok := to_regclass(format('public.%I', t)) is not null;
    if not tbl_ok then
      all_tables_ok := false;
    end if;
    out_tables := out_tables || jsonb_build_object(t, tbl_ok);
  end loop;

  for pol in select * from jsonb_array_elements(required_policies)
  loop
    select exists (
      select 1
      from pg_policies
      where schemaname = 'public'
        and tablename = pol->>'table'
        and policyname = pol->>'policy'
    ) into pol_ok;
    if not pol_ok then
      all_policies_ok := false;
    end if;
    out_policies := out_policies || jsonb_build_array(
      jsonb_build_object(
        'table', pol->>'table',
        'policy', pol->>'policy',
        'ok', pol_ok
      )
    );
  end loop;

  foreach t in array tables
  loop
    tbl_ok := to_regclass(format('public.%I', t)) is not null;
    if tbl_ok then
      sel_ok := has_table_privilege('authenticated', format('public.%I', t), 'SELECT');
      ins_ok := has_table_privilege('authenticated', format('public.%I', t), 'INSERT');
      upd_ok := has_table_privilege('authenticated', format('public.%I', t), 'UPDATE');
    else
      sel_ok := false;
      ins_ok := false;
      upd_ok := false;
    end if;
    if not (sel_ok and ins_ok and upd_ok) then
      all_grants_ok := false;
    end if;
    out_grants := out_grants || jsonb_build_object(
      t,
      jsonb_build_object(
        'select', sel_ok,
        'insert', ins_ok,
        'update', upd_ok
      )
    );
  end loop;

  return jsonb_build_object(
    'ok', all_tables_ok and all_policies_ok and all_grants_ok,
    'tables', out_tables,
    'policies', out_policies,
    'grants', out_grants
  );
end;
$$;

grant execute on function public.uat_db_health_check() to authenticated;
