import React, {Component, PropTypes} from 'react'
import ValidationMessages from '../common/ValidationMessages'
import PrimaryInput from '../common/PrimaryInput'
import _ from 'lodash'

class AddMessage extends Component {
  constructor(props) {
    super(props)
    this.state = {message: ''}
  }

  componentWillReceiveProps(nextProps) {
    if (_.size(nextProps.errors) === 0) {
      this.setState({message: ''})
    }
  }

  render() {
    const addMessage = () => this.props.addMessage(this.state.message)
    const updateMessage = (evt) => this.setState({message: evt.target.value})
    const addOnEnter = (evt) => {
      if (evt.key === 'Enter') {
        this.props.addMessage(this.state.message)
      }
    }

    return (
      <div className='tracking-cctray-group-cctray-form'>
        <span className='text-input'>
          <label htmlFor='message-input'>message</label>
          <PrimaryInput>
            <input id="message-input"
                   className='tracking-cctray-group-cctray-form-input success-message-input'
                   type='text'
                   placeholder='text or image url'
                   value={this.state.message}
                   onChange={updateMessage}
                   onKeyPress={addOnEnter}/>
          </PrimaryInput>
        </span>
        <button className='button-primary' onClick={addMessage}>add</button>
        <ValidationMessages messages={this.props.errors}/>
      </div>
    )
  }
}

AddMessage.propTypes = {
  addMessage: PropTypes.func.isRequired,
  errors: PropTypes.arrayOf(PropTypes.string)
}

export default AddMessage
