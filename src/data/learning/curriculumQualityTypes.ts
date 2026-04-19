import type { TeachingLibraryId } from '../teaching/teachingTypes'

/**
 * Cross-cutting curriculum hardening: competency, applied assessment, capstones, human+ethical threads, freshness.
 * This is product metadata for instruction and evolution—materials access is not an outcome guarantee.
 */

export type CompetencyStageId = 'entry' | 'beginner' | 'intermediate' | 'advanced' | 'capstone'

export type CompetencyStage = {
  id: CompetencyStageId
  label: string
  summary: string
  prerequisites: string[]
  youShouldNowBeAbleTo: string[]
  goodUnderstandingLooksLike: string[]
  commonFailureModes: string[]
}

export type ScenarioAssessmentPlan = {
  summary: string
  /** Scenario formats used across lessons/labs/readers—not isolated trivia. */
  formats: string[]
  /** Where learners should encounter judgment-heavy work in this library. */
  anchors: string[]
  /** Bridges to concrete practice surfaces already in product (labs, checkpoints, approve/revise patterns). */
  bridges: string[]
}

export type CapstonePlan = {
  title: string
  description: string
  portfolioArtifacts: string[]
  /** Claim-safe framing for what free starters vs deeper access unlock—skill-shaped, not random paywalls. */
  accessShaping: string
}

export type FreshnessCluster = {
  risingTopics: string[]
  toolAndPlatformClusters: string[]
  updatePrinciples: string
}

export type LibraryCurriculumQuality = {
  libraryId: TeachingLibraryId
  headline: string
  targetCapability: string
  freeToPaidSkillShape: {
    publicStarter: string
    signedInContinuity: string
    deeperMaterials: string
  }
  competencyStages: CompetencyStage[]
  scenarioAssessment: ScenarioAssessmentPlan
  capstone: CapstonePlan
  humanSkillsThreads: string[]
  ethicsDataLiteracyThreads: string[]
  freshness: FreshnessCluster
}
