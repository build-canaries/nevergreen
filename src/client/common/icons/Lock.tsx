import React, {ReactElement, SVGProps} from 'react'
import {Icon} from './Icon'

export function Lock(props: SVGProps<SVGSVGElement>): ReactElement {
  return (
    <Icon {...props}>
      <path fill='#444'
            d='M18.5 14H18V8c0-3.308-2.692-6-6-6H8C4.692 2 2 4.692 2 8v6h-.5c-.825 0-1.5.675-1.5 1.5v15c0 .825.675 1.5 1.5 1.5h17c.825 0 1.5-.675 1.5-1.5v-15c0-.825-.675-1.5-1.5-1.5zM6 8c0-1.103.897-2 2-2h4c1.103 0 2 .897 2 2v6H6V8z'/>
    </Icon>
  )
}
