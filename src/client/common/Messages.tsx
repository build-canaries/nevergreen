import type { ReactElement, ReactNode } from 'react'
import cn from 'classnames'
import isEmpty from 'lodash/isEmpty'
import isArray from 'lodash/isArray'
import { Warning } from './icons/Warning'
import { Cross } from './icons/Cross'
import { SecondaryButton } from './forms/Button'
import { VisuallyHidden } from './VisuallyHidden'
import { Info } from './icons/Info'
import { Checkmark } from './icons/Checkmark'
import styles from './messages.scss'

export enum MessagesType {
  info = 'info',
  warning = 'warning',
  error = 'error',
  success = 'success',
}

export interface MessagesProps {
  readonly type: MessagesType
  readonly messages: ReadonlyArray<ReactNode> | ReactNode
  readonly className?: string
  readonly icon: ReactElement
  readonly onDismiss?: () => void
}

export function Messages({
  messages,
  type,
  className,
  icon,
  onDismiss,
}: MessagesProps): ReactElement | null {
  if (isEmpty(messages)) {
    return null
  }

  const classes = cn(styles[type], className)

  return (
    <div className={classes} role="status">
      <div className={styles.icon}>
        <VisuallyHidden>{type}</VisuallyHidden>
        {icon}
      </div>
      <ul className={styles.messages}>
        {isArray(messages) ? (
          messages.map((msg, i) => (
            <li key={i} className={styles.message}>
              {msg}
            </li>
          ))
        ) : (
          <li className={styles.message}>{messages}</li>
        )}
      </ul>
      {onDismiss && (
        <SecondaryButton
          onClick={onDismiss}
          icon={<Cross />}
          iconOnly
          className={styles.dismiss}
        >
          Dismiss {type} messages
        </SecondaryButton>
      )}
    </div>
  )
}

export function ErrorMessages(
  props: Omit<MessagesProps, 'type' | 'icon'>,
): ReactElement | null {
  return <Messages type={MessagesType.error} icon={<Warning />} {...props} />
}

export function WarningMessages(
  props: Omit<MessagesProps, 'type' | 'icon'>,
): ReactElement | null {
  return <Messages type={MessagesType.warning} icon={<Warning />} {...props} />
}

export function InfoMessages(
  props: Omit<MessagesProps, 'type' | 'icon'>,
): ReactElement | null {
  return <Messages type={MessagesType.info} icon={<Info />} {...props} />
}

export function SuccessMessages(
  props: Omit<MessagesProps, 'type' | 'icon'>,
): ReactElement | null {
  return (
    <Messages type={MessagesType.success} icon={<Checkmark />} {...props} />
  )
}
