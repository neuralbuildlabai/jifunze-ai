/**
 * Threads — needs its OWN Meta app with the Threads use case (the Instagram app id and secret do
 * not work), plus app review before non-tester accounts can grant the publishing scopes.
 * Until that exists every call refuses. Nothing is published to Threads by this assignment.
 */
import { BaseAdapter, safeFetchJson } from './base.ts'
import type { AccountMetrics, AdapterEnv, PostMetrics, PublishResult, PublishableContent } from '../types.ts'

const THREADS = 'https://graph.threads.net/v1.0'

export class ThreadsAdapter extends BaseAdapter {
  constructor() {
    super('threads')
  }

  /** Approval gate, not a credential gate: even with a token, publishing is out of scope here. */
  override publish(content: PublishableContent, env: AdapterEnv): Promise<PublishResult> {
    void content
    void env
    return Promise.reject(this.refusal('publish'))
  }

  override async fetchAccountMetrics(env: AdapterEnv): Promise<AccountMetrics> {
    this.requireConnection(env, 'fetchAccountMetrics')
    const userId = env.THREADS_USER_ID!.trim()
    const token = env.THREADS_ACCESS_TOKEN!.trim()
    const res = await safeFetchJson(
      `${THREADS}/${userId}/threads_insights?metric=views,likes,followers_count&access_token=${encodeURIComponent(token)}`,
    )
    const body = (res.body ?? {}) as { data?: Array<{ name?: string; total_value?: { value?: number } }> }
    const pick = (name: string) =>
      body.data?.find((d) => d.name === name)?.total_value?.value ?? null
    return {
      platform: 'threads',
      followers: pick('followers_count'),
      views: pick('views'),
      reach: null,
      engagement: pick('likes'),
      capturedAt: new Date().toISOString(),
    }
  }

  override async fetchPostMetrics(postIds: readonly string[], env: AdapterEnv): Promise<PostMetrics[]> {
    this.requireConnection(env, 'fetchPostMetrics')
    const token = env.THREADS_ACCESS_TOKEN!.trim()
    const capturedAt = new Date().toISOString()
    const out: PostMetrics[] = []
    for (const postId of postIds) {
      const res = await safeFetchJson(
        `${THREADS}/${postId}/insights?metric=views,likes,replies,reposts&access_token=${encodeURIComponent(token)}`,
      )
      const body = (res.body ?? {}) as { data?: Array<{ name?: string; values?: Array<{ value?: number }> }> }
      const pick = (name: string) => body.data?.find((d) => d.name === name)?.values?.[0]?.value ?? null
      out.push({
        platform: 'threads',
        postId,
        views: pick('views'),
        likes: pick('likes'),
        comments: pick('replies'),
        shares: pick('reposts'),
        saves: null,
        capturedAt,
      })
    }
    return out
  }
}
