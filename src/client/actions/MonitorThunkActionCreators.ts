import {interesting, ProjectsResponse} from '../gateways/ProjectsGateway'
import {send} from '../gateways/Gateway'
import {interestingProjects, interestingProjectsFetching} from './MonitorActionCreators'
import {isBuilding, Project, ProjectError, wrapProjectErrors, wrapProjects} from '../domain/Project'
import {projectNotifications} from './NotificationThunkActionCreators'
import {Tray} from '../domain/Tray'
import {State} from '../reducers/Reducer'
import {omit} from 'lodash'
import {AnyAction} from 'redux'
import {ThunkAction} from 'redux-thunk'
import {abortPendingRequest} from './NevergreenThunkActionCreators'
import {getInterestingProjects, INTERESTING_ROOT} from '../reducers/InterestingReducer'
import {getTrays} from '../reducers/TraysReducer'
import {getSelectedProjects} from '../reducers/SelectedReducer'
import {getProjects} from '../reducers/ProjectsReducer'
import {getShowPrognosis} from '../reducers/SettingsReducer'

function toErrorString(trays: Tray[], projectError: ProjectError): string {
  const tray = trays.find((tray) => tray.trayId === projectError.trayId)
  const identifier = tray ? `${tray.name || tray.url} ` : ''
  return `${identifier}${projectError.errorMessage}`
}

function addThisBuildTime(project: Project, previouslyFetchedProjects: Project[]): Project {
  if (isBuilding(project.prognosis)) {
    const previousProject = previouslyFetchedProjects.find((previous) => project.projectId === previous.projectId)
    const thisBuildTime = previousProject && isBuilding(previousProject.prognosis)
      ? previousProject.thisBuildTime
      : project.fetchedTime
    return {...project, thisBuildTime}
  } else {
    return omit(project, 'thisBuildTime')
  }
}

export function fetchInteresting(): ThunkAction<Promise<void>, State, undefined, AnyAction> {
  return async (dispatch, getState) => {
    dispatch(abortPendingRequest(INTERESTING_ROOT))

    const selected = getSelectedProjects(getState())
    const allTrays = getTrays(getState())
    const previouslyFetchedProjects = getInterestingProjects(getState())
    const projects = getProjects(getState())
    const prognosis = getShowPrognosis(getState())

    const request = interesting(allTrays, projects, selected, prognosis)
    dispatch(interestingProjectsFetching(request))

    try {
      const rawProjects = await send<ProjectsResponse>(request)
      const fetchedProjects = wrapProjects(rawProjects)
      const enrichedProjects = fetchedProjects
        .map((project) => addThisBuildTime(project, previouslyFetchedProjects))
      const errorMessages = wrapProjectErrors(rawProjects)
        .map((projectError) => toErrorString(allTrays, projectError))

      dispatch(interestingProjects(enrichedProjects, errorMessages))
      dispatch(projectNotifications(previouslyFetchedProjects))
    } catch (error) {
      dispatch(interestingProjects([], [error.message]))
    }
  }
}
