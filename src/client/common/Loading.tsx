import type { ReactElement, ReactNode } from 'react'
import cn from 'classnames'
import { VisuallyHidden } from './VisuallyHidden'
import { useForceFocus } from './ForceFocusHook'
import styles from './loading.scss'

interface LoadingProps {
  readonly title: string
  readonly isLoading: boolean
  readonly children: ReactNode
  readonly className?: string
  readonly dark?: boolean
  readonly focus?: boolean
}

export function Loading({
  isLoading,
  children,
  className,
  dark = false,
  title = '',
  focus = false,
}: LoadingProps): ReactElement {
  const progressRef = useForceFocus<HTMLProgressElement>(focus, [isLoading])

  const progressProps = isLoading
    ? { 'aria-valuetext': 'loading', role: 'progressbar' }
    : { 'aria-valuetext': 'loaded', value: '1' }

  const classes = cn(
    styles.loading,
    {
      [styles.dark]: dark,
    },
    className,
  )

  const content = isLoading ? (
    <div className={classes} data-locator="loading">
      <span className={styles.pulse} aria-hidden="true" />
      <span className={styles.pulse} aria-hidden="true" />
      <span className={styles.pulse} aria-hidden="true" />
    </div>
  ) : (
    children
  )

  return (
    <>
      <VisuallyHidden>
        <progress
          ref={progressRef}
          tabIndex={-1}
          aria-label={title}
          {...progressProps}
        />
      </VisuallyHidden>
      {content}
    </>
  )
}
