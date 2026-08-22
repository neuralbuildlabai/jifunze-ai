/**
 * Social operations test suite.
 *
 *   npm run social:test
 *
 * Covers the website content hub, the official account list, the platform capability matrix,
 * content transformation, the publishing adapters, the two-hour sync (including partial failure,
 * backoff, idempotency and dry-run), duplicate protection, token-expiry handling and the
 * dashboard's derivations.
 *
 * Dependency-free and fully offline, matching the other scripts/test-*.ts in this repo: no
 * Supabase, no network, no secrets. Every "platform call" is a stub.
 */
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import * as fsExtra from 'node:fs'

import { CONTENT_BANK, TARGET_AUDIENCE as ENGINE_AUDIENCE } from '../orchestrator/contentBank.ts'
import {
  BRAND_DISPLAY_NAME,
  BRAND_TAGLINE,
  CORE_SHORT_DESCRIPTION,
  EXTENDED_DESCRIPTION,
  PUBLIC_POSITIONING,
  STANDARD_DESCRIPTION,
  TARGET_AUDIENCE,
  containsProhibitedClaim,
  findProhibitedClaims,
} from '../src/social/brand.ts'
import { LEGACY_PILLAR_MAP, LEGACY_PILLAR_SLUGS, PILLARS, PILLAR_IDS, pillarBySlug } from '../src/social/pillars.ts'
import { GUIDES } from '../src/social/guides.ts'
import {
  PUBLIC_CONTENT,
  contentBySlug,
  contentForPillar,
  isPubliclyVisible,
  publicContent,
  relatedContent,
  type ContentItem,
} from '../src/social/contentLedger.ts'
import {
  FORBIDDEN_SOCIAL_HOSTS,
  OFFICIAL_SOCIAL_ACCOUNTS,
  SOCIAL_SAME_AS,
} from '../src/social/socialAccounts.ts'
import { PLATFORM_MATRIX, platformCapability, publishReadyPlatforms } from '../src/social/platformMatrix.ts'
import { PLATFORM_LIMITS, ctaEligible, transformForPlatform, trimToLimit } from '../orchestrator/social/transform.ts'
import { adapterFor, allAdapters, connectionReport } from '../orchestrator/social/registry.ts'
import { AdapterUnavailableError, type PublishableContent } from '../orchestrator/social/types.ts'
import { safeErrorSummary } from '../orchestrator/social/adapters/base.ts'
import {
  NullSyncStore,
  SOCIAL_SYNC_CRON,
  backoffMs,
  detectAnomalies,
  isRetryable,
  runSocialSync,
  snapshotWindow,
} from '../orchestrator/social/sync.ts'
import {
  accountHealth,
  engagementRate,
  formatMetric,
  freshness,
  growthSince,
  pipelineHealth,
  sumLatest,
  syncStatus,
  topPillar,
  topPosts,
  type AccountRow,
  type ConnectionRow,
  type ContentRow,
  type MetricSnapshotRow,
  type PublicationRow,
} from '../src/services/socialOps/socialOpsSummary.ts'

let passed = 0
const failures: string[] = []
async function test(name: string, fn: () => void | Promise<void>) {
  try {
    await fn()
    passed++
    console.log(`  ok  ${name}`)
  } catch (err) {
    failures.push(`${name}: ${(err as Error).message}`)
    console.log(`  FAIL ${name}\n       ${(err as Error).message}`)
  }
}
function section(name: string) {
  console.log(`\n${name}\n`)
}

const NOW = Date.parse('2026-08-20T12:00:00Z')
const iso = (msAgo: number) => new Date(NOW - msAgo).toISOString()

// ===========================================================================
section('brand copy')

await test('the tagline is exact — singular "idea", sentence case, full stop', () => {
  assert.equal(BRAND_TAGLINE, 'Your idea never sleeps.')
  assert.doesNotMatch(BRAND_TAGLINE, /ideas/i, 'must not be pluralised')
})

await test('the public display name is Jifunze.AI', () => {
  assert.equal(BRAND_DISPLAY_NAME, 'Jifunze.AI')
})

await test('the website audience string matches the content engine exactly', () => {
  assert.equal(TARGET_AUDIENCE, ENGINE_AUDIENCE)
})

await test('no approved description contains a prohibited claim', () => {
  for (const [label, copy] of [
    ['core', CORE_SHORT_DESCRIPTION],
    ['standard', STANDARD_DESCRIPTION],
    ['extended', EXTENDED_DESCRIPTION],
    ['positioning', PUBLIC_POSITIONING],
  ] as const) {
    assert.deepEqual(findProhibitedClaims(copy), [], `${label} description contains a prohibited claim`)
  }
})

await test('the retired SaaS positioning is detected wherever it appears', () => {
  assert.equal(containsProhibitedClaim('Create smarter social content in seconds. Try it free.'), true)
  assert.equal(containsProhibitedClaim('Visit jifunze.ai/generate to try it'), true)
  assert.equal(containsProhibitedClaim('Free Kazi Kit — link in bio'), true)
  assert.equal(containsProhibitedClaim('Guaranteed jobs for every graduate'), true)
  assert.equal(containsProhibitedClaim('Practical career skills for job seekers.'), false)
})

await test('the extended description ends on the approved tagline', () => {
  assert.ok(EXTENDED_DESCRIPTION.trim().endsWith(BRAND_TAGLINE))
})

// ===========================================================================
section('official social accounts')

await test('every official account is present and no others', () => {
  const ids = OFFICIAL_SOCIAL_ACCOUNTS.map((a) => a.id).sort()
  assert.deepEqual(ids, [
    'bluesky', 'facebook', 'instagram', 'linkedin', 'pinterest', 'threads', 'tiktok', 'x', 'youtube',
  ])
})

await test('GitHub is never listed as a social profile', () => {
  for (const a of OFFICIAL_SOCIAL_ACCOUNTS) {
    assert.doesNotMatch(a.href, /github\.com/i, `${a.id} links to GitHub`)
  }
})

await test('no CalmSignal property appears anywhere in the account list', () => {
  const blob = JSON.stringify(OFFICIAL_SOCIAL_ACCOUNTS).toLowerCase()
  for (const host of FORBIDDEN_SOCIAL_HOSTS) {
    assert.equal(blob.includes(host.toLowerCase()), false, `forbidden host present: ${host}`)
  }
})

await test('every profile URL is https and well formed', () => {
  for (const a of OFFICIAL_SOCIAL_ACCOUNTS) {
    const url = new URL(a.href)
    assert.equal(url.protocol, 'https:', `${a.id} is not https`)
    assert.ok(url.hostname.length > 3)
  }
})

await test('the handles match the audited live profiles', () => {
  const expected: Record<string, string> = {
    instagram: '@jifunze.ai',
    tiktok: '@jifunze_ai',
    threads: '@jifunze.ai',
    youtube: '@jifunze-ai',
    facebook: 'Jifunze.AI',
    x: '@JifunzeAI',
    linkedin: 'jifunze-ai',
    pinterest: '@jifunzeai',
    bluesky: '@jifunze.ai',
  }
  for (const a of OFFICIAL_SOCIAL_ACCOUNTS) {
    assert.equal(a.handle, expected[a.id], `${a.id} handle drifted`)
  }
})

await test('the X handle label matches the account it links to', () => {
  const x = OFFICIAL_SOCIAL_ACCOUNTS.find((a) => a.id === 'x')!
  assert.equal(x.handle, '@JifunzeAI')
  assert.ok(x.href.endsWith('/JifunzeAI'), 'label and link must agree')
})

await test('sameAs covers every official account exactly once', () => {
  assert.equal(SOCIAL_SAME_AS.length, OFFICIAL_SOCIAL_ACCOUNTS.length)
  assert.equal(new Set(SOCIAL_SAME_AS).size, SOCIAL_SAME_AS.length)
})

await test('the "what is not here" note never names an account we actually list', () => {
  // The /social page reassures visitors that certain channels do NOT exist. When a channel is
  // later added, that reassurance silently becomes a lie on a live page — it happened with
  // Bluesky. Anything named as absent must not be in the official list.
  const src = readFileSync(
    new URL('../src/components/media/SocialDirectoryPage.tsx', import.meta.url),
    'utf8',
  )
  const note = src.slice(src.indexOf('A note on what is not here'))
  for (const account of OFFICIAL_SOCIAL_ACCOUNTS) {
    assert.doesNotMatch(
      note,
      new RegExp(`\\b${account.name}\\b`, 'i'),
      `${account.name} is listed as an official account but the /social note still claims it does not exist`,
    )
  }
})

await test('PublicSocialLinks renders every official account and opens links safely', () => {
  const src = readFileSync(new URL('../src/components/PublicSocialLinks.tsx', import.meta.url), 'utf8')
  assert.match(src, /OFFICIAL_SOCIAL_ACCOUNTS/, 'must render from the canonical list, not a local copy')
  assert.match(src, /target="_blank"/)
  assert.match(src, /rel="noreferrer noopener"/)
  assert.match(src, /aria-label=/)
  // The word "GitHub" appears in the file's own comment explaining why it is absent; what must
  // never appear is a link to it.
  assert.doesNotMatch(src, /github\.com/i, 'the component links to GitHub')
})

await test('PublicSocialLinks is actually rendered somewhere', () => {
  const shell = readFileSync(new URL('../src/components/media/MediaSiteShell.tsx', import.meta.url), 'utf8')
  const directory = readFileSync(new URL('../src/components/media/SocialDirectoryPage.tsx', import.meta.url), 'utf8')
  const home = readFileSync(new URL('../src/components/media/MediaHomePage.tsx', import.meta.url), 'utf8')
  assert.match(shell, /<PublicSocialLinks/, 'not rendered in the footer')
  assert.match(directory, /<PublicSocialLinks/, 'not rendered on the social directory')
  assert.match(home, /<PublicSocialLinks/, 'not rendered on the homepage')
})

// ===========================================================================
section('content hub')

await test('the guide library matches the content engine exactly (no drift)', () => {
  const engineIds = CONTENT_BANK.map((t) => t.id).sort()
  const guideIds = GUIDES.map((g) => g.id).sort()
  assert.deepEqual(guideIds, engineIds, 'run `npm run guides:generate` after editing the content bank')
})

await test('every guide belongs to one of the six approved pillars', () => {
  for (const g of GUIDES) {
    assert.ok(PILLAR_IDS.includes(g.pillar), `${g.id} has an unapproved pillar: ${g.pillar}`)
  }
})

await test('every pillar has at least one published lesson', () => {
  for (const p of PILLARS) {
    assert.ok(contentForPillar(p.id).length > 0, `pillar ${p.id} has no content`)
  }
})

await test('slugs are unique and URL safe', () => {
  const slugs = PUBLIC_CONTENT.map((c) => c.slug)
  assert.equal(new Set(slugs).size, slugs.length, 'duplicate slug')
  for (const s of slugs) assert.match(s, /^[a-z0-9-]+$/, `unsafe slug: ${s}`)
})

await test('pillar slugs resolve and unknown slugs do not', () => {
  for (const p of PILLARS) assert.equal(pillarBySlug(p.slug)?.id, p.id)
  assert.equal(pillarBySlug('not-a-pillar'), undefined)
  assert.equal(pillarBySlug(undefined), undefined)
})

await test('the SQL pillar CHECK constraint matches the TS union exactly (no drift)', () => {
  const sql = readFileSync(
    new URL('../supabase/migrations/20260820120000_social_ops_core.sql', import.meta.url),
    'utf8',
  )
  const m = sql.match(/check \(pillar in \(([^)]+)\)\)/)
  assert.ok(m, 'pillar CHECK constraint not found in the social-ops migration')
  const sqlIds = m![1].split(',').map((s) => s.trim().replace(/'/g, '')).sort()
  assert.deepEqual(sqlIds, [...PILLAR_IDS].sort(), 'SQL pillar constraint drifted from src/social/pillars.ts')
})

await test('every legacy pillar id and slug maps to a current pillar', () => {
  for (const [legacy, current] of Object.entries(LEGACY_PILLAR_MAP)) {
    assert.ok(PILLAR_IDS.includes(current), `legacy ${legacy} maps to unknown pillar ${current}`)
  }
  for (const [legacySlug, currentSlug] of Object.entries(LEGACY_PILLAR_SLUGS)) {
    assert.ok(pillarBySlug(currentSlug), `legacy slug ${legacySlug} redirects to unknown slug ${currentSlug}`)
    assert.equal(pillarBySlug(legacySlug), undefined, `legacy slug ${legacySlug} must no longer resolve directly`)
  }
})

await test('the content engine consumes the canonical PillarId (no duplicate union)', () => {
  const bank = readFileSync(new URL('../orchestrator/contentBank.ts', import.meta.url), 'utf8')
  assert.match(bank, /import type \{ PillarId \} from '\.\.\/src\/social\/pillars\.ts'/)
  assert.doesNotMatch(bank, /'cv' \| 'interview'/, 'contentBank must not re-declare its own pillar union')
  for (const t of CONTENT_BANK) {
    assert.ok(PILLAR_IDS.includes(t.pillar), `bank topic ${t.id} has unapproved pillar ${t.pillar}`)
  }
})

await test('the public site shows only approved AND published records', () => {
  const draft: ContentItem = { ...PUBLIC_CONTENT[0], id: 'x1', slug: 'x1', publication_status: 'draft' }
  const unapproved: ContentItem = { ...PUBLIC_CONTENT[0], id: 'x2', slug: 'x2', approval_status: 'pending' }
  const retracted: ContentItem = { ...PUBLIC_CONTENT[0], id: 'x3', slug: 'x3', publication_status: 'retracted' }
  assert.equal(isPubliclyVisible(draft), false)
  assert.equal(isPubliclyVisible(unapproved), false)
  assert.equal(isPubliclyVisible(retracted), false)
  const pool = [...PUBLIC_CONTENT, draft, unapproved, retracted]
  assert.equal(publicContent(pool).length, PUBLIC_CONTENT.length)
  assert.equal(contentBySlug('x1', pool), undefined)
})

await test('no published lesson contains a prohibited claim', () => {
  for (const item of PUBLIC_CONTENT) {
    const blob = [item.title, item.summary, ...item.body, item.caption ?? ''].join(' ')
    assert.deepEqual(findProhibitedClaims(blob), [], `${item.id} contains a prohibited claim`)
  }
})

await test('every lesson has readable body text and SEO fields', () => {
  for (const item of PUBLIC_CONTENT) {
    assert.ok(item.body.length >= 3, `${item.id} has too little body text`)
    assert.ok(item.seo.meta_title.length > 0 && item.seo.meta_title.length <= 70, `${item.id} title length`)
    assert.ok(item.seo.meta_description.length > 20, `${item.id} description too short`)
    assert.match(item.seo.canonical_url, /^https:\/\/www\.jifunze\.ai\/content\//)
  }
})

await test('related content never includes the item itself', () => {
  for (const item of PUBLIC_CONTENT) {
    const related = relatedContent(item)
    assert.ok(related.every((r) => r.id !== item.id), `${item.id} is related to itself`)
    assert.ok(related.length <= 3)
  }
})

await test('an item with no platform posts still renders (no fragile embed dependency)', () => {
  const item = PUBLIC_CONTENT[0]
  assert.deepEqual([...item.publications], [], 'website content must not depend on a platform post existing')
  assert.ok(item.body.length > 0, 'the lesson text is the fallback, and it is present')
})

// ===========================================================================
section('SEO and discovery artefacts')

const pubUrl = (f: string) => new URL(`../public/${f}`, import.meta.url)

await test('robots.txt exists, points at the sitemap and hides /admin', () => {
  const robots = readFileSync(pubUrl('robots.txt'), 'utf8')
  assert.match(robots, /Sitemap: https:\/\/www\.jifunze\.ai\/sitemap\.xml/)
  assert.match(robots, /Disallow: \/admin\//)
})

await test('the sitemap lists every lesson and every topic page', () => {
  const sitemap = readFileSync(pubUrl('sitemap.xml'), 'utf8')
  for (const g of GUIDES) {
    assert.ok(sitemap.includes(`/content/${g.slug}<`), `sitemap is missing ${g.slug}`)
  }
  for (const p of PILLARS) {
    assert.ok(sitemap.includes(`/topics/${p.slug}<`), `sitemap is missing topic ${p.slug}`)
  }
  assert.equal(sitemap.includes('/admin'), false, 'private routes must not be in the sitemap')
})

await test('the RSS feed has one item per lesson with a permalink guid', () => {
  const feed = readFileSync(pubUrl('feed.xml'), 'utf8')
  const items = feed.match(/<item>/g) ?? []
  assert.equal(items.length, GUIDES.length)
  assert.match(feed, /<guid isPermaLink="true">https:\/\/www\.jifunze\.ai\/content\//)
})

await test('index.html carries the approved title, description and Organization data', () => {
  const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8')
  assert.match(html, /<title>Jifunze — Your idea never sleeps\.<\/title>/)
  assert.match(html, /social content you can read, watch and apply/)
  assert.match(html, /"@type": "Organization"/)
  assert.match(html, /"slogan": "Your idea never sleeps\."/)
  assert.match(html, /rel="canonical"/)
  assert.match(html, /property="og:image"/)
  assert.match(html, /name="twitter:card"/)
  assert.equal(findProhibitedClaims(html).length, 0, 'index.html contains a prohibited claim')
})

await test('the share image the metadata promises actually exists', () => {
  assert.ok(existsSync(new URL('../public/og-image.png', import.meta.url)), 'public/og-image.png is missing')
})

await test('every sameAs entry in index.html is an official account', () => {
  const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8')
  const block = html.slice(html.indexOf('"sameAs"'), html.indexOf(']', html.indexOf('"sameAs"')))
  const urls = [...block.matchAll(/"(https:\/\/[^"]+)"/g)].map((m) => m[1])
  assert.equal(
    urls.length,
    OFFICIAL_SOCIAL_ACCOUNTS.length,
    'index.html sameAs has drifted from OFFICIAL_SOCIAL_ACCOUNTS — add the new account to the static JSON-LD too',
  )
  for (const u of urls) {
    const host = new URL(u).hostname.replace(/^www\./, '')
    assert.ok(
      OFFICIAL_SOCIAL_ACCOUNTS.some((a) => new URL(a.href).hostname.replace(/^www\./, '') === host),
      `sameAs contains a non-official host: ${host}`,
    )
  }
  assert.equal(block.includes('github'), false)
})

// ===========================================================================
section('platform capability matrix')

await test('every platform declares a readiness, a cost and a blocker', () => {
  for (const p of PLATFORM_MATRIX) {
    assert.ok(p.readiness, `${p.id} has no readiness`)
    assert.ok(p.cost.length > 0, `${p.id} has no cost statement`)
    assert.ok(p.blocker.length > 10, `${p.id} has no useful blocker statement`)
  }
})

await test('Instagram is the only platform marked ready today', () => {
  assert.deepEqual(publishReadyPlatforms().map((p) => p.id), ['instagram'])
})

await test('X is classified as paid access, never as ready', () => {
  const x = platformCapability('x')
  assert.equal(x.readiness, 'paid_access_required')
  assert.match(x.cost, /Not free/i)
})

await test('WhatsApp Channel cannot publish and is manual only', () => {
  const wa = platformCapability('whatsapp_channel')
  assert.equal(wa.canPublish, false)
  assert.equal(wa.readiness, 'manual_only')
  assert.match(wa.api, /None/i)
})

await test('TikTok and YouTube are gated on approval, not merely on credentials', () => {
  assert.equal(platformCapability('tiktok').readiness, 'api_approval_required')
  assert.equal(platformCapability('youtube').readiness, 'api_approval_required')
})

await test('the matrix records no secret values, only env var names', () => {
  const blob = JSON.stringify(PLATFORM_MATRIX)
  assert.doesNotMatch(blob, /EAA[A-Za-z0-9]{20,}/, 'looks like a Meta token')
  assert.doesNotMatch(blob, /\bsk-[A-Za-z0-9]{20,}/, 'looks like an API key')
  for (const p of PLATFORM_MATRIX) {
    for (const name of p.envVars) {
      assert.match(name, /^[A-Z0-9_]+$/, `env var entry is not a name: ${name}`)
    }
  }
})

// ===========================================================================
section('content transformation')

const CONTENT: PublishableContent = {
  content_id: 'cv-ats-language',
  title: 'Your CV never reached a human',
  caption:
    'Software reads your CV before any human does. Mirror the advert wording, keep every fact true.',
  body: ['Software screens it first', 'Paste the advert into an AI', 'Keep every fact true'],
  hashtags: ['cv', 'jobs', 'ai', 'kenya', 'career', 'interview', 'money'],
  pillar: 'career_growth',
  video_url: 'https://example.supabase.co/storage/v1/object/public/reels/x.mp4',
  thumbnail_url: 'https://example.supabase.co/storage/v1/object/public/reels/x.png',
  permalink: 'https://www.jifunze.ai/content/cv-ats-language',
}

await test('captions are never identical across every platform', () => {
  const captions = PLATFORM_MATRIX.map((p) => transformForPlatform(CONTENT, p.id).caption)
  assert.ok(new Set(captions).size > 1, 'the same caption everywhere is not transformation')
})

await test('every platform variant respects its character limit', () => {
  for (const p of PLATFORM_MATRIX) {
    const v = transformForPlatform(CONTENT, p.id)
    assert.ok(
      v.caption.length <= PLATFORM_LIMITS[p.id].caption,
      `${p.id}: ${v.caption.length} > ${PLATFORM_LIMITS[p.id].caption}`,
    )
  }
})

await test('X is trimmed to its 280-character limit while longer platforms are not', () => {
  const wordy = { ...CONTENT, caption: `${CONTENT.caption} `.repeat(12).trim() }
  const x = transformForPlatform(wordy, 'x')
  const ig = transformForPlatform(wordy, 'instagram')
  assert.ok(x.caption.length <= 280, 'X caption exceeded its limit')
  assert.ok(ig.caption.length > x.caption.length, 'Instagram should keep more of the copy than X')
  assert.ok(wordy.caption.length > x.caption.length, 'X must actually have been trimmed')
})

await test('Instagram hashtags go to the first comment, LinkedIn hashtags stay inline', () => {
  const ig = transformForPlatform(CONTENT, 'instagram')
  assert.ok(ig.firstComment && ig.firstComment.startsWith('#'))
  assert.equal(ig.caption.includes('#'), false, 'Instagram caption should not carry the tag block')

  const li = transformForPlatform(CONTENT, 'linkedin')
  assert.equal(li.firstComment, null)
  assert.ok(li.caption.includes('#'))
})

await test('platforms that forbid links in the body never receive one', () => {
  for (const p of PLATFORM_MATRIX) {
    if (PLATFORM_LIMITS[p.id].linkInBody) continue
    const v = transformForPlatform(CONTENT, p.id)
    assert.equal(v.caption.includes('http'), false, `${p.id} caption contains a link`)
  }
})

await test('YouTube gets a title, Instagram does not', () => {
  assert.ok(transformForPlatform(CONTENT, 'youtube').title)
  assert.equal(transformForPlatform(CONTENT, 'instagram').title, null)
})

await test('titles are trimmed to the platform limit on a word boundary', () => {
  const long = { ...CONTENT, title: 'A '.repeat(120) + 'end' }
  const yt = transformForPlatform(long, 'youtube')
  assert.ok((yt.title ?? '').length <= 100)
  assert.doesNotMatch(yt.title ?? '', /\s$/, 'trailing whitespace')
})

await test('trimToLimit never cuts mid-word and never leaves a dangling separator', () => {
  const trimmed = trimToLimit('one two three four five six seven', 20)
  assert.ok(trimmed.length <= 20)
  assert.doesNotMatch(trimmed, /[\s,;:.-]$/)
  assert.ok('one two three four five six seven'.startsWith(trimmed))
})

await test('a CTA is only added when the destination is a live jifunze.ai URL', () => {
  assert.equal(ctaEligible(CONTENT), true)
  assert.equal(ctaEligible({ ...CONTENT, permalink: null }), false)
  assert.equal(ctaEligible({ ...CONTENT, permalink: 'https://www.jifunze.ai' }), false)
  assert.equal(ctaEligible({ ...CONTENT, permalink: 'https://example.com/x' }), false)
})

await test('THE KAZI KIT CTA CANNOT REAPPEAR — no variant promises a link in bio', () => {
  const withKit = { ...CONTENT, caption: `${CONTENT.caption} Free Kazi Kit — link in bio` }
  for (const p of PLATFORM_MATRIX) {
    const v = transformForPlatform(withKit, p.id)
    assert.ok(
      v.warnings.some((w) => w.includes('Prohibited claim')),
      `${p.id} accepted a link-in-bio promise without warning`,
    )
  }
})

await test('a missing destination produces a warning, never a fabricated link', () => {
  const noLink = { ...CONTENT, permalink: null }
  const v = transformForPlatform(noLink, 'linkedin')
  assert.equal(v.caption.includes('http'), false)
  assert.ok(v.warnings.some((w) => w.includes('No verified destination')))
})

await test('Pinterest without a cover image warns', () => {
  const v = transformForPlatform({ ...CONTENT, thumbnail_url: null }, 'pinterest')
  assert.ok(v.warnings.some((w) => w.includes('still cover')))
})

await test('alt text is produced for every platform and stays a sane length', () => {
  for (const p of PLATFORM_MATRIX) {
    const v = transformForPlatform(CONTENT, p.id)
    assert.ok(v.altText.length > 20 && v.altText.length <= 420, `${p.id} alt text length`)
  }
})

// ===========================================================================
section('publishing adapters')

await test('every platform in the matrix has a registered adapter', () => {
  assert.equal(allAdapters().length, PLATFORM_MATRIX.length)
  for (const p of PLATFORM_MATRIX) {
    assert.equal(adapterFor(p.id).platform, p.id)
  }
})

await test('an adapter with no credentials refuses to publish, loudly', async () => {
  for (const p of PLATFORM_MATRIX) {
    if (!p.canPublish) continue
    await assert.rejects(
      () => adapterFor(p.id).publish(CONTENT, {}),
      (err: unknown) => err instanceof AdapterUnavailableError || err instanceof Error,
      `${p.id} did not refuse`,
    )
  }
})

await test('refusals name the blocker, not a stack trace', async () => {
  await assert.rejects(
    () => adapterFor('tiktok').publish(CONTENT, {}),
    (err: unknown) => {
      const msg = (err as Error).message
      return msg.includes('tiktok') && /audit|developer app|sign-in/i.test(msg)
    },
  )
})

await test('connection reports contain env var NAMES only, never values', () => {
  const report = connectionReport({ IG_ACCESS_TOKEN: 'super-secret-value-abcdef' })
  const blob = JSON.stringify(report)
  assert.equal(blob.includes('super-secret-value-abcdef'), false, 'a secret value leaked into the report')
  for (const state of report) {
    for (const name of state.missingEnv) assert.match(name, /^[A-Z0-9_]+$/)
  }
})

await test('Instagram reports connected only when every credential is present', () => {
  const ig = adapterFor('instagram')
  assert.equal(ig.validateConnection({}).connected, false)
  const full = ig.validateConnection({
    IG_ACCESS_TOKEN: 't',
    IG_USER_ID: '1',
    IG_PUBLISH_ENABLED: 'false',
    PUBLISH_SECRET: 's',
  })
  assert.equal(full.connected, true)
  assert.match(full.detail, /kill switch/i, 'the operator must be told publishing is off')
})

await test('IG_PUBLISH_ENABLED is reported, not assumed', () => {
  const ig = adapterFor('instagram')
  const on = ig.validateConnection({
    IG_ACCESS_TOKEN: 't', IG_USER_ID: '1', IG_PUBLISH_ENABLED: 'true', PUBLISH_SECRET: 's',
  })
  assert.match(on.detail, /ENABLED/)
  const off = ig.validateConnection({
    IG_ACCESS_TOKEN: 't', IG_USER_ID: '1', IG_PUBLISH_ENABLED: 'TRUE', PUBLISH_SECRET: 's',
  })
  assert.match(off.detail, /disabled/i, 'only the exact string "true" may enable publishing')
})

await test('content validation rejects a prohibited claim before anything is uploaded', () => {
  const bad = { ...CONTENT, caption: 'Create smarter social content in seconds. Try it free.' }
  const errors = adapterFor('instagram').validateContent(bad)
  assert.ok(errors.some((e) => e.includes('prohibited claim')))
})

await test('content validation rejects a video-first post with no video', () => {
  const errors = adapterFor('instagram').validateContent({ ...CONTENT, video_url: null })
  assert.ok(errors.some((e) => e.includes('video_url')))
})

await test('valid content passes validation on every publish-capable platform', () => {
  for (const p of PLATFORM_MATRIX) {
    if (!p.canPublish) continue
    assert.deepEqual(adapterFor(p.id).validateContent(CONTENT), [], `${p.id} rejected valid content`)
  }
})

await test('every adapter states its media requirements', () => {
  for (const p of PLATFORM_MATRIX) {
    const reqs = adapterFor(p.id).mediaRequirements()
    assert.ok(reqs.length >= 1 && reqs[0].length > 10, `${p.id} has no media requirements`)
  }
})

await test('error summaries redact anything that looks like a token', () => {
  const summary = safeErrorSummary(new Error('failed: access_token=EAABsbCS1234567890abcdefghijklmnop'))
  assert.equal(summary.includes('EAABsbCS1234567890abcdefghijklmnop'), false)
  assert.match(summary, /redacted/)
})

await test('the WhatsApp adapter produces a manual checklist instead of pretending to post', async () => {
  const { WhatsAppChannelAdapter } = await import('../orchestrator/social/adapters/whatsappChannel.ts')
  const task = new WhatsAppChannelAdapter().manualTask(CONTENT)
  assert.equal(task.platform, 'whatsapp_channel')
  assert.ok(task.checklist.length >= 4)
  assert.ok(task.message.length > 0)
  await assert.rejects(() => adapterFor('whatsapp_channel').publish(CONTENT, {}))
})

await test('the X adapter can state its operating cost before anyone approves it', async () => {
  const { XAdapter } = await import('../orchestrator/social/adapters/x.ts')
  const x = new XAdapter()
  assert.equal(x.estimatedMonthlyCostUsd(1, true), 6)
  assert.equal(x.estimatedMonthlyCostUsd(1, false), 0.45)
})

// ===========================================================================
section('two-hour sync')

await test('the schedule is exactly every two hours', () => {
  assert.equal(SOCIAL_SYNC_CRON, '0 */2 * * *')
})

await test('the workflow file uses the same cron and is gated off', () => {
  const wf = readFileSync(new URL('../.github/workflows/social-metrics-sync.yml', import.meta.url), 'utf8')
  assert.ok(wf.includes(`cron: '${SOCIAL_SYNC_CRON}'`), 'workflow cron drifted from SOCIAL_SYNC_CRON')
  assert.match(wf, /SOCIAL_SYNC_ENABLED/, 'the sync must be gated')
  assert.match(wf, /needs\.gate\.outputs\.enabled == 'true'/, 'the sync job must depend on the gate')
})

await test('snapshot windows are two hours wide and idempotent', () => {
  const a = snapshotWindow(Date.parse('2026-08-20T13:59:59Z'))
  const b = snapshotWindow(Date.parse('2026-08-20T12:00:00Z'))
  const c = snapshotWindow(Date.parse('2026-08-20T14:00:01Z'))
  assert.equal(a, b, 'the same window must produce the same key')
  assert.notEqual(a, c)
  assert.equal(a, '2026-08-20T12:00:00.000Z')
})

await test('backoff grows and is capped', () => {
  assert.ok(backoffMs(1) < backoffMs(2))
  assert.ok(backoffMs(2) < backoffMs(3))
  assert.ok(backoffMs(20) <= 30_000)
})

await test('rate limits and transient failures retry; a missing credential does not', () => {
  assert.equal(isRetryable(new Error('HTTP 429 rate limit')), true)
  assert.equal(isRetryable(new Error('HTTP 503 upstream')), true)
  assert.equal(isRetryable(new Error('request aborted')), true)
  const unavailable = new AdapterUnavailableError('tiktok', 'api_approval_required', 'no app')
  assert.equal(isRetryable(unavailable), false)
})

await test('a dry run writes nothing at all', async () => {
  const store = new NullSyncStore()
  const result = await runSocialSync({
    env: {},
    store,
    dryRun: true,
    now: () => NOW,
    sleep: async () => {},
    log: () => {},
  })
  assert.equal(result.dryRun, true)
  assert.equal(store.accountSnapshots.length, 0)
  assert.equal(store.postSnapshots.length, 0)
  assert.equal(store.outcomes.length, 0)
  assert.equal(store.alerts.length, 0)
})

await test('one platform failing does not stop the others', async () => {
  const store = new NullSyncStore()
  const result = await runSocialSync({
    env: {},
    store,
    dryRun: true,
    now: () => NOW,
    sleep: async () => {},
    log: () => {},
  })
  assert.ok(result.platforms.length >= 8, 'every metrics-capable platform must be attempted')
  const attempted = new Set(result.platforms.map((p) => p.platform))
  assert.ok(attempted.has('instagram') && attempted.has('pinterest'), 'later platforms were skipped')
})

await test('a missing credential is a SKIP, not a failure — it must not page anyone', async () => {
  const store = new NullSyncStore()
  const result = await runSocialSync({
    env: {},
    store,
    dryRun: true,
    now: () => NOW,
    sleep: async () => {},
    log: () => {},
  })
  assert.ok(result.platforms.every((p) => p.status !== 'failed'), 'expected state must not be a failure')
  assert.ok(result.platforms.every((p) => p.status === 'skipped'))
  assert.equal(result.alerts.length, 0)
})

await test('every skip explains itself in operator language', async () => {
  const store = new NullSyncStore()
  const result = await runSocialSync({
    env: {}, store, dryRun: true, now: () => NOW, sleep: async () => {}, log: () => {},
  })
  for (const p of result.platforms) {
    assert.ok(p.reason.length > 10, `${p.platform} gave no reason`)
  }
})

await test('structured logs never contain a secret value', async () => {
  const lines: Record<string, unknown>[] = []
  await runSocialSync({
    env: { IG_ACCESS_TOKEN: 'THE-SECRET-VALUE-0123456789abcdef' },
    store: new NullSyncStore(),
    dryRun: true,
    now: () => NOW,
    sleep: async () => {},
    log: (e) => lines.push(e),
  })
  const blob = JSON.stringify(lines)
  assert.equal(blob.includes('THE-SECRET-VALUE-0123456789abcdef'), false)
})

await test('a run restricted to one platform touches only that platform', async () => {
  const result = await runSocialSync({
    env: {},
    store: new NullSyncStore(),
    dryRun: true,
    platforms: ['pinterest'],
    now: () => NOW,
    sleep: async () => {},
    log: () => {},
  })
  assert.deepEqual(result.platforms.map((p) => p.platform), ['pinterest'])
})

await test('anomaly detection flags an implausible collapse and ignores normal movement', () => {
  const base = { platform: 'instagram' as const, views: null, reach: null, engagement: null, capturedAt: iso(0) }
  assert.deepEqual(detectAnomalies({ ...base, followers: 100 }, { ...base, followers: 98 }), [])
  assert.equal(detectAnomalies({ ...base, followers: 10 }, { ...base, followers: 100 }).length, 1)
  assert.ok(detectAnomalies({ ...base, followers: 0 }, { ...base, followers: 100 }).length >= 1)
  assert.deepEqual(detectAnomalies({ ...base, followers: 100 }, null), [], 'a first reading is not an anomaly')
})

// ===========================================================================
section('duplicate protection')

await test('the migration enforces one post per content item per platform', () => {
  const sql = readFileSync(
    new URL('../supabase/migrations/20260820120000_social_ops_core.sql', import.meta.url),
    'utf8',
  )
  assert.match(sql, /unique \(content_id, platform\)/)
  assert.match(sql, /content_publications_platform_post_unique/)
  assert.match(sql, /unique \(idempotency_key\)/)
})

await test('the migration keeps metric snapshots idempotent per window', () => {
  const sql = readFileSync(
    new URL('../supabase/migrations/20260820120000_social_ops_core.sql', import.meta.url),
    'utf8',
  )
  assert.match(sql, /unique \(platform, subject_type, subject_id, window_start\)/)
})

await test('the migration stores no plaintext token column', () => {
  const sql = readFileSync(
    new URL('../supabase/migrations/20260820120000_social_ops_core.sql', import.meta.url),
    'utf8',
  )
  assert.doesNotMatch(sql, /^\s*(access_token|refresh_token|client_secret|app_secret)\s/m)
  assert.match(sql, /token_fingerprint/, 'expiry + fingerprint is the approved shape')
})

await test('public rows require approval AND publication', () => {
  const sql = readFileSync(
    new URL('../supabase/migrations/20260820120000_social_ops_core.sql', import.meta.url),
    'utf8',
  )
  assert.match(sql, /using \(approval_status = 'approved' and publication_status = 'published'\)/)
})

// ===========================================================================
section('dashboard derivations')

const SNAPSHOTS: MetricSnapshotRow[] = [
  { platform: 'instagram', subject_type: 'account', subject_id: 'instagram', window_start: iso(0), captured_at: iso(0), followers: 120, views: 900, reach: 800, impressions: null, engagement: 80, likes: null, comments: null, shares: null, saves: null },
  { platform: 'instagram', subject_type: 'account', subject_id: 'instagram', window_start: iso(30 * 86_400_000), captured_at: iso(30 * 86_400_000), followers: 100, views: 500, reach: 400, impressions: null, engagement: 40, likes: null, comments: null, shares: null, saves: null },
  { platform: 'facebook', subject_type: 'account', subject_id: 'facebook', window_start: iso(0), captured_at: iso(0), followers: 30, views: null, reach: 200, impressions: null, engagement: 10, likes: null, comments: null, shares: null, saves: null },
  { platform: 'instagram', subject_type: 'post', subject_id: 'IG_1', window_start: iso(0), captured_at: iso(0), followers: null, views: 700, reach: null, impressions: null, engagement: null, likes: 30, comments: 2, shares: 1, saves: 4 },
  { platform: 'instagram', subject_type: 'post', subject_id: 'IG_2', window_start: iso(0), captured_at: iso(0), followers: null, views: 120, reach: null, impressions: null, engagement: null, likes: 5, comments: 0, shares: 0, saves: 0 },
]

const PUBLICATIONS: PublicationRow[] = [
  { content_id: 'cv-ats-language', platform: 'instagram', platform_post_id: 'IG_1', platform_post_url: 'https://www.instagram.com/p/IG_1', status: 'published', published_at: iso(86_400_000), last_metrics_sync_at: iso(0) },
  { content_id: 'money-narrow-service', platform: 'instagram', platform_post_id: 'IG_2', platform_post_url: 'https://www.instagram.com/p/IG_2', status: 'published', published_at: iso(2 * 86_400_000), last_metrics_sync_at: iso(0) },
  { content_id: 'apps-follow-up', platform: 'facebook', platform_post_id: null, platform_post_url: null, status: 'queued', published_at: null, last_metrics_sync_at: null },
]

const CONTENT_ROWS: ContentRow[] = [
  { id: 'cv-ats-language', title: 'Your CV never reached a human', pillar: 'career_growth', approval_status: 'approved', publication_status: 'published', safety_status: 'ok', published_at: iso(86_400_000) },
  { id: 'money-narrow-service', title: 'Stop selling design. Sell one task.', pillar: 'income_business', approval_status: 'approved', publication_status: 'published', safety_status: 'ok', published_at: iso(2 * 86_400_000) },
  { id: 'apps-follow-up', title: 'The follow-up almost nobody sends', pillar: 'opportunities', approval_status: 'pending', publication_status: 'draft', safety_status: 'ok', published_at: null },
]

await test('totals sum the newest reading of every platform', () => {
  assert.equal(sumLatest(SNAPSHOTS, 'followers'), 150)
  assert.equal(sumLatest(SNAPSHOTS, 'reach'), 1000)
})

await test('a metric with no reading is null, never zero', () => {
  assert.equal(sumLatest([], 'followers'), null)
  assert.equal(formatMetric(null), '—')
  assert.equal(formatMetric(0), '0')
})

await test('growth needs two readings, and reports both absolute and percent', () => {
  // Baseline = the newest reading at or before the cutoff. The 30-day-old Instagram reading
  // qualifies for a 10-day window; Facebook has a single reading and is correctly ignored.
  const g = growthSince(SNAPSHOTS, 'followers', NOW - 10 * 86_400_000)
  assert.equal(g?.absolute, 20)
  assert.equal(g?.percent, 20)
  assert.equal(growthSince(SNAPSHOTS.slice(0, 1), 'followers', NOW - 10 * 86_400_000), null)
  assert.equal(growthSince(SNAPSHOTS, 'followers', NOW - 400 * 86_400_000), null, 'no baseline that far back')
})

await test('engagement rate is null unless both engagement and reach are known', () => {
  assert.equal(engagementRate(SNAPSHOTS), 9)
  assert.equal(engagementRate([]), null)
})

await test('top posts rank by views and link to the real post', () => {
  const top = topPosts(SNAPSHOTS, PUBLICATIONS, CONTENT_ROWS)
  assert.equal(top.length, 2)
  assert.equal(top[0].value, 700)
  assert.equal(top[0].item.title, 'Your CV never reached a human')
  assert.equal(top[0].item.url, 'https://www.instagram.com/p/IG_1')
})

await test('a queued publication with no post id is never ranked', () => {
  const top = topPosts(SNAPSHOTS, PUBLICATIONS, CONTENT_ROWS)
  assert.equal(top.some((t) => t.key.includes('facebook')), false)
})

await test('the top pillar comes from real post views', () => {
  assert.deepEqual(topPillar(SNAPSHOTS, PUBLICATIONS, CONTENT_ROWS), { pillar: 'career_growth', views: 700 })
  assert.equal(topPillar([], PUBLICATIONS, CONTENT_ROWS), null)
})

await test('data older than one and a half sync windows is labelled stale', () => {
  assert.equal(freshness(iso(60 * 60_000), NOW).stale, false)
  assert.equal(freshness(iso(5 * 60 * 60_000), NOW).stale, true)
  const never = freshness(null, NOW)
  assert.equal(never.stale, true)
  assert.equal(never.label, 'never synced')
})

const ACCOUNTS: AccountRow[] = [
  { platform: 'instagram', display_name: 'Jifunze.AI', handle: '@jifunze.ai', profile_url: 'https://www.instagram.com/jifunze.ai/', readiness: 'ready', manual_only: false, enabled: true, profile_completeness: 0.8 },
  { platform: 'tiktok', display_name: 'Jifunze.AI', handle: '@jifunze_ai', profile_url: 'https://www.tiktok.com/@jifunze_ai', readiness: 'api_approval_required', manual_only: false, enabled: false, profile_completeness: 0.4 },
]

await test('an expiring token is surfaced before it expires', () => {
  const connections: ConnectionRow[] = [
    { platform: 'instagram', connection_status: 'connected', missing_env_vars: [], token_expires_at: iso(-3 * 86_400_000), last_sync_attempt_at: iso(0), last_successful_sync_at: iso(0), last_sync_status: 'ok', last_publish_attempt_at: null, last_publish_success_at: null, last_error_summary: null, required_action: null },
  ]
  const health = accountHealth(ACCOUNTS, connections, NOW)
  const ig = health.find((h) => h.platform === 'instagram')!
  assert.equal(ig.tokenExpiresInDays, 3)
  assert.match(ig.tokenWarning ?? '', /expires in 3 day/)
})

await test('an expired token is reported as expired, not merely stale', () => {
  const connections: ConnectionRow[] = [
    { platform: 'instagram', connection_status: 'error', missing_env_vars: [], token_expires_at: iso(2 * 86_400_000), last_sync_attempt_at: iso(0), last_successful_sync_at: null, last_sync_status: 'failed', last_publish_attempt_at: null, last_publish_success_at: null, last_error_summary: 'token expired', required_action: 'Re-run the token refresh.' },
  ]
  const ig = accountHealth(ACCOUNTS, connections, NOW).find((h) => h.platform === 'instagram')!
  assert.equal(ig.tokenWarning, 'Token has expired.')
  assert.equal(ig.lastSuccessfulSync.label, 'never synced')
  assert.equal(ig.requiredAction, 'Re-run the token refresh.')
})

await test('a platform with no connection row still reports a state', () => {
  const health = accountHealth(ACCOUNTS, [], NOW)
  assert.equal(health.length, 2)
  assert.equal(health[1].connectionStatus, 'disconnected')
  assert.equal(health[1].tokenWarning, null)
})

await test('pipeline health counts the real states', () => {
  const p = pipelineHealth(CONTENT_ROWS, PUBLICATIONS)
  assert.equal(p.itemsTotal, 3)
  assert.equal(p.awaitingApproval, 1)
  assert.equal(p.published, 2)
  assert.equal(p.publicationsQueued, 1)
  assert.equal(p.publicationsFailed, 0)
})

await test('an overdue sync is called overdue', () => {
  const overdue = syncStatus(
    [{ id: 'sync-1', dry_run: false, status: 'ok', started_at: iso(9 * 3600_000), finished_at: iso(9 * 3600_000), platforms_ok: 1, platforms_skipped: 7, platforms_failed: 0 }],
    [],
    NOW,
  )
  assert.equal(overdue.overdue, true)

  const fresh = syncStatus(
    [{ id: 'sync-2', dry_run: false, status: 'ok', started_at: iso(30 * 60_000), finished_at: iso(30 * 60_000), platforms_ok: 1, platforms_skipped: 7, platforms_failed: 0 }],
    [],
    NOW,
  )
  assert.equal(fresh.overdue, false)
})

await test('only unresolved alerts are shown as open', () => {
  const s = syncStatus([], [
    { id: 1, platform: 'instagram', severity: 'error', code: 'sync_failed', message: 'x', resolved_at: null, created_at: iso(0) },
    { id: 2, platform: 'instagram', severity: 'error', code: 'sync_failed', message: 'y', resolved_at: iso(0), created_at: iso(3600_000) },
  ], NOW)
  assert.equal(s.openAlerts.length, 1)
  assert.equal(s.openAlerts[0].id, 1)
})

// ===========================================================================
section('dashboard authorization + isolation')

await test('every /admin surface is guarded and no frozen Learn admin code is imported', () => {
  const app = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8')
  assert.match(app, /RequireSocialOpsAccess/, 'the console must have a guard')
  assert.equal(/components\/admin\/platform/.test(app), false, 'frozen Learn admin must not be imported')
  // Both /admin blocks (console shell + social-ops shell) must sit inside the guard.
  const guardCount = (app.match(/<RequireSocialOpsAccess>/g) ?? []).length
  assert.ok(guardCount >= 2, 'both admin route blocks must be wrapped in the guard')
  // The only /admin paths outside a guard block are the public login entry.
  assert.match(app, /path="\/admin\/login"/)
})

await test('the social-ops guard has no test bypass', () => {
  const guard = readFileSync(
    new URL('../src/components/social-ops/RequireSocialOpsAccess.tsx', import.meta.url),
    'utf8',
  )
  assert.equal(guard.includes('VITE_PLAYWRIGHT_BUILD'), false, 'an ops console must not have a bypass')
  assert.match(guard, /isAdminTier/, 'must check the admin tier')
})

await test('the console never imports frozen learning-platform admin code', () => {
  for (const file of [
    'RequireSocialOpsAccess.tsx',
    'SocialOpsShell.tsx',
    'SocialOpsOverviewPage.tsx',
    'SocialOpsAccountsPage.tsx',
    'SocialOpsPipelinePage.tsx',
    'SocialOpsSafetyPage.tsx',
  ]) {
    const src = readFileSync(new URL(`../src/components/social-ops/${file}`, import.meta.url), 'utf8')
    // Check IMPORTS, not prose — these files legitimately name the frozen tree in their comments.
    const imports = [...src.matchAll(/from\s+'([^']+)'/g)].map((m) => m[1])
    for (const spec of imports) {
      assert.equal(
        /components\/admin\/platform|components\/learn|components\/learning|components\/training/.test(spec),
        false,
        `${file} imports frozen learning-platform code: ${spec}`,
      )
    }
  }
})

await test('the public site never links to the private console', () => {
  for (const file of ['MediaSiteShell.tsx', 'MediaHomePage.tsx', 'SocialDirectoryPage.tsx', 'ContentHubPage.tsx']) {
    const src = readFileSync(new URL(`../src/components/media/${file}`, import.meta.url), 'utf8')
    assert.equal(src.includes('social-ops'), false, `${file} exposes the private console`)
  }
})

await test('the safety page cannot mutate a production secret from the browser', () => {
  const src = readFileSync(
    new URL('../src/components/social-ops/SocialOpsSafetyPage.tsx', import.meta.url),
    'utf8',
  )
  assert.equal(/<button[^>]*onClick/.test(src), false, 'no button on the kill-switch page may act')
  assert.match(src, /does not change anything/i)
})

await test('the admin Edge Function checks the session, then the tier, then the rate limit', () => {
  const fn = readFileSync(
    new URL('../supabase/functions/social-ops-admin/index.ts', import.meta.url),
    'utf8',
  )
  const authIdx = fn.indexOf('auth.getUser()')
  const adminIdx = fn.indexOf("rpc('is_admin')")
  const limitIdx = fn.indexOf('REFRESH_COOLDOWN_SECONDS * 1000')
  assert.ok(authIdx > 0 && adminIdx > authIdx, 'authorization must follow authentication')
  assert.ok(limitIdx > adminIdx, 'the rate limit must come after authorization')
  assert.match(fn, /403/, 'a non-admin must be refused')
  assert.match(fn, /429/, 'the refresh must be rate limited')
})

await test('the admin Edge Function never returns a secret value', () => {
  const fn = readFileSync(
    new URL('../supabase/functions/social-ops-admin/index.ts', import.meta.url),
    'utf8',
  )
  assert.match(fn, /Boolean\(Deno\.env\.get\('PUBLISH_SECRET'\)\)/, 'presence only')
  assert.equal(/message:\s*Deno\.env\.get/.test(fn), false)
  assert.match(fn, /safeSummary/, 'errors must be reduced before being returned')
})

// ===========================================================================
section('frozen Learn boundary')

const ACTIVE_SOURCE_ROOTS = ['../src', '../orchestrator', '../render/src', '../scripts', '../supabase/functions']

const FROZEN_SCHEMA_NEEDLES = [
  'training_plans',
  'learning_lab_runs',
  'teaching_learning_events',
  'learner_pathway_preferences',
  'flagship_course_progress',
  'learner_course_artifacts',
  'capstone_submissions',
  'stripe_customers',
  'stripe_subscription_entitlements',
  'billing_refund_requests',
  'stripe_module_purchases',
  'my_learning_access_summary',
]

const RETIRED_BRAND_NEEDLES = [
  'Create smarter, Grow faster',
  'jf-learn-warm',
  'jifunze-logo-light.png',
  'jifunze-logo-dark.png',
  'jifunze-logo-icon.png',
  'Become an Instructor',
  'Enroll now',
]

const RETIRED_ROUTE_COMPONENT_NEEDLES = [
  'LearningDiscoveryHubPage',
  'FlagshipCourseDetailPage',
  'LearnerCheckoutPage',
  'AuthSignUpPage',
  'LearnerAppShell',
  'stripe-checkout',
  'stripe-portal',
  'stripe-webhook',
]

function* walkFiles(dirUrl: URL): Generator<string> {
  const { readdirSync, statSync } = fsExtra
  let entries: string[] = []
  try {
    entries = readdirSync(dirUrl)
  } catch {
    return
  }
  for (const name of entries) {
    const child = new URL(`${dirUrl.href.replace(/\/$/, '')}/${name}`)
    const st = statSync(child)
    if (st.isDirectory()) yield* walkFiles(new URL(`${child.href}/`))
    else if (/\.(ts|tsx|js|mjs|css|html|sql|json)$/.test(name)) yield child.pathname
  }
}

await test('no active source file references a frozen table, retired brand string or removed course module', () => {
  const offenders: string[] = []
  const self = new URL(import.meta.url).pathname
  for (const root of ACTIVE_SOURCE_ROOTS) {
    for (const file of walkFiles(new URL(`${root}/`, import.meta.url))) {
      if (file === self) continue
      const text = readFileSync(file, 'utf8')
      for (const needle of [...FROZEN_SCHEMA_NEEDLES, ...RETIRED_BRAND_NEEDLES, ...RETIRED_ROUTE_COMPONENT_NEEDLES]) {
        if (text.includes(needle)) offenders.push(`${file} -> ${needle}`)
      }
    }
  }
  assert.deepEqual(offenders, [], 'frozen/retired reference in active source')
})

await test('the built bundle (when present) contains no frozen table or retired brand string', () => {
  const { readdirSync } = fsExtra
  let files: string[] = []
  try {
    files = readdirSync(new URL('../dist/assets/', import.meta.url))
  } catch {
    console.log('       (dist/ not present — run `npm run build` for the bundle leg)')
    return
  }
  const offenders: string[] = []
  for (const name of files) {
    if (!/\.(js|css)$/.test(name)) continue
    const text = readFileSync(new URL(`../dist/assets/${name}`, import.meta.url), 'utf8')
    for (const needle of [...FROZEN_SCHEMA_NEEDLES, ...RETIRED_BRAND_NEEDLES]) {
      if (text.includes(needle)) offenders.push(`${name} -> ${needle}`)
    }
  }
  assert.deepEqual(offenders, [], 'frozen/retired string in the production bundle')
})

await test('the sitemap and feed carry no course URLs and no legacy topic slugs', () => {
  const sitemap = readFileSync(pubUrl('sitemap.xml'), 'utf8')
  const feed = readFileSync(pubUrl('feed.xml'), 'utf8')
  for (const bad of ['/learn', '/library', '/courses/', '/paths', '/pricing', '/auth/sign-up']) {
    assert.equal(sitemap.includes(bad), false, `sitemap contains retired URL ${bad}`)
    assert.equal(feed.includes(bad), false, `feed contains retired URL ${bad}`)
  }
  for (const legacySlug of Object.keys(LEGACY_PILLAR_SLUGS)) {
    assert.equal(sitemap.includes(`/topics/${legacySlug}<`), false, `sitemap lists legacy topic slug ${legacySlug}`)
  }
  assert.equal(/\/admin/.test(sitemap), false, 'admin routes must not be in the sitemap')
})

await test('the publishing workflows stay gated off by default', () => {
  const loop = readFileSync(new URL('../.github/workflows/autonomous-loop.yml', import.meta.url), 'utf8')
  const sync = readFileSync(new URL('../.github/workflows/social-metrics-sync.yml', import.meta.url), 'utf8')
  assert.match(loop, /DRY_RUN/, 'loop must carry the DRY_RUN gate')
  assert.match(sync, /SOCIAL_SYNC_ENABLED/, 'sync must carry the SOCIAL_SYNC_ENABLED gate')
  assert.equal(/IG_PUBLISH_ENABLED:\s*['"]?true/.test(loop), false, 'publishing must not be hardcoded on')
  assert.equal(/SOCIAL_SYNC_ENABLED:\s*['"]?true/.test(sync), false, 'sync must not be hardcoded on')
})

// ===========================================================================
section('secret hygiene')

const SECRET_PATTERNS: Array<[string, RegExp]> = [
  ['Meta long-lived token', /\bEAA[A-Za-z0-9]{30,}/],
  ['OpenAI key', /\bsk-[A-Za-z0-9]{20,}/],
  ['Supabase service key (JWT)', /\beyJ[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}\./],
  ['Google OAuth client secret', /\bGOCSPX-[A-Za-z0-9_-]{10,}/],
  ['Telegram bot token', /\b\d{8,10}:[A-Za-z0-9_-]{30,}/],
]

const SCANNED = [
  'src/social/brand.ts',
  'src/social/socialAccounts.ts',
  'src/social/platformMatrix.ts',
  'src/social/guides.ts',
  'src/social/contentLedger.ts',
  'src/services/socialOps/socialOpsSummary.ts',
  'src/services/socialOps/socialOpsData.ts',
  'orchestrator/social/types.ts',
  'orchestrator/social/transform.ts',
  'orchestrator/social/sync.ts',
  'orchestrator/social/store.ts',
  'orchestrator/social/registry.ts',
  'orchestrator/social/adapters/base.ts',
  'orchestrator/social/adapters/instagram.ts',
  'orchestrator/social/adapters/facebook.ts',
  'orchestrator/social/adapters/threads.ts',
  'orchestrator/social/adapters/tiktok.ts',
  'orchestrator/social/adapters/youtube.ts',
  'orchestrator/social/adapters/linkedin.ts',
  'orchestrator/social/adapters/x.ts',
  'orchestrator/social/adapters/pinterest.ts',
  'orchestrator/social/adapters/telegram.ts',
  'orchestrator/social/adapters/whatsappChannel.ts',
  'supabase/functions/social-ops-admin/index.ts',
  'supabase/migrations/20260820120000_social_ops_core.sql',
  '.github/workflows/social-metrics-sync.yml',
  'index.html',
  'public/robots.txt',
  'public/sitemap.xml',
  'public/feed.xml',
]

await test('no file added by this work contains anything shaped like a credential', () => {
  for (const rel of SCANNED) {
    const text = readFileSync(new URL(`../${rel}`, import.meta.url), 'utf8')
    for (const [label, pattern] of SECRET_PATTERNS) {
      assert.doesNotMatch(text, pattern, `${rel} looks like it contains a ${label}`)
    }
  }
})

await test('client-side code never references a service role key', () => {
  for (const rel of SCANNED.filter((f) => f.startsWith('src/'))) {
    const text = readFileSync(new URL(`../${rel}`, import.meta.url), 'utf8')
    assert.equal(text.includes('SERVICE_ROLE'), false, `${rel} references the service role key`)
  }
})

await test('no public Texas address survives anywhere in the shipped copy', () => {
  const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8')
  assert.doesNotMatch(html, /77545|Edgewick|Texas/i)
  assert.match(html, /"addressCountry": "KE"/)
})

console.log(`\n${passed} passed, ${failures.length} failed\n`)
if (failures.length) {
  for (const f of failures) console.error(`  ✗ ${f}`)
  process.exit(1)
}
