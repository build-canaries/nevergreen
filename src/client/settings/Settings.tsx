import React, {ReactElement, useEffect} from 'react'
import {GeneralSettings} from './general/GeneralSettings'
import {DisplaySettings} from './display/DisplaySettings'
import {Title} from '../common/Title'
import {NotificationSettings} from './notifications/NotificationSettings'
import {SuccessMessages} from './success/SuccessMessages'
import {Reset} from './reset/Reset'
import {Backup} from './backup/Backup'
import {useLocation} from 'react-router-dom'
import {isBlank} from '../common/Utils'

export function Settings(): ReactElement {
  const {hash} = useLocation()

  useEffect(() => {
    const hashRemoved = hash.replace('#', '')
    if (!isBlank(hashRemoved)) {
      const el = document.getElementById(hashRemoved)
      if (el) {
        el.scrollIntoView()
      }
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
