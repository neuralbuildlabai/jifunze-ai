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
      title: 'Audience-fit writing without smuggled facts',
      body: 'You will tune structure, proof style, and call-to-action for two real readers without inventing contradictory facts. The goal is not prettier prose — it is a draft a reviewer can trust because each sentence is either an APPROVED_FACT, ORG_VOICE, or NEEDS_HUMAN_FACT, with a named releaser before send.',
    },
    {
      id: 'ae-m07-practice-gap-worked',
      type: 'worked_example',
      eyebrow: 'Worked thread',
      title: 'Two doors, one approved facts block, one verification footer',
      body: [
        'Pick one real recommendation or message you owe in your context: a project update for two audiences (exec and team), a donor email plus a regulator note, a parent letter plus a board summary.',
        '',
        'Step 1 — Lock the facts: write a short approved facts block (5–10 sentences) — only what you can verify against a source you could show a reviewer. Step 2 — Author two openings (≈90 words each) for two readers. Step 3 — Tag every sentence in both openings as APPROVED_FACT (cited to the block), ORG_VOICE (yours, no new factual claim), or NEEDS_HUMAN_FACT (a placeholder a teammate must fill before send). Step 4 — Forbid the model from upgrading any NEEDS_HUMAN_FACT to APPROVED_FACT under any rewrite. Step 5 — Add a verification footer naming the source per load-bearing claim and the named human releaser per audience.',
        '',
        'Reading the result: a reviewer should be able to tell, sentence by sentence, what was checked, what is voice, and what still needs a human before the message goes out.',
      ].join('\n\n'),
      example:
        'Verification footer pattern: "AI-assisted draft. Facts in opening A verified against [source]; facts in opening B verified against [source]; one NEEDS_HUMAN_FACT in B awaiting [name]. Releaser per audience: J. Kim (exec), N. Otieno (team)."',
    },
    {
      id: 'ae-m07-practice-gap-task',
      type: 'practice_task',
      title: 'Learner task · Approved facts block, two doors, marginal pass',
      bullets: [
        '1. Write the approved facts block (5–10 sentences) tied to verifiable sources you could show a reviewer.',
        '2. Draft two openings (≈90 words each) tuned to two real readers; tag every sentence APPROVED_FACT / ORG_VOICE / NEEDS_HUMAN_FACT and forbid model upgrades.',
        '3. Run a marginal pass on a third AI draft you did not write: cut two generic sentences, write what you would say in your own voice using only the facts block, and add a verification footer with named releaser per audience.',
      ],
      prompt: 'Stop when each opening names a decision the reader can make and an honest place where evidence is still missing — not just a tone difference between drafts.',
    },
    {
      id: 'ae-m07-practice-gap-checklist',
      type: 'key_points',
      eyebrow: 'Self-review checklist',
      title: 'Six gates before either opening is sent',
      bullets: [
        'No sentence is an APPROVED_FACT unless it appears in the facts block; the model cannot upgrade NEEDS_HUMAN_FACT under any rewrite.',
        'Tone differs across audiences; factual claims do not — there is no extra promise in the warmer version.',
        'False precision is gone: any number, date, or causal verb traces to a passage in the facts block or is downgraded.',
        'Each opening names a decision the reader can make and at least one place where evidence is still missing.',
        'Verification footer names the source per load-bearing claim and the named human releaser per audience.',
        'A reviewer who does not know the case could read either opening cold and tell what is fact, voice, or pending.',
      ],
    },
    {
      id: 'ae-m07-practice-gap-bad-good',
      type: 'concept_explanation',
      eyebrow: 'Bad vs good',
      title: 'A polished AI opening with smuggled details — and a stronger one',
      body: [
        'Weak (avoid): "Last week our team helped Jane, a 32-year-old single mother of two, return to work after a six-month gap — a story that captures the heart of what we do." Beautiful, specific, and untrue: the case file does not say Jane is 32 or has two children; the model invented the detail because the prompt asked for "more emotional" copy.',
        '',
        'Stronger (model this): "Last week our employment team supported a participant — call them P — back into work after a six-month gap. We are not naming the person at their request; details below are tagged APPROVED_FACT or ORG_VOICE so a reviewer can audit before send. Decision for the reader: confirm whether the participant has consented to a named version before publication." The voice still lands; the facts that travel are the ones the case file actually contains.',
      ].join('\n\n'),
    },
    {
      id: 'ae-m07-practice-gap-output',
      type: 'output_prompt',
      title: 'Artifact to produce',
      prompt: 'Save Module07_Audience_Fit_Communication_[YourName] with the approved facts block, both tagged openings, the marginal-pass paragraph, and the verification footer naming releaser per audience.',
      outputExpectation: 'Audience-fit communication draft + verification footer',
    },
    {
      id: 'ae-m07-practice-gap-next',
      type: 'next_step',
      body: 'Next: ae-m08 installs integrity-forward study loops you can defend in graded contexts using the same authorship discipline you just practiced for outward writing.',
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
      title: 'Operational guardrails a tired teammate can still execute',
      body: 'You will draft a one-page responsible-use note for a real role: assist-only zones, two concrete forbidden examples, a disclosure pattern that tells reviewers what to re-check (not just "AI-assisted"), the named human owner per artifact, and a single escalation contact. The deliverable is a page a new hire could follow on day one without Slack heroics.',
    },
    {
      id: 'ae-m09-practice-gap-worked',
      type: 'worked_example',
      eyebrow: 'Worked thread',
      title: 'A responsible-use note + a RACI for three AI-assisted steps',
      body: [
        'Pick one role you actually hold or manage: a CS rep drafting refunds, an HR lead writing rejection letters, an educator drafting feedback comments, a fundraiser writing donor copy. Build the note in five short sections.',
        '',
        '1. Assist-only zones — where AI may help (drafting, summarising supplied material, reformatting) — with one example each. 2. Forbidden zones — where AI may not be used or where data may not flow — with two concrete examples drawn from your context (candidate PII into a public chat; child or patient identifying detail; legal opinion authorship). 3. Disclosure pattern — a sentence that tells the reviewer what to re-check ("Sections A–C drafted with AI from supplied brief v3; facts in C verified against ticket #4412; pricing in B is TBD pending finance; human approver: J. Kim"). 4. Named human owner per artifact — one role, not "the team." 5. Escalation contact — a single named role for suspected data mishandling, with a one-line trigger ("if input touches HR action, hiring, credit, child or patient identifying detail, or unfamiliar regulatory ground, stop and ask [security or compliance lead]").',
        '',
        'Add a RACI for three AI-assisted steps in one workflow: who is Accountable, Responsible, Consulted, Informed. "The team" is not an owner.',
      ].join('\n\n'),
      example:
        'Disclosure that routes attention (sample): "AI-assisted draft. Facts verified against [source]; uncertainty on [section]; one section pending [name]; releaser: [role]." Reviewers know exactly where to spend minutes — not "assess everything" or "assume safe."',
    },
    {
      id: 'ae-m09-practice-gap-task',
      type: 'practice_task',
      title: 'Learner task · Responsible-use note + RACI + one workflow you will not automate',
      bullets: [
        '1. Draft the one-page responsible-use note with assist-only zones, two concrete forbidden examples, the disclosure pattern, named human owner per artifact, and escalation contact (with trigger).',
        '2. Build a RACI for three AI-assisted steps in one workflow you actually run; assign names or specific roles, not teams.',
        '3. Name one workflow you will not automate this quarter; record the data class involved, the risk to people if it goes wrong, and the trigger that would force escalation to legal or security.',
      ],
      prompt: 'If ownership is vague, stop and assign names before continuing. If the disclosure pattern only says "AI-assisted," rewrite it until a reviewer knows what to re-check.',
    },
    {
      id: 'ae-m09-practice-gap-checklist',
      type: 'key_points',
      eyebrow: 'Self-review checklist',
      title: 'Six gates before this guardrails page leaves your hands',
      bullets: [
        'A new hire could follow the note on day one without DMing you for context.',
        'Forbidden zones cite a real policy or incident pattern, not a slogan; two examples are concrete to your role.',
        'Disclosure pattern names what to re-check (facts, tone, policy, scope) — not just that AI was used.',
        'Every AI-assisted step in the RACI has one accountable person or specific role; "the team" appears nowhere as an owner.',
        'Escalation contact is a named role, with a one-line trigger phrased so a tired teammate can apply it.',
        'The "will not automate" workflow names the data class, the risk to people, and the named gate that protects them.',
      ],
    },
    {
      id: 'ae-m09-practice-gap-bad-good',
      type: 'concept_explanation',
      eyebrow: 'Bad vs good',
      title: 'A vague guardrail and one a reviewer can enforce',
      body: [
        'Weak (avoid): "Use AI responsibly. Disclose where appropriate. Escalate concerns to leadership." A binding-free paragraph: nothing names what counts as responsible, where disclosure is required, or who owns escalation. Tired-you on Sunday night will redefine each word to mean whatever finishes the deliverable.',
        '',
        'Stronger (model this): "Assist-only: drafting from supplied case notes; summarising public reports. Forbidden: any candidate or patient identifying detail in a public chat; authoring legal or medical conclusions. Disclosure: every AI-assisted artifact must name what was AI-drafted, what was verified, what is TBD, and the human approver. Owner: J. Kim per refund reply; N. Otieno per rejection letter. Escalation: any suspected PII leak goes to compliance lead within the same shift, with logs and a screen-cap of the chat preserved." Concrete enough to enforce on a Friday and audit on a Monday.',
      ].join('\n\n'),
    },
    {
      id: 'ae-m09-practice-gap-output',
      type: 'output_prompt',
      title: 'Artifact to produce',
      prompt: 'Save Module09_Responsible_AI_Guardrails_[YourName] with the responsible-use note, the RACI for three AI-assisted steps, the disclosure pattern with a sample line, and the "will not automate" entry with risk-to-people and escalation trigger.',
      outputExpectation: 'Responsible-use note + RACI + escalation pattern',
    },
    {
      id: 'ae-m09-practice-gap-next',
      type: 'next_step',
      body: 'Next: ae-m10 turns the responsibility posture into keyboard habits — privacy tiers, minimum-necessary discipline, and pause-or-escalate rules before every paste.',
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
      title: 'Research synthesis with disagreement preserved',
      body: 'You will turn three to six sources on a contested question into an evidence table and a one-page brief where conflicts stay visible, recommendations match evidence strength, and the cheapest next information buy is named. The deliverable is a brief a busy reviewer can attack on substance — not on tone.',
    },
    {
      id: 'ae-m11-practice-gap-worked',
      type: 'worked_example',
      eyebrow: 'Worked thread',
      title: 'From three sources to a brief that exposes its own gaps',
      body: [
        'Pick a real research question in your context: a vendor decision, a programme expansion, a policy debate, a market claim. Gather three to six sources you would actually use; mix vendor, independent, and primary where possible.',
        '',
        '1. Atomic claims — extract the smallest statements that could be true or false on their own; map each to a paragraph or cell anchor. 2. Strength labels — Verified (passage in hand), Moderate (logical / partial support), Weak (single source, no replication), Uncited (needs work). 3. Conflicts row — when sources disagree, write what they disagree about and what would adjudicate. 4. Brief spine (one page) — decision question, three to five anchored claims with strength labels, at least one named conflict, unknowns ranked by cost-of-error, recommendation conditioned on assumptions, and the cheapest next observation that would reduce uncertainty. 5. Falsifier — the observation in the next two weeks that would flip the recommendation, with an owner and a date.',
        '',
        'Forbid the model from inventing citations. Where a citation is missing, the row reads "uncited—needs source" and the brief downgrades the claim or scopes it out.',
      ].join('\n\n'),
      example:
        'Sample brief footer: "Recommendation holds if the next two cycles meet >70% completion and <6% misroute rate; if either misses, recommendation flips to pause-and-audit on 2026-08-30. Conflict between vendor case study and independent audit on baseline definitions remains unresolved; cheapest next information buy is one independent QA pass on 50 cases (≈£800). Owner: programme lead. Author: [me], not the model."',
    },
    {
      id: 'ae-m11-practice-gap-task',
      type: 'practice_task',
      title: 'Learner task · Evidence table + one-page brief + falsifier',
      bullets: [
        '1. Build an evidence table for at least five load-bearing claims (claim / source anchor / strength / conflict noted? / next observation).',
        '2. Write a one-page brief with the spine above; keep at least one unresolved conflict visible in the body, not buried in an appendix.',
        '3. Add a falsifier table: at least two assumptions with the observation that would flip them, the owner, and the date.',
      ],
      prompt: 'If the brief hides conflict, rewrite until disagreement is visible. If a citation cannot be opened, downgrade the claim or scope it out — never invent a source to keep the page tidy.',
    },
    {
      id: 'ae-m11-practice-gap-checklist',
      type: 'key_points',
      eyebrow: 'Self-review checklist',
      title: 'Six gates before this brief leaves your hands',
      bullets: [
        'Every load-bearing claim has a strength label and a passage anchor or an explicit "uncited—needs source" tag.',
        'At least one unresolved conflict is named in the body of the brief, not in a footnote.',
        'False precision is gone: any decimal, percentage, or causal verb traces to a passage or has been downgraded.',
        'Recommendation is conditioned on assumptions; nothing reads as certain that is not.',
        'The cheapest next information buy is named with a rough cost or effort, an owner, and a date.',
        'A hostile reader could re-check the top three claims without DMing you for context.',
      ],
    },
    {
      id: 'ae-m11-practice-gap-bad-good',
      type: 'concept_explanation',
      eyebrow: 'Bad vs good',
      title: 'A confident average and a brief that survives the next data point',
      body: [
        'Weak (avoid): "Recent industry studies show clear consensus that the new tool reduces errors by 30%; we should adopt it next quarter." Single sentence, fluent tone, three load-bearing claims (consensus, 30%, next quarter), zero passage references, no conflict, no falsifier. Polished, persuasive, and indefensible to anyone who opens the underlying papers.',
        '',
        'Stronger (model this): "Two vendor-published case studies report 25–35% error reduction in narrow conditions; one independent audit reports 8–12% in our deployment shape; reviewers disagree on baseline definitions. Recommendation: pilot for two cycles with the audit team’s baseline; kill criterion: no detectable improvement after cycle 2; cheapest next information buy: one customer reference call before procurement." The stronger version is longer because honesty has a length — but a reviewer can attack any claim by name and the recommendation survives or fails on substance, not on adjectives.',
      ].join('\n\n'),
    },
    {
      id: 'ae-m11-practice-gap-output',
      type: 'output_prompt',
      title: 'Artifact to produce',
      prompt: 'Save Module11_Research_Synthesis_Brief_[YourName] with the evidence table, one-page brief (decision question / anchored claims with strength / visible conflict / unknowns / recommendation conditioned on assumptions / cheapest next information buy), and the falsifier table with owners and dates.',
      outputExpectation: 'Research synthesis brief + evidence table + falsifiers',
    },
    {
      id: 'ae-m11-practice-gap-next',
      type: 'next_step',
      body: 'Next: ae-m12 turns synthesis discipline into workflow design — owners, gates, fallbacks, and agent-readiness conditions for one repeating task.',
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
      title: 'Prompt packs and playbooks that survive model updates and team turnover',
      body: 'You will package three prompt entries plus one playbook slice into a pack a tired teammate could run cold next Tuesday — with named owners, version notes, refusal boundaries, an acceptance test per entry, and a changelog row that names what triggered the most recent edit. The deliverable should make the third Tuesday safer than the first because you wrote down what works.',
    },
    {
      id: 'ae-m15-practice-gap-worked',
      type: 'worked_example',
      eyebrow: 'Worked thread',
      title: 'Three entries, one playbook slice, one acceptance test',
      body: [
        'Pick a recurring task family in your context: customer-reply drafting, weekly research brief, intake-form review, study-question generation, donor-note drafting. Build the pack in two layers.',
        '',
        'Layer 1 — three prompt-pack entries. For each entry, fill: purpose (one sentence); audience; inputs and data tier (green / yellow / red); boundaries and refusal rules (two forbidden moves with one example); output shape (table, JSON, memo headings); named owner (a person, not "the team"); version notes (what each version targeted); one acceptance test a peer could run on the output without rerunning the prompt ("if any metric has no source in the inputs, it must read TBD"); and a changelog row naming what triggered the last edit (model update, regression, policy change).',
        '',
        'Layer 2 — playbook slice. Wrap one of the entries in a short playbook: when to use it, the steps in order, the prompt attachment point with version note, the human gate where stakes spike, the safety boundary (data tier, never-enter classes), the output expectation, and the failure signs that should freeze edits until the owner reviews. Then run a cold scenario: hand the pack to a fresh input you have not seen and log at least two gaps the test surfaced plus one fix path with an owner.',
      ].join('\n\n'),
      example:
        'Changelog row pattern: "v1.4 (2026-04-22) — added \'\'do not invent timelines\'\' refusal after vendor model update produced overpromise language; owner: J. Kim; acceptance test: any reply that mentions a date not present in the policy snippet must be rejected by the reviewer."',
    },
    {
      id: 'ae-m15-practice-gap-task',
      type: 'practice_task',
      title: 'Learner task · Mini pack + playbook slice + cold-scenario test',
      bullets: [
        '1. Author three pack entries with all fields filled (purpose / audience / inputs and data tier / boundaries / output shape / owner / version notes / acceptance test / changelog row).',
        '2. Wrap one entry in a playbook slice (when to use, steps, prompt attachment with version, human gate, safety, output expectation, failure signs that freeze edits).',
        '3. Run a cold scenario on the pack; log two gaps the test surfaced and one fix path with an owner; write the rule that would freeze edits until the named owner reviews.',
      ],
      prompt: 'Stop when updates have an owner, a changelog habit, and an acceptance test that catches the failure mode the changelog already names. If the pack only works when the original author is in the room, keep iterating.',
    },
    {
      id: 'ae-m15-practice-gap-checklist',
      type: 'key_points',
      eyebrow: 'Self-review checklist',
      title: 'Seven gates before this pack is reusable',
      bullets: [
        'Each entry names a single human owner — not "the team" or "whoever is on call."',
        'Each entry has at least one refusal rule with a concrete example drawn from real failure modes (overpromise, invented citation, leaked PII, wrong audience).',
        'Acceptance test for each entry is mechanical: a peer can score the output without rerunning the prompt or DMing you for context.',
        'Changelog row names what triggered the last edit (model update, regression, policy change) and the date.',
        'Playbook slice names a human gate where stakes spike and the data tier rule for the inputs.',
        'Cold-scenario test surfaced at least two gaps and one fix path with an owner — not a vibes-based "looks fine."',
        'A model update or vendor change would route everyone back to the canonical entry, not into silent personal patches.',
      ],
    },
    {
      id: 'ae-m15-practice-gap-bad-good',
      type: 'concept_explanation',
      eyebrow: 'Bad vs good',
      title: 'A folder of "final v7" screenshots and a pack a stranger could run',
      body: [
        'Weak (avoid): a Google Drive folder named "AI prompts FINAL," a few screenshots labelled v7-final-FINAL2, no owner, no refusal rules, no acceptance test, no changelog. The first time the model updates or the maintainer goes on leave, half the team patches their copy quietly and the canonical version drifts away from policy. Folklore replaces the system.',
        '',
        'Stronger (model this): a versioned pack with three entries — each with purpose, audience, inputs and data tier, two refusal rules with examples, output shape, named owner, an acceptance test, and a changelog row naming what triggered the last edit. One entry is wrapped in a playbook slice with a human gate and failure signs that freeze edits. A vendor update is treated as a re-test event — not a fork — and the rule that would freeze edits until the owner reviews is written down where the next teammate will find it.',
      ].join('\n\n'),
    },
    {
      id: 'ae-m15-practice-gap-output',
      type: 'output_prompt',
      title: 'Artifact to produce',
      prompt: 'Save Module15_Prompt_Pack_Playbook_[YourName] with the three pack entries (all fields filled, including acceptance test and changelog row), one playbook slice with human gate and failure signs, the cold-scenario test log with at least two gaps and one fix path, and the freeze-edit rule for model or vendor updates.',
      outputExpectation: 'Prompt pack + playbook slice + cold-scenario test log',
    },
    {
      id: 'ae-m15-practice-gap-next',
      type: 'next_step',
      body: 'Next: ae-m16 integrates the capstone bundle and prep session — your pack and playbook become required inputs to the end-to-end run, not optional extras.',
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
