import type { ReactElement, SVGProps } from 'react'
import { Icon } from '../Icon'

export function IconHealthy(props: SVGProps<SVGSVGElement>): ReactElement {
  return (
    <Icon {...props}>
      <path d="M0 16a16 16 0 1 1 32 0 16 16 0 1 1-32 0" />
    </Icon>
  )
}
