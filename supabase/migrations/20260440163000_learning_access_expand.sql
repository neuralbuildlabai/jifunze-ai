-- Expand Stripe entitlement rows + module purchases + learning access RPC.
-- Broadens plan_key constraint and adds structured columns for granular SKUs.

alter table public.stripe_subscription_entitlements
  drop constraint if exists stripe_subscription_entitlements_plan_key_check;

alter table public.stripe_subscription_entitlements
  add column if not exists sku_key text,
  add column if not exists product_kind text,
  add column if not exists billing_interval text,
  add column if not exists access_scope text,
  add column if not exists module_keys text[],
  add column if not exists discount_tag text;

update public.stripe_subscription_entitlements
set sku_key = plan_key
where sku_key is null;

-- ---------------------------------------------------------------------------
-- One-time / permanent module purchases (Checkout mode=payment)
-- ---------------------------------------------------------------------------
create table if not exists public.stripe_module_purchases (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  module_key text not null,
  sku_key text not null,
  stripe_payment_intent_id text,
  created_at timestamptz not null default now(),
  unique (user_id, module_key)
);

comment on table public.stripe_module_purchases is
  'Module-scoped purchases from Stripe Checkout (payment mode); service role inserts via webhooks.';

alter table public.stripe_module_purchases enable row level security;

drop policy if exists stripe_module_purchases_select_own on public.stripe_module_purchases;
create policy stripe_module_purchases_select_own on public.stripe_module_purchases
  for select to authenticated
  using (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- Refund requests: optional SKU reference for operational routing
-- ---------------------------------------------------------------------------
alter table public.billing_refund_requests
  add column if not exists product_sku text;

-- ---------------------------------------------------------------------------
-- Learning access summary for library/module gating (UI + future server checks)
-- ---------------------------------------------------------------------------
create or replace function public.my_learning_access_summary(p_tenant_id uuid default null)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  uid uuid := auth.uid();
  effective text;
  sub_row public.stripe_subscription_entitlements%rowtype;
  sub_active boolean := false;
  one_time_modules text[];
  subscription_modules text[];
  entitled text[];
  merged text[];
  all_lib boolean := false;
  flagships text[] := array[
    'ai_foundations',
    'machine_learning',
    'everyday_chatbots',
    'cybersecurity',
    'cloud_devops'
  ];
begin
  if uid is null then
    return jsonb_build_object(
      'effectiveTier', 'member',
      'subscription', null,
      'oneTimeModuleKeys', '[]'::jsonb,
      'entitledModuleKeys', '[]'::jsonb,
      'allLibraryActive', false
    );
  end if;

  effective := public.my_effective_access_tier(p_tenant_id);

  select *
  into sub_row
  from public.stripe_subscription_entitlements e
  where e.user_id = uid
    and e.status in ('active', 'trialing')
    and (e.current_period_end is null or e.current_period_end > now())
  limit 1;

  sub_active := found;

  select coalesce(array_agg(distinct module_key order by module_key), array[]::text[])
  into one_time_modules
  from public.stripe_module_purchases p
  where p.user_id = uid;

  if sub_active then
    if coalesce(sub_row.access_scope, '') = 'all_library'
      or coalesce(sub_row.sku_key, sub_row.plan_key) like 'all_access%' then
      all_lib := true;
      subscription_modules := flagships;
    elsif sub_row.module_keys is not null then
      subscription_modules := sub_row.module_keys;
    else
      subscription_modules := array[]::text[];
    end if;

    -- Legacy Creator/Team monthly SKUs grant Pro-tier surfaces but do not imply scoped module lists here.
    if coalesce(sub_row.plan_key, '') in ('creator', 'team')
      and coalesce(sub_row.access_scope, '') = ''
      and sub_row.module_keys is null then
      all_lib := false;
      subscription_modules := array[]::text[];
    end if;
  else
    subscription_modules := array[]::text[];
    all_lib := false;
  end if;

  merged := (
    select coalesce(array_agg(distinct x order by x), array[]::text[])
    from unnest(coalesce(subscription_modules, array[]::text[]) || coalesce(one_time_modules, array[]::text[])) as t(x)
  );

  entitled := case when all_lib then flagships else merged end;

  return jsonb_build_object(
    'effectiveTier', effective,
    'subscription', case when sub_active then to_jsonb(sub_row) else null end,
    'oneTimeModuleKeys', coalesce(to_jsonb(one_time_modules), '[]'::jsonb),
    'entitledModuleKeys', coalesce(to_jsonb(entitled), '[]'::jsonb),
    'allLibraryActive', coalesce(all_lib, false)
  );
end;
$$;

comment on function public.my_learning_access_summary(uuid) is
  'JSON summary of tier, active subscription snapshot, module purchases, and merged module entitlements.';

grant execute on function public.my_learning_access_summary(uuid) to authenticated;
