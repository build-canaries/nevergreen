import { useEffect } from 'react'
import { isNotBlank } from '../../common/Utils'
import { anyAudioPlaying, playAudio } from '../../common/AudioPlayer'
import { error } from '../../common/Logger'
import { getNotifications } from '../../settings/notifications/NotificationsReducer'
import { recentlyTransitioned } from './NotificationsHook'
import {
  Prognosis,
  Projects,
  sortedPrognosisByPriority,
} from '../../domain/Project'
import { FeedErrors } from '../../domain/FeedError'
import {
  getAllowAudioNotifications,
  getAudioNotificationVolume,
} from '../../settings/PersonalSettingsReducer'
import { useAppSelector } from '../../configuration/Hooks'
import { getShowPrognosis } from '../../settings/display/DisplaySettingsReducer'

export function useAudioNotifications(
  projects: Projects,
  feedErrors: FeedErrors,
  muted: boolean,
): void {
  const showPrognosis = useAppSelector(getShowPrognosis)
  const notifications = useAppSelector(getNotifications)
  const allowAudioNotifications = useAppSelector(getAllowAudioNotifications)
  const audioNotificationVolume = useAppSelector(getAudioNotificationVolume)

  useEffect(() => {
    if (!allowAudioNotifications || anyAudioPlaying() || muted) {
      return
    }

    const toCheck = [...feedErrors, ...projects]
    const sfxToPlay = sortedPrognosisByPriority(
      showPrognosis.concat(Prognosis.error),
    )
      .toReversed()
      .reduce((previousSfxToPlay, prognosis) => {
        const allWithPrognosis = toCheck.filter(
          (project) => project.prognosis === prognosis,
        )
        const notification = notifications[prognosis]
        const toAlert = recentlyTransitioned(allWithPrognosis, prognosis)
        const shouldPlay = isNotBlank(notification?.sfx) && toAlert.length > 0

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
    muted,
    showPrognosis,
  ])
}
