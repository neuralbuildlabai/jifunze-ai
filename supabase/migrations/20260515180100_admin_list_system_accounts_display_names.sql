-- Prefer profiles display columns, then auth metadata, for system account listing.

create or replace function public.admin_list_system_accounts(
  p_limit int default 100,
  p_offset int default 0,
  p_search text default null
)
returns jsonb
language plpgsql
stable
security definer
set search_path = public, auth
as $$
declare
  v_search text := nullif(trim(coalesce(p_search, '')), '');
begin
  if auth.uid() is null or not public.is_super_admin() then
    raise exception 'Forbidden' using errcode = '42501';
  end if;

  if p_limit is null or p_limit < 1 or p_limit > 500 then
    p_limit := 100;
  end if;
  if p_offset is null or p_offset < 0 then
    p_offset := 0;
  end if;

  return coalesce(
    (
      select jsonb_agg(to_jsonb(s) order by s.created_at desc nulls last)
      from (
        select
          u.id as user_id,
          coalesce(
            nullif(trim(p.display_name), ''),
            nullif(trim(concat_ws(' ', nullif(trim(p.first_name), ''), nullif(trim(p.last_name), ''))), ''),
            nullif(trim(u.raw_user_meta_data->>'full_name'), ''),
            nullif(trim(u.raw_user_meta_data->>'name'), ''),
            nullif(trim(u.raw_user_meta_data->>'first_name'), '')
          ) as display_name,
          u.email,
          public._admin_internal_resolve_tier_for_uid(u.id) as effective_access_tier,
          p.global_access_tier as profile_global_access_tier,
          (public._admin_internal_resolve_tier_for_uid(u.id) = 'super_admin') as is_super_admin,
          (public._admin_internal_resolve_tier_for_uid(u.id) = 'platform_admin') as is_platform_admin,
          (public._admin_internal_resolve_tier_for_uid(u.id) in ('platform_admin', 'super_admin')) as is_admin,
          (p.id is not null) as profile_exists,
          true as auth_user_exists,
          (u.email_confirmed_at is not null) as email_confirmed,
          u.created_at,
          u.last_sign_in_at,
          (
            select max(x.ts)
            from (
              select l.updated_at as ts from public.learner_self_paced_progress l where l.user_id = u.id
              union all
              select f.updated_at from public.flagship_course_progress f where f.user_id = u.id
            ) x
          ) as last_activity_at,
          (
            array_cat(
              case
                when p.id is null then array['missing_profile']::text[]
                when public._admin_internal_resolve_tier_for_uid(u.id) = 'super_admin' and lower(trim(u.email::text)) <> 'neuralbuildlab.ai@gmail.com' then array['unexpected_super']::text[]
                else array[]::text[]
              end,
              case
                when lower(trim(u.email::text)) in ('neuralbuildlab.ai@gmail.com', 'neuralbuild.ai@gmail.com')
                  and coalesce(nullif(trim(p.first_name), ''), nullif(trim(p.last_name), ''), nullif(trim(p.display_name), '')) is null
                  and coalesce(
                    nullif(trim(u.raw_user_meta_data->>'first_name'), ''),
                    nullif(trim(u.raw_user_meta_data->>'full_name'), ''),
                    nullif(trim(u.raw_user_meta_data->>'name'), '')
                  ) is null
                then array['profile_name_missing_canonical_operator']::text[]
                else array[]::text[]
              end
            )
          ) as warnings
        from auth.users u
        left join public.profiles p on p.id = u.id
        where v_search is null
          or lower(u.email) like ('%' || lower(v_search) || '%')
          or lower(coalesce(u.raw_user_meta_data->>'full_name', u.raw_user_meta_data->>'name', '')) like ('%' || lower(v_search) || '%')
          or lower(coalesce(p.display_name, concat_ws(' ', p.first_name, p.last_name), '')) like ('%' || lower(v_search) || '%')
        order by u.created_at desc nulls last
        limit p_limit offset p_offset
      ) s
    ),
    '[]'::jsonb
  );
end;
$$;
