import React, { ReactElement, SVGProps } from 'react'
import { Icon } from './Icon'

export function Note(props: SVGProps<SVGSVGElement>): ReactElement {
  return (
    <Icon {...props}>
      <path d="M30 0h2v23c0 2.761-3.134 5-7 5s-7-2.239-7-5 3.134-5 7-5c1.959 0 3.729.575 5 1.501V8l-16 3.556V27c0 2.761-3.134 5-7 5s-7-2.239-7-5 3.134-5 7-5c1.959 0 3.729.575 5 1.501V4l18-4z" />
    </Icon>
  )
}
