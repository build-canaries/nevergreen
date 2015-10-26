var AppDispatcher = require('../dispatcher/AppDispatcher')
var securityGateway = require('../gateways/securityGateway')
var projectsGateway = require('../gateways/projectsGateway')
var uuid = require('node-uuid')
var validate = require('validate.js')
var Constants = require('../constants/NevergreenConstants')

var _addTrayValidation = {
  url: {
    presence: true,
    url: {
      allowLocal: true
    }
  }
}

module.exports = {

  addTray: function (url, username, password) {
    var requiresAuth = username && password
    var trayId = uuid.v4()

    var validationMessages = validate({url: url}, _addTrayValidation)

    if (validationMessages) {
      this._dispatchInvalidInput(url, username, password, validationMessages)
    } else {
      this._dispatchTrayAdded(trayId, url, username)

      if (requiresAuth) {
        return securityGateway.encryptPassword(password).then(function (encryptPasswordResponse) {
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

  removeTray: function (trayId) {
    AppDispatcher.dispatch({
      type: Constants.TrayRemove,
      trayId: trayId
    })
  },

  refreshTray: function (tray) {
    this._dispatchProjectsFetching(tray.trayId)
    return projectsGateway.fetchAll(tray).then(function (projects) {
      this._dispatchProjectsLoaded(tray.trayId, projects)
    }.bind(this)).catch(function (err) {
      this._dispatchApiError(tray.trayId, err)
    }.bind(this))
  },

  _dispatchTrayAdded: function (trayId, url, username) {
    AppDispatcher.dispatch({
      type: Constants.TrayAdd,
      trayId: trayId,
      url: url,
      username: username
    })
  },

  _dispatchPasswordEncrypted: function (trayId, encryptedPassword) {
    AppDispatcher.dispatch({
      type: Constants.PasswordEncrypted,
      trayId: trayId,
      password: encryptedPassword
    })
  },

  _dispatchProjectsFetching: function (trayId) {
    AppDispatcher.dispatch({
      type: Constants.ProjectsFetching,
      trayId: trayId
    })
  },

  _dispatchProjectsLoaded: function (trayId, data) {
    AppDispatcher.dispatch({
      type: Constants.ProjectsFetched,
      trayId: trayId,
      projects: data
    })
  },

  _dispatchApiError: function (trayId, error) {
    AppDispatcher.dispatch({
      type: Constants.ApiError,
      trayId: trayId,
      error: error
    })
  },

  _dispatchInvalidInput: function (url, username, password, messages) {
    AppDispatcher.dispatch({
      type: Constants.TrayInvalidInput,
      url: url,
      username: username,
      password: password,
      messages: messages
    })
  }

}
