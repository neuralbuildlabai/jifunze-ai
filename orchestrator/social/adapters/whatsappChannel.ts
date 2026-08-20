/**
 * WhatsApp Channel — MANUAL ONLY, permanently, until Meta ships an official Channel API.
 *
 * Verified against Meta's own documentation: the WhatsApp Business Platform documents the Cloud
 * API, the On-Premises API, the Business Management API and Embedded Signup. Channels are not part
 * of any of them. Vendors advertising a "WhatsApp Channel API" drive an unofficial client and risk
 * the number being banned — they must not be used.
 *
 * So this adapter publishes nothing. What it does instead is produce the manual distribution
 * checklist a person follows on a phone, which is the honest version of the capability.
 */
import { BaseAdapter } from './base.ts'
import type { PublishableContent } from '../types.ts'

export type ManualDistributionTask = {
  platform: 'whatsapp_channel'
  content_id: string
  /** What the person copies into WhatsApp. */
  message: string
  /** The file they attach. */
  attachment: string | null
  checklist: readonly string[]
}

export class WhatsAppChannelAdapter extends BaseAdapter {
  constructor() {
    super('whatsapp_channel')
  }

  /** Build the queue item a human works from. This is the entire capability. */
  manualTask(content: PublishableContent): ManualDistributionTask {
    const variant = this.prepare(content)
    return {
      platform: 'whatsapp_channel',
      content_id: content.content_id,
      message: variant.caption,
      attachment: content.video_url,
      checklist: [
        'Open WhatsApp on the admin phone and go to Updates → the Jifunze.AI channel.',
        'Attach the rendered vertical video.',
        'Paste the message exactly as written — do not add a link that has not been checked.',
        'Send, then confirm the update appears in the channel.',
        'Record the send in the social-ops dashboard so the ledger stays accurate.',
      ],
    }
  }
}
