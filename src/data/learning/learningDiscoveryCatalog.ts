import type { ExtendedPublicLibraryKey } from './extendedPublicLibraryConfigs'
import { EXTENDED_PUBLIC_LIBRARY_CONFIGS } from './extendedPublicLibraryConfigs'
import { NETWORKING_PUBLIC_BASE_PATH } from './extendedLibrariesCurricula'
import { PUBLIC_ML_LIBRARY_BASE_PATH } from './machineLearningCurriculum'
import { AGENTIC_AI_REAL_WORK_LANDING_PATH } from './standaloneCoursesCatalog'
import { PUBLIC_AI_FOUNDATIONS_BASE_PATH } from '../publicStarterLibraries/aiFoundations'

export type LearningDiscoveryCategorySlug =
  | 'chatgpt'
  | 'prompting'
  | 'gemini'
  | 'claude'
  | 'agentic-ai'
  | 'ai-and-ml'
  | 'cybersecurity'
  | 'cloud-devops'

export type DiscoverySupportingPath = {
  label: string
  description?: string
  href: string
}

export type DiscoveryFeaturedStandalone = {
  libraryKey: ExtendedPublicLibraryKey
  badge?: string
}

export type LearningDiscoveryCategory = {
  slug: LearningDiscoveryCategorySlug
  title: string
  eyebrow: string
  intro: string
  /** Extra orientation copy for browse pages (“learn more about this topic”). */
  learnMoreAbout?: string
  subscriptionNote: string
  featuredCourses: DiscoveryFeaturedStandalone[]
  supportingPaths: DiscoverySupportingPath[]
  faq?: Array<{ question: string; answer: string }>
}

export const LEARNING_DISCOVERY_CATEGORIES: LearningDiscoveryCategory[] = [
  {
    slug: 'chatgpt',
    eyebrow: 'ChatGPT',
    title: 'ChatGPT for everyday professional work',
    intro:
      'Start from a flagship standalone course plus the broader AI Foundations reader map—structured practice with verification discipline, not magical fluency.',
    learnMoreAbout:
      'This browse lane orients you toward workplace-real habits: separating fluency from facts, packaging context safely, and reviewing outputs before they leave your hands.',
    subscriptionNote:
      'Monthly and Annual plans are framed to include curated standalone courses alongside library materials when your subscription tier supports full access—buy a single course if you only need one.',
    featuredCourses: [{ libraryKey: 'course_chatgpt_everyday', badge: 'Standalone course' }],
    supportingPaths: [
      { label: 'AI Foundations library (starter map)', href: PUBLIC_AI_FOUNDATIONS_BASE_PATH },
      { label: 'Everyday Chatbots library', href: '/library/everyday-chatbots' },
      { label: 'Browse all categories', href: '/learn' },
    ],
    faq: [
      {
        question: 'Will these lessons teach me prompt tricks only?',
        answer:
          'No—the emphasis is judgment and workflow habits: clarity, verification, escalation, and responsible drafting—not slogan prompts.',
      },
      {
        question: 'Do I need a subscription to preview anything?',
        answer:
          'Standalone courses include public-preview lesson layers where labeled; deeper tiers may require sign-in or eligible plans—check each lesson card.',
      },
    ],
  },
  {
    slug: 'prompting',
    eyebrow: 'Prompting',
    title: 'Prompt engineering across major assistants',
    intro:
      'Ground prompting in specs, evaluation, and workflow gates—then compare behaviors responsibly across tools without replacing measurement.',
    learnMoreAbout:
      'You’ll practice specification-first prompting: constraints, structured outputs, debugging prompts like specs, and comparison framing without fake benchmarks.',
    subscriptionNote:
      'Full-access subscriptions are designed to include this standalone course plus broader libraries; one-time purchase remains a simple alternative when sold for individual courses.',
    featuredCourses: [{ libraryKey: 'course_prompt_engineering_models', badge: 'Standalone course' }],
    supportingPaths: [
      { label: 'AI Foundations library', href: PUBLIC_AI_FOUNDATIONS_BASE_PATH },
      { label: 'Chatbots library', href: '/library/everyday-chatbots' },
    ],
    faq: [
      {
        question: 'Is this “which model wins”?',
        answer:
          'No—Jifunze avoids benchmark theater. You’ll compare behaviors responsibly using rubrics and realistic tasks aligned to your workflow.',
      },
      {
        question: 'What does “assistive learning” mean here?',
        answer:
          'Materials expand access to structured practice—they do not guarantee mastery, hiring outcomes, or certification.',
      },
    ],
  },
  {
    slug: 'gemini',
    eyebrow: 'Gemini',
    title: 'Gemini for productivity and Google Workspace',
    intro:
      'Workspace-real drafting habits: separate generation from authorization, summarize threads cautiously, and treat AI text as provisional until reviewed.',
    learnMoreAbout:
      'Lessons emphasize Docs/Gmail/Sheets/meeting realities: publish gates, inference discipline in summaries, and sensitivity-aware drafting.',
    subscriptionNote:
      'Standalone purchase may be offered per course when billing supports it; subscriptions are positioned for learners who want the full curated catalog—including standalone courses—when entitled.',
    featuredCourses: [{ libraryKey: 'course_gemini_workspace', badge: 'Standalone course' }],
    supportingPaths: [
      { label: 'AI Foundations library', href: PUBLIC_AI_FOUNDATIONS_BASE_PATH },
      { label: 'Publishing workflows library', href: EXTENDED_PUBLIC_LIBRARY_CONFIGS.content_publishing.publicBasePath },
    ],
    faq: [
      {
        question: 'Does Gemini “authorize” emails or edits?',
        answer:
          'No—draft text is not authorization. Human owners remain accountable for obligations, approvals, and policy-sensitive sends.',
      },
      {
        question: 'Will this guarantee productivity gains?',
        answer:
          'No—materials are instructional access only; outcomes depend on environment, discipline, and verification habits.',
      },
    ],
  },
  {
    slug: 'claude',
    eyebrow: 'Claude',
    title: 'Claude for writing, research, and deep thinking',
    intro:
      'Long-context drafting support with explicit synthesis vs verification discipline—professional tone without pretending citations appeared by themselves.',
    learnMoreAbout:
      'Expect structured revision loops, stakeholder-safe communication habits, and research-note hygiene—without claiming automated citations.',
    subscriptionNote:
      'Subscriptions aim to bundle curated standalone courses for full-access learners; otherwise buy an individual course when that checkout path exists for your deployment.',
    featuredCourses: [
      { libraryKey: 'course_claude_writing', badge: 'New · standalone course' },
      { libraryKey: 'course_prompt_engineering_models', badge: 'Also compares Claude behaviors' },
    ],
    supportingPaths: [
      { label: 'AI Foundations library', href: PUBLIC_AI_FOUNDATIONS_BASE_PATH },
      { label: 'Chatbots library', href: '/library/everyday-chatbots' },
    ],
    faq: [
      {
        question: 'Will this replace citations for me?',
        answer:
          'No—verification remains your responsibility; synthesis assistance is not a substitute for sourcing appropriate to stakes.',
      },
      {
        question: 'Who is this lane for?',
        answer:
          'Professionals doing serious drafting, synthesis, and collaboration—especially when nuance and accountability matter.',
      },
    ],
  },
  {
    slug: 'agentic-ai',
    eyebrow: 'Agentic AI',
    title: 'Agents, tools, supervision, and rollout realism',
    intro:
      'Treat agentic systems as accountable loops: permissions, checkpoints, observability, and staged pilots—operations-first literacy without autonomy hype.',
    learnMoreAbout:
      'You’ll map blast radius, failure modes, and governance-friendly pilots—without treating “agents” like coworkers with judgment.',
    subscriptionNote:
      'Full access is framed to include this curriculum alongside other standalone courses when entitled; purchasing a single course may be better when you want depth in one lane only.',
    featuredCourses: [{ libraryKey: 'course_agentic_ai_real_work', badge: 'New · standalone course' }],
    supportingPaths: [
      { label: 'Cloud & DevOps library', href: EXTENDED_PUBLIC_LIBRARY_CONFIGS.cloud_devops.publicBasePath },
      { label: 'Monitoring & observability library', href: EXTENDED_PUBLIC_LIBRARY_CONFIGS.monitoring.publicBasePath },
    ],
    faq: [
      {
        question: 'Will this teach me to deploy autonomous agents safely overnight?',
        answer:
          'No—materials emphasize staged rollout, oversight, logging, and proportional controls; “safe autonomy” claims are avoided.',
      },
      {
        question: 'What should I expect operationally?',
        answer:
          'Concrete workflow patterns and incident-minded habits—not hype demos—aligned to real workplace constraints.',
      },
    ],
  },
  {
    slug: 'ai-and-ml',
    eyebrow: 'AI / ML',
    title: 'Foundations through applied machine learning literacy',
    intro:
      'Begin with AI Foundations for orientation, then continue into structured ML readers—judgment-first technical literacy without certification theater.',
    learnMoreAbout:
      'Use these libraries to build coherent mental models first, then deepen into ML evaluation and workflow responsibility where your plan unlocks readers.',
    subscriptionNote:
      'These flagship libraries are included in the broader subscription story when your plan unlocks deeper materials; always verify access labels on lesson cards.',
    featuredCourses: [],
    supportingPaths: [
      { label: 'AI Foundations library', href: PUBLIC_AI_FOUNDATIONS_BASE_PATH },
      { label: 'Machine Learning Foundations library', href: PUBLIC_ML_LIBRARY_BASE_PATH },
      { label: 'Networking & infrastructure library', href: NETWORKING_PUBLIC_BASE_PATH },
    ],
    faq: [
      {
        question: 'Is this certification prep?',
        answer:
          'No—these are instructional readers for literacy and practice; combine with official syllabi where credentials apply.',
      },
      {
        question: 'Where should I start?',
        answer:
          'Most learners begin with AI Foundations for orientation, then enter ML Foundations module 1 as labeled public starter.',
      },
    ],
  },
  {
    slug: 'cybersecurity',
    eyebrow: 'Cybersecurity',
    title: 'Defense habits and practical modern security literacy',
    intro:
      'Serious reader depth across threats, identity, and operations culture—explicitly not certification prep or legal advice.',
    learnMoreAbout:
      'Expect escalation thinking, realistic threat framing, and operator habits—paired with explicit limits (not legal counsel).',
    subscriptionNote:
      'Extended libraries are part of the full-access subscription posture where enabled; course-first browsing helps you choose depth before thinking about checkout.',
    featuredCourses: [],
    supportingPaths: [
      { label: 'Cybersecurity library', href: EXTENDED_PUBLIC_LIBRARY_CONFIGS.cybersecurity.publicBasePath },
      { label: 'Networking library', href: NETWORKING_PUBLIC_BASE_PATH },
    ],
    faq: [
      {
        question: 'Is this legal advice?',
        answer:
          'No—materials are educational; consult qualified experts for obligations, incidents, and regulated environments.',
      },
      {
        question: 'What will I actually practice?',
        answer:
          'Defense habits, prioritization, and realistic workflows—without fear-mongering or “guaranteed security” promises.',
      },
    ],
  },
  {
    slug: 'cloud-devops',
    eyebrow: 'Cloud & DevOps',
    title: 'Cloud primitives, delivery thinking, and platform habits',
    intro:
      'Operational literacy for builders: fewer surprises, clearer handoffs, and realistic constraints—examples are illustrative, always verify against your environment.',
    learnMoreAbout:
      'Browse cloud delivery thinking alongside observability habits—then connect to agentic workflows where automation meets operations.',
    subscriptionNote:
      'Cloud/DevOps and agentic workflows pair naturally; subscriptions are framed to unlock breadth while standalone courses cover focused product-style depth.',
    featuredCourses: [],
    supportingPaths: [
      { label: 'Cloud & DevOps library', href: EXTENDED_PUBLIC_LIBRARY_CONFIGS.cloud_devops.publicBasePath },
      { label: 'Monitoring & observability library', href: EXTENDED_PUBLIC_LIBRARY_CONFIGS.monitoring.publicBasePath },
      { label: 'Agentic AI standalone course', href: AGENTIC_AI_REAL_WORK_LANDING_PATH },
    ],
    faq: [
      {
        question: 'Are vendor examples guarantees?',
        answer:
          'No—tool names appear as examples; verify against your environment, budgets, permissions, and change controls.',
      },
      {
        question: 'What does “best value” mean here?',
        answer:
          'Not bargains—clear learning paths that reduce operational surprise when paired with responsible verification.',
      },
    ],
  },
]

export function learningDiscoveryCategoryBySlug(slug: string | undefined): LearningDiscoveryCategory | null {
  if (!slug) return null
  return LEARNING_DISCOVERY_CATEGORIES.find((c) => c.slug === slug) ?? null
}
