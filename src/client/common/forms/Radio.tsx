import React, {DetailedHTMLProps, InputHTMLAttributes, ReactElement, ReactNode} from 'react'
import cn from 'classnames'
import uniqueId from 'lodash/uniqueId'
import styles from './radio.scss'

type RadioProps = {
  readonly children: ReactNode;
  readonly className?: string;
} & Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'type'>

export function Radio({children, className, id, ...inputProps}: RadioProps): ReactElement {
  const classes = cn(styles.container, className)
  const actualId = id ?? uniqueId('i')

  return (
    <div className={classes}>
      <div className={styles.radio}>
        <input id={actualId}
               className={styles.input}
               type='radio'
               {...inputProps}/>
        <label htmlFor={actualId} className={styles.children}>{children}</label>
      </div>
    </div>
  )
}
