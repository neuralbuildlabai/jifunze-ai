import type { CurriculumCategory } from './aiEverydayWorkCurriculum'
import {
  CLOUD_DEVOPS_PUBLIC_BASE_PATH,
  CONTENT_PUBLISHING_PUBLIC_BASE_PATH,
  CYBERSECURITY_PUBLIC_BASE_PATH,
  MONITORING_PUBLIC_BASE_PATH,
  NETWORKING_PUBLIC_BASE_PATH,
  CLOUD_DEVOPS_LIBRARY_CURRICULUM,
  CONTENT_PUBLISHING_LIBRARY_CURRICULUM,
  CYBERSECURITY_LIBRARY_CURRICULUM,
  MONITORING_LIBRARY_CURRICULUM,
  NETWORKING_LIBRARY_CURRICULUM,
} from './extendedLibrariesCurricula'
import {
  AGENTIC_AI_REAL_WORK_CURRICULUM,
  AGENTIC_AI_REAL_WORK_LANDING_PATH,
  AGENTIC_AI_REAL_WORK_PUBLIC_BASE_PATH,
  CLAUDE_WRITING_RESEARCH_CURRICULUM,
  CLAUDE_WRITING_RESEARCH_LANDING_PATH,
  CLAUDE_WRITING_RESEARCH_PUBLIC_BASE_PATH,
  GEMINI_WORKSPACE_PRODUCTIVITY_CURRICULUM,
  GEMINI_WORKSPACE_PRODUCTIVITY_LANDING_PATH,
  GEMINI_WORKSPACE_PRODUCTIVITY_PUBLIC_BASE_PATH,
  PROMPT_ENGINEERING_MODELS_CURRICULUM,
  PROMPT_ENGINEERING_MODELS_LANDING_PATH,
  PROMPT_ENGINEERING_MODELS_PUBLIC_BASE_PATH,
} from './standaloneCoursesCatalog'
import {
  CLOUD_DEVOPS_PLATFORM_LIBRARY_SPEC,
  CONTENT_CREATION_PUBLISHING_LIBRARY_SPEC,
  CYBERSECURITY_DEFENSE_LIBRARY_SPEC,
  MONITORING_OBSERVABILITY_LIBRARY_SPEC,
  NETWORKING_INFRASTRUCTURE_LIBRARY_SPEC,
} from './extendedLibrariesSpecs'

export type ExtendedPublicLibraryKey =
  | 'networking'
  | 'cybersecurity'
  | 'cloud_devops'
  | 'monitoring'
  | 'content_publishing'
  /** Standalone course products (future purchasable SKUs / subscription bundle hooks) */
  | 'course_prompt_engineering_models'
  | 'course_gemini_workspace'
  | 'course_claude_writing'
  | 'course_agentic_ai_real_work'

export type ExtendedPublicLibraryConfig = {
  key: ExtendedPublicLibraryKey
  publicBasePath: string
  workspacePath: string
  browseLabel: string
  accent: 'amber' | 'rose' | 'sky' | 'orange' | 'fuchsia'
  curriculum: CurriculumCategory[]
  title: string
  subtitle: string
  description: string
  /** Optional product landing route when this catalog is a standalone course */
  landingPath?: string
  /** Starter chrome eyebrow override for catalog index pages */
  catalogEyebrow?: string
  /** Embedded learner help panel on lesson readers (curriculum-grounded) */
  embeddedLearnerHelp?: boolean
}

export const EXTENDED_PUBLIC_LIBRARY_CONFIGS: Record<ExtendedPublicLibraryKey, ExtendedPublicLibraryConfig> = {
  networking: {
    key: 'networking',
    publicBasePath: NETWORKING_PUBLIC_BASE_PATH,
    workspacePath: '/library/networking',
    browseLabel: 'Networking · Browse',
    accent: 'amber',
    curriculum: NETWORKING_LIBRARY_CURRICULUM,
    title: NETWORKING_INFRASTRUCTURE_LIBRARY_SPEC.libraryTitle,
    subtitle: 'Reason about traffic paths, platforms, and failures—operations literacy without hype.',
    description:
      'Built for serious learners: foundations through container/platform networking and troubleshooting patterns. Materials are instructional—never a substitute for your org’s policies, vendors, or licensed experts where required.',
  },
  cybersecurity: {
    key: 'cybersecurity',
    publicBasePath: CYBERSECURITY_PUBLIC_BASE_PATH,
    workspacePath: '/library/security',
    browseLabel: 'Security · Browse',
    accent: 'rose',
    curriculum: CYBERSECURITY_LIBRARY_CURRICULUM,
    title: CYBERSECURITY_DEFENSE_LIBRARY_SPEC.libraryTitle,
    subtitle: 'Defense habits, threat framing, and practical escalation—without fear-mongering.',
    description:
      'Foundations through applied modern security with explicit human-behavior emphasis. Not certification prep and not legal advice—pair with your organization’s requirements.',
  },
  cloud_devops: {
    key: 'cloud_devops',
    publicBasePath: CLOUD_DEVOPS_PUBLIC_BASE_PATH,
    workspacePath: '/library/cloud',
    browseLabel: 'Cloud/DevOps · Browse',
    accent: 'sky',
    curriculum: CLOUD_DEVOPS_LIBRARY_CURRICULUM,
    title: CLOUD_DEVOPS_PLATFORM_LIBRARY_SPEC.libraryTitle,
    subtitle: 'Cloud primitives, delivery thinking, and platform habits that reduce operational surprise.',
    description:
      'Structured progression from cloud mental models to applied platform work—still judgment-first literacy, not a substitute for your org’s architecture reviews, change controls, or vendor certification paths. Tool names appear as examples—always verify against your environment, budgets, and permissions.',
  },
  monitoring: {
    key: 'monitoring',
    publicBasePath: MONITORING_PUBLIC_BASE_PATH,
    workspacePath: '/library/observability',
    browseLabel: 'Observability · Browse',
    accent: 'orange',
    curriculum: MONITORING_LIBRARY_CURRICULUM,
    title: MONITORING_OBSERVABILITY_LIBRARY_SPEC.libraryTitle,
    subtitle: 'Signals, incidents, and reliability habits—judgment-first operations literacy.',
    description:
      'Observability foundations through incident response and improvement loops. Does not guarantee on-call outcomes or employment in SRE roles—materials expand access, not promises.',
  },
  content_publishing: {
    key: 'content_publishing',
    publicBasePath: CONTENT_PUBLISHING_PUBLIC_BASE_PATH,
    workspacePath: '/library/publishing',
    browseLabel: 'Publishing · Browse',
    accent: 'fuchsia',
    curriculum: CONTENT_PUBLISHING_LIBRARY_CURRICULUM,
    title: CONTENT_CREATION_PUBLISHING_LIBRARY_SPEC.libraryTitle,
    subtitle: 'Make knowledge usable in public formats—clarity, review, and sustainable systems.',
    description:
      'Foundations through content systems for learners and creators. Publishing assistance is not audience growth guarantees—review for accuracy, rights, and policy fit.',
  },
  course_prompt_engineering_models: {
    key: 'course_prompt_engineering_models',
    landingPath: PROMPT_ENGINEERING_MODELS_LANDING_PATH,
    publicBasePath: PROMPT_ENGINEERING_MODELS_PUBLIC_BASE_PATH,
    workspacePath: '/library/course/prompt-engineering-models',
    browseLabel: 'Course · Browse lessons',
    accent: 'amber',
    curriculum: PROMPT_ENGINEERING_MODELS_CURRICULUM,
    catalogEyebrow: 'Standalone course · Prompt Engineering Across ChatGPT, Claude, and Gemini',
    embeddedLearnerHelp: true,
    title: 'Prompt Engineering Across ChatGPT, Claude, and Gemini',
    subtitle:
      'Specification-first prompting: context design, constraints, debugging, comparison framing, and workflow gates—judgment-first, measurement-friendly, vendor-neutral.',
    description:
      'Six modules built for practitioners who want repeatable prompt quality—not slogan comparisons. Future SKU-friendly as a standalone course or bundle; still instructional access only—no certification or benchmark dominance guarantees.',
  },
  course_gemini_workspace: {
    key: 'course_gemini_workspace',
    landingPath: GEMINI_WORKSPACE_PRODUCTIVITY_LANDING_PATH,
    publicBasePath: GEMINI_WORKSPACE_PRODUCTIVITY_PUBLIC_BASE_PATH,
    workspacePath: '/library/course/gemini-workspace',
    browseLabel: 'Course · Browse lessons',
    accent: 'fuchsia',
    curriculum: GEMINI_WORKSPACE_PRODUCTIVITY_CURRICULUM,
    catalogEyebrow: 'Standalone course · Gemini for Productivity and Google Workspace',
    embeddedLearnerHelp: true,
    title: 'Gemini for Productivity and Google Workspace',
    subtitle:
      'Workspace-real drafting, summaries, sheets thinking, meeting artifacts, and responsible usage patterns—draft text is not authorization.',
    description:
      'Six modules aligned to how people actually collaborate in Google-centered workplaces. Packaged for future standalone purchase or subscription bundling; productivity gains vary—never promised job outcomes or professional qualification.',
  },
  course_claude_writing: {
    key: 'course_claude_writing',
    landingPath: CLAUDE_WRITING_RESEARCH_LANDING_PATH,
    publicBasePath: CLAUDE_WRITING_RESEARCH_PUBLIC_BASE_PATH,
    workspacePath: '/library/course/claude-writing-research',
    browseLabel: 'Course · Browse lessons',
    accent: 'rose',
    curriculum: CLAUDE_WRITING_RESEARCH_CURRICULUM,
    catalogEyebrow: 'Standalone course · Claude for Writing, Research, and Deep Thinking',
    embeddedLearnerHelp: true,
    title: 'Claude for Writing, Research, and Deep Thinking',
    subtitle:
      'Long-context drafting support with research discipline: synthesis separated from verification, collaboration patterns, and professional boundaries—assistive materials, not citation automation.',
    description:
      'Six modules built for serious writing and thinking work—structured readers with checkpoints and misconception framing. Future packaging may sell standalone or include in subscription/all-access SKUs; outcomes remain learner-dependent.',
  },
  course_agentic_ai_real_work: {
    key: 'course_agentic_ai_real_work',
    landingPath: AGENTIC_AI_REAL_WORK_LANDING_PATH,
    publicBasePath: AGENTIC_AI_REAL_WORK_PUBLIC_BASE_PATH,
    workspacePath: '/library/course/agentic-ai-real-work',
    browseLabel: 'Course · Browse lessons',
    accent: 'orange',
    curriculum: AGENTIC_AI_REAL_WORK_CURRICULUM,
    catalogEyebrow: 'Standalone course · Agentic AI and AI Agents for Real Work',
    embeddedLearnerHelp: true,
    title: 'Agentic AI and AI Agents for Real Work',
    subtitle:
      'Tool use, supervision, checkpoints, and governance for multi-step automation—judgment-first literacy without promising autonomy, ROI, or safe-by-default hype.',
    description:
      'Six modules mapping agent loops to operational reality: permissions, failure modes, observability, and staged rollout. Intended as a future standalone purchase or subscription inclusion—still instructional access, not certification or guaranteed deployment success.',
  },
}
