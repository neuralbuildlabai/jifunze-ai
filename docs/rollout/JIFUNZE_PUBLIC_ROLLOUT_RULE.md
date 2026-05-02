# Jifunze public learner rollout rules

## Threshold

- **Public learner experience** (homepage, catalog, and primary course flows without the global maintenance gate) is intended to align with **at least five (5)** complete, mapped, and tested flagship courses.
- Until that threshold is met, **production may keep the public maintenance / upgrade surface enabled** — this is a product decision, not a regression.

## Reference course

- **Course 1 — AI Essentials (`ai-essentials`)** is the **reference implementation** for structure, UX patterns, progress, capstone rubric, and verification discipline.
- See `docs/curriculum-source/course-1-ai-essentials/COURSE1_REFERENCE_STANDARD.md`.

## Course 2 and beyond

- **Course 2 must not appear** in the learner/public catalog or marketing “available courses” grids until it is **complete** per the reference checklist and explicitly **allowlisted** in `src/data/learning/flagshipLearnerCatalogPolicy.ts`.
- Incomplete or placeholder courses must not appear in learner catalog or pathway “available” counts used for public trust.

## Monetization

- **Monetization stays out** of learner-facing UI and access gates until the learning flow is stable and deliberately re-enabled (separate product decision).
- Backend billing code may remain dormant; learner routes should assume **open access** to allowlisted courses for signed-in learners.

## Generate / Studio

- **Generate, Studio, Ideas, Lab,** and similar operator surfaces are **not part of the learner/public IA** and must not be promoted from learner pages, nav, or footers.
- Direct routes may exist for legacy or internal use; they are not learner onboarding paths.

## Catalog policy

- Only courses on the **explicit learner allowlist** appear in `/learn` and related discovery surfaces that represent “available to learners.”
- Do not infer catalog readiness from partial metadata.

## Verification

- CI must keep running **`verify:course1-ai-essentials`**, flagship merge, and pathway merge scripts alongside learner E2E smoke tests whenever the shell or policy changes.
