import React, {ReactElement, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {DangerButton, PrimaryButton, SecondaryButton} from '../../common/forms/Button'
import {iBin, iCloudDownload, iCloudUpload} from '../../common/fonts/Icons'
import styles from './remote-location.scss'
import {Duration} from '../../common/Duration'
import {Checkbox} from '../../common/forms/Checkbox'
import {RemoteLocationDescription} from './RemoteLocationDescription'
import {RemoteLocation as RemoteLocationType} from './RemoteLocationsReducer'
import {backupExported, backupImported, removeBackup, setAutomaticExport} from './RemoteLocationActionCreators'
import {send} from '../../gateways/Gateway'
import {exportConfigurationNew, fetchConfigurationNew} from '../../gateways/BackupGateway'
import {DataSource, toConfiguration, toExportableConfigurationJson} from '../../configuration/Configuration'
import {errorMessage, isBlank, isNotBlank} from '../../common/Utils'
import {ErrorMessages} from '../../common/Messages'
import {isRight} from 'fp-ts/Either'
import {configurationImported} from '../BackupActionCreators'

interface RemoteLocationProps {
  readonly location: RemoteLocationType;
}

export function RemoteLocation({location}: RemoteLocationProps): ReactElement {
  const dispatch = useDispatch()
  const configuration = useSelector(toExportableConfigurationJson)
  const [loaded, setLoaded] = useState(true)
  const [errors, setErrors] = useState<ReadonlyArray<string>>([])

  const exportNow = async () => {
    setLoaded(false)
    setErrors([])
    try {
      const res = await send(exportConfigurationNew(location, configuration))
      dispatch(backupExported(location.internalId, res.id))
    } catch (error) {
      setErrors(['Unable to export because of an error, please try again.', errorMessage(error)])
    }
    setLoaded(true)
  }

  const importNow = async () => {
    setLoaded(false)
    setErrors([])
    try {
      const res = await send(fetchConfigurationNew(location))
      const result = toConfiguration(res.configuration, DataSource.UserImport)
      if (isRight(result)) {
        dispatch(configurationImported(result.right))
        dispatch(backupImported(location.internalId))
      } else {
        setErrors(result.left)
      }
    } catch (error) {
      setErrors(['Unable to import because of an error, please try again.', errorMessage(error)])
    }
    setLoaded(true)
  }

  return (
    <li className={styles.location}>
      <div className={styles.header}>
        <RemoteLocationDescription location={location}/>
        <DangerButton onClick={() => dispatch(removeBackup(location.internalId))}
                      icon={iBin}
                      iconOnly
                      disabled={!loaded}>
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
        <PrimaryButton onClick={exportNow}
                       icon={iCloudUpload}
                       className={styles.exportButton}
                       disabled={!loaded}>
          Export now
        </PrimaryButton>
        <Checkbox onToggle={(value) => dispatch(setAutomaticExport(location.internalId, value))}
                  checked={location.automaticallyExport}
                  className={styles.spacing}
                  disabled={!loaded}>
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
        <SecondaryButton onClick={importNow}
                         icon={iCloudDownload}
                         className={styles.importButton}
                         disabled={!loaded}>
          Import now
        </SecondaryButton>
        <ErrorMessages messages={errors}/>
      </div>
    </li>
  )
}
