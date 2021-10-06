import React, {ReactElement, SVGProps} from 'react'
import {Icon} from './Icon'

export function Loop(props: SVGProps<SVGSVGElement>): ReactElement {
  return (
    <Icon {...props}>
      <path fill='#444'
            d='M27.802 5.197A15.958 15.958 0 0015.999 0c-8.837 0-16 7.163-16 16h3c0-7.18 5.82-13 13-13 3.844 0 7.298 1.669 9.678 4.322L20.999 12h11V1l-4.198 4.197zM29 16c0 7.18-5.82 13-13 13a12.965 12.965 0 01-9.678-4.322L11 20H0v11l4.197-4.197A15.958 15.958 0 0016 32c8.837 0 16-7.163 16-16h-3z'/>
    </Icon>
  )
}
