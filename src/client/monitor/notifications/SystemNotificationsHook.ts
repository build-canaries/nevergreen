import { Prognosis, Project, Projects } from '../../domain/Project'
import { getNotifications } from '../../settings/notifications/NotificationsReducer'
import { sendSystemNotification } from '../../common/SystemNotifications'
import { useEffect } from 'react'
import { FeedError, FeedErrors } from '../../domain/FeedError'
import healthyIcon from './healthy.png'
import unknownIcon from './unknown.png'
import healthyBuildingIcon from './healthy-building.png'
import sickBuildingIcon from './sick-building.png'
import sickIcon from './sick.png'
import errorIcon from './error.png'
import {
  recentlyTransitioned,
  reversePrognosisPriority,
} from './NotificationsHook'
import { getAllowSystemNotifications } from '../../settings/PersonalSettingsReducer'
import { useAppSelector } from '../../configuration/Hooks'

const systemNotificationIcons = {
  [Prognosis.healthy]: healthyIcon,
  [Prognosis.unknown]: unknownIcon,
  [Prognosis.healthyBuilding]: healthyBuildingIcon,
  [Prognosis.sickBuilding]: sickBuildingIcon,
  [Prognosis.sick]: sickIcon,
  [Prognosis.error]: errorIcon,
}

function notificationBody(
  projects: ReadonlyArray<Project | FeedError>
): string {
  return projects.map(({ description }) => description).join(', ')
}

function notificationTitle(prognosis: Prognosis, total: number): string {
  if (Prognosis.error === prognosis) {
    return total === 1 ? 'feed error!' : `${total} feed errors!`
  } else {
    return total === 1
      ? `project is ${prognosis}!`
      : `${total} projects are ${prognosis}!`
  }
}

export function useSystemNotifications(
  projects: Projects,
  feedErrors: FeedErrors
): void {
  const notifications = useAppSelector(getNotifications)
  const allowSystemNotifications = useAppSelector(getAllowSystemNotifications)

  useEffect(() => {
    if (!allowSystemNotifications) {
      return
    }

    const toCheck = [...feedErrors, ...projects]

    reversePrognosisPriority.forEach((prognosis) => {
      const allWithPrognosis = toCheck.filter(
        (project) => project.prognosis === prognosis
      )
      const toAlert = recentlyTransitioned(allWithPrognosis, prognosis)
      const notification = notifications[prognosis]
      const shouldSend =
        notification && notification.systemNotification && toAlert.length > 0

      if (shouldSend) {
        void sendSystemNotification({
          title: notificationTitle(prognosis, toAlert.length),
          body: notificationBody(toAlert),
          icon: systemNotificationIcons[prognosis],
        })
      }
    })
  }, [projects, feedErrors, notifications, allowSystemNotifications])
}
