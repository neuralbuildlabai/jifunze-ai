-- Admin-only diagnostic RPCs: storage summary, schema/RPC presence, progress integrity signals, certificate stats.
-- No secrets, signed URLs, or private object paths in outputs.

-- ---------------------------------------------------------------------------
-- Storage: bucket metadata + estimated object counts (may be slow on huge buckets).
-- ---------------------------------------------------------------------------
create or replace function public.admin_get_storage_health_summary()
returns jsonb
language plpgsql
stable
security definer
set search_path = public, storage
as $$
declare
  v_buckets jsonb := '[]'::jsonb;
  v_warn text[] := array[]::text[];
  v_public_buckets int := 0;
begin
  if auth.uid() is null or not public.is_admin() then
    raise exception 'Forbidden' using errcode = '42501';
  end if;

  begin
    select coalesce(
      jsonb_agg(
        jsonb_build_object(
          'name', b.name,
          'public', coalesce(b.public, false),
          'file_count_estimate', coalesce(oc.cnt, 0)
        )
        order by b.name
      ),
      '[]'::jsonb
    )
    into v_buckets
    from storage.buckets b
    left join (
      select bucket_id, count(*)::bigint as cnt
      from storage.objects
      group by bucket_id
    ) oc on oc.bucket_id = b.id;
  exception when others then
    v_buckets := '[]'::jsonb;
    v_warn := array_append(v_warn, 'storage_schema_unavailable: ' || sqlerrm);
  end;

  select count(*) into v_public_buckets
  from storage.buckets b
  where coalesce(b.public, false) = true;

  if v_public_buckets > 0 then
    v_warn := array_append(
      v_warn,
      format('%s public bucket(s) — review visibility for course assets vs learner-only assets.', v_public_buckets)
    );
  end if;

  if exists (
    select 1 from storage.buckets b
    where lower(b.name) like '%course%asset%' or lower(b.name) = 'course-assets'
  ) then
    v_warn := array_append(v_warn, 'Course-asset style bucket detected — confirm RLS/policies match product policy.');
  end if;

  return jsonb_build_object(
    'checked_at', now(),
    'buckets', coalesce(v_buckets, '[]'::jsonb),
    'warnings', to_jsonb(v_warn)
  );
end;
$$;

grant execute on function public.admin_get_storage_health_summary() to authenticated;

comment on function public.admin_get_storage_health_summary() is
  'Admin-only bucket list with public flag and object count estimates; no URLs or paths.';

-- ---------------------------------------------------------------------------
-- Schema: required tables, RLS, and key admin RPCs registered in public.
-- ---------------------------------------------------------------------------
create or replace function public.admin_get_schema_health()
returns jsonb
language plpgsql
stable
security definer
set search_path = public, pg_catalog
as $$
declare
  v_tables text[] := array[
    'learner_self_paced_progress',
    'flagship_course_progress',
    'learner_certificates',
    'support_submissions',
    'learner_course_assignments',
    'admin_audit_log',
    'profiles'
  ];
  v_funcs text[] := array[
    'admin_get_operations_health_snapshot',
    'admin_get_storage_health_summary',
    'admin_get_schema_health',
    'admin_get_progress_integrity_health',
    'admin_get_certificate_health_stats',
    'admin_append_audit_log',
    'admin_get_platform_metrics'
  ];
  v_table_checks jsonb := '[]'::jsonb;
  v_func_checks jsonb := '[]'::jsonb;
  t text;
  f text;
  v_exists boolean;
  v_rls boolean;
begin
  if auth.uid() is null or not public.is_admin() then
    raise exception 'Forbidden' using errcode = '42501';
  end if;

  foreach t in array v_tables
  loop
    select exists (
      select 1
      from information_schema.tables
      where table_schema = 'public' and table_name = t and table_type = 'BASE TABLE'
    )
    into v_exists;

    v_rls := null;
    if v_exists then
      select coalesce(c.relrowsecurity, false)
      into v_rls
      from pg_class c
      join pg_namespace n on n.oid = c.relnamespace
      where n.nspname = 'public' and c.relname = t and c.relkind = 'r';
    end if;

    v_table_checks := v_table_checks || jsonb_build_array(
      jsonb_build_object(
        'name', t,
        'exists', v_exists,
        'rls_enabled', coalesce(v_rls, false)
      )
    );
  end loop;

  foreach f in array v_funcs
  loop
    select exists (
      select 1
      from pg_proc p
      join pg_namespace n on n.oid = p.pronamespace
      where n.nspname = 'public' and p.proname = f
    )
    into v_exists;

    v_func_checks := v_func_checks || jsonb_build_array(
      jsonb_build_object('name', f, 'exists', v_exists)
    );
  end loop;

  return jsonb_build_object(
    'checked_at', now(),
    'required_tables', v_table_checks,
    'required_functions', v_func_checks
  );
end;
$$;

grant execute on function public.admin_get_schema_health() to authenticated;

comment on function public.admin_get_schema_health() is
  'Admin-only presence checks for core tables, RLS flags, and admin RPC names.';

-- ---------------------------------------------------------------------------
-- Progress integrity (DB-side; orphan slug detection completed in app inventory).
-- ---------------------------------------------------------------------------
create or replace function public.admin_get_progress_integrity_health()
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_dup int := 0;
  v_missing_resume int := 0;
  v_stale_slugs int := 0;
  v_slug_stats jsonb;
begin
  if auth.uid() is null or not public.is_admin() then
    raise exception 'Forbidden' using errcode = '42501';
  end if;

  select count(*) into v_dup
  from (
    select 1
    from public.learner_self_paced_progress
    group by user_id, course_slug
    having count(*) > 1
  ) d;

  select count(*) into v_missing_resume
  from public.learner_self_paced_progress l
  where l.status in ('in_progress', 'enrolled')
    and coalesce(l.progress_percentage, 0) > 0
    and coalesce(nullif(trim(l.current_module_slug), ''), null) is null
    and coalesce(nullif(trim(l.current_session_slug), ''), null) is null
    and coalesce(nullif(trim(l.current_day_slug), ''), null) is null;

  select count(*) into v_stale_slugs
  from (
    select course_slug
    from public.learner_self_paced_progress
    group by course_slug
    having max(updated_at) < (now() - interval '90 days')
  ) s;

  select coalesce(
    jsonb_agg(
      jsonb_build_object(
        'course_slug', x.course_slug,
        'row_count', x.cnt,
        'max_updated_at', x.mx
      )
      order by x.cnt desc
    ),
    '[]'::jsonb
  )
  into v_slug_stats
  from (
    select course_slug, count(*)::bigint as cnt, max(updated_at) as mx
    from public.learner_self_paced_progress
    group by course_slug
  ) x;

  return jsonb_build_object(
    'checked_at', now(),
    'duplicate_user_course_groups', v_dup,
    'active_progress_missing_resume_pointers', v_missing_resume,
    'course_slugs_stale_90d', v_stale_slugs,
    'self_paced_slug_stats', coalesce(v_slug_stats, '[]'::jsonb)
  );
end;
$$;

grant execute on function public.admin_get_progress_integrity_health() to authenticated;

comment on function public.admin_get_progress_integrity_health() is
  'Admin-only progress integrity aggregates; pair slug_stats with app course inventory for orphan detection.';

-- ---------------------------------------------------------------------------
-- Certificate table diagnostics
-- ---------------------------------------------------------------------------
create or replace function public.admin_get_certificate_health_stats()
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_total bigint := 0;
  v_missing_code bigint := 0;
  v_missing_url bigint := 0;
  v_expired bigint := 0;
  v_issued bigint := 0;
begin
  if auth.uid() is null or not public.is_admin() then
    raise exception 'Forbidden' using errcode = '42501';
  end if;

  select count(*) into v_total from public.learner_certificates;

  select
    count(*) filter (where status = 'issued'),
    count(*) filter (
      where status = 'issued'
        and (certificate_code is null or trim(certificate_code) = '')
    ),
    count(*) filter (
      where status = 'issued'
        and (verification_url is null or trim(verification_url) = '')
    ),
    count(*) filter (where status = 'issued' and expires_at is not null and expires_at < now())
  into v_issued, v_missing_code, v_missing_url, v_expired
  from public.learner_certificates;

  return jsonb_build_object(
    'checked_at', now(),
    'total_rows', v_total,
    'issued_rows', v_issued,
    'issued_missing_certificate_code', v_missing_code,
    'issued_missing_verification_url', v_missing_url,
    'issued_expired', v_expired
  );
end;
$$;

grant execute on function public.admin_get_certificate_health_stats() to authenticated;

comment on function public.admin_get_certificate_health_stats() is
  'Admin-only certificate row quality metrics; no learner PII beyond counts.';
