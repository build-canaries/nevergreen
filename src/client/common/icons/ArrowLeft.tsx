import React, { ReactElement, SVGProps } from 'react'
import { Icon } from './Icon'

export function ArrowLeft(props: SVGProps<SVGSVGElement>): ReactElement {
  return (
    <Icon {...props}>
      <path
        fill="#444"
        d="m12.586 27.414-10-10a2 2 0 0 1 0-2.828l10-10a2 2 0 1 1 2.828 2.828L8.828 14H28a2 2 0 1 1 0 4H8.828l6.586 6.586c.39.39.586.902.586 1.414s-.195 1.024-.586 1.414a2 2 0 0 1-2.828 0z"
      />
    </Icon>
  )
}
