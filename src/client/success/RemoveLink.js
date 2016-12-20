import React, {Component, PropTypes} from 'react'
import Button from '../common/forms/Button'
import './remove-link.scss'

class RemoveLink extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <span className='remove-link'>
        <Button label='remove' icon='cross' onClick={this.props.removeMessage} hotkeys={this.props.hotkeys}/>
      </span>
    )
  }
}

RemoveLink.propTypes = {
  hotkeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  removeMessage: PropTypes.func.isRequired
}

export default RemoveLink
