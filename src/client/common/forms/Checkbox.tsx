import type {
  DetailedHTMLProps,
  InputHTMLAttributes,
  ReactElement,
  ReactNode,
} from 'react'
import { useId } from 'react'
import classNames from 'classnames'
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
  const idIfNotProvided = useId()
  const classes = classNames(styles.container, className)
  const actualId = id ?? idIfNotProvided

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
