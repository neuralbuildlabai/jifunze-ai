import type { FlagshipCourseCurriculum } from '@/data/learning/flagshipCourseCurricula'
import type { FlagshipSession } from '@/data/learning/flagshipCourseSessions'
import type { FlagshipCourseProgressApi } from '@/hooks/useFlagshipCourseProgress'

export type SupportMaterialKind = 'module_summary' | 'revision_pack' | 'capstone_prep' | 'checkpoint_review'

export type FlagshipSupportMaterial = {
  id: string
  title: string
  description: string
  kind: SupportMaterialKind
  /** Module this sheet belongs to (not set for capstone prep). */
  moduleId?: string
}

/** Declarative list — extend per course over time. */
export function supportMaterialsForCourse(_courseSlug: string, curriculum: FlagshipCourseCurriculum): FlagshipSupportMaterial[] {
  const mats: FlagshipSupportMaterial[] = curriculum.modules.map((m) => ({
    id: `module-${m.id}-summary`,
    title: `${m.title} · summary sheet`,
    description: 'Concise recap of outcomes and vocabulary for offline review.',
    kind: 'module_summary',
    moduleId: m.id,
  }))
  mats.push({
    id: 'capstone-prep-guide',
    title: 'Capstone preparation guide',
    description: 'Aligns deliverables with the brief when prep opens — printable reference.',
    kind: 'capstone_prep',
  })
  return mats
}

function moduleReached(completed: Set<string>, sessions: FlagshipSession[], moduleId: string): boolean {
  return sessions.some((s) => s.moduleId === moduleId && completed.has(s.id))
}

export function isSupportMaterialUnlocked(
  material: FlagshipSupportMaterial,
  progress: FlagshipCourseProgressApi,
  sessions: FlagshipSession[],
): boolean {
  const { completed, capstonePrepAccessible } = progress
  if (material.kind === 'capstone_prep') {
    return capstonePrepAccessible
  }
  if (material.moduleId) {
    return moduleReached(completed, sessions, material.moduleId)
  }
  return false
}
