import type { TrainingKnowledgeSpec } from '../knowledge/types'
import type { WeakAreaReport } from './remediationTypes'
import { countPlanProgress } from './trainingProgress'
import type {
  LessonProgressRow,
  QuizAttemptRow,
  TrainingPlanLearnerPlacementRow,
  TrainingPlanWithTree,
} from './trainingTypes'
import type { DerivedContentAssetRecommendation, TeamFacilitatorInsight } from './facilitatorInsightTypes'
import { buildLearnerWeakAreaReport, rollupTeamWeakAreas, formatRemediationAppendixMarkdown } from './weakAreaAnalysis'

export type { TeamFacilitatorInsight } from './facilitatorInsightTypes'

function avg(numbers: number[]): number {
  if (!numbers.length) return 0
  return numbers.reduce((a, b) => a + b, 0) / numbers.length
}

function aggregateCommonMistakes(
  reports: WeakAreaReport[],
  learnerIds: string[],
): TeamFacilitatorInsight['common_mistakes'] {
  const acc = new Map<string, { occurrences: number; learners: Set<string> }>()
  reports.forEach((r, idx) => {
    const uid = learnerIds[idx] ?? `idx-${idx}`
    for (const p of r.errorPatterns) {
      const row = acc.get(p.description) ?? { occurrences: 0, learners: new Set<string>() }
      row.occurrences += p.occurrences
      row.learners.add(uid)
      acc.set(p.description, row)
    }
  })
  return [...acc.entries()]
    .map(([pattern_line, v]) => ({
      pattern_line,
      occurrences: v.occurrences,
      affected_learners: v.learners.size,
    }))
    .sort((a, b) => b.occurrences - a.occurrences || b.affected_learners - a.affected_learners)
    .slice(0, 12)
}

function misconceptionHitsForTeam(spec: TrainingKnowledgeSpec | null | undefined, weakLabels: string[]): string[] {
  if (!spec || !weakLabels.length) return []
  const hits: string[] = []
  const hay = weakLabels.join(' ').toLowerCase()
  for (const m of spec.misconceptions) {
    const myth = m.myth.toLowerCase()
    const labelOverlap = myth.split(/\s+/).some((w) => w.length > 4 && hay.includes(w))
    if (labelOverlap) {
      hits.push(`Misconception bridge: “${m.myth.slice(0, 140)}${m.myth.length > 140 ? '…' : ''}” → ${m.correction}`)
    }
    if (hits.length >= 6) break
  }
  return hits
}

function recommendDerivedAssets(params: {
  rollup: ReturnType<typeof rollupTeamWeakAreas>
  reports: WeakAreaReport[]
  avgCompletion: number
  spread: number
}): DerivedContentAssetRecommendation[] {
  const { rollup, reports, avgCompletion, spread } = params
  const out: DerivedContentAssetRecommendation[] = []
  const lowCal = reports.some((r) => r.lowConfidence.length > 0)
  const patternCount = reports.reduce((n, r) => n + r.errorPatterns.length, 0)
  const hotspot = (rollup?.concepts.length ?? 0) >= 1

  if (hotspot) {
    out.push({
      asset_type: 'team_recap_sheet',
      priority: 100,
      rationale: 'Align the cohort on shared hotspots before the next push — good for stand-ups or lunch-and-learns.',
    })
  }
  if (hotspot) {
    out.push({
      asset_type: 'refresher_handout',
      priority: 95,
      rationale: 'Short desk-side reminder after misses on checkpoints or practice retries.',
    })
  }
  if (lowCal || avgCompletion < 55 || spread > 28) {
    out.push({
      asset_type: 'manager_coaching_brief',
      priority: 88,
      rationale: 'Uneven pace or calibration signals — give managers three coaching prompts tied to observable work signals.',
    })
  }
  if (patternCount >= 2 || (rollup?.concepts.length ?? 0) >= 2) {
    out.push({
      asset_type: 'facilitator_discussion_guide',
      priority: 85,
      rationale: 'Repeated distractors / overlapping weak concepts → structured debrief with prompts and timers.',
    })
  }

  const seen = new Set<string>()
  return out.filter((x) => {
    if (seen.has(x.asset_type)) return false
    seen.add(x.asset_type)
    return true
  })
}

function followUpsFromRollup(
  rollup: ReturnType<typeof rollupTeamWeakAreas>,
  tree: TrainingPlanWithTree,
): TeamFacilitatorInsight['recommended_follow_up'] {
  const items: TeamFacilitatorInsight['recommended_follow_up'] = []
  if (!rollup) return items
  for (const v of rollup.topRevisitLessonIds.slice(0, 5)) {
    items.push({
      kind: 'revisit_lesson',
      title: `Group refresher on “${v.lessonTitle}”`,
      detail: `${v.hits} learner${v.hits === 1 ? '' : 's'} flagged — pair a short teach moment with a concrete artifact.`,
      href: `/training/${tree.plan.id}/lessons/${v.lessonId}`,
    })
  }
  items.push({
    kind: 'micro_drill',
    title: 'Spaced retrieval micro-drill',
    detail: 'Use mixed-topic / recap checkpoints as a warm-up before applying the skill in live work.',
  })
  return items
}

/**
 * Aggregates assigned learners on the same plan into facilitator-facing signals + asset guidance.
 */
export function buildTeamFacilitatorInsight(input: {
  tree: TrainingPlanWithTree
  learners: Array<{
    userId: string
    progress: LessonProgressRow[]
    attempts: QuizAttemptRow[]
    placement?: TrainingPlanLearnerPlacementRow | null
  }>
  knowledgeSpec?: TrainingKnowledgeSpec | null
}): TeamFacilitatorInsight {
  const { tree, learners, knowledgeSpec } = input
  const generatedAtIso = new Date().toISOString()
  const planId = tree.plan.id

  const learnerIds = learners.map((l) => l.userId)

  const reports = learners.map((L) =>
    buildLearnerWeakAreaReport({
      tree,
      progress: L.progress,
      quizAttempts: L.attempts,
      placement: L.placement ?? null,
      knowledgeSpec: knowledgeSpec ?? null,
    }),
  )

  const rollup = rollupTeamWeakAreas(reports)

  const completionPercents = learners.map((L) => {
    const c = countPlanProgress({ tree, progress: L.progress, attempts: L.attempts })
    const denom = c.totalLessons + c.totalQuizzes
    return denom > 0 ? Math.round(((c.completedLessons + c.completedQuizzes) / denom) * 100) : 0
  })
  const avgCompletion = Math.round(avg(completionPercents))
  const spread =
    completionPercents.length > 1
      ? Math.max(...completionPercents) - Math.min(...completionPercents)
      : 0

  const weakLabels = rollup?.concepts.map((c) => c.label) ?? []
  const misconception_bridge_lines = misconceptionHitsForTeam(knowledgeSpec, weakLabels)

  const common_mistakes = aggregateCommonMistakes(reports, learnerIds)

  const recommended_follow_up = followUpsFromRollup(rollup, tree)

  const recommended_derived_assets = recommendDerivedAssets({
    rollup,
    reports,
    avgCompletion,
    spread,
  }).sort((a, b) => b.priority - a.priority)

  const summaryLine =
    rollup && rollup.concepts.length > 0
      ? `${rollup.summaryLine}`
      : `Average cohort completion ~${avgCompletion}% across ${learners.length} learner${learners.length === 1 ? '' : 's'}.${misconception_bridge_lines.length ? ' Bridge misconceptions flagged from the knowledge graph.' : ''}`

  return {
    generatedAtIso,
    planId,
    learner_count: learners.length,
    progress_summary: {
      avg_completion_percent: avgCompletion,
      spread_completion_percent: spread,
      per_learner_completion_percent: learners.map((L, i) => ({
        userId: L.userId,
        percent: completionPercents[i] ?? 0,
      })),
    },
    weak_area_rollup: rollup,
    common_mistakes,
    recommended_follow_up,
    recommended_derived_assets,
    misconception_bridges: misconception_bridge_lines.length ? misconception_bridge_lines : undefined,
    summaryLine,
  }
}

/** Markdown block for facilitator / team-oriented derived assets (append to deterministic spec output). */
export function formatFacilitatorInsightAppendixMarkdown(
  insight: TeamFacilitatorInsight,
  input?: { planTitle?: string | null },
): string {
  const lines: string[] = []
  lines.push(`## Team / facilitator insight`)
  lines.push(``)
  if (input?.planTitle) lines.push(`_Plan: ${input.planTitle}_`, ``)
  lines.push(
    `_Generated ${insight.generatedAtIso} · ${insight.learner_count} learner${insight.learner_count === 1 ? '' : 's'}._`,
  )
  lines.push(``)
  lines.push(
    `**Average completion:** ~${insight.progress_summary.avg_completion_percent}% · **spread:** ${insight.progress_summary.spread_completion_percent}%`,
  )
  lines.push(``)
  if (insight.weak_area_rollup?.concepts.length) {
    lines.push(`### Shared weak areas`)
    for (const c of insight.weak_area_rollup.concepts.slice(0, 8)) {
      lines.push(
        `- **${c.label}** — ${c.learnerHits} learner${c.learnerHits === 1 ? '' : 's'}, ${c.quizWrongTotal} weighted quiz misses`,
      )
    }
    lines.push(``)
  }
  if (insight.common_mistakes.length) {
    lines.push(`### Common mistake signals`)
    for (const m of insight.common_mistakes.slice(0, 8)) {
      lines.push(`- (${m.affected_learners} learners · ${m.occurrences} weighted hits) ${m.pattern_line}`)
    }
    lines.push(``)
  }
  if (insight.recommended_follow_up.length) {
    lines.push(`### Recommended follow-up`)
    for (const f of insight.recommended_follow_up) {
      lines.push(`- **${f.title}** — ${f.detail}`)
    }
    lines.push(``)
  }
  if (insight.recommended_derived_assets.length) {
    lines.push(`### Suggested reinforcement assets`)
    for (const a of insight.recommended_derived_assets) {
      lines.push(`- **${a.asset_type}** — ${a.rationale}`)
    }
  }
  if (insight.misconception_bridges?.length) {
    lines.push(``, `### Knowledge-graph misconception bridges`)
    for (const m of insight.misconception_bridges.slice(0, 6)) {
      lines.push(`- ${m}`)
    }
  }
  return lines.join('\n')
}

/** Merges learner + team remediation blocks for previews/saves. */
export function formatCombinedTeamRemediationMarkdown(input: {
  learnerReport?: import('./remediationTypes').WeakAreaReport | null
  facilitatorInsight?: TeamFacilitatorInsight | null
  planTitle?: string | null
}): string {
  const parts: string[] = []
  if (input.learnerReport) {
    parts.push(formatRemediationAppendixMarkdown(input.learnerReport, { planTitle: input.planTitle }))
  }
  if (input.facilitatorInsight) {
    parts.push(formatFacilitatorInsightAppendixMarkdown(input.facilitatorInsight, { planTitle: input.planTitle }))
  }
  return parts.filter(Boolean).join('\n\n')
}
