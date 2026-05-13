-- Per-user progress for interactive micro-courses, standalone slugs, and other non-flagship paths.
-- Flagship session progress remains in flagship_course_progress.

create table if not exists public.learner_self_paced_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  course_slug text not null,
  current_module_slug text,
  current_session_slug text,
  current_day_slug text,
  last_opened_at timestamptz,
  last_activity_at timestamptz,
  last_completed_module_slug text,
  last_completed_session_slug text,
  last_completed_day_slug text,
  completed_modules text[] not null default '{}',
  completed_sessions text[] not null default '{}',
  completed_days text[] not null default '{}',
  progress_percentage integer not null default 0,
  status text not null default 'not_started',
  certificate_eligible boolean not null default false,
  completed_at timestamptz,
  started_at timestamptz,
  updated_at timestamptz not null default now(),
  constraint learner_self_paced_progress_user_course_key unique (user_id, course_slug),
  constraint learner_self_paced_progress_percentage_check
    check (progress_percentage >= 0 and progress_percentage <= 100),
  constraint learner_self_paced_progress_status_check
    check (
      status = any (
        array[
          'not_started'::text,
          'enrolled'::text,
          'in_progress'::text,
          'completed'::text,
          'certificate_eligible'::text,
          'certified'::text
        ]
      )
    )
);

create index if not exists learner_self_paced_progress_user_updated_idx
  on public.learner_self_paced_progress (user_id, updated_at desc);

drop trigger if exists learner_self_paced_progress_touch_updated_at on public.learner_self_paced_progress;

create trigger learner_self_paced_progress_touch_updated_at
  before update on public.learner_self_paced_progress
  for each row execute function public.training_touch_updated_at();

alter table public.learner_self_paced_progress enable row level security;

drop policy if exists "learner_self_paced_progress_select_own" on public.learner_self_paced_progress;
drop policy if exists "learner_self_paced_progress_insert_own" on public.learner_self_paced_progress;
drop policy if exists "learner_self_paced_progress_update_own" on public.learner_self_paced_progress;
drop policy if exists "learner_self_paced_progress_delete_own" on public.learner_self_paced_progress;

create policy "learner_self_paced_progress_select_own"
  on public.learner_self_paced_progress for select to authenticated
  using (auth.uid() = user_id);

create policy "learner_self_paced_progress_insert_own"
  on public.learner_self_paced_progress for insert to authenticated
  with check (auth.uid() = user_id);

create policy "learner_self_paced_progress_update_own"
  on public.learner_self_paced_progress for update to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "learner_self_paced_progress_delete_own"
  on public.learner_self_paced_progress for delete to authenticated
  using (auth.uid() = user_id);

grant select, insert, update, delete on table public.learner_self_paced_progress to authenticated;

comment on table public.learner_self_paced_progress is 'Learner progress for free interactive starters, wellbeing challenges, and similar self-paced slugs; complements flagship_course_progress.';
