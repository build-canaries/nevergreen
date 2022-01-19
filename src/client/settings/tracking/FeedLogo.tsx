import React, {ReactElement, SVGProps} from 'react'
import {Feed} from '../../domain/Feed'
import {Xml} from '../../common/icons/Xml'
import {CircleCi} from '../../common/icons/CircleCi'
import {GoCd} from '../../common/icons/GoCd'

interface FeedLogoProps extends SVGProps<SVGSVGElement> {
  readonly feed: Feed;
}

export function FeedLogo({feed, ...props}: FeedLogoProps): ReactElement {
  return (
    <>
      {feed.serverType === '' && <Xml {...props}/>}
      {feed.serverType === 'circle' && <CircleCi {...props}/>}
      {feed.serverType === 'go' && <GoCd {...props}/>}
    </>
  )
}
