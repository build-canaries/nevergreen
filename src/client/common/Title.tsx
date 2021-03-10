import React, {ReactElement, useEffect} from 'react'
import {VisuallyHidden} from './VisuallyHidden'
import {useForceFocus} from './ForceFocusHook'

interface TitleProps {
  readonly show?: boolean;
  readonly children: string;
}

export function Title({show, children}: TitleProps): ReactElement {
  const titleEl = useForceFocus<HTMLHeadingElement>()

  useEffect(() => {
    document.title = children
    return () => {
      document.title = 'Nevergreen'
    }
  }, [children])

  const title = (
    <h1 ref={titleEl}
        tabIndex={-1}
        data-locator='title'>
      {children}
    </h1>
  )

  if (show) {
    return title
  } else {
    return (
      <VisuallyHidden>
        {title}
      </VisuallyHidden>
    )
  }
}
