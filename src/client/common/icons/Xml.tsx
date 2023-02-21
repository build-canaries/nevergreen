import type { ReactElement, SVGProps } from 'react'
import { Icon } from './Icon'

export function Xml(props: SVGProps<SVGSVGElement>): ReactElement {
  return (
    <Icon {...props}>
      <path
        fill="#444"
        d="M18 23l3 3 10-10L21 6l-3 3 7 7zM14 9l-3-3L1 16l10 10 3-3-7-7z"
      />
    </Icon>
  )
}
