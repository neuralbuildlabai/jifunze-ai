import { Link } from 'react-router-dom'
import type { ExtendedPublicLibraryKey } from '../../data/learning/extendedPublicLibraryConfigs'
import { EXTENDED_PUBLIC_LIBRARY_CONFIGS } from '../../data/learning/extendedPublicLibraryConfigs'
import {
  STANDALONE_COURSE_DISCOVERY_META,
  pitchLabel,
  type StandaloneCourseDiscoveryMeta,
} from '../../data/learning/standaloneCourseDiscoveryMeta'
import { getStandaloneCourseScanStats, firstPublicLessonPreviewLinks } from '../../data/learning/standaloneCourseScanStats'
import { paletteForStandaloneCourse } from '../../data/learning/standaloneCoursePalettes'
import { DiscoveryBadgeChips } from './DiscoveryBadgeChips'

function metaForKey(key: ExtendedPublicLibraryKey): StandaloneCourseDiscoveryMeta | null {
  if (key in STANDALONE_COURSE_DISCOVERY_META) {
    return STANDALONE_COURSE_DISCOVERY_META[key as keyof typeof STANDALONE_COURSE_DISCOVERY_META]
  }
  return null
}

export function StandaloneCourseDiscoveryCard(props: {
  libraryKey: ExtendedPublicLibraryKey
  testId?: string
  /** Light cards match the flagship catalog surface; dark matches legacy category pages. */
  tone?: 'dark' | 'light'
}) {
  const { libraryKey, testId, tone = 'dark' } = props
  const cfg = EXTENDED_PUBLIC_LIBRARY_CONFIGS[libraryKey]
  const meta = metaForKey(libraryKey)
  const landing = cfg.landingPath
  if (!landing) return null

  const scan = getStandaloneCourseScanStats(cfg.curriculum)
  const previews = firstPublicLessonPreviewLinks(cfg.publicBasePath, cfg.curriculum, 2)

  const palette = paletteForStandaloneCourse(libraryKey)

  const cardSurface =
    tone === 'light'
      ? 'rounded-2xl border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)] shadow-[var(--jf-shadow-soft)] ring-1 ring-black/[0.03]'
      : palette?.discoveryCardClass ?? 'rounded-2xl border border-white/[0.06] bg-[rgba(18,16,26,0.55)]'

  const eyebrowCls = tone === 'light' ? 'text-[color:var(--jf-muted)]' : 'text-zinc-500'
  const titleCls = tone === 'light' ? 'text-[color:var(--jf-text)]' : 'text-white'
  const metaCls = tone === 'light' ? 'text-[color:var(--jf-muted)]' : 'text-zinc-500'
  const bodyCls = tone === 'light' ? 'text-[color:var(--jf-muted)]' : 'text-zinc-400'
  const badgeTone = tone === 'light' ? 'border-[color:var(--jf-border)] bg-[color:var(--jf-bg-page)] text-[color:var(--jf-text)]' : palette?.badgeClass ?? 'border-violet-400/20 bg-violet-500/[0.08] text-violet-200/85'
  const previewBox =
    tone === 'light'
      ? 'rounded-xl border border-[color:var(--jf-border)] bg-[color:var(--jf-bg-page)] p-3'
      : 'rounded-xl border border-white/[0.06] bg-black/20 p-3'
  const previewLink = tone === 'light' ? 'text-[color:var(--jf-text)] underline-offset-2 hover:underline' : 'text-[12px] font-semibold text-violet-300/95 hover:text-violet-200'
  const footerBorder = tone === 'light' ? 'border-[color:var(--jf-border)]' : 'border-white/[0.06]'
  const primaryLink = tone === 'light' ? 'font-semibold text-[color:var(--jf-text)] underline-offset-2 hover:underline' : 'font-semibold text-violet-300/95 hover:text-violet-200'
  const secondaryLink = tone === 'light' ? 'font-medium text-[color:var(--jf-muted)] hover:text-[color:var(--jf-text)]' : 'font-medium text-zinc-500 hover:text-zinc-200'

  return (
    <article className={`flex flex-col p-5 ${cardSurface}`} data-testid={testId ?? `discovery-standalone-${libraryKey}`}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className={`text-[10px] font-semibold uppercase tracking-[0.18em] ${eyebrowCls}`}>{cfg.catalogEyebrow ?? 'Standalone course'}</p>
          <p className={`mt-2 text-[15px] font-semibold ${titleCls}`}>{cfg.title}</p>
        </div>
        {meta ? (
          <p className={`shrink-0 rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] ${badgeTone}`}>
            {pitchLabel(meta.pitch)}
          </p>
        ) : null}
      </div>

      {meta ? (
        <div className="mt-3">
          <DiscoveryBadgeChips tokens={meta.badges} tone={tone} />
        </div>
      ) : null}

      <p className={`mt-3 text-[12px] leading-relaxed ${metaCls}`}>
        {scan.moduleCount} modules · {scan.lessonCount} lessons · {scan.publicPreviewLessonCount} free preview lessons (where labeled)
      </p>

      <p className={`mt-2 line-clamp-4 text-[13px] leading-relaxed ${bodyCls}`}>{cfg.subtitle}</p>

      {meta ? <p className={`mt-3 text-[12px] leading-relaxed ${metaCls}`}>Who it&apos;s for: {meta.audience}</p> : null}

      {previews.length ? (
        <div className={`mt-4 ${previewBox}`}>
          <p className={`text-[10px] font-semibold uppercase tracking-[0.18em] ${eyebrowCls}`}>Free previews</p>
          <ul className="mt-2 space-y-2">
            {previews.map((p) => (
              <li key={p.href}>
                <Link className={`text-[12px] ${previewLink}`} to={p.href}>
                  Preview: {p.title} →
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className={`mt-4 flex flex-wrap gap-x-4 gap-y-2 border-t pt-4 text-[12px] ${footerBorder}`}>
        <Link className={primaryLink} to={landing}>
          Course overview →
        </Link>
        <Link className={secondaryLink} to={cfg.publicBasePath}>
          Full curriculum map →
        </Link>
      </div>
    </article>
  )
}
