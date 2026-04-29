/**
 * Serialize / parse AI Essentials capstone rubric for Supabase JSONB and backwards-compatible local JSON.
 */

import {
  AI_ESSENTIALS_CAPSTONE_RUBRIC_IDS,
  type AeCapstoneRubricId,
  type AeCapstoneRubricLevel,
  type AeCapstoneRubricSelfGrade,
} from './flagshipCourseProgressDerived'

const LEVELS = new Set<AeCapstoneRubricLevel>(['not_ready', 'developing', 'ready', 'strong'])

/** Legacy / external snake_case keys → canonical camelCase ids */
const LEGACY_RUBRIC_ID_ALIASES: Record<string, AeCapstoneRubricId> = {
  problem_framing: 'problemFraming',
  prompt_workflow_design: 'promptWorkflow',
  verification_review: 'verificationReview',
  safety_privacy: 'safetyPrivacy',
  usefulness: 'reusability',
  reusability_transfer: 'reusability',
  reflection_improvement: 'reflection',
  presentation_quality: 'presentation',
}

function normalizeRubricId(key: string): AeCapstoneRubricId | undefined {
  if ((AI_ESSENTIALS_CAPSTONE_RUBRIC_IDS as readonly string[]).includes(key)) return key as AeCapstoneRubricId
  return LEGACY_RUBRIC_ID_ALIASES[key]
}

function parseLevel(v: unknown): AeCapstoneRubricLevel | undefined {
  if (v === 'not_ready' || v === 'developing' || v === 'ready' || v === 'strong') return v
  return undefined
}

/** Extract ratings object from DB JSONB (flat map or { ratings, updatedAt }). */
export function parseAeCapstoneRubricSelfGradeJson(raw: unknown): {
  grades: AeCapstoneRubricSelfGrade | undefined
  updatedAt: string | undefined
} {
  if (raw == null) return { grades: undefined, updatedAt: undefined }
  if (typeof raw !== 'object' || Array.isArray(raw)) return { grades: undefined, updatedAt: undefined }
  const o = raw as Record<string, unknown>

  let source: Record<string, unknown> = o
  let updatedAt: string | undefined
  if ('ratings' in o && typeof o.ratings === 'object' && o.ratings && !Array.isArray(o.ratings)) {
    source = o.ratings as Record<string, unknown>
    if (typeof o.updatedAt === 'string') updatedAt = o.updatedAt
  }

  const grades: AeCapstoneRubricSelfGrade = {}
  for (const [k, v] of Object.entries(source)) {
    const id = normalizeRubricId(k)
    if (!id) continue
    const lvl = parseLevel(v)
    if (lvl) grades[id] = lvl
  }
  return {
    grades: Object.keys(grades).length ? grades : undefined,
    updatedAt,
  }
}

export type AeCapstoneRubricDbPayload = {
  ratings: AeCapstoneRubricSelfGrade
  updatedAt: string
} | null

/** Build JSONB value for upsert; null clears the column when rubric is empty. */
export function serializeAeCapstoneRubricForDb(
  grades: AeCapstoneRubricSelfGrade | undefined,
  updatedAt: string | undefined,
): AeCapstoneRubricDbPayload {
  if (!grades || Object.keys(grades).length === 0) return null
  const ratings: AeCapstoneRubricSelfGrade = {}
  for (const id of AI_ESSENTIALS_CAPSTONE_RUBRIC_IDS) {
    const v = grades[id]
    if (v && LEVELS.has(v)) ratings[id] = v
  }
  if (Object.keys(ratings).length === 0) return null
  return {
    ratings,
    updatedAt: updatedAt ?? new Date().toISOString(),
  }
}
