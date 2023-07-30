import type { ReactElement, SVGProps } from 'react'
import { Icon } from './Icon'

export function CheckboxUnchecked(
  props: SVGProps<SVGSVGElement>,
): ReactElement {
  return (
    <Icon {...props}>
      <path
        fill="#444"
        d="M28 0H4C1.8 0 0 1.8 0 4v24c0 2.2 1.8 4 4 4h24c2.2 0 4-1.8 4-4V4c0-2.2-1.8-4-4-4zm0 28H4V4h24v24z"
      />
    </Icon>
  )
}
