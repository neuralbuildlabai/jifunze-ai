import type { TrendSignalRow } from './trendTypes'

export type GeneratedSummaryPayload = {
  summary_text: string
  recurring_themes_json: string[]
  changes_json: { headline: string; detail?: string }
  recommended_actions_json: Array<{ label: string; detail: string }>
}

/**
 * MVP: deterministic narrative from signals (no external LLM). Replace with model-backed generation later.
 */
export function generateSummaryFromSignals(input: {
  topicName: string
  signals: TrendSignalRow[]
}): GeneratedSummaryPayload {
  const { topicName, signals } = input
  const sorted = [...signals].sort((a, b) => (a.captured_at < b.captured_at ? 1 : -1))
  const top = sorted.slice(0, 8)
  const snippets = top.map((s) => `• (${s.source_name}) ${s.signal_text.trim()}`).join('\n')
  const themes = Array.from(
    new Set(
      top
        .map((s) => s.signal_text.split(/[.!?]/)[0]?.trim())
        .filter(Boolean)
        .slice(0, 5),
    ),
  ) as string[]

  const summary_text = [
    `Snapshot for “${topicName}”`,
    '',
    top.length === 0
      ? 'No signals captured yet — add observations or sample signals to generate a useful summary.'
      : `Across ${top.length} recent signal(s), the workspace is seeing recurring language around this theme. Use the list below to align training and content.`,
    '',
    top.length ? 'Recent signals:\n' + snippets : '',
  ]
    .filter(Boolean)
    .join('\n')

  const changes_json = {
    headline: top.length ? 'Signals cluster on this topic' : 'Awaiting first signals',
    detail:
      top.length > 2
        ? 'Multiple sources mention similar angles — consider tightening messaging and practice loops.'
        : undefined,
  }

  const recommended_actions_json =
    top.length === 0
      ? [
          {
            label: 'Capture 2–3 short signals',
            detail: 'Paste notes from community feedback, support tickets, or your own observations.',
          },
        ]
      : [
          {
            label: 'Map to a training plan',
            detail: 'Link a recommendation to an existing plan so learners practice the right skills.',
          },
          {
            label: 'Refresh one lesson objective',
            detail: 'Tie objectives to the phrasing you see in signals to improve relevance.',
          },
        ]

  return {
    summary_text,
    recurring_themes_json: themes.length ? themes : ['(themes will appear after more diverse signals)'],
    changes_json,
    recommended_actions_json,
  }
}
