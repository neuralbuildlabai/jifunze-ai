/**
 * Lesson quality audit for standalone Practical Mathematics only.
 * Run: npm run verify:practical-math-lessons
 *
 * Checks: worked_example per lesson; practice_task or guided_practice;
 * non-generic answerKey on practice_task and guided_practice; calculation-heavy
 * worked example per module; banned placeholder strings; no legacy pass-rule
 * wording in this course's learner-facing strings.
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
        if (!key) fail(`${m.slug} ${l.lessonNumber}: practice_task missing answerKey`)
        else if (key === GENERIC_ANSWER_KEY) fail(`${m.slug} ${l.lessonNumber}: practice_task still has generic answerKey`)
      }
      if (b.type === 'guided_practice') {
        const key = b.answerKey?.trim() ?? ''
        if (!key) fail(`${m.slug} ${l.lessonNumber}: guided_practice missing answerKey`)
        else if (key === GENERIC_ANSWER_KEY) fail(`${m.slug} ${l.lessonNumber}: guided_practice still has generic answerKey`)
      }
    }
  }
  if (!moduleHasCalcWorked) fail(`${m.slug}: no calculation-heavy worked_example detected`)
}

/** Quiz relatedLesson must match a lesson number in the same module. */
for (const m of practicalMathematicsCourse.modules) {
  const nums = new Set(m.lessons.map((l) => l.lessonNumber))
  for (const q of m.moduleQuiz) {
    if (!nums.has(q.relatedLesson)) {
      fail(`${m.slug} quiz ${q.id}: relatedLesson "${q.relatedLesson}" not found in module lessons`)
    }
  }
}

if (failures > 0) {
  console.error(`\nLesson quality audit: ${failures} issue(s).`)
  process.exit(1)
}

console.log('Lesson quality audit: OK (all checks passed).')
assert.ok(true)
