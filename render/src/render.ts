/**
 * Core render: brief + background clip → 1080×1920 MP4 with the Jifunze.ai
 * treatment burned in — brand wordmark, kinetic captions with keyword
 * highlighting, a progress bar, and a branded end card. No voiceover (captions
 * + music only, per product decision).
 *
 * Usage: tsx render/src/render.ts <briefJsonPath> <outMp4>
 * Expects ffmpeg on PATH. Music bed: assets/music/bed.m4a if present, otherwise
 * silent (still valid — captions carry it).
 */
import { spawnSync } from 'node:child_process'
import { mkdtempSync, writeFileSync, existsSync, readFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { ProductionBrief } from './types.ts'
import { buildAss, END_CARD_SEC } from './captions.ts'
import { selectVisualProvider } from '../providers/registry.ts'

const HERE = dirname(fileURLToPath(import.meta.url))
const MUSIC = join(HERE, '..', 'assets', 'music', 'bed.m4a')
/** Corner mark: icon + wordmark, no tagline (illegible at 300px). */
const MARK = join(HERE, '..', 'assets', 'brand', 'jifunze-mark.png')
/** End card: full lockup including the tagline. */
const WORDMARK = join(HERE, '..', 'assets', 'brand', 'jifunze-wordmark.png')

/**
 * Brand fonts, shipped in the repo. Passed to libass via fontsdir so the render
 * uses Plus Jakarta Sans deterministically instead of whatever the host happens
 * to have installed (which is how DejaVu Sans crept into every frame).
 */
const BRAND_FONTS = join(HERE, '..', '..', 'brand', 'fonts')

/** ffmpeg needs the subtitle path escaped for the filtergraph parser. */
const escapeForFilter = (p: string): string => p.replace(/\\/g, '/').replace(/:/g, '\\:').replace(/'/g, "\\'")

export async function renderBrief(brief: ProductionBrief, outPath: string): Promise<string> {
  const dur = Math.min(Math.max(brief.duration_sec ?? 20, 8), 60)
  const endCard = Math.min(END_CARD_SEC, dur / 3)
  const bodyEnd = (dur - endCard).toFixed(2)
  const work = mkdtempSync(join(tmpdir(), 'jf-render-'))

  const provider = selectVisualProvider()
  const bg = await provider.getClip(brief, work)
  const assPath = join(work, 'caps.ass')
  writeFileSync(assPath, buildAss(brief))

  const hasMark = existsSync(MARK) && existsSync(WORDMARK)
  const hasMusic = existsSync(MUSIC)
  if (!hasMark) console.warn(`[render] brand art missing (${MARK} / ${WORDMARK}) — rendering without the brand mark and end-card logo.`)

  const args: string[] = ['-y', '-stream_loop', '-1', '-i', bg]
  if (hasMark) args.push('-loop', '1', '-i', MARK, '-loop', '1', '-i', WORDMARK)
  if (hasMusic) args.push('-stream_loop', '-1', '-i', MUSIC)

  // base: full-bleed 1080x1920, slightly darkened so white captions always win
  const chain: string[] = [
    `[0:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,eq=brightness=-0.06:saturation=1.05[base]`,
  ]
  let last = 'base'

  if (hasMark) {
    chain.push(`[1:v]scale=320:-1,format=rgba,colorchannelmixer=aa=0.92[mark]`)
    chain.push(`[2:v]scale=700:-1,format=rgba[bigmark]`)
    // brand mark rides the whole body, then hands over to the end card
    chain.push(`[${last}][mark]overlay=x=72:y=200:enable='lt(t,${bodyEnd})'[withmark]`)
    last = 'withmark'
  }

  // end card: dim the frame, drop the big wordmark in the middle (the CTA line
  // under it is drawn by the subtitle track).
  chain.push(`[${last}]drawbox=x=0:y=0:w=iw:h=ih:color=0x09090B@0.82:t=fill:enable='gte(t,${bodyEnd})'[dim]`)
  last = 'dim'
  if (hasMark) {
    chain.push(`[${last}][bigmark]overlay=x=(W-w)/2:y=(H-h)/2-140:enable='gte(t,${bodyEnd})'[ended]`)
    last = 'ended'
  }

  const hasBrandFonts = existsSync(BRAND_FONTS)
  if (!hasBrandFonts) console.warn(`[render] brand fonts missing (${BRAND_FONTS}) — captions will fall back to a system font and will NOT be on-brand.`)
  const fontsdir = hasBrandFonts ? `:fontsdir='${escapeForFilter(BRAND_FONTS)}'` : ''
  chain.push(`[${last}]subtitles='${escapeForFilter(assPath)}'${fontsdir},format=yuv420p[vout]`)

  args.push('-filter_complex', chain.join(';'), '-map', '[vout]')
  args.push('-t', String(dur), '-r', '30', '-c:v', 'libx264', '-preset', 'medium', '-crf', '21', '-pix_fmt', 'yuv420p', '-movflags', '+faststart')

  if (hasMusic) {
    const musicIdx = hasMark ? 3 : 1
    args.push('-map', `${musicIdx}:a:0`, '-c:a', 'aac', '-b:a', '128k')
  } else {
    args.push('-an')
  }
  args.push(outPath)

  const res = spawnSync('ffmpeg', args, { stdio: 'inherit' })
  if (res.status !== 0) throw new Error(`render: ffmpeg failed (provider=${provider.id})`)
  console.log(`[render] ${outPath} — provider=${provider.id} ${dur}s 1080x1920`)
  return outPath
}

/** Grab a still for quick visual inspection without downloading the video. */
export function grabFrame(videoPath: string, atSec: number, outPng: string): string | null {
  const res = spawnSync('ffmpeg', ['-y', '-ss', String(atSec), '-i', videoPath, '-frames:v', '1', '-q:v', '2', outPng], { stdio: 'ignore' })
  return res.status === 0 ? outPng : null
}

// CLI entry
if (import.meta.url === `file://${process.argv[1]}`) {
  const [briefPath, outPath] = process.argv.slice(2)
  if (!briefPath || !outPath) { console.error('usage: render.ts <brief.json> <out.mp4>'); process.exit(1) }
  const brief: ProductionBrief = JSON.parse(readFileSync(briefPath, 'utf8'))
  renderBrief(brief, outPath).then((p) => console.log('rendered', p)).catch((e) => { console.error(e); process.exit(1) })
}
