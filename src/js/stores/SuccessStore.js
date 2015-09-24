var AppDispatcher = require('../dispatcher/AppDispatcher')
var EventEmitter = require('events').EventEmitter
var eventEmitter = new EventEmitter()
var Constants = require('../constants/NevergreenConstants')
var _ = require('lodash')

var CHANGE_EVENT = 'success-change'

var _messages = []
var _images = []

function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function isUrl(value) {
  return _.startsWith(value, 'http')
}

var dispatchToken = AppDispatcher.register(function (action) {
  switch (action.type) {
    case Constants.MessageAdd:
    {
      if (isUrl(action.message)) {
        _images = _images.concat(action.message)
      } else {
        _messages = _messages.concat(action.message)
      }
      break
    }
    case Constants.MessageRemove:
    {
      var arr = isUrl(action.message) ? _images : _messages
      _.remove(arr, function (message) {
        return message === action.message
      })
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
    return _messages
  },

  getImages: function () {
    return _images
  },

  getAll: function () {
    return _messages.concat(_images)
  },

  randomMessage: function () {
    var message = randomFrom(this.getAll()) || ''
    return {
      value: message,
      isImage: _.indexOf(_images, message) >= 0
    }
  },

  addListener: function (callback) {
    eventEmitter.on(CHANGE_EVENT, callback)
  },

  removeListener: function (callback) {
    eventEmitter.removeListener(CHANGE_EVENT, callback)
  }
}
