import React, {useLayoutEffect} from 'react'
import {VisuallyHidden} from './VisuallyHidden'
import {useForceFocus} from './ForceFocusHook'

interface TitleProps {
  children: string;
}

export function Title({children}: TitleProps) {
  const titleEl = useForceFocus<HTMLHeadingElement>()

  useLayoutEffect(() => {
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
