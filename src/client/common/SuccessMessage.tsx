import React, {useRef} from 'react'
import {useIdealFontSize} from '../monitor/ScaleTextHook'
import styles from './success-message.scss'

interface SuccessMessageProps {
  readonly message: string;
}

export function SuccessMessage({message}: SuccessMessageProps) {
  const elementRef = useRef(null)
  const idealFontStyle = useIdealFontSize(elementRef, [message])

  return (
    <div className={styles.successMessage}
         style={idealFontStyle}
         ref={elementRef}
         data-locator='success-message'>
      {message}
    </div>
  )
}
