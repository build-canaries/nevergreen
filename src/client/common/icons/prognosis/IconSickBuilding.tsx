import type { ReactElement, SVGProps } from 'react'
import { Icon } from '../Icon'

export function IconSickBuilding(props: SVGProps<SVGSVGElement>): ReactElement {
  return (
    <Icon {...props}>
      <path d="M1 31h30V1z" />
    </Icon>
  )
}
