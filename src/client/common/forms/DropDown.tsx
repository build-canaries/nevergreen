import React, {DetailedHTMLProps, ReactElement, ReactNode, SelectHTMLAttributes} from 'react'
import cn from 'classnames'
import uniqueId from 'lodash/uniqueId'
import styles from './drop-down.scss'
import formStyles from './forms.scss'

export type DropDownOptions = ReadonlyArray<{
  value: string;
  display: string;
}>;

type DropDownProps = {
  readonly children: ReactNode;
  readonly options: DropDownOptions;
  readonly className?: string;
  readonly disabled?: boolean;
} & DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>

export function DropDown({className, children, options, id, ...inputProps}: DropDownProps): ReactElement {
  const labelClasses = cn(formStyles.inputContainer, className)
  const actualId = id ?? uniqueId('i')

  return (
    <div className={labelClasses}>
      <label className={formStyles.inputLabel} htmlFor={actualId}>{children}</label>
      <div className={styles.container}>
        <select className={styles.select} {...inputProps} id={actualId}>
          {
            options.map((op) => {
              return <option key={op.value} value={op.value}>{op.display}</option>
            })
          }
        </select>
      </div>
    </div>
  )
}
