---
description: Verify that a course syllabus has coherent flow, connected modules, and a traceable skill arc
---

# Syllabus Continuity Check Workflow

Use this workflow to verify that a course's module sequence forms a coherent, progressive learning arc — not a set of isolated topics. Run this before shipping new modules, after rewriting a module mid-course, or when adding modules to an existing sequence.

**Input required:** A course slug or library family name. Read the curriculum file before starting.

---

## Step 1: Build the module arc map

Read the full module list for the target course from its curriculum file (`flagshipCourseCurricula.ts`, `flagshipCourseCurriculaExtended.ts`, or `flagshipCourseCurriculaExtended2.ts`).

Build a table:

```
| order | module_id | title | stage | summary (first 15 words) | explicit_prior_ref? |
```

`explicit_prior_ref?` = Does this module's summary, learningGoals, or session content explicitly name or build on a concept from a prior module? Mark Y or N.

A course with healthy continuity should have `Y` on every module after M01. Flag every `N`.

---

## Step 2: Read the module titles as a sequence

Read only the module titles in order, as a learner would see them. Ask:

1. **Does reading the titles tell a coherent story?** Could a learner infer why module N comes before module N+1? If any two modules feel interchangeable in position, flag the ambiguity.
2. **Does the arc have a visible turning point?** Healthy sequences usually shift from "what this is and why it matters" (foundations) to "how to do this under real pressure" (applied practice) to "how to defend this to someone skeptical" (professional execution). If the arc stays in the same register all the way through, flag it.
3. **Does the final module in each stage set up the next stage?** The last foundations module should leave the learner clearly ready for their first applied-practice task — not just summarize what they read.

---

## Step 3: Check revision checkpoint spacing

`revisionCheckpoint: true` and `recap: true` modules are formal consolidation points. Check:

- Is there at least one revision checkpoint per stage? A stage with five or more modules and no checkpoint is a continuity risk.
- Does each revision checkpoint reference learning goals from the 2–3 modules that preceded it? If the recap is only about the immediately preceding module, it is too narrow.
- Is the checkpoint placed *after* the learner has produced something, not before? Checkpoints should consolidate practice, not preview theory.

Output: List each revision checkpoint module with the IDs of the modules it should reference, and a flag if that reference is missing.

---

## Step 4: Check capstone integration

Read the capstone description. Verify:

1. **Does it require integration across stages?** A capstone that only tests the final stage's skills is not a true capstone — it is a final assignment. The capstone must visibly build on work from at least two stage levels.
2. **Does it require original analysis on the learner's own context?** "Fill in this template" is not a capstone. The learner must apply course concepts to a situation they actually own.
3. **Does it include a "what I still don't know" component?** Intellectual humility is a skill. The capstone should ask learners to name their remaining uncertainties explicitly.
4. **Are the deliverables falsifiable?** Each deliverable must be something a reviewer could evaluate as "strong" or "weak" — not just "present" or "absent."

Flag any capstone that fails two or more of these checks.

---

## Step 5: Check for concept orphaning

A concept is "orphaned" if it is introduced in one module but never revisited in practice, revision, or a later module. This is a continuity failure.

Read the `learningGoals` and `practiceActivities` fields across the full module list. For each key concept introduced in a foundations module, check:

- Is it tested (not just mentioned) in an applied-practice module?
- Is it stress-tested or defended in a professional-execution module?
- Is it integrated into the capstone?

If a concept appears in foundations but disappears from applied practice onward, flag it as orphaned.

---

## Step 6: Check cross-library connection for standalone courses

For standalone courses (in `standaloneCoursesSpecs.ts` or `standaloneCoursesSpecsWave2.ts`), verify that module summaries do not replicate what is already covered in a flagship course without adding new value.

Specifically:
- Standalone ChatGPT/Claude/Gemini courses must cover tool-specific application patterns — not re-teach generic AI literacy that belongs in `ai-essentials`.
- Standalone courses must name what they assume: "This course assumes you have basic prompting habits. It does not re-teach prompt anatomy."
- If a standalone course's first module duplicates an `ai-essentials` foundations module, flag the overlap and suggest that the standalone opens with the assumption explicit.

---

## Step 7: Produce the continuity report

```
## Continuity Check: [course name]
**Date**: [today]
**Modules checked**: [count]

### Arc Map
[table from Step 1]

### Title Sequence Verdict
[coherent / ambiguous / stalled — with specific module IDs flagged]

### Revision Checkpoint Coverage
[list of checkpoints with referenced module IDs and any gaps]

### Capstone Integration Verdict
[passes / fails — with specific gaps named]

### Orphaned Concepts
[list of concepts with the module where they're introduced and where they disappear]

### Cross-library Overlap (standalone only)
[any duplication with flagship content flagged]

### Recommended interventions (priority order)
[3–5 specific fixes, each naming the exact module ID and what needs to change]
```

The continuity report is the deliverable. Do not rewrite modules during this workflow — hand the report to a human for triage.
