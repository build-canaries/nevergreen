import React, {ReactElement, useState} from 'react'
import {Modal} from '../common/Modal'
import {Input} from '../common/forms/Input'
import {AddTrayHelp, CCTrayLocationsHelp} from '../tracking/AddTrayHelp'
import {TraySettingsHelp} from '../tracking/settings/TraySettingsHelp'
import {SuccessHelp} from '../success/SuccessHelp'
import {AvailableProjectsHelp} from '../tracking/projects/AvailableProjectsHelp'
import {GeneralSettingsHelp} from '../settings/GeneralSettingsHelp'
import {
  RemoteBackupCustomHelp,
  RemoteBackupGitHubHelp,
  RemoteBackupGitLabHelp,
  RemoteBackupHelp
} from '../backup/remote/RemoteBackupHelp'
import {DisplaySettingsHelp} from '../settings/DisplaySettingsHelp'
import {NotificationSettingsHelp} from '../settings/NotificationSettingsHelp'
import {MonitorHelp} from '../monitor/MonitorHelp'
import {HelpLink} from './HelpLink'
import {useShortcut} from '../common/Keyboard'
import styles from './help.scss'

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

  useShortcut(SHOW_HELP_SHORTCUT, () => setShow(true))

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
        <RemoteBackupHelp searchQuery={searchQuery} helpLink={helpLink}/>
        <RemoteBackupCustomHelp searchQuery={searchQuery} helpLink={helpLink}/>
        <RemoteBackupGitHubHelp searchQuery={searchQuery} helpLink={helpLink}/>
        <RemoteBackupGitLabHelp searchQuery={searchQuery} helpLink={helpLink}/>
      </ul>
    </Modal>
  )
}
