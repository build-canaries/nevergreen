import React, {cloneElement, useState} from 'react'
import PropTypes from 'prop-types'
import {Modal} from './Modal'
import cn from 'classnames'
import styles from './contextual-help.scss'
import {SecondaryButton} from './forms/Button'
import {iQuestion} from './fonts/Icons'

export function ContextualHelp({help, title, className}) {
  const [show, setShow] = useState(false)

  const fullTitle = `Help - ${title}`
  const clonedHelp = cloneElement(help, {close: () => setShow(false)})

  return (
    <>
      <SecondaryButton icon={iQuestion}
                       iconOnly
                       className={cn(styles.helpButton, className)}
                       onClick={() => setShow(true)}
                       aria-expanded={show}
                       data-locator='help-button'>
        show help
      </SecondaryButton>
      <Modal title={fullTitle}
             show={show}
             close={() => setShow(false)}>
        {clonedHelp}
      </Modal>
    </>
  )
}

ContextualHelp.propTypes = {
  title: PropTypes.string.isRequired,
  help: PropTypes.element.isRequired,
  className: PropTypes.string
}

export function WithHelp({help, title, className, children}) {
  return (
    <div className={styles.inline}>
      {children}
      <ContextualHelp title={title} help={help} className={className}/>
    </div>
  )
}

WithHelp.propTypes = {
  title: PropTypes.string.isRequired,
  help: PropTypes.element.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired
}
