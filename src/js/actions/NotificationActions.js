import AppDispatcher from '../dispatcher/AppDispatcher'
import Constants from '../constants/NevergreenConstants'
import gateway from '../gateways/gateway'
import semver from 'semver'
import AppStore from '../stores/AppStore'

const nevergreenioRegEx = /nevergreen\.io/i

function _checkForNewVersion(currentVersion, hostname) {
  gateway.get('https://api.github.com/repos/build-canaries/nevergreen/releases/latest').then((data) => {
    if (semver.gt(data.tag_name, currentVersion)) {
      const saas = nevergreenioRegEx.test(hostname)
      const additional = saas ? ', refresh to update' : 'to download from GitHub now'

      AppDispatcher.dispatch({
        type: Constants.Notification,
        message: `A new version ${data.tag_name} is available ${additional}!`
      })
    }
  })
}

module.exports = {

  checkForNewVersion(currentVersion, hostname) {
    _checkForNewVersion(currentVersion, hostname)
  },

  pollForNewVersion() {
    _checkForNewVersion(AppStore.versionNumber(), AppStore.hostname())
  },

  dismiss() {
    AppDispatcher.dispatch({
      type: Constants.NotificationDismiss
    })
  }
}
