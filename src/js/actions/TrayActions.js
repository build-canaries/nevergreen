const AppDispatcher = require('../dispatcher/AppDispatcher')
const securityGateway = require('../gateways/securityGateway')
const projectsGateway = require('../gateways/projectsGateway')
const uuid = require('node-uuid')
const validate = require('validate.js')
const Constants = require('../constants/NevergreenConstants')
const moment = require('moment')
const trayStore = require('../stores/TrayStore')

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
    const requiresAuth = username && password
    const trayId = uuid.v4()

    const validationMessages = validate({url: url}, _addTrayValidation)

    if (validationMessages) {
      AppDispatcher.dispatch({
        type: Constants.TrayInvalidInput,
        url: url,
        username: username,
        password: password,
        errors: validationMessages
      })
    } else {
      AppDispatcher.dispatch({
        type: Constants.TrayAdd,
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
          this.refreshTray({
            trayId: trayId,
            url: url,
            username: username,
            password: encryptPasswordResponse.password
          })
        })
      } else {
        this.refreshTray({
          trayId: trayId,
          url: url
        })
      }
    }
  },

  updateTray(trayId, url, username, password) {
    const passwordSame = trayStore.getById(trayId).password === password
    const newPassword = passwordSame ? null : password

    AppDispatcher.dispatch({
      type: Constants.TrayUpdate,
      trayId: trayId,
      url: url,
      username: username
    })

    if (newPassword) {
      securityGateway.encryptPassword(newPassword).then(encryptPasswordResponse => {
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
    } else {
      this.refreshTray({
        trayId: trayId,
        url: url,
        username: username,
        password: password
      })
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
  }

}
