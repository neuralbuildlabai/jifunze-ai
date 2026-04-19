# Training schema deployment (Supabase)

## Symptom

PostgREST returns **404** with code **`PGRST205`** (or similar) and a message like:

`Could not find the table 'public.training_plans' in the schema cache`

The app classifies this as a **deployment mismatch**: the browser is talking to a Supabase project where the **training migrations from this repository have not been applied** (or the app points at the wrong project).

This is **not** an RLS misconfiguration: the relation is missing from the API schema cache.

## In-app experience (after sprint: failure UX)

- **Schema / RPC missing** — Amber panel: *“Training is unavailable: the training database objects are not deployed…”* with owner-focused remediation. The app does **not** fall back to fake curriculum in live workspaces.
- **Derived asset DB mismatch** (`23514` on `derived_content_assets`) — Amber panel: migrate **derived_content_assets** CHECK constraints (see below) so listed asset types match `src/knowledge/types.ts` / `src/knowledge/derivedContentAssetTypes.ts`.
- **Permission / RLS** — Rose panel + retry; remediation suggests session refresh / admin role.
- **Network** — Rose panel + connectivity hint.

Diagnostics still log to the console (`classifyPostgrestError`, insert failures); secrets are never shown in UI copy.

## Root cause (typical)

**Migrations for training exist in Git** under `supabase/migrations/` but were **never applied** to the production (or staging) database that matches `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` in your Vercel/hosting env.

Less common: the frontend env targets **project A** while migrations were applied to **project B**.

## Objects the app expects (training)

Apply migrations in chronological order from the repo (dependencies chain). Training-specific files include at least:

| Migration file | Purpose |
|----------------|---------|
| `20260430150000_training_plans_mvp.sql` | `training_plans`, `training_modules`, `training_lessons`, `lesson_progress`, RLS, grants |
| `20260430160000_training_quizzes_and_plan_bundle_rpc.sql` | Quizzes, `quiz_attempts`, `create_training_plan_from_seed`, RLS, grants |
| `20260431103000_training_assignments_team_rls.sql` | `training_assignments`, manager policies |
| `20260431140000_training_knowledge_specs_and_derived_assets.sql` | `training_plan_knowledge_specs`, `derived_content_assets` (initial CHECK list) |
| `20260431180000_derived_content_asset_types_expand.sql` | **Expand** `derived_content_assets.asset_type` CHECK for facilitator/team asset types |
| `20260431190000_training_learner_intelligence_snapshots.sql` | **`training_learner_intelligence_snapshots`** — append-only weak/readiness checkpoints (no raw answers) |

Earlier migrations (tenants, `tenant_members`, `bootstrap_my_workspace`, access tier RPCs, etc.) must already exist if signup and workspace bootstrap work; **do not** skip the full history on a fresh database.

Trends and other features have separate migrations (e.g. `20260431120000_trend_insights_mvp.sql`).

## Derived content asset types (avoid drift)

**Single source of truth (app):** `DerivedContentAssetType` in `src/knowledge/types.ts` and the runtime allowlist `DERIVED_CONTENT_ASSET_TYPES` in `src/knowledge/derivedContentAssetTypes.ts`.

**Database:** `derived_content_assets` has a **CHECK** constraint on `asset_type`. If the app ships a new type without migrating the CHECK, inserts fail with Postgres **`23514`** — the UI surfaces this as an actionable amber message.

**Verify after deploy** (SQL Editor — expect one row per known type or compare to app list):

```sql
select conname, pg_get_constraintdef(oid)
from pg_constraint
where conrelid = 'public.derived_content_assets'::regclass
  and contype = 'c';
```

## Structural validation before deploy / in CI

From repo root:

```bash
npm run validate:training
```

This runs `scripts/validate-training-artifacts.ts` and checks:

- Golden **plan seed bundle** (`buildPlanSeedBundleSync`) produces a valid **knowledge spec** and **`p_seed`** shape.
- **Every** supported derived asset type can run through **`deriveDerivedAssetText`** without throwing.

**Blocking vs warnings:** the script exits **1** if any **blocking** issue exists; **warnings** print to stderr but do not fail CI unless you tighten policy later.

Run **`npm run validate:training` before** promoting a release that changes seeds, knowledge specs, or derivation logic.

## Fix (recommended): Supabase CLI

1. Install [Supabase CLI](https://supabase.com/docs/guides/cli).
2. From the repo root: `supabase login` (if needed).
3. Link this repo to the **same** project as production:
   - `supabase link --project-ref <your-project-ref>`
4. Push migrations:
   - `supabase db push`
5. Verify tables and RPC — see **Verify project alignment** below.

## Fix (alternative): SQL Editor

If you cannot use the CLI, run the contents of each migration file in **`supabase/migrations/`** in **lexicographic (timestamp) order** on the target database. Do not reorder files.

## Verify project alignment

- **Project ref** appears in `VITE_SUPABASE_URL` as `https://<ref>.supabase.co`.
- Run `npm run verify:training-schema` locally (reads `.env` URL only) to print the ref the dev build uses.
- Ensure Vercel **Production** env vars use that same URL.

### SQL checklist (staging/prod)

Use `scripts/verify-training-schema.sql` in the Supabase SQL Editor (same project as the app). Expect **ok** / **create_training_plan_from_seed: ok**.

## PostgREST schema cache

After DDL, PostgREST usually reloads automatically. If you still see `schema cache` errors after applying SQL, trigger a project restart or wait briefly (Supabase-hosted projects refresh; if self-hosted, reload PostgREST config).

## Post-deploy smoke (training)

1. Open `/training` — list loads without amber schema banner.
2. Create a plan (live workspace) — RPC succeeds.
3. Open plan detail → **Preview** a derived asset → **Save to workspace** using a facilitator type **after** migration `20260431180000` — insert succeeds.

## References in code

- Client queries: `src/training/supabaseTraining.ts`
- Error classification: `src/training/trainingErrors.ts` (`schema_missing`, `constraint`, `permission`, …)
- Shared alert UI: `src/components/training/TrainingInlineAlert.tsx`, `src/training/trainingErrorUi.ts`
- Asset type allowlist: `src/knowledge/derivedContentAssetTypes.ts`
