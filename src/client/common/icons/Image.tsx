import React, { ReactElement, SVGProps } from 'react'
import { Icon } from './Icon'

export function Image(props: SVGProps<SVGSVGElement>): ReactElement {
  return (
    <Icon {...props}>
      <path
        fill="#444"
        d="M29.996 4l.004.004v23.993l-.004.004H2.003l-.004-.004V4.004L2.003 4h27.993zM30 2H2C.9 2 0 2.9 0 4v24c0 1.1.9 2 2 2h28c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"
      />
      <path
        fill="#444"
        d="M26 9a3 3 0 11-6 0 3 3 0 016 0zM28 26H4v-4l7-12 8 10h2l7-6z"
      />
    </Icon>
  )
}
