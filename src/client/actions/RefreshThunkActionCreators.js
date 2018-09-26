import {fetchAll} from '../common/gateways/ProjectsGateway'
import {abortPendingRequest} from '../common/gateways/Gateway'
import {send} from '../common/gateways/NevergreenGateway'
import _ from 'lodash'
import {extract} from '../domain/Tray'
import {projectsFetched, projectsFetchError, projectsFetching} from './TrackingActionCreators'
import {tray as selectTray} from '../Selectors'
import {List} from 'immutable'

export function refreshTray(trayId, selectAll = false) {

  return async (dispatch, getState) => {
    const tray = selectTray(getState(), trayId)

    abortPendingRequest(tray.get('pendingRequest'))

    const request = fetchAll(List.of(tray))

    dispatch(projectsFetching(trayId, request))

    try {
      const allProjects = await send(request)
      const {okProjects, errorProjects} = extract(allProjects)
      const errorMessages = errorProjects.map((project) => project.errorMessage)

      if (_.isEmpty(errorMessages)) {
        dispatch(projectsFetched(trayId, okProjects, selectAll))
      } else {
        dispatch(projectsFetchError(trayId, errorMessages))
      }
    } catch (error) {
      dispatch(projectsFetchError(trayId, [error.message]))
    }
  }
}
