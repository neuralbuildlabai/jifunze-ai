-- Fix 403 on learning_snapshots / cache tables: ensure policies evaluate user_tenant_ids()
-- and use explicit per-command policies (SELECT / INSERT / UPDATE / DELETE).

-- RLS expressions invoke user_tenant_ids(); callers must be allowed to execute it.
grant execute on function public.user_tenant_ids() to authenticated;

-- ---------------------------------------------------------------------------
-- public.learning_snapshots
-- ---------------------------------------------------------------------------

alter table public.learning_snapshots enable row level security;

drop policy if exists learning_snapshots_tenant_all on public.learning_snapshots;
drop policy if exists learning_snapshots_select_tenant on public.learning_snapshots;
drop policy if exists learning_snapshots_insert_tenant on public.learning_snapshots;
drop policy if exists learning_snapshots_update_tenant on public.learning_snapshots;
drop policy if exists learning_snapshots_delete_tenant on public.learning_snapshots;

create policy learning_snapshots_select_tenant on public.learning_snapshots
  for select
  to authenticated
  using (tenant_id in (select public.user_tenant_ids()));

create policy learning_snapshots_insert_tenant on public.learning_snapshots
  for insert
  to authenticated
  with check (tenant_id in (select public.user_tenant_ids()));

create policy learning_snapshots_update_tenant on public.learning_snapshots
  for update
  to authenticated
  using (tenant_id in (select public.user_tenant_ids()))
  with check (tenant_id in (select public.user_tenant_ids()));

create policy learning_snapshots_delete_tenant on public.learning_snapshots
  for delete
  to authenticated
  using (tenant_id in (select public.user_tenant_ids()));

-- ---------------------------------------------------------------------------
-- public.signal_cache
-- ---------------------------------------------------------------------------

alter table public.signal_cache enable row level security;

drop policy if exists signal_cache_tenant_all on public.signal_cache;
drop policy if exists signal_cache_select_tenant on public.signal_cache;
drop policy if exists signal_cache_insert_tenant on public.signal_cache;
drop policy if exists signal_cache_update_tenant on public.signal_cache;
drop policy if exists signal_cache_delete_tenant on public.signal_cache;

create policy signal_cache_select_tenant on public.signal_cache
  for select
  to authenticated
  using (tenant_id in (select public.user_tenant_ids()));

create policy signal_cache_insert_tenant on public.signal_cache
  for insert
  to authenticated
  with check (tenant_id in (select public.user_tenant_ids()));

create policy signal_cache_update_tenant on public.signal_cache
  for update
  to authenticated
  using (tenant_id in (select public.user_tenant_ids()))
  with check (tenant_id in (select public.user_tenant_ids()));

create policy signal_cache_delete_tenant on public.signal_cache
  for delete
  to authenticated
  using (tenant_id in (select public.user_tenant_ids()));

-- ---------------------------------------------------------------------------
-- public.opportunity_cache
-- ---------------------------------------------------------------------------

alter table public.opportunity_cache enable row level security;

drop policy if exists opportunity_cache_tenant_all on public.opportunity_cache;
drop policy if exists opportunity_cache_select_tenant on public.opportunity_cache;
drop policy if exists opportunity_cache_insert_tenant on public.opportunity_cache;
drop policy if exists opportunity_cache_update_tenant on public.opportunity_cache;
drop policy if exists opportunity_cache_delete_tenant on public.opportunity_cache;

create policy opportunity_cache_select_tenant on public.opportunity_cache
  for select
  to authenticated
  using (tenant_id in (select public.user_tenant_ids()));

create policy opportunity_cache_insert_tenant on public.opportunity_cache
  for insert
  to authenticated
  with check (tenant_id in (select public.user_tenant_ids()));

create policy opportunity_cache_update_tenant on public.opportunity_cache
  for update
  to authenticated
  using (tenant_id in (select public.user_tenant_ids()))
  with check (tenant_id in (select public.user_tenant_ids()));

create policy opportunity_cache_delete_tenant on public.opportunity_cache
  for delete
  to authenticated
  using (tenant_id in (select public.user_tenant_ids()));
