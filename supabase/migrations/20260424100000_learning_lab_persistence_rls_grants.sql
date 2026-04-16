-- Learning Lab + trend preview persistence: same failure mode as learning_snapshots (403 on REST).
-- Ensures authenticated can execute tenant checks, has table privileges, and uses one FOR ALL
-- RLS policy per table (insert/upsert + optional returning SELECT).

grant execute on function public.user_tenant_ids() to authenticated;

grant select, insert, update, delete on table public.published_content_performance to authenticated;
grant select, insert, update, delete on table public.learning_lab_runs to authenticated;

-- ---------------------------------------------------------------------------
-- public.published_content_performance (simulated + real publish outcomes)
-- ---------------------------------------------------------------------------

alter table public.published_content_performance enable row level security;

drop policy if exists pcp_tenant_all on public.published_content_performance;
drop policy if exists pcp_tenant_isolation on public.published_content_performance;

create policy pcp_tenant_isolation on public.published_content_performance
  for all
  using (tenant_id in (select public.user_tenant_ids()))
  with check (tenant_id in (select public.user_tenant_ids()));

-- ---------------------------------------------------------------------------
-- public.learning_lab_runs (trend / lab run log)
-- ---------------------------------------------------------------------------

alter table public.learning_lab_runs enable row level security;

drop policy if exists learning_lab_runs_tenant_all on public.learning_lab_runs;
drop policy if exists learning_lab_runs_tenant_isolation on public.learning_lab_runs;

create policy learning_lab_runs_tenant_isolation on public.learning_lab_runs
  for all
  using (tenant_id in (select public.user_tenant_ids()))
  with check (tenant_id in (select public.user_tenant_ids()));
