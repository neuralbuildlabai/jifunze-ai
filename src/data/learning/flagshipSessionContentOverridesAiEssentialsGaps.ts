/**
 * AI Essentials session blocks required for full override coverage (CI: verify-flagship-merge).
 * Focused practice / revision / recap keys not authored in other override layers.
 */

import type { FlagshipSessionContentBlock } from './flagshipSessionContentTypes'
import { flagshipDepthPaddingBlock } from './flagshipSessionDepthPadding'

const FLAGSHIP_SESSION_CONTENT_OVERRIDES_AI_ESSENTIALS_GAPS_RAW: Partial<
  Record<string, FlagshipSessionContentBlock[]>
> = {
  'ai-essentials::ae-m06-revision': [
    {
      id: 'ae-m06-revision-gap-intro',
      type: 'intro',
      eyebrow: 'Revision gate',
      title: 'Tighten · Evidence, verification, and source-aware use',
      body: 'Compress how you will refuse false precision, keep conflicts visible, and match verification depth to blast radius before the next executive read.',
    },
    {
      id: 'ae-m06-revision-gap-recap',
      type: 'recap',
      title: 'Compress to checks',
      bullets: [
        'One claim you now score with an explicit strength label (and what would upgrade it).',
        'One verification lane you will use this week for a reversible vs irreversible decision.',
        'One habit you will stop (for example, treating fluency as sourcing).',
      ],
    },
    {
      id: 'ae-m06-revision-gap-task',
      type: 'practice_task',
      title: 'Structured gate',
      prompt:
        'In 6–10 sentences: (1) your highest-stakes claim from the evidence table, (2) what you still do not know, (3) the cheapest next information buy before you act.',
    },
    {
      id: 'ae-m06-revision-gap-next',
      type: 'next_step',
      body: 'Proceed when a skeptical reader could trace claims to notes or explicit gaps.',
    },
  ],

  'ai-essentials::ae-m07-practice': [
    {
      id: 'ae-m07-practice-gap-intro',
      type: 'intro',
      eyebrow: 'Practice lab',
      title: 'Audience-fit drafts under pressure',
      body: 'You tune structure, proof style, and call-to-action for two real readers without inventing contradictory facts. Depth moves to appendices, not fog.',
    },
    {
      id: 'ae-m07-practice-gap-task',
      type: 'practice_task',
      title: 'Practice · Two doors, one evidence appendix',
      bullets: [
        '1. Pick one recommendation; write two openings (90 words each) for different veto risks.',
        '2. List three bullets of shared evidence both openings must honor.',
      ],
      prompt: 'Stop when each opening names a decision and a falsifier, not just tone.',
    },
    {
      id: 'ae-m07-practice-gap-output',
      type: 'output_prompt',
      title: 'Artifact to produce',
      prompt: 'Save a draft Module07 audience-fit communication artifact with both openings plus a labeled appendix hook.',
      outputExpectation: 'Audience-fit communication draft',
    },
    {
      id: 'ae-m07-practice-gap-next',
      type: 'next_step',
      body: 'Next: ae-m08 installs integrity-forward study loops you can defend in graded contexts.',
    },
  ],

  'ai-essentials::ae-m08-practice': [
    {
      id: 'ae-m08-practice-gap-intro',
      type: 'intro',
      eyebrow: 'Practice lab',
      title: 'Scaffolding without substitution',
      body: 'You design a five-step study loop with explicit forbidden moves, then pressure-test it against tired-you behavior at 11 p.m. before a deadline. The goal is not "less AI" — it is AI that builds durable skill instead of forging it.',
    },
    {
      id: 'ae-m08-practice-gap-worked',
      type: 'worked_example',
      eyebrow: 'Worked thread',
      title: 'A five-step study loop for a real graded context',
      body: [
        'Pick a real graded or certified context you touch this term: a course module exam, a professional certification, a regulated continuing-education unit, or a portfolio assessment. Draft the loop in five steps:',
        '',
        'Step 1 — Surface what you already know (closed-book retrieval). Step 2 — Use AI as a Socratic tutor on what you missed (allowed: "ask me what would falsify this answer"; forbidden: "write the answer for me"). Step 3 — Verify the model against the syllabus or primary source — assume the model is wrong about exam-specific rules until checked. Step 4 — Write your own explanation in plain language without the model on screen. Step 5 — Generate practice items with AI, then verify keys and rationales yourself before using them as study fuel.',
        '',
        'For each step, mark Allowed and Forbidden moves explicitly. Then walk the loop with a friction test: at 11 p.m. before a deadline, which step is most likely to slip? Add a stop rule there ("If I am tempted to paste the model\'s answer, close the tool and ask the instructor instead").',
      ].join('\n\n'),
      example:
        'Forbidden-move list (sample row): "Asking the model to draft the submitted text I will paste into the assignment" — escalation if tempted: stop, save current draft, log temptation in a study journal, ask peer or instructor before next session.',
    },
    {
      id: 'ae-m08-practice-gap-task',
      type: 'practice_task',
      title: 'Learner task · Study protocol + integrity boundaries',
      bullets: [
        '1. Write the five-step loop with Allowed and Forbidden columns for one real graded context you touch.',
        '2. Draft three prompt patterns: retrieval practice, mistake explanation, and pre-submission verification — each with a stop rule that triggers escalation to a human (peer, tutor, instructor).',
        '3. Pressure-test the protocol with a 11 p.m. friction test and patch the weakest step.',
      ],
      prompt: 'If a step could substitute model judgment for yours, rewrite it until ownership is visible to a peer reading the protocol cold.',
    },
    {
      id: 'ae-m08-practice-gap-checklist',
      type: 'key_points',
      eyebrow: 'Self-review checklist',
      title: 'Five gates before you trust this loop',
      bullets: [
        'Allowed and Forbidden moves are concrete behaviours (not values) that a reviewer could observe in your study artefacts.',
        'At least one Forbidden move covers "model-authored submitted text" or its equivalent in your context.',
        'Each prompt pattern names a stop rule and an escalation contact (peer, tutor, instructor) — not just "be careful."',
        'Verification of model output against the syllabus or primary source is a step, not a vibe.',
        'You can describe the loop to someone outside your field in two minutes without saying "trust me."',
      ],
    },
    {
      id: 'ae-m08-practice-gap-bad-good',
      type: 'concept_explanation',
      eyebrow: 'Bad vs good',
      title: 'A weak study loop and a stronger one',
      body: [
        'Weak (avoid): "I use AI carefully and only when needed. I check the answers." This sentence sounds responsible and binds nothing. There is no Forbidden list, no stop rule, no verification step, and no escalation path. Tired-you on Sunday night will rewrite "carefully" to mean whatever finishes the assignment.',
        '',
        'Stronger (model this): "Step 1: 20-minute closed-book recall. Step 2: AI tutor — Allowed: \'explain why my reasoning fails\'; Forbidden: \'write the answer.\' Step 3: Verify each model claim against the lecture notes; flag mismatches. Step 4: Write the submission without the model on screen. Step 5: Generate three practice items, verify keys against the syllabus, do them tomorrow without notes. Stop rule: if I am tempted to paste a model paragraph, save and message [tutor name] instead." Concrete enough to be enforced and audited.',
      ].join('\n\n'),
    },
    {
      id: 'ae-m08-practice-gap-output',
      type: 'output_prompt',
      title: 'Artifact to produce',
      prompt: 'Produce the Module08_AI_Learning_Repair_Plan_[YourName] skeleton: five-step loop with Allowed/Forbidden columns, three prompt patterns with stop rules, and the friction-test note from the 11 p.m. scenario.',
      outputExpectation: 'AI learning repair plan draft',
    },
    {
      id: 'ae-m08-practice-gap-next',
      type: 'next_step',
      body: 'Next: ae-m09 operationalizes disclosure, escalation, and proportionate review across roles.',
    },
  ],

  'ai-essentials::ae-m08-revision': [
    {
      id: 'ae-m08-revision-gap-intro',
      type: 'intro',
      eyebrow: 'Revision gate',
      title: 'Tighten · Learning, study, and understanding',
      body: 'Compress the boundary between tutoring and substitution. Revision is where integrity promises become checklists.',
    },
    {
      id: 'ae-m08-revision-gap-recap',
      type: 'recap',
      title: 'Compress to checks',
      bullets: [
        'One forbidden move you will not rationalize under deadline.',
        'One verification lane you will run before any submission.',
        'One signal that means pause and ask a human, not the model.',
      ],
    },
    {
      id: 'ae-m08-revision-gap-task',
      type: 'practice_task',
      title: 'Structured gate',
      prompt: 'In 6–10 sentences: where substitution tempted you, what you changed, and what artifact proves the fix.',
    },
    {
      id: 'ae-m08-revision-gap-next',
      type: 'next_step',
      body: 'Proceed only if your protocol is executable at low energy.',
    },
  ],

  'ai-essentials::ae-m09-practice': [
    {
      id: 'ae-m09-practice-gap-intro',
      type: 'intro',
      eyebrow: 'Practice lab',
      title: 'Operational guardrails with owners',
      body: 'You draft disclosure lines, named reviewers, and escalation paths for a real workflow so AI assistance stays legible next shift.',
    },
    {
      id: 'ae-m09-practice-gap-task',
      type: 'practice_task',
      title: 'Practice · Responsibility map',
      bullets: [
        '1. Three AI-assisted steps with named human reviewers and data tier notes.',
        '2. One red-line case: when work must leave general-purpose tools.',
      ],
      prompt: 'If ownership is vague, stop and assign names before continuing.',
    },
    {
      id: 'ae-m09-practice-gap-output',
      type: 'output_prompt',
      title: 'Artifact to produce',
      prompt: 'Draft Module09 responsible AI guardrails artifact with disclosure snippets tied to real outputs.',
      outputExpectation: 'Guardrails draft',
    },
    {
      id: 'ae-m09-practice-gap-next',
      type: 'next_step',
      body: 'Next: ae-m10 applies privacy tiers and minimum-necessary discipline before every paste.',
    },
  ],

  'ai-essentials::ae-m10-practice': [
    {
      id: 'ae-m10-practice-gap-intro',
      type: 'intro',
      eyebrow: 'Practice lab',
      title: 'Privacy tiers and minimum-necessary discipline in real prompts',
      body: 'You will classify inputs, choose redaction or abstraction, and document pause-or-escalate triggers before any high-stakes paste. The deliverable is a Safe-Use Decision Card a colleague could follow under fatigue without DMing you.',
    },
    {
      id: 'ae-m10-practice-gap-worked',
      type: 'worked_example',
      eyebrow: 'Worked thread',
      title: 'A real prompt rewritten three ways: raw, redacted, abstracted',
      body: [
        'Take a real or realistic operational prompt you would otherwise send raw — for example, drafting a customer refund reply, summarising an HR thread, or rephrasing a complaint for an internal note.',
        '',
        'Raw (Tier 3 risk, do not send): "Customer Jane Mwangi (account #884412, +254 7XX XXX XXX) emailed today complaining about the wrong-logo invoice on order INV-2026-04217 ..." — full thread pasted into a public AI chat.',
        '',
        'Redacted (acceptable for some Tier 2 work): "Customer [NAME], account [REDACTED], complained about a wrong-logo invoice on order [REF]. Delay: 6 days. Resolution: refund + reissue. Draft a polite reply that names the cause and the make-good." — identifiers stripped while structure stays.',
        '',
        'Abstracted (best for Tier 3): "I need a polite reply for a B2B customer who experienced a 6-day delay and a wrong-logo invoice. We will refund and reissue. The reply should acknowledge fault, name the cause, and offer the make-good without overpromising." — no specific identifiers; the case cannot be re-identified by anyone who knows the customer.',
        '',
        'Test: could a colleague who does not know the case re-identify a person from what remains? If yes, you redacted but did not abstract enough for Tier 3. Classify up when tiers blur.',
      ].join('\n\n'),
      example:
        'Pause-or-escalate trigger (sample): "If the input would touch HR action, hiring, credit, child or patient identifying detail, or unfamiliar regulatory ground, stop and ask [security lead / compliance lead / school admin]."',
    },
    {
      id: 'ae-m10-practice-gap-task',
      type: 'practice_task',
      title: 'Learner task · Sensitivity sort to operational Safe-Use Decision Card',
      bullets: [
        '1. Sort 10 realistic items from your work into safe / caution / restricted / never-enter — write a one-line note per item explaining the tier choice.',
        '2. Rewrite two risky prompts into minimum-necessary equivalents using either redaction or abstraction (justify the choice).',
        '3. Draft a one-page Safe-Use Decision Card with classification table, redaction or abstraction pattern, never-enter classes, and pause-or-escalate triggers with a named contact role.',
      ],
      prompt: 'Stop when a security lead could follow your labels without a meeting and a teammate at low energy could still apply them next Tuesday.',
    },
    {
      id: 'ae-m10-practice-gap-checklist',
      type: 'key_points',
      eyebrow: 'Self-review checklist',
      title: 'Six gates before this card leaves your hands',
      bullets: [
        'Each tier has at least one concrete example from your actual work — not generic placeholders.',
        'Never-enter classes include passwords, full payment or ID numbers, raw clinical or legally privileged material, children\'s identifying detail, and any class your organisation explicitly forbids.',
        'Redacted prompts strip names, account references, IDs, contact details, and any token a colleague could re-identify.',
        'Abstracted prompts can stand alone without re-identifying a person to anyone who knows the case.',
        'Pause-or-escalate triggers name a specific role (compliance lead, security, school admin) — not "ask someone."',
        'When tiers blur, the card classifies up by default; the absence of a clear yes is treated as a no.',
      ],
    },
    {
      id: 'ae-m10-practice-gap-bad-good',
      type: 'concept_explanation',
      eyebrow: 'Bad vs good',
      title: 'Two minimum-necessary rewrites that fail, and one that holds',
      body: [
        'Weak rewrite (still Tier 3 risk): "Customer J.M. (acct ending 412) had a 6-day delay on order INV-2026-04217..." — initials and a partial account number plus a unique invoice reference can re-identify the customer to anyone with limited internal access.',
        '',
        'Weak rewrite (over-abstracted, useless): "A customer had a delay. Draft a reply." — no actionable context; the model invents the cause and the make-good, which is a different risk: factual fabrication on a customer-facing message.',
        '',
        'Stronger (model this): "B2B customer experienced a 6-day delay and a wrong-logo invoice. Approved make-good: refund + reissue. Tone: warm, accountable, no overpromise. Constraints: do not invent timelines for the reissue; if a date is needed, return [DATE TBD] for me to fill." — assistance stays useful, identifiers are gone, and the model is told what not to invent.',
      ].join('\n\n'),
    },
    {
      id: 'ae-m10-practice-gap-output',
      type: 'output_prompt',
      title: 'Artifact to produce',
      prompt: 'Save Module10_Privacy_Safety_Checklist_[YourName] with the classification table, two minimum-necessary rewrites, the redaction or abstraction example, the pause-or-escalate scenario, the operational checklist, and the disclosure note from the module manuscript.',
      outputExpectation: 'Privacy checklist + Safe-Use Decision Card',
    },
    {
      id: 'ae-m10-practice-gap-next',
      type: 'next_step',
      body: 'Next: ae-m11 builds research synthesis with provenance and honest unknowns — now with privacy habits already in place.',
    },
  ],

  'ai-essentials::ae-m10-revision': [
    {
      id: 'ae-m10-revision-gap-intro',
      type: 'intro',
      eyebrow: 'Revision gate',
      title: 'Tighten · Privacy, risk, and boundaries',
      body: 'Compress the rules you will enforce when tired: paste discipline, escalation, and what never enters a general tool.',
    },
    {
      id: 'ae-m10-revision-gap-recap',
      type: 'recap',
      title: 'Compress to checks',
      bullets: [
        'One never-enter class with a concrete example from your work.',
        'One redaction pattern you will reuse weekly.',
        'One escalation path with a named contact or role.',
      ],
    },
    {
      id: 'ae-m10-revision-gap-task',
      type: 'practice_task',
      title: 'Structured gate',
      prompt: 'In 6–10 sentences: worst realistic leak you prevented, signals you watch for, and what you still owe policy review.',
    },
    {
      id: 'ae-m10-revision-gap-next',
      type: 'next_step',
      body: 'Proceed when your checklist is boring enough to survive busy season.',
    },
  ],

  'ai-essentials::ae-m11-practice': [
    {
      id: 'ae-m11-practice-gap-intro',
      type: 'intro',
      eyebrow: 'Practice lab',
      title: 'Synthesis with conflict intact',
      body: 'You keep disagreements visible, qualify conclusions, and propose next information buys instead of false certainty.',
    },
    {
      id: 'ae-m11-practice-gap-task',
      type: 'practice_task',
      title: 'Practice · Evidence table to exec brief',
      bullets: [
        '1. Build a small evidence table with strength scores and explicit conflicts.',
        '2. Draft a brief that names unknowns and a measurement plan before budget moves.',
      ],
      prompt: 'If the brief hides conflict, rewrite until disagreement is visible.',
    },
    {
      id: 'ae-m11-practice-gap-output',
      type: 'output_prompt',
      title: 'Artifact to produce',
      prompt: 'Save Module11 research synthesis brief draft with provenance notes.',
      outputExpectation: 'Research synthesis brief draft',
    },
    {
      id: 'ae-m11-practice-gap-next',
      type: 'next_step',
      body: 'Next: ae-m12 maps workflows, owners, gates, and agent readiness.',
    },
  ],

  'ai-essentials::ae-m12-practice': [
    {
      id: 'ae-m12-practice-gap-intro',
      type: 'intro',
      eyebrow: 'Practice lab',
      title: 'Workflows humans can still run tired',
      body: 'You will draw triggers, owners, human gates, and fallbacks for one real recurring workflow before attaching AI — so an outage, a model regression, or a tired teammate at 4 p.m. on Friday does not turn into heroics.',
    },
    {
      id: 'ae-m12-practice-gap-worked',
      type: 'worked_example',
      eyebrow: 'Worked thread',
      title: 'A real workflow drawn with gates, owners, fallbacks, and prompt slots',
      body: [
        'Pick one repeating task family in your context: customer-support triage, weekly research brief, intake-form review, outbound copy approval, or similar.',
        '',
        'Draw the workflow as: trigger → inputs (with data tier) → AI step (with prompt slot + version) → human gate (named reviewer) → output → audit log. Add a fallback lane that does not depend on the model, plus a kill-switch trigger that does not depend on the agent itself.',
        '',
        'Score each step on stakes × reversibility × blast radius. The high cells get tighter prompts, mandatory human gates, or explicit "do not automate." The low cells can run with lighter review.',
        '',
        'Then run a Friday tabletop: at 4 p.m. on a holiday weekend, the model returns 502s. Walk the workflow without it. Where does the work pile up? Who has authority to declare a freeze? Patch the weakest fallback before you ship the diagram.',
      ].join('\n\n'),
      example:
        'SOP slice (sample): trigger = ticket tag "refund_over_500" → input (Tier 2: customer name redacted) → prompt slot v1.3 (refund draft, no auto-send) → human gate (named senior agent reviews; rejects if amount > policy) → output (queued for send) → audit log (prompt version + reviewer + timestamp). Fallback: senior agent drafts manually using stored template; kill switch: support lead can flip an env var that disables the AI step within 5 minutes.',
    },
    {
      id: 'ae-m12-practice-gap-task',
      type: 'practice_task',
      title: 'Learner task · Diagram + tabletop + agent-readiness assessment',
      bullets: [
        '1. Draw the workflow diagram with decision diamonds, named owners at each stage, and prompt slots labelled with version notes.',
        '2. Run a Friday tabletop on one fatigue scenario (model outage, vendor bug, queue overload) and patch one human gate and one fallback.',
        '3. Score one candidate AI step against agent-readiness conditions (inputs, outputs, success checks, kill switch, data tier, owner-on-stall) and decide attach vs not yet — with the condition that would change your mind.',
      ],
      prompt: 'Stop when a peer could execute the fallback without you on call and the agent-readiness decision is defensible to a skeptical reviewer.',
    },
    {
      id: 'ae-m12-practice-gap-checklist',
      type: 'key_points',
      eyebrow: 'Self-review checklist',
      title: 'Six gates before this workflow goes live',
      bullets: [
        'Every step has a named owner — "the team" is not an owner.',
        'Each AI step has a prompt slot with a version note and an attached refusal boundary.',
        'At least one human gate exists where stakes spike (irreversibility, blast radius, regulated data).',
        'A fallback lane runs without the model and is documented at a level a tired teammate can execute.',
        'A kill switch exists that does not depend on the agent itself, with a named role authorised to flip it.',
        'Misroute or defect rate has a measurable threshold that triggers a freeze, not a vibes-based "let\'s see."',
      ],
    },
    {
      id: 'ae-m12-practice-gap-bad-good',
      type: 'concept_explanation',
      eyebrow: 'Bad vs good',
      title: 'Two workflow drawings: one fragile, one resilient',
      body: [
        'Weak (avoid): "AI auto-drafts replies → agent reviews → send." Three boxes, one arrow each. No data tier, no prompt version, no fallback for outages, no agent-readiness conditions, no measurable misroute threshold, no kill switch. The first time the model regresses or a vendor flaps, the team will silently drop the agent-review step and call it efficiency.',
        '',
        'Stronger (model this): trigger labelled with stakes and reversibility; inputs tagged with data tier; prompt slot v1.3 with a refusal boundary and a version note; named human gate that can reject; misroute KPI with a written threshold that triggers a freeze; fallback lane that runs without the model and that a junior teammate could execute; kill switch owned by a named role; audit log captured per case. The drawing is uglier and that is the point — failure modes are visible before they cost a customer.',
      ].join('\n\n'),
    },
    {
      id: 'ae-m12-practice-gap-output',
      type: 'output_prompt',
      title: 'Artifact to produce',
      prompt: 'Save Module12_Workflow_Agent_Readiness_[YourName] with the workflow diagram, the SOP slice, the fallback table, and the agent-readiness decision card for one candidate AI step.',
      outputExpectation: 'Workflow readiness + agent-readiness decision',
    },
    {
      id: 'ae-m12-practice-gap-next',
      type: 'next_step',
      body: 'Next: ae-m13 writes accountable decision memos with falsifiers — using your workflow map as input.',
    },
  ],

  'ai-essentials::ae-m12-revision': [
    {
      id: 'ae-m12-revision-gap-intro',
      type: 'intro',
      eyebrow: 'Revision gate',
      title: 'Tighten · Workflows, automation, and agents',
      body: 'Compress where agents may attach, where they may not yet, and what rollback looks like in one page.',
    },
    {
      id: 'ae-m12-revision-gap-recap',
      type: 'recap',
      title: 'Compress to checks',
      bullets: [
        'One human gate you refuse to skip.',
        'One outage fallback you tested on paper.',
        'One prompt attachment point with an owner.',
      ],
    },
    {
      id: 'ae-m12-revision-gap-task',
      type: 'practice_task',
      title: 'Structured gate',
      prompt: 'In 6–10 sentences: agent readiness decision, evidence, and what would revoke autonomy.',
    },
    {
      id: 'ae-m12-revision-gap-next',
      type: 'next_step',
      body: 'Proceed when rollback is named, not implied.',
    },
  ],

  'ai-essentials::ae-m13-practice': [
    {
      id: 'ae-m13-practice-gap-intro',
      type: 'intro',
      eyebrow: 'Practice lab',
      title: 'Decision memo a busy reviewer can attack on substance',
      body: 'You will write a two-page decision memo that separates options analysis from the decision record, names assumptions and falsifiers, and lets the model attack your preferred option in a pre-mortem appendix. Authorship and accountability stay with you.',
    },
    {
      id: 'ae-m13-practice-gap-worked',
      type: 'worked_example',
      eyebrow: 'Worked thread',
      title: 'Memo spine + pre-mortem with reconciled critique',
      body: [
        'Pick one real or realistic decision in your context: a vendor partnership, a hiring choice, a rollout window, a study-abroad commitment, a programme expansion. Draft the memo with this spine:',
        '',
        '1. Question (one sentence; what is the binary or trade we are deciding). 2. Criteria before options (what \'\'good\'\' looks like, ranked). 3. Options (2–4) with upsides, downsides, and explicit assumptions per option. 4. Conflicts kept visible (where evidence disagrees; do not smooth). 5. Recommendation with confidence level and the cheapest next information buy. 6. Falsifiers — what observation in the next two weeks would flip my recommendation, with an owner and a date.',
        '',
        'Then run a pre-mortem: ask the model to play hostile reviewer and tear down your preferred option (incentives you missed, blind spots, stakeholder revolts, regulatory exposure, financial fragility). Reconcile honestly which critiques are real, which need data, and which are cheap cynicism — and edit the memo with the changes visible.',
      ].join('\n\n'),
      example:
        'Falsifier (sample row): "If first-cycle pilot misroute rate exceeds 6%, recommendation flips from \'\'expand\'\' to \'\'pause and audit.\'\' Owner: programme lead. Decision date: 2026-06-15. Data source: weekly QA tag report."',
    },
    {
      id: 'ae-m13-practice-gap-task',
      type: 'practice_task',
      title: 'Learner task · Memo spine + pre-mortem appendix',
      bullets: [
        '1. Write the two-page memo using the spine above; keep at least one unresolved conflict visible.',
        '2. Run a pre-mortem with the model as adversary; reconcile critiques and show at least one edit the pre-mortem caused.',
        '3. Add a falsifier table: at least three assumptions with the observation that would flip them, the owner, and the date.',
      ],
      prompt: 'If you cannot name what would change your mind, you are not done. If the recommendation paragraph could survive a hostile reviewer without the falsifier table, the table is hiding work.',
    },
    {
      id: 'ae-m13-practice-gap-checklist',
      type: 'key_points',
      eyebrow: 'Self-review checklist',
      title: 'Six gates before this memo leaves your hands',
      bullets: [
        'The question is one sentence and binary or trade-shaped — not a topic.',
        'Criteria are written before options so option order does not anchor the recommendation.',
        'At least one unresolved conflict is named in the body, not buried in an appendix.',
        'The pre-mortem produced at least one visible edit in the final memo (not just an appendix).',
        'Every assumption has a flip condition, an owner, and a date.',
        'You would sign the memo if your name printed alone on page one — no "the team thinks" hedge.',
      ],
    },
    {
      id: 'ae-m13-practice-gap-bad-good',
      type: 'concept_explanation',
      eyebrow: 'Bad vs good',
      title: 'A weak recommendation paragraph and a stronger one',
      body: [
        'Weak (avoid): "After careful review of multiple options, the recommended path forward is to expand the programme in Q3 to capture momentum and align with strategic priorities. Risks have been considered." Confident, vague, unfalsifiable, and the model could have written it from a vibe.',
        '',
        'Stronger (model this): "Recommend a staged expansion: open two cohorts in Q3 while keeping Q4 reserved as a kill window. This holds if the first cohort achieves >70% completion and <6% misroute rate; if either misses, recommendation flips to pause-and-audit on 2026-09-30. Conflict on baseline definitions remains unresolved; the cheapest next information buy is one independent QA pass on 50 cases (≈£800). I will own the flip decision; programme lead owns the QA buy."',
        '',
        'The stronger version is harder to hide behind. It commits to specific observations, names a date, and tells a reviewer where to push if they disagree.',
      ].join('\n\n'),
    },
    {
      id: 'ae-m13-practice-gap-output',
      type: 'output_prompt',
      title: 'Artifact to produce',
      prompt: 'Save Module13_Decision_Memo_[YourName] with the two-page memo, the pre-mortem appendix showing visible reconciliation, and a falsifier table with owners and dates.',
      outputExpectation: 'Decision memo + pre-mortem appendix',
    },
    {
      id: 'ae-m13-practice-gap-next',
      type: 'next_step',
      body: 'Next: ae-m14 aligns teams on disclosure, review ownership, and data boundaries — using your memo as one of the artefacts the team would now review under shared rails.',
    },
  ],

  'ai-essentials::ae-m14-practice': [
    {
      id: 'ae-m14-practice-gap-intro',
      type: 'intro',
      eyebrow: 'Practice lab',
      title: 'Team AI agreement, legible to the next shift',
      body: 'You draft a one-page agreement: disclosure defaults, review ownership, data tiers, escalation, and catalog ownership for shared prompts.',
    },
    {
      id: 'ae-m14-practice-gap-task',
      type: 'practice_task',
      title: 'Practice · RACI for three AI-assisted steps',
      bullets: [
        '1. Map three steps with A/R/C/I for human review and tool use.',
        '2. Add one ritual that makes assistance visible in tickets or docs.',
      ],
      prompt: 'If two teams could diverge silently, tighten the catalog rule.',
    },
    {
      id: 'ae-m14-practice-gap-output',
      type: 'output_prompt',
      title: 'Artifact to produce',
      prompt: 'Draft Module14 team AI use agreement with named reviewers.',
      outputExpectation: 'Team AI agreement draft',
    },
    {
      id: 'ae-m14-practice-gap-next',
      type: 'next_step',
      body: 'Next: ae-m15 packages prompt packs and playbooks with version notes.',
    },
  ],

  'ai-essentials::ae-m15-practice': [
    {
      id: 'ae-m15-practice-gap-intro',
      type: 'intro',
      eyebrow: 'Practice lab',
      title: 'Prompt packs that survive model updates',
      body: 'You assemble entries with purpose, inputs, boundaries, review criteria, ownership, and test notes against a fresh scenario.',
    },
    {
      id: 'ae-m15-practice-gap-task',
      type: 'practice_task',
      title: 'Practice · Mini pack + scenario test',
      bullets: [
        '1. Three pack entries with version notes and refusal boundaries.',
        '2. Run a cold scenario; log two gaps and one fix path.',
      ],
      prompt: 'Stop when updates have an owner and a changelog habit.',
    },
    {
      id: 'ae-m15-practice-gap-output',
      type: 'output_prompt',
      title: 'Artifact to produce',
      prompt: 'Draft Module15 prompt pack playbook slice with test log.',
      outputExpectation: 'Prompt pack playbook draft',
    },
    {
      id: 'ae-m15-practice-gap-next',
      type: 'next_step',
      body: 'Next: ae-m16 integrates the capstone bundle and prep session.',
    },
  ],

  'ai-essentials::ae-m15-revision': [
    {
      id: 'ae-m15-revision-gap-intro',
      type: 'intro',
      eyebrow: 'Revision gate',
      title: 'Tighten · Reusable systems',
      body: 'Compress what must be canonical across teammates versus what can vary by role.',
    },
    {
      id: 'ae-m15-revision-gap-recap',
      type: 'recap',
      title: 'Compress to checks',
      bullets: [
        'One canonical template and its owner.',
        'One test you rerun after model or vendor change.',
        'One failure sign that freezes edits until review.',
      ],
    },
    {
      id: 'ae-m15-revision-gap-task',
      type: 'practice_task',
      title: 'Structured gate',
      prompt: 'In 6–10 sentences: drift you saw, how versioning fixes it, and what you will teach onboarding.',
    },
    {
      id: 'ae-m15-revision-gap-next',
      type: 'next_step',
      body: 'Proceed when the pack is reviewable without you narrating.',
    },
  ],

  'ai-essentials::ae-m16-practice': [
    {
      id: 'ae-m16-practice-gap-intro',
      type: 'intro',
      eyebrow: 'Practice lab',
      title: 'End-to-end run with receipts',
      body: 'You will execute one bounded, real workflow end-to-end with logged prompts, verification notes, revision trail, privacy discipline, and disclosure — using your Module 15 toolkit, Module 12 workflow map, Module 10 classification habit, and Module 6 verification habit as required inputs, not optional extras.',
    },
    {
      id: 'ae-m16-practice-gap-worked',
      type: 'worked_example',
      eyebrow: 'Worked thread',
      title: 'A capstone task done well: scope, run, verify, revise, package',
      body: [
        'Pick a capstone task that is small enough to finish and serious enough to mean something — a real recurring deliverable in your pathway, ideally one you already do. Then walk it through the full sequence:',
        '',
        '1. Plan and verify scope (one paragraph; named reader; success signal). 2. Design the workflow using your Module 12 map. 3. Run prompts using your Module 15 pack and log inputs/outputs. 4. Verify load-bearing claims using your Module 6 habit; downgrade or refuse where evidence is thin. 5. Apply Module 10 privacy discipline at every paste. 6. Revise with marginal notes that show what changed and why. 7. Self-critique using the seven-criterion rubric and the eight-point fallback (pause, named reader, claim trace, privacy, usefulness, prompts, revision log, confidence note). 8. Package the bundle with consistent filenames and a disclosure page.',
        '',
        'A strong capstone exposes process: prompts visible, verification notes visible, refusals and gaps visible. A weak capstone is a polished final paragraph and a vague workflow description.',
      ].join('\n\n'),
      example:
        'Disclosure note (pattern): "AI-assisted draft. Prompts and revision log included in appendix; load-bearing factual claims verified against [sources]; identified gap: [section]; gap-closure plan: [date and owner]. I am the named human owner for this artefact."',
    },
    {
      id: 'ae-m16-practice-gap-task',
      type: 'practice_task',
      title: 'Learner task · Capstone dry run with reviewer-visible receipts',
      bullets: [
        '1. Trace each required deliverable (workflow map, prompts, outputs, verification notes, privacy boundaries, revision trail, final output, self-critique, reflection, disclosure) to a file you already produced or to a labeled gap with a dated next step.',
        '2. Run the eight-point self-critique fallback honestly; name the weakest evidence section out loud and decide whether to scope it down or close it.',
        '3. Hold a 10-minute hostile Q&A — with a peer or your own timed list of skeptical questions — and update the weakest section first.',
      ],
      prompt: 'If disclosure is missing anywhere it should appear, add it now. If you would only show this bundle "with me talking over it," keep revising or label the gap and a dated plan.',
    },
    {
      id: 'ae-m16-practice-gap-checklist',
      type: 'key_points',
      eyebrow: 'Self-review checklist',
      title: 'Seven gates before you mark capstone prep complete',
      bullets: [
        'Every required deliverable maps to a file or to a labeled gap with a dated next step — no silent omissions.',
        'Prompts and revision trail are visible to a reviewer without you narrating them.',
        'Load-bearing factual claims either trace to passages or are downgraded to "uncited—needs source."',
        'Privacy discipline is visible: no Tier 3 raw identifiers in prompts, no never-enter classes anywhere in the bundle.',
        'Disclosure note names you as the human owner and accurately describes how AI was used.',
        'Self-critique fallback ran end-to-end; the weakest section is either strengthened or honestly labeled.',
        'Rubric self-grade in the app reflects what a reviewer would actually see — not how you want to feel about your work.',
      ],
    },
    {
      id: 'ae-m16-practice-gap-bad-good',
      type: 'concept_explanation',
      eyebrow: 'Bad vs good',
      title: 'A weak capstone bundle and a stronger one',
      body: [
        'Weak (avoid): a final polished PDF, a one-line "AI-assisted" note, no prompts, no revision history, no verification notes, vague rubric self-grade ("Strong" everywhere). A reviewer cannot tell where the work was done, what was checked, or what the learner refused to claim. Hidden process is the same as no process.',
        '',
        'Stronger (model this): the same final PDF plus an appendix with prompts (versioned), a verification table for load-bearing claims, marginal revision notes showing what changed and why, a privacy boundary statement aligned to Module 10, a self-critique that names the weakest section, a disclosure note with named owner, and a rubric self-grade where one or two rows are honestly Developing because the evidence does not yet meet Ready. The bundle is bigger, but a reviewer can navigate it cold and argue with substance.',
      ].join('\n\n'),
    },
    {
      id: 'ae-m16-practice-gap-output',
      type: 'output_prompt',
      title: 'Artifact to produce',
      prompt: 'Assemble Module16_AI_Workflow_Capstone_[YourName] with the workflow map, pack/playbook reference, AI-assisted outputs, verification notes, privacy boundaries, revision trail, final output, self-critique, one-page reflection, and disclosure — plus the rubric self-grade in the app.',
      outputExpectation: 'Capstone bundle + rubric self-grade',
    },
    {
      id: 'ae-m16-practice-gap-next',
      type: 'next_step',
      body: 'Then complete capstone prep and the rubric self-check in the session UI when your deliverables match the brief and rubric rows are honestly Ready or Strong.',
    },
  ],

  'ai-essentials::ae-m16-revision': [
    {
      id: 'ae-m16-revision-gap-intro',
      type: 'intro',
      eyebrow: 'Revision gate',
      title: 'Tighten · Capstone integration',
      body: 'Compress scope, evidence, and reviewer navigation before submission pressure peaks.',
    },
    {
      id: 'ae-m16-revision-gap-recap',
      type: 'recap',
      title: 'Compress to checks',
      bullets: [
        'Each deliverable maps to evidence or a labeled gap.',
        'One section you strengthened after honest self-critique.',
        'Disclosure and limitation language matches your actual process.',
      ],
    },
    {
      id: 'ae-m16-revision-gap-task',
      type: 'practice_task',
      title: 'Structured gate',
      prompt: 'In 6–10 sentences: what a mentor would challenge first, and how you responded in the bundle.',
    },
    {
      id: 'ae-m16-revision-gap-next',
      type: 'next_step',
      body: 'Proceed to recap when a peer could navigate the bundle cold.',
    },
  ],

  'ai-essentials::ae-m16-recap': [
    {
      id: 'ae-m16-recap-gap-intro',
      type: 'intro',
      eyebrow: 'Consolidation',
      title: 'Consolidate · Course carry-forward',
      body: 'Archive keywords, reuse rules, and the seven rubric rows you will reopen before your next high-stakes AI-assisted deliverable.',
    },
    {
      id: 'ae-m16-recap-gap-keys',
      type: 'key_points',
      title: 'Carry-forward pack',
      bullets: [
        'Verification scales with stakes; fluency is not sourcing.',
        'Prompts are specs; iteration needs rollback signals.',
        'Privacy and disclosure are operational habits, not one-time policies.',
      ],
    },
    {
      id: 'ae-m16-recap-gap-reflect',
      type: 'reflection_prompt',
      title: 'Calibration',
      prompt: 'Which single habit from Course 1 will you protect first when schedules compress?',
    },
    {
      id: 'ae-m16-recap-gap-next',
      type: 'next_step',
      body: 'Archive this recap where your future self will find it before the next deadline.',
    },
  ],
}

export const FLAGSHIP_SESSION_CONTENT_OVERRIDES_AI_ESSENTIALS_GAPS: Partial<
  Record<string, FlagshipSessionContentBlock[]>
> = Object.fromEntries(
  Object.entries(FLAGSHIP_SESSION_CONTENT_OVERRIDES_AI_ESSENTIALS_GAPS_RAW).map(([k, v]) => [
    k,
    [...(v as FlagshipSessionContentBlock[]), flagshipDepthPaddingBlock(k.replace(/^ai-essentials::/, ''))],
  ]),
) as Partial<Record<string, FlagshipSessionContentBlock[]>>
