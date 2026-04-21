/**
 * Module mastery checkpoints — practice-layer evidence tied to curriculum modules.
 */

import type { FlagshipCourseCurriculum, FlagshipCurriculumModule } from '../data/learning/flagshipCourseCurricula'
import { moduleAssessmentComplete } from './flagshipAssessmentCatalog'
import { moduleSessionStats } from './flagshipCourseProgressDerived'
import type { FlagshipSession } from '../data/learning/flagshipCourseSessions'

/** @deprecated Legacy single attestation id; prefer `${moduleId}::a0` / `::a1`. Kept for scripts and migrations. */
export function masteryCheckpointIdForModule(moduleId: string): string {
  return `${moduleId}-mastery`
}

/** Modules whose sessions are all complete but checkpoint evidence is not yet satisfied */
export function modulesPendingMasteryCheckpoints(
  curriculum: FlagshipCourseCurriculum,
  sessions: FlagshipSession[],
  completedSessionIds: Set<string>,
  checkpointDoneIds: Set<string>,
): FlagshipCurriculumModule[] {
  const out: FlagshipCurriculumModule[] = []
  for (const m of curriculum.modules) {
    if (moduleAssessmentComplete(m.id, checkpointDoneIds)) continue
    const stats = moduleSessionStats(m.id, sessions, completedSessionIds)
    if (stats.complete) out.push(m)
  }
  return out
}

export function masteryAttestationCopy(module: FlagshipCurriculumModule): string {
  return `I can summarize the central tradeoffs in “${module.title}” and name what evidence would change my next move.`
}
