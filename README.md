# Jifunze

**An Instagram-first, faceless, AI-assisted social learning media system.** Jifunze turns
emerging developments in AI, work and digital opportunity into useful social learning content
for ambitious African and diaspora professionals — across six editorial pillars: Practical AI,
Career growth & employability, Income & business skills, Digital tools, Productivity, and
Opportunities & useful resources.

> "Jifunze" = learn (Swahili). · *Your idea never sleeps.*

**The operating loop** (the product): detect signals → normalize/dedupe → score → select →
research & verify → generate content → produce media → quality/safety gates → **human review** →
approve/schedule → publish (Instagram first, after supervised activation) → sync engagement →
insights → reviewed improvements to selection. The website is the brand home and social
distribution hub — not the main product.

**The former Jifunze Learn platform was removed from the active application on 2026-08-21** and
is fully preserved at commit `78062b1` (tag `jifunze-learn-frozen-2026-08-21`, branch
`archive/jifunze-learn`). See [`docs/freeze/`](./docs/freeze/) for the freeze record and
restoration procedure. Courses, subscriptions, payments and learner accounts no longer exist in
the active product, and production course data is preserved untouched.

**Jifunze does not sell a social-content product.** The content engine operates this brand's own
channels only.

---

## Start here

If you are a new contributor (human or AI), read these in order:

1. [`OPERATIONS.md`](./OPERATIONS.md) — **the operating memory.** What is built, the
   identifiers, which switches are off, what is next. Read it first, update it last.
2. [`docs/AMENDMENT_003_2026-08-21_INSTAGRAM_FIRST.md`](./docs/AMENDMENT_003_2026-08-21_INSTAGRAM_FIRST.md)
   — the current direction: Instagram-first pivot, complete Learn removal, the six pillars.
3. [`docs/ROUTES.md`](./docs/ROUTES.md) — the active route map and retired-route behaviour.
4. [`docs/social/`](./docs/social/) — capability truth table, account inventory, schema, sync,
   adapters, OAuth setup, env vars, deploy/rollback/incident runbooks.
5. [`docs/freeze/`](./docs/freeze/) — Learn freeze record, DB/storage inventory, restoration.

Historical, superseded, and retained deliberately: `PROJECT_CONTEXT.md`,
`docs/JIFUNZE_MASTER_PLAN.md` (May 2026 learning-platform plan) and Amendments 001/002. Do not
act on them; do not delete them.

`OPERATIONS.md` is the source of truth for engine state. Where it and an amendment conflict on
direction, the newest amendment (003) governs.

## The application

- **Public site** (`/`): landing page, content hub (quick reads), topic pages, verified social
  directory, about, AI disclosure, legal. Built with Vite + React, violet `#7C3AED` on
  near-black `#0B0B12`, Plus Jakarta Sans (the approved `brand/` kit).
- **Admin console** (`/admin`, invite-only): workflow-ordered modules with honest capability
  labels; the proven social-ops console lives at `/admin/social-ops`.
- **Engine**: `orchestrator/` (select → brief → quality gates → render → publish path with an
  enforced human-approval gate), `render/` (faceless vertical video), Supabase Edge Functions
  (`ingest-signals`, `publish-instagram`, `refresh-ig-token`, `social-ops-admin`).

## Standing safety posture

Publishing is **off**: `DRY_RUN` defaults true, `IG_PUBLISH_ENABLED` and `SOCIAL_SYNC_ENABLED`
are unset, and the publish path refuses any item without an explicit recorded human approval
(no bypass exists). No production migration is applied and no Edge Function is deployed except
through the separately authorized connection sequence in
[`docs/social/DEPLOYMENT_CHECKLIST.md`](./docs/social/DEPLOYMENT_CHECKLIST.md).

## Development

```bash
npm ci
npm run dev          # public site + admin console
npm run test:all     # content-engine + social-ops + security + route suites (offline)
npm run test:e2e     # Playwright
npm run build        # production build
npm run autonomous:offline  # engine dry-run with no keys, renders an evergreen sample
```
