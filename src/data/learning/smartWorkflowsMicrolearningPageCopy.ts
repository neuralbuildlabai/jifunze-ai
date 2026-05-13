/**
 * Learner-facing copy for the Smart Workflows with AI microlearning detail page only.
 * Other surfaces (e.g. /learn hub) may still use `SMART_WORKFLOWS_WITH_AI_FREE_STARTER` catalog fields.
 */
export const SMART_WORKFLOWS_MICROLEARNING_HERO_BADGE = 'Free' as const

export const SMART_WORKFLOWS_MICROLEARNING_HERO_DESCRIPTION =
  'Build a simple AI-supported workflow for repeated tasks — from spotting the work, to mapping the steps, to adding review and safety checks.' as const

export const SMART_WORKFLOWS_MICROLEARNING_METADATA_ROW =
  'Beginner to early intermediate · 75–120 minutes · Guided workshop' as const

export const SMART_WORKFLOWS_MICROLEARNING_SUPPORT_NOTE =
  'Use this short workshop to practice one workflow from start to finish.' as const

/** Kept for backwards compatibility; not rendered when empty. */
export const SMART_WORKFLOWS_MICROLEARNING_OUTCOMES_INTRO = '' as const

export const SMART_WORKFLOWS_MICROLEARNING_OUTCOMES: readonly string[] = [
  'Choose a repeated task that is worth improving.',
  'Map the task from trigger to finished outcome.',
  'Decide where AI can help and where human review is required.',
  'Write a reusable prompt for the task.',
  'Add basic privacy, quality, and rollout checks.',
  'Draft a simple workflow plan you can reuse.',
]

export const SMART_WORKFLOWS_MICROLEARNING_LESSON_FLOW: readonly string[] = [
  'What Makes a Workflow Smart?',
  'Find Repeated Work',
  'Map the Work First',
  'Decide Where AI Belongs',
  'Write a Reusable Prompt',
  'Review the Output',
  'Build the Workflow Plan',
  'Try the Workflow',
  'Final Readiness Check',
]
