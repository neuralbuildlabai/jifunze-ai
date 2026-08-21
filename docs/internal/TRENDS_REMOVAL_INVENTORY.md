# Trends Removal Inventory — Wave 1

**Status:** Active working document for Wave 1.
**Date:** 2026-05-18.
**Purpose:** Single source of truth for what gets deleted, renamed, or refactored in Wave 1. Every PR in Wave 1 references this document. Every file listed here must be either resolved (deleted/renamed/edited) or explicitly exempted before Wave 1 merges to `main`.

**How to use.** Items are grouped by category and tagged with the Wave 1 phase that handles them. Within a category, items are listed in deletion order (leaf-first). Items marked **VERIFY** require an inspection pass before action — typically a grep for imports or a read of the file to confirm category placement.

---

## Phase tags

- **P3** — Phase 3 Dormant UI
- **P4** — Phase 4 Disambiguation (rename, not delete)
- **P5** — Phase 5 Trends mass delete
- **P6** — Phase 6 Tenant neuter
- **P7** — Phase 7 Scripts/env
- **P10** — Phase 10 Migrations

---

## A. Services to delete entirely (P5)

These directories contain code that exists only to serve the trends/opportunities/brand-publishing subsystem. No file in any of these directories survives.

```
src/services/signals/
src/services/trends/
src/services/opportunities/
src/services/autonomy/
src/services/relevance/
src/services/mediaPlanning/
src/services/creative/
src/services/simulation/
src/services/platforms/
src/services/publishing/
src/services/pipeline/
src/services/brands/
src/services/domains/
src/services/content/
src/services/teaching/         # trends-era "teaching" = content-teaching, not course-teaching
src/services/conversion/       # funnel/CTA for posted content
```

Plus these top-level files in `src/services/`:

```
src/services/contentGeneration.ts
src/services/trendPreview.ts
src/services/trendPreviewRestore.ts
```

## B. Top-level `src/trends/` directory (P5)

```
src/trends/demoTrendsStore.ts
src/trends/supabaseTrends.ts
src/trends/trendSummaryGenerator.ts
src/trends/trendTypes.ts
```

Entire directory deleted.

## C. Disambiguation — `src/services/learning/` split (P4, then P5)

This folder is currently misnamed. It contains two unrelated bodies of code.

### C.1 Move to `src/services/learnerState/` (P4 — KEEP, rename folder)

```
flagshipCourseProgressRemote.ts
learnerCapstoneSubmissionsRemote.ts
learnerCourseArtifactsRemote.ts
learnerLessonTimeRemote.ts
buildRecommendations.ts                  # VERIFY: read to confirm progress-focused
```

### C.2 Delete in P5 (trends-loop, despite folder name)

```
analyzePerformance.ts
appendSimulatedPerformanceFromTrendBatch.ts
applyLearningFeedback.ts
buildLearningVisibility.ts
learningContext.ts
learningMemoryRowWeight.ts
performanceMemoryStore.ts
seedDemoLearningData.ts
index.ts                                 # rewrite to re-export only learnerState survivors
```

**VERIFY** the contents of `src/services/learning/` against this list at start of P4. The earlier survey caught the obvious cases; a fresh read may reveal additional files in either category.

## D. Type files to delete (P5)

```
src/types/signal.ts
src/types/opportunity.ts
src/types/opportunityLearningImpact.ts
src/types/brand.ts
src/types/brandAutomation.ts
src/types/brandConversion.ts
src/types/autonomy.ts
src/types/trendCategory.ts
src/types/adaptationPlatform.ts
src/types/platformAdaptation.ts
src/types/platformPolicy.ts
src/types/socialAccount.ts
src/types/socialPlatform.ts
src/types/contentPackage.ts
src/types/contentAnalytics.ts
src/types/contentDomain.ts
src/types/contentFormat.ts
src/types/contentLifecycle.ts
src/types/content.ts                     # VERIFY: top-level content type, likely trends-era
src/types/creativeBrief.ts
src/types/mediaEngine.ts
src/types/mediaPlan.ts
src/types/mockMediaPrompts.ts
src/types/pipelineFeedback.ts
src/types/priorityLabel.ts
src/types/scheduling.ts
src/types/performanceLearning.ts
src/types/storedRecords.ts               # VERIFY: may be partially used by learner-state
src/types/persistence.ts                 # VERIFY: same — may have learner-state interfaces
src/types/conversion.ts
src/types/conversionFeedback.ts
```

**VERIFY** items: read first, possibly partial delete (keep learner-state-relevant interfaces).

### Tenant type — handled in P6

```
src/types/tenant.ts                      # P6 — deleted as part of tenant neuter
```

## E. Config files to delete (P5)

```
src/config/brandAutomationDefaults.ts
src/config/brandConversionDefaults.ts
src/config/brandDomains.ts
src/config/defaultBrandProfile.ts
src/config/demoBrands.ts
src/config/demoSocialAccounts.ts
src/config/domains.ts
src/config/freshnessConfig.ts
src/config/optimizationLearning.ts
src/config/platformAdaptationPolicies.ts
src/config/platformPolicies.ts
src/config/resolveSocialAccounts.ts
src/config/safetyPlaceholders.ts
src/config/signalIngestionEnv.ts
src/config/simulationMode.ts
src/config/trendCategoryBehavior.ts
src/config/systemSurfaceMode.ts          # VERIFY: may govern learning surface modes
```

### Keep

```
src/config/supabaseEnv.ts                # learner-side; keep
```

## F. Components to delete (P3 dormant UI, P5 trends, P6 workspace)

### F.1 P3 — Dormant UI components

```
src/components/ContentGenerator.tsx
src/components/HomePublicGeneratePanel.tsx
src/components/PublicGeneratePage.tsx
src/components/InternalUatDiagnostics.tsx
src/components/WorkspaceOpportunityCard.tsx
src/components/trends/                   # empty directory
```

**Read first.** Confirm none of these are imported by `HomeEntryPage` or another live component before deleting.

### F.2 P5 — Verify and likely delete

```
src/components/brand/JifunzeBrandLogo.tsx          # VERIFY: visual logo only (KEEP) or brand-data-bound (delete)
src/components/brand/JifunzeAuthSectionBrandMark.tsx # VERIFY: same
```

Earlier inspection suggests these are pure visual brand mark components (logo files, sizing). If confirmed visual-only, **keep** and rename folder if "brand" is misleading. If brand-data-bound, delete.

### F.3 P6 — Workspace components (rename, not delete)

```
src/components/workspace/WorkspaceSubscriptionPage.tsx → LearnerSubscriptionPage.tsx
src/components/workspace/LearnerAccountPage.tsx       # already learner-themed; keep, strip tenant refs
```

Rename folder `src/components/workspace/` → `src/components/learner-account/` or similar.

## G. Persistence and registry (P5 strip, P6 refactor)

### G.1 P5 — Strip trends-era pieces from registry

`src/persistence/registry.ts` — strip:
- Brand profile stores
- Opportunity stores
- Signal stores
- Trend stores
- Social account stores
- Content package stores
- Any other trends-era in-memory store

Keep: learner-state stores (progress, capstones, artifacts).

### G.2 P6 — Refactor tenant-aware files

```
src/persistence/tenantPersistenceMode.ts             # DELETE
src/persistence/browserTenantPersistence.ts          # RENAME + refactor: key by user_id
src/persistence/inMemoryPersistence.ts               # STRIP tenantId
src/persistence/supabasePersistence.ts               # STRIP tenantId
src/persistence/registry.ts                          # STRIP tenantId (also stripped of trends in G.1)
src/persistence/contracts.ts                         # STRIP tenantId from interfaces
src/persistence/index.ts                             # update exports
src/persistence/queries/                             # STRIP tenantId; delete trends-era queries entirely
```

## H. Auth (P6)

```
src/auth/AuthContext.tsx                             # MAJOR REFACTOR: strip 135 tenant refs
src/auth/bootstrapTenant.ts                          # DELETE entirely
                                                     # If learner-bootstrap needed: create src/auth/bootstrapLearner.ts
```

## I. Workspace identity (P6)

```
src/workspace/workspaceIdentity.ts                   # DELETE (subsumed by AuthContext)
src/workspace/                                       # delete empty folder
```

## J. Access tier (P6)

```
src/access/AccessTierProvider.tsx                    # strip tenant refs
src/access/fetchMyEffectiveAccessTier.ts             # strip tenant refs
src/access/                                          # other files — VERIFY each
```

## K. Training (P6)

The training subsystem is currently tenant-scoped. Refactor to user-scoped.

```
src/training/demoTrainingStore.ts                    # strip tenant fields
src/training/supabaseTraining.ts                     # strip tenant fields
src/training/trainingHooks.ts                        # strip tenant refs (16 occurrences)
src/training/trainingTypes.ts                        # strip tenantId from row types
src/training/useTrainingWorkspace.ts                 # strip tenant refs (9 occurrences); consider renaming if "workspace" is misleading
```

Other files in `src/training/` — read each, strip tenant where present.

## L. Learning context (P6)

```
src/learning/LearningAccessContext.tsx               # strip tenant refs (5 occurrences)
src/learning/learningEntitlement.ts                  # VERIFY: may have tenant fields
```

## M. Flagship learner session (P6)

```
src/components/learn/flagshipSession/flagshipSessionResponseTypes.ts  # strip tenant
src/components/learn/flagshipSession/FlagshipLearnerResponsePanel.tsx # strip tenant (6 refs)
src/components/learn/FlagshipCourseSessionPage.tsx                    # strip tenant refs
```

## N. Lib (P6)

```
src/lib/jifunzeTelemetry.ts                          # strip tenant
src/lib/learningAccessSummary.ts                     # strip tenant
src/lib/learnerCourseArtifactTypes.ts                # strip tenant
```

Other files in `src/lib/` — grep for tenant and refactor.

## O. App.tsx (P3, P6)

### O.1 P3 — Remove imports and routes for deleted components

```
import { ContentGenerator }              # REMOVE
import { HomePublicGeneratePanel }       # REMOVE
import { PublicGeneratePage }            # REMOVE
import { InternalUatDiagnostics }        # REMOVE
```

### O.2 P3 — Remove redirect routes

```
<Route path="/trends" element={<Navigate to="/learn" replace />} />     # REMOVE
<Route path="/ideas" element={<Navigate to="/learn" replace />} />      # REMOVE
<Route path="/studio" element={<Navigate to="/learn" replace />} />     # REMOVE
<Route path="/insights" element={<Navigate to="/learn" replace />} />   # REMOVE
<Route path="/training" element={<Navigate to="/learn" replace />} />   # REMOVE
<Route path="/training/*" element={<Navigate to="/learn" replace />} /> # REMOVE
<Route path="/team/*" element={<Navigate to="/learn" replace />} />     # REMOVE
<Route path="/library" element={<Navigate to="/learn" replace />} />    # REMOVE
<Route path="/library/ai" ... />                                        # REMOVE
<Route path="/library/ml" ... />                                        # REMOVE
<Route path="/library/chatbots" ... />                                  # REMOVE
<Route path="/generate" element={<Navigate to="/learn" replace />} />   # REMOVE
<Route path="/platform" element={<LegacyPlatformRedirect />} />         # REMOVE component + route
```

### O.3 P6 — Update workspace route

```
import { WorkspaceSubscriptionPage } from './components/workspace/WorkspaceSubscriptionPage'
                                          # update import path after rename in F.3
```

## P. Hooks (P5 — verify, likely no deletions)

Re-scan `src/hooks/` after Phase 5 deletions. Earlier survey found all hooks were learning-focused (course progress, lesson timer, pathway). If any reference deleted types, refactor or delete.

## Q. Top-level files (already done)

```
homepage-files.txt                                   # ALREADY DELETED 2026-05-18 in doc cleanup
```

## R. Scripts (P7)

Survey at start of Phase 7. Earlier check found no obviously trends-y script names, but re-run with the final type list:

```bash
grep -rE "TrendCategory|ContentOpportunity|BrandProfile|demoBrands|simulationMode|signalOrchestrator" scripts/
```

Likely candidates for deletion: any script referencing brands, social accounts, opportunities, signals, or trend categories.

`package.json` scripts: remove any `audit:*` or `verify:*` that targets deleted subsystems.

## S. Supabase migrations (P10)

### S.1 New consolidating migration to author in P10

`supabase/migrations/20260518_drop_trends_and_tenancy.sql` — drops:

```
brands
content                  # VERIFY exact table name
content_packages         # VERIFY exact table name
social_accounts          # VERIFY exact table name
social_*                 # any other social-related tables
signals                  # VERIFY exact table name
opportunities            # VERIFY exact table name
tenants
tenant_members
```

Plus rewrites RLS policies for surviving learner tables to be user-based rather than tenant-based.

### S.2 Existing migrations to **preserve** (do not delete the migration files; the database state matters)

All learner-state migrations stay as historical record. The new consolidating migration is additive.

### S.3 **Preserve pending review** — `learning_lab_runs` (Wave 4 substrate)

```
supabase/migrations/20260415120000_learning_lab_runs.sql
```

This migration creates a "lab runs" table that may be a viable substrate for Wave 4 (math lab) and Wave 5 (cloud lab) per master plan §6 Wave 4. **Do NOT delete in Wave 1.** Read the migration's table schema during Phase 1 baseline; if the schema is reusable, keep it. If it is brand-trends-flavored beyond repair, mark for deletion in Wave 4 and rebuild fresh.

## T. Env files (P7)

`.env.example` — remove:

```
# Any signal ingestion provider keys
# Any social platform API keys (Twitter, IG, FB, TikTok, LinkedIn)
# Any brand profile defaults
# Any trends-era feature flags
```

Keep:

```
SUPABASE_URL
SUPABASE_ANON_KEY
OPENAI_API_KEY                                # for Wave 2 authoring
STRIPE_*                                      # for billing
VERCEL_*                                      # for deploy
```

Same cleanup on `.env` and `.env.local` — but consult owner before editing live env files.

---

## Preserve pending review (do NOT delete in Wave 1)

| Item | Reason |
|---|---|
| `supabase/migrations/20260415120000_learning_lab_runs.sql` | Possible Wave 4/5 substrate |
| `src/training/` markdown corpus (in repo `training/`, not `src/training/`) | Wave 2 publishing pipeline input |
| `training-imports/course-1/` | Wave 2 round-trip test material |
| `src/components/brand/*` | Verify visual-only; if yes, keep with rename |
| `src/types/persistence.ts` | May contain learner-state interfaces; verify |
| `src/types/storedRecords.ts` | May contain learner-state types; verify |
| `src/config/systemSurfaceMode.ts` | May govern learning surface; verify |
| `src/learning/learningEntitlement.ts` | Likely keep; verify tenant content |

---

## Verification commands (run at end of each phase)

After Phase 3:
```bash
grep -rE "ContentGenerator|HomePublicGeneratePanel|PublicGeneratePage|InternalUatDiagnostics|WorkspaceOpportunityCard" src/
# expected: no results
```

After Phase 4:
```bash
grep -rE "from ['\"][^'\"]*services/learning" src/
# expected: only references to learnerState (renamed folder), no references to old path
```

After Phase 5:
```bash
grep -rE "TrendCategory|ContentOpportunity|BrandProfile|SocialPlatformId|signalOrchestrator|MediaPlan|CreativeBrief|AutonomyAction|PublishingConnector" src/
# expected: no results

grep -rE "lazy\(.*['\"][^'\"]*services/(signals|trends|opportunities|autonomy|brands|relevance|platforms|publishing|mediaPlanning|creative|pipeline)" src/
# expected: no results (catches lazy imports)
```

After Phase 6:
```bash
grep -rE "tenantId|tenant_id|TenantId|TenantPersistence|tenant_members" src/
# expected: no results
```

After Phase 7:
```bash
grep -rE "demoBrands|simulationMode|signal_ingestion" scripts/ .env.example package.json
# expected: no results
```

End of phase 9 (full audit):
```bash
grep -rE "trend|opportunity|brand|signal|autonomy|publishing|creative_brief|media_plan" src/ --include="*.ts" --include="*.tsx" | grep -v "// " | grep -v "/\*"
# expected: only legitimate occurrences (e.g., "we should brand this differently" in a comment, marketing prose, etc.) — review each for context
```

---

End of inventory.
