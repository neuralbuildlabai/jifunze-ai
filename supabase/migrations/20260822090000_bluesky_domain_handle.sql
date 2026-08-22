-- Bluesky domain handle adopted on 22 August 2026.
--
-- The account (did:plc:hez3uufhzodbtwzuvvreri5l — unchanged) verified ownership of
-- jifunze.ai via https://www.jifunze.ai/.well-known/atproto-did and switched from the
-- default @jifunze.bsky.social handle to the domain handle @jifunze.ai. The public
-- profile URL changed accordingly. Idempotent: re-running is a no-op.

update public.social_accounts
set handle      = '@jifunze.ai',
    profile_url = 'https://bsky.app/profile/jifunze.ai',
    notes       = 'Reads need no credential (public API is unauthenticated). Publishing needs only an app password, no developer app or review. Account created 21 Aug 2026; domain handle @jifunze.ai adopted 22 Aug 2026 (same DID).'
where platform = 'bluesky'
  and platform_account_id = 'did:plc:hez3uufhzodbtwzuvvreri5l';
