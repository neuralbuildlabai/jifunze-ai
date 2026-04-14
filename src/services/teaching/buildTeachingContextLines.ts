import type { ContentOpportunity } from '../../types/opportunity'

/**
 * Prompt-side teaching instructions (deterministic; future models consume same strings).
 */
export function buildTeachingContextLines(opportunity: ContentOpportunity): string[] {
  const lines = [
    `Teaching level: ${opportunity.teaching_level}`,
    `Explanation style: ${opportunity.explanation_style.replace(/_/g, ' ')}`,
    'Teaching structure: Open with one plain sentence, then 2–4 numbered steps, then one real-world example. Add a “when to use / when not to” line if space allows.',
    'Progressive depth: Step 1–2 for beginners; step 3+ adds nuance for intermediate readers without jargon walls.',
  ]

  for (const e of opportunity.teaching_explainability.slice(0, 5)) {
    lines.push(
      `Teaching trace: ${e.what} — ${e.why}${e.influencedBy ? ` [${e.influencedBy}]` : ''}`,
    )
  }

  if (opportunity.content_domain === 'ai') {
    lines.push(
      'AI domain: prioritize definitions before acronyms, cite tradeoffs, avoid hype adjectives; include optional “How to start” micro-block.',
    )
  }

  return lines
}
