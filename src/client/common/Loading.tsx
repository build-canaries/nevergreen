import React, {ReactElement, ReactNode} from 'react'
import cn from 'classnames'
import styles from './loading.scss'
import {VisuallyHidden} from './VisuallyHidden'

interface LoadingProps {
  readonly children?: ReactNode;
  readonly loaded?: boolean;
  readonly dark?: boolean;
  readonly className?: string;
}

export function Loading({loaded, children, dark = false, className}: LoadingProps): ReactElement {
  if (loaded) {
    return <>{children}</>
  } else {
    const classes = cn(styles.loading, {
      [styles.dark]: dark
    }, className)

    return (
      <div className={classes}
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
