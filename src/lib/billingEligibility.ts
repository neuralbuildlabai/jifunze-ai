/**
 * First-stage eligibility for discounted SKUs — domain suffix matching on the user email.
 * Not a replacement for accredited academic verification; keeps claims conservative in UI.
 */

export type BillingEligibilityTags = {
  studentDomainEligible: boolean
  teamOrgDomainEligible: boolean
  matchedStudentSuffix: string | null
  matchedTeamSuffix: string | null
}

function parseSuffixList(raw: string | undefined): string[] {
  if (!raw?.trim()) return []
  return raw
    .split(/[,]+/g)
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean)
}

function emailDomain(email: string): string {
  const at = email.lastIndexOf('@')
  if (at < 0) return ''
  return email.slice(at + 1).trim().toLowerCase()
}

/**
 * Evaluates signup email against optional env lists:
 * - VITE_BILLING_STUDENT_DOMAIN_SUFFIXES — comma-separated suffixes like ".edu,.ac.uk,.ac.ke"
 * - VITE_BILLING_TEAM_ORG_DOMAIN_SUFFIXES — comma-separated suffixes for org/team discounts
 */
export function deriveBillingEligibility(email: string | null | undefined): BillingEligibilityTags {
  const e = email?.trim().toLowerCase() ?? ''
  if (!e.includes('@')) {
    return {
      studentDomainEligible: false,
      teamOrgDomainEligible: false,
      matchedStudentSuffix: null,
      matchedTeamSuffix: null,
    }
  }

  const domain = emailDomain(e)
  const studentSuffixes = parseSuffixList(import.meta.env.VITE_BILLING_STUDENT_DOMAIN_SUFFIXES as string | undefined)
  const teamSuffixes = parseSuffixList(import.meta.env.VITE_BILLING_TEAM_ORG_DOMAIN_SUFFIXES as string | undefined)

  const matchedStudent = studentSuffixes.find((suf) => domain.endsWith(suf.replace(/^\./, '')) || domain.endsWith(suf))
  const matchedTeam = teamSuffixes.find((suf) => domain.endsWith(suf.replace(/^\./, '')) || domain.endsWith(suf))

  return {
    studentDomainEligible: Boolean(matchedStudent),
    teamOrgDomainEligible: Boolean(matchedTeam),
    matchedStudentSuffix: matchedStudent ?? null,
    matchedTeamSuffix: matchedTeam ?? null,
  }
}
