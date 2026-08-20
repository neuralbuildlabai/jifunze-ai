/**
 * YouTube Shorts — YouTube Data API v3 for uploads, YouTube Analytics API for channel and video
 * numbers. No Google Cloud project or OAuth client exists yet, so every call refuses.
 *
 * Two facts an operator must not forget:
 *  - While the OAuth consent screen is in *Testing*, refresh tokens expire after 7 days. An
 *    unattended loop needs the app moved to *Published*.
 *  - `videos.insert` costs ~1,600 quota units against a 10,000/day default, so quota — not the
 *    100-calls/day cap — is the real limit (~6 uploads/day). Unaudited projects should also assume
 *    uploads land private until proven otherwise on the first real upload.
 */
import { BaseAdapter } from './base.ts'

export class YouTubeAdapter extends BaseAdapter {
  constructor() {
    super('youtube')
  }

  override mediaRequirements(): string[] {
    return [
      ...super.mediaRequirements(),
      'Title limit 100 characters; description limit 5000.',
      'A video is only treated as a Short when it is vertical and 3 minutes or shorter.',
      'Quota: ~1,600 units per videos.insert against a 10,000 unit/day default.',
    ]
  }
}
