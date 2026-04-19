import type { MiniLibraryBlueprint } from '../../knowledge/learningLibraryModel'
import { PORTFOLIO_PILLAR_META } from '../../knowledge/learningLibraryModel'
import type { SignalDrivenLibraryHints } from '../../training/signalDrivenLibraryHints'
import { TRUST_COPY } from '../../training/trustCopy'

type Props = {
  blueprint: MiniLibraryBlueprint
  hints: SignalDrivenLibraryHints
  derivedContentHref: string
}

export function LibraryPortfolioPanel(props: Props) {
  const { blueprint, hints, derivedContentHref } = props

  return (
    <section
      data-testid="library-portfolio-panel"
      className="rounded-xl border border-teal-500/20 bg-teal-950/15 p-4 ring-1 ring-teal-500/10"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-teal-300/90">Library portfolio · mini-library blueprint</p>
      <p className="mt-2 text-[11px] leading-relaxed text-zinc-500">
        One serious track can spawn a reusable bundle: lessons + checkpoints + exports below — all from the shared knowledge engine
        (domain-agnostic structure).
      </p>

      <div className="mt-4 rounded-lg border border-white/[0.06] bg-zinc-950/35 px-3 py-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500">Track scope</p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-zinc-300">
          <li>
            <span className="font-medium text-zinc-100">{blueprint.moduleCount}</span> modules ·{' '}
            <span className="font-medium text-zinc-100">{blueprint.lessonCount}</span> lessons ·{' '}
            <span className="font-medium text-zinc-100">{blueprint.moduleCheckpointCount}</span> module checkpoints
            {blueprint.supplementalQuizKinds.length ? (
              <>
                {' '}
                · supplemental:{' '}
                <span className="text-zinc-200">{blueprint.supplementalQuizKinds.join(', ')}</span>
              </>
            ) : null}
          </li>
          <li>
            Level: <span className="text-zinc-200">{blueprint.learnerLevel}</span> · Topic:{' '}
            <span className="text-zinc-200">{blueprint.domainTopic}</span>
          </li>
          <li className="text-zinc-400">{blueprint.capabilityOutcomeLine}</li>
        </ul>
      </div>

      <div className="mt-4 rounded-lg border border-white/[0.06] bg-zinc-950/35 px-3 py-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500">Recommended derived exports</p>
        <p className="mt-2 text-[11px] leading-relaxed text-zinc-400">
          Complete the mini-library by generating these asset types from “Content from this plan” — same lineage as lessons.
        </p>
        <p className="mt-2 font-mono text-[11px] leading-relaxed text-teal-100/90">{blueprint.recommendedDerivedAssetTypes.join(' · ')}</p>
        <a
          href={derivedContentHref}
          className="mt-3 inline-flex text-[11px] font-semibold text-teal-300 hover:text-teal-200"
        >
          Jump to derived content →
        </a>
      </div>

      <div className="mt-4 rounded-lg border border-white/[0.06] bg-zinc-950/35 px-3 py-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500">Five portfolio capabilities (reusable)</p>
        <ul className="mt-2 space-y-2 text-[11px] leading-relaxed text-zinc-400">
          {blueprint.pillarBridgeLines.map(({ pillar, line }) => (
            <li key={pillar}>
              <span className="font-medium text-zinc-200">{PORTFOLIO_PILLAR_META[pillar].title} — </span>
              {line}
            </li>
          ))}
        </ul>
      </div>

      {(hints.trackImprovementBullets.length > 0 || hints.libraryGrowthBullets.length > 0) && (
        <div className="mt-4 rounded-lg border border-amber-500/15 bg-amber-950/15 px-3 py-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-amber-200/90">Signal-driven library improvements</p>
          <p className="mt-2 text-[11px] leading-relaxed text-zinc-500">{TRUST_COPY.librarySignalHintsHeuristic}</p>
          {hints.trackImprovementBullets.length ? (
            <ul className="mt-2 list-disc space-y-1 pl-5 text-[11px] text-zinc-300">
              {hints.trackImprovementBullets.map((x, i) => (
                <li key={`ti-${i}`}>{x}</li>
              ))}
            </ul>
          ) : null}
          {hints.libraryGrowthBullets.length ? (
            <ul className="mt-3 list-disc space-y-1 pl-5 text-[11px] text-amber-100/95">
              {hints.libraryGrowthBullets.map((x, i) => (
                <li key={`lg-${i}`}>{x}</li>
              ))}
            </ul>
          ) : null}
        </div>
      )}
    </section>
  )
}
