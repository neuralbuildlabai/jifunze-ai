# Jifunze Curriculum Governance

**Status:** Initial audit — April 2026  
**Scope:** Full content map across `src/data/learning/`, `src/data/teaching/`, standalone courses, and flagship session overrides.  
**Purpose:** Document where curriculum content lives, identify quality risks, and record governance decisions. Update this file after each audit or rewrite cycle.

---

## Content Map

### Primary content locations

| Layer | File(s) | What lives here |
|---|---|---|
| Flagship curricula | `src/data/learning/flagshipCourseCurricula.ts` + `Extended.ts` + `Extended2.ts` | 15 flagship course module specs: stage, summary, learningGoals, practiceActivities, expectedOutputs |
| Flagship catalog | `src/data/learning/flagshipCoursesCatalog.ts` | Course marketing metadata: intro, promise, depthStages, learningOutcomes |
| Session content | `src/data/learning/flagshipSessionContentOverrides.ts` + `...Completion.ts` + `...MidCourse.ts` + `...Schools134.ts` | Learner-facing instructional blocks per session: intro, concept_explanation, worked_example, practice_task, reflection_prompt, next_step |
| Library specs | `src/data/learning/aiCurriculumSpec.ts`, `chatbotLibrarySpec.ts`, `mlCurriculumSpec.ts` | Category/module/lesson specs for the three core library families (AI, Chatbots, ML) |
| Extended library specs | `src/data/learning/extendedLibrariesSpecs.ts` | Specs for Networking, Cybersecurity, Cloud/DevOps, Monitoring, Content Publishing |
| Enriched reader sections | `src/data/learning/curriculumEnrichedSections/` | Full prose reader sections for AI Foundations, ML, Chatbots, Cloud, Cyber, and public spine |
| Standalone course specs | `src/data/learning/standaloneCoursesSpecs.ts` + `Wave2.ts` | Module/lesson specs for ChatGPT, Claude, Prompt Engineering, Gemini, Agentic AI courses |
| Quality layer | `src/data/learning/curriculumQualityLayer.ts` + `curriculumQualityStandaloneCourses.ts` | Competency stages, failure modes, scenario assessment metadata per library |
| Teaching atoms | `src/data/teaching/teachingKnowledgeBase.ts` + `*Expanded.ts` + `*CurriculumFill.ts` + other variants | Ground-truth TeachingConcept atoms: explanation, misconceptions, workedExample, revisionAnchor, markers |
| Teaching labs | `src/data/teaching/aiLabsCurriculum.ts` + `nonAiTeachingLabs.ts` | TeachingLab definitions: scenario, instructions, whatGoodLooksLike, reviewCriteria, remediation |

### The 15 flagship courses

| School | Course slug |
|---|---|
| AI & Digital | `ai-essentials`, `smart-workflows-with-ai`, `data-and-decisions`, `web-and-software-foundations`, `digital-safety` |
| Business & Growth | `marketing-and-growth`, `business-builder`, `money-and-finance`, `product-thinking`, `project-execution` |
| Career & Mind | `career-launch`, `clear-communication`, `research-and-critical-thinking` |
| Leadership | `leadership-and-teams`, `teaching-and-facilitation` |

### Standalone courses

`learn-chatgpt-everyday`, `prompt-engineering-across-models`, `gemini-workspace-productivity`, `claude-writing-research`, `agentic-ai-real-work`

---

## Quality Assessment

### Strong areas (do not rewrite without strong reason)

**`ai-essentials` flagship** — Best example of Jifunze's authoring standard in the repo. Module summaries are specific and distinct. Learning goals use testable verbs. The session content in `flagshipSessionContentOverrides.ts` (the non-bulk portion) — especially the marketing-and-growth and mid-course overrides — is well-authored with genuine worked examples and domain-specific reflection prompts.

**`marketing-and-growth` session overrides** — Module `mg-m01` is an exemplary intro block: names the failure mode ("confusing activity with learning"), embeds a falsifiable hypothesis constraint in the worked example, and uses a reflection prompt tied specifically to growth work. Use this as an authoring reference.

**`data-and-decisions` curriculum** — The module arc is genuinely progressive. Modules dd-m01 through dd-m03 form a coherent foundations arc (measurement → KPI hierarchy → visualization). Learning goals are well-specified and domain-grounded.

**`money-and-finance` curriculum** — Strong use of real-stakes framing ("cash timing traps," "vanity denominators," "ethical pricing floor"). Capstone is a genuine integration artifact with five specific deliverables.

**Core `TeachingConcept` atoms in `teachingKnowledgeBase.ts`** — The founding atoms (`ai-definition-and-limits`, `automation-vs-ai`, `prompt-anatomy`) are well-structured with believable misconceptions, specific worked examples, and behavioral markers.

**`standaloneCoursesSpecs.ts` (ChatGPT and Claude courses)** — Lesson-level outcomes are specific and behavioral. Module summaries name the intellectual move rather than the topic.

---

### Weak areas (prioritized for editorial attention)

#### Priority 1 — `flagshipSessionContentOverridesCompletion.ts` (432KB)

**Risk level: High.** This is the largest single content file in the repo and the one most explicitly flagged in its own header comment as requiring "human editorial sign-off."

The bulk-generated pattern is pervasive and visible. Specific failure modes found:

- **Identical intro bodies** across dozens of modules: `"This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier."` — this appears verbatim for every practice block in `ai-essentials`.
- **Identical reflection prompts** across multiple modules: `"Where might speed tempt you to skip verification? Name one stop rule."` — appears in `ae-m02-lesson`, `ae-m03-lesson`, and others without modification.
- **Identical next_step blocks**: `"Ship a short artifact now—half a page beats a polished blank page."` — repeated across multiple modules.
- **Worked examples without real examples**: The `example` field consistently contains `"Keep under ~200 words unless your reviewer explicitly asked for depth."` — a length instruction, not a worked example.
- **Concept explanation blocks** that are templates: `"Primary outcome lens: [copied learning goal]. Practice spine you will revisit: [copied practice activity]."` — this is not a concept explanation, it is a transcript of the spec.

**Do not treat this file as production-ready prose.** It is a scaffold that requires line-by-line editorial replacement for every session block.

**Affected course count:** All 15 flagship courses have session content drawn from this file.

#### Priority 2 — `chatbotEverydayCurriculum.ts` auto-generated content

The curriculum compiler functions in this file produce structurally identical outputs for every lesson:

- `lessonOutcomes()` generates three outcomes for every lesson using the same template: `"Summarize what '${lessonTitle}' means for a real chatbot..."`, `"Name one user-trust or safety angle..."`, `"State clear scope boundaries..."`. None of these are lesson-specific.
- `moduleSummary()` generates: `"A structured module in ${categoryTitle}: ${moduleTitle.toLowerCase()}—repeatable reading units, not vendor marketing."` — This is the same sentence for every module in the chatbot library, with only the nouns swapped.
- `lessonSummary()` generates: `"Practical chatbot guidance on ${lessonTitle.toLowerCase()}—set in ${moduleTitle.toLowerCase()} within ${categoryTitle}."` — Identical structure for all 100+ lessons.

**Every lesson in the chatbot library currently has auto-generated outcomes.** This is the most widespread generic-content problem in the repo by volume.

The `chatbotLibrarySpec.ts` file (the source spec) contains lesson titles only — no summaries, no outcomes, no worked examples. The spec itself is thin.

#### Priority 3 — `extendedLibrariesSpecs.ts` spec thinness

The five extended library specs (Networking, Cybersecurity, Cloud/DevOps, Monitoring, Content Publishing) contain only category summaries and lesson titles. No:
- Lesson-level outcomes
- Module-level learning goals
- Misconceptions
- Worked examples
- Stage progression markers

These libraries are structurally complete but editorially empty. The `extendedLibrariesCurricula.ts` compiler may fill some gaps, but the source specs have no editorial depth.

#### Priority 4 — Mid-course session overrides (`flagshipSessionContentOverridesMidCourse.ts`)

This file was generated from `scripts/build-flagship-mid-session-overrides.mjs` and shows templated patterns across all 15 courses. The authoring note says to treat it as canonical, but the content shows mechanical generation: worked example `example` fields are length instructions, reflection prompts repeat across courses, and next_step bodies are boilerplate encouragement.

The `ae-m05` and `ae-m06` overrides in this file are better than most (the "learning with AI without outsourcing cognition" framing is specific) but are not representative of the full file's quality.

#### Priority 5 — Late-stage flagship modules in Extended2

The `leadership-and-teams` and `teaching-and-facilitation` courses in `flagshipCourseCurriculaExtended2.ts` have not been read in full — read them before auditing. Based on the pattern from Extended and Extended2 earlier modules, later modules in the sequence (beyond M05) tend to have shorter summaries and fewer practiceActivities. Audit required before assigning priority.

---

## Governance Decisions

### Content generation policy

- **Scripts in `scripts/` are drafting tools, not production authoring tools.** Files in `scripts/archive/` are retired.
- `flagshipSessionContentOverridesCompletion.ts` is explicitly governed by the policy in its own header: "Do not regenerate final prose via scripts."
- New session content blocks must be written directly in TypeScript, not generated and committed.

### What counts as production-ready content

A module is production-ready when:
1. Its `summary` field is hand-authored and domain-specific (not a template output).
2. Its `learningGoals` use active testable verbs and name specific behaviors.
3. Its session content blocks (`lesson`, `practice`, `recap`/`revision`) are distinct from each other and from other modules in the same course.
4. Its `reflection_prompt` is specific to its domain and does not repeat in any other module in the same course.
5. Its `worked_example` contains a real example — not a length instruction.

A module that fails any of these is scaffolding, not production content.

### TeachingConcept authoring policy

- New `TeachingConcept` atoms must set `kbAtomRole`.
- `misconceptions[]` must contain at least two entries written as first-person learner beliefs, not abstract error categories.
- `revisionAnchor` is mandatory. It is a self-test sentence, not a lesson summary.

---

## Authoring Reference Examples

These are the best examples of Jifunze authoring standard currently in the repo. Read these before writing new content.

### Best module summary
From `marketing-and-growth` (mg-m01):
> "Growth fails when teams confuse activity with learning—more content, more channels, more dashboards—without linking work to hypotheses, proofs, and decisions. Your job here is to install loops: propose → expose to reality → measure honestly → revise offer, message, or channel."

### Best reflection prompt
From `marketing-and-growth` (mg-m01):
> "Where are you most tempted to substitute activity for proof in your current growth work—and what single experiment would embarrass that reflex?"

### Best worked example framing
From `data-and-decisions` (dd-m01) — practice activity:
> "Annotate three real charts or KPI tiles: measured quantity, exclusions, wrong decision each could trigger."

### Best TeachingConcept misconception
From `teachingKnowledgeBase.ts` (`ai-definition-and-limits`):
> `'"If it sounds fluent, it must be factually correct."'`  
> `'"AI understands my company the way a colleague does."'`

### Best capstone deliverable
From `data-and-decisions`:
> "Evidence table mapping claims → sources → strength → gaps"

---

## Workflow Quick Reference

| Task | Use workflow |
|---|---|
| Assess a course before editing | `/curriculum-audit` |
| Rewrite a single flagged module | `/weak-module-rewrite` |
| Verify a course's module arc flows | `/syllabus-continuity-check` |

Workflows live in `.windsurf/workflows/`. Writing standards live in `.windsurf/rules/jifunze-curriculum-standards.md`.
