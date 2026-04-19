-- Workspace identity + lightweight retention fields.
-- last_active_at: rolling activity for free-tier messaging; subscribers treated as always-on.
-- archived_at: reserved for future soft-expiry jobs (not auto-set by this RPC).

alter table public.tenants
  add column if not exists last_active_at timestamptz;

alter table public.tenants
  add column if not exists archived_at timestamptz;

update public.tenants
set last_active_at = coalesce(last_active_at, created_at, now())
where last_active_at is null;

alter table public.profiles
  add column if not exists plan_tier text not null default 'free';

alter table public.profiles
  drop constraint if exists profiles_plan_tier_check;

alter table public.profiles
  add constraint profiles_plan_tier_check
  check (plan_tier in ('free', 'subscriber'));

-- Owners may update their tenant row (workspace label, soft-archive fields when granted).
drop policy if exists tenants_update_owner on public.tenants;
create policy tenants_update_owner on public.tenants
  for update using (
    id in (select public.user_tenant_ids())
    and owner_user_id = auth.uid()
  )
  with check (
    id in (select public.user_tenant_ids())
    and owner_user_id = auth.uid()
  );

comment on column public.tenants.last_active_at is
  'Rolling last activity — used for free-tier retention messaging (refresh on each visit).';
comment on column public.tenants.archived_at is
  'Optional soft-archive timestamp for future expiry flows; prefer soft-delete over hard delete.';
comment on column public.profiles.plan_tier is
  'free | subscriber — subscribers skip free-tier inactivity messaging.';

-- Record a visit: refresh last_active_at; subscribers clear archived_at if set.
create or replace function public.touch_my_workspace_activity()
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  uid uuid := auth.uid();
  tid uuid;
  tier text;
  now_ts timestamptz := now();
begin
  if uid is null then
    raise exception 'Not authenticated';
  end if;

  select p.default_tenant_id, coalesce(nullif(trim(p.plan_tier), ''), 'free')
  into tid, tier
  from public.profiles p
  where p.id = uid;

  if tid is null then
    return jsonb_build_object('ok', false, 'reason', 'no_default_tenant');
  end if;

  if not exists (
    select 1 from public.tenant_members m
    where m.tenant_id = tid and m.user_id = uid
  ) then
    return jsonb_build_object('ok', false, 'reason', 'not_a_member');
  end if;

  if tier = 'subscriber' then
    update public.tenants
    set last_active_at = now_ts,
        archived_at = null
    where id = tid;
  else
    update public.tenants
    set last_active_at = now_ts
    where id = tid;
  end if;

  return jsonb_build_object(
    'ok', true,
    'tenant_id', tid,
    'plan_tier', tier
  );
end;
$$;

comment on function public.touch_my_workspace_activity() is
  'Updates tenants.last_active_at on each visit; subscribers also clear archived_at.';

grant execute on function public.touch_my_workspace_activity() to authenticated;

-- Friendlier default workspace names for new auth signups (deterministic per user id).
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  t_id uuid;
  picked text;
begin
  picked := (
    array[
      'My Content Studio',
      'My Teaching Workspace',
      'My Brand Lab',
      'Jifunze AI Workspace'
    ]
  )[1 + mod(abs(hashtext(new.id::text)), 4)];

  insert into public.tenants (name, owner_user_id)
  values (picked, new.id)
  returning id into t_id;
  insert into public.tenant_members (tenant_id, user_id, role) values (t_id, new.id, 'owner');
  insert into public.profiles (id, default_tenant_id) values (new.id, t_id);
  return new;
end;
$$;
