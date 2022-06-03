import React, {ReactElement} from 'react'
import {Page} from '../../common/Page'
import {FullBackupSummary} from './BackupSummary'
import {LinkButton} from '../../common/LinkButton'
import {BackupLogo} from './BackupLogo'
import {useRemoteLocationContext} from './RemoteLocationPage'
import {CloudDownload} from '../../common/icons/CloudDownload'
import {CloudUpload} from '../../common/icons/CloudUpload'
import styles from './remote-backup-details-page.scss'
import {Checkbox} from '../../common/forms/Checkbox'
import {setAutomaticExport} from './BackupActionCreators'
import {useDispatch} from 'react-redux'

export function RemoteBackupDetailsPage(): ReactElement {
  const location = useRemoteLocationContext()
  const dispatch = useDispatch()

  return (
    <Page title='Remote location' icon={<BackupLogo where={location.where}/>}>
      <FullBackupSummary location={location}/>
      <Checkbox onToggle={(value) => dispatch(setAutomaticExport(location.internalId, value))}
                checked={location.automaticallyExport}
                className={styles.autoExport}>
        Automatically export
      </Checkbox>
      <LinkButton to='../export'
                  icon={<CloudUpload/>}
                  className={styles.exportButton}>
        Export
      </LinkButton>
      <LinkButton to='../import'
                  icon={<CloudDownload/>}
                  className={styles.importButton}>
        Import
      </LinkButton>
    </Page>
  )
}
