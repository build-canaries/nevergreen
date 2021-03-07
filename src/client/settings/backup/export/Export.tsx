import React, {ReactElement, useCallback, useState} from 'react'
import styles from './export.scss'
import {PrimaryButton, SecondaryButton} from '../../../common/forms/Button'
import {iCloudUpload, iFloppyDisk, iPaste} from '../../../common/fonts/Icons'
import {useClipboard} from './ClipboardHook'
import {useDispatch, useSelector} from 'react-redux'
import {toExportableConfigurationJson} from '../../../configuration/Configuration'
import {TextArea} from '../TextArea'
import {TimedMessage} from '../TimedMessage'
import {MessagesType} from '../../../common/Messages'
import format from 'date-fns/format'
import {useParams} from 'react-router-dom'
import {getBackupLocation} from '../RemoteLocationsReducer'
import {send} from '../../../gateways/Gateway'
import {exportConfigurationNew} from '../../../gateways/BackupGateway'
import {backupExported} from '../BackupActionCreators'
import {errorMessage} from '../../../common/Utils'
import {Title} from '../../../common/Title'
import {BackupDescription} from '../BackupDescription'

function saveFile(configuration: string) {
  const timestamp = format(new Date(), 'yyyyMMddHHmmssSSS')
  const file = new Blob([configuration], {type: 'application/json'})
  const a = document.createElement('a')

  a.href = URL.createObjectURL(file)
  a.download = `nevergreen-configuration-backup-${timestamp}.json`
  a.click()

  URL.revokeObjectURL(a.href)
}

export function Export(): ReactElement {
  const dispatch = useDispatch()
  const {internalId} = useParams<{ internalId: string }>()
  const location = useSelector(getBackupLocation(internalId))
  const configuration = useSelector(toExportableConfigurationJson)
  const [loaded, setLoaded] = useState(true)

  const [message, setMessage] = useState<ReadonlyArray<string>>([])
  const [messageType, setMessageType] = useState(MessagesType.INFO)

  const setError = (message: ReadonlyArray<string>) => {
    setMessage(message)
    setMessageType(MessagesType.ERROR)
  }

  const setInfo = (message: ReadonlyArray<string>) => {
    setMessage(message)
    setMessageType(MessagesType.INFO)
  }

  const copySuccess = useCallback(() => setInfo(['Successfully copied to clipboard']), [])
  const copyError = useCallback(() => setError(['Unable to copy, please manually copy']), [])

  const autoCopySupported = useClipboard('#copy-to-clipboard', copySuccess, copyError)

  const saveLocally = () => {
    try {
      saveFile(configuration)
    } catch (e) {
      setError(['Unable to save because of an error, please copy and manually save', errorMessage(e)])
    }
  }

  const exportNow = async () => {
    setLoaded(false)
    setMessage([])
    try {
      const res = await send(exportConfigurationNew(location, configuration))
      dispatch(backupExported(location.internalId, res.id))
      setInfo([`Successfully exported to ${location.url}`])
    } catch (e) {
      setError(['Unable to export because of an error, please try again', errorMessage(e)])
    }
    setLoaded(true)
  }

  return (
    <div className={styles.page}>
      <Title>Export</Title>

      <div className={styles.header}>
        <BackupDescription location={location}/>
      </div>

      <div className={styles.body}>
        <TextArea className={styles.exportInput}
                  label='Current configuration'
                  value={configuration}
                  readOnly
                  id='export-data'
                  data-locator='export-data'/>
        <TimedMessage type={messageType} clear={() => setMessage([])} messages={message}/>

        {location && (
          <div className={styles.buttons}>
            <PrimaryButton className={styles.confirm}
                           icon={iCloudUpload}
                           onClick={exportNow}
                           disabled={!loaded}>
              Export to remote
            </PrimaryButton>
          </div>
        )}

        <div className={styles.buttons}>
          <SecondaryButton className={styles.saveFile}
                           icon={iFloppyDisk}
                           onClick={saveLocally}
                           disabled={!loaded}>
            Save locally...
          </SecondaryButton>
          {autoCopySupported && (
            <SecondaryButton className={styles.copy}
                             id='copy-to-clipboard'
                             data-clipboard-target='#export-data'
                             icon={iPaste}
                             disabled={!loaded}>
              Copy to clipboard
            </SecondaryButton>
          )}
        </div>
      </div>
    </div>
  )
}
