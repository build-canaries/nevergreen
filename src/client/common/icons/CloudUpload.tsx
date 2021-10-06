import React, {ReactElement, SVGProps} from 'react'
import {Icon} from './Icon'

export function CloudUpload(props: SVGProps<SVGSVGElement>): ReactElement {
  return (
    <Icon  {...props}>
      <path fill='#444'
            d='M27.883 12.078a5 5 0 00-6.168-5.911 6.003 6.003 0 00-11.475.151A8 8 0 108 22h4v6h8v-6h7a5 5 0 00.883-9.922zM18 20v6h-4v-6H9l7-7 7 7h-5z'/>
    </Icon>
  )
}
