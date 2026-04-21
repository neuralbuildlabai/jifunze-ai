import type { FlagshipCourseCurriculum } from '@/data/learning/flagshipCourseCurricula'
import type { FlagshipSession } from '@/data/learning/flagshipCourseSessions'
import {
  isSupportMaterialUnlocked,
  supportMaterialsForCourse,
  type FlagshipSupportMaterial,
} from '@/learner/flagshipSupportMaterials'
import type { FlagshipCourseProgressApi } from '@/hooks/useFlagshipCourseProgress'

function MaterialRow(props: {
  material: FlagshipSupportMaterial
  unlocked: boolean
  courseSlug: string
}) {
  const { material, unlocked, courseSlug } = props
  const printId = `jf-support-${courseSlug}-${material.id}`
  return (
    <li className="flex flex-col gap-2 rounded-xl border border-[color:var(--jf-border)] bg-[color:var(--jf-bg-page)] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <p className="text-[13px] font-medium text-[color:var(--jf-text)]">{material.title}</p>
        <p className="mt-1 text-[12px] leading-relaxed text-[color:var(--jf-muted)]">{material.description}</p>
        {!unlocked ? (
          <p className="mt-2 text-[11px] text-[color:var(--jf-subtle)]">
            {material.kind === 'capstone_prep'
              ? 'Unlocks when capstone preparation opens for you.'
              : 'Unlocks when you reach progress in this module.'}
          </p>
        ) : null}
      </div>
      <div className="shrink-0">
        {unlocked ? (
          <button
            type="button"
            className="inline-flex min-h-[2.5rem] items-center justify-center rounded-full border border-[color:var(--jf-border)] px-4 py-2 text-[12px] font-semibold text-[color:var(--jf-text)] hover:bg-white/[0.05]"
            onClick={() => {
              const node = document.getElementById(printId)
              if (!node) return
              const w = window.open('', '_blank')
              if (!w) return
              w.document.write(`<!DOCTYPE html><html><head><title>${material.title}</title></head><body>${node.innerHTML}</body></html>`)
              w.document.close()
              w.focus()
              w.print()
              w.close()
            }}
          >
            Print / save as PDF
          </button>
        ) : (
          <span className="inline-flex min-h-[2.5rem] items-center rounded-full border border-[color:var(--jf-border)] px-4 py-2 text-[11px] font-medium text-[color:var(--jf-subtle)]">
            Locked
          </span>
        )}
      </div>
      {unlocked ? (
        <div id={printId} className="hidden" aria-hidden>
          <article className="prose prose-invert max-w-none">
            <h1>{material.title}</h1>
            <p>{material.description}</p>
            <p className="text-sm text-neutral-600">
              Jifunze support sheet · {courseSlug} · generated from your progress context for offline review.
            </p>
          </article>
        </div>
      ) : null}
    </li>
  )
}

export function FlagshipSupportMaterials(props: {
  courseSlug: string
  curriculum: FlagshipCourseCurriculum
  sessions: FlagshipSession[]
  progress: FlagshipCourseProgressApi
}) {
  const { courseSlug, curriculum, sessions, progress } = props
  const mats = supportMaterialsForCourse(courseSlug, curriculum)

  return (
    <section className="mt-14" aria-labelledby="support-materials-heading">
      <h2 id="support-materials-heading" className="text-lg font-semibold tracking-tight text-[color:var(--jf-text)]">
        Support materials
      </h2>
      <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-[color:var(--jf-muted)]">
        Printable summaries for revision—not a substitute for guided work on the platform. Sheets unlock as you earn progress.
      </p>
      <ul className="mt-6 space-y-3">
        {mats.map((m) => (
          <MaterialRow
            key={m.id}
            material={m}
            unlocked={isSupportMaterialUnlocked(m, progress, sessions)}
            courseSlug={courseSlug}
          />
        ))}
      </ul>
    </section>
  )
}
