import {
  ML_CURRICULUM_SPEC,
  ML_LIBRARY_FAMILY_TITLE,
} from './mlCurriculumSpec'
import type {
  CurriculumCategory,
  CurriculumLesson,
  CurriculumLessonAccess,
  CurriculumModule,
} from './aiEverydayWorkCurriculum'
import type { AccessTier } from '../../access/appAccess'
import { isAtLeastTier } from '../../access/appAccess'

export type { CurriculumCategory, CurriculumLesson, CurriculumLessonAccess, CurriculumModule } from './aiEverydayWorkCurriculum'

export const PUBLIC_ML_LIBRARY_BASE_PATH = '/library/machine-learning-foundations'

export const ML_LIBRARY_FAMILY = {
  title: ML_LIBRARY_FAMILY_TITLE,
  subtitle: 'Structured ML literacy from foundations through evaluation, workflow, and applied paths—conceptual readers for real curiosity, not vendor hype.',
  description:
    'Five progressive categories spanning definitions, supervised/unsupervised patterns, evaluation discipline, operational workflow, and applied careers—paired with upgrade paths for fuller materials via plans when enabled. Assistive orientation only; no certification, mastery, hiring, or automated outcome promises.',
  progressionCue:
    'Foundations → core concepts → quality & reliability → workflow & responsibility → applied paths. First module reads publicly without signup; signed-in learners browse the full map and signed-in-depth layers; eligible plans unlock the applied paths module when available.',
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
  return `Conceptual grounding on ${lessonTitle.toLowerCase()} within ${moduleTitle.toLowerCase()}—situated inside ${categoryTitle}.`
}

function lessonOutcomes(categoryTitle: string, lessonTitle: string): string[] {
  return [
    `Explain "${lessonTitle}" plainly enough that a teammate could sanity-check whether it applies to a stated problem.`,
    `Name one common pitfall teams hit in ${categoryTitle.toLowerCase()} work—and one review step that reduces reliance risk.`,
    `Separate what the math enables from what organizational judgment still owns—without claiming benchmark scores or guarantees.`,
  ]
}

function moduleSummary(categoryTitle: string, moduleTitle: string) {
  return `Structured module inside ${categoryTitle}: ${moduleTitle.toLowerCase()}—repeatable reading blocks, not training-vendor demos.`
}

function resolveMlLessonAccess(catIdx: number, modIdx: number): CurriculumLessonAccess {
  // Minimum public starter: Category 1 · Module 1 (meaningful browse without signup)
  if (catIdx === 0 && modIdx === 0) return 'public'

  // Category 5 · applied ML paths — deeper materials (eligible plans / bundles when enabled)
  if (catIdx === 4) return 'premium'

  // Foundations remainder + categories 2–4 — fuller signed-in curriculum
  return 'signed_in'
}

function buildMachineLearningCurriculum(): CurriculumCategory[] {
  let orderCounter = 1
  return ML_CURRICULUM_SPEC.map((spec, catIdx) => ({
    id: spec.id,
    order: catIdx + 1,
    title: spec.title,
    summary: spec.summary,
    modules: spec.modules.map((mod, modIdx) => ({
      slug: slugify(`${spec.id}-${mod.title}`),
      order: modIdx + 1,
      title: mod.title,
      summary: moduleSummary(spec.title, mod.title),
      lessons: mod.lessons.map((lessonTitle) => {
        const slug = slugify(`${spec.id}-${lessonTitle}`)
        const access = resolveMlLessonAccess(catIdx, modIdx)
        const lesson: CurriculumLesson = {
          slug,
          order: orderCounter++,
          shortTitle: lessonShortTitle(lessonTitle),
          title: lessonTitle,
          summary: lessonSummary(spec.title, mod.title, lessonTitle),
          outcomes: lessonOutcomes(spec.title, lessonTitle),
          access,
        }
        return lesson
      }),
    })),
  }))
}

const _ML_CURRICULUM_BUILD = buildMachineLearningCurriculum()

if (import.meta.env.DEV) {
  const slugs = new Set<string>()
  for (const cat of _ML_CURRICULUM_BUILD) {
    for (const mod of cat.modules) {
      for (const lesson of mod.lessons) {
        if (slugs.has(lesson.slug)) {
          throw new Error(`Duplicate ML curriculum lesson slug: ${lesson.slug}`)
        }
        slugs.add(lesson.slug)
      }
    }
  }
}

export const ML_LIBRARY_CURRICULUM: CurriculumCategory[] = _ML_CURRICULUM_BUILD

export function flattenMlCurriculumLessons(): CurriculumLesson[] {
  const out: CurriculumLesson[] = []
  for (const cat of ML_LIBRARY_CURRICULUM) {
    for (const mod of cat.modules) {
      for (const lesson of mod.lessons) out.push(lesson)
    }
  }
  return out.sort((a, b) => a.order - b.order)
}

export function getMlCurriculumLesson(slug: string | undefined): CurriculumLesson | null {
  if (!slug) return null
  for (const cat of ML_LIBRARY_CURRICULUM) {
    for (const mod of cat.modules) {
      const hit = mod.lessons.find((l) => l.slug === slug)
      if (hit) return hit
    }
  }
  return null
}

export function getMlCurriculumPlacement(slug: string): {
  category: CurriculumCategory
  module: CurriculumModule
  lesson: CurriculumLesson
} | null {
  for (const cat of ML_LIBRARY_CURRICULUM) {
    for (const mod of cat.modules) {
      const lesson = mod.lessons.find((l) => l.slug === slug)
      if (lesson) return { category: cat, module: mod, lesson }
    }
  }
  return null
}

export function getAdjacentMlLessons(slug: string): {
  prev: CurriculumLesson | null
  next: CurriculumLesson | null
} {
  const flat = flattenMlCurriculumLessons()
  const idx = flat.findIndex((l) => l.slug === slug)
  if (idx < 0) return { prev: null, next: null }
  return {
    prev: idx > 0 ? flat[idx - 1]! : null,
    next: idx < flat.length - 1 ? flat[idx + 1]! : null,
  }
}

export function listPublicMlStarterLessons(): CurriculumLesson[] {
  return flattenMlCurriculumLessons().filter((l) => l.access === 'public')
}

export function getFirstPublicMlLessonSlugInCategory(categoryId: string): string | null {
  const cat = ML_LIBRARY_CURRICULUM.find((c) => c.id === categoryId)
  if (!cat) return null
  for (const mod of cat.modules) {
    for (const lesson of mod.lessons) {
      if (lesson.access === 'public') return lesson.slug
    }
  }
  return null
}

export function mlCurriculumStats() {
  const lessons = flattenMlCurriculumLessons()
  return {
    categories: ML_LIBRARY_CURRICULUM.length,
    modules: ML_LIBRARY_CURRICULUM.reduce((acc, c) => acc + c.modules.length, 0),
    lessons: lessons.length,
    publicLessons: lessons.filter((l) => l.access === 'public').length,
    signedInLessons: lessons.filter((l) => l.access === 'signed_in').length,
    premiumLessons: lessons.filter((l) => l.access === 'premium').length,
  }
}

export function canAccessPremiumMlLessonTier(tier: AccessTier): boolean {
  return isAtLeastTier(tier, 'pro')
}
