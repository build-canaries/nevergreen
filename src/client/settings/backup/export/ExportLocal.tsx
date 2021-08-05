import React, {ReactElement, useCallback, useState} from 'react'
import styles from './export-local.scss'
import {SecondaryButton} from '../../../common/forms/Button'
import {iCross, iFloppyDisk, iPaste} from '../../../common/fonts/Icons'
import {useClipboard} from './ClipboardHook'
import {useSelector} from 'react-redux'
import {toExportableConfigurationJson} from '../../../configuration/Configuration'
import {TextArea} from '../TextArea'
import {TimedMessage} from '../TimedMessage'
import {MessagesType} from '../../../common/Messages'
import {errorMessage} from '../../../common/Utils'
import {saveFile} from '../FileSystem'
import {Page} from '../../../common/Page'
import {ROUTE_SETTINGS_BACKUP} from '../../../Routes'
import {LinkButton} from '../../../common/LinkButton'

export function ExportLocal(): ReactElement {
  const configuration = useSelector(toExportableConfigurationJson)

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
      setError(['Unable to save because of an error, try again or copy and save manually', errorMessage(e)])
    }
  }

  return (
    <Page title='Export locally'>
      <TimedMessage className={styles.message}
                    type={messageType}
                    clear={() => setMessage([])}
                    messages={message}/>

      <SecondaryButton className={styles.saveFile}
                       icon={iFloppyDisk}
                       onClick={saveLocally}>
        Save locally...
      </SecondaryButton>

      {autoCopySupported && (
        <SecondaryButton className={styles.copy}
                         id='copy-to-clipboard'
                         data-clipboard-target='#export-data'
                         icon={iPaste}>
          Copy to clipboard
        </SecondaryButton>
      )}

      <TextArea className={styles.exportInput}
                label='Current configuration'
                value={configuration}
                readOnly
                id='export-data'/>
      <LinkButton to={ROUTE_SETTINGS_BACKUP}
                  icon={iCross}
                  className={styles.cancel}>
        Cancel
      </LinkButton>
    </Page>
  )
}
