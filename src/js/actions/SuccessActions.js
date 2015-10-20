var AppDispatcher = require('../dispatcher/AppDispatcher')
var Constants = require('../constants/NevergreenConstants')
var validate = require('validate.js')

var _validationOptions = {format: 'flat'}

var _addMessageValidation = {
  message: {
    presence: true
  }
}

module.exports = {

  addMessage: function (message) {
    var validationMessages = validate({message: message}, _addMessageValidation, _validationOptions)

    if (validationMessages) {
      AppDispatcher.dispatch({
        type: Constants.MessageInvalidInput,
        validationMessages: validationMessages,
        message: message
      })
    } else {
      AppDispatcher.dispatch({
        type: Constants.MessageAdd,
        message: message
      })
    }
  },

  removeMessage: function (message) {
    AppDispatcher.dispatch({
      type: Constants.MessageRemove,
      message: message
    })
  }

}
