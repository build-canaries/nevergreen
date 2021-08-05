import React, {ReactElement} from 'react'
import {useSelector} from 'react-redux'
import styles from './backup-page.scss'
import {RemoteBackupCard} from './RemoteBackupCard'
import {getBackupLocations} from './RemoteLocationsReducer'
import {Locally} from './Locally'
import {AddButton} from '../../common/LinkButton'
import {ROUTE_BACKUP_ADD} from '../../Routes'
import {Page} from '../../common/Page'

export function BackupPage(): ReactElement {
  const backupLocations = useSelector(getBackupLocations)

  return (
    <Page title='Backup settings'>
      <AddButton to={ROUTE_BACKUP_ADD}>Add remote backup</AddButton>
      <ul className={styles.container}
          id='backup'>
        <li>
          <Locally/>
        </li>
        {Object.values(backupLocations).map((backupLocation, index) => {
          return (
            <li key={backupLocation.internalId}>
              <RemoteBackupCard location={backupLocation}
                                index={index + 1}/>
            </li>
          )
        })}
      </ul>
    </Page>
  )
}
