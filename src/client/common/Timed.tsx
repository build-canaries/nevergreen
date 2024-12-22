import { ReactElement, useRef } from 'react'
import { useEffect, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import styles from './timed.scss'

interface TimedProps {
  readonly show: boolean
  readonly onTimeout: () => void
  readonly children: ReactElement
  readonly timeout?: number
}

export function Timed({
  show,
  onTimeout,
  children,
  timeout = 20000,
}: TimedProps): ReactElement {
  const [showing, setShowing] = useState(show)
  useEffect(() => {
    setShowing(show)
  }, [show])
  const nodeRef = useRef()

  return (
    <CSSTransition
      in={showing}
      timeout={300}
      classNames={{ ...styles }}
      onExited={onTimeout}
      mountOnEnter
      unmountOnExit
      nodeRef={nodeRef}
    >
      <div
        className={styles.progress}
        style={{ animationDuration: `${timeout.toString()}ms` }}
        onAnimationEnd={() => {
          setShowing(false)
        }}
      >
        {children}
      </div>
    </CSSTransition>
  )
}
