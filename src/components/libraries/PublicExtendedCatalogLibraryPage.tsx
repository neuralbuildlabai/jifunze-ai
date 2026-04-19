import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import type { CurriculumLesson } from '../../data/learning/aiEverydayWorkCurriculum'
import { EXTENDED_CATEGORY_ID_TO_LIBRARY_TITLE, flattenLessonsForCurriculum } from '../../data/learning/extendedLibrariesCurricula'
import { LEGAL_ROUTES } from '../../training/trustCopy'
import { recordTeachingSignal } from '../../data/teaching/teachingSignals'
import { PublicStarterLibraryChrome } from './PublicStarterLibraryChrome'
import type { ExtendedPublicLibraryConfig } from '../../data/learning/extendedPublicLibraryConfigs'

function accessLabel(lesson: CurriculumLesson) {
  if (lesson.access === 'public') return 'Public reader'
  if (lesson.access === 'signed_in') return 'Signed-in reader'
  return 'Deeper access (plans)'
}

function accentPanels(accent: ExtendedPublicLibraryConfig['accent']) {
  switch (accent) {
    case 'rose':
      return {
        ribbon: 'border-rose-400/12 bg-rose-500/[0.06]',
        ribbonStrong: 'text-rose-200/85',
        hoverBorder: 'hover:border-rose-400/22',
        hoverTitle: 'group-hover:text-rose-100',
        link: 'text-rose-300/90 group-hover:text-rose-200',
      }
    case 'sky':
      return {
        ribbon: 'border-sky-400/12 bg-sky-500/[0.06]',
        ribbonStrong: 'text-sky-200/85',
        hoverBorder: 'hover:border-sky-400/22',
        hoverTitle: 'group-hover:text-sky-100',
        link: 'text-sky-300/90 group-hover:text-sky-200',
      }
    case 'orange':
      return {
        ribbon: 'border-orange-400/12 bg-orange-500/[0.06]',
        ribbonStrong: 'text-orange-200/85',
        hoverBorder: 'hover:border-orange-400/22',
        hoverTitle: 'group-hover:text-orange-100',
        link: 'text-orange-300/90 group-hover:text-orange-200',
      }
    case 'fuchsia':
      return {
        ribbon: 'border-fuchsia-400/12 bg-fuchsia-500/[0.06]',
        ribbonStrong: 'text-fuchsia-200/85',
        hoverBorder: 'hover:border-fuchsia-400/22',
        hoverTitle: 'group-hover:text-fuchsia-100',
        link: 'text-fuchsia-300/90 group-hover:text-fuchsia-200',
      }
    case 'amber':
    default:
      return {
        ribbon: 'border-amber-400/12 bg-amber-500/[0.06]',
        ribbonStrong: 'text-amber-200/85',
        hoverBorder: 'hover:border-amber-400/22',
        hoverTitle: 'group-hover:text-amber-100',
        link: 'text-amber-300/90 group-hover:text-amber-200',
      }
  }
}

export function PublicExtendedCatalogLibraryPage({ config }: { config: ExtendedPublicLibraryConfig }) {
  const stats = buildStats(config)
  const palette = accentPanels(config.accent)

  useEffect(() => {
    recordTeachingSignal({
      kind: 'library_catalog_view',
      payload: { libraryKey: config.key, surface: 'extended_library_index', schemaVersion: 1 },
    })
  }, [config.key])

  return (
    <PublicStarterLibraryChrome
      eyebrow={config.catalogEyebrow ?? 'Extended curriculum library'}
      browseHref={config.publicBasePath}
      browseLabel={config.browseLabel}
      title={config.title}
      description={config.description}
    >
      {config.landingPath ? (
        <div className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-[12px] leading-relaxed text-zinc-400">
          <Link
            to={config.landingPath}
            className="font-semibold text-violet-300/90 transition hover:text-violet-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400/55"
          >
            ← Course overview
          </Link>
          <span className="hidden sm:inline">·</span>
          <span className="text-zinc-500">
            You are viewing the full lesson map—earlier modules usually make later modules faster to learn.
          </span>
        </div>
      ) : null}
      <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5 sm:p-6">
        <p className="text-[13px] leading-relaxed text-zinc-300">{config.subtitle}</p>
        <p className={`mt-4 rounded-xl border px-4 py-3 text-[13px] leading-relaxed text-zinc-300 ${palette.ribbon}`}>
          <span className={`font-semibold ${palette.ribbonStrong}`}>Deep-learning reader map: </span>
          {stats.categories} categories · {stats.lessons} lessons · {stats.publicLessons} public starter readers ·{' '}
          {stats.signedInLessons} signed-in lessons · {stats.premiumLessons} deeper lessons (eligible plans may apply).
        </p>
        <p className="mt-4 text-[12px] leading-relaxed text-zinc-600">
          Lessons use structured instructional depth sections (concept → application → misconception traps → revision → checkpoints →
          continuity). This is designed for capability growth—not shallow topic browsing.
        </p>
      </div>

      <div className="mt-10 space-y-14">
        {config.curriculum.map((cat) => (
          <section key={cat.id} id={`ext-category-${cat.id}`} className="scroll-mt-28">
            <div className="border-b border-white/[0.06] pb-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                Category {cat.order} · {cat.modules.length} modules
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">{cat.title}</h2>
              <p className="mt-2 max-w-3xl text-[13px] leading-relaxed text-zinc-400">{cat.summary}</p>
              <p className="mt-2 text-[11px] text-zinc-600">
                Library: {EXTENDED_CATEGORY_ID_TO_LIBRARY_TITLE[cat.id] ?? config.title}
              </p>
            </div>

            <div className="mt-8 space-y-10">
              {cat.modules.map((mod) => (
                <section key={mod.slug} id={`ext-module-${mod.slug}`} className="scroll-mt-28">
                  <div className="flex flex-wrap items-end justify-between gap-3 border-b border-white/[0.06] pb-4">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                        Module {mod.order} · {mod.lessons.length} lessons
                      </p>
                      <h3 className="mt-1 text-xl font-semibold tracking-tight text-white">{mod.title}</h3>
                      <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-zinc-400">{mod.summary}</p>
                    </div>
                  </div>
                  <ol className="mt-5 space-y-3">
                    {mod.lessons.map((lesson, lessonIdx) => (
                      <li key={lesson.slug}>
                        <Link
                          to={`${config.publicBasePath}/${lesson.slug}`}
                          className={`group flex gap-4 rounded-2xl border border-white/[0.06] bg-[rgba(18,16,26,0.45)] p-4 transition ${palette.hoverBorder} hover:bg-[rgba(22,18,32,0.65)] sm:p-5`}
                        >
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.03] text-sm font-semibold text-zinc-300">
                            {lessonIdx + 1}
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <p className={`mt-1 text-[16px] font-semibold text-white ${palette.hoverTitle}`}>{lesson.title}</p>
                              <span className="rounded-full border border-white/[0.08] bg-black/25 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-400">
                                {accessLabel(lesson)}
                              </span>
                            </div>
                            <p className="mt-1 text-[13px] leading-relaxed text-zinc-400">{lesson.summary}</p>
                          </div>
                          <span className={`hidden shrink-0 self-center text-sm font-medium sm:inline ${palette.link}`}>
                            Open →
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ol>
                </section>
              ))}
            </div>
          </section>
        ))}
      </div>

      <p className="mt-10 text-[12px] leading-relaxed text-zinc-600">
        Instructional material is assistive—verify anything safety-, policy-, or compliance-sensitive with authoritative sources and
        responsible humans.
      </p>
      <p className="mt-4 text-[11px] leading-relaxed text-zinc-600">
        <Link to={LEGAL_ROUTES.disclaimer} className="font-medium text-violet-300/85 underline-offset-2 hover:underline">
          Full disclaimer
        </Link>
      </p>
    </PublicStarterLibraryChrome>
  )
}

function buildStats(config: ExtendedPublicLibraryConfig) {
  const lessons = flattenLessonsForCurriculum(config.curriculum)
  return {
    categories: config.curriculum.length,
    lessons: lessons.length,
    publicLessons: lessons.filter((l) => l.access === 'public').length,
    signedInLessons: lessons.filter((l) => l.access === 'signed_in').length,
    premiumLessons: lessons.filter((l) => l.access === 'premium').length,
  }
}
