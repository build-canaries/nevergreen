import type { ReactElement, SVGProps } from 'react'
import { Icon } from '../Icon'

export function IconError(props: SVGProps<SVGSVGElement>): ReactElement {
  return (
    <Icon {...props}>
      <path d="m16 0 16 16-16 16L0 16z" />
    </Icon>
  )
}
