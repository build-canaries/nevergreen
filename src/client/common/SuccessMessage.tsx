import type { ReactElement } from 'react'
import { ScaleText } from './ScaleText'
import { useAppSelector } from '../configuration/Hooks'
import {
  getSuccessBackgroundColour,
  getSuccessTextColour,
} from '../settings/success/SuccessReducer'
import styles from './success-message.scss'

interface SuccessMessageProps {
  readonly message: string
}

export function SuccessMessage({ message }: SuccessMessageProps): ReactElement {
  const backgroundColor = useAppSelector(getSuccessBackgroundColour)
  const color = useAppSelector(getSuccessTextColour)

  return (
    <div className={styles.successMessage} style={{ backgroundColor, color }}>
      <ScaleText sentences={[message]}>{message}</ScaleText>
    </div>
  )
}
