/**
 * Completion layer: canonical learner-facing instructional blocks for flagship sessions not covered
 * by earlier override packs.
 *
 * Editorial policy: maintain this file by direct author edits in TypeScript only. Do **not**
 * regenerate final prose via scripts—the archived bulk tool is non-production (`scripts/archive/`).
 * Earlier bulk population was programmatic; lines require human editorial sign-off for a strict
 * “every line hand-crafted” standard.
 */

import type { FlagshipSessionContentBlock } from './flagshipSessionContentTypes'
import { flagshipDepthPaddingBlock } from './flagshipSessionDepthPadding'

export const FLAGSHIP_SESSION_CONTENT_OVERRIDES_COMPLETION: Partial<
  Record<string, FlagshipSessionContentBlock[]>
> = {
  "ai-essentials::ae-m01-practice": [
    {
      id: "ae-m01-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Map the failure modes first",
      body: "Three model outputs. Three critiques. Label fabrication, omission, and overconfident tone — then translate ‘is this safe?’ into sub-questions a reviewer could actually act on.",
    },
    {
      id: "ae-m01-practice-lt-task",
      type: "practice_task",
      title: "Practice · How modern AI behaves (and fails) in plain language",
      bullets: [
        "1. Cold-read three model outputs labeling fabrication, omission, overconfident tone, or missing caveats.",
        "2. Translate “Is this safe?” from a stakeholder into operational sub-questions.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "ae-m01-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "Your failure-mode sheet should be specific enough that a peer could add examples from their own work without asking you to explain it.",
      outputExpectation: "Failure-mode note sheet (half page)",
    },
    {
      id: "ae-m01-practice-lt-next",
      type: "next_step",
      body: "Take your failure-mode sheet to ae-m02 — at least one failure mode you identified will map directly to a myth your team currently holds.",
    }
  ],

  "ai-essentials::ae-m01-revision": [
    {
      id: "ae-m01-revision-lt-intro",
      type: "intro",
      eyebrow: "Revision gate",
      title: "Tighten · How modern AI behaves (and fails) in plain language",
      body: "Compress misunderstandings before they compound. Prefer precise claims, cited limits, and falsifiers—no glossary theater.",
    },
    {
      id: "ae-m01-revision-lt-recap",
      type: "recap",
      title: "Compress to checks",
      bullets: [
        "Explain memorization mimicry vs. reasoning metaphors—and where metaphors fail.",
        "Sort tasks into verification-mandatory vs. lightweight review buckets.",
        "Describe model limits to stakeholders without buzzwords.",
      ],
    },
    {
      id: "ae-m01-revision-lt-task",
      type: "practice_task",
      title: "Structured gate",
      prompt: "In 6–10 sentences: (1) what you believe now, (2) what would falsify it, (3) what artifact proves you applied this module.",
    },
    {
      id: "ae-m01-revision-lt-next",
      type: "next_step",
      body: "Proceed only if you would defend these claims aloud to a skeptical peer.",
    },
    flagshipDepthPaddingBlock('ae-m01-revision'),
  ],

  "ai-essentials::ae-m02-lesson": [
    {
      id: "ae-m02-lesson-lt-intro",
      type: "intro",
      eyebrow: "Grounding",
      title: "What AI is not: myths, shortcuts, and harmful expectations",
      body: "Smart people hold specific wrong beliefs about AI: that it understands organizational context it has never seen, that confident tone signals accurate content, that clever prompting can fix reliability problems that are architectural. This module names those beliefs directly — not to shame anyone, but because acting on them creates real professional risk.",
    },
    {
      id: "ae-m02-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "What replaces the magic-assistant model",
      body: "Statistical pattern completion on large text datasets. No private knowledge of your organization. No real-time access to current facts. No calibrated confidence built in. The model optimizes for plausible-sounding text, not accuracy. Your job is to add the accuracy layer — and the first step is not being surprised that you have to.",
    },
    {
      id: "ae-m02-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The confident-but-stale competitive summary",
      body: "A sales rep asks their AI assistant to summarize a competitor's recent product moves before a client meeting. The output is detailed, plausible, and confident. It is also six months stale — the competitor has since changed pricing and sunsetted two of the features the rep now mentions. The client corrects the rep in front of their own team.",
      example: "Prevention: before any AI-produced competitive or market claim reaches a client, verify at least one specific data point against a datable source. Not the whole summary — one point. If that point is wrong, treat the entire document as an unverified draft.",
    },
    {
      id: "ae-m02-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Calibration",
      prompt: "What would make you realize that your team's AI-related expectations are unrealistic?",
    },
    {
      id: "ae-m02-lesson-lt-next",
      type: "next_step",
      body: "Next: ae-m03 maps the tool landscape — you'll apply your corrected mental model to evaluate which tool claims your team is making without grounding. Bring one AI belief you encountered this week."
    }
  ],

  "ai-essentials::ae-m02-practice": [
    {
      id: "ae-m02-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Fact-check before the myth travels",
      body: "You will turn a viral or workplace AI claim into a load-bearing inspection a colleague could repeat — sources, strength labels, and a falsifier — and write a short myth-correction memo that a tired teammate could read on day one to calibrate before they build habits on top of misconceptions.",
    },
    {
      id: "ae-m02-practice-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "From a confident claim to a sourced correction",
      body: [
        "Pick one claim that is circulating in your context: a vendor stat, a LinkedIn post, an exec talking point, a tutorial promise. Run the inspection in three short passes.",
        "",
        "Pass 1 — Underline the load-bearing sentence (the one that would change a decision if wrong). Pass 2 — Try to find a primary source that says what the sentence says. Stop if you find a citation-shaped string that does not resolve to a real document — that is the failure to study, not the result you wanted. Pass 3 — Tag the claim Verified (passage in hand), Inferred (logical but not directly observed), or Uncited (needs work or downgrade).",
        "",
        "Then write three lines: the mechanism error the claim relies on (e.g., \"the model knows our customers\"), the boundary (where the claim could be true at smaller scope), and the verification step a skeptic could run in under ten minutes.",
      ].join("\n\n"),
      example:
        "Sample row — Claim: \"AI cuts knowledge-worker time by 30%.\" Source: vendor blog, no methods page. Strength: Weak. Mechanism error: average across narrow tasks treated as overall productivity. Boundary: some teams report time savings on a defined task class. Verification: ask for the methods page and a comparable independent audit before any internal repeat.",
    },
    {
      id: "ae-m02-practice-lt-task",
      type: "practice_task",
      title: "Learner task · Three reps with sources, plus an expectation reset",
      bullets: [
        "1. Fact-check one viral AI claim with primary documentation or a reproducible test; record source, strength, and one falsifier per claim.",
        "2. Draft a \"never outsource\" list — three claim types your team must verify before reuse — with one ethical or quality rationale per line.",
        "3. Write a one-page expectation reset memo that names at least two beliefs specific to your team or industry (not recycled from articles) with mechanism + boundary + verification step.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics — not just your tone — and a new teammate could run your verification step without DMing you.",
    },
    {
      id: "ae-m02-practice-lt-checklist",
      type: "key_points",
      eyebrow: "Self-review checklist",
      title: "Five gates before this memo leaves your hands",
      bullets: [
        "Every claim you keep has a source anchor, a strength label, or a TBD — no fluent sentences without trails.",
        "Each \"never outsource\" line names a concrete behaviour, not a value (\"do not let the model author submitted facts\" beats \"act with care\").",
        "At least two beliefs in the memo are specific to your team, industry, or role.",
        "False precision is gone: any decimal, percentage, or causal verb either traces to a passage or has been downgraded.",
        "A new teammate could read the memo cold and run the verification step on next week’s claim without you in the room.",
      ],
    },
    {
      id: "ae-m02-practice-lt-bad-good",
      type: "concept_explanation",
      eyebrow: "Bad vs good",
      title: "A weak myth-correction line and a stronger one",
      body: [
        "Weak (avoid): \"AI is not always accurate, so we should be careful when using it for important work.\" The sentence sounds responsible and binds nothing — no mechanism, no boundary, no verification step. Tired-you on a Friday afternoon will redefine \"careful\" to mean whatever finishes the deliverable.",
        "",
        "Stronger (model this): \"Belief: ''the model knows our customer base.'' Mechanism: a general model cannot read our CRM unless we paste it in or connect a retrieval tool we control. Boundary: pattern-level claims about industry segments may be useful as hypotheses; named-customer claims are not. Verification: any ''insight'' about a real customer must trace to a CRM record, a transcript, or be labelled ''hypothesis — not yet observed.''\" Concrete enough to enforce in a Monday review.",
      ].join("\n\n"),
    },
    {
      id: "ae-m02-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "Save Module02_Responsible_Judgment_Checklist_[YourName] with the inspection table for one viral claim, the \"never outsource\" list, and the expectation reset memo (mechanism + boundary + verification step for at least two team-specific beliefs).",
      outputExpectation: "Responsible judgment checklist + expectation reset memo",
    },
    {
      id: "ae-m02-practice-lt-next",
      type: "next_step",
      body: "Bring the memo to ae-m03 — your myth list will tell you which tool categories your team is most likely to misuse and which prompt contracts you owe before the next cycle.",
    }
  ],

  "ai-essentials::ae-m02-recap": [
    {
      id: "ae-m02-recap-lt-intro",
      type: "intro",
      eyebrow: "Consolidation",
      title: "Consolidate · What AI is not: myths, shortcuts, and harmful expectations",
      body: "Build a recap artifact you will reopen: keywords, failure modes, reuse rules—written for future-you under stress.",
    },
    {
      id: "ae-m02-recap-lt-keys",
      type: "key_points",
      title: "Carry-forward pack",
      bullets: [
        "The mechanism: statistical pattern completion on training data — no private context, no real-time accuracy, no built-in confidence calibration.",
        "Failure mode to watch: accepting confident tone as a verification signal — fluency and factual accuracy are not correlated.",
        "Reuse signal: when you hear an AI-produced claim that contradicts something you know — stop and apply the inspection protocol before acting on either.",
      ],
    },
    {
      id: "ae-m02-recap-lt-reflect",
      type: "reflection_prompt",
      title: "Calibration",
      prompt: "What would convince you this module did not stick—what signal would you look for in your next deliverable?",
    },
    {
      id: "ae-m02-recap-lt-next",
      type: "next_step",
      body: "Archive the recap where your future self will actually find it.",
    },
    flagshipDepthPaddingBlock('ae-m02-recap'),
  ],

  "ai-essentials::ae-m03-lesson": [
    {
      id: "ae-m03-lesson-lt-intro",
      type: "intro",
      eyebrow: "Grounding",
      title: "Tool landscape: assistants, retrieval, models, and agents",
      body: "Tool selection is a professional judgment problem, not a product comparison exercise. Assistants, retrieval-augmented systems, copilots, and agents have different capability envelopes, failure modes, and integration requirements. Choosing by brand demos instead of task fit is an error — and organizations are making it at scale.",
    },
    {
      id: "ae-m03-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "Four tool classes, four different failure modes",
      body: "The decision frame: (1) does the task need fresh information retrieval or generation from context I provide? (2) how tolerant is this workflow to hallucinations? (3) what data is going in and what does my organization's handling policy require? Selecting by capability and policy — not popularity or demo quality — is the professional standard.",
    },
    {
      id: "ae-m03-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The enterprise rollout that blocked itself",
      body: "A content team evaluates three AI tools for draft generation. They pick the best demo. Two months later: IT security policy blocks the chosen tool's data-handling requirements. The evaluation table had columns for output quality — but not for security classification of inputs, integration dependencies, or policy compliance.",
      example: "What the evaluation table should have included: task type | output stakes | input sensitivity | integration dependencies | policy compliance check | success criterion | kill rule if deployment fails. One row per candidate tool.",
    },
    {
      id: "ae-m03-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Calibration",
      prompt: "Which tool category is your team using for a task that doesn’t match its capability envelope? Name the mismatch and what it’s costing in review time or error rate.",
    },
    {
      id: "ae-m03-lesson-lt-next",
      type: "next_step",
      body: "Next: ae-m04 treats prompt writing as spec writing — your tool matrix gives you the tasks; the prompting module teaches you how to write specifications for them."
    }
  ],

  "ai-essentials::ae-m03-practice": [
    {
      id: "ae-m03-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Prompts as control surfaces a colleague could run cold",
      body: "You will turn one weekly task into a small prompt contract — task, context, audience, constraints, output shape, refusal behaviour, acceptance test — and pair it with a red/yellow/green data tier rule so a teammate could run the work tomorrow without DMing you. The matrix should withstand a question from a skeptical IT or legal reviewer.",
    },
    {
      id: "ae-m03-practice-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "From a vague reused prompt to a reviewable contract",
      body: [
        "Pick one prompt you reuse weekly: a customer reply, a meeting summary, a job-spec rewrite, a study-note generator. Walk it through the seven slots:",
        "",
        "Task — one verb-led sentence (summarise, extract, draft, critique). Context — minimum background (domain, jurisdiction, product stage, the data you will paste). Audience — role, literacy, the decision they can make, the one thing that would make them say no. Constraints — budget, tone band, legal or brand limits, two forbidden moves (\"do not invent timelines,\" \"do not legalize policy text\"). Output shape — table columns, JSON keys, memo headings. Refusal behaviour — what to do when evidence is thin (return TBD; flag for a named human; quote rather than infer). Acceptance test — one mechanical check a peer could run on the output (\"if a metric has no source, it must read TBD\").",
        "",
        "Then add a data-tier rule beside the contract: green (safe), yellow (internal — redact or abstract), red (never enter). Name one example per tier from your actual work.",
      ].join("\n\n"),
      example:
        "Sample contract slot — Refusal behaviour: \"If the input does not contain a date for delivery, return [DATE TBD] in the output and add a one-line note for the reviewer; do not infer a date from ''usually'' or ''normally.''\"",
    },
    {
      id: "ae-m03-practice-lt-task",
      type: "practice_task",
      title: "Learner task · One contract, one tier rule, one acceptance test",
      bullets: [
        "1. Convert one weekly prompt into a prompt contract with all seven slots filled — keep it under one page.",
        "2. Score five real workflows against tool categories + integration requirements; for each, name one disqualifying signal that would force a re-pick.",
        "3. Document red/yellow/green data tiers for the workflow your contract serves; name one example per tier from your context and one pause-or-escalate trigger with a named contact role.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics — not just your tone — and your acceptance test could mechanically catch the failure mode the old prompt was hiding.",
    },
    {
      id: "ae-m03-practice-lt-checklist",
      type: "key_points",
      eyebrow: "Self-review checklist",
      title: "Six gates before this contract leaves your hands",
      bullets: [
        "Every slot is filled — no \"the model will figure it out\" slots, especially audience and refusal behaviour.",
        "At least two forbidden moves match a real policy you can point to (privacy, brand, legal, accuracy).",
        "Acceptance test is mechanical — a peer could score the output without rerunning the prompt.",
        "Output shape would let omission and invention show up where a reviewer can scan, not in a wall of prose.",
        "Data-tier rule names a green, yellow, and red example from your actual work and a pause-or-escalate trigger with a named role (compliance, security, school admin).",
        "A teammate at low energy could run the contract on Monday without paging you for context.",
      ],
    },
    {
      id: "ae-m03-practice-lt-bad-good",
      type: "concept_explanation",
      eyebrow: "Bad vs good",
      title: "A vague reused prompt and a contract that survives a busy week",
      body: [
        "Weak (avoid): \"Summarise this for the team.\" One verb, no audience, no refusal behaviour, no output shape, no acceptance test. The model picks formality, length, and what to invent when the input is thin; the team picks who blames whom afterwards.",
        "",
        "Stronger (model this): \"Role: HR generalist coach (non-lawyer). Task: extract obligations only from the attached PDF. Audience: line managers — they cannot interpret legal text. Output: table with columns Obligation | Applies to | Effective date (quote or TBD) | Section ref | Ambiguity flag (Y/N). Forbidden: do not infer legal conclusions; if a sentence is vague, quote it and flag it; include at least three explicit unknowns if the PDF is incomplete. Acceptance test: if fewer than two rows have Ambiguity flag = Y for a messy PDF, re-run with a self-critique step.\" The strong version makes omission and invention visible; a reviewer can scan the table in two minutes.",
      ].join("\n\n"),
    },
    {
      id: "ae-m03-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "Save Module03_Prompt_Rewrite_[YourName] with the before/after contract, the five-workflow tool-fit matrix (with a disqualifying signal per row), and the data-tier rule including pause-or-escalate trigger.",
      outputExpectation: "Prompt rewrite + tool-fit matrix + data-tier rule",
    },
    {
      id: "ae-m03-practice-lt-next",
      type: "next_step",
      body: "Take the contract to ae-m04. Each contract still needs a structured output, a small rubric, and a refusal lane you have not yet written down.",
    }
  ],

  "ai-essentials::ae-m05-practice": [
    {
      id: "ae-m05-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Iteration with receipts — fixtures, diffs, and a rollback rule",
      body: "You will run three prompt variants on a frozen fixture, score them against a small rubric (including at least one non-negotiable row), log what changed and why behaviour should shift, and write a rollback rule a reviewer could enforce without you in the room. A teammate should see why v2 exists — not just that it exists.",
    },
    {
      id: "ae-m05-practice-lt-worked",
      type: "worked_example",
      eyebrow: "Worked thread",
      title: "Three variants, one fixture, an honest tradeoff",
      body: [
        "Pick one recurring task that already has a v1 prompt: a customer reply, a meeting summary, an extraction prompt, a study-question generator. Build the test:",
        "",
        "1. Save a fixture: the same input(s), the same context, the same evaluator (you, with a small rubric — accuracy, format, safety/refusal, usefulness, plus at least one non-negotiable row drawn from your domain such as \"creates new obligations\" or \"invents timelines\"). 2. Write three variants that change one variable each (evidence rule; output schema; one negative constraint; the audience line). 3. Run all three against the fixture; capture the outputs verbatim. 4. Score each variant on the rubric; record the rubric movement and one tradeoff in plain language (\"v3 improved citation coverage from 2/5 to 5/5; brevity dropped — accepted because compliance is primary\").",
        "",
        "Finish with a rollback rule that names the specific row whose regression forces revert (\"if any variant adds an obligation language not present in v1, roll back regardless of CSAT lift\"). Save the rule beside the fixture so the next iteration cannot quietly skip it.",
      ].join("\n\n"),
      example:
        "Minimum log schema: fixture ID | prompt diff summary | hypothesis | expected rubric movement | observed scores | tradeoff | rollback rule | owner | date.",
    },
    {
      id: "ae-m05-practice-lt-task",
      type: "practice_task",
      title: "Learner task · Three variants, golden fixture, rollback rule",
      bullets: [
        "1. Save one golden fixture (frozen inputs + 4–6 rubric rows including at least one non-negotiable from your domain) for a recurring task you actually run.",
        "2. Run three controlled variants (one variable per change) and record the outputs and rubric scores; tag the winner and at least one regression — even if small.",
        "3. Write a rollback rule that names a specific rubric row whose regression triggers revert, and an adversarial fixture (one tricky input) that the next iteration must not regress on.",
      ],
      prompt: "Stop when you could hand the log to a teammate and they could reproduce your conclusion — and when the rollback rule could be enforced by a reviewer who was not in the room.",
    },
    {
      id: "ae-m05-practice-lt-checklist",
      type: "key_points",
      eyebrow: "Self-review checklist",
      title: "Six gates before this version log leaves your hands",
      bullets: [
        "Fixture is frozen (saved file or pinned chat) — re-runnable next month, not just from memory.",
        "Each variant changes one variable; no \"v2 improved several things\" handwaves.",
        "Rubric includes at least one non-negotiable row drawn from your domain (policy, citation coverage, refusal behaviour, format parseability).",
        "At least one tradeoff is named in plain language; nothing is reported as a free win.",
        "A rollback rule names the specific row whose regression triggers revert, even if other rows improve.",
        "Adversarial fixture exists — one tricky input the next variant must not regress on (overpromise, missing source, hostile tone, ambiguous policy).",
      ],
    },
    {
      id: "ae-m05-practice-lt-bad-good",
      type: "concept_explanation",
      eyebrow: "Bad vs good",
      title: "A vibes-based iteration note and one a reviewer could ship from",
      body: [
        "Weak (avoid): \"Updated prompt; seems better.\" No fixture, no rubric, no diff, no rollback rule. The next person who edits this prompt has no way to tell what changed, why, or what would force a revert. Folklore replaces engineering.",
        "",
        "Stronger (model this): \"Fixture: invoice dispute template + attachment A. Change: require ''policy paragraph reference'' for any fee waiver language. Hypothesis: fewer invented policies. Result: hallucinated policy refs dropped 4/5 → 0/5; avg length +18%; brevity row down — accepted for now because compliance row is primary. Rollback rule: any new obligation language not in v1 forces revert. Owner: Sam. Date.\" The note lets someone who was not in the room decide whether to ship, revert, or iterate again.",
      ].join("\n\n"),
    },
    {
      id: "ae-m05-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "Save Module05_Prompt_Version_Log_[YourName] with the fixture, three variants, rubric scores, the tradeoff note, the rollback rule, and the 8–12 line prompt QA checklist you will use under pressure.",
      outputExpectation: "Prompt version log + rollback rule + QA checklist",
    },
    {
      id: "ae-m05-practice-lt-next",
      type: "next_step",
      body: "Next: ae-m06 — verification lanes so fluent outputs cannot masquerade as verified facts, and your iteration log becomes evidence not anecdote.",
    },
    flagshipDepthPaddingBlock('ae-m05-practice'),
  ],

  "ai-essentials::ae-m05-revision": [
    {
      id: "ae-m05-revision-lt-intro",
      type: "intro",
      eyebrow: "Revision gate",
      title: "Tighten · Iteration, comparison, and rollback discipline",
      body: "Compress what you will actually do when a prompt “improvement” silently breaks format, citations, or refusal behavior. Revision is where vague iteration habits die.",
    },
    {
      id: "ae-m05-revision-lt-recap",
      type: "recap",
      title: "Compress to checks",
      bullets: [
        "One pairwise test you ran and the rubric row that decided the winner.",
        "One regression you caught (or should have caught) and how you rolled back.",
        "Three lines your prompt QA checklist will contain before the next deadline.",
      ],
    },
    {
      id: "ae-m05-revision-lt-task",
      type: "practice_task",
      title: "Structured gate",
      prompt:
        "In 6–10 sentences: (1) your default iteration mistake under pressure, (2) the signal that should trigger rollback, (3) what in your version log proves you practiced this module.",
    },
    {
      id: "ae-m05-revision-lt-next",
      type: "next_step",
      body: "Proceed only if a tired teammate could follow your version notes without asking you to narrate.",
    },
    flagshipDepthPaddingBlock('ae-m05-revision'),
  ],

  "ai-essentials::ae-m04-lesson": [
    {
      id: "ae-m04-lesson-lt-intro",
      type: "intro",
      eyebrow: "Applied reasoning",
      title: "Prompting as structured communication—not spellcasting",
      body: "The superstition model of prompting — that magic phrases unlock better outputs — dies here. Every prompt is a specification: it declares intent, constraints, format, and done-ness criteria. Vague prompts produce vague outputs not because the model is bad, but because the spec was incomplete.",
    },
    {
      id: "ae-m04-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "A prompt is a spec, not a spell",
      body: "A good prompt tells the model what a good reviewer would say yes to. It names: who this is for, what done looks like, what format is required, what the model should not infer, and what level of uncertainty is acceptable. Skip any of these and you’ve written a wish, not a specification.",
    },
    {
      id: "ae-m04-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The same brief, twice",
      body: "Vague: ‘Summarize the Q3 results.’ Reviewable: ‘Summarize Q3 results for the VP of Operations (non-finance audience). Three bullets: revenue vs. plan, top operational risk, one decision needed by month-end. Flag any number you cannot verify from the attached data. Do not infer trends beyond what the data shows.’ Same request. Radically different reviewer-readiness.",
      example: "Test: read your prompt aloud to a colleague without context. If they ask ‘what do you mean by…’ more than twice, you have a spec problem, not a prompting problem.",
    },
    {
      id: "ae-m04-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Calibration",
      prompt: "Pick one prompt you use weekly. Name what it’s missing: audience? format? exclusions? done-ness criteria? That gap is your first editing target.",
    },
    {
      id: "ae-m04-lesson-lt-next",
      type: "next_step",
      body: "Next: ae-m05 — iterate and pressure-test prompts with logged diffs, rubric checks, and rollback discipline before stakes rise further.",
    }
  ],

  "business-builder::bb-m01-practice": [
    {
      id: "bb-m01-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "bb-m01-practice-lt-task",
      type: "practice_task",
      title: "Practice · Venture framing: painful problems, substitutes, survivable scope",
      bullets: [
        "1. Rank five hypotheses by evidence strength + cost to learn next.",
        "2. Substitution map: why buyers stay with status quo today.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "bb-m01-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Problem framing + substitution map",
    },
    {
      id: "bb-m01-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "business-builder::bb-m01-revision": [
    {
      id: "bb-m01-revision-lt-intro",
      type: "intro",
      eyebrow: "Revision gate",
      title: "Tighten · Venture framing: painful problems, substitutes, survivable scope",
      body: "Compress misunderstandings before they compound. Prefer precise claims, cited limits, and falsifiers—no glossary theater.",
    },
    {
      id: "bb-m01-revision-lt-recap",
      type: "recap",
      title: "Compress to checks",
      bullets: [
        "Draft falsifiable problem statements with observable pain signals.",
        "Map substitutes and inertia without caricature.",
        "Choose initial scope bounded by cash and calendar reality.",
      ],
    },
    {
      id: "bb-m01-revision-lt-task",
      type: "practice_task",
      title: "Structured gate",
      prompt: "In 6–10 sentences: (1) what you believe now, (2) what would falsify it, (3) what artifact proves you applied this module.",
    },
    {
      id: "bb-m01-revision-lt-next",
      type: "next_step",
      body: "Proceed only if you would defend these claims aloud to a skeptical peer.",
    }
  ],

  "business-builder::bb-m02-lesson": [
    {
      id: "bb-m02-lesson-lt-intro",
      type: "intro",
      eyebrow: "Grounding",
      title: "Validation without self-deception: interviews, probes, kill criteria",
      body: "The fastest way to self-deceive in early validation is to count the conversations that confirmed your hypothesis and forget the ones that didn’t. Interview discipline has one job: surface the evidence that would make you stop — before you spend money building.",
    },
    {
      id: "bb-m02-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "Three questions that reveal actual intent",
      body: "The signals that matter: (1) has this person tried to solve this before? (2) what did they try and why did it fail? (3) what would they need to see to change their behavior? Generic enthusiasm is not evidence. Past behavior and articulated alternatives are.",
    },
    {
      id: "bb-m02-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The validation interview that almost worked",
      body: "A founder conducts 15 discovery interviews. All 15 are enthusiastic. The founder treats this as validation. What the notes actually show: 11 interviewees said ‘someone should build this’ — a wish, not a commitment. Three described the problem but had workarounds. Only one had actively tried to buy a solution and failed.",
      example: "Pre-write your kill rule before the interview series: ‘If fewer than X of Y describe past attempts to change behavior, we stop.’ Writing it in advance prevents moving the goalposts after data comes in.",
    },
    {
      id: "bb-m02-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might a spreadsheet or headline tempt you to skip downside or definitions? Name one guardrail.",
    },
    {
      id: "bb-m02-lesson-lt-next",
      type: "next_step",
      body: "Next: bb-m03 — the validation findings you just collected directly constrain which offer designs are defensible and which require more evidence.",
    }
  ],

  "business-builder::bb-m02-practice": [
    {
      id: "bb-m02-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "bb-m02-practice-lt-task",
      type: "practice_task",
      title: "Practice · Validation without self-deception: interviews, probes, kill criteria",
      bullets: [
        "1. Interview guide + synthesis memo with contradictory evidence preserved.",
        "2. Experiment card: hypothesis, spend cap, metric, kill date.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "bb-m02-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Discovery interview kit + experiment cards",
    },
    {
      id: "bb-m02-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "business-builder::bb-m03-lesson": [
    {
      id: "bb-m03-lesson-lt-intro",
      type: "intro",
      eyebrow: "Grounding",
      title: "Offer design: outcome, mechanism, proof, capacity check",
      body: "An offer that can’t be explained in two sentences is a product concept, not an offer. Customers don’t buy mechanisms — they buy outcomes. This module builds the four-part discipline: what changes for the buyer, how the mechanism delivers it, what proof exists, and whether current capacity can reliably deliver it.",
    },
    {
      id: "bb-m03-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "The four-part offer test",
      body: "Outcome: what measurably changes for the buyer? Mechanism: what specifically do you do that produces that change? Proof: what evidence can you cite that doesn’t require the buyer to trust you? Capacity: can you deliver this at the volume you’re claiming, with current resources? Weak offers fail one or more of these — and the failure is rarely in the mechanism.",
    },
    {
      id: "bb-m03-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The offer that stalled in the discovery call",
      body: "A consulting firm’s pitch takes 30 minutes and ends with a 15-page proposal. Win rate drops when they scale outbound. The issue: buyers can’t repeat the offer to an internal approver. The fix: ‘We reduce onboarding time from 6 weeks to 2, using a structured handoff protocol. We’ve done this at 3 similar firms. We need X to start.’",
      example: "Test: can a buyer repeat your offer to their CFO in under 60 seconds with accuracy? If not, the offer needs editing, not the pitch.",
    },
    {
      id: "bb-m03-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might a spreadsheet or headline tempt you to skip downside or definitions? Name one guardrail.",
    },
    {
      id: "bb-m03-lesson-lt-next",
      type: "next_step",
      body: "Next: bb-m04 will stress-test the business model your offer implies — the dependencies you haven’t named yet become visible under load.",
    }
  ],

  "business-builder::bb-m03-practice": [
    {
      id: "bb-m03-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "bb-m03-practice-lt-task",
      type: "practice_task",
      title: "Practice · Offer design: outcome, mechanism, proof, capacity check",
      bullets: [
        "1. Offer one-pager with proof hooks + explicit non-goals.",
        "2. Peer critique for overclaim + capacity mismatch.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "bb-m03-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Offer one-pager v1",
    },
    {
      id: "bb-m03-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "business-builder::bb-m03-recap": [
    {
      id: "bb-m03-recap-lt-intro",
      type: "intro",
      eyebrow: "Consolidation",
      title: "Consolidate · Offer design: outcome, mechanism, proof, capacity check",
      body: "Build a recap artifact you will reopen: keywords, failure modes, reuse rules—written for future-you under stress.",
    },
    {
      id: "bb-m03-recap-lt-keys",
      type: "key_points",
      title: "Carry-forward pack",
      bullets: [
        "Keyword claim: Articulate outcome, mechanism, proof, pricing posture together.",
        "Failure mode to watch: Turn insight into something purchasable—explicit mechanism, proof assets, delivery limits stated upfront.…",
        "Reuse rule: when to apply vs rethink this module",
      ],
    },
    {
      id: "bb-m03-recap-lt-reflect",
      type: "reflection_prompt",
      title: "Calibration",
      prompt: "What would convince you this module did not stick—what signal would you look for in your next deliverable?",
    },
    {
      id: "bb-m03-recap-lt-next",
      type: "next_step",
      body: "Archive the recap where your future self will actually find it.",
    }
  ],

  "business-builder::bb-m04-lesson": [
    {
      id: "bb-m04-lesson-lt-intro",
      type: "intro",
      eyebrow: "Applied reasoning",
      title: "Business model stress test: dependencies, cash engines, fragility",
      body: "Every business model has assumptions that only become visible when they break. The stress test doesn’t predict success — it names the assumptions you’d have to get right for success to be possible, and identifies which of those assumptions are hardest to test cheaply.",
    },
    {
      id: "bb-m04-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "Named dependencies are manageable; unnamed ones aren’t",
      body: "Three-column diagnostic: (1) what has to be reliably true for your revenue engine to work? (2) which of those things is outside your direct control? (3) how would you know early if one was failing? The goal is not to eliminate dependencies — it’s to have a monitoring rule for each.",
    },
    {
      id: "bb-m04-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The growth plan that depended on a partnership no one had closed",
      body: "A SaaS company’s 18-month growth plan assumes a referral partnership with an enterprise platform. The partnership is ‘in discussion.’ Stress test result: 40% of Year 1 revenue and 80% of Year 2 revenue only happen if the partnership closes on schedule. Nobody wrote a fallback revenue path.",
      example: "Stress test protocol: replace ‘partnership closes on schedule’ with ‘partnership doesn’t happen.’ Rebuild the revenue model. The gap between the original and the fallback is the risk you’re actually carrying.",
    },
    {
      id: "bb-m04-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might a spreadsheet or headline tempt you to skip downside or definitions? Name one guardrail.",
    },
    {
      id: "bb-m04-lesson-lt-next",
      type: "next_step",
      body: "Next: bb-m06 examines the operational throughput constraints your model creates — your dependencies become visible as bottlenecks under delivery load.",
    }
  ],

  "business-builder::bb-m04-practice": [
    {
      id: "bb-m04-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "bb-m04-practice-lt-task",
      type: "practice_task",
      title: "Practice · Business model stress test: dependencies, cash engines, fragility",
      bullets: [
        "1. Annotated canvas with risk callouts per cell.",
        "2. Kill-test two brittle dependencies with smallest possible probes.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "bb-m04-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Annotated canvas + dependency memo",
    },
    {
      id: "bb-m04-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "business-builder::bb-m06-lesson": [
    {
      id: "bb-m06-lesson-lt-intro",
      type: "intro",
      eyebrow: "Applied reasoning",
      title: "Throughput before hype: bottlenecks, quality bar, proportional tooling",
      body: "Scaling a broken delivery system produces broken output faster. This module makes the bottleneck visible before you invest in growth: the constraint that limits total throughput is almost always not the one operators are focused on.",
    },
    {
      id: "bb-m06-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "The constraint is where work piles up, not where people are busiest",
      body: "Busyness and constraint are not the same. The constraint is the stage where additional input backs up regardless of effort. Identify it by asking: if demand doubled tomorrow, where would the first queue form? Fixing everything upstream of the constraint first is waste. Fix the constraint first.",
    },
    {
      id: "bb-m06-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The agency that hired before finding the bottleneck",
      body: "A content agency grows from 5 to 12 clients. Output quality drops. They hire two more writers. Quality continues to drop. The actual bottleneck: editorial review, owned by one senior person with no backup or delegation framework. More writers created more queued drafts, not more finished content.",
      example: "Before any hiring decision, run the queue test: where do drafts, decisions, or approvals currently pile up? If the answer is ‘everywhere,’ narrow it: what single stage would immediately free flow if unblocked?",
    },
    {
      id: "bb-m06-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might a spreadsheet or headline tempt you to skip downside or definitions? Name one guardrail.",
    },
    {
      id: "bb-m06-lesson-lt-next",
      type: "next_step",
      body: "Next: bb-m08 addresses the judgment and prioritization load that emerges when throughput increases without clear operating norms.",
    }
  ],

  "business-builder::bb-m07-practice": [
    {
      id: "bb-m07-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "bb-m07-practice-lt-task",
      type: "practice_task",
      title: "Practice · Operating rhythm: cadences owners actually attend",
      bullets: [
        "1. Cadence calendar with agenda templates including a 10-minute KPI snapshot section.",
        "2. Playbook skeleton for critical path workflow.",
        "3. Write a one-page business review outline: what numbers, what definitions, what decisions.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "bb-m07-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Operating cadence calendar + management review outline + playbook skeleton",
    },
    {
      id: "bb-m07-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "business-builder::bb-m08-lesson": [
    {
      id: "bb-m08-lesson-lt-intro",
      type: "intro",
      eyebrow: "Professional judgment",
      title: "Judgment under overload: cuts, logs, burnout avoidance",
      body: "The first scaling failure is almost never a strategy failure — it’s a prioritization failure under volume. When everything demands a decision and context has evaporated, founders and operators default to urgency rather than importance. This module builds the operating discipline before the overload arrives.",
    },
    {
      id: "bb-m08-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "Decision quality is a function of documented context, not intelligence",
      body: "Under overload, fast decisions feel efficient but cost more in rework and reversals than the time saved. The discipline: for any decision that costs more than X hours or Y dollars to reverse, write a three-sentence decision log before acting. Not for accountability — for your own ability to replay the decision when conditions change.",
    },
    {
      id: "bb-m08-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The cut that looked obvious in retrospect",
      body: "An ops lead makes 20+ reactive decisions per week. When a major client escalates a delivery failure, they can’t reconstruct which decisions created the vulnerability. The decision log for that period has 3 entries. Two are email threads with no resolution recorded.",
      example: "Minimum viable log: (1) what was the decision, (2) what was the key tradeoff, (3) who else needs to know this changed. Written in under 90 seconds. The discipline is volume, not depth.",
    },
    {
      id: "bb-m08-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might a spreadsheet or headline tempt you to skip downside or definitions? Name one guardrail.",
    },
    {
      id: "bb-m08-lesson-lt-next",
      type: "next_step",
      body: "Next: bb-m09 addresses the people dependencies your current operating load creates — your decision log patterns reveal the actual shape of your first hire.",
    }
  ],

  "business-builder::bb-m08-practice": [
    {
      id: "bb-m08-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "bb-m08-practice-lt-task",
      type: "practice_task",
      title: "Practice · Judgment under overload: cuts, logs, burnout avoidance",
      bullets: [
        "1. Prioritization matrix with explicit deferred list.",
        "2. Decision memo on one uncomfortable trade-off.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "bb-m08-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Prioritization matrix + trade-off memo",
    },
    {
      id: "bb-m08-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "business-builder::bb-m09-lesson": [
    {
      id: "bb-m09-lesson-lt-intro",
      type: "intro",
      eyebrow: "Professional judgment",
      title: "Early people reality: hires, contractors, norms that scale",
      body: "Early hiring mistakes are expensive not because people are bad but because the role was designed wrong. This module builds two disciplines that prevent the most common early-team failures: writing hire profiles to bottlenecks rather than aspirations, and setting operating norms before the team is large enough that ambiguity becomes costly.",
    },
    {
      id: "bb-m09-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "A hire profile answers the throughput question, not the org chart question",
      body: "Wrong question: ‘What role do we need?’ Correct question: ‘Which current bottleneck, if eliminated by a skilled person, would create the most leverage?’ The hire profile derives from bottleneck analysis — not from job descriptions at similar-stage companies. Copying another company’s org structure imports their constraints, not their context.",
    },
    {
      id: "bb-m09-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The VP hire that answered the wrong question",
      body: "A 12-person company hires a VP of Marketing to ‘build the brand.’ Six months later: brand assets exist, but top-of-funnel acquisition (the actual bottleneck) hasn’t moved. The hire was scoped to output (brand) rather than constraint (qualified pipeline). The role was redesigned — but seniority and compensation had already been set.",
      example: "Write the hire profile from your bottleneck first: ‘The person in this role eliminates [specific constraint] by doing [specific repeatable action]. Success in 90 days looks like [measurable outcome].’ If you can’t fill that sentence, the role isn’t ready to post.",
    },
    {
      id: "bb-m09-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might a spreadsheet or headline tempt you to skip downside or definitions? Name one guardrail.",
    },
    {
      id: "bb-m09-lesson-lt-next",
      type: "next_step",
      body: "Next: bb-m10 examines growth loops and retention economics — whether the team you’re building can support the expansion model your revenue projections assume.",
    }
  ],

  "business-builder::bb-m09-practice": [
    {
      id: "bb-m09-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "bb-m09-practice-lt-task",
      type: "practice_task",
      title: "Practice · Early people reality: hires, contractors, norms that scale",
      bullets: [
        "1. Role spec + scorecard + sourcing plan.",
        "2. Contractor onboarding checklist + success signals.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "bb-m09-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Hire profile pack + onboarding checklist",
    },
    {
      id: "bb-m09-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "business-builder::bb-m10-lesson": [
    {
      id: "bb-m10-lesson-lt-intro",
      type: "intro",
      eyebrow: "Integration",
      title: "Measured expansion: loops, cohort honesty, retention economics",
      body: "Most expansion models assume that what worked for the first cohort will continue to work at scale. Cohort honesty is the discipline of testing that assumption before it becomes the default. Retention economics tells you whether growth compounds or requires continuous acquisition spend to replace churn.",
    },
    {
      id: "bb-m10-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "The acquisition treadmill vs. the compounding loop",
      body: "An acquisition treadmill: every dollar of revenue requires proportional new acquisition spend to maintain. A compounding loop: existing customers generate referrals, expansion revenue, or reactivation at lower CAC than new acquisition. The discipline is identifying which loop you’re actually building — not which one the model assumes.",
    },
    {
      id: "bb-m10-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The growth plan that outran retention",
      body: "A subscription business hits 30% MoM growth for five months. The team doubles. In month 6: churn from the first cohort reaches 40%. New acquisition is now replacing churned users. The business is growing in headcount and cost but not in retained revenue.",
      example: "Run the cohort test before committing to growth spend increases: what is 12-month retention for your first 3 cohorts? If retention is declining cohort-over-cohort, solve that first. Growth spend on a leaky retention model accelerates the loss.",
    },
    {
      id: "bb-m10-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might a spreadsheet or headline tempt you to skip downside or definitions? Name one guardrail.",
    },
    {
      id: "bb-m10-lesson-lt-next",
      type: "next_step",
      body: "Next: bb-m11 is the capstone — your business model, people plan, and growth loop assumptions get assembled into the advisor-ready brief.",
    }
  ],

  "business-builder::bb-m10-practice": [
    {
      id: "bb-m10-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "bb-m10-practice-lt-task",
      type: "practice_task",
      title: "Practice · Measured expansion: loops, cohort honesty, retention economics",
      bullets: [
        "1. Growth hypothesis backlog sequenced by learning/cost with KPI gate per stage.",
        "2. Retention sketch: churn drivers + intervention hypotheses + metric you will watch weekly.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "bb-m10-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Growth sequencing memo + cohort KPI sketch",
    },
    {
      id: "bb-m10-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "business-builder::bb-m11-lesson": [
    {
      id: "bb-m11-lesson-lt-intro",
      type: "intro",
      eyebrow: "Integration",
      title: "Blueprint integration: advisor-ready rehearsal",
      body: "An advisor-ready brief is not a polished deck — it’s a document that survives adversarial questions about your assumptions. This module assembles the work from all prior modules into one coherent diligence story: your problem statement, offer, business model, bottlenecks, people plan, and growth loop, connected and internally consistent.",
    },
    {
      id: "bb-m11-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "Internal consistency is the test, not completeness",
      body: "The brief fails if your offer outcome doesn’t connect to your retention model. It fails if your growth projections require headcount your bottleneck analysis says you can’t support. The assembly discipline: read the brief as a skeptic and name the three places where a claim is unsupported or inconsistent with a prior claim. Those are your revision targets.",
    },
    {
      id: "bb-m11-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The brief that passed the advisor question",
      body: "A founder presents a 4-page brief. The advisor asks: ‘If your retention assumption is wrong by 20%, what happens to your 18-month projection?’ The founder answers in 30 seconds with a pre-built sensitivity table. That answer won the advisor’s commitment. The sensitivity table existed because the brief was assembled with explicit assumptions, not just outputs.",
      example: "Build the brief in layers: assumptions → model → narrative → appendix. The narrative should stand alone. The assumptions and model should be accessible for the adversarial question. If an advisor has to ask for the assumptions, they’re not in the brief yet.",
    },
    {
      id: "bb-m11-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might a spreadsheet or headline tempt you to skip downside or definitions? Name one guardrail.",
    },
    {
      id: "bb-m11-lesson-lt-next",
      type: "next_step",
      body: "This is the business-builder capstone. Bring your brief to peer review with the adversarial question ready: ‘Where is the single assumption that, if wrong, makes the whole model invalid?’ Know your answer before you walk in.",
    }
  ],

  "business-builder::bb-m11-practice": [
    {
      id: "bb-m11-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "bb-m11-practice-lt-task",
      type: "practice_task",
      title: "Practice · Blueprint integration: advisor-ready rehearsal",
      bullets: [
        "1. Mock advisor review with question log.",
        "2. Second pass: tighten claims, drop filler.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "bb-m11-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Operating & growth blueprint v1",
    },
    {
      id: "bb-m11-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "business-builder::bb-m11-recap": [
    {
      id: "bb-m11-recap-lt-intro",
      type: "intro",
      eyebrow: "Consolidation",
      title: "Consolidate · Blueprint integration: advisor-ready rehearsal",
      body: "Build a recap artifact you will reopen: keywords, failure modes, reuse rules—written for future-you under stress.",
    },
    {
      id: "bb-m11-recap-lt-keys",
      type: "key_points",
      title: "Carry-forward pack",
      bullets: [
        "Keyword claim: Merge modules into single coherent diligence story.",
        "Failure mode to watch: Compile narrative, economics, systems, growth, risks—cut duplication, invite sharp questions.…",
        "Reuse rule: when to apply vs rethink this module",
      ],
    },
    {
      id: "bb-m11-recap-lt-reflect",
      type: "reflection_prompt",
      title: "Calibration",
      prompt: "What would convince you this module did not stick—what signal would you look for in your next deliverable?",
    },
    {
      id: "bb-m11-recap-lt-next",
      type: "next_step",
      body: "Archive the recap where your future self will actually find it.",
    }
  ],

  "business-builder::bb-m11-revision": [
    {
      id: "bb-m11-revision-lt-intro",
      type: "intro",
      eyebrow: "Revision gate",
      title: "Tighten · Blueprint integration: advisor-ready rehearsal",
      body: "Compress misunderstandings before they compound. Prefer precise claims, cited limits, and falsifiers—no glossary theater.",
    },
    {
      id: "bb-m11-revision-lt-recap",
      type: "recap",
      title: "Compress to checks",
      bullets: [
        "Merge modules into single coherent diligence story.",
        "Stress-test with outsider prompts.",
        "Commit to quarterly blueprint refresh.",
      ],
    },
    {
      id: "bb-m11-revision-lt-task",
      type: "practice_task",
      title: "Structured gate",
      prompt: "In 6–10 sentences: (1) what you believe now, (2) what would falsify it, (3) what artifact proves you applied this module.",
    },
    {
      id: "bb-m11-revision-lt-next",
      type: "next_step",
      body: "Proceed only if you would defend these claims aloud to a skeptical peer.",
    }
  ],

  "career-launch::cl-m01-practice": [
    {
      id: "cl-m01-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "cl-m01-practice-lt-task",
      type: "practice_task",
      title: "Practice · Career direction without magical thinking",
      bullets: [
        "1. Constraint inventory with mitigation or acceptance notes.",
        "2. Hypothesis list: role families + signals that would validate/pivot each.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "cl-m01-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Direction hypothesis sheet",
    },
    {
      id: "cl-m01-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "career-launch::cl-m01-revision": [
    {
      id: "cl-m01-revision-lt-intro",
      type: "intro",
      eyebrow: "Revision gate",
      title: "Tighten · Career direction without magical thinking",
      body: "Compress misunderstandings before they compound. Prefer precise claims, cited limits, and falsifiers—no glossary theater.",
    },
    {
      id: "cl-m01-revision-lt-recap",
      type: "recap",
      title: "Compress to checks",
      bullets: [
        "Separate identity romance from near-term role hypotheses.",
        "Document immovable constraints (visa, geography, caregiving, compensation floor).",
        "Pick exploration vs. exploitation ratio for this quarter.",
      ],
    },
    {
      id: "cl-m01-revision-lt-task",
      type: "practice_task",
      title: "Structured gate",
      prompt: "In 6–10 sentences: (1) what you believe now, (2) what would falsify it, (3) what artifact proves you applied this module.",
    },
    {
      id: "cl-m01-revision-lt-next",
      type: "next_step",
      body: "Proceed only if you would defend these claims aloud to a skeptical peer.",
    }
  ],

  "career-launch::cl-m02-lesson": [
    {
      id: "cl-m02-lesson-lt-intro",
      type: "intro",
      eyebrow: "Grounding",
      title: "Skills and value mapping with evidence",
      body: "Activity lists are not credentials. The difference between a weak job-seeker story and a strong one is not experience — it’s the discipline of translating what you did into what changed because of it. This module builds the evidence inventory that every subsequent career document draws from.",
    },
    {
      id: "cl-m02-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "Outcomes, not activities",
      body: "The translation test: can you replace every adjective and generic verb in your experience record with a number, a named deliverable, or a before/after comparison? If not, you have an activity list, not an evidence bank. Metrics don’t have to be large — they have to be real and traceable to your specific contribution.",
    },
    {
      id: "cl-m02-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The PM who couldn’t prove the launch",
      body: "A product manager lists ‘led cross-functional launch of 3 products’ on their résumé. In interview: ‘What was the business impact?’ Answer: ‘It was successful.’ Follow-up: ‘Who validated that success and how?’ No answer. The issue: outcomes weren’t tracked during the work, so they can’t be cited during the search.",
      example: "Build your evidence bank during the work, not at application time. One sentence per project: what changed, what you specifically did, how it was measured, who can verify it.",
    },
    {
      id: "cl-m02-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might generic language hide weak evidence in your portfolio or story? Name one fix.",
    },
    {
      id: "cl-m02-lesson-lt-next",
      type: "next_step",
      body: "Next: cl-m03 — your evidence bank is the raw material for résumé bullets. Without it, you’re writing argumentless autobiography.",
    }
  ],

  "career-launch::cl-m02-practice": [
    {
      id: "cl-m02-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "cl-m02-practice-lt-task",
      type: "practice_task",
      title: "Practice · Skills and value mapping with evidence",
      bullets: [
        "1. Evidence spreadsheet: project, outcome, metric/artifact, gap.",
        "2. Gap-closure plan for top two missing proofs with deadline.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "cl-m02-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Evidence bank v1",
    },
    {
      id: "cl-m02-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "career-launch::cl-m03-lesson": [
    {
      id: "cl-m03-lesson-lt-intro",
      type: "intro",
      eyebrow: "Grounding",
      title: "Résumé and CV as argument, not autobiography",
      body: "A résumé is not a historical record — it’s a selective argument for why this person should get this interview. Every bullet is either a claim that supports the argument or noise that dilutes it. This module teaches the discipline of constructing bullets as evidence items, not biography.",
    },
    {
      id: "cl-m03-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "The bullet as a claim unit",
      body: "A strong bullet has three parts: what you did (action), what it produced (outcome), and at what scale or context (scope). Weak bullets have action only: ‘managed stakeholder communications.’ Strong bullets have all three: ‘reduced escalations 35% in Q2 by building a structured status template used by 4 product teams.’ The difference is verifiability.",
    },
    {
      id: "cl-m03-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "Eight bullets, before and after",
      body: "Before: ‘Responsible for managing the company’s social media presence and growing the audience.’ After: ‘Grew LinkedIn following from 2,400 to 8,100 over 9 months (organic only) by shifting to practitioner Q&A format; drove 3 inbound partnership inquiries.’ Same job. Radically different credibility signal.",
      example: "For each bullet: does it name the scale, the method, and the outcome? If you can remove two of those three without losing meaning, the bullet hasn’t earned its space.",
    },
    {
      id: "cl-m03-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might generic language hide weak evidence in your portfolio or story? Name one fix.",
    },
    {
      id: "cl-m03-lesson-lt-next",
      type: "next_step",
      body: "Next: cl-m04 — your revised bullets become the evidence bank for your public narrative. What you write on the résumé must align with what lives on your profile.",
    }
  ],

  "career-launch::cl-m03-practice": [
    {
      id: "cl-m03-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "cl-m03-practice-lt-task",
      type: "practice_task",
      title: "Practice · Résumé and CV as argument, not autobiography",
      bullets: [
        "1. Rewrite eight bullets into outcome + metric + scope pattern.",
        "2. Honesty audit: flag stretch phrases; revise or delete.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "cl-m03-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Résumé/CV rewrite draft",
    },
    {
      id: "cl-m03-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "career-launch::cl-m03-recap": [
    {
      id: "cl-m03-recap-lt-intro",
      type: "intro",
      eyebrow: "Consolidation",
      title: "Consolidate · Résumé and CV as argument, not autobiography",
      body: "Build a recap artifact you will reopen: keywords, failure modes, reuse rules—written for future-you under stress.",
    },
    {
      id: "cl-m03-recap-lt-keys",
      type: "key_points",
      title: "Carry-forward pack",
      bullets: [
        "Keyword claim: Align bullets to posted criteria + transferable framing.",
        "Failure mode to watch: Line-level argument for ATS and humans—tie each bullet to outcomes, scope, and proof so credibility holds without inflat…",
        "Reuse rule: when to apply vs rethink this module",
      ],
    },
    {
      id: "cl-m03-recap-lt-reflect",
      type: "reflection_prompt",
      title: "Calibration",
      prompt: "What would convince you this module did not stick—what signal would you look for in your next deliverable?",
    },
    {
      id: "cl-m03-recap-lt-next",
      type: "next_step",
      body: "Archive the recap where your future self will actually find it.",
    }
  ],

  "career-launch::cl-m04-lesson": [
    {
      id: "cl-m04-lesson-lt-intro",
      type: "intro",
      eyebrow: "Applied reasoning",
      title: "Profiles and portfolios: coherent public narrative",
      body: "A LinkedIn profile that contradicts your résumé, a portfolio that showcases irrelevant work, or a headline that reads like a keyword list — these signal someone who hasn’t decided what they’re arguing. Public presence is a positioning document, and it has to be internally consistent.",
    },
    {
      id: "cl-m04-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "Coherence is the test, not completeness",
      body: "The question a recruiter asks when reviewing profiles: ‘Does this person have a consistent point of view about the kind of work they do and are serious about?’ Breadth signals confusion if it isn’t organized around a visible theme. Narrow and specific is more persuasive than broad and generic.",
    },
    {
      id: "cl-m04-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The headline that described the category, not the person",
      body: "A senior analyst’s LinkedIn headline: ‘Data Professional | Analytics | Business Intelligence | SQL | Tableau | Python.’ Impression: technical background, no positioning. Revised: ‘Senior analyst helping mid-market ops teams find the revenue leaks in their pipeline data.’ Same person. Immediately different signal to a hiring manager with that problem.",
      example: "Test your headline: if it could belong to 500 other people with your job title, it isn’t a headline yet. Name the specific kind of work and the specific kind of problem you solve.",
    },
    {
      id: "cl-m04-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might generic language hide weak evidence in your portfolio or story? Name one fix.",
    },
    {
      id: "cl-m04-lesson-lt-next",
      type: "next_step",
      body: "Next: cl-m06 — your public narrative anchors every networking conversation. The profile is what people check before they decide whether to take the meeting.",
    }
  ],

  "career-launch::cl-m04-practice": [
    {
      id: "cl-m04-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "cl-m04-practice-lt-task",
      type: "practice_task",
      title: "Practice · Profiles and portfolios: coherent public narrative",
      bullets: [
        "1. Three headline/subtitle variants tested against target roles.",
        "2. Featured-work rationale doc: why these pieces, what each proves.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "cl-m04-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Public narrative draft",
    },
    {
      id: "cl-m04-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "career-launch::cl-m06-lesson": [
    {
      id: "cl-m06-lesson-lt-intro",
      type: "intro",
      eyebrow: "Applied reasoning",
      title: "Networking that isn't transactional theater",
      body: "Most networking fails because it asks before it gives and generalizes before it specifies. ‘I’d love to connect and learn about your experience’ is not a compelling reason for a busy person to spend 30 minutes with you. This module builds the prep discipline that makes conversations worth having.",
    },
    {
      id: "cl-m06-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "Specificity is what makes outreach answerable",
      body: "The discipline: before any networking conversation, name one thing specific to that person’s recent work that you’ve actually read or observed. Then name one concrete question you want to understand that you cannot learn from a search. Generic outreach fails not because people are unkind — it fails because it requires the recipient to do the work of figuring out what you want.",
    },
    {
      id: "cl-m06-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The outreach message that got a reply",
      body: "Weak: ‘Hi [Name], I’m transitioning into product management and would love to pick your brain about the field.’ Strong: ‘Hi [Name], I read your post about discovery when customers can’t articulate the problem — directly relevant to a project I’m working on. Would you have 20 minutes to discuss how you decide when qualitative signals are enough to act on?’",
      example: "Prep checklist: (1) read one real thing this person published, (2) name the specific question only they can answer, (3) make your ask time-bounded and concrete.",
    },
    {
      id: "cl-m06-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might generic language hide weak evidence in your portfolio or story? Name one fix.",
    },
    {
      id: "cl-m06-lesson-lt-next",
      type: "next_step",
      body: "Next: cl-m08 — networking conversations often include case-style and scenario questions. The same analytical discipline you’re building for conversations applies to interviews.",
    }
  ],

  "career-launch::cl-m07-practice": [
    {
      id: "cl-m07-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "cl-m07-practice-lt-task",
      type: "practice_task",
      title: "Practice · Interviews: behavioral depth and technical storytelling",
      bullets: [
        "1. Record mock interview; score against rubric (clarity, evidence, reflection).",
        "2. Employer question bank customized to two target companies.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "cl-m07-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "STAR bank + mock critique",
    },
    {
      id: "cl-m07-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "career-launch::cl-m08-lesson": [
    {
      id: "cl-m08-lesson-lt-intro",
      type: "intro",
      eyebrow: "Professional judgment",
      title: "Case-style and scenario thinking",
      body: "The mistake most candidates make in case interviews is solving before framing. Jumping to a solution before naming the problem structure signals a thinker who is fast and unreliable. This module trains the discipline of slowing down to frame explicitly — which is the skill interviewers are actually testing.",
    },
    {
      id: "cl-m08-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "Frame before solve, always",
      body: "Case interviews test judgment, not cleverness. The tell for a weak attempt: the candidate jumps immediately to ‘here are three possible reasons’ without naming what kind of problem this is and what information would matter most. The tell for a strong attempt: the candidate says ‘before I generate hypotheses, let me clarify what kind of problem we’re solving.’",
    },
    {
      id: "cl-m08-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The candidate who solved the wrong problem",
      body: "Interviewer: ‘Our European division missed revenue targets by 20% last quarter. What would you investigate?’ Weak: immediately names three hypothesis categories. Strong: ‘Before hypotheses — is this a one-time miss or a trend? Is Europe underperforming relative to other regions or its own prior period? The answer changes which structure I’d use.’",
      example: "Every case response starts with one clarifying question about what kind of problem this is. Not to delay — to avoid solving the wrong problem efficiently.",
    },
    {
      id: "cl-m08-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might generic language hide weak evidence in your portfolio or story? Name one fix.",
    },
    {
      id: "cl-m08-lesson-lt-next",
      type: "next_step",
      body: "Next: cl-m09 — scenario thinking applies the moment you start a new role. Your first 90 days require the same hypothesis-first, evidence-based framing you’re building for interviews.",
    }
  ],

  "career-launch::cl-m08-practice": [
    {
      id: "cl-m08-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "cl-m08-practice-lt-task",
      type: "practice_task",
      title: "Practice · Case-style and scenario thinking",
      bullets: [
        "1. Timed scenario outlines with explicit assumptions column.",
        "2. Peer critique focused on logic gaps, not polish.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "cl-m08-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Scenario response templates",
    },
    {
      id: "cl-m08-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "career-launch::cl-m09-lesson": [
    {
      id: "cl-m09-lesson-lt-intro",
      type: "intro",
      eyebrow: "Professional judgment",
      title: "Workplace readiness: norms, async, conflict hygiene",
      body: "The first 90 days of a role determine how a career at that company develops. Most people underinvest in understanding norms — how decisions get made, how visibility works, what reliability signals matter — and overinvest in delivering output early. Both matter; the norms map is the one that’s harder to build under pressure.",
    },
    {
      id: "cl-m09-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "Reliability signals are behavioral, not attitudinal",
      body: "Saying ‘I’m reliable’ is not a reliability signal. Behavioral signals are: committing with a specific scope and deadline, updating stakeholders before they ask, and closing loops explicitly. In async teams, the absence of an update is interpreted as a risk signal. Writing down your working agreements protects you from having reliability judged on unspoken assumptions.",
    },
    {
      id: "cl-m09-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The first hire who missed their own norms",
      body: "A new hire joins a distributed team. In week 2, they miss a Friday handoff without warning. In week 3, they miss a standup update. By week 6, the manager describes them as ‘hard to rely on.’ The new hire was working hard and producing good output. The failure: no explicit working agreements during onboarding. The manager never got updates; the hire assumed silence meant things were fine.",
      example: "First 90 days operating doc: (1) what I’ve committed to, by when, (2) how I’ll communicate if something changes, (3) the three people whose trust I need to build this quarter and what they care about.",
    },
    {
      id: "cl-m09-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might generic language hide weak evidence in your portfolio or story? Name one fix.",
    },
    {
      id: "cl-m09-lesson-lt-next",
      type: "next_step",
      body: "Next: cl-m10 — once you’ve proven yourself in a role, the negotiation leverage shifts. The professional reputation you build in the first 90 days directly affects future comp and title conversations.",
    }
  ],

  "career-launch::cl-m09-practice": [
    {
      id: "cl-m09-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "cl-m09-practice-lt-task",
      type: "practice_task",
      title: "Practice · Workplace readiness: norms, async, conflict hygiene",
      bullets: [
        "1. First 90 days plan with stakeholder map.",
        "2. Conflict rehearsal scripts for credit, priority, and feedback clashes.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "cl-m09-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Onboarding operating doc",
    },
    {
      id: "cl-m09-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "career-launch::cl-m10-lesson": [
    {
      id: "cl-m10-lesson-lt-intro",
      type: "intro",
      eyebrow: "Integration",
      title: "Offers, negotiation framing, and decision quality",
      body: "Negotiation fails when it starts too late — at the offer stage, after leverage has already shifted. The preparation that protects you is done before the conversation: knowing your BATNA, knowing which offer components are actually negotiable, and naming your minimum acceptable outcome before you’re in the room.",
    },
    {
      id: "cl-m10-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "An offer is a package, not a salary",
      body: "Components that are often negotiable and commonly overlooked: signing bonus (useful when leaving unvested equity), remote flexibility, start date, title, performance review timing, professional development budget. The discipline: before receiving any offer, write your ideal outcome, your minimum acceptable outcome, and what you’d trade against what.",
    },
    {
      id: "cl-m10-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The negotiation that moved only one number",
      body: "A candidate receives an offer, says ‘I was hoping for more,’ and accepts a $3k raise. What they didn’t name: their market rate range from comparable offers, the components they’d trade, their walk-away point. The recruiter matched a number. What the candidate could have gotten: $8k raise + remote flexibility + earlier performance review. They didn’t ask because they had no prepared position.",
      example: "Before any negotiation: write your BATNA (what happens if this falls through), your target outcome (optimistic but justified), and your walk-away floor. If you can’t write down the walk-away floor, you’re not ready to negotiate.",
    },
    {
      id: "cl-m10-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might generic language hide weak evidence in your portfolio or story? Name one fix.",
    },
    {
      id: "cl-m10-lesson-lt-next",
      type: "next_step",
      body: "Next: cl-m11 — your negotiation and decision frameworks are the final piece of the capstone. Your full pack should be internally consistent from evidence bank to decision quality.",
    }
  ],

  "career-launch::cl-m10-practice": [
    {
      id: "cl-m10-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "cl-m10-practice-lt-task",
      type: "practice_task",
      title: "Practice · Offers, negotiation framing, and decision quality",
      bullets: [
        "1. Negotiation worksheet with walk-away + package trades.",
        "2. Decision matrix for competing offers including non-monetary factors.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "cl-m10-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Negotiation + decision packet",
    },
    {
      id: "cl-m10-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "career-launch::cl-m11-lesson": [
    {
      id: "cl-m11-lesson-lt-intro",
      type: "intro",
      eyebrow: "Integration",
      title: "Long-term growth and capstone readiness pack",
      body: "The capstone is not the end of a process — it’s a reviewable record of your current positioning, evidence, and strategy. The question it answers: if a trusted senior advisor reviewed this pack today, would they understand where you’re going and why the argument holds? That’s the test the capstone must pass.",
    },
    {
      id: "cl-m11-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "A capstone pack is a positioning argument, not a portfolio dump",
      body: "What makes a capstone pack strong: each artifact traces back to a specific module decision, a connecting narrative links them, and the gaps are honestly documented. What makes it weak: artifacts that exist for completeness rather than argument, no narrative thread, and claims that contradict each other across documents.",
    },
    {
      id: "cl-m11-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The candidate whose pack told two different stories",
      body: "A career-changer’s evidence bank emphasizes analytical skills; cover letters emphasize relationship-building; LinkedIn headline mentions neither. A mock reviewer asks: ‘What do you want to be known for?’ The candidate contradicts one document in answering. Fix: audit the pack for the single thread that connects everything, then make every document support that thread.",
      example: "Consistency audit: read your headline, first résumé bullet, LinkedIn summary, and target role description side by side. Name the single argument that connects all four. If there isn’t one, that’s your editorial priority before submission.",
    },
    {
      id: "cl-m11-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might generic language hide weak evidence in your portfolio or story? Name one fix.",
    },
    {
      id: "cl-m11-lesson-lt-next",
      type: "next_step",
      body: "This is the career-launch capstone. Bring your pack to a trusted reviewer with this question ready: ‘What is the weakest claim in this pack, and what would it take to support it?’ Know your answer.",
    }
  ],

  "career-launch::cl-m11-practice": [
    {
      id: "cl-m11-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "cl-m11-practice-lt-task",
      type: "practice_task",
      title: "Practice · Long-term growth and capstone readiness pack",
      bullets: [
        "1. Capstone assembly checklist walkthrough.",
        "2. Peer review swap with rubric + revision log.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "cl-m11-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Career readiness pack v1",
    },
    {
      id: "cl-m11-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "career-launch::cl-m11-recap": [
    {
      id: "cl-m11-recap-lt-intro",
      type: "intro",
      eyebrow: "Consolidation",
      title: "Consolidate · Long-term growth and capstone readiness pack",
      body: "Build a recap artifact you will reopen: keywords, failure modes, reuse rules—written for future-you under stress.",
    },
    {
      id: "cl-m11-recap-lt-keys",
      type: "key_points",
      title: "Carry-forward pack",
      bullets: [
        "Keyword claim: Integrate artifacts into coherent narrative + evidence trail.",
        "Failure mode to watch: Integrate proof, targeting, outreach, interviews, and negotiation artifacts into one reviewer-ready folder—with traceabi…",
        "Reuse rule: when to apply vs rethink this module",
      ],
    },
    {
      id: "cl-m11-recap-lt-reflect",
      type: "reflection_prompt",
      title: "Calibration",
      prompt: "What would convince you this module did not stick—what signal would you look for in your next deliverable?",
    },
    {
      id: "cl-m11-recap-lt-next",
      type: "next_step",
      body: "Archive the recap where your future self will actually find it.",
    }
  ],

  "career-launch::cl-m11-revision": [
    {
      id: "cl-m11-revision-lt-intro",
      type: "intro",
      eyebrow: "Revision gate",
      title: "Tighten · Long-term growth and capstone readiness pack",
      body: "Compress misunderstandings before they compound. Prefer precise claims, cited limits, and falsifiers—no glossary theater.",
    },
    {
      id: "cl-m11-revision-lt-recap",
      type: "recap",
      title: "Compress to checks",
      bullets: [
        "Integrate artifacts into coherent narrative + evidence trail.",
        "Schedule quarterly refresh + proof backlog.",
        "Define next experiments after capstone.",
      ],
    },
    {
      id: "cl-m11-revision-lt-task",
      type: "practice_task",
      title: "Structured gate",
      prompt: "In 6–10 sentences: (1) what you believe now, (2) what would falsify it, (3) what artifact proves you applied this module.",
    },
    {
      id: "cl-m11-revision-lt-next",
      type: "next_step",
      body: "Proceed only if you would defend these claims aloud to a skeptical peer.",
    }
  ],

  "clear-communication::cc-m01-practice": [
    {
      id: "cc-m01-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "cc-m01-practice-lt-task",
      type: "practice_task",
      title: "Practice · Thinking in audiences, intents, and constraints",
      bullets: [
        "1. Reverse-outline an external memo; mark buried ledes + missing asks.",
        "2. Ten intent one-liners on real situations you face this month.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "cc-m01-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Audience–intent worksheet",
    },
    {
      id: "cc-m01-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "clear-communication::cc-m01-revision": [
    {
      id: "cc-m01-revision-lt-intro",
      type: "intro",
      eyebrow: "Revision gate",
      title: "Tighten · Thinking in audiences, intents, and constraints",
      body: "Compress misunderstandings before they compound. Prefer precise claims, cited limits, and falsifiers—no glossary theater.",
    },
    {
      id: "cc-m01-revision-lt-recap",
      type: "recap",
      title: "Compress to checks",
      bullets: [
        "Name reader, decision, success signal, and time budget.",
        "Calibrate depth to stakes—no accidental essays in inboxes.",
        "Surface constraints (legal, political, operational) up front.",
      ],
    },
    {
      id: "cc-m01-revision-lt-task",
      type: "practice_task",
      title: "Structured gate",
      prompt: "In 6–10 sentences: (1) what you believe now, (2) what would falsify it, (3) what artifact proves you applied this module.",
    },
    {
      id: "cc-m01-revision-lt-next",
      type: "next_step",
      body: "Proceed only if you would defend these claims aloud to a skeptical peer.",
    }
  ],

  "clear-communication::cc-m02-lesson": [
    {
      id: "cc-m02-lesson-lt-intro",
      type: "intro",
      eyebrow: "Grounding",
      title: "Structure before polish: outlines that survive contact",
      body: "The most common writing failure in professional environments is not poor prose — it’s poor structure. A beautifully written document with a buried argument or no clear ask will fail. This module builds the discipline of testing structure before investing in polish.",
    },
    {
      id: "cc-m02-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "An outline is a hypothesis about sequence, not a plan",
      body: "The test for a strong outline: can a colleague who doesn’t share your context read it and predict what each section will argue? If not, the structure needs work before any prose is written. Write section headings as claims, not topic labels. ‘Q3 Performance’ is a label. ‘Q3 declined in three segments but recovered in the fourth due to price elasticity changes’ is a claim. Claims-based outlines are reviewable before a word of prose is written.",
    },
    {
      id: "cc-m02-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The report that started with writing",
      body: "A project lead drafts a 12-page stakeholder report. In edit: the executive summary references findings from section 7, two sections share the same recommendation, and the conclusion introduces new evidence. The document required a structural rebuild after 8 hours of writing. The same fix at the outline stage would have taken 30 minutes.",
      example: "Before writing any prose, test your outline: give it to a colleague and ask what the document will recommend. If they can’t answer from the headings, the structure isn’t ready.",
    },
    {
      id: "cc-m02-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might generic language hide weak evidence in your portfolio or story? Name one fix.",
    },
    {
      id: "cc-m02-lesson-lt-next",
      type: "next_step",
      body: "Next: cc-m03 — a tested outline is where prose begins. The language discipline in cc-m03 operates sentence by sentence, but structure has to hold first.",
    }
  ],

  "clear-communication::cc-m02-practice": [
    {
      id: "cc-m02-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "cc-m02-practice-lt-task",
      type: "practice_task",
      title: "Practice · Structure before polish: outlines that survive contact",
      bullets: [
        "1. Outline swap + confusion hunt with a peer.",
        "2. Rewrite the same opening in three structural frames; pick winner with rationale.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "cc-m02-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Tested outline",
    },
    {
      id: "cc-m02-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "clear-communication::cc-m03-lesson": [
    {
      id: "cc-m03-lesson-lt-intro",
      type: "intro",
      eyebrow: "Grounding",
      title: "Plain language without dumbing down",
      body: "Professional prose is not dumbed down when it removes jargon — it becomes clearer. The confusion is that abstraction feels sophisticated when you’re inside a domain. Readers outside that domain experience it as obstruction. Plain language preserves precision for terms that earn their complexity and removes everything that doesn’t.",
    },
    {
      id: "cc-m03-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "Nominalizations are the most common source of obscurity",
      body: "Nominalization: turning a verb into a noun (‘make a decision’ instead of ‘decide’). The signature of bloated professional prose: sentences full of nouns doing nothing, with actors and actions buried. Test: for every noun ending in -tion, -ment, -ance, -ency in your draft, ask whether the verb form is clearer. In most cases, it is.",
    },
    {
      id: "cc-m03-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "Two versions of the same sentence",
      body: "Original: ‘The implementation of the recommendation resulted in a significant reduction in the occurrence of production incidents.’ Plain: ‘Following the recommendation, production incidents dropped 40%.’ Same content. The plain version names the outcome directly. The original buries it in four nouns and an adverb.",
      example: "Edit protocol: for every sentence longer than 25 words, find the actor and the action. If either is buried in a noun phrase, restructure before polishing.",
    },
    {
      id: "cc-m03-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might generic language hide weak evidence in your portfolio or story? Name one fix.",
    },
    {
      id: "cc-m03-lesson-lt-next",
      type: "next_step",
      body: "Next: cc-m04 — plain language and structure apply directly to async writing. The email that requires a clarifying reply is a structural failure dressed as a communication preference.",
    }
  ],

  "clear-communication::cc-m03-practice": [
    {
      id: "cc-m03-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "cc-m03-practice-lt-task",
      type: "practice_task",
      title: "Practice · Plain language without dumbing down",
      bullets: [
        "1. Jargon audit on your own writing sample; score each term: keep vs. kill.",
        "2. Constraint game: rewrite dense paragraph losing no legal/technical meaning.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "cc-m03-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Plain-language pass + term bank",
    },
    {
      id: "cc-m03-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "clear-communication::cc-m03-recap": [
    {
      id: "cc-m03-recap-lt-intro",
      type: "intro",
      eyebrow: "Consolidation",
      title: "Consolidate · Plain language without dumbing down",
      body: "Build a recap artifact you will reopen: keywords, failure modes, reuse rules—written for future-you under stress.",
    },
    {
      id: "cc-m03-recap-lt-keys",
      type: "key_points",
      title: "Carry-forward pack",
      bullets: [
        "Keyword claim: Rewrite abstract nouns into actors + verbs where possible.",
        "Failure mode to watch: Cut nominalizations and zombie nouns—keep precision for terms that earn their syllables.…",
        "Reuse rule: when to apply vs rethink this module",
      ],
    },
    {
      id: "cc-m03-recap-lt-reflect",
      type: "reflection_prompt",
      title: "Calibration",
      prompt: "What would convince you this module did not stick—what signal would you look for in your next deliverable?",
    },
    {
      id: "cc-m03-recap-lt-next",
      type: "next_step",
      body: "Archive the recap where your future self will actually find it.",
    }
  ],

  "clear-communication::cc-m04-lesson": [
    {
      id: "cc-m04-lesson-lt-intro",
      type: "intro",
      eyebrow: "Applied reasoning",
      title: "Professional writing: emails, updates, and async hygiene",
      body: "Poorly written async communication creates coordination debt. Every ambiguous update, every email that requires a clarifying reply, and every update that doesn’t specify who owns the next action costs the reader time and creates delay. This module builds the discipline of writing async artifacts that can stand alone without a follow-up conversation.",
    },
    {
      id: "cc-m04-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "An update that doesn’t force a decision or a deferral isn’t an update",
      body: "The test for a usable async update: after reading it, does the recipient know (1) what changed, (2) what decision is required from them, (3) what you will do next and by when? If none of those are explicit, the update will generate a clarifying reply — and the async format has failed. Format for the reader’s task, not the writer’s comfort.",
    },
    {
      id: "cc-m04-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The status email that created a meeting",
      body: "Sent: ‘Just wanted to update everyone on the project. We’ve been making progress and things look good for the deadline. Let me know if you have questions.’ Result: a 45-minute meeting to clarify scope. What was needed: ‘On track for Nov 15. Risk: vendor response pending by Nov 3. No action needed unless vendor doesn’t respond by EOD Nov 3 — I’ll flag if that changes.’",
      example: "Async update structure: (1) status in one sentence, (2) risks and dependencies with dates, (3) specific asks with decision deadline, (4) your next action and timeline.",
    },
    {
      id: "cc-m04-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might generic language hide weak evidence in your portfolio or story? Name one fix.",
    },
    {
      id: "cc-m04-lesson-lt-next",
      type: "next_step",
      body: "Next: cc-m06 — email and updates are single-author artifacts. Reports and memos require you to manage evidence lanes across a document with multiple decision-makers reading different sections.",
    }
  ],

  "clear-communication::cc-m04-practice": [
    {
      id: "cc-m04-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "cc-m04-practice-lt-task",
      type: "practice_task",
      title: "Practice · Professional writing: emails, updates, and async hygiene",
      bullets: [
        "1. Rewrite three messy threads into crisp async packets.",
        "2. Draft update template pack (daily/weekly/blocker).",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "cc-m04-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Async update template suite",
    },
    {
      id: "cc-m04-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "clear-communication::cc-m06-lesson": [
    {
      id: "cc-m06-lesson-lt-intro",
      type: "intro",
      eyebrow: "Applied reasoning",
      title: "Reports and memos: recommendations with evidence lanes",
      body: "The failure mode in professional reports is not lack of data — it’s the mixing of facts, interpretations, and recommendations in a way that prevents a skeptical reader from distinguishing what was observed from what was concluded. Evidence lanes make the recommendation challengeable by the right people.",
    },
    {
      id: "cc-m06-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "Three lanes: fact, interpretation, recommendation",
      body: "Fact lane: what you observed or measured, traceable to a source. Interpretation lane: what you believe the facts mean, including the assumptions that interpretation requires. Recommendation lane: what you’re proposing to do, tied explicitly to the interpretation. When these are mixed, a skeptical executive can’t challenge just the interpretation without rejecting the whole document.",
    },
    {
      id: "cc-m06-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The memo that couldn’t be challenged",
      body: "A strategy team presents a 20-page market entry memo. The CEO asks: ‘What assumptions did you make about competitor response?’ The team can’t answer cleanly because competitor response assumptions are embedded across three different sections without labels. Challenging one requires dismantling all three.",
      example: "Build an assumptions register before writing any recommendation. Each assumption: (1) what you believe, (2) why, (3) how you’d know it was wrong, (4) what changes in the recommendation if it is. This is your memo’s attack surface — making it explicit makes the memo stronger.",
    },
    {
      id: "cc-m06-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might generic language hide weak evidence in your portfolio or story? Name one fix.",
    },
    {
      id: "cc-m06-lesson-lt-next",
      type: "next_step",
      body: "Next: cc-m08 — the structure and evidence discipline you’ve built applies directly to presentations. The question for cc-m08: can your argument survive without slides?",
    }
  ],

  "clear-communication::cc-m07-practice": [
    {
      id: "cc-m07-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "cc-m07-practice-lt-task",
      type: "practice_task",
      title: "Practice · Persuasion with integrity: stakes, ethics, and proof",
      bullets: [
        "1. Argument map including strongest counter-case.",
        "2. Rewrite pushy passage with ethical markers + proof hooks.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "cc-m07-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Ethical argument map",
    },
    {
      id: "cc-m07-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "clear-communication::cc-m08-lesson": [
    {
      id: "cc-m08-lesson-lt-intro",
      type: "intro",
      eyebrow: "Professional judgment",
      title: "Speaking and presentation thinking (writing-first)",
      body: "Slides are not a structure — they’re a display format for a structure that should already exist. Building slides before writing the argument is the most common cause of presentations that look polished but don’t persuade. This module requires writing the talk track first, before any slide design begins.",
    },
    {
      id: "cc-m08-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "The argument lives in the talk track, not in the deck",
      body: "The discipline: before opening a slide tool, write a ten-point narrative. Each point is a sentence that advances the argument. When read in sequence, the narrative should stand alone as a persuasive document without visual support. If it doesn’t, slides won’t save it. If it does, slides become illustration — which is what they’re actually for.",
    },
    {
      id: "cc-m08-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The deck that survived without a projector",
      body: "A senior manager presents a recommendation to a distributed team. Halfway through, the screen share fails. The manager continues: ‘I’ll just walk you through the logic.’ Fifteen minutes later, the recommendation is approved. The deck was visual support for an argument written in full before any slides were built.",
      example: "Write the talk track as a document first. Show it to one person who wasn’t in the room. Ask: ‘What would you decide based on this?’ If they can answer, the argument is ready. If not, fix the talk track before touching the deck.",
    },
    {
      id: "cc-m08-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might generic language hide weak evidence in your portfolio or story? Name one fix.",
    },
    {
      id: "cc-m08-lesson-lt-next",
      type: "next_step",
      body: "Next: cc-m09 — now that you have complete documents, the editing discipline that separates good enough from reviewable applies. cc-m09 is about revision as a system, not a feeling.",
    }
  ],

  "clear-communication::cc-m08-practice": [
    {
      id: "cc-m08-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "cc-m08-practice-lt-task",
      type: "practice_task",
      title: "Practice · Speaking and presentation thinking (writing-first)",
      bullets: [
        "1. Ten-point storyline with decision ask—no slides yet.",
        "2. Q&A matrix: question → fact → stance → defer/research.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "cc-m08-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Talk track + Q&A matrix",
    },
    {
      id: "cc-m08-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "clear-communication::cc-m09-lesson": [
    {
      id: "cc-m09-lesson-lt-intro",
      type: "intro",
      eyebrow: "Professional judgment",
      title: "Editing and refinement: systems for revision",
      body: "Editing by feel produces inconsistent results. Professional editing requires a pass hierarchy — logic before clarity before polish — because polishing unclear sentences is wasted effort and polishing logically broken sections is rework. This module builds editing as a repeatable system, not a once-over.",
    },
    {
      id: "cc-m09-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "The pass hierarchy: logic → clarity → polish",
      body: "Pass 1 (Logic): does the structure hold and the argument flow from evidence to claim? Pass 2 (Clarity): are actors named, verbs active, sentences unambiguous to a reader without context? Pass 3 (Polish): sentence rhythm, word choice, consistency. Doing these in the wrong order is how writers spend hours on sentences in sections that will be restructured.",
    },
    {
      id: "cc-m09-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The editor who polished a broken argument",
      body: "A comms lead spends two hours polishing language in a 5-page proposal. In review: the recommendation in the executive summary doesn’t match the recommendation in the body. Two hours of word-level Polish work was done on a document with a Logic failure. The Logic check would have taken 15 minutes.",
      example: "Pass protocol: Logic check — can I trace the recommendation back to evidence in three steps? Clarity check — does each paragraph have one actor and one action? Polish check — is any sentence over 30 words without a reason?",
    },
    {
      id: "cc-m09-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might generic language hide weak evidence in your portfolio or story? Name one fix.",
    },
    {
      id: "cc-m09-lesson-lt-next",
      type: "next_step",
      body: "Next: cc-m10 — the editing system you’ve built is the final quality gate before capstone. Portfolio pieces should pass all three passes before submission.",
    }
  ],

  "clear-communication::cc-m09-practice": [
    {
      id: "cc-m09-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "cc-m09-practice-lt-task",
      type: "practice_task",
      title: "Practice · Editing and refinement: systems for revision",
      bullets: [
        "1. Two-pass edit with rubric + timed cool-off between passes.",
        "2. Structured feedback exchange with revision log.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "cc-m09-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Revision rubric + annotated draft",
    },
    {
      id: "cc-m09-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "clear-communication::cc-m10-lesson": [
    {
      id: "cc-m10-lesson-lt-intro",
      type: "intro",
      eyebrow: "Integration",
      title: "Portfolio assembly and capstone polish",
      body: "A portfolio is a curation argument, not a collection. Selecting work for a portfolio requires the same discipline as any positioning document: what is the argument these pieces make about what kind of communicator I am? Pieces that don’t support the argument are noise, regardless of how much effort went into producing them.",
    },
    {
      id: "cc-m10-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "Range and judgment, not volume",
      body: "The portfolio test: can a reader who doesn’t know you look at these three pieces and name a consistent point of view about the kind of communication work you do and are serious about? If the answer requires explanation, the selection needs editing. Five strongly chosen pieces are more persuasive than fourteen that cover everything.",
    },
    {
      id: "cc-m10-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The portfolio that showcased everything",
      body: "A communications professional assembles 14 writing samples spanning a corporate FAQ, social media thread, internal policy memo, client-facing proposal, and thought leadership article. A hiring manager reviews and asks: ‘What type of writing are you best at?’ The candidate takes four minutes to answer. Five strongly selected pieces would have answered that question before the manager asked.",
      example: "Selection rule: for each portfolio piece, write one sentence explaining what it proves about your judgment or range that no other piece already proves. If you can’t write that sentence, cut the piece.",
    },
    {
      id: "cc-m10-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might generic language hide weak evidence in your portfolio or story? Name one fix.",
    },
    {
      id: "cc-m10-lesson-lt-next",
      type: "next_step",
      body: "This is the clear-communication capstone. Bring your portfolio to peer review with this test ready: ‘What is this portfolio arguing about me?’ If the reviewer’s answer matches your intent, the curation is working.",
    }
  ],

  "clear-communication::cc-m10-practice": [
    {
      id: "cc-m10-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "cc-m10-practice-lt-task",
      type: "practice_task",
      title: "Practice · Portfolio assembly and capstone polish",
      bullets: [
        "1. 150-word portfolio narrative tying pieces together.",
        "2. Polish sprint with critique partner + changelog.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "cc-m10-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Portfolio v1",
    },
    {
      id: "cc-m10-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "clear-communication::cc-m10-recap": [
    {
      id: "cc-m10-recap-lt-intro",
      type: "intro",
      eyebrow: "Consolidation",
      title: "Consolidate · Portfolio assembly and capstone polish",
      body: "Build a recap artifact you will reopen: keywords, failure modes, reuse rules—written for future-you under stress.",
    },
    {
      id: "cc-m10-recap-lt-keys",
      type: "key_points",
      title: "Carry-forward pack",
      bullets: [
        "Keyword claim: Pick pieces that prove range + judgment, not volume.",
        "Failure mode to watch: Curate artifacts across stakes ladder—portfolio tells a coherent professional story.…",
        "Reuse rule: when to apply vs rethink this module",
      ],
    },
    {
      id: "cc-m10-recap-lt-reflect",
      type: "reflection_prompt",
      title: "Calibration",
      prompt: "What would convince you this module did not stick—what signal would you look for in your next deliverable?",
    },
    {
      id: "cc-m10-recap-lt-next",
      type: "next_step",
      body: "Archive the recap where your future self will actually find it.",
    }
  ],

  "clear-communication::cc-m10-revision": [
    {
      id: "cc-m10-revision-lt-intro",
      type: "intro",
      eyebrow: "Revision gate",
      title: "Tighten · Portfolio assembly and capstone polish",
      body: "Compress misunderstandings before they compound. Prefer precise claims, cited limits, and falsifiers—no glossary theater.",
    },
    {
      id: "cc-m10-revision-lt-recap",
      type: "recap",
      title: "Compress to checks",
      bullets: [
        "Pick pieces that prove range + judgment, not volume.",
        "Harmonize voice without sanding off personality.",
        "Publish editorial doctrine others could apply.",
      ],
    },
    {
      id: "cc-m10-revision-lt-task",
      type: "practice_task",
      title: "Structured gate",
      prompt: "In 6–10 sentences: (1) what you believe now, (2) what would falsify it, (3) what artifact proves you applied this module.",
    },
    {
      id: "cc-m10-revision-lt-next",
      type: "next_step",
      body: "Proceed only if you would defend these claims aloud to a skeptical peer.",
    }
  ],

  "data-and-decisions::dd-m01-practice": [
    {
      id: "dd-m01-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "dd-m01-practice-lt-task",
      type: "practice_task",
      title: "Practice · Data types, measurement, and honest skepticism",
      bullets: [
        "1. Annotate three real charts or KPI tiles: measured quantity, exclusions, wrong decision each could trigger.",
        "2. Rewrite one squishy KPI into an operational definition a teammate could audit.",
        "3. List three common vanity metrics in your domain and the healthier substitute signal for each.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "dd-m01-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Metric autopsy + vanity-metric substitution sheet",
    },
    {
      id: "dd-m01-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "data-and-decisions::dd-m01-revision": [
    {
      id: "dd-m01-revision-lt-intro",
      type: "intro",
      eyebrow: "Revision gate",
      title: "Tighten · Data types, measurement, and honest skepticism",
      body: "Compress misunderstandings before they compound. Prefer precise claims, cited limits, and falsifiers—no glossary theater.",
    },
    {
      id: "dd-m01-revision-lt-recap",
      type: "recap",
      title: "Compress to checks",
      bullets: [
        "Classify descriptive vs. inferential claims in everyday metrics and KPI exports.",
        "Spot misleading axes, truncated scales, cherry-picked windows, and vanity dashboard tiles.",
        "Ask “what is missing from this dataset?” and “who would game this metric?” before acting.",
      ],
    },
    {
      id: "dd-m01-revision-lt-task",
      type: "practice_task",
      title: "Structured gate",
      prompt: "In 6–10 sentences: (1) what you believe now, (2) what would falsify it, (3) what artifact proves you applied this module.",
    },
    {
      id: "dd-m01-revision-lt-next",
      type: "next_step",
      body: "Proceed only if you would defend these claims aloud to a skeptical peer.",
    }
  ],

  "data-and-decisions::dd-m02-lesson": [
    {
      id: "dd-m02-lesson-lt-intro",
      type: "intro",
      eyebrow: "Grounding",
      title: "KPI selection, metric hierarchies, and performance questions",
      body: "Most KPI problems are not measurement problems — they’re definition problems. When two teams use the same metric name to mean different things, every disagreement about performance is actually a disagreement about definition. This module starts from the decision that needs to be made and derives the metric tree from there.",
    },
    {
      id: "dd-m02-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "Start from the decision, not the dashboard",
      body: "The diagnostic question is not ‘what should we measure?’ — it’s ‘what decision needs to be made, and what information would change that decision?’ A KPI tree derived from a decision has three levels: primary metric (goal on track?), driver metrics (why is it moving?), diagnostic metrics (where is the source?). A metric not connected to a decision is decoration.",
    },
    {
      id: "dd-m02-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The KPI that meant two things",
      body: "A growth team and a retention team both report ‘active users.’ Growth counts any login in the past 30 days. Retention counts users who completed a core action in the past 7 days. In a cross-functional review: one team reports MAU growth, the other reports MAU decline. Same metric name, different definitions, same period. The disagreement was not about performance.",
      example: "Operational definition requirement: for any KPI used in cross-functional reporting, write the numerator, denominator, inclusion and exclusion rules, and data source. If two people can compute different numbers from the same definition, the definition isn’t finished.",
    },
    {
      id: "dd-m02-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might a spreadsheet or headline tempt you to skip downside or definitions? Name one guardrail.",
    },
    {
      id: "dd-m02-lesson-lt-next",
      type: "next_step",
      body: "Next: dd-m03 — your KPI tree is useless if the dashboard displaying it makes misreading the data easier than reading it correctly. Visualization choices are part of the measurement argument.",
    }
  ],

  "data-and-decisions::dd-m02-practice": [
    {
      id: "dd-m02-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "dd-m02-practice-lt-task",
      type: "practice_task",
      title: "Practice · KPI selection, metric hierarchies, and performance questions",
      bullets: [
        "1. For one strategic goal, sketch a three-level KPI tree with definitions + data source class (raw, modeled, survey).",
        "2. Pick one recurring decision; list three candidate metrics with gaming risks + mitigations.",
        "3. Peer critique a dashboard screenshot: name the implicit performance question and what is still ambiguous.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "dd-m02-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "KPI tree + metric definitions sheet",
    },
    {
      id: "dd-m02-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "data-and-decisions::dd-m03-lesson": [
    {
      id: "dd-m03-lesson-lt-intro",
      type: "intro",
      eyebrow: "Grounding",
      title: "Dashboards, visualization as argument—and misread risks",
      body: "Every design choice in a data visualization is an editorial choice. The y-axis start, the time window, the cohort definition, the smoothing method — each one shapes what a decision-maker concludes. The discipline is treating these choices as accountable claims, not defaults.",
    },
    {
      id: "dd-m03-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "A dashboard’s filters and scope are part of its argument",
      body: "The misread risk is not in the chart type — it’s in the invisible defaults: the time window starting after the bad quarter, the y-axis that makes a 5% change look like a cliff, the cohort definition silently excluding churned users. A dashboard showing correct numbers but concealing context is not an honest dashboard. Name the defaults explicitly.",
    },
    {
      id: "dd-m03-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The retention chart that concealed the problem",
      body: "A product dashboard shows 90-day retention at 72%, trending up. The exec team is pleased. What the chart doesn’t show: the chart silently excludes users who churned in their first 7 days, the 7-day churn rate doubled in the same period, and the 90-day cohort window is shortening as recent cohorts don’t yet have 90 days of data.",
      example: "For any retention or engagement metric: write the definition in full, including what’s excluded and why. If the definition changes between time periods, that change is editorial — it must be labeled.",
    },
    {
      id: "dd-m03-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might a spreadsheet or headline tempt you to skip downside or definitions? Name one guardrail.",
    },
    {
      id: "dd-m03-lesson-lt-next",
      type: "next_step",
      body: "Next: dd-m04 — visualization design determines what comparisons readers make. Baselines and segmentation discipline picks up where dashboard design leaves off: what are you actually comparing this number to?",
    }
  ],

  "data-and-decisions::dd-m03-practice": [
    {
      id: "dd-m03-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "dd-m03-practice-lt-task",
      type: "practice_task",
      title: "Practice · Dashboards, visualization as argument—and misread risks",
      bullets: [
        "1. Critique a real or sample business dashboard: list filters applied, cohort definition, and three ways a busy reader could misinterpret it.",
        "2. Redesign one misleading executive chart; document three intentional design choices + one guardrail annotation.",
        "3. Write a five-line caption for a KPI tile stating numerator, denominator, exclusions, and what would change your mind.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "dd-m03-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Dashboard critique worksheet + honest viz + caption",
    },
    {
      id: "dd-m03-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "data-and-decisions::dd-m03-recap": [
    {
      id: "dd-m03-recap-lt-intro",
      type: "intro",
      eyebrow: "Consolidation",
      title: "Consolidate · Dashboards, visualization as argument—and misread risks",
      body: "Build a recap artifact you will reopen: keywords, failure modes, reuse rules—written for future-you under stress.",
    },
    {
      id: "dd-m03-recap-lt-keys",
      type: "key_points",
      title: "Carry-forward pack",
      bullets: [
        "Keyword claim: Read a multi-metric dashboard and state the decision it supports (and decisions it cannot support).",
        "Failure mode to watch: Match visuals and dashboard panels to decisions: filters, cohorts, and time windows are part of the argument. Show varia…",
        "Reuse rule: when to apply vs rethink this module",
      ],
    },
    {
      id: "dd-m03-recap-lt-reflect",
      type: "reflection_prompt",
      title: "Calibration",
      prompt: "What would convince you this module did not stick—what signal would you look for in your next deliverable?",
    },
    {
      id: "dd-m03-recap-lt-next",
      type: "next_step",
      body: "Archive the recap where your future self will actually find it.",
    }
  ],

  "data-and-decisions::dd-m04-lesson": [
    {
      id: "dd-m04-lesson-lt-intro",
      type: "intro",
      eyebrow: "Applied reasoning",
      title: "Baselines, comparisons, and segments",
      body: "A number without a baseline is a claim without a standard. ‘Conversion rate is 4%’ means nothing without: compared to what, over what time window, in which segment? Most misleading performance reports are not fabricated — they choose comparisons that make the number look good and omit the ones that don’t.",
    },
    {
      id: "dd-m04-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "The baseline choice is a claim about what counts as success",
      body: "Three baseline types with different implications: prior period (better than last month?), comparable benchmark (better than equivalent cohorts?), counterfactual (what would have happened without this change?). Choosing a baseline is an argument about the standard of success. When baselines are unstated, readers infer them — and rarely infer the same one.",
    },
    {
      id: "dd-m04-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The campaign that beat its benchmark by choosing the right baseline",
      body: "A marketing team reports a campaign drove 18% more conversions compared to last month. What last month was: the slowest month of the year due to seasonal factors. The campaign actually underperformed equivalent prior-year campaigns by 12%. The baseline choice wasn’t fraudulent — it was unexamined.",
      example: "Baseline discipline: for any performance comparison, state (1) what the baseline is, (2) why that baseline is the right standard for this decision, (3) what comparison would paint a worse picture. If you wouldn’t include the worse picture, the report isn’t complete.",
    },
    {
      id: "dd-m04-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might a spreadsheet or headline tempt you to skip downside or definitions? Name one guardrail.",
    },
    {
      id: "dd-m04-lesson-lt-next",
      type: "next_step",
      body: "Next: dd-m06 — once you understand baselines, the challenge becomes interpreting movement over time. Trends, noise, and regime changes build the discipline to tell signal from variance in a KPI series.",
    }
  ],

  "data-and-decisions::dd-m04-practice": [
    {
      id: "dd-m04-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "dd-m04-practice-lt-task",
      type: "practice_task",
      title: "Practice · Baselines, comparisons, and segments",
      bullets: [
        "1. Segment drill with ethical guardrails written first.",
        "2. Write comparison rules for a KPI you actually track.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "dd-m04-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Comparison protocol note",
    },
    {
      id: "dd-m04-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "data-and-decisions::dd-m06-lesson": [
    {
      id: "dd-m06-lesson-lt-intro",
      type: "intro",
      eyebrow: "Applied reasoning",
      title: "Trends, noise, and regime changes",
      body: "Most KPI series contain more noise than signal. The error operators make is treating every movement as a signal — acting on a single bad week, ignoring a sustained plateau, or missing a genuine regime change because it looked like noise at first. This module builds the decision rules that separate these three.",
    },
    {
      id: "dd-m06-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "Not every dip is a trend and not every trend is permanent",
      body: "Three distinct patterns require different responses: noise (random variation around a stable process — wait before acting), trend (sustained directional movement requiring investigation), and regime change (the process generating the metric has structurally shifted — the baseline itself has changed). The discipline is naming which pattern you’re observing and what evidence would update that assessment.",
    },
    {
      id: "dd-m06-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The team that optimized for noise",
      body: "An e-commerce ops team receives weekly conversion rate alerts. Over 12 weeks, they make 9 interventions in response to below-average weeks. In retrospect: 7 of those weeks were within normal variance for their traffic volume. The 2 genuine trend signals went unnoticed because the team was desensitized to alerts.",
      example: "Before acting on any KPI movement: (1) what is the historical variance for this metric? (2) how many standard deviations is this movement from the mean? (3) does this movement appear in multiple related metrics or only in this one? Single-metric, single-week signals are usually noise.",
    },
    {
      id: "dd-m06-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might a spreadsheet or headline tempt you to skip downside or definitions? Name one guardrail.",
    },
    {
      id: "dd-m06-lesson-lt-next",
      type: "next_step",
      body: "Next: dd-m08 — the trend/noise/regime distinction is the input to stakeholder communication. dd-m08 addresses how to translate KPI movement into a narrative executives can act on.",
    }
  ],

  "data-and-decisions::dd-m07-practice": [
    {
      id: "dd-m07-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "dd-m07-practice-lt-task",
      type: "practice_task",
      title: "Practice · Reporting cadence, dashboards-in-context, and decision logs",
      bullets: [
        "1. Draft a one-page reporting cadence: what is reviewed when, by whom, and what triggers an ad-hoc drill-in.",
        "2. Take one dashboard KPI; write the two-sentence exec summary vs. five-bullet operator appendix for the same week.",
        "3. Backfill one messy past decision with a decision log entry that names the metric snapshot you should have preserved.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "dd-m07-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Reporting cadence brief + dashboard-to-decision log template",
    },
    {
      id: "dd-m07-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "data-and-decisions::dd-m08-lesson": [
    {
      id: "dd-m08-lesson-lt-intro",
      type: "intro",
      eyebrow: "Professional judgment",
      title: "Stakeholder narratives: from KPI pack to decision-ready story",
      body: "Sending a KPI dashboard to an executive is not communication — it’s data transfer. The communication happens when someone translates the numbers into a decision. This module builds the discipline of writing KPI narratives that are decision-ready: they name what moved, why, what it means, and what action is warranted.",
    },
    {
      id: "dd-m08-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "A KPI narrative has four required elements",
      body: "Headline (what matters most in this pack?), movement (what changed and by how much, compared to which baseline?), interpretation (what are the plausible drivers and at what confidence level?), recommendation (what decision does this reading support, and what information would change it?). A narrative missing any of these elements is a partial communication, not a complete one.",
    },
    {
      id: "dd-m08-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The KPI pack that generated the wrong action",
      body: "A head of operations sends a weekly KPI pack to the CEO. Customer satisfaction dropped 8 points. The pack shows the number, prior week, and a red arrow. The CEO responds: ‘Fix this.’ The ops team implements three simultaneous interventions. In post-mortem: the drop was driven by one region, one product category, one week’s shipping delay — all traceable. A two-sentence narrative would have produced a targeted response.",
      example: "Before sending any KPI pack, write the headline sentence: ‘The most important thing to know from this week’s data is [X], driven by [Y], and the decision this reading supports is [Z].’ If you can’t write that sentence, the pack isn’t ready.",
    },
    {
      id: "dd-m08-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might a spreadsheet or headline tempt you to skip downside or definitions? Name one guardrail.",
    },
    {
      id: "dd-m08-lesson-lt-next",
      type: "next_step",
      body: "Next: dd-m09 — stakeholder narratives are hardest when data is thin. dd-m09 addresses the discipline of making decisions when your KPI pack has gaps, conflicting signals, or insufficient evidence.",
    }
  ],

  "data-and-decisions::dd-m08-practice": [
    {
      id: "dd-m08-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "dd-m08-practice-lt-task",
      type: "practice_task",
      title: "Practice · Stakeholder narratives: from KPI pack to decision-ready story",
      bullets: [
        "1. Given a short performance summary (real or drafted), produce a one-page narrative: headline, KPI moves, interpretation limits, recommended decision.",
        "2. Peer omission hunt: hunt for cherry-picked windows, silent cohort changes, and metric-definition drift.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "dd-m08-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Stakeholder KPI narrative one-pager",
    },
    {
      id: "dd-m08-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "data-and-decisions::dd-m09-lesson": [
    {
      id: "dd-m09-lesson-lt-intro",
      type: "intro",
      eyebrow: "Integration",
      title: "Thin data, priors, and escalation",
      body: "The demand for data rarely aligns with its availability. Decisions with real stakes often arrive before enough evidence exists to be confident. This module builds the discipline of operating transparently when data is thin: stating your priors explicitly, naming what evidence would change your position, and escalating before confidence erodes into false certainty.",
    },
    {
      id: "dd-m09-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "A stated prior is a testable belief; an unstated one is a bias",
      body: "Prior: what you believe before new evidence arrives, based on domain knowledge, historical patterns, or structural reasoning. The discipline is making priors explicit before looking at new data — not after. Unstated priors are how confirming evidence gets overweighted and contradicting evidence gets explained away. Writing ‘I believe X and would need to see Y to change my view’ is an epistemically honest position.",
    },
    {
      id: "dd-m09-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The team that acted on insufficient evidence because no one named it",
      body: "A product team sees a 15% drop in feature usage over two weeks and ships a redesign. Usage continues to drop. Retrospective finding: the initial drop was caused by an A/B test exposing 30% of users to a broken variant. Nobody stated the prior: ‘This pattern is consistent with a variant test artifact — rule that out before acting.’",
      example: "Thin data protocol: (1) state your prior in writing, (2) name the smallest dataset that would reduce uncertainty meaningfully, (3) name the decision rule — at what confidence level would you act, wait, or escalate? Make those thresholds explicit before reviewing data.",
    },
    {
      id: "dd-m09-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might a spreadsheet or headline tempt you to skip downside or definitions? Name one guardrail.",
    },
    {
      id: "dd-m09-lesson-lt-next",
      type: "next_step",
      body: "Next: dd-m10 — the discipline across this course — KPI definition, visualization honesty, baseline rigor, trend reading, narrative, thin-data judgment — gets codified into reusable frameworks in the capstone.",
    }
  ],

  "data-and-decisions::dd-m09-practice": [
    {
      id: "dd-m09-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "dd-m09-practice-lt-task",
      type: "practice_task",
      title: "Practice · Thin data, priors, and escalation",
      bullets: [
        "1. Complete thin-data worksheet for a live ambiguous call tied to a KPI you own.",
        "2. Draft escalation memo with options + unknowns + the smallest extra dataset that would reduce variance.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "dd-m09-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Thin-data decision packet",
    },
    {
      id: "dd-m09-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "data-and-decisions::dd-m09-revision": [
    {
      id: "dd-m09-revision-lt-intro",
      type: "intro",
      eyebrow: "Revision gate",
      title: "Tighten · Thin data, priors, and escalation",
      body: "Compress misunderstandings before they compound. Prefer precise claims, cited limits, and falsifiers—no glossary theater.",
    },
    {
      id: "dd-m09-revision-lt-recap",
      type: "recap",
      title: "Compress to checks",
      bullets: [
        "State priors and how new evidence (including fresh KPI cuts) should update them.",
        "Define when to drill deeper in BI vs. decide under uncertainty vs. stop the metric theater.",
        "Escalate early when harm potential exceeds evidence quality—even when charts look fine.",
      ],
    },
    {
      id: "dd-m09-revision-lt-task",
      type: "practice_task",
      title: "Structured gate",
      prompt: "In 6–10 sentences: (1) what you believe now, (2) what would falsify it, (3) what artifact proves you applied this module.",
    },
    {
      id: "dd-m09-revision-lt-next",
      type: "next_step",
      body: "Proceed only if you would defend these claims aloud to a skeptical peer.",
    }
  ],

  "data-and-decisions::dd-m10-lesson": [
    {
      id: "dd-m10-lesson-lt-intro",
      type: "intro",
      eyebrow: "Integration",
      title: "Reusable frameworks for recurring decisions",
      body: "The patterns you’ve built in this course have to survive organizational change, staff turnover, and the pressure to cut corners under tight timelines. This module codifies the analytical discipline into frameworks that other people can use — not just the person who built them.",
    },
    {
      id: "dd-m10-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "A framework is a codified decision process, not a template",
      body: "A template tells you what fields to fill in. A framework tells you what questions to answer, what evidence would change the answer, and what the exit criteria are for each step. A framework is reviewable: someone else can follow it and reach the same conclusion if the inputs are the same. If they can’t, the framework has gaps.",
    },
    {
      id: "dd-m10-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The playbook that survived a team transition",
      body: "A data team builds a market sizing framework. The lead analyst leaves. Three months later, a new analyst uses the framework for a new market. The framework includes: data source requirements, exclusion rules, segment definitions, assumption validation requirements, and kill criteria if data quality falls below threshold. The new analyst produces a result the team can review and verify.",
      example: "Framework quality test: hand it to someone not involved in building it and ask them to run one analysis. Where they get stuck or produce wrong outputs is where the framework has gaps. Fix those gaps before deploying.",
    },
    {
      id: "dd-m10-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might a spreadsheet or headline tempt you to skip downside or definitions? Name one guardrail.",
    },
    {
      id: "dd-m10-lesson-lt-next",
      type: "next_step",
      body: "This is the data-and-decisions capstone. Bring your framework to peer review with this question ready: ‘What would a skeptical analyst change or challenge in this framework?’ Know your answer.",
    }
  ],

  "data-and-decisions::dd-m10-practice": [
    {
      id: "dd-m10-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "dd-m10-practice-lt-task",
      type: "practice_task",
      title: "Practice · Reusable frameworks for recurring decisions",
      bullets: [
        "1. Package framework v1 with triggers, inputs, KPI sheet references, outputs, kill criteria.",
        "2. Dry-run with skeptical colleague: they role-play exec reading only your one-page KPI summary—log gaps.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "dd-m10-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Decision framework draft + KPI review checklist",
    },
    {
      id: "dd-m10-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "data-and-decisions::dd-m10-recap": [
    {
      id: "dd-m10-recap-lt-intro",
      type: "intro",
      eyebrow: "Consolidation",
      title: "Consolidate · Reusable frameworks for recurring decisions",
      body: "Build a recap artifact you will reopen: keywords, failure modes, reuse rules—written for future-you under stress.",
    },
    {
      id: "dd-m10-recap-lt-keys",
      type: "key_points",
      title: "Carry-forward pack",
      bullets: [
        "Keyword claim: Extract patterns without overfitting past luck; tie each playbook step to observable KPI movement.",
        "Failure mode to watch: Codify recurring contexts into living playbooks—triggers, KPI set, reporting review ritual, owners, kill criteria—not da…",
        "Reuse rule: when to apply vs rethink this module",
      ],
    },
    {
      id: "dd-m10-recap-lt-reflect",
      type: "reflection_prompt",
      title: "Calibration",
      prompt: "What would convince you this module did not stick—what signal would you look for in your next deliverable?",
    },
    {
      id: "dd-m10-recap-lt-next",
      type: "next_step",
      body: "Archive the recap where your future self will actually find it.",
    }
  ],

  "data-and-decisions::dd-m10-revision": [
    {
      id: "dd-m10-revision-lt-intro",
      type: "intro",
      eyebrow: "Revision gate",
      title: "Tighten · Reusable frameworks for recurring decisions",
      body: "Compress misunderstandings before they compound. Prefer precise claims, cited limits, and falsifiers—no glossary theater.",
    },
    {
      id: "dd-m10-revision-lt-recap",
      type: "recap",
      title: "Compress to checks",
      bullets: [
        "Extract patterns without overfitting past luck; tie each playbook step to observable KPI movement.",
        "Version frameworks when markets, tooling, or metric definitions shift.",
        "Teach others to run the monthly/quarterly BI review without you.",
      ],
    },
    {
      id: "dd-m10-revision-lt-task",
      type: "practice_task",
      title: "Structured gate",
      prompt: "In 6–10 sentences: (1) what you believe now, (2) what would falsify it, (3) what artifact proves you applied this module.",
    },
    {
      id: "dd-m10-revision-lt-next",
      type: "next_step",
      body: "Proceed only if you would defend these claims aloud to a skeptical peer.",
    }
  ],

  "digital-safety::ds-m01-practice": [
    {
      id: "ds-m01-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "ds-m01-practice-lt-task",
      type: "practice_task",
      title: "Practice · Assets, adversaries, and proportionate defense",
      bullets: [
        "1. Build asset/risk matrix with impact × likelihood verbal scores.",
        "2. Rewrite one alarmist security tip into proportional controls + explicit non-goals.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "ds-m01-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Threat framing draft",
    },
    {
      id: "ds-m01-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "digital-safety::ds-m01-revision": [
    {
      id: "ds-m01-revision-lt-intro",
      type: "intro",
      eyebrow: "Revision gate",
      title: "Tighten · Assets, adversaries, and proportionate defense",
      body: "Compress misunderstandings before they compound. Prefer precise claims, cited limits, and falsifiers—no glossary theater.",
    },
    {
      id: "ds-m01-revision-lt-recap",
      type: "recap",
      title: "Compress to checks",
      bullets: [
        "Inventory digital assets tied to livelihood, legal duty, or reputation.",
        "Name plausible adversaries (crime, insiders, negligence) without movie plots.",
        "Reject checkbox theater—tie controls to assets and appetite for loss.",
      ],
    },
    {
      id: "ds-m01-revision-lt-task",
      type: "practice_task",
      title: "Structured gate",
      prompt: "In 6–10 sentences: (1) what you believe now, (2) what would falsify it, (3) what artifact proves you applied this module.",
    },
    {
      id: "ds-m01-revision-lt-next",
      type: "next_step",
      body: "Proceed only if you would defend these claims aloud to a skeptical peer.",
    }
  ],

  "digital-safety::ds-m02-lesson": [
    {
      id: "ds-m02-lesson-lt-intro",
      type: "intro",
      eyebrow: "Grounding",
      title: "Identity starts with MFA and recovery",
      body: "Most account compromises don’t exploit technical vulnerabilities — they exploit credential reuse, weak factors, and broken recovery paths. The MFA choice matters, but the recovery path is often the more critical gap: when you lose access to your authenticator, how do you get back in without also giving an attacker a way back in?",
    },
    {
      id: "ds-m02-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "MFA factors are not equal; recovery is the higher-stakes choice",
      body: "Factor strength: SMS OTP (interceptable via SIM swap), app-based TOTP (better but device-dependent), hardware key or passkey (strongest). The recovery path is the attack surface: email-based recovery is only as strong as your email MFA. For high-stakes accounts, map the full recovery chain before trusting the MFA.",
    },
    {
      id: "ds-m02-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The account that was MFA-protected but still compromised",
      body: "A freelancer has TOTP on their main email. Backup recovery option: a secondary email with SMS verification only. An attacker ports the phone number, recovers the secondary email, uses that to reset the primary. The TOTP setup was correct. The recovery path was not. The account was compromised via the weakest link in the chain, not the strongest.",
      example: "For each high-stakes account: map the full recovery path. What’s the weakest link between an attacker and access? Fix that link first, before adding complexity to the strong link.",
    },
    {
      id: "ds-m02-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might speed tempt you to skip verification? Name one stop rule.",
    },
    {
      id: "ds-m02-lesson-lt-next",
      type: "next_step",
      body: "Next: ds-m03 — identity protections fail when social engineering bypasses them. Phishing judgment is the behavioral layer that supports everything else you’ve set up.",
    }
  ],

  "digital-safety::ds-m02-practice": [
    {
      id: "ds-m02-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "ds-m02-practice-lt-task",
      type: "practice_task",
      title: "Practice · Identity starts with MFA and recovery",
      bullets: [
        "1. Audit MFA on five critical accounts; document gaps + fix dates.",
        "2. Draft recovery snippet for household or tiny team handbook.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "ds-m02-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "MFA + recovery audit",
    },
    {
      id: "ds-m02-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "digital-safety::ds-m03-lesson": [
    {
      id: "ds-m03-lesson-lt-intro",
      type: "intro",
      eyebrow: "Grounding",
      title: "Phishing judgment and verification habits",
      body: "Phishing works not because people are naive but because the signals are genuinely ambiguous under time pressure. A well-crafted phishing message is designed to exploit the exact moments when verification feels unnecessary: you’re busy, the message looks right, the urgency is real, and checking feels like the slow option.",
    },
    {
      id: "ds-m03-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "The high-signal cues that survive typo-free messages",
      body: "Typos are the bottom rung of phishing indicators — sophisticated attacks contain none. Higher-signal cues: requests for credentials via any link (no legitimate service asks you to ‘verify’ by clicking), urgency framing that pressures you to bypass verification, sender addresses that match the display name but not the domain, and out-of-band contact requesting action on a previous interaction you didn’t initiate.",
    },
    {
      id: "ds-m03-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The wire transfer that almost went through",
      body: "A finance manager receives an email from the CEO’s display name requesting an urgent wire transfer. The email address is close but not exact. The manager starts the process. What stopped it: the protocol was to call the requester’s cell directly before any wire, regardless of the message. The call confirmed the CEO had sent no such message. The protocol, not phishing detection, protected the organization.",
      example: "Build your verification habit before the pressure: for which categories of request will you always use a second channel before acting? Write that list now, when you’re not under pressure.",
    },
    {
      id: "ds-m03-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might speed tempt you to skip verification? Name one stop rule.",
    },
    {
      id: "ds-m03-lesson-lt-next",
      type: "next_step",
      body: "Next: ds-m04 — phishing is often the entry point, but the damage is amplified by how credentials and secrets are stored. Password management discipline limits the blast radius of a successful attack.",
    }
  ],

  "digital-safety::ds-m03-practice": [
    {
      id: "ds-m03-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "ds-m03-practice-lt-task",
      type: "practice_task",
      title: "Practice · Phishing judgment and verification habits",
      bullets: [
        "1. Annotate three sanitized phishing samples: cues, intent, safe response.",
        "2. Write verification script for finance/wire requests your org could follow.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "ds-m03-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Verification playbook snippet",
    },
    {
      id: "ds-m03-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "digital-safety::ds-m03-recap": [
    {
      id: "ds-m03-recap-lt-intro",
      type: "intro",
      eyebrow: "Consolidation",
      title: "Consolidate · Phishing judgment and verification habits",
      body: "Build a recap artifact you will reopen: keywords, failure modes, reuse rules—written for future-you under stress.",
    },
    {
      id: "ds-m03-recap-lt-keys",
      type: "key_points",
      title: "Carry-forward pack",
      bullets: [
        "Keyword claim: Identify high-signal phishing cues beyond obvious typos.",
        "Failure mode to watch: Slow down without freezing—patterns over panic, shame-free reporting, escalation paths.…",
        "Reuse rule: when to apply vs rethink this module",
      ],
    },
    {
      id: "ds-m03-recap-lt-reflect",
      type: "reflection_prompt",
      title: "Calibration",
      prompt: "What would convince you this module did not stick—what signal would you look for in your next deliverable?",
    },
    {
      id: "ds-m03-recap-lt-next",
      type: "next_step",
      body: "Archive the recap where your future self will actually find it.",
    }
  ],

  "digital-safety::ds-m04-lesson": [
    {
      id: "ds-m04-lesson-lt-intro",
      type: "intro",
      eyebrow: "Applied reasoning",
      title: "Password managers, secrets, and sharing boundaries",
      body: "The most common credential security failure is not a sophisticated attack — it’s password reuse. When one credential is compromised, reuse means the compromise cascades. A password manager eliminates reuse but introduces a new single point of failure that requires specific protection. This module treats the manager itself as a high-stakes account.",
    },
    {
      id: "ds-m04-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "Secrets and configuration values are different categories; mixing them creates risk",
      body: "Secret: a value that grants access (password, API key, token, private certificate). Configuration value: a setting that describes how a system behaves (environment name, feature flag, log level). Secrets in Slack messages, shared docs, or version control are the most common source of credential exposure. The discipline: secrets live only in a secrets store or environment variable.",
    },
    {
      id: "ds-m04-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The API key in the repository",
      body: "A developer pushes a project to a public repository including a .env file with a production AWS API key. Within 4 minutes, an automated scanner has found the key and begun provisioning resources. The developer revokes the key 30 minutes later. Total cost: $4,200 in unauthorized compute charges. The key was in the file because it was convenient for development. The rotation took 30 minutes. The damage took 4.",
      example: "Pre-push check: does this commit contain any value that would cause harm if your repository became public tomorrow? If yes, that value should not be in the commit.",
    },
    {
      id: "ds-m04-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might speed tempt you to skip verification? Name one stop rule.",
    },
    {
      id: "ds-m04-lesson-lt-next",
      type: "next_step",
      body: "Next: ds-m06 — after credentials, the next failure mode is data oversharing. Classification and access control determine who can reach your assets after the credentials are secure.",
    }
  ],

  "digital-safety::ds-m04-practice": [
    {
      id: "ds-m04-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "ds-m04-practice-lt-task",
      type: "practice_task",
      title: "Practice · Password managers, secrets, and sharing boundaries",
      bullets: [
        "1. Secrets audit: where keys/passwords live vs. where they should.",
        "2. Draft safe-sharing playbook for contractors + partners.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "ds-m04-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Secrets hygiene memo",
    },
    {
      id: "ds-m04-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "digital-safety::ds-m05-practice": [
    {
      id: "ds-m05-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "ds-m05-practice-lt-task",
      type: "practice_task",
      title: "Practice · Devices, updates, and backups that survive reality",
      bullets: [
        "1. Outline restore drill for primary devices + cloud data.",
        "2. Draft lightweight update policy individuals can keep.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "ds-m05-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Backup sanity checklist",
    },
    {
      id: "ds-m05-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "digital-safety::ds-m06-lesson": [
    {
      id: "ds-m06-lesson-lt-intro",
      type: "intro",
      eyebrow: "Applied reasoning",
      title: "Data handling: classification and least privilege",
      body: "Most data leaks are not caused by attackers — they’re caused by access that was too broad, never reviewed, and never reduced. Least privilege is not a security philosophy; it’s a hygiene practice: each person and system gets access to exactly what they need for their current role, and nothing else.",
    },
    {
      id: "ds-m06-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "A classification tier is only useful if it changes behavior",
      body: "The failure mode: organizations create 3–4 tier classification systems and then grant broad access anyway because the review process is painful. A classification tier is useful if and only if it triggers a specific access control decision. If Internal and Confidential are stored, shared, and audited the same way, the classification is theater.",
    },
    {
      id: "ds-m06-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The Notion doc shared with the whole company",
      body: "A team stores a client contract database in Notion, shared with all-company. Four months later: a contractor who left still has access, two employees who changed roles still have access. The document was shared broadly for convenience during onboarding and never reviewed. The clients had a contractual right to know who had access. Nobody in the company could answer that question.",
      example: "Access review discipline: for any shared resource containing sensitive data, the owner can name every person with access and justify it. If they can’t, the access list needs trimming before the next audit.",
    },
    {
      id: "ds-m06-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might speed tempt you to skip verification? Name one stop rule.",
    },
    {
      id: "ds-m06-lesson-lt-next",
      type: "next_step",
      body: "Next: ds-m08 — least privilege limits damage when something does go wrong. ds-m08 builds the incident response discipline for when containment and communication become urgent.",
    }
  ],

  "digital-safety::ds-m08-lesson": [
    {
      id: "ds-m08-lesson-lt-intro",
      type: "intro",
      eyebrow: "Professional judgment",
      title: "Incidents: triage, containment, communication",
      body: "Security incidents amplify in severity when the first responder improvises under pressure. The decisions that matter most — contain or investigate first? notify legal? tell affected parties now or wait? — are hard to make well without a prepared framework. This module builds that framework before the incident.",
    },
    {
      id: "ds-m08-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "Triage sequence: stop the bleeding before diagnosing the wound",
      body: "The incorrect first-responder instinct is to investigate (understand what happened) before containing (stop the active damage). The correct sequence: contain first, preserve evidence second, investigate third. Containment — isolating a compromised device, revoking a credential, disabling an integration — can be done without fully understanding the attack. Investigation cannot be undone if containment was skipped.",
    },
    {
      id: "ds-m08-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The team that investigated before containing",
      body: "A SaaS company’s authentication service is compromised. The security team begins investigating the attack vector before revoking active sessions. During the 90-minute investigation, the attacker uses those active sessions to exfiltrate customer data. The investigation was thorough. The containment decision was delayed by the desire to understand the attack first. The regulatory notification cost was directly tied to that 90-minute window.",
      example: "Triage decision tree: (1) active attack in progress? → Contain immediately, investigate after. (2) Attack is over? → Preserve evidence, then investigate. (3) Customer or regulated data involved? → Involve legal before any external communication.",
    },
    {
      id: "ds-m08-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might speed tempt you to skip verification? Name one stop rule.",
    },
    {
      id: "ds-m08-lesson-lt-next",
      type: "next_step",
      body: "Next: ds-m09 — individual incident response is only part of the picture. Team rituals around onboarding and offboarding prevent the credential hygiene failures that enable most incidents.",
    }
  ],

  "digital-safety::ds-m08-practice": [
    {
      id: "ds-m08-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "ds-m08-practice-lt-task",
      type: "practice_task",
      title: "Practice · Incidents: triage, containment, communication",
      bullets: [
        "1. Draft incident comms templates for leak vs. ransomware vs. credential loss.",
        "2. Tabletop scenario with timeline + owners.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "ds-m08-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Incident triage one-pager",
    },
    {
      id: "ds-m08-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "digital-safety::ds-m09-lesson": [
    {
      id: "ds-m09-lesson-lt-intro",
      type: "intro",
      eyebrow: "Integration",
      title: "Team rituals: onboarding, offboarding, audits",
      body: "The most common source of unauthorized access in small organizations is not a sophisticated attack — it’s a contractor who left six months ago and still has read access to a shared drive. Offboarding access review fails because it’s nobody’s urgent priority at the exact moment it needs to happen.",
    },
    {
      id: "ds-m09-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "Offboarding is the most neglected part of access management",
      body: "Onboarding access is granted under pressure (new person needs to be productive quickly). Offboarding access removal has no urgency signal (the person has left — what’s the harm right now?). That asymmetry is why orphaned credentials accumulate. The fix: make offboarding a deterministic checklist with owners and deadlines, not best-effort cleanup.",
    },
    {
      id: "ds-m09-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The contractor whose access outlived the contract",
      body: "A 6-person ops team uses Airtable, Notion, Google Drive, Slack, and a support tool. A contractor finishes a 3-month engagement. Nobody runs an offboarding checklist. Eight months later, in SOC 2 audit prep: the contractor still has access to all five tools. The contractor never used the access after leaving, but the access existed. Audit finding: no documented offboarding process.",
      example: "Offboarding checklist requirement: list all tools by system owner. Each owner revokes access within 24 hours of the departure date. No exceptions for ‘I’ll get to it this week.’",
    },
    {
      id: "ds-m09-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might speed tempt you to skip verification? Name one stop rule.",
    },
    {
      id: "ds-m09-lesson-lt-next",
      type: "next_step",
      body: "Next: ds-m10 — individual hygiene habits and team rituals need to be assembled into a coherent pack that survives team turnover. ds-m10 builds the reinforcement cadence.",
    }
  ],

  "digital-safety::ds-m09-practice": [
    {
      id: "ds-m09-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "ds-m09-practice-lt-task",
      type: "practice_task",
      title: "Practice · Team rituals: onboarding, offboarding, audits",
      bullets: [
        "1. Rewrite onboarding checklist with owners + timelines.",
        "2. Simulate offboarding for a persona; note gaps.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "ds-m09-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "On/offboarding security addendum",
    },
    {
      id: "ds-m09-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "digital-safety::ds-m10-lesson": [
    {
      id: "ds-m10-lesson-lt-intro",
      type: "intro",
      eyebrow: "Integration",
      title: "Safety pack assembly and reinforcement cadence",
      body: "A security policy that lives in a document nobody reads is worse than no policy — it creates the illusion of protection while doing none of the work. A safety pack that gets used is simple, specific, and revisited on a rhythm. This module assembles everything built in this course into a reviewable, adoptable pack.",
    },
    {
      id: "ds-m10-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "A safety pack is adopted when it fits the team’s actual workflows",
      body: "The failure mode: comprehensive policy documents written for a compliance audience that the actual team never reads. A usable pack has three properties: short enough to review in one sitting, specific to the tools and workflows the team actually uses (not generic categories), and a revisit schedule with a named owner. If it doesn’t fit on one page for daily decisions, it won’t be consulted during an incident.",
    },
    {
      id: "ds-m10-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The security pack that survived a new hire’s first week",
      body: "A small product team builds a 1-page security essentials document. It covers: password manager setup (with a specific tool named), MFA on four named critical accounts, file classification with three tiers, and the incident reporting process (a Slack channel name and a contact). A new hire joins. In their first week, they implement everything without asking the team. The document was specific enough to be followed without explanation.",
      example: "Pack completeness test: hand it to a new person with no security background. Can they implement everything in one sitting? Where they get stuck is where the pack needs clarification.",
    },
    {
      id: "ds-m10-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might speed tempt you to skip verification? Name one stop rule.",
    },
    {
      id: "ds-m10-lesson-lt-next",
      type: "next_step",
      body: "This is the digital-safety capstone. Bring your pack to a peer review session with this question: ‘Where would this pack fail under time pressure?’ Know your weak points before someone else finds them.",
    }
  ],

  "digital-safety::ds-m10-practice": [
    {
      id: "ds-m10-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "ds-m10-practice-lt-task",
      type: "practice_task",
      title: "Practice · Safety pack assembly and reinforcement cadence",
      bullets: [
        "1. Facilitate 20-minute review with teammates; capture objections.",
        "2. Iterate pack based on feedback + cut fluff ruthlessly.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "ds-m10-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Safety pack v1",
    },
    {
      id: "ds-m10-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "digital-safety::ds-m10-recap": [
    {
      id: "ds-m10-recap-lt-intro",
      type: "intro",
      eyebrow: "Consolidation",
      title: "Consolidate · Safety pack assembly and reinforcement cadence",
      body: "Build a recap artifact you will reopen: keywords, failure modes, reuse rules—written for future-you under stress.",
    },
    {
      id: "ds-m10-recap-lt-keys",
      type: "key_points",
      title: "Carry-forward pack",
      bullets: [
        "Keyword claim: Merge modules without duplication or jargon walls.",
        "Failure mode to watch: Integrate framing, hygiene, vendor, incident artifacts into an adoptable pack with revisit rhythm.…",
        "Reuse rule: when to apply vs rethink this module",
      ],
    },
    {
      id: "ds-m10-recap-lt-reflect",
      type: "reflection_prompt",
      title: "Calibration",
      prompt: "What would convince you this module did not stick—what signal would you look for in your next deliverable?",
    },
    {
      id: "ds-m10-recap-lt-next",
      type: "next_step",
      body: "Archive the recap where your future self will actually find it.",
    }
  ],

  "digital-safety::ds-m10-revision": [
    {
      id: "ds-m10-revision-lt-intro",
      type: "intro",
      eyebrow: "Revision gate",
      title: "Tighten · Safety pack assembly and reinforcement cadence",
      body: "Compress misunderstandings before they compound. Prefer precise claims, cited limits, and falsifiers—no glossary theater.",
    },
    {
      id: "ds-m10-revision-lt-recap",
      type: "recap",
      title: "Compress to checks",
      bullets: [
        "Merge modules without duplication or jargon walls.",
        "Define quarterly revisit triggers tied to risk changes.",
        "Measure adoption honestly (completion + friction notes).",
      ],
    },
    {
      id: "ds-m10-revision-lt-task",
      type: "practice_task",
      title: "Structured gate",
      prompt: "In 6–10 sentences: (1) what you believe now, (2) what would falsify it, (3) what artifact proves you applied this module.",
    },
    {
      id: "ds-m10-revision-lt-next",
      type: "next_step",
      body: "Proceed only if you would defend these claims aloud to a skeptical peer.",
    }
  ],

  "leadership-and-teams::lat-m01-practice": [
    {
      id: "lat-m01-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "lat-m01-practice-lt-task",
      type: "practice_task",
      title: "Practice · Leadership outcomes vs leadership theater",
      bullets: [
        "1. Score your last month: three outcomes vs. three theater patterns with evidence.",
        "2. Draft a leadership experiment card: intervention, signal, kill date.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "lat-m01-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Observable leadership goals sheet",
    },
    {
      id: "lat-m01-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "leadership-and-teams::lat-m01-revision": [
    {
      id: "lat-m01-revision-lt-intro",
      type: "intro",
      eyebrow: "Revision gate",
      title: "Tighten · Leadership outcomes vs leadership theater",
      body: "Compress misunderstandings before they compound. Prefer precise claims, cited limits, and falsifiers—no glossary theater.",
    },
    {
      id: "lat-m01-revision-lt-recap",
      type: "recap",
      title: "Compress to checks",
      bullets: [
        "Rewrite vague leadership goals into measurable signals over 30–60 days.",
        "Pick one leadership experiment with hypothesis and review date.",
        "Identify theater habits (performative urgency, vanity metrics) to drop or constrain.",
      ],
    },
    {
      id: "lat-m01-revision-lt-task",
      type: "practice_task",
      title: "Structured gate",
      prompt: "In 6–10 sentences: (1) what you believe now, (2) what would falsify it, (3) what artifact proves you applied this module.",
    },
    {
      id: "lat-m01-revision-lt-next",
      type: "next_step",
      body: "Proceed only if you would defend these claims aloud to a skeptical peer.",
    }
  ],

  "leadership-and-teams::lat-m02-lesson": [
    {
      id: "lat-m02-lesson-lt-intro",
      type: "intro",
      eyebrow: "Grounding",
      title: "Expectations, accountability, and psychological safety",
      body: "The tension between psychological safety and high standards is false. Teams with psychological safety but no clear expectations get comfort, not performance. Teams with high standards but no psychological safety get compliance and concealment. This module builds the management practice that requires both simultaneously.",
    },
    {
      id: "lat-m02-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "Expectations must be behavioral to be accountable",
      body: "Vague expectation: ‘I need you to be more proactive.’ Behavioral expectation: ‘When you see a blocker that will delay delivery by more than one day, I expect you to flag it to me and the relevant stakeholder the same day.’ The behavioral version can be observed, referenced, and used in a performance conversation. The vague version leads to disagreements about whether it was met.",
    },
    {
      id: "lat-m02-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The expectation that wasn’t",
      body: "A manager tells a team member: ‘I want you to take more ownership.’ Six months later, the manager is frustrated with a lack of initiative. The team member is confused — they thought they were performing well. In retrospect: ‘ownership’ was never defined as specific behaviors. Both sides had different mental models of what it meant.",
      example: "Expectation-setting test: can you tell me what observable behavior would confirm the expectation was met? Can you tell me what behavior would confirm it wasn’t? If you can’t answer both, the expectation isn’t specific enough to hold to.",
    },
    {
      id: "lat-m02-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might optimism hide missing evidence in your facilitation or leadership narrative? Name one patch.",
    },
    {
      id: "lat-m02-lesson-lt-next",
      type: "next_step",
      body: "Next: lat-m03 — clear expectations establish what good looks like. Decision rights establish who decides what, which determines how fast the team can operate without needing you in every loop.",
    }
  ],

  "leadership-and-teams::lat-m02-practice": [
    {
      id: "lat-m02-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "lat-m02-practice-lt-task",
      type: "practice_task",
      title: "Practice · Expectations, accountability, and psychological safety",
      bullets: [
        "1. Expectations doc for one role: outcomes, cadence, escalation if missed.",
        "2. Outline an accountability conversation using facts → impact → next step.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "lat-m02-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Expectations + accountability outline",
    },
    {
      id: "lat-m02-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "leadership-and-teams::lat-m03-lesson": [
    {
      id: "lat-m03-lesson-lt-intro",
      type: "intro",
      eyebrow: "Grounding",
      title: "Decision rights and delegation that scales",
      body: "Most delegation failures are not motivation failures — they’re decision rights failures. When the person you delegated to doesn’t know where their authority ends, they either over-escalate (asking permission for everything) or under-escalate (making decisions that weren’t theirs to make). Mapping decision rights prevents both.",
    },
    {
      id: "lat-m03-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "Delegation is outcomes plus guardrails, not task dumping",
      body: "Task dumping: ‘Handle the vendor relationship.’ Delegation with decision rights: ‘You own all day-to-day vendor communications. Decisions that change contract scope, budget, or timeline require my sign-off before you communicate them. Everything else is yours.’ The second version tells the delegate exactly where their authority ends. They can move fast inside those guardrails and know when to escalate.",
    },
    {
      id: "lat-m03-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The decision the delegate didn’t know was out of scope",
      body: "A manager delegates a client project. Midway through, a client asks for a scope change. The delegate says yes — they thought they had authority to manage the client relationship. The scope change requires additional budget and wasn’t within their authority. The manager finds out two weeks later. The fix would have been one sentence: ‘Scope changes that affect budget or contract require my approval before you confirm them.’",
      example: "For each delegated outcome, write the boundaries in one sentence: ‘You can decide [X] independently. For [Y], bring me a recommendation. For [Z], I need to approve before you act.’",
    },
    {
      id: "lat-m03-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might optimism hide missing evidence in your facilitation or leadership narrative? Name one patch.",
    },
    {
      id: "lat-m03-lesson-lt-next",
      type: "next_step",
      body: "Next: lat-m04 — decision rights are set in documentation. The 1:1 cadence is where you find out whether they’re working in practice.",
    }
  ],

  "leadership-and-teams::lat-m03-practice": [
    {
      id: "lat-m03-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "lat-m03-practice-lt-task",
      type: "practice_task",
      title: "Practice · Decision rights and delegation that scales",
      bullets: [
        "1. First-pass decision-rights map with escalation ladder.",
        "2. Delegation experiment: one outcome delegated with review gate written down.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "lat-m03-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Decision rights draft v1",
    },
    {
      id: "lat-m03-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "leadership-and-teams::lat-m03-recap": [
    {
      id: "lat-m03-recap-lt-intro",
      type: "intro",
      eyebrow: "Consolidation",
      title: "Consolidate · Decision rights and delegation that scales",
      body: "Build a recap artifact you will reopen: keywords, failure modes, reuse rules—written for future-you under stress.",
    },
    {
      id: "lat-m03-recap-lt-keys",
      type: "key_points",
      title: "Carry-forward pack",
      bullets: [
        "Keyword claim: Assign decision owners for recurring classes of choices.",
        "Failure mode to watch: Map who decides what, with escalation rails—delegation as outcomes + guardrails, not task dumping.…",
        "Reuse rule: when to apply vs rethink this module",
      ],
    },
    {
      id: "lat-m03-recap-lt-reflect",
      type: "reflection_prompt",
      title: "Calibration",
      prompt: "What would convince you this module did not stick—what signal would you look for in your next deliverable?",
    },
    {
      id: "lat-m03-recap-lt-next",
      type: "next_step",
      body: "Archive the recap where your future self will actually find it.",
    }
  ],

  "leadership-and-teams::lat-m04-lesson": [
    {
      id: "lat-m04-lesson-lt-intro",
      type: "intro",
      eyebrow: "Applied reasoning",
      title: "1:1s that produce movement",
      body: "1:1s that are purely status updates are a waste of time — you can get status asynchronously. A 1:1 is productive when it surfaces something the async work can’t: how the person is thinking, where they’re stuck, what they’re not saying in the group setting. This module builds a structure that reliably produces both.",
    },
    {
      id: "lat-m04-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "The agenda should surface reality, not manage the relationship",
      body: "Two failure modes: (1) manager-driven agenda — the manager lists topics, the direct report answers, the meeting ends. The manager got updates. The direct report got nothing. (2) No agenda — the meeting becomes a comfortable catch-up with no productive output. The discipline: the agenda is shared in advance, the direct report contributes to it, and commitments with owners and dates are logged before close.",
    },
    {
      id: "lat-m04-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The 1:1 that was always a status update",
      body: "A manager runs weekly 1:1s by going through each project. After 6 months, the manager is surprised to learn the direct report has been planning to leave for three months — they felt they had no space to raise career concerns because the agenda was always project status. The 1:1 format had never surfaced what the direct report needed to say.",
      example: "1:1 format: share template 24 hours in advance. Three sections: (1) what I want to raise, (2) what I want your input on, (3) what I need you to decide. The direct report fills in sections 1 and 2. You add section 3. Commitments with owners and dates are logged before the meeting ends.",
    },
    {
      id: "lat-m04-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might optimism hide missing evidence in your facilitation or leadership narrative? Name one patch.",
    },
    {
      id: "lat-m04-lesson-lt-next",
      type: "next_step",
      body: "Next: lat-m06 — 1:1s can surface conflict and performance concerns. The discipline for handling them well is different from the 1:1 structure itself. lat-m06 builds the hard conversation framework.",
    }
  ],

  "leadership-and-teams::lat-m04-practice": [
    {
      id: "lat-m04-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "lat-m04-practice-lt-task",
      type: "practice_task",
      title: "Practice · 1:1s that produce movement",
      bullets: [
        "1. Build a 1:1 template + run one trial; capture commitments log.",
        "2. Review past notes: where did follow-through drop—fix the system.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "lat-m04-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "1:1 system draft",
    },
    {
      id: "lat-m04-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "leadership-and-teams::lat-m06-lesson": [
    {
      id: "lat-m06-lesson-lt-intro",
      type: "intro",
      eyebrow: "Applied reasoning",
      title: "Conflict repair and hard conversations",
      body: "Hard conversations get harder the longer they’re avoided. A manager who avoids a direct performance conversation at month two will have a much harder conversation at month six — or no conversation at all, and a quiet resignation. This module builds the framework for having the conversation early, specifically, and without unnecessary emotion.",
    },
    {
      id: "lat-m06-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "De-escalation without abandoning standards is a skill, not a personality trait",
      body: "The failure mode: the hard conversation becomes a relationship repair conversation and standards are abandoned to restore comfort. The discipline: separate relational work from accountability work. Acknowledge what is working, name what is not working in observable terms, state the standard, and agree on a specific next step with a date. Both sides leave knowing what is expected and when it will be reviewed.",
    },
    {
      id: "lat-m06-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The conversation that happened too late",
      body: "A team lead has a direct report missing deadlines. The lead reschedules internally, absorbs the delays, and avoids the conversation to protect the relationship. At the 6-month review, the lead raises performance concerns. The direct report is blindsided — they had no idea there was a problem. Six months of absorbed delays were never visible to them as a pattern.",
      example: "Hard conversation structure: (1) specific behavioral observation, not character assessment. (2) impact on the team or outcome. (3) what you need changed, named as a behavior. (4) what support you can offer. (5) when you’ll review progress. Write it out before the conversation — spoken-only frameworks collapse under pressure.",
    },
    {
      id: "lat-m06-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might optimism hide missing evidence in your facilitation or leadership narrative? Name one patch.",
    },
    {
      id: "lat-m06-lesson-lt-next",
      type: "next_step",
      body: "Next: lat-m08 — 1:1s and hard conversations manage vertical relationships. Cross-team coordination is where horizontal alignment fails. lat-m08 addresses the interface agreements that prevent coordination debt.",
    }
  ],

  "leadership-and-teams::lat-m07-practice": [
    {
      id: "lat-m07-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "lat-m07-practice-lt-task",
      type: "practice_task",
      title: "Practice · Team learning: retros, postmortems, blameless analysis",
      bullets: [
        "1. Draft retro facilitation guide with prompt list + anti-patterns.",
        "2. Complete postmortem template on a past team failure (real or realistic).",
        "3. Add a “signals to watch” section tying actions to observable metrics or proxies.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "lat-m07-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Retro + postmortem templates + signal follow-through notes",
    },
    {
      id: "lat-m07-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "leadership-and-teams::lat-m08-lesson": [
    {
      id: "lat-m08-lesson-lt-intro",
      type: "intro",
      eyebrow: "Professional judgment",
      title: "Cross-team coordination without matrix swamp",
      body: "Cross-team coordination fails not because people don’t want to collaborate but because the interfaces between teams are undefined. When team A doesn’t know what to expect from team B in terms of response time, quality, or scope, both teams generate work to manage the uncertainty — status meetings, Slack threads, alignment calls — none of which produce output.",
    },
    {
      id: "lat-m08-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "Interface agreements make coordination deterministic",
      body: "An interface agreement answers three questions: what does each team commit to delivering (output and quality standard), when and how (cadence, format, response time), and what happens when the interface breaks (escalation path and recovery protocol). A well-defined interface means both teams operate in parallel without constant synchronization. The interface meeting happens when something breaks — not constantly.",
    },
    {
      id: "lat-m08-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The two teams that were always in alignment meetings",
      body: "A product team and a data team have weekly alignment meetings about who owns what, what’s been delivered, and what’s coming next. Both teams feel the relationship is good. The output of the meetings: more meetings. The missing artifact: an interface agreement defining what the data team delivers by when, what format it arrives in, and who to contact when it doesn’t show up.",
      example: "Interface agreement template: (1) what we deliver to you — output, quality bar, cadence. (2) what you deliver to us. (3) escalation if the interface breaks — who to contact, response window. When both teams have signed off, replace the weekly alignment meeting with a monthly review.",
    },
    {
      id: "lat-m08-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might optimism hide missing evidence in your facilitation or leadership narrative? Name one patch.",
    },
    {
      id: "lat-m08-lesson-lt-next",
      type: "next_step",
      body: "Next: lat-m09 — interfaces set the external structure. Performance management with dignity is the internal process when someone in your team isn’t meeting the standard.",
    }
  ],

  "leadership-and-teams::lat-m08-practice": [
    {
      id: "lat-m08-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "lat-m08-practice-lt-task",
      type: "practice_task",
      title: "Practice · Cross-team coordination without matrix swamp",
      bullets: [
        "1. Interface agreement for one messy cross-team dependency.",
        "2. Coordination cost audit: kill / merge / clarify meetings.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "lat-m08-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Interface agreement draft + interface health signals",
    },
    {
      id: "lat-m08-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "leadership-and-teams::lat-m09-lesson": [
    {
      id: "lat-m09-lesson-lt-intro",
      type: "intro",
      eyebrow: "Integration",
      title: "Performance management with dignity",
      body: "Performance management fails most often in the early stages — when the signal is ambiguous and the manager decides to wait and see rather than document and discuss. By the time the concern is serious, the documentation gap makes the performance conversation feel sudden and unfair. The discipline is early documentation, early conversation, and early support.",
    },
    {
      id: "lat-m09-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "Catching drift early requires observable evidence, not a feeling",
      body: "The instinct that leads to late performance conversations: ‘I have a bad feeling about this but I don’t have enough evidence yet.’ The correct response: document what you’re observing in behavioral terms right now, even if the pattern isn’t clear. Three data points documented early is better than zero data points until month six. Documentation is the difference between a sudden surprise and a documented conversation.",
    },
    {
      id: "lat-m09-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The performance plan that came from nowhere",
      body: "A manager has a vague sense a team member is underperforming for four months. They don’t document it. At the six-month review, they move the person to a formal performance plan. The direct report responds: ‘I had no idea there was a problem.’ The manager can’t reference specific conversations because early discussions were informal and unwritten. The plan is now contested and the relationship is damaged.",
      example: "Documentation habit: after any conversation where performance concerns were raised, even informally, send a brief written summary: ‘Wanted to capture what we discussed — we agreed [X] by [date].’ This is the evidence that the person was informed and had the opportunity to respond.",
    },
    {
      id: "lat-m09-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might optimism hide missing evidence in your facilitation or leadership narrative? Name one patch.",
    },
    {
      id: "lat-m09-lesson-lt-next",
      type: "next_step",
      body: "Next: lat-m10 — expectations, delegation, 1:1s, conflict, coordination, performance — these are the components of a leadership operating system. The capstone integrates them.",
    }
  ],

  "leadership-and-teams::lat-m09-practice": [
    {
      id: "lat-m09-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "lat-m09-practice-lt-task",
      type: "practice_task",
      title: "Practice · Performance management with dignity",
      bullets: [
        "1. Performance narrative tied to outcomes + behaviors + examples.",
        "2. Improvement plan outline with milestones, support offered, and review dates.",
        "3. Draft a humane metric/proxy policy: what you will never use as a blunt KPI.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "lat-m09-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Performance narrative + plan skeleton + review cadence note",
    },
    {
      id: "lat-m09-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "leadership-and-teams::lat-m10-lesson": [
    {
      id: "lat-m10-lesson-lt-intro",
      type: "intro",
      eyebrow: "Integration",
      title: "Capstone rehearsal: operating system integration",
      body: "A leadership operating system is not a document — it’s a set of habits that have been tested, debugged, and adopted by the people they affect. The capstone is not about having all the right answers; it’s about having a version of each component that has been reviewed by at least one person other than you, with their objections incorporated.",
    },
    {
      id: "lat-m10-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "Integration means non-contradiction, not comprehensiveness",
      body: "The most common failure in operating system design: the expectations document says one thing, the delegation structure says another, and the 1:1 format doesn’t create space for the performance conversations the expectations require. Integration means reviewing all components for internal consistency. A simple, consistent system that is followed beats a comprehensive one that nobody uses.",
    },
    {
      id: "lat-m10-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The operating system that didn’t survive contact with the team",
      body: "A manager builds a comprehensive team operating system: expectations doc, decision-rights matrix, 1:1 template, conflict protocol, performance rubric. Team feedback: the expectations document assumes the manager makes decisions, but the decision-rights matrix grants authority to individual contributors. Three 1:1 template sections cover topics already handled in the weekly team meeting. Nobody caught the contradictions before launch.",
      example: "Integration review: ask one person governed by this system to read all components together and identify one place where they contradict each other. Fix that first. Then pilot for 30 days before treating any of it as final.",
    },
    {
      id: "lat-m10-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might optimism hide missing evidence in your facilitation or leadership narrative? Name one patch.",
    },
    {
      id: "lat-m10-lesson-lt-next",
      type: "next_step",
      body: "This is the leadership-and-teams capstone. Bring your operating system to one direct report or peer with this question: ‘Where would this system fail you?’ Their answer is your first revision priority.",
    }
  ],

  "leadership-and-teams::lat-m10-practice": [
    {
      id: "lat-m10-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "lat-m10-practice-lt-task",
      type: "practice_task",
      title: "Practice · Capstone rehearsal: operating system integration",
      bullets: [
        "1. Pilot plan with 30-day adoption experiment + success signals.",
        "2. Synthesize feedback into v1.1 edits with rationale log.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "lat-m10-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Team health pack v1",
    },
    {
      id: "lat-m10-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "leadership-and-teams::lat-m10-recap": [
    {
      id: "lat-m10-recap-lt-intro",
      type: "intro",
      eyebrow: "Consolidation",
      title: "Consolidate · Capstone rehearsal: operating system integration",
      body: "Build a recap artifact you will reopen: keywords, failure modes, reuse rules—written for future-you under stress.",
    },
    {
      id: "lat-m10-recap-lt-keys",
      type: "key_points",
      title: "Carry-forward pack",
      bullets: [
        "Keyword claim: Merge artifacts into non-contradictory bundle.",
        "Failure mode to watch: Fold charter, decision rights, cadence, feedback, conflict repair into one pilotable operating system.…",
        "Reuse rule: when to apply vs rethink this module",
      ],
    },
    {
      id: "lat-m10-recap-lt-reflect",
      type: "reflection_prompt",
      title: "Calibration",
      prompt: "What would convince you this module did not stick—what signal would you look for in your next deliverable?",
    },
    {
      id: "lat-m10-recap-lt-next",
      type: "next_step",
      body: "Archive the recap where your future self will actually find it.",
    }
  ],

  "leadership-and-teams::lat-m10-revision": [
    {
      id: "lat-m10-revision-lt-intro",
      type: "intro",
      eyebrow: "Revision gate",
      title: "Tighten · Capstone rehearsal: operating system integration",
      body: "Compress misunderstandings before they compound. Prefer precise claims, cited limits, and falsifiers—no glossary theater.",
    },
    {
      id: "lat-m10-revision-lt-recap",
      type: "recap",
      title: "Compress to checks",
      bullets: [
        "Merge artifacts into non-contradictory bundle.",
        "Run pilot plan with friction log.",
        "Iterate from feedback without scope explosion.",
      ],
    },
    {
      id: "lat-m10-revision-lt-task",
      type: "practice_task",
      title: "Structured gate",
      prompt: "In 6–10 sentences: (1) what you believe now, (2) what would falsify it, (3) what artifact proves you applied this module.",
    },
    {
      id: "lat-m10-revision-lt-next",
      type: "next_step",
      body: "Proceed only if you would defend these claims aloud to a skeptical peer.",
    }
  ],

  "marketing-and-growth::mg-m01-practice": [
    {
      id: "mg-m01-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "mg-m01-practice-lt-task",
      type: "practice_task",
      title: "Practice · Growth as disciplined demand learning—not vanity activity",
      bullets: [
        "1. Rewrite five vague KPIs into hypotheses + metric + timeframe + falsifier.",
        "2. Pick one lagging KPI; derive three leading indicators with data you could plausibly collect.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "mg-m01-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Demand-learning hypothesis sheet",
    },
    {
      id: "mg-m01-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "marketing-and-growth::mg-m01-revision": [
    {
      id: "mg-m01-revision-lt-intro",
      type: "intro",
      eyebrow: "Revision gate",
      title: "Tighten · Growth as disciplined demand learning—not vanity activity",
      body: "Compress misunderstandings before they compound. Prefer precise claims, cited limits, and falsifiers—no glossary theater.",
    },
    {
      id: "mg-m01-revision-lt-recap",
      type: "recap",
      title: "Compress to checks",
      bullets: [
        "Write three falsifiable hypotheses with measurable outcomes and falsifiers.",
        "Differentiate lagging KPIs from leading indicators you actually control.",
        "Expose vanity framing (“awareness”) and replace it with observable signals.",
      ],
    },
    {
      id: "mg-m01-revision-lt-task",
      type: "practice_task",
      title: "Structured gate",
      prompt: "In 6–10 sentences: (1) what you believe now, (2) what would falsify it, (3) what artifact proves you applied this module.",
    },
    {
      id: "mg-m01-revision-lt-next",
      type: "next_step",
      body: "Proceed only if you would defend these claims aloud to a skeptical peer.",
    }
  ],

  "marketing-and-growth::mg-m02-lesson": [
    {
      id: "mg-m02-lesson-lt-intro",
      type: "intro",
      eyebrow: "Grounding",
      title: "Audience evidence: substitutions, objections, proofs you already hold",
      body: "Most audience research produces the persona nobody actually uses: demographics and aspirations so generic they could describe anyone. The useful research is behavioral: what do people buy instead of your product, what objections have you heard more than twice, and what proof already exists in data you have before you spend anything on research.",
    },
    {
      id: "mg-m02-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "Segment by buying situation and objection pattern, not demographics",
      body: "A 35-year-old marketing manager buying a project tool for herself is a different buyer than a 35-year-old marketing manager buying for her entire team. Same demographics, different objections, different proof requirements, different messaging. The segment that matters is defined by the buying situation and objection pattern — not the job title.",
    },
    {
      id: "mg-m02-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The persona that could have been anyone",
      body: "A SaaS company builds three buyer personas from a market research survey: names, stock photos, job titles, aspirational quotes. The product team uses them for six months. In a customer audit: none of the actual customers matched the top persona closely. The personas described who the team wanted to sell to, not who was actually buying. Substitution data — what customers were using before they switched — would have predicted the actual customer profile accurately.",
      example: "Substitution question protocol: what were you using before this? What made you look for an alternative? What almost stopped you from switching? These three questions answered by 10 real customers are more useful than any synthesized persona.",
    },
    {
      id: "mg-m02-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might a spreadsheet or headline tempt you to skip downside or definitions? Name one guardrail.",
    },
    {
      id: "mg-m02-lesson-lt-next",
      type: "next_step",
      body: "Next: mg-m03 — knowing what your audience believes and objects to is the raw material for positioning. mg-m03 builds the positioning spine from your audience evidence.",
    }
  ],

  "marketing-and-growth::mg-m02-practice": [
    {
      id: "mg-m02-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "mg-m02-practice-lt-task",
      type: "practice_task",
      title: "Practice · Audience evidence: substitutions, objections, proofs you already hold",
      bullets: [
        "1. Five-row evidence table: datapoint, implication, credibility risk, next question.",
        "2. Objection library with counter-message + proof requirement per objection.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "mg-m02-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Audience evidence appendix",
    },
    {
      id: "mg-m02-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "marketing-and-growth::mg-m03-lesson": [
    {
      id: "mg-m03-lesson-lt-intro",
      type: "intro",
      eyebrow: "Grounding",
      title: "Positioning spine: promise, wedge, refusal to pretend",
      body: "Positioning is not a tagline — it’s a claim about which customers you serve best, which alternatives you’re being compared to, and why you win that comparison. Most positioning statements fail because they avoid the comparison entirely: ‘the leading platform for X’ promises nothing falsifiable and defends against nothing.",
    },
    {
      id: "mg-m03-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "Stress-test positioning against named alternatives, not generic uniqueness",
      body: "The positioning wedge test: can you complete this honestly? ‘For [specific customer situation], our product is better than [named alternative] because [specific difference the customer can verify].’ If the alternative is ‘doing nothing’ or ‘other options,’ the positioning hasn’t made contact with reality. The wedge is the specific, verifiable reason a buyer in this situation would choose you over the thing they’re actually comparing you to.",
    },
    {
      id: "mg-m03-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The positioning that didn’t survive the first sales conversation",
      body: "A software company positions as ‘the fastest, easiest all-in-one solution for growing teams.’ In sales calls: prospects ask ‘faster than what?’ ‘easier than what?’ and ‘all-in-one for what specifically?’ The sales team improvises different answers on every call. The positioning had no wedge — no named alternative, no specific verifiable claim. It described a category, not a choice.",
      example: "Positioning stress test: show your positioning statement to a colleague and ask them to predict the prospect’s first question. If the first question is ‘compared to what?’ the positioning is incomplete. If it’s ‘how does that work?’ you’ve named a real claim.",
    },
    {
      id: "mg-m03-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might a spreadsheet or headline tempt you to skip downside or definitions? Name one guardrail.",
    },
    {
      id: "mg-m03-lesson-lt-next",
      type: "next_step",
      body: "Next: mg-m04 — positioning is the foundation. Messaging architecture translates it into the claim ladder, proofs, and tone guardrails that make it usable across all copy.",
    }
  ],

  "marketing-and-growth::mg-m03-practice": [
    {
      id: "mg-m03-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "mg-m03-practice-lt-task",
      type: "practice_task",
      title: "Practice · Positioning spine: promise, wedge, refusal to pretend",
      bullets: [
        "1. Written critique: competitor comparison table → positioning adjustment.",
        "2. Rewrite hero/header copy into spine + proof hook + disqualifier line.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "mg-m03-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Positioning spine + proof wedge draft",
    },
    {
      id: "mg-m03-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "marketing-and-growth::mg-m03-recap": [
    {
      id: "mg-m03-recap-lt-intro",
      type: "intro",
      eyebrow: "Consolidation",
      title: "Consolidate · Positioning spine: promise, wedge, refusal to pretend",
      body: "Build a recap artifact you will reopen: keywords, failure modes, reuse rules—written for future-you under stress.",
    },
    {
      id: "mg-m03-recap-lt-keys",
      type: "key_points",
      title: "Carry-forward pack",
      bullets: [
        "Keyword claim: Stress-test positioning against named competitors—not generic uniqueness.",
        "Failure mode to watch: Articulate category context, differentiated promise, and proof doctrine—explicitly naming what you will not claim.…",
        "Reuse rule: when to apply vs rethink this module",
      ],
    },
    {
      id: "mg-m03-recap-lt-reflect",
      type: "reflection_prompt",
      title: "Calibration",
      prompt: "What would convince you this module did not stick—what signal would you look for in your next deliverable?",
    },
    {
      id: "mg-m03-recap-lt-next",
      type: "next_step",
      body: "Archive the recap where your future self will actually find it.",
    }
  ],

  "marketing-and-growth::mg-m04-lesson": [
    {
      id: "mg-m04-lesson-lt-intro",
      type: "intro",
      eyebrow: "Applied reasoning",
      title: "Messaging architecture: claim ladder, proofs, tone guardrails",
      body: "Positioning tells you what to claim. Messaging architecture tells you how to claim it across every piece of copy, in a way that stays consistent, provable, and doesn’t overreach. Without an architecture, every writer produces their own version of the positioning — and the gaps compound.",
    },
    {
      id: "mg-m04-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "Sequence claims so variants stay on-brand and falsifiable",
      body: "Architecture has three levels: through-line (the single most important claim everything else supports), pillars (3-4 distinct claims each supported by separate proofs), proof hooks (specific evidence, metrics, or case details making each pillar credible). When AI or multiple writers produce variants, they work within the architecture. Without it, AI finds the most plausible-sounding version of a claim, not the most defensible.",
    },
    {
      id: "mg-m04-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The A/B test that produced contradictory claims",
      body: "A marketing team runs 8 AI-generated ad variants. Variant 2 claims ‘10x faster deployment.’ Variant 6 claims ‘zero-configuration setup.’ Variant 8 claims ‘enterprise-grade security.’ All three are plausible but backed by different proofs and represent different claims about the product’s primary benefit. A prospect who sees all three has no coherent picture of what they’re buying.",
      example: "Before generating variants, write the through-line and three proofs. Any variant that can’t trace to one of those proofs should be cut before testing — otherwise you’re testing confusion, not messaging.",
    },
    {
      id: "mg-m04-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might a spreadsheet or headline tempt you to skip downside or definitions? Name one guardrail.",
    },
    {
      id: "mg-m04-lesson-lt-next",
      type: "next_step",
      body: "Next: mg-m06 — messaging architecture defines what to say. Channel economics determines where to say it, with what budget, and with what kill criteria if it isn’t working.",
    }
  ],

  "marketing-and-growth::mg-m04-practice": [
    {
      id: "mg-m04-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "mg-m04-practice-lt-task",
      type: "practice_task",
      title: "Practice · Messaging architecture: claim ladder, proofs, tone guardrails",
      bullets: [
        "1. Message matrix: segment × pillar × proof hook × risk flag.",
        "2. Proof gap sheet: claim → proof needed → owner → deadline.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "mg-m04-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Messaging architecture one-pager",
    },
    {
      id: "mg-m04-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "marketing-and-growth::mg-m06-lesson": [
    {
      id: "mg-m06-lesson-lt-intro",
      type: "intro",
      eyebrow: "Applied reasoning",
      title: "Channel economics: fit, workload, sequencing experiments",
      body: "Channel selection is a capital allocation decision. Most teams treat it as a checklist — SEO, paid social, email, content, all at once at sub-critical mass. The economics of channel selection are about concentration: where does your audience actually make buying decisions, and can you reach them there with the budget and creative capacity you actually have?",
    },
    {
      id: "mg-m06-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "Score channel fit against audience behavior and capital capacity",
      body: "Three factors determine channel fit: audience presence (does your target buying situation cluster here?), message fit (does the proof format required match what this channel rewards?), and capital capacity (can you sustain the spend required to reach critical mass long enough to get a signal?). A channel that fails any one of these is a bad bet regardless of how well it’s worked elsewhere.",
    },
    {
      id: "mg-m06-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The startup that ran paid search at sub-critical spend",
      body: "A B2B SaaS company allocates $3,000/month to Google Ads. At the category’s CPC, they generate approximately 80-120 clicks per week. Free trial converts at 2%, trial-to-paid at 15%. Result: ~1.4 new customers per week at a $535 CAC against a $420 LTV. They conclude ‘paid search doesn’t work for us.’ The channel wasn’t wrong. The spend was below the threshold to get a valid signal.",
      example: "Channel viability test: calculate the minimum monthly spend required to get 30 conversions per month on this channel. If you can’t sustain that for 90 days, don’t start this channel yet.",
    },
    {
      id: "mg-m06-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might a spreadsheet or headline tempt you to skip downside or definitions? Name one guardrail.",
    },
    {
      id: "mg-m06-lesson-lt-next",
      type: "next_step",
      body: "Next: mg-m08 — channel drives traffic to your conversion system. mg-m08 addresses how to diagnose and fix funnel friction without dark patterns.",
    }
  ],

  "marketing-and-growth::mg-m07-practice": [
    {
      id: "mg-m07-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "mg-m07-practice-lt-task",
      type: "practice_task",
      title: "Practice · Integrated campaign design: offer logic, narrative arc, landing story",
      bullets: [
        "1. Campaign brief: KPI targets + unknowns listed + smallest test next + owners named.",
        "2. Landing outline mapped to objections with proof placement + funnel-stage success metric per step.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "mg-m07-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Campaign brief v1 + campaign KPI ladder",
    },
    {
      id: "mg-m07-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "marketing-and-growth::mg-m08-lesson": [
    {
      id: "mg-m08-lesson-lt-intro",
      type: "intro",
      eyebrow: "Professional judgment",
      title: "Conversion systems: friction, trust, ethics, follow-through",
      body: "Most conversion problems are not messaging problems — they’re friction problems. The prospect understood the offer, was interested, and stopped. Where they stopped is a diagnostic question, not a copywriting question. This module builds the habit of reading funnel data as a map of friction points and trust gaps, not as a report on messaging quality.",
    },
    {
      id: "mg-m08-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "Qualitative funnel diagnosis must precede A/B testing",
      body: "The common error: low conversion rate → write new copy → A/B test. The more useful sequence: walk the funnel as a skeptical prospect → identify the 2-3 points where a motivated buyer would pause or abandon → hypothesize what the friction is → test the specific fix. A/B testing copy variations when the problem is missing trust proof produces accurate measurement of the wrong thing.",
    },
    {
      id: "mg-m08-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The checkout page with a 65% abandonment rate",
      body: "An e-commerce company has 65% cart abandonment. They A/B test four headline variations over eight weeks. All four lose to the control. A usability walkthrough finds the actual issue: three unrecognized security badges, shipping cost appearing for the first time at checkout (not on the product page), and required account creation before purchase. None of these are headline problems.",
      example: "Friction audit protocol: complete your own checkout/signup as a first-time user with no prior knowledge. Document every point where you hesitate. That list is your friction map. Address friction before testing copy.",
    },
    {
      id: "mg-m08-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might a spreadsheet or headline tempt you to skip downside or definitions? Name one guardrail.",
    },
    {
      id: "mg-m08-lesson-lt-next",
      type: "next_step",
      body: "Next: mg-m09 — conversion systems generate the data. mg-m09 builds the KPI tree and analytics discipline that tells you whether what you’re seeing is real growth or noise.",
    }
  ],

  "marketing-and-growth::mg-m08-practice": [
    {
      id: "mg-m08-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "mg-m08-practice-lt-task",
      type: "practice_task",
      title: "Practice · Conversion systems: friction, trust, ethics, follow-through",
      bullets: [
        "1. Heuristic walkthrough of live funnel: annotate friction points + hypothesized KPI impact.",
        "2. Rewrite three microcopy moments with ethics + rationale notes + expected metric direction.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "mg-m08-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Conversion friction audit + funnel KPI notes + ethical microcopy sheet",
    },
    {
      id: "mg-m08-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "marketing-and-growth::mg-m09-lesson": [
    {
      id: "mg-m09-lesson-lt-intro",
      type: "intro",
      eyebrow: "Professional judgment",
      title: "Growth KPIs, dashboards, and analytics under uncertainty",
      body: "Growth dashboards are built to tell a story. The story is usually more optimistic than the data supports because of the defaults: filters that exclude bad cohorts, attribution that double-counts conversions, and time windows that start after the worst period. This module builds the discipline of reading what the dashboard can and cannot answer.",
    },
    {
      id: "mg-m09-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "Build a compact growth KPI tree from the north-star outcome down",
      body: "A growth KPI tree has three levels: north-star outcome (what does healthy growth look like for this business?), channel/campaign drivers (which activities are contributing and by how much?), diagnostic metrics (what tells you why a driver is moving?). Every metric in the tree must connect to a decision. A metric that appears on the dashboard but doesn’t connect to any decision is decoration. Cut it.",
    },
    {
      id: "mg-m09-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The attributed revenue number that was being double-counted",
      body: "A growth team reports $180K in attributed revenue. Finance reports Q3 revenue at $140K. In audit: both Meta and Google claimed attribution for the same conversions using overlapping 30-day click windows. A customer who clicked a Meta ad 25 days ago and a Google ad 3 days ago was counted in both. Real attributed revenue was $95K.",
      example: "Attribution audit: for any attributed revenue figure, ask (1) what is the attribution model? (2) what is the attribution window? (3) what happens when a customer touches multiple channels? If question 3 answer is ‘both get credit,’ the number is inflated.",
    },
    {
      id: "mg-m09-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might a spreadsheet or headline tempt you to skip downside or definitions? Name one guardrail.",
    },
    {
      id: "mg-m09-lesson-lt-next",
      type: "next_step",
      body: "Next: mg-m10 — the growth KPI discipline applies directly to evaluating AI-generated content. mg-m10 addresses how to use AI in the growth stack without letting it outrun the evidence.",
    }
  ],

  "marketing-and-growth::mg-m09-practice": [
    {
      id: "mg-m09-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "mg-m09-practice-lt-task",
      type: "practice_task",
      title: "Practice · Growth KPIs, dashboards, and analytics under uncertainty",
      bullets: [
        "1. Experiment brief: hypothesis, unit of randomization, ethics, minimum detectable effect, primary KPI + guardrails.",
        "2. Annotate a growth dashboard or export pack: write the decision each chart supports and three misread risks.",
        "3. Weekly growth metrics memo: learning, surprises, kill/pivot triggers, next action—not activity recap.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "mg-m09-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Growth KPI tree + experiment brief + weekly dashboard review memo template",
    },
    {
      id: "mg-m09-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "marketing-and-growth::mg-m09-revision": [
    {
      id: "mg-m09-revision-lt-intro",
      type: "intro",
      eyebrow: "Revision gate",
      title: "Tighten · Growth KPIs, dashboards, and analytics under uncertainty",
      body: "Compress misunderstandings before they compound. Prefer precise claims, cited limits, and falsifiers—no glossary theater.",
    },
    {
      id: "mg-m09-revision-lt-recap",
      type: "recap",
      title: "Compress to checks",
      bullets: [
        "Build a compact growth KPI tree (north-star growth outcome → channel/campaign drivers → diagnostics).",
        "Explain attribution ceilings, platform bias, and confounders to executives plainly.",
        "Design experiments sized to decisions—kill rules when KPIs or guardrails breach.",
      ],
    },
    {
      id: "mg-m09-revision-lt-task",
      type: "practice_task",
      title: "Structured gate",
      prompt: "In 6–10 sentences: (1) what you believe now, (2) what would falsify it, (3) what artifact proves you applied this module.",
    },
    {
      id: "mg-m09-revision-lt-next",
      type: "next_step",
      body: "Proceed only if you would defend these claims aloud to a skeptical peer.",
    }
  ],

  "marketing-and-growth::mg-m10-lesson": [
    {
      id: "mg-m10-lesson-lt-intro",
      type: "intro",
      eyebrow: "Integration",
      title: "AI in the growth stack: amplification with verification",
      body: "AI increases the speed at which you can produce copy, variants, and research summaries. It increases with equal speed the rate at which unverified claims, hallucinated statistics, and off-brand tone can enter production. The discipline is not ‘use AI less’ — it’s ‘verify before shipping at the same speed you generate.’",
    },
    {
      id: "mg-m10-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "A rubric-based QA layer is the minimum before anything ships",
      body: "The failure mode: team generates 20 ad variants with AI, picks the 5 that ‘sound right,’ and ships them. What gets skipped: fact-checking specific claims, comparing against the proof doctrine from messaging architecture, checking for brand voice violations, reviewing for dark patterns. The rubric converts the review from a subjective judgment (‘this sounds good’) into a checklist two people can agree on.",
    },
    {
      id: "mg-m10-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The campaign that shipped a hallucinated statistic",
      body: "A content team uses AI to draft a thought leadership article. The AI includes: ‘73% of consumers prefer personalized recommendations.’ It sounds familiar. It ships. Six weeks later, a prospect asks for the source. The team can’t find it. The nearest source is a 2017 Salesforce report with a different figure and different question wording. The article has been shared 400 times with a bad citation.",
      example: "Claims check before shipping: for every quantitative claim in AI-generated content, run a 60-second search for the primary source. If you can’t find it in 60 seconds, rewrite the claim as a directional observation ('most consumers' instead of '73%').",
    },
    {
      id: "mg-m10-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might a spreadsheet or headline tempt you to skip downside or definitions? Name one guardrail.",
    },
    {
      id: "mg-m10-lesson-lt-next",
      type: "next_step",
      body: "Next: mg-m11 — the campaign dossier integrates your audience evidence, positioning, messaging, channel selection, conversion approach, KPI tree, and AI QA discipline into one defensible artifact.",
    }
  ],

  "marketing-and-growth::mg-m10-practice": [
    {
      id: "mg-m10-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "mg-m10-practice-lt-task",
      type: "practice_task",
      title: "Practice · AI in the growth stack: amplification with verification",
      bullets: [
        "1. Score a variant batch against rubric + revise weakest.",
        "2. Red-team AI-generated claims against proof doctrine.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "mg-m10-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "AI-assisted QA checklist",
    },
    {
      id: "mg-m10-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "marketing-and-growth::mg-m10-revision": [
    {
      id: "mg-m10-revision-lt-intro",
      type: "intro",
      eyebrow: "Revision gate",
      title: "Tighten · AI in the growth stack: amplification with verification",
      body: "Compress misunderstandings before they compound. Prefer precise claims, cited limits, and falsifiers—no glossary theater.",
    },
    {
      id: "mg-m10-revision-lt-recap",
      type: "recap",
      title: "Compress to checks",
      bullets: [
        "Insert rubric-based QA before anything ships.",
        "Maintain guardrails on claims and tone.",
        "Red-team outputs for hallucinated proof.",
      ],
    },
    {
      id: "mg-m10-revision-lt-task",
      type: "practice_task",
      title: "Structured gate",
      prompt: "In 6–10 sentences: (1) what you believe now, (2) what would falsify it, (3) what artifact proves you applied this module.",
    },
    {
      id: "mg-m10-revision-lt-next",
      type: "next_step",
      body: "Proceed only if you would defend these claims aloud to a skeptical peer.",
    }
  ],

  "marketing-and-growth::mg-m11-lesson": [
    {
      id: "mg-m11-lesson-lt-intro",
      type: "intro",
      eyebrow: "Integration",
      title: "Campaign dossier rehearsal: critique, tighten, ship v1",
      body: "A campaign dossier is not a summary of what you’re planning — it’s a record of the decisions you made, the evidence you used, the alternatives you considered, and the kill criteria you set. It’s the document a skeptical CFO or a future you can use to evaluate whether the decisions were sound, regardless of outcome.",
    },
    {
      id: "mg-m11-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "Integrate artifacts into a single narrative arc with traceable decisions",
      body: "The dossier passes integration when: audience evidence explains the positioning, positioning is reflected in messaging architecture, messaging connects to channel selection rationale, channel selection includes KPI expectations, and KPI expectations have kill criteria. Any missing link in that chain is an unexamined assumption. Unexamined assumptions that aren’t named in the dossier are bets that can fail silently.",
    },
    {
      id: "mg-m11-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The campaign that was well-executed on the wrong positioning",
      body: "A team runs a well-structured campaign: clear targeting, good creative, solid A/B test setup, weekly KPI reviews. Results: below-target conversion despite above-average click-through. The dossier audit shows the messaging was built on an audience pain point that was never verified in research. The campaign was executed precisely. The evidence base was wrong. A dossier review before launch would have surfaced the unverified assumption.",
      example: "Dossier review question: for every claim in this dossier, can I trace it to either (a) specific evidence, or (b) an explicit stated assumption with a kill criterion if wrong? If a claim has neither, it’s a hidden bet.",
    },
    {
      id: "mg-m11-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might a spreadsheet or headline tempt you to skip downside or definitions? Name one guardrail.",
    },
    {
      id: "mg-m11-lesson-lt-next",
      type: "next_step",
      body: "This is the marketing-and-growth capstone. Bring your dossier to peer critique with this question: ‘Which assumption in this dossier are you least confident about?’ Know that answer before you present.",
    }
  ],

  "marketing-and-growth::mg-m11-practice": [
    {
      id: "mg-m11-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "mg-m11-practice-lt-task",
      type: "practice_task",
      title: "Practice · Campaign dossier rehearsal: critique, tighten, ship v1",
      bullets: [
        "1. Structured peer critique using dossier rubric.",
        "2. Revision log: cuts, additions, deferred ideas.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "mg-m11-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Growth dossier v1",
    },
    {
      id: "mg-m11-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "marketing-and-growth::mg-m11-recap": [
    {
      id: "mg-m11-recap-lt-intro",
      type: "intro",
      eyebrow: "Consolidation",
      title: "Consolidate · Campaign dossier rehearsal: critique, tighten, ship v1",
      body: "Build a recap artifact you will reopen: keywords, failure modes, reuse rules—written for future-you under stress.",
    },
    {
      id: "mg-m11-recap-lt-keys",
      type: "key_points",
      title: "Carry-forward pack",
      bullets: [
        "Keyword claim: Integrate artifacts into single narrative arc.",
        "Failure mode to watch: Merge spine, experiments, assets, measurement, and risk sections into one CFO- and customer-credible dossier—trace each …",
        "Reuse rule: when to apply vs rethink this module",
      ],
    },
    {
      id: "mg-m11-recap-lt-reflect",
      type: "reflection_prompt",
      title: "Calibration",
      prompt: "What would convince you this module did not stick—what signal would you look for in your next deliverable?",
    },
    {
      id: "mg-m11-recap-lt-next",
      type: "next_step",
      body: "Archive the recap where your future self will actually find it.",
    }
  ],

  "marketing-and-growth::mg-m11-revision": [
    {
      id: "mg-m11-revision-lt-intro",
      type: "intro",
      eyebrow: "Revision gate",
      title: "Tighten · Campaign dossier rehearsal: critique, tighten, ship v1",
      body: "Compress misunderstandings before they compound. Prefer precise claims, cited limits, and falsifiers—no glossary theater.",
    },
    {
      id: "mg-m11-revision-lt-recap",
      type: "recap",
      title: "Compress to checks",
      bullets: [
        "Integrate artifacts into single narrative arc.",
        "Accept critique without expanding scope blindly.",
        "Ship v1 strong enough to learn from.",
      ],
    },
    {
      id: "mg-m11-revision-lt-task",
      type: "practice_task",
      title: "Structured gate",
      prompt: "In 6–10 sentences: (1) what you believe now, (2) what would falsify it, (3) what artifact proves you applied this module.",
    },
    {
      id: "mg-m11-revision-lt-next",
      type: "next_step",
      body: "Proceed only if you would defend these claims aloud to a skeptical peer.",
    }
  ],

  "money-and-finance::mf-m01-practice": [
    {
      id: "mf-m01-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "mf-m01-practice-lt-task",
      type: "practice_task",
      title: "Practice · Cash vs. profit vs. runway—language tied to decisions",
      bullets: [
        "1. Sanity-pass a simple P&L against a rolling cash planner for same month.",
        "2. Diagram timing for three recurring obligations with due dates.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "mf-m01-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Cash vs accrual reconciliation sheet",
    },
    {
      id: "mf-m01-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "money-and-finance::mf-m01-revision": [
    {
      id: "mf-m01-revision-lt-intro",
      type: "intro",
      eyebrow: "Revision gate",
      title: "Tighten · Cash vs. profit vs. runway—language tied to decisions",
      body: "Compress misunderstandings before they compound. Prefer precise claims, cited limits, and falsifiers—no glossary theater.",
    },
    {
      id: "mf-m01-revision-lt-recap",
      type: "recap",
      title: "Compress to checks",
      bullets: [
        "Translate cash in/out vs. accrual snapshots for one context.",
        "Identify timing traps (payroll, deposits, inventory, net terms).",
        "Ask finance questions anchored to upcoming decisions—not vague worry.",
      ],
    },
    {
      id: "mf-m01-revision-lt-task",
      type: "practice_task",
      title: "Structured gate",
      prompt: "In 6–10 sentences: (1) what you believe now, (2) what would falsify it, (3) what artifact proves you applied this module.",
    },
    {
      id: "mf-m01-revision-lt-next",
      type: "next_step",
      body: "Proceed only if you would defend these claims aloud to a skeptical peer.",
    }
  ],

  "money-and-finance::mf-m02-lesson": [
    {
      id: "mf-m02-lesson-lt-intro",
      type: "intro",
      eyebrow: "Grounding",
      title: "Budget as operating instrument: envelopes, variance, owners",
      body: "A budget that nobody looks at until there’s a problem isn’t a budget — it’s a document. The discipline of budget design is making categories specific enough that a meaningful overspend is immediately visible, and owned by someone who can explain it within 48 hours.",
    },
    {
      id: "mf-m02-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "Pick categories that change behavior, not categories that look comprehensive",
      body: "The failure mode: a budget with 40 line items where overspends spread thin and nobody notices. A useful budget has 8-12 categories — each granular enough that a 20% variance triggers a real question, but not so granular that every small purchase is its own line. Attach an owner to each category who can explain variance within 48 hours.",
    },
    {
      id: "mf-m02-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The 'marketing' line that absorbed four different problems",
      body: "A startup budgets $15K/month for ‘marketing.’ Over three months it inflates to $22K. In review: $4K in ads nobody paused, $2K in design invoices from Q1 not matched, $1K in SaaS subscriptions nobody could identify. The aggregate category made each problem invisible. Split into paid ads, content production, tools, and agency — each variance becomes self-explanatory.",
      example: "Budget health check: if a 20% overspend in any category produces the response ‘I’m not sure what happened’ rather than ‘I know exactly what that was,’ the category is too broad.",
    },
    {
      id: "mf-m02-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might a spreadsheet or headline tempt you to skip downside or definitions? Name one guardrail.",
    },
    {
      id: "mf-m02-lesson-lt-next",
      type: "next_step",
      body: "Next: mf-m03 — budget gives you the spending structure. Contribution and payback thinking tells you which spending generates more money than it costs.",
    }
  ],

  "money-and-finance::mf-m02-practice": [
    {
      id: "mf-m02-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "mf-m02-practice-lt-task",
      type: "practice_task",
      title: "Practice · Budget as operating instrument: envelopes, variance, owners",
      bullets: [
        "1. Budget draft with variance triggers + escalation owner per category.",
        "2. Rewrite one mushy category into measurable definition.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "mf-m02-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Category budget draft + variance triggers",
    },
    {
      id: "mf-m02-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "money-and-finance::mf-m03-lesson": [
    {
      id: "mf-m03-lesson-lt-intro",
      type: "intro",
      eyebrow: "Grounding",
      title: "Contribution and payback thinking without spreadsheet idolatry",
      body: "A contribution sketch answers one question: if you sell one unit at this price, after variable costs, how much is left toward fixed costs and profit? The answer doesn’t require a spreadsheet. It requires three verifiable numbers: price, variable cost, and volume assumption. The danger is trusting a sophisticated model before you’ve validated those three.",
    },
    {
      id: "mf-m03-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "Sketch contribution at legible fidelity before building a model",
      body: "Spreadsheet idolatry: the model is so detailed that changing one assumption cascades through 40 cells incomprehensibly. Legible fidelity: a 5-row sketch showing price, variable costs, contribution per unit, fixed cost load, and break-even volume. When an investor asks ‘walk me through the unit economics,’ a legible sketch is more credible than a model you can’t explain under pressure.",
    },
    {
      id: "mf-m03-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The model that proved profitability at a volume nobody could reach",
      body: "A food product startup builds a 200-row spreadsheet showing profitability at 10,000 units/month. Technically correct. In the investor meeting: ‘What’s your path to 10,000 units?’ No answer. In the manual sketch afterward: at 2,000 units, contribution goes negative because of packaging minimums and order quantities the model had averaged out at scale. The spreadsheet was modeling the right business at the wrong volume.",
      example: "Sensitivity rule: run any contribution model at 25%, 50%, and 100% of assumed volume. If the business only works at 100% of plan, the model is a plan, not an operating reality.",
    },
    {
      id: "mf-m03-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might a spreadsheet or headline tempt you to skip downside or definitions? Name one guardrail.",
    },
    {
      id: "mf-m03-lesson-lt-next",
      type: "next_step",
      body: "Next: mf-m04 — contribution shows unit economics. Forecasting combines unit economics with volume, timing, and scenario assumptions into a planning tool.",
    }
  ],

  "money-and-finance::mf-m03-practice": [
    {
      id: "mf-m03-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "mf-m03-practice-lt-task",
      type: "practice_task",
      title: "Practice · Contribution and payback thinking without spreadsheet idolatry",
      bullets: [
        "1. Manual contribution sketch + sensitivity grid.",
        "2. Write kill criteria for when to revisit pricing or cost structure.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "mf-m03-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Contribution sketch + sensitivity grid",
    },
    {
      id: "mf-m03-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "money-and-finance::mf-m04-lesson": [
    {
      id: "mf-m04-lesson-lt-intro",
      type: "intro",
      eyebrow: "Applied reasoning",
      title: "Forecasting as scenario chore, not prophecy",
      body: "The forecast you present as a single number is one you’ll be held accountable for as a promise. The more useful discipline is three scenarios: one where key assumptions hold, one where they’re 30% wrong, and one where the worst plausible thing happens. The point is not to predict the future — it’s to identify which assumptions need monitoring.",
    },
    {
      id: "mf-m04-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "Build narratives with an explicit driver list, not a single-point estimate",
      body: "A forecast without a driver list is a number. A forecast with a driver list is a testable hypothesis. The drivers are the 4-5 assumptions that most move the outcome: customer acquisition rate, average contract value, churn, payback period. Name them, state what you assumed, and decide now what ‘wrong enough to revise’ looks like for each.",
    },
    {
      id: "mf-m04-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The board deck that showed one number",
      body: "A SaaS company presents a $4M ARR forecast to their board built on 40+ assumptions. Board member: ‘What’s your churn assumption?’ Founder looks it up: 8% annual. ‘And if it’s 15%?’ The model hasn’t been tested at that input. Board confidence drops — not because the forecast is wrong, but because the team doesn’t know how sensitive it is to the most important risk.",
      example: "Driver stress test: identify the single assumption that, if wrong by 2x, most changes your outcome. That assumption needs a monitoring plan and an explicit kill criterion.",
    },
    {
      id: "mf-m04-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might a spreadsheet or headline tempt you to skip downside or definitions? Name one guardrail.",
    },
    {
      id: "mf-m04-lesson-lt-next",
      type: "next_step",
      body: "Next: mf-m06 — forecasts assume certain financing conditions. Debt and leverage literacy tells you how to compare instruments by obligation shape, covenant risk, and optionality — not just headline rate.",
    }
  ],

  "money-and-finance::mf-m04-practice": [
    {
      id: "mf-m04-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "mf-m04-practice-lt-task",
      type: "practice_task",
      title: "Practice · Forecasting as scenario chore, not prophecy",
      bullets: [
        "1. Three-scenario worksheet with driver sensitivity notes.",
        "2. Pre-mortem on optimistic scenario—what breaks first?",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "mf-m04-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Scenario memo v1",
    },
    {
      id: "mf-m04-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "money-and-finance::mf-m06-lesson": [
    {
      id: "mf-m06-lesson-lt-intro",
      type: "intro",
      eyebrow: "Applied reasoning",
      title: "Debt, leverage, risk appetite—without catastrophizing",
      body: "Most people learn about debt in extremes: either the tool that powers growth or the thing that bankrupted someone. The actual skill is comparing instruments on the dimensions that matter operationally: what does the payment obligation look like under a stress scenario, what behavioral covenants does this instrument require, and what optionality does it remove?",
    },
    {
      id: "mf-m06-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "Compare instruments by payment shape, covenant risk, and optionality lost",
      body: "Two instruments with the same nominal rate can have very different risk profiles. A term loan with a fixed payment representing 30% of stressed revenue is different from revenue-based financing that scales payments down when revenue drops. The covenant question is often more consequential than the rate: a minimum cash balance or EBITDA covenant constrains operating decisions in ways the interest rate doesn’t reveal.",
    },
    {
      id: "mf-m06-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The loan with an acceptable rate and an unacceptable covenant",
      body: "A startup takes a $500K term loan at 8% — below the founder’s 10% mental hurdle. The loan includes a covenant: maintain $150K minimum cash. Eight months later, a large customer delays a $120K invoice. Cash drops to $140K. The lender can accelerate the loan. What appeared to be a conservative below-hurdle-rate loan becomes a crisis because of a covenant never stress-tested against delayed payment.",
      example: "Covenant stress test: for any debt instrument, identify every behavioral covenant and ask: what operational scenario would trigger this? If any scenario with >10% probability would trigger a violation, the instrument has hidden risk.",
    },
    {
      id: "mf-m06-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might a spreadsheet or headline tempt you to skip downside or definitions? Name one guardrail.",
    },
    {
      id: "mf-m06-lesson-lt-next",
      type: "next_step",
      body: "Next: mf-m08 — financing decisions create obligations. Reporting discipline is what keeps stakeholders informed and trust intact when results diverge from forecast.",
    }
  ],

  "money-and-finance::mf-m06-revision": [
    {
      id: "mf-m06-revision-lt-intro",
      type: "intro",
      eyebrow: "Revision gate",
      title: "Tighten · Debt, leverage, risk appetite—without catastrophizing",
      body: "Compress misunderstandings before they compound. Prefer precise claims, cited limits, and falsifiers—no glossary theater.",
    },
    {
      id: "mf-m06-revision-lt-recap",
      type: "recap",
      title: "Compress to checks",
      bullets: [
        "Compare instruments by payment shape, covenant risk, optionality.",
        "State risk appetite as numbers + emotional facts.",
        "Escalate to qualified help with crisp questions.",
      ],
    },
    {
      id: "mf-m06-revision-lt-task",
      type: "practice_task",
      title: "Structured gate",
      prompt: "In 6–10 sentences: (1) what you believe now, (2) what would falsify it, (3) what artifact proves you applied this module.",
    },
    {
      id: "mf-m06-revision-lt-next",
      type: "next_step",
      body: "Proceed only if you would defend these claims aloud to a skeptical peer.",
    }
  ],

  "money-and-finance::mf-m07-practice": [
    {
      id: "mf-m07-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "mf-m07-practice-lt-task",
      type: "practice_task",
      title: "Practice · Negotiating money: packages, trade space, calm process",
      bullets: [
        "1. Prep sheet for next real money conversation.",
        "2. Short role-play debrief on tone + clarity.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "mf-m07-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Money negotiation prep sheet",
    },
    {
      id: "mf-m07-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "money-and-finance::mf-m08-lesson": [
    {
      id: "mf-m08-lesson-lt-intro",
      type: "intro",
      eyebrow: "Professional judgment",
      title: "Numbers that earn trust: reporting rhythm and definitions",
      body: "Financial reporting loses credibility through two failure modes: bad news that arrives late, and inconsistent definitions that change quarter to quarter. Both failures are worse than having bad numbers — they make the reporting itself unreliable, and reliability of reporting is separable from quality of results.",
    },
    {
      id: "mf-m08-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "Design a reporting rhythm where definitions are fixed and bad news travels early",
      body: "Trust-building reporting has three components: consistent definitions (if ‘revenue’ means booked ARR, it means that every quarter), early bad news protocol (if a metric will miss by more than X%, the stakeholder hears it in a conversation before the report), and cadence reliability (the report arrives on the same schedule regardless of how the numbers look).",
    },
    {
      id: "mf-m08-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The board that found out last",
      body: "A startup’s Q3 revenue came in 40% below forecast. The CFO sends the board report on the usual schedule — two weeks after quarter end. The board discovers the miss in the report. In the call that follows: management knew in week 6 of the quarter they were tracking significantly below plan. Three months of catch-up planning that could have been done collaboratively was done alone. The miss is recoverable. The trust damage is harder to repair.",
      example: "Early warning protocol: define a threshold — ‘if we are tracking more than 20% below any forecast line at the midpoint of the period, we notify the board by end of that week.’ Write it down. Follow it regardless of how uncomfortable the conversation is.",
    },
    {
      id: "mf-m08-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might a spreadsheet or headline tempt you to skip downside or definitions? Name one guardrail.",
    },
    {
      id: "mf-m08-lesson-lt-next",
      type: "next_step",
      body: "Next: mf-m09 — good reporting requires good systems. mf-m09 builds the recurring decision calendar that makes financial oversight a habit, not a crisis response.",
    }
  ],

  "money-and-finance::mf-m08-practice": [
    {
      id: "mf-m08-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "mf-m08-practice-lt-task",
      type: "practice_task",
      title: "Practice · Numbers that earn trust: reporting rhythm and definitions",
      bullets: [
        "1. Critique a noisy report; propose cleaner structure.",
        "2. Rewrite anxious metrics paragraph into calm story + actions.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "mf-m08-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Finance narrative + definitions appendix",
    },
    {
      id: "mf-m08-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "money-and-finance::mf-m09-lesson": [
    {
      id: "mf-m09-lesson-lt-intro",
      type: "intro",
      eyebrow: "Integration",
      title: "Systems for recurring money decisions",
      body: "Most financial decisions that go wrong are not wrong because of bad analysis in the moment. They go wrong because nobody was looking at the right metric at the right time. The discipline is a calendar of decision triggers: dates and thresholds that force a review before a problem becomes a crisis.",
    },
    {
      id: "mf-m09-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "Trigger-based reviews catch problems when corrective options are most available",
      body: "A scheduled monthly review is necessary but insufficient. Trigger-based review adds a second layer: if cash drops below a threshold, if a receivable ages past 60 days, if a vendor invoice arrives 30% over budget — these events should automatically produce a review, not wait for the next scheduled meeting. The further a problem develops before a review, the fewer options remain.",
    },
    {
      id: "mf-m09-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The receivable that aged for 90 days without a call",
      body: "A consulting firm has a $45K invoice outstanding. AR aging is reviewed monthly. At 30 days it appears — no action. At 60 days — no action because ‘we’re in ongoing work.’ At 90 days the relationship manager leaves. The new manager calls and finds a billing dispute that could have been resolved in week 3. The firm eventually collects $30K and writes off $15K.",
      example: "Receivables trigger: any invoice over $X unpaid at 30 days gets a personal call from the owner or finance lead — not an automated reminder. Set this as a calendar trigger, not a monthly report item.",
    },
    {
      id: "mf-m09-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might a spreadsheet or headline tempt you to skip downside or definitions? Name one guardrail.",
    },
    {
      id: "mf-m09-lesson-lt-next",
      type: "next_step",
      body: "Next: mf-m10 — cash management, contribution, forecasting, leverage, reporting, and decision systems are the components of a financial operating pack. The capstone integrates them.",
    }
  ],

  "money-and-finance::mf-m09-practice": [
    {
      id: "mf-m09-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "mf-m09-practice-lt-task",
      type: "practice_task",
      title: "Practice · Systems for recurring money decisions",
      bullets: [
        "1. Finance calendar with triggers + owners.",
        "2. Quarterly review ritual outline with agenda.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "mf-m09-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Finance operating calendar",
    },
    {
      id: "mf-m09-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "money-and-finance::mf-m10-lesson": [
    {
      id: "mf-m10-lesson-lt-intro",
      type: "intro",
      eyebrow: "Integration",
      title: "Capstone rehearsal: integrate the pack",
      body: "The financial operating pack is not a report — it’s a set of instruments you use to run the business. A useful pack is the smallest version that lets you answer the questions you’re actually asked: how are we doing this month, when will we run out of cash if nothing changes, and what does ‘bad’ look like before it becomes an emergency?",
    },
    {
      id: "mf-m10-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "Assemble outputs into a coherent narrative that is self-explanatory to a financial reader",
      body: "The integration test: can you hand this pack to a new board member and have them understand your financial position, key risks, and what you’re watching — without a meeting to explain it? If the pack requires verbal explanation to make sense, it needs editing. Comprehensiveness is the enemy of usability here.",
    },
    {
      id: "mf-m10-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The investor who asked for 'the one-pager' and got 40 slides",
      body: "A founder sends their investor a 40-slide financial deck for the quarterly update. The investor responds: ‘Can you send me a one-pager with cash position, burn, runway, and the three things you’re watching?’ The founder doesn’t have a one-pager. The 40-slide deck is comprehensive. It is not a financial operating instrument.",
      example: "Pack minimum viable test: can you answer these four questions without opening a model? (1) Current cash position? (2) Monthly burn? (3) Runway at current burn? (4) The one metric that, if it deteriorates, demands immediate action? If any answer takes more than 30 seconds to retrieve, the pack isn’t working as an instrument.",
    },
    {
      id: "mf-m10-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might a spreadsheet or headline tempt you to skip downside or definitions? Name one guardrail.",
    },
    {
      id: "mf-m10-lesson-lt-next",
      type: "next_step",
      body: "This is the money-and-finance capstone. Share your pack with one stakeholder outside your immediate team and ask: ‘What question does this not answer that you’d want answered?’ That’s your next revision.",
    }
  ],

  "money-and-finance::mf-m10-practice": [
    {
      id: "mf-m10-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "mf-m10-practice-lt-task",
      type: "practice_task",
      title: "Practice · Capstone rehearsal: integrate the pack",
      bullets: [
        "1. Walkthrough with reviewer using rubric.",
        "2. Second pass tightening numbers + narrative.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "mf-m10-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Finance action pack v1",
    },
    {
      id: "mf-m10-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "money-and-finance::mf-m10-recap": [
    {
      id: "mf-m10-recap-lt-intro",
      type: "intro",
      eyebrow: "Consolidation",
      title: "Consolidate · Capstone rehearsal: integrate the pack",
      body: "Build a recap artifact you will reopen: keywords, failure modes, reuse rules—written for future-you under stress.",
    },
    {
      id: "mf-m10-recap-lt-keys",
      type: "key_points",
      title: "Carry-forward pack",
      bullets: [
        "Keyword claim: Assemble outputs into coherent narrative.",
        "Failure mode to watch: Merge artifacts into one reusable pack—plain language, dated snapshots, critique, refresh plan.…",
        "Reuse rule: when to apply vs rethink this module",
      ],
    },
    {
      id: "mf-m10-recap-lt-reflect",
      type: "reflection_prompt",
      title: "Calibration",
      prompt: "What would convince you this module did not stick—what signal would you look for in your next deliverable?",
    },
    {
      id: "mf-m10-recap-lt-next",
      type: "next_step",
      body: "Archive the recap where your future self will actually find it.",
    }
  ],

  "money-and-finance::mf-m10-revision": [
    {
      id: "mf-m10-revision-lt-intro",
      type: "intro",
      eyebrow: "Revision gate",
      title: "Tighten · Capstone rehearsal: integrate the pack",
      body: "Compress misunderstandings before they compound. Prefer precise claims, cited limits, and falsifiers—no glossary theater.",
    },
    {
      id: "mf-m10-revision-lt-recap",
      type: "recap",
      title: "Compress to checks",
      bullets: [
        "Assemble outputs into coherent narrative.",
        "Invite trusted reviewer; log revisions.",
        "Commit to monthly refresh ritual.",
      ],
    },
    {
      id: "mf-m10-revision-lt-task",
      type: "practice_task",
      title: "Structured gate",
      prompt: "In 6–10 sentences: (1) what you believe now, (2) what would falsify it, (3) what artifact proves you applied this module.",
    },
    {
      id: "mf-m10-revision-lt-next",
      type: "next_step",
      body: "Proceed only if you would defend these claims aloud to a skeptical peer.",
    }
  ],

  "product-thinking::prd-m01-practice": [
    {
      id: "prd-m01-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "prd-m01-practice-lt-task",
      type: "practice_task",
      title: "Practice · Outcomes before outputs: behaviors, pains, proof gaps",
      bullets: [
        "1. Rewrite five “features” into outcome statements with measures.",
        "2. Journal last purchase: job, anxiety, alternate solutions.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "prd-m01-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Outcome rewrite sheet + jobs-to-be-done journal",
    },
    {
      id: "prd-m01-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "product-thinking::prd-m01-revision": [
    {
      id: "prd-m01-revision-lt-intro",
      type: "intro",
      eyebrow: "Revision gate",
      title: "Tighten · Outcomes before outputs: behaviors, pains, proof gaps",
      body: "Compress misunderstandings before they compound. Prefer precise claims, cited limits, and falsifiers—no glossary theater.",
    },
    {
      id: "prd-m01-revision-lt-recap",
      type: "recap",
      title: "Compress to checks",
      bullets: [
        "Rewrite feature ideas into measurable user or business outcomes.",
        "Separate problem diagnosis from favored solution.",
        "Catch solution attachment early.",
      ],
    },
    {
      id: "prd-m01-revision-lt-task",
      type: "practice_task",
      title: "Structured gate",
      prompt: "In 6–10 sentences: (1) what you believe now, (2) what would falsify it, (3) what artifact proves you applied this module.",
    },
    {
      id: "prd-m01-revision-lt-next",
      type: "next_step",
      body: "Proceed only if you would defend these claims aloud to a skeptical peer.",
    }
  ],

  "product-thinking::prd-m02-lesson": [
    {
      id: "prd-m02-lesson-lt-intro",
      type: "intro",
      eyebrow: "Grounding",
      title: "Discovery conversations that stay honest",
      body: "Discovery interviews go wrong in two directions: the interviewer leads the witness, or the participant performs helpfulness — telling you what they think you want to hear. Both failures produce data that looks useful and isn’t. The discipline is designing questions that make it easy for the participant to contradict your hypothesis.",
    },
    {
      id: "prd-m02-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "Draft prompts that make contradiction easy",
      body: "A leading question: ‘How frustrating is it when your tool is too slow?’ A non-leading question: ‘Walk me through the last time you felt stuck in your workflow.’ The first tells the participant what to feel. The second lets them tell you what happened. Test: if the participant answered ‘fine, actually,’ would that answer be useful? If yes, the question is non-leading.",
    },
    {
      id: "prd-m02-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The discovery session that confirmed what the team already believed",
      body: "A product team conducts 10 user interviews to validate that users want faster reporting. Eight mention reports positively in response to: ‘How important is reporting speed to you?’ In post-processing: the team never asked users to describe their actual workflow unprompted. The question structure selected for users who cared about reports; users who rarely used reports didn’t express that view.",
      example: "Bias check: for every question in your interview guide, ask: ‘Could a participant give a neutral or negative answer that would still be useful?’ If no, rewrite it.",
    },
    {
      id: "prd-m02-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might a spreadsheet or headline tempt you to skip downside or definitions? Name one guardrail.",
    },
    {
      id: "prd-m02-lesson-lt-next",
      type: "next_step",
      body: "Next: prd-m03 — discovery gives you raw material. Problem statements investors and builders can argue with turns that material into something defensible.",
    }
  ],

  "product-thinking::prd-m02-practice": [
    {
      id: "prd-m02-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "prd-m02-practice-lt-task",
      type: "practice_task",
      title: "Practice · Discovery conversations that stay honest",
      bullets: [
        "1. Interview guide + bias checklist.",
        "2. Mock interview + critique on neutrality.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "prd-m02-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Discovery interview guide + synthesis notes",
    },
    {
      id: "prd-m02-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "product-thinking::prd-m03-lesson": [
    {
      id: "prd-m03-lesson-lt-intro",
      type: "intro",
      eyebrow: "Grounding",
      title: "Problem statements investors and builders can argue with",
      body: "A problem statement that everyone agrees with is usually one that doesn’t mean anything. ‘Users struggle to find information’ is not a problem statement — it’s a symptom description so broad it justifies any solution. A good problem statement names who is affected, what specifically happens, and what evidence makes it real and significant enough to solve.",
    },
    {
      id: "prd-m03-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "A falsifiable problem statement can be wrong — that’s what makes it useful",
      body: "A falsifiable statement: ‘Users at 50-200 person companies spend 3+ hours/week reconciling data across three export formats, confirmed across 6 of 8 interviews.’ You could discover the time estimate, segment, or significance is wrong. A non-falsifiable statement: ‘Users need a better experience.’ That’s not a problem statement — it’s a brief for a solution to an undefined problem.",
    },
    {
      id: "prd-m03-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The problem statement that justified everything",
      body: "A product team writes: ‘Users need a more streamlined workflow.’ Over the next quarter, every feature proposal references this. A new export format: ‘streamlines the workflow.’ A redesigned dashboard: ‘streamlines the workflow.’ Simplified onboarding: ‘streamlines the workflow.’ The statement was so broad it provided no filter. It was a universal justification machine, not a problem statement.",
      example: "Problem statement test: ask ‘what would make this statement false?’ If nothing would — if every solution maps to it — the statement is too broad. Rewrite by narrowing the segment, the behavior, and the evidence.",
    },
    {
      id: "prd-m03-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might a spreadsheet or headline tempt you to skip downside or definitions? Name one guardrail.",
    },
    {
      id: "prd-m03-lesson-lt-next",
      type: "next_step",
      body: "Next: prd-m04 — a sharp problem statement creates prioritization clarity. prd-m04 builds accountable trade-offs, not just a ranked list.",
    }
  ],

  "product-thinking::prd-m03-practice": [
    {
      id: "prd-m03-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "prd-m03-practice-lt-task",
      type: "practice_task",
      title: "Practice · Problem statements investors and builders can argue with",
      bullets: [
        "1. Problem matrix across segments + severity signals.",
        "2. Structured peer tear-down.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "prd-m03-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Problem matrix + falsifiable problem brief",
    },
    {
      id: "prd-m03-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "product-thinking::prd-m03-recap": [
    {
      id: "prd-m03-recap-lt-intro",
      type: "intro",
      eyebrow: "Consolidation",
      title: "Consolidate · Problem statements investors and builders can argue with",
      body: "Build a recap artifact you will reopen: keywords, failure modes, reuse rules—written for future-you under stress.",
    },
    {
      id: "prd-m03-recap-lt-keys",
      type: "key_points",
      title: "Carry-forward pack",
      bullets: [
        "Keyword claim: Produce falsifiable problem formulations.",
        "Failure mode to watch: Frame problems tightly enough to prioritize—who hurts, how you know, what proof would falsify.…",
        "Reuse rule: when to apply vs rethink this module",
      ],
    },
    {
      id: "prd-m03-recap-lt-reflect",
      type: "reflection_prompt",
      title: "Calibration",
      prompt: "What would convince you this module did not stick—what signal would you look for in your next deliverable?",
    },
    {
      id: "prd-m03-recap-lt-next",
      type: "next_step",
      body: "Archive the recap where your future self will actually find it.",
    }
  ],

  "product-thinking::prd-m04-lesson": [
    {
      id: "prd-m04-lesson-lt-intro",
      type: "intro",
      eyebrow: "Applied reasoning",
      title: "Prioritization with accountable trade-offs",
      body: "Prioritization frameworks produce rankings. Accountability for those rankings comes from documenting the scoring assumptions behind the ranking and the signal you will watch after each item ships. Without that documentation, the next prioritization exercise has no memory of what was predicted and what actually happened.",
    },
    {
      id: "prd-m04-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "Document scoring assumptions others can inspect, and the signal you’ll watch after shipping",
      body: "The failure mode: a PM scores 10 initiatives on impact and effort, produces a ranked list, and moves on. Nobody records what ‘impact’ meant for each initiative, what evidence supported the score, or what metric the team expected to move. When the quarterly review comes, the team can’t evaluate whether the decisions were sound.",
    },
    {
      id: "prd-m04-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The high-priority feature that didn’t move anything",
      body: "A product team prioritizes ‘smart notifications’ as their highest-confidence initiative, scored 9/10 on impact. Three months after shipping: daily active users unchanged. In retrospect, the scoring was based on qualitative user enthusiasm in interviews, not behavioral evidence that notification changes affect daily usage. The impact score was an opinion, documented as a number.",
      example: "Accountability pair: for every prioritized initiative write: ‘If this works, we will see [metric] move [direction] within [timeframe]. If we don’t, the initiative should be revisited.’ Make this visible to the team before building starts.",
    },
    {
      id: "prd-m04-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might a spreadsheet or headline tempt you to skip downside or definitions? Name one guardrail.",
    },
    {
      id: "prd-m04-lesson-lt-next",
      type: "next_step",
      body: "Next: prd-m06 — prioritization sets the agenda. Partnering with design and engineering without ping-pong is how you execute it without constant rework.",
    }
  ],

  "product-thinking::prd-m04-practice": [
    {
      id: "prd-m04-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "prd-m04-practice-lt-task",
      type: "practice_task",
      title: "Practice · Prioritization with accountable trade-offs",
      bullets: [
        "1. Rank five initiatives with explicit cuts + rationale + signal you would watch per item.",
        "2. Deprioritization note stakeholders can forward.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "prd-m04-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Prioritized backlog + prioritization signals memo",
    },
    {
      id: "prd-m04-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "product-thinking::prd-m06-lesson": [
    {
      id: "prd-m06-lesson-lt-intro",
      type: "intro",
      eyebrow: "Applied reasoning",
      title: "Partnering with design & engineering without ping-pong",
      body: "Product-design-engineering ping-pong is almost always a specification problem, not a relationship problem. When acceptance criteria are ambiguous, design makes one interpretation, engineering makes another, and the review cycle corrects the mismatch. The fix is upstream: specs that answer the interpretation questions before they’re asked.",
    },
    {
      id: "prd-m06-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "Author acceptance criteria that two people can evaluate independently and agree on",
      body: "Ambiguous: ‘The form should feel responsive.’ Testable: ‘The form submits within 500ms on a 3G connection and displays a confirmation within 200ms of submission.’ The test: two people with the same criterion should reach the same pass/fail conclusion. If they wouldn’t, the criterion is ambiguous and the mismatch will surface in review, not in the spec.",
    },
    {
      id: "prd-m06-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The modal that was redesigned four times",
      body: "A team ships a spec for a cancellation flow with this acceptance criterion: ‘Users should be able to easily cancel from the account page.’ Design builds a 3-step modal. Review: ‘Too many steps.’ Rebuild. Next review: ‘Actually we need a confirmation step.’ Rebuild. The spec never answered: what is the acceptable cancel path length, and when is confirmation required?",
      example: "Spec completeness test: for every acceptance criterion, ask: ‘Can a designer and an engineer read this independently and agree on whether it passes?’ List your ambiguities explicitly in the spec rather than leaving them to be found in review.",
    },
    {
      id: "prd-m06-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might a spreadsheet or headline tempt you to skip downside or definitions? Name one guardrail.",
    },
    {
      id: "prd-m06-lesson-lt-next",
      type: "next_step",
      body: "Next: prd-m08 — specs prevent internal rework. Stakeholder alignment without status theater prevents the external version — misaligned expectations at the executive level.",
    }
  ],

  "product-thinking::prd-m07-practice": [
    {
      id: "prd-m07-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "prd-m07-practice-lt-task",
      type: "practice_task",
      title: "Practice · Shipping to learn: launches, instrumentation discipline",
      bullets: [
        "1. Launch checklist + kill switch + primary KPI & guardrail definitions.",
        "2. Learning plan template for post-launch window with weekly metric read agenda.",
        "3. Draft a “metric dictionary” snippet engineers/analytics can align to.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "prd-m07-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Launch readiness + KPI dictionary slice + learning plan",
    },
    {
      id: "prd-m07-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "product-thinking::prd-m08-lesson": [
    {
      id: "prd-m08-lesson-lt-intro",
      type: "intro",
      eyebrow: "Professional judgment",
      title: "Stakeholder alignment without status theater",
      body: "Status theater is a meeting or document that consumes attention without enabling a decision. Test: could a stakeholder read this update and make a better decision than without it? If the update exists to demonstrate activity rather than inform judgment, it’s theater.",
    },
    {
      id: "prd-m08-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "Compress updates into exec narrative: bets, KPI variance, and the decisions you need",
      body: "A useful executive update answers three questions: what were we betting on and why, how is the KPI moving relative to that hypothesis, and what decision or resource do we need? The failure mode answers a fourth question nobody asked: ‘here is everything we did this week.’ An exec who must extract the first three from a comprehensive activity log is doing your synthesis work for you.",
    },
    {
      id: "prd-m08-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The six-page weekly status doc that nobody was reading",
      body: "A product team sends six-page weekly status docs to senior stakeholders. In retrospective, an honest stakeholder admits: ‘I skim to the risks section. I haven’t read the full document in three months.’ The team has been writing 6 pages of content for one section. The rewrite: a one-page update with three blocks — what moved, what didn’t move and why, what we need from you. Reading time drops from 12 minutes to 90 seconds.",
      example: "Update test: ask a stakeholder: ‘After reading this, do you know (a) whether things are on track, (b) why, and (c) what you need to decide?’ If they can’t answer all three without a follow-up email, the update needs rewriting.",
    },
    {
      id: "prd-m08-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might a spreadsheet or headline tempt you to skip downside or definitions? Name one guardrail.",
    },
    {
      id: "prd-m08-lesson-lt-next",
      type: "next_step",
      body: "Next: prd-m09 — alignment requires trust. prd-m09 addresses the ethical dimension: research and UX practices that don’t manipulate the people you’re trying to serve.",
    }
  ],

  "product-thinking::prd-m08-practice": [
    {
      id: "prd-m08-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "prd-m08-practice-lt-task",
      type: "practice_task",
      title: "Practice · Stakeholder alignment without status theater",
      bullets: [
        "1. Rewrite sprawling status doc into crisp update with KPI lines + decision ask.",
        "2. Conflict rehearsal with facilitator notes.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "prd-m08-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Executive-ready status update + KPI variance snippet",
    },
    {
      id: "prd-m08-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "product-thinking::prd-m09-lesson": [
    {
      id: "prd-m09-lesson-lt-intro",
      type: "intro",
      eyebrow: "Integration",
      title: "Ethics, consent, proportionality in research and UX",
      body: "Unethical research design and dark UX patterns share a structural feature: they extract value from users without their informed participation. The discipline is proportionality — asking only for data you will actually use, designing interactions that make the user’s real intent easy to execute, and being willing to name a dark pattern when you see one in your own work.",
    },
    {
      id: "prd-m09-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "Consent in research and proportionality in UX answer the same question",
      body: "In research: consent means the participant knows what they’re participating in and can stop. In UX: proportionality means the interaction serves the user’s intent, not a metric the team optimizes at the user’s expense. The question in both contexts: does this person have enough information to make a genuine choice? Dark patterns are the cases where the answer is deliberately no.",
    },
    {
      id: "prd-m09-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The cancellation flow designed to be hard to find",
      body: "A subscription product buries cancellation four levels deep in account settings, uses a red button for ‘keep my subscription’ and grey for ‘cancel,’ and adds a countdown timer (‘Your discount expires in...’) to the confirmation page. Each pattern is individually defensible. Collectively, they prevent a decision the user wants to make. In user testing: every participant who wanted to cancel expressed frustration.",
      example: "Dark pattern audit: walk through any flow where a user might want to do something the business doesn’t want (cancel, downgrade, unsubscribe). If any step has friction that isn’t there for a security reason, document it and decide whether it belongs. Name the trade-off explicitly.",
    },
    {
      id: "prd-m09-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might a spreadsheet or headline tempt you to skip downside or definitions? Name one guardrail.",
    },
    {
      id: "prd-m09-lesson-lt-next",
      type: "next_step",
      body: "Next: prd-m10 — discovery, problem framing, prioritization, specs, alignment, and ethics are the components of a product thinking practice. The capstone integrates them.",
    }
  ],

  "product-thinking::prd-m09-practice": [
    {
      id: "prd-m09-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "prd-m09-practice-lt-task",
      type: "practice_task",
      title: "Practice · Ethics, consent, proportionality in research and UX",
      bullets: [
        "1. Ethics worksheet applied to live flow.",
        "2. Rewrite manipulative microcopy responsibly.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "prd-m09-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Ethics & consent review sheet",
    },
    {
      id: "prd-m09-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "product-thinking::prd-m10-lesson": [
    {
      id: "prd-m10-lesson-lt-intro",
      type: "intro",
      eyebrow: "Integration",
      title: "Concept package rehearsal: critique + versioning",
      body: "A concept package is a decision record, not a pitch deck. The goal is to make the reasoning behind your product decisions visible, traceable, and critiqueable. A package that can’t be argued with is one where the reasoning is hidden.",
    },
    {
      id: "prd-m10-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "Unify artifacts into a single storyline with versioning that traces why reasoning changed",
      body: "Integration test: can someone read the discovery findings and see how they produced the problem statement? The problem statement and see how it produced prioritization? The prioritization and see how it produced success metrics? If the chain breaks at any point, there’s a logical gap. Versioning means recording why a piece of reasoning changed — not just that it changed.",
    },
    {
      id: "prd-m10-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The capstone package that couldn’t explain the pivot",
      body: "A learner’s concept package shows a problem statement about onboarding friction and a solution set that addresses data export. In peer review: ‘Why did you go from onboarding to export?’ The answer isn’t in the package. A version note shows the pivot happened in week 3, but the reason — a new interview finding that changed the problem scope — wasn’t captured. The pivot was defensible. The documentation gap made it look arbitrary.",
      example: "Versioning discipline: any time you revise the problem statement, prioritization, or success metrics, add: ‘Changed because [finding]. Previous version assumed [X].’ This is the evidence that your thinking evolved.",
    },
    {
      id: "prd-m10-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might a spreadsheet or headline tempt you to skip downside or definitions? Name one guardrail.",
    },
    {
      id: "prd-m10-lesson-lt-next",
      type: "next_step",
      body: "This is the product-thinking capstone. Share your package with someone not involved in building it and ask: ‘Where does the logic break down?’ That question, answered honestly, is the most useful thing you can do before calling this v1.",
    }
  ],

  "product-thinking::prd-m10-practice": [
    {
      id: "prd-m10-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "prd-m10-practice-lt-task",
      type: "practice_task",
      title: "Practice · Concept package rehearsal: critique + versioning",
      bullets: [
        "1. Dry-run review with rubric.",
        "2. Revision pass from consolidated feedback log.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "prd-m10-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Product concept package v1",
    },
    {
      id: "prd-m10-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "product-thinking::prd-m10-recap": [
    {
      id: "prd-m10-recap-lt-intro",
      type: "intro",
      eyebrow: "Consolidation",
      title: "Consolidate · Concept package rehearsal: critique + versioning",
      body: "Build a recap artifact you will reopen: keywords, failure modes, reuse rules—written for future-you under stress.",
    },
    {
      id: "prd-m10-recap-lt-keys",
      type: "key_points",
      title: "Carry-forward pack",
      bullets: [
        "Keyword claim: Unify artifacts into single storyline.",
        "Failure mode to watch: Merge discovery, bets, roadmap, metrics, and ethics notes into one concept package—pressure-test with a skeptical panel,…",
        "Reuse rule: when to apply vs rethink this module",
      ],
    },
    {
      id: "prd-m10-recap-lt-reflect",
      type: "reflection_prompt",
      title: "Calibration",
      prompt: "What would convince you this module did not stick—what signal would you look for in your next deliverable?",
    },
    {
      id: "prd-m10-recap-lt-next",
      type: "next_step",
      body: "Archive the recap where your future self will actually find it.",
    }
  ],

  "product-thinking::prd-m10-revision": [
    {
      id: "prd-m10-revision-lt-intro",
      type: "intro",
      eyebrow: "Revision gate",
      title: "Tighten · Concept package rehearsal: critique + versioning",
      body: "Compress misunderstandings before they compound. Prefer precise claims, cited limits, and falsifiers—no glossary theater.",
    },
    {
      id: "prd-m10-revision-lt-recap",
      type: "recap",
      title: "Compress to checks",
      bullets: [
        "Unify artifacts into single storyline.",
        "Invite sharp critique; triage feedback.",
        "Maintain version history for accountable change.",
      ],
    },
    {
      id: "prd-m10-revision-lt-task",
      type: "practice_task",
      title: "Structured gate",
      prompt: "In 6–10 sentences: (1) what you believe now, (2) what would falsify it, (3) what artifact proves you applied this module.",
    },
    {
      id: "prd-m10-revision-lt-next",
      type: "next_step",
      body: "Proceed only if you would defend these claims aloud to a skeptical peer.",
    }
  ],

  "project-execution::pex-m01-practice": [
    {
      id: "pex-m01-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "pex-m01-practice-lt-task",
      type: "practice_task",
      title: "Practice · Intent, scope, success signals, and explicit non-goals",
      bullets: [
        "1. Charter skeleton for live initiative with assumption table.",
        "2. Non-goals list with rationale each line.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "pex-m01-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Charter skeleton + assumption / non-goals table",
    },
    {
      id: "pex-m01-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "project-execution::pex-m01-revision": [
    {
      id: "pex-m01-revision-lt-intro",
      type: "intro",
      eyebrow: "Revision gate",
      title: "Tighten · Intent, scope, success signals, and explicit non-goals",
      body: "Compress misunderstandings before they compound. Prefer precise claims, cited limits, and falsifiers—no glossary theater.",
    },
    {
      id: "pex-m01-revision-lt-recap",
      type: "recap",
      title: "Compress to checks",
      bullets: [
        "Draft measurable success signals stakeholders can inspect.",
        "List scope boundaries and explicit non-goals.",
        "Expose hidden commitments masquerading as tasks.",
      ],
    },
    {
      id: "pex-m01-revision-lt-task",
      type: "practice_task",
      title: "Structured gate",
      prompt: "In 6–10 sentences: (1) what you believe now, (2) what would falsify it, (3) what artifact proves you applied this module.",
    },
    {
      id: "pex-m01-revision-lt-next",
      type: "next_step",
      body: "Proceed only if you would defend these claims aloud to a skeptical peer.",
    }
  ],

  "project-execution::pex-m02-lesson": [
    {
      id: "pex-m02-lesson-lt-intro",
      type: "intro",
      eyebrow: "Grounding",
      title: "Stakeholders, decisions, and authority clarity",
      body: "Decision-making on projects slows for one reason more than any other: unclear authority. The approval that takes a week to get isn’t slow because the approver is difficult — it’s slow because nobody clarified upfront who had decision rights and what the escalation path was when they were unavailable.",
    },
    {
      id: "pex-m02-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "Assign decision rights with escalation paths, not just a RACI",
      body: "RACI clarifies who’s responsible and accountable but doesn’t answer the question a PM needs under pressure: if the accountable person is unavailable for 3 days, who decides? Map decision rights by decision type (scope, budget, technical approach), name the primary decision-maker, and name the escalation path and response window. A RACI is a static document. Decision rights with escalation paths are an operating protocol.",
    },
    {
      id: "pex-m02-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The scope change that took two weeks to approve",
      body: "A PM needs approval to drop a minor feature to protect the launch date. The product director is traveling. No documented escalation path exists. After a week, the PM discovers the VP of Product — who has authority — would have approved in 10 minutes. The two-week delay came entirely from not knowing who to ask next. The project launched late.",
      example: "Decision rights map: for every decision type on your project, complete this: ‘If [decision-maker] is unavailable, [escalation person] can decide within [timeframe].’ Document it before kickoff.",
    },
    {
      id: "pex-m02-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might a spreadsheet or headline tempt you to skip downside or definitions? Name one guardrail.",
    },
    {
      id: "pex-m02-lesson-lt-next",
      type: "next_step",
      body: "Next: pex-m03 — authority clarity sets who decides. Plans as hypotheses builds what they’re deciding against: a milestone structure that admits uncertainty rather than hiding it.",
    }
  ],

  "project-execution::pex-m02-practice": [
    {
      id: "pex-m02-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "pex-m02-practice-lt-task",
      type: "practice_task",
      title: "Practice · Stakeholders, decisions, and authority clarity",
      bullets: [
        "1. Decision-rights map + RACI where it earns its keep.",
        "2. Two-week decision log trial.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "pex-m02-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Stakeholder + decision-rights map",
    },
    {
      id: "pex-m02-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "project-execution::pex-m03-lesson": [
    {
      id: "pex-m03-lesson-lt-intro",
      type: "intro",
      eyebrow: "Grounding",
      title: "Plans as hypotheses: milestones, buffers, assumptions",
      body: "A project plan that presents certainty is a project plan that will be wrong in ways nobody anticipated. A plan that treats milestones as hypotheses — with explicit assumptions and explained buffers — gives the team a shared basis for making good decisions when reality diverges from the plan.",
    },
    {
      id: "pex-m03-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "Match plan fidelity to planning horizon, and name the assumptions behind each milestone",
      body: "The first 4 weeks of a 20-week project can be planned at task-level detail. Weeks 5-12 at milestone-level. Weeks 13-20 directionally. Teams that plan weeks 13-20 at task-level aren’t being rigorous — they’re performing certainty. Named assumptions are the honest version: ‘Milestone 3 is achievable if API integration completes by week 6, contingent on vendor delivery.’",
    },
    {
      id: "pex-m03-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The project plan with no buffers and no assumptions",
      body: "A plan shows 14 sequential milestones over 16 weeks with no buffers. In kickoff: ‘What happens if milestone 3 slips?’ PM: ‘It can’t slip.’ Milestone 3 slips by 6 days due to a vendor dependency. Because every subsequent milestone starts immediately after the previous one, the full 6-day slip propagates through the project. No shock absorbers, no named assumptions to revisit.",
      example: "Buffer rule: a buffer is not padding — it’s a named time allocation for a named risk. ‘Buffer for vendor delay: 3 days.’ If the risk doesn’t occur, allocate buffer to the next-highest risk. Track buffer consumption as a health signal.",
    },
    {
      id: "pex-m03-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might a spreadsheet or headline tempt you to skip downside or definitions? Name one guardrail.",
    },
    {
      id: "pex-m03-lesson-lt-next",
      type: "next_step",
      body: "Next: pex-m04 — plans surface your own work. Dependency mapping surfaces the work you’re relying on others to complete.",
    }
  ],

  "project-execution::pex-m03-practice": [
    {
      id: "pex-m03-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "pex-m03-practice-lt-task",
      type: "practice_task",
      title: "Practice · Plans as hypotheses: milestones, buffers, assumptions",
      bullets: [
        "1. Milestone map v1 with buffer rationale.",
        "2. Assumption table with owners + review dates.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "pex-m03-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Milestone map + assumption register",
    },
    {
      id: "pex-m03-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "project-execution::pex-m03-recap": [
    {
      id: "pex-m03-recap-lt-intro",
      type: "intro",
      eyebrow: "Consolidation",
      title: "Consolidate · Plans as hypotheses: milestones, buffers, assumptions",
      body: "Build a recap artifact you will reopen: keywords, failure modes, reuse rules—written for future-you under stress.",
    },
    {
      id: "pex-m03-recap-lt-keys",
      type: "key_points",
      title: "Carry-forward pack",
      bullets: [
        "Keyword claim: Choose fidelity fit to horizon.",
        "Failure mode to watch: Milestones admit unknowns—buffers justified, assumptions visible, pivot triggers explicit.…",
        "Reuse rule: when to apply vs rethink this module",
      ],
    },
    {
      id: "pex-m03-recap-lt-reflect",
      type: "reflection_prompt",
      title: "Calibration",
      prompt: "What would convince you this module did not stick—what signal would you look for in your next deliverable?",
    },
    {
      id: "pex-m03-recap-lt-next",
      type: "next_step",
      body: "Archive the recap where your future self will actually find it.",
    }
  ],

  "project-execution::pex-m04-lesson": [
    {
      id: "pex-m04-lesson-lt-intro",
      type: "intro",
      eyebrow: "Applied reasoning",
      title: "Dependencies, interfaces, integration risk",
      body: "Integration risk is the category of project failure that is visible in retrospect and invisible in planning. Two workstreams execute in parallel, each meeting their individual milestones, and discover at integration that their outputs are incompatible. The discipline is making integration points explicit before both workstreams start.",
    },
    {
      id: "pex-m04-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "Model dependencies without assuming sequential handoffs will work",
      body: "Fantasy sequentialism: A hands off to B when done, B builds on A’s output. Reality: A’s definition of ‘done’ and B’s expectation of what they’d receive are different. The interface agreement prevents this: before both workstreams start, they agree in writing on what the handoff artifact looks like, what quality standard it meets, and what B will do if A’s output is late or below standard.",
    },
    {
      id: "pex-m04-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The frontend built on a deprecated API",
      body: "A frontend and backend team work in parallel for 8 weeks. In week 6, the backend team redesigns a key endpoint for performance and updates the API documentation but doesn’t notify the frontend team. At integration in week 9: the frontend was built against the old contract. 3 weeks of rework. Neither team had done anything wrong individually. There was no protocol for notifying dependent teams when an interface changed.",
      example: "Interface change protocol: any change to a deliverable another team is building against must be communicated within 24 hours with the specific change, the reason, and the impact on their timeline. Write this into the kickoff agreement.",
    },
    {
      id: "pex-m04-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might a spreadsheet or headline tempt you to skip downside or definitions? Name one guardrail.",
    },
    {
      id: "pex-m04-lesson-lt-next",
      type: "next_step",
      body: "Next: pex-m06 — dependency management is structural. Execution cadence is how you run the project week by week without generating meetings that substitute for progress.",
    }
  ],

  "project-execution::pex-m04-practice": [
    {
      id: "pex-m04-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "pex-m04-practice-lt-task",
      type: "practice_task",
      title: "Practice · Dependencies, interfaces, integration risk",
      bullets: [
        "1. Dependency graph with critical handshakes highlighted.",
        "2. Interface agreement draft for one messy edge.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "pex-m04-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Dependency graph + interface agreement",
    },
    {
      id: "pex-m04-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "project-execution::pex-m06-lesson": [
    {
      id: "pex-m06-lesson-lt-intro",
      type: "intro",
      eyebrow: "Applied reasoning",
      title: "Execution cadence: ceremonies, async, checkpoints",
      body: "A project cadence that generates too many meetings is managing communication rather than managing work. Test for any recurring ceremony: does it change a decision or unblock a constraint? If the answer for three consecutive weeks is no, the ceremony isn’t earning its time.",
    },
    {
      id: "pex-m06-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "Three signals tell you whether the project is healthy; everything else is context",
      body: "Milestone variance (ahead, on track, or behind by how much?), blocker count and age (how many open, how long?), and buffer consumption (at current pace, how much buffer used?) — these three take 5 minutes to generate and tell a PM more than a 45-minute status meeting. Everything else is context that should be async.",
    },
    {
      id: "pex-m06-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The 45-minute status meeting with 5 minutes of actual blockers",
      body: "A 12-person project team has weekly status meetings. Each person gives a 3-minute update. 11 updates contain nothing requiring live conversation. One surfaces a blocker affecting 3 workstreams. Redesign: team submits a 3-field async update (on track/at risk, blockers, needs from others) before the meeting. The meeting addresses only items marked ‘at risk’ or ‘has blockers.’ Meeting time drops from 45 to 12 minutes.",
      example: "Cadence test: for every recurring ceremony, ask: ‘What decision or unblock would not happen without this meeting?’ If you can’t answer, it’s coordination theater. Either eliminate it or redesign it around the one decision it should produce.",
    },
    {
      id: "pex-m06-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might a spreadsheet or headline tempt you to skip downside or definitions? Name one guardrail.",
    },
    {
      id: "pex-m06-lesson-lt-next",
      type: "next_step",
      body: "Next: pex-m08 — cadence keeps the project moving. Definition of done and quality gates define what ‘done’ actually means so the project doesn’t keep moving past its quality threshold.",
    }
  ],

  "project-execution::pex-m07-practice": [
    {
      id: "pex-m07-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "pex-m07-practice-lt-task",
      type: "practice_task",
      title: "Practice · Change leadership without buzzword soup",
      bullets: [
        "1. Change communications outline + FAQ.",
        "2. Office-hours / listening plan.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "pex-m07-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Change comms outline + FAQ",
    },
    {
      id: "pex-m07-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "project-execution::pex-m08-lesson": [
    {
      id: "pex-m08-lesson-lt-intro",
      type: "intro",
      eyebrow: "Professional judgment",
      title: "Quality, definition of done, review gates",
      body: "A project without a definition of done has infinite polish potential. Every review surfaces new improvements. Every stakeholder can restart the clock. The definition of done is the contractual answer to ‘when are we finished?’ — and getting agreement on it before the work starts is the difference between delivering and perpetually revising.",
    },
    {
      id: "pex-m08-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "Get stakeholder agreement on the DoD before the work starts, not after it ends",
      body: "The failure mode: the DoD is written after the project is nearly complete, negotiated under pressure, and almost always expanded. The useful discipline: draft the DoD at kickoff, review it with the key stakeholders who will approve the work, and get explicit agreement on what will and won’t be in scope for the review gate.",
    },
    {
      id: "pex-m08-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The project that was done three times",
      body: "A team completes a major internal tool rebuild. First review: ‘Can we add one more reporting view?’ Second review: ‘The mobile layout needs work.’ Third review: ‘The onboarding flow isn’t right.’ No definition of done. Each review opened a new negotiation. The project ran 6 weeks over, with no single conversation that produced the overrun — it accumulated one request at a time.",
      example: "DoD test at kickoff: ask the approver: ‘If we deliver X, Y, and Z at this quality level by this date, will you consider this complete?’ Get a yes or no. If the response is ‘yes, but also...’ you have scope creep starting at kickoff. Negotiate it now.",
    },
    {
      id: "pex-m08-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might a spreadsheet or headline tempt you to skip downside or definitions? Name one guardrail.",
    },
    {
      id: "pex-m08-lesson-lt-next",
      type: "next_step",
      body: "Next: pex-m09 — definition of done gives you a quality floor. Pressure delivery builds the skill for when the deadline is immovable and the scope has to change to meet it.",
    }
  ],

  "project-execution::pex-m08-practice": [
    {
      id: "pex-m08-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "pex-m08-practice-lt-task",
      type: "practice_task",
      title: "Practice · Quality, definition of done, review gates",
      bullets: [
        "1. DoD + gate checklist for initiative.",
        "2. Simulate gate review with notes + quality signal line items.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "pex-m08-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "DoD + gate checklist + quality signal definitions",
    },
    {
      id: "pex-m08-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "project-execution::pex-m09-lesson": [
    {
      id: "pex-m09-lesson-lt-intro",
      type: "intro",
      eyebrow: "Integration",
      title: "Pressure delivery: scope trades, escalation, protection",
      body: "Pressure on a project produces two bad behaviors: the team absorbs it silently (working nights, cutting quality invisibly) or it produces reactive scope changes that aren’t traded against anything. The discipline is structured scope trading: when something has to give, make the trade explicit, get agreement on what’s cut, and document it.",
    },
    {
      id: "pex-m09-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "Run scope trade conversations tied to current status, not to pressure",
      body: "A scope trade conversation has three components: here is the current status (milestone variance, buffer remaining, specific blockers); here are the trade options (what can be cut without compromising the must-have outcome, and the quality impact); here is the recommendation with rationale. A conversation that starts with ‘we’re running out of time’ and ends with ‘drop that feature’ is a stress response that may cut the wrong thing.",
    },
    {
      id: "pex-m09-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The feature cut because it was listed last",
      body: "A project under time pressure needs to cut one feature. The PM presents the four lowest-priority features. The stakeholder cuts the fourth item on the list. In retrospect: the fourth item had the highest customer impact at launch. The item that should have been cut was third. The trade was made on list position, not on updated priority analysis.",
      example: "Trade decision protocol: before any scope cut, spend 10 minutes updating the priority ranking for the items under consideration. The item to cut should be the current lowest priority, not the item at the bottom of a list written 8 weeks ago.",
    },
    {
      id: "pex-m09-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might a spreadsheet or headline tempt you to skip downside or definitions? Name one guardrail.",
    },
    {
      id: "pex-m09-lesson-lt-next",
      type: "next_step",
      body: "Next: pex-m10 — pressure delivery is how you land the project. Closeout and retro is how you make the experience usable for the next one.",
    }
  ],

  "project-execution::pex-m09-practice": [
    {
      id: "pex-m09-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "pex-m09-practice-lt-task",
      type: "practice_task",
      title: "Practice · Pressure delivery: scope trades, escalation, protection",
      bullets: [
        "1. Escalation memo with options + recommendation + embedded status facts.",
        "2. Scope trade scenario walkthrough with KPI impact notes.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "pex-m09-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Escalation memo + scope trade playbook",
    },
    {
      id: "pex-m09-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "project-execution::pex-m10-lesson": [
    {
      id: "pex-m10-lesson-lt-intro",
      type: "intro",
      eyebrow: "Integration",
      title: "Closeout, retro, knowledge handoff",
      body: "Most project knowledge lives in three places after a project ends: people’s heads, Slack threads, and a final status email. None of these are retrievable in 6 months when the next team needs to understand what happened. The closeout discipline is turning distributed knowledge into artifacts that are specific, dated, and findable.",
    },
    {
      id: "pex-m10-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "Facilitate a retro that produces dated actions, not general observations",
      body: "Failure mode: the team identifies themes (‘communication could have been better’), produces general agreements (‘we’ll communicate more proactively’), and files the notes. In 3 months, the next project runs the same retro. Specificity: ‘communication could have been better’ is not an action. ‘By the next project kickoff, we will have a written escalation path agreed by all workstream leads’ is an action: deliverable, deadline, owner.",
    },
    {
      id: "pex-m10-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The retro that ran six times and changed nothing",
      body: "A team runs retrospectives at the end of each project. Each produces themes: coordination issues, unclear requirements, late stakeholder feedback. Each produces agreements to improve. In the sixth retro, the same themes appear. The outputs were never converted to protocol changes. The observations were accurate. The actions were too vague to implement. The knowledge didn’t transfer because nobody built the artifact it needed to transfer into.",
      example: "Retro output standard: each retro must produce at least one concrete protocol change — a written process, a checklist item, or a decision rights update — that will be incorporated into the kickoff document for the next project. Insight without a concrete change is not an improvement.",
    },
    {
      id: "pex-m10-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might a spreadsheet or headline tempt you to skip downside or definitions? Name one guardrail.",
    },
    {
      id: "pex-m10-lesson-lt-next",
      type: "next_step",
      body: "This is the project-execution capstone. Bring your delivery playbook to the next project kickoff and ask: ‘Is there anything in here that didn’t work last time that we should change before we start?’ That answer is the most valuable output of the closeout process.",
    }
  ],

  "project-execution::pex-m10-practice": [
    {
      id: "pex-m10-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "pex-m10-practice-lt-task",
      type: "practice_task",
      title: "Practice · Closeout, retro, knowledge handoff",
      bullets: [
        "1. Retro facilitation plan + follow-through tracker.",
        "2. Learning log consolidated into playbook updates.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "pex-m10-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Delivery playbook v1",
    },
    {
      id: "pex-m10-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "project-execution::pex-m10-recap": [
    {
      id: "pex-m10-recap-lt-intro",
      type: "intro",
      eyebrow: "Consolidation",
      title: "Consolidate · Closeout, retro, knowledge handoff",
      body: "Build a recap artifact you will reopen: keywords, failure modes, reuse rules—written for future-you under stress.",
    },
    {
      id: "pex-m10-recap-lt-keys",
      type: "key_points",
      title: "Carry-forward pack",
      bullets: [
        "Keyword claim: Facilitate retro producing dated actions.",
        "Failure mode to watch: Finish with artifacts someone else could run from—learning captured, celebration grounded.…",
        "Reuse rule: when to apply vs rethink this module",
      ],
    },
    {
      id: "pex-m10-recap-lt-reflect",
      type: "reflection_prompt",
      title: "Calibration",
      prompt: "What would convince you this module did not stick—what signal would you look for in your next deliverable?",
    },
    {
      id: "pex-m10-recap-lt-next",
      type: "next_step",
      body: "Archive the recap where your future self will actually find it.",
    }
  ],

  "project-execution::pex-m10-revision": [
    {
      id: "pex-m10-revision-lt-intro",
      type: "intro",
      eyebrow: "Revision gate",
      title: "Tighten · Closeout, retro, knowledge handoff",
      body: "Compress misunderstandings before they compound. Prefer precise claims, cited limits, and falsifiers—no glossary theater.",
    },
    {
      id: "pex-m10-revision-lt-recap",
      type: "recap",
      title: "Compress to checks",
      bullets: [
        "Facilitate retro producing dated actions.",
        "Capture knowledge for future initiatives.",
        "Acknowledge wins without vanity metrics.",
      ],
    },
    {
      id: "pex-m10-revision-lt-task",
      type: "practice_task",
      title: "Structured gate",
      prompt: "In 6–10 sentences: (1) what you believe now, (2) what would falsify it, (3) what artifact proves you applied this module.",
    },
    {
      id: "pex-m10-revision-lt-next",
      type: "next_step",
      body: "Proceed only if you would defend these claims aloud to a skeptical peer.",
    }
  ],

  "research-and-critical-thinking::rtc-m01-practice": [
    {
      id: "rtc-m01-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "rtc-m01-practice-lt-task",
      type: "practice_task",
      title: "Practice · Questions, falsifiability, and scope discipline",
      bullets: [
        "1. Take three headlines or debate prompts; rewrite each into a precise research question + falsifier.",
        "2. Write a half-page scope memo: stakes, audience, stopping rule, non-goals.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "rtc-m01-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Scope one-pager v1",
    },
    {
      id: "rtc-m01-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "research-and-critical-thinking::rtc-m01-revision": [
    {
      id: "rtc-m01-revision-lt-intro",
      type: "intro",
      eyebrow: "Revision gate",
      title: "Tighten · Questions, falsifiability, and scope discipline",
      body: "Compress misunderstandings before they compound. Prefer precise claims, cited limits, and falsifiers—no glossary theater.",
    },
    {
      id: "rtc-m01-revision-lt-recap",
      type: "recap",
      title: "Compress to checks",
      bullets: [
        "Rewrite mushy questions into falsifiable claims with observable implications.",
        "Draw scope boundaries: inclusions, exclusions, and “not answering yet.”",
        "Detect loaded framing that smuggles conclusions into the question.",
      ],
    },
    {
      id: "rtc-m01-revision-lt-task",
      type: "practice_task",
      title: "Structured gate",
      prompt: "In 6–10 sentences: (1) what you believe now, (2) what would falsify it, (3) what artifact proves you applied this module.",
    },
    {
      id: "rtc-m01-revision-lt-next",
      type: "next_step",
      body: "Proceed only if you would defend these claims aloud to a skeptical peer.",
    }
  ],

  "research-and-critical-thinking::rtc-m02-lesson": [
    {
      id: "rtc-m02-lesson-lt-intro",
      type: "intro",
      eyebrow: "Grounding",
      title: "Sources: types, incentives, and triangulation",
      body: "Every source has an incentive structure. A government report, an industry association analysis, an academic paper, and a journalist’s investigation can all describe the same phenomenon and reach different conclusions — not because one is lying, but because they were built for different purposes. The skill is reading a source for its incentives, not just its conclusions.",
    },
    {
      id: "rtc-m02-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "Classify sources and weight them by incentive, not just by credential",
      body: "Four source types with different reliability profiles: primary data (original measurement), secondary analysis (interpretation of primary data), expert testimony (domain opinion), and advocacy (position shaped by institutional interest). An industry-affiliated think tank isn’t wrong by definition — but its analytical choices, scope, and framing are shaped by that affiliation. Name it, note the likely bias shape, then decide if the evidence holds even under that assumption.",
    },
    {
      id: "rtc-m02-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The 'study' that was a survey of the company's own customers",
      body: "A company publishes a report: ‘84% of professionals say this category improved their productivity.’ Widely cited in trade press. Methodology note on page 8: survey of existing customers, conducted by the marketing team, 22% response rate. The 84% figure describes a self-selected group who already bought the product, surveyed by the people selling it, with most recipients choosing not to respond.",
      example: "Incentive audit: for any study you plan to cite, identify who commissioned it, who conducted it, and who funded it. If all three are the same entity, the evidence requires independent corroboration before it can anchor a claim.",
    },
    {
      id: "rtc-m02-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might generic language hide weak evidence in your portfolio or story? Name one fix.",
    },
    {
      id: "rtc-m02-lesson-lt-next",
      type: "next_step",
      body: "Next: rtc-m03 — source evaluation produces raw material. Notes that enable synthesis determines whether you can actually use what you’ve collected.",
    }
  ],

  "research-and-critical-thinking::rtc-m02-practice": [
    {
      id: "rtc-m02-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "rtc-m02-practice-lt-task",
      type: "practice_task",
      title: "Practice · Sources: types, incentives, and triangulation",
      bullets: [
        "1. Assemble a five-source portfolio on one topic with one-line incentive notes per source.",
        "2. Mark which claims in a popular article are supported vs. asserted; list what evidence is missing.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "rtc-m02-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Source portfolio + incentive sketch",
    },
    {
      id: "rtc-m02-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "research-and-critical-thinking::rtc-m03-lesson": [
    {
      id: "rtc-m03-lesson-lt-intro",
      type: "intro",
      eyebrow: "Grounding",
      title: "Notes that enable synthesis, not hoarding",
      body: "The most common research failure is not insufficient evidence — it’s evidence collected in a form that can’t be synthesized. A folder of 40 PDFs and 15 pages of unstructured notes is a storage problem, not a research base. The discipline is capturing evidence in a form that makes comparison, contradiction, and argument construction possible.",
    },
    {
      id: "rtc-m03-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "Cluster notes by claim, not by author or source",
      body: "Notes organized by source (‘Article A says... Article B says...’) prevent synthesis. Notes organized by claim (‘On this question, A and B say X citing Y; C and D say not-X citing Z; the contradiction stems from different measurement periods’) make synthesis possible. When notes are organized by claim, the argument writes itself. When organized by source, the writer does the reorganization under deadline pressure.",
    },
    {
      id: "rtc-m03-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The researcher who had enough evidence and couldn't write",
      body: "A policy analyst has 200+ sources for a housing supply brief. Six weeks of research, notes organized by article. When they sit down to draft, the question is: ‘What do I actually know?’ They know what each article says. They don’t know what the evidence says about the three questions the brief must answer. The reorganization takes 4 days. With notes organized by claim, the brief would have been faster to write than to research.",
      example: "Claim-first note protocol: when you take a note, ask first ‘which claim does this support, complicate, or refute?’ Write the note under that claim with the source and page number. Your notes file is an evolving argument, not a bibliography.",
    },
    {
      id: "rtc-m03-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might generic language hide weak evidence in your portfolio or story? Name one fix.",
    },
    {
      id: "rtc-m03-lesson-lt-next",
      type: "next_step",
      body: "Next: rtc-m04 — you’ve collected and organized evidence. Logic, rhetoric, and fallacies teaches how arguments are constructed well and poorly, so you can evaluate what you’ve found.",
    }
  ],

  "research-and-critical-thinking::rtc-m03-practice": [
    {
      id: "rtc-m03-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "rtc-m03-practice-lt-task",
      type: "practice_task",
      title: "Practice · Notes that enable synthesis, not hoarding",
      bullets: [
        "1. Migrate messy notes into a template: claim → evidence → conflict → open question.",
        "2. Cluster notes into a working outline with explicit gaps highlighted.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "rtc-m03-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Structured note packet",
    },
    {
      id: "rtc-m03-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "research-and-critical-thinking::rtc-m03-recap": [
    {
      id: "rtc-m03-recap-lt-intro",
      type: "intro",
      eyebrow: "Consolidation",
      title: "Consolidate · Notes that enable synthesis, not hoarding",
      body: "Build a recap artifact you will reopen: keywords, failure modes, reuse rules—written for future-you under stress.",
    },
    {
      id: "rtc-m03-recap-lt-keys",
      type: "key_points",
      title: "Carry-forward pack",
      bullets: [
        "Keyword claim: Separate verbatim quotes from paraphrase with page/section anchors.",
        "Failure mode to watch: Capture quotations with provenance, paraphrase with discipline, cluster by claim—not by author—so writing becomes possib…",
        "Reuse rule: when to apply vs rethink this module",
      ],
    },
    {
      id: "rtc-m03-recap-lt-reflect",
      type: "reflection_prompt",
      title: "Calibration",
      prompt: "What would convince you this module did not stick—what signal would you look for in your next deliverable?",
    },
    {
      id: "rtc-m03-recap-lt-next",
      type: "next_step",
      body: "Archive the recap where your future self will actually find it.",
    }
  ],

  "research-and-critical-thinking::rtc-m04-lesson": [
    {
      id: "rtc-m04-lesson-lt-intro",
      type: "intro",
      eyebrow: "Applied reasoning",
      title: "Logic, rhetoric, and common fallacies",
      body: "Recognizing a fallacy in someone else’s argument is the easier half. The harder half is catching fallacy-shaped moves in your own reasoning — particularly the ones that feel like strong arguments when you’re making them. Motivated reasoning produces arguments that are structurally indistinguishable from good arguments until you slow down and examine the evidence.",
    },
    {
      id: "rtc-m04-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "Tag fallacy-shaped moves without dismissing arguments by label alone",
      body: "Applying a fallacy label is not a counterargument — it’s a pattern match that still requires explaining why the specific evidence or logic fails in this case. Name the move, explain why the evidence doesn’t hold here, and address the strongest version of the argument. ‘That’s an appeal to authority’ followed by nothing is a rhetorical dismissal, not a refutation.",
    },
    {
      id: "rtc-m04-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The policy brief that used correlational data as causal evidence",
      body: "A public health brief argues that increasing minimum wage causes reductions in teen employment, citing a chart showing both trends over the same decade. The chart shows correlation. Three other variables (automation, labor market tightness, industry mix) moved in the same direction over the same period. None were controlled for. The argument isn’t wrong by label — it’s wrong because the evidence doesn’t support the causal claim.",
      example: "Causal claim test: for any argument in the form ‘X causes Y,’ ask: (1) is there a plausible mechanism? (2) were alternative causes controlled for? (3) does the effect disappear when the proposed cause is removed? If all three can’t be answered with evidence, the claim is associational, not causal.",
    },
    {
      id: "rtc-m04-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might generic language hide weak evidence in your portfolio or story? Name one fix.",
    },
    {
      id: "rtc-m04-lesson-lt-next",
      type: "next_step",
      body: "Next: rtc-m06 — logic helps you evaluate individual arguments. Synthesis under disagreement builds the skill of holding multiple conflicting arguments simultaneously and extracting what’s defensible.",
    }
  ],

  "research-and-critical-thinking::rtc-m04-practice": [
    {
      id: "rtc-m04-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "rtc-m04-practice-lt-task",
      type: "practice_task",
      title: "Practice · Logic, rhetoric, and common fallacies",
      bullets: [
        "1. Annotate one editorial or thread: each paragraph gets rhetoric tag + evidence strength.",
        "2. Write steel-man + steel-woman summary of a view you reject; list where it still bites.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "rtc-m04-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Rhetoric annotation sheet + steel-man paragraph",
    },
    {
      id: "rtc-m04-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "research-and-critical-thinking::rtc-m06-lesson": [
    {
      id: "rtc-m06-lesson-lt-intro",
      type: "intro",
      eyebrow: "Applied reasoning",
      title: "Synthesis under disagreement",
      body: "Synthesis under disagreement is not the same as balance. Balance gives equal weight to every perspective. Synthesis under disagreement maps where informed sources agree, where they clash, what drives the clash, and what evidence would resolve it — producing a more precise picture of what is known, what is contested, and what is genuinely unknown.",
    },
    {
      id: "rtc-m06-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "Map the source of disagreement before you try to resolve it",
      body: "Disagreements between informed sources usually arise from: different measurement methods, different populations, different time horizons, or different values about what matters. Identifying the source of the disagreement tells you whether additional evidence would resolve it — or whether it’s a values difference masquerading as an evidence dispute. Those require different responses.",
    },
    {
      id: "rtc-m06-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The meta-analysis that 'settled' a debate that wasn't about the evidence",
      body: "Two camps disagree on whether a corporate wellness intervention reduces healthcare costs. A 2022 meta-analysis across 30 studies finds no significant effect. Both camps cite it as supporting their position. Camp one: ‘It shows no effect.’ Camp two: ‘It shows no effect in poorly implemented programs — our design is different.’ The meta-analysis didn’t resolve the disagreement because the disagreement was about implementation quality, not the category.",
      example: "Disagreement mapping: before accepting that a topic is ‘contested,’ identify what specifically is contested — the data, the interpretation, the methodology, or the definition of terms. Different disagreements require different types of evidence to resolve.",
    },
    {
      id: "rtc-m06-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might generic language hide weak evidence in your portfolio or story? Name one fix.",
    },
    {
      id: "rtc-m06-lesson-lt-next",
      type: "next_step",
      body: "Next: rtc-m08 — synthesis maps what you know. Time-boxed research and stopping rules builds the discipline of knowing when you’ve done enough and can commit to a conclusion.",
    }
  ],

  "research-and-critical-thinking::rtc-m07-practice": [
    {
      id: "rtc-m07-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "rtc-m07-practice-lt-task",
      type: "practice_task",
      title: "Practice · Writing judgments: thesis, limitations, recommendations",
      bullets: [
        "1. Outline a decision memo with limitation blocks tied to evidence gaps.",
        "2. Peer swap: hunt for inference leakage and recommendation-overreach.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "rtc-m07-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Judgment memo outline",
    },
    {
      id: "rtc-m07-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "research-and-critical-thinking::rtc-m08-lesson": [
    {
      id: "rtc-m08-lesson-lt-intro",
      type: "intro",
      eyebrow: "Professional judgment",
      title: "Time-boxed research and stopping rules",
      body: "Research without a stopping rule is a procrastination mechanism. The stopping rule forces a decision: I will commit to a conclusion with this evidence level, knowing what I don’t know, and I will name my unknowns explicitly. The alternative — researching until you feel certain — often means researching until the deadline.",
    },
    {
      id: "rtc-m08-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "Define maximum time and minimum acceptable depth before research starts",
      body: "Minimum acceptable depth is not ‘I feel confident.’ It’s an explicit threshold: ‘I need at least two primary sources, one independent analysis, and no significant contradictions I can’t explain.’ Stopping rule: ‘At the 90-minute mark, I commit to a conclusion with whatever unknowns remain.’ Write both down before starting. Without writing them, they shift in whatever direction reduces discomfort.",
    },
    {
      id: "rtc-m08-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The literature review that was still running when the project ended",
      body: "An analyst is tasked with a 2-week literature review on a market question. No stopping criteria defined. At week 2: 12 high-quality sources collected plus significant tangential material. They want to review the tangential material before drawing conclusions. At week 4: 30 sources and a new adjacent question. The review is comprehensive and late. The decision it was supposed to inform was made without it.",
      example: "Stopping rule protocol: before starting, write: (1) minimum sources to reach a defensible conclusion, (2) maximum time regardless of whether minimum is met, (3) what to do with unknowns that remain — name them in the output rather than extending the research.",
    },
    {
      id: "rtc-m08-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might generic language hide weak evidence in your portfolio or story? Name one fix.",
    },
    {
      id: "rtc-m08-lesson-lt-next",
      type: "next_step",
      body: "Next: rtc-m09 — stopping rules require you to commit to a conclusion. Bias and intellectual honesty examines why that commitment is harder when the conclusion challenges your prior beliefs.",
    }
  ],

  "research-and-critical-thinking::rtc-m08-practice": [
    {
      id: "rtc-m08-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "rtc-m08-practice-lt-task",
      type: "practice_task",
      title: "Practice · Time-boxed research and stopping rules",
      bullets: [
        "1. Run a 90-minute bounded sprint: deliver outline + unknowns log + next evidence fetch.",
        "2. Write stopping-rule statement for a recurring decision at work or home.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "rtc-m08-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Stopping rules + revisit sheet",
    },
    {
      id: "rtc-m08-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "research-and-critical-thinking::rtc-m09-lesson": [
    {
      id: "rtc-m09-lesson-lt-intro",
      type: "intro",
      eyebrow: "Integration",
      title: "Bias, identity, and intellectual honesty",
      body: "Motivated reasoning is harder to detect than bad faith because it feels like rigorous thinking. The tell is asymmetry: applying a higher scrutiny standard to evidence that contradicts your position than to evidence that confirms it. The discipline is noticing the asymmetry and correcting it deliberately, not just claiming you’re being objective.",
    },
    {
      id: "rtc-m09-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "Apply the same scrutiny threshold to confirming evidence as to contradicting evidence",
      body: "Scrutiny asymmetry: you accept a study with methodological weaknesses if it confirms what you believe; you reject a study with the same weaknesses if it contradicts you. The correction: before evaluating evidence, ask — if this study reached the opposite conclusion, what questions would I ask? Now ask those same questions of the evidence as it stands.",
    },
    {
      id: "rtc-m09-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The analyst who evaluated data quality differently based on what it showed",
      body: "A strategy team has two studies on a new market. Study A (n=1,200, peer-reviewed) shows weak opportunity. Study B (n=340, industry association) shows strong opportunity. The team cites Study B as primary evidence without applying their usual methodology criteria. When asked: ‘Study B was more current and had domain expertise.’ The reasoning wasn’t wrong — but it was never applied symmetrically to Study A.",
      example: "Asymmetry test: for any two conflicting pieces of evidence, apply your critique to the evidence you prefer before applying it to the evidence you want to reject. If you can’t articulate a weakness in confirming evidence, you haven’t evaluated it rigorously.",
    },
    {
      id: "rtc-m09-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might generic language hide weak evidence in your portfolio or story? Name one fix.",
    },
    {
      id: "rtc-m09-lesson-lt-next",
      type: "next_step",
      body: "Next: rtc-m10 — all the components of research practice converge in the capstone. A defense-ready brief tests whether you can commit, limit, and defend simultaneously.",
    }
  ],

  "research-and-critical-thinking::rtc-m09-practice": [
    {
      id: "rtc-m09-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "rtc-m09-practice-lt-task",
      type: "practice_task",
      title: "Practice · Bias, identity, and intellectual honesty",
      bullets: [
        "1. Bias journal: three recent reads—where did you cheer vs. scrutinize?",
        "2. Write critique invitation to a trusted antagonist with concrete questions.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "rtc-m09-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Integrity self-review",
    },
    {
      id: "rtc-m09-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "research-and-critical-thinking::rtc-m10-lesson": [
    {
      id: "rtc-m10-lesson-lt-intro",
      type: "intro",
      eyebrow: "Integration",
      title: "Capstone rehearsal: defense-ready brief integration",
      body: "A defense-ready brief is not one where every claim is backed by overwhelming evidence. It’s one where the strength of each claim is accurately represented: strong claims backed by strong evidence, weaker claims labeled provisional, and genuine uncertainties named rather than omitted. A brief that overstates confidence fails under pressure.",
    },
    {
      id: "rtc-m10-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "Calibrate confidence in every claim to match its evidence base",
      body: "Integration test: for every claim in the brief, can you state (a) what evidence supports it, (b) what would falsify it, and (c) how confident you are and why? If any claim fails all three, it’s either unsupported (cut or qualify), unfalsifiable (rewrite as an opinion), or overconfident (add a limitation). The brief passes when its confidence calibration matches its evidence.",
    },
    {
      id: "rtc-m10-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The brief that held up in the first challenge and collapsed in the second",
      body: "A consultant presents a brief with strong executive summary language. First challenge: ‘How do you know this is the right segment?’ The brief holds — primary data. Second challenge: ‘What’s your confidence on the timing estimate?’ The brief doesn’t hold. The timing estimate was extrapolated from one case study in a different industry. The brief didn’t distinguish between the two types of claims. The audience’s confidence in the strong claims was damaged by the weak one.",
      example: "Confidence ladder: label every key claim as High (direct evidence, multiple sources), Medium (indirect or single-source), or Provisional (inference or extrapolation). Make these labels visible. A reader who can see your calibration is more likely to trust your high-confidence claims.",
    },
    {
      id: "rtc-m10-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might generic language hide weak evidence in your portfolio or story? Name one fix.",
    },
    {
      id: "rtc-m10-lesson-lt-next",
      type: "next_step",
      body: "This is the research-and-critical-thinking capstone. Before submitting, identify the claim you are least confident about and put it in front of the most skeptical reader you have access to. Their first objection is your most important revision.",
    }
  ],

  "research-and-critical-thinking::rtc-m10-practice": [
    {
      id: "rtc-m10-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "rtc-m10-practice-lt-task",
      type: "practice_task",
      title: "Practice · Capstone rehearsal: defense-ready brief integration",
      bullets: [
        "1. Record or write mock defense; log stumbles → revision tasks.",
        "2. Revision pass using capstone rubric + colleague read if available.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "rtc-m10-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Research brief v1",
    },
    {
      id: "rtc-m10-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "research-and-critical-thinking::rtc-m10-recap": [
    {
      id: "rtc-m10-recap-lt-intro",
      type: "intro",
      eyebrow: "Consolidation",
      title: "Consolidate · Capstone rehearsal: defense-ready brief integration",
      body: "Build a recap artifact you will reopen: keywords, failure modes, reuse rules—written for future-you under stress.",
    },
    {
      id: "rtc-m10-recap-lt-keys",
      type: "key_points",
      title: "Carry-forward pack",
      bullets: [
        "Keyword claim: Integrate artifacts into single narrative without duplicate claims.",
        "Failure mode to watch: Merge evidence table, synthesis, limitations, and mock-defense appendix into one arc a skeptical reader can stress-test.…",
        "Reuse rule: when to apply vs rethink this module",
      ],
    },
    {
      id: "rtc-m10-recap-lt-reflect",
      type: "reflection_prompt",
      title: "Calibration",
      prompt: "What would convince you this module did not stick—what signal would you look for in your next deliverable?",
    },
    {
      id: "rtc-m10-recap-lt-next",
      type: "next_step",
      body: "Archive the recap where your future self will actually find it.",
    }
  ],

  "research-and-critical-thinking::rtc-m10-revision": [
    {
      id: "rtc-m10-revision-lt-intro",
      type: "intro",
      eyebrow: "Revision gate",
      title: "Tighten · Capstone rehearsal: defense-ready brief integration",
      body: "Compress misunderstandings before they compound. Prefer precise claims, cited limits, and falsifiers—no glossary theater.",
    },
    {
      id: "rtc-m10-revision-lt-recap",
      type: "recap",
      title: "Compress to checks",
      bullets: [
        "Integrate artifacts into single narrative without duplicate claims.",
        "Tighten limitations until they earn trust instead of sounding defensive.",
        "Prepare Q&A cards for hostile but fair challenges.",
      ],
    },
    {
      id: "rtc-m10-revision-lt-task",
      type: "practice_task",
      title: "Structured gate",
      prompt: "In 6–10 sentences: (1) what you believe now, (2) what would falsify it, (3) what artifact proves you applied this module.",
    },
    {
      id: "rtc-m10-revision-lt-next",
      type: "next_step",
      body: "Proceed only if you would defend these claims aloud to a skeptical peer.",
    }
  ],

  "ai-powered-workflows-and-productivity::sw-m01-practice": [
    {
      id: "sw-m01-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "sw-m01-practice-lt-task",
      type: "practice_task",
      title: "Practice · Workflow thinking: decomposition, interfaces, and ownership",
      bullets: [
        "1. Swimlane sketch for one recurring mess: inbox triage, support, hiring, or reporting.",
        "2. Per lane: list top three failure modes + earliest signal each gives.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "sw-m01-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Swimlane + failure-mode sheet",
    },
    {
      id: "sw-m01-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "ai-powered-workflows-and-productivity::sw-m01-revision": [
    {
      id: "sw-m01-revision-lt-intro",
      type: "intro",
      eyebrow: "Revision gate",
      title: "Tighten · Workflow thinking: decomposition, interfaces, and ownership",
      body: "Compress misunderstandings before they compound. Prefer precise claims, cited limits, and falsifiers—no glossary theater.",
    },
    {
      id: "sw-m01-revision-lt-recap",
      type: "recap",
      title: "Compress to checks",
      bullets: [
        "Decompose messy work into substeps another person could execute from notes.",
        "Define owners, SLAs, and escalation for each interface.",
        "Flag steps that must stay human vs. candidates for augmentation.",
      ],
    },
    {
      id: "sw-m01-revision-lt-task",
      type: "practice_task",
      title: "Structured gate",
      prompt: "In 6–10 sentences: (1) what you believe now, (2) what would falsify it, (3) what artifact proves you applied this module.",
    },
    {
      id: "sw-m01-revision-lt-next",
      type: "next_step",
      body: "Proceed only if you would defend these claims aloud to a skeptical peer.",
    }
  ],

  "ai-powered-workflows-and-productivity::sw-m02-lesson": [
    {
      id: "sw-m02-lesson-lt-intro",
      type: "intro",
      eyebrow: "Grounding",
      title: "Prompt anatomy: roles, constraints, evidence policy, formats",
      body: "A vague prompt is an ambiguous specification. The model will fill in everything you don’t specify — role, audience, format, evidence standard — and will fill it in consistently but not necessarily correctly. Prompt anatomy is the discipline of making specifications explicit before the model starts, not after you see output you didn’t want.",
    },
    {
      id: "sw-m02-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "Four components that matter most: role, constraints, evidence policy, output format",
      body: "(1) Role: who is this AI acting as — not ‘a helpful assistant’ but ‘a skeptical editor reviewing for factual accuracy and overreach.’ (2) Constraints: what the output must not do or include. (3) Evidence policy: does the model produce claims from training data, only from documents I provide, or flagged when uncertain? (4) Output format: the structure the downstream consumer expects. Each component left implicit is a place where the output will surprise you.",
    },
    {
      id: "sw-m02-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The customer email that sounded like a press release",
      body: "A team prompts: ‘Write a customer email about our pricing change.’ The model produces a polished paragraph with marketing language, no specific numbers, and no explanation of how the change affects different plan types. Three revision cycles follow. The prompt didn’t specify: audience (existing customers on a specific plan), constraints (no marketing language, cite the dollar change), or format (plain language, under 100 words). All three were implicit.",
      example: "Prompt audit: before running any prompt for production use, verify each component is stated explicitly: role, constraint, evidence policy, output format. If any is missing, the model is filling it in from training priors.",
    },
    {
      id: "sw-m02-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might speed tempt you to skip verification? Name one stop rule.",
    },
    {
      id: "sw-m02-lesson-lt-next",
      type: "next_step",
      body: "Next: sw-m03 — prompt anatomy controls what the model produces. Structured outputs controls whether downstream consumers can use what it produces.",
    }
  ],

  "ai-powered-workflows-and-productivity::sw-m02-practice": [
    {
      id: "sw-m02-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "sw-m02-practice-lt-task",
      type: "practice_task",
      title: "Practice · Prompt anatomy: roles, constraints, evidence policy, formats",
      bullets: [
        "1. Refactor a vague prompt into a structured spec.",
        "2. Diff two versions and explain behavioral changes.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "sw-m02-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Versioned prompt spec v0.2",
    },
    {
      id: "sw-m02-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "ai-powered-workflows-and-productivity::sw-m03-lesson": [
    {
      id: "sw-m03-lesson-lt-intro",
      type: "intro",
      eyebrow: "Applied reasoning",
      title: "Structured outputs: schemas, tables, JSON-shaped thinking",
      body: "A well-written paragraph and a structured output solve different problems. A paragraph communicates to a human reader. A structured output enables a downstream process to extract and act on specific values without human interpretation at each step. Choosing between them is a design decision, not a default.",
    },
    {
      id: "sw-m03-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "Pick schema shapes matched to the consumer — human review or automated processing",
      body: "Unstructured in automation: ‘The priority is high and the sentiment is negative’ — the pipeline needs to parse ‘high’ and ‘negative’ as discrete values but breaks on sentence variants. Structured: `{priority: \"high\", sentiment: \"negative\"}` — consistently extractable. When the consumer is a human reviewer who needs context, forcing output into a rigid schema can strip the reasoning that makes it reviewable.",
    },
    {
      id: "sw-m03-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The intake form that produced 40 formats for 'urgency'",
      body: "An ops team builds AI-assisted ticket triage. The prompt asks the model to classify urgency. Returns across 40 tickets: ‘high,’ ‘HIGH,’ ‘urgent,’ ‘very urgent,’ ‘Priority 1,’ ‘critical.’ The routing logic was built to match ‘high/medium/low.’ Tickets route incorrectly for 3 days. The prompt never defined the output schema. The model improvised.",
      example: "Null semantics: for any structured output schema, define what the model should return when it doesn’t know a value (‘unknown’), when the value is absent (‘not_provided’), and when confidence is below threshold (‘uncertain’). Silent nulls in automation cause downstream errors that are hard to trace.",
    },
    {
      id: "sw-m03-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might speed tempt you to skip verification? Name one stop rule.",
    },
    {
      id: "sw-m03-lesson-lt-next",
      type: "next_step",
      body: "Next: sw-m04 — structured outputs define what a single step produces. Multi-step chains build sequences of those steps with explicit verification between them.",
    }
  ],

  "ai-powered-workflows-and-productivity::sw-m03-practice": [
    {
      id: "sw-m03-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "sw-m03-practice-lt-task",
      type: "practice_task",
      title: "Practice · Structured outputs: schemas, tables, JSON-shaped thinking",
      bullets: [
        "1. Design schema for intake → triage → recommendation with explicit null semantics.",
        "2. Adversarial test: ambiguous user text, typos, missing IDs—what breaks?",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "sw-m03-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Schema + validation story",
    },
    {
      id: "sw-m03-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "ai-powered-workflows-and-productivity::sw-m04-lesson": [
    {
      id: "sw-m04-lesson-lt-intro",
      type: "intro",
      eyebrow: "Applied reasoning",
      title: "Multi-step prompting: chains, checkpoints, and rollback",
      body: "A multi-step chain compounds errors. If step 1 produces a mistake, every subsequent step builds on that mistake. The discipline is designing chains that surface errors at the step where they occur, not at the end where they’ve propagated through three downstream transformations.",
    },
    {
      id: "sw-m04-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "Place checkpoints at steps where a bad output would be amplified, not just formatted",
      body: "Chain failure modes: (1) error propagation — wrong classification in step 1 produces wrong routing in step 2; (2) context drift — the chain accumulates context that skews later steps; (3) silent failure — step 2 accepts a malformed output from step 1 and continues. Checkpoints are explicit gates where a human or validation function inspects the output before the chain continues.",
    },
    {
      id: "sw-m04-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The summarization chain that reversed the conclusion",
      body: "A 3-step chain: extract key claims, rank by importance, summarize top 5. A document contains a main claim qualified by a significant exception. Step 1 extracts both as separate items. Step 2 ranks the main claim first, the exception eighth. Step 3 summarizes the top 5, omitting the exception. The final summary is accurate to its input and misleading relative to the original document. No checkpoint caught the ranking step.",
      example: "Checkpoint placement: place a review gate at any step where (1) the step changes the meaning or weighting of information, or (2) a downstream automation will act on the output without further human review.",
    },
    {
      id: "sw-m04-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might speed tempt you to skip verification? Name one stop rule.",
    },
    {
      id: "sw-m04-lesson-lt-next",
      type: "next_step",
      body: "Next: sw-m06 — prompt chains handle structured reasoning. Writing and editorial pipelines with QA hooks build the human-in-the-loop structure for content workflows.",
    }
  ],

  "ai-powered-workflows-and-productivity::sw-m04-practice": [
    {
      id: "sw-m04-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "sw-m04-practice-lt-task",
      type: "practice_task",
      title: "Practice · Multi-step prompting: chains, checkpoints, and rollback",
      bullets: [
        "1. Build a 4-step chain with explicit verification gates.",
        "2. Simulate drift and rollback.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "sw-m04-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Chain spec + checkpoint & rollback log",
    },
    {
      id: "sw-m04-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "ai-powered-workflows-and-productivity::sw-m06-lesson": [
    {
      id: "sw-m06-lesson-lt-intro",
      type: "intro",
      eyebrow: "Professional judgment",
      title: "Writing and editorial pipelines with QA hooks",
      body: "An AI-assisted writing pipeline that doesn’t separate the generation step from the review step is a pipeline where the model is reviewing its own work. That’s not a review — it’s the model performing confidence. The discipline is designing the review step to be independent of generation, with different criteria for different categories of error.",
    },
    {
      id: "sw-m06-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "Tailor QA depth to the stakes of the output, not its length",
      body: "A QA hook is a structured check that tests for a specific error category. For a low-stakes blog: grammar and brand voice. For a customer-facing policy document: factual accuracy, legal claim review, approval sign-off. For a financial communication: regulatory compliance and a second reviewer. The mismatch failure: applying low-stakes QA to a high-stakes output because ‘we have a review process.’ Review depth must match error consequence.",
    },
    {
      id: "sw-m06-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The AI-generated FAQ with the incorrect pricing figure",
      body: "A customer success team uses an AI pipeline: generate, review for tone, publish. A FAQ answer about enterprise pricing includes a figure from a previous pricing structure. The tone review passes. The factual review step doesn’t exist. 400 customers receive the incorrect figure. The error was in the pipeline design — not in the model’s output quality.",
      example: "Error category mapping: before designing a QA pipeline, list the categories of error that would cause material harm (factual errors, legal claims, pricing errors). Assign a review owner to each. A pipeline without category ownership is one where nobody is responsible for the errors that matter most.",
    },
    {
      id: "sw-m06-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might speed tempt you to skip verification? Name one stop rule.",
    },
    {
      id: "sw-m06-lesson-lt-next",
      type: "next_step",
      body: "Next: sw-m08 — QA hooks protect individual outputs. Reusable libraries build the infrastructure for sustaining quality at scale.",
    }
  ],

  "ai-powered-workflows-and-productivity::sw-m07-practice": [
    {
      id: "sw-m07-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "sw-m07-practice-lt-task",
      type: "practice_task",
      title: "Practice · Operational workflows: routing, SLAs, and exception handling",
      bullets: [
        "1. Draw ops diagram with AI touchpoints + required human checkpoints.",
        "2. Author exception playbook for volume spike, bad model day, vendor outage.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "sw-m07-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Ops diagram + exception playbook",
    },
    {
      id: "sw-m07-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "ai-powered-workflows-and-productivity::sw-m08-lesson": [
    {
      id: "sw-m08-lesson-lt-intro",
      type: "intro",
      eyebrow: "Professional judgment",
      title: "Reusable libraries: naming, versioning, deprecation",
      body: "A team that builds 40 prompts over 6 months and hasn’t versioned any of them has no operational baseline. When a model update changes behavior, they can’t identify which prompts are affected, what they previously produced, or which version was in use when an error occurred. Versioning is not overhead — it’s minimum operational hygiene for AI-assisted work.",
    },
    {
      id: "sw-m08-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "Create naming conventions teams can discover, and version disciplines they can maintain",
      body: "Naming failure: prompts called ‘final,’ ‘final_v2,’ ‘use_this_one,’ ‘ACTUAL_FINAL.’ Versioning failure: version is bumped but change rationale isn’t recorded. The useful convention encodes function (what the prompt does), version (incremental), and status (active/deprecated). The useful versioning practice: each increment records what changed, why, and what output differences were observed in testing.",
    },
    {
      id: "sw-m08-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The prompt library nobody could use after the original author left",
      body: "A team builds 30 prompts over a year, organized in a folder. When the original author leaves, a new team member opens the folder: files named ‘email_v2,’ ‘email_final,’ ‘email_used,’ ‘email_jan,’ ‘email_NEW.’ No purpose documentation, no ownership, no change history. The library is unusable without the author. The team rebuilds from scratch.",
      example: "Prompt metadata minimum: every production prompt should have: (1) function in one sentence, (2) version number and date of last change, (3) owner, (4) status (active/deprecated), (5) change log with rationale. If you can’t maintain all five for all prompts, maintain all five for your highest-stakes prompts and none for the rest — not partial metadata on all.",
    },
    {
      id: "sw-m08-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might speed tempt you to skip verification? Name one stop rule.",
    },
    {
      id: "sw-m08-lesson-lt-next",
      type: "next_step",
      body: "Next: sw-m09 — libraries manage the building blocks. Automation design builds the structures that execute them without human intervention at each step.",
    }
  ],

  "ai-powered-workflows-and-productivity::sw-m08-practice": [
    {
      id: "sw-m08-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "sw-m08-practice-lt-task",
      type: "practice_task",
      title: "Practice · Reusable libraries: naming, versioning, deprecation",
      bullets: [
        "1. Mini catalog of 5 assets with owners.",
        "2. Deprecation note for one legacy asset.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "sw-m08-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Workflow asset catalog sheet + deprecation note",
    },
    {
      id: "sw-m08-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "ai-powered-workflows-and-productivity::sw-m08-revision": [
    {
      id: "sw-m08-revision-lt-intro",
      type: "intro",
      eyebrow: "Revision gate",
      title: "Tighten · Reusable libraries: naming, versioning, deprecation",
      body: "Compress misunderstandings before they compound. Prefer precise claims, cited limits, and falsifiers—no glossary theater.",
    },
    {
      id: "sw-m08-revision-lt-recap",
      type: "recap",
      title: "Compress to checks",
      bullets: [
        "Create naming conventions that teams adopt.",
        "Document assumptions and dependencies.",
        "Sunset cruft safely.",
      ],
    },
    {
      id: "sw-m08-revision-lt-task",
      type: "practice_task",
      title: "Structured gate",
      prompt: "In 6–10 sentences: (1) what you believe now, (2) what would falsify it, (3) what artifact proves you applied this module.",
    },
    {
      id: "sw-m08-revision-lt-next",
      type: "next_step",
      body: "Proceed only if you would defend these claims aloud to a skeptical peer.",
    }
  ],

  "ai-powered-workflows-and-productivity::sw-m09-lesson": [
    {
      id: "sw-m09-lesson-lt-intro",
      type: "intro",
      eyebrow: "Integration",
      title: "Automation design: triggers, tools, limits, kill switches",
      body: "Automation amplifies whatever your workflow already does. A well-designed workflow that is automated becomes faster. A poorly designed workflow that is automated becomes faster at producing the wrong outputs. The discipline is deciding what to automate — and what not to — before designing the automation.",
    },
    {
      id: "sw-m09-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "Specify triggers with explicit false-positive tolerance before building the automation",
      body: "A trigger specification states: the condition, the acceptable false positive rate (what percentage of incorrect triggers are tolerable and why), and the kill switch condition (when the automation should stop and wait for human review). Without a written false-positive tolerance, the automation runs until someone notices the errors and escalates.",
    },
    {
      id: "sw-m09-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The support router that escalated 30% of tickets incorrectly",
      body: "A support team automates ticket routing. Trigger: ‘if the ticket mentions billing, route to billing team.’ Month 1: 30% of billing-routed tickets are actually login issues that mention billing in passing (‘I can’t log in to view my invoice’). The routing creates a new manual re-routing task. The automation saved no time on routing. The trigger was too broad; no false-positive tolerance had been specified.",
      example: "Kill switch design: every automated workflow needs an observable health metric and an explicit degradation threshold. ‘If human re-routing rate exceeds 15% in 24 hours, pause automation and alert the operations lead.’ Build this before launch, not after the first incident.",
    },
    {
      id: "sw-m09-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might speed tempt you to skip verification? Name one stop rule.",
    },
    {
      id: "sw-m09-lesson-lt-next",
      type: "next_step",
      body: "Next: sw-m10 — automation runs the workflow. Measuring workflow quality without vanity metrics determines whether it’s running well.",
    }
  ],

  "ai-powered-workflows-and-productivity::sw-m09-practice": [
    {
      id: "sw-m09-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "sw-m09-practice-lt-task",
      type: "practice_task",
      title: "Practice · Automation design: triggers, tools, limits, kill switches",
      bullets: [
        "1. FMEA-lite for one automated branch.",
        "2. Kill-switch drill narrative.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "sw-m09-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Automation one-pager with risks",
    },
    {
      id: "sw-m09-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "ai-powered-workflows-and-productivity::sw-m10-lesson": [
    {
      id: "sw-m10-lesson-lt-intro",
      type: "intro",
      eyebrow: "Integration",
      title: "Measuring workflow quality without vanity metrics",
      body: "A workflow metric that can’t detect degradation is not a quality metric — it’s a comfort metric. Volume processed and prompts run tell you the workflow is active. They don’t tell you whether outputs are correct, rework is increasing, or downstream consumers are quietly fixing errors they’ve stopped reporting.",
    },
    {
      id: "sw-m10-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "Three signals worth measuring: rework rate, error escape rate, reviewer trust trends",
      body: "Rework rate: what percentage of AI-assisted outputs are revised before use, and by how much? Error escape rate: how many errors reach downstream consumers rather than being caught in review? Reviewer trust signals: are reviewers approving outputs faster over time (suggesting drift into rubber-stamping), or maintaining consistent scrutiny? These three can be measured with lightweight instrumentation. Vanity metrics can improve while all three deteriorate.",
    },
    {
      id: "sw-m10-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The content pipeline that was 'working' while error rates climbed",
      body: "A content team’s AI pipeline produces 50 pieces per week. Stakeholders track pieces produced. In month 3: a model update changes output tone. Reviewers approve with cosmetic edits. In month 4: a content audit finds 40% of pieces from the prior two months contain factually weak or outdated claims. The pieces-per-week metric was green throughout. The error escape rate was never tracked.",
      example: "Vanity metric test: for any workflow metric you’re tracking, ask: ‘Could this metric show improvement while the workflow produces lower-quality outputs?’ If yes, it’s a vanity metric. You need at least one metric that detects quality degradation, not just activity.",
    },
    {
      id: "sw-m10-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might speed tempt you to skip verification? Name one stop rule.",
    },
    {
      id: "sw-m10-lesson-lt-next",
      type: "next_step",
      body: "Next: sw-m11 — you’ve designed and measured individual workflows. The capstone assembles them into a library a colleague could operate without you in the room.",
    }
  ],

  "ai-powered-workflows-and-productivity::sw-m10-practice": [
    {
      id: "sw-m10-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "sw-m10-practice-lt-task",
      type: "practice_task",
      title: "Practice · Measuring workflow quality without vanity metrics",
      bullets: [
        "1. Pick three workflow metrics; write definitions + failure interpretations.",
        "2. Red-team how each metric could be gamed; add guardrails.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "sw-m10-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Workflow metrics spec + gaming guardrails",
    },
    {
      id: "sw-m10-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "ai-powered-workflows-and-productivity::sw-m11-lesson": [
    {
      id: "sw-m11-lesson-lt-intro",
      type: "intro",
      eyebrow: "Integration",
      title: "Capstone assembly: workflow library packaging",
      body: "The test of a workflow library is not whether you can run it — it’s whether someone who wasn’t involved in building it can run it, understand what each workflow is supposed to produce, know when it’s working and when it isn’t, and stop it safely when something goes wrong. A library that only works with the author present is not a library.",
    },
    {
      id: "sw-m11-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "Convert tacit knowledge into explicit documentation for failure modes and override conditions",
      body: "Tacit knowledge is the gap between the documentation and what the author actually does. The author knows: when to override a trigger, which edge cases the prompt doesn’t handle, what output looks like on a bad day. A library package converts this: known failure modes (with their signals), override conditions (with criteria), output quality reference examples, and a handoff protocol (who owns what when the author is unavailable).",
    },
    {
      id: "sw-m11-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The workflow that needed a 45-minute call every time someone joined",
      body: "A team has a well-functioning AI research workflow. Each time a new member joins, the author spends 45 minutes explaining: which inputs are tricky, what to watch for in the output, when to override, and who to contact if something breaks. None of this is documented. When the author changes roles, three new team members are unable to use the workflow without errors.",
      example: "Library readiness test: give your documentation to a colleague who hasn’t seen it. Ask them to run a test input and identify: (1) what to do if the trigger fires incorrectly, (2) what a high-quality output looks like vs. a marginal one, (3) who to contact if something breaks. If they can’t answer all three from the documentation, the gaps are your documentation debt.",
    },
    {
      id: "sw-m11-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might speed tempt you to skip verification? Name one stop rule.",
    },
    {
      id: "sw-m11-lesson-lt-next",
      type: "next_step",
      body: "This is the smart-workflows capstone. The library you’ve built should be operable by someone who wasn’t in the room when you designed it. That’s the test. Take it literally.",
    }
  ],

  "ai-powered-workflows-and-productivity::sw-m11-practice": [
    {
      id: "sw-m11-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "sw-m11-practice-lt-task",
      type: "practice_task",
      title: "Practice · Capstone assembly: workflow library packaging",
      bullets: [
        "1. Walkthrough with colleague or recorded self-review.",
        "2. Cut ambiguity until failure modes are enumerated.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "sw-m11-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Workflow library pack v1",
    },
    {
      id: "sw-m11-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "ai-powered-workflows-and-productivity::sw-m11-recap": [
    {
      id: "sw-m11-recap-lt-intro",
      type: "intro",
      eyebrow: "Consolidation",
      title: "Consolidate · Capstone assembly: workflow library packaging",
      body: "Build a recap artifact you will reopen: keywords, failure modes, reuse rules—written for future-you under stress.",
    },
    {
      id: "sw-m11-recap-lt-keys",
      type: "key_points",
      title: "Carry-forward pack",
      bullets: [
        "Keyword claim: Externalize tacit knowledge without drowning readers.",
        "Failure mode to watch: Merge named workflow packages, rubrics, catalog sheet, and rollout memo into one library a peer could pilot—cut tacit st…",
        "Reuse rule: when to apply vs rethink this module",
      ],
    },
    {
      id: "sw-m11-recap-lt-reflect",
      type: "reflection_prompt",
      title: "Calibration",
      prompt: "What would convince you this module did not stick—what signal would you look for in your next deliverable?",
    },
    {
      id: "sw-m11-recap-lt-next",
      type: "next_step",
      body: "Archive the recap where your future self will actually find it.",
    }
  ],

  "ai-powered-workflows-and-productivity::sw-m11-revision": [
    {
      id: "sw-m11-revision-lt-intro",
      type: "intro",
      eyebrow: "Revision gate",
      title: "Tighten · Capstone assembly: workflow library packaging",
      body: "Compress misunderstandings before they compound. Prefer precise claims, cited limits, and falsifiers—no glossary theater.",
    },
    {
      id: "sw-m11-revision-lt-recap",
      type: "recap",
      title: "Compress to checks",
      bullets: [
        "Externalize tacit knowledge without drowning readers.",
        "Peer walkthrough dry run.",
        "Finalize rollout narrative.",
      ],
    },
    {
      id: "sw-m11-revision-lt-task",
      type: "practice_task",
      title: "Structured gate",
      prompt: "In 6–10 sentences: (1) what you believe now, (2) what would falsify it, (3) what artifact proves you applied this module.",
    },
    {
      id: "sw-m11-revision-lt-next",
      type: "next_step",
      body: "Proceed only if you would defend these claims aloud to a skeptical peer.",
    }
  ],

  "teaching-and-facilitation::taf-m01-practice": [
    {
      id: "taf-m01-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "taf-m01-practice-lt-task",
      type: "practice_task",
      title: "Practice · Objectives, outcomes, and measurable understanding",
      bullets: [
        "1. Rewrite five vague objectives into measurable outcomes + evidence of mastery.",
        "2. Design two formative checks (one fast signal, one deeper) for the same lesson.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "taf-m01-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Outcomes + checks draft",
    },
    {
      id: "taf-m01-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "teaching-and-facilitation::taf-m01-revision": [
    {
      id: "taf-m01-revision-lt-intro",
      type: "intro",
      eyebrow: "Revision gate",
      title: "Tighten · Objectives, outcomes, and measurable understanding",
      body: "Compress misunderstandings before they compound. Prefer precise claims, cited limits, and falsifiers—no glossary theater.",
    },
    {
      id: "taf-m01-revision-lt-recap",
      type: "recap",
      title: "Compress to checks",
      bullets: [
        "Draft objectives using action verbs tied to observable behaviors.",
        "Pick formative checks matched to cognitive demands—not trivia.",
        "Trim coverage plans that exceed attention budgets.",
      ],
    },
    {
      id: "taf-m01-revision-lt-task",
      type: "practice_task",
      title: "Structured gate",
      prompt: "In 6–10 sentences: (1) what you believe now, (2) what would falsify it, (3) what artifact proves you applied this module.",
    },
    {
      id: "taf-m01-revision-lt-next",
      type: "next_step",
      body: "Proceed only if you would defend these claims aloud to a skeptical peer.",
    }
  ],

  "teaching-and-facilitation::taf-m02-lesson": [
    {
      id: "taf-m02-lesson-lt-intro",
      type: "intro",
      eyebrow: "Grounding",
      title: "Cognitive load, sequencing, and misconceptions",
      body: "Most explanations fail not because the content is wrong but because the learner is holding too much new information simultaneously. Cognitive load management is the discipline of sequencing content so each new element builds on something already stable in the learner’s working memory, not on something they’re still trying to process.",
    },
    {
      id: "taf-m02-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "Sequence prerequisites without hidden leaps by mapping what the learner must hold before each new concept",
      body: "A hidden leap is a step that feels obvious to the expert and opaque to the learner. Experts miss them because they no longer remember not knowing the prerequisite. Fix: write out the full prerequisite chain for every new concept and check that each link has been taught and practiced before the next concept introduces it. Test: give your sequence to someone at the learner’s starting level. Where they get stuck is where you have a hidden leap.",
    },
    {
      id: "taf-m02-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The lesson that assumed learners understood variables",
      body: "A session on for-loops opens: ‘A for-loop iterates over a sequence.’ Six learners have never encountered iteration. Three don’t have a stable model of what a variable is. The facilitator hasn’t checked these prerequisites. Learners who are confused stay confused for the rest of the session because the gap is two levels below the current material. The facilitator troubleshoots at the wrong level.",
      example: "Misconception audit: before teaching any concept, write the two most plausible wrong answers a learner might hold about it. Address the misconception first: ‘You might think X, because it looks like Y. Here’s why that model breaks.’ Then introduce the correct model.",
    },
    {
      id: "taf-m02-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might optimism hide missing evidence in your facilitation or leadership narrative? Name one patch.",
    },
    {
      id: "taf-m02-lesson-lt-next",
      type: "next_step",
      body: "Next: taf-m03 — you’ve sequenced the content. Explanations that land builds the craft of making each unit of content actually stick.",
    }
  ],

  "teaching-and-facilitation::taf-m02-practice": [
    {
      id: "taf-m02-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "taf-m02-practice-lt-task",
      type: "practice_task",
      title: "Practice · Cognitive load, sequencing, and misconceptions",
      bullets: [
        "1. Critique a dense outline; reorder for load + add misconception checkpoints.",
        "2. Write “predict wrong answers” list for one tricky concept.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "taf-m02-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Sequence + misconception map",
    },
    {
      id: "taf-m02-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "teaching-and-facilitation::taf-m03-lesson": [
    {
      id: "taf-m03-lesson-lt-intro",
      type: "intro",
      eyebrow: "Grounding",
      title: "Explanations that land: analogies, examples, precision",
      body: "An analogy that doesn’t know its own limits is more dangerous than no analogy. It creates a mental model that works for the core cases and fails silently on the edge cases the learner will encounter next. The discipline is testing every analogy for where it breaks and teaching that limit deliberately.",
    },
    {
      id: "taf-m03-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "Test every analogy for leakage, then teach the limit as part of the analogy",
      body: "Analogy leakage: a learner applies an analogy beyond its intended scope and reaches a wrong conclusion. Example: ‘RAM is like a desk, hard drive is a filing cabinet.’ Leakage: the desk metaphor implies clearing RAM is a deliberate act. Actually, RAM clears automatically when power is removed. Teaching the limit: ‘This analogy works for understanding why more RAM helps speed. It breaks when you think about what happens to RAM when the computer turns off.’",
    },
    {
      id: "taf-m03-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The business student who treated the margin analogy too literally",
      body: "An instructor explains gross margin as ‘what’s left after paying for the ingredients.’ A student applies this: a restaurant with 60% margin is keeping 60 cents of every dollar as profit. The student uses this in a financial analysis and recommends expansion because ‘the margins are strong.’ The analogy had no stated limit: gross margin doesn’t include labor, rent, or overhead. The correct limit should have been: ‘This covers cost of goods sold only. It doesn’t tell you what’s left after running the operation.’",
      example: "Precision edit rule: scan any explanation for ‘basically,’ ‘kind of,’ ‘sort of,’ ‘essentially.’ Each one marks a place where you chose approximate language. Replace with the precise term and explain what makes it precise. Approximation builds intuition; precision is required for application.",
    },
    {
      id: "taf-m03-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might optimism hide missing evidence in your facilitation or leadership narrative? Name one patch.",
    },
    {
      id: "taf-m03-lesson-lt-next",
      type: "next_step",
      body: "Next: taf-m04 — explanations introduce concepts. Practice design determines whether learners can actually use what they’ve been introduced to.",
    }
  ],

  "teaching-and-facilitation::taf-m03-practice": [
    {
      id: "taf-m03-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "taf-m03-practice-lt-task",
      type: "practice_task",
      title: "Practice · Explanations that land: analogies, examples, precision",
      bullets: [
        "1. Explain-it-three-ways drill with explicit limits of each metaphor.",
        "2. Precision edit pass on a jargon-heavy paragraph.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "taf-m03-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Explanation ladder draft",
    },
    {
      id: "taf-m03-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "teaching-and-facilitation::taf-m03-recap": [
    {
      id: "taf-m03-recap-lt-intro",
      type: "intro",
      eyebrow: "Consolidation",
      title: "Consolidate · Explanations that land: analogies, examples, precision",
      body: "Build a recap artifact you will reopen: keywords, failure modes, reuse rules—written for future-you under stress.",
    },
    {
      id: "taf-m03-recap-lt-keys",
      type: "key_points",
      title: "Carry-forward pack",
      bullets: [
        "Keyword claim: Test analogies for leakage and false mappings.",
        "Failure mode to watch: Layer concrete → abstract; choose analogies that fail gracefully when stretched.…",
        "Reuse rule: when to apply vs rethink this module",
      ],
    },
    {
      id: "taf-m03-recap-lt-reflect",
      type: "reflection_prompt",
      title: "Calibration",
      prompt: "What would convince you this module did not stick—what signal would you look for in your next deliverable?",
    },
    {
      id: "taf-m03-recap-lt-next",
      type: "next_step",
      body: "Archive the recap where your future self will actually find it.",
    }
  ],

  "teaching-and-facilitation::taf-m04-lesson": [
    {
      id: "taf-m04-lesson-lt-intro",
      type: "intro",
      eyebrow: "Applied reasoning",
      title: "Practice design: reps, constraints, feedback",
      body: "Practice without feedback is rehearsal of whatever the learner is already doing, including their errors. The design of feedback is as important as the design of the practice task: feedback must reach the learner at the moment of the error, not at the end of the session.",
    },
    {
      id: "taf-m04-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "Sequence reps from guided to constrained to independent, with success criteria stated before each rep starts",
      body: "Three phases: guided (with scaffolding, model answer visible), constrained (specific constraints targeting the hardest part of the skill), independent (no scaffolding, new instance). Each phase has a success criterion stated in advance: ‘In the guided phase, you’ve succeeded if you can explain why step 3 comes before step 2.’ Without stated criteria, the learner doesn’t know what they’re practicing toward.",
    },
    {
      id: "taf-m04-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The writing workshop where everyone produced more sentences but didn't improve",
      body: "A writing workshop runs three rounds: write a paragraph, peer review, revise. Post-session: learners feel they improved but can’t articulate how. Observer notes: peer review was vague (‘this is unclear,’ ‘good opening’). No rep had a specific success criterion. Without constraints and criteria, learners practiced writing but not the specific move the session was targeting. Everyone produced more sentences. Nobody got better at the specific move.",
      example: "Constraint design: the most useful constraints isolate the hardest part of the skill. For writing precision: ‘You have 50 words to explain this concept to someone who has never heard of it.’ For data analysis: ‘Produce a conclusion without using the word “trend.”’ The constraint forces exactly the move you want.",
    },
    {
      id: "taf-m04-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might optimism hide missing evidence in your facilitation or leadership narrative? Name one patch.",
    },
    {
      id: "taf-m04-lesson-lt-next",
      type: "next_step",
      body: "Next: taf-m06 — practice design optimizes for skill. Inclusive rooms ensures the social conditions of the room allow all learners to actually practice.",
    }
  ],

  "teaching-and-facilitation::taf-m04-practice": [
    {
      id: "taf-m04-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "taf-m04-practice-lt-task",
      type: "practice_task",
      title: "Practice · Practice design: reps, constraints, feedback",
      bullets: [
        "1. Design one practice arc with success criteria per rep.",
        "2. Peer teach-back with observer rubric focused on skill, not polish.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "taf-m04-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Practice arc plan",
    },
    {
      id: "taf-m04-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "teaching-and-facilitation::taf-m06-lesson": [
    {
      id: "taf-m06-lesson-lt-intro",
      type: "intro",
      eyebrow: "Applied reasoning",
      title: "Inclusive rooms: access, norms, and repair",
      body: "Norms that exist in a document but haven’t been co-created with the room are facilitator wishes, not operational agreements. The learner excluded by a power dynamic, a language gap, or an unsafe comment won’t tell you. They’ll disengage, and you’ll interpret that as a motivation problem.",
    },
    {
      id: "taf-m06-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "Co-create norms learners can cite when friction appears, not norms they’ve been given to comply with",
      body: "Top-down failure: the facilitator opens with ‘Our ground rules are: be respectful, assume good intent.’ When a comment lands badly, nobody cites the norms because nobody owns them. Co-created norms: the facilitator asks the group to generate the conditions under which they learn best, then makes two or three additions the group missed. When friction appears, any learner can invoke what they agreed on.",
    },
    {
      id: "taf-m06-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The workshop where the most senior people dominated the discussion",
      body: "A leadership workshop has 12 participants including two VPs. Within 20 minutes, both VPs are answering before others can respond, and their answers are unchallenged. No norm about airtime or hierarchy was established. By the end, junior participants have spoken for less than 15% of discussion time. The VPs found the session valuable. The junior participants found it was ‘just listening to the VPs.’",
      example: "Repair script: when something has gone wrong (an exclusionary comment, a power dynamic that shut down participation), a repair is an explicit acknowledgment and a deliberate reset: ‘I want to pause here. I noticed [specific thing happened]. I’d like us to [specific action that resets the condition].’",
    },
    {
      id: "taf-m06-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might optimism hide missing evidence in your facilitation or leadership narrative? Name one patch.",
    },
    {
      id: "taf-m06-lesson-lt-next",
      type: "next_step",
      body: "Next: taf-m08 — live facilitation manages the room in real time. Async teaching builds the infrastructure for learning that happens without you present.",
    }
  ],

  "teaching-and-facilitation::taf-m07-practice": [
    {
      id: "taf-m07-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "taf-m07-practice-lt-task",
      type: "practice_task",
      title: "Practice · Assessment that informs teaching, not ranking obsession",
      bullets: [
        "1. Assessment blueprint with item-objective matrix.",
        "2. Draft rubric with student-facing language + exemplars.",
        "3. One-page instructional review sheet: signals to watch weekly + intervention triggers.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "taf-m07-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Assessment blueprint + rubric + instructional review strip",
    },
    {
      id: "taf-m07-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "teaching-and-facilitation::taf-m08-lesson": [
    {
      id: "taf-m08-lesson-lt-intro",
      type: "intro",
      eyebrow: "Professional judgment",
      title: "Async teaching: docs, recordings, office hours",
      body: "An async learning resource that doesn’t anticipate the learner’s stuck points is a resource that generates help requests. The design of async materials is a conversation with a learner you can’t hear — predicting where they’ll stop, what they’ll misunderstand, and what question they’ll have before they know to ask it.",
    },
    {
      id: "taf-m08-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "Chunk async modules with effort estimates and exit checkpoints so learners can self-regulate",
      body: "Failure mode: a 45-minute video with no chapters, no pause points, no checkpoints. The learner watches passively, reaches minute 40, and realizes they didn’t retain minutes 12-18 because they were confused and kept going. Chunking principle: each unit has an estimated effort (not ‘quick,’ but ‘12 minutes’), a clear entry requirement, and an exit checkpoint (‘by the end, you should be able to do Y — test yourself with Z’).",
    },
    {
      id: "taf-m08-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The onboarding doc that took 2 hours to read and taught nothing actionable",
      body: "A new hire is given a 45-page onboarding document: company history, product overview, team structure, technical systems, internal processes. No sections flagged as ‘required before day 1’ vs. ‘useful reference.’ The hire reads all 45 pages. On day 1, they can’t identify which technical system is relevant to their role. The document assumed sequential reading would produce prioritized retention. It produced fatigue.",
      example: "Office hours design: office hours with no structure produce two outcomes: people with the most social confidence attend, or nobody attends. Productive office hours have a stated purpose (debugging a specific deliverable, not ‘ask anything’), a size constraint (no more than 4 people), and a preparation requirement (come with the specific thing you’re stuck on).",
    },
    {
      id: "taf-m08-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might optimism hide missing evidence in your facilitation or leadership narrative? Name one patch.",
    },
    {
      id: "taf-m08-lesson-lt-next",
      type: "next_step",
      body: "Next: taf-m09 — async materials run without you. Handling difficult participants and edge cases builds the skill for when the live room goes off script.",
    }
  ],

  "teaching-and-facilitation::taf-m08-practice": [
    {
      id: "taf-m08-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "taf-m08-practice-lt-task",
      type: "practice_task",
      title: "Practice · Async teaching: docs, recordings, office hours",
      bullets: [
        "1. Async module outline with checkpoints + links.",
        "2. FAQ seed list from anticipated misconceptions.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "taf-m08-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Async path outline",
    },
    {
      id: "taf-m08-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "teaching-and-facilitation::taf-m09-lesson": [
    {
      id: "taf-m09-lesson-lt-intro",
      type: "intro",
      eyebrow: "Integration",
      title: "Handling difficult participants and edge cases",
      body: "The facilitator’s response to a difficult moment models for every other participant what the norms actually are. If you let a dominating participant continue, you’ve communicated that domination is acceptable. If you address it clumsily and humiliate them, you’ve created an unsafe room. The discipline is having pre-thought responses that address the behavior without targeting the person.",
    },
    {
      id: "taf-m09-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "Prepare scripts for typical disruption patterns before the session, not during it",
      body: "Improvising under social pressure produces over-reaction (escalating tension) or under-reaction (letting behavior continue). Pre-scripted responses: ‘I want to make sure we hear from a few more people before we close on this’ (dominating participant). ‘Can you say more about what you’re asking?’ (hostile question). These aren’t deceptive — they’re the practiced version of a response you intend to give.",
    },
    {
      id: "taf-m09-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The Q&A derailed by one expert participant",
      body: "A facilitator runs a session on data interpretation. One participant with a statistics background begins challenging the simplified examples with valid but inaccessible points. The facilitator doesn’t redirect. The Q&A becomes a two-person conversation. The other 11 participants disengage. The needed script: ‘I want to honor this — can we continue after the session? I need to keep the room with me right now.’ That script didn’t exist.",
      example: "Disruption triage: before any session, categorize the three most likely edge cases (dominating participant, hostile question, off-topic derail) and write one opening sentence for each. The opening sentence is the hardest part under pressure. Once you have it, the rest of the response comes more naturally.",
    },
    {
      id: "taf-m09-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might optimism hide missing evidence in your facilitation or leadership narrative? Name one patch.",
    },
    {
      id: "taf-m09-lesson-lt-next",
      type: "next_step",
      body: "Next: taf-m10 — all session design components converge in the capstone. Kit integration tests whether your objectives, activities, materials, and assessments are aligned and whether another facilitator could deliver from your documentation.",
    }
  ],

  "teaching-and-facilitation::taf-m09-practice": [
    {
      id: "taf-m09-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "taf-m09-practice-lt-task",
      type: "practice_task",
      title: "Practice · Handling difficult participants and edge cases",
      bullets: [
        "1. Edge-case playbook with triggers + responses.",
        "2. Scenario triage table: behavior → first move → escalation.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "taf-m09-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Edge-case playbook",
    },
    {
      id: "taf-m09-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "teaching-and-facilitation::taf-m10-lesson": [
    {
      id: "taf-m10-lesson-lt-intro",
      type: "intro",
      eyebrow: "Integration",
      title: "Capstone rehearsal: kit integration",
      body: "A teaching kit that only the original designer can run is not a kit — it’s an experience stored in one person’s head. The integration test is alignment: do the objectives, activities, practice tasks, and assessments all point at the same outcome? And could a qualified facilitator who didn’t design the session deliver it from the documentation?",
    },
    {
      id: "taf-m10-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "Cross-check objectives against activities and assessments for gaps before the pilot",
      body: "Alignment audit: for every objective, identify which activity develops it and which assessment measures it. If an objective has no activity, the session doesn’t develop it. If an objective has no assessment, you won’t know whether it was achieved. The pre-pilot audit catches these gaps when they’re cheap to fix — not during a session when a learner asks what they were supposed to learn from an activity.",
    },
    {
      id: "taf-m10-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The workshop with seven objectives and no way to know if three were met",
      body: "A leadership workshop has seven objectives. After the session, the team can identify activities for four. For the other three, the activities ‘covered the content’ but weren’t designed to produce the stated behavior. Example: objective 3 was ‘participants can identify when a decision is being avoided rather than delegated.’ The activity was a case study discussion that measured whether participants could talk about it, not whether they could actually identify it.",
      example: "Observer brief: before the pilot, give an observer a card with: (1) the three objectives you’re most uncertain about, (2) what you’d expect to see if learners have met each one, (3) the specific moments in the session where evidence should appear. Their notes are your most valuable revision input.",
    },
    {
      id: "taf-m10-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might optimism hide missing evidence in your facilitation or leadership narrative? Name one patch.",
    },
    {
      id: "taf-m10-lesson-lt-next",
      type: "next_step",
      body: "This is the teaching-and-facilitation capstone. Before handing the kit to another facilitator, have someone who wasn’t in the design process run a section from it without your coaching. What they get stuck on is what your documentation doesn’t yet say.",
    }
  ],

  "teaching-and-facilitation::taf-m10-practice": [
    {
      id: "taf-m10-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "taf-m10-practice-lt-task",
      type: "practice_task",
      title: "Practice · Capstone rehearsal: kit integration",
      bullets: [
        "1. Pilot micro-session with observer notes.",
        "2. Revision log tying changes back to learner confusion signals.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "taf-m10-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Teaching kit v1",
    },
    {
      id: "taf-m10-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "teaching-and-facilitation::taf-m10-recap": [
    {
      id: "taf-m10-recap-lt-intro",
      type: "intro",
      eyebrow: "Consolidation",
      title: "Consolidate · Capstone rehearsal: kit integration",
      body: "Build a recap artifact you will reopen: keywords, failure modes, reuse rules—written for future-you under stress.",
    },
    {
      id: "taf-m10-recap-lt-keys",
      type: "key_points",
      title: "Carry-forward pack",
      bullets: [
        "Keyword claim: Cross-check objectives ↔ activities ↔ assessments for gaps.",
        "Failure mode to watch: Integrate objectives map, session plan, facilitation guide, materials, assessments into one pilot-ready kit.…",
        "Reuse rule: when to apply vs rethink this module",
      ],
    },
    {
      id: "taf-m10-recap-lt-reflect",
      type: "reflection_prompt",
      title: "Calibration",
      prompt: "What would convince you this module did not stick—what signal would you look for in your next deliverable?",
    },
    {
      id: "taf-m10-recap-lt-next",
      type: "next_step",
      body: "Archive the recap where your future self will actually find it.",
    }
  ],

  "teaching-and-facilitation::taf-m10-revision": [
    {
      id: "taf-m10-revision-lt-intro",
      type: "intro",
      eyebrow: "Revision gate",
      title: "Tighten · Capstone rehearsal: kit integration",
      body: "Compress misunderstandings before they compound. Prefer precise claims, cited limits, and falsifiers—no glossary theater.",
    },
    {
      id: "taf-m10-revision-lt-recap",
      type: "recap",
      title: "Compress to checks",
      bullets: [
        "Cross-check objectives ↔ activities ↔ assessments for gaps.",
        "Dry-run micro-session; capture friction log.",
        "Revise materials from feedback without scope creep.",
      ],
    },
    {
      id: "taf-m10-revision-lt-task",
      type: "practice_task",
      title: "Structured gate",
      prompt: "In 6–10 sentences: (1) what you believe now, (2) what would falsify it, (3) what artifact proves you applied this module.",
    },
    {
      id: "taf-m10-revision-lt-next",
      type: "next_step",
      body: "Proceed only if you would defend these claims aloud to a skeptical peer.",
    }
  ],

  "web-and-software-foundations::wf-m01-practice": [
    {
      id: "wf-m01-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "wf-m01-practice-lt-task",
      type: "practice_task",
      title: "Practice · How the web moves: requests, responses, browsers",
      bullets: [
        "1. Trace one login or checkout flow with browser devtools; annotate each hop.",
        "2. Record a two-minute ELI12 voice memo for a non-technical stakeholder.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "wf-m01-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Request trace notes",
    },
    {
      id: "wf-m01-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "web-and-software-foundations::wf-m01-revision": [
    {
      id: "wf-m01-revision-lt-intro",
      type: "intro",
      eyebrow: "Revision gate",
      title: "Tighten · How the web moves: requests, responses, browsers",
      body: "Compress misunderstandings before they compound. Prefer precise claims, cited limits, and falsifiers—no glossary theater.",
    },
    {
      id: "wf-m01-revision-lt-recap",
      type: "recap",
      title: "Compress to checks",
      bullets: [
        "Explain DNS, TLS, and HTTP at a level sufficient for tradeoff discussions.",
        "Differentiate clients, servers, CDNs, and where latency hides.",
        "Name user-visible failure modes (TLS errors, stale assets, blocked requests).",
      ],
    },
    {
      id: "wf-m01-revision-lt-task",
      type: "practice_task",
      title: "Structured gate",
      prompt: "In 6–10 sentences: (1) what you believe now, (2) what would falsify it, (3) what artifact proves you applied this module.",
    },
    {
      id: "wf-m01-revision-lt-next",
      type: "next_step",
      body: "Proceed only if you would defend these claims aloud to a skeptical peer.",
    }
  ],

  "web-and-software-foundations::wf-m02-lesson": [
    {
      id: "wf-m02-lesson-lt-intro",
      type: "intro",
      eyebrow: "Grounding",
      title: "Apps, hosting, environments, and releases",
      body: "A change that works in development and fails in production is almost always an environment difference, not a code difference. The discipline of environment management is making those differences explicit — knowing what dev, staging, and production differ in, and making promotion decisions based on those differences.",
    },
    {
      id: "wf-m02-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "Map dev / staging / prod differences and what promotion means for each type of risk",
      body: "Environment differences that cause production failures: configuration values (API keys, feature flags, connection strings that differ), infrastructure differences (production handles 10x staging’s traffic with caching; staging doesn’t), and dependency version drift. Promotion is the decision to expose those differences. A promotion checklist names each difference explicitly and assigns ownership for verifying it.",
    },
    {
      id: "wf-m02-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The feature that passed all tests and broke in production",
      body: "An engineering team ships a payments integration. All tests pass in staging. In production: the feature breaks for a subset of users. Root cause: staging was configured against a sandbox payment processor that returns consistent success responses. Production uses the real processor, which returns different error codes. The integration didn’t handle those codes. The environments weren’t documented as different in this way.",
      example: "Promotion checklist minimum: (1) what configuration values differ between environments? (2) what infrastructure capabilities exist in production but not staging? (3) what data shape differences exist? (4) who is on-call if the promotion produces an incident? Document before promotion, not after the incident.",
    },
    {
      id: "wf-m02-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might speed tempt you to skip verification? Name one stop rule.",
    },
    {
      id: "wf-m02-lesson-lt-next",
      type: "next_step",
      body: "Next: wf-m03 — you know where code runs. Data shapes on the wire establishes the contracts that govern what moves between services once deployed.",
    }
  ],

  "web-and-software-foundations::wf-m02-practice": [
    {
      id: "wf-m02-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "wf-m02-practice-lt-task",
      type: "practice_task",
      title: "Practice · Apps, hosting, environments, and releases",
      bullets: [
        "1. Interview a builder (or research a stack you use); draw deploy path end-to-end.",
        "2. Write ten vendor questions spanning uptime, backups, egress, access logs.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "wf-m02-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Deploy path sketch",
    },
    {
      id: "wf-m02-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "web-and-software-foundations::wf-m03-lesson": [
    {
      id: "wf-m03-lesson-lt-intro",
      type: "intro",
      eyebrow: "Grounding",
      title: "Data shapes on the wire: JSON, schemas, validation",
      body: "A JSON payload without a schema is a promise that can be broken silently. The consumer will parse what it expects to find. When the producer changes a field name, adds a required field, or changes a type, the consumer’s code continues to run — and quietly produces wrong outputs rather than throwing an error.",
    },
    {
      id: "wf-m03-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "Read JSON and spot risky null, missing field, and type change patterns",
      body: "The three most common silent breakage patterns: (1) a required field becomes optional — the consumer assumes it’s always present and gets a null reference error on 5% of responses; (2) a string field becomes an array — string parsing runs without error on the first character; (3) a date field changes format — the date parser silently returns ‘Invalid Date.’ Schema validation at the boundary catches these before they propagate into business logic.",
    },
    {
      id: "wf-m03-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The API version bump that caused silent data corruption for two weeks",
      body: "A vendor releases a minor API update. A team doesn’t review the changelog because minor versions are assumed safe. One existing field changed from a string to a nested object — same field name, different type. The consumer’s parser took the object’s string representation and stored it in a text field. For two weeks, that field produced garbage data. The issue surfaced in a report. Schema validation at the integration boundary wasn’t in place.",
      example: "Null handling rule: for any JSON field you consume in a business-critical path, explicitly define what should happen if the field is absent, null, or an unexpected type. ‘If null, [specific action].’ ‘If absent, [specific fallback or error].’ Silent null propagation is the most common source of hard-to-trace data quality issues in API integrations.",
    },
    {
      id: "wf-m03-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might speed tempt you to skip verification? Name one stop rule.",
    },
    {
      id: "wf-m03-lesson-lt-next",
      type: "next_step",
      body: "Next: wf-m04 — you understand data shapes. REST-ish APIs builds the auth and scoping model that governs who can access which shapes.",
    }
  ],

  "web-and-software-foundations::wf-m03-practice": [
    {
      id: "wf-m03-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "wf-m03-practice-lt-task",
      type: "practice_task",
      title: "Practice · Data shapes on the wire: JSON, schemas, validation",
      bullets: [
        "1. Compare two documented API versions; list behavioral risks per change.",
        "2. Draft validation rules for three critical fields in a payload you rely on.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "wf-m03-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Schema risk memo",
    },
    {
      id: "wf-m03-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "web-and-software-foundations::wf-m03-recap": [
    {
      id: "wf-m03-recap-lt-intro",
      type: "intro",
      eyebrow: "Consolidation",
      title: "Consolidate · Data shapes on the wire: JSON, schemas, validation",
      body: "Build a recap artifact you will reopen: keywords, failure modes, reuse rules—written for future-you under stress.",
    },
    {
      id: "wf-m03-recap-lt-keys",
      type: "key_points",
      title: "Carry-forward pack",
      bullets: [
        "Keyword claim: Read JSON documents and spot risky null/missing ambiguity.",
        "Failure mode to watch: Treat payloads as contracts—schemas prevent silent breakage when teams iterate quickly.…",
        "Reuse rule: when to apply vs rethink this module",
      ],
    },
    {
      id: "wf-m03-recap-lt-reflect",
      type: "reflection_prompt",
      title: "Calibration",
      prompt: "What would convince you this module did not stick—what signal would you look for in your next deliverable?",
    },
    {
      id: "wf-m03-recap-lt-next",
      type: "next_step",
      body: "Archive the recap where your future self will actually find it.",
    }
  ],

  "web-and-software-foundations::wf-m04-lesson": [
    {
      id: "wf-m04-lesson-lt-intro",
      type: "intro",
      eyebrow: "Applied reasoning",
      title: "REST-ish APIs: resources, auth, scopes",
      body: "An API token with too many permissions is an incident waiting for an opportunity. The principle of least privilege in API authentication isn’t about distrust — it’s about limiting the blast radius when a credential is compromised, which is a question of when, not whether.",
    },
    {
      id: "wf-m04-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "Request only the scopes your integration actually calls, and know what each scope permits",
      body: "OAuth scope anatomy: a token has a list of scopes (`read:users`, `write:billing`). Each scope grants access to a specific resource action. Requesting all scopes because ‘it might need them’ creates an administrative credential. Scope minimization: before requesting a token, list the specific API calls the integration makes and request only the scopes those calls require. Revisit when the integration changes.",
    },
    {
      id: "wf-m04-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The reporting integration that had write access to billing",
      body: "A team builds a read-only reporting integration. The developer copies an existing token from the codebase to avoid creating a new one. The existing token was created for a billing integration and has `write:billing` scope. The reporting integration never makes billing write calls. Six months later, a misconfigured report template calls a billing write endpoint. The call succeeds. The token had permission.",
      example: "Token rotation rule: any API token that hasn’t been rotated in 90 days is an operational risk, not a configuration choice. Document who owns each token and what scope it has. Rotation is a scheduled operational event, not a reactive post-incident action.",
    },
    {
      id: "wf-m04-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might speed tempt you to skip verification? Name one stop rule.",
    },
    {
      id: "wf-m04-lesson-lt-next",
      type: "next_step",
      body: "Next: wf-m06 — APIs are the interface. Performance, caching, and perceived speed builds the intuition for what happens at scale between the interface and the user.",
    }
  ],

  "web-and-software-foundations::wf-m05-practice": [
    {
      id: "wf-m05-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "wf-m05-practice-lt-task",
      type: "practice_task",
      title: "Practice · Databases and consistency intuition",
      bullets: [
        "1. Before/after: write five questions you would ask before approving a schema change.",
        "2. Sketch entity-relationship diagram for an app you use daily.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "wf-m05-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Schema question list",
    },
    {
      id: "wf-m05-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "web-and-software-foundations::wf-m06-lesson": [
    {
      id: "wf-m06-lesson-lt-intro",
      type: "intro",
      eyebrow: "Applied reasoning",
      title: "Performance, caching, and perceived speed",
      body: "Performance optimization without measurement first is guessing. The engineer who optimizes the database query that runs 0.1% of the time has achieved a measurable improvement in a negligible path. The discipline is identifying where the actual bottleneck is before writing a single line of optimization.",
    },
    {
      id: "wf-m06-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "Hypothesize compute vs. IO bottlenecks with falsifiable signals before optimizing",
      body: "Compute bottleneck signals: high CPU utilization, consistent processing time. IO bottleneck signals: low CPU utilization, high latency variance, database wait times. Caching addresses IO bottlenecks by reducing data fetches. Applying caching to a compute bottleneck adds complexity without improvement. Applying it to an IO bottleneck can reduce latency by an order of magnitude.",
    },
    {
      id: "wf-m06-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The slow page that wasn't a load balancer problem",
      body: "A dashboard page takes 4-6 seconds to load. The engineering team investigates the load balancer — the page receives heavy traffic. After two weeks of load balancer tuning with no improvement, a database query profile shows a full table scan on every page load. Adding an index on the filter column reduces load time to 0.3 seconds. The bottleneck was IO: an unindexed query. The optimization was aimed at the wrong layer.",
      example: "Perceived vs. actual speed: users experience both. A progress indicator doesn’t change actual latency but can reduce perceived latency significantly. Before infrastructure optimization, assess whether perceived speed improvements (skeleton screens, optimistic UI, progress indicators) would adequately address the user complaint.",
    },
    {
      id: "wf-m06-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might speed tempt you to skip verification? Name one stop rule.",
    },
    {
      id: "wf-m06-lesson-lt-next",
      type: "next_step",
      body: "Next: wf-m08 — performance is about normal operation. Reliability, retries, and idempotency builds the vocabulary for what happens when normal operation fails.",
    }
  ],

  "web-and-software-foundations::wf-m07-practice": [
    {
      id: "wf-m07-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "wf-m07-practice-lt-task",
      type: "practice_task",
      title: "Practice · Security literacy for collaborators",
      bullets: [
        "1. Red-team a feature spec: blind spots + questions for engineering.",
        "2. Draft a non-technical risk summary leadership can act on.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "wf-m07-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Collaborator security review",
    },
    {
      id: "wf-m07-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "web-and-software-foundations::wf-m08-lesson": [
    {
      id: "wf-m08-lesson-lt-intro",
      type: "intro",
      eyebrow: "Professional judgment",
      title: "Reliability: outages, retries, idempotency",
      body: "Retrying a failed request is the intuitive response to a transient error. For a read operation, it’s almost always safe. For a write operation — a payment, an order submission, a record creation — retrying without idempotency protection can create duplicates: double charges, double orders, duplicate records.",
    },
    {
      id: "wf-m08-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "Understand why retries need idempotency keys for any operation that shouldn't execute twice",
      body: "An idempotency key is a unique identifier for a specific request. It tells the server: if you’ve already processed this key, return the previous result instead of executing again. Without it: a retry on a payment that returned a timeout (the payment succeeded but the client never received confirmation) creates a second charge. With it: the retry returns the result of the original successful payment.",
    },
    {
      id: "wf-m08-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The retry logic that charged 847 customers twice",
      body: "An e-commerce platform implements automatic retry logic for failed payment API calls. On a traffic spike, the processor returns timeout responses. The retry logic resends all timed-out requests. 847 payment requests had already succeeded — the processor processed them, but the response timed out in transit. Without idempotency keys, the processor processes them again. 847 customers are charged twice. Discovered the following morning via customer support tickets.",
      example: "Idempotency checklist for any write operation: (1) can this operation be safely retried without protection? (2) if not, does the API support idempotency keys, and are you sending them? (3) does your retry logic differentiate between failure modes where retrying is safe vs. risky? Retrying a 500 (server error) differs from retrying a timeout (unknown outcome).",
    },
    {
      id: "wf-m08-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might speed tempt you to skip verification? Name one stop rule.",
    },
    {
      id: "wf-m08-lesson-lt-next",
      type: "next_step",
      body: "Next: wf-m09 — reliability is about your own systems. Vendor evaluation builds the discipline for assessing whether the external services you depend on meet the same standard.",
    }
  ],

  "web-and-software-foundations::wf-m08-practice": [
    {
      id: "wf-m08-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "wf-m08-practice-lt-task",
      type: "practice_task",
      title: "Practice · Reliability: outages, retries, idempotency",
      bullets: [
        "1. Write incident customer email for a fictional outage with known unknowns.",
        "2. Walk a retry/idempotency scenario and list what breaks without safeguards.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "wf-m08-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Reliability question list for vendors",
    },
    {
      id: "wf-m08-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "web-and-software-foundations::wf-m09-lesson": [
    {
      id: "wf-m09-lesson-lt-intro",
      type: "intro",
      eyebrow: "Integration",
      title: "Vendor evaluation without buzzword bingo",
      body: "A vendor evaluation that relies on their sales deck is an evaluation of their marketing capability. The operational questions — what happens when the service is down, how does data portability work at contract end, which SLAs have teeth — are answered in contract terms and engineering documentation, not the deck.",
    },
    {
      id: "wf-m09-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "Extract contractual and operational risks from vendor terms, not vendor claims",
      body: "Four questions vendor decks typically don’t answer: (1) what is the remediation for an SLA breach — service credits, or actual accountability? (2) what does data export look like, and what’s the migration cost? (3) what is the vendor’s incident history and recovery time? (4) what happens to your data if the vendor is acquired or shut down? These require the contract and support documentation, not the sales conversation.",
    },
    {
      id: "wf-m09-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The 99.9% uptime SLA that allowed 8.7 hours of downtime per year",
      body: "A team signs a vendor contract with a ‘99.9% uptime SLA,’ cited during due diligence as evidence of reliability. In month 7, two outages total 6 hours. Legal reviews: 99.9% uptime is calculated monthly, not annually. 99.9% monthly allows 43 minutes per month, or ~8.7 hours per year. The SLA was accurate. The team had read it as annual availability. The misread was in due diligence.",
      example: "Exit criteria: before signing any vendor contract, write: (1) the conditions under which you would leave this vendor, and (2) the cost and effort of migration at that exit. If migration cost is high and exit criteria are unclear, you’re signing a higher-risk contract than the headline terms suggest.",
    },
    {
      id: "wf-m09-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might speed tempt you to skip verification? Name one stop rule.",
    },
    {
      id: "wf-m09-lesson-lt-next",
      type: "next_step",
      body: "Next: wf-m10 — you’ve evaluated the stack. The capstone integrates diagram, narrative, and vendor notes into a brief engineers could schedule work from.",
    }
  ],

  "web-and-software-foundations::wf-m09-practice": [
    {
      id: "wf-m09-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "wf-m09-practice-lt-task",
      type: "practice_task",
      title: "Practice · Vendor evaluation without buzzword bingo",
      bullets: [
        "1. Score two real or hypothetical vendors on a rubric you design.",
        "2. Write kill criteria that would stop the deal.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "wf-m09-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Vendor scorecard + kill criteria",
    },
    {
      id: "wf-m09-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "web-and-software-foundations::wf-m10-lesson": [
    {
      id: "wf-m10-lesson-lt-intro",
      type: "intro",
      eyebrow: "Integration",
      title: "Capstone rehearsal: diagram, narrative, review",
      body: "A system diagram that only makes sense when the author is present to explain it is a drawing, not documentation. The test of a collaboration brief is whether an engineer who didn’t attend the design conversation can understand what the system does, what’s uncertain, and what decisions require their input — from the document alone.",
    },
    {
      id: "wf-m10-lesson-lt-concept",
      type: "concept_explanation",
      eyebrow: "Concept",
      title: "Align diagram and prose so both tell one story without requiring the author to narrate",
      body: "Failure mode of disconnected diagram and prose: the diagram shows data flowing from service A to service B through an API gateway. The prose says ‘the integration is straightforward.’ An engineer reading asks: what protocol? what authentication method? what happens if the gateway is unavailable? Neither the diagram nor the prose answers these because both are at the wrong level of specificity for the actual decisions the engineer needs to make.",
    },
    {
      id: "wf-m10-lesson-lt-worked",
      type: "worked_example",
      eyebrow: "Worked example",
      title: "The technical brief that needed 3 follow-up calls to schedule one sprint",
      body: "A product manager produces a brief with a system diagram and 3 paragraphs. Two engineers review it. Each has questions the brief doesn’t answer. A 45-minute call is scheduled. More questions emerge. A second call follows. The feature still isn’t scoped for the sprint. The brief wasn’t wrong — it was incomplete at the level engineers need to estimate and build.",
      example: "Brief completeness test: give the brief to an engineer who wasn’t involved. Ask them: (1) what are the three most technically uncertain elements? (2) what decisions do they need before they can estimate? (3) what’s missing they’d want before starting? If they can’t answer all three from the brief, the gaps they identify are your documentation debt.",
    },
    {
      id: "wf-m10-lesson-lt-reflect",
      type: "reflection_prompt",
      title: "Integrity check",
      prompt: "Where might speed tempt you to skip verification? Name one stop rule.",
    },
    {
      id: "wf-m10-lesson-lt-next",
      type: "next_step",
      body: "This is the web-and-software-foundations capstone. The collaboration brief should be complete enough for an engineer who wasn’t in the room to scope the work without a follow-up call. Test it on exactly that basis.",
    }
  ],

  "web-and-software-foundations::wf-m10-practice": [
    {
      id: "wf-m10-practice-lt-intro",
      type: "intro",
      eyebrow: "Practice lab",
      title: "Repetitions with receipts",
      body: "This lab is graded on reviewability—not vibes. Tie each move to evidence, stakeholder, or falsifier.",
    },
    {
      id: "wf-m10-practice-lt-task",
      type: "practice_task",
      title: "Practice · Capstone rehearsal: diagram, narrative, review",
      bullets: [
        "1. Dry-run walkthrough with a skeptical peer; log confusion points.",
        "2. Revise diagram until flows are obvious without verbal narration.",
      ],
      prompt: "Stop when a skeptical colleague could argue with your specifics—not just your tone.",
    },
    {
      id: "wf-m10-practice-lt-output",
      type: "output_prompt",
      title: "Artifact to produce",
      prompt: "If you only produced bullet vibes, rewrite as a checklist, memo spine, or table with definitions.",
      outputExpectation: "Collaboration brief v1",
    },
    {
      id: "wf-m10-practice-lt-next",
      type: "next_step",
      body: "Before completing, verify one explicit assumption and one falsifier.",
    }
  ],

  "web-and-software-foundations::wf-m10-recap": [
    {
      id: "wf-m10-recap-lt-intro",
      type: "intro",
      eyebrow: "Consolidation",
      title: "Consolidate · Capstone rehearsal: diagram, narrative, review",
      body: "Build a recap artifact you will reopen: keywords, failure modes, reuse rules—written for future-you under stress.",
    },
    {
      id: "wf-m10-recap-lt-keys",
      type: "key_points",
      title: "Carry-forward pack",
      bullets: [
        "Keyword claim: Align diagram and prose so both tell one story.",
        "Failure mode to watch: Merge narrative, diagrams, risks, and vendor notes into a collaboration brief engineers could schedule work from.…",
        "Reuse rule: when to apply vs rethink this module",
      ],
    },
    {
      id: "wf-m10-recap-lt-reflect",
      type: "reflection_prompt",
      title: "Calibration",
      prompt: "What would convince you this module did not stick—what signal would you look for in your next deliverable?",
    },
    {
      id: "wf-m10-recap-lt-next",
      type: "next_step",
      body: "Archive the recap where your future self will actually find it.",
    }
  ],

  "web-and-software-foundations::wf-m10-revision": [
    {
      id: "wf-m10-revision-lt-intro",
      type: "intro",
      eyebrow: "Revision gate",
      title: "Tighten · Capstone rehearsal: diagram, narrative, review",
      body: "Compress misunderstandings before they compound. Prefer precise claims, cited limits, and falsifiers—no glossary theater.",
    },
    {
      id: "wf-m10-revision-lt-recap",
      type: "recap",
      title: "Compress to checks",
      bullets: [
        "Align diagram and prose so both tell one story.",
        "Invite critique on ambiguity + risk.",
        "Iterate once with tracked changes.",
      ],
    },
    {
      id: "wf-m10-revision-lt-task",
      type: "practice_task",
      title: "Structured gate",
      prompt: "In 6–10 sentences: (1) what you believe now, (2) what would falsify it, (3) what artifact proves you applied this module.",
    },
    {
      id: "wf-m10-revision-lt-next",
      type: "next_step",
      body: "Proceed only if you would defend these claims aloud to a skeptical peer.",
    }
  ],

}
