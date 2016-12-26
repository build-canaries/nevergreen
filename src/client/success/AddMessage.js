import React, {Component, PropTypes} from 'react'
import Text from '../common/forms/Text'
import './add-message.scss'

class AddMessage extends Component {
  constructor(props) {
    super(props)
    this.state = {message: ''}
  }

  render() {
    const updateMessage = (evt) => this.setState({message: evt.target.value})
    const addMessage = () => {
      this.props.addMessage(this.state.message)
      this.setState({message: ''})
    }

    return (
      <div className='add-message'>
        <Text label='message' className='add-message-input' placeholder='text or a URL to an image' value={this.state.message}
              onChange={updateMessage} onEnter={addMessage} data-locator='message' isPrimary={true}/>
        <button className='add' onClick={addMessage} data-locator='add-message'>add</button>
      </div>
    )
  }
}

AddMessage.propTypes = {
  addMessage: PropTypes.func.isRequired
}

export default AddMessage
