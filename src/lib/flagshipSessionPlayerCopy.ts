import type { FlagshipSessionType } from '../data/learning/flagshipCourseSessions'

/** Short learner instruction shown under the session player header. */
export function flagshipSessionPlayerInstruction(type: FlagshipSessionType): string {
  switch (type) {
    case 'lesson':
      return 'Start here. Read the explanation, study the example, then complete the practice near the end.'
    case 'practice':
      return 'Apply what you learned. Complete the response task and use Save & Check for feedback.'
    case 'revision':
      return 'You are reviewing this module. Use this page to tighten weak areas. Need the teaching material? Go back to the lesson.'
    case 'recap':
      return 'You are consolidating this module. Compress what matters, then move on when you feel ready.'
    case 'reflection':
      return 'Pause and capture judgment in writing—tie it back to how you will behave on the next real task.'
    case 'capstone_prep':
      return 'Align evidence and deliverables with the capstone brief before you call preparation complete.'
    default:
      return 'Work through this chapter in order, then mark it complete when you meet the bar.'
  }
}
