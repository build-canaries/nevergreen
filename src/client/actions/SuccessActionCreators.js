import {MESSAGE_ADDED, MESSAGE_REMOVED, NOOP} from './Actions'
import {isBlank} from '../common/Utils'

const SPACES = / /g
const NON_BREAKING_SPACE = String.fromCharCode(160)

function isSentenceLike(message) {
  const numberOfLetters = (message.match(/[A-Za-z]/g) || []).length
  return (numberOfLetters / message.length) > 0.3
}

function transformMessage(message) {
  return isSentenceLike(message) ? message : message.replace(SPACES, NON_BREAKING_SPACE)
}

export function addMessage(message) {
  if (isBlank(message)) {
    return {type: NOOP}
  } else {
    return {type: MESSAGE_ADDED, message: transformMessage(message)}
  }
}

export function removeMessage(message) {
  return {type: MESSAGE_REMOVED, message: transformMessage(message)}
}
