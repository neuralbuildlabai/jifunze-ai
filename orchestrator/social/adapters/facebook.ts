/**
 * Facebook Page — same Meta app family as Instagram, but no Page access token has been issued to
 * the server yet, so `validateConnection()` reports `credentials_missing` and every call refuses.
 * The request shapes below are the ones to use once a token exists.
 */
import { BaseAdapter, safeFetchJson } from './base.ts'
import type { AccountMetrics, AdapterEnv, PostMetrics, PublishResult, PublishableContent } from '../types.ts'

const GRAPH = 'https://graph.facebook.com/v21.0'

export class FacebookAdapter extends BaseAdapter {
  constructor() {
    super('facebook')
  }

  override async publish(content: PublishableContent, env: AdapterEnv): Promise<PublishResult> {
    this.requireConnection(env, 'publish')
    const pageId = env.FB_PAGE_ID!.trim()
    const token = env.FB_PAGE_ACCESS_TOKEN!.trim()
    const variant = this.prepare(content)
    if (!content.video_url) this.unavailable('publish (no rendered video_url)')

    const res = await safeFetchJson(`${GRAPH}/${pageId}/video_reels`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        upload_phase: 'start',
        video_url: content.video_url,
        description: variant.caption,
        access_token: token,
      }),
      timeoutMs: 60_000,
    })
    const body = (res.body ?? {}) as { id?: string; error?: { message?: string } }
    return {
      platform: 'facebook',
      postId: body.id ?? null,
      postUrl: body.id ? `https://www.facebook.com/${body.id}` : null,
      status: res.ok && body.id ? 'pending' : 'failed',
      detail: res.ok ? 'Reel upload started; poll for status.' : (body.error?.message ?? `HTTP ${res.status}`),
    }
  }

  override async fetchAccountMetrics(env: AdapterEnv): Promise<AccountMetrics> {
    this.requireConnection(env, 'fetchAccountMetrics')
    const pageId = env.FB_PAGE_ID!.trim()
    const token = env.FB_PAGE_ACCESS_TOKEN!.trim()
    const res = await safeFetchJson(
      `${GRAPH}/${pageId}?fields=followers_count,fan_count&access_token=${encodeURIComponent(token)}`,
    )
    const body = (res.body ?? {}) as { followers_count?: number }
    return {
      platform: 'facebook',
      followers: typeof body.followers_count === 'number' ? body.followers_count : null,
      views: null,
      reach: null,
      engagement: null,
      capturedAt: new Date().toISOString(),
    }
  }

  override async fetchPostMetrics(postIds: readonly string[], env: AdapterEnv): Promise<PostMetrics[]> {
    this.requireConnection(env, 'fetchPostMetrics')
    const token = env.FB_PAGE_ACCESS_TOKEN!.trim()
    const capturedAt = new Date().toISOString()
    const out: PostMetrics[] = []
    for (const postId of postIds) {
      const res = await safeFetchJson(
        `${GRAPH}/${postId}?fields=likes.summary(true),comments.summary(true),shares&access_token=${encodeURIComponent(token)}`,
      )
      const body = (res.body ?? {}) as {
        likes?: { summary?: { total_count?: number } }
        comments?: { summary?: { total_count?: number } }
        shares?: { count?: number }
      }
      out.push({
        platform: 'facebook',
        postId,
        views: null,
        likes: body.likes?.summary?.total_count ?? null,
        comments: body.comments?.summary?.total_count ?? null,
        shares: body.shares?.count ?? null,
        saves: null,
        capturedAt,
      })
    }
    return out
  }
}
