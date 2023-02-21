import type { ReactElement, SVGProps } from 'react'
import type { Feed } from './FeedsReducer'
import { ServerTypes } from './FeedsReducer'
import { Xml } from '../../common/icons/Xml'
import { CircleCi } from '../../common/icons/CircleCi'
import { GoCd } from '../../common/icons/GoCd'

interface FeedLogoProps extends SVGProps<SVGSVGElement> {
  readonly feed: Feed
}

export function FeedLogo({ feed, ...props }: FeedLogoProps): ReactElement {
  return (
    <>
      {feed.serverType === ServerTypes.generic && <Xml {...props} />}
      {feed.serverType === ServerTypes.circle && <CircleCi {...props} />}
      {feed.serverType === ServerTypes.go && <GoCd {...props} />}
    </>
  )
}
