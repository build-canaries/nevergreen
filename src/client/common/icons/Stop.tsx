import type { ReactElement, SVGProps } from 'react'
import { Icon } from './Icon'

export function Stop(props: SVGProps<SVGSVGElement>): ReactElement {
  return (
    <Icon {...props}>
      <path fill="#444" d="M4 4h24v24H4z" />
    </Icon>
  )
}
