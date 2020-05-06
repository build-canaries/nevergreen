import React, {useCallback, useState} from 'react'
import styles from './locally.scss'
import {PrimaryButton} from '../../../common/forms/Button'
import {iPaste} from '../../../common/fonts/Icons'
import {useClipboard} from './ClipboardHook'
import {Messages, MessagesType} from '../../../common/Messages'
import {useSelector} from 'react-redux'
import {getConfiguration} from '../../../configuration/Configuration'

export function Locally() {
  const configuration = useSelector(getConfiguration)

  const [messages, setMessages] = useState<ReadonlyArray<string>>([])
  const [messageType, setMessageType] = useState(MessagesType.INFO)

  const copySuccess = useCallback(() => {
    setMessageType(MessagesType.INFO)
    setMessages(['Successfully copied to clipboard'])
  }, [])
  const copyError = useCallback(() => {
    setMessageType(MessagesType.ERROR)
    setMessages(['Unfortunately your browser doesn\'t support automatically copying to clipboard, please manually copy'])
  }, [])

  useClipboard('#copy-to-clipboard', copySuccess, copyError)

  return (
    <>
      <label>
        <span className={styles.label}>Current configuration</span>
        <textarea className={styles.data}
                  id='export-data'
                  value={configuration}
                  readOnly
                  spellCheck={false}
                  data-locator='export-data'/>
      </label>
      <PrimaryButton className={styles.copy}
                     id='copy-to-clipboard'
                     data-clipboard-target='#export-data'
                     icon={iPaste}>
        Copy to clipboard
      </PrimaryButton>
      <Messages type={messageType} messages={messages}/>
    </>
  )
}
