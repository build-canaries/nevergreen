import _ from 'lodash'
import {sickProjects} from './Tray'
import {sendSystemNotification} from '../common/SystemNotifications'
import {notEmpty} from '../common/Utils'

function join(projects) {
  return _.join(projects, ', ')
}

function justOne(projects) {
  return projects.length === 1
}

export function sickProjectsNotification(projects) {
  const title = justOne(projects)
    ? 'project is sick!'
    : `${projects.length} projects are sick!`
  const body = join(projects)

  return {title, body}
}

export function noLongerSickProjectsNotification(projects) {
  const title = justOne(projects)
    ? 'project is no longer sick!'
    : `${projects.length} projects are no longer sick!`
  const body = join(projects)

  return {title, body}
}

export function triggerSystemNotifications(prevProjects, projects) {
  const previouslySick = sickProjects(prevProjects).map((project) => project.name)
  const currentlySick = sickProjects(projects).map((project) => project.name)

  const newlySick = _.difference(currentlySick, previouslySick)
  if (notEmpty(newlySick)) {
    sendSystemNotification(sickProjectsNotification(newlySick))
  }

  const noLongerSick = _.difference(previouslySick, currentlySick)
  if (notEmpty(noLongerSick)) {
    sendSystemNotification(noLongerSickProjectsNotification(noLongerSick))
  }
}
