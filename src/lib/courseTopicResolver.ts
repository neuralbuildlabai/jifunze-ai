/**
 * Resolve learner/admin topic text to flagship catalog destinations.
 * Layers: exact → synonym → keyword overlap → semantic-style scoring (keyword-based).
 */

import { getFlagshipCurriculum } from '@/data/learning/flagshipCourseCurricula'
import { FLAGSHIP_COURSES, type FlagshipCourse } from '@/data/learning/flagshipCoursesCatalog'
import { buildSessionsForCurriculum } from '@/data/learning/flagshipCourseSessions'
import {
  PROMPT_ENGINEERING_MODELS_CURRICULUM,
  PROMPT_ENGINEERING_MODELS_PUBLIC_BASE_PATH,
} from '@/data/learning/standaloneCoursesCatalog'
import type { CurriculumCategory } from '@/data/learning/aiEverydayWorkCurriculum'
import { EXTENDED_PUBLIC_LIBRARY_CONFIGS } from '@/data/learning/extendedPublicLibraryConfigs'

export type ResolveKind = 'exact' | 'synonym' | 'keyword' | 'semantic'

export type CourseResolution = {
  courseSlug: string
  courseTitle: string
  kind: ResolveKind
  confidence: number
  /** Deep link into first session of canonical path */
  primaryHref: string
  /** True when primaryHref targets a catalog reader, not a flagship course player */
  isExtendedCatalog?: boolean
  alternateSlugs?: { slug: string; title: string; confidence: number }[]
}

/** Real catalog: Prompt Engineering Across ChatGPT, Claude, and Gemini (reader under /courses/.../learn). */
const PROMPT_ENGINEERING_CATALOG_PHRASES: string[] = [
  'prompt engineer',
  'prompt engineering',
  'prompting',
  'prompt',
  'prompts',
  'structured prompting',
  'better prompts',
  'better prompts for work',
  'writing prompts',
  'chatgpt prompts',
  'chatgpt prompt',
  'claude prompting',
  'gemini prompting',
  'ai prompting',
  'how to prompt',
  'instruction design for llm',
  'few-shot prompting',
  'system prompt',
  'prompt hygiene',
  'ambiguous prompt',
  'prompt failure',
  'safe prompting',
  'prompt critique',
  'rewrite prompt',
  'iterate prompts',
  'better outputs from ai',
  'getting better answers from ai',
  'tell the model',
  'what to ask chatgpt',
]

const SYNONYMS: Record<string, string[]> = {
  'ai-essentials': [
    'ai literacy',
    'learn ai basics',
    'ai essentials',
    'introduction to ai',
    'ai fundamentals for work',
  ],
  'smart-workflows-with-ai': [
    'workflow prompting',
    'prompt templates',
    'prompt library',
    'multi-step prompting',
    'prompt anatomy',
    'professional prompt engineering',
    'evaluate prompts',
    'prompt chains',
    'workflow automation prompts',
    'prompt versioning',
    'prompt rubric',
    'compare prompts',
    'iteration prompts',
    'qa prompts',
    'library of prompts',
  ],
}

function normalize(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ')
}

function firstPublicLessonHref(categories: CurriculumCategory[], basePath: string): string | null {
  const cats = [...categories].sort((a, b) => a.order - b.order)
  for (const cat of cats) {
    const mods = [...cat.modules].sort((a, b) => a.order - b.order)
    for (const mod of mods) {
      const lessons = [...mod.lessons].sort((a, b) => a.order - b.order)
      const first = lessons[0]
      if (first) return `${basePath}/${first.slug}`
    }
  }
  return null
}

function tokens(s: string): Set<string> {
  return new Set(
    normalize(s)
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter((w) => w.length > 2),
  )
}

function keywordScore(topic: string, course: FlagshipCourse): number {
  const tt = tokens(topic)
  const hay = `${course.title} ${course.subtitle} ${course.intro} ${course.modulePathway.join(' ')}`.toLowerCase()
  let score = 0
  for (const w of tt) {
    if (hay.includes(w)) score += 2
  }
  for (const o of course.learningOutcomes) {
    const lo = o.toLowerCase()
    for (const w of tt) {
      if (lo.includes(w)) score += 3
    }
  }
  return score
}

function firstSessionHref(slug: string): string | null {
  const curriculum = getFlagshipCurriculum(slug)
  if (!curriculum) return null
  const sessions = buildSessionsForCurriculum(curriculum)
  const first = sessions.sort((a, b) => a.orderInCourse - b.orderInCourse)[0]
  return first ? `/learn/courses/${slug}/session/${first.id}` : `/learn/courses/${slug}`
}

export function resolveTopicToCourses(topicRaw: string): CourseResolution | null {
  const topic = normalize(topicRaw)
  if (!topic) return null

  const pemTitle = EXTENDED_PUBLIC_LIBRARY_CONFIGS.course_prompt_engineering_models.title
  const pemHref = firstPublicLessonHref(PROMPT_ENGINEERING_MODELS_CURRICULUM, PROMPT_ENGINEERING_MODELS_PUBLIC_BASE_PATH)

  if (pemHref) {
    for (const phrase of PROMPT_ENGINEERING_CATALOG_PHRASES) {
      if (topic === normalize(phrase)) {
        return {
          courseSlug: 'course_prompt_engineering_models',
          courseTitle: pemTitle,
          kind: 'exact',
          confidence: 0.98,
          primaryHref: pemHref,
          isExtendedCatalog: true,
        }
      }
    }
    for (const phrase of PROMPT_ENGINEERING_CATALOG_PHRASES) {
      const np = normalize(phrase)
      if (np.length < 4) continue
      if (topic.includes(np) || (topic.length >= 4 && np.includes(topic))) {
        return {
          courseSlug: 'course_prompt_engineering_models',
          courseTitle: pemTitle,
          kind: 'synonym',
          confidence: 0.92,
          primaryHref: pemHref,
          isExtendedCatalog: true,
        }
      }
    }
  }

  for (const slug of Object.keys(SYNONYMS)) {
    for (const phrase of SYNONYMS[slug]!) {
      if (topic === normalize(phrase)) {
        const href = firstSessionHref(slug)
        const course = FLAGSHIP_COURSES.find((c) => c.slug === slug)
        if (!course || !href) continue
        return {
          courseSlug: slug,
          courseTitle: course.title,
          kind: topic === normalize(phrase) ? 'exact' : 'synonym',
          confidence: 0.97,
          primaryHref: href,
        }
      }
    }
  }

  const synonymHits: { slug: string; phrase: string }[] = []
  for (const slug of Object.keys(SYNONYMS)) {
    for (const phrase of SYNONYMS[slug]!) {
      if (topic.includes(normalize(phrase)) || normalize(phrase).includes(topic)) {
        synonymHits.push({ slug, phrase })
      }
    }
  }
  const uniqSynonymSlugs = [...new Set(synonymHits.map((h) => h.slug))]
  if (uniqSynonymSlugs.length >= 2) {
    const ordered =
      uniqSynonymSlugs.includes('ai-essentials') && uniqSynonymSlugs.includes('smart-workflows-with-ai')
        ? ['ai-essentials', 'smart-workflows-with-ai'].filter((s) => uniqSynonymSlugs.includes(s))
        : uniqSynonymSlugs
    const primarySlug = ordered[0]!
    const secondary = ordered.slice(1)
    const hrefPrimary = firstSessionHref(primarySlug)
    const course = FLAGSHIP_COURSES.find((c) => c.slug === primarySlug)
    if (course && hrefPrimary) {
      return {
        courseSlug: primarySlug,
        courseTitle: course.title,
        kind: 'synonym',
        confidence: 0.86,
        primaryHref: hrefPrimary,
        alternateSlugs: secondary.map((slug) => {
          const cc = FLAGSHIP_COURSES.find((c) => c.slug === slug)
          const h = firstSessionHref(slug)
          return {
            slug,
            title: cc?.title ?? slug,
            confidence: h ? 0.82 : 0.5,
          }
        }),
      }
    }
  }
  if (synonymHits.length === 1) {
    const slug = synonymHits[0]!.slug
    const href = firstSessionHref(slug)
    const course = FLAGSHIP_COURSES.find((c) => c.slug === slug)
    if (course && href) {
      return {
        courseSlug: slug,
        courseTitle: course.title,
        kind: 'synonym',
        confidence: 0.9,
        primaryHref: href,
      }
    }
  }

  const keywordRanked = FLAGSHIP_COURSES.map((c) => ({
    c,
    s: keywordScore(topicRaw, c),
  }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)

  if (keywordRanked.length >= 2) {
    const [a, b] = keywordRanked
    const gap = a!.s - b!.s
    const hrefA = firstSessionHref(a!.c.slug)
    if (hrefA && gap < 4) {
      const hrefB = firstSessionHref(b!.c.slug)
      return {
        courseSlug: a!.c.slug,
        courseTitle: a!.c.title,
        kind: 'keyword',
        confidence: Math.min(0.88, 0.55 + a!.s * 0.02),
        primaryHref: hrefA,
        alternateSlugs: hrefB
          ? [{ slug: b!.c.slug, title: b!.c.title, confidence: Math.min(0.85, 0.5 + b!.s * 0.02) }]
          : undefined,
      }
    }
  }

  const top = keywordRanked[0]
  if (top && top.s >= 6) {
    const href = firstSessionHref(top.c.slug)
    if (href) {
      return {
        courseSlug: top.c.slug,
        courseTitle: top.c.title,
        kind: top.s >= 12 ? 'semantic' : 'keyword',
        confidence: Math.min(0.92, 0.52 + Math.min(top.s, 24) * 0.015),
        primaryHref: href,
      }
    }
  }

  const semanticFallback = FLAGSHIP_COURSES.map((c) => ({
    c,
    s: keywordScore(topicRaw, c),
  }))
    .sort((a, b) => b.s - a.s)[0]

  if (semanticFallback && semanticFallback.s >= 3) {
    const href = firstSessionHref(semanticFallback.c.slug)
    if (href) {
      return {
        courseSlug: semanticFallback.c.slug,
        courseTitle: semanticFallback.c.title,
        kind: 'semantic',
        confidence: Math.min(0.78, 0.42 + semanticFallback.s * 0.02),
        primaryHref: href,
      }
    }
  }

  return null
}

export function curriculumOutlineSnippet(slug: string, maxChars = 420): string | null {
  const curriculum = getFlagshipCurriculum(slug)
  if (!curriculum) return null
  const modTitles = curriculum.modules.slice(0, 4).map((m) => m.title).join(' · ')
  const cap = curriculum.capstone.title
  const text = `${curriculum.depthLabel}\nModules include: ${modTitles}.\nCapstone: ${cap}.`
  return text.length <= maxChars ? text : `${text.slice(0, maxChars)}…`
}
