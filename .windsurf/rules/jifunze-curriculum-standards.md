---
trigger: always_on
---

# Jifunze Curriculum Writing Standards

These rules govern all curriculum authoring on the Jifunze platform. They apply whenever any content file under `src/data/learning/`, `src/data/teaching/`, or `src/knowledge/` is being created or edited.

Jifunze is a serious learning platform. Every lesson, module, lab, and teaching atom must be written as if a thoughtful educator — not a content generator — produced it.

---

## 1. Anti-Generic Writing

**The default of AI-assisted writing is generic. Fight it explicitly.**

### What generic looks like (do not do this)
- Lesson outcomes that could apply to any course: `"Summarize what X means for a real use case."`
- Boilerplate intros that describe the category rather than the lesson: `"A structured module in X: Y — repeatable reading units."`
- Cookie-cutter reflection prompts recycled across every module: `"Where might speed tempt you to skip verification? Name one stop rule."`
- Identical framing reused across all session blocks: `"This lab is graded on reviewability — not vibes."`
- Practice bullets that say what to do without saying what distinguishes a good attempt from a weak one.

### What specificity looks like (do this)
- Name the real thing being tested. Not "understand a concept" — name the exact misconception, decision, or error pattern the learner must navigate.
- Write outcomes as behavioral tests: "You can defend this metric choice to a skeptical analyst without falling back on 'it felt right.'"
- Tie reflection prompts to the domain being taught. A KPI module reflection is about KPI gaming. A pricing module reflection is about margin floors. Not the same prompt.
- Every worked example must describe a concrete situation (a role, a deliverable, a real constraint) — not a generic "scenario."
- Practice tasks must name what separates a strong attempt from a weak one. Include at least one observable quality threshold.

### Enforcement check
Before writing any outcome, intro, reflection, or practice task, ask: *"Would this read identically in a different course on a different topic?"* If yes, rewrite it.

---

## 2. Deep Syllabus Flow

**Modules are not independent units. Each must be a continuation of the one before.**

### Rules for module sequencing
- Every module after M01 must explicitly name one concept from a prior module and extend, complicate, or apply it.
- `summary` fields must answer: *"What new intellectual move does this module enable that the previous module did not?"*
- The `stage` progression (`foundations → applied_practice → professional_execution → mastery_outputs`) must carry genuine depth differentiation, not just label changes:
  - **Foundations**: Learner can describe and recognize. Outputs are diagnostic tools and definitions.
  - **Applied practice**: Learner can produce and iterate under realistic constraints. Outputs are decisions, plans, critiques.
  - **Professional execution**: Learner can defend, stress-test, and communicate to stakeholders. Outputs are review-grade artifacts.
  - **Mastery outputs**: Learner can transfer across novel contexts and anticipate failures. Outputs are capstone-grade systems.
- Do not promote a topic to `professional_execution` stage if the learner has not yet practised basic application in `applied_practice`.

### Syllabus connective tissue
- At `revisionCheckpoint: true` modules, the recap must explicitly reference learning goals from 2–3 prior modules.
- Capstone descriptions must require integration across at least two different stage levels — not just the final one.
- Module titles must form a coherent reading arc. Reading all titles in sequence should tell a learner where the course is going and why the order matters.

---

## 3. Lesson Continuity

**Individual sessions (lesson / practice / recap / revision) are one coherent unit, not four separate pieces.**

### Session block rules
- The `lesson` block introduces the core concept, positions it in the module arc, and ends with a clear statement of what the `practice` will test.
- The `practice` block must reference specific deliverables tied to the lesson content — not generic lab framing. Name the thing the learner is building.
- The `recap` or `revision` block must name at least two claims from the lesson block and test whether the learner has internalized them — not re-teach them.
- `next_step` blocks must be directional: name the specific module or concept the learner is moving toward and why the sequence matters at this point.

### Teaching atom continuity (`TeachingConcept`)
Every `TeachingConcept` must have:
- `misconceptions[]` — at least two, written as learner-believable false claims (not abstract "common errors")
- `workedExample` — a specific realistic scenario with a role, a task, and an observable outcome
- `revisionAnchor` — a single-sentence test the learner can apply to themselves to check if the concept has stuck
- `goodUnderstandingMarkers[]` — behavioral signals, not restatements of the definition
- `weakUnderstandingMarkers[]` — the exact wrong move a learner makes when the concept hasn't landed

### Lab continuity (`TeachingLab`)
- `scenario` must describe a situation a real person would plausibly face — role, context, stakes.
- `instructions[]` must be sequential and each step must do exactly one thing.
- `whatGoodLooksLike[]` and `reviewCriteria[]` must be specific enough that two different reviewers would agree on whether a submission passes.
- `remediation[]` must not say "review the lesson" — it must say what specific habit or check to apply next time.

---

## 4. Beginner-to-Professional Progression

**Every library family and flagship course must have a traceable skill arc from orientation to reviewable professional output.**

### Progression rules
- A learner who completes only foundations-stage modules must exit with genuine mental models and at least one reusable diagnostic habit — not just vocabulary.
- A learner who completes applied-practice modules must exit with at least one reviewer-ready artifact — not a template or skeleton.
- A learner at professional-execution stage must be able to explain their reasoning to a skeptical peer, not just produce an output.
- Mastery outputs must require integration: the learner must connect concepts from multiple prior modules in a single capstone artifact.

### Anti-patterns to reject
- Capstones that are "fill in this template" — must require original analysis on the learner's own context.
- Learning outcomes that use passive verbs: "be exposed to," "become familiar with," "learn about." Use active, testable verbs: classify, defend, produce, debug, compare, critique.
- Stage labels that exist for completion tracking only with no content differentiation between stages.

### Progression markers in `curriculumQualityLayer.ts` and `LibraryCurriculumQuality`
- `competencyStages` must define each stage with a real capability delta — what a learner at this stage can do that they could not do at the previous stage.
- `commonFailureModes` must describe the specific wrong move, not a generic "lack of understanding."
- `goodUnderstandingLooksLike` must be a behavioral test, not a restatement of the stage label.

---

## 5. Realistic Examples, Misconceptions, Practice, and Reinforcement

**Every concept must be grounded. Nothing should float in abstraction.**

### Examples
- Every worked example must have: a context (what situation), a person (what role or responsibility), a constraint (what makes this hard), and an observable output (what "done" looks like).
- Examples must not be invented for maximum generality ("imagine you work at a company"). Name an industry, a team size, a deliverable, or a real tool class.
- When examples are abstract by necessity (e.g., flagship course foundations), they must still name the failure mode the example is designed to prevent.

### Misconceptions
- Misconceptions must be written as beliefs a smart learner might hold — not as obvious errors a beginner would make.
- Every misconception must be paired with either: (a) a worked counter-example or (b) a single test the learner can apply to disprove it themselves.
- Misconceptions that have already been addressed in a prior module should be referenced as "you may still notice this impulse" rather than taught fresh.

### Practice
- `practiceActivities` must produce a named artifact. "Draft X" is acceptable. "Think about Y" is not.
- Practice tasks must name the review standard: what would a knowledgeable peer say makes this attempt strong versus weak?
- At least one practice activity per module must connect to a real context the learner owns — their job, their project, their domain.

### Reinforcement
- `revisionAnchor` fields are mandatory on every `TeachingConcept`. They are single-sentence self-tests, not lesson summaries.
- `revisionCheckpoint: true` modules must produce a brief the learner could hand to someone else, not just answer questions.
- Recap blocks must compress the key distinction (not the full lesson) and name one common mis-application the learner should watch for.
- Every capstone must include a "what I still don't know" component — teaching intellectual humility as a skill.

---

## File-Level Authoring Rules

### `flagshipSessionContentOverrides*.ts` files
- Every session block override must be hand-authored. Do not use script-generated blocks as final production content without line-by-line editorial review.
- The `body` field of an `intro` block must be specific to the module topic — it must not be reusable across other modules without modification.
- `worked_example` blocks must include a concrete `example` string — not a meta-instruction about length.
- `reflection_prompt` values must differ meaningfully across modules in the same course.

### `TeachingConcept` atoms in `teachingKnowledgeBase*.ts` files
- `explanation` must be under 80 words and must not begin with "This concept covers..." or equivalent meta-language.
- `kbAtomRole` must be set on all new atoms. Do not leave it unset.
- `suggestedNextLessonSlugs` must be populated when a concept naturally flows into another.

### Spec-level files (`*LibrarySpec.ts`, `*CurriculumSpec.ts`)
- Lesson titles must imply the specific intellectual move, not just the topic area. "What ChatGPT Is" is acceptable. "Introduction to ChatGPT" is not.
- Module summaries auto-generated by template functions (e.g., `moduleSummary()` in `chatbotEverydayCurriculum.ts`) are scaffolding only. Replace them with authored summaries before a module is considered production-ready.
- Lesson-level `outcomes[]` auto-generated from template functions are scaffolding only. Mark auto-generated outcomes with a `// TODO: author` comment and replace before shipping.

---

## Language and Tone

- Write for a serious adult who is skeptical of learning-platform marketing and has been burned by shallow courses before.
- Do not use: "dive into," "explore," "unpack," "exciting," "game-changing," "powerful," "unlock your potential."
- Precision over positivity. A good lesson summary tells the learner exactly what intellectual work they are about to do — not how great they will feel afterward.
- Jifunze's voice is grounded, direct, and treats the learner as a professional. Match that voice in all instructional content.
- Claims about learner outcomes must be bounded: "By the end of this module, you should be able to..." not "You will master..."
- Never describe a course as a path to employment, certification, or income unless that claim is specifically and verifiably true.
