import {useEffect, useState} from 'react'
import {isNotBlank} from '../../common/Utils'
import {anyAudioPlaying, playAudio} from '../../common/AudioPlayer'
import {error} from '../../common/Logger'
import {useSelector} from 'react-redux'
import {getAllowAudioNotifications, getNotifications} from '../../settings/notifications/NotificationsReducer'
import {recentlyTransitioned, reversePrognosisPriority} from './NotificationsHook'
import {Projects} from '../../domain/Project'
import {FeedErrors} from '../../domain/FeedError'

export function useAudioNotifications(projects: Projects, feedErrors: FeedErrors): void {
  const notifications = useSelector(getNotifications)
  const allowAudioNotifications = useSelector(getAllowAudioNotifications)
  const [sfxHref, setSfxHref] = useState<string>()

  useEffect(() => {
    if (!allowAudioNotifications || anyAudioPlaying()) {
      return
    }

    const toCheck = [...feedErrors, ...projects]

    reversePrognosisPriority
      .forEach((prognosis) => {
        const allWithPrognosis = toCheck.filter((project) => project.prognosis === prognosis)
        const toAlert = recentlyTransitioned(allWithPrognosis, prognosis)
        const notification = notifications[prognosis]
        const shouldPlay = notification
          && isNotBlank(notification.sfx)
          && toAlert.length > 0

        if (shouldPlay) {
          setSfxHref(notification.sfx)
        }
      })
  }, [projects, feedErrors, notifications, allowAudioNotifications])

  useEffect(() => {
    if (isNotBlank(sfxHref)) {
      try {
        void playAudio(sfxHref)
      } catch (e) {
        error('Unable to play audio', e)
      }
    }
  }, [sfxHref])
}
