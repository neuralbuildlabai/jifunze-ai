import { useState } from 'react'
import { usePracticalMathProgress } from '../../hooks/usePracticalMathProgress'
import { ORANGE_GRADIENT } from './discoveryHubSections'

/**
 * Module 16 only — honest self-check to mark the Practical Mathematics capstone complete (local progress).
 */
export function PracticalMathCapstonePanel() {
  const { progress, markCapstoneComplete, clearCapstoneComplete } = usePracticalMathProgress()
  const [acknowledged, setAcknowledged] = useState(false)

  if (progress.capstoneComplete) {
    return (
      <section
        className="rounded-2xl border border-emerald-200/90 bg-emerald-50/40 p-5 sm:p-6"
        data-testid="standalone-capstone-complete"
      >
        <h2 className="text-lg font-semibold text-emerald-950">Capstone marked complete</h2>
        <p className="mt-2 text-[14px] leading-relaxed text-emerald-900/90">
          You confirmed your Module 16 artifact. Before acting on any numbers, still verify with the appropriate qualified
          professional.
        </p>
        <button
          type="button"
          className="mt-4 text-[13px] font-medium text-emerald-800 underline decoration-emerald-600/60 hover:text-emerald-950"
          onClick={() => {
            setAcknowledged(false)
            clearCapstoneComplete()
          }}
        >
          Undo capstone confirmation (for practice only)
        </button>
      </section>
    )
  }

  return (
    <section className="rounded-2xl border border-orange-200/90 bg-white p-5 shadow-sm sm:p-6" data-testid="standalone-capstone-panel">
      <h2 className="text-lg font-semibold text-zinc-900">Module 16 capstone</h2>
      <p className="mt-3 text-[14px] leading-relaxed text-stone-700">
        Finish your capstone artifact off-platform (written document or spreadsheet). When it is ready, confirm below. This
        does not upload files — it records your honest self-check for certificate eligibility only.
      </p>
      <label className="mt-5 flex cursor-pointer gap-3 text-[14px] leading-snug text-stone-800">
        <input
          type="checkbox"
          className="mt-1 h-4 w-4 shrink-0 rounded border-stone-400 text-orange-600 focus:ring-orange-500"
          checked={acknowledged}
          onChange={(e) => setAcknowledged(e.target.checked)}
          data-testid="standalone-capstone-ack-checkbox"
        />
        <span>
          I have completed my capstone artifact and understand what must be verified by a qualified professional before acting.
        </span>
      </label>
      <button
        type="button"
        disabled={!acknowledged}
        className={`mt-6 inline-flex min-h-[2.5rem] items-center justify-center rounded-full px-6 text-sm font-semibold text-white shadow-md transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50 ${ORANGE_GRADIENT}`}
        data-testid="standalone-capstone-mark-complete"
        onClick={() => markCapstoneComplete()}
      >
        Mark capstone complete
      </button>
    </section>
  )
}
