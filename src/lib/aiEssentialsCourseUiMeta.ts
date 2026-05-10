/**
 * Learner-facing copy, module-card structure, and AI Essentials–specific session labels.
 * Curriculum modules remain in `aiEssentialsCourse1Modules.ts`; this file adds UI-only structure.
 */

import type { FlagshipDepthStage } from '../data/learning/flagshipCurriculumTypes'

/** Stage headers on the course page (four bands; maps underlying curriculum stages). */
export const AI_ESSENTIALS_STAGE_SECTION_LABEL: Record<FlagshipDepthStage, string> = {
  foundations: 'Foundations',
  applied_practice: 'Prompting and Verification',
  professional_execution: 'Applied Responsible Use',
  mastery_outputs: 'Systems, Workflows, and Capstone',
}

/** Rough study time per module — rounded for calm scanning (full course ~32–45h). */
export const AI_ESSENTIALS_MODULE_TIME_HINT: Record<string, string> = {
  'ae-m01': 'About 2–3 hours',
  'ae-m02': 'About 2–3 hours',
  'ae-m03': 'About 2.5–3 hours',
  'ae-m04': 'About 2.5–3 hours',
  'ae-m05': 'About 2.5–3 hours',
  'ae-m06': 'About 2.5–3.5 hours',
  'ae-m07': 'About 2–3 hours',
  'ae-m08': 'About 2–3 hours',
  'ae-m09': 'About 2.5–3 hours',
  'ae-m10': 'About 2.5–3 hours',
  'ae-m11': 'About 2.5–3 hours',
  'ae-m12': 'About 2.5–3.5 hours',
  'ae-m13': 'About 2.5–3 hours',
  'ae-m14': 'About 2.5–3 hours',
  'ae-m15': 'About 2.5–3.5 hours',
  'ae-m16': 'About 3–4 hours',
}

/** Primary “portfolio output” label on module cards — no filenames. */
export const AI_ESSENTIALS_MODULE_PORTFOLIO_LABEL: Record<string, string> = {
  'ae-m01': 'AI use boundary guide',
  'ae-m02': 'Responsible judgment checklist',
  'ae-m03': 'Prompt rewrite pack',
  'ae-m04': 'Structured prompt template',
  'ae-m05': 'Prompt review log',
  'ae-m06': 'Verification table',
  'ae-m07': 'Audience-fit communication pack',
  'ae-m08': 'Learning repair plan',
  'ae-m09': 'Responsible AI guardrails',
  'ae-m10': 'Privacy and safety checklist',
  'ae-m11': 'Research synthesis brief',
  'ae-m12': 'Workflow readiness memo',
  'ae-m13': 'Decision memo',
  'ae-m14': 'Team AI use agreement',
  'ae-m15': 'Prompt pack playbook',
  'ae-m16': 'Capstone workflow bundle',
}

/** Accordion “full module details”: purpose, action, practice—keeps summary in the header only. */
export const AI_ESSENTIALS_MODULE_LEARNER_CARD: Record<
  string,
  { purpose: string; whatYouWillDo: string; practiceFocus: string }
> = {
  'ae-m01': {
    purpose: 'You need a grounded mental model before speed—models predict and generate; they do not guarantee truth, memory, or accountability.',
    whatYouWillDo:
      'Sort misconceptions, map five task types to your work, and write a one-page boundary that names where you will verify before you act.',
    practiceFocus: 'Stake lens, failure modes, and a reviewable “will / will not” table tied to real tasks.',
  },
  'ae-m02': {
    purpose: 'Fluent text can hide missing evidence, bias, and false confidence—this module builds proportionate review habits.',
    whatYouWillDo:
      'Run myth checks with sources, spot bias patterns in outputs, and document accountability before you publish or send.',
    practiceFocus: 'T–R–E–J (Task, Risk, Evidence, Judgment) and a risk ladder you can reuse under time pressure.',
  },
  'ae-m03': {
    purpose: 'The prompt is your primary control surface—vague asks produce vague outputs.',
    whatYouWillDo:
      'Diagnose weak prompts, run before/after rewrites on supplied cases, and save a reusable prompt contract for one workflow.',
    practiceFocus: 'T–C–C–F–A (Task, Context, Constraints, Format, Audience) with predictable output shifts.',
  },
  'ae-m04': {
    purpose: 'Treat prompts like specs so reviewers can see what you asked for and what you refused to invent.',
    whatYouWillDo:
      'Add role, goal, evidence policy, output shape, and refusal lanes; critique under-spec prompts and compare outputs to a rubric.',
    practiceFocus: 'Cite vs infer vs refuse, negatives, format discipline, and changelog-style prompt versions.',
  },
  'ae-m05': {
    purpose: 'Iteration without a record looks like taste; iteration with criteria looks like quality control.',
    whatYouWillDo:
      'Run paired prompt tests, log regressions, and keep short version notes another reader could follow.',
    practiceFocus: 'A/B comparisons, failure signatures, and an operational prompt QA checklist.',
  },
  'ae-m06': {
    purpose: 'High-stakes synthesis fails quietly when claims, sources, and unknowns blur together.',
    whatYouWillDo:
      'Build verification lanes by stakes, separate claims from evidence, and ship briefs that log gaps and next information buys.',
    practiceFocus: 'Evidence strength labels, conflict rows, and lane matrices you can reuse in research and capstone work.',
  },
  'ae-m07': {
    purpose: 'Writing with AI fails when facts, tone, authorization, and audience needs get tangled.',
    whatYouWillDo:
      'Prompt for extraction with anti-invention rules, then edit drafts with marginal verification notes a reviewer can see.',
    practiceFocus: 'Claim-to-paragraph ties, omission checks, and audience-specific packaging without smuggling new facts.',
  },
  'ae-m08': {
    purpose: 'Study support should deepen understanding—not replace it or shortcut integrity rules.',
    whatYouWillDo:
      'Design retrieval-first study loops, explicit allowed vs forbidden moves, and integrity boundaries for graded or certified contexts.',
    practiceFocus: 'Socratic scaffolding, self-checks, and honest “who owns the judgment” notes.',
  },
  'ae-m09': {
    purpose: 'Principles only help when they become routing rules: who reviews, what gets disclosed, and when to stop.',
    whatYouWillDo:
      'Map RACI for model-supported steps, draft disclosure templates, and define forbidden automation zones for your role.',
    practiceFocus: 'Escalation paths, labeling, and plugging model steps into tickets or reviews you already run.',
  },
  'ae-m10': {
    purpose: 'Operational safety is mostly classification and habit—what never enters a tool, what must be redacted, and when to escalate.',
    whatYouWillDo:
      'Tier inputs, rewrite risky prompts with minimum necessary detail, and produce a Safe-Use Decision Card you can reuse.',
    practiceFocus: 'Redaction vs abstraction, pause rules, and a redacted example prompt you would not send raw.',
  },
  'ae-m11': {
    purpose: 'Research with AI breaks when provenance disappears or disagreement gets flattened into a confident paragraph.',
    whatYouWillDo:
      'Frame questions, preserve conflict, time-box depth, and ship a brief with an explicit unknowns section.',
    practiceFocus: 'Extract/compare/brief prompt patterns plus “where this breaks” notes.',
  },
  'ae-m12': {
    purpose: 'Workflows fail when triggers, owners, and human gates are implicit—especially before any “agent” step.',
    whatYouWillDo:
      'Map stages with decision diamonds, name fallbacks for outages, and write an agent-readiness view for one real workflow.',
    practiceFocus: 'Triggers from stakes × reversibility × blast radius, and conditions before automation.',
  },
  'ae-m13': {
    purpose: 'Decision support should widen thinking—not outsource authorship, evidence standards, or accountability.',
    whatYouWillDo:
      'Write a memo with assumptions, tradeoffs, falsifiers, and next information buys; run a pre-mortem without laundering judgment to the model.',
    practiceFocus: 'Hypotheses vs decisions, incentives, and what would flip your recommendation.',
  },
  'ae-m14': {
    purpose: 'Shared AI use is coordination: uneven disclosure and unclear review ownership create team risk.',
    whatYouWillDo:
      'Draft a one-page team agreement, a responsibility map, and a shared prompt artifact with review-owner slots.',
    practiceFocus: 'Data boundaries, escalation, and templates another teammate could run responsibly.',
  },
  'ae-m15': {
    purpose: 'Reusable systems beat heroic prompting—packs should carry purpose, boundaries, review criteria, and versions.',
    whatYouWillDo:
      'Assemble a mini prompt pack, a playbook slice with human gates, and a test log from a fresh scenario.',
    practiceFocus: 'Ownership, deprecation notes, and quality tests against an unfamiliar case.',
  },
  'ae-m16': {
    purpose: 'The capstone proves you can run one bounded workflow end-to-end with verification, privacy discipline, and honest self-review.',
    whatYouWillDo:
      'Scope a real task, execute prompts with a visible review trail, align filenames to the brief, and self-score the rubric with named gaps.',
    practiceFocus: 'Integration of prior artifacts, disclosure, self-critique, and reviewer-ready packaging.',
  },
}

export type AiEssentialsSessionKind = 'lesson' | 'practice' | 'revision' | 'recap'

type SessionPatch = { title?: string; summary?: string }

/** Session titles (and optional summaries) replace generic “Practice lab · {module title}” patterns for Course 1. */
const AI_ESSENTIALS_SESSION_PATCH: Record<string, Partial<Record<AiEssentialsSessionKind, SessionPatch>>> = {
  'ae-m01': {
    lesson: {
      title: 'Map what AI does—and what it cannot replace',
      summary:
        'Prediction, generation, retrieval, transformation, and reasoning support—plus where human judgment must stay in the loop.',
    },
    practice: { title: 'Draft your AI use boundary', summary: 'Turn the mental model into a one-page guide you will reuse in guardrails and the capstone.' },
    revision: { title: 'Stress-test limits before you rely on output', summary: 'Compress misconceptions and name the checks you will run when stakes rise.' },
  },
  'ae-m02': {
    lesson: { title: 'Myths, bias, and accountable judgment', summary: 'Separate viral claims from evidence; name bias paths and where humans stay accountable.' },
    practice: { title: 'Build your responsible judgment checklist', summary: 'Risk ladder, myth-bust with sources, and a checklist you can scan before you send.' },
    recap: { title: 'Consolidate habits for the prompting modules', summary: 'Carry T–R–E–J forward as prompts get more structured and stakes climb.' },
  },
  'ae-m03': {
    lesson: { title: 'Prompts as the control surface', summary: 'Why vague asks fail—and how Task, Context, Constraints, Format, and Audience change outcomes.' },
    practice: { title: 'Rewrite weak prompts with intent', summary: 'Before/after pairs, contracts, and predictable shifts when you tighten one control at a time.' },
    revision: { title: 'Lock in prompt contracts you will reuse', summary: 'Sanity-check defaults, failure modes, and handoff notes for Module 4 specs.' },
  },
  'ae-m04': {
    lesson: { title: 'Prompts as specs: structure and refusal lanes', summary: 'Role, goal, evidence policy, output shape, and what the model must refuse to invent.' },
    practice: { title: 'Critique, rewrite, and rubric-check outputs', summary: 'Under-spec diagnosis, labeled rewrites, and comparisons tied to rubric rows—not likability.' },
  },
  'ae-m05': {
    lesson: { title: 'Disciplined iteration and pairwise comparison', summary: 'Hypothesis-driven changes, regression awareness, and inspectable version notes.' },
    practice: { title: 'Run A/B prompt tests with clear criteria', summary: 'Variants, failure signatures, and a short QA checklist for busy days.' },
    revision: { title: 'Catch regressions before they ship', summary: 'Red-team a “winning” output; log what broke and what you will watch next time.' },
  },
  'ae-m06': {
    lesson: { title: 'Build verification lanes by stakes', summary: 'Separate claims from sources, keep conflicts visible, and avoid false certainty.' },
    practice: { title: 'Separate claims from evidence', summary: 'Evidence tables, strength labels, and briefs that log unknowns honestly.' },
    revision: { title: 'Find gaps, conflicts, and overclaims', summary: 'Executive synthesis with next information buys—no invented citations.' },
  },
  'ae-m07': {
    lesson: { title: 'Structure, facts, tone, and authorization', summary: 'Keep extraction, transformation, and audience packaging from smuggling new claims.' },
    practice: { title: 'Edit drafts with visible verification notes', summary: 'Tag claims, run anti-invention prompts, and mark verify / cut / escalate in the margin.' },
  },
  'ae-m08': {
    lesson: { title: 'Study loops that build understanding', summary: 'Retrieval, explanation, and integrity-forward boundaries for graded or certified contexts.' },
    practice: { title: 'Design allowed moves—and forbidden shortcuts', summary: 'Protocols, self-checks, and prompts that scaffold without replacing your judgment.' },
    revision: { title: 'Repair drift without cheating the task', summary: 'Compare substitution prompts vs tutoring prompts; log failure modes you will avoid.' },
  },
  'ae-m09': {
    lesson: { title: 'Guardrails that survive real tickets', summary: 'Disclosure, escalation, forbidden automation zones, and visible review owners.' },
    practice: { title: 'Map ownership, disclosure, and escalation', summary: 'RACI maps, email templates, and sector-aware norms you can operationalize this week.' },
  },
  'ae-m10': {
    lesson: { title: 'Classify information before you use AI', summary: 'Minimum necessary, four tiers, and when to pause or escalate instead of pasting.' },
    practice: { title: 'Redact, abstract, or escalate', summary: 'Rewrite risky prompts, run boundary checks, and keep useful detail without raw identifiers.' },
    revision: { title: 'Build a safe-use decision card', summary: 'A compact card for “paste / redact / stop” plus a redacted example you would ship.' },
  },
  'ae-m11': {
    lesson: { title: 'Research framing with provenance', summary: 'Questions that preserve disagreement, time-boxed depth, and honest unknowns.' },
    practice: { title: 'Synthesize without flattening conflict', summary: 'Extract/compare/brief patterns and explicit limits of the synthesis.' },
  },
  'ae-m12': {
    lesson: { title: 'Map workflows before you automate', summary: 'Stages, triggers, owners, human gates, and realistic fallbacks when tools fail.' },
    practice: { title: 'Tabletop the failure modes', summary: 'Diagrams, fatigue scenarios, and agent-readiness conditions for one workflow.' },
    revision: { title: 'Patch the weakest human step', summary: 'Name what breaks first under pressure; tighten prompts, gates, or owners.' },
  },
  'ae-m13': {
    lesson: { title: 'Decision support without outsourcing judgment', summary: 'Assumptions, tradeoffs, falsifiers, and separating hypotheses from the decision record.' },
    practice: { title: 'Write a reviewer-challengeable memo', summary: 'Two pages with risks, next information buys, and a pre-mortem appendix.' },
  },
  'ae-m14': {
    lesson: { title: 'Team coordination for shared AI use', summary: 'Disclosure, libraries, data boundaries, and governance-lite peers can follow.' },
    practice: { title: 'Draft agreements and shared prompts', summary: 'One-pager, responsibility map, and artifacts with review-owner slots.' },
  },
  'ae-m15': {
    lesson: { title: 'Prompt packs and playbooks that scale', summary: 'Purpose, inputs, boundaries, review criteria, ownership, and version notes in one place.' },
    practice: { title: 'Test the pack on a fresh scenario', summary: 'Assemble entries, add gates, and log gaps after a realistic dry run.' },
    revision: { title: 'Harden reuse before the capstone', summary: 'Link playbooks to workflow discipline; capture failure signs and escalation.' },
  },
  'ae-m16': {
    lesson: { title: 'Choose and scope your capstone workflow', summary: 'Bounded task, dependencies on prior artifacts, and acceptance criteria you can defend.' },
    practice: { title: 'Build the prompt and review chain', summary: 'Execute with logged outputs, verification passes, and revision notes tied to claims.' },
    revision: { title: 'Verify, revise, and document decisions', summary: 'Privacy checks, disclosure, self-critique, and rubric alignment before packaging.' },
    recap: { title: 'Package your final portfolio bundle', summary: 'Filenames, cover context, reflection, and honest rubric self-score with gaps named.' },
  },
}

export function getAiEssentialsSessionPatch(moduleId: string, kind: AiEssentialsSessionKind): SessionPatch | undefined {
  return AI_ESSENTIALS_SESSION_PATCH[moduleId]?.[kind]
}

/** Milestone context — prefer plain language; avoid raw quiz/checkpoint counts here. */

export type AiEssentialsPathwayBlurb = { slug: string; title: string; line: string }

export const AI_ESSENTIALS_PATHWAY_BLURBS: readonly AiEssentialsPathwayBlurb[] = [
  {
    slug: 'ai-productivity-professional',
    title: 'AI Productivity Professional',
    line: 'Course 1 is included on this path: prompting discipline, verification habits, and workflow hygiene stack directly into Smart Workflows with AI.',
  },
  {
    slug: 'digital-work-starter',
    title: 'Digital Work Starter',
    line: 'Start with async habits and proportionate review; many learners use Course 1 to steady judgment before layering heavier tooling.',
  },
  {
    slug: 'remote-work-freelancing',
    title: 'Remote Work and Freelancing',
    line: 'Verification, disclosure, and client-ready communication from Course 1 pair cleanly with scope, delivery, and trust-building tracks.',
  },
  {
    slug: 'small-business-entrepreneurship',
    title: 'Small Business and Entrepreneurship',
    line: 'Clear prompts and evidence lanes help you test offers and ops stories without overstating what the data actually supports.',
  },
  {
    slug: 'junior-tech-builder',
    title: 'Junior Tech Builder',
    line: 'Tool use with explicit data boundaries and review owners complements core technical foundations and digital safety.',
  },
] as const

/** Representative portfolio artifacts (subset of 16); titles are learner-facing short names. */
export const AI_ESSENTIALS_PORTFOLIO_SHOWCASE = [
  { id: 'p1', title: 'My AI Use Boundary', detail: 'Module 1 — where models help, where they stop, and what you verify yourself; reused in guardrails and the capstone.' },
  { id: 'p2', title: 'Responsible Judgment Checklist', detail: 'Module 2 — myth correction, bias sense, and proportionate review before anything external ships.' },
  { id: 'p3', title: 'Prompt Rewrite + Prompt Contract', detail: 'Modules 3–4 — before/after prompts plus a contract another reader could run.' },
  { id: 'p4', title: 'Claim Verification Table', detail: 'Module 6 — claim strength, sources, conflicts, and explicit unknowns.' },
  { id: 'p5', title: 'Audience-Fit Communication Pack', detail: 'Module 7 — same underlying facts, different tone, structure, and disclosure for each reader.' },
  { id: 'p6', title: 'Privacy and Safety Checklist', detail: 'Module 10 — tiers, redaction, abstraction, and when to pause or escalate instead of pasting.' },
  { id: 'p7', title: 'Final Workflow Capstone', detail: 'Module 16 — one integrated bundle with prompts, verification trail, disclosure, and honest rubric self-check.' },
] as const

export const AI_ESSENTIALS_MANUSCRIPT_GUIDES = [
  {
    id: 'self-learner',
    title: 'Self-Learner Guide',
    file: 'Course1_Self_Learner_Guide.md',
    blurb: 'Pacing, solo practice, when you are stuck, and honest self-check habits.',
  },
  {
    id: 'tool-stance',
    title: 'Tool Stance',
    file: 'Course1_Tool_Stance.md',
    blurb: 'Tool categories, setup, free vs paid tradeoffs, and privacy-minded defaults.',
  },
  {
    id: 'portfolio',
    title: 'Portfolio Guide',
    file: 'Course1_Portfolio_Guide.md',
    blurb: 'How the sixteen artifacts roll up, filenames, and how to present evidence.',
  },
  {
    id: 'disclosure',
    title: 'Disclosure Note',
    file: 'Course1_Disclosure_Note.md',
    blurb: 'Responsible disclosure pattern for AI-assisted artifacts.',
  },
  {
    id: 'cert-ready',
    title: 'In-app readiness bar',
    file: 'Course1_Certificate_Readiness.md',
    blurb: 'What the product checks for completion—and what it does not claim about external credentials.',
  },
  {
    id: 'cap-prep',
    title: 'Capstone Prep',
    file: 'Course1_Capstone_Prep.md',
    blurb: 'Scope, dependencies, and rubric rehearsal before Module 16 execution.',
  },
] as const
