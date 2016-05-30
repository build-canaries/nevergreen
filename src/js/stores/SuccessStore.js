import AppDispatcher from '../dispatcher/AppDispatcher'
import {EventEmitter} from 'events'
import {AppInit, RestoreConfiguration} from '../constants/NevergreenConstants'
import {MessageAdd, MessageRemove} from '../success/SuccessActions'
import _ from 'lodash'
import LocalRepository from '../storage/LocalRepository'

const eventEmitter = new EventEmitter()
const storageKey = 'success'
const CHANGE_EVENT = 'success-change'

let _storeState = null

function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

const dispatchToken = AppDispatcher.register((action) => {
  switch (action.type) {
    case AppInit:
    {
      _storeState = action.configuration[storageKey] || {
          messages: ['=(^.^)=']
        }
      break
    }
    case RestoreConfiguration:
    {
      _storeState = action.configuration[storageKey]
      break
    }
    case MessageAdd:
    {
      _storeState.messages = _storeState.messages.concat(action.message)
      break
    }
    case MessageRemove:
    {
      _.remove(_storeState.messages, (msg) => {
        return msg === action.message
      })
      break
    }
    default :
    {
      return true
    }
  }

  LocalRepository.setItem(storageKey, _.omit(_storeState, 'validation'))
  eventEmitter.emit(CHANGE_EVENT)
  return true
})

module.exports = {
  dispatchToken,

  getMessages() {
    return _storeState.messages.filter((message) => {
      return !this.isUrl(message)
    })
  },

  getImages() {
    return _storeState.messages.filter((message) => {
      return this.isUrl(message)
    })
  },

  getAll() {
    return _storeState.messages
  },

  randomMessage() {
    return randomFrom(_storeState.messages) || ''
  },

  getValidationObject() {
    return _storeState.validation
  },

  isUrl(value) {
    return _.startsWith(value, 'http')
  },

  addListener(callback) {
    eventEmitter.on(CHANGE_EVENT, callback)
  },

  removeListener(callback) {
    eventEmitter.removeListener(CHANGE_EVENT, callback)
  },

  validate(obj) {
    if (!_.has(obj, storageKey)) {
      return [`The top level key ${storageKey} is missing!`]
    }
    if (!_.has(obj, [storageKey, 'messages'])) {
      return [`The nested key ${storageKey}.messages is missing!`]
    }
    if (!_.isArray(obj[storageKey].messages)) {
      return [`The nested key ${storageKey}.messages must be an array!`]
    }
    return obj[storageKey].messages.reduce((errors, elem, index) => {
      if (!_.isString(elem)) {
        errors.push(`The nested key ${storageKey}.messages has an invalid element at index ${index}! It can only contain strings.`)
      }
      return errors
    }, [])
  }
}
