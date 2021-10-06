import React, {ReactElement, SVGProps} from 'react'
import {Icon} from './Icon'

export function Checkmark(props: SVGProps<SVGSVGElement>): ReactElement {
  return (
    <Icon {...props}>
      <path fill='#444' d='M27 4L12 19l-7-7-5 5 12 12L32 9z'/>
    </Icon>
  )
}
