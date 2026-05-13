-- Hardening: operations health snapshot, canonical operator checks, super-only system account listing.
-- is_admin() remains strictly (platform_admin | super_admin) via my_effective_access_tier — never all users.

-- ---------------------------------------------------------------------------
-- Internal: resolve effective tier for an arbitrary user id (not exposed to PostgREST clients).
-- Mirrors public.my_effective_access_tier logic with uid := p_uid (no auth.uid dependency).
-- ---------------------------------------------------------------------------
create or replace function public._admin_internal_resolve_tier_for_uid(p_uid uuid)
returns text
language plpgsql
stable
security definer
set search_path = public, auth
as $$
declare
  uid uuid := p_uid;
  v_email text;
  g text;
  profile_tid uuid;
  tid uuid;
  r text;
  sub_ok boolean := false;
begin
  if uid is null then
    return 'member';
  end if;

  select lower(trim(u.email::text)) into v_email
  from auth.users u
  where u.id = uid;

  if v_email is null then
    return 'member';
  end if;

  if v_email = 'neuralbuildlab.ai@gmail.com' then
    return 'super_admin';
  end if;

  if v_email = 'neuralbuild.ai@gmail.com' then
    return 'platform_admin';
  end if;

  select p.global_access_tier, p.default_tenant_id
  into g, profile_tid
  from public.profiles p
  where p.id = uid;

  if g = 'platform_admin' then
    return 'platform_admin';
  end if;

  tid := profile_tid;

  if tid is not null then
    select tm.role
    into r
    from public.tenant_members tm
    where tm.user_id = uid and tm.tenant_id = tid;

    if r in ('owner', 'admin') then
      return 'workspace_admin';
    end if;
  end if;

  select exists (
    select 1
    from public.stripe_subscription_entitlements e
    where e.user_id = uid
      and e.status in ('active', 'trialing')
      and (e.current_period_end is null or e.current_period_end > now())
  )
  into sub_ok;

  if sub_ok then
    return 'pro';
  end if;

  if g = 'pro' then
    return 'pro';
  end if;

  return 'member';
end;
$$;

comment on function public._admin_internal_resolve_tier_for_uid(uuid) is
  'Internal tier resolution for admin RPCs; not granted to anon/authenticated directly.';

-- ---------------------------------------------------------------------------
-- RPC: compact operations snapshot (platform + super admins)
-- ---------------------------------------------------------------------------
create or replace function public.admin_get_operations_health_snapshot()
returns jsonb
language plpgsql
stable
security definer
set search_path = public, auth
as $$
declare
  v_size bigint;
  v_pretty text;
  v_users bigint;
  v_profiles bigint;
  v_self bigint;
  v_flag bigint;
  v_assign bigint;
  v_certs bigint;
  v_support bigint;
  v_support_new bigint;
  v_audit bigint;
  v_dup bigint;
  v_users_no_profile bigint;
  v_profiles_no_user bigint;
  v_self_rls boolean;
  v_flag_rls boolean;
  v_recent timestamptz;
  v_super_id uuid;
  v_plat_id uuid;
  v_super_tier text;
  v_plat_tier text;
begin
  if auth.uid() is null or not public.is_admin() then
    raise exception 'Forbidden' using errcode = '42501';
  end if;

  select pg_database_size(current_database()) into v_size;
  v_pretty := pg_size_pretty(v_size);

  select count(*) into v_users from auth.users;
  select count(*) into v_profiles from public.profiles;
  select count(*) into v_self from public.learner_self_paced_progress;
  select count(*) into v_flag from public.flagship_course_progress;
  select count(*) into v_assign from public.learner_course_assignments;
  select count(*) into v_certs from public.learner_certificates;
  select count(*) into v_support from public.support_submissions;
  select count(*) into v_support_new from public.support_submissions where status = 'new';
  select count(*) into v_audit from public.admin_audit_log;

  select count(*) into v_dup
  from (
    select 1
    from public.learner_self_paced_progress
    group by user_id, course_slug
    having count(*) > 1
  ) d;

  select count(*) into v_users_no_profile
  from auth.users u
  where not exists (select 1 from public.profiles p where p.id = u.id);

  select count(*) into v_profiles_no_user
  from public.profiles p
  where not exists (select 1 from auth.users u where u.id = p.id);

  select coalesce(c.relrowsecurity, false) into v_self_rls
  from pg_class c join pg_namespace n on n.oid = c.relnamespace
  where n.nspname = 'public' and c.relname = 'learner_self_paced_progress' and c.relkind = 'r';

  select coalesce(c.relrowsecurity, false) into v_flag_rls
  from pg_class c join pg_namespace n on n.oid = c.relnamespace
  where n.nspname = 'public' and c.relname = 'flagship_course_progress' and c.relkind = 'r';

  select max(updated_at) into v_recent from public.learner_self_paced_progress;

  select u.id into v_super_id from auth.users u where lower(trim(u.email::text)) = 'neuralbuildlab.ai@gmail.com' limit 1;
  select u.id into v_plat_id from auth.users u where lower(trim(u.email::text)) = 'neuralbuild.ai@gmail.com' limit 1;

  if v_super_id is not null then
    v_super_tier := public._admin_internal_resolve_tier_for_uid(v_super_id);
  else
    v_super_tier := 'missing_user';
  end if;

  if v_plat_id is not null then
    v_plat_tier := public._admin_internal_resolve_tier_for_uid(v_plat_id);
  else
    v_plat_tier := 'missing_user';
  end if;

  return jsonb_build_object(
    'checked_at', now(),
    'database', jsonb_build_object(
      'connection_status', 'ok',
      'database_size_bytes', v_size,
      'database_size_pretty', v_pretty,
      'auth_users_count', v_users,
      'profiles_count', v_profiles,
      'learner_self_paced_progress_count', v_self,
      'flagship_course_progress_count', v_flag,
      'learner_course_assignments_count', v_assign,
      'learner_certificates_count', v_certs,
      'support_submissions_total', v_support,
      'support_submissions_new_count', v_support_new,
      'admin_audit_log_count', v_audit,
      'duplicate_self_paced_user_course_groups', v_dup,
      'users_without_profile_rows', v_users_no_profile,
      'profiles_without_auth_user_rows', v_profiles_no_user,
      'rls_learner_self_paced_progress', coalesce(v_self_rls, false),
      'rls_flagship_course_progress', coalesce(v_flag_rls, false)
    ),
    'progress', jsonb_build_object(
      'recent_self_paced_write_max_at', v_recent,
      'orphaned_progress_detection', 'unavailable',
      'orphaned_progress_remediation', 'Orphan detection requires a canonical course slug registry in SQL; review in Studio or future RPC.'
    ),
    'canonical_operators', jsonb_build_object(
      'super_admin_email', 'neuralbuildlab.ai@gmail.com',
      'super_admin_user_found', v_super_id is not null,
      'super_admin_resolved_tier', v_super_tier,
      'platform_admin_email', 'neuralbuild.ai@gmail.com',
      'platform_admin_user_found', v_plat_id is not null,
      'platform_admin_resolved_tier', v_plat_tier
    )
  );
end;
$$;

grant execute on function public.admin_get_operations_health_snapshot() to authenticated;

comment on function public.admin_get_operations_health_snapshot() is
  'Aggregated DB/progress/auth-operator health for /admin dashboard & health UI; requires is_admin().';

-- ---------------------------------------------------------------------------
-- RPC: super-admin role & canonical account health
-- ---------------------------------------------------------------------------
create or replace function public.admin_get_admin_role_health()
returns jsonb
language plpgsql
stable
security definer
set search_path = public, auth
as $$
declare
  v_super_id uuid;
  v_plat_id uuid;
  v_super_tier text;
  v_plat_tier text;
  v_super_count int;
  v_warn jsonb := '[]'::jsonb;
begin
  if auth.uid() is null or not public.is_super_admin() then
    raise exception 'Forbidden' using errcode = '42501';
  end if;

  select count(*) into v_super_count
  from auth.users u
  where public._admin_internal_resolve_tier_for_uid(u.id) = 'super_admin';

  select u.id into v_super_id from auth.users u where lower(trim(u.email::text)) = 'neuralbuildlab.ai@gmail.com' limit 1;
  select u.id into v_plat_id from auth.users u where lower(trim(u.email::text)) = 'neuralbuild.ai@gmail.com' limit 1;

  if v_super_id is null then
    v_warn := v_warn || jsonb_build_array(
      jsonb_build_object(
        'severity', 'critical',
        'code', 'EXPECTED_SUPER_MISSING',
        'message', 'Expected super admin user neuralbuildlab.ai@gmail.com is missing from auth.users.'
      )
    );
  else
    v_super_tier := public._admin_internal_resolve_tier_for_uid(v_super_id);
    if v_super_tier <> 'super_admin' then
      v_warn := v_warn || jsonb_build_array(
        jsonb_build_object(
          'severity', 'critical',
          'code', 'EXPECTED_SUPER_TIER_MISMATCH',
          'message', format('Super admin email exists but resolves to %s instead of super_admin.', v_super_tier)
        )
      );
    end if;
  end if;

  if v_plat_id is null then
    v_warn := v_warn || jsonb_build_array(
      jsonb_build_object(
        'severity', 'warning',
        'code', 'EXPECTED_PLATFORM_MISSING',
        'message', 'Expected platform admin user neuralbuild.ai@gmail.com is missing from auth.users.'
      )
    );
  else
    v_plat_tier := public._admin_internal_resolve_tier_for_uid(v_plat_id);
    if v_plat_tier <> 'platform_admin' then
      v_warn := v_warn || jsonb_build_array(
        jsonb_build_object(
          'severity', 'warning',
          'code', 'EXPECTED_PLATFORM_TIER_MISMATCH',
          'message', format('Platform admin email exists but resolves to %s instead of platform_admin.', v_plat_tier)
        )
      );
    end if;
  end if;

  if v_super_count > 1 then
    v_warn := v_warn || jsonb_build_array(
      jsonb_build_object(
        'severity', 'warning',
        'code', 'MULTIPLE_SUPER_ADMINS',
        'message', format('%s accounts resolve to super_admin — verify intent.', v_super_count)
      )
    );
  end if;

  return jsonb_build_object(
    'checked_at', now(),
    'super_admin_accounts_resolved', v_super_count,
    'warnings', coalesce(v_warn, '[]'::jsonb)
  );
end;
$$;

grant execute on function public.admin_get_admin_role_health() to authenticated;

-- ---------------------------------------------------------------------------
-- RPC: list system accounts (super admin only)
-- ---------------------------------------------------------------------------
create or replace function public.admin_list_system_accounts(
  p_limit int default 100,
  p_offset int default 0,
  p_search text default null
)
returns jsonb
language plpgsql
stable
security definer
set search_path = public, auth
as $$
declare
  v_search text := nullif(trim(coalesce(p_search, '')), '');
begin
  if auth.uid() is null or not public.is_super_admin() then
    raise exception 'Forbidden' using errcode = '42501';
  end if;

  if p_limit is null or p_limit < 1 or p_limit > 500 then
    p_limit := 100;
  end if;
  if p_offset is null or p_offset < 0 then
    p_offset := 0;
  end if;

  return coalesce(
    (
      select jsonb_agg(to_jsonb(s) order by s.created_at desc nulls last)
      from (
        select
          u.id as user_id,
          coalesce(nullif(trim(u.raw_user_meta_data->>'full_name'), ''), nullif(trim(u.raw_user_meta_data->>'name'), '')) as display_name,
          u.email,
          public._admin_internal_resolve_tier_for_uid(u.id) as effective_access_tier,
          p.global_access_tier as profile_global_access_tier,
          (public._admin_internal_resolve_tier_for_uid(u.id) = 'super_admin') as is_super_admin,
          (public._admin_internal_resolve_tier_for_uid(u.id) = 'platform_admin') as is_platform_admin,
          (public._admin_internal_resolve_tier_for_uid(u.id) in ('platform_admin', 'super_admin')) as is_admin,
          (p.id is not null) as profile_exists,
          true as auth_user_exists,
          (u.email_confirmed_at is not null) as email_confirmed,
          u.created_at,
          u.last_sign_in_at,
          (
            select max(x.ts)
            from (
              select l.updated_at as ts from public.learner_self_paced_progress l where l.user_id = u.id
              union all
              select f.updated_at from public.flagship_course_progress f where f.user_id = u.id
            ) x
          ) as last_activity_at,
          case
            when p.id is null then array['missing_profile']::text[]
            when public._admin_internal_resolve_tier_for_uid(u.id) = 'super_admin' and lower(trim(u.email::text)) <> 'neuralbuildlab.ai@gmail.com' then array['unexpected_super']::text[]
            else array[]::text[]
          end as warnings
        from auth.users u
        left join public.profiles p on p.id = u.id
        where v_search is null
          or lower(u.email) like ('%' || lower(v_search) || '%')
          or lower(coalesce(u.raw_user_meta_data->>'full_name', u.raw_user_meta_data->>'name', '')) like ('%' || lower(v_search) || '%')
        order by u.created_at desc nulls last
        limit p_limit offset p_offset
      ) s
    ),
    '[]'::jsonb
  );
end;
$$;

grant execute on function public.admin_list_system_accounts(int, int, text) to authenticated;

comment on function public.admin_list_system_accounts(int, int, text) is
  'Safe account summaries for super admins only; no password hashes or tokens.';
