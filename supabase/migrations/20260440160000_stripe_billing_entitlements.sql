-- Stripe-backed subscription state + refund requests (service-role writes via Edge Functions).
-- Effective access tier RPC extended to grant Pro lab access while a paid subscription is active/trialing.

-- ---------------------------------------------------------------------------
-- stripe_customers: maps Supabase users to Stripe Customer ids
-- ---------------------------------------------------------------------------
create table if not exists public.stripe_customers (
  user_id uuid primary key references auth.users (id) on delete cascade,
  stripe_customer_id text not null unique,
  created_at timestamptz not null default now()
);

comment on table public.stripe_customers is
  'Stripe Customer mapping; written by billing Edge Functions (service role).';

create index if not exists stripe_customers_customer_id_idx on public.stripe_customers (stripe_customer_id);

alter table public.stripe_customers enable row level security;

drop policy if exists stripe_customers_select_own on public.stripe_customers;
create policy stripe_customers_select_own on public.stripe_customers
  for select to authenticated
  using (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- stripe_subscription_entitlements: denormalized subscription snapshot
-- ---------------------------------------------------------------------------
create table if not exists public.stripe_subscription_entitlements (
  user_id uuid primary key references auth.users (id) on delete cascade,
  stripe_customer_id text,
  stripe_subscription_id text unique,
  status text not null,
  plan_key text not null check (plan_key in ('creator', 'team')),
  price_id text,
  current_period_end timestamptz,
  cancel_at_period_end boolean not null default false,
  updated_at timestamptz not null default now()
);

comment on table public.stripe_subscription_entitlements is
  'Latest Stripe subscription snapshot per user; updated from webhooks (service role).';

alter table public.stripe_subscription_entitlements enable row level security;

drop policy if exists stripe_subscription_entitlements_select_own on public.stripe_subscription_entitlements;
create policy stripe_subscription_entitlements_select_own on public.stripe_subscription_entitlements
  for select to authenticated
  using (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- billing_refund_requests: user-initiated refund intents (support completes in Stripe)
-- ---------------------------------------------------------------------------
create table if not exists public.billing_refund_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  status text not null default 'pending'
    check (status in ('pending', 'approved', 'denied', 'completed')),
  reason text,
  stripe_charge_or_invoice_hint text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.billing_refund_requests is
  'Refund requests initiated in-app; operations completes refunds in Stripe dashboard / support workflow.';

create index if not exists billing_refund_requests_user_id_idx on public.billing_refund_requests (user_id);

alter table public.billing_refund_requests enable row level security;

drop policy if exists billing_refund_requests_insert_own on public.billing_refund_requests;
create policy billing_refund_requests_insert_own on public.billing_refund_requests
  for insert to authenticated
  with check (auth.uid() = user_id);

drop policy if exists billing_refund_requests_select_own on public.billing_refund_requests;
create policy billing_refund_requests_select_own on public.billing_refund_requests
  for select to authenticated
  using (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- Effective access tier: Stripe subscription grants Pro while active/trialing
-- Precedence unchanged for super/platform + workspace admin via tenant role.
-- ---------------------------------------------------------------------------
create or replace function public.my_effective_access_tier(p_tenant_id uuid default null)
returns text
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  uid uuid := auth.uid();
  g text;
  profile_tid uuid;
  tid uuid;
  r text;
  sub_ok boolean := false;
begin
  if uid is null then
    return 'member';
  end if;

  select p.global_access_tier, p.default_tenant_id
  into g, profile_tid
  from public.profiles p
  where p.id = uid;

  if g = 'super_admin' then
    return 'super_admin';
  end if;
  if g = 'platform_admin' then
    return 'platform_admin';
  end if;

  tid := coalesce(p_tenant_id, profile_tid);

  if tid is not null then
    select tm.role
    into r
    from public.tenant_members tm
    where tm.user_id = uid and tm.tenant_id = tid;

    if r in ('owner', 'admin') then
      return 'workspace_admin';
    end if;
  end if;

  select exists (
    select 1
    from public.stripe_subscription_entitlements e
    where e.user_id = uid
      and e.status in ('active', 'trialing')
      and (e.current_period_end is null or e.current_period_end > now())
  )
  into sub_ok;

  if sub_ok then
    return 'pro';
  end if;

  if g = 'pro' then
    return 'pro';
  end if;

  return 'member';
end;
$$;

comment on function public.my_effective_access_tier(uuid) is
  'Returns member|pro|workspace_admin|platform_admin|super_admin for auth.uid(); optional tenant scopes workspace admin; active Stripe subscription grants pro.';

grant execute on function public.my_effective_access_tier(uuid) to authenticated;
