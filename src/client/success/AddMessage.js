import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Input from '../common/forms/Input'
import styles from './add-message.scss'

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
      <div className={styles.addMessage}>
        <Input className={styles.addMessageInput} placeholder='text or image URL' value={this.state.message} onChange={updateMessage}
               onEnter={addMessage} data-locator='message' autoFocus>
          <span>message</span>
        </Input>
        <button className={styles.add} onClick={addMessage} data-locator='add-message'>add</button>
      </div>
    )
  }
}

AddMessage.propTypes = {
  addMessage: PropTypes.func.isRequired
}

export default AddMessage
