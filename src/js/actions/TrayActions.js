var AppDispatcher = require('../dispatcher/AppDispatcher')
var securityGateway = require('../gateways/securityGateway')
var projectsGateway = require('../gateways/projectsGateway')
var uuid = require('node-uuid')
var validate = require('validate.js')
var Constants = require('../constants/NevergreenConstants')

var _validationOptions = {format: 'flat'}

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

    var validationMessages = validate({url: url}, _addTrayValidation, _validationOptions)

    if (validationMessages) {
      this._dispatchInvalidInput(url, username, password, validationMessages)
    } else {
      this._dispatchTrayAdded(trayId, url, username)

      if (requiresAuth) {
        return securityGateway.encryptPassword(password).then(function (encryptPasswordResponse) {
          this._dispatchPasswordEncrypted(trayId, encryptPasswordResponse.password)
          return this.refreshTray({
            id: trayId,
            url: url,
            username: username,
            password: encryptPasswordResponse.password
          })
        }.bind(this))
      } else {
        return this.refreshTray({
          id: trayId,
          url: url
        })
      }
    }
  },

  removeTray: function (id) {
    AppDispatcher.dispatch({
      type: Constants.TrayRemove,
      id: id
    })
  },

  refreshTray: function (tray) {
    this._dispatchProjectsFetching(tray.id)
    return projectsGateway.fetchAll(tray).then(function (projects) {
      this._dispatchProjectsLoaded(tray.id, projects)
    }.bind(this)).catch(function (err) {
      this._dispatchApiError(tray.id, err)
    }.bind(this))
  },

  _dispatchTrayAdded: function (trayId, url, username) {
    AppDispatcher.dispatch({
      type: Constants.TrayAdd,
      id: trayId,
      url: url,
      username: username
    })
  },

  _dispatchPasswordEncrypted: function (trayId, encryptedPassword) {
    AppDispatcher.dispatch({
      type: Constants.PasswordEncrypted,
      id: trayId,
      password: encryptedPassword
    })
  },

  _dispatchProjectsFetching: function (trayId) {
    AppDispatcher.dispatch({
      type: Constants.ProjectsFetching,
      id: trayId
    })
  },

  _dispatchProjectsLoaded: function (trayId, data) {
    AppDispatcher.dispatch({
      type: Constants.ProjectsFetched,
      id: trayId,
      projects: data
    })
  },

  _dispatchApiError: function (trayId, error) {
    AppDispatcher.dispatch({
      type: Constants.ApiError,
      id: trayId,
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
