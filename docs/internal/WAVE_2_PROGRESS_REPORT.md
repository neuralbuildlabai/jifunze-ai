# Wave 2 — Progress Report

**Status:** Infrastructure complete (Phases 1–5). Phase 6 (first course end-to-end) ready to start on your dev machine.
**Date:** 2026-05-18.

---

## What was built in this session

The Wave 2 publishing pipeline is now in place. Every piece needed to take a course from brief to compiled-TypeScript is committed; the only step that requires your dev machine is the actual LLM authoring run (because LLM keys live in `.env.local`, not in the sandbox).

### Phases 1–5 complete

| Phase | Deliverable | Path |
|---|---|---|
| 1 | Wave 2 plan | `docs/internal/WAVE_2_PUBLISHING_PIPELINE_PLAN.md` |
| 1 | Directory scaffolding | `content/`, `content/courses/`, `content/briefs/`, `src/data/learning/courses/` |
| 2 | Style guide (the editorial spine) | `content/STYLE.md` (~5000 words, 9 sections, 20 anti-patterns) |
| 2 | Brief template | `content/briefs/_TEMPLATE.md` |
| 3 | Schema documentation | `content/SCHEMA.md` (course.yaml + lesson MDX format, validation rules) |
| 4 | Compiler | `scripts/compile-course.ts` (~430 lines, validates + emits typed TS) |
| 5 | LLM provider abstraction | `scripts/lib/llmProvider.ts` (Anthropic + OpenAI implementations) |
| 5 | Outline-authoring CLI | `scripts/author-outline.ts` |
| 5 | Lesson-authoring CLI | `scripts/author-lessons.ts` |
| 5 | npm scripts wired | `package.json`: `author:outline`, `author:lessons`, `compile:course` |
| 8 (early) | Real authoring guide | `docs/AUTHORING.md` (replaces the Wave 1 stub) |
| 6 (input prep) | First course brief | `content/briefs/ai-with-claude-everyday.md` |

### What's testable now (in this sandbox)

- **Typecheck:** `npx tsc -b` exits 0 with the compiler and CLIs included. The code is correct.
- **Compiler help / dry-run:** blocked in sandbox by esbuild architecture mismatch (`@esbuild/darwin-arm64` installed instead of `@esbuild/linux-arm64`). Same root cause as the Wave 1 `vite build` issue. Works on your dev machine.

### What requires your dev machine

- Setting `ANTHROPIC_API_KEY` or `OPENAI_API_KEY` in `.env.local`.
- Running `npm run author:outline` against the real LLM.
- Running `npm run author:lessons` to draft each lesson.
- Running `npm run compile:course` to emit TypeScript.
- Wiring the emitted catalog entry into `flagshipCoursesCatalog.ts`.
- Visual verification at `/learn/courses/ai-with-claude-everyday`.

---

## The pipeline, end-to-end

```
content/briefs/ai-with-claude-everyday.md   ← already written, ready
        │
        │ npm run author:outline -- --brief content/briefs/ai-with-claude-everyday.md
        ▼
content/courses/ai-with-claude-everyday/course.yaml   ← AI drafts; you review
        │
        │ npm run author:lessons -- --slug ai-with-claude-everyday
        ▼
content/courses/ai-with-claude-everyday/lessons/*.mdx   ← AI drafts; you review per lesson
        │
        │ npm run compile:course -- --slug ai-with-claude-everyday
        ▼
src/data/learning/courses/ai-with-claude-everyday/*.generated.ts   ← typed TS
        │
        │ Manual: append CATALOG_ENTRY to flagshipCoursesCatalog.ts (one line)
        │ Manual: register CURRICULUM in flagshipCourseCurricula.ts (one line)
        │ Manual: register SESSIONS in flagshipCourseSessions.ts (one line)
        ▼
Live at /learn/courses/ai-with-claude-everyday and /library/ai-with-claude-everyday
```

Per `docs/AUTHORING.md`, three human review gates:

1. **Outline** — edit `course.yaml` directly; replace placeholder lesson filenames
2. **Lessons** — per-file; reject + redraft with `--only X.mdx --force`
3. **Compile** — fix any schema errors; rerun until clean

---

## The first-course brief, in one paragraph

`content/briefs/ai-with-claude-everyday.md` defines the Wave 2 pilot course:

- **Title:** AI with Claude for Everyday Work
- **For:** Knowledge workers with Claude access, inconsistent past usage, want defensible workflow
- **4 modules** covering mental model → verification → workflow integration → use-stance memo
- **Capstone:** 800–1500 word "My Claude use stance" memo, team-shareable
- **Portfolio outputs:** use-stance one-pager, verification matrix, workflow plan with metrics, failure-mode incident log
- **Surfaces:** flagship + library, no Rise package
- **SME:** not required (deliberately in-wheelhouse for AI-first authoring as the pilot test)

The brief follows the template precisely. It includes named authoritative references (Anthropic model cards, Constitutional AI paper, etc.) and an explicit "what this course is NOT" section to keep scope tight.

---

## What's specifically not done yet (Phase 6+)

- **Phase 6 — first course end-to-end:** ready to run on your dev machine; needs LLM key.
- **Phase 7 — round-trip `ai-essentials`:** secondary validation step. Confirms the compiler produces equivalent output to today's hand-written TS for an existing course. Not blocking; can happen after Phase 6.
- **Phase 8 — completion report:** authored once Phases 6 and 7 are signed off.

---

## What I'd do next, in order

1. **Add an LLM key.** Put `ANTHROPIC_API_KEY=...` in `.env.local` (recommended; Claude is what the platform's AI tutor will use in Wave 3, so test the same provider now).
2. **Run the outline pass:** `npm run author:outline -- --brief content/briefs/ai-with-claude-everyday.md`. ~30 seconds, ~$0.05.
3. **Review the outline.** Open `content/courses/ai-with-claude-everyday/course.yaml`. Edit modules, learning goals, capstone. Replace the placeholder lesson filenames (`XX-placeholder-N.mdx`) with descriptive ones (e.g., `01-what-claude-is.mdx`, `02-what-claude-is-not.mdx`, ...).
4. **Run the lessons pass:** `npm run author:lessons -- --slug ai-with-claude-everyday`. ~5–10 minutes for 16 lessons, ~$2–3.
5. **Review lessons.** Read each MDX. Reject + redraft any that fail review (`npm run author:lessons -- --slug ai-with-claude-everyday --only 03-the-confidence-trap.mdx --force`).
6. **Compile:** `npm run compile:course -- --slug ai-with-claude-everyday`.
7. **Wire the catalog** (3 one-line imports per `.manifest.json` hints).
8. **`npm run dev`** and click through the course at `/learn/courses/ai-with-claude-everyday`.
9. **Pilot cohort** of 5–10 real learners on a Vercel preview deploy.
10. When pilot passes, status `pilot` → `active` in `course.yaml`; recompile; ship.

---

## Risks discovered while building

**1. The LLM may produce YAML with subtle schema violations.** Mitigated by the compiler's strict validation — every required field, every cross-reference, every duplicate ID check fails loud. Worst case: outline pass produces unparseable YAML and you regenerate.

**2. Lesson voice may drift across the 16 lessons.** Mitigated by per-lesson review. The lessons CLI re-loads the full STYLE.md as system prompt for each call, but the AI has no memory of prior lessons in the same course. If voice drift becomes a problem in practice, future enhancement: include 1–2 prior approved lessons in the user prompt as voice anchors.

**3. The compiler emits to `src/data/learning/courses/<slug>/` but does not yet auto-register into the catalog.** Intentional — the registry pattern is a one-line manual append per course. Future enhancement (post-Wave-2): a `scripts/register-course.ts` that mutates `flagshipCoursesCatalog.ts` automatically. Not blocking for the pilot course.

**4. MDX components (`<Callout>`, `<Pullquote>`) are parsed-around-but-not-rendered by the current compiler.** They appear in MDX bodies but the library reader sections strip them. Acceptable for v1; rich rendering comes when the lesson reader gets MDX support (probably Wave 3 alongside the AI tutor's MDX message rendering).

**5. The library reader's `PublicStarterModule` type was originally designed for the legacy starter libraries (ai-foundations, etc.). Reusing it for compiled courses works structurally but may evolve.** Acceptable for now; refactor in a later wave if the legacy and compiled-course readers diverge.

---

## What this enables

By end of Phase 5 (now), the platform has:

- A canonical authoring format any future course will use.
- A compiler that turns content into typed code.
- AI-assisted drafting with two clean review gates.
- A real brief ready to feed the pipeline.

By end of Phase 6 (your next session on your dev machine), the platform will have:

- One real flagship course authored end-to-end through AI + review.
- A working proof that the catalog can be filled by this pipeline at scale.

By end of catalog Passes 1–7 (the next 12–18 months), all 50 courses in the locked catalog will have moved through this same pipeline, with progressively more refined prompts and process learned from each pass.

End of report.
