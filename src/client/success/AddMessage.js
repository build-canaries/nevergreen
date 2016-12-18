import React, {Component, PropTypes} from 'react'
import PrimaryInput from '../common/PrimaryInput'
import './add-message.scss'

class AddMessage extends Component {
  constructor(props) {
    super(props)
    this.state = {message: ''}
  }

  render() {
    const updateMessage = (evt) => this.setState({message: evt.target.value})
    const addOnEnter = (evt) => {
      if (evt.key === 'Enter') {
        addMessage()
      }
    }
    const addMessage = () => {
      this.props.addMessage(this.state.message)
      this.setState({message: ''})
    }

    return (
      <div className='add-message'>
        <span className='add'>
          <label htmlFor='message-input'>message</label>
          <PrimaryInput>
            <input id='message-input' className='add-message-input' type='text' placeholder='text or image url'
                   value={this.state.message} onChange={updateMessage} onKeyPress={addOnEnter}
                   data-locator='message'/>
          </PrimaryInput>
        </span>
        <button className='add-action' onClick={addMessage} data-locator='add-message'>add</button>
      </div>
    )
  }
}

AddMessage.propTypes = {
  addMessage: PropTypes.func.isRequired
}

export default AddMessage
