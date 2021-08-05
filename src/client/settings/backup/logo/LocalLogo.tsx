import React, {ReactElement, SVGProps} from 'react'

export function LocalLogo(props: SVGProps<SVGSVGElement>): ReactElement {
  return (
    <svg xmlns='http://www.w3.org/2000/svg'
         width={32}
         height={32}
         viewBox='0 0 32 32'
         {...props}>
      <title>local</title>
      <path fill='#444'
            d='M28 0H0v32h32V4l-4-4zM16 4h4v8h-4V4zm12 24H4V4h2v10h18V4h2.343L28 5.657V28z'/>
    </svg>
  )
}
