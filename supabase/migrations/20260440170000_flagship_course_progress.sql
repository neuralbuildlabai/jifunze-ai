-- Flagship course session progress per user — syncs with browser local cache via client merge.

create table if not exists public.flagship_course_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  course_slug text not null,
  completed_session_ids text[] not null default '{}',
  flagged_for_review_session_ids text[] not null default '{}',
  last_active_session_id text,
  last_active_at timestamptz,
  started_at timestamptz,
  updated_at timestamptz not null default now(),
  constraint flagship_course_progress_user_slug_key unique (user_id, course_slug)
);

create index if not exists flagship_course_progress_user_updated_idx
  on public.flagship_course_progress (user_id, updated_at desc);

drop trigger if exists flagship_course_progress_touch_updated_at on public.flagship_course_progress;

create trigger flagship_course_progress_touch_updated_at
  before update on public.flagship_course_progress
  for each row execute function public.training_touch_updated_at ();

alter table public.flagship_course_progress enable row level security;

drop policy if exists "flagship_course_progress_select_own" on public.flagship_course_progress;
drop policy if exists "flagship_course_progress_insert_own" on public.flagship_course_progress;
drop policy if exists "flagship_course_progress_update_own" on public.flagship_course_progress;
drop policy if exists "flagship_course_progress_delete_own" on public.flagship_course_progress;

create policy "flagship_course_progress_select_own"
  on public.flagship_course_progress for select to authenticated
  using (auth.uid() = user_id);

create policy "flagship_course_progress_insert_own"
  on public.flagship_course_progress for insert to authenticated
  with check (auth.uid() = user_id);

create policy "flagship_course_progress_update_own"
  on public.flagship_course_progress for update to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "flagship_course_progress_delete_own"
  on public.flagship_course_progress for delete to authenticated
  using (auth.uid() = user_id);

grant select, insert, update, delete on table public.flagship_course_progress to authenticated;

comment on table public.flagship_course_progress is 'Synced flagship course learner progress — pairs with browser localStorage cache.';
