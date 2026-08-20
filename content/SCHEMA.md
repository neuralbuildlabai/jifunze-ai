# Course Authoring Schema

**Status:** Authoritative. The compiler in `scripts/compile-course.ts` validates every course against this schema. Changes to this schema require corresponding updates to the compiler.
**Date:** 2026-05-18.

This document defines the canonical course-authoring format. Every Jifunze.ai course lives in `content/courses/<slug>/` with the following structure:

```
content/courses/<slug>/
├── course.yaml         (required — course metadata + module/lesson structure)
├── rubric.yaml         (optional — capstone rubric, if not inline in course.yaml)
└── lessons/
    ├── 01-<lesson-slug>.mdx
    ├── 02-<lesson-slug>.mdx
    └── ...
```

The compiler reads this tree, validates against this schema, and emits typed TypeScript into `src/data/learning/courses/<slug>/`.

---

## 1. `course.yaml` — top level

| Field | Type | Required | Notes |
|---|---|---|---|
| `slug` | string | yes | URL slug; must match the directory name |
| `title` | string | yes | Full course title (~3–10 words) |
| `school` | enum | yes | One of `ai_digital | business_growth | career_intellect | leadership_learning | mathematics | sciences | specialization` |
| `tier` | enum | yes | One of `free_starter | flagship | standalone | library` |
| `status` | enum | yes | One of `pilot | active | archived` |
| `levelRange` | string | yes | e.g. "Beginner to Intermediate" |
| `durationLabel` | string | yes | e.g. "4–6 hours" |
| `priceLabel` | string | yes | e.g. "Subscription" or "Free" |
| `subtitle` | string | yes | One-line subtitle for catalog cards (~10–20 words) |
| `intro` | string (multiline) | yes | 1–2 paragraph framing for the course detail page |
| `promise` | string (multiline) | yes | What the learner will be able to do after completion |
| `depthStages` | object | yes (flagship) | Four stages: `foundations`, `appliedPractice`, `professionalExecution`, `masteryOutputs` |
| `learningOutcomes` | string[] | yes | 4–8 specific outcome statements |
| `whatYouCreate` | string[] | yes | 3–6 named portfolio outputs |
| `modulePathway` | string[] | yes (flagship) | High-level module path labels |
| `capstone` | object | yes (flagship) | See §3 |
| `surfaces` | object | yes | Which output surfaces this course populates — see §4 |
| `modules` | object[] | yes | Module structure — see §2 |

### Example top level

```yaml
slug: ai-with-claude-everyday
title: AI with Claude for Everyday Work
school: ai_digital
tier: flagship
status: pilot
levelRange: Beginner to Intermediate
durationLabel: 4–6 hours
priceLabel: Subscription
subtitle: Use Claude with judgment, verification, and a workflow you can defend.
intro: |
  Most professionals encounter Claude as an "AI assistant" without a sharp
  mental model of when it helps and when it doesn't. This course gives you
  that model and the working habits that follow from it...
promise: |
  By the end you will have a personal use-stance you can defend to a
  skeptical colleague, a verification routine you actually apply, and a
  workflow that integrates Claude without making your judgment dependent
  on it...
depthStages:
  foundations: Mental model of what Claude is and is not.
  appliedPractice: Use Claude on real work tasks with verification.
  professionalExecution: Workflow integration with quality gates.
  masteryOutputs: Defensible use stance and operating procedure.
learningOutcomes:
  - Distinguish where Claude reliably helps from where it predictably fails
  - Build a verification routine appropriate to task stakes
  # ... etc
whatYouCreate:
  - A personal use-stance one-pager
  - A verification matrix tied to task risk
  - A workflow integration plan
modulePathway:
  - Foundations
  - Applied practice
  - Professional execution
  - Mastery outputs
capstone:
  prompt: Submit your team-ready Claude use stance.
  evidence: Module04_Use_Stance_[YourName].pdf
  rubricRef: ./rubric.yaml
surfaces:
  flagship: true
  library: true
  free_starter_interactive: false
modules:
  # ... see §2
```

---

## 2. `modules` array

Each module is an object:

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | Stable identifier, e.g. `m01`. Used in lesson front-matter. |
| `order` | int | yes | 1-indexed position in the course |
| `title` | string | yes | Module title |
| `stage` | enum | yes | One of `foundations | applied_practice | professional_execution | mastery_outputs` |
| `summary` | string (multiline) | yes | 1 paragraph module summary |
| `learningGoals` | string[] | yes | 3–6 specific module-level outcomes |
| `practiceActivities` | string[] | yes | 3–6 hands-on activity descriptions |
| `revisionCheckpoint` | bool | optional | Default false. True = mastery quiz at module end. |
| `recap` | bool | optional | Default false. True = recap section. |
| `expectedOutputs` | string[] | optional | Named artifacts the learner produces in this module |
| `lessons` | string[] | yes | Filenames of lesson MDX files in `lessons/` directory, in learning order |

### Example module

```yaml
modules:
  - id: m01
    order: 1
    title: What Claude Is and What It Is Not
    stage: foundations
    summary: |
      Build an accurate mental model of Claude as a probabilistic helper that
      has read widely and remembers nothing between sessions. Understand the
      classes of task it handles reliably versus where it can sound confident
      and be wrong.
    learningGoals:
      - Name three task patterns Claude handles well
      - Name three task patterns Claude handles poorly
      - Explain why Claude can sound confident on questions it cannot answer
      - Distinguish probabilistic generation from search or computation
    practiceActivities:
      - Take a real task from your week; predict where Claude will help vs slip
      - Run the same prompt three times; observe variance and confidence calibration
      - Draft a one-paragraph mental-model statement in your own words
    revisionCheckpoint: true
    expectedOutputs:
      - Module01_Use_Boundary_[YourName].pdf
    lessons:
      - 01-what-claude-is.mdx
      - 02-what-claude-is-not.mdx
      - 03-the-confidence-trap.mdx
      - 04-task-patterns.mdx
```

---

## 3. `capstone` object

| Field | Type | Required | Notes |
|---|---|---|---|
| `prompt` | string (multiline) | yes | The capstone task statement shown to the learner |
| `evidence` | string | yes | Filename pattern for the deliverable, e.g. `Module04_Use_Stance_[YourName].pdf` |
| `rubricRef` | string | optional | Path to a separate `rubric.yaml` (relative to course.yaml) |
| `rubric` | object | optional | Inline rubric (alternative to `rubricRef`) |

Exactly one of `rubricRef` or `rubric` must be present.

### Inline rubric format

```yaml
capstone:
  prompt: ...
  evidence: ...
  rubric:
    criteria:
      - id: clarity
        label: Clarity of position
        levels:
          - score: 1
            label: Unclear
            descriptor: Position is vague or unstated
          - score: 2
            label: Stated
            descriptor: Position is clear but not defended
          - score: 3
            label: Defended
            descriptor: Position is clear and defended with examples
          - score: 4
            label: Exemplary
            descriptor: Position is clear, defended, and anticipates objections
```

---

## 4. `surfaces` object

Declares which output surfaces the compiler should emit for this course.

| Field | Type | Required | Notes |
|---|---|---|---|
| `flagship` | bool | yes | True → emit native flagship session content + appear at `/learn/courses/:slug` |
| `library` | bool | yes | True → emit library reader sections + appear at `/library/:slug` |
| `free_starter_interactive` | bool | yes | True → catalog wiring for an embedded Rise package (the Rise HTML must be authored separately and dropped at `public/course-assets/interactive/<slug>/`) |

At least one surface must be true.

---

## 5. Lesson MDX format

Each lesson is a single file at `content/courses/<slug>/lessons/<NN>-<lesson-slug>.mdx`. The filename's `NN` prefix is for ordering and is enforced by the compiler.

### Front-matter

YAML front-matter at top, delimited by `---`.

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | Stable identifier, e.g. `m01-l01` |
| `title` | string | yes | Lesson title |
| `moduleId` | string | yes | Must match a module `id` in course.yaml |
| `order` | int | yes | 1-indexed position within the module |
| `shortTitle` | string | optional | Brief title for navigation; defaults to `title` |
| `durationMinutes` | int | yes | Estimated learner time |
| `outcomes` | string[] | yes | 2–5 specific lesson outcomes |
| `prerequisites` | string[] | optional | Names of lesson IDs the learner should complete first |
| `sessionBlocks` | object[] | yes (for flagship) | Structural blocks for the flagship session player — see §6 |

### Body

Below the front-matter, the body is MDX. Prose sections are split by H2 headers (`##`); the compiler maps these to `PublicStarterLessonSection` entries for the library reader, and (where session blocks reference them) into flagship session content.

The body may use a small set of MDX components (rendered at the React layer post-compile):

- `<Callout kind="watch|tip|warning|example">...</Callout>` — pull-out box
- `<Pullquote attribution="...">...</Pullquote>` — quoted text with attribution
- Future (post-Wave-2): `<MathLab problem="..." />`, `<CloudLab provider="..." trackId="..." />`, `<AITutorChat objective="..." rubric="..." />`

### Example lesson

```mdx
---
id: m01-l01
title: What Claude Is
moduleId: m01
order: 1
shortTitle: What Claude is
durationMinutes: 12
outcomes:
  - Name three task patterns Claude handles well
  - Explain probabilistic generation in one paragraph
  - Identify one upcoming task you will use Claude for
sessionBlocks:
  - type: intro
    eyebrow: New
    title: The right mental model
  - type: concept_explanation
    title: Probabilistic helper, not a search engine
  - type: worked_example
    title: A real task, with notes on where it slipped
  - type: practice_task
    title: Run this prompt and label the slips
    prompt: Take a doc you wrote this week and ask Claude...
    outputExpectation: A short labeled diff
---

## The right mental model

Claude is a probabilistic helper that has read a lot and remembers nothing
between sessions unless you give it the relevant context...

## Probabilistic helper, not a search engine

When you ask Claude what time it is, it doesn't know...

<Callout kind="watch">
Claude will sound confident on questions it cannot actually answer.
</Callout>

## A worked example

[concrete example here]

## Practice

Run this prompt on a document you wrote in the last week...
```

---

## 6. `sessionBlocks` schema (flagship lessons only)

Each entry is an object:

| Field | Type | Required | Notes |
|---|---|---|---|
| `type` | enum | yes | One of `intro | concept_explanation | worked_example | practice_task | reflection | assessment` |
| `eyebrow` | string | optional | Small tag above the title (e.g. "New") |
| `title` | string | yes | Block title |
| `body` | string (multiline) | optional | Override body text; if omitted, compiler pulls from matching H2 section in MDX body |
| `bullets` | string[] | optional | Bullet list inside the block |
| `prompt` | string (multiline) | optional | For `practice_task` blocks |
| `example` | string (multiline) | optional | Illustrative scenario |
| `outputExpectation` | string | optional | What "done" looks like |

When `body` is omitted, the compiler looks for an H2 header in the MDX body whose text matches `title` (case-insensitive, leading-article-stripped) and pulls that section's prose.

---

## 7. Compiler outputs

For a course at `content/courses/<slug>/`, the compiler emits:

```
src/data/learning/courses/<slug>/
├── curriculum.generated.ts    (FlagshipCourseCurriculum if surfaces.flagship)
├── sessions.generated.ts      (FlagshipSession[] if surfaces.flagship)
├── reader.generated.ts        (PublicStarterModule[] if surfaces.library)
├── catalog.generated.ts       (FlagshipCourse entry if surfaces.flagship; FreeStarterRiseCourseEntry if surfaces.free_starter_interactive; StandaloneCourseSpec if tier=standalone)
├── index.generated.ts         (re-export hub)
└── .manifest.json             (artifact list, route hints, source checksums)
```

Every emitted `.ts` file has a header comment:

```typescript
// AUTO-GENERATED by scripts/compile-course.ts from content/courses/<slug>/.
// Do not edit by hand. Re-run `npm run compile:course -- --slug <slug>` after editing source files.
// Source checksum: <sha256>
```

---

## 8. Validation rules (enforced by compiler)

The compiler refuses to emit if any of these fail:

1. `course.yaml` is missing required fields.
2. A module declares lessons that don't exist as files in `lessons/`.
3. A lesson MDX file's `moduleId` doesn't match any module in `course.yaml`.
4. A lesson MDX file's filename's `NN` prefix doesn't match its front-matter `order` field within its module.
5. `surfaces.flagship: true` but a module is missing `learningGoals` or `practiceActivities`.
6. `capstone` is missing `evidence` filename pattern.
7. Both `rubricRef` and `rubric` are present, or neither is.
8. `slug` doesn't match the directory name.
9. Duplicate lesson `id` values across the course.

---

End of schema.
