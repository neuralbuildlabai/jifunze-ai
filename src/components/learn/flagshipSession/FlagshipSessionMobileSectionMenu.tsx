import type { LessonSectionNavItem } from '../../../lib/flagshipSessionLessonFlow'

export function FlagshipSessionMobileSectionMenu({
  navItems,
  navTitle = 'This session',
}: {
  navItems: LessonSectionNavItem[]
  navTitle?: string
}) {
  return (
    <details className="mb-6 rounded-lg border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)] px-3 py-2 shadow-sm lg:hidden">
      <summary className="cursor-pointer list-none text-[12px] font-semibold text-[color:var(--jf-text)] marker:content-none [&::-webkit-details-marker]:hidden">
        {navTitle}
        <span className="ml-2 text-[11px] font-normal text-[color:var(--jf-muted)]">· jump in-page</span>
      </summary>
      <ul className="mt-2 max-h-[50vh] space-y-1 overflow-y-auto border-t border-[color:var(--jf-border)] pt-2">
        {navItems.map((item) => (
          <li key={item.anchorId}>
            <a
              href={`#${item.anchorId}`}
              className="block rounded-md px-2 py-1.5 text-[12px] text-[color:var(--jf-muted)] hover:bg-stone-50 hover:text-[color:var(--jf-text)]"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </details>
  )
}
