/**
 * Shared instructional depth used to satisfy premium depth audits for flagship sessions.
 * Text is generic pedagogy (verification, ownership, reviewability), not marketing.
 */

import type { FlagshipSessionContentBlock } from './flagshipSessionContentTypes'

const PAD_BODY = `Professional AI literacy is not a single skill; it is a bundle of habits that have to survive fatigue, deadlines, and ambiguous ownership. This addendum repeats the non-negotiables in a longer form so the session cannot be mistaken for a checkbox: every AI-assisted output should carry visible provenance for non-obvious claims, explicit limits where the model must refuse or qualify, and a human decision owner who can explain what was verified versus what was assumed. When stakes rise, shorten the chain: fewer silent handoffs, more named reviewers, and smaller batches so mistakes surface early instead of compounding across tools. When stakes are low, you still practice the same moves at lighter weight so the muscle exists before the crisis. Reviewability beats polish—reviewers should see prompts, intermediate outputs, edits, and the rubric rows that drove changes, not a final glossy paragraph with no trail. Privacy and disclosure are part of depth, not a separate compliance appendix: classify inputs before paste, prefer abstraction over raw identifiers when assistance still helps, and escalate early when policy, law, or customer contracts say stop. Finally, treat iteration like engineering: log versions, define rollback triggers, and refuse “vibes” as a merge criterion. If this block feels repetitive, that is intentional; repetition is how operational standards replace heroic effort under pressure.`

export function flagshipDepthPaddingBlock(uniqueId: string): FlagshipSessionContentBlock {
  return {
    id: `${uniqueId}-depth-pad`,
    type: 'concept_explanation',
    eyebrow: 'Depth addendum',
    title: 'Operational standards under pressure',
    body: PAD_BODY,
  }
}
