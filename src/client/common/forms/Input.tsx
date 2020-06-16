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

export type InputProps = {
  readonly children: ReactNode;
  readonly onEnter?: (evt: KeyboardEvent<HTMLInputElement>) => void;
  readonly className?: string;
  readonly readOnly?: boolean;
  readonly focus?: boolean;
  readonly button?: ReactElement;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export function Input({children, onEnter, className, readOnly, focus, button, ...inputProps}: InputProps): ReactElement {
  const inputNode = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (focus && inputNode.current) {
      inputNode.current.focus()
    }
  }, [focus])

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

  const labelClasses = classNames(formStyles.inputContainer, className)
  const inputClasses = classNames(styles.input, {
    [styles.hasButton]: button
  })

  const id = uniqueId('i')

  return (
    <label className={labelClasses} htmlFor={id}>
      <span className={formStyles.inputLabel}>{children}</span>
      <span className={styles.wrapper}>
          <input className={inputClasses}
                 onKeyPress={(evt) => onKeyPress(evt)}
                 spellCheck={false}
                 autoComplete='off'
                 readOnly={readOnly}
                 type='text'
                 id={id}
                 {...inputProps}
                 ref={inputNode}
                 onFocus={moveCaretToEnd}/>
        {
          readOnly && (
            <InputButton disabled
                         icon={iLock}>
              read only
            </InputButton>
          )
        }
        {
          !readOnly && button
        }
        </span>
    </label>
  )
}
