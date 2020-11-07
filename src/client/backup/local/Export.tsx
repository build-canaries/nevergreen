import React, {ReactElement, useCallback, useState} from 'react'
import styles from './export.scss'
import {SecondaryButton} from '../../common/forms/Button'
import {iPaste} from '../../common/fonts/Icons'
import {useClipboard} from './ClipboardHook'
import {useSelector} from 'react-redux'
import {toExportableConfigurationJson} from '../../configuration/Configuration'
import {TextArea} from './TextArea'
import {TimedMessage} from './TimedMessage'
import {MessagesType} from '../../common/Messages'

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

  const supported = useClipboard('#copy-to-clipboard', copySuccess, copyError)

  return (
    <>
      <TextArea label='Current configuration'
                value={configuration}
                readOnly
                id='export-data'
                data-locator='export-data'/>
      {supported && (
        <>
          <TimedMessage type={messageType} clear={setMessage} messages={message}/>
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
