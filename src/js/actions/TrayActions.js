const AppDispatcher = require('../dispatcher/AppDispatcher')
const securityGateway = require('../gateways/securityGateway')
const projectsGateway = require('../gateways/projectsGateway')
const uuid = require('node-uuid')
const validate = require('validate.js')
const Constants = require('../constants/NevergreenConstants')
const moment = require('moment')
const trayStore = require('../stores/TrayStore')
const _ = require('lodash')

const _addTrayValidation = {
  url: {
    presence: true,
    url: {
      allowLocal: true
    }
  }
}

module.exports = {

  addTray(url, username, password) {
    const trayId = uuid.v4()
    const validationMessages = validate({url: url}, _addTrayValidation)

    if (validationMessages) {
      AppDispatcher.dispatch({
        type: Constants.TrayInvalidInput,
        errors: validationMessages
      })
    } else {
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
    }
  },

  updateTray(trayId, url, username, password) {
    const passwordSame = trayStore.getById(trayId).password === password
    const newPassword = passwordSame ? '' : password

    AppDispatcher.dispatch({
      type: Constants.TrayUpdate,
      trayId: trayId,
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
