import type { ReactElement, SVGProps } from 'react'
import { Icon } from '../Icon'

export function IconSickBuilding(props: SVGProps<SVGSVGElement>): ReactElement {
  return (
    <Icon {...props}>
      <path d="M16.5 1H31v14.5H16.5ZM1 16.5h14.5V31H1Zm15.5 0H31V31H16.5Z" />
    </Icon>
  )
}
