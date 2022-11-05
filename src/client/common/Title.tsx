import React, {ReactElement} from 'react'
import {VisuallyHidden} from './VisuallyHidden'
import {useForceFocus} from './ForceFocusHook'
import {useUpdateBrowserTitle} from './BrowserTitleHook'

interface TitleProps {
  readonly show?: boolean;
  readonly children: string;
  readonly icon?: ReactElement;
}

export function Title({show, children, icon}: TitleProps): ReactElement {
  const titleEl = useForceFocus<HTMLHeadingElement>()

  useUpdateBrowserTitle(children)

  const title = (
    <h1 ref={titleEl}
        tabIndex={-1}>
      {icon}
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
