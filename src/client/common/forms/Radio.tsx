import React, {DetailedHTMLProps, InputHTMLAttributes, ReactNode} from 'react'
import classNames from 'classnames'
import {uniqueId} from 'lodash'
import styles from './radio.scss'

type RadioProps = {
  children: ReactNode;
  className?: string;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export function Radio({children, className, ...inputProps}: RadioProps) {
  const classes = classNames(styles.container, className)
  const id = uniqueId()

  return (
    <div className={classes}>
      <div className={styles.radio}>
        <input id={id}
               className={styles.input}
               type='radio'
               {...inputProps}/>
        <label htmlFor={id} className={styles.children}>{children}</label>
      </div>
    </div>
  )
}
