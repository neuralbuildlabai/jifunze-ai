/**
 * Bluesky — AT Protocol (XRPC).
 *
 * The odd one out in this registry, in the brand's favour:
 *  - READS need no credential at all. `public.api.bsky.app` serves profile and post views
 *    unauthenticated, so account and post metrics are readable the day the account exists.
 *  - WRITES need only an app password (Settings → App Passwords → create), exchanged for a
 *    session via `com.atproto.server.createSession`, then `com.atproto.repo.createRecord`.
 *    There is no developer app, no OAuth review and no platform audit gate.
 *
 * What that does NOT change: publishing here still passes through the same fail-closed
 * human-approval gate and the same prohibited-claims linter as every other platform. An app
 * password is a full-account credential (it cannot be scoped to posting alone), so it belongs in
 * server-side secrets only and must never reach the browser bundle.
 */
import { BaseAdapter } from './base.ts'

export class BlueskyAdapter extends BaseAdapter {
  constructor() {
    super('bluesky')
  }

  override mediaRequirements(): string[] {
    return [
      ...super.mediaRequirements(),
      'Post text is capped at 300 graphemes — the tightest limit of any Jifunze channel after X.',
      'Links, hashtags and mentions are byte-indexed facets, not plain text: a URL pasted without a facet is not clickable.',
    ]
  }
}
