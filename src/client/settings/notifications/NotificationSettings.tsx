import React, {ReactElement} from 'react'
import {NotificationsSystem} from './NotificationsSystem'
import {Page} from '../../common/Page'
import {Checkbox} from '../../common/forms/Checkbox'
import {setAllowAudioNotifications, toggleVersionCheck} from './NotificationsActionCreators'
import {useDispatch, useSelector} from 'react-redux'
import {getAllowAudioNotifications, getToggleVersionCheck} from './NotificationsReducer'
import {Bell} from '../../common/icons/Bell'
import {Notifications} from './Notifications'

export function NotificationSettings(): ReactElement {
  const dispatch = useDispatch()
  const allowAudioNotifications = useSelector(getAllowAudioNotifications)
  const toggleVersionCheckFlag = useSelector(getToggleVersionCheck)

  return (
    <Page title="Notifications settings" icon={<Bell/>}>
      <Checkbox checked={toggleVersionCheckFlag}
                onToggle={() => dispatch(toggleVersionCheck())}>
        Check for new Nevergreen versions
      </Checkbox>
      <Checkbox checked={allowAudioNotifications}
                onToggle={(newValue) => dispatch(setAllowAudioNotifications(newValue))}>
        Allow audio notifications
      </Checkbox>
      <NotificationsSystem/>
      <Notifications/>
    </Page>
  )
}
