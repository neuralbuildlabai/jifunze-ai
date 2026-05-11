import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { LEGAL_ROUTES, SUPPORT_CONTACT_EMAIL } from '../../training/trustCopy'
import { JifunzeBrandLogo } from '../brand/JifunzeBrandLogo'

/**
 * Shared visual building blocks for Jifunze public surfaces (`/` and `/learn`).
 * Both pages compose these sections so the bright marketplace look stays
 * consistent. Keep all marketing copy and learner-facing language free of
 * pricing, trial, or subscription terms — Jifunze is presented as free-access
 * for now.
 */

export const ORANGE_GRADIENT = 'bg-gradient-to-r from-orange-500 via-orange-500 to-rose-600'
export const ORANGE_GRADIENT_TEXT =
  'bg-gradient-to-r from-orange-600 via-orange-500 to-rose-600 bg-clip-text text-transparent'

/* -------------------------------------------------------------------------- */
/* Icons                                                                      */
/* -------------------------------------------------------------------------- */

export function IconSpark({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2l1.8 5.6h5.9l-4.8 3.5 1.8 5.6L12 13.2 7.3 16.7l1.8-5.6L4.3 7.6h5.9L12 2z" />
    </svg>
  )
}

export function IconClock({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v6l3 2" strokeLinecap="round" />
    </svg>
  )
}

export function IconUsers({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M17 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" strokeLinecap="round" />
    </svg>
  )
}

export function IconStar({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}

export function IconArrowRight({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* -------------------------------------------------------------------------- */
/* Popular categories                                                         */
/* -------------------------------------------------------------------------- */

const POPULAR_CATEGORIES: Array<{
  title: string
  description: string
  to: string
  iconBg: string
}> = [
  {
    title: 'Artificial Intelligence',
    description: 'Judgment-first AI fluency paths',
    to: '/learn/category/ai-and-ml',
    iconBg: 'bg-violet-500',
  },
  {
    title: 'Smart Workflows',
    description: 'Operational prompting & automation craft',
    to: '/learn/category/prompting',
    iconBg: 'bg-sky-500',
  },
  {
    title: 'Data & Analytics',
    description: 'Signals, KPIs, and decision narratives',
    to: '/learn/category/ai-and-ml',
    iconBg: 'bg-emerald-500',
  },
  {
    title: 'Business & Marketing',
    description: 'Growth, offers, and accountable demand',
    to: '/learn/school/business_growth',
    iconBg: 'bg-amber-500',
  },
  {
    title: 'Digital Productivity',
    description: 'Modern stack literacy & safe practice',
    to: '/learn/school/ai_digital',
    iconBg: 'bg-orange-500',
  },
  {
    title: 'Career Readiness',
    description: 'Positioning, proof, and credible materials',
    to: '/learn/school/career_intellect',
    iconBg: 'bg-rose-500',
  },
]

const WHY_CARDS = [
  {
    title: 'Guided Self-Paced Learning',
    body: 'Structured modules and checkpoints so you can learn on your schedule—without losing the thread.',
    iconBg: 'bg-orange-100 text-orange-600',
  },
  {
    title: 'Practice, Revision & Feedback',
    body: 'Drills, revision cues, and lightweight assessments designed to deepen retention—not cram-and-forget browsing.',
    iconBg: 'bg-rose-100 text-rose-600',
  },
  {
    title: 'Completion With Real Outputs',
    body: 'Templates, briefs, and portfolio-ready artifacts you can revisit as your work evolves.',
    iconBg: 'bg-amber-100 text-amber-700',
  },
] as const

/* -------------------------------------------------------------------------- */
/* Hero browser mockup (right-side visual)                                    */
/* -------------------------------------------------------------------------- */

export function HeroBrowserMockup() {
  return (
    <div className="relative mx-auto w-full max-w-xl lg:mx-0">
      <div
        className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-rose-300/55 via-orange-300/50 to-amber-200/45 blur-2xl"
        aria-hidden
      />
      <div className="relative overflow-hidden rounded-[1.35rem] border border-white/80 bg-white shadow-[0_28px_80px_-24px_rgba(244,63,94,0.35),0_24px_60px_-30px_rgba(251,146,60,0.45)] ring-1 ring-orange-200/40">
        <div className="flex items-center gap-2 border-b border-zinc-100 bg-zinc-50/90 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-red-400/90" aria-hidden />
          <span className="h-3 w-3 rounded-full bg-amber-400/90" aria-hidden />
          <span className="h-3 w-3 rounded-full bg-emerald-400/90" aria-hidden />
          <span className="ml-3 flex-1 truncate rounded-lg bg-white px-3 py-1.5 text-[11px] font-medium text-zinc-400 shadow-sm ring-1 ring-zinc-200/80">
            jifunze.ai/learn
          </span>
        </div>
        <div className="space-y-4 bg-gradient-to-br from-white via-orange-50/40 to-rose-50/50 p-6 sm:p-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-600/90">Workspace preview</p>
          <ul className="space-y-3">
            {['AI Essentials', 'Smart Workflows', 'Revision + Practice', 'Career-ready outputs'].map((line) => (
              <li
                key={line}
                className="flex items-center gap-3 rounded-xl border border-orange-100/80 bg-white/90 px-4 py-3 text-[15px] font-semibold text-zinc-800 shadow-sm shadow-orange-500/10"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-rose-600 text-[11px] font-bold text-white">
                  ✓
                </span>
                {line}
              </li>
            ))}
          </ul>
          <p className="text-[13px] leading-relaxed text-zinc-600">
            Practical paths from beginner habits to professional outputs—revision-friendly, self-paced, and built for real workflows.
          </p>
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Top nav                                                                    */
/* -------------------------------------------------------------------------- */

type DiscoveryNavLink = {
  label: string
  /** Use plain anchors (#…) for in-page links, full paths for routed links. */
  href: string
  testId?: string
}

export function DiscoveryTopNav({
  links,
  rightSlot,
}: {
  links: DiscoveryNavLink[]
  rightSlot: ReactNode
}) {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-white/95 shadow-sm shadow-zinc-900/[0.03] backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <JifunzeBrandLogo to="/" size="md" variant="compact" surface="light" />
        <nav
          className="order-3 flex w-full flex-wrap items-center justify-center gap-1 text-[13px] font-medium text-zinc-600 sm:order-none sm:flex-1 sm:justify-center sm:gap-2 lg:w-auto lg:gap-6"
          aria-label="Primary"
        >
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              data-testid={link.testId}
              className="rounded-full px-3 py-2 transition hover:bg-orange-50 hover:text-zinc-900"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3">{rightSlot}</div>
      </div>
    </header>
  )
}

export function DiscoveryAuthCtas() {
  return (
    <>
      <Link
        to={LEGAL_ROUTES.authSignIn}
        className="rounded-full px-4 py-2 text-[13px] font-semibold text-zinc-700 transition hover:bg-zinc-100"
      >
        Sign In
      </Link>
      <Link
        to={LEGAL_ROUTES.authSignUp}
        className={`inline-flex min-h-[2.5rem] items-center justify-center rounded-full px-5 py-2 text-[13px] font-semibold text-white shadow-md shadow-orange-500/25 transition hover:brightness-105 ${ORANGE_GRADIENT}`}
      >
        Get Started
      </Link>
    </>
  )
}

/* -------------------------------------------------------------------------- */
/* Popular categories                                                         */
/* -------------------------------------------------------------------------- */

export function PopularCategoriesSection() {
  return (
    <section
      id="categories"
      className="scroll-mt-24 bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
      aria-labelledby="categories-heading"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <h2 id="categories-heading" className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            Explore Popular Categories
          </h2>
          <p className="mt-4 text-[17px] leading-relaxed text-zinc-600">
            Discover practical learning areas across AI, business, data, and digital skills.
          </p>
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {POPULAR_CATEGORIES.map((cat) => (
            <Link
              key={cat.title}
              to={cat.to}
              className="flex items-center gap-4 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-md"
            >
              <span
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${cat.iconBg} font-bold text-white shadow-inner`}
              >
                {cat.title.slice(0, 1)}
              </span>
              <span className="min-w-0 text-left">
                <span className="block text-[16px] font-bold text-zinc-900">{cat.title}</span>
                <span className="mt-1 block text-[13px] text-zinc-500">{cat.description}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/* Why us                                                                     */
/* -------------------------------------------------------------------------- */

export function WhyLearnSection() {
  return (
    <section className="bg-orange-50/60 px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="why-heading">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <h2 id="why-heading" className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            Why Learn With Jifunze?
          </h2>
          <p className="mt-4 text-[17px] leading-relaxed text-zinc-600">
            We&apos;re building a practical, guided learning experience for learners who want skills they can actually use.
          </p>
        </div>
        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {WHY_CARDS.map((card) => (
            <article
              key={card.title}
              className="rounded-2xl border border-zinc-200 bg-white px-8 py-10 text-center shadow-[0_20px_44px_-28px_rgba(15,23,42,0.2)]"
            >
              <div
                className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full text-xl font-bold shadow-inner ${card.iconBg}`}
                aria-hidden
              >
                ✦
              </div>
              <h3 className="mt-6 text-xl font-bold text-zinc-900">{card.title}</h3>
              <p className="mt-4 text-[15px] leading-relaxed text-zinc-600">{card.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/* CTA banner                                                                 */
/* -------------------------------------------------------------------------- */

export type DiscoveryCTABannerProps = {
  /**
   * If `true`, render "Start Free" linking to /auth/sign-up. Otherwise the
   * secondary CTA is "Continue learning" → /my-learning. Default: true.
   */
  showStartFree?: boolean
  /** Override the primary "Browse All Courses" target. Defaults to in-page #featured-courses. */
  primaryHref?: string
}

export function DiscoveryCTABanner({ showStartFree = true, primaryHref = '#featured-courses' }: DiscoveryCTABannerProps) {
  return (
    <section className={`${ORANGE_GRADIENT} px-4 py-16 sm:px-6 lg:px-10 lg:py-20`} aria-labelledby="cta-banner-heading">
      <div className="mx-auto max-w-4xl text-center">
        <h2 id="cta-banner-heading" className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Ready to Start Your Learning Journey?
        </h2>
        <p className="mt-4 text-lg text-white/90">Start building practical AI and digital skills with Jifunze.ai today.</p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          {primaryHref.startsWith('#') ? (
            <a
              href={primaryHref}
              className="inline-flex min-h-[3rem] items-center justify-center rounded-full bg-white px-8 py-3 text-[15px] font-semibold text-orange-600 shadow-lg shadow-black/10 transition hover:bg-orange-50"
            >
              Browse All Courses
            </a>
          ) : (
            <Link
              to={primaryHref}
              className="inline-flex min-h-[3rem] items-center justify-center rounded-full bg-white px-8 py-3 text-[15px] font-semibold text-orange-600 shadow-lg shadow-black/10 transition hover:bg-orange-50"
            >
              Browse All Courses
            </Link>
          )}
          {showStartFree ? (
            <Link
              to={LEGAL_ROUTES.authSignUp}
              className="inline-flex min-h-[3rem] items-center justify-center rounded-full border-2 border-white bg-transparent px-8 py-3 text-[15px] font-semibold text-white transition hover:bg-white/10"
            >
              Start Free
            </Link>
          ) : (
            <Link
              to="/my-learning"
              className="inline-flex min-h-[3rem] items-center justify-center rounded-full border-2 border-white bg-transparent px-8 py-3 text-[15px] font-semibold text-white transition hover:bg-white/10"
            >
              Continue learning
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/* Footer                                                                     */
/* -------------------------------------------------------------------------- */

type DiscoveryFooterLink = { label: string; href: string; external?: boolean }

export function DiscoveryFooter({
  quickLinks,
  showSignupCard = true,
}: {
  quickLinks?: DiscoveryFooterLink[]
  showSignupCard?: boolean
}) {
  const links: DiscoveryFooterLink[] = quickLinks ?? [
    { label: 'Available courses', href: '/learn#available-now' },
    { label: 'About', href: '#about-public' },
    { label: 'Contact', href: '#contact-public' },
  ]
  return (
    <footer id="contact-public" className="scroll-mt-24 bg-zinc-950 text-zinc-300">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:gap-10 lg:px-8">
        <div>
          <JifunzeBrandLogo to="/" size="sm" variant="compact" surface="dark" />
          <p className="mt-5 text-[14px] leading-relaxed text-zinc-400">
            Practical, workspace-based learning for AI, data, business, and career-ready digital skills—with continuity you can sustain.
          </p>
        </div>
        <div>
          <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500">Quick Links</h3>
          <ul className="mt-5 space-y-3 text-[14px] font-medium">
            {links.map((link) =>
              link.href.startsWith('#') ? (
                <li key={link.label}>
                  <a href={link.href} className="transition hover:text-white">
                    {link.label}
                  </a>
                </li>
              ) : (
                <li key={link.label}>
                  <Link to={link.href} className="transition hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </div>
        <div>
          <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500">Support</h3>
          <ul className="mt-5 space-y-3 text-[14px] font-medium">
            <li>
              <a href={`mailto:${SUPPORT_CONTACT_EMAIL}`} className="transition hover:text-white">
                Help
              </a>
            </li>
            <li>
              <Link to="/terms" className="transition hover:text-white">
                Terms
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="transition hover:text-white">
                Privacy
              </Link>
            </li>
            <li>
              <Link to="/refunds" className="transition hover:text-white">
                Refund Policy
              </Link>
            </li>
            <li>
              <Link to="/disclaimer" className="transition hover:text-white">
                Disclaimer
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500">Stay in the loop</h3>
          <p className="mt-3 text-[14px] leading-relaxed text-zinc-400">
            Create a free learner account to save progress across courses and workspaces.
          </p>
          {showSignupCard ? (
            <div className="mt-5 flex flex-wrap gap-2">
              <Link
                to={LEGAL_ROUTES.authSignUp}
                className={`inline-flex flex-1 min-w-[140px] items-center justify-center rounded-xl px-4 py-3 text-[13px] font-semibold text-zinc-950 transition hover:brightness-105 ${ORANGE_GRADIENT}`}
              >
                Start learning free
              </Link>
              <Link
                to={LEGAL_ROUTES.authSignIn}
                className="inline-flex items-center justify-center rounded-xl border border-zinc-700 px-4 py-3 text-[13px] font-semibold text-white transition hover:bg-zinc-900"
              >
                Sign in
              </Link>
            </div>
          ) : (
            <p className="mt-5 text-[13px] text-zinc-500">Sign-in is unavailable in this demo build.</p>
          )}
          <p className="mt-6 text-[13px] text-zinc-500">
            Contact:{' '}
            <a href={`mailto:${SUPPORT_CONTACT_EMAIL}`} className="font-medium text-orange-400 hover:text-orange-300">
              {SUPPORT_CONTACT_EMAIL}
            </a>
          </p>
        </div>
      </div>
      <div className="border-t border-zinc-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-8 text-[13px] text-zinc-500 sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} Jifunze.ai. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

/* -------------------------------------------------------------------------- */
/* About strip                                                                */
/* -------------------------------------------------------------------------- */

export function AboutStrip() {
  return (
    <section
      id="about-public"
      className="scroll-mt-24 border-t border-zinc-100 bg-zinc-50/40 px-4 py-16 sm:px-6 lg:px-8"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto max-w-3xl text-center">
        <h2 id="about-heading" className="sr-only">
          About Jifunze.ai
        </h2>
        <p className="text-[15px] leading-relaxed text-zinc-600">
          <strong className="text-zinc-900">Jifunze.ai</strong> is an AI-powered learning workspace for beginner-to-professional
          progression—pairing self-paced courses with revision, practice, and outputs you can reuse at work.
        </p>
      </div>
    </section>
  )
}
