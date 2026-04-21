/**
 * Institution-grade checkpoint items — stable ids, auditable, calm UI.
 * Ids: `${moduleId}::a${index}` (index 0-based within module).
 */

export type FlagshipAssessmentKind = 'mcq' | 'scenario_judgment' | 'reflection_confirm'

export type FlagshipAssessmentItemBase = {
  /** Stable across versions for the same module + position; audit key */
  id: string
  kind: FlagshipAssessmentKind
  prompt: string
}

export type FlagshipAssessmentMcq = FlagshipAssessmentItemBase & {
  kind: 'mcq'
  choices: string[]
  /** Index of best-aligned answer (not “trick” wrong answers—discriminating judgment) */
  correctIndex: number
  rationale?: string
}

export type FlagshipAssessmentScenario = FlagshipAssessmentItemBase & {
  kind: 'scenario_judgment'
  scenario: string
  choices: string[]
  correctIndex: number
  rationale?: string
}

export type FlagshipAssessmentReflection = FlagshipAssessmentItemBase & {
  kind: 'reflection_confirm'
  attestation: string
}

export type FlagshipAssessmentItem = FlagshipAssessmentMcq | FlagshipAssessmentScenario | FlagshipAssessmentReflection

export function assessmentItemId(moduleId: string, index: number): string {
  return `${moduleId}::a${index}`
}
