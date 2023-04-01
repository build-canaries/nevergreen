import type { ReactElement } from 'react'
import { useState } from 'react'
import { Modal } from '../common/Modal'
import { Input } from '../common/forms/Input'
import {
  AddFeedHelp,
  CCTrayLocationsHelp,
} from '../settings/tracking/AddFeedHelp'
import { UpdateDetailsHelp } from '../settings/tracking/settings/UpdateDetailsHelp'
import { SuccessHelp } from '../settings/success/SuccessHelp'
import { AvailableProjectsHelp } from '../settings/tracking/projects/AvailableProjectsHelp'
import { BackupHelp } from '../settings/backup/BackupHelp'
import { DisplaySettingsHelp } from '../settings/display/DisplaySettingsHelp'
import { NotificationSettingsHelp } from '../settings/notifications/NotificationSettingsHelp'
import { MonitorHelp } from '../monitor/MonitorHelp'
import { HelpLink } from './HelpLink'
import { useShortcut } from '../common/Keyboard'
import { ExternalLink } from '../common/ExternalLink'
import { TrackingPageHelp } from '../settings/tracking/TrackingPageHelp'
import { UpdateConnectionHelp } from '../settings/tracking/settings/UpdateConnectionHelp'
import { ImportLocalHelp } from '../settings/backup/import/ImportLocalHelp'
import { ImportRemoteHelp } from '../settings/backup/import/ImportRemoteHelp'
import { ExportLocalHelp } from '../settings/backup/export/ExportLocalHelp'
import { ExportRemoteHelp } from '../settings/backup/export/ExportRemoteHelp'
import {
  AddBackupHelp,
  RemoteBackupCustomHelp,
  RemoteBackupGitHubHelp,
  RemoteBackupGitLabHelp,
} from '../settings/backup/AddBackupHelp'
import {
  KEYBOARD_SHORTCUT_KEYWORD,
  KeyboardShortcuts,
} from './KeyboardShortcuts'
import { RemoteBackupDetailsPageHelp } from '../settings/backup/RemoteBackupDetailsPageHelp'
import { AddNotificationHelp } from '../settings/notifications/AddNotificationHelp'
import styles from './help.scss'
import { OtherSettingsPageHelp } from '../settings/other/OtherSettingsPageHelp'
import { ChangeColoursPageHelp } from '../settings/colours/ChangeColoursPageHelp'

export const SHOW_HELP_SHORTCUT = 'h'
export const SHOW_KEYBOARD_SHORTCUTS_SHORTCUT = '?'

const questionUrl =
  'https://github.com/build-canaries/nevergreen/issues/new?labels=question&template=Question.md'

export function Help(): ReactElement {
  const [show, setShow] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  useShortcut(SHOW_HELP_SHORTCUT, () => setShow(true))
  useShortcut(SHOW_KEYBOARD_SHORTCUTS_SHORTCUT, () => {
    setSearchQuery(KEYBOARD_SHORTCUT_KEYWORD)
    setShow(true)
  })

  const helpLink = (to: string) => (
    <HelpLink to={to} setSearchQuery={setSearchQuery} />
  )

  return (
    <Modal
      show={show}
      close={() => {
        setShow(false)
        setSearchQuery('')
      }}
      title="Help"
      className={styles.modal}
    >
      <Input
        placeholder="by keyword"
        value={searchQuery}
        onChange={({ target }) => setSearchQuery(target.value)}
      >
        Search
      </Input>
      <ul className={styles.articles}>
        <MonitorHelp searchQuery={searchQuery} helpLink={helpLink} />
        <TrackingPageHelp searchQuery={searchQuery} helpLink={helpLink} />
        <AddFeedHelp searchQuery={searchQuery} helpLink={helpLink} />
        <CCTrayLocationsHelp searchQuery={searchQuery} helpLink={helpLink} />
        <AvailableProjectsHelp searchQuery={searchQuery} helpLink={helpLink} />
        <UpdateDetailsHelp searchQuery={searchQuery} helpLink={helpLink} />
        <UpdateConnectionHelp searchQuery={searchQuery} helpLink={helpLink} />
        <SuccessHelp searchQuery={searchQuery} helpLink={helpLink} />
        <DisplaySettingsHelp searchQuery={searchQuery} helpLink={helpLink} />
        <ChangeColoursPageHelp searchQuery={searchQuery} helpLink={helpLink} />
        <NotificationSettingsHelp
          searchQuery={searchQuery}
          helpLink={helpLink}
        />
        <AddNotificationHelp searchQuery={searchQuery} helpLink={helpLink} />
        <BackupHelp searchQuery={searchQuery} helpLink={helpLink} />
        <RemoteBackupDetailsPageHelp
          searchQuery={searchQuery}
          helpLink={helpLink}
        />
        <AddBackupHelp searchQuery={searchQuery} helpLink={helpLink} />
        <ImportLocalHelp searchQuery={searchQuery} helpLink={helpLink} />
        <ImportRemoteHelp searchQuery={searchQuery} helpLink={helpLink} />
        <ExportLocalHelp searchQuery={searchQuery} helpLink={helpLink} />
        <ExportRemoteHelp searchQuery={searchQuery} helpLink={helpLink} />
        <RemoteBackupCustomHelp searchQuery={searchQuery} helpLink={helpLink} />
        <RemoteBackupGitHubHelp searchQuery={searchQuery} helpLink={helpLink} />
        <RemoteBackupGitLabHelp searchQuery={searchQuery} helpLink={helpLink} />
        <OtherSettingsPageHelp searchQuery={searchQuery} helpLink={helpLink} />
        <KeyboardShortcuts searchQuery={searchQuery} helpLink={helpLink} />
      </ul>
      <p className={styles.notFound}>
        No matching articles found, please try a different keyword. Can&apos;t
        find the help you need?{' '}
        <ExternalLink href={questionUrl}>
          Ask a question on GitHub.
        </ExternalLink>
      </p>
    </Modal>
  )
}
