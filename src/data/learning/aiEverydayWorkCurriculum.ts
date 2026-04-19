import {
  AI_CURRICULUM_SPEC,
  AI_FOUNDATIONS_FAMILY_TITLE,
} from './aiCurriculumSpec'
import type { AccessTier } from '../../access/appAccess'
import { isAtLeastTier } from '../../access/appAccess'

/** Access tier per lesson determines routing + disclosure copy—not an authorization boundary. */
export type CurriculumLessonAccess = 'public' | 'signed_in' | 'premium'

export type CurriculumLesson = {
  slug: string
  /** Global order across the library (1..n) */
  order: number
  shortTitle: string
  title: string
  summary: string
  outcomes: string[]
  access: CurriculumLessonAccess
}

export type CurriculumModule = {
  slug: string
  order: number
  title: string
  summary: string
  lessons: CurriculumLesson[]
}

export type CurriculumCategory = {
  id: string
  order: number
  title: string
  summary: string
  modules: CurriculumModule[]
}

export const AI_FOUNDATIONS_FAMILY = {
  title: AI_FOUNDATIONS_FAMILY_TITLE,
  subtitle:
    'Eight categories covering foundations through advanced workflows—readable lessons, repeatable structure, and clear upgrade boundaries.',
  description:
    'Structured for public browsing, signed-in continuity, and deeper materials when eligible plans unlock them—still assistive orientation; human verification, policies, and professional judgment stay in your hands.',
  progressionCue:
    'Foundations → prompting → validation → everyday knowledge work → learning/revision → writing & briefs → content creation → advanced/agentic workflows. Public readers start with free starter modules; signed-in learners open the full map; premium expands deeper readers where enabled on your plan.',
} as const

function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[“”]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function lessonShortTitle(title: string) {
  const cut = title.split(',')[0]?.trim() ?? title
  return cut.length > 42 ? `${cut.slice(0, 39)}…` : cut
}

function lessonSummary(categoryTitle: string, moduleTitle: string, lessonTitle: string) {
  return `Practical guidance on ${lessonTitle.toLowerCase()} within ${moduleTitle.toLowerCase()}—framed for everyday knowledge work inside ${categoryTitle}.`
}

function lessonOutcomes(categoryTitle: string, lessonTitle: string): string[] {
  return [
    `Explain the core idea of “${lessonTitle}” in your own words for one real workflow.`,
    `Identify one failure mode people miss in ${categoryTitle.toLowerCase()} practice—and how review reduces risk.`,
    `Choose constraints (inputs, verification, audience) that keep outputs appropriately scoped—without claiming guaranteed mastery.`,
  ]
}

function moduleSummary(categoryTitle: string, moduleTitle: string) {
  return `A structured module inside ${categoryTitle}: ${moduleTitle.toLowerCase()}—written as repeatable study units, not hype.`
}

function resolveLessonAccess(
  catIdx: number,
  modIdx: number,
  lessonIdx: number,
): CurriculumLessonAccess {
  // 1) AI Foundations — fully public starter layer
  if (catIdx === 0) return 'public'

  // 2) Practical Prompting — first two modules public; later modules signed-in
  if (catIdx === 1) {
    if (modIdx <= 1) return 'public'
    return 'signed_in'
  }

  // 3) Review + validate — module 1 public; module 2 first two lessons public; remainder signed-in
  if (catIdx === 2) {
    if (modIdx === 0) return 'public'
    if (modIdx === 1 && lessonIdx <= 1) return 'public'
    return 'signed_in'
  }

  // 4) Everyday knowledge work — signed-in fuller library (not advertised as free browsing)
  if (catIdx === 3) return 'signed_in'

  // 5) Learning + revision — first module public starter emphasis; remainder signed-in (deeper packs can layer later)
  if (catIdx === 4) {
    if (modIdx === 0) return 'public'
    return 'signed_in'
  }

  // 6–8) Writing/notes/briefs, content creation, advanced/agentic — premium deeper materials (access via plans/bundles)
  return 'premium'
}

export function buildAiEverydayWorkCurriculum(): CurriculumCategory[] {
  let orderCounter = 1
  return AI_CURRICULUM_SPEC.map((spec, catIdx) => ({
    id: spec.id,
    order: catIdx + 1,
    title: spec.title,
    summary: spec.summary,
    modules: spec.modules.map((mod, modIdx) => ({
      slug: slugify(`${spec.id}-${mod.title}`),
      order: modIdx + 1,
      title: mod.title,
      summary: moduleSummary(spec.title, mod.title),
      lessons: mod.lessons.map((lessonTitle, lessonIdx) => {
        const slug = slugify(`${spec.id}-${lessonTitle}`)
        const lesson: CurriculumLesson = {
          slug,
          order: orderCounter++,
          shortTitle: lessonShortTitle(lessonTitle),
          title: lessonTitle,
          summary: lessonSummary(spec.title, mod.title, lessonTitle),
          outcomes: lessonOutcomes(spec.title, lessonTitle),
          access: resolveLessonAccess(catIdx, modIdx, lessonIdx),
        }
        return lesson
      }),
    })),
  }))
}

const _AI_EVERYDAY_WORK_CURRICULUM_BUILD = buildAiEverydayWorkCurriculum()

if (import.meta.env.DEV) {
  const slugs = new Set<string>()
  for (const cat of _AI_EVERYDAY_WORK_CURRICULUM_BUILD) {
    for (const mod of cat.modules) {
      for (const lesson of mod.lessons) {
        if (slugs.has(lesson.slug)) {
          throw new Error(`Duplicate curriculum lesson slug: ${lesson.slug}`)
        }
        slugs.add(lesson.slug)
      }
    }
  }
}

export const AI_EVERYDAY_WORK_CURRICULUM: CurriculumCategory[] = _AI_EVERYDAY_WORK_CURRICULUM_BUILD

export function flattenAiCurriculumLessons(): CurriculumLesson[] {
  const out: CurriculumLesson[] = []
  for (const cat of AI_EVERYDAY_WORK_CURRICULUM) {
    for (const mod of cat.modules) {
      for (const lesson of mod.lessons) out.push(lesson)
    }
  }
  return out.sort((a, b) => a.order - b.order)
}

export function getAiCurriculumLesson(slug: string | undefined): CurriculumLesson | null {
  if (!slug) return null
  for (const cat of AI_EVERYDAY_WORK_CURRICULUM) {
    for (const mod of cat.modules) {
      const hit = mod.lessons.find((l) => l.slug === slug)
      if (hit) return hit
    }
  }
  return null
}

export function getAiCurriculumPlacement(slug: string): {
  category: CurriculumCategory
  module: CurriculumModule
  lesson: CurriculumLesson
} | null {
  for (const cat of AI_EVERYDAY_WORK_CURRICULUM) {
    for (const mod of cat.modules) {
      const lesson = mod.lessons.find((l) => l.slug === slug)
      if (lesson) return { category: cat, module: mod, lesson }
    }
  }
  return null
}

export function getAdjacentAiCurriculumLessons(slug: string): {
  prev: CurriculumLesson | null
  next: CurriculumLesson | null
} {
  const flat = flattenAiCurriculumLessons()
  const idx = flat.findIndex((l) => l.slug === slug)
  if (idx < 0) return { prev: null, next: null }
  return {
    prev: idx > 0 ? flat[idx - 1]! : null,
    next: idx < flat.length - 1 ? flat[idx + 1]! : null,
  }
}

export function listPublicStarterLessons(): CurriculumLesson[] {
  return flattenAiCurriculumLessons().filter((l) => l.access === 'public')
}

export function getFirstPublicLessonSlugInCategory(categoryId: string): string | null {
  const cat = AI_EVERYDAY_WORK_CURRICULUM.find((c) => c.id === categoryId)
  if (!cat) return null
  for (const mod of cat.modules) {
    for (const lesson of mod.lessons) {
      if (lesson.access === 'public') return lesson.slug
    }
  }
  return null
}

export function curriculumStats() {
  const lessons = flattenAiCurriculumLessons()
  return {
    categories: AI_EVERYDAY_WORK_CURRICULUM.length,
    modules: AI_EVERYDAY_WORK_CURRICULUM.reduce((acc, c) => acc + c.modules.length, 0),
    lessons: lessons.length,
    publicLessons: lessons.filter((l) => l.access === 'public').length,
    signedInLessons: lessons.filter((l) => l.access === 'signed_in').length,
    premiumLessons: lessons.filter((l) => l.access === 'premium').length,
  }
}

/** Premium lesson readers: aligned with paid/deeper framing—requires Pro+ for full reader UX in product model. */
export function canAccessPremiumAiLessonTier(tier: AccessTier): boolean {
  return isAtLeastTier(tier, 'pro')
}
