import React, {ReactElement, SVGProps} from 'react'
import {Icon} from './Icon'

export function ArrowUp(props: SVGProps<SVGSVGElement>): ReactElement {
  return (
    <Icon {...props}>
      <path
        d="m27.414 12.586-10-10a2 2 0 0 0-2.828 0l-10 10a2 2 0 1 0 2.828 2.828L14 8.828V28a2 2 0 1 0 4 0V8.828l6.586 6.586c.39.39.902.586 1.414.586s1.024-.195 1.414-.586a2 2 0 0 0 0-2.828z"/>
    </Icon>
  )
}
