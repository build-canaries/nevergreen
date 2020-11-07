import React, {ReactElement, useCallback, useState} from 'react'
import styles from './export.scss'
import {PrimaryButton, SecondaryButton} from '../../common/forms/Button'
import {iFloppyDisk, iPaste} from '../../common/fonts/Icons'
import {useClipboard} from './ClipboardHook'
import {useSelector} from 'react-redux'
import {toExportableConfigurationJson} from '../../configuration/Configuration'
import {TextArea} from './TextArea'
import {TimedMessage} from './TimedMessage'
import {MessagesType} from '../../common/Messages'
import format from 'date-fns/format'

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
  const configuration = useSelector(toExportableConfigurationJson)

  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState(MessagesType.INFO)

  const copySuccess = useCallback(() => {
    setMessageType(MessagesType.INFO)
    setMessage('Successfully copied to clipboard')
  }, [])
  const copyError = useCallback(() => {
    setMessageType(MessagesType.ERROR)
    setMessage('Unable to copy, please manually copy')
  }, [])

  const autoCopySupported = useClipboard('#copy-to-clipboard', copySuccess, copyError)

  const saveBackup = () => {
    try {
      saveFile(configuration)
    } catch (e) {
      setMessageType(MessagesType.ERROR)
      setMessage('Unable to save, please copy and manually save')
    }
  }

  return (
    <>
      <TextArea label='Current configuration'
                value={configuration}
                readOnly
                id='export-data'
                data-locator='export-data'/>
      <TimedMessage type={messageType} clear={setMessage} messages={message}/>
      <PrimaryButton className={styles.saveFile}
                     icon={iFloppyDisk}
                     onClick={saveBackup}>
        Save backup...
      </PrimaryButton>
      {autoCopySupported && (
        <>
          <SecondaryButton className={styles.copy}
                           id='copy-to-clipboard'
                           data-clipboard-target='#export-data'
                           icon={iPaste}>
            Copy to clipboard
          </SecondaryButton>
        </>
      )}
    </>
  )
}
