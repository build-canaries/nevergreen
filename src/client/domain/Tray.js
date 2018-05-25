import _ from 'lodash'
import nameGenerator from 'project-name-generator'
import {isError} from './Project'

export function generateRandomName() {
  return _.lowerCase(nameGenerator().spaced)
}

export function createId(url) {
  return url
}

export function getErrors(projects) {
  return projects
    .filter((project) => isError(project))
}

export function removeErrors(projects) {
  return projects
    .filter((project) => !isError(project))
}

export function removeJobs(projects) {
  return projects
    .filter((project) => !project.job)
}

export function extract(projects) {
  return {
    okProjects: removeErrors(removeJobs(projects)),
    errorProjects: getErrors(projects)
  }
}
