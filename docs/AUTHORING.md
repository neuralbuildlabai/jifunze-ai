# Authoring Guide

**Status:** Authoritative.
**Date:** 2026-05-18.
**Audience:** Anyone authoring a course on Jifunze.ai — engineers, contract editors, SMEs, AI-assisted drafters.

---

## What this document is

This is the operational guide for taking a course from a one-paragraph idea to a live course on the platform. It assumes the locked 50-course catalog in `docs/internal/COURSE_CATALOG_PLAN.md` defines *which* courses get authored; this guide covers *how*.

---

## The pipeline at a glance

```
content/briefs/<slug>.md         (human-authored brief, ~1–2 pages)
        │
        │ npm run author:outline -- --brief content/briefs/<slug>.md
        ▼
content/courses/<slug>/course.yaml     (draft outline, AI-generated)
        │
        │  ↓ HUMAN REVIEW GATE 1: edit course.yaml, replace placeholder lesson filenames
        │
        ▼
content/courses/<slug>/course.yaml     (approved outline)
        │
        │ npm run author:lessons -- --slug <slug>
        ▼
content/courses/<slug>/lessons/*.mdx   (drafts, AI-generated, one per lesson)
        │
        │  ↓ HUMAN REVIEW GATE 2: read each lesson; reject + re-draft as needed
        │
        ▼
content/courses/<slug>/lessons/*.mdx   (all approved)
        │
        │ npm run compile:course -- --slug <slug>
        ▼
src/data/learning/courses/<slug>/      (auto-generated TypeScript modules)
        │
        │  ↓ HUMAN REVIEW GATE 3: compile clean (no schema errors)
        │
        ▼
Wire the catalog entry into src/data/learning/flagshipCoursesCatalog.ts
        │
        ▼
Course is live at /learn/courses/<slug> and /library/<slug>
```

Three review gates. None of them are optional.

---

## Step 1 — Write the brief

Copy `content/briefs/_TEMPLATE.md` to `content/briefs/<slug>.md`. Fill in every section.

**This is the highest-leverage step in the entire pipeline.** A weak brief produces a weak course no matter how good the AI authoring is. Spend an hour here, not five minutes.

The brief sections that matter most:

- **Target learner (§2)** — three concrete archetypes, then a one-sentence representative. The single sentence is what the AI optimizes against.
- **What the learner will be able to do (§4)** — specific, verb-led outcomes. These become the course's `learningOutcomes` and shape every lesson.
- **Capstone (§6)** — exactly what the learner submits. Vague capstones produce vague courses.
- **Module shape (§7)** — module-level pathway only. Don't list lessons — that's the AI's job.
- **What this course is NOT (§10)** — scope discipline. Without this, courses bloat.
- **Authoritative references (§9)** — 5–20 sources the AI should treat as canonical. Reduces hallucination, brings in current material.

When the brief is done, get a second pair of eyes on it before running the outline pass. The brief is cheap to revise; outlines and lessons are not.

---

## Step 2 — Run the outline pass

```bash
npm run author:outline -- --brief content/briefs/<slug>.md
```

This calls the LLM with the brief + `content/STYLE.md` + `content/SCHEMA.md` as system prompt, and writes a draft `content/courses/<slug>/course.yaml`.

**LLM provider configuration** (one-time, in `.env.local`):

```
LLM_PROVIDER=anthropic         # or openai
ANTHROPIC_API_KEY=...          # if using Anthropic
ANTHROPIC_MODEL=claude-sonnet-4-6   # optional; default sonnet-class
# OR
OPENAI_API_KEY=...             # if using OpenAI
OPENAI_MODEL=gpt-4o            # optional; default gpt-4o
```

If both keys are present, defaults to Anthropic. Set `LLM_PROVIDER=openai` to force OpenAI.

Flags:
- `--force` — overwrite an existing `course.yaml` (default: refuse if one exists)
- `--temperature 0.3` — sampling temperature (default 0.3, lower = more deterministic)

Cost: one outline pass is roughly 5,000 input tokens + 2,000 output tokens. ~$0.05–0.10 per call at typical Sonnet pricing.

### Review Gate 1: outline

The outline pass produces a draft `course.yaml`. **Do not skip this review.** Read the YAML end-to-end and edit it directly:

1. **Modules:** are they in the right order? Does each one earn its slot? Should one merge with another?
2. **Learning goals (per module):** are they specific? Verb-led? Assessable?
3. **Practice activities (per module):** are they concrete? Could a learner actually do them in 15 minutes?
4. **Capstone:** is the deliverable clear? Does it integrate the modules or just append to them?
5. **Lesson filenames:** the outline pass produces placeholder `XX-placeholder-<n>.mdx` filenames. **Replace these with real, descriptive lesson slugs** before running the lessons pass. The lesson pass uses these filenames to decide what to draft.
6. **Surfaces:** confirm `flagship` and `library` settings match the catalog plan.

When the outline reads right, commit `course.yaml` and move on.

---

## Step 3 — Run the lessons pass

```bash
npm run author:lessons -- --slug <slug>
```

This iterates over every lesson declared in `course.yaml`, calls the LLM once per lesson, and writes the MDX file to `content/courses/<slug>/lessons/`.

By default, lessons that already exist are **skipped**. To redraft one, pass `--only` and `--force`:

```bash
npm run author:lessons -- --slug <slug> --only 03-the-confidence-trap.mdx --force
```

Flags:
- `--only FILENAME` — draft just one lesson (most common after review feedback)
- `--force` — overwrite existing lesson files
- `--temperature 0.4` — sampling temperature (default 0.4, slightly higher than outline for richer prose)

Cost: one lesson pass is roughly 6,000 input tokens + 2,500 output tokens. For a 16-lesson course, ~$1.50–3 total at Sonnet pricing. Negligible compared to human review time.

### Review Gate 2: lessons (per-lesson)

Read each lesson MDX file. The check:

1. **Opening:** does the lesson open with a concrete moment, not an abstract claim?
2. **Explain → example → practice:** does each major concept get all three?
3. **Practice activity:** is it concrete? Does it use the learner's own work as input?
4. **Length:** ~800–1500 words of body prose for a 12-minute lesson.
5. **Anti-pattern check:** scan for forbidden phrases from `content/STYLE.md` §4. If you find one, redraft.
6. **Worked examples:** are they specific and accurate? Not just plausible-sounding?
7. **Voice consistency:** does it sound like the same author as the other lessons?

If a lesson fails review, redraft it:

```bash
npm run author:lessons -- --slug <slug> --only <filename> --force
```

The second draft is usually better than the first because the AI has more course context (sibling lessons exist as references when you re-run).

If a lesson fails review **twice in the same way**, the brief is the problem. Stop, fix the brief, and consider whether the lesson should exist at all.

---

## Step 4 — Compile

```bash
npm run compile:course -- --slug <slug>
```

This reads `content/courses/<slug>/` and emits typed TypeScript modules into `src/data/learning/courses/<slug>/`:

- `curriculum.generated.ts` — FlagshipCourseCurriculum for the course detail page
- `sessions.generated.ts` — FlagshipSession[] for the session player
- `reader.generated.ts` — PublicStarterModule[] for the library reader
- `catalog.generated.ts` — FlagshipCourse entry for the catalog
- `index.generated.ts` — re-export hub
- `.manifest.json` — checksum and wiring hints

Flags:
- `--dry-run` — validate and report without writing files

### Review Gate 3: compile-clean

The compiler enforces structural contracts. If it fails, the failure message names exactly what's wrong:

- *"Lesson file declared in course.yaml but not found on disk"* → either rename the file or update course.yaml
- *"moduleId does not match"* → the lesson's front-matter has the wrong moduleId
- *"order N does not match position M"* → the lesson's order field, the filename prefix, and the position in `course.yaml` disagree
- *"capstone: exactly one of rubricRef or rubric must be present"* → fix course.yaml

Fix every error before continuing. The compiler is the structural quality gate.

After a clean compile, run typecheck:

```bash
npm run build
```

…which will fail if the emitted TypeScript doesn't match the existing flagship type definitions. (This is usually a sign that the schema or compiler needs updating, not the course content.)

---

## Step 5 — Wire the catalog

The compiler emits a `CATALOG_ENTRY` constant in `src/data/learning/courses/<slug>/catalog.generated.ts`. Append it to the `FLAGSHIP_COURSES` array in `src/data/learning/flagshipCoursesCatalog.ts`:

```typescript
import { CATALOG_ENTRY as aiWithClaudeEverydayCatalog } from './courses/ai-with-claude-everyday/catalog.generated'

export const FLAGSHIP_COURSES: FlagshipCourse[] = [
  // ...existing entries
  aiWithClaudeEverydayCatalog,
]
```

Similarly register the curriculum in `flagshipCourseCurricula.ts` and sessions in `flagshipCourseSessions.ts`. The compiler's `.manifest.json` lists each touch-point.

This is a one-time wiring per course. Future revisions to the course content do not require re-wiring; the compiler regenerates the modules in place.

---

## Step 6 — Pilot and ship

After wiring:

1. **Local dev:** `npm run dev`, navigate to `/learn/courses/<slug>` and `/library/<slug>`, click through the experience.
2. **Audit scripts:** `npm run audit:active-courses` to confirm the course appears in the inventory.
3. **Vercel preview:** push the branch, get a preview URL, share with 5–10 pilot learners.
4. **Pilot cohort:** 10–30 real learners go through the course. Capture their drop-off points and tutor session logs (Wave 3+). Acceptance is at least 4-star rating from a meaningful pilot sample.
5. **Status promotion:** when the pilot passes, change `status: pilot` → `status: active` in `course.yaml`, recompile, ship.

---

## The "what would a non-engineer do" version

If you are a non-engineer reviewing AI-drafted content:

- You do **not** need to run any commands.
- You receive `course.yaml` for review (Step 2 output). Edit it directly in any text editor; commit changes via your normal channel.
- You receive lesson MDX files for review (Step 3 output). Read each in any editor; either approve (no action) or write your revision notes inline as HTML comments: `<!-- REVIEW: this opening is too abstract; lead with the use-stance scenario -->`.
- An engineer re-runs `npm run author:lessons -- --slug <slug> --only <filename> --force` to produce a redraft incorporating your notes.

Three rounds of review per lesson is normal. More than five and the brief is the problem.

---

## Working with SMEs

For courses where an SME is named as co-author (per the SME requirements table in `docs/internal/COURSE_CATALOG_PLAN.md`):

1. **Brief co-authored** with the SME. The SME provides domain substance; the platform editor handles structure and voice.
2. **Outline review** is a meeting with the SME, not async. Module-level decisions need their judgment.
3. **Lesson review** by the SME for accuracy; by the platform editor for voice consistency. Both must sign off per lesson.
4. **Capstone rubric** by the SME. The platform cannot calibrate technical rubrics without domain expertise.
5. **Attribution** on the course "About this course" page names the SME. Contract per `docs/FOUNDER_OWNERSHIP_AND_CONTRIBUTOR_TERMS.md`.

The SME's name is the platform's signal that the course is technically credible. Treat the relationship accordingly.

---

## Costs

Per course (rough estimates at current Anthropic / OpenAI pricing):

- LLM tokens: ~$2–5 for outline + all lessons combined
- Human review time: 30–60 hours per course (the actual bottleneck)
- SME fees (if required): $3,000–8,000 per course
- Engineer wiring time: 1–2 hours per course

Per 10 courses (a typical authoring batch):

- LLM tokens: $20–50
- Human review: 300–600 hours
- SME fees (assuming half need SMEs): $15,000–40,000
- Engineer time: 10–20 hours

For the full 50-course catalog, see the cost section in `docs/internal/COURSE_CATALOG_PLAN.md`.

---

## When things go wrong

**Outline pass produces a course that doesn't match the brief.**
→ The brief is too vague. Rewrite §2, §4, and §7 with more specificity. The AI cannot read your mind; it can only read your brief.

**All lessons sound the same.**
→ The brief or STYLE.md is over-constraining variation. Loosen the structural template. Or: the temperature is too low; try `--temperature 0.5`.

**A lesson contains a confident factual error.**
→ Mark the section with `<!-- FLAG: verify with SME -->` and flag for review. Do NOT trust AI-drafted content on facts that matter. The STYLE.md §9 directive applies: when uncertain, the AI flags rather than bluffs — but flags are not foolproof.

**Compile fails with a schema error.**
→ Read the error message. It names the file and the missing/wrong field. Edit the source file (course.yaml or the lesson MDX) and re-run.

**Two lessons cover the same ground.**
→ Outline review failed to catch it. Cut one, redraft the other to cover both. Update `course.yaml` to remove the deleted lesson before recompiling.

**The course feels dry / clinical / generic.**
→ STYLE.md §2 voice examples are not landing. Pick three lessons that exemplify the voice problem and add them as anti-pattern examples in §2 for the next authoring pass.

---

## Read next

- The schema spec: [`content/SCHEMA.md`](../content/SCHEMA.md)
- The style guide: [`content/STYLE.md`](../content/STYLE.md)
- The brief template: [`content/briefs/_TEMPLATE.md`](../content/briefs/_TEMPLATE.md)
- The 50-course catalog: [`docs/internal/COURSE_CATALOG_PLAN.md`](./internal/COURSE_CATALOG_PLAN.md)
- The Wave 2 plan: [`docs/internal/WAVE_2_PUBLISHING_PIPELINE_PLAN.md`](./internal/WAVE_2_PUBLISHING_PIPELINE_PLAN.md)
- The master plan: [`docs/JIFUNZE_MASTER_PLAN.md`](./JIFUNZE_MASTER_PLAN.md)

End of authoring guide.
