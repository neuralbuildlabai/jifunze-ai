/** Shared curriculum shapes for flagship blueprints — imported by curricula data and generators without circular deps. */

export type FlagshipDepthStage = 'foundations' | 'applied_practice' | 'professional_execution' | 'mastery_outputs'

export type FlagshipCurriculumModule = {
  id: string
  order: number
  title: string
  stage: FlagshipDepthStage
  summary: string
  learningGoals: string[]
  practiceActivities: string[]
  revisionCheckpoint?: boolean
  recap?: boolean
  expectedOutputs?: string[]
}

export type FlagshipCourseCapstone = {
  title: string
  description: string
  deliverables: string[]
}

export type FlagshipCourseCurriculum = {
  slug: string
  estimatedDurationLabel: string
  depthLabel: string
  capstone: FlagshipCourseCapstone
  modules: FlagshipCurriculumModule[]
  reinforcementSignals: string[]
}
