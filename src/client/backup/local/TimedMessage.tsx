import React, {ReactElement, useEffect, useState} from 'react'
import {Messages, MessagesProps} from '../../common/Messages'
import {CSSTransition} from 'react-transition-group'
import cn from 'classnames'
import styles from './timed-message.scss'
import {isEmpty} from 'lodash'

interface TimedMessageProps extends MessagesProps {
  readonly clear: (value: string) => void;
}

export function TimedMessage({className, clear, messages, ...props}: TimedMessageProps): ReactElement {
  const [show, setShow] = useState(true)

  useEffect(() => {
    if (!isEmpty(messages)) {
      setShow(true)

      const id = setTimeout(() => {
        setShow(false)
      }, 20000)

      return () => {
        clearTimeout(id)
      }
    }
  }, [messages])

  return (
    <CSSTransition in={show}
                   timeout={300}
                   classNames={{...styles}}
                   onExited={() => {
                     clear('')
                   }}>
      <Messages className={cn(className, styles.message)} messages={messages} {...props}/>
    </CSSTransition>
  )
}
