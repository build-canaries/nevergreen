var AppDispatcher = require('../dispatcher/AppDispatcher')
var securityGateway = require('../gateways/securityGateway')
var projectsGateway = require('../gateways/projectsGateway')
var uuid = require('node-uuid')
var Constants = require('../constants/NevergreenConstants')

module.exports = {

  addTray: function (url, username, password) {
    var requiresAuth = username && password
    var trayId = uuid.v4()

    this._dispatchTrayAdded(trayId, url, username)

    if (requiresAuth) {
      securityGateway.encryptPassword(password).then(function (encryptedPassword) {
        this._dispatchPasswordEncrypted(trayId, encryptedPassword)
        this._dispatchProjectsFetching(trayId)
        return projectsGateway.fetchAll({url: url, username: username, password: encryptedPassword})
      }.bind(this)).then(function (projects) {
        this._dispatchProjectsLoaded(trayId, projects)
      }.bind(this)).catch(function (err) {
        this._dispatchApiError(trayId, err)
      }.bind(this))
    } else {
      this.refreshTray({id: trayId, url: url})
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
    projectsGateway.fetchAll(tray).then(function (projects) {
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
  }

}
