const AppDispatcher = require('../dispatcher/AppDispatcher')
const Constants = require('../constants/NevergreenConstants')
const validate = require('validate.js')

const _addMessageValidation = {
  message: {
    presence: true
  }
}

function isASentence(message) {
  const numberOfLetters = (message.match(/[A-Za-z]/g) || []).length
  return (numberOfLetters / message.length) > 0.3
}

function transformMessage(message) {
  if (isASentence(message)) {
    return message
  }

  return message.replace(/ /g, String.fromCharCode(160))
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
        message: transformMessage(message)
      })
    }
  },

  removeMessage(message) {
    AppDispatcher.dispatch({
      type: Constants.MessageRemove,
      message: transformMessage(message)
    })
  }

}
