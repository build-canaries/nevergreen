import React, {
  DetailedHTMLProps,
  FocusEvent,
  InputHTMLAttributes,
  KeyboardEvent,
  ReactElement,
  ReactNode,
  useLayoutEffect,
  useRef
} from 'react'
import classNames from 'classnames'
import _ from 'lodash'
import styles from './input.scss'
import formStyles from './forms.scss'
import {InputButton} from './Button'
import {iLock} from '../fonts/Icons'

export type InputProps = {
  children: ReactNode;
  id?: string;
  onEnter?: (evt: KeyboardEvent<HTMLInputElement>) => void;
  className?: string;
  readOnly?: boolean;
  focus?: boolean;
  button?: ReactElement;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export function Input({children, onEnter, className, readOnly, focus, button, id, ...inputProps}: InputProps) {
  const inputNode = useRef<HTMLInputElement>(null)

  useLayoutEffect(() => {
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

  const actualId = id ? id : _.uniqueId('i')

  return (
    <label className={labelClasses} htmlFor={actualId}>
      <span className={formStyles.inputLabel}>{children}</span>
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
                 onFocus={moveCaretToEnd}/>
        {
          readOnly && (
            <InputButton disabled
                         icon={iLock}
                         data-locator='read-only-icon'>
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
