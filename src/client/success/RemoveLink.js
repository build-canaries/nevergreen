import React, {Component, PropTypes} from 'react'
import ShortcutContainer from '../common/shortcut/ShortcutContainer'
import './remove-link.scss'

class RemoveLink extends Component {
  render() {
    return (
      <span className='remove-link'>
        <button className='remove' onClick={this.props.removeMessage}>
          <span>remove</span>
          <ShortcutContainer hotkeys={this.props.hotkeys}/>
        </button>
      </span>
    )
  }
}

RemoveLink.propTypes = {
  hotkeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  removeMessage: PropTypes.func.isRequired
}

export default RemoveLink
