const AppDispatcher = require('../dispatcher/AppDispatcher')
const securityGateway = require('../gateways/securityGateway')
const projectsGateway = require('../gateways/projectsGateway')
const uuid = require('node-uuid')
const validate = require('validate.js')
const Constants = require('../constants/NevergreenConstants')

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
      this._dispatchInvalidInput(url, username, password, validationMessages)
    } else {
      this._dispatchTrayAdded(trayId, url, username)

      if (requiresAuth) {
        return securityGateway.encryptPassword(password).then(function(encryptPasswordResponse) {
          this._dispatchPasswordEncrypted(trayId, encryptPasswordResponse.password)
          return this.refreshTray({
            trayId: trayId,
            url: url,
            username: username,
            password: encryptPasswordResponse.password
          })
        }.bind(this))
      } else {
        return this.refreshTray({
          trayId: trayId,
          url: url
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
    this._dispatchProjectsFetching(tray.trayId)
    return projectsGateway.fetchAll([tray]).then(function(projects) {
      this._dispatchProjectsLoaded(tray.trayId, projects)
    }.bind(this)).catch(function(err) {
      this._dispatchApiError(tray.trayId, err)
    }.bind(this))
  },

  _dispatchTrayAdded(trayId, url, username) {
    AppDispatcher.dispatch({
      type: Constants.TrayAdd,
      trayId: trayId,
      url: url,
      username: username
    })
  },

  _dispatchPasswordEncrypted(trayId, encryptedPassword) {
    AppDispatcher.dispatch({
      type: Constants.PasswordEncrypted,
      trayId: trayId,
      password: encryptedPassword
    })
  },

  _dispatchProjectsFetching(trayId) {
    AppDispatcher.dispatch({
      type: Constants.ProjectsFetching,
      trayId: trayId
    })
  },

  _dispatchProjectsLoaded(trayId, data) {
    AppDispatcher.dispatch({
      type: Constants.ProjectsFetched,
      trayId: trayId,
      projects: data
    })
  },

  _dispatchApiError(trayId, error) {
    AppDispatcher.dispatch({
      type: Constants.ApiError,
      trayId: trayId,
      error: error
    })
  },

  _dispatchInvalidInput(url, username, password, messages) {
    AppDispatcher.dispatch({
      type: Constants.TrayInvalidInput,
      url: url,
      username: username,
      password: password,
      messages: messages
    })
  }

}
