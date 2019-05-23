import {Actions} from './Actions'
import {isBlank} from '../common/Utils'
import {Action} from 'redux'

export interface ActionNoop extends Action<Actions.NOOP> {
}

export interface ActionMessageAdded extends Action<Actions.MESSAGE_ADDED> {
  readonly message: string;
}

export interface ActionMessageRemoved extends Action<Actions.MESSAGE_REMOVED> {
  readonly message: string;
}

const SPACES = / /g
const NON_BREAKING_SPACE = String.fromCharCode(160)

function isSentenceLike(message: string) {
  const numberOfLetters = (message.match(/[A-Za-z]/g) || []).length
  return (numberOfLetters / message.length) > 0.3
}

function transformMessage(message: string) {
  return isSentenceLike(message) ? message : message.replace(SPACES, NON_BREAKING_SPACE)
}

export function addMessage(message: string): ActionMessageAdded | ActionNoop {
  if (isBlank(message)) {
    return {type: Actions.NOOP}
  } else {
    return {type: Actions.MESSAGE_ADDED, message: transformMessage(message)}
  }
}

export function removeMessage(message: string): ActionMessageRemoved {
  return {type: Actions.MESSAGE_REMOVED, message: transformMessage(message)}
}
