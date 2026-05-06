import { useState } from 'react'
import { LearnSectionSparkIcon } from '../visuals/JifunzeLearnVisuals'
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
    <li className="flex flex-col gap-3 rounded-2xl border border-[color:var(--jf-border)] border-l-[3px] border-l-orange-300/70 bg-[color:var(--jf-surface)] px-4 py-4 shadow-[var(--jf-shadow-soft)] sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:py-4">
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
            className="inline-flex min-h-[2.5rem] items-center justify-center rounded-full border border-[color:var(--jf-border)] bg-white px-4 py-2 text-[12px] font-semibold text-[color:var(--jf-text)] shadow-sm transition hover:bg-stone-50"
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
  /** When true, list stays closed until the learner expands it (Course 1 overview). */
  collapsedByDefault?: boolean
}) {
  const { courseSlug, curriculum, sessions, progress, collapsedByDefault } = props
  const mats = supportMaterialsForCourse(courseSlug, curriculum)
  const [open, setOpen] = useState(!collapsedByDefault)

  return (
    <section
      className="mt-14 rounded-2xl border border-[color:var(--jf-border)] bg-gradient-to-b from-orange-50/40 via-white to-stone-50/30 p-5 shadow-[var(--jf-shadow-soft)] sm:p-7"
      aria-labelledby="support-materials-heading"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2
            id="support-materials-heading"
            className="flex flex-wrap items-center gap-2 text-lg font-semibold tracking-tight text-[color:var(--jf-text)]"
          >
            <LearnSectionSparkIcon className="h-6 w-6 shrink-0" />
            Support materials
          </h2>
          <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-[color:var(--jf-muted)]">
            {collapsedByDefault
              ? 'Support materials unlock as you progress. Printable sheets are for your notes—not a substitute for doing the work on the platform.'
              : 'Printable summaries for revision—not a substitute for guided work on the platform. Sheets unlock as you earn progress.'}
          </p>
        </div>
        {collapsedByDefault ? (
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="inline-flex min-h-[2.5rem] shrink-0 items-center rounded-full border border-[color:var(--jf-border)] bg-white px-4 text-[12px] font-semibold text-[color:var(--jf-text)] shadow-sm transition hover:bg-stone-50"
            aria-expanded={open}
          >
            {open ? 'Hide list' : 'Show list'}
          </button>
        ) : null}
      </div>
      {open ? (
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
      ) : null}
    </section>
  )
}
