import { LegalPageShell } from './LegalPageShell'
import { SUPPORT_CONTACT_EMAIL } from '../../shared/legalRoutes'

export function LearnerContactPage() {
  return (
    <LegalPageShell title="Contact" effectiveLabel="Reach the Jifunze.ai team">
      <p className="text-sm leading-relaxed text-zinc-300">
        Use the address below for product questions, partnerships, or learning support. This inbox is not monitored as an emergency or
        crisis service.
      </p>
      <p className="mt-4 text-sm text-zinc-200">
        <a className="font-medium text-violet-300 hover:underline" href={`mailto:${SUPPORT_CONTACT_EMAIL}?subject=Jifunze.ai%20inquiry`}>
          {SUPPORT_CONTACT_EMAIL}
        </a>
      </p>
    </LegalPageShell>
  )
}
