import React from 'react'
import styles from './success-message.scss'
import {ScaleText} from './ScaleText'

interface SuccessMessageProps {
  readonly message: string;
}

export function SuccessMessage({message}: SuccessMessageProps) {
  return (
    <div className={styles.successMessage}
         data-locator='success-message'>
      <ScaleText sentences={[message]}>{message}</ScaleText>
    </div>
  )
}
