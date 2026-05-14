/**
 * Learner workspace shell — warm / light chrome aligned with `/learn` and the public homepage.
 * Used by {@link LearnerAppShell} and learner-styled surfaces aligned with `/learn`.
 */
export const learnerShellTokens = {
  workspaceBg:
    'min-h-screen w-full bg-[#faf8f5] bg-[radial-gradient(ellipse_100%_50%_at_50%_-10%,rgba(255,237,213,0.55),transparent_50%)] text-zinc-900 antialiased [color-scheme:light]',
  workspaceInner: 'relative mx-auto max-w-3xl px-4 pb-16 pt-8 sm:px-6 sm:pb-20 sm:pt-10',
  workspaceHeaderBorder: 'border-b border-stone-200/90',
  mutedEyebrow: 'text-[11px] font-medium uppercase tracking-[0.14em] text-stone-500',
  pageTitle: 'text-xl font-semibold tracking-tight text-zinc-900 sm:text-2xl',
  pagePurpose: 'mt-2 max-w-2xl text-sm leading-relaxed text-stone-600',
  navLink:
    'rounded-lg px-2.5 py-1.5 text-[13px] font-medium text-stone-600 transition-colors hover:bg-orange-500/10 hover:text-zinc-900',
  navLinkActive: 'bg-orange-500/12 text-zinc-900 shadow-[inset_0_1px_0_rgba(234,88,12,0.15)]',
  /** Reserved for secondary nav items if needed */
  navLinkMuted:
    'rounded-md px-2 py-1.5 text-[12px] font-medium text-stone-500 transition-colors hover:bg-stone-100 hover:text-stone-700',
  navLinkMutedActive: 'bg-stone-100 text-stone-800',
  card: 'rounded-2xl border border-stone-200/90 bg-white px-5 py-5 shadow-[0_20px_50px_-24px_rgba(120,53,15,0.15)] sm:px-6',
  cardEmphasis:
    'rounded-2xl border border-orange-200/80 bg-gradient-to-br from-orange-50 via-white to-rose-50/80 px-5 py-6 shadow-[0_24px_50px_-20px_rgba(234,88,12,0.18)] sm:px-7',
  cardCompact:
    'rounded-2xl border border-stone-200/80 bg-white px-4 py-4 shadow-[0_12px_36px_-20px_rgba(120,53,15,0.12)] sm:px-5 sm:py-5',
  cardTitle: 'text-[15px] font-semibold tracking-tight text-zinc-900',
  cardTitleSm: 'text-sm font-semibold tracking-tight text-zinc-900',
  cardMuted: 'mt-2 text-sm leading-relaxed text-stone-600',
  cardMutedSm: 'mt-1.5 text-[13px] leading-relaxed text-stone-600',
  specRow: 'mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-[13px] text-stone-600',
  primaryButton:
    'inline-flex min-h-[2.5rem] items-center justify-center rounded-full bg-gradient-to-r from-orange-500 via-orange-500 to-rose-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-orange-500/25 transition hover:brightness-105',
  ghostButton:
    'inline-flex min-h-[2.5rem] items-center justify-center rounded-full border border-stone-300/90 bg-white px-4 py-2 text-sm font-medium text-zinc-800 transition hover:border-stone-400 hover:bg-stone-50',
  textButton:
    'inline-flex min-h-[2.25rem] items-center justify-center rounded-lg px-2 text-sm font-medium text-orange-700 transition hover:text-orange-800',
} as const
