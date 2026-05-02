import { useMemo, type ReactNode } from 'react'
import type { FlagshipSessionType } from '../../../data/learning/flagshipCourseSessions'
import type { FlagshipSessionContentBlock } from '../../../data/learning/flagshipSessionContentTypes'
import {
  partitionFlagshipSessionBlocks,
  sessionApplySectionTitle,
  sessionLearningSectionTitle,
} from '../../../lib/flagshipSessionBlockLayout'
import {
  bucketGuidedTeachingBlocks,
  practiceProduceSummary,
} from '../../../lib/flagshipSessionGuidedLayout'
import { blockStartsCollapsed } from '../../../lib/flagshipSessionLessonFlow'
import { blockAllowsLearnerResponse } from '../../../lib/flagshipSessionResponseBlocks'
import { FlagshipSessionBlock } from './FlagshipSessionBlock'
import type { FlagshipSessionResponseContext } from './flagshipSessionResponseTypes'

export type FlagshipSessionBlocksLayout = 'default' | 'lesson-teaching-first' | 'practice-lab'

function SessionOverviewCard({ summary }: { summary: string }) {
  return (
    <div
      id="session-overview"
      className="relative mt-6 scroll-mt-28 overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-5 sm:px-6 sm:py-5"
    >
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b from-violet-500/35 via-violet-400/15 to-transparent"
        aria-hidden
      />
      <p className="text-[13px] font-semibold text-[color:var(--jf-text)]">Why this matters</p>
      <p className="mt-3 text-[15px] leading-[1.75] text-[color:var(--jf-muted)]">{summary}</p>
    </div>
  )
}

function ObjectivesStrip({ objectives }: { objectives: readonly string[] }) {
  return (
    <div id="session-objectives-heading" className="scroll-mt-28" aria-labelledby="session-objectives-title">
      <h2 id="session-objectives-title" className="text-[13px] font-semibold text-[color:var(--jf-text)]">
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
    </div>
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
    <section className="mt-10 scroll-mt-24" aria-labelledby={sectionId}>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <h2 id={sectionId} className="text-[13px] font-semibold text-[color:var(--jf-text)]">
          {title}
        </h2>
        {rightSlot ? <div className="shrink-0">{rightSlot}</div> : null}
      </div>
      <div className="mt-6 space-y-8">{children}</div>
    </section>
  )
}

function GuidedStepFrame(props: { id: string; title: string; children: ReactNode; className?: string }) {
  const { id, title, children, className = '' } = props
  return (
    <section id={id} className={`scroll-mt-28 ${className}`.trim()}>
      <h2 className="text-[13px] font-semibold tracking-tight text-[color:var(--jf-text)]">{title}</h2>
      <div className="mt-5 space-y-6">{children}</div>
    </section>
  )
}

function CollapsibleMore(props: { summary: string; children: ReactNode }) {
  return (
    <details className="group mt-4 rounded-xl border border-white/[0.06] bg-black/[0.08] open:border-white/[0.09] open:bg-[color:var(--jf-surface)]/20">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-left marker:content-none [&::-webkit-details-marker]:hidden">
        <span className="text-[13px] font-medium text-[color:var(--jf-text)]">{props.summary}</span>
        <span className="shrink-0 text-[12px] font-medium text-[color:var(--jf-muted)] group-open:hidden">Show</span>
        <span className="hidden shrink-0 text-[12px] font-medium text-[color:var(--jf-muted)] group-open:inline">Hide</span>
      </summary>
      <div className="space-y-4 border-t border-white/[0.05] px-3 py-4 sm:px-4">{props.children}</div>
    </details>
  )
}

export function FlagshipSessionBlocks(props: {
  blocks: FlagshipSessionContentBlock[]
  responseContext?: FlagshipSessionResponseContext | null
  sessionType: FlagshipSessionType
  objectives?: readonly string[]
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

  const renderBlock = (
    block: FlagshipSessionContentBlock,
    opts?: {
      presentation?: 'default' | 'practice-task'
      taskNumber?: number
      hidePromptInArticle?: boolean
      forceExpanded?: boolean
    },
  ) => (
    <FlagshipSessionBlock
      key={block.id}
      block={block}
      responseContext={responseContext ?? undefined}
      isFirstLearnerResponseBlock={block.id === firstLearnerResponseBlockId}
      defaultCollapsed={
        opts?.forceExpanded ? false : blockStartsCollapsed(block, blockGlobalIndex(block), blocks)
      }
      presentation={opts?.presentation ?? 'default'}
      taskNumber={opts?.taskNumber}
      hidePromptInArticle={opts?.hidePromptInArticle}
    />
  )

  if (blocks.length === 0) return null

  const learningTitle = sessionLearningSectionTitle(sessionType)
  const applyTitle = sessionApplySectionTitle(sessionType)
  const showObjectives = objectives.length > 0 && layout === 'lesson-teaching-first'

  if (layout === 'practice-lab') {
    const produce = practiceProduceSummary(applyBlocks)
    return (
      <div data-testid="flagship-session-content" data-session-presentation="practice-lab">
        <section id="flagship-practice-goal" className="scroll-mt-28">
          <h2 className="text-[13px] font-semibold text-[color:var(--jf-text)]">Practice goal</h2>
          {sessionSummary?.trim() ? (
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[color:var(--jf-muted)]">{sessionSummary.trim()}</p>
          ) : (
            <p className="mt-3 text-[14px] text-[color:var(--jf-subtle)]">Work through the tasks below in order.</p>
          )}
        </section>

        {produce ? (
          <section id="flagship-practice-output" className="mt-10 scroll-mt-28">
            <h2 className="text-[13px] font-semibold text-[color:var(--jf-text)]">What you will produce</h2>
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[color:var(--jf-muted)]">{produce}</p>
          </section>
        ) : null}

        <section id="flagship-practice-tasks" className="mt-10 scroll-mt-28">
          <h2 className="text-[13px] font-semibold text-[color:var(--jf-text)]">Tasks</h2>
          {applyBlocks.length > 0 ? (
            <ol className="mt-4 max-w-2xl list-decimal space-y-2 pl-5 text-[14px] leading-relaxed text-[color:var(--jf-muted)]">
              {applyBlocks.map((b) => (
                <li key={b.id}>
                  <a href={`#lesson-section-${b.id}`} className="text-[color:var(--jf-text)] underline-offset-2 hover:underline">
                    {b.title?.trim() || `Task (${b.type})`}
                  </a>
                </li>
              ))}
            </ol>
          ) : (
            <p className="mt-3 text-[14px] text-[color:var(--jf-subtle)]">No written tasks in this session.</p>
          )}
        </section>

        {teachingBlocks.length > 0 ? (
          <CollapsibleMore summary="Optional context — expand if you want the full setup">
            <div className="space-y-4">
              {teachingBlocks.map((block) => (
                <FlagshipSessionBlock
                  key={block.id}
                  block={block}
                  responseContext={responseContext ?? undefined}
                  isFirstLearnerResponseBlock={false}
                  defaultCollapsed={false}
                  presentation="default"
                  collapseSummaryStyle="short"
                />
              ))}
            </div>
          </CollapsibleMore>
        ) : null}

        {applyBlocks.length > 0 ? (
          <section id="flagship-practice-artifact" className="mt-12 scroll-mt-28 space-y-10" aria-label="Response workspace">
            {applyBlocks.map((block, i) =>
              renderBlock(block, {
                presentation: 'practice-task',
                taskNumber: i + 1,
                hidePromptInArticle: true,
              }),
            )}
          </section>
        ) : null}
      </div>
    )
  }

  if (layout === 'lesson-teaching-first') {
    const by = bucketGuidedTeachingBlocks(teachingBlocks)
    const hasStartSection =
      showObjectives || Boolean(sessionSummary?.trim()) || by.start.length > 0

    return (
      <div data-testid="flagship-session-content" data-session-presentation="guided-lesson">
        {hasStartSection ? (
          <section id="flagship-step-start" className="mt-8 scroll-mt-28 space-y-6">
            {showObjectives ? <ObjectivesStrip objectives={objectives} /> : null}
            {sessionSummary?.trim() ? <SessionOverviewCard summary={sessionSummary.trim()} /> : null}
            {by.start.map((block) => renderBlock(block))}
          </section>
        ) : null}

        {by.learn.length > 0 ? (
          <GuidedStepFrame id="flagship-step-learn" title="Learn" className="mt-14">
            {renderBlock(by.learn[0])}
            {by.learn.length > 1 ? (
              <CollapsibleMore summary="More on this idea">
                {by.learn.slice(1).map((block) => renderBlock(block, { forceExpanded: true }))}
              </CollapsibleMore>
            ) : null}
          </GuidedStepFrame>
        ) : null}

        {by.example.length > 0 ? (
          <GuidedStepFrame id="flagship-step-example" title="Example" className="mt-14">
            {renderBlock(by.example[0])}
            {by.example.length > 1 ? (
              <CollapsibleMore summary="More examples">
                {by.example.slice(1).map((block) => renderBlock(block, { forceExpanded: true }))}
              </CollapsibleMore>
            ) : null}
          </GuidedStepFrame>
        ) : null}

        {by.check.length > 0 || applyBlocks.length > 0 ? (
          <GuidedStepFrame id="flagship-step-check" title="Check" className="mt-14">
            {by.check.map((block) => renderBlock(block))}
            {applyBlocks.map((block) => renderBlock(block))}
          </GuidedStepFrame>
        ) : null}

        {by.more.length > 0 ? (
          <GuidedStepFrame id="flagship-step-more" title="Optional deeper notes" className="mt-14">
            <CollapsibleMore summary="Common traps, wrap-up, and next steps">
              {by.more.map((block) => renderBlock(block, { forceExpanded: true }))}
            </CollapsibleMore>
          </GuidedStepFrame>
        ) : null}
      </div>
    )
  }

  const showObjectivesDefault = objectives.length > 0 && layout === 'default' && sessionType === 'lesson'

  if (layout === 'default' && sessionType === 'lesson' && objectives.length > 0) {
    return (
      <div data-testid="flagship-session-content">
        <div className="mt-8">
          <ObjectivesStrip objectives={objectives} />
        </div>
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

  return (
    <div data-testid="flagship-session-content">
      {showObjectivesDefault ? (
        <div className="mt-8">
          <ObjectivesStrip objectives={objectives} />
        </div>
      ) : null}

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
