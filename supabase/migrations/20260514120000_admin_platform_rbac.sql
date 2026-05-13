-- Super / platform admin platform: RBAC helpers, operational tables, RLS, and safe admin RPCs.
-- Uses existing public.my_effective_access_tier (canonical emails + profiles.global_access_tier).

-- ---------------------------------------------------------------------------
-- Role helpers (SECURITY DEFINER: same trust boundary as my_effective_access_tier)
-- ---------------------------------------------------------------------------
create or replace function public.get_current_user_role()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select public.my_effective_access_tier(null);
$$;

comment on function public.get_current_user_role() is
  'Effective platform role for auth.uid(): member|pro|workspace_admin|platform_admin|super_admin.';

create or replace function public.is_super_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.my_effective_access_tier(null) = 'super_admin'::text;
$$;

create or replace function public.is_platform_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.my_effective_access_tier(null) = 'platform_admin'::text;
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.my_effective_access_tier(null) in ('platform_admin'::text, 'super_admin'::text);
$$;

comment on function public.is_admin() is
  'True for platform_admin or super_admin only; never true for ordinary learners.';

grant execute on function public.get_current_user_role() to authenticated;
grant execute on function public.is_super_admin() to authenticated;
grant execute on function public.is_platform_admin() to authenticated;
grant execute on function public.is_admin() to authenticated;

-- ---------------------------------------------------------------------------
-- Admin audit log
-- ---------------------------------------------------------------------------
create table if not exists public.admin_audit_log (
  id uuid primary key default gen_random_uuid(),
  admin_user_id uuid references auth.users (id) on delete set null,
  action text not null,
  entity_type text,
  entity_id text,
  summary text,
  before_data jsonb,
  after_data jsonb,
  created_at timestamptz not null default now()
);

create index if not exists admin_audit_log_created_idx on public.admin_audit_log (created_at desc);
create index if not exists admin_audit_log_admin_idx on public.admin_audit_log (admin_user_id, created_at desc);

alter table public.admin_audit_log enable row level security;

drop policy if exists admin_audit_log_select_admins on public.admin_audit_log;
create policy admin_audit_log_select_admins
  on public.admin_audit_log for select to authenticated
  using (public.is_admin());

drop policy if exists admin_audit_log_insert_self on public.admin_audit_log;
create policy admin_audit_log_insert_self
  on public.admin_audit_log for insert to authenticated
  with check (public.is_admin() and admin_user_id = auth.uid());

grant select, insert on table public.admin_audit_log to authenticated;

comment on table public.admin_audit_log is 'Operator actions (roles, progress, assignments, support). Readable by admins only.';

-- ---------------------------------------------------------------------------
-- Learner course assignments
-- ---------------------------------------------------------------------------
create table if not exists public.learner_course_assignments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  course_slug text not null,
  assigned_by uuid references auth.users (id) on delete set null,
  assigned_at timestamptz not null default now(),
  status text not null default 'active',
  source text not null default 'assigned',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint learner_course_assignments_status_check
    check (status in ('active', 'revoked', 'completed', 'inactive')),
  constraint learner_course_assignments_source_check
    check (source in ('self_started', 'assigned', 'imported', 'paid', 'manual')),
  constraint learner_course_assignments_user_course_key unique (user_id, course_slug)
);

drop trigger if exists learner_course_assignments_touch_updated_at on public.learner_course_assignments;
create trigger learner_course_assignments_touch_updated_at
  before update on public.learner_course_assignments
  for each row execute function public.training_touch_updated_at();

create index if not exists learner_course_assignments_user_idx on public.learner_course_assignments (user_id);

alter table public.learner_course_assignments enable row level security;

drop policy if exists learner_course_assignments_select_own on public.learner_course_assignments;
create policy learner_course_assignments_select_own
  on public.learner_course_assignments for select to authenticated
  using (auth.uid() = user_id or public.is_admin());

drop policy if exists learner_course_assignments_insert_admin on public.learner_course_assignments;
create policy learner_course_assignments_insert_admin
  on public.learner_course_assignments for insert to authenticated
  with check (public.is_admin());

drop policy if exists learner_course_assignments_update_admin on public.learner_course_assignments;
create policy learner_course_assignments_update_admin
  on public.learner_course_assignments for update to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists learner_course_assignments_delete_admin on public.learner_course_assignments;
create policy learner_course_assignments_delete_admin
  on public.learner_course_assignments for delete to authenticated
  using (public.is_super_admin());

grant select, insert, update, delete on table public.learner_course_assignments to authenticated;

-- ---------------------------------------------------------------------------
-- Support / contact submissions (future-ready; forms can insert)
-- ---------------------------------------------------------------------------
create table if not exists public.support_submissions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete set null,
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  status text not null default 'new',
  assigned_to uuid references auth.users (id) on delete set null,
  internal_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint support_submissions_status_check
    check (status in ('new', 'open', 'resolved', 'archived')),
  constraint support_submissions_message_len check (char_length(message) between 10 and 20000)
);

drop trigger if exists support_submissions_touch_updated_at on public.support_submissions;
create trigger support_submissions_touch_updated_at
  before update on public.support_submissions
  for each row execute function public.training_touch_updated_at();

create index if not exists support_submissions_status_idx on public.support_submissions (status, created_at desc);

alter table public.support_submissions enable row level security;

drop policy if exists support_submissions_insert_public on public.support_submissions;
create policy support_submissions_insert_public
  on public.support_submissions for insert to anon, authenticated
  with check (
    char_length(trim(name)) between 1 and 200
    and char_length(trim(email)) between 3 and 320
    and char_length(trim(subject)) between 1 and 500
  );

drop policy if exists support_submissions_select_admin on public.support_submissions;
create policy support_submissions_select_admin
  on public.support_submissions for select to authenticated
  using (public.is_admin());

drop policy if exists support_submissions_update_admin on public.support_submissions;
create policy support_submissions_update_admin
  on public.support_submissions for update to authenticated
  using (public.is_admin())
  with check (public.is_admin());

grant select, insert, update on table public.support_submissions to authenticated, anon;

-- ---------------------------------------------------------------------------
-- Issued learner certificates (future-ready; empty until issuance pipeline writes rows)
-- ---------------------------------------------------------------------------
create table if not exists public.learner_certificates (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  course_slug text not null,
  certificate_code text,
  issued_at timestamptz not null default now(),
  expires_at timestamptz,
  status text not null default 'issued',
  final_score numeric,
  verification_url text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint learner_certificates_status_check
    check (status in ('issued', 'revoked', 'expired'))
);

drop trigger if exists learner_certificates_touch_updated_at on public.learner_certificates;
create trigger learner_certificates_touch_updated_at
  before update on public.learner_certificates
  for each row execute function public.training_touch_updated_at();

create index if not exists learner_certificates_user_idx on public.learner_certificates (user_id);
create index if not exists learner_certificates_course_idx on public.learner_certificates (course_slug);

alter table public.learner_certificates enable row level security;

drop policy if exists learner_certificates_select_own on public.learner_certificates;
create policy learner_certificates_select_own
  on public.learner_certificates for select to authenticated
  using (auth.uid() = user_id or public.is_admin());

drop policy if exists learner_certificates_write_admin on public.learner_certificates;
create policy learner_certificates_insert_super on public.learner_certificates
  for insert to authenticated
  with check (public.is_super_admin());

create policy learner_certificates_update_super on public.learner_certificates
  for update to authenticated
  using (public.is_super_admin())
  with check (public.is_super_admin());

create policy learner_certificates_delete_super on public.learner_certificates
  for delete to authenticated
  using (public.is_super_admin());

grant select, insert, update, delete on table public.learner_certificates to authenticated;

grant insert on table public.support_submissions to anon;

-- ---------------------------------------------------------------------------
-- Broaden learner progress visibility for admins (read-only)
-- ---------------------------------------------------------------------------
drop policy if exists learner_self_paced_progress_admin_select on public.learner_self_paced_progress;
create policy learner_self_paced_progress_admin_select
  on public.learner_self_paced_progress for select to authenticated
  using (public.is_admin());

drop policy if exists flagship_course_progress_admin_select on public.flagship_course_progress;
create policy flagship_course_progress_admin_select
  on public.flagship_course_progress for select to authenticated
  using (public.is_admin());

-- ---------------------------------------------------------------------------
-- Profiles: admins can read operational columns for learner management
-- ---------------------------------------------------------------------------
drop policy if exists profiles_admin_select on public.profiles;
create policy profiles_admin_select
  on public.profiles for select to authenticated
  using (public.is_admin());

-- ---------------------------------------------------------------------------
-- RPC: append audit row (super + platform)
-- ---------------------------------------------------------------------------
create or replace function public.admin_append_audit_log(
  p_action text,
  p_entity_type text default null,
  p_entity_id text default null,
  p_summary text default null,
  p_before jsonb default null,
  p_after jsonb default null
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_id uuid;
begin
  if auth.uid() is null or not public.is_admin() then
    raise exception 'Forbidden' using errcode = '42501';
  end if;
  insert into public.admin_audit_log (
    admin_user_id, action, entity_type, entity_id, summary, before_data, after_data
  )
  values (auth.uid(), p_action, p_entity_type, p_entity_id, p_summary, p_before, p_after)
  returning id into v_id;
  return v_id;
end;
$$;

grant execute on function public.admin_append_audit_log(text, text, text, text, jsonb, jsonb) to authenticated;

-- ---------------------------------------------------------------------------
-- RPC: super-admin reset self-paced progress row
-- ---------------------------------------------------------------------------
create or replace function public.admin_reset_self_paced_progress(p_user_id uuid, p_course_slug text)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is null or not public.is_super_admin() then
    raise exception 'Forbidden' using errcode = '42501';
  end if;
  delete from public.learner_self_paced_progress
  where user_id = p_user_id and course_slug = p_course_slug;
  perform public.admin_append_audit_log(
    'reset_self_paced_progress',
    'learner_self_paced_progress',
    p_course_slug,
    'Reset self-paced progress for learner',
    jsonb_build_object('user_id', p_user_id, 'course_slug', p_course_slug),
    null
  );
  return true;
end;
$$;

grant execute on function public.admin_reset_self_paced_progress(uuid, text) to authenticated;

-- ---------------------------------------------------------------------------
-- RPC: search learners (auth.users + profiles) — admins only
-- ---------------------------------------------------------------------------
create or replace function public.admin_search_learners(
  p_limit int default 50,
  p_offset int default 0,
  p_search text default null
)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_search text := nullif(trim(coalesce(p_search, '')), '');
begin
  if auth.uid() is null or not public.is_admin() then
    raise exception 'Forbidden' using errcode = '42501';
  end if;
  if p_limit is null or p_limit < 1 or p_limit > 200 then
    p_limit := 50;
  end if;
  if p_offset is null or p_offset < 0 then
    p_offset := 0;
  end if;

  return coalesce(
    (
      select jsonb_agg(to_jsonb(s) order by s.created_at desc)
      from (
        select
          u.id,
          u.email,
          u.created_at,
          u.last_sign_in_at,
          p.created_at as profile_created_at,
          p.global_access_tier
        from auth.users u
        left join public.profiles p on p.id = u.id
        where v_search is null
          or lower(u.email) like ('%' || lower(v_search) || '%')
        order by u.created_at desc
        limit p_limit offset p_offset
      ) s
    ),
    '[]'::jsonb
  );
end;
$$;

grant execute on function public.admin_search_learners(int, int, text) to authenticated;

-- ---------------------------------------------------------------------------
-- RPC: single learner summary
-- ---------------------------------------------------------------------------
create or replace function public.admin_get_user_public_summary(p_user_id uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
begin
  if auth.uid() is null or not public.is_admin() then
    raise exception 'Forbidden' using errcode = '42501';
  end if;
  return (
    select jsonb_build_object(
      'id', u.id,
      'email', u.email,
      'created_at', u.created_at,
      'last_sign_in_at', u.last_sign_in_at,
      'profile_created_at', p.created_at,
      'global_access_tier', p.global_access_tier,
      'default_tenant_id', p.default_tenant_id
    )
    from auth.users u
    left join public.profiles p on p.id = u.id
    where u.id = p_user_id
  );
end;
$$;

grant execute on function public.admin_get_user_public_summary(uuid) to authenticated;

-- ---------------------------------------------------------------------------
-- RPC: dashboard metrics (aggregates only)
-- ---------------------------------------------------------------------------
create or replace function public.admin_get_platform_metrics()
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_users_total bigint;
  v_signups_week bigint;
  v_self_rows bigint;
  v_flagship_rows bigint;
  v_self_completed bigint;
  v_flagship_completed bigint;
  v_assignments_active bigint;
  v_certs bigint;
  v_support_new bigint;
  v_active_week bigint;
begin
  if auth.uid() is null or not public.is_admin() then
    raise exception 'Forbidden' using errcode = '42501';
  end if;

  select count(*) into v_users_total from auth.users;

  select count(*) into v_signups_week
  from auth.users u
  where u.created_at >= (now() - interval '7 days');

  select count(*) into v_self_rows from public.learner_self_paced_progress;

  select count(*) into v_flagship_rows from public.flagship_course_progress;

  select count(*) into v_self_completed
  from public.learner_self_paced_progress
  where status in ('completed', 'certified', 'certificate_eligible');

  select count(*) into v_flagship_completed
  from public.flagship_course_progress
  where cardinality(coalesce(completed_session_ids, '{}')) > 0;

  select count(*) into v_assignments_active
  from public.learner_course_assignments
  where status = 'active';

  select count(*) into v_certs from public.learner_certificates where status = 'issued';

  select count(*) into v_support_new from public.support_submissions where status = 'new';

  select count(distinct x.user_id) into v_active_week
  from (
    select user_id from public.learner_self_paced_progress
    where coalesce(last_activity_at, last_opened_at, updated_at) >= (now() - interval '7 days')
    union
    select user_id from public.flagship_course_progress
    where updated_at >= (now() - interval '7 days')
  ) x;

  return jsonb_build_object(
    'users_total', v_users_total,
    'signups_last_7d', v_signups_week,
    'learner_self_paced_progress_rows', v_self_rows,
    'flagship_course_progress_rows', v_flagship_rows,
    'self_paced_completed_rows', v_self_completed,
    'flagship_rows_with_session_completions', v_flagship_completed,
    'assignments_active', v_assignments_active,
    'certificates_issued_rows', v_certs,
    'support_submissions_new', v_support_new,
    'active_learners_last_7d_distinct', v_active_week
  );
end;
$$;

grant execute on function public.admin_get_platform_metrics() to authenticated;

-- ---------------------------------------------------------------------------
-- RPC: database / schema health (no secrets)
-- ---------------------------------------------------------------------------
create or replace function public.admin_get_database_health()
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_size bigint;
  v_pretty text;
  v_counts jsonb := '{}'::jsonb;
  t text;
  cnt bigint;
  tables text[] := array[
    'profiles',
    'learner_self_paced_progress',
    'flagship_course_progress',
    'learner_course_assignments',
    'learner_certificates',
    'support_submissions',
    'admin_audit_log'
  ];
  rls_ok boolean;
begin
  if auth.uid() is null or not public.is_admin() then
    raise exception 'Forbidden' using errcode = '42501';
  end if;

  select pg_database_size(current_database()) into v_size;
  v_pretty := pg_size_pretty(v_size);

  foreach t in array tables
  loop
    if to_regclass(format('public.%I', t)) is not null then
      execute format('select count(*)::bigint from public.%I', t) into cnt;
      select coalesce(pc.relrowsecurity, false)
        into rls_ok
      from pg_class pc
      join pg_namespace ns on ns.oid = pc.relnamespace
      where ns.nspname = 'public' and pc.relname = t and pc.relkind = 'r';
      v_counts := v_counts || jsonb_build_object(
        t,
        jsonb_build_object(
          'approx_rows', cnt,
          'rls_enabled', coalesce(rls_ok, false)
        )
      );
    else
      v_counts := v_counts || jsonb_build_object(t, jsonb_build_object('approx_rows', null, 'rls_enabled', false));
    end if;
  end loop;

  return jsonb_build_object(
    'database_size_bytes', v_size,
    'database_size_pretty', v_pretty,
    'table_stats', v_counts,
    'checked_at', now()
  );
end;
$$;

grant execute on function public.admin_get_database_health() to authenticated;

-- ---------------------------------------------------------------------------
-- RPC: largest public tables by total size (safe summary)
-- ---------------------------------------------------------------------------
create or replace function public.admin_get_largest_public_tables(p_limit int default 12)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
begin
  if auth.uid() is null or not public.is_admin() then
    raise exception 'Forbidden' using errcode = '42501';
  end if;
  if p_limit is null or p_limit < 1 or p_limit > 40 then
    p_limit := 12;
  end if;

  return coalesce(
    (
      select jsonb_agg(
        jsonb_build_object(
          'table', relname,
          'total_bytes', total_bytes,
          'total_pretty', pg_size_pretty(total_bytes)
        )
        order by total_bytes desc
      )
      from (
        select
          c.relname,
          pg_total_relation_size(c.oid)::bigint as total_bytes
        from pg_class c
        join pg_namespace n on n.oid = c.relnamespace
        where n.nspname = 'public'
          and c.relkind = 'r'
        order by pg_total_relation_size(c.oid) desc
        limit p_limit
      ) q
    ),
    '[]'::jsonb
  );
end;
$$;

grant execute on function public.admin_get_largest_public_tables(int) to authenticated;

-- ---------------------------------------------------------------------------
-- RPC: at-risk learner counts (explainable heuristics)
-- ---------------------------------------------------------------------------
create or replace function public.admin_get_at_risk_counts()
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_stalled_in_progress bigint;
  v_slow_start bigint;
  v_never_started_enrolled bigint;
begin
  if auth.uid() is null or not public.is_admin() then
    raise exception 'Forbidden' using errcode = '42501';
  end if;

  -- Started / in progress but no touchpoints for 7+ days
  select count(*) into v_stalled_in_progress
  from public.learner_self_paced_progress l
  where l.status in ('in_progress', 'enrolled')
    and coalesce(l.last_activity_at, l.last_opened_at, l.started_at, l.updated_at)
      < (now() - interval '7 days');

  -- Low progress after 14+ days from first activity
  select count(*) into v_slow_start
  from public.learner_self_paced_progress l
  where l.status in ('in_progress', 'enrolled')
    and coalesce(l.started_at, l.updated_at) < (now() - interval '14 days')
    and coalesce(l.progress_percentage, 0) < 20
    and coalesce(l.progress_percentage, 0) > 0;

  select count(*) into v_never_started_enrolled
  from public.learner_self_paced_progress l
  where l.status in ('enrolled', 'not_started')
    and l.started_at is null
    and l.updated_at < (now() - interval '3 days');

  return jsonb_build_object(
    'stalled_in_progress_7d', v_stalled_in_progress,
    'under_twenty_pct_after_14d', v_slow_start,
    'enrolled_not_started_3d', v_never_started_enrolled
  );
end;
$$;

grant execute on function public.admin_get_at_risk_counts() to authenticated;
