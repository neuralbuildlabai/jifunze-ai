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
  /** Filename / export conventions — show in expandable “details” only, not primary cards. */
  filenameGuidance?: string
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
    title: 'AI use boundary guide',
    description: 'Clarify where AI helps, where it should not, and what you will verify yourself.',
    filenameGuidance: 'Suggested filename: Module01_AI_Use_Boundary_[YourName].pdf or .docx',
    courseSlug: 'ai-essentials',
    pathwaySlug: 'ai-productivity-professional',
    evidenceType: 'written_sample',
    learnerInstructionsPlaceholder: 'Complete during Module 1 practice; export using the suggested filename if you keep a local copy.',
    completionSource: 'lesson_task',
    requiredForCertificate: false,
  },
  {
    id: 'po-ai-m02',
    title: 'Responsible judgment checklist',
    description: 'A compact checklist for sound decisions before you rely on model output.',
    filenameGuidance: 'Suggested filename: Module02_Responsible_Judgment_Checklist_[YourName].pdf or .docx',
    courseSlug: 'ai-essentials',
    pathwaySlug: 'ai-productivity-professional',
    evidenceType: 'checklist',
    learnerInstructionsPlaceholder: 'Complete during Module 2 practice.',
    completionSource: 'lesson_task',
    requiredForCertificate: false,
  },
  {
    id: 'po-ai-m03',
    title: 'Prompt rewrite pack',
    description: 'Before-and-after prompts with a short rationale you could defend to a colleague.',
    filenameGuidance: 'Suggested filename: Module03_Prompt_Rewrite_[YourName].pdf or .docx',
    courseSlug: 'ai-essentials',
    pathwaySlug: 'ai-productivity-professional',
    evidenceType: 'written_sample',
    learnerInstructionsPlaceholder: 'Complete during Module 3 practice.',
    completionSource: 'lesson_task',
    requiredForCertificate: false,
  },
  {
    id: 'po-ai-m04',
    title: 'Structured prompt template',
    description: 'A reusable template with task, context, constraints, and format.',
    filenameGuidance: 'Suggested filename: Module04_Structured_Prompt_Template_[YourName].pdf or .docx',
    courseSlug: 'ai-essentials',
    pathwaySlug: 'ai-productivity-professional',
    evidenceType: 'plan',
    learnerInstructionsPlaceholder: 'Complete during Module 4 practice.',
    completionSource: 'lesson_task',
    requiredForCertificate: false,
  },
  {
    id: 'po-ai-m05',
    title: 'Prompt review log',
    description: 'Track versions, what changed, and what you verified between iterations.',
    filenameGuidance: 'Suggested filename: Module05_Prompt_Version_Log_[YourName].pdf or .docx',
    courseSlug: 'ai-essentials',
    pathwaySlug: 'ai-productivity-professional',
    evidenceType: 'table',
    learnerInstructionsPlaceholder: 'Complete during Module 5 practice.',
    completionSource: 'lesson_task',
    requiredForCertificate: false,
  },
  {
    id: 'po-ai-m06',
    title: 'Verification table',
    description: 'Label claim strength, evidence, and gaps—avoid false precision.',
    filenameGuidance: 'Suggested filename: Module06_Claim_Verification_Table_[YourName].pdf or .docx',
    courseSlug: 'ai-essentials',
    pathwaySlug: 'ai-productivity-professional',
    evidenceType: 'table',
    learnerInstructionsPlaceholder: 'Complete during Module 6 practice.',
    completionSource: 'lesson_task',
    requiredForCertificate: false,
  },
  {
    id: 'po-ai-m07',
    title: 'Audience-fit communication pack',
    description: 'Same facts shaped for different readers—tone and disclosure where it matters.',
    filenameGuidance: 'Suggested filename: Module07_Audience_Fit_Communication_[YourName].pdf or .docx',
    courseSlug: 'ai-essentials',
    pathwaySlug: 'ai-productivity-professional',
    evidenceType: 'written_sample',
    learnerInstructionsPlaceholder: 'Complete during Module 7 practice.',
    completionSource: 'lesson_task',
    requiredForCertificate: false,
  },
  {
    id: 'po-ai-m08',
    title: 'Learning repair plan',
    description: 'A practical plan when study or outputs drift—what you will check next.',
    filenameGuidance: 'Suggested filename: Module08_AI_Learning_Repair_Plan_[YourName].pdf or .docx',
    courseSlug: 'ai-essentials',
    pathwaySlug: 'ai-productivity-professional',
    evidenceType: 'plan',
    learnerInstructionsPlaceholder: 'Complete during Module 8 practice.',
    completionSource: 'lesson_task',
    requiredForCertificate: false,
  },
  {
    id: 'po-ai-m09',
    title: 'Responsible AI guardrails',
    description: 'Guardrails you can reuse when stakes or ambiguity rise.',
    filenameGuidance: 'Suggested filename: Module09_Responsible_AI_Guardrails_[YourName].pdf or .docx',
    courseSlug: 'ai-essentials',
    pathwaySlug: 'ai-productivity-professional',
    evidenceType: 'checklist',
    learnerInstructionsPlaceholder: 'Complete during Module 9 practice.',
    completionSource: 'lesson_task',
    requiredForCertificate: false,
  },
  {
    id: 'po-ai-m10',
    title: 'Privacy and safety checklist',
    description: 'Tiers, redaction habits, and when to pause or escalate.',
    filenameGuidance: 'Suggested filename: Module10_Privacy_Safety_Checklist_[YourName].pdf or .docx',
    courseSlug: 'ai-essentials',
    pathwaySlug: 'ai-productivity-professional',
    evidenceType: 'checklist',
    learnerInstructionsPlaceholder: 'Complete during Module 10 practice.',
    completionSource: 'lesson_task',
    requiredForCertificate: false,
  },
  {
    id: 'po-ai-m11',
    title: 'Research synthesis brief',
    description: 'Synthesize sources with limits explicit—not a wall of links.',
    filenameGuidance: 'Suggested filename: Module11_Research_Synthesis_Brief_[YourName].pdf or .docx',
    courseSlug: 'ai-essentials',
    pathwaySlug: 'ai-productivity-professional',
    evidenceType: 'brief',
    learnerInstructionsPlaceholder: 'Complete during Module 11 practice.',
    completionSource: 'lesson_task',
    requiredForCertificate: false,
  },
  {
    id: 'po-ai-m12',
    title: 'Workflow readiness memo',
    description: 'What an automated or agentic step needs before you trust it in real work.',
    filenameGuidance: 'Suggested filename: Module12_Workflow_Agent_Readiness_[YourName].pdf or .docx',
    courseSlug: 'ai-essentials',
    pathwaySlug: 'ai-productivity-professional',
    evidenceType: 'memo',
    learnerInstructionsPlaceholder: 'Complete during Module 12 practice.',
    completionSource: 'lesson_task',
    requiredForCertificate: false,
  },
  {
    id: 'po-ai-m13',
    title: 'Decision memo',
    description: 'Tradeoffs, evidence, and the next information you would buy.',
    filenameGuidance: 'Suggested filename: Module13_Decision_Memo_[YourName].pdf or .docx',
    courseSlug: 'ai-essentials',
    pathwaySlug: 'ai-productivity-professional',
    evidenceType: 'memo',
    learnerInstructionsPlaceholder: 'Complete during Module 13 practice.',
    completionSource: 'lesson_task',
    requiredForCertificate: false,
  },
  {
    id: 'po-ai-m14',
    title: 'Team AI use agreement',
    description: 'A short agreement slice teams can actually follow.',
    filenameGuidance: 'Suggested filename: Module14_Team_AI_Use_Agreement_[YourName].pdf or .docx',
    courseSlug: 'ai-essentials',
    pathwaySlug: 'ai-productivity-professional',
    evidenceType: 'written_sample',
    learnerInstructionsPlaceholder: 'Complete during Module 14 practice.',
    completionSource: 'lesson_task',
    requiredForCertificate: false,
  },
  {
    id: 'po-ai-m15',
    title: 'Prompt pack playbook',
    description: 'Reusable prompts and guardrails for recurring tasks.',
    filenameGuidance: 'Suggested filename: Module15_Prompt_Pack_Playbook_[YourName].pdf or .docx',
    courseSlug: 'ai-essentials',
    pathwaySlug: 'ai-productivity-professional',
    evidenceType: 'plan',
    learnerInstructionsPlaceholder: 'Complete during Module 15 practice.',
    completionSource: 'lesson_task',
    requiredForCertificate: false,
  },
  {
    id: 'po-ai-m16',
    title: 'Capstone workflow bundle',
    description: 'End-to-end AI-supported workflow with disclosure and self-critique.',
    filenameGuidance: 'Suggested filename: Module16_AI_Workflow_Capstone_[YourName].pdf or .docx. Finish capstone prep and rubric self-check in the app.',
    courseSlug: 'ai-essentials',
    pathwaySlug: 'ai-productivity-professional',
    evidenceType: 'written_sample',
    learnerInstructionsPlaceholder: 'Complete in Module 16; use in-app prep and rubric before calling it done.',
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
