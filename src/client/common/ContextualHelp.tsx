import React, {cloneElement, ReactElement, ReactNode, useState} from 'react'
import {Modal} from './Modal'
import cn from 'classnames'
import styles from './contextual-help.scss'
import {SecondaryButton} from './forms/Button'
import {iQuestion} from './fonts/Icons'

interface ContextualHelpProps {
  title: string;
  help: ReactElement;
  className?: string;
}

export function ContextualHelp({help, title, className}: ContextualHelpProps) {
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

interface WithHelpProps {
  title: string;
  help: ReactElement;
  containerClassName?: string;
  className?: string;
  children: ReactNode;
}

export function WithHelp({help, title, containerClassName, className, children}: WithHelpProps) {
  return (
    <div className={cn(styles.inline, containerClassName)}>
      {children}
      <ContextualHelp title={title} help={help} className={className}/>
    </div>
  )
}
