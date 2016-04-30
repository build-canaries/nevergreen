import AppDispatcher from '../dispatcher/AppDispatcher'
import {ProjectSelected, ProjectUnselected} from '../constants/NevergreenConstants'

module.exports = {

  selectProject(trayId, projectIds) {
    AppDispatcher.dispatch({
      type: ProjectSelected,
      trayId,
      projectIds
    })
  },

  removeProject(trayId, projectIds) {
    AppDispatcher.dispatch({
      type: ProjectUnselected,
      trayId,
      projectIds
    })
  }

}
