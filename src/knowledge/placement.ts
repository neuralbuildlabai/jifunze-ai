import type { LearnerLevel, TrainingKnowledgeSpec } from './types'
import type { ComputedPlacement, KnowledgePlacementMetadata, LearnerPlacementInput } from './placementTypes'

const GAP_BY_Q = ['c1', 'c2', 'c3', 'c4', 'c5'] as const

function normLevel(skillLevel: string | null | undefined): LearnerLevel {
  const s = (skillLevel ?? 'beginner').toLowerCase()
  if (s.includes('adv')) return 'advanced'
  if (s.includes('inter')) return 'intermediate'
  return 'beginner'
}

function clamp01(n: number): number {
  return Math.max(0, Math.min(1, n))
}

function scoreToLevel(score01: number): LearnerLevel {
  if (score01 < 0.38) return 'beginner'
  if (score01 < 0.72) return 'intermediate'
  return 'advanced'
}

/**
 * Combines optional self-confidence and optional diagnostic item responses into a placement decision.
 * Correct answers are always option index 0.
 */
export function computePlacement(input: LearnerPlacementInput): ComputedPlacement {
  const stated = normLevel(input.statedSkillLevel)
  const conf = input.selfConfidence1To5
  const picks = input.diagnosticOptionIndices?.filter((n) => typeof n === 'number') ?? []

  let diagnosticScorePercent: number | null = null
  const foundationGapConceptIds: string[] = []

  if (picks.length > 0) {
    let correct = 0
    for (let i = 0; i < picks.length; i += 1) {
      const ok = picks[i] === 0
      if (ok) correct += 1
      else if (i < GAP_BY_Q.length) foundationGapConceptIds.push(GAP_BY_Q[i]!)
    }
    diagnosticScorePercent = Math.round((correct / picks.length) * 1000) / 10
  }

  const conf01 =
    conf != null && !Number.isNaN(conf) ? clamp01((Math.round(conf) - 1) / 4) : null

  const diag01 = diagnosticScorePercent != null ? diagnosticScorePercent / 100 : null

  let blend01: number
  if (diag01 != null && conf01 != null) {
    blend01 = 0.62 * diag01 + 0.38 * conf01
  } else if (diag01 != null) {
    blend01 = diag01
  } else if (conf01 != null) {
    blend01 = conf01
  } else {
    blend01 =
      stated === 'advanced' ? 0.82 : stated === 'intermediate' ? 0.55 : 0.28
  }

  let recommendedLevel = scoreToLevel(blend01)

  /** If stated is lower than recommended, prefer the more conservative (safer) level. */
  const rank = (l: LearnerLevel) => (l === 'beginner' ? 0 : l === 'intermediate' ? 1 : 2)
  if (rank(stated) < rank(recommendedLevel)) {
    recommendedLevel = stated
  }

  const skippedModuleSortOrders: number[] = []

  const strong = diagnosticScorePercent != null && diagnosticScorePercent >= 85
  const noEarlyGaps = !foundationGapConceptIds.some((id) => id === 'c1' || id === 'c2')
  if (recommendedLevel === 'advanced' && strong && noEarlyGaps) {
    skippedModuleSortOrders.push(0)
  }

  if (recommendedLevel === 'beginner' && foundationGapConceptIds.some((id) => id === 'c3' || id === 'c4')) {
    /** Reinforce integration without removing foundations */
    while (skippedModuleSortOrders.length) skippedModuleSortOrders.pop()
  }

  const rationaleParts: string[] = []
  if (diagnosticScorePercent != null) {
    rationaleParts.push(`Diagnostic score ≈ ${diagnosticScorePercent}% (${picks.length} items).`)
  }
  if (conf != null) {
    rationaleParts.push(`Self-confidence ${conf}/5.`)
  }
  if (foundationGapConceptIds.length) {
    rationaleParts.push(`Foundation gaps flagged on: ${foundationGapConceptIds.join(', ')}.`)
  }
  if (skippedModuleSortOrders.length) {
    rationaleParts.push(
      `Starting later in the arc: skipping module(s) at order ${skippedModuleSortOrders.join(', ')} (foundations already strong).`,
    )
  }
  rationaleParts.push(`Recommended starting level: ${recommendedLevel}.`)

  return {
    recommendedLevel,
    diagnosticScorePercent,
    foundationGapConceptIds: [...new Set(foundationGapConceptIds)],
    skippedModuleSortOrders,
    rationale: rationaleParts.join(' '),
  }
}

function filterModulesAndLessons(
  spec: TrainingKnowledgeSpec,
  placement: ComputedPlacement,
): { spec: TrainingKnowledgeSpec; appliedSkips: number[] } {
  const skipMods = new Set(placement.skippedModuleSortOrders)
  const initialModules = spec.modules.map((m) => ({
    ...m,
    lessons: m.lessons.map((l) => ({ ...l })),
    quiz: {
      ...m.quiz,
      questions: m.quiz.questions.map((q) => ({ ...q })),
    },
  }))

  let modules = initialModules.filter((m) => !skipMods.has(m.sort_order)).filter((m) => m.lessons.length >= 3)

  let appliedSkips = [...placement.skippedModuleSortOrders]
  if (modules.length < 3) {
    /** Placement tried to remove too much — keep original modules. */
    modules = initialModules
    appliedSkips = []
  }

  modules = modules.map((m, mi) => ({
    ...m,
    sort_order: mi,
    lessons: m.lessons.map((l, li) => ({ ...l, sort_order: li })),
    quiz: {
      ...m.quiz,
      questions: m.quiz.questions.map((qn) => ({ ...qn })),
    },
  }))

  return { spec: { ...spec, modules }, appliedSkips }
}

export function applyPlacementToKnowledgeSpec(
  spec: TrainingKnowledgeSpec,
  placement: ComputedPlacement,
  meta: Omit<KnowledgePlacementMetadata, keyof ComputedPlacement>,
): TrainingKnowledgeSpec {
  const base: TrainingKnowledgeSpec = JSON.parse(JSON.stringify(spec)) as TrainingKnowledgeSpec
  base.domain.learner_level = placement.recommendedLevel

  const gapLine =
    placement.foundationGapConceptIds.length > 0
      ? `\n\n**Foundation focus:** revisit concepts ${placement.foundationGapConceptIds.join(
          ', ',
        )} with extra reps and a written example before advancing.`
      : ''

  const placementLine = `\n\n**Placement:** ${placement.rationale}`

  base.revision_summary = `${base.revision_summary}${gapLine}${placementLine}`

  const { spec: adjusted, appliedSkips } = filterModulesAndLessons(base, placement)

  adjusted.metadata_json = {
    ...(base.metadata_json ?? {}),
    placement: {
      ...placement,
      skippedModuleSortOrders: appliedSkips,
      rationale:
        appliedSkips.length === placement.skippedModuleSortOrders.length
          ? placement.rationale
          : `${placement.rationale} (Module skips were relaxed to preserve a complete path.)`,
      stated_skill_level: meta.stated_skill_level,
      self_confidence_1_5: meta.self_confidence_1_5,
      include_diagnostic_quiz: meta.include_diagnostic_quiz,
    } satisfies KnowledgePlacementMetadata,
  }

  return adjusted
}

export function buildPlacementMetadata(
  input: LearnerPlacementInput,
  computed: ComputedPlacement,
): KnowledgePlacementMetadata {
  return {
    ...computed,
    stated_skill_level: input.statedSkillLevel,
    self_confidence_1_5: input.selfConfidence1To5,
    include_diagnostic_quiz: input.includeDiagnosticQuiz,
  }
}
