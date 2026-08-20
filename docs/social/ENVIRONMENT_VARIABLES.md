# Environment variable reference — social operations

**Rule, non-negotiable:** no token, app secret, client secret, refresh token, verification code or
password is ever written into client-side code, a `VITE_*` variable, a committed file, or any
document including this one. Everything below is a **name** or a **description**, never a value.

`VITE_*` variables are compiled into the browser bundle and are therefore public by definition.
Nothing secret may ever be given a `VITE_` prefix.

## Server-side only

### Already in use

| Name | Where it lives | What it is |
|---|---|---|
| `SUPABASE_URL` | GH Actions secret / Supabase env | Project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | GH Actions secret / Supabase env | Service role. Bypasses RLS. Server only, always |
| `SUPABASE_ANON_KEY` | Edge Function env | Used to evaluate the caller's own RLS in `social-ops-admin` |
| `IG_ACCESS_TOKEN` | Supabase secret | Long-lived Instagram token (~60 days, refreshable) |
| `IG_USER_ID` | Supabase secret | Instagram Business Account id |
| `IG_PUBLISH_ENABLED` | Supabase secret | **Kill switch.** Must be exactly `"true"` before anything posts publicly |
| `PUBLISH_SECRET` | Supabase secret | Gates `publish-instagram` and `refresh-ig-token` |
| `INGEST_SECRET` | Supabase secret | Gates `ingest-signals` |
| `OPENAI_API_KEY` | Supabase secret / GH secret | Brief generation. The only recurring cost |
| `PEXELS_API_KEY` | GH secret | Optional, free stock video |

### New, for the metrics sync and the adapters — none of these exist yet

| Platform | Names | Notes |
|---|---|---|
| Facebook | `FB_PAGE_ID`, `FB_PAGE_ACCESS_TOKEN` | Same Meta app as Instagram. A Business Manager **system user** token does not expire and is the right choice for an unattended job |
| Threads | `THREADS_USER_ID`, `THREADS_ACCESS_TOKEN` | Separate Meta app with the Threads use case. Long-lived token is 60 days, refreshable |
| TikTok | `TIKTOK_CLIENT_KEY`, `TIKTOK_CLIENT_SECRET`, `TIKTOK_REFRESH_TOKEN` | Access token 24h, refresh token 365 days |
| YouTube | `YOUTUBE_CLIENT_ID`, `YOUTUBE_CLIENT_SECRET`, `YOUTUBE_REFRESH_TOKEN`, `YOUTUBE_CHANNEL_ID` | **Refresh tokens expire after 7 days while the consent screen is in *Testing*.** Publish the app before relying on an unattended loop |
| LinkedIn | `LINKEDIN_CLIENT_ID`, `LINKEDIN_CLIENT_SECRET`, `LINKEDIN_REFRESH_TOKEN`, `LINKEDIN_ORG_URN` | `LINKEDIN_ORG_URN` is `urn:li:organization:114444495` — public, not a secret |
| X | `X_CLIENT_ID`, `X_CLIENT_SECRET`, `X_REFRESH_TOKEN` | **Do not create until a budget decision is made** |
| Pinterest | `PINTEREST_APP_ID`, `PINTEREST_APP_SECRET`, `PINTEREST_REFRESH_TOKEN` | Access ~30 days, refresh ~365 days |
| Telegram | `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHANNEL_ID` | Bot token from @BotFather. Channel id may be `@jifunze_ai` |

### Control flags

| Name | Where | Default | Effect |
|---|---|---|---|
| `IG_PUBLISH_ENABLED` | Supabase secret | unset | Nothing posts publicly unless this is exactly `"true"` |
| `DRY_RUN` | GH repo variable | — | Autonomous loop renders and uploads but does not publish |
| `SOCIAL_SYNC_ENABLED` | GH repo variable | **unset** | The two-hour sync workflow short-circuits unless this is `"true"` |
| `SOCIAL_SYNC_DRY_RUN` | GH repo variable | — | Sync decides everything and writes nothing |
| `VISUAL_PROVIDER` | GH env | `designed` | `ai` is the only paid tier. Keep it off |
| `LOOP_OFFLINE` | GH env | derived | Runs the loop with no Supabase |

## Browser (public by design)

| Name | What |
|---|---|
| `VITE_SUPABASE_URL` | Project URL |
| `VITE_SUPABASE_ANON_KEY` | Anon key. RLS is the boundary, not this key |
| `VITE_MAINTENANCE_MODE` | Public maintenance gate — **presentation only**. Shows the maintenance shell to anonymous visitors. Grants and revokes no access; every protected route still runs its own guard and Supabase RLS |
| `VITE_PLAYWRIGHT_BUILD` | Test bundle only. **Never set on a real deploy.** It does not affect `/admin/social-ops`, which has no bypass |

> **Removed 2026-08-20 — `VITE_MAINTENANCE_BYPASS_TOKEN`.**
> Vite inlines every `VITE_*` value into the static JS bundle at build time, so this "token" was
> readable by anyone who downloaded the app. It was verified present in plaintext in a shipped
> `dist/` bundle. The query-param bypass has been deleted from the client; there is no replacement
> client secret. Treat the old value as compromised and delete the variable from Vercel
> Development, Preview and Production (see `MANUAL_PLATFORM_ACTIONS.md`).
>
> **Rule:** no `VITE_*` variable may ever be a secret or an authorization input. If a build-time
> flag decides what a user is *allowed* to do rather than what they *see*, it is a bug.
> Never read `import.meta.env` with a dynamic key — that makes Vite emit the whole env record into
> the bundle. See `src/lib/envCheck.ts`.

## Where each layer gets its credentials

| Layer | Source | Sees a token? |
|---|---|---|
| Browser (`/admin/social-ops`) | nothing | **No — ever** |
| `social-ops-admin` Edge Function | Supabase secrets | Yes, server-side |
| `scripts/social-sync.ts` in GitHub Actions | Actions secrets | Yes, server-side |
| `publish-instagram` Edge Function | Supabase secrets | Yes, server-side |

## Rotation and revocation

| Credential | Rotate by | Revoke by |
|---|---|---|
| Instagram / Facebook | Re-run the token exchange, `supabase secrets set` | Remove the app from the Business portfolio's connected assets |
| Threads | `GET /refresh_access_token` before day 60 | Revoke the app's permission in the account's settings |
| YouTube / Google | New refresh token via the consent screen | Revoke access in the Google Account's third-party apps |
| LinkedIn / Pinterest / TikTok / X | Refresh-token exchange | Revoke in each developer console |
| Telegram | `/revoke` in @BotFather | Remove the bot as a channel admin |
| `PUBLISH_SECRET`, `INGEST_SECRET` | Generate a new random value, `supabase secrets set`, redeploy | Same |

After any rotation, run `npm run social:sync:dry-run` and check the connection report before
enabling the scheduled job.
