import type { ReactElement, ReactNode } from 'react'
import { createElement } from 'react'

interface ElementProps {
  readonly type: string
  readonly children: ReactNode
}

export function Element({ type, children }: ElementProps): ReactElement {
  return createElement(
    type,
    {},
    <>
      &lt;{type}&gt;{children}&lt;/{type}&gt;
    </>,
  )
}
