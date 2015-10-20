var AppDispatcher = require('../dispatcher/AppDispatcher')
var EventEmitter = require('events').EventEmitter
var eventEmitter = new EventEmitter()
var Constants = require('../constants/NevergreenConstants')
var _ = require('lodash')

var CHANGE_EVENT = 'success-change'

var _storeState = {
  messages: [],
  validation: {}
}

function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function clearValidation() {
  _storeState.validation = {}
}

var dispatchToken = AppDispatcher.register(function (action) {
  switch (action.type) {
    case Constants.MessageAdd:
    {
      _storeState.messages = _storeState.messages.concat(action.message)
      clearValidation()
      break
    }
    case Constants.MessageRemove:
    {
      _.remove(_storeState.messages, function (msg) {
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

  getMessages: function () {
    return _storeState.messages.filter(function (message) {
      return !this.isUrl(message)
    }.bind(this))
  },

  getImages: function () {
    return _storeState.messages.filter(function (message) {
      return this.isUrl(message)
    }.bind(this))
  },

  getAll: function () {
    return _storeState.messages
  },

  randomMessage: function () {
    return randomFrom(_storeState.messages) || ''
  },

  getValidationObject: function () {
    return _storeState.validation
  },

  isUrl: function (value) {
    return _.startsWith(value, 'http')
  },

  addListener: function (callback) {
    eventEmitter.on(CHANGE_EVENT, callback)
  },

  removeListener: function (callback) {
    eventEmitter.removeListener(CHANGE_EVENT, callback)
  }
}
