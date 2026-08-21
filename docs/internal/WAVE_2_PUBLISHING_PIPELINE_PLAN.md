# Wave 2 — Publishing Pipeline Plan

**Status:** Active. Wave 2 in progress.
**Date:** 2026-05-18.
**Authority:** This plan implements the Wave 2 scope defined in `docs/JIFUNZE_MASTER_PLAN.md` §6 Wave 2. Where this document differs from the master plan, the master plan wins.
**Goal:** Build the canonical authoring → compile → publish pipeline. Author one real flagship course end-to-end through it. Prove the loop.

---

## Locked decisions (Phase 0)

1. **Source-of-truth format.** Per-course directory at `content/courses/<slug>/` containing `course.yaml` (metadata + module structure) and `lessons/<NN>-<lesson-slug>.mdx` (one file per lesson). MDX is chosen because (a) it cleanly separates structured front-matter from prose, (b) it supports the future polymorphic lesson types via React-component-like blocks (`<MathLab>`, `<CloudLab>`, `<AITutorChat>` etc.), and (c) it is the format AI models produce most reliably.
2. **Compiler emits to `src/data/learning/courses/<slug>/`.** Files emitted are marked auto-generated and committed as artifacts. No build-time compilation step in the Vite build — deploys are deterministic without LLM calls.
3. **AI authoring is two-pass.** Outline pass (brief → `course.yaml`), then lesson pass (per-lesson MDX). Each pass goes through a human review gate before the next.
4. **LLM provider abstraction.** A pluggable provider with one implementation initially. Decision on which provider (Anthropic Claude vs OpenAI) deferred to first real authoring run — both have working API integrations available. The framework treats them as interchangeable.
5. **Server-side only for LLM keys.** Authoring CLIs run from the developer's machine using the local `.env` and never expose keys to the browser. Production deploys do not have authoring keys.
6. **No content goes through the build pipeline at runtime.** The compiler is run during development; emitted TS modules are committed; production builds consume those modules as static data.
7. **First course through the pipeline is #2 from the catalog: "AI with Claude for Everyday Work."** This is the greenfield test the master plan recommended — round-tripping the existing `ai-essentials` course is a *secondary* validation step, not the headline acceptance criterion. (Reversed from what the earlier review doc said; the master plan §6 Wave 2 explicitly prioritizes the new-course path.)
8. **No SME required for the pilot course.** #2 AI with Claude for Everyday Work is in-wheelhouse for AI-only authoring. SME courses start with the math/science wave (Pass 5+ per catalog plan).
9. **The compiler is the structural contract.** If a `course.yaml` is missing required fields, the compiler fails loudly with a specific error. No silent emissions.

---

## Phase sequence (8 phases)

### Phase 1 — Wave 2 plan and directory scaffolding ✓ (this document)

**Goal.** Working documents and directory layout exist before any code is written.

**Scope.**
- This plan document.
- `content/` directory tree:
  - `content/STYLE.md`
  - `content/SCHEMA.md`
  - `content/briefs/_TEMPLATE.md`
  - `content/courses/.gitkeep`
- `src/data/learning/courses/.gitkeep` (target for compiler emissions).

**Exit criteria.** All listed files exist; documented schema is internally consistent.

### Phase 2 — Style guide and brief template

**Goal.** Author the editorial spine that every AI authoring call relies on.

**Scope.**
- `content/STYLE.md` — voice, pedagogy rules, structural conventions, anti-patterns. ~2,000–4,000 words. Prepended verbatim to every authoring system prompt.
- `content/briefs/_TEMPLATE.md` — the brief template a human (or SME) fills in before kicking off authoring.

**Exit criteria.**
- A new contributor can read STYLE.md and produce voice-consistent draft prose.
- A non-engineer SME can fill in the brief template without reading any other doc.

### Phase 3 — Schema documentation

**Goal.** Document the canonical `course.yaml` and lesson MDX format authoritatively.

**Scope.**
- `content/SCHEMA.md` — field-by-field spec of course.yaml; lesson MDX front-matter spec; body convention.
- Example fragments embedded.

**Exit criteria.** Schema doc is sufficient for a human to hand-author a complete `course.yaml` plus a few MDX lessons without referencing the compiler source.

### Phase 4 — Compiler

**Goal.** A working compiler that round-trips structured content into TypeScript.

**Scope.**
- `scripts/compile-course.ts` — TypeScript CLI invoked as `npx tsx scripts/compile-course.ts --slug <slug>`.
- Reads `content/courses/<slug>/course.yaml` and `lessons/*.mdx`.
- Validates against the schema (fails loudly on missing required fields).
- Emits to `src/data/learning/courses/<slug>/`:
  - `curriculum.generated.ts` — typed flagship curriculum module list
  - `sessions.generated.ts` — typed flagship sessions
  - `reader.generated.ts` — typed library reader sections
  - `catalog.generated.ts` — typed catalog entry
  - `index.generated.ts` — re-export hub
  - `.manifest.json` — list of artifacts + catalog touch-points + route verification hints
- Top-of-file auto-generation header in every emitted TS file.
- Idempotent — running twice produces identical output.

**Exit criteria.**
- Compiler succeeds on a hand-authored sample `course.yaml` + MDX.
- Emitted TS files typecheck against the existing flagship type definitions.
- Emitted output is deterministic across runs.

### Phase 5 — Authoring CLI framework

**Goal.** Two CLIs that orchestrate LLM calls for outline and lesson drafting.

**Scope.**
- `scripts/lib/llmProvider.ts` — provider abstraction (`openai`, `anthropic`), reads keys from `.env`, exposes `complete(prompt, options)`.
- `scripts/author-outline.ts` — reads a brief from `content/briefs/<slug>.md`, calls the LLM with the brief + STYLE.md + SCHEMA.md as system prompt, writes a draft `content/courses/<slug>/course.yaml`.
- `scripts/author-lessons.ts` — reads `course.yaml`, iterates over modules and lessons, drafts MDX for each, writes to `content/courses/<slug>/lessons/`. Skips lessons that already exist unless `--force` is passed.
- npm scripts in `package.json`: `author:outline`, `author:lessons`, `compile:course`.
- Diff-aware: if a lesson file exists and the AI is re-running, surface the diff before overwriting (or refuse unless `--force`).

**Exit criteria.**
- `npm run author:outline -- --brief content/briefs/<slug>.md` writes a valid (compiler-passing) `course.yaml`.
- `npm run author:lessons -- --slug <slug>` writes MDX files for all declared lessons.
- LLM keys are loaded from `.env` and never logged.

### Phase 6 — First course end-to-end

**Goal.** Drive the pipeline through one real course from brief to published.

**Scope.**
- `content/briefs/ai-with-claude-everyday.md` — the actual brief (human-authored).
- Run outline pass; review and edit `course.yaml`.
- Run lessons pass; review each MDX file.
- Run `compile:course --slug ai-with-claude-everyday`.
- Wire the emitted catalog entry into `src/data/learning/flagshipCoursesCatalog.ts` (one-line registry append, or registry-pattern auto-pickup).
- Confirm the course appears at `/learn/courses/ai-with-claude-everyday` and `/library/ai-with-claude-everyday`.

**Exit criteria.**
- Course is browsable end-to-end as a learner.
- Capstone submission works against the new course.
- No regressions in other courses.

### Phase 7 — Round-trip an existing course

**Goal.** Validate the pipeline against an already-shipped course.

**Scope.**
- Pick `ai-essentials` (the only fully-authored flagship at present).
- Author `content/courses/ai-essentials/course.yaml` and lessons MDX by transcribing the existing TS data.
- Compile and confirm output matches (or improves on) the current hand-written TS.
- If matched, swap to the compiled output and delete the hand-written legacy.

**Exit criteria.**
- Compiled `ai-essentials` produces equivalent learner experience.
- Legacy hand-written TS for `ai-essentials` is deleted.

### Phase 8 — Documentation and review

**Goal.** AUTHORING.md is the source of truth for authors.

**Scope.**
- Replace `docs/AUTHORING.md` stub with the real document:
  - How to write a brief.
  - How to run the outline pass and review its output.
  - How to run the lesson pass and review per-lesson.
  - How to run the compiler and interpret errors.
  - How to wire a new course into the catalog.
- Update master plan §6 Wave 2 with the actual file paths.
- Wave 2 completion report at `docs/internal/WAVE_2_COMPLETION_REPORT.md`.

**Exit criteria.**
- AUTHORING.md is sufficient for an author to take a brief from idea to live course without asking an engineer.

---

## Risks

| Risk | Severity | Mitigation |
|---|---|---|
| AI-drafted lessons drift in tone across courses | High (long-term) | STYLE.md is rigorously authored with explicit voice examples and anti-patterns; refined after every course |
| Compiler emits TS that doesn't typecheck against existing flagship types | High (Wave 2) | Test against `ai-essentials` round-trip; iterate emission code until match |
| LLM provider rate limits / costs | Medium | Per-call logging; daily token caps; provider abstraction allows switching |
| Lesson MDX with React-component-like blocks doesn't render in the existing reader | Medium | First course is reading-only; lab/tutor blocks added in Wave 3/4 with their own renderers |
| Catalog wiring introduces duplicates or breaks existing flagship grid | Medium | Registry pattern; compiler manifest verifies route exists |

---

## Out of scope (deferred)

- Authoring more than one new course (catalog Pass 1 through Pass 7 spans the entire Wave 2 calendar — covered by the catalog plan's sequencing, not by this Wave 2 plan).
- AI tutor (Wave 3).
- Math lab (Wave 4).
- Cloud lab (Wave 5).
- Multi-tenant organizations (Wave 6).
- The actual content of all 50 courses — Wave 2 ships the pipeline + one course; catalog Pass 1–7 produces the rest.

---

## Calendar estimate

| Phase | Time |
|---|---|
| 1 — Plan + scaffolding | 1 hour |
| 2 — Style + brief template | 2–4 hours |
| 3 — Schema doc | 1–2 hours |
| 4 — Compiler | 4–8 hours |
| 5 — Authoring CLIs | 3–6 hours |
| 6 — First course end-to-end | 8–16 hours (authoring + review) |
| 7 — Round-trip ai-essentials | 4–8 hours |
| 8 — Docs + report | 2 hours |

**Total: ~25–47 hours** of focused engineering + authoring time. At part-time pace (10 hours/week), 3–5 weeks of calendar time.

End of plan.
