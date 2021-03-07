import React, {ReactElement} from 'react'
import {GeneralSettings} from './general/GeneralSettings'
import {DisplaySettings} from './display/DisplaySettings'
import {Title} from '../common/Title'
import {NotificationSettings} from './notifications/NotificationSettings'
import {SuccessMessages} from './success/SuccessMessages'
import {Reset} from './reset/Reset'
import {Backup} from './backup/Backup'

export function Settings(): ReactElement {
  return (
    <>
      <Title>Settings</Title>
      <GeneralSettings/>
      <DisplaySettings/>
      <NotificationSettings/>
      <SuccessMessages/>
      <Backup/>
      <Reset/>
    </>
  )
}
