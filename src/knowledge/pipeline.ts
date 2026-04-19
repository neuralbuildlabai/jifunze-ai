import { buildDiagnosticQuizSeed } from './diagnosticQuiz'
import {
  applyPlacementToKnowledgeSpec,
  buildPlacementMetadata,
  computePlacement,
} from './placement'
import type { LearnerPlacementInput } from './placementTypes'
import { buildHeuristicKnowledgeSpec } from './heuristicKnowledgeSpec'
import { renderKnowledgeSpecToSeedModules } from './renderKnowledgeSpecToSeed'
import { assertValidKnowledgeSpec } from './validateKnowledgeSpec'
import type { TrainingKnowledgeSpec } from './types'
import { normalizeLessonForPayload, validateSeedOrThrow } from '../training/seedPayloadUtils'
import { planSupplementalQuizzesForRpc } from './planSupplementalQuizzes'
import type { SeedModule } from '../training/seedStructure'

export type PlanSeedBuildInput = {
  title: string
  topic: string | null
  objective: string | null
  skillLevel: string | null
  durationLabel: string | null
  status: string
  /** Placement + optional diagnostic quiz. Omitted = legacy single skill level path. */
  placement?: LearnerPlacementInput
}

export type PlanSeedBundle = {
  p_seed: Record<string, unknown>
  knowledgeSpec: TrainingKnowledgeSpec
  /** For persistence (creator row). */
  placementRecord?: {
    recommendedLevel: string
    diagnosticScorePercent: number | null
    foundationGapConceptIds: string[]
    skippedModuleSortOrders: number[]
    placementSource: 'wizard'
    placementJson: Record<string, unknown>
  }
}

function mapModulesToPayload(modules: SeedModule[]) {
  return modules.map((m) => ({
    title: m.title,
    description: m.description,
    module_goal: m.module_goal,
    why_it_matters: m.why_it_matters,
    sort_order: m.sort_order,
    lessons: m.lessons.map(normalizeLessonForPayload),
    quiz: {
      title: m.quiz.title,
      description: m.quiz.description,
      sort_order: m.quiz.sort_order,
      questions: m.quiz.questions.map((qn) => ({
        prompt: qn.prompt,
        question_type: qn.question_type,
        options_json: qn.options_json,
        correct_answer: qn.correct_answer,
        sort_order: qn.sort_order,
        explanation: qn.explanation ?? null,
        difficulty: qn.difficulty ?? null,
        source_lesson_index:
          qn.source_lesson_index === undefined ? null : qn.source_lesson_index,
      })),
    },
  }))
}

function mapDiagnosticQuizToPayload(quiz: ReturnType<typeof buildDiagnosticQuizSeed>) {
  return {
    title: quiz.title,
    description: quiz.description,
    sort_order: quiz.sort_order,
    questions: quiz.questions.map((qn) => ({
      prompt: qn.prompt,
      question_type: qn.question_type,
      options_json: qn.options_json,
      correct_answer: qn.correct_answer,
      sort_order: qn.sort_order,
      explanation: qn.explanation ?? null,
      difficulty: qn.difficulty ?? null,
      source_lesson_index: null,
    })),
  }
}

function buildPSeedCore(input: {
  title: string
  topic: string | null
  objective: string | null
  skillLevelForRow: string | null
  durationLabel: string | null
  status: string
  expected_outcomes: string
  modulesPayload: ReturnType<typeof mapModulesToPayload>
  diagnosticQuizPayload: ReturnType<typeof mapDiagnosticQuizToPayload> | null
  /** Plan-level recap / mixed / exam-practice quizzes (architecture Part 14). */
  planSupplementalQuizzesPayload?: Record<string, unknown>[] | null
}): Record<string, unknown> {
  const p: Record<string, unknown> = {
    title: input.title.trim(),
    topic: input.topic?.trim() ?? null,
    objective: input.objective?.trim() ?? null,
    skill_level: input.skillLevelForRow?.trim() ?? null,
    duration_label: input.durationLabel?.trim() ?? null,
    status: input.status,
    expected_outcomes: input.expected_outcomes,
    modules: input.modulesPayload,
  }
  if (input.diagnosticQuizPayload) {
    p.diagnostic_quiz = input.diagnosticQuizPayload
  }
  const sup = input.planSupplementalQuizzesPayload
  if (sup && sup.length > 0) {
    p.plan_supplemental_quizzes = sup
  }
  return p
}

function buildPlanSeedBundleHeuristic(input: PlanSeedBuildInput): PlanSeedBundle {
  const placementInput: LearnerPlacementInput = input.placement ?? {
    statedSkillLevel: input.skillLevel,
    selfConfidence1To5: null,
    diagnosticOptionIndices: null,
    includeDiagnosticQuiz: false,
  }

  const computed = computePlacement(placementInput)

  let knowledgeSpec = buildHeuristicKnowledgeSpec({
    planTitle: input.title,
    topic: input.topic,
    objective: input.objective,
    skillLevel: computed.recommendedLevel,
    durationLabel: input.durationLabel,
  })
  knowledgeSpec = applyPlacementToKnowledgeSpec(knowledgeSpec, computed, {
    stated_skill_level: placementInput.statedSkillLevel,
    self_confidence_1_5: placementInput.selfConfidence1To5,
    include_diagnostic_quiz: placementInput.includeDiagnosticQuiz,
  })
  assertValidKnowledgeSpec(knowledgeSpec)

  const modules = renderKnowledgeSpecToSeedModules(knowledgeSpec)
  validateSeedOrThrow(modules)

  const topic = (input.topic ?? input.title).trim() || 'your topic'
  const objective = (input.objective ?? 'apply the ideas in real work').trim()

  const diagnosticQuiz =
    placementInput.includeDiagnosticQuiz
      ? buildDiagnosticQuizSeed({ topic, objective })
      : null

  const expected_outcomes = [
    `Learner level: ${knowledgeSpec.domain.learner_level} (${String(knowledgeSpec.metadata_json?.cognitive_profile ?? 'structured')}).`,
    `Stated expectation: ${placementInput.statedSkillLevel ?? 'not specified'}.`,
    `Primary objective: ${knowledgeSpec.domain.objective}.`,
    `Prerequisites: ${knowledgeSpec.domain.prerequisites.join(' · ')}.`,
    `Placement: ${computed.rationale}`,
    `Revision anchor:\n${knowledgeSpec.revision_summary}`,
  ].join('\n\n')

  const supplemental = planSupplementalQuizzesForRpc(knowledgeSpec)

  const p_seed = buildPSeedCore({
    title: input.title,
    topic: input.topic,
    objective: input.objective,
    skillLevelForRow: computed.recommendedLevel,
    durationLabel: input.durationLabel,
    status: input.status,
    expected_outcomes,
    modulesPayload: mapModulesToPayload(modules),
    diagnosticQuizPayload: diagnosticQuiz ? mapDiagnosticQuizToPayload(diagnosticQuiz) : null,
    planSupplementalQuizzesPayload: supplemental,
  })

  return {
    p_seed,
    knowledgeSpec,
    placementRecord: {
      recommendedLevel: computed.recommendedLevel,
      diagnosticScorePercent: computed.diagnosticScorePercent,
      foundationGapConceptIds: computed.foundationGapConceptIds,
      skippedModuleSortOrders: (knowledgeSpec.metadata_json?.placement as { skippedModuleSortOrders?: number[] })
        ?.skippedModuleSortOrders ?? computed.skippedModuleSortOrders,
      placementSource: 'wizard',
      placementJson: (knowledgeSpec.metadata_json?.placement ?? {}) as Record<string, unknown>,
    },
  }
}

/**
 * Synchronous pipeline used by demo/E2E and as fallback: **knowledge spec → validated seed JSON**.
 */
export function buildPlanSeedBundleSync(input: PlanSeedBuildInput): PlanSeedBundle {
  return buildPlanSeedBundleHeuristic(input)
}

/** Optional remote knowledge spec (same JSON shape). Returns null when not configured or on non-OK response. */
export async function tryFetchRemoteKnowledgeSpec(input: {
  title: string
  topic: string | null
  objective: string | null
  skillLevel: string | null
  durationLabel: string | null
}): Promise<TrainingKnowledgeSpec | null> {
  const url = (import.meta.env.VITE_TRAINING_KNOWLEDGE_URL as string | undefined)?.trim()
  if (!url) return null

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      plan_title: input.title,
      topic: input.topic,
      objective: input.objective,
      skill_level: input.skillLevel,
      duration_label: input.durationLabel,
    }),
  })
  if (!res.ok) {
    throw new Error(`Knowledge engine HTTP ${res.status}`)
  }
  const json = (await res.json()) as TrainingKnowledgeSpec
  assertValidKnowledgeSpec(json)
  return json
}

/**
 * Live path: remote spec when `VITE_TRAINING_KNOWLEDGE_URL` is set; otherwise heuristic (never demo storage).
 * Remote specs do not run client-side module filtering (server should own placement); wizard metadata is still attached for the creator row when heuristic fallback runs.
 */
export async function buildPlanSeedBundleAsync(input: PlanSeedBuildInput): Promise<PlanSeedBundle> {
  const remote = await tryFetchRemoteKnowledgeSpec({
    title: input.title.trim(),
    topic: input.topic,
    objective: input.objective,
    skillLevel: input.skillLevel,
    durationLabel: input.durationLabel,
  }).catch((e) => {
    throw e
  })
  if (remote) {
    const modules = renderKnowledgeSpecToSeedModules(remote)
    validateSeedOrThrow(modules)

    const placementInput: LearnerPlacementInput = input.placement ?? {
      statedSkillLevel: input.skillLevel,
      selfConfidence1To5: null,
      diagnosticOptionIndices: null,
      includeDiagnosticQuiz: false,
    }
    const computed = computePlacement(placementInput)

    const topic = (input.topic ?? input.title).trim() || 'your topic'
    const objective = (input.objective ?? 'apply the ideas in real work').trim()
    const diagnosticQuiz =
      placementInput.includeDiagnosticQuiz
        ? buildDiagnosticQuizSeed({ topic, objective })
        : null

    const expected_outcomes = [
      `Learner level: ${remote.domain.learner_level}.`,
      `Stated expectation: ${placementInput.statedSkillLevel ?? 'not specified'}.`,
      `Primary objective: ${remote.domain.objective}.`,
      `Prerequisites: ${remote.domain.prerequisites.join(' · ')}.`,
      `Placement note (wizard): ${computed.rationale}`,
      `Revision anchor:\n${remote.revision_summary}`,
    ].join('\n\n')

    const supplemental = planSupplementalQuizzesForRpc(remote)

    const p_seed = buildPSeedCore({
      title: input.title,
      topic: input.topic,
      objective: input.objective,
      skillLevelForRow: input.skillLevel?.trim() ?? computed.recommendedLevel,
      durationLabel: input.durationLabel,
      status: input.status,
      expected_outcomes,
      modulesPayload: mapModulesToPayload(modules),
      diagnosticQuizPayload: diagnosticQuiz ? mapDiagnosticQuizToPayload(diagnosticQuiz) : null,
      planSupplementalQuizzesPayload: supplemental,
    })

    return {
      p_seed,
      knowledgeSpec: remote,
      placementRecord: {
        recommendedLevel: computed.recommendedLevel,
        diagnosticScorePercent: computed.diagnosticScorePercent,
        foundationGapConceptIds: computed.foundationGapConceptIds,
        skippedModuleSortOrders: computed.skippedModuleSortOrders,
        placementSource: 'wizard',
        placementJson: buildPlacementMetadata(placementInput, computed) as unknown as Record<string, unknown>,
      },
    }
  }
  return buildPlanSeedBundleHeuristic(input)
}

/** JSON payload for `create_training_plan_from_seed` RPC — knowledge-grounded (heuristic or remote). */
export function buildTrainingPlanSeedPayload(input: PlanSeedBuildInput): Record<string, unknown> {
  return buildPlanSeedBundleSync(input).p_seed
}
