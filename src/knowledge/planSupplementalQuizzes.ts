import type { QuizKnowledgeBlueprint, TrainingKnowledgeSpec } from './types'
import { buildSyntheticExamBlueprint } from '../training/assessmentBlueprint'

export type PlanSupplementalQuizSeed = {
  quiz_kind: 'recap_checkpoint' | 'mixed_review' | 'exam_practice'
  title: string
  description: string
  sort_order: number
  /** Optional AssessmentBlueprintV1 — persisted when RPC/supporting stores include column */
  assessment_blueprint_json?: Record<string, unknown>
  questions: Array<{
    prompt: string
    question_type: 'mcq'
    options_json: string[]
    correct_answer: string
    sort_order: number
    explanation?: string | null
    difficulty?: string | null
    source_lesson_index?: number | null
  }>
}

function cloneQuestion(q: QuizKnowledgeBlueprint, sortOrder: number): PlanSupplementalQuizSeed['questions'][0] {
  return {
    prompt: q.probes,
    question_type: 'mcq',
    options_json: [...q.options],
    correct_answer: '0',
    sort_order: sortOrder,
    explanation: q.explanation,
    difficulty: q.difficulty,
    source_lesson_index: null,
  }
}

/**
 * Deterministic plan-level quizzes from the knowledge graph (synthetic mixed sets).
 * Inserted after module checkpoints — enables recap / mixed review / exam-practice framing without second RPC shape.
 */
export function buildPlanSupplementalQuizSeeds(spec: TrainingKnowledgeSpec): PlanSupplementalQuizSeed[] {
  const mods = [...spec.modules].sort((a, b) => a.sort_order - b.sort_order)
  if (mods.length === 0) return []

  const blueprint = spec.readiness_architecture?.supplemental_quiz_blueprint ?? [
    'recap_checkpoint',
    'mixed_review',
    'exam_practice',
  ]

  const topic = spec.domain.topic
  const out: PlanSupplementalQuizSeed[] = []

  const recapQs: PlanSupplementalQuizSeed['questions'] = []
  mods.forEach((m) => {
    const qs = [...m.quiz.questions].sort((a, b) => a.sort_order - b.sort_order)
    const pick = qs.length ? qs[qs.length - 1] : null
    if (pick) recapQs.push(cloneQuestion(pick, recapQs.length))
  })

  const mixedQs: PlanSupplementalQuizSeed['questions'] = []
  const targetMixed = Math.min(
    spec.readiness_architecture?.mixed_review?.target_question_count ?? 5,
    Math.max(3, mods.length + 2),
  )
  let i = 0
  while (mixedQs.length < targetMixed) {
    const m = mods[i % mods.length]
    const qs = [...m.quiz.questions].sort((a, b) => a.sort_order - b.sort_order)
    const pick = qs[mixedQs.length % qs.length] ?? qs[0]
    if (!pick) break
    mixedQs.push(cloneQuestion(pick, mixedQs.length))
    i += 1
    if (i > 50) break
  }

  const examQs: PlanSupplementalQuizSeed['questions'] = []
  const pool: QuizKnowledgeBlueprint[] = mods.flatMap((m) => m.quiz.questions)
  const hardFirst = [...pool].filter((q) => q.difficulty === 'hard')
  const rest = [...pool].filter((q) => q.difficulty !== 'hard')
  const ordered = [...hardFirst, ...rest]
  const examTarget = Math.min(6, Math.max(4, Math.min(ordered.length, 6)))
  for (let k = 0; k < examTarget; k += 1) {
    const pick = ordered[k % ordered.length]
    if (!pick) break
    examQs.push(cloneQuestion(pick, examQs.length))
  }

  const pushIf = (kind: PlanSupplementalQuizSeed['quiz_kind'], seed: PlanSupplementalQuizSeed) => {
    if (blueprint.includes(kind) && seed.questions.length > 0) out.push(seed)
  }

  pushIf('recap_checkpoint', {
    quiz_kind: 'recap_checkpoint',
    title: `Recap checkpoint · ${topic}`,
    description:
      'Fast retrieval across modules — reinforces end-of-module signals before mixed practice.',
    sort_order: 100,
    questions: recapQs.slice(0, 8),
  })

  const moduleTitles = mods.map((m) => m.title)

  pushIf('mixed_review', {
    quiz_kind: 'mixed_review',
    title: `Mixed-topic review · ${topic}`,
    description:
      'Interleaved items spanning modules — closer to transfer than repeated single-topic drills.',
    sort_order: 101,
    questions: mixedQs,
    assessment_blueprint_json: buildSyntheticExamBlueprint({
      quizTitle: `Mixed-topic review · ${topic}`,
      topic,
      questionCount: mixedQs.length,
      moduleTitles,
      rehearsal_kind: 'mixed_review_bridge',
    }) as unknown as Record<string, unknown>,
  })

  pushIf('exam_practice', {
    quiz_kind: 'exam_practice',
    title: `Exam-style practice · ${topic}`,
    description:
      'Higher-stakes framing (architecture hook for timers, weighted scoring, item banks later). Not a full certification simulation.',
    sort_order: 102,
    questions: examQs,
    assessment_blueprint_json: buildSyntheticExamBlueprint({
      quizTitle: `Exam-style practice · ${topic}`,
      topic,
      questionCount: examQs.length,
      moduleTitles,
      rehearsal_kind: 'mock_exam',
    }) as unknown as Record<string, unknown>,
  })

  return out
}

/** RPC-ready JSON arrays for `create_training_plan_from_seed.plan_supplemental_quizzes`. */
export function planSupplementalQuizzesForRpc(spec: TrainingKnowledgeSpec): Record<string, unknown>[] {
  return buildPlanSupplementalQuizSeeds(spec).map((s) => ({
    quiz_kind: s.quiz_kind,
    title: s.title,
    description: s.description,
    sort_order: s.sort_order,
    ...(s.assessment_blueprint_json ? { assessment_blueprint_json: s.assessment_blueprint_json } : {}),
    questions: s.questions.map((q) => ({
      prompt: q.prompt,
      question_type: q.question_type,
      options_json: q.options_json,
      correct_answer: q.correct_answer,
      sort_order: q.sort_order,
      explanation: q.explanation ?? null,
      difficulty: q.difficulty ?? null,
      source_lesson_index: q.source_lesson_index ?? null,
    })),
  }))
}
