import type { ReactElement, SVGProps } from 'react'
import { Icon } from '../Icon'

export function IconHealthy(props: SVGProps<SVGSVGElement>): ReactElement {
  return (
    <Icon {...props}>
      <path d="M4.904 26.063 14.967 16 4.904 5.937A15 15 0 0 0 1 16a15 15 0 0 0 3.904 10.063ZM26.063 27.096 16 17.033 5.937 27.096A15 15 0 0 0 16 31a15 15 0 0 0 10.063-3.904ZM17.033 16l10.063 10.063A15 15 0 0 0 31 16a15 15 0 0 0-3.893-10.074ZM5.938 4.904 16 14.967 26.074 4.893A15 15 0 0 0 16 1 15 15 0 0 0 5.937 4.904Z" />
    </Icon>
  )
}
