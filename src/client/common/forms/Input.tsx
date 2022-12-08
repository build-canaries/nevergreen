import React, {
  DetailedHTMLProps,
  FocusEvent,
  InputHTMLAttributes,
  ReactElement,
  ReactNode,
  useEffect,
  useRef,
} from 'react'
import cn from 'classnames'
import uniqueId from 'lodash/uniqueId'
import styles from './input.scss'
import formStyles from './forms.scss'
import { InputButton } from './Button'
import { isNotBlank } from '../Utils'
import { VisuallyHidden } from '../VisuallyHidden'
import { Lock } from '../icons/Lock'

export type InputProps = {
  readonly children: ReactNode
  readonly readOnly?: boolean
  readonly button?: ReactElement
  readonly error?: string
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export function Input({
  children,
  className,
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

  const moveCaretToEnd = (evt: FocusEvent<HTMLInputElement>) => {
    const val = evt.target.value
    evt.target.value = ''
    evt.target.value = val
  }

  const hasError = isNotBlank(error)

  const actualId = id ?? uniqueId('i')
  const errorId = hasError ? uniqueId('e') : undefined

  const containerClasses = cn(formStyles.inputContainer, className, {
    [styles.containerError]: hasError,
  })
  const inputClasses = cn(styles.input, {
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
          onFocus={moveCaretToEnd}
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
