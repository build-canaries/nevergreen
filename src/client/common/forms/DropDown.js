import React, {Component, PropTypes} from 'react'
import _ from 'lodash'
import classNames from 'classnames'
import './drop-down.scss'

class DropDown extends Component {
  render() {
    const inputProps = _.omit(this.props, ['children', 'title', 'className'])
    const labelClasses = classNames('drop-down', this.props.className)

    return (
      <label className={labelClasses}>
        <span>{this.props.title}</span>
        <select {...inputProps}>
          {this.props.children}
        </select>
      </label>
    )
  }
}

DropDown.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element
  ]).isRequired,
  title: PropTypes.string,
  className: PropTypes.string
}

export default DropDown
