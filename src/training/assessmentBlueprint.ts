/**
 * Assessment blueprint (v1) — rehearsal metadata for mock/exam-style quizzes.
 * Doc: not an external exam-body blueprint; supports internal coverage + timing honesty.
 */
export const ASSESSMENT_BLUEPRINT_SCHEMA_VERSION = 1 as const

export type BlueprintCoverageDomain = {
  label: string
  /** Optional relative emphasis 1–100 */
  weight?: number
}

export type BlueprintSection = {
  id: string
  title: string
  /** 1-based inclusive question sort_order bounds when present */
  question_sort_order_from?: number
  question_sort_order_to?: number
  objective_labels?: string[]
}

export type AssessmentBlueprintV1 = {
  version: typeof ASSESSMENT_BLUEPRINT_SCHEMA_VERSION
  blueprint_name: string
  /** mock_exam | stakes_rehearsal | mixed_review_bridge — informational */
  rehearsal_kind?: 'mock_exam' | 'stakes_rehearsal' | 'mixed_review_bridge' | 'diagnostic_style'
  coverage_domains: BlueprintCoverageDomain[]
  sections: BlueprintSection[]
  timing?: {
    suggested_duration_minutes?: number
    /** Optional per-section targets */
    section_minutes?: Record<string, number>
  }
  /** Shown in UI — must stay legal/trust-safe */
  trust_note?: string
}

export function parseAssessmentBlueprintJson(raw: unknown): AssessmentBlueprintV1 | null {
  if (!raw || typeof raw !== 'object') return null
  const o = raw as Partial<AssessmentBlueprintV1>
  if (o.version !== ASSESSMENT_BLUEPRINT_SCHEMA_VERSION) return null
  if (!o.blueprint_name?.trim()) return null
  if (!Array.isArray(o.coverage_domains)) return null
  if (!Array.isArray(o.sections)) return null
  return o as AssessmentBlueprintV1
}

export function buildSyntheticExamBlueprint(input: {
  quizTitle: string
  topic: string
  questionCount: number
  moduleTitles: string[]
  rehearsal_kind?: AssessmentBlueprintV1['rehearsal_kind']
}): AssessmentBlueprintV1 {
  const n = Math.max(1, input.questionCount)
  const suggested = Math.max(10, Math.round(n * 2.2))
  const half = Math.ceil(n / 2)
  const sections: BlueprintSection[] =
    n >= 4
      ? [
          {
            id: 'a',
            title: 'Section A — retrieval set',
            question_sort_order_from: 0,
            question_sort_order_to: half - 1,
          },
          {
            id: 'b',
            title: 'Section B — transfer set',
            question_sort_order_from: half,
            question_sort_order_to: n - 1,
          },
        ]
      : [
          {
            id: 'full',
            title: 'Full rehearsal set',
            question_sort_order_from: 0,
            question_sort_order_to: n - 1,
          },
        ]

  const coverage_domains: BlueprintCoverageDomain[] =
    input.moduleTitles.length > 0
      ? input.moduleTitles.slice(0, 8).map((label) => ({ label }))
      : [{ label: input.topic || 'Plan concepts' }]

  return {
    version: ASSESSMENT_BLUEPRINT_SCHEMA_VERSION,
    blueprint_name: input.quizTitle.trim() || `Exam rehearsal · ${input.topic}`,
    rehearsal_kind: input.rehearsal_kind ?? 'mock_exam',
    coverage_domains,
    sections,
    timing: {
      suggested_duration_minutes: suggested,
      section_minutes:
        sections.length === 2
          ? { a: Math.round(suggested * 0.45), b: Math.round(suggested * 0.55) }
          : { full: suggested },
    },
    trust_note:
      'Practice rehearsal using this plan’s graph — not an official exam blueprint. Combine with authoritative materials for credentials.',
  }
}

export function effectiveAssessmentBlueprint(input: {
  quizRowAssessmentBlueprintJson: unknown | null | undefined
  quizTitle: string
  topic: string
  questionCount: number
  moduleTitles: string[]
  forceSynthetic?: boolean
}): AssessmentBlueprintV1 {
  const parsed = parseAssessmentBlueprintJson(input.quizRowAssessmentBlueprintJson)
  if (parsed && !input.forceSynthetic) return parsed
  return buildSyntheticExamBlueprint({
    quizTitle: input.quizTitle,
    topic: input.topic,
    questionCount: input.questionCount,
    moduleTitles: input.moduleTitles,
  })
}
