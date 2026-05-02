import { useMemo, type ReactNode } from 'react'
import type { FlagshipSessionType } from '../../../data/learning/flagshipCourseSessions'
import type { FlagshipSessionContentBlock } from '../../../data/learning/flagshipSessionContentTypes'
import {
  partitionFlagshipSessionBlocks,
  sessionApplySectionTitle,
  sessionLearningSectionTitle,
} from '../../../lib/flagshipSessionBlockLayout'
import { blockStartsCollapsed } from '../../../lib/flagshipSessionLessonFlow'
import { blockAllowsLearnerResponse } from '../../../lib/flagshipSessionResponseBlocks'
import { FlagshipSessionBlock } from './FlagshipSessionBlock'
import type { FlagshipSessionResponseContext } from './flagshipSessionResponseTypes'

export type FlagshipSessionBlocksLayout = 'default' | 'lesson-teaching-first'

function SessionOverviewCard({ summary }: { summary: string }) {
  return (
    <div
      id="session-overview"
      className="relative mt-8 scroll-mt-28 overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 py-5 sm:px-6 sm:py-5"
    >
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b from-violet-500/45 via-violet-400/20 to-transparent"
        aria-hidden
      />
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--jf-subtle)]">Session overview</p>
      <p className="mt-3 text-[15px] leading-[1.75] text-[color:var(--jf-muted)]">{summary}</p>
    </div>
  )
}

function ObjectivesStrip({ objectives }: { objectives: readonly string[] }) {
  return (
    <section id="session-objectives-heading" className="mt-8 scroll-mt-28" aria-labelledby="session-objectives-title">
      <h2 id="session-objectives-title" className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--jf-subtle)]">
        Learning objectives
      </h2>
      <ul className="mt-3 space-y-2">
        {objectives.map((o) => (
          <li key={o} className="flex gap-2 text-[14px] leading-relaxed text-[color:var(--jf-muted)]">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[color:var(--jf-text)]/35" aria-hidden />
            {o}
          </li>
        ))}
      </ul>
    </section>
  )
}

function SectionShell(props: {
  title: string
  sectionId: string
  children: ReactNode
  rightSlot?: ReactNode
}) {
  const { title, sectionId, children, rightSlot } = props
  return (
    <section className="mt-8 scroll-mt-24" aria-labelledby={sectionId}>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <h2 id={sectionId} className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[color:var(--jf-text)]">
          {title}
        </h2>
        {rightSlot ? <div className="shrink-0">{rightSlot}</div> : null}
      </div>
      <div className="mt-5 space-y-6">{children}</div>
    </section>
  )
}

export function FlagshipSessionBlocks(props: {
  blocks: FlagshipSessionContentBlock[]
  responseContext?: FlagshipSessionResponseContext | null
  sessionType: FlagshipSessionType
  /** Shown above teaching blocks for lesson-first layout (and compact lesson runs). */
  objectives?: readonly string[]
  /** When set with `lesson-teaching-first`, overview renders between teaching and apply. */
  sessionSummary?: string
  layout?: FlagshipSessionBlocksLayout
}) {
  const { blocks, responseContext, sessionType, objectives = [], sessionSummary, layout = 'default' } = props

  const { teachingBlocks, applyBlocks } = useMemo(() => partitionFlagshipSessionBlocks(blocks), [blocks])

  const firstLearnerResponseBlockId = useMemo(
    () => applyBlocks.find((b) => blockAllowsLearnerResponse(b))?.id ?? null,
    [applyBlocks],
  )

  const blockGlobalIndex = (b: FlagshipSessionContentBlock) => blocks.findIndex((x) => x.id === b.id)

  const renderBlock = (block: FlagshipSessionContentBlock) => (
    <FlagshipSessionBlock
      key={block.id}
      block={block}
      responseContext={responseContext ?? undefined}
      isFirstLearnerResponseBlock={block.id === firstLearnerResponseBlockId}
      defaultCollapsed={blockStartsCollapsed(block, blockGlobalIndex(block), blocks)}
    />
  )

  if (blocks.length === 0) return null

  const learningTitle = sessionLearningSectionTitle(sessionType)
  const applyTitle = sessionApplySectionTitle(sessionType)
  const showObjectives = objectives.length > 0 && layout === 'lesson-teaching-first'

  if (layout === 'lesson-teaching-first' && sessionSummary) {
    return (
      <div data-testid="flagship-session-content">
        {showObjectives ? <ObjectivesStrip objectives={objectives} /> : null}

        {teachingBlocks.length > 0 ? (
          <SectionShell title={learningTitle} sectionId="flagship-learning-material-heading">
            {teachingBlocks.map((block) => renderBlock(block))}
          </SectionShell>
        ) : null}

        <SessionOverviewCard summary={sessionSummary} />

        {applyBlocks.length > 0 ? (
          <SectionShell title={applyTitle} sectionId="flagship-apply-heading">
            {applyBlocks.map((block) => renderBlock(block))}
          </SectionShell>
        ) : null}
      </div>
    )
  }

  return (
    <div data-testid="flagship-session-content">
      {showObjectives ? <ObjectivesStrip objectives={objectives} /> : null}

      {teachingBlocks.length > 0 ? (
        <SectionShell title={learningTitle} sectionId="flagship-learning-material-heading">
          {teachingBlocks.map((block) => renderBlock(block))}
        </SectionShell>
      ) : null}

      {applyBlocks.length > 0 ? (
        <SectionShell title={applyTitle} sectionId="flagship-apply-heading">
          {applyBlocks.map((block) => renderBlock(block))}
        </SectionShell>
      ) : null}
    </div>
  )
}
