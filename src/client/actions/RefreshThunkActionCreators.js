import {fetchAll} from '../common/gateways/ProjectsGateway'
import {abortPendingRequest, send} from '../common/gateways/Gateway'
import _ from 'lodash'
import {projectsFetched, projectsFetchError, projectsFetching} from './TrackingActionCreators'

export function refreshTray(tray, pendingRequest) {
  abortPendingRequest(pendingRequest)

  return function (dispatch) {
    const trayId = tray.trayId
    const request = fetchAll([tray])

    dispatch(projectsFetching(trayId, request))

    return send(request).then((json) => {
      const filteredProjects = json.filter((project) => !project.job)
      const errors = json
        .filter((project) => project.message)
        .map((project) => project.message)

      if (_.isEmpty(errors)) {
        return dispatch(projectsFetched(trayId, filteredProjects))
      } else {
        return dispatch(projectsFetchError(trayId, errors))
      }
    }).catch((error) => {
      return dispatch(projectsFetchError(trayId, [`Nevergreen ${error.message}`]))
    })
  }
}
