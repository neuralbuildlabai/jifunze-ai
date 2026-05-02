/** Shared layout tokens for learner-facing surfaces — calm, premium, education-first. */
export const learnerShellTokens = {
  workspaceBg:
    'min-h-screen w-full bg-[#09090b] bg-[radial-gradient(ellipse_100%_60%_at_50%_-8%,rgba(124,58,237,0.08),transparent_52%),linear-gradient(180deg,rgb(16,16,20)_0%,rgb(10,10,12)_48%,rgb(8,8,10)_100%)] text-zinc-100 antialiased',
  workspaceInner: 'relative mx-auto max-w-3xl px-4 pb-16 pt-8 sm:px-6 sm:pb-20 sm:pt-10',
  workspaceHeaderBorder: 'border-b border-white/[0.07]',
  mutedEyebrow: 'text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500',
  pageTitle: 'text-xl font-semibold tracking-tight text-white sm:text-2xl',
  pagePurpose: 'mt-2 max-w-2xl text-sm leading-relaxed text-zinc-400',
  navLink:
    'rounded-md px-2.5 py-1.5 text-[13px] font-medium text-zinc-400 transition-colors hover:bg-white/[0.04] hover:text-zinc-100',
  navLinkActive: 'bg-white/[0.07] text-zinc-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]',
  /** Secondary top-level item (e.g. Pathways) — still reachable, visually quieter. */
  navLinkMuted:
    'rounded-md px-2 py-1.5 text-[12px] font-medium text-zinc-500 transition-colors hover:bg-white/[0.03] hover:text-zinc-300',
  navLinkMutedActive: 'bg-white/[0.05] text-zinc-300',
  card: 'rounded-2xl border border-white/[0.07] bg-white/[0.025] px-5 py-5 shadow-[0_20px_50px_rgba(0,0,0,0.35)] backdrop-blur-[2px] sm:px-6',
  cardEmphasis:
    'rounded-2xl border border-violet-500/20 bg-[linear-gradient(145deg,rgba(124,58,237,0.09)_0%,rgba(255,255,255,0.03)_45%,rgba(9,9,11,0.4)_100%)] px-5 py-6 shadow-[0_24px_60px_rgba(0,0,0,0.4)] sm:px-7',
  cardCompact:
    'rounded-2xl border border-white/[0.06] bg-white/[0.02] px-4 py-4 shadow-[0_12px_36px_rgba(0,0,0,0.28)] sm:px-5 sm:py-5',
  cardTitle: 'text-[15px] font-semibold tracking-tight text-white',
  cardTitleSm: 'text-sm font-semibold tracking-tight text-white',
  cardMuted: 'mt-2 text-sm leading-relaxed text-zinc-400',
  cardMutedSm: 'mt-1.5 text-[13px] leading-relaxed text-zinc-500',
  specRow: 'mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-[13px] text-zinc-400',
  primaryButton:
    'inline-flex min-h-[2.5rem] items-center justify-center rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-violet-950/30 transition hover:bg-violet-500',
  ghostButton:
    'inline-flex min-h-[2.5rem] items-center justify-center rounded-lg border border-white/[0.1] px-4 py-2 text-sm font-medium text-zinc-200 transition hover:bg-white/[0.05]',
  textButton:
    'inline-flex min-h-[2.25rem] items-center justify-center rounded-lg px-2 text-sm font-medium text-violet-300/95 transition hover:text-violet-200',
} as const
