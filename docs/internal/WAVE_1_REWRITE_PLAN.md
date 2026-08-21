# Wave 1 — Strip-and-Clean Rewrite Plan

**Status:** Active. Wave 1 in progress.
**Date:** 2026-05-18.
**Authority:** This plan implements the Wave 1 scope defined in `docs/JIFUNZE_MASTER_PLAN.md` §6 Wave 1. Where this document differs from the master plan, the master plan wins.
**Goal:** Remove the trends/opportunities/brand-publishing subsystem and the multi-brand tenant model. Disambiguate the misnamed `services/learning/` folder. End Wave 1 with a learning-only codebase that supports the locked 50-course catalog without carrying any non-goal code.

---

## Locked decisions (from Phase 0 conversation)

These are committed for the duration of Wave 1. Changing any of these requires an amendment to this document.

1. **Branch strategy.** Single long-lived branch `chore/learning-only-rewrite`. One squash-merge PR at the end of Wave 1. No interim merges to `main`.
2. **Redirect retention.** All four legacy redirects (`/trends`, `/ideas`, `/studio`, `/insights`) are dropped. No deprecation window. 404 is acceptable for stale links.
3. **Supabase tables.** Tables backing the trends subsystem (`brands`, `content`, `social_*`, `tenants`, `tenant_members`) are dropped via a single consolidating migration at the *end* of Wave 1, after code-side changes are merged. Confirmed: no production data.
4. **Workspace/tenant.** Removed entirely. The codebase becomes single-user (every learner is their own implicit context). Multi-tenant for learning *teams* will be rebuilt cleanly in Wave 6 as a different schema; we do not refactor the brand-tenancy model into a learner-org model.
5. **Training/ markdown corpus.** Not touched in Wave 1. Routed through the new publishing pipeline in Wave 2.
6. **Pre-removal tag.** None. The branch's own history is the recovery path.
7. **Naming collision in `src/services/learning/`.** Real course-progress code is moved to `src/services/learnerState/`; trends-loop code in that folder is deleted. This is non-negotiable — it is the single most important refactor in Wave 1.

---

## Phase sequence (10 phases)

Each phase has a goal, scope, exit criteria, and risks. Phases proceed sequentially. We do not begin a phase until the previous phase's exit criteria are met.

### Phase 1 — Inventory and baseline ✅ in progress

**Goal.** Generate the working documents and baseline reports every subsequent phase references. No code changes.

**Scope.**
- Create `docs/internal/WAVE_1_REWRITE_PLAN.md` (this document).
- Create `docs/internal/TRENDS_REMOVAL_INVENTORY.md` (file-by-file deletion list).
- Capture baseline reports against `main`:
  - `npm run typecheck` output
  - `npm run build` output
  - `npm run lint` output
  - `npm run test` output (if a test script exists)
  - `npm run audit:active-courses` output
  - Listing of all routes from `App.tsx`
  - Bundle size baseline (`du -sh dist/`)
- Save baseline reports to `docs/internal/BASELINE_2026-05-18/` for diff comparison post-Wave-1.
- Create branch `chore/learning-only-rewrite` from current `main`.

**Exit criteria.**
- Both internal docs committed to the branch.
- Baseline reports captured and committed.
- Branch exists and is checked out.
- No code changes made.

**Risks.** None — pure documentation phase.

### Phase 2 — Documentation rewrite ✅ already complete

**Goal.** Surface-level documentation reflects the learning-only product before code changes start. Prevents drift in subsequent phases.

**Status.** Complete as of 2026-05-18, ahead of formal Wave 1 start:
- `PROJECT_CONTEXT.md` rewritten.
- `README.md` rewritten.
- `docs/JIFUNZE_MASTER_PLAN.md` created and amended for high-school audience.
- All trends-era docs purged.
- `docs/internal/COURSE_CATALOG_PLAN.md` created and locked at 50 courses.

**Exit criteria.** ✅ Met. No remaining work in this phase.

### Phase 3 — Remove dormant UI entry points

**Goal.** Delete the trends-era UI components that no longer have routes pointing at them and the four legacy redirects.

**Scope.** Files removed from `src/components/` and routes removed from `App.tsx`:
- `ContentGenerator.tsx`
- `HomePublicGeneratePanel.tsx`
- `PublicGeneratePage.tsx`
- `InternalUatDiagnostics.tsx`
- `WorkspaceOpportunityCard.tsx`
- `src/components/trends/` (empty directory)
- Routes for `/trends`, `/ideas`, `/studio`, `/insights` (the four redirect declarations)
- Routes for `/training`, `/training/*`, `/team/*`, `/library` (existing redirects to `/learn` — also deleted; if those paths are referenced anywhere, they 404)
- The corresponding `import` statements in `App.tsx`

**Read first.** Before deleting `ContentGenerator.tsx` etc., grep for component references with `grep -r '<ContentGenerator\|HomePublicGeneratePanel\|PublicGeneratePage\|InternalUatDiagnostics\|WorkspaceOpportunityCard' src/`. If any are used by `HomeEntryPage` or another live component, those references must be removed first (likely in the same commit).

**Exit criteria.**
- `npm run typecheck` clean.
- `npm run build` clean.
- Manual smoke: `/`, `/learn`, `/learn/courses/ai-essentials`, `/library/ai-foundations` all render without console errors.
- The four legacy redirect paths return 404.

**Risks.**
- `HomeEntryPage` may render one of these components. Read it first.
- `HomePublicGeneratePanel` name suggests it's used on `/`. Confirm before delete.

### Phase 4 — Disambiguate `src/services/learning/`

**Goal.** Separate real course-progress code from trends-loop code that's misleadingly co-located. This is the single highest-stakes phase in Wave 1.

**Scope.**
1. Create `src/services/learnerState/`.
2. Move these files (real learner state, keep):
   - `flagshipCourseProgressRemote.ts`
   - `learnerCapstoneSubmissionsRemote.ts`
   - `learnerCourseArtifactsRemote.ts`
   - `learnerLessonTimeRemote.ts`
   - `buildRecommendations.ts` (verify it's progress-focused, not trends-focused, before moving)
3. Update all imports across `src/` to point to the new location. The codebase-wide `grep "from '.*services/learning/'"` should return zero references to the old path after this step.
4. Update `src/services/learning/index.ts` to re-export only the survivors (those moved to `learnerState`).
5. Mark the following files for deletion in Phase 6 (do not delete in Phase 4 — they may still be imported by trends code we haven't removed yet):
   - `analyzePerformance.ts`
   - `appendSimulatedPerformanceFromTrendBatch.ts`
   - `applyLearningFeedback.ts`
   - `buildLearningVisibility.ts`
   - `learningContext.ts`
   - `learningMemoryRowWeight.ts`
   - `performanceMemoryStore.ts`
   - `seedDemoLearningData.ts`
   - any other file in the folder not on the keep list

**Read first.** For each file in `src/services/learning/`, examine imports. If it imports from any of `types/{signal,opportunity,brand,trendCategory,autonomy,performanceLearning,adaptationPlatform}` or from `services/{signals,trends,opportunities,autonomy,brands,relevance,platforms,publishing}`, it is trends-loop. If it imports only from `learner*`, `flagshipCourse*`, `lib/supabase`, it is real learner state.

**Same disambiguation pass for adjacent contaminated folders.**
- `src/services/teaching/` — likely fully trends-era (teaching-of-content, not teaching-of-courses). Mark for full deletion in Phase 6 after verifying no learner-side imports.
- `src/services/conversion/` — funnel/CTA logic for posted content. Mark for full deletion in Phase 6.

**Exit criteria.**
- `src/services/learnerState/` exists with the kept files.
- No file in `learnerState/` imports from any deleted-list type or service.
- `npm run typecheck` clean.
- All learner-side functionality (course progress, capstone submissions, lesson timer, artifacts) still works.

**Risks.**
- **High:** mis-classifying a file. A trends-loop file that imports a learner-state type, or vice versa, could be moved incorrectly. The grep before deletion catches missed dependencies.
- Imports across `src/` may be deeper than expected. Plan extra time for import fix-ups.

### Phase 5 — Delete the pure trends subsystem

**Goal.** Mass deletion of every file that exists to serve a non-goal. After this phase the codebase should have no trends-era code remaining (the tenant model still survives at this point — Phase 6 handles that).

**Scope.** Deletes the buckets listed in `docs/internal/TRENDS_REMOVAL_INVENTORY.md` sections A–F. Summary:
- All of `src/services/signals/`, `services/trends/`, `services/opportunities/`, `services/autonomy/`, `services/relevance/`, `services/mediaPlanning/`, `services/creative/`, `services/simulation/`, `services/platforms/`, `services/publishing/`, `services/pipeline/`, `services/brands/`, `services/teaching/`, `services/conversion/`, `services/content/`, `services/contentGeneration.ts`, `services/trendPreview.ts`, `services/trendPreviewRestore.ts`, `services/domains/`
- All trends-loop files in `src/services/learning/` flagged in Phase 4
- All of `src/trends/`
- All trends-era type files in `src/types/` (see inventory §C)
- All trends-era config files in `src/config/` (see inventory §D)
- `src/components/WorkspaceOpportunityCard.tsx` (if not already deleted in Phase 3)
- `src/components/brand/` — **only** if both files are pure visual; verify the brand logo files are not trends-data-bound

**Method.** Delete in leaf-to-root order. After each batch of ~10–20 deletions, run `npm run typecheck`. Resolve errors by editing consumer files (typically a small import removal). If a consumer cannot be cleanly cut, move it to the delete list and re-run typecheck.

**Persistence registry.** `src/persistence/registry.ts` likely seeds brand and opportunity in-memory stores. Strip those sections; keep learner-state-relevant scaffolding for Phase 6.

**Hooks.** Re-scan `src/hooks/`. The earlier survey found no trends-y hooks; verify under final file list.

**Exit criteria.**
- `npm run typecheck` clean.
- `npm run build` clean.
- `grep -rE "TrendCategory|ContentOpportunity|BrandProfile|SocialPlatformId|signalOrchestrator|MediaPlan|CreativeBrief|AutonomyAction" src/` returns no live code matches (only string literals in comments or strings are acceptable, but should be cleaned up where seen).
- Bundle size noticeably smaller than baseline.

**Risks.**
- Lazy-loaded imports (e.g., `lazy(() => import(...))`) do not show in normal grep. Run a separate scan for `lazy(` and dynamic `import(`.
- Persistence registry has multiple stores; tear them out carefully to avoid breaking learner-state stores.

### Phase 6 — Neuter the tenant model

**Goal.** Collapse the multi-brand tenancy to single-user-implicit. Every place that currently reads "current tenant" becomes "current user." Multi-tenant for learning *teams* will be rebuilt cleanly in Wave 6 as an `organization` schema; we do not preserve any of the brand-tenant code for that.

**Why this phase happens after trends deletion.** Most of the tenant complexity exists to support multi-brand workspaces, which we just removed. After Phase 5, tenant is a vestigial wrapper. This phase strips it.

**Scope.**
1. `src/auth/AuthContext.tsx` (135 tenant references) — strip tenant loading, tenant_members queries, default_tenant_id. AuthContext exposes user only; signed-in state means user-authenticated.
2. `src/auth/bootstrapTenant.ts` — delete; if any learner-side bootstrap is still needed (e.g., creating learner profile row), replace with `src/auth/bootstrapLearner.ts`.
3. `src/persistence/` — rewrite to be user_id-scoped:
   - `tenantPersistenceMode.ts` → delete
   - `browserTenantPersistence.ts` → rename and rework to `browserLearnerPersistence.ts` or similar; key by user_id
   - `inMemoryPersistence.ts`, `supabasePersistence.ts`, `registry.ts`, `contracts.ts`, `index.ts` — strip tenantId parameters from all interfaces
   - `queries/` — strip tenantId from queries; check if any queries are entirely trends-era and delete those
4. `src/access/`:
   - `AccessTierProvider.tsx`, `fetchMyEffectiveAccessTier.ts` — strip tenantId; access tier is per-user
5. `src/training/`:
   - `demoTrainingStore.ts`, `supabaseTraining.ts`, `trainingHooks.ts`, `trainingTypes.ts`, `useTrainingWorkspace.ts` — strip tenant fields from training types and queries; training plans are user-owned, not tenant-owned
6. `src/learning/LearningAccessContext.tsx` — strip tenant
7. `src/components/learn/flagshipSession/flagshipSessionResponseTypes.ts`, `FlagshipLearnerResponsePanel.tsx`, `FlagshipCourseSessionPage.tsx` — strip tenant fields
8. `src/lib/jifunzeTelemetry.ts`, `lib/learningAccessSummary.ts`, `lib/learnerCourseArtifactTypes.ts` — strip tenant
9. `src/workspace/workspaceIdentity.ts` — delete or rework as user identity (likely just delete; identity already lives in AuthContext)
10. `src/components/workspace/`:
   - `WorkspaceSubscriptionPage.tsx` → rename to `LearnerSubscriptionPage.tsx`, strip tenant; the page is fundamentally a Stripe subscription UI and is keep-worthy under the new name
   - `LearnerAccountPage.tsx` — keep, strip tenant references if any
11. `src/types/`:
   - `tenant.ts` → delete
   - `brand.ts` → already deleted in Phase 5
12. Routes: `/settings/subscription` continues to work; the page is renamed but the route stays. Any `/workspace/...` route is deleted.

**Method.** This is a refactor, not a delete. For each tenant-using file: examine, edit, type-check, move on. Some files will reduce significantly in size (AuthContext especially). Expect Phase 6 to take longer than Phase 5 in real time despite touching fewer files, because edits are surgical and dependencies are deep.

**Supabase RLS implications (deferred to Phase 10).** Tables that currently restrict access by `tenant_id` row-level security need to be rewritten to restrict by `user_id` (or `owner_id`). This is a Phase 10 migration, not a Phase 6 code change — code in Phase 6 stops *sending* tenantId; RLS policies update in the consolidating migration.

**Exit criteria.**
- `grep -rE "tenantId|tenant_id|TenantId|TenantPersistence|tenant_members" src/` returns zero matches.
- `npm run typecheck` clean.
- `npm run build` clean.
- Sign-in flow works end-to-end against a fresh user.
- Course progress, capstone submission, certificate generation all work for a fresh user.

**Risks.**
- **Highest in Wave 1.** AuthContext is foundational. A breaking change here breaks every authenticated page.
- Supabase RLS — if a query still relies on tenant_id at the DB level even though the code stops sending it, queries may silently return zero rows. Manual smoke is essential.
- Persistence layer is invasive; mistakes show up as missing data or write failures, not type errors.

### Phase 7 — Scripts, audits, env, package.json

**Goal.** Clean the build and operational layer of references to deleted subsystems.

**Scope.**
- `scripts/` — survey every file. Delete or rewrite scripts that target deleted subsystems. The earlier survey found no obvious trends-y scripts, but re-run with the final type-name list (`grep -rE "TrendCategory|ContentOpportunity|BrandProfile|demoBrands|simulationMode" scripts/`). Likely candidates: scripts that audit brands or simulation mode.
- `.env.example` — remove signal-ingestion providers, social-platform keys, brand profile defaults. Keep Supabase, OpenAI, Stripe.
- `.env`, `.env.local` — same cleanup (consult owner before editing live env files).
- `package.json` scripts — remove `audit:*` and `verify:*` entries that target deleted subsystems. Cross-check against `scripts/` survey.
- `package.json` dependencies — manual pass for libraries whose only callers were deleted (e.g., RSS parsers if any, signal-provider SDKs).

**Exit criteria.**
- `npm run typecheck`, `npm run build`, `npm run lint`, and all remaining `audit:*`/`verify:*` scripts green.
- `.env.example` reflects the actual env vars the learning-only app needs.

**Risks.** Low. This is housekeeping.

### Phase 8 — Persistence-supabase.md and AUTHORING.md (new)

**Goal.** Create the persistence doc fresh (covering only learner-state schema) and stub `docs/AUTHORING.md` as a Wave 2 placeholder.

**Scope.**
- New `docs/persistence-supabase.md`. Sections: schema overview, learner profile, course progress, capstone submissions, lesson timer, learner artifacts, certificates, lab runs (placeholder for Wave 4/5), AI tutor sessions (placeholder for Wave 3). No trends-era tables documented.
- Stub `docs/AUTHORING.md` with a "to be authored at the start of Wave 2" placeholder. Mentioned in master plan §6 Wave 2 as a Wave 2 deliverable, but stubbed here so the link from the master plan resolves.

**Exit criteria.**
- Both docs committed.
- No reference in either doc to brand, social, signal, opportunity, autonomy, or other deleted concepts.

**Risks.** None.

### Phase 9 — Test pass, manual smoke, deploy preview, dogfood

**Goal.** Validate that everything that worked pre-rewrite still works.

**Scope.**
- Run all of `npm run typecheck`, `build`, `lint`, plus every surviving `audit:*` and `verify:*` script. All must pass.
- Run e2e suites: `playwright.config.ts`, `playwright.live.config.ts`, `playwright.forced.config.ts`. Address every failure (either fix-forward or update the e2e test if it tests deleted functionality).
- Vercel deploy preview from the branch.
- Manual smoke against the preview:
  - `/` home
  - `/learn` discovery
  - `/learn/free/smart-workflows-with-ai` (Rise loads)
  - `/learn/free/ai-at-work-chatgpt` (Rise loads)
  - `/learn/free/business-analytics-decision-making` (Rise loads)
  - `/learn/free/5-day-mental-wellbeing-reset` (Rise loads)
  - `/learn/courses/ai-essentials` (flagship landing)
  - One full session on `ai-essentials` (start, mid-lesson, completion)
  - `/library/ai-foundations` (library reader)
  - `/learn/practical-mathematics-life-work-business/modules/.../lessons/...` (standalone lesson)
  - `/auth/sign-in`, sign-up
  - `/learn/checkout` (Stripe live)
  - `/admin/dashboard` (admin shell)
  - Capstone submission against a test learner
  - Certificate generation against a test learner
- **Dogfood window: one week** on the preview deploy. Use it. File regressions.

**Exit criteria.**
- All automated tests green.
- All manual smoke flows pass.
- One full week of dogfooding with no unresolved regressions.

**Risks.**
- Long tail of "this stopped working but you wouldn't notice unless you tried" bugs. Dogfooding is what catches these; tests alone are not sufficient.

### Phase 10 — Drop migrations, merge, follow-ups

**Goal.** Final database cleanup and merge to main.

**Scope.**
- Author one consolidating Supabase migration: `supabase/migrations/20260518_drop_trends_and_tenancy.sql`. Drops tables: `brands`, `content`, `content_packages`, `social_accounts`, `signals`, `opportunities`, `tenants`, `tenant_members`, and any other trends-era tables (full list compiled in Phase 1 baseline review).
- Rewrite RLS policies for surviving tables to be user-based (not tenant-based). Specifically: `learning_snapshots`, `flagship_course_progress`, `learner_capstone_submissions`, `learner_course_artifacts`, `learner_lesson_timer`, `training_plans`, `training_modules`, `training_lessons`, and any other learner-scoped tables.
- Verify the migration on a fresh Supabase project before pointing prod at it.
- Squash-merge the branch to `main`.
- Tag `post-trends-removal`.
- File follow-up issues for:
  - Consolidate per-course curriculum files into `src/data/learning/courses/<slug>/` (Wave 2 dependency).
  - Wave 2 kickoff with the locked 50-course catalog.
  - Update any CI/CD configuration (if applicable) for the new shape.

**Exit criteria.**
- Migration applied successfully.
- `main` is green.
- Tag exists.
- Follow-up issues filed.

**Risks.**
- The migration is destructive in production environments that might have data. Owner has confirmed no production data; verify once more before applying.

---

## Phases already complete (pre-Wave-1 cleanup, 2026-05-18)

Some work was done before the formal Wave 1 phase plan was finalized. Listed here for audit clarity:

- Master plan written and amended for high-school audience.
- `PROJECT_CONTEXT.md` and `README.md` rewritten to point to master plan.
- All trends-era planning, audit, and architecture docs deleted from `docs/`.
- The "How to use Claude/" folder of Course 1 module drafts deleted.
- `homepage-files.txt` deleted.
- 50-course catalog plan written, hardened around math/science, and locked.
- Wave 1 plan (this document) and trends removal inventory created.

These do not need to be re-done; they are part of Wave 1's accomplishment.

---

## Out of scope (deferred to later waves)

- Building the publishing pipeline (Wave 2).
- Authoring any new course content (Wave 2).
- AI tutor (Wave 3).
- Math lab (Wave 4).
- Cloud lab (Wave 5).
- Rebuilding multi-tenancy for learning teams (Wave 6).
- Migrating the `training/` markdown corpus (Wave 2.5).
- Changing the existing flagship session player, capstone flow, certificate generator, Rise embedding, or admin shell — these stay as-is.

If a change request comes in during Wave 1 execution and it's in the out-of-scope list above, the answer is "deferred to Wave N; not in this branch."

---

## Risk register

| Risk | Severity | Mitigation |
|---|---|---|
| Mis-classifying a file in Phase 4 | High | Grep before move; verify imports of every file in `services/learning/` before deciding fate |
| AuthContext refactor in Phase 6 | Highest | Surgical edits one section at a time; type-check after each section; manual sign-in test after each commit |
| Supabase RLS silently filtering queries after tenant strip | High | Phase 10 migration must drop and re-create RLS policies for every surviving table; manual smoke against a real signed-in user is the validation |
| Lazy/dynamic imports missed by grep | Medium | Separate `grep -rE "lazy\(|import\(" src/` pass in Phase 5 |
| e2e fixtures seed trends data | Medium | e2e suite run in Phase 9; failures are fix-forward signals |
| Migration destroys production data | Critical, mitigated | Owner confirmed no prod data; one final verification before Phase 10 migration |
| Bundle still imports deleted modules | Medium | `npm run build` after each phase catches this |
| Calendar drift (Wave 1 takes longer than estimated) | Medium | Accept; Wave 2 does not start until Wave 1 acceptance |

---

## Calendar estimate

Honest estimate, assuming the work happens in focused sessions:

| Phase | Time |
|---|---|
| 1 — Inventory + baseline | 2–4 hours |
| 2 — Doc rewrite | Done |
| 3 — Dormant UI | 2–4 hours |
| 4 — Disambiguation | 6–10 hours |
| 5 — Trends mass delete | 8–16 hours |
| 6 — Tenant neuter | 12–20 hours |
| 7 — Scripts/env | 2–4 hours |
| 8 — Persistence doc | 2–4 hours |
| 9 — Test + smoke + dogfood week | 1 week elapsed |
| 10 — Migration + merge | 4–8 hours |

**Total active engineering time: 40–70 hours.** Plus the dogfooding week. At one engineer working part-time (10 hours/week), Wave 1 is 5–8 weeks of calendar time. Full-time, 1.5–2 weeks plus the dogfood window.

---

## Working agreement (Wave 1 specific)

1. Phases proceed sequentially.
2. `npm run typecheck` after every commit; do not push a phase commit that breaks typecheck.
3. The branch never gets `main`-merged mid-Wave-1.
4. Any change request landing during Wave 1 is either deferred (if out of Wave 1 scope) or amended into this document (if it's a Wave 1 decision change).
5. Phase 6 (tenant neuter) gets explicit pre-flight: re-read this document's Phase 6 section before starting; AuthContext is the danger zone.

End of plan.
