-- Team training assignments + manager visibility (workspace-scoped).
-- - training_assignments links plans to assignees; managers create rows; members read own.
-- - Extends tenant_members / lesson_progress / quiz_attempts SELECT for workspace managers only.

-- ---------------------------------------------------------------------------
-- Helpers (SECURITY DEFINER: bypasses RLS for membership checks)
-- ---------------------------------------------------------------------------
create or replace function public.user_is_workspace_training_manager(p_workspace_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.tenant_members m
    where m.user_id = auth.uid()
      and m.tenant_id = p_workspace_id
      and m.role in ('team_admin', 'individual_user')
  );
$$;

comment on function public.user_is_workspace_training_manager(uuid) is
  'True when auth.uid() can manage team training in this workspace (solo individual_user or team_admin).';

grant execute on function public.user_is_workspace_training_manager(uuid) to authenticated;

create or replace function public.user_is_tenant_member(p_workspace_id uuid, p_user_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.tenant_members tm
    where tm.tenant_id = p_workspace_id
      and tm.user_id = p_user_id
  );
$$;

comment on function public.user_is_tenant_member(uuid, uuid) is
  'True when p_user_id belongs to workspace p_workspace_id (tenant_members).';

grant execute on function public.user_is_tenant_member(uuid, uuid) to authenticated;

-- ---------------------------------------------------------------------------
-- tenant_members: managers can list all members in their workspace
-- ---------------------------------------------------------------------------
drop policy if exists tenant_members_manager_select on public.tenant_members;
create policy tenant_members_manager_select on public.tenant_members
  for select using (public.user_is_workspace_training_manager(tenant_members.tenant_id));

-- ---------------------------------------------------------------------------
-- training_assignments
-- ---------------------------------------------------------------------------
create table if not exists public.training_assignments (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.tenants (id) on delete cascade,
  training_plan_id uuid not null references public.training_plans (id) on delete cascade,
  assigned_to uuid not null references auth.users (id) on delete cascade,
  assigned_by uuid not null references auth.users (id) on delete restrict,
  due_date timestamptz,
  status text not null default 'assigned',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint training_assignments_status_check
    check (status in ('assigned', 'in_progress', 'completed', 'overdue')),
  constraint training_assignments_unique_assignee unique (workspace_id, training_plan_id, assigned_to)
);

create index if not exists training_assignments_workspace_idx on public.training_assignments (workspace_id);
create index if not exists training_assignments_assignee_idx on public.training_assignments (assigned_to);
create index if not exists training_assignments_plan_idx on public.training_assignments (training_plan_id);
create index if not exists training_assignments_workspace_plan_idx
  on public.training_assignments (workspace_id, training_plan_id);

drop trigger if exists training_assignments_touch_updated_at on public.training_assignments;
create trigger training_assignments_touch_updated_at
  before update on public.training_assignments
  for each row execute function public.training_touch_updated_at();

alter table public.training_assignments enable row level security;

drop policy if exists training_assignments_select_member_or_manager on public.training_assignments;
create policy training_assignments_select_member_or_manager on public.training_assignments
  for select using (
    workspace_id in (select public.user_tenant_ids())
    and (
      assigned_to = auth.uid()
      or public.user_is_workspace_training_manager(workspace_id)
    )
  );

drop policy if exists training_assignments_insert_manager on public.training_assignments;
create policy training_assignments_insert_manager on public.training_assignments
  for insert with check (
    workspace_id in (select public.user_tenant_ids())
    and public.user_is_workspace_training_manager(workspace_id)
    and assigned_by = auth.uid()
    and public.user_is_tenant_member(workspace_id, assigned_to)
  );

drop policy if exists training_assignments_update_manager on public.training_assignments;
create policy training_assignments_update_manager on public.training_assignments
  for update using (
    workspace_id in (select public.user_tenant_ids())
    and public.user_is_workspace_training_manager(workspace_id)
  )
  with check (
    workspace_id in (select public.user_tenant_ids())
    and public.user_is_workspace_training_manager(workspace_id)
  );

drop policy if exists training_assignments_delete_manager on public.training_assignments;
create policy training_assignments_delete_manager on public.training_assignments
  for delete using (
    workspace_id in (select public.user_tenant_ids())
    and public.user_is_workspace_training_manager(workspace_id)
  );

grant select, insert, update, delete on table public.training_assignments to authenticated;

comment on table public.training_assignments is
  'Workspace-scoped assignment of a training plan to a member; managers create, assignees read own.';

-- ---------------------------------------------------------------------------
-- lesson_progress / quiz_attempts: managers read team progress (same workspace)
-- ---------------------------------------------------------------------------
drop policy if exists lesson_progress_select_workspace_manager on public.lesson_progress;
create policy lesson_progress_select_workspace_manager on public.lesson_progress
  for select using (
    workspace_id in (select public.user_tenant_ids())
    and public.user_is_workspace_training_manager(workspace_id)
  );

drop policy if exists quiz_attempts_select_workspace_manager on public.quiz_attempts;
create policy quiz_attempts_select_workspace_manager on public.quiz_attempts
  for select using (
    workspace_id in (select public.user_tenant_ids())
    and public.user_is_workspace_training_manager(workspace_id)
  );
