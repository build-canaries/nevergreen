import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Input} from '../common/forms/Input'
import styles from './add-message.scss'

export class AddMessage extends Component {

  constructor(props) {
    super(props)
    this.state = {message: ''}
  }

  updateMessage = (evt) => {
    this.setState({message: evt.target.value})
  }

  addMessage = () => {
    this.props.addMessage(this.state.message)
    this.setState({message: ''})
  }

  render() {
    const {message} = this.state

    return (
      <div className={styles.addMessage}>
        <Input className={styles.addMessageInput}
               placeholder='text or image URL'
               value={message}
               onChange={this.updateMessage}
               onEnter={this.addMessage}
               data-locator='message'>
          message
        </Input>
        <button className={styles.add} onClick={this.addMessage} data-locator='add-message'>
          <span aria-label='add success message'>add</span>
        </button>
      </div>
    )
  }
}

AddMessage.propTypes = {
  addMessage: PropTypes.func.isRequired
}
