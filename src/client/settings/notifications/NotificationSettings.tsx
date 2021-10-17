import React, {ReactElement} from 'react'
import {NotificationsSystem} from './NotificationsSystem'
import {NotificationsAudio} from './NotificationsAudio'
import {Page} from '../../common/Page'
import {Checkbox} from '../../common/forms/Checkbox'
import {toggleVersionCheck} from '../SettingsActionCreators'
import {useDispatch, useSelector} from 'react-redux'
import {getToggleVersionCheck} from '../SettingsReducer'

export function NotificationSettings(): ReactElement {
  const dispatch = useDispatch()
  const toggleVersionCheckFlag = useSelector(getToggleVersionCheck)

  return (
    <Page title='Notifications settings'>
      <Checkbox checked={toggleVersionCheckFlag}
                onToggle={() => dispatch(toggleVersionCheck())}>
        Check for new Nevergreen versions
      </Checkbox>
      <NotificationsSystem/>
      <NotificationsAudio/>
    </Page>
  )
}
