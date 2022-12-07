import React, {ReactElement} from 'react'
import {VisuallyHidden} from './VisuallyHidden'
import {useForceFocus} from './ForceFocusHook'
import {useUpdateBrowserTitle} from './BrowserTitleHook'

interface TitleProps {
  readonly children: string;
  readonly show?: boolean;
  readonly icon?: ReactElement;
  readonly focus?: boolean;
}

export function Title({show, children, icon, focus}: TitleProps): ReactElement {
  const titleEl = useForceFocus<HTMLHeadingElement>(focus)

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
