import type { FlagshipSessionContentBlock } from '../../../data/learning/flagshipSessionContentTypes'
import { FlagshipSessionBlock } from './FlagshipSessionBlock'

export function FlagshipSessionBlocks(props: { blocks: FlagshipSessionContentBlock[] }) {
  const { blocks } = props
  if (blocks.length === 0) return null

  return (
    <div className="mt-10 space-y-8" data-testid="flagship-session-content">
      {blocks.map((block) => (
        <FlagshipSessionBlock key={block.id} block={block} />
      ))}
    </div>
  )
}
