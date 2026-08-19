import type { ProductionBrief } from './types.ts'

/**
 * Kinetic ASS captions: bold white with a brand-accent keyword, a JIFUNZE mark,
 * progress dots, and a closing brand end card. Far cleaner than plain centered text.
 *
 * Brand colours are ASS BGR. Brand violet #7c3aed → &HED3A7C.
 * The positioning line lives here as editable copy, never inside a logo asset.
 */
const BRAND_VIOLET_BGR = 'ED3A7C'
const POSITIONING_LINE = 'Your idea never sleeps.'
/** Seconds reserved at the tail for the brand end card. */
const END_CARD_SEC = 2.2

export function buildAss(brief: ProductionBrief): string {
  const dur = Math.min(Math.max(brief.duration_sec ?? 18, 8), 60)
  // Never let the end card eat more than a third of a short clip.
  const endCard = Math.min(END_CARD_SEC, dur / 3)
  const body = Math.max(dur - endCard, dur / 2)
  const beats = [brief.hook, ...brief.segments].filter(Boolean)
  const per = body / beats.length

  const t = (sec: number) => {
    const m = Math.floor((sec % 3600) / 60)
    const s = (sec % 60).toFixed(2).padStart(5, '0')
    return `0:${String(m).padStart(2, '0')}:${s}`
  }
  const esc = (s: string) => s.replace(/\\/g, '').replace(/[{}]/g, '').toUpperCase()

  // accent the first "significant" word (>4 chars) of each beat, in brand violet.
  const accent = (line: string) => {
    const words = esc(line).split(' ')
    const i = words.findIndex((w) => w.replace(/[^A-Z]/g, '').length > 4)
    if (i < 0) return esc(line)
    words[i] = `{\\c&H${BRAND_VIOLET_BGR}&}${words[i]}{\\c&HFFFFFF&}`
    return words.join(' ')
  }

  const events = beats.map((text, i) => {
    const st = t(i * per), en = t(Math.min((i + 1) * per, body))
    const fx = '{\\fad(120,120)\\fscx88\\fscy88\\t(0,200,\\fscx100\\fscy100)}'
    return `Dialogue: 0,${st},${en},Cap,,0,0,0,,${fx}${accent(text)}`
  })
  const dots = beats.map((_, i) => {
    const st = t(i * per), en = t(Math.min((i + 1) * per, body))
    const bar = beats.map((_, j) => (j <= i ? '●' : '○')).join(' ')
    return `Dialogue: 0,${st},${en},Dots,,0,0,0,,${bar}`
  })

  // Brand end card: mark, wordmark, then the positioning line — each fading up in sequence.
  const cardStart = t(body), cardEnd = t(dur)
  const endCardEvents = [
    `Dialogue: 1,${cardStart},${cardEnd},EndMark,,0,0,0,,{\\fad(220,160)\\pos(540,806)}»`,
    `Dialogue: 1,${cardStart},${cardEnd},EndWord,,0,0,0,,{\\fad(320,160)\\pos(540,966)}JIFUNZE`,
    `Dialogue: 1,${cardStart},${cardEnd},EndLine,,0,0,0,,{\\fad(460,160)\\pos(540,1074)}${POSITIONING_LINE}`,
  ]

  return `[Script Info]
ScriptType: v4.00+
PlayResX: 1080
PlayResY: 1920
WrapStyle: 0

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, OutlineColour, BackColour, Bold, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Cap,DejaVu Sans,100,&H00FFFFFF,&H00201810,&H90000000,1,5,3,5,96,96,0,1
Style: Brand,DejaVu Sans,40,&H00${BRAND_VIOLET_BGR},&H00201810,&H00000000,1,3,0,7,70,0,90,1
Style: Dots,DejaVu Sans,40,&H80FFFFFF,&H00000000,&H00000000,0,0,0,2,0,0,180,1
Style: EndMark,DejaVu Sans,170,&H00${BRAND_VIOLET_BGR},&H00201810,&H00000000,1,0,0,5,0,0,0,1
Style: EndWord,DejaVu Sans,118,&H00FFFFFF,&H00201810,&H00000000,1,0,0,5,0,0,0,1
Style: EndLine,DejaVu Sans,58,&H00E8E8EE,&H00201810,&H00000000,0,0,0,5,0,0,0,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
Dialogue: 0,0:00:00.00,${t(body)},Brand,,0,0,0,,JIFUNZE
${events.join('\n')}
${dots.join('\n')}
${endCardEvents.join('\n')}
`
}
