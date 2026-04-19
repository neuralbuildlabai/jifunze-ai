import type { BrandProfile } from '../types/brand'
import {
  getFeaturedPromptOfTheDay,
  getMicroTipOfTheDay,
  getTryNextPrompts,
  todaysAngleHelper,
  tryThisNextSubtitle,
} from '../lib/signedInEngagementPrompts'
import { inferWorkspacePersona } from '../lib/signedInWelcomeCopy'

type Props = {
  brand: BrandProfile
  onApplyPrompt: (text: string) => void
  /** Scroll target after pick (e.g. generator section id). */
  generatorSectionId?: string
}

export function SignedInEngagementStrip({
  brand,
  onApplyPrompt,
  generatorSectionId = 'signed-in-create',
}: Props) {
  const persona = inferWorkspacePersona(brand)
  const featured = getFeaturedPromptOfTheDay(persona)
  const tryNext = getTryNextPrompts(persona)
  const microTip = getMicroTipOfTheDay(persona)
  const angleHelper = todaysAngleHelper(persona)
  const tryNextLine = tryThisNextSubtitle(persona)

  function pick(text: string) {
    onApplyPrompt(text)
    requestAnimationFrame(() => {
      document.getElementById(generatorSectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  return (
    <section
      className="mt-6 space-y-4"
      aria-label="Ideas to try next"
    >
      <div className="rounded-2xl border border-violet-500/35 bg-[linear-gradient(135deg,rgba(109,40,217,0.16),rgba(24,20,35,0.55))] p-4 ring-1 ring-violet-400/15 sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0 space-y-2">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-violet-200/90">
                Today’s angle
              </p>
              <p className="mt-1 text-[12px] leading-snug text-violet-200/75">{angleHelper}</p>
            </div>
            <p className="text-sm leading-relaxed text-zinc-100/95">{featured}</p>
          </div>
          <button
            type="button"
            onClick={() => pick(featured)}
            className="shrink-0 rounded-xl bg-white px-3.5 py-2 text-xs font-semibold text-zinc-950 shadow-md shadow-black/20 transition hover:bg-zinc-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400/45"
          >
            Try this prompt
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4 ring-1 ring-white/[0.03] sm:p-5">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-sm font-semibold text-white">Try this next</h2>
          <p className="text-[11px] text-zinc-500/90">{tryNextLine}</p>
        </div>
        <ul className="mt-3 flex flex-wrap gap-2">
          {tryNext.map((p) => (
            <li key={p}>
              <button
                type="button"
                onClick={() => pick(p)}
                className="rounded-full border border-white/[0.1] bg-zinc-950/25 px-3 py-1.5 text-left text-[12px] leading-snug text-zinc-300 transition hover:border-violet-400/35 hover:bg-violet-950/20 hover:text-violet-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400/45"
              >
                {p}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <p className="max-w-3xl rounded-lg border border-white/[0.06] bg-zinc-950/35 px-3 py-2.5 text-[12px] leading-relaxed text-zinc-400/95">
        <span className="font-semibold text-zinc-300/95">
          {microTip.kind === 'tip' ? 'Tip' : 'Did you know?'}
        </span>
        <span className="text-zinc-500/95"> — </span>
        {microTip.body}
      </p>
    </section>
  )
}
