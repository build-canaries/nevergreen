import React, {ReactNode} from 'react'
import styles from './loading.scss'
import {VisuallyHidden} from './VisuallyHidden'

interface LoadingProps {
  readonly children?: ReactNode;
  readonly loaded?: boolean;
}

export function Loading({loaded, children}: LoadingProps) {
  if (loaded) {
    return <>{children}</>
  } else {
    return (
      <div className={styles.loading}
           data-locator='loading'
           role='alertdialog'
           aria-busy='true'
           aria-live='assertive'>
        <VisuallyHidden>loading</VisuallyHidden>
        <span className={styles.pulse} aria-hidden='true'/>
        <span className={styles.pulse} aria-hidden='true'/>
        <span className={styles.pulse} aria-hidden='true'/>
      </div>
    )
  }
}
