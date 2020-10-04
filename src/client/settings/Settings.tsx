import React, {ReactElement} from 'react'
import {GeneralSettings} from './GeneralSettings'
import {DisplaySettings} from './DisplaySettings'
import {MiscellaneousSettings} from './MiscellaneousSettings'
import {Title} from '../common/Title'
import {NotificationSettings} from './NotificationSettings'

export function Settings(): ReactElement {
  return (
    <>
      <Title>Settings</Title>
      <GeneralSettings/>
      <DisplaySettings/>
      <NotificationSettings/>
      <MiscellaneousSettings/>
    </>
  )
}
