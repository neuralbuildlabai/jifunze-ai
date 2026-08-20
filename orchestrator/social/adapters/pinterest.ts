/**
 * Pinterest — API v5. No developer app exists yet.
 *
 * Trial access creates SANDBOX Pins that only the creator can see; real Pins need Standard access,
 * which requires a working OAuth flow, a published privacy policy and a screen recording of the app
 * performing a real API action. The domain claim additionally needs the verification tag deployed
 * (it is already staged in `index.html`) or a DNS TXT record.
 */
import { BaseAdapter } from './base.ts'

export class PinterestAdapter extends BaseAdapter {
  constructor() {
    super('pinterest')
  }

  override mediaRequirements(): string[] {
    return [
      ...super.mediaRequirements(),
      'Every Pin needs a still cover image — a video without a cover cannot be pinned.',
      'Title limit 100 characters; description limit 500.',
    ]
  }
}
