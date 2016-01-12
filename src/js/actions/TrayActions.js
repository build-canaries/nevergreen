const AppDispatcher = require('../dispatcher/AppDispatcher')
const securityGateway = require('../gateways/securityGateway')
const projectsGateway = require('../gateways/projectsGateway')
const uuid = require('node-uuid')
const validate = require('validate.js')
const Constants = require('../constants/NevergreenConstants')
const moment = require('moment')

const _addTrayValidation = {
  url: {
    presence: true,
    url: {
      allowLocal: true
    }
  }
}

function _refreshTray(tray) {
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
}

function _handleTray(id, url, username, password) {
  const requiresAuth = username && password
  const trayId = id || uuid.v4()

  const validationMessages = validate({url: url}, _addTrayValidation)

  if (validationMessages) {
    AppDispatcher.dispatch({
      type: Constants.TrayInvalidInput,
      url: url,
      username: username,
      password: password,
      messages: validationMessages
    })
  } else {
    AppDispatcher.dispatch({
      type: id ? Constants.TrayUpdate : Constants.TrayAdd,
      trayId: trayId,
      url: url,
      username: username
    })

    if (requiresAuth) {
      securityGateway.encryptPassword(password).then(encryptPasswordResponse => {
        AppDispatcher.dispatch({
          type: Constants.PasswordEncrypted,
          trayId: trayId,
          password: encryptPasswordResponse.password
        })
        _refreshTray({
          trayId: trayId,
          url: url,
          username: username,
          password: encryptPasswordResponse.password
        })
      })
    } else {
      _refreshTray({
        trayId: trayId,
        url: url
      })
    }
  }
}

module.exports = {

  addTray(url, username, password) {
    _handleTray(null, url, username, password)
  },

  updateTray(trayId, url, username, password) {
    _handleTray(trayId, url, username, password)
  },

  removeTray(trayId) {
    AppDispatcher.dispatch({
      type: Constants.TrayRemove,
      trayId: trayId
    })
  },

  refreshTray(tray) {
    _refreshTray(tray)
  }

}
