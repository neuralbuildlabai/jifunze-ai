-- Durable anonymous limiter for public `generate-public` endpoint.
create table if not exists public.public_generate_daily_usage (
  usage_day date not null,
  subject_type text not null check (subject_type in ('ip', 'browser')),
  subject_hash text not null,
  usage_count integer not null default 0 check (usage_count >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (usage_day, subject_type, subject_hash)
);

alter table public.public_generate_daily_usage enable row level security;

create or replace function public.claim_public_generate_slot(
  p_ip_hash text,
  p_browser_hash text default null,
  p_daily_cap integer default 1
)
returns table(allowed boolean, reason text)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_day date := (now() at time zone 'utc')::date;
  v_ip_count integer;
  v_browser_count integer;
begin
  if p_ip_hash is null or length(trim(p_ip_hash)) = 0 then
    return query select false, 'missing_ip_hash'::text;
    return;
  end if;
  if p_daily_cap < 1 then
    return query select false, 'invalid_daily_cap'::text;
    return;
  end if;

  select usage_count
    into v_ip_count
  from public_generate_daily_usage
  where usage_day = v_day and subject_type = 'ip' and subject_hash = p_ip_hash
  for update;

  if coalesce(v_ip_count, 0) >= p_daily_cap then
    return query select false, 'ip_daily_limit'::text;
    return;
  end if;

  if p_browser_hash is not null and length(trim(p_browser_hash)) > 0 then
    select usage_count
      into v_browser_count
    from public_generate_daily_usage
    where usage_day = v_day and subject_type = 'browser' and subject_hash = p_browser_hash
    for update;

    if coalesce(v_browser_count, 0) >= p_daily_cap then
      return query select false, 'browser_daily_limit'::text;
      return;
    end if;
  end if;

  insert into public_generate_daily_usage(usage_day, subject_type, subject_hash, usage_count)
  values (v_day, 'ip', p_ip_hash, 1)
  on conflict (usage_day, subject_type, subject_hash)
  do update set
    usage_count = public_generate_daily_usage.usage_count + 1,
    updated_at = now();

  if p_browser_hash is not null and length(trim(p_browser_hash)) > 0 then
    insert into public_generate_daily_usage(usage_day, subject_type, subject_hash, usage_count)
    values (v_day, 'browser', p_browser_hash, 1)
    on conflict (usage_day, subject_type, subject_hash)
    do update set
      usage_count = public_generate_daily_usage.usage_count + 1,
      updated_at = now();
  end if;

  return query select true, 'ok'::text;
end;
$$;

revoke all on function public.claim_public_generate_slot(text, text, integer) from public;
grant execute on function public.claim_public_generate_slot(text, text, integer) to service_role;
