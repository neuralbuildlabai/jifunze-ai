import { Link } from 'react-router-dom'
import type { PlanContinuityGuidance } from '../../training/continuityGuidance'

export function ContinuityGuidanceCard(props: {
  guidance: PlanContinuityGuidance
  /** Anchor on plan page for “content from graph” shortcut */
  derivedContentHref: string
}) {
  const { guidance, derivedContentHref } = props

  return (
    <section
      data-testid="continuity-guidance-card"
      className="rounded-xl border border-emerald-500/25 bg-emerald-950/15 p-4 ring-1 ring-emerald-500/10"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-emerald-300/90">
        Continuity-guided next step
      </p>
      <p className="mt-2 text-sm leading-relaxed text-zinc-100">{guidance.headline}</p>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        {guidance.primaryCta ? (
          <Link
            to={guidance.primaryCta.href}
            className="rounded-lg bg-emerald-600/90 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-500"
          >
            {guidance.primaryCta.label}
          </Link>
        ) : (
          <span className="rounded-lg border border-emerald-500/30 bg-emerald-950/40 px-3 py-1.5 text-xs text-emerald-100/90">
            Path complete — review memory & assets
          </span>
        )}
        <Link
          to={derivedContentHref}
          className="rounded-lg border border-zinc-600 bg-zinc-900/80 px-3 py-1.5 text-xs text-zinc-200 hover:bg-zinc-900"
        >
          Derive revision content
        </Link>
      </div>
      {guidance.actionSequence.length ? (
        <div className="mt-4 rounded-lg border border-emerald-500/20 bg-zinc-950/35 px-3 py-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-emerald-300/90">
            Suggested remediation loop (heuristic)
          </p>
          <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-xs text-zinc-200">
            {guidance.actionSequence.map((x, i) => (
              <li key={i}>{x}</li>
            ))}
          </ol>
        </div>
      ) : null}
      {guidance.secondaryNote ? (
        <p className="mt-3 text-xs leading-relaxed text-zinc-400">
          <span className="font-medium text-zinc-300">Remediation cue: </span>
          {guidance.secondaryNote}
        </p>
      ) : null}
      {guidance.bullets.length ? (
        <div className="mt-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500">Memory & revision signals</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-zinc-300">
            {guidance.bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </div>
      ) : null}
      <p className="mt-3 text-[11px] leading-relaxed text-zinc-600">{guidance.trustLine}</p>
    </section>
  )
}
