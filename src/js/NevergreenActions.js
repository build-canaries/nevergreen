import AppDispatcher from './common/AppDispatcher'
import LocalRepository from './common/LocalRepository'
import moment from 'moment'
import {get} from './common/gateways/Gateway'
import semver from 'semver'

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

const nevergreenioRegEx = /nevergreen\.io/i

export const Notification = 'notification'
export function checkForNewVersion(currentVersion, hostname) {
  get('https://api.github.com/repos/build-canaries/nevergreen/releases/latest').then((data) => {
    if (semver.gt(data.tag_name, currentVersion)) {
      const saas = nevergreenioRegEx.test(hostname)
      const additional = saas ? ', refresh to update' : 'to download from GitHub now'

      AppDispatcher.dispatch({
        type: Notification,
        message: `A new version ${data.tag_name} is available ${additional}!`
      })
    }
  })
}

export const NotificationDismiss = 'notification-dismiss'
export function dismiss() {
  AppDispatcher.dispatch({
    type: NotificationDismiss
  })
}
