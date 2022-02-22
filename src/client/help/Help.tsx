import React, {ReactElement, useState} from 'react'
import {Modal} from '../common/Modal'
import {Input} from '../common/forms/Input'
import {AddFeedHelp, CCTrayLocationsHelp} from '../settings/tracking/AddFeedHelp'
import {UpdateDetailsHelp} from '../settings/tracking/settings/UpdateDetailsHelp'
import {SuccessHelp} from '../settings/success/SuccessHelp'
import {AvailableProjectsHelp} from '../settings/tracking/projects/AvailableProjectsHelp'
import {BackupHelp} from '../settings/backup/BackupHelp'
import {DisplaySettingsHelp} from '../settings/display/DisplaySettingsHelp'
import {NotificationSettingsHelp} from '../settings/notifications/NotificationSettingsHelp'
import {MonitorHelp} from '../monitor/MonitorHelp'
import {HelpLink} from './HelpLink'
import {useShortcut} from '../common/Keyboard'
import styles from './help.scss'
import {ExternalLink} from '../common/ExternalLink'
import {TrackingPageHelp} from '../settings/tracking/TrackingPageHelp'
import {UpdateConnectionHelp} from '../settings/tracking/settings/UpdateConnectionHelp'
import {ImportLocalHelp} from '../settings/backup/import/ImportLocalHelp'
import {ImportRemoteHelp} from '../settings/backup/import/ImportRemoteHelp'
import {ExportLocalHelp} from '../settings/backup/export/ExportLocalHelp'
import {ExportRemoteHelp} from '../settings/backup/export/ExportRemoteHelp'
import {
  AddBackupHelp,
  RemoteBackupCustomHelp,
  RemoteBackupGitHubHelp,
  RemoteBackupGitLabHelp
} from '../settings/backup/AddBackupHelp'
import {keyboardShortcutKeyword, KeyboardShortcuts} from './KeyboardShortcuts'

interface HelpProps {
  readonly initiallyShow?: boolean;
}

export const showHelpShortcut = 'h'
export const showKeyboardShortcutsShortcut = '?'

export function withHelpLink(setSearchQuery: (q: string) => void) {
  // eslint-disable-next-line react/display-name
  return (to: string): ReactElement => <HelpLink to={to} setSearchQuery={setSearchQuery}/>
}

const QUESTION_URL = 'https://github.com/build-canaries/nevergreen/issues/new?labels=question&template=Question.md'

export function Help({initiallyShow}: HelpProps): ReactElement {
  const [show, setShow] = useState(initiallyShow || false)
  const [searchQuery, setSearchQuery] = useState('')

  useShortcut(showHelpShortcut, () => setShow(true))
  useShortcut(showKeyboardShortcutsShortcut, () => {
    setSearchQuery(keyboardShortcutKeyword)
    setShow(true)
  })

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
        Search
      </Input>
      <ul className={styles.articles}>
        <MonitorHelp searchQuery={searchQuery} helpLink={helpLink}/>
        <TrackingPageHelp searchQuery={searchQuery} helpLink={helpLink}/>
        <AddFeedHelp searchQuery={searchQuery} helpLink={helpLink}/>
        <CCTrayLocationsHelp searchQuery={searchQuery} helpLink={helpLink}/>
        <AvailableProjectsHelp searchQuery={searchQuery} helpLink={helpLink}/>
        <UpdateDetailsHelp searchQuery={searchQuery} helpLink={helpLink}/>
        <UpdateConnectionHelp searchQuery={searchQuery} helpLink={helpLink}/>
        <SuccessHelp searchQuery={searchQuery} helpLink={helpLink}/>
        <DisplaySettingsHelp searchQuery={searchQuery} helpLink={helpLink}/>
        <NotificationSettingsHelp searchQuery={searchQuery} helpLink={helpLink}/>
        <BackupHelp searchQuery={searchQuery} helpLink={helpLink}/>
        <AddBackupHelp searchQuery={searchQuery} helpLink={helpLink}/>
        <ImportLocalHelp searchQuery={searchQuery} helpLink={helpLink}/>
        <ImportRemoteHelp searchQuery={searchQuery} helpLink={helpLink}/>
        <ExportLocalHelp searchQuery={searchQuery} helpLink={helpLink}/>
        <ExportRemoteHelp searchQuery={searchQuery} helpLink={helpLink}/>
        <RemoteBackupCustomHelp searchQuery={searchQuery} helpLink={helpLink}/>
        <RemoteBackupGitHubHelp searchQuery={searchQuery} helpLink={helpLink}/>
        <RemoteBackupGitLabHelp searchQuery={searchQuery} helpLink={helpLink}/>
        <KeyboardShortcuts searchQuery={searchQuery} helpLink={helpLink}/>
      </ul>
      <p className={styles.notFound}>
        No matching articles found, please try a different keyword.
        Can&apos;t find the help you need? <ExternalLink href={QUESTION_URL}>Ask a question on
        GitHub.</ExternalLink>
      </p>
    </Modal>
  )
}
