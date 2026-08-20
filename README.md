# Jifunze.ai

**A career-skills media brand powered by an internal autonomous content engine.** It shares
practical career, income and AI skills with job seekers, students and new freelancers in Kenya and
other emerging markets, across six content pillars: CVs, interviews, practical AI, money,
applications and mindset.

> "Jifunze" = learn (Swahili). · *Your idea never sleeps.*

**This repository also contains a learning platform, frozen at
`learning-platform-frozen-2026-08-18`.** It is preserved and reversible, not deleted — but it is
not the current product and must not be presented as one. Do not modify `/learn`, `/admin`,
billing, training or course assets.

**Jifunze.ai does not sell a social-content product.** The content engine operates this brand's own
channels. Any public claim that brands or creators can use Jifunze.ai to generate social content is
false and must be corrected on sight.

---

## Start here

If you are a new contributor (human or AI), read these in order:

1. [`OPERATIONS.md`](./OPERATIONS.md) — **the operating memory.** What is built, what the
   identifiers are, which switches are off, what is next. Read it first, update it last.
2. [`docs/AMENDMENT_001_2026-08-18_PIVOT.md`](./docs/AMENDMENT_001_2026-08-18_PIVOT.md) — the pivot,
   the brand, the six pillars, what is frozen.
3. [`docs/AMENDMENT_002_2026-08-20_SOCIAL_OPS.md`](./docs/AMENDMENT_002_2026-08-20_SOCIAL_OPS.md) —
   the website, the content ledger, the social-ops console, adapter readiness.
4. [`docs/social/`](./docs/social/) — account inventory, platform copy, schema, sync, adapters,
   OAuth setup, env vars, deploy/rollback/incident, launch readiness.

Historical, superseded, and retained deliberately:
[`PROJECT_CONTEXT.md`](./PROJECT_CONTEXT.md) and
[`docs/JIFUNZE_MASTER_PLAN.md`](./docs/JIFUNZE_MASTER_PLAN.md) record the May 2026 learning-platform
plan. Do not act on them; do not delete them.

`OPERATIONS.md` is the source of truth. Where it and an amendment conflict, `OPERATIONS.md` governs.

---

## Commands worth knowing

| Command | What |
|---|---|
| `npm run dev` | Vite dev server |
| `npm run test` | Content-engine suite (38 tests, offline, no secrets) |
| `npm run social:test` | Social-ops suite (103 tests, offline, no secrets) |
| `npm run social:sync:dry-run` | Two-hour metrics sync — decides everything, writes nothing |
| `npm run social:verify-migration` | Applies the social-ops migration to a throwaway Postgres and asserts its shape |
| `npm run seo:generate` | Regenerates `public/robots.txt`, `sitemap.xml`, `feed.xml` |
| `npm run guides:generate` | Regenerates `src/social/guides.ts` from the content bank |
| `npx playwright test` | End-to-end suite |

---

## Tech stack

React + Vite + TypeScript, Tailwind CSS, Supabase (Postgres + Auth + Edge Functions), Stripe, Vercel, OpenAI / Anthropic, Pyodide (math lab), MDX-based content authoring with a typed compiler.

## Local development

```bash
npm install
npm run dev
```

Other scripts: `npm run build`, `npm run typecheck`, `npm run lint`, `npm run test`. The `scripts/` folder holds course-authoring CLIs and audit utilities; see the master plan for which scripts belong to which wave.

## Repository layout (post-Wave-1)

```
content/                 # Canonical course source (Wave 2+) — course.yaml + MDX
src/                     # React app — components, routes, services, types
src/data/learning/       # Compiled course catalogs and curricula (auto-generated post-Wave-2)
public/course-assets/    # Embedded interactive course packages (Articulate Rise)
supabase/migrations/     # Database schema
docs/                    # Architecture, governance, wave plans
scripts/                 # Audit, verify, and authoring CLIs
```

## Status

**Current wave: Wave 1 — Strip-and-clean rewrite.** The legacy trends/opportunities/brand-publishing subsystem and the old multi-brand tenancy are being removed. See `docs/internal/WAVE_1_REWRITE_PLAN.md` (created at the start of Wave 1) for the step-by-step plan.

## Ownership and contributions

Jifunze.ai is owned by Godfrey Maseno. **All contributions are strictly contract-based and confer no ownership, equity, license, resale, or control rights** unless explicitly agreed in writing and signed by the owner. Code contributions, documentation, course content, design, advisory work, and AI-assisted output are all included in this rule.

See [`docs/OWNERSHIP_AND_IP_NOTICE.md`](./docs/OWNERSHIP_AND_IP_NOTICE.md) and [`docs/FOUNDER_OWNERSHIP_AND_CONTRIBUTOR_TERMS.md`](./docs/FOUNDER_OWNERSHIP_AND_CONTRIBUTOR_TERMS.md) for the full terms. Legal and policy status is tracked in [`docs/legal-and-policies-status.md`](./docs/legal-and-policies-status.md).
