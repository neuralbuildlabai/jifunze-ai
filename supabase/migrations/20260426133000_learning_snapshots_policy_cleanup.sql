-- Cleanup stale overlapping policies on learning_snapshots that caused confusing RLS behavior.
-- Keep only the unified tenant isolation policy.

alter table public.learning_snapshots enable row level security;

drop policy if exists "Allow insert for authenticated users" on public.learning_snapshots;
drop policy if exists "Insert scoped to tenant" on public.learning_snapshots;
drop policy if exists learning_snapshots_select_tenant on public.learning_snapshots;
drop policy if exists learning_snapshots_insert_tenant on public.learning_snapshots;
drop policy if exists learning_snapshots_update_tenant on public.learning_snapshots;
drop policy if exists learning_snapshots_delete_tenant on public.learning_snapshots;
drop policy if exists learning_snapshots_tenant_all on public.learning_snapshots;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'learning_snapshots'
      and policyname = 'learning_snapshots_tenant_isolation'
  ) then
    create policy learning_snapshots_tenant_isolation on public.learning_snapshots
      for all
      using (tenant_id in (select public.user_tenant_ids()))
      with check (tenant_id in (select public.user_tenant_ids()));
  end if;
end $$;
