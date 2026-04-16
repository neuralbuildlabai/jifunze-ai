-- Legacy installs may still have public.brand_profiles from older migrations.
-- This migration ensures public.brands exists, copies data, drops the old table, and aligns RLS.

create table if not exists public.brands (
  id text primary key,
  tenant_id uuid not null references public.tenants (id) on delete cascade,
  name text not null default 'Brand',
  created_at timestamptz not null default now()
);

create index if not exists brands_tenant_idx on public.brands (tenant_id);

alter table public.brands
  add column if not exists created_by uuid references auth.users (id) on delete set null;

do $$
begin
  if exists (
    select 1
    from information_schema.tables
    where table_schema = 'public' and table_name = 'brand_profiles'
  ) then
    insert into public.brands (id, tenant_id, name, created_at)
    select
      bp.id,
      bp.tenant_id,
      coalesce(nullif(trim(bp.profile->>'name'), ''), 'Brand'),
      bp.created_at
    from public.brand_profiles bp
    on conflict (id) do nothing;

    if exists (
      select 1
      from information_schema.columns
      where table_schema = 'public' and table_name = 'brand_profiles' and column_name = 'created_by'
    ) then
      update public.brands b
      set created_by = bp.created_by
      from public.brand_profiles bp
      where b.id = bp.id and bp.created_by is not null;
    end if;

    drop table public.brand_profiles cascade;
  end if;
end $$;

alter table public.brands enable row level security;

drop policy if exists brands_tenant_all on public.brands;

create policy brands_tenant_all on public.brands
  for all using (tenant_id in (select public.user_tenant_ids()))
  with check (tenant_id in (select public.user_tenant_ids()));
