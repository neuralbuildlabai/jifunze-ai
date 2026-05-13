/**
 * Single flagship course detail access / status chip (monetization-aware).
 */
export function FlagshipDetailAccessPill({
  purchaseGateEnabled,
  hasCourseAccess,
}: {
  purchaseGateEnabled: boolean
  hasCourseAccess: boolean
}) {
  const label = !purchaseGateEnabled
    ? 'Flagship learning path'
    : hasCourseAccess
      ? 'Flagship · Unlocked on your account'
      : 'Flagship · Purchase to unlock'

  const shell =
    !purchaseGateEnabled
      ? 'border-stone-200/90 bg-stone-50/95 text-stone-900'
      : hasCourseAccess
        ? 'border-emerald-200/80 bg-emerald-50/90 text-emerald-950/90'
        : 'border-amber-200/80 bg-amber-50/90 text-amber-950/90'

  return (
    <span
      data-testid="flagship-detail-access-label"
      className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] shadow-sm ${shell}`}
    >
      {label}
    </span>
  )
}
