-- Canonical operator emails: source-of-truth tier for these accounts (not profiles.global_access_tier alone).
-- neuralbuildlab.ai@gmail.com => super_admin (only this email receives super_admin from RPC)
-- neuralbuild.ai@gmail.com   => platform_admin
-- Everyone else: existing workspace / Stripe / profile rules; never super_admin from profile alone.

create or replace function public.my_effective_access_tier(p_tenant_id uuid default null)
returns text
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  uid uuid := auth.uid();
  v_email text;
  g text;
  profile_tid uuid;
  tid uuid;
  r text;
  sub_ok boolean := false;
begin
  if uid is null then
    return 'member';
  end if;

  select lower(trim(u.email::text)) into v_email
  from auth.users u
  where u.id = uid;

  if v_email = 'neuralbuildlab.ai@gmail.com' then
    return 'super_admin';
  end if;

  if v_email = 'neuralbuild.ai@gmail.com' then
    return 'platform_admin';
  end if;

  select p.global_access_tier, p.default_tenant_id
  into g, profile_tid
  from public.profiles p
  where p.id = uid;

  -- Never promote to super_admin from profile row alone (only canonical email above).
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
  'Returns member|pro|workspace_admin|platform_admin|super_admin. Canonical emails force super/platform; profile cannot grant super_admin.';

grant execute on function public.my_effective_access_tier(uuid) to authenticated;
