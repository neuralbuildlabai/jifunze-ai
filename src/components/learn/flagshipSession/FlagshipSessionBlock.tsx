import type { FlagshipSessionContentBlock } from '../../../data/learning/flagshipSessionContentTypes'
import { blockAllowsLearnerResponse, getLearnerFacingEyebrow } from '../../../lib/flagshipSessionResponseBlocks'
import { flagshipBlockAccentClass, flagshipBlockCardClass } from './flagshipSessionBlockUi'
import { FlagshipLearnerResponsePanel } from './FlagshipLearnerResponsePanel'
import type { FlagshipSessionResponseContext } from './flagshipSessionResponseTypes'

function ProseParagraphs({ text }: { text: string }) {
  const parts = text.split(/\n\n+/).filter(Boolean)
  return (
    <div className="max-w-2xl space-y-4">
      {parts.map((p, i) => (
        <p key={i} className="text-[15px] leading-[1.75] text-[color:var(--jf-muted)]">
          {p}
        </p>
      ))}
    </div>
  )
}

function BlockArticle(props: {
  block: FlagshipSessionContentBlock
  responseContext?: FlagshipSessionResponseContext | null
  isFirstLearnerResponseBlock?: boolean
  variant?: 'card' | 'plain'
}) {
  const { block, responseContext, isFirstLearnerResponseBlock, variant = 'card' } = props
  const accent = flagshipBlockAccentClass(block.type)
  const surface = flagshipBlockCardClass(block.type)
  const eyebrow = getLearnerFacingEyebrow(block)
  const shell =
    variant === 'plain'
      ? 'rounded-lg border-0 bg-transparent py-4 pl-2 pr-3 sm:pl-3'
      : `rounded-xl border pl-4 pr-5 py-5 sm:pl-5 ${surface} ${accent} border-l-[3px]`

  return (
    <article
      data-testid={`flagship-session-block-${block.id}`}
      data-block-type={block.type}
      className={shell}
    >
      <header className="space-y-1">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--jf-subtle)]">{eyebrow}</p>
        {block.title ? (
          <h2 className="text-[17px] font-semibold tracking-tight text-[color:var(--jf-text)]">{block.title}</h2>
        ) : null}
      </header>

      <div className="mt-5 max-w-2xl space-y-5">
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

export function FlagshipSessionBlock(props: {
  block: FlagshipSessionContentBlock
  responseContext?: FlagshipSessionResponseContext | null
  isFirstLearnerResponseBlock?: boolean
  /** Supplemental blocks start collapsed — content stays in DOM for anchors and screen readers */
  defaultCollapsed?: boolean
}) {
  const { block, responseContext, isFirstLearnerResponseBlock, defaultCollapsed = false } = props
  const summaryEyebrow = getLearnerFacingEyebrow(block)
  const summaryTitle = block.title?.trim() || summaryEyebrow

  const inner = (
    <BlockArticle
      block={block}
      responseContext={responseContext}
      isFirstLearnerResponseBlock={isFirstLearnerResponseBlock}
      variant={defaultCollapsed ? 'plain' : 'card'}
    />
  )

  return (
    <div id={`lesson-section-${block.id}`} className="scroll-mt-28">
      {defaultCollapsed ? (
        <details className="group rounded-xl border border-white/[0.06] bg-black/[0.12] open:border-white/[0.1] open:bg-[color:var(--jf-surface)]/25">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3.5 text-left marker:content-none [&::-webkit-details-marker]:hidden">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[color:var(--jf-subtle)]">{summaryEyebrow}</p>
              <p className="mt-1 text-[13px] font-medium text-[color:var(--jf-text)]">{summaryTitle}</p>
              <p className="mt-0.5 text-[11px] text-[color:var(--jf-muted)]">Supplemental — expand to read in full</p>
            </div>
            <span className="shrink-0 text-[11px] font-semibold text-[color:var(--jf-muted)] group-open:hidden">Expand</span>
            <span className="hidden shrink-0 text-[11px] font-semibold text-[color:var(--jf-muted)] group-open:inline">Collapse</span>
          </summary>
          <div className="border-t border-white/[0.06] px-1 pb-2 pt-2">{inner}</div>
        </details>
      ) : (
        inner
      )}
    </div>
  )
}
