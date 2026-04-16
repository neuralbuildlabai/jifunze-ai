-- Append-only log of trend / learning-lab pipeline runs (audit + UI “recent runs”).
create table if not exists public.learning_lab_runs (
  id text primary key,
  tenant_id uuid not null references public.tenants (id) on delete cascade,
  brand_profile_id text not null,
  payload jsonb not null,
  ran_at timestamptz not null default now()
);

create index if not exists learning_lab_runs_tenant_brand_ran_idx
  on public.learning_lab_runs (tenant_id, brand_profile_id, ran_at desc);

comment on table public.learning_lab_runs is 'Tenant-scoped learning-lab / trend-preview run log (payload = StoredLearningLabRun JSON).';

alter table public.learning_lab_runs enable row level security;

drop policy if exists learning_lab_runs_tenant_all on public.learning_lab_runs;

create policy learning_lab_runs_tenant_all on public.learning_lab_runs
  for all using (tenant_id in (select public.user_tenant_ids()))
  with check (tenant_id in (select public.user_tenant_ids()));
