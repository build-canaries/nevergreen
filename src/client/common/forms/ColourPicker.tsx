import type { ReactElement } from 'react'
import type { InputProps } from './Input'
import { Input } from './Input'
import styles from './colour-picker.scss'

export function ColourPicker({
  children,
  ...props
}: Omit<InputProps, 'type' | 'classNameInput'>): ReactElement {
  return (
    <Input type="color" classNameInput={styles.input} {...props}>
      {children}
    </Input>
  )
}
