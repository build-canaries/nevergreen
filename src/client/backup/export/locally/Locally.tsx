import React, {useState} from 'react'
import styles from './locally.scss'
import {PrimaryButton} from '../../../common/forms/Button'
import {iPaste} from '../../../common/fonts/Icons'
import {useClipboard} from './ClipboardHook'
import {Messages, MessagesType} from '../../../common/Messages'

interface LocallyProps {
  configuration: string;
}

export function Locally({configuration}: LocallyProps) {
  const [messages, setMessages] = useState<string[]>([])
  const [messageType, setMessageType] = useState(MessagesType.INFO)

  const copySuccess = () => {
    setMessageType(MessagesType.INFO)
    setMessages(['Successfully copied to clipboard'])
  }
  const copyError = () => {
    setMessageType(MessagesType.ERROR)
    setMessages(['Unfortunately your browser doesn\'t support automatically copying to clipboard, please manually copy'])
  }

  useClipboard('#copy-to-clipboard', copySuccess, copyError)

  return (
    <>
      <label>
        <span className={styles.label}>current configuration</span>
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
        copy to clipboard
      </PrimaryButton>
      <Messages type={messageType} messages={messages}/>
    </>
  )
}
