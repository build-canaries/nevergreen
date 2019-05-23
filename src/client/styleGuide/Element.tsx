import React, {Fragment, ReactNode} from 'react'

interface ElementProps {
  type: string;
  children: ReactNode;
}

export function Element({type, children}: ElementProps) {
  return React.createElement(type, {},
    <Fragment>
      &lt;{type}&gt;{children}&lt;/{type}&gt;
    </Fragment>
  )
}
