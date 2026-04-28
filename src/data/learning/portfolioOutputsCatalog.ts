/**
 * Portfolio output definitions — display and future submission scaffolding only.
 * No upload pipeline in this pass.
 */

export type PortfolioEvidenceType = 'written_sample' | 'checklist' | 'memo' | 'brief' | 'table' | 'plan' | 'reflection' | 'other'

export type PortfolioCompletionSource = 'manual' | 'lesson_task' | 'capstone' | 'future'

export type PortfolioOutputDefinition = {
  id: string
  title: string
  description: string
  courseSlug?: string
  pathwaySlug: string
  evidenceType: PortfolioEvidenceType
  /** Short placeholder for future lesson wiring — not full instructions. */
  learnerInstructionsPlaceholder: string
  completionSource: PortfolioCompletionSource
  requiredForCertificate: boolean
}

export const PORTFOLIO_OUTPUT_DEFINITIONS: PortfolioOutputDefinition[] = [
  {
    id: 'po-dws-1',
    title: 'Digital safety habits checklist',
    description: 'A shareable checklist covering passwords, phishing, and device hygiene.',
    pathwaySlug: 'digital-work-starter',
    evidenceType: 'checklist',
    learnerInstructionsPlaceholder: '[Future] Complete after Digital Safety sessions that cover credential hygiene.',
    completionSource: 'future',
    requiredForCertificate: false,
  },
  {
    id: 'po-dws-2',
    title: 'Professional status update set',
    description: 'Two async-friendly updates showing scope, blockers, and next steps.',
    courseSlug: 'clear-communication',
    pathwaySlug: 'digital-work-starter',
    evidenceType: 'written_sample',
    learnerInstructionsPlaceholder: '[Future] Map to specific lesson tasks in Clear Communication when authored.',
    completionSource: 'lesson_task',
    requiredForCertificate: false,
  },
  {
    id: 'po-rw-1',
    title: 'Client-style scope and timeline',
    description: 'One-page scope with milestones and explicit out-of-scope notes.',
    courseSlug: 'project-execution',
    pathwaySlug: 'remote-work-freelancing',
    evidenceType: 'memo',
    learnerInstructionsPlaceholder: '[Future] Tie to Project Execution practice outputs.',
    completionSource: 'capstone',
    requiredForCertificate: false,
  },
  {
    id: 'po-ai-1',
    title: 'Prompt improvement pack',
    description: 'Before/after prompts with evaluation criteria for a recurring workflow.',
    courseSlug: 'ai-essentials',
    pathwaySlug: 'ai-productivity-professional',
    evidenceType: 'brief',
    learnerInstructionsPlaceholder: '[Future] Align with AI Essentials portfolio gates.',
    completionSource: 'lesson_task',
    requiredForCertificate: false,
  },
  {
    id: 'po-data-1',
    title: 'Decision memo with assumptions',
    description: 'Short memo stating metrics used, limitations, and next evidence to collect.',
    courseSlug: 'data-and-decisions',
    pathwaySlug: 'data-business-reporting',
    evidenceType: 'memo',
    learnerInstructionsPlaceholder: '[Future] Linked to Data and Decisions knowledge-to-output tasks.',
    completionSource: 'lesson_task',
    requiredForCertificate: false,
  },
  {
    id: 'po-smb-1',
    title: 'Offer hypothesis one-pager',
    description: 'Evidence-based offer sketch with falsifiers—not a pitch deck.',
    courseSlug: 'business-builder',
    pathwaySlug: 'small-business-entrepreneurship',
    evidenceType: 'brief',
    learnerInstructionsPlaceholder: '[Future] Ground in Business Builder exercises.',
    completionSource: 'future',
    requiredForCertificate: false,
  },
  {
    id: 'po-mkt-1',
    title: 'Two-week content calendar',
    description: 'Calendar with measurement intent and ethical disclosure notes where relevant.',
    courseSlug: 'marketing-and-growth',
    pathwaySlug: 'digital-marketing-creator',
    evidenceType: 'table',
    learnerInstructionsPlaceholder: '[Future] Connect to Marketing and Growth practice blocks.',
    completionSource: 'lesson_task',
    requiredForCertificate: false,
  },
  {
    id: 'po-tech-1',
    title: 'Safe defaults for dev tools',
    description: 'Checklist for secrets, branches, and review habits at junior scope.',
    courseSlug: 'web-and-software-foundations',
    pathwaySlug: 'junior-tech-builder',
    evidenceType: 'checklist',
    learnerInstructionsPlaceholder: '[Future] Expand when builder courses publish.',
    completionSource: 'future',
    requiredForCertificate: false,
  },
  {
    id: 'po-lead-1',
    title: 'Session run-of-show',
    description: 'Timed facilitator plan with materials and participant take-home.',
    courseSlug: 'teaching-and-facilitation',
    pathwaySlug: 'leadership-training-facilitation',
    evidenceType: 'plan',
    learnerInstructionsPlaceholder: '[Future] Map to Teaching and Facilitation capstone-style tasks.',
    completionSource: 'capstone',
    requiredForCertificate: false,
  },
]

export function portfolioOutputsForPathway(pathwaySlug: string): PortfolioOutputDefinition[] {
  return PORTFOLIO_OUTPUT_DEFINITIONS.filter((o) => o.pathwaySlug === pathwaySlug)
}

export function partitionPortfolioOutputsForPathway(pathwaySlug: string): {
  required: PortfolioOutputDefinition[]
  optional: PortfolioOutputDefinition[]
} {
  const all = portfolioOutputsForPathway(pathwaySlug)
  return {
    required: all.filter((o) => o.requiredForCertificate),
    optional: all.filter((o) => !o.requiredForCertificate),
  }
}

export type PortfolioOutputUiStatus = 'not_started' | 'linked_to_course' | 'future_submission'

/** Display-only status for portfolio guidance (no submission pipeline). */
export function portfolioOutputDisplayStatus(o: PortfolioOutputDefinition): PortfolioOutputUiStatus {
  if (o.completionSource === 'future') return 'future_submission'
  if (o.courseSlug && (o.completionSource === 'lesson_task' || o.completionSource === 'capstone')) return 'linked_to_course'
  return 'not_started'
}
