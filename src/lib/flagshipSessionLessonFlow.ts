import type { FlagshipSessionContentBlock } from '../data/learning/flagshipSessionContentTypes'
import { blockAllowsLearnerResponse } from './flagshipSessionResponseBlocks'

export type LessonSectionNavItem = {
  /** DOM id target (without #) */
  anchorId: string
  label: string
}

export function navLabelForBlock(block: FlagshipSessionContentBlock): string {
  const t = block.title?.trim()
  if (t) {
    return t.length > 42 ? `${t.slice(0, 40)}…` : t
  }
  switch (block.type) {
    case 'intro':
      return 'Start here'
    case 'concept_explanation':
      return 'Core idea'
    case 'key_points':
      return 'Key concepts'
    case 'worked_example':
      return 'Worked example'
    case 'practice_task':
      return 'Practice'
    case 'reflection_prompt':
      return 'Reflection'
    case 'output_prompt':
      return 'Output task'
    case 'recap':
      return 'Pause & check'
    case 'takeaway':
      return 'Takeaway'
    case 'next_step':
      return 'Next step'
    default:
      return 'Section'
  }
}

/**
 * Full lesson nav in **DOM reading order** — `prefix` covers on-page anchors before partitioned blocks
 * (e.g. overview card, standalone objectives).
 */
export function buildLessonNavFull(args: {
  prefix: LessonSectionNavItem[]
  teachingBlocks: FlagshipSessionContentBlock[]
  /** Session overview card between teaching and apply (lesson-teaching-first layout). */
  middleOverview: boolean
  applyBlocks: FlagshipSessionContentBlock[]
}): LessonSectionNavItem[] {
  const items: LessonSectionNavItem[] = [...args.prefix]
  for (const b of args.teachingBlocks) {
    items.push({ anchorId: `lesson-section-${b.id}`, label: navLabelForBlock(b) })
  }
  if (args.middleOverview) {
    items.push({ anchorId: 'session-overview', label: 'Session overview' })
  }
  for (const b of args.applyBlocks) {
    items.push({ anchorId: `lesson-section-${b.id}`, label: navLabelForBlock(b) })
  }
  items.push({ anchorId: 'flagship-session-completion', label: 'Complete' })
  return items
}

/**
 * Supplemental blocks start collapsed; required practice/output/reflection and first teaching beats stay open.
 */
export function blockStartsCollapsed(block: FlagshipSessionContentBlock, indexInFullList: number, allBlocks: FlagshipSessionContentBlock[]): boolean {
  if (blockAllowsLearnerResponse(block)) return false

  const countBeforeSameType = allBlocks.slice(0, indexInFullList).filter((x) => x.type === block.type).length

  switch (block.type) {
    case 'intro':
      return false
    case 'concept_explanation':
      return countBeforeSameType > 0
    case 'key_points':
      return countBeforeSameType > 0
    case 'worked_example':
      return countBeforeSameType > 0
    case 'recap':
      return countBeforeSameType > 0
    case 'takeaway':
    case 'next_step':
      return true
    default:
      return false
  }
}
