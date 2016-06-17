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

export const MESSAGE_INVALID_INPUT = 'MESSAGE_INVALID_INPUT'
export function messageInvalid(validationMessages, message) {
  return {
    type: MESSAGE_INVALID_INPUT,
    errors: validationMessages,
    message
  }
}

export const MESSAGE_ADD = 'MESSAGE_ADD'
export function messageAdd(message) {
  return {
    type: MESSAGE_ADD,
    message: transformMessage(message)
  }
}

export const MESSAGE_REMOVE = 'MESSAGE_REMOVE'
export function removeMessage(message) {
  return function (AppDispatcher) {
    AppDispatcher.dispatch({
      type: MESSAGE_REMOVE,
      message: transformMessage(message)
    })
  }
}

export function addMessage(message) {
  return function (AppDispatcher) {
    const validationMessages = validateMessage(message)

    if (validationMessages) {
      AppDispatcher.dispatch(messageInvalid(validationMessages, message))
    } else {
      AppDispatcher.dispatch(messageAdd(message))
    }
  }
}
