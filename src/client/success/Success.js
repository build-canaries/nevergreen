import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {AddedMessages} from './AddedMessages'
import {AddedImages} from './AddedImages'
import {AddMessage} from './AddMessage'
import {Title} from '../common/Title'

export function Success({messages, addMessage, removeMessage}) {
  const textMessages = messages.filter((m) => !m.startsWith('http'))
  const images = messages.filter((m) => m.startsWith('http'))

  return (
    <Fragment>
      <Title>Success</Title>
      <AddMessage addMessage={addMessage}/>
      <AddedMessages messages={textMessages} removeMessage={removeMessage}/>
      <AddedImages urls={images} removeMessage={removeMessage}/>
    </Fragment>
  )
}

Success.propTypes = {
  messages: PropTypes.array.isRequired,
  addMessage: PropTypes.func.isRequired,
  removeMessage: PropTypes.func.isRequired
}
