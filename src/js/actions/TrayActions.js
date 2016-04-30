import AppDispatcher from '../dispatcher/AppDispatcher'
import securityGateway from '../gateways/securityGateway'
import projectsGateway from '../gateways/projectsGateway'
import uuid from 'node-uuid'
import Constants from '../constants/NevergreenConstants'
import moment from 'moment'
import trayStore from '../stores/TrayStore'
import _ from 'lodash'

function hasScheme(url) {
  return _.size(_.split(url, '://')) > 1
}

module.exports = {

  addTray(enteredUrl, username, password) {
    const trayId = uuid.v4()

    const url =  hasScheme(enteredUrl) ? enteredUrl : 'http://' + enteredUrl

    AppDispatcher.dispatch({
      type: Constants.TrayAdd,
      trayId: trayId,
      url: url,
      username: username
    })

    if (_.size(password) > 0) {
      this._encryptPasswordAndRefresh(trayId, url, username, password)
    } else {
      this.refreshTray({
        trayId: trayId,
        url: url,
        username: username
      })
    }
  },

  updateTray(trayId, name, url, username, password) {
    const passwordSame = trayStore.getById(trayId).password === password
    const newPassword = passwordSame ? '' : password

    AppDispatcher.dispatch({
      type: Constants.TrayUpdate,
      trayId: trayId,
      name: name,
      url: url,
      username: username
    })

    if (passwordSame) {
      this.refreshTray({
        trayId: trayId,
        url: url,
        username: username,
        password: password
      })
    } else {
      if (_.size(newPassword) > 0) {
        this._encryptPasswordAndRefresh(trayId, url, username, password)
      } else {
        AppDispatcher.dispatch({
          type: Constants.PasswordEncrypted,
          trayId: trayId,
          password: ''
        })
        this.refreshTray({
          trayId: trayId,
          url: url,
          username: username,
          password: password
        })
      }
    }
  },

  removeTray(trayId) {
    AppDispatcher.dispatch({
      type: Constants.TrayRemove,
      trayId: trayId
    })
  },

  refreshTray(tray) {
    AppDispatcher.dispatch({
      type: Constants.ProjectsFetching,
      trayId: tray.trayId
    })
    projectsGateway.fetchAll([tray]).then(projects => {
      AppDispatcher.dispatch({
        type: Constants.ProjectsFetched,
        trayId: tray.trayId,
        projects: projects,
        timestamp: moment().format()
      })
    }).catch(err => {
      AppDispatcher.dispatch({
        type: Constants.ProjectsFetchError,
        trayId: tray.trayId,
        error: err,
        timestamp: moment().format()
      })
    })
  },

  _encryptPasswordAndRefresh(trayId, url, username, password) {
    securityGateway.encryptPassword(password).then(encryptPasswordResponse => {
      AppDispatcher.dispatch({
        type: Constants.PasswordEncrypted,
        trayId: trayId,
        password: encryptPasswordResponse.password
      })
      this.refreshTray({
        trayId: trayId,
        url: url,
        username: username,
        password: encryptPasswordResponse.password
      })
    })
  }

}
