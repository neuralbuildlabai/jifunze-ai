-- Individual training MVP: workspace-scoped plans, modules, lessons, per-user lesson progress.

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------
create table if not exists public.training_plans (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.tenants (id) on delete cascade,
  created_by uuid not null references auth.users (id) on delete restrict,
  title text not null,
  topic text,
  objective text,
  skill_level text,
  duration_label text,
  status text not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint training_plans_status_check
    check (status in ('draft', 'active', 'completed', 'archived'))
);

create index if not exists training_plans_workspace_idx on public.training_plans (workspace_id);
create index if not exists training_plans_workspace_status_idx on public.training_plans (workspace_id, status);

create table if not exists public.training_modules (
  id uuid primary key default gen_random_uuid(),
  training_plan_id uuid not null references public.training_plans (id) on delete cascade,
  workspace_id uuid not null references public.tenants (id) on delete cascade,
  title text not null,
  description text,
  sort_order int not null default 0
);

create index if not exists training_modules_plan_idx on public.training_modules (training_plan_id);
create index if not exists training_modules_workspace_idx on public.training_modules (workspace_id);

create table if not exists public.training_lessons (
  id uuid primary key default gen_random_uuid(),
  module_id uuid not null references public.training_modules (id) on delete cascade,
  training_plan_id uuid not null references public.training_plans (id) on delete cascade,
  workspace_id uuid not null references public.tenants (id) on delete cascade,
  title text not null,
  content text not null default '',
  objectives text,
  takeaway text,
  sort_order int not null default 0
);

create index if not exists training_lessons_plan_idx on public.training_lessons (training_plan_id);
create index if not exists training_lessons_module_idx on public.training_lessons (module_id);
create index if not exists training_lessons_workspace_idx on public.training_lessons (workspace_id);

create table if not exists public.lesson_progress (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid not null references public.training_lessons (id) on delete cascade,
  training_plan_id uuid not null references public.training_plans (id) on delete cascade,
  workspace_id uuid not null references public.tenants (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  status text not null default 'not_started',
  completed_at timestamptz,
  updated_at timestamptz not null default now(),
  constraint lesson_progress_status_check
    check (status in ('not_started', 'in_progress', 'completed')),
  constraint lesson_progress_unique_per_user unique (workspace_id, lesson_id, user_id)
);

create index if not exists lesson_progress_user_workspace_idx on public.lesson_progress (user_id, workspace_id);
create index if not exists lesson_progress_plan_idx on public.lesson_progress (training_plan_id);

-- ---------------------------------------------------------------------------
-- updated_at
-- ---------------------------------------------------------------------------
create or replace function public.training_touch_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists training_plans_touch_updated_at on public.training_plans;
create trigger training_plans_touch_updated_at
  before update on public.training_plans
  for each row execute function public.training_touch_updated_at();

drop trigger if exists lesson_progress_touch_updated_at on public.lesson_progress;
create trigger lesson_progress_touch_updated_at
  before update on public.lesson_progress
  for each row execute function public.training_touch_updated_at();

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------
alter table public.training_plans enable row level security;
alter table public.training_modules enable row level security;
alter table public.training_lessons enable row level security;
alter table public.lesson_progress enable row level security;

drop policy if exists training_plans_tenant_select on public.training_plans;
drop policy if exists training_plans_tenant_insert on public.training_plans;
drop policy if exists training_plans_tenant_update on public.training_plans;
drop policy if exists training_plans_tenant_delete on public.training_plans;

create policy training_plans_tenant_select on public.training_plans
  for select using (workspace_id in (select public.user_tenant_ids()));

create policy training_plans_tenant_insert on public.training_plans
  for insert with check (
    workspace_id in (select public.user_tenant_ids())
    and created_by = auth.uid()
  );

create policy training_plans_tenant_update on public.training_plans
  for update using (workspace_id in (select public.user_tenant_ids()))
  with check (workspace_id in (select public.user_tenant_ids()));

create policy training_plans_tenant_delete on public.training_plans
  for delete using (workspace_id in (select public.user_tenant_ids()));

drop policy if exists training_modules_tenant_all on public.training_modules;
create policy training_modules_tenant_all on public.training_modules
  for all using (workspace_id in (select public.user_tenant_ids()))
  with check (workspace_id in (select public.user_tenant_ids()));

drop policy if exists training_lessons_tenant_all on public.training_lessons;
create policy training_lessons_tenant_all on public.training_lessons
  for all using (workspace_id in (select public.user_tenant_ids()))
  with check (workspace_id in (select public.user_tenant_ids()));

drop policy if exists lesson_progress_select_own on public.lesson_progress;
drop policy if exists lesson_progress_insert_own on public.lesson_progress;
drop policy if exists lesson_progress_update_own on public.lesson_progress;
drop policy if exists lesson_progress_delete_own on public.lesson_progress;

create policy lesson_progress_select_own on public.lesson_progress
  for select using (
    workspace_id in (select public.user_tenant_ids())
    and user_id = auth.uid()
  );

create policy lesson_progress_insert_own on public.lesson_progress
  for insert with check (
    workspace_id in (select public.user_tenant_ids())
    and user_id = auth.uid()
  );

create policy lesson_progress_update_own on public.lesson_progress
  for update using (
    workspace_id in (select public.user_tenant_ids())
    and user_id = auth.uid()
  )
  with check (
    workspace_id in (select public.user_tenant_ids())
    and user_id = auth.uid()
  );

create policy lesson_progress_delete_own on public.lesson_progress
  for delete using (
    workspace_id in (select public.user_tenant_ids())
    and user_id = auth.uid()
  );

-- ---------------------------------------------------------------------------
-- Grants (PostgREST)
-- ---------------------------------------------------------------------------
grant select, insert, update, delete on table public.training_plans to authenticated;
grant select, insert, update, delete on table public.training_modules to authenticated;
grant select, insert, update, delete on table public.training_lessons to authenticated;
grant select, insert, update, delete on table public.lesson_progress to authenticated;

comment on table public.training_plans is 'Workspace-scoped training plans (individual MVP).';
comment on table public.training_modules is 'Modules belonging to a training plan.';
comment on table public.training_lessons is 'Lessons belonging to a module; content is markdown-friendly plain text.';
comment on table public.lesson_progress is 'Per-user lesson completion state within a workspace.';
