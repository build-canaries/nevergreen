import {fetchAll, ProjectsResponse} from '../gateways/ProjectsGateway'
import {send} from '../gateways/Gateway'
import {projectsFetched, projectsFetchError, projectsFetching} from './TrackingActionCreators'
import {wrapProjectErrors, wrapProjects} from '../domain/Project'
import {AnyAction} from 'redux'
import {State} from '../Reducer'
import {abortPendingRequest} from '../NevergreenThunkActionCreators'
import {ThunkAction} from 'redux-thunk'
import {getProjectsAll} from './ProjectsReducer'
import {getTray} from './TraysReducer'

export function refreshTray(trayId: string): ThunkAction<Promise<void>, State, undefined, AnyAction> {
  return async (dispatch, getState) => {
    dispatch(abortPendingRequest(trayId))

    const tray = getTray(trayId)(getState())
    const seen = getProjectsAll(getState())
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
