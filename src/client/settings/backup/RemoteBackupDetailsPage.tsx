import React, { ReactElement } from 'react'
import { Page } from '../../common/Page'
import { FullBackupSummary } from './BackupSummary'
import { LinkButton } from '../../common/LinkButton'
import { BackupLogo } from './BackupLogo'
import { useRemoteLocationContext } from './RemoteLocationPage'
import { CloudDownload } from '../../common/icons/CloudDownload'
import { CloudUpload } from '../../common/icons/CloudUpload'
import styles from './remote-backup-details-page.scss'
import { Checkbox } from '../../common/forms/Checkbox'
import { useAppDispatch } from '../../configuration/Hooks'
import { setAutomaticExport } from './RemoteLocationsReducer'

export function RemoteBackupDetailsPage(): ReactElement {
  const location = useRemoteLocationContext()
  const dispatch = useAppDispatch()

  return (
    <Page title="Remote location" icon={<BackupLogo where={location.where} />}>
      <FullBackupSummary location={location} />
      <Checkbox
        onToggle={(value) =>
          dispatch(
            setAutomaticExport({ internalId: location.internalId, value })
          )
        }
        checked={location.automaticallyExport}
        className={styles.autoExport}
      >
        Automatically export
      </Checkbox>
      <LinkButton
        to="../export"
        icon={<CloudUpload />}
        className={styles.exportButton}
      >
        Export
      </LinkButton>
      <LinkButton
        to="../import"
        icon={<CloudDownload />}
        className={styles.importButton}
      >
        Import
      </LinkButton>
    </Page>
  )
}
