import React, {AnchorHTMLAttributes, DetailedHTMLProps, ReactNode} from 'react'
import {VisuallyHidden} from './VisuallyHidden'

type ExternalLinkProps = {
  children: ReactNode;
} & DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>

export function ExternalLink({children, ...aProps}: ExternalLinkProps) {
  return (
    <a {...aProps} target='_blank' rel='noopener noreferrer'>
      {children}
      <VisuallyHidden> (opens in a new window)</VisuallyHidden>
    </a>
  )
}
