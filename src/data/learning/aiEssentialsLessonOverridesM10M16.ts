/**
 * AI Essentials lessons ae-m10–ae-m16 — aligned to finalized Course 1 module topics
 * (privacy before research; teams → prompt packs → capstone). Keys must match
 * flagshipSessionContentOverrideKey('ai-essentials', sessionId).
 */

import type { FlagshipSessionContentBlock } from './flagshipSessionContentTypes'

const C = 'ai-essentials::'

export const AI_ESSENTIALS_LATE_LESSON_ENTRIES: [string, FlagshipSessionContentBlock[]][] = [
  [
    `${C}ae-m10-lesson`,
    [
      {
        id: 'ae-m10-lesson-intro',
        type: 'intro',
        eyebrow: 'Before you paste',
        title: 'Privacy, Risk, Boundaries, and Safe Operational Use',
        body: [
          'Most early AI mistakes are not “the model was wrong.” They are “I pasted too much, too raw, too fast.” Once text leaves your screen into a third-party tool, you cannot fully call it back.',
          '',
          'This module installs a small, repeatable discipline at the keyboard: minimum necessary information, a four-tier sensitivity classification, redaction versus abstraction, and a clear pause-or-escalate rule when policy or stakes say stop. It is positioned after responsibility (Module 9) and before research and workflow modules so safer habits carry into everything that follows.',
          '',
          'This is practical operational safety—not legal advice. When unsure, treat content as more sensitive, strip more, or escalate to someone who can say yes or no for your organisation.',
        ].join('\n\n'),
      },
      {
        id: 'ae-m10-lesson-min-nec',
        type: 'concept_explanation',
        eyebrow: 'Core habit',
        title: 'The minimum-necessary information test',
        body: [
          'Before every paste, ask: what is the smallest amount of information the AI actually needs to help with this task?',
          '',
          'Most privacy mistakes are convenience pastes: the whole email thread, the whole spreadsheet row, the whole patient note. The model will use everything you give it—including identifiers you did not need to share.',
          '',
          'Pair the test with a reviewer mindset: if this prompt and output were read tomorrow by your manager, compliance, the customer, or a regulator, would you be comfortable? If not, strip further or do not use AI for this slice.',
        ].join('\n\n'),
      },
      {
        id: 'ae-m10-lesson-tiers',
        type: 'concept_explanation',
        eyebrow: 'Four tiers',
        title: 'Safe, caution, restricted, never-enter',
        body: [
          'Tier 1 — Safe: public or genuinely generic material; still avoid dumping entire libraries when a paragraph suffices.',
          'Tier 2 — Caution: internal-but-not-identifying drafts; light redaction of names and org markers.',
          'Tier 3 — Restricted: identifies third parties or touches HR, finance, health, education, or client-confidential content—do not paste raw; prefer abstraction when policy allows.',
          'Tier 4 — Never-enter: passwords, keys, full payment or ID numbers, raw clinical or legally privileged material, children’s identifying detail—do not “test” these in general-purpose tools.',
          '',
          'When tiers blur, classify up, not down. The absence of a clear yes is not a yes.',
        ].join('\n\n'),
      },
      {
        id: 'ae-m10-lesson-redact',
        type: 'worked_example',
        eyebrow: 'Redaction vs abstraction',
        title: 'Strip identifiers vs rewrite the whole case',
        body: [
          'Redaction removes tokens while keeping structure: names and account numbers become placeholders while the shape of the problem stays visible.',
          'Abstraction lifts to a generic clinical or business question so the specific case cannot be re-identified by someone who knows the people involved.',
          '',
          'Ask: could a colleague who does not know this case re-identify a person from what remains? If yes, you redacted but did not abstract enough for Tier 3+.',
        ].join('\n\n'),
        example:
          'Customer refund email: remove names, phones, tax IDs, and payment references; keep delay reason, wrong-logo proportion, and the make-good you intend—then draft the reply.',
      },
      {
        id: 'ae-m10-lesson-pause',
        type: 'concept_explanation',
        eyebrow: 'Pause and check',
        title: 'When to stop using AI for the task',
        body: [
          'Pause or escalate when: Tier 4 content with no approved tool; active legal or disciplinary processes; child/patient/victim sensitivity; hiring or credit decisions delegated to the model; unknown organisational policy; or a small unease you cannot name.',
          '',
          'Escalation means asking the person or function with authority—manager, IT, compliance, school admin—not pushing past the unease.',
        ].join('\n\n'),
      },
      {
        id: 'ae-m10-lesson-survey',
        type: 'concept_explanation',
        eyebrow: 'Survey only',
        title: 'Kenya/EAC, GDPR-shaped regimes, US sector rules — when to ask',
        body: [
          'Kenya’s Data Protection Act and peer EAC states set expectations for personal data handling. GDPR-shaped regimes emphasise minimisation and purpose limitation. US healthcare, education, finance, and children’s data carry sector frameworks.',
          '',
          'The practical move is identical across them for a non-lawyer learner: personal or sensitive data needs more care; organisations choose approved tools; if you cannot confirm policy before the deadline, do not paste.',
        ].join('\n\n'),
      },
      {
        id: 'ae-m10-lesson-portfolio',
        type: 'concept_explanation',
        eyebrow: 'Portfolio thread',
        title: 'Module10_Privacy_Safety_Checklist_[YourName]',
        body: [
          'Your combined artifact should include the classification table, safer prompt rewrite, redaction or abstraction example, pause/escalate scenario, operational checklist, and disclosure note described in the module manuscript—saved as Module10_Privacy_Safety_Checklist_[YourName].pdf or .docx.',
          '',
          'You will reuse this checklist in workflows (Module 12), team standards (Module 14), reusable packs (Module 15), and the Module 16 capstone privacy review.',
        ].join('\n\n'),
      },
      {
        id: 'ae-m10-lesson-next',
        type: 'next_step',
        eyebrow: 'Next up',
        title: 'Practice: tier sort, rewrites, boundary worksheet, safe workflow',
        body: 'Practice applies the tiers and rewrites to supplied materials, then designs a safe workflow for one task you actually run. Module 11 applies evidence discipline to research, analysis, and synthesis—now with privacy habits already in place.',
      },
    ],
  ],
  [
    `${C}ae-m11-lesson`,
    [
      {
        id: 'ae-m11-lesson-intro',
        type: 'intro',
        eyebrow: 'After safety, depth',
        title: 'AI for Research, Analysis, and Synthesis',
        body: [
          'Research with AI is not “ask and believe.” It is framing the question, curating sources, extracting claims with anchors, keeping disagreement visible, and writing conclusions proportional to evidence.',
          '',
          'Models accelerate reading and drafting—and they excel at false certainty because confident prose reads convincing. This lesson separates summary from synthesis, demands anchors for themes, and time-boxes depth to deadlines with an explicit unknowns section.',
        ].join('\n\n'),
      },
      {
        id: 'ae-m11-lesson-summary-synth',
        type: 'concept_explanation',
        eyebrow: 'Two jobs',
        title: 'Summary shortens; synthesis answers a question with conflict intact',
        body: [
          'Summary compresses wording while preserving meaning. Synthesis answers a question with multiple sources: what agrees, what conflicts, what is missing, and what to do next—without laundering debate into a smooth middle.',
          '',
          'Structural move: keep conflict in daylight—side-by-side claims with passage references, contested terms defined, and a rule that the model may not “resolve” definition fights without human-chosen scope.',
        ].join('\n\n'),
      },
      {
        id: 'ae-m11-lesson-pause',
        type: 'concept_explanation',
        eyebrow: 'Pause and check',
        title: 'Are you summarizing—or sneaking in a verdict?',
        body: 'Write one sentence that falsely flattens a debate you know about, then one that preserves disagreement and points to evidence that would resolve it. If you cannot name who disagrees, you are not done researching.',
      },
      {
        id: 'ae-m11-lesson-worked',
        type: 'worked_example',
        eyebrow: 'Weak vs stronger',
        title: '“Summarize 40 pages for the CEO” vs a sectioned brief with forbiddens',
        body: [
          'Weak prompts invite confident narrative with hidden gaps. Strong prompts lock the decision question, require paragraph-level references, forbid invented statistics, and ask for conflicts, unknowns ranked by cost-of-error, and a next observation plan.',
          '',
          'Then the human adds political or institutional context the documents cannot know—explicitly labeled as judgment, not citation.',
        ].join('\n\n'),
        example:
          'False-certainty sweep: search for “clearly,” “the data proves,” “consensus”—each must link to a passage or be deleted.',
      },
      {
        id: 'ae-m11-lesson-traps',
        type: 'key_points',
        eyebrow: 'Watch for these',
        title: 'Research traps that feel productive',
        bullets: [
          'Trusting citation-shaped strings—open and match claim to passage.',
          'Letting the model expand your source list unsupervised at high stakes.',
          'Thesis laundering—conclusion written before the evidence table.',
          'Endless search spirals—use decision deadlines and information buys.',
        ],
      },
      {
        id: 'ae-m11-lesson-portfolio',
        type: 'concept_explanation',
        eyebrow: 'Portfolio thread',
        title: 'Module11_Research_Synthesis_Brief_[YourName]',
        body: 'Keep evidence table + brief + extract/compare/brief prompts with “where this breaks” notes. This bundle feeds workflow standardisation (Module 12), decision memos (Module 13), prompt packs (Module 15), and the capstone verification story.',
      },
      {
        id: 'ae-m11-lesson-next',
        type: 'next_step',
        eyebrow: 'Next up',
        title: 'Practice: table, brief, prompt trio',
        body: 'Practice builds the evidence table, executive brief, and mini prompt library. Module 12 turns repeated work into stages, owners, gates, and agent-readiness.',
      },
    ],
  ],
  [
    `${C}ae-m12-lesson`,
    [
      {
        id: 'ae-m12-lesson-intro',
        type: 'intro',
        eyebrow: 'Shape before speed',
        title: 'AI for Workflows, Automation, and Agents',
        body: [
          'Once a research or writing pattern repeats, it becomes a workflow. Workflows need stages, sequence, dependencies, owners, review points, constraints, failure signals—and an explicit decision where AI helps and where it must not.',
          '',
          'This lesson treats workflow design as design: slow and deliberate before the tool runs; faster and safer after. You connect prompt packs to steps so behaviour is discussable, versionable, and auditable when stakes rise.',
        ].join('\n\n'),
      },
      {
        id: 'ae-m12-lesson-triggers',
        type: 'concept_explanation',
        eyebrow: 'Triggers and gates',
        title: 'Stakes × reversibility × blast radius',
        body: [
          'Encode triggers honestly: what makes this step high stakes, hard to reverse, or large blast radius? Those cells get human gates, tighter prompts, or refusal to automate.',
          '',
          'Plan fallbacks for model or vendor outages that humans can still execute—otherwise your workflow is a dependency on a logo, not a process.',
        ].join('\n\n'),
      },
      {
        id: 'ae-m12-lesson-agents',
        type: 'concept_explanation',
        eyebrow: 'Agents',
        title: 'Agent-readiness means conditions, not hype',
        body: [
          'Before any step is handed to an agent, name: inputs, outputs, success checks, kill switches, data tier, and the human owner when the agent stalls or drifts.',
          '',
          'If you cannot name those, you are not ready to delegate— you are only automating hope.',
        ].join('\n\n'),
      },
      {
        id: 'ae-m12-lesson-worked',
        type: 'worked_example',
        eyebrow: 'Worked thread',
        title: 'Friday tabletop: what breaks first?',
        body: [
          'Pick three recurring task families. Diagram stages with decision diamonds and named owners. Stress-test with a “Friday afternoon” scenario: interruptions, thin context, model outage.',
          '',
          'Patch the workflow and update prompt hooks where the failure actually lived—not generic “be more careful” notes.',
        ].join('\n\n'),
        example:
          'SOP slice: trigger → inputs → prompt slot → verification → owner → fallback when model refuses or data is Tier 3.',
      },
      {
        id: 'ae-m12-lesson-portfolio',
        type: 'concept_explanation',
        eyebrow: 'Portfolio thread',
        title: 'Module12_Workflow_Agent_Readiness_[YourName]',
        body: 'Artifact combines workflow map, SOP slice, and agent-readiness assessment with traceable stages—filename Module12_Workflow_Agent_Readiness_[YourName].pdf or .docx. It feeds decision memos, team standards, prompt packs, and the capstone.',
      },
      {
        id: 'ae-m12-lesson-next',
        type: 'next_step',
        eyebrow: 'Next up',
        title: 'Practice: diagram, tabletop, pathway notes',
        body: 'Practice locks the diagram, tabletop patch, and pathway-specific notes. Module 13 keeps decisions human-owned while AI widens options and stress-tests arguments.',
      },
    ],
  ],
  [
    `${C}ae-m13-lesson`,
    [
      {
        id: 'ae-m13-lesson-intro',
        type: 'intro',
        eyebrow: 'Human-owned decisions',
        title: 'AI for Decision Support and Critical Thinking',
        body: [
          'Module 12 named owners at each stage. Module 13 keeps the decision record with the human: options analysis can be AI-assisted; the decision is still owned, evidenced, and revisable.',
          '',
          'You will separate scenarios (hypotheses) from commitments, surface incentives and missing data that would flip a recommendation, and write memos a busy reviewer can attack on substance—not polish.',
        ].join('\n\n'),
      },
      {
        id: 'ae-m13-lesson-memo',
        type: 'concept_explanation',
        eyebrow: 'Memo anatomy',
        title: 'Assumptions, tradeoffs, falsifiers, next information buys',
        body: [
          'Strong memos show the question, criteria before options, options with upsides and downsides, explicit assumptions, conflicts with evidence, and what you would collect next if you had another week.',
          '',
          'Weak memos smuggle a recommendation without criteria, hide disagreement, or paste model prose as if it were findings.',
        ].join('\n\n'),
      },
      {
        id: 'ae-m13-lesson-premortem',
        type: 'worked_example',
        eyebrow: 'Stress test',
        title: 'Pre-mortem with AI as adversary—then reconcile honestly',
        body: [
          'Ask the model to tear down your preferred option: incentives, blind spots, stakeholder revolts. Then reconcile which critiques are real, which need data, and which are cheap cynicism.',
          '',
          'Log what changed in your memo after the pre-mortem—reviewers want to see the edit, not only the final paragraph.',
        ].join('\n\n'),
        example:
          'Decision memo + pre-mortem appendix: assumptions on page one; falsifiers in margins; owner and date on next evidence buys.',
      },
      {
        id: 'ae-m13-lesson-pause',
        type: 'concept_explanation',
        eyebrow: 'Pause and check',
        title: 'Would you sign this if your name were printed alone?',
        body: 'If not, you still own the gap: more verification, narrower claim, or escalation—not prettier wording.',
      },
      {
        id: 'ae-m13-lesson-portfolio',
        type: 'concept_explanation',
        eyebrow: 'Portfolio thread',
        title: 'Module13_Decision_Memo_[YourName]',
        body: 'Save the combined memo bundle as Module13_Decision_Memo_[YourName].pdf or .docx. It connects forward to team agreements (how decisions are disclosed) and to the capstone decision narrative.',
      },
      {
        id: 'ae-m13-lesson-next',
        type: 'next_step',
        eyebrow: 'Next up',
        title: 'Practice: memo, pre-mortem, pathway framing',
        body: 'Practice produces the memo and adversarial pass. Module 14 scales judgment to teams: shared disclosure, review ownership, and data boundaries.',
      },
    ],
  ],
  [
    `${C}ae-m14-lesson`,
    [
      {
        id: 'ae-m14-lesson-intro',
        type: 'intro',
        eyebrow: 'Coordination, not only skill',
        title: 'AI in Teams and Organizations',
        body: [
          'Skilled individuals without shared standards produce uneven, hard-to-audit work. Teams need lightweight governance: disclosure norms, review ownership, data boundaries, prompt-library rules, escalation, and approval that a small team can actually maintain.',
          '',
          'This lesson names coordination risks—silent drift, unowned prompts, shadow tools—and turns them into artefacts another teammate could follow without you in the room.',
        ].join('\n\n'),
      },
      {
        id: 'ae-m14-lesson-agreement',
        type: 'concept_explanation',
        eyebrow: 'Governance-lite',
        title: 'One-page team AI use agreement',
        body: [
          'Agreement sections typically cover: what “AI-assisted” means here; what must be disclosed to readers or clients; who reviews before ship; which data never enters which tools; how escalations fire; how the library stays tested.',
          '',
          'Solo learners draft against a hypothetical four-person team so the discipline stays concrete.',
        ].join('\n\n'),
      },
      {
        id: 'ae-m14-lesson-roles',
        type: 'key_points',
        eyebrow: 'Five questions',
        title: 'Who used AI, who reviewed, what was shared, what standard, who is accountable?',
        bullets: [
          'Disclosure without review theatre—name the reader-facing line, not only internal chat.',
          'Review ownership on AI-assisted deliverables before external send.',
          'Data boundaries aligned to Module 10 tiers—especially client and HR paths.',
          'Escalation when policy is unclear—default is pause, not paste.',
        ],
      },
      {
        id: 'ae-m14-lesson-worked',
        type: 'worked_example',
        eyebrow: 'Scenario',
        title: 'Hidden AI use on a client deliverable',
        body: [
          'Friday night: drafts merged without review owner; client-facing doc contains confident but unverified figures. Fix: stop send, assign reviewer, rebuild provenance table, disclose assistance per team template, log incident for norm update.',
          '',
          'The lesson is not “never use AI” but “never ship team work without shared rails.”',
        ].join('\n\n'),
        example:
          'Responsibility map: step → owner → AI allowed? → verification artefact → escalation trigger.',
      },
      {
        id: 'ae-m14-lesson-portfolio',
        type: 'concept_explanation',
        eyebrow: 'Portfolio thread',
        title: 'Module14_Team_AI_Use_Agreement_[YourName]',
        body: 'Combine team agreement, responsibility map, and shared prompt artifact per manuscript—filename Module14_Team_AI_Use_Agreement_[YourName].pdf or .docx. Feeds Module 15 prompt library rules and Module 16 packaging.',
      },
      {
        id: 'ae-m14-lesson-next',
        type: 'next_step',
        eyebrow: 'Next up',
        title: 'Practice: agreement, map, shared prompt',
        body: 'Practice drafts the artefacts for a real or hypothetical team. Module 15 turns the strongest prompts and playbooks into reusable systems.',
      },
    ],
  ],
  [
    `${C}ae-m15-lesson`,
    [
      {
        id: 'ae-m15-lesson-intro',
        type: 'intro',
        eyebrow: 'Systems, not chats',
        title: 'Building Reusable AI Systems — Prompt Packs and Playbooks',
        body: [
          'Good AI use should get easier over time because you wrote down what works—not because the tool magically improved. Prompt packs capture purpose, audience, inputs, boundaries, review criteria, ownership, and version notes. Playbooks add when to use, steps, prompts at each step, checkpoints, safety boundaries, expected outputs, and failure signs.',
          '',
          'This lesson connects packs to Module 12 SOP discipline and Module 14 team standards so reuse stays safe when you—or someone else—runs them next month.',
        ].join('\n\n'),
      },
      {
        id: 'ae-m15-lesson-pack',
        type: 'concept_explanation',
        eyebrow: 'Pack anatomy',
        title: 'What belongs in a pack entry',
        body: [
          'Each entry should answer: what job, for whom, with what inputs, never-do rules, how to review output, who owns updates, when not to use, and what changed last version.',
          '',
          'Peer walkthrough test: could a colleague cold-run one workflow from your pack without DMing you?',
        ].join('\n\n'),
      },
      {
        id: 'ae-m15-lesson-playbook',
        type: 'concept_explanation',
        eyebrow: 'Playbook',
        title: 'SOP with prompts inside it',
        body: [
          'Playbooks chain steps with human gates where stakes spike. They inherit privacy tiers from Module 10 and decision ownership from Module 13—assets support people who decide; they do not decide.',
        ].join('\n\n'),
      },
      {
        id: 'ae-m15-lesson-quality',
        type: 'key_points',
        eyebrow: 'Quality tests',
        title: 'Four tests before a pack graduates',
        bullets: [
          'Fresh scenario: does the pack survive a new example without hand-waving?',
          'Failure signs: are red flags named with owner responses?',
          'Version notes: can you diff what changed and why?',
          'When-not-to-use: is it explicit enough that a rushed teammate would pause?',
        ],
      },
      {
        id: 'ae-m15-lesson-portfolio',
        type: 'concept_explanation',
        eyebrow: 'Portfolio thread',
        title: 'Module15_Prompt_Pack_Playbook_[YourName]',
        body: 'Save Module15_Prompt_Pack_Playbook_[YourName].pdf or .docx with pack, playbook slice, and test log from a fresh scenario. This is required input to Module 16—you should demonstrate with the toolkit, not rebuild it inside the capstone window.',
      },
      {
        id: 'ae-m15-lesson-next',
        type: 'next_step',
        eyebrow: 'Next up',
        title: 'Practice: assemble, walkthrough, tests',
        body: 'Practice assembles the pack, runs walkthrough and quality tests. Module 16 runs one end-to-end workflow using this toolkit with full verification and packaging.',
      },
    ],
  ],
  [
    `${C}ae-m16-lesson`,
    [
      {
        id: 'ae-m16-lesson-intro',
        type: 'intro',
        eyebrow: 'Integration is the hard part',
        title: 'Capstone — End-to-End AI-Supported Workflow',
        body: [
          'This module teaches no new isolated skill. It tests whether the parts hold together on one bounded, realistic task: plan; prompt; verify; revise; protect information inside the workflow; reflect on judgment.',
          '',
          'A strong capstone is small enough to finish and serious enough to mean something—reviewer-visible prompts, outputs, revisions, privacy choices, and disclosure. A weak capstone is a vague outline or polished prose with thin verification.',
          '',
          'Use the Module 15 pack and playbook, Module 12 workflow map, Module 10 classification habit, Module 6 verification habit, and Module 9 accountability stance (adapted into disclosure) as required inputs—not optional extras.',
        ].join('\n\n'),
      },
      {
        id: 'ae-m16-lesson-path',
        type: 'concept_explanation',
        eyebrow: 'Sequence',
        title: 'Plan → verify scope → design workflow → run prompts → review → revise → reflect → package',
        body: [
          'Dependencies are explicit so you cannot skip forward and discover a missing piece days later. The self-critique fallback (pause, named reader, claim trace, privacy review, usefulness, prompt review, revision log, confidence note) substitutes for a missing peer reviewer—run it honestly.',
          '',
          'Certificate readiness (in-product) expects checkpoints, required artefacts, capstone completion, disclosure, self-critique, and no high-risk privacy shortcuts—align your bundle before marking capstone prep complete.',
        ].join('\n\n'),
      },
      {
        id: 'ae-m16-lesson-rubric',
        type: 'concept_explanation',
        eyebrow: 'Rubric',
        title: 'Seven criteria: Not ready → Developing → Ready → Strong',
        body: [
          'The manuscript names seven criteria with level descriptions in learner language. Self-score each criterion honestly in the app before claiming 100% course progress; Ready or Strong on every row is part of the AI Essentials milestone model.',
          '',
          'If you upload a bundle but skip rubric self-grade, you have not finished the capstone story—only filed files.',
        ].join('\n\n'),
      },
      {
        id: 'ae-m16-lesson-bundle',
        type: 'worked_example',
        eyebrow: 'Packaging',
        title: 'Bundle components and filenames',
        body: [
          'Organise: workflow map; extended pack/playbook from Module 15; AI-assisted outputs; verification notes; privacy boundaries; revision trail; final output; self-critique; one-page reflection; disclosure.',
          '',
          'Primary deliverable filename: Module16_AI_Workflow_Capstone_[YourName].pdf or .docx—plus consistent names for referenced artefacts as in earlier modules.',
        ].join('\n\n'),
        example:
          'After assembly, run a 10-minute hostile Q&A with a friend or your own timed list of skeptical questions; update the weakest section first.',
      },
      {
        id: 'ae-m16-lesson-pause',
        type: 'concept_explanation',
        eyebrow: 'Pause and check',
        title: 'Would you show this to a reviewer who matters?',
        body: 'If the answer is “only with me talking over it,” keep revising or name the gap honestly in the cover note with a dated plan to close it.',
      },
      {
        id: 'ae-m16-lesson-next',
        type: 'next_step',
        eyebrow: 'Next up',
        title: 'Practice: execute workflow, self-critique, package; then capstone prep',
        body: 'Practice executes the workflow, runs self-critique, and packages the bundle. Mark capstone prep when your deliverables match the brief and rubric rows are Ready+ in the tracker.',
      },
    ],
  ],
]
