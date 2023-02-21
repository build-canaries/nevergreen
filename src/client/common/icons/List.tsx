import type { ReactElement, SVGProps } from 'react'
import { Icon } from './Icon'

export function List(props: SVGProps<SVGSVGElement>): ReactElement {
  return (
    <Icon {...props}>
      <path
        fill="#444"
        d="M0 0h8v8H0zm12 2h20v4H12zM0 12h8v8H0zm12 2h20v4H12zM0 24h8v8H0zm12 2h20v4H12z"
      />
    </Icon>
  )
}
