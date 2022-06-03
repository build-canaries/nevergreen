import React, {ReactElement} from 'react'
import {useSelector} from 'react-redux'
import styles from './backup-page.scss'
import {RemoteBackupCard} from './RemoteBackupCard'
import {getBackupLocations} from './RemoteLocationsReducer'
import {LocalBackupCard} from './LocalBackupCard'
import {AddButton} from '../../common/LinkButton'
import {Page} from '../../common/Page'
import {FloppyDisk} from '../../common/icons/FloppyDisk'

export function BackupPage(): ReactElement {
  const backupLocations = useSelector(getBackupLocations)

  return (
    <Page title='Backup settings' icon={<FloppyDisk/>}>
      <LocalBackupCard/>
      <AddButton className={styles.addButton}>
        Add remote location
      </AddButton>
      <ul className={styles.container}>
        {Object.values(backupLocations).map((backupLocation) => {
          return (
            <li key={backupLocation.internalId}>
              <RemoteBackupCard location={backupLocation}/>
            </li>
          )
        })}
      </ul>
    </Page>
  )
}
