/**
 * Assessment packs per module. **Flagship courses:** every module id resolves via `bespokeAssessmentTriple`
 * (anchor + mid + completion prestamped maps)—this file’s generator path is unused for flagship.
 * Non-flagship / unknown modules may still use curriculum-grounded generation below.
 */

import type { FlagshipCurriculumModule } from '../data/learning/flagshipCourseCurricula'
import type { FlagshipDepthStage } from '../data/learning/flagshipCurriculumTypes'
import type { FlagshipAssessmentItem } from './flagshipAssessmentTypes'
import { assessmentItemId } from './flagshipAssessmentTypes'
import { bespokeAssessmentTriple } from './flagshipAssessmentBespokeModules'

function stageAssessmentLens(stage: FlagshipDepthStage): { stem: string; mcqAlt: string } {
  switch (stage) {
    case 'foundations':
      return {
        stem: 'Early in the path—establish vocabulary, limits, and honest uncertainty before optimizing.',
        mcqAlt: 'I collected terminology but have not tied it to decisions or falsifiers yet.',
      }
    case 'applied_practice':
      return {
        stem: 'Applied stage—trade speed for disciplined reps under realistic constraints.',
        mcqAlt: 'I prioritized finishing tasks quickly over improving judgment under constraint.',
      }
    case 'professional_execution':
      return {
        stem: 'Professional execution—stakeholders, stakes, and clarity under pressure.',
        mcqAlt: 'I optimized for sounding confident rather than naming evidence and downside.',
      }
    case 'mastery_outputs':
      return {
        stem: 'Mastery stage—integrate artifacts someone else could review without you narrating.',
        mcqAlt: 'I labeled outputs “done” without a reviewer-ready evidence trail.',
      }
    default:
      return {
        stem: 'You face time pressure and incomplete information.',
        mcqAlt: 'I memorized terminology from the module without tying it to decisions.',
      }
  }
}

/**
 * Three items per module: conceptual MCQ, scenario judgment, applied confirmation — grounded in module text.
 * Hand-authored triples override generation for anchor modules (see flagshipAssessmentBespokeModules.ts).
 */
export function buildAssessmentItemsForModule(module: FlagshipCurriculumModule): FlagshipAssessmentItem[] {
  const bespoke = bespokeAssessmentTriple(module.id)
  if (bespoke) return bespoke

  const g0 = module.learningGoals[0] ?? module.summary
  const summarySnippet = module.summary.length > 140 ? `${module.summary.slice(0, 137)}…` : module.summary
  const practiceHint = module.practiceActivities[0]
    ? module.practiceActivities[0].length > 180
      ? `${module.practiceActivities[0].slice(0, 177)}…`
      : module.practiceActivities[0]
    : null

  const lens = stageAssessmentLens(module.stage)

  const mcqPrompt = `Which statement best reflects disciplined understanding of this module (“${module.title}”)?`

  const conceptualChoices = [
    `I can relate ${g0} to concrete decisions and name what would change my mind.`,
    lens.mcqAlt,
    `Success means finishing the readings quickly, regardless of application.`,
  ]

  const scenarioStem = `In a realistic setting for “${module.title}”, ${lens.stem}`

  const scenarioChoices = [
    `Pause to clarify the decision, evidence standard, and downside before acting; document assumptions.`,
    `Move fastest on the first plausible answer to avoid looking slow.`,
    `Defer entirely because uncertainty makes any step unjustified.`,
  ]

  const appliedBody = practiceHint
    ? `I can connect this module to a concrete application path (e.g. ${practiceHint}) and name one signal that would prove I should revise my approach.`
    : `I can name a realistic context for “${module.title}”, the first artifact I would produce, and what evidence would change my next step.`

  const items: FlagshipAssessmentItem[] = [
    {
      id: assessmentItemId(module.id, 0),
      kind: 'mcq',
      prompt: mcqPrompt,
      choices: conceptualChoices,
      correctIndex: 0,
      rationale: 'Depth means connecting claims to evidence and revision rules—not speed or jargon.',
    },
    {
      id: assessmentItemId(module.id, 1),
      kind: 'scenario_judgment',
      prompt: 'Choose the behavior that best matches professional judgment for this module.',
      scenario: `${scenarioStem} ${summarySnippet}`,
      choices: scenarioChoices,
      correctIndex: 0,
      rationale: 'Structured judgment under uncertainty is a recurring theme across Jifunze flagship tracks.',
    },
    {
      id: assessmentItemId(module.id, 2),
      kind: 'reflection_confirm',
      prompt: `Applied evidence · “${module.title}”`,
      attestation: appliedBody,
    },
  ]

  return items
}

export function allAssessmentItemIdsForCourse(moduleIds: string[]): string[] {
  const ids: string[] = []
  for (const mid of moduleIds) {
    ids.push(assessmentItemId(mid, 0), assessmentItemId(mid, 1), assessmentItemId(mid, 2))
  }
  return ids
}

export function moduleAssessmentComplete(moduleId: string, checkpointDone: Set<string>): boolean {
  return (
    checkpointDone.has(assessmentItemId(moduleId, 0)) &&
    checkpointDone.has(assessmentItemId(moduleId, 1)) &&
    checkpointDone.has(assessmentItemId(moduleId, 2))
  )
}

export function masteryEvidenceProgress(
  modules: FlagshipCurriculumModule[],
  checkpointDone: Set<string>,
): { done: number; total: number } {
  let total = 0
  let done = 0
  for (const m of modules) {
    const items = buildAssessmentItemsForModule(m)
    total += items.length
    for (const it of items) {
      if (checkpointDone.has(it.id)) done += 1
    }
  }
  return { done, total }
}

/** Legacy single checkbox id → maps to completing both generated items */
export function normalizeLegacyMasteryIds(ids: string[]): Set<string> {
  const set = new Set(ids)
  const out = new Set(set)
  for (const id of set) {
    if (id.endsWith('-mastery')) {
      const moduleId = id.replace(/-mastery$/, '')
      out.add(assessmentItemId(moduleId, 0))
      out.add(assessmentItemId(moduleId, 1))
      out.add(assessmentItemId(moduleId, 2))
    }
  }
  return out
}
