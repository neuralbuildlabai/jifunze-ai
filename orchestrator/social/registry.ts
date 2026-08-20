/**
 * The adapter registry. One place that knows which adapter serves which platform, so the sync
 * job, the publishing pipeline and the dashboard all agree.
 */
import type { PlatformId } from '../../src/social/platformMatrix.ts'
import { PLATFORM_MATRIX } from '../../src/social/platformMatrix.ts'
import type { AdapterEnv, ConnectionState, PlatformAdapter } from './types.ts'
import { FacebookAdapter } from './adapters/facebook.ts'
import { InstagramAdapter } from './adapters/instagram.ts'
import { LinkedInAdapter } from './adapters/linkedin.ts'
import { PinterestAdapter } from './adapters/pinterest.ts'
import { TelegramAdapter } from './adapters/telegram.ts'
import { ThreadsAdapter } from './adapters/threads.ts'
import { TikTokAdapter } from './adapters/tiktok.ts'
import { WhatsAppChannelAdapter } from './adapters/whatsappChannel.ts'
import { XAdapter } from './adapters/x.ts'
import { YouTubeAdapter } from './adapters/youtube.ts'

const ADAPTERS: Record<PlatformId, PlatformAdapter> = {
  instagram: new InstagramAdapter(),
  facebook: new FacebookAdapter(),
  threads: new ThreadsAdapter(),
  tiktok: new TikTokAdapter(),
  youtube: new YouTubeAdapter(),
  linkedin: new LinkedInAdapter(),
  x: new XAdapter(),
  pinterest: new PinterestAdapter(),
  telegram: new TelegramAdapter(),
  whatsapp_channel: new WhatsAppChannelAdapter(),
}

export function adapterFor(platform: PlatformId): PlatformAdapter {
  return ADAPTERS[platform]
}

export function allAdapters(): PlatformAdapter[] {
  return PLATFORM_MATRIX.map((p) => ADAPTERS[p.id])
}

/** Every platform's live connection state. Contains env-var NAMES only, never values. */
export function connectionReport(env: AdapterEnv): ConnectionState[] {
  return allAdapters().map((a) => a.validateConnection(env))
}
