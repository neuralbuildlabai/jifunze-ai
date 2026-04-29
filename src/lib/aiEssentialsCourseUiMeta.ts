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

/** Rough study time per module for overview chips (32–45h total spread across 16 modules). */
export const AI_ESSENTIALS_MODULE_TIME_HINT: Record<string, string> = {
  'ae-m01': '~2–2.5h',
  'ae-m02': '~2–2.5h',
  'ae-m03': '~2.5–3h',
  'ae-m04': '~2.5–3h',
  'ae-m05': '~2.5–3h',
  'ae-m06': '~2.5–3.5h',
  'ae-m07': '~2–2.5h',
  'ae-m08': '~2–2.5h',
  'ae-m09': '~2.5–3h',
  'ae-m10': '~2.5–3h',
  'ae-m11': '~2.5–3h',
  'ae-m12': '~2.5–3.5h',
  'ae-m13': '~2.5–3h',
  'ae-m14': '~2.5–3h',
  'ae-m15': '~2.5–3.5h',
  'ae-m16': '~3–4h',
}

/** One line: milestone band + partner modules (learner-facing). */
export const AI_ESSENTIALS_MODULE_MILESTONE_LINE: Record<string, string> = {
  'ae-m01': 'Milestone 1 (10%): complete Module 1 sessions, quiz, and checkpoints.',
  'ae-m02': 'Milestone 2 (20%): complete through Module 2.',
  'ae-m03': 'Milestone 3 (30%): complete Modules 3 and 4.',
  'ae-m04': 'Milestone 3 (30%): complete Modules 3 and 4.',
  'ae-m05': 'Milestone 4 (40%): complete Modules 5 and 6.',
  'ae-m06': 'Milestone 4 (40%): complete Modules 5 and 6.',
  'ae-m07': 'Milestone 5 (50%): complete Modules 7 and 8.',
  'ae-m08': 'Milestone 5 (50%): complete Modules 7 and 8.',
  'ae-m09': 'Milestone 6 (60%): complete Modules 9 and 10.',
  'ae-m10': 'Milestone 6 (60%): complete Modules 9 and 10.',
  'ae-m11': 'Milestone 7 (70%): complete Module 11.',
  'ae-m12': 'Milestone 8 (80%): complete Modules 12 and 13.',
  'ae-m13': 'Milestone 8 (80%): complete Modules 12 and 13.',
  'ae-m14': 'Milestone 9 (90%): complete Modules 14 and 15.',
  'ae-m15': 'Milestone 9 (90%): complete Modules 14 and 15.',
  'ae-m16': 'Milestone 10 (100%): finish Module 16 plus all rubric rows at Ready or Strong.',
}

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
