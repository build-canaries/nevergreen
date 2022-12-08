import React, { ReactElement, SVGProps } from 'react'
import { Icon } from './Icon'

export function CheckboxChecked(props: SVGProps<SVGSVGElement>): ReactElement {
  return (
    <Icon {...props}>
      <path
        fill="#444"
        d="M28 0H4C1.8 0 0 1.8 0 4v24c0 2.2 1.8 4 4 4h24c2.2 0 4-1.8 4-4V4c0-2.2-1.8-4-4-4zM14 24.828l-7.414-7.414 2.828-2.828L14 19.172l9.586-9.586 2.828 2.828L14 24.828z"
      />
    </Icon>
  )
}
