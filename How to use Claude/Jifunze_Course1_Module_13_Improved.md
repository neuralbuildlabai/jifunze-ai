# Module 13: AI for Decision Support and Critical Thinking

## Continuity bridge from Module 12

Module 12 trained you to look at repeated work and see its shape — stages, sequence, dependencies, owners, review points, constraints, failure points, and an explicit decision about where AI helps and where it must not. You produced a Standard Operating Procedure for one of your own recurring tasks and an agent-readiness assessment that named the conditions under which any part of that task could be turned over to an agent. By the end of the module, you were treating workflow design as design — slow and deliberate before the tool runs, faster and safer once it does.

Module 13 is what happens when the same discipline meets a different kind of work. Workflows are about *how* a task runs once you have decided to run it. Decisions are about *whether* to run it, *which* of several options to choose, *what to weigh against what*, and *who carries the consequence*. AI is now confident enough at each of those that a careful person can hand a decision to it without realising they have done so. The tool reads like a colleague giving an opinion. The opinion sounds reasonable. Twenty minutes later, the recommendation is on a slide in front of a manager and nobody can quite remember which parts came from a human and which parts came from the AI's first paragraph.

Carry forward four things from Module 12 in particular. The habit of naming *human-only steps* — the moments where accountability cannot transfer, judgement is irreducible, the content is sensitive, or the action is irreversible. The habit of writing review points with a specific *what is being checked* and a specific *what happens when the check fails*. The habit of running a workflow through one bad day in your head before letting it go live. And the discipline of designing the boundaries before the tool acts, not after. Decision-support work uses every one of those habits, applied to a different unit of work. The unit here is not a stage in a process; it is a choice that has to be made and stood behind.

The principle that holds this module together is short and worth keeping in front of you while you read: *AI may support thinking. The decision remains human-owned.* That sentence is not a warning. It is the design rule. Everything else — criteria before options, framing checks, tradeoff analysis, missing-information flags, stakeholder maps, reversibility judgement — is how you keep that rule true under pressure.

## What was wrong before

In the original module, *"Use AI for decision support"* appeared as a heading, but the actual structure of a decision — the elements you have to name before AI is useful at all — was implied rather than taught. Worked examples were sketched, not written: *"Comparing tool options for a team"* sat as a subheading with no decision question, no criteria, no AI output, no analysis of what the AI weighted incorrectly, and no decision memo for the learner to read. A self-learner who tried to follow the original would have produced a tool comparison that mirrored the AI's first paragraph, because there was no model in front of them showing what *not* to do.

Practice activities lacked supplied decision scenarios. Instructions like *"think of a decision you face and apply the criteria"* assumed the learner could supply the scenario, the criteria, the constraints, and the stakeholders before the activity began. The most common Course 1 failure mode — a learner with a real but vague situation, no practice material to work from, and no model answer to compare against — was baked in.

Framing-bias and stakeholder-impact checks were named once, in passing, as if mentioning them was enough. They were not. A learner can read *"watch out for framing bias"* fifty times and still not notice when an AI has framed their problem for them, because the framing arrives in the same fluent, helpful voice as the rest of the answer. The original module had no exercises that surfaced framing in action and no worked examples where the learner watched a recommendation drift because of how the question was put.

Checkpoint questions were stubs rather than fully developed items. The portfolio artifact was named but had no defined contents, no acceptance criterion the learner could self-check against, and no stated relationship to the capstone. Revision guidance, where present, gave generic advice (*"think more carefully"*) rather than specific failure modes mapped to specific sub-sections. The transition into Module 14 was missing.

## What was improved

This version adds a structured decision-support model — ten named elements (decision question, criteria, options, constraints, tradeoffs, risks, missing information, reversibility, stakeholders, decision owner) that together form the frame inside which AI can help — and teaches *criteria before options* as a design rule, not a slogan. It adds an explicit treatment of framing bias: how an AI's choice of words shifts what a recommendation considers, how to detect that drift inside an output, and how to ask for the alternative framing on purpose. It adds a tradeoff-analysis discipline that names what is being given up alongside what is being gained, a missing-information convention so unanswered questions are visible inside the analysis instead of hidden by fluent prose, and a stakeholder-impact check that surfaces who else feels the consequence of a decision the AI happily framed as personal.

It adds four fully written worked examples — a tool comparison for a team, a recommendation that ignored stakeholders, a decision matrix with missing information flagged, and the move from asking AI to decide to asking AI for questions, risks, and counterarguments. Each example shows the actual prompt, the actual AI output (or a realistic facsimile), what the AI weighted incorrectly, the human-owned correction, and an excerpt from the decision memo that resulted. It supplies four practice activities with full source material — three decision scenarios for the criteria-builder activity, one full scenario for the option-comparison matrix, an AI-generated recommendation for the assumption hunt, and a polished AI recommendation for the counter-recommendation challenge. It includes eight checkpoint questions across the four required formats with an answer key written to the assessment-standards rubric, a named portfolio artifact with a defined filename pattern and a self-check acceptance criterion, an explicit capstone connection, revision guidance keyed to specific failure modes, and a Cursor-mapping note so the module can be split into platform lesson blocks without rewriting the teaching.

Module 9 (accountability), Module 10 (privacy and minimum-necessary information), Module 11 (evidence trails and uncertainty), and Module 12 (workflow ownership and human-only steps) are woven into the decision-support discipline rather than gestured toward at the end. Module 3 (prompt control), Module 4 (structured prompt design), Module 5 (iteration and comparison), and Module 6 (verification) appear at the points where the prompt itself is what is failing, so the learner can return to those modules surgically rather than re-reading the course.

## Estimated time

Roughly three and a half to four and a half hours of focused work end-to-end.

- **Core lesson** — 50 to 60 minutes.
- **Worked examples** — 35 to 45 minutes (read once, then re-read at least one with one of your own pending decisions in mind).
- **Practice activities** — 75 to 95 minutes total (the four activities can be split across two sittings; activities 3 and 4 are the heaviest because they require you to push back against a recommendation that already sounds correct).
- **Knowledge-to-output task** — 50 to 70 minutes.
- **Checkpoint quiz and revision** — 15 to 20 minutes.
- **Total estimated time** — approximately 3h 45m to 4h 30m.

A learner who already makes operational or strategic decisions for a small team — operations associates, programme managers, founders, team leads — may move faster through the conceptual sections but should spend the full time on activities 3 and 4, since those are the activities that retrain a working professional out of the most common shortcut of the module: *the AI's recommendation looks reasonable, so the decision is the recommendation*.

## Module purpose

Most early problems with AI use in decisions are not about the AI being factually wrong. The AI's facts are often fine. The problem is structural: a decision was made before it was framed, options were chosen before criteria were defined, the tradeoff between two things the team cares about was buried inside a fluent recommendation, the people most affected by the choice were not in the picture the AI was working from, the information that was missing did not show up as missing because the prose did not pause to admit it, and the human who was supposed to own the decision found themselves explaining a conclusion they had not actually arrived at. The AI was helpful at every step. The decision was poor.

This module teaches the discipline that prevents those failures. You learn the difference between recommendation and decision, the structured frame inside which AI can help, the order — criteria first, options after — that protects you from letting the tool decide what you should care about, the framing-bias checks that surface when a recommendation has been quietly shaped by how the question was put, the tradeoff-analysis discipline that makes what is being given up visible alongside what is being gained, the stakeholder-impact check that surfaces consequences for people the AI did not have in view, the missing-information convention that puts unanswered questions on the page rather than smoothing them out of it, and the decision-memo format that closes the loop with a human-owned reasoning trail. The result is decision work that is slower to set up and faster to defend, with the AI clearly in support and the responsibility clearly with you.

## Learner outcomes

By the end of this module, you should be able to:

- Distinguish *decision support* from *decision ownership*, and explain in your own words why the second cannot be transferred to an AI.
- Define decision criteria — including weights and what is non-negotiable — before asking AI to analyse options.
- Compare options using tradeoffs, constraints, risks, and missing information rather than a single weighted score.
- Detect framing bias in AI-generated recommendations and ask for alternative framings on purpose.
- Use AI to generate better questions, risks, assumptions, and counterarguments — not only better-sounding answers.
- Produce a human-owned decision memo that shows the reasoning, names the tradeoffs, surfaces the missing information, and identifies the decision owner.
- Apply Module 10 privacy discipline, Module 11 evidence-trail discipline, and Module 12 human-only-step discipline inside decision-support work, not as separate concerns layered on top.

## Core lesson

### Support is not ownership

There is a sentence that sounds like a polite formality but is actually the design rule of this module: *AI supports decisions. AI does not own decisions.* That distinction is operational, not philosophical. If the AI owns the decision, then nobody owns it. The model has no relationship with the people the choice will affect, no responsibility for the cost of being wrong, no accountability the next time the situation comes up, and no continuity between this decision and the rest of your judgement. You are the only entity in the loop with all of those things. That is what makes you the owner. The AI is the assistant.

The practical version of the rule is this. AI can help you understand the question. AI can help you list the options you might have missed. AI can help you see the tradeoffs inside an option. AI can help you generate the counterarguments to your own preferred answer. AI can help you draft the memo that explains the choice. AI cannot tell you which of two things you care about more, cannot stand in front of the team when the choice goes wrong, cannot weigh the weight of a relationship that is not in its training data, and cannot decide on your behalf which of the people affected by the decision matter most.

A useful test, when you cannot tell whether you are using AI for support or letting it own the decision: write down the decision in your own words *before* you open the tool. If you could not have written that sentence before the AI's output, the AI did the framing — and once it has done the framing, support has already shaded into ownership. If you can write the sentence first, the AI's job is to help you make the choice you have already framed.

### Recommendation versus decision

A *recommendation* is an answer to a question. A *decision* is an answer with a person attached, a consequence accepted, and a moment in time. Most AI outputs that look like decisions are actually recommendations dressed up as decisions, because the language models are trained to produce confident, complete-sounding prose. *"You should choose Option A"* is grammatically a decision and operationally a recommendation. The AI did not make that choice; it produced that sentence. The choice happens when a person reads the sentence, agrees with it, and acts.

The risk is not that the recommendation will be wrong. The risk is that the *act of deciding* will skip from "human reads recommendation" to "human acts on recommendation" without the part in the middle where the human checks whether the recommendation matches the criteria, weighs the tradeoffs, names the missing information, and decides whether the choice is theirs to make at all. That part in the middle is the decision. Without it, the human is forwarding the AI's prose into the world.

You will know you are skipping the middle when, asked *why* you chose this, the most honest answer is *"the AI suggested it and it sounded right."* That is not a decision. That is a forwarded recommendation. The Module 9 accountability discipline applies here directly: *AI did the analysis* is not an answer to *who decided*.

### The structured decision frame

A workable decision-support session names ten elements before any option is compared. Not all ten will be heavy in every decision; for a small reversible choice, several will fit on a single line. For a large or contested decision, each one earns a paragraph. The discipline of writing them down — even briefly — is what keeps the AI's role limited to support.

**1. Decision question.** What is being decided, in one sentence, in your own words. *"Should we use Tool A or Tool B for our team's project tracking?"* not *"What is the best project tracking tool?"* The first names a choice with a context. The second invites the AI to write a buyer's guide.

**2. Criteria.** What you are choosing against. The list is short — three to seven items — and each one is named in a way you could check. *"Cost under KES 5,000 per month"*, *"works on slow connections"*, *"the team can adopt it within two weeks"*, *"data stored in a region we are comfortable with"*. Vague criteria (*"good user experience"*, *"future-proof"*) produce vague comparisons. Each criterion has a weight or, at least, a label: *non-negotiable*, *important*, *nice to have*. A non-negotiable criterion is a filter, not a tradeoff: any option that fails it is out, regardless of how strong it is on the others.

**3. Options.** The choices you are picking between. The list is small — usually two to five — and includes the do-nothing option where it is realistic. *"Continue with the spreadsheet we use today"* is often the option a fluent AI recommendation will quietly delete from consideration. Keep it on the list.

**4. Constraints.** The boundaries the decision has to respect, separate from the criteria. Budget caps, timeline caps, authority limits (*"any monthly subscription above KES 5,000 needs board approval"*), policy limits (*"no tool that requires uploading customer data to a server outside our agreed region"*), capacity limits (*"the team can absorb one new tool this quarter, not three"*). Constraints are often not negotiable; criteria can be weighed against each other; a clean decision frame keeps them separate so neither leaks into the other.

**5. Tradeoffs.** What is given up when something is gained. A tradeoff is not a downside in isolation; it is an exchange. *"Tool A is faster to set up but stores data in a region the compliance officer is uncomfortable with"* is a tradeoff. *"Tool A's UI is a bit clunky"* is a downside. Tradeoff thinking forces you to name the *price* of each option in the units of the criteria you said matter.

**6. Risks.** What could go wrong, and how badly, and how likely, and what would you do about it. A risk register here does not have to be a spreadsheet. Three lines per option is often enough: the worst plausible failure, an estimate (low/medium/high) of likelihood, and the response if it happens.

**7. Missing information.** What you would need to know to decide more confidently, and do not. *"We do not yet know how the team will react to a daily standup tool"*, *"we have not tested how either tool performs on the connections the field team uses"*, *"we do not know whether Tool B's free tier will remain free after we have committed to it"*. The point of writing missing information down is not to fill it all in before deciding. It is to make sure the decision is taken with the unknowns visible, so the level of confidence behind the choice matches the evidence behind it. This is Module 11's uncertainty discipline applied to decisions instead of synthesis briefs.

**8. Reversibility.** How hard is it to undo this choice if it goes wrong? *Easily reversible* (cancel a monthly subscription, revert to the spreadsheet) — speed and a willingness to try things is appropriate. *Costly to reverse* (migrating six months of team data into a tool, then realising it does not fit) — slower, more conservative, more review. *Not reversible* (a public statement, a fired employee, a signed multi-year contract) — the decision belongs in a different category entirely, and Module 12's *human-only* discipline applies in full.

**9. Stakeholders.** Who else has a stake in this decision, beyond you. The team that will use the tool. The customer whose experience will change. The compliance officer who will be asked about the data. The colleague who built the spreadsheet you are about to replace. A stakeholder is not just someone who will be inconvenienced; it is someone whose interests, work, or trust the decision touches. Decisions that ignore stakeholders do not become better decisions when the AI's prose is fluent; they become decisions that are harder to defend when the affected person reads them.

**10. Decision owner.** The named human (by role) who is making the choice and is accountable for it. *"The operations lead, with input from the team"*, *"the founder, after a 24-hour review of the cost figures"*, *"the programme manager, with the compliance officer's sign-off on the data question"*. A decision frame with no named owner is a decision waiting to be quietly made by the most confident person in the room, which is — in the AI age — sometimes the AI itself.

These ten elements are the frame. The frame is what the AI works inside. Without the frame, the AI is being asked to do all of the work — including the parts that are not its to do.

### Criteria before options

The single most common mistake in AI-assisted decision-making is asking the AI to compare options before the criteria have been defined. The conversation looks helpful — *"compare Tool A and Tool B for our team"* — and the output looks like analysis. What has actually happened is that the AI has supplied the criteria *along with* the comparison. By the time you read the response, the criteria the AI chose to compare against feel like the obvious criteria, because they appeared inside a confident-sounding answer to a question you asked.

The discipline is to invert the order. Define the criteria first — by yourself, in writing, before any AI involvement. Weight them. Mark which are non-negotiable. Only then ask the AI to help compare options against *those* criteria. The prompt becomes longer and more specific (*"Compare Tool A and Tool B against the following criteria, in this order, with the following weights…"*) and the output becomes much more useful, because it is now a comparison done in your terms instead of an analysis done in the AI's terms.

This is the same principle Module 4 taught about prompt structure — context, constraints, and audience supplied up front — applied to decisions. A loose prompt asks the AI to do everything; a structured prompt asks the AI to do one specific thing. In decision-support work, the *one specific thing* is comparing options against criteria you have already defined.

### How the AI frames the problem for you

Even with criteria defined, the AI shapes the decision in another way: by choosing how to frame the situation in its first paragraph. Frame is the angle from which a problem is described. The same decision, framed differently, surfaces different criteria, different options, and different tradeoffs.

*"What's the best way to keep our customer data safe?"* and *"What's the best way to balance customer data safety against speed of customer support?"* are different decisions. The first frame produces options that maximise security, sometimes at the cost of usability that nobody named as a constraint. The second frame produces options that consider both, sometimes at the cost of the security the first frame would have surfaced. Neither frame is wrong. The wrong move is to let the AI choose the frame on your behalf, and then to read the recommendation as if the frame were neutral.

Two practical habits guard against this. First, *write the frame yourself* — the decision question and the criteria — before the AI is asked anything. The frame you write may be wrong, but it is yours, and you can examine it. The frame the AI supplies is invisible inside the prose it produced. Second, *ask for the alternative frame on purpose*. After the AI has produced an analysis, the prompt *"Now reframe this decision from the perspective of [a stakeholder you did not centre, a constraint you did not lead with, a value you did not name]. What changes?"* surfaces what was missing from the first pass. If nothing changes, the original frame was robust. If everything changes, the original frame was doing more work than you realised.

### Asking for counterarguments and alternative views

A good AI recommendation is helpful. A good AI *counterargument to its own recommendation* is more helpful, because it forces the analysis to widen.

The prompt pattern is direct: after the AI has produced its first answer, ask for the case against it. *"Now make the strongest possible argument that we should not do this. List the assumptions in your previous answer that, if wrong, would change the recommendation. Who would be most likely to push back, and what would their best argument be?"* The output of that prompt is rarely as fluent as the first one — the model is now arguing against itself — but it is usually more useful, because it surfaces the assumptions the first answer was leaning on and the perspectives it was not in view of.

A more demanding version of the same pattern: *"Argue this decision from the perspective of a sceptical compliance officer / a finance lead / a team member who will have to use this tool every day / the customer whose experience changes."* Each of those produces a different counterargument, because each is a different stakeholder with different criteria. Used together, they are a structured way to widen the frame the AI started with.

Treat the counterargument as input, not as a verdict. You are not running a debate where the louder side wins. You are widening your view of the decision before you make it.

### Using evidence trails (Module 11)

Module 11 trained you to make sure each claim in a synthesis brief traces back to a specific source. The same discipline applies inside a decision memo. If the AI says *"Tool A is the standard choice for teams of this size"*, that is a claim. Where does it come from? Is it a fact in a recent comparison report you can verify, or is it a generalisation the AI has produced from training data that may be a year or three years out of date? The evidence trail is the difference between *we considered the data* and *we forwarded a confident sentence*.

For a small reversible decision, an exhaustive evidence trail is overkill. For a costly or contested one, every claim that bears weight in the recommendation should be traceable. *"This tool stores data in the EU"* — link to the vendor's documentation. *"Adoption time is typically two weeks for a team of seven"* — name the source, or if there is none, soften the claim and label it *needs verification*. The Module 11 uncertainty labels (*known*, *needs verification*, *assumption*, *open question*) carry directly into a decision memo and are a useful way to keep the analysis honest under pressure.

### Workflow ownership inside decisions (Module 12)

A decision is not the same as a workflow, but most decisions sit inside one. The decision to choose Tool A or Tool B for project tracking is part of a wider workflow that includes who is consulted before the choice, who reviews the analysis, who makes the call, who communicates it to the team, and who reviews the choice six months later when its consequences are visible. Module 12's question — *who is the named owner at each stage* — applies as cleanly to a decision flow as to an operational one.

The decision owner from element 10 of the frame is often only the owner of the *choice itself*. The owner of the consultation step, the review step, the communication step, and the post-decision review may be different people, with different responsibilities. Naming them at the start of the decision, the way you would name owners at the start of a workflow, is what prevents the choice from becoming a private act that the team learns about by accident.

### Privacy boundaries inside decisions (Module 10)

Some decisions cannot be supported by AI without first thinking about the input. A choice that involves people's salaries, performance ratings, medical conditions, immigration status, disciplinary records, or other Tier 3 / Tier 4 content is a choice where the *information* you would need to give the AI to get useful support is information that should not enter a general-purpose AI tool at all.

The Module 10 discipline applies in full. Before the AI is given anything, ask: *what is the minimum information the AI actually needs to help with this decision?* If you can sanitise the input — replace names with roles, remove identifying details, abstract the case to its structure — the AI can help with the structural analysis without seeing the sensitive content. If you cannot sanitise the input without losing the substance of the decision, the decision is not one the AI should be supporting in this form. That is not a failure; it is the workflow telling you something true. The next step is human consultation, not a more clever prompt.

This boundary applies even when the decision feels obvious. A small business owner asking an AI for advice on whether to fire a junior employee is, in privacy terms, asking the AI to consume a Tier 3 / Tier 4 narrative about an identifiable person. The AI's eventual recommendation is not the only output of that interaction; the input itself was an exposure. Decisions of this kind belong with HR, a mentor, an advisor — humans with appropriate context and confidentiality obligations — long before they belong in a chat window.

### High-stakes decisions and escalation

Some decisions are not for AI support in any form, no matter how careful the frame. The pattern is consistent and worth memorising: high stakes, irreversible, regulated, or affecting third parties who have not consented to AI involvement.

A medical diagnosis. A legal commitment under live litigation. A safeguarding judgement involving a child. A hiring decision when the candidate has not consented to AI screening. A clinical or therapeutic call. A loan approval that determines whether someone keeps their business. The disciplinary action that ends a colleague's job. The public statement that cannot be unsent. In each of these, the appropriate move is not a better prompt; it is escalation to a person, a policy, an expert, or a process that has the standing to make the call. AI may be useful at the periphery — drafting a letter that a qualified person reviews, summarising publicly available context, generating questions for the human consultation — but the centre of the decision is human-owned and remains so.

The test is short. *If this decision turns out to be wrong, who answers for it, and on what authority did they decide?* If the answer to either part is unclear, the decision is not yet ready for AI support beyond drafting and questioning. Finish the human structure first.

## Fully written worked examples

### Worked example 1: Comparing tool options for a team

**Scenario.** A small Kenyan media production company — twelve people, mostly working on slow connections from Nairobi, Eldoret, and Kisumu — needs to choose a project-tracking tool. The current setup is a shared spreadsheet that the producer (Linet) maintains by hand. Two cloud tools are on the shortlist. The decision is Linet's, with the production manager's sign-off, and a two-week trial budget of KES 8,000 to evaluate either option.

**Decision question.** *Should the team adopt Tool A or Tool B for project tracking, or continue with the spreadsheet for another quarter?*

**Criteria, weights, and non-negotiables (defined before the AI is consulted).**

| Criterion | Weight | Non-negotiable? |
|---|---|---|
| Works reliably on slow connections (≤ 1 Mbps) | High | Yes |
| Total cost under KES 5,000 / month for the team | High | Yes |
| Team can be productive in it within two weeks | High | No |
| Data stored in a region the producer is comfortable with | Medium | Yes |
| Allows offline edits with later sync | Medium | No |
| Producer can export everything to a spreadsheet if we leave | Medium | Yes |
| Mobile-friendly for field staff | Low | No |

**Constraints.** Trial budget KES 8,000; two-week evaluation window; no separate IT support; the production manager (not Linet) signs off on any monthly subscription.

**The AI-assisted comparison.** With the criteria defined, Linet's prompt:

> *Compare Tool A (web-based project tracker, freemium model) and Tool B (project tracker with offline sync, paid only) for a team of 12 people working on slow connections in Kenya. Use only the criteria below and assess each option as "meets, partially meets, or does not meet" for each criterion. Note any criterion you do not have enough information about. Do not introduce criteria I have not listed. Do not recommend a winner.*
>
> *Criteria: [pasted from above].*

**The AI's output (excerpt).**

> *Tool A — works reliably on slow connections: partially meets (web-based, can be slow to load on poor connections, limited offline support). Cost under KES 5,000/month: meets (free tier supports 12 users with basic features; premium tier USD 8/user/month would exceed budget). Team productive in two weeks: meets (most teams find it intuitive). Data region: needs verification (default region is US; EU region available on paid plans). Offline edits: does not meet. Export to spreadsheet: meets (CSV export available). Mobile-friendly: meets.*
>
> *Tool B — works reliably on slow connections: meets (designed for low-bandwidth, offline-first). Cost: needs verification (paid only; pricing not consistently listed for this team size). Team productive in two weeks: partially meets (steeper learning curve). Data region: needs verification (Africa region not advertised). Offline edits: meets. Export: meets. Mobile-friendly: meets.*

**What sounds correct.** Both options are assessed against the criteria Linet supplied. The AI does not declare a winner. *Needs verification* labels appear in the right places. The format is usable.

**What the AI weighted incorrectly (in a follow-up prompt where Linet asked for a recommendation).** When pressed (*"based on the assessment above, which would you recommend?"*), the AI's reply weighted *learning curve* heavily and *offline edits* lightly, recommending Tool A. That weighting is plausible but is not what Linet's team needs. Their connections drop several times a day. *Offline edits with later sync* is, in their context, closer to a non-negotiable than a *medium* criterion — Linet had under-weighted it because she was thinking in headquarters terms, not field-shoot terms.

**Revised human-owned comparison.** Linet revisits her own weights. She raises *offline edits* from medium to high. She adds a non-negotiable: *the tool must remain usable when the connection is intermittent for an hour at a time*. The AI's *meets / partially meets / does not meet* assessment is unchanged; the *weighting* is now hers, not the AI's. Tool A *fails* the new non-negotiable. Tool B *meets* it but has *needs verification* against cost and data region.

**The decision.** Linet does not pick Tool B blindly. She uses the trial budget to confirm Tool B's cost for 12 users in writing and to confirm the data region. Both check out. The data region is not Africa, but it is a region the production manager has used before and is comfortable with, so the criterion is met by a reasoned exception, recorded in the memo. Tool B is adopted on a one-month trial; if it does not survive the trial, the team returns to the spreadsheet for the quarter and revisits the decision.

**Decision memo excerpt.**

> *Decision: adopt Tool B for project tracking on a one-month trial, beginning [date]. If the trial does not produce smoother coordination than the current spreadsheet, the team returns to the spreadsheet at end-of-month and re-evaluates in three months.*
>
> *Why Tool B over Tool A. Both meet most of the criteria. Tool A failed the *offline-friendly* criterion, which a re-weighting after AI-assisted comparison surfaced as a non-negotiable for our field shoots — not a medium-priority preference. Tool B meets that criterion at the cost of a steeper learning curve. We accept that tradeoff because the cost of a tool that drops out during a shoot is higher than the cost of a slower first two weeks.*
>
> *Why not the spreadsheet. The spreadsheet works but produces single-point dependency on Linet. The trial is the cheapest way to find out whether replacing that dependency is worth the change cost.*
>
> *What we are watching. Whether Tool B's offline sync survives our worst-connection days. Whether the team can be productive in it within two weeks. The producer logs both in the cycle review at the end of the trial.*
>
> *AI assistance. AI was used to map options to the criteria above. The criteria, the weights, and the choice are mine.*

**What the learner should notice.** The AI's first comparison was useful but under-weighted the criterion that mattered most in this team's context. Letting the AI weigh on Linet's behalf would have produced a confident recommendation for the wrong tool. Defining criteria first did not prevent the issue; *weighting them deliberately, in context*, did. The decision memo is short, names the tradeoff explicitly, and keeps the responsibility with the human. The disclosure note at the end is from the Course1_Disclosure_Note format.

### Worked example 2: AI-generated recommendation that ignores stakeholder impact

**Scenario.** Brian runs a small social enterprise in Kisumu that distributes solar lamps. Sales have been flat for two months. He asks an AI assistant for recommendations on a quick way to lift sales in the next quarter.

**Brian's prompt (loose, intentionally — this is the prompt many learners actually send).**

> *Sales of our solar lamps are flat. Suggest three things we can do this quarter to lift sales.*

**The AI's output (excerpt).**

> *1. Run a 30% discount campaign on your two best-selling models for the first two weeks of the quarter. This typically drives a short-term sales lift of 20–40%.*
>
> *2. Shift your marketing budget to short-form video on Facebook and TikTok, where engagement rates among Kenyan small-business audiences have been highest in the last 12 months.*
>
> *3. Introduce a referral programme that pays existing customers KES 200 per new customer they bring in.*

**What sounds correct.** Three concrete actions. Numbers attached. Each one is a thing Brian could in principle do.

**What is missing — the stakeholder impact.** Brian's first instinct is to act on the discount idea. Before he does, he runs the recommendation through a stakeholder check. Who is affected by each option, beyond Brian and the customers?

- *The agents who sell the lamps in the field.* They earn a margin on each unit sold. A 30% discount cuts directly into their commission, not just the company's. The AI did not mention this.
- *The previous customers who paid full price last month.* They will see the discount and feel they paid too much. The AI did not consider goodwill cost.
- *The microfinance partner who finances some of the lamp purchases.* A discount campaign that pulls forward sales from next quarter creates a different repayment profile, which affects the partner's planning. The AI did not have this stakeholder in view.
- *The agents on the referral programme.* Paying customers KES 200 per referral will compete with the agents' own outreach. Whether the agents can also earn the referral, and how that interacts with their commission, is unclear.

**Corrected analysis.** Brian rewrites the decision frame with the stakeholders surfaced.

| Option | Effect on field agents | Effect on prior full-price customers | Effect on microfinance partner | Reversibility |
|---|---|---|---|---|
| 30% discount, two weeks | Cuts margin on sales they made | Visible price cut on the same product they paid full price for | Pulls forward sales; affects repayment forecast | Easily reversible (campaign ends) but goodwill effect lingers |
| Shift budget to short-form video | Neutral, possibly positive (more leads to follow up) | Neutral | Neutral | Easily reversible |
| Referral programme paying customers | Negative if agents are excluded; neutral if agents also qualify | Neutral | Neutral | Reversible but harder to claw back once announced |

**The corrected decision.** Brian keeps option 2 (short-form video) as the safest first move. He modifies option 3 to include field agents in the referral programme on equal terms. He drops option 1 in its current form and replaces it with a smaller targeted offer to *new* customers in regions where the agents have asked for a price-sensitive promotion — preserving the agents' margin on existing customers and removing the goodwill-cost issue.

**How the final decision remains human-owned.** The AI's three options were a useful starting point. The stakeholder check was Brian's. The modifications — *agents included in the referral, targeted offer instead of broad discount* — are decisions Brian made because he understands the relationships the AI did not have in view. The decision memo names the change and the reason.

**Decision memo excerpt.**

> *Decision: shift Q3 marketing spend toward short-form video; launch a referral programme that compensates both customers (KES 200 per qualifying referral) and the originating field agent (their normal commission, not reduced). Hold the broad discount for now; instead, run a targeted promotion to new customers in two underserved regions, with the agents in those regions involved in the design.*
>
> *Why these and not the AI's original three. The AI's original recommendations would have lifted short-term sales at the cost of agent margin and prior-customer goodwill, neither of which the AI had in view because I did not give it that context. The version above lifts sales while preserving the relationships that the next several quarters depend on.*
>
> *AI assistance. AI was used to generate the initial three options. The stakeholder analysis, the modifications, and the choice are mine.*

**What the learner should notice.** The AI was not wrong on technical grounds — discounts often do lift sales in the short term. The recommendation was incomplete because Brian's prompt did not surface the stakeholders, and the AI optimised for the only outcome the prompt named (sales). A stakeholder check is not extra work; it is the work. Without it, a fluent recommendation will quietly externalise costs to the people the prompt did not mention.

### Worked example 3: Decision matrix with missing information flagged

**Scenario.** A Nairobi-based NGO is choosing a venue for a three-day staff residential. Three options are on the shortlist. The decision-maker is the operations lead, with the executive director's sign-off. The decision must be made within ten days.

**Criteria (defined first).** Cost (high), distance from Nairobi (medium), accommodation quality (medium), reliable power (high, non-negotiable), reliable internet (high, non-negotiable), capacity for 30 people including breakout space (high, non-negotiable), accessibility for one wheelchair-using staff member (high, non-negotiable), staff feedback from previous visits if any (medium).

**The decision matrix.**

| Criterion | Weight / NN | Venue 1 (Naivasha) | Venue 2 (Limuru) | Venue 3 (Machakos) |
|---|---|---|---|---|
| Cost (KES per night, full board, 30 pax) | High | 4,500 | 5,200 | 3,900 |
| Distance from Nairobi | Medium | ~100 km | ~30 km | ~70 km |
| Accommodation quality | Medium | Good (visited 2024) | Needs verification | Needs verification |
| Reliable power | NN | Meets (generator backup confirmed) | Needs verification | Needs verification |
| Reliable internet | NN | Partially meets (slow but usable) | Needs verification | Does not meet (per past visitor) |
| Capacity 30 + breakout | NN | Meets | Needs verification | Meets |
| Accessibility (wheelchair) | NN | Needs verification | Needs verification | Needs verification |
| Past staff feedback | Medium | Mostly positive (2024) | None on file | One negative note (2023, internet) |

**What the matrix shows.** Venue 1 is the only option for which a non-negotiable criterion (*reliable internet*) is at *partially meets* with a known assessment, rather than *needs verification*. Venue 3 is the cheapest but has a known *does not meet* on the same criterion. Venue 2 is the closest to Nairobi but every non-negotiable for it is at *needs verification*. The accessibility question is unverified for all three, which is a significant gap given that one staff member uses a wheelchair.

**What the AI was used for and what it was not.** The operations lead used AI to draft the matrix template, summarise the past visitor feedback into the table, and reformat the criteria. The AI did not produce the *needs verification* labels — those are the operations lead's, applied to every cell where she did not personally have the information.

**The decision.** Before choosing, the operations lead does three things. She emails Venue 2 and Venue 3 to confirm the non-negotiable criteria in writing (with specific questions: generator backup? internet measured speed? accessible bathroom and ramps?). She speaks to two staff members who attended each venue's previous events, including the staff member who uses a wheelchair, to ask what to look for. She defers the choice for 48 hours rather than picking on incomplete information.

When the responses come back, Venue 2 confirms power and capacity but admits internet is unreliable beyond the lobby. Venue 3 confirms reliable power but cannot confirm wheelchair accessibility for upper-floor rooms. Venue 1 confirms accessibility (a ground-floor accessible room is available) and the internet is usable for video calls if scheduled in advance. Venue 1 is selected, even though it is the most distant.

**Decision memo excerpt.**

> *Decision: book Venue 1 (Naivasha) for the staff residential, [dates].*
>
> *Why Venue 1. It is the only option that meets all non-negotiable criteria — reliable power, usable internet, full capacity with breakout space, and confirmed wheelchair accessibility — when verified against the venues directly. It is not the cheapest. The cost difference (KES 18,000 over three days for 30 people compared with Venue 3) is the price we are paying for accessibility and reliable infrastructure.*
>
> *What was missing and how we resolved it. Five of eight criteria across the three venues were *needs verification* on first analysis. We resolved them by direct contact with each venue and by speaking to staff who had been to the venues before, including the wheelchair-using staff member who is most affected by the accessibility question. The decision was deferred 48 hours so this verification could happen.*
>
> *Risks accepted. Internet remains the weakest part of Venue 1. We are scheduling video calls in the morning blocks where the venue reports best performance, and we have a hotspot backup. If internet fails entirely on day 2 or 3, we will adjust the schedule to make the affected sessions in-room.*
>
> *AI assistance. AI was used to draft the matrix template and summarise past staff feedback. The criteria, weights, *needs verification* labels, verifications, and the choice are mine.*

**What the learner should notice.** The matrix was useful precisely because it made the missing information visible. A confident-looking comparison that filled every cell with a verdict would have made the choice feel easier and would have hidden the verifications that turned out to be the work that mattered. *Needs verification* is not a confession of weakness. It is a label that earns its place in the analysis.

### Worked example 4: Better use of AI for question generation

**Scenario.** Aisha is the founder of a small Nairobi tutoring company. She is considering hiring her first full-time tutor. She has saved up enough for six months of a junior tutor's salary, but the hire would commit her to a level of monthly cost the business has not carried before.

**The weak prompt (asking AI to decide).**

> *I'm a small tutoring company in Nairobi. I have enough cash for six months of a junior tutor's salary. Should I hire one?*

**The AI's likely response (paraphrased).** A reasonable-sounding paragraph weighing the case for and the case against, tilting toward *yes* because the question phrased the cash position as adequate. The response will probably mention growth, capacity, and the value of building a team. It will probably not surface the questions Aisha most needs to ask, because the prompt did not ask for questions.

**What sounds correct.** The reasoning sounds adult and balanced. The recommendation has hedged language. It feels like advice.

**Why this is the wrong use of AI for this decision.** Aisha is not in a position to act on a recommendation. She is in a position to decide. The recommendation, accepted, does not survive contact with the parts of the decision the AI did not have in view: her actual demand pipeline, her cash buffer beyond the six months, the interaction between a new hire and her existing freelance tutors, her own tolerance for a fixed monthly cost, and the question of what *not* hiring would do to the business. The AI cannot answer those. It can help Aisha *ask* them.

**The better prompt (asking AI for questions, risks, assumptions, counterarguments).**

> *I'm the founder of a small tutoring company in Nairobi. I'm considering hiring my first full-time junior tutor. I have six months of their salary saved. I have not made this decision yet — I am trying to think about it well, not get an answer.*
>
> *Please do four things, in order.*
>
> *(1) List the ten most important questions I should be able to answer about my business and my situation before I make this decision. Group them: demand, capacity, finances, team dynamics, personal/founder.*
>
> *(2) List the assumptions a typical "yes, hire" recommendation would be making, and which of those assumptions are most likely to be wrong in a small Nairobi tutoring company.*
>
> *(3) List the risks of hiring (separately for the business, the new hire, and the existing freelance tutors). For each, estimate severity if it happens (low / medium / high).*
>
> *(4) Make the strongest possible counterargument to hiring — the case that I should not hire and should instead [name two alternatives the AI itself should generate].*
>
> *Do not recommend an answer. Do not weigh the lists. The choice will be mine.*

**The AI's response (excerpt).**

> *Questions you should be able to answer before deciding.*
>
> *Demand: Have I had to turn away tutoring work in the last three months because I did not have capacity? How regularly? Is the demand seasonal (term-time concentrated)? Is the demand for a level/subject a new junior tutor could realistically cover, or is it for the senior work I do myself?*
>
> *Capacity: How many billable hours per week could a junior tutor realistically deliver after a one-month onboarding? What is my own time cost in supervising a junior — and what billable work does that supervision displace?*
>
> *Finances: Beyond the six months of salary, what is my minimum cash buffer for the rest of the business? If demand drops by 20% for a month, can I still pay this person? At what point would I have to let them go, and what does that cost in trust and reputation?*
>
> *Team dynamics: How will my existing freelance tutors react to a full-time hire? Will they see less work? Are any of them better candidates for a part-time expansion than a new hire?*
>
> *Founder: Have I run a payroll before? Do I want to manage someone full-time? Is there a part-time or contract structure that would teach me whether I want to before I commit?*
>
> *Assumptions a "yes, hire" answer would be making.*
>
> *— That demand is steady and growing. (Often false in tutoring; demand is seasonal.)*
> *— That a junior tutor's hours will be mostly billable. (Often false in the first three months.)*
> *— That the founder's time is freed up by hiring. (Sometimes false; supervision absorbs the time.)*
>
> *Risks (severity in parentheses).*
>
> *Business: salary obligation outlasts demand (high); founder time absorbed by management (medium); existing freelancers leave (medium).*
> *New hire: hired into unstable demand and let go in three months (high — for them).*
> *Existing freelancers: reduced hours; trust impact (medium).*
>
> *Counterargument to hiring.*
>
> *Two alternatives are stronger first moves. (a) Convert your most reliable existing freelancer to a part-time retainer with guaranteed hours — you commit less, they commit more, and you both learn. (b) Postpone the hire by one term (three to four months) and use that time to verify the demand pipeline by intentionally accepting more bookings; if you have to turn work away repeatedly during that period, the case for hiring will be much stronger and the financial assumptions will be tested in advance.*

**Aisha's decision (informed by the better prompt).** Aisha realises she has not actually had to turn down work consistently — she turned down two clients in the last three months but not weekly. She does not yet know whether her own time can fully cover a junior tutor's supervision. She talks to her two most reliable freelancers; one of them is interested in a part-time retainer. She decides to defer the full-time hire by one term, take that freelancer onto a 15-hour-per-week retainer, and recheck the demand picture at the end of the term.

**Decision memo excerpt.**

> *Decision: do not hire a full-time junior tutor this term. Move existing freelancer [Tutor X] onto a 15-hour-per-week retainer, beginning [date]. Re-evaluate the full-time hire at the end of the term, using the demand log we will keep over the next twelve weeks.*
>
> *Why not hire now. The questions surfaced by AI showed I could not yet answer the demand question — I had not been turning down work consistently. Hiring on a six-month cash position with an unverified demand pipeline puts both the business and the new hire in a fragile position. The retainer route is reversible; the full-time hire is not, on the timescales that matter.*
>
> *What changes the decision. If, over the next twelve weeks, I have to turn down more than four bookings I would otherwise have taken, the demand assumption is verified and the full-time hire becomes the next step.*
>
> *AI assistance. AI was used to generate questions, name assumptions, list risks, and produce a counterargument to hiring. AI did not recommend an answer; the choice and the plan are mine.*

**What the learner should notice.** The first prompt asked AI to do the wrong job. The second prompt asked AI to do the job AI is actually good at — generating questions, surfacing assumptions, listing risks, producing counterarguments — and explicitly forbade the answer. Aisha's decision-making improved not because the AI got smarter but because the prompt structure changed what the AI was being asked to support. The Module 4 lesson on prompt structure is doing work here: the better prompt is more constrained, more specific, and more deliberate about what is and is not in scope.

## Supplied practice activity materials

These activities use the same discipline the worked examples demonstrated. Do them in order. Save your outputs in a single file you can attach to your portfolio later.

### Practice activity 1 — Criteria builder (25–30 minutes)

For each of the three decision scenarios below, produce: (a) the decision question in one sentence, in your own words, (b) three to five criteria with a weight (high / medium / low) and a non-negotiable label where appropriate, (c) an explicit reversibility assessment (easy / costly / not reversible), (d) a stakeholder list with two to four entries, and (e) the decision owner by role.

You are *not* picking a winner in this activity. You are setting up the decision frame. Resist the urge to skip ahead to options.

**Scenario A.** A microfinance officer has been offered a transfer from her current branch in Kisumu to a new branch the organisation is opening in Eldoret. The transfer comes with a 10% pay rise and a one-year posting commitment. She has a school-age child in Kisumu and her partner works locally.

**Scenario B.** A small accounting firm in Nairobi is choosing between (i) hiring a second junior accountant, (ii) outsourcing bookkeeping for their smallest clients to a third-party bureau, or (iii) keeping the current setup and simply turning down new work. The senior partner is the decision-maker.

**Scenario C.** A community library in Mombasa is deciding whether to introduce a small membership fee (KES 100 per year) for non-students to cover rising operating costs. The library has been free since it opened. The decision sits with the library committee.

### Practice activity 2 — Option comparison matrix (25–30 minutes)

Produce a comparison matrix for the following scenario. Use at least three options and at least five criteria. Mark cells where you do not have the information *needs verification* — do not fill them with guesses. Do not pick a winner.

**Scenario.** A small Nairobi marketing agency, eight people, is choosing where to host a one-day client event for thirty guests in two months' time. The agency wants the event to feel professional but not extravagant; the budget cap is KES 150,000 all-in (venue, catering, AV, basic décor). Three venue options are on the table:

- *Option 1 — A boutique hotel in Westlands.* Quoted at KES 5,500 per person all-in. Has hosted similar events. Easy to access by Uber. Parking is limited (8 spaces). The hotel's standard package includes basic AV.
- *Option 2 — A co-working space in Kilimani with a 40-person event hall.* KES 90,000 venue rental for the day. Catering is separate (the agency would commission a caterer; estimates suggest KES 1,800 per person). AV available for an additional KES 25,000. Parking is on-street and informal.
- *Option 3 — A garden venue in Karen.* KES 4,200 per person all-in including catering. Beautiful setting. Roughly 45 minutes from the city centre at peak hours. AV setup is the agency's responsibility (a vendor quote of KES 30,000 has been obtained). Parking is ample.

The agency's criteria, in their own initial wording, are: *cost*, *guest experience*, *travel time for guests*, *AV reliability*, *parking*. You may add or refine criteria if you think the list is missing something — name what you added and why.

### Practice activity 3 — Assumption hunt (25–30 minutes)

Read the AI-generated recommendation below. Do *not* accept it. Do four things, in order: (a) list at least four assumptions the recommendation is making — assumptions that, if wrong, would change the recommendation; (b) for each assumption, write what would have to be true in this specific situation for the assumption to hold; (c) write a follow-up prompt that would ask AI to test those assumptions explicitly, including a request for the perspective of one stakeholder you think the AI did not have in view; (d) write two sentences on how you would actually verify the most important assumption (which sources, which conversations, what evidence).

**The AI-generated recommendation.**

> *You should accept the partnership offer from the larger NGO. A two-year co-implementation agreement at the size you describe — KES 4M per year for your team to deliver health-outreach services in three counties — would more than double your current revenue, give you stability for two budget cycles, and signal to other donors that you are at a delivery scale that makes you eligible for direct grants. Risks are manageable: most co-implementation agreements include exit clauses, and your existing funders are unlikely to react negatively because the work expands rather than replaces what you are already doing. The case for accepting is strong; the main thing to negotiate is the reporting cadence and the visibility you will receive in their public communications.*

### Practice activity 4 — Recommendation challenge (30–35 minutes)

Read the polished AI recommendation below. Treat it as a starting point you do not yet trust. Produce a counter-recommendation that:

- Uses *different criteria weighting* — name two criteria the AI's recommendation under-weighted and explain why your context weights them higher;
- Names at least two stakeholders the AI's recommendation did not have in view, and what each would prioritise differently;
- Includes at least one *needs verification* item the AI's recommendation glossed over;
- Reaches a different conclusion *or* the same conclusion with substantially different reasoning, and explains the difference;
- Closes with a one-paragraph human-owned decision memo (not a recommendation — a decision, with a date, an owner, and a reversibility note).

**The AI's recommendation.**

> *Recommendation: launch the new product line in Q3 (July–September) rather than Q4 (October–December).*
>
> *Q3 is the stronger window for three reasons. First, it gives you a full quarter of sales data before the year-end review, which strengthens the case for continuing the line into next year. Second, customer attention is more available in July–September; Q4 is crowded with competing year-end campaigns and December slowdowns. Third, your supply chain has confirmed it can deliver the full launch volume by mid-June, which leaves a comfortable buffer for a July launch.*
>
> *The main risks are minor. Your team will be running the launch alongside the existing summer campaign; you have done parallel campaigns before. The launch budget of KES 600,000 is within the marketing reserve. Customer feedback from the small pilot in May was positive, with 78% of pilot users saying they would recommend the product.*
>
> *Action: confirm the July launch date with the supply chain partner this week and brief the marketing team on the Q3 plan.*

The context: this is a small Kenyan consumer-goods business with twelve staff, two of whom are currently on extended leave, and an existing summer campaign that the marketing lead has already flagged as understaffed.

## Pause and check

Three short self-check questions before you move to the knowledge-to-output task. Try to answer each one in your own words before you read on.

1. In your own words, what is the difference between *decision support* and *decision ownership*, and why does the second one not transfer to AI?

2. You have written a clear decision question and a strong list of criteria. You ask AI to compare three options against the criteria. The AI replies with the comparison and recommends Option B. What three checks should you run before you act on the recommendation?

3. A colleague tells you the AI recommended their decision and they are going with it. They cannot remember the criteria they used. What part of the decision frame is missing, and what is the practical risk of acting without it?

If your answer to any of these felt thin, return to the relevant part of the core lesson before continuing. Question 1 maps to *Support is not ownership* and *Recommendation versus decision*. Question 2 maps to *How the AI frames the problem for you* and *Asking for counterarguments*. Question 3 maps to *The structured decision frame* — specifically, *criteria* and *decision owner*.

## Knowledge-to-output task

Choose one real or supplied decision you face. The decision should be small enough to think through in one session and important enough that you would actually want to keep your reasoning afterwards. If you do not have a real decision in front of you, use one of the supplied scenarios from Practice activity 1.

Produce three artifacts in a single file. Together they form the portfolio deliverable.

**Part 1 — Decision Criteria Table.** Write the decision question in one sentence, in your own words, *before* you open an AI tool. List three to seven criteria. For each, name a weight (*high*, *medium*, *low*) and whether it is *non-negotiable*. Add a one-line constraint summary (budget, timeline, authority, policy, capacity). Add a one-line stakeholder list — who else is affected. Add the decision owner by role. None of this part is produced with AI.

**Part 2 — Options/Tradeoffs Matrix.** List two to five options, including the do-nothing option where it is realistic. For each option, fill a row of the matrix with cells for each criterion. Use *meets / partially meets / does not meet / needs verification* as cell values. For each option, name the most important tradeoff (one sentence: *what is gained, what is given up*) and the worst plausible failure (one sentence: *what could go wrong, how reversible is it*). AI may be used to draft this matrix from your criteria; the *needs verification* labels and the tradeoff sentences are yours.

**Part 3 — Human-Owned Decision Memo.** Write a memo of 250–500 words containing: the decision question; the choice; why this option and not the others; the tradeoff you are accepting; the missing information you have not resolved and how you will resolve it (or accept it); the stakeholder impact; the reversibility note; the decision owner; and a short disclosure note describing what AI was used for and what the human reviewed and changed (use the Course1_Disclosure_Note format). The memo is in your voice, written by you. The AI may be used to suggest a structure or tighten the prose; the reasoning, the choice, and the responsibility are yours.

**Self-check before you save.** Read the memo to a friend (or out loud to yourself). If they cannot tell from the memo alone (a) what you decided, (b) why, (c) what you are accepting in tradeoff, and (d) what you do not yet know, the memo is not finished. If the memo could have been written with the names changed by anyone with the same AI tool, the *human-owned* part is not yet there — add the specific reasoning that only you can write.

## Checkpoint quiz

Eight questions. The pass threshold is at least 6 of 8 questions correct. Take this once you have completed the worked examples, the practice activities, and the knowledge-to-output task.

**1.** *(Multiple choice)* Which of the following best describes the role of AI in decision-support work as taught in this module?

a) AI provides the recommendation; the human approves or rejects it.
b) AI defines the criteria and the options; the human ranks them.
c) AI helps clarify options, criteria, tradeoffs, risks, and missing information; the human makes and owns the decision.
d) AI and the human jointly own the decision, with accountability shared between them.

**2.** *(Multiple choice)* Which of the following is the *correct* order in a structured AI-assisted decision?

a) Define options first, then ask AI to suggest criteria for evaluating them.
b) Define criteria first, then compare options against the criteria.
c) Let AI propose both criteria and options, then choose the highest-ranked option.
d) Ask AI for a recommendation first, then work backward to identify criteria.

**3.** *(Scenario)* Lydia is a programme officer choosing between two grant management tools. She prompts: *"Which tool is better for our team?"* and gets a fluent recommendation for Tool A. She forwards the recommendation to her manager as her proposed choice. Identify two specific failures in how Lydia used AI for this decision, and name what she should have done instead.

**4.** *(Scenario)* A small business owner asks AI: *"Should I lay off my marketing assistant to save costs?"* and pastes the assistant's recent performance notes, salary, and a one-paragraph description of their personal situation. List two distinct problems with this approach: one related to decision support, one related to information that should not be in the prompt at all. What would a more responsible version of this analysis look like?

**5.** *(Short answer)* In your own words, define *framing bias* as it applies to AI-generated recommendations, and describe one practical way to surface it after the AI has produced its first answer.

**6.** *(Short answer)* Why does the practice in this module insist that *missing information* is labelled visibly inside the analysis (e.g., as *needs verification*), rather than smoothed over by the AI's prose? Give two reasons in your own words.

**7.** *(Application)* Write a prompt that asks AI to support — but not to make — a decision about whether to switch your team's communication tool from WhatsApp groups to a more structured platform. Your prompt must include: a clear decision question, at least four criteria with weights, an explicit stakeholder list, an explicit instruction not to recommend a winner, and an explicit instruction to produce questions, risks, and counterarguments rather than a recommendation. Write it as a real prompt you would send.

**8.** *(Application — integration)* Read the supplied recommendation below. In 200–300 words, produce a *human-owned decision memo excerpt* that (a) accepts, modifies, or rejects the recommendation, (b) names at least one tradeoff explicitly, (c) flags at least one item as *needs verification*, (d) names at least one stakeholder the recommendation did not consider, (e) addresses reversibility, and (f) closes with a disclosure note describing AI use.

> *Recommended supplied input.* The AI has recommended that a small Nairobi-based delivery business should expand from one route (Nairobi CBD) to three routes (CBD, Westlands, Kilimani) in the next month. The recommendation says revenue could double, the existing van has spare capacity, and the existing driver could absorb the new routes. The business has one driver, one part-time operations coordinator, and one founder.

## Answer key with explanations

**1.** *Correct: c.* AI's role is to clarify and surface — questions, risks, options, tradeoffs, missing information — while the human makes and owns the decision. Option (a) is wrong because it positions AI as the decision-maker, with the human only ratifying; this is the *forwarded recommendation* failure mode. Option (b) hands the framing (criteria) to the AI, which is exactly what *criteria before options* prevents. Option (d) is the *unclear accountability* failure mode from Module 9 and Module 12 — accountability does not split between human and tool. The whole module rests on the rule that decision ownership remains human.

**2.** *Correct: b.* Criteria are defined first because the criteria define what the comparison is *for*; options compared in the absence of criteria are scored against whatever criteria the AI happens to surface, and that is precisely the framing-bias failure mode. Options (a), (c), and (d) each invert the order and let the AI choose what the comparison should care about.

**3.** *Strong-answer criteria.* The answer should name at least two of: (i) Lydia did not define criteria before asking the AI to compare — she asked *which tool is better* with no frame, so the AI supplied the criteria; (ii) Lydia treated the AI's recommendation as her decision rather than as input — the *forwarded recommendation* failure; (iii) Lydia did not name the decision owner, the constraints, the missing information, or the tradeoff — the structured decision frame was absent. The *what she should have done instead* must include at least: defining criteria first; asking AI for a comparison against those criteria with *needs verification* labels permitted; producing a short decision memo in her own voice that sits behind the proposal to her manager. Bonus: notes that the memo would name the tradeoff explicitly and disclose AI use.

**4.** *Strong-answer criteria.* The answer should identify two distinct problems. *Decision-support problem*: the question asked AI to make the call (*should I lay off…*) rather than asking AI for questions, risks, assumptions, and counterarguments; this is the *forwarded recommendation* failure on a high-stakes, irreversible decision that should have been escalated to HR/legal advice rather than supported by AI. *Information problem*: pasting an identifiable employee's performance notes and salary into a general AI tool is a Tier 3 / Tier 4 privacy violation under Module 10; the AI should not have been given that input regardless of the question. The *more responsible version* must include: not pasting the employee's identifying information; if AI is used at all, using it for general questions about how to think about a layoff (questions to ask, risks to consider, alternatives to layoffs, what HR/legal advice to seek) without the specific case; the actual decision being escalated to HR, legal counsel, or an experienced advisor. Bonus: notes that even in the abstract, AI is not the appropriate primary support for a decision that ends a person's job.

**5.** *Strong-answer criteria.* Framing bias is named as the way an AI's choice of words, emphasis, or angle in setting up a problem shifts which criteria, options, and tradeoffs become visible — *not* the AI being factually wrong, but the AI shaping what counts as the question. The practical surface technique should be one of: explicitly asking the AI to reframe the decision from a different perspective (a stakeholder it did not centre, a constraint it did not lead with, a value it did not name); asking for the strongest possible counterargument to the original framing; asking the AI to list the assumptions in its first-paragraph framing. Bonus: notes that writing the frame yourself before the AI is consulted is the upstream version of the same defence.

**6.** *Strong-answer criteria.* Two distinct reasons. *Honesty about the evidence*: visible *needs verification* labels keep the level of confidence in the analysis matched to the level of evidence behind it — without the labels, fluent prose makes uncertain conclusions read as solid (Module 11's flattening problem). *Decision quality*: a decision made with unknowns visible can be made carefully and revised when the unknowns resolve; a decision made with unknowns hidden is harder to revise because the missing information is not in the record. Bonus: notes that visible missing information also tells the decision owner what verification work to do before acting, rather than leaving it implicit.

**7.** *Strong-answer criteria.* The prompt must include: (i) a clear single-sentence decision question (e.g., *"Should our team of N people switch from WhatsApp groups to a structured platform such as Slack or Discord, or stay on WhatsApp?"*); (ii) at least four criteria, each with a weight (high / medium / low); (iii) at least three stakeholders named (the team, the founder/manager, customers if affected, any external collaborators); (iv) an explicit instruction *do not recommend a winner*; (v) an explicit instruction to produce questions, risks, and counterarguments. A prompt that meets all five is acceptable. A prompt that meets three or four is partial. A prompt missing the *do not recommend* instruction or the *produce questions/risks/counterarguments* instruction is unacceptable, because the prompt would default to asking the AI to decide.

**8.** *Strong-answer criteria.* The decision memo excerpt must contain all six elements. (a) A clear position on the recommendation: accept, modify, or reject, with reasoning. The strong response will likely *reject or substantially modify* the AI's recommendation, given the obvious capacity constraint of one driver covering three new routes. (b) At least one tradeoff named explicitly (e.g., *"faster revenue growth at the cost of overworking the only driver"*). (c) At least one *needs verification* item — for example, the actual capacity of the existing van for three routes' worth of daily volume, the actual demand in Westlands and Kilimani, the legal driver-hours limit, or the cost of hiring a second driver. (d) At least one stakeholder named that the AI ignored — most clearly the driver themselves, but credit also for the operations coordinator's bandwidth, customers expecting reliable service, or any external partners. (e) An explicit reversibility note (signing leases for additional vans is harder to reverse than testing one new route on existing capacity for one month). (f) A disclosure note in the Module-9/Course1_Disclosure_Note format. Strong responses recognise that the AI's recommendation under-weighted the people-capacity question and over-weighted the van-capacity figure; they typically propose a smaller-step alternative (e.g., add one route on a one-month trial with an explicit overload check, rather than three routes immediately). A response that accepts the AI's recommendation as written, without any modification or stakeholder note, is unacceptable regardless of polish.

## Portfolio artifact

**Artifact:** *Decision Criteria Table + Options/Tradeoffs Matrix + Human-Owned Decision Memo* (the three artifacts from the knowledge-to-output task, combined into one deliverable).

**Required filename:** `Module13_Decision_Memo_[YourName].pdf` or `Module13_Decision_Memo_[YourName].docx` (substitute your real name in the bracketed field; do not include the brackets in the actual filename).

**Required contents.**

- *Decision question* — one sentence, in your own words, written before any AI tool was opened.
- *Criteria table* — three to seven criteria with weights (*high / medium / low*) and *non-negotiable* labels where appropriate.
- *Constraints summary* — budget, timeline, authority, policy, and capacity boundaries.
- *Options considered* — at least two, including the do-nothing option where realistic.
- *Tradeoffs matrix* — options × criteria, with cells using *meets / partially meets / does not meet / needs verification*.
- *Risks and constraints note* — for each option, the worst plausible failure and an estimate of likelihood (low / medium / high).
- *Missing information* — what you would need to know to decide more confidently and have not resolved.
- *Stakeholder impact note* — who is affected by the decision beyond you, and what each stakeholder would prioritise.
- *Reversibility note* — *easily reversible / costly to reverse / not reversible*, with one sentence on what would be required to undo the decision.
- *Final human-owned decision memo* — 250–500 words containing the decision, the reasoning, the tradeoff accepted, the missing information you have or have not resolved, the decision owner by role, and the date.
- *Disclosure note* — one short paragraph describing what AI was used for, what you reviewed, and what you changed (use the Course1_Disclosure_Note format).

**Acceptance criterion you can self-check against.** Pick three sentences from the decision memo. For each, you should be able to point to (1) the criterion or constraint in your decision frame that the sentence rests on, and (2) the human reasoning behind the sentence — i.e., something you can explain that an AI could not have produced from the inputs alone. If any of the three breaks the chain, the memo is not yet *human-owned*.

**Pathway connection.** This artifact is direct, usable evidence for the *Small Business and Entrepreneurship* and *AI Productivity Professional* pathways, where the ability to make a defensible, AI-supported choice and write the reasoning down is recognisable work product. It also strengthens the *Remote Work and Freelancing* portfolio, where clients value a contractor who can explain *why* they made a recommendation, not only *what* they recommended. For *Junior Tech Builder* learners, the same artifact maps to product-decision work — choosing between feature options, vendor tools, or implementation approaches — without changing structure.

## Capstone-save reminder

Save this artifact in `Jifunze_AI_Essentials_Portfolio/13_Decision_Support/` using the filename pattern above. The decision memo and the supporting matrix will be referenced again in three places.

In Module 14, the decision memo becomes input to the team-decision and review-standards work. *Who reviews a decision before it goes out, who is consulted, how disagreement is recorded, how AI use is disclosed inside a team* — Module 14 takes the human-ownership discipline you practised here and asks how it survives when more than one person is in the loop. A weak Module 13 memo (no clear owner, no visible reasoning, no disclosure) will not adapt cleanly into a team review process.

In Module 15, the prompts you used to ask AI for *questions, risks, assumptions, and counterarguments* are strong candidates for inclusion in your prompt pack. They are exactly the kind of reusable prompt that earns its place in a personal toolkit: structured, decision-stage-specific, and useful across more than one situation. Save the prompt and the kind of decision it best supports so it can be lifted directly into the Module 15 artifact.

In Module 16 (Capstone), the decision memo joins the workflow SOP from Module 12 and the synthesis brief from Module 11 as one of the named portfolio components for the end-to-end AI-supported workflow demonstration. A capstone whose final stage is a decision will use this module's discipline directly. Save the file now, under the correct name; do not leave it for capstone week.

## Module completion evidence

You have completed Module 13 meaningfully when:

- You can describe, without looking back, the difference between *decision support* and *decision ownership*, and explain why the second cannot transfer to AI.
- You have produced the three-part portfolio artifact and saved it under the required filename.
- Your decision memo names the criteria before discussing the options, names at least one tradeoff explicitly, includes at least one *needs verification* label inside the analysis (not in a footnote), names at least one stakeholder beyond you, and addresses reversibility.
- The memo is recognisably *yours* — a different learner using the same AI tool with the same decision could not produce the same memo because the reasoning includes context only you have.
- You scored at least 6 of 8 on the checkpoint quiz, and your scenario and application answers meet the strong-answer criteria above.
- The disclosure note describes any AI assistance you used, and the human review notes describe what you accepted, changed, and flagged as still uncertain.
- No information you classified as Tier 3 or Tier 4 (Module 10) was pasted into an AI tool in raw form during this work.

## Revision guidance

If you struggled with this module, the failure mode is usually one of seven. Each one has a specific section to revisit.

*You let AI choose the decision.* Your prompt asked AI for a recommendation and you accepted the recommendation as the decision. Return to *Support is not ownership* and *Recommendation versus decision* in the core lesson, and re-read Worked example 4 (better use of AI for question generation). Then redo Practice activity 4 with a stricter discipline: write the counter-recommendation in your own voice, with reasoning AI did not produce.

*You defined options before criteria.* The comparison was already underway before the criteria were stable, which means the AI's first paragraph supplied the criteria you ended up using. Return to *Criteria before options* and *How the AI frames the problem for you* in the core lesson, and redo Practice activity 1 (criteria builder) for one of the supplied scenarios. The criteria, the weights, and the non-negotiables go on the page before any option appears.

*You ignored stakeholder impact.* The decision was framed as personal when it was not. Return to *The structured decision frame* (specifically *stakeholders*) and re-read Worked example 2 (the stakeholder-blind recommendation). Then take your own decision memo and ask: who else is affected, and what would each stakeholder prioritise differently? Add a stakeholder impact note before resubmitting.

*You failed to flag missing information.* The matrix was confident in cells where the evidence was thin, or the memo asserted things you cannot verify. Return to *The structured decision frame* (specifically *missing information*) and to Worked example 3 (decision matrix with missing information flagged). Then go back through your matrix and your memo and apply *needs verification* labels honestly. Where the label appears, the language must reflect it — softer claims, named questions to resolve, named verification steps. This is Module 11's uncertainty discipline applied to decisions.

*Your decision memo has no human reasoning.* The memo is a polished restatement of the AI's analysis. A different learner with the same prompt would have produced the same memo. Return to *Recommendation versus decision* and to the *human-owned decision memo* portion of Worked example 1. Then rewrite at least three sentences of your memo to include reasoning only you could supply — the relationship history, the team-specific concern, the recent experience, the value you weight more heavily because you have lived with the consequences of weighting it less.

*You used sensitive or restricted information improperly.* The decision support involved Tier 3 or Tier 4 content (Module 10) in raw form — identifiable people, salaries, performance, medical, legal, financial, immigration, or similar — and that content reached a general AI tool. This is the most serious failure mode and the one with consequences beyond the module. Return to Module 10's minimum-necessary test and the four-tier classification, then re-read *Privacy boundaries inside decisions* in the core lesson here. The fix is structural, not stylistic: rebuild the decision so the AI works from your abstractions, not from the raw case. If the case cannot be abstracted without losing the substance of the decision, the decision belongs with HR, legal counsel, a mentor, or an advisor — not in a chat window.

*You treated a high-stakes decision as a simple prompt task.* The decision was irreversible, regulated, or affected third parties who had not consented to AI involvement, and the workflow nonetheless ran like an ordinary AI-assisted task. Return to *High-stakes decisions and escalation* in the core lesson, and reread the test at the end of that section. Decisions in this category move from *AI-supported* to *human-led with peripheral AI use only*. The next step is escalation, consultation, or expert review — not a more clever prompt.

## Transition to the next module

Module 13 helped you keep decisions human-owned while using AI to clarify options, criteria, tradeoffs, risks, and missing information. You learned to define the decision question and the criteria before any option was compared, to detect framing bias inside a recommendation that already sounded reasonable, to ask for counterarguments and alternative views on purpose, to flag missing information visibly inside the analysis, to name the stakeholders the AI did not have in view, and to write a memo whose reasoning a different learner with the same prompt could not have produced.

Module 14 moves from individual decision-making into shared AI use. The same disciplines you practised here — criteria, tradeoffs, missing information, stakeholder impact, decision ownership, disclosure — are about to meet a different question: how do they survive when more than one person is in the loop? When a teammate uses AI to draft something you will review. When a colleague's prompt produces an answer your team will act on. When a manager wants to know whether an output you presented was AI-assisted, and how it was reviewed. Module 14 takes everything you have built so far — accountability from Module 9, privacy from Module 10, evidence trails from Module 11, workflows from Module 12, decision ownership from Module 13 — and applies it to teams and organisations. You will set expectations, assign review ownership, disclose AI use to people who were not in the room, and prevent the hidden or inconsistent AI practices that are usually the difference between a team that can rely on its own work and a team that cannot.

## Notes for Cursor mapping

**Suggested module id:** `ae-m13`

**Suggested session/block breakdown.** Map the module into eight platform lesson blocks rather than rendering the whole document as a single unit:

1. *Overview block* — Continuity bridge from Module 12 + What was wrong before + What was improved + Estimated time + Module purpose + Learner outcomes.
2. *Concept block* — Core lesson, in two sub-blocks if the platform supports nested blocks. Sub-block A: *Support is not ownership*, *Recommendation versus decision*, *The structured decision frame* (the ten elements), *Criteria before options*. Sub-block B: *How the AI frames the problem for you*, *Asking for counterarguments*, *Using evidence trails (Module 11)*, *Workflow ownership inside decisions (Module 12)*, *Privacy boundaries inside decisions (Module 10)*, *High-stakes decisions and escalation*.
3. *Guided example block* — The four worked examples. Worked examples 1 and 3 demonstrate criteria-led comparison with missing information surfaced; 2 demonstrates the stakeholder check; 4 demonstrates the move from asking AI to decide to asking AI for questions, risks, assumptions, and counterarguments. Each example renders cleanly as its own collapsible card.
4. *Practice block* — The four practice activities, each as its own task card with the supplied scenarios embedded. Activities 1 and 2 are matrix-and-criteria building; 3 is assumption hunting against a supplied AI recommendation; 4 is a counter-recommendation against a polished AI recommendation.
5. *Reflection block* — The Pause and check questions. Render as three separate reflection prompts the learner can answer in-line.
6. *Checkpoint block* — The eight checkpoint questions, mapped per the quiz mapping notes below.
7. *Artifact upload block* — The Decision Criteria Table + Options/Tradeoffs Matrix + Human-Owned Decision Memo. Single combined upload (.pdf or .docx) using the required filename pattern.
8. *Remediation block* — The Revision guidance section, with each failure mode rendered as a clickable card linking back to the relevant section of the concept and guided-example blocks.

**Likely content block types.** Long-form prose (concept blocks). Tables (criteria, decision matrices, tradeoffs). Collapsible cards (worked examples). Task cards with supplied scenarios (practice activities). Mixed-format quiz block (checkpoint). Single-file upload field (artifact). Linked-card grid (remediation).

**Quiz mapping notes.** Questions 1 and 2 are multiple-choice with one correct answer and three plausible distractors — render as standard radio-option blocks, auto-graded. Questions 3 and 4 are scenario-based — render as short-answer text boxes (suggested 80–200 words), self-graded against the answer-key strong-answer criteria, with optional AI-assisted or facilitator-assisted grading layered on. Questions 5 and 6 are short-answer — render as short-answer text boxes (suggested 30–80 words), self-graded. Question 7 is application (prompt-writing) — render as a longer text box, self-graded against the five required prompt elements in the answer key. Question 8 is application/integration — render as a longer text box (200–300 words), self-graded against the six required memo elements. The eighth question is the most authoring-heavy item; pair it with the answer key's strong-answer criteria as a visible rubric on the answer-key reveal screen.

**Portfolio artifact mapping notes.** The artifact is a single combined document (.pdf or .docx) containing the three sub-artifacts in order. The filename pattern (`Module13_Decision_Memo_[YourName].pdf` or `.docx`) drives the upload-block filename validator. The acceptance criterion (three sentences traceable to criteria/constraints and to human reasoning) is the self-check visible on the upload screen. The pathway-connection note powers the *most relevant for your pathway* signal on the dashboard.

**Special UI needs.** The decision-matrix block in the worked examples and practice activities benefits from a structured table component rather than free-text. Consider providing a simple matrix template (criteria as rows, options as columns, *meets / partially meets / does not meet / needs verification* as cell-value picklist) inside the practice and artifact-upload blocks. The same template, exported as a PDF or DOCX page, becomes the matrix part of the portfolio artifact and reduces the risk of learners producing a free-form table that fails the acceptance criterion on layout grounds.

**File mapping.** The module is mapped as one improved file: `Jifunze_Course1_Module_13_Improved.md`. No companion files are needed for this module beyond the references already in the course-level scaffolding (Course1_Quality_Benchmark.md, Course1_Assessment_Standards.md, Course1_Tool_Stance.md, Course1_Disclosure_Note.md, Course1_Pathway_Map.md, Course1_Portfolio_Guide.md).
