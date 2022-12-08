import React, { ReactElement, SVGProps } from 'react'
import { Icon } from './Icon'

export function Dice(props: SVGProps<SVGSVGElement>): ReactElement {
  return (
    <Icon {...props}>
      <path
        fill="#444"
        d="M27 6H11c-2.75 0-5 2.25-5 5v16c0 2.75 2.25 5 5 5h16c2.75 0 5-2.25 5-5V11c0-2.75-2.25-5-5-5zM13 28a3 3 0 110-6 3 3 0 010 6zm0-12a3 3 0 110-6 3 3 0 010 6zm6 6a3 3 0 110-6 3 3 0 010 6zm6 6a3 3 0 110-6 3 3 0 010 6zm0-12a3 3 0 110-6 3 3 0 010 6zm.899-12C25.432 1.725 23.408 0 21 0H5C2.25 0 0 2.25 0 5v16c0 2.408 1.725 4.432 4 4.899V6c0-1.1.9-2 2-2h19.899z"
      />
    </Icon>
  )
}
