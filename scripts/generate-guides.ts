/**
 * Regenerates src/social/guides.ts from the approved evergreen content bank.
 *   npx tsx scripts/generate-guides.ts > src/social/guides.ts
 * Run this after editing orchestrator/contentBank.ts; scripts/test-social-ops.ts fails on drift.
 */
import { CONTENT_BANK } from '../orchestrator/contentBank.ts'

const slug = (id: string) => id.replace(/_/g, '-')

const esc = (s: string) => s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")

const rows = CONTENT_BANK.map((t) => {
  const steps = t.script.segments.map((s) => `      '${esc(s)}',`).join('\n')
  const tags = t.tags.map((s) => `'${esc(s)}'`).join(', ')
  return `  {
    id: '${t.id}',
    slug: '${slug(t.id)}',
    pillar: '${t.pillar}',
    title: '${esc(t.script.hook)}',
    summary: '${esc(t.script.caption)}',
    steps: [
${steps}
    ],
    tags: [${tags}],
  },`
}).join('\n')

const header = `/**
 * The evergreen guide library — Jifunze.ai's own written content, published on this website.
 *
 * These are the same approved, hand-written lessons the content engine draws from
 * (\`orchestrator/contentBank.ts\`). They are published here as readable text so the content hub
 * does not depend on fragile third-party embeds and so every lesson has an accessible,
 * indexable home that outlives any single platform post.
 *
 * GENERATED from \`orchestrator/contentBank.ts\` — the ids are identical, and
 * \`scripts/test-social-ops.ts\` fails if the two drift apart. Edit the content bank, then
 * regenerate; do not hand-edit the records below.
 *
 * No metrics, partnerships, accreditations, certificates or outcomes are claimed anywhere here.
 */
import type { PillarId } from './pillars.ts'

export type Guide = {
  /** Internal content id — matches the evergreen topic id in the content engine. */
  id: string
  /** URL segment under /content/. */
  slug: string
  pillar: PillarId
  /** Short, concrete title. */
  title: string
  /** One-sentence summary. Also the meta description for the detail page. */
  summary: string
  /** The lesson itself, as ordered steps. This is the accessible full text. */
  steps: readonly string[]
  tags: readonly string[]
}

/** The date this library was authored into the site. Not a per-item publication claim. */
export const GUIDE_LIBRARY_DATE = '2026-08-20'

export const GUIDES: readonly Guide[] = [
`

const footer = `] as const

const BY_SLUG = new Map<string, Guide>(GUIDES.map((g) => [g.slug, g]))

export function guideBySlug(slug: string | undefined): Guide | undefined {
  if (!slug) return undefined
  return BY_SLUG.get(slug)
}

export function guidesForPillar(pillar: PillarId): Guide[] {
  return GUIDES.filter((g) => g.pillar === pillar)
}

/** Related guides: same pillar first, then shared tags, never the guide itself. */
export function relatedGuides(guide: Guide, limit = 3): Guide[] {
  const samePillar = GUIDES.filter((g) => g.id !== guide.id && g.pillar === guide.pillar)
  const sharedTag = GUIDES.filter(
    (g) => g.id !== guide.id && g.pillar !== guide.pillar && g.tags.some((t) => guide.tags.includes(t)),
  )
  return [...samePillar, ...sharedTag].slice(0, limit)
}
`

process.stdout.write(header + rows + '\n' + footer)
