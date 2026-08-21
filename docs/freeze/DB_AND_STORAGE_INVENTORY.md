# Database and storage freeze inventory

**Date:** 2026-08-21 · **Rule:** applied migrations are never edited or deleted; the active
branch keeps every migration file; the pivot removes only *callers*. No destructive production
database or storage operation is part of the pivot implementation.

Classifications: **Preserve unchanged** · **Back up & disconnect** · **Disable** ·
**Shared — must retain** · **Future removal candidate** · **Uncertain**.

| Object / area | Kind | Classification | Action taken by the pivot | Deferred owner action |
|---|---|---|---|---|
| Training/learning tables (`training_plans`, quizzes/curriculum/knowledge-spec/placement/practice-bundle/intelligence-snapshot tables, `learning_lab_runs`, `teaching_learning_events`, learning snapshots/cache, readiness quizzes, `learner_pathway_preferences`) | Tables (~15 migrations `202604*`–`202605*`) | Back up & disconnect | Every client call site removed; rows untouched | `supabase db dump` (schema+data) before merging; future removal only after a separately approved decision |
| Flagship/course progress tables (`*_flagship_course_progress`, mastery, module quiz, `learner_course_artifacts`, capstone submissions, lesson timer, self-paced progress) | Tables | Back up & disconnect | Call sites removed | Same dump |
| Stripe tables (`stripe_customers`, `stripe_subscription_entitlements`, `billing_refund_requests`, `stripe_module_purchases`, `my_learning_access_summary`) | Tables/views — financial records | Preserve unchanged + disconnect | No app reads/writes remain | Include in backup; never modify |
| `stripe-checkout`, `stripe-portal`, `stripe-webhook` | Edge Functions | Disable | Removed from the active branch (archive keeps the code); never deployed again | Disable the webhook endpoint in the Stripe dashboard; rotate the webhook secret (recommended) |
| Course RPCs (`admin_search_learners`, `admin_get_platform_metrics`, plan-bundle, diagnostics/health with course logic) | Functions | Back up & disconnect | No callers remain; left in DB | — |
| `is_admin()`, `is_platform_admin()`, `my_effective_access_tier`, profiles/tenants/RBAC/access-tier objects (`20260414`, `20260430*`, `20260514` in part, `20260515180000`) | Functions/tables/policies | **Shared — must retain** | Untouched; the admin guard and social-ops RLS depend on them. Migration `20260514120000_admin_platform_rbac` also creates course tables — file retained untouched; this split is the documented exception | — |
| Course RLS policies | RLS | Preserve unchanged | Inert once no client touches the tables | — |
| `signal_sources`, `ingested_signals`, `instagram_publish_log`, `instagram_token_state`, `content_opportunities` | Tables | Shared — must retain | Engine core; untouched | — |
| Social-ops schema (11 tables + `prune_social_ops`), migration `20260820120000_social_ops_core.sql` | Migration (NOT yet applied to production) | Shared — must retain | Pillar CHECK constraint updated **in the unapplied migration file only** (legitimate: it has never run anywhere) | Apply only in the separately authorized connection phase |
| `public_generate_daily_usage`, `trend_insights_mvp` | Tables (retired SaaS) | Future removal candidate | Untouched | Note for future cleanup |
| pg_cron jobs (`ingest-signals-hourly`, `prune-signals-nightly` — documented SQL, believed not created; any course jobs) | Scheduled jobs | Disable / verify off | Nothing created or enabled | `select * from cron.job` read-only check during the connection phase |
| `capstone_submissions` bucket (+ 3 storage RLS policies) | Storage | Back up & disconnect | No app access remains | Export contents alongside the DB dump |
| `reels` bucket (+ `prune_reels()`) | Storage | Shared — must retain | Engine output; untouched | — |

## How "no reads, no writes" is proven

1. **Static:** `scripts/test-social-ops.ts` includes a frozen-schema denylist grep asserting no
   active source file references frozen table/bucket/RPC names.
2. **Bundle:** the CI needle scan over `dist/` includes the same denylist.
3. **Type:** `tsc -b` passes with every course data module deleted — no import path remains.
4. **Runtime posture:** frozen tables keep learner-scoped RLS; the browser runs under the anon
   key; no learner sessions can be created once signup is removed; service-role access exists
   only in Edge Functions, and the three Stripe functions are undeployed.
5. **E2E:** retired-route specs assert `/learn*`, `/pricing`, `/auth/sign-up` return intentional
   retired responses, not application data.

## Future (separately authorized) removal sequence — documented, NOT executed

1. Owner backup: `supabase db dump --schema public` + storage export of `capstone_submissions`.
2. Verify a week of zero activity on frozen tables (`pg_stat_user_tables`, PostgREST logs).
3. Write reviewed `drop`-phase migrations in a dedicated PR (never editing applied files).
4. Apply in staging, verify, then production — each step owner-approved.
5. Delete `capstone_submissions` bucket last, after the dump is verified restorable.
