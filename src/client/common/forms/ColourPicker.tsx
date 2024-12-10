import type { ReactElement } from 'react'
import type { InputProps } from './Input'
import { Input } from './Input'
import styles from './colour-picker.scss'

export function ColourPicker({
  children,
  value,
  ...props
}: Omit<InputProps, 'type' | 'classNameInput'>): ReactElement {
  return (
    <Input
      value={value}
      classNameInput={styles.textInput}
      classNameContainer={styles.textContainer}
      {...props}
      button={
        <Input
          type="color"
          classNameInput={styles.colorInput}
          classNameContainer={styles.colorContainer}
          value={value}
          {...props}
        >
          <span />
        </Input>
      }
    >
      {children}
    </Input>
  )
}
