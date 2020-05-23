import React, {ReactElement} from 'react'
import styles from './success-message.scss'
import {ScaleText} from './ScaleText'

interface SuccessMessageProps {
  readonly message: string;
}

export function SuccessMessage({message}: SuccessMessageProps): ReactElement {
  return (
    <div className={styles.successMessage}
         data-locator='success-message'>
      <ScaleText sentences={[message]}>{message}</ScaleText>
    </div>
  )
}
