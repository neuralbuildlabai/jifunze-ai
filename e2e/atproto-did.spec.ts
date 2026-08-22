import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { expect, test } from '@playwright/test'

/**
 * Bluesky domain-handle verification (AT Protocol HTTP method).
 *
 * `https://www.jifunze.ai/.well-known/atproto-did` must return the account DID —
 * and nothing else — so Bluesky can verify ownership of the `jifunze.ai` handle.
 * The body is served from `public/.well-known/atproto-did`; the plain-text
 * content type and the no-SPA-fallthrough guarantee come from `vercel.json`
 * (asserted structurally below, since the dev server used for E2E does not run
 * the production router).
 */

const DID = 'did:plc:hez3uufhzodbtwzuvvreri5l'

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..')

test('/.well-known/atproto-did returns exactly the DID and never the app shell', async ({ request }) => {
  const res = await request.get('/.well-known/atproto-did')
  expect(res.status()).toBe(200)
  const body = await res.text()
  expect(body).toBe(DID)
  expect(body).not.toContain('<')
  expect(res.headers()['content-type'] ?? '').not.toContain('text/html')
})

test('the source file holds the DID byte-for-byte (no BOM, no trailing newline)', () => {
  const raw = readFileSync(join(repoRoot, 'public', '.well-known', 'atproto-did'))
  expect(raw.toString('utf8')).toBe(DID)
})

test('vercel.json guards the endpoint: plain text, filesystem-served, no SPA fallthrough', () => {
  type Route = { src?: string; handle?: string; dest?: string; status?: number; continue?: boolean; headers?: Record<string, string> }
  const config = JSON.parse(readFileSync(join(repoRoot, 'vercel.json'), 'utf8')) as { routes: Route[] }
  const routes = config.routes

  // The content-type override must run before the filesystem handler serves the file.
  const headerIdx = routes.findIndex((r) => r.src === '^/\\.well-known/atproto-did$')
  const filesystemIdx = routes.findIndex((r) => r.handle === 'filesystem')
  expect(headerIdx).toBeGreaterThanOrEqual(0)
  expect(filesystemIdx).toBeGreaterThan(headerIdx)
  expect(routes[headerIdx].continue).toBe(true)
  expect(routes[headerIdx].headers?.['Content-Type']).toContain('text/plain')
  expect(routes[headerIdx].dest).toBeUndefined()

  // If the static file ever went missing, `.well-known` must 404 — never the SPA shell.
  const guardIdx = routes.findIndex((r) => r.src === '^/\\.well-known/.*$')
  expect(guardIdx).toBeGreaterThan(filesystemIdx)
  expect(routes[guardIdx].status).toBe(404)
  expect(routes[guardIdx].dest).toBeUndefined()

  // The SPA catch-all still exists and still runs after the guard.
  const catchAllIdx = routes.findIndex((r) => r.src === '^/.*$')
  expect(catchAllIdx).toBe(routes.length - 1)
  expect(catchAllIdx).toBeGreaterThan(guardIdx)
  expect(routes[catchAllIdx].dest).toBe('/index.html')
})
