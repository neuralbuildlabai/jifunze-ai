---
description: Rewrite a weak or generic module using Jifunze authoring standards
---

# Weak Module Rewrite Workflow

Use this workflow to rewrite a specific module that has been flagged as generic, structurally incomplete, or bulk-generated. **Do not use this workflow for broad course rewrites.** One module at a time.

Run the `/curriculum-audit` workflow first and obtain an audit report before starting a rewrite. Do not rewrite from memory or intuition alone.

---

## Step 1: Load context before writing anything

Read these files before touching a single string:

1. The module's parent course curriculum file (e.g., `flagshipCourseCurriculaExtended.ts`) — read the full module list to understand where this module sits in the arc.
2. The module immediately before it — to understand what concepts the learner already has.
3. The module immediately after it — to understand what the rewrite must set up.
4. The corresponding session content override file — to see the current learner-facing blocks.
5. Any `TeachingConcept` atoms in `src/data/teaching/teachingKnowledgeBase*.ts` that map to this module's topic.

Do not write until you can answer: *"What does this module assume the learner already knows, and what must it leave them capable of doing?"*

---

## Step 2: Rewrite the module spec first

Before touching session content, rewrite (or confirm) the module's spec fields in the curriculum file:

**`summary`** — must answer: "What new intellectual move does this module enable that the previous module did not?" Write as a single declarative sentence that names the specific skill delta. Do not use "explore," "learn about," or "understand."

**`learningGoals[]`** — minimum 2, maximum 4. Each must:
- Begin with an active, testable verb (classify, produce, defend, critique, compare, debug, draft)
- Name the specific thing being tested — not the topic category
- Be falsifiable: you could observe whether a learner has or has not achieved it

**`practiceActivities[]`** — minimum 2. Each must:
- Name a deliverable (not a process): "Draft X," "Annotate Y," "Rewrite Z" — not "Think about" or "Consider"
- Include at least one quality threshold: what makes a strong attempt vs. a weak one
- Connect to a real context the learner plausibly owns

**`expectedOutputs[]`** — minimum 1. Name the artifact, not the activity.

---

## Step 3: Rewrite session content blocks

For each session type in `flagshipSessionContentOverrides*.ts`, apply these rules:

### `intro` block
- `body` must name the specific intellectual problem this module addresses
- Must not be reusable across other modules without modification
- Do not open with: "This lab is graded on reviewability," "Treat outputs and tools as accountable artifacts," or any other boilerplate phrase
- End the intro with one sentence that tells the learner what the practice block will require them to produce

### `concept_explanation` block
- Must explain the concept in terms of what the learner will now be able to do differently — not just what the concept means
- Should name the most common wrong move a learner makes before grasping this concept

### `worked_example` block
- `body` must describe a concrete situation: name a role, a task, a constraint, and what a good outcome looks like
- `example` must be a real worked example — not a length instruction ("Keep under ~200 words")
- If you cannot name a specific realistic context, write the context first, then the example

### `reflection_prompt` block
- Must be specific to this module's domain
- Must not be the same as any reflection in the same course
- A useful test: swap this prompt into a different module — if it still makes sense, rewrite it

### `practice_task` block
- `bullets[]` must name specific artifacts, not process steps
- `prompt` must state what distinguishes a strong submission from a weak one

### `next_step` block
- Must name where the learner is going next and why the sequence matters at this point
- Do not use: "Ship a short artifact now — half a page beats a polished blank page" (boilerplate)

---

## Step 4: Check the rewrite against prior and next modules

After writing:

1. Read your new module alongside the prior module. Ask: *"Does my module explicitly pick up a thread the prior module established?"* If there is no connection, add one.
2. Read your new module alongside the next module. Ask: *"Does my module leave the learner in a state where the next module makes obvious sense?"* If not, add a `next_step` block that bridges them.
3. Read all `reflection_prompt` values in this course. Confirm no two are identical.
4. Read all `intro` body values in this course. Confirm no two begin with the same sentence.

---

## Step 5: Update any linked TeachingConcept atoms

If this module covers a concept that has an existing atom in `teachingKnowledgeBase*.ts`, verify the atom's fields are consistent with your rewrite:

- `misconceptions[]` — do they match the wrong moves your module addresses?
- `revisionAnchor` — does it test the same behavioral outcome your learningGoals target?
- `workedExample` — is it consistent with the worked example in your session content?

If inconsistencies exist, update the atom — the `TeachingConcept` is the source of truth for the concept; session content should mirror it, not contradict it.

---

## Step 6: Self-review gate

Before submitting the rewrite, run this checklist:

- [ ] No two reflection prompts in this course are identical
- [ ] No two intro bodies begin with the same sentence
- [ ] Every practice activity names a deliverable (not a process)
- [ ] The worked example names a role, task, constraint, and observable output
- [ ] The module summary answers "what new intellectual move does this enable?"
- [ ] At least one learning goal uses: classify, produce, defend, critique, compare, debug, or draft
- [ ] The next_step block names a specific destination, not generic encouragement

If any item fails, fix it before marking the rewrite complete.
