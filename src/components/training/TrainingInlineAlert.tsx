import type { TrainingError } from '../../training/trainingErrors'
import {
  getTrainingErrorDisplay,
  trainingErrorPanelClass,
  trainingErrorTextClass,
} from '../../training/trainingErrorUi'

type Props = {
  error: TrainingError
  onRetry?: () => void
  retryLabel?: string
}

/**
 * Renders a training {@link TrainingError} with distinct styling for deployment/schema issues vs other failures.
 */
export function TrainingInlineAlert({ error, onRetry, retryLabel = 'Retry' }: Props) {
  const { message, tone, remediation } = getTrainingErrorDisplay(error)
  const panel = trainingErrorPanelClass(tone)
  const text = trainingErrorTextClass(tone)
  const titleClass = tone === 'amber' ? 'font-medium text-amber-50/95' : 'font-medium text-rose-100'
  return (
    <div className={`${panel} ${text}`} role="alert">
      <p className={titleClass}>{message}</p>
      {remediation ? <p className="mt-2 text-xs leading-relaxed text-zinc-400">{remediation}</p> : null}
      <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.08em] text-zinc-600">
        Ref: {error.kind}
      </p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="mt-2 text-xs font-medium text-violet-300 hover:text-violet-200"
        >
          {retryLabel}
        </button>
      ) : null}
    </div>
  )
}
