import React, {Component, PropTypes} from 'react'
import Messages from '../messages/Messages'
import classNames from 'classnames'
import _ from 'lodash'
import './input.scss'

class Input extends Component {
  constructor(props) {
    super(props)
    this.state = {errors: []}
  }

  componentDidUpdate(prevProps) {
    const omitFunctions = (objValue, othValue) => {
      if (_.isFunction(objValue) && _.isFunction(othValue)) {
        return true
      }
    }
    if (!_.isEqualWith(this.props, prevProps, omitFunctions)) {
      this.validate()
    }
  }

  validate(onSuccess) {
    const isValid = this.node.validity.valid
    const errors = isValid ? [] : [this.node.validationMessage]
    this.setState({errors})
    if (isValid) {
      this.props.onValidation(true)
      onSuccess ? onSuccess() : null
    } else {
      this.props.onValidation(false, errors)
    }
  }

  render() {
    const inputProps = _.omit(this.props, ['children', 'onEnter', 'onBlur', 'onValidation', 'className'])
    const onBlur = (evt) => this.validate(() => this.props.onBlur(evt))
    const onEnter = (evt) => {
      if (evt.key === 'Enter' && this.props.onEnter) {
        this.validate(this.props.onEnter)
      }
    }
    const labelClasses = classNames('input', this.props.type, this.props.className)
    const invalid = !_.isEmpty(this.state.errors)

    return (
      <label className={labelClasses}>
        {this.props.children}
        <input onKeyPress={onEnter} onBlur={onBlur} spellCheck={false} autoComplete='off' autoFocus={invalid} {...inputProps}
               ref={(node) => this.node = node}/>
        {this.props.readOnly ? <i className='locked' title='read only'/> : null}
        <Messages className='input-validation-errors' type='error' messages={this.state.errors}/>
      </label>
    )
  }
}

Input.defaultProps = {
  type: 'text',
  onValidation: _.noop,
  onBlur: _.noop
}

Input.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element
  ]).isRequired,
  type: PropTypes.string,
  onEnter: PropTypes.func,
  onValidation: PropTypes.func,
  onBlur: PropTypes.func,
  className: PropTypes.string,
  readOnly: PropTypes.bool
}

export default Input
