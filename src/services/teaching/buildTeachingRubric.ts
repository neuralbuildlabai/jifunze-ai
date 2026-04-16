import type { BrandProfile } from '../../types/brand'
import type { ContentOpportunity } from '../../types/opportunity'

function clarityRubric(pref: ContentOpportunity['clarity_preference']): string {
  switch (pref) {
    case 'plain':
      return 'Clarity rubric: plain — define terms; ban insider shorthand without gloss; prioritize scannability.'
    case 'concise_technical':
      return 'Clarity rubric: concise technical — correct terminology with one-line definitions; no filler hype.'
    default:
      return 'Clarity rubric: balanced — inline glosses; at most one stacked concept per paragraph.'
  }
}

function framingRubric(framing: ContentOpportunity['educational_framing']): string {
  switch (framing) {
    case 'how_it_works':
      return 'Framing: explain mechanism and sequence before opinions.'
    case 'why_it_matters':
      return 'Framing: lead with outcome relevance, then minimal steps to capture value.'
    case 'decision_guide':
      return 'Framing: decision-first; compare options against explicit criteria.'
    case 'news_with_context':
      return 'Framing: timestamp the change, add “so what”, then one recommended action.'
    default:
      return 'Framing: teach-first narrative arc.'
  }
}

/**
 * Structured rubric string embedded in {@link CreativeBrief.teaching_rubric}.
 */
export function buildTeachingRubric(opportunity: ContentOpportunity, brand: BrandProfile): string {
  const lvl = opportunity.teaching_level
  const st = opportunity.explanation_style.replace(/_/g, ' ')
  const domain = opportunity.content_domain

  const depth =
    lvl === 'beginner'
      ? 'Short sentences; define terms on first use; one analogy max.'
      : lvl === 'intermediate'
        ? 'Allow one stacked diagram or comparison table; keep prerequisites explicit.'
        : 'Permit tradeoffs, failure modes, and “who this is not for” — still one clear CTA.'

  const style =
    opportunity.explanation_style === 'step_by_step'
      ? 'Numbered steps (max 5), each step one action or idea.'
      : opportunity.explanation_style === 'quick_tip'
        ? 'One problem → one fix → one example in under 120 words of body.'
        : opportunity.explanation_style === 'breakdown'
          ? 'Labeled sections: What / Why / How / Risks.'
          : opportunity.explanation_style === 'analogy'
            ? 'Anchor with a familiar analogy, then map back to literal terms.'
            : opportunity.explanation_style === 'comparison'
              ? 'Two-column decision: criteria + verdict.'
              : 'Single concrete scenario walk-through with metrics or inputs.'

  const aiExtra =
    domain === 'ai'
      ? ' AI vertical: clarity over hype; teach-first ordering; optional “How to start” after the hook.'
      : ''

  return [
    `Brand voice ${brand.voice}; teaching target ${lvl}; explanation mode: ${st}.`,
    clarityRubric(opportunity.clarity_preference),
    framingRubric(opportunity.educational_framing),
    depth,
    style,
    aiExtra.trim(),
  ]
    .filter(Boolean)
    .join(' ')
}
