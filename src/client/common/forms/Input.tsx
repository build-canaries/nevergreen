import type {
  DetailedHTMLProps,
  InputHTMLAttributes,
  ReactElement,
  ReactNode,
} from 'react'
import { useEffect, useRef } from 'react'
import cn from 'classnames'
import uniqueId from 'lodash/uniqueId'
import { InputButton } from './Button'
import { isNotBlank } from '../Utils'
import { VisuallyHidden } from '../VisuallyHidden'
import { Lock } from '../icons/Lock'
import formStyles from './forms.scss'
import styles from './input.scss'

export type InputProps = {
  readonly children: ReactNode
  readonly readOnly?: boolean
  readonly button?: ReactElement
  readonly error?: string
  readonly classNameContainer?: string
  readonly classNameLabel?: string
  readonly classNameInput?: string
} & Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'className'
>

export function Input({
  children,
  classNameContainer,
  classNameInput,
  readOnly,
  button,
  error = '',
  id,
  ...inputProps
}: InputProps): ReactElement {
  const inputNode = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const shouldFocus = isNotBlank(error)
    if (shouldFocus && inputNode.current) {
      inputNode.current.focus()
    }
  }, [error])

  const hasError = isNotBlank(error)

  const actualId = id ?? uniqueId('i')
  const errorId = hasError ? uniqueId('e') : undefined

  const containerClasses = cn(formStyles.inputContainer, classNameContainer, {
    [styles.containerError]: hasError,
  })
  const inputClasses = cn(styles.input, classNameInput, {
    [styles.hasButton]: button || readOnly,
    [styles.error]: hasError,
  })

  return (
    <div className={containerClasses}>
      <label className={formStyles.inputLabel} htmlFor={actualId}>
        {children}
      </label>
      {hasError && (
        <p id={errorId} className={styles.errorMessage}>
          <VisuallyHidden>Error: </VisuallyHidden>
          {error}
        </p>
      )}
      <span className={styles.wrapper}>
        <input
          className={inputClasses}
          spellCheck={false}
          autoComplete="off"
          readOnly={readOnly}
          type="text"
          id={actualId}
          {...inputProps}
          ref={inputNode}
          aria-describedby={errorId}
        />
        {readOnly && (
          <InputButton disabled icon={<Lock />} aria-hidden>
            read only
          </InputButton>
        )}
        {!readOnly && button}
      </span>
    </div>
  )
}
