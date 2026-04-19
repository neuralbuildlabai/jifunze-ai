import { READINESS_ARCHITECTURE_VERSION } from './readinessArchitecture'
import type { TrainingKnowledgeSpec } from './types'

export class KnowledgeSpecValidationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'KnowledgeSpecValidationError'
  }
}

export function assertValidKnowledgeSpec(spec: TrainingKnowledgeSpec): void {
  if (spec.version !== 1) {
    throw new KnowledgeSpecValidationError('Unsupported knowledge spec version.')
  }
  if (
    spec.readiness_architecture &&
    spec.readiness_architecture.version !== READINESS_ARCHITECTURE_VERSION
  ) {
    throw new KnowledgeSpecValidationError('Unsupported readiness architecture version.')
  }
  const t = spec.domain.topic?.trim()
  if (!t) {
    throw new KnowledgeSpecValidationError('Knowledge spec requires domain.topic.')
  }
  if (!spec.modules.length) {
    throw new KnowledgeSpecValidationError('Knowledge spec requires at least one module.')
  }
  const conceptIds = new Set(spec.concepts.map((c) => c.id))
  for (const c of spec.concepts) {
    for (const d of c.depends_on) {
      if (!conceptIds.has(d)) {
        throw new KnowledgeSpecValidationError(`Unknown concept dependency: ${d}`)
      }
    }
  }
  for (const m of spec.modules) {
    if (!m.lessons.length) {
      throw new KnowledgeSpecValidationError(`Module "${m.title}" has no lessons.`)
    }
    if (!m.quiz.questions.length) {
      throw new KnowledgeSpecValidationError(`Module "${m.title}" has no checkpoint questions.`)
    }
    for (const q of m.quiz.questions) {
      if (q.options.length !== 4) {
        throw new KnowledgeSpecValidationError('Each quiz blueprint must have exactly 4 options.')
      }
    }
    for (const l of m.lessons) {
      for (const id of l.concept_ids) {
        if (!conceptIds.has(id)) {
          throw new KnowledgeSpecValidationError(`Lesson references unknown concept: ${id}`)
        }
      }
    }
  }
}
