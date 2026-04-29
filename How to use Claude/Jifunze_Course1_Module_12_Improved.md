# Module 12: AI for Workflows, Automation, and Agents

## Continuity bridge from Module 11

Module 11 trained you to do careful research with AI: define the question, set the scope, summarise sources separately before comparing them, mark uncertainty honestly, and review the evidence trail before you ship the brief. The first time you ran that workflow, it felt like work. The second time, it started to feel like a process. By the third time, you noticed something useful and slightly uncomfortable: this had become a *shape*. Eight steps. The same kinds of inputs each time. The same kinds of decisions about what to summarise, what to omit, and what to flag as still uncertain.

Module 12 is what happens when you take that observation seriously. If a task has stages, inputs, decisions, review points, and risks — and you do it more than once — it is not really a one-off task anymore. It is a workflow. Workflows can be designed, written down, reviewed, improved, and in some cases partly handed off to AI tools that act on their own. They can also go badly wrong if you skip the design step and let the tool act before you have decided where the human review belongs. That is the territory of this module.

Carry forward two things in particular. From Module 11, the research-workflow discipline: define the task, set boundaries, separate inputs, compare outputs, mark uncertainty, and review the evidence. Those habits scale up into workflow design, almost line for line. From Module 10, the safety rule that sits underneath everything: not every task should be automated, and not every input should be given to an AI tool. Workflow design that does not respect Module 10 does not become safer because it is written down — it becomes a faster, more confident version of an unsafe practice.

Module 12 takes that same discipline and applies it to repeated work. By the end, you should be able to look at a task you do regularly, see its shape, decide where AI can help and where humans must remain responsible, and know whether — and on what conditions — any part of it should be turned over to an agent.

## What was wrong before

The original module named the right ideas — workflow design, automation, agents — but stopped before any of them were teachable. Workflow stages were listed without being defined, "AI-assist decision table" was named in a heading without an example, and the difference between a manual workflow, an AI-assisted workflow, an automation, and an agentic workflow was implied rather than worked out. Worked examples were named but not written. *"Event planning workflow"* appeared as a heading; the actual stages, the decision table, the human-only steps, and the SOP draft did not. Practice activities were instructions ("break this task into stages," "identify dependencies") without supplied workflow scenarios, which meant a self-learner had to invent their own scenarios before they could practise — usually with the same gaps the activity was meant to fix.

There was no agent coverage at all. The original wrote "AI agents" into a single subhead and left the topic at that. A learner finishing the module had no working definition of an agent, no list of the conditions under which an agent is appropriate, and no test they could run against a candidate workflow before they let an agent act on real work. That is a gap with consequences: agents are exactly the kind of tool a confident learner will reach for first and a careful learner will pause on, and the original module did not give the learner anything to be careful with.

Checkpoint questions were stubs rather than fully developed items. There was no portfolio artifact specific enough to be reviewable. There was no clear handoff to Module 13.

## What was improved

This version adds a complete workflow-design model with eight named elements (stages, sequence, dependencies, owners, review points, constraints, failure points, and the AI-assist decision), a four-step ladder for the level of automation (manual, AI-assisted, automated, agentic) so the learner can place any candidate workflow on it, an explicit explanation of what an agent is in plain language, and six conditions for agent-readiness that double as a checklist the learner runs before any agent acts on real work. It includes five fully written worked examples — event planning, monthly reporting, customer complaint handling, a weak plan that ignores real constraints, and a workflow redesigned for partial automation — each with the actual stages, the decision table, the human-only steps, the review checkpoints, and a short SOP draft where the example calls for it. It supplies four practice activities with the actual scenarios built in, eight checkpoint questions covering multiple-choice, scenario, short-answer, and application formats, an answer key with strong-answer criteria for the open items, a named portfolio artifact with a defined filename pattern, an explicit capstone connection, revision guidance keyed to specific failure modes, and a Cursor-mapping note so the module can be split into platform lesson blocks without rewriting the teaching. Module 10 safety discipline and Module 11 research-workflow thinking are woven into every stage rather than mentioned once.

## Estimated time

Roughly three and a half to four and a half hours of focused work end-to-end.

- **Core lesson** — 45 to 55 minutes.
- **Worked examples** — 35 to 45 minutes (read once, then re-read at least two with one of your own repeated tasks in mind).
- **Practice activities** — 75 to 95 minutes total (the four activities can be split across two sittings; activities 1 and 4 are the heaviest).
- **Knowledge-to-output task** — 50 to 70 minutes.
- **Checkpoint quiz and revision** — 15 to 20 minutes.
- **Total estimated time** — approximately 3h 40m to 4h 35m.

A learner who already designs operational processes — operations associates, programme managers, team leads, founders — may move faster through the conceptual sections but should spend the full time on activities 3 and 4 (weak-plan diagnosis and agent-readiness assessment), since those are the activities that retrain a working professional out of the most common shortcuts: "we do this every week, that is the workflow" and "the AI can probably handle this, let it run."

## Module purpose

Most early problems with AI use in workflows are not about the AI failing on a single task. The AI handled its single task fine. The problem is structural: a step that the AI should not have done at all, an output that no human reviewed before it went out, a decision that quietly moved from "the manager approves" to "the system approves," a failure mode that nobody had named before it happened, or a workflow that hides which person is responsible when something goes wrong.

This module teaches the discipline that prevents those failures. You learn to break a repeated task into stages with named owners and named review points, to write a decision table that says exactly where AI helps and where it must not, to identify the steps where humans must remain responsible regardless of how capable the tool gets, to spot the failure points before they fail, and to assess — using six concrete questions — whether a workflow is ready for agentic execution or whether it is still firmly in human-driven territory. The result is process work that is slower to design and faster, safer, and more reviewable to run, with a clear human owner at every step that matters.

## Learner outcomes

By the end of this module, you should be able to:

- Break a repeated task into clearly defined workflow stages with sequence and dependencies.
- Identify the dependencies, owners, review points, risks, and constraints that turn a list of steps into a workflow.
- Decide where AI can assist and where humans must remain responsible, and document that decision in an AI-assist decision table.
- Distinguish a manual workflow, an AI-assisted workflow, an automation, and an agentic workflow, and place any candidate process on that ladder.
- Assess whether a task is appropriate for an agent using six concrete criteria, and explain why an agent is — or is not — the right fit.
- Produce a reviewable Standard Operating Procedure (SOP) for a repeated task, plus an agent-readiness assessment for the same task, both of which a colleague could read and use.
- Apply Module 10's privacy and minimum-necessary discipline and Module 11's evidence-trail discipline inside workflow design, not as separate steps tacked on at the end.

## Core lesson

### What a workflow actually is

A workflow is not a list of tasks. It is a structured description of how a repeated piece of work moves from a starting condition to a finishing condition, with the decisions, dependencies, owners, and review points that hold the work together when it runs without you watching every step. A list of tasks tells someone *what to do*. A workflow tells them *what to do, in what order, with what inputs, who is responsible, where the checks happen, what to do when something goes wrong, and how to know the work is finished*.

The difference shows up the moment a workflow runs under pressure. A list of tasks is fine on a calm Tuesday. On a Friday afternoon when the customer is angry, the deadline is in two hours, and the senior person who usually reviews is on a flight, the difference between *"send the customer a response"* and *"draft a response, mark it as customer-facing, route to the on-call lead for sign-off, send within the agreed response window, and log the resolution in the case record"* is the difference between an incident and a clean recovery.

AI work needs process design at least as much as ordinary work, and arguably more. AI tools are fluent, fast, and confident. They will produce a plausible-looking output for almost any task, including tasks they should not have been given. Without a workflow around them, the speed and the fluency hide the steps where a human was supposed to check, decide, or stop. With a workflow, the AI's output is one input to a process that has named owners, review points, and stop conditions. The human stays in the loop because the loop was designed before the tool was reached for, not after.

Module 11's research-assist workflow is itself an example of process design applied to AI use. The eight steps — define the question, set scope, collect sources, summarise separately, compare and cluster, mark uncertainty, draft synthesis, review evidence trail — are a workflow whose shape did not depend on which AI tool you used. That same discipline is what this module asks you to apply to other repeated tasks: monthly reports, customer complaints, event planning, recruitment screening, content review, anything you do enough times that you are starting to recognise the shape.

### The eight elements of a workflow

A workable workflow names eight elements. You can write them down on one page; that page is the start of an SOP.

**1. Stages.** The named pieces of work, in order. A stage is bigger than a single action and smaller than the whole task. *"Receive request"*, *"verify inputs"*, *"draft response"*, *"review and approve"*, *"send"*, *"log"* are stages. *"Type the first sentence"* is too small. *"Handle the customer"* is too big. A useful workflow usually has between four and ten stages. Fewer than four is usually a list pretending to be a workflow; more than ten is usually two workflows that should be separated.

**2. Sequence.** The order in which the stages run. Some sequences are strictly linear (each stage depends on the one before it). Others have parallel branches that rejoin. The workflow should make the sequence explicit, including any branches.

**3. Dependencies.** What each stage needs before it can start. Dependencies include inputs (data, documents, approvals), prior stages (you cannot draft until you have verified inputs), and external conditions (a payment system being available, a colleague being on shift). Hidden dependencies are the most common reason workflows fail when people try to follow them: the workflow looked complete, but step 4 quietly assumed step 2 had already produced something it had not. Naming dependencies up front exposes those assumptions.

**4. Owners.** The person — by role, not by name — who is responsible for each stage. Roles travel; names do not. *"The on-call support lead"*, *"the programme officer"*, *"the finance reviewer"*, *"the operations manager"* are durable. *"Aisha"*, *"James"* are not. A workflow with no named owners cannot be run by anyone except the person who designed it. A workflow with named owners can be picked up by a new colleague, by a deputising teammate, or by you on a day when you do not remember exactly how the last cycle went.

**5. Review points.** The places in the workflow where someone deliberately checks the work before it moves on. A review point is not the same as a step that happens to involve reading. A review point is named, has an owner, has a defined "what is being checked," and has a "what happens if the check fails." Review points are what prevent a fluent AI draft from leaving the building unreviewed and what give the workflow somewhere to catch its own mistakes.

**6. Constraints.** The boundaries the workflow has to respect. Time constraints (a customer reply must go within two hours; an end-of-month report must be filed by the third working day). Authority constraints (only the manager can approve a refund above KES 5,000). Privacy constraints (Tier 3 content from Module 10 does not enter a general AI tool; an interview transcript is summarised by a human first). Capacity constraints (the team can run no more than three of these in a week without burnout). Constraints are the part of the workflow that does not show up in a flowchart but is fatal when ignored.

**7. Failure points.** The places where this workflow has gone wrong before — or, if it is a new workflow, the places where similar workflows tend to go wrong. *Naming failure points up front is the difference between a workflow that learns and a workflow that repeats its mistakes.* Common failure points: an input arriving incomplete, a review skipped under time pressure, an AI output accepted without checking, a step done by the wrong person because the named owner was unavailable, a stop rule not applied because nobody had written one down.

**8. The AI-assist decision.** For each stage, an explicit decision: is AI used here, and if so, in what role? The decision has three useful options. *Not used* — the stage is human-only and the AI is not consulted. *Drafting* — the AI produces a first version that a named human then reviews, edits, and is responsible for. *Triage or filter* — the AI sorts, summarises, or flags items, but a human acts on the result. The fourth option, *executes the stage end-to-end without human review*, exists but is rarely the right answer outside the agent conditions covered later in this lesson.

The AI-assist decision is the heart of the workflow design. Most early mistakes with AI in operations come from getting this decision wrong: AI is used at a stage where it should not have been used, used in a role it was not suited for, or used without naming the human reviewer. Writing the decision down forces the choice into the open.

### The automation ladder

It is useful to place any candidate workflow on a four-step ladder. Each step adds capability and adds a different kind of risk. Knowing where you are on the ladder tells you what review and what controls are appropriate.

**Step 1 — Manual workflow.** Humans do every stage. AI is not involved. The work is reviewable, slow, and entirely human-owned. This is where many high-stakes processes belong and stay.

**Step 2 — AI-assisted workflow.** Humans run the workflow. AI helps inside individual stages — drafting an email, summarising a document, generating options for a section, classifying an item. The human still decides what enters the workflow, reviews each AI contribution before it is used, and owns the final output. This is where most learner workflows in Course 1 should sit.

**Step 3 — Automated workflow.** Some stages run without a human pressing a button each time, but the steps that run automatically are deterministic — the same input always produces the same output, the rules are explicit, and the tool is not making judgement calls. A scheduled report that pulls data from a known source on the first of the month, formats it, and emails it to a defined list is an automation, not an agent. Automation removes manual repetition. It does not remove judgement, because the steps that need judgement are still done by humans.

**Step 4 — Agentic workflow.** An AI agent acts on its own across multiple stages of the workflow, makes some decisions, may use tools (search, send a message, read a file, write to a system), and produces an outcome that affects something real. The human is no longer pressing the button at each stage. The human's role shifts from doing the work to designing the boundaries, monitoring outcomes, and reviewing the trail the agent left behind.

Each step up the ladder makes the work faster and lower-effort to run. Each step also moves more responsibility from the human-doing-the-stage to the human-designing-the-system. By Step 4, the design — what the agent can do, what it cannot, when it stops, what it logs, who reviews — *is* the work. A poorly designed Step-4 workflow is more dangerous than the manual version of the same workflow, not safer.

### Human-only steps

Some steps in any workflow must remain human, regardless of the tool. The discipline is to name them in advance, before someone is tempted to fold them into a faster path.

A step is human-only when at least one of the following is true:

- *Accountability cannot transfer.* If the work goes wrong, a person — not a tool — answers for it. The legal sign-off, the disciplinary decision, the financial commitment, the medical advice, the safeguarding referral. Carry forward Module 9's accountability discipline: *AI did the drafting* is not an answer to *who decided.*
- *Judgement is irreducible.* The step requires weighing values, context, history, and human relationships in a way that cannot be summarised into rules. Hiring decisions, performance ratings, conflict mediation, customer escalations involving frustration and trust.
- *Sensitive content is involved.* Module 10 Tier 3 or Tier 4 content is at the centre of the step, and exposing it to a general-purpose AI tool would create privacy risk regardless of how good the AI's output would be.
- *The output is final and irreversible.* Sending a public statement, signing a contract, transferring funds, terminating an employee, deleting data. Reversibility is the property that makes a mistake recoverable; without it, every other safeguard has to do more work.

Naming the human-only steps in the workflow is what protects the workflow from creeping automation. Without that naming, every six months somebody will ask "could the AI also do *this*?" and the answer will drift.

### Review gates

Review gates are the formalisation of the review points. A review gate has four parts: who owns the gate (the named role), what is being reviewed (the specific output or decision), what the gate is checking for (accuracy, tone, privacy, completeness, fit-to-purpose), and what happens when the gate fails (return to drafting? escalate? stop the workflow?).

Three small habits make review gates work in practice. First, the reviewer is not the drafter. If the AI drafted and a human is reviewing, that human is the reviewer; if you also drafted parts of the same item, the gate is weaker. Second, the gate has a hard pass criterion. *"Looks good"* is not a pass criterion. *"All numbers traced to source, no claim that is not in the source, tone matches the audience, nothing in here that would embarrass us if forwarded"* is. Third, the gate has a record. The reviewer notes what they checked and what they changed, even briefly. A gate without a record is a gate that quietly stops being run.

### Failure-point analysis

Before a workflow goes live, walk it through one bad day in your head. Not the day where everything works. The day where the input arrives in the wrong format, the named reviewer is offline, the AI tool is unavailable, the deadline has been moved up by two hours, or the request is unusually sensitive and does not look like the cases the workflow was designed for. For each of those scenarios, ask: where does this workflow break, and what is supposed to happen when it does?

A workflow that has no answer to those questions is not finished. The answer does not have to be elegant. *"If the AI tool is unavailable, the on-call lead drafts manually using the saved template"*, *"if the named reviewer is offline, the deputy reviews; if the deputy is also offline, the work waits — we do not skip the gate"*, *"if the request is unusually sensitive, the workflow stops at stage 1 and the operations manager decides whether to route it through the standard process or handle it manually"* — each of these is a clear, usable response. The point of failure-point analysis is not to predict every problem. It is to make sure the workflow has explicit, named handling for the most likely ones.

### Automation versus agents

The terms get used interchangeably. They are not the same, and the difference matters because the right controls are different.

*Automation* is the encoding of explicit rules. The system does what it was told, in the order it was told, with the inputs it was given. If the input is unusual, the automation either still runs (and produces a wrong output) or fails loudly (and stops). Automations are predictable, testable, and bounded. The risk is that the rules are wrong, incomplete, or out of date — not that the automation will improvise.

*Agentic systems* — agents — make decisions inside the workflow. Given a goal, an agent decides which steps to take, in what order, what tools to use, and when it is finished. It improvises, within the design boundaries. That improvisation is what makes agents useful for tasks where the steps cannot be fully scripted in advance. It is also what makes them risky for tasks where steps not anticipated by the designer could cause harm.

The practical implication: automation is appropriate when the rules are clear and the cost of a wrong rule is acceptable; agentic execution is appropriate only when a different and harder set of conditions are met, covered next.

### What an agent is, in plain language

An agent is an AI system that, given a goal and a set of tools, decides on its own what steps to take to reach the goal. It can read inputs, call tools (search the web, send an email, read a database, run a script, write a file), evaluate intermediate results, and decide what to do next. A good agent works toward the goal, stops when the goal is met or when a stop condition is hit, and produces a record of what it did.

Three properties separate an agent from a chatbot you happen to have wired up to some tools. First, *autonomy across multiple steps* — the agent does not stop after one response; it continues until the goal is met or a boundary is reached. Second, *tool use beyond text* — the agent can take actions in real systems, not just produce text in a chat window. Third, *decision-making in the loop* — the agent chooses what to do next based on what it has just done, not on a fixed script.

That third property is what makes agents powerful and what makes them risky. A scripted automation that goes wrong does the wrong thing in a predictable way. An agent that goes wrong can do something the designer did not anticipate, because the agent's path through the workflow is not pre-decided. Designing for agents is therefore mostly about designing the *boundaries* — what the agent can do, what it cannot do, when it must stop, what it must log, what triggers a human review. The agent works inside those boundaries; the human is responsible for the boundaries themselves.

### When agents are appropriate

Agents are appropriate when *all six* of the following are true. If any one of them is missing, treat the workflow as not yet ready for agentic execution and keep it at AI-assisted or automated.

*Repeatable.* The task is one you do enough times that designing an agent for it is worth the effort, and the shape of the task is stable across instances. Agents are not the right tool for one-off work.

*Low-to-medium risk.* The worst plausible outcome of the agent making a mistake is recoverable. A wrong draft you can rewrite is recoverable. A mass email sent to customers is harder. A wire transfer is rarely.

*Reversible.* The actions the agent takes can be undone if necessary. If a step is irreversible — sending external messages, deleting records, signing contracts — the workflow needs a human gate before that step, even if the surrounding steps are agentic.

*Clear inputs and outputs.* You can describe what the agent receives, what it produces, and what "done" looks like. If you cannot describe "done," the agent will not know either, and it will either stop too early or keep going past where it should have.

*Clear stop rules.* The conditions under which the agent must stop and hand back to a human are written down. *"Stop if the action would cost above KES 10,000"*, *"stop if the customer's message contains a complaint or a legal term"*, *"stop after three retries"*, *"stop if the source is older than 12 months"*, *"stop if the result is uncertain by your own measure."* A workflow with no stop rules is not an agent workflow; it is an open-ended risk.

*Reviewable logs.* The agent leaves behind a trace of what it did, in what order, with what intermediate results. The logs are detailed enough that a human can reconstruct the run after the fact and decide whether the agent acted correctly. An agent that runs without a log is not reviewable, and an unreviewable agent is not a workflow component — it is a hope.

### When agents are not appropriate

Agents are not appropriate when any of the following is true. Most workflows in most learners' working lives sit in this category, and that is fine.

*High-stakes.* The cost of a mistake is large enough that the speed of agentic execution is not worth the risk. Most financial decisions, most safeguarding decisions, most public-facing communications, most legal commitments.

*Irreversible.* The actions cannot be undone after the fact. A workflow whose end state cannot be rolled back is a workflow that needs a human gate before that end state, regardless of how appealing the rest is to automate.

*Sensitive or regulated.* The workflow handles Tier 3 or Tier 4 content (Module 10), or sits inside a regulated regime (Kenya's Data Protection Act for personal data; HIPAA, FERPA, GLBA in their respective US contexts; GDPR for EU/UK data subjects). The default for these is human-driven with explicit organisational approval before any agent involvement.

*Ambiguous judgement.* The decisions the agent would have to make depend on context, values, history, or relationships in ways that are not reducible to rules. Hiring, performance, mediation, escalation. The risk is not that the agent will refuse to decide; it is that it *will* decide, fluently, and the decision will look reasonable until you check what it was actually weighing.

*Unclear accountability.* If something goes wrong, no human is clearly responsible. This is the worst pre-condition. Agentic workflows do not lower accountability; they raise the bar on it. Carry Module 9 forward: every workflow has a named accountable human. An agent does not change that, and a workflow whose accountability question is unanswered should not be agentic, automated, or even AI-assisted until the question is answered.

### Privacy and safety boundaries inside workflows and agents

Module 10 is not a separate concern that gets layered on top of the workflow. It is part of the workflow itself. Step zero of any AI-assisted workflow is the minimum-necessary check: what is the smallest amount of information the AI actually needs to do this stage? If the input contains Tier 3 or Tier 4 content, the abstraction or redaction happens *before* the AI sees the input. That step belongs in the workflow, named and owned, not as a footnote in the policy section.

The same applies to agents. An agent that has access to your inbox, your customer database, your file system, or your calendar is an agent that has access to whatever Tier 3 or Tier 4 content lives in those systems. Designing an agent without thinking about the data tiers it will encounter is designing an agent that will eventually paste your highest-sensitivity content into wherever it sends its outputs. Agent boundaries must include data boundaries: what the agent can read, what it cannot, what it can write to, what it cannot, and what it must abstract before processing.

Module 11 also carries forward. If the workflow involves research or synthesis stages, the evidence-trail discipline applies inside those stages — claims trace to sources, uncertainty is labelled, the AI's outputs are first readings rather than conclusions. Workflow design is not a substitute for the discipline of the stages it contains; it is the structure that makes the discipline auditable.

## Fully written worked examples

### Worked example 1: Event planning workflow

**Scenario.** A small NGO in Nairobi runs three quarterly stakeholder events a year. Mary, the operations associate, has been running them for eighteen months. The work is now stable enough to write down, and AI tools have started showing up in the team's day-to-day work. Mary wants to design the workflow once, decide where AI helps and where it does not, and produce an SOP a colleague could pick up if she were unavailable.

**Stages and sequence.**

1. *Define the event* — purpose, audience, date range, budget, location options.
2. *Confirm logistics* — book venue, agree catering, arrange interpretation if needed, confirm AV.
3. *Build the invite list* — pull stakeholder list, segment by relationship type, check for missing roles.
4. *Draft and send invitations* — produce invitation copy in English and (where relevant) Kiswahili, send through the agreed channel, track responses.
5. *Prepare the run-sheet* — agenda timing, speaker order, briefing notes for facilitators, contingency for late starts.
6. *Run the event* — registration, opening, sessions, breaks, close.
7. *Follow-up* — thank-yous, materials sent, action notes, attendance recorded for the next cycle.
8. *Debrief* — what worked, what did not, decisions for the next event.

The sequence is mostly linear, with stage 3 (invite list) and stage 4 (invitations) running in parallel with the early part of stage 2 (logistics) once the date is fixed.

**AI-assist decision table.**

| Stage | AI use | Who reviews | Why this choice |
|---|---|---|---|
| 1. Define the event | Not used at first; optional brainstorm | Operations associate (Mary) | Decisions on purpose and budget are organisational. AI brainstorm is fine for *theme* options, not for the decision. |
| 2. Confirm logistics | Not used | Operations associate | Vendor relationships, contractual terms, venue knowledge. Human-only. |
| 3. Build invite list | Triage: AI flags duplicates and possible mis-segmentations on a sanitised list | Operations associate | Stakeholder list contains personal contact data — Tier 3. Sanitise before any AI involvement. |
| 4. Draft invitations | Drafting: first version of English copy; Kiswahili draft only if a fluent reviewer is in the loop | Communications lead | AI drafts well; human owns the voice and the accuracy of the role/title fields. |
| 5. Run-sheet | Drafting: timing skeleton from past events; not the briefing notes | Operations associate | AI is good at the structural pass; the briefing notes contain context AI does not have. |
| 6. Run the event | Not used | Operations associate | Live operational work. |
| 7. Follow-up | Drafting: thank-you template per segment | Communications lead | Same logic as stage 4. |
| 8. Debrief | Triage: cluster the team's debrief notes into themes | Operations associate + programme manager | The decisions about what to change next time are human-only; AI just clusters the input. |

**Human-only steps.** Stages 1 (the actual decisions, not the brainstorm), 2 (vendor and venue), 6 (live event), and the *decisions* part of stage 8.

**Review checkpoints.**

- *After stage 3 — invite list review.* Mary checks the AI's flagged duplicates and segmentation suggestions against the list. Stop criterion: if more than 5% of flagged items are wrong, the AI's pass is discarded.
- *After stage 4 — invitations review.* Communications lead reads every variant before send: tone, accuracy of role/title, no unintended language slips in the Kiswahili draft. Pass criterion: would I send this to a stakeholder I respect?
- *After stage 7 — follow-up review.* Same as stage 4, lighter.
- *After stage 8 — debrief review.* The clustering is checked against the actual notes; any "theme" not present in at least two notes is removed.

**Failure points and handling.** *Wrong segmentation in stage 3* — caught by review; if not, an inappropriate invitation is sent and surfaced after the event. Mitigation: keep last cycle's segmentation map and diff against the new one. *Kiswahili draft drifts* — handled by requiring a fluent reviewer; if no reviewer is available, the workflow sends in English only rather than risk a poor translation. *Logistics fall through* — vendor backup list maintained; AI not involved in this contingency. *Tool unavailable* — saved templates from prior cycles allow stages 4 and 5 to run manually.

**Short SOP draft.**

> *Stakeholder Event SOP — v1, owned by operations associate.*
>
> *1. Define the event.* Confirm purpose, audience, date range, budget, and location with the programme manager. Optional: use AI to generate three theme options; choose the theme yourself. Do not let the AI generate the budget.
>
> *2. Confirm logistics.* Book venue and catering using the vendor list. Update the vendor list if a contact has changed. Human only.
>
> *3. Build the invite list.* Pull the stakeholder list. Sanitise (remove any extra columns the workflow does not need; keep only name, role, organisation, segment, and the contact field needed for the channel). Optionally pass the sanitised list through the AI tool to flag duplicates and segmentation oddities. Review every flag.
>
> *4. Draft and send invitations.* Use the saved invitation template. The AI may produce a first draft of the English copy; the communications lead reviews. Kiswahili draft only with a fluent reviewer present. Send through the agreed channel. Track responses in the response sheet.
>
> *5. Prepare the run-sheet.* Build the timing skeleton (AI may draft, you confirm). Write the briefing notes yourself.
>
> *6. Run the event.* Live operational work. AI is not in the loop on the day.
>
> *7. Follow-up.* Send thank-yous (AI may draft per segment; communications lead reviews). Update attendance and notes.
>
> *8. Debrief.* Collect notes from the team. AI may cluster; you and the programme manager decide what changes for next cycle.
>
> *Disclosure.* Where AI was used (stages 3, 4, 5, 7, 8 above), record the use briefly in the cycle's debrief log: tool, task, what the human reviewed and changed.

**What the learner should notice.** The workflow does not use AI everywhere. It uses AI where AI is good (drafting and triage on sanitised inputs) and keeps humans where humans must remain (decisions, vendors, live event, judgement). The decision is *written down* so that next quarter, when someone is busy, the decision does not drift.

### Worked example 2: Monthly reporting process

**Scenario.** A microfinance team produces a monthly performance report for the management committee. The report covers loan disbursement, repayment performance, portfolio-at-risk, regional breakdowns, and a one-page narrative. It is due on the third working day of every month. Brian, the operations associate, has been assembling it manually and wants to redesign it as an AI-assisted workflow.

**Stages and sequence.**

1. *Pull the data.* Export from the loan management system on the first working day.
2. *Validate the data.* Reconcile against the bank statement totals; flag any rows with missing fields.
3. *Compute the metrics.* Disbursement, repayment rate, portfolio-at-risk, regional splits.
4. *Produce the tables and charts.* The standard set, formatted to template.
5. *Draft the narrative.* The one-page commentary.
6. *Internal review.* Operations associate confirms the numbers and the narrative; manager reviews.
7. *Submit to the committee.*

**Concrete prompt stages.**

For stage 5, the narrative is the AI-assist point. Brian's prompt, after he has the metrics tables in front of him:

> *Prompt: You are drafting a one-page narrative for a microfinance management committee. The audience is senior, time-constrained, and numerate. Use only the figures in the table below. Do not introduce comparisons, trends, or explanations that are not supported by the figures. Structure the narrative as: (1) headline performance for the month, two to three sentences; (2) one paragraph on what changed compared to last month, with the actual numbers; (3) one paragraph on the regional pattern; (4) two sentences on portfolio-at-risk, including whether it moved and by how much; (5) one paragraph on what the operations team is watching for next month. Use neutral language. Do not state causes unless the data supports them. Keep the total to about 350 words.*
>
> *Tables and figures: [pasted, with no client identifiers].*

**Sample output (excerpt, paraphrased).**

> *April disbursement totalled KES 38.2M across 412 loans, a 6% rise on March's KES 36.0M. Repayment performance held steady at 94.1%, broadly unchanged from March's 94.3%. Portfolio-at-risk over 30 days moved from 4.2% to 4.7%, driven by a small concentration of late repayments in the Western region. The Coast region continued its three-month trend of stable disbursement and on-time repayment. The team is watching the Western pattern over the next four weeks before drawing any conclusion.*

**Review checkpoints.**

- *After stage 2 — data validation.* Operations associate confirms the bank statement reconciliation. Stop criterion: if the variance is over 1% of disbursement total, the workflow pauses for investigation.
- *After stage 3 — metrics.* The metrics are recomputed in the spreadsheet from the validated data; AI is not used for the calculation itself.
- *After stage 5 — narrative.* Operations associate checks every numerical claim in the narrative against the tables. Any sentence that mentions a number must trace to a row.
- *After stage 6 — manager review.* Manager reviews the full report. Pass criterion: the manager would defend every claim in front of the committee.

**Failure points.** *Data missing or partial* — workflow pauses at stage 2; does not push forward. *AI narrative drifts beyond the data* — caught at stage 5 review; sentences that overreach are rewritten or cut. *Manager unavailable on the third working day* — deputy reviews; if no deputy, the workflow waits rather than ships an unreviewed report. *Tool unavailable* — narrative is written manually using last month's structure as a model.

**What the learner should notice.** The metrics calculation is not delegated to AI even though it could be. AI in this workflow drafts the narrative, which is the part where AI's strength (clear prose) and weakness (hallucinated numbers) cleanly separate from the numerical part. The review checkpoint at stage 5 is the gate that catches the AI when it overreaches. The workflow has named handling for the most likely real-world disruption (manager unavailable; tool down) rather than assuming the happy path.

### Worked example 3: Customer complaint handling flow

**Scenario.** A small bakery chain in Nairobi receives customer complaints by WhatsApp, email, and walk-in. The team currently handles them ad hoc. Aisha, the operations lead, wants a workflow that is fast for routine cases, escalates the right cases quickly, and never quietly loses one.

**Stages and sequence.**

1. *Intake.* Receive the complaint through the channel. Log it (channel, time, customer identifier, summary).
2. *Classify.* Decide which category the complaint falls into: product quality, service, billing, allergy/safety, suspected fraud, other.
3. *Draft response.* Produce a first response appropriate to the category.
4. *Review and approve.* The named reviewer signs off before the response goes out.
5. *Send.*
6. *Resolution and follow-up.* Resolve the underlying issue (refund, replacement, apology, escalation) and follow up with the customer.
7. *Recordkeeping.* Update the case record. Add to the monthly review pile.

**AI-assist decision table.**

| Stage | AI use | Who reviews | Why this choice |
|---|---|---|---|
| 1. Intake | Not used | Front-of-house staff | Listening to a customer is a human job. |
| 2. Classify | Triage: AI suggests a category; human confirms | Operations lead | AI is good at sorting; the cost of misclassification is contained because every case still goes to a human reviewer. |
| 3. Draft response | Drafting for product quality, service, billing categories; *not used* for allergy/safety, suspected fraud, escalation | Reviewer (see below) | AI drafts non-sensitive responses well; sensitive categories are human-only. |
| 4. Review and approve | Not used | Operations lead (or deputy) | Approval is the human gate. |
| 5. Send | Not used | Operations lead | Sending is part of the human gate. |
| 6. Resolution | Not used | Operations lead, branch manager | Decisions on refunds, replacements, escalations. |
| 7. Recordkeeping | Drafting: produces a short case summary | Operations lead | Summaries are auditable and reviewed. |

**Explicit escalation triggers.** A complaint *immediately* leaves the AI-drafting path and is handed to the operations lead manually if any of the following is true:

- *Allergy or safety.* A customer mentions an allergic reaction, contamination, or any safety issue.
- *Suspected fraud or harassment.* The complaint involves a payment dispute that suggests fraud, or behaviour by a staff member that may amount to harassment.
- *Threat of legal or regulatory action.* The customer mentions a lawyer, regulator, or public complaint.
- *Repeat complainant on the same issue.* The customer has complained about the same matter before and the issue was supposed to have been resolved.
- *Tier 3 content in the complaint.* If responding requires referring back to identifying detail about other customers, staff, or third parties, the AI is not given that context.

**Human-only steps.** Stages 1, 4, 5, 6 in their entirety. Stage 3 for any escalated category. The decision at stage 2 is shared (AI suggests, human decides).

**Review checkpoints.**

- *After stage 2 — classification.* The operations lead reviews the AI's suggested category and either accepts it or reclassifies. If the suggestion is wrong, the case is logged for the monthly review pile so the AI's classification quality is tracked.
- *After stage 3 — draft response.* The reviewer reads every draft. Pass criteria: tone is right, the facts are right, nothing is promised that we cannot deliver, no third party is named who should not be, and we are not committing the business to anything beyond the reviewer's authority.
- *After stage 6 — resolution.* The case record reflects what was actually done, not just what was offered.

**What the learner should notice.** The workflow does not try to make AI do everything fast. It uses AI for the steps where AI is a clear win (classification suggestions, drafting routine responses, summarising cases) and pulls AI out of the steps where the cost of a wrong move is large (allergy, safety, fraud, repeat complaints, legal exposure). The escalation triggers are written down so the team does not have to remember them under pressure.

### Worked example 4: A weak plan that ignores real constraints

**Scenario.** A founder of a four-person agency, Wanjiku, wants to "use AI to run our marketing." She asks an AI tool to "design a marketing workflow for a small agency" and is given a confident, plausible-looking workflow. She is about to start running it. Then she pauses and looks at it carefully.

**The AI's draft workflow (excerpt, paraphrased).**

> *1. Every Monday at 9am, the system pulls the previous week's website analytics and social-media engagement.*
> *2. The AI generates three blog post topics based on the highest-performing keywords from the previous week.*
> *3. The AI drafts a 1,200-word blog post for each topic.*
> *4. The AI generates social media posts (LinkedIn, X, Instagram) summarising each blog post.*
> *5. The AI emails the drafts to the founder for "approval."*
> *6. Once approved, the AI publishes the blog post to the website and the social media posts to the relevant accounts.*
> *7. The AI tracks engagement and feeds the data back into next week's keyword selection.*
> *Result: a self-improving content engine running on autopilot.*

**What sounds correct.** The workflow has stages, an apparent feedback loop, and a place for human approval. It looks like a plan.

**What is wrong.**

*Timing.* Stage 1 assumes the analytics from the previous week are available by 9am Monday. They are not, in most setups; processing lag is a day or more. The workflow will run on stale or partial data and not flag it.

*Authority.* Stage 5 emails drafts for "approval," but stage 6 says the AI publishes once approved. The workflow does not say what "approved" means operationally — does the founder click a button? Reply with a word? What if she replies "looks good but change the second paragraph"? The workflow has no handling for partial approval, conditional approval, or "not this week." That is not approval; that is a rubber-stamp dressed as a gate.

*Privacy.* Stages 2 and 3 will, in practice, pull whatever content the AI tool has access to in order to produce blog posts. If the agency works with clients whose information is confidential, drafts may include client names, project details, or anonymised-but-identifiable cases. The workflow has no Tier-classification step.

*Capacity.* The agency has four people. Stage 5 sends the founder three blog drafts, three sets of social posts, and a topics list every week. The founder does not have the capacity to review that volume properly. The most likely outcome is that the gate becomes a rubber stamp within three weeks.

*Reversibility.* Stage 6 publishes. Once a post is on the website and social, it is public. A wrong claim, a misattributed quote, or an inappropriate tone is now in front of the audience. Reversibility is poor.

*Accountability.* If a published post has an error, the workflow names no human owner. The founder approved it under time pressure; the AI drafted it; the system published it. *Who decided?* is unanswered.

*Reality of "self-improvement."* The keyword loop in stage 7 will reinforce whatever was popular last week, regardless of strategic direction. A workflow that lets the AI choose topics based on engagement metrics is a workflow that will drift toward whatever performs in the short term, which is rarely the same as what the agency should be writing about.

**Rewrite into a realistic workflow.**

> *1. Every two weeks, the founder and one team member review the last fortnight's analytics together (Monday, after the data has settled). They choose two topics for the next two weeks based on strategic relevance, not just engagement.*
>
> *2. The AI may draft a first version of each blog post (about 800 words, the realistic length the team can review). The team member who chose the topic is the named reviewer for that post. The AI is not given client-identifying content.*
>
> *3. The reviewer checks every draft against the source brief: claims supported, no client detail, tone matches the agency's voice, nothing committed that the agency cannot deliver.*
>
> *4. The reviewer (not the AI) publishes. Social posts are drafted by the AI from the published blog only, reviewed by the same person, and published manually.*
>
> *5. Engagement is reviewed every two weeks alongside step 1. The team uses it as one input to topic selection, not the only one.*
>
> *6. If a published post has an error, the named reviewer for that post owns the correction and the post-mortem.*

**What the learner should notice.** The first plan was a confident autopilot. The rewrite is a slower, smaller, AI-assisted workflow with named owners, realistic timing, capacity-aware volume, a privacy step, and a manual publish gate. The rewrite does less. It is also the version that can actually run in this agency without producing the kind of incident that would erase the time savings several times over.

### Worked example 5: A workflow that becomes an agent

**Scenario.** Joseph, the same consultant from Module 11, has now run the research-and-synthesis workflow several times for client questions. He wants to redesign it for partial automation: an agent that handles the early stages of a research task, hands a draft synthesis brief to him, and stops. The eventual brief is still owned by him; the agent's job is to do the early reading work.

**The workflow as it currently runs (manual, AI-assisted).**

The eight steps from Module 11: define the question, set scope, collect sources, summarise each source separately, compare and cluster themes, mark uncertainty, draft synthesis, review evidence trail.

**The agent redesign.** Joseph identifies the candidate stages for agent execution, the stages that must remain human, the stop conditions, the logging requirements, and the data boundaries. The result is a partial-agent workflow.

**What the agent may do.**

- Given a question and scope (Joseph writes both), search the web and the project's source folder for candidate sources.
- For each candidate, classify the source type (peer-reviewed, news, opinion, internal data, anecdote) and capture the date.
- Produce a one-paragraph individual summary of each source, faithful to the source, no claims not in the source.
- Produce a draft theme map across the summaries, clearly noting where a theme is supported by one source only.
- Mark uncertainty in the theme map using the Module 11 vocabulary (known, needs verification, assumption, open question), with the agent's best judgement labelled as *needs verification* by default.
- Hand the package — question, scope, source list, summaries, theme map, uncertainty labels — to Joseph for the synthesis stage.

**What requires human approval.**

- The question and scope (written by Joseph; the agent does not pick these).
- The source list before any source is fully read (Joseph approves the candidates so the agent does not waste time on irrelevant material).
- Every step from the draft synthesis onward (the agent does not write the brief).
- The final brief that goes to the client (Joseph reviews and signs).

**What triggers a stop.**

- *Unknown source type.* If the agent cannot classify a source as one of the known types, it stops and asks.
- *Source over a date threshold.* If a candidate source is older than the scope's time boundary, the agent flags but does not include it.
- *Sensitive content detected.* If a candidate source appears to contain Tier 3 content (named individuals, financial detail, health information), the agent stops on that source and hands it to Joseph for a Module 10 abstraction decision.
- *Theme cannot be resolved.* If a theme is genuinely contested across sources, the agent labels it as an *open question* and does not flatten the disagreement.
- *Time budget exceeded.* If the agent has run for longer than its allotted time without producing a draft package, it stops and reports what it has so far.
- *Tool failure.* If a tool the agent depends on (web search, file read) fails repeatedly, the agent stops rather than producing a partial output without flagging the gap.

**What must be logged.**

Every search query the agent ran. Every source it considered, with the classification and the include/exclude decision. Every summary it produced. Every theme it grouped and the sources it grouped from. Every uncertainty label and the reason. The full path is reviewable; if Joseph wants to know why a particular source was excluded, he can read the log.

**What must never be automated.**

- The framing of the research question.
- The scope decisions (what is in, what is out).
- The synthesis itself (the writing of the brief).
- The recommendation to the client.
- Any handling of Tier 3 content beyond classifying it as Tier 3 and stopping.
- The evidence-trail review (Joseph still walks the trail himself before the brief leaves).

**Agent-readiness check (the six conditions).**

- *Repeatable* — yes; Joseph runs research tasks regularly and the shape is stable.
- *Low-to-medium risk* — yes for the early stages (reading and summarising). The high-risk stages (synthesis, recommendation) stay with Joseph.
- *Reversible* — yes for the agent's stages; nothing the agent does affects the outside world.
- *Clear inputs and outputs* — yes; the agent receives a question and scope, produces a defined package.
- *Clear stop rules* — yes; six explicit stop conditions, with handling.
- *Reviewable logs* — yes; the agent logs every action.

The agent passes all six conditions for the early stages. It does not pass them for the synthesis stage, which is exactly why the workflow leaves the synthesis with Joseph.

**What the learner should notice.** The workflow is not "an agent." It is a *partial-agent workflow* — most of the early reading work is agentic, the high-stakes work is human, the boundary between the two is named, and the agent stops cleanly at the boundary. The design effort is now in the boundaries: what the agent can do, what it cannot, when it stops, what it logs. That is where workflow design moves once a workflow climbs the automation ladder. The human's role has shifted from doing every stage to designing the system and reviewing the trail.

## Supplied practice activity materials

### Practice activity 1 — Task breakdown lab (25-30 minutes)

Below are three vague objectives. Turn each into a workflow draft. For each, produce: (a) a stage list with sequence, (b) the dependencies between stages, (c) the named owner role for each stage, and (d) at least two review points with what each one is checking for.

**Objective 1 — "Improve our customer onboarding."** A small SaaS company is concerned that new customers are not getting through the first week. The current process involves an account manager sending welcome emails and answering questions reactively. The team wants a workflow that handles onboarding the first time, every time.

**Objective 2 — "Run our recruitment cycle."** A mid-sized NGO hires three to four field officers a year. The current process is informal: post a role, collect CVs, shortlist by feel, interview, decide. The team wants a workflow that is fair, reviewable, and not entirely dependent on the HR lead's memory.

**Objective 3 — "Produce our weekly sales summary."** A retail business with four branches needs a weekly summary covering sales, top-selling lines, stock-outs, and any customer-service flags. Different branch managers currently send numbers in different formats. The summary is for the founder; it goes out every Monday.

For each objective, do not skip the dependencies. The dependencies are usually where the workflow is hiding.

### Practice activity 2 — Dependency mapping (20-25 minutes)

Below is a workflow as it might be written by a team in a hurry. Identify the hidden dependencies and constraints. Mark each one as *input dependency*, *prior-stage dependency*, *external dependency*, *authority constraint*, *time constraint*, *privacy constraint*, or *capacity constraint*.

**Workflow — Monthly client billing run.**

> *1. On the first day of each month, the finance assistant exports the time-tracking data for all clients.*
>
> *2. The AI tool generates draft invoices from the time data, applying the agreed hourly rates.*
>
> *3. The finance assistant reviews the drafts for obvious errors and forwards them to the account managers for confirmation.*
>
> *4. The account managers reply within 48 hours with any corrections.*
>
> *5. The finance assistant applies corrections and sends the invoices to clients on the third working day.*
>
> *6. Payment terms are 30 days. Late-payment chasers are sent automatically by the AI tool from day 31.*

Find at least eight hidden dependencies or constraints and label each. There is no single right answer for the count; a strong response identifies most of the major ones.

### Practice activity 3 — Weak-plan diagnosis (30-35 minutes)

Below are three flawed workflow plans. For each, identify and explain the failure points. Do not rewrite the workflows in this activity — just diagnose. Aim for at least three named failure points per plan. For each failure, say what kind of failure it is (timing, authority, privacy, capacity, reversibility, accountability, or other) and what would go wrong in practice.

**Plan A — Social-media scheduling for a small business.**

> *Every Sunday, the AI generates a week's worth of social-media posts based on the business's recent activity. The owner gives a thumbs-up emoji to approve the batch. The system schedules and publishes the posts across the week. Engagement metrics are reviewed monthly.*

**Plan B — HR application screening at a small company.**

> *Applications come in through the website. The AI ranks each application from 1 to 10 against the role description and rejects applications scoring below 4. Applications scoring 7 or higher are sent to the hiring manager. Applications scoring 4 to 6 are kept on file. The hiring manager interviews the top three.*

**Plan C — Patient appointment summary for a clinic.**

> *After each consultation, the doctor records a voice note. An AI tool transcribes the note, produces a short patient-facing summary in plain language, and emails it to the patient using the address on file. The summary includes any prescribed medication and follow-up instructions. The doctor reviews the summary if they have time.*

### Practice activity 4 — Agent-readiness assessment (25-30 minutes)

Below is a candidate workflow. Assess whether it is ready for agentic execution using the six questions covered in the core lesson. For each question, answer *yes*, *no*, or *partial*, and explain your reasoning in one or two sentences. End with a recommendation: *agent appropriate*, *agent appropriate with modifications* (name them), or *not agent appropriate, keep at AI-assisted or automated*.

**Candidate workflow — Inbound investor-update emails for a startup.**

> *A small startup sends quarterly investor updates. Investors often reply with questions: how many users, which markets, when is the next round, what are the metrics. The founder wants an agent that reads incoming investor replies, looks up the answer in the startup's internal data folder, drafts a personalised reply citing the figures, and sends it. The founder reviews replies once a week.*

The six questions:

1. *Is it repeatable?* — Is the task one the founder does often enough, with a stable shape, that designing an agent is justified?
2. *Is the risk low or medium?* — What is the worst plausible outcome of a wrong reply, and is it recoverable?
3. *Are actions reversible?* — Once the agent has sent a reply, can the consequences be undone?
4. *Are inputs and outputs clear?* — Can the founder describe what comes in, what goes out, and what "done" means?
5. *Is human approval built in?* — Where does the human review happen, and is it before or after the action?
6. *Are logs and review trails available?* — After a week, can the founder reconstruct what the agent did and why?

Your assessment will probably arrive at *agent appropriate with modifications*. Identify the modifications.

## Pause and check

Before moving on, ask yourself:

- Can I name the eight elements of a workflow without looking back, and explain why naming the *AI-assist decision* per stage matters more than naming the AI tool?
- Looking at one repeated task in my own work, can I place it on the automation ladder (manual, AI-assisted, automated, agentic) and justify the placement?
- Can I list the six conditions for agent-readiness and recall at least two stop rules an agent in any real workflow would need?

If any answer is no, return to the relevant section. The first question is the workflow-design model itself; the second is the automation ladder; the third is the agent-readiness checklist.

## Knowledge-to-output task

Produce four artifacts that together form one deliverable.

**Artifact 1 — Workflow Map.** Pick one repeated task from your own work, study, business, or community. The task should be something you do at least monthly and that you have run end-to-end at least twice. Map it as a workflow: stages, sequence, dependencies, owners, review points, constraints, and at least three named failure points with handling. The map can be a numbered list or a simple diagram; what matters is that a colleague who has not run this task could read the map and see the structure.

**Artifact 2 — AI-Assist Decision Table.** For the same workflow, produce a decision table. Columns: stage, AI use (*not used*, *drafting*, *triage*, or *executes end-to-end*), who reviews, why this choice. Every stage in the map must appear in the table. For every stage where AI is used, name the named human reviewer. For every stage where AI is *not used*, explain briefly why — usually one of the four human-only criteria from the core lesson.

**Artifact 3 — Reviewable SOP.** Convert the workflow map and the decision table into a Standard Operating Procedure a colleague could pick up. The SOP should be 1 to 2 pages and structured as: purpose, owner role, stages with what-to-do and AI-use note per stage, review checkpoints with pass criteria, failure-point handling, and a short disclosure paragraph naming where AI was used in producing the SOP itself. Aim for a tone a new colleague could actually follow.

**Artifact 4 — Agent-Readiness Assessment.** For the same workflow, run the six-question agent-readiness check. For each question: yes, no, or partial, with one or two sentences of reasoning. End with a recommendation: keep at AI-assisted, move to automated, move to partial-agent, or — as is often correct — not yet ready for agentic execution. If you recommend partial-agent, list the stages that could be agentic, the stages that must remain human, and the stop rules and logging requirements for the agentic part.

A self-check before submitting. Pick any stage in your workflow at random. From the workflow map, can you find its owner, its dependencies, its review point, and its failure handling? From the decision table, can you find its AI-use and the named reviewer? From the SOP, can you read what to do without flipping back to the map? From the agent-readiness assessment, do you know whether this stage is a candidate for agentic execution? If any of those breaks, fix it before submitting.

Privacy reminder: if your chosen task involves Tier 3 or Tier 4 content from Module 10, run step zero of every workflow stage where the input would be sensitive — abstract or redact before the AI sees it, and write that step into the SOP itself rather than as a footnote.

## Checkpoint quiz

Eight questions. Pass threshold: at least 6 of 8 correct (six correct, or — for short-answer and application items — meeting the strong-answer criteria below).

**1. *(Multiple choice — workflow elements.)*** Which of the following is most accurate?

a) A workflow is a list of tasks in order.
b) A workflow is a list of tasks plus the AI tools used at each step.
c) A workflow is a structured description of stages, sequence, dependencies, owners, review points, constraints, failure points, and the AI-assist decision per stage.
d) A workflow is whatever a team does in practice, written down after the fact.

**2. *(Multiple choice — automation ladder.)*** Which of the following best distinguishes an *automated* workflow from an *agentic* workflow?

a) Automated workflows are slower; agentic workflows are faster.
b) Automated workflows use AI; agentic workflows do not.
c) Automated workflows execute explicit, deterministic rules; agentic workflows let an AI system make decisions about which steps to take.
d) Automated workflows are safer than agentic workflows in all cases.

**3. *(Scenario — AI-assist decision table.)*** A team is designing a workflow for handling supplier onboarding. The stages include: receive supplier documents, verify identity and registration, check the company against a sanctions database, draft a welcome email, set up the supplier in the accounting system, and confirm with the supplier. Which stages should be marked *not used* in the AI-assist decision table, and why? Name at least three.

**4. *(Scenario — review checkpoints.)*** A monthly performance report is being produced with AI assistance for the narrative. The narrative will go to the management committee. Describe what a strong review checkpoint at the post-narrative stage looks like, in three to five sentences. Cover: who reviews, what they are checking for, what the pass criterion is, and what happens if the gate fails.

**5. *(Multiple choice — human-only steps.)*** Which of the following is the *strongest* indicator that a step in a workflow must remain human-only?

a) The step takes more than ten minutes to do manually.
b) The step is done at the start of the workflow rather than the end.
c) The step's output is final, irreversible, and cannot be undone if wrong.
d) The step has been done by the same person for a long time.

**6. *(Short answer — failure-point analysis.)*** In your own words, describe what failure-point analysis is and name at least three categories of failure point a working workflow should have explicit handling for.

**7. *(Application — agent-readiness assessment.)*** A small accounting firm proposes the following: an AI agent reads incoming client emails about their accounts, looks up the answer in the firm's records, drafts a reply with the figures, and sends it. The accountant reviews any reply that the agent flags as uncertain. Run the six-question agent-readiness check on this proposal. For each of the six questions, give a short answer (yes/no/partial) and a one-sentence reason. End with a recommendation.

**8. *(Application — workflow design under privacy.)*** You are designing a workflow for handling staff wellbeing surveys. The surveys are confidential. The team wants to use AI to cluster themes and produce a one-page summary for the leadership group. Sketch the workflow in five to seven stages. For each stage, name (a) the AI use (*not used*, *drafting*, *triage*, or *executes end-to-end*) and (b) the data tier from Module 10. Identify the step where the privacy boundary sits.

## Answer key with explanations

**1.** *Correct: c).* A workflow is more than an ordered list of tasks (option a) and more than a list of tools used (option b). It includes the structural elements that make the work runnable by someone other than the designer. Option d is what many teams have in practice; the point of this module is to move from that to (c).

**2.** *Correct: c).* Speed (option a) is not the distinguishing feature. AI use (option b) is wrong because automations may use AI for fixed, deterministic stages. Safety (option d) is context-dependent — neither category is automatically safer. The distinction that matters is between deterministic execution of rules (automation) and AI-driven decision-making about which steps to take (agentic).

**3.** *Strong-answer criteria.* The answer names at least three of the following as *not used* and explains why for each: *verify identity and registration* (authoritative check, accountability cannot transfer to the AI; the verification must be a named human); *check against a sanctions database* (regulated; an AI summary is not a substitute for the actual sanctions check, which is a deterministic lookup against a real list); *set up the supplier in the accounting system* (financial system integrity; named human owns the entry); *confirm with the supplier* (relationship and authority — confirmation is a human contact, not an AI-sent message). The answer may also note *receive supplier documents* as not-used in the AI sense (intake by the named human, with AI possibly used later to extract structured data from the documents). The reasoning in each case should reference the human-only criteria from the core lesson: accountability cannot transfer, sensitive/regulated content, irreversibility, or judgement is irreducible.

**4.** *Strong-answer criteria.* A strong answer names *who* — typically the operations associate or programme manager who owns the report, not the AI drafter; *what they are checking* — every numerical claim traces to the validated tables, no claim that is not in the data, tone matches the audience, no recommendation that exceeds the scope of the report; *pass criterion* — the reviewer would defend every claim in front of the management committee, or equivalent; and *what happens if the gate fails* — the narrative is returned to drafting (with specific issues named), or rewritten manually, or the workflow pauses pending data investigation. Bonus: the answer notes that the reviewer is not the drafter, and that the review has a brief record (what was checked, what was changed) so the gate is auditable.

**5.** *Correct: c).* Time (a), position in the workflow (b), and tenure of the person doing it (d) are not by themselves indicators that a step must be human. Irreversibility is the property that pushes a step into human-only territory regardless of how cheap automation would be, because the cost of error cannot be recovered after the fact. The other human-only criteria from the core lesson — accountability, judgement, sensitive content — also apply, but among the options offered, irreversibility is the strongest single signal.

**6.** *Strong-answer criteria.* The answer defines failure-point analysis as walking the workflow through plausible bad-day scenarios before it goes live, identifying where it breaks, and naming explicit handling for each. It names at least three categories from: input arriving incomplete or in the wrong format; named reviewer unavailable; AI tool unavailable; deadline moved up under pressure; request unusually sensitive and outside the cases the workflow was designed for; review skipped under time pressure; AI output accepted without checking; step done by the wrong person because the named owner was unavailable; stop rule not applied. Bonus: the answer notes that failure-point analysis does not aim to predict every problem, only to ensure named handling for the most likely ones.

**7.** *Strong-answer criteria.* The answer runs all six questions and offers a defensible reasoning sentence for each. Repeatable — yes, client emails about accounts are a recurring task. Risk — *partial* or *no*, depending on how the answer treats financial misstatement to a client; a strong answer flags that a wrong figure sent to a client about their accounts is more than low-medium risk in most accounting contexts. Reversible — *no* for the send-and-forget design proposed; once the email is sent the consequence is in the client's hands. Inputs and outputs clear — *yes*, broadly. Human approval built in — *partial* at best; the proposal has the agent flag uncertainty rather than the human approve, which is the inverse of how a financial-figures workflow should run. Logs — assume yes if the firm builds them, but the proposal does not specify. Recommendation: *not agent appropriate as proposed*; modifications would include a human review *before* send for any reply containing figures, an explicit stop rule for any account where the records are incomplete, an explicit data boundary (the agent does not see other clients' records), and a logging requirement. A strong answer reaches *not appropriate as proposed* and names the modifications. An answer that says *agent appropriate* without modifications fails this question.

**8.** *Strong-answer criteria.* A strong answer sketches a workflow that respects privacy from step zero. A reasonable shape: stage 1 — collect responses (Tier 3 — confidential survey responses, not used by AI); stage 2 — de-identify and abstract responses *manually* (Tier 3 → Tier 2 after abstraction; not used by AI); stage 3 — AI clusters themes from the abstracted responses (Tier 2; *triage*, with named human reviewer); stage 4 — human reviews the clustering for invented themes and flattening of disagreement (not used); stage 5 — AI drafts a one-page summary from the clusters (Tier 2; *drafting*, with named reviewer); stage 6 — named reviewer checks the summary against the abstractions, removes any re-identifiable phrasing, signs off (not used); stage 7 — share with leadership (not used). The privacy boundary sits at stage 2 — between the raw confidential responses and any AI involvement. Bonus: the answer notes that even after abstraction, the summary is checked for re-identification risk before it leaves, and the disclosure note describes the workflow's AI use.

## Portfolio artifact

**Artifact:** *Workflow Map + AI-Assist Decision Table + Reviewable SOP + Agent-Readiness Assessment* (the four artifacts from the knowledge-to-output task, combined into one deliverable).

**Required filename:** `Module12_Workflow_Agent_Readiness_[YourName].pdf` or `Module12_Workflow_Agent_Readiness_[YourName].docx` (substitute your real name in the bracketed field; do not include the brackets in the actual filename).

**Required contents.**

- *Selected repeated task.* One paragraph naming the task, why you chose it, and how often you run it. Include the rough time the task takes end-to-end today.
- *Workflow map.* Stages with sequence, dependencies, owners (by role), review points, and constraints. Three or more named failure points with handling.
- *AI-assist decision table.* One row per stage. AI use (*not used* / *drafting* / *triage* / *executes end-to-end*), named human reviewer, reason for the choice. Every stage from the map appears in the table.
- *Human-only steps.* A short list naming the stages that are human-only and the reason (accountability, judgement, sensitive content, irreversibility).
- *Privacy and safety boundaries.* The Module 10 tier of any input that the workflow handles, the abstraction or redaction step that brings inputs into a tier the AI can safely see, and the stages where the privacy boundary sits.
- *Reviewable SOP.* 1–2 pages a colleague could pick up and run.
- *Agent-readiness assessment.* The six questions, each answered with yes/no/partial and a one-sentence reason. Recommendation: keep at AI-assisted, move to automated, move to partial-agent, or not yet ready.
- *Human review notes.* One short paragraph: what AI assistance you used in producing this artifact, what you accepted, what you changed, what you flagged as still uncertain.
- *Disclosure note.* Use the Course1_Disclosure_Note template (one short paragraph if the AI use was light).

**Acceptance criterion you can self-check against.** Pick three random stages from the workflow. For each, you should be able to point to the corresponding row in the decision table, the corresponding paragraph in the SOP, and (if relevant) the corresponding reasoning in the agent-readiness assessment. If any of the three breaks the chain, the artifact is not ready.

**Pathway connection.** This artifact is direct, usable evidence for the *AI Productivity Professional* pathway, where workflow design with explicit AI-assist boundaries and a reviewable SOP is the recognisable operational deliverable. It also strengthens the *Junior Tech Builder* portfolio (the agent-readiness assessment is the closest Course 1 gets to product design and is the design pattern those builders will see repeatedly), the *Small Business and Entrepreneurship* portfolio (the SOP is the operational artifact a founder uses to standardise recurring work), and the *Digital Work Starter* portfolio (the workflow map and decision table show that the learner can structure recurring work rather than only react to it).

## Capstone-save reminder

Save this artifact in `Jifunze_AI_Essentials_Portfolio/Module_12/` using the filename pattern above. The four sub-artifacts will be referenced again in four places.

In Module 13, the Workflow Map and the AI-Assist Decision Table become the structural backdrop for a decision memo. Module 13 moves from process design into decision support; the question *"how do I clarify the options, criteria, tradeoffs, and risks for a real decision the workflow surfaces?"* presupposes the workflow exists. If your workflow here is honest about its review points and its failure points, the decision memo in Module 13 will be honest about its tradeoffs.

In Module 14, the Reviewable SOP becomes the basis for a team agreement on AI use. The decision table — *AI is used here, not used there, reviewed by this role* — is what a small team agrees to before they start running the workflow together. A team agreement built without an underlying SOP is a list of preferences; a team agreement built on an SOP is a working document.

In Module 15, the prompts you used inside the AI-assisted stages of your workflow are strong candidates for inclusion in your prompt pack. Save them with their inputs, outputs, and the review notes from this module so you can lift them into Module 15 directly rather than rewriting them.

In Module 16 (Capstone), the full Workflow Map + AI-Assist Decision Table + Reviewable SOP + Agent-Readiness Assessment is one of the named portfolio components for the end-to-end demonstration. The capstone asks you to run a workflow from start to finish; this module is where the workflow itself is designed. Save the file under the correct name now; do not leave it for capstone week.

## Module completion evidence

You have completed Module 12 meaningfully when:

- You can describe the eight elements of a workflow without looking back, and you can explain in your own words why naming the AI-assist decision per stage matters.
- You can place a workflow on the four-step automation ladder (manual, AI-assisted, automated, agentic) and justify the placement.
- You can list the six conditions for agent-readiness and the categories of stop rule any real agent would need.
- You have produced the four-part portfolio artifact and saved it under the required filename.
- Every stage in your workflow map traces to a row in the decision table and a paragraph in the SOP, and the agent-readiness assessment names which stages (if any) are candidates for agentic execution.
- The workflow respects Module 10 boundaries: any Tier 3 or Tier 4 input has an explicit abstraction or redaction step, and the SOP names that step rather than burying it.
- You scored at least 6 of 8 on the checkpoint quiz, and your scenario and application answers meet the strong-answer criteria.
- The disclosure note describes any AI assistance used in producing the artifact, and the human review notes describe what you accepted, changed, and flagged as still uncertain.

## Revision guidance

If you struggled with this module, the failure mode is usually one of seven. Each one has a specific section to revisit.

*Your workflow is just a list of tasks.* Return to *What a workflow actually is* and *The eight elements of a workflow* in the core lesson. The fix is structural: walk through your draft and add the elements that are missing — most often dependencies, review points, and failure handling. Then redo Practice Activity 1 (task breakdown lab) with one of the supplied objectives.

*You skipped dependencies.* This is the most common cause of a workflow that looks complete but cannot run. Return to the *Dependencies* part of the eight elements, and redo Practice Activity 2 (dependency mapping). The discipline is to ask, for each stage, *what does this stage need before it can start, and what assumes it has already happened?* — and write the answer in the workflow rather than in your head.

*You put AI in human-only steps.* Re-read *Human-only steps* in the core lesson. The four criteria — accountability cannot transfer, judgement is irreducible, sensitive content is involved, output is final and irreversible — are the test you run against every stage. If any one applies, AI is not the right fit at that stage, regardless of whether the AI could produce a plausible output. Then re-read Worked example 3 (customer complaint handling), where the escalation triggers are written down precisely so the team does not have to remember them under pressure.

*You forgot review checkpoints, or your review checkpoints are weak.* Return to *Review gates* in the core lesson. A review point is named, has an owner, has a defined "what is being checked," and has a "what happens if the gate fails." A review point that is just "and then we look at it" is not a gate. Then redo Question 4 of the checkpoint and compare your answer to the strong-answer criteria.

*You treat automation and agents as the same thing.* Re-read *The automation ladder* and *Automation versus agents*. The distinction is between deterministic rule-execution (automation) and AI-driven decision-making about which steps to take (agentic). The right controls differ. A workflow that mixes the two without naming which is which is a workflow whose risks are mis-managed.

*Your agent-readiness assessment is too optimistic.* This is the most common failure mode in a confident learner. Return to *When agents are appropriate* and *When agents are not appropriate* in the core lesson, then re-read Worked example 4 (the weak plan that ignores real constraints). Most candidate workflows in most learners' real working lives do not pass all six conditions, and that is the right answer. *Not yet ready for agentic execution* is a strong, defensible recommendation; it is not a failure of imagination.

*You ignored Module 10 privacy and safety boundaries.* This is the most serious failure mode and the one with consequences beyond the module. Return to Module 10 itself for the four-tier classification, and to *Privacy and safety boundaries inside workflows and agents* in this module. The fix is structural: step zero of any AI-assisted stage in your SOP should be the minimum-necessary check, and any Tier 3 or Tier 4 input gets abstracted before the AI sees it. Rebuild the SOP so the privacy step is *named in the workflow*, not as a footnote.

## Transition to the next module

Module 12 helped you turn repeated work into reviewable workflows and agent-aware processes. You learned to break a task into stages, dependencies, owners, and review points; to write down where AI helps and where it must not; to spot the failure points before they fail; and to assess — with six concrete questions — whether a workflow is ready for agentic execution or whether it should remain firmly in human-driven territory. You learned to do all of this without abandoning the privacy discipline from Module 10 or the evidence-trail discipline from Module 11.

Module 13 takes the next step. Workflows produce decisions: which option to take, which supplier to choose, whether to scale the pilot, whether to stop the project, whether to accept the offer. Module 13 moves from process design into decision support: using AI to clarify options, criteria, tradeoffs, and risks while keeping the final decision human-owned. The workflow you designed in this module is the structure inside which those decisions appear; the decision memo in Module 13 is the artifact that turns a workflow's open question into a defensible choice. The same disciplines carry forward — name the question, set the scope, separate inputs, mark uncertainty, review the trail — and the same human ownership rule applies. AI clarifies. Humans decide.

## Notes for Cursor mapping

**Suggested module id:** `ae-m12`

**Suggested session/block breakdown.** Map the module into eight platform lesson blocks rather than rendering the whole document as a single unit:

1. *Overview block* — Continuity bridge from Module 11 + What was wrong before + What was improved + Estimated time + Module purpose + Learner outcomes.
2. *Concept block* — Core lesson, in two sub-blocks if the platform supports nested blocks. Sub-block A: what a workflow is + the eight elements + the automation ladder. Sub-block B: human-only steps + review gates + failure-point analysis + automation versus agents + what an agent is + when agents are appropriate / not appropriate + privacy and safety boundaries.
3. *Guided example block* — The five worked examples. Worked examples 1, 2, and 3 demonstrate full workflow design across different domains; worked example 4 is the diagnostic (weak plan); worked example 5 is the partial-agent transformation. Each example renders cleanly as its own collapsible card.
4. *Practice block* — The four practice activities, each as its own task card with the supplied scenarios embedded. Activities 1 and 2 are structural (task breakdown, dependency mapping); activity 3 is diagnostic (weak-plan diagnosis with three plans); activity 4 is the agent-readiness assessment.
5. *Reflection block* — The Pause and check questions. Render as three separate reflection prompts the learner can answer in-line.
6. *Checkpoint block* — The eight checkpoint questions, mapped per the quiz mapping notes below.
7. *Artifact upload block* — The Workflow Map + AI-Assist Decision Table + Reviewable SOP + Agent-Readiness Assessment. Single combined upload (.pdf or .docx) using the required filename pattern.
8. *Remediation block* — The Revision guidance section, with each failure mode rendered as a clickable card that links back to the relevant section of the concept and guided-example blocks.

**Likely content block types.** Text/markdown for the concept, examples, and reflection blocks. Card-style components for worked examples and practice activities, with embedded scenarios as quoted-text components. Tabular component for the AI-Assist Decision Table template (offered to the learner in the artifact upload block as an optional starting structure). The agent-readiness check in Practice Activity 4 and Checkpoint Question 7 maps cleanly to a six-question structured-input component if the platform supports one; otherwise free-text input with a six-row rubric is sufficient.

**Quiz mapping notes.** Questions 1, 2, and 5 are multiple-choice with a single correct answer (auto-checkable). Questions 3 and 4 are scenario short-answer items; render as free-text with the strong-answer criteria from the answer key as the rubric. Question 6 is a short-answer definitional item; render as free-text with rubric. Questions 7 and 8 are application items; render as free-text with multi-criterion rubrics drawn from the answer key. Pass threshold: at least 6 of 8 correct, with auto-graded items contributing to the score and rubric-graded items either self-assessed against the answer key or facilitator-assessed depending on the deployment mode.

**Portfolio artifact mapping notes.** Single combined artifact, four internal sections. Filename pattern: `Module12_Workflow_Agent_Readiness_[YourName].pdf` or `.docx`. Acceptable formats: .pdf, .docx, .md. The acceptance criterion (three random stages traceable through the decision table, the SOP, and the agent-readiness assessment) is suitable for self-check; for facilitator review it converts directly into a three-item checklist. Connect the artifact record forward to Module 13 (decision memo), Module 14 (team standards), Module 15 (prompt pack), and Module 16 (capstone).

**Special UI needs.** None beyond what the platform already supports. The worked examples benefit from rendering the AI-Assist Decision Table as a real table component (Worked example 1) and the partial-agent boundaries as a structured list (Worked example 5). The four-step automation ladder is a useful candidate for a small visual component if the platform supports inline diagrams, but a labelled list works as well. The agent-readiness assessment in the artifact is best rendered as a fixed six-row form so that every learner produces the same shape, which makes review faster.

**Single-file mapping.** This module should be mapped as one improved file: `Jifunze_Course1_Module_12_Improved.md`.
