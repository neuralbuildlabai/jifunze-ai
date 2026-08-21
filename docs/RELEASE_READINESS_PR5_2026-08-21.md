# Release readiness — PR #5 (Instagram-first pivot)

**Date:** 2026-08-21 (15:05 UTC) · **PR:** https://github.com/neuralbuildlabai/jifunze-ai/pull/5 (draft — kept draft)
**Prepared by:** release-readiness session (read-mostly; every write is itemized in §16/§19)

---

## 1. Executive verdict

The pivot branch itself is release-ready: all five CI checks are green at the release
candidate, the full local verification (lint, both type-checks, 45 + 110 unit tests,
secret-boundary scan over source and `dist/`, role-routing, 52/52 Playwright e2e) passes, the
1,491-file deletion boundary is exactly as documented, publishing remains provably disabled,
and desktop + mobile UAT of the built site (served under the shipped `vercel.json` semantics)
matches the approved brief on every checked route.

**Merge is still gated on owner actions**, not on code: branch protection needs one GitHub
email-verification click to save (the rule is fully staged), the pre-merge backup checklist is
owner-run (credentials are not — and should not be — available to this session), Stripe could
not be inspected (dashboard not signed in), and one **environment surprise** needs a decision:
**production (`www.jifunze.ai`) is currently serving a manually-deployed build in which the old
Learn platform is still publicly reachable** (`/learn` → 200, `/auth/sign-up` → 200 with
"Create your free account"), because the Vercel project is no longer Git-connected and was
deployed from the CLI ~15 h before this review. Merging PR #5 alone will not change production
until a deploy is performed.

Two small, non-destructive fixes were made on the branch during this review (§16).

## 2. PR and commit identity

| Item | Value |
|---|---|
| PR | #5 — "Jifunze pivot: Instagram-first social learning media system (complete Learn removal)" |
| State | Open, **Draft** ("Not ready"), 0 conversations, no reviews |
| Base ← head | `main` (78062b1) ← `feat/jifunze-social-media-pivot` |
| Head at review start | `4f657e1` (= remote; clean tree; 11 commits ahead of main) |
| Diff | 1,594 files: +7,428 / −239,819 (D 1,491 · A 48 · M 54 · R 1) |
| Archive tag | `jifunze-learn-frozen-2026-08-21` (tag obj `e4bbcf8`) → `78062b1` ✅ |
| Archive branch | `archive/jifunze-learn` → `78062b1` ✅ |
| WIP archive | `archive/wip-pre-pivot-2026-08-21` → `d20916f` ✅ exists |
| Brand refresh | `feat/jifunze-brand-refresh` → `83029f0` ✅ exists |
| `main` | `78062b1` — untouched ✅ |

Workspace note: this session runs in a fresh cloud container; `~/projects/jifunze-ai-pivot`
was recreated by cloning the pushed branch (bit-identical: remote SHA verified before and
after). Nothing under `~/projects/jifunze-ai` or the local preservation folder was touched.

## 3. CI results

At `4f657e1` the PR merge box reports **"All checks have passed — 5 successful checks"**, and
the Checks tab lists exactly the five required names under the `PR checks` workflow:
`Lint and type-check` · `Unit suites` · `Build and secret-boundary scan` · `Playwright` ·
`Migration verification`. (§19 covers the re-run on the new head.)

Local re-verification at the release candidate (HEAD + §16 fixes): ESLint ✅ · `tsc -b` ✅ ·
pipeline type-check ✅ · content-engine 45/45 ✅ (incl. the 7 fail-closed approval-gate tests) ·
social-ops 110/110 ✅ · secret-boundary scan (187 source files + built `dist/`) ✅ ·
role-routing ✅ · Playwright **52/52** ✅ · production build ✅.

## 4. Branch protection — staged, one owner click from done

`main` currently has **no protection**: no classic rule, no rulesets (verified in Settings).

A classic rule for pattern `main` was configured in the owner's signed-in browser with exactly
the required shape — PR required · **1 approval** · required status checks (**strict**: branch
must be up to date) with precisely the five contexts above · conversation resolution ·
force pushes not allowed · deletions not allowed. Submitting it triggered **GitHub sudo mode**
("Confirm access → Verify via email"), which is identity verification this session will not
perform on the owner's behalf. The rule was staged twice and is one submit away.

**Owner action:** in the open GitHub tab, click *Verify via email*, enter the code, then either
tell this session to re-submit (≈20 s) or re-create the rule manually with the shape above.
**Verify with:** Settings → Branches shows a `main` rule listing all five checks; or open PR #5
and confirm the merge box shows the required checks as *Required*.

Deliberate choice, flagged for the owner: *"Do not allow bypassing the above settings"* was
left **unchecked**. GitHub does not let a PR author approve their own PR, so on this
single-maintainer repository a no-bypass rule + 1-approval would make every merge impossible
without a second account. As configured, the rules bind normal merges and the admin bypass
remains a deliberate, visible act. Tighten it later if a second reviewer joins.
**Branch protection is NOT claimed active** until the owner's verification completes.

## 5. Backup status (`docs/freeze/BACKUP_CHECKLIST.md`)

Environment identified from repo + dashboards (no secret values read or printed):

* **Supabase project:** `gkhvhisuvcfbsicwjdvm` — "jifunze-ai", org *neuralbuildai-lang's Org*
  (**Pro plan**), environment badge **main / PRODUCTION**.
* **Course schemas/tables:** per `docs/freeze/DB_AND_STORAGE_INVENTORY.md` (training/learning
  tables, flagship/course progress, Stripe financial tables, course RPCs) — classification
  reviewed and unchanged.
* **Storage buckets (verified in dashboard):** `capstone_submissions` (private, 3 policies) —
  back up & disconnect; `reels` (public) — retained engine output.
* **Deployed Edge Functions (verified in dashboard):** only `ingest-signals`,
  `publish-instagram`, `refresh-ig-token`. **No Stripe functions are deployed** and
  `social-ops-admin` is not yet deployed (deferred phase — expected).

| Checklist item | Status | Evidence / owner command |
|---|---|---|
| Platform daily DB backups | ✅ **Verified present** | Dashboard → Database → Backups: daily **PHYSICAL** backups 14–21 Aug, latest **21 Aug 2026 11:40 UTC**, each with Restore. Note on page: storage objects are **not** included. |
| Owner `supabase db dump` (schema+data), stored durably outside the repo | ⛔ **Blocked — owner-run** (needs `supabase login` + DB credentials; none available here, correctly) | `supabase link --project-ref gkhvhisuvcfbsicwjdvm && supabase db dump -f jifunze-learn-freeze-2026-08-21.sql` → store outside any git repo, record SHA-256 (`shasum -a 256 <file>`) and size; verify by restoring into a scratch DB (`psql -f`) or at minimum `head`/`grep` for the frozen table DDL. **Never commit it.** |
| Export `capstone_submissions` bucket | ⛔ **Blocked — owner-run** | Studio → Storage → `capstone_submissions` → select-all → Download (or `supabase storage cp --recursive`). Store beside the dump with the same manifest fields. |
| pg_cron read-only check | ⛔ **Blocked** (this session's SQL-editor input was denied by its own safety layer — deliberately not worked around) | Studio → SQL editor: `select jobid, jobname, schedule, active from cron.job;` — expect zero rows or only non-course jobs. If the extension is absent, that is also a pass. |
| Stripe webhook disable | ⛔ Blocked — see §6 | — |
| Record completion in the checklist file | ⛔ Owner, after the above | follow-up commit with date + initials |

No backup artifact was produced by this session, so nothing was written outside the repo and
no manifest exists yet; the checklist is **not** marked complete. The automated daily backup
plus point-in-time restore materially reduce data-loss risk in the meantime, but do not
substitute for the owner-run logical dump + storage export the checklist requires.

## 6. Stripe course webhook status — **unknown; owner instructions below**

The Stripe dashboard was not signed in in the connected browser, and no Stripe API key is (or
should be) available here, so the webhook could not be inspected. **Nothing was changed.**
Repo-side facts: the three Stripe Edge Functions are deleted from the branch and **not deployed**
in the Supabase project — so any webhook still enabled points at a dead
`…/functions/v1/stripe-webhook` URL and only produces delivery failures.

Owner procedure (dashboard.stripe.com → Developers → Webhooks):
1. Check **both** Test and Live mode (toggle top-right) for endpoints containing
   `gkhvhisuvcfbsicwjdvm.supabase.co/functions/v1/stripe-webhook`.
2. For each match, record endpoint URL, mode, enabled events, and status; export/screenshot
   the configuration page.
3. Confirm it is course-only: the URL above serves only the retired course flow; the social
   platform has no Stripe integration (verified: no Stripe reference in active source outside
   the denylist test).
4. **Disable** (do not delete) the endpoint; optionally roll the signing secret.
5. Verify nothing else depends on it: Webhook attempts log shows only course-era events; no
   other endpoint shares the URL.
6. Re-enabling later restores it unchanged (that is why deletion is avoided).

## 7. Vercel environment status

| Item | Finding |
|---|---|
| Project serving `www.jifunze.ai` | **`jifunze-ai`** in team `godfreys-projects-ae135efe` (owner account `neuralbuildlabai-8010`); domains `www.jifunze.ai`, `jifunze-ai-omega.vercel.app` |
| Git connection | **None** — "Connect Git" is unconfigured. Last Git-connected deploy: 14 May (`fc901a0`, main). |
| Production branch | N/A (no Git integration; production is whatever is manually deployed) |
| Current production deployment | `jifunze-o9bb4nde5-…` — Ready, created ~15 h before this review via **`vercel deploy` CLI** (one of four CLI production deploys 15–16 h ago; no commit metadata) |
| PR #5 preview deployment | **Does not exist** (GitHub shows "No deployments"; nothing in the Vercel list) — expected with Git disconnected |
| `VITE_MAINTENANCE_MODE` | Exists as a project env var, **added ~15 h ago**; value masked in the UI (not revealed). Empirically the current production build is public (maintenance **off**), which is the intended post-merge state. Scope (Production/Preview) unverified — owner: open the variable and confirm it is `false` for Production. |
| Other env vars (names only) | `VITE_CONTENT_MODE`, `VITE_CONTENT_API_URL`, `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_APP_ENV`, `VITE_APP_VERSION`, `VITE_SUPABASE_ENV`, `VITE_DEPLOYMENT_TYPE` (all Apr 15). None enables publishing (publish gates live in Supabase secrets + GitHub Actions, verified in §14). The two `VITE_CONTENT_*` vars are retired-SaaS-era and worth pruning at deploy time. |
| **Environment surprise** | **Current production still exposes Learn.** `/` serves a newer content-hub landing, but `/learn` → **200** with the old "Available Courses & Workshops / Sign In / Get Started" UI and `Jifunze.AI` branding, and `/auth/sign-up` → **200** "Create your free account". The deployed build predates PR #5's routing (`vercel.json` 410/404/301 rules are not in effect). |
| SPA rewrite / statics vs PR | Production does **not** match the PR (above). The PR's `vercel.json` was verified locally route-by-route (§8). |

No production change was made, no deploy performed, no domain touched. **Owner decision
needed at merge time:** either reconnect the Vercel project to Git (recommended — restores
merge → deploy and PR previews) or plan a manual `vercel --prod` from the merged main with
`VITE_MAINTENANCE_MODE=false`; either way, until a deploy after merge, production keeps
serving the current Learn-exposing build.

## 8. Preview deployment URL + route/status verification

**No preview deployment exists** (§7), so UAT ran against the PR build itself: production
`dist/` built at the release candidate with `VITE_MAINTENANCE_MODE=false`, served locally by
`scripts/uat-static-server.mjs`, which replays the shipped `vercel.json` `routes` array
verbatim (filesystem pass, redirects, statuses, SPA fallback). This validates app + routing
config; the numbers become live production behavior only once deployed on Vercel.

| Route | Status | Result |
|---|---|---|
| `/` `/content` `/topics/practical-ai` `/social` `/about` `/privacy` `/terms` `/ai-disclosure` `/contact` `/admin/login` | 200 | ✅ render correct pages |
| `/learn`, `/courses`, `/pricing` | **410** | ✅ branded "retired" body, `noindex` |
| `/auth/sign-up` | **410** | ✅ "Public registration is closed", `noindex` |
| `/auth/sign-in` | **301 → `/admin/login`** | ✅ |
| `/disclaimer` → `/terms`, `/support` → `/contact`, `/topics/money` → `/topics/income-business` | 301 | ✅ documented redirects |
| `/dashboard`, `/learning` | 404 | ✅ |
| unknown route | **404** | ✅ branded 404, `noindex` |
| `/favicon.ico`, `/apple-touch-icon.png`, `/site.webmanifest`, `/robots.txt`, `/sitemap.xml` | 200 | ✅ correct content-types |
| `/favicon.svg` | 404 | ✅ intended — the icon set is `.ico` + PNGs; `index.html` references no SVG icon; the miss returns **404** (not 200-HTML) |
| missing static (`/assets/nonexistent-file.js`) | 404 | ✅ no 200-HTML for missing statics |

## 9. Desktop / mobile UAT results

Viewports 1280×800 and 390×844 across all §8 pages (26 screenshots delivered as
`uat-screenshots-pr5.zip`): approved logo + violet `#7C3AED` + Plus Jakarta Sans throughout ·
hero **"Your idea never sleeps."** with approved supporting copy · **six** editorial pillars
(Practical AI, Career growth, Income & business, Digital tools, Productivity, Opportunities) ·
latest-posts section present with the **honest empty state** ("Platform posts will appear here
once our publishing system goes live…") · social directory (8 accounts) · **Admin Login in
header and footer** (mobile included — the `4f657e1` fix holds) · AI-disclosure section +
page · exactly one `h1` per page, no skipped heading levels (e2e) · **no horizontal overflow
on any page at either viewport** · no Learn/pricing/enrollment/public-signup CTA anywhere
(asserted by e2e and by text scan). No `.AI` wordmark and no old grey/blue or orange-Learn
branding in the visible UI (e2e "retired tagline and old wordmark never reach the browser"
passes). OG/Twitter meta: approved title/description + `og-image.png` 1200×630. One deliberate
nuance: the JSON-LD `Organization.name` is `"Jifunze.AI"` (matching the registered display
name of the official social accounts; `alternateName` "Jifunze") — data, not a rendered
wordmark; flagged in case the owner prefers "Jifunze" there too.

## 10. Social-link verification (vs `docs/social/SOCIAL_ACCOUNT_INVENTORY.md`)

`src/social/socialAccounts.ts` = inventory = rendered site (8/8, exact URLs). Every URL was
**opened live** in the browser this session:

| Platform | URL opened | Live result |
|---|---|---|
| Instagram | instagram.com/jifunze.ai | ✅ exists; 0 posts; career-skills bio; website link `jifunze.ai` now present (inventory said missing — since fixed); display name still lowercase (outstanding owner item stands) |
| TikTok | tiktok.com/@jifunze_ai | ✅ `Jifunze.AI`, career-skills bio, 0 videos |
| Threads | threads.com/@jifunze.ai | ✅ `Jifunze.AI`, tagline in bio, 0 threads |
| YouTube | youtube.com/@jifunze-ai | ✅ exists, career-skills description (name still `jifunze-ai` — outstanding item stands) |
| Facebook | profile.php?id=61593186673039 | ✅ `Jifunze.ai` Page (owner is admin) |
| X | x.com/JifunzeAI | ✅ `Jifunze.AI`, Nairobi, jifunze.ai; **3 obsolete posts still up** (owner delete/hide item stands) |
| LinkedIn | /company/jifunze-ai/ | ✅ `Jifunze.AI` (org 114444495; owner is Page admin; **2 obsolete posts** item stands) |
| Pinterest | pinterest.com/jifunzeai/ | ✅ profile exists (page title confirmed; body render was blocked by the page itself) |

No GitHub/CalmSignal links anywhere (anti-impersonation tests pass).

## 11. Public-feed verification

Empty state verified honest (§9 wording) · no fabricated posts or metrics (text scan negative
for follower/like counts) · no broken thumbnails (no feed items exist to break; brand-tile
fallback is the coded path) · no raw API errors surfaced · **zero external network requests**
from the landing page in the UAT build → no credentials of any kind in browser traffic · feed
read path is the RLS-limited `content_publications` cache with display-safe fields only (no
tokens, no internal moderation fields) — enforced by the secret-boundary scan and social-ops
suite.

## 12. Admin authentication results

Verified without any bypass: `/admin/login` public (200) and now `noindex` (§16 fix — the
authed shell already had it; the login page did not) · robots.txt `Disallow: /admin/` ·
sitemap has zero admin URLs · **no public signup exists** (route 410; signup code deleted;
e2e "offers no registration") · login and forgot-password copy is enumeration-safe (source
comments + generic Supabase failure message; recovery page states it does not reveal whether
an address has an account) · password policy min-12 · non-admin/unauthed access to `/admin*`
renders the closed state with no operational data (e2e ×4) · return-URL handling cannot land a
non-admin in `/admin` (role-routing suite, incl. encoded-path cases) · publishing controls
remain disabled (§14) · social-ops data behind the three-layer guard (client guard + RLS
`is_admin()` + Edge Function tier re-check — code-verified; RLS lives in migrations).

**Authenticated-admin UAT: BLOCKED — no administrator credentials exist in this session and
none were requested.** Owner procedure (~10 min): sign in at `/admin/login` with the canonical
admin account → expect redirect to `/admin` → confirm the overview renders honest zeros, the
capability labels match `docs/social/CAPABILITY_TRUTH_TABLE.md`, `/admin/social-ops` opens and
its publish action demands the human-approval gate + `PUBLISH_SECRET` (expect refusal — the
secret is server-side) → reload (session persists) → sign out (returns to login; `/admin`
closed again).

## 13. Publishing-gate results (re-verified this session)

| Gate | State | Evidence |
|---|---|---|
| `DRY_RUN` | ✅ safe | workflow: `inputs.dry_run \|\| vars.DRY_RUN \|\| 'true'` (fail-safe) **and** repo variable `DRY_RUN=true` (GitHub UI) |
| `IG_PUBLISH_ENABLED` | ✅ not enabled | Supabase secret must be exactly `"true"`; not a GH var/secret; gate asserted by workflow-gate tests |
| `SOCIAL_SYNC_ENABLED` | ✅ unset | metrics workflow short-circuits unless repo var == `'true'`; no such variable exists (GitHub UI) |
| `PUBLISH_SECRET` | ✅ still required | GH secret exists (name only); `publish-instagram` refuses without it |
| Human approval | ✅ mandatory, fail-closed | 7 gate tests incl. "fails CLOSED when the approval store is unreadable"; no bypass path in `orchestrator/` |
| Autonomous cron | ✅ gated | schedule runs land in dry-run unless the owner flips the repo var |
| Metrics cron | ✅ gated | `SOCIAL_SYNC_ENABLED` gate above |
| Other platform publishers | ✅ disabled | adapters ship without credentials; "missing credential = SKIP" tested |
| Client/build credential leak | ✅ none | secret-boundary scan over 187 source files + `dist/`; zero external requests in UAT |

GH Actions secrets present (names only): `INGEST_SECRET`, `OPENAI_API_KEY`, `PUBLISH_SECRET`,
`SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_URL`. Repo variables: `DRY_RUN=true`,
`VISUAL_PROVIDER=generated`.

## 14. Large-deletion boundary review (1,491 deletions)

Recomputed from `main...head`: **D 1,491 · A 48 · M 54 · R 1** (sum 1,594 = PR). Retained,
with **zero deletions** under each: `orchestrator/`, `render/`, `src/social/`,
`src/components/social-ops/`, Supabase client + persistence (learning repos stripped),
`AuthContext` + admin authorization, all **53** migration files, the four social Edge
Functions (incl. not-yet-deployed `social-ops-admin`), metrics sync, `autonomous-loop.yml`,
`social-metrics-sync.yml`, `pr-ci.yml`, kill-switch + incident docs, approved brand kit
(`brand/`, `Jifunze Brand Logo Kit/`), and the public legal pages. Removed as intended: Learn
routes/components, course data (`src/data`, 121 files), `public/course-assets` (714 files),
learner-state runtime, enrollment/checkout, **the only `supabase/functions` deletions are the
three Stripe functions**, learner/instructor UIs, ~45 course scripts, course e2e + configs,
course sitemap/feed entries, retired branding. Remaining `Jifunze.AI` / "create smarter"
strings in the bundle are exclusively the official account display names and the
prohibited-claims linter's own denylist data — not site copy; the CI needle list confirms the
true forbidden strings are absent. **No questionable deletion found.**

## 15. Remaining blockers (all owner-gated)

1. **Branch protection** — one GitHub sudo email-verification, then submit (§4).
2. **Owner backups** — logical dump + capstone bucket export + cron check + checklist
   sign-off (§5).
3. **Stripe webhook** — inspect and disable per §6 (requires Stripe login).
4. **Authenticated admin UAT** — §12 procedure (requires admin credentials).
5. **Production drift decision** — reconnect Vercel↔Git or plan the manual post-merge deploy;
   until then production exposes Learn signup (§7). *Consider whether the current live signup
   should stay open even before the merge.*
6. PR is **draft** — flip to "Ready for review" only after 1–5.

## 16. Fixes made on the branch during this review (both non-destructive)

1. `src/access/appAccess.ts` — the tier-email env read now falls back safely when
   `import.meta.env` does not exist (plain-Node/tsx runtimes). This made
   `npm run test:role-routing` pass in a fresh clone (it crashed before; it is not a CI job,
   which is why CI never caught it). Vite's static-inlining security property is preserved
   (literal member reads only; verified by the secret-boundary scan over the new bundle).
2. `src/components/admin-app/AdminLoginPage.tsx` — added the same `noindex, nofollow` meta
   effect the admin shell already had; `/admin/login` is publicly reachable and was the one
   admin surface without it (documented contract: "Admin surfaces are noindex").
3. Tooling (new, not wired into the app or CI): `scripts/uat-static-server.mjs` (serves
   `dist/` under the `vercel.json` route semantics for local UAT) and
   `scripts/uat-screenshots.mjs` (the evidence capture used for §9).

Full verification re-run after these changes — everything green (§3).

## 17. Exact rollback procedure

* **This review's commit(s):** `git revert <sha>` on the feature branch (they are additive).
* **The whole pivot:** do not merge PR #5; the public site keeps its current deployment.
* **After an eventual merge:** `git revert -m 1 <merge-sha>` on main, or Vercel → Instant
  Rollback to the previous production deployment (one click, no rebuild).
* **Learn restoration:** `docs/freeze/RESTORATION.md` — tag `jifunze-learn-frozen-2026-08-21`
  and branch `archive/jifunze-learn`, both verified still at `78062b1` today.
* **Engine/ops:** switch matrix in `docs/social/ROLLBACK_PLAN.md` /
  `INCIDENT_AND_KILL_SWITCH.md` (all switches currently off).
* **Branch protection:** deleting the `main` rule restores the previous (unprotected) state.

## 18. Merge recommendation

**Ready after listed owner actions** (§15). Code, tests, boundaries, brand and safety gates
are verified; nothing outstanding is a code change. Not "Ready for review" solely because the
pre-merge checklist items are owner-gated and the production-drift decision (§7/§15.5)
belongs to the owner.

## 19. Exact next action

**Owner, in order:** (1) click *Verify via email* in the open GitHub tab and complete sudo,
then have the staged branch-protection rule submitted and verified; (2) run the §5 backup
commands and sign off the checklist; (3) do the §6 Stripe webhook pass; (4) run the §12
authenticated-admin UAT; (5) decide §15.5 (reconnect Git recommended); then mark PR #5 "Ready
for review". **This session, immediately after this report:** commit it with the §16 fixes via
explicit path staging, push the branch, and confirm all five CI checks return green on the new
head — PR #5 stays a **draft** and is **not** merged.
