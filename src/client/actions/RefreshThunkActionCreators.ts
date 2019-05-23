import {fetchAll, ProjectsResponse} from '../gateways/ProjectsGateway'
import {send} from '../gateways/Gateway'
import {projectsFetched, projectsFetchError, projectsFetching} from './TrackingActionCreators'
import {getProjects, getTray as selectTray} from '../reducers/Selectors'
import {wrapProjectErrors, wrapProjects} from '../domain/Project'
import {AnyAction} from 'redux'
import {State} from '../reducers/Reducer'
import {abortPendingRequest} from './NevergreenThunkActionCreators'
import {ThunkDispatch} from 'redux-thunk'

export function refreshTray(trayId: string) {
  return async (dispatch: ThunkDispatch<State, {}, AnyAction>, getState: () => State) => {
    dispatch(abortPendingRequest(trayId))

    const tray = selectTray(getState(), trayId)
    const seen = getProjects(getState())
    const request = fetchAll([tray], seen)

    dispatch(projectsFetching(trayId, request))

    try {
      const apiProjects = await send<ProjectsResponse>(request)
      const fetchedProjects = wrapProjects(apiProjects)
      const projectErrors = wrapProjectErrors(apiProjects)

      if (projectErrors.length === 0) {
        dispatch(projectsFetched(trayId, fetchedProjects, tray.includeNew))
      } else {
        const errorMessages = projectErrors.map((projectError) => projectError.errorMessage)
        dispatch(projectsFetchError(trayId, errorMessages))
      }
    } catch (error) {
      dispatch(projectsFetchError(trayId, [error.message]))
    }
  }
}
