/**
 * X — technically implementable, economically blocked.
 *
 * X retired its free tier in 2026 and charges per use: roughly $0.015 per post created and about
 * $0.200 when the post contains a link, against prepaid credits. One daily link post is about
 * $6/month before any read calls.
 *
 * The operating rule for this project is no spend, so X is a MANUAL channel. This adapter refuses
 * every call and will keep refusing until `readiness` is changed deliberately alongside a budget
 * decision. Do not "temporarily" flip it.
 */
import { BaseAdapter } from './base.ts'

export class XAdapter extends BaseAdapter {
  constructor() {
    super('x')
  }

  /** The operating cost an owner needs before approving automation here. */
  estimatedMonthlyCostUsd(postsPerDay: number, withLink: boolean): number {
    const perPost = withLink ? 0.2 : 0.015
    return Number((postsPerDay * perPost * 30).toFixed(2))
  }
}
