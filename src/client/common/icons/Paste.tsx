import React, {ReactElement, SVGProps} from 'react'
import {Icon} from './Icon'

export function Paste(props: SVGProps<SVGSVGElement>): ReactElement {
  return (
    <Icon {...props}>
      <path fill='#444'
            d='M22 4h-4V2c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H6v4h16V4zm-6 0h-4V2.004L12.004 2h3.993l.004.004V4zm10 6V5c0-.55-.45-1-1-1h-2v2h1v4h-6l-6 6v8H4V6h1V4H3c-.55 0-1 .45-1 1v20c0 .55.45 1 1 1h9v6h20V10h-6zm-8 2.828V16h-3.172L18 12.828zM30 30H14V18h6v-6h10v18z'/>
    </Icon>
  )
}
