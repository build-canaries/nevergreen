import React, {Component, PropTypes} from 'react'
import ShortcutContainer from '../common/shortcut/ShortcutContainer'
import './remove-link.scss'

class RemoveLink extends Component {
  render() {
    return (
      <button className='remove-link' onClick={this.props.removeMessage} title={`remove ${this.props.message}`}>
        <span className='label'>remove {this.props.message}</span>
        <ShortcutContainer hotkeys={this.props.hotkeys}/>
      </button>
    )
  }
}

RemoveLink.propTypes = {
  hotkeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  removeMessage: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired
}

export default RemoveLink
