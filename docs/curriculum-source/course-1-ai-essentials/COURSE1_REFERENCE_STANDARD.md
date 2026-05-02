# Course 1 (AI Essentials) — reference standard

This document defines what “complete” and “reference-quality” mean for Jifunze flagship courses. **Course 2 and later courses should map to this standard before entering the public learner catalog.**

## 1. Course identity

- **Slug:** `ai-essentials`
- **Positioning:** AI and Digital Fluency — structured, portfolio-oriented, capstone-finished learning path.
- **Audience:** Beginner to intermediate learners; serious pace with checkpoints, not a shallow overview.

## 2. Module structure

- **16 curriculum modules** in canonical order, plus **Module 16 capstone** with rubric-backed completion.
- Each module includes **sessions** (lesson, practice, revision/recap as authored), **module checkpoint quiz**, and **portfolio-oriented output** where specified.

## 3. Session types

- **Lesson:** Guided flow (Start → Learn → Example → Check → Complete); objectives and completion gate.
- **Practice:** Task-first lab (Goal → Tasks → Artifact → Review → Complete); learner responses and mastery checkpoints where authored.
- **Quiz / revision / recap:** As defined in curriculum; must not break forward gating rules.

## 4. Lesson UX pattern

- One session = one job; grouped step rail (no per-block list in navigation).
- Primary teaching in **Learn** and **Example**; optional depth collapsed or under “more” sections inside steps.
- **Complete** step: readiness checklist + mark complete + next navigation.

## 5. Practice lab UX pattern

- Distinct from lesson: emphasize **tasks** and **artifact** early; minimal repeated overview.
- Sidebar / mobile menu: Goal, Tasks, Artifact, Review, Complete.

## 6. Checkpoint / quiz standard

- **Module checkpoint:** `MODULE_QUIZ_DRAW_COUNT` questions (currently **8**); pass with at least **`MODULE_QUIZ_MIN_CORRECT`** correct (currently **6**). Do **not** label this as “80%” in learner copy; the rule is count-based.
- Failed attempts follow lock / review rules in code (`flagshipModuleQuizPools`).

## 7. Portfolio output standard

- Each module’s authored **portfolio output** name and expectations are part of completion narrative and reports.
- Evidence accumulates through sessions, practice saves, and checkpoints—not a separate “creator studio.”

## 8. Capstone standard

- **Module 16** end-to-end workflow; **self-grade rubric** persisted (Supabase when configured, merged with local progress).
- **100% course progress** requires capstone module completion **and** rubric rows marked **Ready** or **Strong** per product rules.

## 9. Progress / milestone standard

- **10 milestones**; **Module 1 complete (including quiz where applicable) = 10%** display milestone.
- **100%** aligns with capstone + rubric rule above.
- Progress merges **local + remote** (`mergeLocalRemoteReconciledForSlug`, flagship progress events).

## 10. Reports / certificate-readiness standard

- Reports summarize **sessions done**, **module quizzes passed**, **next session**, and pathway hints where relevant.
- “Certificate readiness” in-product is **not** external accreditation; copy must stay claim-safe.

## 11. Learner UI simplicity rules

- One page = one job; one primary CTA per card.
- No Generate / Studio / billing / subscription / marketplace language on learner surfaces.
- Catalog only shows **explicitly allowlisted** complete courses (`flagshipLearnerCatalogPolicy.ts`).

## 12. Mapping checklist for future courses

- [ ] Slug, 10+ milestone model or documented exception
- [ ] Full curriculum JSON + sessions build
- [ ] Module quizzes pools sized ≥ draw count
- [ ] Practice mastery checkpoints where required by progression
- [ ] Capstone + rubric or documented alternative completion artifact
- [ ] `verify:course1-*` pattern scripts for the new slug (parallel suite)
- [ ] E2E smoke for first module lesson + practice + quiz
- [ ] Allowlist entry + rollout review

## 13. Completion criteria before public learner catalog

1. **Curriculum complete** — all modules and sessions authored and linked.
2. **Quizzes and gates** verified against progression code.
3. **Capstone / completion artifact** defined and persistence tested.
4. **Progress + merge** verified (local + Supabase).
5. **Verification scripts** green in CI.
6. **Product / legal copy** reviewed (no unsafe job/income/accreditation claims).
7. **Explicit allowlist** update; no inference from partial metadata alone.
