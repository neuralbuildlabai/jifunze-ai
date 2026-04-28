import type { FlagshipSessionContentBlock } from '../../../data/learning/flagshipSessionContentTypes'
import { blockAllowsLearnerResponse, getLearnerFacingEyebrow } from '../../../lib/flagshipSessionResponseBlocks'
import { flagshipBlockAccentClass } from './flagshipSessionBlockUi'
import { FlagshipLearnerResponsePanel } from './FlagshipLearnerResponsePanel'
import type { FlagshipSessionResponseContext } from './flagshipSessionResponseTypes'

function ProseParagraphs({ text }: { text: string }) {
  const parts = text.split(/\n\n+/).filter(Boolean)
  return (
    <div className="space-y-4">
      {parts.map((p, i) => (
        <p key={i} className="text-[15px] leading-[1.75] text-[color:var(--jf-muted)]">
          {p}
        </p>
      ))}
    </div>
  )
}

export function FlagshipSessionBlock(props: {
  block: FlagshipSessionContentBlock
  responseContext?: FlagshipSessionResponseContext | null
  /** First learner-response block in the session shows the short portfolio helper; others omit it. */
  isFirstLearnerResponseBlock?: boolean
}) {
  const { block, responseContext, isFirstLearnerResponseBlock } = props
  const accent = flagshipBlockAccentClass(block.type)
  const eyebrow = getLearnerFacingEyebrow(block)

  return (
    <article
      data-testid={`flagship-session-block-${block.id}`}
      data-block-type={block.type}
      className={`rounded-xl border border-white/[0.06] bg-[color:var(--jf-surface)]/40 pl-4 pr-5 py-5 sm:pl-5 ${accent} border-l-[3px]`}
    >
      <header className="space-y-1">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--jf-subtle)]">{eyebrow}</p>
        {block.title ? (
          <h2 className="text-[17px] font-semibold tracking-tight text-[color:var(--jf-text)]">{block.title}</h2>
        ) : null}
      </header>

      <div className="mt-5 space-y-5">
        {block.body ? <ProseParagraphs text={block.body} /> : null}

        {block.bullets && block.bullets.length > 0 ? (
          <ul className="space-y-3">
            {block.bullets.map((b) => (
              <li key={b} className="flex gap-3 text-[14px] leading-relaxed text-[color:var(--jf-muted)]">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--jf-text)]/30" aria-hidden />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        ) : null}

        {block.prompt ? (
          <div className="rounded-xl border border-white/[0.06] bg-[color:var(--jf-bg-page)]/90 px-4 py-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--jf-subtle)]">
              {block.type === 'output_prompt' ? 'Your prompt' : 'Task'}
            </p>
            <pre className="mt-3 whitespace-pre-wrap font-sans text-[14px] leading-relaxed text-[color:var(--jf-text)]">{block.prompt}</pre>
          </div>
        ) : null}

        {block.example ? (
          <div className="rounded-xl border border-emerald-900/25 bg-emerald-950/[0.08] px-4 py-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-200/70">
              {block.type === 'worked_example' ? 'Worked example' : 'Example'}
            </p>
            <p className="mt-3 text-[14px] leading-relaxed text-[color:var(--jf-muted)]">{block.example}</p>
          </div>
        ) : null}

        {block.outputExpectation && block.type !== 'output_prompt' ? (
          <p className="text-[13px] leading-relaxed text-[color:var(--jf-subtle)]">
            <span className="font-medium text-[color:var(--jf-muted)]">Done means: </span>
            {block.outputExpectation}
          </p>
        ) : null}

        {blockAllowsLearnerResponse(block) && responseContext ? (
          <FlagshipLearnerResponsePanel
            block={block}
            ctx={responseContext}
            isFirstLearnerResponseBlock={isFirstLearnerResponseBlock}
          />
        ) : null}
      </div>
    </article>
  )
}
