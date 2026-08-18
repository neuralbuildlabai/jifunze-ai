import type { ProductionBrief } from './types.ts'

/**
 * Build an ASS subtitle file that shows the hook, then each segment in sequence,
 * as large centered captions. ASS gives us clean styling + timing without a
 * heavier renderer. White text, thick black outline — readable over any clip.
 */
export function buildAss(brief: ProductionBrief): string {
  const dur = Math.min(Math.max(brief.duration_sec ?? 20, 8), 60)
  const beats = [brief.hook, ...brief.segments].filter(Boolean)
  const per = dur / beats.length

  const escape = (s: string) =>
    s.replace(/\\/g, '\\\\').replace(/\{/g, '(').replace(/\}/g, ')').replace(/\n/g, '\\N').toUpperCase()

  const t = (sec: number) => {
    const h = Math.floor(sec / 3600)
    const m = Math.floor((sec % 3600) / 60)
    const s = (sec % 60).toFixed(2).padStart(5, '0')
    return `${h}:${String(m).padStart(2, '0')}:${s}`
  }

  const events = beats.map((text, i) => {
    const start = t(i * per)
    const end = t(Math.min((i + 1) * per, dur))
    // fade in/out, pop-scale for energy
    const fx = '{\\fad(150,150)\\fscx90\\fscy90\\t(0,180,\\fscx100\\fscy100)}'
    return `Dialogue: 0,${start},${end},Caption,,0,0,0,,${fx}${escape(text)}`
  }).join('\n')

  return `[Script Info]
ScriptType: v4.00+
PlayResX: 1080
PlayResY: 1920
WrapStyle: 0

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, OutlineColour, BackColour, Bold, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Caption,DejaVu Sans,84,&H00FFFFFF,&H00000000,&H90000000,1,5,2,5,110,110,0,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
${events}
`
}
