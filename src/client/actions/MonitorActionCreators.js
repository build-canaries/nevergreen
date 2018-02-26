import Immutable from 'immutable'
import {interesting} from '../common/gateways/ProjectsGateway'
import {send} from '../common/gateways/Gateway'
import {INTERESTING_PROJECTS} from './Actions'
import _ from 'lodash'
import {isBuilding} from '../domain/Project'

function toErrorString(trays, project) {
  const tray = _.head(trays.filter((tray) => tray.trayId === project.trayId))
  const identifier = _.get(tray, 'name') || _.get(tray, 'url') || project.url
  return `${identifier} ${project.error}`
}

function byProjectId(existing, newProject) {
  return existing.projectId === newProject.projectId
}

function addThisBuildTime(project, currentProjects) {
  const existingProject = currentProjects.find((existing) => byProjectId(existing, project))

  if (isBuilding(project.prognosis)) {
    project.thisBuildTime = existingProject
      ? existingProject.thisBuildTime
      : project.fetchedTime
  } else {
    project.thisBuildTime = null
  }

  return project
}

export function interestingProjects(projects, errors) {
  return {
    type: INTERESTING_PROJECTS,
    projects: Immutable.fromJS(projects),
    errors: Immutable.List(errors)
  }
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
