/**
 * Answer normalisation for the standalone Practical Mathematics interactive quiz.
 *
 * The quiz authoring data uses human-readable correctAnswer strings (e.g. "$9",
 * "About $24.04/hour", "≈$74,000", "20%"). Learners typing free-form answers
 * should be matched against those strings with simple, predictable rules:
 *
 *  - case-insensitive
 *  - trim whitespace
 *  - drop common formatting characters that do not change meaning
 *    (commas in numbers, spaces, the "≈" "about" "approximately" hedges)
 *  - normalise common currency / percent / fraction layouts
 *
 * The matcher is intentionally simple. After submission, the learner sees the
 * authored correct answer + explanation, so a near-miss spelling does not lock
 * them out — it just costs them the point on that question for this attempt.
 *
 * Standalone — does not read or modify any flagship answer-validation code.
 */

const CURRENCY_SYMBOLS = ['$', 'kes', 'usd', 'shs', 'sh', 'shilling', 'shillings', 'dollar', 'dollars']
const HEDGES = ['about', 'approximately', 'approx', 'roughly', '≈', '~']
const UNIT_SUFFIXES = [
  'per hour',
  'per year',
  '/hour',
  '/yr',
  '/year',
  '/h',
  '/mo',
  '/month',
  '/day',
  '/wk',
  '/week',
]

/** Cheap, deterministic normaliser used by `quizAnswerMatches`. */
export function normalizeQuizAnswer(raw: string): string {
  let s = (raw ?? '').toString().toLowerCase().trim()
  if (!s) return ''
  // remove hedges anywhere
  for (const h of HEDGES) {
    while (s.includes(h)) s = s.split(h).join(' ')
  }
  // drop currency symbols / words
  for (const c of CURRENCY_SYMBOLS) {
    while (s.includes(c)) s = s.split(c).join(' ')
  }
  // drop unit suffixes (longer first so "/year" beats "/yr")
  for (const u of UNIT_SUFFIXES) {
    while (s.includes(u)) s = s.split(u).join(' ')
  }
  // strip thousands separators in numbers ("1,200" → "1200")
  s = s.replace(/(\d),(?=\d{3}\b)/g, '$1')
  // drop trailing zeros after a decimal point ("8.50" → "8.5", "8.0" → "8")
  s = s.replace(/(\d+\.\d*?)0+(?=\D|$)/g, '$1').replace(/(\d+)\.(?=\D|$)/g, '$1')
  // collapse internal whitespace + remove %, =, leading punctuation
  s = s
    .replace(/[%]/g, '')
    .replace(/[=]/g, ' ')
    .replace(/[()]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  return s
}

/**
 * True when the learner's answer matches the authored correct answer under
 * `normalizeQuizAnswer`. Both strings are normalised; the comparison is exact
 * after normalisation. This is intentionally strict-ish — partial credit or
 * fuzzy similarity is out of scope.
 */
export function quizAnswerMatches(learnerAnswer: string, correctAnswer: string): boolean {
  const a = normalizeQuizAnswer(learnerAnswer)
  const b = normalizeQuizAnswer(correctAnswer)
  if (!a || !b) return false
  return a === b
}
