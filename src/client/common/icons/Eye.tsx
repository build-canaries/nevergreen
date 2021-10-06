import React, {ReactElement, SVGProps} from 'react'
import {Icon} from './Icon'

export function Eye(props: SVGProps<SVGSVGElement>): ReactElement {
  return (
    <Icon {...props}>
      <path fill='#444'
            d='M16 6C9.021 6 2.972 10.064 0 16c2.972 5.936 9.021 10 16 10s13.027-4.064 16-10c-2.972-5.936-9.021-10-16-10zm7.889 5.303A15.212 15.212 0 0128.559 16a15.223 15.223 0 01-4.67 4.697C21.527 22.204 18.799 23 16 23s-5.527-.796-7.889-2.303A15.212 15.212 0 013.441 16a15.223 15.223 0 015.041-4.925 8 8 0 1015.036 0c.124.074.248.15.371.228zM16 13a3 3 0 11-6 0 3 3 0 016 0z'/>
    </Icon>
  )
}
