# Module 14: AI in Teams and Organizations

## Continuity bridge from Module 13

Module 13 taught you to keep decisions human-owned even when an AI tool was helpful at every other part of the work. You learned to define the decision question yourself before any prompt, to set criteria before options, to surface tradeoffs and missing information rather than smooth them out of fluent prose, to detect framing bias in a recommendation that arrived sounding correct, and to close the loop with a decision memo that named the owner and the reasoning. The discipline that held it together was short: AI may support thinking; the decision remains human-owned.

Module 14 keeps that rule and changes the unit of work. Module 13 was about a person making a single choice with AI's help. Module 14 is about people making many choices, drafting many outputs, and running many workflows together — and using AI inside that shared work without losing track of who did what. The risk shifts the moment more than one person is in the loop. In a solo decision, the questions *who used AI?*, *who reviewed the output?*, *what was shared with the tool?*, *what standard was followed?*, and *who is accountable?* all collapse into one person, who at least has the option of answering them honestly. In a team, those five questions can land on five different people, on five different days, with five different mental models of what was acceptable, and the team can ship the resulting work without anyone realising the questions were never answered at all.

Carry forward four things from earlier modules in particular. The decision-ownership discipline from Module 13 — *AI may support; the human owns* — applied now to *which* human, on which step, in a chain of work several people contributed to. The workflow-ownership discipline from Module 12 — named owners at each stage, named review points, named human-only steps — applied now to teams whose members may not be in the same room or even the same time zone. The privacy discipline from Module 10 — Tier 3 / Tier 4 inputs do not enter general-purpose AI tools — applied now to data that travels between teammates and may be sanitised inconsistently before it ever reaches a prompt. And the accountability discipline from Module 9 — *AI did the analysis* is not an answer to *who decided*, and the same is true of *AI drafted it* and *who shipped it*. Shared AI use is what those four disciplines are for.

The principle for this module, written down so you can keep it in front of you while you read: *individual AI skill is necessary, and it is not enough.* A team where every member is individually skilled at AI use, and where no shared standard exists for disclosure, review ownership, data boundaries, prompt quality, and approval, will produce work that is uneven, hard to audit, and impossible to defend the day a customer, a regulator, a client, or a senior leader asks the question that begins *who wrote this, and what did they check?*

## What was wrong before

The original module named the right ideas — *AI in teams*, *organisational use*, *governance* — but stopped before any of them were teachable. *"Hidden AI use can cause problems"* appeared as a single sentence, but the actual mechanics of how hidden AI use creates quality, privacy, and accountability problems — and what a small team can do about it without writing a corporate policy — were implied rather than worked out. The difference between disclosure (telling a reader AI was used), review ownership (naming who is responsible for checking AI-assisted work before it ships), approval (naming who can sign off), and escalation (naming what triggers a higher review) was either missing or collapsed into a single paragraph that could not have taught any of the four.

Worked examples were named, not written. *"Team meeting recap"* sat as a heading with no team scenario, no roles, no draft, no review checklist, and no answer to the most important question — *what must not be in the recap?* *"Shared customer response template"* sat as a heading with no template, no usage notes, and no escalation rule. A self-learner trying to follow the original would have produced their own template from scratch, with no model to compare against, while learning none of the things the example was meant to teach.

Practice activities lacked supplied team scenarios and had no solo-learner alternatives. Instructions like *"map the ownership for one of your team's processes"* assumed the learner had a current team and had a recurring process visible enough to map. A learner studying outside a workplace, between roles, on their own time, or in a study group with three friends had nothing to work with. The most common Course 1 failure mode — a learner with no supplied material, no model artifact, and no path that did not require a fully formed organisational context — was baked in.

Governance language was either absent or, where present, drawn from corporate templates that did not fit a four-person operations team, a small NGO programme, a freelance collective, or a study group of four learners working through Jifunze together. The original module either taught nothing about team standards, or taught a level of policy infrastructure that did not match the scale of the teams its learners actually worked in. Checkpoint questions were stubs. The portfolio artifact was named but had no defined contents, no acceptance criterion, and no stated relationship to the capstone or to Module 15. Revision guidance was generic. The transition into Module 15 was missing.

## What was improved

This version adds a complete team-AI-use model — six concrete coordination risks (hidden AI use, inconsistent quality, duplicated work, leakage of sensitive information, ambiguous review ownership, and inconsistent disclosure) that together explain why individually-skilled teams can still produce poor shared output — and teaches each of them in plain language rather than treating them as a generic warning. It adds a *governance-lite* model that scales to teams of three to thirty without pretending to be corporate policy: shared standards, prompt libraries, data boundaries, review checkpoints, escalation rules, version control, and accountability statements, each at the level of detail a small team can actually maintain.

It adds four fully written worked examples — a team meeting recap workflow, a shared customer-response template, a diagnostic of inconsistent prompt use producing uneven output across teammates, and a one-page team AI use agreement — each with the actual scenario, the actual roles, the actual prompt or template, the actual review checklist, the actual standard, and an explicit statement of what must *not* be included or done. It supplies four practice activities with full source material and explicit solo-learner alternatives so that a learner with no current team can use a hypothetical four-person team, a study group, a volunteer project, a side project, or a future workplace scenario without losing the substance of the activity. It includes eight checkpoint questions across the four required formats, an answer key with strong-answer criteria, a named portfolio artifact (the *Team AI Use Agreement + Responsibility Map + Shared Prompt Artifact*) with a defined filename pattern and a self-check acceptance criterion, an explicit capstone connection, revision guidance keyed to specific failure modes, and a Cursor-mapping note so the module can be split into platform lesson blocks without rewriting the teaching.

Module 9 (accountability), Module 10 (privacy and minimum-necessary information), Module 12 (workflow ownership and human-only steps), and Module 13 (decision ownership and stakeholder impact) are woven into the team-AI-use discipline rather than mentioned at the end. Module 3 (prompt control), Module 4 (structured prompt design), Module 5 (iteration and comparison), and Module 6 (verification) reappear at the points where the prompt itself is what is being shared, so the learner can return to those modules surgically rather than re-reading the course.

## Estimated time

Roughly three and a half to four and a half hours of focused work end-to-end.

- **Core lesson** — 50 to 60 minutes.
- **Worked examples** — 35 to 45 minutes (read once; re-read example 3 if you currently work with anyone else, and example 4 before you start the portfolio task).
- **Practice activities** — 75 to 95 minutes total (the four activities can be split across two sittings; activity 4 — the mini team policy draft — is the heaviest).
- **Knowledge-to-output task** — 60 to 80 minutes.
- **Checkpoint quiz and revision** — 15 to 20 minutes.
- **Total estimated time** — approximately 3h 45m to 4h 40m.

A learner who already coordinates work across people — team leads, programme managers, founders, operations associates, freelance leads, study group organisers — may move faster through the conceptual sections but should spend the full time on activities 3 and 4, since those are the activities that retrain a working professional out of the most common shortcut of the module: *we are all sensible people; we do not need a written standard.*

## Module purpose

Most early problems with AI use in teams are not about a single member using AI badly. The individual prompt was fine. The problem is structural: nobody knew a teammate had used AI on the draft, nobody had agreed what a good AI-assisted draft looked like before it landed in the shared folder, nobody had asked whether the data the prompt contained was the team's data to share, nobody had named which person was responsible for reviewing AI-assisted output before it was sent to a customer, and the team's three best AI users had each developed three slightly different prompt patterns that produced three slightly different versions of the same template. None of those failures looked dramatic on the day they happened. They look dramatic the day a customer reads two contradictory replies from the same team in the same week, or the day a senior leader asks who wrote a paragraph and three people each say *I think Aisha did, with AI?*

This module teaches the discipline that prevents those failures. You learn to see shared AI use as a coordination problem rather than only a skill problem; to name the six coordination risks that turn skilled individual users into uneven team output; to design disclosure, review ownership, data boundaries, prompt-library rules, escalation, and approval at the *governance-lite* level a small team can actually maintain; to write a one-page team AI use agreement that fits on a single screen; to design shared prompts and shared templates that another person could pick up and use responsibly without sitting next to the person who wrote them; and to apply the same discipline as a solo learner working with a hypothetical team, a study group, a volunteer project, or a future workplace scenario. The result is shared AI work that is honest about its sources, even in its quality, careful with its inputs, clear about who reviewed and approved, and reusable by colleagues who were not in the room when the prompt was first written.

## Learner outcomes

By the end of this module, you should be able to:

- Identify the coordination risks specific to shared AI use, and explain in your own words why individual AI skill is necessary but not enough in team settings.
- Explain why hidden AI use creates quality, privacy, and accountability problems even when each individual use was technically competent.
- Define review ownership for AI-assisted team outputs — who reviews, what they check, and what happens when the check fails — and distinguish review from approval and from disclosure.
- Create basic team standards for disclosure, data handling, prompt quality, and approval, written at the *governance-lite* level a small team can maintain without dedicated policy infrastructure.
- Design a shared prompt or workflow artifact that another person could use responsibly without verbal handover.
- Complete the same artifacts as a solo learner using a hypothetical team, study group, volunteer project, side project, or future-workplace scenario.
- Apply Module 10's privacy and minimum-necessary discipline, Module 12's workflow-ownership discipline, and Module 13's decision-ownership discipline inside team AI use, not as separate concerns layered on top.

## Core lesson

### Individual AI skill is necessary and not enough

You can have a team in which every member has finished Modules 1 through 13 and can hold their own in any prompt, verification, or decision-support discussion in this course, and still ship work that is poor, uneven, or unsafe. The reason is not that any of them used AI badly. It is that they used AI *separately*, with no shared agreement on what good looked like, what was acceptable to share with the tool, what counted as review, and what disclosure each artifact needed before it left the team.

A useful way to picture this: imagine four colleagues, all of whom are good drivers. Put them on the same road, at the same time, with no agreement on which side to drive on, what the speed limits are, or who has the right of way at junctions. Each one is individually competent. The system they create is unsafe. Shared AI use is the same. Individual skill is the engine. Shared standards are the road rules. Without the rules, the engines collide.

This module is about the road rules. It does not undo any of the individual discipline you have built across the course. It places that discipline inside a team setting, where the questions that mattered for one person — *who used AI?*, *who reviewed it?*, *what was shared?*, *what standard was followed?*, *who is accountable?* — now have to be answered for many uses, by many people, across many artifacts, in a way that someone who was not in the room can read and trust.

### The six coordination risks

Six failure modes show up reliably in teams that use AI without shared standards. Each is named, each is concrete, each has a fix. You will see them in the worked examples; you will design protections against them in the practice activities.

**Hidden AI use.** A teammate uses AI on a draft and does not say so. The work goes into a shared document, a customer reply, a board paper, or a team newsletter without any indication that a tool was involved. There may be no malice. The teammate may simply not have thought it was relevant. The problem is not the hiding itself; it is what the hiding prevents. A reviewer who does not know AI was involved cannot apply the right kind of review — they cannot check for the failure modes specific to AI output (fluent confidence with no source, hallucinated names or figures, framing drift, generic tone in a context that needs voice). A customer who does not know AI was involved is given the impression of a carefully written human reply when the reply may be a lightly-edited first draft. A regulator or auditor who later asks how a piece of work was produced is given an answer that is incomplete by accident. Hidden AI use is a problem because it deprives reviewers, customers, and auditors of the context they need.

**Inconsistent quality.** Two members of the same team use AI on similar tasks and produce work of noticeably different quality. One has a strong prompt pattern from Module 4 and verifies their outputs from Module 6; the other writes shorter prompts and checks less. From the outside, the work shipped by the team is uneven: a customer who interacts with the team twice in a month receives two replies that read like they came from two different organisations. The quality difference is not about who is more talented; it is about whose prompt and whose review discipline was used. Without a shared prompt standard, the team's quality is whatever the most rushed member produced that day.

**Duplicated work.** Two or three teammates independently write prompts for the same recurring task — drafting a meeting recap, summarising a customer ticket, reviewing a CV against a role description. None of them know the others have done it. Each version sits in a different person's chat history. The team is paying — in time and in cognitive load — for the same work three times, and the version most recently used is whichever one happened to be open. Duplicated work is what happens to a team without a shared prompt library.

**Leakage of sensitive information.** A teammate, in a hurry, pastes a document into an AI tool that contains information they would not have pasted on a calmer afternoon: a customer's name attached to a complaint, a colleague's salary inside a budget table, a candidate's interview notes, a confidential supplier rate. The Module 10 discipline they have personally is sound; the team's discipline is not, because nobody had agreed in advance what the team treats as a Tier 3 / Tier 4 input, what sanitisation is expected before pasting, and which tools are approved for which kinds of content. Leakage is rarely a malicious act inside a small team. It is almost always a coordination failure.

**Ambiguous review ownership.** AI-assisted output lands in a shared folder, a Slack channel, a draft email thread, or a Notion page. Nobody is unambiguously responsible for reviewing it before it ships. *We will all take a look* is the most common version of this failure mode, because *we will all* almost always means *no one specific person is committed*. The result is one of two things: either the most cautious member of the team becomes the unwilling reviewer of all AI output, or the work ships unreviewed because every reviewer assumed someone else was reading it. Ambiguous review ownership is a workflow design problem, and Module 12's named-owner discipline is the fix.

**Inconsistent disclosure.** Some artifacts the team ships disclose AI use; others do not. A customer who reads two emails from the same team — one with a small *AI assistance* note, one without — has no way to know whether the second email was AI-free or whether the disclosure was simply forgotten. A reader inside the organisation has the same problem. Disclosure that is sometimes present and sometimes missing is worse than disclosure that is consistently present, because the reader cannot interpret the absence. Without a team disclosure rule, every individual decision to disclose or not is a judgement call, and judgement calls vary between people.

These six are not a complete catalogue of everything that can go wrong; they are the coordination risks that show up early and often in teams using AI. The standards in the rest of the module are designed against them.

### Disclosure expectations

Disclosure inside a team is not the same as the personal disclosure note from Course1_Disclosure_Note.md, though the personal habit feeds the team standard. A team disclosure standard answers four short questions in writing, once, for the whole team to follow.

*Where does AI assistance need to be disclosed?* Some teams disclose on every artifact. Most disclose on artifacts that leave the team — anything reaching customers, clients, partners, regulators, the public, or another department — and skip disclosure on internal scratch work. The line should be written down so members do not have to redecide it for every artifact.

*What does the disclosure say?* A short, plain phrasing the team agrees on, so that disclosures across artifacts read consistently. The phrasing should follow the principles in Course1_Disclosure_Note.md — name the tool, the task, the human review, what changed, and what the human remains responsible for — at whatever level of detail the team's context calls for. A two-line internal disclosure is fine for a team operations document; a fuller paragraph is appropriate for a customer-facing report.

*Who is responsible for the disclosure being there?* The drafter, the reviewer, or the approver — name one. *Anyone who notices* is a sign nobody is.

*What happens if a disclosure is missing?* The artifact is paused until the disclosure is added, the same way a missing signature on a contract pauses signing. A team that treats missing disclosure as a normal correction (rather than as a failing) is a team where the standard becomes habit.

### Review ownership and approval

Review and approval are different acts, and a team that conflates them tends to ship unreviewed work because the reviewer thought they were the approver and the approver thought the reviewer had checked the content.

**Review** is a check against a defined standard. *Are the facts right? Are the names spelled correctly? Does the tone match the audience? Are there claims the AI may have hallucinated that need a source? Has any sensitive content been left in by accident? Does the disclosure read truthfully?* Review is content-level. It is usually done by a colleague with the right context — a peer for routine work, a more senior reviewer for higher-stakes work — and it is the place where AI output becomes work the team can stand behind. A review with no defined check is not a review; it is a glance.

**Approval** is the authority to release the work. *I have read this and I am willing for it to leave the team.* Approval is role-level. Some artifacts can be self-approved (a member's internal notes); others need peer approval (a customer reply during normal hours); others need senior approval (a customer reply during an active complaint, a partner-facing report, a public statement, anything irreversible). Approval implies accountability: the named approver is the person who answers when the artifact's content is questioned later.

A team that names *who reviews* and *who approves* — separately — for each kind of artifact is a team that has solved the most common coordination failure in shared AI use. A team that writes *we will review each other's work* without naming who, when, or against what standard is a team that ships unreviewed AI output as a matter of routine.

### Governance-lite: standards small teams can actually keep

The word *governance* sounds like a corporate function with a dedicated team. *Governance-lite* is what a small team needs: enough shared standard to coordinate, light enough that maintaining the standard does not become a new full-time job. Seven elements together cover the territory.

**Shared standards.** A short document — one to two pages — describing what the team agrees about AI use: when AI may be used, when it must not, how disclosure works, how review and approval work, what data must not enter AI tools, what happens when something goes wrong. This is the team AI use agreement; worked example 4 below is a model.

**Prompt libraries.** A shared place — a Notion page, a Google Doc, a Slack canvas, a markdown file in a shared repo — holding the prompts the team has tested and uses. Each prompt has a usage note (what it is for), a boundary (what not to use it for), and a review cue (what to check in the output before shipping). A prompt library prevents the duplicated-work failure and the inconsistent-quality failure at once.

**Data boundaries.** A short list of what kinds of content the team does not paste into general-purpose AI tools, what sanitisation is expected when adjacent content is pasted, and which tools (if any) are approved for higher-sensitivity content. The list pulls from Module 10 and from the Tool Stance document; the team adapts the categories to what it actually handles. *No customer names attached to complaints; no salary figures; no candidate notes; no information labelled internal-only* is a typical short list for a small operations team. The boundaries are written down so they do not have to be remembered.

**Review checkpoints.** Where in the team's workflows a review against a defined standard happens, who does it, and what they check. Module 12's review-point discipline applied to AI-assisted work specifically.

**Escalation rules.** What triggers a higher level of review or stops the work entirely. *AI output contains a claim about a real person we cannot verify — escalate to senior reviewer. Prompt would require pasting a Tier 3 input — stop, do not use AI for this. AI proposes an action that would commit the team to a customer promise outside our published terms — stop, escalate.* Escalation rules are short, are named in advance, and are not negotiated in the moment.

**Version control.** A small team's version control does not need to be Git. It needs to be enough that the current version of any shared prompt, template, or standard is identifiable, that older versions are recoverable, and that changes are visible to the team. A dated header (*v3, 2026-04-01, replaced v2 after the inconsistent-tone issue*) on a shared document is often enough.

**Accountability.** A short statement, signed by whoever is responsible, that names what the team owns when it ships AI-assisted work. Accountability is not a process; it is the sentence that makes every other element of the standard mean something. *We are responsible for the accuracy, appropriateness, and safety of the work we ship, regardless of which tool was involved in producing it.* That sentence, plus the rest of the agreement, is enough governance for most teams of three to thirty.

These seven elements do not require a policy department. A team lead, an operations associate, or a thoughtful senior member can draft the agreement in an afternoon, circulate it, take feedback, and post the agreed version where the team works. The discipline is in the *upkeep*: revisiting the agreement when something new comes up, updating the prompt library, and treating the standard as a living document rather than a poster.

### Building team agreements without overbuilding policy

A team standard fails in two opposite directions. It can be too vague — *we will use AI responsibly* — and therefore unable to settle any specific question. Or it can be too elaborate — a fifteen-page policy with definitions, indemnification clauses, vendor-management requirements, and an approval-board structure — and therefore unable to be read, remembered, or maintained by the people it governs.

The right shape for a small team is the one-page agreement. It fits on a single screen. It uses plain sentences. It names the team, the date, the scope, and the seven governance-lite elements above in the team's own words. It is signed (or affirmed in writing) by the members who will follow it. It has a *next review* date, usually three to six months out, so the standard does not become stale.

Three habits keep a small team's agreement from drifting into either failure mode. First, write the agreement against the work the team actually does, not against a hypothetical policy. If the team handles customer complaints, the agreement names what AI may and may not do in complaint handling specifically. Second, treat the agreement as the answer to questions that are coming up, not as a pre-emptive list of every imaginable rule. Add to the agreement when a new question shows up, not before. Third, keep the prompt library and the data-boundary list separate from the agreement document, both because they update on different rhythms and because mixing them produces a single unreadable file. The agreement points to the library and the boundaries; the library and the boundaries do their own job.

### The solo-learner version: realistic team artifacts without a current team

Many learners doing this module are not currently in a team that uses AI together. You may be between roles, studying full-time, freelancing alone, working in a setting that does not yet use AI, or using AI privately while your team has not yet started. The work of this module — designing team standards, designing shared prompts, mapping responsibility — is still work you can do, and it is work that pays back when you do enter a team that needs the standard.

The solo path uses a *hypothetical four-person team*. You will design for one of these contexts:

- **A study group** of three or four learners working through Jifunze together, who want to share AI use without one of them quietly drifting into doing all of the AI-assisted work. Roles are realistic for learners: *the convener, the note-taker, the questions-keeper, the deadline-watcher*.
- **A volunteer project** — a community NGO, a school PTA, a faith-based programme, a youth organisation — where four volunteers coordinate work across a recurring cycle. Roles include *the coordinator, the communicator, the data-keeper, the public-face*.
- **A side project** — two co-founders and two part-time helpers building a small business, an app, a course, a podcast — where AI is used heavily and roles are loose. Roles include *the lead, the build-helper, the operations-helper, the customer-or-audience-facing person*.
- **A future workplace scenario** — a four-person operations team, programme team, or customer team in a small Kenyan business or NGO you can describe specifically. Roles are *the team lead, two associates with different responsibilities, and a part-time reviewer*.

You name the context once at the top of your work. You write the same artifacts as a learner with a current team. You treat the hypothetical as if it were real — *who would draft? who would review? who would approve? what would the data boundary be? what would escalation look like?* — and you let the constraints of the hypothetical (no policy team, no IT department, modest budget, mixed levels of AI experience) shape the standard. The result is a portfolio artifact that demonstrates the same discipline as a learner who designed for a real team, and is reusable when a real team becomes available.

The solo path is not a downgrade of the activity. It is the same activity, scoped to the context you can actually design for. A learner who designs a thoughtful agreement for a hypothetical four-person volunteer team has done more useful work than a learner who designs a vague agreement for a real twenty-person team they cannot describe in detail.

### How earlier modules apply inside teams

Module 10's privacy discipline applies in two new ways. First, the team's data boundaries are the *collective* version of each member's individual minimum-necessary discipline. If one member sanitises diligently and another does not, the team's effective boundary is the looser one. The data-boundary list in the team agreement is what raises the floor. Second, sensitive inputs sometimes travel between teammates before they reach a prompt — a budget table forwarded from finance, a complaint thread shared in a channel, an HR note pasted into a planning document — and the question *should this be in an AI tool?* may not be salient to the person who finally asks the AI, because they did not see the input arrive. A team data-boundary list is what makes the question visible at every stage where the input passes hands.

Module 12's workflow-ownership discipline applies directly. The named-owner-per-stage habit, the named review-points habit, and the human-only-step habit are the same habits applied to AI-assisted shared work. Worked example 1 below is a workflow with explicit owners, an explicit review point, and explicit content that must not be in the AI-assisted draft. The discipline is the same; the unit is the team.

Module 13's decision-ownership discipline applies to every decision a team makes with AI's help, not only the decisions made by individuals. If the team uses AI to compare three options for a vendor choice, the question *whose decision is this?* still has one person's name as the answer, even though many people may have contributed to the analysis. The decision owner from Module 13 is not absorbed into a team. The team supports the decision; one person owns it.

Modules 3, 4, 5, and 6 reappear inside the prompt library. Each shared prompt is itself a Module 4 structured prompt, with context, constraints, and audience supplied. Each shared prompt has been iterated and compared against alternatives before it earned a place in the library — Module 5's discipline. Each shared prompt's output is reviewed against verification cues — Module 6's discipline. The prompt library is the place where individual prompt skill becomes reusable team capability.

Module 9's accountability discipline applies whole and unchanged. *AI did the analysis* and *AI drafted it* are both insufficient answers when the question is *who is accountable?* The team agreement's accountability statement is the team-level version of Module 9's individual statement, and it does not soften because it was a shared output.

## Fully written worked examples

### Worked example 1: Team meeting recap workflow

**Scenario.** A four-person operations team at a small Nairobi-based logistics company runs a weekly thirty-minute coordination meeting on Wednesday mornings. The agenda is consistent: priorities for the week, blockers, customer-impacting issues, decisions, and actions. The team has been writing recaps by hand and finds the process uneven — sometimes the recap arrives the same day, sometimes Friday, sometimes not at all. They want to use AI to help draft the recap from the meeting notes, while making sure (a) the recap is reliable, (b) sensitive content does not enter an AI tool, and (c) the team knows who reviewed and approved before the recap is sent to the small leadership group on Wednesday afternoon.

**Roles in this workflow.**

| Stage | Owner |
|---|---|
| Take meeting notes during the call | The associate on rota for the week (rotates) |
| Sanitise notes (remove names attached to sensitive content; remove customer-identifying details where the issue is sensitive) | The note-taker |
| Draft AI-assisted recap from sanitised notes | The note-taker |
| Review the draft against the recap checklist | The team lead (or, in their absence, the senior associate) |
| Approve the recap for circulation | The team lead |
| Store the final recap in the team's recap folder | The note-taker |

The meeting recap is internal, not customer-facing, so the disclosure required is the team's short internal disclosure (a one-line note at the bottom: *AI-assisted draft from sanitised notes; reviewed by [name]; approved by [name]*). The team's data-boundary rule applies: customer names attached to complaints, supplier rates, and any HR or salary content are sanitised before drafting.

**The AI-assisted recap prompt (from the team's prompt library).**

> *You are helping draft a weekly internal team recap for a small operations team. The notes below are sanitised — customer names attached to issues have been replaced with placeholders (Customer-A, Customer-B), sensitive content has been removed, and any salary or HR content has been excluded.*
>
> *Produce the recap with these sections, in this order: (1) Priorities for the week, (2) Decisions made, (3) Actions and owners (use roles, not names), (4) Blockers, (5) Customer-impacting issues at a high level. Keep the recap under 300 words. Do not invent any priorities, decisions, or actions that are not in the notes. If a section has nothing in the notes, write 'None this week.' Do not introduce a recommendations section; this is a recap, not advice.*
>
> *Notes follow:*
>
> *[sanitised notes pasted here]*

**The AI-generated draft (excerpt, after sanitised notes were pasted).**

> *Priorities for the week. The team will focus on closing out the backlog of overdue customer follow-ups and finalising the new dispatch routing for the eastern corridor.*
>
> *Decisions made. (1) The team will pause onboarding new corporate accounts until the dispatch routing change is stable. (2) The associate-on-rota responsibility will rotate weekly rather than fortnightly.*
>
> *Actions and owners. Operations Lead: confirm dispatch routing change with the systems team by Thursday. Senior Associate: draft the customer follow-up message template by Friday. Associate-on-rota: complete the backlog of follow-ups for Customer-A and Customer-B by end of week. Operations Lead: confirm the rota change in the next team huddle.*
>
> *Blockers. Awaiting confirmation from the systems team on the dispatch routing change; the customer follow-up template requires sign-off from the team lead before sending.*
>
> *Customer-impacting issues. Two ongoing issues with Customer-A and Customer-B regarding delivery timing; both are being managed through the existing escalation process.*
>
> *None this week: nothing additional reported.*

**The review checklist (run by the team lead before approval).**

1. Are the priorities, decisions, and actions all present in the original notes? (No invented items.)
2. Are role names used correctly, and are no individual employee names present that should not be?
3. Are customer placeholders preserved (Customer-A, Customer-B), with no real customer names visible?
4. Are any commitments to customers, partners, or external parties absent? (The recap should not contain promises; those go through a different workflow.)
5. Are there any HR, salary, performance, or disciplinary references? (There should be none.)
6. Is the disclosure line present at the bottom?
7. Is the recap under 300 words and aligned to the team's standard structure?

**What must not be included in the recap.** Real customer names attached to specific issues; supplier rates or commercial terms; HR content (performance, salary, disciplinary); commitments to external parties; speculative *recommendations* that were not made in the meeting; any content the AI added that was not in the original notes.

**What the learner should notice.** The workflow has named owners at every stage. The prompt is structured (Module 4) and constrained (*do not invent items*, *use roles not names*, *do not add a recommendations section*). The review checklist gives the reviewer something specific to check, not a generic *take a look*. The data-boundary discipline (Module 10) is applied before the prompt runs, not after. The disclosure is internal and short, but it exists. The team lead approves; the note-taker drafts and stores. There is no ambiguity about who is responsible.

### Worked example 2: Shared customer response templates

**Scenario.** A six-person customer-care team at a small Kenyan e-commerce business handles around forty customer queries a day across email, WhatsApp, and a shared inbox. About half of the queries fall into a small number of recurring shapes: order status, delivery-window changes, refund queries, missing-item complaints, and address changes. The team wants to use AI-assisted templates so that any associate handling a query produces a reply consistent with the team's tone, the company's commitments, and the boundaries of what an associate may promise without a manager's sign-off.

**One reusable template (from the team's prompt library).** The example below is the *delivery-window change request* template, the most frequent of the five shapes.

> **Template name.** Delivery-window change response (v4, 2026-04-15).
>
> **What this template is for.** Replying to a customer who has asked to change their delivery window for an order that has not yet been dispatched.
>
> **What this template is not for.** Replying to a customer asking for a refund (use the refund template); replying to a customer whose order has already been dispatched (escalate to the dispatch lead — the team has agreed not to use AI templates for already-dispatched orders); replying to a customer who is angry, distressed, or threatening (the empathetic-reply path is human-only).
>
> **Inputs the associate provides.** Customer first name; original delivery window; requested new delivery window; whether the new window is feasible according to the dispatch system (yes / no / unclear); any specific note from the customer.
>
> **Prompt.**
>
> *Draft a customer reply for a delivery-window change request, in the team's standard tone (warm, direct, brief — under 120 words). Use the customer's first name once. If the new window is feasible, confirm it directly and give a single next step. If the new window is not feasible, apologise once, offer the two nearest available windows, and ask the customer to pick one. If the new window is unclear, say so plainly, commit to confirming within four working hours, and end with the associate's name. Do not promise refunds, discounts, expedited dispatch, or any commercial commitment beyond changing the window. Do not mention an issue with our systems or our supplier. End with the associate's first name only.*
>
> **Inputs go here:**
>
> *[customer first name]; [original window]; [requested window]; [feasible: yes/no/unclear]; [associate first name]; [optional customer note].*
>
> **Review cues for the associate before sending.**
>
> 1. Customer first name present and spelled correctly?
> 2. Reply under 120 words?
> 3. No promises beyond the window change?
> 4. Tone matches the team standard (warm, direct, brief)?
> 5. If unclear, the four-working-hour commit is present?
> 6. Associate's first name at the end (no system signature)?
>
> **Escalation triggers.** If the customer's note expresses distress, anger, or a threat to escalate to a regulator, public review, or social media — do not use this template. Hand the case to the on-shift senior associate.
>
> **Disclosure note.** Internal use of an AI-assisted template; no disclosure to the customer required, because the associate reviews and signs the reply with their own name.

**How the team prevents unauthorised promises and inconsistent tone.** Three controls work together. The prompt's *do not promise* clause is explicit and exhaustive about the kinds of commitments that are out of scope (refunds, discounts, expedited dispatch). The team's tone standard (warm, direct, brief — under 120 words) is part of the prompt itself, not left to the associate's interpretation. The escalation trigger removes the template from cases that are not template-shaped, which is the most common source of templated replies feeling cold. Together, these controls let an associate ship a customer reply in three minutes that another associate, given the same inputs, would have produced in much the same way.

**What the learner should notice.** The template is not just a prompt; it is a small contract. It says what it is for, what it is not for, what inputs are needed, what the prompt does, what the reviewer checks, and what triggers escalation. The boundaries are explicit so two associates produce two consistent replies without needing the third one to mediate. The disclosure decision is made once, in the template, not separately by each associate. The version number and date make the prompt library auditable: if a complaint arrives next month about a reply sent this week, the team knows which version of the template was in use.

### Worked example 3: Inconsistent prompt use causing uneven output quality

**Scenario.** A small marketing team — three people — has been using AI to draft short product update notes that go on the company's blog and social channels. Each member writes their own prompt; there is no shared template. After three weeks, the team lead notices that the three update notes published in the same week feel like they came from three different brands. She runs the same task through each member's prompt to diagnose what is happening.

**Teammate A's prompt.**

> *Write a product update for our new feature. Here are the notes from the engineering team.*

**Teammate B's prompt.**

> *Write a 200-word product update for our blog. Use a friendly, energetic tone. Make it exciting. Notes attached.*

**Teammate C's prompt.**

> *Draft a 150-word product update note for our blog audience — small business owners in Kenya using our platform. Tone: warm, plain, no marketing language, no exclamation marks. Lead with the customer benefit in one sentence. Cover what changed (one sentence), how to use it (one or two sentences), and where to find it (one sentence). Close with where to ask questions. Use Kenyan English. Notes from engineering follow.*

**The three resulting drafts (excerpts).**

*From Teammate A's prompt.* *"We are pleased to announce that our team has been working hard on a new feature designed to streamline your workflow. The feature, which is now available, leverages cutting-edge technology to help you do more in less time. We hope you will love it as much as we loved building it."*

*From Teammate B's prompt.* *"Big news! Our latest update is here, and it's going to change the way you work! We've packed it with everything you've been asking for, and we cannot wait for you to dive in! Try it today and let us know what you think!"*

*From Teammate C's prompt.* *"The update lets you save and reuse your most common invoice formats, which should cut your monthly admin time noticeably. To use it: open any invoice you have already sent, choose 'save as template' in the top right, and the format will be available in the dropdown next time. You will find it under Templates in your dashboard. Questions? Reply to this note or message us through support."*

**Diagnosis of the quality differences.**

*Teammate A's draft* is generic. The prompt supplied no audience, no length constraint, no tone, no structure, no instruction to lead with the customer benefit, and no instruction to avoid marketing language. The AI defaulted to its training distribution: a confident, slightly bland, slightly marketing-flavoured product announcement that could have come from any company about any feature. The prompt did the AI's work for it by leaving everything open.

*Teammate B's draft* has the opposite problem. The prompt over-corrected toward "exciting" and produced output that is energetic to the point of being hollow. *"Big news!"* and *"dive in!"* are the AI's conventional response to *make it exciting*. The audience (small business owners in Kenya, busy, sceptical of marketing language) was not specified, so the AI used a generic enthusiastic register that the actual audience finds off-putting.

*Teammate C's draft* is what the team actually wants. The prompt named the audience, the tone, the structure, the language register (Kenyan English), and the things to avoid (marketing language, exclamation marks). The output is short, plain, useful, and recognisably the team's voice.

The drafts are not different because the AI tools were different — they were the same tool. They are different because the prompts were different. Two of the three prompts left most of the work to the AI's defaults; one prompt did the work of structuring the output before the AI saw the task.

**The shared standard that fixes the inconsistency.** The team lead's response is to take Teammate C's prompt — the one that produced the team's actual voice — refine it slightly with feedback from the other two, and add it to the team's prompt library as the *Product update note (v1)* prompt. The library entry includes:

- The prompt text itself.
- A *what this is for* note (short product update notes for the blog and social channels).
- A *what this is not for* note (do not use for major launches; major launches go through the marketing lead's longer-form workflow).
- Inputs the drafter supplies (engineering notes, the customer benefit in one sentence, where the feature lives in the dashboard).
- Review cues for the drafter (under 150 words; lead is the customer benefit; no exclamation marks; no marketing language; Kenyan English).
- A version number and date.

After the library entry is in place, all three teammates use the same prompt for the same task. The next three product updates feel like they came from one brand, because they did.

**What the learner should notice.** Inconsistency was not a skill problem. It was a coordination problem. Each teammate, individually, was capable of writing a good prompt — Teammate C demonstrated that. What the team lacked was the shared artifact that made the good prompt available to everyone. The fix was the prompt library, not a training session.

### Worked example 4: Better team standard with clear review roles

**Scenario.** A four-person operations team at a small Kenyan agricultural cooperative — the team lead (Wanjiru), two associates (Brian, Faith), and a part-time data assistant (Otieno) — has been using AI inconsistently for three months. They are not in trouble; nothing has gone badly wrong. They want a one-page agreement they can all read, agree to, and follow without it becoming a corporate policy nobody opens.

**The agreement (model — to be adapted by any team).**

> **Coop Operations Team — AI Use Agreement (v1, 2026-04-28; next review 2026-08-28).**
>
> **Who this covers.** The four members of the operations team named above. Other coop staff are not bound by this agreement; they have their own.
>
> **What we use AI for.** Drafting recurring written work (meeting recaps, cooperative member updates, internal briefs); summarising long documents; helping us think through options before a decision is made; reviewing our own drafts for clarity. AI is a draft-and-review tool for us, not a decision-maker.
>
> **What we do not use AI for.** Decisions about cooperative members' loans, payouts, or membership status; HR matters involving any staff member; communications during an active complaint or dispute; anything where a regulator, the board, or a member would expect a human author. These are human-only.
>
> **Disclosure rule.** Every artifact that leaves our team — a member update, a board paper, a partner email, a public-facing note — carries a one-line disclosure at the bottom: *AI-assisted draft, reviewed by [name], approved by [name]*. Internal scratch work does not need a disclosure. If we are unsure whether an artifact is internal or leaves the team, we treat it as leaving the team and disclose.
>
> **Data boundaries.** We do not paste into any AI tool: cooperative member names attached to financial details, member loan status, member contact details, supplier commercial terms, internal salary or performance information, anything labelled board-confidential. When in doubt, we sanitise (replace names with role placeholders, remove identifying details) before pasting. If we cannot sanitise without losing the substance, we do not use AI for that task; we do it ourselves.
>
> **Review ownership.** Every AI-assisted artifact is reviewed by a teammate before approval. The reviewer is named on the artifact. The review checks: facts against the source notes; names spelled correctly; sensitive content absent; tone matches our standard; no promises or commitments beyond what we are authorised to make; disclosure present where required. The drafter cannot also be the reviewer; this is a structural protection, not a comment on anyone's competence.
>
> **Approval levels.** Routine artifacts (meeting recaps, internal briefs, member-facing FAQ updates) — approved by any team member who was the reviewer. Member-facing communications about loans, payouts, or membership status — approved by the team lead (Wanjiru). Board-facing papers and public statements — approved by the team lead and the board chair. No exceptions to the approval levels are made under time pressure; if approval is not available, the artifact waits.
>
> **Escalation triggers.** Stop and escalate to the team lead when: an AI output contains a claim about a real person we cannot independently verify; a prompt would require pasting Tier 3 content (member financials, HR, anything board-confidential); the AI's output proposes an action that would commit the cooperative beyond our published terms; an artifact is being prepared during an active complaint, dispute, or regulator interaction.
>
> **Prompt-library rules.** Our shared prompt library lives in [shared folder]. Every prompt has a usage note, a boundary note, review cues, a version number, and a date. Prompts are added to the library by the team lead after they have been tested at least three times in real work. Personal prompts (used by one of us, not yet tested) are not in the library; they are in our own notes. Library prompts are reviewed every quarter and retired or revised when they no longer fit.
>
> **Accountability.** We are responsible for the accuracy, appropriateness, and safe handling of every artifact we ship, regardless of whether AI was involved in producing it. AI is a tool we used; we are the authors. We affirm this by signing this agreement.
>
> **Signed.** Wanjiru, Brian, Faith, Otieno. Date: 2026-04-28.

**Solo-learner version.** A learner without a current team can produce the same one-page agreement for a hypothetical four-person team in any of the four contexts named earlier (study group, volunteer project, side project, future workplace). The structure is identical; the names, the team purpose, the data boundaries, and the approval levels are adapted to the chosen context. A solo learner using a *study group* hypothetical, for instance, replaces the cooperative-specific data boundaries (member loans, supplier terms) with study-group-specific boundaries (other learners' personal information, draft work shared in confidence, AI-tool screenshots that contain other people's prompts). The disclosure rule is the same; the approval levels are flatter (peer approval rather than team-lead approval, because there is no team lead in a study group). The accountability statement is the same.

**What the learner should notice.** The whole agreement is one page. It does not pretend to be a corporate policy. Every section answers a question that has come up or will come up in real work. The roles are real and named. The drafter-cannot-be-the-reviewer rule is structural, not a comment on competence — it makes review a step in the workflow rather than a personal favour. The escalation triggers are short, specific, and not negotiable in the moment. The prompt-library rules connect to a separate document (the library itself), keeping the agreement readable.

## Supplied practice activity materials

Each activity below supplies the full source material the activity needs. Each has a solo-learner alternative that does the same activity using a hypothetical team. The activities are sequenced from concrete to integrative; activity 4 produces material you will reuse in the portfolio task.

### Activity 1: Ownership map

**Supplied team scenario.** A four-person customer-care team at a small Kenyan SaaS company — the team lead (Mercy), two senior associates (Daniel, Aisha), and a junior associate (Kev) — handles inbound customer queries. They have decided to use AI-assisted templates for the five most common query shapes. The workflow they are designing has these stages:

1. The associate receives the query and identifies which template shape it matches.
2. The associate drafts an AI-assisted reply using the team's library prompt for that shape.
3. The associate reviews the draft against the review cues for that template.
4. The associate sends the reply to the customer.
5. The associate logs the case and the template used in the team's case-tracker.
6. A teammate spot-checks one in five sent replies for the weekly quality review.
7. The team lead reads the weekly quality summary.

**Your task.** Map the ownership for this workflow. For each of the seven stages, name (using roles, not names): the *drafter*, where AI assistance enters; the *reviewer* and what they check; the *approver*; where the artifact is *stored*; and who holds *accountability* if a customer later disputes the reply. Where a stage does not need a separate reviewer or approver, say so explicitly — *not separated; the drafter is the reviewer for routine cases and a teammate is the reviewer for any case flagged as not-routine*. Identify at least one place where ambiguous review ownership would be likely if you did not name it explicitly, and explain how your mapping prevents the ambiguity.

**Solo-learner alternative.** Use a hypothetical four-person team in one of the four contexts named in the core lesson (study group, volunteer project, side project, future workplace). Choose a recurring written task that team would do (for a study group: weekly recap of what each member has covered; for a volunteer project: outreach message to new volunteers; for a side project: customer welcome message; for a future workplace: weekly internal status update). Map the ownership of that task across the same seven-stage frame, adapted to the team's context. The output is the same: a named drafter, reviewer, approver, storage location, and accountability owner per stage.

### Activity 2: Team prompt pack design

**Supplied recurring team task.** A three-person communications team at a Kenyan secondary school — the head of communications (Patricia), a content associate (Ronald), and a part-time student-liaison (Zawadi) — produces three short pieces of writing each week: (a) a parents' weekly note (under 250 words, warm tone, plain language, summarising the week's activities and next week's commitments), (b) a teachers' shared brief (under 200 words, neutral tone, listing decisions made and actions for the next week), and (c) an alumni outreach message (under 150 words, varies by recipient, links to a current school initiative). All three currently get drafted by whoever is least busy that week, with no shared prompt.

**Your task.** Design three shared prompts — one for each of the three pieces — to live in the team's prompt library. Each prompt must include: the prompt itself, written so a teammate can paste it into an AI tool with their inputs filled in; a *usage note* (what the prompt is for); a *boundary note* (what the prompt is not for, and what to do instead in those cases); review cues for the drafter; a version number and date. The prompts should be specific enough that two team members, given the same inputs, would produce two replies a parent, teacher, or alumna could not easily distinguish in voice or quality.

**Solo-learner alternative.** Design three prompts that a future colleague — someone you have not met, who joins your team or your side project after you have left or moved — could pick up and use without you sitting next to them. The hypothetical context is yours to choose, but pick a context you can describe specifically. The same three pieces — a regular update, a brief, an outreach message — at whatever scale fits. The discipline is the same: the future colleague should not need verbal handover to use the prompt safely.

### Activity 3: Handoff-risk review

**Supplied workflow with handoffs.** A small Kenyan NGO — twelve staff total, four of whom are on the programme team — runs a monthly programme report that goes to two donors. The current workflow has these handoffs:

1. The field officer collects beneficiary outcome data during the month (sanitised — no individual names, only aggregate numbers and three short anonymised case stories).
2. The field officer hands the data and the case stories to the programme associate.
3. The programme associate uses an AI tool to draft a 1,500-word donor report from the data and the case stories.
4. The programme associate hands the draft to the programme manager for review.
5. The programme manager reviews and edits the draft.
6. The programme manager hands the edited draft to the executive director for approval.
7. The executive director approves and the report goes to the two donors.
8. The programme manager files the final report in the NGO's reporting folder.

**Your task.** Identify the three biggest risks introduced by the handoffs in this workflow, and explain how to reduce each one. The risks must be specific to *handoffs* — what gets lost, distorted, or unsafely shared as work passes between people — not generic risks of AI-assisted reporting. For each risk, explain: what could go wrong; at which handoff it is most likely; what specific control would reduce it; and who is responsible for that control.

**Solo-learner alternative.** Use the same supplied workflow. The activity does not require a current team; the workflow is fully described and the handoffs are explicit.

### Activity 4: Mini team policy draft

**Your task.** Produce a one-page (single screen, under 600 words) AI use policy for a four-person team. The policy must include: the team's name and purpose; the date and a *next review* date; what the team uses AI for; what the team does not use AI for; the disclosure rule; data boundaries; review ownership; approval levels; escalation triggers; prompt-library rules; an accountability statement; and the names of the four people who affirm it. The wording should be plain, the rules should be specific to the team's actual work, and the policy should fit on one page. Use worked example 4 as a structural model, not as a template to copy — your team's work, data, and roles will be different.

**Solo-learner alternative.** Choose one of the four hypothetical contexts: study group, volunteer project, side project, or future workplace. Describe the team's purpose and the four roles in two sentences at the top. Produce the same one-page policy for that team, adapted to its context. The substance — disclosure, data boundaries, review, approval, escalation, prompt library, accountability — is the same. The specific rules are different because the work is different.

## Pause and check

Before you move on to the knowledge-to-output task, answer these three for yourself in writing.

1. In your own words, why is it not enough for every member of a team to be individually skilled at AI use? Name two of the six coordination risks and explain how each shows up even when individual skill is high.
2. What is the difference between *review* and *approval* of an AI-assisted artifact, and why does a team that conflates the two tend to ship unreviewed work?
3. If you are working as a solo learner for this module, which of the four hypothetical contexts (study group, volunteer project, side project, future workplace) will you use for your portfolio artifact, and why is it the most realistic choice for your situation?

If you cannot answer one of these clearly, return to the core lesson section it draws from before continuing.

## Knowledge-to-output task

**The task.** Produce a *Team AI Use Agreement + Responsibility Map + Shared Prompt Artifact* for a real or hypothetical four-person team. The artifact has three parts in one document.

**Part 1 — Team AI Use Agreement.** A one-page (under 600 words) policy following the structure of worked example 4. It must name the team and its purpose, include a date and next-review date, and cover all seven governance-lite elements: shared standards (what AI is and is not used for), prompt-library rules, data boundaries, review ownership, escalation rules, version control, and an accountability statement. Real or hypothetical four people are named and affirm the agreement.

**Part 2 — Responsibility Map.** For one specific recurring task the team does, map the workflow stages and name, per stage: the drafter, where AI enters, the reviewer and what they check, the approver, where the artifact is stored, and who holds accountability. The mapping should be specific enough that a new team member could pick it up and run the workflow without verbal handover. The task you map should be one your agreement covers (not a separate task that needs separate rules).

**Part 3 — Shared Prompt Artifact.** One shared prompt — fit for the team's prompt library — for the task in part 2. The prompt must include: the prompt text itself; a usage note; a boundary note; review cues for the drafter; a version number and date. The prompt should be specific enough that two members of your team, given the same inputs, would produce work consistent in voice, quality, and adherence to the team's standard.

**For learners currently in a team.** Use your real team. Ask the other members for input where you can; show them the draft before you finalise it. The artifact is more useful when it reflects what your team is actually willing to follow than when it reflects what you imagined unilaterally. If your team will not agree to anything, you can still produce the artifact — name yourself as the proposer, include the input you would seek, and note the affirmation status as *proposed; not yet adopted*. That is honest and still meets the assessment standard.

**For solo learners.** Use one of the four hypothetical contexts: study group, volunteer project, side project, or future workplace. Describe the team's purpose, the four roles, and the kind of work it does specifically enough that the agreement, the responsibility map, and the prompt are designed against a context, not against an abstract idea of *a team*. A learner who designs a thoughtful artifact for a hypothetical four-person volunteer team has produced a more useful artifact than one who writes a vague document for a real twenty-person team they cannot describe.

**Acceptance criterion the learner can self-check against.** Read the artifact as if you were a new colleague joining the team next week. Could you, with no verbal handover, (a) understand what the team uses AI for and what it does not, (b) know who reviews and who approves an AI-assisted artifact, (c) know what data must not enter an AI tool, (d) pick up the prompt and produce work consistent with the rest of the team's voice, and (e) know what to do if a prompt would require pasting Tier 3 content? If yes, the artifact passes. If no, identify the part that failed the test and revise that part.

**Filename.** Save your artifact as `Module14_Team_AI_Use_Agreement_[YourName].pdf` or `Module14_Team_AI_Use_Agreement_[YourName].docx`. Use your real name (or the consistent learner pseudonym you have been using across the course) in place of `[YourName]`.

**Disclosure note.** If you used AI to help draft any part of the artifact (which is likely, and is fine), include a short disclosure at the bottom following Course1_Disclosure_Note.md — naming the tool, what it drafted, what you reviewed, what you changed, and what you remain responsible for. The artifact about disclosure should itself disclose.

## Checkpoint quiz

Answer all eight questions. Mark your own answers using the answer key that follows. Pass threshold: 80% (at least 7 of 8 substantively correct, with strong-answer criteria met where named).

**1. (Multiple choice.)** Which of the following best explains why hidden AI use creates problems even when the individual prompt was technically competent?

a) Hidden AI use is illegal in most countries.
b) Hidden AI use prevents reviewers, customers, and auditors from applying the right kind of review or trust to the artifact, because they do not know what kind of work they are reading.
c) Hidden AI use leads to lower quality output every time.
d) Hidden AI use makes the prompt unrecoverable for future use.

**2. (Multiple choice.)** A team agreement that says *we will all review each other's work* most likely produces which failure mode?

a) Inconsistent disclosure.
b) Leakage of sensitive information.
c) Ambiguous review ownership, because *we will all* almost always means no one specific person is committed.
d) Duplicated work, because everyone reviews the same thing.

**3. (Scenario-based.)** A four-person operations team has been using AI to draft customer replies. After a month, customers begin commenting that the team's tone seems different from week to week. The team lead asks each member to share the prompt they have been using. The three prompts are different in length, tone instructions, and constraints. Which of the six coordination risks is the team most clearly experiencing, and what is the most direct fix?

a) Hidden AI use, fixed by adding disclosure to every reply.
b) Inconsistent quality, fixed by adding the most effective member's prompt to a shared prompt library and asking everyone to use it.
c) Leakage of sensitive information, fixed by sanitising customer names.
d) Inconsistent disclosure, fixed by writing a disclosure rule.

**4. (Scenario-based.)** A small NGO programme team uses AI to summarise long beneficiary case notes before drafting a donor report. One associate, in a hurry, pastes the case notes — including individual beneficiary names — directly into a general-purpose AI tool. The team has no agreement about data boundaries. Which of the following best describes what failed?

a) The associate used the wrong AI tool.
b) The team experienced a coordination failure: an individual privacy boundary that may or may not be in each member's head was not raised to a team data-boundary rule, so the team's effective floor for sanitisation was the looser of the four members' habits.
c) The associate should have used a paid tier of the AI tool.
d) The AI tool should have refused the input.

**5. (Short answer.)** In your own words, what is the difference between *review* and *approval* of an AI-assisted artifact? Give one example of each from a team workflow.

**6. (Short answer.)** A team designs a prompt library and adds prompts that members have used personally. Within two months, the library has fifteen prompts, but members report they cannot tell which prompts are tested and which are someone's recent draft. What single rule, added to the library's prompt-library rules, would most directly fix this, and why?

**7. (Application.)** Take any four-person team you can describe specifically — real or hypothetical. Write the *escalation triggers* section of that team's AI use agreement: at least three triggers, each named in one sentence, each describing what stops the AI use and who the work escalates to. Triggers should be specific enough that a member would recognise them in real work, not generic enough to be ignored.

**8. (Application — solo-learner aware.)** A learner who is not currently in a team is producing the portfolio artifact for this module using a hypothetical four-person volunteer project. They write *the volunteer team uses AI responsibly* under shared standards, and *we will not paste sensitive information* under data boundaries, and stop. Identify two specific weaknesses in this artifact and rewrite each into a stronger version that would meet the acceptance criterion. Your rewrites should reflect the volunteer-project context, not a generic corporate context.

## Answer key with explanations

**1. Correct answer: (b).** The substance is not the legality (a), the prompt-recovery (d), or a guaranteed quality drop (c — quality may be fine). The failure of hidden AI use is that it deprives the people downstream — reviewers, customers, auditors — of context they need to apply the right kind of trust or scrutiny. Disclosure exists to give them that context.

**2. Correct answer: (c).** *We will all* is the canonical phrasing of ambiguous review ownership. *All* and *we* together usually mean *no one specific*. The fix is naming a reviewer per artifact (or per artifact type), not better intentions.

**3. Correct answer: (b).** The visible symptom is uneven tone; the underlying coordination risk is inconsistent quality, driven by inconsistent prompts. The most direct fix is the prompt library, with the most effective prompt promoted to a shared standard. Worked example 3 walks through this exact dynamic.

**4. Correct answer: (b).** The failure is coordination, not technology, not vendor choice, and not the tool's responsibility. The team's effective floor is the loosest member's habit, until the team raises that floor to a written data-boundary rule.

**5. Strong-answer criteria.** A strong answer makes three points. First, *review* is a content-level check against a defined standard — facts, names, tone, sensitive content, hallucinated claims, disclosure — performed by a named reviewer. Second, *approval* is the role-level authority to release the work and accept accountability for it. Third, the two are different acts that may be performed by different people, and a team that conflates them tends to ship unreviewed work. The example pair should be plausible: e.g., *review*: a teammate checks the customer reply against the review cues before send; *approval*: the team lead approves a partner-facing report for release.

**6. Strong-answer criteria.** The single rule should add a *promotion criterion*: a prompt enters the library only after it has been tested in real work a defined number of times (worked example 4 uses three) by the relevant member, and the team lead (or whoever owns the library) signs off on its addition. Personal prompts that have not met the criterion stay in members' personal notes. The reasoning should name the failure mode (members cannot tell tested prompts from drafts) and explain why the criterion fixes it (only tested prompts are in the library, so the library's contents are trustworthy by definition).

**7. Strong-answer criteria.** A strong answer names the team specifically, then writes at least three triggers, each in one sentence, each naming (a) what stops the AI use and (b) who the work escalates to. Strong triggers tend to look like: *Stop and escalate to [role] when AI output contains a claim about a real person we cannot verify; when a prompt would require pasting [specific category of data]; when the AI proposes an action committing the team beyond [specific scope]; when the artifact is being prepared during [active dispute / regulator interaction / public-statement window].* Weak answers are vague (*we will escalate when needed*) or untriggered (*we will be careful with sensitive data*).

**8. Strong-answer criteria.** A strong answer identifies two weaknesses (likely candidates: *uses AI responsibly* is too vague to settle any specific question; *will not paste sensitive information* does not name what counts as sensitive in the volunteer-project context) and rewrites each into specific, context-fitting language. Stronger versions of *uses AI responsibly* would name what AI is and is not used for in the volunteer project (e.g., *we use AI to draft outreach messages, summarise meeting notes, and prepare event-day briefs; we do not use AI for personal communications about volunteer pastoral matters or for any communication during a safeguarding concern*). Stronger versions of *will not paste sensitive information* would list the categories specifically (volunteer personal contact details, beneficiary names attached to support received, donor identities not yet announced, internal financial figures). The rewrite should not import generic corporate language; it should fit the volunteer-project context.

## Portfolio artifact

**Artifact name.** Team AI Use Agreement + Responsibility Map + Shared Prompt Artifact.

**Required filename.** `Module14_Team_AI_Use_Agreement_[YourName].pdf` or `Module14_Team_AI_Use_Agreement_[YourName].docx`.

**Required contents (in this order).**

1. **Team or hypothetical-team context.** Two to four sentences naming the team, its purpose, the four roles, and the kind of recurring work it does. If the artifact is for a solo-learner hypothetical team, name the hypothetical context (study group, volunteer project, side project, future workplace) and describe it specifically enough that the rest of the artifact can be designed against it.
2. **Team AI Use Agreement.** One page, under 600 words, covering: what AI is used for; what AI is not used for; disclosure rule; data boundaries; review ownership; approval levels; escalation triggers; prompt-library rules; accountability statement; and the names of the four members who affirm it (real or hypothetical).
3. **Responsibility Map.** For one recurring task the team does, the workflow stages with named drafter, AI assistance point, reviewer, what the reviewer checks, approver, storage location, and accountability owner per stage. The task chosen should be one the agreement covers.
4. **Shared Prompt Artifact.** One shared prompt for the task mapped above, including: the prompt text; usage note; boundary note; review cues; version number; date.
5. **Solo-learner note (if applicable).** A short paragraph (two or three sentences) noting that the artifact uses a hypothetical team, naming the chosen context, and confirming that the agreement, the map, and the prompt have been designed against that specific context rather than a generic one.
6. **Disclosure note.** A short disclosure following Course1_Disclosure_Note.md — naming the tool used, what AI drafted, what you reviewed, what you changed, and what you remain responsible for.

**Self-check acceptance criterion.** Read the artifact as if you were a new colleague joining the team next week. Could you, with no verbal handover, understand what the team uses AI for and what it does not, know who reviews and who approves AI-assisted artifacts, know what data must not enter an AI tool, pick up the prompt and produce work consistent with the team's voice, and know what to do when a prompt would require pasting Tier 3 content? If yes, the artifact meets the standard. If any of the five fail, identify the failing part and revise it.

**Pathway connection.** This artifact is a usable proof point for the *Digital Work Starter*, *AI Productivity Professional*, *Remote Work and Freelancing*, and *Small Business and Entrepreneurship* pathways, where learners need to demonstrate they can coordinate responsible AI use across a team rather than only use AI well as individuals. The same artifact, lightly adapted, supports the *Junior Tech Builder* pathway when the team's recurring work is technical (prompt libraries for code review, documentation drafting, incident-response notes).

## Capstone-save reminder

Save this artifact carefully. Three later pieces of work depend on it.

**Module 15 — reusable prompt packs and playbooks.** Module 15 will teach you to turn the best prompts and standards you have built across Course 1 into reusable prompt packs and playbooks. The shared prompt from Part 3 of this artifact is one of the prompts that will earn its place in your prompt pack, and the agreement from Part 2 is one of the standards your playbook will reference. A learner who arrives at Module 15 without the Module 14 artifact is rebuilding the input under time pressure.

**Module 16 — capstone.** The capstone asks you to demonstrate an end-to-end AI-supported workflow with prompt design, verification, accountability, and team-or-shared-use considerations. The agreement and the responsibility map from this module are the team-or-shared-use evidence the capstone draws on. If you used a hypothetical team, the same artifact applies — the capstone treats the hypothetical as a legitimate context.

**Future team, client, study group, or workplace use.** When you join a team that does not yet have an AI use agreement, the artifact you wrote for this module is a starting draft you can adapt. When a client asks how you handle AI use in their work, the agreement is part of your answer. When you join a study group, the responsibility map is a model for how the group can use AI together without one member quietly absorbing all of the AI-assisted work. The artifact pays back beyond the course.

## Module completion evidence

The learner has completed Module 14 meaningfully when:

- The Team AI Use Agreement covers all seven governance-lite elements at the level of detail a small team can maintain.
- The Responsibility Map names a real (or hypothetical-but-specific) recurring task and identifies the drafter, AI assistance point, reviewer, what the reviewer checks, approver, storage, and accountability owner for each stage.
- The Shared Prompt Artifact is fit for a prompt library — usage note, boundary note, review cues, version number, date — and is specific enough that two members of the team would produce consistent work.
- The artifact passes the new-colleague self-check across all five questions.
- The disclosure note is present and substantively follows Course1_Disclosure_Note.md.
- The checkpoint quiz reaches at least 80%, with the application questions meeting the strong-answer criteria.
- For solo learners: the chosen hypothetical context is named and specific, and the artifact is designed against it rather than against a generic team.

## Revision guidance

If your Team AI Use Agreement is too vague — sentences like *we will use AI responsibly* or *we will be careful with data* without specifics — return to the core-lesson section *Building team agreements without overbuilding policy* and rewrite each vague sentence as a specific rule against a specific question. Use worked example 4 as a structural model; replace its content with rules fitting your team's actual work. The test for each sentence: *would two members reading this independently arrive at the same action?* If not, the sentence is too vague.

If review ownership is unclear in your responsibility map — sentences like *we will all review* or *the team will check* — return to the core-lesson section *Review ownership and approval* and the worked example 1 review checklist. Name a specific role as the reviewer per stage (the drafter cannot also be the reviewer for the same artifact). Name what the reviewer checks. Name what happens when the check fails. *Whoever notices* is not review ownership; it is the absence of it.

If disclosure expectations are missing — your agreement does not say where AI use must be disclosed, what the disclosure says, who is responsible for it being there, and what happens when it is missing — return to the core-lesson section *Disclosure expectations* and to Course1_Disclosure_Note.md. Write a disclosure rule that answers all four questions in plain sentences, then check that the disclosure note attached to the artifact itself is consistent with the rule you just wrote.

If data boundaries are weak — your agreement names *sensitive information* without saying what counts as sensitive in your team's context — return to the core-lesson section on data boundaries and to Module 10. List the specific categories your team handles that should not enter general-purpose AI tools (member names, salary figures, client commercial terms, HR content, candidate notes, anything labelled internal-only). Specific lists protect; vague lists do not.

If escalation rules are absent — your agreement does not name what stops the AI use and who the work escalates to — return to the *Governance-lite* section and to worked example 4's escalation triggers. Write at least three triggers, each in one sentence, each naming the trigger and the destination. Triggers like *we will escalate when needed* are not triggers; they are intentions.

If your shared prompt cannot be used by another person without you sitting next to them — the prompt has no usage note, no boundary, no review cues, or assumes context only you have — return to worked examples 1 and 2 and to Module 4. Add what the prompt is for, what it is not for, what inputs are needed, what the reviewer checks, and a version number and date. The test: hand the prompt and the inputs to a colleague (real or imagined) who has not seen the rest of your artifact. Could they produce the work the prompt is meant to produce, at the team's standard, without asking you a clarifying question?

If your solo-learner alternative feels unrealistic — the hypothetical team is not described specifically, the rules read as if they were copied from a generic corporate template, the data boundaries do not fit the chosen context — return to the *solo-learner version* section in the core lesson. Pick the hypothetical context you can describe most specifically. Describe the team's purpose and four roles in two or three sentences. Then design every rule against the constraints of *that* context. A specific volunteer-project agreement is more credible than a generic corporate one.

If the artifact ignores accountability or privacy — there is no accountability statement, or the accountability statement says *AI is responsible for errors*, or the data-boundary list is missing — return to Module 9 and Module 10. Accountability stays with the human; the agreement should say so explicitly. Privacy is enforced before the prompt runs; the boundary list should name what does not enter the tool.

## Transition to the next module

Module 14 helped you move from individual AI use into shared AI practice. You built standards for disclosure, review ownership, privacy boundaries, escalation, and shared prompt quality. You designed a team agreement that fits on one page, a responsibility map that names a human at every stage, and a shared prompt that another person could use without verbal handover. You did this for a real team or for a hypothetical one — and the discipline transferred either way, because the discipline does not depend on the team being assembled today.

Module 15 takes the next step. Until now, every prompt you have written, every workflow you have designed, every standard you have set has been built for one task at a time. Module 15 turns the best of that work into reusable prompt packs and playbooks — the artifacts that let you, your team, your client, or your future colleagues run consistent AI-supported work over time without rebuilding the standard each time. You will move from *how should a team use AI responsibly?* to *how do I package repeatable AI practices so they can be reused safely?* The shared prompt and the agreement you built in this module are inputs to that packaging. Bring them with you.

## Notes for Cursor mapping

- **Suggested module id.** `ae-m14`.

- **Suggested session/block breakdown.**
  - Block 1 — Overview and continuity bridge (covers *Continuity bridge from Module 13*, *What was wrong before*, *What was improved*, *Estimated time*, *Module purpose*, *Learner outcomes*).
  - Block 2 — Concept I: Why individual skill is not enough (covers *Individual AI skill is necessary and not enough* and *The six coordination risks*).
  - Block 3 — Concept II: Disclosure, review, and approval (covers *Disclosure expectations* and *Review ownership and approval*).
  - Block 4 — Concept III: Governance-lite and team agreements (covers *Governance-lite: standards small teams can actually keep* and *Building team agreements without overbuilding policy*).
  - Block 5 — Concept IV: The solo-learner version and earlier modules applied (covers *The solo-learner version* and *How earlier modules apply inside teams*).
  - Block 6 — Guided examples (covers worked examples 1–4, ideally as four separate sub-blocks for digestibility).
  - Block 7 — Practice (covers activities 1–4, with the supplied scenarios and solo-learner alternatives).
  - Block 8 — Pause and check (covers the three self-check questions).
  - Block 9 — Knowledge-to-output and portfolio task (covers the knowledge-to-output task and portfolio artifact specification).
  - Block 10 — Checkpoint quiz (8 questions; auto-scored multiple choice and short-answer; rubric-scored application).
  - Block 11 — Answer key, completion evidence, revision guidance, transition.

- **Likely content block types.**
  - Long-form prose for the core-lesson sub-sections.
  - Side-by-side example blocks for worked example 3 (three prompts and three drafts shown together) and worked example 4 (the agreement shown as a single readable artifact rather than fragmented bullets).
  - Table blocks for the workflow ownership in worked example 1 and for the responsibility map in the portfolio task.
  - Inline prompt blocks (boxed code-like styling) for every prompt example.
  - Callout blocks for *what must not be in the recap*, *what this template is not for*, and the escalation triggers — these are short, must stand out, and are referenced from elsewhere.
  - A *solo-learner path* toggle or pinned callout that clarifies, at the top of every practice activity and the portfolio task, what changes for solo learners.

- **Quiz mapping notes.** Questions 1, 2, 3, 4 are auto-scored multiple choice (radio button, single correct answer). Questions 5 and 6 are short answer with rubric-checked correctness against the strong-answer criteria; in the platform UI, present the question, allow free-text answer, and show the answer key only after submission. Questions 7 and 8 are application items with rubric scoring; they should accept longer free-text input and provide the strong-answer criteria as the self-check. Pass threshold is 80% (7 of 8 substantively correct). The *strong-answer criteria* in the answer key are the rubric the platform should display for self-grading on the open items.

- **Portfolio artifact mapping notes.** Upload format: `.pdf` or `.docx`. Filename pattern: `Module14_Team_AI_Use_Agreement_[YourName].(pdf|docx)`. The platform's artifact-upload block should present the six required-contents items (team context, agreement, responsibility map, shared prompt, solo-learner note if applicable, disclosure note) as a checklist the learner ticks against their uploaded document. The five-part new-colleague self-check should be presented as a separate review checklist before submission, with each item ticked individually so the learner has surfaced any failing part before uploading.

- **Special UI needs.** A *team or solo* selector at the start of the practice and portfolio sections, so the learner sees the path most relevant to them first (with the other path collapsed but accessible). A pinned reference card showing the seven governance-lite elements would help the learner during the activities. A linkable jump-back to Module 13's *decision-ownership* section, Module 12's *workflow-ownership* section, Module 10's *data-tier* section, and Module 9's *accountability statement* section, since the module references them by name.

- **Mapping as one improved file.** This module is mapped as a single improved file: `Jifunze_Course1_Module_14_Improved.md`. It is not split across part-A / part-B files. The continuity bridge at the top connects directly to Module 13; the transition at the bottom hands off to Module 15. The file is the canonical source for the module and is the input both to the platform mapping and to any later course revision.
