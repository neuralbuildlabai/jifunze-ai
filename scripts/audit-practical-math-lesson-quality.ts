/**
 * Lesson quality audit for standalone Practical Mathematics only.
 * Run: npm run verify:practical-math-lessons
 *
 * The audit is a depth check, not a shrinkage tool. The recommended fix for
 * any flagged lesson is to ADD substantive math content (worked examples,
 * guided practice, specific answer keys) — never to lower the displayed
 * duration. The course is intentionally substantial; weak lessons should
 * be shored up.
 *
 * Checks performed:
 *  1. Every lesson has at least one worked_example block.
 *  2. Every lesson has a practice_task or guided_practice block.
 *  3. Every practice_task and guided_practice block has a specific answerKey
 *     (non-empty, not the legacy generic placeholder).
 *  4. Every module contains at least one calculation-heavy worked example.
 *  5. No banned placeholder substrings appear in lesson or module text.
 *  6. Quiz items reference real lesson numbers within their module.
 *  7. DEPTH: lessons that are 30+ minutes and calculation-heavy must have
 *     at least two worked_example blocks (depth requirement, not duration
 *     reduction).
 *  8. DEPTH: lessons whose visible content is far below their stated duration
 *     are flagged as needing more substance — the recommended action is to
 *     deepen content (add a worked example, a guided practice, more
 *     reasonableness work) rather than to shorten the duration.
 *
 * The capstone brief lesson (16.4) is exempt from the depth lower-bound
 * because its practice_task is the artifact itself (the work happens on
 * paper outside the lesson page). It still must pass all other checks.
 */

import assert from 'node:assert/strict'

import { practicalMathematicsCourse } from '../src/data/courses/index'

const GENERIC_ANSWER_KEY =
  'Use your own numbers. Show: Given → Formula → Substitute → Calculate → Answer → one-line reasonableness check.'

const BANNED_SUBSTRINGS = ['coming soon', 'preview only', 'placeholder', 'sample only'] as const

/** Heuristic: worked example teaches calculation if digits + operator appear. */
function looksCalculationHeavy(text: string | undefined): boolean {
  if (!text || text.length < 8) return false
  const hasDigit = /\d/.test(text)
  const hasOp = /[+\-×÷=*≈]/.test(text) || /\bper\b/i.test(text) || /\b%\b/.test(text)
  return hasDigit && hasOp
}

function collectLessonText(lesson: (typeof practicalMathematicsCourse.modules)[0]['lessons'][0]): string {
  return [lesson.title, lesson.learnerGoal, ...lesson.blocks.map((b) => [b.content, b.title, b.answerKey].filter(Boolean).join(' '))]
    .join(' ')
    .toLowerCase()
}

let failures = 0
function fail(msg: string) {
  failures += 1
  console.error(`FAIL: ${msg}`)
}

// 5. banned placeholders ----------------------------------------------------
for (const phrase of BANNED_SUBSTRINGS) {
  const re = new RegExp(phrase, 'i')
  for (const m of practicalMathematicsCourse.modules) {
    for (const l of m.lessons) {
      if (re.test(collectLessonText(l))) {
        fail(`${m.slug} lesson ${l.lessonNumber}: banned phrase "${phrase}"`)
      }
    }
    const modText = [m.overview, m.moduleSummary, ...(m.completionChecklist ?? [])].join(' ').toLowerCase()
    if (re.test(modText)) fail(`${m.slug}: banned phrase in module text`)
  }
}

// 1–4. structural checks + answer-key specificity ---------------------------
for (const m of practicalMathematicsCourse.modules) {
  let moduleHasCalcWorked = false
  for (const l of m.lessons) {
    const hasWorked = l.blocks.some((b) => b.type === 'worked_example')
    if (!hasWorked) fail(`${m.slug} ${l.lessonNumber}: missing worked_example`)

    const hasPracticeOrGuided = l.blocks.some((b) => b.type === 'practice_task' || b.type === 'guided_practice')
    if (!hasPracticeOrGuided) fail(`${m.slug} ${l.lessonNumber}: missing practice_task or guided_practice`)

    for (const b of l.blocks) {
      if (b.type === 'worked_example' && looksCalculationHeavy(b.content)) moduleHasCalcWorked = true
      if (b.type === 'practice_task') {
        const key = b.answerKey?.trim() ?? ''
        if (!key) fail(`${m.slug} ${l.lessonNumber}: practice_task missing answerKey — add a specific answerKey, do not leave blank`)
        else if (key === GENERIC_ANSWER_KEY) fail(`${m.slug} ${l.lessonNumber}: practice_task still has generic answerKey — replace with specific numbers and verification`)
      }
      if (b.type === 'guided_practice') {
        const key = b.answerKey?.trim() ?? ''
        if (!key) fail(`${m.slug} ${l.lessonNumber}: guided_practice missing answerKey — add a specific answerKey, do not leave blank`)
        else if (key === GENERIC_ANSWER_KEY) fail(`${m.slug} ${l.lessonNumber}: guided_practice still has generic answerKey — replace with specific numbers and verification`)
      }
    }
  }
  if (!moduleHasCalcWorked) fail(`${m.slug}: no calculation-heavy worked_example detected — add at least one Given/Formula/Substitute/Calculate/Answer block`)
}

// ---------------------------------------------------------------------------
// 7–8. Depth checks (math course is intentionally substantial)
// ---------------------------------------------------------------------------
//
// Per-block expected work time, used to estimate how much content the lesson
// actually carries. The fix for a thin lesson is always to ADD content, not
// to lower the displayed duration.
//
//   concept_explanation:        1.0 + words/130
//   worked_example:             3.5 + words/90    (calc-heavy reading)
//   pause_and_check:            2.0 + words/130
//   common_mistakes:            1.0 + words/130
//   real_world_application:     1.0 + words/130
//   guided_practice:            5.0 + words/110
//   practice_task:              7.0 + words/110   (do the task + verify)
//   reflection_or_application:  2.5 + words/130
//   quiz_intro:                 1.0 + words/130
//   summary:                    0.5 + words/130
// Plus 1.0 minute lesson overhead.

const DURATION_EXEMPT_LESSONS = new Set(['16.4']) // capstone artifact lives off-page
const DEPTH_MIN_WORKED_EXAMPLES_FOR_LONG_CALC_LESSONS = 2
const LONG_CALC_LESSON_MIN_MINUTES = 30
const THIN_LESSON_GAP_MIN = 14 // stated minus computed; warn — deepen the lesson
const HARD_THIN_LESSON_GAP_MIN = 30 // catastrophic gap, would block CI; very high bar by design

function wordsIn(s: string | undefined | null): number {
  if (!s) return 0
  return s.trim().split(/\s+/).filter(Boolean).length
}

function blockWords(b: (typeof practicalMathematicsCourse.modules)[0]['lessons'][0]['blocks'][0]): number {
  let n = 0
  n += wordsIn(b.title)
  n += wordsIn(b.content)
  n += wordsIn(b.learnerTask)
  n += wordsIn(b.answerKey)
  n += wordsIn(b.prompt)
  n += wordsIn(b.outputExpectation)
  for (const x of b.bullets ?? []) n += wordsIn(x)
  for (const x of b.examples ?? []) n += wordsIn(x)
  return n
}

function estimateLessonMinutes(lesson: (typeof practicalMathematicsCourse.modules)[0]['lessons'][0]): number {
  let mins = 1.0 // overhead
  for (const b of lesson.blocks) {
    const w = blockWords(b)
    switch (b.type) {
      case 'worked_example':
        mins += 3.5 + w / 90
        break
      case 'practice_task':
        mins += 7.0 + w / 110
        break
      case 'guided_practice':
        mins += 5.0 + w / 110
        break
      case 'pause_and_check':
        mins += 2.0 + w / 130
        break
      case 'reflection_or_application':
        mins += 2.5 + w / 130
        break
      case 'quiz_intro':
        mins += 1.0 + w / 130
        break
      case 'summary':
        mins += 0.5 + w / 130
        break
      case 'concept_explanation':
        mins += 1.0 + w / 130
        break
      case 'common_mistakes':
      case 'real_world_application':
      default:
        mins += 1.0 + w / 130
    }
  }
  return mins
}

function lessonIsCalculationHeavy(lesson: (typeof practicalMathematicsCourse.modules)[0]['lessons'][0]): boolean {
  return lesson.blocks.some((b) => b.type === 'worked_example' && looksCalculationHeavy(b.content))
}

let depthWarnings = 0
function depthWarn(msg: string) {
  depthWarnings += 1
  console.warn(`WARN: ${msg}`)
}

for (const m of practicalMathematicsCourse.modules) {
  for (const l of m.lessons) {
    const isCalcHeavy = lessonIsCalculationHeavy(l)
    const workedExampleCount = l.blocks.filter((b) => b.type === 'worked_example').length
    const stated = l.estimatedMinutes

    // 7. Long calculation-heavy lessons should have ≥2 worked examples.
    //    Warning by default — encourages depth without breaking CI for legacy
    //    lessons. Flip to fail() once all flagged lessons have been deepened.
    if (
      isCalcHeavy &&
      stated >= LONG_CALC_LESSON_MIN_MINUTES &&
      workedExampleCount < DEPTH_MIN_WORKED_EXAMPLES_FOR_LONG_CALC_LESSONS
    ) {
      depthWarn(
        `${m.slug} ${l.lessonNumber}: ${stated}-min calculation-heavy lesson has only ${workedExampleCount} worked_example block(s). Add at least ${DEPTH_MIN_WORKED_EXAMPLES_FOR_LONG_CALC_LESSONS - workedExampleCount} more worked_example block(s) (do NOT shorten the duration).`,
      )
    }

    // 8. Visible content far thinner than stated duration → deepen.
    //    HARD threshold is intentionally high; the goal is to flag, not block.
    //    Recommended fix is always to ADD content (worked example, guided
    //    practice, expanded concept_explanation), never to lower duration.
    if (DURATION_EXEMPT_LESSONS.has(l.lessonNumber)) continue
    const computed = estimateLessonMinutes(l)
    const gap = stated - computed
    if (gap > HARD_THIN_LESSON_GAP_MIN) {
      fail(
        `${m.slug} ${l.lessonNumber}: stated ${stated} min has only ~${Math.round(computed)} min of visible content (gap ${Math.round(gap)} min). Deepen the lesson — add a worked_example or guided_practice with specific numbers; do NOT lower the duration.`,
      )
    } else if (gap > THIN_LESSON_GAP_MIN) {
      depthWarn(
        `${m.slug} ${l.lessonNumber}: stated ${stated} min vs ~${Math.round(computed)} min of visible content (gap ${Math.round(gap)} min). Add another worked_example or guided_practice block to honour the duration.`,
      )
    }
  }
}

// 6. Quiz items reference real lesson numbers ------------------------------
for (const m of practicalMathematicsCourse.modules) {
  const nums = new Set(m.lessons.map((l) => l.lessonNumber))
  for (const q of m.moduleQuiz) {
    if (!nums.has(q.relatedLesson)) {
      fail(`${m.slug} quiz ${q.id}: relatedLesson "${q.relatedLesson}" not found in module lessons`)
    }
  }
}

if (failures > 0) {
  console.error(`\nLesson quality audit: ${failures} failure(s)${depthWarnings ? `, ${depthWarnings} warning(s)` : ''}.`)
  console.error('Recommended fix: ADD substantive math content (worked examples, guided practice, specific answer keys). Do NOT lower the displayed duration.')
  process.exit(1)
}

if (depthWarnings > 0) {
  console.log(`Lesson quality audit: OK with ${depthWarnings} depth warning(s) — consider deepening flagged lessons.`)
} else {
  console.log('Lesson quality audit: OK (all checks passed).')
}
assert.ok(true)
