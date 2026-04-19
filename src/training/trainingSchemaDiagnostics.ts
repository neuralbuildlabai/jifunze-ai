import { getSupabaseProjectRefFromUrl } from '../config/supabaseEnv'
import { jifunzeCriticalLog } from '../lib/jifunzeTelemetry'

let loggedSchemaMissing = false

/**
 * Logs once per page load when PostgREST reports missing training tables/RPCs (PGRST205, etc.).
 * Does not swallow errors — callers still surface {@link import('./trainingErrors').TrainingError} to the UI.
 */
export function logTrainingSchemaDeploymentMismatchOnce(detail: {
  code?: string
  message?: string
  hint?: string
}): void {
  if (loggedSchemaMissing) return
  loggedSchemaMissing = true
  const supabaseProjectRef = getSupabaseProjectRefFromUrl()
  jifunzeCriticalLog({
    action: 'training_schema_not_deployed',
    status: 'error',
    detail: {
      postgrestCode: detail.code ?? null,
      postgrestMessage: detail.message ?? null,
      postgrestHint: detail.hint ?? null,
      supabaseProjectRef,
    },
  })
  console.error('[JifunzeAI training]', {
    problem:
      'Training tables or RPCs are missing from the connected Supabase project. Apply repo migrations (see docs/TRAINING_SCHEMA_DEPLOYMENT.md).',
    supabaseProjectRef,
    postgrest: detail,
  })
}
