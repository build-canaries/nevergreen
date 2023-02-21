import type { ReactElement, SVGProps } from 'react'
import { Icon } from './Icon'

export function FloppyDisk(props: SVGProps<SVGSVGElement>): ReactElement {
  return (
    <Icon {...props}>
      <path
        fill="#444"
        d="M28 0H0v32h32V4l-4-4zM16 4h4v8h-4V4zm12 24H4V4h2v10h18V4h2.343L28 5.657V28z"
      />
    </Icon>
  )
}
