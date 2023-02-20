import React, { ReactElement } from 'react'
import { NotificationsSystem } from './NotificationsSystem'
import { Page } from '../../common/Page'
import { Checkbox } from '../../common/forms/Checkbox'
import {
  getEnableNewVersionCheck,
  toggleVersionCheck,
} from './NotificationsReducer'
import { Bell } from '../../common/icons/Bell'
import { Notifications } from './Notifications'
import { useAppDispatch, useAppSelector } from '../../configuration/Hooks'
import {
  getAllowAudioNotifications,
  getAudioNotificationVolume,
  setAllowAudioNotifications,
  setAudioNotificationVolume,
} from '../PersonalSettingsReducer'
import { Slider } from '../../common/forms/Slider'
import { SecondaryButton } from '../../common/forms/Button'
import testAudio from './test_audio_volume.mp3'
import { playAudio } from '../../common/AudioPlayer'
import styles from './notifications-settings.scss'
import { Note } from '../../common/icons/Note'

export function NotificationSettings(): ReactElement {
  const dispatch = useAppDispatch()
  const allowAudioNotifications = useAppSelector(getAllowAudioNotifications)
  const toggleVersionCheckFlag = useAppSelector(getEnableNewVersionCheck)
  const audioNotificationVolume = useAppSelector(getAudioNotificationVolume)

  return (
    <Page title="Notifications settings" icon={<Bell />}>
      <Checkbox
        checked={toggleVersionCheckFlag}
        onToggle={() => dispatch(toggleVersionCheck())}
      >
        Check for new Nevergreen versions
      </Checkbox>
      <Checkbox
        checked={allowAudioNotifications}
        onToggle={(newValue) => dispatch(setAllowAudioNotifications(newValue))}
      >
        Allow audio notifications
      </Checkbox>
      <Slider
        min={0}
        max={1}
        step={0.05}
        aria-valuetext={`${Math.round(audioNotificationVolume * 100)}%`}
        defaultValue={audioNotificationVolume}
        disabled={!allowAudioNotifications}
        onChange={({ target }) =>
          dispatch(setAudioNotificationVolume(parseFloat(target.value)))
        }
        button={
          <SecondaryButton
            className={styles.testVolume}
            disabled={!allowAudioNotifications}
            icon={<Note />}
            iconOnly
            onClick={() => void playAudio(testAudio, audioNotificationVolume)}
          >
            Test audio volume
          </SecondaryButton>
        }
      >
        Audio notification volume
      </Slider>
      <NotificationsSystem />
      <Notifications />
    </Page>
  )
}
