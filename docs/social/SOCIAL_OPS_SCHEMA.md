# Social operations database schema

**Migration:** `supabase/migrations/20260820120000_social_ops_core.sql`
**Verifier:** `npm run social:verify-migration` (applies it to a throwaway Postgres and asserts the
resulting shape — see below). **Not applied to any real database by this work.**

## Tables

| Table | Purpose | Natural key / idempotency |
|---|---|---|
| `social_accounts` | One row per official channel + its capabilities | `platform` |
| `social_account_connections` | Connection and **token health**. Never a token | `platform` |
| `content_items` | The canonical content ledger | `id`, unique `slug` |
| `content_sources` | Attribution for anything derived from a source | unique `(content_id, url)` |
| `content_publications` | Where an item was published and how it is doing | unique `(content_id, platform)`, unique `idempotency_key`, unique `(platform, platform_post_id)` where the id is not null |
| `social_metric_snapshots` | Timestamped history, account and post | unique `(platform, subject_type, subject_id, window_start)` |
| `sync_runs` | One row per sync run | `id` = `sync-<window start ISO>` |
| `publishing_jobs` | The publish queue | unique `(content_id, platform)` |
| `publishing_attempts` | Audit of every attempt | unique `(job_id, attempt_number)` |
| `social_alerts` | Alert stream | partial index on unresolved |
| `content_approvals` | Who approved what, when | indexed by content and time |

Names follow this repo's existing convention: `public.` schema, snake_case, `created_at` /
`updated_at` timestamps, CHECK constraints rather than Postgres enums (matching
`instagram_publish_log`, `content_opportunities` and the training tables).

## Requirements, and where each is met

| Requirement | How |
|---|---|
| Idempotency | Every scheduled-writer table has a natural unique key. A re-run inside the same two-hour window upserts |
| Unique platform post identifiers | Partial unique index `content_publications_platform_post_unique` on `(platform, platform_post_id)` |
| Historical metric snapshots | `social_metric_snapshots` is append-only per window, never overwritten across windows |
| **No plaintext tokens in normal tables** | There is no token column anywhere. `social_account_connections` holds `token_expires_at`, `token_refreshed_at` and `token_fingerprint` (at most the last 6 characters). Verified by a test and by the migration verifier |
| Encrypted / external secret storage | Token values live in Supabase secrets and GitHub Actions secrets, outside Postgres entirely |
| Clear token-expiration fields | `token_expires_at`, surfaced with a 7-day warning and an explicit "expired" state |
| Per-platform capabilities | `reads_account_metrics`, `reads_post_metrics`, `can_publish`, `readiness` |
| Manual-only platform status | `manual_only` — true for WhatsApp Channel and, under the no-spend rule, X |
| Audit timestamps | `created_at` / `updated_at` throughout; `started_at` / `finished_at` on runs and attempts |
| Error summaries without secret leakage | `last_error_summary`, `error_summary` — producers run everything through `safeErrorSummary()`, which redacts token-shaped substrings |
| Appropriate indexes | Public-content partial index, pillar index, sync lookup index, due-jobs index, recent-runs index, open-alerts partial index |
| Row-level access controls | See below |
| Retention rules documented | See below, and `public.prune_social_ops()` |

## Row Level Security

RLS is enabled on all eleven tables. **No INSERT, UPDATE or DELETE policy exists for any role** —
every write goes through the service role, which bypasses RLS.

| Role | May read |
|---|---|
| `anon`, `authenticated` | `content_items`, `content_sources`, `content_publications` — **only** rows that are `approval_status = 'approved'` AND `publication_status = 'published'` (and, for publications, `status = 'published'` with a URL) |
| `authenticated` where `public.is_admin()` | everything operational |
| `service_role` | everything, by bypassing RLS |

`public.is_admin()` comes from `20260514120000_admin_platform_rbac.sql` and returns true only for
`platform_admin` and `super_admin`.

## Retention

| Table | Keep | Why |
|---|---|---|
| `social_metric_snapshots` | 400 days | Year-over-year comparison, then drop |
| `sync_runs` | 90 days | Operational debugging only |
| `publishing_attempts` | 180 days | Long enough to investigate a bad month |
| `social_alerts` | 180 days once resolved; unresolved kept indefinitely | An unresolved alert must never age out silently |
| `content_items`, `content_publications` | forever | It is the ledger |

`public.prune_social_ops()` applies these. It is service-role only, is **not** scheduled by the
migration, and returns a row count per table so a run is auditable.

## Personal data

None of these tables stores personal data about a visitor or a learner. `content_approvals.decided_by`
holds an operator's `auth.uid()` and nothing else. Metrics are aggregate counters returned by
platform APIs; no per-viewer identifier is fetched or stored.

## Verifying the migration locally

`scripts/verify-social-ops-migration.sh` creates a throwaway database, applies
`supabase/tests/local_preamble.sql` (Supabase roles + `public.is_admin()`), applies the migration,
then asserts: every table exists with RLS on · no non-SELECT policy for `anon`/`authenticated` ·
no INSERT/UPDATE/DELETE grants to them · no column name that could hold a plaintext token · the
idempotency and duplicate-protection keys · all ten channels seeded · no GitHub and no CalmSignal
row · X marked manual-only · WhatsApp unable to publish · the public policy requiring both approval
and publication · the retention function not granted to `anon`. Finally it applies the migration a
second time to prove it is re-runnable without error or duplication.
