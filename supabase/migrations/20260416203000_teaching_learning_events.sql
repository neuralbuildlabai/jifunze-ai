-- Append-only learner teaching signals for signed-in users (analytics, continuity, curriculum freshness).
-- Mirrors client `TeachingSignal` rows when Supabase is configured and a session exists; never required for UX.

create table if not exists public.teaching_learning_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  kind text not null,
  payload jsonb not null default '{}'::jsonb,
  client_signal_id text,
  created_at timestamptz not null default now()
);

create index if not exists teaching_learning_events_user_created_idx
  on public.teaching_learning_events (user_id, created_at desc);

create index if not exists teaching_learning_events_kind_created_idx
  on public.teaching_learning_events (kind, created_at desc);

comment on table public.teaching_learning_events is 'User-scoped teaching/learning telemetry (kind + JSON payload). Client mirrors local teaching signals when authenticated.';

alter table public.teaching_learning_events enable row level security;

drop policy if exists teaching_learning_events_insert_own on public.teaching_learning_events;
create policy teaching_learning_events_insert_own on public.teaching_learning_events
  for insert to authenticated
  with check (auth.uid() = user_id);

drop policy if exists teaching_learning_events_select_own on public.teaching_learning_events;
create policy teaching_learning_events_select_own on public.teaching_learning_events
  for select to authenticated
  using (auth.uid() = user_id);

grant select, insert on public.teaching_learning_events to authenticated;
