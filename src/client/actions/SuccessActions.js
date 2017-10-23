import {isBlank} from '../common/Utils'
import {MESSAGE_ADDED, MESSAGE_INVALID, MESSAGE_REMOVED} from './Actions'

const SPACES = / /g
const NON_BREAKING_SPACE = String.fromCharCode(160)

function isASentence(message) {
  const numberOfLetters = (message.match(/[A-Za-z]/g) || []).length
  return (numberOfLetters / message.length) > 0.3
}

function transformMessage(message) {
  return isASentence(message) ? message : message.replace(SPACES, NON_BREAKING_SPACE)
}

export function messageAdded(message) {
  return {
    type: MESSAGE_ADDED,
    message: transformMessage(message)
  }
}

export function removeMessage(message) {
  return {
    type: MESSAGE_REMOVED,
    message: transformMessage(message)
  }
}

export function messageInvalid(message, errors) {
  return {
    type: MESSAGE_INVALID,
    message,
    errors
  }
}

export function addMessage(message) {
  if (isBlank(message)) {
    return messageInvalid(message, ['message can not be blank'])
  }
  return messageAdded(message)
}
