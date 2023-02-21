import type { ReactElement } from 'react'
import { ScaleText } from './ScaleText'
import styles from './success-message.scss'

interface SuccessMessageProps {
  readonly message: string
}

export function SuccessMessage({ message }: SuccessMessageProps): ReactElement {
  return (
    <div className={styles.successMessage} data-locator="success-message">
      <ScaleText sentences={[message]}>{message}</ScaleText>
    </div>
  )
}
