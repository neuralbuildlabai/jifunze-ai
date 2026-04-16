-- Runtime diagnostics for INTERNAL UAT: table existence, tenant isolation policies, and
-- authenticated role table privileges. Callable by authenticated users via PostgREST RPC.
-- Security: SECURITY DEFINER reads catalog only; does not expose row data.

create or replace function public.uat_db_health_check()
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  all_tables_ok boolean := true;
  all_policies_ok boolean := true;
  all_grants_ok boolean := true;
  tables text[] := array[
    'learning_snapshots',
    'learning_lab_runs',
    'signal_cache',
    'opportunity_cache',
    'published_content_performance'
  ];
  required_policies jsonb := jsonb_build_array(
    jsonb_build_object('table', 'learning_snapshots', 'policy', 'learning_snapshots_tenant_isolation'),
    jsonb_build_object('table', 'signal_cache', 'policy', 'signal_cache_tenant_isolation'),
    jsonb_build_object('table', 'opportunity_cache', 'policy', 'opportunity_cache_tenant_isolation')
  );
  t text;
  pol jsonb;
  pol_ok boolean;
  tbl_ok boolean;
  sel_ok boolean;
  ins_ok boolean;
  upd_ok boolean;
  out_tables jsonb := '{}'::jsonb;
  out_policies jsonb := '[]'::jsonb;
  out_grants jsonb := '{}'::jsonb;
begin
  foreach t in array tables
  loop
    tbl_ok := to_regclass(format('public.%I', t)) is not null;
    if not tbl_ok then
      all_tables_ok := false;
    end if;
    out_tables := out_tables || jsonb_build_object(t, tbl_ok);
  end loop;

  for pol in select * from jsonb_array_elements(required_policies)
  loop
    select exists (
      select 1
      from pg_policies
      where schemaname = 'public'
        and tablename = pol->>'table'
        and policyname = pol->>'policy'
    ) into pol_ok;
    if not pol_ok then
      all_policies_ok := false;
    end if;
    out_policies := out_policies || jsonb_build_array(
      jsonb_build_object(
        'table', pol->>'table',
        'policy', pol->>'policy',
        'ok', pol_ok
      )
    );
  end loop;

  foreach t in array tables
  loop
    tbl_ok := to_regclass(format('public.%I', t)) is not null;
    if tbl_ok then
      sel_ok := has_table_privilege('authenticated', format('public.%I', t), 'SELECT');
      ins_ok := has_table_privilege('authenticated', format('public.%I', t), 'INSERT');
      upd_ok := has_table_privilege('authenticated', format('public.%I', t), 'UPDATE');
    else
      sel_ok := false;
      ins_ok := false;
      upd_ok := false;
    end if;
    if not (sel_ok and ins_ok and upd_ok) then
      all_grants_ok := false;
    end if;
    out_grants := out_grants || jsonb_build_object(
      t,
      jsonb_build_object(
        'select', sel_ok,
        'insert', ins_ok,
        'update', upd_ok
      )
    );
  end loop;

  return jsonb_build_object(
    'ok', all_tables_ok and all_policies_ok and all_grants_ok,
    'tables', out_tables,
    'policies', out_policies,
    'grants', out_grants
  );
end;
$$;

grant execute on function public.uat_db_health_check() to authenticated;
