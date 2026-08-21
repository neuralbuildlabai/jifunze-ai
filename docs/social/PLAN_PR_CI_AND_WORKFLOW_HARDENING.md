# Implementation plan — PR-triggered CI and workflow hardening

**Status:** PLAN ONLY. Nothing in this document has been implemented, committed, merged or deployed.
**Written:** 20 August 2026
**Context:** PR #4 (`chore/harden-autonomous-content-loop` → `main`) has **0 checks**, and the
repository has **no branch protection and no rulesets**. Everything green in the PR body was run
locally. This plan closes that gap.
**Scope:** four changes — one new workflow, two workflow hardening edits, one test-title cleanup.
**Deliberately out of scope:** merging PR #4, deploying, applying migrations, enabling cron,
enabling `IG_PUBLISH_ENABLED`, changing Vercel configuration.

---

## 0. Why this is worth doing first

`autonomous-loop.yml` already contains a `validate` job that runs lint, tests and a type-check —
but it fires only on `schedule` and `workflow_dispatch`. No workflow in the repository declares
`push:` or `pull_request:`. The consequence is precise: **an empty check list on a PR is
indistinguishable from a passing one**, and with no ruleset, `main` accepts anything.

The suite has a property that makes CI unusually cheap here: **it needs no secrets.** Type-check,
lint, unit suites, the security scanner, the production build, all three Playwright suites and the
migration verifier all pass with no `.env` file and no credentials. So the CI job below is
fork-safe, needs nothing added to repository secrets, and cannot leak anything.

---

## 1. New file — `.github/workflows/pr-ci.yml`

Five jobs, parallel where possible. Wall-clock is bounded by the `e2e` job (~6-8 min on a runner).

```yaml
name: PR checks

on:
  pull_request:
    branches: [main]
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read

concurrency:
  group: pr-ci-${{ github.event.pull_request.number || github.ref }}
  cancel-in-progress: true

env:
  NODE_VERSION: '22'

jobs:
  # ---------------------------------------------------------------- static
  static:
    name: Lint and type-check
    runs-on: ubuntu-latest
    timeout-minutes: 15
    steps:
      - uses: actions/checkout@v5
      - uses: actions/setup-node@v5
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: npm
      - run: npm ci --no-audit --no-fund
      - name: Lint
        run: npm run lint
      - name: App type-check
        run: npx tsc -b
      - name: Pipeline type-check
        run: npm run typecheck:pipeline

  # ------------------------------------------------------------------ unit
  unit:
    name: Unit suites
    runs-on: ubuntu-latest
    timeout-minutes: 15
    steps:
      - uses: actions/checkout@v5
      - uses: actions/setup-node@v5
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: npm
      - run: npm ci --no-audit --no-fund
      - name: Content-engine tests
        run: npm run test:content-engine        # expect 38/38
      - name: Social-operations tests
        run: npm run social:test                # expect 103/103
      - name: Content dry run (selector + quality gate, offline)
        run: npm run video:dry-run

  # -------------------------------------------------------- build and scan
  # test:security asserts against dist/, so it MUST run after the build in
  # the same job. Without dist/ it silently degrades to source-only checks.
  build-and-scan:
    name: Build and secret-boundary scan
    runs-on: ubuntu-latest
    timeout-minutes: 20
    steps:
      - uses: actions/checkout@v5
      - uses: actions/setup-node@v5
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: npm
      - run: npm ci --no-audit --no-fund
      - name: Production build
        run: npm run build
      - name: Secret-boundary scan (source + built bundle)
        run: npm run test:security
      - name: Assert forbidden strings are absent from the bundle
        run: |
          set -euo pipefail
          fail=0
          for n in VITE_MAINTENANCE_BYPASS_TOKEN MAINTENANCE_BYPASS_TOKEN \
                   VERCEL_OIDC_TOKEN jf_maintenance_bypass \
                   jf_maintenance_preview_v1 generate-public generate-content; do
            c=$(grep -rl "$n" dist/ 2>/dev/null | wc -l)
            echo "$n -> $c file(s)"
            [ "$c" -eq 0 ] || fail=1
          done
          [ "$fail" -eq 0 ] || { echo "::error::forbidden string present in dist/"; exit 1; }
      - name: Metadata is in sync with its generator
        run: |
          set -euo pipefail
          cp public/sitemap.xml /tmp/sitemap.before
          cp public/feed.xml    /tmp/feed.before
          cp public/robots.txt  /tmp/robots.before
          npm run seo:generate
          diff /tmp/sitemap.before public/sitemap.xml
          diff /tmp/feed.before    public/feed.xml
          diff /tmp/robots.before  public/robots.txt

  # ------------------------------------------------------------------- e2e
  e2e:
    name: Playwright
    runs-on: ubuntu-latest
    timeout-minutes: 30
    steps:
      - uses: actions/checkout@v5
      - uses: actions/setup-node@v5
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: npm
      - run: npm ci --no-audit --no-fund
      - name: Resolve Playwright version
        id: pw
        run: echo "version=$(node -p "require('@playwright/test/package.json').version")" >> "$GITHUB_OUTPUT"
      - name: Cache browsers
        uses: actions/cache@v4
        with:
          path: ~/.cache/ms-playwright
          key: pw-${{ runner.os }}-${{ steps.pw.outputs.version }}
      - name: Install Chromium
        # Both are needed: the default project uses the headless shell.
        run: npx playwright install --with-deps chromium chromium-headless-shell
      - name: Default suite
        run: npm run test:e2e                   # expect 144 passed / 2 skipped
      - name: Forced-tier suite
        run: npm run test:e2e:access-forced     # expect 15/15 (builds, then previews)
      - name: Billing-mock suite
        run: npm run test:e2e:billing-mock      # expect 4/4
      - name: Upload report on failure
        if: failure()
        uses: actions/upload-artifact@v5
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 7

  # ------------------------------------------------------------- migration
  migration:
    name: Migration verification
    runs-on: ubuntu-latest
    timeout-minutes: 15
    services:
      postgres:
        image: postgres:16
        env:
          POSTGRES_HOST_AUTH_METHOD: trust     # throwaway container, no data, no password to leak
        ports: ['5432:5432']
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 10
    steps:
      - uses: actions/checkout@v5
      - name: Install psql client
        run: sudo apt-get update && sudo apt-get install -y postgresql-client
      - name: Verify social-ops migration on a disposable database
        env:
          PGHOST: 127.0.0.1
          PGPORT: '5432'
          PGUSER: postgres
        run: npm run social:verify-migration    # expect 37/37, incl. idempotent re-run
```

### Notes on the choices

| Decision | Why |
|---|---|
| `pull_request`, never `pull_request_target` | `pull_request` runs the head code without repository secrets. `pull_request_target` would run it *with* secrets and is the standard way people get owned |
| No secrets anywhere in this workflow | The whole suite passes with no env files — verified. Nothing to leak, and fork PRs work |
| `permissions: contents: read` | Same posture as the two existing workflows |
| `concurrency` + `cancel-in-progress` | A force-push or a quick follow-up commit cancels the stale run instead of paying twice |
| `push: branches: [main]` as well | Gives `main` a baseline signal so a green PR check cannot be the only evidence the tree builds |
| Build and security scan in **one** job | `scripts/test-client-secret-boundary.ts` prints `note: dist/ not present — bundle assertions skipped` and still exits 0. Split across jobs it would pass while checking nothing. This is the single most important sequencing detail in the file |
| Explicit bundle grep after `test:security` | Belt and braces: an independent assertion that does not depend on the scanner's own needle list staying correct |
| Metadata regeneration diff | Catches a hand-edited `sitemap.xml`/`feed.xml` drifting from `scripts/generate-public-seo.ts` |
| Chromium **and** chromium-headless-shell | Playwright 1.59 resolves `devices['Desktop Chrome']` to the headless shell. Installing only `chromium` fails with *"Executable doesn't exist at .../chrome-headless-shell"* — this was hit for real while validating this branch |
| `POSTGRES_HOST_AUTH_METHOD: trust` | `scripts/verify-social-ops-migration.sh` invokes `psql` with no password handling. Trust avoids threading `PGPASSWORD` through, and the container is destroyed with the job |
| `PGPORT: '5432'` | The script defaults to 55432 for local use; the service container publishes 5432. Override via env rather than editing the script |
| Five jobs rather than one | A lint typo fails in ~2 minutes instead of waiting behind a 6-minute Playwright run, and the failing check name says what broke |

### Expected baselines, to be asserted in review

Content engine **38/38** · social operations **103/103** · Playwright default **144 passed, 2
skipped, 0 failed** · forced-tier **15/15** · billing-mock **4/4** · migration verifier **37/37** ·
secret-boundary scan pass · production build pass. A CI run that reports fewer tests than these
numbers is a regression even if it is green.

---

## 2. Hardening item 1 — least privilege in the read-only sync workflow

**File:** `.github/workflows/social-metrics-sync.yml` (lines ~106-107)

The workflow's own header says *"Read-only against every platform: this workflow NEVER publishes."*
That is true — `scripts/social-sync.ts` → `orchestrator/social/sync.ts` calls only
`fetchAccountMetrics` and `fetchPostMetrics`, and there is no publish path in the sync at all. But
the job is nevertheless handed the two credentials that *would* allow publishing.

```diff
           IG_ACCESS_TOKEN: ${{ secrets.IG_ACCESS_TOKEN }}
           IG_USER_ID: ${{ secrets.IG_USER_ID }}
-          IG_PUBLISH_ENABLED: ${{ secrets.IG_PUBLISH_ENABLED }}
-          PUBLISH_SECRET: ${{ secrets.PUBLISH_SECRET }}
```

**Risk of the change:** low. Verify first that no adapter's `fetchAccountMetrics` reads
`IG_PUBLISH_ENABLED` for a *readiness label* rather than for permission —
`orchestrator/social/adapters/instagram.ts:38` does read it to decide between
*"Connected"* and *"Connected. Publishing is disabled by the IG_PUBLISH_ENABLED kill switch."*.
Removing the variable makes that message always read as disabled, which is **correct and
conservative** for a read-only job, but confirm the dry-run output still reads sensibly before
merging.

**Verification:** `npm run social:sync:dry-run` with both variables unset must still exit 0 and
write zero rows.

---

## 3. Hardening item 2 — safe `DRY_RUN` default for scheduled runs

**File:** `.github/workflows/autonomous-loop.yml` (line ~142)

```diff
-          DRY_RUN: ${{ inputs.dry_run || vars.DRY_RUN || 'false' }}
+          # Scheduled runs supply no `inputs`, so an unset repo variable must fail SAFE.
+          # Set repository variable DRY_RUN=false deliberately to allow publishing.
+          DRY_RUN: ${{ inputs.dry_run || vars.DRY_RUN || 'true' }}
```

Today a scheduled run evaluates `inputs.dry_run` to empty, falls through `vars.DRY_RUN` (unset) and
lands on `'false'`. Publishing is still blocked by the `IG_PUBLISH_ENABLED` kill switch inside
`supabase/functions/publish-instagram/index.ts`, so this is a **second** line of defence, not the
only one — which is why it is a hardening item and not a defect. But a default of `'false'` means
the safety of the daily run rests on exactly one switch.

**Note for the reviewer:** this behaviour is inherited from `main` (`DRY_RUN: ${{ vars.DRY_RUN }}`
→ empty → non-`true`). It is not a regression introduced by PR #4.

**Trade-off to decide:** with `'true'` as the default, the day you actually want to publish you must
set the repository variable `DRY_RUN=false`. That is the intended friction. If the loop is expected
to publish daily once piloted, set the variable explicitly at that point rather than relying on a
fall-through.

---

## 4. Hardening item 3 — stale test titles in `workspace-guest.spec.ts`

**File:** `e2e/workspace-guest.spec.ts`

Several test names still say *"redirected to public catalog"* while the assertions correctly check
`toHaveURL(/\/$/)` and the homepage `h1`. The behaviour and the assertions are right; only the
titles lie — and a title is what a future reader trusts when a test fails at 2am.

```diff
-  test('member guest hitting Ideas is redirected to public catalog', async ({ page }) => {
+  test('member guest hitting Ideas is redirected to the public homepage', async ({ page }) => {
```

Apply the same rename to the `Studio`, `training URLs`, `team members`, `trends`, `insights` and
`/platform` cases in that file, plus any sibling with the same wording.

**This is a rename only.** No assertion, timeout or selector changes. If a diff in this change
touches anything other than a `test('…')` string, reject it.

---

## 5. Branch protection — the part that gives the CI teeth

A workflow nobody is required to pass is documentation. After the first successful run:

**Settings → Rules → Rulesets → New branch ruleset**

| Setting | Value |
|---|---|
| Target | `main` |
| Restrict deletions | on |
| Block force pushes | on |
| Require a pull request before merging | on, **1 approval** |
| Dismiss stale approvals on new commits | on |
| Require status checks to pass | on — select `Lint and type-check`, `Unit suites`, `Build and secret-boundary scan`, `Playwright`, `Migration verification` |
| Require branches to be up to date before merging | on |
| Require linear history | optional — matches the existing squash-merge history |
| Require signed commits | **not yet** — see §7 |

---

## 6. Sequencing — order matters

1. **Land `pr-ci.yml` first, and let it run once.** For `pull_request` events GitHub reads the
   workflow file from the **head** branch, so adding it to `chore/harden-autonomous-content-loop`
   makes it run on PR #4 immediately. No separate bootstrap PR is needed.
2. **Read the first run honestly.** Any failure here is a genuine finding: the same commands passed
   locally, so a red job means an environment difference worth understanding, not a flake to retry.
3. **Then** apply §2, §3 and §4 — small, individually reviewable commits, each verified by the CI
   that now exists.
4. **Then** create the ruleset in §5, naming the exact job names from a completed run. Creating it
   before a run exists leaves every PR stuck on *"Expected — waiting for status to be reported."*
5. Leave PR #4 in **draft** throughout.

Suggested commits:

```
ci: run lint, type-check, tests, build and migration checks on pull requests
ci: stop passing publishing credentials to the read-only metrics sync
ci: default scheduled autonomous runs to dry-run
test: rename retired-route specs to say homepage, not catalog
```

---

## 7. Known risks and follow-ups

| Risk | Mitigation |
|---|---|
| First CI run fails on something local runs did not hit (font availability, runner Chromium, `npm ci` vs `npm install` lockfile drift) | Expected; treat as a finding. `npm ci` is deliberate — it will surface any `package-lock.json` drift that `npm install` hides |
| Playwright wall-clock grows as the suite grows | `workers: 2` and `retries: 1` are already set for CI in `playwright.config.ts`. Shard by project only if the job exceeds ~15 min |
| Required checks block an urgent fix | Owner can bypass a ruleset; that is preferable to having no gate at all |
| Duplicate logic with `autonomous-loop.yml`'s `validate` job | Acceptable for now. If it drifts, extract a `workflow_call` reusable workflow and have both call it |
| Signed commits | The 13 commits on PR #4 are **unsigned**. Do not enable "require signed commits" until a signing setup exists, or this branch becomes unmergeable |
| Author-name inconsistency | The 12 review commits are authored `Mzalendo <neuralbuildlab.ai@gmail.com>`; `42c454c` is `Claude (via Cowork)` committed by `Godfrey Maseno`. Normalising would require a rebase and force-push — **not worth it**. Set `git config user.name`/`user.email` in the repository so future commits are consistent |

## 8. Not in this plan, still outstanding

Deleting `VITE_MAINTENANCE_BYPASS_TOKEN` from Vercel Development, Preview and Production **and
redeploying** — production is still serving a bundle built from commit `5d8c857`, which predates
the remediation. Applying the social-operations migration. Deploying the `social-ops-admin` Edge
Function. The Instagram, Threads, LinkedIn, X, Facebook and YouTube profile actions. Removing the
now-unreachable client callers of the deleted Edge Functions (`src/services/content/publicGenerate.ts`,
`runtimeMode.ts`, `adapters/httpAdapter.ts`, `src/contracts/contentGenerationApi.ts`), which land
with the excluded Wave-1 removal. See `FINAL_REVIEW_2026-08-20.md` §11-§13.
