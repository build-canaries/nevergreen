import AppDispatcher from '../dispatcher/AppDispatcher'
import {KeyboardShortcuts} from '../constants/NevergreenConstants'

module.exports = {
  showKeyboardShortcuts() {
    const timerId = setTimeout(() => {
      AppDispatcher.dispatch({
        type: KeyboardShortcuts,
        show: false
      })
    }, 3000)

    AppDispatcher.dispatch({
      type: KeyboardShortcuts,
      show: true,
      cancel: () => {
        clearTimeout(timerId)
      }
    })
  }
}
