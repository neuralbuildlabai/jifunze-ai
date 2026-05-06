/**
 * AI Essentials (Course 1) — ten learner-visible milestones (read-time display only).
 * See `How to use Claude/Course1_Progress_Milestones_Spec.md`.
 */

import type { FlagshipCourseCurriculum } from '../data/learning/flagshipCourseCurricula'
import type { FlagshipSession } from '../data/learning/flagshipCourseSessions'
import {
  aeCapstoneRubricAllCriteriaReadyPlus,
  completionSet,
  courseProgressFraction,
  moduleFullyComplete,
  type FlagshipCourseProgressState,
} from './flagshipCourseProgressDerived'

export const AI_ESSENTIALS_SLUG = 'ai-essentials'

/** Re-export for UI labels */
export { AI_ESSENTIALS_CAPSTONE_RUBRIC_IDS, type AeCapstoneRubricId, type AeCapstoneRubricLevel } from './flagshipCourseProgressDerived'

const MILESTONE_GROUPS: readonly (readonly string[])[] = [
  ['ae-m01'],
  ['ae-m02'],
  ['ae-m03', 'ae-m04'],
  ['ae-m05', 'ae-m06'],
  ['ae-m07', 'ae-m08'],
  ['ae-m09', 'ae-m10'],
  ['ae-m11'],
  ['ae-m12', 'ae-m13'],
  ['ae-m14', 'ae-m15'],
  ['ae-m16'],
]

const MILESTONE_PERCENTS = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100] as const

function groupComplete(
  group: readonly string[],
  sessions: FlagshipSession[],
  completed: Set<string>,
  state: FlagshipCourseProgressState,
): boolean {
  return group.every((mid) => moduleFullyComplete(mid, sessions, completed, state))
}

function milestone10Satisfied(
  sessions: FlagshipSession[],
  completed: Set<string>,
  state: FlagshipCourseProgressState,
): boolean {
  if (!groupComplete(['ae-m16'], sessions, completed, state)) return false
  return aeCapstoneRubricAllCriteriaReadyPlus(state)
}

/**
 * Learner-visible progress percent. For `ai-essentials`, applies ten-milestone table; else session fraction.
 */
export function getFlagshipCourseDisplayProgressPercent(
  courseSlug: string,
  curriculum: FlagshipCourseCurriculum | undefined,
  sessions: FlagshipSession[],
  state: FlagshipCourseProgressState,
): number {
  if (!curriculum || sessions.length === 0) return 0
  const completed = completionSet(state)
  if (courseSlug !== AI_ESSENTIALS_SLUG) {
    return Math.round(courseProgressFraction(sessions, completed) * 100)
  }

  let pct = 0
  for (let i = 0; i < MILESTONE_GROUPS.length - 1; i++) {
    const group = MILESTONE_GROUPS[i]!
    const target = MILESTONE_PERCENTS[i]!
    if (!groupComplete(group, sessions, completed, state)) break
    pct = target
  }
  const lastIdx = MILESTONE_GROUPS.length - 1
  const lastGroup = MILESTONE_GROUPS[lastIdx]!
  if (groupComplete(lastGroup, sessions, completed, state)) {
    pct = milestone10Satisfied(sessions, completed, state) ? 100 : 90
  }
  return pct
}

/** Learner-facing count of milestone bands satisfied (0–10). Matches `getFlagshipCourseDisplayProgressPercent` bands. */
export function getAiEssentialsMilestonesReachedCount(displayPercent: number): number {
  if (displayPercent <= 0) return 0
  if (displayPercent >= 100) return 10
  return Math.round(displayPercent / 10)
}

/**
 * Next action toward the next 10% band (no fake progress — uses real completion + rubric state).
 */
export function getAiEssentialsNextMilestoneHint(
  curriculum: FlagshipCourseCurriculum | undefined,
  sessions: FlagshipSession[],
  state: FlagshipCourseProgressState,
): string {
  if (!curriculum || sessions.length === 0) {
    return 'Start with Module 1—work through it step by step.'
  }
  const completed = completionSet(state)
  for (let i = 0; i < MILESTONE_GROUPS.length - 1; i++) {
    const group = MILESTONE_GROUPS[i]!
    if (!groupComplete(group, sessions, completed, state)) {
      return nextIncompleteGroupHint(i)
    }
  }
  const last = MILESTONE_GROUPS.length - 1
  const lastGroup = MILESTONE_GROUPS[last]!
  if (!groupComplete(lastGroup, sessions, completed, state)) {
    return 'Finish Module 16 (sessions, practice checkpoints, quiz), then complete the capstone rubric self-check in the app for full completion.'
  }
  if (!milestone10Satisfied(sessions, completed, state)) {
    return 'Module 16 is done—finish the capstone rubric self-check in the app when every row is Ready or Strong.'
  }
  return 'All milestones are complete.'
}

function nextIncompleteGroupHint(groupIndex: number): string {
  switch (groupIndex) {
    case 0:
      return 'Next: complete Module 1 (lesson, practice, quiz, and checkpoints).'
    case 1:
      return 'Next: complete Module 2 end-to-end.'
    case 2:
      return 'Next: complete Modules 3 and 4 end-to-end.'
    case 3:
      return 'Next: complete Modules 5 and 6 end-to-end.'
    case 4:
      return 'Next: complete Modules 7 and 8 end-to-end.'
    case 5:
      return 'Next: complete Modules 9 and 10 end-to-end.'
    case 6:
      return 'Next: complete Module 11 end-to-end.'
    case 7:
      return 'Next: complete Modules 12 and 13 end-to-end.'
    case 8:
      return 'Next: complete Modules 14 and 15 end-to-end.'
    default:
      return 'Continue the next module in order.'
  }
}
