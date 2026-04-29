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
      body: 'You design a five-step study loop with explicit forbidden moves, then pressure-test it against tired-you behavior.',
    },
    {
      id: 'ae-m08-practice-gap-task',
      type: 'practice_task',
      title: 'Practice · Study protocol + integrity boundaries',
      bullets: [
        '1. Write allowed vs forbidden moves for one graded or certified context you touch.',
        '2. Draft prompts for retrieval practice vs explanation vs verification, with stop rules.',
      ],
      prompt: 'If a step could substitute model judgment for yours, rewrite it until ownership is visible.',
    },
    {
      id: 'ae-m08-practice-gap-output',
      type: 'output_prompt',
      title: 'Artifact to produce',
      prompt: 'Produce the Module08 repair plan skeleton: protocol, forbidden moves, escalation if tempted.',
      outputExpectation: 'AI learning repair plan draft',
    },
    {
      id: 'ae-m08-practice-gap-next',
      type: 'next_step',
      body: 'Next: ae-m09 operationalizes disclosure, escalation, and proportionate review.',
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
      title: 'Privacy tiers in real prompts',
      body: 'You classify inputs, redact or abstract, and document pause-or-escalate triggers before any high-stakes paste.',
    },
    {
      id: 'ae-m10-practice-gap-task',
      type: 'practice_task',
      title: 'Practice · Sensitivity sort to operational checklist',
      bullets: [
        '1. Sort 10 realistic items into safe, caution, restricted, never-enter (notes required).',
        '2. Rewrite two risky prompts into minimum-necessary equivalents.',
      ],
      prompt: 'Stop when a security lead could follow your labels without a meeting.',
    },
    {
      id: 'ae-m10-practice-gap-output',
      type: 'output_prompt',
      title: 'Artifact to produce',
      prompt: 'Draft Module10 privacy and safety checklist rows tied to your actual workflows.',
      outputExpectation: 'Privacy checklist draft',
    },
    {
      id: 'ae-m10-practice-gap-next',
      type: 'next_step',
      body: 'Next: ae-m11 builds research synthesis with provenance and honest unknowns.',
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
      body: 'You draw triggers, owners, gates, and fallbacks before attaching AI so outages do not become heroics.',
    },
    {
      id: 'ae-m12-practice-gap-task',
      type: 'practice_task',
      title: 'Practice · Diagram + tabletop',
      bullets: [
        '1. Workflow diagram with decision diamonds and named owners.',
        '2. Tabletop one fatigue scenario; patch one gate and one fallback.',
      ],
      prompt: 'Stop when a peer could execute the fallback without you on call.',
    },
    {
      id: 'ae-m12-practice-gap-output',
      type: 'output_prompt',
      title: 'Artifact to produce',
      prompt: 'Draft Module12 workflow and agent readiness notes tied to the diagram.',
      outputExpectation: 'Workflow readiness draft',
    },
    {
      id: 'ae-m12-practice-gap-next',
      type: 'next_step',
      body: 'Next: ae-m13 writes accountable decision memos with falsifiers.',
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
      title: 'Decision memo under uncertainty',
      body: 'You separate known vs inferred, log falsifiers, and recommend next information buys without invented precision.',
    },
    {
      id: 'ae-m13-practice-gap-task',
      type: 'practice_task',
      title: 'Practice · Pre-mortem + memo spine',
      bullets: [
        '1. Write assumptions with owners and flip conditions.',
        '2. Draft a recommendation paragraph that survives a hostile read.',
      ],
      prompt: 'If you cannot name what would change your mind, you are not done.',
    },
    {
      id: 'ae-m13-practice-gap-output',
      type: 'output_prompt',
      title: 'Artifact to produce',
      prompt: 'Draft Module13 decision memo skeleton with explicit unknowns.',
      outputExpectation: 'Decision memo draft',
    },
    {
      id: 'ae-m13-practice-gap-next',
      type: 'next_step',
      body: 'Next: ae-m14 aligns teams on disclosure, review ownership, and data boundaries.',
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
      body: 'You execute the bounded workflow with logged prompts, verification, revisions, and privacy discipline aligned to your pathway.',
    },
    {
      id: 'ae-m16-practice-gap-task',
      type: 'practice_task',
      title: 'Practice · Capstone dry run',
      bullets: [
        '1. Trace each deliverable to files you already produced or explicit gaps.',
        '2. Self-critique: name the weakest evidence section honestly.',
      ],
      prompt: 'If disclosure is missing anywhere it should appear, add it now.',
    },
    {
      id: 'ae-m16-practice-gap-output',
      type: 'output_prompt',
      title: 'Artifact to produce',
      prompt: 'Assemble the Module16 capstone bundle skeleton with filenames and disclosure page.',
      outputExpectation: 'Capstone bundle skeleton',
    },
    {
      id: 'ae-m16-practice-gap-next',
      type: 'next_step',
      body: 'Then complete capstone prep and the rubric self-check in the session UI.',
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
