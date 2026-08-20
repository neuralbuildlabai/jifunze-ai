/**
 * LinkedIn — Community Management API (Posts API + organization analytics). Vetted product:
 * Development Tier first, then a screencast review for Standard Tier, and the developer app must
 * be verified against the Page by a Page admin. None of that exists yet, so every call refuses.
 *
 * Unofficial scraping is explicitly not an option here.
 */
import { BaseAdapter } from './base.ts'

export class LinkedInAdapter extends BaseAdapter {
  constructor() {
    super('linkedin')
  }

  override mediaRequirements(): string[] {
    return [
      ...super.mediaRequirements(),
      'Posts are authored as the organization URN, e.g. urn:li:organization:114444495.',
      'Development Tier limits: 500 requests per app and 100 per member, per day.',
    ]
  }
}
