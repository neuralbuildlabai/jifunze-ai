# Course1_Progress_Milestones_Spec

*Platform-team-only specification for how AI Essentials (Course 1) progress is calculated and displayed across Jifunze surfaces. Not learner-facing. Not a rewrite of course content.*

---

## Why this document exists

Course 1 — AI Essentials has sixteen modules, but the product requirement is that learner-visible progress increments in **ten milestones**, not sixteen. A naive "modules-complete / 16" calculation produces milestones at 6.25%, 12.5%, 18.75%, 25.0%, … — values that read as awkward and that do not match the product spec for AI Essentials, where Module 1 completion must show as **10%** in every place progress is displayed.

This document fixes the milestone model so every dashboard, course page, pathway view, reports view, and certificate-readiness view shows the same percentage for the same learner state.

It does not change what counts as completion of a module. Module-level completion logic in the app (including the module quiz pass rule: **at least 6 of 8** correct, plus mastery checkpoints and other gates as implemented) plus portfolio artifact uploaded and revision-guidance addressed where applicable is unchanged.

---

## The ten-milestone model

| Milestone | Modules required | Cumulative progress |
|---|---|---|
| 1 | Module 1 complete | **10%** |
| 2 | Module 2 complete | 20% |
| 3 | Modules 3 *and* 4 complete | 30% |
| 4 | Modules 5 *and* 6 complete | 40% |
| 5 | Modules 7 *and* 8 complete | 50% |
| 6 | Modules 9 *and* 10 complete | 60% |
| 7 | Module 11 complete | 70% |
| 8 | Modules 12 *and* 13 complete | 80% |
| 9 | Modules 14 *and* 15 complete | 90% |
| 10 | Module 16 capstone bundle uploaded *and* rubric self-graded at *Ready* or higher on every criterion | 100% |

Reading rule: progress reaches a milestone only when **all** modules in that milestone group are individually complete. Partial completion of a milestone (one of two modules done) does **not** advance the percentage; it remains at the previous milestone's value until the second module clears.

The model is intentionally additive on the early milestones (one module each for M1, M2, M11) and grouped on the middle milestones, because the early modules anchor the mental model and need their own visible progress increments, while the middle modules ladder up in pairs that already share continuity bridges in the course content.

---

## Required behaviour, by surface

The same percentage must appear on every surface for the same learner state. The progress calculation runs once and is reused.

**Course page (AI Essentials).** Shows the milestone-mapped percentage. The progress bar fills to the percentage. The next-module nudge points at the first incomplete module of the next milestone group, not at module N+1.

**Dashboard.** Shows the same percentage. The "modules complete" sub-statistic still shows the raw module count (e.g., *4 of 16*), because that is also useful information; it sits next to the milestone-mapped percentage, not in place of it.

**Pathway progress.** Where AI Essentials contributes to a Jifunze pathway's overall progress, AI Essentials counts as one course at the milestone-mapped percentage. The pathway's own course-weighting logic is unchanged.

**Reports page.** Shows the milestone-mapped percentage. If the report exposes module-level completion separately, that is fine; the headline AI Essentials percentage is the milestone-mapped one.

**Certificate-readiness page.** Shows the milestone-mapped percentage *and* the certificate-readiness criteria from `Course1_Certificate_Readiness.md`. The certificate is not issued at 100% progress alone — it is issued when all six readiness criteria are satisfied (see `Course1_Certificate_Readiness.md`, *Required completion criteria*). The 100% milestone is necessary but not sufficient.

---

## Implementation path

The safest change order is:

1. **Add a single shared helper** — `getCourseProgress(courseId, modulesComplete[])` — that returns `{ percentage, milestone, nextModuleIds }`. For `courseId === "ae" /* AI Essentials */`, the helper applies the table above. For every other course, it falls back to whatever model is already in use. This isolates the AI Essentials override to one function and prevents accidental application to other courses.

2. **Route every progress display through the helper.** Find every place a course progress percentage is computed today (course page, dashboard tile, pathway widget, reports table, certificate-readiness card, any localStorage cache writer, any Supabase `flagship_course_progress` merge handler) and call the helper. Do not duplicate the milestone table.

3. **Do not change `module_complete` writes.** Module completion records (raw `1` per completed module) continue to be written exactly as they are today. The milestone mapping happens at read-time inside the helper. This preserves the existing local/remote merge behaviour and avoids data migration.

4. **Cache invalidation.** If progress is cached client-side, invalidate the cache on any module-completion event for AI Essentials. If progress is cached server-side, invalidate on the same event. The milestone mapping is cheap; do not attempt to cache the mapping itself separately from the underlying module-completion set.

5. **Cross-tier check.** After deploy, walk through one learner state per milestone (M1 only, M1+M2, M1+M2+M3+M4, …) on each surface and confirm the same percentage shows everywhere.

---

## Edge cases

**Out-of-order completion.** A learner who completes Module 4 before Module 3 (because revision happens out of order, or because a checkpoint retake lands first) does not advance into Milestone 3 until Module 3 is also complete. The model checks the **set** of completed modules, not the order.

**Capstone partial state.** A learner who has uploaded the Module 16 bundle but has not yet self-graded against the rubric sits at 90%, not 100%. Milestone 10 requires both the upload *and* the rubric self-grade at *Ready* or higher on every criterion. This avoids the case where a learner uploads a draft bundle and the dashboard reports the course as complete.

**Revision below threshold.** A learner who completes Module N and later has its **module quiz** fall below **6 of 8** correct (rare, but possible if the platform allows a fresh attempt) regresses out of the milestone group that includes Module N until the quiz passes again (at least 6 of 8). Module-completion writes already handle this correctly today; the milestone mapping inherits that behaviour.

**Pathway-only learners.** A learner enrolled in a pathway that includes AI Essentials sees the same milestone-mapped percentage in the pathway view as in the course view. The pathway's own *course weight* (e.g., AI Essentials is 1 of 4 courses in pathway X) sits on top of the AI Essentials percentage, not under it.

---

## What this spec does not change

- It does not change the number of modules in Course 1 (still sixteen).
- It does not change the order of modules.
- It does not change what counts as completion of a single module.
- It does not change Course 1 — AI Essentials course content in any way.
- It does not introduce a new milestone marker into the learner-facing module flow. A learner does not see "Milestone 3 reached" inside the course; they see the percentage on the dashboard and on the course page.

The only learner-visible effect is that the displayed percentage advances in clean ten-percent increments at predictable points, and Module 1 completion shows as 10% across every Jifunze surface.

---

*This is the canonical specification. If a Jifunze surface displays an AI Essentials percentage that does not match the table above, that surface is the one to fix; the table is the source of truth.*
