import {interesting} from '../gateways/ProjectsGateway'
import {send} from '../gateways/NevergreenGateway'
import {interestingProjects, interestingProjectsFetching} from './MonitorActionCreators'
import {abortPendingRequest} from '../gateways/Gateway'
import {
  interestingPendingRequest,
  interestingProjects as selectInterestingProjects,
  selectedProjects,
  trays
} from '../reducers/Selectors'
import {wrapProjectErrors, wrapProjects} from '../domain/Project'
import {List} from 'immutable'
import {projectNotifications} from './NotificationThunkActionCreators'

function toErrorString(trays, projectError) {
  const tray = trays.find((tray) => tray.trayId === projectError.trayId)
  const identifier = tray.name || tray.url
  return `${identifier} ${projectError.errorMessage}`
}

function addThisBuildTime(project, previouslyFetchedProjects) {
  if (project.isBuilding()) {
    const previousProject = previouslyFetchedProjects.find((previous) => project.equals(previous))
    const thisBuildTime = previousProject && previousProject.isBuilding()
      ? previousProject.thisBuildTime
      : project.fetchedTime
    return project.set('thisBuildTime', thisBuildTime)
  } else {
    return project.delete('thisBuildTime')
  }
}

export function fetchInteresting() {
  return async (dispatch, getState) => {
    abortPendingRequest(interestingPendingRequest(getState()))

    const selected = selectedProjects(getState())
    const allTrays = trays(getState())
    const previouslyFetchedProjects = selectInterestingProjects(getState())

    const request = interesting(allTrays, selected)
    dispatch(interestingProjectsFetching(request))

    try {
      const rawProjects = await send(request)
      const fetchedProjects = wrapProjects(rawProjects)
      const enrichedProjects = fetchedProjects
        .map((project) => addThisBuildTime(project, previouslyFetchedProjects))
      const errorMessages = wrapProjectErrors(rawProjects)
        .map((projectError) => toErrorString(allTrays, projectError))

      dispatch(interestingProjects(enrichedProjects, errorMessages))
      dispatch(projectNotifications(previouslyFetchedProjects))
    } catch (error) {
      dispatch(interestingProjects(List(), List.of(error.message)))
    }
  }
}
