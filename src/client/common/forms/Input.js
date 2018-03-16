import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import _ from 'lodash'
import styles from './input.scss'

class Input extends Component {

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
    const inputProps = _.omit(this.props, ['children', 'onEnter', 'className', 'focus'])
    const labelClasses = classNames(styles.label, this.props.className)

    return (
      <label className={labelClasses}>
        <div className={styles.description}>{this.props.children}</div>
        <input className={styles.input}
               onKeyPress={this.onEnter}
               spellCheck={false}
               autoComplete='off'
               {...inputProps}
               tabIndex={this.props.readOnly ? -1 : 0}
               aria-disabled={this.props.disabled}
               ref={(node) => this.inputNode = node}
               onFocus={this.moveCaretToEnd}/>
        {this.props.readOnly && <i className={styles.readOnly} title='read only'/>}
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
  disabled: PropTypes.bool
}

export default Input
