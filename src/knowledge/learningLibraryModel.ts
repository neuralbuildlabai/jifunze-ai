/**
 * Portfolio / library model — reusable structure for turning one serious training track into a **mini-library**
 * using the existing knowledge spec, seeds, checkpoints, and derived asset types (no parallel catalog).
 */

import type { DerivedContentAssetType, LearnerLevel, TrainingKnowledgeSpec } from './types'

/** Five anchor capabilities Jifunze exposes across domains (portfolio, not vendor-specific features). */
export type PortfolioPillar =
  | 'continuity_memory'
  | 'intellectual_content_creation'
  | 'knowledge_engine_coherence'
  | 'remediation_revision'
  | 'privacy_safe_team_insight'

export const PORTFOLIO_PILLAR_META: Record<
  PortfolioPillar,
  { title: string; description: string }
> = {
  continuity_memory: {
    title: 'Learner continuity & memory',
    description:
      'Checkpoint snapshots and trajectory lines accumulate over time — same identifiers feed revision and derived assets.',
  },
  intellectual_content_creation: {
    title: 'Smart intellectual content creation',
    description:
      'Study notes, revision sheets, briefs, and facilitator variants derive from one graph — reusable across tracks that share shape.',
  },
  knowledge_engine_coherence: {
    title: 'Shared knowledge-engine coherence',
    description:
      'Concepts, misconceptions, scenarios, quizzes, and lessons bind to one spec — library growth stays unified, not siloed.',
  },
  remediation_revision: {
    title: 'Remediation & revision continuity',
    description:
      'Weak-area signals route to remediation blocks, mixed review, exam-style rehearsal, and revision excerpts from the same engine.',
  },
  privacy_safe_team_insight: {
    title: 'Privacy-safe team / facilitator insight',
    description:
      'Aggregate weak-label patterns and cohort recap assets reinforce teams without exposing individual responses by default.',
  },
}

export type MiniLibraryBlueprint = {
  domainTopic: string
  objective: string
  learnerLevel: LearnerLevel
  moduleCount: number
  lessonCount: number
  moduleCheckpointCount: number
  supplementalQuizKinds: string[]
  /** Canonical derived asset types that complete a “mini-library” export set for this level + supplements. */
  recommendedDerivedAssetTypes: DerivedContentAssetType[]
  pillarBridgeLines: Array<{ pillar: PortfolioPillar; line: string }>
  capabilityOutcomeLine: string
}

function uniqueTypes(types: DerivedContentAssetType[]): DerivedContentAssetType[] {
  return [...new Set(types)]
}

function recommendedAssetsForTrack(input: {
  level: LearnerLevel
  supplementalKinds: string[]
}): DerivedContentAssetType[] {
  const { level, supplementalKinds } = input
  const hasExamish = supplementalKinds.some((k) => k === 'exam_practice' || k === 'mixed_review')
  const coreLearner: DerivedContentAssetType[] = ['study_notes', 'revision_sheet', 'handout', 'faq_sheet']
  const stretch: DerivedContentAssetType[] = []
  if (level !== 'beginner') {
    stretch.push('slide_outline', 'educational_brief')
  }
  if (level === 'intermediate' || level === 'advanced') {
    stretch.push('trainer_guide', 'refresher_handout')
  }
  if (level === 'advanced') {
    stretch.push(
      'facilitator_discussion_guide',
      'manager_coaching_brief',
      'team_recap_sheet',
    )
  }
  if (hasExamish) {
    stretch.push('educational_brief')
  }
  return uniqueTypes([...coreLearner, ...stretch])
}

function pillarLinesForSpec(spec: TrainingKnowledgeSpec, supplementalKinds: string[]): MiniLibraryBlueprint['pillarBridgeLines'] {
  const hasMisconceptions = spec.misconceptions.length > 0
  const hasScenarios = spec.scenarios.length > 0
  const hasRevisionArch = Boolean(spec.readiness_architecture?.revision_sections?.length)
  const examish = supplementalKinds.some((k) => k === 'exam_practice' || k === 'mixed_review')

  return [
    {
      pillar: 'continuity_memory' as const,
      line: `Snapshots attach to this plan’s checkpoints — export revision assets with lineage so the same topic can anchor future tracks.`,
    },
    {
      pillar: 'intellectual_content_creation' as const,
      line: `Generate ${recommendedAssetsForTrack({ level: spec.domain.learner_level, supplementalKinds }).slice(0, 4).join(', ')}… — all tied to this graph.`,
    },
    {
      pillar: 'knowledge_engine_coherence' as const,
      line: `One spec ties ${spec.concepts.length} concepts, ${spec.modules.length} modules, and quizzes — library entries stay aligned when you iterate the spec.`,
    },
    {
      pillar: 'remediation_revision' as const,
      line: hasMisconceptions || hasScenarios || hasRevisionArch
        ? `Misconceptions (${spec.misconceptions.length})${hasRevisionArch ? ' + revision architecture' : ''} feed recap and mixed-review emphasis — candidates for reusable revision packs.`
        : `Add misconception + revision capsule depth in the spec to unlock richer revision libraries on reruns.`,
    },
    {
      pillar: 'privacy_safe_team_insight' as const,
      line: examish
        ? `Facilitator / cohort outlines can include aggregate exam-prep segments — label-only patterns, no raw attempts in default aggregates.`
        : `Team recap + facilitator guides stay aggregate-safe by design when saved from this plan.`,
    },
  ]
}

/**
 * Describes what a **complete mini-library** around this track should contain (pedagogical bundle, not a separate DB).
 */
export function buildMiniLibraryBlueprint(
  spec: TrainingKnowledgeSpec,
  supplementalQuizKinds: string[],
): MiniLibraryBlueprint {
  let lessonCount = 0
  let checkpointCount = 0
  for (const m of spec.modules) {
    lessonCount += m.lessons.length
    checkpointCount += 1
  }

  const recommendedDerivedAssetTypes = recommendedAssetsForTrack({
    level: spec.domain.learner_level,
    supplementalKinds: supplementalQuizKinds,
  })

  const capabilityOutcomeLine = [
    `After this track, learners should articulate progress on **${spec.domain.objective}** for **${spec.domain.topic}** using`,
    `lessons + checkpoints + optional mixed/exam drills, with exports that stay tied to the same concept graph.`,
  ].join(' ')

  return {
    domainTopic: spec.domain.topic,
    objective: spec.domain.objective,
    learnerLevel: spec.domain.learner_level,
    moduleCount: spec.modules.length,
    lessonCount,
    moduleCheckpointCount: checkpointCount,
    supplementalQuizKinds,
    recommendedDerivedAssetTypes,
    pillarBridgeLines: pillarLinesForSpec(spec, supplementalQuizKinds),
    capabilityOutcomeLine,
  }
}
