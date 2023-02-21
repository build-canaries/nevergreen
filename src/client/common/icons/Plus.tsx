import type { ReactElement, SVGProps } from 'react'
import { Icon } from './Icon'

export function Plus(props: SVGProps<SVGSVGElement>): ReactElement {
  return (
    <Icon {...props}>
      <path
        fill="#444"
        d="M31 12H20V1a1 1 0 00-1-1h-6a1 1 0 00-1 1v11H1a1 1 0 00-1 1v6a1 1 0 001 1h11v11a1 1 0 001 1h6a1 1 0 001-1V20h11a1 1 0 001-1v-6a1 1 0 00-1-1z"
      />
    </Icon>
  )
}
