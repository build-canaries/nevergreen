import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import _ from 'lodash'
import styles from './input.scss'
import formStyles from './forms.scss'

PasswordVisibilityToggle.propTypes = {
  id: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
}

function PasswordVisibilityToggle({id, show, onClick}) {
  const label = show ? 'show password' : 'hide password'
  const className = show ? styles.showPassword : styles.hidePassword
  return (
    <button className={className}
            onClick={onClick}
            title={label}
            aria-label={label}
            aria-controls={id}/>
  )
}

export class Input extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isPassword: props.type === 'password',
      passwordHidden: props.type === 'password'
    }
    this.inputNode = React.createRef()
  }

  togglePasswordVisibility = () => {
    this.setState({passwordHidden: !this.state.passwordHidden})
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
    const {children, onEnter, className, readOnly, focus, type, ...inputProps} = this.props
    const {isPassword, passwordHidden} = this.state

    const id = _.uniqueId()
    const labelClasses = classNames(formStyles.inputContainer, className)
    const inputClasses = classNames(styles.input, {
      [styles.password]: isPassword
    })
    const actualType = isPassword && !passwordHidden ? 'text' : type

    return (
      <label className={labelClasses}>
        <div className={formStyles.inputLabel}>{children}</div>
        <div className={styles.wrapper}>
          <input className={inputClasses}
                 onKeyPress={(evt) => this.onKeyPress(evt, onEnter)}
                 spellCheck={false}
                 autoComplete='off'
                 type={actualType}
                 readOnly={readOnly}
                 {...inputProps}
                 id={id}
                 tabIndex={readOnly ? -1 : 0}
                 ref={this.inputNode}
                 onFocus={this.moveCaretToEnd}/>
          {
            readOnly && (
              <span className={styles.readOnly}
                    title='read only'
                    data-locator='read-only-icon'/>
            )
          }
          {
            !readOnly && isPassword && passwordHidden && (
              <PasswordVisibilityToggle id={id}
                                        show
                                        onClick={this.togglePasswordVisibility}
                                        data-locator='show-password'/>
            )
          }
          {
            !readOnly && isPassword && !passwordHidden && (
              <PasswordVisibilityToggle id={id}
                                        show={false}
                                        onClick={this.togglePasswordVisibility}
                                        data-locator='hide-password'/>
            )
          }
        </div>
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
  type: PropTypes.string
}
