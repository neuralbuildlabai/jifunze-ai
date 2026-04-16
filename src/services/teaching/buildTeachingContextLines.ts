import type { ContentOpportunity } from '../../types/opportunity'

function clarityLines(pref: ContentOpportunity['clarity_preference']): string {
  switch (pref) {
    case 'plain':
      return 'Clarity: plain language — define terms on first use; avoid unexplained acronyms; short sentences.'
    case 'concise_technical':
      return 'Clarity: concise technical — precise terms OK when labeled; still one-line gloss for specialists skimming.'
    default:
      return 'Clarity: balanced — teach terms inline; one analogy or example before jargon.'
  }
}

function framingLines(framing: ContentOpportunity['educational_framing']): string {
  switch (framing) {
    case 'how_it_works':
      return 'Educational framing: how it works — hook → mechanism → steps → one takeaway.'
    case 'why_it_matters':
      return 'Educational framing: why it matters — outcome first, then the smallest explanation to act.'
    case 'decision_guide':
      return 'Educational framing: decision guide — criteria, tradeoffs, who it is / isn’t for, then recommendation.'
    case 'news_with_context':
      return 'Educational framing: news with context — what changed, why readers care, what to do next.'
    default:
      return 'Educational framing: teach-first; avoid hype; end with one concrete next step.'
  }
}

function styleStructureLine(style: ContentOpportunity['explanation_style']): string {
  switch (style) {
    case 'step_by_step':
      return 'Structure: numbered steps (max 5), one idea per step; optional “if you only do one thing” line.'
    case 'quick_tip':
      return 'Structure: one problem → one fix → one micro-example; keep under ~120 words of body if possible.'
    case 'breakdown':
      return 'Structure: labeled sections What / Why / How / Risks; plain labels; skimmable bullets.'
    case 'analogy':
      return 'Structure: analogy first, then map each part back to literal terms; avoid mixed metaphors.'
    case 'comparison':
      return 'Structure: two-option contrast with criteria; state the pick for this audience.'
    case 'use_case':
      return 'Structure: one scenario with inputs → actions → outcome; name constraints explicitly.'
    default:
      return 'Structure: clear sections; one concrete example; progressive depth.'
  }
}

function levelLine(level: ContentOpportunity['teaching_level']): string {
  switch (level) {
    case 'beginner':
      return 'Audience depth: beginner — no assumed prior tooling; one definition per new concept.'
    case 'intermediate':
      return 'Audience depth: intermediate — name prerequisites in one line; optional “go deeper” coda.'
    default:
      return 'Audience depth: advanced — include failure modes and limits; still one plain-English summary line.'
  }
}

/**
 * Prompt-side teaching instructions (deterministic; future models consume same strings).
 */
export function buildTeachingContextLines(opportunity: ContentOpportunity): string[] {
  const lines = [
    `Teaching level: ${opportunity.teaching_level}`,
    `Explanation style: ${opportunity.explanation_style.replace(/_/g, ' ')}`,
    clarityLines(opportunity.clarity_preference),
    framingLines(opportunity.educational_framing),
    levelLine(opportunity.teaching_level),
    styleStructureLine(opportunity.explanation_style),
    'Progressive depth: early lines stay concrete; later lines may add nuance without a jargon wall.',
  ]

  for (const e of opportunity.teaching_explainability.slice(0, 5)) {
    lines.push(
      `Teaching trace: ${e.what} — ${e.why}${e.influencedBy ? ` [${e.influencedBy}]` : ''}`,
    )
  }

  if (opportunity.content_domain === 'ai') {
    lines.push(
      'AI domain: teach before hype; name model/tooling limits; optional “How to start” after the hook; cite tradeoffs.',
    )
  }

  return lines
}
