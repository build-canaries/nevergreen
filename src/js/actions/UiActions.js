const AppDispatcher = require('../dispatcher/AppDispatcher')
const Constants = require('../constants/NevergreenConstants')

module.exports = {
  showKeyboardShortcuts() {
    const timerId = setTimeout(() => {
      AppDispatcher.dispatch({
        type: Constants.KeyboardShortcuts,
        show: false
      })
    }, 3000)

    AppDispatcher.dispatch({
      type: Constants.KeyboardShortcuts,
      show: true,
      cancel: () => {
        clearTimeout(timerId)
      }
    })
  }
}
