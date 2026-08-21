# Administrator access

**Invite-only. No public registration exists anywhere in the active application** — there is no
signup route, no signup mode in the auth form, and legacy signup deep links are ignored.

## Entry

`/admin/login` — labeled **Admin Login** in the public header and footer (never a bare
"Login"). Copy: "Administrator access — sign in to manage Jifunze signals, content, social
accounts and platform operations." `/auth/sign-in` 301s here. Successful sign-in routes to
`/admin`; a non-admin returnUrl can never point into `/admin`.

## Provisioning an administrator

There is deliberately no invite UI. An operator is provisioned directly in Supabase:
1. Create the auth user (Supabase Dashboard → Authentication → Add user).
2. Grant the tier: `profiles.global_access_tier = 'platform_admin'` (or the canonical accounts
   in `src/access/appAccess.ts`).
3. The tier is read via the `my_effective_access_tier` RPC; RLS `public.is_admin()` gates every
   operational table.

## The authorization layers

1. **Client guard** (`RequireSocialOpsAccess`) — UX only: signed-out → `/admin/login` with
   returnUrl; non-admin tier → `/`. No Playwright bypass exists.
2. **RLS** — `public.is_admin()` on every social-ops table; anon sessions get zero rows.
3. **Edge Function re-check** — `social-ops-admin` re-validates session then tier (403), then
   rate limit (429), before any action.

With no Supabase configuration the console states plainly that it is unavailable and renders no
placeholder data.

## Password recovery

`/forgot-password` / `/reset-password` use Supabase recovery mail. Copy is enumeration-safe:
identical responses whether or not the address has an account. Password policy: minimum 12
characters (`src/auth/passwordPolicy.ts`).

## Hygiene

Admin routes are `noindex`, excluded from the sitemap, and disallowed in robots.txt. Auth
errors never distinguish unknown-account from wrong-password.
