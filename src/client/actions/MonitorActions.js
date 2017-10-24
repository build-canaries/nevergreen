import Immutable from 'immutable'
import {interesting} from '../common/gateways/ProjectsGateway'
import {send} from '../common/gateways/Gateway'
import {INTERESTING_PROJECTS} from './Actions'
import _ from 'lodash'

export function interestingProjects(projects, errors) {
  return {type: INTERESTING_PROJECTS, projects: Immutable.fromJS(projects), errors: Immutable.List(errors)}
}

export function fetchInteresting(trays, selected) {
  return function (dispatch) {
    return send(interesting(trays, selected)).then((projects) => {
      const filteredProjects = projects.filter((project) => !project.error).filter((project) => !project.job)
      const errors = projects.filter((project) => project.error).map((project) => {
        const tray = _.head(trays.filter((tray) => tray.trayId === project.trayId))
        const identifier = _.get(tray, 'name') || _.get(tray, 'url') || project.url
        return `${identifier} ${_.lowerCase(project.error)}`
      })

      dispatch(interestingProjects(filteredProjects, errors))
    }).catch((error) => {
      dispatch(interestingProjects([], [`nevergreen server ${error.status} ${error.message}`]))
    })
  }
}
