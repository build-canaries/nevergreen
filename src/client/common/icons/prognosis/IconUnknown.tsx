import type { ReactElement, SVGProps } from 'react'
import { Icon } from '../Icon'

export function IconUnknown(props: SVGProps<SVGSVGElement>): ReactElement {
  return (
    <Icon {...props}>
      <path d="m16 0 16 13-6 19H6L0 13 16 0z" />
    </Icon>
  )
}
