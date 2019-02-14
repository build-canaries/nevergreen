import React, {useLayoutEffect, useRef} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import _ from 'lodash'
import styles from './input.scss'
import formStyles from './forms.scss'
import {InputButton} from './Button'
import {iLock} from '../fonts/Icons'

export function Input({children, onEnter, className, readOnly, focus, button, id, ...inputProps}) {
  const inputNode = useRef()

  useLayoutEffect(() => {
    if (focus && inputNode.current) {
      inputNode.current.focus()
    }
  }, [focus])

  const moveCaretToEnd = (evt) => {
    const val = evt.target.value
    evt.target.value = ''
    evt.target.value = val
  }

  const onKeyPress = (evt) => {
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

Input.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string,
  onEnter: PropTypes.func,
  className: PropTypes.string,
  readOnly: PropTypes.bool,
  focus: PropTypes.bool,
  button: PropTypes.element
}
