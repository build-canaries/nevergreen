import React, {ReactElement} from 'react'
import {useSelector} from 'react-redux'
import {Container} from '../../common/Container'
import styles from './backup.scss'
import {RemoteLocation} from './RemoteLocation'
import {getBackupLocations} from './RemoteLocationsReducer'
import {Locally} from './Locally'
import {LinkButton} from '../../common/LinkButton'
import {ROUTE_BACKUP_ADD} from '../../Routes'

export function Backup(): ReactElement {
  const backupLocations = useSelector(getBackupLocations)

  return (
    <Container title='Backup'>
      <ul className={styles.container}
          id='backup'>
        <li>
          <Locally/>
        </li>
        {Object.values(backupLocations).map((backupLocation) => {
          return (
            <li key={backupLocation.internalId}>
              <RemoteLocation location={backupLocation}/>
            </li>
          )
        })}
        <li className={styles.addNew}>
          <LinkButton to={ROUTE_BACKUP_ADD}
                      className={styles.addNewButton}>
            Add remote backup
          </LinkButton>
        </li>
      </ul>
    </Container>
  )
}
