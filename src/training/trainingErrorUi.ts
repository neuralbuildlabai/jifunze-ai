import type { TrainingError } from './trainingErrors'

export type TrainingErrorUiTone = 'rose' | 'amber'

export function getTrainingErrorRemediation(error: TrainingError): string | null {
  switch (error.kind) {
    case 'schema_missing':
      return 'Workspace owners: confirm this environment uses the Supabase project where training migrations ran, then reload. Compare project ref with docs/TRAINING_SCHEMA_DEPLOYMENT.md.'
    case 'constraint':
      return 'Deploy the latest training migrations (especially derived_content_assets). If this persists after deploy, contact support with the time you tried to save.'
    case 'permission':
      return 'Try refreshing the session (sign out/in). If you should have access, ask a workspace admin to confirm your tenant role.'
    case 'network':
      return 'Check connectivity and retry. Your progress is saved server-side once requests succeed.'
    case 'not_configured':
      return 'Connect Supabase from this environment or open the workspace shell so training can resolve your tenant.'
    case 'validation':
      return 'Fix the highlighted fields or choices and try again.'
    default:
      return 'If this repeats, capture the page URL and approximate time — avoid pasting screenshots of network payloads.'
  }
}

export function getTrainingErrorDisplay(error: TrainingError): {
  message: string
  tone: TrainingErrorUiTone
  remediation?: string | null
} {
  if (error.kind === 'schema_missing' || error.kind === 'constraint') {
    return { message: error.message, tone: 'amber', remediation: getTrainingErrorRemediation(error) }
  }
  if (error.kind === 'validation') {
    return { message: error.message, tone: 'rose', remediation: getTrainingErrorRemediation(error) }
  }
  return {
    message: error.message,
    tone: 'rose',
    remediation: getTrainingErrorRemediation(error),
  }
}

export function trainingErrorTextClass(tone: TrainingErrorUiTone): string {
  return tone === 'amber' ? 'text-amber-200/95' : 'text-rose-300/90'
}

export function trainingErrorPanelClass(tone: TrainingErrorUiTone): string {
  return tone === 'amber'
    ? 'rounded-lg border border-amber-500/35 bg-amber-950/35 px-3 py-2 text-sm'
    : 'rounded-lg border border-rose-500/30 bg-rose-950/30 px-3 py-2 text-sm'
}
