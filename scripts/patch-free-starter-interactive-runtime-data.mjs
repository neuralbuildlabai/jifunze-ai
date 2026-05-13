/**
 * Idempotent post-export fixes for free-starter interactive packages:
 * - Jifunze-first labels + export target + block-type accessibility label (parsed JSON).
 * - Smart Workflows: trim trailing whitespace from all lesson titles.
 * - AI at Work: welcome lesson copy (lesson 1 in zero-based UI = lessons[0]).
 * - Business Analytics: short course title, lesson 6 title, lesson 1 template paragraph.
 * - 5-Day Mental Wellbeing Reset: Jifunze-first labels + export target + a11y labels (shared apply helper).
 *
 * Run: node scripts/patch-free-starter-interactive-runtime-data.mjs
 */
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  applyJifunzeExportAndA11yLabels,
  patchAiAtWorkWelcomeLesson,
  patchBusinessAnalyticsRuntime,
  trimAllCourseLessonTitles,
} from './lib/free-starter-interactive-runtime-patch.mjs'
import { decodeRuntimeDataJson, encodeRuntimeDataJson } from './lib/interactive-runtime-jsonp.mjs'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const INTERACTIVE = join(ROOT, 'public/course-assets/interactive')

function patchSlug(slug, mutator) {
  const dir = join(INTERACTIVE, slug, 'content')
  const { raw } = decodeRuntimeDataJson(dir)
  const data = JSON.parse(raw)
  const changed = mutator(data)
  if (changed) {
    encodeRuntimeDataJson(dir, JSON.stringify(data))
    console.log(`patched: ${slug}`)
  } else {
    console.log(`skip: ${slug} (no changes)`)
  }
}

function main() {
  patchSlug('smart-workflows-with-ai', (data) => {
    const a = applyJifunzeExportAndA11yLabels(data)
    const b = trimAllCourseLessonTitles(data)
    return a || b
  })

  patchSlug('ai-at-work-chatgpt', (data) => {
    const a = applyJifunzeExportAndA11yLabels(data)
    const b = patchAiAtWorkWelcomeLesson(data)
    return a || b
  })

  patchSlug('business-analytics-decision-making', (data) => patchBusinessAnalyticsRuntime(data))

  patchSlug('5-day-mental-wellbeing-reset', (data) => applyJifunzeExportAndA11yLabels(data))

  console.log('patch-free-starter-interactive-runtime-data: ok')
}

main()
