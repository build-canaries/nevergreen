import React, { ReactElement, SVGProps } from 'react'
import { Icon } from './Icon'

export function Warning(props: SVGProps<SVGSVGElement>): ReactElement {
  return (
    <Icon {...props}>
      <path
        fill="#444"
        d="M16 3c-3.472 0-6.737 1.352-9.192 3.808S3 12.528 3 16c0 3.472 1.352 6.737 3.808 9.192S12.528 29 16 29c3.472 0 6.737-1.352 9.192-3.808S29 19.472 29 16c0-3.472-1.352-6.737-3.808-9.192S19.472 3 16 3zm0-3c8.837 0 16 7.163 16 16s-7.163 16-16 16S0 24.837 0 16 7.163 0 16 0zm-2 22h4v4h-4zm0-16h4v12h-4z"
      />
    </Icon>
  )
}
