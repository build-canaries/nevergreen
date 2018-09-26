import {interesting} from '../common/gateways/ProjectsGateway'
import {send} from '../common/gateways/NevergreenGateway'
import _ from 'lodash'
import {isBuilding} from '../domain/Project'
import {extract} from '../domain/Tray'
import {interestingProjects, interestingProjectsFetching} from './MonitorActionCreators'
import {abortPendingRequest} from '../common/gateways/Gateway'
import {
  interestingPendingRequest,
  interestingProjects as selectInterestingProjects,
  selectedProjects,
  trays
} from '../Selectors'

function toErrorString(trays, project) {
  const tray = trays.find((tray) => tray.get('trayId') === project.trayId)
  const identifier = tray.get('name') || tray.get('url')
  return `${identifier} ${project.errorMessage}`
}

function byProjectId(existing, newProject) {
  return existing.get('projectId') === newProject.projectId
}

function wasBuildingPreviousFetch(existingProject) {
  return !_.isNil(existingProject) && existingProject.get('thisBuildTime')
}

function addThisBuildTime(project, currentProjects) {
  const existingProject = currentProjects.find((existing) => byProjectId(existing, project))

  if (isBuilding(project.prognosis)) {
    project.thisBuildTime = wasBuildingPreviousFetch(existingProject)
      ? existingProject.get('thisBuildTime')
      : project.fetchedTime
  } else {
    project.thisBuildTime = null
  }

  return project
}

export function fetchInteresting() {
  return async (dispatch, getState) => {
    abortPendingRequest(interestingPendingRequest(getState()))

    const currentProjects = selectInterestingProjects(getState())
    const selected = selectedProjects(getState())
    const allTrays = trays(getState())

    const request = interesting(allTrays, selected)
    dispatch(interestingProjectsFetching(request))

    try {
      const allProjects = await send(request)
      const {okProjects, errorProjects} = extract(allProjects)
      const enrichedProjects = okProjects.map((project) => addThisBuildTime(project, currentProjects))
      const errorMessages = errorProjects.map((project) => toErrorString(allTrays, project))

      dispatch(interestingProjects(enrichedProjects, errorMessages))
    } catch (error) {
      dispatch(interestingProjects([], [error.message]))
    }
  }
}
