-- Capstone submissions + lesson time-on-page + private storage for paid flagship flows.
-- Certificate issuance timestamps are set when a platform reviewer marks status = passed (not on learner submit).

-- ---------------------------------------------------------------------------
-- Platform operator helper (RLS + storage) — mirrors app tier gating.
-- ---------------------------------------------------------------------------
create or replace function public.is_jifunze_platform_operator()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.my_effective_access_tier(null) in ('platform_admin', 'super_admin');
$$;

comment on function public.is_jifunze_platform_operator() is
  'True when auth.uid() resolves to platform_admin or super_admin via my_effective_access_tier.';

grant execute on function public.is_jifunze_platform_operator() to authenticated;

-- ---------------------------------------------------------------------------
-- learner_capstone_submissions
-- ---------------------------------------------------------------------------
create table if not exists public.learner_capstone_submissions (
  id uuid primary key default gen_random_uuid(),
  learner_id uuid not null references auth.users (id) on delete cascade,
  learner_email text,
  course_slug text not null,
  course_title text,
  submission_type text not null default 'capstone',
  file_url text,
  file_name text,
  file_type text,
  file_size bigint,
  reflection text,
  declaration_confirmed boolean not null default false,
  consent_confirmed boolean not null default false,
  status text not null default 'submitted',
  score numeric,
  reviewer_notes text,
  reviewed_by uuid references auth.users (id),
  reviewed_at timestamptz,
  certificate_eligible boolean not null default false,
  certificate_issued_at timestamptz,
  certificate_valid_until timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint learner_capstone_submissions_status_check
    check (status in ('submitted', 'under_review', 'revision_requested', 'passed', 'failed')),
  constraint learner_capstone_submissions_pass_score_check
    check (status <> 'passed' or (score is not null and score >= 75))
);

create index if not exists learner_capstone_submissions_learner_course_idx
  on public.learner_capstone_submissions (learner_id, course_slug, created_at desc);

create index if not exists learner_capstone_submissions_status_idx
  on public.learner_capstone_submissions (status, created_at desc);

comment on table public.learner_capstone_submissions is
  'Native capstone file submissions for flagship courses; certificate fields set on reviewer pass.';

create or replace function public.learner_capstone_submissions_touch_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists learner_capstone_submissions_touch_updated_at on public.learner_capstone_submissions;
create trigger learner_capstone_submissions_touch_updated_at
  before update on public.learner_capstone_submissions
  for each row execute function public.learner_capstone_submissions_touch_updated_at();

-- When status becomes passed, stamp certificate window (2 years from issue).
create or replace function public.learner_capstone_submissions_on_pass()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if new.status = 'passed' then
    if new.score is null or new.score < 75 then
      raise exception 'Capstone marked passed requires score >= 75';
    end if;
    new.certificate_eligible := true;
    if new.certificate_issued_at is null then
      new.certificate_issued_at := now();
    end if;
    new.certificate_valid_until := new.certificate_issued_at + interval '2 years';
  elsif new.status in ('failed', 'revision_requested') then
    new.certificate_eligible := false;
  end if;
  return new;
end;
$$;

drop trigger if exists learner_capstone_submissions_on_pass on public.learner_capstone_submissions;
create trigger learner_capstone_submissions_on_pass
  before insert or update on public.learner_capstone_submissions
  for each row execute function public.learner_capstone_submissions_on_pass();

alter table public.learner_capstone_submissions enable row level security;

grant select, insert, update on table public.learner_capstone_submissions to authenticated;

drop policy if exists learner_capstone_submissions_select_own on public.learner_capstone_submissions;
drop policy if exists learner_capstone_submissions_insert_own on public.learner_capstone_submissions;
drop policy if exists learner_capstone_submissions_select_admin on public.learner_capstone_submissions;
drop policy if exists learner_capstone_submissions_update_admin on public.learner_capstone_submissions;

create policy learner_capstone_submissions_select_own on public.learner_capstone_submissions
  for select using (learner_id = auth.uid());

create policy learner_capstone_submissions_insert_own on public.learner_capstone_submissions
  for insert with check (learner_id = auth.uid());

create policy learner_capstone_submissions_select_admin on public.learner_capstone_submissions
  for select using (public.is_jifunze_platform_operator());

create policy learner_capstone_submissions_update_admin on public.learner_capstone_submissions
  for update using (public.is_jifunze_platform_operator())
  with check (public.is_jifunze_platform_operator());

-- ---------------------------------------------------------------------------
-- learner_lesson_time — anti-skim active seconds per lesson
-- ---------------------------------------------------------------------------
create table if not exists public.learner_lesson_time (
  id uuid primary key default gen_random_uuid(),
  learner_id uuid not null references auth.users (id) on delete cascade,
  course_slug text not null,
  module_id text,
  lesson_id text not null,
  started_at timestamptz,
  last_active_at timestamptz,
  active_seconds integer not null default 0,
  minimum_required_seconds integer not null default 60,
  timer_satisfied boolean not null default false,
  completed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint learner_lesson_time_unique unique (learner_id, course_slug, lesson_id)
);

create index if not exists learner_lesson_time_learner_course_idx
  on public.learner_lesson_time (learner_id, course_slug);

comment on table public.learner_lesson_time is
  'Per-lesson active on-tab seconds for flagship pacing; timer_satisfied gates completion UX when enforced client-side.';

create or replace function public.learner_lesson_time_touch_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at := now();
  if new.active_seconds >= new.minimum_required_seconds then
    new.timer_satisfied := true;
  end if;
  return new;
end;
$$;

drop trigger if exists learner_lesson_time_touch_updated_at on public.learner_lesson_time;
create trigger learner_lesson_time_touch_updated_at
  before update on public.learner_lesson_time
  for each row execute function public.learner_lesson_time_touch_updated_at();

alter table public.learner_lesson_time enable row level security;

grant select, insert, update on table public.learner_lesson_time to authenticated;

drop policy if exists learner_lesson_time_own_all on public.learner_lesson_time;
drop policy if exists learner_lesson_time_admin_select on public.learner_lesson_time;

create policy learner_lesson_time_own_all on public.learner_lesson_time
  for all using (learner_id = auth.uid())
  with check (learner_id = auth.uid());

create policy learner_lesson_time_admin_select on public.learner_lesson_time
  for select using (public.is_jifunze_platform_operator());

-- ---------------------------------------------------------------------------
-- Storage: private capstone uploads
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
  values ('capstone_submissions', 'capstone_submissions', false)
  on conflict (id) do nothing;

drop policy if exists capstone_submissions_insert_own on storage.objects;
drop policy if exists capstone_submissions_select_own on storage.objects;
drop policy if exists capstone_submissions_select_admin on storage.objects;

-- Path: capstones/{course_slug}/{learner_id}/{filename}
create policy capstone_submissions_insert_own on storage.objects
  for insert to authenticated
  with check (
    bucket_id = 'capstone_submissions'
    and (storage.foldername(name))[1] = 'capstones'
    and (storage.foldername(name))[3] = auth.uid()::text
  );

create policy capstone_submissions_select_own on storage.objects
  for select to authenticated
  using (
    bucket_id = 'capstone_submissions'
    and (storage.foldername(name))[3] = auth.uid()::text
  );

create policy capstone_submissions_select_admin on storage.objects
  for select to authenticated
  using (
    bucket_id = 'capstone_submissions'
    and public.is_jifunze_platform_operator()
  );
