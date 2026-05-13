/**
 * Applies learner-safe string patches to Smart Workflows embedded `runtime-data.js`.
 * Idempotent: re-run only applies replacements whose source substring is still present.
 *
 * Run: node scripts/patch-smart-workflows-interactive-runtime-data.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const RUNTIME = join(
  ROOT,
  'public/course-assets/interactive/smart-workflows-with-ai/content/runtime-data.js',
)

function main() {
  const s = readFileSync(RUNTIME, 'utf8')
  const m = s.match(/__jsonp\("runtime-data\.js","([^"]*)"\)\s*;?\s*/)
  if (!m) throw new Error('runtime-data.js: unexpected format (expected __jsonp wrapper)')

  let next = Buffer.from(m[1], 'base64').toString('utf8')
  if (!next.includes('"course"')) throw new Error('decoded payload missing course root')

  const replacements = [
    ['"title":"Module 1: AI at Work Foundations\\n"', '"title":"Module 1: Foundations for smarter workflows\\n"'],
    ['"title":"Rise of Machine Learning"', '"title":"Machine learning in everyday work"'],
    ['"a11yAiTutorArticulateLogo":"Articulate - open in new tab"', '"a11yAiTutorArticulateLogo":"Jifunze.ai - open in new tab"'],
    [
      '"aiTutorTermsPrefix":"By using this service, you agree to the Articulate"',
      '"aiTutorTermsPrefix":"By using this service, you agree to the Jifunze.ai"',
    ],
    ['"a11yBlockStoryline":"Storyline"', '"a11yBlockStoryline":"Lesson content"'],
    ['"targetName":"SCORM 1.2"', '"targetName":"Jifunze.ai workshop"'],
    ['"heading":"AI at Work: Real-World Examples"', '"heading":"Real-world AI examples at work"'],
  ]

  let changed = false
  for (const [a, b] of replacements) {
    const c = next.split(a).length - 1
    if (c === 0) continue
    next = next.split(a).join(b)
    changed = true
  }

  if (!changed) {
    console.log('patch-smart-workflows-interactive-runtime-data: nothing to do')
    return
  }

  const outB64 = Buffer.from(next, 'utf8').toString('base64')
  const out = `__jsonp("runtime-data.js","${outB64}");`
  writeFileSync(RUNTIME, out, 'utf8')
  console.log('patch-smart-workflows-interactive-runtime-data: ok', { bytes: out.length })
}

main()
