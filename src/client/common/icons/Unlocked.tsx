import type { ReactElement, SVGProps } from 'react'
import { Icon } from './Icon'

export function Unlocked(props: SVGProps<SVGSVGElement>): ReactElement {
  return (
    <Icon {...props}>
      <path
        fill="#444"
        d="M24 2c3.308 0 6 2.692 6 6v6h-4V8c0-1.103-.897-2-2-2h-4c-1.103 0-2 .897-2 2v6h.5c.825 0 1.5.675 1.5 1.5v15c0 .825-.675 1.5-1.5 1.5h-17C.675 32 0 31.325 0 30.5v-15c0-.825.675-1.5 1.5-1.5H14V8c0-3.308 2.692-6 6-6h4z"
      />
    </Icon>
  )
}
