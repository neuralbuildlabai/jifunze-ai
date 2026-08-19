/**
 * Script quality gate.
 *
 * The engine can produce a technically valid brief that is still off-brand
 * filler ("AI is changing everything… let's dive in"). This is the check that
 * says no. It runs on every brief before render, in CI and locally, and needs
 * no network — it is pure string work over the ProductionBrief.
 *
 * errors  = would embarrass the brand; the loop refuses to render in strict mode
 * warnings = worth a look but not fatal
 */
/** The only fields the gate reads — so tests and tools can check a bare script. */
export type ScriptShape = {
  hook: string
  segments: string[]
  caption: string
}

/** Openers and stock phrases that mark a script as generic AI-hype filler. */
export const BANNED_PHRASES = [
  "in today's fast-paced world",
  'in todays fast-paced world',
  'in this day and age',
  'ai is changing everything',
  'ai is transforming everything',
  "let's dive in",
  'lets dive in',
  'dive deep',
  'this is important for everyone',
  'in this video',
  'game changer',
  'game-changer',
  'revolutionize',
  'revolutionise',
  'unlock the power',
  'the future is here',
  'buckle up',
  'stay tuned',
  'read on to find out',
  'you won’t believe',
  "you won't believe",
]

/** A script has to tell someone to DO something. */
const ACTION_VERBS = [
  'paste', 'ask', 'write', 'rewrite', 'send', 'open', 'search', 'delete', 'cut',
  'swap', 'add', 'list', 'pick', 'build', 'record', 'practise', 'practice', 'check',
  'reply', 'apply', 'tailor', 'reorder', 'name', 'count', 'start', 'stop', 'use',
  'copy', 'save', 'follow', 'call', 'message', 'try', 'set', 'make', 'show', 'fix',
]

/** Every caption must end with the channel CTA. */
export const CTA_SUFFIX = 'link in bio'

export type QualityReport = {
  ok: boolean
  errors: string[]
  warnings: string[]
}

const words = (s: string): string[] => s.trim().split(/\s+/).filter(Boolean)
const EMOJI = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u

export function validateBrief(brief: ScriptShape): QualityReport {
  const errors: string[] = []
  const warnings: string[] = []

  const hook = (brief.hook ?? '').trim()
  const segments = (brief.segments ?? []).map((s) => (s ?? '').trim()).filter(Boolean)
  const caption = (brief.caption ?? '').trim()
  const all = [hook, ...segments, caption].join(' • ').toLowerCase()

  // --- hook -----------------------------------------------------------------
  if (!hook) errors.push('hook is empty')
  else {
    const hw = words(hook).length
    if (hw > 9) errors.push(`hook is ${hw} words — must be 9 or fewer to land in the first second`)
    if (hw < 3) warnings.push(`hook is only ${hw} words — check it actually opens a gap`)
    if (hook.length > 60) errors.push(`hook is ${hook.length} chars — must be 60 or fewer`)
    if (EMOJI.test(hook)) errors.push('hook contains an emoji')
  }

  // --- segments -------------------------------------------------------------
  if (segments.length < 3) errors.push(`only ${segments.length} segments — need at least 3 beats to teach anything`)
  if (segments.length > 6) errors.push(`${segments.length} segments — more than 6 is unreadable at Reels pace`)
  segments.forEach((seg, i) => {
    const n = words(seg).length
    if (n > 8) errors.push(`segment ${i + 1} is ${n} words ("${seg}") — keep beats to 8 words or fewer`)
    if (EMOJI.test(seg)) errors.push(`segment ${i + 1} contains an emoji`)
  })

  // --- caption + CTA --------------------------------------------------------
  if (!caption) errors.push('caption is empty')
  else {
    if (caption.length > 180) errors.push(`caption is ${caption.length} chars — Instagram first-line limit is 180`)
    if (!caption.toLowerCase().includes(CTA_SUFFIX)) errors.push(`caption is missing the CTA ("${CTA_SUFFIX}")`)
  }

  // --- filler ---------------------------------------------------------------
  for (const phrase of BANNED_PHRASES) {
    if (all.includes(phrase)) errors.push(`generic filler phrase: "${phrase}"`)
  }

  // --- one practical takeaway ----------------------------------------------
  const segmentText = segments.join(' ')
  const hasAction = ACTION_VERBS.some((v) => new RegExp(`\\b${v}(s|es|ed|ing)?\\b`, 'i').test(segmentText))
  if (!hasAction) errors.push('no action verb in any segment — the script does not tell the viewer what to DO')

  // --- drift into generic AI commentary ------------------------------------
  const aiMentions = (all.match(/\bai\b/g) ?? []).length
  if (aiMentions >= 3 && !hasAction) warnings.push('heavy AI mentions with no concrete action — reads as commentary')

  return { ok: errors.length === 0, errors, warnings }
}

/** Convenience for CLI/CI output. */
export function formatReport(report: QualityReport): string {
  if (report.ok && !report.warnings.length) return 'script quality: OK'
  const lines = [`script quality: ${report.ok ? 'OK (with warnings)' : 'FAILED'}`]
  for (const e of report.errors) lines.push(`  error   ${e}`)
  for (const w of report.warnings) lines.push(`  warning ${w}`)
  return lines.join('\n')
}
