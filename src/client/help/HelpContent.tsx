import type { ReactElement } from 'react'
import { useState } from 'react'
import { Input } from '../common/forms/Input'
import {
  AddFeedHelp,
  CCTrayLocationsHelp,
} from '../settings/tracking/AddFeedHelp'
import { UpdateDetailsHelp } from '../settings/tracking/settings/UpdateDetailsHelp'
import { SuccessMessagesPageHelp } from '../settings/success/SuccessMessagesPageHelp'
import { AvailableProjectsHelp } from '../settings/tracking/projects/AvailableProjectsHelp'
import { BackupHelp } from '../settings/backup/BackupHelp'
import { DisplaySettingsHelp } from '../settings/display/DisplaySettingsHelp'
import { NotificationSettingsHelp } from '../settings/notifications/NotificationSettingsHelp'
import { MonitorHelp } from '../monitor/MonitorHelp'
import { HelpLink } from './HelpLink'
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
import { KeyboardShortcuts } from './KeyboardShortcuts'
import { RemoteBackupDetailsPageHelp } from '../settings/backup/RemoteBackupDetailsPageHelp'
import { OtherSettingsPageHelp } from '../settings/other/OtherSettingsPageHelp'
import { AddMessagePageHelp } from '../settings/success/AddMessagePageHelp'
import { PrognosisSettingsHelp } from '../settings/prognosis/PrognosisSettingsHelp'
import { PrognosisEditPageHelp } from '../settings/prognosis/PrognosisEditPageHelp'
import styles from './help-content.scss'

interface HelpContentProps {
  readonly initialSearchQuery?: string
}

export default function HelpContent({
  initialSearchQuery = '',
}: HelpContentProps): ReactElement {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery)

  const helpLink = (to: string) => (
    <HelpLink to={to} setSearchQuery={setSearchQuery} />
  )

  return (
    <>
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
        <SuccessMessagesPageHelp
          searchQuery={searchQuery}
          helpLink={helpLink}
        />
        <AddMessagePageHelp searchQuery={searchQuery} helpLink={helpLink} />
        <DisplaySettingsHelp searchQuery={searchQuery} helpLink={helpLink} />
        <PrognosisSettingsHelp searchQuery={searchQuery} helpLink={helpLink} />
        <PrognosisEditPageHelp searchQuery={searchQuery} helpLink={helpLink} />
        <NotificationSettingsHelp
          searchQuery={searchQuery}
          helpLink={helpLink}
        />
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
        <ExternalLink href="https://github.com/build-canaries/nevergreen/discussions">
          Ask a question on GitHub.
        </ExternalLink>
      </p>
    </>
  )
}
