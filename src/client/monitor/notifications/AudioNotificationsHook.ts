import { useEffect } from 'react'
import { isNotBlank } from '../../common/Utils'
import { anyAudioPlaying, playAudio } from '../../common/AudioPlayer'
import { error } from '../../common/Logger'
import { recentlyTransitioned } from './NotificationsHook'
import { Projects, sortedPrognosisByPriority } from '../../domain/Project'
import { FeedErrors } from '../../domain/FeedError'
import {
  getAllowAudioNotifications,
  getAudioNotificationVolume,
} from '../../settings/PersonalSettingsReducer'
import { useAppSelector } from '../../configuration/Hooks'
import {
  getAllPrognosisSettings,
  getAudioNotificationPrognosis,
} from '../../settings/prognosis/PrognosisSettingsReducer'

export function useAudioNotifications(
  projects: Projects,
  feedErrors: FeedErrors,
  muted: boolean,
): void {
  const audioNotificationPrognosis = useAppSelector(
    getAudioNotificationPrognosis,
  )
  const prognosisSettings = useAppSelector(getAllPrognosisSettings)
  const allowAudioNotifications = useAppSelector(getAllowAudioNotifications)
  const audioNotificationVolume = useAppSelector(getAudioNotificationVolume)

  useEffect(() => {
    if (!allowAudioNotifications || anyAudioPlaying() || muted) {
      return
    }

    const toCheck = [...feedErrors, ...projects]
    const sfxToPlay = sortedPrognosisByPriority(audioNotificationPrognosis)
      .toReversed()
      .reduce((previousSfxToPlay, prognosis) => {
        const allWithPrognosis = toCheck.filter(
          (project) => project.prognosis === prognosis,
        )
        const notification = prognosisSettings[prognosis]
        const toAlert = recentlyTransitioned(allWithPrognosis, prognosis)
        return toAlert.length > 0 ? notification.sfx : previousSfxToPlay
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
    prognosisSettings,
    allowAudioNotifications,
    audioNotificationVolume,
    muted,
    audioNotificationPrognosis,
  ])
}
