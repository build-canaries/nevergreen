import AppDispatcher from './dispatcher/AppDispatcher'
import LocalRepository from './storage/LocalRepository'
import moment from 'moment'

function momentInit() {
  moment.updateLocale('en', {
    relativeTime: {
      future: '%s',
      past: '%s',
      s: '<1m',
      m: '1m',
      mm: '%dm',
      h: '1h',
      hh: '%dh',
      d: '1d',
      dd: '%dd',
      M: '1mo',
      MM: '%dmo',
      y: '1y',
      yy: '%dy'
    }
  })
}

export const KeyboardShortcuts = 'keyboard-shortcuts'
export function showKeyboardShortcuts() {
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

export const AppInit = 'app-init'
export function init() {
  momentInit()
  LocalRepository.init()
  LocalRepository.getConfiguration().then((configuration) => {
    AppDispatcher.dispatch({
      type: AppInit,
      configuration
    })
  })
}
