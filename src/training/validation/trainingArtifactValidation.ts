/**
 * Structural validation for training artifacts (CI + pre-flight).
 * Blocking issues must be fixed before persisting unsafe curriculum; warnings are advisory.
 */

import { assertValidKnowledgeSpec } from '../../knowledge/validateKnowledgeSpec'
import type { TrainingKnowledgeSpec } from '../../knowledge/types'
import { DERIVED_CONTENT_ASSET_TYPES } from '../../knowledge/derivedContentAssetTypes'
import { deriveDerivedAssetText } from '../../knowledge/deriveDerivedAsset'
import type { SeedModule } from '../seedStructure'
import { validateSeedOrThrow } from '../seedPayloadUtils'

export type ValidationIssue = {
  level: 'blocking' | 'warning'
  code: string
  message: string
}

function blocking(code: string, message: string): ValidationIssue {
  return { level: 'blocking', code, message }
}

function warning(code: string, message: string): ValidationIssue {
  return { level: 'warning', code, message }
}

/** Validate runtime JSON against TrainingKnowledgeSpec rules (throws internally → issues). */
export function validateTrainingKnowledgeSpecValue(spec: unknown): ValidationIssue[] {
  const issues: ValidationIssue[] = []
  if (!spec || typeof spec !== 'object') {
    issues.push(blocking('spec.not_object', 'Knowledge spec must be a JSON object.'))
    return issues
  }
  try {
    assertValidKnowledgeSpec(spec as TrainingKnowledgeSpec)
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e)
    issues.push(blocking('spec.invalid', msg))
    return issues
  }

  const s = spec as TrainingKnowledgeSpec
  if (!s.domain.objective?.trim()) {
    issues.push(warning('spec.domain.objective_empty', 'Knowledge spec domain.objective is empty — plans may lack a crisp outcome.'))
  }
  if (!s.revision_summary?.trim()) {
    issues.push(warning('spec.revision_summary_empty', 'Knowledge spec revision_summary is empty — revision UX may be thin.'))
  }

  for (const m of s.modules) {
    for (const q of m.quiz.questions) {
      if (!q.explanation?.trim()) {
        issues.push(
          warning(
            'spec.quiz.explanation_missing',
            `Module "${m.title}": checkpoint question "${(q.probes ?? '').slice(0, 48)}…" has no explanation — learner feedback quality may suffer.`,
          ),
        )
      }
      if (!['easy', 'medium', 'hard'].includes(q.difficulty)) {
        issues.push(warning('spec.quiz.difficulty', `Module "${m.title}": question has unexpected difficulty "${String(q.difficulty)}".`))
      }
    }
  }

  return issues
}

/** Validates structured seed modules (SeedModule[]) before RPC / demo persistence. */
export function validateTrainingSeedModules(modules: unknown, options?: { legacyRelaxedBounds?: boolean }): ValidationIssue[] {
  const issues: ValidationIssue[] = []
  if (!Array.isArray(modules)) {
    issues.push(blocking('seed.modules.not_array', 'Training seed modules must be an array.'))
    return issues
  }
  try {
    if (options?.legacyRelaxedBounds) {
      if (modules.length < 1) issues.push(blocking('seed.modules.empty', 'Training seed requires at least one module.'))
    } else {
      validateSeedOrThrow(modules as SeedModule[])
    }
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e)
    issues.push(blocking('seed.structure', msg))
  }
  if (issues.some((i) => i.level === 'blocking')) return issues

  for (const m of modules as SeedModule[]) {
    for (const les of m.lessons) {
      const fields: (keyof typeof les)[] = [
        'content',
        'lesson_summary',
        'practical_example',
        'action_exercise',
        'objectives',
      ]
      for (const f of fields) {
        const v = les[f]
        if (typeof v === 'string' && v.trim().length < 12) {
          issues.push(
            warning(
              'seed.lesson.section_thin',
              `Module "${m.title}" lesson "${les.title}": field ${String(f)} is very short — rich-lesson expectations may not be met.`,
            ),
          )
        }
      }
    }
    for (const qn of m.quiz.questions) {
      if (!qn.explanation?.trim()) {
        issues.push(
          warning(
            'seed.quiz.explanation_missing',
            `Module "${m.title}" checkpoint "${qn.prompt.slice(0, 52)}…" has no explanation text.`,
          ),
        )
      }
      if (qn.question_type === 'mcq' && Array.isArray(qn.options_json) && qn.options_json.length === 4) {
        const idx = Number.parseInt(qn.correct_answer, 10)
        if (idx !== 0) {
          issues.push(
            warning(
              'seed.quiz.correct_not_index_zero',
              `Module "${m.title}": MCQ correct_answer index is ${idx}; knowledge pipeline convention is index 0 in the spec (render layer may still work).`,
            ),
          )
        }
      }
    }
  }

  return issues
}

/** Shallow validation of RPC `p_seed` JSON (unknown / pre-persist). */
export function validatePlanSeedPayloadUnknown(p: unknown): ValidationIssue[] {
  const issues: ValidationIssue[] = []
  if (!p || typeof p !== 'object') {
    issues.push(blocking('p_seed.not_object', 'Plan seed payload must be an object.'))
    return issues
  }
  const o = p as Record<string, unknown>
  if (typeof o.title !== 'string' || !o.title.trim()) issues.push(blocking('p_seed.title', 'Plan seed requires non-empty title string.'))
  const mods = o.modules
  if (!Array.isArray(mods)) {
    issues.push(blocking('p_seed.modules', 'Plan seed requires modules array.'))
    return issues
  }
  return issues.concat(validateTrainingSeedModules(mods))
}

/** Ensure deterministic derivation succeeds for every supported asset type (blocking on throw). */
export function validateDerivedAssetDerivationSanity(sampleSpec: TrainingKnowledgeSpec): ValidationIssue[] {
  const issues: ValidationIssue[] = []
  for (const assetType of DERIVED_CONTENT_ASSET_TYPES) {
    try {
      deriveDerivedAssetText({
        spec: sampleSpec,
        assetType,
      })
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e)
      issues.push(blocking('derive.asset_type', `deriveDerivedAssetText failed for "${assetType}": ${msg}`))
    }
  }
  return issues
}

export function partitionIssues(issues: ValidationIssue[]): {
  blocking: ValidationIssue[]
  warnings: ValidationIssue[]
} {
  return {
    blocking: issues.filter((i) => i.level === 'blocking'),
    warnings: issues.filter((i) => i.level === 'warning'),
  }
}
