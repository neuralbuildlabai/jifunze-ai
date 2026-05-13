/**
 * Verification for public free-starter embedded interactive course packages.
 * Does not require removing third-party CDN URLs from blobs (thumbnails) — those are not learner copy.
 */
import { existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { BA_LESSON6_TO, BA_SHORT_TITLE } from './free-starter-interactive-runtime-patch.mjs'
import { assertJifunzeRuntimeBranding } from './interactive-runtime-jifunze-branding-verify.mjs'
import { decodeRuntimeDataJson } from './interactive-runtime-jsonp.mjs'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '../..')
const INTERACTIVE = join(ROOT, 'public/course-assets/interactive')

/** Embedded player entry paths (must stay stable for /learn/free/* shells). */
export const FREE_STARTER_EMBEDDED_INDEX_HTML = {
  'smart-workflows-with-ai': '/course-assets/interactive/smart-workflows-with-ai/content/index.html',
  'ai-at-work-chatgpt': '/course-assets/interactive/ai-at-work-chatgpt/content/index.html',
  'business-analytics-decision-making':
    '/course-assets/interactive/business-analytics-decision-making/content/index.html',
  '5-day-mental-wellbeing-reset':
    '/course-assets/interactive/5-day-mental-wellbeing-reset/content/index.html',
}

const SMART_SPECIFIC_FORBIDDEN = ['Rise of Machine Learning', 'Module 1: AI at Work Foundations']

function assertIndexAssetsResolve(contentDir) {
  const htmlPath = join(contentDir, 'index.html')
  const html = readFileSync(htmlPath, 'utf8')
  const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map((x) => x[1])
  const srcs = [...html.matchAll(/src="([^"]+)"/g)].map((x) => x[1])
  for (const rel of [...hrefs, ...srcs]) {
    if (rel.startsWith('http')) continue
    const abs = join(contentDir, rel)
    if (!existsSync(abs)) throw new Error(`missing asset in ${contentDir}: ${rel}`)
  }
}

function assertHostOverridesLinked(contentDir) {
  const html = readFileSync(join(contentDir, 'index.html'), 'utf8')
  if (!html.includes('jifunze-host-overrides.css')) {
    throw new Error(`${contentDir}: index.html should link jifunze-host-overrides.css`)
  }
  const css = join(contentDir, 'jifunze-host-overrides.css')
  if (!existsSync(css)) throw new Error(`${contentDir}: missing jifunze-host-overrides.css`)
}

function assertEmbeddedPlayerPathExists(slug) {
  const rel = FREE_STARTER_EMBEDDED_INDEX_HTML[slug]
  if (!rel) throw new Error(`unknown slug: ${slug}`)
  const abs = join(ROOT, 'public', rel.replace(/^\//, ''))
  if (!existsSync(abs)) throw new Error(`missing embedded player index: ${abs}`)
}

function assertSmartLessonTitleHygiene(data) {
  const lessons = data?.course?.lessons
  if (!Array.isArray(lessons)) throw new Error('smart-workflows: missing course.lessons')
  for (let i = 0; i < lessons.length; i++) {
    const t = lessons[i].title
    if (typeof t !== 'string') throw new Error(`smart-workflows: lesson ${i} missing title`)
    if (/[\n\r\t]/.test(t)) {
      throw new Error(`smart-workflows: lesson ${i} title contains newline or other control whitespace`)
    }
    if (/\s$/u.test(t)) {
      throw new Error(`smart-workflows: lesson ${i} title has trailing whitespace`)
    }
  }
}

function collectLessonZeroParagraphs(data) {
  const L0 = data?.course?.lessons?.[0]
  const out = []
  if (!L0?.items) return out
  const walk = (items) => {
    if (!Array.isArray(items)) return
    for (const it of items) {
      if (it.type === 'text' && Array.isArray(it.items)) {
        for (const sub of it.items) {
          if (typeof sub.paragraph === 'string') out.push(sub.paragraph)
        }
      }
      for (const k of Object.keys(it)) {
        const v = it[k]
        if (v && typeof v === 'object') walk(Array.isArray(v) ? v : [v])
      }
    }
  }
  walk(L0.items)
  return out
}

function assertAiWelcomeCopy(data) {
  const paras = collectLessonZeroParagraphs(data).join('\n')
  if (!paras.includes('checking AI output')) {
    throw new Error('ai-at-work: welcome lesson should mention checking AI output (patched copy)')
  }
  if (!paras.includes('sensitive information')) {
    throw new Error('ai-at-work: welcome lesson should mention sensitive information (patched copy)')
  }
  if (paras.includes('great power comes great responsibility')) {
    throw new Error('ai-at-work: cliché welcome line should be removed')
  }
  if (paras.includes('essential skills needed to effectively use Generative AI')) {
    throw new Error('ai-at-work: redundant Generative-AI boilerplate paragraph should be removed')
  }
}

function assertBusinessAnalyticsCopy(data) {
  if (data.course.title !== BA_SHORT_TITLE) {
    throw new Error(`business-analytics: expected course.title ${JSON.stringify(BA_SHORT_TITLE)}`)
  }
  if (data.course.exportSettings?.title !== BA_SHORT_TITLE) {
    throw new Error(`business-analytics: expected exportSettings.title ${JSON.stringify(BA_SHORT_TITLE)}`)
  }
  const lessons = data.course.lessons
  if (!Array.isArray(lessons) || !lessons[5]) throw new Error('business-analytics: missing lesson 6')
  if (lessons[5].title !== BA_LESSON6_TO) {
    throw new Error(`business-analytics: expected lesson 6 title ${JSON.stringify(BA_LESSON6_TO)} got ${JSON.stringify(lessons[5].title)}`)
  }
  const paras = collectLessonZeroParagraphs(data).join('\n')
  if (paras.includes('The following objectives outline what you will accomplish')) {
    throw new Error('business-analytics: template objectives line should be patched out of lesson 1')
  }
}

/**
 * @param {'smart-workflows-with-ai' | 'ai-at-work-chatgpt' | 'business-analytics-decision-making' | '5-day-mental-wellbeing-reset'} slug
 */
export function verifyFreeStarterInteractivePackage(slug) {
  assertEmbeddedPlayerPathExists(slug)
  const contentDir = join(INTERACTIVE, slug, 'content')
  const { raw } = decodeRuntimeDataJson(contentDir)
  assertJifunzeRuntimeBranding(raw)
  const data = JSON.parse(raw)

  if (slug === 'smart-workflows-with-ai') {
    for (const phrase of SMART_SPECIFIC_FORBIDDEN) {
      if (raw.includes(phrase)) {
        throw new Error(`runtime-data still contains forbidden phrase: ${phrase}`)
      }
    }
    assertSmartLessonTitleHygiene(data)
  }

  if (slug === 'ai-at-work-chatgpt') {
    assertAiWelcomeCopy(data)
  }

  if (slug === 'business-analytics-decision-making') {
    assertBusinessAnalyticsCopy(data)
  }

  assertIndexAssetsResolve(contentDir)
  assertHostOverridesLinked(contentDir)
}
