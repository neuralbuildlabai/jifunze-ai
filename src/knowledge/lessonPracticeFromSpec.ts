import { PRACTICE_BUNDLE_VERSION, type LessonPracticeBundle, type PracticeMode, type PracticeTier } from '../training/practiceTypes'
import type { LessonKnowledgeBlueprint, ModuleKnowledgeBlueprint, TrainingKnowledgeSpec } from './types'

function titleForTier(tier: PracticeTier, topic: string): string {
  if (tier === 1) return `Guided practice: apply ${topic} to your context`
  if (tier === 2) return `Independent practice: ship a concrete artifact (${topic})`
  return `Reinforce: stress-test with a skeptical review (${topic})`
}

function modeForTier(tier: PracticeTier): PracticeMode {
  return tier === 1 ? 'guided' : 'independent'
}

/**
 * Derives a 3-step practice loop (guided → independent → reinforce) from the same knowledge graph
 * that generated the lesson, so practice is outcome-linked, not generic.
 */
export function buildLessonPracticeBundle(
  spec: TrainingKnowledgeSpec,
  mod: ModuleKnowledgeBlueprint,
  les: LessonKnowledgeBlueprint,
): LessonPracticeBundle {
  const topic = spec.domain.topic
  const objective = spec.domain.objective
  const moduleGoal = mod.module_goal
  const conceptLabels = spec.concepts
    .filter((c) => les.concept_ids.includes(c.id))
    .map((c) => c.label)
  const rubricFromConcepts = spec.concepts
    .filter((c) => les.concept_ids.includes(c.id))
    .flatMap((c) => {
      const w = c.label
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, ' ')
        .split(/\s+/)
        .filter((x) => x.length > 3)
        .slice(0, 2)
      return w
    })
  const rubric_keywords = [
    ...new Set([...rubricFromConcepts, 'stakeholder', 'constraint', 'signal', 'evidence', 'decision', 'outcome'].map((s) => s.toLowerCase())),
  ].slice(0, 10)

  const outcomeRefs = [
    `Module: ${mod.title}`,
    moduleGoal ? `Module goal: ${moduleGoal}` : null,
    `Lesson intent: ${les.learning_intent}`,
    objective,
  ].filter(Boolean) as string[]

  const basePrompt = join(
    `Using **${topic}**, draft a short work artifact that advances: **${objective}**. `,
    `Anchor it to a real stakeholder situation (name the channel or moment). `,
    `Make your decision points explicit: what you prioritize, what you defer, and how you’ll verify quality this week.`,
  )

  const exercises = ([1, 2, 3] as PracticeTier[]).map((tier) => {
    const hints =
      tier === 1
        ? [
            `Name the stakeholder and the constraint before proposing anything.`,
            `State one observable signal you’ll track this week.`,
            `List two non-goals so scope stays tight.`,
          ]
        : tier === 2
          ? [`Prefer tradeoffs over slogans — show what you sacrificed and why.`]
          : [`Add a “red team” objection and your response in one paragraph.`]

    const min_chars = tier === 1 ? 140 : tier === 2 ? 190 : 240

    const prompt =
      tier === 1
        ? basePrompt +
          `\n\n**Guided scaffold:** Write 4 bullets: Situation · Constraint · Decision · Signal.` +
          `\nThen convert those bullets into a tight paragraph someone else could execute.`
        : tier === 2
          ? basePrompt +
            `\n\n**Independent:** No scaffold. Produce a memo-style response (still short) suitable to share with a teammate.` +
            `\nInclude **acceptance criteria** that would let a reviewer say “approved” vs “needs revision”.`
          : basePrompt +
            `\n\n**Escalated:** Assume a skeptical reviewer.` +
            `\nAddress the top risk they’d raise about your approach for **${topic}**, cite what evidence would convince them, and revise one sentence to reduce that risk.`

    const escalation =
      tier === 2
        ? `If tier 2 felt vague, tighten acceptance criteria until they’re checkable (yes/no).`
        : tier === 3
          ? `Escalate rigor: reduce adjectives; increase testable commitments.`
          : undefined

    const worked =
      tier === 1
        ? join(
            `**Model shape (adapt, don’t copy words):**\n`,
            `- Situation: Launch update for returning customers.\n`,
            `- Constraint: One designer day + legal must review claims.\n`,
            `- Decision: Ship message A (proof-led) before message B (emotion-led).\n`,
            `- Signal: 3 support tickets or fewer referencing “confusing benefit”.`,
          )
        : tier === 2
          ? join(
              `**Example memo snippet:**\n`,
              `Decision: prioritize proof points over lifestyle imagery because refunds track to unclear claims.\n`,
              `Acceptance: legal approves claims list; CTR ≥ baseline; rollback if refund keyword spikes >10% WoW.`,
            )
          : join(
              `**Worked skeptical pass:**\n`,
              `Risk: benefit claim overreach.\n`,
              `Evidence pack: citations + screenshot of prior compliant copy.\n`,
              `Revision: Replace “best” with measurable comparative language tied to benchmark X.`,
            )

    return {
      id: `practice-${tier}`,
      mode: modeForTier(tier),
      tier,
      title: titleForTier(tier, topic),
      outcome_refs: outcomeRefs,
      prompt,
      success_criteria: [
        `Links clearly to objective: ${objective}`,
        `Uses ${topic}-specific constraints, not generic advice`,
        `Defines an observable outcome or acceptance check`,
      ],
      guided_hints: tier === 1 ? hints : tier === 2 ? hints : hints,
      rubric_keywords,
      min_chars,
      worked_solution: worked,
      escalation_note: escalation,
    }
  })

  return {
    version: PRACTICE_BUNDLE_VERSION,
    ties_to_outcomes: [...outcomeRefs, ...conceptLabels.slice(0, 2)],
    exercises,
  }
}

function join(...parts: string[]): string {
  return parts.filter(Boolean).join('')
}
