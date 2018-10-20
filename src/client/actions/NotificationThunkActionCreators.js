import {get} from '../common/gateways/Gateway'
import {send} from '../common/gateways/GitHubGateway'
import semver from 'semver'
import {notify} from './NotificationActionCreators'
import {interestingProjects, showSystemNotifications} from '../Selectors'
import {sendSystemNotification} from '../common/SystemNotifications'
import * as log from '../common/Logger'

const NEVERGREEN_IO_REGEX = /nevergreen\.io/i

export function checkForNewVersion(currentVersion, hostname) {
  return async (dispatch) => {
    try {
      const data = await send(get('https://api.github.com/repos/build-canaries/nevergreen/releases/latest'))
      const latestVersion = data.get('tag_name')

      if (semver.gt(latestVersion, currentVersion)) {
        const saas = NEVERGREEN_IO_REGEX.test(hostname)
        const additional = saas ? ', refresh to update' : ' to download from GitHub now'

        dispatch(notify(`A new version ${latestVersion} is available${additional}!`))
      }
    } catch (e) {
      // We don't care if checking for a new version fails
    }
  }
}

function body(projects) {
  return projects
    .map((project) => project.name)
    .join(', ')
}

function newlySickTitle(total) {
  return total === 1
    ? 'project is sick!'
    : `${total} projects are sick!`
}

function noLongerSickTitle(total) {
  return total === 1
    ? 'project is no longer sick!'
    : `${total} projects are no longer sick!`
}

export function projectNotifications(previouslyProjects) {
  return async (dispatch, getState) => {
    const showNotifications = showSystemNotifications(getState())

    if (showNotifications) {
      const currentProjects = interestingProjects(getState())

      const previouslySick = previouslyProjects
        .filter((project) => project.isSick())
        .toOrderedSet()
      const currentlySick = currentProjects
        .filter((project) => project.isSick())
        .toOrderedSet()

      const newlySick = currentlySick.subtract(previouslySick)
      const noLongerSick = previouslySick.subtract(currentlySick)

      const newlySickTotal = newlySick.count()
      const noLongerSickTotal = noLongerSick.count()

      try {
        if (newlySickTotal > 0) {
          await sendSystemNotification({title: newlySickTitle(newlySickTotal), body: body(newlySick)})
        }
        if (noLongerSickTotal > 0) {
          await sendSystemNotification({title: noLongerSickTitle(noLongerSickTotal), body: body(noLongerSick)})
        }
      } catch (err) {
        log.error('Sending system notification failed', err)
      }
    }
  }
}
