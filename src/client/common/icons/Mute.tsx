import type { ReactElement, SVGProps } from 'react'
import { Icon } from './Icon'

export function Mute(props: SVGProps<SVGSVGElement>): ReactElement {
  return (
    <Icon {...props}>
      <path d="M30 19.348V22h-2.652L24 18.652 20.652 22H18v-2.652L21.348 16 18 12.652V10h2.652L24 13.348 27.348 10H30v2.652L26.652 16 30 19.348zM13 30a1 1 0 0 1-.707-.293L4.586 22H1a1 1 0 0 1-1-1V11a1 1 0 0 1 1-1h3.586l7.707-7.707A1 1 0 0 1 14 3v26a1.002 1.002 0 0 1-1 1z" />
    </Icon>
  )
}
