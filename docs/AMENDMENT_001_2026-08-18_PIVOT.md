# Amendment 001 — Reconciling the Master Plan with OPERATIONS.md

**Status:** Proposed · **Date:** 20 August 2026
**Amends:** `docs/JIFUNZE_MASTER_PLAN.md` (18 May 2026)
**Authority:** `OPERATIONS.md` (18 August 2026), owner-approved

> **How to apply:** paste this file into `docs/` as `AMENDMENT_001_2026-08-18_PIVOT.md` and add a one-line pointer at the top of `docs/JIFUNZE_MASTER_PLAN.md`:
> `> **Superseded in part.** See docs/AMENDMENT_001_2026-08-18_PIVOT.md — the operating direction changed on 18 August 2026. This document is retained as the historical record of the May 2026 plan.`
>
> **Do not delete or rewrite the master plan.** It is the record of what was decided in May 2026 and why. This amendment states what changed, not that the earlier decision never happened.

---

## 1. The conflict, stated plainly

`docs/JIFUNZE_MASTER_PLAN.md` (18 May 2026) and `OPERATIONS.md` (18 August 2026) describe two different companies.

| | Master Plan (18 May 2026) | OPERATIONS.md (18 Aug 2026) |
|---|---|---|
| What Jifunze is | An academic-grade learning platform: structured courses, an AI tutor on every lesson, interactive math and cloud labs, capstones and certificates | A career-skills media brand running an autonomous content engine on its own social handles |
| Primary artefact | Courses and lessons | Faceless vertical videos |
| Primary surface | `/learn`, `/admin`, billing | Instagram, TikTok, YouTube Shorts, Facebook, X, LinkedIn |
| Revenue thesis | Learner subscriptions | None yet — audience first |
| Status | **Frozen** | **Active** |

Neither document acknowledges the other. Four live social profiles and the website title were still selling a third thing — a multi-tenant social-content SaaS that was removed in May 2026 and never launched publicly.

## 2. The previous direction

Between April and May 2026 Jifunze was built as a learning platform. `docs/JIFUNZE_MASTER_PLAN.md` remains the accurate record of that plan: the course architecture, the AI-tutor design, the assessment and certificate model, the authoring standards in `docs/AUTHORING.md`, and the pricing and billing thinking. That work shipped. It is not deleted and not disowned.

## 3. The 18 August 2026 pivot

On 18 August 2026 the operating direction changed. Jifunze.ai is now a **career-skills media brand powered by an internal autonomous content engine**. The engine ingests real trend signals, scores them server-side, applies a strict career/income/opportunity relevance filter, generates a production brief, renders a faceless vertical video with captions and licensed or platform-permitted music, and — once publishing is enabled — posts to Jifunze.ai's own accounts on a schedule.

The reason for the change is recorded in `OPERATIONS.md`: the content engine is a $0-by-default system that can build an audience before any paid product exists, whereas the learning platform required paying learners the brand did not yet have.

## 4. What is frozen

The learning platform is frozen at tag `learning-platform-frozen-2026-08-18` (commit `fc901a0`). The following must not be modified:

- `/learn` and everything under it
- `/admin`
- Billing and subscription code
- Course, training and authoring functionality
- The course assets in `public/course-assets/`

Restore with `git checkout learning-platform-frozen-2026-08-18` if anything breaks. Frozen means preserved and reversible — not deleted, and not a statement that the direction was wrong.

## 5. Current direction

**What Jifunze.ai is, publicly:** a career-skills media brand sharing practical career, income and AI skills.

**Target audience:** job seekers, students and new freelancers in Kenya and other emerging markets. This string is already the single source of truth in code — `TARGET_AUDIENCE` in `orchestrator/contentBank.ts` — and is recorded on every content decision for audit.

**Content pillars (six, fixed):**

| Pillar | Covers |
|---|---|
| `cv` | CV and résumé guidance |
| `interview` | Interview preparation |
| `ai_task` | Practical uses of AI |
| `money` | Money and income skills |
| `applications` | Job and opportunity applications |
| `mindset` | Professional confidence, discipline and growth |

Jifunze.ai is **not** a general news account. A trend signal may only become content if it passes a strict career, income, opportunity or practical-skills relevance test.

**Brand:** wordmark `Jifunze`; public social display name `Jifunze.AI`; website styling `Jifunze.ai`; official tagline **"Your idea never sleeps."** — written exactly so, singular "idea", sentence case, full stop retained, kept separate from the logo symbol. Violet `#7C3AED`, near-black `#0B0B12`, white `#FFFFFF`, Plus Jakarta Sans, wordmark ExtraBold, violet squircle with white double-chevron. No gradients, shadows, 3D effects or decorative lettering.

**Strategy: own handles first.** The engine exists to grow and serve Jifunze.ai's own audience. Meta Standard Access covers exactly this; anything else needs Business Verification, deferred until there is a paying customer.

## 6. The multi-tenant SaaS — possible, not committed

A multi-tenant content SaaS may be considered later. It is **not** the current offering and must not be described as available. Any public claim that brands or creators can use Jifunze.ai to generate social content is false today and must be corrected on sight. This amendment does not authorise building it, pricing it, or marketing it.

## 7. Current non-goals

- Selling courses or subscriptions
- Onboarding external brands or creators onto the content engine
- Advertising spend of any kind
- Meta Advanced Access / Business Verification
- Paid AI visual generation (`VISUAL_PROVIDER=ai` stays off)
- Publishing anything automatically before a human has approved the first live post

## 8. Components that must stay frozen or off

| Thing | State | Unfreezes when |
|---|---|---|
| `/learn`, `/admin`, billing, training | Frozen at `learning-platform-frozen-2026-08-18` | A deliberate, documented decision to restart the learning platform |
| `IG_PUBLISH_ENABLED` | `false` | The full launch checklist in `OPERATIONS.md` passes AND a human approves the first live post |
| `VISUAL_PROVIDER=ai` | Off | There is a budget decision to spend on visuals |
| Free Kazi Kit CTA in captions and video end cards | Removed 20 Aug 2026 | The landing page exists, works on mobile, and is linked from every bio |

## 9. Owner approval

The 18 August 2026 direction is owner-approved and is the operative plan. Where this amendment and `docs/JIFUNZE_MASTER_PLAN.md` conflict, this amendment governs. Where `OPERATIONS.md` and this amendment conflict, `OPERATIONS.md` governs, and this amendment should be updated to match.
