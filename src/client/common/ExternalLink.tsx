import React, {AnchorHTMLAttributes, DetailedHTMLProps, ReactElement, ReactNode} from 'react'
import {VisuallyHidden} from './VisuallyHidden'

type ExternalLinkProps = {
  readonly children: ReactNode;
  readonly href: string;
} & DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>

export function ExternalLink({children, ...aProps}: ExternalLinkProps): ReactElement {
  return (
    <a {...aProps} target='_blank' rel='noopener noreferrer'>
      {children}
      <VisuallyHidden> (opens in a new window)</VisuallyHidden>
    </a>
  )
}
