import { useState } from 'react'
import type { StandaloneCapstoneAcknowledgement } from '../../data/courses/practicalMathematicsCourseTypes'
import { useStandaloneCourseProgress } from '../../hooks/usePracticalMathProgress'
import { ORANGE_GRADIENT } from './discoveryHubSections'

type StandaloneCapstonePanelProps = {
  courseInternalKey: string
  acknowledgement: StandaloneCapstoneAcknowledgement
}

/**
 * Portfolio / capstone acknowledgment for standalone courses (local progress only).
 */
export function StandaloneCapstonePanel({ courseInternalKey, acknowledgement }: StandaloneCapstonePanelProps) {
  const { progress, markCapstoneComplete, clearCapstoneComplete } = useStandaloneCourseProgress(courseInternalKey)
  const [acknowledged, setAcknowledged] = useState(false)

  if (progress.capstoneComplete) {
    return (
      <section
        className="rounded-2xl border border-emerald-200/90 bg-emerald-50/40 p-5 sm:p-6"
        data-testid="standalone-capstone-complete"
      >
        <h2 className="text-lg font-semibold text-emerald-950">{acknowledgement.title} — confirmed</h2>
        <p className="mt-2 text-[14px] leading-relaxed text-emerald-900/90">
          You confirmed your artifact is ready for stakeholder review. This does not replace organizational approvals, data
          verification, or professional sign-off where required.
        </p>
        <button
          type="button"
          className="mt-4 text-[13px] font-medium text-emerald-800 underline decoration-emerald-600/60 hover:text-emerald-950"
          onClick={() => {
            setAcknowledged(false)
            clearCapstoneComplete()
          }}
        >
          Undo confirmation (for practice only)
        </button>
      </section>
    )
  }

  return (
    <section className="rounded-2xl border border-orange-200/90 bg-white p-5 shadow-sm sm:p-6" data-testid="standalone-capstone-panel">
      <h2 className="text-lg font-semibold text-zinc-900">{acknowledgement.title}</h2>
      <p className="mt-3 text-[14px] leading-relaxed text-stone-700">{acknowledgement.intro}</p>
      <label className="mt-5 flex cursor-pointer gap-3 text-[14px] leading-snug text-stone-800">
        <input
          type="checkbox"
          className="mt-1 h-4 w-4 shrink-0 rounded border-stone-400 text-orange-600 focus:ring-orange-500"
          checked={acknowledged}
          onChange={(e) => setAcknowledged(e.target.checked)}
          data-testid="standalone-capstone-ack-checkbox"
        />
        <span>{acknowledgement.checkboxLabel}</span>
      </label>
      <button
        type="button"
        disabled={!acknowledged}
        className={`mt-6 inline-flex min-h-[2.5rem] items-center justify-center rounded-full px-6 text-sm font-semibold text-white shadow-md transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50 ${ORANGE_GRADIENT}`}
        data-testid="standalone-capstone-mark-complete"
        onClick={() => markCapstoneComplete()}
      >
        Mark portfolio complete
      </button>
    </section>
  )
}
