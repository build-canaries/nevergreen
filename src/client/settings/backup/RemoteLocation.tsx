import React, {ReactElement} from 'react'
import {useDispatch} from 'react-redux'
import {DangerButton} from '../../common/forms/Button'
import {iBin} from '../../common/fonts/Icons'
import styles from './remote-location.scss'
import {Checkbox} from '../../common/forms/Checkbox'
import {BackupDescription} from './BackupDescription'
import {RemoteLocation as RemoteLocationType} from './RemoteLocationsReducer'
import {removeBackup, setAutomaticExport} from './BackupActionCreators'
import {LinkButton} from '../../common/LinkButton'
import {routeExportRemote, routeImportRemote} from '../../Routes'

interface RemoteLocationProps {
  readonly location: RemoteLocationType;
}

export function RemoteLocation({location}: RemoteLocationProps): ReactElement {
  const dispatch = useDispatch()

  return (
    <div className={styles.location}>
      <div className={styles.header}>
        <BackupDescription location={location}/>
        <DangerButton onClick={() => dispatch(removeBackup(location.internalId))}
                      icon={iBin}
                      iconOnly>
          Remove location
        </DangerButton>
      </div>
      <div className={styles.body}>
        <LinkButton to={routeImportRemote(location.internalId)}>
          Import
        </LinkButton>
        <LinkButton to={routeExportRemote(location.internalId)}
                    className={styles.exportButton}>
          Export
        </LinkButton>
        <Checkbox onToggle={(value) => dispatch(setAutomaticExport(location.internalId, value))}
                  checked={location.automaticallyExport}
                  className={styles.autoExport}>
          Automatically export
        </Checkbox>
      </div>
    </div>
  )
}
