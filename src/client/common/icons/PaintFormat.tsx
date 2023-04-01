import type { ReactElement, SVGProps } from 'react'
import { Icon } from './Icon'

export function PaintFormat(props: SVGProps<SVGSVGElement>): ReactElement {
  return (
    <Icon {...props}>
      <path d="M32 18v-12h-6v-2c0-1.1-0.9-2-2-2h-22c-1.1 0-2 0.9-2 2v6c0 1.1 0.9 2 2 2h22c1.1 0 2-0.9 2-2v-2h4v8h-18v4h-1c-0.552 0-1 0.448-1 1v10c0 0.552 0.448 1 1 1h4c0.552 0 1-0.448 1-1v-10c0-0.552-0.448-1-1-1h-1v-2h18zM24 6h-22v-2h22v2z" />
    </Icon>
  )
}
