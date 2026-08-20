/**
 * Instagram — the only platform that can publish today.
 *
 * Publishing is delegated to the existing `publish-instagram` Supabase Edge Function so the
 * long-lived token, the `IG_PUBLISH_ENABLED` kill switch and the idempotency key all stay on the
 * server. This adapter never sees the Instagram token.
 *
 * Reads (insights) go directly to the Graph API using a token supplied by the caller's server-side
 * environment. Nothing here logs a token.
 */
import { BaseAdapter, safeFetchJson } from './base.ts'
import type {
  AccountMetrics,
  AdapterEnv,
  ConnectionState,
  PostMetrics,
  PublishResult,
  PublishableContent,
} from '../types.ts'

const GRAPH = 'https://graph.facebook.com/v21.0'

type GraphInsight = { name?: string; values?: Array<{ value?: number }> }

function insightValue(rows: GraphInsight[] | undefined, name: string): number | null {
  const row = rows?.find((r) => r.name === name)
  const value = row?.values?.[0]?.value
  return typeof value === 'number' ? value : null
}

export class InstagramAdapter extends BaseAdapter {
  constructor() {
    super('instagram')
  }

  override validateConnection(env: AdapterEnv): ConnectionState {
    const base = super.validateConnection(env)
    const publishEnabled = env.IG_PUBLISH_ENABLED?.trim() === 'true'
    return {
      ...base,
      detail: base.connected
        ? publishEnabled
          ? 'Connected. Publishing is ENABLED.'
          : 'Connected. Publishing is disabled by the IG_PUBLISH_ENABLED kill switch.'
        : base.detail,
    }
  }

  /**
   * Hands the job to the Edge Function. The function itself refuses unless
   * `IG_PUBLISH_ENABLED === "true"`, so calling this while the switch is off is safe.
   */
  override async publish(content: PublishableContent, env: AdapterEnv): Promise<PublishResult> {
    this.requireConnection(env, 'publish')

    const supabaseUrl = env.SUPABASE_URL?.trim()
    const publishSecret = env.PUBLISH_SECRET?.trim()
    if (!supabaseUrl || !publishSecret) {
      this.unavailable('publish (SUPABASE_URL and PUBLISH_SECRET are required to reach the publisher)')
    }
    if (!content.video_url) {
      this.unavailable('publish (no rendered video_url)')
    }

    const variant = this.prepare(content)
    const res = await safeFetchJson(`${supabaseUrl}/functions/v1/publish-instagram`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-publish-secret': publishSecret },
      body: JSON.stringify({
        idempotency_key: `${content.content_id}:instagram`,
        media_type: 'REELS',
        video_url: content.video_url,
        caption: variant.caption,
        alt_text: variant.altText,
      }),
      timeoutMs: 60_000,
    })

    const body = (res.body ?? {}) as { ig_media_id?: string; permalink?: string; error?: string }
    if (!res.ok) {
      return {
        platform: 'instagram',
        postId: null,
        postUrl: null,
        status: 'failed',
        detail: body.error ?? `publisher returned HTTP ${res.status}`,
      }
    }
    return {
      platform: 'instagram',
      postId: body.ig_media_id ?? null,
      postUrl: body.permalink ?? null,
      status: body.ig_media_id ? 'published' : 'pending',
      detail: 'Submitted to publish-instagram.',
    }
  }

  override async fetchAccountMetrics(env: AdapterEnv): Promise<AccountMetrics> {
    this.requireConnection(env, 'fetchAccountMetrics')
    const userId = env.IG_USER_ID!.trim()
    const token = env.IG_ACCESS_TOKEN!.trim()
    const capturedAt = new Date().toISOString()

    const profile = await safeFetchJson(
      `${GRAPH}/${userId}?fields=followers_count,media_count&access_token=${encodeURIComponent(token)}`,
    )
    const insights = await safeFetchJson(
      `${GRAPH}/${userId}/insights?metric=reach,profile_views&period=day&access_token=${encodeURIComponent(token)}`,
    )

    const profileBody = (profile.body ?? {}) as { followers_count?: number }
    const insightsBody = (insights.body ?? {}) as { data?: GraphInsight[] }

    return {
      platform: 'instagram',
      followers: typeof profileBody.followers_count === 'number' ? profileBody.followers_count : null,
      views: insightValue(insightsBody.data, 'profile_views'),
      reach: insightValue(insightsBody.data, 'reach'),
      engagement: null,
      capturedAt,
    }
  }

  override async fetchPostMetrics(
    postIds: readonly string[],
    env: AdapterEnv,
  ): Promise<PostMetrics[]> {
    this.requireConnection(env, 'fetchPostMetrics')
    const token = env.IG_ACCESS_TOKEN!.trim()
    const capturedAt = new Date().toISOString()
    const out: PostMetrics[] = []

    for (const postId of postIds) {
      const res = await safeFetchJson(
        `${GRAPH}/${postId}/insights?metric=reach,likes,comments,shares,saved&access_token=${encodeURIComponent(token)}`,
      )
      const body = (res.body ?? {}) as { data?: GraphInsight[] }
      out.push({
        platform: 'instagram',
        postId,
        views: insightValue(body.data, 'reach'),
        likes: insightValue(body.data, 'likes'),
        comments: insightValue(body.data, 'comments'),
        shares: insightValue(body.data, 'shares'),
        saves: insightValue(body.data, 'saved'),
        capturedAt,
      })
    }
    return out
  }
}
