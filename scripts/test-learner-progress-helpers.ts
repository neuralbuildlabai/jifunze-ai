/**
 * Lightweight assertions for learner progress helpers (no Vitest in repo).
 * Run: npm run test:learner-progress
 */

import assert from 'node:assert/strict'
import { wellbeingProgressPercent, nextWellbeingDaySlug, WELLBEING_RESET_DAY_SLUGS } from '../src/data/learning/wellbeingResetProgressPlan'

assert.equal(wellbeingProgressPercent([]), 0)
assert.equal(wellbeingProgressPercent(['day-1', 'day-2']), Math.round((2 / 6) * 100))
assert.equal(wellbeingProgressPercent([...WELLBEING_RESET_DAY_SLUGS]), 100)

assert.equal(nextWellbeingDaySlug([]), 'day-1')
assert.equal(nextWellbeingDaySlug(['day-1']), 'day-2')
assert.equal(nextWellbeingDaySlug([...WELLBEING_RESET_DAY_SLUGS]), null)

console.log('test:learner-progress OK')
