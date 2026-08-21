# Persistence — Supabase schema

**Status:** Authoritative for Wave 1 (learner-state schema only).
**Date:** 2026-05-18.
**Scope:** What Jifunze.ai stores in Supabase Postgres. Course content (prose, modules, lessons, lab specs) does **not** live here — it lives in-repo, compiled to TypeScript modules. This document covers learner state, identity, billing, and operational tables only.

---

## 1. Layering

| Layer | Where it lives | Examples |
|---|---|---|
| Course content | In-repo (TypeScript modules emitted from `content/courses/<slug>/` in Wave 2) | Module prose, lesson outcomes, lab specs |
| Learner state | Supabase Postgres | Course progress, capstone submissions, lab runs |
| Identity & billing | Supabase Auth + Stripe webhooks → Supabase | `auth.users`, `profiles`, Stripe entitlement tables |
| Operational diagnostics | Supabase RPC | `uat_db_health_check`, etc. |

Every learner-state table is keyed by `user_id` (Supabase auth UID). Post-Wave-1 there is **no `tenant_id` column** on learner-state tables; the multi-brand tenancy model was removed entirely. Team learning (Wave 6) will reintroduce an `organization_id` foreign key against a new `organizations` table — not by reviving the old `tenants`.

## 2. Tables

### 2.1 Profiles

`public.profiles` — minimal learner profile row, one per `auth.users.id`.

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | Foreign key to `auth.users.id` |
| `email` | text | |
| `display_name` | text nullable | |
| `global_access_tier` | text | One of `member | pro | workspace_admin | platform_admin | super_admin` |
| `disclaimer_acknowledged_at` | timestamptz nullable | Required before protected app areas |
| `created_at`, `updated_at` | timestamptz | |

RLS: row owner can read/update their own; admins can read all via tier check.

### 2.2 Flagship course progress

`public.flagship_course_progress` — one row per `(user_id, course_slug)`.

| Column | Type | Notes |
|---|---|---|
| `id` | uuid pk | |
| `user_id` | uuid | FK auth.users |
| `course_slug` | text | Course identifier from the catalog |
| `state` | jsonb | Per-session/per-module progress map |
| `completed_session_ids` | text[] | Completed sessions in order |
| `module_quiz_records` | jsonb | Per-module quiz attempts and scores |
| `capstone_state` | jsonb nullable | Capstone draft / submitted / accepted |
| `last_active_at` | timestamptz | |

RLS: row owner only.

### 2.3 Learner course artifacts

`public.learner_course_artifacts` — one row per `(user_id, course_slug, session_id, block_key)`.

| Column | Type | Notes |
|---|---|---|
| `id` | uuid pk | |
| `user_id` | uuid | |
| `course_slug` | text | |
| `module_id` | text | |
| `session_id` | text | |
| `block_key` | text | Session block this artifact belongs to |
| `artifact_type` | text nullable | |
| `response_text` | text | Learner's submission |
| `validation_status` | text | `draft | needs_more_work | almost_ready | accepted | strong_portfolio_evidence` |
| `validation_feedback` | text nullable | Serialized rubric feedback |
| `validation_score` | numeric nullable | |
| `accepted_as_module_evidence` | boolean | |
| `capstone_candidate` | boolean | |
| `attempt_count` | int | |
| `archived_after_module_completion` | boolean | |
| `final_evidence_text` | text nullable | |
| `metadata` | jsonb | |
| `reviewed_at`, `created_at`, `updated_at` | timestamptz | |

RLS: row owner; admins read all for review queues.

### 2.4 Learner capstone submissions

`public.learner_capstone_submissions` — one row per submission.

| Column | Type | Notes |
|---|---|---|
| `id` | uuid pk | |
| `user_id` | uuid | |
| `course_slug` | text | |
| `submission_text` | text | |
| `attached_artifact_ids` | uuid[] | References learner_course_artifacts |
| `review_status` | text | `submitted | reviewing | accepted | rejected` |
| `review_notes` | text nullable | |
| `submitted_at`, `reviewed_at` | timestamptz | |

RLS: row owner for own submissions; admins for review.

### 2.5 Learner lesson timer

`public.learner_lesson_timer` — duration tracking per `(user_id, course_slug, session_id)`.

| Column | Type | Notes |
|---|---|---|
| `id` | uuid pk | |
| `user_id` | uuid | |
| `course_slug` | text | |
| `session_id` | text | |
| `total_active_seconds` | int | |
| `last_seen_at` | timestamptz | |

### 2.6 Learner pathway preference

`public.learner_pathway_preference` — `(user_id)` → preferred pathway slug.

### 2.7 Learner self-paced progress

`public.learner_self_paced_progress` — generic progress rows for non-flagship courses (standalone full courses, library readers).

| Column | Type |
|---|---|
| `id` | uuid pk |
| `user_id` | uuid |
| `course_slug` | text |
| `lesson_slug` | text |
| `completed_at` | timestamptz |
| `metadata` | jsonb |

### 2.8 Training plans (legacy — to be reviewed in Wave 2)

`public.training_plans`, `public.training_modules`, `public.training_lessons` — the in-app training plan builder (different from the course catalog; tracks user-defined learning plans).

Post-Wave-1 (2026-05-18): these tables still reference `tenant_id` in their schema as a vestigial column. The consolidating migration in Phase 10 of Wave 1 drops the `tenant_id` columns and rewrites RLS to be user-based. Until that migration ships, the application code reads/writes these tables with `user_id` only; `tenant_id` is set to a fixed sentinel value or null.

### 2.9 Learning lab runs (placeholder for Wave 4 / Wave 5)

`public.learning_lab_runs` — preserved from earlier scaffolding. Will be the substrate for math lab runs (Wave 4) and cloud lab runs (Wave 5). Schema may evolve in those waves.

### 2.10 Teaching learning events

`public.teaching_learning_events` — best-effort mirror of learner signal events from teaching lab interactions. Optional persistence; the application functions if RLS denies inserts.

### 2.11 Stripe billing entitlements

`public.stripe_*` tables — populated by Stripe webhook ingestion. Source of truth for `my_learning_access_summary` RPC. Schema details in the Stripe webhook handler.

### 2.12 Admin diagnostics

`public.admin_*` tables / RPCs — admin-tier read-only views over learner state and system health. Includes `uat_db_health_check`, `admin_list_system_accounts_display_names`, etc.

## 3. RPCs

| Name | Purpose | Post-Wave-1 status |
|---|---|---|
| `my_effective_access_tier()` | Resolves the signed-in user's tier | **No tenant arg** (was `p_tenant_id`). Pure auth.uid() resolution. |
| `my_learning_access_summary()` | Returns Stripe entitlements, module keys, library status | **No tenant arg**. |
| `bootstrap_my_workspace_*` | Legacy workspace bootstrap RPCs | **Dropped** in Phase 10 migration. |
| `uat_db_health_check()` | Internal health probe | Unchanged. |

## 4. Row-Level Security policy summary

Every learner-state table follows the same pattern:

```sql
-- Read own rows
create policy "<table>_owner_select" on public.<table>
  for select using (auth.uid() = user_id);

-- Write own rows
create policy "<table>_owner_insert" on public.<table>
  for insert with check (auth.uid() = user_id);

create policy "<table>_owner_update" on public.<table>
  for update using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Admin-tier read for review queues (capstones, artifacts)
create policy "<table>_admin_select" on public.<table>
  for select using (
    (select global_access_tier from public.profiles where id = auth.uid())
      in ('platform_admin', 'super_admin')
  );
```

Pre-Wave-1 RLS used `tenant_members` membership checks; that pattern is gone in the consolidating migration.

## 5. Migration history

The active migration set is in `supabase/migrations/`. Wave 1 adds one consolidating migration:

- `supabase/migrations/<ts>_drop_trends_and_tenancy.sql` (Phase 10): drops trends-era tables (`brands`, `content_packages`, `signals`, `opportunities`, `social_accounts`, `tenants`, `tenant_members`), drops `tenant_id` columns from surviving learner-state tables, drops legacy RPCs, rewrites RLS policies to user-based.

Future waves will add migrations for:

- AI tutor sessions table (Wave 3)
- Lab run schema evolution (Wave 4 / Wave 5)
- Organizations / memberships / per-seat billing (Wave 6)

## 6. What is **not** in Supabase

- Course content (prose, lessons, modules). Lives in repo.
- Course catalog data. Lives in repo.
- Style guides, brief templates. Lives in repo.
- Static media assets (images, Rise packages). Lives in `public/` and CDN.

End of persistence schema.
