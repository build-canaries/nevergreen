import * as React from 'react'
import {ReactElement} from 'react'

export function FeedLogo(props: React.SVGProps<SVGSVGElement>): ReactElement {
  return (
    <svg xmlns='http://www.w3.org/2000/svg'
         width={32}
         height={32}
         viewBox='0 0 32 32'
         {...props}>
      <title>feed</title>
      <path fill='#444'
            d='M0 0h8v8H0zm12 2h20v4H12zM0 12h8v8H0zm12 2h20v4H12zM0 24h8v8H0zm12 2h20v4H12z'/>
    </svg>
  )
}
