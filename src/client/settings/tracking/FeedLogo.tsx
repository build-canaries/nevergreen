import React, {ReactElement, SVGProps} from 'react'
import {Tray} from '../../domain/Tray'
import {Xml} from '../../common/icons/Xml'
import {CircleCi} from '../../common/icons/CircleCi'
import {GoCd} from '../../common/icons/GoCd'

interface FeedLogoProps extends SVGProps<SVGSVGElement> {
  readonly feed: Tray;
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
