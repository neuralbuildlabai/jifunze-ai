-- Trend topics, signals, summaries, recommendations (workspace-scoped MVP).
-- Read: any workspace member. Write: workspace training managers (team_admin | individual_user).

-- ---------------------------------------------------------------------------
-- trend_topics
-- ---------------------------------------------------------------------------
create table if not exists public.trend_topics (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.tenants (id) on delete cascade,
  created_by uuid not null references auth.users (id) on delete restrict,
  name text not null,
  category text,
  source_label text,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint trend_topics_status_check check (status in ('active', 'inactive'))
);

create index if not exists trend_topics_workspace_idx on public.trend_topics (workspace_id);
create index if not exists trend_topics_workspace_status_idx on public.trend_topics (workspace_id, status);

drop trigger if exists trend_topics_touch_updated_at on public.trend_topics;
create trigger trend_topics_touch_updated_at
  before update on public.trend_topics
  for each row execute function public.training_touch_updated_at();

-- ---------------------------------------------------------------------------
-- trend_signals
-- ---------------------------------------------------------------------------
create table if not exists public.trend_signals (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.tenants (id) on delete cascade,
  trend_topic_id uuid not null references public.trend_topics (id) on delete cascade,
  source_name text not null,
  signal_text text not null,
  captured_at timestamptz not null default now(),
  freshness_label text,
  metadata_json jsonb,
  created_at timestamptz not null default now()
);

create index if not exists trend_signals_workspace_idx on public.trend_signals (workspace_id);
create index if not exists trend_signals_topic_idx on public.trend_signals (trend_topic_id);
create index if not exists trend_signals_captured_idx on public.trend_signals (captured_at desc);

-- ---------------------------------------------------------------------------
-- trend_summaries
-- ---------------------------------------------------------------------------
create table if not exists public.trend_summaries (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.tenants (id) on delete cascade,
  trend_topic_id uuid not null references public.trend_topics (id) on delete cascade,
  summary_text text not null,
  recurring_themes_json jsonb,
  changes_json jsonb,
  recommended_actions_json jsonb,
  generated_at timestamptz not null default now(),
  created_by uuid references auth.users (id) on delete set null
);

create index if not exists trend_summaries_workspace_idx on public.trend_summaries (workspace_id);
create index if not exists trend_summaries_topic_idx on public.trend_summaries (trend_topic_id);
create index if not exists trend_summaries_generated_idx on public.trend_summaries (generated_at desc);

-- ---------------------------------------------------------------------------
-- recommendations
-- ---------------------------------------------------------------------------
create table if not exists public.recommendations (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.tenants (id) on delete cascade,
  trend_topic_id uuid references public.trend_topics (id) on delete set null,
  related_training_plan_id uuid references public.training_plans (id) on delete set null,
  type text not null,
  title text not null,
  description text not null,
  status text not null default 'new',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint recommendations_status_check check (status in ('new', 'reviewed', 'applied', 'dismissed'))
);

create index if not exists recommendations_workspace_idx on public.recommendations (workspace_id);
create index if not exists recommendations_topic_idx on public.recommendations (trend_topic_id);
create index if not exists recommendations_plan_idx on public.recommendations (related_training_plan_id);
create index if not exists recommendations_status_idx on public.recommendations (workspace_id, status);

drop trigger if exists recommendations_touch_updated_at on public.recommendations;
create trigger recommendations_touch_updated_at
  before update on public.recommendations
  for each row execute function public.training_touch_updated_at();

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------
alter table public.trend_topics enable row level security;
alter table public.trend_signals enable row level security;
alter table public.trend_summaries enable row level security;
alter table public.recommendations enable row level security;

drop policy if exists trend_topics_select_workspace on public.trend_topics;
create policy trend_topics_select_workspace on public.trend_topics
  for select using (workspace_id in (select public.user_tenant_ids()));

drop policy if exists trend_topics_insert_manager on public.trend_topics;
create policy trend_topics_insert_manager on public.trend_topics
  for insert with check (
    workspace_id in (select public.user_tenant_ids())
    and public.user_is_workspace_training_manager(workspace_id)
    and created_by = auth.uid()
  );

drop policy if exists trend_topics_update_manager on public.trend_topics;
create policy trend_topics_update_manager on public.trend_topics
  for update using (
    workspace_id in (select public.user_tenant_ids())
    and public.user_is_workspace_training_manager(workspace_id)
  )
  with check (
    workspace_id in (select public.user_tenant_ids())
    and public.user_is_workspace_training_manager(workspace_id)
  );

drop policy if exists trend_topics_delete_manager on public.trend_topics;
create policy trend_topics_delete_manager on public.trend_topics
  for delete using (
    workspace_id in (select public.user_tenant_ids())
    and public.user_is_workspace_training_manager(workspace_id)
  );

drop policy if exists trend_signals_select_workspace on public.trend_signals;
create policy trend_signals_select_workspace on public.trend_signals
  for select using (workspace_id in (select public.user_tenant_ids()));

drop policy if exists trend_signals_write_manager on public.trend_signals;
create policy trend_signals_write_manager on public.trend_signals
  for all using (
    workspace_id in (select public.user_tenant_ids())
    and public.user_is_workspace_training_manager(workspace_id)
  )
  with check (
    workspace_id in (select public.user_tenant_ids())
    and public.user_is_workspace_training_manager(workspace_id)
  );

drop policy if exists trend_summaries_select_workspace on public.trend_summaries;
create policy trend_summaries_select_workspace on public.trend_summaries
  for select using (workspace_id in (select public.user_tenant_ids()));

drop policy if exists trend_summaries_write_manager on public.trend_summaries;
create policy trend_summaries_write_manager on public.trend_summaries
  for all using (
    workspace_id in (select public.user_tenant_ids())
    and public.user_is_workspace_training_manager(workspace_id)
  )
  with check (
    workspace_id in (select public.user_tenant_ids())
    and public.user_is_workspace_training_manager(workspace_id)
  );

drop policy if exists recommendations_select_workspace on public.recommendations;
create policy recommendations_select_workspace on public.recommendations
  for select using (workspace_id in (select public.user_tenant_ids()));

drop policy if exists recommendations_write_manager on public.recommendations;
create policy recommendations_write_manager on public.recommendations
  for all using (
    workspace_id in (select public.user_tenant_ids())
    and public.user_is_workspace_training_manager(workspace_id)
  )
  with check (
    workspace_id in (select public.user_tenant_ids())
    and public.user_is_workspace_training_manager(workspace_id)
  );

grant select, insert, update, delete on table public.trend_topics to authenticated;
grant select, insert, update, delete on table public.trend_signals to authenticated;
grant select, insert, update, delete on table public.trend_summaries to authenticated;
grant select, insert, update, delete on table public.recommendations to authenticated;

comment on table public.trend_topics is 'Workspace monitored trend / topic labels.';
comment on table public.trend_signals is 'Point-in-time observations for a topic (MVP: manual or simulated).';
comment on table public.trend_summaries is 'Generated narrative summary for a topic.';
comment on table public.recommendations is 'Action items; may link to training_plans for relevance.';
