import React, {Component, PropTypes} from 'react'
import Container from '../common/Container'
import RemoveLink from './RemoveLink'

class AddedMessages extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Container title='Messages'>
        <ul className='success-list success-text-list'>
          {
            this.props.messages.map((message, index) => {
              return (
                <li key={`m${index}`} className='success-item'>
                  <span className='success-message'>{message}</span>
                  <RemoveLink hotkeys={[`y m ${index}`]} removeMessage={this.props.removeMessage.bind(null, message)}/>
                </li>
              )
            })
          }
        </ul>
      </Container>
    )
  }
}

AddedMessages.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.string).isRequired,
  removeMessage: PropTypes.func.isRequired
}

export default AddedMessages
