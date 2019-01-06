import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {AddMessage} from './AddMessage'
import {Title} from '../common/Title'
import {Messages} from '../common/Messages'
import {notEmpty} from '../common/Utils'
import {AddedMessages} from './AddedMessages'

export function Success({messages, addMessage, removeMessage}) {
  const noMessagesWarning = notEmpty(messages)
    ? null
    : ['No success messages added, a blank screen will be shown on the monitor page when no projects are broken or building']

  return (
    <Fragment>
      <Title>Success</Title>
      <AddMessage addMessage={addMessage}/>
      <AddedMessages messages={messages} removeMessage={removeMessage}/>
      <Messages type='warning' messages={noMessagesWarning}/>
    </Fragment>
  )
}

Success.propTypes = {
  messages: PropTypes.array.isRequired,
  addMessage: PropTypes.func.isRequired,
  removeMessage: PropTypes.func.isRequired
}
