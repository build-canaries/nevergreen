import type { ReactElement, SVGProps } from 'react'
import { Icon } from './Icon'

export function AidKit(props: SVGProps<SVGSVGElement>): ReactElement {
  return (
    <Icon {...props}>
      <path d="M28 8h-6V4c0-1.1-.9-2-2-2h-8c-1.1 0-2 .9-2 2v4H4c-2.2 0-4 1.8-4 4v16c0 2.2 1.8 4 4 4h24c2.2 0 4-1.8 4-4V12c0-2.2-1.8-4-4-4zM12 4h8v4h-8V4zm12 18h-6v6h-4v-6H8v-4h6v-6h4v6h6v4z" />
    </Icon>
  )
}
