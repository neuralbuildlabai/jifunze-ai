-- learning_snapshots (and related cache tables): fix 403 on POST upsert from PostgREST.
--
-- Root causes addressed:
-- 1) Policies created "TO authenticated" can fail to bind in some PostgREST/JWT paths; policies
--    without TO apply to all roles and still deny anon (empty user_tenant_ids()).
-- 2) INSERT ... ON CONFLICT DO UPDATE (Supabase upsert) requires SELECT + UPDATE + INSERT RLS
--    paths; a single FOR ALL policy matches Postgres RLS semantics for upserts reliably.
-- 3) Explicit GRANTs avoid missing table privileges on some projects.

grant execute on function public.user_tenant_ids() to authenticated;

grant select, insert, update, delete on table public.learning_snapshots to authenticated;
grant select, insert, update, delete on table public.signal_cache to authenticated;
grant select, insert, update, delete on table public.opportunity_cache to authenticated;

-- ---------------------------------------------------------------------------
-- public.learning_snapshots
-- ---------------------------------------------------------------------------

alter table public.learning_snapshots enable row level security;

drop policy if exists learning_snapshots_tenant_all on public.learning_snapshots;
drop policy if exists learning_snapshots_tenant_isolation on public.learning_snapshots;
drop policy if exists learning_snapshots_select_tenant on public.learning_snapshots;
drop policy if exists learning_snapshots_insert_tenant on public.learning_snapshots;
drop policy if exists learning_snapshots_update_tenant on public.learning_snapshots;
drop policy if exists learning_snapshots_delete_tenant on public.learning_snapshots;

create policy learning_snapshots_tenant_isolation on public.learning_snapshots
  for all
  using (tenant_id in (select public.user_tenant_ids()))
  with check (tenant_id in (select public.user_tenant_ids()));

-- ---------------------------------------------------------------------------
-- public.signal_cache (trend preview persistence)
-- ---------------------------------------------------------------------------

alter table public.signal_cache enable row level security;

drop policy if exists signal_cache_tenant_all on public.signal_cache;
drop policy if exists signal_cache_tenant_isolation on public.signal_cache;
drop policy if exists signal_cache_select_tenant on public.signal_cache;
drop policy if exists signal_cache_insert_tenant on public.signal_cache;
drop policy if exists signal_cache_update_tenant on public.signal_cache;
drop policy if exists signal_cache_delete_tenant on public.signal_cache;

create policy signal_cache_tenant_isolation on public.signal_cache
  for all
  using (tenant_id in (select public.user_tenant_ids()))
  with check (tenant_id in (select public.user_tenant_ids()));

-- ---------------------------------------------------------------------------
-- public.opportunity_cache
-- ---------------------------------------------------------------------------

alter table public.opportunity_cache enable row level security;

drop policy if exists opportunity_cache_tenant_all on public.opportunity_cache;
drop policy if exists opportunity_cache_tenant_isolation on public.opportunity_cache;
drop policy if exists opportunity_cache_select_tenant on public.opportunity_cache;
drop policy if exists opportunity_cache_insert_tenant on public.opportunity_cache;
drop policy if exists opportunity_cache_update_tenant on public.opportunity_cache;
drop policy if exists opportunity_cache_delete_tenant on public.opportunity_cache;

create policy opportunity_cache_tenant_isolation on public.opportunity_cache
  for all
  using (tenant_id in (select public.user_tenant_ids()))
  with check (tenant_id in (select public.user_tenant_ids()));
