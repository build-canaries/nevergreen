import _ from 'lodash'

const SPACES = / /g
const NON_BREAKING_SPACE = String.fromCharCode(160)

function isASentence(message) {
  const numberOfLetters = (message.match(/[A-Za-z]/g) || []).length
  return (numberOfLetters / message.length) > 0.3
}

function isUrl(value) {
  return _.startsWith(value, 'http')
}

function transformMessage(message) {
  return isASentence(message) ? message : message.replace(SPACES, NON_BREAKING_SPACE)
}

export const IMAGE_ADDED = 'IMAGE_ADDED'
export function imageAdded(url) {
  return {
    type: IMAGE_ADDED,
    url
  }
}

export const IMAGE_REMOVED = 'IMAGE_REMOVED'
export function removeImage(url) {
  return {
    type: IMAGE_REMOVED,
    url
  }
}

export const TEXT_ADDED = 'TEXT_ADDED'
export function textAdded(message) {
  return {
    type: TEXT_ADDED,
    message: transformMessage(message)
  }
}

export const TEXT_REMOVED = 'TEXT_REMOVED'
export function removeText(message) {
  return {
    type: TEXT_REMOVED,
    message: transformMessage(message)
  }
}

export function removeMessage(message) {
  return isUrl(message) ? removeImage(message) : removeText(message)
}

export function addMessage(message) {
  return isUrl(message) ? imageAdded(message) : textAdded(message)
}
