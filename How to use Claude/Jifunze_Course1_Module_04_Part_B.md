# Module 4: Prompt Engineering — Structure, Constraints, and Output Design — Part B

*Part B continues directly from Part A. It contains the assessment, artifact, completion evidence, revision guidance, transition, and platform-mapping notes. The core lesson, worked examples, practice activity materials, pause-and-check, and knowledge-to-output task are in Part A and are not repeated here.*

## Checkpoint quiz

Eight questions. Pass threshold: at least 6 of 8 questions correct. Use a paper notebook or a separate file. Do not look back at Part A while answering. After you finish, mark yourself against the answer key in the next section.

1. *(Multiple choice)* Module 4 extends Module 3's T-C-C-F-A model into the R-T-C-C-O-R model. Which two elements are genuinely new in Module 4?
   a. Task and Context.
   b. Role and Review cue.
   c. Constraints and Output format.
   d. Audience and Format.

2. *(Multiple choice)* Which of the following best describes the *Review cue* element of an R-T-C-C-O-R prompt?
   a. A line at the top of the prompt naming the AI's perspective and area of expertise.
   b. The shape and length of the artifact the AI must produce.
   c. An instruction telling the AI what to flag, refuse, or leave to a human, rather than producing confident filler.
   d. A polite closing line asking the AI to double-check spelling and grammar.

3. *(Scenario — Role)* A learner adds the Role line *"Be a helpful expert"* to the top of every prompt and notices that the output looks roughly the same as it did before the Role line was added. Explain in two or three sentences why this Role line is doing no real work, and rewrite it into a Role line that would actually change the output for a task you do at work, in study, or in daily life.

4. *(Scenario — Output format)* A learner asks the AI to *"summarize this 10-page vendor comparison report"* and gets back a fluent four-paragraph summary. They then have to spend half an hour reshaping it into something they can actually use to decide between three vendors. Which Output format would have fit the next step better, and what specific Output format line would you have written instead? Answer in two or three sentences.

5. *(Short answer — when detail helps versus clutters)* In your own words, name *one* situation in an engineered prompt where adding detail clearly improves the output, and *one* situation where adding detail starts to clutter the prompt and make the output worse. Two to four sentences total. Use the test from Part A in your explanation.

6. *(Short answer — Review cue versus Constraints)* Explain in two or three sentences the difference between a *Constraint* and a *Review cue*. Then write one example of each for a task where the AI output will be sent to a customer.

7. *(Application — rewrite)* Rewrite the following weak prompt into a full engineered R-T-C-C-O-R prompt. Label every element by writing **[Role]**, **[Task]**, **[Context]**, **[Constraints]**, **[Output format]**, and **[Review cue]** in line. You may invent realistic details (your business or team, the supplier, the order, the issue, the channel). Aim for a single labelled prompt of roughly 120 to 200 words.
   *Weak prompt:* *"Write a follow-up message to a supplier who promised delivery on Monday and has gone quiet."*

8. *(Application — diagnose and fix clutter)* Read the prompt below and answer the two questions that follow.
   *Prompt:* *"You are a brilliant, world-class, professional, friendly, helpful, casual but not too casual customer service expert. Write a clear, concise, comprehensive, short, detailed message to a customer about their late order. Be warm, be firm, be apologetic, be confident, be professional. Use bullet points but also paragraphs. Mention the original delivery date, the new delivery date, the reason for the delay, the compensation, the apology, the next steps, the contact information, the social media handles, the loyalty programme, and our values. Keep it under 60 words. Do not invent any specifics."*
   a. Name three specific reasons this prompt is over-engineered to the point of becoming clutter. Tie each reason to a named pattern from Part A — *contradictory tone*, *double-specified format*, *decoration constraints*, or *content list larger than the word limit allows*.
   b. Suggest two changes that would reduce the clutter without losing the useful content the prompt is trying to deliver. Each change should remove a real source of clutter rather than just shorten the prompt at random.

## Answer key with explanations

1. **b.** Role and Review cue are the two new elements in Module 4. Task, Context, and Constraints carry forward from Module 3 with very little change. Output format replaces and deepens what Module 3 called Format. Audience does not appear as a separate slot in Module 4 — Part A folds it into Context, because in real engineered prompts the reader is part of the situation. Learners who answer (c) have confused *deepened* (Output format) with *new*. Learners who answer (d) have not noticed that Audience moved into Context rather than disappearing.

2. **c.** A Review cue tells the AI what to flag rather than fill in, what to list as an assumption, or what to refuse to complete safely. It is the line that prevents the most expensive AI failure: confident output that looks correct but contains invented specifics. (a) describes Role. (b) describes Output format. (d) is a small surface instruction that does not address the safety problem the Review cue exists to solve.

3. **The Role line *"Be a helpful expert"* does no real work because the AI was already going to attempt to be helpful and to sound expert.** A Role line earns its place only if you can predict what the output will *not* sound like once the Role is in place. Strong answers will rewrite the line so that it names a function and at least one quality that matters for the task — for example, *"You are a careful payroll accountant who has handled disputes with KRA before, never invents numbers, and prefers plain English over technical jargon"* for a payroll task, or *"You are an experienced primary-school teacher in Kenya who writes for parents who left school after Form Four"* for a parent-communication task. A weaker answer rewrites the Role line in a way that is still generic — *"Be a really good helpful expert"* — and does not add a function or a quality that changes the output. Half-credit for an answer that names the diagnosis correctly but cannot produce a strong rewrite.

4. **The next step was a decision between three vendors, so the right Output format is a *table*, not a summary.** A strong answer rewrites the Output format line as something close to: *"A table with five columns — Vendor, Price in KES, Delivery time, Risk or concern, Recommended for. One row per vendor. Below the table, one short paragraph naming the vendor I should pick and the single biggest reason."* The key insight is that the next step (a three-way decision) was knowable in advance, and a table fits comparison work more cleanly than prose. Half-credit for an answer that identifies *table* as the missing format but does not name the columns; the column choice is what makes the table actually useful.

5. *More detail helps* when the additional detail closes a real gap the AI was filling with a default that does not fit your situation — naming the reader, the channel, the next step, an evidence boundary, or a missing edge case. *More detail clutters* when the additional detail (a) repeats information the AI already has, (b) stacks contradictory tone instructions such as *casual-but-formal* or *short-but-comprehensive*, (c) double-specifies a format such as *bullets but also paragraphs*, or (d) decorates the prompt with *be helpful, be clear, be useful* lines that do not change any specific behaviour. A strong answer will name the test from Part A: *for each clause, what default behaviour is this clause preventing?* If the answer is clear, the clause earns its place; if not, cut it.

6. *A Constraint is a rule the output must respect — length, tone, banned phrases, content boundaries.* It applies to *what the AI does*. *A Review cue is an instruction telling the AI what to flag, refuse, or leave to a human, rather than producing confident filler.* It applies to *how the AI reports the limits of its own work.* For a customer-message task, a strong Constraint example is *"under 120 words, no 'Dear Valued Customer,' do not promise a refund."* A strong Review cue example is *"If any required detail (the customer's order number, the date of delay, the agreed cut-off) is not in the supplied notes, mark that section as [evidence gap — to confirm] rather than filling it in."* Marker should look for whether the learner can articulate the underlying difference: Constraints stop the AI from drifting; Review cues stop the AI from sounding more confident than it should.

7. *(Application — rewrite)* A passing rewrite contains all six R-T-C-C-O-R elements and is recognisable as a real situation, not a textbook example. Use the criteria below.
   - **[Role]** names a function and at least one quality. *"You are a careful operations lead at a small business who follows up firmly without burning supplier relationships"* passes; *"You are a helpful expert"* fails.
   - **[Task]** is a specific verb tied to a specific artifact. *"Draft a single short follow-up message…"* passes; *"Help me follow up…"* fails.
   - **[Context]** names at least four of: who the sender is, who the supplier is, what was ordered, when delivery was promised, what is at stake, the channel, the relationship history. Generic phrases like *"a supplier"* fail; named realistic details pass.
   - **[Constraints]** include at least three checkable rules and at least one negative constraint. *"Under 110 words. No 'Dear Sir/Madam.' Do not threaten to cancel the contract. No exclamation marks."* passes. *"Be polite and clear"* alone fails.
   - **[Output format]** names the channel and shape — *"a single email with a subject line"*, *"a single WhatsApp message"*, *"two versions side by side, one email and one WhatsApp."* *"A message"* alone fails.
   - **[Review cue]** instructs the AI to do at least one of: flag missing details, list assumptions, or refuse to invent specifics. *"At the end, list any details I should double-check before sending — the order number, the agreed delivery date, the contact name — and flag any line where you had to make an assumption."* passes.
   A strong rewrite hits all six elements with at least one checkable detail per element and reads like something the learner could actually run on Monday morning. A passing rewrite hits five out of six.

8. *(Application — diagnose and fix)*
   a. Strong answers point to three of the four named clutter patterns from Part A.
      - *Contradictory tone* — *casual but not too casual*, *be warm, be firm, be apologetic, be confident, be professional*. Five tone instructions that average to a flat output.
      - *Double-specified format* — *bullet points but also paragraphs*. Direct format contradiction.
      - *Decoration constraints* — *brilliant, world-class, helpful, professional, friendly, clear, concise, comprehensive*. None of these change a specific behaviour the learner could check.
      - *Content list larger than the word limit allows* — ten items (original date, new date, reason, compensation, apology, next steps, contact, social media, loyalty programme, values) packed into a 60-word limit. The AI cannot fit all ten meaningfully and will either drop items silently or compress each one to a fragment.
      Any three of the four earn full marks; naming only two earns half.
   b. Strong answers propose targeted edits that remove real noise. Examples that pass: *"Pick one tone direction (warm and direct) and delete the other six tone words."* *"Pick one format (a short paragraph followed by three labelled detail lines) and delete the contradictory instruction."* *"Cut the content list to the four items the customer actually needs to act on — original date, new date, reason, next step — and move the loyalty programme, social media handles, and 'our values' to a separate message or delete entirely."* *"Replace the eight decoration adjectives in the Role line with one function and one quality, such as 'a careful customer-care lead at a small business.'"* The marker should look for whether the learner is removing real noise rather than just lowering the word count.

A learner who scores six or more out of eight has met the pass bar (at least 6 of 8). A learner who scores four or five should review specific Part A sub-sections — the Revision guidance section below names which one matches each weakness.

## Portfolio artifact

**Title:** *Structured Prompt Template + Three Reusable Prompt Patterns*
**Filename:** `Module04_Structured_Prompt_Template_[YourName].pdf` or `Module04_Structured_Prompt_Template_[YourName].docx`
**Length:** Three to five pages.

The artifact has six parts in this order. The point of the artifact is to leave you with templates you will actually reuse, not to produce a one-off document for an assignment.

1. **Completed R-T-C-C-O-R structured prompt for a real task.** Choose one task you do at least monthly — a customer message, a parent note, a supplier follow-up, a study aid, a one-page brief for a manager, a feedback note. Use the labelled-slot format from the worked examples. Every slot must be labelled — *Role:*, *Task:*, *Context:*, *Constraints:*, *Output format:*, *Review cue:* — and every slot must do real work. The Role line names a function and at least one quality. The Output format is *designed* (named columns, fixed structure, named length), not just *shaped*. The Review cue instructs the AI to flag missing evidence, list assumptions, or refuse a section it cannot complete safely. Run the prompt in your AI tool and paste the output below the prompt.

2. **Pattern 1 — Summarization pattern.** Convert one of your real summarization tasks into a reusable pattern. The pattern should fit on one page in the labelled-slot R-T-C-C-O-R format. Mark which slots are *task-specific* (change every run, in square brackets) and which are *stable defaults* (carry across runs, in plain text). Below the pattern, write three short notes:
   - *Usage notes* — when to reach for this pattern, what kind of source documents it handles best (a meeting transcript, a long email thread, a policy memo, a research report), and the typical length of source it works for.
   - *Boundary notes* — when *not* to use this pattern. For example, do not use it on legal or financial documents where missing detail matters; do not use it on any source longer than the AI's input window; do not use it when the next step is a decision rather than a read-and-move-on.
   - *Review cue* — the specific Review cue line for this pattern, written out exactly as it appears in the prompt. The cue should make the AI flag missing evidence, list assumptions, or name where the source was thin.

3. **Pattern 2 — Rewrite-for-audience pattern.** Convert one of your real audience-rewrite tasks (an email rewritten for a different reader, a technical explanation rewritten for a non-technical reader, a Form Four explanation rewritten for a Form One audience) into a reusable pattern in the same labelled-slot format. Mark task-specific slots and stable defaults. Add the same three notes as Pattern 1 — usage, boundaries, Review cue — adapted to this pattern.
   - *Usage notes* should name the audience shifts the pattern is good at handling (formal-to-WhatsApp, expert-to-beginner, internal-to-customer) and one shift it is *not* good at (for example, a tonal shift between two cultures the learner cannot brief the AI on).
   - *Boundary notes* should name at least one situation where the rewrite would cross a line — for example, simplifying medical, legal, or financial language for a reader who needs the precise wording, or rewriting feedback in a way that softens a real concern out of the message.
   - *Review cue* should make the AI flag any phrasing the rewrite has changed in a way that loses meaning rather than just register.

4. **Pattern 3 — Compare-options pattern.** Convert one of your real comparison tasks (vendors, candidates, dates, equipment options, training providers, schools, suppliers) into a reusable pattern in the same labelled-slot format. Mark task-specific slots and stable defaults. The Output format line for this pattern is the most important line — name the columns explicitly, name the row structure, and name what the *below-the-table* paragraph should contain (usually a recommendation). Add the same three notes as the previous two patterns.
   - *Usage notes* should name the kind of decision the pattern is good at structuring (between three to seven options, where the criteria are stable) and one kind of decision it is not good at (for example, a binary go/no-go where a table makes the choice look harder than it is).
   - *Boundary notes* should name when the comparison is missing information the AI cannot supply, and what to flag rather than fill in.
   - *Review cue* should make the AI mark any cell where it had to estimate, generalise, or invent a value, rather than copying it from the supplied input.

5. **Reflection — avoiding both vagueness and clutter.** Write 200 to 300 words covering: where you noticed yourself being vague at the start of the module and what specifically you tightened (a missing Role, an undesigned Output format, a missing Review cue); where you noticed yourself adding clutter once you had learned the six-element model and which clauses you cut (which decoration constraints, which contradictory tone words, which content items that did not fit the word limit); and one judgement call you are still not sure about — a constraint you are not sure should stay or go, an Output format choice you suspect is overfit to your current situation, a Review cue you are not sure is doing real work. The reflection is part of the artifact, not optional.

6. **Filename, save location, and tag.** Save the artifact to your portfolio folder with the filename above. Tag it in your notes as *feeds: m05, m15, m16* so you can find it again when those modules ask for it.

Save the artifact now. You will need it again in Modules 5, 15, and 16, and the artifact only does its job if it is built around tasks you actually do.

## Capstone-save reminder

The Module 4 artifact — your structured prompt and three reusable patterns — is the second of three prompt-related portfolio pieces in this course, and it is the one that gets reused most often. Save it where you can find it.

**Module 5 — Prompt iteration and comparison.** Module 5 teaches prompt iteration as a tracked workflow: you compare versions, revise deliberately, and learn when to improve a prompt instead of regenerating randomly. Your Module 4 R-T-C-C-O-R prompt becomes the starting point for that comparison work — Version 1 in the prompt version log, with the Module 4 reflection feeding the *what I changed and why* notes for the first revision pass. Each of your three reusable patterns also becomes a candidate for Module 5's stress-test exercise, where you run the same pattern against different inputs and watch for drift.

**Module 15 — Personal prompt pack.** Module 15 is where you assemble a small library of prompt templates you reuse across roles, tasks, and tools. The three patterns from this module — summarization, rewrite-for-audience, compare-options — are three of the most-used pattern shapes in any working prompt pack, so they will sit near the top of your library. Learners who write the boundary notes and Review cues seriously in this module typically arrive at Module 15 with the framing of a working pack already in place; learners who treat the artifact as an exercise will rebuild this work in Module 15 and lose time.

**Module 16 — Final capstone workflow.** Module 16 asks you to build an end-to-end AI-assisted workflow for one real task you do. The structured prompt template from this module is the *prompt layer* of that workflow, and the three patterns are the reuse layer. The capstone judges, in part, whether your prompts are engineered enough to produce reliable output without supervision — whether the Role, Output format, and Review cue lines are doing real work — and whether your patterns are usable by a colleague, not only by you. The work you do in this module is the foundation for that judgment.

If you skip the artifact or save a thin version of it, three later modules become harder. The strongest learners treat this artifact as a working draft they will keep editing across the rest of the course, not a one-time submission.

## Module completion evidence

The following outputs together prove that you have completed Module 4 meaningfully. Keep them in your portfolio folder.

- The 8-question checkpoint quiz, completed with at least 6 of 8 correct.
- Practice activity 1 submitted as three engineered R-T-C-C-O-R prompts (one per supplied weak prompt), with every slot labelled and every slot doing real work, plus a three- to five-sentence analysis per prompt naming the element that made the biggest difference, whether the Review cue produced anything useful, and one element that could be cut without changing the output.
- Practice activity 2 submitted as three AI outputs (one per Output format — brief, table, step-by-step) for the same source document, plus a roughly 200-word comparison naming which design fit which next step best and which design you would default to.
- Practice activity 3 submitted as five sets of constraints (one per task), each set containing at least three engineered constraints, at least one negative constraint, a one-sentence rationale per constraint, and a *control* or *decoration* mark per constraint, with any decoration constraints rewritten until they are control.
- Practice activity 4 submitted as three reusable patterns, each on its own page, each with the labelled R-T-C-C-O-R prompt, marked task-specific slots, stress-test outputs, and a one-paragraph note on what you would change after the stress-test.
- The Pause-and-check questions answered honestly in your working notes (not graded, but required for completion).
- The Knowledge-to-output *Engineered Prompt Pack* — the four-part deliverable from Part A's knowledge-to-output task, including the Module 3 starting prompt, the engineered version, the three pattern variants, and the one-page reflection.
- The portfolio artifact saved as `Module04_Structured_Prompt_Template_[YourName].pdf` or `.docx`, containing all six required parts.

A learner with all of the above has finished Module 4 at the expected depth. A learner missing the artifact or two or more practice activities has not.

## Revision guidance

If you scored below 6 of 8 on the checkpoint, or if any of the situations below describe you, return to the named section before moving on.

**Your prompt has a Role line but the Role does not improve the output.** Re-read the *Role* sub-section of the core lesson in Part A. The most common cause of an inert Role line is that it names a generic quality the AI was already going to attempt — *"a helpful expert,"* *"an experienced professional,"* *"a knowledgeable assistant."* Apply the test from Part A: *can I predict what the output will not sound like once the Role is in place?* If the answer is no, the Role is decoration. Rewrite the Role line to name a function (HR business partner, payroll accountant, customer-care lead, study coach, operations lead) and one quality that matters for the task (*evidence-based*, *plain-English*, *deadline-driven*, *cautious about over-promising*). Worked example 3 (the HR feedback note) is the cleanest example of a Role line doing real work.

**Your Task is still vague after rewriting.** Re-read the *Task* sub-section of the core lesson and the same-named section from the Module 3 revision guidance. The most common cause of a still-vague Task in an engineered prompt is silently turning a Task into a topic — *"help me think about feedback"* instead of *"draft a 250-word feedback note for one named team member, drawn only from the evidence below."* Apply the same Module 3 self-test: *can I read my prompt and answer 'did the AI do that, yes or no?'* If the answer is *kind of*, the verb is too broad, and the rest of the prompt cannot rescue it. Rewrite the Task line first; the rest of the prompt usually tightens once the verb is specific.

**Your constraints are too many or poorly chosen.** Re-read the *Constraints* sub-section of the core lesson and the *When prompt detail helps and when it clutters* sub-section. The most common cause of a cluttered constraint list is decoration constraints (*be helpful, be clear, be useful, be thoughtful*), contradictory tone words (*professional, friendly, casual but not too casual*), or double-specified format (*bullets but also paragraphs*). Apply the test from Part A: *for each constraint, what default behaviour is this constraint preventing?* If you cannot answer in plain language, cut the constraint. Aim for three to five sharp constraints, with at least one in the negative form (*do not promise a refund. Do not invent percentages*). Worked example 4 (the cluttered-to-clean rewrite) is the cleanest example of pruning a constraint list.

**Your Output format does not match the task.** Re-read the *Output format* and *Output design as a craft* sub-sections of the core lesson. The most common cause of an Output format mismatch is reaching for the most familiar shape (a paragraph, a generic list) without asking the diagnostic question Part A names: *what am I going to do with this output?* If the next step is a decision between several options, design a table with named columns. If the next step is following the output as instructions, design a step-by-step. If the next step is briefing a manager, design a brief with a fixed headline-and-supporting-points structure. If the next step is reading once and moving on, design a summary with a named word count and a named reader. Redo Practice activity 2 (the Output design lab) with a different source document if you are not yet feeling the difference Output design makes.

**Your Review cue is missing or too weak.** Re-read the *Review cue* sub-section of the core lesson. The most common cause of a weak Review cue is treating it as a polite closing line — *"please double-check your work"* — rather than an instruction. A useful Review cue does at least one of three things: instructs the AI to flag missing evidence rather than fill it in (*mark sections without supporting evidence as [gap — to confirm]*), instructs the AI to list its assumptions at the end of the output, or instructs the AI to refuse a section it cannot complete safely and explain why. If your Review cue does none of these, the prompt is not yet engineered for safe reuse. Worked example 3 (the HR feedback note) and worked example 1 (the photosynthesis revision aid) both show Review cues doing real work; re-read them and adapt the phrasing for your task.

**Your portfolio artifact reads like a textbook exercise rather than a real task.** Choose a different task. The artifact only does its later-module job (Modules 5, 15, 16) if it was built from a task you actually do — a real customer message, a real parent note, a real supplier follow-up, a real comparison. If you cannot think of a real task, look at the last two weeks of your messages, emails, or work notes for the kinds of writing that come up repeatedly. Patterns built on imagined tasks tend to drift the first time you try to reuse them.

## Transition to the next module

Module 4 helped you design stronger prompts before you run them. Module 5 turns prompting into a reviewable workflow: you will compare versions, revise deliberately, and learn when to improve a prompt instead of regenerating randomly. The structured prompt and three patterns you produced in this module become the starting point for that comparison work — your Version 1 in the prompt version log — and the Review cues you wrote here become the seed for the *what I would check before sending* column that Module 5 introduces. Engineering a prompt well is the floor for the iteration discipline that comes next.

## Notes for Cursor mapping

This section is for the platform team mapping Module 4 into Cursor. It is not part of the learner-facing module.

**Suggested module id:** `ae-m04`

**Suggested session and block breakdown.** Three sessions, sized for a 2.5- to 3-hour learner workload. Module 4 is heavier than Module 3 because output design takes practice, so the third session is longer than the equivalent session in Module 3.

- *Session 1 — From control to engineering (≈ 50 minutes).* Overview block, then the core lesson sub-sections *Role*, *Task*, *Context*, and *Constraints* with their inline mini-examples and the note on how Audience moved into Context. End with worked examples 1 and 2 (study aid revision pack and customer-care price-change message). One mid-session reflection block.
- *Session 2 — Output design and Review cues (≈ 55 minutes).* Core lesson sub-sections *Output format*, *Review cue*, *Output design as a craft*, and *When prompt detail helps and when it clutters*. Worked examples 3 and 4 (review-ready feedback with evidence boundaries and the cluttered-to-clean Slack message rewrite). End with the Pause-and-check block.
- *Session 3 — Apply, assess, and produce (≈ 75 minutes).* Practice activities 1 through 4 (engineering makeover, Output design lab, constraint selection drill, three reusable patterns), the knowledge-to-output *Engineered Prompt Pack* task, the 8-question checkpoint quiz, and the portfolio artifact upload.

**Likely content block types** (mapped to the platform's standard block library):

- *Overview / objectives* — the *Module purpose* and *Learner outcomes* sections from Part A.
- *Concept* — the six R-T-C-C-O-R sub-sections of the core lesson, plus the *Output design as a craft* sub-section and the *When prompt detail helps and when it clutters* sub-section. Each rendered as one concept block with the inline mini-example included. The *Output design as a craft* block should expose the five named patterns (table, checklist, summary, brief, step-by-step) as a comparison view.
- *Guided example* — each of the four worked examples rendered as a single guided-example block with a collapsible *weak prompt → output → analysis → engineered prompt → new output → what the learner should notice* substructure.
- *Practice* — one practice block per practice activity (four total), each pre-loaded with the supplied items so the learner does not have to leave the platform to begin. Practice activity 2 (the Output design lab) needs three side-by-side run panels, one per Output format option.
- *Reflection* — the Pause-and-check block, plus a smaller mid-Session-1 reflection.
- *Knowledge-to-output* — the four-part *Engineered Prompt Pack* task as a single multi-step block with each part as a separate sub-step.
- *Checkpoint* — the 8-question quiz.
- *Artifact upload* — the portfolio artifact, with the filename pattern enforced by the upload widget.
- *Remediation* — the Revision guidance section, mapped to deep-link buttons that jump back to the named Part A sub-sections.

**Quiz mapping notes.** Eight questions, four formats. Two are machine-checkable multiple choice (Q1, Q2) and can be scored automatically. The remaining six (Q3 through Q8) are rubric-checkable: each has a model answer plus criteria in the answer key. The platform should render Q3, Q4, Q5, Q6, Q7, and Q8 as text-area inputs with a learner-side self-assessment rubric (collapsible) below each. The pass rule means the learner must mark themselves as correct on at least six of eight using the supplied criteria. Q7 (the supplier follow-up rewrite) is the most rubric-heavy and benefits from a side-by-side display of the learner's rewrite and the six element-checks from the answer key. Q8 (the cluttered prompt diagnosis) benefits from a tagged-clause view of the prompt, with the four named clutter patterns from Part A available as selectable tags.

**Portfolio artifact mapping notes.** Upload widget should accept `.pdf` and `.docx` only. Filename must match the pattern `Module04_Structured_Prompt_Template_*.{pdf,docx}` — enforce on upload. The widget should expose all six required parts as a checklist the learner ticks before submission, so partial uploads are caught at the point of submission rather than at the start of Module 5. Tag the artifact in storage as `feeds:m05, feeds:m15, feeds:m16` so later modules can surface it automatically when needed. The three patterns should also be stored as separate, individually-retrievable artifacts inside the file so Module 15's prompt-pack assembly tool can pull them in directly without requiring the learner to copy-paste.

**Special UI needs.**

- The R-T-C-C-O-R model should be rendered with a small persistent legend (Role, Task, Context, Constraints, Output format, Review cue) that is visible during all Session 2 and Session 3 blocks. Learners frequently lose the order of slots once they start writing their own prompts.
- Worked examples 1, 2, 3, and 4 each contain weak-prompt, AI-output, analysis, engineered-prompt, and new-output sub-blocks. A side-by-side layout (weak on the left, engineered on the right) is more useful than a stacked layout for these examples and should be the default rendering when screen width allows. On mobile, fall back to a stacked layout with collapsible sections.
- Practice activity 2 (the Output design lab) needs a three-panel side-by-side layout for the three Output format runs, with the source document pinned at the top and the Output format slot the only editable field. This is the single most important UI requirement in the module — the learning only lands if the three runs are visually compared at the same time.
- Practice activity 4 (three reusable patterns) needs a pattern-builder UI with marked task-specific slots (square brackets, editable) and stable defaults (plain text, locked by default but editable on click).
- The Pause-and-check questions and the Revision guidance items should each have a *jump back to relevant section* link, not a generic *review module* link. The Revision guidance section names six specific failure modes; each one should link back to the precise Part A sub-section named.
- The portfolio artifact upload should display the six-part checklist next to the upload control, not after submission, and the three patterns sub-checklist should be nested under the *patterns* section so partial pattern submissions are caught.

**How Part A and Part B should be combined into `Jifunze_Course1_Module_04_Improved.md`.**

Part A and Part B are the same module, split into two files only for authoring convenience. To produce the final deliverable file `Jifunze_Course1_Module_04_Improved.md`, concatenate them in this order, removing the Part B title line and italic note so the module reads as one continuous document:

1. From Part A, take everything from `# Module 4: Prompt Engineering — Structure, Constraints, and Output Design` through the end of the *Knowledge-to-output task* section.
2. From Part B, take everything from `## Checkpoint quiz` through the end of `## Notes for Cursor mapping`.
3. Drop the Part B header line (`# Module 4: Prompt Engineering — Structure, Constraints, and Output Design — Part B`) and the italic note immediately under it, since they exist only to orient the Part B file as a standalone fragment.
4. Verify that the final concatenated file has exactly one `# Module 4:` heading, exactly sixteen `##` section headings in the order specified by the Module 3 handoff convention (preserved for Module 4), and no duplicate sub-sections.
5. Verify that the *Notes for Cursor mapping* section sits last and is clearly marked as platform-team-only, not learner-facing.

Once concatenated and verified, the result is the canonical Module 4 file and supersedes both part files. The two part files can be archived but should not be deleted, since they are useful as authoring history.
