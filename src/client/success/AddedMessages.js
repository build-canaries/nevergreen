import React, {Component, PropTypes} from 'react'
import Container from '../common/container/Container'
import RemoveLink from './RemoveLink'
import './added-messages.scss'
import _ from 'lodash'

class AddedMessages extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    if (_.isEmpty(this.props.messages)) {
      return null
    }

    return (
      <Container title='messages' className='added-messages'>
        <ul className='success-text-list'>
          {
            this.props.messages.map((message, index) => {
              const remove = () => this.props.removeMessage(message)

              return (
                <li key={`m${index}`} className='success-item'>
                  <span className='message' data-locator='success-message'>{message}</span>
                  <RemoveLink hotkeys={[`y m ${index}`]} removeMessage={remove}/>
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
