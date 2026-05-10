/**
 * Single source of truth for courses/workshops that are intentionally shown as
 * “available now” on public /learn and related surfaces. Not flagship discovery.
 */

import { findStandaloneCourseBySlug } from '../courses/standaloneCoursesCatalog'
import {
  AI_AT_WORK_CHATGPT_FREE_STARTER,
  SMART_WORKFLOWS_WITH_AI_FREE_STARTER,
  type FreeStarterRiseCourseEntry,
} from './freeStarterRiseCoursesCatalog'

export type AvailableStandaloneSummary = {
  slug: string
  title: string
  route: string
  label: string
  levelLabel: string
  metaLine: string
  ctaLabel: string
}

export type AvailableRiseSummary = {
  slug: string
  title: string
  shortTitle: string
  route: string
  label: string
  levelLabel: string
  metaLine: string
  ctaLabel: string
  iframeSrc: string
}

const PRACTICAL_MATH_SLUG = 'practical-mathematics-life-work-business' as const
const BPA_SLUG = 'business-process-automation-for-work' as const
const BA_SLUG = 'business-analytics-decision-making' as const

/** Rise pilots first (workshop, then course), then standalone courses in teaching order. */
export function getAvailableRiseOfferingsOrdered(): readonly AvailableRiseSummary[] {
  const map = (e: FreeStarterRiseCourseEntry): AvailableRiseSummary => ({
    slug: e.slug,
    title: e.title,
    shortTitle: e.shortTitle,
    route: e.publicRoute,
    label: e.label,
    levelLabel: e.level,
    metaLine: `${e.durationLabel} · ${e.format} · Browser-local completion for this pilot`,
    ctaLabel: e.slug === 'smart-workflows-with-ai' ? 'Start workshop' : 'Start course',
    iframeSrc: e.iframeSrc,
  })
  return [map(SMART_WORKFLOWS_WITH_AI_FREE_STARTER), map(AI_AT_WORK_CHATGPT_FREE_STARTER)]
}

export function getAvailableStandaloneOfferingsOrdered(): AvailableStandaloneSummary[] {
  const slugs = [PRACTICAL_MATH_SLUG, BPA_SLUG, BA_SLUG] as const
  return slugs.map((slug) => {
    const entry = findStandaloneCourseBySlug(slug)
    if (!entry) throw new Error(`Missing standalone catalog entry for ${slug}`)
    const isMicro = entry.source.productTier === 'professional_micro'
    const duration =
      entry.durationLabel ?? `${entry.source.modules.length} modules · ~${entry.estimatedHours} hours`
    return {
      slug: entry.slug,
      title: entry.title,
      route: entry.publicRoute,
      label: isMicro ? 'Free interactive workshop' : 'Free course',
      levelLabel: entry.level,
      metaLine: `${duration} · Guided practice · Practical output`,
      ctaLabel: 'Start course',
    }
  })
}

export type LearningAreaSummary = {
  id: string
  title: string
  blurb: string
  count: number
}

/** Non-overlapping buckets for honest browse labels (each course appears once). */
export function getLearningAreasSummary(): LearningAreaSummary[] {
  return [
    {
      id: 'ai-productivity',
      title: 'AI & Productivity',
      blurb: 'Interactive Rise starters you can open today.',
      count: 2,
    },
    {
      id: 'business-ops',
      title: 'Business & Operations',
      blurb: 'Workflow automation and operations-focused practice.',
      count: 1,
    },
    {
      id: 'mathematics',
      title: 'Mathematics',
      blurb: 'Foundational through practical applied math.',
      count: 1,
    },
    {
      id: 'data-decisions',
      title: 'Data & Decisions',
      blurb: 'Analytics literacy for real decisions.',
      count: 1,
    },
  ]
}
