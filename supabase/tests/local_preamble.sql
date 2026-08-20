-- Local-only preamble for validating a single migration against a scratch Postgres.
-- It creates the Supabase roles and the handful of platform objects that the real project
-- already has, so a migration can be applied and inspected without a Supabase instance.
-- NOT a migration. Never applied to any real database.
do $$ begin
  if not exists (select 1 from pg_roles where rolname = 'anon') then create role anon nologin; end if;
  if not exists (select 1 from pg_roles where rolname = 'authenticated') then create role authenticated nologin; end if;
  if not exists (select 1 from pg_roles where rolname = 'service_role') then create role service_role nologin bypassrls; end if;
end $$;

create schema if not exists auth;
create or replace function auth.uid() returns uuid language sql stable as $$ select null::uuid $$;

create schema if not exists storage;
create table if not exists storage.buckets (id text primary key, name text, public boolean);
create table if not exists storage.objects (id bigserial primary key, bucket_id text, created_at timestamptz default now());

-- From 20260514120000_admin_platform_rbac.sql — the RBAC helper the social-ops policies use.
create or replace function public.my_effective_access_tier(p_ignored text default null)
returns text language sql stable as $$ select 'member'::text $$;

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public
as $$ select public.my_effective_access_tier(null) in ('platform_admin'::text, 'super_admin'::text) $$;
