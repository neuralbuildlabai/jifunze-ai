import type { PostgrestError } from '@supabase/supabase-js'
import { logTrainingSchemaDeploymentMismatchOnce } from './trainingSchemaDiagnostics'

export type TrainingErrorKind =
  | 'not_configured'
  | 'schema_missing'
  | 'permission'
  | 'network'
  /** DB CHECK / constraint rejected payload (e.g. unknown asset_type). User may need deploy or support. */
  | 'constraint'
  /** Client-side validation / recoverable bad input — user can usually fix without deploy. */
  | 'validation'
  | 'unknown'

/** User-visible copy when PostgREST cannot find training tables/RPCs (migrations not applied to this project). */
export const TRAINING_SCHEMA_MISSING_USER_MESSAGE =
  'Training is unavailable: the training database objects are not deployed to this Supabase project. Apply the training migrations from this repository to the same project as VITE_SUPABASE_URL (see docs/TRAINING_SCHEMA_DEPLOYMENT.md), then reload.'

/** When DB rejects asset_type / CHECK constraint — usually schema behind app or unsupported legacy row write. */
export const TRAINING_DERIVED_ASSET_CONSTRAINT_USER_MESSAGE =
  'Could not save this asset type: the database rejected the request. If you recently added new asset types, apply the latest migrations (derived_content_assets CHECK) so the DB matches the app. See docs/TRAINING_SCHEMA_DEPLOYMENT.md.'

/** RPC / function missing from PostgREST schema cache (similar remediation to tables). */
export const TRAINING_RPC_MISSING_USER_MESSAGE =
  'Training action failed: a required database function is missing from this Supabase project. Apply training migrations through the latest revision (including RPCs such as create_training_plan_from_seed), then reload. See docs/TRAINING_SCHEMA_DEPLOYMENT.md.'

export type TrainingError = {
  kind: TrainingErrorKind
  message: string
  cause?: unknown
}

function isOffline(): boolean {
  if (typeof navigator === 'undefined') return false
  return navigator.onLine === false
}

function isMissingTrainingSchemaError(code: string, msg: string, hint: string): boolean {
  if (code === 'PGRST205') return true
  if (/Could not find the table .* in the schema cache/i.test(msg)) return true
  if (/Could not find the function public\.create_training_plan_from_seed/i.test(msg)) return true
  if (/function public\.create_training_plan_from_seed/i.test(msg) && /does not exist|schema cache/i.test(msg))
    return true
  if (/Could not find the function public\./i.test(msg) && /schema cache|does not exist/i.test(msg)) return true
  if (/schema cache/i.test(hint) && /training_plans|training_|quiz_attempts|lesson_progress/i.test(msg))
    return true
  return false
}

function isMissingTrainingRpcError(msg: string): boolean {
  return /Could not find the function public\./i.test(msg) && /create_training_plan_from_seed|training_/i.test(msg)
}

function isDerivedAssetConstraintError(code: string, msg: string): boolean {
  if (code !== '23514') return false
  return /derived_content_assets/i.test(msg)
}

export function classifyPostgrestError(err: PostgrestError | null | undefined): TrainingError {
  if (!err) {
    return { kind: 'unknown', message: 'Unknown error' }
  }
  const code = err.code ?? ''
  const msg = err.message || 'Request failed'
  const hint = typeof err.hint === 'string' ? err.hint : ''
  if (isMissingTrainingSchemaError(code, msg, hint)) {
    logTrainingSchemaDeploymentMismatchOnce({ code, message: msg, hint })
    return { kind: 'schema_missing', message: TRAINING_SCHEMA_MISSING_USER_MESSAGE, cause: err }
  }
  if (isMissingTrainingRpcError(msg)) {
    logTrainingSchemaDeploymentMismatchOnce({ code, message: msg, hint })
    return { kind: 'schema_missing', message: TRAINING_RPC_MISSING_USER_MESSAGE, cause: err }
  }
  if (isDerivedAssetConstraintError(code, msg)) {
    console.error('[JifunzeAI training] derived_content_assets constraint', { code, msg })
    return { kind: 'constraint', message: TRAINING_DERIVED_ASSET_CONSTRAINT_USER_MESSAGE, cause: err }
  }
  if (code === 'PGRST301' || /jwt|session|not authenticated/i.test(msg)) {
    return { kind: 'permission', message: msg, cause: err }
  }
  if (code === '42501' || /permission denied|rls|row-level/i.test(msg)) {
    return { kind: 'permission', message: msg, cause: err }
  }
  if (isOffline() || /network|fetch|failed to fetch/i.test(msg)) {
    return { kind: 'network', message: msg, cause: err }
  }
  return { kind: 'unknown', message: msg, cause: err }
}

export function classifyUnknownError(e: unknown): TrainingError {
  if (isOffline()) {
    return { kind: 'network', message: 'You appear to be offline.', cause: e }
  }
  if (e && typeof e === 'object' && 'message' in e) {
    const m = String((e as { message?: unknown }).message ?? e)
    return { kind: 'unknown', message: m || 'Something went wrong', cause: e }
  }
  return { kind: 'unknown', message: 'Something went wrong', cause: e }
}

export function notConfiguredTrainingError(): TrainingError {
  return {
    kind: 'not_configured',
    message: 'Training plans require Supabase and a resolved workspace.',
  }
}

export function validationTrainingError(message: string): TrainingError {
  return { kind: 'validation', message }
}
