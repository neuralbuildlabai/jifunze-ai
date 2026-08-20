> ## ⚠ SUPERSEDED — 20 August 2026
>
> **This document describes the learning platform as Jifunze.ai's product. That is no longer the
> operating direction.** It is retained as the accurate record of the May 2026 plan; do not delete
> it and do not act on it.
>
> What governs today, in order:
> 1. `OPERATIONS.md` — the operating memory
> 2. `docs/AMENDMENT_001_2026-08-18_PIVOT.md` — the pivot to a career-skills media brand
> 3. `docs/AMENDMENT_002_2026-08-20_SOCIAL_OPS.md` — the website, the content ledger, social ops
>
> The learning platform is **frozen** at `learning-platform-frozen-2026-08-18`. Frozen means
> preserved and reversible — not deleted, and not a statement that the direction was wrong.
>
> Two statements below are now actively misleading: the "single web application that delivers
> courses" framing, and the non-goal "Not a social-media publishing or brand-content platform".
> Jifunze.ai does not sell a social-content product to anyone — but it does operate its own
> channels with its own internal engine. See Amendment 001 §6.

---

# Jifunze.ai

Jifunze.ai is a learning, tutoring, and applied-practice platform combining academic-grade structured courses, AI tutoring on every lesson, interactive math and cloud labs, and a market-responsive curriculum engine. Built for individual learners first, with team learning and human tutoring as later layers.

**"Jifunze" = learn (Swahili).** Make rigorous learning accessible, supported, and connected to real work.

---

## What this repo is

A single web application that delivers:

- **Courses** — multi-tier (free workshops, paid flagship deep tracks, standalone full courses, public library) authored to a consistent quality standard.
- **AI tutoring** — a course-context-aware assistant available on every lesson.
- **Interactive labs** — browser-based math lab (Pyodide) and partner-integrated cloud labs (third-party vendor) for hands-on practice.
- **Capstones and certificates** — outputs learners produce, reviewed by the platform.
- **Market-responsive curriculum** — a signal pipeline that proposes curriculum updates driven by job-market and skill-demand data.
- **Team learning and human tutoring** — added in later waves once the individual product is solid.

## What this repo is not

We have explicit non-goals. The most important ones:

- Not a social-media publishing or brand-content platform. (A prior subsystem in this direction was removed in 2026-05; see master plan §2.)
- Not a K-12 product.
- Not an accredited degree program.
- Not a white-label LMS for third-party course providers.
- Not building proprietary cloud-lab infrastructure (we integrate a partner).

The full list of non-goals is in the master plan.

---

## Tech stack

React + Vite + TypeScript on the frontend. Tailwind for styling. Supabase for auth, Postgres, and Edge Functions. Stripe for payments. Vercel for hosting. OpenAI and/or Anthropic for AI authoring and tutoring. Pyodide for the math lab. A third-party vendor (TBD) for cloud labs. Content authored in MDX + per-course YAML, compiled into typed TypeScript modules.

## Sequencing

Work proceeds in six locked waves:

1. **Strip-and-clean rewrite** — remove the trends/opportunities/brand-publishing subsystem and the old multi-brand tenancy. Normalize naming. Rewrite top-level docs. *(Current wave.)*
2. **Publishing pipeline + first AI-authored course** — canonical content format, compiler, AI authoring CLI, one new flagship course end-to-end.
3. **AI tutor on every lesson** — course-context-aware sidebar.
4. **Math lab** — Pyodide-backed, in-browser, plugged into the existing math course.
5. **Cloud lab via partner** — vendor selection, integration, one new technical course.
6. **Teams + human tutoring marketplace** — rebuilt tenant model for orgs, scheduled tutor sessions, AI-to-human handoff.

A market-signal-to-curriculum service slots between waves 5 and 6.

## Working rule

We do not deviate from the master plan without amending it explicitly.

We do not start a wave until the previous wave's acceptance criteria are met.

We do not include Wave N+1 features inside Wave N "while we're in there."

## Ownership

Jifunze.ai is owned by Godfrey Maseno. All contributions are strictly contract-based and confer no ownership, equity, license, or control rights unless explicitly agreed in writing. See [`docs/OWNERSHIP_AND_IP_NOTICE.md`](./docs/OWNERSHIP_AND_IP_NOTICE.md) and [`docs/FOUNDER_OWNERSHIP_AND_CONTRIBUTOR_TERMS.md`](./docs/FOUNDER_OWNERSHIP_AND_CONTRIBUTOR_TERMS.md).

## Read next

- **The master plan**: [`docs/JIFUNZE_MASTER_PLAN.md`](./docs/JIFUNZE_MASTER_PLAN.md) — authoritative product, architecture, waves, non-goals, governance.
- **The README**: [`README.md`](./README.md) — short entry point.
