import React, {
  DetailedHTMLProps,
  InputHTMLAttributes,
  ReactElement,
  ReactNode,
} from 'react'
import classNames from 'classnames'
import uniqueId from 'lodash/uniqueId'
import styles from './checkbox.scss'

type CheckboxProps = {
  readonly children: ReactNode
  readonly onToggle: (checked: boolean) => void
  readonly className?: string
} & Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'type'
>

export function Checkbox({
  children,
  onToggle,
  className,
  id,
  ...inputProps
}: CheckboxProps): ReactElement {
  const classes = classNames(styles.container, className)
  const actualId = id ?? uniqueId('c')

  return (
    <div className={classes}>
      <div className={styles.checkbox}>
        <input
          id={actualId}
          className={styles.input}
          type="checkbox"
          onChange={(evt) => onToggle(evt.target.checked)}
          {...inputProps}
        />
        <label htmlFor={actualId} className={styles.children}>
          {children}
        </label>
      </div>
    </div>
  )
}
