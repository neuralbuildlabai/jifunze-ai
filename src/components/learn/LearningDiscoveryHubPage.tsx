import { Link } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import { isSupabaseConfigured } from '../../config/supabaseEnv'
import {
  FLAGSHIP_COURSES,
  FLAGSHIP_SCHOOLS,
  getFlagshipCourseBySlug,
  type FlagshipSchoolId,
} from '../../data/learning/flagshipCoursesCatalog'
import { getFlagshipCurriculum } from '../../data/learning/flagshipCourseCurricula'
import { LEGAL_ROUTES, SUPPORT_CONTACT_EMAIL } from '../../training/trustCopy'
import { JifunzeBrandLogo } from '../brand/JifunzeBrandLogo'
import { SignedInPublicLearningActions } from './SignedInPublicLearningActions'

const ORANGE_GRADIENT = 'bg-gradient-to-r from-orange-500 via-orange-500 to-rose-600'
const ORANGE_GRADIENT_TEXT = 'bg-gradient-to-r from-orange-600 via-orange-500 to-rose-600 bg-clip-text text-transparent'

type FeaturedCourseCard = {
  slug: string
  title: string
  badge: string
  badgeClass: string
  bannerClass: string
  duration: string
  learners: string
  rating: string
  accessLabel: string
}

/** Six flagship courses shown on /learn; titles and module counts come from catalog + curriculum (no label/route mismatch). */
const FEATURED_SLUGS = [
  'ai-essentials',
  'smart-workflows-with-ai',
  'data-and-decisions',
  'business-builder',
  'marketing-and-growth',
  'career-launch',
] as const

type FeaturedSlug = (typeof FEATURED_SLUGS)[number]

const FEATURED_CARD_CHROME: Record<
  FeaturedSlug,
  { badge: string; badgeClass: string; bannerClass: string; learners: string; rating: string }
> = {
  'ai-essentials': {
    badge: 'AI & ML',
    badgeClass: 'bg-violet-600 text-white',
    bannerClass: 'from-violet-600 via-fuchsia-600 to-orange-400',
    learners: '2.3k',
    rating: '4.9',
  },
  'smart-workflows-with-ai': {
    badge: 'Automation',
    badgeClass: 'bg-sky-600 text-white',
    bannerClass: 'from-sky-500 via-cyan-500 to-emerald-400',
    learners: '1.8k',
    rating: '4.9',
  },
  'data-and-decisions': {
    badge: 'Data Science',
    badgeClass: 'bg-emerald-600 text-white',
    bannerClass: 'from-emerald-600 via-teal-500 to-cyan-400',
    learners: '1.5k',
    rating: '4.8',
  },
  'business-builder': {
    badge: 'Business',
    badgeClass: 'bg-amber-600 text-white',
    bannerClass: 'from-amber-500 via-orange-500 to-rose-500',
    learners: '1.2k',
    rating: '4.8',
  },
  'marketing-and-growth': {
    badge: 'Growth',
    badgeClass: 'bg-orange-600 text-white',
    bannerClass: 'from-orange-600 via-rose-500 to-violet-600',
    learners: '2.7k',
    rating: '4.9',
  },
  'career-launch': {
    badge: 'Career',
    badgeClass: 'bg-indigo-600 text-white',
    bannerClass: 'from-indigo-600 via-violet-600 to-fuchsia-500',
    learners: '1.4k',
    rating: '4.7',
  },
}

function buildFeaturedCourseCards(): FeaturedCourseCard[] {
  return FEATURED_SLUGS.map((slug) => {
    const course = getFlagshipCourseBySlug(slug)
    const curriculum = getFlagshipCurriculum(slug)
    const chrome = FEATURED_CARD_CHROME[slug]
    if (!course) {
      throw new Error(`Featured grid references unknown flagship slug: ${slug}`)
    }
    const n = curriculum?.modules.length ?? 0
    const duration = n > 0 ? `${n} modules` : 'Multi-module path'

    return {
      slug,
      title: course.title,
      badge: chrome.badge,
      badgeClass: chrome.badgeClass,
      bannerClass: chrome.bannerClass,
      duration,
      learners: chrome.learners,
      rating: chrome.rating,
      accessLabel: 'Free',
    }
  })
}

const FEATURED_COURSES: FeaturedCourseCard[] = buildFeaturedCourseCards()

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

const SCHOOL_ORDER: FlagshipSchoolId[] = ['ai_digital', 'business_growth', 'career_intellect', 'leadership_learning']

function IconSpark({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2l1.8 5.6h5.9l-4.8 3.5 1.8 5.6L12 13.2 7.3 16.7l1.8-5.6L4.3 7.6h5.9L12 2z" />
    </svg>
  )
}

function IconClock({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v6l3 2" strokeLinecap="round" />
    </svg>
  )
}

function IconUsers({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M17 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" strokeLinecap="round" />
    </svg>
  )
}

function IconStar({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}

function IconArrowRight({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function HeroBrowserMockup() {
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

export function LearningDiscoveryHubPage() {
  const { user } = useAuth()
  const flagshipCount = FLAGSHIP_COURSES.length
  const supabase = isSupabaseConfigured()

  return (
    <div className="min-h-screen bg-white text-zinc-900 antialiased [color-scheme:light]">
      <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-white/95 shadow-sm shadow-zinc-900/[0.03] backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <JifunzeBrandLogo to="/" size="sm" variant="compact" surface="light" />
          <nav
            className="order-3 flex w-full flex-wrap items-center justify-center gap-1 text-[13px] font-medium text-zinc-600 sm:order-none sm:flex-1 sm:justify-center sm:gap-2 lg:w-auto lg:gap-6"
            aria-label="Primary"
          >
            <a href="#featured-courses" className="rounded-full px-3 py-2 transition hover:bg-orange-50 hover:text-zinc-900">
              Courses
            </a>
            <a href="#schools" className="rounded-full px-3 py-2 transition hover:bg-orange-50 hover:text-zinc-900">
              Schools
            </a>
            <a href="#about-public" className="rounded-full px-3 py-2 transition hover:bg-orange-50 hover:text-zinc-900">
              About
            </a>
            <a href="#contact-public" className="rounded-full px-3 py-2 transition hover:bg-orange-50 hover:text-zinc-900">
              Contact
            </a>
          </nav>
          <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3">
            {user ? (
              <div className="jf-public-surface rounded-2xl">
                <SignedInPublicLearningActions className="!justify-end" />
              </div>
            ) : supabase ? (
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
            ) : null}
          </div>
        </div>
      </header>

      <main data-testid="learning-discovery-hub">
        {/* Hero */}
        <section
          className="relative overflow-hidden border-b border-orange-100/60 bg-gradient-to-b from-orange-50 via-amber-50/80 to-white"
          aria-labelledby="learn-hero-heading"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(251,146,60,0.18),transparent_55%)]" aria-hidden />
          <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8 lg:py-20">
            <div className="max-w-xl">
              <p className="inline-flex items-center gap-2 rounded-full border border-white bg-white/90 px-4 py-1.5 text-[12px] font-semibold text-zinc-700 shadow-sm shadow-orange-500/10 ring-1 ring-orange-100">
                <IconSpark className="text-orange-500" />
                Your learning journey starts here
              </p>
              <h1 id="learn-hero-heading" className="mt-6 text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl sm:leading-[1.08]">
                Learn AI &amp; Practical Tech
                <span className={`mt-1 block ${ORANGE_GRADIENT_TEXT}`}>At Your Own Pace</span>
              </h1>
              <p className="mt-6 text-[17px] leading-relaxed text-zinc-600 sm:text-lg">
                Build practical AI, data, business, and digital skills through guided courses designed for self-paced learning, revision, and real-world
                outcomes.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#featured-courses"
                  className={`inline-flex min-h-[3rem] items-center gap-2 rounded-full px-8 py-3 text-[15px] font-semibold text-white shadow-lg shadow-orange-500/30 transition hover:brightness-105 ${ORANGE_GRADIENT}`}
                >
                  Explore Courses
                  <IconArrowRight className="h-4 w-4" />
                </a>
                <Link
                  to={LEGAL_ROUTES.paths}
                  className="inline-flex min-h-[3rem] items-center justify-center rounded-full border border-zinc-200 bg-white px-7 py-3 text-[15px] font-semibold text-zinc-800 shadow-sm transition hover:border-zinc-300 hover:bg-zinc-50"
                >
                  View Learning Paths
                </Link>
              </div>
              <dl className="mt-10 grid grid-cols-1 gap-6 border-t border-orange-100/80 pt-10 sm:grid-cols-3">
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500">Catalog depth</dt>
                  <dd className="mt-1 text-lg font-bold text-zinc-900">{flagshipCount}+ Flagship Courses</dd>
                </div>
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500">Schools</dt>
                  <dd className="mt-1 text-lg font-bold text-zinc-900">4 Schools</dd>
                </div>
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500">Progression</dt>
                  <dd className="mt-1 text-lg font-bold text-zinc-900">Beginner to Pro</dd>
                </div>
              </dl>
            </div>
            <HeroBrowserMockup />
          </div>
        </section>

        {/* Featured courses */}
        <section
          id="featured-courses"
          data-testid="discovery-section-flagship-catalog"
          className="scroll-mt-24 bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
          aria-labelledby="featured-courses-heading"
        >
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <h2 id="featured-courses-heading" className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
                Featured Courses
              </h2>
              <p className="mt-4 text-[17px] leading-relaxed text-zinc-600">
                Structured learning paths designed to help you build practical skills and progress with confidence.
              </p>
            </div>
            <div className="mt-14 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
              {FEATURED_COURSES.map((course) => (
                <article
                  key={course.slug}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200/90 bg-white shadow-[0_18px_40px_-24px_rgba(15,23,42,0.25)] transition hover:-translate-y-1 hover:shadow-[0_28px_50px_-22px_rgba(251,146,60,0.22)]"
                  data-testid={`discovery-featured-${course.slug}`}
                >
                  <Link to={`/learn/courses/${course.slug}`} className="relative block aspect-[16/10] overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${course.bannerClass} opacity-95`} aria-hidden />
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 60L60 0H0z\' fill=\'%23ffffff\' fill-opacity=\'0.06\'/%3E%3C/svg%3E')] opacity-40 mix-blend-overlay" aria-hidden />
                    <span
                      className={`absolute left-4 top-4 inline-flex rounded-lg px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide shadow-sm ${course.badgeClass}`}
                    >
                      {course.badge}
                    </span>
                  </Link>
                  <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
                    <h3 className="text-[17px] font-bold leading-snug text-zinc-900">
                      <Link to={`/learn/courses/${course.slug}`} className="transition hover:text-orange-600">
                        {course.title}
                      </Link>
                    </h3>
                    <p className="mt-2 text-[13px] text-zinc-500">Jifunze Faculty</p>
                    <div className="mt-4 flex flex-wrap items-center gap-4 text-[13px] font-medium text-zinc-600">
                      <span className="inline-flex items-center gap-1.5">
                        <IconClock className="text-zinc-400" />
                        {course.duration}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <IconUsers className="text-zinc-400" />
                        {course.learners}
                      </span>
                    </div>
                    <div className="my-5 h-px bg-zinc-100" />
                    <div className="mt-auto flex items-center justify-between gap-3">
                      <span className="inline-flex items-center gap-1 text-[13px] font-semibold text-zinc-800">
                        <IconStar className="text-amber-400" />
                        {course.rating}{' '}
                        <span className="font-normal text-zinc-500">({course.learners})</span>
                      </span>
                      <span className="text-[15px] font-bold text-orange-600">{course.accessLabel}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Schools */}
        <section id="schools" className="scroll-mt-24 border-y border-zinc-100 bg-zinc-50/50 px-4 py-16 sm:px-6 lg:px-8 lg:py-20" aria-labelledby="schools-heading">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <h2 id="schools-heading" className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-[1.65rem]">
                Explore by school
              </h2>
              <p className="mt-3 text-[16px] leading-relaxed text-zinc-600">
                Four learning schools organize flagship paths—from AI and digital fluency to leadership systems.
              </p>
            </div>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {SCHOOL_ORDER.map((id) => {
                const school = FLAGSHIP_SCHOOLS[id]
                const count = FLAGSHIP_COURSES.filter((c) => c.schoolId === id).length
                return (
                  <Link
                    key={id}
                    to={`/learn/school/${id}`}
                    data-testid={`discovery-school-card-${id}`}
                    className="flex flex-col rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-md"
                  >
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-orange-600">{school.shortLabel}</p>
                    <p className="mt-3 text-[17px] font-bold text-zinc-900">{school.label}</p>
                    <p className="mt-3 flex-1 text-[14px] leading-relaxed text-zinc-600">{school.description}</p>
                    <p className="mt-6 text-[13px] font-semibold text-orange-600">
                      {count} course{count === 1 ? '' : 's'} · Browse →
                    </p>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="categories-heading">
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
                  <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${cat.iconBg} font-bold text-white shadow-inner`}>
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

        {/* About (short) */}
        <section id="about-public" className="scroll-mt-24 border-t border-zinc-100 bg-zinc-50/40 px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="about-heading">
          <div className="mx-auto max-w-3xl text-center">
            <h2 id="about-heading" className="sr-only">
              About Jifunze.ai
            </h2>
            <p className="text-[15px] leading-relaxed text-zinc-600">
              <strong className="text-zinc-900">Jifunze.ai</strong> is an AI-powered learning workspace for beginner-to-professional progression—pairing
              self-paced courses with revision, practice, and outputs you can reuse at work.
            </p>
          </div>
        </section>

        {/* Why us */}
        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="why-heading">
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

        {/* CTA banner */}
        <section className={`${ORANGE_GRADIENT} px-4 py-16 sm:px-6 lg:px-10 lg:py-20`} aria-labelledby="cta-banner-heading">
          <div className="mx-auto max-w-4xl text-center">
            <h2 id="cta-banner-heading" className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to Start Your Learning Journey?
            </h2>
            <p className="mt-4 text-lg text-white/90">Start building practical AI and digital skills with Jifunze.ai today.</p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a
                href="#featured-courses"
                className="inline-flex min-h-[3rem] items-center justify-center rounded-full bg-white px-8 py-3 text-[15px] font-semibold text-orange-600 shadow-lg shadow-black/10 transition hover:bg-orange-50"
              >
                Browse All Courses
              </a>
              {supabase && !user ? (
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
      </main>

      {/* Footer */}
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
              <li>
                <a href="#featured-courses" className="transition hover:text-white">
                  All Courses
                </a>
              </li>
              <li>
                <a href="#schools" className="transition hover:text-white">
                  Schools
                </a>
              </li>
              <li>
                <a href="#about-public" className="transition hover:text-white">
                  About
                </a>
              </li>
              <li>
                <a href="#contact-public" className="transition hover:text-white">
                  Contact
                </a>
              </li>
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
            {supabase ? (
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
    </div>
  )
}
