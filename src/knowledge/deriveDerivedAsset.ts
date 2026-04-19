/**
 * Deterministic derivations from `TrainingKnowledgeSpec`.
 * Lineage for persisted saves: `derivedContentLineage.ts` · doc §5 `docs/jifunze-ontology-and-contracts.md`
 */
import type { DerivedContentAssetType, TrainingKnowledgeSpec } from './types'

export type DeriveDerivedAssetInput = {
  spec: TrainingKnowledgeSpec
  assetType: DerivedContentAssetType
  /** When set, narrow to one module blueprint (by sort_order index 0..n) */
  moduleIndex?: number
  /** When set with moduleIndex, narrow to one lesson in that module */
  lessonIndex?: number
  /** Optional learner/team weak-area appendix (deterministic markdown). */
  remediationAppendixMarkdown?: string
  /** Optional facilitator / cohort insight appendix (team training). */
  facilitatorInsightMarkdown?: string
  /** Optional learner-only checkpoint memory (summaries — no raw answers). */
  priorCheckpointHistoryMarkdown?: string
  /** Optional aggregate cohort weak-label patterns (frequency counts; managers/facilitators). */
  cohortCheckpointPatternsMarkdown?: string
  /** Learner-private exam-prep appendix (scores/segments/domains — no cohort leakage). */
  examPrepLearnerAppendixMarkdown?: string
  /** Aggregate-safe exam-prep appendix for facilitator/manager assets (no raw responses). */
  examPrepAggregateAppendixMarkdown?: string
}

function header(title: string, spec: TrainingKnowledgeSpec): string {
  const d = spec.domain
  return [
    `# ${title}`,
    ``,
    `**Topic:** ${d.topic}`,
    `**Level:** ${d.learner_level}`,
    `**Objective:** ${d.objective}`,
    d.prerequisites.length ? `**Prerequisites:** ${d.prerequisites.join(' · ')}` : null,
    ``,
  ]
    .filter(Boolean)
    .join('\n')
}

function conceptBullets(spec: TrainingKnowledgeSpec): string {
  return spec.concepts
    .map((c) => `- **${c.label}**${c.exam_relevance ? ` — _Exam/work:_ ${c.exam_relevance}` : ''}`)
    .join('\n')
}

function misconceptionTable(spec: TrainingKnowledgeSpec): string {
  if (!spec.misconceptions.length) return '_No misconceptions recorded._'
  return spec.misconceptions
    .map((m) => `| Myth | Correction |\n| --- | --- |\n| ${m.myth} | ${m.correction} |`)
    .join('\n\n')
}

function scenariosBlock(spec: TrainingKnowledgeSpec): string {
  if (!spec.scenarios.length) return ''
  return [
    `## Applied scenarios`,
    ...spec.scenarios.map(
      (s) =>
        `### ${s.id}\n**Context:** ${s.context}\n\n**Success looks like:** ${s.success_criteria}\n`,
    ),
  ].join('\n')
}

function moduleSlice(spec: TrainingKnowledgeSpec, moduleIndex?: number, lessonIndex?: number) {
  if (moduleIndex === undefined) return { label: 'Full plan', mod: null as null, les: null as null }
  const mod = spec.modules[moduleIndex]
  if (!mod) throw new Error(`deriveDerivedAsset: invalid moduleIndex ${moduleIndex}`)
  if (lessonIndex === undefined) {
    return { label: `Module: ${mod.title}`, mod, les: null as null }
  }
  const les = mod.lessons[lessonIndex]
  if (!les) throw new Error(`deriveDerivedAsset: invalid lessonIndex ${lessonIndex}`)
  return { label: `Lesson: ${les.title}`, mod, les }
}

/**
 * Deterministic text derived from the canonical knowledge spec (no second LLM chain).
 * Same graph powers training seeds and these assets.
 */
function appendixBlock(md: string | undefined): string {
  if (!md?.trim()) return ''
  return ['', md.trim(), ''].join('\n')
}

function attachExamPrepLearnerAppendix(assetType: DerivedContentAssetType): boolean {
  switch (assetType) {
    case 'manager_coaching_brief':
    case 'team_recap_sheet':
    case 'refresher_handout':
    case 'trainer_guide':
    case 'facilitator_discussion_guide':
    case 'educational_brief':
      return false
    default:
      return true
  }
}

function attachExamPrepAggregateAppendix(assetType: DerivedContentAssetType): boolean {
  switch (assetType) {
    case 'study_notes':
    case 'revision_sheet':
    case 'handout':
    case 'faq_sheet':
      return false
    default:
      return true
  }
}

export function deriveDerivedAssetText(input: DeriveDerivedAssetInput): string {
  const { spec, assetType, moduleIndex, lessonIndex, remediationAppendixMarkdown, facilitatorInsightMarkdown } =
    input
  const slice = moduleSlice(spec, moduleIndex, lessonIndex)
  const rem = appendixBlock(remediationAppendixMarkdown)
  const fac = appendixBlock(facilitatorInsightMarkdown)
  const examLearner =
    attachExamPrepLearnerAppendix(assetType) && input.examPrepLearnerAppendixMarkdown
      ? appendixBlock(input.examPrepLearnerAppendixMarkdown)
      : ''
  const examAgg =
    attachExamPrepAggregateAppendix(assetType) && input.examPrepAggregateAppendixMarkdown
      ? appendixBlock(input.examPrepAggregateAppendixMarkdown)
      : ''
  const intelTail =
    appendixBlock(input.priorCheckpointHistoryMarkdown) +
    appendixBlock(input.cohortCheckpointPatternsMarkdown) +
    examLearner +
    examAgg

  switch (assetType) {
    case 'revision_sheet': {
      const h = header('Revision sheet', spec)
      return (
        [
          h,
          `_Learner-support artifact from the same canonical knowledge spec as lessons and checkpoints — pair with weak-area targeting and checkpoint memory when you Preview._`,
          ``,
          `## Revision capsule`,
          spec.revision_summary,
          ``,
          `## Key concepts`,
          conceptBullets(spec),
          ``,
          `## Misconceptions to catch`,
          misconceptionTable(spec),
          scenariosBlock(spec),
          rem,
        ].join('\n') + intelTail
      )
    }
    case 'study_notes': {
      const h = header(`Study notes — ${slice.label}`, spec)
      const mod = slice.mod
      const les = slice.les
      if (les && mod) {
        return (
          [
            h,
            `## Learning intent`,
            les.learning_intent,
            ``,
            `## Concept links`,
            les.concept_ids.map((id) => `- ${id}`).join('\n'),
            ``,
            `## What to practice`,
            `Tie this lesson to one scenario from the plan and ship one artifact.`,
            rem,
          ].join('\n') + intelTail
        )
      }
      if (mod) {
        return (
          [
            h,
            `## Module goal`,
            mod.module_goal,
            ``,
            `## Why it matters`,
            mod.why_it_matters,
            ``,
            `## Lessons`,
            ...mod.lessons.map((l) => `### ${l.title}\n${l.learning_intent}\n`),
            rem,
          ].join('\n') + intelTail
        )
      }
      return (
        [
          h,
          `## Concepts`,
          conceptBullets(spec),
          ``,
          `## Module arc`,
          ...spec.modules.map((m) => `### ${m.title}\n${m.module_goal}\n`),
          rem,
        ].join('\n') + intelTail
      )
    }
    case 'trainer_guide': {
      const h = header('Trainer / facilitator guide', spec)
      return (
        [
          h,
          `## Session arc`,
          ...spec.modules.map(
            (m, i) =>
              `### Module ${i + 1}: ${m.title}\n- Goal: ${m.module_goal}\n- Checkpoint quiz: ${m.quiz.title} (${m.quiz.questions.length} items)\n`,
          ),
          ``,
          `## Discussion prompts`,
          ...spec.scenarios.map((s) => `- ${s.context} → what would participants do first?`),
          ``,
          `## Common misconceptions (address explicitly)`,
          ...spec.misconceptions.map((m) => `- ${m.myth} → ${m.correction}`),
          rem,
        ].join('\n') + intelTail
      )
    }
    case 'handout': {
      const h = header('Learner handout', spec)
      return (
        [
          h,
          `## One-page focus`,
          spec.revision_summary.split('\n').slice(0, 6).join('\n'),
          ``,
          `## Checklist`,
          `- [ ] Name the situation where ${spec.domain.topic} applies`,
          `- [ ] State your observable signal for "${spec.domain.objective}"`,
          `- [ ] Run one scenario with explicit success criteria`,
          ``,
          conceptBullets(spec),
          rem,
        ].join('\n') + intelTail
      )
    }
    case 'slide_outline': {
      const h = header('Slide outline', spec)
      const slides: string[] = []
      slides.push(`## Title\n- ${spec.domain.plan_title}`)
      slides.push(`## Why this matters\n- ${spec.domain.objective}`)
      let n = 3
      for (const m of spec.modules) {
        slides.push(`## Slide ${n++}: ${m.title}\n- ${m.why_it_matters}`)
        for (const les of m.lessons) {
          slides.push(`## Slide ${n++}: ${les.title}\n- ${les.learning_intent}`)
        }
        slides.push(`## Slide ${n++}: Checkpoint — ${m.quiz.title}`)
      }
      slides.push(`## Slide ${n++}: Revision\n- ${spec.revision_summary.slice(0, 280)}…`)
      return [h, slides.join('\n\n'), rem].filter(Boolean).join('\n') + intelTail
    }
    case 'faq_sheet': {
      const h = header('FAQ', spec)
      const faqs: string[] = []
      for (const m of spec.misconceptions) {
        faqs.push(`**Q:** Isn’t it true that ${m.myth.toLowerCase().replace(/\.$/, '')}?\n\n**A:** ${m.correction}`)
      }
      faqs.push(
        `**Q:** What should I do first this week?\n\n**A:** Pick one scenario, define an observable signal for "${spec.domain.objective}", and run one cycle.`,
      )
      return [h, faqs.join('\n\n'), rem].filter(Boolean).join('\n') + intelTail
    }
    case 'educational_brief': {
      const h = header('Educational content brief', spec)
      return (
        [
          h,
          `## Audience`,
          `${spec.domain.learner_level} learners; duration: ${spec.domain.duration_label ?? 'flexible'}.`,
          ``,
          `## Promise`,
          `Help readers apply **${spec.domain.topic}** toward: ${spec.domain.objective}.`,
          ``,
          `## Key ideas`,
          conceptBullets(spec),
          ``,
          `## Angle / story hooks`,
          ...spec.scenarios.slice(0, 2).map((s) => `- ${s.context}`),
          ``,
          `## CTA`,
          `Try one applied scenario and document what “good” looks like.`,
          rem,
        ].join('\n') + intelTail
      )
    }
    case 'refresher_handout': {
      const h = header(`Refresher handout · ${spec.domain.plan_title}`, spec)
      return (
        [
          h,
          `## Snapshot`,
          spec.revision_summary.split('\n').slice(0, 8).join('\n'),
          ``,
          `## Retrieval cues`,
          conceptBullets(spec),
          ``,
          `## Anti-patterns (from graph)`,
          misconceptionTable(spec),
          fac,
          rem,
        ].join('\n') + intelTail
      )
    }
    case 'manager_coaching_brief': {
      const h = header(`Manager coaching brief · ${spec.domain.plan_title}`, spec)
      return (
        [
          h,
          `## Goal`,
          `Equip managers to steer practice toward observable outcomes for: ${spec.domain.objective}.`,
          ``,
          `## Three coaching prompts`,
          `- What signal will you watch this week, and what would falsify success?`,
          `- Which tradeoff did you make on purpose — and what did you defer?`,
          `- Show me the artifact a reviewer could approve or reject with criteria.`,
          ``,
          `## Concepts to pressure-test in 1:1s`,
          conceptBullets(spec),
          ``,
          `## Misconceptions to surface`,
          misconceptionTable(spec),
          fac,
          rem,
        ].join('\n') + intelTail
      )
    }
    case 'facilitator_discussion_guide': {
      const h = header(`Facilitator discussion guide · ${spec.domain.plan_title}`, spec)
      return (
        [
          h,
          `## Session arc (45–60m)`,
          ...spec.modules.map(
            (m, i) =>
              `### Module ${i + 1}: ${m.title}\n- Prompt: translate **${m.module_goal}** into one workplace moment.\n- Debrief: what evidence would convince a skeptic?`,
          ),
          ``,
          `## Scenario prompts`,
          ...spec.scenarios.slice(0, 3).map((s) => `- ${s.context} → success: ${s.success_criteria}`),
          ``,
          `## Misconception surfacing`,
          ...spec.misconceptions.map((m) => `- Ask: “Who here believed ${m.myth.slice(0, 80)}…?” → correction: ${m.correction}`),
          fac,
          rem,
        ].join('\n') + intelTail
      )
    }
    case 'team_recap_sheet': {
      const h = header(`Team recap sheet · ${spec.domain.plan_title}`, spec)
      return (
        [
          h,
          `## What we’re aligning on`,
          spec.domain.objective,
          ``,
          `## Shared language (concepts)`,
          conceptBullets(spec),
          ``,
          `## Quick recap checklist`,
          `- [ ] Name the stakeholder moment`,
          `- [ ] State the constraint + tradeoff`,
          `- [ ] Pick one observable signal for this week`,
          `- [ ] Run one mixed-topic retrieval question before shipping work`,
          ``,
          `## Revision capsule`,
          spec.revision_summary,
          fac,
          rem,
        ].join('\n') + intelTail
      )
    }
    default:
      throw new Error(`deriveDerivedAssetText: unknown asset type ${String(assetType)}`)
  }
}
