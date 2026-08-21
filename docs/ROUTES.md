# Active route map (post-pivot, 2026-08-21)

The single router is `src/App.tsx`. HTTP statuses for retired routes are emitted by
`vercel.json` (legacy `routes` syntax with the filesystem handler first); the SPA renders the
branded body. **Limitation, stated honestly:** a client-rendered SPA cannot set an HTTP status
itself — on the local dev server every route answers 200 and only the body/meta are
authoritative. In production, `vercel.json` provides the real 410/404/301 statuses.

## Public (200)

| Route | Page |
|---|---|
| `/` | Landing page (signed-in admins are redirected to `/admin`) |
| `/content`, `/content/:slug` | Content hub (quick reads) + lesson detail |
| `/topics/:pillarSlug` | Pillar pages (six; legacy slugs 301 to their absorbing pillar) |
| `/social` | Verified official-account directory |
| `/about` | About / how content is made |
| `/privacy`, `/terms`, `/ai-disclosure`, `/contact` | Legal + transparency |
| `/admin/login` | **Admin Login** (labeled; invite-only; no registration) |
| `/forgot-password`, `/reset-password` | Administrator password recovery |
| `/robots.txt`, `/sitemap.xml`, `/feed.xml`, favicon/manifest set | Static |

## Admin (auth required; noindex; excluded from sitemap)

`/admin` (overview) · `/admin/signals` · module pages for selection, research, content, preview,
review, calendar, media, video, publishing, social-feed, analytics, insights, accounts,
automation, jobs, health, incidents, brand, editorial, users, audit, settings — each labeled
operational / read-only / partial / awaiting connection / planned per the capability truth
table. The proven social-ops console is preserved at `/admin/social-ops{,/accounts,/pipeline,/safety}`.

Authorization is three-layer: client guard (`RequireSocialOpsAccess`) for UX, RLS
`public.is_admin()` on every operational table, and a tier re-check inside the
`social-ops-admin` Edge Function. There is no test bypass.

## Retired — HTTP 410 (vercel.json) + branded retired body

`/learn` and everything under it (catalog, courses, lessons, checkout, readiness),
`/library/*`, `/libraries/*`, `/courses/*`, `/paths`, `/paths/*`, `/pricing`, `/refunds`,
`/settings/subscription`, `/auth/sign-up` (and legacy `?auth=signup` / `?signup=1` deep links —
ignored).

## Removed — HTTP 404 (vercel.json) + branded 404

`/dashboard`, `/my-learning`, `/reports`, `/account`, `/settings`, `/learning/*`, `/lab`,
the former Learn admin pages (`/admin/dashboard`, `/admin/learners`, `/admin/courses`, …),
and every unknown path. Missing static assets no longer return HTTP 200 HTML.

## Redirects — HTTP 301 (vercel.json; mirrored client-side)

| From | To |
|---|---|
| `/generate*`, `/ideas`, `/studio`, `/trends`, `/insights`, `/platform`, `/training*`, `/team/*` | `/` (April 2026 posts still link these) |
| `/disclaimer` | `/terms` |
| `/support` | `/contact` |
| `/auth/sign-in` | `/admin/login` |
| `/topics/{cv,interview,mindset}` | `/topics/career-growth` |
| `/topics/ai-task` | `/topics/practical-ai` |
| `/topics/money` | `/topics/income-business` |
| `/topics/applications` | `/topics/opportunities` |
