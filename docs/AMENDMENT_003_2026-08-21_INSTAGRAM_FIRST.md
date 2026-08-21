# Amendment 003 — Instagram-first social learning media system; complete Learn removal

**Status:** Adopted · **Date:** 21 August 2026
**Extends:** `docs/AMENDMENT_001_2026-08-18_PIVOT.md`, `docs/AMENDMENT_002_2026-08-20_SOCIAL_OPS.md`
**Authority:** owner-approved implementation assignment of 2026-08-21 and
`docs/IMPLEMENTATION_PLAN_2026-08-21.md`. Where this amendment conflicts with Amendments 001/002,
**this amendment governs**.

---

## 1. What changed on 21 August 2026

Jifunze.ai is now an **Instagram-first, faceless, AI-assisted social learning media system**.
The website is a brand home and social distribution hub — not the main product. The product is
the operating loop: detect signals → normalize/dedupe/cluster → score → select → research and
verify → generate content → produce media → quality/safety gates → **human review** → approve/
schedule → publish (Instagram first, after a later supervised activation) → sync engagement →
insights → reviewed improvements to selection.

## 2. Learn is removed, not hidden

Amendments 001/002 froze the Learn platform in place. This amendment removes it from the active
application entirely. It remains fully recoverable at `78062b1` via the annotated tag
`jifunze-learn-frozen-2026-08-21` and branch `archive/jifunze-learn` (see `docs/freeze/`).
Course data in production Supabase is preserved untouched; only application callers were removed.
Courses, subscriptions, newsletters, payment products, client services and premature monetization
must not displace the operating-loop objective.

## 3. Positioning and audience (supersedes Amendment 001 §5 audience)

Jifunze turns emerging developments in AI, work and digital opportunity into useful social
learning content. Audience: **ambitious African and diaspora professionals who want to use AI and
digital tools to improve their work, career and income.**

## 4. Editorial pillars (supersedes the Amendment 001 six)

One authoritative configuration lives in `src/social/pillars.ts` and is consumed by signal
scoring, content generation, admin interfaces, the public website and analytics:

| Id | Label | Absorbs (old) |
|---|---|---|
| `practical_ai` | Practical AI | `ai_task` |
| `career_growth` | Career growth & employability | `cv`, `interview`, `mindset` |
| `income_business` | Income & business skills | `money` |
| `digital_tools` | Digital tools | — |
| `productivity` | Productivity | — |
| `opportunities` | Opportunities & useful resources | `applications` |

The legacy→new mapping ships as `LEGACY_PILLAR_MAP`; old topic slugs 301-redirect.

## 5. Brand (unchanged, restated)

`Jifunze` wordmark (no visible `.AI` in the wordmark), tagline **"Your idea never sleeps."**,
violet `#7C3AED`, near-black `#0B0B12`, white, Plus Jakarta Sans, the approved `brand/` kit
assets only. Prohibited: "Create smarter, Grow faster.", the grey/blue raster lockup, the
lightning-bolt favicon, the orange Learn identity, unauthorized effects.

## 6. Standing gates (unchanged)

Publishing remains disabled (`DRY_RUN` default true; `IG_PUBLISH_ENABLED`, `SOCIAL_SYNC_ENABLED`
unset). No production migration, Edge Function deployment, OAuth setup, cron activation or
publishing activation is authorized by this amendment. Nothing publishes without an explicit
recorded human approval (enforced in code from this amendment forward, not only in prose).
