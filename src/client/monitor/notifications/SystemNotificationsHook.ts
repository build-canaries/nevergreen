import {getShowSystemNotifications} from '../../settings/SettingsReducer'
import {sendSystemNotification} from '../../common/SystemNotifications'
import * as log from '../../common/Logger'
import {useSelector} from 'react-redux'
import {useEffect} from 'react'
import {isNewlySick, isNoLongerSick, Projects} from '../../domain/Project'

function body(projects: Projects): string {
  return projects
    .map((project) => project.description)
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

export function useSystemNotifications(projects: Projects): void {
  const showNotifications = useSelector(getShowSystemNotifications)

  useEffect(() => {
    if (!showNotifications) {
      return
    }

    const newlySickProjects = projects.filter(isNewlySick)
    const noLongerSickProjects = projects.filter(isNoLongerSick)

    const newlySickTotal = newlySickProjects.length
    const noLongerSickTotal = noLongerSickProjects.length

    const sendNotifications = async () => {
      try {
        if (newlySickTotal > 0) {
          await sendSystemNotification({
            title: newlySickTitle(newlySickTotal),
            body: body(newlySickProjects)
          })
        }
        if (noLongerSickTotal > 0) {
          await sendSystemNotification({
            title: noLongerSickTitle(noLongerSickTotal),
            body: body(noLongerSickProjects)
          })
        }
      } catch (err) {
        log.error('Sending system notification failed', err)
      }
    }

    void sendNotifications()
  }, [projects, showNotifications])
}
