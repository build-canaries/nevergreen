import {fetchAll} from '../gateways/ProjectsGateway'
import {abortPendingRequest} from '../gateways/Gateway'
import {send} from '../gateways/NevergreenGateway'
import {projectsFetched, projectsFetchError, projectsFetching} from './TrackingActionCreators'
import {pendingRequest, tray as selectTray} from '../reducers/Selectors'
import {List} from 'immutable'
import {wrapProjectErrors, wrapProjects} from '../domain/Project'

export function refreshTray(trayId, selectAll = false) {

  return async (dispatch, getState) => {
    const tray = selectTray(getState(), trayId)

    abortPendingRequest(pendingRequest(getState(), trayId))

    const request = fetchAll(List.of(tray))

    dispatch(projectsFetching(trayId, request))

    try {
      const rawProjects = await send(request)
      const fetchedProjects = wrapProjects(rawProjects)
      const projectErrors = wrapProjectErrors(rawProjects)

      if (projectErrors.count() === 0) {
        dispatch(projectsFetched(trayId, fetchedProjects, selectAll))
      } else {
        const errorMessages = projectErrors.map((projectError) => projectError.errorMessage)
        dispatch(projectsFetchError(trayId, errorMessages))
      }
    } catch (error) {
      dispatch(projectsFetchError(trayId, List.of(error.message)))
    }
  }
}
