import {get, send} from '../gateways/Gateway'
import semver from 'semver'
import {notify} from './NotificationActionCreators'
import {sendSystemNotification} from '../common/SystemNotifications'
import * as log from '../common/Logger'
import {AnyAction} from 'redux'
import {isSick, Project} from '../domain/Project'
import {State} from '../Reducer'
import {getShowSystemNotifications} from '../settings/SettingsReducer'
import {getInterestingProjects} from '../monitor/InterestingReducer'
import {ThunkAction} from 'redux-thunk'

const NEVERGREEN_IO_REGEX = /nevergreen\.io/i

interface GitHubResponse {
  tag_name: string;
}

export function checkForNewVersion(currentVersion: string, hostname: string): ThunkAction<Promise<void>, State, undefined, AnyAction> {
  return async (dispatch) => {
    try {
      const data = await send<GitHubResponse>(get('https://api.github.com/repos/build-canaries/nevergreen/releases/latest'))
      const latestVersion = data.tag_name

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

function body(projects: Project[]): string {
  return projects
    .map((project) => project.name)
    .join(', ')
}

function newlySickTitle(total: number): string {
  return total === 1
    ? 'project is sick!'
    : `${total} projects are sick!`
}

function noLongerSickTitle(total: number): string {
  return total === 1
    ? 'project is no longer sick!'
    : `${total} projects are no longer sick!`
}

export function projectNotifications(previousProjects: Project[]): ThunkAction<Promise<void>, State, undefined, AnyAction> {
  return async (dispatch, getState) => {
    const showNotifications = getShowSystemNotifications(getState())

    if (showNotifications) {
      const currentProjects = getInterestingProjects(getState())

      const previouslySick = previousProjects
        .filter((project) => isSick(project.prognosis))
      const currentlySick = currentProjects
        .filter((project: Project) => isSick(project.prognosis))

      const previousIds = previousProjects.map((project) => project.projectId)
      const currentIds = currentProjects.map((project) => project.projectId)

      const newlySick = currentlySick.filter((p) => !previousIds.includes(p.projectId))
      const noLongerSick = previouslySick.filter((p) => !currentIds.includes(p.projectId))

      const newlySickTotal = newlySick.length
      const noLongerSickTotal = noLongerSick.length

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
