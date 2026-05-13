import { LegalPageShell } from './LegalPageShell'
import { LEGAL_ROUTES, SUPPORT_CONTACT_EMAIL } from '../../training/trustCopy'
import { Link } from 'react-router-dom'

export function LearnerSupportPage() {
  return (
    <LegalPageShell title="Support" effectiveLabel="Help using Jifunze.ai">
      <p className="text-sm leading-relaxed text-zinc-300">
        For account access, learning progress, or technical issues, email us and we will respond as soon as we can.
      </p>
      <p className="mt-4 text-sm text-zinc-200">
        <a className="font-medium text-violet-300 hover:underline" href={`mailto:${SUPPORT_CONTACT_EMAIL}`}>
          {SUPPORT_CONTACT_EMAIL}
        </a>
      </p>
      <p className="mt-6 text-sm text-zinc-400">
        Wellbeing courses are educational only — see the{' '}
        <Link className="text-violet-300 hover:underline" to={LEGAL_ROUTES.disclaimer}>
          disclaimer
        </Link>{' '}
        for scope and boundaries.
      </p>
    </LegalPageShell>
  )
}
