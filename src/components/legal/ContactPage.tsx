import { PolicyChrome } from './PolicyChrome'
import { SUPPORT_CONTACT_EMAIL } from '../../shared/legalRoutes'

export function ContactPage() {
  return (
    <PolicyChrome title="Contact" eyebrow="Reach the Jifunze team">
      <p>
        Use the address below for questions, corrections, partnership enquiries or takedown
        requests. This inbox is not monitored as an emergency or crisis service.
      </p>
      <p className="mt-4 text-sm text-zinc-200">
        <a
          className="font-medium text-[#A78BFA] hover:text-white hover:underline"
          href={`mailto:${SUPPORT_CONTACT_EMAIL}?subject=Jifunze%20inquiry`}
        >
          {SUPPORT_CONTACT_EMAIL}
        </a>
      </p>
      <p className="mt-6 text-[13px] text-zinc-500">Jifunze is based in Nairobi, Kenya.</p>
    </PolicyChrome>
  )
}
