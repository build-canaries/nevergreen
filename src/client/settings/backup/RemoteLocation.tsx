import React, {ReactElement} from 'react'
import {useDispatch} from 'react-redux'
import {DangerButton} from '../../common/forms/Button'
import {iBin} from '../../common/fonts/Icons'
import styles from './remote-location.scss'
import {Duration} from '../../common/Duration'
import {Checkbox} from '../../common/forms/Checkbox'
import {BackupDescription} from './BackupDescription'
import {RemoteLocation as RemoteLocationType} from './RemoteLocationsReducer'
import {removeBackup, setAutomaticExport} from './BackupActionCreators'
import {isBlank, isNotBlank} from '../../common/Utils'
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
        <div>
          {isBlank(location.exportTimestamp) && 'Never exported'}
          {isNotBlank(location.exportTimestamp) && (
            <Duration prefix='Last successful export'
                      suffix='ago'
                      timestamp={location.exportTimestamp}/>
          )}
        </div>
        <LinkButton to={routeExportRemote(location.internalId)}
                    className={styles.exportButton}>
          Export
        </LinkButton>
        <Checkbox onToggle={(value) => dispatch(setAutomaticExport(location.internalId, value))}
                  checked={location.automaticallyExport}
                  className={styles.spacing}>
          Automatically export
        </Checkbox>
        <div className={styles.spacing}>
          {isBlank(location.importTimestamp) && 'Never imported'}
          {isNotBlank(location.importTimestamp) && (
            <Duration prefix='Last successful import'
                      suffix='ago'
                      timestamp={location.importTimestamp}/>
          )}
        </div>
        <LinkButton to={routeImportRemote(location.internalId)}
                    className={styles.importButton}>
          Import
        </LinkButton>
      </div>
    </div>
  )
}
