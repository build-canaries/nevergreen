import AppDispatcher from '../dispatcher/AppDispatcher'
import {MessageInvalidInput, MessageAdd, MessageRemove} from '../constants/NevergreenConstants'
import _ from 'lodash'

function isASentence(message) {
  const numberOfLetters = (message.match(/[A-Za-z]/g) || []).length
  return (numberOfLetters / message.length) > 0.3
}

function transformMessage(message) {
  if (isASentence(message)) {
    return message
  }

  return message.replace(/ /g, String.fromCharCode(160))
}

function validateMessage(message) {
  if (_.isEmpty(_.trim(message))) {
    return ['message can not be blank!']
  }
}

module.exports = {
  addMessage(message) {
    const validationMessages = validateMessage(message)

    if (validationMessages) {
      AppDispatcher.dispatch({
        type: MessageInvalidInput,
        errors: validationMessages,
        message
      })
    } else {
      AppDispatcher.dispatch({
        type: MessageAdd,
        message: transformMessage(message)
      })
    }
  },

  removeMessage(message) {
    AppDispatcher.dispatch({
      type: MessageRemove,
      message: transformMessage(message)
    })
  }

}
