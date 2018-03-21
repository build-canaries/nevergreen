import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import _ from 'lodash'
import styles from './input.scss'

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

class Input extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isPassword: props.type === 'password',
      passwordHidden: props.type === 'password'
    }
  }

  togglePasswordVisibility = () => {
    this.setState({passwordHidden: !this.state.passwordHidden})
  }

  maybeFocus = () => {
    if (this.props.focus && this.inputNode) {
      this.inputNode.focus()
    }
  }

  moveCaretToEnd = (evt) => {
    const val = evt.target.value
    evt.target.value = ''
    evt.target.value = val
  }

  onEnter = (evt) => {
    if (evt.key === 'Enter' && this.props.onEnter) {
      this.props.onEnter(evt)
    }
  }

  componentDidMount() {
    this.maybeFocus()
  }

  componentDidUpdate() {
    this.maybeFocus()
  }

  render() {
    const id = _.uniqueId()
    const inputProps = _.omit(this.props, ['children', 'onEnter', 'className', 'focus', 'type'])
    const labelClasses = classNames(styles.label, this.props.className)
    const inputClasses = classNames(styles.input, {
      [styles.password]: this.state.isPassword
    })
    const type = this.state.isPassword && !this.state.passwordHidden ? 'text' : this.props.type

    return (
      <label className={labelClasses}>
        <div className={styles.description}>{this.props.children}</div>
        <div className={styles.wrapper}>
          <input className={inputClasses}
                 onKeyPress={this.onEnter}
                 spellCheck={false}
                 autoComplete='off'
                 type={type}
                 {...inputProps}
                 id={id}
                 tabIndex={this.props.readOnly ? -1 : 0}
                 aria-disabled={this.props.disabled}
                 ref={(node) => this.inputNode = node}
                 onFocus={this.moveCaretToEnd}/>
          {this.props.readOnly && <span className={styles.readOnly} title='read only'/>}
          {
            !this.props.readOnly && this.state.isPassword && this.state.passwordHidden && (
              <PasswordVisibilityToggle id={id}
                                        show
                                        onClick={this.togglePasswordVisibility}/>
            )
          }
          {
            !this.props.readOnly && this.state.isPassword && !this.state.passwordHidden && (
              <PasswordVisibilityToggle id={id}
                                        show={false}
                                        onClick={this.togglePasswordVisibility}/>
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
  disabled: PropTypes.bool,
  type: PropTypes.string
}

export default Input
