import type { ProductionBrief } from './types.ts'

/**
 * Kinetic ASS captions for the designed render.
 *
 * Layout is built around the platform safe areas (Reels / Shorts / TikTok all
 * put UI in the top ~180px and the bottom ~320px, plus a right-hand action
 * rail): the progress bar and brand row sit at y≈150-280, the caption block is
 * vertically centred, and nothing is drawn below y≈1600.
 *
 * Colours are ASS &HBBGGRR, taken from the APPROVED brand system (brand/README-jifunze-brand.md):
 *   text    #FFFFFF            accent  #7C3AED  (primary violet)  -> &HED3A7C&
 *   outline #0B0B12 (near-black)                                  -> &H0B0B0B... see styles
 *   track   #2A2A32
 *
 * Corrected 2026-08-20: the accent was #78B9DC — the retired ".AI" blue from the
 * old wordmark — and the typeface was DejaVu Sans. Both violated the approved
 * identity (violet #7C3AED, Plus Jakarta Sans). Do not reintroduce either.
 *
 * Fontname must be the EXACT family recorded in the shipped TTF. brand/fonts
 * ships three single-weight faces, each declaring its own family
 * ("Plus Jakarta Sans ExtraBold", "... SemiBold", "... Medium"), so plain
 * "Plus Jakarta Sans" silently falls back to DejaVu. Bold is 0 for the same
 * reason: the weight lives in the face, and asking libass for synthetic bold
 * re-triggers the fallback.
 */

/** Seconds reserved at the end for the branded end card. */
export const END_CARD_SEC = 2.6

/** Primary violet #7C3AED as ASS &HBBGGRR. */
const ACCENT = '&HED3A7C&'
const WHITE = '&HFFFFFF&'

/** Words that should never be the highlighted keyword. */
const STOP = new Set([
  'THIS', 'THAT', 'WITH', 'YOUR', 'FROM', 'THEY', 'THEM', 'THAN', 'THEN', 'HAVE',
  'WHEN', 'WHAT', 'WILL', 'JUST', 'INTO', 'ONLY', 'MOST', 'MORE', 'ABOUT', 'THERE',
  'THEIR', 'BEING', 'DOING', 'AFTER', 'BEFORE', 'EVERY', 'THESE', 'THOSE',
])

const ts = (sec: number): string => {
  const m = Math.floor((sec % 3600) / 60)
  const s = (sec % 60).toFixed(2).padStart(5, '0')
  return `0:${String(m).padStart(2, '0')}:${s}`
}

const esc = (s: string): string => s.replace(/\\/g, '').replace(/[{}]/g, '').toUpperCase()

/** Highlight the most meaningful word of a beat in the brand accent. */
export function accentLine(line: string): string {
  const words = esc(line).split(/\s+/).filter(Boolean)
  if (!words.length) return ''
  let best = -1
  let bestLen = 0
  words.forEach((w, i) => {
    const bare = w.replace(/[^A-Z0-9]/g, '')
    if (bare.length > 4 && !STOP.has(bare) && bare.length > bestLen) { best = i; bestLen = bare.length }
  })
  if (best < 0) return words.join(' ')
  words[best] = `{\\c${ACCENT}}${words[best]}{\\c${WHITE}}`
  return words.join(' ')
}

/**
 * Bottom-of-frame CTA shown on the end card.
 * DISABLED (2026-08-20): the Free Kazi Kit landing page does not exist yet, so no
 * rendered video may promise it. Restore a CTA here only once the destination is
 * live and the bio link points at it.
 */
const END_CTA = ''

export function buildAss(brief: ProductionBrief): string {
  const dur = Math.min(Math.max(brief.duration_sec ?? 18, 8), 60)
  const endCard = Math.min(END_CARD_SEC, dur / 3)
  const body = Math.max(dur - endCard, 2)

  const beats = [brief.hook, ...brief.segments].map((b) => (b ?? '').trim()).filter(Boolean)
  const per = body / Math.max(beats.length, 1)

  const events = beats.map((text, i) => {
    const st = ts(i * per)
    const en = ts(Math.min((i + 1) * per, body))
    // pop-in + fade, so each beat lands rather than cross-dissolving into mush
    const fx = '{\\fad(110,110)\\fscx90\\fscy90\\t(0,180,\\fscx100\\fscy100)}'
    return `Dialogue: 0,${st},${en},Cap,,0,0,0,,${fx}${accentLine(text)}`
  })

  // Progress bar: a track plus a fill that steps forward once per beat. Drawn in
  // absolute PlayRes coordinates from the top-left origin.
  const X0 = 72
  const X1 = 1008
  const Y0 = 150
  const Y1 = 158
  const track = `Dialogue: 0,0:00:00.00,${ts(body)},Prog,,0,0,0,,{\\pos(0,0)\\c&H2A2A32&\\alpha&H60&\\p1}m ${X0} ${Y0} l ${X1} ${Y0} ${X1} ${Y1} ${X0} ${Y1}{\\p0}`
  const fills = beats.map((_, i) => {
    const st = ts(i * per)
    const en = ts(Math.min((i + 1) * per, body))
    const x = Math.round(X0 + (X1 - X0) * ((i + 1) / beats.length))
    return `Dialogue: 0,${st},${en},Prog,,0,0,0,,{\\pos(0,0)\\c${ACCENT}\\p1}m ${X0} ${Y0} l ${x} ${Y0} ${x} ${Y1} ${X0} ${Y1}{\\p0}`
  })

  const endCta = END_CTA
    ? `Dialogue: 0,${ts(body)},${ts(dur)},Cta,,0,0,0,,{\\fad(220,0)}${esc(END_CTA)}`
    : ''

  return `[Script Info]
ScriptType: v4.00+
PlayResX: 1080
PlayResY: 1920
WrapStyle: 0
ScaledBorderAndShadow: yes

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, OutlineColour, BackColour, Bold, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Cap,Plus Jakarta Sans ExtraBold,96,&H00FFFFFF,&H000B0B12,&HA0000000,0,5,2,5,110,110,0,1
Style: Cta,Plus Jakarta Sans SemiBold,52,&H00ED3A7C,&H000B0B12,&H00000000,0,3,0,8,80,80,1080,1
Style: Prog,Plus Jakarta Sans ExtraBold,40,&H00FFFFFF,&H00000000,&H00000000,0,0,0,7,0,0,0,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
${track}
${fills.join('\n')}
${events.join('\n')}
${endCta}
`
}
