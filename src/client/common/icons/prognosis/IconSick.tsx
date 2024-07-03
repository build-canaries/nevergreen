import type { ReactElement, SVGProps } from 'react'
import { Icon } from '../Icon'

export function IconSick(props: SVGProps<SVGSVGElement>): ReactElement {
  return (
    <Icon {...props}>
      <path d="M1 1h14.5v14.5H1Zm15.5 0H31v14.5H16.5ZM1 16.5h14.5V31H1Zm15.5 0H31V31H16.5Z" />
    </Icon>
  )
}
