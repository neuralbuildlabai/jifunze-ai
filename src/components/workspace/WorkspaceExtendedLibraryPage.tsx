import { Link } from 'react-router-dom'
import type { CurriculumLesson } from '../../data/learning/aiEverydayWorkCurriculum'
import type { TeachingLibraryId } from '../../data/teaching/teachingTypes'
import { flattenLessonsForCurriculum } from '../../data/learning/extendedLibrariesCurricula'
import type { ExtendedPublicLibraryConfig } from '../../data/learning/extendedPublicLibraryConfigs'
import { LEARNER_MONETIZATION_UI_DISABLED } from '../../learner/learnerCommerceConstants'
import { LEGAL_ROUTES } from '../../training/trustCopy'
import { CurriculumDepthSection } from '../libraries/CurriculumDepthSection'

function accessBadge(lesson: CurriculumLesson): string {
  if (lesson.access === 'public') return 'Public reader'
  if (lesson.access === 'signed_in') return 'Signed-in reader'
  return 'Deeper access (eligible plans)'
}

export function WorkspaceExtendedLibraryPage({ config }: { config: ExtendedPublicLibraryConfig }) {
  const lessons = flattenLessonsForCurriculum(config.curriculum)
  const publicLessons = lessons.filter((l) => l.access === 'public').length
  const signedInLessons = lessons.filter((l) => l.access === 'signed_in').length
  const premiumLessons = lessons.filter((l) => l.access === 'premium').length
  const isStandaloneCourse = String(config.key).startsWith('course_')

  return (
    <div>
      <header className="border-b border-white/[0.06] pb-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
          {isStandaloneCourse ? 'Standalone course workspace map' : 'Extended curriculum library'}
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">{config.title}</h1>
        <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-zinc-400">{config.description}</p>
        <p className="mt-3 max-w-3xl text-[14px] leading-relaxed text-zinc-500">{config.subtitle}</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            to={config.publicBasePath}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-xl bg-violet-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-950/25 transition hover:bg-violet-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400/60"
          >
            Open public browse (shareable)
          </Link>
          {LEARNER_MONETIZATION_UI_DISABLED ? (
            <p className="max-w-md text-[12px] leading-relaxed text-zinc-500">
              Paid checkout is not active in this release—open the public browse map above.
            </p>
          ) : (
            <>
              <Link
                to="/pricing"
                className="inline-flex items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-zinc-200 transition hover:border-violet-400/25 hover:bg-white/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400/55"
              >
                Unlock deeper materials on pricing
              </Link>
              <Link
                to="/settings/subscription"
                className="inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-medium text-zinc-500 transition hover:text-zinc-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400/55"
              >
                Manage subscription or bundles
              </Link>
            </>
          )}
          <Link
            to="/library"
            className="inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-medium text-zinc-500 transition hover:text-zinc-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400/55"
          >
            ← Library overview
          </Link>
        </div>
      </header>

      <CurriculumDepthSection libraryId={config.key as TeachingLibraryId} className="mt-10" />

      <section className="mt-10 rounded-2xl border border-white/[0.06] bg-white/[0.025] p-5 sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/[0.05] pb-5">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">Inventory · same map as public browse</p>
            <h2 className="mt-2 text-lg font-semibold text-white">{config.title}</h2>
            <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-zinc-400">
              {config.curriculum.length} categories · {lessons.length} lessons · {publicLessons} public starter readers ·{' '}
              {signedInLessons} signed-in lessons · {premiumLessons} deeper lessons (eligible plans may apply).
            </p>
          </div>
          <Link
            to={config.publicBasePath}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 text-sm font-semibold text-violet-300/95 hover:text-violet-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400/55"
          >
            Open public index →
          </Link>
        </div>
        <ul className="mt-5 grid gap-3 text-[13px] text-zinc-500 sm:grid-cols-2">
          <li className="flex gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400/55" aria-hidden />
            Deep-learning readers use structured sections (concept → application → traps → revision → checkpoints → continuity).
          </li>
          <li className="flex gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400/55" aria-hidden />
            Lab-ready framing is included where practical—future hands-on exercises can attach without rewriting the spine.
          </li>
          <li className="flex gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400/55" aria-hidden />
            Public route:{' '}
            <span className="font-mono text-[11px] text-zinc-400">{config.publicBasePath}</span>
          </li>
          <li className="flex gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400/55" aria-hidden />
            Paid access expands materials and limits—not mastery, certification, exams, or hiring guarantees.
          </li>
        </ul>
      </section>

      <section className="mt-12">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">Signed-in continuation map</p>
            <h2 className="mt-2 text-xl font-semibold text-white">Browse categories and lessons</h2>
            <p className="mt-2 max-w-3xl text-[14px] leading-relaxed text-zinc-400">
              Lessons open on the public reader routes—your account unlocks signed-in and premium layers where eligible. Use this page
              as the workspace anchor for the family.
            </p>
          </div>
        </div>

        <div className="mt-8 space-y-12">
          {config.curriculum.map((cat) => (
            <section key={cat.id} className="scroll-mt-28">
              <div className="border-b border-white/[0.06] pb-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                  Category {cat.order} · {cat.modules.length} modules
                </p>
                <h3 className="mt-2 text-xl font-semibold tracking-tight text-white">{cat.title}</h3>
                <p className="mt-2 max-w-3xl text-[13px] leading-relaxed text-zinc-400">{cat.summary}</p>
              </div>

              <div className="mt-6 space-y-8">
                {cat.modules.map((mod) => (
                  <section key={mod.slug}>
                    <div className="flex flex-wrap items-end justify-between gap-3 border-b border-white/[0.06] pb-3">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                          Module {mod.order} · {mod.lessons.length} lessons
                        </p>
                        <h4 className="mt-1 text-lg font-semibold text-white">{mod.title}</h4>
                        <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-zinc-500">{mod.summary}</p>
                      </div>
                    </div>
                    <ul className="mt-4 space-y-2">
                      {mod.lessons.map((lesson, idx) => (
                        <li key={lesson.slug}>
                          <Link
                            to={`${config.publicBasePath}/${lesson.slug}`}
                            target="_blank"
                            rel="noreferrer"
                            className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/[0.06] bg-[rgba(18,16,26,0.45)] px-4 py-3 text-left transition hover:border-violet-400/22 hover:bg-[rgba(22,18,32,0.65)] sm:px-5"
                          >
                            <div className="min-w-0">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="font-mono text-[11px] text-zinc-600">
                                  {cat.order}.{mod.order}.{idx + 1}
                                </span>
                                <span className="text-[14px] font-semibold text-white">{lesson.title}</span>
                                <span className="rounded-full border border-white/[0.08] bg-black/25 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-400">
                                  {accessBadge(lesson)}
                                </span>
                              </div>
                              <p className="mt-1 text-[12px] leading-relaxed text-zinc-500">{lesson.summary}</p>
                            </div>
                            <span className="shrink-0 text-sm font-semibold text-violet-300/90">Open →</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 sm:p-6">
        <h2 className="text-sm font-semibold text-white">Access rules (claim-safe)</h2>
        <ul className="mt-3 space-y-2 text-[13px] leading-relaxed text-zinc-400">
          <li>
            <span className="text-zinc-300">Free starter layer: </span>
            category/module 1 reads publicly—no account required for that browse depth.
          </li>
          <li>
            <span className="text-zinc-300">Signed-in layer: </span>
            unlocks additional readers when you are signed in (workspace continuity).
          </li>
          <li>
            <span className="text-zinc-300">Paid layer: </span>
            eligible subscriptions or bundles may unlock premium-depth lessons—materials access varies; outcomes do not.
          </li>
        </ul>
        <p className="mt-4 text-[11px] text-zinc-600">
          <Link to={LEGAL_ROUTES.disclaimer} className="font-medium text-violet-300/85 underline-offset-2 hover:underline">
            Full disclaimer
          </Link>
        </p>
      </section>
    </div>
  )
}
