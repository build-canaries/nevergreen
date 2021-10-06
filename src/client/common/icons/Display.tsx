import React, {ReactElement, SVGProps} from 'react'
import {Icon} from './Icon'

export function Display(props: SVGProps<SVGSVGElement>): ReactElement {
  return (
    <Icon {...props}>
      <path fill='#444' d='M0 2v20h32V2H0zm30 18H2V4h28v16zm-9 4H11l-1 4-2 2h16l-2-2z'/>
    </Icon>
  )
}
