import AppDispatcher from '../dispatcher/AppDispatcher'
import Constants from '../constants/NevergreenConstants'

module.exports = {

  selectProject(trayId, projectIds) {
    AppDispatcher.dispatch({
      type: Constants.ProjectSelected,
      trayId,
      projectIds
    })
  },

  removeProject(trayId, projectIds) {
    AppDispatcher.dispatch({
      type: Constants.ProjectUnselected,
      trayId,
      projectIds
    })
  }

}
