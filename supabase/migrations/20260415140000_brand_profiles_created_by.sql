-- Filename kept for migration-history stability; targets public.brands when present.
-- On legacy DBs that still only have public.brand_profiles, this is a no-op until
-- 20260416120000_migrate_brand_profiles_to_brands.sql creates public.brands.

do $$
begin
  if to_regclass('public.brands') is not null then
    execute
      'alter table public.brands add column if not exists created_by uuid references auth.users (id) on delete set null';
    execute format(
      'comment on column public.brands.created_by is %L',
      'auth.users id of the member who inserted this row; null for legacy or seeded rows.'
    );
  end if;
end $$;
