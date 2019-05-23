import React, {Fragment} from 'react'
import {AddMessage} from './AddMessage'
import {Title} from '../common/Title'
import {Messages} from '../common/Messages'
import {notEmpty} from '../common/Utils'
import {AddedMessages} from './AddedMessages'

interface SuccessProps {
  messages: string[];
  addMessage: (message: string) => void;
  removeMessage: (message: string) => void;
}

export function Success({messages, addMessage, removeMessage}: SuccessProps) {
  const noMessagesWarning = notEmpty(messages)
    ? []
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
