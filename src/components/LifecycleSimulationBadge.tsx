import { shouldShowLifecycleDemoHint } from '../config/systemSurfaceMode'

type Props = {
  /** Extra screen-reader context. */
  label?: string
}

/**
 * Compact hint beside lifecycle / autonomy chips: pipeline states are previews, not vendor posts.
 */
export function LifecycleSimulationBadge({ label = 'Preview only' }: Props) {
  if (!shouldShowLifecycleDemoHint()) return null
  return (
    <span
      className="inline-flex max-w-[10rem] items-center rounded border border-amber-600/35 bg-amber-950/40 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-amber-100/90"
      title="Lifecycle and publishing are simulated in this environment — nothing is posted to social platforms."
    >
      {label}
    </span>
  )
}
