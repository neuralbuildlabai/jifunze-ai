# Module 3: Prompts as Control — Part B

*Part B continues directly from Part A. It contains the assessment, artifact, completion evidence, revision guidance, transition, and platform-mapping notes. The core lesson, worked examples, practice activities, pause-and-check, and knowledge-to-output task are in Part A and are not repeated here.*

## Checkpoint quiz

Eight questions. Pass threshold: at least 6 of 8 questions correct. Use a paper notebook or a separate file. Do not look back at Part A while answering. After you finish, mark yourself against the answer key in the next section.

1. *(Multiple choice)* Which of the following best describes the *Task* element of a T-C-C-F-A prompt?
   a. The background information the AI needs about your situation.
   b. The verb that names what you want the AI to actually produce.
   c. The shape the output should take, such as a table or a bulleted list.
   d. The reader the output is written for.

2. *(Multiple choice)* Why do vague prompts usually produce vague output?
   a. AI tools are not capable of producing specific writing.
   b. The AI deliberately withholds detail until the user pays for a higher tier.
   c. When the prompt does not specify something, the AI fills the gap with its most common statistical default.
   d. Vague prompts confuse the AI's grammar processing, which lowers the quality of every sentence.

3. *(Scenario)* A learner writes the prompt: *"Write a message to my team about the new working hours."* The AI produces a polished, mid-formal memo, but the learner says it does not sound like anything they would actually send. Which T-C-C-F-A element is most clearly missing, and what one piece of information would do the most to fix it? Answer in two or three sentences.

4. *(Scenario)* A learner writes the prompt: *"Summarize this report so I can use it tomorrow."* The AI returns a fluent four-paragraph summary. The learner then has to spend twenty minutes reshaping it into a slide outline for a meeting. Which T-C-C-F-A element was missing, and what specific change to the prompt would have prevented the rework? Answer in two or three sentences.

5. *(Short answer)* In your own words, explain *one* situation where adding more detail to a prompt clearly helps the output, and *one* situation where adding more detail starts to clutter the prompt and make the output worse. Two to four sentences total.

6. *(Short answer)* Define *Constraints* in one sentence, then give one example of a useful constraint and one example of a constraint that would be decoration rather than control. Explain in one short sentence why your decoration example is decoration.

7. *(Application — rewrite)* Rewrite the following weak prompt into a strong T-C-C-F-A prompt. Mark each element you added by writing **[T]**, **[C]**, **[C]**, **[F]**, or **[A]** in line where you added it.
   *Weak prompt:* *"Write a message to a customer about a delay."*
   You may invent realistic details (your business, the customer, the order, the delay reason, the channel). Aim for a single prompt of roughly 80 to 130 words.

8. *(Application — diagnose)* Read the prompt below and answer the two questions that follow.
   *Prompt:* *"Write a short, professional, friendly, casual but not too casual, formal-yet-warm email to my colleagues about the team lunch on Friday. Make it positive, but not too excited, with a clear call to action, but not pushy, and a polite closing. Use bullet points but also write it in paragraphs. Mention the venue, the time, the menu, the dress code, the parking situation, the dietary options, the RSVP process, and the after-lunch plan. Keep it under 80 words."*
   a. Name two specific reasons this prompt is over-stuffed.
   b. Suggest two changes that would reduce the clutter without losing the useful content.

## Answer key with explanations

1. **b.** Task is the verb — the action the AI must perform (draft, summarize, rewrite, compare, explain). (a) describes Context. (c) describes Format. (d) describes Audience. The most common failure mode in beginner prompts is a missing or hidden verb, which is why Task is taught first.

2. **c.** AI fills in unspecified details with the most common pattern from its training data — the most common audience, the most common phrasing, the most common length. The output then feels generic because it *is* generic. (a) is wrong: AI can produce highly specific writing when given enough to work with. (b) is wrong and reflects a marketing-pricing misconception, not a technical one. (d) is wrong: vague prompts do not break grammar; they remove the cues the AI needs to be specific.

3. **Audience.** Strong answers identify Audience as the missing element and propose adding a specific reader profile — for example, *"my five-person editorial team, who already know about the policy change and just need the practical effect on their schedule starting Monday."* A weaker answer would only say "more detail" without naming Audience or explaining what the AI was defaulting to (mid-formal, mid-Western reader). A learner who answers *Context* is partially right and should be marked as half-credit if they name a reader-related context detail; a learner who answers *Constraints* without mentioning the reader has missed the point of the question.

4. **Format.** Strong answers identify Format as the missing element and rewrite the request to name the next step — for example, *"Summarize this report as a six-slide outline I can paste into a deck for tomorrow's 15-minute meeting. One slide title and three sub-bullets per slide."* The key insight is that the next step (a meeting presentation) was knowable in advance, and naming it inside Format would have produced an output already shaped for the work. A learner who answers *Task* is partially right because *summarize* is broad; accept it if they explicitly point to the missing output shape.

5. *More detail helps* when the additional detail closes a real gap the AI was filling with a default that does not fit your situation — for example, naming the reader, naming the channel, or naming the next step. *More detail clutters* when the additional detail (a) repeats information the AI already has, (b) adds constraints that contradict each other, such as "warm but cold" or "short but comprehensive," or (c) names a format and a counter-format in the same prompt, such as "use bullets but also write it in paragraphs." Strong answers will name the gap-closing test from Part A: if the AI's draft would shift when you add a piece of detail, it belonged in the prompt; if not, it is noise.

6. *Constraints are the rules the output must respect — the do-this and do-not-do-that layer of the prompt.* A useful example: *under 120 words, no exclamation marks, no admission of legal fault*. A decoration example: *be helpful and clear* — this is decoration because the AI was already going to attempt that, and the constraint does not change any specific behaviour the learner could check. The marker should look for whether the learner can articulate the underlying test: a constraint earns its place only if you can predict what the output will *not* contain.

7. *(Application — rewrite)* A strong rewrite contains all five T-C-C-F-A elements and is recognisable as a real situation, not a textbook example. Use the criteria below to mark.
   - **[T] Task** is a specific verb tied to a specific artifact, not a topic. *"Draft a single short message…"* passes; *"Write something about the delay…"* fails.
   - **[C] Context** names at least three of: who the sender is, who the customer is, the relationship, what was ordered, when it was promised, what went wrong. Generic phrases like *"a customer"* fail; named realistic details pass.
   - **[C] Constraints** include at least two checkable rules — length limit, tone rule, banned phrases, no over-promising, no legal admission. *"Be polite"* alone fails; *"under 90 words, no 'Dear Valued Customer'"* passes.
   - **[F] Format** names the channel and shape — a single WhatsApp message, an email with subject line, a short SMS. *"A message"* alone fails.
   - **[A] Audience** names the recipient with enough specificity that the AI cannot default to a generic mid-Western reader — for example, *"a recurring small-business customer in Nairobi who prefers WhatsApp and uses straightforward Kenyan English."*
   A passing rewrite hits all five elements with at least one checkable detail per element. A strong rewrite also includes a specific make-good or next step (free delivery, new pickup time, refund offer) instead of vague reassurance.

8. *(Application — diagnose)*
   a. Strong answers point to two distinct sources of clutter, such as: (i) the tone constraints contradict each other (*professional, friendly, casual but not too casual, formal-yet-warm* — these cancel out and the AI cannot satisfy all of them at once); (ii) the format is double-specified and contradictory (*"use bullet points but also write it in paragraphs"*); (iii) the content list is too long for the stated 80-word limit, which forces the AI to either skip items or shrink each one to a single phrase. Any two of these earn full marks.
   b. Strong answers propose targeted edits — for example: *"Pick one tone direction (warm and professional) and delete the other tone words. Pick one format (a short paragraph followed by three bullets) and delete the contradictory instruction."* Or: *"Cut the content list to the three items the team actually needs to act on (time, venue, RSVP) and move the rest to a follow-up message."* The marker should look for whether the learner is removing real noise rather than just shortening the prompt at random.

A learner who scores six or more out of eight has met the pass bar (at least 6 of 8). A learner who scores four or five should review specific Part A sub-sections — the Revision guidance section below names which one matches each weakness.

## Portfolio artifact

**Title:** *Before/After Prompt Rewrite + Reusable Prompt Contract*
**Filename:** `Module03_Prompt_Rewrite_[YourName].pdf` or `Module03_Prompt_Rewrite_[YourName].docx`
**Length:** Two to four pages.

The artifact has seven parts in this order:

1. **Original weak prompt.** Paste in the actual prompt you would have written before this module for one task you do in real life. Two to four sentences.

2. **Original output, or the expected failure mode.** Paste in the AI output the weak prompt produced. If you have not used AI for this task before, write a short paragraph describing the *expected* failure mode — what kind of generic, off-tone, off-audience, or off-format output you would expect to get. Be specific about which T-C-C-F-A defaults the AI would fall back on.

3. **Improved prompt — Version 1.** Rewrite the prompt with at least three T-C-C-F-A elements explicitly strengthened. Mark each strengthened element in line with **[T]**, **[C]**, **[C]**, **[F]**, or **[A]**. Below the prompt, write a two- to three-sentence note named *T-C-C-F-A improvements in this version* that lists which elements you strengthened and what default behaviour each one was preventing. Run the prompt in your AI tool and paste the output.

4. **Improved prompt — Version 2.** Rewrite the prompt a second time, strengthening at least one *different* T-C-C-F-A element than Version 1 — or applying the same elements differently (a different audience description, a tighter constraint, a different format). Mark and label as in Version 1. Run it in your AI tool and paste the output.

5. **Final selected prompt.** Choose the version that produced the most usable output for the real task. Write one sentence explaining why it won — for example, *"Version 2 won because the WhatsApp format constraint produced something I could send without rewriting, while Version 1 still read like an email."*

6. **Reusable prompt contract template.** Build a short template you could reuse next time you do this task or a similar one. Use clearly labelled slots for the T-C-C-F-A elements you found important — not necessarily all five. Mark each slot as *task-specific* (changes every time) or *stable default* (carries over from one use to the next). Keep the template to roughly half a page. The template is the asset that makes this artifact reusable, so write it as if you are writing instructions to your future self.

7. **Reflection.** Write 100 to 150 words covering: which T-C-C-F-A element made the biggest difference for this task and why; one place you noticed the AI defaulting to something generic; and one thing you would change about your prompt next time even if the output already looks acceptable. The reflection is part of the artifact, not optional.

Save the artifact to your portfolio folder with the filename above. You will need it again in Modules 4, 5, 15, and 16.

## Capstone-save reminder

This artifact is one of the most-reused pieces of work in the course. Save it where you can find it.

**Module 4 — Engineered Prompts.** Module 4 introduces the deeper R-T-C-C-O-R model (Role, Task, Context, Constraints, Output design, Review cues). You will take the *final selected prompt* from this artifact and re-engineer it by adding a Role line, an Output design specification, and explicit Review cues. The before/after pair from this module becomes the *before* state for Module 4's worked engineering pass.

**Module 5 — Iteration and the prompt version log.** Module 5 teaches prompt iteration as a tracked workflow. Your two improved versions plus the final selected prompt become the first three entries in your prompt version log: V1, V2, V3 with notes on what changed between each version and what improved in the output. The reflection paragraph becomes the seed for the *what I learned* column of that log.

**Module 15 — Personal prompt pack.** Module 15 is where you assemble a small library of prompt templates you reuse across roles, tasks, and tools. The *reusable prompt contract template* from this artifact becomes one of the first entries in that pack. Learners who write the contract section seriously in this module typically arrive at Module 15 with two or three additional templates already drafted from the practice activities — those count too.

**Module 16 — Final capstone workflow.** Module 16 asks you to build an end-to-end AI-assisted workflow for one real task you do. The prompt contract template from this module is the *prompt layer* of that workflow. The capstone judges, in part, whether your prompts are controlled enough to produce reliable output without supervision; the work you do in this module is the foundation for that judgment.

If you skip the artifact or save a thin version of it, four later modules become harder. The strongest learners treat this artifact as a working draft that they will keep editing, not a one-time submission.

## Module completion evidence

The following outputs together prove that you have completed Module 3 meaningfully. Keep them in your portfolio folder.

- The 8-question checkpoint quiz, completed with at least 6 of 8 correct.
- Practice activity 1 submitted as a table — four weak prompts, three labelled improvements per prompt, and the predicted output change for each. Twelve labelled improvements in total.
- Practice activity 2 submitted as two short paragraphs — one per prompt-output pair — naming the T-C-C-F-A element that changed and how it changed the output. Plus the one-sentence answer to the Pair B reflection question.
- Practice activity 3 submitted as two AI outputs (no-context and full-context) plus a one-paragraph analysis of which version you would actually send and why.
- Practice activity 4 submitted as three rewritten prompts, each with at least three constraints and a one-sentence rationale per constraint.
- The Pause-and-check questions answered honestly in your working notes (not graded, but required for completion).
- The portfolio artifact saved as `Module03_Prompt_Rewrite_[YourName].pdf` or `.docx`, containing all seven required parts.

A learner with all of the above has finished Module 3 at the expected depth. A learner missing the artifact or two or more practice activities has not.

## Revision guidance

If you scored below 6 of 8 on the checkpoint, or if any of the situations below describe you, return to the named section before moving on.

**Your prompt is still vague after rewriting.** Re-read the *Task* sub-section of the core lesson in Part A. The most common cause of a still-vague prompt is a missing or hidden verb. Apply the test from that sub-section: *"If I read my prompt and ask 'did the AI do that, yes or no?', is the answer clear?"* If the answer is *kind of* or *I'm not sure*, the verb is too broad. Rewrite the Task line first; the rest of the prompt usually tightens once the verb is specific.

**You cannot explain which T-C-C-F-A element you improved.** Re-read whichever T-C-C-F-A sub-section you are weakest on, then redo Practice activity 1 — but this time, before writing each improvement, write the element label first (**[T]**, **[C]**, **[C]**, **[F]**, **[A]**) and then the improvement underneath it. Forcing yourself to label first prevents the common failure of *I made it better* without being able to say *how*.

**Your AI output does not change after you rewrite the prompt.** Two likely causes. First, the rewrite may have added words without adding control — extra adjectives, polite framing, or filler instructions that do not change any specific behaviour. Re-read the note on clutter at the end of the *Audience* sub-section in Part A. Second, the rewrite may have strengthened an element the AI was not actually defaulting on. Try strengthening a different element. If you added Constraints and nothing changed, try strengthening Audience instead, or naming the next step inside Format.

**You added many constraints and the prompt is now cluttered or contradictory.** Re-read the closing paragraph of the *Constraints* sub-section, the closing note of the core lesson on clutter, and Practice activity 4's self-check: *if removing one of your constraints would not change the output, the constraint was decoration, not control.* Apply that test to every constraint in your prompt, one by one. Delete the constraints that do not pass it. A clean prompt with three sharp constraints almost always beats a cluttered prompt with eight blunt ones.

**Your portfolio artifact reads like a textbook exercise rather than a real task.** Choose a different task. The artifact only does its later-module job (Modules 4, 5, 15, 16) if it was built from a task you actually do — not a task you imagined for the assignment. If you cannot think of a real task, look at the last week of your messages, emails, or work notes for the kind of writing you do most often.

## Transition to the next module

Module 3 introduced the prompt as the control surface. Module 4 takes that surface and engineers it deliberately — adding role, output design, and review cues to the T-C-C-F-A foundation. The five-element model you have been practising in this module is the floor for what comes next, not the ceiling. In Module 4, the prompt stops being something you write once and starts being something you design, version, and stress-test like any other piece of working software.

## Notes for Cursor mapping

This section is for the platform team mapping Module 3 into Cursor. It is not part of the learner-facing module.

**Suggested module id:** `ae-m03`

**Suggested session and block breakdown.** Three sessions, sized for a 2- to 2.5-hour learner workload.

- *Session 1 — Prompts as a control surface (≈ 45 minutes).* Overview block, then the core lesson sub-sections *Task*, *Context*, and *Constraints* with their inline mini-examples. End with worked examples 1 and 2 (late-assignment email and lesson summary versus revision-bullet-plus-quiz). One mid-session reflection block.
- *Session 2 — Format, Audience, and the clutter problem (≈ 45 minutes).* Core lesson sub-sections *Format* and *Audience* plus the clutter note. Worked examples 3 and 4 (Kenyan WhatsApp customer-delay message and performance-review evidence boundaries). End with the Pause-and-check block.
- *Session 3 — Apply, assess, and produce (≈ 60 minutes).* Practice activities 1 through 4, the knowledge-to-output task, the 8-question checkpoint quiz, and the portfolio artifact upload.

**Likely content block types** (mapped to the platform's standard block library):

- *Overview / objectives* — the *Module purpose* and *Learner outcomes* sections from Part A.
- *Concept* — the five T-C-C-F-A sub-sections of the core lesson, each rendered as one concept block with the inline mini-example included.
- *Guided example* — each of the four worked examples rendered as a single guided-example block with collapsible *weak prompt → output → analysis → strong prompt → output* substructure.
- *Practice* — one practice block per practice activity (four total), each pre-loaded with the supplied items so the learner does not have to leave the platform to begin.
- *Reflection* — the Pause-and-check block, plus a smaller mid-Session-1 reflection.
- *Checkpoint* — the 8-question quiz.
- *Artifact upload* — the portfolio artifact, with the filename pattern enforced by the upload widget.
- *Remediation* — the Revision guidance section, mapped to deep-link buttons that jump back to the named Part A sub-sections.

**Quiz mapping notes.** Eight questions, four formats, two of each. Two are machine-checkable multiple choice (Q1, Q2) and can be scored automatically. The remaining six (Q3 through Q8) are rubric-checkable: each has a model answer plus criteria in the answer key. The platform should render Q5, Q6, Q7, and Q8 as text-area inputs with a learner-side self-assessment rubric (collapsible) below each. The pass rule means the learner must mark themselves as correct on at least six of eight using the supplied criteria. Q7 (the customer-delay rewrite) is the most rubric-heavy and benefits from a side-by-side display of the learner's rewrite and the five element-checks from the answer key.

**Portfolio artifact mapping notes.** Upload widget should accept `.pdf` and `.docx` only. Filename must match the pattern `Module03_Prompt_Rewrite_*.{pdf,docx}` — enforce on upload. The widget should expose all seven required parts as a checklist the learner ticks before submission, so partial uploads are caught at the point of submission rather than at the start of Module 4. Tag the artifact in storage as `feeds:m04, feeds:m05, feeds:m15, feeds:m16` so later modules can surface it automatically when needed.

**Special UI needs.**

- Worked examples 1, 2, 3, and 4 each contain weak-prompt, AI-output, analysis, strong-prompt, and new-output sub-blocks. A side-by-side layout (weak on the left, strong on the right) is more useful than a stacked layout for these examples and should be the default rendering when screen width allows. On mobile, fall back to a stacked layout with collapsible sections.
- Practice activity 2 (output comparison challenge) needs a paired-block layout for the two prompt-output pairs.
- The Pause-and-check questions and the Revision guidance items should each have a *jump back to relevant section* link, not a generic *review module* link.
- The portfolio artifact upload should display the seven-part checklist next to the upload control, not after submission.

**How Part A and Part B should be combined into `Jifunze_Course1_Module_03_Improved.md`.**

Part A and Part B are the same module, split into two files only for authoring convenience. To produce the final deliverable file `Jifunze_Course1_Module_03_Improved.md`, concatenate them in this order, removing the Part B title line so the module reads as one continuous document:

1. From Part A, take everything from `# Module 3: Prompts as Control` through the end of the *Knowledge-to-output task* section.
2. From Part B, take everything from `## Checkpoint quiz` through the end of `## Notes for Cursor mapping`.
3. Drop the Part B header line (`# Module 3: Prompts as Control — Part B`) and the italic note immediately under it, since they exist only to orient the Part B file as a standalone fragment.
4. Verify that the final concatenated file has exactly one `# Module 3:` heading, exactly sixteen `##` section headings in the order specified by the Module 3 handoff document, and no duplicate sub-sections.

Once concatenated and verified, the result is the canonical Module 3 file and supersedes both part files. The two part files can be archived but should not be deleted, since they are useful as authoring history.
