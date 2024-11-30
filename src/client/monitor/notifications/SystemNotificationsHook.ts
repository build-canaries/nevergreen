import {
  Prognosis,
  prognosisDisplay,
  Project,
  Projects,
  sortedPrognosisByPriority,
} from '../../domain/Project'
import { getNotifications } from '../../settings/notifications/NotificationsReducer'
import { sendSystemNotification } from '../../common/SystemNotifications'
import { useEffect } from 'react'
import { FeedError, FeedErrors } from '../../domain/FeedError'
import { recentlyTransitioned } from './NotificationsHook'
import { getAllowSystemNotifications } from '../../settings/PersonalSettingsReducer'
import { useAppSelector } from '../../configuration/Hooks'
import { prognosisIconsPng } from '../../common/icons/prognosis/IconPrognosis'
import { getShowPrognosis } from '../../settings/display/DisplaySettingsReducer'

function notificationBody(
  projects: ReadonlyArray<Project | FeedError>,
): string {
  return projects.map(({ description }) => description).join(', ')
}

function notificationTitle(prognosis: Prognosis, total: number): string {
  if (Prognosis.error === prognosis) {
    return total === 1 ? 'feed error!' : `${total} feed errors!`
  } else {
    return total === 1
      ? `project is ${prognosisDisplay(prognosis)}!`
      : `${total} projects are ${prognosisDisplay(prognosis)}!`
  }
}

export function useSystemNotifications(
  projects: Projects,
  feedErrors: FeedErrors,
): void {
  const showPrognosis = useAppSelector(getShowPrognosis)
  const notifications = useAppSelector(getNotifications)
  const allowSystemNotifications = useAppSelector(getAllowSystemNotifications)

  useEffect(() => {
    if (!allowSystemNotifications) {
      return
    }

    const toCheck = [...feedErrors, ...projects]

    // reverse so the highest priority notification is sent last
    sortedPrognosisByPriority(showPrognosis.concat(Prognosis.error))
      .toReversed()
      .forEach((prognosis) => {
        const notification = notifications[prognosis]
        if (notification?.systemNotification) {
          const allWithPrognosis = toCheck.filter(
            (project) => project.prognosis === prognosis,
          )
          const toAlert = recentlyTransitioned(allWithPrognosis, prognosis)
          if (toAlert.length > 0) {
            void sendSystemNotification({
              title: notificationTitle(prognosis, toAlert.length),
              body: notificationBody(toAlert),
              icon: prognosisIconsPng[prognosis],
            })
          }
        }
      })
  }, [
    projects,
    feedErrors,
    notifications,
    allowSystemNotifications,
    showPrognosis,
  ])
}
