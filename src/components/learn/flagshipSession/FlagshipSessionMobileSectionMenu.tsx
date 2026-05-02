import type { LessonSectionNavItem } from '../../../lib/flagshipSessionLessonFlow'

export function FlagshipSessionMobileSectionMenu({ navItems }: { navItems: LessonSectionNavItem[] }) {
  return (
    <details className="mb-6 rounded-lg border border-white/[0.08] bg-white/[0.02] px-3 py-2 lg:hidden">
      <summary className="cursor-pointer list-none text-[12px] font-semibold text-[color:var(--jf-text)] marker:content-none [&::-webkit-details-marker]:hidden">
        Lesson sections
        <span className="ml-2 text-[11px] font-normal text-[color:var(--jf-muted)]">· jump in-page</span>
      </summary>
      <ul className="mt-2 max-h-[50vh] space-y-1 overflow-y-auto border-t border-white/[0.06] pt-2">
        {navItems.map((item) => (
          <li key={item.anchorId}>
            <a
              href={`#${item.anchorId}`}
              className="block rounded-md px-2 py-1.5 text-[12px] text-[color:var(--jf-muted)] hover:bg-white/[0.05] hover:text-[color:var(--jf-text)]"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </details>
  )
}
