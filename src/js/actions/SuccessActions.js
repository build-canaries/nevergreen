var AppDispatcher = require('../dispatcher/AppDispatcher')
var Constants = require('../constants/NevergreenConstants')

module.exports = {

  addMessage: function (message) {
    AppDispatcher.dispatch({
      type: Constants.MessageAdd,
      message: message
    })
  },

  removeMessage: function (message) {
    AppDispatcher.dispatch({
      type: Constants.MessageRemove,
      message: message
    })
  }

}
