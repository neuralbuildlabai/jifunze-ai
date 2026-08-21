-- =====================================================================================
-- Wave 1 — Drop trends/opportunities/brand-publishing subsystem and multi-brand tenancy
-- =====================================================================================
-- Date: 2026-05-18
-- Branch: chore/learning-only-rewrite
-- Authority: docs/JIFUNZE_MASTER_PLAN.md §6 Wave 1; docs/internal/WAVE_1_REWRITE_PLAN.md Phase 10.
--
-- Confirmed by owner: no production data in any of the dropped tables. This migration is
-- destructive; apply only after Wave 1 code changes are merged and verified.
--
-- This migration:
--   1. Drops trends-era tables (signals, opportunities, brands, content packages, social
--      accounts, signal ingestion batches, etc.).
--   2. Drops the multi-tenant scaffolding (tenants, tenant_members).
--   3. Drops `tenant_id` columns from surviving learner-state tables.
--   4. Drops legacy RPCs that took `p_tenant_id` parameters; re-creates them without the
--      tenant arg.
--   5. Rewrites RLS policies on learner-state tables from tenant-membership checks to
--      owner-only checks (auth.uid() = user_id).
-- =====================================================================================

begin;

-- -------------------------------------------------------------------------------------
-- 1. Drop trends-era tables (idempotent — IF EXISTS in case any were already removed)
-- -------------------------------------------------------------------------------------

-- Drop in dependency order: child rows first, then parents.

drop table if exists public.signal_ingestion_batches cascade;
drop table if exists public.signals cascade;
drop table if exists public.opportunities cascade;
drop table if exists public.content_packages cascade;
drop table if exists public.content_items cascade;
drop table if exists public.social_accounts cascade;
drop table if exists public.published_content_performance cascade;
drop table if exists public.learning_snapshots cascade;
drop table if exists public.brand_learning_state cascade;
drop table if exists public.brands cascade;

-- -------------------------------------------------------------------------------------
-- 2. Drop tenant scaffolding
-- -------------------------------------------------------------------------------------

drop table if exists public.tenant_members cascade;
drop table if exists public.tenants cascade;

-- -------------------------------------------------------------------------------------
-- 3. Drop legacy RPCs that took `p_tenant_id` (re-created without the arg below)
-- -------------------------------------------------------------------------------------

drop function if exists public.bootstrap_my_workspace cascade;
drop function if exists public.bootstrap_my_workspace_text_only cascade;
drop function if exists public.my_effective_access_tier(uuid) cascade;
drop function if exists public.my_effective_access_tier(text) cascade;
drop function if exists public.my_learning_access_summary(uuid) cascade;
drop function if exists public.my_learning_access_summary(text) cascade;

-- -------------------------------------------------------------------------------------
-- 4. Drop `tenant_id` columns from surviving learner-state tables
-- -------------------------------------------------------------------------------------
-- These tables stay; only the column is removed.

alter table if exists public.learner_course_artifacts drop column if exists tenant_id;
alter table if exists public.learner_capstone_submissions drop column if exists tenant_id;
alter table if exists public.learner_lesson_timer drop column if exists tenant_id;
alter table if exists public.learner_pathway_preference drop column if exists tenant_id;
alter table if exists public.learner_self_paced_progress drop column if exists tenant_id;
alter table if exists public.flagship_course_progress drop column if exists tenant_id;
alter table if exists public.training_plans drop column if exists tenant_id;
alter table if exists public.training_modules drop column if exists tenant_id;
alter table if exists public.training_lessons drop column if exists tenant_id;
alter table if exists public.training_assignments drop column if exists tenant_id;
alter table if exists public.training_quizzes drop column if exists tenant_id;
alter table if exists public.teaching_learning_events drop column if exists tenant_id;
alter table if exists public.learning_lab_runs drop column if exists tenant_id;
alter table if exists public.profiles drop column if exists default_tenant_id;

-- -------------------------------------------------------------------------------------
-- 5. Re-create RPCs without tenant arg (owner-resolved via auth.uid())
-- -------------------------------------------------------------------------------------

create or replace function public.my_effective_access_tier()
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  uid uuid := auth.uid();
  tier text;
begin
  if uid is null then
    return 'member';
  end if;
  select global_access_tier into tier
    from public.profiles
   where id = uid;
  return coalesce(tier, 'member');
end;
$$;

grant execute on function public.my_effective_access_tier() to anon, authenticated;

create or replace function public.my_learning_access_summary()
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  uid uuid := auth.uid();
  result jsonb;
begin
  if uid is null then
    return jsonb_build_object(
      'effectiveTier', 'member',
      'subscription', null,
      'oneTimeModuleKeys', '[]'::jsonb,
      'allLibraryActive', false,
      'entitledModuleKeys', '[]'::jsonb
    );
  end if;

  -- Resolve effective tier
  select jsonb_build_object(
    'effectiveTier', coalesce(p.global_access_tier, 'member'),
    'subscription', s.subscription_payload,
    'oneTimeModuleKeys', coalesce(s.one_time_module_keys, '[]'::jsonb),
    'allLibraryActive', coalesce(s.all_library_active, false),
    'entitledModuleKeys', coalesce(s.entitled_module_keys, '[]'::jsonb)
  )
  into result
  from public.profiles p
  left join lateral (
    -- Aggregate from Stripe-backed entitlement tables. Adjust to the actual schema.
    select
      to_jsonb(active_sub.*) as subscription_payload,
      coalesce(otp.module_keys, '[]'::jsonb) as one_time_module_keys,
      coalesce(otp.all_library, false) as all_library_active,
      coalesce(otp.entitled_module_keys, '[]'::jsonb) as entitled_module_keys
    from (
      select 1 as placeholder
    ) noop
    left join public.stripe_active_subscriptions active_sub on active_sub.user_id = p.id
    left join public.stripe_one_time_purchases otp on otp.user_id = p.id
    limit 1
  ) s on true
  where p.id = uid;

  return coalesce(result, jsonb_build_object(
    'effectiveTier', 'member',
    'subscription', null,
    'oneTimeModuleKeys', '[]'::jsonb,
    'allLibraryActive', false,
    'entitledModuleKeys', '[]'::jsonb
  ));
end;
$$;

grant execute on function public.my_learning_access_summary() to anon, authenticated;

-- -------------------------------------------------------------------------------------
-- 6. Rewrite RLS policies on surviving learner-state tables from tenant-based to
--    owner-based (auth.uid() = user_id)
-- -------------------------------------------------------------------------------------
-- Pattern: drop any tenant-based policies; ensure owner-based policies exist.
-- This is idempotent — drops are IF EXISTS and creates are CREATE OR REPLACE-style via
-- explicit DROP-then-CREATE.

do $$
declare
  t text;
  tables text[] := array[
    'learner_course_artifacts',
    'learner_capstone_submissions',
    'learner_lesson_timer',
    'learner_pathway_preference',
    'learner_self_paced_progress',
    'flagship_course_progress',
    'training_plans',
    'training_modules',
    'training_lessons',
    'training_assignments',
    'training_quizzes',
    'teaching_learning_events',
    'learning_lab_runs'
  ];
  pol text;
  policy_names text[] := array[
    'tenant_member_select',
    'tenant_member_insert',
    'tenant_member_update',
    'tenant_member_delete',
    'workspace_member_select',
    'workspace_member_insert',
    'workspace_member_update',
    'workspace_member_delete'
  ];
begin
  foreach t in array tables loop
    -- Skip tables that don't exist
    if not exists (
      select 1 from information_schema.tables
       where table_schema = 'public' and table_name = t
    ) then
      continue;
    end if;

    -- Ensure RLS is on
    execute format('alter table public.%I enable row level security', t);

    -- Drop legacy tenant-based policies if present
    foreach pol in array policy_names loop
      execute format('drop policy if exists %I on public.%I', pol, t);
    end loop;

    -- Drop existing owner policies (so this migration is idempotent on re-run)
    execute format('drop policy if exists %I on public.%I', t || '_owner_select', t);
    execute format('drop policy if exists %I on public.%I', t || '_owner_insert', t);
    execute format('drop policy if exists %I on public.%I', t || '_owner_update', t);
    execute format('drop policy if exists %I on public.%I', t || '_owner_delete', t);
    execute format('drop policy if exists %I on public.%I', t || '_admin_select', t);

    -- Owner-based policies (selecting / writing own rows)
    execute format(
      'create policy %I on public.%I for select using (auth.uid() = user_id)',
      t || '_owner_select', t
    );
    execute format(
      'create policy %I on public.%I for insert with check (auth.uid() = user_id)',
      t || '_owner_insert', t
    );
    execute format(
      'create policy %I on public.%I for update using (auth.uid() = user_id) with check (auth.uid() = user_id)',
      t || '_owner_update', t
    );
    execute format(
      'create policy %I on public.%I for delete using (auth.uid() = user_id)',
      t || '_owner_delete', t
    );

    -- Admin read for review queues
    execute format(
      'create policy %I on public.%I for select using ((select global_access_tier from public.profiles where id = auth.uid()) in (''platform_admin'', ''super_admin''))',
      t || '_admin_select', t
    );
  end loop;
end;
$$;

-- -------------------------------------------------------------------------------------
-- 7. Profiles RLS — own-row read/update; admin read of all
-- -------------------------------------------------------------------------------------

do $$
begin
  if exists (
    select 1 from information_schema.tables where table_schema = 'public' and table_name = 'profiles'
  ) then
    alter table public.profiles enable row level security;

    drop policy if exists profiles_owner_select on public.profiles;
    drop policy if exists profiles_owner_update on public.profiles;
    drop policy if exists profiles_admin_select on public.profiles;
    drop policy if exists profiles_tenant_select on public.profiles;

    create policy profiles_owner_select on public.profiles
      for select using (auth.uid() = id);

    create policy profiles_owner_update on public.profiles
      for update using (auth.uid() = id) with check (auth.uid() = id);

    create policy profiles_admin_select on public.profiles
      for select using (
        (select global_access_tier from public.profiles where id = auth.uid())
          in ('platform_admin', 'super_admin')
      );
  end if;
end;
$$;

commit;

-- =====================================================================================
-- End of migration.
-- =====================================================================================
