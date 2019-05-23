import React from 'react'
import {GeneralSettings, GeneralSettingsProps} from './GeneralSettings'
import {DisplaySettings, DisplaySettingsProps} from './DisplaySettings'
import {Title} from '../common/Title'
import {NotificationSettings, NotificationSettingsProps} from './NotificationSettings'

type SettingsProps = GeneralSettingsProps & DisplaySettingsProps & NotificationSettingsProps

export function Settings(props: SettingsProps) {
  return (
    <>
      <Title>Settings</Title>
      <GeneralSettings {...props}/>
      <DisplaySettings {...props}/>
      <NotificationSettings {...props}/>
    </>
  )
}
