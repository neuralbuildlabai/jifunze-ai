import type { StandaloneCourseLessonBlock } from '../../data/courses/practicalMathematicsCourseTypes'

// ─── Dataset Table ────────────────────────────────────────────────────────────

export function DatasetTableBlock({ block }: { block: StandaloneCourseLessonBlock }) {
  if (!block.tableColumns?.length || !block.tableRows?.length) return null
  return (
    <div
      className="overflow-hidden rounded-xl border border-stone-200/90 shadow-sm"
      data-testid="visual-block-dataset-table"
    >
      {(block.eyebrow || block.title) && (
        <div className="border-b border-stone-200 bg-stone-50 px-4 py-2.5">
          {block.eyebrow && (
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-stone-500">{block.eyebrow}</p>
          )}
          {block.title && (
            <p className={`text-[14px] font-semibold text-stone-900 ${block.eyebrow ? 'mt-0.5' : ''}`}>
              {block.title}
            </p>
          )}
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b border-stone-200 bg-stone-50/60">
              {block.tableColumns.map((col, i) => (
                <th
                  key={i}
                  className="whitespace-nowrap px-4 py-2.5 text-left text-[11px] font-semibold uppercase tracking-[0.1em] text-stone-600"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {block.tableRows.map((row, i) => (
              <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-stone-50/40'}>
                {row.cells.map((cell, j) => (
                  <td
                    key={j}
                    className={`px-4 py-3 leading-snug text-stone-700 ${j === 0 ? 'font-medium text-stone-900' : ''}`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {block.content && (
        <p className="border-t border-stone-100 bg-stone-50 px-4 py-2.5 text-[12px] text-stone-500">
          {block.content}
        </p>
      )}
    </div>
  )
}

// ─── Bar Chart (horizontal CSS bars) ─────────────────────────────────────────

export function BarChartBlock({ block }: { block: StandaloneCourseLessonBlock }) {
  if (!block.chartItems?.length) return null
  const maxVal = Math.max(...block.chartItems.map((i) => i.value), 1)
  const isSavings = (block.eyebrow ?? '').toLowerCase().includes('sav')
  const barClass = isSavings ? 'bg-emerald-500' : 'bg-orange-500'
  const trackClass = isSavings ? 'bg-emerald-100' : 'bg-orange-100'
  return (
    <div
      className="rounded-xl border border-stone-200/90 bg-white p-5 shadow-sm"
      data-testid="visual-block-bar-chart"
    >
      {block.eyebrow && (
        <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-stone-500">{block.eyebrow}</p>
      )}
      {block.title && <p className="mb-4 text-[14px] font-semibold text-stone-900">{block.title}</p>}
      <div className="space-y-3">
        {block.chartItems.map((item) => {
          const pct = (item.value / maxVal) * 100
          return (
            <div key={item.label} className="flex items-center gap-3">
              <span className="w-36 shrink-0 text-right text-[12px] leading-tight text-stone-600">{item.label}</span>
              <div className={`relative h-5 flex-1 overflow-hidden rounded-full ${trackClass}`}>
                <div className={`h-full rounded-full transition-all duration-500 ${barClass}`} style={{ width: `${pct}%` }} />
              </div>
              <span className="w-16 shrink-0 tabular-nums text-[12px] font-semibold text-stone-700">
                {item.value}
                {item.unit ?? ' hrs'}
              </span>
            </div>
          )
        })}
      </div>
      {block.content && <p className="mt-4 text-[12px] text-stone-500">{block.content}</p>}
    </div>
  )
}

// ─── Heatmap (color-coded rows by severity level) ────────────────────────────

const HEAT_ROW: Record<string, string> = {
  low: 'border-l-4 border-emerald-400 bg-emerald-50/70',
  medium: 'border-l-4 border-amber-400 bg-amber-50/70',
  high: 'border-l-4 border-orange-400 bg-orange-50/70',
  critical: 'border-l-4 border-red-500 bg-red-50/70',
}
const HEAT_PILL: Record<string, string> = {
  low: 'bg-emerald-100 text-emerald-800',
  medium: 'bg-amber-100 text-amber-800',
  high: 'bg-orange-100 text-orange-900',
  critical: 'bg-red-100 text-red-900',
}

export function HeatmapBlock({ block }: { block: StandaloneCourseLessonBlock }) {
  if (!block.heatmapRows?.length) return null
  return (
    <div
      className="overflow-hidden rounded-xl border border-stone-200/90 shadow-sm"
      data-testid="visual-block-heatmap"
    >
      {block.title && (
        <div className="border-b border-stone-200 bg-stone-50 px-4 py-2.5">
          <p className="text-[14px] font-semibold text-stone-900">{block.title}</p>
        </div>
      )}
      <div className="divide-y divide-stone-100 bg-white">
        {block.heatmapRows.map((row, i) => (
          <div key={i} className={`flex items-center justify-between px-4 py-3 ${HEAT_ROW[row.level]}`}>
            <span className="text-[13px] font-medium text-stone-800">{row.label}</span>
            <span className={`rounded-full px-2.5 py-0.5 text-[12px] font-bold ${HEAT_PILL[row.level]}`}>
              {row.displayValue}
            </span>
          </div>
        ))}
      </div>
      {block.content && (
        <p className="border-t border-stone-100 bg-stone-50 px-4 py-2.5 text-[12px] text-stone-500">
          {block.content}
        </p>
      )}
    </div>
  )
}

// ─── Calculation Card ─────────────────────────────────────────────────────────

export function CalculationCardBlock({ block }: { block: StandaloneCourseLessonBlock }) {
  return (
    <div
      className="rounded-xl border border-blue-200/70 bg-gradient-to-br from-blue-50/60 to-white p-5 shadow-sm"
      data-testid="visual-block-calculation-card"
    >
      {block.eyebrow && (
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-blue-700">{block.eyebrow}</p>
      )}
      {block.title && (
        <p className={`text-[15px] font-semibold text-blue-950 ${block.eyebrow ? 'mt-1' : ''}`}>{block.title}</p>
      )}
      {block.content && (
        <div className="mt-3 rounded-lg border border-blue-100 bg-blue-50/80 px-4 py-3 font-mono text-[14px] leading-relaxed text-blue-950">
          {block.content}
        </div>
      )}
      {block.bullets?.length ? (
        <ul className="mt-3 space-y-1.5 text-[13px] text-blue-900/80">
          {block.bullets.map((b, i) => (
            <li key={i} className="flex gap-2.5">
              <span className="font-bold text-blue-500" aria-hidden>
                →
              </span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

// ─── Stat Grid (KPI cards) ────────────────────────────────────────────────────

export function StatGridBlock({ block }: { block: StandaloneCourseLessonBlock }) {
  if (!block.statItems?.length) return null
  return (
    <div
      className="rounded-xl border border-stone-200/90 bg-white p-5 shadow-sm"
      data-testid="visual-block-stat-grid"
    >
      {block.title && <p className="mb-4 text-[14px] font-semibold text-stone-900">{block.title}</p>}
      <div className="grid gap-3 sm:grid-cols-2">
        {block.statItems.map((item, i) => (
          <div key={i} className="rounded-xl border border-stone-100 bg-stone-50/60 px-4 py-3.5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-stone-500">{item.label}</p>
            <p className="mt-1 text-[22px] font-bold leading-none text-stone-900">{item.value}</p>
            {item.sub && <p className="mt-1.5 text-[12px] leading-snug text-stone-500">{item.sub}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Roadmap Timeline (vertical phases) ──────────────────────────────────────

export function RoadmapTimelineBlock({ block }: { block: StandaloneCourseLessonBlock }) {
  if (!block.roadmapPhases?.length) return null
  return (
    <div
      className="rounded-xl border border-stone-200/90 bg-white p-5 shadow-sm"
      data-testid="visual-block-roadmap-timeline"
    >
      {block.title && <p className="mb-5 text-[14px] font-semibold text-stone-900">{block.title}</p>}
      <div className="space-y-0">
        {block.roadmapPhases.map((phase, i) => (
          <div key={i} className="flex gap-4">
            <div className="flex shrink-0 flex-col items-center">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-600 text-[13px] font-bold text-white shadow-sm shadow-orange-200">
                {i + 1}
              </div>
              {i < block.roadmapPhases!.length - 1 && (
                <div className="my-1 min-h-[2rem] w-0.5 flex-1 bg-orange-200" />
              )}
            </div>
            <div className="pb-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-orange-700">{phase.days}</p>
              <p className="mt-0.5 text-[15px] font-semibold text-stone-900">{phase.phase}</p>
              <ul className="mt-2 space-y-1">
                {phase.items.map((item, j) => (
                  <li key={j} className="flex gap-2 text-[13px] leading-snug text-stone-600">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-orange-400" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Priority Matrix (2×2 impact/effort) ─────────────────────────────────────

export function PriorityMatrixBlock({ block }: { block: StandaloneCourseLessonBlock }) {
  if (!block.matrixQuadrants) return null
  const { topLeft, topRight, bottomLeft, bottomRight, xLabel, yLabel } = block.matrixQuadrants
  const quadrants = [
    { data: topLeft, border: 'border-emerald-200/80', bg: 'bg-emerald-50/60', pill: 'bg-emerald-100 text-emerald-800' },
    { data: topRight, border: 'border-amber-200/80', bg: 'bg-amber-50/60', pill: 'bg-amber-100 text-amber-800' },
    { data: bottomLeft, border: 'border-sky-200/80', bg: 'bg-sky-50/60', pill: 'bg-sky-100 text-sky-800' },
    { data: bottomRight, border: 'border-stone-200/80', bg: 'bg-stone-50/60', pill: 'bg-stone-100 text-stone-700' },
  ]
  return (
    <div
      className="rounded-xl border border-stone-200/90 bg-white p-5 shadow-sm"
      data-testid="visual-block-priority-matrix"
    >
      {block.title && <p className="mb-4 text-[14px] font-semibold text-stone-900">{block.title}</p>}
      {yLabel && (
        <p className="mb-1 text-[11px] font-medium text-stone-400">↑ High {yLabel}</p>
      )}
      <div className="grid grid-cols-2 gap-2">
        {quadrants.map((q, i) => (
          <div key={i} className={`rounded-xl border p-3.5 ${q.border} ${q.bg}`}>
            <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${q.pill}`}>
              {q.data.label}
            </span>
            <ul className="mt-2 space-y-1">
              {q.data.items.map((item, j) => (
                <li key={j} className="text-[12px] leading-snug text-stone-700">
                  · {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {xLabel && (
        <p className="mt-1 text-right text-[11px] font-medium text-stone-400">High {xLabel} →</p>
      )}
    </div>
  )
}

// ─── Process Flow (numbered steps) ───────────────────────────────────────────

export function ProcessFlowBlock({ block }: { block: StandaloneCourseLessonBlock }) {
  if (!block.processSteps?.length) return null
  return (
    <div
      className="rounded-xl border border-orange-100/80 bg-gradient-to-br from-orange-50/40 to-white p-5 shadow-sm"
      data-testid="visual-block-process-flow"
    >
      {block.title && <p className="mb-4 text-[14px] font-semibold text-stone-900">{block.title}</p>}
      <ol className="space-y-3">
        {block.processSteps.map((step, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-orange-600 text-[12px] font-bold text-white shadow-sm">
              {i + 1}
            </span>
            <div className="pt-0.5">
              <p className="text-[14px] font-semibold text-stone-900">{step.step}</p>
              {step.detail && <p className="mt-0.5 text-[13px] leading-snug text-stone-600">{step.detail}</p>}
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

// ─── Slide Preview Grid (course overview page) ────────────────────────────────

export function SlidePreviewGrid(props: {
  cards: Array<{
    moduleNumber: number
    title: string
    subtitle: string
    visualCue: string
    learnerOutput: string
  }>
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-testid="standalone-slide-preview-grid">
      {props.cards.map((card) => (
        <div
          key={card.moduleNumber}
          className="rounded-2xl border border-stone-200/90 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
        >
          <div className="mb-3 flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-600 text-[12px] font-bold text-white">
              {card.moduleNumber}
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-orange-700">
              Module {card.moduleNumber}
            </span>
          </div>
          <h3 className="text-[15px] font-semibold leading-tight text-stone-900">{card.title}</h3>
          <p className="mt-2 text-[13px] leading-snug text-stone-600">{card.subtitle}</p>
          <div className="mt-3 rounded-lg border border-stone-100 bg-stone-50 px-3 py-2.5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-stone-400">Deck focus</p>
            <p className="mt-0.5 text-[13px] font-medium text-stone-800">{card.visualCue}</p>
          </div>
          <div className="mt-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-700">Learner output</p>
            <p className="mt-0.5 text-[13px] text-stone-700">{card.learnerOutput}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── Main dispatcher (called from StandaloneLessonBlocks) ────────────────────

export function StandaloneVisualBlock({
  block,
}: {
  block: StandaloneCourseLessonBlock
  lessonSlug: string
}) {
  switch (block.type) {
    case 'dataset_table':
      return <DatasetTableBlock block={block} />
    case 'bar_chart':
      return <BarChartBlock block={block} />
    case 'heatmap':
      return <HeatmapBlock block={block} />
    case 'calculation_card':
      return <CalculationCardBlock block={block} />
    case 'stat_grid':
      return <StatGridBlock block={block} />
    case 'roadmap_timeline':
      return <RoadmapTimelineBlock block={block} />
    case 'priority_matrix':
      return <PriorityMatrixBlock block={block} />
    case 'process_flow':
      return <ProcessFlowBlock block={block} />
    default:
      return null
  }
}
