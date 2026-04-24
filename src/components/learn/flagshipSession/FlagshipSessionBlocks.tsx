import type { FlagshipSessionContentBlock } from '../../../data/learning/flagshipSessionContentTypes'
import { FlagshipSessionBlock } from './FlagshipSessionBlock'
import type { FlagshipSessionResponseContext } from './flagshipSessionResponseTypes'

export function FlagshipSessionBlocks(props: {
  blocks: FlagshipSessionContentBlock[]
  responseContext?: FlagshipSessionResponseContext | null
}) {
  const { blocks, responseContext } = props
  if (blocks.length === 0) return null

  return (
    <div className="mt-10 space-y-8" data-testid="flagship-session-content">
      {blocks.map((block) => (
        <FlagshipSessionBlock key={block.id} block={block} responseContext={responseContext ?? undefined} />
      ))}
    </div>
  )
}
