import type {ReactElement, ReactNode} from 'react'
import React from 'react'
import cn from 'classnames'
import styles from './loading.scss'
import {VisuallyHidden} from './VisuallyHidden'
import {useForceFocus} from './ForceFocusHook'

interface LoadingProps {
  readonly title: string;
  readonly loaded: boolean;
  readonly children: ReactNode;
  readonly className?: string;
  readonly dark?: boolean;
  readonly focus?: boolean;
}

export function Loading({
                          loaded,
                          children,
                          className,
                          dark = false,
                          title = '',
                          focus = false
                        }: LoadingProps): ReactElement {
  const progressRef = useForceFocus<HTMLProgressElement>(focus, [loaded])

  const progressProps = loaded
    ? {'aria-valuetext': 'loaded', value: '1'}
    : {'aria-valuetext': 'loading', role: 'progressbar'}

  const classes = cn(styles.loading, {
    [styles.dark]: dark
  }, className)

  const content = loaded
    ? children
    : (
      <div className={classes}
           data-locator="loading">
        <span className={styles.pulse} aria-hidden="true"/>
        <span className={styles.pulse} aria-hidden="true"/>
        <span className={styles.pulse} aria-hidden="true"/>
      </div>
    )

  return (
    <>
      <VisuallyHidden>
        <progress ref={progressRef} tabIndex={-1} aria-label={title} {...progressProps} />
      </VisuallyHidden>
      {content}
    </>
  )
}
