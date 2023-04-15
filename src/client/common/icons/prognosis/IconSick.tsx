import type { ReactElement, SVGProps } from 'react'
import { Icon } from '../Icon'

export function IconSick(props: SVGProps<SVGSVGElement>): ReactElement {
  return (
    <Icon {...props}>
      <path d="M1 1h30v30H1z" />
    </Icon>
  )
}
