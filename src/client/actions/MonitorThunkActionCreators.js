import {interesting} from '../common/gateways/ProjectsGateway'
import {send} from '../common/gateways/Gateway'
import _ from 'lodash'
import {isBuilding} from '../domain/Project'
import {interestingProjects} from './MonitorActionCreators'

function toErrorString(trays, project) {
  const tray = _.head(trays.filter((tray) => tray.trayId === project.trayId))
  const identifier = _.get(tray, 'name') || _.get(tray, 'url') || project.url
  return `${identifier} ${project.error}`
}

function byProjectId(existing, newProject) {
  return existing.projectId === newProject.projectId
}

function wasBuildingPreviousFetch(existingProject) {
  return !_.isNil(existingProject) && existingProject.thisBuildTime
}

function addThisBuildTime(project, currentProjects) {
  const existingProject = currentProjects.find((existing) => byProjectId(existing, project))

  if (isBuilding(project.prognosis)) {
    project.thisBuildTime = wasBuildingPreviousFetch(existingProject)
      ? existingProject.thisBuildTime
      : project.fetchedTime
  } else {
    project.thisBuildTime = null
  }

  return project
}

export function fetchInteresting(trays, selected, currentProjects) {
  return function (dispatch) {
    return send(interesting(trays, selected)).then((projects) => {
      const filteredProjects = projects
        .filter((project) => !project.error)
        .filter((project) => !project.job)
        .map((project) => addThisBuildTime(project, currentProjects))

      const errors = projects
        .filter((project) => project.error)
        .map((project) => toErrorString(trays, project))

      dispatch(interestingProjects(filteredProjects, errors))
    }).catch((error) => {
      dispatch(interestingProjects([], [`Nevergreen ${error.message}`]))
    })
  }
}
