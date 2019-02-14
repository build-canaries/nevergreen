import React, {useLayoutEffect, useRef, useState} from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import styles from './container.scss'

export function Container({initiallyHidden, highlight, className, title, subTitle, children}) {
  const rootNode = useRef(null)
  useLayoutEffect(() => {
    if (highlight && rootNode.current) {
      rootNode.current.scrollIntoView(true)
    }
  })

  const [hidden, setHidden] = useState(initiallyHidden)

  const toggleHidden = () => setHidden(!hidden)
  const keyToggle = (evt) => {
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
  const label = `${hidden ? 'show' : 'hide'} section ${title}`

  return (
    <section className={styles.container}
             ref={rootNode}>
      <div className={titleBarClasses}
           title={label}
           onClick={toggleHidden}
           onKeyPress={keyToggle}
           tabIndex='0'
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

Container.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  className: PropTypes.string,
  initiallyHidden: PropTypes.bool,
  highlight: PropTypes.bool
}
