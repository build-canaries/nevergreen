import type {
  DetailedHTMLProps,
  InputHTMLAttributes,
  ReactElement,
  ReactNode,
} from 'react'
import cn from 'classnames'
import uniqueId from 'lodash/uniqueId'
import styles from './radio.scss'

type RadioProps = {
  readonly children: ReactNode
  readonly className?: string
} & Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'type'
>

export function Radio({
  children,
  className,
  id,
  readOnly,
  disabled,
  ...inputProps
}: RadioProps): ReactElement {
  const containerClasses = cn(styles.container, className)
  const inputClasses = cn(styles.input, {
    [styles.readOnly]: readOnly,
  })
  const actualId = id ?? uniqueId('i')

  return (
    <div className={containerClasses}>
      <div className={styles.radio}>
        <input
          id={actualId}
          className={inputClasses}
          type="radio"
          disabled={disabled || readOnly}
          {...inputProps}
        />
        <label htmlFor={actualId} className={styles.children}>
          {children}
        </label>
      </div>
    </div>
  )
}
