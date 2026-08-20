/**
 * Telegram — the cheapest automation surface of all: a BotFather bot made an administrator of a
 * channel can `sendVideo` with no OAuth, no app review, no audit and no cost.
 *
 * It refuses today only because the channel and the bot do not exist, and creating them needs
 * owner approval (channel creation requires a phone number). The call shape below is what to use
 * the moment `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHANNEL_ID` exist.
 */
import { BaseAdapter, safeFetchJson } from './base.ts'
import type { AccountMetrics, AdapterEnv, PublishResult, PublishableContent } from '../types.ts'

export class TelegramAdapter extends BaseAdapter {
  constructor() {
    super('telegram')
  }

  override async publish(content: PublishableContent, env: AdapterEnv): Promise<PublishResult> {
    this.requireConnection(env, 'publish')
    const token = env.TELEGRAM_BOT_TOKEN!.trim()
    const chatId = env.TELEGRAM_CHANNEL_ID!.trim()
    const variant = this.prepare(content)
    if (!content.video_url) this.unavailable('publish (no rendered video_url)')

    const res = await safeFetchJson(`https://api.telegram.org/bot${token}/sendVideo`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, video: content.video_url, caption: variant.caption }),
      timeoutMs: 60_000,
    })
    const body = (res.body ?? {}) as { ok?: boolean; result?: { message_id?: number }; description?: string }
    const messageId = body.result?.message_id
    return {
      platform: 'telegram',
      postId: messageId ? String(messageId) : null,
      postUrl: messageId ? `https://t.me/${chatId.replace(/^@/, '')}/${messageId}` : null,
      status: body.ok && messageId ? 'published' : 'failed',
      detail: body.ok ? 'Sent to the channel.' : (body.description ?? `HTTP ${res.status}`),
    }
  }

  override async fetchAccountMetrics(env: AdapterEnv): Promise<AccountMetrics> {
    this.requireConnection(env, 'fetchAccountMetrics')
    const token = env.TELEGRAM_BOT_TOKEN!.trim()
    const chatId = env.TELEGRAM_CHANNEL_ID!.trim()
    const res = await safeFetchJson(
      `https://api.telegram.org/bot${token}/getChatMemberCount?chat_id=${encodeURIComponent(chatId)}`,
    )
    const body = (res.body ?? {}) as { ok?: boolean; result?: number }
    return {
      platform: 'telegram',
      followers: body.ok && typeof body.result === 'number' ? body.result : null,
      views: null,
      reach: null,
      engagement: null,
      capturedAt: new Date().toISOString(),
    }
  }
}
