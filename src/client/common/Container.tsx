import React, {KeyboardEvent, ReactElement, ReactNode, useEffect, useLayoutEffect, useRef, useState} from 'react'
import cn from 'classnames'
import styles from './container.scss'

interface ContainerProps {
  readonly children: ReactNode;
  readonly title: string;
  readonly subTitle?: string;
  readonly className?: string;
  readonly initiallyHidden?: boolean;
  readonly highlight?: boolean;
}

export function Container({initiallyHidden, highlight, className, title, subTitle, children}: ContainerProps): ReactElement {
  const rootNode = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    if (highlight && rootNode.current) {
      rootNode.current.scrollIntoView(true)
    }
  }, [highlight])

  const [hidden, setHidden] = useState(initiallyHidden)
  useEffect(() => setHidden(initiallyHidden), [initiallyHidden])

  const toggleHidden = () => setHidden(!hidden)

  const keyToggle = (evt: KeyboardEvent<HTMLDivElement>) => {
    if (evt.key === 'Enter' || evt.key === ' ') {
      toggleHidden()
      evt.preventDefault()
    }
  }

  const titleBarClasses = cn(styles.titleBar, {
    [styles.highlight]: highlight,
    [styles.show]: hidden,
    [styles.hide]: !hidden
  })
  const bodyClasses = cn(styles.body, className, {
    [styles.hidden]: hidden
  })
  const label = `${hidden ? 'Show' : 'Hide'} section ${title}`

  return (
    <section className={styles.container}
             ref={rootNode}>
      <div className={titleBarClasses}
           title={label}
           onClick={toggleHidden}
           onKeyPress={keyToggle}
           tabIndex={0}
           aria-label={label}
           aria-expanded={!hidden}
           role='button'
           data-locator='title-bar'>
        <h2 className={styles.title} data-locator='container-title'>{title}</h2>
        {
          subTitle && (
            <div className={styles.subTitle}
                 data-locator='container-sub-title'>
              {subTitle}
            </div>
          )
        }
      </div>
      <div className={bodyClasses} data-locator='body'>
        {children}
      </div>
    </section>
  )
}
