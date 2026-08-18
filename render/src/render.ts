/**
 * Core render: brief + background clip → 1080×1920 MP4 with burned captions and
 * a music bed. No voiceover (captions + music only, per product decision).
 *
 * Usage: node --experimental-strip-types src/render.ts <briefJsonPath> <outMp4>
 * (or compiled). Expects ffmpeg on PATH. Music bed: assets/music/bed.m4a if
 * present, otherwise silent (still valid — captions carry it).
 */
import { spawnSync } from 'node:child_process'
import { mkdtempSync, writeFileSync, existsSync, readFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { ProductionBrief } from './types.ts'
import { buildAss } from './captions.ts'
import { selectVisualProvider } from '../providers/registry.ts'

const HERE = dirname(fileURLToPath(import.meta.url))
const MUSIC = join(HERE, '..', 'assets', 'music', 'bed.m4a')

export async function renderBrief(brief: ProductionBrief, outPath: string): Promise<string> {
  const dur = Math.min(Math.max(brief.duration_sec ?? 20, 8), 60)
  const work = mkdtempSync(join(tmpdir(), 'jf-render-'))

  const bg = await selectVisualProvider().getClip(brief, work)
  const assPath = join(work, 'caps.ass')
  writeFileSync(assPath, buildAss(brief))

  // Scale/crop the background to a full-bleed 1080×1920, loop if shorter than dur,
  // darken slightly for caption contrast, burn subtitles, trim to dur.
  const vf = [
    `scale=1080:1920:force_original_aspect_ratio=increase`,
    `crop=1080:1920`,
    `eq=brightness=-0.06`,
    `subtitles='${assPath.replace(/'/g, "\\'")}'`,
    `format=yuv420p`,
  ].join(',')

  const args = [
    '-y',
    '-stream_loop', '-1', '-i', bg,
  ]
  const hasMusic = existsSync(MUSIC)
  if (hasMusic) args.push('-stream_loop', '-1', '-i', MUSIC)

  args.push(
    '-t', String(dur),
    '-vf', vf,
    '-r', '30',
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '23',
    '-pix_fmt', 'yuv420p',
  )
  if (hasMusic) {
    args.push('-map', '0:v:0', '-map', '1:a:0', '-c:a', 'aac', '-b:a', '128k', '-shortest')
  } else {
    args.push('-map', '0:v:0', '-an')
  }
  args.push(outPath)

  const res = spawnSync('ffmpeg', args, { stdio: 'inherit' })
  if (res.status !== 0) throw new Error('render: ffmpeg failed')
  return outPath
}

// CLI entry
if (import.meta.url === `file://${process.argv[1]}`) {
  const [briefPath, outPath] = process.argv.slice(2)
  if (!briefPath || !outPath) { console.error('usage: render.ts <brief.json> <out.mp4>'); process.exit(1) }
  const brief: ProductionBrief = JSON.parse(readFileSync(briefPath, 'utf8'))
  renderBrief(brief, outPath).then((p) => console.log('rendered', p)).catch((e) => { console.error(e); process.exit(1) })
}
