/**
 * Learner-facing copy and labels for the AI Essentials course overview (no curriculum edits).
 */

import type { FlagshipDepthStage } from '../data/learning/flagshipCurriculumTypes'

/** Stage headers on the course page (four bands; maps underlying curriculum stages). */
export const AI_ESSENTIALS_STAGE_SECTION_LABEL: Record<FlagshipDepthStage, string> = {
  foundations: 'Foundations',
  applied_practice: 'Prompting and Verification',
  professional_execution: 'Applied Responsible Use',
  mastery_outputs: 'Workflows, Teams, and Capstone',
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

/** Milestone context — prefer plain language; avoid raw quiz/checkpoint counts here. */

export type AiEssentialsPathwayBlurb = { slug: string; title: string; line: string }

export const AI_ESSENTIALS_PATHWAY_BLURBS: readonly AiEssentialsPathwayBlurb[] = [
  {
    slug: 'ai-productivity-professional',
    title: 'AI Productivity Professional',
    line: 'AI Essentials is a core included course—prompting, verification, and workflow habits stack into Smart Workflows with AI.',
  },
  {
    slug: 'digital-work-starter',
    title: 'Digital Work Starter',
    line: 'Build async and safety habits first; many learners continue here for disciplined judgment before heavier AI-assisted work.',
  },
  {
    slug: 'remote-work-freelancing',
    title: 'Remote Work and Freelancing',
    line: 'Verification, disclosure, and client-ready communication from Course 1 pair well with scope and delivery tracks.',
  },
  {
    slug: 'small-business-entrepreneurship',
    title: 'Small Business and Entrepreneurship',
    line: 'Clear prompts and evidence habits support offer clarity, experiments, and ops narratives without over-claiming.',
  },
  {
    slug: 'junior-tech-builder',
    title: 'Junior Tech Builder',
    line: 'Responsible tool use and data-boundary thinking complement foundations and digital safety in builder paths.',
  },
] as const

/** Representative portfolio artifacts (subset of 16); titles are learner-facing short names. */
export const AI_ESSENTIALS_PORTFOLIO_SHOWCASE = [
  { id: 'p1', title: 'My AI Use Boundary', detail: 'Module 1 — scope and limits you reuse in Module 9 and the capstone.' },
  { id: 'p2', title: 'Responsible Judgment Checklist', detail: 'Module 2 — myth correction and risk sense before you ship AI-assisted work.' },
  { id: 'p3', title: 'Prompt Rewrite + Prompt Contract', detail: 'Modules 3–4 — before/after prompts with a reusable contract.' },
  { id: 'p4', title: 'Claim Verification Table', detail: 'Module 6 — strength labels and gaps, not false precision.' },
  { id: 'p5', title: 'Audience-Fit Communication Pack', detail: 'Module 7 — same facts, different doors for real readers.' },
  { id: 'p6', title: 'Privacy and Safety Checklist', detail: 'Module 10 — tiers, redaction, and pause-or-escalate habits.' },
  { id: 'p7', title: 'Final AI Workflow Capstone', detail: 'Module 16 — end-to-end proof with disclosure, self-critique, and rubric self-check.' },
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
    title: 'Certificate Readiness',
    file: 'Course1_Certificate_Readiness.md',
    blurb: 'What the in-product readiness bar checks—and what it does not claim.',
  },
  {
    id: 'cap-prep',
    title: 'Capstone Prep',
    file: 'Course1_Capstone_Prep.md',
    blurb: 'Scope, dependencies, and rubric rehearsal before Module 16 execution.',
  },
] as const
