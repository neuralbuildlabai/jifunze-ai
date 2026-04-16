-- JifunzeAI: tenants, membership, tenant-scoped data, RLS.
-- Run via Supabase CLI or SQL editor after project creation.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Core tenant model
-- ---------------------------------------------------------------------------

create table if not exists public.tenants (
  id uuid primary key default gen_random_uuid(),
  name text not null default 'Workspace',
  created_at timestamptz not null default now()
);

create table if not exists public.tenant_members (
  tenant_id uuid not null references public.tenants (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  role text not null default 'member',
  primary key (tenant_id, user_id)
);

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  default_tenant_id uuid references public.tenants (id),
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- App data (all include tenant_id for RLS + future multi-region)
-- ---------------------------------------------------------------------------

create table if not exists public.brands (
  id text primary key,
  tenant_id uuid not null references public.tenants (id) on delete cascade,
  name text not null default 'Brand',
  created_at timestamptz not null default now()
);

create index if not exists brands_tenant_idx on public.brands (tenant_id);

create table if not exists public.published_content_performance (
  id text primary key,
  tenant_id uuid not null references public.tenants (id) on delete cascade,
  brand_profile_id text not null,
  payload jsonb not null,
  created_at timestamptz not null default now()
);

create index if not exists pcp_tenant_brand_idx on public.published_content_performance (tenant_id, brand_profile_id);

create table if not exists public.signal_cache (
  tenant_id uuid not null references public.tenants (id) on delete cascade,
  brand_profile_id text not null,
  batch jsonb,
  scored jsonb,
  updated_at timestamptz not null default now(),
  primary key (tenant_id, brand_profile_id)
);

create table if not exists public.opportunity_cache (
  tenant_id uuid not null references public.tenants (id) on delete cascade,
  brand_profile_id text not null,
  opportunities jsonb,
  updated_at timestamptz not null default now(),
  primary key (tenant_id, brand_profile_id)
);

create table if not exists public.content_items (
  id text primary key,
  tenant_id uuid not null references public.tenants (id) on delete cascade,
  brand_profile_id text not null,
  payload jsonb not null,
  created_at timestamptz not null default now()
);

create index if not exists content_items_tenant_brand_idx on public.content_items (tenant_id, brand_profile_id);

create table if not exists public.learning_snapshots (
  tenant_id uuid not null references public.tenants (id) on delete cascade,
  brand_profile_id text not null,
  payload jsonb not null,
  captured_at timestamptz not null,
  primary key (tenant_id, brand_profile_id)
);

create table if not exists public.social_accounts (
  tenant_id uuid not null references public.tenants (id) on delete cascade,
  brand_profile_id text not null,
  accounts jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now(),
  primary key (tenant_id, brand_profile_id)
);

-- ---------------------------------------------------------------------------
-- New user → workspace + membership + profile (one tenant per signup; expand later)
-- ---------------------------------------------------------------------------

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  t_id uuid;
begin
  insert into public.tenants (name) values ('My workspace') returning id into t_id;
  insert into public.tenant_members (tenant_id, user_id, role) values (t_id, new.id, 'owner');
  insert into public.profiles (id, default_tenant_id) values (new.id, t_id);
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------

alter table public.tenants enable row level security;
alter table public.tenant_members enable row level security;
alter table public.profiles enable row level security;
alter table public.brands enable row level security;
alter table public.published_content_performance enable row level security;
alter table public.signal_cache enable row level security;
alter table public.opportunity_cache enable row level security;
alter table public.content_items enable row level security;
alter table public.learning_snapshots enable row level security;
alter table public.social_accounts enable row level security;

-- Helper: tenants the current user belongs to
create or replace function public.user_tenant_ids()
returns setof uuid
language sql
stable
security definer
set search_path = public
as $$
  select tenant_id from public.tenant_members where user_id = auth.uid();
$$;

-- Idempotent RLS policies (safe when remote DB already has these names from manual setup).
drop policy if exists tenants_select_member on public.tenants;
drop policy if exists tenant_members_self on public.tenant_members;
drop policy if exists tenant_members_insert_owner on public.tenant_members;
drop policy if exists profiles_own on public.profiles;
drop policy if exists profiles_update_own on public.profiles;
drop policy if exists brands_tenant_all on public.brands;
drop policy if exists pcp_tenant_all on public.published_content_performance;
drop policy if exists signal_cache_tenant_all on public.signal_cache;
drop policy if exists opportunity_cache_tenant_all on public.opportunity_cache;
drop policy if exists content_items_tenant_all on public.content_items;
drop policy if exists learning_snapshots_tenant_all on public.learning_snapshots;
drop policy if exists social_accounts_tenant_all on public.social_accounts;

-- Tenants: members can read their tenant row
create policy tenants_select_member on public.tenants
  for select using (id in (select public.user_tenant_ids()));

-- Tenant members: users see rows where they participate
create policy tenant_members_self on public.tenant_members
  for select using (user_id = auth.uid());

create policy tenant_members_insert_owner on public.tenant_members
  for insert with check (user_id = auth.uid());

-- Profiles
create policy profiles_own on public.profiles
  for select using (id = auth.uid());
create policy profiles_update_own on public.profiles
  for update using (id = auth.uid());

-- App tables: full CRUD within tenant membership
create policy brands_tenant_all on public.brands
  for all using (tenant_id in (select public.user_tenant_ids()))
  with check (tenant_id in (select public.user_tenant_ids()));

create policy pcp_tenant_all on public.published_content_performance
  for all using (tenant_id in (select public.user_tenant_ids()))
  with check (tenant_id in (select public.user_tenant_ids()));

create policy signal_cache_tenant_all on public.signal_cache
  for all using (tenant_id in (select public.user_tenant_ids()))
  with check (tenant_id in (select public.user_tenant_ids()));

create policy opportunity_cache_tenant_all on public.opportunity_cache
  for all using (tenant_id in (select public.user_tenant_ids()))
  with check (tenant_id in (select public.user_tenant_ids()));

create policy content_items_tenant_all on public.content_items
  for all using (tenant_id in (select public.user_tenant_ids()))
  with check (tenant_id in (select public.user_tenant_ids()));

create policy learning_snapshots_tenant_all on public.learning_snapshots
  for all using (tenant_id in (select public.user_tenant_ids()))
  with check (tenant_id in (select public.user_tenant_ids()));

create policy social_accounts_tenant_all on public.social_accounts
  for all using (tenant_id in (select public.user_tenant_ids()))
  with check (tenant_id in (select public.user_tenant_ids()));
