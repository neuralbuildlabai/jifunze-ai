import lockupOnDark from '../../assets/branding/jifunze-lockup-on-dark.svg'

/**
 * Ambient brand mark for the homepage auth “save & continue” column: centered logo with
 * soft glow—intended to sit inside a relative, flex-centered parent (not absolutely
 * positioned against the full page shell).
 */
export function JifunzeAuthSectionBrandMark() {
  return (
    <div className="relative isolate flex w-full max-w-md flex-1 items-center justify-center overflow-hidden py-2 sm:py-4">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="jifunze-auth-brand-glow absolute left-1/2 top-1/2 h-[11rem] w-[11rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/16 blur-[2.25rem] sm:h-[13rem] sm:w-[13rem]" />
        <div className="jifunze-auth-brand-glow-delayed absolute left-[57%] top-[54%] h-[8.5rem] w-[8.5rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-400/10 blur-[2rem]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_52%_at_50%_50%,rgba(139,92,246,0.05),transparent_58%)]" />
      </div>
      <div className="pointer-events-none absolute inset-x-[12%] top-1/2 z-0 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" aria-hidden />
      <img
        src={lockupOnDark}
        alt=""
        width={335}
        height={96}
        className="jifunze-auth-brand-mark relative z-[1] w-[min(100%,23rem)] max-w-full opacity-[0.18] mix-blend-screen contrast-[1.18] brightness-125 drop-shadow-[0_10px_26px_rgba(0,0,0,0.24)] sm:w-[min(100%,27rem)] sm:opacity-[0.2]"
        decoding="async"
      />
    </div>
  )
}
