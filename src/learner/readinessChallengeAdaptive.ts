/** Maximum questions in one challenge attempt. */
export const READINESS_MAX_QUESTIONS = 20

/** Minimum answered before early pass / termination checks apply. */
export const READINESS_MIN_DECISION = 10

/** Pass threshold as share of answered questions at decision points (early exit). */
export const READINESS_PASS_RATIO = 0.8

const PASS_CORRECT_AT_MAX = Math.ceil(READINESS_MAX_QUESTIONS * READINESS_PASS_RATIO)

export type AdaptiveOutcome =
  | { status: 'continue' }
  | { status: 'passed' }
  | { status: 'failed'; reason: 'below_bar' | 'impossible' }

/**
 * Called after each answered question (`answeredCount` is total answered so far).
 */
export function evaluateAdaptiveStep(correctCount: number, answeredCount: number): AdaptiveOutcome {
  if (answeredCount === READINESS_MAX_QUESTIONS) {
    return correctCount >= PASS_CORRECT_AT_MAX ? { status: 'passed' } : { status: 'failed', reason: 'below_bar' }
  }

  if (answeredCount < READINESS_MIN_DECISION) {
    return { status: 'continue' }
  }

  const ratio = correctCount / answeredCount
  if (ratio + 1e-9 >= READINESS_PASS_RATIO) {
    return { status: 'passed' }
  }

  const maxCorrectIfRemainingCorrect = correctCount + (READINESS_MAX_QUESTIONS - answeredCount)
  if (maxCorrectIfRemainingCorrect < PASS_CORRECT_AT_MAX) {
    return { status: 'failed', reason: 'impossible' }
  }

  return { status: 'continue' }
}
