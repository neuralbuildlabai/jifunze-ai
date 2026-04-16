const SOCIALS = [
  { name: 'TikTok', handle: '@jifunze_ai', href: 'https://www.tiktok.com/@jifunze_ai' },
  { name: 'Instagram', handle: '@jifunze.ai', href: 'https://www.instagram.com/jifunze.ai' },
  { name: 'X', handle: '@Jifunze.AI', href: 'https://x.com/JifunzeAI' },
] as const

function DotIcon() {
  return <span className="inline-block h-1.5 w-1.5 rounded-full bg-violet-300/80" aria-hidden />
}

export function PublicSocialLinks({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? 'flex flex-wrap items-center gap-2.5' : 'flex flex-wrap items-center justify-center gap-2.5'}>
      {SOCIALS.map((s) => (
        <a
          key={s.name}
          href={s.href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900/35 px-2.5 py-0.5 text-[10px] text-zinc-400 transition hover:border-violet-500/35 hover:text-violet-200"
          aria-label={`${s.name} ${s.handle}`}
        >
          <DotIcon />
          <span className="text-zinc-400">{s.name}:</span>
          <span>{s.handle}</span>
        </a>
      ))}
    </div>
  )
}
