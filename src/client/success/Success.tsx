import React, {ReactElement} from 'react'
import {AddMessage} from './AddMessage'
import {Title} from '../common/Title'
import {Messages, MessagesType} from '../common/Messages'
import {isBlank, notEmpty} from '../common/Utils'
import {AddedMessages} from './AddedMessages'
import {useDispatch, useSelector} from 'react-redux'
import {getSuccessMessages} from './SuccessReducer'
import {addMessage, removeMessage} from './SuccessActionCreators'

export const NO_MESSAGES_WARNING = 'No success messages added, a blank screen will be shown on the monitor page when no projects are broken or building'

export function Success(): ReactElement {
  const dispatch = useDispatch()
  const messages = useSelector(getSuccessMessages)

  const noMessagesWarning = notEmpty(messages)
    ? []
    : [NO_MESSAGES_WARNING]

  const add = (message: string) => {
    if (!isBlank(message)) {
      dispatch(addMessage(message))
    }
  }

  return (
    <>
      <Title>Success</Title>
      <AddMessage addMessage={add}/>
      <AddedMessages messages={messages}
                     removeMessage={(message) => dispatch(removeMessage(message))}/>
      <Messages type={MessagesType.WARNING}
                messages={noMessagesWarning}/>
    </>
  )
}
