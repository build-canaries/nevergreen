import React, { ReactElement } from 'react'
import { Input, InputProps } from './Input'
import cn from 'classnames'
import styles from './slider.scss'

export function Slider({
  children,
  className,
  ...props
}: Omit<InputProps, 'type'>): ReactElement {
  return (
    <Input {...props} type="range" className={cn(styles.slider, className)}>
      {children}
    </Input>
  )
}
