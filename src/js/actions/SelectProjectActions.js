const AppDispatcher = require('../dispatcher/AppDispatcher')
const Constants = require('../constants/NevergreenConstants')

module.exports = {

  selectProject(trayId, projectIds) {
    AppDispatcher.dispatch({
      type: Constants.ProjectSelected,
      trayId: trayId,
      projectIds: projectIds
    })
  },

  removeProject(trayId, projectIds) {
    AppDispatcher.dispatch({
      type: Constants.ProjectUnselected,
      trayId: trayId,
      projectIds: projectIds
    })
  }

}
