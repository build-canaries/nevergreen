import React, {Component, PropTypes} from 'react'
import Shortcut from '../general/Shortcut'

class RemoveLink extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <button className='success-remove button' onClick={this.props.removeMessage} title='remove'>
        <span className='icon-cross'/>
        <span className='visually-hidden'>remove</span>
        <Shortcut hotkeys={this.props.hotkeys}/>
      </button>
    )
  }
}

RemoveLink.propTypes = {
  hotkeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  removeMessage: PropTypes.func.isRequired
}

export default RemoveLink
