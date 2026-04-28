-- One primary employable pathway preference per authenticated learner (user-scoped, like flagship_course_progress).

create table if not exists public.learner_pathway_preferences (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  pathway_slug text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint learner_pathway_preferences_user_id_key unique (user_id)
);

create index if not exists learner_pathway_preferences_user_id_idx
  on public.learner_pathway_preferences (user_id);

drop trigger if exists learner_pathway_preferences_touch_updated_at on public.learner_pathway_preferences;

create trigger learner_pathway_preferences_touch_updated_at
  before update on public.learner_pathway_preferences
  for each row execute function public.training_touch_updated_at ();

alter table public.learner_pathway_preferences enable row level security;

drop policy if exists learner_pathway_preferences_select_own on public.learner_pathway_preferences;
drop policy if exists learner_pathway_preferences_insert_own on public.learner_pathway_preferences;
drop policy if exists learner_pathway_preferences_update_own on public.learner_pathway_preferences;
drop policy if exists learner_pathway_preferences_delete_own on public.learner_pathway_preferences;

create policy learner_pathway_preferences_select_own
  on public.learner_pathway_preferences for select to authenticated
  using (auth.uid() = user_id);

create policy learner_pathway_preferences_insert_own
  on public.learner_pathway_preferences for insert to authenticated
  with check (auth.uid() = user_id);

create policy learner_pathway_preferences_update_own
  on public.learner_pathway_preferences for update to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy learner_pathway_preferences_delete_own
  on public.learner_pathway_preferences for delete to authenticated
  using (auth.uid() = user_id);

grant select, insert, update, delete on table public.learner_pathway_preferences to authenticated;

comment on table public.learner_pathway_preferences is
  'Learner-selected primary employable pathway slug; app restricts writes to active pathways.';
