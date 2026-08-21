# Jifunze.ai — Phase A preflight report

**Date:** 2026-08-21 · **Brief:** Master implementation brief (signal-to-content engine as the product)
**Repo:** `neuralbuildlabai/jifunze-ai` · **origin/main:** `78062b1` (merge of PR #4)

## Verdict

Preflight is complete. Per the brief's own rules, implementation stops here for two reasons:

1. **The freeze gate is blocked.** The brief requires tag `jifunze-learn-frozen-2026-08-21` and branch `archive/jifunze-learn` to be created **and verified on the remote** before any code removal. This session's git proxy denies pushes to this repo (exact error below), and git write operations on the Mac's mounted copy are unreliable (stuck lock files it cannot delete). Three unblock options are listed in §2 — one takes about a minute.
2. **The first-PR scope is far too large for one safe PR.** The Learn removal alone touches 531 of 643 source files (~116k LOC, plus 148 MB of course assets); the brief's 23-item PR scope spans four distinct concerns. A numbered PR sequence with exact boundaries and dependencies is proposed in §8.

Nothing was modified, committed, pushed, published, or enabled. Course data is untouched.

---

## 1. Repository state (frozen-commit candidate)

| Item | Value |
|---|---|
| `origin/main` tip | **`78062b1`** — "Merge pull request #4 … chore/harden-autonomous-content-loop" |
| Proposed frozen commit | **`78062b1`** (tag + archive branch should point here) |
| Existing freeze tag | `learning-platform-frozen-2026-08-18` → `fc901a0` (verified: ancestor of main). **No archive branch exists yet.** |
| Other tags | `v0.1-stable-ai-core` |
| Remote branches | `main`, `chore/harden-autonomous-content-loop` (merged), `cleanup-route-separation`, `feat/autonomous-engine`, `feat/hybrid-content`, `fix/loop-artifacts` |
| Governance in repo | `OPERATIONS.md` (source of truth) + `AMENDMENT_001` (pivot) + `AMENDMENT_002` (social ops) — both amendments still marked **Proposed** |

**The new master brief supersedes the amendments in three ways** that should be recorded as an Amendment 003 in PR 1: (a) Learn moves from *frozen-in-place* to *completely removed from active code*; (b) the editorial pillars change (§6 below); (c) research/verification, human review, and the engagement feedback loop become required stages, and the target framing broadens from "career-skills media brand (Kenya-first)" to the brief's six pillars.

### ⚠ The working copy on your Mac needs manual cleanup

`/Users/omoke/projects/jifunze-ai` is **not** at main. It is on branch `chore/harden-autonomous-content-loop` at `14b183e` (1 commit behind main) with **276 uncommitted changes** — 236 deletions (course docs and course src), 25 modifications, 15 untracked files — apparently an earlier session's in-progress removal work that was never committed. It also has **stuck lock files** (`.git/HEAD.lock`, `.git/index.lock`) that this session cannot delete (the file bridge cannot unlink files), so git writes there will keep failing.

Run these yourself in Terminal when convenient:

```bash
cd ~/projects/jifunze-ai
rm -f .git/HEAD.lock .git/index.lock
# Optional: keep the old WIP as a patch before discarding it
git diff > ~/Desktop/jifunze-wip-2026-08-21.patch
git checkout -- . && git clean -fd    # discard WIP (removal will be redone properly from main)
git checkout main && git pull
```

The WIP is safe to discard: it removed course files **without** the required freeze verification, started from a non-main commit, and the PR sequence below redoes removal correctly and completely.

---

## 2. Freeze gate — BLOCKER and how to clear it

Push attempt from this session (read-clone works; push does not):

> `remote: access denied by the git proxy: neuralbuildlabai/jifunze-ai is not in this session's authorized repository set, so the proxy will not inject a credential for it. To fix, add the repository to the session's sources.`

Three ways to clear the gate — any one works:

- **Option A (recommended): authorize the repo for Claude sessions.** Add `neuralbuildlabai/jifunze-ai` to the session's authorized sources/GitHub connection in the Claude app. I can then create the tag and archive branch, push, verify them remotely, and open every PR in the sequence myself.
- **Option B: run four commands yourself** (about a minute):

  ```bash
  cd ~/projects/jifunze-ai   # after the cleanup in §1
  git tag -a jifunze-learn-frozen-2026-08-21 78062b1 -m "Jifunze Learn frozen for removal; restore via archive/jifunze-learn"
  git branch archive/jifunze-learn 78062b1
  git push origin jifunze-learn-frozen-2026-08-21 archive/jifunze-learn
  git ls-remote --tags --heads origin | grep -E "jifunze-learn"   # verification
  ```
- **Option C: patch workflow.** I prepare every change as `git format-patch` files; you apply and push. Slowest and most error-prone; OPERATIONS.md already documents it as the fallback.

Note: the existing `learning-platform-frozen-2026-08-18` tag stays. The new tag/branch point at `78062b1` so the archive includes the social-ops work merged since the 18th.

---

## 3. Jifunze Learn inventory (removal boundary)

Full detail lives in the repo audit; the shape:

| Area | Scale | Notes |
|---|---|---|
| `src/` Learn-only code | **531 of 643 files, ~116k LOC, ~5.5 MB** | learn/, learner-shell/, libraries/, admin/ (13-page learn admin), training/, pathways/, teaching/, pricing/, subscription/, 8/8 hooks, 56/63 lib modules, etc. |
| Course data compiled into the bundle | `src/data/` — 121 files, **~3.3 MB / 57k LOC**, all statically imported | Largest single file 494 KB. One import from a kept legal page keeps the whole tree alive (see traps) |
| Course assets | `public/course-assets/` **148 MB** + `public/training/` 228 KB | Not Vite-bundled but shipped to Vercel; `vercel.json` rewrite exempts it |
| Authoring sources | `training/` (75 files), `training-imports/` (7), `content/` (5) | Pure source material |
| Routes | ~60 course/library/lesson routes + learner shell + 14 learn-admin routes in `src/App.tsx` | Single 467-line router |
| Payments | `supabase/functions/stripe-{checkout,portal,webhook}`, 3 billing lib files, pricing/checkout UI, entitlement layer | Stripe called over HTTP from Deno — **no npm dependency changes at all** |
| Scripts / tests | ~50 of 66 `scripts/`, ~40 of 70 npm scripts, 22 of 27 e2e specs, 2 Playwright configs | |
| Supabase migrations (53) | 33 course · 4 social · 16 shared/foundational · 2 retired-SaaS | **Never deleted from history**; active branch keeps shared ones. `20260514120000_admin_platform_rbac` defines `is_admin()` that social-ops RLS depends on **and** course tables — must be split conceptually, not dropped |
| Storage buckets | `capstone_submissions` (course) · `reels` (social) | |
| Env vars | 15 `VITE_*` + 10 server vars course-only; 5 retired-SaaS vars | Full lists in the audit |

**Separate boundary, same cleanup wave:** ~59 orphaned files under `src/services/{autonomy,content,signals,publishing,…}` plus 15 of 18 `src/config/` files are leftovers of the *retired multi-tenant SaaS*, not Learn. Remove them too, but label them distinctly so the archive story stays accurate.

### Shared-dependency traps (why PR 1 exists)

1. `src/training/trustCopy.ts` exports `LEGAL_ROUTES`, imported by 30+ kept files including the social-ops guard. `rm -rf src/training` breaks the console. **Extract first.**
2. `src/learner/learnerCommerceConstants.ts` → flag imported by the kept footer and `App.tsx`. Inline it.
3. `components/legal/FullDisclaimerPage.tsx` imports one string from a 1.8 MB course-data dir — the only edge keeping `src/data/` in the bundle. Inline it.
4. `src/lib/signedInDefaultRoute.ts` hardcodes `/dashboard` + learn-path allowlist; used by sign-in and `HomeEntryPage`. Rewrite.
5. `src/lib/admin/adminAccess.ts` is the only survivor in its directory; `src/access/*` (6 files), `src/auth/*` (4 of 5), `src/persistence/*` are all shared. Deletion must be surgical, not directory-wise.
6. `src/index.css` is one global stylesheet: `.jf-media` scope is the new brand; base `:root` tokens and `.jf-learn-warm` (orange) are Learn's. Prune carefully — mistakes fail silently.
7. `vercel.json` rewrite regex references `course-assets/` — edit when the assets go.

**Good news:** the engine is fully decoupled — `orchestrator/` + `render/` import only 7 files from `src/` (all in `src/social/` + one summary module). Removal requires **zero npm dependency changes**.

---

## 4. Engine capability vs. the 10-step loop

| Loop stage | State | Gap |
|---|---|---|
| 1. Signal discovery | **Partial** | RSS/Atom only, 7 seeded feeds. URL-dedup only — no clustering. **No signal lifecycle** (never marked selected/rejected/consumed; same story can be re-picked). Cron is documented SQL, not versioned code |
| 2. Scoring & selection | **Working, shallow** | Deterministic keyword scoring (relevance, careerScore, freshness) + 7-category off-brand veto + thresholds; auditable `decision.json`. But the gating scores aren't persisted to `content_opportunities`, and selection picks exactly one item/day |
| 3. Research & verification | **MISSING** | No claim extraction, corroboration, second source, or fact-check. Published output carries **no attribution**. `content_sources` table exists; nothing writes it. Largest single gap |
| 4. Content creation | **1 of 5 formats** | Faceless Reel only (ffmpeg, captions, brand mark, no voiceover). No image/carousel/infographic path. Brief lacks hashtags/CTA/alt-text/sources. A full per-platform variant builder (`transform.ts`) exists but **is never called by the loop** |
| 5. Quality gates | **Editorial only** | Script-quality gate + banned phrases + CTA inversion are solid. No safety gates (toxicity, misinfo, medical/financial, PII, copyright). `safety_status` column never computed. `PROHIBITED_CLAIMS` linter not applied on the publish path |
| 6. Human review | **Schema-only** | `content_approvals`/`approval_status` exist with RLS; **no code writes them, no UI exposes them**. `run.ts` publishes with no approval step — only `DRY_RUN` + `IG_PUBLISH_ENABLED` stand in the way. The Safety page's "nothing publishes without a recorded approval" is a hardcoded string, not a check |
| 7. Publish to Instagram | **Ready, gated off** | Reels via Edge Function; 3-layer gating (`DRY_RUN` default-true, `PUBLISH_SECRET`, `IG_PUBLISH_ENABLED` unset); idempotency-keyed; token auto-refresh. 10 adapters exist; 9 refuse by design; the daily loop bypasses the adapter layer entirely |
| 8. Metrics sync | **Built, off, starved** | 2-hour sync gated by unset `SOCIAL_SYNC_ENABLED`. Post-metrics read `content_publications`, which **nothing writes** → zero post metrics would flow even if enabled. Anomaly detection implemented + tested but never invoked in the run path |
| 9–10. Learn & improve | **MISSING** | Nothing reads metrics or `content_opportunities` back. `recentTopicIds` (the only memory hook) is always `[]`. No insights, no per-pillar/hook/time performance model |

**The admin console** (`/admin/social-ops`: Overview, Accounts, Pipeline, Safety) is a well-secured read-only dashboard (server-side RLS on `is_admin()` + Edge Function re-check), not an operations console: no review queue, no approve/reject, no preview, no scheduling, no feed moderation.

**Highest-leverage engine fixes, in order:** (a) write the ledger (`content_items`/`content_sources`/`content_publications`) from the loop — unblocks approval, dedupe, post metrics, and the dashboard at once; (b) enforce an approval gate between quality gate and publish; (c) add the research/attribution stage; (d) route publishing through the adapter/transform layer; (e) read metrics back into selection.

---

## 5. Website, branding, admin vs. the brief

| Brief requirement | Verdict |
|---|---|
| `/admin/login` | **Missing** — admin uses the shared learner `/auth/sign-in` |
| Admin Login link in header/footer | **Missing** |
| No public registration | **Fails** — `/auth/sign-up` is wide open ("Create your free account… courses, lessons") |
| No course/pricing/enrollment UI | **Fails** — `/learn` (~60 routes), `/pricing`, `/learn/checkout`, `/paths` all public; **the 404 page links to the course catalog** |
| Hero = "Your idea never sleeps." | **Demoted** to a small grey sub-line; hero is a different sentence |
| `/ai-disclosure` | **Missing** |
| `site.webmanifest` | **Missing** — and requesting it returns SPA HTML with HTTP 200 |
| Approved favicon | **Fails** — `public/favicon.svg` is the scaffolding lightning-bolt with gradients; approved `brand/favicon/*` files were never copied into `public/` |
| Retired branding absent | **Fails** — old grey/blue "Jifunze.AI" PNGs with **"Create smarter, Grow faster." baked into the image** ship on 404, all legal pages, auth, pricing via `JifunzeBrandLogo` (which also hardcodes ".AI" in markup). Orange `.jf-learn-warm` theme intact. `brand-assets/` holds 21 superseded grey/blue files |
| 410/404 behavior | **Fails** — no 410 anywhere; retired routes are client redirects returning 200; a pure SPA on the current `vercel.json` cannot emit a real 410/404 status |
| Legal pages on-brand | **Fails** — old chrome, LMS/SaaS-era privacy copy, `lastUpdated 2026-04-16`, contact page shows `neuralbuildlab.ai@gmail.com` instead of `hello@jifunze.ai` |
| 21-file brand kit | **Present and verified** (`Jifunze Brand Logo Kit/` = exactly 21 files; `brand/` has the full spec + SVG/PNG/favicon/fonts) — but almost entirely **unwired** |
| `index.html` metadata | **Mostly good** — on-brand OG image, JSON-LD, theme color `#0B0B12`, Plus Jakarta Sans preload (scoped to `.jf-media` only) |
| Social directory | **Present** (`/social`), fed from one source of truth, with anti-impersonation checks |
| Latest posts | **Present but static** — 18 build-time guides compiled into the bundle; no cached-post table or endpoint; a new post can't appear without a redeploy |
| robots/sitemap | Good (no course URLs in sitemap) — but `/learn`, `/pricing`, `/auth/sign-up` remain crawlable |

### Social account verification table (inventory verified live 2026-08-20)

| Platform | Handle | Status | Pending owner actions |
|---|---|---|---|
| Instagram | `@jifunze.ai` | ✅ Verified, API-`ready`, publishing gated off | Display name + bio link (mobile app only) |
| Facebook | Page `61593186673039` | ✅ Verified | Page rename, claim vanity URL, remove "Always open" hours |
| Threads | `@jifunze.ai` | ✅ Verified | Website link (mobile app only) |
| TikTok | `@jifunze_ai` | ✅ Verified (20 Aug pass done) | — |
| YouTube | `@jifunze-ai` | ✅ Verified | Channel rename (rate-limited, retry) |
| X | `@JifunzeAI` | ✅ Verified | Delete 3 obsolete May posts promoting the LMS |
| LinkedIn | `jifunze-ai` | ✅ Verified | Delete 2 obsolete April posts selling the removed SaaS |
| Pinterest | `@jifunzeai` | ✅ Verified | Domain claim completes on next deploy |

---

## 6. Pillar reconciliation — decision needed

There must be one authoritative pillar definition. Today it is six pillars — `cv`, `interview`, `ai_task`, `money`, `applications`, `mindset` — hardcoded in **three places that can drift**: `src/social/pillars.ts` (canonical), `orchestrator/contentBank.ts` (duplicate TS union), and the `content_items.pillar` SQL CHECK constraint, plus the generated `guides.ts` and website copy.

The brief specifies: **Practical AI · Career growth & employability · Income & business skills · Digital tools · Productivity · Opportunities & resources.** Proposed mapping (to be confirmed):

| Current | → Brief pillar |
|---|---|
| `ai_task` | Practical AI |
| `cv` + `interview` + `applications` + `mindset` | Career growth & employability (partly Opportunities & resources for `applications`) |
| `money` | Income & business skills |
| — (new) | Digital tools · Productivity · Opportunities & resources |

The migration touches the content bank (16 evergreen topics tagged by old pillar), scoring keyword families, the SQL CHECK, the website topic pages, and the generated guides. Recommended: single `PILLARS` module consumed everywhere, plus a test asserting TS ↔ SQL parity. **Scheduled for PR 3/4; needs your sign-off on the mapping.**

---

## 7. CI and branch protection facts

The five `pr-ci.yml` checks, exactly as GitHub reports them:

1. `PR checks / Lint and type-check`
2. `PR checks / Unit suites`
3. `PR checks / Build and secret-boundary scan`
4. `PR checks / Playwright`
5. `PR checks / Migration verification`

Branch protection cannot be configured or verified from this session (no GitHub API access). Owner action on GitHub → Settings → Branches → protect `main`: require PR + 1 approval, require the five checks above, require branch up-to-date, require conversation resolution, block force pushes and deletion, restrict bypass. I will not claim it is enabled until verified.

Other workflows verified safe: `autonomous-loop.yml` (daily, `DRY_RUN` fails safe to `true`), `social-metrics-sync.yml` (2-hourly, visibly short-circuits on unset `SOCIAL_SYNC_ENABLED`, publish secrets deliberately not passed to it).

---

## 8. Proposed PR sequence (exact boundaries and dependencies)

**PR 1 — Freeze records + shared-code extraction** *(depends on: freeze gate cleared — §2)*
Amendment 003 (records this brief: full removal, new pillars, review/research/feedback requirements). Freeze documentation (`docs/freeze/`): frozen commit, DB schema + migration inventory, buckets, env vars, known-working/incomplete functionality, test results at freeze, restoration procedure. The four shared-code extractions from §3 (LEGAL_ROUTES out of `trustCopy`, inline commerce flag, inline disclaimer string, rewrite `signedInDefaultRoute`). Zero behavior change; all suites must stay green. *Small.*

**PR 2 — Remove Learn from the active application** *(depends on PR 1)*
Delete the 531-file Learn set + course data + `public/course-assets` + `training/` + `training-imports/` + course scripts/e2e/npm-scripts/Playwright configs/env vars; delete the retired-SaaS orphans (labeled separately); remove course routes, learn-admin shell, **public sign-up**, pricing/checkout; stop deploying `stripe-*` functions; rewrite `App.tsx`; retired course routes → intentional retired response; keep shared migrations, social-ops, legal, sign-in. No DB migration. Verified by bundle greps (`/learn`, checkout, enrollment, obsolete logo filenames…), full CI, and a production-build route walk. *Large but mechanical; the risky parts were de-risked in PR 1.*

**PR 3 — Brand + public site (Phase C)** *(depends on PR 2)*
New landing page per brief §12 (hero **"Your idea never sleeps."**, mission, authoritative pillars, formats as "What we create", how-it-works loop, AI disclosure block, Admin Login in header + footer). `/ai-disclosure`, refreshed `/privacy` + `/terms` + `/contact` on-brand. Approved favicon/ICO/apple-touch-icon/`site.webmanifest` wired from `brand/`; old logo PNGs, lightning favicon, orange theme, `brand-assets/` retired from active use; `JifunzeBrandLogo` rebuilt (no ".AI"). `vercel.json`: static-asset misses stop returning SPA HTML; real 404/410 statuses for retired routes (needs Vercel routing config or a tiny edge handler — the pure-SPA limitation is real). Sitemap/robots/feed regenerated; pillar reconciliation lands here (with your mapping decision). *Medium.*

**PR 4 — Admin foundation (Phase D)** *(depends on PR 2; parallel with PR 3 after rebase)*
`/admin/login` (admin-only, invite-only wording, no enumeration) → `/admin` overview shell with the brief's navigation, honest complete/partial/deferred labeling. Preserve the four verified social-ops pages inside the new shell. First real module: **Signals inbox** reading `ingested_signals` (+ signal lifecycle columns via a reviewed additive migration). Publishing stays off. *Medium.*

**PR 5 — Public feed contract + safe states** *(depends on PR 3)*
Normalized cached public-post read path (the social-ops schema already models it), landing-page post cards with empty/stale/failure states, admin manual verified-URL entry, no browser-side platform API calls, no tokens in the bundle. Ships against the empty state — no credentials required. *Small–medium.*

**Next wave (engine, one PR each):** ledger writes from the loop + enforced approval gate → research/attribution stage → additional Instagram formats (image, carousel) → metrics-to-scoring feedback + insights page. **Phase E** (apply social-ops migration, deploy `social-ops-admin`, configure credentials, supervised dry-run week, controlled first posts) stays separately approved per brief §19 — none of it is in PRs 1–5.

### Brief §22 item → PR mapping

Items 1–3 → gate + PR 1 · items 4–7 → PR 2 · items 8, 11 (states), 12, 17, 18, 19 → PR 3 · items 13, 14, 15, 16 → PR 4 (15 partly PR 1/2) · items 9–11 → PR 3+5 · items 20–23 → every PR (CI green, no publishing, no destructive migration, preview deployment per PR).

---

## 9. Database & storage freeze plan (no destructive action)

Inventory: 33 course migrations (tables incl. training plans/quizzes, flagship progress, learner artifacts, capstones, Stripe billing/entitlements, learning access), bucket `capstone_submissions`, RPCs incl. `admin_search_learners`, `admin_get_platform_metrics`; shared: RBAC/`is_admin()`, profiles, tenants, access-tier RPCs (social-ops RLS depends on these — keep). Plan: (1) course tables stay in the live DB untouched; (2) owner-run verifiable backup before PR 2 merges: `supabase db dump --project-ref gkhvhisuvcfbsicwjdvm -f jifunze-learn-freeze-2026-08-21.sql` (+ `--data-only` pass) and a storage export of `capstone_submissions`; (3) migrations preserved on `archive/jifunze-learn` and in git history; (4) active app loses all course DB call sites in PR 2 (verified by grep + RLS posture); (5) Stripe webhooks disabled at the Stripe dashboard (owner) and `stripe-*` functions removed from deploys — webhook secret rotation optional but recommended; (6) destructive cleanup deferred to a separately approved future decision, as required.

---

## 10. Risks

1. **Two "sources of truth" drifting** — OPERATIONS.md/Amendments vs. this brief. Amendment 003 (PR 1) closes it; until merged, the repo self-describes differently than the brief.
2. **SPA status-code limitation** — real 404/410 needs Vercel config beyond the current single rewrite; treat as a design task in PR 3, not a checkbox.
3. **Public feed freshness** — until Phase E connects sync, "latest posts" will render from the ledger/manual entries; the UI must be honest about staleness (PR 5 states).
4. **Pillar migration** touches scoring keywords — bad mapping quietly degrades signal selection. Needs the §6 decision plus content-engine tests updated in the same PR.
5. **Live Supabase retains course tables + RLS** while the app no longer references them — intended, but document in freeze records so nobody "cleans up" casually.
6. **Mac working copy** — until the §1 cleanup, any local git operation may fail on the stuck locks; don't work from that checkout.
7. **Owner platform actions** (§5 table) are outside code: obsolete X/LinkedIn posts still sell retired products.

---

*Prepared 2026-08-21 from a read-only clone of `origin/main` (`78062b1`) plus inspection of the connected working copy. No repository content, database, storage, credentials, or switches were changed.*
