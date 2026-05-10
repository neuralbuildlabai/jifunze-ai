/**
 * Free starter microlearning entries (hosted player under /public; routes under /learn/free/...).
 *
 * INTERNAL (not for learner UI): packaging/source notes live on `internalProductionMeta` only.
 */

export type InternalProductionMeta = {
  /** Authoring/source record for ops — never render in learner-facing components. */
  source: string
  /** Delivery implementation — never render in learner-facing components. */
  deliveryEngine: string
}

export type FreeStarterRiseCourseEntry = {
  slug: string
  progressInternalKey: string
  progressSessionStartedMarker: string
  title: string
  shortTitle: string
  subtitle: string
  label: string
  /** Internal flags only — do not surface “pilot” or similar in public learner UI. */
  status: 'pilot'
  level: string
  durationLabel: string
  priceLabel: string
  category: string
  /** Learner-safe format line (no vendor/tool names). */
  learnerDisplayFormat: string
  internalProductionMeta: InternalProductionMeta
  /** Shown on completion panel — device-local sync messaging only; no vendor terms. */
  learnerCompletionNote: string
  publicRoute: string
  /** Site path to hosted lesson player — internal wiring only. */
  lessonPlayerSrc: string
  descriptionShort: string
  descriptionLong: string
  learningOutcomes: readonly string[]
  lessonsIncluded: readonly string[]
}

export const AI_AT_WORK_CHATGPT_FREE_STARTER: FreeStarterRiseCourseEntry = {
  slug: 'ai-at-work-chatgpt',
  progressInternalKey: 'rise_pilot_ai_at_work_chatgpt',
  progressSessionStartedMarker: 'rise-ai-at-work-chatgpt::session-started',
  title: 'AI at Work: Use ChatGPT Safely, Clearly, and Productively',
  shortTitle: 'AI at Work',
  subtitle:
    'Learn how to use ChatGPT safely and productively for everyday work, school, and business tasks. This beginner-friendly course covers AI limits, better prompting, output review, safe use, practical examples, and a simple AI Work Starter Kit.',
  label: 'Free Starter Course',
  status: 'pilot',
  level: 'Beginner',
  durationLabel: '45–60 minutes',
  priceLabel: 'Free',
  category: 'AI & Productivity',
  learnerDisplayFormat: 'Guided interactive course',
  internalProductionMeta: {
    source: 'Articulate Rise export',
    deliveryEngine: 'rise',
  },
  learnerCompletionNote:
    'You can mark completion when you are finished. On this device, your completion may show here before account-wide sync is available.',
  publicRoute: '/learn/free/ai-at-work-chatgpt',
  lessonPlayerSrc: '/course-assets/rise/ai-at-work-chatgpt/content/index.html',
  descriptionShort:
    'Learn how to use ChatGPT safely and productively for everyday work, school, and business tasks.',
  descriptionLong:
    'AI at Work is a beginner-friendly Free Starter Course that teaches learners how to use ChatGPT and similar AI tools safely, clearly, and productively. Learners explore what AI can and cannot do, how to write stronger prompts, how to review AI-generated output, how to avoid unsafe use of sensitive information, and how to apply AI to everyday work, study, and business tasks.\n\nBy the end of the course, learners will have built a simple AI Work Starter Kit with safe-use rules, reusable prompts, an output review checklist, and one before-and-after example of an AI-assisted task.',
  learningOutcomes: [
    'Describe what generative AI tools like ChatGPT can and cannot do.',
    'Apply a practical formula to write clearer AI prompts.',
    'Review AI-generated output for accuracy, tone, privacy risk, bias, and usefulness.',
    'Identify sensitive or unsafe information that should not be entered into general AI tools.',
    'Use AI for practical tasks such as emails, summaries, checklists, planning, and idea development.',
    'Build a personal AI Work Starter Kit with reusable prompts and safe-use rules.',
    'Make responsible decisions in real-world AI use scenarios.',
  ],
  lessonsIncluded: [
    'Welcome: How This Course Works',
    'What AI Can and Cannot Do',
    'How to Write Better Prompts',
    'Checking AI Output Before You Use It',
    'Everyday AI Use Cases',
    'Build Your AI Work Starter Kit',
    'Final Quiz: Safe and Practical AI Use',
  ],
}

export const SMART_WORKFLOWS_WITH_AI_FREE_STARTER: FreeStarterRiseCourseEntry = {
  slug: 'smart-workflows-with-ai',
  progressInternalKey: 'rise_pilot_smart_workflows_with_ai',
  progressSessionStartedMarker: 'rise-smart-workflows-with-ai::session-started',
  title: 'Smart Workflows with AI: Save Time, Organize Work, and Improve Repeated Tasks',
  shortTitle: 'Smart Workflows with AI',
  subtitle:
    'Learn how to identify repetitive work, map a workflow, decide where AI can safely help, write reusable prompts, review AI output, and build a practical Smart Workflow Plan.',
  label: 'Free Starter Workshop',
  status: 'pilot',
  level: 'Beginner to Early Intermediate',
  durationLabel: '75–120 minutes',
  priceLabel: 'Free',
  category: 'AI & Productivity',
  learnerDisplayFormat: 'Guided interactive workshop',
  internalProductionMeta: {
    source: 'Articulate Rise export',
    deliveryEngine: 'rise',
  },
  learnerCompletionNote:
    'You can mark completion when you are finished. On this device, your completion may show here before account-wide sync is available.',
  publicRoute: '/learn/free/smart-workflows-with-ai',
  lessonPlayerSrc: '/course-assets/rise/smart-workflows-with-ai/content/index.html',
  descriptionShort:
    'Learn how to identify repetitive work, map a workflow, decide where AI can safely help, write reusable prompts, review AI output, and build a practical Smart Workflow Plan.',
  descriptionLong:
    'Smart Workflows with AI is a practical Free Starter Workshop that helps learners improve repeated or messy work using AI responsibly. Learners explore how to identify workflow opportunities, map current steps, choose appropriate AI roles, write reusable workflow prompts, review AI-generated output, manage privacy and risk, and create a simple 7-day rollout plan.\n\nBy the end of the course, learners will have a Smart Workflow Plan that includes AI-supported steps, human review points, reusable prompts, success measures, risk controls, and an implementation plan.',
  learningOutcomes: [
    'Identify repetitive or messy work that is a good candidate for a smarter workflow.',
    'Map an existing workflow into clear steps before adding AI.',
    'Decide where AI can assist safely and where humans must stay in control.',
    'Write reusable prompts aligned to specific workflow steps.',
    'Review AI-generated output before it enters real workflows.',
    'Apply practical privacy and risk controls appropriate to the setting.',
    'Draft a Smart Workflow Plan with rollout steps, measures, and safeguards.',
  ],
  lessonsIncluded: [
    'What Makes a Workflow “Smart”?',
    'Find Repetitive Work: The 5R Workflow Scan',
    'Map the Workflow Before Adding AI',
    'Decide Where AI Belongs in the Workflow',
    'Write Prompts for Workflow Steps',
    'Review AI Output Before It Enters the Workflow',
    'Build the Smart Workflow Plan',
    'Put the Workflow Into Practice',
    'Final Quiz: Smart Workflow Skills Check',
  ],
}

/** Catalog display order: Smart Workflows first, then AI at Work. */
export const FREE_STARTER_RISE_COURSES: readonly FreeStarterRiseCourseEntry[] = [
  SMART_WORKFLOWS_WITH_AI_FREE_STARTER,
  AI_AT_WORK_CHATGPT_FREE_STARTER,
]

export function findFreeStarterRiseCourseBySlug(slug: string): FreeStarterRiseCourseEntry | undefined {
  return FREE_STARTER_RISE_COURSES.find((c) => c.slug === slug)
}
