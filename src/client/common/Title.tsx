import React, {ReactElement, useEffect} from 'react'
import {VisuallyHidden} from './VisuallyHidden'
import {useForceFocus} from './ForceFocusHook'

interface TitleProps {
  readonly children: string;
}

export function Title({children}: TitleProps): ReactElement {
  const titleEl = useForceFocus<HTMLHeadingElement>()

  useEffect(() => {
    document.title = children
    return () => {
      document.title = 'Nevergreen'
    }
  }, [children])

  return (
    <VisuallyHidden>
      <h1 ref={titleEl}
          tabIndex={-1}
          data-locator='title'>
        {children}
      </h1>
    </VisuallyHidden>
  )
}
