const AppDispatcher = require('../dispatcher/AppDispatcher')
const Constants = require('../constants/NevergreenConstants')
const validate = require('validate.js')

const _addMessageValidation = {
  message: {
    presence: true
  }
}

module.exports = {

  addMessage(message) {
    const validationMessages = validate({message: message}, _addMessageValidation)

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

  removeMessage(message) {
    AppDispatcher.dispatch({
      type: Constants.MessageRemove,
      message: message
    })
  }

}
