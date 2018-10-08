import {isBlank, isNumber} from '../common/Utils'
import {hash, Record} from 'immutable'

export const PROGNOSIS_SICK = 'sick'
export const PROGNOSIS_HEALTHY_BUILDING = 'healthy-building'
export const PROGNOSIS_SICK_BUILDING = 'sick-building'
export const PROGNOSIS_UNKNOWN = 'unknown'

export function formatBuildLabel(buildLabel, maxLength = 10) {
  if (isBlank(buildLabel)) {
    return ''
  }

  return isNumber(buildLabel)
    ? `#${buildLabel}`
    : buildLabel.substr(0, maxLength)
}

export function isSick(prognosis) {
  return prognosis === PROGNOSIS_SICK
}

export function isBuilding(prognosis) {
  return prognosis === PROGNOSIS_HEALTHY_BUILDING || prognosis === PROGNOSIS_SICK_BUILDING
}

export function isError(project) {
  return project.isError === true
}

export function wrapProjects(rawProjects) {
  return rawProjects
    .filterNot((rawProject) => rawProject.get('isError'))
    .filterNot((rawProject) => rawProject.get('job'))
    .map((rawProject) => new Project(rawProject))
}

export function wrapProjectErrors(rawProjects) {
  return rawProjects
    .filter((rawProject) => rawProject.get('isError'))
    .map(wrapProjectError)
}

export class Project extends Record({
  projectId: '',
  removed: false,
  prognosis: PROGNOSIS_UNKNOWN,
  lastBuildTime: '',
  fetchedTime: '',
  lastBuildStatus: '',
  name: '',
  url: '',
  activity: '',
  trayId: '',
  owner: '',
  isNew: false,
  webUrl: '',
  lastBuildLabel: '',
  serverType: '',
  stage: '',
  thisBuildTime: ''
}, 'Project') {

  isSick() {
    return isSick(this.prognosis)
  }

  isBuilding() {
    return isBuilding(this.prognosis)
  }

  equals(other) {
    return other && other.projectId === this.projectId
  }

  hashCode() {
    return hash(this.projectId)
  }
}

export const wrapProjectError = Record({
  trayId: '',
  url: '',
  fetchedTime: '',
  errorMessage: ''
}, 'ProjectError')
