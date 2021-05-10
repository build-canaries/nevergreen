import React, {
  DetailedHTMLProps,
  FocusEvent,
  InputHTMLAttributes,
  KeyboardEvent,
  ReactElement,
  ReactNode,
  useEffect,
  useRef
} from 'react'
import cn from 'classnames'
import uniqueId from 'lodash/uniqueId'
import styles from './input.scss'
import formStyles from './forms.scss'
import {InputButton} from './Button'
import {iLock} from '../fonts/Icons'
import {isBlank, isNotBlank} from '../Utils'
import {VisuallyHidden} from '../VisuallyHidden'

export type InputProps = {
  readonly children: ReactNode;
  readonly onEnter?: (evt: KeyboardEvent<HTMLInputElement>) => void;
  readonly className?: string;
  readonly readOnly?: boolean;
  readonly focus?: boolean;
  readonly button?: ReactElement;
  readonly error?: string;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export function Input({
                        children,
                        onEnter,
                        className,
                        readOnly,
                        focus,
                        button,
                        error = '',
                        id,
                        ...inputProps
                      }: InputProps): ReactElement {
  const inputNode = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const shouldFocus = isNotBlank(error) || focus
    if (shouldFocus && inputNode.current) {
      inputNode.current.focus()
    }
  }, [focus, error])

  const moveCaretToEnd = (evt: FocusEvent<HTMLInputElement>) => {
    const val = evt.target.value
    evt.target.value = ''
    evt.target.value = val
  }

  const onKeyPress = (evt: KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === 'Enter' && onEnter) {
      onEnter(evt)
    }
  }

  const hasError = !isBlank(error)

  const actualId = id ?? uniqueId('i')
  const errorId = hasError ? uniqueId('e') : undefined

  const containerClasses = cn(formStyles.inputContainer, className, {
    [styles.containerError]: hasError
  })
  const inputClasses = cn(styles.input, {
    [styles.hasButton]: button || readOnly,
    [styles.error]: hasError
  })

  return (
    <div className={containerClasses}>
      <label className={formStyles.inputLabel}
             htmlFor={actualId}>
        {children}
      </label>
      {hasError && (
        <p id={errorId}
           className={styles.errorMessage}>
          <VisuallyHidden>Error: </VisuallyHidden>
          {error}
        </p>
      )}
      <span className={styles.wrapper}>
          <input className={inputClasses}
                 onKeyPress={(evt) => onKeyPress(evt)}
                 spellCheck={false}
                 autoComplete='off'
                 readOnly={readOnly}
                 type='text'
                 id={actualId}
                 {...inputProps}
                 ref={inputNode}
                 onFocus={moveCaretToEnd}
                 aria-describedby={errorId}/>
        {
          readOnly && (
            <InputButton disabled
                         icon={iLock}
                         aria-hidden>
              read only
            </InputButton>
          )
        }
        {
          !readOnly && button
        }
      </span>
    </div>
  )
}
