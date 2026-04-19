/**
 * Curriculum evolution scaffold: aggregates local teaching signals into actionable review prompts.
 * Server-side cohort analytics can replace/augment this later—structures are intentionally forward-compatible.
 */

import { readTeachingSignals } from '../teaching/teachingSignals'
import type { TeachingLibraryId } from '../teaching/teachingTypes'
import { curriculumQualityForLibrary } from './curriculumQualityLayer'

export type CurriculumSignalRollup = {
  totalEvents: number
  helpQueries: number
  labHintRequests: number
  conceptViews: number
  lowConfidenceHelpMatches: number
  lessonViews: number
  catalogViews: number
  lessonCompletes: number
  lessonRevisits: number
  checkpointAttempts: number
  labStarts: number
  labCompletes: number
  weakAreaSignals: number
  revisionRevisits: number
  browseSignupSignals: number
  premiumInterestSignals: number
  signedInWorkspaceEntries: number
}

export function rollupTeachingSignals(): CurriculumSignalRollup {
  const all = readTeachingSignals()
  const count = (k: string) => all.filter((e) => e.kind === k).length
  return {
    totalEvents: all.length,
    helpQueries: count('help_query'),
    labHintRequests: count('lab_hint_request'),
    conceptViews: count('concept_view'),
    lowConfidenceHelpMatches: count('help_low_confidence_match'),
    lessonViews: count('library_lesson_view'),
    catalogViews: count('library_catalog_view'),
    lessonCompletes: count('lesson_complete'),
    lessonRevisits: count('lesson_revisit'),
    checkpointAttempts: count('checkpoint_attempt'),
    labStarts: count('lab_start'),
    labCompletes: count('lab_complete'),
    weakAreaSignals: count('weak_area_signal'),
    revisionRevisits: count('revision_revisit'),
    browseSignupSignals: count('browse_to_signup_signal'),
    premiumInterestSignals: count('premium_interest_signal'),
    signedInWorkspaceEntries: count('signed_in_workspace_entry'),
  }
}

/** Highest-signal concepts by repeated local views (proxy for “most revisited concepts” on-device). */
function topConceptIdsByViews(limit = 6): { id: string; views: number }[] {
  const views = readTeachingSignals().filter((e) => e.kind === 'concept_view')
  const map = new Map<string, number>()
  for (const e of views) {
    const id = String(e.payload.conceptId ?? '')
    if (!id) continue
    map.set(id, (map.get(id) ?? 0) + 1)
  }
  return [...map.entries()]
    .map(([id, n]) => ({ id, views: n }))
    .sort((a, b) => b.views - a.views)
    .slice(0, limit)
}

/** Human-readable checklist for periodic curriculum review—feeds topics/examples/misconceptions over time. */
export function curriculumFreshnessReviewPrompts(libraryId: TeachingLibraryId): string[] {
  const q = curriculumQualityForLibrary(libraryId)
  const roll = rollupTeachingSignals()
  const prompts: string[] = [
    `Refresh representative examples for: ${q.freshness.risingTopics.slice(0, 4).join(', ')}.`,
    `Revisit tool/platform clusters with neutral framing: ${q.freshness.toolAndPlatformClusters.slice(0, 4).join(', ')}.`,
    `Re-check scenario drills still punish the failure modes listed in competency stages (especially “${q.competencyStages[2]?.label ?? 'intermediate'}”).`,
  ]
  if (roll.lowConfidenceHelpMatches > 0) {
    prompts.push(
      `Follow up on ${roll.lowConfidenceHelpMatches} low-confidence learner-help matches—candidate KB gaps or wording mismatches.`,
    )
  }
  if (roll.labHintRequests > 5) {
    prompts.push(`Lab hint volume is elevated (${roll.labHintRequests} events)—review hardest labs for scaffolding and remediation clarity.`)
  }
  if (roll.labHintRequests > 0 && roll.labCompletes > 0 && roll.labHintRequests > roll.labCompletes * 3) {
    prompts.push(
      `Hints far exceed recorded lab completions (${roll.labHintRequests} hints vs ${roll.labCompletes} completions)—tighten lab outcomes or reduce hint dependency with clearer rubric gates.`,
    )
  }
  if (roll.lessonRevisits > roll.lessonCompletes && roll.lessonRevisits > 8) {
    prompts.push(
      `Lesson revisits exceed completes (${roll.lessonRevisits} revisits vs ${roll.lessonCompletes} completes)—strengthen retrieval drills and tie revisits to labs/checkpoints.`,
    )
  }
  if (roll.weakAreaSignals > 0) {
    prompts.push(
      `Weak/no-overlap help signals: ${roll.weakAreaSignals}—expand KB atoms for the most common query stems and cross-link lessons.`,
    )
  }
  if (roll.checkpointAttempts > 0) {
    prompts.push(
      `Checkpoint attempts observed: ${roll.checkpointAttempts}—review hardest items for misconception clarity and scenario stems.`,
    )
  }
  if (roll.revisionRevisits > 0) {
    prompts.push(`Revision/help loops engaged ${roll.revisionRevisits}×—ensure revision anchors align across lessons + labs for the same concepts.`)
  }
  if (roll.premiumInterestSignals > 0 || roll.browseSignupSignals > 0) {
    prompts.push(
      `Funnel signals: ${roll.browseSignupSignals} browse→signup clicks · ${roll.premiumInterestSignals} premium/pricing interest signals—verify gated lesson intros stay honest and navigable.`,
    )
  }
  const topConcepts = topConceptIdsByViews(5).filter((x) => x.views >= 2)
  if (topConcepts.length) {
    prompts.push(`Most revisited KB concepts (local views): ${topConcepts.map((c) => `${c.id} (${c.views}×)`).join(' · ')}.`)
  }
  return prompts
}

export function globalFreshnessHealthSummary(): string {
  const r = rollupTeachingSignals()
  return `Local teaching signals captured: ${r.totalEvents} total · ${r.helpQueries} help · ${r.labHintRequests} lab hints · ${r.lessonViews} lesson views · ${r.lessonCompletes} completes · ${r.checkpointAttempts} checkpoints · ${r.weakAreaSignals} weak-area/no-match · ${r.lowConfidenceHelpMatches} low-confidence matches (device-local sandbox).`
}
