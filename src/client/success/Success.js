import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {AddedMessages} from './AddedMessages'
import {AddedImages} from './AddedImages'
import {AddMessage} from './AddMessage'
import {Title} from '../common/Title'
import {Messages} from '../common/messages/Messages'
import {notEmpty} from '../common/Utils'
import {hasScheme} from '../domain/Url'

export function Success({messages, addMessage, removeMessage}) {
  const textMessages = messages.filter((m) => !hasScheme(m))
  const images = messages.filter(hasScheme)
  const noMessagesWarning = notEmpty(messages)
    ? null
    : ['No success messages added, a blank screen will be shown on the monitor page when no projects are broken or building']

  return (
    <Fragment>
      <Title>Success</Title>
      <AddMessage addMessage={addMessage}/>
      <AddedMessages messages={textMessages} removeMessage={removeMessage}/>
      <AddedImages urls={images} removeMessage={removeMessage}/>
      <Messages type='warning' messages={noMessagesWarning}/>
    </Fragment>
  )
}

Success.propTypes = {
  messages: PropTypes.array.isRequired,
  addMessage: PropTypes.func.isRequired,
  removeMessage: PropTypes.func.isRequired
}
