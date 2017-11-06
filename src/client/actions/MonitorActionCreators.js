import Immutable from 'immutable'
import {interesting} from '../common/gateways/ProjectsGateway'
import {send} from '../common/gateways/Gateway'
import {INTERESTING_PROJECTS} from './Actions'
import head from 'lodash/head'
import get from 'lodash/get'
import lowerCase from 'lodash/lowerCase'

export function interestingProjects(projects, errors) {
  return {type: INTERESTING_PROJECTS, projects: Immutable.fromJS(projects), errors: Immutable.List(errors)}
}

export function fetchInteresting(trays, selected) {
  return function (dispatch) {
    return send(interesting(trays, selected)).then((projects) => {
      const filteredProjects = projects.filter((project) => !project.error).filter((project) => !project.job)
      const errors = projects.filter((project) => project.error).map((project) => {
        const tray = head(trays.filter((tray) => tray.trayId === project.trayId))
        const identifier = get(tray, 'name') || get(tray, 'url') || project.url
        return `${identifier} ${lowerCase(project.error)}`
      })

      dispatch(interestingProjects(filteredProjects, errors))
    }).catch((error) => {
      dispatch(interestingProjects([], [`nevergreen server ${error.status} ${error.message}`]))
    })
  }
}
