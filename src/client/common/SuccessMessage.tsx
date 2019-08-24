import React from 'react'
import {ScaledGrid} from './scale/ScaledGrid'
import styles from './success-message.scss'

interface SuccessMessageProps {
  message: string;
}


export function SuccessMessage({message}: SuccessMessageProps) {
  return (
    <ScaledGrid>
      <div className={styles.successMessage}>
        <div className={styles.message} data-locator='success-message'>{message}</div>
      </div>
    </ScaledGrid>
  )
}
