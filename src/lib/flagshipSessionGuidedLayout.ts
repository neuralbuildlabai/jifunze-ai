import type { FlagshipSessionContentBlock } from '../data/learning/flagshipSessionContentTypes'
import { blockAllowsLearnerResponse } from './flagshipSessionResponseBlocks'
import type { LessonSectionNavItem } from './flagshipSessionLessonFlow'

export type GuidedTeachingStep = 'start' | 'learn' | 'example' | 'check' | 'more'

export function guidedStepForTeachingBlock(block: FlagshipSessionContentBlock): GuidedTeachingStep {
  switch (block.type) {
    case 'intro':
      return 'start'
    case 'concept_explanation':
    case 'key_points':
      return 'learn'
    case 'worked_example':
      return 'example'
    case 'recap':
    case 'reflection_prompt':
      return 'check'
    case 'takeaway':
    case 'next_step':
      return 'more'
    default:
      return 'learn'
  }
}

export type GuidedTeachingSegment = {
  step: GuidedTeachingStep
  blocks: FlagshipSessionContentBlock[]
}

/** Group consecutive teaching blocks by guided step (reading order preserved). */
export function segmentGuidedTeachingBlocks(teachingBlocks: FlagshipSessionContentBlock[]): GuidedTeachingSegment[] {
  const out: GuidedTeachingSegment[] = []
  for (const b of teachingBlocks) {
    const step = guidedStepForTeachingBlock(b)
    const last = out[out.length - 1]
    if (last && last.step === step) last.blocks.push(b)
    else out.push({ step, blocks: [b] })
  }
  return out
}

export type GuidedTeachingBuckets = Record<GuidedTeachingStep, FlagshipSessionContentBlock[]>

/** Merge segments in reading order into per-step buckets (order within each step preserved). */
export function bucketGuidedTeachingBlocks(teachingBlocks: FlagshipSessionContentBlock[]): GuidedTeachingBuckets {
  const buckets: GuidedTeachingBuckets = { start: [], learn: [], example: [], check: [], more: [] }
  for (const seg of segmentGuidedTeachingBlocks(teachingBlocks)) {
    buckets[seg.step].push(...seg.blocks)
  }
  return buckets
}

export function computeGuidedLessonNavItems(args: {
  teachingBlocks: FlagshipSessionContentBlock[]
  applyBlocks: FlagshipSessionContentBlock[]
  objectivesCount: number
  sessionSummary?: string
}): LessonSectionNavItem[] {
  const by = bucketGuidedTeachingBlocks(args.teachingBlocks)
  return buildGroupedLessonNav({
    hasObjectives: args.objectivesCount > 0,
    hasOverview: Boolean(args.sessionSummary?.trim()),
    hasIntro: by.start.length > 0,
    hasLearn: by.learn.length > 0,
    hasExample: by.example.length > 0,
    hasCheck: by.check.length > 0 || args.applyBlocks.length > 0,
    hasMore: by.more.length > 0,
  })
}

export function buildGroupedLessonNav(args: {
  hasObjectives: boolean
  hasOverview: boolean
  hasIntro: boolean
  hasLearn: boolean
  hasExample: boolean
  hasCheck: boolean
  hasMore: boolean
}): LessonSectionNavItem[] {
  const items: LessonSectionNavItem[] = []
  if (args.hasObjectives || args.hasOverview || args.hasIntro) {
    items.push({ anchorId: 'flagship-step-start', label: 'Start' })
  }
  if (args.hasLearn) items.push({ anchorId: 'flagship-step-learn', label: 'Learn' })
  if (args.hasExample) items.push({ anchorId: 'flagship-step-example', label: 'Example' })
  if (args.hasCheck) items.push({ anchorId: 'flagship-step-check', label: 'Check' })
  // Optional "More" blocks stay on the page; rail stays Start → Learn → Example → Check → Complete only.
  items.push({ anchorId: 'flagship-session-completion', label: 'Complete' })
  return items
}

export function buildPracticeLabNav(args: { hasArtifact: boolean; hasReview: boolean }): LessonSectionNavItem[] {
  const items: LessonSectionNavItem[] = [{ anchorId: 'flagship-practice-goal', label: 'Goal' }]
  items.push({ anchorId: 'flagship-practice-tasks', label: 'Tasks' })
  if (args.hasArtifact) items.push({ anchorId: 'flagship-practice-artifact', label: 'Artifact' })
  if (args.hasReview) items.push({ anchorId: 'flagship-practice-review', label: 'Review' })
  items.push({ anchorId: 'flagship-session-completion', label: 'Complete' })
  return items
}

/** First apply block text suitable for “what you’ll produce”. */
export function practiceProduceSummary(applyBlocks: FlagshipSessionContentBlock[]): string | null {
  const first = applyBlocks[0]
  if (!first) return null
  const exp = first.outputExpectation?.trim()
  if (exp) return exp
  const t = first.title?.trim()
  if (t) return t
  return null
}

export function applyBlocksInContentOrder(allBlocks: FlagshipSessionContentBlock[]): FlagshipSessionContentBlock[] {
  return allBlocks.filter((b) => blockAllowsLearnerResponse(b))
}
