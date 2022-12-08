import React, { ReactElement, ReactNode } from 'react'
import styles from './visually-hidden.scss'

interface VisuallyHiddenProps {
  readonly children: ReactNode
}

export const VISUALLY_HIDDEN_ATTRIBUTE = 'data-visually-hidden'

export function VisuallyHidden({
  children,
}: VisuallyHiddenProps): ReactElement {
  const hiddenAttribute = { [VISUALLY_HIDDEN_ATTRIBUTE]: true }
  return (
    <span className={styles.content} {...hiddenAttribute}>
      {children}
    </span>
  )
}
