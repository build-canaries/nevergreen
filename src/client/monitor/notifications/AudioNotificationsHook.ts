import { useEffect } from 'react'
import { isNotBlank } from '../../common/Utils'
import { anyAudioPlaying, playAudio } from '../../common/AudioPlayer'
import { error } from '../../common/Logger'
import { getNotifications } from '../../settings/notifications/NotificationsReducer'
import { recentlyTransitioned } from './NotificationsHook'
import { Prognosis, Projects } from '../../domain/Project'
import { FeedErrors } from '../../domain/FeedError'
import {
  getAllowAudioNotifications,
  getAudioNotificationVolume,
} from '../../settings/PersonalSettingsReducer'
import { useAppSelector } from '../../configuration/Hooks'

export function useAudioNotifications(
  projects: Projects,
  feedErrors: FeedErrors
): void {
  const notifications = useAppSelector(getNotifications)
  const allowAudioNotifications = useAppSelector(getAllowAudioNotifications)
  const audioNotificationVolume = useAppSelector(getAudioNotificationVolume)

  useEffect(() => {
    if (!allowAudioNotifications || anyAudioPlaying()) {
      return
    }

    const toCheck = [...feedErrors, ...projects]
    const sfxToPlay = Object.values(Prognosis)
      .reverse()
      .reduce((previousSfxToPlay, prognosis) => {
        const allWithPrognosis = toCheck.filter(
          (project) => project.prognosis === prognosis
        )
        const toAlert = recentlyTransitioned(allWithPrognosis, prognosis)
        const notification = notifications[prognosis]
        const shouldPlay =
          notification && isNotBlank(notification.sfx) && toAlert.length > 0

        return shouldPlay ? notification.sfx : previousSfxToPlay
      }, '')

    if (isNotBlank(sfxToPlay)) {
      try {
        void playAudio(sfxToPlay, audioNotificationVolume)
      } catch (e) {
        error('Unable to play audio', e)
      }
    }
  }, [
    projects,
    feedErrors,
    notifications,
    allowAudioNotifications,
    audioNotificationVolume,
  ])
}
