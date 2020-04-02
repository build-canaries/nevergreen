import {getShowSystemNotifications} from '../settings/SettingsReducer'
import {isSick, Project} from '../domain/Project'
import {sendSystemNotification} from '../common/SystemNotifications'
import * as log from '../common/Logger'
import {useSelector} from 'react-redux'
import {useEffect, useRef} from 'react'

function body(projects: Project[]): string {
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

export function useProjectNotifications(projects: ReadonlyArray<Project>) {
  const previousProjectsRef = useRef(projects)
  const showNotifications = useSelector(getShowSystemNotifications)

  useEffect(() => {
    if (showNotifications) {
      const previousProjects = previousProjectsRef.current

      const previouslySick = previousProjects.filter(isSick)
      const currentlySick = projects.filter(isSick)

      const previousIds = previouslySick.map((project) => project.projectId)
      const currentIds = currentlySick.map((project) => project.projectId)

      const newlySick = currentlySick.filter((p) => !previousIds.includes(p.projectId))
      const noLongerSick = previouslySick.filter((p) => !currentIds.includes(p.projectId))

      const newlySickTotal = newlySick.length
      const noLongerSickTotal = noLongerSick.length

      const sendNotifications = async () => {
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

      sendNotifications()
    }
  }, [projects, showNotifications])

  useEffect(() => {
    previousProjectsRef.current = projects
  })
}
