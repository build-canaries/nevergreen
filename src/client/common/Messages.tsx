import React, {ReactElement} from 'react'
import cn from 'classnames'
import isEmpty from 'lodash/isEmpty'
import isString from 'lodash/isString'
import styles from './messages.scss'
import {Warning} from './icons/Warning'
import {Checkmark} from './icons/Checkmark'
import {Cross} from './icons/Cross'
import {BaseButton, ButtonTheme} from './forms/Button'
import {VisuallyHidden} from './VisuallyHidden'

export enum MessagesType {
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error'
}

export interface MessagesProps {
  readonly type: MessagesType;
  readonly messages: ReadonlyArray<string> | string;
  readonly className?: string;
  readonly icon: ReactElement;
  readonly onDismiss?: () => void;
}

export function Messages({messages, type, className, icon, onDismiss}: MessagesProps): ReactElement | null {
  if (isEmpty(messages)) {
    return null
  }

  const classes = cn(styles[type], className)

  return (
    <div className={classes} role='status'>
      <div className={styles.icon}>
        <VisuallyHidden>{type}</VisuallyHidden>
        {icon}
      </div>
      <ul className={styles.messages}>
        {
          isString(messages)
            ? <li className={styles.message}>{messages}</li>
            : messages.map((msg) => <li key={msg} className={styles.message}>{msg}</li>)
        }
      </ul>
      {onDismiss && (
        <BaseButton onClick={onDismiss}
                    icon={<Cross/>}
                    iconOnly
                    theme={ButtonTheme.transparent}
                    className={styles.dismiss}>
          Dismiss {type} messages
        </BaseButton>
      )}
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
