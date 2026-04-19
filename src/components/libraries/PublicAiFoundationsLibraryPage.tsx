import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  curriculumStats,
  listPublicStarterLessons,
} from '../../data/learning/aiEverydayWorkCurriculum'
import type { CurriculumLesson } from '../../data/learning/aiEverydayWorkCurriculum'
import {
  AI_FOUNDATIONS_LIBRARY,
  PUBLIC_AI_FOUNDATIONS_BASE_PATH,
} from '../../data/publicStarterLibraries/aiFoundations'
import { AI_EVERYDAY_WORK_CURRICULUM } from '../../data/learning/aiEverydayWorkCurriculum'
import { LEGAL_ROUTES } from '../../training/trustCopy'
import { useAiCurriculumLocalProgress } from '../../hooks/useAiCurriculumLocalProgress'
import { PublicStarterLibraryChrome } from './PublicStarterLibraryChrome'
import { recordTeachingSignal } from '../../data/teaching/teachingSignals'

function accessLabel(lesson: CurriculumLesson) {
  if (lesson.access === 'public') return 'Public reader'
  if (lesson.access === 'signed_in') return 'Signed-in reader'
  return 'Deeper access (plans)'
}

export function PublicAiFoundationsLibraryPage() {
  const stats = curriculumStats()
  const { completedSet } = useAiCurriculumLocalProgress()

  useEffect(() => {
    recordTeachingSignal({
      kind: 'library_catalog_view',
      payload: { libraryKey: 'ai_foundations', surface: 'library_index', schemaVersion: 1 },
    })
  }, [])
  const publicStarters = listPublicStarterLessons()
  const completedPublicCount = publicStarters.filter((l) => completedSet.has(l.slug)).length

  return (
    <PublicStarterLibraryChrome
      eyebrow="AI library family"
      title={AI_FOUNDATIONS_LIBRARY.title}
      description={AI_FOUNDATIONS_LIBRARY.description}
    >
      <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5 sm:p-6">
        <p className="text-[13px] leading-relaxed text-zinc-300">{AI_FOUNDATIONS_LIBRARY.subtitle}</p>
        <p className="mt-3 text-[13px] leading-relaxed text-zinc-400">{AI_FOUNDATIONS_LIBRARY.audience}</p>
        <p className="mt-4 rounded-xl border border-violet-400/15 bg-violet-500/[0.06] px-4 py-3 text-[13px] leading-relaxed text-zinc-300">
          <span className="font-semibold text-violet-200/90">Library map: </span>
          {stats.categories} categories · {stats.modules} modules · {stats.lessons} lessons · {stats.publicLessons} public starter
          readers · {stats.signedInLessons} signed-in lessons · {stats.premiumLessons} deeper/premium lessons (availability varies by
          plan).
        </p>
        <p className="mt-4 rounded-xl border border-white/[0.06] bg-black/15 px-4 py-3 text-[13px] leading-relaxed text-zinc-400">
          <span className="font-semibold text-zinc-300">Progression: </span>
          {AI_FOUNDATIONS_LIBRARY.progressionCue}
        </p>
        <p className="mt-4 text-[12px] leading-relaxed text-zinc-600">
          Your marks:{' '}
          <span className="font-semibold text-zinc-400">
            {completedPublicCount}/{publicStarters.length}
          </span>{' '}
          public starter lessons marked complete on this device (optional—local only).
        </p>
      </div>

      <div className="mt-10 space-y-14">
        {AI_EVERYDAY_WORK_CURRICULUM.map((cat) => (
          <section key={cat.id} id={`category-${cat.id}`} className="scroll-mt-28">
            <div className="border-b border-white/[0.06] pb-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                Category {cat.order} · {cat.modules.length} modules
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">{cat.title}</h2>
              <p className="mt-2 max-w-3xl text-[13px] leading-relaxed text-zinc-400">{cat.summary}</p>
            </div>

            <div className="mt-8 space-y-10">
              {cat.modules.map((mod) => (
                <section key={mod.slug} id={`module-${mod.slug}`} className="scroll-mt-28">
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
                    {mod.lessons.map((lesson) => (
                      <li key={lesson.slug}>
                        <Link
                          to={`${PUBLIC_AI_FOUNDATIONS_BASE_PATH}/${lesson.slug}`}
                          className="group flex gap-4 rounded-2xl border border-white/[0.06] bg-[rgba(18,16,26,0.45)] p-4 transition hover:border-violet-400/22 hover:bg-[rgba(22,18,32,0.65)] sm:p-5"
                        >
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.03] text-sm font-semibold text-zinc-300">
                            {lesson.order}
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <p className="mt-1 text-[16px] font-semibold text-white group-hover:text-violet-100">{lesson.title}</p>
                              <span className="rounded-full border border-white/[0.08] bg-black/25 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-400">
                                {accessLabel(lesson)}
                              </span>
                              {completedSet.has(lesson.slug) ? (
                                <span className="rounded-full border border-emerald-400/25 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-200/90">
                                  Marked complete
                                </span>
                              ) : null}
                            </div>
                            <p className="mt-1 text-[13px] leading-relaxed text-zinc-400">{lesson.summary}</p>
                          </div>
                          <span className="hidden shrink-0 self-center text-sm font-medium text-violet-300/90 sm:inline">
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
        Instructional material is assistive only—verify facts and follow your organization&apos;s policies. Signed-in and premium
        lessons may show previews until eligible access is available on your account.
      </p>
      <p className="mt-4 text-[11px] leading-relaxed text-zinc-600">
        <Link to={LEGAL_ROUTES.disclaimer} className="font-medium text-violet-300/85 underline-offset-2 hover:underline">
          Full disclaimer
        </Link>
      </p>
    </PublicStarterLibraryChrome>
  )
}
