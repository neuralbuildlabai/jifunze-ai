import type { ProductionBrief } from './types.ts'

/**
 * Kinetic ASS captions: bold white with a brand-accent keyword, a JIFUNZE.AI
 * mark, and progress dots. Far cleaner than plain centered text.
 */
export function buildAss(brief: ProductionBrief): string {
  const dur = Math.min(Math.max(brief.duration_sec ?? 18, 8), 60)
  const beats = [brief.hook, ...brief.segments].filter(Boolean)
  const per = dur / beats.length

  const t = (sec: number) => {
    const m = Math.floor((sec % 3600) / 60)
    const s = (sec % 60).toFixed(2).padStart(5, '0')
    return `0:${String(m).padStart(2, '0')}:${s}`
  }
  const esc = (s: string) => s.replace(/\\/g, '').replace(/[{}]/g, '').toUpperCase()

  // accent the first "significant" word (>4 chars) of each beat, in brand blue.
  const accent = (line: string) => {
    const words = esc(line).split(' ')
    const i = words.findIndex((w) => w.replace(/[^A-Z]/g, '').length > 4)
    if (i < 0) return esc(line)
    words[i] = `{\\c&HDCB978&}${words[i]}{\\c&HFFFFFF&}`
    return words.join(' ')
  }

  const events = beats.map((text, i) => {
    const st = t(i * per), en = t(Math.min((i + 1) * per, dur))
    const fx = '{\\fad(120,120)\\fscx88\\fscy88\\t(0,200,\\fscx100\\fscy100)}'
    return `Dialogue: 0,${st},${en},Cap,,0,0,0,,${fx}${accent(text)}`
  })
  const dots = beats.map((_, i) => {
    const st = t(i * per), en = t(Math.min((i + 1) * per, dur))
    const bar = beats.map((_, j) => (j <= i ? '●' : '○')).join(' ')
    return `Dialogue: 0,${st},${en},Dots,,0,0,0,,${bar}`
  })

  return `[Script Info]
ScriptType: v4.00+
PlayResX: 1080
PlayResY: 1920
WrapStyle: 0

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, OutlineColour, BackColour, Bold, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Cap,DejaVu Sans,100,&H00FFFFFF,&H00201810,&H90000000,1,5,3,5,96,96,0,1
Style: Brand,DejaVu Sans,40,&H00DCB978,&H00201810,&H00000000,1,3,0,7,70,0,90,1
Style: Dots,DejaVu Sans,40,&H80FFFFFF,&H00000000,&H00000000,0,0,0,2,0,0,180,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
Dialogue: 0,0:00:00.00,${t(dur)},Brand,,0,0,0,,JIFUNZE.AI
${events.join('\n')}
${dots.join('\n')}
`
}
