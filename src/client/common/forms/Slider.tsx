import React, {
  DetailedHTMLProps,
  InputHTMLAttributes,
  ReactElement,
  ReactNode,
  useRef,
} from 'react'
import cn from 'classnames'
import uniqueId from 'lodash/uniqueId'
import styles from './input.scss'
import formStyles from './forms.scss'

export type SliderProps = {
  readonly children: ReactNode
  readonly readOnly?: boolean
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export function Slider({
  children,
  className,
  readOnly,
  id,
  ...SliderProps
}: SliderProps): ReactElement {
  const inputNode = useRef<HTMLInputElement>(null)
  const actualId = id ?? uniqueId('i')
  const containerClasses = cn(formStyles.inputContainer, className)
  const inputClasses = cn(styles.input)

  return (
    <div className={containerClasses}>
      <label className={formStyles.inputLabel} htmlFor={actualId}>
        {children}
      </label>

      <span className={styles.wrapper}>
        <input
          className={inputClasses}
          readOnly={readOnly}
          type="range"
          id={actualId}
          {...SliderProps}
          ref={inputNode}
        />
      </span>
    </div>
  )
}
