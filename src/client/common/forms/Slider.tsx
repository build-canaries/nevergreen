import type { ReactElement } from 'react'
import type { InputProps } from './Input'
import { Input } from './Input'
import styles from './slider.scss'

export function Slider({
  children,
  ...props
}: Omit<InputProps, 'type' | 'classNameInput'>): ReactElement {
  return (
    <Input {...props} type="range" classNameInput={styles.slider}>
      {children}
    </Input>
  )
}
