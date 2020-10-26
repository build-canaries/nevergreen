import React, {ReactElement} from 'react'
import cn from 'classnames'
import {isEmpty, isString} from 'lodash'
import styles from './messages.scss'

export enum MessagesType {
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error'
}

export type MessagesProps = {
  readonly id?: string;
  readonly type: MessagesType;
  readonly messages: ReadonlyArray<string> | string;
  readonly className?: string;
}

export function Messages({messages, type, className, id}: MessagesProps): ReactElement | null {
  if (isEmpty(messages)) {
    return null
  }

  const isError = type === MessagesType.ERROR
  const classes = cn(styles[type], className)

  return (
    <ul className={classes}
        data-locator={`${type}-messages`}
        aria-live={isError ? 'assertive' : 'polite'}
        id={id}>
      {
        isString(messages)
          ? <li className={styles.message}>{messages}</li>
          : messages.map((msg) => <li key={msg} className={styles.message}>{msg}</li>)
      }
    </ul>
  )
}

export function ErrorMessages(props: Omit<MessagesProps, 'type'>): ReactElement | null {
  return <Messages type={MessagesType.ERROR} {...props}/>
}

export function WarningMessages(props: Omit<MessagesProps, 'type'>): ReactElement | null {
  return <Messages type={MessagesType.WARNING} {...props}/>
}

export function InfoMessages(props: Omit<MessagesProps, 'type'>): ReactElement | null {
  return <Messages type={MessagesType.INFO} {...props}/>
}
