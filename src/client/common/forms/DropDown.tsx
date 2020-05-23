import React, {DetailedHTMLProps, ReactElement, ReactNode, SelectHTMLAttributes} from 'react'
import classNames from 'classnames'
import {uniqueId} from 'lodash'
import styles from './drop-down.scss'
import formStyles from './forms.scss'

type DropDownProps = {
  readonly children: ReactNode;
  readonly options: ReadonlyArray<{
    value: string;
    display: string;
  }>;
  readonly className?: string;
  readonly disabled?: boolean;
} & DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>

export function DropDown({className, children, options, disabled, ...inputProps}: DropDownProps): ReactElement {
  const labelClasses = classNames(formStyles.inputContainer, className)
  const id = uniqueId('i')

  return (
    <label className={labelClasses} htmlFor={id}>
      <span className={formStyles.inputLabel}>{children}</span>
      <select className={styles.input} {...inputProps} id={id}>
        {
          options.map((op) => {
            return <option key={op.value} value={op.value}>{op.display}</option>
          })
        }
      </select>
      <span className={classNames(styles.arrow, {[styles.disabled]: disabled})} aria-hidden/>
    </label>
  )
}
