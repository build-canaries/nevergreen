import React, { ReactElement } from 'react'
import { NotificationsSystem } from './NotificationsSystem'
import { Page } from '../../common/Page'
import { Checkbox } from '../../common/forms/Checkbox'
import { useSelector } from 'react-redux'
import {
  getEnableNewVersionCheck,
  toggleVersionCheck,
} from './NotificationsReducer'
import { Bell } from '../../common/icons/Bell'
import { Notifications } from './Notifications'
import { useAppDispatch } from '../../configuration/Hooks'
import {
  getAllowAudioNotifications,
  setAllowAudioNotifications,
  getAudioNotificationVolume,
  setAudioNotificationVolume,
} from '../PersonalSettingsReducer'
import { Slider } from '../../common/forms/Slider'
import { SecondaryButton } from '../../common/forms/Button'
import testAudio from './test_audio_volume.mp3'

export function NotificationSettings(): ReactElement {
  const dispatch = useAppDispatch()
  const allowAudioNotifications = useSelector(getAllowAudioNotifications)
  const toggleVersionCheckFlag = useSelector(getEnableNewVersionCheck)
  const audioNotificationVolume = useSelector(getAudioNotificationVolume)

  const testAudioVolume = async () => {
    const audio = new Audio(testAudio)
    audio.volume = audioNotificationVolume

    await audio.play()
  }

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
        disabled={!allowAudioNotifications}
        onChange={({ target }) =>
          dispatch(setAudioNotificationVolume(parseInt(target.value) / 100))
        }
      >
        Audio notification volume
      </Slider>
      <SecondaryButton
        disabled={!allowAudioNotifications}
        icon={<Bell />}
        onClick={() => void testAudioVolume()}
      >
        Test audio volume
      </SecondaryButton>
      <NotificationsSystem />
      <Notifications />
    </Page>
  )
}
