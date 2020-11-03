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
import classNames from 'classnames'
import {uniqueId} from 'lodash'
import styles from './input.scss'
import formStyles from './forms.scss'
import {InputButton} from './Button'
import {iLock} from '../fonts/Icons'
import {ErrorMessages} from '../Messages'
import {isBlank, isNotBlank} from '../Utils'

export type InputProps = {
  readonly children: ReactNode;
  readonly onEnter?: (evt: KeyboardEvent<HTMLInputElement>) => void;
  readonly className?: string;
  readonly readOnly?: boolean;
  readonly focus?: boolean;
  readonly button?: ReactElement;
  readonly error?: string;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export function Input({children, onEnter, className, readOnly, focus, button, error = '', id, ...inputProps}: InputProps): ReactElement {
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

  const actualId = id ?? uniqueId('i')
  const errorId = uniqueId('e')

  const labelClasses = classNames(formStyles.inputContainer, className)
  const wrapperClasses = classNames(styles.wrapper, {
    [styles.error]: !isBlank(error)
  })
  const inputClasses = classNames(styles.input, {
    [styles.hasButton]: button || readOnly,
    [styles.hasError]: !isBlank(error)
  })

  return (
    <div className={labelClasses}>
      <label className={formStyles.inputLabel}
             htmlFor={actualId}>
        {children}
      </label>
      <span className={wrapperClasses}>
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
        <ErrorMessages id={errorId}
                       className={styles.errorMessage}
                       messages={error}/>
      </span>
    </div>
  )
}
