import React, {Component, PropTypes} from 'react'
import ValidationMessages from '../general/validationMessages'
import PrimaryInput from '../general/PrimaryInput'
import _ from 'lodash'

class AddMessage extends Component {
  constructor(props) {
    super(props)
    this.state = {message: ''}
  }

  render() {
    const addMessage = () => this.props.addMessage(this.state.message)
    const updateMessage = (evt) => this.setState({message: evt.target.value})

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
                   onKeyPress={this._onKeyPress.bind(this)}/>
          </PrimaryInput>
        </span>
        <button className='button-primary' onClick={addMessage}>add</button>
        <ValidationMessages messages={this.props.errors}/>
      </div>
    )
  }

  componentWillReceiveProps(nextProps) {
    if (_.size(nextProps.errors) === 0) {
      this.setState({message: ''})
    }
  }

  _onKeyPress(evt) {
    if (evt.key === 'Enter') {
      this.props.addMessage(this.state.message)
    }
  }
}

AddMessage.propTypes = {
  addMessage: PropTypes.func.isRequired,
  errors: PropTypes.arrayOf(PropTypes.string)
}

export default AddMessage
