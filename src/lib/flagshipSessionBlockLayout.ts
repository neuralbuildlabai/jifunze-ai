import type { FlagshipSessionType } from '../data/learning/flagshipCourseSessions'
import type { FlagshipSessionContentBlock } from '../data/learning/flagshipSessionContentTypes'
import { blockAllowsLearnerResponse } from './flagshipSessionResponseBlocks'

export type PartitionedFlagshipBlocks = {
  teachingBlocks: FlagshipSessionContentBlock[]
  applyBlocks: FlagshipSessionContentBlock[]
}

/** Teaching / narrative first; learner response blocks last (same relative order within each group). */
export function partitionFlagshipSessionBlocks(blocks: FlagshipSessionContentBlock[]): PartitionedFlagshipBlocks {
  const teachingBlocks: FlagshipSessionContentBlock[] = []
  const applyBlocks: FlagshipSessionContentBlock[] = []
  for (const b of blocks) {
    if (blockAllowsLearnerResponse(b)) applyBlocks.push(b)
    else teachingBlocks.push(b)
  }
  return { teachingBlocks, applyBlocks }
}

export function sessionLearningSectionTitle(type: FlagshipSessionType): string {
  switch (type) {
    case 'lesson':
      return 'Learning material'
    case 'practice':
      return "What you'll do"
    case 'revision':
      return 'What to review'
    case 'recap':
      return 'Review together'
    case 'reflection':
      return 'Reflection focus'
    case 'capstone_prep':
      return 'Capstone orientation'
    default:
      return 'Learning material'
  }
}

export function sessionApplySectionTitle(type: FlagshipSessionType): string {
  switch (type) {
    case 'lesson':
      return 'Practice & respond'
    case 'practice':
      return 'Your work'
    case 'revision':
      return 'Sharpen & respond'
    case 'recap':
      return 'Consolidate'
    case 'reflection':
      return 'Reflect & capture'
    case 'capstone_prep':
      return 'Synthesis & artifacts'
    default:
      return 'Your turn'
  }
}
