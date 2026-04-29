# Course1_Assessment_Standards

*Course 1 — AI Essentials. Internal authoring and platform-mapping reference. Defines how every module checkpoint, applied scenario, portfolio artifact, and capstone submission is graded, what counts as passing, what triggers remediation, and how each piece maps into the Jifunze UI. This document does not contain lesson content. It is the assessment contract every module in Course 1 must honor.*

---

## Purpose

This document exists so that every module checkpoint, applied scenario, portfolio artifact, and the capstone submission in Course 1 is graded the same way, regardless of which author wrote which module. Without a single source of truth, checkpoints drift in difficulty, answer keys drift in rigor, pass thresholds drift in interpretation, and the certificate ends up meaning sixteen different things.

It also exists so that a self-learner working through Course 1 without a facilitator gets a fair, consistent, and reviewable assessment experience. The learner needs to know what passing looks like, what failing looks like, what to do when they fall short, and what evidence they are accumulating toward the certificate. This document defines that experience in product-facing terms.

Finally, it exists so the engineers and instructional designers mapping Course 1 into the Jifunze platform have a definitive specification for the assessment surface. Every rule in this document maps to a platform behavior: a quiz block, a rubric, a remediation link, an upload gate, or a certificate trigger.

The audience is internal: curriculum authors, reviewers, platform engineers, and the Jifunze product team. The tone is practical and instructional — readable by a non-author teammate who needs to understand the rules without reading the full course.

---

## Jifunze AI Essentials app rule (current shipped product)

The live **module quiz** gate in Jifunze draws **8 questions** and passes only when the learner answers **at least 6 correctly** (count-based; do not label this as **"80%"** in learner-facing UI—six of eight is **75%** as a percentage and confuses the bar).

Manuscript checkpoints in this document may still describe mixed item formats and **0.5 credit** rubric scoring toward an **8.0** total. That model is for authoring fidelity; engineers should mirror whatever scorer ships. Until partial credit ships in the quiz UI, treat the **product** rule as **6 of 8** whole correct.

---

## Checkpoint structure

Every Course 1 module ends with a checkpoint quiz. The quiz is the same shape in every module so learners build a stable expectation and platform engineers build a single component.

**Eight questions per module.** Not six, not ten. Eight is the count that lets us cover four formats meaningfully without becoming a long-form test. The **pass bar aligns with the Jifunze app:** at least **six of eight** scored items treated as correct (see *Pass threshold* below for manuscript partial-credit rules).

**Mixed formats, with required minimums.** Each eight-question checkpoint must contain at least:

- Two multiple-choice questions. Each has one clearly correct answer and three plausible distractors. Distractors should reflect the misconceptions the module specifically corrects, not random wrong options.
- Two scenario-based questions. Each presents a short situation (two to four sentences) and asks the learner to identify what is missing, what is wrong, what to do next, or how to interpret what happened. Scenarios are short-answer in form (two to three sentences) and rubric-checked.
- Two short-answer questions. Each asks the learner to define, explain, or list in their own words. Answers are typically one to three sentences. Rubric-checked.
- One application question. The learner does something with module content — rewrites a prompt, classifies an item, identifies which element is missing in a supplied prompt, drafts a short artifact. This is the bridge between recall and use. Rubric-checked.

The eighth question is author's choice in format, but should be the question that most directly tests the module's central learner outcome. In practice this is usually a second application item or a longer scenario.

**Format labels are visible in the question.** Each question carries its format in italics next to the question number, e.g., *(Multiple choice)*, *(Scenario)*, *(Short answer)*, *(Application)*. This tells the learner what kind of answer is expected and tells the platform which input component to render.

**Alignment to learner outcomes.** Each question must align to a specific learner outcome listed at the top of the module. The author maintains an internal mapping table during writing; the QA pass verifies that every learner outcome has at least one checkpoint question testing it, and that no checkpoint question tests something outside the module's scope.

**Difficulty distribution.** Roughly: two recall-level questions, four application-or-reasoning questions, two integration-or-judgment questions. A checkpoint composed entirely of recall questions does not meet the benchmark even if it contains eight items.

**No trick questions.** A correct answer should be selectable by a learner who paid attention to the module. Distractors test misconceptions, not reading comprehension. A learner who fails a question should fail because they did not learn the concept, not because the wording was misleading.

---

## Pass threshold

**Authoring / manuscript rule (eight-point total, may include half credit).** Multiple-choice questions are scored binary: right or wrong. Scenario, short-answer, and application questions are scored against the rubric in the answer key — each question is either *acceptable* (full credit), *partial* (half credit), or *unacceptable* (no credit). Half-credit answers count as 0.5 toward the eight-question total. A learner who scores **5.5** has not passed. A learner who scores **6.0** has.

**Jifunze app rule today (module quiz gate).** Eight drawn items, each right or wrong; **pass = at least 6 correct** (say **6 of 8**, not "80%"). This is the same count expectation across all sixteen modules and retakes. There is no curve, no per-module variation, and no facilitator override in the shipped quiz UI.

**What happens below threshold.** A learner who scores **below 6 of 8** (or below **6.0** on the eight-point rubric model where partial credit applies) has not completed the module checkpoint. The platform does not mark the module as complete. The learner is shown:

- The questions they got wrong, with the answer key explanations.
- The specific module sub-sections to review (named explicitly in the module's revision guidance — see the *Revision and remediation* section below).
- A retry button that is enabled only after the platform records that the learner has revisited at least one of the named sub-sections, or after a 24-hour cooling period, whichever comes first.

We do not let learners retake the same checkpoint instantly. The cooling rule exists because instant retakes train the platform behavior, not the underlying skill.

**Suggested retry rule.** A learner gets up to three attempts on any checkpoint. Each attempt uses the same eight questions in randomized order; the application item may be replaced by an equivalent variant if one is authored. Three attempts is a deliberate ceiling — it lets a learner who genuinely needed a second pass through the material succeed, but it stops the platform from being used as a guess-until-you-pass tool.

If a learner exhausts three attempts without reaching **6 of 8** correct (or **6.0** on the eight-point rubric model), the platform does not block them from continuing the course. It does mark the module as *not yet passed* and adds it to the learner's *return to* list, which is shown on the dashboard. The certificate-readiness rule (see *Capstone assessment relationship* below) requires every module checkpoint to eventually meet the pass bar; the learner can return to a not-yet-passed checkpoint at any time and try again.

A learner who fails three times in a row should also be offered the option to talk to a facilitator (when one is available in the deployment) or to consult the Self-Learner Guide's *When you're stuck* section. The platform does not force this conversation.

---

## What good questions test

Good Course 1 questions test the things the course actually teaches. The course teaches mental models, prompt skill, verification habits, applied judgment, privacy discipline, accountability, and reusable practice. Strong questions reach into those skills and ask the learner to demonstrate them.

A strong question tests **whether the learner can apply the concept**, not whether they can recall a definition. The Module 1 question that gives the learner an AI output containing the sentence *"Studies have consistently shown that 87% of remote workers report higher productivity"* and asks them to name two reasons to be cautious is a strong question. It is testing whether the learner has internalized the verification habit, not whether they can recite the definition of hallucination.

A strong question tests **the misconception the module specifically corrects**. If Module 2 corrects the myth that fluent output is reliable output, a Module 2 question should give the learner a fluent-but-wrong example and ask them to spot the problem. If the module did not introduce the concept, the question should not test it.

A strong question rewards **specificity and reasoning**. A scenario answer that names two concrete checks (verify the 87% figure against a source, ask the AI for the source) earns full credit. A scenario answer that says *"AI can be wrong, so be careful"* does not, even though it is technically true. The answer key spells this out so the rubric is reproducible.

A strong question is **answerable from the module alone**. A learner who paid attention to the module should be able to answer the question without external research. If a question requires the learner to know something the module did not teach, the question is out of scope.

A strong application question produces **something reviewable**. A rewritten prompt, a classified item, a short safer-prompt rewrite, a one-paragraph synthesis — all reviewable. A question that asks the learner to *"think about what they would do"* without producing a written output is not.

A strong question is **unambiguous in what it asks**. A learner should not have to guess whether the question wants one example or three, two sentences or a paragraph, the technical name or a plain-language explanation. The question stem says exactly what to produce.

---

## What weak questions avoid

Weak questions are removed during the QA pass. The most common patterns to watch for:

**Recall-only questions that test whether the learner read the module.** A question asking *"What does T-C-C-F-A stand for?"* tests vocabulary, not skill. A question asking *"In the Module 3 example of the late-assignment email, which T-C-C-F-A element was most strengthened in the revision?"* tests understanding. We allow some recall — two questions out of eight is the cap — but a checkpoint dominated by recall has not earned a **six-of-eight** pass bar.

**Trick questions and gotchas.** Distractors that depend on the learner missing a single word, or scenarios that require an unstated assumption to answer correctly, are removed. A learner who genuinely understood the concept should be able to pass.

**Questions that test something the module did not teach.** If Module 7 does not explicitly cover LinkedIn outreach, a Module 7 question cannot grade a learner on LinkedIn-specific etiquette. Out-of-scope questions create unfair failures and erode trust in the assessment.

**Ambiguous wording.** Questions where two of the four multiple-choice options are defensibly correct, or where a scenario could be interpreted three different ways, fail the QA pass. Authors should ask a teammate to take the checkpoint cold and flag any question they had to re-read.

**Length-padding.** A question that adds a paragraph of irrelevant context to look more rigorous is a worse question, not a better one. Stems are kept short; context is supplied only when it is the thing being tested.

**Cultural defaults that exclude.** A scenario that assumes a US workplace, a UK university system, or a particular cultural reference excludes learners outside that context. Scenarios use the same recognizable Kenyan and globally-readable contexts the rest of the course uses (KES, Nairobi, Safaricom, KRA, iTax, Kenyatta University, WhatsApp customer interactions) without requiring those references to be explained, and without assuming a Western default.

**Yes/no questions disguised as scenarios.** *"Should the learner have done this? (Yes/No)"* is a multiple-choice question with two distractors removed. If the answer is binary, make it short-answer with a *why* requirement. If the answer requires *why*, the *why* is the actual question.

**Questions whose answer key is *"answers will vary"* with no rubric.** Every rubric-graded question must have a model answer or a defined acceptance criterion. *"Answers will vary"* without further specification is an unfinished answer key, not a question style.

---

## Answer key standards

Every checkpoint question has an answer key entry. The entry has three jobs: tell the learner the right answer, explain why it is right, and explain why the wrong options are wrong (for multiple choice) or what counts as acceptable, partial, and unacceptable (for rubric-graded items).

**For multiple-choice items.** The entry names the correct option (e.g., *"b."*), gives a one-sentence explanation of why it is correct, and gives a one-line note on why each distractor is wrong. The Module 1 example in the reference modules is the standard: *"b. AI is best understood as software that performs specific computational tasks. Option (a) overstates similarity to humans; (c) confuses AI with hardware; (d) treats AI as authoritative, which the module specifically corrects."* The distractor explanations matter — they let the learner who picked wrong understand what they were thinking and what to correct.

**For scenario items.** The entry describes what a strong answer contains. Example pattern: *"Strong answers should mention: (1) the statistic is specific (87%) but no source is given, and (2) phrases like 'studies have consistently shown' are common AI patterns that often introduce invented or vague references. A reasonable next step is to ask for the source or check whether the figure is real."* The two named elements are the criteria. A learner who hits both gets full credit. A learner who hits one gets partial. A learner who hits neither gets none.

**For short-answer items.** The entry gives a model answer (one to three sentences) and names the criteria a strong answer must meet. The model answer is not the only acceptable answer — it is the calibration point against which the learner self-assesses.

**For application items.** The entry gives a worked example of a strong learner output and a worked example of a weak learner output, with a short note on what distinguishes them. This is the most authoring-heavy part of the answer key and the most useful one — learners use it to grade their own work the way a reviewer would.

**Length cap.** Answer key entries should be tight. A two-paragraph explanation for a one-sentence question is over-engineering. The reference modules average two to four sentences per entry, which is the right target.

**Voice.** Answer keys are written to the learner, in the same direct, practical, no-marketing tone as the lesson. *"Strong answers note that…"* is the template. Avoid praise (*"Excellent!"*), avoid scolding (*"This is a common mistake!"*), and avoid hedging language (*"You might consider that…"*) — just say what the answer needs to contain.

---

## Applied scenario scoring

Scenario questions and application questions are the parts of the checkpoint that cannot be auto-graded by exact match. They are scored against the answer-key rubric using a three-level scale: *acceptable*, *partial*, *unacceptable*.

**Acceptable.** The answer hits all of the named criteria in the answer key. It is specific, reasoned, and produces (in application items) something a reviewer could use. Acceptable answers earn full credit (1.0 point).

**Partial.** The answer hits some of the named criteria but misses at least one important element. It may be technically correct but underdeveloped, or it may name the right concept but apply it imprecisely. Partial answers earn half credit (0.5 points).

**Unacceptable.** The answer misses the central criterion entirely, restates the question, gives generic advice that could apply to any module, or shows a clear misconception the module specifically corrects. Unacceptable answers earn zero credit.

**The author writes the rubric, not the grader.** Each scenario and application question's answer key contains the criteria explicitly. A reviewer (whether facilitator, peer, or the learner self-grading) does not invent a rubric on the fly — they apply the one in the answer key.

**Self-grading is the default mode.** Course 1 is designed for self-paced learners. The default expectation is that the learner reads the answer key, applies it to their own answer honestly, and records the result. The Self-Learner Guide names this explicitly: self-grading works only if you do it before you read the answer key, and it works only if you grade against the criteria, not against your feeling that you tried hard.

**Platform-assisted grading is layered on top.** When a Jifunze deployment includes AI-assisted grading or facilitator review, those layers grade against the same rubric the learner self-graded against. There is no separate stricter rubric for facilitators. This keeps self-graders' results comparable to facilitator-graded results.

**Edge cases.** Answers that are partly off-topic but contain a usable on-topic element are graded as partial. Answers that clearly misunderstood the question (*"I read this as asking…"*) are graded against the question that was asked, not the one the learner thought they answered. Answers in a language other than English in an English-language deployment are graded for content; language polish does not affect the score unless the language failure prevents the criteria from being checked.

---

## Portfolio artifact assessment

Every module produces a portfolio artifact. The checkpoint quiz and the portfolio artifact are separate assessments — passing the checkpoint does not require submitting the artifact, and submitting the artifact does not pass the checkpoint. Both are required for module completion.

**Acceptance criteria, not grades.** Portfolio artifacts are not scored on a numerical scale. They are reviewed against three or four named acceptance criteria specific to that artifact, listed in the module's *Knowledge-to-output task* and *Module completion evidence* sections. Each artifact either *meets* the criteria (accepted) or *does not yet meet* the criteria (returned with revision notes).

**Specificity is the central criterion.** Across every module, the test for a credible artifact is whether someone who was not in the lesson could read it and learn something specific about the learner's actual context. A *My AI Use Boundary* document that reads *"I will be careful with AI"* does not meet the criterion. A *My AI Use Boundary* that reads *"I will not paste raw client M-Pesa transaction logs into Claude when drafting customer-response messages; I will summarize the transaction pattern in plain language first"* does. The reference modules name this distinction in the revision guidance section of every module.

**Format and filename rules.** Every artifact has a defined format (.pdf, .docx, .md, audio file, screenshot bundle) and a filename pattern: `ModuleXX_ArtifactName_[YourName].<ext>`. The filename pattern matters because the portfolio is assembled at the end of the course, and inconsistent filenames make assembly painful. Authors should always include the filename pattern in the *Portfolio artifact* section of the module.

**Capstone-feeding artifacts get a stronger acceptance bar.** Some artifacts are inputs to the capstone — the Module 3 prompt rewrite, the Module 5 prompt version log, the Module 10 safety checklist, the Module 12 workflow SOP, and especially the Module 15 prompt pack. These are reviewed against an additional criterion: *would this artifact survive being extended in the capstone, or would it have to be rebuilt from scratch?* If the answer is *rebuilt*, the artifact does not yet meet the criteria.

**Self-assessment first.** Each module's revision guidance contains the self-check questions the learner runs against their own artifact. The platform encourages the learner to run the self-check before submitting. AI-assisted review and facilitator review (where available) layer on top of self-assessment, not under it.

**Returned artifacts are not failures.** A returned artifact comes with named revision notes (which criterion was not met, and what to revise). The learner revises and resubmits. There is no attempt cap on portfolio resubmission — unlike the checkpoint, the artifact can be revised any number of times before module completion.

---

## Capstone assessment relationship

The capstone in Module 16 is the only place in Course 1 where the assessment goes beyond eight-question checkpoints and acceptance-criteria artifacts. It uses a full rubric (Appendix C of Module 16) with named criteria, evidence levels, and weights.

**The capstone consumes earlier artifacts.** The capstone is not a from-scratch assessment. It extends the Module 15 prompt pack, references the Module 9 accountability statement, applies the Module 10 safety checklist, and uses the Module 12 workflow SOP as a starting structure. A learner who skipped portfolio artifacts in earlier modules cannot meaningfully complete the capstone. The platform should surface this dependency clearly when the learner reaches Module 16.

**The capstone rubric criteria.** Per the Module 16 work plan, the rubric covers problem framing, prompt and workflow design, verification and review, safety and privacy, reusability, reflection and improvement, and (per the rewrite plan) transfer — whether the workflow could be adapted by someone else. Each criterion has an evidence ladder: *strong evidence*, *adequate evidence*, *weak evidence*, *missing*. Each criterion has a fail-state: a specific failure that disqualifies the capstone regardless of other strengths (e.g., a capstone that exposes sensitive data fails the safety criterion outright).

**Pass threshold for the capstone.** A passing capstone scores at *adequate evidence* or higher on every criterion, with at least four criteria at *strong evidence*. A capstone with one *weak evidence* criterion is returned for revision. A capstone with two or more *weak evidence* criteria, or any *missing* criterion, requires substantive revision before the certificate is issued.

**Certificate-readiness rules.** The Course 1 certificate is issued when all of the following are true:

- All sixteen module checkpoints have eventually passed (**at least 6 of 8** correct on the module quiz gate, or **≥6.0 / 8.0** where partial credit is in use).
- All sixteen module portfolio artifacts have been accepted (meet acceptance criteria).
- The capstone has been submitted and meets the rubric's pass threshold.
- The learner has produced a one-page reflection per the Module 16 specification.
- The learner has acknowledged the disclosure standard from the Responsible AI Disclosure Note.

The certificate explicitly names what the learner has demonstrated (responsible, applied AI use across writing, learning, research, decision-support, and workflow design, with verification, privacy, and accountability discipline) and what it does not certify (domain expertise, advanced prompt engineering, AI engineering or development). This wording is in the Certificate Readiness document and should not be inflated by deployment partners.

**Self-critique fallback.** A learner without facilitator access uses the self-critique guide built into Module 16. The guide produces what a peer or facilitator would produce, against the same rubric. Self-critique results are accepted as the certificate-eligibility input when no facilitator review is available. The 24-hour rule (complete the workflow, walk away for a day, then return for self-critique) is part of the fallback.

---

## Revision and remediation

Every module has a *Revision guidance* section. That section is the bridge between *I scored below 6 of 8* and *I will pass on retry*. The section is written in the module, not here — but every module's section follows the same shape, defined here.

**The shape.** *"If you scored below 6 of 8 on the checkpoint, return to [named sub-section A] and [named sub-section B] before retrying."* The named sub-sections are specific. Not *"the section on prompts"* — *"the section titled 'Why vague prompts fail' and the worked example titled 'Late-assignment email to students.'"* This specificity is what lets the platform turn revision guidance into automated *review section X* links rather than generic *study more* prompts.

**One named sub-section per likely failure mode.** A module's revision guidance maps the most common failure modes onto specific sub-sections. The Module 1 revision guidance, for example, names the misconceptions section for learners who failed the verification question and the AI task types section for learners who failed the task-classification question. This is a per-module authoring task; the module author writes the failure-to-section mapping during checkpoint writing.

**Artifact revision triggers.** *"If your artifact reads as generic, revise [specific element]."* The reference modules name this directly: *"If your AI Use Boundary feels generic, revise it. Replace abstract phrases like 'be careful with AI' with specific situations from your real life."* This template carries forward to every module.

**No more than three revision triggers per module.** A revision guidance section that lists six or eight or ten failure modes is unusable. Three is the cap. The three should cover roughly 80% of expected failure patterns; edge cases get rolled into the closest of the three.

**Revision guidance is not optional.** A module without revision guidance does not meet the benchmark. The QA pass enforces this.

---

## Self-learner retake guidance

A learner working alone needs explicit, supportive retake guidance. The platform is the facilitator stand-in, and the platform is more helpful when the learner knows the retake rules in advance.

**Three attempts per checkpoint, as named earlier.** The learner sees the attempt count on the quiz screen. They know how many they have used and how many remain.

**Cooling rule between attempts.** The retry button activates once the learner has revisited at least one revision-guidance sub-section, or after 24 hours, whichever comes first. The platform encourages, but does not require, the named sub-section visit. The 24-hour rule is the safety valve for learners who genuinely understood the material and want a fresh attempt without the platform deciding they need to re-read.

**Retakes use the same eight questions in randomized order.** When alternate application items have been authored, the platform may swap the application item between attempts to reduce memorization. The two recall questions and the multiple-choice items remain stable across attempts.

**No penalty for using all three attempts.** A learner who passes on attempt three has passed. The certificate does not record attempt counts. The platform may surface attempt-count statistics to the learner privately as a learning signal, but it does not weight the eventual pass differently based on attempts.

**A learner who exhausts three attempts.** The platform shows a *take a break* message, links to the Self-Learner Guide's *When you're stuck* section, surfaces the most-missed question categories, and offers to talk to a facilitator if one is available. The learner can come back to the checkpoint later — the platform records *not yet passed* and adds the module to the learner's *return to* list. There is no time limit on how long *later* can be.

**Honest self-grading reminder.** The Self-Learner Guide names this directly, and the platform reinforces it on the answer-key reveal screen: scoring yourself accurately matters more than the score itself. A learner who marks themselves correct on a partial answer cheats the assessment and arrives at the certificate without the underlying skill.

**Multiple checkpoint failures across modules are a signal.** If a learner has *not yet passed* status on three or more module checkpoints simultaneously, the dashboard surfaces a one-time *check in with yourself* nudge: are you moving too fast? Should you slow down and revisit Module 1's mental model before pushing further? The nudge is not a block — it is a single message and the learner dismisses it.

---

## Notes for platform mapping

This section translates the rules above into Jifunze UI specifications. It is the handoff to platform engineering.

**Eight-block lesson model.** Every Course 1 module maps to the same eight Jifunze platform blocks: *overview*, *concept*, *guided example*, *practice*, *reflection*, *checkpoint*, *artifact upload*, *remediation*. The checkpoint quiz fills the *checkpoint* block. The portfolio artifact fills the *artifact upload* block. The revision guidance fills the *remediation* block. No module skips a block. (See the Quality Benchmark, Section 10.)

**Checkpoint block — UI behavior.** The *checkpoint* block renders eight questions, one at a time or as a single scrollable form (the Jifunze decision; either is acceptable as long as it is consistent across modules). Each question's format label drives the input component:

- *Multiple choice* renders as four radio options. Auto-graded.
- *Scenario* renders as a short-answer text box (suggested 80–200 words). Self-graded against the answer key, with optional AI-assisted or facilitator-assisted grading layered on.
- *Short answer* renders as a short-answer text box (suggested 30–80 words). Self-graded.
- *Application* renders as a longer text box, an upload field, or a structured form depending on the module's specification (a prompt rewrite is a text box; a classification table is a structured form). Self-graded.

The submit button on the checkpoint block reveals the answer key. The platform records the learner's self-graded score. The learner's recorded score is what counts toward the **six-of-eight** pass rule (or summed credit toward **6.0 / 8.0** when partial scoring is enabled).

**Pass threshold logic.** Score ≥ 6.0 out of 8.0 marks the checkpoint passed. The module is marked complete when the checkpoint is passed and the artifact is accepted. The certificate logic checks all sixteen modules' *complete* flags plus the capstone result.

**Remediation block — UI behavior.** When a learner scores **below 6 of 8** (or below the summed threshold where partial credit applies), the *remediation* block surfaces with the named sub-sections from the module's revision guidance, each rendered as a *go to section* link that scrolls to or opens the specific lesson sub-section. The retry button on the *checkpoint* block stays disabled until the learner has clicked at least one *go to section* link, or 24 hours have elapsed.

**Artifact upload block — UI behavior.** The *artifact upload* block accepts the file format(s) specified in the module's *Portfolio artifact* section. The block displays the filename pattern as a hint. On upload, the platform validates the filename against the pattern and prompts the learner to rename if it does not match (this is a soft prompt, not a hard block — learners can override). The block also displays the named acceptance criteria from the module so the learner can self-check before submitting.

**Capstone block — UI behavior.** Module 16 replaces the standard *checkpoint* block with a *capstone rubric* block. The rubric displays each criterion with the evidence ladder (strong / adequate / weak / missing). The learner self-scores against the rubric (with the self-critique guide rendered alongside) or, in deployments with facilitator access, the facilitator scores. The platform stores the rubric scores per criterion and applies the certificate-readiness logic.

**Certificate trigger.** The certificate is issued automatically when the certificate-readiness rules are all satisfied (all sixteen module checkpoints passed, all sixteen artifacts accepted, capstone meets pass threshold, reflection submitted, disclosure acknowledged). The certificate text is fixed (per the Certificate Readiness document); the platform substitutes the learner's name and the issue date.

**Dashboard surfacing.** The Jifunze dashboard surfaces, per learner: modules complete, modules in progress, modules *not yet passed*, current attempt counts, capstone status, and certificate eligibility. The *return to* list (modules with *not yet passed* checkpoints) is its own dashboard element — a learner who reaches Module 16 with three modules on the *return to* list cannot earn the certificate until they clear the list.

**Analytics signals (internal).** For curriculum improvement, the platform should aggregate (per module): average first-attempt score, average attempts to pass, most-missed question, average artifact acceptance rate, average revision count per artifact. These are internal metrics for the Jifunze curriculum team — they identify modules where assessment difficulty has drifted and questions where wording is producing avoidable failures.

**What the platform should never do.** Skip a checkpoint. Allow a module to mark complete without checkpoint pass and artifact acceptance. Issue a certificate based on a partial capstone. Show learners other learners' scores. Translate *not yet passed* into *failed* in any learner-facing copy.

---

*This document is the assessment contract for Course 1 — AI Essentials. It is paired with `Course1_QA_Checklist.md` (which verifies modules meet the standard) and `Course1_Facilitator_Guide.md` (which gives facilitators the listening cues that used to live inside modules). Together with the seven course-level scaffolding documents named in the Rewrite Plan, these three relocated documents are the off-module spine of Course 1.*
