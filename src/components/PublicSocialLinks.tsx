import type { SocialAccount, SocialPlatformId } from '../social/socialAccounts'
import { OFFICIAL_SOCIAL_ACCOUNTS } from '../social/socialAccounts'

/**
 * The official Jifunze.ai social accounts, rendered.
 *
 * The account list lives in `src/social/socialAccounts.ts` so the footer, the /social directory,
 * the Organization JSON-LD and the sitemap can never disagree. GitHub is deliberately absent —
 * it is not a social profile for this brand.
 *
 * Every link opens in a new tab with `rel="noreferrer noopener"`, carries an accessible label that
 * names both the platform and the handle, and is reachable and visible on keyboard focus.
 */

type IconProps = { className?: string }

/**
 * Simple geometric marks. Deliberately not the platforms' trademarked logo artwork: each is a
 * plain, recognisable shape drawn in `currentColor` so it inherits contrast from the surface.
 */
function PlatformIcon({ id, className }: { id: SocialPlatformId } & IconProps) {
  const common = {
    className,
    viewBox: '0 0 24 24',
    'aria-hidden': true,
    focusable: 'false' as const,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }
  switch (id) {
    case 'instagram':
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="5.5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'tiktok':
      return (
        <svg {...common}>
          <path d="M14.5 3.5v10.7a3.6 3.6 0 1 1-3.1-3.57" />
          <path d="M14.5 5.2A5 5 0 0 0 19 8.4" />
        </svg>
      )
    case 'threads':
      return (
        <svg {...common}>
          <path d="M16.4 8.9C15.7 7.2 14.1 6.3 12 6.3c-3.4 0-5.4 2.4-5.4 5.8s2 5.6 5.4 5.6c2.7 0 4.5-1.4 5.1-3.6" />
          <path d="M9.6 13.2c0-1.2 1.1-1.9 2.7-1.9 2.4 0 3.6 1.1 3.6 2.7 0 1.5-1.1 2.5-2.6 2.5-1.5 0-2.4-.8-2.7-2.2" />
        </svg>
      )
    case 'youtube':
      return (
        <svg {...common}>
          <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
          <path d="M10.4 9.7v4.6l4-2.3z" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'facebook':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M13.9 8.4h-1.2c-.9 0-1.4.5-1.4 1.4V11h2.5l-.4 2.3h-2.1v4.4" />
          <path d="M9.7 11h1.6" />
        </svg>
      )
    case 'x':
      return (
        <svg {...common}>
          <path d="M4.6 4.6 19.4 19.4" />
          <path d="M19.4 4.6 4.6 19.4" />
        </svg>
      )
    case 'linkedin':
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="4" />
          <path d="M7.4 10.4v6.2" />
          <circle cx="7.4" cy="7.6" r="1" fill="currentColor" stroke="none" />
          <path d="M11.4 16.6v-6.2M11.4 12.6c0-1.3.9-2.2 2.2-2.2s2.2.9 2.2 2.2v4" />
        </svg>
      )
    case 'pinterest':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M10.6 19.2 12.4 12" />
          <path d="M10.1 14.3c-.7-.8-1-1.9-.7-3 .4-1.6 1.8-2.6 3.5-2.4 1.7.2 2.7 1.5 2.4 3.2-.3 1.7-1.5 2.7-2.8 2.4-.7-.2-1.1-.8-1-1.4" />
        </svg>
      )
    default:
      return null
  }
}

export type PublicSocialLinksProps = {
  /** `compact` is the footer/inline treatment; `cards` is the /social directory treatment. */
  variant?: 'compact' | 'cards'
  /** Restrict to a subset, in this order. Defaults to every official account. */
  only?: readonly SocialPlatformId[]
  className?: string
  /** Accessible name for the surrounding nav landmark. */
  label?: string
}

export function PublicSocialLinks({
  variant = 'compact',
  only,
  className = '',
  label = 'Jifunze.AI on social media',
}: PublicSocialLinksProps) {
  const accounts: readonly SocialAccount[] = only
    ? only
        .map((id) => OFFICIAL_SOCIAL_ACCOUNTS.find((a) => a.id === id))
        .filter((a): a is SocialAccount => Boolean(a))
    : OFFICIAL_SOCIAL_ACCOUNTS

  if (variant === 'cards') {
    return (
      <nav aria-label={label} className={className}>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {accounts.map((a) => (
            <li key={a.id}>
              <a
                href={a.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`${a.name}, ${a.handle} — opens in a new tab`}
                className="group flex min-h-[4.5rem] items-center gap-3.5 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 transition hover:border-[#7C3AED]/60 hover:bg-white/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B5CF6]"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#7C3AED]/15 text-[#C4B5FD] group-hover:text-white">
                  <PlatformIcon id={a.id} className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-white">{a.name}</span>
                  <span className="block truncate text-[13px] text-zinc-400">{a.handle}</span>
                  <span className="mt-0.5 block text-[12px] leading-snug text-zinc-500">{a.purpose}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    )
  }

  return (
    <nav aria-label={label} className={className}>
      <ul className="flex flex-wrap items-center gap-2">
        {accounts.map((a) => (
          <li key={a.id}>
            <a
              href={a.href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`${a.name}, ${a.handle} — opens in a new tab`}
              className="inline-flex min-h-[2.5rem] items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[13px] text-zinc-300 transition hover:border-[#7C3AED]/60 hover:bg-white/[0.08] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B5CF6]"
            >
              <PlatformIcon id={a.id} className="h-4 w-4" />
              <span>{a.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
