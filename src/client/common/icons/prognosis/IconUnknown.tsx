import type { ReactElement, SVGProps } from 'react'
import { Icon } from '../Icon'

export function IconUnknown(props: SVGProps<SVGSVGElement>): ReactElement {
  return (
    <Icon {...props}>
      <path d="M16.5 1H31v14.5H16.5ZM1 16.5h14.5V31H1Zm15.5 0V31a15.27 15.285 0 0 0 10.051-4.437A15.27 15.285 0 0 0 31 16.5Zm-1-1V1A15.27 15.285 0 0 0 5.444 5.437a15.27 15.285 0 0 0-4.441 10.058Z" />
    </Icon>
  )
}
