import React, {DetailedHTMLProps, InputHTMLAttributes, ReactNode} from 'react'
import classNames from 'classnames'
import {uniqueId} from 'lodash'
import styles from './checkbox.scss'

type CheckboxProps = {
  readonly children: ReactNode;
  readonly onToggle: (checked: boolean) => void;
  readonly className?: string;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export function Checkbox({children, onToggle, className, ...inputProps}: CheckboxProps) {
  const classes = classNames(styles.container, className)
  const id = uniqueId()

  return (
    <div className={classes}>
      <div className={styles.checkbox}>
        <input id={id}
               className={styles.input}
               type='checkbox'
               onChange={(evt) => onToggle(evt.target.checked)}
               {...inputProps}/>
        <label htmlFor={id} className={styles.children}>{children}</label>
      </div>
    </div>
  )
}
