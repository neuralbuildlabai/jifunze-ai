/**
 * Regenerates the designed background used by render/providers/designedProvider.ts.
 *
 *   node scripts/generate-brand-bg.mjs
 *
 * Pure Node (zlib only) so the asset is reproducible without adding a dependency.
 * Palette is taken from src/index.css so the video matches the product:
 *   page  #09090b   brand #7c3aed   accent-labs #a855f7   accent-trends #38bdf8
 * Output: render/assets/bg/brand-bg.png (1080x1920, the Reels/Shorts/TikTok frame).
 */
import { deflateSync } from 'node:zlib'
import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const W = 1080, H = 1920
const HERE = dirname(fileURLToPath(import.meta.url))
const OUT = join(HERE, '..', 'render', 'assets', 'bg', 'brand-bg.png')

const hex = (h) => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)]
const BASE = hex('#09090b')
const GLOWS = [
  // [hex, cx, cy, radius, peak opacity]
  ['#7c3aed', 0.74, 0.20, 0.78, 0.55],   // brand violet, top right
  ['#38bdf8', 0.16, 0.74, 0.66, 0.26],   // brand blue, bottom left
  ['#a855f7', 0.34, 0.44, 0.50, 0.16],   // soft violet, mid
]

const px = Buffer.alloc(W * H * 3)
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    let [r, g, b] = BASE
    for (const [h, cx, cy, rad, peak] of GLOWS) {
      const [gr, gg, gb] = hex(h)
      const dx = (x / W - cx), dy = (y / H - cy) * (H / W) * 0.62
      const d = Math.sqrt(dx * dx + dy * dy) / rad
      if (d >= 1) continue
      const a = peak * Math.pow(1 - d, 2.4)          // smooth falloff, no banding edge
      r += (gr - r) * a; g += (gg - g) * a; b += (gb - b) * a
    }
    // very faint diagonal sheen for depth (must read as light, never as a scratch)
    const streak = Math.exp(-Math.pow((y / H - 0.5) - (x / W - 0.5) * 0.55, 2) / 0.02) * 5
    r += streak; g += streak; b += streak * 1.2
    // vignette
    const vx = x / W - 0.5, vy = y / H - 0.5
    const vig = 1 - Math.min(1, (vx * vx * 1.1 + vy * vy * 0.7)) * 0.42
    r *= vig; g *= vig; b *= vig
    // No grain baked in: film grain is added at render time by ffmpeg's noise
    // filter, which keeps this asset ~180 KB instead of ~1.8 MB in git.
    const i = (y * W + x) * 3
    px[i] = Math.max(0, Math.min(255, r))
    px[i + 1] = Math.max(0, Math.min(255, g))
    px[i + 2] = Math.max(0, Math.min(255, b))
  }
}

// --- minimal PNG writer -----------------------------------------------------
const raw = Buffer.alloc(H * (W * 3 + 1))
for (let y = 0; y < H; y++) {
  raw[y * (W * 3 + 1)] = 0                                        // filter: none
  px.copy(raw, y * (W * 3 + 1) + 1, y * W * 3, (y + 1) * W * 3)
}
const crcTable = Array.from({ length: 256 }, (_, n) => {
  let c = n
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
  return c >>> 0
})
const crc32 = (buf) => {
  let c = 0xffffffff
  for (const byte of buf) c = crcTable[(c ^ byte) & 0xff] ^ (c >>> 8)
  return (c ^ 0xffffffff) >>> 0
}
const chunk = (type, data) => {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length)
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data])
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(body))
  return Buffer.concat([len, body, crc])
}
const ihdr = Buffer.alloc(13)
ihdr.writeUInt32BE(W, 0); ihdr.writeUInt32BE(H, 4)
ihdr[8] = 8; ihdr[9] = 2; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0
const png = Buffer.concat([
  Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
  chunk('IHDR', ihdr),
  chunk('IDAT', deflateSync(raw, { level: 9 })),
  chunk('IEND', Buffer.alloc(0)),
])
mkdirSync(dirname(OUT), { recursive: true })
writeFileSync(OUT, png)
console.log(`wrote ${OUT} (${W}x${H}, ${(png.length / 1024).toFixed(0)} KB)`)
