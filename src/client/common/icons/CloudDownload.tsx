import React, {ReactElement, SVGProps} from 'react'
import {Icon} from './Icon'

export function CloudDownload(props: SVGProps<SVGSVGElement>): ReactElement {
  return (
    <Icon {...props}>
      <path fill='#444'
            d='M27.844 11.252A7.438 7.438 0 0020.411 4a7.42 7.42 0 00-5.839 2.835 4.168 4.168 0 00-3.303-1.624 4.177 4.177 0 00-4.133 4.771 6.056 6.056 0 00-7.134 5.96A6.056 6.056 0 006.056 22h2.868l7.078 7.328L23.08 22h3.484a5.45 5.45 0 001.282-10.747zM16 26l-6-6h4v-6h4v6h4l-6 6z'/>
    </Icon>
  )
}
