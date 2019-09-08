import React, {ReactNode} from 'react'

interface ElementProps {
  readonly type: string;
  readonly children: ReactNode;
}

export function Element({type, children}: ElementProps) {
  return React.createElement(type, {},
    <>
      &lt;{type}&gt;{children}&lt;/{type}&gt;
    </>
  )
}
