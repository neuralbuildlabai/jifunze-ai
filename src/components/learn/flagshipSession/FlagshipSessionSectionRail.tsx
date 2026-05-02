import type { LessonSectionNavItem } from '../../../lib/flagshipSessionLessonFlow'

export function FlagshipSessionSectionRail(props: { navItems: LessonSectionNavItem[] }) {
  const { navItems } = props

  return (
    <nav
      aria-label="Lesson sections"
      data-testid="flagship-session-curated-nav"
      className="border-b border-white/[0.06] pb-6 lg:border-b-0 lg:pb-0"
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[color:var(--jf-subtle)]">Lesson sections</p>
      <ul className="mt-2 space-y-1.5">
        {navItems.map((item) => (
          <li key={item.anchorId}>
            <a
              href={`#${item.anchorId}`}
              className="block rounded-md px-1.5 py-1 text-[12px] leading-snug text-[color:var(--jf-muted)] transition hover:bg-white/[0.04] hover:text-[color:var(--jf-text)]"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
