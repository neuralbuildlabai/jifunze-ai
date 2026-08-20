/**
 * TikTok — the hardest gate of any platform here.
 *
 * An UNAUDITED client forces every video posted through the Content Posting API to `SELF_ONLY`
 * (private) and may serve at most 5 users per 24 hours. The client audit must be passed before
 * anything published through the API can be public. There is also no developer app and, on the
 * operating machine, no sign-in access to @jifunze_ai.
 *
 * This adapter therefore refuses every operation. Do not mark it ready without the audit.
 */
import { BaseAdapter } from './base.ts'

export class TikTokAdapter extends BaseAdapter {
  constructor() {
    super('tiktok')
  }

  override mediaRequirements(): string[] {
    return [
      ...super.mediaRequirements(),
      'Caption limit 2200 characters.',
      'Unaudited clients: privacy_level is forced to SELF_ONLY — the post will not be public.',
      'Creator consent is required before the first post; query creator_info for the allowed privacy levels.',
    ]
  }

}
