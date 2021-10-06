import React, {ReactElement} from 'react'
import cn from 'classnames'
import isEmpty from 'lodash/isEmpty'
import isString from 'lodash/isString'
import styles from './messages.scss'
import {Warning} from './icons/Warning'
import {Checkmark} from './icons/Checkmark'

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
  readonly icon: ReactElement;
}

export function Messages({messages, type, className, id, icon}: MessagesProps): ReactElement | null {
  if (isEmpty(messages)) {
    return null
  }

  const classes = cn(styles[type], className)

  return (
    <div className={classes}>
      <div className={styles.icon}>
        {icon}
      </div>
      <ul className={styles.messages}
          data-locator={`${type}-messages`}
          id={id}>
        {
          isString(messages)
            ? <li className={styles.message}>{messages}</li>
            : messages.map((msg) => <li key={msg} className={styles.message}>{msg}</li>)
        }
      </ul>
    </div>
  )
}

export function ErrorMessages(props: Omit<MessagesProps, 'type' | 'icon'>): ReactElement | null {
  return <Messages type={MessagesType.ERROR} icon={<Warning/>} {...props}/>
}

export function WarningMessages(props: Omit<MessagesProps, 'type' | 'icon'>): ReactElement | null {
  return <Messages type={MessagesType.WARNING} icon={<Warning/>} {...props}/>
}

export function InfoMessages(props: Omit<MessagesProps, 'type' | 'icon'>): ReactElement | null {
  return <Messages type={MessagesType.INFO} icon={<Checkmark/>} {...props}/>
}
