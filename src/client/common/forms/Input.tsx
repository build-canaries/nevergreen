import type {
  DetailedHTMLProps,
  InputHTMLAttributes,
  ReactElement,
  ReactNode,
} from 'react'
import { useEffect, useId, useRef } from 'react'
import cn from 'classnames'
import { InputButton } from './Button'
import { isNotBlank } from '../Utils'
import { VisuallyHidden } from '../VisuallyHidden'
import { Lock } from '../icons/Lock'
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
  classNameLabel,
  readOnly,
  button,
  error = '',
  id,
  ...inputProps
}: InputProps): ReactElement {
  const inputNode = useRef<HTMLInputElement>(null)
  const idIfNotProvided = useId()
  const errorId = useId()

  useEffect(() => {
    const shouldFocus = isNotBlank(error)
    if (shouldFocus && inputNode.current) {
      inputNode.current.focus()
    }
  }, [error])

  const hasError = isNotBlank(error)

  const actualId = id ?? idIfNotProvided

  const containerClasses = cn(styles.inputContainer, classNameContainer, {
    [styles.containerError]: hasError,
  })
  const inputClasses = cn(styles.input, classNameInput, {
    [styles.hasButton]: button || readOnly,
    [styles.error]: hasError,
  })

  return (
    <div className={containerClasses}>
      <label
        className={cn(styles.inputLabel, classNameLabel)}
        htmlFor={actualId}
      >
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
          aria-describedby={hasError ? errorId : undefined}
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
