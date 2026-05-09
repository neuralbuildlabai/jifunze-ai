import { useId, useState, type ReactNode } from 'react'
import type { StandaloneCourseLessonBlock } from '../../data/courses/practicalMathematicsCourseTypes'

function LessonParagraphs({ text }: { text: string | undefined }) {
  if (!text?.trim()) return null
  const parts = text.trim().split(/\n{2,}/)
  return (
    <div className="space-y-3 text-[15px] leading-relaxed text-stone-800">
      {parts.map((p, i) => (
        <p key={i}>{p.replace(/\n/g, ' ')}</p>
      ))}
    </div>
  )
}

function BlockShell({
  children,
  className,
  'data-testid': dataTestId,
}: {
  children: ReactNode
  className?: string
  'data-testid'?: string
}) {
  return (
    <div className={`rounded-2xl border p-5 sm:p-6 ${className ?? ''}`} data-testid={dataTestId}>
      {children}
    </div>
  )
}

function AnswerKeyCollapsible({ answerKey, label }: { answerKey: string; label: string }) {
  const id = useId()
  const [open, setOpen] = useState(false)
  return (
    <div className="mt-4 border-t border-stone-200/80 pt-4">
      <button
        type="button"
        className="text-left text-[13px] font-semibold text-orange-800 hover:text-orange-900"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
      >
        {open ? '▼ ' : '▶ '}
        {label}
      </button>
      {open ? (
        <div id={id} className="mt-2 rounded-lg bg-stone-50 p-3 text-[14px] leading-relaxed text-stone-800">
          <LessonParagraphs text={answerKey} />
        </div>
      ) : null}
    </div>
  )
}

export function StandaloneLessonBlocks({ blocks, lessonSlug }: { blocks: StandaloneCourseLessonBlock[]; lessonSlug: string }) {
  return (
    <div className="space-y-6" data-testid="standalone-lesson-blocks">
      {blocks.map((block, idx) => {
        const key = `${lessonSlug}-${idx}-${block.type}`
        switch (block.type) {
          case 'concept_explanation':
            return (
              <BlockShell key={key} className="border-stone-200/90 bg-white shadow-sm">
                {block.eyebrow ? (
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-orange-700">{block.eyebrow}</p>
                ) : null}
                {block.title ? <h2 className="mt-2 text-xl font-semibold text-zinc-900">{block.title}</h2> : null}
                {block.content ? <div className="mt-4"><LessonParagraphs text={block.content} /></div> : null}
                {block.bullets?.length ? (
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-[14px] text-stone-800">
                    {block.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                ) : null}
                {block.facilitatorNote ? (
                  <p className="mt-4 text-[12px] text-stone-500">{block.facilitatorNote}</p>
                ) : null}
              </BlockShell>
            )

          case 'worked_example':
            return (
              <BlockShell
                key={key}
                className="border-orange-200/80 bg-gradient-to-b from-orange-50/40 to-white shadow-md shadow-orange-500/10"
                data-testid="standalone-lesson-block-worked-example"
              >
                {block.eyebrow ? (
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-orange-800">{block.eyebrow}</p>
                ) : null}
                {block.title ? <h2 className="mt-2 text-xl font-semibold text-zinc-900">{block.title}</h2> : null}
                {block.content ? <div className="mt-4"><LessonParagraphs text={block.content} /></div> : null}
                {block.examples?.length ? (
                  <ol className="mt-5 space-y-3 border-t border-orange-100/80 pt-4">
                    {block.examples.map((ex, i) => (
                      <li key={i} className="flex gap-3 text-[14px] leading-snug text-stone-800">
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-600 text-[12px] font-bold text-white">
                          {i + 1}
                        </span>
                        <span>{ex}</span>
                      </li>
                    ))}
                  </ol>
                ) : null}
              </BlockShell>
            )

          case 'guided_practice':
            return (
              <BlockShell
                key={key}
                className="border-sky-200/90 bg-gradient-to-br from-sky-50/50 to-white shadow-sm"
                data-testid="standalone-lesson-block-guided-practice"
              >
                {block.eyebrow ? (
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-sky-800">{block.eyebrow}</p>
                ) : null}
                {block.title ? <h2 className="mt-2 text-xl font-semibold text-zinc-900">{block.title}</h2> : null}
                {block.content ? <div className="mt-4"><LessonParagraphs text={block.content} /></div> : null}
                {block.prompt ? <p className="mt-4 text-[14px] font-medium text-sky-950">{block.prompt}</p> : null}
                {block.learnerTask ? (
                  <div className="mt-3 rounded-xl border border-sky-100 bg-white/90 p-4 text-[14px] text-stone-800">
                    <span className="font-semibold text-sky-900">Your turn: </span>
                    {block.learnerTask}
                  </div>
                ) : null}
                {block.answerKey ? (
                  <div className="mt-4">
                    <p className="text-[12px] font-semibold uppercase tracking-wide text-stone-600">Answer key</p>
                    <div className="mt-2 rounded-lg bg-white p-3 text-[14px] text-stone-800">
                      <LessonParagraphs text={block.answerKey} />
                    </div>
                  </div>
                ) : null}
              </BlockShell>
            )

          case 'pause_and_check':
            return (
              <BlockShell
                key={key}
                className="border-violet-200/90 bg-violet-50/35 shadow-sm"
                data-testid="standalone-lesson-block-pause-and-check"
              >
                {block.eyebrow ? (
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-violet-800">{block.eyebrow}</p>
                ) : null}
                {block.title ? <h2 className="mt-2 text-xl font-semibold text-violet-950">{block.title}</h2> : null}
                {block.content ? <div className="mt-4 text-[15px] text-violet-950/90"><LessonParagraphs text={block.content} /></div> : null}
              </BlockShell>
            )

          case 'common_mistakes':
            return (
              <BlockShell
                key={key}
                className="border-amber-200/90 bg-amber-50/50 shadow-sm"
                data-testid="standalone-lesson-block-common-mistakes"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-amber-900">Heads up — easy fixes</p>
                {block.title ? <h2 className="mt-2 text-xl font-semibold text-amber-950">{block.title}</h2> : null}
                {block.content ? <div className="mt-4 text-[15px] text-amber-950/90"><LessonParagraphs text={block.content} /></div> : null}
              </BlockShell>
            )

          case 'real_world_application':
          case 'scenario':
            return (
              <BlockShell key={key} className="border-emerald-200/80 bg-emerald-50/30 shadow-sm">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-800">
                  {block.eyebrow ?? 'Real-world use'}
                </p>
                {block.title ? <h2 className="mt-2 text-xl font-semibold text-emerald-950">{block.title}</h2> : null}
                {block.content ? <div className="mt-4 text-[15px] text-emerald-950/90"><LessonParagraphs text={block.content} /></div> : null}
              </BlockShell>
            )

          case 'practice_task':
            return (
              <BlockShell key={key} className="border-stone-200/90 bg-white shadow-sm" data-testid="standalone-lesson-block-practice-task">
                {block.eyebrow ? (
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-orange-700">{block.eyebrow}</p>
                ) : null}
                {block.title ? <h2 className="mt-2 text-xl font-semibold text-zinc-900">{block.title}</h2> : null}
                {block.content ? <div className="mt-4"><LessonParagraphs text={block.content} /></div> : null}
                {block.learnerTask ? (
                  <div className="mt-4 rounded-xl border border-orange-100 bg-orange-50/20 p-4 text-[14px] text-stone-900">
                    <span className="font-semibold text-orange-900">Task: </span>
                    {block.learnerTask}
                  </div>
                ) : null}
                {block.outputExpectation ? (
                  <p className="mt-3 text-[13px] text-stone-600">{block.outputExpectation}</p>
                ) : null}
                {block.answerKey ? (
                  <AnswerKeyCollapsible answerKey={block.answerKey} label="Answer key" />
                ) : null}
              </BlockShell>
            )

          case 'reflection_or_application':
            return (
              <BlockShell key={key} className="border-indigo-200/70 bg-indigo-50/25 shadow-sm">
                {block.eyebrow ? (
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-indigo-800">{block.eyebrow}</p>
                ) : null}
                {block.title ? <h2 className="mt-2 text-xl font-semibold text-indigo-950">{block.title}</h2> : null}
                {block.content ? <div className="mt-4 text-[15px] text-indigo-950/90"><LessonParagraphs text={block.content} /></div> : null}
                {block.prompt ? <p className="mt-4 text-[14px] font-medium text-indigo-950">{block.prompt}</p> : null}
              </BlockShell>
            )

          case 'summary':
            return (
              <BlockShell key={key} className="border-stone-200/90 bg-stone-50/80 shadow-sm">
                {block.eyebrow ? (
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-600">{block.eyebrow}</p>
                ) : null}
                {block.title ? <h2 className="mt-2 text-xl font-semibold text-zinc-900">{block.title}</h2> : null}
                {block.content ? <div className="mt-4"><LessonParagraphs text={block.content} /></div> : null}
              </BlockShell>
            )

          case 'quiz_intro':
            return (
              <BlockShell key={key} className="border-orange-200/80 bg-gradient-to-r from-orange-50/60 to-white shadow-sm">
                {block.eyebrow ? (
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-orange-800">{block.eyebrow}</p>
                ) : null}
                {block.title ? <h2 className="mt-2 text-lg font-semibold text-zinc-900">{block.title}</h2> : null}
                {block.content ? <div className="mt-3 text-[14px] leading-relaxed text-stone-800"><LessonParagraphs text={block.content} /></div> : null}
              </BlockShell>
            )

          default:
            return (
              <BlockShell key={key} className="border-stone-200 bg-white">
                <p className="text-[12px] text-stone-500">{(block as StandaloneCourseLessonBlock).type}</p>
                {block.title ? <h2 className="mt-1 text-lg font-semibold">{block.title}</h2> : null}
                {block.content ? <div className="mt-3"><LessonParagraphs text={block.content} /></div> : null}
              </BlockShell>
            )
        }
      })}
    </div>
  )
}
