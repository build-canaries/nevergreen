import {fetchAll} from '../common/gateways/ProjectsGateway'
import {abortPendingRequest} from '../common/gateways/Gateway'
import {send} from '../common/gateways/NevergreenGateway'
import _ from 'lodash'
import {extract} from '../domain/Tray'
import {projectsFetched, projectsFetchError, projectsFetching} from './TrackingActionCreators'

export function refreshTray(tray, pendingRequest) {
  abortPendingRequest(pendingRequest)

  return function (dispatch) {
    const trayId = tray.trayId
    const request = fetchAll([tray])

    dispatch(projectsFetching(trayId, request))

    return send(request).then((allProjects) => {
      const {okProjects, errorProjects} = extract(allProjects)
      const errorMessages = errorProjects.map((project) => project.errorMessage)

      if (_.isEmpty(errorMessages)) {
        return dispatch(projectsFetched(trayId, okProjects))
      } else {
        return dispatch(projectsFetchError(trayId, errorMessages))
      }
    }).catch((error) => {
      return dispatch(projectsFetchError(trayId, [error.message]))
    })
  }
}
