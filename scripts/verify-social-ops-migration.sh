#!/usr/bin/env bash
# Applies supabase/migrations/20260820120000_social_ops_core.sql to a scratch Postgres and asserts
# the resulting shape: tables, unique keys, RLS enabled everywhere, no write policy for anon or
# authenticated, and no column that could hold a plaintext token.
#
#   PGPORT=55432 scripts/verify-social-ops-migration.sh
#
# This NEVER touches a real database. It creates and drops a throwaway database on localhost.
set -euo pipefail

PGHOST="${PGHOST:-127.0.0.1}"
PGPORT="${PGPORT:-55432}"
PGUSER="${PGUSER:-postgres}"
DB="social_ops_verify_$$"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PSQL="psql -h $PGHOST -p $PGPORT -U $PGUSER -v ON_ERROR_STOP=1 -q"

cleanup() { psql -h "$PGHOST" -p "$PGPORT" -U "$PGUSER" -q -c "drop database if exists $DB" >/dev/null 2>&1 || true; }
trap cleanup EXIT

$PSQL -c "create database $DB" >/dev/null
$PSQL -d "$DB" -f "$ROOT/supabase/tests/local_preamble.sql" >/dev/null
$PSQL -d "$DB" -f "$ROOT/supabase/migrations/20260820120000_social_ops_core.sql" >/dev/null
echo "  ok  migration applies cleanly"

fail=0
assert() { # assert <name> <sql returning boolean>
  local name="$1"; shift
  local got
  got="$(psql -h "$PGHOST" -p "$PGPORT" -U "$PGUSER" -d "$DB" -tAc "$1")"
  if [ "$got" = "t" ]; then echo "  ok  $name"; else echo "  FAIL $name (got '$got')"; fail=1; fi
}

EXPECTED_TABLES="social_accounts social_account_connections content_items content_sources content_publications social_metric_snapshots sync_runs publishing_jobs publishing_attempts social_alerts content_approvals"
for t in $EXPECTED_TABLES; do
  assert "table public.$t exists" "select to_regclass('public.$t') is not null"
  assert "RLS enabled on $t" "select relrowsecurity from pg_class where oid='public.$t'::regclass"
done

assert "no write policy for anon/authenticated" \
  "select count(*)=0 from pg_policies p
    where p.schemaname='public'
      and p.tablename in ('social_accounts','social_account_connections','content_items','content_sources','content_publications','social_metric_snapshots','sync_runs','publishing_jobs','publishing_attempts','social_alerts','content_approvals')
      and p.cmd <> 'SELECT'"

assert "anon has no INSERT/UPDATE/DELETE grants" \
  "select count(*)=0 from information_schema.role_table_grants
    where grantee in ('anon','authenticated') and table_schema='public'
      and privilege_type in ('INSERT','UPDATE','DELETE')
      and table_name in ('social_accounts','social_account_connections','content_items','content_sources','content_publications','social_metric_snapshots','sync_runs','publishing_jobs','publishing_attempts','social_alerts','content_approvals')"

assert "no column looks like a plaintext token store" \
  "select count(*)=0 from information_schema.columns
    where table_schema='public'
      and table_name in ('social_accounts','social_account_connections','content_items','content_publications','publishing_jobs','publishing_attempts')
      and (column_name ~ '(access_token|refresh_token|client_secret|app_secret|password|api_key)')"

assert "metric snapshots are idempotent per window" \
  "select count(*)=1 from pg_indexes where schemaname='public' and tablename='social_metric_snapshots' and indexdef ilike '%unique%window_start%'"

assert "a content item may publish at most once per platform" \
  "select count(*)>=1 from pg_constraint where conrelid='public.content_publications'::regclass and contype='u'
     and pg_get_constraintdef(oid) ilike '%content_id, platform%'"

assert "platform post ids are unique per platform" \
  "select count(*)=1 from pg_indexes where schemaname='public' and tablename='content_publications' and indexname='content_publications_platform_post_unique'"

assert "all eleven official channels seeded" \
  "select count(*)=11 from public.social_accounts"

assert "github is not a social account" \
  "select count(*)=0 from public.social_accounts where profile_url ilike '%github%'"

assert "no calmsignal account leaked in" \
  "select count(*)=0 from public.social_accounts where profile_url ilike '%calmsignal%' or handle ilike '%calmsignal%'"

assert "x is recorded as manual-only under the no-spend rule" \
  "select manual_only from public.social_accounts where platform='x'"

assert "whatsapp channel cannot publish" \
  "select can_publish = false from public.social_accounts where platform='whatsapp_channel'"

assert "bluesky is seeded and not yet credentialled" \
  "select readiness='credentials_missing' from public.social_accounts where platform='bluesky'"

assert "public content policy requires approved AND published" \
  "select count(*)=1 from pg_policies where schemaname='public' and tablename='content_items'
     and policyname='content_items_public_read'
     and qual ilike '%approved%' and qual ilike '%published%'"

assert "retention function exists and is not granted to anon" \
  "select has_function_privilege('anon','public.prune_social_ops()','execute') = false"

# Idempotency: a migration re-run must be a no-op, not an error.
$PSQL -d "$DB" -f "$ROOT/supabase/migrations/20260820120000_social_ops_core.sql" >/dev/null
echo "  ok  migration is re-runnable (idempotent)"
assert "re-run did not duplicate seeded accounts" "select count(*)=11 from public.social_accounts"

if [ "$fail" -ne 0 ]; then echo; echo "migration verification FAILED"; exit 1; fi
echo
echo "migration verification passed"
