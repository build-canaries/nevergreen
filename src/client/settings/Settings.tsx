import React from 'react'
import {GeneralSettings} from './GeneralSettings'
import {DisplaySettings} from './DisplaySettings'
import {Title} from '../common/Title'
import {NotificationSettings} from './NotificationSettings'

export function Settings() {
  return (
    <>
      <Title>Settings</Title>
      <GeneralSettings/>
      <DisplaySettings/>
      <NotificationSettings/>
    </>
  )
}
