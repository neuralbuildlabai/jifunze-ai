-- Learner-written responses for flagship (and future) course blocks — portfolio / evidence layer.
-- RLS: learners manage only their own rows (same pattern as flagship_course_progress).

create table if not exists public.learner_course_artifacts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  tenant_id uuid null references public.tenants (id) on delete set null,
  course_slug text not null,
  module_id text not null,
  session_id text not null,
  block_key text not null,
  block_label text,
  artifact_type text,
  response_text text not null default '',
  validation_status text not null default 'draft',
  validation_feedback text,
  validation_score numeric null,
  accepted_as_module_evidence boolean not null default false,
  capstone_candidate boolean not null default false,
  attempt_count integer not null default 0,
  archived_after_module_completion boolean not null default false,
  final_evidence_text text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  reviewed_at timestamptz null,
  constraint learner_course_artifacts_user_course_module_session_block_key
    unique (user_id, course_slug, module_id, session_id, block_key),
  constraint learner_course_artifacts_validation_status_check
    check (
      validation_status in (
        'draft',
        'needs_more_work',
        'almost_ready',
        'accepted',
        'strong_portfolio_evidence'
      )
    )
);

create index if not exists learner_course_artifacts_user_course_session_idx
  on public.learner_course_artifacts (user_id, course_slug, session_id);

create index if not exists learner_course_artifacts_user_course_module_idx
  on public.learner_course_artifacts (user_id, course_slug, module_id);

drop trigger if exists learner_course_artifacts_touch_updated_at on public.learner_course_artifacts;

create trigger learner_course_artifacts_touch_updated_at
  before update on public.learner_course_artifacts
  for each row execute function public.training_touch_updated_at ();

alter table public.learner_course_artifacts enable row level security;

drop policy if exists "learner_course_artifacts_select_own" on public.learner_course_artifacts;
drop policy if exists "learner_course_artifacts_insert_own" on public.learner_course_artifacts;
drop policy if exists "learner_course_artifacts_update_own" on public.learner_course_artifacts;
drop policy if exists "learner_course_artifacts_delete_own" on public.learner_course_artifacts;

create policy "learner_course_artifacts_select_own"
  on public.learner_course_artifacts for select to authenticated
  using (auth.uid() = user_id);

create policy "learner_course_artifacts_insert_own"
  on public.learner_course_artifacts for insert to authenticated
  with check (auth.uid() = user_id);

create policy "learner_course_artifacts_update_own"
  on public.learner_course_artifacts for update to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "learner_course_artifacts_delete_own"
  on public.learner_course_artifacts for delete to authenticated
  using (auth.uid() = user_id);

grant select, insert, update, delete on table public.learner_course_artifacts to authenticated;

comment on table public.learner_course_artifacts is 'Learner responses tied to flagship session blocks; supports drafts, validation, and evidence for capstone.';
