import type { StandaloneCourseLessonBlock } from '../data/courses/practicalMathematicsCourseTypes'

export function pickBpaKeyIdeaBlock(
  blocks: readonly StandaloneCourseLessonBlock[],
): StandaloneCourseLessonBlock | undefined {
  return blocks.find((b) => b.type === 'concept_explanation') ?? blocks.find((b) => b.type === 'worked_example')
}

export function pickBpaBrightPathBlock(
  blocks: readonly StandaloneCourseLessonBlock[],
): StandaloneCourseLessonBlock | undefined {
  return blocks.find((b) => b.type === 'real_world_application') ?? blocks.find((b) => b.type === 'scenario')
}

export function pickBpaCheckpointBlock(
  blocks: readonly StandaloneCourseLessonBlock[],
): StandaloneCourseLessonBlock | undefined {
  return blocks.find((b) => b.type === 'pause_and_check')
}

/** At most one rich visual per lesson, biased toward the module where that visual is pedagogically central. */
export function pickBpaOptionalVisualBlock(
  moduleSlug: string,
  blocks: readonly StandaloneCourseLessonBlock[],
): StandaloneCourseLessonBlock | undefined {
  if (moduleSlug === 'automation-foundations') return undefined

  const priority: Record<string, readonly string[]> = {
    'understanding-current-workflow': ['dataset_table', 'bar_chart', 'heatmap'],
    'finding-automation-opportunities': ['priority_matrix', 'dataset_table', 'heatmap'],
    'designing-future-workflow': ['process_flow', 'dataset_table'],
    'business-value-risk-implementation': ['roadmap_timeline', 'calculation_card', 'bar_chart', 'stat_grid'],
  }
  const order = priority[moduleSlug]
  if (!order) return undefined
  for (const t of order) {
    const hit = blocks.find((b) => b.type === t)
    if (hit) return hit
  }
  return undefined
}
