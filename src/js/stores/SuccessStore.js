const AppDispatcher = require('../dispatcher/AppDispatcher')
const EventEmitter = require('events').EventEmitter
const eventEmitter = new EventEmitter()
const Constants = require('../constants/NevergreenConstants')
const _ = require('lodash')

const CHANGE_EVENT = 'success-change'

let _storeState = {
  messages: [],
  validation: {}
}

function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function clearValidation() {
  _storeState.validation = {}
}

const dispatchToken = AppDispatcher.register(action => {
  switch (action.type) {
    case Constants.MessageAdd:
    {
      _storeState.messages = _storeState.messages.concat(action.message)
      clearValidation()
      break
    }
    case Constants.MessageRemove:
    {
      _.remove(_storeState.messages, msg => {
        return msg === action.message
      })
      clearValidation()
      break
    }
    case Constants.MessageInvalidInput:
    {
      _storeState.validation = {
        validationMessages: action.validationMessages,
        message: action.message
      }
      break
    }
    case Constants.ImportedData:
    {
      _storeState = {
        messages: [],
        validation: {}
      }
      break
    }
    default :
    {
      return true
    }
  }

  eventEmitter.emit(CHANGE_EVENT)
  return true
})

module.exports = {
  dispatchToken: dispatchToken,

  getMessages() {
    return _storeState.messages.filter(function(message) {
      return !this.isUrl(message)
    }.bind(this))
  },

  getImages() {
    return _storeState.messages.filter(function(message) {
      return this.isUrl(message)
    }.bind(this))
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
  }
}
