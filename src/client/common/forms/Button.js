import React, {Component, PropTypes} from 'react'
import ShortcutContainer from '../shortcut/ShortcutContainer'
import _ from 'lodash'
import './button.scss'

class Button extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const buttonClass = this.props.isPrimary ? 'button-primary' : 'button'
    const buttonProps = _.omit(this.props, ['label', 'icon', 'hotkeys', 'isPrimary'])

    return (
      <button className={buttonClass} title={this.props.label} {...buttonProps}>
        <span className={`icon-${this.props.icon}`}/>
        <span className='text-with-icon'>{this.props.label}</span>
        {this.props.hotkeys ? <ShortcutContainer hotkeys={this.props.hotkeys}/> : null}
      </button>
    )
  }
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  hotkeys: PropTypes.arrayOf(PropTypes.string),
  isPrimary: PropTypes.bool
}

export default Button
