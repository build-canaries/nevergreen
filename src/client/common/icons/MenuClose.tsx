import type { ReactElement, SVGProps } from 'react'
import { Icon } from './Icon'

export function MenuClose(props: SVGProps<SVGSVGElement>): ReactElement {
  return (
    <Icon {...props} width={44} viewBox={'0 0 44 32'}>
      <path d="M0 6h28v6H0V6zm0 8h28v6H0v-6zm0 8h28v6H0v-6zM31 20l6-6 6 6z" />
    </Icon>
  )
}
