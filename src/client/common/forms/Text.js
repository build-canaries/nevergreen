import React, {Component, PropTypes} from 'react'
import classNames from 'classnames'
import _ from 'lodash'
import './text.scss'

class Text extends Component {
  componentDidMount() {
    if (this.props.isPrimary) {
      this.primaryInput.focus()
    }
  }

  render() {
    const inputProps = _.omit(this.props, ['label', 'onEnter', 'isPrimary', 'className'])
    const onEnter = (evt) => {
      if (evt.key === 'Enter' && this.props.onEnter) {
        this.props.onEnter()
      }
    }
    const labelClasses = classNames('text-input', this.props.className)

    return (
      <label className={labelClasses}>
        <span>{this.props.label}</span>
        <input type='text' onKeyPress={onEnter} ref={(node) => this.primaryInput = node} spellCheck={false} {...inputProps}/>
      </label>
    )
  }
}

Text.propTypes = {
  label: PropTypes.string.isRequired,
  onEnter: PropTypes.func,
  isPrimary: PropTypes.bool,
  className: PropTypes.string
}

export default Text
