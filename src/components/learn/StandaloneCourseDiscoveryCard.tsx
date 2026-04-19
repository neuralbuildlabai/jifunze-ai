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
}) {
  const { libraryKey, testId } = props
  const cfg = EXTENDED_PUBLIC_LIBRARY_CONFIGS[libraryKey]
  const meta = metaForKey(libraryKey)
  const landing = cfg.landingPath
  if (!landing) return null

  const scan = getStandaloneCourseScanStats(cfg.curriculum)
  const previews = firstPublicLessonPreviewLinks(cfg.publicBasePath, cfg.curriculum, 2)

  const palette = paletteForStandaloneCourse(libraryKey)

  return (
    <article
      className={`flex flex-col p-5 ${palette?.discoveryCardClass ?? 'rounded-2xl border border-white/[0.06] bg-[rgba(18,16,26,0.55)]'}`}
      data-testid={testId ?? `discovery-standalone-${libraryKey}`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500">{cfg.catalogEyebrow ?? 'Standalone course'}</p>
          <p className="mt-2 text-[15px] font-semibold text-white">{cfg.title}</p>
        </div>
        {meta ? (
          <p
            className={`shrink-0 rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] ${
              palette?.badgeClass ?? 'border-violet-400/20 bg-violet-500/[0.08] text-violet-200/85'
            }`}
          >
            {pitchLabel(meta.pitch)}
          </p>
        ) : null}
      </div>

      {meta ? (
        <div className="mt-3">
          <DiscoveryBadgeChips tokens={meta.badges} />
        </div>
      ) : null}

      <p className="mt-3 text-[12px] leading-relaxed text-zinc-500">
        {scan.moduleCount} modules · {scan.lessonCount} lessons · {scan.publicPreviewLessonCount} free preview lessons (where labeled)
      </p>

      <p className="mt-2 line-clamp-4 text-[13px] leading-relaxed text-zinc-400">{cfg.subtitle}</p>

      {meta ? <p className="mt-3 text-[12px] leading-relaxed text-zinc-500">Who it&apos;s for: {meta.audience}</p> : null}

      {previews.length ? (
        <div className="mt-4 rounded-xl border border-white/[0.06] bg-black/20 p-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500">Free previews</p>
          <ul className="mt-2 space-y-2">
            {previews.map((p) => (
              <li key={p.href}>
                <Link className="text-[12px] font-semibold text-violet-300/95 hover:text-violet-200" to={p.href}>
                  Preview: {p.title} →
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 border-t border-white/[0.06] pt-4 text-[12px]">
        <Link className="font-semibold text-violet-300/95 hover:text-violet-200" to={landing}>
          Course overview →
        </Link>
        <Link className="font-medium text-zinc-500 hover:text-zinc-200" to={cfg.publicBasePath}>
          Full curriculum map →
        </Link>
      </div>
    </article>
  )
}
