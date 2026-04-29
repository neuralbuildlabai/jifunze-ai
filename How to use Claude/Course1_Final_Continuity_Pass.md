# Course 1 Final Continuity and Quality Pass

*Audit pass against the modules and course-level documents currently in `/Users/omoke/jifunze-ai/How to use Claude/`. Targeted repair list only — no rewrite, no new modules, no restart.*

---

## 1. Overall readiness verdict

**Ready after minor fixes.**

Course 1 reads as one continuous learning journey from Module 1 through Module 16. The benchmark established by Modules 1, 2, 5, and 6 has held across the rewritten modules. Every module contains the required structural sections (purpose, outcomes, core lesson, fully written worked examples, supplied practice materials, eight-question checkpoint with mixed formats and answer keys, named portfolio artifact with filename, capstone-save reminder, completion evidence, revision guidance, transition). Module 16 uses the rubric model rather than an eight-question quiz, which matches the assessment standard. Continuity bridges from Module 7 onward are visibly designed; transitions read as a single learning arc from mental model through capstone.

The course is not at "ready for mapping" without a small repair pass. Two issues block clean mapping today:

The first is a **filename inconsistency inside Module 16** (`Module16_Capstone_Bundle_[YourName]` versus `Module16_AI_Workflow_Capstone_[YourName]` used in the same file). The Cursor upload validator needs one canonical pattern.

The second is **repeated bridge-and-What-was-wrong boilerplate** across Modules 11–16 ("outline-level in the same way Modules X were outline-level before they were rewritten", "This version turns the outline into a working module", "A learner who finished the original module left with a vague sense that…"). It is honest internal language but it reads as authoring scaffolding inside learner-facing copy. It should be trimmed or moved to author notes before mapping.

There are also a handful of smaller filename and bridge inconsistencies (Modules 3 and 4 do not have a `Continuity bridge from Module X` opening; the Portfolio Guide's short filenames diverge from modules' actual `Module0X_Name_[YourName]` filenames in ways that may confuse the upload validator). These are line-level fixes, not structural ones.

After the targeted Priority-1 fixes in Section 10, the course is mappable. The fundamentals — flow, artifact carry-forward, assessment shape, pathway alignment, capstone integration — are sound.

---

## 2. Module flow check

| # | Title | Previous-module bridge | Next-module transition | Artifact carry-forward | Verdict | Required fix |
|---|---|---|---|---|---|---|
| 1 | What AI Is and What It Is Not | n/a (course opening) | Strong — names belief poll feeding M2; mental-model carries forward | Strong — AI Use Boundary explicitly forwarded to M9 and M16 | Pass | None |
| 2 | Myths, Reality, Bias, and Responsible Judgment | Implicit (no labeled bridge); follows naturally from M1 | Strong — names M3–M5 prompt skill on the judgment posture | Strong — Responsible Judgment Checklist forwarded to M6, M9, M10, M16 | Pass | None |
| 3 | Prompts as Control | Implicit; opens with "What was preserved" not a bridge | Strong — names M4's role/output/review extension; calls out M5/M15/M16 reuse | Strong — Prompt Rewrite forwarded to M4, M5, M15, M16 | Pass with one note | Add a one-paragraph "Continuity bridge from Module 2" opener to match the M7-onward convention (Priority 3) |
| 4 | Prompt Engineering — Structure, Constraints, Output Design | Implicit; opens with "What was preserved" | Strong — names M5's iteration discipline as the next floor; cites artifact reuse to M5/M15/M16 | Strong — Structured Prompt Template forwarded to M5, M15, M16 | Pass with one note | Add "Continuity bridge from Module 3" opener (Priority 3) |
| 5 | Prompt Engineering — Iteration, Comparison, Reviewable Workflows | Implicit; M2 transition already pointed at M3–5 as a block | Strong — names M6 verification on "usable but not yet trustworthy" outputs | Strong — Prompt Version Log forwarded to M15 prompt pack and M16 capstone | Pass | None |
| 6 | Evidence, Verification, Source-Aware AI Use | Implicit; M5 transition primed it | Strong — names M7's audience question on top of verified content | Strong — Claim Verification Table reused in M11, contributes to M16 rubric | Pass | None |
| 6 → 7 | — | — | — | — | Bridge present in M7 (`Continuity bridge from Module 6`) and reads cleanly | Pass | None |
| 7 | AI for Writing, Communication, Audience Fit | Strong — explicit `Continuity bridge from Module 6`; reframes verification question for audience fit | Strong — names inward turn for M8; preserves discipline | Strong — Audience-Fit Pack forwarded to M9, M14, M15, M16 | Pass | None |
| 7 → 8 | — | — | — | — | Bridge in M8 names the outward/inward shift cleanly | Pass | None |
| 8 | AI for Learning, Study, Understanding | Strong — names earlier skills (M3 depth, M4 retrieval setup, M5 iteration, M6 verification, M7 teach-back) | Strong — names M9's responsibility framing on top of study discipline | Strong — Teachback + Repair Plan forwarded to M9, M15, M16 | Pass | None |
| 8 → 9 | — | — | — | — | Bridge clean and conceptually accurate | Pass | None |
| 9 | Responsible AI Use, Accountability, Guardrails | Strong — `Continuity bridge from Module 8`; explicitly repositions M9 as bridge between foundation and applied | Strong — names M10's privacy floor and the "fingers at the keyboard" handoff | Strong — Accountability Statement forwarded to M10, M12, M13, M14, M16 | Pass | None |
| 9 → 10 | — | — | — | — | Bridge spelled out in M9 and absorbed in M10's lesson; M10 itself does not have a labeled `Continuity bridge from Module 9` opening (it uses `What was wrong before`) | Pass with note | Add a short `Continuity bridge from Module 9` paragraph at the top of M10, mirroring M7–M9 convention (Priority 2) |
| 10 | Privacy, Risk, Boundaries, Safe Operational Use | Implicit; opens with "What was wrong before" because module was relocated from M15 | Strong — names M11's source-handling under privacy floor | Strong — Privacy/Safety Checklist forwarded to M11, M12, M14, M15, M16 (called out by name) | Pass with note | Add Continuity bridge as above |
| 10 → 11 | — | — | — | — | M11's `Continuity bridge from Module 10` is the strongest bridge in the course — it explicitly names three habits to carry forward | Pass | None |
| 11 | AI for Research, Analysis, Synthesis | Strong — three carry-forward habits named explicitly | Strong — names M12 workflow shift; "shape" framing carries into M12's opening | Strong — Synthesis Brief forwarded to M12, M13, M15, M16 | Pass | None |
| 11 → 12 | — | — | — | — | M12 picks up "the shape" metaphor verbatim — strongest carryover in the course | Pass | None |
| 12 | AI for Workflows, Automation, Agents | Strong — "shape" metaphor extended; M11 + M10 carries named | Strong — names M13's decision-question shift on top of workflow design | Strong — Workflow/SOP/Agent-readiness forwarded to M13, M14, M15, M16 | Pass | None |
| 12 → 13 | — | — | — | — | Clean — workflow-as-structure for decisions framing | Pass | None |
| 13 | AI for Decision Support and Critical Thinking | Strong — four carry-forward habits from M12; principle stated ("AI may support thinking; the decision remains human-owned") | Strong — names M14 shared-work shift; lists every prior module the discipline depends on | Strong — Decision Memo forwarded to M14, M15, M16 | Pass | None |
| 13 → 14 | — | — | — | — | Clean — solo-to-shared shift well-framed | Pass | None |
| 14 | AI in Teams and Organizations | Strong — four carry-forward disciplines (M9, M10, M12, M13) named with their unit-of-work shift | Strong — names M15 packaging move on top of standards | Strong — Team Agreement forwarded to M15, M16; solo-learner alternative present | Pass | None |
| 14 → 15 | — | — | — | — | Clean — pointed reference to M14's prompt-library rule that M15 will fully build out | Pass | None |
| 15 | Building Reusable AI Systems — Prompt Packs and Playbooks | Strong — seven carry-forward elements from earlier modules; principle clean | Strong — names M16 capstone using the toolkit produced here | Strong — Prompt Pack + Playbook is the single biggest input to M16; explicitly named as required | Pass | None |
| 15 → 16 | — | — | — | — | Bridge in M16 enumerates all 15 prior artifacts and where each plugs into the capstone | Pass | None |
| 16 | Capstone — End-to-End AI-Supported Workflow | Strong — explicit bridge naming the toolkit; six integration disciplines named | Strong (course completion transition) — names each pathway's natural next step without overpromising | Strong — pulls in M1, M3, M4, M5, M6, M9, M10, M11, M12, M13, M14, M15 by name | Pass with one note | Filename pattern is inconsistent inside the module (see Section 10, Priority 1) |

Bridges 6→7, 7→8, 8→9, 10→11, 11→12, 12→13, 13→14, 14→15, 15→16 all read as a continuous arc. Bridge 9→10 is conceptually present but lacks the labeled `Continuity bridge from Module 9` opener that M7, M8, M9, M11, M12, M13, M14, M15, M16 share. Bridges entering M3, M4, M5, M6 predate the convention and are conceptually fine but stylistically uneven. Either accept as-is (the early modules opened the convention) or align as Priority 3.

---

## 3. Repeated wording and boilerplate check

| Repeated phrase or pattern | Where it appears | Why it weakens the course | Suggested targeted replacement |
|---|---|---|---|
| "The original version of this module was outline-level in the same way Modules [X], [Y], [Z] were outline-level before they were rewritten." | M11 line 13, M12 line 13, M13 line 13, M14 line 13, M15 line 13, M16 line 23 (six times) | Reads as authoring scaffolding leaking into learner copy. Tells the reader the course was rewritten — a fact that matters to authors, not learners. | Replace with one specific sentence per module naming what was missing (e.g., M11: *"The original module named research framing, summarisation, comparison, and synthesis but did not work them out — examples and source materials were missing."*). Or move the "What was wrong before" block entirely to author notes and keep only "What was improved" learner-facing. |
| "This version turns the outline into a working module." | M11, M12, M13, M14, M15 (five times) | Same problem — author meta-language. | Delete the sentence; the "What was improved" content speaks for itself. |
| "A learner who finished the original module left with a vague sense that…" | M11 line 17, M12 line 21 (also implicit in M13–M16) | Author meta-language about previous version. | Delete; the improvements are visible in the module itself. |
| "Module N helped you [verb]…" as opener for the next-module transition | M7, M8, M11, M12, M13, M14, M15 (seven times); M16 course-completion uses similar shape | Reasonable in isolation but stacked across modules it reads as a template. | Vary the opener: name a specific skill the learner just demonstrated, or quote a principle from the module just finished, rather than starting every transition with "Module N helped you…". Two or three transitions with this opener is fine; seven is too many. |
| "Save the file now under the correct name; do not leave it for capstone week." | M11 line 445, M12 line 625, M13 line 546 (three times, near-identical) | Reads as a copy-paste capstone-save reminder. The principle is correct but the wording is identical. | Replace each occurrence with the artifact-specific reason: M11: *"The synthesis brief is one of the named capstone components — saving it now means the brief lives where you can find it under deadline."* M12: *"The workflow map is the structural backbone of the capstone — saving it now prevents rebuilding the map under capstone time pressure."* M13: *"The decision memo is the artifact a capstone whose final stage is a decision will use directly — save it once, reuse it then."* |
| "Save it where you can find it." | M3 line 401, M4 line 542, M10 line 399 (three times); also implicit in M1, M2, M5, M6 capstone-save reminders | Generic. Doesn't signal which file or why this one. | Replace with concrete: *"Save it as `Module04_Structured_Prompt_Template_[YourName].pdf` in your portfolio folder; you will reuse it in Modules 5, 15, and 16 by name."* The filename is the cue. |
| "This is the most serious failure mode and the one with consequences beyond the module." | M11 line 473, M12 line 656 (twice) | Two modules calling the same failure "the most serious" reduces the weight of either claim. | M11 and M12 are both pointing at privacy violations; keep the claim once (M10 is the natural home), and have M11 and M12 say *"This failure mode breaks the safety floor Module 10 set; revisit Module 10 before retrying this module."* |
| "Carry forward [N] things in particular." | M9 line 7, M11 line 9, M12 line 9, M13 line 9, M14 line 9, M15 line 9 (six times) | Becomes a formula. Six modules in a row using the same opener for the carry-forward block. | Vary: *"Three habits from Module X stay active throughout this module: …"* / *"Two of Module X's disciplines apply directly here: …"* / *"You will use Module X's [specific tool] at every step of this module."* The variation matters more than the count. |
| "The principle that holds [this module / Module X] together is short: …" | M13 line 11, M15 line 11, M16 line 11 (three times); M14 has a similar "principle for this module, written down so you can keep it in front of you" line 11 | Pattern repeats. The principle itself is good (decision human-owned, packaging matters, integration is the hard part); the framing sentence is repetitive. | Drop the framing sentence and just state the principle: *"AI may support thinking. The decision remains human-owned."* — no preamble needed. |
| Generic "do all of this without [exposing / abandoning / losing]" closers in transitions | M11 line 477 ("without exposing sensitive source material"), M12 line 660 ("without abandoning the privacy discipline"), M13 line 580 (similar shape), M14 line 546 (similar shape) | Closer-template. | Pick one transition per module to use the "without losing X" shape; for the others, name the specific next-module disciplines instead. |
| "do not leave it for capstone week" | M11, M12, M13 | (Listed above — captured for completeness) | (As above) |
| Filename phrasing in artifact-save block | M11, M12, M13 ("substitute your real name in the bracketed field; do not include the brackets in the actual filename") | Repeated three times verbatim. Useful note but should be in the Portfolio Guide once, not three modules. | Move to Portfolio Guide / Cursor upload-validator hint. Modules can drop the parenthetical. |

**No "premium" language found.** Spot-checks against the boilerplate banned list (Section 8 of the Quality Benchmark) returned zero hits for "premium," "world-class," "transformative," or "premium completion upgrade." The "Validation and quality assurance checklist" / "Self-learner success path" / "Automated/self-paced checkpoint recommendation" / "Minimal facilitator intervention points" five-block tail does not appear in any improved module. The repeated sixteen-times "Intervene only if the learner shows overtrust…" paragraph does not appear. The benchmark removed those successfully.

**No facilitator-only language found inside learner-facing copy.** Spot-check against "the facilitator will" / "ask the group" / "as a class" — no hits in M3, M4, M7–M16. M14 explicitly handles the team/solo split with named alternatives.

**No self-congratulatory wording found.** Spot-check against "this module will change," "you'll absolutely love," "world-class" — zero hits.

---

## 4. Artifact continuity map

| Module | Artifact | Reused later in | Capstone relevance | Filename pattern in module | Acceptance criteria | Fix needed |
|---|---|---|---|---|---|---|
| M1 | AI Use Boundary | M9 (revisited), M16 (capstone scoping) | Direct — sets honest framing for capstone workflow | `Module01_AI_Use_Boundary_[YourName].pdf` (in module text); Portfolio Guide names `M01_AI_Use_Boundary.md` | Yes — generic-vs-specific test in revision guidance | Reconcile filenames: either use `Module01_…[YourName]` everywhere (recommended) or `M01_…` everywhere. Currently the Portfolio Guide and Certificate Readiness use the short form; modules use the long form. (Priority 2) |
| M2 | Responsible Judgment Checklist | M6, M9, M10, M16 | Direct — feeds bias and verification rubrics in capstone | `Module02_Responsible_Judgment_Checklist_[YourName].pdf` | Yes | Same filename reconciliation as M1 |
| M3 | Before/after prompt rewrite + reusable prompt contract | M4, M5, M15 (prompt pack candidate), M16 | Direct — prompt contract becomes M15 pack starting point | `Module03_Prompt_Rewrite_[YourName].pdf` | Yes | Same filename reconciliation |
| M4 | Structured prompt template + 3 reusable patterns | M5 (V1 input to comparison), M15 (pack), M16 | Direct — patterns are the reuse skeleton | `Module04_Structured_Prompt_Template_[YourName].pdf` | Yes | Same filename reconciliation |
| M5 | Prompt version log + comparison matrix | M15, M16 | Direct — version-log habit carries into capstone prompt set | `Module05_Prompt_Version_Log_[YourName].pdf` | Yes | Same filename reconciliation |
| M6 | Claim Verification Table | M9, M11, M13, M16 | Direct — verification habit is a capstone rubric criterion | `Module06_Claim_Verification_Table_[YourName].pdf` | Yes | Same filename reconciliation |
| M7 | Audience-Fit Communication Pack (incl. job-search artifact) | M9, M14, M15, M16 | Direct where capstone produces written output | `Module07_Audience_Fit_Communication_[YourName].pdf` | Yes | Same filename reconciliation |
| M8 | Teachback + Repair Plan | M9, M15, M16 | Direct if capstone is study/upskilling workflow | `Module08_AI_Learning_Repair_Plan_[YourName].pdf` | Yes — five-question reviewer test in artifact | Same filename reconciliation |
| M9 | Use-case risk review + guardrail checklist + accountability statement | M10, M12, M13, M14, M16 (capstone disclosure) | **Required input** — accountability statement adapts into capstone disclosure | `Module09_Responsible_AI_Guardrails_[YourName].pdf` | Yes — five-question acceptance criterion | Same filename reconciliation |
| M10 | Data classification + safer prompt rewrite + operational safety checklist | M11, M12, M14, M15, M16 | **Required input** — capstone safety criterion is fail-state | `Module10_Privacy_Safety_Checklist_[YourName].pdf` ✓ | Yes — six-part artifact spec | None — this filename matches Portfolio Guide |
| M11 | Research scope brief + source comparison grid + synthesis brief | M12 (workflow source), M13 (decision input), M15, M16 | Direct if capstone is research/reporting | `Module11_Research_Synthesis_Brief_[YourName].pdf` ✓ | Yes — three-sentences-traceable acceptance criterion | None |
| M12 | Workflow map + AI-assist decision table + reviewable SOP + agent-readiness assessment | M13 (structural backdrop), M14 (team agreement basis), M15, M16 (**required input**) | **Required input** — workflow map is capstone backbone | `Module12_Workflow_Agent_Readiness_[YourName].pdf` (vs Portfolio Guide `M12_Workflow_And_Agent_Readiness.md`) | Yes — three-stage trace acceptance criterion | Reconcile filename — either `_Workflow_Agent_Readiness_` or `_Workflow_And_Agent_Readiness_`. (Priority 2) |
| M13 | Decision criteria table + options/tradeoffs matrix + decision memo | M14, M15, M16 | Direct if capstone supports a decision | `Module13_Decision_Memo_[YourName].pdf` ✓ | Yes — three-sentences-traceable acceptance criterion | None |
| M14 | Team AI use agreement + responsibility map + shared prompt artifact | M15 (prompt-library rules), M16 | Direct if capstone simulates shared work; solo-learner path documented | `Module14_Team_AI_Use_Agreement_[YourName].pdf` (vs Portfolio Guide `M14_Team_Agreement.md`) | Yes — six-section artifact spec | Reconcile filename. (Priority 2) |
| M15 | Prompt pack + usage and boundary notes + test log | M16 (**required input**) | **Required input** — capstone extends this pack | `Module15_Prompt_Pack_Playbook_[YourName].pdf` (vs Portfolio Guide `M15_Prompt_Pack_v1.md`) | Yes — fresh-scenario test acceptance criterion | Reconcile filename. (Priority 2) |
| M16 | End-to-end capstone bundle (11 components) | n/a — final artifact | This is the capstone | **Two filenames in same module:** `Module16_Capstone_Bundle_[YourName].(pdf\|docx\|md)` (line 99) AND `Module16_AI_Workflow_Capstone_[YourName].pdf` (lines 685, 693) | Yes — rubric self-check + 11-component checklist | **Priority 1 — pick one.** Recommended: `Module16_AI_Workflow_Capstone_[YourName].pdf` (it appears twice and matches the artifact name; the Portfolio Guide uses `M16_Capstone_Portfolio.md` which is also different). Pick one canonical pattern and replace the other across the module and the Portfolio Guide / Certificate Readiness if needed. |

**Trajectory toward M15 prompt pack and M16 capstone is visible.** Every module 3 through 14 names a downstream module by number. M15 names the entire upstream chain. M16 names every input by module number. The trajectory is legible to a self-learner reading start-to-end.

**Trajectory toward Jifunze portfolio is clean.** Every module produces a named artifact with a filename and acceptance criterion, and the Portfolio Guide aggregates them. The aggregator filenames are slightly different from the per-module filenames — see Priority 2 fix.

**Trajectory toward pathway proof is clean.** Modules 7, 9, 10, 12, 13, 15, 16 each include a "Pathway connection" section that maps the artifact to specific Jifunze pathways without overclaiming. M11 and others mention pathway fit in passing. Coverage is sufficient.

---

## 5. Assessment consistency check

**Passed modules (eight-question checkpoints, mixed formats, answer keys with strong-answer criteria, 6-of-8 pass rule all visible):** M1, M2, M3, M4, M5, M6, M7, M8, M9, M10, M11, M12, M13, M14, M15. Spot checks confirm each has at least 2 multiple-choice, 2 scenario, 2 short-answer, and at least 1 application item per the Assessment Standards. Answer keys explain why the correct answer is correct and what strong/partial/unacceptable looks like for the open items. No "answers will vary" without rubric.

**M16 — capstone uses the rubric model rather than an eight-question quiz, which matches the Assessment Standards spec for the capstone block.** Rubric covers seven criteria (problem framing, prompt and workflow design, verification and review, safety and privacy, usefulness of final output, reusability and transfer, reflection and improvement) at four evidence levels (Not ready, Developing, Ready, Strong). Pass threshold: every criterion at Ready or higher, at least four at Strong. This matches the Assessment Standards section on capstone.

**Modules needing quiz repair:** None block-level. Two soft items worth flagging:

The first is M3's recall question on T-C-C-F-A. Question 1 in the M3 checkpoint is acceptable but sits close to the "what does T-C-C-F-A stand for?" pattern the Assessment Standards explicitly flags as recall-only. M3 already mitigates this by phrasing the question as a function-test rather than a vocabulary test. Acceptable as-is, but worth a one-line review during Cursor mapping QA: confirm the wording asks about *what each element does to a prompt*, not the acronym itself.

The second is the application question count. Some modules have one application item (the minimum); others (M9, M10, M11, M12, M13, M15) have one application item plus a longer scenario as Q8 — which the Assessment Standards explicitly allow. Both shapes are within the standard. No fix needed.

**No repeated question patterns that feel lazy.** Spot-check: scenarios across modules use different contexts (Nairobi salon, school office, HR grievance, mama-mboga shop, freelance brief, accountancy firm, NGO programs lead) rather than recycling one setup. Distractors test the misconception each module specifically corrects. Application items produce reviewable outputs (rewritten prompts, classification tables, decision memos, prompt-pack entries).

**Specific suggested repairs:** None at the question-design level. Run one final QA pass during Cursor mapping to verify each rubric-graded question's strong-answer criteria are actually rubric criteria (named elements an answer must contain) rather than vague qualitative descriptions. Sample audit on M9, M11, M13 confirms they meet this; spot-check the remaining modules during mapping.

---

## 6. Self-learner readiness check

**Issues found** (each is small; none block self-learner completion):

**Issue 1 — M14's team-flavoured language defaults to "you and your team," with the solo alternative supplied but introduced late.** M14 line 9 onward uses team framing (*"more than one person is in the loop,"* *"a team where every member is individually skilled"*) before naming the solo alternative. The solo path is present (later in the module) and is a real path with worked examples. The fix is to surface the solo alternative earlier — ideally in the `What was improved` block — so a self-learner without a team knows from line one that the module is built for them too.

*Targeted fix:* Add a single sentence in M14's `What was improved` block: *"Every team activity has a documented solo-learner path using a hypothetical four-person team; you can complete this module alone."* (Priority 3.)

**Issue 2 — M16's "peer or facilitator review" framing is a fallback to self-critique, but the order of presentation suggests peer/facilitator is the default.** M16 line 95 reads *"Either a peer or facilitator review (when one is available in your deployment) or the self-critique fallback…"*. Self-learners will read that and assume they are the exception. The Assessment Standards (and the existing M16 self-critique fallback) make clear self-critique is the default for Course 1.

*Targeted fix:* Reverse the order in M16 line 95 to read *"The self-critique fallback (described below) — or, in deployments with peer or facilitator review available, that review."* The fallback is the default; the peer/facilitator review is the layer-on. (Priority 2.)

**Issue 3 — Two filename inconsistencies between Portfolio Guide / Certificate Readiness and individual modules** (M3, M4, M5, M6, M7, M8, M9, M12, M14, M15, M16 — see Section 4 table). A self-learner saving an artifact under the per-module filename will then see the Portfolio Guide list a different filename for the same artifact. They will either rename, ask, or get confused. The Cursor upload-validator will reject one or the other.

*Targeted fix:* Adopt one canonical pattern. Recommendation: use `ModuleXX_Name_[YourName].pdf` (the form used inside modules) everywhere; update the Portfolio Guide table and Certificate Readiness evidence list. (Priority 1 — names matter for upload-block validation.)

**Issue 4 — M16 capstone names a 24-hour pause inside the self-critique step.** This is correct and required, but a self-learner under deadline pressure may skip it. M16 names the rule but does not prevent skipping it.

*Targeted fix:* No content change required (the rule is already in M16 and the Capstone Prep guide). Cursor mapping should consider rendering the 24-hour pause as a soft platform timer that prompts the learner *"You started the capstone yesterday — return for self-critique now"* rather than as in-text instruction alone. This is a Cursor-side change, not a Claude-side change. (Priority 3.)

**Sections searched, no issues found:**

- "Ask your group" without solo alternative: 0 hits in modules 3–16.
- "The facilitator will provide" without supplied content: 0 hits.
- "Choose any scenario" without supplied scenarios: 0 hits.
- Practice tasks requiring un-supplied external materials: 0 hits — every module spot-checked supplies the source content (M11 source excerpts, M12 workflow scenarios, M13 supplied AI recommendations, M14 supplied team scenarios, M15 supplied first-version prompts).
- Missing revision guidance: 0 hits — every module has a Revision guidance section keyed to specific failure modes, naming specific sub-sections, with three to seven failure modes (within the Assessment Standards' three-cap; M9, M10, M12, M13, M15 exceed three but each one maps to a distinct, named failure mode rather than redundant entries; acceptable interpretation of the cap).

The course is self-learner-ready end-to-end. The four issues above are line-level fixes, not structural ones.

---

## 7. Pathway and employability alignment

**Alignment verdict: aligned, with the right level of restraint on outcome promises.**

**Digital Work Starter.** Covered by Pathway Map and surfaced inside M1, M2, M7, M9, M10, M12 explicitly. Language is concrete (*"office assistant in a small accountancy firm in Nairobi who runs the Friday weekly recap"*). No job guarantees. Module-level pathway-connection notes consistent.

**AI Productivity Professional.** Covered by Pathway Map and surfaced inside M3, M4, M5, M11, M12, M15, M16. Strongest pathway anchor — every prompt-engineering, workflow, and reusable-systems module names this pathway as primary fit. Concrete, no overclaiming.

**Remote Work and Freelancing.** Covered by Pathway Map and surfaced inside M7 (job-search artifact), M9 (accountability statement adaptable for proposals), M10 (client data handling), M14 (collaboration adapted for client work), M15 (deliverable toolkit), M16 (showcase). Concrete, no overclaiming.

**Small Business and Entrepreneurship.** Covered by Pathway Map and surfaced inside M7, M9, M10, M11, M12, M13. Kenya context (mama-mboga, salon, tailoring, tutoring service, delivery operation) is concrete and globally readable. No income guarantees.

**Junior Tech Builder.** Covered by Pathway Map and surfaced inside M3, M4, M5, M6, M10, M12, M15. Pathway Map is explicit that Course 1 is not a coding course and does not certify the learner as a junior AI engineer; module-level pathway connections respect that.

**Missing pathway references:** None at the module level. Every module 3–16 spot-checked names at least one pathway in its `Pathway connection` block or its `Capstone-save reminder`. M1 and M2 mention pathways through the AI Use Boundary's downstream use — acceptable, since those modules build the foundation rather than produce pathway-specific artifacts.

**Wording repairs (none required, two minor optional polish items):**

The first is the M11 transition (line 477): *"You learned to do all of this without exposing sensitive source material to the tools you used."* The phrasing is correct; if the closer pattern across modules is being trimmed (Section 3), this transition is one of the candidates.

The second is the M16 course-completion transition (line 793). The pathway sentences are well-calibrated and avoid overclaiming. They are slightly uniform in shape (*"X learners build on this foundation in pathway courses focused on…"* repeated five times). Optional varied wording could improve readability; not required for mapping.

**No job/income guarantees found.** Spot-checks against "guarantee," "you will get a job," "you will earn," "certified to," "accreditation": zero hits in problematic contexts. Pathway Map's "What Course 1 does not prepare you for alone" section is exemplary in setting the limits explicitly. Certificate Readiness section "What it does not mean" mirrors this.

**No accreditation overclaiming found.** The certificate language consistently describes itself as Jifunze's own credential, not external accreditation. This is correct.

**Kenya relevance is well-balanced.** KES, Nairobi, M-Pesa, KRA, iTax, Kenyatta University, Safaricom, mama-mboga, matatu, county-level coordinator references appear without explanation and remain readable globally. Pathway Map's "Global relevance" section is exemplary.

---

## 8. Capstone readiness check

**Capstone readiness verdict: ready, with one critical filename fix and one re-ordering fix (both listed in Section 10).**

**Capstone uses earlier artifacts:** Yes, explicitly. M16 lines 5–9 enumerate every prior artifact and where it plugs in. M16's "Reusing earlier artifacts" section makes this explicit at the table level. Capstone Prep document carries the same dependency table around Module 9, again at Module 12, and again at Module 15 — staged preparation is in place.

**Fully worked example exists:** Yes. M16 Part B has a complete worked capstone example (lines 363+) covering all eleven components, plus an optional second mini-example (line 579+). A self-learner has a model artifact to grade against.

**Self-critique fallback exists:** Yes. M16 line 201 onward names the eight-step self-critique method (24-hour pause, named-reader test, claim-trace test, privacy review, usefulness test, prompt review, revision log, final confidence note). The fallback is a method, not vague advice — meets Assessment Standards.

**Rubric is usable:** Yes. M16 lines 243+ provide a four-level rubric (Not ready, Developing, Ready, Strong) for each of seven criteria, with descriptions in the language of the capstone task rather than generic adjectives. A learner can self-grade.

**Certificate-readiness criteria are clear:** Yes. M16 line 320+ names the conditions, mirroring Certificate Readiness document.

**Final portfolio packaging is clear:** Yes. M16 lines 689+ list eleven required contents in order, with formats and the Portfolio Guide reference. Course1_Portfolio_Guide.md aligns.

**Disclosure guidance is included:** Yes. M16 component 11, plus Course1_Disclosure_Note.md is referenced.

**Learner knows what to submit:** Yes. M16 line 695+ "Required contents (in this order)" is explicit. The 11-component structure is repeated in three places (capstone overview, portfolio artifact spec, completion evidence) so a learner will encounter it whichever section they read first.

**Missing pieces:**

The first is the **filename inconsistency inside M16 itself** (`Module16_Capstone_Bundle_[YourName]` at line 99 versus `Module16_AI_Workflow_Capstone_[YourName]` at lines 685 and 693). This is the single biggest blocker for clean Cursor mapping of the capstone block. (Priority 1.)

The second is the **soft-implication that peer/facilitator review is the default** (Section 6, Issue 2). The fallback is the default for Course 1. (Priority 2.)

**Targeted fixes — both listed in Section 10.**

---

## 9. Cursor mapping readiness

**Ready modules (eight platform blocks mappable without rewriting core teaching):** M3, M4, M5, M6, M7, M8, M9, M10, M11, M12, M13, M14, M15. Each has explicit `Notes for Cursor mapping` block at end with suggested module ID, session/block breakdown across the eight platform blocks (overview, concept, guided example, practice, reflection, checkpoint, artifact upload, remediation), content block types, quiz mapping notes, artifact mapping notes, and special UI needs.

**Module IDs assigned:** ae-m03, ae-m04, ae-m05, ae-m06, ae-m07, ae-m08, ae-m09, ae-m10, ae-m11, ae-m12, ae-m13, ae-m14, ae-m15. M16 has its own mapping notes (line 799+). Modules 1 and 2 in the benchmark file do not have explicit `ae-m01` / `ae-m02` Cursor IDs in the cell I reviewed — confirm during mapping pass; if absent, add `ae-m01` and `ae-m02` for consistency.

**Modules needing mapping notes repair:**

The first is **M1 and M2 — confirm Cursor mapping notes at end.** The benchmark module file ends with the Quality Benchmark text rather than per-module mapping notes for M1 and M2. M5 and M6 in the same file may also lack explicit Cursor mapping notes. (M1, M2, M5, M6 are the benchmark modules and may have been written before the Cursor-mapping-notes convention was added to the standard.) (Priority 2.)

The second is **M16 capstone block — special UI need.** M16 replaces the standard checkpoint block with a `capstone rubric` block per the Assessment Standards. The M16 mapping notes name this. Confirm during Cursor mapping that the rubric block accepts seven criteria with four evidence levels and self-grading; this is not a content change but a UI-component decision the platform team must make. (Priority 3 — not a content fix.)

**Specific fixes:**

The first is **align module IDs across the course (ae-m01 through ae-m16) and verify Modules 1, 2, 5, 6 each have their own mapping-notes block.** If any are missing, add a short mapping notes block matching the other modules' structure (suggested module ID, eight-block breakdown, quiz mapping, artifact upload pattern, remediation pattern). (Priority 2.)

The second is **fix the M16 dual filename pattern before mapping** so the artifact-upload block validator has one pattern to enforce. (Priority 1, see Section 10.)

The third is **decide on filename canon (`ModuleXX_Name_[YourName]` vs `MXX_Name`) before mapping** so the Portfolio Guide aggregator and the per-module upload validators agree. (Priority 1.)

**No duplicate or missing module IDs found in the modules I reviewed.**

**Quiz mapping notes and artifact mapping notes are detailed.** M9, M10, M11, M12, M13, M14, M15, M16 each provide per-question component recommendations (radio for multiple-choice, text-box length for scenario, structured form for application, etc.) and per-artifact upload patterns (file format, filename validator, acceptance criteria displayed inline). Cursor team has working specifications.

---

## 10. Final targeted repair list

### Priority 1 — must fix before mapping

**1. Module 16 filename inconsistency.** Two different filename patterns appear in the same module: `Module16_Capstone_Bundle_[YourName].(pdf|docx|md)` (line 99) and `Module16_AI_Workflow_Capstone_[YourName].pdf` (lines 685, 693). The Cursor upload-validator needs one canonical pattern.

- *File:* `Jifunze_Course1_Module_16_Improved.md`
- *Recommended fix:* Replace line 99's filename with `Module16_AI_Workflow_Capstone_[YourName].(pdf|docx|md)` so the bundle and the artifact name match. Verify Portfolio Guide and Certificate Readiness use the same canon.
- *Owner:* Claude.

**2. Filename canon mismatch between Portfolio Guide and modules.** Portfolio Guide and Certificate Readiness use the short pattern `MXX_Name.md`; modules use `ModuleXX_Name_[YourName].(pdf|docx)`. The two collide at upload-validator time.

- *Files:* `Course1_Portfolio_Guide.md` (table), `Course1_Certificate_Readiness.md` (Evidence required list), every module's Portfolio artifact and Module completion evidence sections.
- *Recommended fix:* Adopt `ModuleXX_Name_[YourName].(pdf|docx)` as canonical (matches what learners actually save and what the upload validator will check). Update the Portfolio Guide table and Certificate Readiness evidence list in one pass.
- *Owner:* Claude (one editing pass on Portfolio Guide and Certificate Readiness; modules already use the canonical form).

### Priority 2 — should fix before launch

**3. Module 10 missing labeled `Continuity bridge from Module 9` opener.** M10 opens with `What was wrong before` because the module was relocated from M15. The continuity is in M9's transition; M10 should mirror the M7–M9 convention.

- *File:* `Jifunze_Course1_Module_10_Improved.md`
- *Recommended fix:* Add a short paragraph at the top under the heading `## Continuity bridge from Module 9`, summarising in two or three sentences what M9 set up (responsibility, accountability, guardrails, the pause-and-escalate move) and how M10 turns those into operational privacy and safety habits. The text already exists at the end of M9's transition (line 426); adapt that paragraph.
- *Owner:* Claude.

**4. M16 self-critique-as-fallback ordering.** Line 95 currently presents peer/facilitator review first and self-critique as fallback. For Course 1 (default self-paced), self-critique is the default.

- *File:* `Jifunze_Course1_Module_16_Improved.md`
- *Recommended fix (line 95):* Replace *"Either a peer or facilitator review (when one is available in your deployment) or the self-critique fallback (described in Self-critique fallback below)."* with *"The self-critique fallback (described in Self-critique fallback below) — or, in deployments with peer or facilitator review available, that review layered on top of self-critique."*
- *Owner:* Claude.

**5. M1, M2, M5, M6 confirm Cursor mapping notes blocks.** Benchmark modules may lack the per-module Cursor mapping notes block that M3–M16 have.

- *File:* `Jifunze_Course1_Modules_1_2_5_6_Improved.md`
- *Recommended fix:* For each of the four modules, add a `## Notes for Cursor mapping` block at the end with suggested module ID (`ae-m01`, `ae-m02`, `ae-m05`, `ae-m06`), eight-block breakdown, quiz mapping notes, artifact upload pattern, and remediation pattern. Use any one of M9–M15's mapping notes blocks as the template. Do not rewrite the modules.
- *Owner:* Claude.

**6. Trim author meta-language ("outline-level in the same way," "This version turns the outline into a working module," "A learner who finished the original module left with…") from M11–M16.**

- *Files:* `Jifunze_Course1_Module_11_Improved.md`, `Jifunze_Course1_Module_12_Improved.md`, `Jifunze_Course1_Module_13_Improved.md`, `Jifunze_Course1_Module_14_Improved.md`, `Jifunze_Course1_Module_15_Improved.md`, `Jifunze_Course1_Module_16_Improved.md`.
- *Recommended fix:* In each module's `What was wrong before` block, delete the sentence that says the original was "outline-level in the same way Modules X were outline-level before they were rewritten." Keep the specific gap descriptions (the worked examples were not written, the practice activity materials were not supplied, the checkpoint was stubs) — those are useful. Drop the "This version turns the outline into a working module" sentence; the `What was improved` block speaks for itself. Drop the "A learner who finished the original module left with a vague sense that 'AI can help with X'" sentences. Each module's edit is one to three sentences.
- *Owner:* Claude.

**7. Reconcile M12, M14, M15 filenames with Portfolio Guide.** Portfolio Guide names `M12_Workflow_And_Agent_Readiness.md`, `M14_Team_Agreement.md`, `M15_Prompt_Pack_v1.md`. Modules use `Module12_Workflow_Agent_Readiness_[YourName]`, `Module14_Team_AI_Use_Agreement_[YourName]`, `Module15_Prompt_Pack_Playbook_[YourName]`.

- *Files:* `Course1_Portfolio_Guide.md`, optionally `Course1_Certificate_Readiness.md`.
- *Recommended fix:* This is rolled into Priority 1 #2 (filename canon). When updating the Portfolio Guide to use `ModuleXX_Name_[YourName]`, ensure M12, M14, M15 entries match the module-level filenames exactly.
- *Owner:* Claude.

### Priority 3 — polish later

**8. Vary the "Module N helped you…" transition opener.** Seven modules use the same opener for the next-module transition.

- *Files:* M7, M8, M11, M12, M13, M14, M15.
- *Recommended fix:* Rewrite the first sentence of the `Transition to the next module` block in three of the seven to vary the opener. Examples: *"You can now [specific skill]."* / *"Three habits stay live as you move into Module N: …"* / *"The principle from Module N — [the principle] — carries forward."* Two- or three-sentence variation only; do not rewrite the transitions in full.
- *Owner:* Claude.

**9. Add Continuity bridge openers to M3 and M4.** Both modules predate the convention used in M7–M16.

- *Files:* `Jifunze_Course1_Module_03_Improved.md`, `Jifunze_Course1_Module_04_Improved.md`.
- *Recommended fix:* Add a short `## Continuity bridge from Module 2` section at the top of M3 (paragraph summarising M2's review posture, named verbatim from M2's transition at line 580). Add `## Continuity bridge from Module 3` at the top of M4 (paragraph summarising M3's prompt-as-control surface, from M3's transition at line 443). One paragraph each. Do not edit the existing `What was preserved` or `What was improved` blocks.
- *Owner:* Claude.

**10. M14 surface solo-learner alternative earlier.** M14's solo path is real and well-documented but appears late in the module structure; a self-learner reading the opener could think the module is team-only.

- *File:* `Jifunze_Course1_Module_14_Improved.md`
- *Recommended fix:* Add one sentence in the `What was improved` block (around line 25) reading *"Every team activity has a documented solo-learner alternative using a hypothetical four-person team; you can complete this module alone."*
- *Owner:* Claude.

**11. Trim "Save it where you can find it" generic closer in M3, M4, M10 capstone-save blocks.** Replace with the specific filename and the next module that will reuse the artifact.

- *Files:* M3 line 401, M4 line 542, M10 line 399.
- *Recommended fix:* Replace each occurrence with one specific sentence naming the filename and the first downstream module. Examples: M3: *"Save as `Module03_Prompt_Rewrite_[YourName].pdf` in your portfolio folder; Module 4 will pick it up as Version 1 of your prompt comparison work."* Modules 1, 2, 5, 6 already do this; M3, M4, M10 are the gaps.
- *Owner:* Claude.

**12. Vary "do not leave it for capstone week" template.** M11, M12, M13 use near-identical wording.

- *Files:* M11 line 445, M12 line 625, M13 line 546.
- *Recommended fix:* See Section 3 row for suggested artifact-specific replacements.
- *Owner:* Claude.

**13. Decide "carry forward N things" formula.** Six consecutive modules use the same formula.

- *Files:* M9, M11, M12, M13, M14, M15.
- *Recommended fix:* Vary the framing in three of the six. Section 3 row gives sample alternates. Do not rewrite the carry-forward content; rewrite only the framing sentence that introduces it.
- *Owner:* Claude.

**14. Cursor-side: M16 24-hour pause as platform timer.** Not a content change; a UI/UX decision for the Cursor mapping team.

- *File:* n/a (platform behaviour)
- *Recommended fix:* Cursor team renders the M16 self-critique step's 24-hour pause as a soft platform timer that prompts the learner to return for self-critique after 24 hours, rather than relying solely on the in-text instruction.
- *Owner:* Cursor.

**15. Cursor-side: capstone rubric block UI.** M16 replaces the eight-question checkpoint with a rubric block.

- *File:* n/a (platform behaviour)
- *Recommended fix:* Cursor builds a `capstone rubric` block component that accepts seven criteria with four evidence levels and supports learner self-grading + (optional) facilitator scoring layer. Specification is already in M16's `Notes for Cursor mapping` and in Course1_Assessment_Standards.md `Capstone block — UI behavior` section.
- *Owner:* Cursor.

---

*End of audit. Priority 1 fixes (#1, #2) and Priority 2 fixes (#3–#7) bring the course to mappable. Priority 3 fixes (#8–#15) are polish that can land alongside or after the first Cursor mapping pass without blocking it.*
