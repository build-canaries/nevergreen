import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Shortcut from '../common/Shortcut'
import './remove-link.scss'

class RemoveLink extends Component {
  render() {
    return (
      <button className='remove-link' onClick={this.props.removeMessage} title={`remove ${this.props.message}`}>
        <span className='label'>remove {this.props.message}</span>
        <Shortcut hotkeys={this.props.hotkeys}/>
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
