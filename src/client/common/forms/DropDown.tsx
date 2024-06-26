import type {
  DetailedHTMLProps,
  ReactElement,
  ReactNode,
  SelectHTMLAttributes,
} from 'react'
import { useId } from 'react'
import cn from 'classnames'
import styles from './drop-down.scss'

export type DropDownOptions = ReadonlyArray<{
  value: string
  display: string
}>

type DropDownProps = {
  readonly children: ReactNode
  readonly options: DropDownOptions
  readonly className?: string
  readonly disabled?: boolean
} & DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>

export function DropDown({
  className,
  children,
  options,
  id,
  ...inputProps
}: DropDownProps): ReactElement {
  const idIfNotProvided = useId()
  const labelClasses = cn(styles.inputContainer, className)
  const actualId = id ?? idIfNotProvided

  return (
    <div className={labelClasses}>
      <label className={styles.inputLabel} htmlFor={actualId}>
        {children}
      </label>
      <div className={styles.container}>
        <select className={styles.select} {...inputProps} id={actualId}>
          {options.map((op) => {
            return (
              <option key={op.value} value={op.value}>
                {op.display}
              </option>
            )
          })}
        </select>
      </div>
    </div>
  )
}
