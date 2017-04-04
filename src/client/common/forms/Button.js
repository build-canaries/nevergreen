import React, {Component, PropTypes} from 'react'
import classNames from 'classnames'
import _ from 'lodash'
import './button.scss'

class Button extends Component {

  render() {
    const buttonProps = _.omit(this.props, ['children', 'className', 'style'])
    const classes = classNames('button', this.props.className, this.props.style)

    return (
      <button className={classes} disabled={true} {...buttonProps}>
        {this.props.children}
      </button>
    )
  }
}

Button.defaultProps = {
  style: 'blue'
}

Button.propTypes = {
  style: PropTypes.oneOf(['white', 'blue']),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element
  ]).isRequired,
  className: PropTypes.string
}

export default Button
