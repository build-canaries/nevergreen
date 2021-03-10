import React, {ReactElement, useEffect} from 'react'
import {GeneralSettings} from './general/GeneralSettings'
import {DisplaySettings} from './display/DisplaySettings'
import {Title} from '../common/Title'
import {NotificationSettings} from './notifications/NotificationSettings'
import {SuccessMessages} from './success/SuccessMessages'
import {Reset} from './reset/Reset'
import {Backup} from './backup/Backup'
import {useLocation} from 'react-router-dom'

export function Settings(): ReactElement {
  const {hash} = useLocation()

  useEffect(() => {
    const el = document.getElementById(hash.replace('#', ''))
    if (el) {
      el.scrollIntoView({behavior: 'smooth'})
    }
  }, [hash])

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
