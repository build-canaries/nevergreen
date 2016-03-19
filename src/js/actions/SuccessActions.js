const AppDispatcher = require('../dispatcher/AppDispatcher')
const Constants = require('../constants/NevergreenConstants')
const _ = require('lodash')

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

function validateMessage(message) {
  if (_.isEmpty(_.trim(message))) {
    return ['message can not be blank!']
  }
}

module.exports = {
  addMessage(message) {
    const validationMessages = validateMessage(message)

    if (validationMessages) {
      AppDispatcher.dispatch({
        type: Constants.MessageInvalidInput,
        errors: validationMessages,
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
