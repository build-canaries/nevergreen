import React, { ReactElement, SVGProps } from 'react'
import { Icon } from './Icon'

export function Play(props: SVGProps<SVGSVGElement>): ReactElement {
  return (
    <Icon {...props}>
      <path fill="#444" d="M6 4l20 12L6 28z" />
    </Icon>
  )
}
