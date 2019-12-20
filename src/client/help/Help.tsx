import React, {useEffect, useState} from 'react'
import Mousetrap from 'mousetrap'
import {Modal} from '../common/Modal'
import {Input} from '../common/forms/Input'
import {AddTrayHelp, CCTrayLocationsHelp} from '../tracking/AddTrayHelp'
import {TraySettingsHelp} from '../tracking/settings/TraySettingsHelp'
import {SuccessHelp} from '../success/SuccessHelp'
import {AvailableProjectsHelp} from '../tracking/projects/AvailableProjectsHelp'
import {GeneralSettingsHelp} from '../settings/GeneralSettingsHelp'
import styles from './help.scss'
import {ExportGitHubHelp} from '../backup/export/externally/ExportGitHubHelp'
import {ExportGitLabHelp} from '../backup/export/externally/ExportGitLabHelp'
import {ImportGitHubHelp} from '../backup/import/externally/ImportGitHubHelp'
import {ImportGitLabHelp} from '../backup/import/externally/ImportGitLabHelp'
import {DisplaySettingsHelp} from '../settings/DisplaySettingsHelp'
import {NotificationSettingsHelp} from '../settings/NotificationSettingsHelp'

interface HelpProps {
  readonly initiallyShow?: boolean;
}

export const SHOW_HELP_SHORTCUT = 'h'

export function Help({initiallyShow}: HelpProps) {
  const [show, setShow] = useState(initiallyShow || false)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    Mousetrap.bind(SHOW_HELP_SHORTCUT, () => setShow(true))
    return () => {
      Mousetrap.unbind(SHOW_HELP_SHORTCUT)
    }
  }, [])

  return (
    <Modal show={show}
           close={() => {
             setShow(false)
             setSearchQuery('')
           }}
           title='Help'
           className={styles.modal}>
      <Input placeholder='by keyword'
             value={searchQuery}
             onChange={({target}) => setSearchQuery(target.value)}>
        <span>search</span>
      </Input>
      <ul className={styles.articles}>
        <AddTrayHelp searchQuery={searchQuery}/>
        <CCTrayLocationsHelp searchQuery={searchQuery}/>
        <AvailableProjectsHelp searchQuery={searchQuery}/>
        <TraySettingsHelp searchQuery={searchQuery}/>
        <SuccessHelp searchQuery={searchQuery}/>
        <GeneralSettingsHelp searchQuery={searchQuery}/>
        <DisplaySettingsHelp searchQuery={searchQuery}/>
        <NotificationSettingsHelp searchQuery={searchQuery}/>
        <ImportGitHubHelp searchQuery={searchQuery}/>
        <ImportGitLabHelp searchQuery={searchQuery}/>
        <ExportGitHubHelp searchQuery={searchQuery}/>
        <ExportGitLabHelp searchQuery={searchQuery}/>
      </ul>
    </Modal>
  )
}
