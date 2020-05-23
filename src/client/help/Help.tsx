import React, {ReactElement, useEffect, useState} from 'react'
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
import {MonitorHelp} from '../monitor/MonitorHelp'
import {HelpLink} from './HelpLink'

interface HelpProps {
  readonly initiallyShow?: boolean;
}

export const SHOW_HELP_SHORTCUT = 'h'

export function withHelpLink(setSearchQuery: (q: string) => void) {
  // eslint-disable-next-line react/display-name
  return (to: string): ReactElement => <HelpLink to={to} setSearchQuery={setSearchQuery}/>
}

export function Help({initiallyShow}: HelpProps): ReactElement {
  const [show, setShow] = useState(initiallyShow || false)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    Mousetrap.bind(SHOW_HELP_SHORTCUT, () => setShow(true))
    return () => {
      Mousetrap.unbind(SHOW_HELP_SHORTCUT)
    }
  }, [])

  const helpLink = withHelpLink(setSearchQuery)

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
        <MonitorHelp searchQuery={searchQuery} helpLink={helpLink}/>
        <AddTrayHelp searchQuery={searchQuery} helpLink={helpLink}/>
        <CCTrayLocationsHelp searchQuery={searchQuery} helpLink={helpLink}/>
        <AvailableProjectsHelp searchQuery={searchQuery} helpLink={helpLink}/>
        <TraySettingsHelp searchQuery={searchQuery} helpLink={helpLink}/>
        <SuccessHelp searchQuery={searchQuery} helpLink={helpLink}/>
        <GeneralSettingsHelp searchQuery={searchQuery} helpLink={helpLink}/>
        <DisplaySettingsHelp searchQuery={searchQuery} helpLink={helpLink}/>
        <NotificationSettingsHelp searchQuery={searchQuery} helpLink={helpLink}/>
        <ImportGitHubHelp searchQuery={searchQuery} helpLink={helpLink}/>
        <ImportGitLabHelp searchQuery={searchQuery} helpLink={helpLink}/>
        <ExportGitHubHelp searchQuery={searchQuery} helpLink={helpLink}/>
        <ExportGitLabHelp searchQuery={searchQuery} helpLink={helpLink}/>
      </ul>
    </Modal>
  )
}
