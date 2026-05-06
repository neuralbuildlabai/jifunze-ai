import type { LessonSectionNavItem } from '../../../lib/flagshipSessionLessonFlow'

export function FlagshipSessionSectionRail(props: { navItems: LessonSectionNavItem[]; navTitle?: string }) {
  const { navItems, navTitle = 'This session' } = props

  return (
    <nav
      aria-label={navTitle}
      data-testid="flagship-session-curated-nav"
      className="border-b border-[color:var(--jf-border)] pb-5 lg:border-b-0 lg:pb-0"
    >
      <p className="text-[12px] font-medium text-[color:var(--jf-muted)]">{navTitle}</p>
      <ul className="mt-2 space-y-1" data-testid="flagship-session-curated-nav-links">
        {navItems.map((item) => (
          <li key={item.anchorId}>
            <a
              href={`#${item.anchorId}`}
              className="block rounded-md px-1.5 py-1 text-[12px] leading-snug text-[color:var(--jf-muted)] transition hover:bg-stone-50 hover:text-[color:var(--jf-text)]"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
