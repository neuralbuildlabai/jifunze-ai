---
description: Audit a course or library family for generic writing, depth gaps, and missing structural elements
---

# Curriculum Audit Workflow

Use this workflow when you need to assess the quality of a course, module, or library before authorizing a rewrite or prioritizing editorial work.

**Scope:** One course slug, one library family, or one specific file. Do not audit the entire repo in one pass — audit one coherent unit at a time.

---

## Step 1: Identify the target

State the audit target explicitly:
- Course slug (e.g., `ai-essentials`, `leadership-and-teams`) OR
- Library family (e.g., `chatbots`, `networking`) OR
- Specific file (e.g., `flagshipSessionContentOverridesCompletion.ts`)

Read the relevant source files in `src/data/learning/` and `src/data/teaching/` before proceeding. Do not audit from memory.

---

## Step 2: Check for generic writing signals

Read every `summary`, `intro` body, `reflection_prompt`, and `learningGoals` field in the target. Flag any that match these patterns:

- **Template intros**: Phrases like "This lab is graded on reviewability — not vibes" or "Tie each move to evidence, stakeholder, or falsifier" appearing verbatim in more than one session block.
- **Cookie-cutter reflections**: "Where might speed tempt you to skip verification? Name one stop rule." — if this prompt appears unchanged across multiple modules, flag each instance.
- **Abstract outcomes**: Outcomes using "understand," "learn about," "be familiar with," or "summarize what X means." Flag and note the module ID.
- **Boilerplate module summaries**: Any summary that could apply to a different module in the same course with only the topic noun swapped.

Output a numbered list of flagged items with their module ID and the offending text.

---

## Step 3: Check structural completeness

For each module in the target, verify the following fields are present and non-empty:

**Flagship curriculum modules (`FlagshipCurriculumModule`):**
- [ ] `summary` — at least 25 words, domain-specific
- [ ] `learningGoals` — minimum 2, using active testable verbs
- [ ] `practiceActivities` — minimum 2, each producing a named artifact
- [ ] `expectedOutputs` — minimum 1
- [ ] `revisionCheckpoint` or `recap` present at least once per stage

**Teaching concepts (`TeachingConcept`):**
- [ ] `misconceptions[]` — minimum 2
- [ ] `workedExample` — includes a role, task, and observable outcome
- [ ] `revisionAnchor` — a single self-test sentence
- [ ] `goodUnderstandingMarkers[]` — behavioral signals, not restatements
- [ ] `weakUnderstandingMarkers[]` — observable wrong moves
- [ ] `kbAtomRole` — set (not undefined)

**Teaching labs (`TeachingLab`):**
- [ ] `scenario` — names a role, context, and stakes
- [ ] `whatGoodLooksLike[]` — specific enough two reviewers would agree
- [ ] `reviewCriteria[]` — specific enough two reviewers would agree
- [ ] `remediation[]` — names a habit or check, not "review the lesson"

Output a checklist per module/concept/lab with any missing fields marked.

---

## Step 4: Check stage progression integrity

For flagship courses, read the module list and their `stage` fields in order. Verify:

1. **Foundations → Applied Practice transition**: Is there at least one module in `applied_practice` that explicitly builds on a foundations concept? If the first `applied_practice` module could stand alone without the foundations modules, flag it.

2. **Applied Practice → Professional Execution transition**: Do `professional_execution` modules require the learner to defend, communicate, or stress-test — or just produce? If they only produce, flag as under-developed for the stage.

3. **No stage skipping**: Check that no topic jumps from `foundations` directly to `professional_execution` without an `applied_practice` step.

4. **Capstone integration**: Does the capstone description require integration across at least two stages? Flag if it only tests the final stage.

Output a stage-map table: `module_id | title | stage | connects_to_prior_module? | flag?`

---

## Step 5: Check for auto-generated scaffolding still in production

Search the target files for these known scaffolding patterns that must be replaced before a module is production-ready:

- `moduleSummary(` — auto-generated module summaries from `chatbotEverydayCurriculum.ts`
- `lessonOutcomes(` — auto-generated lesson outcomes from `chatbotEverydayCurriculum.ts`
- `// TODO: author` — placeholder outcomes needing replacement
- Worked example `example` fields containing only length instructions (e.g., `"Keep under ~200 words unless your reviewer explicitly asked for depth."`)
- `reflection_prompt` values containing `"Where might speed tempt you to skip verification? Name one stop rule."` (bulk-generated template)
- `intro` body values containing `"Treat outputs and tools as accountable artifacts—verification lanes before speed."` repeated verbatim across modules

For each match, note the file, key, and block ID.

---

## Step 6: Produce the audit report

Compile your findings into a structured report with these sections:

```
## Audit Report: [target name]
**Date**: [today]
**Files examined**: [list]

### Severity 1 — Bulk-generated content needing full replacement
[list each block ID and why]

### Severity 2 — Generic writing needing targeted rewrite
[list each module/outcome with the offending text]

### Severity 3 — Missing structural fields
[checklist output from Step 3]

### Severity 4 — Stage progression issues
[table from Step 4]

### Recommended priority order for rewriting
[ranked list of the 3–5 most important items to fix first, with rationale]
```

Do not make edits during an audit pass. The audit report is the deliverable. Hand it to a human for triage before any rewriting begins.
