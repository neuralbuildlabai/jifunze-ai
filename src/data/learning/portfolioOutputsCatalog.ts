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
    id: 'po-ai-m01',
    title: 'Module 1 — AI use boundary',
    description: 'Canonical filename: Module01_AI_Use_Boundary_[YourName].pdf or .docx',
    courseSlug: 'ai-essentials',
    pathwaySlug: 'ai-productivity-professional',
    evidenceType: 'written_sample',
    learnerInstructionsPlaceholder: 'Save as Module01_AI_Use_Boundary_[YourName].pdf or .docx from Module 1 practice.',
    completionSource: 'lesson_task',
    requiredForCertificate: false,
  },
  {
    id: 'po-ai-m02',
    title: 'Module 2 — Responsible judgment checklist',
    description: 'Canonical filename: Module02_Responsible_Judgment_Checklist_[YourName].pdf or .docx',
    courseSlug: 'ai-essentials',
    pathwaySlug: 'ai-productivity-professional',
    evidenceType: 'checklist',
    learnerInstructionsPlaceholder: 'Save as Module02_Responsible_Judgment_Checklist_[YourName].pdf or .docx.',
    completionSource: 'lesson_task',
    requiredForCertificate: false,
  },
  {
    id: 'po-ai-m03',
    title: 'Module 3 — Prompt rewrite',
    description: 'Canonical filename: Module03_Prompt_Rewrite_[YourName].pdf or .docx',
    courseSlug: 'ai-essentials',
    pathwaySlug: 'ai-productivity-professional',
    evidenceType: 'written_sample',
    learnerInstructionsPlaceholder: 'Save as Module03_Prompt_Rewrite_[YourName].pdf or .docx.',
    completionSource: 'lesson_task',
    requiredForCertificate: false,
  },
  {
    id: 'po-ai-m04',
    title: 'Module 4 — Structured prompt template',
    description: 'Canonical filename: Module04_Structured_Prompt_Template_[YourName].pdf or .docx',
    courseSlug: 'ai-essentials',
    pathwaySlug: 'ai-productivity-professional',
    evidenceType: 'plan',
    learnerInstructionsPlaceholder: 'Save as Module04_Structured_Prompt_Template_[YourName].pdf or .docx.',
    completionSource: 'lesson_task',
    requiredForCertificate: false,
  },
  {
    id: 'po-ai-m05',
    title: 'Module 5 — Prompt version log',
    description: 'Canonical filename: Module05_Prompt_Version_Log_[YourName].pdf or .docx',
    courseSlug: 'ai-essentials',
    pathwaySlug: 'ai-productivity-professional',
    evidenceType: 'table',
    learnerInstructionsPlaceholder: 'Save as Module05_Prompt_Version_Log_[YourName].pdf or .docx.',
    completionSource: 'lesson_task',
    requiredForCertificate: false,
  },
  {
    id: 'po-ai-m06',
    title: 'Module 6 — Claim verification table',
    description: 'Canonical filename: Module06_Claim_Verification_Table_[YourName].pdf or .docx',
    courseSlug: 'ai-essentials',
    pathwaySlug: 'ai-productivity-professional',
    evidenceType: 'table',
    learnerInstructionsPlaceholder: 'Save as Module06_Claim_Verification_Table_[YourName].pdf or .docx.',
    completionSource: 'lesson_task',
    requiredForCertificate: false,
  },
  {
    id: 'po-ai-m07',
    title: 'Module 7 — Audience-fit communication',
    description: 'Canonical filename: Module07_Audience_Fit_Communication_[YourName].pdf or .docx',
    courseSlug: 'ai-essentials',
    pathwaySlug: 'ai-productivity-professional',
    evidenceType: 'written_sample',
    learnerInstructionsPlaceholder: 'Save as Module07_Audience_Fit_Communication_[YourName].pdf or .docx.',
    completionSource: 'lesson_task',
    requiredForCertificate: false,
  },
  {
    id: 'po-ai-m08',
    title: 'Module 8 — AI learning repair plan',
    description: 'Canonical filename: Module08_AI_Learning_Repair_Plan_[YourName].pdf or .docx',
    courseSlug: 'ai-essentials',
    pathwaySlug: 'ai-productivity-professional',
    evidenceType: 'plan',
    learnerInstructionsPlaceholder: 'Save as Module08_AI_Learning_Repair_Plan_[YourName].pdf or .docx.',
    completionSource: 'lesson_task',
    requiredForCertificate: false,
  },
  {
    id: 'po-ai-m09',
    title: 'Module 9 — Responsible AI guardrails',
    description: 'Canonical filename: Module09_Responsible_AI_Guardrails_[YourName].pdf or .docx',
    courseSlug: 'ai-essentials',
    pathwaySlug: 'ai-productivity-professional',
    evidenceType: 'checklist',
    learnerInstructionsPlaceholder: 'Save as Module09_Responsible_AI_Guardrails_[YourName].pdf or .docx.',
    completionSource: 'lesson_task',
    requiredForCertificate: false,
  },
  {
    id: 'po-ai-m10',
    title: 'Module 10 — Privacy and safety checklist',
    description: 'Canonical filename: Module10_Privacy_Safety_Checklist_[YourName].pdf or .docx',
    courseSlug: 'ai-essentials',
    pathwaySlug: 'ai-productivity-professional',
    evidenceType: 'checklist',
    learnerInstructionsPlaceholder: 'Save as Module10_Privacy_Safety_Checklist_[YourName].pdf or .docx.',
    completionSource: 'lesson_task',
    requiredForCertificate: false,
  },
  {
    id: 'po-ai-m11',
    title: 'Module 11 — Research synthesis brief',
    description: 'Canonical filename: Module11_Research_Synthesis_Brief_[YourName].pdf or .docx',
    courseSlug: 'ai-essentials',
    pathwaySlug: 'ai-productivity-professional',
    evidenceType: 'brief',
    learnerInstructionsPlaceholder: 'Save as Module11_Research_Synthesis_Brief_[YourName].pdf or .docx.',
    completionSource: 'lesson_task',
    requiredForCertificate: false,
  },
  {
    id: 'po-ai-m12',
    title: 'Module 12 — Workflow agent readiness',
    description: 'Canonical filename: Module12_Workflow_Agent_Readiness_[YourName].pdf or .docx',
    courseSlug: 'ai-essentials',
    pathwaySlug: 'ai-productivity-professional',
    evidenceType: 'memo',
    learnerInstructionsPlaceholder: 'Save as Module12_Workflow_Agent_Readiness_[YourName].pdf or .docx.',
    completionSource: 'lesson_task',
    requiredForCertificate: false,
  },
  {
    id: 'po-ai-m13',
    title: 'Module 13 — Decision memo',
    description: 'Canonical filename: Module13_Decision_Memo_[YourName].pdf or .docx',
    courseSlug: 'ai-essentials',
    pathwaySlug: 'ai-productivity-professional',
    evidenceType: 'memo',
    learnerInstructionsPlaceholder: 'Save as Module13_Decision_Memo_[YourName].pdf or .docx.',
    completionSource: 'lesson_task',
    requiredForCertificate: false,
  },
  {
    id: 'po-ai-m14',
    title: 'Module 14 — Team AI use agreement',
    description: 'Canonical filename: Module14_Team_AI_Use_Agreement_[YourName].pdf or .docx',
    courseSlug: 'ai-essentials',
    pathwaySlug: 'ai-productivity-professional',
    evidenceType: 'written_sample',
    learnerInstructionsPlaceholder: 'Save as Module14_Team_AI_Use_Agreement_[YourName].pdf or .docx.',
    completionSource: 'lesson_task',
    requiredForCertificate: false,
  },
  {
    id: 'po-ai-m15',
    title: 'Module 15 — Prompt pack playbook',
    description: 'Canonical filename: Module15_Prompt_Pack_Playbook_[YourName].pdf or .docx',
    courseSlug: 'ai-essentials',
    pathwaySlug: 'ai-productivity-professional',
    evidenceType: 'plan',
    learnerInstructionsPlaceholder: 'Save as Module15_Prompt_Pack_Playbook_[YourName].pdf or .docx.',
    completionSource: 'lesson_task',
    requiredForCertificate: false,
  },
  {
    id: 'po-ai-m16',
    title: 'Module 16 — AI workflow capstone',
    description: 'Canonical filename: Module16_AI_Workflow_Capstone_[YourName].pdf or .docx',
    courseSlug: 'ai-essentials',
    pathwaySlug: 'ai-productivity-professional',
    evidenceType: 'written_sample',
    learnerInstructionsPlaceholder: 'Save as Module16_AI_Workflow_Capstone_[YourName].pdf or .docx; complete capstone prep and rubric self-check in the app.',
    completionSource: 'capstone',
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
