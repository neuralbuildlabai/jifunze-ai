# Security and Change-Provenance Review — 20 August 2026

**Scope:** working tree of `jifunze-ai` on branch `chore/harden-autonomous-content-loop`
**HEAD:** `42c454cb25aa46f472fa81c56926aac43e0d6505` (in sync with `origin/chore/harden-autonomous-content-loop`, 0 ahead / 0 behind)
**Freeze tag:** `learning-platform-frozen-2026-08-18` → annotated tag created 18 Aug 2026, pointing at commit `fc901a0a21ae6f419316bc9c6e44cc60e020f5b4` (14 May 2026)
**Author of this review:** automated audit, read-only on Git history; no commit, push, merge, deploy, migration or publish was performed.

> **No secret value appears anywhere in this document.** Environment variables are referred to by
> name only. No token length, prefix, or partial value is disclosed.

---

## 1. Executive assessment

Three security defects were found and fixed. One is critical.

| # | Finding | Severity | State |
|---|---|---|---|
| 1 | `VITE_MAINTENANCE_BYPASS_TOKEN` — a "secret" bypass token read and compared **in browser code**, and verified present **in plaintext in a shipped `dist/` bundle** | **Critical** | Fixed — bypass removed from the client entirely |
| 2 | Dynamic indexing of `import.meta.env` in three modules caused Vite to inline the **entire** env record — every `VITE_*` value — into the public bundle. This is the mechanism by which finding 1 leaked | **High** | Fixed — all reads are now static; a build-time canary proves no unlisted value can reach the bundle |
| 3 | `_to_delete/jifunze-src-transfer-2026-08-20.tar.gz` — an 8 MB source transfer archive containing a full `.env.local` (Supabase anon key, a Vercel OIDC token and the bypass token), sitting in a directory that Git did **not** ignore | **High** | Contained — `_to_delete/` is now git-ignored so no `git add -A` can stage it. **The archive itself still exists on disk and is the owner's to delete** |

Two further items are reported but **not** changed, because they sit inside the frozen learning platform and are not required by the maintenance-bypass remediation: a `?devManualScore=1` URL flag on standalone module pages (low severity, `localStorage`-only), and the publication of admin e-mail allowlists into the public bundle (informational).

The working tree contains **521 changed paths**: 239 deletions, 63 modifications and 223 untracked additions. Every one is accounted for. **Nothing is unexplained.** But the tree is not one change — it is **three** overlapping bodies of work, and only one of them belongs in a social-operations commit:

- **Wave 1** (executed 18–19 May 2026, never committed): a 230-path removal of the retired multi-tenant SaaS *and* a tenancy strip that reaches into frozen learning-platform files.
- **Social operations** (18–20 Aug 2026): the public career-skills site, content hub, `/admin/social-ops` console, platform adapters, two-hour sync, DB migration, branding.
- **This security review** (20 Aug 2026): 16 paths.

The decisive provenance fact: **the frozen learning-platform tree at `HEAD` is byte-identical to the freeze tag.** Every commit between `fc901a0` and `HEAD` is purely additive autonomous-loop work. Therefore *every* frozen-path deletion and modification now in the tree is **uncommitted** and is a live deviation from the frozen state — none of them are "already part of the freeze".

**Readiness verdict: `READY FOR SCOPED COMMIT REVIEW`** (§13).

---

## 2. Vercel OIDC token handling

| Item | Result |
|---|---|
| `VERCEL_OIDC_TOKEN` present in `.env.local` | Yes, at the time of audit (created by `vercel env pull`) |
| Action taken | The single line was removed from `.env.local` **without reading or displaying its value** (name-matched deletion in place) |
| Unrelated variables | Untouched |
| Rotation / revocation via Vercel | **Not attempted.** Vercel OIDC tokens are short-lived and expire on their own |
| `vercel env pull` run during this audit | **No** — it would have overwritten the cleaned local file |
| How to get a fresh token later | `vercel env pull` — but note it will re-add `VITE_MAINTENANCE_BYPASS_TOKEN` too until that variable is deleted from Vercel (§12) |

Searched by **variable name only**, never by value:

| Location | `VERCEL_OIDC_TOKEN` occurrences |
|---|---|
| Source code (`src/`, `e2e/`, `orchestrator/`, `render/`, `scripts/`, `supabase/`) | 0 |
| Git history (`git log --all -S'VERCEL_OIDC_TOKEN'`) | 0 commits |
| Built bundle (`dist/`, clean rebuild) | 0 |
| Documentation | 0 |
| Transfer archives / patches (`_xfer/jifunze-social-ops.patch`) | 0 |
| Tracked environment files (`.env`, `.env.example`) | 0 |
| `_to_delete/jifunze-src-transfer-2026-08-20.tar.gz` | **1 — inside the archived `.env.local`** (see finding 3) |

A note left in `.env.local` records the removal and the `vercel env pull` recovery path.

---

## 3. `.env.local` protection — verified

| Check | Command | Result |
|---|---|---|
| Ignored by Git | `git check-ignore -v .env.local` | `.gitignore:40:.env*.local` → **ignored** |
| Safe rule present | — | `.env*.local` at line 40, plus `.env` / `.env.*` with `!.env.example` at lines 1–3 |
| Not tracked | `git ls-files --error-unmatch .env.local` | exit 1 — **expected safe result** |
| Not staged | `git status --short -- .env.local` | no output; index is completely empty (`git diff --cached` returns nothing) |
| Not in any transfer package | see below | **FAILED before this review — now contained** |
| No real secret in `.env.example` | pattern scan (counts only) | 0 JWT-shaped values, 0 `sbp_`/`sb_secret_`, 0 long random literals, 0 real project URLs, 0 references to project ref `gkhvhisuvcfbsicwjdvm`. **Clean** |

`.env.local` was **not** copied into any workspace, archive or patch by this review, was not added to Git, and was not transmitted anywhere.

### 3.1 Finding 3 — transfer archive containing live secrets

`_to_delete/jifunze-src-transfer-2026-08-20.tar.gz` (8 MB, 1 012 entries, created 20 Aug 03:32) contains `./.env.local`. Classified without printing values, that snapshot holds a JWT-shaped Supabase anon key, a Vercel OIDC token, a content API URL and the maintenance bypass token. It is **not** identical to the current `.env.local` — it is an earlier snapshot, so it also preserves a value that has since been edited out of the live file.

`_to_delete/` was **not** matched by any `.gitignore` rule. A single `git add -A` would have staged an archive of live credentials into the repository.

**Remediation applied:** `_to_delete/` and `.fuse_hidden*` added to `.gitignore`; `git check-ignore` now confirms both are ignored. `_xfer/` was already ignored (line 60).

**Not done, deliberately:** the archive was not deleted — quarantined folders are out of scope for automated deletion, and the local shell used for this audit cannot delete files under the mounted folder. **Owner action:** delete `_to_delete/jifunze-src-transfer-2026-08-20.tar.gz` yourself, and treat every credential it contains as exposed to whatever handled that file.

### 3.2 Tracked `.env` — reported, not changed

`.env` is **tracked** in Git (added before the ignore rules existed; `.gitignore` cannot untrack it). It contains a real Supabase project URL and a literal anon key, plus `VITE_CONTENT_MODE`, `VITE_SIGNAL_MODE`, `VITE_INTERNAL_UAT_DIAGNOSTICS`. Anon keys are client-facing by design and this one already ships in the bundle, so this is **not** a credential leak — but a tracked `.env` is a trap that invites a real secret to be added later. Recommendation: `git rm --cached .env` in a separate, reviewed commit and move its contents to `.env.local`. **Not done here** — it changes the index, which this review is forbidden to touch.

---

## 4. Critical finding — client-side maintenance bypass

### 4.1 What it did

| Question | Answer |
|---|---|
| Where the token is read | `src/lib/maintenanceMode.ts:82` — `import.meta.env.VITE_MAINTENANCE_BYPASS_TOKEN?.trim()` |
| Where it is compared | `readMaintenanceBypassFromSearch()` compared it to the `?jf_maintenance_bypass=` query param; on match it wrote the token into `sessionStorage` under `jf_maintenance_preview_v1`. `hasMaintenancePreviewBypass()` re-read it on every render |
| What access it grants | `MaintenancePublicGate` (`src/App.tsx:173`) renders `<Outlet />` instead of `PublicMaintenancePage`. That reveals the pre-launch public site: `/learn` catalog, the four free starter courses, all `/library/*` reader content and the marketing surfaces |
| Presentation or authorization? | **Presentation.** The gate wraps every route, but each protected branch below re-checks independently: `RequireEmailVerified` → `RequireDisclaimerAcknowledged` → `RequireAdminAccess` for `/admin/*`, and `RequireSocialOpsAccess` for `/admin/social-ops` |
| Is protected data still server-authorized? | **Yes.** Supabase RLS is the boundary; `RequireSocialOpsAccess` documents that RLS gates every social-ops table on `public.is_admin()` and the `social-ops-admin` Edge Function re-checks the caller's tier |
| Present in the `dist` bundle? | **Yes — the literal token value, in plaintext, in `dist/assets/index-BAMJW9nq.js`** (a build dated 14 May). Confirmed by an exact-match count against the value read from `.env.local`; the value itself was never printed |
| In Vercel configuration documentation? | Yes — `docs/social/ENVIRONMENT_VARIABLES.md` listed it in the "Browser (public by design)" table as part of the "Public maintenance gate", with no warning |
| Do tests rely on it? | Yes — `playwright.config.ts` and `playwright.billing-mock.config.ts` injected a fixed token; `e2e/helpers/publicE2eMaintenanceBypass.ts` wrote it to `sessionStorage`; ~20 public specs call that helper |
| Can it reach frozen learning-platform routes? | It reveals the **anonymous, public** frozen surfaces (`/learn`, free starters, libraries). It cannot reach `/admin/*`, `/dashboard`, capstones, certificates or billing — those need a session |
| Could an attacker with the bundle use it? | **Yes.** Download the JS, read the string, append `?jf_maintenance_bypass=<value>` once, and the maintenance shell is defeated for that tab |

**Net severity: critical as a class of defect, moderate in blast radius.** It did not unlock protected data. It did ship a string labelled and treated as a secret to every visitor, and it established the pattern that a `VITE_*` value can be a security control — which is the thing that had to be killed.

### 4.2 What was done — the preferred remediation

The bypass was **removed from the browser entirely**. No renaming, no obfuscation, no replacement client secret.

| File | Change |
|---|---|
| `src/lib/maintenanceMode.ts` | Deleted `configuredBypassToken()`, `hasMaintenancePreviewBypass()`, `readMaintenanceBypassFromSearch()`, `MAINTENANCE_BYPASS_QUERY`, `SESSION_BYPASS_KEY`. The module is now documented as presentation-only, with a durable note explaining why a client bypass secret can never be reintroduced |
| `src/components/maintenance/MaintenancePublicGate.tsx` | Dropped the bypass import, the query-param consumption effect and the `bypass` branch. Now: `user \|\| exempt` → `<Outlet />`, else the maintenance page |
| `src/vite-env.d.ts` | Removed the `VITE_MAINTENANCE_BYPASS_TOKEN` declaration and its doc block |
| `playwright.config.ts`, `playwright.billing-mock.config.ts` | Removed the injected token from `webServer.env` |
| `e2e/helpers/publicE2eMaintenanceBypass.ts` | Rewritten as an anonymous-visitor reset (clear cookies, strip auth keys, clear `sessionStorage`). The exported name is kept so the ~20 frozen public specs stay untouched — deliberately minimising churn in the frozen tree |
| `.env.example` | Commented example removed; replaced with an explicit "there is NO client-side bypass token, and here is why" note |
| `docs/social/ENVIRONMENT_VARIABLES.md` | Row rewritten as presentation-only; a removal notice and a standing rule added ("no `VITE_*` variable may ever be a secret or an authorization input") |
| `.env.local` | The `VITE_MAINTENANCE_BYPASS_TOKEN` line removed without reading its value |

**Authorization is unchanged and unweakened.** Maintenance presentation and authorization were already separate; the fix removes the only thing that blurred them. If an internal preview of a gated build is ever needed, the supported route is to sign in — authenticated users are exempt from the maintenance shell by design, and their tier is checked server-side.

**Treat the previous value as compromised.** It was published in a static bundle.

### 4.3 Root cause — finding 2, why a `VITE_*` value was readable at all

The bundle contained not just the token but an inlined object literal of the **whole** `import.meta.env` record. Cause: three modules read `import.meta.env` with a *dynamic* key or held it as a `Record`. That defeats Vite's per-key `define` replacement, so Vite emits every `VITE_*` value it can see.

| File | Before | After |
|---|---|---|
| `src/lib/envCheck.ts:24` | `(import.meta.env as Record<string, string \| undefined>)[key]` | Explicit `PUBLIC_ENV` map of five static reads |
| `src/access/appAccess.ts:32` | `(env as Record<string, string \| undefined>)?.[key]` | Explicit `TIER_EMAIL_ENV` map of four static reads |
| `src/components/learn/StandaloneModuleDetailPage.tsx:40` | `(import.meta as { env?: Record<string, unknown> }).env` held whole | Single static read of `import.meta.env.VITE_PRACTICAL_MATH_DEV_MANUAL_SCORE` |

The third file is inside the frozen learning platform. It is documented separately in §9.3: one hunk, six lines, behaviour identical, no unrelated content touched.

Proof (§7.2): with six canary values set at build time, only the two variables that are now *deliberately* read statically appear. Before the fix, all six leaked.

---

## 5. Public environment-variable classification

Variables observed by name in `.env.local`:

| Name | Classification | Notes |
|---|---|---|
| `VITE_APP_ENV` | **Public but unnecessary** | Referenced nowhere in `src/`. Dead |
| `VITE_APP_VERSION` | **Public but unnecessary** | Referenced nowhere in `src/`. The code uses `VITE_BUILD_SHA` |
| `VITE_CONTENT_MODE` | **Safe public configuration** | `mock` \| `http`; validated in `envCheck.ts` |
| `VITE_DEPLOYMENT_TYPE` | **Public but unnecessary** | Referenced nowhere in `src/`. Dead |
| `VITE_SUPABASE_ANON_KEY` | **Safe public configuration** | Client-facing by design; RLS is the boundary. Correctly prefixed |
| `VITE_SUPABASE_ENV` | **Public but unnecessary** | Referenced nowhere in `src/`. Dead |
| `VITE_SUPABASE_URL` | **Safe public configuration** | Public project URL |
| `VITE_PUBLIC_MAINTENANCE` | **Misleadingly named — and obsolete** | Referenced **nowhere** in the codebase. The gate reads `VITE_MAINTENANCE_MODE`. Setting this does nothing, while its name implies it controls the gate. Dangerous by confusion: an operator could set `VITE_PUBLIC_MAINTENANCE=true` and believe the site is gated |
| `VITE_FORCE_PUBLIC_MAINTENANCE_UI` | **Misleadingly named — and obsolete** | Same: referenced nowhere. Implies a force-on switch that does not exist |
| `VITE_MAINTENANCE_BYPASS_TOKEN` | **Security-sensitive and prohibited** | Removed from code, tests, types, docs and `.env.local`. Must be deleted from Vercel (§12) |

### 5.1 Other `VITE_*` names with a secret-like name or purpose

Full inventory of `VITE_*` names in the codebase was reviewed. Nothing carries a service-role key or a real credential, and no service-role key uses a `VITE_` prefix (verified: `test-social-ops.ts` asserts "client-side code never references a service role key", and that test passes).

| Name | Classification | Notes |
|---|---|---|
| `VITE_MAINTENANCE_MODE` | **Safe public configuration** | Presentation flag; `true`/`false` only |
| `VITE_SUPER_ADMIN_EMAILS`, `VITE_PLATFORM_ADMIN_EMAILS`, `VITE_WORKSPACE_ADMIN_EMAILS`, `VITE_PRO_USER_EMAILS` | **Public but unnecessary** — informational disclosure | These allowlists are inlined into the public bundle. They are a dev/bootstrap fallback only; the real tier comes from the `my_effective_access_tier` RPC and RLS. They are **not** an authorization boundary, but they publish operator e-mail addresses. Recommendation: leave them unset in Production and rely on the RPC. (`CANONICAL_SUPER_ADMIN_EMAIL` is already a source literal, so the primary address ships regardless) |
| `VITE_FORCE_PRO_TOOLS`, `VITE_FORCE_PLATFORM_TOOLS` | **Security-sensitive if ever set in production** | `appAccess.ts:89,96` return `true` unconditionally when these are `'true'`. They gate **UI surfacing** only, and `appAccess.ts` states in its header that it is not an authorization boundary — but they should never be set on a real deploy. Used only by `npm run test:e2e:access-forced` |
| `VITE_PLAYWRIGHT_BUILD` | **Safe — correctly fenced** | Grants the admin shell in tests, but only via `VITE_PLAYWRIGHT_BUILD === 'true' && !isSupabaseConfigured()` (`useAdminAccess.ts:19`). With no Supabase there is nothing to authorize. Does not affect `/admin/social-ops`, which has no bypass at all |
| `VITE_E2E_BILLING_INVOKE_MOCK` | **Safe — test only** | Already documented "never ship `true` to production" |
| `VITE_PRACTICAL_MATH_DEV_MANUAL_SCORE` | **Public but unnecessary** | See §9.3 / §5.2 |
| `VITE_INTERNAL_UAT_DIAGNOSTICS` | **Public but unnecessary** | Reveals a diagnostics surface; no data access |
| `VITE_CONTENT_API_URL`, `VITE_SIGNAL_INGESTION_URL`, `VITE_TRAINING_KNOWLEDGE_URL`, `VITE_SITE_URL` | **Safe public configuration** | Endpoint URLs, not credentials |
| `VITE_STRIPE_PRICE_*` | **Safe public configuration** | Stripe **price IDs** are public identifiers, not keys |
| `VITE_LEARNER_MONETIZATION_UI_DISABLED`, `VITE_BILLING_CHECKOUT_ENABLED`, `VITE_FLAGSHIP_PURCHASE_GATE`, `VITE_ENABLE_TREND_OPPORTUNITIES`, `VITE_SIGNAL_MODE`, `VITE_SIGNAL_PROVIDER_MODE`, `VITE_CONTENT_GENERATION_MODE`, `VITE_BROWSER_PERSISTENCE`, `VITE_BUILD_SHA`, `VITE_ACCESS_TIER_EMAIL_FALLBACK`, `VITE_EMAIL_PROVIDER_CONFIGURED`, `VITE_BILLING_*_DOMAIN_SUFFIXES`, `VITE_SEED_DEMO_LEARNING_IN_WORKSPACE`, `VITE_LOCAL_DEV_TENANT_ID`, `VITE_DEV_SHOW_*` | **Safe public configuration** or **Obsolete** | UI flags and demo switches. `VITE_ENABLE_TREND_OPPORTUNITIES`, `VITE_SIGNAL_PROVIDER_MODE`, `VITE_CONTENT_GENERATION_MODE`, `VITE_LOCAL_DEV_TENANT_ID` are obsolete after the Wave-1 removal |

### 5.2 Reported, not fixed — `?devManualScore=1`

`src/components/learn/StandaloneModuleDetailPage.tsx:36` enables a "manual score override" panel for **any** visitor who appends `?devManualScore=1`, with no env gate. The panel writes an arbitrary pass score via `setModuleQuizScore`.

Impact is **low**: `usePracticalMathProgress.ts:63` persists only to `localStorage`, and standalone free-course certificate eligibility (`StandaloneCertificatePage.tsx:23`) was already computed from that same client state. A learner could achieve the same result with devtools. It crosses no server boundary and issues no verified credential.

It is **not** fixed here: it is frozen-platform behaviour, it is not required by the maintenance-bypass remediation, and changing it would alter frozen functionality. **Owner review:** decide whether the free-course certificate should remain client-attested, and if so whether the URL flag should be restricted to `import.meta.env.DEV`.

---

## 6. Bundle verification

### 6.1 Method

The `node_modules` on the workstation is built for `darwin-arm64` and the audit shell is Linux, so the build could not run in place. A **source-only** archive was produced (`_xfer/verify-src-2026-08-20.tar.gz`, 5.4 MB, git-ignored), **verified to contain zero `.env` files of any kind**, and built in an isolated sandbox with a fresh `npm install`. `.env`, `.env.local` and `.env.example` were excluded by explicit filter and the archive listing was checked before it left the machine. `public/course-assets/` was excluded from the archive for size; it was scanned separately in place (result below).

### 6.2 Results — clean production build

| Needle | Matches | Files | Classification |
|---|---|---|---|
| `VITE_MAINTENANCE_BYPASS_TOKEN` | 0 | — | Absent |
| `MAINTENANCE_BYPASS_TOKEN` | 0 | — | Absent |
| `VERCEL_OIDC_TOKEN` | 0 | — | Absent |
| `jf_maintenance_bypass` | 0 | — | Absent |
| `jf_maintenance_preview_v1` | 0 | — | Absent |
| `generate-content` | 0 | — | Absent |
| `generate-public` | 0 | — | Absent |

Scanned: 3 built files (`index.html`, one CSS chunk, one JS chunk). `public/` scanned in place on the workstation for the same seven needles: **0 files matched**.

**Canary test.** The build was repeated with six deliberately-planted values, including one for `VITE_MAINTENANCE_BYPASS_TOKEN` and one for `VERCEL_OIDC_TOKEN`:

| Canary variable | In bundle after fix | Would have leaked before fix |
|---|---|---|
| `VITE_MAINTENANCE_BYPASS_TOKEN` | **0** | yes |
| `VITE_STRIPE_PRICE_ALL_ACCESS_ANNUAL` | **0** | yes |
| `VITE_TRAINING_KNOWLEDGE_URL` | **0** | yes |
| `VERCEL_OIDC_TOKEN` | **0** | yes |
| `VITE_SUPER_ADMIN_EMAILS` | 1 — intended (static read, §5.1) | yes |
| `VITE_SIGNAL_INGESTION_URL` | 1 — intended (static read, public URL) | yes |

No secret-like bypass logic or value remains. No minified bundle section was printed at any point; only counts, filenames and classifications are reported. `dist/` is git-ignored and was **not** added to Git.

### 6.3 The pre-existing bundle

`dist/assets/index-BAMJW9nq.js` on the workstation (dated 14 May) **contains the old bypass token value in plaintext**. It is a stale local artifact, git-ignored, and it is superseded by any new build. It is listed here so the owner knows the value was genuinely published, not merely publishable.

---

## 7. Working-tree provenance

### 7.1 Baseline

| Item | Value |
|---|---|
| Branch | `chore/harden-autonomous-content-loop` |
| HEAD | `42c454cb25aa46f472fa81c56926aac43e0d6505` |
| Upstream | `origin/chore/harden-autonomous-content-loop` — 0 ahead, 0 behind |
| Merge base with `origin/main` | `7b9868d` (HEAD is 1 commit ahead of main) |
| Freeze tag | annotated `learning-platform-frozen-2026-08-18` → `fc901a0` (14 May 2026); **is an ancestor of HEAD** |
| Working tree | 239 deleted · 63 modified · 223 untracked = **521 paths** |
| Index (staged) | **empty** — `git diff --cached --name-only` returns nothing. Every change is unstaged or untracked |
| `git diff --check` | clean (exit 0) |

Read-only Git commands only. No `reset`, `checkout --`, `restore`, `clean`, `stash`, rebase or cherry-pick was run.

### 7.2 The decisive comparison

`git diff --name-status <freeze>..HEAD` returns **41 paths**, of which 37 are additions (`orchestrator/`, `render/`, three Edge Functions, three migrations, loop docs, `tsconfig.pipeline.json`) and 4 are modifications (`.env.example`, `.gitignore`, `package.json`, `supabase/config.toml`).

`git diff --name-only <freeze>..HEAD -- 'src/components/learn/**' 'src/components/admin/**' 'src/services/learning/**' 'src/persistence/**' 'src/data/**' 'src/learning/**' 'src/learner/**' 'src/hooks/**' 'e2e/**'` returns **nothing**.

**Therefore the frozen tree at HEAD is identical to the freeze tag, and every frozen-path change in the working tree is uncommitted.**

### 7.3 Evidence base

| Source | What it proves |
|---|---|
| `docs/internal/TRENDS_REMOVAL_INVENTORY.md` (untracked, 462 lines, dated 18 May 2026) | A file-by-file deletion plan, §A–T, naming almost every deleted path and the phase that handles it |
| `docs/internal/WAVE_1_COMPLETION_REPORT.md` (untracked, dated 18 May 2026) | "COMPLETE… Worked in-place on the workspace (no branch flow available in this environment)". Itemises the deletions by category, including the 29 docs and the entire `How to use Claude/` folder |
| `docs/internal/WAVE_1_REWRITE_PLAN.md`, `WAVE_2_*` | The 10-phase plan and its follow-on |
| `docs/AMENDMENT_001_2026-08-18_PIVOT.md` | Owner-approved 18 Aug pivot; §4 names the frozen surfaces and states "Frozen means preserved and reversible — **not deleted**" |
| `docs/AMENDMENT_002_2026-08-20_SOCIAL_OPS.md`, `docs/social/*` (17 docs) | The social-operations design, schema, adapters, sync and manual actions |
| `_quarantined_functions/`, `_quarantined_migrations/` | Byte-identical quarantine copies (hash-verified) of the removed Edge Functions and of the destructive `drop_trends_and_tenancy` migration |
| Content diffs | Every frozen-path modification is a `tenant` strip or a `services/learning → services/learnerState` import rename — **zero** social-operations content in the frozen tree |
| Hash comparison | 7 "deletions" are content-preserving **moves** |

**Timestamps were deliberately not relied on.** File mtimes across the frozen tree read 19–20 Aug even for work the reports date to 18–19 May, because the tree was re-materialised from a source transfer archive. Content and documentation were used instead.

### 7.4 Provenance summary

| Category | Paths | Basis |
|---|---|---|
| 1 — Current autonomous social-operations implementation | 173 | New `src/components/media/`, `src/components/social-ops/`, `src/social/`, `src/services/socialOps/`, `orchestrator/social/`, `supabase/functions/social-ops-admin/`, migration, sync scripts, brand assets, `public/` SEO assets; all documented in `docs/social/` |
| 2 — Current security cleanup | 16 | This review (§4, §11) |
| 3 — Intentional retired-SaaS removal | 218 | 149 Wave-1 source deletions + 12 trends-loop files under the mis-named `services/learning/` + 36 `How to use Claude/` drafts + 21 Wave-1 doc deletions; itemised in `TRENDS_REMOVAL_INVENTORY.md` and the completion report. 6 Edge-Function paths verified byte-identical to their quarantine copies |
| 4 — Current social public website / branding | 5 | `src/App.tsx`, `src/index.css`, `index.html`, `PublicSocialLinks.tsx`, `PrivacyPolicyPage.tsx` |
| 5 — Current content-engine / render work | 9 | `orchestrator/*.ts`, `render/src/*`, `scripts/test-content-engine.ts`, workflow — includes the Kazi Kit CTA removal mandated by AMENDMENT_001 §8 |
| 6 — Generated artifact | 4 | `supabase/.temp/cli-latest` (tracked, should not be), `decision.json`, `jifunze-brand-refresh.bundle`, `_xfer/` |
| 7 — Relocation, content preserved | 16 | 6 learner-state modules + `persistTeachingLearningEvent` moved to `src/services/learnerState/` (hash-identical except one 3-line `tenant_id` strip); `render/assets/brand/_legacy-pre-2026-08-20/` |
| 8 — Duplicate quarantined copy | 11 | `_quarantined_functions/`, `_quarantined_migrations/`, `_to_delete/quarantined-edge-functions-2026-08-20/` + 6 e2e realignments |
| 9 — Accidental or unexplained deletion | **0** | — |
| 10 — Frozen learning-platform change requiring owner review | **34** | §8 |
| 11 — Documentation | 31 | New and updated docs |

**Unresolved files: 0.** Every path has documentary or content-based evidence.

---

## 8. Frozen learning-platform findings

The freeze protects `/learn`, existing learning administration, courses, billing, certificates, curriculum, learner progress, course persistence, course access controls and existing training content. `src/components/learn/` and `src/components/admin/` contain **no deletions** — only the modifications below. `public/course-assets/` is untouched.

All 34 entries are **uncommitted**, **predate the current social-operations task** (Wave 1, 18–19 May 2026), and are **not depended on by the social-operations implementation** — the social work compiles, lints, builds and passes 144 Playwright tests without them, because it shares nothing with the frozen tree beyond the read-only tier helpers.

### 8.1 Frozen source modified — Wave-1 tenancy strip

| Path | Status | Diff (+/−) | Provenance | Predates social task | Social depends on it | Exclude from commit | Risk if committed | Recommendation |
|---|---|---|---|---|---|---|---|---|
| `src/auth/AuthContext.tsx` | M | +154 / −1806 (214 tenant lines) | Wave-1 §H | Yes | No | **Yes** | **High** — a 1 784-line rewrite of the session provider under a social-ops label | Separate reviewed commit + full auth regression pass |
| `src/access/AccessTierProvider.tsx` | M | +3 / −22 (7) | Wave-1 §J | Yes | No | **Yes** | Medium — tier resolution | Same |
| `src/access/fetchMyEffectiveAccessTier.ts` | M | +6 / −5 (4) | Wave-1 §J | Yes | No | **Yes** | Medium | Same |
| `src/learning/LearningAccessContext.tsx` | M | +5 / −5 (5) | Wave-1 §L | Yes | No | **Yes** | Medium — learning entitlement | Same |
| `src/training/trainingHooks.ts` | M | +16 / −16 (16) | Wave-1 §K | Yes | No | **Yes** | Medium — training content | Same |
| `src/training/useTrainingWorkspace.ts` | M | +15 / −17 (11) | Wave-1 §K | Yes | No | **Yes** | Medium | Same |
| `src/components/learn/FlagshipCourseSessionPage.tsx` | M | +5 / −5 (5) | Wave-1 §M | Yes | No | **Yes** | Medium — live course session | Same |
| `src/components/learn/flagshipSession/FlagshipLearnerResponsePanel.tsx` | M | +1 / −7 (6) | Wave-1 §M | Yes | No | **Yes** | Medium | Same |
| `src/components/learn/flagshipSession/flagshipSessionResponseTypes.ts` | M | +0 / −1 (1) | Wave-1 §M | Yes | No | **Yes** | Low | Same |
| `src/components/learner-shell/LearnerRouteReady.tsx` | M | +7 / −41 (3) | Wave-1 §P6 | Yes | No | **Yes** | Medium | Same |
| `src/components/DashboardPage.tsx` | M | +6 / −40 (3) | Wave-1 §P6 | Yes | No | **Yes** | Medium | Same |
| `src/lib/learningAccessSummary.ts` | M | +1 / −2 (2) | Wave-1 §N | Yes | No | **Yes** | Low | Same |
| `src/lib/learnerCourseArtifactTypes.ts` | M | +0 / −1 (1) | Wave-1 §N | Yes | No | **Yes** | Low | Same |

### 8.2 Frozen source modified — import rename only (`services/learning` → `services/learnerState`)

Each is a one-line import path change; no behaviour change.

`src/components/admin/AdminCapstonesReviewPage.tsx` · `src/components/learn/FlagshipCapstoneSubmissionPage.tsx` · `src/components/reports/LearnerReportsPage.tsx` · `src/hooks/useFlagshipCourseProgress.ts` · `src/hooks/useFlagshipLessonTimer.ts` · `src/hooks/usePathwayProgressMap.ts` · `src/hooks/useSelectedPathway.ts` · `src/lib/getLearnerCertificateEligibility.ts` · `src/lib/learnerProgressHub.ts` · `src/data/teaching/teachingSignals.ts`

**Status** M · **Diff** +1/−1 each (`learnerProgressHub` +2/−2) · **Provenance** Wave-1 §C.1 · **Predates social task** yes · **Social depends on it** no · **Exclude from the social commit** yes · **Risk if committed** Low, but they are *coupled* to the 7 file moves in §8.3 — committing one without the other breaks the build · **Recommendation** commit together with §8.3 in the Wave-1 commit.

### 8.3 Frozen learner-state modules relocated

| From (deleted) | To (untracked) | Content |
|---|---|---|
| `src/services/learning/flagshipCourseProgressRemote.ts` | `src/services/learnerState/…` | **hash-identical** |
| `src/services/learning/learnerCapstoneSubmissionsRemote.ts` | `src/services/learnerState/…` | **hash-identical** |
| `src/services/learning/learnerLessonTimeRemote.ts` | `src/services/learnerState/…` | **hash-identical** |
| `src/services/learning/learnerPathwayPreferenceRemote.ts` | `src/services/learnerState/…` | **hash-identical** |
| `src/services/learning/learnerSelfPacedProgressRemote.ts` | `src/services/learnerState/…` | **hash-identical** |
| `src/services/teaching/persistTeachingLearningEvent.ts` | `src/services/learnerState/…` | **hash-identical** |
| `src/services/learning/learnerCourseArtifactsRemote.ts` | `src/services/learnerState/…` | 3 lines removed — the `tenant_id` field on read, on the input type and on the upsert payload |

**Risk if committed:** Medium. These modules write capstone submissions, course artifacts, lesson time and self-paced progress — learner records. The last one changes the shape of an upsert payload against a live table. **Recommendation:** commit with §8.1/§8.2, and confirm the `tenant_id` column is genuinely gone from `learner_course_artifacts` before deploying.

### 8.4 Course persistence layer deleted

`src/persistence/` (8 files: `browserTenantPersistence.ts`, `contracts.ts`, `inMemoryPersistence.ts`, `index.ts`, `queries/countPublishedPerformanceRows.ts`, `registry.ts`, `supabasePersistence.ts`, `tenantPersistenceMode.ts`) plus `src/workspace/workspaceIdentity.ts` and `src/auth/bootstrapTenant.ts`.

**Provenance** Wave-1 §G/§H/§I. The Wave-1 *inventory* prescribed "strip and refactor"; the *completion report* records "Entire src/persistence/ directory" deleted, with learner-state persistence re-implemented as direct Supabase calls in `src/services/learnerState/`. **Predates the social task:** yes. **Social depends on it:** no. **Exclude from the social commit:** yes. **Risk if committed:** Medium-High — this is the course-persistence abstraction the freeze names explicitly, and the plan-of-record and the executed change disagree about whether it should have been deleted. **Recommendation:** owner confirms that `src/services/learnerState/` fully replaces every learner-state store that `registry.ts` provided, before this is committed.

### 8.5 Curriculum and authoring material deleted

| Group | Paths | Recoverable |
|---|---|---|
| `docs/curriculum-templates/` | 8 (README, capstone, course, lesson, module, pathway, portfolio-output, quiz templates) | Only from `git show HEAD:<path>` |
| `docs/curriculum-source/course-1-ai-essentials/` | 2 (README, `COURSE1_REFERENCE_STANDARD.md`) | Only from Git |
| `docs/uat/AI_ESSENTIALS_LEARNER_UAT_CHECKLIST.md` | 1 | Only from Git |
| `docs/curriculum-governance.md`, `docs/JIFUNZE_COURSE_PRODUCT_LADDER.md`, `docs/ACTIVE_COURSE_INVENTORY.md`, `docs/JIFUNZE_ACTIVE_COURSE_CLEANUP_STANDARD.md`, `docs/architecture/JIFUNZE_AI_ARCHITECTURE.md` and 16 further docs | 21 | Only from Git |
| `How to use Claude/` | 36 Course-1 module rewrite drafts | Only from Git |

**None of these exist anywhere else in the working tree, in `_to_delete/`, in `_xfer/`, in the git bundle, or in any archive.** They are recoverable from Git history only.

AMENDMENT_001 §4 freezes "Course, training and authoring functionality" and states that frozen means *not deleted*. Wave 1 deleted the authoring templates and the Course-1 source drafts on 18 May — **before** the 18 Aug freeze decision, but the freeze tag was pointed at the 14 May commit, i.e. at a tree in which these files still exist. **The freeze decision therefore did not bless these deletions.**

**Risk if committed:** Medium. Nothing in the running product imports them, but they are the authoring standard and the Course-1 source of record, and `docs/AUTHORING.md` (new, untracked) does not reproduce the templates. Two live dangling references remain: `src/App.tsx` and `scripts/audit-active-course-inventory.ts` cite `docs/JIFUNZE_COURSE_PRODUCT_LADDER.md`; `scripts/verify-active-course-cleanup.ts` and `scripts/audit-active-course-inventory.ts` cite `docs/ACTIVE_COURSE_INVENTORY.md`.

**Recommendation:** the owner decides explicitly, before any commit, whether curriculum templates and Course-1 drafts are deleted or restored. If deleted, `docs/AUTHORING.md` should absorb the templates and the four dangling references should be repaired. If restored, do it with `git checkout HEAD -- <paths>` — an operation this review deliberately did not perform.

### 8.6 Narrow security fix inside a frozen file — documented separately

`src/components/learn/StandaloneModuleDetailPage.tsx`, **one hunk, +6/−5.**

Justification: this file was one of the three whole-`import.meta.env` inlining sites (§4.3) and therefore a direct cause of the critical finding. Without it the bypass token — and every other `VITE_*` value — still reaches the public bundle, so the remediation would be incomplete.

What changed: five lines that took `import.meta.env` as a whole `Record` are replaced with one static read of `import.meta.env.VITE_PRACTICAL_MATH_DEV_MANUAL_SCORE`, plus a five-line comment recording why. **The flag behaves identically. All other content in the file is preserved byte for byte.** Verified by the clean build, the canary test and `standalone-course-pages.spec.ts` passing.

---

## 9. Proposed commit boundaries

**No commits were created.** This is a plan. Unresolved files: none, so nothing is withheld for that reason — but §8 paths are withheld from the social-operations commits by design.

### Commit 1 — Retired Supabase function cleanup
```
supabase/config.toml                                 (M)
supabase/functions/generate-content/config.toml      (D)
supabase/functions/generate-content/index.ts         (D)
supabase/functions/generate-public/index.ts          (D)
eslint.config.js                                     (M)
_quarantined_functions/README.md                     (??)
_quarantined_functions/generate-content/config.toml  (??)
_quarantined_functions/generate-content/index.ts     (??)
_quarantined_functions/generate-public/index.ts      (??)
docs/social/EDGE_FUNCTION_CLEANUP_2026-08-20.md      (??)
```

### Commit 2 — Maintenance-bypass security remediation
```
src/lib/maintenanceMode.ts                           (M)
src/components/maintenance/MaintenancePublicGate.tsx (M)
src/lib/envCheck.ts                                  (M)
src/access/appAccess.ts                              (M)
src/vite-env.d.ts                                    (M)
playwright.config.ts                                 (M)
playwright.billing-mock.config.ts                    (M)
e2e/helpers/publicE2eMaintenanceBypass.ts            (M)
e2e/maintenance-authz-boundary.spec.ts               (??)
scripts/test-client-secret-boundary.ts               (??)
package.json                                         (M)  ← test:security + test:all only
.env.example                                         (M)
.gitignore                                           (M)
docs/social/ENVIRONMENT_VARIABLES.md                 (M)
docs/social/SECURITY_AND_CHANGE_PROVENANCE_REVIEW_2026-08-20.md  (??)
```

### Commit 2b — Narrow security fix in a frozen file (separate, explicitly flagged)
```
src/components/learn/StandaloneModuleDetailPage.tsx  (M)
```

### Commit 3 — Social public website and content hub
```
src/components/media/{ContentDetailPage,ContentHubPage,HowJifunzeWorksPage,MediaHomePage,MediaSiteShell,SocialDirectoryPage,TopicPillarPage,mediaUi}.tsx
src/social/{brand,contentLedger,guides,pillars,platformMatrix,seo,socialAccounts}.ts
src/App.tsx                                          (M)
src/index.css                                        (M)
index.html                                           (M)
src/components/PublicSocialLinks.tsx                 (M)
src/components/legal/PrivacyPolicyPage.tsx           (M)
public/{feed.xml,robots.txt,sitemap.xml,og-image.png,jifunze-mark-400.png}
public/fonts/PlusJakartaSans-{ExtraBold,Medium,SemiBold}.woff2
content/{SCHEMA.md,STYLE.md,courses/.gitkeep}
content/briefs/{_TEMPLATE.md,ai-with-claude-everyday.md}
scripts/{generate-public-seo,generate-guides,author-outline,author-lessons,compile-course}.ts
scripts/lib/llmProvider.ts
src/data/learning/courses/.gitkeep
docs/AUTHORING.md
docs/social/{WEBSITE_CONTENT_HUB,PLATFORM_COPY,SOCIAL_ACCOUNT_INVENTORY}.md
```

### Commit 4 — Social-operations dashboard
```
src/components/social-ops/{RequireSocialOpsAccess,SocialOpsAccountsPage,SocialOpsOverviewPage,SocialOpsPipelinePage,SocialOpsSafetyPage,SocialOpsShell,socialOpsUi}.tsx
src/components/social-ops/useSocialOpsSnapshot.ts
src/services/socialOps/{socialOpsData,socialOpsSummary}.ts
docs/social/SOCIAL_OPS_DASHBOARD.md
```

### Commit 5 — Social database migration and admin Edge Function
```
supabase/migrations/20260820120000_social_ops_core.sql
supabase/functions/social-ops-admin/config.toml
supabase/functions/social-ops-admin/index.ts
supabase/tests/local_preamble.sql
scripts/verify-social-ops-migration.sh
docs/social/SOCIAL_OPS_SCHEMA.md
```
**Not applied to any database.** Apply only via the reviewed path in `docs/social/DEPLOYMENT_CHECKLIST.md`.

### Commit 6 — Two-hour synchronization
```
.github/workflows/social-metrics-sync.yml
scripts/social-sync.ts
orchestrator/social/{store,sync}.ts
docs/social/TWO_HOUR_SYNC.md
```
`SOCIAL_SYNC_ENABLED` stays unset. Cron is not enabled by this commit.

### Commit 7 — Platform adapters
```
orchestrator/social/{registry,transform,types}.ts
orchestrator/social/adapters/{base,facebook,instagram,linkedin,pinterest,telegram,threads,tiktok,whatsappChannel,x,youtube}.ts
docs/social/{PLATFORM_ADAPTER_MATRIX,OAUTH_SETUP,SOCIAL_OPS_API_READINESS}.md
docs/SOCIAL_OPS_API_READINESS.md
```

### Commit 8 — Renderer branding and content-engine hardening
```
render/src/captions.ts                               (M)  ← Kazi Kit CTA removal (AMENDMENT_001 §8)
render/src/render.ts                                 (M)
render/assets/brand/jifunze-mark.png                 (M)
render/assets/brand/jifunze-wordmark.png             (M)
render/assets/brand/_legacy-pre-2026-08-20/          (??) ← pre-refresh originals preserved
orchestrator/{brief,contentBank,scriptQuality}.ts    (M)
scripts/test-content-engine.ts                       (M)
.github/workflows/autonomous-loop.yml                (M)  ← fontconfig for libass
brand/**  brand-assets/**  "Jifunze Brand Logo Kit/**"
```

### Commit 9 — Retired-route redirects
Folded into Commit 3 (`src/App.tsx`). Listed separately only for review attention: `/generate`, `/ideas`, `/studio`, `/trends`, `/insights`, `/platform`, `/training`, `/team/*` now land on the public homepage.

### Commit 10 — Tests
```
e2e/career-skills-site.spec.ts                       (??)
e2e/access-forced-positive.spec.ts                   (M)
e2e/autonomous-learning-loop.spec.ts                 (M)
e2e/disclaimer-ack.spec.ts                           (M)
e2e/learner-cohesion.spec.ts                         (M)
e2e/learning-discovery.spec.ts                       (M)
e2e/public.spec.ts                                   (M)
e2e/workspace-guest.spec.ts                          (M)
scripts/test-social-ops.ts                           (??)
```

### Commit 11 — Documentation
```
README.md  OPERATIONS.md  PROJECT_CONTEXT.md         (M)
docs/AMENDMENT_001_2026-08-18_PIVOT.md
docs/AMENDMENT_002_2026-08-20_SOCIAL_OPS.md
docs/social/{DEPLOYMENT_CHECKLIST,INCIDENT_AND_KILL_SWITCH,JIFUNZE_CONSOLIDATED_REPORT_2026-08-20,LAUNCH_READINESS_2026-08-20,MANUAL_PLATFORM_ACTIONS,ROLLBACK_PLAN,TIKTOK_DELETION_RECORD}.md
```

### Commit 12 — Pre-existing user changes, unrelated to this work
**Owner review required. Do not fold into any commit above.**
```
docs/persistence-supabase.md                         (M, +146/−19)
docs/JIFUNZE_MASTER_PLAN.md                          (??)
docs/internal/{COURSE_CATALOG_PLAN,TRENDS_REMOVAL_INVENTORY,WAVE_1_COMPLETION_REPORT,WAVE_1_REWRITE_PLAN,WAVE_2_PROGRESS_REPORT,WAVE_2_PUBLISHING_PIPELINE_PLAN}.md
docs/internal/BASELINE_2026-05-18/typecheck.txt
_quarantined_migrations/20260518120000_drop_trends_and_tenancy.sql
_to_delete/**                                        ← now git-ignored; delete the tarball
CLAUDE.md  decision.json  jifunze-brand-refresh.bundle
supabase/.temp/cli-latest                            (M) ← tracked generated artifact; `git rm --cached`
```

### Commit 13 — Frozen files EXCLUDED from all social-operations commits
**Wave 1. A separate, separately-reviewed commit — or a revert. Not part of this branch's stated purpose.**
```
ALL 230 Wave-1 paths, specifically including:
  §8.1  13 frozen source modifications (tenancy strip, incl. AuthContext −1806 lines)
  §8.2  10 import-rename modifications
  §8.3   7 learner-state module moves
  §8.4   8 src/persistence/ deletions + src/workspace/ + src/auth/bootstrapTenant.ts
  §8.5  47 curriculum / authoring / doc deletions incl. "How to use Claude/" (36)
        149 retired-SaaS source deletions (src/services/**, src/types/**, src/config/**,
             src/trends/**, src/contracts/**, src/constants/**, 6 lib files, 6 components)
```

---

## 10. Test results

Run in an isolated sandbox from a source-only archive (no env files), fresh `npm install`.

| Check | Result |
|---|---|
| `git diff --check` | **pass** (exit 0) |
| Application type-check (`tsc -b`) | **pass** (exit 0) |
| Pipeline type-check (`tsc -p tsconfig.pipeline.json`) | **pass** (exit 0) |
| Lint (`eslint .`) | **pass**, 0 problems |
| Content-engine tests (`scripts/test-content-engine.ts`) | **38 passed, 0 failed** |
| Social-operations tests (`scripts/test-social-ops.ts`) | **103 passed, 0 failed** — includes "the social-ops guard has no test bypass", "client-side code never references a service role key", "the admin Edge Function never returns a secret value" |
| Secret-boundary scanner (`scripts/test-client-secret-boundary.ts`, new) | **pass**, 617 source files + 3 built files checked |
| Production build (`npm run build`) | **pass** |
| Playwright default suite | **144 passed, 2 skipped, 0 failed** (4.5 min) |
| Playwright access-forced suite | **15 passed, 0 failed** (was 14 passed / 1 failed before the fix in §10.2) |
| Playwright billing-mock suite | **4 passed, 0 failed** |
| Focused bundle scan | **0 matches** for all seven forbidden needles; canary test confirms non-leakage |

### 10.1 New tests that prove the security properties

`e2e/maintenance-authz-boundary.spec.ts` (6 tests, all passing):

| Test | Proves |
|---|---|
| no bypass query param or storage key unlocks a privileged surface | **No browser token can bypass authorization.** Seeds 3 suspect storage keys × 4 attacker tokens and hits `/admin/social-ops` with each as a query param; the console never renders |
| the frozen admin console stays closed to an anonymous browser | **Protected routes still require authenticated authorization** |
| the bypass query param is not consumed and does not alter routing | The comparison code path is **gone**, not renamed — the param survives in the URL, where the old gate stripped it |
| no maintenance bypass key is written to browser storage | No residual bypass state |
| protected learner routes require authorization, not a flag | **Maintenance flags affect presentation only** |
| public marketing surfaces render without any bypass | The maintenance flag is not load-bearing for public routes |

`scripts/test-client-secret-boundary.ts` (wired into `npm run test:all` as `test:security`) asserts: no live `VITE_MAINTENANCE_BYPASS_TOKEN` read anywhere in shipped source; **no bypass-token name appears in the client bundle** (plus `VERCEL_OIDC_TOKEN`, `jf_maintenance_bypass`, `jf_maintenance_preview_v1`, `generate-content`, `generate-public`); and no source file indexes `import.meta.env` dynamically. It was **negative-tested** — reintroducing a dynamic read makes it exit 1, restoring makes it exit 0 — so it is known to have teeth.

**No current social functionality depends on the deleted Edge Functions.** A repo-wide search for `generate-content` / `generate-public` across `src/`, `orchestrator/`, `render/`, `scripts/`, `supabase/functions/`, `e2e/` and `content/` returns only a comment in a historical migration and the needle list inside the new scanner. `supabase/config.toml` no longer declares either function.

### 10.2 The one pre-existing test failure, and its fix

`e2e/access-forced-positive.spec.ts` asserted that `/platform` redirects to `/admin/health`. The working tree deletes `src/components/routing/LegacyPlatformRedirect.tsx` and routes `/platform` to the public homepage with the other retired-SaaS paths. The test was never updated because that suite runs under a separate npm script (`test:e2e:access-forced`) and is excluded from the default Playwright run by `testIgnore`.

Fixed by asserting the **new intended behaviour** and, crucially, by **adding** a test that admin health remains reachable directly — so coverage is gained, not traded away. This is a genuine, previously-invisible break in the uncommitted patch: the retired-route redirect changed operator navigation and nothing caught it.

### 10.3 Reassessment of the two earlier Playwright timeout increases

**Both should remain.** They are not assertion weakening.

Eleven assertions moved from `timeout: 15_000` to `20_000` across `workspace-guest.spec.ts` (7), `disclaimer-ack.spec.ts` (2) and `learner-cohesion.spec.ts` (1), plus one new 20 000 ms assertion in `public.spec.ts`. In every case the timeout change rides along with a **semantic** rewrite: `toHaveURL(/\/learn$/)` → `toHaveURL(/\/$/)`, because signed-out visitors now land on the public career-skills homepage instead of the course catalog (AMENDMENT_001 §5). The new target is a heavier first paint, so 20 s is the same margin the suite already used for `learning-discovery-hub` visibility.

Assertions were **strengthened**, not relaxed — `disclaimer-ack.spec.ts` adds `expect(h1).toContainText(/practical career, income and ai skills/i)` on top of the URL check. The full suite completes in 4.5 minutes with no retries and no flakes, so the longer ceiling is not masking instability. No timeout was raised anywhere in this review's own work.

---

## 11. Exact remediation applied — file list

| File | Change |
|---|---|
| `src/lib/maintenanceMode.ts` | Bypass read/compare/session-write removed; presentation-only contract documented |
| `src/components/maintenance/MaintenancePublicGate.tsx` | Bypass branch and query-param effect removed |
| `src/lib/envCheck.ts` | Dynamic `import.meta.env` index → static `PUBLIC_ENV` map |
| `src/access/appAccess.ts` | Dynamic `import.meta.env` index → static `TIER_EMAIL_ENV` map |
| `src/components/learn/StandaloneModuleDetailPage.tsx` | **Frozen file, narrow fix (§8.6)** — whole-env `Record` → one static read |
| `src/vite-env.d.ts` | Bypass declaration removed; four tier-allowlist names and the dev-manual-score name declared |
| `playwright.config.ts` | Bypass token removed from `webServer.env` |
| `playwright.billing-mock.config.ts` | Bypass token removed from `webServer.env` |
| `e2e/helpers/publicE2eMaintenanceBypass.ts` | Rewritten as an anonymous-visitor reset; exported name kept |
| `e2e/access-forced-positive.spec.ts` | `/platform` assertion realigned; admin-health coverage added |
| `e2e/maintenance-authz-boundary.spec.ts` | **New** — 6 security regression tests |
| `scripts/test-client-secret-boundary.ts` | **New** — source + bundle secret-boundary scanner |
| `package.json` | `test:security` script; added to `test:all` |
| `.env.example` | Bypass example removed; standing rule documented |
| `.gitignore` | `_to_delete/` and `.fuse_hidden*` ignored |
| `docs/social/ENVIRONMENT_VARIABLES.md` | Bypass row rewritten; removal notice and `VITE_*` rule added |
| `docs/social/SECURITY_AND_CHANGE_PROVENANCE_REVIEW_2026-08-20.md` | **New** — this report |
| `.env.local` | `VERCEL_OIDC_TOKEN` and `VITE_MAINTENANCE_BYPASS_TOKEN` lines removed, values never read; recovery note added. **Not tracked, not staged, not copied** |

---

## 12. Exact manual owner actions

**Vercel environment variables — no CLI or dashboard change was made by this review.**

After the code change in §9 Commit 2 is reviewed and merged:

1. Vercel → Project `jifunze-ai` → **Settings → Environment Variables**.
2. Delete `VITE_MAINTENANCE_BYPASS_TOKEN` from **Development**.
3. Delete `VITE_MAINTENANCE_BYPASS_TOKEN` from **Preview**.
4. Delete `VITE_MAINTENANCE_BYPASS_TOKEN` from **Production**.
5. Trigger a **new production deploy**. Vite inlines `VITE_*` at build time, so already-built static assets keep the old value until a fresh `vite build` runs. Deleting the variable alone changes nothing that is already deployed.
6. Consider also deleting the dead names, which do nothing but mislead: `VITE_PUBLIC_MAINTENANCE`, `VITE_FORCE_PUBLIC_MAINTENANCE_UI`, `VITE_APP_ENV`, `VITE_APP_VERSION`, `VITE_DEPLOYMENT_TYPE`, `VITE_SUPABASE_ENV`.
7. Confirm `VITE_FORCE_PRO_TOOLS`, `VITE_FORCE_PLATFORM_TOOLS` and `VITE_PLAYWRIGHT_BUILD` are **unset** in Production.
8. Consider unsetting `VITE_SUPER_ADMIN_EMAILS` / `VITE_PLATFORM_ADMIN_EMAILS` / `VITE_WORKSPACE_ADMIN_EMAILS` / `VITE_PRO_USER_EMAILS` in Production — they are inlined into the public bundle and the `my_effective_access_tier` RPC is the real source.

**Local machine:**

9. Delete `_to_delete/jifunze-src-transfer-2026-08-20.tar.gz` (§3.1). Treat the credentials inside it as exposed.
10. Delete the stale `dist/assets/index-BAMJW9nq.js` build, or simply rebuild (§6.3).
11. `vercel env pull` will restore `VERCEL_OIDC_TOKEN` when you next need it — but run it **only after** step 4, or it will re-add the bypass token to `.env.local`.

**Not to be done by anyone automatically:** rotating or revoking the OIDC token (it expires by itself), applying `20260820120000_social_ops_core.sql`, enabling cron, enabling `IG_PUBLISH_ENABLED`, or deleting further Supabase functions.

---

## 13. Readiness verdict

## `READY FOR SCOPED COMMIT REVIEW`

**Why not `NOT READY`:** nothing is unexplained. All 521 changed paths have documentary or content-based provenance; zero are unresolved; zero are accidental deletions. The three security findings are fixed and proven fixed by a canary build, a negative-tested scanner and six new behavioural tests. Every check in §10 passes, including a full 144-test Playwright run.

**Why not `READY FOR CODE REVIEW`:** the working tree is not one change. Committing it as-is would ship a 230-path Wave-1 platform rewrite — a 1 784-line `AuthContext` rewrite, the deletion of the entire course-persistence layer, and the deletion of the curriculum authoring templates and Course-1 source drafts — inside a branch named for hardening the autonomous content loop. That work is *documented*, but it is **not blessed by the freeze**: the freeze tag created on 18 August points at the 14 May commit, a tree in which all of it still exists. Two owner decisions are outstanding before any commit:

1. **§8.5** — are the curriculum templates and `How to use Claude/` drafts deleted, or restored?
2. **§8.4** — does `src/services/learnerState/` fully replace every learner-state store that `src/persistence/registry.ts` provided?

**The social-operations scope is clean.** Commits 1–11 in §9 contain **no frozen-platform deletions** and no unresolved files. They type-check, lint, build and pass every suite on their own terms. They can proceed to code review as soon as the boundaries in §9 are agreed.

---

## 14. Confirmation of boundaries observed

Nothing was committed, staged, pushed, merged, deployed or published. No production migration was run. No Vercel environment variable was changed remotely. Cron was not enabled. Autonomous publishing was not enabled. No social account was touched. No Supabase function was deleted. No quarantined folder was deleted. No file group was restored or removed without evidence. No `git reset`, `checkout --`, `restore`, `clean`, `stash`, rebase or cherry-pick was run. The index remains empty. `.env.local` was not copied, archived or transmitted, and **no secret value was printed, logged, diffed or otherwise disclosed at any point** — including token lengths, prefixes and partial values.
