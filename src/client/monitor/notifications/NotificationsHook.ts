import {Prognosis, prognosisDisplay, Project, Projects} from '../../domain/Project'
import {useSelector} from 'react-redux'
import {
  getAllowAudioNotifications,
  getAllowSystemNotifications,
  getNotifications
} from '../../settings/notifications/NotificationsReducer'
import {sendSystemNotification} from '../../common/SystemNotifications'
import {useEffect, useRef, useState} from 'react'
import {isNotBlank} from '../../common/Utils'
import {anyAudioPlaying, playAudio} from '../../common/AudioPlayer'
import {FeedError, FeedErrors} from '../../domain/FeedError'
import {error} from '../../common/Logger'
import healthyIcon from './healthy.png'
import unknownIcon from './unknown.png'
import healthyBuildingIcon from './healthy-building.png'
import sickBuildingIcon from './sick-building.png'
import sickIcon from './sick.png'
import errorIcon from './error.png'
import groupBy from 'lodash/groupBy'
import capitalize from 'lodash/capitalize'
import {notificationIcons} from '../../settings/notifications/icons/NotificationIcon'
import {UpdateBrowserTitleHookProps, useUpdateBrowserTitle} from '../../common/BrowserTitleHook'

const systemNotificationIcons = {
  [Prognosis.healthy]: healthyIcon,
  [Prognosis.unknown]: unknownIcon,
  [Prognosis.healthyBuilding]: healthyBuildingIcon,
  [Prognosis.sickBuilding]: sickBuildingIcon,
  [Prognosis.sick]: sickIcon,
  [Prognosis.error]: errorIcon
}

const prognosisPriority = [
  Prognosis.healthy,
  Prognosis.unknown,
  Prognosis.healthyBuilding,
  Prognosis.sickBuilding,
  Prognosis.sick,
  Prognosis.error
]

function justTransitionedTo(project: Project | FeedError, prognosis: Prognosis): boolean {
  return project.prognosis === prognosis && project.previousPrognosis !== prognosis
}

function body(projects: ReadonlyArray<Project | FeedError>): string {
  return projects
    .map(({description}) => description)
    .join(', ')
}

function title(prognosis: Prognosis, total: number): string {
  if (Prognosis.error === prognosis) {
    return total === 1
      ? 'feed error!'
      : `${total} feed errors!`
  } else {
    return total === 1
      ? `project is ${prognosis}!`
      : `${total} projects are ${prognosis}!`
  }
}

export function useNotifications(projects: Projects, feedErrors: FeedErrors): string | undefined {
  const notifications = useSelector(getNotifications)
  const allowSystemNotifications = useSelector(getAllowSystemNotifications)
  const allowAudioNotifications = useSelector(getAllowAudioNotifications)
  const sfxSrc = useRef<string>()
  const [browserTitle, setBrowserTitle] = useState<UpdateBrowserTitleHookProps>({title: 'Monitor'})

  useUpdateBrowserTitle(browserTitle)

  useEffect(() => {
    sfxSrc.current = undefined
    const all = [...feedErrors, ...projects]

    Object.entries(groupBy(all, 'prognosis'))
      .sort(([aPrognosis], [bPrognosis]) => {
        return prognosisPriority.indexOf(aPrognosis as Prognosis) - prognosisPriority.indexOf(bPrognosis as Prognosis)
      })
      .forEach(([key, toCheck]) => {
        const prognosis = key as Prognosis
        const notification = notifications[prognosis]
        const projectsToAlert = toCheck.filter((project) => justTransitionedTo(project, prognosis))

        if (projectsToAlert.length > 0) {
          if (notification) {
            const shouldSendSystemNotification = allowSystemNotifications
              && notification.systemNotification

            const shouldPlayAudio = allowAudioNotifications
              && !anyAudioPlaying()
              && isNotBlank(notification.sfx)

            if (shouldSendSystemNotification) {
              void sendSystemNotification({
                title: title(prognosis, projectsToAlert.length),
                body: body(projectsToAlert),
                icon: systemNotificationIcons[prognosis]
              })
            }

            if (shouldPlayAudio) {
              sfxSrc.current = notification.sfx
            }
          }
        }

        setBrowserTitle({
          title: capitalize(prognosisDisplay(prognosis)),
          faviconHref: notificationIcons[prognosis]
        })
      })

    if (sfxSrc.current) {
      try {
        void playAudio(sfxSrc.current)
      } catch (e) {
        error('Unable to play audio notification', e)
      }
    }
  }, [projects, feedErrors, notifications, allowSystemNotifications, allowAudioNotifications])

  return sfxSrc.current
}
