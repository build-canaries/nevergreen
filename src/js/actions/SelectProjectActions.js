var AppDispatcher = require('../dispatcher/AppDispatcher')
var Constants = require('../constants/NevergreenConstants')

module.exports = {

  selectProject: function (trayId, projectIds) {
    AppDispatcher.dispatch({
      type: Constants.ProjectSelected,
      trayId: trayId,
      projectIds: projectIds
    })
  },

  removeProject: function (trayId, projectIds) {
    AppDispatcher.dispatch({
      type: Constants.ProjectUnselected,
      trayId: trayId,
      projectIds: projectIds
    })
  }

}
