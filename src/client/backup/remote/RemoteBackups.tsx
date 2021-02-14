import React, {ReactElement, useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {Container} from '../../common/Container'
import {SecondaryButton} from '../../common/forms/Button'
import {iPlus} from '../../common/fonts/Icons'
import styles from './remote-backups.scss'
import {Modal} from '../../common/Modal'
import {AddBackup} from './AddBackup'
import {RemoteLocation} from './RemoteLocation'
import {getBackupLocations} from './RemoteLocationsReducer'

export function RemoteBackups(): ReactElement {
  const backupLocations = useSelector(getBackupLocations)
  const [adding, setAdding] = useState(false)

  useEffect(() => {
    setAdding(false)
  }, [backupLocations])

  return (
    <>
      <Modal show={adding}
             close={() => setAdding(false)}
             title='Add location'
             shouldCloseOnOverlayClick={false}
             shouldCloseOnEsc={false}>
        <AddBackup onCancel={() => setAdding(false)}/>
      </Modal>
      <Container title='Remote backups'>
        <ul className={styles.container}>
          {Object.values(backupLocations).map((backupLocation) => {
            return (
              <li key={backupLocation.internalId}>
                <RemoteLocation location={backupLocation}/>
              </li>
            )
          })}
          <li className={styles.addNew}>
            <SecondaryButton className={styles.addNewButton}
                             icon={iPlus}
                             onClick={() => setAdding(true)}>
              Add location
            </SecondaryButton>
          </li>
        </ul>
      </Container>
    </>
  )
}
