import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import _ from 'lodash'
import styles from './input.scss'
import formStyles from './forms.scss'
import {InputButton} from './Button'
import {iLock} from '../fonts/Icons'

export class Input extends Component {

  constructor(props) {
    super(props)
    this.inputNode = React.createRef()
  }

  maybeFocus = () => {
    if (this.props.focus && this.inputNode.current) {
      this.inputNode.current.focus()
    }
  }

  moveCaretToEnd = (evt) => {
    const val = evt.target.value
    evt.target.value = ''
    evt.target.value = val
  }

  onKeyPress = (evt, onEnter) => {
    if (evt.key === 'Enter' && onEnter) {
      onEnter(evt)
    }
  }

  componentDidMount() {
    this.maybeFocus()
  }

  componentDidUpdate() {
    this.maybeFocus()
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    const {children, onEnter, className, readOnly, focus, button, id, ...inputProps} = this.props

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
                 onKeyPress={(evt) => this.onKeyPress(evt, onEnter)}
                 spellCheck={false}
                 autoComplete='off'
                 readOnly={readOnly}
                 type='text'
                 id={actualId}
                 {...inputProps}
                 ref={this.inputNode}
                 onFocus={this.moveCaretToEnd}/>
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
}

Input.propTypes = {
  children: PropTypes.node.isRequired,
  onEnter: PropTypes.func,
  className: PropTypes.string,
  readOnly: PropTypes.bool,
  focus: PropTypes.bool,
  button: PropTypes.element
}
