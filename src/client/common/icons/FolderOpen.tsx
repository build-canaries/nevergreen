import React, { ReactElement, SVGProps } from 'react'
import { Icon } from './Icon'

export function FolderOpen(props: SVGProps<SVGSVGElement>): ReactElement {
  return (
    <Icon {...props}>
      <path fill="#444" d="M26 30l6-16H6L0 30zM4 12L0 30V4h9l4 4h13v4z" />
    </Icon>
  )
}
