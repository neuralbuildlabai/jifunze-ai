/** Shared layout tokens for learner-facing surfaces (calm, education-product). */
export const learnerShellTokens = {
  workspaceBg:
    'min-h-screen w-full bg-zinc-950 bg-[linear-gradient(180deg,rgb(14,14,18)_0%,rgb(11,11,14)_45%,rgb(9,9,12)_100%)] text-zinc-100 antialiased',
  workspaceInner: 'relative mx-auto max-w-4xl px-4 pb-16 pt-8 sm:px-6 sm:pb-20 sm:pt-10',
  workspaceHeaderBorder: 'border-b border-white/[0.06]',
  mutedEyebrow: 'text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500',
  pageTitle: 'text-xl font-semibold tracking-tight text-white sm:text-2xl',
  pagePurpose: 'mt-2 max-w-2xl text-sm leading-relaxed text-zinc-400',
  navLink:
    'rounded-md px-2.5 py-1.5 text-[13px] font-medium text-zinc-400 transition-colors hover:bg-white/[0.04] hover:text-zinc-100',
  navLinkActive: 'bg-white/[0.06] text-zinc-100',
  card: 'rounded-xl border border-white/[0.06] bg-white/[0.02] px-5 py-5 sm:px-6',
  cardTitle: 'text-sm font-semibold text-white',
  cardMuted: 'mt-2 text-sm leading-relaxed text-zinc-400',
  primaryButton:
    'inline-flex min-h-[2.5rem] items-center justify-center rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-500',
  ghostButton:
    'inline-flex min-h-[2.5rem] items-center justify-center rounded-lg border border-white/[0.08] px-4 py-2 text-sm font-medium text-zinc-200 transition hover:bg-white/[0.04]',
} as const
