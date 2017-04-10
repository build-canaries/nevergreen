import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Container from '../common/container/Container'
import RemoveLink from './RemoveLink'
import './added-messages.scss'
import _ from 'lodash'

class AddedMessages extends Component {
  render() {
    if (_.isEmpty(this.props.messages)) {
      return null
    }

    return (
      <Container title='messages' className='added-messages'>
        <ol className='success-text-list'>
          {
            this.props.messages.map((message, index) => {
              const remove = () => this.props.removeMessage(message)

              return (
                <li key={`m${index}`} className='success-item'>
                  <RemoveLink hotkeys={[`y m ${index}`]} removeMessage={remove} message={message}/>
                  <span className='message' data-locator='success-message'>{message}</span>
                </li>
              )
            })
          }
        </ol>
      </Container>
    )
  }
}

AddedMessages.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.string).isRequired,
  removeMessage: PropTypes.func.isRequired
}

export default AddedMessages
