import {Actions} from '../../Actions'
import {Action} from 'redux'

export interface ActionMessageAdded extends Action<Actions.MESSAGE_ADDED> {
  readonly message: string;
}

export interface ActionMessageRemoved extends Action<Actions.MESSAGE_REMOVED> {
  readonly message: string;
}

const SPACES = / /g
const NON_BREAKING_SPACE = String.fromCharCode(160)

function isSentenceLike(message: string): boolean {
  const numberOfLetters = (message.match(/[A-Za-z]/g) || []).length
  return (numberOfLetters / message.length) > 0.3
}

function transformMessage(message: string): string {
  return isSentenceLike(message) ? message : message.replace(SPACES, NON_BREAKING_SPACE)
}

export function addMessage(message: string): ActionMessageAdded {
  return {type: Actions.MESSAGE_ADDED, message: transformMessage(message)}
}

export function removeMessage(message: string): ActionMessageRemoved {
  return {type: Actions.MESSAGE_REMOVED, message: transformMessage(message)}
}
