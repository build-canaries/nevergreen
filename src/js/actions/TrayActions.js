import AppDispatcher from '../dispatcher/AppDispatcher'
import {encryptPassword} from '../gateways/securityGateway'
import {fetchAll} from '../gateways/projectsGateway'
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

    const url = hasScheme(enteredUrl) ? enteredUrl : 'http://' + enteredUrl

    AppDispatcher.dispatch({
      type: Constants.TrayAdd,
      trayId,
      url,
      username
    })

    if (_.size(password) > 0) {
      this._encryptPasswordAndRefresh(trayId, url, username, password)
    } else {
      this.refreshTray({
        trayId,
        url,
        username
      })
    }
  },

  updateTray(trayId, name, url, username, password) {
    const passwordSame = trayStore.getById(trayId).password === password
    const newPassword = passwordSame ? '' : password

    AppDispatcher.dispatch({
      type: Constants.TrayUpdate,
      trayId,
      name,
      url,
      username
    })

    if (passwordSame) {
      this.refreshTray({
        trayId,
        url,
        username,
        password
      })
    } else {
      if (_.size(newPassword) > 0) {
        this._encryptPasswordAndRefresh(trayId, url, username, password)
      } else {
        AppDispatcher.dispatch({
          type: Constants.PasswordEncrypted,
          trayId,
          password: ''
        })
        this.refreshTray({
          trayId,
          url,
          username,
          password
        })
      }
    }
  },

  removeTray(trayId) {
    AppDispatcher.dispatch({
      type: Constants.TrayRemove,
      trayId
    })
  },

  refreshTray(tray) {
    AppDispatcher.dispatch({
      type: Constants.ProjectsFetching,
      trayId: tray.trayId
    })
    fetchAll([tray]).then((projects) => {
      AppDispatcher.dispatch({
        type: Constants.ProjectsFetched,
        trayId: tray.trayId,
        projects,
        timestamp: moment().format()
      })
    }).catch((error) => {
      AppDispatcher.dispatch({
        type: Constants.ProjectsFetchError,
        trayId: tray.trayId,
        error,
        timestamp: moment().format()
      })
    })
  },

  _encryptPasswordAndRefresh(trayId, url, username, password) {
    encryptPassword(password).then((encryptPasswordResponse) => {
      AppDispatcher.dispatch({
        type: Constants.PasswordEncrypted,
        trayId,
        password: encryptPasswordResponse.password
      })
      this.refreshTray({
        trayId,
        url,
        username,
        password: encryptPasswordResponse.password
      })
    })
  }

}
