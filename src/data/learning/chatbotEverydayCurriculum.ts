import type { AccessTier } from '../../access/appAccess'
import { isAtLeastTier } from '../../access/appAccess'
import {
  CHATBOT_CURRICULUM_SPEC,
  CHATBOT_LIBRARY_FAMILY_TITLE,
} from './chatbotLibrarySpec'
import type {
  CurriculumCategory,
  CurriculumLesson,
  CurriculumLessonAccess,
  CurriculumModule,
} from './aiEverydayWorkCurriculum'

export type { CurriculumCategory, CurriculumLesson, CurriculumLessonAccess, CurriculumModule } from './aiEverydayWorkCurriculum'

export const PUBLIC_CHATBOT_LIBRARY_BASE_PATH = '/library/everyday-chatbots'

export const CHATBOT_LIBRARY_FAMILY = {
  title: CHATBOT_LIBRARY_FAMILY_TITLE,
  subtitle: 'Practical chatbot literacy, design patterns, and safe build habits for daily work and life',
  description:
    'Eight categories from everyday context to advanced systems—reader-first materials for understanding, designing, and improving chatbots. Instructional and assistive; not a job guarantee, chatbot certification, or business outcome promise.',
  progressionCue:
    'Everyday life → bot types → conversation design → real activities → bot logic → review & improvement → safety & trust → advanced systems. Public readers start with category 1; signed-in learners unlock the core build path; premium expands deeper materials when available on your plan.',
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
  return `Practical chatbot guidance on ${lessonTitle.toLowerCase()}—set in ${moduleTitle.toLowerCase()} within ${categoryTitle}.`
}

function lessonOutcomes(categoryTitle: string, lessonTitle: string): string[] {
  return [
    `Summarize what “${lessonTitle}” means for a real chatbot you could plausibly help design, test, or use responsibly.`,
    `Name one user-trust or safety angle that is easy to miss in ${categoryTitle.toLowerCase()} work—and a review step that mitigates it.`,
    `State clear scope boundaries (what the bot will not do) for a hypothetical use case—without claiming performance, revenue, or learning outcomes.`,
  ]
}

function moduleSummary(categoryTitle: string, moduleTitle: string) {
  return `A structured module in ${categoryTitle}: ${moduleTitle.toLowerCase()}—repeatable reading units, not vendor marketing.`
}

function resolveChatbotLessonAccess(catIdx: number): CurriculumLessonAccess {
  // Category 1 — public free starter (full category)
  if (catIdx === 0) return 'public'
  // Categories 2–5 — signed-in broader library
  if (catIdx >= 1 && catIdx <= 4) return 'signed_in'
  // Categories 6–8 — deeper / premium (plan-gated in product)
  return 'premium'
}

function buildChatbotCurriculum(): CurriculumCategory[] {
  let orderCounter = 1
  return CHATBOT_CURRICULUM_SPEC.map((spec, catIdx) => ({
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
        const access = resolveChatbotLessonAccess(catIdx)
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

const _CHATBOT_BUILD = buildChatbotCurriculum()

if (import.meta.env.DEV) {
  const slugs = new Set<string>()
  for (const cat of _CHATBOT_BUILD) {
    for (const mod of cat.modules) {
      for (const lesson of mod.lessons) {
        if (slugs.has(lesson.slug)) {
          throw new Error(`Duplicate chatbot curriculum lesson slug: ${lesson.slug}`)
        }
        slugs.add(lesson.slug)
      }
    }
  }
}

export const CHATBOT_LIBRARY_CURRICULUM: CurriculumCategory[] = _CHATBOT_BUILD

export function flattenChatbotCurriculumLessons(): CurriculumLesson[] {
  const out: CurriculumLesson[] = []
  for (const cat of CHATBOT_LIBRARY_CURRICULUM) {
    for (const mod of cat.modules) {
      for (const lesson of mod.lessons) out.push(lesson)
    }
  }
  return out.sort((a, b) => a.order - b.order)
}

export function getChatbotCurriculumLesson(slug: string | undefined): CurriculumLesson | null {
  if (!slug) return null
  for (const cat of CHATBOT_LIBRARY_CURRICULUM) {
    for (const mod of cat.modules) {
      const hit = mod.lessons.find((l) => l.slug === slug)
      if (hit) return hit
    }
  }
  return null
}

export function getChatbotCurriculumPlacement(slug: string): {
  category: CurriculumCategory
  module: CurriculumModule
  lesson: CurriculumLesson
} | null {
  for (const cat of CHATBOT_LIBRARY_CURRICULUM) {
    for (const mod of cat.modules) {
      const lesson = mod.lessons.find((l) => l.slug === slug)
      if (lesson) return { category: cat, module: mod, lesson }
    }
  }
  return null
}

export function getAdjacentChatbotLessons(slug: string): {
  prev: CurriculumLesson | null
  next: CurriculumLesson | null
} {
  const flat = flattenChatbotCurriculumLessons()
  const idx = flat.findIndex((l) => l.slug === slug)
  if (idx < 0) return { prev: null, next: null }
  return {
    prev: idx > 0 ? flat[idx - 1]! : null,
    next: idx < flat.length - 1 ? flat[idx + 1]! : null,
  }
}

export function listPublicChatbotStarterLessons(): CurriculumLesson[] {
  return flattenChatbotCurriculumLessons().filter((l) => l.access === 'public')
}

export function getFirstPublicChatbotLessonSlugInCategory(categoryId: string): string | null {
  const cat = CHATBOT_LIBRARY_CURRICULUM.find((c) => c.id === categoryId)
  if (!cat) return null
  for (const mod of cat.modules) {
    for (const lesson of mod.lessons) {
      if (lesson.access === 'public') return lesson.slug
    }
  }
  return null
}

export function chatbotCurriculumStats() {
  const lessons = flattenChatbotCurriculumLessons()
  return {
    categories: CHATBOT_LIBRARY_CURRICULUM.length,
    modules: CHATBOT_LIBRARY_CURRICULUM.reduce((acc, c) => acc + c.modules.length, 0),
    lessons: lessons.length,
    publicLessons: lessons.filter((l) => l.access === 'public').length,
    signedInLessons: lessons.filter((l) => l.access === 'signed_in').length,
    premiumLessons: lessons.filter((l) => l.access === 'premium').length,
  }
}

export function canAccessPremiumChatbotLessonTier(tier: AccessTier): boolean {
  return isAtLeastTier(tier, 'pro')
}
