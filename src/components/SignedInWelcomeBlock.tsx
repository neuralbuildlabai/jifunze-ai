import type { User } from '@supabase/supabase-js'
import type { BrandProfile } from '../types/brand'
import {
  buildSignedInWelcomeCopy,
  inferWorkspacePersona,
  isReturningWorkspaceVisit,
} from '../lib/signedInWelcomeCopy'
import type { WorkspaceIdentityState } from '../workspace/useWorkspaceIdentity'
import { TRUST_COPY } from '../training/trustCopy'

type Props = {
  user: User
  brand: BrandProfile
  identity: WorkspaceIdentityState
}

export function SignedInWelcomeBlock({ user, brand, identity }: Props) {
  const workspaceName = identity.row?.name?.trim() || 'your workspace'
  const persona = inferWorkspacePersona(brand)
  const isReturning = isReturningWorkspaceVisit(user, identity.daysSinceActivity)
  const copy = buildSignedInWelcomeCopy({
    brand,
    workspaceName,
    persona,
    isReturning,
  })

  return (
    <section className="mt-8 space-y-4" aria-labelledby="signed-in-welcome-heading">
      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-5 shadow-[0_12px_40px_rgba(0,0,0,0.12)] ring-1 ring-white/[0.04] sm:p-6">
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-violet-300/90">{copy.eyebrow}</p>
        <h1
          id="signed-in-welcome-heading"
          className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl"
        >
          {copy.title}
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-300/95">{copy.lede}</p>
        <p className="mt-4 max-w-2xl border-t border-white/[0.06] pt-4 text-[13px] leading-relaxed text-zinc-400/95">
          {copy.continuity}
        </p>
        <p
          data-testid="signed-in-post-signup-trust"
          className="mt-4 max-w-2xl rounded-xl border border-amber-500/20 bg-amber-950/15 px-3 py-2 text-[11px] leading-relaxed text-zinc-400/95 ring-1 ring-amber-500/10"
        >
          {TRUST_COPY.postSignupWorkspaceReminder}
        </p>
      </div>
    </section>
  )
}
